$(document).ready(function () {
    $(document).on('click', '.gamebutton#fav',function (){
       var game = {
           gamename : $(this).attr('name')
       }
       $.get('/libraryfavoritegame', game, function(flag){
           if(!flag){
               $.get('/libraryremovefavoritegame', game, function(flag){
                   alert("Removed game from favorites!");
               });
           }
           else{
               alert("Added game to favorites!");
           };
       });
   }),

   $(document).on('click', '.gamebutton#del', function(){
       var game = {
           gamename : $(this).attr('name')
       }
       $.get('/libraryremovefavoritegame', game, function(flag){});
       $.get('/libraryremovegame', game, function(flag){
           if(flag){
               $('body').load('/library/' + req.session.username);
           }
       });
   }),

   $('#gamesearch').keydown(function (e) {
       if (e.key === 'Enter' || e.keyCode === 13) {
           var input = $('#gamesearch').val();
           var gameinput = {
               gamename: input
           } 
           $.get('/libraryfindgame',gameinput,function(gamepage){
               if(gamepage != null){
                   $('#gameslist').html('');
                   var sectiontitle = '<div id="divsectiontitle"><p id="sectiontitle">Game Library</p><img src="/images/Home_Images/bg1.png" alt="Background" /> </div>';
                   var htmlstring = '<div><p id="hoursplayed">' + gamepage.hours + ' hours</p><a href="/gamepage/' + gamepage.name + '"><img src=' + gamepage.image +  ' alt=' + gamepage.name + '/>' + '</a><button class="gamebutton" id="fav" name="' + gamepage.name + '">Favorite</button><button class="gamebutton" id="del" name="' + gamepage.name + '">Delete</button></div>'
                   $('#gameslist').append(sectiontitle);
                   $('#gameslist').append(htmlstring);
               }
               else
                   $('#gamesearch').attr('placeholder','No such game found!');
           });
           $('#gamesearch').val('');
       }
       else
           $('#gamesearch').attr('placeholder','Search games...');
   })
});