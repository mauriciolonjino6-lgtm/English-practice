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
            explanation: 'Emma clearly says: "I am from Oxford in the United Kingdom."',
          },
          {
            id: 'a1-u1-l1-e2',
            type: 'fill-blank',
            instruction: 'Complete the sentence with the correct form of the verb "to be":',
            prompt: 'Hello, my name _____ (be) Mauricio and I am an English student.',
            options: ['is', 'am', 'are', 'be'],
            correctAnswer: 'is',
            explanation: '"My name" is singular (third person: it), so the correct verb is "is".',
          },
          {
            id: 'a1-u1-l1-e3',
            type: 'speaking',
            instruction: 'Read aloud with clear, friendly British pronunciation:',
            prompt: 'Hello Emma, pleased to meet you. I am ready to learn English.',
            audioText: 'Hello Emma, pleased to meet you. I am ready to learn English.',
            correctAnswer: 'Hello Emma, pleased to meet you. I am ready to learn English.',
            hint: 'Pronounce "pleased" smoothly in one syllable ending in a /d/ sound.',
            explanation: '"Pleased to meet you" is the standard British polite greeting when meeting someone for the first time.',
          },
          {
            id: 'a1-u1-l1-e4',
            type: 'sentence-order',
            instruction: 'Arrange the words to form a polite British introduction:',
            prompt: 'to / Pleased / you / meet / Emma',
            options: ['Pleased', 'to', 'meet', 'you', 'Emma'],
            correctAnswer: 'Pleased to meet you Emma',
            explanation: 'The standard greeting phrase is "Pleased to meet you, Emma."',
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
            explanation: 'O - X - F - O - R - D spells Oxford.',
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
            explanation: 'In English, age is expressed with the verb "to be" (I am / He is), never with "have".',
          },
          {
            id: 'a1-u1-l2-e3',
            type: 'fill-blank',
            instruction: 'Complete with the correct number word:',
            prompt: 'Seven plus five equals _____ (12).',
            options: ['twelve', 'twenty', 'eleven', 'two'],
            correctAnswer: 'twelve',
            explanation: '7 + 5 = 12 (twelve).',
          },
          {
            id: 'a1-u1-l2-e4',
            type: 'speaking',
            instruction: 'Pronounce the numbers clearly:',
            prompt: 'One, two, three, four, five, six, seven, eight, nine, ten.',
            audioText: 'One, two, three, four, five, six, seven, eight, nine, ten.',
            correctAnswer: 'One, two, three, four, five, six, seven, eight, nine, ten.',
            explanation: 'Focus on clear vowel sounds and the unvoiced "th" in "three".',
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
            explanation: 'Plural pronouns (we, you, they) take "are".',
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
            explanation: 'Negative of "is" is "is not" or the contraction "isn\'t".',
          },
          {
            id: 'a1-u1-l3-e3',
            type: 'sentence-order',
            instruction: 'Arrange the words to form a question with verb to be:',
            prompt: 'from / Are / England / you / ?',
            options: ['Are', 'you', 'from', 'England', '?'],
            correctAnswer: 'Are you from England ?',
            explanation: 'Questions with "to be" invert the verb and subject: Verb (Are) + Subject (you) + Complement (from England?).',
          },
          {
            id: 'a1-u1-l3-e4',
            type: 'fill-blank',
            instruction: 'Complete with the short answer:',
            prompt: 'Is he your English teacher? — Yes, he _____.',
            options: ['is', 'are', 'does', 'has'],
            correctAnswer: 'is',
            explanation: 'Short affirmative answer: "Yes, he is."',
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
          explanation: 'The speaker states: "I am from Manchester."',
        },
        {
          id: 'exam-a1-u1-e2',
          type: 'fill-blank',
          instruction: 'Complete the sentence with the correct form of the verb to be:',
          prompt: 'We _____ (be) happy to study at the language academy.',
          options: ['are', 'is', 'am', 'be'],
          correctAnswer: 'are',
          explanation: 'The pronoun "we" requires "are".',
        },
        {
          id: 'exam-a1-u1-e3',
          type: 'sentence-order',
          instruction: 'Arrange the words to form a correct question:',
          prompt: 'your / name / What / is / ?',
          options: ['What', 'is', 'your', 'name', '?'],
          correctAnswer: 'What is your name ?',
          explanation: 'Information question structure: Question word (What) + Verb (is) + Subject (your name?).',
        }
      ]
    }
  },
  {
    id: 'a1-unit-2',
    level: 'A1',
    unitNumber: 2,
    title: 'Unit 2: Daily Objects, Articles & Ordering at a London Cafe',
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
            explanation: 'The customer orders "a white coffee and a warm croissant, please".',
          },
          {
            id: 'a1-u2-l1-e2',
            type: 'speaking',
            instruction: 'Practice ordering politely with British manners:',
            prompt: 'Could I have a cup of English tea, please?',
            audioText: 'Could I have a cup of English tea, please?',
            correctAnswer: 'Could I have a cup of English tea, please?',
            hint: 'Use a gentle rising intonation on "please".',
            explanation: '"Could I have..., please?" is the standard British formula for ordering food and drinks.',
          },
          {
            id: 'a1-u2-l1-e3',
            type: 'fill-blank',
            instruction: 'Complete the price inquiry:',
            prompt: 'Excuse me, _____ much is this slice of cake?',
            options: ['How', 'What', 'Where', 'Who'],
            correctAnswer: 'How',
            explanation: '"How much is..." is the standard question to ask for price.',
          },
          {
            id: 'a1-u2-l1-e4',
            type: 'sentence-order',
            instruction: 'Arrange the words to order politely:',
            prompt: 'have / please / I / tea / Could / a / ?',
            options: ['Could', 'I', 'have', 'a', 'tea', 'please', '?'],
            correctAnswer: 'Could I have a tea please ?',
            explanation: 'Polite request order: Could + I + have + a tea + please?',
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
            explanation: '"This" is singular and refers to an object close to the speaker.',
          },
          {
            id: 'a1-u2-l2-e2',
            type: 'fill-blank',
            instruction: 'Select the correct plural demonstrative for objects further away:',
            prompt: 'Look over there! _____ red double-decker buses are magnificent.',
            options: ['Those', 'These', 'This', 'That'],
            correctAnswer: 'Those',
            explanation: '"Those" is plural and refers to items further away ("over there").',
          },
          {
            id: 'a1-u2-l2-e3',
            type: 'multiple-choice',
            instruction: 'Which of these is the correct irregular plural of "person"?',
            prompt: 'There are five _____ waiting in the queue.',
            options: ['people', 'persons', 'peoples', 'persones'],
            correctAnswer: 'people',
            explanation: 'The plural of "person" in standard English is "people".',
          },
          {
            id: 'a1-u2-l2-e4',
            type: 'fill-blank',
            instruction: 'Complete with regular plural spelling:',
            prompt: 'I have two _____ (watch) on my desk.',
            options: ['watches', 'watchs', 'watchies', 'watch'],
            correctAnswer: 'watches',
            explanation: 'Nouns ending in "ch", "sh", "s", or "x" add "-es" in plural: watch -> watches.',
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
            explanation: '"An" is used before vowel sounds (an apple); "a" before consonant sounds (a sandwich).',
          },
          {
            id: 'a1-u2-l3-e2',
            type: 'multiple-choice',
            instruction: 'Pay attention to the initial vowel sound of "university":',
            prompt: 'Oxford is _____ world-famous university.',
            options: ['a', 'an', 'the', 'no article'],
            correctAnswer: 'a',
            explanation: '"University" begins with the consonant sound /j/ ("yoo-niversity"), so we use "a", not "an".',
          },
          {
            id: 'a1-u2-l3-e3',
            type: 'sentence-order',
            instruction: 'Arrange the words with the definite article:',
            prompt: 'The / on / is / table / the / book',
            options: ['The', 'book', 'is', 'on', 'the', 'table'],
            correctAnswer: 'The book is on the table',
            explanation: 'Syntax: The book (subject) + is (verb) + on the table (prepositional phrase).',
          },
          {
            id: 'a1-u2-l3-e4',
            type: 'fill-blank',
            instruction: 'Choose the correct article for the specific museum:',
            prompt: 'We are visiting _____ British Museum this afternoon.',
            options: ['the', 'a', 'an', 'some'],
            correctAnswer: 'the',
            explanation: 'Specific unique institutions use the definite article "the".',
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
          explanation: '"Three pounds and fifty pence" corresponds to £3.50.',
        },
        {
          id: 'exam-a1-u2-e2',
          type: 'fill-blank',
          instruction: 'Complete with "a" or "an":',
          prompt: 'Would you like _____ cup of coffee or _____ glass of orange juice?',
          options: ['a / a', 'an / a', 'a / an', 'an / an'],
          correctAnswer: 'a / a',
          explanation: 'Both "cup" and "glass" begin with consonant sounds.',
        },
        {
          id: 'exam-a1-u2-e3',
          type: 'sentence-order',
          instruction: 'Arrange the words to ask for the bill politely:',
          prompt: 'bill / Could / the / we / please / have / ?',
          options: ['Could', 'we', 'have', 'the', 'bill', 'please', '?'],
          correctAnswer: 'Could we have the bill please ?',
          explanation: 'Standard British formula to ask for the bill in restaurants or cafes.',
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
            explanation: 'Emma says: "I teach my morning class at nine o\'clock."',
          },
          {
            id: 'a1-u3-l1-e2',
            type: 'fill-blank',
            instruction: 'Complete with the adverb of frequency:',
            prompt: 'I _____ (100% frequency) have tea in the afternoon; it is my favourite habit.',
            options: ['always', 'never', 'sometimes', 'rarely'],
            correctAnswer: 'always',
            explanation: '"Always" represents 100% regularity.',
          },
          {
            id: 'a1-u3-l1-e3',
            type: 'speaking',
            instruction: 'Pronounce the routine sentence with natural cadence:',
            prompt: 'I live in a peaceful town and I study English every single day.',
            audioText: 'I live in a peaceful town and I study English every single day.',
            correctAnswer: 'I live in a peaceful town and I study English every single day.',
            explanation: 'Ensure smooth linking between "live in" and "study English".',
          },
          {
            id: 'a1-u3-l1-e4',
            type: 'sentence-order',
            instruction: 'Arrange the sentence with correct adverb of frequency placement:',
            prompt: 'drinks / never / She / coffee / at / night',
            options: ['She', 'never', 'drinks', 'coffee', 'at', 'night'],
            correctAnswer: 'She never drinks coffee at night',
            explanation: 'Adverbs of frequency go between the subject and main verb: Subject (She) + Adverb (never) + Verb (drinks).',
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
            explanation: 'Third person singular (he/she/it) adds "-s": work -> works.',
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
            explanation: 'Auxiliary "doesn\'t" is followed by the base infinitive form of the verb without "-s" (live).',
          },
          {
            id: 'a1-u3-l2-e3',
            type: 'fill-blank',
            instruction: 'Complete the question with the correct auxiliary:',
            prompt: '_____ you speak English with tutor Emma?',
            options: ['Do', 'Does', 'Are', 'Is'],
            correctAnswer: 'Do',
            explanation: 'Questions with pronoun "you" in Present Simple require auxiliary "Do".',
          },
          {
            id: 'a1-u3-l2-e4',
            type: 'sentence-order',
            instruction: 'Arrange the third-person question:',
            prompt: 'live / Does / in / London / she / ?',
            options: ['Does', 'she', 'live', 'in', 'London', '?'],
            correctAnswer: 'Does she live in London ?',
            explanation: 'Structure: Auxiliary (Does) + Subject (she) + Verb (live) + Complement (in London?).',
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
            explanation: '"Where" asks about place or location.',
          },
          {
            id: 'a1-u3-l3-e2',
            type: 'fill-blank',
            instruction: 'Select the correct question word for asking about time:',
            prompt: '_____ does the lesson begin? — At ten in the morning.',
            options: ['When', 'Where', 'Who', 'Which'],
            correctAnswer: 'When',
            explanation: '"When" asks about time.',
          },
          {
            id: 'a1-u3-l3-e3',
            type: 'speaking',
            instruction: 'Ask the question clearly with British falling intonation:',
            prompt: 'What is your favourite thing about studying English?',
            audioText: 'What is your favourite thing about studying English?',
            correctAnswer: 'What is your favourite thing about studying English?',
            explanation: 'Wh- questions naturally finish with a falling intonation.',
          },
          {
            id: 'a1-u3-l3-e4',
            type: 'sentence-order',
            instruction: 'Arrange the words to form a complete information question:',
            prompt: 'from / Where / you / are / ?',
            options: ['Where', 'are', 'you', 'from', '?'],
            correctAnswer: 'Where are you from ?',
            explanation: 'Standard syntax: Question word (Where) + Verb (are) + Subject (you) + Preposition (from?).',
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
          explanation: 'The speaker states: "Every morning, I take the train to work."',
        },
        {
          id: 'exam-a1-u3-e2',
          type: 'fill-blank',
          instruction: 'Complete with third person present simple:',
          prompt: 'My sister _____ (teach) history at the secondary school.',
          options: ['teaches', 'teach', 'teachies', 'is teach'],
          correctAnswer: 'teaches',
          explanation: 'Verbs ending in "ch" take "-es" in third person singular: teach -> teaches.',
        },
        {
          id: 'exam-a1-u3-e3',
          type: 'sentence-order',
          instruction: 'Arrange the question words:',
          prompt: 'do / What / at / weekends / you / do / ?',
          options: ['What', 'do', 'you', 'do', 'at', 'weekends', '?'],
          correctAnswer: 'What do you do at weekends ?',
          explanation: 'Syntax: Question word (What) + Auxiliary (do) + Subject (you) + Verb (do) + Time phrase (at weekends?).',
        }
      ]
    }
  }
];

