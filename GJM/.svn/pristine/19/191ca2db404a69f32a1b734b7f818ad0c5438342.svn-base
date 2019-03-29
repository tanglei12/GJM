var bullets = document.getElementById('scroll_position').getElementsByTagName('li');
var html=document.getElementById('scroll_img');
console.log(html);
var slider = Swipe(html, {
    auto: 4000,
    continuous: true,
    callback: function(pos) {
        var i = bullets.length;
        while (i--) {
            bullets[i].className = ' ';
        }
        // bullets[pos].className = 'on';
    }
});

$(function(){
    $('.scroll_position_bg').css({
        width:$('#scroll_position').width()
    });
});