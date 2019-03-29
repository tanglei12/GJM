$(function () {
    $.property();
});
;(function (window, $) {

    /** 初始化*/
    $.property = function () {
        $.property.load_data();
        $.property.load_event();
    };

    /** 参数*/
    $.property.param = {
        mode: getUrlParam("mode"),
        cacheCards: {}
    };

    /** 加载数据*/
    $.property.load_data = function () {
        $.ajax({
            url: "/transferKeep/queryTransferInfo",
            data: {
                con_code: getUrlParam("con_code"),
                em_id: getUrlParam("em_id")
            },
            dataType: "json"
        }).done(function (result) {
            if (result.code != 200) {
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
            $.each(energyCards, function (index, data) {
                var item = property[data.hpec_type] || {};
                item.list = item.list || {};
                item.list["卡号"] = {
                    mode: "input",
                    value: returnValue(data.hpec_newNumber),
                    property: "",
                };
                property[data.hpec_type] = item;
            });

            // 水电气数值
            $.each(energyValues, function (index, data) {
                var item = property[data.hpv_type] || {};
                item.list = item.list || {};
                item.list["抄表数"] = {
                    mode: "input",
                    value: returnValue($.property.param.mode == "normal" ? data.hpv_start : data.hpv_end),
                    property: "",
                };
                property[data.hpv_type] = item;
                $.property.param.cacheCards[data.hpv_type] = data;
            });

            // 钥匙
            if (!isEmpty(houseKey)) {
                var item = itemData["基本"] || {};
                item.list = item.list || {};
                item.list["钥匙"] = {
                    mode: "input",
                    value: returnValue(houseKey.hk_newNumber),
                    itemOn: returnValue(houseKey.hk_type) == "密码钥匙" ? 0 : 1,
                    property: "required",
                };
                itemData["基本"] = item;
            }
            ;

            // 物品配置
            $.each(handoverGoods, function (index, data) {
                var roomType = data.hpg_roomType;
                roomType = "客厅|客厅1|客餐厅".indexOf(data.hpg_roomType) > -1 ? "客厅" : roomType;
                roomType = "主卧|主卧室".indexOf(data.hpg_roomType) > -1 ? "主卧" : roomType;
                roomType = "次卧|次卧2|次卧室1|次卧室2".indexOf(data.hpg_roomType) > -1 ? "次卧" : roomType;
                roomType = "主卫生间|卫生间".indexOf(data.hpg_roomType) > -1 ? "卫生间" : roomType;

                var iData = itemData[roomType] || {};
                iData.list = iData.list || {};

                var oData = otherData[roomType] || {};
                oData.list = oData.list || {};

                if (roomType == "其他") {
                    oData.list[returnValue(data.hpg_itemName)] = {
                        mode: "select",
                        number: returnValue(data.hpg_number),
                        itemOn: returnNumber(data.hpg_on),
                        itemGb: returnNumber(data.hpg_gb)
                    };
                    otherData[roomType] = oData;
                } else if (roomType == "基本") {
                    iData.list[returnValue(data.hpg_itemName)] = {
                        mode: "select",
                        number: returnValue(data.hpg_number)
                    };
                    itemData[roomType] = iData;
                } else {
                    iData.list[returnValue(data.hpg_itemName)] = {
                        mode: "select",
                        number: returnValue(data.hpg_number),
                        itemOn: returnNumber(data.hpg_on),
                        itemGb: returnNumber(data.hpg_gb)
                    };
                    itemData[roomType] = iData;
                }
            });

            if (!isEmpty(handoverMain)) {
                otherData["交接人"] = otherData["交接人"] || {};
                otherData["交接日期"] = otherData["交接日期"] || {};
                otherData["备注"] = otherData["备注"] || {};

                if (getUrlParam("mode") == "normal") {
                    otherData["交接人"].option = {
                        id: employee.em_id,
                        value: employee.em_name
                    };
                    otherData["交接日期"].option = {
                        value: returnDate(handoverMain.hpm_handoverDateIn)
                    };
                    otherData["备注"].option = {
                        value: returnValue(handoverMain.hpm_remark)
                    };
                }
                if (getUrlParam("mode") == "compary") {
                    if (isEmpty(handoverMain.hpm_handoverPersonOut)) {
                        otherData["交接人"].option = {
                            id: employee.em_id,
                            value: employee.em_name
                        };
                        otherData["交接日期"].option = {
                            value: returnDate(new Date())
                        };
                        otherData["备注"].option = {
                            value: ""
                        };

                    } else {
                        otherData["交接人"].option = {
                            id: returnNumber(handoverMain.hpm_handoverPersonOut),
                            value: returnValue(handoverMain.hpm_handoverPersonOutName)
                        };
                        otherData["交接日期"].option = {
                            value: returnDate(handoverMain.hpm_handoverDateOut)
                        };
                        otherData["备注"].option = {
                            value: returnValue(handoverMain.hpm_remark)
                        };
                    }
                }
            } else {
                otherData["交接人"] = otherData["交接人"] || {};
                otherData["交接人"].option = {
                    id: employee.em_id,
                    value: returnValue(employee.em_name)
                };
            }

            $.property.param.property = property;
            $.property.param.item = itemData;
            $.property.param.other = otherData;

            $.property.changeHash("property");
        });
    };

    /** 加载事件*/
    $.property.load_event = function () {

        // 事件-隐藏显示
        $(document).on("click", ".btn-down", function () {
            var parent = $(this).parents(".main-item");
            var main = parent.find(".main-item-main");
            if (main.is(":visible")) {
                main.hide();
                $(this).find("i").removeClass("fa-angle-down").addClass("fa-angle-right");
            } else {
                main.show();
                $(this).find("i").removeClass("fa-angle-right").addClass("fa-angle-down");
            }
        });

        // 事件-菜单选择
        $("menu>li").on("click", function () {
            $.property.changeHash($(this).attr("data-type"));
        });

        // 事件-新旧
        $(document).on("click", ".checkbox-on", function () {
            $(this).find("input").click();
            var checked = $(this).find("input").is(":checked");
            if (checked) {
                $(this).removeClass("checkbox-item-blur").addClass("checkbox-item-hover").attr("data-type", "新").find("input").val(0);
            } else {
                $(this).removeClass("checkbox-item-hover").addClass("checkbox-item-blur").attr("data-type", "旧").find("input").val(1);
            }
        });

        // 事件-好坏
        $(document).on("click", ".checkbox-gb", function () {
            $(this).find("input").click();
            var checked = $(this).find("input").is(":checked");
            if (checked) {
                $(this).removeClass("checkbox-item-blur").addClass("checkbox-item-hover").attr("data-type", "好").find("input").val(0);
            } else {
                $(this).removeClass("checkbox-item-hover").addClass("checkbox-item-blur").attr("data-type", "坏").find("input").val(1);
            }
        });

        // 事件-好坏
        $(document).on("click", ".checkbox-key", function () {
            $(this).find("input").click();
            var checked = $(this).find("input").is(":checked");
            if (checked) {
                $(this).removeClass("checkbox-item-blur").addClass("checkbox-item-hover").attr("data-type", "密码钥匙").find("input").val(0);
            } else {
                $(this).removeClass("checkbox-item-hover").addClass("checkbox-item-blur").attr("data-type", "普通钥匙").find("input").val(1);
            }
        });

        // 事件-数量-
        $(document).on("click", ".fa-minus-square", function () {
            var number = $(this).parent().find("[name=number]");
            number.val(returnNumber(number.val()) - 1);
            if (returnNumber(number.val()) < 1) {
                $(this).removeClass("next").addClass("disabled").attr("disabled", "disabled");
                var _number = $(this).parents(".main-item").find(".span-number");
                var number = returnNumber(_number.text()) - 1;
                _number.html(number);
                if (number == 0) _number.removeClass("error-bg");
            }
        });

        // 事件-数量+
        $(document).on("click", ".fa-plus-square", function () {
            var number = $(this).parent().find("[name=number]");
            if (returnNumber(number.val()) == 0) {
                var _number = $(this).parents(".main-item").find(".span-number");
                var number_cache = returnNumber(_number.text());
                _number.html(number_cache + 1);
                if (number_cache == 0) _number.addClass("error-bg");
            }
            number.val(returnNumber(number.val()) + 1);
            if (returnNumber(number.val()) > 0) {
                $(this).parent().find(".fa-minus-square").removeClass("disabled").addClass("next").removeAttr("disabled");
            }
        });

        // 事件-添加
        $(document).on("click", "[name=property-add]", function () {
            var box = $("[data-type=其他]").find(".main-item-main");
            var html = $.property.addListItem("", {number: 1, itemOn: 1, itemGb: 0}, "其他");
            var item = $(html).appendTo(box);
            box.find("[name=itemName]").removeAttr("readonly");
            box.find("[name=item-remove]").show();
            item.find("[name=itemName]").focus();

            $("[name=property-add]").show();
            $("[name=property-save]").show();
            $("[name=property-edit]").hide();
        });

        // 事件-编辑
        $(document).on("click", "[name=property-edit]", function () {
            var box = $("[data-type=其他]").find(".main-item-main");
            box.find("[name=itemName]").removeAttr("readonly");
            box.find("[name=item-remove]").show();

            $("[name=property-add]").show();
            $("[name=property-save]").show();
            $("[name=property-edit]").hide();
        });

        // 事件-保存
        $(document).on("click", "[name=property-save]", function () {
            var boo = true;
            var box = $("[data-type=其他]").find(".main-item-main");
            box.find("dl").each(function () {
                var name = $(this).find("[name=itemName]");
                if (isEmpty(name.val())) {
                    name.appMsg("请填写名称");
                    return boo = false;
                } else {
                    name.attr("readonly", "readonly");
                }
            });

            if (!boo) return;

            box.find("[name=item-remove]").hide();

            $("[name=property-save]").hide();
            $("[name=property-add]").show();
            $("[name=property-edit]").show();
        });

        // 事件-删除
        $(document).on("click", "[name=item-remove]", function () {
            $(this).parents("dl").remove();
            if ($("[data-type=其他]").find("dl").length == 0) {
                $("[name=property-add]").show();
                $("[name=property-edit]").show();
                $("[name=property-save]").hide();
            }
        });

        // 事件-选择客户
//		$(document).on("click", "#handoverPerson", function(){
//			if(isEmpty($(this).val())){
//				OCPropertyHandover.chooseHousekeeper();
//			}
//		});

        // 事件-监听滚动条
//		$("main").scroll(function(){
//			var fixed = function(item){
//				if(item.length > 0){
//					var top = returnNumber(item.offset().top);
//					var height = item.height();
//					if(top < 0 && Math.abs(top) < (height + 44)){
//						item.find(".main-item-head").addClass("main-item-head-fixed");
//					} else {
//						item.find(".main-item-head").removeClass("main-item-head-fixed");
//					}
//				}
//			};
//			
//			fixed($(".main-item[data-type=基本]"));
//			fixed($(".main-item[data-type=客厅]"));
//			fixed($(".main-item[data-type=主卧]"));
//			fixed($(".main-item[data-type=次卧]"));
//			fixed($(".main-item[data-type=厨房]"));
//			fixed($(".main-item[data-type=卫生间]"));
//			fixed($(".main-item[data-type=阳台]"));
//			fixed($(".main-item[data-type=其他]"));
//	    });
    };

    /** 改变HASH*/
    $.property.changeHash = function (hash) {
        var type = $("menu .hover").attr("data-type");
        var boo = $.property.setData(type);
        if (!boo) return;

        $("menu .hover").removeClass("hover");
        $("[data-type=" + hash + "]").addClass("hover");

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

    /** 获取物业交接视图0*/
    $.property.getProperty0 = function (hash) {
        var html = '';
        html += '<div class="main-item property" data-type="水">';
        html += '   <div class="main-item-head">';
        html += '   	<div class="main-item-head-icon"><img name="icon" src="/resources/image/appPage/property_water.png"></div>';
        html += '   	<div class="main-item-head-title">水</div>';
        html += '   </div>';
        html += '   <div class="main-item-main">';
        html += '   	<dl>';
        html += '   		<dt style="width: 80px;">卡号</dt>';
        html += '   		<dd style="flex: 1;"><input type="number" name="itemValue" value="333333" placeholder="卡号"></dd>';
        html += '   	</dl>';
        html += '   	<dl>';
        html += '   		<dt style="width: 80px;">抄表数</dt>';
        html += '   		<dd style="flex: 1;"><input type="number" name="itemValue" value="333333" placeholder="抄表数"></dd>';
        html += '   	</dl>';
        html += '   </div>';
        html += '</div>';
        html += '<div class="main-item property" data-type="电">';
        html += '   <div class="main-item-head">';
        html += '   	<div class="main-item-head-icon"><img name="icon" src="/resources/image/appPage/property_electric.png"></div>';
        html += '   	<div class="main-item-head-title">电</div>';
        html += '   </div>';
        html += '   <div class="main-item-main">';
        html += '   	<dl>';
        html += '   		<dt style="width: 80px;">卡号</dt>';
        html += '   		<dd style="flex: 1;"><input type="number" name="itemValue" value="333333" placeholder="卡号"></dd>';
        html += '   	</dl>';
        html += '   	<dl>';
        html += '   		<dt style="width: 80px;">抄表数</dt>';
        html += '   		<dd style="flex: 1;"><input type="number" name="itemValue" value="333333" placeholder="抄表数"></dd>';
        html += '   	</dl>';
        html += '   </div>';
        html += '</div>';
        html += '<div class="main-item property" data-type="气">';
        html += '   <div class="main-item-head">';
        html += '   	<div class="main-item-head-icon"><img name="icon" src="/resources/image/appPage/property_gas.png"></div>';
        html += '   	<div class="main-item-head-title">气</div>';
        html += '   </div>';
        html += '   <div class="main-item-main">';
        html += '   	<dl>';
        html += '   		<dt style="width: 80px;">卡号</dt>';
        html += '   		<dd style="flex: 1;"><input type="number" name="itemValue" value="333333" placeholder="卡号"></dd>';
        html += '   	</dl>';
        html += '   	<dl>';
        html += '   		<dt style="width: 80px;">抄表数</dt>';
        html += '   		<dd style="flex: 1;"><input type="number" name="itemValue" value="333333" placeholder="抄表数"></dd>';
        html += '   	</dl>';
        html += '   </div>';
        html += '</div>';
        $("main").html(html);
    };

    /** 获取物业交接视图*/
    $.property.getProperty = function (hash) {
        var _default = {
            "水": {
                icon: "/resources/image/appPage/property_water.png",
                list: {
                    "卡号": {mode: "input", type: "text", value: "", itemOn: 1, placeholder: "卡号", property: ""},
                    "抄表数": {mode: "input", type: "number", value: "", itemOn: 1, placeholder: "抄表数", property: ""}
                }
            },
            "电": {
                icon: "/resources/image/appPage/property_electric.png",
                list: {
                    "卡号": {mode: "input", type: "text", value: "", itemOn: 1, placeholder: "卡号", property: ""},
                    "抄表数": {mode: "input", type: "number", value: "", itemOn: 1, placeholder: "抄表数", property: ""}
                }
            },
            "气": {
                icon: "/resources/image/appPage/property_gas.png",
                list: {
                    "卡号": {mode: "input", type: "text", value: "", itemOn: 1, placeholder: "卡号", property: ""},
                    "抄表数": {mode: "input", type: "number", value: "", itemOn: 1, placeholder: "抄表数", property: ""}
                }
            },
        };
        // 添加列表
        $.property.addListHead(_default, hash);
    };

    /* 获取房屋配置视图*/
    $.property.getItem = function (hash) {
        var _default = {
            "基本": {
                icon: "/resources/image/appPage/house_0.png",
                mode: "option_down",
                list: {
                    "钥匙": {mode: "input", type: "number", value: "", itemOn: 1, placeholder: "钥匙", property: "required"},
                    "电视卡": {mode: "select", number: 0},
                    "门禁卡": {mode: "select", number: 0},
                    "信箱钥匙": {mode: "select", number: 0},
                    "机顶盒遥控器": {mode: "select", number: 0},
                    "电视遥控器": {mode: "select", number: 0},
                    "空调遥控器": {mode: "select", number: 0}
                }
            },
            "客厅": {
                icon: "/resources/image/appPage/house_1.png",
                mode: "option_down",
                number: 0,
                list: {
                    "空调": {number: 0, itemOn: 1, itemGb: 0},
                    "电视机": {number: 0, itemOn: 1, itemGb: 0},
                    "路由器": {number: 0, itemOn: 1, itemGb: 0},
                    "机顶盒": {number: 0, itemOn: 1, itemGb: 0},
                    "沙发": {number: 0, itemOn: 1, itemGb: 0},
                    "餐桌": {number: 0, itemOn: 1, itemGb: 0},
                    "茶几": {number: 0, itemOn: 1, itemGb: 0},
                    "电视柜": {number: 0, itemOn: 1, itemGb: 0}
                }
            },
            "主卧": {
                icon: "/resources/image/appPage/house_2.png",
                mode: "option_down",
                number: 0,
                list: {
                    "空调": {number: 0, itemOn: 1, itemGb: 0},
                    "床": {number: 0, itemOn: 1, itemGb: 0},
                    "床垫": {number: 0, itemOn: 1, itemGb: 0},
                    "床头柜": {number: 0, itemOn: 1, itemGb: 0},
                    "衣柜": {number: 0, itemOn: 1, itemGb: 0},
                    "门锁": {number: 0, itemOn: 1, itemGb: 0},
                    "吊灯": {number: 0, itemOn: 1, itemGb: 0},
                    "窗帘": {number: 0, itemOn: 1, itemGb: 0}
                }
            },
            "次卧": {
                icon: "/resources/image/appPage/house_3.png",
                mode: "option_down",
                number: 0,
                list: {
                    "空调": {number: 0, itemOn: 1, itemGb: 0},
                    "床": {number: 0, itemOn: 1, itemGb: 0},
                    "床垫": {number: 0, itemOn: 1, itemGb: 0},
                    "床头柜": {number: 0, itemOn: 1, itemGb: 0},
                    "衣柜": {number: 0, itemOn: 1, itemGb: 0},
                    "门锁": {number: 0, itemOn: 1, itemGb: 0},
                    "吊灯": {number: 0, itemOn: 1, itemGb: 0},
                    "窗帘": {number: 0, itemOn: 1, itemGb: 0}
                }
            },
            "厨房": {
                icon: "/resources/image/appPage/house_4.png",
                mode: "option_down",
                number: 0,
                list: {
                    "冰箱": {number: 0, itemOn: 1, itemGb: 0},
                    "抽烟机": {number: 0, itemOn: 1, itemGb: 0},
                    "燃气炉": {number: 0, itemOn: 1, itemGb: 0},
                    "水龙头": {number: 0, itemOn: 1, itemGb: 0},
                    "洗菜槽": {number: 0, itemOn: 1, itemGb: 0},
                    "橱柜": {number: 0, itemOn: 1, itemGb: 0}
                }
            },
            "卫生间": {
                icon: "/resources/image/appPage/house_5.png",
                mode: "option_down",
                number: 0,
                list: {
                    "马桶": {number: 0, itemOn: 1, itemGb: 0},
                    "洗漱台": {number: 0, itemOn: 1, itemGb: 0},
                    "水龙头": {number: 0, itemOn: 1, itemGb: 0},
                    "梳妆镜": {number: 0, itemOn: 1, itemGb: 0},
                    "冲水箱": {number: 0, itemOn: 1, itemGb: 0},
                    "照明灯": {number: 0, itemOn: 1, itemGb: 0},
                    "浴霸灯": {number: 0, itemOn: 1, itemGb: 0},
                    "淋浴头": {number: 0, itemOn: 1, itemGb: 0},
                    "排风扇": {number: 0, itemOn: 1, itemGb: 0}
                }
            },
            "阳台": {
                icon: "/resources/image/appPage/house_6.png",
                mode: "option_down",
                number: 0,
                list: {
                    "洗衣机": {number: 0, itemOn: 1, itemGb: 0},
                    "热水器": {number: 0, itemOn: 1, itemGb: 0},
                    "洗衣槽": {number: 0, itemOn: 1, itemGb: 0}
                }
            }
        };
        // 添加列表
        $.property.addListHead(_default, hash);
        // 计算列表数量
        $(".main-item").each(function () {
            var length = 0;
            $(this).find(".main-item-main").find("dl").each(function () {
                if (returnNumber($(this).find("[name=number]").val()) > 0) {
                    length++;
                }
            });
            var _number = $(this).find(".main-item-head").find(".span-number").html(length);
            if (length > 0) _number.addClass("error-bg");
        });
    };

    /** 获取其他配置视图*/
    $.property.getOther = function (hash) {
        var _default = {
            "其他": {
                icon: "/resources/image/appPage/house_other.png",
                mode: "option_add",
                list: {}
            },
            "交接人": {
                mode: "option_input",
                option: {name: "交接人", type: "text", targetID: "handoverPerson", value: "", placeholder: "请选择交接人", property: "readonly required"}
            },
            "交接日期": {
                mode: "option_input",
                option: {name: "交接日期", type: "text", value: returnDate(new Date()), placeholder: "交接日期", property: "readonly required"}
            },
            "备注": {
                mode: "option_textarea",
                option: {name: "备注", type: "text", value: "", placeholder: "备注:其他描述、装修情况"}
            }
        };
        // 添加列表
        $.property.addListHead(_default, hash);
    };

    /** 添加列表*/
    $.property.addListHead = function (_default, hash) {
        var current = $.property.param[hash];
        $.each(_default, function (name, item) {
            _default[name] = $.extend(true, _default[name], isEmpty(current) ? undefined : current[name]);
        });

        var html = '';
        $.each(_default, function (name, item) {
            html += '<div class="main-item" data-type="' + name + '">';
            html += '	<div class="main-item-head">';
            if (!isEmpty(item.icon)) {
                html += '	<div class="main-item-head-icon"><img name="icon" src="' + item.icon + '"></div>';
            }
            if (!isEmpty(name) && item.mode != "option_textarea") {
                html += '	<div class="main-item-head-title">' + name + '</div>';
            }
            // 下拉模式
            if (item.mode == "option_down") {
                if (item.number != null) {
                    html += '	<div class="main-item-head-option">';
                    html += '		<button class="btn-down" style="text-align: right;"><span class="span-number">' + returnNumber(item.number) + '</button>';
                    html += '	</div>';
                }
                html += '	<div class="main-item-head-option">';
                html += '		<button class="btn-down"><i class="fa-angle-down"></i></button>';
                html += '	</div>';
            }
            // 添加模式
            if (item.mode == "option_add") {
                html += '	<div class="main-item-head-option">';
                html += '		<button class="btn-item fa-plus-circle next" name="property-add"></button>';
                html += '		<button class="btn-item fa-edit hint" name="property-edit" style="font-size:22px;margin-left: 8px;"></button>';
                html += '		<button class="btn-item fa-check-circle ok" name="property-save" style="display:none;margin-left: 8px;"></button>';
                html += '	</div>';
            }
            // input模式
            if (item.mode == "option_input") {
                html += '<div class="main-item-head-text">';
                html += '	<input type="' + (item.option.type || "text") + '" ' + (isEmpty(item.option.targetID) ? "" : "id=" + item.option.targetID) + ' name="property-input" data-id="' + returnValue(item.option.id) + '" placeholder="' + returnValue(item.option.placeholder) + '" value="' + returnValue(item.option.value) + '" data-property="' + returnValue(item.option.property) + '" ' + returnValue(item.option.property) + '>';
                html += '</div>';
            }
            // textarea模式
            if (item.mode == "option_textarea") {
                html += '<div class="main-item-head-text">';
                html += '	<textarea ' + (isEmpty(item.option.targetID) ? "" : "id=" + item.option.targetID) + ' name="property-input" data-id="' + returnValue(item.option.id) + '" placeholder="' + returnValue(item.option.placeholder) + '" data-property="' + returnValue(item.option.property) + '" maxlength="120" ' + returnValue(item.option.property) + ' >' + returnValue(item.option.value) + '</textarea>';
                html += '</div>';
            }
            html += '	</div>';
            html += '	<div class="main-item-main">';
            $.each(item.list || "", function (key, data) {
                html += $.property.addListItem(key, data, name);
            });
            html += '	</div>';
            html += '</div>';
        });
        $("main").html(html).attr("data-type", hash);
    };

    /** 添加列表Item*/
    $.property.addListItem = function (key, data, parent) {
        var html = '';
        html += '<dl>';
        if (data.mode == "input") {
            html += '<dt style="width: 80px;"><input type="text" name="itemName" data-mode="' + data.mode + '" value="' + key + '" placeholder="名称" style="width:100%;line-height: inherit;" readonly></dt>';
            if (key == "钥匙") {
                html += '<dd style="padding-left: 10px;">';
                html += '	<button class="checkbox-item checkbox-key ' + (data.itemOn == 0 ? "checkbox-item-hover" : "checkbox-item-blur") + '" data-type="' + (data.itemOn == 0 ? "密码钥匙" : "普通钥匙") + '"><input type="checkbox" name="itemOn" value="' + data.itemOn + '" ' + (data.itemOn == 0 ? "checked" : "") + '></button>';
                html += '</dd>';
            }
            html += '<dd style="flex: 1;">';
            html += '	<input type="' + (data.type || "text") + '" name="itemValue" value="' + returnValue(data.value) + '" placeholder="' + returnValue(data.placeholder) + '" data-property="' + returnValue(data.property) + '" ' + returnValue(data.property) + '>';
            html += '</dd>';
        } else {
            if (data.number == 0 && $.property.param.contract.contractObject_Type == "租赁合同") {
                return "";
            }
            html += '<dt style="flex:1"><input type="text" name="itemName" value="' + returnValue(key) + '" placeholder="名称" style="width:100%;line-height: inherit;" readonly required></dt>';
            html += '<dd style="flex-direction: inherit;">';
            html += '	<button class="btn-item fa-minus-square ' + (data.number <= 0 ? "disabled" : "next") + '" ' + (data.number <= 0 ? "disabled" : "") + '></button>';
            html += '	<button class="span-item"><input type="text" name="number" value="' + returnNumber(data.number) + '" style="width:100%;text-align: center;line-height: inherit;" readonly></button>';
            html += '	<button class="btn-item fa-plus-square next"></button>';
            html += '</dd>';
            if ((data.itemOn != null && $.property.param.contract.contractObject_Type == "托管合同") || parent == "其他") {
                html += '<dd style="padding-left: 10px;">';
                html += '	<button class="checkbox-item checkbox-on ' + (data.itemOn == 0 ? "checkbox-item-hover" : "checkbox-item-blur") + '" data-type="' + (data.itemOn == 0 ? "新" : "旧") + '"><input type="checkbox" name="itemOn" value="' + data.itemOn + '" ' + (data.itemOn == 0 ? "checked" : "") + '></button>';
                html += '</dd>';
            }
            if (data.itemGb != null) {
                html += '<dd style="padding-left: 10px;">';
                html += '	<button class="checkbox-item checkbox-gb ' + (data.itemGb == 0 ? "checkbox-item-hover" : "checkbox-item-blur") + '" data-type="' + (data.itemGb == 0 ? "好" : "坏") + '"><input type="checkbox" name="itemGb" value="' + data.itemGb + '" ' + (data.itemGb == 0 ? "checked" : "") + '></button>';
                html += '</dd>';
            }
            html += '<button class="fa-minus-circle error" name="item-remove" style="display: none;font-size: 24px;margin-left: 10px;"></button>';
        }
        html += '</dl>';
        return html;
    };

    /** 设置数据*/
    $.property.setData = function (hash) {
        var boo = true;
        if (isEmpty(hash)) {
            return boo;
        }
        var data = {};
        $("main").find(".main-item").each(function () {
            var box = $(this);
            // 获取类型标识
            var type = box.attr("data-type");

            if (!isEmpty(type)) {
                // 保存参数
                var currentData = {};
                currentData.icon = box.find("[name=icon]").attr("src");

                // 保存头部数据
                var _input = box.find("[name=property-input]");
                if (_input.length > 0) {
                    currentData.option = {
                        id: _input.attr("data-id"),
                        type: _input.attr("type"),
                        value: _input.val(),
                        placeholder: _input.attr("placeholder"),
                        property: _input.attr("data-property"),
                    }
                }

                // 保存列表数据
                var list_item = box.find(".main-item-main").find("dl");
                if (list_item.length > 0) {
                    currentData.list = {};
                    list_item.each(function () {
                        var subBox = $(this);

                        // [获取输入值对象]
                        var item_name = subBox.find("[name=itemName]");
                        // 判断必填项&&值不为空
                        if (item_name.attr("required") == "required" && isEmpty(item_name.val())) {
                            item_name.appMsg("请输入" + (item_name.attr("placeholder") || ""));
                            return boo = false;
                        }

                        // [获取数量]
                        var item_number = subBox.find("[name=number]");
                        // 判断必填项&&值不为空
                        if (item_number.attr("required") == "required" && isEmpty(item_number.val())) {
                            item_number.appMsg("请输入" + (item_number.attr("placeholder") || ""));
                            return boo = false;
                        }

                        // [获取值]
                        var item_value = subBox.find("[name=itemValue]");
                        // 判断必填项&&值不为空
                        if (item_value.attr("required") == "required" && isEmpty(item_value.val())) {
                            item_value.appMsg("请输入" + (item_value.attr("placeholder") || ""));
                            return boo = false;
                        }

                        var subData = {};
                        subData.mode = item_name.attr("data-mode");
                        if (subData.mode == "input") {
                            subData.type = returnValue(item_value.attr("type"));
                            subData.value = returnValue(item_value.val());
                            subData.itemOn = returnNumber(subBox.find("[name=itemOn]").val());
                            subData.placeholder = returnValue(item_value.attr("placeholder"));
                            if (item_number.length == 1) {
                                subData.property = returnValue(item_number.attr("data-property"));
                            }
                            if (item_value.length == 1) {
                                subData.property = returnValue(item_value.attr("data-property"));
                            }
                        } else {
                            subData.number = returnValue(item_number.val());
                            if (subBox.find("[name=itemOn]").length > 0) subData.itemOn = returnNumber(subBox.find("[name=itemOn]").val());
                            if (subBox.find("[name=itemGb]").length > 0) subData.itemGb = returnNumber(subBox.find("[name=itemGb]").val());
                            subData.property = returnValue(item_number.attr("data-property"));
                        }

                        currentData.list[item_name.val()] = subData;
                    });
                }
                data[type] = currentData;
            }
            if (!boo) return false;
        });
        $.property.param[hash] = $.extend($.property.param[hash], data);
        return boo;
    };

    /** APP:设置管家数据*/
    $.property.setHousekeeperValue = function (em_id, em_name, em_phone) {
        $("#handoverPerson").val(em_name).attr("data-id", em_id);
    };

    /** 保存数据*/
    $.property.save = function () {
        // 失去焦点，关闭软键盘
        $("input, textarea").blur();

        var type = $("menu .hover").attr("data-type");
        var boo = $.property.setData(type);
        if (!boo) return;

        var propertyList = $.property.param.property || "";
        var list = $.property.param.item || "";
        var otherList = $.property.param.other || "";

        var data = {};

        // 能源卡号&能源卡号数值
        var handoverEnergyCardList = [];
        $.each(propertyList, function (name, item) {
            var handoverEnergyCard = {};
            handoverEnergyCard.hpec_type = name;
            $.each(item.list, function (key, data) {
                if (key == "卡号") {
                    handoverEnergyCard.hpec_newNumber = data.value;
                }
                if (key == "抄表数") {
                    if ("normal" == getUrlParam("mode")) {
                        handoverEnergyCard.hpv_start = data.value;
                    }
                    if ("compary" == getUrlParam("mode")) {
                        handoverEnergyCard.hpv_start = $.property.param.cacheCards[name].hpv_start;
                        handoverEnergyCard.hpv_end = data.value;
                    }
                }
            });
            handoverEnergyCardList.push(handoverEnergyCard);
        });

        // 钥匙库
        var houseKey = {};
        // 交接物品
        var handoverGoodsList = [];
        var keyBoo = true;
        $.each(list, function (name, item) {
            $.each((item.list || ""), function (key, data) {
                if (data.mode == "input") {
                    if (key == "钥匙") {
                        houseKey.hk_type = data.itemOn == 0 ? "密码钥匙" : "普通钥匙";
                        houseKey.hk_newNumber = data.value;
                        keyBoo = false;
                    }
                    if (key == "电视卡号") {
                        var handoverEnergyCard = {};
                        handoverEnergyCard.hpec_type = key;
                        handoverEnergyCard.hpec_newNumber = data.value;
                        handoverEnergyCardList.push(handoverEnergyCard);
                    }
                } else {
                    if (returnNumber(data.number) > 0) {
                        var handoverGoods = {};
                        handoverGoods.hpg_roomType = name;
                        handoverGoods.hpg_itemName = key;
                        handoverGoods.hpg_number = data.number;
                        handoverGoods.hpg_on = data.itemOn;
                        handoverGoods.hpg_gb = data.itemGb;
                        handoverGoodsList.push(handoverGoods);
                    }
                }
            });
        });

        if (keyBoo) return $.hint.tip("请在【房屋配置】里面添加钥匙", "hint");

        // 交接单
        var handoverMain = {};
        handoverMain.contractObject_code = getQueryString("con_code");
        $.each(otherList, function (name, item) {
            if (name == "交接日期" && !isEmpty(item.option.value)) {
                if (getUrlParam("mode") == "normal") { // 合作
                    handoverMain.hpm_handoverDateIn = returnValue(item.option.value);
                }
                if (getUrlParam("mode") == "compary") { // 解除合作
                    handoverMain.hpm_handoverDateOut = returnValue(item.option.value);
                }
            }
            if (name == "交接人" && !isEmpty(item.option.id)) {
                if (getUrlParam("mode") == "normal") { // 合作
                    handoverMain.hpm_handoverPersonIn = item.option.id;
                }
                if (getUrlParam("mode") == "compary") { // 解除合作
                    handoverMain.hpm_handoverPersonOut = item.option.id;
                }
            }
            if (name == "备注") {
                handoverMain.hpm_remark = returnValue(item.option.value);
            }
            if (name == "其他" && !isEmpty(item.list)) {
                var handoverGoods = {};
                handoverGoods.hpg_roomType = name;
                $.each((item.list || ""), function (key, data) {
                    if (returnNumber(data.number) > 0) {
                        handoverGoods.hpg_itemName = key;
                        handoverGoods.hpg_number = data.number;
                        handoverGoods.hpg_on = data.itemOn;
                        handoverGoods.hpg_gb = data.itemGb;
                        handoverGoodsList.push(handoverGoods);
                    }
                });
            }
        });

        data.handoverEnergyCardList = JSON.stringify(handoverEnergyCardList);

        data.houseKey = JSON.stringify(houseKey);

        data.handoverMain = JSON.stringify(handoverMain);

        data.handoverGoodsList = JSON.stringify(handoverGoodsList);

        data.mode = getQueryString("mode");

        // 提交数据
        $.ajax({
            type: "POST",
            url: "/appPage/propertyHandoverSave",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            beforeSend: function () {
                // 让获取焦点的元素失去焦点，以此来达到关闭系统软键盘
                $("input:focus").blur();
                $.hint("数据保存中...", "loading");
                // 禁止操作元素
                $("#submit").attr("disabled",true);
            }
        }).done(function (result) {
            if (result.code != 200) {
                $.hint.tip(result.msg, "error");
                $("#submit").attr("disabled",false);
                return;
            }
            var data = result.data;
            $.hint.tip("保存成功", "success", 2000, function () {
                if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                    window.webkit.messageHandlers.goBackRefresh.postMessage([]);
                } else if (/(Android)/i.test(navigator.userAgent)) {
                    webview.goBackRefresh();
                }
            });
        }).fail(function () {
            $("#submit").attr("disabled",false);
            $.hint("请求服务器出错，请重试或联系管理员", "error");
        });
    };

})(window, $);