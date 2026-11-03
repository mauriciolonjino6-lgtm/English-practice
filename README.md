# FluentAI — English Learning Platform

> Plataforma EdTech para hispanohablantes inmersos en Inglaterra.
> Metodologia: Krashen i+1 · TBLT · Recast · Shadowing · SRS (SM-2)

---

## Stack

| Layer      | Tech                                          |
|------------|-----------------------------------------------|
| Frontend   | React 18 + TypeScript + Vite + Tailwind CSS   |
| State      | Zustand (persistido en localStorage)          |
| Backend    | Node.js + Express + TypeScript                |
| ORM        | Sequelize 6                                   |
| Database   | PostgreSQL                                    |
| AI         | Google Gemini (Gemini 1.5 Flash / Pro)        |
| Voice      | Web Speech API + MediaRecorder API            |
| Packages   | pnpm workspaces (monorepo)                    |

---

## Estructura del proyecto

```
english-app/
├── pnpm-workspace.yaml
├── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── chat/          # ChatInterface, CorrectionCard, VoiceButton, MessageBubble
│   │   │   ├── dashboard/     # Dashboard, StreakCard, ProgressCard, VocabCard
│   │   │   ├── shadowing/     # ShadowingModule, WaveformVisualizer
│   │   │   ├── flashcards/    # FlashcardModule, FlashCard
│   │   │   └── layout/        # AppShell, Navigation
│   │   ├── hooks/             # useVoiceRecorder, useSpeechSynthesis
│   │   ├── services/          # api.ts (Axios client)
│   │   ├── store/             # useAppStore (Zustand)
│   │   └── types/             # index.ts (TypeScript types)
└── backend/
    └── src/
        ├── config/            # env.ts, database.ts
        ├── controllers/       # chat.controller.ts, srs.controller.ts
        ├── middleware/        # errorHandler.ts
        ├── models/            # User, Session, VocabItem, SRSCard
        ├── routes/            # index.ts, chat.routes.ts, srs.routes.ts
        └── services/          # ai.service.ts (Gemini), srs.service.ts (SM-2)
```

---

## Configuracion inicial

### 1. Clonar / abrir el proyecto
```bash
cd "English class/english-app"
```

### 2. Variables de entorno
```bash
copy .env.example backend\.env
# Edita backend\.env con tus credenciales:
#   GEMINI_API_KEY=AI...
#   DB_HOST, DB_NAME, DB_USER, DB_PASS
```

### 3. Instalar dependencias
```bash
pnpm install
```

### 4. Levantar la base de datos (PostgreSQL)
Asegúrate de tener PostgreSQL corriendo. Crea la base de datos:
```sql
CREATE DATABASE english_app;
```
Sequelize crea las tablas automáticamente en dev mode (`sync: { alter: true }`).

### 5. Iniciar en desarrollo
```bash
# Levanta frontend (port 5173) y backend (port 3001) en paralelo
pnpm dev
```

### 6. Abrir la app
```
http://localhost:5173
```

---

## API Endpoints

| Method | Endpoint                    | Descripción                          |
|--------|-----------------------------|--------------------------------------|
| POST   | `/api/chat/message`         | Enviar mensaje de texto al AI        |
| POST   | `/api/chat/audio`           | Enviar audio (Whisper → GPT-4o)     |
| GET    | `/api/srs/due/:userId`      | Obtener flashcards pendientes        |
| POST   | `/api/srs/review/:cardId`   | Calificar flashcard (grado 0-5)     |
| GET    | `/health`                   | Health check del servidor            |

### Respuesta del Chat (JSON)
```json
{
  "sessionId": "uuid",
  "message": "Teacher's English response (A1/A2 level)",
  "correction": {
    "hasError": true,
    "original": "I go yesterday to shop",
    "corrected": "I went to the shop yesterday",
    "explanation": "En inglés, el pasado simple de 'go' es 'went'. El tiempo y lugar van al final.",
    "rule": "Simple Past"
  },
  "vocabulary": [
    { "word": "went", "meaning": "fui / fue", "example": "I went to the market." }
  ],
  "taskStatus": "ongoing"
}
```

---

## Modulos principales

### Chat (TBLT + Recast)
- Interfaz tipo iMessage con burbujas de mensajes
- Boton de microfono grande con animacion de nivel de audio
- Tarjeta de correccion (ambar) que aparece con cada error
- El boton "Repetir frase correcta" obliga al alumno a practicar la correccion

### Shadowing
- 4 ejercicios en niveles A1/A2/B1 (transporte, cafe, universidad, redes GPON)
- Flujo: Escuchar audio nativo -> Grabar -> Comparar formas de onda
- Web Speech API con preferencia por voz britanica (en-GB)

### Flashcards (SRS - SM-2)
- Algoritmo SM-2 identico al usado por Anki
- Tarjetas generadas automaticamente desde errores del chat
- 6 grados de calificacion (0=Blackout -> 5=Perfect)
- Barra de progreso por sesion

### Dashboard
- Racha de dias (streak), nivel actual, palabras aprendidas
- Alerta de tarjetas pendientes de revision
- Accesos rapidos a los 3 modulos
- Tip diario contextualizado a la vida en el Reino Unido

---

## Escalabilidad

- **Auth**: Añadir JWT middleware en `backend/src/middleware/auth.middleware.ts`
- **Gemini**: El servicio `ai.service.ts` puede alternarse con `@google/generative-ai`
- **MySQL**: Cambiar `dialect: 'postgres'` a `'mysql'` en `database.ts` y usar `mysql2`
- **PWA**: Añadir `vite-plugin-pwa` para instalación en móvil
- **Deploy**: Frontend → Vercel/Netlify · Backend → Railway/Render · DB → Supabase/Neon
