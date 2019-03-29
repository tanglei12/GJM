/**
 * 原理：先将图片剪切传到服务器，服务器返回图片url，再保存
 * 
 */
$(function(){
	$("<link>").attr({rel: "stylesheet", type: "text/css", href: "/resources/common/cropper/cropper.css"}).appendTo("head");
	$("<link>").attr({rel: "stylesheet", type: "text/css", href: "/resources/common/gjp_image_upload/css/image-upload4.css"}).appendTo("head");
	$("<script>").attr({src: "/resources/common/cropper/cropper.js"}).appendTo("head");
});

;(function($, document) {                                                                                                                                                                                  
	$.fn.imageUpload = function(options){
		var defaults = {
				style : "imageBox",
				totalSize : 5,
				showUpload : true,
				refresh: true,
				md_id : "",
				type : ""
		};
		var opts = $.extend(defaults, options);
		return this.each(function(){
			// 初始化插件
			initUploadImage(this,opts);
		});
	};
})($, document);
/** 初始化图片上传数据*/
function initUploadImage(element,options) {
	var _id = $(element).attr("id");
	if(typeof(_id) == "undefined"){
		return false;
	}
	var html = "";
	if(options.type == "app"){
		html += '<div class="'+options.style+'" id="'+_id+'" >';
		html += '	<label class="image-item-add">';
		html += '		<button class="shade-button" onclick="appUploadImage()"></button>';
		html += '		<input type="file" name="" id="image-file" value="" />';
		html += '		<span class="item-limit">';
		html += '			<em id="nowSize">0</em>/<em id="totalSize">'+options.totalSize+'</em>';
		html += '		</span>';
		html += '		<span class="imagefont">上传图片</span>';
		html += '	</label>';
		html += '</div>';
	}else{
		html += '<div class="'+options.style+'" id="'+_id+'" >';
		html += '	<label class="image-item-add">';
		html += '		<input type="file" name="" id="image-file" value="" />';
		html += '		<span class="item-limit">';
		html += '			<em id="nowSize">0</em>/<em id="totalSize">'+options.totalSize+'</em>';
		html += '		</span>';
		html += '	</label>';
		html += '</div>';
	}
	$(element).after(html).remove();
	// 选择图片后
	$("#image-file").live("change", function() {
		var file = this.files[0];
		if(file.type.indexOf("image/") <= -1){
			$.jBox.tip("请选择图片", "warning");
			return false;
		}
		setImageURL(file,options);
		$(this).val("");
	}).on("click",function(){
		var nowSize = parseInt($("#nowSize").text());
		var totalSize = parseInt($("#totalSize").text());
		if(nowSize>=totalSize){
			$.jBox.tip("最多上传 "+totalSize+" 张图片", "error");
			return false;
		}
	});
	
	// 删除图片
	$(".image-item-close").live("click", function() {
		if(options.type == "app"){
			deleteImageAPP($(this));
		}else{
			deleteImage($(this));
		}
	});
}

/** 设置图片*/
function setImageURL(file,options) {
	var URL = window.URL || window.webkitURL;
	var blobURL = URL.createObjectURL(file);
	
	if ($(".image-show").length > 0) {
		$(".image-content").cropper('replace', blobURL);
	} else {
		var html = "";
		html += '<div class="image-show">';
		html += '	<div class="image-show-mask"></div>';
		html += '	<div class="image-show-head">';
		html += '		<div class="image-show-head-title">图片剪切</div>';
		html += '		<div class="image-show-head-option">';
		html += '			<ul>';
		if(options.showUpload){
			html += '				<li class="image-show-icon image-show-upload"><i class="fa-upload"></i>&nbsp;导入图片</li>';
		}
		if(options.refresh){
			html += '				<li class="image-show-icon image-show-refresh"><i class="fa-refresh"></i>&nbsp;刷新</li>';
		}
		html += '				<li class="image-show-icon image-show-rotate"><i class="fa-undo"></i>&nbsp;旋转</li>';
		html += '				<li class="image-show-icon image-show-ok"><i class="fa-check"></i>&nbsp;剪切上传</li>';
		html += '				<li class="image-show-icon image-show-remove" onclick="closeImageShow()"><i class="fa-remove"></i>&nbsp;取消</li>';
		html += '			</ul>';
		html += '		</div>';
		html += '	</div>';
		html += '	<div class="image-show-main">';
		html += '		<img class="image-content" src="">';
		html += '	</div>';
		html += '</div>';
		$("body").append(html);
		
		// 加载图片
		loadImage(blobURL,options);
		// 绑定事件
		onImageListener(options.md_id);
	}
}

