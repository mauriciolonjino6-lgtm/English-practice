import { GoogleGenerativeAI, Content } from '@google/generative-ai'
import { ENV } from '../config/env'

function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY || ENV.GEMINI_API_KEY
  return new GoogleGenerativeAI(apiKey)
}

// ─── Scenarios Guidance ───────────────────────────────────────────────────────
const SCENARIOS: Record<string, string> = {
  'cafe': 'The student is visiting a traditional coffee shop in Soho, London. Guide them in ordering politely, asking about tea, coffee, pastries, British slang, and casual banter.',
  'airport': 'The student has arrived at London Heathrow Terminal 5. Roleplay passport control and baggage inquiries with polite British border etiquette.',
  'interview': 'The student is interviewing for a professional software/IT role in London. Ask them about their technical experience and background.',
  'directions': 'The student is near Oxford Street or Covent Garden and asking how to get to the British Museum or the Underground.',
  'tech': 'A professional discussion with a London software architect on cloud systems, programming, and engineering terms.',
  'free-talk': 'An engaging, friendly conversation in Oxford about daily life, hobbies, work, British slang, and cultural exchanges.',
}

export function buildSystemPrompt(scenario = 'free-talk'): string {
  const scenarioContext = SCENARIOS[scenario] ?? SCENARIOS['free-talk']

  return `You are Professor Davies, an expert British English tutor residing in Oxford. Your primary goal is to help the student practice real-world conversational British English, utilizing the Communicative Language Teaching (CLT) method.
Context: ${scenarioContext}

CRITICAL BEHAVIORAL RULES:
1. NO GENERIC REPETITION: Never reply with canned, robotic phrases like "I understood your message! Let's practice saying that in another way." Every response must directly and uniquely address the user's specific input or image.
2. ACTIVE CORRECTION & SEPARATION OF FIELDS (STRICT):
   - In "corrected_sentence": Provide ONLY the clean, natural corrected English sentence (e.g. "I ate sushi in the evening, and I didn't have breakfast in the morning."). Do NOT include explanations here. If the student made no mistake, set this to null.
   - In "explanation": Explain WHY and the grammar rule in clear, friendly Spanish so the student understands the rule. Do NOT repeat the whole sentence verbatim here; explain the grammar principle. If no mistake, set this to null.
3. CONVERSATIONAL CONTINUITY: Keep the flow alive by asking exactly one relevant, open-ended follow-up question tied to the user's topic.
4. BILINGUAL SCAFFOLDING & TRANSLATION: If the user writes in Spanish or gets stuck, provide the English translation or structure briefly. Always provide the full Spanish translation of your reply and follow_up_question in the "translation" field so the student can toggle translation.
5. BRITISH CONTEXT: Incorporate British vocabulary, idioms, slang, and cultural references where natural.
6. MULTIMODAL IMAGE & DOCUMENT VISION (MANDATORY WHEN AN IMAGE IS ATTACHED):
   - DETAILED VISUAL DESCRIPTION: In your "reply", explicitly mention and describe what you see in the image (identify objects, setting, people, colors, scenery, food, actions, or text/exercises). Paint a vivid picture in English so the student learns how to describe what is seen.
   - TEACH RELEVANT ENGLISH & ANSWER: Answer any question the user asked about the picture. Introduce 2-3 useful British English words or expressions for the items or situation shown.
   - TEXT & HOMEWORK: If the image contains a worksheet, book page, or handwritten text, transcribe and evaluate the English, solve/explain the exercises, and provide constructive feedback.
   - ACCURATE CORRECTIONS: If there is an English error (in the student's text or in the exercises), provide the clean correction in "corrected_sentence" and the grammar explanation in Spanish in "explanation". If there are NO English errors, both "corrected_sentence" and "explanation" MUST be strictly null.
   - ENGAGING QUESTION: In "follow_up_question", ask an open-ended question directly about the image/scene to invite further conversation.
   - SPANISH TRANSLATION: In "translation", provide the full Spanish translation of your "reply" and "follow_up_question".

STRICT OUTPUT FORMAT (JSON ONLY):
You must return your response EXCLUSIVELY as a valid JSON object matching this exact schema:
{
  "corrected_sentence": "Write ONLY the clean corrected English sentence here without explanations. If flawless, set this to null.",
  "explanation": "Explain the grammar rule and WHY in clear, friendly Spanish so the student learns. If flawless, set this to null.",
  "reply": "Your conversational response continuing the dialogue naturally in British English, describing the image in detail if an image is attached.",
  "follow_up_question": "Your engaging follow-up question in British English.",
  "translation": "Traducción completa y fluida en español de tu reply y follow_up_question."
}`
}

export interface AIMessageItem {
  role:    'user' | 'assistant'
  content: string
}

export interface ImageData {
  mimeType: string
  data:     string // base64
}

