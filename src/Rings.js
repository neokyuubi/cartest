import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Color } from "three";

export function Rings()
{
    const itemsRef = useRef([]);

    useFrame((state) =>
    {
        let elapsed = state.clock.getElapsedTime();
        for (let index = 0; index < itemsRef.current.length; index++)
        {
            let mesh = itemsRef.current[index];
            let z = (index - 7) * 3.5 + ((elapsed * 0.4) % 3.5) * 2;
            mesh.position.set(0, 0, -z);

            let distance = Math.abs(z);
            mesh.scale.set(1 - distance  * 0.04, 1 - distance * 0.04, 1 - distance * 0.04);

            let colorScale = 1;
            if(distance > 2)
            {
                colorScale = 1 - (Math.min(distance, 12) - 2) / 10;
            }
            colorScale *= 0.5;

            if(index % 2 === 1)
            {
                mesh.material.emissive = new Color(6, 0.15, 0.7).multiplyScalar(colorScale);
            }
            else
            {
                mesh.material.emissive = new Color(0.1, 0.7, 3).multiplyScalar(colorScale);
            }
        }
    });

    return (
        <>
            {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((v, i) =>
            (
                <mesh
                    castShadow
                    receiveShadow
                    position={[0, 0, 0]}
                    key={i}
                    ref={(el) => (itemsRef.current[i] = el)}
                >

                    <torusGeometry args={[3.35, 0.05, 16, 100]} />
                    <meshStandardMaterial emissive={[0.5, 0.5, 0.5]} color={[0, 0, 0]} />

                </mesh>
            ))}
        </>
    );
}