# Egypt Heritage Sites - GIS Web Application

A comprehensive Geographic Information System (GIS) web application for exploring Egyptian heritage sites using interactive mapping technology.

![Egypt Heritage Sites](https://img.shields.io/badge/Status-Live-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?logo=leaflet&logoColor=white)

## 🌟 Live Demo

**[View Live Application](https://YOUR_USERNAME.github.io/egypt-heritage-gis/)**

*Replace YOUR_USERNAME with your actual GitHub username*

## 📋 Features

### 🗺️ Interactive Mapping
- **Leaflet-based mapping** with smooth pan and zoom controls
- **Multiple base layers**: OpenStreetMap and Satellite imagery
- **Custom heritage site markers** with distinctive icons
- **Responsive design** that works on desktop and mobile devices

### 🏛️ Heritage Sites Management
- **Interactive site markers** showing Egyptian heritage locations
- **Detailed popups** with site information and descriptions
- **Site list panel** for easy navigation between locations
- **Click-to-zoom** functionality for quick site exploration

### 🛠️ Advanced Tools
- **Distance measurement tool** for calculating distances between points
- **Fullscreen mode** for immersive map viewing
- **User location detection** with geolocation API
- **Data export functionality** to download GeoJSON data
- **Layer toggle controls** for customizing map display

### 📱 User Interface
- **Modern, responsive design** with clean aesthetics
- **Sidebar navigation** with organized controls and information
- **Modal dialogs** for detailed site information
- **Real-time map information** showing zoom level and coordinates
- **Notification system** for user feedback

## 🏛️ Heritage Sites Included

The application currently features three major Egyptian heritage sites:

1. **🏺 Giza Pyramids** (31.1342°, 29.9792°)
   - One of the most famous archaeological sites in the world
   - Home to the Great Pyramid of Giza

2. **🏛️ Karnak Temple** (32.6573°, 25.7188°)
   - A vast ancient Egyptian temple complex in Luxor
   - One of the largest religious buildings ever constructed

3. **⛩️ Abu Simbel Temples** (31.6258°, 22.3372°)
   - Two massive rock temples in southern Egypt
   - Near the border with Sudan

## 🚀 Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Mapping Library**: [Leaflet.js](https://leafletjs.com/)
- **Icons**: [Font Awesome](https://fontawesome.com/)
- **Data Format**: GeoJSON
- **Hosting**: GitHub Pages

## 📁 Project Structure

```
egypt-heritage-gis/
├── index.html              # Main HTML file
├── styles.css              # Application styles
├── app.js                  # Main JavaScript application
├── heritage_sites.geojson  # GeoJSON data file
├── README.md              # Project documentation
└── DEPLOYMENT.md          # Deployment instructions
```

## 🛠️ Installation & Usage

### Option 1: View Online
Simply visit the [live demo](https://YOUR_USERNAME.github.io/egypt-heritage-gis/) to use the application immediately.

### Option 2: Run Locally
1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/egypt-heritage-gis.git
   cd egypt-heritage-gis
   ```

2. **Open in browser**:
   - Open `index.html` in any modern web browser
   - No server setup required!

## 🎮 How to Use

### Map Navigation
- **Zoom**: Use mouse wheel or zoom controls
- **Pan**: Click and drag to move around the map
- **Fullscreen**: Toggle fullscreen mode for better viewing

### Site Exploration
- **Click markers** to view site information in popups
- **Use site list** to quickly navigate to specific locations
- **View detailed information** in modal dialogs

### Tools & Features
- **Layer Controls**: Toggle between street map and satellite imagery
- **Measure Distance**: Click two points to measure distance between them
- **Export Data**: Download heritage sites data as GeoJSON
- **Locate**: Find your current location (requires permission)

## 🌐 Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Customization

### Adding New Heritage Sites
Edit the `heritage_sites.geojson` file to add new locations:

```json
{
  "type": "Feature",
  "properties": {
    "Name": "New Heritage Site",
    "Description": "Description of the site"
  },
  "geometry": {
    "type": "Point",
    "coordinates": [longitude, latitude]
  }
}
```

### Styling
Modify `styles.css` to customize:
- Color schemes and themes
- Layout dimensions
- Typography and fonts
- Animation effects

### Functionality
Extend `app.js` to add:
- New tools and controls
- Additional data layers
- Custom map interactions
- Enhanced analytics

## 📈 Performance

- **Fast Loading**: Optimized with CDN-hosted libraries
- **Efficient Rendering**: Leaflet's built-in optimization
- **Responsive Images**: Scalable vector icons
- **Minimal Dependencies**: Quick startup time

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[Leaflet.js](https://leafletjs.com/)** - Amazing open-source mapping library
- **[OpenStreetMap](https://www.openstreetmap.org/)** - Collaborative mapping data
- **[Font Awesome](https://fontawesome.com/)** - Beautiful icons
- **[Esri](https://www.esri.com/)** - Satellite imagery tiles

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/YOUR_USERNAME/egypt-heritage-gis/issues) page
2. Create a new issue if your problem isn't already reported
3. Provide detailed information about the problem

---

**Built with ❤️ for exploring Egypt's rich cultural heritage**

*Remember to replace YOUR_USERNAME with your actual GitHub username in all links!*