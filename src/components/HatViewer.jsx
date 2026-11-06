
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Center } from '@react-three/drei';
import { useEffect } from 'react';


function HatModel({ hatColor }) {
    const { scene } = useGLTF('/models/hat.glb');

    useEffect(() => {
        console.log('--- HAT MODEL STRUCTURE ---');

        scene.traverse((child) => {
            if (child.isMesh) {
                const image = child.material.map?.image;

                if (image) {
                    const canvas = document.createElement('canvas');
                    canvas.width = image.width;
                    canvas.height = image.height;

                    const context = canvas.getContext('2d');
                    context.drawImage(image, 0, 0);

                    console.log('BASE COLOUR TEXTURE:', canvas.toDataURL());
                }
            }
        });
    }, [scene]);

    return (
        <Center>
            <primitive object={scene} />
        </Center>
    );
}


function HatViewer({ hatColor }) {
    return (
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={1.5} />

            <directionalLight
                position={[5, 5, 5]}
                intensity={2}
            />

            <HatModel hatColor={hatColor} />

            <OrbitControls
                enableZoom={true}
                enablePan={false}
            />
        </Canvas>
    );
}

export default HatViewer;
