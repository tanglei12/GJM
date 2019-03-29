var hi_code = getQueryString("hi_code"); // 房屋编号
var hi_id = null;
var type = "library";
var house_image = null;
//定位数组
var position ='';

$(function() {

	// 编辑器初始化
	KindEditor.ready(function(K) {});

	// 初始化页面数据
	initHouseInfo();
	
	// 产权地址搜索
	$("input[name=propertyInfo_id]").AutoSearch({
		placeholder : "物业名称",
		result : function(){
			$("select[name=porp_name]").remove();
			$.ajax({
				type: "POST",
				url: "/houseLibrary/queryPropertyInfoList",
				data: {
					upn_sid: $("input[name=propertyInfo_id]").attr("data-uid")
				},
				dataType: "json",
				success: function(result) {
					switch (result.code) {
					case 200:
						// 更新物业
						initPropertyNameList(result.data);
						// 更新房屋楼层房号显示
						initHouseFloorAddress();
						break;
					}
				}
			});
		}
	});
	
	$("#extend_btn").on("click", function(){
		var _box = $("#extend_box");
		if(_box.is(":hidden")){
			_box.show("fast");
			$(this).removeClass("fa-angle-double-right").addClass("fa-angle-double-down");
		} else {
			_box.hide("fast");
			$(this).removeClass("fa-angle-double-down").addClass("fa-angle-double-right");
		}
	});
	
	
	// 图片上传  shenhx 20170327 修改房屋取消图片上传，故注释此处代码
//	house_image = $("input[name=house-upload]").imageUpload({
//		fileLimitNumber : 10,
//		fileUploadDesc : '<label class="hint">提示：仅能上传图片类型的文件，单个文件限定大小为20M</label>',
//		fileUploadCallback : {
//			isRealUpload : true,
//			done : function(data, callback){
//				$.ajax({
//					type: "POST",
//					url: "/houseLibrary/updateHouseImage",
//					data: {
//						hi_code: hi_code,
//						image_path: data.url,
//					},
//					dataType: "json",
//				}).done(function(result){
//					if(result.code != 200){
//						return;
//					}
//					callback(result.data);
//				});
//			}
//		},
//		fileDeleteCallback : {
//			isRealDelete : true,
//			done : function(data){
//				$.ajax({
//					type: "POST",
//					url: "/houseLibrary/deleteHouseImage",
//					data: {
//						hm_id: data.hm_id,
//					},
//					dataType: "json",
//				});
//			}
//		}
//	});
});

