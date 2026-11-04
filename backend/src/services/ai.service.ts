import { GoogleGenerativeAI, Content } from '@google/generative-ai'
import { ENV } from '../config/env'

function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY || ENV.GEMINI_API_KEY
  return new GoogleGenerativeAI(apiKey)
}

// ─── Scenarios Guidance ───────────────────────────────────────────────────────
const SCENARIOS: Record<string, string> = {
  'cafe': 'The student is visiting a traditional coffee shop in Soho, London. Guide them in ordering politely, asking about tea or pastries, and casual British banter.',
  'airport': 'The student has arrived at London Heathrow Terminal 5. Roleplay passport control and baggage inquiries with polite British border etiquette.',
  'interview': 'The student is interviewing for a professional software/IT role in London. Ask them about their technical experience and background.',
  'directions': 'The student is near Oxford Street or Covent Garden and asking how to get to the British Museum or the Underground.',
  'tech': 'A professional discussion with a London software architect on cloud systems, programming, and engineering terms.',
  'free-talk': 'An engaging, friendly conversation in Oxford about daily life, hobbies, work, and cultural exchanges.',
}

export function buildSystemPrompt(scenario = 'free-talk'): string {
  const scenarioContext = SCENARIOS[scenario] ?? SCENARIOS['free-talk']

  return `You are Professor Davies, an expert British English tutor residing in Oxford. Your primary goal is to help the student practice real-world conversational British English, utilizing the Communicative Language Teaching (CLT) method.
Context: ${scenarioContext}

CRITICAL BEHAVIORAL RULES:
1. NO GENERIC REPETITION: Never reply with canned, robotic phrases like "I understood your message! Let's practice saying that in another way." Every response must directly and uniquely address the user's specific input.
2. ACTIVE CORRECTION: Analyze the user's text. If there are grammatical, structural, or lexical errors, provide a clear, friendly correction. If the sentence is perfect, acknowledge it naturally.
3. CONVERSATIONAL CONTINUITY: Keep the flow alive by asking exactly one relevant, open-ended follow-up question tied to the user's topic.
4. BILINGUAL SCAFFOLDING: If the user writes in Spanish or gets stuck, provide the English translation or structure briefly, then encourage them to reply in English.
5. BRITISH CONTEXT: Incorporate British vocabulary, idioms, and cultural references where natural.

STRICT OUTPUT FORMAT (JSON ONLY):
You are communicating with a Node.js/Express API. You must return your response EXCLUSIVELY as a valid JSON object. Do not wrap it in markdown blockquotes (\`\`\`json). Use the following structure:

{
  "correction": "If the user made a mistake, provide the correction and a brief explanation here. If the user's input was flawless, set this to null.",
  "reply": "Your conversational response continuing the dialogue naturally.",
  "follow_up_question": "Your engaging follow-up question."
}`
}

export interface AIMessageItem {
  role:    'user' | 'assistant'
  content: string
}

export interface RawProfessorResponse {
  correction: string | null
  reply: string
  follow_up_question: string
}

export interface SuggestedReply {
  text: string
  hint: string
}

export interface AIResponse {
  message:            string
  reply:              string
  follow_up_question: string
  rawCorrection:      string | null
  translation?:       string
  suggestedReplies?:  SuggestedReply[]
  correction: {
    hasError:    boolean
    original:    string
    corrected:   string
    explanation: string
    rule:        string
  }
  vocabulary:         { word: string; meaning: string; example: string }[]
  taskStatus:         'ongoing' | 'completed'
}

