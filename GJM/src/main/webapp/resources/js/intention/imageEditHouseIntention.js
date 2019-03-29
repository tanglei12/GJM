var type = "library";
//定位数组
var position ='';
$(function() {
	$("<link>").attr({rel: "stylesheet", type: "text/css", href: "/resources/common/cropper/cropper.css"}).appendTo("head");
	$("<link>").attr({rel: "stylesheet", type: "text/css", href: "/resources/css/initInten/image_upload.css"}).appendTo("head");
	$("<script>").attr({src: "/resources/common/cropper/cropper.js"}).appendTo("head");

	// 初始化上传插件
	initUploadImage();
	
//	
//	// 产权地址搜索
//	$("input[name=propertyInfo_id]").AutoSearch({
//		placeholder : "物业名称",
//		result : function(obj){
//			$.ajax({
//				type: "POST",
//				url: "/houseLibrary/queryPropertyInfoList",
//				data: {
//					upn_sid: $(obj).attr("data-uid")
//				},
//				contentType: "application/x-www-form-urlencoded; charset=utf-8",
//				dataType: "json",
//				success: function(result) {
//					switch (result.code) {
//					case 200:
//						$("select[name=porp_name]").remove();
//						// 更新物业
//						initPropertyNameList(result.data);
//						break;
//					}
//				}
//			});
//		}
//	});
			
	
});

