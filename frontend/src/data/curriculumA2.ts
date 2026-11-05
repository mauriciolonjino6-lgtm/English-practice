export type ExerciseType = 'listening' | 'speaking' | 'fill-blank' | 'multiple-choice' | 'sentence-order'
export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'

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


// ============================================================================
// NIVEL A1: PRINCIPIANTE (CEFR A1)
// ============================================================================
export const CURRICULUM_A1: Unit[] = [
  {
    id: 'a1-unit-1',
    level: 'A1',
    unitNumber: 1,
    title: 'Unit 1: Introductions, Alphabet & The Verb To Be',
    topic: 'Personal Info, Alphabet Spelling and Am/Is/Are',
    description: 'Learn to greet others, introduce yourself, spell names and master the foundational verb to be with British tutor Emma.',
    lessons: [
      {
        id: 'a1-u1-l1',
        unitId: 'a1-unit-1',
        unitTitle: 'Unit 1',
        title: 'Listening & Speaking: Meeting British Tutor Emma',
        description: 'Learn foundational greetings and practice introducing yourself in natural British English.',
        durationMinutes: 5,
        type: 'listening',
        exercises: [
          {
            id: 'a1-u1-l1-e1',
            type: 'listening',
            instruction: 'Listen to tutor Emma\'s introduction and select her city of origin:',
            prompt: 'Hello! My name is Emma. I am an English teacher, and I am from Oxford in the United Kingdom. Pleased to meet you!',
            audioText: 'Hello! My name is Emma. I am an English teacher, and I am from Oxford in the United Kingdom. Pleased to meet you!',
            options: ['Oxford', 'New York', 'Sydney', 'Dublin'],
            correctAnswer: 'Oxford',
            hint: 'Listen carefully for the city mentioned after "from".',
            explanation: 'Emma clearly says: "I am from Oxford in the United Kingdom."'
          },
          {
            id: 'a1-u1-l1-e2',
            type: 'fill-blank',
            instruction: 'Complete the sentence with the correct form of the verb "to be":',
            prompt: 'Hello, my name _____ (be) Mauricio and I am an English student.',
            options: ['is', 'am', 'are', 'be'],
            correctAnswer: 'is',
            explanation: '"My name" is singular (third person: it), so the correct verb is "is".'
          },
          {
            id: 'a1-u1-l1-e3',
            type: 'speaking',
            instruction: 'Read aloud with clear, friendly British pronunciation:',
            prompt: 'Hello Emma, pleased to meet you. I am ready to learn English.',
            audioText: 'Hello Emma, pleased to meet you. I am ready to learn English.',
            correctAnswer: 'Hello Emma, pleased to meet you. I am ready to learn English.',
            hint: 'Pronounce "pleased" smoothly in one syllable ending in a /d/ sound.',
            explanation: '"Pleased to meet you" is the standard British polite greeting when meeting someone for the first time.'
          },
          {
            id: 'a1-u1-l1-e4',
            type: 'sentence-order',
            instruction: 'Arrange the words to form a polite British introduction:',
            prompt: 'to / Pleased / you / meet / Emma',
            options: ['Pleased', 'to', 'meet', 'you', 'Emma'],
            correctAnswer: 'Pleased to meet you Emma',
            explanation: 'The standard greeting phrase is "Pleased to meet you, Emma."'
          }
        ]
      },
      {
        id: 'a1-u1-l2',
        unitId: 'a1-unit-1',
        unitTitle: 'Unit 1',
        title: 'Vocabulary & Spelling: The British Alphabet & Numbers',
        description: 'Master letters, numbers 1-100, age, and telephone numbers.',
        durationMinutes: 5,
        type: 'mixed',
        exercises: [
          {
            id: 'a1-u1-l2-e1',
            type: 'listening',
            instruction: 'Listen to the spelling and select the correct British city:',
            prompt: 'The train is arriving at O - X - F - O - R - D.',
            audioText: 'The train is arriving at O - X - F - O - R - D.',
            options: ['Oxford', 'London', 'Bristol', 'Cambridge'],
            correctAnswer: 'Oxford',
            explanation: 'O - X - F - O - R - D spells Oxford.'
          },
          {
            id: 'a1-u1-l2-e2',
            type: 'multiple-choice',
            instruction: 'How do you correctly state your age in English?',
            prompt: 'Choose the grammatically accurate sentence:',
            options: [
              'I am twenty-five years old.',
              'I have twenty-five years.',
              'I am having twenty-five years.',
              'I have twenty-five years old.'
            ],
            correctAnswer: 'I am twenty-five years old.',
            explanation: 'In English, age is expressed with the verb "to be" (I am / He is), never with "have".'
          },
          {
            id: 'a1-u1-l2-e3',
            type: 'fill-blank',
            instruction: 'Complete with the correct number word:',
            prompt: 'Seven plus five equals _____ (12).',
            options: ['twelve', 'twenty', 'eleven', 'two'],
            correctAnswer: 'twelve',
            explanation: '7 + 5 = 12 (twelve).'
          },
          {
            id: 'a1-u1-l2-e4',
            type: 'speaking',
            instruction: 'Pronounce the numbers clearly:',
            prompt: 'One, two, three, four, five, six, seven, eight, nine, ten.',
            audioText: 'One, two, three, four, five, six, seven, eight, nine, ten.',
            correctAnswer: 'One, two, three, four, five, six, seven, eight, nine, ten.',
            explanation: 'Focus on clear vowel sounds and the unvoiced "th" in "three".'
          }
        ]
      },
      {
        id: 'a1-u1-l3',
        unitId: 'a1-unit-1',
        unitTitle: 'Unit 1',
        title: 'Active Grammar: Verb To Be (Am / Is / Are)',
        description: 'Learn affirmatives, negatives, and question inversion with personal pronouns.',
        durationMinutes: 6,
        type: 'grammar',
        exercises: [
          {
            id: 'a1-u1-l3-e1',
            type: 'fill-blank',
            instruction: 'Select the correct form of the verb to be for the pronoun "they":',
            prompt: 'They _____ (be) students at the university library.',
            options: ['are', 'is', 'am', 'be'],
            correctAnswer: 'are',
            explanation: 'Plural pronouns (we, you, they) take "are".'
          },
          {
            id: 'a1-u1-l3-e2',
            type: 'multiple-choice',
            instruction: 'Which of these sentences is correctly negated?',
            prompt: 'Choose the accurate negative sentence:',
            options: [
              'She is not at home today.',
              'She not is at home today.',
              'She doesn\'t is at home today.',
              'She aren\'t at home today.'
            ],
            correctAnswer: 'She is not at home today.',
            explanation: 'Negative of "is" is "is not" or the contraction "isn\'t".'
          },
          {
            id: 'a1-u1-l3-e3',
            type: 'sentence-order',
            instruction: 'Arrange the words to form a question with verb to be:',
            prompt: 'from / Are / England / you / ?',
            options: ['Are', 'you', 'from', 'England', '?'],
            correctAnswer: 'Are you from England ?',
            explanation: 'Questions with "to be" invert the verb and subject: Verb (Are) + Subject (you) + Complement (from England?).'
          },
          {
            id: 'a1-u1-l3-e4',
            type: 'fill-blank',
            instruction: 'Complete with the short answer:',
            prompt: 'Is he your English teacher? — Yes, he _____.',
            options: ['is', 'are', 'does', 'has'],
            correctAnswer: 'is',
            explanation: 'Short affirmative answer: "Yes, he is."'
          }
        ]
      }
    ],
    exam: {
      id: 'exam-a1-unit-1',
      unitId: 'a1-unit-1',
      level: 'A1',
      title: 'Unit 1 Progress Assessment: Introductions & Verb To Be',
      description: 'Evaluate your command of basic introductions, alphabet, and the verb to be.',
      passingScore: 70,
      exercises: [
        {
          id: 'exam-a1-u1-e1',
          type: 'listening',
          instruction: 'Listen to the introduction and determine where the speaker is from:',
          prompt: 'Hello! I am David. I am a photographer, and I am from Manchester.',
          audioText: 'Hello! I am David. I am a photographer, and I am from Manchester.',
          options: ['Manchester', 'Oxford', 'London', 'Liverpool'],
          correctAnswer: 'Manchester',
          explanation: 'The speaker states: "I am from Manchester."'
        },
        {
          id: 'exam-a1-u1-e2',
          type: 'fill-blank',
          instruction: 'Complete the sentence with the correct form of the verb to be:',
          prompt: 'We _____ (be) happy to study at the language academy.',
          options: ['are', 'is', 'am', 'be'],
          correctAnswer: 'are',
          explanation: 'The pronoun "we" requires "are".'
        },
        {
          id: 'exam-a1-u1-e3',
          type: 'sentence-order',
          instruction: 'Arrange the words to form a correct question:',
          prompt: 'your / name / What / is / ?',
          options: ['What', 'is', 'your', 'name', '?'],
          correctAnswer: 'What is your name ?',
          explanation: 'Information question structure: Question word (What) + Verb (is) + Subject (your name?).'
        }
      ]
    }
  },
  {
    id: 'a1-unit-2',
    level: 'A1',
    unitNumber: 2,
    title: 'Unit 2: Daily Objects, Articles & Ordering at a London Café',
    topic: 'Singular/Plural Nouns, Articles (A/An/The) and Demonstratives',
    description: 'Learn to name everyday items, use articles correctly and order food and drinks with polite British etiquette.',
    lessons: [
      {
        id: 'a1-u2-l1',
        unitId: 'a1-unit-2',
        unitTitle: 'Unit 2',
        title: 'Listening & Speaking: Ordering at Soho Coffee',
        description: 'Practice ordering your morning beverage and pastry with polite British formulas.',
        durationMinutes: 5,
        type: 'speaking',
        exercises: [
          {
            id: 'a1-u2-l1-e1',
            type: 'listening',
            instruction: 'Listen to the order and identify what the customer ordered:',
            prompt: 'Good morning! Welcome to Soho Coffee. What can I get started for you today? — Could I have a white coffee and a warm croissant, please?',
            audioText: 'Good morning! Welcome to Soho Coffee. What can I get started for you today? Could I have a white coffee and a warm croissant, please?',
            options: ['A white coffee and a croissant', 'A black tea and a muffin', 'A hot chocolate and a scone', 'An iced latte and a sandwich'],
            correctAnswer: 'A white coffee and a croissant',
            explanation: 'The customer orders "a white coffee and a warm croissant, please".'
          },
          {
            id: 'a1-u2-l1-e2',
            type: 'speaking',
            instruction: 'Practice ordering politely with British manners:',
            prompt: 'Could I have a cup of English tea, please?',
            audioText: 'Could I have a cup of English tea, please?',
            correctAnswer: 'Could I have a cup of English tea, please?',
            hint: 'Use a gentle rising intonation on "please".',
            explanation: '"Could I have..., please?" is the standard British formula for ordering food and drinks.'
          },
          {
            id: 'a1-u2-l1-e3',
            type: 'fill-blank',
            instruction: 'Complete the price inquiry:',
            prompt: 'Excuse me, _____ much is this slice of cake?',
            options: ['How', 'What', 'Where', 'Who'],
            correctAnswer: 'How',
            explanation: '"How much is..." is the standard question to ask for price.'
          },
          {
            id: 'a1-u2-l1-e4',
            type: 'sentence-order',
            instruction: 'Arrange the words to order politely:',
            prompt: 'have / please / I / tea / Could / a / ?',
            options: ['Could', 'I', 'have', 'a', 'tea', 'please', '?'],
            correctAnswer: 'Could I have a tea please ?',
            explanation: 'Polite request order: Could + I + have + a tea + please?'
          }
        ]
      },
      {
        id: 'a1-u2-l2',
        unitId: 'a1-unit-2',
        unitTitle: 'Unit 2',
        title: 'Vocabulary & Grammar: Demonstratives (This, That, These, Those)',
        description: 'Distinguish nearby vs far items and regular and irregular plurals.',
        durationMinutes: 5,
        type: 'mixed',
        exercises: [
          {
            id: 'a1-u2-l2-e1',
            type: 'multiple-choice',
            instruction: 'Select the correct demonstrative for an object near the speaker:',
            prompt: '_____ is my new English notebook right here in my hand.',
            options: ['This', 'That', 'These', 'Those'],
            correctAnswer: 'This',
            explanation: '"This" is singular and refers to an object close to the speaker.'
          },
          {
            id: 'a1-u2-l2-e2',
            type: 'fill-blank',
            instruction: 'Select the correct plural demonstrative for objects further away:',
            prompt: 'Look over there! _____ red double-decker buses are magnificent.',
            options: ['Those', 'These', 'This', 'That'],
            correctAnswer: 'Those',
            explanation: '"Those" is plural and refers to items further away ("over there").'
          },
          {
            id: 'a1-u2-l2-e3',
            type: 'multiple-choice',
            instruction: 'Which of these is the correct irregular plural of "person"?',
            prompt: 'There are five _____ waiting in the queue.',
            options: ['people', 'persons', 'peoples', 'persones'],
            correctAnswer: 'people',
            explanation: 'The plural of "person" in standard English is "people".'
          },
          {
            id: 'a1-u2-l2-e4',
            type: 'fill-blank',
            instruction: 'Complete with regular plural spelling:',
            prompt: 'I have two _____ (watch) on my desk.',
            options: ['watches', 'watchs', 'watchies', 'watch'],
            correctAnswer: 'watches',
            explanation: 'Nouns ending in "ch", "sh", "s", or "x" add "-es" in plural: watch -> watches.'
          }
        ]
      },
      {
        id: 'a1-u2-l3',
        unitId: 'a1-unit-2',
        unitTitle: 'Unit 2',
        title: 'Active Grammar: Articles A, An and The',
        description: 'Understand consonant vs vowel sounds and definite vs indefinite articles.',
        durationMinutes: 6,
        type: 'grammar',
        exercises: [
          {
            id: 'a1-u2-l3-e1',
            type: 'fill-blank',
            instruction: 'Choose "a" or "an" based on the phonetic sound:',
            prompt: 'Emma has _____ apple and _____ sandwich for lunch.',
            options: ['an / a', 'a / an', 'a / a', 'an / an'],
            correctAnswer: 'an / a',
            explanation: '"An" is used before vowel sounds (an apple); "a" before consonant sounds (a sandwich).'
          },
          {
            id: 'a1-u2-l3-e2',
            type: 'multiple-choice',
            instruction: 'Pay attention to the initial vowel sound of "university":',
            prompt: 'Oxford is _____ world-famous university.',
            options: ['a', 'an', 'the', 'no article'],
            correctAnswer: 'a',
            explanation: '"University" begins with the consonant sound /j/ ("yoo-niversity"), so we use "a", not "an".'
          },
          {
            id: 'a1-u2-l3-e3',
            type: 'sentence-order',
            instruction: 'Arrange the words with the definite article:',
            prompt: 'The / on / is / table / the / book',
            options: ['The', 'book', 'is', 'on', 'the', 'table'],
            correctAnswer: 'The book is on the table',
            explanation: 'Syntax: The book (subject) + is (verb) + on the table (prepositional phrase).'
          },
          {
            id: 'a1-u2-l3-e4',
            type: 'fill-blank',
            instruction: 'Choose the correct article for the specific museum:',
            prompt: 'We are visiting _____ British Museum this afternoon.',
            options: ['the', 'a', 'an', 'some'],
            correctAnswer: 'the',
            explanation: 'Specific unique institutions use the definite article "the".'
          }
        ]
      }
    ],
    exam: {
      id: 'exam-a1-unit-2',
      unitId: 'a1-unit-2',
      level: 'A1',
      title: 'Unit 2 Progress Assessment: Objects, Articles & Ordering',
      description: 'Evaluate your ability to order food and drinks, use articles and demonstratives.',
      passingScore: 70,
      exercises: [
        {
          id: 'exam-a1-u2-e1',
          type: 'listening',
          instruction: 'Listen to the bill total and select the correct price:',
          prompt: 'That will be three pounds and fifty pence, please.',
          audioText: 'That will be three pounds and fifty pence, please.',
          options: ['£3.50', '£3.15', '£5.30', '£13.50'],
          correctAnswer: '£3.50',
          explanation: '"Three pounds and fifty pence" corresponds to £3.50.'
        },
        {
          id: 'exam-a1-u2-e2',
          type: 'fill-blank',
          instruction: 'Complete with "a" or "an":',
          prompt: 'Would you like _____ cup of coffee or _____ glass of orange juice?',
          options: ['a / a', 'an / a', 'a / an', 'an / an'],
          correctAnswer: 'a / a',
          explanation: 'Both "cup" and "glass" begin with consonant sounds.'
        },
        {
          id: 'exam-a1-u2-e3',
          type: 'sentence-order',
          instruction: 'Arrange the words to ask for the bill politely:',
          prompt: 'bill / Could / the / we / please / have / ?',
          options: ['Could', 'we', 'have', 'the', 'bill', 'please', '?'],
          correctAnswer: 'Could we have the bill please ?',
          explanation: 'Standard British formula to ask for the bill in restaurants or cafés.'
        }
      ]
    }
  },
  {
    id: 'a1-unit-3',
    level: 'A1',
    unitNumber: 3,
    title: 'Unit 3: Daily Habits, Present Simple & "Wh-" Questions',
    topic: 'Present Simple (I/You/We/They vs He/She/It) and Routine Verbs',
    description: 'Learn to speak about everyday routines, hobbies, and master asking questions with Do and Does.',
    lessons: [
      {
        id: 'a1-u3-l1',
        unitId: 'a1-unit-3',
        unitTitle: 'Unit 3',
        title: 'Listening & Reading: Emma\'s Oxford Daily Routine',
        description: 'Understand timetable descriptions and adverbs of frequency.',
        durationMinutes: 5,
        type: 'listening',
        exercises: [
          {
            id: 'a1-u3-l1-e1',
            type: 'listening',
            instruction: 'Listen to Emma\'s routine and identify when she teaches her morning class:',
            prompt: 'Every weekday, I wake up at half past six. I always drink a cup of tea, and then I teach my morning class at nine o\'clock.',
            audioText: 'Every weekday, I wake up at half past six. I always drink a cup of tea, and then I teach my morning class at nine o\'clock.',
            options: ['At nine o\'clock', 'At half past six', 'At seven o\'clock', 'At eleven o\'clock'],
            correctAnswer: 'At nine o\'clock',
            explanation: 'Emma says: "I teach my morning class at nine o\'clock."'
          },
          {
            id: 'a1-u3-l1-e2',
            type: 'fill-blank',
            instruction: 'Complete with the adverb of frequency:',
            prompt: 'I _____ (100% frequency) have tea in the afternoon; it is my favourite habit.',
            options: ['always', 'never', 'sometimes', 'rarely'],
            correctAnswer: 'always',
            explanation: '"Always" represents 100% regularity.'
          },
          {
            id: 'a1-u3-l1-e3',
            type: 'speaking',
            instruction: 'Pronounce the routine sentence with natural cadence:',
            prompt: 'I live in a peaceful town and I study English every single day.',
            audioText: 'I live in a peaceful town and I study English every single day.',
            correctAnswer: 'I live in a peaceful town and I study English every single day.',
            explanation: 'Ensure smooth linking between "live in" and "study English".'
          },
          {
            id: 'a1-u3-l1-e4',
            type: 'sentence-order',
            instruction: 'Arrange the sentence with correct adverb of frequency placement:',
            prompt: 'drinks / never / She / coffee / at / night',
            options: ['She', 'never', 'drinks', 'coffee', 'at', 'night'],
            correctAnswer: 'She never drinks coffee at night',
            explanation: 'Adverbs of frequency go between the subject and main verb: Subject (She) + Adverb (never) + Verb (drinks).'
          }
        ]
      },
      {
        id: 'a1-u3-l2',
        unitId: 'a1-unit-3',
        unitTitle: 'Unit 3',
        title: 'Active Grammar: Present Simple Third Person (-s, -es)',
        description: 'Master third-person singular agreements and negative statements with doesn\'t.',
        durationMinutes: 6,
        type: 'grammar',
        exercises: [
          {
            id: 'a1-u3-l2-e1',
            type: 'fill-blank',
            instruction: 'Add third-person singular "-s" to the verb "work":',
            prompt: 'My brother _____ (work) in a hospital in London.',
            options: ['works', 'work', 'workes', 'working'],
            correctAnswer: 'works',
            explanation: 'Third person singular (he/she/it) adds "-s": work -> works.'
          },
          {
            id: 'a1-u3-l2-e2',
            type: 'multiple-choice',
            instruction: 'Which sentence correctly negates with auxiliary "doesn\'t"?',
            prompt: 'Select the accurate negative sentence:',
            options: [
              'He doesn\'t live in Manchester.',
              'He not live in Manchester.',
              'He doesn\'t lives in Manchester.',
              'He isn\'t live in Manchester.'
            ],
            correctAnswer: 'He doesn\'t live in Manchester.',
            explanation: 'Auxiliary "doesn\'t" is followed by the base infinitive form of the verb without "-s" (live).'
          },
          {
            id: 'a1-u3-l2-e3',
            type: 'fill-blank',
            instruction: 'Complete the question with the correct auxiliary:',
            prompt: '_____ you speak English with tutor Emma?',
            options: ['Do', 'Does', 'Are', 'Is'],
            correctAnswer: 'Do',
            explanation: 'Questions with pronoun "you" in Present Simple require auxiliary "Do".'
          },
          {
            id: 'a1-u3-l2-e4',
            type: 'sentence-order',
            instruction: 'Arrange the third-person question:',
            prompt: 'live / Does / in / London / she / ?',
            options: ['Does', 'she', 'live', 'in', 'London', '?'],
            correctAnswer: 'Does she live in London ?',
            explanation: 'Structure: Auxiliary (Does) + Subject (she) + Verb (live) + Complement (in London?).'
          }
        ]
      },
      {
        id: 'a1-u3-l3',
        unitId: 'a1-unit-3',
        unitTitle: 'Unit 3',
        title: 'Speaking & Questions: "Wh-" Information Questions',
        description: 'Ask What, Where, When, Why, Who and How with correct auxiliary word order.',
        durationMinutes: 6,
        type: 'speaking',
        exercises: [
          {
            id: 'a1-u3-l3-e1',
            type: 'multiple-choice',
            instruction: 'Select the correct question word for asking about a location:',
            prompt: '_____ do you live? — I live near the river in Oxford.',
            options: ['Where', 'When', 'Who', 'Why'],
            correctAnswer: 'Where',
            explanation: '"Where" asks about place or location.'
          },
          {
            id: 'a1-u3-l3-e2',
            type: 'fill-blank',
            instruction: 'Select the correct question word for asking about time:',
            prompt: '_____ does the lesson begin? — At ten in the morning.',
            options: ['When', 'Where', 'Who', 'Which'],
            correctAnswer: 'When',
            explanation: '"When" asks about time.'
          },
          {
            id: 'a1-u3-l3-e3',
            type: 'speaking',
            instruction: 'Ask the question clearly with British falling intonation:',
            prompt: 'What is your favourite thing about studying English?',
            audioText: 'What is your favourite thing about studying English?',
            correctAnswer: 'What is your favourite thing about studying English?',
            explanation: 'Wh- questions naturally finish with a falling intonation.'
          },
          {
            id: 'a1-u3-l3-e4',
            type: 'sentence-order',
            instruction: 'Arrange the words to form a complete information question:',
            prompt: 'from / Where / you / are / ?',
            options: ['Where', 'are', 'you', 'from', '?'],
            correctAnswer: 'Where are you from ?',
            explanation: 'Standard syntax: Question word (Where) + Verb (are) + Subject (you) + Preposition (from?).'
          }
        ]
      }
    ],
    exam: {
      id: 'exam-a1-unit-3',
      unitId: 'a1-unit-3',
      level: 'A1',
      title: 'Unit 3 Progress Assessment: Routines & Questions',
      description: 'Evaluate your ability to describe routines, conjugate third person and ask questions.',
      passingScore: 70,
      exercises: [
        {
          id: 'exam-a1-u3-e1',
          type: 'listening',
          instruction: 'Listen to the routine and choose how the speaker travels to work:',
          prompt: 'I live in a small village outside Oxford. Every morning, I take the train to work.',
          audioText: 'I live in a small village outside Oxford. Every morning, I take the train to work.',
          options: ['By train', 'By bus', 'By bicycle', 'By car'],
          correctAnswer: 'By train',
          explanation: 'The speaker states: "Every morning, I take the train to work."'
        },
        {
          id: 'exam-a1-u3-e2',
          type: 'fill-blank',
          instruction: 'Complete with third person present simple:',
          prompt: 'My sister _____ (teach) history at the secondary school.',
          options: ['teaches', 'teach', 'teachies', 'is teach'],
          correctAnswer: 'teaches',
          explanation: 'Verbs ending in "ch" take "-es" in third person singular: teach -> teaches.'
        },
        {
          id: 'exam-a1-u3-e3',
          type: 'sentence-order',
          instruction: 'Arrange the question words:',
          prompt: 'do / What / at / weekends / you / do / ?',
          options: ['What', 'do', 'you', 'do', 'at', 'weekends', '?'],
          correctAnswer: 'What do you do at weekends ?',
          explanation: 'Syntax: Question word (What) + Auxiliary (do) + Subject (you) + Verb (do) + Time phrase (at weekends?).'
        }
      ]
    }
  }
];

