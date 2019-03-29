$(function(){
	$.property();
});
;(function(window,$){
	
	/** 初始化*/
	$.property = function(){
		$.property.load_data();
		$.property.load_event();
	};
	
	/** 参数*/
	$.property.param = {};
	
	/** 加载数据*/
	$.property.load_data = function(){
		$.ajax({
			url : "/transferKeep/queryTransferInfo",
			data : {
				con_code : getUrlParam("con_code"),
				em_id : getUrlParam("em_id"),
			},
			dataType : "json"
		}).done(function(result){
			if(result.code != 200){
				return;
			}

			data = result.data;

			contract = data.contract;
			handoverMain = data.handoverMain;
			energyCards = data.energyCards || "";
			energyValues = data.energyValues || "";
			houseKey = data.houseKey;
			handoverGoods = data.handoverGoods || "";
			employee = data.employee || "";
			
			var property = {};
			var itemData = {};
			var otherData = {};
			
			// 赋值全局变量-合同数据
			$.property.param.contract = contract;
			
			// 水电气卡号
			$.each(energyCards, function(index, data){
				var item = property[data.hpec_type] || {};
				item.list = item.list || {};
				item.list["卡号"] = {
					mode : "input",
					value : returnValue(data.hpec_newNumber),
					property : "",
				};
				property[data.hpec_type] = item;
			});
			
			// 水电气数值
			$.each(energyValues, function(index, data){
				var item = property[data.hpv_type] || {};
				item.list = item.list || {};
				item.list["抄表数"] = {
					mode : "input",
					value : returnValue(data.hpv_start),
					property : "",
				};
				property[data.hpv_type] = item;
			});
			
			// 钥匙
			if(!isEmpty(houseKey)){
				var item = itemData["基本"] || {};
				item.list = item.list || {};
				item.list["钥匙"] = {
					mode : "input",
					value : returnValue(houseKey.hk_newNumber),
					itemOn : returnValue(houseKey.hk_type) == "密码钥匙" ? 0 : 1,
					property : "required",
				};
				itemData["基本"] = item;
			};
			
			// 物品配置
			$.each(handoverGoods, function(index, data){
				var iData = itemData[data.hpg_roomType] || {};
				iData.list = iData.list || {};
				
				var oData = otherData[data.hpg_roomType] || {};
				oData.list = oData.list || {};
				
				if(data.hpg_roomType == "其他"){
					oData.list[returnValue(data.hpg_itemName)] = {
						mode : "select",
						number : returnValue(data.hpg_number),
						itemOn : returnNumber(data.hpg_on),
						itemGb : returnNumber(data.hpg_gb),
					};
					otherData[data.hpg_roomType] = oData;
				} else if(data.hpg_roomType == "基本"){
					iData.list[returnValue(data.hpg_itemName)] = {
						mode : "select",
						number : returnValue(data.hpg_number),
					};
					itemData[data.hpg_roomType] = iData;
				} else {
					iData.list[returnValue(data.hpg_itemName)] = {
						mode : "select",
						number : returnValue(data.hpg_number),
						itemOn : returnNumber(data.hpg_on),
						itemGb : returnNumber(data.hpg_gb),
					};
					itemData[data.hpg_roomType] = iData;
				}
			});
			
			if(!isEmpty(handoverMain)){
				otherData["交接人"] = otherData["交接人"] || {};
				otherData["交接人"].option = {
					id : getUrlParam("mode") == "normal" ? returnNumber(handoverMain.hpm_handoverPersonIn) : returnNumber(handoverMain.hpm_handoverPersonOut),
					value : returnValue(handoverMain.hpm_handoverPersonInName),
				};

				otherData["交接日期"] = otherData["交接日期"] || {};
				otherData["交接日期"].option = {
					value : getUrlParam("mode") == "normal" ? returnDate(handoverMain.hpm_handoverDateIn) : returnDate(handoverMain.hpm_handoverDateOut),
				};
				
				otherData["备注"] = otherData["备注"] || {};
				otherData["备注"].option = {
					value : returnValue(handoverMain.hpm_remark),
				};
			} else {
				otherData["交接人"] = otherData["交接人"] || {};
				otherData["交接人"].option = {
					id : employee.em_id,
					value : returnValue(employee.em_name),
				};
			}

			$.property.param.property = property;
			$.property.param.item = itemData;
			$.property.param.other = otherData;
			
			$.property.changeHash("property");
		});
	};
	
	/** 加载事件*/
	$.property.load_event = function(){
		// 事件-隐藏显示
		$(document).on("click", ".btn-down", function(){
			var parent = $(this).parents(".main-item");
			var main = parent.find(".main-item-main");
			if(main.is(":visible")){
				main.hide();
				$(this).find("i").removeClass("fa-angle-down").addClass("fa-angle-right");
			} else {
				main.show();
				$(this).find("i").removeClass("fa-angle-right").addClass("fa-angle-down");
			}
		});
		
		// 事件-菜单选择
		$("menu>li").on("click", function(){
			$.property.changeHash($(this).attr("data-type"));
		});
	};
	
	/** 改变HASH*/
	$.property.changeHash = function(hash){
		var type = $("menu .hover").attr("data-type");
		var boo = $.property.setData(type);
		if(!boo) return;
		
		$("menu .hover").removeClass("hover");
		$("[data-type="+ hash +"]").addClass("hover");
		
		switch (hash) {
			case "property":
				$.property.getProperty(hash);
				break;
			case "item":
				$.property.getItem(hash);
				break;
			case "other":
				$.property.getOther(hash);
				break;
		}
	};
	
	/** 获取物业交接视图*/
	$.property.getProperty = function(hash){
		var _default ={
			"水" : {
				icon : "/resources/image/appPage/property_water.png",
				list : {
					"卡号" 	: {mode : "input", type : "number", value : "", itemOn : 1, placeholder : "卡号", property : ""},
					"抄表数" : {mode : "input", type : "number", value : "", itemOn : 1, placeholder : "抄表数", property : ""}
				}
			},
			"电" : {
				icon : "/resources/image/appPage/property_electric.png",
				list : {
					"卡号" 	: {mode : "input", type : "number", value : "", itemOn : 1, placeholder : "卡号", property : ""},
					"抄表数" : {mode : "input", type : "number", value : "", itemOn : 1, placeholder : "抄表数", property : ""}
				}
			},
			"气" : {
				icon : "/resources/image/appPage/property_gas.png",
				list : {
					"卡号" 	: {mode : "input", type : "number", value : "", itemOn : 1, placeholder : "卡号", property : ""},
					"抄表数" : {mode : "input", type : "number", value : "", itemOn : 1, placeholder : "抄表数", property : ""}
				}
			},
		};
		// 添加列表
		$.property.addListHead(_default, hash);
	};

	/** 获取房屋配置视图*/
	$.property.getItem = function(hash){
		var _default = {
			"基本" : {
				icon : "/resources/image/appPage/house_0.png",
				mode : "option_down",
				list : {
					"钥匙" 			: {mode : "input", type : "number", value : "", itemOn : 1, placeholder : "钥匙", property : "required"},
					"电视卡" 		: {mode : "select", number : 0},
					"门禁卡" 		: {mode : "select", number : 0},
					"信箱钥匙" 		: {mode : "select", number : 0},
					"机顶盒遥控器" 	: {mode : "select", number : 0},
					"电视遥控器" 		: {mode : "select", number : 0},
					"空调遥控器" 		: {mode : "select", number : 0},
				}
			},
			"客厅" : {
				icon : "/resources/image/appPage/house_1.png",
				mode : "option_down",
				number : 0,
				list : {
					"空调"	 	: {number : 0, itemOn : 1, itemGb : 0},
					"电视机" 	: {number : 0, itemOn : 1, itemGb : 0},
					"路由器" 	: {number : 0, itemOn : 1, itemGb : 0},
					"机顶盒" 	: {number : 0, itemOn : 1, itemGb : 0},
					"沙发"  		: {number : 0, itemOn : 1, itemGb : 0},
					"餐桌"  		: {number : 0, itemOn : 1, itemGb : 0},
					"茶几"  		: {number : 0, itemOn : 1, itemGb : 0},
					"电视柜" 	: {number : 0, itemOn : 1, itemGb : 0},
				}
			},
			"主卧" : {
				icon : "/resources/image/appPage/house_2.png",
				mode : "option_down",
				number : 0,
				list : {
					"空调"	  	: {number : 0, itemOn : 1, itemGb : 0},
					"床"	  		: {number : 0, itemOn : 1, itemGb : 0},
					"床垫"	  	: {number : 0, itemOn : 1, itemGb : 0},
					"床头柜"		: {number : 0, itemOn : 1, itemGb : 0},
					"衣柜"	  	: {number : 0, itemOn : 1, itemGb : 0},
					"门锁"	  	: {number : 0, itemOn : 1, itemGb : 0},
					"吊灯"	  	: {number : 0, itemOn : 1, itemGb : 0},
					"窗帘"	  	: {number : 0, itemOn : 1, itemGb : 0},
				}
			},
			"次卧" : {
				icon : "/resources/image/appPage/house_3.png",
				mode : "option_down",
				number : 0,
				list : {
					"空调"		: {number : 0, itemOn : 1, itemGb : 0},
					"床"		  	: {number : 0, itemOn : 1, itemGb : 0},
					"床垫"		: {number : 0, itemOn : 1, itemGb : 0},
					"床头柜"		: {number : 0, itemOn : 1, itemGb : 0},
					"衣柜"		: {number : 0, itemOn : 1, itemGb : 0},
					"门锁"		: {number : 0, itemOn : 1, itemGb : 0},
					"吊灯"		: {number : 0, itemOn : 1, itemGb : 0},
					"窗帘"		: {number : 0, itemOn : 1, itemGb : 0},
				}
			},
			"厨房" : {
				icon : "/resources/image/appPage/house_4.png",
				mode : "option_down",
				number : 0,
				list : {
					"抽烟机"		: {number : 0, itemOn : 1, itemGb : 0},
					"燃气炉"		: {number : 0, itemOn : 1, itemGb : 0},
					"水龙头"		: {number : 0, itemOn : 1, itemGb : 0},
					"洗菜槽"		: {number : 0, itemOn : 1, itemGb : 0},
					"橱柜"		: {number : 0, itemOn : 1, itemGb : 0},
				}
			},
			"卫生间" : {
				icon : "/resources/image/appPage/house_5.png",
				mode : "option_down",
				number : 0,
				list : {
					"马桶"		: {number : 0, itemOn : 1, itemGb : 0},
					"洗漱台"	    : {number : 0, itemOn : 1, itemGb : 0},
					"水龙头"	    : {number : 0, itemOn : 1, itemGb : 0},
					"梳妆镜"	    : {number : 0, itemOn : 1, itemGb : 0},
					"冲水箱"	    : {number : 0, itemOn : 1, itemGb : 0},
					"照明灯"	    : {number : 0, itemOn : 1, itemGb : 0},
					"浴霸灯"	    : {number : 0, itemOn : 1, itemGb : 0},
					"淋浴头"	    : {number : 0, itemOn : 1, itemGb : 0},
					"排风扇"	    : {number : 0, itemOn : 1, itemGb : 0},
				}
			},
			"阳台" : {
				icon : "/resources/image/appPage/house_6.png",
				mode : "option_down",
				number : 0,
				list : {
					"洗衣机"		: {number : 0, itemOn : 1, itemGb : 0},
					"热水器"		: {number : 0, itemOn : 1, itemGb : 0},
					"洗衣槽"		: {number : 0, itemOn : 1, itemGb : 0},
				}
			},
		};
		// 添加列表
		$.property.addListHead(_default, hash);
		// 计算列表数量
		$(".main-item").each(function(){
			var length = 0;
			$(this).find(".main-item-main").find("dl").each(function(){
				if(returnNumber($(this).find("[name=number]").val()) > 0){
					length++;
				}
			});
			var _number = $(this).find(".main-item-head").find(".span-number").html(length);
			if(length > 0) _number.addClass("error-bg");
		});
	};

	/** 获取其他配置视图*/
	$.property.getOther = function(hash){
		var _default = {
			"其他" : {
				icon 	: "/resources/image/appPage/house_other.png",
				list 	: {},
			},
			"交接人" : {
				mode 	: "option_input",
				option 	: {name : "交接人", type : "text", targetID : "handoverPerson", value : "", placeholder : "请选择交接人", property : "disabled"},
			},
			"交接日期" : {
				mode 	: "option_input",
				option 	: {name : "交接日期", type : "text", value : returnDate(new Date()), placeholder : "交接日期", property : "disabled"},
			},
			"备注" : {
				mode 	: "option_textarea",
				option 	: {name : "备注", type : "text", value : "", placeholder : "备注:其他描述、装修情况", property : "disabled"},
			},
		};
		// 添加列表
		$.property.addListHead(_default, hash);
	};

	/** 添加列表*/
	$.property.addListHead = function(_default, hash){
		var current = $.property.param[hash];
		$.each(_default, function(name, item){
			_default[name] = $.extend(true, _default[name], isEmpty(current) ? undefined : current[name]);
		});
		
		var html = '';
		$.each(_default, function(name, item){
			html += '<div class="main-item" data-type="'+ name +'">';
			html += '	<div class="main-item-head">';
			if(!isEmpty(item.icon)){
				html += '	<div class="main-item-head-icon"><img name="icon" src="'+ item.icon +'"></div>';
			}
			if(!isEmpty(name) && item.mode != "option_textarea"){
				html += '	<div class="main-item-head-title">'+ name +'</div>';
			}
			// 下拉模式
			if(item.mode == "option_down"){
				if(item.number != null){
					html += '	<div class="main-item-head-option">';
					html += '		<button class="btn-down" style="text-align: right;"><span class="span-number">'+ returnNumber(item.number) +'</button>';
					html += '	</div>';
				}
				html += '	<div class="main-item-head-option">';
				html += '		<button class="btn-down"><i class="fa-angle-down"></i></button>';
				html += '	</div>';
			}
			// 添加模式
			if(item.mode == "option_add"){
				html += '	<div class="main-item-head-option">';
				html += '		<button class="btn-item fa-plus-circle next" name="property-add"></button>';
				html += '		<button class="btn-item fa-edit hint" name="property-edit" style="font-size:22px;margin-left: 8px;"></button>';
				html += '		<button class="btn-item fa-check-circle ok" name="property-save" style="display:none;margin-left: 8px;"></button>';
				html += '	</div>';
			}
			// input模式
			if(item.mode == "option_input"){
				html += '<div class="main-item-head-text">';
				html += '	<input type="'+ (item.option.type || "text") +'" '+ (isEmpty(item.option.targetID) ? "" : "id=" + item.option.targetID) +' name="property-input" data-id="'+ returnValue(item.option.id) +'" placeholder="'+ returnValue(item.option.placeholder) +'" value="'+ returnValue(item.option.value) +'" data-property="'+ returnValue(item.option.property) +'" '+ returnValue(item.option.property) +'>';
				html += '</div>';
			}
			// textarea模式
			if(item.mode == "option_textarea"){
				html += '<div class="main-item-head-text">';
				html += '	<textarea '+ (isEmpty(item.option.targetID) ? "" : "id=" + item.option.targetID) +' name="property-input" data-id="'+ returnValue(item.option.id) +'" placeholder="'+ returnValue(item.option.placeholder) +'" data-property="'+ returnValue(item.option.property) +'" maxlength="120" '+ returnValue(item.option.property) +' >'+ returnValue(item.option.value) +'</textarea>';
				html += '</div>';
			}
			html += '	</div>';
			html += '	<div class="main-item-main">';
			$.each(item.list || "", function(key, data){
				html += $.property.addListItem(key, data, name);
			});
			html += '	</div>';
			html += '</div>';
		});
		$("main").html(html).attr("data-type", hash);
	};
	
	/** 添加列表Item*/
	$.property.addListItem = function(key, data, parent){
		var html = '';
		html += '<dl>';
		if(data.mode == "input"){
			html += '<dt style="width: 80px;"><input type="text" name="itemName" data-mode="'+ data.mode +'" value="'+ key +'" placeholder="名称" style="width:100%;line-height: inherit;" disabled></dt>';
			if(key == "钥匙"){
				html += '<dd style="padding-left: 10px;">';
				html += '	<button class="checkbox-item checkbox-key '+ (data.itemOn == 0 ? "checkbox-item-hover" : "checkbox-item-blur") +'" data-type="'+ (data.itemOn == 0 ? "密码钥匙" : "普通钥匙") +'"><input type="checkbox" name="itemOn" value="'+ data.itemOn +'" '+ (data.itemOn == 0 ? "checked" : "") +' disabled></button>';
				html += '</dd>';
			}
			html += '<dd style="flex: 1;">';
			html += '	<input type="'+ (data.type || "text") +'" name="itemValue" value="'+ returnValue(data.value) +'" placeholder="'+ returnValue(data.placeholder) +'" data-property="'+ returnValue(data.property) +'" '+ returnValue(data.property) +' disabled>';
			html += '</dd>';
		}
		if(data.mode != "input"){
			if(data.number == 0){
				return "";
			}
			html += '<dt style="flex:1"><input type="text" name="itemName" value="'+ returnValue(key) +'" placeholder="名称" style="width:100%;line-height: inherit;" disabled></dt>';
			html += '<dd style="flex-direction: inherit;">';
			html += '	<button class="span-item"><input type="text" name="number" value="'+ returnNumber(data.number) +'" style="width:100%;text-align: center;line-height: inherit;padding-right: 10px;" disabled></button>';
			html += '</dd>';
			if((data.itemOn != null && $.property.param.contract.contractObject_Type == "托管合同") || parent == "其他"){
				html += '<dd style="padding-left: 10px;">';
				html += '	<button class="checkbox-item checkbox-on '+ (data.itemOn == 0 ? "checkbox-item-hover" : "checkbox-item-blur") +'" data-type="'+ (data.itemOn == 0 ? "新" : "旧") +'"><input type="checkbox" name="itemOn" value="'+ data.itemOn +'" '+ (data.itemOn == 0 ? "checked" : "") +' disabled></button>';
				html += '</dd>';
			}
			if(data.itemGb != null){
				html += '<dd style="padding-left: 10px;">';
				html += '	<button class="checkbox-item checkbox-gb '+ (data.itemGb == 0 ? "checkbox-item-hover" : "checkbox-item-blur") +'" data-type="'+ (data.itemGb == 0 ? "好" : "坏") +'"><input type="checkbox" name="itemGb" value="'+ data.itemGb +'" '+ (data.itemGb == 0 ? "checked" : "") +' disabled></button>';
				html += '</dd>';
			}
			html += '<button class="fa-minus-circle error" name="item-remove" style="display: none;font-size: 24px;margin-left: 10px;"></button>';
		}
		html += '</dl>';
		return html;
	};

	/** 设置数据*/
	$.property.setData = function(hash){
		var boo = true;
		if(isEmpty(hash)){
			return boo;
		}
		var data = {};
		$("main").find(".main-item").each(function(){
			var box = $(this);
			// 获取类型标识
			var type = box.attr("data-type");
			
			if(!isEmpty(type)){
				// 保存参数
				var currentData = {};
				currentData.icon = box.find("[name=icon]").attr("src");
				
				// 保存头部数据
				var _input = box.find("[name=property-input]");
				if(_input.length > 0){
					currentData.option = {
						id : _input.attr("data-id"),
						type : _input.attr("type"),
						value : _input.val(),
						placeholder : _input.attr("placeholder"),
						property : _input.attr("data-property"),
					}
				}
				
				// 保存列表数据
				var list_item = box.find(".main-item-main").find("dl");
				if(list_item.length > 0){
					currentData.list = {};
					list_item.each(function(){
						var subBox = $(this);
						var subData = {};
						// [获取输入值对象]
						var item_name = subBox.find("[name=itemName]");
						// [获取数量]
						var item_number = subBox.find("[name=number]");
						// [获取值]
						var item_value = subBox.find("[name=itemValue]");
						
						subData.mode = item_name.attr("data-mode");
						
						if(subData.mode == "input"){
							subData.type = returnValue(item_value.attr("type"));
							subData.value = returnValue(item_value.val());
							subData.itemOn = returnNumber(subBox.find("[name=itemOn]").val());
							subData.placeholder = returnValue(item_value.attr("placeholder"));
							subData.property = returnValue(item_number.attr("data-property"));
						} else {
							subData.number = returnValue(item_number.val());
							if(subBox.find("[name=itemOn]").length > 0) subData.itemOn = returnNumber(subBox.find("[name=itemOn]").val());
							if(subBox.find("[name=itemGb]").length > 0) subData.itemGb = returnNumber(subBox.find("[name=itemGb]").val());
							subData.property = returnValue(item_number.attr("data-property"));
						}
						
						currentData.list[item_name.val()] = subData;
					});
				}
				data[type] = currentData;
			}
			if(!boo) return false;
		});
		$.property.param[hash] = $.extend($.property.param[hash], data);
		return boo;
	};

})(window,$);