/** 获取房屋图片*/
function initHouseImageList(id){
	$.ajax({
		type: "POST",
		url: "/houseLibrary/queryHouseImageList",
		data: {
			hi_id: id,
			house_type: house_type,
			hi_code: $("#hicode").val()
		},
		contentType: "application/x-www-form-urlencoded; charset=utf-8",
		dataType: "json",
		success: function(result) {
			switch (result.code) {
			case 200:
				var html ="";
				if(result.data.length <= 0){
					$("#imageNum").val(0);
					html +='<label class="image-item-add" for="house-image">选择图片<input type="file" id="house-image" accept=".jpg,.png,.jpeg,.gif"></label>';
				} else {
					if(house_type != null && house_type == "intent"){
						//$("#imageNum").val(result.data.length);
					}
					$("#imageCheck").val("1");
					$.each(result.data, function(index, data){
						$("#imageNum").val(result.data.length);
						var type = '';
						var type_class;
						switch (data.him_type) {
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
						html +='<div class="image-item">';
						if(data.him_id != null && data.him_id != ""){
							html +='	<img class="image-item-img" src="'+ data.him_path +'" data-type="'+ data.him_type +'">';
							html +='	<span class="image-item-label '+ type_class +'" data-id="'+ data.him_id +'">'+ type +'</span>';
							html +='	<span class="image-item-close icon-remove" title="删除" data-src="'+ data.him_path +'" data-id="'+ data.him_id +'"></span>';
						}else{
							html +='	<img class="image-item-img" src="'+ data.hm_path +'" data-type="'+ data.hm_type +'">';
							html +='	<span class="image-item-label '+ type_class +'" data-id="'+ data.hm_id +'">'+ type +'</span>';
							html +='	<span class="image-item-close icon-remove" title="删除" data-src="'+ data.hm_path +'" data-id="'+ data.hm_id +'"></span>';
						}
						html +='</div>';
					});
					html +='<label class="image-item-add" for="house-image">选择图片<input type="file" id="house-image"></label>';
					
				}
				$(".image-upload-box").html(html);
				break;
			}
		}
	});
}

/** 获取类型1 封面 To 'page'*/
function getHouseImageType1(param) {
	switch (param) {
		case "封面图片":
			param = "page";
			break;
		case "效果图片":
			param = "effect";
			break;
		case "户型图片":
			param = "solid";
			break;
		case "3D图片":
			param = "3d";
			break;
	}
	return param;
}

/** 获取类型2 'page' To 封面*/
function getHouseImageType2(param) {
	switch (param) {
		case "page":
			param = "封面图片";
			break;
		case "effect":
			param = "效果图片";
			break;
		case "solid":
			param = "户型图片";
			break;
		case "3d":
			param = "3D图片";
			break;
	}
	return param;
}

/** ----------------------------------------------- */



/** 提交房屋信息*/
function submitHouseInfo(obj){
	var boo = validateData();
	if(!boo){
		return;
	}
	var data = {};
	data.hi_id = hi_id;
	
	var _propertyInfo_id
		prop_code ="";
	if($("select[name=porp_name]").length > 0){
		var last_porp_name = $("select[name=porp_name]:last>option:selected");
		_propertyInfo_id = last_porp_name.attr("data-prop-id");
		prop_code = last_porp_name.attr("data-code") + "-";
	} else {
		_propertyInfo_id = $("input[name=propertyInfo_id]").attr("data-id");
	}
	data.propertyInfo_Id = _propertyInfo_id;
	data.hi_floor = $("input[name=hi_floor]").val().trim();
	data.hi_address = prop_code + $("input[name=hi_floor]").val().trim() + "-" + $("input[name=hi_address]").val().trim();
	data.hi_name = $("input[name=hi_name]").val().trim();
	data.hi_keepMoney = $("input[name=hi_keepMoney]").val().trim();
	data.hi_money = $("input[name=hi_money]").val().trim();
	data.hi_measure = $("input[name=hi_measure]").val().trim();
	data.hi_houseS = $("input[name=hi_houseS]").val().trim();
	data.hi_houseT = $("input[name=hi_houseT]").val().trim();
	data.hi_houseW = $("input[name=hi_houseW]").val().trim();
	
	data.he_id = $("#house_data").data("_data").houseHouseInformation.he_id;
	data.he_peopleName = $("input[name=he_peopleName]").val().trim();
	var _he_phone =$("input[name=he_phone]").val().trim();
	if(!isPhone(_he_phone)){
		$("input[name=he_phone]").msg("请填写正确的手机号码");
//		$("input[name=he_phone]").focus();
		return;
	}
	data.he_phone = $("input[name=he_phone]").val().trim();
	data.he_address = $("input[name=he_address]").val().trim();
	
	data.hi_type = $("select[name=hi_type]").val().trim();
	data.hi_state = $("select[name=hi_state]").val().trim();
	data.hi_orientation = $("select[name=hi_orientation]").val().trim();
	data.hb_id = $("select[name=hb_id]").val().trim();
	data.hi_version = $("select[name=hi_version]").val().trim();
	data.hi_text = $("input[name=hi_text]").data("data");
	data.hi_userManaged = $("input[name=hi_userManaged]").data("data");
	
	data.hi_content = $("textarea[name=hi_content]").val().trim();
	
	var _data;
	_data =eachInputData("recommendGroup_Id", "请选择推荐群体");
	if(isEmpty(_data)){
		return;
	} else {
		data.recommendGroup_Id = _data;
	}
	_data =eachInputData("hi_function", "请选择房源优势");
	if(isEmpty(_data)){
		return;
	} else {
		data.hi_function = _data;
	}
	_data =eachInputData("hi_project", "请选择房源配置");
	if(isEmpty(_data)){
		return;
	} else {
		data.hi_project = _data;
	}
	$.ajax({
		type: "POST",
		url: "/houseLibrary/updateHouseInfo",
		data: data,
		contentType: "application/x-www-form-urlencoded; charset=utf-8",
		dataType: "json",
		beforeSend : function(){
			$.jBox.tip("更新中...", "loading");
			$(obj).attr("disabled", "disabled");
		},
		error : function(){
			$.jBox.tip("请求出错，请重试", "error");
			$(obj).removeAttr("disabled");
		},
		success: function(result) {
			switch (result.code) {
			case 200:
				$.jBox.tip("更新成功", "success");
				break;
			case 110:
				$.jBox.tip(result.msg, "warning");
				break;
			default:
				$.jBox.tip("更新失败", "error");
				break;
			}
			$(obj).removeAttr("disabled");
		}
	});
}

/** 数据验证*/
function validateData(obj){
	var boo = true;
	if(isEmpty(obj)){
		$("#main-box").find("input[required]").each(function(){
			if(isEmpty($(this).val().trim())){
				$(this).focus().msg(returnValue($(this).attr("placeholder")) +"不能为空")
				boo = false;
				return false;
			}
		});
		if(!boo){
			return boo;
		}
		$("#main-box").find("select[required]:visible").each(function(){
			if(isEmpty($(this).find("option:selected").val().trim())){
				$(this).focus().msg("请选择" + returnValue($(this).attr("placeholder")))
				boo = false;
				return false;
			}
		});
	} else {
		var _this =$(obj);
		if(isEmpty(_this.val().trim())){
			_this.focus().msg(_this.attr("placeholder") +"不能为空");
			boo = false;
		}
	}
	return boo;
}

/** 遍历input[type=checkbox]数据*/
function eachInputData(obj_name, tip_title){
	var data = "";
	var len = $("input[name="+ obj_name +"]:checked").length;
	if (!isEmpty(tip_title)){
		if (len < 1) {
			$("#"+ obj_name +"Groups").msg(tip_title);
			return;
		}
	}
	$("input[name="+ obj_name +"]:checked").each(function(index){
		data +=$(this).val() + (index >=(len-1)?"":",");
	});
	return data;
}

/** 初始化物业名称*/
function initPropertyNameList(param){
	var _data_uid = returnNumber($("input[name=propertyInfo_id]").attr("data-uid"));
	
	if(param != null && param != ""){
		if(param.length > 1){
			getPropPosition(param, _data_uid, param[0].upn_sid);
			eachProperty(param, param[0].upn_sid, 0);
		}
		// 绑定select改变事件
		$("select[name=porp_name]").on("change", function(){
			var _param =$("#propertyInfo_idGroups").data("data");
			var _id = returnValue($(this).find("option:selected").val());
			var _cycle = returnNumber($(this).attr("data-cycle"));
			eachProperty(param, _id, _cycle);
		});
	}
	position ='';
}

/**
 * 获取物业定位
 * 
 * @param param 数组
 * @param id 	物业编号
 * @param sid	超级编号
 */
function getPropPosition(param, id, sid){
	if(id != sid){
		$.each(param, function(index, data){
			if(data.upn_id == id){// 195
				position =data.upn_id + (isEmpty(position)?"":"-" + position);
				getPropPosition(param, data.upn_pid, sid);
			}
		});
	}
}

/** 遍历物业*/
function eachProperty(param, id, cycle){
	var pos = returnNumber(position.split("-")[cycle]);
	
	var next_prop =$('.prop_cycle'+ (cycle + 1));
	var html =(next_prop.length>0?'':'<select class="form-control prop_cycle'+ cycle +' selects" data-cycle="'+ cycle +'" name="porp_name" style="margin-right: 12px;width: auto;min-width: 90px;">'),
		first_boo = true,
		first_id,
		isHaving = false;
	html +='<option value="" data-code="0" data-prop-id="0" selected>--请选择--</option>';
	$.each(param, function(index, data){
		if(data.upn_pid == id){
			if(pos != 0){
				if(pos == data.upn_id){
					html +='<option value="'+ data.upn_id +'" data-code="'+ data.upn_code +'" data-prop-id="'+ data.propertyInfo_Id +'" selected>'+ data.upn_name +'</option>';
					first_id = data.upn_id;
				} else {
					html +='<option value="'+ data.upn_id +'" data-code="'+ data.upn_code +'" data-prop-id="'+ data.propertyInfo_Id +'">'+ data.upn_name +'</option>';
				}
			} else {
				if(first_boo){
					html +='<option value="'+ data.upn_id +'" data-code="'+ data.upn_code +'" data-prop-id="'+ data.propertyInfo_Id +'">'+ data.upn_name +'</option>';
					first_boo = false;
					first_id = data.upn_id;
				} else {
					html +='<option value="'+ data.upn_id +'" data-code="'+ data.upn_code +'" data-prop-id="'+ data.propertyInfo_Id +'">'+ data.upn_name +'</option>';
				}
			}
			isHaving = true;
		}
	});
	if(isHaving){
		if(next_prop.length > 0){
			next_prop.html(html);
		} else {
			html +='</select>';
			$("#propertyInfo_idGroups").append(html);
		}
	}
	if(!isEmpty(first_id)){
		eachProperty(param, first_id, cycle + 1);
	}
}




/**
 * 图片处理
 */
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
	console.log("id = " + id + "  param = " + param + "   param2 = " + param2 + " hi_id = " + hi_id);
	console.log(isEmpty(id) || isEmpty(param) || isEmpty(param2));
	if (isEmpty(id) || isEmpty(param) || isEmpty(param2)) {
		$.jBox.tip("参数错误，请刷新重试", "warning");
		return;
	}
	$.ajax({
		type: "POST",
		url: "/houseLibrary/updateImageLabelInteger",
		data: {
			phi_id: hi_id,
			him_id: id,
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
						switch (data.him_type) {
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
							if (_label.attr("data-id") == data.him_id) {
								_label.text(type).attr("class", "image-item-label").addClass(type_class);
								$(this).find(".image-item-img").attr("data-type", returnValue(data.him_type));
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
		contentType: "application/x-www-form-urlencoded; charset=utf-8",
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
					
					$("#imageNum").val(parseInt($("#imageNum").val())+1);
					$("#imageNumEnd").val(1);
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
	var submit = function(v, h, f) {
		if (v == 'ok') {
			$.jBox.tip("正在删除数据...", 'loading');
			$.ajax({
				type: "POST",
				url: "/houseLibrary/deleteImage",
				data: {
					image_url: _this.attr("data-src"),
					him_id: _this.attr("data-id")
				},
				contentType: "application/x-www-form-urlencoded; charset=utf-8",
				dataType: "json",
				success: function(result) {
					switch (result.code) {
						case 200:
							$("#imageNum").val($("#imageNum").val()-1);
							$("#imageNumEnd").val(-1);
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





















