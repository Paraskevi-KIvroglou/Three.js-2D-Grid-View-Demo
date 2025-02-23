# Interactive 2D Grid System

A responsive and interactive 2D grid system built with Three.js, featuring pan, zoom, and drag-and-drop functionality.

## 🚀 Features

- **Responsive Grid Layout**
  - Square viewport that maintains aspect ratio
  - Automatic resizing based on window dimensions
  - Clear visual grid system with centered origin

- **Interactive Controls**
  - Pan: Click and drag on empty grid space
  - Zoom: Mouse wheel or dedicated zoom buttons
  - Drag and Drop: Interactive blue circle that snaps to grid
  - Coordinate System: Click to get grid coordinates

- **Visual Elements**
  - Black center dot marking origin (0,0)
  - Light grey background for better contrast
  - Grid lines for spatial reference
  - Draggable blue circle demonstrating interaction

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/2d-grid-system.git
```

2. Navigate to the project directory:
```bash
cd 2d-grid-system
```

3. Install dependencies:
```bash
npm install three
```

## 📋 Prerequisites

- Modern web browser with WebGL support
- Node.js and npm (for development)

## 🔧 Usage

1. Include the necessary files in your HTML:
```html
<!DOCTYPE html>
<html>
<head>
    <title>2D Grid System</title>
</head>
<body>
    <div id="container"></div>
    <script type="module" src="2Dview.js"></script>
</body>
</html>
```

2. Start a local server:
```bash
npx live-server
```

3. Open your browser and navigate to `http://localhost:8080`

## 🎮 Controls

- **Pan**: Click and drag on empty grid space
- **Zoom**: 
  - Mouse wheel up/down
  - Or use the zoom buttons below the grid
- **Drag Object**: Click and drag the blue circle
- **View Coordinates**: Click anywhere on the grid

## 🔍 Technical Details

Built with:
- Three.js for 3D rendering
- Orthographic camera for true 2D view
- Raycasting for precise interaction
- Grid-snapping system for accurate placement

## 📐 Architecture

The system consists of several key components:
- Viewport management
- Camera system
- Grid system
- Interactive controls
- Coordinate system
- Draggable object system

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## 🎯 Future Improvements

- [ ] Multiple draggable objects
- [ ] Custom grid spacing options
- [ ] Object rotation capabilities
- [ ] Coordinate display overlay
- [ ] Save/load functionality for object positions
- [ ] Additional interaction modes
- [ ] Custom themes and styling options

## ⚠️ Known Limitations

- Single draggable object (currently)
- Integer grid positions only
- No object rotation
- Fixed grid size

## 👥 Authors

- **Paraskevi Kivroglou**  - [Paraskevi-KIvroglou](https://https://github.com/Paraskevi-KIvroglou)

## 🙏 Acknowledgments

- Three.js community
- Contributors and testers
- Anyone who provides feedback and suggestions

## 📞 Support

For support, please open an issue in the GitHub repository or contact [kibroglouparaskevi@gmail.com]

---

Made with ❤️ by [Paraskevi Kivroglou]
