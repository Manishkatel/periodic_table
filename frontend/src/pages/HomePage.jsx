import { Helmet } from 'react-helmet-async'
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
        <PeriodicTable />
      </main>
    </>
  )
}

export default HomePage
