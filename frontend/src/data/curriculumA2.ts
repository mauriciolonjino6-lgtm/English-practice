export type ExerciseType = 'listening' | 'speaking' | 'fill-blank' | 'multiple-choice' | 'sentence-order'
export type CEFRLevel = 'A2' | 'B1' | 'B2' | 'C1' | 'C2'

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
  level: CEFRLevel
  title: string
  description: string
  passingScore: number
  exercises: ExerciseItem[]
}

export interface Unit {
  id: string
  level: CEFRLevel
  unitNumber: number
  title: string
  topic: string
  description: string
  lessons: Lesson[]
  exam: Exam
}

// ════════════════════════════════════════════════════════════════════════════════
// NIVEL A2: PRE-INTERMEDIO
// ════════════════════════════════════════════════════════════════════════════════
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
          }
        ]
      }
    ],
    exam: {
      id: 'exam-u1',
      level: 'A2',
      title: 'Examen de Evaluación: Unidad 1',
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
        title: 'Escucha: En la estación de tren de Londres',
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
            explanation: '"Platform four" es el andén 4. "Mind the gap" es la famosa advertencia del transporte británico.'
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
            explanation: 'Iniciar con "Excuse me" y usar el modal "Could you..." es el estándar de educación británico.'
          }
        ]
      }
    ],
    exam: {
      id: 'exam-u2',
      level: 'A2',
      title: 'Examen de Evaluación: Unidad 2',
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
          explanation: 'Con evidencia visual en el presente usamos "be going to".'
        }
      ]
    }
  }
]

export const FINAL_A2_EXAM: Exam = {
  id: 'final-exam-a2',
  level: 'A2',
  title: 'Examen de Certificación Integral Nivel A2',
  description: 'Valida tus competencias de nivel A2 en Comprensión Auditiva, Expresión Oral, Gramática y Vocabulario.',
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
      explanation: 'El profesor describe cómo su primera tarde en una casa de té junto al río le hizo enamorarse de Oxford.'
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
      explanation: 'Usamos "since" con años o momentos concretos (since 2020).'
    }
  ]
}

