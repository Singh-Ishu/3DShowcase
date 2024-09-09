let file;
let model3D = null; // Global variable to store the current model
const fileInput = document.getElementById('file-input');

// Event listener to get the selected file
fileInput.addEventListener('change', function(event) {
    file = event.target.files[0]; 
    modelLoader(file);  // Call modelLoader after file is selected
});

// Function to load the model and remove the previous one
function modelLoader(file) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('model-container').appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x404040, 3); 
    scene.add(ambientLight);

    const loader = new THREE.GLTFLoader();

    // Remove the previous model if it exists
    if (model3D) {
        scene.remove(model3D); // Remove the current model from the scene
        model3D = null; // Clear the reference
    }

    // Load the new 3D model
    loader.load(URL.createObjectURL(file), function(gltf) {  // Pass file as URL
        model3D = gltf.scene;
        model3D.scale.set(0.15, 0.15, 0.15);
        scene.add(model3D); // Add the new model to the scene
    }, undefined, function(error) {
        console.error(error);
    });

    camera.position.z = 0.25;

    function animate() {
        requestAnimationFrame(animate);

        if (model3D) {
            model3D.rotation.y += 0.003; 
        }

        renderer.render(scene, camera);
    }

    // Handle window resizing
    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });

    animate();
}
