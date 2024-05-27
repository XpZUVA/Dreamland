$(document).ready(function() {

    
    function getComentarios() {
        const comentarios = localStorage.getItem('comentarios');
        return comentarios ? JSON.parse(comentarios) : [];
    }

    
    function saveComentarios(comentarios) {
        localStorage.setItem('comentarios', JSON.stringify(comentarios));
    }

    
    function validateCommentLength(comentario) {
        var regex = new RegExp(/(?:[\w\b;:,\.]+[\s\r\n]*){0,100}/);
        return regex.test(comentario);
    }

    
    function showErrorMessages(messages) {
        $('.errorMessages').html(messages.join('<br>'));
    }

    
    function clearErrorMessages() {
        $('.errorMessages').html('');
    }

    
    $('#postComentario').submit(function(e) {
        e.preventDefault();
        const nombre = localStorage.getItem('username');
        const profileImg = localStorage.getItem('profile-img');
        const comentario = $('#comentarioArea').val();

        const isValid = validateCommentLength(comentario);
        var errorMessages = [];

        if (!isValid) {
            errorMessages.push('El comentario no puede tener más de 100 caracteres.');
        }

        if (errorMessages.length > 0) {
            showErrorMessages(errorMessages);
        } else {
            const comentarios = getComentarios();
            comentarios.push({ nombre: nombre ? nombre : 'Anónimo', comentario, profileImg: profileImg ? profileImg : '/assets/imagenes/default-profile.png'});
            saveComentarios(comentarios);
            $('#comentario').val('');
            clearErrorMessages();
            showComentarios();
            alert('Comentario guardado con éxito');
        }
    });

    
    function showComentarios() {
        const comentarios = getComentarios();
        let comentariosHTML = '<ul>';
        

        comentarios.forEach(comentario => {
            comentariosHTML += `<li><div class="userComentario"><img class="profileImageComentarios" src="${comentario.profileImg}"><h3 class="usernameComentario">${comentario.nombre}</h3></div><p class="comentarioP">${comentario.comentario}</p></li>`;
        });
        comentariosHTML += '</ul>';
        $('#comentariosPosted').html(comentariosHTML);
    }

    
    showComentarios();
    //localStorage.removeItem('comentarios');
    
    
});
