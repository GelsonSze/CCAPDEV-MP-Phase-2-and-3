$(document).ready(function () {    
    $('#error').css('color', 'red');

    $('#submit').click(function (){

        var name = $('#gamename').val();
        var description = $('#gamedescription').val();

        if(name==""){
            $('#gamename').css('border-bottom', '2px solid red');
            $('#error').text('Game name required');
            return;
        }

        $.get('/checkGame', {name: name}, function (result) {
            if(!result) {
                $('#gamename').css('border-bottom', '2px solid red');
                $('#error').text('Game name already taken.');
                return;
            }
            else{
                $('#gamename').css('border', 'none');
                $('#gamename').css('border-bottom', '0.5px solid #fff');
                $('#error').text('');
            }

            var genre = []; //all checked genres into this array
            $.each($("input[name='genre']:checked"), function(){
                genre.push($(this).val());
            });

            if(genre==""){ //none ticked
                $('#error').text('Tick atleast one genre.');
                return;
            }

            if(document.getElementById('gameimage').files.length==0){ //if input file is empty
                $('#error').text('Game image required.');
                return;
            }

            
            $('#error').text('');

            var fd = new FormData();  
            fd.append('name', name);
            fd.append('description', description);
            fd.append('genre', genre);
            fd.append('image', document.getElementById('gameimage').files[0]);

            $.ajax({
                url: '/addGame',
                data: fd,
                processData: false,
                contentType: false,
                type: 'POST',
                success: function(flag){
                    if(flag == false) {
                        $('#error').text('Only .jpeg, .jpg, and .png files accepted.');
                    }
                    else {
                        alert("Successfully added game.");
                        window.location.replace("/browse");
                    }
                }
            });
        });
    });
})