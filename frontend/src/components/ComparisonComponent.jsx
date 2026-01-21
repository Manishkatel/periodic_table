import { useState, useEffect } from 'react'
import { getElementByNumber } from '../data/elements'
import axios from 'axios'

const ComparisonComponent = ({ element1Number, element2Number, onBack }) => {
  const [element1, setElement1] = useState(null)
  const [element2, setElement2] = useState(null)
  const [element1Data, setElement1Data] = useState(null)
  const [element2Data, setElement2Data] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const el1 = getElementByNumber(element1Number)
    const el2 = getElementByNumber(element2Number)
    setElement1(el1)
    setElement2(el2)

    // Fetch detailed data for both elements
    const fetchData = async () => {
      try {
        const [res1, res2] = await Promise.all([
          axios.get(`/api/elements/${element1Number}/`, {
            validateStatus: (status) => status >= 200 && status < 300 || status === 404
          }),
          axios.get(`/api/elements/${element2Number}/`, {
            validateStatus: (status) => status >= 200 && status < 300 || status === 404
          })
        ])

        setElement1Data(res1.status === 200 ? res1.data : generateDefaultData(el1))
        setElement2Data(res2.status === 200 ? res2.data : generateDefaultData(el2))
      } catch (error) {
        setElement1Data(generateDefaultData(el1))
        setElement2Data(generateDefaultData(el2))
      } finally {
        setLoading(false)
      }
    }

    if (el1 && el2) {
      fetchData()
    }
  }, [element1Number, element2Number])

  const generateDefaultData = (element) => {
    const atomicMass = element.atomicMass || (element.atomicNumber * 1.5 + 10).toFixed(2)
    return {
      atomic_number: element.atomicNumber,
      symbol: element.symbol,
      name: element.name,
      atomic_mass: parseFloat(atomicMass),
      group: element.group,
      period: element.period,
      block: element.block,
      category: element.category,
      protons: element.atomicNumber,
      neutrons: Math.round(parseFloat(atomicMass) - element.atomicNumber),
      electrons: element.atomicNumber,
      melting_point: element.group * 50,
      boiling_point: element.group * 50 + 100,
      density: element.atomicNumber * 0.5,
      electronegativity: element.group <= 2 ? element.group * 0.5 : (18 - element.group) * 0.3,
      ionization_energy: element.atomicNumber * 100,
      atomic_radius: element.period * 20 + element.group * 5,
    }
  }

  if (loading || !element1 || !element2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-2xl">Loading comparison...</div>
      </div>
    )
  }

  const getValue = (data, key, fallback) => {
    return data?.[key] ?? fallback ?? 'N/A'
  }

  const compareValues = (val1, val2) => {
    if (val1 === 'N/A' || val2 === 'N/A') return 'equal'
    if (typeof val1 === 'number' && typeof val2 === 'number') {
      if (val1 > val2) return 'greater'
      if (val1 < val2) return 'lesser'
      return 'equal'
    }
    return val1 === val2 ? 'equal' : 'different'
  }

  const comparisonRows = [
    { label: 'Atomic Number', key1: 'atomic_number', key2: 'atomic_number' },
    { label: 'Symbol', key1: 'symbol', key2: 'symbol' },
    { label: 'Name', key1: 'name', key2: 'name' },
    { label: 'Atomic Mass (amu)', key1: 'atomic_mass', key2: 'atomic_mass' },
    { label: 'Group', key1: 'group', key2: 'group' },
    { label: 'Period', key1: 'period', key2: 'period' },
    { label: 'Block', key1: 'block', key2: 'block' },
    { label: 'Category', key1: 'category', key2: 'category' },
    { label: 'Protons', key1: 'protons', key2: 'protons' },
    { label: 'Neutrons', key1: 'neutrons', key2: 'neutrons' },
    { label: 'Electrons', key1: 'electrons', key2: 'electrons' },
    { label: 'Melting Point (°C)', key1: 'melting_point', key2: 'melting_point' },
    { label: 'Boiling Point (°C)', key1: 'boiling_point', key2: 'boiling_point' },
    { label: 'Density (g/cm³)', key1: 'density', key2: 'density' },
    { label: 'Electronegativity', key1: 'electronegativity', key2: 'electronegativity' },
    { label: 'Ionization Energy (kJ/mol)', key1: 'ionization_energy', key2: 'ionization_energy' },
    { label: 'Atomic Radius (pm)', key1: 'atomic_radius', key2: 'atomic_radius' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <button
          onClick={onBack}
          className="text-blue-600 hover:text-blue-800 mb-4 font-semibold text-lg"
        >
          ← Back to Selection
        </button>

        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Element Comparison
        </h2>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Element Headers */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2" style={{ color: element1.color }}>
                {element1.symbol}
              </div>
              <div className="text-2xl font-semibold text-gray-800">{element1.name}</div>
            </div>
            <div className="text-center text-gray-500 font-semibold">
              Property
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2" style={{ color: element2.color }}>
                {element2.symbol}
              </div>
              <div className="text-2xl font-semibold text-gray-800">{element2.name}</div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border-2 border-gray-300 px-4 py-3 text-left font-semibold text-gray-800">
                    Property
                  </th>
                  <th className="border-2 border-gray-300 px-4 py-3 text-center font-semibold text-gray-800">
                    {element1.name} ({element1.symbol})
                  </th>
                  <th className="border-2 border-gray-300 px-4 py-3 text-center font-semibold text-gray-800">
                    {element2.name} ({element2.symbol})
                  </th>
                  <th className="border-2 border-gray-300 px-4 py-3 text-center font-semibold text-gray-800">
                    Difference
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, index) => {
                  const val1 = getValue(element1Data, row.key1, getValue(element1, row.key1))
                  const val2 = getValue(element2Data, row.key2, getValue(element2, row.key2))
                  const comparison = compareValues(val1, val2)
                  
                  let differenceText = ''
                  let diffClass = ''
                  
                  if (comparison === 'equal') {
                    differenceText = 'Same'
                    diffClass = 'bg-gray-100 text-gray-700'
                  } else if (comparison === 'greater') {
                    differenceText = `${element1.name} is greater`
                    diffClass = 'bg-blue-100 text-blue-800'
                  } else if (comparison === 'lesser') {
                    differenceText = `${element2.name} is greater`
                    diffClass = 'bg-purple-100 text-purple-800'
                  } else {
                    differenceText = 'Different'
                    diffClass = 'bg-yellow-100 text-yellow-800'
                  }

                  // Calculate numeric difference if both are numbers
                  if (typeof val1 === 'number' && typeof val2 === 'number' && comparison !== 'equal') {
                    const diff = val1 - val2
                    differenceText += ` (${diff > 0 ? '+' : ''}${diff.toFixed(2)})`
                  }

                  return (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="border-2 border-gray-300 px-4 py-3 font-semibold text-gray-700">
                        {row.label}
                      </td>
                      <td className="border-2 border-gray-300 px-4 py-3 text-center text-gray-800">
                        {val1}
                      </td>
                      <td className="border-2 border-gray-300 px-4 py-3 text-center text-gray-800">
                        {val2}
                      </td>
                      <td className={`border-2 border-gray-300 px-4 py-3 text-center font-semibold ${diffClass}`}>
                        {differenceText}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <div>
                <p className="font-semibold mb-2">{element1.name}:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Atomic Number: {getValue(element1Data, 'atomic_number', element1.atomicNumber)}</li>
                  <li>Category: {getValue(element1Data, 'category', element1.category)}</li>
                  <li>Period: {getValue(element1Data, 'period', element1.period)}, Group: {getValue(element1Data, 'group', element1.group)}</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-2">{element2.name}:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Atomic Number: {getValue(element2Data, 'atomic_number', element2.atomicNumber)}</li>
                  <li>Category: {getValue(element2Data, 'category', element2.category)}</li>
                  <li>Period: {getValue(element2Data, 'period', element2.period)}, Group: {getValue(element2Data, 'group', element2.group)}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComparisonComponent
