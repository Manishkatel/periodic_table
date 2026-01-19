import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams, useNavigate } from 'react-router-dom'
import { getElementByNumber } from '../data/elements'
import { getElementFact } from '../data/elementFacts'
import Atom3D from '../components/Atom3D'
import PropertyTabs from '../components/PropertyTabs'
import axios from 'axios'

const ElementDetail = () => {
  const { atomicNumber } = useParams()
  const navigate = useNavigate()
  const [element, setElement] = useState(null)
  const [elementData, setElementData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    const elementBasic = getElementByNumber(parseInt(atomicNumber))
    setElement(elementBasic)
    setImageError(false) // Reset image error when element changes

    // Fetch detailed element data from backend
    const fetchElementData = async () => {
      try {
        const response = await axios.get(`/api/elements/${atomicNumber}/`, {
          validateStatus: function (status) {
            // Don't throw error for 404, treat it as acceptable
            return status >= 200 && status < 300 || status === 404
          }
        })
        
        if (response.status === 200) {
          setElementData(response.data)
        } else {
          // 404 or other non-200 status - use default data
          setElementData(generateDefaultElementData(elementBasic))
        }
      } catch (error) {
        // Only log unexpected errors (not 404s) in development
        if (import.meta.env.DEV && error.response?.status !== 404) {
          console.error('Error fetching element data:', error)
        }
        // Use default data if backend fails (backend might not be running)
        setElementData(generateDefaultElementData(elementBasic))
      } finally {
        setLoading(false)
      }
    }

    if (elementBasic) {
      fetchElementData()
    } else {
      // If element not found, stop loading immediately
      setLoading(false)
    }
  }, [atomicNumber])

  const generateDefaultElementData = (basicElement) => {
    // Generate default data based on basic element info
    return {
      atomic_number: basicElement.atomicNumber,
      symbol: basicElement.symbol,
      name: basicElement.name,
      atomic_mass: (basicElement.atomicNumber * 1.5 + 10).toFixed(2),
      // Add other default properties
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-2xl" role="status" aria-live="polite">Loading...</div>
      </div>
    )
  }

  if (!element) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-2xl" role="alert">Element not found</div>
      </main>
    )
  }

  const pageTitle = element ? `${element.name} (${element.symbol}) - Periodic Table` : 'Element Details'
  const pageDescription = element 
    ? `Detailed information about ${element.name} (${element.symbol}), atomic number ${element.atomicNumber}. View properties, 3D atom structure, and comprehensive element data.`
    : 'Element details page'

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={`https://periodictable.example.com/element/${atomicNumber}`} />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={pageDescription} />
        <link rel="canonical" href={`https://periodictable.example.com/element/${atomicNumber}`} />
      </Helmet>
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header with back button */}
        <button
          onClick={() => navigate('/')}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          aria-label="Navigate back to periodic table"
        >
          ← Back to Periodic Table
        </button>

        {/* Element Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="text-6xl font-bold" style={{ color: element.color }}>
              {element.symbol}
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-800">{element.name}</h1>
              <p className="text-xl text-gray-600">Atomic Number: {element.atomicNumber}</p>
            </div>
          </div>
        </div>

        {/* Fullscreen 3D Atom Structure Modal */}
        {isFullscreen && (
          <Atom3D 
            element={element} 
            fullscreen={true}
            onFullscreenToggle={() => setIsFullscreen(false)}
          />
        )}

        {/* 3D Atom Structure and Element Image Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* 3D Atom Structure */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">3D Atom Structure</h2>
            <Atom3D 
              element={element} 
              fullscreen={false}
              onFullscreenToggle={() => setIsFullscreen(true)}
            />
          </div>

          {/* Element Image */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Element Image</h2>
            <div className="flex justify-center items-center h-96 bg-gray-100 rounded-lg relative overflow-hidden">
              {!imageError ? (
                <img
                  src={`/images/elements/${element.symbol.toLowerCase()}.jpg`}
                  alt={`${element.name} element image`}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    // Try external URL if local image not found
                    if (e.target.src.includes('/images/elements/')) {
                      e.target.src = `https://images-of-elements.com/${element.symbol.toLowerCase()}.jpg`
                    } else {
                      // Both local and external failed, show placeholder
                      setImageError(true)
                    }
                  }}
                />
              ) : (
                <div 
                  className="w-full h-full flex items-center justify-center text-6xl font-bold text-white"
                  style={{ backgroundColor: element.color || '#E0E0E0' }}
                >
                  {element.symbol}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Property Tabs */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <PropertyTabs element={element} elementData={elementData} />
        </div>

        {/* Fun Fact Section */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-start gap-4">
            <div className="text-4xl">💡</div>
            <div>
              <h2 className="text-2xl font-bold mb-3">Did You Know?</h2>
              <p className="text-lg leading-relaxed">
                {getElementFact(element.atomicNumber)}
              </p>
            </div>
          </div>
        </div>
      </div>
      </main>
    </>
  )
}

export default ElementDetail
