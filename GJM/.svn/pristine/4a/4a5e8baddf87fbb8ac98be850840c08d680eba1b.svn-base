$(function(){
    var token = $("meta[name='CSRFToken']").attr("content");
    $.ajaxSetup({
        beforeSend: function (xhr) {
            if(token){
                xhr.setRequestHeader("CSRFToken", token);
            }
        }}
    );
})