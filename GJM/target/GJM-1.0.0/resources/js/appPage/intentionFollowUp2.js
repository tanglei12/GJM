var uploadImage = null;
$(function(){
	// 图片上传
	uploadImage = $("#uploadImage").imageUpload({
		skin: "appImageBox",
		limitUpload: false,
		isTailor: false,
        uploadUrl : "/file/uploadImage",
        deleteUrl : "/file/deleteImageFile",
        uploadType : "houseImage",
		success :function(box){
			box.find('.image-item-add').append('<span class="imagefont">上传照片</span>');
			var html = '';
			html += '<div class="tips" style="position: absolute;top: 16px;left: 80px;color:#999">';
			html += '	<span class="" style="display: inline-block;color: #666666;font-size: 13px;">温馨提示：</span>';
			html += '	<ul class="" style="font-size: 12px;color: #666;">';
			html += '		<li class="">1、房间干净整洁，照片不要有人影</li>';
			html += '		<li class="">2、横向拍摄，仅支持jpg、png格式</li>';
			html += '	</ul>';
			html += '</div>';
			box.append(html);
		},
		builds : {
			onUpload : function(img){
				var imgHtml = $("#uploadImage").html();
				if(null != imgHtml && "" != imgHtml){
					$(".tips").hide();
				}
			},
			onDelete : function(path){
				setTimeout(function(){
					var imgHtml = $("#uploadImage").html();
					if(imgHtml.indexOf("<img") < 0){
						$(".tips").show();
					}
				}, 800);
			}
		}
	});
	$("#renovation").val("2");
	data();
	mui.previewImage();
	mui("#configure").on('tap','.checkbox', function(){
		if($(this).find("input").attr("type") == "radio"){
			$(".checkbox").attr("class","checkbox");
		}
		if($(this).attr("class") == "checkbox click"){
			$(this).attr("class","checkbox");
		}else{
			$(this).attr("class","checkbox click");
		}
	});
	mui("#people").on('tap','.checkbox', function(){
		if($(this).find("input").attr("type") == "radio"){
			$(".checkbox").attr("class","checkbox");
		}
		if($(this).attr("class") == "checkbox click"){
			$(this).attr("class","checkbox");
		}else{
			$(this).attr("class","checkbox click");
		}
	});
})

// 读取数据
function data(){
	$.ajax({
  	    type: "POST",
  	    url: "/intention/jumpAddIntentionAjax",
  	    data : {
  	    	phi_id: getQueryString("phi_id"),
  	    },
  	    dataType: "json",
  	    success: function(result) {
  	    	// 意向图片
  	    	uploadImage.push(result.img);
  	    	// 若有图片则隐藏文字提示
  	    	if(!$.isEmptyObject(result.img)){
  	    		$(".tips").hide();
  	    	}
  	    	$("#area").val(result.hi.hi_measure == null? "": result.hi.hi_measure);
  	    	$("#hi_code").val(result.hi.hi_code == null? "": result.hi.hi_code);
  	    	$("#renovation").val(result.hi.hi_situation == null? "2": result.hi.hi_situation);
  	    	$("#brand").val(result.hi.hb_id == null? "": result.hi.hb_id);
  	    	if(result.hi.hi_project != null){
  	    		var configure = result.hi.hi_project.split(",");
                $("#configure label").each(function(i){
                    for (var i = 0; i < configure.length; i++) {
                        if($(this).text() == configure[i]){
                            $(this).find("input").attr("checked",true);
                            $(this).attr("class","checkbox click");
                        }
                    }
                });

  	    	}
  	    	if(result.hi.recommend_name != null){
  	    		// shenhx 2017-04-19 房源实勘-推荐人群未正常加载
  	    		var recommend = result.hi.recommend_name.split(",");
    			$("#people label").each(function(i){
    				for (var i = 0; i < recommend.length; i++) {
  	    				if($(this).text() == recommend[i]){
  	    					$(this).find("input").attr("checked",true);
  	    					$(this).attr("class","checkbox click");
  	    				}
    				}
    			});
  	    	}
  	    	$("#text").val(result.hi.hi_content);
  	    	$("#builTypes").val(orderByPhiType(result.hi.phi_type));
  	    	$(".fontSize").text($("#text").val().replace(/\s/g, "").length);
  	    }
	});

}

/**
 * 毫秒转换为日期格式
 * @param time 时间/时间字符串
 * @param format 时间格式 "yyyy-MM-dd" || "yyyy-MM-dd HH:mm:ss"
 * @returns
 */
function format(time, format) {
	if (time == null) {
		return "";
	}
	var t = new Date(time);
	var tf = function(i) {
		return (i < 10 ? '0' : '') + i
	};
	return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
		switch(a) {
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

// 提交意向实勘
function submit(){
	if($("#text").val() != ""){
		if($("#text").val().replace(/\s/g, "").length < 20){
			alert("房源优势不能少于20个字");
			return;
		}
	}
	
	var hi_project = "";
	$("#configure label").each(function(i){
		if($(this).attr("class") == "checkbox click"){
			hi_project += $(this).text()+",";
		}
	});
	
	var recommendGroup_Id = "";
	$("#people label").each(function(i){
		if($(this).attr("class") == "checkbox click"){
			recommendGroup_Id += $(this).attr("data-value")+",";
		}
	});
	if(recommendGroup_Id != ""){
		recommendGroup_Id = recommendGroup_Id.substring(0,recommendGroup_Id.length-1);
	}
	
	var path = "";
	var imageNum = 0;
	$("#uploadImage .image-item").each(function(i){
		path += $(this).find(".image-item-img").attr("data-url")+",";
		imageNum += 1;
	});
	if(path != ""){
		path = path.substring(0,path.length-1);
	}
	
	var his_id = $("#brand").val();
	var count = "";
	count += "&phi_type=房源实勘";
	count += "&hi_measure="+$("#area").val();
	count += "&hi_situation="+$("#renovation").val();
	count += "&hb_id="+$("#brand").val();
	count += "&hi_content="+$("#text").val();
	count += "&hi_project="+hi_project;
	count += "&RecommendGroup_Id="+recommendGroup_Id;
	count += "&hi_code="+$("#hi_code").val();
	count += "&path="+path;
	count += "&imageNum="+imageNum;
	count += "&em_id="+getQueryString("em_id");
	count += "&his_id="+his_id;
	count += "&phi_style="+$("#style").val();
	count += "&phi_id="+getQueryString("phi_id");
	count += "&tipnum="+$("#builTypes").val();
	$.ajax({
		type : "POST",
		url : "/intention/addInitqs",
		data : count,
		dataType : "json",
		success : function(result){
			if(result.stage == 0){
				alert("该房屋保存成功！,请填写所有*后跟进下一步");
			}else if(result.message=="success"){
				alert("房源实勘成功");
                if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                    window.webkit.messageHandlers.goBackRefresh.postMessage([]);
                } else if (/(Android)/i.test(navigator.userAgent)) {
                    webview.goBackRefresh();
                }
			}
		}
	});
}

function orderByPhiType(str) {
	var it = 0;
	if (str == "房源录入") {
		it = 1;
	} else if (str == "房源实勘") {
		it = 2;
	} else if (str == "房源定价") {
		it = 3;
	} else if (str == "存房") {
		it = 4;
	} else if (str == "完成") {
		it = 5;
	} else if (str == "存房失败") {
		it = 6;
	}
	return it;
}

//文本框字数
function textFont(ids){
	$(ids).next().find(".fontSize").text($(ids).val().replace(/\s/g, "").length);
}

function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
} 