export const FINAL_A1_EXAM: Exam = {
  id: 'final-exam-a1',
  level: 'A1',
  title: 'Oxford A1 Beginner Official Certification Assessment',
  description: 'Comprehensive examination evaluating foundational A1 competencies: greetings, verb to be, cafe ordering, daily routines, and question syntax. Passing unlocks Level A2.',
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
      explanation: 'Emma states: "Here, we help you speak natural English with confidence from day one."',
    },
    {
      id: 'final-a1-2',
      type: 'fill-blank',
      instruction: 'Complete the sentence with the accurate article and verb to be:',
      prompt: 'Mauricio _____ (be) _____ English student.',
      options: ['is / an', 'are / a', 'is / a', 'am / an'],
      correctAnswer: 'is / an',
      explanation: 'Mauricio (singular) requires "is", and "English" starts with a vowel sound, requiring "an".',
    },
    {
      id: 'final-a1-3',
      type: 'speaking',
      instruction: 'Introduce yourself aloud clearly and confidently in English:',
      prompt: 'Hello Emma, my name is Mauricio. I am an enthusiastic student and I practice English every day.',
      audioText: 'Hello Emma, my name is Mauricio. I am an enthusiastic student and I practice English every day.',
      correctAnswer: 'Hello Emma, my name is Mauricio. I am an enthusiastic student and I practice English every day.',
      explanation: 'Clear introductory sentence demonstrating verb to be and present simple.',
    },
    {
      id: 'final-a1-4',
      type: 'sentence-order',
      instruction: 'Arrange the words to form a polite British request at a restaurant:',
      prompt: 'the / have / menu / please / Could / we / ?',
      options: ['Could', 'we', 'have', 'the', 'menu', 'please', '?'],
      correctAnswer: 'Could we have the menu please ?',
      explanation: 'Polite British formula: Could + we + have + the menu + please?',
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
    title: 'Daily Routines, Habits & True Past',
    topic: 'Past Simple, Past Continuous and Daily Life',
    description: 'Learn to recount what you did yesterday, talk about daily habits, and describe interrupted actions using natural British English.',
    lessons: [
      {
        id: 'a2-u1-l1',
        unitId: 'a2-unit-1',
        unitTitle: 'Unidad 1',
        title: 'Listening Comprehension: A Typical Morning in Oxford',
        description: 'Train your listening comprehension with everyday routine and past tense sentences in a natural British accent.',
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
            hint: 'Pay close attention to the British idiom "put the kettle on for a cuppa".',
            explanation: 'In the United Kingdom, "put the kettle on for a cuppa" means to boil water in the kettle to brew a cup of tea.',
          },
          {
            id: 'a2-u1-l1-e2',
            type: 'listening',
            instruction: 'Listen carefully and complete the missing word in the British idiom:',
            prompt: 'While I was walking to college, it suddenly started to _____ cats and dogs!',
            audioText: 'While I was walking to college, it suddenly started to rain cats and dogs!',
            options: ['rain', 'pour', 'snow', 'wind'],
            correctAnswer: 'rain',
            hint: 'This is the classic British idiom "rain cats and dogs", meaning heavy rainfall.',
            explanation: '"Rain cats and dogs" is a common British idiom meaning it is raining heavily.',
          },
          {
            id: 'a2-u1-l1-e3',
            type: 'multiple-choice',
            instruction: 'Identify the correct irregular past simple form of the verb "buy":',
            prompt: 'Last Saturday, my brother _____ a vintage bicycle at the Oxford market.',
            options: ['bought', 'buyed', 'was buy', 'buying'],
            correctAnswer: 'bought',
            explanation: 'The verb "buy" is irregular in the past: buy -> bought. The form "buyed" does not exist in English grammar.',
          },
          {
            id: 'a2-u1-l1-e4',
            type: 'fill-blank',
            instruction: 'Complete the sentence with the correct negative form in the Past Simple:',
            prompt: 'I _____ (not have) breakfast this morning because I was in a rush.',
            options: ["didn't have", "didn't had", "not had", "wasn't have"],
            correctAnswer: "didn't have",
            explanation: 'To form negatives in the past simple, use the auxiliary "didn\'t" followed by the base form of the verb (have).',
          }
        ]
      },
      {
        id: 'a2-u1-l2',
        unitId: 'a2-unit-1',
        unitTitle: 'Unidad 1',
        title: 'Pronunciation: -ed Endings in Regular Past Verbs',
        description: 'Master the three phonetic sounds of regular -ed verb endings (/t/, /d/, and /ɪd/) for natural articulation.',
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
            explanation: 'When a verb base ends in a voiceless consonant sound such as /k/, /p/, or /s/, the -ed ending is pronounced as /t/.',
          },
          {
            id: 'a2-u1-l2-e2',
            type: 'speaking',
            instruction: 'Listen and pronounce this sentence with the /ɪd/ ending in "decided":',
            prompt: 'We decided to visit London last weekend.',
            audioText: 'We decided to visit London last weekend.',
            correctAnswer: 'We decided to visit London last weekend.',
            hint: 'Verbs ending in a "d" or "t" sound add an extra syllable: "de-ci-ded".',
            explanation: 'An extra syllable /ɪd/ is added only when the base verb ends in a /t/ or /d/ sound (e.g. decided, started, wanted).',
          },
          {
            id: 'a2-u1-l2-e3',
            type: 'sentence-order',
            instruction: 'Arrange the words to form a correct affirmative sentence in the past tense:',
            prompt: 'yesterday / sushi / I / ate / for dinner',
            options: ['I', 'ate', 'sushi', 'for dinner', 'yesterday'],
            correctAnswer: 'I ate sushi for dinner yesterday',
            explanation: 'Standard English word order: Subject (I) + Past verb (ate) + Direct object (sushi) + Time adverbial (yesterday).',
          },
          {
            id: 'a2-u1-l2-e4',
            type: 'speaking',
            instruction: 'Pronounce this past simple sentence clearly with natural British intonation:',
            prompt: 'She lived in Manchester for five years.',
            audioText: 'She lived in Manchester for five years.',
            correctAnswer: 'She lived in Manchester for five years.',
            explanation: 'The ending of "lived" is pronounced with a voiced /d/ sound, without adding an extra syllable.',
          }
        ]
      },
      {
        id: 'a2-u1-l3',
        unitId: 'a2-unit-1',
        unitTitle: 'Unidad 1',
        title: 'Active Grammar: Past Simple vs Past Continuous',
        description: 'Learn how to contrast an ongoing action in progress with a sudden event that interrupted it.',
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
            hint: 'Use "was/were + -ing" for the prolonged action in progress in the past.',
            explanation: 'The Past Continuous (was cooking) is used for the continuous background event when the sudden single action occurred (rang).',
          },
          {
            id: 'a2-u1-l3-e2',
            type: 'fill-blank',
            instruction: 'Complete the sentence with the appropriate time conjunction:',
            prompt: '_____ we were having a cup of tea, it began to snow outside.',
            options: ['While', 'During', 'Because', 'So'],
            correctAnswer: 'While',
            hint: '"While" is followed by a clause containing a subject and a continuous verb form.',
            explanation: '"While" introduces continuous background clauses (e.g. While we were having tea...).',
          },
          {
            id: 'a2-u1-l3-e3',
            type: 'multiple-choice',
            instruction: 'Which of these questions is grammatically correct?',
            prompt: 'Select the option with accurate grammar:',
            options: [
              'What were you doing at eight o\'clock last night?',
              'What was you doing at eight o\'clock last night?',
              'What did you doing at eight o\'clock last night?',
              'What you were doing at eight o\'clock last night?'
            ],
            correctAnswer: 'What were you doing at eight o\'clock last night?',
            explanation: 'With the pronoun "you", the past question form is always "were you doing".',
          },
          {
            id: 'a2-u1-l3-e4',
            type: 'sentence-order',
            instruction: 'Arrange the words to describe two simultaneous actions in the past continuous:',
            prompt: 'reading / was / while / he / was / I / studying',
            options: ['I', 'was', 'studying', 'while', 'he', 'was', 'reading'],
            correctAnswer: 'I was studying while he was reading',
            explanation: 'When two actions were occurring simultaneously in the past, both use the Past Continuous connected by "while".',
          }
        ]
      }
    ],
    exam: {
      id: 'exam-a2-u1',
      level: 'A2',
      title: 'Unit 1 Progress Assessment: Past Tenses & Daily Routines',
      description: 'Progress assessment evaluating regular/irregular past simple, past continuous, and daily routine vocabulary.',
      passingScore: 70,
      exercises: [
        {
          id: 'ex-a2-u1-1',
          type: 'listening',
          instruction: 'Listen to the narration and determine what time the train arrived at the station:',
          prompt: 'I was waiting on platform three in Oxford. The train finally arrived at half past four.',
          audioText: 'I was waiting on platform three in Oxford. The train finally arrived at half past four.',
          options: ['4:30', '4:15', '5:30', '3:45'],
          correctAnswer: '4:30',
          explanation: '"Half past four" in British English corresponds precisely to 4:30.',
        },
        {
          id: 'ex-a2-u1-2',
          type: 'fill-blank',
          instruction: 'Complete the sentence with the correct negative past form:',
          prompt: 'We _____ (not go) to the cinema because we were exhausted.',
          options: ["didn't go", "didn't went", "weren't go", "not went"],
          correctAnswer: "didn't go",
          explanation: 'Negative past simple statements require "didn\'t" plus the bare infinitive of the verb (go).',
        },
        {
          id: 'ex-a2-u1-3',
          type: 'speaking',
          instruction: 'Read the following question aloud with natural British intonation:',
          prompt: 'Where did you spend your summer holidays last year?',
          audioText: 'Where did you spend your summer holidays last year?',
          correctAnswer: 'Where did you spend your summer holidays last year?',
          explanation: 'Open Wh- questions in British English typically carry a falling intonation at the end.',
        },
        {
          id: 'ex-a2-u1-4',
          type: 'sentence-order',
          instruction: 'Arrange the words to assemble the compound past sentence:',
          prompt: 'she / when / was sleeping / the telephone / rang',
          options: ['She', 'was sleeping', 'when', 'the telephone', 'rang'],
          correctAnswer: 'She was sleeping when the telephone rang',
          explanation: 'The background continuous action (was sleeping) is interrupted by the past event (the telephone rang).',
        }
      ]
    }
  },
  {
    id: 'a2-unit-2',
    level: 'A2',
    unitNumber: 2,
    title: 'Travel, Transport & Future Plans',
    topic: 'Be Going to, Will and Navigating British Cities',
    description: 'Learn to ask for directions with British politeness, navigate public transport, and express future intentions and decisions.',
    lessons: [
      {
        id: 'a2-u2-l1',
        unitId: 'a2-unit-2',
        unitTitle: 'Unidad 2',
        title: 'Listening Comprehension: At London Railway Station',
        description: 'Understand station announcements, platform instructions, and standard phrases for purchasing train tickets.',
        durationMinutes: 5,
        type: 'listening',
        exercises: [
          {
            id: 'a2-u2-l1-e1',
            type: 'listening',
            instruction: 'Listen to the tannoy announcement and select the departure platform:',
            prompt: 'The train to Oxford will depart from platform four in ten minutes. Please mind the gap between the train and the platform.',
            audioText: 'The train to Oxford will depart from platform four in ten minutes. Please mind the gap between the train and the platform.',
            options: ['Platform 4', 'Platform 14', 'Platform 2', 'Platform 10'],
            correctAnswer: 'Platform 4',
            explanation: '"Platform four" corresponds to Platform 4. "Mind the gap" is the famous British safety reminder.',
          },
          {
            id: 'a2-u2-l1-e2',
            type: 'multiple-choice',
            instruction: 'How do you ask for a two-way ticket in standard British English?',
            prompt: 'At the ticket counter, you request:',
            options: ['A return ticket to Oxford, please.', 'A round trip ticket, please.', 'A two-way ticket, please.', 'A back ticket, please.'],
            correctAnswer: 'A return ticket to Oxford, please.',
            explanation: 'In the United Kingdom, a two-way ticket is called "a return ticket". In American English, it is called a "round trip".',
          },
          {
            id: 'a2-u2-l1-e3',
            type: 'fill-blank',
            instruction: 'Complete the question to ask for the ticket price:',
            prompt: 'Excuse me, how _____ does a single ticket cost?',
            options: ['much', 'many', 'price', 'fare'],
            correctAnswer: 'much',
            explanation: 'Para preguntar por precios o dinero incontable se utiliza "How much".',
          }
        ]
      },
      {
        id: 'a2-u2-l2',
        unitId: 'a2-unit-2',
        unitTitle: 'Unidad 2',
        title: 'Speaking Fluency: Asking for Directions Politely',
        description: 'Apply standard British polite conventions to ask for directions and orient yourself in any city.',
        durationMinutes: 6,
        type: 'speaking',
        exercises: [
          {
            id: 'a2-u2-l2-e1',
            type: 'speaking',
            instruction: 'Listen and repeat the polite phrase for asking directions:',
            prompt: 'Excuse me, could you tell me the way to the British Museum?',
            audioText: 'Excuse me, could you tell me the way to the British Museum?',
            correctAnswer: 'Excuse me, could you tell me the way to the British Museum?',
            explanation: 'Starting with "Excuse me" and using "Could you..." reflects standard British politeness.',
          },
          {
            id: 'a2-u2-l2-e2',
            type: 'fill-blank',
            instruction: 'Complete the directional phrase:',
            prompt: 'Go straight on, and take the second turning on the _____.',
            options: ['left', 'leave', 'lefting', 'depart'],
            correctAnswer: 'left',
            explanation: '"Take the second turning on the left" significa "gira en la segunda calle a la izquierda".',
          },
          {
            id: 'a2-u2-l2-e3',
            type: 'speaking',
            instruction: 'Pronounce the destination confirmation aloud:',
            prompt: 'It is just around the corner, opposite the post office.',
            audioText: 'It is just around the corner, opposite the post office.',
            correctAnswer: 'It is just around the corner, opposite the post office.',
            explanation: '"Opposite" in British English means directly facing or across from.',
          }
        ]
      },
      {
        id: 'a2-u2-l3',
        unitId: 'a2-unit-2',
        unitTitle: 'Unidad 2',
        title: 'Active Grammar: Prior Plans (Going to) vs Immediate Decisions (Will)',
        description: 'Clearly distinguish when to use "be going to" for structured intentions versus "will" for instant decisions.',
        durationMinutes: 6,
        type: 'grammar',
        exercises: [
          {
            id: 'a2-u2-l3-e1',
            type: 'fill-blank',
            instruction: 'Select the correct form for an intention decided prior to speaking:',
            prompt: 'Next weekend, I _____ (visit) my relatives in Cambridge.',
            options: ['am going to visit', 'will visiting', 'visit will', 'going to visit'],
            correctAnswer: 'am going to visit',
            explanation: 'Para planes e intenciones adoptadas con anterioridad al momento de hablar se utiliza "be going to".',
          },
          {
            id: 'a2-u2-l3-e2',
            type: 'multiple-choice',
            instruction: 'Alguien llama a la puerta y te ofreces a abrir en ese mismo instante:',
            prompt: 'Someone is knocking at the door! — Don\'t worry, _____ it!',
            options: ["I\'ll answer", "I'm going to answer", "I answered", "I answering"],
            correctAnswer: "I\'ll answer",
            explanation: 'For spontaneous decisions and immediate offers made at the moment of speaking, use "will" (I\'ll).',
          },
          {
            id: 'a2-u2-l3-e3',
            type: 'fill-blank',
            instruction: 'Complete the prediction based on immediate visual evidence:',
            prompt: 'Look at those dense dark clouds! It _____ (rain).',
            options: ['is going to rain', 'will raining', 'rains', 'was raining'],
            correctAnswer: 'is going to rain',
            explanation: 'Cuando existe evidencia sensorial clara en el presente (las nubes negras), se utiliza "be going to".',
          }
        ]
      }
    ],
    exam: {
      id: 'exam-a2-u2',
      level: 'A2',
      title: 'Unit 2 Progress Assessment: Travel & Future Forms',
      description: 'Evaluate your ability to navigate public transport, ask for directions, and express future plans.',
      passingScore: 70,
      exercises: [
        {
          id: 'ex-a2-u2-1',
          type: 'sentence-order',
          instruction: 'Arrange the words to ask for the nearest Underground station:',
          prompt: 'is / where / station / nearest / the / tube / ?',
          options: ['Where', 'is', 'the', 'nearest', 'tube', 'station?'],
          correctAnswer: 'Where is the nearest tube station?',
          explanation: '"Tube station" is the standard British term for the London Underground station.',
        },
        {
          id: 'ex-a2-u2-2',
          type: 'speaking',
          instruction: 'Pronuncia con naturalidad tu solicitud en taquilla:',
          prompt: 'Can I have a single ticket to London Victoria, please?',
          audioText: 'Can I have a single ticket to London Victoria, please?',
          correctAnswer: 'Can I have a single ticket to London Victoria, please?',
          explanation: '"Single ticket" in British English means a one-way fare.',
        },
        {
          id: 'ex-a2-u2-3',
          type: 'fill-blank',
          instruction: 'Completa con la forma adecuada para un plan premeditado:',
          prompt: 'We _____ (travel) to Edinburgh on Friday morning.',
          options: ['are going to travel', 'will travelling', 'travelled will', 'going to travel'],
          correctAnswer: 'are going to travel',
          explanation: '"Are going to travel" is used for an intention planned beforehand.',
        }
      ]
    }
  },
  {
    id: 'a2-unit-3',
    level: 'A2',
    unitNumber: 3,
    title: 'Life Experiences & The Present Perfect',
    topic: 'Present Perfect with Ever, Never, Just, Already and Yet',
    description: 'Learn to talk about life experiences, recent achievements, and ongoing situations without specific time stamps.',
    lessons: [
      {
        id: 'a2-u3-l1',
        unitId: 'a2-unit-3',
        unitTitle: 'Unidad 3',
        title: 'Listening Comprehension: Experiences with "Have you ever...?"',
        description: 'Reconoce preguntas sobre vivencias personales y responde con fluidez.',
        durationMinutes: 5,
        type: 'listening',
        exercises: [
          {
            id: 'a2-u3-l1-e1',
            type: 'listening',
            instruction: 'Listen to the tutor question and select the exact sentence you heard:',
            prompt: 'Have you ever tried traditional English fish and chips with malt vinegar?',
            audioText: 'Have you ever tried traditional English fish and chips with malt vinegar?',
            options: [
              'Have you ever tried traditional English fish and chips with malt vinegar?',
              'Will you buy fish and chips tomorrow?',
              'Where did you cook fish last week?',
              'Do you like red wine vinegar?'
            ],
            correctAnswer: 'Have you ever tried traditional English fish and chips with malt vinegar?',
            explanation: '"Have you ever tried...?" is the standard structure to inquire if someone has had an experience in their lifetime.',
          },
          {
            id: 'a2-u3-l1-e2',
            type: 'multiple-choice',
            instruction: 'What is the correct short affirmative answer to "Have you seen Big Ben?"',
            prompt: 'Responde de forma afirmativa y natural:',
            options: ['Yes, I have.', 'Yes, I did.', 'Yes, I seen.', 'Yes, I do.'],
            correctAnswer: 'Yes, I have.',
            explanation: 'In short answers, repeat the auxiliary from the question: "Yes, I have" or "No, I haven\'t".',
          }
        ]
      },
      {
        id: 'a2-u3-l2',
        unitId: 'a2-unit-3',
        unitTitle: 'Unidad 3',
        title: 'Speaking Fluency: Using Never and Just',
        description: 'Construye frases claras sobre experiencias no vividas o concluidas hace unos instantes.',
        durationMinutes: 6,
        type: 'speaking',
        exercises: [
          {
            id: 'a2-u3-l2-e1',
            type: 'speaking',
            instruction: 'Read the following statement aloud with clear pronunciation:',
            prompt: 'I have never travelled outside of my country.',
            audioText: 'I have never travelled outside of my country.',
            correctAnswer: 'I have never travelled outside of my country.',
            explanation: 'El adverbio "never" se ubica entre el auxiliar "have" y el participio pasado "travelled".',
          },
          {
            id: 'a2-u3-l2-e2',
            type: 'speaking',
            instruction: 'Read the sentence describing a newly completed action:',
            prompt: 'I have just finished my daily lesson.',
            audioText: 'I have just finished my daily lesson.',
            correctAnswer: 'I have just finished my daily lesson.',
            explanation: '"Just" indicates that an action was completed moments ago.',
          }
        ]
      },
      {
        id: 'a2-u3-l3',
        unitId: 'a2-unit-3',
        unitTitle: 'Unidad 3',
        title: 'Active Grammar: Present Perfect vs Past Simple',
        description: 'Learn when to use the Present Perfect (unspecified time) versus the Past Simple (finished specific time).',
        durationMinutes: 6,
        type: 'grammar',
        exercises: [
          {
            id: 'a2-u3-l3-e1',
            type: 'fill-blank',
            instruction: 'Select the correct tense when a specific past time reference (yesterday) is stated:',
            prompt: 'I _____ (lose) my keys yesterday afternoon.',
            options: ['lost', 'have lost', 'was losing', 'losed'],
            correctAnswer: 'lost',
            hint: 'When a sentence specifies "yesterday", "in 2020", or "last week", the Past Simple is mandatory.',
            explanation: 'Al precisar el momento exacto (yesterday), la regla exige Pasado Simple (lost), no Presente Perfecto.',
          },
          {
            id: 'a2-u3-l3-e2',
            type: 'sentence-order',
            instruction: 'Ordena la pregunta interrogativa sobre experiencias:',
            prompt: 'you / ever / have / to / been / London / ?',
            options: ['Have', 'you', 'ever', 'been', 'to', 'London?'],
            correctAnswer: 'Have you ever been to London?',
            explanation: 'Estructura interrogativa de experiencia: Have + Sujeto (you) + ever + participio (been to) + lugar.',
          }
        ]
      }
    ],
    exam: {
      id: 'exam-a2-u3',
      level: 'A2',
      title: 'Unit 3 Progress Assessment: Present Perfect & Life Experiences',
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
          explanation: 'Las tres formas del verbo son: see (infinitivo) - saw (pasado) - seen (participio pasado).',
        },
        {
          id: 'ex-a2-u3-2',
          type: 'sentence-order',
          instruction: 'Ordena la frase afirmativa con "already":',
          prompt: 'already / I / seen / have / documentary / that',
          options: ['I', 'have', 'already', 'seen', 'that', 'documentary'],
          correctAnswer: 'I have already seen that documentary',
          explanation: '"Already" se coloca normalmente entre el auxiliar "have" y el participio "seen".',
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
        title: 'Regular & Irregular Comparatives and Superlatives',
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
            explanation: 'El adjetivo "good" es irregular: good -> better -> the best.',
          },
          {
            id: 'a2-u4-l1-e2',
            type: 'fill-blank',
            instruction: 'Completa con el superlativo de "busy":',
            prompt: 'Oxford Circus is one of the _____ (busy) tube stations in London.',
            options: ['busiest', 'most busy', 'busier', 'more busy'],
            correctAnswer: 'busiest',
            explanation: 'For two-syllable adjectives ending in "y", change "y" to "i" and add "-est": busy -> busiest.',
          }
        ]
      },
      {
        id: 'a2-u4-l2',
        unitId: 'a2-unit-4',
        unitTitle: 'Unidad 4',
        title: 'Speaking Fluency: Giving Practical Advice with Should',
        description: 'Offer polite British suggestions and advice using the modal auxiliary verb should.',
        durationMinutes: 5,
        type: 'speaking',
        exercises: [
          {
            id: 'a2-u4-l2-e1',
            type: 'speaking',
            instruction: 'Listen and pronounce this classic British piece of advice:',
            prompt: 'You should always carry an umbrella when visiting England.',
            audioText: 'You should always carry an umbrella when visiting England.',
            correctAnswer: 'You should always carry an umbrella when visiting England.',
            hint: 'Recuerda que la letra L en "should" es completamente muda: se pronuncia /ʃʊd/.',
            explanation: 'En los modales "should", "could" y "would", la consonante L no se pronuncia.',
          },
          {
            id: 'a2-u4-l2-e2',
            type: 'multiple-choice',
            instruction: 'Your colleague mentions feeling exhausted. What is the grammatically accurate advice?',
            prompt: 'Consejo con modal:',
            options: ['You should take a rest.', 'You should to take a rest.', 'You must to take a rest.', 'You should taking a rest.'],
            correctAnswer: 'You should take a rest.',
            explanation: 'Los verbos modales se construyen con infinitivo simple sin "to": You should take a rest.',
          }
        ]
      }
    ],
    exam: {
      id: 'exam-a2-u4',
      level: 'A2',
      title: 'Unit 4 Progress Assessment: Comparatives & Modals',
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
          explanation: 'For adjectives of three or more syllables, place "more" before the adjective: more expensive than.',
        },
        {
          id: 'ex-a2-u4-2',
          type: 'sentence-order',
          instruction: 'Ordena la sugerencia:',
          prompt: 'try / should / traditional / you / scones / the',
          options: ['You', 'should', 'try', 'the', 'traditional', 'scones'],
          correctAnswer: 'You should try the traditional scones',
          explanation: 'Estructura: Sujeto (You) + modal (should) + verbo base (try) + complemento.',
        }
      ]
    }
  }
]

