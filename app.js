// GIS Web Application - Main JavaScript File

// Embedded GeoJSON data to avoid CORS issues
const HERITAGE_SITES_DATA = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "Name": "Giza Pyramids",
                "Description": "One of the most famous archaeological sites in the world, home to the Great Pyramid of Giza."
            },
            "geometry": {
                "type": "Point",
                "coordinates": [31.1342, 29.9792]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Karnak Temple",
                "Description": "A vast ancient Egyptian temple complex located in Luxor."
            },
            "geometry": {
                "type": "Point",
                "coordinates": [32.6573, 25.7188]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Abu Simbel Temples",
                "Description": "Two massive rock temples in southern Egypt near the border with Sudan."
            },
            "geometry": {
                "type": "Point",
                "coordinates": [31.6258, 22.3372]
            }
        }
    ]
};

class EgyptHeritageGIS {
    constructor() {
        this.map = null;
        this.heritageLayer = null;
        this.geojsonData = HERITAGE_SITES_DATA;
        this.currentMarkers = [];
        this.measureControl = null;
        this.isFullscreen = false;
        
        this.init();
    }

    async init() {
        try {
            // Show loading indicator
            this.showLoading();
            
            // Initialize the map
            this.initMap();
            
            // Load GeoJSON data (now using embedded data)
            this.loadGeoJSONData();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Initialize UI components
            this.initUI();
            
            // Hide loading indicator
            this.hideLoading();
            
            console.log('Egypt Heritage GIS Application initialized successfully');
        } catch (error) {
            console.error('Error initializing application:', error);
            this.hideLoading();
            this.showError('Failed to initialize the application. Please refresh the page.');
        }
    }

