// Standard periodic table color scheme based on element categories - Bold vibrant colors with good contrast for black text
export const getElementColor = (category) => {
  const colorMap = {
    // Alkali Metals - Bold Red/Pink (medium tone, good contrast)
    'Alkali Metal': '#FF8A95', // Medium pink/red
    
    // Alkaline Earth Metals - Bold Orange (medium tone, good contrast)
    'Alkaline Earth Metal': '#FFB74D', // Medium orange
    
    // Transition Metals - Bold Blue (medium tone, good contrast)
    'Transition Metal': '#64B5F6', // Medium blue (distinct from cyan)
    
    // Post-transition Metals - Medium Gray (good contrast)
    'Post-transition Metal': '#B0BEC5', // Medium gray
    
    // Metalloids - Bold Yellow (medium tone, good contrast)
    'Metalloid': '#FFD54F', // Medium yellow
    
    // Nonmetals - Bold Green (medium tone, good contrast)
    'Nonmetal': '#81C784', // Medium green
    
    // Halogens - Bold Yellow/Green (medium tone, good contrast)
    'Halogen': '#FFF176', // Medium yellow
    
    // Noble Gases - Bold Cyan/Turquoise (medium tone, good contrast)
    'Noble Gas': '#4DD0E1', // Medium cyan/turquoise (distinct from blue)
    
    // Lanthanides - Bold Pink/Purple (medium tone, good contrast)
    'Lanthanide': '#BA68C8', // Medium pink/purple
    
    // Actinides - Bold Pink/Red (medium tone, good contrast)
    'Actinide': '#F06292', // Medium pink/rose
    
    // Default
    'default': '#E0E0E0', // Light gray
  }
  
  return colorMap[category] || colorMap['default']
}