export const FINAL_A2_EXAM: Exam = {
  id: 'final-exam-a2',
  level: 'A2',
  title: 'Comprehensive A2 Elementary Certification Assessment',
  description: 'Comprehensive evaluation certifying foundational A2 competencies across listening, speaking, past tenses, and functional British communication.',
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
      explanation: 'The tutor describes how an afternoon at an Oxford riverside teahouse captured his admiration.',
    },
    {
      id: 'final-a2-2',
      type: 'fill-blank',
      instruction: 'Complete the sentence with the past simple and past continuous combination:',
      prompt: 'While they _____ (walk) in Hyde Park, they _____ (see) a royal carriage.',
      options: ['were walking / saw', 'walked / were seeing', 'are walking / saw', 'was walking / seen'],
      correctAnswer: 'were walking / saw',
      explanation: 'Ongoing background action in Past Continuous (were walking) with a single past event (saw).',
    },
    {
      id: 'final-a2-3',
      type: 'speaking',
      instruction: 'Read this sentence aloud with clear British rhythm and pronunciation:',
      prompt: 'I have lived in this city since two thousand and twenty.',
      audioText: 'I have lived in this city since two thousand and twenty.',
      correctAnswer: 'I have lived in this city since two thousand and twenty.',
      explanation: 'Use "since" with specific starting points in time (e.g. since 2020).',
    },
    {
      id: 'final-a2-4',
      type: 'sentence-order',
      instruction: 'Ordena la pregunta para solicitar un favor con formalidad:',
      prompt: 'mind / would / closing / the window / you / please / ?',
      options: ['Would', 'you', 'mind', 'closing', 'the window,', 'please?'],
      correctAnswer: 'Would you mind closing the window, please?',
      explanation: '"Would you mind + verb-ing" is one of the most polite and natural request structures in British English.',
    },
    {
      id: 'final-a2-5',
      type: 'multiple-choice',
      instruction: 'Select the correct sentence to state that you have never visited a country:',
      prompt: 'I _____ to Japan, but I would love to go one day.',
      options: ["have never been", "never have went", "haven\'t never been", "was never being"],
      correctAnswer: 'have never been',
      explanation: 'Se utiliza "have never been to" para expresar la ausencia de visitas a un lugar.',
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
    title: 'Conditionals & Hypothetical Decisions',
    topic: 'First and Second Conditionals (If Clauses)',
    description: 'Master first and second conditional structures to express probable future outcomes and hypothetical present situations.',
    lessons: [
      {
        id: 'b1-u1-l1',
        unitId: 'b1-unit-1',
        unitTitle: 'Unidad 1',
        title: 'Primer Condicional: Causa y Efecto en el Futuro',
        description: 'Master the "If + Present Simple, will + base form" structure to predict real and likely future outcomes.',
        durationMinutes: 6,
        type: 'grammar',
        exercises: [
          {
            id: 'b1-u1-l1-e1',
            type: 'fill-blank',
            instruction: 'Complete the first conditional sentence:',
            prompt: 'If it _____ (rain) this afternoon, we _____ (stay) in the library.',
            options: ['rains / will stay', 'will rain / stay', 'rained / would stay', 'rains / stayed'],
            correctAnswer: 'rains / will stay',
            explanation: 'Primer condicional: If + Presente Simple (rains), Will + Infinitivo (will stay).',
          },
          {
            id: 'b1-u1-l1-e2',
            type: 'speaking',
            instruction: 'Read this everyday caution aloud with natural intonation:',
            prompt: 'If you hurry up, you will catch the train on time.',
            audioText: 'If you hurry up, you will catch the train on time.',
            correctAnswer: 'If you hurry up, you will catch the train on time.',
            explanation: 'Place nuclear stress on key content words: "hurry up" and "catch the train".',
          },
          {
            id: 'b1-u1-l1-e3',
            type: 'multiple-choice',
            instruction: 'Identify the connective synonymous with "if not":',
            prompt: '_____ you study consistently, you will not pass the examination.',
            options: ['Unless', 'Provided', 'As long as', 'In case'],
            correctAnswer: 'Unless',
            explanation: '"Unless" is semantically equivalent to "if you do not" (Unless you study = If you do not study).',
          }
        ]
      },
      {
        id: 'b1-u1-l2',
        unitId: 'b1-unit-1',
        unitTitle: 'Unidad 1',
        title: 'Second Conditional: Imaginary Hypotheses & Advice',
        description: 'Aprende a dar consejos y reflexionar sobre escenarios poco probables con "would".',
        durationMinutes: 6,
        type: 'speaking',
        exercises: [
          {
            id: 'b1-u1-l2-e1',
            type: 'sentence-order',
            instruction: 'Assemble the classic formula for giving advice:',
            prompt: 'were / I / if / you / , / would / accept / I / the position',
            options: ['If', 'I', 'were', 'you,', 'I', 'would', 'accept', 'the position'],
            correctAnswer: 'If I were you, I would accept the position',
            explanation: '"If I were you" is the standard British formula for offering advice.',
          },
          {
            id: 'b1-u1-l2-e2',
            type: 'fill-blank',
            instruction: 'Complete the unreal present hypothesis:',
            prompt: 'If I _____ (have) more free time, I _____ (travel) all around Scotland.',
            options: ['had / would travel', 'have / will travel', 'had / will travel', 'would have / travelled'],
            correctAnswer: 'had / would travel',
            explanation: 'Segundo condicional: If + Pasado Simple (had), Would + Infinitivo (would travel).',
          }
        ]
      }
    ],
    exam: {
      id: 'exam-b1-u1',
      level: 'B1',
      title: 'Unit 1 Progress Assessment: Conditionals (B1)',
      description: 'Assess your grammatical accuracy when using real and hypothetical conditional sentences.',
      passingScore: 70,
      exercises: [
        {
          id: 'ex-b1-1',
          type: 'fill-blank',
          instruction: 'Select the correct option in this hypothetical question:',
          prompt: 'What _____ you do if you _____ a million pounds?',
          options: ['would / won', 'will / win', 'would / win', 'did / would win'],
          correctAnswer: 'would / won',
          explanation: 'Estructura interrogativa en segundo condicional: What would you do if you won...?',
        },
        {
          id: 'ex-b1-2',
          type: 'sentence-order',
          instruction: 'Ordena la frase condicional:',
          prompt: 'we / if / umbrella / take / an / rains / it / will',
          options: ['If', 'it', 'rains,', 'we', 'will', 'take', 'an', 'umbrella'],
          correctAnswer: 'If it rains, we will take an umbrella',
          explanation: 'First conditional sentence with an initial condition clause separated by a comma.',
        }
      ]
    }
  },
  {
    id: 'b1-unit-2',
    level: 'B1',
    unitNumber: 2,
    title: 'Passive Voice & Reported Speech',
    topic: 'Passive Voice (Present and Past) and Reported Speech',
    description: 'Learn to describe historical events, scientific discoveries, and report what others have stated.',
    lessons: [
      {
        id: 'b1-u2-l1',
        unitId: 'b1-unit-2',
        unitTitle: 'Unidad 2',
        title: 'Passive Voice: Focusing on Action and Object',
        description: 'Construye frases pasivas con "be + participio" cuando el autor es desconocido o irrelevante.',
        durationMinutes: 6,
        type: 'grammar',
        exercises: [
          {
            id: 'b1-u2-l1-e1',
            type: 'fill-blank',
            instruction: 'Transform this active past sentence into the passive voice:',
            prompt: 'The historic Bodleian Library _____ (build) in the seventeenth century.',
            options: ['was built', 'is built', 'built', 'were built'],
            correctAnswer: 'was built',
            explanation: 'Voz pasiva en pasado simple singular: was + participio pasado (built).',
          },
          {
            id: 'b1-u2-l1-e2',
            type: 'listening',
            instruction: 'Listen to the Oxford historical report and identify which scientific milestone took place:',
            prompt: 'Penicillin was successfully tested in Oxford by Howard Florey and Ernst Chain in nineteen forty.',
            audioText: 'Penicillin was successfully tested in Oxford by Howard Florey and Ernst Chain in nineteen forty.',
            options: ['Penicillin', 'The printing press', 'The steam engine', 'The telephone'],
            correctAnswer: 'Penicillin',
            explanation: 'El audio menciona que "Penicillin was successfully tested in Oxford".',
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
            explanation: 'En estilo indirecto, el presente continuo retrocede a pasado continuo: am moving -> was moving.',
          },
          {
            id: 'b1-u2-l2-e2',
            type: 'speaking',
            instruction: 'Pronuncia con seguridad la cita indirecta:',
            prompt: 'He told me that he had already sent the email.',
            audioText: 'He told me that he had already sent the email.',
            correctAnswer: 'He told me that he had already sent the email.',
            explanation: 'El Past Simple o Present Perfect retrocede a Past Perfect (had sent) en Reported Speech.',
          }
        ]
      }
    ],
    exam: {
      id: 'exam-b1-u2',
      level: 'B1',
      title: 'Unit 2 Progress Assessment: Passive Voice & Reported Speech (B1)',
      description: 'Verify your proficiency with passive structures and reported speech backshifts.',
      passingScore: 70,
      exercises: [
        {
          id: 'ex-b1-u2-1',
          type: 'fill-blank',
          instruction: 'Completa en voz pasiva en presente simple:',
          prompt: 'Millions of cups of tea _____ (consume) across the United Kingdom daily.',
          options: ['are consumed', 'is consumed', 'was consumed', 'consume'],
          correctAnswer: 'are consumed',
          explanation: 'Sujeto en plural ("cups of tea") requiere la forma "are + consumed".',
        }
      ]
    }
  },
  {
    id: 'b1-unit-3',
    level: 'B1',
    unitNumber: 3,
    title: 'Unit 3: Food for Thought & Narrative Interruption',
    topic: 'Past Continuous vs Past Simple (When/While), Indefinite Pronouns and Giving Reasons',
    description: 'Master background actions vs sudden interruptions, using some-/any-/no-/every- without double negatives, and articulating reasons naturally.',
    lessons: [
      {
        id: 'b1-u3-l1',
        unitId: 'b1-unit-3',
        unitTitle: 'Unit 3',
        title: 'Listening & Speaking: Kitchen Disasters & Narrative Interruption',
        description: 'Contrast a long continuous action in the past with a sudden interrupting event using while and when.',
        durationMinutes: 6,
        type: 'listening',
        exercises: [
          {
            id: 'b1-u3-l1-e1',
            type: 'listening',
            instruction: 'Listen to Emma\'s cooking mishap and identify what triggered the smoke alarm:',
            prompt: 'While I was preparing a Sunday roast in the kitchen, the smoke alarm suddenly went off because I had left the oven door open!',
            audioText: 'While I was preparing a Sunday roast in the kitchen, the smoke alarm suddenly went off because I had left the oven door open!',
            options: ['She had left the oven door open', 'She burned the pasta on the hob', 'Her neighbor rang the bell', 'The toaster malfunctioned'],
            correctAnswer: 'She had left the oven door open',
            hint: 'Listen for the reason starting with "because I had...".',
            explanation: 'Emma says: "the smoke alarm suddenly went off because I had left the oven door open!"',
          },
          {
            id: 'b1-u3-l1-e2',
            type: 'fill-blank',
            instruction: 'Complete with Past Continuous (long action) and Past Simple (short interruption):',
            prompt: 'I _____ (chop) vegetables when I accidentally _____ (cut) my finger.',
            options: ['was chopping / cut', 'chopped / was cutting', 'were chopping / cutted', 'was chop / cut'],
            correctAnswer: 'was chopping / cut',
            hint: 'Use "was/were + -ing" for the ongoing activity and the past irregular for the sudden cut.',
            explanation: 'Past Continuous (was chopping) represents the background activity; Past Simple (cut) is the sharp interruption.',
          },
          {
            id: 'b1-u3-l1-e3',
            type: 'sentence-order',
            instruction: 'Arrange the sentence to express simultaneous narrative actions with "while":',
            prompt: 'the / While / dinner / rang / was / she / cooking / doorbell',
            options: ['While', 'she', 'was', 'cooking', 'dinner', 'the', 'doorbell', 'rang'],
            correctAnswer: 'While she was cooking dinner the doorbell rang',
            explanation: '"While" introduces the continuous clause (While she was cooking dinner), followed by the past simple event (the doorbell rang).',
          },
          {
            id: 'b1-u3-l1-e4',
            type: 'speaking',
            instruction: 'Pronounce the sentence with natural British connected speech:',
            prompt: 'While I was waiting for the kettle to boil, my mobile phone rang.',
            audioText: 'While I was waiting for the kettle to boil, my mobile phone rang.',
            correctAnswer: 'While I was waiting for the kettle to boil, my mobile phone rang.',
            explanation: 'Ensure smooth linking between "waiting for" and "kettle to boil".',
          }
        ]
      },
      {
        id: 'b1-u3-l2',
        unitId: 'b1-unit-3',
        unitTitle: 'Unit 3',
        title: 'Active Grammar: Indefinite Pronouns (Some, Any, No, Every)',
        description: 'Understand how to use somebody, anything, nowhere and avoid the Spanish double-negative trap.',
        durationMinutes: 6,
        type: 'grammar',
        exercises: [
          {
            id: 'b1-u3-l2-e1',
            type: 'multiple-choice',
            instruction: 'Which sentence correctly avoids a double negative in English?',
            prompt: 'Choose the grammatically accurate sentence:',
            options: [
              'Nobody makes better desserts than my grandmother.',
              'Nobody doesn\'t make better desserts than my grandmother.',
              'Nobody makes no desserts here.',
              'There isn\'t nobody in the dining room.'
            ],
            correctAnswer: 'Nobody makes better desserts than my grandmother.',
            hint: 'In English, words starting with "no-" (nobody, nothing) already make the clause negative.',
            explanation: 'In English, two negatives make an affirmative. "Nobody makes..." is correct. Never say "Nobody doesn\'t make".',
          },
          {
            id: 'b1-u3-l2-e2',
            type: 'fill-blank',
            instruction: 'Complete the sentence using the correct indefinite pronouns:',
            prompt: 'I have searched _____ (everywhere), but I cannot find my wallet _____ (anywhere)!',
            options: ['everywhere / anywhere', 'somewhere / nowhere', 'everywhere / nowhere', 'anywhere / everywhere'],
            correctAnswer: 'everywhere / anywhere',
            explanation: 'With a negative verb ("cannot find"), we use "anywhere", not "nowhere".',
          },
          {
            id: 'b1-u3-l2-e3',
            type: 'fill-blank',
            instruction: 'Complete the polite offer in a restaurant:',
            prompt: 'Would you like _____ (something/anything) to drink with your meal?',
            options: ['something', 'anything', 'nothing', 'everything'],
            correctAnswer: 'something',
            explanation: 'In polite offers where a "yes" is expected, English uses "something" rather than "anything".',
          },
          {
            id: 'b1-u3-l2-e4',
            type: 'sentence-order',
            instruction: 'Arrange the words to form a correct negative pronoun statement:',
            prompt: 'in / restaurant / speaks / Spanish / Nobody / this',
            options: ['Nobody', 'in', 'this', 'restaurant', 'speaks', 'Spanish'],
            correctAnswer: 'Nobody in this restaurant speaks Spanish',
            explanation: 'Subject (Nobody in this restaurant) + Verb (speaks with 3rd-person -s) + Object (Spanish).',
          }
        ]
      },
      {
        id: 'b1-u3-l3',
        unitId: 'b1-unit-3',
        unitTitle: 'Unit 3',
        title: 'Communication Skills: Giving Reasons & Sequencing Recipes',
        description: 'Move beyond "because" with native phrases like "The thing is..." and master recipe connectors.',
        durationMinutes: 6,
        type: 'speaking',
        exercises: [
          {
            id: 'b1-u3-l3-e1',
            type: 'multiple-choice',
            instruction: 'Which phrase introduces a conversational reason with natural British tact?',
            prompt: 'I\'d love to come for dinner. _____, I have to submit my dissertation tonight.',
            options: ['The thing is', 'The reason are', 'Because that', 'Is because'],
            correctAnswer: 'The thing is',
            explanation: '"The thing is, ..." is the premier British conversational phrase to introduce an explanation or obstacle.',
          },
          {
            id: 'b1-u3-l3-e2',
            type: 'sentence-order',
            instruction: 'Arrange the sentence to express an explanation smoothly:',
            prompt: 'is / The / of / that / ran / we / flour / reason / out',
            options: ['The', 'reason', 'is', 'that', 'we', 'ran', 'out', 'of', 'flour'],
            correctAnswer: 'The reason is that we ran out of flour',
            explanation: '"The reason is that..." is followed by a complete subject-verb clause.',
          },
          {
            id: 'b1-u3-l3-e3',
            type: 'fill-blank',
            instruction: 'Complete the recipe instructions with the appropriate sequence linkers:',
            prompt: '_____, preheat the oven. Next, mix the ingredients. _____, bake for 30 minutes.',
            options: ['First / Finally', 'At start / In the end', 'Firstly / For finish', 'To begin / Lastly that'],
            correctAnswer: 'First / Finally',
            explanation: 'Standard sequencing linkers in recipes: First -> Next -> After that -> Finally.',
          },
          {
            id: 'b1-u3-l3-e4',
            type: 'speaking',
            instruction: 'Read aloud explaining a dining preference with natural cadence:',
            prompt: 'The reason I enjoy cooking is that it allows me to unwind after work.',
            audioText: 'The reason I enjoy cooking is that it allows me to unwind after work.',
            correctAnswer: 'The reason I enjoy cooking is that it allows me to unwind after work.',
            explanation: 'Notice the natural pause right after "The reason I enjoy cooking...".',
          }
        ]
      }
    ],
    exam: {
      id: 'exam-b1-unit-3',
      unitId: 'b1-unit-3',
      level: 'B1',
      title: 'Unit 3 Progress Assessment: Food for Thought & Narrative Past',
      description: 'Test your mastery of past continuous vs past simple, indefinite pronouns, and giving reasons.',
      passingScore: 70,
      exercises: [
        {
          id: 'exam-b1-u3-e1',
          type: 'fill-blank',
          instruction: 'Complete with the correct narrative combination:',
          prompt: 'While we _____ (have) dinner, the electricity suddenly _____ (go) out.',
          options: ['were having / went', 'had / was going', 'was having / went', 'had / had gone'],
          correctAnswer: 'were having / went',
          explanation: 'Ongoing action (were having) interrupted by punctual event (went out).',
        },
        {
          id: 'exam-b1-u3-e2',
          type: 'multiple-choice',
          instruction: 'Select the correct indefinite pronoun:',
          prompt: 'Is there _____ vegetarian on the lunch menu today?',
          options: ['anything', 'nothing', 'something', 'everything'],
          correctAnswer: 'anything',
          explanation: 'In general questions, "anything" is the standard indefinite pronoun.',
        },
        {
          id: 'exam-b1-u3-e3',
          type: 'sentence-order',
          instruction: 'Arrange the sentence explaining a delay:',
          prompt: 'The / that / missed / bus / is / I / the / reason',
          options: ['The', 'reason', 'is', 'that', 'I', 'missed', 'the', 'bus'],
          correctAnswer: 'The reason is that I missed the bus',
          explanation: '"The reason is that I missed the bus."',
        }
      ]
    }
  },
  {
    id: 'b1-unit-4',
    level: 'B1',
    unitNumber: 4,
    title: 'Unit 4: Cinema, Reviews & The Past of the Past',
    topic: 'Past Simple vs Past Perfect (Timeline of Events), Articles and Film Review Writing',
    description: 'Master sequence of past tenses (had + past participle), zero article vs the for subjects, meals, and mountain ranges, and write structured reviews.',
    lessons: [
      {
        id: 'b1-u4-l1',
        unitId: 'b1-unit-4',
        unitTitle: 'Unit 4',
        title: 'Mastering Narrative Time: Past Simple vs Past Perfect',
        description: 'Understand the timeline: Past Perfect (had + participle) for the earlier action, and Past Simple for the main narrative.',
        durationMinutes: 6,
        type: 'grammar',
        exercises: [
          {
            id: 'b1-u4-l1-e1',
            type: 'fill-blank',
            instruction: 'Complete the sentence with the past action that happened earlier in time:',
            prompt: 'When I arrived at the cinema, the film _____ (already / start).',
            options: ['had already started', 'already started', 'has already started', 'was already start'],
            correctAnswer: 'had already started',
            hint: 'The film started BEFORE the arrival at the cinema. Use had + past participle.',
            explanation: 'The Past Perfect (had already started) is required because the movie began prior to the main narrative past event (arrived).',
          },
          {
            id: 'b1-u4-l1-e2',
            type: 'fill-blank',
            instruction: 'Complete the cause that took place before the consequence:',
            prompt: 'Akmal was late to the theatre because he _____ (leave) his laptop at the office.',
            options: ['had left', 'leaved', 'has left', 'was left'],
            correctAnswer: 'had left',
            hint: 'He left his laptop before he became late. Note that "leave" is irregular (left).',
            explanation: 'Leaving the laptop occurred prior to being late. "Leave -> left -> left". "Leaved" does not exist.',
          },
          {
            id: 'b1-u4-l1-e3',
            type: 'multiple-choice',
            instruction: 'Which sentence accurately contrasts an earlier experience with a past desire?',
            prompt: 'Select the grammatically accurate sentence:',
            options: [
              'He had already seen the film twice before, but he wanted to watch it again.',
              'He already saw the film twice before, but he was wanting to watch it again.',
              'He has already seen the film twice before, but he got to watch it again.',
              'He had already saw the film twice before, but he wants to watch it again.'
            ],
            correctAnswer: 'He had already seen the film twice before, but he wanted to watch it again.',
            explanation: '"Twice before" triggers Past Perfect (had already seen); "wanted" is the past simple state.',
          },
          {
            id: 'b1-u4-l1-e4',
            type: 'sentence-order',
            instruction: 'Arrange the words to describe an unprecedented past experience:',
            prompt: 'seen / had / film / They / never / impressive / an / such / before',
            options: ['They', 'had', 'never', 'seen', 'such', 'an', 'impressive', 'film', 'before'],
            correctAnswer: 'They had never seen such an impressive film before',
            explanation: 'Structure: Subject (They) + had + never + participle (seen) + such an impressive film before.',
          }
        ]
      },
      {
        id: 'b1-u4-l2',
        unitId: 'b1-unit-4',
        unitTitle: 'Unit 4',
        title: 'Articles Masterclass: Academic Subjects, Meals and Mountain Ranges',
        description: 'Master the three golden rules: Zero article for subjects and meals, The for plural mountain ranges and unique objects.',
        durationMinutes: 6,
        type: 'grammar',
        exercises: [
          {
            id: 'b1-u4-l2-e1',
            type: 'fill-blank',
            instruction: 'Choose the correct articles for an academic subject and a meal of the day:',
            prompt: 'I want to study _____ physics at university, and then have _____ lunch with Emma.',
            options: ['- / -', 'a / a', 'the / the', 'a / -'],
            correctAnswer: '- / -',
            hint: 'Academic subjects (physics, maths) and meals (breakfast, lunch, dinner) take zero article.',
            explanation: 'In English, academic disciplines and meals of the day are used without any article (zero article).',
          },
          {
            id: 'b1-u4-l2-e2',
            type: 'fill-blank',
            instruction: 'Choose the correct articles for a mountain range and a unique celestial body:',
            prompt: 'If you go climbing in _____ Himalayas, look at _____ moon tonight.',
            options: ['the / the', '- / the', 'the / -', 'a / the'],
            correctAnswer: 'the / the',
            hint: 'Plural mountain ranges (the Himalayas, the Andes, the Alps) and unique things (the moon) both require "the".',
            explanation: 'Chains of mountains in the plural always require "the" (the Himalayas), as do unique celestial bodies (the moon).',
          },
          {
            id: 'b1-u4-l2-e3',
            type: 'multiple-choice',
            instruction: 'Which sentence uses articles with 100% precision?',
            prompt: 'Choose the correct sentence:',
            options: [
              'What time do you usually have dinner?',
              'What time do you usually have a dinner?',
              'What time do you usually have the dinner?',
              'What time do you usually have some dinner?'
            ],
            correctAnswer: 'What time do you usually have dinner?',
            explanation: 'Meals of the day take zero article: "have dinner", "have lunch", "have breakfast".',
          },
          {
            id: 'b1-u4-l2-e4',
            type: 'speaking',
            instruction: 'Pronounce the sentence clearly without adding unnecessary articles:',
            prompt: 'We studied history together before having dinner in town.',
            audioText: 'We studied history together before having dinner in town.',
            correctAnswer: 'We studied history together before having dinner in town.',
            explanation: 'Notice: "- history" and "- dinner" without "a" or "the".',
          }
        ]
      },
      {
        id: 'b1-u4-l3',
        unitId: 'b1-unit-4',
        unitTitle: 'Unit 4',
        title: 'Writing Masterclass: Film Reviews (Adjectives, Nouns & Natural Syntax)',
        description: 'Learn the master template for reviewing films: adjective before noun (interesting plot, good CGI) and natural review vocabulary.',
        durationMinutes: 6,
        type: 'mixed',
        exercises: [
          {
            id: 'b1-u4-l3-e1',
            type: 'sentence-order',
            instruction: 'Arrange the sentence placing the adjective before the noun (plot):',
            prompt: 'have / The / doesn\'t / plot / film / an / interesting',
            options: ['The', 'film', 'doesn\'t', 'have', 'an', 'interesting', 'plot'],
            correctAnswer: 'The film doesn\'t have an interesting plot',
            hint: 'Adjectives come before the noun: "an interesting plot", not "plot interesting".',
            explanation: 'In English, adjectives precede the noun they modify: "an interesting plot". Also, "the film" is 3rd person singular, so we use "doesn\'t have".',
          },
          {
            id: 'b1-u4-l3-e2',
            type: 'multiple-choice',
            instruction: 'Select the correct translation and preposition for streaming platforms:',
            prompt: 'How do you say "Vi recientemente una película llamada Mortal Engines en Netflix"?',
            options: [
              'I recently saw a film called Mortal Engines on Netflix.',
              'I recently view film is Mortal Engines in Netflix.',
              'I have seen a film named Mortal Engines at Netflix.',
              'I recently was seeing a film called Mortal Engines inside Netflix.'
            ],
            correctAnswer: 'I recently saw a film called Mortal Engines on Netflix.',
            hint: 'For screens and digital streaming platforms, always use "on" (on Netflix, on TV, on YouTube).',
            explanation: 'Natural formula: "I recently saw a film called [Title] on [Platform]".',
          },
          {
            id: 'b1-u4-l3-e3',
            type: 'fill-blank',
            instruction: 'Complete with correct singular/plural agreement and natural vocabulary:',
            prompt: 'The film _____ (have/has) a female protagonist and the visual effects _____ (is/are) impressive.',
            options: ['has / are', 'have / is', 'has / is', 'have / are'],
            correctAnswer: 'has / are',
            explanation: '"The film" is singular (it has); "the visual effects" is plural (they are).',
          },
          {
            id: 'b1-u4-l3-e4',
            type: 'speaking',
            instruction: 'Pronounce the review sentence with confident intonation:',
            prompt: 'Although the CGI is impressive, the movie doesn\'t have an interesting plot.',
            audioText: 'Although the CGI is impressive, the movie doesn\'t have an interesting plot.',
            correctAnswer: 'Although the CGI is impressive, the movie doesn\'t have an interesting plot.',
            explanation: 'Notice the contrast conjunction "Although" followed by the comma pause.',
          }
        ]
      }
    ],
    exam: {
      id: 'exam-b1-unit-4',
      unitId: 'b1-unit-4',
      level: 'B1',
      title: 'Unit 4 Progress Assessment: Cinema, Reviews & Narrative Past',
      description: 'Test your mastery of past perfect vs past simple, article rules, and film review syntax.',
      passingScore: 70,
      exercises: [
        {
          id: 'exam-b1-u4-e1',
          type: 'fill-blank',
          instruction: 'Complete with Past Perfect for the action that happened earlier:',
          prompt: 'By the time the director arrived, the actors _____ (already / rehearse) the scene twice.',
          options: ['had already rehearsed', 'already rehearsed', 'have already rehearsed', 'were already rehearse'],
          correctAnswer: 'had already rehearsed',
          explanation: 'Rehearsing happened before the director arrived: Past Perfect (had already rehearsed).',
        },
        {
          id: 'exam-b1-u4-e2',
          type: 'multiple-choice',
          instruction: 'Which sentence uses articles correctly?',
          prompt: 'Select the accurate sentence:',
          options: [
            'We climbed in the Andes after studying physics at university.',
            'We climbed in Andes after studying a physics at university.',
            'We climbed in the Andes after studying the physics at the university.',
            'We climbed in a Andes after studying physics at university.'
          ],
          correctAnswer: 'We climbed in the Andes after studying physics at university.',
          explanation: '"The Andes" (plural mountain range) and "- physics" (academic subject with zero article).',
        },
        {
          id: 'exam-b1-u4-e3',
          type: 'sentence-order',
          instruction: 'Arrange the sentence to express an authentic review opinion:',
          prompt: 'film / The / impressive / has / CGI / and / acting / good',
          options: ['The', 'film', 'has', 'impressive', 'CGI', 'and', 'good', 'acting'],
          correctAnswer: 'The film has impressive CGI and good acting',
          explanation: 'Adjectives before nouns: "impressive CGI" and "good acting".',
        }
      ]
    }
  }

];

