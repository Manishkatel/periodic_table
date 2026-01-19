// Interesting facts about each element
export const elementFacts = {
  1: "Hydrogen is the most abundant element in the universe, making up about 75% of its mass. It's the lightest element and the first to form after the Big Bang.",
  2: "Helium was first discovered on the Sun before it was found on Earth. It's named after Helios, the Greek god of the Sun.",
  3: "Lithium is used in rechargeable batteries for laptops and cell phones. It's also the lightest metal and can float on water.",
  4: "Beryllium is stronger than steel but lighter than aluminum. It's used in spacecraft and nuclear reactors.",
  5: "Boron is essential for plant growth. It's used in glass manufacturing and as a component of detergents.",
  6: "Carbon is the basis of all known life on Earth. It can form more compounds than any other element - over 10 million known compounds.",
  7: "Nitrogen makes up about 78% of Earth's atmosphere. Despite being everywhere, pure nitrogen gas is non-reactive.",
  8: "Oxygen is the most abundant element in Earth's crust. Without it, combustion wouldn't be possible.",
  9: "Fluorine is the most reactive non-metal. It's so reactive that it can burn things that water can't even put out.",
  10: "Neon lights are filled with neon gas, which produces the characteristic red-orange glow when electricity passes through it.",
  11: "Sodium explodes when it comes into contact with water, producing hydrogen gas and a lot of heat.",
  12: "Magnesium burns with a brilliant white light, which is why it's used in fireworks and flashbulbs.",
  13: "Aluminum is the most abundant metal in Earth's crust, yet it wasn't isolated until 1825 because it's very reactive.",
  14: "Silicon is the second most abundant element in Earth's crust after oxygen. It's the basis of all computer chips.",
  15: "Phosphorus was discovered by an alchemist trying to make gold from urine. It glows in the dark.",
  16: "Sulfur smells like rotten eggs when burned. It's used in the production of sulfuric acid, one of the most important industrial chemicals.",
  17: "Chlorine was used as a chemical weapon in World War I. Today, it's essential for purifying drinking water.",
  18: "Argon is used in incandescent light bulbs to prevent the filament from burning out. It's inert and doesn't react with other elements.",
  19: "Potassium is essential for nerve function. Without it, your heart couldn't beat properly.",
  20: "Calcium is the most abundant metal in the human body. Your bones and teeth are mostly made of calcium compounds.",
  13: "Aluminum is the most abundant metal in Earth's crust, yet it wasn't isolated until 1825 because it's very reactive.",
  14: "Silicon is the second most abundant element in Earth's crust after oxygen. It's the basis of all computer chips.",
  15: "Phosphorus was discovered by an alchemist trying to make gold from urine. It glows in the dark.",
  16: "Sulfur smells like rotten eggs when burned. It's used in the production of sulfuric acid, one of the most important industrial chemicals.",
  17: "Chlorine was used as a chemical weapon in World War I. Today, it's essential for purifying drinking water.",
  18: "Argon is used in incandescent light bulbs to prevent the filament from burning out. It's inert and doesn't react with other elements.",
  19: "Potassium is essential for nerve function. Without it, your heart couldn't beat properly.",
  20: "Calcium is the most abundant metal in the human body. Your bones and teeth are mostly made of calcium compounds.",
  26: "Iron is the most common element (by mass) forming the planet Earth. The core of Earth is mostly iron.",
  29: "Copper was one of the first metals used by humans. It's been used for over 10,000 years.",
  47: "Silver is the best conductor of electricity. It's also naturally antibacterial.",
  79: "Gold is so malleable that a single ounce can be stretched into a wire 50 miles long, or hammered into a sheet 100 square feet.",
  82: "Lead has been used for thousands of years, from Roman pipes to modern batteries. However, it's toxic and can cause brain damage.",
  92: "Uranium is naturally radioactive. A single kilogram can produce as much energy as burning 1,500 tons of coal.",
  100: "Fermium was named after Enrico Fermi, the physicist who created the first nuclear reactor. It can only be made in particle accelerators.",
  118: "Oganesson, the heaviest element, is named after Russian physicist Yuri Oganessian. It only exists for milliseconds before decaying.",
}

export const getElementFact = (atomicNumber) => {
  return elementFacts[atomicNumber] || getDefaultFact(atomicNumber)
}

const getDefaultFact = (atomicNumber) => {
  const element = {
    1: "the lightest", 2: "the second lightest", 3: "an alkali metal",
    6: "the basis of life", 7: "in the air you breathe", 8: "essential for life",
    26: "in your blood", 29: "in electrical wires", 47: "the best conductor",
    79: "precious and rare", 92: "radioactive and powerful"
  }
  
  if (atomicNumber <= 20) {
    return `Element ${atomicNumber} is one of the first 20 elements in the periodic table, each playing crucial roles in chemistry and life.`
  } else if (atomicNumber <= 56) {
    return `Element ${atomicNumber} is a transition metal or post-transition element with unique properties that make it useful in various industrial applications.`
  } else if (atomicNumber <= 83) {
    return `Element ${atomicNumber} has complex electron configurations that give it distinctive chemical behaviors and applications.`
  } else {
    return `Element ${atomicNumber} is a heavy element, some of which are radioactive and have important applications in nuclear science.`
  }
}