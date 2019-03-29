$(function(){
	$("<link>").attr({rel: "stylesheet", type: "text/css", href: "/resources/common/cropper/cropper.css"}).appendTo("head");
	$("<link>").attr({rel: "stylesheet", type: "text/css", href: "/resources/common/gjp_image_upload/css/image_upload.css"}).appendTo("head");
	$("<script>").attr({src: "/resources/common/cropper/cropper.js"}).appendTo("head");

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
		$(this).val("");
	});
	
	// 删除图片
	$(".image-item-close").live("click", function() {
		deleteImage($(this));
	});
	
//	// 更新房屋楼层房号显示
//	$("input[name=propertyInfo_id],select[name=porp_name]").live("change", function() {
//		initHouseFloorAddress();
//	});
//	$("input[name=hi_address],input[name=hi_floor]").live("keyup", function() {
//		initHouseFloorAddress();
//	});

	// 标签选择
	$(".image-item-label").live("click", function() {
		var ul = $(this).parent().find(".image-item-ul");
		var id = $(this).attr("data-id");
		if (ul.length > 0) {
			ul.remove();
			return;
		}
		var _val = $(this).text().trim();
		if (_val == "封面图片") {
			return;
		}
		var html = '';
		html += '<div class="image-item-ul">';
		html += '	<ul>';
		html += '		<li style="' + (_val == "封面图片" ? "display:none" : "") + '">封面图片</li>';
		html += '		<li style="' + (_val == "效果图片" ? "display:none" : "") + '">效果图片</li>';
		html += '		<li style="' + (_val == "户型图片" ? "display:none" : "") + '">户型图片</li>';
		html += '		<li style="' + (_val == "3D图片" ? "display:none" : "") + '">3D图片</li>';
		html += '	</ul>';
		html += '</div>';
		$(this).after(html);

		// 选择标签
		$(".image-item-ul>ul>li").on("click", function() {
			var _text = $(this).text();
			if(_text == "封面图片"){
				$(this).parents(".image-item").insertBefore($(".image-item:eq(0)"));
			}
			$(this).parents(".image-item-ul").remove();
			updateImageLabel(id, _text, _val);
		})
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
		html += '				<li>';
		html += '					<select id="image-show-change" class="image-show-change" style="padding: 6px;border-radius: 3px;border: 1px solid #ddd;">';
		if(type.indexOf("page") <= -1){
			html += '<option value="page">封面图片</option>';
		}
		html += '						<option value="effect">效果图片</option>';
		html += '						<option value="solid">户型图片</option>';
		html += '						<option value="3d">3D图片</option>';
		html += '					</select>';
		html += '				</li>';
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
		var _type = $(this).attr("data-type");
		var imageType = $(".image-show-change>option:selected").val();
		if (_type.indexOf("page") > -1 && imageType.indexOf("page") > -1) {
			$.jBox.tip("封面图片只能有一张", "error", {
				focusId: 'image-show-change'
			});
			return;
		}
	    var data = _image.cropper("getCroppedCanvas",{width: 520, height: 360}).toDataURL();
		
		$(this).attr("disabled", "disabled"); // .html('<i class="icon-spinner icon-spin"></i>&nbsp;上传中..')
		$(".image-show").fadeOut().remove();
		$.jBox.tip("图片上传中...", "loading");
		//图片上传
		ajaxUploadImage(data , imageType, type);
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

/** 更新图片标签*/
function updateImageLabel(id, param, param2) {
	if (isEmpty(id) || isEmpty(param) || isEmpty(param2)) {
		$.jBox.tip("参数错误，请刷新重试", "warning");
		return;
	}
	$.ajax({
		type: "POST",
		url: "/houseLibrary/updateImageLabel",
		data: {
			hi_id: hi_id,
			hm_id: id,
			new_type: getHouseImageType1(param),
			old_type: getHouseImageType1(param2)
		},
		contentType: "application/x-www-form-urlencoded; charset=utf-8",
		dataType: "json",
		error: function(e) {
			console.log(e);
		},
		success: function(result) {
			switch (result.code) {
				case 200:
					$.each(result.data, function(index, data) {
						var type = '';
						var type_class;
						switch (data.hit_type) {
							case "page":
								type = "封面图片";
								type_class = 'next-bg';
								break;
							case "effect":
								type = "效果图片";
								type_class = '';
								break;
							case "solid":
								type = "户型图片";
								type_class = 'hint-bg';
								break;
							case "3d":
								type = "3D图片";
								type_class = 'error-bg';
								break;
						}
						$(".image-item").each(function() {
							var _label = $(this).find(".image-item-label");
							if (_label.attr("data-id") == data.hm_id) {
								_label.text(type).attr("class", "image-item-label").addClass(type_class);
								$(this).find(".image-item-img").attr("data-type", returnValue(data.hit_type));
							}
						});
					});
					break;
				default:
					$.jBox.tip(result.msg, "error");
					break;
			}
		}
	});
}

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

/** 上传图片*/
function ajaxUploadImage(data, imageType, type) {
	if (isEmpty(hi_id) || isEmpty(data)) {
		$.jBox.tip("参数错误，请刷新页面重试", "error");
		return;
	}
	$.ajax({
		type: "POST",
		url: "/houseLibrary/uploadHouseImage",
		data: {
			hi_id: hi_id,
			data: data.replace(/^data:image\/(png|jpg);base64,/, ""),
			type: type,
			imageType : imageType
		},
		dataType: "json",
		error: function(e) {
			$.jBox.tip("系统错误，请重试");
		},
		success: function(result) {
			switch (result.code) {
				case 200:
					var type = '';
					var type_class;
					switch (result.data.imageType) {
						case "page":
							type = "封面图片";
							type_class = 'next-bg';
							break;
						case "effect":
							type = "效果图片";
							type_class = '';
							break;
						case "solid":
							type = "户型图片";
							type_class = 'hint-bg';
							break;
						case "3d":
							type = "3D图片";
							type_class = 'error-bg';
							break;
					}
					var html = "";
					html += '<div class="image-item">';
					html += '	<img class="image-item-img" src="' + result.data.image + '" data-type="' + result.data.imageType + '">';
					html += '	<span class="image-item-label ' + type_class + '" data-id="' + result.data.hm_id + '">' + type + '</span>';
					html += '	<span class="image-item-close icon-remove" title="删除" data-src="' + result.data.image + '" data-id="' + result.data.hm_id + '"></span>';
					html += '</div>';
					html += '';
					html += '';
					$(".image-item-add").before(html);
					$.jBox.tip("上传成功", "success");
					$(".image-show-ok").removeAttr("disabled");

					break;
				default:
					$.jBox.tip(result.msg, "error");
					break;
			}
		}
	});
}

/** 删除图片*/
function deleteImage(obj) {
	var _this = $(obj);
	var type = _this.parent().find(".image-item-img").attr("data-type");
	if(type == "page"){
		$.jBox.tip("封面图片不能删除", "waring");
		return;
	}
	var submit = function(v, h, f) {
		if (v == 'ok') {
			$.jBox.tip("正在删除数据...", 'loading');
			$.ajax({
				type: "POST",
				url: "/houseLibrary/deleteImage",
				data: {
					image_url: _this.attr("data-src"),
					hm_id: _this.attr("data-id")
				},
				contentType: "application/x-www-form-urlencoded; charset=utf-8",
				dataType: "json",
				success: function(result) {
					switch (result.code) {
						case 200:
							$.jBox.tip('删除成功', 'success');
							_this.parents(".image-item").fadeOut().remove();
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
