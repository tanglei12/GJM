$(function(){
	$(".checkbox").on("click",function(){
		if($(this).find("input").attr("type") == "radio"){
			$(".checkbox").css("background-color","#F2F2F2");
			$(".checkbox").css("color","#666");
		}
		if($(this).find("input").is(":checked")){
			$(this).css("background-color","#FF6666");
			$(this).css("color","#FFF");
		}else{
			$(this).css("background-color","#F2F2F2");
			$(this).css("color","#666");
		}
	});
	
});

//文本框字数
function textFont(ids){
	$(ids).next().find(".fontSize").text($(ids).val().replace(/\s/g, "").length);
}