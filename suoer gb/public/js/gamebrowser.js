$(document).ready(function () {

    $('#filter input').keydown(function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            var input = $('#filter input').val();

            var gameinput ={
                gamename: input
            }

            $.get('/findgame',gameinput,function(gamepage){
                if(gamepage !=null){
                    var htmlstring = '<div><a href="/gamepage/' + gamepage.name + '"><img src="' + gamepage.image + '" alt ="' + gamepage.name + '"/></a></div>';
                    $('#games').html('');
                    $('#games').append(htmlstring);
                }
                else{
                    $('#filter input').attr('placeholder','No such game found!');
                }
                
            });
            $('#filter input').val('');
        }
        else
            $('#filter input').attr('placeholder','Search Games');
    }),

    $('#filter button').click(function () {
       var genre = $(this).attr('name');
        if(genre != "All"){
            var genreinput = {
                    genre: genre
            }
            $.get('/findgenre',genreinput,function(games){
                $('#games').html('');
                games.forEach(function(gamepage){
                    var htmlstring = '<div><a href="/gamepage/' + gamepage.name + '"><img src="' + gamepage.image + '" alt ="' + gamepage.name + '"/></a></div>';
                    $('#games').append(htmlstring);
                })
            })
        }
        else{
            $('body').load('/browse');
        }
    }),

    $('#addgame').on("click",function () {
        $.get('/gameinput');
    })

})