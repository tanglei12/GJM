var service_state = {
    0: "待下单",
    1: "待受理",
    2: "待派单",
    3: "待接单",
    4: "待处理",
    5: "待结算",
    6: "待回访"
};
var so_id = -1;

$(function () {
    // 加载数据
    load_data();
});

/**
 * 加载数据
 */
function load_data() {
    $.table({
        // 时间筛选
        filterDateParams: [
            {name: "申请时间", value: "so_createTime", sort: 'DESC', init: "toMonth"},
            {name: "预约时间", value: "so_targetTime", sort: 'DESC'}
        ],
        // 选项筛选
        filterBars: [],
        // 列表参数
        listParams: [
            {text: "服务地址", name: "so_targetAddress", param: "", func: {type: "onclick", name: "$.table.popupOpen(this)"}},
            {text: "订单类型", name: "so_type", param: "returnServiceType"},
            {text: "报事类别", name: "st_name_b", param: ""},
            {text: "报事项目", name: "st_name_c", param: ""},
            {text: "订单状态", name: "so_state", param: "returnServiceState"},
            {text: "服务状态", name: "so_state", param: "returnServiceOperateState"},
            {text: "订单来源", name: "so_source", param: "returnServiceSource"},
            {text: "当前负责人", name: "sp_name", param: ""},
            {text: "联系人", name: "so_contractor{/}so_contractPhone", param: ""},
            {text: "预约时间", name: "so_targetTime", param: "time"},
            {text: "申请时间", name: "so_createTime", param: "time"},
        ],
        // 请求参数
        ajaxParams: {
            url: "/service/queryServicePageList",
            data: {}
        },
        popup: {
            result: function (box, _data) {
                load_service_popup(box.main, _data);
            }
        }
    });
}

/**
 * 加载服务弹出层
 *
 * @param box
 * @param _data
 */
