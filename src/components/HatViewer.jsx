
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Center, Text } from '@react-three/drei';
import { useEffect } from 'react';


function HatModel({ hatColor }) {
    const { scene } = useGLTF('/models/hat.glb');

    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                child.material.color.set(hatColor);
                child.geometry.computeBoundingBox();
                console.log('Hat bounds:', child.geometry.boundingBox);
                console.log('Geometry:', child.geometry);
                console.log('Position attribute:', child.geometry.attributes.position);
            }
        });
    }, [scene, hatColor]);

    return (
        <Center>
            <primitive object={scene} scale={0.7} />
        </Center>
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
            <HatModel hatColor={hatColor} />

            <HatText
                hatText={hatText}
                textColor={textColor} />

            <OrbitControls
                enableZoom={true}
                enablePan={false}
            />
        </Canvas>
    );
}

export default HatViewer;
