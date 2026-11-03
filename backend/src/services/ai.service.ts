import { GoogleGenerativeAI, Content } from '@google/generative-ai'
import { ENV } from '../config/env'

function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY || ENV.GEMINI_API_KEY
  return new GoogleGenerativeAI(apiKey)
}

// ─── Scenarios Guidance ───────────────────────────────────────────────────────
const SCENARIOS: Record<string, string> = {
  'cafe': 'Roleplay: You are a friendly barista in a traditional London coffee shop (Soho). The student is ordering drinks and food. Teach them how to order politely, ask for the bill, and chat about the day.',
  'airport': 'Roleplay: You are a British border control officer and airport staff at Heathrow Airport Terminal 5. Ask the student why they are visiting the UK, where they are staying, and guide them through passport control and baggage claim.',
  'interview': 'Roleplay: You are a welcoming tech manager conducting an English job interview for an IT / engineering position in London. Ask them about their background, their tech projects, and their strengths.',
  'directions': 'Roleplay: You are a helpful London local on Oxford Street near the Underground station. The student is lost and asking for directions to Covent Garden or the British Museum.',
  'tech': 'Roleplay: You are an English senior software architect discussing network engineering, cloud architecture, and modern programming. Help them explain technical concepts smoothly in professional English.',
  'free-talk': 'Roleplay: You are Mr. Davies, an experienced, encouraging British ESL teacher in Cambridge. Chat warmly with the student, ask about their hobbies, culture, and daily life in English.',
}

function buildSystemPrompt(scenario = 'free-talk', studentLevel = 'A1'): string {
  const scenarioContext = SCENARIOS[scenario] ?? SCENARIOS['free-talk']

  return `You are Mr. Davies, an enthusiastic, certified DELTA English teacher with 15 years of experience in England.
Current Student Level: ${studentLevel} (Beginner to Intermediate).
Active Context / Scenario: ${scenarioContext}

TEACHING METHODOLOGY:
1. COMPREHENSIBLE INPUT & NATURAL DIALOGUE:
   - Speak in clear, natural British English adapted to level ${studentLevel}.
   - Keep messages engaging, friendly, and concise (2-4 sentences max).
   - Always end your message with a clear, inviting question or follow-up to keep the conversation flowing.

2. INSTANT SPANISH TRANSLATION:
   - Provide a natural Spanish translation of your message in the "translation" field so the learner can check their understanding.

3. CONVERSATIONAL SUGGESTED REPLIES:
   - ALWAYS provide 2-3 suggested replies in English in "suggestedReplies" that the student could choose to say next, along with a helpful Spanish hint.

4. RECAST & FRIENDLY CORRECTION:
   - If the user made any grammatical, pronunciation (spelling) or vocabulary error, set "hasError": true.
   - Explain the correction warmly in SPANISH in the "explanation" field.
   - If user wrote with no errors, set "hasError": false.

5. VOCABULARY EXTRACTOR:
   - Extract 1-3 useful words or expressions from this turn with their Spanish meaning and an example sentence.

RESPONSE FORMAT (Respond ONLY with valid JSON):
{
  "message": "your response in English",
  "translation": "traducción al español de tu mensaje",
  "suggestedReplies": [
    { "text": "English reply option 1", "hint": "Traducción / pista en español" },
    { "text": "English reply option 2", "hint": "Traducción / pista en español" }
  ],
  "correction": {
    "hasError": boolean,
    "original": "user text with error or empty string",
    "corrected": "corrected version or empty string",
    "explanation": "explicación en español or empty string",
    "rule": "nombre de la regla gramatical or empty string"
  },
  "vocabulary": [
    { "word": "word/phrase", "meaning": "significado en español", "example": "example sentence" }
  ],
  "taskStatus": "ongoing or completed"
}`
}

export interface AIMessageItem {
  role:    'user' | 'assistant'
  content: string
}

export interface SuggestedReply {
  text: string
  hint: string
}

export interface AIResponse {
  message:          string
  translation?:     string
  suggestedReplies?: SuggestedReply[]
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

export async function processChat(
  userInput:   string,
  history:     AIMessageItem[],
  scenario   = 'free-talk',
  studentLevel = 'A1'
): Promise<AIResponse> {
  const apiKey = process.env.GEMINI_API_KEY || ENV.GEMINI_API_KEY
  if (!apiKey || apiKey === 'AI...') {
    return {
      message: "Hello! Welcome to class! I am Mr. Davies. To start our AI conversation, please make sure your GEMINI_API_KEY is configured in your environment variables.",
      translation: "¡Hola! ¡Bienvenido a clase! Soy el profesor Davies. Para comenzar nuestra conversación con IA, asegúrate de que tu GEMINI_API_KEY esté configurada.",
      suggestedReplies: [
        { text: "Hello Mr. Davies, nice to meet you!", hint: "Hola profesor Davies, ¡encantado de conocerte!" },
        { text: "I want to practice my English.", hint: "Quiero practicar mi inglés." },
      ],
      correction: { hasError: false, original: '', corrected: '', explanation: '', rule: '' },
      vocabulary: [
        { word: 'welcome', meaning: 'bienvenido', example: 'Welcome to our English lesson!' },
      ],
      taskStatus: 'ongoing',
    }
  }

  try {
    const genAI = getGenAI()
    const model = genAI.getGenerativeModel({
      model: ENV.GEMINI_MODEL || 'gemini-1.5-pro',
      systemInstruction: buildSystemPrompt(scenario, studentLevel),
      generationConfig: {
        responseMimeType: 'application/json',
        temperature:      0.7,
        maxOutputTokens:  1024,
      },
    })

    const geminiHistory: Content[] = history.map((m) => ({
      role:  m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }))

    const chat   = model.startChat({ history: geminiHistory })
    const result = await chat.sendMessage(userInput)
    const raw    = result.response.text()

    return JSON.parse(raw) as AIResponse
  } catch (err: any) {
    console.error('[AI Error]', err?.message || err)
    return {
      message: "I heard you! Let's keep practicing. Tell me, what did you do today?",
      translation: "¡Te escuché! Sigamos practicando. Cuéntame, ¿qué hiciste hoy?",
      suggestedReplies: [
        { text: "I worked and studied today.", hint: "Trabajé y estudié hoy." },
        { text: "I had a busy day, but I'm ready to learn.", hint: "Tuve un día ocupado, pero estoy listo para aprender." },
      ],
      correction: { hasError: false, original: '', corrected: '', explanation: '', rule: '' },
      vocabulary: [],
      taskStatus: 'ongoing',
    }
  }
}

export async function transcribeAudio(audioBuffer: Buffer): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY || ENV.GEMINI_API_KEY
  if (!apiKey) return "Hello Mr. Davies"

  try {
    const genAI = getGenAI()
    const model = genAI.getGenerativeModel({ model: ENV.GEMINI_MODEL || 'gemini-1.5-pro' })

    const audioPart = {
      inlineData: {
        data:     audioBuffer.toString('base64'),
        mimeType: 'audio/webm',
      },
    }

    const result = await model.generateContent([
      'Transcribe this English voice recording into clean text. Return ONLY the English words spoken, nothing else.',
      audioPart,
    ])

    return result.response.text().trim()
  } catch (err) {
    console.error('[Audio Transcription Error]', err)
    return "Hello teacher, I am practicing speaking."
  }
}