export const FINAL_B1_EXAM: Exam = {
  id: 'final-exam-b1',
  level: 'B1',
  title: 'Comprehensive B1 Intermediate Certification Assessment',
  description: 'Official CEFR B1 Intermediate assessment validating conditionals, passive voice, reported speech, and fluent discussion.',
  passingScore: 75,
  exercises: [
    {
      id: 'final-b1-1',
      type: 'listening',
      instruction: 'Listen to the tutor analysis and select his core argument:',
      prompt: 'If more commuters travelled by public transit rather than driving personal vehicles, urban traffic congestion would be remarkably reduced, and air quality in London would improve substantially.',
      audioText: 'If more commuters travelled by public transit rather than driving personal vehicles, urban traffic congestion would be remarkably reduced, and air quality in London would improve substantially.',
      options: [
        'Traveling by public transport significantly reduces congestion and cleans urban air.',
        'Private cars are indispensable to the urban economy.',
        'Public transport should close during weekends.',
        'London residents reject using commuter trains.'
      ],
      correctAnswer: 'Traveling by public transport significantly reduces congestion and cleans urban air.',
      explanation: 'The tutor argues that expanded rail transit lowers congestion and improves air quality.',
    },
    {
      id: 'final-b1-2',
      type: 'fill-blank',
      instruction: 'Complete the reported speech transformation:',
      prompt: '"I have finished the report," Mark said. -> Mark said that he _____ the report.',
      options: ['had finished', 'has finished', 'finished', 'finishes'],
      correctAnswer: 'had finished',
      explanation: 'El Present Perfect (have finished) cambia a Past Perfect (had finished) al reportar en pasado.',
    },
    {
      id: 'final-b1-3',
      type: 'speaking',
      instruction: 'Speak your response aloud with articulate pronunciation:',
      prompt: 'If I were to recommend one book on this subject, it would certainly be this one.',
      audioText: 'If I were to recommend one book on this subject, it would certainly be this one.',
      correctAnswer: 'If I were to recommend one book on this subject, it would certainly be this one.',
      explanation: '"If I were to..." is an elegant conditional construction valued in formal British registers.',
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
    title: 'Third Conditional & Mixed Conditionals',
    topic: 'Third Conditional (Regrets) and Mixed Conditionals',
    description: 'Learn to articulate past regrets, hypothetical past outcomes, and past causes with present results.',
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
            explanation: 'Tercer condicional: If + Past Perfect (had left), would have + participio.',
          },
          {
            id: 'b2-u1-l1-e2',
            type: 'speaking',
            instruction: 'Pronounce with natural British contractions ("would\'ve"):',
            prompt: 'I would have phoned you if I had known you were staying in Oxford.',
            audioText: 'I would have phoned you if I had known you were staying in Oxford.',
            correctAnswer: 'I would have phoned you if I had known you were staying in Oxford.',
            explanation: 'In fluent spoken British English, "would have" naturally weakens to /wʊdəv/.',
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
            explanation: 'Mixed conditional: past unreal condition (had accepted) with a present result (would be living). ',
          }
        ]
      }
    ],
    exam: {
      id: 'exam-b2-u1',
      level: 'B2',
      title: 'Unit 1 Progress Assessment: Conditionals (B2)',
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
          explanation: 'Hypothetical past outcome: wouldn\'t have made.',
        }
      ]
    }
  },
  {
    id: 'b2-unit-2',
    level: 'B2',
    unitNumber: 2,
    title: 'Modals of Deduction & Past Speculation',
    topic: 'Must have, Can\'t have, Could have and Should have',
    description: 'Speculate about past events while modulating your degree of certainty and logical deductions.',
    lessons: [
      {
        id: 'b2-u2-l1',
        unitId: 'b2-unit-2',
        unitTitle: 'Unidad 2',
        title: 'Logical Certainty & Past Impossibility',
        description: 'Distinguish when to use "must have been" for positive deduction and "can\'t have been" for logical impossibility.',
        durationMinutes: 6,
        type: 'grammar',
        exercises: [
          {
            id: 'b2-u2-l1-e1',
            type: 'fill-blank',
            instruction: 'Select the modal of logical deduction based on visible evidence:',
            prompt: 'The pavement is completely soaked with puddles. It _____ (rain) heavily during the night.',
            options: ['must have rained', 'can\'t have rained', 'should have rained', 'might rain'],
            correctAnswer: 'must have rained',
            explanation: '"Must have rained" indicates a logical certainty supported by clear physical evidence.',
          },
          {
            id: 'b2-u2-l1-e2',
            type: 'multiple-choice',
            instruction: 'You spoke with Oliver in person five minutes ago. Someone claims he is in New York:',
            prompt: 'Your rebuttal:',
            options: ['He can\'t be in New York; I spoke with him in person moments ago!', 'He must be in New York.', 'He should be in New York.', 'He might have been in New York.'],
            correctAnswer: 'He can\'t be in New York; I spoke with him in person moments ago!',
            explanation: '"Can\'t be" expresses firm logical impossibility against undeniable direct evidence.',
          }
        ]
      }
    ],
    exam: {
      id: 'exam-b2-u2',
      level: 'B2',
      title: 'Unit 2 Progress Assessment: Modals of Deduction (B2)',
      description: 'Verify your precision when deducting past circumstances and forming substantiated conclusions.',
      passingScore: 70,
      exercises: [
        {
          id: 'ex-b2-2',
          type: 'fill-blank',
          instruction: 'Complete the sentence with past criticism of an unfulfilled duty:',
          prompt: 'You _____ (notify) the administration earlier! The deadline expired at noon.',
          options: ['should have notified', 'must have notified', 'can\'t have notified', 'would notify'],
          correctAnswer: 'should have notified',
          explanation: '"Should have + past participle" signifies that an action was advisable in the past but remained unfulfilled.',
        }
      ]
    }
  }
]