// ════════════════════════════════════════════════════════════════════════════════
// NIVEL B1: INTERMEDIO (Intermediate)
// ════════════════════════════════════════════════════════════════════════════════
export const CURRICULUM_B1: Unit[] = [
  {
    id: 'b1-unit-1',
    level: 'B1',
    unitNumber: 1,
    title: 'Condicionales y Decisiones Hipotéticas',
    topic: '1st & 2nd Conditionals (If Clauses)',
    description: 'Aprende a expresar consecuencias reales e hipótesis imaginarias sobre el futuro y la vida cotidiana.',
    lessons: [
      {
        id: 'b1-u1-l1',
        unitId: 'b1-unit-1',
        unitTitle: 'Unidad 1',
        title: 'Primer Condicional: Planes y Condiciones Reales',
        description: 'Domina la estructura "If + presente, will + verbo" para causas y efectos reales.',
        durationMinutes: 5,
        type: 'grammar',
        exercises: [
          {
            id: 'b1-u1-l1-e1',
            type: 'fill-blank',
            instruction: 'Completa la condición real:',
            prompt: 'If it _____ (rain) this afternoon, we _____ (stay) in the library.',
            options: ['rains / will stay', 'will rain / stay', 'rained / would stay', 'rains / stayed'],
            correctAnswer: 'rains / will stay',
            explanation: 'En el primer condicional: If + Presente Simple (rains), Will + Infinitivo (will stay).'
          },
          {
            id: 'b1-u1-l1-e2',
            type: 'speaking',
            instruction: 'Pronuncia esta advertencia cotidiana británica:',
            prompt: 'If you hurry up, you will catch the bus on time.',
            audioText: 'If you hurry up, you will catch the bus on time.',
            correctAnswer: 'If you hurry up, you will catch the bus on time.',
            explanation: 'Enfoca la entonación en "hurry up" y "catch the bus".'
          }
        ]
      },
      {
        id: 'b1-u1-l2',
        unitId: 'b1-unit-1',
        unitTitle: 'Unidad 1',
        title: 'Segundo Condicional: Situaciones Imaginarias',
        description: 'Expresa sueños, consejos e hipótesis con "If I had... I would...".',
        durationMinutes: 5,
        type: 'speaking',
        exercises: [
          {
            id: 'b1-u1-l2-e1',
            type: 'sentence-order',
            instruction: 'Ordena la frase clásica para dar consejos:',
            prompt: 'were / I / if / you / , / would / accept / I / the offer',
            options: ['If', 'I', 'were', 'you,', 'I', 'would', 'accept', 'the offer'],
            correctAnswer: 'If I were you, I would accept the offer',
            explanation: '"If I were you" es la fórmula formal británica para decir "Si yo fuera tú".'
          },
          {
            id: 'b1-u1-l2-e2',
            type: 'fill-blank',
            instruction: 'Completa la hipótesis irreal en el presente:',
            prompt: 'If I _____ (have) more free time, I _____ (travel) all around Scotland.',
            options: ['had / would travel', 'have / will travel', 'had / will travel', 'would have / travelled'],
            correctAnswer: 'had / would travel',
            explanation: 'Segundo condicional: If + Pasado Simple (had), Would + Infinitivo (would travel).'
          }
        ]
      }
    ],
    exam: {
      id: 'exam-b1-u1',
      level: 'B1',
      title: 'Examen de Evaluación: Unidad 1 (Condicionales B1)',
      description: 'Mide tu capacidad de usar 1st y 2nd conditionals con precisión.',
      passingScore: 70,
      exercises: [
        {
          id: 'ex-b1-1',
          type: 'fill-blank',
          instruction: 'Selecciona la opción correcta:',
          prompt: 'What _____ you do if you _____ a million pounds?',
          options: ['would / won', 'will / win', 'would / win', 'did / would win'],
          correctAnswer: 'would / won',
          explanation: 'Pregunta en segundo condicional: What would you do if you won...?'
        }
      ]
    }
  },
  {
    id: 'b1-unit-2',
    level: 'B1',
    unitNumber: 2,
    title: 'Voz Pasiva y Reporte de Noticias',
    topic: 'Passive Voice (Present & Past) & Reported Speech',
    description: 'Aprende a describir procesos, hechos históricos y transmitir lo que otras personas dijeron.',
    lessons: [
      {
        id: 'b1-u2-l1',
        unitId: 'b1-unit-2',
        unitTitle: 'Unidad 2',
        title: 'Voz Pasiva: Hechos Históricos y Procesos',
        description: 'Enfoca la atención en el objeto de la acción con "be + participio".',
        durationMinutes: 5,
        type: 'grammar',
        exercises: [
          {
            id: 'b1-u2-l1-e1',
            type: 'fill-blank',
            instruction: 'Transforma la oración a voz pasiva en pasado:',
            prompt: 'The historic Bodleian Library _____ (build) in the seventeenth century.',
            options: ['was built', 'is built', 'built', 'were built'],
            correctAnswer: 'was built',
            explanation: 'Voz pasiva en pasado simple singular: was + participio pasado (built).'
          },
          {
            id: 'b1-u2-l1-e2',
            type: 'listening',
            instruction: 'Escucha el dato histórico de Oxford y responde qué producto se inventó allí:',
            prompt: 'Penicillin was successfully tested in Oxford by Howard Florey and Ernst Chain in 1940.',
            audioText: 'Penicillin was successfully tested in Oxford by Howard Florey and Ernst Chain in 1940.',
            options: ['La penicilina', 'La imprenta', 'La máquina de vapor', 'El teléfono'],
            correctAnswer: 'La penicilina',
            explanation: 'El audio menciona que "Penicillin was successfully tested in Oxford".'
          }
        ]
      }
    ],
    exam: {
      id: 'exam-b1-u2',
      level: 'B1',
      title: 'Examen de Evaluación: Unidad 2 (Pasiva y Discurso B1)',
      description: 'Comprueba tu dominio de la voz pasiva y estilo indirecto.',
      passingScore: 70,
      exercises: [
        {
          id: 'ex-b1-2',
          type: 'fill-blank',
          instruction: 'Completa en voz pasiva en presente:',
          prompt: 'Millions of cups of tea _____ (consume) in the UK every day.',
          options: ['are consumed', 'is consumed', 'was consumed', 'consume'],
          correctAnswer: 'are consumed',
          explanation: 'Sujeto en plural ("cups of tea") requiere "are + consumed".'
        }
      ]
    }
  }
]

