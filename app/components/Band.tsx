
// "use client";

// import * as THREE from 'three'
// import { useRef, useState, useMemo, useEffect } from 'react'
// import { useFrame, extend, useThree } from '@react-three/fiber'
// import { useGLTF, useTexture } from '@react-three/drei'
// import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier'
// import { MeshLineGeometry, MeshLineMaterial } from 'meshline'

// extend({ MeshLineGeometry, MeshLineMaterial })

// interface BandProps {
//   maxSpeed?: number
//   minSpeed?: number
//   textureUrl?: string
// }

// export default function Band({ 
//   maxSpeed = 50, 
//   minSpeed = 10,
//   textureUrl = 'https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/SOT1hmCesOHxEYxL7vkoZ/c57b29c85912047c414311723320c16b/band.jpg' 
// }: BandProps) {
//   const band = useRef<THREE.Mesh>(null)
//   const fixed = useRef<React.ElementRef<typeof RigidBody>>(null)
//   const j1 = useRef<React.ElementRef<typeof RigidBody>>(null)
//   const j2 = useRef<React.ElementRef<typeof RigidBody>>(null)
//   const j3 = useRef<React.ElementRef<typeof RigidBody>>(null)
//   const card = useRef<React.ElementRef<typeof RigidBody>>(null)
  
//   const vec = new THREE.Vector3(), ang = new THREE.Vector3(), rot = new THREE.Vector3(), dir = new THREE.Vector3()
//   const segmentProps = { canSleep: true, colliders: false as const, angularDamping: 2, linearDamping: 2 }
  
//   const { nodes, materials } = useGLTF('https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/5huRVDzcoDwnbgrKUo1Lzs/53b6dd7d6b4ffcdbd338fa60265949e1/tag.glb')
  
//   // 👇 FIX START: Clone the texture safely
//   const texture = useTexture(textureUrl)
// //   const texture = useMemo(() => {
// //     const t = _texture.clone()
// //     t.wrapS = t.wrapT = THREE.RepeatWrapping
// //     // Optional: Adjust repeat/offset here if the cord looks weird
// //     // t.repeat.set(1, 1) 
// //     return t
// //   }, [_texture])
//   // 👆 FIX END

//   const { width, height } = useThree((state) => state.size)
//   const curve = useMemo(() => {
//     const c = new THREE.CatmullRomCurve3([
//       new THREE.Vector3(),
//       new THREE.Vector3(),
//       new THREE.Vector3(),
//       new THREE.Vector3(),
//     ]);
//     c.curveType = "chordal";
//     return c;
//   }, []);
//   const [dragged, drag] = useState<THREE.Vector3 | null>(null)
//   const [hovered, hover] = useState(false)
//   const lineGeom = useRef<MeshLineGeometry>(null)

//   useRopeJoint(fixed as React.RefObject<React.ElementRef<typeof RigidBody>>, j1 as React.RefObject<React.ElementRef<typeof RigidBody>>, [[0, 0, 0], [0, 0, 0], 1])
//   useRopeJoint(j1 as React.RefObject<React.ElementRef<typeof RigidBody>>, j2 as React.RefObject<React.ElementRef<typeof RigidBody>>, [[0, 0, 0], [0, 0, 0], 1])
//   useRopeJoint(j2 as React.RefObject<React.ElementRef<typeof RigidBody>>, j3 as React.RefObject<React.ElementRef<typeof RigidBody>>, [[0, 0, 0], [0, 0, 0], 1])
//   useSphericalJoint(j3 as React.RefObject<React.ElementRef<typeof RigidBody>>, card as React.RefObject<React.ElementRef<typeof RigidBody>>, [[0, 0, 0], [0, 1.45, 0]])

//   useEffect(() => {
//     if (hovered) {
//       document.body.style.cursor = dragged ? 'grabbing' : 'grab'
//       return () => void (document.body.style.cursor = 'auto')
//     }
//   }, [hovered, dragged])

//   const j1Lerped = useRef<THREE.Vector3 | null>(null);
//   const j2Lerped = useRef<THREE.Vector3 | null>(null);

//   useFrame((state, delta) => {
//     if (
//       !fixed.current ||
//       !j1.current ||
//       !j2.current ||
//       !j3.current ||
//       !card.current ||
//       !lineGeom.current
//     ) return;

//     if (dragged) {
//       vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
//       dir.copy(vec).sub(state.camera.position).normalize();
//       vec.add(dir.multiplyScalar(state.camera.position.length()));
//       card.current.setNextKinematicTranslation({
//         x: vec.x - dragged.x,
//         y: vec.y - dragged.y,
//         z: vec.z - dragged.z,
//       });
//     }

//     if (card.current) {
//        ang.copy(card.current.angvel())
//        rot.copy(card.current.rotation())
//        card.current.setAngvel(
//            { x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z }, 
//            true
//        )
//     }
        