export const FINAL_B2_EXAM: Exam = {
  id: 'final-exam-b2',
  level: 'B2',
  title: 'Comprehensive B2 Upper-Intermediate Certification Assessment',
  description: 'Official CEFR B2 Upper-Intermediate assessment evaluating workplace negotiation, nuanced deductions, and complex discourse.',
  passingScore: 75,
  exercises: [
    {
      id: 'final-b2-1',
      type: 'listening',
      instruction: 'Listen to the panel discussion and identify the speaker core premise:',
      prompt: 'While remote working offers undeniable scheduling flexibility, we must not overlook the institutional cohesion and spontaneous creativity that face-to-face collaboration uniquely fosters.',
      audioText: 'While remote working offers undeniable scheduling flexibility, we must not overlook the institutional cohesion and spontaneous creativity that face-to-face collaboration uniquely fosters.',
      options: [
        'In-person collaboration fosters team cohesion and spontaneous creativity in an irreplaceable manner.',
        'Remote work must be eradicated entirely.',
        'Traditional offices are entirely obsolete and inefficient.',
        'Individual creativity only flourishes in total isolation.'
      ],
      correctAnswer: 'In-person collaboration fosters team cohesion and spontaneous creativity in an irreplaceable manner.',
      explanation: 'The speaker maintains that in-person collaboration cultivates irreplaceable cohesion and spontaneous innovation.',
    },
    {
      id: 'final-b2-2',
      type: 'fill-blank',
      instruction: 'Complete the sentence with the appropriate mixed conditional construction:',
      prompt: 'If I hadn\'t accepted the research appointment in Oxford ten years ago, I _____ (not live) here today.',
      options: ["wouldn't be living", "wouldn't have lived", "didn't live", "won't live"],
      correctAnswer: "wouldn't be living",
      explanation: 'Condicional mixto: causa en pasado (Past Perfect) con efecto continuo en el presente (wouldn\'t be living).',
    },
    {
      id: 'final-b2-3',
      type: 'speaking',
      instruction: 'Deliver this argument with poise, tonal control, and formal diction:',
      prompt: 'Having meticulously weighed all potential outcomes, we arrived at an agreeable consensus.',
      audioText: 'Having meticulously weighed all potential outcomes, we arrived at an agreeable consensus.',
      correctAnswer: 'Having meticulously weighed all potential outcomes, we arrived at an agreeable consensus.',
      explanation: 'Use of a perfect participle clause ("Having meticulously weighed...") characteristic of professional prose.',
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
    title: 'Grammatical Inversion & Rhetorical Emphasis',
    topic: 'Inversion with Negative and Restrictive Adverbials',
    description: 'Aprende a estructurar oraciones de elevado impacto persuasivo invirtiendo el sujeto y el auxiliar.',
    lessons: [
      {
        id: 'c1-u1-l1',
        unitId: 'c1-unit-1',
        unitTitle: 'Unidad 1',
        title: 'Inversion with Restrictive Adverbs (Seldom, Rarely, Never)',
        description: 'Apply rhetorical inversions such as "Seldom have I witnessed..." to elevate essays and addresses.',
        durationMinutes: 6,
        type: 'grammar',
        exercises: [
          {
            id: 'c1-u1-l1-e1',
            type: 'sentence-order',
            instruction: 'Assemble the words to construct a formal emphatic inversion:',
            prompt: 'have / never / I / such / heard / eloquence / inspiring',
            options: ['Never', 'have', 'I', 'heard', 'such', 'inspiring', 'eloquence'],
            correctAnswer: 'Never have I heard such inspiring eloquence',
            explanation: 'Al anteponer "Never", el orden se invierte a Auxiliar (have) + Sujeto (I) + Verbo (heard).',
          },
          {
            id: 'c1-u1-l1-e2',
            type: 'fill-blank',
            instruction: 'Complete the formal inversion in an institutional setting:',
            prompt: 'Under no circumstances _____ (staff / permit) to disclose confidential client data.',
            options: ['are staff permitted', 'staff are permitted', 'staff permit', 'are permitted staff'],
            correctAnswer: 'are staff permitted',
            explanation: 'Following negative prepositional phrases such as "Under no circumstances", subject-auxiliary inversion is mandatory.',
          }
        ]
      }
    ],
    exam: {
      id: 'exam-c1-u1',
      level: 'C1',
      title: 'Unit 1 Progress Assessment: Inversion (C1)',
      description: 'Assess your command of formal subject-auxiliary inversion and elevated literary syntax.',
      passingScore: 70,
      exercises: [
        {
          id: 'ex-c1-1',
          type: 'fill-blank',
          instruction: 'Complete the rhetorical inversion:',
          prompt: 'Little _____ (she / realize) that her decision would alter the trajectory of modern science.',
          options: ['did she realize', 'she realized', 'she did realize', 'had she realized'],
          correctAnswer: 'did she realize',
          explanation: '"Little did she realize" is a classical rhetorical inversion widely deployed in essays and narrative fiction.',
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
        description: 'Master "What concerns us is..." and "It was precisely for this reason that..." to direct thematic focus.',
        durationMinutes: 6,
        type: 'speaking',
        exercises: [
          {
            id: 'c1-u2-l1-e1',
            type: 'sentence-order',
            instruction: 'Assemble the words to construct the emphatic pseudo-cleft sentence:',
            prompt: 'is / what / need / we / thorough / a / investigation',
            options: ['What', 'we', 'need', 'is', 'a', 'thorough', 'investigation'],
            correctAnswer: 'What we need is a thorough investigation',
            explanation: '"What + clause + is/was" foregrounds the focal point with precision.',
          },
          {
            id: 'c1-u2-l1-e2',
            type: 'speaking',
            instruction: 'Deliver this phrase of British diplomatic dissent with measured composure:',
            prompt: 'With all due respect, I am not entirely persuaded by that argument.',
            audioText: 'With all due respect, I am not entirely persuaded by that argument.',
            correctAnswer: 'With all due respect, I am not entirely persuaded by that argument.',
            explanation: '"I am not entirely persuaded" exemplifies British understated diplomatic disagreement.',
          }
        ]
      }
    ],
    exam: {
      id: 'exam-c1-u2',
      level: 'C1',
      title: 'Unit 2 Progress Assessment: Diplomatic Register (C1)',
      description: 'Assess your capability to negotiate and disagree using serene diplomatic understatement.',
      passingScore: 70,
      exercises: [
        {
          id: 'ex-c1-2',
          type: 'multiple-choice',
          instruction: 'Which phrasing offers the most tactful expression of caution before an executive committee?',
          prompt: 'Tactful executive reservation:',
          options: [
            'I have certain reservations regarding the feasibility of this proposal.',
            'This idea is completely flawed and unworkable.',
            'I strongly dislike this concept.',
            'You shouldn\'t have proposed this.'
          ],
          correctAnswer: 'I have certain reservations regarding the feasibility of this proposal.',
          explanation: '"I have certain reservations regarding the feasibility..." is the textbook phrase for understated executive critique.',
        }
      ]
    }
  }
]

export const FINAL_C1_EXAM: Exam = {
  id: 'final-exam-c1',
  level: 'C1',
  title: 'Comprehensive C1 Advanced Certification Assessment',
  description: 'Official CEFR C1 Advanced qualification certifying rhetorical agility, stylistic nuance, and persuasive leadership.',
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
      explanation: 'The correlative structure "Not only... but also..." emphasizes both propositions with equal rhetorical force.',
    },
    {
      id: 'final-c1-2',
      type: 'fill-blank',
      instruction: 'Complete the sentence using the formal mandative English subjunctive:',
      prompt: 'It is essential that every delegate _____ (be) present when the treaty is ratified.',
      options: ['be', 'is', 'was', 'should be being'],
      correctAnswer: 'be',
      explanation: 'In the mandative subjunctive following adjectives of urgency, the uninflected base verb (be) applies across all persons.',
    },
    {
      id: 'final-c1-3',
      type: 'speaking',
      instruction: 'Recite this sentence with measured oratorical cadence and refined articulation:',
      prompt: 'Scarcely had the keynote address concluded when an enthusiastic ovation erupted.',
      audioText: 'Scarcely had the keynote address concluded when an enthusiastic ovation erupted.',
      correctAnswer: 'Scarcely had the keynote address concluded when an enthusiastic ovation erupted.',
      explanation: 'Temporal inversion: Scarcely had + Subject + past participle... when...',
    }
  ]
}