export const FINAL_B1_EXAM: Exam = {
  id: 'final-exam-b1',
  level: 'B1',
  title: 'Examen de Certificación Integral Nivel B1',
  description: 'Valida tu nivel B1 Intermedio según el MCER: condicionales, pasiva y argumentación fluida.',
  passingScore: 75,
  exercises: [
    {
      id: 'final-b1-1',
      type: 'listening',
      instruction: 'Escucha la opinión del profesor y selecciona su argumento principal:',
      prompt: 'If more people travelled by train rather than driving, traffic congestion in London would be significantly reduced, and air quality would improve remarkably.',
      audioText: 'If more people travelled by train rather than driving, traffic congestion in London would be significantly reduced, and air quality would improve remarkably.',
      options: [
        'Viajar en tren reduciría el tráfico y mejoraría el aire notablemente.',
        'Los coches son más económicos que los billetes de tren.',
        'El metro de Londres debe cerrarse los fines de semana.',
        'La gente prefiere caminar bajo la lluvia.'
      ],
      correctAnswer: 'Viajar en tren reduciría el tráfico y mejoraría el aire notablemente.',
      explanation: 'El profesor expone que viajar en tren reduce el tráfico y mejora la calidad del aire.'
    },
    {
      id: 'final-b1-2',
      type: 'fill-blank',
      instruction: 'Completa la transformación a estilo indirecto (Reported Speech):',
      prompt: '"I am living in London," he said. -> He said that he _____ in London.',
      options: ['was living', 'is living', 'lived', 'had lived'],
      correctAnswer: 'was living',
      explanation: 'En estilo indirecto, el presente continuo cambia a pasado continuo: am living -> was living.'
    },
    {
      id: 'final-b1-3',
      type: 'speaking',
      instruction: 'Pronuncia en voz alta tu respuesta con seguridad:',
      prompt: 'If I were to recommend one book, it would certainly be this one.',
      audioText: 'If I were to recommend one book, it would certainly be this one.',
      correctAnswer: 'If I were to recommend one book, it would certainly be this one.',
      explanation: '"If I were to..." es una construcción refinada de segundo condicional.'
    }
  ]
}

// ════════════════════════════════════════════════════════════════════════════════
// NIVEL B2: INTERMEDIO ALTO (Upper-Intermediate)
// ════════════════════════════════════════════════════════════════════════════════
export const CURRICULUM_B2: Unit[] = [
  {
    id: 'b2-unit-1',
    level: 'B2',
    unitNumber: 1,
    title: 'Tercer Condicional y Condicionales Mixtos',
    topic: '3rd Conditional (Regrets) & Mixed Conditionals',
    description: 'Expresa situaciones imposibles en el pasado y cómo eventos pasados influyen en tu presente.',
    lessons: [
      {
        id: 'b2-u1-l1',
        unitId: 'b2-unit-1',
        unitTitle: 'Unidad 1',
        title: 'Tercer Condicional: Hipótesis Imposibles en el Pasado',
        description: 'Domina "If + Past Perfect, would have + V3" para hablar de oportunidades pasadas.',
        durationMinutes: 5,
        type: 'grammar',
        exercises: [
          {
            id: 'b2-u1-l1-e1',
            type: 'fill-blank',
            instruction: 'Completa la hipótesis del pasado:',
            prompt: 'If we _____ (leave) home earlier, we wouldn\'t have missed our flight from Heathrow.',
            options: ['had left', 'have left', 'would leave', 'left'],
            correctAnswer: 'had left',
            explanation: 'Tercer condicional: If + Past Perfect (had left), would have + participio.'
          },
          {
            id: 'b2-u1-l1-e2',
            type: 'speaking',
            instruction: 'Pronuncia con contracciones naturales británicas ("would\'ve"):',
            prompt: 'I would have called you if I had known you were in London.',
            audioText: 'I would have called you if I had known you were in London.',
            correctAnswer: 'I would have called you if I had known you were in London.',
            explanation: 'En habla natural británica, "would have" se pronuncia /wʊdəv/.'
          }
        ]
      }
    ],
    exam: {
      id: 'exam-b2-u1',
      level: 'B2',
      title: 'Examen de Evaluación: Unidad 1 (Condicionales B2)',
      description: 'Mide tu manejo del tercer condicional y lamentos en el pasado.',
      passingScore: 70,
      exercises: [
        {
          id: 'ex-b2-1',
          type: 'fill-blank',
          instruction: 'Completa con la forma adecuada:',
          prompt: 'If she had listened to the advice, she _____ (not make) that serious mistake.',
          options: ["wouldn't have made", "wouldn't make", "didn't make", "hadn't made"],
          correctAnswer: "wouldn't have made",
          explanation: 'Resultado hipotético en pasado: wouldn\'t have made.'
        }
      ]
    }
  },
  {
    id: 'b2-unit-2',
    level: 'B2',
    unitNumber: 2,
    title: 'Modales de Deducción en Pasado',
    topic: 'Must have, Can\'t have, Could have, Should have',
    description: 'Especula sobre lo que ocurrió con diferentes grados de certeza y lógica.',
    lessons: [
      {
        id: 'b2-u2-l1',
        unitId: 'b2-unit-2',
        unitTitle: 'Unidad 2',
        title: 'Certeza Lógica y Especulación Pasada',
        description: 'Distingue cuándo usar "must have been" (certeza afirmativa) y "can\'t have been" (imposibilidad).',
        durationMinutes: 5,
        type: 'grammar',
        exercises: [
          {
            id: 'b2-u2-l1-e1',
            type: 'fill-blank',
            instruction: 'Selecciona el modal de deducción lógica:',
            prompt: 'The streets are completely soaked with puddles. It _____ (rain) heavily last night.',
            options: ['must have rained', 'can\'t have rained', 'should have rained', 'might rain'],
            correctAnswer: 'must have rained',
            explanation: '"Must have rained" indica deducción lógica casi segura basada en la evidencia (los charcos).'
          },
          {
            id: 'b2-u2-l1-e2',
            type: 'multiple-choice',
            instruction: 'Viste a Sarah en Oxford hace 5 minutos. Alguien dice que está en Nueva York:',
            prompt: 'You: "That\'s impossible! She _____ in New York; I just saw her on Broad Street!"',
            options: ['can\'t be', 'must be', 'should be', 'could have been'],
            correctAnswer: 'can\'t be',
            explanation: '"Can\'t be" expresa imposibilidad lógica contundente.'
          }
        ]
      }
    ],
    exam: {
      id: 'exam-b2-u2',
      level: 'B2',
      title: 'Examen de Evaluación: Unidad 2 (Modales B2)',
      description: 'Comprueba tu precisión deduciendo situaciones pasadas.',
      passingScore: 70,
      exercises: [
        {
          id: 'ex-b2-2',
          type: 'fill-blank',
          instruction: 'Completa con el reproche o crítica constructiva adecuada:',
          prompt: 'You _____ (tell) me you were going to be late! I waited in the rain for an hour.',
          options: ['should have told', 'must have told', 'can\'t have told', 'would tell'],
          correctAnswer: 'should have told',
          explanation: '"Should have told" se usa para expresar que algo debió haberse hecho pero no se hizo.'
        }
      ]
    }
  }
]

