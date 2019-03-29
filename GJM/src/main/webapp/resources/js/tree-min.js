$(function(){
	$('head').append('<link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">');
});

/**
 * 展开更多数据
 */
function downChecked(ids){
	if($(ids).next().is(":hidden")){
		$(ids).prev().find("i").attr("class","fa fa-minus");
		$(ids).next().show();
	}else{
		$(ids).prev().find("i").attr("class","fa fa-plus");
		$(ids).next().hide();
	}
}

/**
 * 选择
 * 
 * @param ids 自己
 * @param pids 超父级
 */
function treeclick(ids,pids,click,closeClick){
	if($(pids).attr("data-click")=="true"){
		if($(ids).find("input").is(":checked")){
			$(ids).find("input").attr("checked",false);
			$(pids).next().next().hide();
			eval(closeClick);
		}else{
			$(pids).find(".checkbox-a input").attr("checked",false);
			$(ids).find("input").attr("checked",true);
			eval(click);
		}
	}
}

/**
 * 图标展开更多数据
 * 
 * @param ids
 */
function iconDown(ids){
	if($(ids).next().next().is(":hidden")){
		$(ids).find("i").attr("class","fa fa-minus");
		$(ids).next().next().show();
	}else{
		$(ids).find("i").attr("class","fa fa-plus");
		$(ids).next().next().hide();
	}
}