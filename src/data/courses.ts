export interface Question {
  id: string;
  question: string;
  answer: string;
  options: string[];
}

export interface Trivia {
  id: string;
  title: string;
  questions: Question[];
}

export interface Course {
  id: string;
  title: string;
  subject: string;
  grade: string;
  description: string;
  trivias: Trivia[];
}

const generateQuestions = (subject: string, topic: string, count: number): Question[] => {
  const realQuestions: Record<string, Question[]> = {
    'Algebra-Linear Equations': [
      { id: 'alg-lin-1', question: 'What is the slope of the line y = 3x + 5?', answer: '3', options: ['3', '5', '-3', '1/3'] },
      { id: 'alg-lin-2', question: 'Solve for x: 2x + 4 = 12', answer: '4', options: ['4', '8', '6', '2'] },
      { id: 'alg-lin-3', question: 'What is the y-intercept of the line 2x - y = 4?', answer: '-4', options: ['-4', '4', '2', '-2'] },
      { id: 'alg-lin-4', question: 'Which form is y - y1 = m(x - x1)?', answer: 'Point-slope form', options: ['Point-slope form', 'Slope-intercept form', 'Standard form', 'Intercept form'] },
      { id: 'alg-lin-5', question: 'What is the slope of a horizontal line?', answer: '0', options: ['0', 'Undefined', '1', '-1'] },
    ],
    'Biology-Cells': [
      { id: 'bio-cell-1', question: 'Which organelle is known as the powerhouse of the cell?', answer: 'Mitochondria', options: ['Mitochondria', 'Nucleus', 'Ribosome', 'Golgi Apparatus'] },
      { id: 'bio-cell-2', question: 'What is the primary function of the cell wall in plants?', answer: 'Structural support', options: ['Structural support', 'Photosynthesis', 'Protein synthesis', 'Energy storage'] },
      { id: 'bio-cell-3', question: 'Which organelle contains the genetic material (DNA)?', answer: 'Nucleus', options: ['Nucleus', 'Cytoplasm', 'Vacuole', 'Lysosome'] },
      { id: 'bio-cell-4', question: 'What process do cells use to divide for growth?', answer: 'Mitosis', options: ['Mitosis', 'Meiosis', 'Osmosis', 'Diffusion'] },
      { id: 'bio-cell-5', question: 'Which organelle is responsible for photosynthesis?', answer: 'Chloroplast', options: ['Chloroplast', 'Mitochondria', 'Endoplasmic Reticulum', 'Cell Membrane'] },
    ],
    'History-Ancient Times': [
      { id: 'hist-anc-1', question: 'Which ancient civilization built the Great Pyramids of Giza?', answer: 'Egyptians', options: ['Egyptians', 'Romans', 'Greeks', 'Mayans'] },
      { id: 'hist-anc-2', question: 'What was the primary writing system of Ancient Mesopotamia?', answer: 'Cuneiform', options: ['Cuneiform', 'Hieroglyphics', 'Alphabet', 'Sanskrit'] },
      { id: 'hist-anc-3', question: 'Who was the first emperor of Rome?', answer: 'Augustus', options: ['Augustus', 'Julius Caesar', 'Nero', 'Constantine'] },
      { id: 'hist-anc-4', question: 'Which river was central to the Ancient Egyptian civilization?', answer: 'Nile', options: ['Nile', 'Tigris', 'Euphrates', 'Indus'] },
      { id: 'hist-anc-5', question: 'The Parthenon is located in which ancient city?', answer: 'Athens', options: ['Athens', 'Rome', 'Sparta', 'Alexandria'] },
    ],
    'Spanish-Vocabulary': [
      { id: 'span-voc-1', question: 'How do you say "Hello" in Spanish?', answer: 'Hola', options: ['Hola', 'Adiós', 'Gracias', 'Por favor'] },
      { id: 'span-voc-2', question: 'What does "Libro" mean in English?', answer: 'Book', options: ['Book', 'Library', 'Pen', 'Paper'] },
      { id: 'span-voc-3', question: 'How do you say "Thank you" in Spanish?', answer: 'Gracias', options: ['Gracias', 'De nada', 'Lo siento', 'Salud'] },
      { id: 'span-voc-4', question: 'What color is "Azul"?', answer: 'Blue', options: ['Blue', 'Red', 'Green', 'Yellow'] },
      { id: 'span-voc-5', question: 'How do you say "Friend" in Spanish?', answer: 'Amigo', options: ['Amigo', 'Hermano', 'Padre', 'Hijo'] },
    ],
    'Literature-Shakespeare': [
      { id: 'lit-sha-1', question: 'Which play features the characters Romeo and Juliet?', answer: 'Romeo and Juliet', options: ['Romeo and Juliet', 'Hamlet', 'Macbeth', 'Othello'] },
      { id: 'lit-sha-2', question: '"To be, or not to be" is a famous line from which play?', answer: 'Hamlet', options: ['Hamlet', 'King Lear', 'The Tempest', 'Julius Caesar'] },
      { id: 'lit-sha-3', question: 'What was the name of the theater where Shakespeare performed?', answer: 'The Globe', options: ['The Globe', 'The Swan', 'The Rose', 'The Fortune'] },
      { id: 'lit-sha-4', question: 'In which play does a character named Puck appear?', answer: 'A Midsummer Night\'s Dream', options: ['A Midsummer Night\'s Dream', 'Twelfth Night', 'As You Like It', 'The Winter\'s Tale'] },
      { id: 'lit-sha-5', question: 'Who is the "Scottish King" in the play often called "The Scottish Play"?', answer: 'Macbeth', options: ['Macbeth', 'Duncan', 'Banquo', 'Malcolm'] },
    ]
  };

  const key = `${subject}-${topic}`;
  const baseQuestions = realQuestions[key] || [];
  
  // Fill up to 'count' with generated questions if needed
  const remainingCount = Math.max(0, count - baseQuestions.length);
  const generated = Array.from({ length: remainingCount }, (_, i) => ({
    id: `${subject}-${topic}-gen-${i}`,
    question: `Advanced ${subject} ${topic} Question #${i + 1}: What is the primary concept of ${topic} in ${subject} studies?`,
    answer: `Concept ${i + 1}`,
    options: [`Concept ${i + 1}`, `Theory A`, `Hypothesis B`, `Principle C`]
  }));

  return [...baseQuestions, ...generated];
};