function load_service_popup(box, _data) {
    box.css({
        display: "flex",
        flexDirection: "column",
        overflowY: "hidden"
    });
    so_id = _data.so_id;
    $.ajax({
        type: "POST",
        url: "/service/queryServiceInfo",
        data: {
            so_code: _data.so_code
        },
        dataType: "json"
    }).done(function (result) {
        if (result.code != 200) return;

        // 订单信息
        var serviceOrderInfo = result.data.serviceOrderInfo || "";
        // 订单记录列表
        var serviceRecordList = result.data.serviceRecordList || "";
        // 订单项目列表
        var serviceOrderItemList = result.data.serviceOrderItemList || "";

        // --------------------------------

        // 服务费用明细
        var serviceMoneyDetails = result.data.serviceMoneyDetailList || "";
        // 服务订单状态
        var so_state = returnServiceState(serviceOrderInfo.so_state);
        // 服务订单付费对象
        var so_payObject = returnServicePayObject(serviceOrderInfo.so_payObject);
        // 申请人类型
        serviceOrderInfo.so_applicantType = isEmpty(serviceOrderInfo.so_applicantEmp) ? "客户" : "管家";
        // 申请人姓名
        serviceOrderInfo.so_applicantName = serviceOrderInfo.so_applicantEmpName || serviceOrderInfo.so_applicantUserName;
        // 申请人电话
        serviceOrderInfo.so_applicantPhone = serviceOrderInfo.so_applicantEmpPhone || serviceOrderInfo.so_applicantUserPhone;
        // 服务图片
        var serviceImageVoList = result.data.serviceImageVoList || "";
        // 最新付费人服务费剩余情况
        var contractCharge = result.data.contractCharge || "";

        var _img_data = "";
        $(serviceImageVoList).each(function (index, imgdata) {
            if (imgdata.si_type == "fault") {
                _img_data += imgdata.si_url_path + "#";
            }
        });

        var imgHtml = '<span><label class="' + (isEmpty(_img_data) ? "show-label-disabled" : "show-label-error") + ' sfz-show-label item-label fa-image next-bg" style="cursor: pointer;" title="' + (isEmpty(_img_data) ? "无故障图片" : "点击查看故障图片") + '" data-value="' + _img_data + '" data-hint="没有故障图片"></label></span>';

        // 服务项目
        var itemB = "";
        var itemC = "";
        var itemprint = "";
        $.each(serviceOrderItemList, function (index, data) {
            itemB = data.stb_name;
            if (!isEmpty(data.st_id_c) && !isEmpty(data.stc_name)) {
                itemC += '<label class="item-label ok-bg service-item">' + data.stc_name + '</label>';
                itemprint += data.stc_name + "|";
            }
        });
        itemprint = "【" + itemB + "】" + (isEmpty(itemprint) ? "" : itemprint.substring(0, itemprint.length - 1)) + "  ";

        var item_html = '<div style="display: flex;"><label class="item-label fa-image next-bg" style="cursor: pointer;"></label></div>';

        var house_url = isEmpty(serviceOrderInfo.hi_code) ? '' : 'window.top.href_mo(\'/houseLibrary/jumpHouseInfo?hi_code=' + serviceOrderInfo.hi_code + '\', \'房源详情\')';

        var html = '';
        html += '<div class="popup-list" style="padding: 0 0 6px 0">';
        html += '   <div style="font-size: 16px;font-weight: bold;line-height: 30px;">[' + returnServiceType(serviceOrderInfo.so_type).text + ']<a href="javascript:' + house_url + ';">' + returnValue(serviceOrderInfo.so_targetAddress) + '</a>' + (!isEmpty(serviceOrderInfo.soin_moveEndAddress) ? (" --> " + returnValue(serviceOrderInfo.soin_moveEndAddress)) : "") + '</div>';
        html += '   <dl style="font-size: 12px;line-height: 1.4em"><dt class="next">NO.' + returnValue(serviceOrderInfo.so_code) + '</dt></dl>';
        html += '   <button class="popup-print next-bg" onclick="printService()">打印派工单</button>';
        html += '</div>';
        html += '';
        html += '<div class="popup-list">';
        html += '   <dl><dt>订单来源</dt><dd style="min-width: 200px;">' + returnServiceSource(serviceOrderInfo.so_source).text + '</dd><dt style="margin-left: 30px;">服务状态</dt><dd class="' + so_state.style + '">' + so_state.text + '</dd></dl>';
        html += '   <dl><dt>服务小类</dt><dd style="min-width: 200px;">' + itemB + itemC + '</dd></dl>';
        html += '   <dl><dt>故障说明</dt>';
        html += '       <dd>';
        html += '          <div class="order-item">' + imgHtml + '</div>';
        html += '          <div>' + returnValue(serviceOrderInfo.so_problem) + '</div>';
        html += '       </dd>';
        html += '   </dl>';
        html += '   <dl>';
        html += '      <dt>付费对象</dt>';
        html += '      <dd style="min-width: 200px;">' + so_payObject.text + '</dd>';
        if (!isEmpty(contractCharge)) {
            html += '      <dt style="margin-left: 30px;">' + (serviceOrderInfo.so_payObject == 4 ? "服务费" : (serviceOrderInfo.so_payObject == 5 ? "包修费" : "")) + '</dt>';
            if (returnNumber(contractCharge.init_serveMoney) == 0) {
                html += '      <dd style="min-width: 200px;">无</dd>';
            } else if (returnNumber(contractCharge.init_serveMoney) > 0) {
                html += '      <dd style="min-width: 200px;">' + (returnFloat(contractCharge.surplus_serveMoney) + '/' + returnFloat(contractCharge.init_serveMoney)) + ' 元</dd>';
            }
        }
        html += '   </dl>';
        html += '   <dl>';
        html += '      <dt>联系人</dt>';
        html += '      <dd style="min-width: 200px;">' + returnValue(serviceOrderInfo.so_contractor) + " - " + returnValue(serviceOrderInfo.so_contractPhone) + '</dd>';
        html += '      <dt style="margin-left: 30px;">预约时间</dt>';
        html += '      <dd>' + returnTime(serviceOrderInfo.so_targetTime) + '</dd>';
        html += '   </dl>';
        html += '   <dl><dt>申请人</dt><dd style="min-width: 200px;">[' + serviceOrderInfo.so_applicantType + ']&nbsp;' + returnValue(serviceOrderInfo.so_applicantName) + " - " + returnValue(serviceOrderInfo.so_applicantPhone) + '</dd><dt style="margin-left: 30px;">申请时间</dt><dd>' + returnTime(serviceOrderInfo.so_createTime) + '</dd></dl>';
        html += '</div>';
        html += '';
        html += '<div class="popup-list popup-step" style="flex:1;flex-direction: row">';
        html += '   <div class="popup-step-substate" id="step-substate"></div>';
        html += '   <div class="popup-step-content" id="step-content"></div>';
        html += '   <div class="popup-step-record" id="step-record"></div>';
        html += '</div>';
        box.html(html);

        box.find(".order-item");

        // 点击查看图标
        $(box).find(".show-label-error").on("click", function (e) {
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
                    $.each(_data.split("#"), function (index, data) {
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
                $(".custom-popup").append(html);
                $(".more-img-box").css({
                    top: $(this).offset().top - 115,
                    left: 190,
                });
                $(this).attr("data-show", "show");
            } else {
                $(this).removeAttr("data-show");
            }
        });

        // 加载服务子状态
        load_service_substate(serviceOrderInfo.so_state);

        // 加载服务操作内容
        load_serivce_content(result.data);

        // 加载服务记录
        load_serivce_record(result.data);

        // 加载派工单
        load_print_info(serviceOrderInfo, itemprint);

        // 关闭刷新特效
        $.popupRefreshClose();
    });
}

/**
 * 加载服务子状态
 *
 * @param so_state
 */
function load_service_substate(so_state) {
    var step_substate = $("#step-substate");
    var step_content = $("#step-content");
    var step_record = $("#step-record");
    var step_index = false;

    step_substate.show();
    step_content.show();
    step_record.css({flex: "none"});

    step_substate.empty();
    step_substate.append('<div class="step-point" style="top: 20px;"></div>');

    // 定位
    var step_point = step_substate.find(".step-point");
    // 定位TOP
    var step_point_top = returnFloat(step_point.css("top"));

    // --------------------------------------------

    // 【内部方法】激活状态ing
    var ok_state = function (index, text) {
        var step_item_text = $("[data-step=" + index + "]>.step-item-text");
        step_item_text.removeClass("hint-border-color").addClass("next-border-color");
        // step_item_text.find("i").removeClass().addClass("fa-flag");
        step_item_text.html('<i class="fa-flag"></i>' + (text || step_item_text.text()));
    };
    // 【内部方法】待激活状态
    var hint_state = function (index) {
        var step_item_text = $("[data-step=" + index + "]>.step-item-text");
        step_item_text.removeClass("hint-border-color").addClass("ok-border-color");
        step_item_text.html('<i class="fa-star"></i>' + step_item_text.text().replace("待", "已"));
        // step_item_text.find("i").removeClass().addClass("fa-star");
    };
    // 【内部方法】计算定位TOP
    var calc_top = function (index) {
        if (so_state > 5000) {
            step_point.addClass("error-bg");
        }
        step_point.animate({top: (70 * index + step_point_top)}, 500, function () {
            if (so_state == 4100) {
                step_point.addClass("ok-bg");
                return;
            }
            if (so_state < 4100) {
                step_point.addClass("next-bg");
            }
        });
    };

    // --------------------------------------------

    //
    if (so_state > 5000) {
        step_content.hide();
        step_substate.append('<div class="step-item"><span class="step-item-text error-border-color"><i class="fa-remove"></i>' + returnServiceState(so_state).text + '</span></div>');
        step_record.css({flex: "1"});
        calc_top(0);
        return;
    }

    $.each(service_state, function (key, value) {
        if (step_index) step_substate.append('<div class="step-over"></div>');
        step_substate.append('<div class="step-item" data-step="' + key + '"><span class="step-item-text hint-border-color"><i class="fa-star-o"></i>' + value + '</span></div>');
        step_index = true;
    });

    // --------------------------------------------

    hint_state(0);

    // 已下单
    if (so_state == 1100) {
        ok_state(1);
        calc_top(1);
        return;
    } else {
        hint_state(1);
    }
    // 已受理
    if (so_state == 2100) {
        ok_state(2);
        calc_top(2);
        return;
    } else {
        hint_state(2);
    }
    // 已派单
    if (so_state == 2200) {
        ok_state(3);
        calc_top(3);
        return;
    } else {
        hint_state(3);
    }
    // 已接单
    if (so_state == 3100) {
        ok_state(4);
        calc_top(4);
        return;
    } else {
        hint_state(4);
    }
    // 处理中
    if (so_state == 3200) {
        ok_state(4, "处理中");
        calc_top(4);
        return;
    } else {
        hint_state(4);
    }
    // 已处理
    if (so_state == 3300) {
        ok_state(5);
        calc_top(5);
        return;
    } else {
        hint_state(5);
    }
    // 已结算
    if (so_state == 3400) {
        ok_state(6);
        calc_top(6);
        return;
    } else {
        hint_state(6);
    }
    // 已回访
    if (so_state == 4100) {
        calc_top(6);
        hint_state(6);
        step_content.hide();
        step_record.css({flex: "1"});
    }
}

/**
 * 加载服务内容
 *
 * @param serviceOrderInfo
 */
function load_serivce_content(data, state, title) {
    // 订单信息
    var serviceOrderInfo = data.serviceOrderInfo || "";
    // 已录入的服务费列表
    var serviceMoneyList = data.serviceMoneyList || "";
    //
    var serviceProcessList = data.serviceProcessList || "";
    // 服务图片
    var serviceImageVoList = data.serviceImageVoList || "";
    // 标题列表
    var head_title_list = {
        1100: "订单受理",
        2100: "订单派单",
        2200: "订单接单",
        3100: "订单处理",
        3200: "处理中",
        3300: "费用明细",
        3400: "客服回访",
    };
    // 状态
    var so_state = state || serviceOrderInfo.so_state;

    // ----------------------------------------

    var html = '';
    html += '<div class="step-content-head">';
    html += '   <div class="step-head-title"></div>';
    html += '   <div class="step-head-subtitle"></div>';
    html += '   <div class="step-head-option"></div>';
    html += '</div>';
    html += '<div class="step-content-main"></div>';
    $("#step-content").html(html);

    var head = $("#step-content").find(".step-content-head");
    var main = $("#step-content").find(".step-content-main");
    var head_title = head.find(".step-head-title");
    var head_subtitle = head.find(".step-head-subtitle");
    var head_option = head.find(".step-head-option");

    // ----------------------------------------

    var btn_back = $('<button class="next-bg-bd-w" name="step-pd-back"><i class="fa-chevron-left"></i>返回</button>');
    var btn_close = $('<button class="error-bg-bd-w" name="step-pd-close"><i class="fa-remove"></i>关闭订单</button>');
    var btn_change = $('<button class="next-bg-bd-w" name="step-pd-change"><i class="fa-exchange"></i>改派订单</button>');

    // ----------------------------------------
    main.css({minWidth: "600px"});
    head_title.html(title || head_title_list[so_state]);

    // ----------------------------------------
    switch (so_state) {
        // 已下单
        case 1100:

            // 加载受理操作
            initState_1100(main, serviceOrderInfo);
            break;
        // 已受理
        case 2100:
            btn_close.appendTo(head_option);
            if (state == so_state) {
                // 加载当前信息
                var currentPerson = {};
                $.each(serviceProcessList, function (index, data) {
                    if (data.spro_state == 1) {
                        currentPerson.name = data.sp_name;
                        currentPerson.phone = data.sp_phone;
                    }
                });
                serviceOrderInfo.currentPersonName = currentPerson.name;
                serviceOrderInfo.currentPersonPhone = currentPerson.phone;
                var subtitle = '当前服务人员：' + returnValue(currentPerson.name) + ' - ' + returnValue(currentPerson.phone);
                head_subtitle.html(subtitle).attr("title", subtitle).addClass("error");
                // 按钮
                btn_back.appendTo(head_option);
            }

            var html = '';
            html += '<button class="next-bg-bd-w" name="step-pd-prev" style="display: none;">上一步</button>';
            html += '<button class="next-bg" name="step-pd-next" disabled>下一步</button>';
            html += '<button class="next-bg" name="step-pd-done" data-mode="' + (state == so_state ? "change" : "") + '" style="display: none;">' + (state == so_state ? "确认改派" : "确认派单") + '</button>';
            $(html).appendTo(head_option);

            // 加载服务派单界面
            initState_2100(main, serviceOrderInfo);
            break;
        // 已派单
        case 2200:
            btn_close.appendTo(head_option);
            btn_change.appendTo(head_option);
            // 加载接单界面
            initState_2200(main, serviceOrderInfo);
            break;
        // 已接单
        case 3100:
            btn_close.appendTo(head_option);
            btn_change.appendTo(head_option);
            // 处理中，展示APP上的信息
            // initState_3100(main, serviceOrderInfo, serviceProcessList);
            initState_3200(main, serviceOrderInfo, serviceMoneyList);

            break;
        // 处理中
        case 3200:
            btn_close.appendTo(head_option);
            btn_change.appendTo(head_option);
            // 服务处理
            initState_3200(main, serviceOrderInfo, serviceMoneyList);
            break;
        // 已处理
        case 3300:
            // 费用明细录入
            initState_3300(main, serviceOrderInfo, serviceMoneyList, serviceImageVoList);
            break;
        // 已结算
        case 3400:
            // 服务回访
            initState_3400(main, serviceOrderInfo);
            break;
        // 已回访
        case 4100:
            break;
    }

    // 权限加载
    init_power(so_state);

    // 【事件】关闭
    btn_close.off().on("click", function () {
        $.hint.box("关闭原因：<input type='text' name='refused_reason' style='border: 1px solid #ccc; height: 30px; width: 300px; border-radius: 5px; padding: 0 5px;'>", function (box) {
            if (isEmpty($(box).find("[name=refused_reason]").val())) {
                $(box).find("[name=refused_reason]").msg("请输入关闭订单原因");
                return false;
            }
            $.ajax({
                type: "POST",
                url: "/service/closingServiceOrder",
                data: {
                    so_id: returnNumber(serviceOrderInfo.so_id),
                    refuse_reason: $(box).find("[name=refused_reason]").val()
                },
                dataType: "json",
            }).done(function (result) {
                if (result.code != 200) {
                    $.hint.tip(result.msg, "error");
                    return;
                }
                $.hint.tip("订单已关闭", "success");
                $.popupRefresh();
            });
        });
    });

    // 【事件】改派
    head_option.find("[name=step-pd-change]").off().on("click", function () {
        load_serivce_content(data, 2100, "订单改派");
    });

    // 【事件】返回
    head_option.find("[name=step-pd-back]").off().on("click", function () {
        $.popupRefresh();
    });
}

/**
 * 加载服务记录
 *
 * @param serviceOrderInfo
 * @param serviceRecordList
 * @param mode
 */
function load_serivce_record(data, mode) {
    var serviceOrderInfo = data.serviceOrderInfo || "";
    var serviceRecordList = data.serviceRecordList || "";
    var serviceMoneyList = data.serviceMoneyList || "";
    var serviceMoneyDetails = data.serviceMoneyDetailList || "";
    var userFraction = data.userFraction || "";
    var processProblemVoList = data.processProblemVoList || "";
    var serviceProcessList = data.serviceProcessList || "";

    var mode = mode || 1;
    var head_checked = {
        inside: mode == 1 ? "disabled" : "",
        outside: mode == 2 ? "disabled" : "",
        bussiness: mode == 3 ? "disabled" : "",
        money: mode == 4 ? "disabled" : "",
        // moneyDetail: mode == 5 ? "disabled" : "",
    };
    var step_record = $("#step-record");
    var checked_one = true;
    var html = '';
    html += '<div class="step-record-head">';
    html += '   <button data-type="1" ' + head_checked.inside + '>内部记录</button>';
    html += '   <button data-type="2" ' + head_checked.outside + '>外部记录</button>';
    html += '   <button data-type="3" ' + head_checked.bussiness + '>业务记录</button>';
    html += '   <button data-type="4" ' + head_checked.money + '>服务费用</button>';
    // html += '   <button data-type="5" ' + head_checked.moneyDetail + '>费用明细</button>';
    html += '</div>';
    if (mode == 1) {
        html += '<div class="step-record-content custom-scroll">';
        $.each(serviceRecordList, function (index, data) {
            var style = {};
            if (checked_one) {
                style.point = "record-content-item-point-checked";
                style.main = "record-content-item-main-checked";
                checked_one = false;
            }
            html += '<div class="record-content-item">';
            html += '   <div class="record-content-item-point ' + returnValue(style.point) + '"></div>';
            html += '   <div class="record-content-item-main ' + returnValue(style.main) + '">';
            html += '       <div>【' + returnServiceState(data.ss_code).text + '】' + returnValue(data.sr_content_inside) + '</div>';
            html += '       <div>' + returnValue(data.em_name) + '&nbsp;&nbsp;' + returnTime(data.sr_createTime) + '</div>';
            html += '   </div>';
            html += '</div>';
        });
        html += '</div>';
    } else if (mode == 2) {
        html += '<div class="step-record-content custom-scroll">';
        $.each(serviceRecordList, function (index, data) {
            var style = {};
            if (checked_one) {
                style.point = "record-content-item-point-checked";
                style.main = "record-content-item-main-checked";
                checked_one = false;
            }
            html += '<div class="record-content-item">';
            html += '   <div class="record-content-item-point ' + returnValue(style.point) + '"></div>';
            html += '   <div class="record-content-item-main ' + returnValue(style.main) + '">';
            html += '       <div>【' + returnServiceState(data.ss_code).text + '】' + returnValue(data.sr_content_outside) + '</div>';
            html += '       <div>' + returnValue(data.em_name) + '&nbsp;&nbsp;' + returnTime(data.sr_createTime) + '</div>';
            html += '   </div>';
            html += '</div>';
        });
        html += '</div>';
    } else if (mode == 3) {
        html += "<div class='step-record-content custom-scroll'>";

        var so_state = returnNumber(serviceOrderInfo.serviceOrderInfo);
        var serviceRecordArry = [];
        $.each(serviceRecordList, function (index, item) {
            if ((item.ss_code == 2100 || item.ss_code == 5020) && !isEmpty(item.sr_content_business)) {
                serviceRecordArry.push(item);
            }
        });
        var serviceRecord = {};
        if (serviceRecordArry != null && serviceRecordArry.length == 1) {
            if (serviceRecordArry[0].ss_code == 2100) {
                serviceRecord.result = "确认受理";
            } else if (serviceRecordArry[0].ss_code == 5020) {
                serviceRecord.result = "拒绝受理";
            }
            serviceRecord.remark = serviceRecordArry[0].sr_content_business;
            serviceRecord.time = serviceRecordArry[0].sr_createTime;
        } else if (serviceRecordArry != null && serviceRecordArry.length >= 2) {
            serviceRecord.result = "确认受理";
            serviceRecord.remark = serviceRecordArry[0].sr_content_business;
            serviceRecord.time = serviceRecordArry[0].sr_createTime;
        }

        // 受理信息
        html += "   <fieldset class='fieldset-info'>";
        html += "       <legend>受理信息</legend>";
        if (!isEmpty(serviceRecord) || (returnNumber(serviceOrderInfo.so_state) >= 2100)) {
            html += "       <dl class='output-layout-dl'>";
            html += "           <dt>受理人</dt>";
            html += "           <dd class='layout-dd'>" + returnValue(serviceOrderInfo.so_handlerName) + "</dd>";
            html += "       </dl>";
            html += "       <dl class='output-layout-dl'>";
            html += "           <dt>受理结果</dt>";
            html += "           <dd class='layout-dd'>" + returnValue(serviceRecord.result) + "</dd>";
            html += "       </dl>";
            html += "       <dl class='output-layout-dl'>";
            html += "           <dt>付费对象</dt>";
            html += "           <dd class='layout-dd'>" + (returnPayObject(serviceOrderInfo.so_payObject) + "-" + returnValue(serviceOrderInfo.so_payName) + "-" + returnValue(serviceOrderInfo.so_payPhone)) + "</dd>";
            html += "       </dl>";
            html += "       <dl class='output-layout-dl'>";
            html += "           <dt>备注</dt>";
            html += "           <dd class='layout-dd'>" + returnValue(serviceRecord.remark) + "</dd>";
            html += "       </dl>";
            html += "       <dl class='output-layout-dl'>";
            html += "           <dt>受理时间</dt>";
            html += "           <dd class='layout-dd'>" + returnTime(serviceRecord.time) + "</dd>";
            html += "       </dl>";
        } else {
            html += "       <dl class='output-layout-dl' style='position: relative; left: 20px;'>未受理</dl>";
        }
        html += "   </fieldset>";

        // 现场问题
        html += "   <fieldset class='fieldset-info'>";
        html += "       <legend>现场问题</legend>";
        html += "       <dl class='' style='position: relative; padding: 0 15px;'><dt class=''>现场信息</dt><dd class=''>";
        if (!isEmpty(processProblemVoList)) {
            var problemHtml = "";
            $.each(processProblemVoList, function (index, item) {
                problemHtml += "<tr>";
                problemHtml += "     <td>" + (returnValue(item.em_name)) + "</td>";
                problemHtml += "     <td>" + returnValue(item.spp_content) + "</td>";
                problemHtml += "     <td>" + returnTime(item.spp_createTime) + "</td>";
                problemHtml += "</tr>";
            });
            html += (!isEmpty(problemHtml) ? ("<table style='border-collapse: collapse;' class='tableBill'><thead><tr><td>反馈人</td><td>问题描述</td><td>反馈时间</td></tr></thead><tbody>" + problemHtml + "</tbody></table>") : "无");
        } else {
            html += "无";
        }
        html += "      </dd></dl>";
        html += "       <dl class='' style='position: relative; padding: 15px 15px;'><dt class=''>派单信息</dt><dd class=''>";
        if (!isEmpty(serviceProcessList)) {
            var processHtml = "";
            $.each(serviceProcessList, function (index, item) {
                processHtml += "<tr>";
                processHtml += "     <td>" + (returnValue(item.sp_name) + "-" + returnValue(item.sp_phone)) + "</td>";
                processHtml += "     <td>" + returnSproState(item.spro_state) + "</td>";
                processHtml += "     <td>" + returnValue(item.spro_remarks) + "</td>";
                processHtml += "     <td>" + returnFloat(item.spro_expectEndDuration) + "</td>";
                processHtml += "</tr>";
            });
            html += (!isEmpty(problemHtml) ? ("<table style='border-collapse: collapse;' class='tableBill'><thead><tr><td>跟进人</td><td>跟进状态</td><td>备注</td><td>预计时长(小时)</td></tr></thead><tbody>" + processHtml + "</tbody></table>") : "无");
        } else {
            html += "无";
        }
        html += "       </dd></dl>";
        html += "   </fieldset>";

        // 回访信息
        html += "   <fieldset class='fieldset-info'>";
        html += "       <legend>客服回访</legend>";
        if (!isEmpty(userFraction)) {
            html += "       <dl class='output-layout-dl'>";
            html += "           <dt>回访人</dt>";
            html += "           <dd class='layout-dd'>" + returnValue(userFraction.uf_people) + "</dd>"
            html += "       </dl>";
            html += "       <dl class='output-layout-dl'>";
            html += "           <dt>客服评分</dt>";
            html += "           <dd class='layout-dd'>";
            html += "               <span id='simplestar'>";
            html += "                   <img id='image0' src='/resources/image/T1j.png'>";
            html += "                   <img id='image1' src='/resources/image/T1j.png'>";
            html += "                   <img id='image2' src='/resources/image/T1j.png'>";
            html += "                   <img id='image3' src='/resources/image/T1j.png'>";
            html += "                   <img id='image4' src='/resources/image/T1j.png'>";
            html += "               </span>";
            html += "               <div class='fraction' style='margin-top: 6px;'>";
            html += "                   <em id='scores'>" + returnValue(userFraction.uf_fraction) + "</em> 分";
            html += "               </div>";
            html += "           </dd>"
            html += "       </dl>";
            html += "       <dl class='output-layout-dl'>";
            html += "           <dt>客服评价</dt>";
            html += "           <dd class='layout-dd'>" + returnValue(userFraction.uf_content) + "</dd>"
            html += "       </dl>";
            html += "       <dl class='output-layout-dl'>";
            html += "           <dt>回访时间</dt>";
            html += "           <dd class='layout-dd'>" + returnTime(userFraction.uf_date) + "</dd>"
            html += "       </dl>";
        } else {
            html += "       <dl class='output-layout-dl' style='position: relative; left: 20px;'>未回访</dl>";
        }
        html += "   </fieldset>";
        html += "</div>";
    } else if (mode == 4) {
        html += "<div class='step-record-content custom-scroll'>";
        // 费用
        var htmlTable = "";
        var totalMoney = 0;
        $.each(serviceMoneyList, function (index, item) {
            htmlTable += "<tr>";
            if (item.payObject == 4) {
                htmlTable += "<td>" + item.cc_name + "(租客)" + "</td>";
            } else if (item.payObject == 5) {
                htmlTable += "<td>" + item.cc_name + "(房东)" + "</td>";
            } else if (item.payObject == 6) {
                htmlTable += "<td>" + item.userName + "(用户)" + "</td>";
            } else if (item.payObject == 2) {
                htmlTable += "<td>" + item.em_name + "(管家)" + "</td>";
            } else if (item.payObject == 3) {
                htmlTable += "<td>" + item.ucc_name + "(门店)" + "</td>";
            } else {
                htmlTable += "<td></td>";
            }

            htmlTable += "<td>" + item.ssm_source + "</td>";
            htmlTable += "<td>" + item.ssm_money + "</td>";
            htmlTable += "<td>" + ((isEmpty(item.order_status) || undefined == item.order_status) ? "订单待生成" : returnOrderOptionState(returnNumber(item.order_status)).text) + "</td>";
            htmlTable += "</tr>";
            totalMoney += item.ssm_money;
        });
        if (returnNumber(totalMoney) >= 0) {
            // 全局变量
            $("#serviceMoney").data("data", serviceMoneyList);
        }
        if (!isEmpty(htmlTable)) {
            htmlTable += "<tr><td colspan='4' style='color: red;text-align:right;'>合计：<label id='totalM'>" + totalMoney + "</label>元</td></tr>";
            html += "<dl class=''><dt class=''>服务费用</dt><dd class=''><table style='border-collapse: collapse;' class='tableBill'><thead><tr><td>付费人</td><td>费用名称</td><td>费用金额</td><td>支付状态</td></tr></thead><tbody>" + htmlTable + "</tbody></table></dd></dl>";
            html += "<input type='hidden' id='totalServMoney' value='" + totalMoney + "'>";
        } else {
            html += "<dl class=''><dt class=''>服务费用</dt><dd class=''>无</dd></dl>";
        }

        // 明细
        var detailTable = "";
        $.each(serviceMoneyDetails, function (index, item) {
            detailTable += "<tr>";
            if (item.payObject == 4) {
                if (returnNumber(item.num) >= 1) {
                    detailTable += "<td rowspan='" + returnNumber(item.num) + "'>" + (item.cc_name + "(租客)") + "</td>";
                }
            } else if (item.payObject == 5) {
                if (returnNumber(item.num) >= 1) {
                    detailTable += "<td rowspan='" + returnNumber(item.num) + "'>" + (item.cc_name + "(房东)") + "</td>";
                }
            } else if (item.payObject == 6) {
                if (returnNumber(item.num) >= 1) {
                    detailTable += "<td rowspan='" + returnNumber(item.num) + "'>" + (item.user_name + "(用户)") + "</td>";
                }
            } else if (item.payObject == 2) {
                if (returnNumber(item.num) >= 1) {
                    detailTable += "<td rowspan='" + returnNumber(item.num) + "'>" + (item.em_name + "(管家)") + "</td>";
                }
            } else if (item.payObject == 3) {
                if (returnNumber(item.num) >= 1) {
                    detailTable += "<td rowspan='" + returnNumber(item.num) + "'>" + (item.ucc_name + "(门店)") + "</td>";
                }
            }
            detailTable += "<td>" + item.ssm_source + "</td>";
            detailTable += "<td>" + item.ssm_univalent + "</td>";
            detailTable += "<td>" + item.ssm_num + "</td>";
            detailTable += "<td>" + item.ssm_money + "</td>";
            detailTable += "</tr>";

            // detailTable += "<tr><td colspan='5' style='text-align: right;color: red;'>合计："+returnMoney(item.totalMoney)+"元</tr>";
        });
        if (!isEmpty(detailTable)) {
            html += "<dl style='position: relative; padding-top: 20px;'><dt class=''>服务明细</dt><dd class=''><table style='border-collapse: collapse;' class='tableBill'><thead><tr><td>付费人</td><td>名目</td><td>单价</td><td>数量</td><td>总额</td></tr></thead><tbody>" + detailTable + "</tbody></table></dd></dl>";
        } else {
            html += "<dl style='position: relative; padding-top: 20px;'><dt class=''>服务明细</dt><dd class=''>无</dd></dl>";
        }
        html += "</div>";
    }
    step_record.html(html);

    // 渲染评分
    if (!isEmpty(userFraction)) {
        var score = parseInt(userFraction.uf_fraction);
        $("#simplestar img").each(function () {
            var index = parseInt($(this).attr("id").replace("image", ""));
            if (index < score) {
                if (score <= 2) {
                    $(this).attr("src", "/resources/image/T1lg.png");
                } else {
                    $(this).attr("src", "/resources/image/T1e.png");
                }
            }
        });
    }

    // 点击事件
    step_record.find(".step-record-head").find("button").off().on("click", function () {
        load_serivce_record(data, $(this).attr("data-type"));
    });
}

// ============================================

function existsValue(obj, val) {
    var isExists = 0;
    $(obj).each(function (index, data) {
        if ($(this).val() == val) {
            isExists++;
        }
    });
    return isExists > 0 ? true : false;
}

/**
 * 订单受理
 *
 * @param box
 * @param serviceOrderInfo
 */
function initState_1100(box, serviceOrderInfo) {

    var isShow = isEmpty(serviceOrderInfo.hi_measure);

    var html = "";
    html += "<div>";
    html += "   <dl class='content_dl'>";
    html += "       <dt>受理结果：</dt>";
    html += "       <dd style='padding-top: 5px;'>";
    html += "           <label class='common-checkbox common-checkbox-checked' style='padding-right: 20px;'><input type='radio' name='so_state' value='确认' checked>确认受理</label>";
    html += "           <label class='common-checkbox'><input type='radio' name='so_state' value='拒绝'>拒绝受理</label>";
    html += "       </dd>";
    html += "   </dl>";
    html += "   <div id='so_confirm_box'>";
    html += "   <dl class='content_dl'>";
    html += "       <dt>小区房号：</dt>";
    html += "       <dd style='padding-top: 5px;display: flex;'>";
    html += "           <input type='hidden' id='old-data'>";
    html += "           <input type='hidden' name='contractObject_Code' data-contractObject_code='" + returnValue(serviceOrderInfo.contractObject_Code) + "' value='" + returnValue(serviceOrderInfo.contractObject_Code) + "'>";
    html += "           <input type='hidden' name='hi_code' data-hi_code='" + returnValue(serviceOrderInfo.hi_code) + "' data-address='" + returnValue(returnValue(serviceOrderInfo.so_targetAddress)) + "' value='" + returnValue(serviceOrderInfo.hi_code) + "'>";
    html += "            <input type='text' class='house_input' name='so_targetAddress' value='" + returnValue(serviceOrderInfo.so_targetAddress) + "' style='padding-right: 10px;' disabled><label class='common-checkbox' name='bangHouse' onclick='changeHouse(this)'>绑定内部房屋</label>";
    html += "       </dd>";
    html += "   </dl>";
    html += "   <dl class='content_dl' style='line-height: 15px;font-size: 13px;color: #ff6666;'>";
    html += "       <dt></dt>";
    html += "       <dd><label>建筑面积<label id='houseInfoLabel'> " + (isEmpty(serviceOrderInfo.contractObject_Date_f) ? "无" : (returnFloat(serviceOrderInfo.hi_measure) + " 平米，" + returnNumber(serviceOrderInfo.hi_houseS) + " 室 " + returnNumber(serviceOrderInfo.hi_houseT) + " 厅 " + returnNumber(serviceOrderInfo.hi_houseW) + " 卫")) + "</label></label></dd>";
    html += "   </dl>";
    html += "   <dl class='content_dl' style='line-height: 15px;font-size: 13px;color: #ff6666;'>";
    html += "       <dt></dt>";
    html += "       <dd><label>托管期限<label id='contractObject_TG'> " + (isEmpty(serviceOrderInfo.contractObject_Date_f) ? "无" : ((returnDate(serviceOrderInfo.contractObject_Date_f) + "~" + returnDate(serviceOrderInfo.contractObject_DeadlineTime_f)) + " | " + returnContractOptionState(serviceOrderInfo.contractObject_OptionState_f).text + " | " + returnValue(serviceOrderInfo.cc_name_f) + " | 包修费: " + (returnFloat(serviceOrderInfo.surplus_serveMoney_f) + "/" + returnFloat(serviceOrderInfo.init_serveMoney_f) + " 元"))) + "</label></label></dd>";
    html += "   </dl>";
    html += "   <dl class='content_dl' style='line-height: 15px;font-size: 13px;color: #ff6666;'>";
    html += "       <dt></dt>";
    html += "       <dd><label>租赁期限<label id='contractObject_ZL'> " + (isEmpty(serviceOrderInfo.contractObject_Date_z) ? "无" : ((returnDate(serviceOrderInfo.contractObject_Date_z) + "~" + returnDate(serviceOrderInfo.contractObject_DeadlineTime_z)) + " | " + returnContractOptionState(serviceOrderInfo.contractObject_OptionState_z).text + " | " + returnValue(serviceOrderInfo.cc_name_z) + " | 服务费: " + (returnFloat(serviceOrderInfo.surplus_serveMoney_z) + "/" + returnFloat(serviceOrderInfo.init_serveMoney_z) + " 元"))) + "</label></label></dd>";
    html += "   </dl>";
    html += "   <dl class='content_dl'>";
    html += "       <dt>付费对象：</dt>";
    html += "       <dd>";
    html += "           <label class='typeRadio'><input type='radio' value='4' name='4'/>租客</label>";
    html += "           <label class='typeRadio'><input type='radio' value='5' name='4'/>房东</label>";
    html += "           <label class='typeRadio'><input type='radio' value='2' name='4'/>管家</label>";
    html += "           <label class='typeRadio'><input type='radio' value='3' name='4'/>门店</label>";
    html += "           <label class='typeRadio'><input type='radio' value='6' name='4'/>用户</label>";
    html += "       </dd>";
    html += "   </dl>";
    html += "   <dl class='content_dl'>";
    html += "       <dt>付费人：</dt>";
    html += "       <dd>";
    html += "           <select type='text' class='house_input' name='so_payName' value='' style='padding-right: 10px;'>";
    html += "               <option value='" + returnValue(serviceOrderInfo.so_payName) + "' data-conCode='" + returnValue(serviceOrderInfo.contractObject_Code) + "' selected>" + returnValue(serviceOrderInfo.so_payName) + "</option>";
    html += "           </select>";
    html += "       </dd>";
    html += "   </dl>";
    html += "   <dl class='content_dl'>";
    html += "       <dt>付费电话：</dt>";
    html += "       <dd>";
    html += "           <select type='text' class='house_input' name='so_payPhone' value='' style='padding-right: 10px;'>";
    html += "               <option value='" + returnValue(serviceOrderInfo.so_payPhone) + "' selected>" + returnValue(serviceOrderInfo.so_payPhone) + "</option>";
    html += "           </select>";
    html += "       </dd>";
    html += "   </dl>";
    html += "   <dl class='content_dl'>";
    html += "      <dt>备注：</dt>";
    html += "      <dd>";
    html += "          <textarea name='so_remarks'></textarea>";
    html += "      </dd>"
    html += "   </dl>";
    html += "   </div>"
    html += "   <dl class='content_dl' id='so_refuse_box' style='display: none'>";
    html += "       <dt>拒绝原因：</dt>";
    html += "       <dd style='display: flex;flex-direction: column;width: 240px;'>";
    html += "           <label class='common-borderbox'><input type='radio' name='so_refuse' value='超出范围'>超出范围</label>";
    html += "           <label class='common-borderbox'><input type='radio' name='so_refuse' value='重复下单'>重复下单</label>";
    html += "           <label class='common-borderbox'><input type='radio' name='so_refuse' value='报事不清'>报事不清</label>";
    html += "           <label class='common-borderbox'><input type='radio' name='so_refuse' value='联系不上'>联系不上</label>";
    html += "           <label class='common-borderbox'><input type='radio' name='so_refuse' value='other'>其他原因</label>";
    html += "           <input name='so_refuse_other' placeholder='其他原因' style='display: none'>";
    html += "       </dd>"
    html += "   </dl>";
    html += "<dl class='content_dl'>";
    html += "      <dt></dt>";
    html += "      <dd>";
    html += "           <button class='next-bg' name='service_accept'>提交</button>";
    html += "      </dd>";
    html += "</dl>";
    html += "</div>";
    box.html(html);

    $(box).find("#old-data").data("data-content", serviceOrderInfo);
    $(box).find("[name=4][value=" + returnNumber(serviceOrderInfo.so_payObject) + "]").attr("checked", true);

    // 受理结果
    $(box).on("change", "[name=so_state]", function () {
        switch ($(this).val()) {
            case "确认":
                $("#so_confirm_box").show();
                $("#so_refuse_box").hide();
                break;
            case "拒绝":
                $("#so_refuse_box").show();
                $("#so_confirm_box").hide();
                break;
        }
    });

    // 付费对象
    $(box).on("click", "[name=4]", function () {
        $(this).attr("checked", true);
        var so_payObject = $(this).val();
        $.ajax({
            type: "POST",
            url: "/service/queryPayObjectByHiCode",
            data: {
                hi_code: $("input[type=hidden][name=hi_code]").val() || $("input[type=hidden][name=hi_code]").attr("data-hi_code"),
                so_payObject: returnNumber(so_payObject),
            },
            dataType: "json",
            success: function (result) {
                var payObjct = returnValue(serviceOrderInfo.so_payObject);

                if (result.code == 200) {

                    var nameHtml = (payObjct == so_payObject ? ("<option value='" + returnValue(serviceOrderInfo.so_payName) + "' selected>" + returnValue(serviceOrderInfo.so_payName) + "</option>") : "");
                    var phoneHtml = (payObjct == so_payObject ? ("<option value='" + returnValue(serviceOrderInfo.so_payPhone) + "' selected>" + returnValue(serviceOrderInfo.so_payPhone) + "</option>") : "");
                    $("[name=so_payName]").html(nameHtml);
                    $("[name=so_payPhone]").html(phoneHtml);

                    switch (so_payObject) {
                        case "4":
                            var cc_name = returnValue($(".house_input").attr("data-cc_name_z"));
                            var ccp_phone = returnValue($(".house_input").attr("data-ccp_phone_z"));
                            $("[name=hi_code]").val($("[name=hi_code]").attr("data-hi_code"));

                            $(result.data).each(function (index, data) {
                                var name = (isEmpty(cc_name) ? returnValue(data.cc_name_z) : cc_name);
                                if (!existsValue($("[name=so_payName] option"), name)) {
                                    $("[name=so_payName]").append("<option value='" + name + "' data-conCode='" + returnValue(data.contractObject_Code_z) + "'>" + name + "</option>");
                                }
                                var phone = (isEmpty(ccp_phone) ? returnValue(data.ccp_phone_z) : ccp_phone);
                                if (!existsValue($("[name=so_payPhone] option"), phone)) {
                                    $("[name=so_payPhone]").append("<option value='" + phone + "'>" + phone + "</option>");
                                }
                            });
                            break;
                        case "5":
                            var cc_name = returnValue($(".house_input").attr("data-cc_name_f"));
                            var ccp_phone = returnValue($(".house_input").attr("data-ccp_phone_f"));
                            $("[name=hi_code]").val($("[name=hi_code]").attr("data-hi_code"));

                            $(result.data).each(function (index, data) {
                                var name = (isEmpty(cc_name) ? returnValue(data.cc_name_f) : cc_name);
                                if (!existsValue($("[name=so_payName] option"), name)) {
                                    $("[name=so_payName]").append("<option value='" + name + "' data-conCode='" + returnValue(data.contractObject_Code_f) + "'>" + name + "</option>");
                                }
                                var phone = (isEmpty(ccp_phone) ? returnValue(data.ccp_phone_f) : ccp_phone);
                                if (!existsValue($("[name=so_payPhone] option"), phone)) {
                                    $("[name=so_payPhone]").append("<option value='" + phone + "'>" + phone + "</option>");
                                }
                            });
                            break;
                        case "2":
                            var em_name = returnValue($(".house_input").attr("data-em_name"));
                            var em_phone = returnValue($(".house_input").attr("data-em_phone"));
                            $("[name=contractObject_Code]").val("");
                            $("[name=hi_code]").val($("[name=hi_code]").attr("data-hi_code"));

                            $(result.data).each(function (index, data) {
                                var name = (isEmpty(em_name) ? returnValue(data.em_name) : em_name);
                                if (!existsValue($("[name=so_payName] option"), name)) {
                                    $("[name=so_payName]").append("<option value='" + name + "' data-conCode=''>" + name + "</option>");
                                }
                                var phone = (isEmpty(em_phone) ? returnValue(data.em_phone) : em_phone);
                                if (!existsValue($("[name=so_payPhone] option"), phone)) {
                                    $("[name=so_payPhone]").append("<option value='" + phone + "'>" + phone + "</option>");
                                }
                            });
                            break;
                        case "3":
                            var ucc_name = returnValue($(".house_input").attr("data-ucc_name"));
                            var ucc_phone = returnValue($(".house_input").attr("data-ucc_phone"));
                            $("[name=contractObject_Code]").val("");
                            $("[name=hi_code]").val($("[name=hi_code]").attr("data-hi_code"));

                            $(result.data).each(function (index, data) {
                                var name = (isEmpty(ucc_name) ? returnValue(data.ucc_name) : ucc_name);
                                if (!existsValue($("[name=so_payName] option"), name)) {
                                    $("[name=so_payName]").append("<option value='" + name + "' data-conCode=''>" + name + "</option>");
                                }
                                var phone = (isEmpty(ucc_phone) ? returnValue(data.ucc_phone) : ucc_phone);
                                if (!existsValue($("[name=so_payPhone] option"), phone)) {
                                    $("[name=so_payPhone]").append("<option value='" + phone + "'>" + phone + "</option>");
                                }
                            });
                            break;
                        case "6":
                            $("[name=contractObject_Code]").val("");
                            $("[name=hi_code]").val("");
                            $("[name=so_payName]").val("");
                            $("[name=so_payPhone]").val("");
                            break;
                    }
                } else {
                    $.hint.tip("无付费人信息", "error");
                    return;
                }
            }
        });
    });

    $(box).find("[name=4]:checked").click();

    // 付费人
    $(box).on("change", "[name=so_payName]", function () {
        var selectIndex = $(this).get(0).selectedIndex;
        $(this).val($(this).find("option").eq(selectIndex).val());
        $(this).find("option").eq(selectIndex).attr("selected", "selected").siblings().removeAttr("selected");
        $("[name=so_payPhone]").get(0).selectedIndex = selectIndex;
        $("[name=so_payPhone]").val($("[name=so_payPhone] option").eq(selectIndex).val());
    });

    // 拒绝原因
    $(box).on("change", "[name=so_refuse]", function () {
        if ($(this).val() == "other") {
            $(this).parent().hide();
            $("[name=so_refuse_other]").show().focus();
        } else {
            $("[name=so_refuse_other]").hide().val("");
            $("[name=so_refuse][value=other]").parent().show();
        }
    });

    // 提交服务订单受理
    $(box).on("click", "[name=service_accept]", function () {
        var so_state = $("[name=so_state]:checked").val();
        var so_remarks = "";
        if (so_state == "确认") {
            so_remarks = $("[name=so_remarks]").val().trim();
        }
        if (so_state == "拒绝") {
            var refuse = $("[name=so_refuse]:checked").val();
            so_remarks = refuse == "other" ? $("[name=so_refuse_other]").val() : refuse;
        }

        var so_targetAddress = $(".house_input[name=so_targetAddress]").val();
        if (isEmpty(so_targetAddress)) {
            $.hint.tip("请确认小区房号", "error");
            return;
        }

        var so_payObject = $(".typeRadio [name=4]:checked").val();
        if (isEmpty(so_payObject)) {
            $.hint.tip("请确认付费对象", "error");
            return;
        }

        var so_payName = $("select[name=so_payName]").val();
        if (isEmpty(so_payName)) {
            $.hint.tip("请确认付费人", "error");
            return;
        }

        var so_payPhone = $("select[name=so_payPhone]").val();
        if (isEmpty(so_payPhone)) {
            $.hint.tip("请确认付费人电话", "error");
            return;
        }

        var hi_code = "";
        if ($("[name=bangHouse]").hasClass("common-checkbox-checked")) {
            hi_code = returnValue($("input[name=so_targetAddress]").data("data").hi_code);
        } else {
            hi_code = $("input[type=hidden][name=hi_code]").val();
        }

        $.ajax({
            type: "POST",
            url: "/service/submitServiceAccept",
            data: {
                so_id: serviceOrderInfo.so_id,
                hi_code: hi_code,
                so_targetAddress: returnValue(so_targetAddress),
                so_payObject: returnNumber(so_payObject),
                so_payName: returnValue(so_payName),
                so_payPhone: returnValue(so_payPhone),
                so_state: so_state,
                so_remarks: so_remarks,
            },
            dataType: "json",
            beforeSend: function () {
                $.hint.tip("数据提交中...", "loading");
            },
            success: function (result) {
                if (result.code != 200) return $.hint.tip("服务订单受理失败，请联系管理员", "error");
                $.hint.tip("服务订单受理成功", "success");
                // 异步刷新服务进度
                $.popupRefresh();
            }
        });
    });
}

/**
 * 服务派单
 *
 * @param box
 * @param serviceOrderInfo
 */
function initState_2100(box, serviceOrderInfo) {

    var step_head_option = box.parent().find(".step-head-option");

    var person_type = {1: "客服人员", 2: "房屋管家", 3: "外协人员"};
    // var service_type = {0: "服务类型", 1: "维修", 2: "保洁",};
    var t1 = 'style="width: 40%; max-width: 50%;"';
    var t2 = 'style="width: 20%; max-width: 15%;"';
    var t3 = 'style="width: 20%; max-width: 15%;"';
    var t4 = 'style="width: 20%; max-width: 20%;"';

    // --加载视图------------------------------------------

    // 加载内容
    var html = '';
    html += '<div class="pd-head">';
    html += '   <label class="common-select" style="border:none;border-right: 1px solid #ddd;width: 100px;"><select name="pd-person-type"></select></label>';
    // html += '   <label class="common-select" style="border:none;border-right: 1px solid #ddd;width: 100px;"><select name="pd-service-type"></select></label>';
    html += '   <label class="common-search" style="border:none;"><i class="fa-search"></i><input type="search" placeholder="搜索"></label>';
    html += '   <label class="" style="display:none; padding-left: 15px;" id="addWxPerson"><button class="error-bg-bd-w" style="padding: 5px 10px; border-radius: 5px; cursor: pointer;"><i class="fa-plus-circle"></i>添加外协</button></label>';
    html += '</div>';
    html += '<div class="pd-main">';
    html += '   <div class="pd-main-list custom-scroll custom-scroll-w2"></div>';
    html += '   <div class="pd-main-info custom-scroll custom-scroll-w2">';
    html += '       <div class="pd-info-head" style="display:flex;padding-right: 0px;">';
    html += '           <table style="border-collapse: collapse;"><thead><tr><td ' + t1 + '>小区房号</td><td ' + t2 + '>订单类型</td><td ' + t3 + '>完成情况</td><td ' + t4 + '>预计结束</td></tr></thead><tbody style="font-weight: 400;"></tbody></table>';
    html += '       </div>';
    html += '   </div>';
    html += '</div>';
    html += '<div class="pd-addWxPerson" style="display: none; position: relative; top: 15px;">';
    html += '   <dl class="content-dl">';
    html += '       <dt>人员类型</dt>';
    html += '       <dd><select type="text" class="from-data" name="sp_type"></select></dd>';
    html += '   </dl>';
    html += '   <dl class="content-dl">';
    html += '       <dt>人员姓名</dt>';
    html += '       <dd><input type="text" class="from-data" name="sp_name" placeholder="外协人员姓名"></dd>';
    html += '   </dl>';
    html += '   <dl class="content-dl">';
    html += '       <dt>联系电话</dt>';
    html += '       <dd><input type="text" class="from-data" name="sp_phone" placeholder="外协人员电话"></dd>';
    html += '   </dl>';
    html += '   <dl class="content-dl">';
    html += '       <dt>人员性别</dt>';
    html += '       <dd><label class="typeRadio"><input type="radio" name="sp_sex" value="1">男</label><label class="typeRadio"><input type="radio" name="sp_sex" value="2">女</label><label class="typeRadio"><input type="radio" name="sp_sex" value="3">未知</label></dd>';
    html += '   </dl>'
    html += '   <dl class="content-dl">';
    html += '   <dt></dt>';
    html += '   <dd><button type="button" class="blue-btn" name="submit">提交</button><button type="button" class="cancel-bg-bd-w" name="cancel" style="margin-left: 15px;">取消</button></dd>';
    html += '   </dl>';
    html += '</div>';
    html += '<div class="pd-next" style="display: none;flex: 1;"></div>';
    box.html(html);

    // --加载常量数据------------------------------------------

    $.each(person_type, function (key, value) {
        box.find("[name=pd-person-type]").append('<option value="' + key + '">' + value + '</option>');
    });

    // --加载变量数据------------------------------------------

    $.ajax({
        type: "POST",
        url: "/service/queryServiceUccPeople",
        data: {
            p_type: 1,
        },
        dataType: "json",
    }).done(function (result) {
        var employeeList = result.employeeList || "";

        $.each(employeeList, function (index, data) {
            var html = '';
            html += '<label class="pd-list-item no-select">';
            html += '    <input type="radio" name="pd_item">';
            html += '    <div class="pd-item-2" style="flex:1">';
            html += '    <input type="hidden" name="service_id" value="' + returnNumber(data.em_id) + '">';
            html += '        <div class="pd-item-21"><strong>' + returnValue(data.em_name) + '</strong> - ' + returnValue(data.em_post) + '</div>';
            html += '        <div class="pd-item-22">' + returnValue(data.em_phone) + '</div>';
            html += '    </div>';
            html += '    <div class="pd-item-3">';
            html += '        <div class="pd-item-31 ' + (returnNumber(data.taskCount) > 0 ? 'error' : 'free') + '">' + (returnNumber(data.taskCount) > 0 ? '忙' : '闲') + '</div>';
            html += '        <div class="pd-item-32" style="text-align: center">' + returnNumber(data.taskCount) + '</div>';
            html += '    </div>';
            html += '</label>';
            $(html).appendTo(box.find(".pd-main-list")).find("[name=pd_item]").data("data", data);
        });
    });

    // --加载事件------------------------------------------

    var step_prev = box.parent().find("[name=step-pd-prev]");
    var step_next = box.parent().find("[name=step-pd-next]");
    var step_done = box.parent().find("[name=step-pd-done]");
    var pd_head = box.find(".pd-head");
    var pd_main = box.find(".pd-main");
    var pd_next = box.find(".pd-next");

    // 加载添加外协界面
    $(box).on("click", "#addWxPerson button", function () {
        $(box).find(".pd-main").hide();
        $(box).find(".pd-addWxPerson").show();
        $.ajax({
            type: "POST",
            url: "/service/queryOutsourceFromDict",
            data: {},
            dataType: "json",
        }).done(function (result) {
            if (!isEmpty(result.outsourceList)) {
                var optionHtml = "";
                $(result.outsourceList).each(function (index, item) {
                    optionHtml += "<option value='" + returnNumber(item.dictionary_value) + "'>" + returnValue(item.dictionary_name) + "</option>";
                });
                $(".pd-addWxPerson").find("select[name=sp_type]").html(optionHtml);
            } else {
                $.hint.tip("外协人员加载异常，请联系管理员");
                return;
            }
        });
    });

    // 添加外协-提交
    $(box).on("click", ".pd-addWxPerson [name=submit]", function () {

        var sp_name = returnValue($(box).find("[name=sp_name]").val());
        if (isEmpty(sp_name)) {
            $.hint.tip("请输入外协人员姓名", "error");
            return;
        }

        var sp_phone = returnValue($(box).find("[name=sp_phone]").val());
        if (isEmpty(sp_phone)) {
            $.hint.tip("请输入外协人员电话", "error");
            return;
        }
        if (!isPhone(sp_phone)) {
            $.hint.tip("请输入外协人员正确电话号码", "error");
            return;
        }

        var sp_sex = $(box).find("[name=sp_sex]:checked").val();
        if (isEmpty(sp_sex)) {
            $.hint.tip("请选择外协人员性别", "error");
            return;
        }

        $.ajax({
            type: "POST",
            url: "/service/saveOutsource",
            data: {
                sp_type: returnNumber($(box).find("[name=sp_type]").val()),
                sp_name: returnValue(sp_name),
                sp_phone: returnValue(sp_phone),
                sp_sex: returnNumber(sp_sex)
            },
            dataType: "json",
        }).done(function (result) {
            if (result.code != 200) {
                $.hint.tip("外协信息保存失败，请联系管理员", "error");
                return;
            }
            $.hint.tip("外协信息保存成功", "success");
            $.popupRefresh();
        });
    });

    // 添加外协-取消
    $(box).on("click", ".pd-addWxPerson [name=cancel]", function () {
        $(box).find(".pd-addWxPerson input").val("");
        $(box).find(".pd-main").show();
        $(box).find(".pd-addWxPerson").hide();
    });

    // [事件]选择派单人员
    $(box).on("change", "[name=pd_item]", function () {
        $(".pd-item-checked").removeClass("pd-item-checked");
        $(this).parent().addClass("pd-item-checked");
        var data = $(this).data("data");

        box.find(".pd-main-info").find(".pd-info-item").empty();

        var person_type = returnNumber($(box).find("select[name=pd-person-type]").val());

        $.ajax({
            type: "POST",
            url: "/service/queryServiceOrderByEmId",
            data: {
                person_type: person_type,
                em_id: data.em_id,
                service_id: data.sp_id
            },
            dataType: "json",
        }).done(function (result) {
            var label = "<div class='sub-title' style='width: 180px;height: 5px;'><ul class='title-nav' style='width: 180px;height: 5px;'><li class='visited' style='padding: 0;'>最新待完成订单</li></ul></div>";
            if (result.code == 200) {
                var tbody = "";
                $.each(result.data, function (index, item) {
                    tbody += '<tr>';
                    tbody += '   <td ' + t1 + '>' + (isEmpty(item.so_targetAddress) ? item.house_address : item.so_targetAddress) + '</td>';
                    tbody += '   <td ' + t2 + '>' + item.sm_name + '</td>';
                    tbody += '   <td ' + t3 + '>' + returnValue(item.ss_title) + '</td>';
                    tbody += '   <td ' + t4 + '>' + (isEmpty(item.spro_startTime) ? "未定" : returnTime(item.spro_startTime + item.spro_expectEndDuration * 60 * 60 * 1000)) + '</td>';
                    tbody += '</tr>';
                });
                box.find(".pd-main-info tbody").html(tbody);
            }
        });

        step_head_option.find("[name=step-pd-next]").removeAttr("disabled");
    });

    // [事件]搜索
    $(box).find("[type=search]").off().on("input propertychange", function () {
        searchServicePerson(box, serviceOrderInfo.so_department);
    });

    // [事件]人员类型变更
    $(box).find("[name=pd-person-type]").off().on("change", function () {
        searchServicePerson(box, serviceOrderInfo.so_department);
        $(box).find(".pd-main-info .pd-info-item").remove();
        if (returnNumber($(this).val()) == 3) {
            $("#addWxPerson").show();
        } else {
            $("#addWxPerson").hide();
        }
    });

    // [事件]上一步
    $(box.parent()).on("click", "[name=step-pd-prev]", function () {
        pd_next.css({minWidth: box.width()});
        pd_head.show();
        pd_main.show();
        pd_next.hide();
        step_prev.hide();
        step_next.show();
        step_done.hide();
    });

    // [事件]下一步
    $(box.parent()).on("click", "[name=step-pd-next]", function () {
        var checkedItemData = box.find("[name=pd_item]:checked").data("data");
        if (checkedItemData == null) {
            $.hint.tip("请选择服务人员");
            return;
        }
        if (serviceOrderInfo.currentPersonName != null && serviceOrderInfo.currentPersonPhone != null) {
            if ((serviceOrderInfo.currentPersonName == checkedItemData.em_name && serviceOrderInfo.currentPersonPhone == checkedItemData.em_phone)
                || (serviceOrderInfo.currentPersonName == checkedItemData.sp_name && serviceOrderInfo.currentPersonPhone == checkedItemData.sp_phone)) {
                $.hint.tip("改派人员不能是当前服务人员");
                return;
            }
        }

        pd_next.css({minWidth: box.width()});
        pd_head.hide();
        pd_main.hide();
        pd_next.show();
        step_prev.show();
        step_next.hide();
        step_done.show();

        // ---------------------------------------

        var html = "";
        html += '<dl class="input-layout-dl">';
        html += '   <label class="common-checkbox2" id="enterLabel">已明确费用</label>';
        html += '</dl>';
        html += '<div id="enterDl" style="display: none;">';
        html += '   <dl class="input-layout-dl">';
        html += '       <dt>费用总计：</dt>';
        html += '       <dd><input name="mdg_money" placeholder="本次费用总计" style="width: 120px;margin-right: 6px;" required/>元</dd>';
        html += '   </dl>';
        html += '   <dl class="input-layout-dl">';
        html += '       <dt>费用清单：</dt>';
        html += '       <dd>';
        html += '           <table class="billList">';
        html += '               <thead>';
        html += '                   <tr><td>付费对象</td><td>付费人</td><td>费用名目</td><td>应付费用</td><td>&nbsp;</td></tr>';
        html += '               </thead>';
        html += '               <tbody id="cost-bill-body"></tbody>';
        html += '           </table>';
        html += '       </dd>';
        html += '   </dl>';
        html += "   <dl class='input-layout-dl'>";
        html += "      <dt>费用合计：</dt>";
        html += "      <dd>";
        html += "          <span class='error'>￥<label id='total_money' style='margin: 0 2px;'>0</label>元</span>";
        html += "      </dd>";
        html += "   </dl>";
        html += '</div>';
        pd_next.html(html);

        // 【事件】已明确费用
        pd_next.find("#enterLabel").on("click", function () {
            if ($(this).hasClass("common-checkbox-checked2")) {
                $(this).removeClass("common-checkbox-checked2");
                $("#enterDl").hide();
            } else {
                $(this).addClass("common-checkbox-checked2");
                $("#enterDl").show();
                // 清理数据
                pd_next.find("[name=mdg_money]").val('').focus();
                pd_next.find("#cost-bill-body").empty();
                // 加载元素
                addMoneyList(serviceOrderInfo);
                // 加载数据
                pd_next.find("[name=payTitle]").val(serviceOrderInfo.sm_name + '费用');
            }
        });
    });

    // [事件]完成
    $(box.parent()).on("click", "[name=step-pd-done]", function () {
        var mode = $(this).attr("data-mode");
        var title = mode == "change" ? "是否确定改派订单？" : "是否确定提交派单？";
        $.hint.confirm(title, function () {
            // 派工人员
            var pd_item = box.find("[name=pd_item]:checked");
            var pd_item_data = pd_item.data("data");
            if (pd_item.length != 1) return $.hint.tip("请选择派工人员", "error");

            // 下一步
            var moneyListt = "";
            var mdg_money = 0;
            if ($("#enterLabel").hasClass("common-checkbox-checked2")) {
                // 总费用
                mdg_money = box.find("[name=mdg_money]").val();
                if (isEmpty(mdg_money)) return $.hint.tip("请输入总费用", "error");

                // 费用列表
                var total_money = 0;
                $("#cost-bill-body").find(".mode-added").each(function () {
                    total_money += returnFloat($(this).find("[name=payPrice]").val());

                    moneyListt += $(this).find("[name=payObject]").val() + "-";
                    moneyListt += $(this).find("[name=payPerson]").attr("data-id") + "-";
                    moneyListt += $(this).find("[name=payTitle]").val() + "-";
                    moneyListt += $(this).find("[name=payPrice]").val() + "-";
                    moneyListt += "0;";
                });

            }

            var person_type = $("[name=pd-person-type]").val();
            var service_id = -1;
            var service_name = "";
            var service_phone = "";
            if ("1" == person_type || "2" == person_type) {
                service_id = pd_item_data.em_id;
                service_name = pd_item_data.em_name;
                service_phone = pd_item_data.em_phone;
            } else if ("3" == person_type) {
                service_id = pd_item_data.sp_id;
                service_name = pd_item_data.sp_name;
                service_phone = pd_item_data.sp_phone;
            }

            // 请求数据
            $.ajax({
                type: "POST",
                url: "/service/submitServiceProcess",
                data: {
                    so_id: serviceOrderInfo.so_id,
                    mode: mode,
                    person_type: person_type,
                    service_id: service_id,
                    service_name: service_name,
                    service_phone: service_phone,
                    so_totalMoney: $("[name=mdg_money]").val(),
                    moneyListt: moneyListt
                },
                dataType: "json",
            }).done(function (result) {
                if (result.code != 200) return $.hint.tip(result.msg, "error");
                $.hint.tip("派单成功", "success");
                $.popupRefresh();
            });

        });
    });
}

/**
 * 服务接单
 *
 * @param box
 * @param serviceOrderInfo
 */
function initState_2200(box, serviceOrderInfo) {
    var html = "";
    html += "<dl class='input-layout-dl'>";
    html += "   <dt>处理结果：</dt>";
    html += "   <dd style='padding-top: 5px;'>";
    html += "       <label name='isReceive' class='common-checkbox2 common-checkbox-checked2' onclick='enterCase(this);' style='padding-right: 20px;' data-value='1'>确认接单</label>";
    html += "       <label name='isReceive' class='common-checkbox2' onclick='enterCase(this);' style='' data-value='3'>拒绝接单</label>";
    html += "   </dd>";
    html += "</dl>";
    // html += "<dl class='input-layout-dl'>";
    // html += "   <dt>联系客户时间：</dt>";
    // html += "   <dd>";
    // html += "       <input class='dateTime' type='text' id='openTime' value='' placeholder='点击选择联系客户时间' onfocus='WdatePicker({dateFmt:\"yyyy-MM-dd HH:mm:ss\"})'/>";
    // html += "   </dd>";
    // html += "</dl>";
    // html += "<dl class='input-layout-dl'>";
    // html += "   <dt>预计结束时间：</dt>";
    // html += "   <dd>";
    // html += "       <input class='dateTime' type='text' id='endTime' value='' placeholder='点击选择预计结束时间' onfocus='WdatePicker({dateFmt:\"yyyy-MM-dd HH:mm:ss\"})'/>";
    // html += "   </dd>";
    // html += "</dl>";
    html += "   <dl class='content_dl' id='so_refuse_box' style='display: none'>";
    html += "       <dt>拒绝原因：</dt>";
    html += "       <dd style='display: flex;flex-direction: column;width: 240px;'>";
    html += "           <label class='common-borderbox'><input type='radio' name='refusedArea' value='客户放弃'>客户放弃</label>";
    html += "           <label class='common-borderbox'><input type='radio' name='refusedArea' value='派单错误'>派单错误</label>";
    html += "           <label class='common-borderbox'><input type='radio' name='refusedArea' value='工作饱和'>工作饱和</label>";
    html += "           <label class='common-borderbox'><input type='radio' name='refusedArea' value='人不在岗'>人不在岗</label>";
    html += "           <label class='common-borderbox'><input type='radio' name='refusedArea' value='other'>其他原因</label>";
    html += "           <input name='so_refuse_other' placeholder='其他原因' style='display: none'>";
    html += "       </dd>"
    html += "   </dl>";
    html += "<dl class='input-layout-dl' id='yjtime'>";
    html += "   <dt>预计时长：</dt>";
    html += "   <dd>";
    html += "       <input class='text' id='spro_expectEndDuration' maxlength='5' placeholder='小时' style='width: 120px;'/><span style='margin-left: 6px'>小时</span>";
    html += "   </dd>";
    html += "</dl>";
    html += "<dl class='content_dl'>";
    html += "   <dt></dt>";
    html += "   <dd>";
    html += "       <button class='next-bg' onclick='submitReseive(" + serviceOrderInfo.so_id + ")'>提交</button>";
    html += "   </dd>";
    html += "</dl>";

    box.html(html);

    // 拒绝原因
    $(box).on("change", "[name=refusedArea]", function () {
        if ($(this).val() == "other") {
            $(this).parent().hide();
            $("[name=so_refuse_other]").show().focus();
        } else {
            $("[name=so_refuse_other]").hide().val("");
            $("[name=so_refuse][value=other]").parent().show();
        }
    });
}

/**
 * 服务处理中与处理完成
 *
 * @param box
 * @param serviceOrderInfo
 */
function initState_3200(box, serviceOrderInfo, serviceMoneyList) {
    var state = returnNumber(serviceOrderInfo.so_state);
    box.addClass("custom-scroll custom-scroll-w4").css({display: "block"});
    var html = "";
    html += "<dl class='input-layout-dl'>";
    html += "   <dt>服务状态：</dt>";
    html += "   <dd style='display: flex;'>";
    html += "       <button class='next-bg-bd-w " + (state == 3100 ? 'state-check' : '') + "' style='margin: 0 0px;' name='serviceStateBtn' data-value='1'>处理中</button>";
    html += "       <button class='next-bg-bd-w " + (state == 3200 ? 'state-check' : '') + "' style='margin: 0 10px;' name='serviceStateBtn' data-value='2'>处理完</button>";
    html += "   </dd>";
    html += "</dl>";
    html += "<div id='problemDiv' style='" + (state == 3200 ? "display:none;" : "") + "'>";
    html += "   <dl class='input-layout-dl'>";
    html += "       <dt>现场反馈：</dt>";
    html += "       <dd><textarea id='spp_content'></textarea></dd>";
    html += "   </dl>";
    html += "   <dl class='input-layout-dl'>";
    html += "      <dt></dt>";
    html += "      <dd>";
    html += "          <button class='next-bg' name='submitProblem'>提交</button>";
    html += "      </dd>";
    html += "   </dl>";
    html += "</div>";
    html += "<div id='serviceDiv' style='" + (state == 3100 ? "display:none;" : "") + "'>";
    html += "   <dl class='input-layout-dl'>";
    html += "      <dt>费用总计：</dt>";
    html += "      <dd><input name='so_totalMoney' value='" + returnFloat(serviceOrderInfo.so_totalMoney) + "' placeholder='本次费用总计' style='width: 120px;margin-right: 10px;'/>元</dd>";
    html += "   </dl>"
    html += "   <dl class='input-layout-dl'>";
    html += "      <dt>费用清单：</dt>";
    html += "      <dd>";
    html += "          <table class='billList'>";
    html += "              <thead>";
    html += "                  <tr><td>付费对象</td><td>付费人</td><td>费用名称</td><td>费用金额</td><td>&nbsp;</td></tr>";
    html += "              </thead>";
    html += "              <tbody id='cost-bill-body'></tbody>";
    html += "          </table>";
    html += "      </dd>";
    html += "   </dl>";
    html += "   <dl class='input-layout-dl'>";
    html += "      <dt>费用合计：</dt>";
    html += "      <dd>";
    html += "          <span class='error'>￥&nbsp;<em id='total_money'>0</em>&nbsp;元</span>";
    html += "      </dd>";
    html += "   </dl>";
    html += "   <dl class='input-layout-dl'>";
    html += "      <dt>费用票据：</dt>";
    html += "      <dd>";
    html += "          <div id='images'></div>";
    html += "      </dd>";
    html += "   </dl>";
    html += "   <dl class='input-layout-dl' id='inputContent' style='display:none'>";
    html += "      <dt>问题描述：</dt>";
    html += "      <dd>";
    html += "          <textarea name='mtk_spe_cir' ></textarea>";
    html += "      </dd>";
    html += "   </dl>";
    html += "   <dl class='input-layout-dl'>";
    html += "      <dt></dt>";
    html += "      <dd>";
    html += "          <button class='next-bg' name='submit'>提交</button>";
    html += "      </dd>";
    html += "   </dl>";
    html += "</div>";
    box.html(html);

    // ------------------------------------

    $.each(serviceMoneyList, function (index, item) {
        switch (item.payObject) {
            case 4:
            case 5:
                item.payId = isEmpty(item.cc_code) ? item.user_id : item.cc_code;
                item.payName = isEmpty(item.cc_code) ? item.userName : item.cc_name;
                break;
            case 6:
                item.payId = item.userId;
                item.payName = item.userName;
                break;
            case 2:
                item.payId = item.em_id;
                item.payName = item.em_name;
                break;
            case 3:
                item.payId = item.ucc_id;
                item.payName = item.ucc_name;
                break;
        }
        addMoneyList(serviceOrderInfo, item);
    });

    // 初始化[添加]
    addMoneyList(serviceOrderInfo);

    // 初始化图片插件
    $("#images").imageUpload({
        width: 110,
        height: 110,
        uploadUrl: "/contractObject/uploadFile",
        uploadType: 'maintenance',
        success: function (result) {
            result.css({"border": "none", "padding": "0px"});
        },
        builds: {
            onUpload: function (img) {
                // 保存图片到数据库
                addServicePicture(img.attr("data-url"), "charge");
            },
            onDelete: function (path) {
                // 删除图片
                deleteServicePicture(path);
            }
        }
    });

    // 【事件】 加载界面显示/隐藏
    box.find("button[name=serviceStateBtn]").on("click", function () {
        if ($(this).hasClass("state-check")) {
            $(this).removeClass("state-check");
        } else {
            $(this).addClass("state-check").siblings().removeClass("state-check");
        }
        if ($(this).attr("data-value") == "1") {
            $("#problemDiv").show();
            $("#serviceDiv").hide();
        } else if ($(this).attr("data-value") == "2") {
            $("#serviceDiv").show();
            $("#problemDiv").hide();
        }
    });

    // 【事件】提交现场问题
    box.find("[name=submitProblem]").off().on("click", function () {
        if (isEmpty($("#spp_content").val())) {
            return $("#spp_content").msg("请输入现场问题");
        }
        $.ajax({
            type: "POST",
            url: "/service/addServiceProblem",
            data: {
                so_id: serviceOrderInfo.so_id,
                spp_content: $("#spp_content").val()
            },
            dataType: "json"
        }).done(function (result) {
            if (result.code == 200) {
                $.hint.tip("现场反馈提交成功", "success");
                // 异步刷新服务进度
                $.popupRefresh();
            } else {
                $.hint.tip(result.msg, "error");
            }
        });
    });

    // 【事件】提交订单处理
    box.find("[name=submit]").on("click", function () {
        var so_totalMoney = returnFloat($("[name=so_totalMoney]").val());
        var totalMoney = returnFloat($("#total_money").text());
        if (so_totalMoney < 0) {
            $("[name=so_totalMoney]").msg("请录入总费用");
            return;
        }
        if (so_totalMoney != totalMoney) {
            $("#total_money").parent().msg("费用总计须与费用合计相同");
            return;
        }

        var moneyList = [];
        $("#cost-bill-body").find(".mode-added").each(function () {
            var money = {};
            money.ssm_id = $(this).find("[name=ssm_id]").val();
            money.payObject = $(this).find("[name=payObject]").val();
            money.payPerson = $(this).find("[name=payPerson]").attr("data-id");
            money.payTitle = $(this).find("[name=payTitle]").val();
            money.payPrice = $(this).find("[name=payPrice]").val();
            money.isNew = $(this).find("[name=isNew]").val();
            moneyList.push(money);
        });

        if (moneyList.length == 0) {
            $.hint.tip("请录入费用", "error");
            return;
        }

        $.hint.confirm("确认提交订单处理吗？", function () {
            $.ajax({
                type: "POST",
                url: "/service/saveServiceMoney",
                data: {
                    so_id: serviceOrderInfo.so_id,
                    moneys: JSON.stringify(moneyList),
                    mdgMoney: so_totalMoney
                },
                dataType: "json"
            }).done(function (result) {
                if (result.code != 200) return $.hint.tip(result.msg, "error");
                $.hint.tip("费用提交成功", "success");
                $.popupRefresh();
            });
        });
    });
}

/**
 * 服务处理中
 *
 * @param serviceOrderInfo
 */
function initState_3100(box, serviceOrderInfo) {
    var html = '';
    html += '<div>';
    html += '   <dl class="input-layout-dl">';
    html += '       <dt>现场问题：</dt>';
    html += '       <dd><textarea id="spp_content"></textarea></dd>';
    html += '   </dl>';
    html += '</div>';
    html += "<dl class='input-layout-dl'>";
    html += '   <dt></dt>';
    html += "   <dd>";
    html += "       <button class='next-bg' name='submitProblem'>提交</button>";
    html += "   </dd>";
    html += "</dl>";
    box.html(html);

    // 【事件】提交现场问题
    box.find("[name=submitProblem]").off().on("click", function () {
        if (isEmpty($("#spp_content").val())) {
            return $("#spp_content").msg("请输入现场问题");
        }
        $.ajax({
            type: "POST",
            url: "/service/addServiceProblem",
            data: {
                so_id: serviceOrderInfo.so_id,
                spp_content: $("#spp_content").val()
            },
            dataType: "json"
        }).done(function (result) {
            if (result.code == 200) {
                $.hint.tip("现场问题提交成功", "success");
                // 异步刷新服务进度
                $.popupRefresh();
            } else {
                $.hint.tip(result.msg, "error");
            }
        });
    });
}

/**
 * 费用结算
 *
 * @param serviceOrderInfo
 */
function initState_3300(box, serviceOrderInfo, serviceMoneyList, serviceImageVoList) {
    box.addClass("custom-scroll custom-scroll-w4").css({display: "block"});

    var labelHtml = '<label class="error" style="textAlign : right;">注：提交后将不能添加清单明细</label>';
    var submit = $(labelHtml + '<button class="next-bg" name="submit">确认提交</button>');

    // 元素------------------------
    var _img_data = "";
    $(serviceImageVoList).each(function (index, imgdata) {
        if (imgdata.si_type == "charge") {
            _img_data += imgdata.si_url_path + "#";
        }

    });
    var imgHtml = '<span><label class="' + (isEmpty(_img_data) ? "show-label-disabled" : "show-label-error") + ' sfz-show-label item-label fa-image next-bg" style="cursor: pointer;" title="' + (isEmpty(_img_data) ? "无费用图片" : "点击查看费用图片") + '" data-value="' + _img_data + '" data-hint="没有费用图片"></label></span>';
    submit.appendTo(box.parent().find(".step-head-option"));
    box.parent().find(".step-head-subtitle").html(imgHtml);

    var html = '';
    html +=
        '<div class="js-box">' +
        '   <div class="js-box-list">' +
        '       <div class="js-box-list-head">①&nbsp;费用清单</div>' +
        '       <div class="js-box-list-main"></div>' +
        '   </div>' +
        '   <div class="js-box-info">' +
        '       <div class="js-box-info-head">②&nbsp;材料清单</div>' +
        '       <div class="js-box-info-main" style="flex: 1">' +
        '           <table class="billList"><thead><tr><td>材料名称</td><td>单价</td><td>数量</td><td>小计</td><td style="width: 36px;">&nbsp;</td></tr></thead><tbody id="cost-info-body"></tbody></table>' +
        '           <div id="js-total-box" style="line-height: 30px;padding: 0 10px;"></div>' +
        '       </div>' +
        '   </div>' +
        '</div>';
    box.html(html);

    // 数据------------------------

    $.each(serviceMoneyList, function (index, item) {
        switch (item.payObject) {
            case 2:
                item.person_id = item.em_id;
                item.person_nickName = "管家";
                item.person_name = item.em_name;
                break;
            case 3:
                item.person_id = item.ucc_id;
                item.person_nickName = "门店";
                item.person_name = item.ucc_name;
                break;
            case 4:
                item.person_id = item.cc_code;
                item.person_nickName = "租客";
                item.person_name = item.cc_name;
                break;
            case 5:
                item.person_id = item.cc_code;
                item.person_nickName = "房东";
                item.person_name = item.cc_name;
                break;
            case 6:
                item.person_id = item.user_id;
                item.person_nickName = "用户";
                item.person_name = item.userName;
                break;
        }
        var html =
            '<label class="js-list-item ' + (index == 0 ? "js-list-item-checked" : "") + '">' +
            '    <input type="radio" name="js_item" ' + (index == 0 ? "checked" : "") + '>' +
            '    <div style="flex: 1;"><div>' + returnValue(item.ssm_source) + '</div><div>[' + item.person_nickName + ']' + item.person_name + '</div></div>' +
            '    <div class="error" style="line-height: 36px;font-size: 13px;">' + returnMoney(item.ssm_money) + '元</div>' +
            '</label>';
        $(html).appendTo(box.find(".js-box-list-main")).find("[name=js_item]").data("data", item);
    });

    // 方法------------------------

    // 【内部方法】选中项目
    var checked_item = function () {
        var checked_item = box.find("[name=js_item]:checked");

        $.ajax({
            type: "POST",
            url: "/service/queryMoneyDetial",
            data: {
                ssm_id: checked_item.data("data").ssm_id
            },
            dataType: "json",
        }).done(function (result) {
            var moneyDetailList = result.data.moneyDetailList || "";
            $.each(moneyDetailList, function (index, data) {
                addMoneyListItem(serviceOrderInfo, data);
            });
            addMoneyListItem(serviceOrderInfo);
        });
    };

    // 事件------------------------

    // 点击查看图标
    box.parent().find(".show-label-error").off().on("click", function (e) {
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
                $.each(_data.split("#"), function (index, data) {
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
            $(".custom-popup").append(html);
            $(".more-img-box").css({
                top: $(this).offset().top - 118,
                left: 220,
            });
            $(this).attr("data-show", "show");
        } else {
            $(this).removeAttr("data-show");
        }
    });

    // 【事件】选中费用清单
    box.find("[name=js_item]").off().on("change", function () {
        $(".js-list-item-checked").removeClass("js-list-item-checked");
        $(this).parent().addClass("js-list-item-checked");
        $("#cost-info-body").empty();
        checked_item();
    });

    // 【事件】提交费用明细
    submit.off().on("click", function () {
        $.hint.confirm("确定提交费用明细吗？提交后将无法录入！", function () {
            $.ajax({
                type: "POST",
                url: "/service/submitMoneyDetial",
                data: {
                    so_id: serviceOrderInfo.so_id,
                },
                dataType: "json"
            }).done(function (result) {
                if (result.code != 200) return $.hint.tip("费用明细提交失败，请联系管理员", "error");
                $.hint.tip("费用明细提交成功，请早日完成回访客户", "success");
                $.popupRefresh();
            });
        });
    });

    // 执行------------------------

    checked_item();
}

/**
 * 客服回访
 *
 * @param serviceOrderInfo
 */
function initState_3400(box, serviceOrderInfo) {
    var html = "";
    html += "<dl class='input-layout-dl'>";
    html += "   <dt>服务打分：</dt>";
    html += "   <dd style='position: relative; cursor:default;display: flex'>";
    html += "      <div id='simplestar' style='margin-top: 0;'>";
    html += "          <img id='image0' src='/resources/image/T1j.png'>";
    html += "          <img id='image1' src='/resources/image/T1j.png'>";
    html += "          <img id='image2' src='/resources/image/T1j.png'>";
    html += "          <img id='image3' src='/resources/image/T1j.png'>";
    html += "          <img id='image4' src='/resources/image/T1j.png'>";
    html += "      </div>";
    html += "      <div class='tooltip'>";
    html += "          <div class='tip-inner'><strong style='color: #F40;'>3分 一般</strong><span>质量一般，没有卖家描述的那么好</span></div>";
    html += "          <div class='tip-arrow'></div>";
    html += "          <div class='tip-arrow-inner'></div>";
    html += "      </div>";
    html += "      <div class='fraction'><em id='scores'></em> 分</div>";
    html += "   </dd>";
    html += "</dl>";
    html += "<dl class='input-layout-dl'>";
    html += "   <dt>评价信息：</dt>";
    html += "   <dd>";
    html += "       <textarea id='contentMessage'></textarea>";
    html += "   </dd>";
    html += "</dl>";
    html += "<dl class='content_dl'>";
    html += "   <dt></dt>";
    html += "   <dd>";
    html += "       <button class='next-bg' name='submit'>提交</button>";
    html += "   </dd>";
    html += "</dl>";
    box.html(html);

    // 初始化插件
    initSimplestar();

    // 【事件】提交数据
    box.find("[name=submit]").off().on("click", function () {
        //分数
        var fraction = $("#scores").text();
        if (isEmpty(fraction)) {
            return $("#simplestar").msg("请为本次服务评分！");
        }
        //图片路径
        var path = "";
        $.ajax({
            type: "POST",
            url: "/service/submitFach",
            data: {
                so_id: serviceOrderInfo.so_id,
                fraction: fraction,
                contentMessage: $("#contentMessage").val(),
            },
            dataType: "json",
            success: function (result) {
                if (result.code != 200) return $.hint.tip(result.msg, "error");

                $.hint.tip("评价成功", "sucess");
                // 异步刷新服务进度
                $.popupRefresh();
            }
        });
    });
}

// ============================================

/**
 * 添加费用清单
 *
 * @param obj
 */
function addMoneyList(serviceOrderInfo, data) {
    var box = $("#cost-bill-body");
    var data = data || "";
    var isAdd = isEmpty(data);
    var style = {property: isAdd ? "" : "disabled"};

    var html = '';
    html += '<tr>';
    html += '   <input type="hidden" name="isNew" value="' + (isAdd ? 0 : 1) + '">';
    html += '   <input type="hidden" name="ssm_id">';
    html += '   <td><select name="payObject" placeholder="付费对象" ' + style.property + ' style="border: none;" required><option value="4">租客</option><option value="5">房东</option><option value="2">管家</option><option value="3">门店</option><option value="6">用户</option></select></td>';
    html += '   <td>';
    html += '       <input name="payPerson" data-id="" placeholder="付费人" ' + style.property + ' required readonly>';
    html += '   </td>';
    html += '   <td><input name="payTitle" placeholder="名称" maxlength="40" ' + style.property + ' required></td>';
    html += '   <td><input name="payPrice" class="money" placeholder="金额" maxlength="11" ' + style.property + ' required></td>';
    html += '   <td>';
    html += '       <button class="ok" name="confrim_cost" style="display:' + (isAdd ? 'block' : 'none') + ';width: 36px;line-height: 36px;background: none;cursor: pointer;"><i class="fa-check"></i></button>';
    html += '       <button class="error" name="delete_cost" style="display:' + (isAdd ? 'none' : 'block') + ';width: 36px;line-height: 36px;background:#f5f5f5;cursor: pointer;"><i class="fa-remove"></i></button>';
    html += '   </td>';
    html += '</tr>';
    var subBox = $(html).appendTo(box);

    // ----------------------------------------
    subBox.find("[name=ssm_id]").val(data.ssm_id);

    if (!isAdd) {
        subBox.addClass("mode-added");
        subBox.find("[name=payObject]").val(isEmpty(data.payObject) ? serviceOrderInfo.so_payObject : data.payObject);
        subBox.find("[name=payPerson]").val(data.payName).attr("data-id", data.payId);
        subBox.find("[name=payTitle]").val(data.ssm_source);
        subBox.find("[name=payPrice]").val(data.ssm_money);
    }

    if (box.find("[name=payObject]").length > 1) {
        var selectObj = box.find("[name=payObject]").eq(box.find("[name=payObject]").length - 1);
        box.find("[name=payPerson]").each(function () {
            if (!isEmpty($(this).val())) {
                var payObj = $(this).parent().prev().find("[name=payObject]").val();
                if (payObj == "4") {
                    selectObj.find("option[value=4]").attr("disabled", "disabled");
                }
                if (payObj == "5") {
                    selectObj.find("option[value=5]").attr("disabled", "disabled");
                }
                if (payObj == "2") {
                    selectObj.find("option[value=2]").attr("disabled", "disabled");
                }
                if (payObj == "3") {
                    selectObj.find("option[value=3]").attr("disabled", "disabled");
                }
                if (payObj == "6") {
                    selectObj.find("option[value=6]").attr("disabled", "disabled");
                }
            }
        });
        if (box.find("[name=payObject]").length <= 5) {
            var option_h = selectObj.find("option:not(:disabled)").eq(0);
            option_h.attr("selected", "selected");
            selectObj.val(option_h.val());
        }
    }

    // ----------------------------------------

    // 【内部方法】计算费用
    var calc_cost = function () {
        var total = 0;
        box.find("[name=payPrice]").each(function () {
            total += returnFloat($(this).val());
        });
        $("#total_money").html(returnFloat(isNaN(total) ? 0 : total));
    };

    // ----------------------------------------

    calc_cost();

    // ----------------------------------------

    // [事件]确认费用
    subBox.find("[name=confrim_cost]").on("click", function () {
        var boo = true;
        subBox.find("[required]").each(function () {
            if (isEmpty($(this).val())) {
                $(this).msg("请输入" + $(this).attr("placeholder"));
                return boo = false;
            }
        });
        if (!boo) return;
        subBox.find("[required]").attr("disabled", "disabled");
        subBox.find("[name=confrim_cost]").hide();
        subBox.find("[name=delete_cost]").show();
        subBox.addClass("mode-added");
        // 添加费用清单
        addMoneyList(serviceOrderInfo);
        // 计算费用
        calc_cost();
    });

    // [事件]删除费用
    subBox.find("[name=delete_cost]").on("click", function () {
        $.hint.confirm("确定删除本条费用记录？", function () {
            var ssm_id = subBox.find("input[name=ssm_id]").val();
            if (!isEmpty(ssm_id)) {
                $.ajax({
                    type: "POST",
                    url: "/service/deleteServiceMoney",
                    data: {
                        ssm_id: ssm_id
                    },
                    dataType: "json",
                }).done(function (result) {
                    if (result.code != 200) {
                        $.hint.tip("记录删除异常，请联系管理员", "error");
                        return;
                    }
                });
            }
            subBox.siblings().find("select[name=payObject]").each(function () {
                $(this).find("option").each(function () {
                    if ($(this).val() == subBox.find("[name=payObject]").val()) {
                        $(this).removeAttr("disabled");
                    }
                })
            });
            subBox.remove();
            // 计算费用
            calc_cost();
        });
    });

    // [事件]计算费用
    subBox.find("[name=payPrice]").on({
        // "input propertychange": function () {
        //     calc_cost();
        // },
        "keyup": function (e) {
            if (e.keyCode != 13) return;
            subBox.find("[name=confrim_cost]").click();
        }
    });

    // [事件]选择付费对象
    subBox.find("[name=payObject]").on("change", function () {
        // 清空付费人
        subBox.find("[name=payPerson]").val("").attr("data-id");
        // 关闭选择付费人
        $("#queryList").remove();
    });

    // [事件]选择付费人
    subBox.find("[name=payPerson]").on("click", function () {
        $("#queryList").remove();
        var html =
            '<div id="queryList" style="display: block;">' +
            '   <div id="search-box1" style="display: flex;">' +
            '      <input name="query-text" style="margin-top: 0;margin-right: 0;width: 100%;border: none;background: #f5f5f5;padding: 0 10px" placeholder="输入付费人名字、电话">' +
            '      <button class="error-bg" id="queryListClose" style="cursor: pointer;line-height: 32px;height: 32px;width: 32px;"><i class="fa-close"></i></button>' +
            '   </div>' +
            '   <div id="search-show"><div class="search-tisp">没有数据</div>' +
            '</div>';
        var queryBox = $(html).appendTo($(this).parent());

        // ----------------------------------------

        queryBox.find("[name=query-text]").focus();

        // ----------------------------------------

        // 【内部方法】加载付费人数据
        var queryPayPersonList = function (param) {
            var show = queryBox.find("#search-show");
            var payType = returnNumber(subBox.find("[name=payObject]").val());

            $.ajax({
                type: "POST",
                url: "/service/queryPayInfo",
                data: {
                    type: payType,
                    param: param,
                    so_id: serviceOrderInfo.so_id,
                },
                dataType: "json",
            }).done(function (result) {
                var data = result.data || "";
                var list = data.list || "";
                show.html('<div class="search-tisp">没有数据</div>');

                if (result.code != 200 && result.code != 201) {
                    show.html('<div class="search-tisp">' + result.msg + '</div>');
                    return;
                }

                var content = '';
                if (result.code == 201) {
                    content =
                        '<tr class="search-item">' +
                        '    <td title="付费人"><input type="hidden" value="' + result.data.user_id + '">' + (result.data.user_realName || result.data.user_nickName) + '</td>' +
                        '    <td title="联系电话">' + result.data.user_phone + '</td>' +
                        '</tr>';
                }
                if (result.code == 200) {
                    switch (payType) {
                        case 4:
                            $.each(data, function (index, data) {
                                content += '<tr class="search-item"><td title="付费人"><input type="hidden" value="' + data.cc_code + '" data-name="' + data.cc_name + '">' + data.cc_name + "(" + (returnNumber(data.crc_role) == 0 ? "租客" : "室友") + ")" + '</td><td title="联系电话">' + data.ccp_phone + '</td></tr>';
                            });
                            break;
                        case 5:
                            $.each(data, function (index, data) {
                                content += '<tr class="search-item"><td title="付费人"><input type="hidden" value="' + data.cc_code + '" data-name="' + data.cc_name + '">' + data.cc_name + "(" + (returnNumber(data.crc_role) == 0 ? "房东" : "联系人") + ")" + '</td><td title="联系电话">' + data.ccp_phone + '</td></tr>';
                            });
                            break;
                        case 6:
                            $.each(data, function (index, data) {
                                content += '<tr class="search-item"><td title="付费人"><input type="hidden" value="' + data.user_id + '" data-name="' + returnValue(data.user_realName || data.user_nickName || data.user_phone) + '">' + returnValue(data.user_realName || data.user_nickName || data.user_phone) + "(用户)" + '</td><td title="联系电话">' + data.user_phone + '</td></tr>';
                            });
                            break;
                        case 2:
                            $.each(data, function (index, data) {
                                content += '<tr class="search-item" ' + (data.em_name.indexOf("-") > -1 ? 'style="color:#ff6666;"' : '') + '><td title="付费人"><input type="hidden" value="' + data.em_id + '" data-name="' + data.em_name + '">' + data.em_name + '</td><td title="联系电话">' + data.em_phone + '</td></tr>';
                            });
                            break;
                        case 3:
                            $.each(list, function (index, data) {
                                content += '<tr class="search-item" ' + (data.ucc_name.indexOf("-") > -1 ? 'style="color:#ff6666;"' : '') + '><td title="付费人"><input type="hidden" value="' + data.ucc_id + '" data-name="' + data.ucc_name + '">' + data.ucc_name + '</td><td title="联系电话">' + returnValue(data.ucc_phone) + '</td></tr>';
                            });
                            break;
                    }
                }
                show.html(
                    '<table>' +
                    '   <thead>' +
                    '       <th>付费人</th>' +
                    '       <th>联系电话</th>' +
                    '   </thead>' +
                    '   <tbody>' + content + '</tbody>' +
                    '</table>');

                // [事件]点击付费列表
                show.find(".search-item").off().on("click", function () {
                    var itemData = $(this).find("[type=hidden]");
                    subBox.find("[name=payPerson]").val(itemData.attr("data-name")).attr("data-id", itemData.val());
                    queryBox.remove();
                });
            });
        };

        // ----------------------------------------

        // 加载数据
        queryPayPersonList();

        // ----------------------------------------

        // [事件]搜索
        queryBox.find("[name=query-text]").off().on("input propertychange", function () {
            queryPayPersonList($(this).val());
        });

        // [事件]关闭
        queryBox.find("#queryListClose").off().on("click", function () {
            queryBox.remove();
        });
    });
}

/**
 * 添加费用清单明细
 *
 * @param obj
 */
function addMoneyListItem(serviceOrderInfo, data) {
    var box = $("#cost-info-body");
    var data = data || "";
    var isAdd = isEmpty(data);
    var property = isAdd ? "null" : "disabled";

    var html = '';
    html += '<tr style="border-bottom: 1px solid #ddd;">';
    html += '   <td><input name="itemName" placeholder="名称" required></td>';
    html += '   <td><input name="itemPrice" class="money" placeholder="单价" required></td>';
    html += '   <td><input name="itemCount" class="number" value="1" placeholder="数量" required></td>';
    html += '   <td><input name="itemMoney" value="0" placeholder="金额" disabled></td>';
    html += '   <td>';
    html += '      <button class="ok" name="confrim_cost" style="display:block;width: 36px;line-height: 36px;background: none;cursor: pointer;"><i class="fa-check"></i></button>';
    html += '      <button class="error" name="delete_cost" style="display:none;width: 36px;line-height: 36px;background: none;cursor: pointer;"><i class="fa-remove"></i></button>';
    html += '   </td>';
    html += '</tr>';
    var subBox = $(html).appendTo(box);

    // ----------------------------------------

    if (!isAdd) {
        subBox.addClass("item-added");
        subBox.data("data", data);
        subBox.find("[name=itemName]").val(returnValue(data.ssm_source)).focus().attr(property, property);
        subBox.find("[name=itemPrice]").val(returnFloat(data.ssm_univalent)).attr(property, property);
        subBox.find("[name=itemCount]").val(returnNumber(data.ssm_num)).attr(property, property);
        subBox.find("[name=itemMoney]").val(returnFloat(data.ssm_money));
        subBox.find("[name=confrim_cost]").hide();
        subBox.find("[name=delete_cost]").show();
    } else {
        subBox.find("[name=itemName]").focus();
    }

    // ----------------------------------------

    // 【内部方法】计算费用
    var calc_cost = function () {
        var ssm_money = returnFloat($("[name=js_item]:checked").data("data").ssm_money);
        var total = 0;
        box.find("[name=itemMoney]").each(function () {
            total += returnFloat($(this).val());
        });
        total = returnFloat(total);

        var html = '';
        html += '费用清单总计：<label class="error money-font16">' + ssm_money + '</label>&nbsp;元';
        html += '<br>清单明细合计：<label class="error money-font16">' + total + '</label>&nbsp;元';
        if (ssm_money < total) html += '<label>，超出金额：<label class="error money-font16">' + returnFloat(total - ssm_money) + '</label>&nbsp;元</label>';
        $("#js-total-box").html(html);
    };

    // ----------------------------------------

    calc_cost();

    // ----------------------------------------

    // 【事件】确认费用
    subBox.find("[name=confrim_cost]").on("click", function () {
        var boo = true;
        subBox.find("[required]").each(function () {
            if (isEmpty($(this).val())) {
                $(this).msg("请输入" + $(this).attr("placeholder"));
                return boo = false;
            }
        });
        if (!boo) return;

        var check_data = $("[name=js_item]:checked").data("data");

        var money = {};
        money.payObject = check_data.payObject;
        money.ssm_source = subBox.find("[name=itemName]").val();
        money.ssm_univalent = subBox.find("[name=itemPrice]").val();
        money.ssm_num = subBox.find("[name=itemCount]").val();
        money.ssm_money = subBox.find("[name=itemMoney]").val();

        $.ajax({
            type: "POST",
            url: "/service/saveServiceMoneyDetail",
            data: {
                so_id: check_data.so_id,
                ssm_id: check_data.ssm_id,
                payObject: check_data.payObject,
                person_id: check_data.person_id,
                money: JSON.stringify(money)
            },
            dataType: "json"
        }).done(function (result) {
            if (result.code != 200) return $.hint.tip(result.msg, "error");
            subBox.data("data", result.data.serviceMoneyDetail);
        });

        subBox.find("[required]").attr("disabled", "disabled");
        subBox.find("[name=confrim_cost]").hide();
        subBox.find("[name=delete_cost]").show();
        subBox.addClass("info-added");

        // 添加费用清单
        addMoneyListItem(serviceOrderInfo);
        // 计算费用
        calc_cost();
    });

    // 【事件】删除费用
    subBox.find("[name=delete_cost]").on("click", function () {
        $.hint.confirm("确定删除本条材料清单？", function () {
            $.ajax({
                type: "POST",
                url: "/service/deleteServiceMoneyDetail",
                data: {
                    ssd_id: subBox.data("data").ssd_id
                },
                dataType: "json"
            }).done(function (result) {
                if (result.code != 200) return $.hint.tip(result.msg, "error");
                // 删除元素
                subBox.remove();
                // 计算费用
                calc_cost();
            });
        });
    });

    // 【事件】回车事件
    subBox.find("[name=itemName], [name=itemPrice], [name=itemCount]").on({
        "keyup": function (e) {
            if (e.keyCode != 13) return;
            subBox.find("[name=confrim_cost]").click();
        }
    });

    // 【事件】计算费用
    subBox.find("[name=itemPrice], [name=itemCount]").on({
        "input ppropertychange": function () {
            var itemPrice = returnFloat(subBox.find("[name=itemPrice]").val());
            var itemCount = returnFloat(subBox.find("[name=itemCount]").val());
            subBox.find("[name=itemMoney]").val(returnFloat(itemPrice * itemCount));
        }
    });
}

/**
 * 搜索服务人员
 */
function searchServicePerson(box, ucc_id) {
    box.find(".pd-main-list").html("");
    var p_type = returnNumber($("select[name=pd-person-type]").val());
    $.ajax({
        type: "POST",
        url: "/service/queryServiceUccPeople",
        data: {
            p_type: p_type,
            ucc_id: ucc_id,
            whereList: $(".pd-head").find("input[type=search]").val()
        },
        dataType: "json",
    }).done(function (result) {

        if (p_type == 1 || p_type == 2) {

            var employeeList = result.employeeList || "";

            $.each(employeeList, function (index, data) {
                var html = '';
                html += '<label class="pd-list-item no-select">';
                html += '    <input type="radio" name="pd_item">';
                html += '    <input type="hidden" name="service_id" value="' + returnNumber(data.em_id) + '">';
                html += '    <div class="pd-item-2" style="flex:1">';
                html += '        <div class="pd-item-21"><strong>' + returnValue(data.em_name) + '</strong> - ' + returnValue(data.em_post) + '</div>';
                html += '        <div class="pd-item-22">' + returnValue(data.em_phone) + '</div>';
                html += '    </div>';
                html += '    <div class="pd-item-3">';
                html += '        <div class="pd-item-31 ' + (returnNumber(data.taskCount) > 0 ? 'error' : 'free') + '">' + (returnNumber(data.taskCount) > 0 ? '忙' : '闲') + '</div>';
                html += '        <div class="pd-item-32" style="text-align: center">' + returnNumber(data.taskCount) + '</div>';
                html += '    </div>';
                html += '</label>';
                $(html).appendTo(box.find(".pd-main-list")).find("[name=pd_item]").data("data", data);
            });
        } else if (p_type == 3) {

            var servicePersonVoList = result.servicePersonVoList || "";

            $.each(servicePersonVoList, function (index, data) {
                var html = '';
                html += '<label class="pd-list-item no-select">';
                html += '    <input type="radio" name="pd_item">';
                html += '    <input type="hidden" name="service_id" value="' + returnNumber(data.sp_id) + '">';
                html += '    <div class="pd-item-2" style="flex:1">';
                html += '        <div class="pd-item-21"><strong>' + returnValue(data.sp_name) + '</strong> - ' + returnValue(data.dictionary_name) + '</div>';
                html += '        <div class="pd-item-22">' + returnValue(data.sp_phone) + '</div>';
                html += '    </div>';
                html += '    <div class="pd-item-3">';
                // html += '        <div class="pd-item-31 ' + (returnNumber(data.taskCount) > 0 ? 'error' : 'free') + '">' + (returnNumber(data.taskCount) > 0 ? '忙' : '闲') + '</div>';
                // html += '        <div class="pd-item-32" style="text-align: center">' + returnNumber(data.taskCount) + '</div>';
                html += '    </div>';
                html += '</label>';
                $(html).appendTo(box.find(".pd-main-list")).find("[name=pd_item]").data("data", data);
            });
        }
    });
}

/** 加载打印派工单 */
function load_print_info(serviceOrderInfo, itemprint) {
    $("#md_number").text("No:" + returnValue(serviceOrderInfo.so_printCode));
    $("#md_contactpeople").text(returnValue(serviceOrderInfo.so_contractor));
    $("#md_contactPhone").text(returnValue(serviceOrderInfo.so_contractPhone));
    $("#owenUcc").text(returnValue(serviceOrderInfo.ucc_name));
    $("#house_address").text(serviceOrderInfo.so_targetAddress);
    $("#applyer").text(isEmpty(serviceOrderInfo.so_applicantEmpName) ? serviceOrderInfo.so_applicantUserName : serviceOrderInfo.so_applicantEmpName);
    $("#md_applyType").text(returnPayObject(serviceOrderInfo.so_payObject));
    $("#md_phone").text(returnValue(serviceOrderInfo.so_payNameNew) + '/' + returnValue(serviceOrderInfo.so_payPhoneNew));
    $("#md_problem").text(returnValue(itemprint) + returnValue(serviceOrderInfo.so_problem));
    $("#md_time").text(format(serviceOrderInfo.so_createTime, "yyyy-MM-dd HH:mm:ss"));
    $("#accpet_name").text(returnValue(serviceOrderInfo.so_currentChargerName));
}

function returnPayObject(payObject) {
    switch (payObject) {
        case 4:
            return "租客";
            break;
        case 5:
            return "房东";
            break;
        case 2:
            return "管家";
            break;
        case 3:
            return "门店";
            break;
        case 6:
            return "用户";
            break;
    }
}

/** 跳转服务下单 */
function jumpApplyService() {
    // window.parent.href_mo('/service/applyService', '服务下单', '服务订单');
    $.ajax({
        type: "POST",
        url: "/service/queryServiceProject",
        data: {},
        dataType: "json",
    }).done(function (result) {
        // if(result.code != 200){
        //     $.hint.tip("系统异常，请联系管理员", "error");
        //     return;
        // }

        var smOption = "";
        $(result.serviceList).each(function (index, item) {
            smOption += "<option value='" + returnNumber(item.sm_id) + "'>" + returnValue(item.sm_name) + "</option>";
        });

        var stOption = "";
        $(result.typeList).each(function (index, item) {
            stOption += "<option value='" + returnNumber(item.st_id) + "'>" + returnValue(item.st_name) + "</option>";
        });

        $.popupBox({
            target: $(".list-table-content"),
            done: function (box) {
                var html = '';
                html += '<input type="hidden" name="contractObject_Code">';
                html += '<div id="main-box">';
                html += '    <div id="main-box-content">';
                html += '        <dl class="content-dl">';
                html += '            <dt>服务大类</dt>';
                html += '            <dd>';
                html += '                <select class="from-data" name="serviceType" id="service-type" onchange="checkSerbiceType(this)" title="">' + smOption + '</select>';
                html += '             </dd>';
                html += '       </dl>';
                html += '       <dl class="content-dl">';
                html += '           <dt>服务小类</dt>';
                html += '           <dd>';
                html += '               <select class="from-data" name="serviceContent" id="type-content" style="width: auto;" onchange="queryServiceItems()" title="">' + stOption + '</select>';
                html += '           </dd>';
                html += '       </dl>';
                html += '       <dl class="content-dl" id="service-items" style="display: none;padding-bottom: 4px;">';
                html += '           <dt>服务项目</dt>';
                html += '           <dd id="st_item"></dd>';
                html += '       </dl>';
                html += '       <dl class="content-dl">';
                html += '           <dt>';
                html += '               <em>*</em><label id="moveName">房屋地址</label>';
                html += '           </dt>';
                html += '           <dd>';
                html += '               <input type="text" class="from-data" id="houseInfo" placeholder="房屋地址" autocomplete="off" style="width: 334px;">';
                html += '               <img src="/resources/image/localtion_map.png" class="mapImg" data-content-id="2"><input type="hidden" id="out_point" disabled>';
                html += '           </dd>';
                html += '           <dd>';
                html += '               <div class="from-data-state"></div>';
                html += '           </dd>';
                html += '       </dl>';
                html += '       <dl class="content-dl" id="moveInDl" style="display: none;">';
                html += '           <dt>';
                html += '               <em>*</em>搬入地址';
                html += '           </dt>';
                html += '           <dd>';
                html += '               <input type="text" class="from-data" id="houseInfo2" placeholder="请填写搬入房屋地址" autocomplete="off" style="width: 334px;">';
                html += '               <img src="/resources/image/localtion_map.png" class="mapImg" data-content-id="3"><input type="hidden" id="" disabled>';
                html += '           </dd>';
                html += '           <dd>';
                html += '               <div class="from-data-state"></div>';
                html += '           </dd>';
                html += '       </dl>';
                html += '       <dl class="content-dl">';
                html += '           <dt>故障说明</dt>';
                html += '           <dd>';
                html += '               <textarea class="from-data" cols="3" name="serviceProblemDesc" placeholder="故障说明" maxlength="200"></textarea>';
                html += '           </dd>';
                html += '       </dl>';
                html += '       <dl class="content-dl">';
                html += '           <dt>付费对象</dt>';
                html += '           <dd>';
                html += '               <div id="typeRadio">';
                html += '               <label class="typeRadio"><input type="radio" value="4" name="4"/>租客</label>';
                html += '               <label class="typeRadio"><input type="radio" value="5" name="4"/>房东</label>';
                html += '               <label class="typeRadio"><input type="radio" value="2" name="4"/>管家</label>';
                html += '               <label class="typeRadio"><input type="radio" value="3" name="4"/>门店</label>';
                html += '               <label class="typeRadio"><input type="radio" value="6" name="4"/>用户</label>';
                html += '               </div>';
                html += '            </dd>';
                html += '            <dd>';
                html += '               <div class="from-data-state"></div>';
                html += '           </dd>';
                html += '       </dl>';
                html += '       <div id="sgin-infoT">';
                html += '           <dl class="content-dl">';
                html += '               <dt><em>*</em>付费人</dt>';
                html += '               <dd>';
                html += '                   <select type="text" class="from-data" name="so_payName" id="so_payName" placeholder="付费人" style="width: 100px"></select>';
                html += '                   <input type="text" class="from-data" name="so_payName" placeholder="付费人" style="width: 100px;display: none;" >';
                html += '                   <div style="padding: 0 10px;">-</div>';
                html += '                   <select type="text" class="from-data" name="so_payPhone" id="so_payPhone" placeholder="联系电话"></select>';
                html += '                   <input type="text" class="from-data" name="so_payPhone" placeholder="联系电话" style="display: none;" >';
                html += '               </dd>';
                html += '           </dl>';
                html += '           <dl class="content-dl">';
                html += '               <dt>';
                html += '                   <em>*</em>联系人';
                html += '               </dt>';
                html += '               <dd>';
                // html += '                   <select type="text" class="from-data" name="contactPeople" id="contactPeople" placeholder="联系人" style="width: 100px"></select>';
                html += '                   <input type="text" class="from-data" name="contactPeople" id="contactPeople" placeholder="联系人" style="width: 100px">';
                html += '                   <div style="padding: 0 10px;">-</div>';
                // html += '                   <select type="text" class="from-data" name="contactPhone" id="contactPhone" placeholder="联系电话"></select>';
                html += '                   <input type="text" class="from-data" name="contactPhone" id="contactPhone" placeholder="联系电话">';
                html += '               </dd>';
                html += '           </dl>';
                html += '       </div>';
                html += '       <div id="year_order">';
                html += '           <dl class="content-dl">';
                html += '               <dt>';
                html += '                   <em>*</em>预约时间';
                html += '               </dt>';
                html += '               <dd>';
                html += '                   <input type="text" class="from-data" name="startTime" id="startTime" placeholder="预约时间" readonly="readonly" title="" onblur="checkBookTime(this)" onfocus=\'WdatePicker({dateFmt:"yyyy-MM-dd HH:mm:ss"})\'>';
                html += '               </dd>';
                html += '           </dl>';
                html += '           <dl class="content-dl">';
                html += '               <dt>申请人</dt>';
                html += '               <dd>';
                html += '                   <input type="text" class="from-data" placeholder="申请人" value="' + returnValue(result.employee.em_name) + '" readonly="readonly" disabled="disabled">';
                html += '               </dd>';
                html += '           </dl>';
                html += '       </div>';
                html += '       <dl class="content-dl">';
                html += '           <dt></dt>';
                html += '           <dd>';
                html += '               <input type="button" id="submitService" class="from-data" value="提交">';
                html += '           </dd>';
                html += '       </dl>';
                html += '    </div>';
                html += '</div>';
                box.main.html(html);

                load_apply_event();
            }
        });
    });
}

function checkSerbiceType(obj) {
    var servType = $(obj).val();
    if (returnNumber(servType) == 6) {// 搬家
        $("#moveInDl").show();
        $("#moveName").text("搬出地址");
        $("#houseInfo").attr("placeholder", "请输入搬出房屋地址");
    } else {
        $("#moveInDl").hide();
        $("#moveName").text("房屋地址");
        $("#houseInfo").attr("placeholder", "请输入房屋地址");
    }
}

function checkBookTime(obj) {
    if (!isEmpty($(obj).val()) && (returnTime($(obj).val()) < returnTime(new Date()))) {
        $(obj).val("").msg("预约时间不能小于当前时间", "error");
        return;
    }
}

/** 查询服务子类型 */
function queryServiceItems() {
    var $val = $("#type-content").text();
    $("#desc-box").empty();
    $("#service-items").hide();
    $.ajax({
        type: "POST",
        url: "/service/changeType",
        data: {
            pId: $("#type-content").val()
        },
        dataType: "json"
    }).done(function (result) {
        if (result.code == 200) {
            if (isEmpty(result.data)) {
                $("#service-items").hide();
                return;
            }
            var html = "";
            $.each(result.data, function (index, item) {
                html += "<label class='check-item' onclick='checkProject(this)'><input type='checkbox' name='st_item' value='" + item.st_id + "' />" + item.st_name + "</label>";
            });
            $("#st_item").html(html);
            $("#service-items").show();
        }
    });
};

function checkProject(obj) {
    var checked = $(obj).find('input').is(":checked");
    if (checked) {
        $(obj).addClass("check-item-ok");
    } else {
        $(obj).removeClass("check-item-ok");
    }

}

function load_apply_event() {
    // 小区房号搜索
    $("#houseInfo").ContractHouseSearch({
        placeholder: "小区房号/租客/房东/管家/门店",
        top: 40,
        left: 0,
        result: function (rlt) {
            console.log(rlt);
            $("[name=so_payName]").val("");
            $("[name=so_payPhone]").val("");
            $("[name=contactPeople]").val("");
            $("[name=contactPhone]").val("");
            $("[name=4]").removeAttr("checked");
            var data = $(rlt).data("data");
            $("#houseInfo").attr("data-hi_code", returnValue(data.hi_code));
        }
    });

    $("#houseInfo2").ContractHouseSearch2({
        placeholder: "小区房号/租客/房东/管家/门店",
        top: 40,
        left: 0,
        result: function (rlt) {
            console.log(rlt);
            var data = $(rlt).data("data");
            $("#houseInfo2").attr("data-hi_code", returnValue(data.hi_code));
        }
    });

    /**********地图坐标*********/
    $("img.mapImg").on("click", function () {
        var obj = $(this);
        var he_address = $(obj).siblings("input:hidden").eq(0).val();
        var house_address = $(obj).prevAll("#houseInfo").val();

        if (isEmpty(house_address)) {
            $.hint.tip("请选择房屋地址", "error");
            return;
        }

        var xyz = $(obj).siblings("input:hidden").eq(8).val();

        $.jBox("iframe:/propertyInfo/map?hi_address=" + (isEmpty(he_address) ? house_address : he_address) + "&xyz=" + xyz + "&house_type=" + $(obj).attr("data-content-id"), {
            title: "管家婆管理系统",
            width: 1000,
            height: 550,
            buttons: {'关闭': true}
        });
    });

    // 付费对象
    $("[name=4]").on("click", function () {
        $(this).attr("checked", true);
        var dataView = $("#houseInfo").data("data");
        var so_payObject = $(this).val();
        if (so_payObject != "6") {

            $.ajax({
                type: "POST",
                url: "/service/queryPayObjectByHiCode",
                data: {
                    hi_code: returnValue(dataView.hi_code),
                    so_payObject: returnNumber(so_payObject),
                },
                dataType: "json",
                success: function (result) {
                    if (result.code == 200) {
                        $("[name=so_payName]").html("");
                        $("[name=so_payPhone]").html("");
                        $("[name=contactPeople]").html("");
                        $("[name=contactPhone]").html("");
                        switch (so_payObject) {
                            case "4":
                                $("[name=so_payName]").eq(0).show();
                                $("[name=so_payName]").eq(1).hide();
                                $("[name=so_payPhone]").eq(0).show();
                                $("[name=so_payPhone]").eq(1).hide();
                                var cc_name = returnValue($(".house_input").attr("data-cc_name_z"));
                                var ccp_phone = returnValue($(".house_input").attr("data-ccp_phone_z"));
                                $("[name=contractObject_Code]").val(returnValue(dataView.contractObject_Code_z));
                                $("#houseInfo").attr("data-hi_code", returnValue(dataView.hi_code));

                                $(result.data).each(function (index, data) {
                                    var name = (isEmpty(cc_name) ? returnValue(data.cc_name_z) : cc_name);
                                    if (!existsValue($("[name=so_payName] option"), name)) {
                                        $("[name=so_payName]").append("<option value='" + name + "'>" + name + "</option>");
                                    }
                                    // if (!existsValue($("[name=contactPeople] option"), name)) {
                                    //     $("[name=contactPeople]").append("<option value='" + name + "'>" + name + "</option>");
                                    // }
                                    var phone = (isEmpty(ccp_phone) ? returnValue(data.ccp_phone_z) : ccp_phone);
                                    if (!existsValue($("[name=so_payPhone] option"), phone)) {
                                        $("[name=so_payPhone]").append("<option value='" + phone + "'>" + phone + "</option>");
                                    }
                                    // if (!existsValue($("[name=contactPhone] option"), phone)) {
                                    //     $("[name=contactPhone]").append("<option value='" + phone + "'>" + phone + "</option>");
                                    // }
                                });
                                $("[name=contactPeople]").val(isEmpty(cc_name) ? returnValue(result.data[0].cc_name_z) : cc_name);
                                $("[name=contactPhone]").val(isEmpty(ccp_phone) ? returnValue(result.data[0].ccp_phone_z) : ccp_phone);
                                break;
                            case "5":
                                $("[name=so_payName]").eq(0).show();
                                $("[name=so_payName]").eq(1).hide();
                                $("[name=so_payPhone]").eq(0).show();
                                $("[name=so_payPhone]").eq(1).hide();
                                var cc_name = returnValue($(".house_input").attr("data-cc_name_f"));
                                var ccp_phone = returnValue($(".house_input").attr("data-ccp_phone_f"));
                                $("[name=contractObject_Code]").val(returnValue(dataView.contractObject_Code_f));
                                $("#houseInfo").attr("data-hi_code", returnValue(dataView.hi_code));

                                $(result.data).each(function (index, data) {
                                    var name = (isEmpty(cc_name) ? returnValue(data.cc_name_f) : cc_name);
                                    if (!existsValue($("[name=so_payName] option"), name)) {
                                        $("[name=so_payName]").append("<option value='" + name + "'>" + name + "</option>");
                                    }
                                    // if (!existsValue($("[name=contactPeople] option"), name)) {
                                    //     $("[name=contactPeople]").append("<option value='" + name + "'>" + name + "</option>");
                                    // }
                                    var phone = (isEmpty(ccp_phone) ? returnValue(data.ccp_phone_f) : ccp_phone);
                                    if (!existsValue($("[name=so_payPhone] option"), phone)) {
                                        $("[name=so_payPhone]").append("<option value='" + phone + "'>" + phone + "</option>");
                                    }
                                    // if (!existsValue($("[name=contactPhone] option"), phone)) {
                                    //     $("[name=contactPhone]").append("<option value='" + phone + "'>" + phone + "</option>");
                                    // }
                                });
                                $("[name=contactPeople]").val(isEmpty(cc_name) ? returnValue(result.data[0].cc_name_f) : cc_name);
                                $("[name=contactPhone]").val(isEmpty(ccp_phone) ? returnValue(result.data[0].ccp_phone_f) : ccp_phone);
                                break;
                            case "2":
                                $("[name=so_payName]").eq(0).show();
                                $("[name=so_payName]").eq(1).hide();
                                $("[name=so_payPhone]").eq(0).show();
                                $("[name=so_payPhone]").eq(1).hide();
                                var em_name = returnValue($(".house_input").attr("data-em_name"));
                                var em_phone = returnValue($(".house_input").attr("data-em_phone"));
                                $("[name=contractObject_Code]").val("");
                                $("#houseInfo").attr("data-hi_code", returnValue(dataView.hi_code));

                                $(result.data).each(function (index, data) {
                                    var name = (isEmpty(em_name) ? returnValue(data.em_name) : em_name);
                                    if (!existsValue($("[name=so_payName] option"), name)) {
                                        $("[name=so_payName]").append("<option value='" + name + "'>" + name + "</option>");
                                    }
                                    // if (!existsValue($("[name=contactPeople] option"), name)) {
                                    //     $("[name=contactPeople]").append("<option value='" + name + "'>" + name + "</option>");
                                    // }
                                    var phone = (isEmpty(em_phone) ? returnValue(data.em_phone) : em_phone);
                                    if (!existsValue($("[name=so_payPhone] option"), phone)) {
                                        $("[name=so_payPhone]").append("<option value='" + phone + "'>" + phone + "</option>");
                                    }
                                    // if (!existsValue($("[name=contactPhone] option"), phone)) {
                                    //     $("[name=contactPhone]").append("<option value='" + phone + "'>" + phone + "</option>");
                                    // }
                                });
                                $("[name=contactPeople]").val(isEmpty(cc_name) ? returnValue(result.data[0].em_name) : em_name);
                                $("[name=contactPhone]").val(isEmpty(ccp_phone) ? returnValue(result.data[0].em_phone) : em_phone);
                                break;
                            case "3":
                                $("[name=so_payName]").eq(0).show();
                                $("[name=so_payName]").eq(1).hide();
                                $("[name=so_payPhone]").eq(0).show();
                                $("[name=so_payPhone]").eq(1).hide();
                                var ucc_name = returnValue($(".house_input").attr("data-ucc_name"));
                                var ucc_phone = returnValue($(".house_input").attr("data-ucc_phone"));
                                $("[name=contractObject_Code]").val("");
                                $("#houseInfo").attr("data-hi_code", returnValue(dataView.hi_code));

                                $(result.data).each(function (index, data) {
                                    var name = (isEmpty(ucc_name) ? returnValue(data.ucc_name) : ucc_name);
                                    if (!existsValue($("[name=so_payName] option"), name)) {
                                        $("[name=so_payName]").append("<option value='" + name + "'>" + name + "</option>");
                                    }
                                    // if (!existsValue($("[name=contactPeople] option"), name)) {
                                    //     $("[name=contactPeople]").append("<option value='" + name + "'>" + name + "</option>");
                                    // }
                                    var phone = (isEmpty(ucc_phone) ? returnValue(data.ucc_phone) : ucc_phone);
                                    if (!existsValue($("[name=so_payPhone] option"), phone)) {
                                        $("[name=so_payPhone]").append("<option value='" + phone + "'>" + phone + "</option>");
                                    }
                                    // if (!existsValue($("[name=contactPhone] option"), phone)) {
                                    //     $("[name=contactPhone]").append("<option value='" + phone + "'>" + phone + "</option>");
                                    // }
                                });
                                $("[name=contactPeople]").val(isEmpty(cc_name) ? returnValue(result.data[0].ucc_name) : ucc_name);
                                $("[name=contactPhone]").val(isEmpty(ccp_phone) ? returnValue(result.data[0].ucc_phone) : ucc_phone);
                                break;
                            case "6":
                                $("[name=so_payName]").eq(0).hide();
                                $("[name=so_payName]").eq(1).show();
                                $("[name=so_payPhone]").eq(0).hide();
                                $("[name=so_payPhone]").eq(1).show();
                                $("[name=contractObject_Code]").val("");
                                $("#houseInfo").attr("data-hi_code", "");
                                $("[name=so_payName]").val("");
                                $("[name=so_payPhone]").val("");
                                break;
                        }
                    } else {
                        $.hint.tip("无付费人信息", "error");
                        return;
                    }
                }
            });
        } else {
            $("[name=so_payName]").eq(0).hide();
            $("[name=so_payName]").eq(1).show();
            $("[name=so_payPhone]").eq(0).hide();
            $("[name=so_payPhone]").eq(1).show();
            $("[name=contractObject_Code]").val("");
            $("#houseInfo").attr("data-hi_code", "");
            $("[name=so_payName]").val("");
            $("[name=so_payPhone]").val("");
        }
    });

    // 付费人
    $("#so_payName").change(function () {
        var selectIndex = $(this).get(0).selectedIndex;
        $(this).val($(this).find("option").eq(selectIndex).val());
        $("[name=so_payPhone]").get(0).selectedIndex = selectIndex;
        $("[name=so_payPhone]").val($("[name=so_payPhone] option").eq(selectIndex).val());
    });

    // 联系人
    // $("[name=contactPeople]").change(function () {
    //     var selectIndex = $(this).get(0).selectedIndex;
    //     $(this).val($(this).find("option").eq(selectIndex).val());
    //     $("[name=contactPhone]").get(0).selectedIndex = selectIndex;
    //     $("[name=contactPhone]").val($("[name=contactPhone] option").eq(selectIndex).val());
    // });

    // 加载图片插件
    $("#imageUpload").imageUpload({
        width: 110,
        height: 110,
        uploadType: 'maintenance'
    });

    $(".money").bind("input propertychange",
        function () {
            if (/[^0-9.]/g.test($(this).val())) {
                $(this).val("");
            }
            var sum = 0;
            $(".money").each(function () {
                var val = $(this).val();
                if (!isEmpty(val)) {
                    sum += parseInt($(this).val());
                }
            });
            $("#moneyTotal").val(sum);
        });

    $("#service-type").change(function () {
        $.ajax({
            type: "POST",
            url: "/service/changeType",
            data: {
                typeId: $(this).val()
            },
            dataType: "json"
        }).done(function (result) {
            if (result.code == 200) {
                $("#type-content").empty();
                $.each(result.data, function (index, data) {
                    $("#type-content").append('<option value="' + data.st_id + '">' + data.st_name + '</option>');
                });
                queryServiceItems();
            }
        });
    });

    $("#apply-type").change(function () {
        $("#houseInfo").val("").removeData("data");
        $("#houseId").val("");
        $("#people").val("");
        $("#phone").val("");
        $("#contactPeople").val("");
        $("#contactPhone").val("");
        $("#sgin-info").hide();
    });

    $(".state-model").hover(function () {
            initPersonState($(this), $(this).attr("data-content"));
        },
        function () {
            $(".state-box").remove();
        });

    // 【点击事件】提交数据
    $("#submitService").on("click", function () {
        var serviceProblemDesc = "";
        if ($("textarea[name='serviceProblemDesc']").val() != "") {
            serviceProblemDesc += $("textarea[name='serviceProblemDesc']").val();
        }
        // if (isEmpty(serviceProblemDesc)) {
        //     $("textarea[name='serviceProblemDesc']").msg("请选择或填写服务描述");
        //     return;
        // }
        var $hinfo = $("#houseInfo").val();
        if (isEmpty($hinfo)) {
            $("#houseInfo").msg("请填写房屋地址");
            return;
        }

        if (isEmpty($("#contactPeople").val())) {
            $("#contactPeople").msg("请填写联系人");
            return;
        }
        if (isEmpty($("#contactPhone").val())) {
            $("#contactPhone").msg("请填写联系人电话");
            return;
        }
        var md_time = $('input[name=startTime]').val();
        if (isEmpty(md_time)) {
            $("input[name=startTime]").msg("请选择预约时间");
            return;
        }

        var servicePicDescs = new Array();
        $('#imageUpload .image-item-img').each(function () {
            servicePicDescs.push($(this).attr("data-url"));
        });

        var data = {};
        var serviceOrderVo = {};
        var pointList = [];
        var serviceType = $('select[name="serviceType"] option:selected').val();

        serviceOrderVo.so_source = 11;// 内部来源
        serviceOrderVo.so_type = serviceType;
        serviceOrderVo.so_payObject = $("[name=4]:checked").val();
        serviceOrderVo.st_id_b = $('#type-content').val();

        var st_id_c = "";
        var checkItem = $(".check-item input:checked");
        $.each(checkItem, function (index, item) {
            st_id_c += item.value;
            if (index < checkItem.length - 1) {
                st_id_c += ",";
            }
        });
        if (!isEmpty(st_id_c)) {
            serviceOrderVo.st_id_c = st_id_c;
        }
        serviceOrderVo.so_targetPoint = $("#out_point").val();
        serviceOrderVo.so_problem = serviceProblemDesc;
        serviceOrderVo.hi_code = $("#houseInfo").attr("data-hi_code") || "";
        serviceOrderVo.so_targetAddress = $("#houseInfo").val();
        serviceOrderVo.so_contractor = $('[name="contactPeople"]').val();
        serviceOrderVo.so_contractPhone = $('[name="contactPhone"]').val();
        serviceOrderVo.so_targetTime = $('input[name="startTime"]').val();
        serviceOrderVo.so_payName = $("#so_payName").val() || $("[name=so_payName]").eq(1).val();
        serviceOrderVo.so_payPhone = $("#so_payPhone").val() || $("[name=so_payPhone]").eq(1).val();
        serviceOrderVo.servicePicDesc = servicePicDescs;
        serviceOrderVo.contractObject_Code = $("[name=contractObject_Code]").val();

        data.serviceOrderVo = JSON.stringify(serviceOrderVo);

        if (returnNumber(serviceType) == 6) {// 搬家
            var serviceOrderInfoVo = {};
            serviceOrderInfoVo.soin_moveStartAddress = $("#houseInfo").val();
            serviceOrderInfoVo.soin_moveStartPoint = $("#out_point").val();
            serviceOrderInfoVo.soin_moveEndAddress = $("#houseInfo2").val();
            serviceOrderInfoVo.soin_moveEndPoint = $("#in_point").val();
            data.serviceOrderInfoVo = JSON.stringify(serviceOrderInfoVo);
        }

        $.ajax({
            type: "POST",
            url: "/service/saveServiceOrderInfo",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result.code == 200) {
                    window.location.href = "/service/serviceList";
                } else {
                    $.hint.tip(result.msg, "error");
                }
            }
        });
    });
}

