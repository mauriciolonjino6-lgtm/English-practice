export type ExerciseType = 'listening' | 'speaking' | 'fill-blank' | 'multiple-choice' | 'sentence-order'

export interface ExerciseItem {
  id: string
  type: ExerciseType
  instruction: string
  prompt: string
  audioText?: string
  options?: string[]
  correctAnswer: string
  hint?: string
  explanation: string
}

export interface Lesson {
  id: string
  unitId: string
  unitTitle: string
  title: string
  description: string
  durationMinutes: number
  type: 'mixed' | 'listening' | 'speaking' | 'grammar'
  exercises: ExerciseItem[]
}

export interface Exam {
  id: string
  unitId?: string
  level: 'A2' | 'B1' | 'B2'
  title: string
  description: string
  passingScore: number
  exercises: ExerciseItem[]
}

export interface Unit {
  id: string
  level: 'A2' | 'B1' | 'B2'
  unitNumber: number
  title: string
  topic: string
  description: string
  lessons: Lesson[]
  exam: Exam
}

export const CURRICULUM_A2: Unit[] = [
  {
    id: 'unit-1',
    level: 'A2',
    unitNumber: 1,
    title: 'Rutinas, Hábitos y Pasado Real',
    topic: 'Past Simple, Past Continuous & Daily Life',
    description: 'Aprende a contar lo que hiciste ayer, tus hábitos y acciones interrumpidas usando inglés británico natural.',
    lessons: [
      {
        id: 'u1-l1',
        unitId: 'unit-1',
        unitTitle: 'Unidad 1',
        title: 'Escucha: Una mañana típica en Oxford',
        description: 'Entrena tu oído con frases cotidianas de rutina y pasado en acento británico.',
        durationMinutes: 4,
        type: 'listening',
        exercises: [
          {
            id: 'u1-l1-e1',
            type: 'listening',
            instruction: 'Escucha el audio del profesor y selecciona qué hizo primero.',
            prompt: 'Yesterday morning, I woke up at seven, put the kettle on for a cuppa, and read the morning post before heading to the university.',
            audioText: 'Yesterday morning, I woke up at seven, put the kettle on for a cuppa, and read the morning post before heading to the university.',
            options: ['Tomó un taxi a la universidad', 'Puso la tetera a hervir para un té', 'Fue a comprar el periódico', 'Se quedó dormido'],
            correctAnswer: 'Puso la tetera a hervir para un té',
            hint: 'Presta atención a la frase británica "put the kettle on for a cuppa".',
            explanation: 'En el Reino Unido, "put the kettle on for a cuppa" significa poner a hervir agua en la tetera para preparar una taza de té (cuppa).'
          },
          {
            id: 'u1-l1-e2',
            type: 'listening',
            instruction: 'Escucha con atención y completa la palabra que falta.',
            prompt: 'While I was walking to college, it suddenly started to _____ cats and dogs!',
            audioText: 'While I was walking to college, it suddenly started to rain cats and dogs!',
            options: ['rain', 'pour', 'snow', 'wind'],
            correctAnswer: 'rain',
            hint: 'Es la famosa expresión británica "rain cats and dogs" (llover a cántaros).',
            explanation: '"Rain cats and dogs" es un modismo común para decir que llueve muy fuerte.'
          },
          {
            id: 'u1-l1-e3',
            type: 'multiple-choice',
            instruction: '¿Cuál es la forma correcta del verbo en pasado simple para "buy"?',
            prompt: 'Last Saturday, my brother _____ a vintage bicycle at the Oxford market.',
            options: ['bought', 'buyed', 'was buy', 'buying'],
            correctAnswer: 'bought',
            explanation: 'El verbo "buy" es irregular en pasado: buy -> bought. Nunca se dice "buyed".'
          }
        ]
      },
      {
        id: 'u1-l2',
        unitId: 'unit-1',
        unitTitle: 'Unidad 1',
        title: 'Pronunciación: Terminaciones -ed en Pasado',
        description: 'Domina los 3 sonidos de la terminación -ed (/t/, /d/, /ɪd/) para sonar como nativo.',
        durationMinutes: 5,
        type: 'speaking',
        exercises: [
          {
            id: 'u1-l2-e1',
            type: 'speaking',
            instruction: 'Escucha y pronuncia la siguiente frase con sonido /t/ en "worked":',
            prompt: 'I worked all day yesterday.',
            audioText: 'I worked all day yesterday.',
            correctAnswer: 'I worked all day yesterday.',
            hint: 'La "k" es sorda, por lo que "-ed" suena como una "t" seca: "work-t".',
            explanation: 'Cuando un verbo termina en sonido sordo como /k/, la terminación -ed se pronuncia como /t/.'
          },
          {
            id: 'u1-l2-e2',
            type: 'speaking',
            instruction: 'Escucha y pronuncia esta frase con sonido /ɪd/ en "decided":',
            prompt: 'We decided to visit London.',
            audioText: 'We decided to visit London.',
            correctAnswer: 'We decided to visit London.',
            hint: 'Los verbos que terminan en sonido "d" o "t" añaden una sílaba extra: "de-ci-ded".',
            explanation: 'Solo se pronuncia como sílaba completa /ɪd/ cuando el verbo termina en sonido /t/ o /d/ (ej: decided, wanted).'
          },
          {
            id: 'u1-l2-e3',
            type: 'sentence-order',
            instruction: 'Ordena las palabras para formar la oración afirmativa en pasado:',
            prompt: 'yesterday / sushi / I / ate / for dinner',
            options: ['I', 'ate', 'sushi', 'for dinner', 'yesterday'],
            correctAnswer: 'I ate sushi for dinner yesterday',
            explanation: 'Estructura en inglés: Sujeto (I) + Verbo en pasado (ate) + Objeto (sushi) + Complemento de tiempo.'
          }
        ]
      },
      {
        id: 'u1-l3',
        unitId: 'unit-1',
        unitTitle: 'Unidad 1',
        title: 'Gramática Activa: Pasado Simple vs Continuo',
        description: 'Aprende a contrastar una acción que estaba ocurriendo cuando otra la interrumpió.',
        durationMinutes: 5,
        type: 'grammar',
        exercises: [
          {
            id: 'u1-l3-e1',
            type: 'fill-blank',
            instruction: 'Selecciona la forma correcta para completar la acción interrumpida:',
            prompt: 'I _____ (cook) dinner when my friend rang the doorbell.',
            options: ['was cooking', 'cooked', 'were cooking', 'am cooking'],
            correctAnswer: 'was cooking',
            hint: 'Usa "was/were + -ing" para la acción en progreso en el pasado.',
            explanation: 'Usamos el pasado continuo (was cooking) para la acción prolongada que estaba en proceso cuando ocurrió la acción corta en pasado simple (rang).'
          },
          {
            id: 'u1-l3-e2',
            type: 'fill-blank',
            instruction: 'Completa con la palabra conectora adecuada:',
            prompt: '_____ we were having a cup of tea, it began to snow.',
            options: ['While', 'During', 'Because', 'So'],
            correctAnswer: 'While',
            hint: '"While" (mientras) se usa seguido de una cláusula con sujeto y verbo continuo.',
            explanation: '"While" introduce la cláusula en pasado continuo: While we were having tea...'
          },
          {
            id: 'u1-l3-e3',
            type: 'multiple-choice',
            instruction: '¿Cuál de estas oraciones está redactada de forma 100% correcta?',
            prompt: 'Elige la opción gramaticalmente correcta:',
            options: [
              'What were you doing at 8 p.m. last night?',
              'What was you doing at 8 p.m. last night?',
              'What did you doing at 8 p.m. last night?',
              'What you were doing at 8 p.m. last night?'
            ],
            correctAnswer: 'What were you doing at 8 p.m. last night?',
            explanation: 'Con el pronombre "you", el pasado del verbo to be es siempre "were": What were you doing...?'
          }
        ]
      }
    ],
    exam: {
      id: 'exam-u1',
      level: 'A2',
      title: 'Examen de Evaluación: Unidad 1 (Pasado y Rutinas)',
      description: 'Demuestra tu dominio de las formas de pasado simple, continuo y vocabulario de rutina.',
      passingScore: 70,
      exercises: [
        {
          id: 'ex-u1-1',
          type: 'listening',
          instruction: 'Escucha la historia y responde a qué hora llegó el tren.',
          prompt: 'I was waiting on platform 3 in Oxford. The train finally arrived at half past four.',
          audioText: 'I was waiting on platform 3 in Oxford. The train finally arrived at half past four.',
          options: ['4:30', '4:15', '5:30', '3:45'],
          correctAnswer: '4:30',
          explanation: '"Half past four" en inglés británico significa exactamente las 4:30.'
        },
        {
          id: 'ex-u1-2',
          type: 'fill-blank',
          instruction: 'Completa la oración con la forma negativa correcta:',
          prompt: 'We _____ (not go) to the cinema because we were tired.',
          options: ["didn't go", "didn't went", "weren't go", "not went"],
          correctAnswer: "didn't go",
          explanation: 'Para negar en pasado simple usamos el auxiliar "didn\'t" + el verbo en forma base (go).'
        },
        {
          id: 'ex-u1-3',
          type: 'speaking',
          instruction: 'Pronuncia en voz alta esta oración con entonación natural:',
          prompt: 'Where did you go on holiday last summer?',
          audioText: 'Where did you go on holiday last summer?',
          correctAnswer: 'Where did you go on holiday last summer?',
          explanation: 'En las preguntas en inglés, la entonación suele descender al final si inician con una Wh-word.'
        },
        {
          id: 'ex-u1-4',
          type: 'sentence-order',
          instruction: 'Ordena la frase correctamente:',
          prompt: 'she / when / was sleeping / the phone / rang',
          options: ['She', 'was sleeping', 'when', 'the phone', 'rang'],
          correctAnswer: 'She was sleeping when the phone rang',
          explanation: 'Acción larga en pasado continuo (was sleeping) interrumpida por acción corta (the phone rang).'
        }
      ]
    }
  },
  {
    id: 'unit-2',
    level: 'A2',
    unitNumber: 2,
    title: 'Viajes, Transporte y Futuro',
    topic: 'Going to, Will & Navigating British Cities',
    description: 'Aprende a pedir indicaciones en la calle, moverte en metro/tren y hablar de tus planes futuros.',
    lessons: [
      {
        id: 'u2-l1',
        unitId: 'unit-2',
        unitTitle: 'Unidad 2',
        title: 'Escucha: En la estación de Paddington',
        description: 'Comprende anuncios de trenes, billetes y destinos británicos comunes.',
        durationMinutes: 4,
        type: 'listening',
        exercises: [
          {
            id: 'u2-l1-e1',
            type: 'listening',
            instruction: 'Escucha el anuncio del revisor y selecciona el andén (platform):',
            prompt: 'The train to Oxford will depart from platform four in ten minutes. Please mind the gap.',
            audioText: 'The train to Oxford will depart from platform four in ten minutes. Please mind the gap.',
            options: ['Andén 4', 'Andén 14', 'Andén 2', 'Andén 10'],
            correctAnswer: 'Andén 4',
            hint: 'Escucha "platform four" y la clásica frase británica "mind the gap".',
            explanation: '"Platform four" es el andén 4. "Mind the gap" es la famosa advertencia del transporte británico para tener cuidado con el espacio entre el tren y el andén.'
          },
          {
            id: 'u2-l1-e2',
            type: 'multiple-choice',
            instruction: '¿Cómo se pide un billete de ida y vuelta en inglés británico?',
            prompt: 'En la taquilla de trenes en Londres, solicitas:',
            options: ['A return ticket to Oxford, please.', 'A round trip ticket, please.', 'A two-way ticket, please.', 'A back ticket, please.'],
            correctAnswer: 'A return ticket to Oxford, please.',
            explanation: 'En el Reino Unido, un billete de ida y vuelta se llama "a return ticket".'
          }
        ]
      },
      {
        id: 'u2-l2',
        unitId: 'unit-2',
        unitTitle: 'Unidad 2',
        title: 'Hablar: Pedir Direcciones con Cortesía',
        description: 'Usa modales británicos de cortesía para ubicarte en cualquier ciudad.',
        durationMinutes: 5,
        type: 'speaking',
        exercises: [
          {
            id: 'u2-l2-e1',
            type: 'speaking',
            instruction: 'Escucha y repite la fórmula de cortesía más usada en Londres:',
            prompt: 'Excuse me, could you tell me the way to the British Museum?',
            audioText: 'Excuse me, could you tell me the way to the British Museum?',
            correctAnswer: 'Excuse me, could you tell me the way to the British Museum?',
            hint: '"Could you tell me the way to..." es la manera más educada de pedir una dirección.',
            explanation: 'Iniciar con "Excuse me" y usar el modal "Could you..." es el estándar de educación británico.'
          },
          {
            id: 'u2-l2-e2',
            type: 'fill-blank',
            instruction: 'Completa la indicación de dirección:',
            prompt: 'Go straight on, and take the second turning on the _____.',
            options: ['left', 'leave', 'lefting', 'depart'],
            correctAnswer: 'left',
            explanation: '"Take the second turning on the left" significa "toma la segunda calle a la izquierda".'
          }
        ]
      },
      {
        id: 'u2-l3',
        unitId: 'unit-2',
        unitTitle: 'Unidad 2',
        title: 'Gramática: Planes (Going to) vs Decisiones Espontáneas (Will)',
        description: 'Distingue claramente cuándo usar "be going to" y cuándo usar "will".',
        durationMinutes: 5,
        type: 'grammar',
        exercises: [
          {
            id: 'u2-l3-e1',
            type: 'fill-blank',
            instruction: 'Selecciona la forma correcta para una decisión que ya habías planeado con anticipación:',
            prompt: 'Next weekend, I _____ (visit) my cousins in Cambridge.',
            options: ['am going to visit', 'will visiting', 'visit will', 'going to visit'],
            correctAnswer: 'am going to visit',
            hint: 'Para planes decididos antes del momento de hablar usamos "be going to".',
            explanation: 'Usamos "am going to visit" porque es un plan predeterminado.'
          },
          {
            id: 'u2-l3-e2',
            type: 'multiple-choice',
            instruction: 'Alguien toca a la puerta. Tomas la decisión en el momento:',
            prompt: 'The phone is ringing! — Don’t worry, _____ it!',
            options: ["I'll answer", "I'm going to answer", "I answered", "I answering"],
            correctAnswer: "I'll answer",
            explanation: 'Para ofrecimientos y decisiones espontáneas tomadas al instante usamos "will" (I\'ll).'
          }
        ]
      }
    ],
    exam: {
      id: 'exam-u2',
      level: 'A2',
      title: 'Examen de Evaluación: Unidad 2 (Viajes y Futuro)',
      description: 'Evalúa tu capacidad de orientarte en una ciudad británica y expresar planes futuros.',
      passingScore: 70,
      exercises: [
        {
          id: 'ex-u2-1',
          type: 'fill-blank',
          instruction: 'Completa con la forma adecuada de futuro:',
          prompt: 'Look at those dark clouds! It _____ (rain).',
          options: ['is going to rain', 'will raining', 'rains', 'was raining'],
          correctAnswer: 'is going to rain',
          explanation: 'Cuando hay evidencia visual inmediata en el presente (las nubes negras), usamos "be going to".'
        },
        {
          id: 'ex-u2-2',
          type: 'sentence-order',
          instruction: 'Ordena la pregunta para pedir indicaciones:',
          prompt: 'is / where / station / nearest / the / tube / ?',
          options: ['Where', 'is', 'the', 'nearest', 'tube', 'station?'],
          correctAnswer: 'Where is the nearest tube station?',
          explanation: '"Tube station" es la estación de metro en Londres.'
        },
        {
          id: 'ex-u2-3',
          type: 'speaking',
          instruction: 'Pronuncia en voz alta tu respuesta para comprar un billete:',
          prompt: 'Can I have a single ticket to London Victoria, please?',
          audioText: 'Can I have a single ticket to London Victoria, please?',
          correctAnswer: 'Can I have a single ticket to London Victoria, please?',
          explanation: '"Single ticket" es un billete solo de ida.'
        }
      ]
    }
  },
  {
    id: 'unit-3',
    level: 'A2',
    unitNumber: 3,
    title: 'Experiencias de Vida y Presente Perfecto',
    topic: 'Present Perfect with Ever, Never, Just & Life Stories',
    description: 'Aprende a hablar de cosas que has hecho o nunca has probado en tu vida.',
    lessons: [
      {
        id: 'u3-l1',
        unitId: 'unit-3',
        unitTitle: 'Unidad 3',
        title: 'Escucha: ¿Alguna vez has estado en Inglaterra?',
        description: 'Aprende a reconocer preguntas sobre experiencias con "Have you ever...?"',
        durationMinutes: 4,
        type: 'listening',
        exercises: [
          {
            id: 'u3-l1-e1',
            type: 'listening',
            instruction: 'Escucha la pregunta del profesor y selecciona el significado:',
            prompt: 'Have you ever tried traditional English fish and chips with malt vinegar?',
            audioText: 'Have you ever tried traditional English fish and chips with malt vinegar?',
            options: [
              '¿Alguna vez has probado el tradicional pescado frito con vinagre de malta?',
              '¿Vas a comprar pescado y patatas mañana?',
              '¿Dónde cocinaste pescado y patatas la semana pasada?',
              '¿Te gusta el vinagre de vino tinto?'
            ],
            correctAnswer: '¿Alguna vez has probado el tradicional pescado frito con vinagre de malta?',
            explanation: '"Have you ever tried...?" es la estructura clásica para preguntar si has tenido esa experiencia alguna vez en tu vida.'
          },
          {
            id: 'u3-l1-e2',
            type: 'multiple-choice',
            instruction: '¿Cuál es la respuesta corta afirmativa correcta a "Have you seen Big Ben?"',
            prompt: 'Responde afirmativamente:',
            options: ['Yes, I have.', 'Yes, I did.', 'Yes, I seen.', 'Yes, I do.'],
            correctAnswer: 'Yes, I have.',
            explanation: 'Si la pregunta inicia con "Have you...?", la respuesta corta utiliza el mismo auxiliar: "Yes, I have" o "No, I haven\'t".'
          }
        ]
      },
      {
        id: 'u3-l2',
        unitId: 'unit-3',
        unitTitle: 'Unidad 3',
        title: 'Hablar: Compartir Experiencias con Never y Just',
        description: 'Practica frases de impacto sobre experiencias recientes y cosas que aún no has hecho.',
        durationMinutes: 5,
        type: 'speaking',
        exercises: [
          {
            id: 'u3-l2-e1',
            type: 'speaking',
            instruction: 'Pronuncia esta frase con fluidez natural:',
            prompt: 'I have never travelled outside of my country.',
            audioText: 'I have never travelled outside of my country.',
            correctAnswer: 'I have never travelled outside of my country.',
            hint: '"Never" se coloca entre el auxiliar "have" y el participio pasado "travelled".',
            explanation: 'Estructura: Sujeto + have/has + never + participio pasado.'
          },
          {
            id: 'u3-l2-e2',
            type: 'speaking',
            instruction: 'Pronuncia esta frase para indicar una acción recién terminada:',
            prompt: 'I have just finished my homework.',
            audioText: 'I have just finished my homework.',
            correctAnswer: 'I have just finished my homework.',
            hint: '"Just" indica que la acción ocurrió hace solo unos instantes.',
            explanation: '"I have just finished" equivale a "Acabo de terminar".'
          }
        ]
      },
      {
        id: 'u3-l3',
        unitId: 'unit-3',
        unitTitle: 'Unidad 3',
        title: 'Gramática: Presente Perfecto vs Pasado Simple',
        description: 'El dilema número 1 del estudiante: cuándo dar detalles específicos con tiempo definido.',
        durationMinutes: 5,
        type: 'grammar',
        exercises: [
          {
            id: 'u3-l3-e1',
            type: 'fill-blank',
            instruction: 'Selecciona la opción correcta cuando se menciona un momento específico (yesterday):',
            prompt: 'I _____ (lose) my umbrella yesterday at the library.',
            options: ['lost', 'have lost', 'was losing', 'losed'],
            correctAnswer: 'lost',
            hint: 'Si la frase dice "yesterday", "last year" o una fecha fija, se usa pasado simple obligatorio.',
            explanation: 'Al especificar el tiempo (yesterday), la regla exige el Pasado Simple (lost), no el Presente Perfecto.'
          },
          {
            id: 'u3-l3-e2',
            type: 'sentence-order',
            instruction: 'Ordena la pregunta correctamente:',
            prompt: 'you / ever / have / to / been / London / ?',
            options: ['Have', 'you', 'ever', 'been', 'to', 'London?'],
            correctAnswer: 'Have you ever been to London?',
            explanation: 'En preguntas de experiencia de vida: Have + Sujeto + ever + participio (been to) + lugar.'
          }
        ]
      }
    ],
    exam: {
      id: 'exam-u3',
      level: 'A2',
      title: 'Examen de Evaluación: Unidad 3 (Presente Perfecto y Experiencias)',
      description: 'Pon a prueba tu conocimiento de participios irregulares y tiempos perfectos.',
      passingScore: 70,
      exercises: [
        {
          id: 'ex-u3-1',
          type: 'fill-blank',
          instruction: 'Completa con el participio correcto del verbo "see":',
          prompt: 'Have you ever _____ that new documentary on BBC?',
          options: ['seen', 'saw', 'seed', 'seeing'],
          correctAnswer: 'seen',
          explanation: 'Las tres formas de "see" son: see (presente) - saw (pasado) - seen (participio pasado).'
        },
        {
          id: 'ex-u3-2',
          type: 'sentence-order',
          instruction: 'Ordena la frase afirmativa:',
          prompt: 'already / I / seen / have / film / that',
          options: ['I', 'have', 'already', 'seen', 'that', 'film'],
          correctAnswer: 'I have already seen that film',
          explanation: '"Already" se ubica normalmente entre el auxiliar "have" y el participio "seen".'
        },
        {
          id: 'ex-u3-3',
          type: 'speaking',
          instruction: 'Pronuncia tu respuesta con buena articulación:',
          prompt: 'She has lived in Manchester for three years.',
          audioText: 'She has lived in Manchester for three years.',
          correctAnswer: 'She has lived in Manchester for three years.',
          explanation: 'Usamos "for" para periodos de duración (three years).'
        }
      ]
    }
  },
  {
    id: 'unit-4',
    level: 'A2',
    unitNumber: 4,
    title: 'Comparaciones, Opiniones y Modales',
    topic: 'Comparatives, Superlatives, Should & Must',
    description: 'Aprende a comparar lugares, dar consejos usando should y expresar necesidades con must.',
    lessons: [
      {
        id: 'u4-l1',
        unitId: 'unit-4',
        unitTitle: 'Unidad 4',
        title: 'Comparativos: Más que y el Mejor',
        description: 'Domina los comparativos regulares e irregulares (better, worse, farther).',
        durationMinutes: 4,
        type: 'grammar',
        exercises: [
          {
            id: 'u4-l1-e1',
            type: 'fill-blank',
            instruction: 'Completa con la forma comparativa correcta de "good":',
            prompt: 'Tea with milk is much _____ (good) than black coffee in my opinion.',
            options: ['better', 'more good', 'gooder', 'best'],
            correctAnswer: 'better',
            hint: '"Good" es irregular. No existe "gooder" ni "more good".',
            explanation: 'El comparativo de "good" es "better", y el superlativo es "the best".'
          },
          {
            id: 'u4-l1-e2',
            type: 'fill-blank',
            instruction: 'Completa con el superlativo correcto de "busy":',
            prompt: 'Oxford Circus is one of the _____ (busy) tube stations in London.',
            options: ['busiest', 'most busy', 'busier', 'more busy'],
            correctAnswer: 'busiest',
            explanation: 'Para adjetivos de dos sílabas terminados en "y", cambiamos la "y" por "i" y agregamos "-est": busy -> busiest.'
          }
        ]
      },
      {
        id: 'u4-l2',
        unitId: 'unit-4',
        unitTitle: 'Unidad 4',
        title: 'Consejos y Sugerencias con Should y Ought to',
        description: 'Aprende a dar recomendaciones de viaje y estudio amigables.',
        durationMinutes: 5,
        type: 'speaking',
        exercises: [
          {
            id: 'u4-l2-e1',
            type: 'speaking',
            instruction: 'Escucha y pronuncia este consejo clásico británico:',
            prompt: 'You should always carry an umbrella in England!',
            audioText: 'You should always carry an umbrella in England!',
            correctAnswer: 'You should always carry an umbrella in England!',
            hint: 'Recuerda que la "l" en "should" es silenciosa: suena /ʃʊd/.',
            explanation: 'En "should", "could" y "would", la letra L no se pronuncia.'
          },
          {
            id: 'u4-l2-e2',
            type: 'multiple-choice',
            instruction: 'Tu amigo tiene fiebre. ¿Cuál es el mejor consejo?',
            prompt: 'You look unwell. You _____ see a doctor.',
            options: ['should', 'should to', 'must to', 'ought'],
            correctAnswer: 'should',
            explanation: 'Los verbos modales como "should" van seguidos directamente del verbo en infinitivo sin "to": You should see a doctor.'
          }
        ]
      }
    ],
    exam: {
      id: 'exam-u4',
      level: 'A2',
      title: 'Examen de Evaluación: Unidad 4 (Comparativos y Modales)',
      description: 'Mide tu capacidad de dar recomendaciones y comparar opciones.',
      passingScore: 70,
      exercises: [
        {
          id: 'ex-u4-1',
          type: 'fill-blank',
          instruction: 'Completa con la forma comparativa de "expensive":',
          prompt: 'London is much _____ than my hometown.',
          options: ['more expensive', 'expensiver', 'most expensive', 'as expensive'],
          correctAnswer: 'more expensive',
          explanation: 'Para adjetivos largos de 3 o más sílabas usamos "more + adjetivo + than".'
        },
        {
          id: 'ex-u4-2',
          type: 'sentence-order',
          instruction: 'Ordena la recomendación:',
          prompt: 'try / should / traditional / you / scones / the',
          options: ['You', 'should', 'try', 'the', 'traditional', 'scones'],
          correctAnswer: 'You should try the traditional scones',
          explanation: 'Estructura: Sujeto + should + verbo base + objeto.'
        }
      ]
    }
  }
]