// ============================================================================
// CEFR LEVEL C2: MASTERY & PROFICIENCY
// ============================================================================
export const CURRICULUM_C2: Unit[] = [
  {
    id: 'c2-unit-1',
    level: 'C2',
    unitNumber: 1,
    title: 'Master Rhetoric & Oxford Academic Prose',
    topic: 'Mastery of Syntax, Participle Clauses and Nuance',
    description: 'Achieve the pinnacle of English expression: parliamentary debate, literary critique, and absolute lexical exactitude.',
    lessons: [
      {
        id: 'c2-u1-l1',
        unitId: 'c2-unit-1',
        unitTitle: 'Unidad 1',
        title: 'Complex Syntax & Absolute Participle Clauses',
        description: 'Deploy dense, elegant syntactic constructions to articulate nuanced reasoning with economy and grace.',
        durationMinutes: 6,
        type: 'grammar',
        exercises: [
          {
            id: 'c2-u1-l1-e1',
            type: 'sentence-order',
            instruction: 'Assemble the classical absolute participle clause characteristic of Oxford prose:',
            prompt: 'all / being / considered / things / concluded / proceedings / were / the',
            options: ['All', 'things', 'considered,', 'the', 'proceedings', 'were', 'concluded'],
            correctAnswer: 'All things considered, the proceedings were concluded',
            explanation: '"All things considered" functions as a non-finite absolute clause modifying the entire matrix sentence.',
          },
          {
            id: 'c2-u1-l1-e2',
            type: 'speaking',
            instruction: 'Deliver this speech with the oratorical cadence of British parliamentary debate:',
            prompt: 'Be that as it may, we cannot turn a blind eye to empirical reality.',
            audioText: 'Be that as it may, we cannot turn a blind eye to empirical reality.',
            correctAnswer: 'Be that as it may, we cannot turn a blind eye to empirical reality.',
            explanation: '"Be that as it may" (sea como fuere) es un conector concesivo formal de alta elocuencia.',
          }
        ]
      }
    ],
    exam: {
      id: 'exam-c2-u1',
      level: 'C2',
      title: 'Unit 1 Progress Assessment: Rhetoric & Syntax (C2)',
      description: 'Appraise your proficiency in deconstructing and composing mastery-level prose.',
      passingScore: 70,
      exercises: [
        {
          id: 'ex-c2-1',
          type: 'fill-blank',
          instruction: 'Complete the sentence with the established elevated idiom:',
          prompt: 'His treatise on moral philosophy falls nothing short of an absolute tour de _____.',
          options: ['force', 'grace', 'power', 'mind'],
          correctAnswer: 'force',
          explanation: '"A tour de force" denotes a masterly achievement characterized by exceptional artistic or technical command.',
        }
      ]
    }
  },
  {
    id: 'c2-unit-2',
    level: 'C2',
    unitNumber: 2,
    title: 'Irony, British Understatement & Idiomatic Wit',
    topic: 'British Understatement, Irony and Mastery of Idiom',
    description: 'Decodifica el humor sutil, el "understatement" y los matices que caracterizan el dominio nativo pleno.',
    lessons: [
      {
        id: 'c2-u2-l1',
        unitId: 'c2-unit-2',
        unitTitle: 'Unidad 2',
        title: 'British Understatement at its Finest',
        description: 'How British speakers defuse colossal dilemmas with calm understatement: "We have a bit of a situation".',
        durationMinutes: 6,
        type: 'listening',
        exercises: [
          {
            id: 'c2-u2-l1-e1',
            type: 'listening',
            instruction: 'Listen to the tutor idiom and deduce its pragmatic meaning in context:',
            prompt: 'It was rather a sticky wicket, but we soldiered on and managed to pull it off.',
            audioText: 'It was rather a sticky wicket, but we soldiered on and managed to pull it off.',
            options: [
              'It was a remarkably difficult and delicate situation, yet we persevered and achieved the goal.',
              'There was a physical defect with the cricket pavilion gate.',
              'We chose to capitulate at the first sign of poor weather.',
              'The weather was exceptionally humid.'
            ],
            correctAnswer: 'It was a remarkably difficult and delicate situation, yet we persevered and achieved the goal.',
            explanation: '"On a sticky wicket" is a historical cricketing idiom denoting a precarious or delicate situation.',
          },
          {
            id: 'c2-u2-l1-e2',
            type: 'speaking',
            instruction: 'Pronounce this sentence with characteristic British composure and dry wit:',
            prompt: 'I wouldn\'t say it was an unmitigated triumph, to put it mildly.',
            audioText: 'I wouldn\'t say it was an unmitigated triumph, to put it mildly.',
            correctAnswer: 'I wouldn\'t say it was an unmitigated triumph, to put it mildly.',
            explanation: '"To put it mildly" is the quintessential British phrase used to deliberately understate a grave reality.',
          }
        ]
      }
    ],
    exam: {
      id: 'exam-c2-u2',
      level: 'C2',
      title: 'Unit 2 Progress Assessment: Cultural Wit & Irony (C2)',
      description: 'Gauge your grasp of situational irony, cultural understatement, and high-level conversational nuance.',
      passingScore: 70,
      exercises: [
        {
          id: 'ex-c2-2',
          type: 'multiple-choice',
          instruction: 'What does a British speaker imply when describing a proposal as "a very courageous proposal"?',
          prompt: 'Decode the classic British institutional understatement:',
          options: [
            'She considers the proposal utterly foolish, reckless, or ill-advised.',
            'She admires your daring spirit and will fund it immediately.',
            'She insinuates that you require military training.',
            'She suggests putting it to an immediate public vote.'
          ],
          correctAnswer: 'She considers the proposal utterly foolish, reckless, or ill-advised.',
          explanation: 'In British institutional parlance, dubbing a proposal "courageous" is the most polite euphemism for warning of catastrophe.',
        }
      ]
    }
  }
]