/**
 * 接单
 */
function submitReseive() {

    var spro_state = returnNumber($("label[name=isReceive].common-checkbox-checked2").attr("data-value"));
    if (isEmpty(spro_state)) {
        $.hint.tip("请选择是否接单", "error");
        return;
    }

    var spro_expectEndDuration = $("#spro_expectEndDuration");
    if (spro_state == 1) {
        if (isEmpty(spro_expectEndDuration.val())) {
            return spro_expectEndDuration.msg("请填写预计时长");
        }
        //
        var reg = /^\d+$|^\d+\.\d+$/g;
        if (!reg.test(spro_expectEndDuration.val())) {
            $.hint.tip("请填写数字", "error");
            return;
        }
    }

    if (spro_state == 3) {
        if (isEmpty($("[name=refusedArea]").val())) {
            $.hint.tip("请填写拒绝理由", "error");
            return;
        }
    }

    $.ajax({
        type: "POST",
        url: "/service/submitServiceReceive",
        data: {
            so_id: so_id,
            spro_state: returnNumber(spro_state),
            spro_expectEndDuration: returnFloat(spro_expectEndDuration.val()),
            refusedArea: returnValue($("[name=refusedArea]").val())
        },
        dataType: "json",
        success: function (result) {
            if (result.code == 200) {
                $.hint.tip("服务订单接单成功", "success");
                // 异步刷新服务进度
                $.popupRefresh();
            } else {
                $.hint.tip("服务订单接单失败，请联系管理员", "error");
            }
        }
    });

}

