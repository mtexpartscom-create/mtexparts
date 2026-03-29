// Google Maps Integration
function initMap() {
  // MTEX PARTS Location: Варна, Улица Краков 438
  const location = { lat: 43.2141, lng: 27.9147 };
  
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: location,
    styles: [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#1a1a2e"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#242f3e"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#746855"
          }
        ]
      },
      {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#d59563"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#d59563"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#263c3f"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#6b9080"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#38414e"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#212a37"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9ca5b3"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#746855"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#1f2835"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#f3751ff"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#2f3948"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#d59563"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#17263c"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#515c6d"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#17263c"
          }
        ]
      }
    ]
  });

  // Add marker for MTEX PARTS
  const marker = new google.maps.Marker({
    position: location,
    map: map,
    title: 'MTEX PARTS - България, град Варна, Улица Краков 438',
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 12,
      fillColor: '#dc2626',
      fillOpacity: 1,
      strokeColor: '#fff',
      strokeWeight: 2
    }
  });

  // Info window
  const infoWindow = new google.maps.InfoWindow({
    content: `
      <div style="color: #000; padding: 10px;">
        <h3 style="margin: 0 0 10px 0; color: #dc2626;">MTEX PARTS</h3>
        <p style="margin: 5px 0;"><strong>Адрес:</strong> България, град Варна, Улица Краков 438</p>
        <p style="margin: 5px 0;"><strong>Телефон:</strong> +359 898 606 626 / +359 896 811 902</p>
        <p style="margin: 5px 0;"><strong>Email:</strong> mtex.parts.service@gmail.com</p>
        <p style="margin: 5px 0;"><strong>Работно време:</strong> Пн-Сб 9:30 - 18:30</p>
      </div>
    `
  });

  marker.addListener('click', () => {
    infoWindow.open(map, marker);
  });

  // Open info window by default
  infoWindow.open(map, marker);
}

// Initialize map when page loads
document.addEventListener('DOMContentLoaded', function() {
  // Check if map element exists
  if (document.getElementById('map')) {
    // Load Google Maps API
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDummyKeyForDemo&callback=initMap';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }
});
