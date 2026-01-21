import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'

// Lazy load heavy components for code splitting
const ElementDetail = lazy(() => import('./pages/ElementDetail'))
const QuizCompare = lazy(() => import('./pages/QuizCompare'))

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Suspense fallback={
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
          <div className="text-2xl" role="status" aria-live="polite">Loading...</div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/element/:atomicNumber" element={<ElementDetail />} />
          <Route path="/quiz-compare" element={<QuizCompare />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