export const FINAL_A1_EXAM: Exam = {
  id: 'final-exam-a1',
  level: 'A1',
  title: 'Oxford A1 Beginner Official Certification Assessment',
  description: 'Comprehensive examination evaluating foundational A1 competencies: greetings, verb to be, café ordering, daily routines, and question syntax. Passing unlocks Level A2.',
  passingScore: 70,
  exercises: [
    {
      id: 'final-a1-1',
      type: 'listening',
      instruction: 'Listen to tutor Emma\'s introductory message and select the primary purpose of the academy:',
      prompt: 'Welcome to our English academy! My name is Emma, your British tutor. Here, we help you speak natural English with confidence from day one, whether you are ordering coffee in London or discussing ideas in Oxford.',
      audioText: 'Welcome to our English academy! My name is Emma, your British tutor. Here, we help you speak natural English with confidence from day one, whether you are ordering coffee in London or discussing ideas in Oxford.',
      options: [
        'To help students speak natural English with confidence from day one.',
        'To sell antique guidebooks about the city of London.',
        'To prepare students exclusively for written translation examinations.',
        'To teach French and German history in Oxford.'
      ],
      correctAnswer: 'To help students speak natural English with confidence from day one.',
      explanation: 'Emma states: "Here, we help you speak natural English with confidence from day one."'
    },
    {
      id: 'final-a1-2',
      type: 'fill-blank',
      instruction: 'Complete the sentence with the accurate article and verb to be:',
      prompt: 'Mauricio _____ (be) _____ English student.',
      options: ['is / an', 'are / a', 'is / a', 'am / an'],
      correctAnswer: 'is / an',
      explanation: 'Mauricio (singular) requires "is", and "English" starts with a vowel sound, requiring "an".'
    },
    {
      id: 'final-a1-3',
      type: 'speaking',
      instruction: 'Introduce yourself aloud clearly and confidently in English:',
      prompt: 'Hello Emma, my name is Mauricio. I am an enthusiastic student and I practice English every day.',
      audioText: 'Hello Emma, my name is Mauricio. I am an enthusiastic student and I practice English every day.',
      correctAnswer: 'Hello Emma, my name is Mauricio. I am an enthusiastic student and I practice English every day.',
      explanation: 'Clear introductory sentence demonstrating verb to be and present simple.'
    },
    {
      id: 'final-a1-4',
      type: 'sentence-order',
      instruction: 'Arrange the words to form a polite British request at a restaurant:',
      prompt: 'the / have / menu / please / Could / we / ?',
      options: ['Could', 'we', 'have', 'the', 'menu', 'please', '?'],
      correctAnswer: 'Could we have the menu please ?',
      explanation: 'Polite British formula: Could + we + have + the menu + please?'
    }
  ]
};

