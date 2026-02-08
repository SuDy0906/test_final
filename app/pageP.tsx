"use client"

import * as THREE from 'three'
import { useEffect, useRef, useState, useMemo } from 'react'
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber'
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei'
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'
import { useControls } from 'leva'

extend({ MeshLineGeometry, MeshLineMaterial })


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

function Band({ maxSpeed = 50, minSpeed = 10 }) {
  const fixed = useRef<React.ElementRef<typeof RigidBody>>(null), j1 = useRef<React.ElementRef<typeof RigidBody>>(null), j2 = useRef<React.ElementRef<typeof RigidBody>>(null), j3 = useRef<React.ElementRef<typeof RigidBody>>(null), card = useRef<React.ElementRef<typeof RigidBody>>(null) // prettier-ignore
  const vec = new THREE.Vector3(), ang = new THREE.Vector3(), rot = new THREE.Vector3(), dir = new THREE.Vector3() // prettier-ignore
  const segmentProps = {
    canSleep: true,
    colliders: false as const,
    angularDamping: 2,
    linearDamping: 2,
  };
  const { nodes, materials } = useGLTF('https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/5huRVDzcoDwnbgrKUo1Lzs/53b6dd7d6b4ffcdbd338fa60265949e1/tag.glb')
  const textureUrl = 'https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/SOT1hmCesOHxEYxL7vkoZ/c57b29c85912047c414311723320c16b/band.jpg'
  const _texture = useTexture(textureUrl)
  const texture = useMemo(() => {
    const t = _texture.clone()
    t.wrapS = t.wrapT = THREE.RepeatWrapping
    return t
  }, [_texture])
  const { width, height } = useThree((state) => state.size)
  const curve = useMemo(() => {
    const c = new THREE.CatmullRomCurve3([
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
    ]);
    c.curveType = "chordal";
    return c;
  }, []);
  const [dragged, drag] = useState<THREE.Vector3 | null>(null);
  const [hovered, hover] = useState(false)
  const lineGeom = useRef<MeshLineGeometry>(null);

  useRopeJoint(
    fixed as React.RefObject<React.ElementRef<typeof RigidBody>>,
    j1 as React.RefObject<React.ElementRef<typeof RigidBody>>,
    [[0, 0, 0], [0, 0, 0], 1]
  );

  useRopeJoint(
    j1 as React.RefObject<React.ElementRef<typeof RigidBody>>,
    j2 as React.RefObject<React.ElementRef<typeof RigidBody>>,
    [[0, 0, 0], [0, 0, 0], 1]
  );

  useRopeJoint(
    j2 as React.RefObject<React.ElementRef<typeof RigidBody>>,
    j3 as React.RefObject<React.ElementRef<typeof RigidBody>>,
    [[0, 0, 0], [0, 0, 0], 1]
  );

  useSphericalJoint(
    j3 as React.RefObject<React.ElementRef<typeof RigidBody>>,
    card as React.RefObject<React.ElementRef<typeof RigidBody>>,
    [[0, 0, 0], [0, 1.45, 0]]
  );

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab'
      return () => void (document.body.style.cursor = 'auto')
    }
  }, [hovered, dragged])

  const j1Lerped = useRef<THREE.Vector3 | null>(null);
  const j2Lerped = useRef<THREE.Vector3 | null>(null);


  useFrame((state, delta) => {
    if (
      !fixed.current ||
      !j1.current ||
      !j2.current ||
      !j3.current ||
      !card.current ||
      !lineGeom.current
    ) return;

    // ---------------- Drag ----------------
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));

      // fixed.current.wakeUp();
      // j1.current.wakeUp();
      // j2.current.wakeUp();
      // j3.current.wakeUp();
      // card.current.wakeUp();

      card.current.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    // ---------------- Rope smoothing ----------------
    if (!j1Lerped.current) {
      const t = j1.current.translation();
      j1Lerped.current = new THREE.Vector3(t.x, t.y, t.z);
    }
    if (!j2Lerped.current) {
      const t = j2.current.translation();
      j2Lerped.current = new THREE.Vector3(t.x, t.y, t.z);
    }

    const t1 = j1.current.translation();
    const t2 = j2.current.translation();

    const d1 = j1Lerped.current.distanceTo(
      new THREE.Vector3(t1.x, t1.y, t1.z)
    );
    const d2 = j2Lerped.current.distanceTo(
      new THREE.Vector3(t2.x, t2.y, t2.z)
    );

    const s1 =
      delta * (minSpeed + Math.min(1, Math.max(0.1, d1)) * (maxSpeed - minSpeed));
    const s2 =
      delta * (minSpeed + Math.min(1, Math.max(0.1, d2)) * (maxSpeed - minSpeed));

    j1Lerped.current.lerp(new THREE.Vector3(t1.x, t1.y, t1.z), s1);
    j2Lerped.current.lerp(new THREE.Vector3(t2.x, t2.y, t2.z), s2);

    // ---------------- Curve update ----------------
    curve.points[0].set(
      j3.current.translation().x,
      j3.current.translation().y,
      j3.current.translation().z
    );
    curve.points[1].copy(j2Lerped.current);
    curve.points[2].copy(j1Lerped.current);
    curve.points[3].set(
      fixed.current.translation().x,
      fixed.current.translation().y,
      fixed.current.translation().z
    );

    lineGeom.current?.setPoints(curve.getPoints(32));

    // ---------------- Stabilize rotation ----------------
    ang.copy(card.current.angvel());
    rot.copy(card.current.rotation());

    card.current.setAngvel(
      { x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z },
      true
    );
  });


  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} type="fixed" {...segmentProps} />

        <RigidBody ref={j1} position={[0.5, 0, 0]} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody ref={j2} position={[1, 0, 0]} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody ref={j3} position={[1.5, 0, 0]} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          ref={card}
          position={[2, 0, 0]}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />

          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => {
              const t = e.target as HTMLElement | null;
              t?.releasePointerCapture(e.pointerId);
              drag(null);
            }}
            onPointerDown={(e) => {
              const t = e.target as HTMLElement | null;
              t?.setPointerCapture(e.pointerId);
              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(vec.copy(card.current!.translation()))
              );
            }}
          >
            {/* ... inside the return statement of Band ... */}

            {/* Cast nodes.card to THREE.Mesh */}
            <mesh geometry={(nodes.card as THREE.Mesh).geometry}>
            <meshPhysicalMaterial
                map={(materials.base as THREE.MeshPhysicalMaterial).map}
                clearcoat={1}
                clearcoatRoughness={0.15}
                roughness={0.3}
                metalness={0.5}
            />
            </mesh>

            {/* Cast nodes.clip to THREE.Mesh */}
            <mesh
            geometry={(nodes.clip as THREE.Mesh).geometry}
            material={materials.metal}
            />

            {/* Cast nodes.clamp to THREE.Mesh */}
            <mesh
            geometry={(nodes.clamp as THREE.Mesh).geometry}
            material={materials.metal}
            />
            </group>
      </RigidBody>
      
      <mesh frustumCulled={false}>
        <meshLineGeometry ref={lineGeom} />
        <meshLineMaterial 
          color="white" 
          depthTest={false} 
          resolution={[width, height]} 
          useMap 
          map={texture} 
          repeat={[-3, 1]} 
          lineWidth={1} 
          onUpdate={(mat: MeshLineMaterial) => { 
            mat.map!.wrapS = mat.map!.wrapT = THREE.RepeatWrapping; 
            mat.map!.needsUpdate = true; }}
        />
      </mesh>
    </group>
    </>
  )
}


