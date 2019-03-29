$(function(){
	uploadPic("service");//图片上传
	$("#simplestar img").hover(function(){
		var index = parseInt($(this).attr("id").replace("image",""));
		$("#simplestar img").attr("src","/resources/image/T1j.png");
		$("#simplestar img").each(function(i){
			if( i <= index){
				if(index < 2){
					$(this).attr("src","/resources/image/T1lg.png");
				}else{
					$(this).attr("src","/resources/image/T1e.png");
				}
			}
		});
		
		if(index == 0){
			$(".placement-b").css("left","-91px").show();
			$(".placement-b strong").text("1分 很不满意");
			$(".placement-b span").text("差的太离谱，和服务不相符合！");
		}else if(index == 1){
			$(".placement-b").css("left","-69px").show();
			$(".placement-b strong").text("2分 不满意");
			$(".placement-b span").text("完成的比较差，和服务不相符合！");
		}else if(index == 2){
			$(".placement-b").css("left","-46px").show();
			$(".placement-b strong").text("3分 一般");
			$(".placement-b span").text("完成的一般，没有想象中的好");
		}else if(index == 3){
			$(".placement-b").css("left","-23px").show();
			$(".placement-b strong").text("4分 满意");
			$(".placement-b span").text("服务比较满意，与想象中的一致，还挺不错的");
		}else if(index == 4){
			$(".placement-b").css("left","0px").show();
			$(".placement-b strong").text("5分 很满意");
			$(".placement-b span").text("服务很满意，与想象中的一致，非常满意");
		}
	},function(){
		$("#simplestar img").attr("src","/resources/image/T1j.png");
		$(".placement-b").hide();
		if($(".fraction em").text() != ""){
			var index = parseInt($(".fraction em").text())-1;
			$("#simplestar img").each(function(i){
				if( i <= index){
					if(index < 2){
						$(this).attr("src","/resources/image/T1lg.png");
					}else{
						$(this).attr("src","/resources/image/T1e.png");
					}
				}
			});
		}
	});
	
	//服务评分
	$(".placement-b").hover(function(){
		$(".placement-b").show();
		$("#simplestar img").attr("src","/resources/image/T1j.png");
		var index = parseInt($(".placement-b strong").text().substring(0,1))-1;
		$("#simplestar img").each(function(i){
			if( i <= index){
				if(index < 2){
					$(this).attr("src","/resources/image/T1lg.png");
				}else{
					$(this).attr("src","/resources/image/T1e.png");
				}
			}
		});
	},function(){
		$(".placement-b").hide();
		$("#simplestar img").attr("src","/resources/image/T1j.png");
		if($(".fraction em").text() != ""){
			var index = parseInt($(".fraction em").text())-1;
			$("#simplestar img").each(function(i){
				if( i <= index){
					if(index < 2){
						$(this).attr("src","/resources/image/T1lg.png");
					}else{
						$(this).attr("src","/resources/image/T1e.png");
					}
				}
			});
		}
	});
	
	$("#simplestar img").click(function(){
		var index = parseInt($(this).attr("id").replace("image",""));
		$("#simplestar img").each(function(i){
			if( i <= index){
				if(index < 2){
					$(this).attr("src","/resources/image/T1lg.png");
				}else{
					$(this).attr("src","/resources/image/T1e.png");
				}
			}
		});
		$("#contentMessage").val($(".tip-inner span").text());
		$("#msg_error").text("");
		$(".fraction em").text(index+1);
		$(".fraction").show();
	});
});

/** 上传图片 */
function uploadPic(_param){
	if (isEmpty(_param)) return;
	$("#" + _param + "File").uploadify({
			'uploader':'/service/fileUploadService',
            'buttonText' : '请选择图片',
            'swf' : '/resources/common/uploadify/img/uploadify.swf',
            'fileTypeExts' : '*.gif;*.jpg;*.bmp;*.jpeg;*.png',
            'fileTypeDesc' : '*.gif;*.jpg;*.bmp;*.jpeg;*.png',
            'method' :'POST',
            'width' : 100,
            'height' : 100,
            'dataType': 'json',
            'formData' : {
				type : _param
			},
            'onInit' : function() {
				$("#" + _param + "File-queue").remove();
			},
			'onUploadStart' : function() {
				$("#" + _param + "File").append('<div id="img-loading"><i></i></div>');
			},
            'onUploadSuccess' : function(file, result, response) {
            	var result =eval('(' + result + ')');
            	$file = $("#" + _param + "File");
            	var $tisp = $("#" + _param + "-tisp");
            	var _limit = returnNumber($("#" + _param + "-limit").text()); // 数量限制
            	if (result.code == 200) {
					$file.parent().append(
						"<div class='images-box-img'>" +
	               			"<img src='"+ result.data +"'/>" +
	               			"<span class='images-box-img-option'></span>" +
	               			"<span class='images-box-img-title' onclick='delImg(this,\""+ result.data + "\",\""+ _param + "\")' >删除</span>" +
	               		"</div>");
					$tisp.text(returnNumber($tisp.text()) + 1);
	            	$file.find("#img-loading").remove();
					if(returnNumber($tisp.text()) >= _limit){
		            	$file.hide();
					}
            	} else {
            		alert(result.msg);
            	}
            }
     });
}

/** 删除图片 @param {} obj 对象 @param {}  src 图片地址 @param {} param 参数 */
function delImg(obj, src, param) {
	var $this = $(obj);
	var $file =$("#" + param + "File");
	$this.parent().hide();
	$file.show();
	$.ajax({
		type: "POST",
	    url: "deleteServiceImage",
	    data: {
	    	id : $("#cid").val(),
	    	df : src
	    },
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    async: true,
	    success: function(result) {
	    	var $tisp =$("#" + param + "-tisp");
	    	if(result.code == 200){
				$this.parent().remove();
				if ($file.length <= 0) {
					$("#" + param + "-box").append('<input type="file" class="input-file" name="'+ param +'File" id="'+ param +'File"/>');
					showImg(param);
				} else {
					$tisp.text($file.siblings(".images-box-img").length);
					$file.show();
				}
			}else{
				$file.hide();
				$this.parent().show();
			}
	    }
	});
}

/**
 * 提交评价
 */
function submitFach(){
	//分数
	var fraction = $(".fraction em").text();
	
	//评价信息
	var contentMessage = $("#contentMessage").val();
	//图片路径
	var path = "";
	if($(".images-box .images-box-img").html() != null){
		$(".images-box .images-box-img").each(function(i){
			path += $(this).find("img").attr("src")+"-";
		});
	}
	
	path = path.substring(0,path.length-1);
	var data = "";
	if(fraction != ""){
		data += "fraction="+fraction;
	}else{
		$("#msg_error").text("请为本次服务评分！");
		return;
	}
	
	data +="&contentMessage="+contentMessage+"&path="+path+"&md_id="+$("#md_id").val()+"&em_id="+$("#em_id").val()+"&uf_people="+$("#uf_people").val()+"&contractNo="+$("#contractNo").val();
	
	$.ajax({
	    type: "POST",
	    url: "addVisit",
	    data : data,
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	if(result.msg == "success"){
	    		window.location.href="/service/serviceVisit";
	    	}
	    }
	});
}