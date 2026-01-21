import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { elements } from '../data/elements'
import { getRandomQuestions } from '../utils/questionGenerator'
import QuizComponent from '../components/QuizComponent'
import ComparisonComponent from '../components/ComparisonComponent'

const QuizCompare = () => {
  const [selectedElements, setSelectedElements] = useState([])
  const [showQuiz, setShowQuiz] = useState(false)
  const [showComparison, setShowComparison] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const toggleElementSelection = (atomicNumber) => {
    setSelectedElements(prev => {
      if (prev.includes(atomicNumber)) {
        // Deselect
        return prev.filter(num => num !== atomicNumber)
      } else {
        // Select (max 2)
        if (prev.length >= 2) {
          return prev
        }
        return [...prev, atomicNumber]
      }
    })
  }

  const handleStartQuiz = () => {
    if (selectedElements.length > 0) {
      setShowQuiz(true)
      setShowComparison(false)
    }
  }

  const handleCompare = () => {
    if (selectedElements.length === 2) {
      setShowComparison(true)
      setShowQuiz(false)
    }
  }

  const handleBackToSelection = () => {
    setShowQuiz(false)
    setShowComparison(false)
  }

  const filteredElements = elements.filter(element =>
    element.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    element.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getElementName = (atomicNumber) => {
    return elements.find(e => e.atomicNumber === atomicNumber)?.name || ''
  }

  if (showQuiz) {
    return (
      <QuizComponent
        elementNumbers={selectedElements}
        onBack={handleBackToSelection}
      />
    )
  }

  if (showComparison && selectedElements.length === 2) {
    return (
      <ComparisonComponent
        element1Number={selectedElements[0]}
        element2Number={selectedElements[1]}
        onBack={handleBackToSelection}
      />
    )
  }

  return (
    <>
      <Helmet>
        <title>Quiz & Compare - Periodic Table</title>
        <meta name="description" content="Take quizzes about elements and compare their properties side by side." />
      </Helmet>
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
            Quiz & Compare Elements
          </h1>

          {/* Instructions */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Instructions</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Select up to 2 elements from the list below</li>
              <li>If you select 1 element, the quiz will contain 10 questions about that element</li>
              <li>If you select 2 elements, the quiz will contain 5 questions about each element (10 total)</li>
              <li>Use the "Take Quiz" button to start a quiz</li>
              <li>Use the "Compare" button (requires 2 elements) to see a comparison table</li>
            </ul>
          </div>

          {/* Selected Elements Display */}
          {selectedElements.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Selected Elements ({selectedElements.length}/2)</h2>
              <div className="flex flex-wrap gap-3 mb-4">
                {selectedElements.map(num => (
                  <div
                    key={num}
                    className="bg-blue-100 border-2 border-blue-500 rounded-lg px-4 py-2 flex items-center gap-2"
                  >
                    <span className="font-semibold text-blue-800">
                      {getElementName(num)}
                    </span>
                    <button
                      onClick={() => toggleElementSelection(num)}
                      className="text-blue-600 hover:text-blue-800 font-bold"
                      aria-label={`Remove ${getElementName(num)}`}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleStartQuiz}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg"
                >
                  Take Quiz ({selectedElements.length === 1 ? '10' : '10'} questions)
                </button>
                {selectedElements.length === 2 && (
                  <button
                    onClick={handleCompare}
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold text-lg"
                  >
                    Compare Elements
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Search Bar */}
          <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
            <input
              type="text"
              placeholder="Search elements by name or symbol..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-lg"
            />
          </div>

          {/* Element Tags */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Select Elements ({selectedElements.length}/2)
            </h2>
            <div className="flex flex-wrap gap-3 max-h-96 overflow-y-auto">
              {filteredElements.map(element => {
                const isSelected = selectedElements.includes(element.atomicNumber)
                const isDisabled = !isSelected && selectedElements.length >= 2
                
                return (
                  <button
                    key={element.atomicNumber}
                    onClick={() => !isDisabled && toggleElementSelection(element.atomicNumber)}
                    disabled={isDisabled}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      isSelected
                        ? 'bg-blue-600 text-white ring-4 ring-blue-300'
                        : isDisabled
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                    }`}
                    aria-label={`Select ${element.name}`}
                    aria-pressed={isSelected}
                  >
                    {element.name}
                  </button>
                )
              })}
            </div>
            {filteredElements.length === 0 && (
              <p className="text-center text-gray-500 mt-4">No elements found matching "{searchTerm}"</p>
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export default QuizCompare
