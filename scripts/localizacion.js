function iniciarMap() {
    var coord = { lat: 40.942386, lng: -4.113373 };
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: coord
    });
    var marker = new google.maps.Marker({
      position: coord, 
      map: map 
    })
    var infoWindow = new google.maps.InfoWindow({
      content: 'This is the marker location!'
    });
    marker.addListener('click', function() {
        infoWindow.open(map, marker);
    });
}