/**服务受理**/
function changeType(obj) {
    $(".type-label").removeClass("span-checked");
    $(obj).addClass("span-checked");
    $(obj).parent().siblings("#mdOrderTable").html("");
    $.ajax({
        type: "POST",
        url: "/queryServiceOrderByEmId",
        data: {
            em_id: $(obj).parent().attr("data-content")
        },
        dataType: "json"
    }).done(function (result) {
        var label = "<div class='sub-title' style='width: 180px;height: 5px;'><ul class='title-nav' style='width: 180px;height: 5px;'><li class='visited' style='padding: 0;'>最新待完成订单</li></ul></div>";
        var html = '';
        if (result.code == 200) {
            var count = 0;
            $.each(result.data, function (index, item) {
                html += '<tr>';
                html += '<td>' + (isEmpty(item.so_targetAddress) ? item.house_address : item.so_targetAddress) + '</td>';
                html += '<td>' + item.sm_name + '</td>';
                html += '<td>' + returnValue(item.ss_title) + '</td>';
                html += '<td>' + returnTime(item.spro_expectEndTime) + '</td>';
                html += '</tr>';
                count++;
            });
            if (count > 0) {
                $("#servicePersonDd").parent().siblings("#mdOrderTable").html(label + "<table class='ordertable'><thead style='font-weight: bold;color: #000000;'><tr><td>小区房号</td><td>订单类型</td><td>完成情况</td><td>预计结束时间</td></tr></thead><tbody>" + html + "</tbody></table>").show();
            } else {
                $("#servicePersonDd").parent().siblings("#mdOrderTable").html("").hide();
            }
        }
    });
}

