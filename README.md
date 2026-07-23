# CAIO Flight Deck 3.0

CAIO Flight Deck 3.0 is a persistent executive simulator for the autonomous enterprise. It is designed to run locally in Cursor, push directly to GitHub, and deploy on Vercel.

## What is new in 3.0

- 12 connected frontier missions across 365 simulated days
- A living enterprise digital twin with persistent metrics, trust, debt, capital, evidence, decisions and delayed consequences
- Agent Civilization: 12 AI agents with authority, tools, dependencies, machine-economy behavior and cascade simulations
- Signal Observatory: weak signals, pressure mapping, assumptions and black-swan injection
- Machine Constitutional Court: learner-defined principles, a generated charter and conflict rulings
- Shadow Board: five competing executive perspectives, with optional OpenAI-generated council debate
- Truth Ledger: contemporaneous decision evidence, regulator challenge and truth-debt scoring
- Future Room: 30-day, one-year and five-year scenario projections plus counterfactual replay
- Persistent Leadership DNA profile based on observed choices
- AI Chief of Staff debrief and chat using the OpenAI Responses API
- ElevenLabs cloned-voice narration with browser speech fallback
- Persistent light and dark themes

## Run in Cursor

1. Unzip the project and open the `CAIO_Flight_Deck_3_0` folder in Cursor.
2. Copy the environment template:

```bash
cp .env.example .env.local
```

3. Add your API credentials:

```env
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-5
ELEVENLABS_API_KEY=your_elevenlabs_api_key
ELEVENLABS_VOICE_ID=your_cloned_voice_id
ELEVENLABS_MODEL_ID=eleven_multilingual_v2
```

4. Verify and run:

```bash
npm run verify
npm run dev
```

Vercel Dev will print the local URL. For the static simulator without server AI or cloned voice, run:

```bash
npm run dev:static
```

Then open `http://localhost:8080`.

## Push to GitHub

```bash
git init
git add .
git commit -m "feat: launch CAIO Flight Deck 3.0"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/caio-flight-deck-3.git
git push -u origin main
```

## Deploy to Vercel

1. Import the GitHub repository into Vercel.
2. Add the environment variables from `.env.example` under Project Settings → Environment Variables.
3. Deploy.

The API keys and cloned Voice ID remain server-side. They are not exposed to the browser or committed to GitHub.

## Main files

- `index.html` — Vercel entry point
- `CAIO_Flight_Deck_3_0.html` — standalone copy
- `api/narrate.js` — secure ElevenLabs narration
- `api/chief-of-staff.js` — AI Chief of Staff debrief and chat
- `api/strategic-council.js` — AI Shadow Board
- `api/status.js` — configuration status endpoint
- `scripts/verify.mjs` — package and JavaScript syntax checks

## Persistence

Campaign state is saved in browser local storage under `caio-flight-deck-v3`. Resetting the deck clears the active campaign after confirmation.
