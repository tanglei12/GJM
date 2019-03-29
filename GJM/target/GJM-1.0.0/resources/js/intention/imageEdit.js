var hi_id = getQueryString("id"); // 房屋编号
var hids = hi_id;
if(hi_id == null || hi_id == ""){
	hi_id = $("#updatephi_id").val();
}

var type = "library";
//定位数组
var position ='';
$(function() {

	if(hids != null){
		// 编辑器初始化
		KindEditor.ready(function(K) {});
	}

	if(hi_id != null && hi_id != ""){
		// 初始化页面数据
		initHouseInfo(hi_id);
		// 初始化房屋图片
		initHouseImageList(hi_id);
	}
	
	
	// 产权地址搜索
	$("input[name=propertyInfo_id]").AutoSearch({
		placeholder : "物业名称",
		result : function(obj){
			$.ajax({
				type: "POST",
				url: "/houseLibrary/queryPropertyInfoList",
				data: {
					upn_sid: $(obj).attr("data-uid")
				},
				contentType: "application/x-www-form-urlencoded; charset=utf-8",
				dataType: "json",
				success: function(result) {
					switch (result.code) {
					case 200:
						$("select[name=porp_name]").remove();
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

/** 初始化房屋相关信息*/
function initHouseInfo(id) {
	$.ajax({
		type: "POST",
		url: "/houseLibrary/selectHouseById",
		data: {
			hi_id: id
		},
		contentType: "application/x-www-form-urlencoded; charset=utf-8",
		dataType: "json",
		success: function(result) {
			switch (result.code) {
				case 200:
					data = result.data;
					$("#house_data").data("_data", data);
					houseHouseInformation = data.houseIntention2;
					houseHouseExtended = data.houseHouseExtended;
					propertyInfoNamelist = data.propertyInfoNamelist;
					// 物业信息
					var prop_name =returnValue(houseHouseInformation.propertyInfo_Name);
					$("input[name=propertyInfo_id]")
						.val(prop_name.replace(/\d+/g,'').replace("-","").trim())
						.attr("data-id", houseHouseInformation.propertyInfo_Id)
						.attr("data-uid", houseHouseInformation.upn_id);
					
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
					
					// 初始化物业信息
					initPropertyNameList(propertyInfoNamelist);
					
					// 初始化楼层房号
					initHouseFloorAddress();
					
					$("input[name=hi_name]").val(houseHouseInformation.hi_name);
					
					$("input[name=hi_keepMoney]").val(returnFloat(houseHouseInformation.hi_keepMoney));
					$("input[name=hi_money]").val(returnFloat(houseHouseInformation.hi_money));
					$("input[name=hi_measure]").val(returnFloat(houseHouseInformation.hi_measure));
					
					$("input[name=hi_houseT]").val(returnNumber(houseHouseInformation.hi_houseT));
					$("input[name=hi_houseS]").val(returnNumber(houseHouseInformation.hi_houseS));
					$("input[name=hi_houseW]").val(returnNumber(houseHouseInformation.hi_houseW));
					
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
					
					// 【房屋品牌】
					var brandName;
					$.each(data.houseHouseBrandList, function(index, data) {
						if(houseHouseInformation.hb_id == data.hb_id){
							brandName = data.hb_name;
						}
						$("select[name=hb_id]").append('<option value="'+ data.hb_id +'" '+ (houseHouseInformation.hb_id == data.hb_id?"selected":"") +'>'+ data.hb_name +'</option>');
					});
					$("select[name=hb_id]").on("click",function(){
						if($(this).find("option:selected").text() == "公寓"){
							$("#hi_version_box").show();
							var html ="";
							html +='<option value="">公寓类型</option>';
							$.each($("select[name=hi_version]").data("data"), function(index, data) {
								html +='<option value="'+ data +'" '+ (brandName == data?"selected":"") +'>'+ data +'</option>';
							});
							$("select[name=hi_version]").html(html);
						} else {
							$("#hi_version_box").hide();
						}
					});
					
					// 【公寓类型】
					$("select[name=hi_version]").data("data", data.versions);
					if("公寓" != brandName){
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
//						if(isTrue){
//							$("#recommendGroup_IdGroups").append('<label class="common-borderbox common-borderbox-checked">'+ returnValue(data.recommendGroup_Name) +'<input type="checkbox" name="recommendGroup_Id" value="'+ data.recommendGroup_Id +'" checked></label>');
//						} else {
//							$("#recommendGroup_IdGroups").append('<label class="common-borderbox">'+ returnValue(data.recommendGroup_Name) +'<input type="checkbox" name="recommendGroup_Id" value="'+ data.recommendGroup_Id +'"></label>');
//						}
					});
					
					// 【房源优势】
//					$("input[name=hi_function]").each(function(){
//						if(returnValue(houseHouseInformation.hi_function).indexOf($(this).val()) > -1){
//							$(this).attr("checked", "checked").parent().addClass("common-borderbox-checked");
//						}
//					});
					// 【房源配置】
//					$("input[name=hi_project]").each(function(){
//						if(returnValue(houseHouseInformation.hi_project).indexOf($(this).val()) > -1){
//							$(this).attr("checked", "checked").parent().addClass("common-borderbox-checked");
//						}
//					});
					
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
					
//					$("input[name=he_peopleName]").val(houseHouseExtended.he_peopleName);
//					$("input[name=he_phone]").val(houseHouseExtended.he_phone);
//					$("input[name=he_address]").val(houseHouseExtended.he_address);
					break;
			}
		}
	});
}

/** 初始化楼层房号*/
function initHouseFloorAddress() {
	var propertyInfo_address = returnValue($("input[name=propertyInfo_id]").val()).trim();
	var len =$("select[name=porp_name]").length;
	var porp_name = "";
	if(len > 0){
		porp_name = $("select[name=porp_name]").eq(len-1).find("option:selected").attr("data-code");
	}
	porp_name = isEmpty(porp_name) ? "" : porp_name + "-";
	
	var hi_floor= returnValue($("input[name=hi_floor]").val()).trim();
	hi_floor = isEmpty(hi_floor) ? "" : hi_floor + "-";
	
	var hi_address= returnValue($("input[name=hi_address]").val()).trim();
	
	$("#house-floor-address").html('[ '+ propertyInfo_address + " " + porp_name + hi_floor + hi_address +' ]').addClass("next");
}

/** 文本编辑*/
function editInfo(index, obj) {
	var _this = $(obj);
	var jBoxConfig = {};
	jBoxConfig.defaults = {
		width: 'auto',
		buttons: { '确定': 'ok' },
		buttonsFocus: 0
	}
	$.jBox.setDefaults(jBoxConfig);

	var title;
	var submit;
	var html = '<textarea name="contents" style="width:948px;height:500px;">' + returnValue(_this.data("data")) + '</textarea>';
	switch (index) {
	case 1:
		title = "房屋简介";
		submit = function(v, h, f) {
			var _content =f.contents.trim();
			if (isEmpty(_content)) {
				_this.val("没有房屋简介，点击添加").removeClass("ok-btn").addClass("error-btn");
			} else {
				_this.val("已有房屋简介，点击修改").removeClass("error-btn").addClass("ok-btn");
			}
			_this.data("data", _content);
			return true;
		};
		break;
	case 2:
		title = "托管管家";
		submit = function(v, h, f) {
			var _content =f.contents.trim();
			if (isEmpty(_content)) {
				_this.val("没有管家详情，点击添加").removeClass("ok-btn").addClass("error-btn");
			} else {
				_this.val("已有管家详情，点击修改").removeClass("error-btn").addClass("ok-btn");
			}
			_this.data("data", _content);
			return true;
		};
		break;
	}
	$.jBox(html, { title: title, submit: submit });
	
	KindEditor.ready(function(K) {
		K.create('textarea[name="contents"]', {
			allowFileManager: true,
			uploadJson: '/resources/Plug-in/kindeditor-4.1.10/jsp/upload_json.jsp',
			fileManagerJson: '/resources/Plug-in/kindeditor-4.1.10/jsp/file_manager_json.jsp',
			allowFileManager: true,
			allowImageUpload: true,
			minWidth: '500px',
			afterCreate: function() {
				this.loadPlugin('autoheight');
			},
			afterBlur: function() {
				this.sync();
			}
		});
	});
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
