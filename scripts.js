document.addEventListener('DOMContentLoaded', function() {
    fetchAlertData();

    function fetchAlertData() {
        fetch('/api/alerts')
            .then(response => response.json())
            .then(data => {
                const alertList = document.getElementById('alerts');
                alertList.innerHTML = '';
                data.alerts.forEach(alert => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${alert.area} - ${alert.type}`;
                    alertList.appendChild(listItem);
                });
            })
            .catch(error => console.error('Error fetching alerts:', error));
    }

    window.initMap = function() {
        const map = new google.maps.Map(document.getElementById('map-container'), {
            zoom: 8,
            center: { lat: 20.5937, lng: 78.9629 } // Center map on India
        });

        const disasterAreas = [
            { lat: 28.4595, lng: 77.0266, name: 'Delhi Earthquake' },
            { lat: 30.7333, lng: 76.7794, name: 'Chandigarh Flood' }
        ];

        disasterAreas.forEach(area => {
            new google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                map: map,
                center: { lat: area.lat, lng: area.lng },
                radius: 2000,
            });
            new google.maps.Marker({
                position: { lat: area.lat, lng: area.lng },
                map: map,
                title: area.name,
                icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
            });
        });
    };

    document.getElementById('detect-location').addEventListener('click', function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                const locationInput = document.getElementById('location');
                locationInput.value = `Latitude: ${lat}, Longitude: ${lng}`;
            }, function(error) {
                console.error('Error getting location:', error);
                alert('Unable to retrieve your location.');
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    });


    window.getDirections = function() {
        const destination = 'Delhi, India';
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`, '_blank');
    };
});
