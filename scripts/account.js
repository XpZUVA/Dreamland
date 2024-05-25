$(document).ready(function(){
    $('#accountButton').on('click', function(event){
        window.location.href = 'cuenta.html';
    });

    $('#file-input').on('change', function(event) {
        var file = event.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#profile-img').attr('src', e.target.result);
            }
            reader.readAsDataURL(file);
        }
    });

    // Función para obtener favoritos desde localStorage
    function getFavorites() {
        const favorites = localStorage.getItem('favorites');
        return favorites ? JSON.parse(favorites) : {};
    }

    // Función para mostrar las atracciones favoritas
    function showFavorites() {
        // Obtener los favoritos de localStorage
        const favorites = getFavorites();
        const username = localStorage.getItem('username');

        // Crear una lista para las atracciones favoritas
        let favoritesListHTML = `<h2>${username}</h2><h3>Atracciones favoritas</h3><ul>`;

        // Iterar sobre los favoritos y agregarlos a la lista HTML
        for (const key in favorites) {
            if (favorites[key]) {
                const [area, nombreComercial] = key.split('_');
                favoritesListHTML += `<li>${nombreComercial}</li>`;
            }
        }

        favoritesListHTML += '</ul>';

        // Agregar la lista de favoritos al contenedor en el HTML
        $('.profile-info').html(favoritesListHTML);
    }

    // Llamar a la función para mostrar las atracciones favoritas al cargar el documento
    showFavorites();

    $('#logoutButton').on('click', function(event){
        localStorage.removeItem('username');
        localStorage.removeItem('favorites');
        localStorage.setItem('loggedIn', false);
        window.location.href = 'index.html';
    });

});
