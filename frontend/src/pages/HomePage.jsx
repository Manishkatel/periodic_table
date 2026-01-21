import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import PeriodicTable from '../components/PeriodicTable'

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Periodic Table - Interactive Elements Explorer</title>
        <meta name="description" content="Explore the periodic table of elements with detailed properties, 3D atom visualization, and comprehensive element information. Interactive educational tool for chemistry students and enthusiasts." />
        <meta property="og:title" content="Periodic Table - Interactive Elements Explorer" />
        <meta property="og:description" content="Explore the periodic table of elements with detailed properties, 3D atom visualization, and comprehensive element information." />
        <meta property="og:url" content="https://periodictable.example.com/" />
        <meta property="twitter:title" content="Periodic Table - Interactive Elements Explorer" />
        <meta property="twitter:description" content="Explore the periodic table of elements with detailed properties, 3D atom visualization, and comprehensive element information." />
      </Helmet>
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4">
        {/* Header with Quiz & Compare button */}
        <div className="max-w-7xl mx-auto px-4 mb-4">
          <div className="flex justify-end">
            <Link
              to="/quiz-compare"
              className="px-3 py-3.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold text-sm shadow-lg"
            >
              Quiz & Compare Elements
            </Link>
          </div>
        </div>
        <PeriodicTable />
      </main>
    </>
  )
}

export default HomePage