export const FINAL_A2_EXAM: Exam = {
  id: 'final-exam-a2',
  level: 'A2',
  title: 'Examen de Certificación Integral Nivel A2',
  description: 'Examen global que valida tus competencias de nivel A2 en Comprensión Auditiva, Expresión Oral, Gramática y Vocabulario.',
  passingScore: 75,
  exercises: [
    {
      id: 'final-a2-1',
      type: 'listening',
      instruction: 'Escucha la historia completa de Mr. Davies y elige la conclusión correcta:',
      prompt: 'When I first came to Oxford twenty years ago, I didn\'t know anyone. I spent my first afternoon sitting in a quiet teashop by the river, writing in my journal. It was raining gently, as it often does in England. That quiet afternoon made me fall in love with this historic city.',
      audioText: 'When I first came to Oxford twenty years ago, I didn\'t know anyone. I spent my first afternoon sitting in a quiet teashop by the river, writing in my journal. It was raining gently, as it often does in England. That quiet afternoon made me fall in love with this historic city.',
      options: [
        'Se enamoró de Oxford mientras tomaba el té junto al río en una tarde lluviosa.',
        'Se perdió en el metro de Londres y no pudo llegar a la universidad.',
        'Decidió regresar a su país al día siguiente porque no conocía a nadie.',
        'Fue a comprar libros antiguos en el mercado de Camden.'
      ],
      correctAnswer: 'Se enamoró de Oxford mientras tomaba el té junto al río en una tarde lluviosa.',
      explanation: 'El profesor describe cómo su primera tarde en una casa de té junto al río mientras llovía suavemente le hizo enamorarse de la ciudad de Oxford.'
    },
    {
      id: 'final-a2-2',
      type: 'fill-blank',
      instruction: 'Completa la frase con la combinación correcta de pasado:',
      prompt: 'While they _____ (walk) in Hyde Park, they _____ (see) a royal carriage.',
      options: ['were walking / saw', 'walked / were seeing', 'are walking / saw', 'was walking / seen'],
      correctAnswer: 'were walking / saw',
      explanation: 'Acción en progreso en pasado continuo (were walking) y acción puntual en pasado simple (saw).'
    },
    {
      id: 'final-a2-3',
      type: 'speaking',
      instruction: 'Pronuncia en voz alta esta frase con ritmo y claridad británica:',
      prompt: 'I have lived in this city since two thousand and twenty.',
      audioText: 'I have lived in this city since two thousand and twenty.',
      correctAnswer: 'I have lived in this city since two thousand and twenty.',
      hint: 'Nota el uso de "since" para indicar el punto de partida en el tiempo.',
      explanation: 'Usamos "since" con años o momentos concretos (since 2020), a diferencia de "for" que indica duración.'
    },
    {
      id: 'final-a2-4',
      type: 'sentence-order',
      instruction: 'Ordena la oración para pedir ayuda cortésmente:',
      prompt: 'mind / would / closing / the window / you / please / ?',
      options: ['Would', 'you', 'mind', 'closing', 'the window,', 'please?'],
      correctAnswer: 'Would you mind closing the window, please?',
      explanation: 'La expresión "Would you mind + verbo con -ing" es una de las fórmulas más elegantes de cortesía en el idioma inglés.'
    },
    {
      id: 'final-a2-5',
      type: 'multiple-choice',
      instruction: '¿Cuál es la forma correcta del presente perfecto para indicar que nunca has ido?',
      prompt: 'I _____ to Japan, but I would love to go one day.',
      options: ["have never been", "never have went", "haven't never been", "was never being"],
      correctAnswer: 'have never been',
      explanation: 'Usamos "have never been to" para indicar que nunca has visitado un lugar.'
    },
    {
      id: 'final-a2-6',
      type: 'fill-blank',
      instruction: 'Completa con el modal correcto de recomendación:',
      prompt: 'If you want to improve your spoken English, you _____ practise every single day.',
      options: ['should', 'must to', 'have', 'ought'],
      correctAnswer: 'should',
      explanation: '"Should" es el modal por excelencia para aconsejar y recomendar acciones.'
    }
  ]
}

