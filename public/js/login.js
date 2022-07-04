$(document).ready(function(){

    $('#login').click(function () {
        var username = $("#username").val();
        var password = $("#password").val();
        var check = false;

        $('input').each(function() {
            if ($(this).val() != '') {
                check = true;
            }
            else{
                $("#error").text("Fill up all fields.");
                check = false;
                return false;
            }
        });
        if(check == true){
            $.ajax({
                url: '/api/users/plogin',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({"username": username, "password": password}),
                success: function(response){
                    if(response==""){
                        console.log(response);
                        $("#error").text("Incorrect username or password.");
                        $("#password").val("");
                    }else{
                       window.location.href = '/browse';
                        $("#username").val("");
                        $("#password").val("");
                    }
               }
            }); 
            
        }
    });


})