export const FINAL_B2_EXAM: Exam = {
  id: 'final-exam-b2',
  level: 'B2',
  title: 'Examen de Certificación Integral Nivel B2',
  description: 'Certificación oficial de nivel B2 Upper-Intermediate para comunicación profesional y académica.',
  passingScore: 75,
  exercises: [
    {
      id: 'final-b2-1',
      type: 'listening',
      instruction: 'Escucha el debate y selecciona la postura del profesor:',
      prompt: 'While remote working offers undeniable flexibility, we must not overlook the social cohesion and spontaneous creativity that face-to-face collaboration fosters in an organisation.',
      audioText: 'While remote working offers undeniable flexibility, we must not overlook the social cohesion and spontaneous creativity that face-to-face collaboration fosters in an organisation.',
      options: [
        'El trabajo presencial fomenta la cohesión social y la creatividad espontánea que no debemos pasar por alto.',
        'El trabajo remoto debe prohibirse en todas las empresas británicas.',
        'Nadie debería acudir a la oficina nunca más.',
        'La creatividad solo surge trabajando individualmente en casa.'
      ],
      correctAnswer: 'El trabajo presencial fomenta la cohesión social y la creatividad espontánea que no debemos pasar por alto.',
      explanation: 'El argumento destaca el valor de la creatividad espontánea y la cohesión cara a cara.'
    },
    {
      id: 'final-b2-2',
      type: 'fill-blank',
      instruction: 'Completa con la estructura de condicional mixto adecuada:',
      prompt: 'If I hadn\'t accepted the job in Oxford ten years ago, I _____ (not live) here today.',
      options: ["wouldn't be living", "wouldn't have lived", "didn't live", "won't live"],
      correctAnswer: "wouldn't be living",
      explanation: 'Condicional mixto: causa en pasado (Past Perfect) con efecto en el presente (would + be -ing).'
    },
    {
      id: 'final-b2-3',
      type: 'speaking',
      instruction: 'Pronuncia esta argumentación con firmeza y entonación profesional:',
      prompt: 'Having weighed all potential outcomes, we arrived at an agreeable consensus.',
      audioText: 'Having weighed all potential outcomes, we arrived at an agreeable consensus.',
      correctAnswer: 'Having weighed all potential outcomes, we arrived at an agreeable consensus.',
      explanation: 'Uso de cláusula de participio perfecto ("Having weighed...") para estilo ejecutivo.'
    }
  ]
}

