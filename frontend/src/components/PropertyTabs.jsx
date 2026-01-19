import { useState } from 'react'

const PropertyTabs = ({ element, elementData }) => {
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    { id: 0, name: 'Atomic Properties', category: 'atomic' },
    { id: 1, name: 'Electronic Properties', category: 'electronic' },
    { id: 2, name: 'Periodic Properties', category: 'periodic' },
    { id: 3, name: 'Physical Properties', category: 'physical' },
    { id: 4, name: 'Chemical Properties', category: 'chemical' },
    { id: 5, name: 'Nuclear Properties', category: 'nuclear' },
    { id: 6, name: 'Structural Properties', category: 'structural' },
    { id: 7, name: 'Thermodynamic Properties', category: 'thermodynamic' },
    { id: 8, name: 'Optical Properties', category: 'optical' },
    { id: 9, name: 'Biological Properties', category: 'biological' },
    { id: 10, name: 'Classification', category: 'classification' },
  ]

  const getPropertyValue = (key, fallback = 'N/A') => {
    if (elementData && elementData[key]) {
      return elementData[key]
    }
    return fallback
  }

  const atomicMass = elementData?.atomic_mass || (element.atomicNumber * 1.5 + 10).toFixed(2)
  const neutrons = Math.round(atomicMass - element.atomicNumber)

  const renderAtomicProperties = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <PropertyCard title="1. Atomic Number (Z)" value={element.atomicNumber} description="Number of protons in the nucleus" />
      <PropertyCard title="2. Atomic Mass" value={`${atomicMass} amu`} description="Weighted average mass of all naturally occurring isotopes" />
      <PropertyCard title="3. Protons" value={element.atomicNumber} description="Number of protons = Atomic number" />
      <PropertyCard title="3. Neutrons" value={neutrons} description="Mass number − Atomic number" />
      <PropertyCard title="3. Electrons" value={element.atomicNumber} description="Electrons = Protons (neutral atom)" />
      <PropertyCard title="4. Isotopes" value={`${element.symbol}-${Math.round(atomicMass)}, ${element.symbol}-${Math.round(atomicMass) + 2}`} description="Same element, different number of neutrons" />
    </div>
  )

  const renderElectronicProperties = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <PropertyCard title="5. Electron Configuration" value={getElectronConfig(element.atomicNumber)} description="Arrangement of electrons in orbitals" />
      <PropertyCard title="6. Valence Electrons" value={getValenceElectrons(element.atomicNumber)} description="Electrons in the outermost shell" />
      <PropertyCard title="7. Oxidation States" value={getOxidationStates(element.group)} description="Possible charges an atom can have in compounds" />
      <PropertyCard title="8. Ionization Energy" value={getPropertyValue('ionization_energy', '~' + (element.atomicNumber * 10) + ' kJ/mol')} description="Energy required to remove an electron" />
      <PropertyCard title="9. Electron Affinity" value={getPropertyValue('electron_affinity', '~' + (element.group * 5) + ' kJ/mol')} description="Energy change when an atom gains an electron" />
      <PropertyCard title="10. Electronegativity" value={getElectronegativity(element.group, element.period)} description="Ability to attract electrons in a bond (Pauling scale)" />
    </div>
  )

  const renderPeriodicProperties = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <PropertyCard title="11. Atomic Radius" value={getPropertyValue('atomic_radius', '~' + (150 - element.atomicNumber * 0.5) + ' pm')} description="Size of an atom" />
      <PropertyCard title="12. Ionic Radius" value={getPropertyValue('ionic_radius', '~' + (120 - element.atomicNumber * 0.4) + ' pm')} description="Size of ions formed" />
      <PropertyCard title="13. Metallic/Non-metallic Character" value={element.category} description="Tendency to lose or gain electrons" />
      <PropertyCard title="14. Shielding Effect" value={element.atomicNumber > 10 ? 'Strong' : 'Weak'} description="Inner electrons reduce nuclear attraction on outer electrons" />
    </div>
  )

  const renderPhysicalProperties = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <PropertyCard title="15. State at Room Temperature" value={getStateAtRoomTemp(element)} description="Solid, liquid, or gas" />
      <PropertyCard title="16. Color & Appearance" value={getColorAppearance(element)} description="Visual characteristics" />
      <PropertyCard title="17. Density" value={getPropertyValue('density', '~' + (element.atomicNumber * 0.5) + ' g/cm³')} description="Mass per unit volume" />
      <PropertyCard title="18. Melting Point" value={getPropertyValue('melting_point', '~' + (element.group * 50) + '°C')} description="Temperature at which solid becomes liquid" />
      <PropertyCard title="19. Boiling Point" value={getPropertyValue('boiling_point', '~' + (element.group * 50 + 100) + '°C')} description="Temperature at which liquid becomes gas" />
      <PropertyCard title="20. Electrical Conductivity" value={element.category.includes('Metal') ? 'High' : 'Low'} description="Ability to conduct electricity" />
      <PropertyCard title="21. Thermal Conductivity" value={element.category.includes('Metal') ? 'High' : 'Low'} description="Ability to conduct heat" />
      <PropertyCard title="22. Hardness" value={getPropertyValue('hardness', 'Moderate')} description="Resistance to deformation or scratching" />
      <PropertyCard title="23. Malleability" value={element.category.includes('Metal') ? 'Yes' : 'No'} description="Ability to be hammered into sheets" />
      <PropertyCard title="24. Ductility" value={element.category.includes('Metal') ? 'Yes' : 'No'} description="Ability to be drawn into wires" />
      <PropertyCard title="25. Magnetic Properties" value={getPropertyValue('magnetic_properties', 'Paramagnetic')} description="Diamagnetic, paramagnetic, ferromagnetic" />
    </div>
  )

  const renderChemicalProperties = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <PropertyCard title="26. Reactivity" value={getReactivity(element)} description="How readily an element reacts" />
      <PropertyCard title="27. Types of Bonds Formed" value={getBondTypes(element)} description="Ionic, covalent, metallic" />
      <PropertyCard title="28. Acidity/Basicity" value={getAcidityBasicity(element)} description="Especially for oxides and hydroxides" />
      <PropertyCard title="29. Corrosion/Oxidation Behavior" value={getCorrosionBehavior(element)} description="Reaction with oxygen" />
      <PropertyCard title="30. Combustion Behavior" value={getCombustionBehavior(element)} description="Ability to burn in oxygen" />
    </div>
  )

  const renderNuclearProperties = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <PropertyCard title="31. Radioactivity" value={element.atomicNumber > 83 ? 'Radioactive' : 'Stable'} description="Stability of the nucleus" />
      <PropertyCard title="32. Half-Life" value={element.atomicNumber > 83 ? 'Varies' : 'Stable (no decay)'} description="Time required for half the radioactive atoms to decay" />
      <PropertyCard title="33. Nuclear Spin" value={getPropertyValue('nuclear_spin', '1/2')} description="Important in NMR spectroscopy" />
    </div>
  )

  const renderStructuralProperties = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <PropertyCard title="34. Crystal Structure" value={getPropertyValue('crystal_structure', element.category.includes('Metal') ? 'BCC/FCC' : 'Amorphous')} description="BCC, FCC, HCP, etc." />
      <PropertyCard title="35. Lattice Parameters" value={getPropertyValue('lattice_parameters', 'Varies')} description="Unit cell dimensions" />
      <PropertyCard title="36. Coordination Number" value={getPropertyValue('coordination_number', '6-12')} description="Number of nearest neighboring atoms" />
    </div>
  )

  const renderThermodynamicProperties = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <PropertyCard title="37. Enthalpy of Formation" value={getPropertyValue('enthalpy_formation', '~' + (element.group * 10) + ' kJ/mol')} description="Energy change during formation" />
      <PropertyCard title="38. Entropy" value={getPropertyValue('entropy', '~' + (element.atomicNumber * 2) + ' J/mol·K')} description="Measure of disorder" />
      <PropertyCard title="39. Heat Capacity" value={getPropertyValue('heat_capacity', '~' + (element.atomicNumber * 0.5) + ' J/mol·K')} description="Energy needed to raise temperature" />
    </div>
  )

  const renderOpticalProperties = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <PropertyCard title="40. Emission/Absorption Spectrum" value="Unique fingerprint" description="Unique spectral lines of the element" />
      <PropertyCard title="41. Refractive Index" value={getPropertyValue('refractive_index', 'N/A (varies with compound)')} description="For transparent elements or compounds" />
    </div>
  )

  const renderBiologicalProperties = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <PropertyCard title="42. Biological Role" value={getBiologicalRole(element)} description="Essential, toxic, or inert" />
      <PropertyCard title="43. Toxicity" value={getToxicity(element)} description="Effects on living organisms" />
      <PropertyCard title="44. Abundance" value={getAbundance(element)} description="In Earth's crust, atmosphere, or universe" />
    </div>
  )

  const renderClassificationProperties = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <PropertyCard title="45. Periodic Table Group" value={getGroupName(element.group, element.category)} description="Alkali metal, halogen, noble gas, etc." />
      <PropertyCard title="46. Block" value={`${element.block.toUpperCase()}-block`} description="s, p, d, f block" />
      <PropertyCard title="47. Natural or Synthetic" value={element.atomicNumber > 92 ? 'Synthetic' : 'Natural'} description="Found naturally or artificially created" />
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 0: return renderAtomicProperties()
      case 1: return renderElectronicProperties()
      case 2: return renderPeriodicProperties()
      case 3: return renderPhysicalProperties()
      case 4: return renderChemicalProperties()
      case 5: return renderNuclearProperties()
      case 6: return renderStructuralProperties()
      case 7: return renderThermodynamicProperties()
      case 8: return renderOpticalProperties()
      case 9: return renderBiologicalProperties()
      case 10: return renderClassificationProperties()
      default: return renderAtomicProperties()
    }
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Element Properties</h2>
      
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {renderTabContent()}
      </div>
    </div>
  )
}

