$(document).ready(function(){
    if(localStorage.getItem('loggedIn') === 'true'){
        $('#loginButtonNav').hide();
        $('#accountButton').show();
        $('#accountLink').show();
        $('#loginLink').hide();
    }else{
        $('#loginButtonNav').show();
        $('#accountButton').hide();
        $('#accountLink').hide();
        $('#loginLink').show();
    }
});