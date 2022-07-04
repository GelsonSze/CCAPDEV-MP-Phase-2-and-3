$(document).ready(function () {

    $('#searchuser').keydown(function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
             var input = $('#searchuser').val();

            $.get('/getCheckUsername', {username: input}, function (result) {
                if(result.username == null){
                    alert("No such user");
                }
                else
                    window.location.href = '/profile/' + input;
            })
        }
    })
})