// ════════════════════════════════════════════════════════════════════════════════
// NIVEL C1: AVANZADO (Advanced)
// ════════════════════════════════════════════════════════════════════════════════
export const CURRICULUM_C1: Unit[] = [
  {
    id: 'c1-unit-1',
    level: 'C1',
    unitNumber: 1,
    title: 'Inversión Gramatical y Retórica para Énfasis',
    topic: 'Inversion (Seldom, Rarely, Under no circumstances)',
    description: 'Aprende a estructurar oraciones de alto impacto retórico invirtiendo el sujeto y el auxiliar.',
    lessons: [
      {
        id: 'c1-u1-l1',
        unitId: 'c1-unit-1',
        unitTitle: 'Unidad 1',
        title: 'Inversión con Adverbios Negativos y Limitantes',
        description: 'Estructuras como "Rarely had we seen...", "Seldom do people realize...".',
        durationMinutes: 6,
        type: 'grammar',
        exercises: [
          {
            id: 'c1-u1-l1-e1',
            type: 'sentence-order',
            instruction: 'Ordena la oración para crear una inversión enfática formal:',
            prompt: 'have / never / I / such / heard / eloquence / inspiring',
            options: ['Never', 'have', 'I', 'heard', 'such', 'inspiring', 'eloquence'],
            correctAnswer: 'Never have I heard such inspiring eloquence',
            explanation: 'Al colocar "Never" al inicio, se invierte el orden a Auxiliar (have) + Sujeto (I) + Verbo (heard).'
          },
          {
            id: 'c1-u1-l1-e2',
            type: 'fill-blank',
            instruction: 'Completa la inversión formal:',
            prompt: 'Under no circumstances _____ (staff / permit) to disclose confidential client data.',
            options: ['are staff permitted', 'staff are permitted', 'staff permit', 'are permitted staff'],
            correctAnswer: 'are staff permitted',
            explanation: 'Con expresiones restrictivas como "Under no circumstances", se requiere inversión: are + staff + permitted.'
          }
        ]
      }
    ],
    exam: {
      id: 'exam-c1-u1',
      level: 'C1',
      title: 'Examen de Evaluación: Unidad 1 (Inversión C1)',
      description: 'Evalúa tu dominio de la inversión formal inglesa.',
      passingScore: 70,
      exercises: [
        {
          id: 'ex-c1-1',
          type: 'fill-blank',
          instruction: 'Completa la inversión:',
          prompt: 'Little _____ (she / realize) that her decision would alter the course of science.',
          options: ['did she realize', 'she realized', 'she did realize', 'had she realized'],
          correctAnswer: 'did she realize',
          explanation: '"Little did she realize" es la estructura clásica de inversión con "Little".'
        }
      ]
    }
  },
  {
    id: 'c1-unit-2',
    level: 'C1',
    unitNumber: 2,
    title: 'Diplomacia, Eufemismo y Oraciones Hendidas',
    topic: 'Cleft Sentences & Diplomatic Language',
    description: 'Aprende a matizar desacuerdos, sonar extraordinariamente educado y enfatizar argumentos con oraciones hendidas.',
    lessons: [
      {
        id: 'c1-u2-l1',
        unitId: 'c1-unit-2',
        unitTitle: 'Unidad 2',
        title: 'Oraciones Hendidas (Cleft Sentences: What... / It is...)',
        description: 'Domina "What we need is...", "It was precisely because..." para dirigir la atención del oyente.',
        durationMinutes: 6,
        type: 'speaking',
        exercises: [
          {
            id: 'c1-u2-l1-e1',
            type: 'sentence-order',
            instruction: 'Ordena la oración hendida enfática:',
            prompt: 'is / what / need / we / thorough / a / investigation',
            options: ['What', 'we', 'need', 'is', 'a', 'thorough', 'investigation'],
            correctAnswer: 'What we need is a thorough investigation',
            explanation: '"What + cláusula + is/was" focaliza el objeto con elegancia retórica.'
          },
          {
            id: 'c1-u2-l1-e2',
            type: 'speaking',
            instruction: 'Pronuncia esta fórmula de desacuerdo diplomático británico:',
            prompt: 'With all due respect, I am not entirely persuaded by that argument.',
            audioText: 'With all due respect, I am not entirely persuaded by that argument.',
            correctAnswer: 'With all due respect, I am not entirely persuaded by that argument.',
            explanation: '"I am not entirely persuaded" es el estándar diplomático para decir "No estoy de acuerdo" sin sonar descortés.'
          }
        ]
      }
    ],
    exam: {
      id: 'exam-c1-u2',
      level: 'C1',
      title: 'Examen de Evaluación: Unidad 2 (Diplomacia C1)',
      description: 'Mide tu habilidad para comunicarte con registro diplomático sofisticado.',
      passingScore: 70,
      exercises: [
        {
          id: 'ex-c1-2',
          type: 'multiple-choice',
          instruction: '¿Cuál es la forma más diplomática de rechazar una propuesta en una junta directiva?',
          prompt: 'Rechazo profesional y diplomático:',
          options: [
            'I have certain reservations regarding the feasibility of this proposal.',
            'This idea is completely wrong and won\'t work.',
            'No way, I dislike this plan immensely.',
            'You shouldn\'t have suggested this.'
          ],
          correctAnswer: 'I have certain reservations regarding the feasibility of this proposal.',
          explanation: '"I have certain reservations regarding the feasibility..." es la expresión idiomática diplomática por excelencia.'
        }
      ]
    }
  }
]

