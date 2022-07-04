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

   var error = "";
   $('#password').keyup(function() {
      var password = $("#password").val();
      
         if(password.length<8 && password!=""){
            error = "*Password should be minimum 8 characters.*"
            $('#error3').text(error);
            $("#password").css("background-color", "red");
            $('#signup').prop("disabled", true);
         }else{
            error ="";
            $("#password").css("background-color", "black");
            $('#error3').text("")
         }
      });

   
   $('#password2').keyup(function() {
               var password = $("#password").val();
               var password2 = $("#password2").val();
            

               if(password!=password2){
                  if(error!=""){
                     $("#error3").text(error);
                  }else{
                     error ="*Password entered is not the same.*";
                     $("#password2").css("background-color", "red");
                     $("#error3").text(error);
                     $('#signup').prop("disabled", true);
                  }
               }else{
                     $("#password2").css("background-color", "black");
                     $("#error3").text("");
                     $('#signup').prop("disabled", false);     
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