export const FINAL_C2_EXAM: Exam = {
  id: 'final-exam-c2',
  level: 'C2',
  title: 'Oxford Master of English: Comprehensive C2 Award',
  description: 'The supreme pedagogical laurel validating erudite fluency, stylistic mastery, and native-level command of the English language.',
  passingScore: 80,
  exercises: [
    {
      id: 'final-c2-1',
      type: 'listening',
      instruction: 'Listen to the valedictory lecture and identify its central philosophical conclusion:',
      prompt: 'Language is by no means a static repository of symbols, but rather a dynamic, living organism that mirrors the evolving consciousness of humanity itself. To master it is not merely to acquire vocabulary, but to inhabit another way of perceiving existence.',
      audioText: 'Language is by no means a static repository of symbols, but rather a dynamic, living organism that mirrors the evolving consciousness of humanity itself. To master it is not merely to acquire vocabulary, but to inhabit another way of perceiving existence.',
      options: [
        'Mastering a language is not mere vocabulary memorization, but inhabiting a new way of perceiving human existence.',
        'Dictionaries must remain entirely unchanged across the centuries.',
        'Static symbols are superior to living consciousness.',
        'Language learning should be strictly limited to utilitarian grammar.'
      ],
      correctAnswer: 'Mastering a language is not mere vocabulary memorization, but inhabiting a new way of perceiving human existence.',
      explanation: 'The lecture concludes that true linguistic mastery fundamentally reframes how one interprets human experience.',
    },
    {
      id: 'final-c2-2',
      type: 'fill-blank',
      instruction: 'Complete the sentence with the precise rhetorical correlative:',
      prompt: '_____ had the storm subsided than the intrepid scholars recommenced their expedition.',
      options: ['No sooner', 'Hardly', 'Scarcely', 'Barely'],
      correctAnswer: 'No sooner',
      explanation: '"No sooner" se correlaciona estrictamente con "than" (No sooner had... than...). "Hardly" y "Scarcely" se correlacionan con "when".',
    },
    {
      id: 'final-c2-3',
      type: 'speaking',
      instruction: 'Pronounce with authoritative cadence, intellectual presence, and flawless native intonation:',
      prompt: 'Herein lies the quintessential paradox of the human intellect: the more we discover, the vaster the frontiers of our ignorance appear.',
      audioText: 'Herein lies the quintessential paradox of the human intellect: the more we discover, the vaster the frontiers of our ignorance appear.',
      correctAnswer: 'Herein lies the quintessential paradox of the human intellect: the more we discover, the vaster the frontiers of our ignorance appear.',
      explanation: 'Uso magistral de "Herein lies" y la estructura de doble comparativo correlativo ("the more... the vaster...").',
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
    description: 'Foundational greetings, alphabet, numbers, verb to be, daily objects, cafe ordering, and present simple routines.',
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
    description: 'Conditionals, passive voice, narrative past (Past Continuous vs Past Perfect), articles, and film review writing.',
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