export const FINAL_C1_EXAM: Exam = {
  id: 'final-exam-c1',
  level: 'C1',
  title: 'Examen de Certificación Integral Nivel C1',
  description: 'Certificación oficial de nivel C1 Avanzado para liderazgo, academia y entornos profesionales de alto impacto.',
  passingScore: 75,
  exercises: [
    {
      id: 'final-c1-1',
      type: 'listening',
      instruction: 'Escucha el fragmento de la conferencia magistral y determina la tesis principal:',
      prompt: 'Not only does bilingualism enhance cognitive flexibility across the lifespan, but it also fortifies neural pathways against degenerative cognitive decline.',
      audioText: 'Not only does bilingualism enhance cognitive flexibility across the lifespan, but it also fortifies neural pathways against degenerative cognitive decline.',
      options: [
        'El bilingüismo potencia la flexibilidad cognitiva y protege las vías neuronales.',
        'Aprender idiomas es perjudicial para la concentración a largo plazo.',
        'Solo los niños pueden alcanzar bilingüismo neurocognitivo.',
        'El inglés es el único idioma con beneficios neuronales.'
      ],
      correctAnswer: 'El bilingüismo potencia la flexibilidad cognitiva y protege las vías neuronales.',
      explanation: 'La estructura "Not only... but it also..." enfatiza ambos beneficios cognitivos.'
    },
    {
      id: 'final-c1-2',
      type: 'fill-blank',
      instruction: 'Completa con la forma correcta de subjuntivo formal británico:',
      prompt: 'It is essential that every delegate _____ (be) present when the treaty is ratified.',
      options: ['be', 'is', 'was', 'should be being'],
      correctAnswer: 'be',
      explanation: 'En el subjuntivo formal mandatario inglés, se usa la forma base del verbo (be) para todas las personas.'
    },
    {
      id: 'final-c1-3',
      type: 'speaking',
      instruction: 'Pronuncia con fluidez, control tonal y dicción impecable:',
      prompt: 'Scarcely had the keynote address concluded when an enthusiastic ovation erupted.',
      audioText: 'Scarcely had the keynote address concluded when an enthusiastic ovation erupted.',
      correctAnswer: 'Scarcely had the keynote address concluded when an enthusiastic ovation erupted.',
      explanation: 'Inversión temporal: Scarcely had + Sujeto + participio... when...'
    }
  ]
}