const PropertyCard = ({ title, value, description }) => (
  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
    <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
    <p className="text-2xl font-bold text-blue-600 mb-2">{value}</p>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
)

// Helper functions for property calculations
function getElectronConfig(atomicNumber) {
  const configs = {
    1: '1s¹', 2: '1s²', 3: '1s² 2s¹', 4: '1s² 2s²', 5: '1s² 2s² 2p¹',
    6: '1s² 2s² 2p²', 7: '1s² 2s² 2p³', 8: '1s² 2s² 2p⁴', 9: '1s² 2s² 2p⁵',
    10: '1s² 2s² 2p⁶', 11: '[Ne] 3s¹', 12: '[Ne] 3s²', 13: '[Ne] 3s² 3p¹',
    18: '[Ne] 3s² 3p⁶', 19: '[Ar] 4s¹', 20: '[Ar] 4s²',
  }
  return configs[atomicNumber] || '[Previous]'
}

function getValenceElectrons(atomicNumber) {
  if (atomicNumber <= 2) return atomicNumber
  if (atomicNumber <= 10) return atomicNumber - 2
  if (atomicNumber <= 18) return atomicNumber - 10
  return (atomicNumber - 18) % 8 || 8
}

function getOxidationStates(group) {
  const states = {
    1: '+1', 2: '+2', 13: '+3', 14: '+4, -4', 15: '+5, -3',
    16: '+6, -2', 17: '-1, +1, +3, +5, +7', 18: '0 (rare)'
  }
  return states[group] || 'Varies'
}

