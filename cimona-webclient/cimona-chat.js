$(document).ready(function() {
    $('#cimona-chat').click(function() {
        $('.cbox').toggle();
    });

    function chatwork() {
        $('.cimona-head').hide();
        $('.to-cimona').append('<div class="col-xs-12"><h4>' + $(".chat-area").val() + '</h4></div>');
        $(".chat-area").val('');
        $('.to-cimona').append('<div class="col-xs-12"><h4 class="cimona-reply">I don\'t know any fuck</h4></div>');
        $('.chat-area').addClass('chat-area-ht-alter');
        $('.to-cimona').addClass('to-cimona-ht-alter');
        $('.to-cimona').animate({ scrollTop: $('.to-cimona').prop("scrollHeight") }, 500);
    }
    $('#send-button').click(function() {
        chatwork();
    });
    $('#send-button').mouseover(function(){
        if($(".chat-area").val() == ''){
            $('#send-button').unbind('click');
        }
    });
    $(document).keypress(function(e) {
        if (e.which == 13) {
            chatwork();
        }
    });
    $(document).keyup(function(e) {
        if (e.keyCode == 27) { 
            $('.cbox').hide();
        }
    });

});
