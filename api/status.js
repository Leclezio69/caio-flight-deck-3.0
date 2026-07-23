export default function handler(_req, res) {
  res.status(200).json({
    product: "CAIO Flight Deck 3.0",
    version: "3.0.0",
    openaiConfigured: Boolean(process.env.OPENAI_API_KEY),
    elevenLabsConfigured: Boolean(process.env.ELEVENLABS_API_KEY && process.env.ELEVENLABS_VOICE_ID),
  });
}
