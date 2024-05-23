$(document).ready(function(){
    // Realizar la llamada a la API
    $.ajax({
        url: 'https://samuelencinas.dev/shows_parque/P03',
        type: 'GET',
        dataType: 'json',
        success: function(data){
            // Limpiar el contenedor de shows
            $('#shows-container').empty();

            // Verificar si hay shows en la respuesta
            if (data && data.shows && data.shows.length > 0) {
                // Iterar sobre los shows de cada área
                $.each(data.shows[0], function(area, shows){
                    // Crear el HTML para los shows del área
                    var html = '<div id="' + area + 'esp"><h2>' + area + '</h2>';
                    if (shows && shows.length > 0) {
                        html += '<ul class="lista-espectáculos">';
                        $.each(shows, function(index, show){
                            html += '<li>' + show.name + '<br>';
                            if (show.hours && show.hours.length > 0) {
                                html += 'Horarios: ' + show.hours.join(', ') + '<br>';
                            } else {
                                html += 'No hay horarios disponibles<br>';
                            }
                            if(show.express) {
                                html += 'Express: Sí<br>';
                            }else{
                                html += 'Este espectáculo no tiene pase express<br>';
                            }
                            html += '</li>';
                        });
                        html += '</ul>';
                    } else {
                        html += '<p>No hay shows disponibles en esta área</p>';
                    }

                    // Agregar el HTML al contenedor
                    $('#shows-container').append(html);
                });
            } else {
                $('#shows-container').html('<p>No se encontraron shows para este parque.</p>');
            }
        },
        error: function(xhr, status, error){
            console.error('Error al obtener los datos:', error);
            $('#shows-container').html('<p>Ocurrió un error al obtener los datos de la API.</p>');
        }
    });
});