// ============================================================================
// NIVEL A2: PRE-INTERMEDIO (CEFR A2)
// ============================================================================
export const CURRICULUM_A2: Unit[] = [
  {
    id: 'a2-unit-1',
    level: 'A2',
    unitNumber: 1,
    title: 'Rutinas, Hábitos y Pasado Real',
    topic: 'Past Simple, Past Continuous and Daily Life',
    description: 'Aprende a relatar lo que hiciste ayer, tus hábitos diarios y acciones interrumpidas usando inglés británico natural.',
    lessons: [
      {
        id: 'a2-u1-l1',
        unitId: 'a2-unit-1',
        unitTitle: 'Unidad 1',
        title: 'Comprensión Auditiva: Una mañana típica en Oxford',
        description: 'Entrena tu comprensión auditiva con frases cotidianas de rutina y pasado en acento británico.',
        durationMinutes: 6,
        type: 'listening',
        exercises: [
          {
            id: 'a2-u1-l1-e1',
            type: 'listening',
            instruction: 'Listen to the tutor\'s story and select which action was taken first:',
            prompt: 'Yesterday morning, I woke up at seven, put the kettle on for a cuppa, and read the morning post before heading to the university.',
            audioText: 'Yesterday morning, I woke up at seven, put the kettle on for a cuppa, and read the morning post before heading to the university.',
            options: ['Took a taxi to university', 'Put the kettle on for a cuppa', 'Went to buy the newspaper', 'Overslept in bed'],
            correctAnswer: 'Put the kettle on for a cuppa',
            hint: 'Presta atención a la frase británica "put the kettle on for a cuppa".',
            explanation: 'En el Reino Unido, "put the kettle on for a cuppa" significa poner a hervir agua en la tetera para preparar una taza de té.'
          },
          {
            id: 'a2-u1-l1-e2',
            type: 'listening',
            instruction: 'Listen carefully and complete the missing word in the British idiom:',
            prompt: 'While I was walking to college, it suddenly started to _____ cats and dogs!',
            audioText: 'While I was walking to college, it suddenly started to rain cats and dogs!',
            options: ['rain', 'pour', 'snow', 'wind'],
            correctAnswer: 'rain',
            hint: 'Es la clásica expresión británica "rain cats and dogs" (llover a cántaros).',
            explanation: '"Rain cats and dogs" es un modismo común para indicar que llueve con gran intensidad.'
          },
          {
            id: 'a2-u1-l1-e3',
            type: 'multiple-choice',
            instruction: 'Identify the correct irregular past simple form of the verb "buy":',
            prompt: 'Last Saturday, my brother _____ a vintage bicycle at the Oxford market.',
            options: ['bought', 'buyed', 'was buy', 'buying'],
            correctAnswer: 'bought',
            explanation: 'El verbo "buy" es irregular en pasado: buy -> bought. La forma "buyed" no existe en la gramática inglesa.'
          },
          {
            id: 'a2-u1-l1-e4',
            type: 'fill-blank',
            instruction: 'Complete the sentence with the correct negative form in the Past Simple:',
            prompt: 'I _____ (not have) breakfast this morning because I was in a rush.',
            options: ["didn't have", "didn't had", "not had", "wasn't have"],
            correctAnswer: "didn't have",
            explanation: 'Para negar en pasado simple se utiliza el auxiliar "didn\'t" seguido del verbo en su forma base (have).'
          }
        ]
      },
      {
        id: 'a2-u1-l2',
        unitId: 'a2-unit-1',
        unitTitle: 'Unidad 1',
        title: 'Pronunciación: Terminaciones -ed en Pasado Regular',
        description: 'Domina los 3 sonidos fonéticos de la terminación -ed (/t/, /d/, /ɪd/) para articular con naturalidad.',
        durationMinutes: 6,
        type: 'speaking',
        exercises: [
          {
            id: 'a2-u1-l2-e1',
            type: 'speaking',
            instruction: 'Listen and pronounce this sentence with the crisp /t/ sound in "worked":',
            prompt: 'I worked in the laboratory all day yesterday.',
            audioText: 'I worked in the laboratory all day yesterday.',
            correctAnswer: 'I worked in the laboratory all day yesterday.',
            hint: 'La "k" es un sonido sordo, por lo que "-ed" suena como una "t" seca: "work-t".',
            explanation: 'Cuando un verbo termina en sonido sordo como /k/, /p/ o /s/, la terminación -ed se pronuncia como /t/.'
          },
          {
            id: 'a2-u1-l2-e2',
            type: 'speaking',
            instruction: 'Listen and pronounce this sentence with the /ɪd/ ending in "decided":',
            prompt: 'We decided to visit London last weekend.',
            audioText: 'We decided to visit London last weekend.',
            correctAnswer: 'We decided to visit London last weekend.',
            hint: 'Los verbos terminados en sonido "d" o "t" añaden una sílaba completa extra: "de-ci-ded".',
            explanation: 'Solo se añade una sílaba completa /ɪd/ cuando el verbo termina en sonido /t/ o /d/ (ejemplo: decided, started, wanted).'
          },
          {
            id: 'a2-u1-l2-e3',
            type: 'sentence-order',
            instruction: 'Arrange the words to form a correct affirmative sentence in the past tense:',
            prompt: 'yesterday / sushi / I / ate / for dinner',
            options: ['I', 'ate', 'sushi', 'for dinner', 'yesterday'],
            correctAnswer: 'I ate sushi for dinner yesterday',
            explanation: 'Estructura canónica en inglés: Sujeto (I) + Verbo en pasado (ate) + Objeto directo (sushi) + Complemento de tiempo.'
          },
          {
            id: 'a2-u1-l2-e4',
            type: 'speaking',
            instruction: 'Pronounce this past simple sentence clearly with natural British intonation:',
            prompt: 'She lived in Manchester for five years.',
            audioText: 'She lived in Manchester for five years.',
            correctAnswer: 'She lived in Manchester for five years.',
            explanation: 'La terminación de "lived" se pronuncia con sonido sonoro /d/, sin agregar sílabas adicionales.'
          }
        ]
      },
      {
        id: 'a2-u1-l3',
        unitId: 'a2-unit-1',
        unitTitle: 'Unidad 1',
        title: 'Gramática Activa: Pasado Simple vs Pasado Continuo',
        description: 'Aprende a contrastar una acción que estaba en desarrollo con otra que la interrumpió.',
        durationMinutes: 6,
        type: 'grammar',
        exercises: [
          {
            id: 'a2-u1-l3-e1',
            type: 'fill-blank',
            instruction: 'Select the correct form to express the continuous action that was interrupted:',
            prompt: 'I _____ (cook) dinner when my friend rang the doorbell.',
            options: ['was cooking', 'cooked', 'were cooking', 'am cooking'],
            correctAnswer: 'was cooking',
            hint: 'Usa "was/were + -ing" para la acción prolongada en progreso en el pasado.',
            explanation: 'Se utiliza el Pasado Continuo (was cooking) para la acción que estaba sucediendo cuando ocurrió la acción puntual (rang).'
          },
          {
            id: 'a2-u1-l3-e2',
            type: 'fill-blank',
            instruction: 'Complete the sentence with the appropriate time conjunction:',
            prompt: '_____ we were having a cup of tea, it began to snow outside.',
            options: ['While', 'During', 'Because', 'So'],
            correctAnswer: 'While',
            hint: '"While" (mientras) se utiliza seguido de una cláusula con sujeto y verbo continuo.',
            explanation: '"While" introduce cláusulas en pasado continuo (While we were having tea...).'
          },
          {
            id: 'a2-u1-l3-e3',
            type: 'multiple-choice',
            instruction: 'Which of these questions is grammatically correct?',
            prompt: 'Elige la opción con gramática precisa:',
            options: [
              'What were you doing at eight o\'clock last night?',
              'What was you doing at eight o\'clock last night?',
              'What did you doing at eight o\'clock last night?',
              'What you were doing at eight o\'clock last night?'
            ],
            correctAnswer: 'What were you doing at eight o\'clock last night?',
            explanation: 'Con el pronombre "you", el pasado del verbo to be en interrogación es siempre "were you doing".'
          },
          {
            id: 'a2-u1-l3-e4',
            type: 'sentence-order',
            instruction: 'Arrange the words to describe two simultaneous actions in the past continuous:',
            prompt: 'reading / was / while / he / was / I / studying',
            options: ['I', 'was', 'studying', 'while', 'he', 'was', 'reading'],
            correctAnswer: 'I was studying while he was reading',
            explanation: 'Cuando dos acciones ocurrían al mismo tiempo en el pasado, ambas se expresan en Pasado Continuo unidas por "while".'
          }
        ]
      }
    ],
    exam: {
      id: 'exam-a2-u1',
      level: 'A2',
      title: 'Examen de Evaluación: Unidad 1 (Pasado y Rutinas)',
      description: 'Evaluación periódica sobre el uso de formas verbales en pasado simple, continuo y vocabulario de rutina.',
      passingScore: 70,
      exercises: [
        {
          id: 'ex-a2-u1-1',
          type: 'listening',
          instruction: 'Escucha la narración y determina a qué hora llegó el tren a la estación:',
          prompt: 'I was waiting on platform three in Oxford. The train finally arrived at half past four.',
          audioText: 'I was waiting on platform three in Oxford. The train finally arrived at half past four.',
          options: ['4:30', '4:15', '5:30', '3:45'],
          correctAnswer: '4:30',
          explanation: '"Half past four" en inglés británico equivale exactamente a las 4:30.'
        },
        {
          id: 'ex-a2-u1-2',
          type: 'fill-blank',
          instruction: 'Completa la oración con la conjugación negativa correspondiente:',
          prompt: 'We _____ (not go) to the cinema because we were exhausted.',
          options: ["didn't go", "didn't went", "weren't go", "not went"],
          correctAnswer: "didn't go",
          explanation: 'La negación en pasado simple requiere "didn\'t" más el verbo en infinitivo sin to (go).'
        },
        {
          id: 'ex-a2-u1-3',
          type: 'speaking',
          instruction: 'Pronuncia en voz alta la siguiente pregunta con entonación natural:',
          prompt: 'Where did you spend your summer holidays last year?',
          audioText: 'Where did you spend your summer holidays last year?',
          correctAnswer: 'Where did you spend your summer holidays last year?',
          explanation: 'Las preguntas abiertas con Wh- en inglés suelen mantener una entonación descendente al final.'
        },
        {
          id: 'ex-a2-u1-4',
          type: 'sentence-order',
          instruction: 'Ordena los elementos para construir la oración compuesta en pasado:',
          prompt: 'she / when / was sleeping / the telephone / rang',
          options: ['She', 'was sleeping', 'when', 'the telephone', 'rang'],
          correctAnswer: 'She was sleeping when the telephone rang',
          explanation: 'La acción en desarrollo (was sleeping) se interrumpe por la acción puntual en pasado simple (the telephone rang).'
        }
      ]
    }
  },
  {
    id: 'a2-unit-2',
    level: 'A2',
    unitNumber: 2,
    title: 'Viajes, Transporte y Planes Futuros',
    topic: 'Be Going to, Will and Navigating British Cities',
    description: 'Aprende a solicitar indicaciones con cortesía británica, utilizar el transporte público y expresar decisiones y planes a futuro.',
    lessons: [
      {
        id: 'a2-u2-l1',
        unitId: 'a2-unit-2',
        unitTitle: 'Unidad 2',
        title: 'Comprensión Auditiva: En la estación de trenes de Londres',
        description: 'Reconoce avisos por megafonía, andenes y fórmulas para adquirir billetes de tren.',
        durationMinutes: 5,
        type: 'listening',
        exercises: [
          {
            id: 'a2-u2-l1-e1',
            type: 'listening',
            instruction: 'Escucha el anuncio de megafonía y selecciona el andén de salida:',
            prompt: 'The train to Oxford will depart from platform four in ten minutes. Please mind the gap between the train and the platform.',
            audioText: 'The train to Oxford will depart from platform four in ten minutes. Please mind the gap between the train and the platform.',
            options: ['Platform 4', 'Platform 14', 'Platform 2', 'Platform 10'],
            correctAnswer: 'Platform 4',
            explanation: '"Platform four" corresponde al andén 4. "Mind the gap" es la célebre advertencia británica de seguridad.'
          },
          {
            id: 'a2-u2-l1-e2',
            type: 'multiple-choice',
            instruction: '¿Cómo se solicita un billete de ida y vuelta en inglés británico estándar?',
            prompt: 'En la taquilla de la estación, pides:',
            options: ['A return ticket to Oxford, please.', 'A round trip ticket, please.', 'A two-way ticket, please.', 'A back ticket, please.'],
            correctAnswer: 'A return ticket to Oxford, please.',
            explanation: 'En el Reino Unido, el billete de ida y vuelta se denomina "a return ticket". En inglés americano se dice "round trip".'
          },
          {
            id: 'a2-u2-l1-e3',
            type: 'fill-blank',
            instruction: 'Completa la pregunta para saber cuánto cuesta el trayecto:',
            prompt: 'Excuse me, how _____ does a single ticket cost?',
            options: ['much', 'many', 'price', 'fare'],
            correctAnswer: 'much',
            explanation: 'Para preguntar por precios o dinero incontable se utiliza "How much".'
          }
        ]
      },
      {
        id: 'a2-u2-l2',
        unitId: 'a2-unit-2',
        unitTitle: 'Unidad 2',
        title: 'Expresión Oral: Pedir Direcciones en la Calle con Cortesía',
        description: 'Aplica las fórmulas de educación británica para orientarte en cualquier ciudad.',
        durationMinutes: 6,
        type: 'speaking',
        exercises: [
          {
            id: 'a2-u2-l2-e1',
            type: 'speaking',
            instruction: 'Escucha y repite la fórmula educada para consultar una dirección:',
            prompt: 'Excuse me, could you tell me the way to the British Museum?',
            audioText: 'Excuse me, could you tell me the way to the British Museum?',
            correctAnswer: 'Excuse me, could you tell me the way to the British Museum?',
            explanation: 'Comenzar con "Excuse me" y emplear el modal "Could you..." conforma la norma habitual de cortesía británica.'
          },
          {
            id: 'a2-u2-l2-e2',
            type: 'fill-blank',
            instruction: 'Completa la indicación de dirección:',
            prompt: 'Go straight on, and take the second turning on the _____.',
            options: ['left', 'leave', 'lefting', 'depart'],
            correctAnswer: 'left',
            explanation: '"Take the second turning on the left" significa "gira en la segunda calle a la izquierda".'
          },
          {
            id: 'a2-u2-l2-e3',
            type: 'speaking',
            instruction: 'Pronuncia la confirmación de llegada al destino:',
            prompt: 'It is just around the corner, opposite the post office.',
            audioText: 'It is just around the corner, opposite the post office.',
            correctAnswer: 'It is just around the corner, opposite the post office.',
            explanation: '"Opposite" en inglés británico significa "justo enfrente de".'
          }
        ]
      },
      {
        id: 'a2-u2-l3',
        unitId: 'a2-unit-2',
        unitTitle: 'Unidad 2',
        title: 'Gramática Activa: Planes Previos (Going to) vs Decisiones Inmediatas (Will)',
        description: 'Distingue con exactitud cuándo emplear "be going to" para planes estructurados y "will" para decisiones espontáneas.',
        durationMinutes: 6,
        type: 'grammar',
        exercises: [
          {
            id: 'a2-u2-l3-e1',
            type: 'fill-blank',
            instruction: 'Selecciona la opción correcta para un plan decidido con antelación:',
            prompt: 'Next weekend, I _____ (visit) my relatives in Cambridge.',
            options: ['am going to visit', 'will visiting', 'visit will', 'going to visit'],
            correctAnswer: 'am going to visit',
            explanation: 'Para planes e intenciones adoptadas con anterioridad al momento de hablar se utiliza "be going to".'
          },
          {
            id: 'a2-u2-l3-e2',
            type: 'multiple-choice',
            instruction: 'Alguien llama a la puerta y te ofreces a abrir en ese mismo instante:',
            prompt: 'Someone is knocking at the door! — Don\'t worry, _____ it!',
            options: ["I\'ll answer", "I'm going to answer", "I answered", "I answering"],
            correctAnswer: "I\'ll answer",
            explanation: 'Para decisiones espontáneas y ofrecimientos tomados en el instante presente se utiliza "will" (I\'ll).'
          },
          {
            id: 'a2-u2-l3-e3',
            type: 'fill-blank',
            instruction: 'Completa con la predicción basada en evidencia visual visible:',
            prompt: 'Look at those dense dark clouds! It _____ (rain).',
            options: ['is going to rain', 'will raining', 'rains', 'was raining'],
            correctAnswer: 'is going to rain',
            explanation: 'Cuando existe evidencia sensorial clara en el presente (las nubes negras), se utiliza "be going to".'
          }
        ]
      }
    ],
    exam: {
      id: 'exam-a2-u2',
      level: 'A2',
      title: 'Examen de Evaluación: Unidad 2 (Viajes y Futuro)',
      description: 'Mide tu competencia para desenvolverte en transporte público, pedir indicaciones y planificar el futuro.',
      passingScore: 70,
      exercises: [
        {
          id: 'ex-a2-u2-1',
          type: 'sentence-order',
          instruction: 'Ordena la pregunta para localizar la estación de metro más cercana:',
          prompt: 'is / where / station / nearest / the / tube / ?',
          options: ['Where', 'is', 'the', 'nearest', 'tube', 'station?'],
          correctAnswer: 'Where is the nearest tube station?',
          explanation: '"Tube station" es el término británico que designa a las estaciones del metro subterráneo de Londres.'
        },
        {
          id: 'ex-a2-u2-2',
          type: 'speaking',
          instruction: 'Pronuncia con naturalidad tu solicitud en taquilla:',
          prompt: 'Can I have a single ticket to London Victoria, please?',
          audioText: 'Can I have a single ticket to London Victoria, please?',
          correctAnswer: 'Can I have a single ticket to London Victoria, please?',
          explanation: '"Single ticket" significa billete sencillo o únicamente de ida.'
        },
        {
          id: 'ex-a2-u2-3',
          type: 'fill-blank',
          instruction: 'Completa con la forma adecuada para un plan premeditado:',
          prompt: 'We _____ (travel) to Edinburgh on Friday morning.',
          options: ['are going to travel', 'will travelling', 'travelled will', 'going to travel'],
          correctAnswer: 'are going to travel',
          explanation: 'Se emplea "are going to travel" para una actividad planificada con antelación.'
        }
      ]
    }
  },
  {
    id: 'a2-unit-3',
    level: 'A2',
    unitNumber: 3,
    title: 'Experiencias de Vida y Presente Perfecto',
    topic: 'Present Perfect with Ever, Never, Just, Already and Yet',
    description: 'Aprende a comunicar experiencias vividas, hechos recientes y cosas que todavía no has realizado.',
    lessons: [
      {
        id: 'a2-u3-l1',
        unitId: 'a2-unit-3',
        unitTitle: 'Unidad 3',
        title: 'Comprensión Auditiva: Experiencias con "Have you ever...?"',
        description: 'Reconoce preguntas sobre vivencias personales y responde con fluidez.',
        durationMinutes: 5,
        type: 'listening',
        exercises: [
          {
            id: 'a2-u3-l1-e1',
            type: 'listening',
            instruction: 'Escucha la pregunta del profesor y selecciona su significado en español:',
            prompt: 'Have you ever tried traditional English fish and chips with malt vinegar?',
            audioText: 'Have you ever tried traditional English fish and chips with malt vinegar?',
            options: [
              'Have you ever tried traditional English fish and chips with malt vinegar?',
              'Will you buy fish and chips tomorrow?',
              'Where did you cook fish last week?',
              'Do you like red wine vinegar?'
            ],
            correctAnswer: 'Have you ever tried traditional English fish and chips with malt vinegar?',
            explanation: '"Have you ever tried...?" es la estructura canónica para indagar si alguien ha tenido una experiencia en algún momento de su vida.'
          },
          {
            id: 'a2-u3-l1-e2',
            type: 'multiple-choice',
            instruction: '¿Cuál es la respuesta breve afirmativa correcta a la pregunta "Have you seen Big Ben?"',
            prompt: 'Responde de forma afirmativa y natural:',
            options: ['Yes, I have.', 'Yes, I did.', 'Yes, I seen.', 'Yes, I do.'],
            correctAnswer: 'Yes, I have.',
            explanation: 'En respuestas breves, se replica con el mismo auxiliar con el que inició la pregunta: "Yes, I have" o "No, I haven\'t".'
          }
        ]
      },
      {
        id: 'a2-u3-l2',
        unitId: 'a2-unit-3',
        unitTitle: 'Unidad 3',
        title: 'Expresión Oral: Uso de Never y Just',
        description: 'Construye frases claras sobre experiencias no vividas o concluidas hace unos instantes.',
        durationMinutes: 6,
        type: 'speaking',
        exercises: [
          {
            id: 'a2-u3-l2-e1',
            type: 'speaking',
            instruction: 'Pronuncia la siguiente afirmación de experiencia con buena dicción:',
            prompt: 'I have never travelled outside of my country.',
            audioText: 'I have never travelled outside of my country.',
            correctAnswer: 'I have never travelled outside of my country.',
            explanation: 'El adverbio "never" se ubica entre el auxiliar "have" y el participio pasado "travelled".'
          },
          {
            id: 'a2-u3-l2-e2',
            type: 'speaking',
            instruction: 'Pronuncia la frase que denota una acción recién terminada:',
            prompt: 'I have just finished my daily lesson.',
            audioText: 'I have just finished my daily lesson.',
            correctAnswer: 'I have just finished my daily lesson.',
            explanation: '"Just" indica que la acción concluyó escasos segundos o minutos atrás (acabo de terminar).'
          }
        ]
      },
      {
        id: 'a2-u3-l3',
        unitId: 'a2-unit-3',
        unitTitle: 'Unidad 3',
        title: 'Gramática Activa: Presente Perfecto vs Pasado Simple',
        description: 'Distingue cuándo usar Presente Perfecto (tiempo indefinido) y Pasado Simple (momento específico).',
        durationMinutes: 6,
        type: 'grammar',
        exercises: [
          {
            id: 'a2-u3-l3-e1',
            type: 'fill-blank',
            instruction: 'Selecciona la opción correcta al haber una referencia temporal explícita (yesterday):',
            prompt: 'I _____ (lose) my keys yesterday afternoon.',
            options: ['lost', 'have lost', 'was losing', 'losed'],
            correctAnswer: 'lost',
            hint: 'Si la oración especifica "yesterday", "in 2020" o "last week", el Pasado Simple es obligatorio.',
            explanation: 'Al precisar el momento exacto (yesterday), la regla exige Pasado Simple (lost), no Presente Perfecto.'
          },
          {
            id: 'a2-u3-l3-e2',
            type: 'sentence-order',
            instruction: 'Ordena la pregunta interrogativa sobre experiencias:',
            prompt: 'you / ever / have / to / been / London / ?',
            options: ['Have', 'you', 'ever', 'been', 'to', 'London?'],
            correctAnswer: 'Have you ever been to London?',
            explanation: 'Estructura interrogativa de experiencia: Have + Sujeto (you) + ever + participio (been to) + lugar.'
          }
        ]
      }
    ],
    exam: {
      id: 'exam-a2-u3',
      level: 'A2',
      title: 'Examen de Evaluación: Unidad 3 (Presente Perfecto y Experiencias)',
      description: 'Valida tu conocimiento sobre participios verbales irregulares y tiempos perfectos.',
      passingScore: 70,
      exercises: [
        {
          id: 'ex-a2-u3-1',
          type: 'fill-blank',
          instruction: 'Completa con el participio correcto del verbo "see":',
          prompt: 'Have you ever _____ that historical film about Oxford?',
          options: ['seen', 'saw', 'seed', 'seeing'],
          correctAnswer: 'seen',
          explanation: 'Las tres formas del verbo son: see (infinitivo) - saw (pasado) - seen (participio pasado).'
        },
        {
          id: 'ex-a2-u3-2',
          type: 'sentence-order',
          instruction: 'Ordena la frase afirmativa con "already":',
          prompt: 'already / I / seen / have / documentary / that',
          options: ['I', 'have', 'already', 'seen', 'that', 'documentary'],
          correctAnswer: 'I have already seen that documentary',
          explanation: '"Already" se coloca normalmente entre el auxiliar "have" y el participio "seen".'
        }
      ]
    }
  },
  {
    id: 'a2-unit-4',
    level: 'A2',
    unitNumber: 4,
    title: 'Comparaciones, Opiniones y Consejos',
    topic: 'Comparatives, Superlatives and Modals of Advice (Should)',
    description: 'Aprende a contrastar opciones, expresar opiniones fundamentadas y brindar recomendaciones amables.',
    lessons: [
      {
        id: 'a2-u4-l1',
        unitId: 'a2-unit-4',
        unitTitle: 'Unidad 4',
        title: 'Comparativos y Superlativos Regulares e Irregulares',
        description: 'Domina formas irregulares como better, worse, further y superlativos terminados en -est.',
        durationMinutes: 5,
        type: 'grammar',
        exercises: [
          {
            id: 'a2-u4-l1-e1',
            type: 'fill-blank',
            instruction: 'Completa con el comparativo irregular de "good":',
            prompt: 'Tea with milk is much _____ (good) than black coffee in my opinion.',
            options: ['better', 'more good', 'gooder', 'best'],
            correctAnswer: 'better',
            explanation: 'El adjetivo "good" es irregular: good -> better -> the best.'
          },
          {
            id: 'a2-u4-l1-e2',
            type: 'fill-blank',
            instruction: 'Completa con el superlativo de "busy":',
            prompt: 'Oxford Circus is one of the _____ (busy) tube stations in London.',
            options: ['busiest', 'most busy', 'busier', 'more busy'],
            correctAnswer: 'busiest',
            explanation: 'Para adjetivos de dos sílabas terminados en "y", la "y" pasa a "i" y se agrega "-est": busy -> busiest.'
          }
        ]
      },
      {
        id: 'a2-u4-l2',
        unitId: 'a2-unit-4',
        unitTitle: 'Unidad 4',
        title: 'Expresión Oral: Consejos Prácticos con Should',
        description: 'Recomienda actividades y medidas con cortesía británica empleando el modal should.',
        durationMinutes: 5,
        type: 'speaking',
        exercises: [
          {
            id: 'a2-u4-l2-e1',
            type: 'speaking',
            instruction: 'Escucha y pronuncia esta recomendación tradicional británica:',
            prompt: 'You should always carry an umbrella when visiting England.',
            audioText: 'You should always carry an umbrella when visiting England.',
            correctAnswer: 'You should always carry an umbrella when visiting England.',
            hint: 'Recuerda que la letra L en "should" es completamente muda: se pronuncia /ʃʊd/.',
            explanation: 'En los modales "should", "could" y "would", la consonante L no se pronuncia.'
          },
          {
            id: 'a2-u4-l2-e2',
            type: 'multiple-choice',
            instruction: 'Tu colega manifiesta encontrarse agotado. ¿Cuál es el consejo gramaticalmente exacto?',
            prompt: 'Consejo con modal:',
            options: ['You should take a rest.', 'You should to take a rest.', 'You must to take a rest.', 'You should taking a rest.'],
            correctAnswer: 'You should take a rest.',
            explanation: 'Los verbos modales se construyen con infinitivo simple sin "to": You should take a rest.'
          }
        ]
      }
    ],
    exam: {
      id: 'exam-a2-u4',
      level: 'A2',
      title: 'Examen de Evaluación: Unidad 4 (Comparativos y Modales)',
      description: 'Mide tu competencia para contrastar alternativas y aconsejar con propiedad.',
      passingScore: 70,
      exercises: [
        {
          id: 'ex-a2-u4-1',
          type: 'fill-blank',
          instruction: 'Completa con la forma comparativa para adjetivos largos:',
          prompt: 'Living in London is _____ (expensive) than living in smaller provincial towns.',
          options: ['more expensive', 'expensiver', 'most expensive', 'as expensive'],
          correctAnswer: 'more expensive',
          explanation: 'Para adjetivos de tres o más sílabas se antepone "more": more expensive than.'
        },
        {
          id: 'ex-a2-u4-2',
          type: 'sentence-order',
          instruction: 'Ordena la sugerencia:',
          prompt: 'try / should / traditional / you / scones / the',
          options: ['You', 'should', 'try', 'the', 'traditional', 'scones'],
          correctAnswer: 'You should try the traditional scones',
          explanation: 'Estructura: Sujeto (You) + modal (should) + verbo base (try) + complemento.'
        }
      ]
    }
  }
]

