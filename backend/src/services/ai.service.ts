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

  return `You are British Tutor Emma, a friendly, charismatic, and expert British English educator from Oxford.
Your primary mission is to provide an immersive, encouraging, and authentic English conversational learning experience.
Current Scenario Context: ${scenarioContext}

CONVERSATION PRINCIPLES (COMMUNICATIVE LANGUAGE TEACHING):
1. ENGAGING, NATURAL BRITISH CONVERSATION:
   - Talk like a real British conversationalist: warm, witty, encouraging, and natural.
   - When the student introduces or changes the topic (e.g. food, supermarkets, London travel, daily life), dive STRAIGHT into that topic with enthusiasm!
   - NEVER repeat robotic or repetitive phrases like "What else would you like to discuss today?". Always ask creative, specific questions that advance the topic or roleplay.
   - Use authentic British English vocabulary and idioms naturally (e.g. 'splendid', 'fancy', 'trolley', 'till', 'cuppa', 'lovely', 'brilliant', 'sorted', 'cheers').
   - Keep your conversational reply around 2-4 sentences: engaging, vibrant, and easy to respond to.

2. SUGGESTED REPLIES (MANDATORY):
   - Always supply 3 realistic, practical sentences the student could say next to continue the dialogue smoothly.
   - Include a concise Spanish hint for each option to help lower-level students understand the communicative intent.

3. CONSTRUCTIVE & GENTLE CORRECTIONS:
   - If the student made a noticeable grammar or vocabulary mistake (such as spelling "market" as "Marked", or wrong verb tense), provide the clean corrected sentence in "corrected_sentence" and a clear, friendly 1-sentence tip in "explanation".
   - If the student's message has no mistakes, set both "corrected_sentence" and "explanation" to null.
   - Do NOT treat minor British vs American spelling differences (e.g. practice vs practise) as an error.
   - Never let corrections interrupt the warmth and flow of your conversational "reply".

4. MULTIMODAL VISION (WHEN AN IMAGE IS ATTACHED):
   - If the student shares an image or document, thoroughly examine it and describe what you see in detail in your "reply".
   - Teach 2-3 useful British expressions for items in the picture and ask a relevant question about it.

STRICT OUTPUT FORMAT (JSON ONLY):
Return EXCLUSIVELY a single valid JSON object matching this schema:
{
  "reply": "Your warm conversational response in natural British English.",
  "follow_up_question": "Your engaging, topic-specific question.",
  "suggested_replies": [
    {"text": "Natural reply option 1", "hint": "Breve pista en español"},
    {"text": "Natural reply option 2", "hint": "Breve pista en español"},
    {"text": "Natural reply option 3", "hint": "Breve pista en español"}
  ],
  "corrected_sentence": "Clean corrected sentence or null if no error.",
  "explanation": "Friendly 1-sentence explanation of the rule or null if no error.",
  "translation": "Traducción completa en español de tu reply y follow_up_question."
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
  reply: string
  follow_up_question: string
  suggested_replies?: SuggestedReply[]
  corrected_sentence?: string | null
  explanation?: string | null
  correction?: string | null
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

function parseAIResponse(raw: string, userInput?: string): RawProfessorResponse {
  const cleaned = cleanJson(raw)
  try {
    const obj = JSON.parse(cleaned)
    if (obj && typeof obj === 'object') {
      return {
        reply: typeof obj.reply === 'string' ? obj.reply : '',
        follow_up_question: typeof obj.follow_up_question === 'string' ? obj.follow_up_question : '',
        suggested_replies: Array.isArray(obj.suggested_replies) ? obj.suggested_replies : [],
        corrected_sentence: obj.corrected_sentence ?? obj.correction ?? null,
        explanation: obj.explanation ?? null,
        translation: obj.translation ?? '',
      }
    }
  } catch (err) {
    console.warn('[AI JSON Parse Warning] Retrying with resilient regex parser:', err)
  }

  // Fallback 1: Regex extraction for each key
  const extractString = (field: string): string => {
    const regex = new RegExp(`"${field}"\\s*:\\s*"((?:\\\\.|[^"\\\\])*)"`, 'i')
    const match = raw.match(regex)
    if (match && match[1]) {
      return match[1].replace(/\\n/g, '\n').replace(/\\"/g, '"').trim()
    }
    return ''
  }

  const reply = extractString('reply')
  const followUp = extractString('follow_up_question')
  const translation = extractString('translation')
  const corrected = extractString('corrected_sentence') || extractString('correction')
  const explanation = extractString('explanation')

  let suggestedReplies: SuggestedReply[] = []
  try {
    const sugMatch = raw.match(/"suggested_replies"\s*:\s*(\[[^\]]*\])/s)
    if (sugMatch && sugMatch[1]) {
      suggestedReplies = JSON.parse(sugMatch[1])
    }
  } catch {}

  if (reply || followUp) {
    return {
      reply: reply || "That sounds splendid! Let's explore that topic together.",
      follow_up_question: followUp || "What is your perspective on this?",
      suggested_replies: suggestedReplies,
      corrected_sentence: corrected || null,
      explanation: explanation || null,
      translation: translation || '',
    }
  }

  // Fallback 2: Thoroughly strip any leaked JSON syntax, curly braces, or property tags
  let stripped = raw
    .replace(/\{[\s\S]*?"(reply|content)":\s*"/i, '')
    .replace(/["}]+\s*$/g, '')
    .replace(/"(corrected_sentence|explanation|translation|follow_up_question)":\s*(null|"[^"]*")/gi, '')
    .replace(/[{}\[\]"]/g, '')
    .trim()

  if (!stripped || stripped.length < 5 || stripped.startsWith('{') || stripped.includes('"reply"')) {
    stripped = "That is a splendid topic to practice! I would be delighted to chat about it with you."
  }

  return {
    reply: stripped,
    follow_up_question: "What's the first question or thought that comes to your mind?",
    suggested_replies: [
      { text: "Could you give me an everyday example?", hint: "Pide un ejemplo común" },
      { text: "How would you say that in London?", hint: "Pregunta por modismos británicos" },
      { text: "Let's do a short roleplay!", hint: "Propón un juego de roles" }
    ],
    corrected_sentence: null,
    explanation: null,
    translation: "¡Es un tema excelente para practicar! Me encantaría explorarlo contigo.",
  }
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
    'gemini-3.6-flash',
    'gemini-flash-latest',
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
          maxOutputTokens:  1500,
        },
      })

      const chat = model.startChat({ history: geminiHistory })

      const timeoutMs = 9500
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error(`AI generation timed out on model ${modelName}`)), timeoutMs)
      )

      let sendPayload: any = userInput || "Hello Tutor Emma."
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

      const parsed = parseAIResponse(raw, userInput)

      const replyText = parsed.reply?.trim() || ''
      const questionText = parsed.follow_up_question?.trim() || ''
      const fullMessage = questionText ? `${replyText}\n\n${questionText}` : replyText
      const translationText = parsed.translation?.trim() || ''

      let cleanCorrected = (parsed.corrected_sentence || parsed.correction || '').trim()
      const isNullString = ['null', 'none', 'n/a', 'no error', 'no mistakes', 'undefined'].includes(cleanCorrected.toLowerCase())
      let cleanExplanation = (parsed.explanation || '').trim()

      if (cleanCorrected && !isNullString) {
        // If cleanCorrected accidentally contains conversational advice (e.g. "Your sentences are clear! ... So, it should be: '...'")
        const quoteMatch = cleanCorrected.match(/should be:?\s*['"]([^'"]+)['"]/i) || cleanCorrected.match(/['"]([^'"]{6,})['"]/)
        if (quoteMatch && cleanCorrected.length > 70 && (cleanCorrected.toLowerCase().includes('tweak') || cleanCorrected.toLowerCase().includes('say') || cleanCorrected.toLowerCase().includes('normally'))) {
          if (!cleanExplanation || cleanExplanation === cleanCorrected) {
            cleanExplanation = cleanCorrected
          }
          cleanCorrected = quoteMatch[1].trim()
        }
      }

      // Ensure explanation is never an exact duplicate of corrected sentence
      if (cleanExplanation && cleanCorrected && (cleanExplanation === cleanCorrected || cleanExplanation.toLowerCase() === cleanCorrected.toLowerCase())) {
        cleanExplanation = "Aplica esta estructura en inglés británico para asegurar precisión gramatical y fluidez natural."
      }

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
        suggestedReplies: parsed.suggested_replies && parsed.suggested_replies.length > 0
          ? parsed.suggested_replies
          : [
              { text: "That sounds splendid! Tell me more.", hint: "Continuar la conversación" },
              { text: "Could you give me an example?", hint: "Pedir un ejemplo práctico" },
              { text: "How do British people usually say that?", hint: "Preguntar por modismos británicos" }
            ],
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
    suggestedReplies: [
      { text: "Could you repeat that, please?", hint: "¿Podrías repetirlo?" },
      { text: "Let's try that again!", hint: "¡Intentémoslo de nuevo!" }
    ],
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