function enterCase(obj) {
    if ($(obj).hasClass("common-checkbox-checked2")) {
        $(obj).removeClass("common-checkbox-checked2");
    } else {
        $(obj).addClass("common-checkbox-checked2").siblings().removeClass("common-checkbox-checked2");
    }
    if ($(obj).text().indexOf("确认") > -1 && $(obj).hasClass("common-checkbox-checked2")) {
        $("#customerDl").show();
        $("#yjtime").show();
        $("#so_refuse_box").hide();
    } else {
        $("#customerDl").hide();
        $("#yjtime").hide();
        $("#so_refuse_box").show();
    }
}

/**
 * 保存维修图片
 *
 * @param path 图片路径
 */
function addServicePicture(path, type) {
    $.ajax({
        type: "POST",
        url: "/service/saveServiceImage",
        data: {
            oprate: 1,
            so_id: so_id,
            si_type: type,
            si_path: path
        },
        dataType: "json"
    }).done(function (result) {
        if (result.msg != "success") {
        }
    });
}

/**
 * 删除维修图片
 *
 * @param path 图片路径
 */
function deleteServicePicture(path) {
    $.ajax({
        type: "POST",
        url: "/service/saveServiceImage",
        data: {
            oprate: 2,
            si_path: path
        },
        dataType: "json"
    });
}

