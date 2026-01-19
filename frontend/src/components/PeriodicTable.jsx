import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { elements } from '../data/elements'
import { getElementColor } from '../utils/periodicTableColors'

const PeriodicTable = () => {
  const navigate = useNavigate()

  // Periodic table layout - positions for each element
  const mainTable = [
    // Period 1
    [1, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2],
    // Period 2
    [3, 4, null, null, null, null, null, null, null, null, null, null, 5, 6, 7, 8, 9, 10],
    // Period 3
    [11, 12, null, null, null, null, null, null, null, null, null, null, 13, 14, 15, 16, 17, 18],
    // Period 4
    [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
    // Period 5
    [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
    // Period 6
    [55, 56, 57, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86],
    // Period 7
    [87, 88, 89, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118],
  ]

  // Lanthanides (57-71)
  const lanthanides = [57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71]

  // Actinides (89-103)
  const actinides = [89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103]

  // Create element lookup map for O(1) access instead of O(n) - this is actually useful
  const elementMap = useMemo(() => {
    const map = new Map()
    elements.forEach(el => map.set(el.atomicNumber, el))
    return map
  }, [])

  const handleElementClick = (atomicNumber) => {
    if (atomicNumber) {
      navigate(`/element/${atomicNumber}`)
    }
  }

  const getElement = (atomicNumber) => {
    if (!atomicNumber) return null
    return elementMap.get(atomicNumber) || null
  }

  const renderElement = (atomicNumber, key) => {
    const element = getElement(atomicNumber)
    if (!atomicNumber) {
      return <div key={key} className="w-16 h-16" />
    }
    
    const color = element ? getElementColor(element.category) : '#E0E0E0'
    
    return (
      <button
        key={key}
        onClick={() => handleElementClick(atomicNumber)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleElementClick(atomicNumber)
          }
        }}
        className="w-16 h-16 border-2 border-gray-400 rounded hover:scale-110 transition-transform cursor-pointer flex flex-col items-center justify-center text-xs font-semibold shadow-md hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        style={{ backgroundColor: color }}
        title={element?.name || `Element ${atomicNumber}`}
        aria-label={`View details for ${element?.name || `element ${atomicNumber}`}`}
      >
        <div className="text-xs font-bold text-gray-700">{atomicNumber}</div>
        <div className="text-sm font-bold text-gray-800">{element?.symbol}</div>
      </button>
    )
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 pb-2">
      <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">Periodic Table of Elements</h1>
      <nav aria-label="Periodic table navigation">
      
      {/* Main Periodic Table */}
      <div className="flex flex-col gap-1 mb-3">
        {mainTable.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1 justify-center">
            {row.map((atomicNumber, colIndex) => 
              renderElement(atomicNumber, `main-${rowIndex}-${colIndex}-${atomicNumber}`)
            )}
          </div>
        ))}
      </div>

      {/* Lanthanides Row */}
      <div className="mb-2">
        <div className="text-center mb-1 text-xs font-semibold text-gray-600">Lanthanides</div>
        <div className="flex gap-1 justify-center">
          {lanthanides.map((atomicNumber) => 
            renderElement(atomicNumber, `lanthanide-${atomicNumber}`)
          )}
        </div>
      </div>

      {/* Actinides Row */}
      <div className="mb-2">
        <div className="text-center mb-1 text-xs font-semibold text-gray-600">Actinides</div>
        <div className="flex gap-1 justify-center">
          {actinides.map((atomicNumber) => 
            renderElement(atomicNumber, `actinide-${atomicNumber}`)
          )}
        </div>
      </div>

      {/* Legend - Compact */}
      <div className="mt-4 mb-2 p-2 bg-white rounded-lg shadow-md">
        <h3 className="text-sm font-bold mb-2 text-center text-gray-800">Element Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded border-2 border-gray-400" style={{ backgroundColor: getElementColor('Alkali Metal') }}></div>
            <span>Alkali Metal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded border-2 border-gray-400" style={{ backgroundColor: getElementColor('Alkaline Earth Metal') }}></div>
            <span>Alkaline Earth</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded border-2 border-gray-400" style={{ backgroundColor: getElementColor('Transition Metal') }}></div>
            <span>Transition Metal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded border-2 border-gray-400" style={{ backgroundColor: getElementColor('Post-transition Metal') }}></div>
            <span>Post-transition</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded border-2 border-gray-400" style={{ backgroundColor: getElementColor('Metalloid') }}></div>
            <span>Metalloid</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded border-2 border-gray-400" style={{ backgroundColor: getElementColor('Nonmetal') }}></div>
            <span>Nonmetal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded border-2 border-gray-400" style={{ backgroundColor: getElementColor('Halogen') }}></div>
            <span>Halogen</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded border-2 border-gray-400" style={{ backgroundColor: getElementColor('Noble Gas') }}></div>
            <span>Noble Gas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded border-2 border-gray-400" style={{ backgroundColor: getElementColor('Lanthanide') }}></div>
            <span>Lanthanide</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded border-2 border-gray-400" style={{ backgroundColor: getElementColor('Actinide') }}></div>
            <span>Actinide</span>
          </div>
        </div>
      </div>

      <div className="mt-3 mb-2 text-center text-sm font-medium text-blue-600">
        Click on any element to view detailed properties
      </div>
      </nav>
    </div>
  )
}

export default PeriodicTable