export const FINAL_A2_EXAM: Exam = {
  id: 'final-exam-a2',
  level: 'A2',
  title: 'Examen de Certificación Integral Nivel A2',
  description: 'Evaluación oficial global que valida tus competencias de nivel A2 en Comprensión Auditiva, Expresión Oral, Gramática y Estructuras de Comunicación.',
  passingScore: 75,
  exercises: [
    {
      id: 'final-a2-1',
      type: 'listening',
      instruction: 'Listen to tutor Emma\'s personal story and select the correct conclusion:',
      prompt: 'When I first came to Oxford twenty years ago, I didn\'t know anyone. I spent my first afternoon sitting in a quiet teashop by the river, writing in my journal. It was raining gently, as it often does in England. That quiet afternoon made me fall in love with this historic city.',
      audioText: 'When I first came to Oxford twenty years ago, I didn\'t know anyone. I spent my first afternoon sitting in a quiet teashop by the river, writing in my journal. It was raining gently, as it often does in England. That quiet afternoon made me fall in love with this historic city.',
      options: [
        'He fell in love with Oxford while having tea by the river on a rainy afternoon.',
        'He got lost on the London Underground and never arrived at university.',
        'He decided to return home the following day because he knew no one.',
        'He went to buy antique books at Camden Market.'
      ],
      correctAnswer: 'He fell in love with Oxford while having tea by the river on a rainy afternoon.',
      explanation: 'El profesor describe cómo su primera tarde en una casa de té junto al río le hizo enamorarse de Oxford.'
    },
    {
      id: 'final-a2-2',
      type: 'fill-blank',
      instruction: 'Completa la frase con la combinación de pasado simple y continuo:',
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
      explanation: 'Se utiliza "since" con años o momentos concretos (since 2020).'
    },
    {
      id: 'final-a2-4',
      type: 'sentence-order',
      instruction: 'Ordena la pregunta para solicitar un favor con formalidad:',
      prompt: 'mind / would / closing / the window / you / please / ?',
      options: ['Would', 'you', 'mind', 'closing', 'the window,', 'please?'],
      correctAnswer: 'Would you mind closing the window, please?',
      explanation: '"Would you mind + verbo con -ing" es una de las fórmulas más educadas del idioma inglés.'
    },
    {
      id: 'final-a2-5',
      type: 'multiple-choice',
      instruction: 'Selecciona la forma correcta para indicar que nunca has visitado un país:',
      prompt: 'I _____ to Japan, but I would love to go one day.',
      options: ["have never been", "never have went", "haven\'t never been", "was never being"],
      correctAnswer: 'have never been',
      explanation: 'Se utiliza "have never been to" para expresar la ausencia de visitas a un lugar.'
    }
  ]
}