    initMap() {
        // Initialize Leaflet map centered on Egypt
        this.map = L.map('map', {
            center: [26.8206, 30.8025], // Center of Egypt
            zoom: 6,
            zoomControl: false,
            attributionControl: true
        });

        // Add zoom control to top-left
        L.control.zoom({
            position: 'topleft'
        }).addTo(this.map);

        // Add base tile layer (OpenStreetMap)
        this.baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18
        }).addTo(this.map);

        // Add satellite layer (initially hidden)
        this.satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: '© Esri, Maxar, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community',
            maxZoom: 18
        });

        // Map event listeners
        this.map.on('zoomend', () => this.updateMapInfo());
        this.map.on('moveend', () => this.updateMapInfo());
        
        // Initial map info update
        this.updateMapInfo();
    }

    loadGeoJSONData() {
        try {
            // Data is already loaded from the embedded constant
            // Create heritage sites layer
            this.createHeritageLayer();
            
            // Populate sites list
            this.populateSitesList();
            
            // Update total sites count
            document.getElementById('total-sites').textContent = this.geojsonData.features.length;
            
        } catch (error) {
            console.error('Error loading GeoJSON data:', error);
            throw new Error('Failed to load heritage sites data');
        }
    }

    createHeritageLayer() {
        // Custom icon for heritage sites
        const heritageIcon = L.divIcon({
            className: 'heritage-marker',
            html: '<i class="fas fa-landmark" style="color: #e74c3c; font-size: 20px; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);"></i>',
            iconSize: [30, 30],
            iconAnchor: [15, 15],
            popupAnchor: [0, -15]
        });

        // Create GeoJSON layer
        this.heritageLayer = L.geoJSON(this.geojsonData, {
            pointToLayer: (feature, latlng) => {
                return L.marker(latlng, { icon: heritageIcon });
            },
            onEachFeature: (feature, layer) => {
                // Create popup content
                const popupContent = `
                    <div class="popup-content">
                        <div class="popup-title">${feature.properties.Name}</div>
                        <div class="popup-description">${feature.properties.Description}</div>
                        <button class="popup-btn" onclick="app.showSiteDetails('${feature.properties.Name}')">
                            View Details
                        </button>
                    </div>
                `;
                
                layer.bindPopup(popupContent, {
                    maxWidth: 300,
                    className: 'custom-popup'
                });

                // Add click event for highlighting
                layer.on('click', () => {
                    this.highlightSite(feature.properties.Name);
                });

                // Store reference to marker
                this.currentMarkers.push({
                    name: feature.properties.Name,
                    marker: layer,
                    coordinates: feature.geometry.coordinates
                });
            }
        }).addTo(this.map);
    }

    populateSitesList() {
        const sitesList = document.getElementById('sites-list');
        sitesList.innerHTML = '';

        this.geojsonData.features.forEach(feature => {
            const siteItem = document.createElement('div');
            siteItem.className = 'site-item';
            siteItem.innerHTML = `
                <div class="site-name">${feature.properties.Name}</div>
                <div class="site-description">${feature.properties.Description}</div>
            `;
            
            siteItem.addEventListener('click', () => {
                this.zoomToSite(feature.properties.Name);
                this.highlightSite(feature.properties.Name);
            });
            
            sitesList.appendChild(siteItem);
        });
    }

    setupEventListeners() {
        // Layer controls
        document.getElementById('heritage-sites').addEventListener('change', (e) => {
            if (e.target.checked) {
                this.map.addLayer(this.heritageLayer);
            } else {
                this.map.removeLayer(this.heritageLayer);
            }
        });

        document.getElementById('satellite-view').addEventListener('change', (e) => {
            if (e.target.checked) {
                this.map.removeLayer(this.baseLayer);
                this.map.addLayer(this.satelliteLayer);
            } else {
                this.map.removeLayer(this.satelliteLayer);
                this.map.addLayer(this.baseLayer);
            }
        });

        // Tool buttons
        document.getElementById('zoom-to-egypt').addEventListener('click', () => {
            this.zoomToEgypt();
        });

        document.getElementById('export-data').addEventListener('click', () => {
            this.exportData();
        });

        document.getElementById('measure-distance').addEventListener('click', () => {
            this.toggleMeasureTool();
        });

        // Map control buttons
        document.getElementById('fullscreen-btn').addEventListener('click', () => {
            this.toggleFullscreen();
        });

        document.getElementById('locate-btn').addEventListener('click', () => {
            this.locateUser();
        });

        // Modal controls
        document.getElementById('close-modal').addEventListener('click', () => {
            this.hideModal();
        });

        // Close modal when clicking outside
        document.getElementById('site-modal').addEventListener('click', (e) => {
            if (e.target.id === 'site-modal') {
                this.hideModal();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideModal();
            }
        });
    }

    initUI() {
        // Initialize any additional UI components
        this.updateMapInfo();
    }

    updateMapInfo() {
        const zoom = this.map.getZoom();
        const center = this.map.getCenter();
        
        document.getElementById('current-zoom').textContent = zoom.toFixed(0);
        document.getElementById('map-center').textContent = 
            `${center.lat.toFixed(4)}, ${center.lng.toFixed(4)}`;
    }

    zoomToSite(siteName) {
        const site = this.currentMarkers.find(marker => marker.name === siteName);
        if (site) {
            const [lng, lat] = site.coordinates;
            this.map.setView([lat, lng], 12, { animate: true });
            
            // Open popup
            setTimeout(() => {
                site.marker.openPopup();
            }, 500);
        }
    }

    highlightSite(siteName) {
        // Remove previous highlights
        document.querySelectorAll('.site-item').forEach(item => {
            item.classList.remove('active');
        });

        // Add highlight to selected site
        const siteItems = document.querySelectorAll('.site-item');
        siteItems.forEach(item => {
            if (item.querySelector('.site-name').textContent === siteName) {
                item.classList.add('active');
                item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    }

    showSiteDetails(siteName) {
        const feature = this.geojsonData.features.find(f => f.properties.Name === siteName);
        if (!feature) return;

        const modal = document.getElementById('site-modal');
        const modalTitle = document.getElementById('modal-title');
        const siteDetails = document.getElementById('site-details');

        modalTitle.textContent = feature.properties.Name;
        
        const [lng, lat] = feature.geometry.coordinates;
        
        siteDetails.innerHTML = `
            <h3>${feature.properties.Name}</h3>
            <p><strong>Description:</strong></p>
            <p>${feature.properties.Description}</p>
            
            <div class="coordinates">
                <strong>Coordinates:</strong><br>
                Latitude: ${lat.toFixed(6)}°<br>
                Longitude: ${lng.toFixed(6)}°
            </div>
            
            <div style="margin-top: 1rem;">
                <button class="tool-btn" onclick="app.zoomToSite('${siteName}'); app.hideModal();">
                    <i class="fas fa-map-marker-alt"></i> Show on Map
                </button>
            </div>
        `;

        modal.classList.add('show');
    }

    hideModal() {
        document.getElementById('site-modal').classList.remove('show');
    }

    zoomToEgypt() {
        this.map.setView([26.8206, 30.8025], 6, { animate: true });
    }

    exportData() {
        const dataStr = JSON.stringify(this.geojsonData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = 'egypt_heritage_sites.geojson';
        link.click();
        
        // Show success message
        this.showNotification('Data exported successfully!', 'success');
    }

    toggleMeasureTool() {
        if (this.measureControl) {
            // Stop measuring and clean up
            this.stopMeasuring();
            document.getElementById('measure-distance').innerHTML =
                '<i class="fas fa-ruler"></i> Measure Distance';
        } else {
            // Start measuring
            this.enableMeasureTool();
            document.getElementById('measure-distance').innerHTML =
                '<i class="fas fa-times"></i> Stop Measuring';
        }
    }

    enableMeasureTool() {
        let isDrawing = false;
        let startPoint = null;
        let measureLine = null;
        let measurePopup = null;

        const measureHandler = (e) => {
            if (!isDrawing) {
                startPoint = e.latlng;
                isDrawing = true;
                this.map.getContainer().style.cursor = 'crosshair';
                this.showNotification('Click the second point to complete measurement', 'info');
            } else {
                const endPoint = e.latlng;
                const distance = this.calculateDistance(startPoint, endPoint);
                
                // Remove previous line and popup
                if (measureLine) {
                    this.map.removeLayer(measureLine);
                }
                if (measurePopup) {
                    this.map.closePopup(measurePopup);
                }
                
                // Draw line
                measureLine = L.polyline([startPoint, endPoint], {
                    color: '#e74c3c',
                    weight: 3,
                    dashArray: '10, 10'
                }).addTo(this.map);
                
                // Show distance popup
                const midPoint = L.latLng(
                    (startPoint.lat + endPoint.lat) / 2,
                    (startPoint.lng + endPoint.lng) / 2
                );
                
                measurePopup = L.popup()
                    .setLatLng(midPoint)
                    .setContent(`
                        <div style="text-align: center;">
                            <strong>Distance:</strong> ${distance.toFixed(2)} km<br>
                            <small>Click "Stop Measuring" to exit tool</small>
                        </div>
                    `)
                    .openOn(this.map);
                
                isDrawing = false;
                this.map.getContainer().style.cursor = 'crosshair';
                this.showNotification(`Distance measured: ${distance.toFixed(2)} km. Click two more points for another measurement.`, 'success');
                
                // Reset for next measurement
                startPoint = null;
            }
        };

        // Store references for cleanup
        this.measureControl = {
            handler: measureHandler,
            line: measureLine,
            popup: measurePopup,
            cleanup: () => {
                this.map.off('click', measureHandler);
                if (measureLine) this.map.removeLayer(measureLine);
                if (measurePopup) this.map.closePopup(measurePopup);
                this.map.getContainer().style.cursor = '';
                this.map.closePopup();
            }
        };

        this.map.on('click', measureHandler);
        this.showNotification('Click two points on the map to measure distance', 'info');
    }

    stopMeasuring() {
        if (this.measureControl) {
            // Clean up event listeners and visual elements
            this.measureControl.cleanup();
            this.measureControl = null;
            this.map.getContainer().style.cursor = '';
            this.showNotification('Measuring tool stopped', 'info');
        }
    }

    calculateDistance(point1, point2) {
        const R = 6371; // Earth's radius in kilometers
        const dLat = this.toRadians(point2.lat - point1.lat);
        const dLng = this.toRadians(point2.lng - point1.lng);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(this.toRadians(point1.lat)) * Math.cos(this.toRadians(point2.lat)) *
                  Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    toggleFullscreen() {
        const mapContainer = document.querySelector('.map-container');
        const fullscreenBtn = document.getElementById('fullscreen-btn');
        
        if (!this.isFullscreen) {
            mapContainer.style.position = 'fixed';
            mapContainer.style.top = '0';
            mapContainer.style.left = '0';
            mapContainer.style.width = '100vw';
            mapContainer.style.height = '100vh';
            mapContainer.style.zIndex = '9999';
            fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
            this.isFullscreen = true;
        } else {
            mapContainer.style.position = 'relative';
            mapContainer.style.top = 'auto';
            mapContainer.style.left = 'auto';
            mapContainer.style.width = 'auto';
            mapContainer.style.height = 'auto';
            mapContainer.style.zIndex = 'auto';
            fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
            this.isFullscreen = false;
        }
        
        // Invalidate map size after fullscreen toggle
        setTimeout(() => {
            this.map.invalidateSize();
        }, 100);
    }

    locateUser() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    
                    this.map.setView([lat, lng], 10, { animate: true });
                    
                    // Add user location marker
                    const userIcon = L.divIcon({
                        className: 'user-location-marker',
                        html: '<i class="fas fa-user-circle" style="color: #3498db; font-size: 24px;"></i>',
                        iconSize: [30, 30],
                        iconAnchor: [15, 15]
                    });
                    
                    L.marker([lat, lng], { icon: userIcon })
                        .addTo(this.map)
                        .bindPopup('Your Location')
                        .openPopup();
                    
                    this.showNotification('Location found!', 'success');
                },
                (error) => {
                    this.showNotification('Unable to get your location', 'error');
                }
            );
        } else {
            this.showNotification('Geolocation is not supported by this browser', 'error');
        }
    }

    showLoading() {
        document.getElementById('loading').classList.remove('hidden');
    }

    hideLoading() {
        document.getElementById('loading').classList.add('hidden');
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    showError(message) {
        this.showNotification(message, 'error');
    }
}

// Add notification animations to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize the application when DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new EgyptHeritageGIS();
});

// Make app globally available for popup buttons
window.app = app;