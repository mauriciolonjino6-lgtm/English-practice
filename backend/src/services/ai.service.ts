import { GoogleGenerativeAI, Content } from '@google/generative-ai'
import { ENV } from '../config/env'

const genAI = new GoogleGenerativeAI(ENV.GEMINI_API_KEY)

// ─── System Prompt (Combined ESL + TBLT methodology) ──────────────────────────
const SYSTEM_PROMPT = `You are Mr. Davies, a certified DELTA English teacher with 15 years of ESL experience, now teaching at a language school in England. Your student is a Spanish-speaking Systems Engineering student from Latin America who is immersed in England for one month.

TEACHING METHODOLOGY (apply strictly):

1. COMPREHENSIBLE INPUT (Krashen i+1):
   - Speak at A1/A2 level, one step above their current level.
   - Use short, clear sentences. Introduce one new word or structure per response.
   - Never use idioms without immediately explaining them.

2. TASK-BASED LEARNING (TBLT):
   - Frame every exchange as a real-life UK scenario (e.g., buying an Oyster card, ordering at a cafe, explaining a GPON/FTTx network project at uni, asking for directions).
   - Evaluate success by communicative completion, not grammatical perfection.

3. RECAST TECHNIQUE (error correction):
   - When the user makes a grammatical or vocabulary error, ALWAYS apply the Recast technique.
   - Set "hasError": true in the correction object.
   - Provide the corrected version in the "corrected" field.
   - Explain the rule concisely IN SPANISH in the "explanation" field.

4. VOCABULARY:
   - Extract 1-3 useful words or phrases from each exchange.
   - Include technical English (networking, GPON, FTTx) when relevant.

RESPONSE FORMAT:
You MUST respond ONLY with valid JSON matching this schema exactly:
{
  "message": "string — your natural teacher response in English (A1/A2 level)",
  "correction": {
    "hasError": boolean,
    "original": "string — exact user text with error (empty string if no error)",
    "corrected": "string — corrected version (empty string if no error)",
    "explanation": "string — rule explained IN SPANISH (empty string if no error)",
    "rule": "string — grammar rule name e.g. Simple Past (empty string if no error)"
  },
  "vocabulary": [
    { "word": "string", "meaning": "string in Spanish", "example": "string sentence in English" }
  ],
  "taskStatus": "ongoing or completed"
}`

// ─── Types ────────────────────────────────────────────────────────────────────
export interface AIMessageItem {
  role:    'user' | 'assistant'
  content: string
}

export interface AIResponse {
  message:    string
  correction: {
    hasError:    boolean
    original:    string
    corrected:   string
    explanation: string
    rule:        string
  }
  vocabulary:  { word: string; meaning: string; example: string }[]
  taskStatus:  'ongoing' | 'completed'
}

// ─── Chat with Gemini ─────────────────────────────────────────────────────────
export async function processChat(
  userInput: string,
  history:   AIMessageItem[]
): Promise<AIResponse> {
  const model = genAI.getGenerativeModel({
    model: ENV.GEMINI_MODEL,
    systemInstruction: SYSTEM_PROMPT,
    generationConfig: {
      responseMimeType: 'application/json',
      temperature:      0.7,
      maxOutputTokens:  1024,
    },
  })

  // Convert history to Gemini format: 'user' | 'model'
  const geminiHistory: Content[] = history.map((m) => ({
    role:  m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }))

  const chat   = model.startChat({ history: geminiHistory })
  const result = await chat.sendMessage(userInput)
  const raw    = result.response.text()

  try {
    return JSON.parse(raw) as AIResponse
  } catch {
    // Fallback: wrap raw text as a plain message
    return {
      message:    raw,
      correction: { hasError: false, original: '', corrected: '', explanation: '', rule: '' },
      vocabulary: [],
      taskStatus: 'ongoing',
    }
  }
}

// ─── Audio Transcription with Gemini ─────────────────────────────────────────
export async function transcribeAudio(audioBuffer: Buffer): Promise<string> {
  const model = genAI.getGenerativeModel({ model: ENV.GEMINI_MODEL })

  const audioPart = {
    inlineData: {
      data:     audioBuffer.toString('base64'),
      mimeType: 'audio/webm',
    },
  }

  const result = await model.generateContent([
    'Transcribe this audio recording accurately. Return ONLY the transcribed English text, nothing else.',
    audioPart,
  ])

  return result.response.text().trim()
}
