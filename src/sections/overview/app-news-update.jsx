import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Box, CircularProgress, Typography, IconButton, Tooltip } from '@mui/material';
import { Refresh, MyLocation, Fullscreen } from '@mui/icons-material';

// Configuration Mapbox
mapboxgl.accessToken = 'pk.eyJ1Ijoiam4wMDciLCJhIjoiY21haW9yeXFxMGNuODJrcjQzamlyenF6aCJ9.nfHTNAMGgwwbawLTNJrLLg';

// Données simulées des employés
const mockEmployees = [
  {
    id: 1,
    name: "Jean Dupont",
    role: "Commercial",
    image: "https://i.imgur.com/JQK1jzM.jpg",
    lng: 2.3522,
    lat: 48.8566
  },
  {
    id: 2,
    name: "Marie Lambert",
    role: "Technicienne",
    image: "https://i.imgur.com/WCzJDZz.jpg",
    lng: 2.3694,
    lat: 48.8542
  },
  {
    id: 3,
    name: "Thomas Martin",
    role: "Livraison",
    image: "https://i.imgur.com/3JQ1jzM.jpg",
    lng: 2.3622,
    lat: 48.8586
  }
];

export default function EmployeeTrackingMap() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);
  const [employees, setEmployees] = useState(mockEmployees);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Initialisation de la carte
  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [2.3522, 48.8566],
      zoom: 13,
      pitch: 45,
      antialias: true
    });

    // Contrôles avancés
    map.current.addControl(new mapboxgl.NavigationControl());
    map.current.addControl(new mapboxgl.FullscreenControl());
    map.current.addControl(new mapboxgl.ScaleControl());

    map.current.on('load', () => {
      setLoading(false);
      updateEmployeePositions();
    });

    return () => {
      markers.current.forEach(marker => marker.remove());
      map.current?.remove();
    };
  }, []);

  // Simulation de mouvement aléatoire
  const updateEmployeePositions = () => {
    setEmployees(prevEmployees => 
      prevEmployees.map(emp => ({
        ...emp,
        lng: emp.lng + (Math.random() * 0.002 - 0.001),
        lat: emp.lat + (Math.random() * 0.002 - 0.001)
      }))
    );
    setLastUpdate(new Date());
  };

  // Mise à jour automatique toutes les 5 secondes
  useEffect(() => {
    const interval = setInterval(updateEmployeePositions, 5000);
    return () => clearInterval(interval);
  }, []);

  // Mise à jour des marqueurs
  useEffect(() => {
    if (!map.current || !map.current.isStyleLoaded()) return;

    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    employees.forEach(employee => {
      const el = document.createElement('div');
      el.className = 'employee-marker';
      el.innerHTML = `
        <div class="marker-pulse" style="background-color: ${getRoleColor(employee.role)}"></div>
        <div class="marker-icon">
          <img src="${employee.image}" alt="${employee.name}" />
        </div>
      `;

      const marker = new mapboxgl.Marker({
        element: el,
        offset: [0, -15]
      })
        .setLngLat([employee.lng, employee.lat])
        .setPopup(new mapboxgl.Popup().setHTML(`
          <div style="min-width: 200px">
            <h3 style="margin: 0 0 5px 0">${employee.name}</h3>
            <div style="display: flex; align-items: center; margin-bottom: 5px">
              <span style="display: inline-block; width: 10px; height: 10px; 
                background: ${getRoleColor(employee.role)}; border-radius: 50%; margin-right: 5px"></span>
              <strong>${employee.role}</strong>
            </div>
            <p style="margin: 5px 0; font-size: 0.9em">Dernière mise à jour: ${lastUpdate.toLocaleTimeString()}</p>
            <button style="padding: 5px 10px; background: #4285F4; color: white; border: none; 
              border-radius: 3px; cursor: pointer">Voir fiche</button>
          </div>
        `))
        .addTo(map.current);

      markers.current.push(marker);
    });

    // Ajustement de la vue
    const bounds = new mapboxgl.LngLatBounds();
    employees.forEach(emp => bounds.extend([emp.lng, emp.lat]));
    map.current.fitBounds(bounds, { padding: 100, maxZoom: 15 });
  }, [employees, lastUpdate]);

  // Couleurs par rôle
  const getRoleColor = (role) => {
    const colors = {
      'Commercial': '#4285F4',
      'Technicienne': '#EA4335',
      'Livraison': '#FBBC05',
      'default': '#34A853'
    };
    return colors[role] || colors['default'];
  };

  // Centrer sur les employés
  const focusOnEmployees = () => {
    if (!map.current) return;
    const bounds = new mapboxgl.LngLatBounds();
    employees.forEach(emp => bounds.extend([emp.lng, emp.lat]));
    map.current.fitBounds(bounds, { padding: 100, duration: 1000 });
  };

  // Styles CSS intégrés
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .employee-marker {
        position: relative;
        width: 40px;
        height: 40px;
      }
      .marker-pulse {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        opacity: 0.6;
        animation: pulse 2s infinite;
      }
      .marker-icon {
        position: absolute;
        width: 30px;
        height: 30px;
        left: 5px;
        top: 5px;
        border-radius: 50%;
        overflow: hidden;
        border: 2px solid white;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
      }
      .marker-icon img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      @keyframes pulse {
        0% { transform: scale(0.8); opacity: 0.6; }
        70% { transform: scale(1.3); opacity: 0.1; }
        100% { transform: scale(0.8); opacity: 0.6; }
      }
      .mapboxgl-popup-content {
        border-radius: 8px !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <Box sx={{ position: 'relative', height: '100vh', width: '100%' }}>
      {loading && (
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.1)',
          zIndex: 1000
        }}>
          <CircularProgress />
          <Typography variant="body1" sx={{ ml: 2 }}>Chargement de la carte...</Typography>
        </Box>
      )}
      
      {/* Contrôles personnalisés */}
      <Box sx={{
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: 1
      }}>
        <Tooltip title="Actualiser les positions">
          <IconButton 
            color="primary" 
            sx={{ backgroundColor: 'white', boxShadow: 3 }}
            onClick={updateEmployeePositions}
          >
            <Refresh />
          </IconButton>
        </Tooltip>
        <Tooltip title="Centrer sur les employés">
          <IconButton 
            color="primary" 
            sx={{ backgroundColor: 'white', boxShadow: 3 }}
            onClick={focusOnEmployees}
          >
            <MyLocation />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Dernière mise à jour */}
      <Box sx={{
        position: 'absolute',
        bottom: 20,
        left: 10,
        backgroundColor: 'white',
        padding: '5px 10px',
        borderRadius: 1,
        boxShadow: 3,
        zIndex: 1000
      }}>
        <Typography variant="caption">
          Dernière mise à jour: {lastUpdate.toLocaleTimeString()}
        </Typography>
      </Box>

      <Box
        ref={mapContainer}
        sx={{
          height: '100%',
          width: '100%',
          borderRadius: 1,
          overflow: 'hidden'
        }}
      />
    </Box>
  );
}