function getElectronegativity(group, period) {
  if (group === 1) return '0.9-1.0'
  if (group === 17) return '2.5-4.0'
  if (group === 18) return 'N/A'
  return (1.5 + (group / 10)).toFixed(1)
}

function getStateAtRoomTemp(element) {
  if (element.symbol === 'Hg' || element.symbol === 'Br') return 'Liquid'
  if (element.symbol === 'H' || element.symbol === 'N' || element.symbol === 'O' || 
      element.symbol === 'F' || element.symbol === 'Cl' || element.group === 18) return 'Gas'
  return 'Solid'
}

function getColorAppearance(element) {
  if (element.symbol === 'Au') return 'Yellow, metallic'
  if (element.symbol === 'Cu') return 'Reddish-brown, metallic'
  if (element.symbol === 'Ag') return 'Silver, metallic'
  return 'Varies'
}

function getReactivity(element) {
  if (element.group === 1) return 'Very High'
  if (element.group === 17) return 'Very High'
  if (element.group === 18) return 'Noble (inert)'
  return 'Moderate'
}

function getBondTypes(element) {
  if (element.category.includes('Metal')) return 'Metallic, Ionic'
  if (element.group === 17 || element.group === 16) return 'Covalent, Ionic'
  return 'Covalent, Ionic'
}

function getAcidityBasicity(element) {
  if (element.group === 1 || element.group === 2) return 'Basic oxides'
  if (element.group === 16 || element.group === 17) return 'Acidic oxides'
  return 'Amphoteric'
}

function getCorrosionBehavior(element) {
  if (element.symbol === 'Fe') return 'Rusts (oxidizes)'
  if (element.symbol === 'Al') return 'Forms protective oxide layer'
  return 'Varies'
}

function getCombustionBehavior(element) {
  if (element.group === 1) return 'Burns vigorously'
  if (element.group === 18) return 'Non-combustible'
  return 'Moderate'
}

function getBiologicalRole(element) {
  const essential = ['H', 'C', 'N', 'O', 'P', 'S', 'Na', 'Mg', 'K', 'Ca', 'Fe', 'Zn', 'Cu', 'Mn', 'I']
  const toxic = ['Pb', 'Hg', 'Cd', 'As', 'Th', 'U']
  if (essential.includes(element.symbol)) return 'Essential'
  if (toxic.includes(element.symbol)) return 'Toxic'
  return 'Neutral/Irrelevant'
}

function getToxicity(element) {
  const toxic = ['Pb', 'Hg', 'Cd', 'As']
  if (toxic.includes(element.symbol)) return 'Highly toxic'
  return 'Low to moderate'
}

function getAbundance(element) {
  if (element.symbol === 'O') return 'Most abundant in crust (46.6%)'
  if (element.symbol === 'Si') return '2nd most abundant (27.7%)'
  if (element.symbol === 'H') return 'Most abundant in universe (75%)'
  return 'Varies'
}

function getGroupName(group, category) {
  if (category.includes('Alkali Metal')) return 'Alkali Metal'
  if (category.includes('Alkaline Earth')) return 'Alkaline Earth Metal'
  if (category.includes('Halogen')) return 'Halogen'
  if (category.includes('Noble Gas')) return 'Noble Gas'
  if (category.includes('Transition Metal')) return 'Transition Metal'
  return category
}

export default PropertyTabs