function selectHouse(obj) {
    if (!$(obj).hasClass("common-checkbox-checked2")) {
        $(obj).addClass("common-checkbox-checked2");
        $(obj).parent().parent().siblings().find(".common-checkbox2").removeClass("common-checkbox-checked2");
    } else {
        $(obj).removeClass("common-checkbox-checked2");
    }
}

function checkPayObjec(obj) {
    if (!$(obj).hasClass("common-checkbox-checked2")) {
        $(obj).addClass("common-checkbox-checked2");
        $(obj).parent().parent().siblings().find(".common-checkbox2").removeClass("common-checkbox-checked2");

        var $inputList = $(obj).nextAll("input[type=hidden]");
        var so_id = $inputList.eq(0).val();
        var payObject = $inputList.eq(1).val();
        var user_id = isEmpty($inputList.eq(2).val()) ? "" : $inputList.eq(2).val();
        var cc_code = isEmpty($inputList.eq(3).val()) ? "" : $inputList.eq(3).val();
        var em_id = isEmpty($inputList.eq(4).val()) ? "" : $inputList.eq(4).val();
        var ucc_id = isEmpty($inputList.eq(5).val()) ? "" : $inputList.eq(5).val();
        $.ajax({
            type: "POST",
            url: "/service/queryMoneyDetial",
            data: {
                so_id: so_id,
                payObject: payObject,
                user_id: user_id,
                cc_code: cc_code,
                em_id: em_id,
                ucc_id: ucc_id
            },
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            success: function (result) {
                var tbodyHtml = "";
                if (result.moneyDetailList != null && result.moneyDetailList != undefined && result.moneyDetailList.length > 0) {
                    var totalMoney = 0.0;
                    $.each(result.moneyDetailList, function (index, item) {
                        tbodyHtml += "<tr>";
                        tbodyHtml += "  <td><input class='short' type='text' value='" + item.ssm_source + "' placeholder='输入名目'/></td>";
                        tbodyHtml += "  <td><input class='short' type='text' name='price' value='" + item.ssm_univalent + "' placeholder='单价' onkeyup='updateMoney(this)' /></td>";
                        tbodyHtml += "  <td><input class='short' type='text' name='count' value='" + item.ssm_num + "' placeholder='数量' onkeyup='updateMoney(this)' /></td>";
                        tbodyHtml += "  <td><input class='short' type='text' name='sumMoney' value='" + item.ssm_money + "' placeholder='金额' onkeyup='updateMoney(this)' /></td>";
                        tbodyHtml += "  <td><span class='btn' onclick='removeBillDetail(this)'>删除</span><input type='hidden' value='1'></td>";
                        tbodyHtml += "</tr>";
                        totalMoney += returnFloat(item.ssm_money);
                    });
                }
                tbodyHtml += "<tr>";
                tbodyHtml += "  <td><input class='short' type='text' value='' placeholder='输入名目'/></td>";
                tbodyHtml += "  <td><input class='short' type='text' name='price' value='' placeholder='单价' onkeyup='updateMoney(this)' /></td>";
                tbodyHtml += "  <td><input class='short' type='text' name='count' value='' placeholder='数量' onkeyup='updateMoney(this)' /></td>";
                tbodyHtml += "  <td><input class='short' type='text' name='sumMoney' value='' placeholder='金额' onkeyup='updateMoney(this)' /></td>";
                tbodyHtml += "  <td><span class='btn bg-ok' onclick='addBillMoney(this)'>+</span><input type='hidden' value='0'></td>";
                tbodyHtml += "</tr>";
                $("#moneyDetailTbody").html(tbodyHtml);
                $("#total_money").text(totalMoney);
                /*else {
                 $.hint.tip("费用明细提交失败，请联系管理员", "error");
                 // 异步刷新服务进度
                 $.popupRefresh();
                 }*/
            }
        });

    } else {
        $(obj).removeClass("common-checkbox-checked2");
        var tbodyHtml = "";
        tbodyHtml += "<tr>";
        tbodyHtml += "  <td><input class='short' type='text' value='' placeholder='输入名目'/></td>";
        tbodyHtml += "  <td><input class='short' type='text' name='price' value='' placeholder='单价' onkeyup='updateMoney(this)' /></td>";
        tbodyHtml += "  <td><input class='short' type='text' name='count' value='' placeholder='数量' onkeyup='updateMoney(this)' /></td>";
        tbodyHtml += "  <td><input class='short' type='text' name='sumMoney' value='' placeholder='金额' onkeyup='updateMoney(this)' /></td>";
        tbodyHtml += "  <td><span class='btn bg-ok' onclick='addBillMoney(this)'>+</span><input type='hidden' value='0'></td>";
        tbodyHtml += "</tr>";
        $("#moneyDetailTbody").html(tbodyHtml);
        $("#total_money").text(0);
    }
}

