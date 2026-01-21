import { elements, getElementByNumber } from '../data/elements'

// Generate 20 unique questions for an element
export function generateQuestionsForElement(atomicNumber) {
  const element = getElementByNumber(atomicNumber)
  if (!element) return []

  const questions = []
  const atomicMass = element.atomicMass || (atomicNumber * 1.5 + 10).toFixed(2)
  const neutrons = Math.round(atomicMass - atomicNumber)
  
  // Helper to get random wrong options
  const getWrongOptions = (correct, type = 'number') => {
    const wrong = []
    const used = new Set([correct])
    
    while (wrong.length < 3) {
      let value
      if (type === 'number') {
        value = correct + Math.floor(Math.random() * 20) - 10
        if (value < 1) value = Math.abs(value) + 1
      } else if (type === 'text') {
        // Get random element from different category
        const randomElement = elements[Math.floor(Math.random() * elements.length)]
        value = randomElement[correct.toLowerCase().includes('symbol') ? 'symbol' : 'name']
        if (value === correct || used.has(value)) continue
      }
      
      if (!used.has(value)) {
        wrong.push(value)
        used.add(value)
      }
    }
    return wrong.sort(() => Math.random() - 0.5)
  }

  // Helper to shuffle array
  const shuffleArray = (array) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  // Question 1: Atomic Number
  const wrongAtomicNumbers = getWrongOptions(element.atomicNumber, 'number')
  questions.push({
    id: `${atomicNumber}_1`,
    question: `What is the atomic number of ${element.name}?`,
    options: shuffleArray([element.atomicNumber, ...wrongAtomicNumbers]),
    correctAnswer: element.atomicNumber,
    elementNumber: atomicNumber
  })

  // Question 2: Symbol
  const wrongSymbols = getWrongOptions(element.symbol, 'text')
  questions.push({
    id: `${atomicNumber}_2`,
    question: `What is the chemical symbol of ${element.name}?`,
    options: shuffleArray([element.symbol, ...wrongSymbols]),
    correctAnswer: element.symbol,
    elementNumber: atomicNumber
  })

  // Question 3: Name from Symbol
  const wrongNames = getWrongOptions(element.name, 'text')
  questions.push({
    id: `${atomicNumber}_3`,
    question: `What is the full name of the element with symbol ${element.symbol}?`,
    options: shuffleArray([element.name, ...wrongNames]),
    correctAnswer: element.name,
    elementNumber: atomicNumber
  })

  // Question 4: Group
  if (element.group) {
    const wrongGroups = getWrongOptions(element.group, 'number')
    questions.push({
      id: `${atomicNumber}_4`,
      question: `In which group of the periodic table is ${element.name} located?`,
      options: shuffleArray([element.group, ...wrongGroups]),
      correctAnswer: element.group,
      elementNumber: atomicNumber
    })
  }

  // Question 5: Period
  if (element.period) {
    const wrongPeriods = getWrongOptions(element.period, 'number')
    questions.push({
      id: `${atomicNumber}_5`,
      question: `In which period of the periodic table is ${element.name} located?`,
      options: shuffleArray([element.period, ...wrongPeriods]),
      correctAnswer: element.period,
      elementNumber: atomicNumber
    })
  }

  // Question 6: Block
  const blocks = ['s', 'p', 'd', 'f']
  const wrongBlocks = blocks.filter(b => b !== element.block)
  questions.push({
    id: `${atomicNumber}_6`,
    question: `Which block does ${element.name} belong to?`,
    options: shuffleArray([element.block, ...wrongBlocks.slice(0, 3)]),
    correctAnswer: element.block,
    elementNumber: atomicNumber
  })

  // Question 7: Category
  const categories = ['Alkali Metal', 'Alkaline Earth Metal', 'Transition Metal', 'Post-transition Metal', 
    'Metalloid', 'Nonmetal', 'Halogen', 'Noble Gas', 'Lanthanide', 'Actinide']
  const wrongCategories = categories.filter(c => c !== element.category)
  questions.push({
    id: `${atomicNumber}_7`,
    question: `What is the category of ${element.name}?`,
    options: shuffleArray([element.category, ...wrongCategories.slice(0, 3)]),
    correctAnswer: element.category,
    elementNumber: atomicNumber
  })

  // Question 8: Atomic Mass
  const wrongMasses = getWrongOptions(parseFloat(atomicMass), 'number').map(m => parseFloat(m.toFixed(2)))
  questions.push({
    id: `${atomicNumber}_8`,
    question: `What is the approximate atomic mass of ${element.name}?`,
    options: shuffleArray([parseFloat(atomicMass).toFixed(2), ...wrongMasses.map(m => m.toFixed(2))]),
    correctAnswer: parseFloat(atomicMass).toFixed(2),
    elementNumber: atomicNumber
  })

  // Question 9: Protons
  const wrongProtons = getWrongOptions(element.atomicNumber, 'number')
  questions.push({
    id: `${atomicNumber}_9`,
    question: `How many protons does ${element.name} have?`,
    options: shuffleArray([element.atomicNumber, ...wrongProtons]),
    correctAnswer: element.atomicNumber,
    elementNumber: atomicNumber
  })

  // Question 10: Neutrons
  const wrongNeutrons = getWrongOptions(neutrons, 'number')
  questions.push({
    id: `${atomicNumber}_10`,
    question: `Approximately how many neutrons does ${element.name} have?`,
    options: shuffleArray([neutrons, ...wrongNeutrons]),
    correctAnswer: neutrons,
    elementNumber: atomicNumber
  })

  // Question 11: Electrons (neutral atom)
  const wrongElectrons = getWrongOptions(element.atomicNumber, 'number')
  questions.push({
    id: `${atomicNumber}_11`,
    question: `How many electrons does a neutral atom of ${element.name} have?`,
    options: shuffleArray([element.atomicNumber, ...wrongElectrons]),
    correctAnswer: element.atomicNumber,
    elementNumber: atomicNumber
  })

  // Question 12: Valence electrons estimate
  let valenceEstimate = 0
  if (element.group && element.group <= 2) valenceEstimate = element.group
  else if (element.group && element.group <= 18 && element.group >= 13) valenceEstimate = element.group - 10
  else if (element.group && element.group >= 3 && element.group <= 12) valenceEstimate = element.group % 10
  else valenceEstimate = Math.max(1, atomicNumber % 8)
  
  const wrongValence = getWrongOptions(valenceEstimate, 'number')
  questions.push({
    id: `${atomicNumber}_12`,
    question: `How many valence electrons does ${element.name} typically have?`,
    options: shuffleArray([valenceEstimate, ...wrongValence]),
    correctAnswer: valenceEstimate,
    elementNumber: atomicNumber
  })

  // Question 13: State at room temperature (based on category)
  const states = ['Solid', 'Liquid', 'Gas']
  let state = 'Solid'
  if (element.atomicNumber <= 2 || (element.group === 18 && element.period <= 2)) state = 'Gas'
  else if (element.symbol === 'Hg' || element.symbol === 'Br') state = element.symbol === 'Hg' ? 'Liquid' : 'Liquid'
  else if (element.symbol === 'Ga' || element.symbol === 'Cs' || element.symbol === 'Fr') state = 'Solid'
  
  const wrongStates = states.filter(s => s !== state)
  questions.push({
    id: `${atomicNumber}_13`,
    question: `What is the typical state of ${element.name} at room temperature?`,
    options: shuffleArray([state, ...wrongStates]),
    correctAnswer: state,
    elementNumber: atomicNumber
  })

  // Question 14: Metal/Nonmetal/Metalloid
  let classification = 'Nonmetal'
  if (element.category.includes('Metal')) classification = 'Metal'
  else if (element.category === 'Metalloid') classification = 'Metalloid'
  
  const wrongClassifications = ['Metal', 'Nonmetal', 'Metalloid'].filter(c => c !== classification)
  questions.push({
    id: `${atomicNumber}_14`,
    question: `Is ${element.name} a metal, nonmetal, or metalloid?`,
    options: shuffleArray([classification, ...wrongClassifications]),
    correctAnswer: classification,
    elementNumber: atomicNumber
  })

  // Question 15: Position relative to others
  const nextElement = getElementByNumber(atomicNumber + 1)
  const prevElement = getElementByNumber(atomicNumber - 1)
  if (nextElement && prevElement) {
    questions.push({
      id: `${atomicNumber}_15`,
      question: `${element.name} is located between which two elements?`,
      options: shuffleArray([
        `${prevElement.name} and ${nextElement.name}`,
        `${nextElement.name} and ${prevElement.name}`,
        `${getElementByNumber(atomicNumber - 2)?.name || 'Unknown'} and ${getElementByNumber(atomicNumber + 2)?.name || 'Unknown'}`,
        `${getElementByNumber(atomicNumber - 3)?.name || 'Unknown'} and ${getElementByNumber(atomicNumber + 3)?.name || 'Unknown'}`
      ]),
      correctAnswer: `${prevElement.name} and ${nextElement.name}`,
      elementNumber: atomicNumber
    })
  } else {
    // Alternative question if at boundaries
    const otherElements = elements.filter(e => e.atomicNumber !== atomicNumber).slice(0, 3)
    questions.push({
      id: `${atomicNumber}_15`,
      question: `Which element is closest to ${element.name} in atomic number?`,
      options: shuffleArray([
        nextElement?.name || prevElement?.name || otherElements[0]?.name,
        otherElements[1]?.name || 'Unknown',
        otherElements[2]?.name || 'Unknown',
        getElementByNumber(atomicNumber + 2)?.name || getElementByNumber(atomicNumber - 2)?.name || 'Unknown'
      ]),
      correctAnswer: nextElement?.name || prevElement?.name || otherElements[0]?.name,
      elementNumber: atomicNumber
    })
  }

  // Question 16: Noble gas check
  const isNobleGas = element.category === 'Noble Gas'
  questions.push({
    id: `${atomicNumber}_16`,
    question: `Is ${element.name} a noble gas?`,
    options: shuffleArray(['Yes', 'No']),
    correctAnswer: isNobleGas ? 'Yes' : 'No',
    elementNumber: atomicNumber
  })

  // Question 17: Alkali metal check
  const isAlkali = element.category === 'Alkali Metal'
  questions.push({
    id: `${atomicNumber}_17`,
    question: `Is ${element.name} an alkali metal?`,
    options: shuffleArray(['Yes', 'No']),
    correctAnswer: isAlkali ? 'Yes' : 'No',
    elementNumber: atomicNumber
  })

  // Question 18: Transition metal check
  const isTransition = element.category === 'Transition Metal'
  questions.push({
    id: `${atomicNumber}_18`,
    question: `Is ${element.name} a transition metal?`,
    options: shuffleArray(['Yes', 'No']),
    correctAnswer: isTransition ? 'Yes' : 'No',
    elementNumber: atomicNumber
  })

  // Question 19: Halogen check
  const isHalogen = element.category === 'Halogen'
  questions.push({
    id: `${atomicNumber}_19`,
    question: `Is ${element.name} a halogen?`,
    options: shuffleArray(['Yes', 'No']),
    correctAnswer: isHalogen ? 'Yes' : 'No',
    elementNumber: atomicNumber
  })

  // Question 20: First/last element in period or comparison
  const periodStart = elements.filter(e => e.period === element.period)[0]
  const periodEnd = elements.filter(e => e.period === element.period).slice(-1)[0]
  const isPeriodStart = periodStart && element.atomicNumber === periodStart.atomicNumber
  const isPeriodEnd = periodEnd && element.atomicNumber === periodEnd.atomicNumber
  
  if (isPeriodStart || isPeriodEnd) {
    questions.push({
      id: `${atomicNumber}_20`,
      question: `Is ${element.name} the first or last element in its period?`,
      options: shuffleArray([
        isPeriodStart ? 'First' : 'Last',
        isPeriodStart ? 'Last' : 'First',
        'Neither',
        'Both'
      ]),
      correctAnswer: isPeriodStart ? 'First' : 'Last',
      elementNumber: atomicNumber
    })
  } else {
    // Alternative question: Compare with nearby elements
    const nextEl = getElementByNumber(atomicNumber + 1)
    questions.push({
      id: `${atomicNumber}_20`,
      question: `Which element has a higher atomic number than ${element.name}?`,
      options: shuffleArray([
        nextEl?.name || 'None',
        prevElement?.name || 'None',
        getElementByNumber(atomicNumber + 2)?.name || 'None',
        getElementByNumber(atomicNumber - 2)?.name || 'None'
      ]),
      correctAnswer: nextEl?.name || 'None',
      elementNumber: atomicNumber
    })
  }

  // Ensure we have exactly 20 questions
  return questions.slice(0, 20)
}

// Get random questions from pool for quiz
export function getRandomQuestions(elementNumbers, countPerElement) {
  const allQuestions = []
  
  elementNumbers.forEach(num => {
    const questions = generateQuestionsForElement(num)
    allQuestions.push(...questions)
  })

  // Shuffle all questions
  const shuffled = allQuestions.sort(() => Math.random() - 0.5)
  
  // Select questions ensuring we get the right count per element
  const selected = []
  const perElementCount = {}
  elementNumbers.forEach(num => {
    perElementCount[num] = 0
  })

  // First pass: try to get equal distribution
  shuffled.forEach(q => {
    if (selected.length >= elementNumbers.length * countPerElement) return
    const needed = countPerElement
    if (perElementCount[q.elementNumber] < needed) {
      selected.push(q)
      perElementCount[q.elementNumber]++
    }
  })

  // Fill remaining slots if needed
  if (selected.length < elementNumbers.length * countPerElement) {
    shuffled.forEach(q => {
      if (selected.length >= elementNumbers.length * countPerElement) return
      if (!selected.find(s => s.id === q.id)) {
        selected.push(q)
      }
    })
  }

  // Shuffle final selection
  return selected.slice(0, elementNumbers.length * countPerElement).sort(() => Math.random() - 0.5)
}