export const COURSES_DATA: Course[] = [
  {
    id: 'algebra-1',
    title: 'Algebra I',
    subject: 'Math',
    grade: '9th Grade',
    description: 'Mastering linear equations, inequalities, and functions.',
    trivias: [
      { id: 'alg-1', title: 'Linear Equations Mastery', questions: generateQuestions('Algebra', 'Linear Equations', 20) },
      { id: 'alg-2', title: 'Quadratic Functions', questions: generateQuestions('Algebra', 'Quadratics', 20) },
      { id: 'alg-3', title: 'Systems of Equations', questions: generateQuestions('Algebra', 'Systems', 20) },
      { id: 'alg-4', title: 'Polynomials & Factoring', questions: generateQuestions('Algebra', 'Polynomials', 20) },
      { id: 'alg-5', title: 'Exponents & Radicals', questions: generateQuestions('Algebra', 'Exponents', 20) },
    ]
  },
  {
    id: 'biology',
    title: 'Biology',
    subject: 'Science',
    grade: '10th Grade',
    description: 'Exploring the science of life, from cells to ecosystems.',
    trivias: [
      { id: 'bio-1', title: 'Cell Structure & Function', questions: generateQuestions('Biology', 'Cells', 20) },
      { id: 'bio-2', title: 'Genetics & DNA', questions: generateQuestions('Biology', 'Genetics', 20) },
      { id: 'bio-3', title: 'Evolutionary Biology', questions: generateQuestions('Biology', 'Evolution', 20) },
      { id: 'bio-4', title: 'Ecology & Ecosystems', questions: generateQuestions('Biology', 'Ecology', 20) },
      { id: 'bio-5', title: 'Human Anatomy', questions: generateQuestions('Biology', 'Anatomy', 20) },
    ]
  },
  {
    id: 'world-history',
    title: 'World History',
    subject: 'History',
    grade: '10th Grade',
    description: 'A journey through human civilization from ancient times to the modern era.',
    trivias: [
      { id: 'hist-1', title: 'Ancient Civilizations', questions: generateQuestions('History', 'Ancient Times', 20) },
      { id: 'hist-2', title: 'The Renaissance', questions: generateQuestions('History', 'Renaissance', 20) },
      { id: 'hist-3', title: 'World War I & II', questions: generateQuestions('History', 'World Wars', 20) },
      { id: 'hist-4', title: 'The Cold War Era', questions: generateQuestions('History', 'Cold War', 20) },
      { id: 'hist-5', title: 'Modern Global History', questions: generateQuestions('History', 'Modern Era', 20) },
    ]
  },
  {
    id: 'spanish-1',
    title: 'Spanish I',
    subject: 'Language',
    grade: '9th Grade',
    description: 'Introduction to Spanish language and Hispanic cultures.',
    trivias: [
      { id: 'span-1', title: 'Basic Vocabulary', questions: generateQuestions('Spanish', 'Vocabulary', 20) },
      { id: 'span-2', title: 'Present Tense Verbs', questions: generateQuestions('Spanish', 'Verbs', 20) },
      { id: 'span-3', title: 'Common Phrases', questions: generateQuestions('Spanish', 'Phrases', 20) },
      { id: 'span-4', title: 'Family & Home', questions: generateQuestions('Spanish', 'Family', 20) },
      { id: 'span-5', title: 'Food & Dining', questions: generateQuestions('Spanish', 'Food', 20) },
    ]
  },
  {
    id: 'english-lit',
    title: 'English Literature',
    subject: 'English',
    grade: '11th Grade',
    description: 'Analyzing classic works of literature and developing critical thinking.',
    trivias: [
      { id: 'lit-1', title: 'Shakespearean Plays', questions: generateQuestions('Literature', 'Shakespeare', 20) },
      { id: 'lit-2', title: 'American Classics', questions: generateQuestions('Literature', 'American Lit', 20) },
      { id: 'lit-3', title: 'Poetry Analysis', questions: generateQuestions('Literature', 'Poetry', 20) },
      { id: 'lit-4', title: 'The Great Gatsby', questions: generateQuestions('Literature', 'Gatsby', 20) },
      { id: 'lit-5', title: 'Modernist Literature', questions: generateQuestions('Literature', 'Modernism', 20) },
    ]
  }
];