/**
 * 添加费用清单
 *
 * @param obj
 */
function addBillMoney(obj) {
    var bool = true;
    var _this = $(obj).parent().parent();
    $(_this).find("input.text-input").each(function () {
        if (isEmpty($(this).val())) {
            $(this).focus();
            bool = false;
            return false;
        }
    });

    if (bool) {
        $(_this).find("input.text-input").attr("readonly", true).css("border", "none");
        // 更新总金额
        var sumMoney = returnFloat($(_this).find("input[name='sumMoney']").val());
        var total_money = returnFloat($("#total_money").text());
        $("#total_money").text(total_money + sumMoney);

        $(obj).parent().append("<span class='btn' onclick='removeBillDetail(this)'>删除</span>");
        $(obj).remove();
        var html = "<tr>" +
            "<td><input class='short' type='text' placeholder='输入名称'/></td>" +
            "<td><input class='short' type='text' name='price' value='' placeholder='单价' onkeyup='updateMoney(this)' /></td>" +
            "<td><input class='short' type='text' name='count' value='1' placeholder='数量' onkeyup='updateMoney(this)' /></td>" +
            "<td><input class='short' type='text' name='sumMoney' value='' placeholder='金额' onkeyup='updateMoney(this)' /></td>" +
            "<td><span class='btn bg-ok' onclick='addBillMoney(this)'>添加</span><input type='hidden' value='0'></td>" +
            "</tr>";
        $(_this).after(html);
    }
}