export interface RawProfessorResponse {
  corrected_sentence?: string | null
  explanation?: string | null
  correction?: string | null
  reply: string
  follow_up_question: string
  translation?: string
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
  debugError?:        string
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
  userInput:    string,
  history:      AIMessageItem[],
  scenario    = 'free-talk',
  _studentLevel = 'A1',
  imageData?:   ImageData
): Promise<AIResponse> {
  const apiKey = process.env.GEMINI_API_KEY || ENV.GEMINI_API_KEY

  if (!apiKey || apiKey === 'AI...') {
    return {
      message: "Hello! Welcome to our tutorial. I am Professor Davies, writing to you from Oxford. To begin our live conversation, please make sure your GEMINI_API_KEY is configured in your project settings.",
      reply: "Hello! Welcome to our tutorial. I am Professor Davies, writing to you from Oxford.",
      follow_up_question: "Are you ready to practice some British English together?",
      translation: "¡Hola! Bienvenido a nuestra tutoría. Soy el profesor Davies, escribiéndote desde Oxford. ¿Estás listo para practicar inglés británico juntos?",
      rawCorrection: null,
      correction: { hasError: false, original: '', corrected: '', explanation: '', rule: '' },
      vocabulary: [],
      taskStatus: 'ongoing',
    }
  }

  const modelCandidates = [
    'gemini-3.1-flash-lite',
    'gemini-3.5-flash',
    'gemini-flash-lite-latest',
    'gemini-3.6-flash',
  ]

  // Clean history for Gemini: MUST start with 'user' and alternate roles
  const geminiHistory: Content[] = []
  for (const m of history.slice(-10)) {
    const role = m.role === 'assistant' ? 'model' : 'user'
    const text = m.content?.trim()
    if (!text) continue

    // First message in Gemini history MUST be 'user'
    if (geminiHistory.length === 0 && role !== 'user') continue

    const last = geminiHistory[geminiHistory.length - 1]
    if (last && last.role === role) {
      last.parts[0].text += `\n${text}`
    } else {
      geminiHistory.push({ role, parts: [{ text }] })
    }
  }

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
          maxOutputTokens:  700,
        },
      })

      const chat = model.startChat({ history: geminiHistory })

      const timeoutMs = imageData ? 20000 : 10000
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error(`AI generation timed out on model ${modelName}`)), timeoutMs)
      )

      let sendPayload: any = userInput || "Hello Professor Davies."
      if (imageData && imageData.data) {
        const textPrompt = userInput?.trim()
          ? `[Student message]: ${userInput}\n\n[Visual input attached]: The student has shared an image/document. Please examine it carefully. Start your reply by clearly describing what you see in the image in detail (mention specific objects, colors, people, setting, actions, or text visible), answer the student's message, teach useful British English expressions or vocabulary for what is shown in the photo, and ask an engaging follow-up question about it.`
          : `[Visual input attached]: The student has shared an image/document without text. Please examine it thoroughly. In your reply, start by clearly describing what you see in the image in detail (mention specific objects, colors, people, setting, actions, or text visible), explain it in natural British English, teach 2-3 useful British expressions or vocabulary words related to what is shown in the image, and ask an engaging question about it.`
        sendPayload = [
          textPrompt,
          {
            inlineData: {
              mimeType: imageData.mimeType || 'image/jpeg',
              data:     imageData.data,
            },
          },
        ]
      }

      const result = await Promise.race([chat.sendMessage(sendPayload), timeoutPromise])
      const raw    = result.response.text()

      let parsed: RawProfessorResponse
      try {
        parsed = JSON.parse(cleanJson(raw))
      } catch (parseErr) {
        console.warn('[AI JSON Parse Warning] Raw output was:', raw)
        parsed = {
          corrected_sentence: null,
          explanation: null,
          reply: raw.trim(),
          follow_up_question: "What else would you like to discuss today?",
        }
      }

      const replyText = parsed.reply?.trim() || ''
      const questionText = parsed.follow_up_question?.trim() || ''
      const fullMessage = questionText ? `${replyText}\n\n${questionText}` : replyText
      const translationText = parsed.translation?.trim() || ''

      const cleanCorrected = (parsed.corrected_sentence || parsed.correction || '').trim()
      const isNullString = ['null', 'none', 'n/a', 'no error', 'no mistakes', 'undefined'].includes(cleanCorrected.toLowerCase())
      const cleanExplanation = (parsed.explanation || '').trim()
      const hasCorrection = Boolean(
        cleanCorrected &&
        !isNullString &&
        cleanCorrected !== ''
      )

      return {
        message: fullMessage,
        reply: replyText,
        follow_up_question: questionText,
        translation: translationText,
        rawCorrection: cleanCorrected || null,
        correction: {
          hasError:    hasCorrection,
          original:    hasCorrection ? (userInput || 'Texto o ejercicio en imagen adjunta') : '',
          corrected:   hasCorrection ? cleanCorrected : '',
          explanation: hasCorrection ? (cleanExplanation || "Practica diciendo la frase en su forma correcta.") : '',
          rule:        hasCorrection ? "Regla Gramatical Británica" : '',
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
    translation: "¡Cielos, nuestra conexión de Oxford tuvo una pequeña interferencia! ¿Podrías repetir lo que dijiste para continuar nuestra conversación?",
    debugError: lastError?.message || String(lastError),
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
