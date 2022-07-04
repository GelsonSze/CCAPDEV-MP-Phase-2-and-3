$(document).ready(function () {
    $('#like').click(function () {
        var gamename = $('#container #title').text();

        if($('#dislike').hasClass('disabled')){
            var gamepage = {
                gamename : gamename,
                like: '1',
                dislike: '-1'
            }
            $.get('/modifylikedislike',gamepage, function(rating){
                $('#like').addClass("disabled");
                $('#dislike').removeClass("disabled");

                $('#rating').text(rating);
            })
            $.get('/modifylikedgames', gamepage, function(flag){});
            $.get('/modifydislikedgames', gamepage, function(flag){});
        }
        else if($('#like').hasClass('disabled')){
            var gamepage = {
                gamename : gamename,
                like: '-1',
                dislike: '0'
            }
            $.get('/modifylikedislike',gamepage, function(rating){
                $('#like').removeClass("disabled");

                $('#rating').text(rating);
            })
            $.get('/modifylikedgames', gamepage, function(flag){});
        }
        else{
            var gamepage = {
                gamename : gamename,
                like: '1',
                dislike: '0'
            }
            $.get('/modifylikedislike',gamepage, function(rating){
                $('#like').addClass("disabled");

                $('#rating').text(rating);
            })
            $.get('/modifylikedgames', gamepage, function(flag){});
        }
    }),

    $('#dislike').click(function () {
        var gamename = $('#container #title').text();
        if($('#like').hasClass('disabled')){
            var gamepage = {
                gamename : gamename,
                like: '-1',
                dislike: '1'
            }
            $.get('/modifylikedislike',gamepage, function(rating){
                $('#like').removeClass("disabled");
                $('#dislike').addClass("disabled");

                $('#rating').text(rating);
            })
            $.get('/modifylikedgames', gamepage, function(flag){});
            $.get('/modifydislikedgames', gamepage, function(flag){});
        }
        else if($('#dislike').hasClass('disabled')){
            var gamepage = {
                gamename : gamename,
                like: '0',
                dislike: '-1'
            }
            $.get('/modifylikedislike',gamepage, function(rating){
                $('#dislike').removeClass("disabled");

                $('#rating').text(rating);
            })
            $.get('/modifydislikedgames', gamepage, function(flag){});
        }
        else{
            var gamepage = {
                gamename : gamename,
                like: '0',
                dislike: '1'
            }
            $.get('/modifylikedislike',gamepage, function(rating){
                $('#dislike').addClass("disabled");

                $('#rating').text(rating);
            })
            $.get('/modifydislikedgames', gamepage, function(flag){});
        }
    }),

    $('#add').click(function () {
        var gamename = $('#container #title').text();
        var hours = prompt("Please enter hours played:");

        if(!isNaN(hours) && hours >= 0){
            var gamepage = {
                gamename: gamename,
                hours: hours
            }
            $.get('/libraryaddgame',gamepage, function(flag){
                if(!flag){
                    alert("You already have the game in your library!");
                }
            })
        }
        else
            alert("Invalid input");
    }),

    $('#reviews #submit').click(function () {

        if($('#reviews #textfield').val().length !== 0){
            var gamename = $('#container #title').text();
            var review = $('#reviews #textfield').val();
            $.get('/postcomment', {"gamename": gamename, "review": review}, function(flag){
                if(flag)
                    $('body').load('/gamepage/' + gamename);
            });

        }
    }),

    $('#delete.edit').click(function () {
        var gamename = $('#container #title').text();
        var review = $(this).parent().children('.comment').text();
        $.get('/removecomment', {"gamename": gamename, "review": review}, function(flag){
            if(flag)
                    $('body').load('/gamepage/' + gamename);
        });
    }),

    $('#edit.edit').click(function () {
        var review = $(this).parent().children('.comment').text();
        var htmlstring = '<textarea class="comment-textfield">' + review + '</textarea>';
        $(this).parent().children('.comment').html('');
        $(this).parent().children('.comment').html(htmlstring);
        $('#edit.edit').addClass("submit-edit");
    }),

    $(document).on('mouseup', '.submit-edit', function(){
        $('#edit.edit').removeClass("submit-edit");
        var gamename = $('#container #title').text();
        var oldreview = $(this).parent().children('.comment').text();
        var newreview = $(".comment-textfield").val();
        $.get('/editcomment',{"gamename": gamename , "oldreview" : oldreview, "newreview":newreview}, function(flag){
            if(flag){
                $('body').load('/gamepage/' + gamename);
            }
        });
    })

})