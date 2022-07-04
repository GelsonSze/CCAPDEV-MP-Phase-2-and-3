$(document).ready(function () {    
    $('#error').css('color', 'red');

    $.get('/getCurrentUser', {}, function (currentuser) {
        $('#username').keyup(function () {
            var username = $('#username').val();
            if(currentuser == username) {
            //if("pepefrog"==username){
                $('#username').css('border', '4px solid #ccc');
                $('#username').css('outline-color', 'black');
                $('#error').text('');
                $('#submit').prop('disabled', false); //enabled save changes
                $('#submit').css('opacity', '1'); //normal dim save changes
            }
            else{
                $.get('/getCheckUsername', {username: username}, function (result) {
                    if(username=="") {
                        $('#username').css('border', '4px solid red');
                        $('#username').css('outline-color', 'red');
                        $('#error').text('Username required');
                        $('#error').css('color', 'red');
                        $('#submit').prop('disabled', true); //disable save changes
                        $('#submit').css('opacity', '0.4'); //dim save changes
                    }
                    else if(result.username == username) {
                        $('#username').css('border', '4px solid red');
                        $('#username').css('outline-color', 'red');
                        $('#error').text('Username taken');
                        $('#error').css('color', 'red');
                        $('#submit').prop('disabled', true); //disable save changes
                        $('#submit').css('opacity', '0.4'); //dim save changes
                    }
                    else {
                        $('#username').css('border', '4px solid green');
                        $('#username').css('outline-color', 'green');
                        $('#error').text('Username available');
                        $('#error').css('color', '#2bae32');
                        $('#submit').prop('disabled', false);
                        $('#submit').css('opacity', '1');
                    }
                });
            }
        });
    
        $('#submit').click(function (){
            var username = $('#username').val();
            var description = $('#description').val();
            var email = $('#email').val();
            var cpass = $('#cpass').val();
            var npass1 = $('#npass1').val();
            var npass2 = $('#npass2').val();
            var pass;
            //var myFile = $('#file').prop('files');
            //var myFile = $('#file').files[0];
            //document.getElementById('upload-form').submit();
    
            if(description.length>50){
                $('#description').css('border', '4px solid red');
                $('#error').text('50 Characters Max');
                return;
            }
            else{
                $('#description').css('border', '4px solid green');
            }
            if(!document.getElementById('details')[2].checkValidity() || email==""){
                $('#email').css('border', '4px solid red');
                $('#error').text('Invalid email');
                return;
            }
            else{
                $('#email').css('border', '4px solid green');
            }
    
            $.get('/checkPassword', {password:cpass}, function (isPasswordCorrect) {
                if(!isPasswordCorrect){
                //if(cpass!="password123"){
                    $('#cpass').css('border', '4px solid red');
                    if(cpass=="")
                        $('#error').text('Password required');
                    else
                        $('#error').text('Incorrect password');
                    return;
                }
                else{
                    $('#cpass').css('border', '4px solid green');
                }
                if(npass1.length<8 && npass1!="" || npass2.length<8 && npass2!=""){
                    $('#error').text('Minimum 8 characters');
                    $('#npass1').css('border', '4px solid red');
                    $('#npass2').css('border', '4px solid red');
                    return;
                }
                else if (npass1 != npass2) {
                    $('#error').text('Password not matching');
                    $('#npass1').css('border', '4px solid red');
                    $('#npass2').css('border', '4px solid red');
                    return;
                } 
                else if (npass1 != "") {
                    $('#npass1').css('border', '4px solid green');
                    $('#npass2').css('border', '4px solid green');
                    pass=npass1; //new password since its matching
                }
                else{
                    $('#npass1').css('border', '4px solid #ccc');
                    $('#npass2').css('border', '4px solid #ccc');
                    pass=cpass; //empty so password will stay the same
                }
                $('#error').text('');
        
                var fd = new FormData();  
                var url;  
                fd.append('username', username);
                fd.append('description', description);
                fd.append('email', email);
                fd.append('password', pass);
                if(document.getElementById('file').files.length==0) //if input file is empty, update without new img
                    url = '/getUpdateUser';
                else{
                    fd.append('image', document.getElementById('file').files[0]);
                    url = '/getUpdateUserImg';
                }
                $.ajax({
                    url: url,
                    data: fd,
                    processData: false,
                    contentType: false,
                    type: 'POST',
                    success: function(flag){
                        if(flag == false) {
                            //alert("Failed to update.");
                            $('#error').text('Only .jpeg, .jpg, and .png files accepted.');
                        }
                        else {
                            alert("Successfully updated.");
                            window.location.replace("/editprofile");
                        }
                    }
                });
            });
        });
    
        $('#delete').click(function (){
            var cpass = $('#cpass').val();
            $.get('/checkPassword', {password:cpass}, function (isPasswordCorrect) {
                if(!isPasswordCorrect){
                    $('#cpass').css('border', '4px solid red');
                    if($('#cpass').val()=="")
                        $('#error').text('Password required');
                    else
                        $('#error').text('Incorrect password');
                    return;
                }
                else{
                    $('#cpass').css('border', '4px solid green');
                }
                if(prompt("Please type CONFIRM DELETE. Anything else will cancel the process.") != "CONFIRM DELETE")
                    alert("Deletion cancelled.");
                else if(confirm("Are you sure you want to delete your account? It can never be retrieved after.")){
                    $.get('/delete', {}, function (flag) { //deletes the first account found
                        if(flag == false) {
                            alert("Failed to delete.");
                        }
                        else {
                            alert("Account successfully deleted.");
                            window.location.replace("/logOut");
                        }
                    });
                }
                else{
                    alert("Process cancelled.");
                }
            });
        });
    });
})