// ============================================================================
// NIVEL B1: INTERMEDIO (CEFR B1)
// ============================================================================
export const CURRICULUM_B1: Unit[] = [
  {
    id: 'b1-unit-1',
    level: 'B1',
    unitNumber: 1,
    title: 'Condicionales y Decisiones Hipotéticas',
    topic: 'First and Second Conditionals (If Clauses)',
    description: 'Aprende a formular consecuencias reales en el futuro e hipótesis sobre situaciones imaginarias.',
    lessons: [
      {
        id: 'b1-u1-l1',
        unitId: 'b1-unit-1',
        unitTitle: 'Unidad 1',
        title: 'Primer Condicional: Causa y Efecto en el Futuro',
        description: 'Domina la estructura "If + Present Simple, will + base form" para predecir consecuencias lógicas.',
        durationMinutes: 6,
        type: 'grammar',
        exercises: [
          {
            id: 'b1-u1-l1-e1',
            type: 'fill-blank',
            instruction: 'Completa la condición real:',
            prompt: 'If it _____ (rain) this afternoon, we _____ (stay) in the library.',
            options: ['rains / will stay', 'will rain / stay', 'rained / would stay', 'rains / stayed'],
            correctAnswer: 'rains / will stay',
            explanation: 'Primer condicional: If + Presente Simple (rains), Will + Infinitivo (will stay).'
          },
          {
            id: 'b1-u1-l1-e2',
            type: 'speaking',
            instruction: 'Pronuncia esta advertencia cotidiana con entonación natural:',
            prompt: 'If you hurry up, you will catch the train on time.',
            audioText: 'If you hurry up, you will catch the train on time.',
            correctAnswer: 'If you hurry up, you will catch the train on time.',
            explanation: 'Enfoca la entonación en las palabras de contenido: "hurry up" y "catch the train".'
          },
          {
            id: 'b1-u1-l1-e3',
            type: 'multiple-choice',
            instruction: 'Identifica la cláusula con significado condicional equivalente a "if not":',
            prompt: '_____ you study consistently, you will not pass the examination.',
            options: ['Unless', 'Provided', 'As long as', 'In case'],
            correctAnswer: 'Unless',
            explanation: '"Unless" equivale semánticamente a "If you do not" (A menos que estudies...).'
          }
        ]
      },
      {
        id: 'b1-u1-l2',
        unitId: 'b1-unit-1',
        unitTitle: 'Unidad 1',
        title: 'Segundo Condicional: Hipótesis Imaginarias y Consejos',
        description: 'Aprende a dar consejos y reflexionar sobre escenarios poco probables con "would".',
        durationMinutes: 6,
        type: 'speaking',
        exercises: [
          {
            id: 'b1-u1-l2-e1',
            type: 'sentence-order',
            instruction: 'Ordena la frase clásica para brindar recomendaciones:',
            prompt: 'were / I / if / you / , / would / accept / I / the position',
            options: ['If', 'I', 'were', 'you,', 'I', 'would', 'accept', 'the position'],
            correctAnswer: 'If I were you, I would accept the position',
            explanation: '"If I were you" es la fórmula formal británica para aconsejar (Si yo fuera tú).'
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
      description: 'Evalúa tu precisión empleando estructuras condicionales reales e hipotéticas.',
      passingScore: 70,
      exercises: [
        {
          id: 'ex-b1-1',
          type: 'fill-blank',
          instruction: 'Selecciona la opción correcta en la pregunta hipotética:',
          prompt: 'What _____ you do if you _____ a million pounds?',
          options: ['would / won', 'will / win', 'would / win', 'did / would win'],
          correctAnswer: 'would / won',
          explanation: 'Estructura interrogativa en segundo condicional: What would you do if you won...?'
        },
        {
          id: 'ex-b1-2',
          type: 'sentence-order',
          instruction: 'Ordena la frase condicional:',
          prompt: 'we / if / umbrella / take / an / rains / it / will',
          options: ['If', 'it', 'rains,', 'we', 'will', 'take', 'an', 'umbrella'],
          correctAnswer: 'If it rains, we will take an umbrella',
          explanation: 'Primer condicional con cláusula de condición al inicio separada por coma.'
        }
      ]
    }
  },
  {
    id: 'b1-unit-2',
    level: 'B1',
    unitNumber: 2,
    title: 'Voz Pasiva y Estilo Indirecto',
    topic: 'Passive Voice (Present and Past) and Reported Speech',
    description: 'Aprende a describir procesos técnicos, hechos históricos y transmitir declaraciones de terceros.',
    lessons: [
      {
        id: 'b1-u2-l1',
        unitId: 'b1-unit-2',
        unitTitle: 'Unidad 2',
        title: 'Voz Pasiva: Foco en la Acción y el Objeto',
        description: 'Construye frases pasivas con "be + participio" cuando el autor es desconocido o irrelevante.',
        durationMinutes: 6,
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
            instruction: 'Escucha el dato histórico de Oxford y responde qué avance científico se probó con éxito:',
            prompt: 'Penicillin was successfully tested in Oxford by Howard Florey and Ernst Chain in nineteen forty.',
            audioText: 'Penicillin was successfully tested in Oxford by Howard Florey and Ernst Chain in nineteen forty.',
            options: ['Penicillin', 'The printing press', 'The steam engine', 'The telephone'],
            correctAnswer: 'Penicillin',
            explanation: 'El audio menciona que "Penicillin was successfully tested in Oxford".'
          }
        ]
      },
      {
        id: 'b1-u2-l2',
        unitId: 'b1-unit-2',
        unitTitle: 'Unidad 2',
        title: 'Estilo Indirecto: Reportar Declaraciones',
        description: 'Domina los cambios de tiempos verbales al reportar lo dicho por otras personas.',
        durationMinutes: 6,
        type: 'grammar',
        exercises: [
          {
            id: 'b1-u2-l2-e1',
            type: 'fill-blank',
            instruction: 'Transforma a Reported Speech aplicando la concordancia de tiempos:',
            prompt: '"I am moving to London," she said. -> She said that she _____ to London.',
            options: ['was moving', 'is moving', 'moved', 'had moved'],
            correctAnswer: 'was moving',
            explanation: 'En estilo indirecto, el presente continuo retrocede a pasado continuo: am moving -> was moving.'
          },
          {
            id: 'b1-u2-l2-e2',
            type: 'speaking',
            instruction: 'Pronuncia con seguridad la cita indirecta:',
            prompt: 'He told me that he had already sent the email.',
            audioText: 'He told me that he had already sent the email.',
            correctAnswer: 'He told me that he had already sent the email.',
            explanation: 'El Past Simple o Present Perfect retrocede a Past Perfect (had sent) en Reported Speech.'
          }
        ]
      }
    ],
    exam: {
      id: 'exam-b1-u2',
      level: 'B1',
      title: 'Examen de Evaluación: Unidad 2 (Pasiva y Discurso B1)',
      description: 'Comprueba tu dominio de la voz pasiva y la transformación a discurso indirecto.',
      passingScore: 70,
      exercises: [
        {
          id: 'ex-b1-u2-1',
          type: 'fill-blank',
          instruction: 'Completa en voz pasiva en presente simple:',
          prompt: 'Millions of cups of tea _____ (consume) across the United Kingdom daily.',
          options: ['are consumed', 'is consumed', 'was consumed', 'consume'],
          correctAnswer: 'are consumed',
          explanation: 'Sujeto en plural ("cups of tea") requiere la forma "are + consumed".'
        }
      ]
    }
  }
]

export const FINAL_B1_EXAM: Exam = {
  id: 'final-exam-b1',
  level: 'B1',
  title: 'Examen de Certificación Integral Nivel B1',
  description: 'Acreditación oficial de nivel B1 Intermedio según el marco MCER: condicionales, voz pasiva y argumentación fluida.',
  passingScore: 75,
  exercises: [
    {
      id: 'final-b1-1',
      type: 'listening',
      instruction: 'Escucha el análisis del profesor y selecciona su tesis central:',
      prompt: 'If more commuters travelled by public transit rather than driving personal vehicles, urban traffic congestion would be remarkably reduced, and air quality in London would improve substantially.',
      audioText: 'If more commuters travelled by public transit rather than driving personal vehicles, urban traffic congestion would be remarkably reduced, and air quality in London would improve substantially.',
      options: [
        'Traveling by public transport significantly reduces congestion and cleans urban air.',
        'Private cars are indispensable to the urban economy.',
        'Public transport should close during weekends.',
        'London residents reject using commuter trains.'
      ],
      correctAnswer: 'Traveling by public transport significantly reduces congestion and cleans urban air.',
      explanation: 'El profesor sostiene que el transporte público reduce la congestión y eleva la calidad del aire.'
    },
    {
      id: 'final-b1-2',
      type: 'fill-blank',
      instruction: 'Completa la transformación a estilo indirecto:',
      prompt: '"I have finished the report," Mark said. -> Mark said that he _____ the report.',
      options: ['had finished', 'has finished', 'finished', 'finishes'],
      correctAnswer: 'had finished',
      explanation: 'El Present Perfect (have finished) cambia a Past Perfect (had finished) al reportar en pasado.'
    },
    {
      id: 'final-b1-3',
      type: 'speaking',
      instruction: 'Pronuncia en voz alta tu respuesta con articulación cuidada:',
      prompt: 'If I were to recommend one book on this subject, it would certainly be this one.',
      audioText: 'If I were to recommend one book on this subject, it would certainly be this one.',
      correctAnswer: 'If I were to recommend one book on this subject, it would certainly be this one.',
      explanation: '"If I were to..." es una construcción refinada de segundo condicional muy apreciada en entornos académicos.'
    }
  ]
}

// ============================================================================
// NIVEL B2: INTERMEDIO ALTO (CEFR B2)
// ============================================================================
export const CURRICULUM_B2: Unit[] = [
  {
    id: 'b2-unit-1',
    level: 'B2',
    unitNumber: 1,
    title: 'Tercer Condicional y Condicionales Mixtos',
    topic: 'Third Conditional (Regrets) and Mixed Conditionals',
    description: 'Aprende a articular hipótesis sobre el pasado y conectar causas pasadas con efectos en el presente.',
    lessons: [
      {
        id: 'b2-u1-l1',
        unitId: 'b2-unit-1',
        unitTitle: 'Unidad 1',
        title: 'Tercer Condicional: Oportunidades Perdidas en el Pasado',
        description: 'Domina la estructura "If + Past Perfect, would have + participio" para reflexionar sobre lo que pudo haber sido.',
        durationMinutes: 6,
        type: 'grammar',
        exercises: [
          {
            id: 'b2-u1-l1-e1',
            type: 'fill-blank',
            instruction: 'Complete the past hypothetical condition (Third Conditional):',
            prompt: 'If we _____ (leave) home earlier, we wouldn\'t have missed our flight from Heathrow.',
            options: ['had left', 'have left', 'would leave', 'left'],
            correctAnswer: 'had left',
            explanation: 'Tercer condicional: If + Past Perfect (had left), would have + participio.'
          },
          {
            id: 'b2-u1-l1-e2',
            type: 'speaking',
            instruction: 'Pronounce with natural British contractions ("would\'ve"):',
            prompt: 'I would have phoned you if I had known you were staying in Oxford.',
            audioText: 'I would have phoned you if I had known you were staying in Oxford.',
            correctAnswer: 'I would have phoned you if I had known you were staying in Oxford.',
            explanation: 'En habla natural británica fluida, "would have" se contrae fonéticamente a /wʊdəv/.'
          }
        ]
      },
      {
        id: 'b2-u1-l2',
        unitId: 'b2-unit-1',
        unitTitle: 'Unidad 1',
        title: 'Condicionales Mixtos: Causa Pasada, Efecto Presente',
        description: 'Combina el pasado perfecto con el condicional simple para vincular decisiones pasadas con tu realidad actual.',
        durationMinutes: 6,
        type: 'grammar',
        exercises: [
          {
            id: 'b2-u1-l2-e1',
            type: 'fill-blank',
            instruction: 'Selecciona la forma que expresa una consecuencia presente de un acto pasado:',
            prompt: 'If I had accepted the university scholarship last year, I _____ (live) in Cambridge today.',
            options: ['would be living', 'would have lived', 'lived', 'had lived'],
            correctAnswer: 'would be living',
            explanation: 'Condicional mixto: condición en pasado (had accepted) con consecuencia en el presente (would be living today).'
          }
        ]
      }
    ],
    exam: {
      id: 'exam-b2-u1',
      level: 'B2',
      title: 'Examen de Evaluación: Unidad 1 (Condicionales B2)',
      description: 'Mide tu dominio de condicionales de tercer orden y estructuras mixtas complejas.',
      passingScore: 70,
      exercises: [
        {
          id: 'ex-b2-1',
          type: 'fill-blank',
          instruction: 'Completa con la forma verbal correcta:',
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
    title: 'Modales de Deducción y Especulación Pasada',
    topic: 'Must have, Can\'t have, Could have and Should have',
    description: 'Especula sobre acontecimientos pasados graduando tu nivel de certeza y lógica argumentativa.',
    lessons: [
      {
        id: 'b2-u2-l1',
        unitId: 'b2-unit-2',
        unitTitle: 'Unidad 2',
        title: 'Certeza Lógica e Imposibilidad Pasada',
        description: 'Distingue cuándo emplear "must have been" para deducciones afirmativas y "can\'t have been" para descartes lógicos.',
        durationMinutes: 6,
        type: 'grammar',
        exercises: [
          {
            id: 'b2-u2-l1-e1',
            type: 'fill-blank',
            instruction: 'Selecciona el modal de deducción lógica fundada en evidencia:',
            prompt: 'The pavement is completely soaked with puddles. It _____ (rain) heavily during the night.',
            options: ['must have rained', 'can\'t have rained', 'should have rained', 'might rain'],
            correctAnswer: 'must have rained',
            explanation: '"Must have rained" indica una deducción casi concluyente fundamentada en pruebas visibles.'
          },
          {
            id: 'b2-u2-l1-e2',
            type: 'multiple-choice',
            instruction: 'Conversaste con Oliver en persona hace 5 minutos. Un tercero afirma que está en Nueva York:',
            prompt: 'Tu réplica:',
            options: ['He can\'t be in New York; I spoke with him in person moments ago!', 'He must be in New York.', 'He should be in New York.', 'He might have been in New York.'],
            correctAnswer: 'He can\'t be in New York; I spoke with him in person moments ago!',
            explanation: '"Can\'t be" expresa imposibilidad lógica contundente frente a la evidencia directa.'
          }
        ]
      }
    ],
    exam: {
      id: 'exam-b2-u2',
      level: 'B2',
      title: 'Examen de Evaluación: Unidad 2 (Modales B2)',
      description: 'Comprueba tu precisión deduciendo situaciones pasadas y expresando juicios fundamentados.',
      passingScore: 70,
      exercises: [
        {
          id: 'ex-b2-2',
          type: 'fill-blank',
          instruction: 'Completa con la crítica sobre una acción debida no realizada:',
          prompt: 'You _____ (notify) the administration earlier! The deadline expired at noon.',
          options: ['should have notified', 'must have notified', 'can\'t have notified', 'would notify'],
          correctAnswer: 'should have notified',
          explanation: '"Should have + participio" expresa que una acción era necesaria u obligatoria en el pasado pero no se llevó a cabo.'
        }
      ]
    }
  }
]

export const FINAL_B2_EXAM: Exam = {
  id: 'final-exam-b2',
  level: 'B2',
  title: 'Examen de Certificación Integral Nivel B2',
  description: 'Certificación oficial de nivel B2 Upper-Intermediate para comunicación profesional, académica y fluidez operativa.',
  passingScore: 75,
  exercises: [
    {
      id: 'final-b2-1',
      type: 'listening',
      instruction: 'Escucha la intervención en el panel de debate y determina el argumento del profesor:',
      prompt: 'While remote working offers undeniable scheduling flexibility, we must not overlook the institutional cohesion and spontaneous creativity that face-to-face collaboration uniquely fosters.',
      audioText: 'While remote working offers undeniable scheduling flexibility, we must not overlook the institutional cohesion and spontaneous creativity that face-to-face collaboration uniquely fosters.',
      options: [
        'In-person collaboration fosters team cohesion and spontaneous creativity in an irreplaceable manner.',
        'Remote work must be eradicated entirely.',
        'Traditional offices are entirely obsolete and inefficient.',
        'Individual creativity only flourishes in total isolation.'
      ],
      correctAnswer: 'In-person collaboration fosters team cohesion and spontaneous creativity in an irreplaceable manner.',
      explanation: 'El ponente argumenta que la colaboración presencial aporta cohesión y creatividad espontánea insustituibles.'
    },
    {
      id: 'final-b2-2',
      type: 'fill-blank',
      instruction: 'Completa con la construcción de condicional mixto adecuada:',
      prompt: 'If I hadn\'t accepted the research appointment in Oxford ten years ago, I _____ (not live) here today.',
      options: ["wouldn't be living", "wouldn't have lived", "didn't live", "won't live"],
      correctAnswer: "wouldn't be living",
      explanation: 'Condicional mixto: causa en pasado (Past Perfect) con efecto continuo en el presente (wouldn\'t be living).'
    },
    {
      id: 'final-b2-3',
      type: 'speaking',
      instruction: 'Pronuncia esta argumentación con firmeza, control tonal y dicción formal:',
      prompt: 'Having meticulously weighed all potential outcomes, we arrived at an agreeable consensus.',
      audioText: 'Having meticulously weighed all potential outcomes, we arrived at an agreeable consensus.',
      correctAnswer: 'Having meticulously weighed all potential outcomes, we arrived at an agreeable consensus.',
      explanation: 'Uso de cláusula de participio perfecto ("Having meticulously weighed...") típica de registros formales y profesionales.'
    }
  ]
}

// ============================================================================
// NIVEL C1: AVANZADO (CEFR C1)
// ============================================================================
export const CURRICULUM_C1: Unit[] = [
  {
    id: 'c1-unit-1',
    level: 'C1',
    unitNumber: 1,
    title: 'Inversión Gramatical y Retórica para Énfasis',
    topic: 'Inversion with Negative and Restrictive Adverbials',
    description: 'Aprende a estructurar oraciones de elevado impacto persuasivo invirtiendo el sujeto y el auxiliar.',
    lessons: [
      {
        id: 'c1-u1-l1',
        unitId: 'c1-unit-1',
        unitTitle: 'Unidad 1',
        title: 'Inversión con Adverbios Restrictivos (Seldom, Rarely, Never)',
        description: 'Aplica giros sintácticos retóricos como "Seldom have I witnessed..." en discursos y ensayos formales.',
        durationMinutes: 6,
        type: 'grammar',
        exercises: [
          {
            id: 'c1-u1-l1-e1',
            type: 'sentence-order',
            instruction: 'Ordena los elementos para construir una inversión enfática formal:',
            prompt: 'have / never / I / such / heard / eloquence / inspiring',
            options: ['Never', 'have', 'I', 'heard', 'such', 'inspiring', 'eloquence'],
            correctAnswer: 'Never have I heard such inspiring eloquence',
            explanation: 'Al anteponer "Never", el orden se invierte a Auxiliar (have) + Sujeto (I) + Verbo (heard).'
          },
          {
            id: 'c1-u1-l1-e2',
            type: 'fill-blank',
            instruction: 'Completa la inversión formal en un contexto institucional:',
            prompt: 'Under no circumstances _____ (staff / permit) to disclose confidential client data.',
            options: ['are staff permitted', 'staff are permitted', 'staff permit', 'are permitted staff'],
            correctAnswer: 'are staff permitted',
            explanation: 'Con expresiones restrictivas como "Under no circumstances", la inversión es preceptiva: are + staff + permitted.'
          }
        ]
      }
    ],
    exam: {
      id: 'exam-c1-u1',
      level: 'C1',
      title: 'Examen de Evaluación: Unidad 1 (Inversión C1)',
      description: 'Evalúa tu dominio de la inversión formal y la sintaxis retórica avanzada.',
      passingScore: 70,
      exercises: [
        {
          id: 'ex-c1-1',
          type: 'fill-blank',
          instruction: 'Completa la inversión retórica:',
          prompt: 'Little _____ (she / realize) that her decision would alter the trajectory of modern science.',
          options: ['did she realize', 'she realized', 'she did realize', 'had she realized'],
          correctAnswer: 'did she realize',
          explanation: '"Little did she realize" es la estructura clásica de inversión con "Little" en literatura y ensayo.'
        }
      ]
    }
  },
  {
    id: 'c1-unit-2',
    level: 'C1',
    unitNumber: 2,
    title: 'Diplomacia, Eufemismo y Oraciones Hendidas',
    topic: 'Cleft Sentences and Diplomatic Indirectness',
    description: 'Aprende a matizar discrepancias, sonar impecablemente educado y focalizar ideas con oraciones hendidas.',
    lessons: [
      {
        id: 'c1-u2-l1',
        unitId: 'c1-unit-2',
        unitTitle: 'Unidad 2',
        title: 'Oraciones Hendidas (Cleft Sentences: What... / It is...)',
        description: 'Domina "What concerns us is...", "It was precisely for this reason that..." para guiar la atención del interlocutor.',
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
            explanation: '"What + cláusula + is/was" focaliza el objeto o idea con elegancia retórica.'
          },
          {
            id: 'c1-u2-l1-e2',
            type: 'speaking',
            instruction: 'Pronuncia esta fórmula de desacuerdo diplomático británico:',
            prompt: 'With all due respect, I am not entirely persuaded by that argument.',
            audioText: 'With all due respect, I am not entirely persuaded by that argument.',
            correctAnswer: 'With all due respect, I am not entirely persuaded by that argument.',
            explanation: '"I am not entirely persuaded" es el canon diplomático británico para manifestar desacuerdo sin confrontación.'
          }
        ]
      }
    ],
    exam: {
      id: 'exam-c1-u2',
      level: 'C1',
      title: 'Examen de Evaluación: Unidad 2 (Diplomacia C1)',
      description: 'Mide tu competencia para comunicarte con registro diplomático sofisticado y persuasión serena.',
      passingScore: 70,
      exercises: [
        {
          id: 'ex-c1-2',
          type: 'multiple-choice',
          instruction: '¿Cuál es la forma más diplomática de manifestar cautela frente a una propuesta en un comité directivo?',
          prompt: 'Rechazo profesional y diplomático:',
          options: [
            'I have certain reservations regarding the feasibility of this proposal.',
            'This idea is completely flawed and unworkable.',
            'I strongly dislike this concept.',
            'You shouldn\'t have proposed this.'
          ],
          correctAnswer: 'I have certain reservations regarding the feasibility of this proposal.',
          explanation: '"I have certain reservations regarding the feasibility..." es la expresión diplomática prototípica.'
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
      prompt: 'Not only does multilingualism enhance cognitive flexibility across the human lifespan, but it also fortifies neural pathways against degenerative cognitive decline.',
      audioText: 'Not only does multilingualism enhance cognitive flexibility across the human lifespan, but it also fortifies neural pathways against degenerative cognitive decline.',
      options: [
        'Multilingualism boosts cognitive flexibility and shields neural pathways from age-related decline.',
        'Language acquisition damages long-term concentration.',
        'Only infants can develop neurocognitive bilingualism.',
        'English is the sole language with proven cognitive benefits.'
      ],
      correctAnswer: 'Multilingualism boosts cognitive flexibility and shields neural pathways from age-related decline.',
      explanation: 'La estructura correlativa "Not only... but it also..." enfatiza ambos beneficios cognitivos simultáneamente.'
    },
    {
      id: 'final-c1-2',
      type: 'fill-blank',
      instruction: 'Completa con la forma adecuada del subjuntivo formal mandatorio inglés:',
      prompt: 'It is essential that every delegate _____ (be) present when the treaty is ratified.',
      options: ['be', 'is', 'was', 'should be being'],
      correctAnswer: 'be',
      explanation: 'En el subjuntivo formal inglés con adjetivos de mandato o necesidad, se usa la forma base pura (be) para todas las personas.'
    },
    {
      id: 'final-c1-3',
      type: 'speaking',
      instruction: 'Pronuncia con cadencia retórica, control tonal y dicción impecable:',
      prompt: 'Scarcely had the keynote address concluded when an enthusiastic ovation erupted.',
      audioText: 'Scarcely had the keynote address concluded when an enthusiastic ovation erupted.',
      correctAnswer: 'Scarcely had the keynote address concluded when an enthusiastic ovation erupted.',
      explanation: 'Inversión temporal: Scarcely had + Sujeto + participio... when...'
    }
  ]
}

// ============================================================================
// NIVEL C2: MAESTRÍA Y PROFICIENCIA (CEFR C2)
// ============================================================================
export const CURRICULUM_C2: Unit[] = [
  {
    id: 'c2-unit-1',
    level: 'C2',
    unitNumber: 1,
    title: 'Retórica Magistral y Estilo Académico Oxford',
    topic: 'Mastery of Syntax, Participle Clauses and Nuance',
    description: 'Alcanza el registro supremo del idioma inglés: oratoria parlamentaria, ensayo literario y precisión lexical absoluta.',
    lessons: [
      {
        id: 'c2-u1-l1',
        unitId: 'c2-unit-1',
        unitTitle: 'Unidad 1',
        title: 'Sintaxis Compleja y Cláusulas Absolutas de Participio',
        description: 'Estructuras densas y elegantes para articular razonamientos sofisticados sin subordinación innecesaria.',
        durationMinutes: 6,
        type: 'grammar',
        exercises: [
          {
            id: 'c2-u1-l1-e1',
            type: 'sentence-order',
            instruction: 'Ordena la cláusula absoluta clásica de la prosa ensayística de Oxford:',
            prompt: 'all / being / considered / things / concluded / proceedings / were / the',
            options: ['All', 'things', 'considered,', 'the', 'proceedings', 'were', 'concluded'],
            correctAnswer: 'All things considered, the proceedings were concluded',
            explanation: '"All things considered" opera como una cláusula absoluta de participio independiente.'
          },
          {
            id: 'c2-u1-l1-e2',
            type: 'speaking',
            instruction: 'Pronuncia con la cadencia de la oratoria británica ilustrada:',
            prompt: 'Be that as it may, we cannot turn a blind eye to empirical reality.',
            audioText: 'Be that as it may, we cannot turn a blind eye to empirical reality.',
            correctAnswer: 'Be that as it may, we cannot turn a blind eye to empirical reality.',
            explanation: '"Be that as it may" (sea como fuere) es un conector concesivo formal de alta elocuencia.'
          }
        ]
      }
    ],
    exam: {
      id: 'exam-c2-u1',
      level: 'C2',
      title: 'Examen de Evaluación: Unidad 1 (Retórica C2)',
      description: 'Mide tu destreza para componer y analizar prosa de nivel maestría.',
      passingScore: 70,
      exercises: [
        {
          id: 'ex-c2-1',
          type: 'fill-blank',
          instruction: 'Completa con la colocación consagrada de registro culto:',
          prompt: 'His treatise on moral philosophy falls nothing short of an absolute tour de _____.',
          options: ['force', 'grace', 'power', 'mind'],
          correctAnswer: 'force',
          explanation: '"A tour de force" es el término consagrado en inglés culto para denotar una obra maestra de excepcional maestría técnica.'
        }
      ]
    }
  },
  {
    id: 'c2-unit-2',
    level: 'C2',
    unitNumber: 2,
    title: 'Ironía, Eufemismo Británico y Agudeza Idiomática',
    topic: 'British Understatement, Irony and Mastery of Idiom',
    description: 'Decodifica el humor sutil, el "understatement" y los matices que caracterizan el dominio nativo pleno.',
    lessons: [
      {
        id: 'c2-u2-l1',
        unitId: 'c2-unit-2',
        unitTitle: 'Unidad 2',
        title: 'El Understatement Británico en su Máxima Expresión',
        description: 'Cómo un británico expresa un reto titánico diciendo con flema: "We have a bit of a situation".',
        durationMinutes: 6,
        type: 'listening',
        exercises: [
          {
            id: 'c2-u2-l1-e1',
            type: 'listening',
            instruction: 'Escucha la expresión del profesor Davies y determina su significado real en contexto:',
            prompt: 'It was rather a sticky wicket, but we soldiered on and managed to pull it off.',
            audioText: 'It was rather a sticky wicket, but we soldiered on and managed to pull it off.',
            options: [
              'It was a remarkably difficult and delicate situation, yet we persevered and achieved the goal.',
              'There was a physical defect with the cricket pavilion gate.',
              'We chose to capitulate at the first sign of poor weather.',
              'The weather was exceptionally humid.'
            ],
            correctAnswer: 'It was a remarkably difficult and delicate situation, yet we persevered and achieved the goal.',
            explanation: '"On a sticky wicket" es un modismo británico histórico proveniente del críquet para denotar una circunstancia ardua y espinosa.'
          },
          {
            id: 'c2-u2-l1-e2',
            type: 'speaking',
            instruction: 'Pronounce this sentence with characteristic British composure and dry wit:',
            prompt: 'I wouldn\'t say it was an unmitigated triumph, to put it mildly.',
            audioText: 'I wouldn\'t say it was an unmitigated triumph, to put it mildly.',
            correctAnswer: 'I wouldn\'t say it was an unmitigated triumph, to put it mildly.',
            explanation: '"To put it mildly" es el eufemismo por antonomasia para atenuar verbalmente una valoración adversa.'
          }
        ]
      }
    ],
    exam: {
      id: 'exam-c2-u2',
      level: 'C2',
      title: 'Examen de Evaluación: Unidad 2 (Agudeza C2)',
      description: 'Evalúa tu comprensión de la ironía y los matices profundos del inglés nativo superior.',
      passingScore: 70,
      exercises: [
        {
          id: 'ex-c2-2',
          type: 'multiple-choice',
          instruction: '¿Qué denota cuando un interlocutor británico califica una propuesta con cortesía diciendo "That is a very courageous proposal"?',
          prompt: 'Decodifica el eufemismo institucional británico:',
          options: [
            'She considers the proposal utterly foolish, reckless, or ill-advised.',
            'She admires your daring spirit and will fund it immediately.',
            'She insinuates that you require military training.',
            'She suggests putting it to an immediate public vote.'
          ],
          correctAnswer: 'She considers the proposal utterly foolish, reckless, or ill-advised.',
          explanation: 'En el humor institucional británico (consagrado en Yes Minister), calificar un plan como "courageous" es la fórmula más cortés para advertir que conducirá al desastre.'
        }
      ]
    }
  }
]

export const FINAL_C2_EXAM: Exam = {
  id: 'final-exam-c2',
  level: 'C2',
  title: 'Examen de Maestría Máxima Nivel C2 (Oxford Master of English)',
  description: 'La máxima acreditación pedagógica otorgada por el profesor Davies. Certifica el dominio pleno, erudito y nativo del idioma inglés.',
  passingScore: 80,
  exercises: [
    {
      id: 'final-c2-1',
      type: 'listening',
      instruction: 'Escucha la disertación final de clausura y extrae la conclusión epistemológica:',
      prompt: 'Language is by no means a static repository of symbols, but rather a dynamic, living organism that mirrors the evolving consciousness of humanity itself. To master it is not merely to acquire vocabulary, but to inhabit another way of perceiving existence.',
      audioText: 'Language is by no means a static repository of symbols, but rather a dynamic, living organism that mirrors the evolving consciousness of humanity itself. To master it is not merely to acquire vocabulary, but to inhabit another way of perceiving existence.',
      options: [
        'Mastering a language is not mere vocabulary memorization, but inhabiting a new way of perceiving human existence.',
        'Dictionaries must remain entirely unchanged across the centuries.',
        'Static symbols are superior to living consciousness.',
        'Language learning should be strictly limited to utilitarian grammar.'
      ],
      correctAnswer: 'Mastering a language is not mere vocabulary memorization, but inhabiting a new way of perceiving human existence.',
      explanation: 'La disertación culmina afirmando que el verdadero dominio lingüístico transforma la percepción misma de la realidad.'
    },
    {
      id: 'final-c2-2',
      type: 'fill-blank',
      instruction: 'Completa con la correlación retórica precisa:',
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

// ============================================================================
// REGISTRO GLOBAL DE NIVELES (A2 -> C2)
// ============================================================================
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
  'A1': {
    level: 'A1',
    title: 'Level A1',
    subtitle: 'Beginner (CEFR A1)',
    description: 'Foundational greetings, alphabet, numbers, verb to be, daily objects, café ordering, and present simple routines.',
    accentColor: 'from-sky-500 to-blue-600',
    badgeText: 'Absolute Foundations',
    units: CURRICULUM_A1,
    finalExam: FINAL_A1_EXAM,
  },

  'A2': {
    level: 'A2',
    title: 'Level A2',
    subtitle: 'Pre-Intermediate (CEFR A2)',
    description: 'Daily routines, past simple and continuous anecdotes, asking for directions, UK travel, and future intentions.',
    accentColor: 'from-blue-600 to-indigo-600',
    badgeText: 'Functional Foundations',
    units: CURRICULUM_A2,
    finalExam: FINAL_A2_EXAM,
  },
  'B1': {
    level: 'B1',
    title: 'Level B1',
    subtitle: 'Intermediate (CEFR B1)',
    description: 'Conditionals 1 & 2, passive voice, reported speech, expressing viewpoints, and independent travel.',
    accentColor: 'from-emerald-600 to-teal-700',
    badgeText: 'Communicative Independence',
    units: CURRICULUM_B1,
    finalExam: FINAL_B1_EXAM,
  },
  'B2': {
    level: 'B2',
    title: 'Level B2',
    subtitle: 'Upper-Intermediate (CEFR B2)',
    description: 'Third & mixed conditionals, past modals of deduction, debate argumentation, and professional discussions.',
    accentColor: 'from-amber-600 to-orange-700',
    badgeText: 'Fluency & Spontaneity',
    units: CURRICULUM_B2,
    finalExam: FINAL_B2_EXAM,
  },
  'C1': {
    level: 'C1',
    title: 'Level C1',
    subtitle: 'Effective Operational Proficiency (CEFR C1)',
    description: 'Emphatic grammatical inversion, cleft sentences, advanced diplomatic tact, and indirect British courtesy.',
    accentColor: 'from-purple-600 to-violet-800',
    badgeText: 'Operational Proficiency',
    units: CURRICULUM_C1,
    finalExam: FINAL_C1_EXAM,
  },
  'C2': {
    level: 'C2',
    title: 'Level C2',
    subtitle: 'Mastery & Native Oxford Proficiency (CEFR C2)',
    description: 'Oxford academic rhetoric, absolute participle clauses, dry British irony, and master understatement.',
    accentColor: 'from-rose-600 via-pink-700 to-purple-900',
    badgeText: 'Oxford Rhetorical Mastery',
    units: CURRICULUM_C2,
    finalExam: FINAL_C2_EXAM,
  },
}
