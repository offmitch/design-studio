import { Canvas, createPortal } from '@react-three/fiber';
import { OrbitControls, useGLTF, Center, Decal } from '@react-three/drei';
import { useEffect, useMemo, useRef } from 'react';
import { CanvasTexture } from 'three';
import * as THREE from 'three';

function HatModel({ hatColor, hatText, textColor }) {
    const { scene } = useGLTF('/models/hat.glb');

    const mesh = useMemo(() => {
        let foundMesh = null;

        scene.traverse((child) => {
            if (child.isMesh) {
                foundMesh = child;
            }
        });

        return foundMesh;
    }, [scene]);

    const meshRef = useRef(null);
    meshRef.current = mesh;

    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                child.material.color.set(hatColor);
                child.updateWorldMatrix(true, false);
            }
        });
    }, [scene, hatColor]);
    return (
        <>
            <Center>
                <group scale={0.7}>
                    <primitive object={scene} />
                </group>
            </Center>

            {mesh && mesh.parent && createPortal(
                <HatDecal
                    mesh={meshRef}
                    hatText={hatText}
                    textColor={textColor}
                />,
                mesh.parent
            )}
        </>
    );

}
function createTextTexture(hatText, textColor) {
    const canvas = document.createElement('canvas');

    canvas.width = 1024;
    canvas.height = 256;

    const context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = textColor;
    context.font = 'bold 140px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    context.fillText(hatText, 512, 128);

    const texture = new CanvasTexture(canvas);
    texture.needsUpdate = true;

    return texture;
}

function TextTextureTest({ hatText, textColor }) {
    const texture = useMemo(() => {
        return createTextTexture(hatText, textColor);
    }, [hatText, textColor]);

    useEffect(() => {
        console.log('Texture loaded:', texture.image);
        console.log('Texture dimensions:', texture.image.width, texture.image.height);
    }, [texture]);

    return (
        <mesh
            position={[0, 10, 32.5]}
            rotation={[-0.5, 0, 0]}
        >
            <planeGeometry args={[20, 5]} />
            <meshBasicMaterial
                map={texture}
                transparent
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}



function HatDecal({ mesh, hatText, textColor }) {
    const texture = useMemo(() => {
        return createTextTexture(hatText, textColor);
    }, [hatText, textColor]);

    useEffect(() => {
        const targetMesh = mesh.current;
        const geometry = targetMesh.geometry;

        if (!geometry.attributes.normal) {
            geometry.computeVertexNormals();
        }

        const target = new THREE.Vector3(0, 3.5, 4.31);
        const positions = geometry.attributes.position;
        const normals = geometry.attributes.normal;

        let closestIndex = 0;
        let closestDistance = Infinity;

        const vertex = new THREE.Vector3();

        for (let i = 0; i < positions.count; i++) {
            vertex.fromBufferAttribute(positions, i);

            const distance = vertex.distanceToSquared(target);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = i;
            }
        }

        const nearestVertex = new THREE.Vector3()
            .fromBufferAttribute(positions, closestIndex);

        const nearestNormal = new THREE.Vector3()
            .fromBufferAttribute(normals, closestIndex);

        geometry.computeBoundingBox();

        const center = geometry.boundingBox.getCenter(
            new THREE.Vector3()
        );

        const alignment = nearestNormal.clone().normalize().dot(
            nearestVertex.clone().sub(center).normalize()
        );

        console.log('Nearest vertex:', nearestVertex.toArray());
        console.log('Distance:', Math.sqrt(closestDistance));
        console.log('Surface normal:', nearestNormal.toArray());

    }, [mesh]);

    return (
        <Decal
            mesh={mesh}
            position={[-0.0125, 2.5, 4.0725]}
            scale={[4, 2, 0.6]}
            rotation={Math.PI}
        >
            <meshBasicMaterial
                map={texture}
                transparent
                polygonOffset
                polygonOffsetFactor={-1}
                side={THREE.DoubleSide}
            />
        </Decal>
    );
}




function HatText({ hatText, textColor }) {
    return (
        <Text
            position={[0, 10, 32.5]}
            rotation={[-0.5, 0, 0]}
            fontSize={8}
            color={textColor}
            anchorX="center"
            anchorY="middle"
        >
            {hatText}
        </Text>
    );
}


function HatViewer({ hatColor, hatText, textColor }) {
    return (
        <Canvas camera={{ position: [0, 0, 320], fov: 45 }}>
            <ambientLight intensity={1.5} />

            <directionalLight
                position={[5, 5, 5]}
                intensity={1.5}
            />

            <directionalLight
                position={[-4, 2, -3]}
                intensity={0.2}
            />
            <hemisphereLight
                intensity={0.8}
                color="#ffffff"
                groundColor="#888888"
            />
            <HatModel
                hatColor={hatColor}
                hatText={hatText}
                textColor={textColor}
            />

            {/* <TextTextureTest
                hatText={hatText}
                textColor={textColor}
            /> */}

            <OrbitControls
                enableZoom={true}
                enablePan={false}
            />
        </Canvas>
    );
}

export default HatViewer;
