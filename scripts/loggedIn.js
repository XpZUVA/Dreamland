$(document).ready(function(){
    if(localStorage.getItem('loggedIn') === 'true'){
        $('#loginButtonNav').hide();
        $('#accountButton').show();
    }else{
        $('#loginButtonNav').show();
        $('#accountButton').hide();
    }
});