/** 获取房屋图片*/
function initHouseImageList(hi_code){
	$.ajax({
		type: "POST",
		url: "/houseLibrary/queryHouseImageList",
		data: {
			hi_code: hi_code
		},
		dataType: "json",
		success: function(result) {
			switch (result.code) {
			case 200:
				var html ="";
				if(result.data.length <= 0){
					html +='<label class="image-item-add" for="house-image">选择图片<input type="file" id="house-image"></label>';
				} else {
					$.each(result.data, function(index, data){
						house_image.loadFileList(data.hm_path, data);
//						
//						var type = '';
//						var type_class;
//						switch (data.hm_type) {
//							case "page":
//								type = "封面图片";
//								type_class = 'next-bg';
//								break;
//							case "effect":
//								type = "效果图片";
//								type_class = '';
//								break;
//							case "solid":
//								type = "户型图片";
//								type_class = 'hint-bg';
//								break;
//							case "3d":
//								type = "3D图片";
//								type_class = 'error-bg';
//								break;
//						}
//						html +='<div class="image-item">';
//						if(data.hm_state == 1){
//							html +='	<div class="image-mask">已发布</div>';
//						}
//						html +='	<img class="image-item-img" src="'+ data.hm_path +'" data-type="'+ data.hm_type +'">';
//						html +='	<span class="image-item-label '+ type_class +'" data-id="'+ data.hm_id +'">'+ type +'</span>';
//						if(data.hm_state != 1){
//							html +='	<span class="image-item-close icon-remove" title="删除" data-src="'+ data.hm_path +'" data-id="'+ data.hm_id +'"></span>';
//						}
//						html +='</div>';
					});
//					html +='<label class="image-item-add" for="house-image">选择图片<input type="file" id="house-image"></label>';
				}
				// $(".image-upload-box").html(html);
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

/** 初始化房屋相关信息*/
function initHouseInfo() {
	$.ajax({
		type: "POST",
		url: "/houseLibrary/selectHouseById",
		data: {
			hi_code: hi_code
		},
		dataType: "json",
		success: function(result) {
			switch (result.code) {
				case 200:
					data = result.data;
					$("#house_data").data("_data", data);
					houseHouseInformation = data.houseHouseInformation;
					customer = data.customer;
					propertyInfoNamelist = data.propertyInfoNamelist;
					propertyInfoName = data.propertyInfoName;
					houseHouseExtended = data.houseHouseExtended;
					fczImgs = data.fczImgs;

					hi_id = houseHouseInformation.hi_id;

					// 初始化房屋图片 shenhx 20170327 修改房屋界面取消上传图片，注释此处代码
					hi_code = houseHouseInformation.hi_code;
//					initHouseImageList(houseHouseInformation.hi_code);
					
					// 物业信息
					var prop_name =returnValue(houseHouseInformation.propertyInfo_Name);
					$("input[name=propertyInfo_id]")
						.val(propertyInfoName.upn_sname)
						.attr("data-id", houseHouseInformation.propertyInfo_Id)
						.attr("data-uid", propertyInfoName.upn_id)
						.data("cache_name", propertyInfoName.upn_sname)
						.data("cache_code", propertyInfoName.upn_code)
						.data("cache_id", houseHouseInformation.propertyInfo_Id)
						.data("cache_uid", propertyInfoName.upn_id);

					// 初始化物业信息
					initPropertyNameList(propertyInfoNamelist);
					
					// 楼层房号
					var address = returnValue(houseHouseInformation.hi_address);
					if(address.indexOf("-") > -1){
						var split=address.split("-");
						var len = split.length;
						if(len >= 2){
							$("input[name=hi_address]").val(split[len - 1]);
							$("input[name=hi_floor]").val(split[len - 2]);
						} else if(len == 1){
							$("input[name=hi_address]").val(split[len - 1]);
							$("input[name=hi_floor]").val(houseHouseInformation.hi_floor);
						}
					} else {
						$("input[name=hi_address]").val(houseHouseInformation.hi_address);
						$("input[name=hi_floor]").val(houseHouseInformation.hi_floor);
					}
					
					// 初始化楼层房号
					initHouseFloorAddress();
					
					$("input[name=hi_name]").val(houseHouseInformation.hi_name);

					$("input[name=hi_houseT]").val(returnNumber(houseHouseInformation.hi_houseT));
					$("input[name=hi_houseS]").val(returnNumber(houseHouseInformation.hi_houseS));
					$("input[name=hi_houseW]").val(returnNumber(houseHouseInformation.hi_houseW));
					
					$("input[name=hi_measure]").val(returnFloat(houseHouseInformation.hi_measure));
					$("input[name=hi_keepMoney]").val(returnFloat(houseHouseInformation.hi_keepMoney));
					$("input[name=hi_money]").val(returnFloat(houseHouseInformation.hi_price));
					
					// --扩展---
					
					// 【房屋类型】
					$("select[name=hi_type]>option").each(function(){
						if($(this).val() == houseHouseInformation.hi_type){
							$(this).attr("selected", "selected");
						}
					});
					// 【房屋情况】
					$("select[name=hi_state]>option").each(function(){
						if($(this).val() == houseHouseInformation.hi_state){
							$(this).attr("selected", "selected");
						}
					});
					// 【房屋朝向】
					$("select[name=hi_orientation]>option").each(function(){
						if($(this).val() == houseHouseInformation.hi_orientation){
							$(this).attr("selected", "selected");
						}
					});
					
					// 【房屋品牌】 TODO
					loadingHouseType(data.houseInfoStates, 0, data.stateRelations);
					
					//产权地址
					$("input[name='he_address']").val(houseHouseInformation.he_address);
					var fczHtml = "";
					if(null != fczImgs){
						var _img_data = "";
						$.each(fczImgs, function(index, data) {
							_img_data += returnValue(data) + '#';
						});
						fczHtml = "<label class='show-label-error sfz-show-label' style='height: 20px;top: 4px;' title='点击查看房产证照片' data-value='" + _img_data + "' data-hint='没有房产证'>证</label>";
						
					} else {
						fczHtml = "<label class='show-label-disabled sfz-show-label' style='height: 20px;top: 4px;' title='无房产证照片' data-value='' data-hint='没有房产证'>证</label>";
					}
					$("input[name='he_address']").after(fczHtml);
					initEvent();
					
					//房屋品牌
					$("select[name=hb_id]:first").on("change",function(){
						var _txt = $(this).find("option:selected").text();
						if(_txt == "集中式"){
							$("select[name=hb_id]").not(":first").show();
							$("#hi_version_box").show();
							var html ="";
							html +='<option value="">公寓类型</option>';
							$.each($("select[name=hi_version]").data("data"), function(index, data2) {
								html +='<option value="'+ data2 +'" '+ (data.hi_version == data2?"selected":"") +'>'+ data2 +'</option>';
							});
							$("select[name=hi_version]").html(html);
						} else {
							$("#hi_version_box").hide();
						}
					});
					$("select[name=hb_id]").on("change", function(){
						if($(this).find("option:selected").val() == 0){
							$("select[name=hb_id]").not(":first").hide();
							$("#hb_id_sub_box").fadeOut();
						} else {
							$("select[name=hb_id]").not(":first").show();
							$("#hb_id_sub_box").fadeIn();
							updateHouseType($(this), $("select[name=hb_id]:first").data("data"));
						}
					});
					
					
					// 【公寓类型】
					$("select[name=hi_version]").data("data", data.versions);
					
					if("集中式" != $("select[name=hb_id]:first>option:selected").text()){
						$("#hi_version_box").hide();
					} else {
						$.each(data.versions, function(index, data) {
							$("select[name=hi_version]").append('<option value="'+ data +'" '+ (houseHouseInformation.hi_version == data?"selected":"") +'>'+ data +'</option>');
						});
						$("#hi_version_box").show();
					}

					// 【推荐群体】
					var recommends =returnValue(houseHouseInformation.recommendGroup_Id).split(",");
					$.each(data.hoseRecommendGroupList, function(index, data) {
						var isTrue = false;
						$.each(recommends ,function(index, data2){
							if(data.recommendGroup_Id == data2){
								isTrue = true;
							}
						});
						if(isTrue){
							$("#recommendGroup_IdGroups").append('<label class="common-borderbox common-borderbox-checked">'+ returnValue(data.recommendGroup_Name) +'<input type="checkbox" name="recommendGroup_Id" value="'+ data.recommendGroup_Id +'" checked></label>');
						} else {
							$("#recommendGroup_IdGroups").append('<label class="common-borderbox">'+ returnValue(data.recommendGroup_Name) +'<input type="checkbox" name="recommendGroup_Id" value="'+ data.recommendGroup_Id +'"></label>');
						}
					});
					
					// 【房源优势】
					$("input[name=hi_function]").each(function(){
						if(returnValue(houseHouseInformation.hi_function).indexOf($(this).val()) > -1){
							$(this).attr("checked", "checked").parent().addClass("common-borderbox-checked");
						}
					});
					// 【房源配置】
					$("input[name=hi_project]").each(function(){
						if(returnValue(houseHouseInformation.hi_project).indexOf($(this).val()) > -1){
							$(this).attr("checked", "checked").parent().addClass("common-borderbox-checked");
						}
					});
					
					// 房源点评
					$("textarea[name=hi_content]").text(houseHouseInformation.hi_content);
					
					// 房屋简介
					var hi_text = houseHouseInformation.hi_text;
					$("input[name='hi_text']")
						.val(isEmpty(hi_text)?"没有房屋简介，点击添加":"已有房屋简介，点击修改")
						.data("data", hi_text)
						.addClass(isEmpty(hi_text)?"error-btn":"ok-btn")
						.on("click", function(){
							editInfo(1, $(this));
						});
					
					// 托管管家
					$("input[name='hi_userManaged']")
						.val(isEmpty(houseHouseInformation.hi_userManaged)?"没有管家详情，点击添加":"已有管家详情，点击修改")
						.data("data", houseHouseInformation.hi_userManaged)
						.addClass(isEmpty(houseHouseInformation.hi_userManaged)?"error-btn":"ok-btn")
						.on("click", function(){
							editInfo(2, $(this));
						});
					
					// --扩展---
					
					if(!isEmpty(customer)){
						$("input[name=cc_code]").val(customer.cc_code);
						$("input[name=cc_name]").val(customer.cc_name);
						$("input[name=ccp_phone]").val(customer.ccp_phone);
						$("#cc_info").text(customer.cc_name + " - " + customer.ccp_phone);
						$("#perfect-info").attr("data-value", customer.cc_code);
					} else {
						$("#cc_info").text("选择房东");
						$("#perfect-info").hide();
					}
					
					$("#cc_info").on("click",function(){
						$(this).openModel({
							title : "客户信息",
							target : {
								code : "cc_code",
								name : "cc_name",
								phone : "ccp_phone",
								card : "cc_card",
							},
							done : function(result){
								$("#cc_info").text(result.cc_name + " - " + result.ccp_phone);
								$("#perfect-info").attr("data-value", result.cc_code).show();
							}
						});
					});
					break;
			}
		}
	});
}

/** 加载事件*/
initEvent = function() {

	// 点击查看图标
	$(".show-label-error").on("click", function(e) {
		e.stopPropagation();
		$(".more-img-box").remove();
		if (isEmpty($(this).attr("data-show"))) {
			var html = '';
			var _data = $(this).attr("data-value");
			var _hint = $(this).attr("data-hint");
			html += '<div class="spanImgBox more-img-box">';
			if (isEmpty(_data)) {
				html += '<div class="more-img-box-error">' + _hint + '</div>';
			} else {
				var boo = true;
				$.each(_data.split("#"), function(index, data) {
					if (!isEmpty(data)) {
						html += '<img class="showboxImg" src="' + returnValue(data) + '">';
						boo = false;
					}
				});
				if (boo) {
					html += '<div class="more-img-box-error">' + _hint + '</div>';
				}
			}
			html += '</div>';
			$("body").append(html);
			$(".more-img-box").css({
				top : $(this).offset().top - 55,
				left : $(this).offset().left + 36
			});
			$(this).attr("data-show", "show");
		} else {
			$(this).removeAttr("data-show");
		}
	});

	$(document).on("click", function() {
		$(".show-label-error").removeAttr("data-show");
		$(".more-img-box").remove();
	});
};

/** 加载房屋类型*/
function loadingHouseType(param, ints, rela){
	var sIndex = 0,
		cacheIndex = 0,
		i = 0,
		boo = (returnNumber($("select[name=hb_id]:first>option:selected").val()) == 0);
	
	if(isEmpty(param)){
		return;
	}
	// 如果参数不为空则添加新的SELECT
	if(returnNumber(ints) != 0){
		sIndex = ints;
		i = 1;
		$("select[name=hb_id]:last").after('<select class="form-control" name="hb_id" style="margin-right: 16px;width: auto;'+ (boo?'display:none;':'display:block;') +'" required=""></select>');
	}
	$.each(param, function(index, data) {
		if(data.his_name == "长租" || data.his_name == "短租"){
			return false;
		}
		if(data.his_pid == sIndex){
			var _his_id;
			if(i > (rela.length - 1)){
				if(!isEmpty(rela[0])){
					_his_id = rela[0].his_id;
				}
				$("select[name=hb_id]:last").append('<option value="'+ data.his_id +'" '+ (_his_id == data.his_id?'selected':'') +'>'+ data.his_name +'</option>');
			} else {
				if(!isEmpty(rela[0])){
					_his_id = rela[0].his_id;
				}
				$("select[name=hb_id]:last").append('<option value="'+ data.his_id +'" '+ (_his_id == data.his_id?'selected':'') +'>'+ data.his_name +'</option>');
			}
			cacheIndex = data.his_id;
			if(data.his_name == '集中式'){
				$("#hi_version_box").fadeIn();
			}
		}
	});
	if(sIndex == 0){
		$("select[name=hb_id]:first").data("data", param);
	}
	
	if(cacheIndex != 0){
		if(returnNumber($("select[name=hb_id]:last>option:selected").val()) != 0 ){
			loadingHouseType(param, returnNumber($("select[name=hb_id]:last>option:selected").val()), rela);
		}
	} else {
		$("select[name=hb_id]:last").remove();
		if(!boo){
			loadingHouseTypeSub(param, rela);
		}
	}
}

/** 更新房屋类型*/
function updateHouseType(obj, param){
	var _this = $(obj),
		sIndex = returnNumber(_this.find("option:selected").val()),
		cacheIndex = 0,
		first = true;
	
	loadingHouseTypeSub(param);
	
	if(sIndex == 0){
		return;
	}
	if (_this.is($("input[name=hb_id]:last"))) {
		return;
	}
	$("input[name=hb_id]:last").empty();
	$.each(param, function(index, data) {
		if(data.his_pid == sIndex){
			$("input[name=hb_id]:last").append('<option value="'+ data.his_id +'">'+ data.his_name +'</option>');
			if(first){
				cacheIndex = data.his_id;
				first = false;
			}
		}
	});
}

/** 加载房屋子类型*/
function loadingHouseTypeSub(param, rela){
	$("#hb_id_sub_box").empty();
	var _lastId = returnNumber($("select[name=hb_id]:last>option:selected").val());
	$.each(param, function(index, data) {
		if(data.his_pid == _lastId){
			var html ='';
			var boo = false;
			if (!isEmpty(rela)) {
				$.each(rela, function(index, data2) {
					if(data2.his_id == data.his_id){
						boo = true;
					}
				});
			}
			html +='<label class="common-borderbox '+ (boo?'common-borderbox-checked':'') +'">';
			html +='	<input type="checkbox" name="hb_id_sub" value="'+ data.his_id +'" '+ (boo?'checked':'') +'>'+ data.his_name;
			html +='</label>';
			$("#hb_id_sub_box").append(html);
		}
	});
	$("#hb_id_sub_box").fadeIn();
}

/** 初始化楼层房号*/
function initHouseFloorAddress(code) {
	var porp_name = $("select[name=porp_name]:last>option:selected").attr("data-code");
	if(isEmpty(code)){
		porp_name = isEmpty(porp_name) ? "" : porp_name + "-";
	} else {
		porp_name = code + "-";
	}
	
	var hi_floor= returnValue($("input[name=hi_floor]").val()).trim();
	hi_floor = isEmpty(hi_floor) ? "" : hi_floor + "-";
	
	var hi_address= returnValue($("input[name=hi_address]").val()).trim();
	
	$("#house-info").html(returnValue($("input[name=propertyInfo_id]").val()) + porp_name + hi_floor + hi_address);
}

/** 文本编辑*/
function editInfo(index, obj) {
	var _this = $(obj),
		title,
		editor,
		html = '<textarea name="contents" style="width:1100px;height:500px;">' + returnValue(_this.data("data")) + '</textarea>';
	
	switch (index) {
	case 1:
		title = "房屋简介";
		break;
	case 2:
		title = "托管管家";
		break;
	}
	
	$("#kindEditor").html(html);
	$("#kindEditor-box").find(".kindEditor-title").text(title);
	$("#kindEditor-box").fadeIn();
	
	KindEditor.ready(function(K) {
		editor = K.create('textarea[name="contents"]', {
			allowFileManager: true,
			uploadJson: '/resources/Plug-in/kindeditor-4.1.10/jsp/upload_json.jsp',
			fileManagerJson: '/resources/Plug-in/kindeditor-4.1.10/jsp/file_manager_json.jsp',
			allowFileManager: true,
			allowImageUpload: true,
			minWidth: '500px',
			height: '500px',
			afterCreate: function() {
				this.loadPlugin('autoheight');
			},
			afterBlur: function() {
				this.sync();
			}
		});
		K("button[name=getContent]").click(function(e){
			var _content = editor.html().trim();
			switch (index) {
				case 1:
					if (isEmpty(_content)) {
						_this.val("没有房屋简介，点击添加").removeClass("ok-btn").addClass("error-btn");
					} else {
						_this.val("已有房屋简介，点击修改").removeClass("error-btn").addClass("ok-btn");
					}
					break;
				case 2:
					if (isEmpty(_content)) {
						_this.val("没有管家详情，点击添加").removeClass("ok-btn").addClass("error-btn");
					} else {
						_this.val("已有管家详情，点击修改").removeClass("error-btn").addClass("ok-btn");
					}
					break;
			}
			_this.data("data", _content);
			$("#kindEditor-box").fadeOut(300,function(){
				$("#kindEditor").empty();
			});
		});
	});
}

/** 添加标签*/
function addLabel(obj) {
	var _this = $(obj);
	var html = "<div style='padding:10px;'><div style='display:block;float:left;line-height:34px;'>输入标签：</div><input type='text' class='form-control' id='pz' name='pz' /><hr></div>";
	var submit = function(v, h, f) {
		var i = 0
		$("input[name='" + _this.attr("name") + "']").each(function() {
			if ($(this).val() == f.pz) {
				i = 1;
				return false;
			}
		});
		if (i == 0) {
			if (f.pz != null && f.pz != '') {
				_this.before('<label class="common-borderbox common-borderbox-checked">' + f.pz + '<input type="checkbox" name="hi_function" value="' + f.pz + '" checked></label>');
			}
			return true;
		} else {
			$.jBox.tip("该标签已存在");
			return false;
		}
	};
	$.jBox(html, {
		title: "添加标签",
		submit: submit
	});
	$("#pz").focus();
}

/** ----------------------------------------------- */

/** 提交房屋信息*/
function submitHouseInfo(obj){
	// 数据验证
	var boo = validateData();
	if(!boo){
		return;
	}
	var _hi_keepMoney = returnFloat($("input[name=hi_keepMoney]").val().trim());
	if (_hi_keepMoney <= 0) {
		$("input[name=hi_keepMoney]").msg("存房价格不能为0");
		return;
	}
	var _hi_money = returnFloat($("input[name=hi_money]").val().trim());
	if (_hi_money <= 0) {
		$("input[name=hi_money]").msg("出房价格不能为0");
		return;
	}
	// 图片验证 shenhx 20170327 修改房屋中 图片上传取消，故此处图片验证取消
//	$.ajax({
//		type: "POST",
//		url: "/houseLibrary/queryHouseImageList",
//		data: {
//			hi_code: hi_code
//		},
//		dataType: "json"
//	}).done(function(result){
//		if(result.code != 200){
//			$.jBox.tip("参数错误，请联系管理员", "warning");
//			return;
//		}
//		if(result.data.length <= 0){
//			$.jBox.tip("请上传图片", "warning");
//			return;
//		}
		
		var data = {};
//		data.hi_id = hi_id;
		data.hi_code = hi_code;
		
//		var _propertyInfo_id
//			prop_code ="";
//		if($("select[name=porp_name]").length > 0){
//			var last_porp_name = $("select[name=porp_name]:last>option:selected");
//			_propertyInfo_id = last_porp_name.attr("data-prop-id");
//			prop_code = last_porp_name.attr("data-code") + "-";
//		} else {
//			_propertyInfo_id = $("input[name=propertyInfo_id]").attr("data-id");
//		}
		//data.propertyInfo_Id = $("input[name=propertyInfo_id]").attr("data-id");
		data.hi_floor = $("input[name=hi_floor]").val().trim();
		data.hi_address = $("input[name=hi_floor]").val().trim() + "-" + $("input[name=hi_address]").val().trim();
		data.hi_name = $("input[name=hi_name]").val().trim();
//		data.hi_keepMoney = $("input[name=hi_keepMoney]").val().trim();
//		data.hi_money = $("input[name=hi_money]").val().trim();
		data.hi_measure = $("input[name=hi_measure]").val().trim();
		data.hi_houseS = $("input[name=hi_houseS]").val().trim();
		data.hi_houseT = $("input[name=hi_houseT]").val().trim();
		data.hi_houseW = $("input[name=hi_houseW]").val().trim();
		
		if(isEmpty($("input[name=cc_code]").val())){
			$.jBox.tip("请选择房东");
			return;
		} else {
//			if(isEmpty($("input[name=cc_card]").val())){
//				$.jBox.tip("该房东证件无效，请填写有效证件");
//				return;
//			}
		}
		data.cc_code = $("input[name=cc_code]").val();
		
//		data.he_id = $("#house_data").data("_data").houseHouseInformation.he_id;
//		data.he_phone = $("input[name=he_phone]").val().trim();
//		data.he_address = $("input[name=he_address]").val().trim();
		
		data.hi_type = $("select[name=hi_type]").val().trim();
		data.hi_state = $("select[name=hi_state]").val().trim();
		data.hi_orientation = $("select[name=hi_orientation]").val().trim();
		
		if(returnNumber($("select[name=hb_id]:first>option:selected").val()) == 0){
			$("select[name=hb_id]:first").msg("请选择品牌");
			return;
		}
		if($("input[name=hb_id_sub]:checked").length < 1){
			$.jBox.tip("[房屋品牌]请选择长租或者短租");
			return;
		}
		var hb_list = "";
		$("select[name=hb_id]").each(function(){
			hb_list += $(this).find("option:selected").val() + ",";
		});
		$("input[name=hb_id_sub]:checked").each(function(){
			hb_list += $(this).val() + ",";
		});
		data.hb_list = hb_list;
		data.hb_id = $("select[name=hb_id]").val().trim();
		data.hi_version = $("select[name=hi_version]").val().trim();
		data.hi_text = $("input[name=hi_text]").data("data");
		data.hi_userManaged = $("input[name=hi_userManaged]").data("data");
		data.hi_content = $("textarea[name=hi_content]").val().trim();
		data.recommendGroup_Id = eachInputData("recommendGroup_Id", "请选择推荐群体");
		data.hi_function = eachInputData("hi_function", "请选择房源优势");
		data.hi_project = eachInputData("hi_project", "请选择房源配置");
		data.he_address =  $("input[name=he_address]").val().trim();
		
		$.ajax({
			type: "POST",
			url: "/houseLibrary/updateHouseInfo",
			data: data,
			dataType: "json",
			beforeSend : function(){
				$.jBox.tip("更新中...", "loading");
				$(obj).attr("disabled", "disabled");
			},
		}).done(function(result){
			if(result.code != 200){
				$.jBox.tip(result.msg, "warning");
				return;
			}
			$.jBox.tip("更新成功", "success");
		}).fail(function(e){
			$.jBox.tip("请求出错，请重试", "error");
		}).always(function(){
			$(obj).removeAttr("disabled");
		});
//	});
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
	var upn_id = returnNumber($("input[name=propertyInfo_id]").attr("data-uid"));
	if(param.length > 0){
		// 物业定位
		getPropPosition(param, upn_id, param[0].upn_sid);
		// 遍历物业
		eachProperty(param, param[0].upn_sid, 0);
	}
	// 
	position = '';
}

/**
 * 物业定位
 * 
 * @param param 	物业数组
 * @param upn_id 	物业ID
 * @param upn_sid	超父级ID
 */
function getPropPosition(param, upn_id, upn_sid){
	if(upn_id != upn_sid){
		$.each(param, function(index, data){
			if(upn_id == data.upn_id){
				position = data.upn_id + (isEmpty(position) ? "" : "-" + position);
				getPropPosition(param, data.upn_pid, upn_sid);
			}
		});
	}
}

/**
 * 遍历物业
 * 
 * @param param 	物业数组
 * @param upn_id 	物业ID
 * @param cycle		遍历索引
 */
function eachProperty(param, upn_id, cycle){
	var pos = returnNumber(position.split("-")[cycle]);
	upn_id = returnNumber(upn_id);
	if(upn_id == 0){
		$("select[name=porp_name]").not($('.prop_cycle'+ cycle)).remove();
	}
	var next_prop = $('.prop_cycle'+ (cycle + 1));
	var html = (next_prop.length > 0?'':'<select class="form-control prop_cycle'+ (cycle + 1) +'" data-cycle="'+ (cycle + 1) +'" name="porp_name" style="margin-right: 12px;width: auto;min-width: 90px;" required>'),
		isHaving = false;
	
	html +='<option value="0">请选择</option>';
	$.each(param, function(index, data){
		if(data.upn_pid == upn_id && upn_id !=0){
			html +='<option value="'+ data.upn_id +'" data-code="'+ data.upn_code +'" data-prop-id="'+ data.propertyInfo_Id +'" '+ (pos == data.upn_id?"selected":"") +'>'+ data.upn_name +'</option>';
			isHaving = true;
		}
	});
	if(isHaving){ // 有值就添加
		if(next_prop.length > 0){
			next_prop.html(html);
		} else {
			html +='</select>';
			$("#propertyInfo_idGroups").append(html);
			// 绑定select改变事件
			$("select[name=porp_name]:last").on("change", function(){
				eachProperty(param, returnNumber($(this).find("option:selected").val()), returnNumber($(this).attr("data-cycle")));
			});
		}
	} else { // 没有值就删除比当前select周期大的select
		$("select[name=porp_name]").each(function(){
			var _cycle = returnNumber($(this).attr("data-cycle"));
			if(_cycle > cycle){
				$(this).remove();
			}
		});
	}
	
	var _cycle_selected_val = returnNumber($('select.prop_cycle'+ (cycle + 1) + '>option:selected').val());
	if(_cycle_selected_val != 0){
		eachProperty(param, _cycle_selected_val, cycle + 1);
	}
}

/** 更新物业*/
function updateProp(mode){
	var _box = $(".prop_box");
	if(_box.is(":hidden")){
		$("#house-edit").hide();
		_box.fadeIn();
		_box.css('background', "#fff");
		_box.css('z-index', 12);
		$("#wuyeDiv").css({"position" : "fixed", "right" : "0", "left" : "0", "top" : "0", "bottom" : "0", "background" : "rgba(23, 22, 33, 0.69)"});
	} else {
		_box.fadeOut();
		$("#house-edit").fadeIn();
		_box.remove("z_index");
		_box.remove("background");
		$("#wuyeDiv").css({"position" : "", "right" : "", "left" : "", "top" : "", "bottom" : "", "background" : ""});
		if(isEmpty(mode) || mode == "cancel"){
			var _prop = $("input[name=propertyInfo_id]");
			_prop
				.val(_prop.data().cache_name)
				.attr("data-id", _prop.data().cache_id)
				.attr("data-uid", _prop.data().cache_uid);
//				initHouseFloorAddress(_prop.data().cache_code);
		}
	}
}

/** 提交物业*/
function submitProp(){
	var _prop_id = $("select[name=porp_name]:last>option:selected").val();
	if(_prop_id == 0){
		$("select[name=porp_name]:last").msg("请选择");
		return;
	}
	var submit = function (v, h, f) {
	    if (v == 'ok'){
	    	var _propertyInfo_id;
			if($("select[name=porp_name]").length > 0){
				var last_porp_name = $("select[name=porp_name]:last>option:selected");
				_propertyInfo_id = last_porp_name.attr("data-prop-id");
			} else {
				_propertyInfo_id = $("input[name=propertyInfo_id]").attr("data-id");
			}
			if(returnNumber($("input[name=hi_floor]").val()) == 0){
				$("input[name=hi_floor]").msg("楼层号不能为空或不能为0");
				return;
			}
			if(returnNumber($("input[name=hi_floor]").val()) == 0){
				$("input[name=hi_address]").msg("房号不能为空或不能为0");
				return;
			}
			var hi_address = $("input[name=hi_floor]").val().trim() + "-" + $("input[name=hi_address]").val().trim();
			
	    	$.ajax({
	    		type: "POST",
	    		url: "/houseLibrary/updateHousePropertyInfo",
	    		data: {
	    			hi_code: hi_code,
	    			propertyInfo_Id : _propertyInfo_id,
	    			hi_address : hi_address
	    		},
	    		dataType: "json",
	    		sendbefore : function(){
	    			$.jBox.tip("修改中...", "loading");
	    		}
	    	}).done(function(result){
	    		switch (result.code) {
	    			case 200:
	    				$.jBox.tip("修改成功", "success");
	    				updateProp("close");
	    				$("#house-info").html(result.data.house_address);
	    				break;
	    			case 110:
	    				$.jBox.tip(result.msg, "error");
	    				break;
	    			default :
	    				$.jBox.tip(result.msg, "error");
	    				break;
	    		}
	    	}).fail(function(){
	    		$.jBox.tip("请求错误", "warning");
	    	});
	    }
	    return true;
	};
	$.jBox.confirm("确定修改该房源所属物业吗？", "提示", submit);
}