//     if (!j1Lerped.current) {
//       const t = j1.current.translation();
//       j1Lerped.current = new THREE.Vector3(t.x, t.y, t.z);
//     }
//     if (!j2Lerped.current) {
//       const t = j2.current.translation();
//       j2Lerped.current = new THREE.Vector3(t.x, t.y, t.z);
//     }
    
//     const t1 = j1.current.translation();
//     const t2 = j2.current.translation();
//     const d1 = j1Lerped.current.distanceTo(new THREE.Vector3(t1.x, t1.y, t1.z));
//     const d2 = j2Lerped.current.distanceTo(new THREE.Vector3(t2.x, t2.y, t2.z));
//     const s1 = delta * (minSpeed + Math.min(1, Math.max(0.1, d1)) * (maxSpeed - minSpeed));
//     const s2 = delta * (minSpeed + Math.min(1, Math.max(0.1, d2)) * (maxSpeed - minSpeed));
    
//     j1Lerped.current.lerp(new THREE.Vector3(t1.x, t1.y, t1.z), s1);
//     j2Lerped.current.lerp(new THREE.Vector3(t2.x, t2.y, t2.z), s2);

//     curve.points[0].set(j3.current.translation().x, j3.current.translation().y, j3.current.translation().z);
//     curve.points[1].copy(j2Lerped.current);
//     curve.points[2].copy(j1Lerped.current);
//     curve.points[3].set(fixed.current.translation().x, fixed.current.translation().y, fixed.current.translation().z);

//     lineGeom.current.setPoints(curve.getPoints(32));

    
//   })

//   return (
//     <group position={[0, 4, 0]}>
//       <RigidBody ref={fixed} {...segmentProps} type="fixed" />
//       <RigidBody position={[0.9, 0, 0]} ref={j1} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
//       <RigidBody position={[1.4, 0, 0]} ref={j2} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
//       <RigidBody position={[1.9, 0, 0]} ref={j3} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
      
//       <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
//         <CuboidCollider args={[0.8, 1.125, 0.01]} />
//         <group
//           scale={2.25}
//           position={[0, -1.2, -0.05]}
//           onPointerOver={() => hover(true)}
//           onPointerOut={() => hover(false)}
//           onPointerUp={(e) => {
//              const t = e.target as HTMLElement | null;
//              t?.releasePointerCapture(e.pointerId);
//              drag(null);
//           }}
//           onPointerDown={(e) => {
//              const t = e.target as HTMLElement | null;
//              t?.setPointerCapture(e.pointerId);
//              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current!.translation())));
//           }}
//         >
//            <mesh geometry={(nodes.card as THREE.Mesh).geometry}>
//              <meshPhysicalMaterial map={(materials.base as THREE.MeshPhysicalMaterial).map} clearcoat={1} clearcoatRoughness={0.15} roughness={0.3} metalness={0.5} />
//            </mesh>
//            <mesh geometry={(nodes.clip as THREE.Mesh).geometry} material={materials.metal} />
//            <mesh geometry={(nodes.clamp as THREE.Mesh).geometry} material={materials.metal} />
//         </group>
//       </RigidBody>
      
//       <mesh ref={band}>
//         <meshLineGeometry ref={lineGeom} />
//         <meshLineMaterial 
//           color="white" 
//           depthTest={false} 
//           resolution={[width, height]} 
//           useMap 
//           map={texture} 
//           repeat={[-3, 1]} 
//           lineWidth={1} 
//           onUpdate={(mat: MeshLineMaterial) => { mat.map!.wrapS = mat.map!.wrapT = THREE.RepeatWrapping; mat.map!.needsUpdate = true; }}
//         />
//       </mesh>
//     </group>
//   )
// }

"use client"

import * as THREE from 'three'
import { useEffect, useRef, useState, useMemo } from 'react'
// FIX: Removed Object3DNode and MaterialNode from imports
import { Canvas, extend, useThree, useFrame, ThreeEvent } from '@react-three/fiber'
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei'
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint, RapierRigidBody } from '@react-three/rapier'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'
import { useControls } from 'leva'
import { GLTF } from 'three-stdlib'

extend({ MeshLineGeometry, MeshLineMaterial })

/* ---------------- TYPES ---------------- */

interface MeshLineGeometryImpl extends THREE.BufferGeometry {
  setPoints: (points: THREE.Vector3[] | Float32Array | number[], wcb?: (p: number) => number) => void
}

type ExtendedRigidBody = RapierRigidBody & { 
  lerped?: THREE.Vector3 
}

type GLTFResult = GLTF & {
  nodes: {
    card: THREE.Mesh
    clip: THREE.Mesh
    clamp: THREE.Mesh
  }
  materials: {
    base: THREE.MeshStandardMaterial
    metal: THREE.MeshStandardMaterial
  }
}

// FIX: simplified type declaration to avoid import errors
/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '@react-three/fiber' {
  interface ThreeElements {
    meshLineGeometry: any
    meshLineMaterial: any
  }
}

