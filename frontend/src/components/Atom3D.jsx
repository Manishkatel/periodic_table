import { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Sphere } from '@react-three/drei'
import * as THREE from 'three'

// Individual Proton component
const Proton = ({ position }) => {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05
      meshRef.current.scale.setScalar(scale)
    }
  })
  
  return (
    <Sphere ref={meshRef} args={[0.06, 32, 32]} position={position}>
      <meshStandardMaterial 
        color="#FF4444" 
        emissive="#FF0000" 
        emissiveIntensity={0.9}
        metalness={0.4}
        roughness={0.1}
      />
    </Sphere>
  )
}

// Individual Neutron component
const Neutron = ({ position }) => {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + 1) * 0.05
      meshRef.current.scale.setScalar(scale)
    }
  })
  
  return (
    <Sphere ref={meshRef} args={[0.06, 32, 32]} position={position}>
      <meshStandardMaterial 
        color="#6B7FFF" 
        emissive="#4444FF" 
        emissiveIntensity={0.7}
        metalness={0.4}
        roughness={0.1}
      />
    </Sphere>
  )
}

// Nucleus with glow effects
const Nucleus = ({ protons, neutrons }) => {
  const nucleons = []
  const totalNucleons = protons + neutrons
  
  // For small nuclei, use tighter packing
  if (totalNucleons <= 4) {
    const positions = [
      [0, 0, 0],
      [0.12, 0, 0],
      [-0.06, 0.1, 0],
      [-0.06, -0.1, 0],
    ]
    
    for (let i = 0; i < totalNucleons; i++) {
      if (i < protons) {
        nucleons.push({ type: 'proton', position: positions[i] })
      } else {
        nucleons.push({ type: 'neutron', position: positions[i] })
      }
    }
  } else {
    // For larger nuclei, use spherical packing
    const nucleusRadius = Math.min(0.35, 0.12 + (totalNucleons / 120))
    
    for (let i = 0; i < totalNucleons; i++) {
      const theta = Math.acos(1 - (2 * (i + 0.5)) / totalNucleons)
      const phi = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5)
      const r = nucleusRadius * Math.sqrt((i + 0.5) / totalNucleons) * 0.85
      
      const x = r * Math.sin(theta) * Math.cos(phi)
      const y = r * Math.sin(theta) * Math.sin(phi)
      const z = r * Math.cos(theta)
      
      if (i < protons) {
        nucleons.push({ type: 'proton', position: [x, y, z] })
      } else {
        nucleons.push({ type: 'neutron', position: [x, y, z] })
      }
    }
  }

  return (
    <group>
      {/* Glow effects */}
      <Sphere args={[0.25, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#FFFFFF" 
          transparent 
          opacity={0.05}
          emissive="#FFAA44"
          emissiveIntensity={0.3}
        />
      </Sphere>
      <Sphere args={[0.18, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#FFAA44" 
          transparent 
          opacity={0.1}
          emissive="#FFAA44"
          emissiveIntensity={0.5}
        />
      </Sphere>
      
      {nucleons.map((nucleon, index) => 
        nucleon.type === 'proton' ? (
          <Proton key={`proton-${index}`} position={nucleon.position} />
        ) : (
          <Neutron key={`neutron-${index}`} position={nucleon.position} />
        )
      )}
    </group>
  )
}

// Orbit path line visualization
const OrbitPath = ({ radius, color, tilt, showOrbits }) => {
  const geometry = useMemo(() => {
    if (!showOrbits) return null
    
    const points = []
    const segments = 64
    
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      const x = radius * Math.cos(angle)
      const y = radius * Math.sin(angle) * Math.cos(tilt)
      const z = radius * Math.sin(angle) * Math.sin(tilt)
      points.push(new THREE.Vector3(x, y, z))
    }
    
    return new THREE.BufferGeometry().setFromPoints(points)
  }, [radius, tilt, showOrbits])
  
  if (!showOrbits || !geometry) return null
  
  return (
    <line geometry={geometry}>
      <lineBasicMaterial 
        color={color} 
        transparent 
        opacity={0.15}
      />
    </line>
  )
}

// Animated Electron
const OrbitingElectron = ({ radius, speed, phase, color, tilt }) => {
  const electronRef = useRef()
  
  useFrame((state) => {
    if (electronRef.current) {
      const time = state.clock.elapsedTime
      const angle = time * speed + phase
      
      const x = radius * Math.cos(angle)
      const y = radius * Math.sin(angle) * Math.cos(tilt)
      const z = radius * Math.sin(angle) * Math.sin(tilt)
      
      electronRef.current.position.set(x, y, z)
    }
  })

  return (
    <group ref={electronRef}>
      {/* Electron glow */}
      <Sphere args={[0.08, 16, 16]}>
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={0.3}
        />
      </Sphere>
      {/* Electron */}
      <Sphere args={[0.05, 24, 24]}>
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={1.2}
          metalness={0.8}
          roughness={0.1}
        />
      </Sphere>
    </group>
  )
}

const Atom3DCanvas = ({ element, showOrbits }) => {
  if (!element) return null

  // Calculate accurate electron configuration
  const electronConfig = calculateElectronConfiguration(element.atomicNumber)
  const electronOrbits = calculateElectronOrbits(electronConfig)
  
  const protons = element.atomicNumber
  const neutrons = Math.round((element.atomicMass || (element.atomicNumber * 1.5 + 10)) - element.atomicNumber)

  return (
    <Canvas 
      camera={{ position: [0, 0, 8], fov: 50 }}
      gl={{ antialias: true }}
      onCreated={({ scene }) => {
        scene.background = new THREE.Color('#0a0a1a')
        scene.fog = new THREE.Fog('#0a0a1a', 5, 20)
      }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <pointLight position={[-10, -10, -10]} color="#0066FF" intensity={1.0} />
      <pointLight position={[0, 10, -10]} color="#FF00FF" intensity={0.7} />
      <pointLight position={[10, -10, 10]} color="#00FF88" intensity={0.6} />
      
      {/* Nucleus */}
      <Nucleus protons={protons} neutrons={neutrons} />
      
      {/* Electrons with orbit paths */}
      {electronOrbits.map((orbit, orbitIndex) => 
        orbit.electrons.map((electron, electronIndex) => (
          <group key={`electron-${orbitIndex}-${electronIndex}`}>
            <OrbitPath 
              radius={orbit.radius} 
              color={orbit.color} 
              tilt={electron.tilt}
              showOrbits={showOrbits}
            />
            <OrbitingElectron
              radius={orbit.radius}
              speed={orbit.speed}
              phase={electron.phase}
              color={orbit.color}
              tilt={electron.tilt}
            />
          </group>
        ))
      )}
      
      <OrbitControls 
        enableZoom={true} 
        enablePan={false} 
        enableDamping={true} 
        dampingFactor={0.05}
        minDistance={3}
        maxDistance={15}
        autoRotate={false}
        rotateSpeed={1.0}
      />
    </Canvas>
  )
}

// Format electron configuration with superscripts
function formatElectronConfig(config) {
  const superscripts = '⁰¹²³⁴⁵⁶⁷⁸⁹¹⁰¹¹¹²¹³¹⁴'
  return Object.entries(config)
    .map(([orbital, count]) => {
      if (count <= 14) {
        return `${orbital}${superscripts[count]}`
      }
      return `${orbital}${count}`
    })
    .join(' ')
}

// Calculate electron configuration using Aufbau principle
function calculateElectronConfiguration(atomicNumber) {
  const orbitalOrder = [
    { orbital: '1s', max: 2 },
    { orbital: '2s', max: 2 },
    { orbital: '2p', max: 6 },
    { orbital: '3s', max: 2 },
    { orbital: '3p', max: 6 },
    { orbital: '4s', max: 2 },
    { orbital: '3d', max: 10 },
    { orbital: '4p', max: 6 },
    { orbital: '5s', max: 2 },
    { orbital: '4d', max: 10 },
    { orbital: '5p', max: 6 },
    { orbital: '6s', max: 2 },
    { orbital: '4f', max: 14 },
    { orbital: '5d', max: 10 },
    { orbital: '6p', max: 6 },
    { orbital: '7s', max: 2 },
    { orbital: '5f', max: 14 },
    { orbital: '6d', max: 10 },
    { orbital: '7p', max: 6 },
  ]

  const exceptions = {
    24: { '3d': 5, '4s': 1 },
    29: { '3d': 10, '4s': 1 },
    41: { '4d': 4, '5s': 1 },
    42: { '4d': 5, '5s': 1 },
    44: { '4d': 7, '5s': 1 },
    45: { '4d': 8, '5s': 1 },
    46: { '4d': 10, '5s': 0 },
    47: { '4d': 10, '5s': 1 },
    57: { '5d': 1, '6s': 2 },
    58: { '4f': 1, '5d': 1, '6s': 2 },
    64: { '4f': 7, '5d': 1, '6s': 2 },
    78: { '5d': 9, '6s': 1 },
    79: { '5d': 10, '6s': 1 },
    89: { '6d': 1, '7s': 2 },
    90: { '5f': 2, '6d': 0, '7s': 2 },
    91: { '5f': 2, '6d': 1, '7s': 2 },
    92: { '5f': 3, '6d': 1, '7s': 2 },
    93: { '5f': 4, '6d': 1, '7s': 2 },
    96: { '5f': 7, '6d': 1, '7s': 2 },
  }

  if (exceptions[atomicNumber]) {
    return exceptions[atomicNumber]
  }

  const config = {}
  let remainingElectrons = atomicNumber

  for (const { orbital, max } of orbitalOrder) {
    if (remainingElectrons <= 0) break
    const electrons = Math.min(remainingElectrons, max)
    config[orbital] = electrons
    remainingElectrons -= electrons
  }

  return config
}

// Calculate electron orbits with circular paths
function calculateElectronOrbits(config) {
  const orbits = []
  const shellColors = {
    1: '#FFD700', // Gold for K shell
    2: '#00FF00', // Green for L shell
    3: '#00BFFF', // Blue for M shell
    4: '#FF69B4', // Pink for N shell
    5: '#FF6347', // Tomato for O shell
    6: '#9370DB', // Purple for P shell
    7: '#FFA500', // Orange for Q shell
  }

  const orbitalRadii = {
    '1s': 1.2,
    '2s': 2.0,
    '2p': 2.0,
    '3s': 2.8,
    '3p': 2.8,
    '3d': 2.8,
    '4s': 3.6,
    '4p': 3.6,
    '4d': 3.6,
    '4f': 3.6,
    '5s': 4.4,
    '5p': 4.4,
    '5d': 4.4,
    '5f': 4.4,
    '6s': 5.2,
    '6p': 5.2,
    '6d': 5.2,
    '7s': 6.0,
    '7p': 6.0,
  }

  const getPrincipalQuantumNumber = (orbital) => parseInt(orbital[0])

  for (const [orbital, count] of Object.entries(config)) {
    if (count === 0) continue
    
    const principal = getPrincipalQuantumNumber(orbital)
    const radius = orbitalRadii[orbital] || (principal * 1.2)
    const color = shellColors[principal] || '#FFFFFF'
    const baseSpeed = 0.5 / principal
    
    const electronsPerOrbit = Math.min(count, 8)
    const numOrbits = Math.ceil(count / electronsPerOrbit)

    for (let orbitIndex = 0; orbitIndex < numOrbits; orbitIndex++) {
      const electronsInThisOrbit = Math.min(electronsPerOrbit, count - orbitIndex * electronsPerOrbit)
      const orbitTilt = (orbitIndex / numOrbits) * Math.PI
      
      const electrons = []
      for (let i = 0; i < electronsInThisOrbit; i++) {
        const phase = (i / electronsInThisOrbit) * Math.PI * 2
        const tilt = orbitTilt + (Math.random() - 0.5) * 0.3
        electrons.push({ phase, tilt })
      }

      orbits.push({
        radius: radius + (orbitIndex * 0.1),
        speed: baseSpeed * (1 + orbitIndex * 0.1),
        color,
        electrons: electrons,
      })
    }
  }

  return orbits
}

const Atom3D = ({ element, fullscreen = false, onFullscreenToggle }) => {
  const [showOrbits, setShowOrbits] = useState(true)

  if (!element) return null

  const neutrons = Math.round((element.atomicMass || (element.atomicNumber * 1.5 + 10)) - element.atomicNumber)
  const electronConfig = calculateElectronConfiguration(element.atomicNumber)
  const configString = formatElectronConfig(electronConfig)

  const containerClass = fullscreen 
    ? "fixed inset-0 z-50 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900" 
    : "w-full h-96 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 rounded-xl overflow-hidden shadow-2xl relative"

  return (
    <div className={containerClass}>
      {/* Fullscreen close button */}
      {fullscreen && (
        <button
          onClick={onFullscreenToggle}
          className="absolute top-4 right-4 z-20 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 text-lg shadow-lg"
          title="Exit Fullscreen"
        >
          <span>✕</span> Close
        </button>
      )}

      {/* 3D Canvas */}
      <Atom3DCanvas element={element} showOrbits={showOrbits} />

      {/* Fullscreen Controls and Info Panel */}
      {fullscreen && (
        <>
          {/* Controls Panel - Show Orbit Paths Toggle */}
          <div className="absolute top-4 left-4 z-10">
            <div className="bg-black bg-opacity-70 backdrop-blur-sm rounded-lg p-3 text-white space-y-2">
              <h3 className="font-bold text-sm mb-2 text-cyan-300">Controls</h3>
              
              <label className="flex items-center gap-2 text-xs cursor-pointer hover:text-cyan-300 transition-colors">
                <input 
                  type="checkbox" 
                  checked={showOrbits} 
                  onChange={(e) => setShowOrbits(e.target.checked)}
                  className="w-4 h-4"
                />
                Show Orbit Paths
              </label>
              
              <div className="pt-2 border-t border-gray-600">
                <p className="text-xs text-gray-400">💡 Drag to rotate • Scroll to zoom</p>
              </div>
            </div>
          </div>

          {/* Info Panel with Beautiful Boxes */}
          <div className="absolute bottom-4 right-4 z-10 bg-black bg-opacity-70 backdrop-blur-sm px-4 py-3 rounded-lg text-white max-w-sm">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {element.name}
              </h2>
              <p className="text-lg text-gray-300">
                <span className="font-mono font-bold text-cyan-300">{element.symbol}</span>
                {' '}· Atomic #{element.atomicNumber}
              </p>
              
              <div className="grid grid-cols-3 gap-2 pt-2 text-xs">
                <div className="bg-red-900 bg-opacity-40 rounded p-2 border border-red-500">
                  <div className="text-red-300 font-semibold">Protons</div>
                  <div className="text-xl font-bold">{element.atomicNumber}</div>
                </div>
                <div className="bg-blue-900 bg-opacity-40 rounded p-2 border border-blue-500">
                  <div className="text-blue-300 font-semibold">Neutrons</div>
                  <div className="text-xl font-bold">{neutrons}</div>
                </div>
                <div className="bg-yellow-900 bg-opacity-40 rounded p-2 border border-yellow-500">
                  <div className="text-yellow-300 font-semibold">Electrons</div>
                  <div className="text-xl font-bold">{element.atomicNumber}</div>
                </div>
              </div>
              
              <div className="pt-2 border-t border-gray-600 mt-2">
                <p className="text-xs text-gray-400">Electron Configuration</p>
                <p className="text-sm font-mono text-cyan-300 break-all">{configString}</p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Fullscreen button (only when not fullscreen) */}
      {!fullscreen && (
        <button
          onClick={onFullscreenToggle}
          className="absolute top-2 right-2 z-10 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm shadow-lg"
          title="View in Fullscreen"
        >
          <span>⛶</span> Fullscreen
        </button>
      )}
    </div>
  )
}

export default Atom3D
