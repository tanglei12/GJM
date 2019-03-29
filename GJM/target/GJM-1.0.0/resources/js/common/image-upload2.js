$(function(){
	$("<link>").attr({rel: "stylesheet", type: "text/css", href: "/resources/common/cropper/cropper.css"}).appendTo("head");
	$("<link>").attr({rel: "stylesheet", type: "text/css", href: "/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css"}).appendTo("head");
	$("<script>").attr({src: "/resources/common/cropper/cropper.js"}).appendTo("head");
	$("<script>").attr({src: "/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"}).appendTo("head");

	// 初始化上传插件
	initUploadImage();
	
});

/** 初始化图片上传数据*/
function initUploadImage() {
	
	// 选择图片后
	$("#house-image").live("change", function() {
		var file = this.files[0];
		if(file.type.indexOf("image/") <= -1){
			$.jBox.tip("请选择图片", "warning");
			return false;
		}
		var type = "";
		$(".image-item-img").each(function() {
			type += $(this).attr("data-type") + ",";
		});
		setImageURL(file, type);
	});
	
	// 删除图片
	$(".image-item-close").live("click", function() {
		deleteImage($(this));
	});
	
}

/** 设置图片*/
function setImageURL(file, type) {
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
		html += '				<li class="image-show-icon image-show-upload"><i class="icon-upload-alt"></i>&nbsp;导入图片</li>';
		html += '				<li class="image-show-icon image-show-refresh"><i class="icon-refresh"></i>&nbsp;刷新</li>';
		html += '				<li class="image-show-icon image-show-rotate"><i class="icon-undo"></i>&nbsp;旋转</li>';
		html += '				<li class="image-show-icon image-show-ok" data-type="' + type + '"><i class="icon-ok"></i>&nbsp;剪切上传</li>';
		html += '				<li class="image-show-icon image-show-remove" onclick="closeImageShow()"><i class="icon-remove"></i>&nbsp;取消</li>';
		html += '			</ul>';
		html += '		</div>';
		html += '	</div>';
		html += '	<div class="image-show-main">';
		html += '		<img class="image-content" src="">';
		html += '	</div>';
		html += '</div>';
		$("body").append(html);
		
		// 加载图片
		loadImage(blobURL);
		// 绑定事件
		onImageListener();
	}
}

/** 绑定事件*/
function onImageListener() {
	var _image = $(".image-content");

	// 旋转图片
	$(".image-show-rotate").on("click", function() {
		_image.cropper("rotate", -90);
	});

	// 裁剪并上传图片
	$(".image-show-ok").on("click", function() {
	    var data = _image.cropper("getCroppedCanvas",{width: 520, height: 360}).toDataURL();
		
		$(this).attr("disabled", "disabled"); // .html('<i class="icon-spinner icon-spin"></i>&nbsp;上传中..')
		$(".image-show").fadeOut().remove();
		var html = "";
		html += '<div class="image-item">';
		html += '	<img class="image-item-img" src="' + data + '">';
		html += '	<span class="image-item-close icon-remove" title="删除" data-src="' + data  + '"></span>';
		html += '</div>';
		$(".image-item-add").before(html);
		$(".image-item-add").hide();
		
//		$.jBox.tip("图片上传中...", "loading");
		//图片上传
//		ajaxUploadImage(data);
	});

	// 导入图片
	$(".image-show-upload").on("click", function() {
		$("#house-image").click();
	});

	// 刷新
	$(".image-show-refresh").on("click", function() {
		_image.cropper("reset");
	});

};

/** 加载图片*/
function loadImage(blobURL) {
	var _image = $(".image-content");
	_image.cropper({
		aspectRatio: 1.41 / 1,
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
	$("#house-image").val("");
}

/** 关闭图片展示*/
function closeImageShow() {
	$(".image-show").fadeOut("400").remove();
}


/** 删除图片*/
function deleteImage(obj) {
	var _this = $(obj);
	var submit = function(v, h, f) {
		if (v == 'ok') {
			_this.parents(".image-item").fadeOut().remove();
			$(".image-item-add").show();
		}
		return true;
	};
	$.jBox.confirm("确定要删除该图片吗？", "提示", submit);
}
