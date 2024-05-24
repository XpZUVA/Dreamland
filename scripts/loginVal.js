$(document).ready(function() {

    $('#loginButtonNav').click(function() {
        window.location.href = 'login.html';
    });


    $('#formLogin').submit(function(event) {
        event.preventDefault(); 

        var user = $('#username').val().trim();
        var email = $('#email').val().trim();
        var password = $('#password').val().trim();

        var userRegex = /^(?=[a-zA-Z0-9._]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Mínimo 8 caracteres, al menos una letra y un número

        var isValid = true;
        var errorMessages = '';


        if (!userRegex.test(user)) {
            isValid = false;
            errorMessages += '<p>Usuario inválido. Debe tener entre 3 y 20 caracteres y no puede contener dos puntos ni guiones.</p>';
        }

        if (!emailRegex.test(email)) {
            isValid = false;
            errorMessages += '<p>Email inválido</p>';
        }


        if (!passwordRegex.test(password)) {
            isValid = false;
            errorMessages += '<p>Contraseña inválida. Debe tener al menos 8 caracteres, incluyendo una letra y un número.</p>';
        }

        
        if (isValid) {
            localStorage.setItem('loggedIn', true);
            localStorage.setItem('username', user);
            window.location.href = 'index.html';             
        } else {
            $('.errorMessages').html(errorMessages);
        }
    });

    $('#registerButton').click(function() {
        window.location.href = 'register.html';
    });
});
