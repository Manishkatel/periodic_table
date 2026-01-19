import { useMemo } from 'react'
import { Sphere } from '@react-three/drei'
import * as THREE from 'three'

// S Orbital - Spherical shape
const SOrbital = ({ radius, color, opacity = 0.15 }) => {
  return (
    <Sphere args={[radius, 32, 32]}>
      <meshStandardMaterial 
        color={color} 
        transparent 
        opacity={opacity}
        emissive={color}
        emissiveIntensity={0.3}
        wireframe={true}
      />
    </Sphere>
  )
}

// P Orbital - Dumbbell shape (one orientation)
const POrbital = ({ radius, color, orientation = 'x', opacity = 0.2 }) => {
  const shape = useMemo(() => {
    const points = []
    const segments = 32
    
    for (let i = 0; i <= segments; i++) {
      const t = (i / segments - 0.5) * 2
      const r = Math.sqrt(1 - t * t) * radius * 0.8
      
      if (orientation === 'x') {
        points.push(new THREE.Vector3(t * radius, r * Math.cos(i * 0.2), r * Math.sin(i * 0.2)))
      } else if (orientation === 'y') {
        points.push(new THREE.Vector3(r * Math.cos(i * 0.2), t * radius, r * Math.sin(i * 0.2)))
      } else { // z
        points.push(new THREE.Vector3(r * Math.cos(i * 0.2), r * Math.sin(i * 0.2), t * radius))
      }
    }
    
    // Create torus knot for dumbbell shape
    const geometry = new THREE.TorusKnotGeometry(radius * 0.3, radius * 0.1, 64, 8, 2, 3)
    return geometry
  }, [radius, orientation])
  
  return (
    <mesh geometry={shape}>
      <meshStandardMaterial 
        color={color} 
        transparent 
        opacity={opacity}
        emissive={color}
        emissiveIntensity={0.3}
        wireframe={true}
      />
    </mesh>
  )
}

// Simplified P Orbital using two spheres
const POrbitalDumbbell = ({ radius, color, orientation = 'x', opacity = 0.25 }) => {
  const positions = {
    'x': [[radius * 0.6, 0, 0], [-radius * 0.6, 0, 0]],
    'y': [[0, radius * 0.6, 0], [0, -radius * 0.6, 0]],
    'z': [[0, 0, radius * 0.6], [0, 0, -radius * 0.6]]
  }
  
  const pos = positions[orientation] || positions['x']
  
  return (
    <group>
      <Sphere args={[radius * 0.4, 16, 16]} position={pos[0]}>
        <meshStandardMaterial 
          color={color} 
          transparent 
          opacity={opacity}
          emissive={color}
          emissiveIntensity={0.3}
          wireframe={true}
        />
      </Sphere>
      <Sphere args={[radius * 0.4, 16, 16]} position={pos[1]}>
        <meshStandardMaterial 
          color={color} 
          transparent 
          opacity={opacity}
          emissive={color}
          emissiveIntensity={0.3}
          wireframe={true}
        />
      </Sphere>
    </group>
  )
}

// D Orbital - Cloverleaf shape (simplified as 4-lobed structure)
const DOrbital = ({ radius, color, orientation = 'xy', opacity = 0.2 }) => {
  const lobes = useMemo(() => {
    // Create 4 lobes in a plane
    const lobes = []
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2
      lobes.push([
        radius * 0.5 * Math.cos(angle),
        radius * 0.5 * Math.sin(angle),
        0
      ])
    }
    return lobes
  }, [radius])
  
  return (
    <group>
      {lobes.map((pos, i) => (
        <Sphere key={i} args={[radius * 0.25, 12, 12]} position={pos}>
          <meshStandardMaterial 
            color={color} 
            transparent 
            opacity={opacity}
            emissive={color}
            emissiveIntensity={0.3}
            wireframe={true}
          />
        </Sphere>
      ))}
    </group>
  )
}

// Render orbital shapes based on type
export const OrbitalShape = ({ orbital, radius, color, electronCount, opacity = 0.2 }) => {
  const orbitalType = orbital[1] // s, p, d, or f
  const principal = parseInt(orbital[0])
  
  if (orbitalType === 's') {
    return <SOrbital radius={radius} color={color} opacity={opacity} />
  } else if (orbitalType === 'p') {
    // P orbitals come in 3 orientations: px, py, pz
    const orientations = ['x', 'y', 'z']
    const activeOrientations = Math.min(electronCount, 3)
    
    return (
      <group>
        {Array.from({ length: activeOrientations }).map((_, i) => (
          <POrbitalDumbbell 
            key={i}
            radius={radius} 
            color={color} 
            orientation={orientations[i]}
            opacity={opacity}
          />
        ))}
      </group>
    )
  } else if (orbitalType === 'd') {
    // D orbitals have 5 orientations, simplified here
    return <DOrbital radius={radius} color={color} opacity={opacity} />
  } else if (orbitalType === 'f') {
    // F orbitals are very complex, show as distributed spheres
    return (
      <group>
        {Array.from({ length: Math.min(electronCount, 7) }).map((_, i) => {
          const angle = (i / Math.min(electronCount, 7)) * Math.PI * 2
          const x = radius * 0.6 * Math.cos(angle)
          const y = radius * 0.6 * Math.sin(angle)
          const z = (i % 2 === 0 ? 1 : -1) * radius * 0.3
          return (
            <Sphere key={i} args={[radius * 0.2, 8, 8]} position={[x, y, z]}>
              <meshStandardMaterial 
                color={color} 
                transparent 
                opacity={opacity}
                emissive={color}
                emissiveIntensity={0.3}
                wireframe={true}
              />
            </Sphere>
          )
        })}
      </group>
    )
  }
  
  return null
}