useGLTF.preload('https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/5huRVDzcoDwnbgrKUo1Lzs/53b6dd7d6b4ffcdbd338fa60265949e1/tag.glb')
useTexture.preload('https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/SOT1hmCesOHxEYxL7vkoZ/c57b29c85912047c414311723320c16b/band.jpg')

export default function App() {
  const { debug } = useControls({ debug: false })
  return (
    <Canvas camera={{ position: [0, 0, 13], fov: 25 }}>
      <ambientLight intensity={Math.PI} />
      <Physics debug={debug} interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
        <Band />
      </Physics>
      <Environment background blur={0.75}>
        <color attach="background" args={['black']} />
        <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
      </Environment>
    </Canvas>
  )
}

export function Band({ maxSpeed = 50, minSpeed = 10 }) {
  const band = useRef<THREE.Mesh>(null)
  const fixed = useRef<ExtendedRigidBody>(null)
  const j1 = useRef<ExtendedRigidBody>(null)
  const j2 = useRef<ExtendedRigidBody>(null)
  const j3 = useRef<ExtendedRigidBody>(null)
  const card = useRef<ExtendedRigidBody>(null)
  
  const vec = new THREE.Vector3()
  const ang = new THREE.Vector3()
  const rot = new THREE.Vector3()
  const dir = new THREE.Vector3()
  
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 2, linearDamping: 2 } as const
  
  const { nodes, materials } = useGLTF('https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/5huRVDzcoDwnbgrKUo1Lzs/53b6dd7d6b4ffcdbd338fa60265949e1/tag.glb') as unknown as GLTFResult
  
  const rawTexture = useTexture('https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/SOT1hmCesOHxEYxL7vkoZ/c57b29c85912047c414311723320c16b/band.jpg')
  const { width, height } = useThree((state) => state.size)
  
  const [curve] = useState(() => {
    const c = new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
    c.curveType = 'chordal'
    return c
  })
  
  const [dragged, drag] = useState<THREE.Vector3 | false>(false)
  const [hovered, hover] = useState(false)

  useRopeJoint(fixed as React.RefObject<React.ElementRef<typeof RigidBody>>, j1 as React.RefObject<React.ElementRef<typeof RigidBody>>, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j1 as React.RefObject<React.ElementRef<typeof RigidBody>>, j2 as React.RefObject<React.ElementRef<typeof RigidBody>>, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j2 as React.RefObject<React.ElementRef<typeof RigidBody>>, j3 as React.RefObject<React.ElementRef<typeof RigidBody>>, [[0, 0, 0], [0, 0, 0], 1])
  useSphericalJoint(j3 as React.RefObject<React.ElementRef<typeof RigidBody>>, card as React.RefObject<React.ElementRef<typeof RigidBody>>, [[0, 0, 0], [0, 1.45, 0]])

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab'
      return () => void (document.body.style.cursor = 'auto')
    }
  }, [hovered, dragged])

  const texture = useMemo(() => {
    const t = rawTexture.clone()
    t.wrapS = t.wrapT = THREE.RepeatWrapping
    return t
  }, [rawTexture])

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
      dir.copy(vec).sub(state.camera.position).normalize()
      vec.add(dir.multiplyScalar(state.camera.position.length()))
      
      ;[card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp())
      
      if (card.current) {
        card.current.setNextKinematicTranslation({ 
          x: vec.x - dragged.x, 
          y: vec.y - dragged.y, 
          z: vec.z - dragged.z 
        })
      }
    }
    

    if (fixed.current && j1.current && j2.current && j3.current && card.current && band.current) {
      ;[j1, j2].forEach((ref) => {
        if (!ref.current) return;
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation())
        
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())))
        ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)))
      })

      curve.points[0].copy(j3.current.translation())
      curve.points[1].copy(j2.current.lerped!) 
      curve.points[2].copy(j1.current.lerped!)
      curve.points[3].copy(fixed.current.translation())
      
      ;(band.current.geometry as MeshLineGeometryImpl).setPoints(curve.getPoints(32))

      ang.copy(card.current.angvel())
      rot.copy(card.current.rotation())
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z }, true)
    }
  })

  const onPointerDown = (e: ThreeEvent<PointerEvent>) => {
    (e.target as Element).setPointerCapture(e.pointerId)
    drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current!.translation())))
  }

  const onPointerUp = (e: ThreeEvent<PointerEvent>) => {
    (e.target as Element).releasePointerCapture(e.pointerId)
    drag(false)
  }

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={onPointerUp}
            onPointerDown={onPointerDown}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial 
                map={materials.base.map} 
                map-anisotropy={16} 
                clearcoat={1} 
                clearcoatRoughness={0.15} 
                roughness={0.3} 
                metalness={0.5} 
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial 
          color="white" 
          depthTest={false} 
          resolution={new THREE.Vector2(width, height)} 
          useMap 
          map={texture} 
          repeat={new THREE.Vector2(-3, 1)} 
          lineWidth={1} 
        />
      </mesh>
    </>
  )
}