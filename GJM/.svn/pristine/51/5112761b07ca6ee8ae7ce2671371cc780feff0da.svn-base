$(function(){
	$(".borderMore").height($(".moreList").height());
	$(".borderMore").width($(".borderMore").width()-18);
});

function moreMessage(ids){
	if($(".moreList").is(":hidden")){
		$(".moreList").slideDown();
		$(ids).html("收起信息 <i class='fa fa-caret-up'></i>");
	}else{
		$(".moreList").slideUp();
		$(ids).html("详细信息 <i class='fa fa-caret-down'></i>");		
	}
}