// ════════════════════════════════════════════════════════════════════════════════
// NIVEL C2: MAESTRÍA Y PROFICIENCIA (Mastery / Proficiency)
// ════════════════════════════════════════════════════════════════════════════════
export const CURRICULUM_C2: Unit[] = [
  {
    id: 'c2-unit-1',
    level: 'C2',
    unitNumber: 1,
    title: 'Retórica Magistral y Estilo Académico Oxford',
    topic: 'Mastery of Syntax, Participle Clauses & Nuance',
    description: 'Alcanza el registro supremo del idioma inglés: oratoria parlamentaria, ensayo literario y precisión lexical absoluta.',
    lessons: [
      {
        id: 'c2-u1-l1',
        unitId: 'c2-unit-1',
        unitTitle: 'Unidad 1',
        title: 'Sintaxis Compleja y Cláusulas Absolutas de Participio',
        description: 'Estructuras densas y elegantes para articular razonamientos sofisticados.',
        durationMinutes: 6,
        type: 'grammar',
        exercises: [
          {
            id: 'c2-u1-l1-e1',
            type: 'sentence-order',
            instruction: 'Ordena la cláusula absoluta clásica de la prosa de Oxford:',
            prompt: 'all / being / considered / things / concluded / proceedings / were / the',
            options: ['All', 'things', 'considered,', 'the', 'proceedings', 'were', 'concluded'],
            correctAnswer: 'All things considered, the proceedings were concluded',
            explanation: '"All things considered" actúa como cláusula absoluta de participio independiente.'
          },
          {
            id: 'c2-u1-l1-e2',
            type: 'speaking',
            instruction: 'Pronuncia con cadencia retórica de oratoria británica:',
            prompt: 'Be that as it may, we cannot turn a blind eye to empirical reality.',
            audioText: 'Be that as it may, we cannot turn a blind eye to empirical reality.',
            correctAnswer: 'Be that as it may, we cannot turn a blind eye to empirical reality.',
            explanation: '"Be that as it may" (sea como fuere) es un conector concesivo de máxima elegancia en registro culto.'
          }
        ]
      }
    ],
    exam: {
      id: 'exam-c2-u1',
      level: 'C2',
      title: 'Examen de Evaluación: Unidad 1 (Retórica C2)',
      description: 'Mide tu habilidad para redactar y analizar prosa de nivel maestría.',
      passingScore: 70,
      exercises: [
        {
          id: 'ex-c2-1',
          type: 'fill-blank',
          instruction: 'Completa con la colocación de registro elevado:',
          prompt: 'His groundbreaking treatise on ethics falls nothing short of an absolute tour de _____.',
          options: ['force', 'grace', 'power', 'mind'],
          correctAnswer: 'force',
          explanation: '"A tour de force" es la expresión prestada consagrada en inglés culto para describir una obra maestra de excepcional virtuosismo.'
        }
      ]
    }
  },
  {
    id: 'c2-unit-2',
    level: 'C2',
    unitNumber: 2,
    title: 'Ironía, Eufemismo Británico y Agudeza Idiomática',
    topic: 'British Understatement, Irony & Mastery of Idiom',
    description: 'Decodifica el humor sutil, el "understatement" y la ironía que definen el dominio nativo pleno.',
    lessons: [
      {
        id: 'c2-u2-l1',
        unitId: 'c2-unit-2',
        unitTitle: 'Unidad 2',
        title: 'El "British Understatement" en su Máxima Expresión',
        description: 'Cómo un británico dice que algo es un desastre colosal diciendo simplemente "We have a bit of a situation".',
        durationMinutes: 6,
        type: 'listening',
        exercises: [
          {
            id: 'c2-u2-l1-e1',
            type: 'listening',
            instruction: 'Escucha la expresión de Mr. Davies y determina el significado real:',
            prompt: 'It was rather a sticky wicket, but we soldiered on and managed to pull it off.',
            audioText: 'It was rather a sticky wicket, but we soldiered on and managed to pull it off.',
            options: [
              'Era una situación sumamente difícil y peligrosa, pero perseveramos y logramos el objetivo.',
              'Había un problema con la puerta del jardín de críquet.',
              'Decidimos rendirnos ante el primer contratiempo.',
              'El clima era caluroso y pegajoso.'
            ],
            correctAnswer: 'Era una situación sumamente difícil y peligrosa, pero perseveramos y logramos el objetivo.',
            explanation: '"On a sticky wicket" es un modismo británico clásico originario del críquet para denotar una circunstancia ardua y delicada.'
          },
          {
            id: 'c2-u2-l1-e2',
            type: 'speaking',
            instruction: 'Pronuncia esta sentencia con la típica flema británica:',
            prompt: 'I wouldn\'t say it was an unmitigated success, to put it mildly.',
            audioText: 'I wouldn\'t say it was an unmitigated success, to put it mildly.',
            correctAnswer: 'I wouldn\'t say it was an unmitigated success, to put it mildly.',
            explanation: '"To put it mildly" es el eufemismo por excelencia para atenuar una crítica devastadora.'
          }
        ]
      }
    ],
    exam: {
      id: 'exam-c2-u2',
      level: 'C2',
      title: 'Examen de Evaluación: Unidad 2 (Agudeza C2)',
      description: 'Evalúa tu comprensión de la ironía y los matices del inglés nativo superior.',
      passingScore: 70,
      exercises: [
        {
          id: 'ex-c2-2',
          type: 'multiple-choice',
          instruction: '¿Qué significa cuando un inglés dice educadamente "That is a very brave proposal"?',
          prompt: 'Decodifica el eufemismo británico:',
          options: [
            'Considera que la propuesta es imprudente, arriesgada o una locura.',
            'Admira tu valentía y la financiará de inmediato.',
            'Significa que eres una persona militar.',
            'Significa que debes presentarla mañana mismo.'
          ],
          correctAnswer: 'Considera que la propuesta es imprudente, arriesgada o una locura.',
          explanation: 'En el humor político e institucional británico (inmortalizado en Yes Minister), calificar un plan como "brave" o "courageous" es la forma más educada de señalar que es insensato y fracasará.'
        }
      ]
    }
  }
]

