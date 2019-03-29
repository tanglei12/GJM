$(function () {
    $.propertySettlement();
});

//回调参数
function where(result){
    var arry = eval(result);
    // 物业选择返回
    if(arry.type != null && arry.type == "settlement") {
        $.setItem(arry.modeType,arry);
    }
}

;(function (window, $) {

    /** 费用结算*/
    $.propertySettlement = function () {
        $.propertySettlement.load_data();
        $.propertySettlement.user();
        $.propertySettlement.load_event();
    };

    /** 参数*/
    $.propertySettlement.param = {
        con_code: getUrlParam("con_code"),
        mode: getUrlParam("mode"),
    };

    /** 加载数据*/
    $.propertySettlement.load_data = function () {
        $.ajax({
            url: '/contractObject/queryContractStatementInfo',
            data: {
                con_code: $.propertySettlement.param.con_code,
                mode: $.propertySettlement.param.mode
            },
            dataType: 'json',
        }).done(function (result) {
            if (result.code != 200) {
                return;
            }

            data = result.data;
            contract = data.contract;
            statementCostItems = data.statementCostItems || "";
            statementDamageItems = data.statementDamageItems || "";
            statementBalances = data.statementBalances || "";
            statementOrder = data.statementOrder;
            cardValueList = data.cardValueList;
            cancelContract = data.cancelContract;

            // 是否App
            isApp = contract.contractObject_Source == "PHONE";
            $.propertySettlement.param.isApp = isApp;
            $.propertySettlement.param.isTG = contract.contractObject_Type == "托管合同";

            if ($.propertySettlement.param.mode == "in") {
                $("[data-type=违约金],[data-type=代理费]").hide();
                $("[name=statement_3]").parents(".content-item").hide();
                $("[name=statement_4]").parents(".content-item").hide();
                $("[name=statement_6]").parents(".content-item").hide();
                $("[name=statement_7]").parents(".content-item").hide();
            }
            if ($.propertySettlement.param.mode == "out") {
                // 押金
                $("[name=statement_7]").val(-returnFloat(contract.contractBody_Pay));

                // 代理费
                var _type = returnValue(cancelContract.cco_applicationType);
                var _rent = returnNumber(contract.contractBody_Rent);
                switch (_type) {
                    case "转租":
                        _rent = _rent * 0.5;
                        break;
                    case "解约":
                        _rent = 0;
                        break;
                    case "退租":
                        _rent = _rent;
                        break;
                    case "强退":
                        _rent = _rent;
                        break;
                    case "到期":
                        _rent = 0;
                        break;
                    default :
                        _rent = 0;
                        break;
                }
                $("#statement_dlf_title").html(_type + "费");
                $("[name=statement_dlf]").val(returnFloat(_rent));
                $.moneySubtotal("代理费");

                // 违约金结算
                // $("[name=statement_wyj]").val();
            }

            // 房屋数据显示
            $("#house-address").html(returnValue(contract.house_address));
            $("#house-rent").html(returnFloat(contract.contractBody_Rent) + "元/月");
            $("#con-date").html(returnValue(contract.contractBody_StartTOEnd));
            $("#house-pay").html(returnFloat(contract.contractBody_Pay) + "元");
            $("#house-stw").html(returnNumber(contract.hi_houseS) + "室" + returnNumber(contract.hi_houseT) + "厅" + returnNumber(contract.hi_houseW) + "卫");

            var cardValues = {};
            $.each(cardValueList, function (index, data) {
                if (isEmpty(data.hpv_type)) return;
                if ($.propertySettlement.param.mode == "in") {
                    cardValues[data.hpv_type] = returnNumber(data.hpv_start);
                }
                if ($.propertySettlement.param.mode == "out") {
                    cardValues[data.hpv_type] = returnNumber(data.hpv_end);
                }
            });

            // 消费结算
            if (!isEmpty(statementCostItems)) {
                $.each(statementCostItems, function (index, data) {
                    if (data.sci_itemName == "水" || data.sci_itemName == "电" || data.sci_itemName == "气") {
                        var sdq = $("[name=statement_sdq]");
                        var itemData = sdq.data("data") || {};
                        itemData[data.sci_itemName] = data;
                        itemData[data.sci_itemName].sci_end = cardValues[data.sci_itemName];

                        sdq.data("data", itemData);
                        sdq.val(returnFloat(returnFloat($("[name=statement_sdq]").val()) + returnFloat(data.sci_totalCosts)));
                    } else if (data.sci_itemName == "垃圾处理") {
                        $("[name=statement_lj]").val(returnFloat(data.sci_totalCosts)).data("data", data);
                    } else if (data.sci_itemName == "物管费") {
                        $("[name=statement_wgf]").val(returnFloat(data.sci_totalCosts)).data("data", data);
                    } else if (data.sci_itemName == "有线电视") {
                        $("[name=statement_tv]").val(returnFloat(data.sci_totalCosts)).data("data", data);
                    } else if (data.sci_itemName == "宽带") {
                        $("[name=statement_kd]").val(returnFloat(data.sci_totalCosts)).data("data", data);
                    } else if (data.sci_itemName == "租金") {
                        $("[name=statement_rent]").val(returnFloat(data.sci_totalCosts)).data("data", data);
                    } else if (data.sci_itemName == "其他") {
                        $("[name=statement_other]").val(returnFloat(data.sci_totalCosts)).data("data", data);
                    }
                });
            } else {
                $.each(cardValues, function (name, value) {
                    var sdq = $("[name=statement_sdq]");
                    var itemData = sdq.data("data") || {};
                    itemData[name] = {
                        sci_itemName: name,
                        sci_end: value
                    };
                    sdq.data("data", itemData);
                });
            }
            $.moneySubtotal("消费");

            // 物品结算
            $.each(statementDamageItems, function (index, data) {
                if (data.sdi_type == "维修") {
                    $("[name=statement_wx]").val(returnFloat(data.sdi_cost)).data("data", data);
                } else if (data.sdi_type == "赔偿") {
                    $("[name=statement_pc]").val(returnFloat(data.sdi_cost)).data("data", data);
                } else if (data.sdi_type == "保洁") {
                    $("[name=statement_bj]").val(returnFloat(data.sdi_cost)).data("data", data);
                } else if (data.sdi_type == "其他") {
                    $("[name=statement_other2]").val(returnFloat(data.sdi_cost)).data("data", data);
                }
            });

            $.moneySubtotal("物品");

            // 招租订单不为空
            if (!isEmpty(cancelContract)) {
                var cco_code = cancelContract.cco_code;
                $.propertySettlement.param.cco_code = cco_code;
            }

            // if (isApp) {
            //     $("#image-jsd-box").hide();
            // } else {
            //     $("#image-jsd-box").show();
            // }

            // 其他信息|结算订单不为空
            if (!isEmpty(statementOrder)) {
                //
                var statement_code = statementOrder.statement_code;
                $.propertySettlement.param.statement_code = statement_code;

                // 结算单图片
                $.each((statementOrder.statement_path || "").split(";"), function (index, data) {
                    if (isEmpty(data)) return;

                    $.appImageUpload.addImage("#image-box-jsd", {
                        id: -1,
                        type: "JSD",
                        blob: data,
                        path: data,
                    });

                    $("#image-box-jsd").show();
                });
                // 备注
                $("[name=statement_remarks]").val(returnValue(statementOrder.statement_remarks));
                // 结算人
                $("[name=statement_balancer]").val(returnValue(statementOrder.statement_balancer));
                // 结算日期
                $("[name=calCostDate]").val(returnDate(statementOrder.statement_balanceTime || new Date()));
            } else {
                // 结算日期
                $("[name=calCostDate]").val(returnDate(new Date()));
            }
        });
    };

    $.propertySettlement.user = function(){
        $.ajax({
            type: "POST",
            url: "/appPage/selectUserInfo",
            data: {
                em_id: getUrlParam("em_id")
            },
            dataType: "json",
            success: function (result) {
                $.propertySettlement.setHousekeeperValue(result.data.em_id, result.data.em_name);
            }
        });
    };

    /** 加载事件*/
    $.propertySettlement.load_event = function () {

        // 图片预览
        mui.previewImage();

        // 结算签字
        $("[name=customer-qz]").on("click", function () {
            OCPropertySettlement.customerSign();
        });

        // 结算人
//		$("[name=statement_balancer]").on("click", function(){
//			OCPropertySettlement.chooseHousekeeper();
//		});

        // 开启消费项目编辑
        $("main").on("click", ".statement_xf", function () {
            $.openItem("xf", this);
        });
        // 开启物品项目编辑
        $("main").on("click", ".statement_wp", function () {
            $.openItem("wp", this);
        });

        //
        $("main").on("input propertychange", "[name=statement_dlf]", function () {
            $.moneySubtotal("代理费");
        });

        //
        $("input").not("[readonly]").on("focus", function () {
            $(this).select();
        });

        // 显示更多房源信息
        $("#show-house-more").on("click", function () {
            var moreBox = $("#house-more");
            if (moreBox.is(":hidden")) {
                moreBox.slideDown(300);
                $(this).find("[name=show-house-more]>i").removeClass("fa-angle-down").addClass("fa-angle-up");
            } else {
                moreBox.slideUp(200);
                $(this).find("[name=show-house-more]>i").removeClass("fa-angle-up").addClass("fa-angle-down");
            }
        });

        // 图片-结算单
        $.appImageUpload({
            id: "[name=imageJSD]",
            box: "#image-box-jsd",
            type: "JSD",
            limit: 3,
            done: function (mode, opts, fileData) {
                $(opts.id).removeAttr("disabled").removeClass("disabled-bg").removeClass("next-bg");
                opts.fileCount >= opts.limit ? $(opts.id).attr("disabled", "disabled").addClass("disabled-bg") : $(opts.id).addClass("next-bg");
                opts.fileCount == 0 ? $(opts.box).hide() : $(opts.box).fadeIn();

                var type = "contract";
                switch (mode) {
                    case "add" :
                        $.appImageUpload.upload(opts, fileData, type);
                        break;
                    case "remove" :
                        $.appImageUpload.remove(opts, fileData, type);
                        break;
                }
            },
        });
    };

    /** 保存*/
    $.propertySettlement.save = function () {
        // 失去焦点，关闭软键盘
        $("input, textarea").blur();

        var data = {};
        data.mode = $.propertySettlement.param.mode;

        // 结算单
        var statement = {};
        statement.statement_code = returnValue($.propertySettlement.param.statement_code);
        statement.contractObject_code = returnValue($.propertySettlement.param.con_code);
        statement.cco_code = returnValue($.propertySettlement.param.cco_code);
        statement.statement_costs = Math.abs(returnFloat($("#statement_total").text()));
        statement.statement_totalCost = returnFloat($("#statement_penalty").text());
        statement.statement_agent = returnFloat($("#statement_agent").text());
        statement.statement_penalty = returnFloat($("#statement_penalty").text());

//		statement.statement_bankPerson =$("[name=customer_bank]").attr("data-name");
//		statement.statement_bankType =$("[name=customer_bank]").attr("data-type");
//		statement.statement_bankCard =$("[name=customer_bank]").attr("data-number");

        statement.statement_balancer = $("[name=statement_balancer]").val();
        if (isEmpty(statement.statement_balancer)) {
            $("[name=statement_balancer]").appMsg("请选择结算人");
            return;
        }
        statement.statement_balanceTime = $("input[name=calCostDate]").val();
        if (isEmpty(statement.statement_balanceTime)) {
            $("[name=calCostDate]").appMsg("请选择结算日期");
            return;
        }
        statement.statement_remarks = $("[name=statement_remarks]").val();
        statement.statement_handoverDate = returnDate(new Date); // TODO

        // 结算单图片
        // if (!$.propertySettlement.param.isApp) {
        //     var src = "";
        //     $(".image-box-item").each(function () {
        //         src += $(this).data("data").path + ";";
        //     });
        //     statement.statement_path = src;
        //     if (isEmpty(statement.statement_path)) {
        //         $("[name=imageJSD]").appMsg("请上传结算单");
        //         return;
        //     }
        // }

        // 结算单图片
//		var contractImages = [];
//		$(".image-box-item").each(function(){
//			var data = $(this).data("data");
//			var contractImage = {};
//			contractImage.id = data.id;
//			contractImage.ci_type = data.type;
//			contractImage.ci_path = data.path;
//			contractImages.push(contractImage);
//		});
//		if(contractImages.length < 1){
//			$("[name=imageJSD]").appMsg("请上传结算单图片");
//			return;
//		}
//		data.contractImages = JSON.stringify(contractImages);

        // 【结算消费项目清单】
        var statementCostItemsList = [];
        // [代理费]
        $("[data-type=代理费]:visible").find("[name^=statement]").each(function () {
            var _data = $(this).data("data");
            if ($(this).is(":visible") && !isEmpty(_data)) {
                statementCostItemsList.push(_data);
            }
        });
        // [消费]
        $("[data-type=消费]:visible").find("[name^=statement]").each(function () {
            var _data = $(this).data("data");
            if ($(this).is(":visible") && !isEmpty(_data)) {
                if ($(this).attr("data-mode") == "水电气") {
                    $.each(_data, function (name, item) {
                        statementCostItemsList.push(item);
                    });
                } else {
                    statementCostItemsList.push(_data);
                }
            }
        });
        // [违约金]
        $("[data-type=违约金]:visible").find("[name^=statement]").each(function () {
            var _data = $(this).data("data");
            if ($(this).is(":visible") && !isEmpty(_data)) {
                statementCostItemsList.push(_data);
            }
        });
        data.statementCostItemsList = JSON.stringify(statementCostItemsList);

        // 【物品结算】
        var statementDamageItemsList = [];
        $("[data-type=物品]:visible").find("[name^=statement]").each(function () {
            var _data = $(this).data("data");
            if ($(this).is(":visible") && !isEmpty(_data)) {
                statementDamageItemsList.push(_data);
            }
        });
        data.statementDamageItemsList = JSON.stringify(statementDamageItemsList);

        // 【消费结余】
        var statement_balance = 0;
        var statementBalanceList = [];
        $("[data-type=费用结余]:visible").find("[name^=statement]").each(function () {
            var type = $(this).attr("data-type");
            if (!isEmpty(type)) {
                var statementBalance = {};
                statementBalance.csb_type = type;
                // csb_credit 公司应收
                // csb_debit  公司应付
                var money = returnFloat($(this).val()); // Math.abs();
                if ($.propertySettlement.param.isTG) {
                    if ($.propertySettlement.param.mode == "in") {
                        statementBalance.csb_credit = $(this).val();
                        statementBalance.csb_debit = 0;
                    }
                    if ($.propertySettlement.param.mode == "out") {
                        statementBalance.csb_credit = money > 0 ? money : 0;
                        statementBalance.csb_debit = money > 0 ? 0 : Math.abs(money);
                    }
                } else {
                    if ($.propertySettlement.param.mode == "in") {
                        statementBalance.csb_credit = 0;
                        statementBalance.csb_debit = $(this).val();
                    }
                    if ($.propertySettlement.param.mode == "out") {
                        statementBalance.csb_credit = money > 0 ? money : 0;
                        statementBalance.csb_debit = money > 0 ? 0 : Math.abs(money);
                    }
                }
                statementBalance.csb_desc = "";
                statementBalanceList.push(statementBalance);

                statement_balance += returnFloat(statementBalance.csb_debit) - returnFloat(statementBalance.csb_credit);
            }
        });
        data.statementBalanceList = JSON.stringify(statementBalanceList);

        statement.statement_balance = statement_balance;
        data.statement = JSON.stringify(statement);

        $.ajax({
            type: "POST",
            url: "/contractObject/addContractStatement",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
               $(".submit").attr("disable",true);
                $.hint("数据保存中...", "loading");
            }
        }).done(function (result) {
            if (result.code != 200) {
                $.hint.tip(result.msg, "error");
                // 保存数据不成功解除按钮限制
                $(".submit").attr("disable",true);
                return;
            }
            $.hint.tip("保存成功", "success", 2000, function () {
                $(".submit").attr("disable",false);
                if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                    window.webkit.messageHandlers.goBackRefresh.postMessage([]);
                } else if (/(Android)/i.test(navigator.userAgent)) {
                    webview.goBackRefresh();
                }
            });
        }).fail(function (e) {
            $.hint("请求服务器出错，请重试或联系管理员", "error");
            // 保存数据不成功解除按钮限制
            $(".submit").attr("disable",true);
        });
    };

    /** APP:设置客户签字数据*/
    $.propertySettlement.setCustomerSign = function (base64) {
        $("[name=customer-qz]").html('<i class="fa-pencil"></i>重新签字');
        $("#image-box-qz").html('<img id="statement_sign" src="data:image/png;base64,' + base64 + '" style="width:100%;height:100%;">').show();
        // 滑动到底部
        $("body")[0].scrollTop = $("body")[0].scrollHeight;
    };

    /** APP:设置管家数据*/
    $.propertySettlement.setHousekeeperValue = function (em_id, em_name) {
        $("[name=statement_balancer]").val(em_name).attr("data-id", em_id);
    };

    /** APP:设置当前管家数据*/
    $.propertySettlement.setCurrentHousekeeperValue = function (em_id, em_name) {
        var balancer = $("[name=statement_balancer]").val();
        if (isEmpty(balancer)) {
            $("[name=statement_balancer]").val(em_name).attr("data-id", em_id);
        }
    };

    /** APP:设置费用结算项*/
    $.setItem = function (mode, data) {
        data = eval(data);
        $("[data-mode=" + mode + "]").val(returnValue(data.total)).data("data", data.item);
        // 小计
        $.moneySubtotal(data.mode);
    };

    /** 开启编辑项*/
    $.openItem = function (type, obj) {
        var mode = $(obj).attr("data-mode");
        var data = JSON.stringify($(obj).data("data"));
        // (模式,JSON字符串)
        window.location.href = "/appPage/propertySettlementItem?type="+type+"&mode="+mode+"&data="+Base64.encode(data);
    };

    /** 小计*/
    $.moneySubtotal = function (mode) {
        var subtotal = 0;
        switch (mode) {
            case "消费":
                $("main").find(".statement_xf").each(function () {
                    subtotal += returnFloat($(this).val());
                });
                $("#statement_costs").html(returnFloat(subtotal));
                $("[name=statement_1]").val(returnFloat(subtotal));
                break;
            case "物品":
                $("main").find(".statement_wp").each(function () {
                    subtotal += returnFloat($(this).val());
                });
                $("#statement_goods").html(returnFloat(subtotal));
                $("[name=statement_2]").val(returnFloat(subtotal));
                break;
            case "代理费":
                $("main").find(".statement_dlf").each(function () {
                    subtotal += returnFloat($(this).val());
                });
                $("#statement_agent").html(returnFloat(subtotal));
                $("[name=statement_3]").val(returnFloat(subtotal));
                break;
            default :

                break;
        }
        $.moneyTotal();
    };

    /** 总计*/
    $.moneyTotal = function () {
        var total = 0;
        total += returnFloat($("[name=statement_1]").val());
        total += returnFloat($("[name=statement_2]").val());
        total += returnFloat($("[name=statement_3]").val());
        total += returnFloat($("[name=statement_4]").val());
        total += returnFloat($("[name=statement_5]").val());
        total += returnFloat($("[name=statement_6]").val());
        total += returnFloat($("[name=statement_7]").val());
        total = returnFloat(total);
        $("#statement_total").html(total);

        if ($.propertySettlement.param.isTG) {
            if ($.propertySettlement.param.mode == "in") {
                if (total < 0) {
                    $("#money-dx").html("公司应支付房东" + Math.abs(total) + "元");
                } else {
                    $("#money-dx").html("公司应收取房东" + Math.abs(total) + "元");
                }
            }
            if ($.propertySettlement.param.mode == "out") {
                if (total < 0) {
                    $("#money-dx").html("公司应支付房东" + Math.abs(total) + "元");
                } else {
                    $("#money-dx").html("公司应收取房东" + Math.abs(total) + "元");
                }
            }
        } else {
            if ($.propertySettlement.param.mode == "in") {
                if (total < 0) {
                    $("#money-dx").html("公司应收取租客" + Math.abs(total) + "元");
                } else {
                    $("#money-dx").html("公司应支付租客" + Math.abs(total) + "元");
                }
            }
            if ($.propertySettlement.param.mode == "out") {
                if (total < 0) {
                    $("#money-dx").html("公司应支付租客" + Math.abs(total) + "元");
                } else {
                    $("#money-dx").html("公司应收取租客" + Math.abs(total) + "元");
                }
            }
        }
    };

    /** (未用)开启侧边栏*/
    $.side = function (mode) {
        var html = '';
        html += '<div id="side">';
        html += '	<div class="side-mask"></div>';
        html += '	<div class="side-main">';
        html += '		<div class="side-main-head">';
        html += '			';
        html += '		</div>';
        html += '		<div class="side-main-content">';
        html += '			';
        html += '		</div>';
        html += '	</div>';
        html += '</div>';
        var box = $(html).appendTo("body");

        // 显示动画
        box.animate({left: "0"}, function () {
            box.find(".side-mask").fadeIn(400);
            $.side.load_data(box, mode);
        });

        // 关闭侧边栏
        box.on("click", ".side-mask", function () {
            $(this).fadeOut(200);
            // 关闭动画
            box.animate({left: "100%"}, function () {
                box.remove();
            });
        })
    };

    /** (未用)开启侧边栏-加载数据*/
    $.side.load_data = function (box, mode) {
        // 模式
        switch (mode) {
            case "sdq":
                html = '';
                var data = {
                    "水": {icon: "/resources/image/appPage/property_water.png",},
                    "电": {icon: "/resources/image/appPage/property_electric.png",},
                    "气": {icon: "/resources/image/appPage/property_gas.png",},
                };
                $.each(data, function (name, item) {
                    html += '<div class="content">';
                    html += '	<div class="content-head">';
                    html += '		<div class="content-item-icon"><img src="' + item.icon + '"></div>';
                    html += '		<div class="content-item-title">' + name + '</div>';
                    html += '		<div class="content-item-option">5251514</div>';
                    html += '	</div>';
                    html += '	<div class="content-main">';
                    html += '		<div class="content-item">';
                    html += '			<dl>';
                    html += '				<dt>未缴费起数</dt>';
                    html += '				<dd>';
                    html += '					<input type="number" class="error" name="statement_s" placeholder="未缴费起数">';
                    html += '				</dd>';
                    html += '			</dl>';
                    html += '		</div>';
                    html += '		<div class="content-item">';
                    html += '			<dl>';
                    html += '				<dt>抄表数</dt>';
                    html += '				<dd>';
                    html += '					<input type="number" class="error" name="statement_e" value="0" placeholder="抄表数">';
                    html += '				</dd>';
                    html += '			</dl>';
                    html += '		</div>';
                    html += '		<div class="content-item">';
                    html += '			<dl>';
                    html += '				<dt>数量</dt>';
                    html += '				<dd>';
                    html += '					<input type="number" class="error" name="statement_n" value="0" readonly>';
                    html += '				</dd>';
                    html += '			</dl>';
                    html += '		</div>';
                    html += '		<div class="content-item">';
                    html += '			<dl>';
                    html += '				<dt>单价：元/m³</dt>';
                    html += '				<dd>';
                    html += '					<input type="number" class="error" name="statement_u" value="4.3" placeholder="单价">';
                    html += '				</dd>';
                    html += '			</dl>';
                    html += '		</div>';
                    html += '		<div class="content-item">';
                    html += '			<dl>';
                    html += '				<dt>违约金</dt>';
                    html += '				<dd>';
                    html += '					<input type="number" class="error" name="statement_w" placeholder="违约金">';
                    html += '				</dd>';
                    html += '			</dl>';
                    html += '		</div>';
                    html += '		<div class="content-item">';
                    html += '			<dl>';
                    html += '				<dd>';
                    html += '					<span style="display: block;width: 100%;text-align: right;">小计：<span class="error" class="statement_total">0</span>&nbsp;元</span>';
                    html += '				</dd>';
                    html += '			</dl>';
                    html += '		</div>';
                    html += '	</div>';
                    html += '</div>';
                });
                box.find(".side-main-content").html(html);
                break;
            default :

                break;
        }
    };

})(window, $);