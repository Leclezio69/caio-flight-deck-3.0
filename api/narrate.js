const MAX_CHARACTERS = 4800;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.ELEVENLABS_API_KEY;
  const voiceId = process.env.ELEVENLABS_VOICE_ID;
  if (!apiKey || !voiceId) {
    return res.status(503).json({ error: "ElevenLabs voice is not configured" });
  }

  const text = String(req.body?.text || "").replace(/\s+/g, " ").trim().slice(0, MAX_CHARACTERS);
  if (!text) return res.status(400).json({ error: "Narration text is required" });

  try {
    const modelId = (process.env.ELEVENLABS_MODEL_ID || "eleven_multilingual_v2").trim();
    const endpoint = `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}?output_format=mp3_44100_128&optimize_streaming_latency=3`;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text,
        model_id: modelId,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.85,
          style: 0.18,
          use_speaker_boost: true,
          speed: 0.97,
        },
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("ElevenLabs error", response.status, detail);
      return res.status(response.status).json({ error: "ElevenLabs narration failed" });
    }

    const audio = Buffer.from(await response.arrayBuffer());
    res.setHeader("Content-Type", response.headers.get("content-type") || "audio/mpeg");
    res.setHeader("Content-Length", String(audio.length));
    res.setHeader("Cache-Control", "private, max-age=0, no-store");
    const characterCost = response.headers.get("character-cost");
    if (characterCost) res.setHeader("X-ElevenLabs-Character-Cost", characterCost);
    return res.status(200).send(audio);
  } catch (error) {
    console.error("Narration error", error);
    return res.status(500).json({ error: error?.message || "Narration request failed" });
  }
}
