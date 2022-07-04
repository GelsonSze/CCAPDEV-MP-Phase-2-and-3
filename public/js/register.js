$(document).ready(function(){
   $('#username').keyup(function () {
      var username= $("#username").val();
      var lusername = username.toLowerCase();
       $.ajax({
         url: '/api/users/userCheck',
         type: 'POST',
         contentType: 'application/json',
         data: JSON.stringify({"username": username}),
         success: function(response){
            if(response!=""){
               $("#username").css("background-color", "red");
               $("#error1").text("Username is not available");
               $('#signup').prop("disabled", true);
            }else if(username.length>22){
               $("#username").css("background-color", "red");
               error = "*Username must not exceed 22 characters.*";
               $("#error1").text(error);
               $('#signup').prop("disabled", true);
            }
            else{
               $("#username").css("background-color", "black");
               $("#error1").text("");
               $('#signup').prop("disabled", false);
            }  
         }
       });
   });

   $('#email').keyup(function() {
      var email = $("#email").val();
      if ((email.indexOf("@")> -1))
      {
         $("#email").css("background-color", "black");
         $("#error2").text("");
         $('#signup').prop("disabled", false);   
      }else{
         $("#email").css("background-color", "red");
         $("#error2").text("*Email entered is not a valid email*");
         $('#signup').prop("disabled", true);
               
         }
      }
   );

   $('#password2').keyup(function() {
      var password = $("#password").val();
      var password2 = $("#password2").val();
      if(password!=""){
         if(password.length<8 && password!="" || password2.length<8 && password2!=""){
            $('#error').text('*Minimum 8 characters*');
            $('#npass1').css('border', '4px solid red');
            $('#npass2').css('border', '4px solid red');
         }else if(password!=password2){
               $("#password2").css("background-color", "red");
               $("#error3").text("*Password entered is not the same.*");
               $('#signup').prop("disabled", true);
         }
         else{
               $("#password2").css("background-color", "black");
               $("#error3").text("");
               $('#signup').prop("disabled", false);     
         }
      }
   });



   $('#signup').click(function() {
         var username = $("#username").val();
         var email = $("#email").val();
         var password = $("#password").val();

         check = false;

         $('input').each(function() {
            if ($(this).val() != '') {
               check = true;
            }
            else{
               $("#error").text("Fill up all fields.");
               check = false;   
            }
         });
     

      if(check){
         $.ajax({
            url: '/api/users/pregister',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({"username": username, "email": email, "password": password, "images": "/images/Profile_Images/defaultprofile.png"}),
            success: function(response){
               
                  alert("Registered successfully.");
                  $("#name").val("");
                  $("#username").val("");
                  $("#email").val("");
                  $("#password").val("");
                  $("#password2").val("");
               
                
            }
         }); 
      }
   });

});




/*
function verifyReg(){  
    var password1 = document.getElementById('password1').value;
    var password2 = document.getElementById('password2').value;
    var name = document.getElementById('name').value;
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;

    if(password1!=password2){
        document.getElementById("error").innerHTML ="*Password entered is not the same.*";
        return false;
    }

    else if(password1 == "" || password2 =="" || name == "" || username == "" || email== "" ) {  
       document.getElementById("error").innerHTML = "*Please fill in all fields.*";  
       return false;  
    } 

    else if(password1.length < 8) {  
       document.getElementById("error").innerHTML = "*Password length must be at least 8 characters.*";  
       return false;  
    } 
    
    else if(password1.length > 15) {  
       document.getElementById("error").innerHTML = "*Password length must not exceed 15 characters.*";  
       return false;  

    }else {  
        alert("Registered successfully");
        window.location.href ="login_page.html";
            
    }  
  }  
  */