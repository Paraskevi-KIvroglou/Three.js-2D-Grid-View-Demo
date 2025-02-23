// Import Three.js
import * as THREE from 'three';

// Initialize scene, camera, and renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0); // Light grey background
const viewportSize = Math.min(window.innerWidth, window.innerHeight) * 0.8;

// Get the container
const container = document.getElementById('container');

// Initialize renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(viewportSize, viewportSize);
renderer.domElement.style.margin = 'auto';
renderer.domElement.style.display = 'block';

// Append renderer to container
container.appendChild(renderer.domElement);

// Style the container
container.style.display = 'flex';
container.style.flexDirection = 'column'; // Stack items vertically
container.style.justifyContent = 'center';
container.style.alignItems = 'center';
container.style.height = '100vh';
container.style.margin = '0';

// Create a responsive grid
const gridSize = 100;
const gridDivisions = 50;
const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0x000000, 0x000000);
scene.add(gridHelper);

// Create custom axis helper with thicker black lines
const axesHelper = new THREE.AxesHelper(gridSize / 2);
axesHelper.rotation.x = Math.PI / 2;
axesHelper.rotation.z = -Math.PI / 2;
scene.add(axesHelper);

// Create custom axis helper with thicker black lines
const axisLength = gridSize / 2;

// Create X axis using a plane geometry for thickness
const xAxisGeometry = new THREE.PlaneGeometry(axisLength * 2, 0.5);
const xAxis = new THREE.Mesh(
    xAxisGeometry,
    new THREE.MeshBasicMaterial({ color: 0x000000 })
);
xAxis.rotation.x = Math.PI / 2; // Rotate to be visible from top view

// Create Y axis using a plane geometry for thickness
const yAxisGeometry = new THREE.PlaneGeometry(0.5, axisLength * 2);
const yAxis = new THREE.Mesh(
    yAxisGeometry,
    new THREE.MeshBasicMaterial({ color: 0x000000 })
);
yAxis.rotation.x = Math.PI / 2; // Rotate to be visible from top view

// Add axes to scene
scene.add(xAxis);
scene.add(yAxis);

// Create center marker (red dot)
const dotGeometry = new THREE.CircleGeometry(0.1, 32); // radius: 0.1, segments: 32
const dotMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 }); 
const centerDot = new THREE.Mesh(dotGeometry, dotMaterial);
centerDot.rotation.x = -Math.PI / 2; // Rotate to lay flat on the grid
centerDot.position.set(0, 0.01, 0); // Slight y offset to prevent z-fighting
scene.add(centerDot);

// Setup camera
const aspectRatio = 1; // Square viewport
let viewSize = 6; // Made this variable so we can modify it
const camera = new THREE.OrthographicCamera(
    -viewSize * aspectRatio,
    viewSize * aspectRatio,
    viewSize,
    -viewSize,
    0.1,
    1000
);
camera.position.set(0, 10, 0); // Position camera directly above
camera.lookAt(0, 0, 0);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Update window resize handler
window.addEventListener('resize', () => {
    const newSize = Math.min(window.innerWidth, window.innerHeight) * 0.8;
    renderer.setSize(newSize, newSize);
});

// Create buttons container
const buttonsContainer = document.createElement('div');
buttonsContainer.style.marginTop = '20px';
buttonsContainer.style.display = 'flex';
buttonsContainer.style.gap = '10px';

// Create zoom in button
const zoomInButton = document.createElement('button');
zoomInButton.textContent = 'Zoom In';
zoomInButton.style.padding = '8px 16px';
zoomInButton.style.cursor = 'pointer';

// Create zoom out button
const zoomOutButton = document.createElement('button');
zoomOutButton.textContent = 'Zoom Out';
zoomOutButton.style.padding = '8px 16px';
zoomOutButton.style.cursor = 'pointer';

// Add buttons to buttons container
buttonsContainer.appendChild(zoomInButton);
buttonsContainer.appendChild(zoomOutButton);

// Add buttons container after the renderer
container.appendChild(buttonsContainer);

// Add click events for the buttons
const zoomSpeed = 0.1;
const minZoom = 1;
const maxZoom = 20;

zoomInButton.addEventListener('click', () => {
    viewSize = Math.max(minZoom, viewSize * (1 - zoomSpeed));
    updateCameraZoom();
});

zoomOutButton.addEventListener('click', () => {
    viewSize = Math.min(maxZoom, viewSize * (1 + zoomSpeed));
    updateCameraZoom();
});

// Helper function to update camera zoom
function updateCameraZoom() {
    camera.left = -viewSize * aspectRatio;
    camera.right = viewSize * aspectRatio;
    camera.top = viewSize;
    camera.bottom = -viewSize;
    camera.updateProjectionMatrix();
}