function cleanJson(raw: string): string {
  let cleaned = raw.trim()
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json\s*/, '').replace(/\s*```$/, '')
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '')
  }
  return cleaned.trim()
}

export async function processChat(
  userInput:   string,
  history:     AIMessageItem[],
  scenario   = 'free-talk',
  _studentLevel = 'A1'
): Promise<AIResponse> {
  const apiKey = process.env.GEMINI_API_KEY || ENV.GEMINI_API_KEY

  if (!apiKey || apiKey === 'AI...') {
    return {
      message: "Hello! Welcome to our tutorial. I am Professor Davies, writing to you from Oxford. To begin our live conversation, please make sure your GEMINI_API_KEY is configured in your project settings.",
      reply: "Hello! Welcome to our tutorial. I am Professor Davies, writing to you from Oxford.",
      follow_up_question: "Are you ready to practice some British English together?",
      rawCorrection: null,
      correction: { hasError: false, original: '', corrected: '', explanation: '', rule: '' },
      vocabulary: [],
      taskStatus: 'ongoing',
    }
  }

  const modelCandidates = [
    ENV.GEMINI_MODEL,
    'gemini-3.6-flash',
    'gemini-3.5-flash',
    'gemini-flash-latest',
  ].filter(Boolean) as string[]

  let lastError: any = null

  for (const modelName of modelCandidates) {
    try {
      const genAI = getGenAI()
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: buildSystemPrompt(scenario),
        generationConfig: {
          responseMimeType: 'application/json',
          temperature:      0.7,
          maxOutputTokens:  1024,
        },
      })

      const geminiHistory: Content[] = history.slice(-10).map((m) => ({
        role:  m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }))

      const chat   = model.startChat({ history: geminiHistory })
      const result = await chat.sendMessage(userInput)
      const raw    = result.response.text()

      let parsed: RawProfessorResponse
      try {
        parsed = JSON.parse(cleanJson(raw))
      } catch (parseErr) {
        console.warn('[AI JSON Parse Warning] Raw output was:', raw)
        parsed = {
          correction: null,
          reply: raw.trim(),
          follow_up_question: "What else would you like to discuss today?",
        }
      }

      const replyText = parsed.reply?.trim() || ''
      const questionText = parsed.follow_up_question?.trim() || ''
      const fullMessage = questionText ? `${replyText}\n\n${questionText}` : replyText

      const hasCorrection = Boolean(
        parsed.correction &&
        typeof parsed.correction === 'string' &&
        parsed.correction.trim() !== '' &&
        parsed.correction.trim().toLowerCase() !== 'null'
      )

      return {
        message: fullMessage,
        reply: replyText,
        follow_up_question: questionText,
        rawCorrection: parsed.correction ?? null,
        correction: {
          hasError:    hasCorrection,
          original:    hasCorrection ? userInput : '',
          corrected:   hasCorrection ? parsed.correction! : '',
          explanation: hasCorrection ? parsed.correction! : '',
          rule:        hasCorrection ? "Professor Davies' Advice" : '',
        },
        vocabulary: [],
        taskStatus: 'ongoing',
      }
    } catch (err: any) {
      lastError = err
      console.warn(`[AI Model ${modelName} warning]:`, err?.message || err)
    }
  }

  console.error('[AI Error after all models]', lastError?.message || lastError)
  return {
    message: "Good heavens, our Oxford connection experienced a brief hiccup! Could you tell me once more what you said? I want to make sure we keep our conversation going.",
    reply: "Good heavens, our Oxford connection experienced a brief hiccup!",
    follow_up_question: "Could you repeat what you just said so we can continue?",
    rawCorrection: null,
    correction: { hasError: false, original: '', corrected: '', explanation: '', rule: '' },
    vocabulary: [],
    taskStatus: 'ongoing',
  }
}

export async function transcribeAudio(audioBuffer: Buffer): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY || ENV.GEMINI_API_KEY
  if (!apiKey) return "Hello Professor Davies"

  const modelCandidates = [
    ENV.GEMINI_MODEL,
    'gemini-3.6-flash',
    'gemini-3.5-flash',
    'gemini-flash-latest',
  ].filter(Boolean) as string[]

  for (const modelName of modelCandidates) {
    try {
      const genAI = getGenAI()
      const model = genAI.getGenerativeModel({ model: modelName })

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
      console.warn(`[Audio Model ${modelName} warning]`, err)
    }
  }

  return "Hello Professor Davies, I am practicing speaking."
}