export const FINAL_C2_EXAM: Exam = {
  id: 'final-exam-c2',
  level: 'C2',
  title: 'Examen de Maestría Máxima Nivel C2 (Oxford Master of English)',
  description: 'La máxima condecoración pedagógica otorgada por el profesor Davies. Certifica el dominio pleno, erudito y nativo del idioma inglés.',
  passingScore: 80,
  exercises: [
    {
      id: 'final-c2-1',
      type: 'listening',
      instruction: 'Escucha la disertación final de clausura y extrae la conclusión epistemológica:',
      prompt: 'Language is by no means a static repository of symbols, but rather a dynamic, living organism that mirrors the evolving consciousness of humanity itself. To master it is not merely to acquire vocabulary, but to inhabit another way of perceiving existence.',
      audioText: 'Language is by no means a static repository of symbols, but rather a dynamic, living organism that mirrors the evolving consciousness of humanity itself. To master it is not merely to acquire vocabulary, but to inhabit another way of perceiving existence.',
      options: [
        'Dominar un idioma no es solo memorizar palabras, sino habitar una nueva forma de percibir la existencia.',
        'Los diccionarios deben permanecer inmutables a lo largo de los siglos.',
        'Los símbolos estáticos son superiores a la conciencia viva.',
        'El aprendizaje de idiomas debe limitarse a la gramática instrumental.'
      ],
      correctAnswer: 'Dominar un idioma no es solo memorizar palabras, sino habitar una nueva forma de percibir la existencia.',
      explanation: 'La disertación culmina afirmando que el verdadero dominio lingüístico transforma la percepción misma de la realidad.'
    },
    {
      id: 'final-c2-2',
      type: 'fill-blank',
      instruction: 'Completa con la construcción retórica adecuada:',
      prompt: '_____ had the storm subsided than the intrepid scholars recommenced their expedition.',
      options: ['No sooner', 'Hardly', 'Scarcely', 'Barely'],
      correctAnswer: 'No sooner',
      explanation: '"No sooner" se correlaciona estrictamente con "than" (No sooner had... than...). "Hardly" y "Scarcely" se correlacionan con "when".'
    },
    {
      id: 'final-c2-3',
      type: 'speaking',
      instruction: 'Pronuncia con dicción, autoridad intelectual y cadencia nativa perfecta:',
      prompt: 'Herein lies the quintessential paradox of the human intellect: the more we discover, the vaster the frontiers of our ignorance appear.',
      audioText: 'Herein lies the quintessential paradox of the human intellect: the more we discover, the vaster the frontiers of our ignorance appear.',
      correctAnswer: 'Herein lies the quintessential paradox of the human intellect: the more we discover, the vaster the frontiers of our ignorance appear.',
      explanation: 'Uso magistral de "Herein lies" y la estructura de doble comparativo correlativo ("the more... the vaster...").'
    }
  ]
}

// ════════════════════════════════════════════════════════════════════════════════
// REGISTRO GLOBAL DE NIVELES (A2 -> C2)
// ════════════════════════════════════════════════════════════════════════════════
export interface LevelDescriptor {
  level: CEFRLevel
  title: string
  subtitle: string
  description: string
  accentColor: string
  badgeText: string
  units: Unit[]
  finalExam: Exam
}

export const ALL_LEVELS_DATA: Record<CEFRLevel, LevelDescriptor> = {
  'A2': {
    level: 'A2',
    title: 'Nivel A2',
    subtitle: 'Pre-Intermedio (Plataforma)',
    description: 'Rutinas, anécdotas en pasado simple/continuo, pedir direcciones, viajar por el Reino Unido y planes futuros.',
    accentColor: 'from-blue-600 to-indigo-600',
    badgeText: 'Fundamentos Funcionales',
    units: CURRICULUM_A2,
    finalExam: FINAL_A2_EXAM,
  },
  'B1': {
    level: 'B1',
    title: 'Nivel B1',
    subtitle: 'Intermedio (Umbral)',
    description: 'Condicionales 1 y 2, voz pasiva, estilo indirecto, expresar puntos de vista y desenvolverse con independencia.',
    accentColor: 'from-emerald-600 to-teal-700',
    badgeText: 'Independencia Comunicativa',
    units: CURRICULUM_B1,
    finalExam: FINAL_B1_EXAM,
  },
  'B2': {
    level: 'B2',
    title: 'Nivel B2',
    subtitle: 'Intermedio Alto (Avanzado Profesional)',
    description: '3er condicional, condicionales mixtos, modales de deducción pasada, debates y negociación profesional.',
    accentColor: 'from-amber-600 to-orange-700',
    badgeText: 'Fluidez y Espontaneidad',
    units: CURRICULUM_B2,
    finalExam: FINAL_B2_EXAM,
  },
  'C1': {
    level: 'C1',
    title: 'Nivel C1',
    subtitle: 'Avanzado Operacional Efectivo',
    description: 'Inversión gramatical enfática, oraciones hendidas, diplomacia y cortesía indirecta británica en alto nivel.',
    accentColor: 'from-purple-600 to-violet-800',
    badgeText: 'Competencia Operativa Plena',
    units: CURRICULUM_C1,
    finalExam: FINAL_C1_EXAM,
  },
  'C2': {
    level: 'C2',
    title: 'Nivel C2',
    subtitle: 'Maestría y Proficiencia Máxima',
    description: 'Retórica de Oxford, estilo literario y académico, ironía nativa y decodificación de la sutil flema británica.',
    accentColor: 'from-rose-600 via-pink-700 to-purple-900',
    badgeText: 'Maestría Nativa Superior',
    units: CURRICULUM_C2,
    finalExam: FINAL_C2_EXAM,
  },
}