/** 绑定事件*/
function onImageListener(md_id) {
	var _image = $(".image-content");

	// 旋转图片
	$(".image-show-rotate").on("click", function() {
		_image.cropper("rotate", -90);
	});

	// 裁剪并上传图片
	$(".image-show-ok").on("click", function() {
	    var data = _image.cropper("getCroppedCanvas",{width: 520, height: 360}).toDataURL();
	    $(this).attr("disabled", true); // .html('<i class="icon-spinner icon-spin"></i>&nbsp;上传中..')
	    
		$(".image-show").remove();
		$.jBox.tip("图片上传中...", "loading");
		//图片上传
		ajaxUploadImage(data,md_id);
	});

	// 导入图片
	$(".image-show-upload").on("click", function() {
		$("#image-file").click();
	});

	// 刷新
	$(".image-show-refresh").on("click", function() {
		_image.cropper("reset");
	});

};

/** 加载图片*/
function loadImage(blobURL,options) {
	var _image = $(".image-content");
	_image.cropper({
		aspectRatio: options.aspectRatio,
		width: 520,
		height : 360,
		strict: true,
		guides: true,
		highlight: true,
		dragCrop: false,
		resizable: false,
		zoomFactor: 1,
		cropBoxMovable: true,
		cropBoxResizable: false,
		preview: ".img-preview",
		crop: function(data) {
			_image.attr("data", JSON.stringify(data));
		}
	}).cropper('replace', blobURL);
	$("#image-file").val("");
}

/** 关闭图片展示*/
function closeImageShow() {
	$(".image-show").fadeOut(400,function(){ $(this).remove(); });
}

/** 上传图片*/
function ajaxUploadImage(data,md_id) {
	if (data == null) {
		$.jBox.tip("参数错误，请刷新页面重试", "error");
		return;
	}
	$.ajax({
		type: "POST",
		url: "/upload/uploadImageFile",
		data: {
			data: data.replace(/^data:image\/(png|jpg);base64,/, ""),
			md_id: $(md_id).val()
		},
		dataType: "json",
		error: function(e) {
			$.jBox.tip("系统错误，请重试");
		},
		success: function(result) {
			if(result.msg == "success"){
				var dataTitle = "";
				if(md_id != null && md_id != ""){
					dataTitle = "data-mi_id='"+ result.md_id +"'";
				}
				var html = "";
				html += '<label class="image-item">';
				html += '	<img class="image-item-img" src="' + result.path + '">';
				html += '	<span class="image-item-close" title="删除照片" data-src="' + result.path + '" '+ dataTitle +'>X</span>';
				html += '</label>';
				$(".image-item-add").before(html);
				var nowSize = parseInt($("#nowSize").text());
				$("#nowSize").text(nowSize + 1);
				
				$.jBox.tip("上传成功", "success");
				$(".image-show-ok").attr("disabled",false);
			}else{
				$.jBox.tip(result.msg, "error");
			}
		}
	});
}

/** 删除图片*/
function deleteImage(obj) {
	var _this = $(obj);
	var submit = function(v, h, f) {
		if (v == 'ok') {
			$.jBox.tip("正在删除数据...", 'loading');
			$.ajax({
				type: "POST",
				url: "/upload/deleteImage",
				data: {
					image_url: _this.attr("data-src"),
					mi_id: _this.attr("data-mi_id")
				},
				contentType: "application/x-www-form-urlencoded; charset=utf-8",
				dataType: "json",
				success: function(result) {
					switch (result.code) {
						case 200:
							var nowSize = parseInt($("#nowSize").text());
							$("#nowSize").text(nowSize - 1);
							
							$.jBox.tip('删除成功', 'success');
							_this.parents(".image-item").remove();
							break;
						default:
							$.jBox.tip(result.msg, 'error');
							break;
					}
				}
			});
		}
		return true;
	};
	$.jBox.confirm("确定要删除该图片吗？", "提示", submit);
}

function deleteImageAPP(obj) {
	var _this = $(obj);
	if(confirm("是否删除图片")){
		$.jBox.tip("正在删除数据...", 'loading');
		$.ajax({
			type: "POST",
			url: "/upload/deleteImage",
			data: {
				image_url: _this.attr("data-src"),
				mi_id: _this.attr("data-mi_id")
			},
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			dataType: "json",
			success: function(result) {
				switch (result.code) {
					case 200:
						var nowSize = parseInt($("#nowSize").text());
						$("#nowSize").text(nowSize - 1);
						
						$.jBox.tip('删除成功', 'success');
						_this.parents(".image-item").remove();
						break;
					default:
						$.jBox.tip(result.msg, 'error');
						break;
				}
			}
		});
	}
}
/**
 * app上传图片按钮（label无法触发）
 */
function appUploadImage(){
	$("#image-file").click();
}