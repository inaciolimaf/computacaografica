import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Importação das texturas
import starsTexture from '../img/stars.jpg';
import sunTexture from '../img/sun.jpg';
import mercuryTexture from '../img/mercury.jpg';
import venusTexture from '../img/venus.jpg';
import moonTexture from '../img/moon.jpg';
import earthTexture from '../img/earth.jpg';
import marsTexture from '../img/mars.jpg';
import jupiterTexture from '../img/jupiter.jpg';
import saturnTexture from '../img/saturn.jpg';
import saturnRingTexture from '../img/saturn_ring.png';
import uranusTexture from '../img/uranus.jpg';
import uranusRingTexture from '../img/uranus_ring.png';
import neptuneTexture from '../img/neptune.jpg';
import plutoTexture from '../img/pluto.jpg';

// Configuração da cena
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
const orbit = new OrbitControls(camera, renderer.domElement);

// Configurações de controle melhoradas
orbit.enableDamping = true;
orbit.dampingFactor = 0.05;
orbit.enableZoom = true;
orbit.enablePan = true;

camera.position.set(-90, 140, 140);
orbit.update();

// Iluminação melhorada
const ambientLight = new THREE.AmbientLight(0x333333, 0.4);
scene.add(ambientLight);

// Skybox
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    starsTexture, starsTexture, starsTexture,
    starsTexture, starsTexture, starsTexture
]);

const textureLoader = new THREE.TextureLoader();

// Sol com luz própria
const sunGeo = new THREE.SphereGeometry(16, 32, 32);
const sunMat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(sunTexture)
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

// Luz pontual do sol
const pointLight = new THREE.PointLight(0xFFFFFF, 2, 500);
pointLight.position.set(0, 0, 0);
pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 2048;
pointLight.shadow.mapSize.height = 2048;
scene.add(pointLight);

// Dados dos planetas (tamanho, distância, velocidade orbital e rotacional)
const planetData = {
    mercury: { size: 3.2, distance: 28, orbitalSpeed: 0.7, rotationSpeed: 0.02 },
    venus: { size: 5.8, distance: 44, orbitalSpeed: 0.3, rotationSpeed: 0.015 },
    earth: { size: 6, distance: 62, orbitalSpeed: 0.1, rotationSpeed: 0.01, hasMoon: true },
    mars: { size: 4, distance: 78, orbitalSpeed: 0.07, rotationSpeed: 0.009 },
    jupiter: { size: 12, distance: 100, orbitalSpeed: 0.01, rotationSpeed: 0.005 },
    saturn: { size: 10, distance: 138, orbitalSpeed: 0.009, rotationSpeed: 0.004 },
    uranus: { size: 7, distance: 176, orbitalSpeed: 0.003, rotationSpeed: 0.003 },
    neptune: { size: 7, distance: 200, orbitalSpeed: 0.0009, rotationSpeed: 0.002 },
    pluto: { size: 2.8, distance: 216, orbitalSpeed: 0.00001, rotationSpeed: 0.001 }
};

// Função para criar planetas
function createPlanet(name, size, texture, distance, ring = null, hasMoon = false) {
    const planetSystem = new THREE.Group();
    
    // Geometria e material do planeta
    const geometry = new THREE.SphereGeometry(size, 32, 32);
    const material = new THREE.MeshStandardMaterial({
        map: textureLoader.load(texture)
    });
    const planetMesh = new THREE.Mesh(geometry, material);
    planetMesh.castShadow = true;
    planetMesh.receiveShadow = true;
    
    planetSystem.add(planetMesh);

    // Adicionar anéis se necessário
    if (ring) {
        const ringGeometry = new THREE.RingGeometry(ring.innerRadius, ring.outerRadius, 64);
        const ringMaterial = new THREE.MeshBasicMaterial({
            map: textureLoader.load(ring.texture),
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.8
        });
        const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
        ringMesh.rotation.x = Math.PI / 2;
        planetSystem.add(ringMesh);
    }

    // Adicionar lua se necessário
    let moonMesh = null;
    if (hasMoon) {
        const moonGeometry = new THREE.SphereGeometry(size * 0.27, 16, 16);
        const moonMaterial = new THREE.MeshStandardMaterial({
            map: textureLoader.load(moonTexture)
        });
        moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
        moonMesh.position.set(size * 2.5, 0, 0);
        moonMesh.castShadow = true;
        moonMesh.receiveShadow = true;
        planetSystem.add(moonMesh);
    }

    // Órbita visual
    const orbitGeometry = new THREE.RingGeometry(distance - 0.5, distance + 0.5, 64);
    const orbitMaterial = new THREE.MeshBasicMaterial({
        color: 0x444444,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.3
    });
    const orbitMesh = new THREE.Mesh(orbitGeometry, orbitMaterial);
    orbitMesh.rotation.x = Math.PI / 2;
    scene.add(orbitMesh);

    scene.add(planetSystem);
    
    return { 
        system: planetSystem, 
        mesh: planetMesh, 
        moon: moonMesh,
        orbit: orbitMesh
    };
}