// Update the existing wheel event to use the same updateCameraZoom function
container.addEventListener('wheel', (event) => {
    event.preventDefault();

    if (event.deltaY > 0) {
        viewSize = Math.min(maxZoom, viewSize * (1 + zoomSpeed));
    } else {
        viewSize = Math.max(minZoom, viewSize * (1 - zoomSpeed));
    }

    updateCameraZoom();
});

// Add mouse pan controls
let isDragging = false;
let previousMousePosition = {
    x: 0,
    y: 0
};

// Create a draggable circle
const circleGeometry = new THREE.CircleGeometry(0.4, 32); // radius: 0.4, segments: 32
const circleMaterial = new THREE.MeshBasicMaterial({ 
    color: 0x0000ff, // Blue color
    side: THREE.DoubleSide
});
const draggableCircle = new THREE.Mesh(circleGeometry, circleMaterial);
draggableCircle.rotation.x = -Math.PI / 2; // Rotate to lay flat on the grid
draggableCircle.position.y = 0.01; // Slight offset to prevent z-fighting
scene.add(draggableCircle);

// Variables for drag and drop
let isDraggingCircle = false;
let selectedObject = null;

// Modify the existing click/drag handlers
container.addEventListener('mousedown', (event) => {
    // Get container's bounds
    const rect = container.getBoundingClientRect();
    
    // Calculate mouse position
    const mouse = new THREE.Vector2();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    // Setup raycaster
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    // Check for intersection with the circle
    const intersects = raycaster.intersectObject(draggableCircle);
    
    if (intersects.length > 0) {
        isDraggingCircle = true;
        selectedObject = draggableCircle;
        container.style.cursor = 'grabbing';
        event.preventDefault(); // Prevent other drag operations
    } else {
        // Regular grid panning
        isDragging = true;
        container.style.cursor = 'grabbing';
        previousMousePosition = {
            x: event.clientX,
            y: event.clientY
        };
    }
});

container.addEventListener('mousemove', (event) => {
    if (isDraggingCircle && selectedObject) {
        // Get container's bounds
        const rect = container.getBoundingClientRect();
        
        // Calculate mouse position
        const mouse = new THREE.Vector2();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        // Setup raycaster
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);

        // Intersect with the grid plane
        const intersects = raycaster.intersectObject(gridPlane);
        
        if (intersects.length > 0) {
            const point = intersects[0].point;
            
            // Snap to grid
            const gridUnit = 1;
            // Update position relative to camera position
            selectedObject.position.x = Math.round(point.x / gridUnit) * gridUnit;
            selectedObject.position.z = Math.round(point.z / gridUnit) * gridUnit;
            selectedObject.position.y = 0.01; // Maintain slight elevation
            
            // Log position for debugging
            console.log(`Circle position: x: ${selectedObject.position.x}, y: ${selectedObject.position.z}`);
        }
    } else if (isDragging) {
        // Regular grid panning logic
        const deltaMove = {
            x: event.clientX - previousMousePosition.x,
            y: event.clientY - previousMousePosition.y
        };

        const movementSpeed = viewSize / 200;
        camera.position.x -= deltaMove.x * movementSpeed;
        camera.position.z += deltaMove.y * movementSpeed;

        const target = new THREE.Vector3();
        target.x = camera.position.x;
        target.y = 0;
        target.z = camera.position.z;
        camera.lookAt(target);

        previousMousePosition = {
            x: event.clientX,
            y: event.clientY
        };
    }
});

container.addEventListener('mouseup', () => {
    isDragging = false;
    isDraggingCircle = false;
    selectedObject = null;
    container.style.cursor = 'auto';
});

container.addEventListener('mouseleave', () => {
    isDragging = false;
    isDraggingCircle = false;
    selectedObject = null;
    container.style.cursor = 'auto';
});

// Prevent default drag behavior
container.addEventListener('dragstart', (event) => {
    event.preventDefault();
});

// Create an invisible plane for raycasting that matches grid dimensions
const gridPlaneGeometry = new THREE.PlaneGeometry(gridSize, gridSize);
const gridPlaneMaterial = new THREE.MeshBasicMaterial({
    visible: false, // Make it invisible
    side: THREE.DoubleSide // Make it detectable from both sides
});
const gridPlane = new THREE.Mesh(gridPlaneGeometry, gridPlaneMaterial);
gridPlane.rotation.x = -Math.PI / 2; // Align with grid
gridPlane.position.y = 0; // Place at same height as grid
scene.add(gridPlane);