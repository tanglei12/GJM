$(function(){ 
	querySource();
	$(":checkbox").click(function(){ 
		if($(this).attr("checked")!='true') 
		{ 
			var name = $(this).attr("name");
			$(this).siblings(":checkbox[name='"+name+"']").attr("checked",false); 
			$(this).attr("checked",true); 
		} 
	}); 
}); 
//毫秒转换为日期格式
var format = function(time, format){
    var t = new Date(time);
    var tf = function(i){return (i < 10 ? '0' : '') + i};
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
        switch(a){
            case 'yyyy':
                return tf(t.getFullYear());
                break;
            case 'MM':
                return tf(t.getMonth() + 1);
                break;
            case 'mm':
                return tf(t.getMinutes());
                break;
            case 'dd':
                return tf(t.getDate());
                break;
            case 'HH':
                return tf(t.getHours());
                break;
            case 'ss':
                return tf(t.getSeconds());
                break;
        }
    });
}

//查询所有来源信息
function querySource(){
	$.ajax({
		type: "POST",
		url: "/book/querySource",
		data: "id="+id,
		contentType: "application/x-www-form-urlencoded; charset=utf-8",
		dataType: "json",
		async:false,
		success: function(result) {
			var count = result.houseBookSourceListCount;
			var html = "";
			var count = 1;
			$.each(result.houseBookSourceList, function(index, item){
				$("#templateArea").html("");
				html += "<input type='checkbox' name='templateArea' value='" + item.bs_id + "' id='templateArea" + item.bs_id + "'>" + item.sourceName;
				if(count >= 5){
					html += "<br>";
					count = 0;
				} else {
					count += 1;
				}
		    	
			});
			$("#templateArea").append(html);
		}
	});
}

//添加预约模板信息
function saveBookTemplateInfo(){
	// 背景图
	var imgSrc = "";
	if($(".image-upload-box .image-item").length > 0){
		imgSrc = $(".image-upload-box .image-item img").attr("src");
	}
	if(imgSrc == ""){
		$.jBox.tip("请上传模板图像", "error");
		return;
	}

	$("input[name='templateArea']").val(houseBookTemplateArea);
	$("input[name='templateImg']").val(imgSrc);
	document.getElementById("addSubmit").submit();
}

var houseBookTemplateArea="";
$(document).on("change", "input[name='templateArea']", function(){
	$("input[name='templateArea']:checked").each(function(){
		houseBookTemplateArea += $(this).attr("value") + "&";
	});
});

//查询预约配置信息
function selectHouseBookTemplate(id){
	if(null != id && id != undefined && id != ""){
		
		$.ajax({
			type: "POST",
			url: "/book/queryHouseBookTemplateById",
			data: "id="+id,
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			dataType: "json",
			async:false,
			success: function(result) {
				if(result != "1"){
					$("#houseBookTemplate").html("");
					houseBookTemplateInfo(result.houseBookTemplateInfo)
				}
			}
		});
	}
}

//添加预约配置信息
function houseBookTemplateInfo(houseBookTemplateInfo){
	$("input[name='bt_id']").val(houseBookTemplateInfo.bt_id);
	$("input[name='templateName']").val(houseBookTemplateInfo.templateName);
	$("textarea[name='templateDesc']").val(houseBookTemplateInfo.templateDesc);
	
	if(houseBookTemplateInfo.templateUse == "1"){
		$("input[name='templateUse'] [value='1']").attr("selected", "selected"); 
	}
	if(houseBookTemplateInfo.templateUse == "2"){
		$("input[name='templateUse'] [value='2']").attr("selected", "selected"); 
	}
	if(houseBookTemplateInfo.templateStatus == "0"){
		$("input[name='templateStatus'] [value='0']").attr("selected", "selected"); 
	}
	if(houseBookTemplateInfo.templateStatus == "1"){
		$("input[name='templateStatus'] [value='1']").attr("selected", "selected"); 
	}
	if(houseBookTemplateInfo.templateImg != null){
		$(".image-show").fadeOut().remove();
		var html = "";
		html += '<div class="image-item" style="width:268px;">';
		html += '	<img class="image-item-img" src="http://www.cqgjp.com' + houseBookTemplateInfo.templateImg + '">';
		html += '	<span class="image-item-close icon-remove" title="删除" data-src="http://www.cqgjp.com' + houseBookTemplateInfo.templateImg + '"></span>';
		html += '</div>';
		$(".image-item-add").before(html);
		$(".image-item-add").hide();
	}
}

/** 查询Url参数*/
function getUrlParam(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return decodeURI(r[2]); return null; 
}