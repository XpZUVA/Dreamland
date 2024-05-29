//logoutButton.js
$(document).ready(function(){
    $('#logout').on('click', function(){
        localStorage.removeItem('username');
        localStorage.removeItem('favorites');
        localStorage.removeItem('profile-img');
        localStorage.setItem('loggedIn', false);
        window.location.href = 'index.html';
    });
});