/**
 * 初始化评价插件
 */
function initSimplestar() {
    $("#simplestar img").hover(function () {
        var index = parseInt($(this).attr("id").replace("image", ""));
        $("#simplestar img").attr("src", "/resources/image/T1j.png");
        $("#simplestar img").each(function (i) {
            if (i <= index) {
                if (index < 2) {
                    $(this).attr("src", "/resources/image/T1lg.png");
                } else {
                    $(this).attr("src", "/resources/image/T1e.png");
                }
            }
        });

        if (index == 0) {
            $(".tooltip").css("left", "-91px").show();
            $(".tooltip strong").text("1分 很不满意");
            $(".tooltip span").text("差的太离谱，和服务不相符合！");
        } else if (index == 1) {
            $(".tooltip").css("left", "-69px").show();
            $(".tooltip strong").text("2分 不满意");
            $(".tooltip span").text("完成的比较差，和服务不相符合！");
        } else if (index == 2) {
            $(".tooltip").css("left", "-46px").show();
            $(".tooltip strong").text("3分 一般");
            $(".tooltip span").text("完成的一般，没有想象中的好");
        } else if (index == 3) {
            $(".tooltip").css("left", "-23px").show();
            $(".tooltip strong").text("4分 满意");
            $(".tooltip span").text("服务比较满意，与想象中的一致，还挺不错的");
        } else if (index == 4) {
            $(".tooltip").css("left", "0px").show();
            $(".tooltip strong").text("5分 很满意");
            $(".tooltip span").text("服务很满意，与想象中的一致，非常满意");
        }
    }, function () {
        $("#simplestar img").attr("src", "/resources/image/T1j.png");
        $(".tooltip").hide();
        if ($(".fraction em").text() != "") {
            var index = parseInt($(".fraction em").text()) - 1;
            $("#simplestar img").each(function (i) {
                if (i <= index) {
                    if (index < 2) {
                        $(this).attr("src", "/resources/image/T1lg.png");
                    } else {
                        $(this).attr("src", "/resources/image/T1e.png");
                    }
                }
            });
        }
    });

    //服务评分
    $(".tooltip").hover(function () {
        $(".tooltip").show();
        $("#simplestar img").attr("src", "/resources/image/T1j.png");
        var index = parseInt($(".tooltip strong").text().substring(0, 1)) - 1;
        $("#simplestar img").each(function (i) {
            if (i <= index) {
                if (index < 2) {
                    $(this).attr("src", "/resources/image/T1lg.png");
                } else {
                    $(this).attr("src", "/resources/image/T1e.png");
                }
            }
        });
    }, function () {
        $(".tooltip").hide();
        $("#simplestar img").attr("src", "/resources/image/T1j.png");
        if ($(".fraction em").text() != "") {
            var index = parseInt($(".fraction em").text()) - 1;
            $("#simplestar img").each(function (i) {
                if (i <= index) {
                    if (index < 2) {
                        $(this).attr("src", "/resources/image/T1lg.png");
                    } else {
                        $(this).attr("src", "/resources/image/T1e.png");
                    }
                }
            });
        }
    });

    $("#simplestar img").click(function () {
        var index = parseInt($(this).attr("id").replace("image", ""));
        $("#simplestar img").each(function (i) {
            if (i <= index) {
                if (index < 2) {
                    $(this).attr("src", "/resources/image/T1lg.png");
                } else {
                    $(this).attr("src", "/resources/image/T1e.png");
                }
            }
        });
        $("#contentMessage").val($(".tip-inner span").text());
        $(".fraction em").text(index + 1);
        $(".fraction").show();
    });
}

/**
 * 打印派工单
 */
function printService() {
    $("#mdg_time").text(format(new Date(), "yyyy-MM-dd HH:mm:ss"));
    LODOP = getLodop();
    LODOP.PRINT_INIT("票据打印");
    $("#print").each(function (index) {
        LODOP.ADD_PRINT_TABLE(10, 17, "99.8%", 400, $(this).html());
    });
    LODOP.PREVIEW();
}

/**
 * 删除账单
 *
 * @param obj
 */
function removeBill(obj) {
    if (returnNumber($(obj).parent().find("input").val()) == 1) {
        $.hint.tip("该付费信息已生成订单，不可删除", "error");
        return;
    }
    var _this = $(obj).parent().parent();
    var sumMoney = returnFloat($(_this).find("input[name='price']").val());
    var total_money = returnFloat($("#total_money").text());
    $("#total_money").text(total_money - sumMoney);

    $(_this).remove();
}

/**
 * 删除账单
 *
 * @param obj
 */
function removeBillDetail(obj) {

    var _this = $(obj).parent().parent();
    var sumMoney = returnFloat($(_this).find("input[name='price']").val());
    var total_money = returnFloat($("#total_money").text());
    $("#total_money").text(total_money - sumMoney);

    $(_this).remove();
}

/**
 * 绑定内部房屋
 * @param obj
 */
function changeHouse(obj) {

    if ($(obj).hasClass('common-checkbox-checked')) {
        $(obj).removeClass('common-checkbox-checked');
        $(obj).prevAll('.house_input').attr("disabled", true).unbind();

        $("[name=hi_code]").val($("[name=hi_code]").attr("data-hi_code"));
        $("[name=so_targetAddress]").val($("[name=hi_code]").attr("data-address"));

        var data = $("#old-data").data("data-content");
        $("#houseInfoLabel").text(isEmpty(data.hi_measure) ? "无" : (returnFloat(data.hi_measure) + " 平米，" + returnNumber(data.hi_houseS) + " 室 " + returnNumber(data.hi_houseT) + " 厅 ") + returnNumber(data.hi_houseW) + " 卫");
        $("#contractObject_TG").text(isEmpty(data.contractObject_Date_f) ? "无" : (returnDate(returnNumber(data.contractObject_Date_f)) + "~" + returnDate(returnNumber(data.contractObject_DeadlineTime_f)) + " | " + returnContractOptionState(returnNumber(data.contractObject_OptionState_f)).text + " | " + returnValue(data.cc_name_f) + " | " + returnFloat(data.surplus_serveMoney_f) + "/" + returnFloat(data.init_serveMoney_f) + " 元"));
        $("#contractObject_ZL").text(isEmpty(data.contractObject_Date_z) ? "无" : (returnDate(returnNumber(data.contractObject_Date_z)) + "~" + returnDate(returnNumber(data.contractObject_DeadlineTime_z)) + " | " + returnContractOptionState(returnNumber(data.contractObject_OptionState_z)).text + " | " + returnValue(data.cc_name_z) + " | " + returnFloat(data.surplus_serveMoney_z) + "/" + returnFloat(data.init_serveMoney_z) + " 元"));

    } else {
        $(obj).addClass('common-checkbox-checked');
        $(obj).prevAll('.house_input').removeAttr("disabled").attr("readonly", true);
        // 小区房号搜索
        $(obj).prevAll('.house_input').ContractHouseSearch({
            placeholder: "小区房号/租客/房东/管家/门店",
            top: 85,
            left: 100,
            result: function (rlt) {
                console.log(rlt);
                $(obj).prevAll('.house_input').val(returnValue($(rlt).val()));
                var conData = $(rlt).data("data");
                $(obj).prevAll('input[type=hidden]').val(returnValue(conData.hi_code));
                $("#houseInfoLabel").text(isEmpty(conData.hi_measure) ? "无" : (" " + returnFloat(conData.hi_measure) + " 平米，" + returnNumber(conData.hi_houseS) + " 室 " + returnNumber(conData.hi_houseT) + " 厅 ") + returnNumber(conData.hi_houseW) + " 卫");
                $("#contractObject_TG").text(isEmpty(conData.contractObject_Date_f) ? "无" : (" " + returnDate(returnNumber(conData.contractObject_Date_f)) + "~" + returnDate(returnNumber(conData.contractObject_DeadlineTime_f)) + " | " + returnContractOptionState(returnNumber(conData.contractObject_OptionState_f)).text + " | " + returnValue(conData.cc_name_f) + " | " + returnFloat(conData.surplus_serveMoney_f) + "/" + returnFloat(conData.init_serveMoney_f) + " 元"));
                $("#contractObject_ZL").text(isEmpty(conData.contractObject_Date_z) ? "无" : (" " + returnDate(returnNumber(conData.contractObject_Date_z)) + "~" + returnDate(returnNumber(conData.contractObject_DeadlineTime_z)) + " | " + returnContractOptionState(returnNumber(conData.contractObject_OptionState_z)).text + " | " + returnValue(conData.cc_name_z) + " | " + returnFloat(conData.surplus_serveMoney_z) + "/" + returnFloat(conData.init_serveMoney_z) + " 元"));
            }
        });
    }
}

function returnSproState(spro_state) {
    var state = "";
    switch (spro_state) {
        case 1 :
            state = "正常";
            break;
        case 2 :
            state = "改派";
            break;
        case 3 :
            state = "关闭";
            break;
    }
    return state;
}

// 权限加载
function init_power(so_state) {
    var powerCount = 0;
    $.ajax({
        type: "POST",
        url: "/user/userJurisdiction",
        data: {
            url: "/service/serviceOperate",
            ucps_type: 2
        },
        dataType: "json"
    }).done(function (result) {

        $.each(result.menuLists, function (index, data) {
            console.log(data.ucps_name);
            so_state = so_state == 3100 ? 3200 : so_state;
            if (so_state == returnNumber(data.ucps_url)) {
                powerCount++;
            }
        });
        if (powerCount <= 0) {
            $("#step-content").hide();
        }
    });
}
