import { Request, Response, NextFunction } from 'express'
import https from 'https'

function splitText(text: string, maxLen = 160): string[] {
  const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text]
  const chunks: string[] = []
  let current = ''

  for (const s of sentences) {
    const trimmed = s.trim()
    if (!trimmed) continue
    if ((current + ' ' + trimmed).trim().length <= maxLen) {
      current = (current + ' ' + trimmed).trim()
    } else {
      if (current) chunks.push(current)
      if (trimmed.length <= maxLen) {
        current = trimmed
      } else {
        const words = trimmed.split(' ')
        let sub = ''
        for (const w of words) {
          if ((sub + ' ' + w).trim().length <= maxLen) {
            sub = (sub + ' ' + w).trim()
          } else {
            if (sub) chunks.push(sub)
            sub = w
          }
        }
        current = sub
      }
    }
  }
  if (current) chunks.push(current)
  return chunks.length > 0 ? chunks : [text]
}

function fetchAudioChunk(text: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const url = 'https://translate.google.com/translate_tts?ie=UTF-8&tl=en-GB&client=tw-ob&q=' + encodeURIComponent(text)
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`TTS chunk error: ${res.statusCode}`))
      }
      const data: Buffer[] = []
      res.on('data', (chunk) => data.push(chunk))
      res.on('end', () => resolve(Buffer.concat(data)))
    }).on('error', reject)
  })
}

export async function getBritishAudio(req: Request, res: Response, next: NextFunction) {
  try {
    const text = typeof req.query.text === 'string' ? req.query.text.trim() : ''
    if (!text) {
      res.status(400).json({ error: 'Text query parameter is required' })
      return
    }

    const chunks = splitText(text)
    const audioBuffers = await Promise.all(chunks.map((c) => fetchAudioChunk(c)))
    const fullAudio = Buffer.concat(audioBuffers)

    res.setHeader('Content-Type', 'audio/mpeg')
    res.setHeader('Cache-Control', 'public, max-age=604800, immutable')
    res.setHeader('Content-Length', fullAudio.length)
    res.send(fullAudio)
  } catch (error) {
    next(error)
  }
}