// Criação dos planetas
const planets = {
    mercury: createPlanet('mercury', planetData.mercury.size, mercuryTexture, planetData.mercury.distance),
    venus: createPlanet('venus', planetData.venus.size, venusTexture, planetData.venus.distance),
    earth: createPlanet('earth', planetData.earth.size, earthTexture, planetData.earth.distance, null, true),
    mars: createPlanet('mars', planetData.mars.size, marsTexture, planetData.mars.distance),
    jupiter: createPlanet('jupiter', planetData.jupiter.size, jupiterTexture, planetData.jupiter.distance),
    saturn: createPlanet('saturn', planetData.saturn.size, saturnTexture, planetData.saturn.distance, {
        innerRadius: 12,
        outerRadius: 20,
        texture: saturnRingTexture
    }),
    uranus: createPlanet('uranus', planetData.uranus.size, uranusTexture, planetData.uranus.distance, {
        innerRadius: 8,
        outerRadius: 12,
        texture: uranusRingTexture
    }),
    neptune: createPlanet('neptune', planetData.neptune.size, neptuneTexture, planetData.neptune.distance),
    pluto: createPlanet('pluto', planetData.pluto.size, plutoTexture, planetData.pluto.distance)
};

// Variáveis de controle
let time = 0;
let animationSpeed = 1;
let isAnimating = true;

// Função de animação
function animate() {
    if (isAnimating) {
        time += 0.01 * animationSpeed;

        // Rotação do sol
        sun.rotation.y += 0.005 * animationSpeed;

        // Animação dos planetas
        Object.keys(planets).forEach(planetName => {
            const planet = planets[planetName];
            const data = planetData[planetName];
            
            // Movimento orbital
            const angle = time * data.orbitalSpeed;
            planet.system.position.set(
                Math.cos(angle) * data.distance,
                0,
                Math.sin(angle) * data.distance
            );

            // Rotação do planeta
            planet.mesh.rotation.y += data.rotationSpeed * animationSpeed;

            // Rotação da lua da Terra
            if (planet.moon && planetName === 'earth') {
                const moonAngle = time * 2;
                planet.moon.position.set(
                    Math.cos(moonAngle) * (data.size * 2.5),
                    0,
                    Math.sin(moonAngle) * (data.size * 2.5)
                );
                planet.moon.rotation.y += 0.01 * animationSpeed;
            }
        });
    }

    orbit.update();
    renderer.render(scene, camera);
}

// Controles globais
window.toggleAnimation = function() {
    isAnimating = !isAnimating;
};

window.resetCamera = function() {
    camera.position.set(-90, 140, 140);
    orbit.target.set(0, 0, 0);
    orbit.update();
};

window.toggleSpeed = function() {
    if (animationSpeed === 1) {
        animationSpeed = 2;
    } else if (animationSpeed === 2) {
        animationSpeed = 5;
    } else {
        animationSpeed = 1;
    }
    document.getElementById('speedDisplay').textContent = animationSpeed + 'x';
};

// Adicionando controle via teclado (P: Pause, R: Reset Camera, S: Speed)
window.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();
    if (key === 'p') {
        toggleAnimation();
    } else if (key === 'r') {
        resetCamera();
    } else if (key === 's') {
        toggleSpeed();
    }
});

// Responsividade
window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Remover loading quando a página estiver pronta
window.addEventListener('load', function() {
    document.getElementById('loading').style.display = 'none';
});

// Loop de animação
renderer.setAnimationLoop(animate);

/*
Projeto desenvolvido conforme os requisitos:
- Criação dos planetas, Sol e representação dos anéis de Saturno e Urano;
- Movimento de translação dos planetas ao redor do Sol e rotação própria;
- Inclusão do sistema de lua para a Terra;
- Controles via botões e via teclado (teclas P, R, S) para interação do usuário.
*/