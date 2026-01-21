import { useState, useEffect } from 'react'
import { getRandomQuestions } from '../utils/questionGenerator'
import { getElementByNumber } from '../data/elements'

const QuizComponent = ({ elementNumbers, onBack }) => {
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    const countPerElement = elementNumbers.length === 1 ? 10 : 5
    const quizQuestions = getRandomQuestions(elementNumbers, countPerElement)
    setQuestions(quizQuestions)
  }, [elementNumbers])

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const handleSubmit = () => {
    let correctCount = 0
    questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correctCount++
      }
    })
    setScore(correctCount)
    setShowResults(true)
  }

  const handleRestart = () => {
    const countPerElement = elementNumbers.length === 1 ? 10 : 5
    const quizQuestions = getRandomQuestions(elementNumbers, countPerElement)
    setQuestions(quizQuestions)
    setCurrentQuestionIndex(0)
    setSelectedAnswers({})
    setShowResults(false)
    setScore(0)
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-2xl">Loading quiz...</div>
      </div>
    )
  }

  if (showResults) {
    const percentage = Math.round((score / questions.length) * 100)
    const getScoreColor = () => {
      if (percentage >= 80) return 'text-green-600'
      if (percentage >= 60) return 'text-yellow-600'
      return 'text-red-600'
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">Quiz Results</h2>
            <div className="text-center mb-8">
              <div className={`text-6xl font-bold mb-2 ${getScoreColor()}`}>
                {score}/{questions.length}
              </div>
              <div className={`text-3xl font-semibold ${getScoreColor()}`}>
                {percentage}%
              </div>
            </div>

            {/* Question Review */}
            <div className="space-y-6 mb-8">
              {questions.map((question, index) => {
                const userAnswer = selectedAnswers[question.id]
                const isCorrect = userAnswer === question.correctAnswer
                const element = getElementByNumber(question.elementNumber)

                return (
                  <div
                    key={question.id}
                    className={`border-2 rounded-lg p-4 ${
                      isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">
                        Question {index + 1}: {question.question}
                      </h3>
                      {isCorrect ? (
                        <span className="text-green-600 font-bold text-xl">✓</span>
                      ) : (
                        <span className="text-red-600 font-bold text-xl">✗</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">About: {element?.name}</p>
                    <div className="space-y-1">
                      <p className={`font-semibold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                        Your answer: {userAnswer || 'Not answered'}
                      </p>
                      {!isCorrect && (
                        <p className="text-green-700 font-semibold">
                          Correct answer: {question.correctAnswer}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={handleRestart}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Retake Quiz
              </button>
              <button
                onClick={onBack}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold"
              >
                Back to Selection
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]
  const element = getElementByNumber(currentQuestion?.elementNumber)
  const selectedAnswer = selectedAnswers[currentQuestion?.id]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="mb-6">
            <button
              onClick={onBack}
              className="text-blue-600 hover:text-blue-800 mb-4 font-semibold"
            >
              ← Back to Selection
            </button>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Question {currentQuestionIndex + 1} of {questions.length}
              </h2>
              <div className="text-gray-600">
                About: <span className="font-semibold">{element?.name}</span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">
              {currentQuestion.question}
            </h3>
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === option
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(currentQuestion.id, option)}
                    className={`w-full text-left px-6 py-4 rounded-lg border-2 transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-100 text-blue-900'
                        : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50'
                    }`}
                  >
                    <span className="font-semibold text-lg">{String.fromCharCode(65 + index)}. </span>
                    {option}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                currentQuestionIndex === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
            >
              Previous
            </button>
            {currentQuestionIndex === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuizComponent
