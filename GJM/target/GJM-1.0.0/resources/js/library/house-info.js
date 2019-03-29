var hi_code = getUrlParam("hi_code"); // 房屋编号
var body_title = $("title").text();
var conType;
var user_power = '';
var selectHouseIntention = null;
var cirId = null;
var caid = "";
$(function () {

    // 加载数据
    load_data();
    // 加载事件
    load_event();

});

//加载数据
function load_data(obj, param) {

    $.ajax({
        type: "POST",
        url: "/housePrice/queryHousePrice",
        data: {hi_code: getUrlParam("hi_code")},
        dataType: "json"
    }).done(function (result) {
        if (result.code !== 200) return;

        var data = result.data || "";
        $("#inPrice").val(data.hi_keepMoney);
        $("#systemPrice").val(data.systemPrice);
        $("#currentPrice").val(data.hi_price);
    });

    // 加载房源信息
    $.houseInfo(obj, param);
}

//加载事件
function load_event() {

    // ALL-菜单点击事件
    $(document).on("click", ".nav-menu", function () {
        load_data(this);
    });

    // ALL-头部选项卡事件
    $(document).on("click", ".nav-tab", function () {
        $(".nav-tab").removeClass("nav-tab-focus");
        $(this).addClass("nav-tab-focus");
    });

    // 结算订单-订单列表选中事件
    $(document).on("click", ".cancel-list-item", function () {
        cancelContractListener($(this));
    });

    // 窗口改变后，初始化IFRAME
    $(window).resize(function () {
        setIframeHeight();
    });

    // ====== 加载其他事件 ======

    // 房源详情
    $.houseInfo.load_event();

    // 合同管理
    $.contractList.load_event();

}

//【房屋概述】
(function ($) {

    /**
     * 房屋概述-加载数据
     * @param obj
     * @param param
     */
    $.houseInfo = function (obj, param) {
        $.ajax({
            url: "/houseLibrary/queryHouseInfo",
            data: {hi_code: hi_code},
            dataType: "json"
        }).done(function (result) {
            if (result.code !== 200) return;

            var data = result.data.houseLibraryInfo;
            var userCenter = result.data.userCenter;
            user_power = returnValue(result.data.user_power);

            // 招租状态
            var hi_isForRent = returnHouseIsForRent(data.hi_isForRent);
            // 招租了些
            var _forRentState = returnHouseForRentState(data.hi_forRentState);
            // 存房合同状态
            var contract_intoStatus = {
                text: data.contract_intoStatus,
                style: "hint"
            };
            switch (data.contract_intoStatus) {
                case "未签合同":
                    contract_intoStatus.style = "error";
                    break;
                case "已签合同":
                    contract_intoStatus.style = "next";
                    break;
                default :
                    contract_intoStatus.text = "合同完善中";
                    contract_intoStatus.style = "hint";
                    break;
            }

            // 出房合同状态
            var contract_outStatus = {
                text: data.contract_outStatus,
                style: "hint"
            };
            switch (data.contract_outStatus) {
                case "未签合同":
                    contract_outStatus.style = "error";
                    break;
                case "已签合同":
                    contract_outStatus.style = "next";
                    break;
                default :
                    contract_outStatus.text = "合同完善中";
                    contract_outStatus.style = "hint";
                    break;
            }

            // 房屋状态
            var _he_state = returnHouseState(data.he_state);
            switch (_he_state.title) {
                case "已解约":
                    contract_intoStatus.text = "已解约";
                    contract_outStatus.text = "已解约";
                    break;
            }

            // 头部
            var html =
                '<div class="table-item-box" style="margin-bottom: 0">' +
                '	<div class="table-item-box-top">' +
                '		<div class="item-box-top-title">' + returnValue(data.house_address) + '<div class="power-option-box1"></div></div>' +
                // '		<button class="item-box-top-option fa-angle-down" onclick="showMoreHouseInfo(this)"></button>' +
                '	</div>' +
                '	<div>NO.' + returnValue(data.hi_code) + '</div>' +
                '	<div class="table-item-box-main">' +
                '  		<dl>' +
                '           <dt>招租状态</dt>' +
                '           <dd class="' + hi_isForRent.style + '">' + hi_isForRent.text + '</dd>' +
                '       </dl>' +
                '  		<dl class="for-rent-type">' +
                '           <dt>招租类型</dt>' +
                '           <dd class="' + _forRentState.style + '">' + _forRentState.text + '</dd>' +
                '       </dl>' +
                '  		<dl>' +
                '           <dt>托管状态</dt>' +
                '           <dd class="' + contract_intoStatus.style + '">' + contract_intoStatus.text + '</dd>' +
                '       </dl>' +
                '  		<dl>' +
                '           <dt>租赁状态</dt>' +
                '           <dd class="' + contract_outStatus.style + '">' + contract_outStatus.text + '</dd>' +
                '       </dl>' +
                '	</div>' +
                '   <div class="table-item-box-nav">' +
                '       <a class="nav-menu nav-menu-focus" href="#contractList">合同管理</a>' +
                '       <a class="nav-menu" href="#contractTG">托管合同</a>' +
                '       <a class="nav-menu" href="#contractZL">租赁合同</a>' +
                '       <a class="nav-menu" href="#houseImage">房屋照片</a>' +
                '       <a class="nav-menu" href="#cancelContract">结算订单</a>' +
                '       <a class="nav-menu" href="#houseRecord">房管日志</a>' +
                '       <a class="nav-menu" href="#houseMonitor">房态监控</a>' +
                '       <a class="nav-menu " href="#rentManagement">招租管理</a>' +
                '   </div>' +
                '</div>';
            $("#main-head").html(html);

            // 隐藏招租类型
            if (data.hi_isForRent == 0) $("#main-head").find(".for-rent-type").hide();

            // 全局变量
            $("#hi_data").data("data", data);

            // 房源菜单定位
            $.houseInfo.position(obj, param);

            // 加载权限
            load_power();
        });
    };

    /**
     * 房屋概述-加载事件
     */
    $.houseInfo.load_event = function () {

        // 绑定合同管理按钮事件
        $(document).on("click", "button[name=contract]", function () {
            var _checked = $("input[name='houseContractNo']:checked");
            switch (_checked.length) {
                case 0:
                    $.hint.tip("请选择一个合同", "warning");
                    break;
                case 1:
                    var _data = _checked.data("data");
                    var state = _data.contractObject_State;
                    var optionState = returnNumber(_data.contractObject_OptionState);
                    var extState = returnNumber(_data.contractObject_ExtState);
                    var cno = _data.contractObject_No;
                    var con_code = _data.contractObject_Code;
                    var type = _data.contractObject_Type;
                    var code = _data.hi_code;
                    var cco_code = _data.cco_code;
                    var cco_applicationType = _data.cco_applicationType;
                    var cco_state = _data.cco_state;
                    switch ($(this).attr("id")) {
                        case "contractEdit": // 修改合同
                            if (!(state == 1 && (optionState == 101 || optionState == 103 || optionState == 105))) {
                                $.hint.tip("合同操作状态只有在[编辑]和[未通过]时才能修改", "warning");
                                return;
                            }
                            // if (_data.contractObject_Source == "PHONE") {
                            //     $.hint.tip("移动端合同不能在PC端修改，请在APP上修改该合同", "warning");
                            //     return;
                            // }
                            if (_data.contractObject_Source == "PHONE" && !isEmpty(_data.contractObject_CustomerSign)) {
                                $.hint.tip("该合同已签字，不能再作修改", "warning");
                                return;
                            }
                            window.parent.href_mo('/contractObject/jumpAddContract?mode=edit&contractObject_Code=' + con_code, '修改合同', body_title);
                            break;
                        case "propertyTransfer": // 物业交接
                            if (_data.contractObject_Source == "PHONE") {
                                $.hint.tip("请在APP上操作该合同", "warning");
                                return;
                            }
                            if (!(state == 1 && (optionState == 101 || optionState == 103 || optionState == 105) && extState != 12 && extState != 22)) {
                                $.hint.tip("合同操作状态只有在[编辑]和[未通过]时才能物业", "warning");
                                return;
                            }
                            $.ajax({
                                type: 'post',
                                url: '/contractObject/queryUpContractForRentOrder',
                                data: {
                                    con_code: con_code
                                },
                                dataType: 'json',
                                beforeSend: function () {
                                    $.hint.tip("请稍候，数据请求中..", "loading");
                                }
                            }).done(function (result) {
                                if (result.code !== 200) {
                                    $.hint.tip(result.msg, "error");
                                    return;
                                }
                                $.hint.close();
                                //
                                var cancelContract = result.data.cancelContract;
                                if (!isEmpty(cancelContract) && cancelContract.cco_applicationType == '转租') {
                                    if (cancelContract.cco_state == '完成') {
                                        window.parent.href_mo('/transferKeep/transfer?mode=normal&con_code=' + con_code, '物业交接', body_title);
                                    } else {
                                        $.jBox.confirm("该合同有转租交接结算未处理，是否需要立即处理？", "提示", function (v, h, f) {
                                            if (v) {
                                                window.parent.href_mo('/transferKeep/transfer?mode=compary&con_code=' + cancelContract.contractObject_Code, '交接结算', body_title);
                                            }
                                            return true;
                                        }, {
                                            buttons: {'立即处理': true, '暂不处理': false}
                                        });
                                    }
                                } else {
                                    window.parent.href_mo('/transferKeep/transfer?mode=normal&con_code=' + con_code, '物业交接', body_title);
                                }
                            });
                            break;
                        case "contractRenew": // 合同续约
                            if (!(state == 2 && optionState == 106)) {
                                $.jBox.tip("该合同不能续约", "warning");
                                return;
                            }
                            if (type == "租赁合同") {
                                var _dealDate = new Date(returnDate(_data.contractObject_DeadlineTime))
                                _dealDate = _dealDate.setFullYear(_dealDate.getFullYear(), _dealDate.getMonth() - 1, _dealDate.getDate());
                                if (_dealDate > new Date().getTime()) {
                                    $.jBox.tip("合同提前续约时间不应超过1个月", "warning");
                                    return;
                                }
                            }
                            window.parent.href_mo('/contractObject/jumpAddContract?mode=renew&contractObject_Code=' + con_code, '合同续约', body_title);
                            break;
                        case "contractAuditing": // 提交审核
                            if (_data.contractObject_Source == "PHONE") {
                                $.jBox.tip("请在APP上操作该合同", "warning");
                                return;
                            }
                            if (!(state == 1 && (optionState == 101 || optionState == 103 || optionState == 105))) {
                                $.jBox.tip("该合同无需提交审核", "warning");
                                return;
                            }
                            $.ajax({
                                type: "POST",
                                url: "/contractObject/submitContractAuditing",
                                data: {
                                    con_code: con_code
                                },
                                dataType: "json",
                                success: function (result) {
                                    switch (result.code) {
                                        case 200:
                                            $.jBox.tip("提交成功", "success");
                                            load_data();
                                            break;
                                        default :
                                            $.jBox.tip(result.msg, "warning");
                                            break;
                                    }
                                }
                            });
                            break;
                        case "contractVoid":  //合同作废
                            contractVoid(state, optionState, type, cno, con_code);
                            break;
                        case "changeContract": // 改签合同
                            if (!(state == 2 && optionState == 106)) {
                                $.jBox.tip("该合同不能改签", "warning");
                                return;
                            }
                            if (type == "租赁合同") {
                                return;
                            }
                            window.parent.href_mo('/contractObject/jumpAddContract?mode=change&contractObject_Code=' + con_code, '合同改签', body_title);
                            break;
                        case "cancelApply": // 解约申请
                            $.ajax({
                                type: "POST",
                                url: "/contractObject/isHouseContractRelease",
                                data: {
                                    hi_code: code
                                },
                                dataType: "json"
                            }).done(function (result) {
                                var tip = '<span class="error" style="font-size: 16px;">该合同不能申请解约</span><p style="line-height: 1.4em;">如果要解约托管合同，需要先处理完毕租赁合同</p>';
                                ;
                                switch (result.code) {
                                    case 200:
                                        if (result.data) {
                                            window.parent.href_mo('/contractObject/jumpCancelContractApply?mode=auditing&con_code=' + con_code, '合约申请', body_title);
                                        } else {
                                            $.jBox.error(tip, "提示");
                                        }
                                        break;
                                    default :
                                        $.jBox.error(tip, "提示");
                                        break;
                                }
                            });
                            break;
                        case "contractApply": // 合约申请
                            if (state != 2 && optionState != 106) {
                                $.jBox.tip("该合同不能合约申请", "warning");
                                return;
                            }
                            if (!isEmpty(cco_code) && cco_state != '取消') {
                                $.jBox.tip("该合同已" + (cco_applicationType == "退租" ? "强退" : cco_applicationType) + "，不能再申请合约", "warning");
                                return;
                            }
                            $.ajax({
                                type: "POST",
                                url: "/contractObject/isHavingVaildCancelContract",
                                data: {
                                    contractObject_No: cno,
                                    hi_code: code
                                },
                                dataType: "json"
                            }).done(function (result) {
                                if (result.code == 200) {
                                    $.jBox.tip("该合同已签订解约申请", "warning");
                                } else {
                                    window.parent.href_mo('/contractObject/jumpCancelContractApply?mode=auditing&con_code=' + con_code, '合约申请', body_title);
                                }
                            });
                            break;
                        case "contractAttach": // 信息附加
                            if (state != 2 && state != 1) {
                                $.jBox.tip("该合同不能合同修改", "warning");
                                return;
                            }
                            window.parent.href_mo('/contractObject/jumpContractAttach?con_code=' + con_code, '合同修改', body_title);
                            break;
                        case "itemAdd": // 物品添置
                            if (state != 2 && state != 1) {
                                $.jBox.tip("该合同不能添置物品", "warning");
                                return;
                            }
                            window.parent.href_mo('/contractObject/jumpItemAdd?con_code=' + con_code + '&hicode=' + code, '添置物品', body_title);
                            break;
                        default :
                            break;
                    }
                    break;
                default:
                    $.jBox.tip("只能选择一个合同", "warning");
                    break;
            }
        });

        // 显示隐藏金额
        $(document).on("change", "[name=look-money]", function () {
            if ($(this).is(":checked")) {
                if ($(this).attr("data-type") == "all") {
                    $("[name=look-money]").attr("checked", "checked").parent().removeClass("fa-eye").removeClass("next").addClass("fa-eye-slash").addClass("error");
                    var _siblings = $("[name=look-money]").not("[data-type=all]").parent().siblings(".c1-m1-rent-text");
                    _siblings.each(function () {
                        $(this).html("****").css({position: "relative", top: "5px"});
                    });
                } else {
                    $(this).attr("checked", "checked").parent().removeClass("fa-eye").removeClass("next").addClass("fa-eye-slash").addClass("error");
                    $(this).parent().siblings(".c1-m1-rent-text").html("****").css({position: "relative", top: "5px"});
                }
            } else {
                if ($(this).attr("data-type") == "all") {
                    $("[name=look-money]").removeAttr("checked").parent().removeClass("fa-eye-slash").removeClass("error").addClass("fa-eye").addClass("next");
                    var _siblings = $("[name=look-money]").not("[data-type=all]").parent().siblings(".c1-m1-rent-text");
                    _siblings.each(function () {
                        $(this).html($(this).attr("data-cache")).css({position: "relative", top: "0"});
                    });
                } else {
                    $(this).removeAttr("checked").parent().removeClass("fa-eye-slash").removeClass("error").addClass("fa-eye").addClass("next");
                    var _siblings = $(this).parent().siblings(".c1-m1-rent-text");
                    _siblings.html(_siblings.attr("data-cache")).css({position: "relative", top: "0"});
                }
            }
        });

        // 点击更多操作--托管
        $(document).on("click", "[name=more-option-tg]", function (e) {
            e.stopPropagation();
            var _data = $("#hi_data").data("data");

            $(".more-option-box").remove();
            var html = '';
            html += '<div class="more-option-box">';
            html += '	<button class="more-option-item" name="contract-realDate"><i class="fa-legal"></i>调整接房日期</button>';
            html += '</div>';
            var box = $(html).appendTo($(this).parent());

            box.find("[name=contract-realDate]").on("click", function () {
                var itemTG = $("#house-contractTG").find("[name=houseContractNo]:checked");
                if (itemTG.length < 1) {
                    $.jBox.tip("请选择一份托管合同", "hint");
                    return;
                }
                var data = itemTG.data("data");
                if (data.contractObject_State > 2) {
                    $.jBox.tip("该合同已失效，不能调整接房日期", "error");
                    return;
                }

                var realDate = isEmpty(data.contractObject_RealDate) ? returnate(data.contractObject_Date) : returnDate(data.contractObject_RealDate);
                var contract_limit = returnYearMonthDay(data.contractObject_Date, data.contractObject_DeadlineTime);

                var html = '';
                html += '<div class="bm-item" style="margin-top: 10px;"><div class="bm-item-left">合同期限：</div><div class="bm-item-right"><input value="' + contract_limit + '" style="width: 200px;" disabled></div></div>';
                html += '<div class="bm-item"><div class="bm-item-left">接房日期：</div><div class="bm-item-right"><input name="y-realDate" value="' + realDate + '" disabled><label class="ok" id="plus-day" style="margin-left: 8px;"></label></div></div>';
                html += '<div class="bm-item"><div class="bm-item-left">实际接房日期：</div>';
                html += '	<div class="bm-item-right">';
                html += '		<input name="realDate" placeholder="实际接房日期" readonly>';
                html += '		<label style="margin-left: 8px;cursor: pointer;"><input type="checkbox" name="isChange" style="position: relative;top: 2px;">改变账单<label class="hint fa-question-circle" title="只改变租金账单日期" style="font-size: 16px;margin-left: 4px;position: relative;top: 1px;"><label></label>';
                html += '	</div>';
                html += '</div>';
                html += '<div style="margin-top: 10px;border-top: 1px solid #ddd;">';
                html += '	<table class="bm-table" style="text-align: center;">';
                html += '		<thead>';
                html += '		    <tr>';
                html += '		    	<td>期数</td>';
                html += '		    	<td>类型</td>';
                html += '		    	<td>金额</td>';
                html += '		    	<td>状态</td>';
                html += '		    	<td>应还款日期</td>';
                html += '		    	<td class="next" style="border-left:1px solid #ddd;width: 120px;">变更日期</td>';
                html += '		    </tr>';
                html += '		</thead>';
                html += '		<tbody id="bm-body"></tbody>';
                html += '	</table>';
                html += '</div>';

                $.box({
                    title: '调整接房日期',
                    body: html,
                    footer: [{
                        name: "confirm",
                        text: "提交",
                    }, {
                        name: "cancel",
                        text: "取消",
                    }],
                    onEvent: function (box) {
                        // 改变日期
                        var changeDate = function (realDate) {
                            var items = box.find(".bill[data-type=0]");
                            var len = items.length;
                            var totalMonth = 0;
                            var month = 0;
                            switch (data.contractBody_PayStyle) {
                                case "月付":
                                    month = 1;
                                    break;
                                case "季付":
                                    month = 3;
                                    break;
                                case "半年付":
                                    month = 6;
                                    break;
                                case "年付":
                                    month = 12;
                                    break;
                            }

                            for (var i = 0; i < len; i++) {
                                var item = items.eq(i);
                                var itemChangeDate = new Date(realDate);
                                itemChangeDate.setMonth(itemChangeDate.getMonth() + totalMonth);

                                if (box.find(".bill[data-cycle=0]").length > 0) {
                                    if (returnNumber(item.attr("data-cycle")) != 0) {
                                        item.html(returnDate(itemChangeDate));
                                    }
                                } else {
                                    if (returnNumber(item.attr("data-cycle")) != 1) {
                                        item.html(returnDate(itemChangeDate));
                                    }
                                }

                                item.attr("data-change-date", returnDate(itemChangeDate));
                                totalMonth += month;
                            }
                        };

                        // 改变账单按钮
                        box.find("[name=isChange]").on("change", function () {
                            if ($(this).is(":checked") && !isEmpty(box.find("[name=realDate]").val())) {
                                var realDate = box.find("[name=realDate]").val();
                                changeDate(realDate);
                            } else {
                                box.find(".bill[data-state=2]").empty();
                            }
                        });

                        // 改变交房日期
                        box.find("[name=realDate]").on("focus", function () {
                            WdatePicker({
                                minDate: returnDate(data.contractObject_FillTime),
                                onpicked: function (dp) {
                                    var yRealDate = $("[name=y-realDate]").val();
                                    var realDate = box.find("[name=realDate]").val();
                                    var day = returnDay(yRealDate, realDate);
                                    $("#plus-day").html((day > 0 ? "+" + day : day) + "天");

                                    if (box.find("[name=isChange]").is(":checked")) {
                                        changeDate(realDate);
                                    }
                                }
                            });
                        });

                        // 确定
                        box.find("[name=confirm]").on("click", function () {
                            var realDate = box.find("[name=realDate]");
                            if (isEmpty(realDate.val())) {
                                $.jBox.tip("请选择实际接房日期", "error");
                                return;
                            }

                            $.ajax({
                                type: "POST",
                                url: "/contractObject/updateContractRealDate",
                                data: {
                                    con_code: data.contractObject_Code,
                                    con_realDate: realDate.val(),
                                    isChange: box.find("[name=isChange]").is(":checked")
                                },
                                dataType: "json",
                            }).done(function (result) {
                                if (result.code != 200) {
                                    $.jBox.tip(result.msg, "error");
                                    return;
                                }
                                $.box.close();
                                $.jBox.tip("调整成功！", "success");

                                // 重新加载数据
                                load_data();
                            });
                        });

                        // 取消
                        box.find("[name=cancel]").on("click", function () {
                            $.box.close();
                        });
                    },
                    onData: function (box) {
                        $.ajax({
                            type: "POST",
                            url: "/contractObject/queryContractBillList",
                            data: {
                                con_code: data.contractObject_Code
                            },
                            dataType: "json",
                        }).done(function (result) {
                            if (result.code != 200) return;

                            contractOrder = result.data.contractOrder;
                            contractBillList = result.data.contractBillList || "";

                            box.find("#bm-body").empty();
                            $.each(contractBillList, function (index, data) {
                                var _state = returnBillState(data.bcb_state);
                                var html = '';
                                html += '<tr>';
                                html += '	<td>' + (data.bcb_cycle == 0 ? "首期" : data.bcb_cycle) + '</td>';
                                html += '	<td class="' + (data.bcb_type == 0 ? "next" : "") + '">' + returnBillType(data.bcb_type) + '</td>';
                                html += '	<td class="error">' + returnFloat(data.bcb_repayment) + '元</td>';
                                html += '	<td class="' + _state.style + '">' + _state.text + '</td>';
                                html += '	<td>' + returnDate(data.bcb_repaymentDate) + '</td>';
                                html += '	<td class="bill" data-type="' + data.bcb_type + '" data-cycle="' + data.bcb_cycle + '" data-state="' + data.bcb_state + '" data-date="' + returnDate(data.bcb_repaymentDate) + '" style="border-left:1px solid #ddd;width: 120px;"></td>';
                                html += '</tr>';
                                box.find("#bm-body").append(html);
                            });
                        });
                    }
                });
            });
        });

        // 点击更多操作--租赁
        $(document).on("click", "[name=more-option-zl1]", function (e) {
            e.stopPropagation();
            var _data = $("#hi_data").data("data");

            $(".more-option-box").remove();
            var html = '';
            html += '<div class="more-option-box">';
            html += '	<button class="more-option-item" name="house-reprice"><i class="fa-legal"></i>重新定价</button>';
            html += '	<button class="more-option-item" name="house-reprice-record"><i class="fa-reorder"></i>定价记录</button>';
            html += '</div>';
            var box = $(html).appendTo($(this).parent());

            // 事件-重新定价
            $("[name=house-reprice]").on("click", function () {
                if (isEmpty(_data.contract_beginDate)) {
                    jBox.tip("请签订托管合同后再定价", "warning");
                    return;
                }
                // 新存|转租
                if (_data.hi_forRentState == 1001) {
                    if (new Date(returnDate(new Date())).getTime() - returnNumber(new Date(returnDate(_data.contract_beginDate)).getTime()) > 7 * 24 * 60 * 60 * 1000) {
                        jBox.tip("已超过定价限定期（新存房7天以内仅能定价一次），不能重新定价", "warning");
                        return;
                    } else {
                        if (returnNumber(_data.hi_priceCount) > 0) {
                            jBox.tip("定价限定期内，您已经定价过一次，不能重新定价", "warning");
                            return;
                        }
                    }
                }
                if (!(_data.hi_forRentState == 1001 || _data.hi_forRentState == 1002)) {
                    jBox.tip("只能在新存招租和转租招租时，才能重新定价", "warning");
                    return;
                }

                $.ajax({
                    type: "POST",
                    url: "/housePrice/queryHousePrice",
                    data: {
                        hi_code: getUrlParam("hi_code"),
                    },
                    dataType: "json",
                }).done(function (result) {
                    if (result.code != 200) return;

                    var data = result.data || "";

                    var param = {
                        inPrice: data.hi_keepMoney,
                        systemPrice: data.systemPrice,
                        currentPrice: data.hi_price
                    };

                    $(".custom-box").remove();

                    var html = '';
                    html += '<div class="custom-box">';
                    html += '	<div class="custom-box-mask"></div>';
                    html += '	<div class="custom-box-head">';
                    html += '		<div class="custom-box-head-title">房源定价</div>';
                    html += '		<div class="custom-box-head-close error"><i class="fa-close"></i></div>';
                    html += '	</div>';
                    html += '	<div class="custom-box-main">';
                    html += '		<div class="reprice-box" style="flex: 3;position: relative;padding: 10px;">';
                    html += '			<div class="reprice-box-item">';
                    html += '				<div class="reprice-box-item-subitem item-subitem-title">存房价格</div>';
                    html += '				<div class="reprice-box-item-subitem"><input value="' + returnFloat(param.inPrice) + '" disabled></div>';
                    html += '				<div class="reprice-box-item-subitem" style="padding-left: 10px;">元/月</div>';
                    html += '			</div>';
                    html += '			<div class="reprice-box-item">';
                    html += '				<div class="reprice-box-item-subitem item-subitem-title">系统定价</div>';
                    html += '				<div class="reprice-box-item-subitem"><input value="' + returnFloat(param.systemPrice) + '" disabled></div>';
                    html += '				<div class="reprice-box-item-subitem" style="padding-left: 10px;">元/月</div>';
                    html += '			</div>';
                    html += '			<div class="reprice-box-item">';
                    html += '				<div class="reprice-box-item-subitem item-subitem-title">当前定价</div>';
                    html += '				<div class="reprice-box-item-subitem"><input value="' + returnFloat(param.currentPrice) + '" disabled></div>';
                    html += '				<div class="reprice-box-item-subitem" style="padding-left: 10px;">元/月</div>';
                    html += '			</div>';
                    html += '			<div class="reprice-box-item">';
                    html += '				<div class="reprice-box-item-subitem item-subitem-title">我的定价</div>';
                    html += '				<div class="reprice-box-item-subitem"><input class="money" name="reprice-value" maxlength="11"></div>';
                    html += '				<div class="reprice-box-item-subitem" style="padding-left: 10px;">元/月</div>';
                    html += '			</div>';
                    html += '			<div class="reprice-box-item">';
                    html += '				<div class="reprice-box-item-subitem item-subitem-title"></div>';
                    html += '				<div class="reprice-box-item-subitem"><button name="savePrice">提交</button></div>';
                    html += '				<div class="reprice-box-item-subitem"></div>';
                    html += '			</div>';
                    html += '		</div>';
                    html += '		<div class="reprice-record" style="position: relative;flex: 2;border-left: 1px solid #ddd;max-height: 413px;">记录</div>';
                    html += '	</div>';
                    html += '</div>';
                    var subBox = $(html).appendTo("body");

                    // 转租时，查询最新一份合同
                    if (_data.hi_forRentState == 1002) {
                        $.ajax({
                            type: "POST",
                            url: "/contractObject/queryContractLastOne",
                            data: {
                                hi_code: getUrlParam("hi_code"),
                                con_type: "租赁合同"
                            },
                            dataType: "json",
                        }).done(function (result) {
                            if (result.code != 200) return;
                            var contractObject = result.data.contractObject || "";
                            subBox.find("[name=reprice-value]").attr("data-cache-rent", contractObject.contractBody_Rent);
                        });
                    }

                    // 定价记录
                    $.ajax({
                        type: "POST",
                        url: "/record/queryHousePriceRecord",
                        data: {
                            hi_code: getUrlParam("hi_code"),
                        },
                        dataType: "json",
                    }).done(function (result) {
                        if (result.code != 200) return;
                        var priceRecordList = result.data.priceRecordList;
                        if (priceRecordList == null || priceRecordList.length == 0) {
                            subBox.find(".reprice-record").html('<div style="text-align: center;line-height: 60px;font-size: 14px;">暂无记录</div>');
                            return;
                        }
                        $.each(priceRecordList, function (index, data) {
                            var html = '';
                            html += '<div style="padding: 5px 10px;border-bottom: 1px solid #ddd;">';
                            html += '	<div style="line-height: 24px;color: #000;"><span><strong>' + returnDate(data.hpp_createTime, "yyyy-MM-dd ") + '</strong>' + returnDate(data.hpp_createTime, "HH:mm:ss") + '</span></div>';
                            html += '	<div style="line-height: 24px;display: flex;"><span style="flex:1;color: #000;">' + returnValue(data.hpp_content) + '</span><span>' + returnValue(data.em_name) + '</span></div>';
                            html += '</div>';
                            subBox.find(".reprice-record").append(html);
                        });
                    });

                    // 聚焦重新定价文本框
                    subBox.find("[name=reprice-value]").focus();

                    // 关闭页面
                    subBox.find(".custom-box-head-close").on("click", function () {
                        subBox.remove();
                    });

                    // 提交定价
                    subBox.find("[name=savePrice]").on("click", function () {
                        var price = subBox.find("[name=reprice-value]").val();
                        var cacheRent = subBox.find("[name=reprice-value]").attr("data-cache-rent");
                        if (!isEmpty(cacheRent)) {
                            if (returnFloat(price) < returnFloat(cacheRent)) {
                                jBox.tip("转租招租房源定价不能低于前租赁合同租金", "error");
                                return;
                            }
                        }
                        $.ajax({
                            type: "POST",
                            url: "/housePrice/updateHousePrice",
                            data: {
                                hi_code: getUrlParam("hi_code"),
                                hi_price: price,
                            },
                            dataType: "json",
                        }).done(function (result) {
                            if (result.code != 200) {
                                $.jBox.tip(result.msg, "error");
                                return;
                            }
                            $.jBox.tip("更新成功", "success");
                            $("[name=hi_money]").val(subBox.find("[name=reprice-value]").val());
                            subBox.remove();
                            $.houseInfo();
                        });
                    });

                });
            });

            // 事件-记录
            box.find("[name=house-reprice-record]").on("click", function () {
                var html = '';
                html += '<div class="custom-box">';
                html += '	<div class="custom-box-mask"></div>';
                html += '	<div class="custom-box-head">';
                html += '		<div class="custom-box-head-title">定价记录</div>';
                html += '		<div class="custom-box-head-close error"><i class="fa-close"></i></div>';
                html += '	</div>';
                html += '	<div class="custom-box-main">';
                html += '		<div class="reprice-record" style="position: relative;flex: 2;border-left: 1px solid #ddd;height: 413px;">记录</div>';
                html += '	</div>';
                html += '</div>';
                var subBox = $(html).appendTo("body");

                // 关闭页面
                subBox.find(".custom-box-head-close").on("click", function () {
                    subBox.remove();
                });

                // 加载数据-定价记录
                $.ajax({
                    type: "POST",
                    url: "/record/queryHousePriceRecord",
                    data: {
                        hi_code: getUrlParam("hi_code"),
                    },
                    dataType: "json",
                }).done(function (result) {
                    if (result.code != 200) return;
                    var priceRecordList = result.data.priceRecordList;
                    if (priceRecordList == null || priceRecordList.length == 0) {
                        subBox.find(".reprice-record").html('<div style="text-align: center;line-height: 60px;font-size: 14px;">暂无记录</div>');
                        return;
                    }
                    $.each(priceRecordList, function (index, data) {
                        var html = '';
                        html += '<div style="padding: 5px 10px;border-bottom: 1px solid #ddd;">';
                        html += '	<div style="line-height: 24px;color: #000;"><span><strong>' + returnDate(data.hpp_createTime, "yyyy-MM-dd ") + '</strong>' + returnDate(data.hpp_createTime, "HH:mm:ss") + '</span></div>';
                        html += '	<div style="line-height: 24px;display: flex;"><span style="flex:1;color: #000;">' + returnValue(data.hpp_content) + '</span><span>' + returnValue(data.em_name) + '</span></div>';
                        html += '</div>';
                        subBox.find(".reprice-record").append(html);
                    });

                });
            });
        });

        $(document).on("click", function () {
            $(".more-option-box").remove();
        });

    };

    /**
     * 房屋概述-菜单定位
     * @param obj
     * @param param
     */
    $.houseInfo.position = function (obj, param) {
        var _hash = $(obj).attr("href") || window.location.hash;
        switch (_hash) {
            case "#contractList":
                $.contractList();
                break;
            case "#contractTG":
                $.contractInfo("托管合同", param);
                break;
            case "#contractZL":
                $.contractInfo("租赁合同", param);
                break;
            case "#houseImage":
                $.houseImage();
                break;
            case "#cancelContract":
                cancelContract(param);
                break;
            case "#houseRecord":
                houseRecord(1);
                break;
            case "#houseMonitor":
                houseMonitor();
                break;
            case "#rentManagement":
                houseRentManagement();
                break;
            default:
                $.contractList();
                break;
        }

        $(".nav-menu").each(function () {
            if ($(this).attr("href") == _hash) {
                $(".nav-menu").removeClass("nav-menu-focus");
                $(this).addClass("nav-menu-focus");
                return false;
            }
        });
    };

})(jQuery);

//【合同管理】
(function ($) {

    /**
     * 合同管理-加载数据
     */
    $.contractList = function () {
        var houseData = $("#hi_data").data("data") || "";
        // 月付
        var outMoney = houseData.hi_price == 0 ? 0 : houseData.hi_price * (1 + (5.0 / 100));
        // 季付
        var seasonMoney = houseData.hi_price == 0 ? 0 : houseData.hi_price;
        // 半年付
        var halfYearMoney = houseData.hi_price == 0 ? 0 : houseData.hi_price * (1 - (3.0 / 100));
        // 年付
        var yeayMoney = houseData.hi_price == 0 ? 0 : houseData.hi_price * (1 - (5.0 / 100));

        var html = '';
        html += '<div class="box-content">';
        html += '	<div class="sub-title" style="border-bottom:none;">';
        html += '		<table style="font-size: 14px;color:#000000">';
        html += '		    <thead class="content-item-main">';
        html += '	    	<tr class="item-main-tr" style="background: none;border: none;">';
        html += '  	    		<td class="c1-m1-id">#</td>';
        html += '  	    		<td class="c1-m1-no" style="font-weight: normal">合同编号</td>';
        html += '  	    		<td class="c1-m1-date">起止日期</td>';
        html += '  	    		<td class="c1-m1-customer">客户</td>';
        html += '  	    		<td class="c1-m1-revenue">总营收</td>';
        html += '  	    		<td class="c1-m1-rent">租金<label class="look-money fa-eye-slash error" style="line-height: 40px;"><input type="checkbox" name="look-money" data-type="all" checked></label></td>';
        html += '  	    		<td class="c1-m1-houseState">存出状态</td>';
        html += '  	    		<td class="c1-m1-state">合同状态</td>';
        html += '  	    		<td class="c1-m1-optionState">操作状态</td>';
        html += '	    	</tr>';
        html += '		    </thead>';
        html += '		</table>';
        html += '	</div>';
        html += '</div>';
        // 托管合同
        html += '<div class="box-content">';
        html += '	<div class="sub-title">';
        html += '		<ul class="title-nav">';
        html += '			<li class="visited" data-id="itemlist">托管合同</li>';
        html += '			<li class="title-nav-content">';
        html += '				<button id="add-TG" class="item-box-main-option fa-plus" title="添加托管合同"></button>';
        html += '				<button name="more-option-tg" class="item-box-main-option fa-ellipsis-v" title="更多"></button>';
        html += '			</li>';
        html += '		</ul>';
        html += '	</div>';
        html += '	<div class="sub-content" style="padding: 0;">';
        html += '		<table id="contract-manage">';
        html += '		    <tbody class="content-item-main" id="house-contractTG"><tr><td colspan="10"><div class="loading"></div></td></tr></tbody>';
        html += '		</table>';
        html += '	</div>';
        html += '</div>';
        // 租赁合同
        html += '<div class="box-content">';
        html += '	<div class="sub-title">';
        html += '		<ul class="title-nav">';
        html += '			<li class="visited" data-id="itemlist">租赁合同</li>';
        html += '			<li class="title-nav-content" style="padding-left:4px">';
        html += '				<button id="add-ZL" class="item-box-main-option fa-plus" title="添加租赁合同"></button>';
        html += '				<button name="more-option-zl" class="item-box-main-option fa-ellipsis-v" title="更多"></button>';
        html += '			</li>';
        html += '			<li class="title-nav-content" style="display: flex;flex-direction: row-reverse;padding: 6px 0 6px;margin: 0;">';
        html += '			    <input id="keepMoney" type="hidden" value="' + returnFloat(houseData.hi_keepMoney) + '">';
        html += '			    <input id="outMoneyInput" type="hidden" value="' + outMoney + '">';
        html += '			    <input id="seasonMoneyInput" type="hidden" value="' + seasonMoney + '">';
        html += '			    <input id="halfYearMoneyInput" type="hidden" value="' + halfYearMoney + '">';
        html += '			    <input id="yeayMoneyInput" type="hidden" value="' + yeayMoney + '">';
        html += '				<button id="showMoreBtn" class="item-box-main-option fa-map-signs" title="其它支付统一出房价"></button>';
        html += '			</li>';
        html += '			<li class="title-nav-content">';
        html += '			    <label style="width: auto;line-height: 40px;color: #666;font-weight: bold;">统一出房价</label>';
        html += '			    <label class="money-zl money-font20" style="width: auto;line-height: 38px;height: 40px;font-weight: bold;">' + seasonMoney + '</label>';
        html += '			    <label style="width: auto;line-height: 40px;color: #666;margin-left: 8px;font-weight: bold;">元</label>';
        html += '			</li>';
        html += '		</ul>';
        html += '	</div>';
        html += '	<div class="sub-content" style="padding: 0;">';
        html += '		<table id="contract-manage">';
        html += '		    <tbody class="content-item-main" id="house-contractZL"><tr><td colspan="10"><div class="loading"></div></td></tr></tbody>';
        html += '		</table>';
        html += '	</div>';
        html += '</div>';
        // 操作
        html += '<div class="box-content" style="box-shadow: none;">';
        html += '	<div class="sub-content" style="padding: 0;border-top: none;">';
        html += '		<table class="content-item-bottom">';
        html += '			<tr>';
        html += '			    <td colspan="10">';
        html += '			        <div class="item-foot-left">';
        html += '			        	<button id="contractEdit" name="contract">修改合同</button>';
        html += '			        	<button id="propertyTransfer" name="contract">交接结算</button>';
        html += '			        	<button id="contractRenew" name="contract">合同续约</button>';
        html += '			        	<button id="contractAuditing" name="contract">提交审核</button>';
        html += '			        </div>';
        html += '			        <div class="item-foot-right">';
        html += '			        	<div class="power-option-box3" style="display: inline-block;"></div>';
        html += '			        	<button id="changeContract" name="contract">改签合同</button>';
        html += '			        	<button id="cancelApply" name="contract">申请解约</button>';
        html += '			        	<button id="contractApply" name="contract">招租申请</button>';
        html += '			        	<button id="contractAttach" name="contract">合同维护</button>';
        html += '			        	<button id="itemAdd" name="contract">物品添置</button>';
        html += '			        </div>';
        html += '				</td>';
        html += '			</tr>';
        html += '		</table>';
        html += '	</div>';
        html += '</div>';
        $("#contentShow").html(html);

        $.ajax({
            type: "POST",
            url: "/contractObject/queryHouseContractInfoList",
            data: {
                hi_code: hi_code
            },
            dataType: "json",
        }).done(function (result) {
            if (result.code != 200) {
                $("#house-contractTG,#house-contractZL").html('<div class="contract1" style="display:none"><a class="contract-add" href="javascript:load_data();"><i class="icon-info-sign"></i>' + result.msg + '</a></div>');
                return;
            }

            var tgCount = 0;
            $.each(result.data.viewContractInfo, function (index, data) {
                if (data.contractObject_Type == "托管合同") {
                    tgCount++;
                }
            });
            if (tgCount == 0) {
                $("#add-TG").removeAttr("disabled");
            } else {
                $("#add-TG").attr("disabled", "disabled");
            }
            $("#house-contractTG").empty().parents(".sub-content").hide();
            $("#house-contractZL").empty().parents(".sub-content").hide();
            $("#charts-contract").empty();

            // 遍历数据
            $.each(result.data.viewContractInfo, function (index, data) {
                var html = "",
                    state_class = "",
                    option_state_class = "",
                    extState = returnContractExtendState(data.contractObject_ExtState).text;
                var contract_limit = returnYearMonthDay(data.contractObject_Date, data.contractObject_DeadlineTime);

                // 合同状态
                var state = returnContractState(data.contractObject_State);

                // 合同操作状态
                var _OptionState = returnContractOptionState(data.contractObject_OptionState);
                var expire_state = "";
                if (isEmpty(data.cco_code)) {
                    if (data.contractObject_OptionState == 106) {
                        option_state_class = 'ok';
                        var startDate = new Date(data.ontractObject_DeadlineTime);
                        var nowDate = new Date();
                        var d = nowDate.getTime() - startDate.getTime();
                        if (d > 0) { // 超期
                            expire_state = '<i title="合同已超期' + returnDay(startDate, nowDate) + '天，请及时处理">超期<label>' + returnDay(startDate, nowDate) + '</label></i>';
                        } else if (Math.abs(d) < 30 * 24 * 60 * 60 * 1000) {
                            expire_state = '<i style="background:#18bc9c" title="合同还有' + returnDay(nowDate, startDate) + '天到期，请及时处理">到期<label>' + returnDay(nowDate, startDate) + '</label></i>';
                        }
                    }
                } else {
                    if (data.cco_state != '取消') {
                        _OptionState.color = 'next';
                        _OptionState.title = returnValue(data.cco_applicationType == "退租" ? "强退" : data.cco_applicationType) + returnValue(data.cco_state);

                        var cco_html = "";
                        cco_html += '<a class="next" href="#cancelContract" onclick="load_data(this,\'' + data.contractObject_No + '\')">' + _OptionState.title + '</a>';
                        cco_html += '<div class="icon-exclamation-sign" data-type="date" data-hint="申请日期：' + returnDate(data.cco_applicationTime) + '&nbsp;&nbsp;' + returnValue(data.cco_applicationType == "退租" ? "强退" : data.cco_applicationType) + '日期：' + returnDate(data.cco_handleDate) + '"></div>';
                        _OptionState.title = cco_html;
                    }
                }
                var startEndDate_html = "";
                if (data.contractObject_Type == "托管合同") {
                    if (returnFloat(data.contract_forRentDate) != 0) {
                        startEndDate_html = '<label class="item-forRentDate" data-title="空" title="空置期 ' + returnFloat(data.contract_forRentDate) + ' 天">' + returnFloat(data.contract_forRentDate < 0 ? 0 : data.contract_forRentDate) + '<label>';
                    }
                } else {
                    startEndDate_html = '<label class="item-forRentDate" data-title="招" title="招租期 ' + returnFloat(data.contract_forRentDate) + ' 天">' + returnFloat(data.contract_forRentDate < 0 ? 0 : data.contract_forRentDate) + '<label>';
                }

                // 生日图标
                var _birthday = "";
                if (isBirthday(data.cc_cardNum)) {
                    _birthday = '<i class="fa-birthday-cake"></i>';
                }
                // 手机图标
                var _customer_phone = "";
                _customer_phone += '<div class="icon-exclamation-sign next hint-phone' + data.contractObject_Code + '" data-type="phone" ></div>';

                // 业绩图标
                var _contract_achi = "";
                var _achi = '&nbsp;';
                var _achi_id = '';
                var _sa_id = isEmpty(data.sa_id) ? null : returnValue(data.sa_id);
                if (data.contractObject_Type == "租赁合同") {
                    _contract_achi += '<i class="fa-chevron-circle-down next ' + data.contractObject_Code + '" data-type="achi"></i>';
                    _achi = returnMoney(data.sa_sumMoneyH) == 0 ? "--" : returnMoney(data.sa_sumMoneyH);
                    _achi_id = 'id="item-main-tr-more' + data.contractObject_No + '"';
                }

                var item_style = '';
                if (data.contractObject_Type == "托管合同") {
                    var contract_len = $("#house-contractTG").find(".item-main-tr").length;
                    if (contract_len == 0) {
                        item_style = "border-top: none;";
                    }
                } else {
                    var contract_len = $("#house-contractZL").find(".item-main-tr").length;
                    if (contract_len == 0) {
                        item_style = "border-top: none;";
                    }
                }

                var money_html = '';
                money_html += '<span class="c1-m1-rent-text" style="position: relative; top: 5px;" data-cache="' + returnMoney(data.contractObject_RentFreeMode == 1 ? (data.contractBody_Rent / 12) : data.contractBody_Rent, 2) + '">****</span>';
                money_html += '<label class="look-money fa-eye-slash error"><input type="checkbox" name="look-money" checked></label>';

                html += '<tr class="item-main-tr" style="' + item_style + '">';
                html += '	<td class="c1-m1-id"><label class="common-checkbox"><input type="radio" name="houseContractNo"></label></td>';
                html += '	<td class="c1-m1-no"><a href="' + (data.contractObject_Type == "托管合同" ? '#contractTG' : '#contractZL') + '" onclick="GotoUrl(this,\'' + returnValue(data.contractObject_No) + '\')" title="管家：' + returnValue(data.em_name) + '">' + returnValue(data.contractObject_No) + '</a></td>';
                html += '	<td class="c1-m1-date">' + (returnDate(data.contractObject_Date) + "~" + returnDate(data.contractObject_DeadlineTime)) + '&nbsp;<label class="next">[&nbsp;' + returnYearMonthDay(returnDate(data.contractObject_Date), returnDate(data.contractObject_DeadlineTime)) + '&nbsp;]</label>' + expire_state + startEndDate_html + '</td>';
                html += '	<td class="c1-m1-customer">' + _birthday + '<a class="customer-title" onclick="targetCustomer(\'' + data.cc_code + '\')" data-code="' + data.cc_code + '" title="' + returnValue(data.cc_name) + '">' + returnValue(data.cc_name) + '</a>' + _customer_phone + '</td>';
                html += '	<td class="c1-m1-revenue-text" onclick="achievementMoreShow(this,' + _sa_id + ',' + data.contractObject_goodsMoney + ',null,\'' + returnValue(data.contractObject_No) + '\')" title="查看详情业绩">' + _achi + _contract_achi + '</td>';
                html += '	<td class="c1-m1-rent">' + money_html + '</td>';
                html += '	<td class="c1-m1-houseState">' + extState + '</td>';
                html += '	<td class="c1-m1-state ' + state.style + '">' + state.text + '</td>';
                html += '	<td class="c1-m1-optionState ' + _OptionState.color + '">' + _OptionState.title + '</td>';
                html += '</tr>';
                html += '<tr class="item-main-tr-more" ' + _achi_id + '>';
                html += '	<td colspan="10" style="border: 1px solid #90c3e4;"></td>';
                html += '</tr>';

                if (data.contractObject_Type == "托管合同") {
                    $(html).hide().appendTo("#house-contractTG").fadeIn();
                    $("#house-contractTG input[name=houseContractNo]:last").data("data", data);
                    $("#house-contractTG").parents(".sub-content").css({borderTop: "0"}).show();
                } else {
                    $(html).hide().appendTo("#house-contractZL").fadeIn();
                    $("#house-contractZL input[name=houseContractNo]:last").data("data", data);
                    $("#house-contractZL").parents(".sub-content").css({borderTop: "0"}).show();
                }
                $(".item-main-tr-more").hide();

                // 设置数据
                $.each(data.customerPhones || "", function (index, subData) {
                    subData.cc_code = data.cc_code;
                });
                $(".hint-phone" + data.contractObject_Code).data("data", data.customerPhones);
                if (isBirthday(data.cc_cardNum)) {
                    $(".hint-phone" + data.contractObject_Code).data("birthday", "今天是TA的生日哦！");
                }
            });
            var _house_data = $("#hi_data").data("data");
            if (_house_data.contract_intoStatus == '未签合同') {
                if ($("#house-contractTG").find(".contract-add").length < 1) {
                    $("#add-TG").removeAttr("disabled");
                }
            }
            if (_house_data.hi_forRentState != 1021) {
                $("#add-ZL").removeAttr("disabled");
            }

            $("#add-TG").click(function () {
                contractAdd(hi_code, 'addTG');
            });
            $("#add-ZL").click(function () {
                contractAdd(hi_code, 'addZL');
            });

            // 计算IFRAME高度
            setIframeHeight();

            // 显示提示
            $(".icon-exclamation-sign").hover(function (e) {
                $(".info-more").remove();
                var _box = $(this);
                var _type = _box.attr("data-type");
                var html = "";
                switch (_type) {
                    case "phone":
                        html += '<div class="info-more">';
                        if (!isEmpty(_box.data("birthday"))) {
                            html += '<div class="info-more-title">' + _box.data("birthday") + '<label class="send-msg">祝福一下</label></div>';
                        }
                        html += '	<div class="info-more-content">';
                        if (isEmpty(_box.data("data"))) {
                            html += '没有发现手机号码';
                        } else {
                            $.each(_box.data("data"), function (index, data) {
                                if (data.ccp_state == 1) {
                                    html += '<div class="more-content-item">';
                                    html += '	<label class="item-prefix" style="background: #1ABC9C;">常用</label>';
                                    html += '	<label class="next" style="padding: 0 6px;">' + returnFormatPhone(data.ccp_phone) + '</label>';
                                    html += '	<label class="item-suffix" onclick="hideShowMessage(\'' + data.cc_code + '\')">发送短信</label>';
                                    html += '</div>';
                                }
                            });
                            $.each(_box.data("data"), function (index, data) {
                                if (data.ccp_state == 2) {
                                    html += '<div class="more-content-item">';
                                    html += '	<label class="item-prefix">备用</label>';
                                    html += '	<label class="next" style="padding: 0 6px;">' + returnFormatPhone(data.ccp_phone) + '</label>';
                                    html += '	<label class="item-suffix" onclick="hideShowMessage(\'' + data.cc_code + '\')">发送短信</label>';
                                    html += '</div>';
                                }
                            });
                        }
                        html += '	</div>';
                        html += '</div>';
                        break;
                    case "date":
                        html += '<div class="info-more">' + _box.attr("data-hint") + '</div>';
                        break;
                    default :
                        break;
                }
                $(html).appendTo(_box);
                $(".info-more").css({
                    top: -$(".info-more").height() - 6,
                    left: -$(".info-more").width()
                });

                $(this).click(function (e) {
                    e.stopPropagation();
                });
                $(".info-more").click(function (e) {
                    e.stopPropagation();
                });
                $(document).on("click", function () {
                    $(".info-more").remove();
                });
            }, function () {
                $(".info-more").remove();
            });
        });

        // 支付统一出房价
        $("#showMoreBtn").on("click", function () {
            var box = $(".info-more-list");
            if (box.is(":visible")) {
                box.remove();
                return;
            }
            // 月付
            var outMoney = $("#outMoneyInput").val();
            // 季付
            var seasonMoney = $("#seasonMoneyInput").val();
            // 半年付
            var halfYearMoney = $("#halfYearMoneyInput").val();
            // 年付
            var yeayMoney = $("#yeayMoneyInput").val();

            var html = "";
            html += '<div class="info-more-list">';
            html += '	<div class="more-content-item">';
            html += '		<label class="item-prefix" style="width: 40px;background: #bfc1c1;color: #fff;line-height: 20px;border-radius: 3px;margin: 4px 4px 4px auto;">月付</label>';
            html += '		<label class="money-font20" style="">' + returnNumber(outMoney) + '</label>';
            html += '		<label>元</label>';
            html += '	</div>';
            html += '	<div class="more-content-item">';
            html += '		<label class="item-prefix" style="width: 40px;background: #bfc1c1;color: #fff;margin: 4px auto;line-height: 20px;border-radius: 3px;margin-right: 4px;">季付</label>';
            html += '		<label class="money-font20" style="">' + returnNumber(seasonMoney) + '</label>';
            html += '		<label>元</label>';
            html += '	</div>';
            html += '	<div class="more-content-item">';
            html += '		<label class="item-prefix" style="width: 40px;background: #bfc1c1;color: #fff;margin: 4px auto;line-height: 20px;border-radius: 3px;margin-right: 4px;">半年付</label>';
            html += '		<label class="money-font20" style="">' + returnNumber(halfYearMoney) + '</label>';
            html += '		<label>元</label>';
            html += '	</div>';
            html += '	<div class="more-content-item">';
            html += '		<label class="item-prefix" style="width: 40px;background: #bfc1c1;color: #fff;line-height: 20px;border-radius: 3px;margin: 4px 4px 4px auto;">年付</label>';
            html += '		<label class="money-font20" style="">' + returnNumber(yeayMoney) + '</label>';
            html += '		<label>元</label>';
            html += '	</div>';
            html += '</div>';
            box = $(html).appendTo($(this).parent());
        });

    };

    /**
     * 合同管理-加载事件
     */
    $.contractList.load_event = function () {

        // 绑定事件
        $(document).on("click", "tbody>.item-main-tr", function () {
            var _radio = $(this).find("input[name=houseContractNo]");
            $("input[name=houseContractNo]").removeAttr("checked").parent().removeClass("common-checkbox-checked");
            _radio.attr("checked", "checked").parent().addClass("common-checkbox-checked");

            // 选项判定
            $.contractList.option_decide(_radio);
        });

        // 提交合同作废
        $(document).on('click', '.sumbit-button', function () {
            var _text = $('.text_div');
            if (isEmpty(_text.val().trim())) {
                _text.msg("作废内容为空");
                return;
            }
            var data = {};
            data.con_type = $('.con_type').val();  //合同状态
            data.ContractObject_Code = $('.con_code').val();   //合同编号
            data.content = "作废申请：" + _text.val().trim();   //作废原因
            $.ajax({
                type: "POST",
                url: "/contractObject/voidContractRecord",
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                    $("#record-table-body").html('<tr><td colspan="7"><div class="loading"></div></td></tr>');
                }
            }).done(function (result) {
                if (result.code != 200) return $.hint.tip(result.msg, "error");

                $.hint.tip("作废成功", "success");
                $('.expense').remove();
                $.contractList();
            });
        });

        // 合同作废处理关闭
        $(document).on('click', '.close-button', function () {
            $('.expense').remove();
        });

    };

    /**
     * 合同管理-选项判定
     * @param _radio
     */
    $.contractList.option_decide = function (obj) {
        var _data = $(obj).data("data");

        // 修改合同
        var contractEdit = $("#contractEdit");
        // 物业交接
        var propertyTransfer = $("#propertyTransfer");
        // 合同续约
        var contractRenew = $("#contractRenew");
        // 提交审核
        var contractAuditing = $("#contractAuditing");
        // 合同作废
        var contractVoid = $('#contractVoid');
        // 改签合同
        var changeContract = $("#changeContract");
        // 申请解约
        var cancelApply = $("#cancelApply");
        // 招租申请
        var contractApply = $("#contractApply");
        // 合同修改
        var contractAttach = $("#contractAttach");
        // 物品添置
        var itemAdd = $("#itemAdd");

        var type = _data.contractObject_Type;
        var state = _data.contractObject_State;
        var optionState = _data.contractObject_OptionState;
        var extState = returnNumber(_data.contractObject_ExtState);

        var cco_code = _data.cco_code;
        var cco_applicationType = _data.cco_applicationType;
        var cco_state = _data.cco_state;
        $("[name=contract]").attr("disabled", "disabled");
        switch (state) {
            case 1: // 审核
                switch (optionState) {
                    case 101:
                        contractEdit.removeAttr("disabled");
                        if (extState != 12 && extState != 22) {
                            propertyTransfer.removeAttr("disabled");
                        }
                        contractAuditing.removeAttr("disabled");
                        break;
                    case 103:
                        contractEdit.removeAttr("disabled");
                        if (extState != 12 && extState != 22) {
                            propertyTransfer.removeAttr("disabled");
                        }
                        contractAuditing.removeAttr("disabled");
                        break;
                    case 105:
                        contractEdit.removeAttr("disabled");
                        if (extState != 12 && extState != 22) {
                            propertyTransfer.removeAttr("disabled");
                        }
                        contractAuditing.removeAttr("disabled");
                        break;
                }
                // 审核编辑状态才能作废
                contractVoid.removeAttr("disabled");
                contractAttach.removeAttr("disabled");
                itemAdd.removeAttr("disabled");
                break;
            case 2: // 生效
                if (optionState == 106) {
                    contractRenew.removeAttr("disabled"); // TODO 此处还需时间判断
                    if (type == "托管合同") {
                        cancelApply.removeAttr("disabled");
                        changeContract.removeAttr("disabled");
                    } else {
                        if (isEmpty(cco_code) || cco_state == '取消') {
                            contractApply.removeAttr("disabled");
                        }
                    }
                }
                contractAttach.removeAttr("disabled");
                itemAdd.removeAttr("disabled");
                break;
        }

    };

})(jQuery);

//【显示合同】托管、租赁
(function ($) {

    /** 初始化*/
    $.contractInfo = function (type, param) {
        $.ajax({
            type: "POST",
            url: "/contractObject/queryHouseContractInfoList",
            data: {
                hi_code: hi_code
            },
            dataType: "json",
            success: function (result) {
                switch (result.code) {
                    case 200:
                        var newArr = new Array();
                        var _title = "";
                        var _content = "";

                        $.each(result.data.viewContractInfo, function (index, data) {
                            if (type == data.contractObject_Type) {
                                newArr[newArr.length] = data;
                            }
                        });
                        if (newArr.length > 0) {
                            for (var index = newArr.length - 1; index > -1; index--) {
                                var data = newArr[index];
                                var title_html = '';
                                title_html += '<label class="nav-tab-title">' + returnValue(data.contractObject_No) + '</label>';
                                title_html += '<label class="nav-tab-subTitle">' + returnDate(data.contractObject_Date) + '</label>';
                                if (isEmpty(param)) {
                                    if (index == (newArr.length - 1)) {
                                        _title += '<a class="nav-tab nav-tab-focus" style="padding: 0 12px;width: 108px;" href="javascript:changeTab(\'' + data.contractObject_Code + '\',\'' + data.hi_code + '\');">' + title_html + '</a>';
                                        _content += '<iframe id="house-iframe" src="/contractObject/jumpDisplayContract?con_code=' + data.contractObject_Code + '" style="display:none" frameBorder="0"  width="100%" height="100%" scrolling="auto"></iframe>';
                                    } else {
                                        _title += '<a class="nav-tab" style="padding: 0 12px;width: 108px;" href="javascript:changeTab(\'' + data.contractObject_Code + '\',\'' + data.hi_code + '\');">' + title_html + '</a>';
                                    }
                                } else {
                                    if (data.contractObject_No == param) {
                                        _title += '<a class="nav-tab nav-tab-focus" style="padding: 0 12px;width: 108px;" href="javascript:changeTab(\'' + data.contractObject_Code + '\',\'' + data.hi_code + '\');">' + title_html + '</a>';
                                        _content += '<iframe id="house-iframe" src="/contractObject/jumpDisplayContract?con_code=' + data.contractObject_Code + '" style="display:none" frameBorder="0"  width="100%" height="100%" scrolling="auto"></iframe>';
                                    } else {
                                        _title += '<a class="nav-tab" style="padding: 0 12px;width: 108px;" href="javascript:changeTab(\'' + data.contractObject_Code + '\',\'' + data.hi_code + '\');">' + title_html + '</a>';
                                    }
                                }
                            }
                        } else {
                            _title += '<a class="nav-tab nav-tab-focus">' + type + '</a>';
                            if (type == '托管合同') {
                                _content += '<a class="contract-add2" href="javascript:contractAdd(\'' + hi_code + '\',\'addTG\');"><i class="icon-plus"></i>添加合同</a>';
                            } else {
                                _content += '<a class="contract-add2" href="javascript:contractAdd(\'' + hi_code + '\',\'addZL\');"><i class="icon-plus"></i>添加合同</a>';
                            }
                        }

                        var html = "";
                        html += '<div class="box-nav">' + _title + '</div>';
                        html += '<div class="box-content" style="text-align: center;">' + _content + '</div>';
                        $("#contentShow").html(html);
                        iframeLoad();
                        break;
                    default :
                        break;
                }
            }
        });
    };

})(jQuery);

//【房屋图片】
(function ($) {

    /**房源图片*/
    $.houseImage = function () {
        setIframeHeight();   //iframe 高度
        // 初始化视图
        $.houseImage.initView();
        // 获取数据
        //		$.houseImage.initData();
        // 加载事件
        //		$.houseImage.load_event();

        //获取文件夹
        $.houseImage.imgFolds();
    };

    $.houseImage.param = {
        imageDomain: 'http://image.cqgjp.com/houseImage/',
        mode: "folder", // time|folder
    };

    /** 初始化视图*/
    $.houseImage.initView = function () {
        var _mode = '';
        if ($.houseImage.param.mode == "time") {
            _mode = '<buttom class="image-manage-btn" name="houseImageMode" data-mode="time"><i class="fa-th-list"></i>时间</buttom>';
        } else {
            _mode = '<buttom class="image-manage-btn" name="houseImageMode" data-mode="folder"><i class="fa-th-large"></i>文件夹</buttom>';
        }

        var html = '';
        // html += '<div class="box-nav">';
        // html += '	<a class="nav-tab nav-tab-focus" href="javascript:;">房屋照片</a>';
        // html += '</div>';
        html += '<div class="box-content image-show-box">';
        html += '	<div class="sub-title">';
        html += '		<div class="image-manage-head">';
        html += '		     <buttom class="image-manage-btn ok-bg updateImage" name="houseImageUpload" onclick="$.houseImage.upload();"><i class="fa-upload"></i>上传</buttom>';
        //		html += '		     <buttom class="image-manage-btn ok-bg" name="houseImageDownload" onclick="$.houseImage.download();"><i class="fa-download"></i>下载</buttom>';
        //		html += '		     <buttom class="image-manage-btn error-bg" name="houseImageDelete" onclick="$.houseImage.deletes();"><i class="fa-trash"></i>删除</buttom>';
        html += '		     <div style="flex: 1"></div>';
        html += '		     ' + _mode;
        html += '		</div>';
        html += '		<div class="image-manage-body" style="display: none;">';
        html += '			<input type="file" name="image-upload">';
        html += '		</div>';
        html += '	</div>';
        html += '	<div class="sub-content">';
        html += '		';
        html += '	</div>';
        html += '</div>';
        $("#contentShow").html(html);
    };

    //获取文件夹数据
    $.houseImage.imgFolds = function () {
        $.ajax({
            type: "POST",
            url: "/houseLibrary/imgFolds",
            data: {hi_code: hi_code, image_mode: $("[name=houseImageMode]").attr("data-mode")},
            dataType: "json",
        }).done(function (result) {
            $.houseImage.initImageFolderManage(result);
        });
    };

    /**房源相册-初始化相册管理*/
    $.houseImage.initImageFolderManage = function (result) {
        var box = $.houseImage.getOptionBox();
        // 清空数据
        box.content.empty();
        // 加载数据
        var html = '';
        var url = '';
        for (var i = 0; i < result.data.list.length; i++) {
            if (result.data.list[i].vo != null) {
                if (result.data.list[i].vo.hm_path != null) {
                    url = result.data.list[i].vo.hm_path;
                } else {
                    url = '/resources/houseImage/13213213154713213.png';
                }
                // language=HTML
                html += '<div class="imgFold" style="position: relative;margin-bottom: 30px;border: 1px solid #ddd;margin-right: 15px;width: 167px;height: 160px;padding: 6px 6px 23px;float:left;">';
                html += '    <a href="javascript:;" class="button-img" style="display:block;width:100%;height:100%;overflow:hidden;background-color:#F5F5F5;">';
                html += '    <img class="" src="' + url + '" style="width:100%;height:100%;border: 1px solid blanchedalmond;" >';
                html += '    <span class="pic-num-wrap" style="position: absolute;left: 0;bottom: 0;width: 100%;height: 50px;text-align: right;">';
                html += '    <span class="pic-num" style="display:inline-block;margin-right:12px;font-size:22px;line-height: 1;font-family: Gulim,serif;color: #FFF;">' + result.data.list[i].vo.size + '</span>';
                html += '    </span>';
                html += '    </a>';
                html += '    <input type="hidden" class="hif_id" value=' + result.data.list[i].vo.hif_name + '>';
                html += '    <p style="text-align:left;height:20px;font-size: 14px;margin-top: 3px;">' + result.data.list[i].vo.type_name + '</p>';
                html += '</div>';
            }
        }
        box.content.append(html);

        $(".sub-content .imgFold").each(function () {   //触动相册改变样式
            $(this).mouseenter(function () {
                $('.imgFold').css('box-shadow', '');
                $(this).css('box-shadow', '1px 1px 3px 3px #888888');
            });
        })
    };

    /** 房源图片-初始化数据*/
    $.houseImage.initData = function () {
        $.ajax({
            type: "POST",
            url: "/houseLibrary/queryHouseImageList",
            data: {
                hi_code: hi_code,
                image_mode: $("[name=houseImageMode]").attr("data-mode")
            },
            dataType: "json",
        }).done(function (result) {
            $.houseImage.initImageManage(result);
            $("[name=houseImageMode]").removeAttr("disabled");
        });
    };

    /** 房源图片-初始化图片管理*/
    $.houseImage.initImageManage = function (result) {
        var box = $.houseImage.getOptionBox();
        // 获取数据
        var _folder_list = [];
        var _folder = {};
        $.each(result.data, function (index, data) {
            var _month = new Date(returnDate(data.hm_createTime, "yyyy-MM")).getTime();
            if (!_folder[_month]) {
                _folder_list.push(_month);
                _folder[_month] = {
                    folderData: data,
                    fileList: [data]
                };
            } else {
                _folder[_month].fileList.push(data);
            }
        });
        // 排序
        _folder_list.sort(function (a, b) {
            return b - a;
        });

        // 清空数据
        box.content.empty();
        // 加载数据
        $.each(_folder_list, function (key, item) {
            var mainData = _folder[item];
            if (mainData != null) {
                var html = '';
                html += '<div class="folder-item">';
                html += '	<div class="folder-item-head">';
                html += '		<div class="">' + returnDate(mainData.folderData.hm_createTime, "yyyy年MM月") + '</div>';
                html += '		<div style="flex: 1"></div>';
                //				html += '		<div>全选</div>';
                html += '	</div>';
                html += '	<ul class="folder-item-body">';
                $.each(mainData.fileList, function (index, data) {
                    var url = data.hm_path;
                    html += '   <li class="item-body-image">';
                    html += '   	<div class="body-image-head" style="display:none;"></div>';
                    html += '   	<div class="body-image-body">';
                    html += '   		<img src="' + url + '">';
                    html += '   	</div>';
                    html += '   	<div class="body-image-footer">';
                    html += '   		';
                    html += '   	</div>';
                    html += '   </li>';
                });
                html += '	</ul>';
                html += '</div>';
                box.content.append(html);
            }
        });
        $(".folder-item-body").viewer();
    };

    //图片列表
    $(document).on('click', '.button-img', function (result) {
        var imgfoldName = $(this).next().val();
        $('.sub-content').hide();
        $('.sub-title').hide();
        $.ajax({
            type: "POST",
            url: "/houseLibrary/foldSImg",
            data: {hi_code: hi_code, imgfoldName: imgfoldName},
            dataType: "json",
            success: function (result) {
                var data = result.data.houseLibraryImageVos;
                // 获取数据
                var _folder_list = [];
                var _folder = {};
                $.each(data, function (index, data) {
                    var _month = new Date(returnDate(data.hm_createTime, "yyyy-MM")).getTime();
                    if (!_folder[_month]) {
                        _folder_list.push(_month);
                        _folder[_month] = {
                            folderData: data,
                            fileList: [data]
                        };
                    } else {
                        _folder[_month].fileList.push(data);
                    }
                });
                // 排序
                _folder_list.sort(function (a, b) {
                    return b - a;
                });

                var html = '';
                html += '<div class="div-img">';
                if (_folder_list != null && _folder_list != '') {

                    html += '	<div class="sub-title">';
                    html += '		<div class="image-manage-head">';
                    html += '		     <buttom class="black_img image-manage-btn ok-bg"><i class="fa-chevron-circle-left"></i>返回</buttom>';
                    html += '			 <a href="" download="" class="image-manage-btn ok-bg update"><i class="fa-download"></i>下载</a>';
                    html += '		     <buttom class="image-manage-btn error-bg" name="houseImageDelete" onclick="$.houseImage.deletes();"><i class="fa-trash"></i>删除</buttom>';
                    html += '		     <div style="flex: 1"></div>';
                    html += '		</div>';
                    html += '	</div>';
                    $.each(_folder_list, function (key, item) {
                        var mainData = _folder[item];
                        if (mainData != null) {
                            html += '<div class="folder-item">';
                            html += '	<div class="folder-item-head">';
                            html += '		<div >' + returnDate(mainData.folderData.hm_createTime, "yyyy年MM月") + '</div>';
                            html += '		<div style="flex: 1"></div>';
                            html += '		<div class="all_chose" style="cursor: pointer;width: 55px;height: 30px;text-align: center;margin-top: 4px;line-height: 30px;border-radius: 3px;background-color: rgb(24, 188, 156);display: block;color: white;">全选</div>';
                            html += '		<div class="all_close" style="cursor: pointer;display:none;width: 65px;height: 30px;text-align: center;margin-top: 4px;line-height: 30px;border-radius: 3px;background-color: rgb(24, 188, 156);color: white;">取消全选</div>';
                            html += '	</div>';
                            html += '	<ul class="folder-item-body">';
                            $.each(mainData.fileList, function (index, data) {
                                var url = data.hm_path;
                                html += '   <li class="item-body-image" style="width: 272px;height: 153px;">';
                                html += '   	<div class="body-image-head" style="display:none;"></div>';
                                html += '   	<div class="body-image-body">';
                                html += '		<input type="hidden" value="' + data.hm_id + '">'
                                html += '   		<img src="' + url + '">';
                                html += '   	</div>';
                                html += '<div>';
                                html += '<label class="item-check" style="position: absolute;top: 0;left: 0;">';
                                html += '<i class="box-i" style="float: left;width: 20px;height: 20px;border: 1px solid;background: aliceblue;background-size: 24px;">';
                                html += '</i>';
                                html += '</label>';
                                html += '</div>';
                                html += '   	<div class="body-image-footer">';
                                html += '   		';
                                html += '   	</div>';
                                html += '   </li>';
                            });
                            html += '	</ul>';
                            html += '</div>';
                        }
                    });
                } else {
                    var url = '/resources/houseImage/13213213154713213.png';
                    html += '<div class="folder-item">';
                    html += '<div>';
                    html += '<img src="' + url + '" style="margin: 7px 7px;width: 180px;height: 180px;">';
                    html += '</div>';
                    html += '</div>';
                }
                html += '</div>';
                $('.image-show-box').append(html);
                $(".div-img .folder-item-body").viewer();
            },
            error: function () {

            }
        })
    })

    /** 房源图片-加载事件*/
    $(document).on("click", "[name=houseImageMode]", function () {
        if ("folder" == $(this).attr("data-mode")) {
            $(this).attr("data-mode", "time").html('<i class="fa-th-list"></i>时间');
            $.houseImage.initData();
        } else {
            $(this).attr("data-mode", "folder").html('<i class="fa-th-large"></i>文件夹');
            $.houseImage.imgFolds();
        }
        $(this).attr("disabled", "disabled");
    });

    /** 房源图片-获取图片操作BOX*/
    $.houseImage.getOptionBox = function () {
        var box = $("#contentShow").find(".image-show-box");
        var data = {
            option: box.find(".sub-title"),
            content: box.find(".sub-content"),
        };
        return data;
    };

    /** 房源图片-获取图片操作按钮*/
    $.houseImage.getOptionBtn = function () {
        var box = $("#contentShow").find(".image-show-box");
        var box_title = box.find(".sub-title");
        var data = {
            btnUpload: box_title.find("[name=houseImageUpload]"),
            btnEdit: box_title.find("[name=houseImageOpenEdit]"),
            btnDownload: box_title.find("[name=houseImageDownload]"),
            btnDelete: box_title.find("[name=houseImageDelete]"),
            btnClose: box_title.find("[name=houseImageCloseEdit]"),
        };
        return data;
    };

    var folderName = '';
    /** 房源图片-上传*/
    $.houseImage.upload = function () {
        $('.updateImage').show();
        var ht = "<div class='black_img' style='cursor: pointer;border: 1px solid;width: 55px;height: 30px;text-align: center;margin-top: 4px;line-height: 30px;border-radius: 7px;background-color: rgb(24, 188, 156);display: block;margin-right: 10px;color: white;'>" + '返回' + "</div>";
        $('.image-manage-head').prepend(ht);
        $.ajax({
            type: "POST",
            url: "/houseLibrary/imgFolds",
            data: {hi_code: hi_code},
            dataType: "json",
        }).done(function (result) {
            var data = result.data.list;
            var html = '';
            html += '<select class="select-div" style="margin-right:10px;">';
            html += '<option>选择文件夹</option>';
            for (var i = 0; i < data.length; i++) {
                if (result.data.list[i].vo != null) {
                    html += '<option value=' + data[i].vo.hif_name + '>' + data[i].vo.type_name + '</option>';
                }
            }
            html += '</select>';
            $('.image-upload-head').prepend(html);
        });
        var box = $.houseImage.getOptionBox();
        var btn = $.houseImage.getOptionBtn();
        box.option.find(".image-manage-body").show("fast");

        btn.btnEdit.fadeOut("fast");
        btn.btnUpload.fadeOut("fast", function () {
            btn.btnClose.fadeIn();
        });
        var folderName = '';
        $("#contentShow").find("[name=image-upload]").imageUpload({
            fileLimitNumber: 10,
            fileUploadDesc: '<label class="hint">提示：仅能上传图片类型的文件，单个文件限定大小为20M</label>',
            fileUploadBefore: function () {
                folderName = $('.select-div').val();
                if (folderName == '选择文件夹') {
                    $.jBox.tip("文件夹选择为空,请重新上传!");
                    return false;
                }
                return true;
            },
            fileResizeParam: {width: 1440, quality: 0.8},
            type: 'house',
            hi_code: hi_code,
            fileUploadCallback: {
                isRealUpload: true,
                done: function (data, callback) {
                    // var url = data.key;
                    // var imageCode=data.imageCode;
                    if (folderName == '选择文件夹') {
                        $.jBox.tip("文件夹选择为空,请重新上传!");
                        return false;
                    }
                    /*$.ajax({
                     type: "POST",
                     url: "/houseLibrary/updateHouseImage",
                     data: {
                     hi_code: hi_code,
                     image_path: url,
                     folderName: folderName,
                     hm_code:imageCode,
                     },
                     dataType: "json",
                     }).done(function (result) {*/
                    // if (result.code != 200) {
                    //     return;
                    // }
                    $.jBox.tip("上传完成");
                    // callback(result.data);
                    //房源图片-关闭编辑
                    $.houseImage.closeEdit();
                    //返回相册首页
                    $.houseImage.imgFolds();
                    $('.updateImage').show();
                    // });
                }
            },
            fileDeleteCallback: {
                isRealDelete: true,
                done: function (data) {
                    $.ajax({
                        type: "POST",
                        url: "/houseLibrary/deleteHouseImage",
                        data: {
                            hm_id: data.hm_id,
                        },
                        dataType: "json",
                    });
                }
            }
        });
        $('.image-manage-head').show();
        $(".option-more-main-table").show();
        $("#savePicture").show();
        $("#createFolder").show();
        $('.black_img').hide();
    };

    /** 房源图片-打开编辑*/
    $.houseImage.openEdit = function () {
        var btn = $.houseImage.getOptionBtn();
        btn.btnUpload.fadeOut("fast");
        btn.btnEdit.fadeOut("fast", function () {
            btn.btnDownload.fadeIn();
            btn.btnDelete.fadeIn();
            btn.btnClose.fadeIn();
        });

        $("#manage").hide();
        $(".checkbox").show();
        $(".option-more-main-table").hide();
        $("#savePicture").hide();
        $("#createFolder").hide();
        var html = "";
        html += '<div class="class_tr" id="download"><button id="download_button" class="class_buttons" onclick="gainPictureSrc()" >下载</button></div>'
            + '<div class="class_tr" id="delete"><button id="delete_button" class="class_buttons" onclick="deletePicture()" >删除</button></div>'
            + '<div class="class_tr" id="cancel"><button id="cancel_button" class="class_buttons" onclick="cancel()" >取消</button></div>';
        $("#manage").after(html);
    };

    var i = 0;
    //点击图片勾选框
    $(document).on('click', '.box-i', function () {
        $(this).each(function () {
            if ($(this).attr('nid')) {
                $(this).removeAttr('nid');
                $(this).css('background-image', '');
                i -= 1;
            } else {
                $(this).attr('nid', '1');
                $(this).css('background-image', 'url(/resources/image/gou.png)');
                i += 1;
            }
        })
    })
    //全选
    $(document).on('click', '.all_chose', function () {
        $(this).parent('div').next().find('.box-i').each(function () {
            if (!$(this).attr('nid')) {
                $(this).attr('nid', '1');
                $(this).css('background-image', 'url(/resources/image/gou.png)');
                i += 1
            }
        })
        $(this).hide();
        $(this).next().show();
    })
    //取消全选
    $(document).on('click', '.all_close', function () {
        $('.folder-item-body .box-i').each(function () {
            if ($(this).attr('nid')) {
                $(this).removeAttr('nid');
                $(this).css('background-image', '');
                i -= 1;
            }
        })
        $('.all_chose').show();
        $('.all_close').hide();
    })

    /** 房源图片-下载*/
    //	$.houseImage.download = function(){
    //		if (i == 0) {
    //			$.jBox.tip("请选择照片");
    //			return false;
    //		}
    //		var submit = confirm("确定要下载图片吗？");
    //		if (submit == true) {
    //			var img='';
    //			$('.folder-item-body .box-i').each(function(){
    //				if ($(this).attr('nid')) {
    //					img+=$(this).parent().parent('div').prev('div').find('img').attr('src')  +'_';
    //				}
    //			});
    //			$.ajax({
    //				type : "POST",
    //				url : "/houseLibrary/downloadImg?filePath="+encodeURI(JSON.stringify(img)),
    //				data : {},
    //				dataType : "json",
    //				success:function (data) {
    //					if (data.code == 200) {
    //						$.jBox.tip("已下载至 D盘image文件夹");
    ////						location.reload();
    //					}
    //				},
    //				error:function () {
    //
    //				}
    //			})
    //		}
    //	};

    //下载
    $(document).on('click', '.update', function () {
        if (i == 0) {
            $.jBox.tip("请选择照片");
            return false;
        }
        if (i > 1) {
            $.jBox.tip("只能单张下载");
            return false;
        }
        var submit = confirm("确定要下载图片吗？");
        if (submit == true) {
            var img = '';
            $('.folder-item-body .box-i').each(function () {
                if ($(this).attr('nid')) {
                    img += $(this).parent().parent('div').prev('div').find('img').attr('src');
                }
            });
            $(this).attr('href', img);
        }
    })

    /** 房源图片-删除*/
    $.houseImage.deletes = function () {
        if (i == 0) {
            $.jBox.tip("请选择照片");
            return false;
        }
        var submit = confirm("确定要删除图片吗？");
        if (submit == true) {
            var nid = '';
            $('.folder-item-body .box-i').each(function () {
                if ($(this).attr('nid')) {
                    nid += $(this).parent().parent('div').prev('div').find('input').val() + '_';
                }
            });
            $.ajax({
                type: "POST",
                url: "/houseLibrary/delImage?nid=" + encodeURI(JSON.stringify(nid)),
                data: {},
                dataType: "json",
                success: function (data) {
                    if (data.code == 200) {
                        //						$.jBox.tip("已删除");
                        location.reload();
                    }
                },
                error: function () {

                }
            })
        }
    };

    //照片返回到相册
    $(document).on('click', '.black_img', function () {
        $.houseImage.initView();
        //获取文件夹
        $.houseImage.imgFolds();
    })

    /** 房源图片-关闭编辑*/
    $.houseImage.closeEdit = function () {
        var btn = $.houseImage.getOptionBtn();
        btn.btnDownload.fadeOut("fast");
        btn.btnDelete.fadeOut("fast");
        btn.btnClose.fadeOut("fast", function () {
            btn.btnUpload.fadeIn();
            btn.btnEdit.fadeIn();
        });

        var box = $("#contentShow").find(".image-show-box");
        box.find(".image-manage-body").hide("fast", function () {
            $(this).html('<input type="file" name="image-upload">');
        });
    };

})(jQuery);

//【结算订单】
(function ($) {
    /** 初始化*/
    $.settlementOrder = function () {
        $.settlementOrder.load_data();
        $.settlementOrder.load_event();
    };
    /** 参数*/
    $.settlementOrder.param = {};
    /** 加载数据*/
    $.settlementOrder.load_data = function () {
    };
    /** 加载事件*/
    $.settlementOrder.load_event = function () {
    };

})(jQuery);

//【房管日志】
(function ($) {
})(jQuery);

//【房态监控】
(function ($) {
})(jQuery);

// 加载权限
function load_power() {
    // 获取查询权限
    $.power.getQuery(function (menus) {
        $.each(menus, function (index, menu) {
            switch (menu.ucps_url) {
                case "houseEdit()":
                    $(".power-option-box1").append('<i class="icon-house-edit fa-pencil" title="编辑房源信息" onclick="window.parent.href_mo(\'/houseLibrary/jumpHouseInfoEdit?hi_code=' + getUrlParam("hi_code") + '\',\'修改房源\',\'房源信息\');"></i>');
                    break;
                case "contractVoid":
                    $(".power-option-box3").append('<button id="contractVoid" name="contract">合同作废</button>');
                    break;
            }
        });
    });
}

function checkImage() {
    $('#dowebok').viewer();
}

// 合同作废
function contractVoid(state, optionState, type, cno, con_code) {
    var co_state = '';
    var co_optionState = '';
    if (state === 1) {
        co_state = '审核';
    }
    if (optionState === 101) {
        co_optionState = '编辑';
    }

    var html = '';
    html += '<div class="expense ">';
    html += '    <input type="hidden" value=' + con_code + ' class="con_code">';
    html += '    <input type="hidden" value=' + type + ' class="con_type">';
    html += '	<div class="expense-container3" id="expense-container3">';
    html += '		<div id="cd-buttons">';
    html += '			<div style="margin: auto; width: 90%;line-height: 48px;font-size: 18px;color: #000000; text-align: center;border-bottom: 1px solid #06B;" id="titleInsert">合同作废处理';
    html += '				<a href="#0" class="close-button" style="color: red;position:absolute;margin-left:130px;">X</a>';
    html += '			</div>';
    html += '			<div class="sub-title" id="contract-title" style="margin: auto;width: 95%;border-bottom: 1px solid whitesmoke;">';
    html += '				<ul class="title-nav" style="margin-left: 8px;">';
    html += '					<li class="visited">作废原因：</li>';
    html += '				</ul>';
    html += '			</div>';
    html += '			<div style="float:left;margin: 15px 40px;">';
    html += '				<textarea id="text" style="width: 320px;height: 150px;resize:none;"  class="text_div"  ></textarea>';
    html += '			</div>';
    html += '			<div style="float: right;">';
    html += '				<button class="finish-butten close-button" style="background-color: #E74C3C">关闭</button>';
    html += '				<button class="finish-butten sumbit-button">提交</button>';
    html += '			</div>';
    html += '		</div>';
    html += '	</div>';
    html += '</div>';
    $('body').append(html);
    $('.expense').addClass('is-visible3');
}

/**按文件夹分类*/
function showImage_folder() {
    var result = _result;
    $(".box-content .image-upload-box").remove();
    var len = result.data.length,
        _title = "",
        _content = "";
    _classify = "";
    listContent = [];
    _contentClassify = "",

        _title += '<a class="nav-tab nav-tab-focus" href="javascript:;">房屋照片</a>';

    var _folder = {};
    $.each(result.data, function (index, data) {
        if (data.hif_id == null) {
            _folder[-1] = {
                name: "未分类",
                list: [data]
            };
        } else {
            if (!_folder[data.hif_id]) {
                _folder[data.hif_id] = {
                    name: data,
                    list: [data]
                };
            } else {
                _folder[data.hif_id].list.push(data);
            }
        }
    });

    $.each(_folder, function (key, value) {
        value.name.hif_name
        _content += '<div class="folder_name" style="position:relative;padding-left: 4px;">	<div>' + value.name.hif_name + '</div>';
        _content += '<div>';
        $.each(value.list, function (index, data) {
            _content += '<div class="image-item" style="float:left;">';
            _content += '<input class="checkbox" name="Fruit" type="checkbox" value="" style="display: none"/>';
            if (data.hm_state == 1) {
                _content += '	<div class="image-mask">已发布</div>';
            }
            _content += '<li>	<img class="checkImage" style="width:200px;height:141px;margin:6px;" class="image-item-img" src="' + data.hm_path + '" data-type="' + data.hm_type + '" onclick="checkImage()"></li>';
            _content += '</div>';
        });
        _content += '<hr style="clear: both;height:0"></div>';
        _content += '</div>'
    });

    //		var html = '';
    //		html += '<div>';
    //		html += '	<div>'+ data.hif_name +'</div>';
    //		html += '	<div>';

    //		html += '		<img src="'+ data.hm_path +'" style="width: 100px;">';

    //		html += '	</div>';
    //		html += '</div>';

    //		for(var j=0;j<result.data.length;j++){
    //		var num=0;
    //		for(var i=0;i<listFolder.length;i++){
    //		if(listFolder[i]==result.data[j].hif_id){
    //		if(num==0){
    //		_content +='<div><span>'+result.data[j].hif_name+'</span></div>'
    //		}
    //		_content +='<div class="image-item">';
    //		_content +='<input class="checkbox" name="Fruit" type="checkbox" value="" style="display: none"/>';
    //		if(result.data[j].hm_state == 1){
    //		_content +='	<div class="image-mask">已发布</div>';
    //		}
    //		_content +='	<img class="image-item-img" src="'+ result.data[j].hm_path +'" data-type="'+ result.data[j].hm_type +'">';
    //		_content +='</div>';
    //		listContent.push(_content);
    //		}
    //		num++;
    //		}
    //		}

    var html = "";
    // html += '<div class="table-item-title"><div class="box-nav">' + _title + '</div></div>';
    html += '<div id="save" class="class_tr"><button class="class_buttons" id="manage_button" onclick="showSave()" >上传</button></div>'
    html += '<div id="manage" class="class_tr"><button class="class_buttons" id="manage_button" onclick="manage()" >管理</button></div><br/><br/>';
    html += '<div class="table-item-content">'
        + '<div class="record-option-more-main option-more-main-table" style="display: none">'
        + '<div class="option-more-main-item" style="width: 92px;">'
        + '<label class="table-item-add" onclick="showPicture()"><i class="fa-file-text" style="margin-right: 5px;font-size: 14px;"></i>添加附件<input type="file" name="record-file" multiple></label>'
        + '</div>'
        + '<div class="option-more-main-item" id="record-attach-box"></div>'
        + '</div><br/>'
        + '<div id="createFolder" class="" style="display: none"><span style="font-size: 14px;">保存方式:</span>'
        + '<div id="show_folder"><button value="选择文件夹" onclick="showSelect_Select()" style="background-color:hsl(196, 19%, 76%)">选择文件夹</button>&nbsp&nbsp<button value="新建文件夹" onclick="showCreste_input()" style="background-color:hsl(196, 19%, 76%)">新建文件夹</button></div></div><br/>'
        + '<div id="savePicture" class="class_tr" style="display: none"><button id="upload" class="class_buttons" onclick="savePicture()">保存</button></div>'

        + '<div><span style="font-size: 14px;">图册分类方式：</span>'
        + '<button id="show_folder_button" onclick="showImage_time()" style="background-color: rgb(116, 208, 177);border-radius: 2px;">时间</button>'
        + '</div><br/>'
        + '<div class="box-content image-upload-box"><ul id="dowebok">' + _content + '</ul></div></div>';
    $("#contentShow").html(html);
    setIframeHeight();
}

/**选择文件夹*/
function showSelect_Select() {
    /**查询当前房屋所有的文件夹*/
    $("#show_save").remove();
    var hif_name;
    var html;
    $.ajax({
        type: "post",
        url: "/houseLibrary/selectHouseImage",
        data: {"hi_code": hi_code},
        dataType: "json",
        success: function (result) {
            (result);
            for (var i = 0; i < result.data.length; i++) {
                if (result.data[i].hif_name != undefined) {
                    hif_name = result.data[i].hif_name;
                    html += '<option value="' + hif_name + '">' + hif_name + '</option>'
                }
            }
            var showHtml = '<div id="show_save"><select id="folder_name">' + html + '</select></div>'

            $("#show_folder").after(showHtml);
            if ($("#folder_name").val() == undefined || $("#folder_name").val() == null || $("#folder_name").val() == "") {
                alert("没有文件夹，请创建文件夹！");
                showCreste_input();
            }
        }

    });
}

/**新建文件夹*/
function showCreste_input() {
    $("#show_save").remove();
    var showHtml = '<div id="show_save">'
        + '<input style="border:1px solid #999;height: 26px;border-radius: 4px;" placeholder="请输入文件夹名" type="test" id="folder_name"/>'
        + '</div>';
    $("#show_folder").after(showHtml);
}

/**删除图片*/
function deletePicture() {
    var checked = $("input[type='checkbox']:checked");
    var srcList = [];
    for (var i = 0; i < checked.length; i++) {
        var src = $("input[type='checkbox']:checked").eq(i).next().attr("src");
        srcList.push(src);
    }
    if (srcList.length < 1) {
        alert("请选择删除图片");
    } else {
        $.ajax({
            type: "POST",
            url: "/houseLibrary/deletePicture",
            data: {"hi_code": hi_code, "pathList": JSON.stringify(srcList)},
            dataType: "json",
            success: function (result) {
                $.houseImage();
            }
        });
    }

}

/**获取被选择图片src*/
function gainPictureSrc() {
    var checked = $("input[type='checkbox']:checked");
    var srcList = [];
    for (var i = 0; i < checked.length; i++) {
        var src = $("input[type='checkbox']:checked").eq(i).next().attr("src");
        srcList.push(src);
    }
    downPicture(srcList);
}

/**图片取消管理操作*/
function cancel() {
    $("#download").hide();
    $("#delete").hide();
    $("#cancel").hide();
    $("#upload").show();
    $("#manage").show();
    $(".checkbox").hide();
}

var pathList = [];

/**选择图片之后图片显示*/
function showPicture() {

    $("[name=record-file]").localResizeIMG({
        width: 720,
        success: function (result) {
            var _file = result.blob;
            var _suffix = _file.type.substring(_file.type.lastIndexOf("/") + 1, _file.type.length);

            if (_file.size > 20 * 1024 * 1024) {
                $.jBox.tip(_file.name + " 文件大小超过20MB，上传文件不能大于20MB");
                $(this).val("");
                return false;
            }
            var _unfile = 'exe|bat';
            if (_unfile.indexOf(_suffix) > -1) {
                $.jBox.tip("不支持exe、bat等类型的文件上传");
                $(this).val("");
                return false;
            }
            var _size = _file.size;
            if (_size / 1024 < 1) {
                _size = _size + " B";
            } else if (_size / 1024 / 1024 < 1) {
                _size = returnFloat(_size / 1024) + " KB";
            } else {
                _size = returnFloat(_size / 1024 / 1024) + " MB";
            }
            var _names = "pad|txt|pdf|swf|zip|rar|xls|ppt|ttf|doc";
            var _img = '';
            if (_names.indexOf(_suffix) > -1) {
                _img = '<img src="/resources/common/zyupload/skins/images/fileType/' + _suffix + '.png">';
            } else {
                var _imgs = "png|jpg|gif";
                if (_imgs.indexOf(_suffix) > -1) {
                    var URL = window.URL || window.webkitURL;
                    var blobURL = URL.createObjectURL(_file);
                    _img = '<img src="' + blobURL + '">';
                } else {
                    _img = '<img src="/resources/common/zyupload/skins/images/fileType/unknown.png">';
                }
            }

            var _subitem_len = $(".more-main-item-subitem").length + 1;

            pathList.splice(0, pathList.length);
            var data = new FormData();
            data.append("file", _file, _file.name);
            data.append("index", _subitem_len);
            data.append("type", "contract");
            $.ajax({
                type: "POST",
                url: "/contractObject/uploadFile",
                data: data,
                dataType: "json",
                processData: false,
                contentType: false,
                beforeSend: function () {
                    var html = '';
                    html += '<div class="more-main-item-subitem item-subitem' + _subitem_len + '">';
                    html += '    <span class="item-subitem-1">' + _img + '</span>';
                    html += '    <span class="item-subitem-2">';
                    html += '    	<label class="attach-file-name" style="display: block;height: 20px;line-height: 20px;font-size: 13px;color: #000;">' + _file.name + '</label>';
                    html += '    	<label class="attach-file-size" style="display: block;height: 16px;line-height: 16px;">' + _size + '</label>';
                    html += '    </span>';
                    html += '    <span class="item-subitem-3">';
                    html += '    	<i class="upload-success icon-spinner icon-spin" title="上传中..."></i>';
                    html += '    </span>';
                    html += '	 <hr style="height: 0;">';
                    html += '</div>';
                    $("#record-attach-box").append(html);
                }
            }).done(function (result) {
                if (result.code != 200) return;
                var _data = result.data;

                var _box = $(".item-subitem" + _subitem_len);
                var _sub_box_item = _box.find(".item-subitem-3");
                _sub_box_item.find(".icon-spinner").fadeOut();
                _sub_box_item.html('<i class="upload-success icon-ok-circle"></i>');

                _box.hover(function () {
                    $(this).find(".item-subitem-3").html('<i class="upload-success icon-remove-circle" onclick="deleteAttachFile(this,\'' + _data.key + '\')" title="删除附件"></i>');
                }, function () {
                    $(this).find(".item-subitem-3").html('<i class="upload-success icon-ok-circle"></i>');
                });
                _box.data("data", _data);
                pathList.push(_data.url);
                /*console.log("http://www.cqgjp.com" + _data.url);*/
            });

        }
    });
}

/**图片的保存*/
function savePicture() {
    var folderName = $("#folder_name").val();
    if (pathList.length <= 0) {
        alert("请上传需保存图片");
    } else if (folderName == undefined || folderName == "" || folderName == null) {
        alert("请选择图片保存的文件夹");
    } else {
        $.ajax({
            type: "POST",
            url: "/houseLibrary/savePicture",
            data: {"hi_code": hi_code, "pathList": JSON.stringify(pathList), "folderName": folderName},
            dataType: "json",
            success: function (result) {
                $.houseImage();
                if (result.code != 200) {
                    $.jBox.tip(result.msg, "error");
                    return;
                }

            }
        })
    }
}

/**取消图片的保存操作*/
function cancel_upload() {
    $(".option-more-main-table").hide();
    $("#savePicture").hide();
    $("#createFolder").hide();

}

/**图片下载*/
function downPicture(srcList) {
    if (srcList.length < 1) {
        alert("请选择要下载的图片");
    } else {
        $.ajax({
            type: "POST",
            url: "/houseLibrary/downPicture",
            data: {"pathList": JSON.stringify(srcList)},
            dataType: "json",
            success: function (result) {
                alert("已成功保存到D盘Image文件夹中");
                $.houseImage();
            }
        })
    }
}

/**
 * 【5.结算订单】
 * @param position
 */
function cancelContract(position) {
    $.ajax({
        type: "POST",
        url: "/contractObject/querySettlementOrderList",
        data: {
            pageNo: 1,
            pageSize: 50,
            hi_code: getQueryString("hi_code")
        },
        dataType: "json"
    }).done(function (result) {
        if (result.code != 200) return;

        var len = result.data.length;
        var _content1 = "";
        var _content = "";

        _content1 += '<div class="sub-title">';
        _content1 += '	<div class="content-item-bottom" style="padding: 0 0 12px 0;">';
        _content1 += '		<div class="item-foot-left">';
        _content1 += '			<button id="contractEdit" name="cancelContract">修改订单</button>';
        _content1 += '			<button id="handover" name="cancelContract">交接结算</button>';
        _content1 += '			<button id="contractAuditing" name="cancelContract">提交复核</button>';
        _content1 += '		</div>';
        _content1 += '		<div class="item-foot-right">';
        _content1 += '			<button id="cancelApply" name="cancelContract">取消订单</button>';
        _content1 += '		</div>';
        _content1 += '	</div>';
        _content1 += '</div>';

        _content += '<div class="sub-content" style="padding: 0;">';
        if (result.data.list.length < 1) {
            _content += '<div style="text-align: center;font-size: 14px;line-height: 100px;">没有订单</div>';
        } else {
            _content += '	<table>';
            _content += '		<thead>';
            _content += '			<tr style="line-height: 36px; text-align: center; color: #000; font-size: 14px;font-weight: bold;border-bottom: 1px solid #e6e5e5;">';
            _content += '				<td style="padding: 0 4px; font-size: 14px;">#</td>';
            _content += '				<td>合同编号</td>';
            _content += '				<td>类型</td>';
            _content += '				<td>费用</td>';
            _content += '				<td style="text-align:left;">申请内容</td>';
            _content += '				<td>申请人</td>';
            _content += '				<td>申请日期</td>';
            _content += '				<td>受理人</td>';
            _content += '				<td style="text-align: right;padding-right: 16px;">状态</td>';
            _content += '				<td>操作</td>';
            _content += '			</tr>';
            _content += '		</thead>';
            _content += '		<tbody id="cancel-list"></tbody>';
            _content += '	</table>';
        }
        _content += '</div>';

        var html = "";
        // html += '<div class="table-item-title">';
        // html += '	<div class="box-nav"><a class="nav-tab nav-tab-focus" href="javascript:;">结算订单</a></div>';
        // html += '	<button class="sub-title-option icon-refresh" title="刷新" onclick="cancelContract()"></button>';
        // html += '</div>';
        html += '<div class="table-item-content custom-scroll">';
        html += '	<div>' + _content1 + '</div>';
        html += '	<div class="box-content" style="box-shadow: none;">' + _content + '</div>';
        html += '</div>';
        $("#contentShow").html(html);

        var _ok = false;
        $.each(result.data.list, function (index, data) {
            //
            var isPosition = (position == data.contractObject_No);
            //
            var _no_hash = "";
            var _title_sf = "";

            if (returnValue(data.contractObject_Type) == "托管合同") {
                _no_hash = "#contractTG";
                _title_sf = "解约";
            }
            if (returnValue(data.contractObject_Type) == "租赁合同") {
                _no_hash = "#contractZL";
                _title_sf = "招租";
            }
            // 状态
            var cco_state = returnCancelContractState(data.cco_state);
            var _state_view = '';
            _state_view += '<i class="icon-exclamation-sign"></i>';
            _state_view += '<div class="cco-state-box">';
            _state_view += '	<ul class="cancel-step-box" style="border: 1px solid #e4e4e4;border-radius: 4px;">';

            if (data.cco_state == "待审核" || data.cco_state == "审核未通过") {
                _state_view += '		<li class="step-color-ed"><i class="fa-check-circle"></i>' + _title_sf + '申请</li>';
                _state_view += '		<li class="cancel-step-line cancel-step-line-ed"></li>';
                _state_view += '		<li class="step-color-ing"><i class="fa-flag"></i>' + _title_sf + '审核</li>';
                _state_view += '		<li class="cancel-step-line cancel-step-line-join"></li>';

                _state_view += '		<li class="step-color-be"><i class="fa-check-circle"></i>交接结算</li>';
                _state_view += '		<li class="cancel-step-line cancel-step-line-be"></li>';
                _state_view += '		<li class="step-color-be"><i class="fa-check-circle"></i>结算审核</li>';
                _state_view += '		<li class="cancel-step-line cancel-step-line-be"></li>';
                _state_view += '		<li class="step-color-be"><i class="fa-check-circle"></i>财务复核</li>';
            }
            if (data.cco_state == "待交接" || data.cco_state == "待结算") {// fa-flag
                _state_view += '		<li class="step-color-ed"><i class="fa-check-circle"></i>' + _title_sf + '申请</li>';
                _state_view += '		<li class="cancel-step-line cancel-step-line-ed"></li>';
                _state_view += '		<li class="step-color-ed"><i class="fa-check-circle"></i>' + _title_sf + '审核</li>';
                _state_view += '		<li class="cancel-step-line cancel-step-line-join"></li>';

                _state_view += '		<li class="step-color-ing"><i class="fa-flag"></i>交接结算</li>';
                _state_view += '		<li class="cancel-step-line cancel-step-line-be"></li>';
                _state_view += '		<li class="step-color-be"><i class="fa-check-circle"></i>结算审核</li>';
                _state_view += '		<li class="cancel-step-line cancel-step-line-be"></li>';
                _state_view += '		<li class="step-color-be"><i class="fa-check-circle"></i>财务复核</li>';
            }
            if (data.cco_state == "待复审" || data.cco_state == "复审未通过") {
                _state_view += '		<li class="step-color-ed"><i class="fa-check-circle"></i>' + _title_sf + '申请</li>';
                _state_view += '		<li class="cancel-step-line cancel-step-line-ed"></li>';
                _state_view += '		<li class="step-color-ed"><i class="fa-check-circle"></i>' + _title_sf + '审核</li>';
                _state_view += '		<li class="cancel-step-line cancel-step-line-join"></li>';
                _state_view += '		<li class="step-color-ed"><i class="fa-check-circle"></i>交接结算</li>';
                _state_view += '		<li class="cancel-step-line cancel-step-line-ed"></li>';
                _state_view += '		<li class="step-color-ing"><i class="fa-flag"></i>结算审核</li>';
                _state_view += '		<li class="cancel-step-line cancel-step-line-be"></li>';
                _state_view += '		<li class="step-color-be"><i class="fa-check-circle"></i>财务复核</li>';
            }
            if (data.cco_state == "待复核" || data.cco_state == "复核未通过") {
                _state_view += '		<li class="step-color-ed"><i class="fa-check-circle"></i>' + _title_sf + '申请</li>';
                _state_view += '		<li class="cancel-step-line cancel-step-line-ed"></li>';
                _state_view += '		<li class="step-color-ing"><i class="fa-check-circle"></i>' + _title_sf + '审核</li>';
                _state_view += '		<li class="cancel-step-line cancel-step-line-ing"></li>';

                _state_view += '		<li class="step-color-be"><i class="fa-check-circle"></i>交接结算</li>';
                _state_view += '		<li class="cancel-step-line cancel-step-line-be"></li>';
                _state_view += '		<li class="step-color-be"><i class="fa-check-circle"></i>结算审核</li>';
                _state_view += '		<li class="cancel-step-line cancel-step-line-be"></li>';
                _state_view += '		<li class="step-color-be"><i class="fa-check-circle"></i>财务复核</li>';
            }
            if (data.cco_state == "完成") {
                _state_view += '		<li class="step-color-ed"><i class="fa-check-circle"></i>' + _title_sf + '申请</li>';
                _state_view += '		<li class="cancel-step-line cancel-step-line-ed"></li>';
                _state_view += '		<li class="step-color-ed"><i class="fa-check-circle"></i>' + _title_sf + '审核</li>';
                _state_view += '		<li class="cancel-step-line cancel-step-line-join"></li>';
                _state_view += '		<li class="step-color-ed"><i class="fa-check-circle"></i>交接结算</li>';
                _state_view += '		<li class="cancel-step-line cancel-step-line-ed"></li>';
                _state_view += '		<li class="step-color-ed"><i class="fa-check-circle"></i>结算审核</li>';
                _state_view += '		<li class="cancel-step-line cancel-step-line-ed"></li>';
                _state_view += '		<li class="step-color-ed"><i class="fa-check-circle"></i>财务复核</li>';
            }
            if (data.cco_state == "取消") {
                _state_view += '		<li class="step-color-error"><i class="fa-times-circle"></i>' + _title_sf + '申请</li>';
                _state_view += '		<li class="cancel-step-line cancel-step-line-error"></li>';
                _state_view += '		<li class="step-color-error"><i class="fa-times-circle"></i>' + _title_sf + '审核</li>';
                _state_view += '		<li class="cancel-step-line cancel-step-line-join"></li>';
                _state_view += '		<li class="step-color-error"><i class="fa-times-circle"></i>交接结算</li>';
                _state_view += '		<li class="cancel-step-line cancel-step-line-error"></li>';
                _state_view += '		<li class="step-color-error"><i class="fa-times-circle"></i>结算审核</li>';
                _state_view += '		<li class="cancel-step-line cancel-step-line-error"></li>';
                _state_view += '		<li class="step-color-error"><i class="fa-times-circle"></i>财务复核</li>';
            }
            _state_view += '	</ul>';
            _state_view += '	<ul class="cancel-step-box" style="border: 1px solid #e4e4e4;border-radius: 4px;float: right;">';
            if (data.cco_state == "完成") {
                _state_view += '	<li class="step-color-ed"><i class="fa-check-circle"></i>流程完毕</li>';
            } else if (data.cco_state == "取消") {
                _state_view += '	<li class="step-color-error"><i class="fa-times-circle"></i>流程取消</li>';
            } else {
                _state_view += '	<li class="step-color-ing" style="color:#F39C12;width: 60px;text-align:center"><i class="fa-recycle"></i>进行中</li>';
            }
            _state_view += '	</ul>';

            if (data.cco_applicationType == '转租') {
                _state_view += '	<hr style="height: 0;">';
                _state_view += '	<div class="cancel-step-hint">【提示】转租合约需要在签合同的时候才能交接结算</div>';
            }
            _state_view += '</div>';

            var _content = "";
            _content += '<tr class="cancel-list-item">';
            _content += '	<td><label class="common-checkbox ' + (isPosition ? 'common-checkbox-checked' : '') + '" style="top: 0;left: 9px;margin: 0;"><input type="radio" name="cancelContractNo" ' + (isPosition ? 'checked' : '') + '></label></td>';
            _content += '	<td><a href="' + _no_hash + '" onclick="GotoUrl(this,\'' + returnValue(data.contractObject_No) + '\')">' + returnValue(data.contractObject_No) + '<a/></td>';
            _content += '	<td>' + returnValue(data.cco_applicationType == "退租" ? "强退" : data.cco_applicationType) + '</td>';
            _content += '	<td class="error">' + (isEmpty(data.cco_subletCost) ? "无" : returnFloat(data.cco_subletCost)) + '</td>';
            _content += '	<td style="position:relative;width: 230px;text-align:left;"><div class="text-long">' + returnValue(data.cco_applicationContent) + '</div></td>';
            _content += '	<td>' + returnValue(data.cco_applicantName) + ' - ' + returnValue(data.ccp_phone) + '</td>';
            _content += '	<td>' + returnDate(data.cco_applicationTime) + '</td>';
            _content += '	<td>' + returnValue(data.cco_peopleName) + '</td>';
            _content += '	<td class="' + cco_state.color + ' cco_state" style="text-align: right;padding-right: 16px;">' + cco_state.title + _state_view + '</td>';
            _content += '	<td><a href="javascript:;" onclick="showMoreCancelOrder(\'' + data.cco_code + '\',\'' + data.contractObject_Code + '\')" style="color: #00a4ac;">订单详情</a></td>';
            _content += '</tr>';
            _content += '<tr class="cancel-item-show' + data.cco_code + '" style="display:none">';//
            _content += '	<td colspan="99" class="cancel-list-td"><i class="loading"></i>';
            _content += '	</td>';
            _content += '</tr>';
            $("#cancel-list").append(_content);

            $("input[name=cancelContractNo]:last").data("data", data);
            if (isPosition) {
                _ok = true;
            }
        });

        $("button[name=cancelContract]").on("click", function () {
            cotractOrderOptionListener($(this));
        });

        setIframeHeight();

        if (_ok) {
            cancelContractImplListener($("input[name=cancelContractNo]:checked"));
        }
    });
}

/**
 * 【6.房屋记录List】
 * @param obj
 */
function houseRecord(obj) {
    var html = "";
    // html += '<div class="table-item-title">';
    // html += '	<div class="box-nav"><a class="nav-tab nav-tab-focus" href="javascript:;">房管日志</a></div>';
    // html += '</div>';
    html += '<div class="table-item-content">';
    html += '   <div>';
    html += '   	<div class="sub-title" style="padding: 0 0 12px 0;">';
    html += '   		<div class="content-item-bottom record-option-head">'
    html += '   		    <div class="item-foot-left">'
    html += '   		        <button onclick="addContractRecord()" name="recordContract">添加日志</button>';
    html += '   		        <button onclick="adjustHouse()" style="display:none;" id="hasAdjustPower" name="recordContract">调价申请</button>';
    html += '   		        <button onclick="showPriceHistory()" name="recordContract">调价记录</button>';
    html += '   		        <button onclick="addProtocol()" name="recordContract">附加协议</button>';
    html += '   		    </div>';
    //	html += '   		    <label class="record-option-item" style="float:"><button onclick="adjustHouse()">调价 </button></label>';
    //	html += '   		    <label class="record-option-item"><select name="record-source"></select></label>';
    //	html += '   		    <label class="record-option-item"><select name="record-contract"></select></label>';
    //	html += '   		    <label class="record-option-item" style="border: 1px solid #ddd;border-radius: 4px;">';
    //	html += '   		    	<input name="record-startDate" style="width: 90px;border: none;height: 34px;">';
    //	html += '   		    	<label>至</label>';
    //	html += '   		    	<input name="record-endDate" style="width: 90px;border: none;height: 34px;">';
    //	html += '   		    </label>';
    html += '   		    <label class="record-option-item" style="float:right;margin-right: 0">';
    html += '   		    	<i class="fa-search" style="position: absolute;font-size: 16px;top: 10px;left: 8px;color: #8c8c8c;z-index: 2;"></i>';
    html += '   		    	<input name="record-where" style="width: 200px;text-indent: 20px;" placeholder="记录内容">';
    html += '   		    </label>';
    html += '   		    <label class="record-option-item" style="float:right;"><select name="record-type"></select></label>';
    html += '   		</div>';
    html += '		    <div id="priceHistory" style="margin-top: 12px;width: 60%;display:none;">';
    html += '		    	<div class="custom-box-mask"></div>';
    html += '		    	<div class="custom-box-head">';
    html += '		    		<div class="custom-box-head-title" style="font-weight:bold; border-bottom: 1px solid rgba(107, 97, 97, 0.26);">定价记录</div>';
    html += '		    		<div class="custom-box-head-close error" style="position: relative; margin-top: -15px;"><i class="fa-close" style="float:right;"></i></div>';
    html += '		    	</div>';
    html += '		    	<div class="custom-box-main" style="margin-top: 16px;">';
    html += '		    		<div class="reprice-record" style="position: relative;flex: 2;height: 240px;">记录</div>';
    html += '		    	</div>';
    html += '		    </div>';
    html += '   		<div class="record-option-more">';
    html += '				<div class="record-option-more-head">添加日志</div>';
    //调价申请
    html += '	            <div id="modifyPrice" style="display:none;">';
    html += '	                <div class="custom-box-main" style="display:flex;">';
    html += '	                	<div class="reprice-box" style="width:40%;flex: 3;position: relative;padding: 10px;">';
    html += '	                		<div class="reprice-box-item" style="line-height:26px;">';
    html += '	                			<div class="reprice-box-item-subitem item-subitem-title" style="width:65px;">存房价格</div>';
    html += '	                			<div class="reprice-box-item-subitem"><label class="money-zl money-font20" style="">' + returnFloat($("#inPrice").val()) + '</label></div>';
    html += '	                			<div class="reprice-box-item-subitem" style="padding-left: 10px;">元/月</div>';
    html += '	                		</div>';
    //	html += '	                		<div class="reprice-box-item">';
    //	html += '	                			<div class="reprice-box-item-subitem item-subitem-title">系统定价</div>';
    //	html += '	                			<div class="reprice-box-item-subitem"><input value="'+ returnFloat($("#systemPrice").val()) +'" disabled></div>';
    //	html += '	                			<div class="reprice-box-item-subitem" style="padding-left: 10px;">元/月</div>';
    //	html += '	                		</div>';
    html += '	                		<div class="reprice-box-item" style="line-height:26px;">';
    html += '	                			<div class="reprice-box-item-subitem item-subitem-title" style="width:65px;">当前定价</div>';
    html += '	                			<div class="reprice-box-item-subitem"><label class="money-zl money-font20" style="">' + returnFloat($("#currentPrice").val()) + '</label></div>';
    html += '	                			<div class="reprice-box-item-subitem" style="padding-left: 10px;">元/月</div>';
    html += '	                		</div>';
    html += '	                		<div class="reprice-box-item" style="line-height:26px;" id="applyPrice">';
    html += '	                			<div class="reprice-box-item-subitem item-subitem-title" style="width:65px;">申请定价</div>';
    html += '	                			<div class="reprice-box-item-subitem"><input class="money" name="reprice-apply" maxlength="11"></div>';
    html += '	                			<div class="reprice-box-item-subitem" style="padding-left: 10px;">元/月</div>';
    html += '	                		</div>';
    html += '	                		<div class="reprice-box-item" style="line-height:26px;" id="resetPrice">';
    html += '	                			<div class="reprice-box-item-subitem item-subitem-title" style="width:65px;">调整定价</div>';
    html += '	                			<div class="reprice-box-item-subitem"><input class="money" name="reprice-value" maxlength="11"></div>';
    html += '	                			<div class="reprice-box-item-subitem" style="padding-left: 10px;">元/月</div>';
    html += '	                		</div>';
    html += '	                		<div class="reprice-box-item" style="line-height:26px;" id="showTipInfo">';
    html += '                               <label style="color:red;font-weight: bold;">(注：当前可直接调价并生效)</label>';
    html += '                               <label style="color:red;font-weight: bold;">(注：当前需申请调价，并审核通过后生效)</label>';
    html += '	                		</div>';
    html += '	                		<div class="reprice-box-item" style="line-height:26px;" id="priceBtn">';
    html += '                               <input type="hidden" id="adjustType">';
    html += '	                			<div class="reprice-box-item-subitem item-subitem-title"></div>';
    html += '	                			<div class="reprice-box-item-subitem"><button name="savePrice">提交</button><button onclick="closeAddContractRecord()" style="background: #e74c3c; margin-left: 15px;">取消</button></div>';
    html += '	                			<div class="reprice-box-item-subitem"></div>';
    html += '	                		</div>';
    html += '	                	</div>';
    html += '	                </div>';
    html += '	            </div>';
    //添加日志
    html += '				<div class="record-option-more-main">';
    html += '					<select name="record-add-contract" style="margin-right: 10px;width: auto;" required>';
    html += '				    	<option value="">关联合同</option>';
    html += '				    </select>';
    html += '				    <select name="record-add-type" style="width: auto;" required>';
    html += '				    	<option value="">记录类型</option>';
    html += '				    </select>';
    html += '				    <hr style="height: 10px;">';
    html += '					<input type="text" name="ca_title" placeholder="协议标题(限50字内)" maxlength="50" required>';
    html += '				    <hr style="height: 10px;">';
    html += '				    <textarea name="record-add-content" placeholder="日志内容" required></textarea><br/><br/>';
    html += '                   <div class="record-option-more-head">是否同时记录到合同备注：<select id="save_remark" style="width: auto;" required><option value="no">否</option><option value="yes">是</option></select></div>';
    html += '				    <div class="option-more-main-table">';
    html += '				    	<div class="option-more-main-item" style="width: 97px;">';
    html += '				           	<label class="table-item-add"><i class="fa-file-text" style="margin-right: 5px;font-size: 14px;"></i>添加附件<input type="file" name="record-file" multiple></label>';
    html += '				    	</div>';
    html += '				      	<div class="option-more-main-item" id="record-attach-box"></div>';
    html += '				    </div>';
    html += '						<label style="color: red;" id="showTip">只支持PDF、WORD类型文件，且每次只能上传一个</label>';
    html += '				</div>';
    html += '				<div class="record-option-more-foot">';
    html += '					<button onclick="submitContrctRecord()">确认添加</button>';
    html += '				  	<button onclick="closeAddContractRecord()" style="background: #e74c3c;">取消</button>';
    html += '				</div>';
    html += '   		</div>';
    html += '   	</div>';
    html += '   </div>';
    html += '   <div class="box-content" style="box-shadow: none;">';
    html += '   	<div class="sub-content record-table-box" style="padding: 0">';
    html += '   		<table>';
    html += '   			<thead>';
    html += '   				<tr>';
    html += '   					<th style="width: 40px;text-align: center;">#</th>';
    html += '   					<th style="width: 97px;text-align: center;">合同号</th>';
    html += '   					<th style="width: 60px;text-align: center;">类型</th>';
    html += '   					<th style="text-align: left;">记录内容</th>';
    html += '   					<th style="width: 80px;">记录人</th>';
    html += '   					<th style="width: 153px;">记录时间</th>';
    html += '   					<th style="width: 75px;text-align: center;">记录来源</th>';
    // html += '   					<th style="width: 120px;text-align: center;">操作</th>';
    html += '   				</tr>';
    html += '   			</thead>';
    html += '   		</table>';
    html += '   	</div>';
    html += '   	<div class="sub-content record-table-box" id="record-table-box" style="padding: 0">';
    html += '   		<table>';
    html += '   			<tbody id="record-table-body"></tbody>';
    html += '   		</table>';
    html += '   	</div>';
    html += '   	<div class="sub-content" id="record-table-foot" style="padding: 12px 0">';
    html += '   		<button class="record-option fa-angle-left"></button>';
    html += '   		<input class="record-option number" id="record-pageNo" value="1">';
    html += '   		<button class="record-option fa-angle-right"></button>';
    html += '   		<div class="record-option">共<span id="record-totalPage">0</span>页，<span id="record-totalRecords">0</span>条记录</div>';
    html += '   	</div>';
    html += '   </div>';
    html += '</div>';
    html += '';
    $("#contentShow").html(html);

    // 【初始化选项数据】
    $.ajax({
        type: "POST",
        url: "/contractObject/queryContractImplRecordAbout",
        data: {
            hi_code: returnValue(getUrlParam("hi_code")),
        },
        dataType: "json",
    }).done(function (result) {
        if (result.code != 200) {
            return;
        }
        // 来源
        var _option = '<option value="">选择来源</option>';
        _option += '<option value="0">系统添加</option>';
        _option += '<option value="1">手动添加</option>';
        $("[name=record-source]").append(_option);

        // 类型
        var _option = '<option value="">选择类型</option>';
        var _option2 = '';
        $.each(result.data.recordType, function (index, data) {
            _option += '<option value="' + returnValue(data.contractType_Code) + '">' + returnValue(data.contractType_Name) + '</option>';
            if ("1016" != data.contractType_Code) {// 调价申请不在这里添加日志
                _option2 += '<option value="' + returnValue(data.contractType_Code) + '">' + returnValue(data.contractType_Name) + '</option>';
            }
        });
        $("[name=record-type]").append(_option);
        $("[name=record-add-type]").append(_option2);

        // 合同
        var _option = '<option value="">选择合同</option>';
        var _option2 = '';
        $.each(result.data.contractList, function (index, data) {
            _option += '<option value="' + returnValue(data.contractObject_Code) + '">' + returnValue(data.contractObject_Type) + " - " + returnValue(data.contractObject_No) + '</option>';
            _option2 += '<option value="' + returnValue(data.contractObject_Code) + '">' + returnValue(data.contractObject_Type) + " - " + returnValue(data.contractObject_No) + '</option>';
        });
        $("[name=record-contract]").append(_option);
        $("[name=record-add-contract]").append(_option2);

        // 加载数据
        queryContractRecordList();

        // 查询是否有权限设置出房调价
        $.ajax({
            type: "POST",
            url: "/user/checkRoleJdjustPrice",
            data: {
                ucps_url: "adjustHouse()",
            },
            dataType: "json",
        }).done(function (result) {
            if (result.hasAdjustPrice == true) {
                $("#hasAdjustPower").show();
            }
        });
    });

    // 【条件变更】
    $("[name=record-contract],[name=record-type],[name=record-source],[name=record-where]").on("change", function () {
        $("#record-pageNo").val(1);
        queryContractRecordList();
    });

    // 【选择文件】
    $("[name=record-file]").on("change", function () {
        for (var i = 0; i < this.files.length; i++) {
            var _file = this.files[i];
            var _suffix = _file.name.substring(_file.name.lastIndexOf(".") + 1, _file.name.length);

            if (_file.size > 20 * 1024 * 1024) {
                $.jBox.tip(_file.name + " 文件大小超过20MB，上传文件不能大于20MB");
                $(this).val("");
                return false;
            }
            var _unfile = 'exe|bat';
            if (_unfile.indexOf(_suffix) > -1) {
                $.jBox.tip("不支持exe、bat等类型的文件上传");
                $(this).val("");
                return false;
            }
            var _size = _file.size;
            if (_size / 1024 < 1) {
                _size = _size + " B";
            } else if (_size / 1024 / 1024 < 1) {
                _size = returnFloat(_size / 1024) + " KB";
            } else {
                _size = returnFloat(_size / 1024 / 1024) + " MB";
            }

            var _names = "pad|txt|pdf|swf|zip|rar|xls|ppt|ttf|doc";
            var _img = '';
            if (_names.indexOf(_suffix) > -1) {
                _img = '<img src="/resources/common/zyupload/skins/images/fileType/' + _suffix + '.png">';
            } else {
                var _imgs = "png|jpg|gif";
                if (_imgs.indexOf(_suffix) > -1) {
                    var URL = window.URL || window.webkitURL;
                    var blobURL = URL.createObjectURL(_file);
                    _img = '<img src="' + blobURL + '">';
                } else {
                    _img = '<img src="/resources/common/zyupload/skins/images/fileType/unknown.png">';
                }
            }

            var _subitem_len = $(".more-main-item-subitem").length + 1;

            var data = new FormData();
            data.append("file", _file);
            data.append("index", _subitem_len);
            $.ajax({
                type: "POST",
                url: "/contractObject/uploadFile",
                data: data,
                dataType: "json",
                processData: false,
                contentType: false,
                beforeSend: function () {
                    var html = '';
                    html += '<div class="more-main-item-subitem item-subitem' + _subitem_len + '">';
                    html += '    <span class="item-subitem-1">' + _img + '</span>';
                    html += '    <span class="item-subitem-2">';
                    html += '    	<label class="attach-file-name" style="display: block;height: 20px;line-height: 20px;font-size: 13px;color: #000;">' + _file.name + '</label>';
                    html += '    	<label class="attach-file-size" style="display: block;height: 16px;line-height: 16px;">' + _size + '</label>';
                    html += '    </span>';
                    html += '    <span class="item-subitem-3">';
                    html += '    	<i class="upload-success icon-spinner icon-spin" title="上传中..."></i>';
                    html += '    </span>';
                    html += '	 <hr style="height: 0;">';
                    html += '</div>';
                    $("#record-attach-box").append(html);
                }
            }).done(function (result) {
                if (result.code != 200) {
                    return;
                }
                var _data = result.data;

                var _box = $(".item-subitem" + _subitem_len);
                var _sub_box_item = _box.find(".item-subitem-3");
                _sub_box_item.find(".icon-spinner").fadeOut();
                _sub_box_item.html('<i class="upload-success icon-ok-circle"></i>');

                _box.hover(function () {
                    $(this).find(".item-subitem-3").html('<i class="upload-success icon-remove-circle" onclick="deleteAttachFile(this,\'' + _data.key + '\')" title="删除附件"></i>');
                }, function () {
                    $(this).find(".item-subitem-3").html('<i class="upload-success icon-ok-circle"></i>');
                });
                _box.data("data", _data);

            });
        }
        $(this).val("");
    });

    var _box = $("#record-table-foot");

    // 【上一页】
    _box.find(".fa-angle-left").on("click", function () {
        var pageNo = returnNumber(_box.find("#record-pageNo").val());
        if (pageNo <= 1) {
            return;
        }
        var totalPage = returnNumber(_box.find("#record-totalPage").text());
        if (pageNo > totalPage) {
            _box.find("#record-pageNo").val(totalPage);
        } else {
            _box.find("#record-pageNo").val(pageNo - 1);
        }
        queryContractRecordList();
    });

    // 【下一页】
    _box.find(".fa-angle-right").on("click", function () {
        var pageNo = returnNumber(_box.find("#record-pageNo").val());
        var totalPage = returnNumber(_box.find("#record-totalPage").text());
        if (pageNo >= totalPage) {
            return;
        }
        _box.find("#record-pageNo").val(pageNo + 1);
        queryContractRecordList();
    });

    // 提交定价
    $("[name=savePrice]").on("click", function () {
        var price = $("[name=reprice-value]").val();
        var cacheRent = $("[name=reprice-value]").val();
        if (!isEmpty(cacheRent)) {
            if (returnFloat(price) < returnFloat(cacheRent)) {
                jBox.tip("转租招租房源定价不能低于前租赁合同租金", "error");
                return;
            }
        }
        $.ajax({
            type: "POST",
            url: "/housePrice/updateHousePrice",
            data: {
                hi_code: getUrlParam("hi_code"),
                hi_price: price,
            },
            dataType: "json",
        }).done(function (result) {
            if (result.code != 200) {
                $.jBox.tip(result.msg, "error");
                return;
            }
            $.jBox.tip("更新成功", "success");
            $("[name=hi_money]").val($("[name=reprice-value]").val());

            $.ajax({
                type: "POST",
                url: "/housePrice/queryHousePrice",
                data: {
                    hi_code: getUrlParam("hi_code"),
                },
                dataType: "json",
            }).done(function (result) {
                if (result.code != 200) return;

                var data = result.data || "";
                $("#inPrice").val(data.hi_keepMoney);
                $("#systemPrice").val(data.systemPrice);
                $("#currentPrice").val(data.hi_price);
            });
            $.houseInfo();
        });
    });

    //	$("[name=showPriceHistory]").on("click", function(){});
}

function showPriceHistory() {
    $(this).html("调价记录<<");
    var html = '';
    if ($("#priceHistory").is(":hidden")) {
        $("#priceHistory").show();
        // 关闭页面
        $(".custom-box-head-close").on("click", function () {
            $("#priceHistory").hide();
        });

        // 加载数据-定价记录
        $.ajax({
            type: "POST",
            url: "/record/queryHousePriceRecord",
            data: {
                hi_code: getUrlParam("hi_code"),
            },
            dataType: "json",
        }).done(function (result) {
            if (result.code != 200) return;
            var priceRecordList = result.data.priceRecordList;
            if (priceRecordList == null || priceRecordList.length == 0) {
                $(".reprice-record").html('<div style="text-align: center;line-height: 60px;font-size: 14px;">暂无记录</div>');
                return;
            }
            $.each(priceRecordList, function (index, data) {
                var html = '';
                html += '<div style="padding: 5px 10px;border-bottom: 1px solid #ddd;">';
                // html += '	<div style="line-height: 24px;color: #000;"></div>';
                html += '	<div style="line-height: 24px;display: flex;"><span style="flex:1;color: #000;">' + returnValue(data.hpp_content) + '</span><span>' + returnValue(data.em_name) + '</span>-<span><strong>' + returnDate(data.hpp_createTime, "yyyy-MM-dd ") + '</strong>' + returnDate(data.hpp_createTime, "HH:mm:ss") + '</span></div>';
                html += '</div>';
                $(".reprice-record").append(html);
            });
        });
    } else {
        $(this).html("调价记录>>");
        $("#priceHistory").hide();
    }
}

function addProtocol() {
    $(".record-option-more-main").show();
    $(".record-option-more-foot").show();
    $(".record-option-more").show();
    $("[name=ca_title]").show();
    $(".record-option-more-foot button").eq(0).html("确认添加");
    $(".record-option-more-head").eq(0).html("添加附加协议");
    $("[name=record-add-content]").attr("placeholder", "附加协议说明");
    $(".record-option-more-main select").show();
    $(".record-option-more-head").eq(1).hide();
    $("#modifyPrice").hide();
    $("#showTip").show();
    $("[name=record-add-type]").attr("disabled", true);
    $("[name=record-add-type] option[value='1023']").attr("selected", "selected");
}

/** 【7.房态监控】 */
function houseMonitor() {
    $.ajax({
        type: "POST",
        url: "/houseLibrary/queryHouseInfo",
        data: {
            hi_code: hi_code
        },
        dataType: "json",
    }).done(function (result) {
        if (result.code != 200) {
            return;
        }
        var data = result.data.houseLibraryInfo;

        var html = '';
        html += '<div class="box-nav">';
        html += '	<div class="sub-title" style="border-bottom:none;">';
        html += '  		<ul class="title-nav">';
        html += '  			<li class="visited" data-id="itemlist">房态监控</li>';
        html += '  		</ul>';
        html += '  		<div class="title-option" style="position: absolute;right:10px;top: 2px;padding: 0;">';
        html += '  			<div class="title-option-item" id="chart-contract-box">';
        html += '  				<label class="option-item-title">合同编号</label>';
        html += '  				<select class="option-item-content" id="charts-contract" onchange="initCharts(\'chartRent\')" style="height: 32px;top:2px"></select>';
        html += '  			</div>';
        html += '  			<div class="title-option-item">';
        html += '  				<select class="option-item-content" id="charts-type" onchange="initCharts($(this).val())">';
        html += '  					<option value="chartRent">交租走势</option>';
        html += '  					<option value="chartCash">现金收支</option>';
        html += '  					<option value="chartForRent">招租监控</option>';
        html += '  				</select>';
        html += '  			</div>';
        html += '  		</div>';
        html += '	</div>';
        html += '</div>';
        html += '<div class="box-content custom-scroll" style="height: 70%;">';
        html += '  	<div class="sub-content">';
        html += '  		<div id="chart-rent">';
        html += '  		    <div class="chart-rent-main" style="height: 360px;width: 1066px;"></div>';
        html += '  		</div>';
        html += '  		<div id="chart-cash">';
        html += '  		    <div class="chart-rent-main" style="height: 360px;width: 1066px;"></div>';
        html += '  		</div>';
        html += '  		<div id="chart-forRent">';
        html += '  		    <div class="chart-rent-main" style="height: 360px;width: 1066px;"></div>';
        html += '  		</div>';
        html += '       <div id="chart-profit" style="padding-bottom: 10px;">';
        html += '           <div class="chart-rent-main" style="">';
        html += '               <div class="profit-info">';
        html += '                   <button class="opreat-btn" name="addGrossBtn" onclick="addGross(this)">添加记录</button>';
        html += '                   <button class="opreat-btn" name="genrateGPBtn" onclick="genrateGrossProfit(this)">一键生成</button>';
        html += '                   <div style="margin: 10px 8px 10px 0px;">';
        html += '                       <label class="record-option-item"><select name="data_state"><option value="1">有效</option><option value="0">无效</option></select></label>';
        html += '                       <label class="record-option-item"><select name="profitType"><option value="">毛利类型</option></select></label>';
        // html += '                       <label class="record-option-item"><select name="profitExplain"><option value="">小类类型</option></select></label>';
        html += '                   </div>';
        html += '                   <div class="subtotal-info"><label style="color: #18bc9c;">收入：<label id="profit_money">0.0</label>元</label><label style="color: #ff6666;">亏损：<label id="loss_money">0.0</label>元</label><label style="color: #3498db;">支出：<label id="expend_money">0.0</label>元</label><label style="color: #f39c12;">成本：<label id="cost_money">0.0</label>元</label></div>';
        html += '               </div>';
        html += '   		    <div class="record-option-more">';
        html += '			    	<div class="record-option-more-head">添加记录</div>';
        html += '			    	<div class="record-option-more-main">';
        html += '			    		<select name="record-add-contract" style="margin-right: 10px;width: auto;" required>';
        html += '			    	    	<option value="">关联合同</option>';
        html += '			    	    </select>';
        html += '			    	    <hr style="height: 10px;">';
        html += '			    	    <select name="record-add-profitType" style="width: auto;" required>';
        html += '			    	    	<option value="">类型</option>';
        html += '			    	    </select>';
        html += '			    	    <select name="record-add-profitExplain" style="width: auto;" required>';
        html += '			    	    	<option value="">小类</option>';
        html += '			    	    </select>';
        html += '			    	    <hr style="height: 10px;">';
        html += '			    		<input type="text" name="profit_money" placeholder="金额(元)" maxlength="10" required>';
        html += '			    	    <hr style="height: 10px;">';
        html += '                       <input type="text"  readonly id="conOpenDate" placeholder="开始日期" required> - <input type="text"  readonly id="conEndDate" placeholder="结束日期" required>';
        html += '			    	    <hr style="height: 10px;">';
        html += '			    	    <textarea name="record-add-content" placeholder="记录备注" required></textarea>';
        html += '			    	    <hr style="height: 10px;">';
        html += '			    	</div>';
        html += '			    	<div class="record-option-more-foot">';
        html += '			    		<button onclick="submitGrossProfit()">确认添加</button>';
        html += '			    	  	<button onclick="cancelAddGross()" style="background: #e74c3c;">取消</button>';
        html += '			    	</div>';
        html += '   		    </div>';
        html += '               <div class="box-content" style="">';
        html += '               	<div class="sub-content record-table-box" style="padding: 0">';
        html += '               		<table>';
        html += '               			<thead>';
        html += '               				<tr>';
        html += '               					<th style="width: 40px;text-align: center;">#</th>';
        html += '               					<th style="width: 120px;text-align: left;">合同号</th>';
        html += '               					<th style="width: 80px;text-align: center;">类型</th>';
        html += '               					<th style="width: 150px;text-align: center;">小类</th>';
        html += '               					<th style="width: 120px;">金额</th>';
        html += '               					<th style="text-align: left;">描述</th>';
        html += '               					<th style="width: 180px;text-align: center;">时间范围</th>';
        html += '               					<th style="width: 75px;text-align: center;">操作人</th>';
        html += '               					<th style="width: 150px;text-align: center;">录入时间</th>';
        html += '               				</tr>';
        html += '               			</thead>';
        html += '               		</table>';
        html += '               	</div>';
        html += '               	<div class="sub-content record-table-box" id="record-table-box2" style="padding: 0">';
        html += '               		<table>';
        html += '               			<tbody id="record-table-body2"></tbody>';
        html += '               		</table>';
        html += '               	</div>';
        html += '               	<div class="sub-content" id="record-table-foot2" style="padding: 12px 0">';
        html += '               		<button class="record-option fa-angle-left"></button>';
        html += '               		<input class="record-option number" id="record-pageNo2" value="1">';
        html += '               		<button class="record-option fa-angle-right"></button>';
        html += '               		<div class="record-option">共<span id="record-totalPage2">0</span>页，<span id="record-totalRecords2">0</span>条记录</div>';
        html += '               	</div>';
        html += '               </div>';
        html += '           </div>';
        html += '       </div>';
        html += '  	</div>';
        html += '</div>';
        $("#contentShow").html(html);

        // 初始化合同列表
        $.ajax({
            type: "POST",
            url: "/contractObject/queryHouseContractInfoList",
            data: {
                hi_code: hi_code
            },
            dataType: "json",
        }).done(function (result) {
            if (result.code != 200) {
                return;
            }
            $.each(result.data, function (index, data) {
                $("#charts-contract").append('<option value="' + data.contractObject_Code + '">' + data.contractObject_No + '</option>');
            });

            // 房态监控--初始化交租走势
            initCharts("chartCash");

            initGrossProfit(hi_code);

            initContract();

            init_power();

            init_power2();

            // 日期
            $("#conOpenDate").on("focus", function () {
                WdatePicker({
                    // minDate: returnDate(data.contractObject_FillTime),
                    onpicked: function (dp) {
                    }
                });
            });
            $("#conEndDate").on("focus", function () {
                WdatePicker({
                    // minDate: returnDate(data.contractObject_FillTime),
                    onpicked: function (dp) {
                    }
                });
            });

            $("select[name=data_state]").on("change", function () {
                initGrossProfit(hi_code);
            });

            $("select[name=profitType]").on("change", function () {
                initGrossProfit(hi_code);
            });
            
            $("[name=record-add-profitType]").on("change", function () {
                $.ajax({
                    type: "POST",
                    url: "/houseLibrary/queryGrossProfitList",
                    data: {
                        p_id: returnNumber($(this).val()),
                    },
                    dataType: "json",
                }).done(function (result) {
                    if (result.code != 200) {
                        return;
                    }
                    var option = "";
                    $("[name=record-add-profitExplain]").html("");
                    $.each(result.data.grossType, function (index, data) {
                        option += '<option value="' + returnValue(data.contractType_Code) + '">' + returnValue(data.contractType_Name) + '</option>';
                    });
                    $("[name=record-add-profitExplain]").append(option);
                });
            });

            var _box = $("#record-table-foot2");

            // 【上一页】
            _box.find(".fa-angle-left").on("click", function () {
                var pageNo = returnNumber(_box.find("#record-pageNo2").val());
                if (pageNo <= 1) {
                    return;
                }
                var totalPage = returnNumber(_box.find("#record-totalPage2").text());
                if (pageNo > totalPage) {
                    _box.find("#record-pageNo2").val(totalPage);
                } else {
                    _box.find("#record-pageNo2").val(pageNo - 1);
                }
                initGrossProfit(hi_code);
            });

            // 【下一页】
            _box.find(".fa-angle-right").on("click", function () {
                var pageNo = returnNumber(_box.find("#record-pageNo2").val());
                var totalPage = returnNumber(_box.find("#record-totalPage2").text());
                if (pageNo >= totalPage) {
                    return;
                }
                _box.find("#record-pageNo2").val(pageNo + 1);
                initGrossProfit(hi_code);
            });
        });

        // 初始化CHARTS
        initCharts("chartCash");

    });
}

function init_power() {

    // 查询是否有添加记录，一键生成权限
    $.ajax({
        type: "POST",
        url: "/user/checkRoleJdjustPrice",
        data: {
            ucps_url: "/houseLibrary/addGrossProfitRecord",
        },
        dataType: "json",
    }).done(function (result) {
        if (result.hasAdjustPrice == true) {
            $("button[name=addGrossBtn]").show();
        } else {
            $("button[name=addGrossBtn]").hide();
        }
    });
}

function init_power2() {

    // 查询是否有添加记录，一键生成权限
    $.ajax({
        type: "POST",
        url: "/user/checkRoleJdjustPrice",
        data: {
            ucps_url: "/houseLibrary/genrateGrossProfit",
        },
        dataType: "json",
    }).done(function (result) {
        if (result.hasAdjustPrice == true) {
            $("button[name=genrateGPBtn]").show();
        } else {
            $("button[name=genrateGPBtn]").hide();
        }
    });
}

function addGross(obj) {
    $(obj).addClass("disabled-allowed");
    $("#chart-profit").find(".record-option-more").show();
}

function cancelAddGross() {
    $("#chart-profit").find(".opreat-btn").removeClass("disabled-allowed");
    $("#chart-profit").find(".record-option-more").hide();
}

function submitGrossProfit() {

    var data = {};
    var houseGrossProfitVo = {};
    houseGrossProfitVo.hi_code = returnValue(getUrlParam("hi_code"));

    var contractObject_Code = $("[name=record-add-contract]").val();
    // if(isEmpty(contractObject_Code)){
    //     $.jBox.tip("请选择关联合同", "error");
    //     return;
    // }

    var profitType = $("[name=record-add-profitType]").val();
    if(isEmpty(profitType)){
        $.jBox.tip("请选择类型", "error");
        return;
    }

    var profitExplain = $("[name=record-add-profitExplain]").val();
    if(isEmpty(profitExplain)){
        $.jBox.tip("请选择小类", "error");
        return;
    }

    var profit_money = $("[name=profit_money]").val();
    if(isEmpty(profit_money)){
        $.jBox.tip("请输入金额", "error");
        return;
    }
    if(isNaN(profit_money)){
        $.jBox.tip("请输入数字", "error");
        return;
    }

    var start_date = $("#conOpenDate").val();
    if(isEmpty(start_date)){
        $.jBox.tip("请选择开始日期", "error");
        return;
    }

    var end_date = $("#conEndDate").val();
    if(isEmpty(end_date)){
        $.jBox.tip("请选择结束日期", "error");
        return;
    }

    houseGrossProfitVo.contractObject_code = contractObject_Code;
    houseGrossProfitVo.profitType = profitType;
    houseGrossProfitVo.profitExplain = profitExplain;
    houseGrossProfitVo.profit_money = profit_money;
    houseGrossProfitVo.profit_description = $("[name=record-add-content]").val();
    houseGrossProfitVo.start_date = start_date;
    houseGrossProfitVo.end_date = end_date;
    data.houseGrossProfitVo = JSON.stringify(houseGrossProfitVo);

    $.ajax({
        type: "POST",
        url: "/houseLibrary/addGrossProfitRecord",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $.jBox.tip("数据提交中，请稍后...", "loading");
        }
    }).done(function (result) {
        if (result.code != 200) {
            $.jBox.tip(result.msg, "error");
            return;
        }
        $.jBox.tip("添加成功", "success");
        cancelAddGross();
        initGrossProfit(returnValue(getUrlParam("hi_code")));
    });
}

function genrateGrossProfit(obj) {
    $.ajax({
        type: "POST",
        url: "/houseLibrary/genrateGrossProfit",
        data: {
            hi_code : getUrlParam("hi_code")
        },
        dataType: "json",
        // contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $.jBox.tip("数据生成中，请稍后...", "loading");
        }
    }).done(function (result) {
        if (result.code != 200) {
            $.jBox.tip(result.msg, "error");
            return;
        }
        $.jBox.tip("一键生成成功", "success");
        initGrossProfit(returnValue(getUrlParam("hi_code")));
    });
}

function initContract() {
    // 【初始化选项数据】
    $.ajax({
        type: "POST",
        url: "/contractObject/queryContractImplRecordAbout",
        data: {
            hi_code: returnValue(getUrlParam("hi_code")),
        },
        dataType: "json",
    }).done(function (result) {
        if (result.code != 200) {
            return;
        }
        var _option = "";
        $.each(result.data.contractList, function (index, data) {
            _option += '<option value="' + returnValue(data.contractObject_Code) + '">' + returnValue(data.contractObject_Type) + " - " + returnValue(data.contractObject_No) + '</option>';
        });
        $("[name=record-add-contract]").append(_option);

        var _profitOpt = "";
        $.each(result.data.profitType, function (index, data) {
            _profitOpt += '<option value="' + returnValue(data.contractType_Code) + '">' + returnValue(data.contractType_Name) + '</option>';
        });
        $("[name=record-add-profitType]").append(_profitOpt);
        $("[name=profitType]").append(_profitOpt);
    });
}

/**
 * 初始化该房屋收入亏损支出记录
 */
function initGrossProfit(hi_code) {
    $.ajax({
        type: "POST",
        url: "/houseLibrary/queryGrossProfitRecord",
        data: {
            hi_code: hi_code,
            data_state: $("select[name=data_state]").val(),
            profitType: $("select[name=profitType]").val(),
            pageNo: returnValue($("#record-pageNo2").val()),
            pageSize: 15
        },
        dataType: "json",
        beforeSend: function () {
            $("#record-table-body2").html('<tr><td colspan="7"><div class="loading"></div></td></tr>');
        }
    }).done(function (result) {
        if (result.code != 200) {
            return;
        }
        $("#record-table-body2").empty();
        $.each(result.data.data.list, function (index, data) {
            var color = "";
            var profitStr = returnValue(data.profitTypeStr);
            if("收入" == profitStr){
                color = "#18bc9c";
            } else if("亏损" == profitStr){
                color = "#ff6666";
            } else if("支出" == profitStr){
                color = "#3498db";
            } else if("成本" == profitStr){
                color = "#f39c12";
            }
            // 数据项
            var html = '';
            html += '<tr class="record-visible-tr' + returnValue(data.cir_id) + '" style="border-top: 1px solid #ddd;">';
            html += '	<td style="width: 40px;text-align: center;">' + (index + 1) + '</td>';
            html += '	<td style="width: 120px;text-align: left;">' + returnValue(data.contractObject_No) + '</td>';
            html += '	<td style="width: 80px;text-align: center;">' + profitStr + '</td>';
            html += '	<td style="width: 150px;text-align: center;">' + returnValue(data.profitExplainStr) + '</td>';
            html += '	<td style="width: 120px;font-family:Georgia, serif; color:' + color + ';font-size: 15px;">' + returnMoney(data.profit_money) + '</td>';
            html += '	<td style="text-align: left;">' + returnValue(data.profit_description) + '</td>';
            html += '	<td style="width: 180px;text-align: center;">' + returnDate(data.start_date) + ' - ' + returnDate(data.end_date) + '</td>';
            html += '	<td style="width: 75px;text-align: center;">' + returnValue(data.em_name) + '</td>';
            html += '	<td style="width: 150px;text-align: right;">' + returnTime(data.create_time) + '</td>';
            html += '</tr>';
            $("#record-table-body2").append(html);
        });

        if(!isEmpty(result.data.subtotalData)){
            $.each(result.data.subtotalData, function (index, data) {
                var profitTypeStr = returnValue(data.profitTypeStr);
                var money = isEmpty(data.subtotal) ? 0.0 : returnMoney(data.subtotal);
                if("收入" == profitTypeStr){
                    $("#chart-profit").find("#profit_money").text(money);
                } else if("亏损" == profitTypeStr){
                    $("#chart-profit").find("#loss_money").text(money);
                } else if("支出" == profitTypeStr){
                    $("#chart-profit").find("#expend_money").text(money);
                } else if("成本" == profitTypeStr){
                    $("#chart-profit").find("#cost_money").text(money);
                }
            });
        }
        $("#record-totalPage2").text(result.data.data.totalPage);
        $("#record-totalRecords2").text(result.data.data.totalRecords);
    });
}

/** 房源概述--显示更多房源信息*/
function showMoreHouseInfo(obj) {
    var _data = $("#hi_data").data("data");
    var _target_box = $(".table-item-box-main");
    var _this = $(obj);

    if (_this.attr("class").indexOf("fa-angle-down") > -1) {
        _this.data("cache-html", _target_box.html());
        _this.removeClass("fa-angle-down").addClass("fa-angle-up");

        var html = '';
        html += '';
        _target_box.html(html).css({position: "initial"});
    } else {
        _this.removeClass("fa-angle-up").addClass("fa-angle-down");
        _target_box.html(_this.data("cache-html")).css({position: "absolute"});
    }
}

/** 房屋记录--删除附件文件*/
function deleteAttachFile(obj, url) {
    var _parent = $(obj).parents(".more-main-item-subitem");
    if (isEmpty(url)) {
        _parent.remove();
        return;
    }
    $.ajax({
        type: "POST",
        url: "/contractObject/deletAttachFile",
        data: {
            url: url
        },
        dataType: "json",
        beforeSend: function () {
            _parent.fadeOut();
        }
    }).done(function (result) {
        _parent.remove();
    });
}

/** 房屋记录--提交添加日志*/
function submitContrctRecord() {
    $("#priceHistory").hide();
    var _contractObject_code = $("[name=record-add-contract]").val();
    var _cir_type = $("[name=record-add-type]").val();
    if (!$(".record-option-more-main select").is(":hidden")) {
        if (isEmpty(_contractObject_code)) {
            $("[name=record-add-contract]").msg("请选择关联合同");
            return;
        }
        if (isEmpty(_cir_type)) {
            $("[name=record-add-type]").msg("请选择记录类型");
            return;
        }
    } else {
        if (!$("#applyPrice").is(":hidden"))
            _cir_type = "1016";
        if (!$("#resetPrice").is(":hidden"))
            _cir_type = "1015";
    }
    var _cir_content = $("[name=record-add-content]").val().trim();
    if (isEmpty(_cir_content)) {
        $("[name=record-add-content]").msg("请填写记录内容");
        return;
    }

    var data = {};
    var contractImplRecord = {};
    if (_cir_type == "1016") {
        _cir_content = "【申请调价" + $("#applyPrice input").val() + "元】" + _cir_content;
        contractImplRecord.apply_price = $("#applyPrice input").val();
    } else if (_cir_type == "1015") {
        _cir_content = "【调整定价" + $("#resetPrice input").val() + "元】" + _cir_content;
        contractImplRecord.apply_price = $("#resetPrice input").val();
    }

    contractImplRecord.cir_id = $("[name=record-add-id]").val();
    contractImplRecord.hi_code = returnValue(getUrlParam("hi_code"));
    contractImplRecord.contractObject_code = _contractObject_code;
    contractImplRecord.cir_type = _cir_type;
    contractImplRecord.cir_content = _cir_content;
    data.contractImplRecord = JSON.stringify(contractImplRecord);
    data.saveremark = $("#save_remark").val();

    var contractAttachments = [];
    var isOk = true;
    var _attach_file = $(".more-main-item-subitem");
    if (_attach_file.length > 0) {
        if ("1023" == _cir_type) {//  协议类型
            if (_attach_file.length > 1) {
                $.jBox.tip("添加附加协议，只能上传一个文件", "error");
                return false;
            }
        }

        var isPdfWord = true;
        _attach_file.each(function () {
            var _data = $(this).data("data");
            if (isEmpty(_data)) {
                isOk = false;
                return false;
            }
            if ("1023" == _cir_type) {//  协议类型
                if ("PDF" != _data.type && "pdf" != _data.type
                    && "docx" != _data.type && "DOCX" != _data.type
                    && "doc" != _data.type) {
                    isPdfWord = false;
                }
            }
            var contractAttachment = {};
            contractAttachment.ca_name = _data.name;
            contractAttachment.ca_path = _data.key;
            contractAttachment.ca_type = _data.type;
            contractAttachment.ca_title = $("[name=ca_title]").val();
            contractAttachment.ca_desc = $("[name=record-add-content]").val();
            contractAttachments.push(contractAttachment);
        });
        if (!isPdfWord) {
            $.jBox.tip("只支持PDF文件或WORD文档", "error");
            return false;
        }
        data.contractAttachments = JSON.stringify(contractAttachments);
    }
    $.ajax({
        type: "POST",
        url: "/contractObject/addContractImplementRecord",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $("#record-table-body").html('<tr><td colspan="7"><div class="loading"></div></td></tr>');
        }
    }).done(function (result) {
        if (result.code != 200) {
            $.jBox.tip(result.msg, "error");
            return;
        }
        $.jBox.tip("添加成功", "success");
        closeAddContractRecord();
        queryContractRecordList();
        houseRecord();
    });
}

/** 出房调价 */
function adjustHouse() {

    var isApply = false;
    var _data = $("#hi_data").data("data");
    var em_id = returnNumber($.cookie("em_id"));// 当前登录人员
    var owener_id = _data.hpr_newEmp;// 存房人
    // 判断是否为本部门房源及部门负责人
    $.ajax({
        type: "POST",
        url: "/contractObject/isOwenHouse",
        data: {
            hi_code: getUrlParam("hi_code"),
        },
        dataType: "json",
    }).done(function (result) {

        var ucc_person = result.company.em_id;// 房源归属部门主管

        if (_data.contract_intoStatus != "已签合同") {
            jBox.tip("请签订托管合同或待合同生效后再定价", "warning");
            return;
        }

        if (em_id != owener_id && em_id != ucc_person) {
            jBox.tip("存房人或房源归属部门主管才可以调价或申请调价", "warning");
            return;
        }
        // 新存招租|到期转租 存房人七天内有且仅有一次调价权
        else if (em_id == owener_id) {
            if ((_data.hi_forRentState == 1001 || _data.hi_forRentState == 1004) &&
                ((new Date().getTime() - _data.contract_beginDate) <= 7 * 24 * 60 * 60 * 1000) && (returnNumber(_data.hi_priceCount) <= 0)) {
                // 直接调价
                adjuestMoney();
            } else {
                // 申请调价
                showPrice();
            }
        }
        // 二次出房包含转租招租、退租招租、强收招租、换房招租房源归属部门主管可调价
        else if (em_id == ucc_person) {
            if (_data.hi_forRentState == 1002 || _data.hi_forRentState == 1003 || _data.hi_forRentState == 1005 || _data.hi_forRentState == 1006) {
                // 直接调价
                adjuestMoney();
            } else if(_data.hi_forRentState == 1001){
                adjuestMoney();
            } else {
                jBox.tip("新存房、到期房只有存房人七天内有一次调价权", "warning");
                return;
            }
        }
    });
}

function adjuestMoney() {
    $(".record-option-more").show();
    $(".record-option-more-head").eq(0).html("出房调价");
    $(".record-option-more-foot button").eq(0).html("确定调价");
    $("[name=record-add-content]").attr("placeholder", "调价内容");
    $(".record-option-more-main select").hide();
    $(".record-option-more-head").eq(1).hide();
    $("#modifyPrice").show();

    $("#applyPrice").hide();
    $("#resetPrice").show();
    $("#priceBtn").hide();
    $(".record-option-more-main").show();
    $(".record-option-more-foot").show();
    $("[name=ca_title]").hide();
    $("#showTip").hide();
    $("#adjustType").val(1015);// 调价
    $("#showTipInfo label").eq(0).show();
    $("#showTipInfo label").eq(1).hide();
}

function showPrice() {
    $(".record-option-more").show();
    $(".record-option-more-head").eq(0).html("出房调价");
    $(".record-option-more-foot button").eq(0).html("提交申请");
    $("[name=record-add-content]").attr("placeholder", "申请内容");
    $(".record-option-more-main select").hide();
    $(".record-option-more-head").eq(1).hide();
    $("#modifyPrice").show();

    $("#applyPrice").show();
    $("#resetPrice").hide();
    $("#priceBtn").hide();
    $(".record-option-more-main").show();
    $(".record-option-more-foot").show();
    $("[name=ca_title]").hide();
    $("#showTip").hide();
    $("#adjustType").val(1016);// 申请
    $("#showTipInfo label").eq(0).hide();
    $("#showTipInfo label").eq(1).show();
}

/** 房屋记录--添加日志*/
function addContractRecord() {
    //	if($(".record-option-more").is(":hidden")){
    $(".record-option-more-main").show();
    $(".record-option-more-foot").show();
    $(".record-option-more").show();
    $("[name=ca_title]").hide();
    $(".record-option-more-foot button").eq(0).html("确认添加");
    $(".record-option-more-head").eq(0).html("添加日志");
    $("[name=record-add-content]").attr("placeholder", "日志内容");
    $(".record-option-more-main select").show();
    $(".record-option-more-head").show();
    $("#modifyPrice").hide();
    $("#showTip").hide();
    $("[name=record-add-type]").attr("disabled", false);
    $("[name=record-add-type] option").eq(0).attr("selected", "selected");
    //	} else {
    //		closeAddContractRecord();
    //	}
}

/** 房屋记录--关闭添加日志*/
function closeAddContractRecord() {
    $(".record-option-more").hide();
    $(".record-option-more").find("select option:eq(0)").attr("selected", "selected");
    $(".record-option-more").find("textarea").val("");
    $("#modifyPrice").hide();
}

/** 房屋记录--查询合同执行记录 TODO */
function queryContractRecordList() {
    $.ajax({
        type: "POST",
        url: "/contractObject/queryContractImplRecord",
        data: {
            hi_code: returnValue(getUrlParam("hi_code")),
            cir_type: $("[name=record-type]").val(),
            con_code: $("[name=record-contract]").val(),
            cir_source: $("[name=record-source]").val(),
            cir_content: $("[name=record-where]").val(),
            pageNo: returnValue($("#record-pageNo").val()),
            pageSize: 15
        },
        dataType: "json",
        beforeSend: function () {
            $("#record-table-body").html('<tr><td colspan="7"><div class="loading"></div></td></tr>');
        }
    }).done(function (result) {
        if (result.code != 200) {
            return;
        }
        $("#record-table-body").empty();

        if (result.data.list.length == 0) {
            $("#record-table-body").html('<tr><td colspan="7" style="text-align: center;line-height: 120px;">没有记录</td></tr>');
            return;
        }
        $.each(result.data.list, function (index, data) {
            var _cir_type = returnImplRecordType(data.cir_type);
            var priceColor = "";
            if ("待审" == data.priceResult) {
                priceColor = "#da9120";
            } else if ("通过" == data.priceResult) {
                priceColor = "#18bc9c";
            } else if ("驳回" == data.priceResult) {
                priceColor = "#e8390f";
            }
            // 数据项
            var html = '';
            html += '<tr class="record-visible-tr' + returnValue(data.cir_id) + '" style="border-top: 1px solid #ddd;">';
            html += '	<td style="width: 40px;text-align: center;">' + (index + 1) + '</td>';
            html += '	<td style="width: 97px;text-align: left;">' + returnValue(data.contractObject_No) + '</td>';
            html += '	<td class="' + _cir_type.color + '" style="width: 60px;text-align: center;">' + _cir_type.title + '</td>';
            html += '	<td onclick="displayRecordTr(\'' + returnValue(data.cir_id) + '\')" style="text-align: left;cursor: pointer;" title="查看更多">';
            html += '		<div class="record-td-content-hint" style="' + (isEmpty(data.attList) ? "background: #c3c3c3;" : "") + '">附</div>';
            html += '		<div class="record-td-content-hint" style="background: ' + priceColor + ';">' + data.priceResult + '</div>';
            html += '		<div class="record-td-content-main" style="width: 390px;">' + returnValue(data.cir_content) + ("驳回" == data.priceResult ? ("<label style='color:#e8390f;cursor: pointer;'>  [" + data.refused_reason + "]</label>") : "") + '</div>';
            html += '	</td>';
            html += '	<td style="width: 80px;">' + returnValue(data.em_name) + '</td>';
            html += '	<td style="width: 153px;">' + returnTime(data.cir_createTime) + '</td>';
            html += '	<td style="width: 74px;text-align: center;">' + returnValue(data.cir_source == 0 ? "系统添加" : "手动添加") + '</td>';
            // html += '	<td style="width: 120px;text-align: center;"></td>'; // <a href="javascript:;" class="hint" onclick="eidtImplRecord(\''+ returnValue(data.cir_id) +'\')">编辑</a>
            html += '</tr>';
            // 隐藏操作项
            html += '<tr class="record-hidden-tr' + returnValue(data.cir_id) + '" style="background: ' + (index % 2 == 0 ? "#f5f8fa" : "#ffffff") + ';">';
            html += '</tr>';
            $("#record-table-body").append(html);
            $('.record-visible-tr' + returnValue(data.cir_id)).data("data", data);
        });

        $("#record-totalPage").text(result.data.totalPage);
        $("#record-totalRecords").text(result.data.totalRecords);

    });
}

/** 房屋记录--编辑合同执行记录*/
function eidtImplRecord(id) {
    var _box = $(".record-hidden-tr" + id);
    if (_box.is(":visible")) {
        _box.hide();
        return;
    }

    var data = $(".record-visible-tr" + id).data("data");
    var html = '';
    html += '	<td colspan="99" style="padding: 10px;">';
    html += '       <div class="record-hidden-content">';
    html += '       	<i class="i-hand-2"></i>';
    html += '       	<table>';
    html += '       	<tr style="border-bottom: 1px solid #ddd;">';
    html += '       	    <td style="width: 120px;text-align: right;color: #000;">记录内容</td>';
    html += '       	    <td>' + returnValue(data.cir_content) + '</td>';
    html += '       	</tr>';
    html += '       	<tr>';
    html += '       	    <td style="width: 120px;text-align: right;color: #000;">附件</td>';
    html += '       	    <td>';
    if (!isEmpty(data.attList)) {
        html += '<div class="record-attach-title">';
        html += '	<ul>';
        $.each(data.attList, function (index, _data) {
            var icon_image = '';
            switch (_data.ca_type) {
                case "jpeg":
                case "jpg":
                case "png":
                    icon_image = '' + _data.ca_path_real;
                    break;
                default:
                    icon_image = '/resources/common/zyupload/skins/images/fileType/' + _data.ca_type + '.png';
                    break;
            }
            html += '<li title="点击查看 ' + returnValue(_data.ca_name) + '">';
            html += '	<a href="' + _data.ca_path_real + '" target="_blank">';
            html += '       <div class="attach-title-head"><img src="' + icon_image + '" alt="' + returnValue(_data.ca_name) + '"></div>';
            html += '		<div class="attach-title-foot">' + returnValue(_data.ca_name) + '</div>';
            html += '	</a>';
            html += '</li>';
        });
        html += '	</ul>';
        html += '</div>';
        html += '<div class="record-attach-content" id="attach-content' + returnValue(data.cir_id) + '" style="display:none">';
        html += '   <div class="attach-content-head"></div>';
        html += '   <div class="attach-content-foot"></div>';
        html += '</div>';
    } else {
        html += '无附件';
    }
    html += '       	    </td>';
    html += '       	</tr>';
    html += '       	</table>';
    html += '       </div>';
    html += '	</td>';

    _box.html(html).fadeIn();
}

/**
 * 房屋记录--显示隐藏记录
 * @param id
 */
function displayRecordTr(id) {
    var _box = $(".record-hidden-tr" + id);
    if (_box.is(":visible")) {
        _box.hide();
        return;
    }

    var data = $(".record-visible-tr" + id).data("data");

    var html = '';
    html += '	<td colspan="99" style="padding: 10px;">';
    html += '       <div class="record-hidden-content">';
    html += '       	<i class="i-hand-1"></i>';
    html += '       	<table>';
    if (data.cir_type == 1023) {
        var attObj = data.attList[0];
        html += '       	<tr style="border-bottom: 1px solid #f3f3f3;">';
        html += '       	    <td style="width: 120px;text-align: right;color: #000;">协议标题</td>';
        html += '       	    <td>' + returnValue(attObj.ca_title) + '</td>';
        html += '       	</tr>';
        html += '       	<tr style="border-bottom: 1px solid #f3f3f3">';
        html += '       	    <td style="width: 120px;text-align: right;color: #000;">描述</td>';
        html += '       	    <td>' + returnValue(attObj.ca_desc) + '</td>';
        html += '       	</tr>';
    } else {
        html += '       	<tr style="border-bottom: 1px solid #f3f3f3">';
        html += '       	    <td style="width: 120px;text-align: right;color: #000;">描述</td>';
        html += '       	    <td>' + returnValue(data.cir_content) + ("驳回" == data.priceResult ? ("<label style='color:#e8390f;'>  [" + data.refused_reason + "]</label>") : "") + '</td>';
        html += '       	</tr>';
    }
    html += '       	<tr>';
    html += '       	    <td style="width: 120px;text-align: right;color: #000;">附件</td>';
    html += '       	    <td>';
    if (!isEmpty(data.attList)) {
        html += '<div class="record-attach-title">';
        html += '	<ul>';
        $.each(data.attList, function (index, _data) {
            var icon_image = '';
            switch (_data.ca_type) {
                case "image/jpeg":
                case "image/png":
                case "jpeg":
                case "jpg":
                case "png":
                    icon_image = '' + _data.ca_path_real;
                    break;
                default:
                    icon_image = '/resources/common/zyupload/skins/images/fileType/' + _data.ca_type + '.png';
                    break;
            }
            html += '<li title="点击查看 ' + returnValue(_data.ca_name) + '">';
            html += '	<a href="' + _data.ca_path_real + '" target="_blank">';
            html += '       <div class="attach-title-head"><img src="' + icon_image + '" alt="' + returnValue(_data.ca_name) + '"></div>';
            html += '		<div class="attach-title-foot">' + returnValue(_data.ca_name) + '</div>';
            html += '	</a>';
            html += '</li>';
        });
        html += '	</ul>';
        html += '</div>';
        html += '<div class="record-attach-content" id="attach-content' + returnValue(data.cir_id) + '" style="display:none">';
        html += '   <div class="attach-content-head">';
        html += '   	';
        html += '   </div>';
        html += '   <div class="attach-content-foot">';
        html += '   	';
        html += '   </div>';
        html += '</div>';
    } else {
        html += '无附件';
    }
    html += '       	    </td>';
    html += '       	</tr>';
    if (!isEmpty(data.attList) && data.cir_type == 1023) {
        var attObj = data.attList[0];
        var ca_signState = returnAgreementState(attObj.ca_signState);

        html += '       	<tr>';
        html += '       	    <td style="width: 120px;text-align: right;color: #000;"></td>';
        html += '       	    <td>';
        html += '       	        <div style="display: flex;">';
        html += '       	            <div>签署状态：</div>';
        html += '       	            <div class="' + ca_signState.style + '">' + ca_signState.text + '</div>';
        html += '       	        </div>';
        html += '       	    </td>';
        html += '       	</tr>';
    }
    html += '       	</table>';
    html += '       </div>';
    html += '	</td>';

    _box.html(html).fadeIn();
}

/** 业绩更多详情查询*/
function achievementMoreShow(obj, id, goods, mode, cno) {
    var _this = $(obj);
    var _box = $("#item-main-tr-more" + cno);
    var _box_td = _box.find("td");

    if (isEmpty(mode)) {
        var _icon = _this.find("i");
        if (_box.is(":visible")) {
            _icon.removeClass("fa-chevron-circle-down").removeClass("fa-chevron-circle-up");
            _icon.addClass("fa-chevron-circle-down");
            _box.fadeOut();
            return;
        }
        _icon.removeClass("fa-chevron-circle-down").removeClass("fa-chevron-circle-up");
        _icon.addClass("fa-chevron-circle-up");
    }
    _box.fadeIn();
    if (isEmpty(id)) {
        _box_td.html('<div class="error" style="line-height: 120px;text-align: center; ">没有发现业绩<a href="javascript:;" class="loading-reload" onclick="resetContractAchi(this,' + id + ', ' + goods + ',\'build\', \'' + cno + '\')">生成业绩</a></div>');
        return;
    }
    $.ajax({
        type: "POST",
        url: "/achievement/selectOneAchievement",
        data: {
            sa_id: id
        },
        dataType: "json",
        beforeSend: function () {
            _box_td.html('<div class="loading"></div>');
        }
    }).done(function (result) {
        if (result.code != 200) {
            _box_td.html('<div class="error" style="line-height: 120px;text-align: center; ">没有发现业绩<a href="javascript:;" class="loading-reload" onclick="achievementMoreShow(null, ' + id + ', ' + goods + ',\'reload\');">重试</a></div>');
            return;
        }
        var _data = result.data;
        // 【总业绩】------------------------------
        var achievementTotal = _data.achievementTotal;

        var html = "";
        html += '<div>';
        html += '	<table class="achi-table">';
        html += '			<tr class="thead">';
        html += '			     <td rowspan="2">管家</td>';
        html += '			     <td rowspan="2">类型</td>';
        html += '			     <td id="achi-audited-box" colspan="6">业绩</td>';
        html += '			     <td class="hidden-td" colspan="5">其他扣费</td>';
        html += '			     <td rowspan="2">合计</td>';
        html += '			     <td class="diaplay-more-option" rowspan="99"></td>';
        html += '			</tr>';
        html += '			<tr class="thead">';
        html += '			     <td>转租费</td>';
        html += '			     <td>免租期</td>';
        html += '			     <td>招租期</td>';
        html += '			     <td>管理费</td>';
        html += '			     <td>租金差价</td>';
        html += '			     <td>业绩补贴</td>';
        html += '			     <td class="hidden-td">物品购置</td>';
        html += '			     <td class="hidden-td">包修费</td>';
        html += '			     <td class="hidden-td">合作费</td>';
        html += '			     <td class="hidden-td">广告费</td>';
        html += '			     <td class="hidden-td">调整</td>';
        html += '			</tr>';

        // 【遍历子业绩】------------------------------
        var sub_html = "";
        var total_glf = 0;
        var total_yjbt = 0;
        var sumList_len = _data.achievementSumList.length;

        //		var zl_count = 0;
        //		var tg_count = 0;
        //		$.each(_data.achievementSumList, function(index, data){
        //		if(data.ab_acType.indexOf("出房") > -1){
        //		zl_count++;
        //		}
        //		if(data.ab_acType.indexOf("存房") > -1){
        //		tg_count++;
        //		}
        //		});
        $.each(_data.achievementSumList, function (index, data) {
            var _zzf = 0;
            var _glf = 0; // 管理费
            var _yjbt = returnFloat(data.ab_subsidyMoney); // 业绩补贴
            $.each(data.achievementBillContents, function (index, data2) {
                if (data.ab_id == data2.ab_id) {
                    switch (data2.abc_type) {
                        case "转租费":
                            _zzf = returnFloat(data2.abc_money);
                            break;
                        case "管理费":
                            _glf = returnFloat(data2.abc_money);
                            total_glf = _glf;
                            break;
                        case "业绩补贴":
                            //						_yjbt = returnFloat(data2.abc_money);
                            total_yjbt += _yjbt;
                            break;
                    }
                }
            });

            // 类型
            var _type = data.ab_acType;
            if (!isEmpty(_type)) {
                if (data.ab_acType.indexOf("新出房") > -1) {
                    _type = '新出房';
                    _zzf = _zzf * (returnFloat(data.contract_perforSplit) / 100);
                    //					_yjbt = _yjbt * (returnFloat(data.contract_perforSplit)/100);
                }
                if (data.ab_acType.indexOf("存房") > -1) {
                    _zzf = 0;
                    _glf = 0;
                    //					_yjbt = _yjbt * (returnFloat(data.contract_perforSplit)/100);
                }
            }

            // 业绩
            var _achi_money = returnFloat(data.ab_oldMoney + data.ab_newMoney);
            //			if(data.ab_acType.indexOf("出房") > -1){
            //			_yjbt = returnFloat(_yjbt/zl_count);
            //			}
            //			if(data.ab_acType.indexOf("存房") > -1){
            //			_yjbt = returnFloat(_yjbt/tg_count);
            //			}

            sub_html += '<tr class="tbody">';
            sub_html += '    <td>' + returnValue(data.em_name) + '</td>'; // 管家
            sub_html += '    <td>' + _type + '</td>'; // 类型
            sub_html += '    <td>' + returnFloat(_zzf) + '</td>'; // 转租费
            sub_html += '    <td colspan="4">' + returnFloat((_achi_money - returnFloat(_yjbt) - returnFloat(_zzf))) + '</td>'; // 业绩
            sub_html += '    <td>' + returnFloat(_yjbt) + '</td>'; // 业绩补贴
            sub_html += '    <td class="hidden-td" colspan="5">&nbsp;</td>'; // 其他扣费
            sub_html += '    <td>' + returnFloat(_achi_money) + '</td>'; // 合计
            sub_html += '</tr>';
        });

        // 类型
        var _type = achievementTotal.ab_acType;
        if (!isEmpty(_type)) {
            if (_type.indexOf("新存房") > -1) {
                _type = '新存房';
            } else if (_type.indexOf("新出房") > -1) {
                _type = '新出房';
            }
        }

        // 招租期
        var _freeDay = returnFloat(achievementTotal.sa_freeDay);
        var _freeDay_class = '';
        var _freeMoney = returnFloat(achievementTotal.sa_lossMoney == 0 || isEmpty(achievementTotal.sa_lossMoney) ? achievementTotal.sa_freeMoney : achievementTotal.sa_lossMoney);
        if (_freeMoney > 0) {
            _freeDay_class = 'error';
            _freeMoney = 0 - _freeMoney;
        }

        // 免租期
        var _forRentDay = returnFloat(achievementTotal.sa_forRentDay);
        var _forRentDay_money = returnFloat(_forRentDay * (returnFloat(achievementTotal.sa_saveMoney) / 30));

        var total_total = returnFloat(achievementTotal.sa_turnRentMoney) +
            _forRentDay_money +
            _freeMoney +
            returnFloat(total_glf) +
            returnFloat(achievementTotal.sa_difference) +
            returnFloat(0) + // TODO ! 业绩补贴
            returnFloat(goods) +
            returnFloat(achievementTotal.sa_tRepairMoney) -
            (returnFloat(achievementTotal.sa_zworkMoney) + returnFloat(achievementTotal.sa_tworkMoney)) -
            returnFloat(achievementTotal.xx) + // TODO ! 广告费
            returnFloat(achievementTotal.ar_money);

        // 调整业绩
        var ar_money_class = '';
        if (returnFloat(achievementTotal.ar_money) < 0) {
            ar_money_class = 'error';
        }
        var achi_tz = '';
        if (returnFloat(achievementTotal.ar_money) != 0) {
            achi_tz += '<i class="icon-exclamation-sign achi-tz-hint"></i>';
            achi_tz += '<div class="achi-tz-content" data-title="调整理由">';
            achi_tz += '	<label>' + achievementTotal.ar_content + '</label>';
            achi_tz += '</div>';
        }

        html += '			<tr class="tbody">';
        html += '			    <td class="achi-total">营收</td>'; // 管家
        html += '			    <td class="achi-total">--</td>'; // 类型
        html += '			    <td class="achi-total">' + returnFloat(achievementTotal.sa_turnRentMoney) + '</td>'; // 转租费
        html += '			    <td class="achi-total">' + _forRentDay + '天（<label>' + _forRentDay_money + '</label>）</td>'; // 免租期
        html += '			    <td class="achi-total">' + _freeDay + '天（<label class="' + _freeDay_class + '">' + _freeMoney + '</label>）</td>'; // 招租期
        html += '			    <td class="achi-total">' + returnFloat(total_glf) + '</td>'; // 管理费
        html += '			    <td class="achi-total">' + returnFloat(achievementTotal.sa_difference) + '</td>'; //  租金差价
        html += '			    <td class="achi-total">' + returnFloat(0) + '</td>'; // 业绩补贴
        html += '			    <td class="achi-total hidden-td error">' + returnFloat(goods) + '</td>'; // 物品购置
        html += '			    <td class="achi-total hidden-td error">' + returnFloat(achievementTotal.sa_tRepairMoney) + '</td>'; // 包修费
        html += '			    <td class="achi-total hidden-td error">' + -(returnFloat(achievementTotal.sa_zworkMoney) + returnFloat(achievementTotal.sa_tworkMoney)) + '</td>'; // 合作费
        html += '			    <td class="achi-total hidden-td error">' + returnFloat(achievementTotal.xx) + '</td>'; // 广告费
        html += '			    <td class="achi-total hidden-td ' + ar_money_class + '" style="padding: 0 10px;">' + returnFloat(achievementTotal.ar_money) + achi_tz + '</td>'; // 调整
        html += '			    <td class="achi-total">' + returnFloat(total_total) + '</td>'; // 合计
        html += '			</tr>';
        html += sub_html;
        html += '			<tr class="tfoot">';
        html += '			    <td class="hidden-foot-td" colspan="14">';

        if (achievementTotal.sa_auditState == 0 || achievementTotal.sa_auditState == 11) {
            if ($.cookie("em_name") == achievementTotal.ucc_corporation || user_power == "review") {
                html += '					<button onclick="alertAuditingOption(this, ' + id + ',\'auditing\')">主管审核</button>';
            }
        } else {
            html += '					<button onclick="alertAuditingOption(this, ' + id + ',\'auditing\')" style="background: #18bc9c;color: #fff;border-color: #18bc9c;" disabled>已审核</button>';
        }

        if (user_power == "review") {
            html += '					<button onclick="resetContractAchi(this,' + id + ', ' + goods + ',\'reload\')">重新生成</button>';
        }
        html += '					<button id="achi-more-btn" onclick="displayMoreOption()" data-conid="' + achievementTotal.contractObject_Id + '" data-id="' + id + '" data-goods="' + goods + '">更多操作</button>';
        html += '				</td>';
        html += '			</tr>';
        html += '			';
        html += '	</table>';
        html += '</div>';
        _box_td.html(html);

        if (achievementTotal.sa_auditState == 10 || achievementTotal.sa_auditState == 20) {
            $(".achi-audited-icon").remove();
            $("#achi-audited-box").append('<i class="achi-audited-icon"></i>');
            $(".achi-audited-icon").css({
                height: sumList_len + 3 + '00%'
            });
        }
    });
}

/** 显示/隐藏更多业绩操作*/
function displayMoreOption() {
    var _disMore = $(".diaplay-more-option");
    if (_disMore.is(":hidden")) {
        var _height = $(".diaplay-more-option").height();
        _disMore.animate({width: "toggle"}, 400, function () {
            var html = "";
            html += '<dl>';
            html += '	<dt>';
            html += '		<button class="option-btn fa-mail-reply" onclick="displayMoreOption()" title="返回" style="left: 8px;"></button>';
            if (user_power == "review") {
                html += '		<button class="option-span option-focus" data-type="1" style="margin-left: 44px;">复核业绩</button>';
                html += '		<button class="option-span" data-type="2">操作记录</button>';
            } else {
                html += '		<button class="option-span option-focus" data-type="2" style="margin-left: 44px;">操作记录</button>';
            }
            if (user_power == "review") {
                html += '		<button class="option-btn" onclick="updateContractAchi(this)" style="background: #3498db;color: #fff;">提交</button>';
            }
            html += '	</dt>';
            html += '	<dd class="more-option-main">';
            if (user_power == "review") {
                html += '        <div class="option-main-content main-content0" style="margin-top: 26px;">';
                html += '        	<label class="option-main-title">复核结果</label>';
                html += '        	<label class="common-borderbox common-borderbox-checked" style="height: 34px;"><input type="radio" name="achiReview" value="yes" checked>通过</label>';
                html += '        	<label class="common-borderbox" style="height: 34px;"><input type="radio" name="achiReview" value="no">调整业绩</label>';
                html += '        </div>';
                html += '        <div class="option-main-content main-content1">';
                html += '        	<label class="option-main-title"><em>*</em>调整金额</label>';
                html += '        	<input class="minusNumber" name="achi-money" maxlength="11" style="width: 30%;" required>';
                html += '        	<label style="display: inline-block;float: left;margin-left: 10px;">元</label>';
                html += '        </div>';
                html += '        <div class="option-main-content main-content1">';
                html += '        	<label class="option-main-title"><em>*</em>调整理由</label>';
                html += '        	<textarea name="achi-remark" maxlength="300" style="width: 64%;height: 60px;line-height: 24px;resize: none;" required></textarea>';
                html += '        </div>';
            }
            html += '	</dd>';
            html += '</dl>';
            _disMore.html(html);
            if (user_power != "review") {
                var _box = $(".more-option-main");
                $.ajax({
                    type: 'POST',
                    url: '/contractObject/queryContractAchiRecord',
                    data: {
                        conid: $("#achi-more-btn").attr("data-conid")
                    },
                    dataType: 'json',
                    beforeSend: function () {
                        _box.html('<div class="loading"></div>');
                    }
                }).done(function (result) {
                    if (result.code != 200) {
                        $.jBox.tip(result.msg, 'error');
                        return;
                    }
                    var html = "";
                    html += '<div class="option-main-record">';
                    $.each(result.data, function (index, data) {
                        var _color = (index % 2 == 0) ? '#fff' : '#f3f8f9';
                        html += '<p style="padding: 0 12px;background:' + _color + '">';
                        html += '	<label title="' + returnTime(data.ar_date) + '" style="display: inline-block;width: 76px;float: left;color: #3498db;">' + returnDate(data.ar_date) + '</label>';
                        var _ar_content = returnValue(data.ar_content);
                        if ("业绩调整" == data.ar_type) {
                            _ar_content += '_业绩调整为' + returnFloat(data.ar_money) + '元';
                        }
                        html += '	<label style="display: inline-block;max-width: 62%;padding: 0 10px;color: #e67e22;">' + _ar_content + '</label>';
                        html += '	<label style="display: inline-block;width: 60px;float:right;text-align: center;">' + returnValue(data.em_name) + '</label>';
                        html += '</p>';
                    });
                    html += '</div>';
                    var _height = $(".diaplay-more-option").height();
                    var _width = $(".diaplay-more-option").width();
                    _box.html(html);
                    $(".option-main-record").css({
                        height: _height - 43
                    });
                });
            }

            // 选项卡操作
            $(".option-span").click(function () {
                $(".option-span").removeClass("option-focus");
                var _box = $(".more-option-main");
                $(this).addClass("option-focus");
                switch (returnNumber($(this).attr("data-type"))) {
                    case 1:
                        var html = "";
                        html += '        <div class="option-main-content main-content0" style="margin-top: 26px;">';
                        html += '        	<label class="option-main-title">复核结果</label>';
                        html += '        	<label class="common-borderbox common-borderbox-checked" style="height: 34px;"><input type="radio" name="achiReview" value="yes" checked>通过</label>';
                        html += '        	<label class="common-borderbox" style="height: 34px;"><input type="radio" name="achiReview" value="no">调整业绩</label>';
                        html += '        </div>';
                        html += '        <div class="option-main-content main-content1">';
                        html += '        	<label class="option-main-title"><em>*</em>调整金额</label>';
                        html += '        	<input class="minusNumber" name="achi-money" maxlength="11" style="width: 30%;" required>';
                        html += '        	<label style="display: inline-block;float: left;margin-left: 10px;">元</label>';
                        html += '        </div>';
                        html += '        <div class="option-main-content main-content1">';
                        html += '        	<label class="option-main-title"><em>*</em>调整理由</label>';
                        html += '        	<textarea name="achi-remark" maxlength="300" style="width: 64%;height: 60px;line-height: 24px;resize: none;" required></textarea>';
                        html += '        </div>';
                        _box.html(html);
                        break;
                    case 2:
                        $.ajax({
                            type: 'POST',
                            url: '/contractObject/queryContractAchiRecord',
                            data: {
                                conid: $("#achi-more-btn").attr("data-conid")
                            },
                            dataType: 'json',
                            beforeSend: function () {
                                _box.html('<div class="loading"></div>');
                            }
                        }).done(function (result) {
                            if (result.code != 200) {
                                $.jBox.tip(result.msg, 'error');
                                return;
                            }
                            var html = "";
                            html += '<div class="option-main-record">';
                            $.each(result.data, function (index, data) {
                                var _color = (index % 2 == 0) ? '#fff' : '#f3f8f9';
                                html += '<p style="padding: 0 12px;background:' + _color + '">';
                                html += '	<label title="' + returnTime(data.ar_date) + '" style="display: inline-block;width: 21%;float: left;color: #3498db;">' + returnDate(data.ar_date) + '</label>';
                                var _ar_content = returnValue(data.ar_content);
                                if ("业绩调整" == data.ar_type) {
                                    _ar_content += '_业绩调整为' + returnFloat(data.ar_money) + '元';
                                }
                                html += '	<label style="display: inline-block;max-width: 63%;padding: 0 10px;color: #e67e22;">' + _ar_content + '</label>';
                                html += '	<label style="display: inline-block;width: 16%;float:right;text-align: center;">' + returnValue(data.em_name) + '</label>';
                                html += '</p>';
                            });
                            html += '</div>';
                            var _height = $(".diaplay-more-option").height();
                            var _width = $(".diaplay-more-option").width();
                            _box.html(html);
                            $(".option-main-record").css({
                                height: _height - 43
                            });
                        });
                        break;
                }
            });

            // 结果选择
            $(document).on("click", $("input[name=achiReview]"), function () {
                var _checked = $("input[name=achiReview]:checked");
                if (_checked.val() == 'yes') {
                    $(".main-content1").hide();
                    $(".main-content0").css({
                        marginTop: "26px"
                    });
                } else if (_checked.val() == 'no') {
                    $(".main-content0").css({
                        marginTop: "10px"
                    });
                    $(".main-content1").fadeIn();
                }
            });
        });
        $(".hidden-td").hide();
        $(".hidden-foot-td").attr("colspan", "9").css({borderRight: '1px solid #eaeaea'});

    } else {
        _disMore.html('');
        _disMore.animate({width: "toggle"}, 200, function () {
            $(".hidden-td").fadeIn();
            $(".hidden-foot-td").attr("colspan", "14").css({borderRight: '0'});
        });
    }
}

/** 弹出审核操作*/
function alertAuditingOption(obj, _id, _mode) {
    window.event.stopPropagation();
    var _this = $(obj);
    $(".auditing-option").remove();
    var html = "";
    html += '<div class="auditing-option" data-mode="' + _mode + '">';
    html += '	<table>';
    html += '		<tr>';
    html += '			<td style="width: 50%;padding-right: 2px;"><label class="confirm-option confirm-option-yes" onclick="changeAuditingResult(this)"><input type="radio" name="auditing" value="yes" checked>通过</label></td></td>';
    html += '			<td style="width: 50%;padding-left: 2px;"><label class="confirm-option" onclick="changeAuditingResult(this)"><input type="radio" name="auditing" value="no">不通过</label></td></td>';
    html += '		</tr>';
    html += '		<tr><td colspan="2" style="padding: 4px 0;"><textarea name="auditing-remark" placeholder="不通过说明" disabled></textarea></td></tr>';
    html += '		<tr><td colspan="2"><button class="confirm" onclick="confirmSubmitAuditResult(this,\'' + _mode + '\')">确定</button></td></tr>';
    html += '	</table>';
    html += '</div>';
    $("body").append(html);

    $(".auditing-option").css({
        top: _this.offset().top - $(".auditing-option").height() - 20,
        left: _this.offset().left - ($(".auditing-option").width() / 2) + (_this.width() / 2) + 8
    }).click(function (e) {
        e.stopPropagation();
    });

    $(document).click(function () {
        $(".auditing-option").remove();
    });
}

/** 改变审核结果*/
function changeAuditingResult(obj) {
    var _this = $(obj);
    var _radio = _this.find("input[type=radio]");
    if (_radio.val() == 'yes') {
        $(".confirm-option").removeClass("confirm-option-no");
        _this.addClass("confirm-option-yes");
        _radio.attr("checked", "checked");
        $("[name=auditing-remark]").attr("disabled", "disabled").removeAttr("required");
    }
    if (_radio.val() == 'no') {
        $(".confirm-option").removeClass("confirm-option-yes");
        _this.addClass("confirm-option-no");
        _radio.attr("checked", "checked");
        $("[name=auditing-remark]").removeAttr("disabled").attr("required", "required").select();
    }
}

/** 审核/复核业绩*/
function confirmSubmitAuditResult(obj, _mode) {
    var _option = $(".auditing-option");
    var _result = _option.find("input[name=auditing]:checked").val();
    var _remark = _option.find("textarea[name=auditing-remark]").val();
    $.jBox.confirm('确定业绩审核通过吗？', "提示", function (v, h, f) {
        if (v == 'ok') {
            // 提交数据
            $.ajax({
                type: 'POST',
                url: '/contractObject/auditingContractAchi',
                data: {
                    sa_id: $("#achi-more-btn").attr("data-id"),
                    result: _result,
                    remark: _remark,
                    mode: _mode,
                },
                dataType: 'json',
                beforeSend: function () {
                    $.jBox.tip("数据提交中...", "loading");
                    $(obj).attr("disabled", "disabled");
                }
            }).done(function (result) {
                if (result.code != 200) {
                    $.jBox.tip(result.msg, 'error');
                    return;
                }
                $.jBox.tip("数据提交成功", "success");
                _option.remove();

                load_data();
            }).always(function () {
                $(obj).removeAttr("disabled");
            });
        }
        return true;
    });
}

/** 调整业绩*/
function updateContractAchi(obj) {
    var _money = $("input[name=achi-money]");
    var _remark = $("textarea[name=achi-remark]");
    if (_money.is(":visible")) {
        if (isEmpty(_money.val())) {
            $("input[name=achi-money]").msg("不能为空");
            return;
        }
        if (isEmpty(_remark.val().trim())) {
            $("textarea[name=achi-remark]").msg("不能为空");
            return;
        }
    }
    var _achiReview_checked = $("input[name=achiReview]:checked").val();
    switch (_achiReview_checked) {
        case 'yes':
            $.jBox.confirm('确定业绩复核通过吗？', "提示", function (v, h, f) {
                if (v == 'ok') {
                    // 提交数据
                    $.ajax({
                        type: 'POST',
                        url: '/contractObject/auditingContractAchi',
                        data: {
                            sa_id: $("#achi-more-btn").attr("data-id"),
                            result: _achiReview_checked,
                            mode: "review",
                        },
                        dataType: 'json',
                        beforeSend: function () {
                            $.jBox.tip("数据提交中...", "loading");
                            $(obj).attr("disabled", "disabled");
                        }
                    }).done(function (result) {
                        if (result.code != 200) {
                            $.jBox.tip(result.msg, 'error');
                            return;
                        }
                        $.jBox.tip("数据提交成功", "success");
                        load_data();
                    }).always(function () {
                        $(obj).removeAttr("disabled");
                    });
                }
                return true;
            });
            break;
        case 'no':
            $.jBox.confirm('确定要调整业绩吗？<br>业绩调整后总业绩会有一些相应的改变', "提示", function (v, h, f) {
                if (v == 'ok') {
                    // 提交数据
                    $.ajax({
                        type: 'POST',
                        url: '/contractObject/updateContractAchi',
                        data: {
                            conid: $("#achi-more-btn").attr("data-conid"),
                            money: _money.val(),
                            remark: _remark.val().trim()
                        },
                        dataType: 'json',
                        beforeSend: function () {
                            $(obj).text("提交中..").attr("disabled", "disabled");
                        }
                    }).done(function (result) {
                        if (result.code != 200) {
                            $.jBox.tip(result.msg, 'error');
                            return;
                        }
                        $.jBox.tip("调整成功", 'success');
                        load_data();
                    }).always(function () {
                        $(obj).text("提交").removeAttr("disabled");
                    });
                }
                return true;
            });
            break;
    }
}

/** 重置业绩*/
function resetContractAchi(obj, id, goods, mode, cno) {
    var _confirm_title = (mode == 'build' ? '确定要生成业绩吗？' : '确定要重新生成业绩吗？');
    var submit = function (v, h, f) {
        if (v == 'ok') {
            // 提交数据
            $.ajax({
                type: 'POST',
                url: '/contractObject/resetContractAchi',
                data: {
                    conid: $("#achi-more-btn").attr("data-conid"),
                    cno: cno
                },
                dataType: 'json',
                beforeSend: function () {
                    $(obj).text($(obj).text() + "中..").attr("disabled", "disabled");
                }
            }).done(function (result) {
                if (result.code != 200) {
                    $.jBox.tip(result.msg, 'error');
                    return;
                }
                //				if(mode == 'build'){
                //				load_data();
                //				return;
                //				}
                $.jBox.tip("重新生成业绩成功", 'success');
                load_data();
                //				// 重新加载
                //				achievementMoreShow(null, id, goods, mode);
            }).always(function () {
                $(obj).text($(obj).text().replace("中..", "")).removeAttr("disabled");
            });
        }
        return true;
    };
    $.jBox.confirm(_confirm_title, "提示", submit);
}

/**
 * String 加密
 * @param str
 * @returns
 */
function base64Encode(str) {
    var rv;
    rv = encodeURIComponent(str);
    rv = unescape(rv);
    rv = window.btoa(rv);
    return rv;
}

/**
 * String 解密
 * @param str
 * @returns {___anonymous_rv}
 */
function base64Decode(str) {
    rv = window.atob(str);
    rv = escape(rv);
    rv = decodeURIComponent(rv);
    return rv;
}

/**
 * 刷新列表（查询）
 */
function selectByCondition() {
    $("#Num").text("1");
    houseRecord(2);
}

/** 时间处理*/
function dates() {
    var date = new Date(returnDate(new Date()))
    data = date.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
    WdatePicker({
        maxDate: returnDate(data),
        onpicked: function (dp) {
            if ($(".dateTime1").val() != "" && $(".dateTime2").val() != "") {
                //data();
            }
        }
    });
}

/**
 * 房屋执行记录添加
 */
function addCountImplementRecord() {
    if (isEmpty($("#contractObject_code").val())) {
        $.jBox.tip("请将带*的内容完善");
        return;
    }
    if (isEmpty($("#cir_content").val())) {
        $.jBox.tip("请将带*的内容完善");
        return;
    }
    $.ajax({
        type: "POST",
        url: "/houseLibrary/addContractImplementRecord",
        data: {
            hi_code: returnValue(getUrlParam("hi_code")),
            ca_ids: caid,
            contractObject_code: $("#contractObject_code option:selected").val(),
            cir_content: $("#cir_content").val()
        },
        dataType: "json",
        success: function (result) {
            if (result.message == "success") {
                $.jBox.tip("添加成功");
                cirId = result.cir_ids;
                houseRecord(2);
            } else {
                $.jBox.tip("添加失败");
            }
        }
    });
}

/** 显示订单详情*/
function showMoreCancelOrder(code, con_code) {
    var _show = $(".cancel-item-show" + code);
    if (_show.is(":hidden")) {
        $("[class^=cancel-item-show]").hide();

        _show.show();
        _show.find(".cancel-list-td").handoverBox({
            data: {
                cco_code: code,
                con_code: con_code,
                mode: "out"
            },
            init: function (result) {
                conType = result.contractObject_Type;
            },
            result: function () {
                moveBalabceCost();
                $("button[name=auditing-prev],button[name=auditing-next]").removeAttr("disabled");
            }
        });
    } else {
        _show.hide();
    }
}

/**定金算法:日租金 * 2 * 天数 去掉小数点 个位数抹掉 十位数小于5大于0整为5 大于五进一位十位数为0*/
function moneys(money) {
    /*=========================================*/
    var moneyA = money / 100;

    var moneystr = moneyA.toString().substring(moneyA.toString().indexOf("."), moneyA.toString().length);
    if (0 < parseFloat(moneystr) && parseFloat(moneystr) <= 0.25) {
        money = parseFloat(parseInt(moneyA) * 100);
    } else if (moneystr == ".0") {
        money = moneyA * 100;
    } else if (0.25 < parseFloat(moneystr) && parseFloat(moneystr) < 0.75) {
        money = parseFloat(parseInt(moneyA) * 100 + 50);
    } else if (0.75 <= parseFloat(moneystr)) {
        money = parseFloat(parseInt(moneyA) * 100 + 100);
    } else {
        money = Math.round(moneyA) * 100;
    }
    return money
    /*=========================================*/
}

/** 跳转页面*/
function GotoUrl(obj, code) {
    load_data($(obj), code);
}

/** 显示更多房屋信息*/
function showHouseMore() {
    var _more = $(".house-more");
    if (_more.is(":hidden")) {
        _more.fadeIn();
        $(".show-more").removeClass("fa-angle-right").addClass("fa-angle-down");
    } else {
        _more.fadeOut();
        $(".show-more").removeClass("fa-angle-down").addClass("fa-angle-right");
    }
}

/** 初始化Charts*/
function initCharts(param) {
    $("div[id^=chart-]").hide();
    $("#chart-contract-box").hide();
    $("#chart-profit").show();
    switch (param) {
        case "chartRent":
            $("#chart-rent").show();
            $("#chart-contract-box").fadeIn();
            chartRent();
            break;
        case "chartCash":
            $("#chart-cash").show();
            chartCash();
            break;
        case "chartForRent":
            $("#chart-forRent").show();
            chartForRent();
            break;
        default :
            $("#chart-rent").show();
            $("#chart-contract-box").fadeIn();
            chartRent();
            break;
    }
}

/** 租金走势*/
function chartRent(code) {
    $.ajax({
        type: 'POST',
        url: '/contractObject/queryContractRent',
        data: {
            con_code: returnValue($("#charts-contract").val())
        },
        dataType: 'json',
        beforeSend: function () {
            $("#chart-rent .chart-rent-main").html('<div class="loading"></div>');
        }
    }).done(function (result) {
        if (result.code == 200) {

            var contractBillList = result.data.contractBillList;

            var x_data = [];
            var t_data = [];
            var d_data = [];
            var s_data = [];
            var j_data = [];
            var index_date = 0;

            if (!isEmpty(contractBillList)) {
                $.each(contractBillList, function (index, data) {
                    if (data.bcb_type == 0) {
                        t_data.push(0);
                        x_data.push(returnDate(data.bcb_repaymentDate));
                        if (!isEmpty(data.bcb_realPaymentDate)) {
                            d_data.push(0);
                            s_data.push(0);
                            j_data.push(returnDay(returnDate(data.bcb_repaymentDate), returnDate(data.bcb_realPaymentDate)));
                        } else {
                            if (data.bcb_repaymentDate < new Date().getTime()) {
                                d_data.push(0);
                                index_date = d_data.length - 1;
                            }
                        }
                    }
                });
            } else {
                return;
            }

            var t_data_len = t_data.length;
            var d_data_len = d_data.length;
            //			if(d_data_len < t_data_len){
            //			d_data.push(0);
            //			}
            var jd_x1 = 0;
            var jd_y1 = 0;
            var jd_x2 = 0;
            var jd_y2 = 0;
            if (j_data.length <= 0) {
                jd_x2 = (s_data.length <= 0 ? index_date : s_data[s_data.length - 1]);
                jd_y2 = -returnDay(returnDate(x_data[0]), returnDate(new Date()));
            } else {
                jd_x1 = j_data.length - 1;
                jd_x2 = index_date;
                jd_y2 = -returnDay(returnDate(x_data[j_data.length - 1]), returnDate(new Date()));
            }

            // 图表
            var option = {
                title: {
                    text: '交租走势'
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params) {
                        if (!isEmpty(params)) {
                            var _data0 = params[0];
                            var _data1 = params[1];
                            var _data3 = params[4];
                            var html = "";
                            if (!isEmpty(_data0)) {
                                html += returnValue(_data0.name) + '<br/>';
                            }
                            if (!isEmpty(_data3)) {
                                html += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + _data3.color + '"></span>' + returnValue(_data3.seriesName) + ':' + returnNumber(_data3.value) + '<br/>';
                            }
                            if (!isEmpty(_data1)) {
                                if (!isEmpty(_data1.value)) {
                                    html += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + _data1.color + '"></span>' + returnValue(_data1.seriesName) + ':' + returnNumber(_data1.value[1]) + '<br/>';
                                }
                            }
                            return html;
                        }
                    }
                },
                legend: {
                    //data:['交租走势']
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: x_data,
                    axisLabel: {
                        rotate: 20,
                        interval: 0 // 强制
                    },
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}天'
                    },
                },
                series: [
                    {
                        name: '应交',
                        type: 'line',
                        data: t_data,
                        itemStyle: {
                            normal: {
                                color: '#ccc'
                            }
                        },
                    }, {
                        name: '未交天数',
                        type: 'line',
                        data: [{
                            value: [jd_x1, jd_y1]
                        }, {
                            value: [jd_x2, jd_y2]
                        }],
                        itemStyle: {
                            normal: {
                                color: '#E74C3C'
                            }
                        },
                    }, {
                        name: '待交',
                        type: 'line',
                        data: d_data,
                        itemStyle: {
                            normal: {
                                color: '#F39C12'
                            }
                        },
                    }, {
                        name: '实交',
                        type: 'line',
                        data: s_data,
                        itemStyle: {
                            normal: {
                                color: '#1ABC9C'
                            }
                        },
                    }, {
                        name: '交租天数',
                        type: 'line',
                        data: j_data,
                        markPoint: {
                            silent: true
                        },
                        label: {
                            normal: {
                                show: false
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#34495E'
                            }
                        },
                        markLine: {
                            data: [
                                {
                                    name: '警戒线',
                                    yAxis: -3,
                                    symbol: 'none',
                                    itemStyle: {
                                        normal: {
                                            color: '#E74C3C',
                                        }
                                    },
                                    lineStyle: {
                                        normal: {
                                            type: 'solid'
                                        }
                                    },
                                    label: {
                                        normal: {
                                            position: 'end',
                                            formatter: '警戒线'
                                        }
                                    },
                                },
                                {
                                    name: '强收线',
                                    yAxis: -5,
                                    symbol: 'none',
                                    itemStyle: {
                                        normal: {
                                            color: '#E74C3C'
                                        }
                                    },
                                    lineStyle: {
                                        normal: {
                                            type: 'solid'
                                        }
                                    },
                                    label: {
                                        normal: {
                                            position: 'end',
                                            formatter: '强收线'
                                        }
                                    },
                                },
                            ]
                        },
                    },
                ]
            };
            var chart = echarts.init($("#chart-rent .chart-rent-main")[0]);
            chart.setOption(option);
        } else {

        }
        $("#chart-rent .loading").remove();
    });
}

/** 租金走势*/
function chartCash() {
    $.ajax({
        type: 'POST',
        url: '/contractObject/queryContractCash',
        data: {
            hi_code: returnValue(getUrlParam("hi_code"))
        },
        dataType: 'json',
        beforeSend: function () {
            $("#chart-cash .chart-rent-main").html('<div class="loading"></div>');
        },
    }).done(function (result) {
        if (result.code == 200) {
            // 数据处理
            var x_data = [];

            var zj_data = [];
            var yj_data = [];
            var fwf_data = [];
            var dj_data = [];
            var ds_data = [];

            $.each(result.data, function (index, data) {
                x_data.push(data.key);
                if (!isEmpty(data.value)) {
                    for (var i = 0; i < data.value.length; i++) {
                        $.each(data.value[i], function (key, value) {
                            switch (returnNumber(key)) {
                                case 0:
                                    zj_data.push(returnFloat(value));
                                    break;
                                case 1:
                                    yj_data.push(returnFloat(value));
                                    break;
                                case 3:
                                    fwf_data.push(returnFloat(value));
                                    break;
                            }
                        });
                    }
                    var xlen = x_data.length;

                    if (zj_data.length < xlen) {
                        zj_data.push('');
                    }
                    if (yj_data.length < xlen) {
                        yj_data.push('');
                    }
                    if (fwf_data.length < xlen) {
                        fwf_data.push('');
                    }
                    if (dj_data.length < xlen) {
                        dj_data.push('');
                    }
                    if (ds_data.length < xlen) {
                        ds_data.push('');
                    }
                } else {
                    zj_data.push('');
                    yj_data.push('');
                    fwf_data.push('');
                    dj_data.push('');
                    ds_data.push('');
                }
            });

            // 图表
            var chart = echarts.init($("#chart-cash .chart-rent-main")[0]);
            var option = {
                title: {
                    text: '现金收支'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {type: 'shadow'}
                },
                legend: {
                    data: ['租金', '押金', '服务费', '定金', '代收']
                },
                dataZoom: [
                    {type: 'slider', start: 0, end: 100},
                    {type: 'inside', start: 0, end: 100},
                ],
                xAxis: {
                    type: 'category',
                    data: x_data
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: '租金',
                        type: 'bar',
                        stack: '总量',
                        label: {normal: {show: true,}},
                        data: zj_data
                    },
                    {
                        name: '押金',
                        type: 'bar',
                        stack: '总量',
                        label: {normal: {show: true,}},
                        data: yj_data
                    },
                    {
                        name: '服务费',
                        type: 'bar',
                        stack: '总量',
                        label: {normal: {show: true,}},
                        data: fwf_data
                    },
                    {
                        name: '定金',
                        type: 'bar',
                        stack: '总量',
                        label: {normal: {show: true,}},
                        data: dj_data
                    },
                    {
                        name: '代收',
                        type: 'bar',
                        stack: '总量',
                        label: {normal: {show: true,}},
                        data: ds_data
                    }
                ]
            };
            chart.setOption(option);
        } else {

        }
    }).always(function () {
        $("#chart-cash .loading").remove();
    });
}

/** 招租期*/
function chartForRent() {
    $.ajax({
        type: 'POST',
        url: '/contractObject/queryContractForRent',
        data: {
            hi_code: returnValue(getUrlParam("hi_code"))
        },
        dataType: 'json',
        beforeSend: function () {
            $("#chart-cash .chart-rent-main").html('<div class="loading"></div>');
        },
    }).done(function (result) {
        if (result.code == 200) {
            var _data = result.data;
            var chart = echarts.init($("#chart-forRent .chart-rent-main")[0]);
            var option = {
                title: {
                    text: '招租监控'
                },
                tooltip: {
                    trigger: 'axis',
                },
                legend: {
                    data: ['招租期', '空置期']
                },
                xAxis: {
                    type: 'category',
                    data: _data.x_data,
                    boundaryGap: false
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}天'
                    }
                },
                series: [
                    {
                        name: '招租期',
                        type: 'line',
                        data: _data.zz_data,
                        markLine: {
                            data: [
                                {
                                    name: '警戒线',
                                    yAxis: 7,
                                    symbol: 'none',
                                    itemStyle: {
                                        normal: {
                                            color: '#E74C3C',
                                        }
                                    },
                                    lineStyle: {
                                        normal: {
                                            type: 'solid'
                                        }
                                    },
                                    label: {
                                        normal: {
                                            position: 'end',
                                            formatter: '警戒线'
                                        }
                                    },
                                },
                                {
                                    name: '强收线',
                                    yAxis: 15,
                                    symbol: 'none',
                                    itemStyle: {
                                        normal: {
                                            color: '#E74C3C'
                                        }
                                    },
                                    lineStyle: {
                                        normal: {
                                            type: 'solid'
                                        }
                                    },
                                    label: {
                                        normal: {
                                            position: 'end',
                                            formatter: '强收线'
                                        }
                                    },
                                },
                            ]
                        },
                    }, {
                        name: '空置期',
                        type: 'line',
                        data: _data.kz_data,
                    },
                ]
            };
            chart.setOption(option);
        }
    }).always(function () {
        $("#chart-cash .loading").remove();
    });
}

/** 结算订单*/
function cotractOrderOptionListener(obj) {
    var _checked = $("input[name=cancelContractNo]:checked");
    switch (_checked.length) {
        case 0:
            $.jBox.tip("请选择一个结算订单", "warning");
            break;
        case 1:
            var _data = _checked.data("data");
            var code = _data.cco_code;
            var state = _data.cco_state;
            var cno = _data.contractObject_No;
            var con_code = _data.contractObject_Code;
            var hicode = _data.hi_code;
            var content = _data.cco_applicationContent;
            var cco_applicationType = _data.cco_applicationType;

            switch ($(obj).attr("id")) {
                case "contractEdit": // 修改合约
                    window.parent.href_mo('/contractObject/jumpCancelContractApply?mode=auditing&con_code=' + con_code, '合约申请', body_title);
                    break;
                case "handover": // 物业结算
                    window.parent.href_mo('/transferKeep/transfer?mode=compary&con_code=' + con_code, '交接结算', body_title);
                    break;
                //			case "orderSettlem": // 订单结算
                //			window.parent.href_mo('/contractObject/jumpContractClosingCost?mode=out&con_code='+ con_code, '费用结算', body_title);
                //			break;
                case "contractAuditing": // 提交审核
                    $.ajax({
                        type: "POST",
                        url: "/contractObject/submitOrderReview",
                        data: {
                            cco_code: code
                        },
                        dataType: "json"
                    }).done(function (result) {
                        if (result.code == 200) {
                            $.jBox.tip(result.msg, "success");
                            load_data();
                        } else {
                            $.jBox.tip(result.msg, "warning");
                        }
                    });
                    break;
                case "cancelApply": // 合约解约
                    cancelOrder(cno, code, content, cco_applicationType);
                    break;
                default :
                    break;
            }
            break;
        default:
            $.jBox.tip("只能选择一个结算订单", "warning");
            break;
    }
}

/** 合约订单响应事件*/
function cancelContractListener(obj) {
    var _radio = $(obj).find("input[name=cancelContractNo]");
    $("input[name=cancelContractNo]").removeAttr("checked").parent().removeClass("common-checkbox-checked");
    _radio.attr("checked", "checked").parent().addClass("common-checkbox-checked");
    cancelContractImplListener(_radio);
}

/** 订单点击执行监听事件*/
function cancelContractImplListener(_radio) {
    var contractEdit = $("#contractEdit");
    var handover = $("#handover");
    //	var orderSettlem = $("#orderSettlem");
    var contractAuditing = $("#contractAuditing");
    var cancelApply = $("#cancelApply");
    var changeContract = $("#changeContract");

    var type = _radio.data("data").cco_applicationType;
    var state = _radio.data("data").cco_state;

    $("button[name=cancelContract]").attr("disabled", "disabled");
    switch (state) {
        case "待审核":
            cancelApply.removeAttr("disabled");
            break;
        case "待复审":
            cancelApply.removeAttr("disabled");
            break;
        case "待复核":
            cancelApply.removeAttr("disabled");
            break;
        case "完成":
            break;
        case "待交接":
            //	TODO 临时修改	  if(type !='转租'){
            //			contractEdit.removeAttr("disabled");
            handover.removeAttr("disabled");
            //		}
            cancelApply.removeAttr("disabled");
            break;
        case "待结算":
            //	TODO 临时修改 	if(type !='转租'){
            contractEdit.removeAttr("disabled");
            handover.removeAttr("disabled");
            //		}
            cancelApply.removeAttr("disabled");
            break;
        case "审核未通过":
            contractEdit.removeAttr("disabled");
            cancelApply.removeAttr("disabled");
            break;
        case "复审未通过":
            //		contractEdit.removeAttr("disabled");
            handover.removeAttr("disabled");
            cancelApply.removeAttr("disabled");
            break;
        case "复核未通过":
            handover.removeAttr("disabled");
            cancelApply.removeAttr("disabled");
            contractEdit.removeAttr("disabled");
            contractAuditing.removeAttr("disabled");
            break;
        default:

            break;
    }
}

/**取消订单*/
function cancelOrder(cno, cco_code, content, cco_applicationType) {
    var html = '';
    html += '<div class="expense ">';
    html += '    <input type="hidden" value=' + cno + ' class="cno">';
    html += '    <input type="hidden" value=' + cco_code + ' class="cco_code">';
    html += '    <input type="hidden" value=' + content + ' class="content">';
    html += '    <input type="hidden" value=' + cco_applicationType + ' class="cco_applicationType">';
    html += '	<div class="expense-container3" id="expense-container3" style="min-height: 325px;">';
    html += '		<div id="cd-buttons">';
    html += '			<div style="margin: auto; width: 90%;line-height: 40px;font-size: 18px;color: #000000; text-align: center;border-bottom: 1px solid #06B;" id="titleInsert">取消订单';
    html += '				<a href="#0" class="close-button" style="color: red;position:absolute;margin-left:150px;">X</a>';
    html += '			</div>';
    html += '			<div class="sub-title" id="contract-title" style="margin: auto;width: 95%;border-bottom: 1px solid whitesmoke;">';
    html += '				<ul class="title-nav" style="margin-left: 8px;">';
    html += '					<li class="visited">取消原因：</li>';
    html += '				</ul>';
    html += '			</div>';
    html += '			<div style="float:left;margin: 15px 40px;">';
    html += '				<textarea id="text" style="width: 350px;height: 150px;resize:none;"  class="text_div"  ></textarea>';
    html += '			</div>';
    html += '			<div style="float: right;">';
    html += '				<button type="butten" class="finish-butten close-button" style="background-color: #E74C3C">关闭</button>';
    html += '				<button type="butten" class="finish-butten sumbit-cancelOrder">提交</button>';
    html += '			</div>';
    html += '		</div>';
    html += '	</div>';
    html += '</div>';
    $('body').append(html);
    $('.expense').addClass('is-visible3');
}

/**取消订单提交数据*/
$(document).on('click', '.sumbit-cancelOrder', function () {
    var _text = $('.text_div');
    if (isEmpty(_text.val().trim())) {
        $.hint.tip("取消订单内容为空", "loading");
        return;
    }
    var data = {};
    data.contractObject_No = $('.cno').val();   //合同编号
    data.cco_code = $('.cco_code').val();
    data.cco_applicationContent = $('.content').val() + "-[" + "取消" + $('.cco_applicationType').val() + ":" + _text.val().trim() + "-" + "]";   //取消订单原因

    $.ajax({
        type: "POST",
        url: "/contractObject/cancelOrder",
        data: {data: JSON.stringify(data)},
        dataType: "json",
        beforeSend: function () {
            $("#record-table-body").html('<tr><td colspan="7"><div class="loading"></div></td></tr>');
        }
    }).done(function (result) {
        if (result.code != 200) return $.hint.tip(result.msg, "error");

        $.hint.tip("取消订单成功", "success");
        $('.expense').remove();

        // 重新加载数据
        // load_data();
        $.table.loadData();
    });

});

/** 显示更多房屋信息 */
function showHouseMore() {
    var _more = $(".house-more");
    if (_more.is(":hidden")) {
        _more.fadeIn();
        $(".show-more").removeClass("fa-angle-right").addClass("fa-angle-down");
    } else {
        _more.fadeOut();
        $(".show-more").removeClass("fa-angle-down").addClass("fa-angle-right");
    }
}

/** 合同选项卡改变 */
function changeTab(con_code, code) {
    $("#house-iframe").hide().attr("src", "/contractObject/jumpDisplayContract?con_code=" + con_code);
    iframeLoad();
}

/** 加载IFRAME完毕后执行 */
function iframeLoad() {
    setIframeHeight();
    $("#house-iframe").on("load", function () {
        var _content = $(this).contents();
        _content.find("#main-box").css({padding: "0"});
        //		_content.find(".box-nav").remove();
        //		_content.find(".box-content").css({boxShadow: "none"});
        $(this).fadeIn();
    });
}

/**
 * 设置IFRAME高度
 */
function setIframeHeight() {
    var content_offset = $(".table-item-content").offset() || "";
    var iframe_offset = $("#house-iframe").parent().offset() || "";
    var current_offset = content_offset || iframe_offset;
    var _height = $(window).height() - returnNumber(current_offset.top) - 12;
    $("#house-iframe").css("height", _height);
    $(".table-item-content").css("height", _height);
}

/** 添加合同信息*/
function contractAdd(code, mode) {
    $.ajax({
        type: "POST",
        url: "/houseLibrary/queryHouseInfo",
        data: {
            hi_code: code
        },
        dataType: "json",
        success: function (result) {
            switch (result.code) {
                case 200:
                    var data = result.data.houseLibraryInfo;
                    var lastTGContract = result.data.lastTGContract;

                    switch (mode) {
                        case "addTG":
                            if (isEmpty(data.contract_intoStatus) || data.contract_intoStatus == '未签合同') {
                                window.parent.href_mo("/contractObject/jumpAddContract/?mode=" + mode + "&hi_code=" + code, "添加合同", "房屋信息");
                            } else if (data.contract_intoStatus == '已签合同') {
                                $.jBox.tip("该房屋还不能签订新合同", "warning");
                                return;
                            } else {
                                $.jBox.tip("该房屋还不能签订新合同", "warning");
                                return;
                            }
                            break;
                        case "addZL":
                            if (data.contract_intoStatus == '已签合同') {
                                if (isEmpty(data.contract_outStatus) || data.contract_outStatus == '未签合同') {
                                    window.parent.href_mo("/contractObject/jumpAddContract/?mode=" + mode + "&hi_code=" + code, "添加合同", "房屋信息");
                                    return;
                                } else if (data.contract_outStatus == '已签合同') {
                                    $.hint.tip("该房屋还不能签订新合同", "warning");
                                    return;
                                } else {
                                    $.hint.tip("该房屋还不能签订新合同", "warning");
                                    return;
                                }
                            } else if (data.contract_intoStatus != '未签合同') {
                                $.hint.tip("该房屋托管合同还未完善，请完善后再添加租赁合同", "warning");
                                return;
                            } else {
                                $.hint.tip("该房屋还未签托管合同", "warning");
                                return;
                            }
                            break;
                    }
                    break;
                default :
                    $.hint.tip(result.msg, "warning");
                    break;
            }
        }
    });
}

/** 跳转客户信息*/
function targetCustomer(code) {
    window.parent.href_mo('/customer/customerEdit?cc_code=' + code, '客户管理', '房屋信息');
}

/** 移植结余费用*/
function moveBalabceCost() {
    if (conType == "托管合同") { // 应付
        // 代理费
        $("#statement_agent_debit").val(returnFloat($("#statement_agent").val()));
        // 消费
        $("#statement_costs_debit").val(returnFloat($("#statement_costs").val()));
        // 物品
        $("#statement_goods_debit").val(returnFloat($("#statement_goods").val()));
        // 违约金
        $("#statement_penalty_debit").val(returnFloat($("#statement_penalty").val()));
        // 其他
        $("#statement_other_debit").val();
        // 预交租金
        $("#statement_rent_debit").val();
        // 押金
        $("#statement_deposit_debit").val();
    }
    if (conType == "租赁合同") {// 应收
        // 代理费
        $("#statement_agent_credit").val(returnFloat($("#statement_agent").val()));
        // 消费
        $("#statement_costs_credit").val(returnFloat($("#statement_costs").val()));
        // 物品
        $("#statement_goods_credit").val(returnFloat($("#statement_goods").val()));
        // 违约金
        $("#statement_penalty_credit").val(returnFloat($("#statement_penalty").val()));
        // 其他
        $("#statement_other_credit").val();
        // 预交租金
        $("#statement_rent_credit").val();
        // 押金
        $("#statement_deposit_credit").val();
    }
    calBalanceCost();
}

/** 计算结余费用*/
function calBalanceCost() {
    var _agent, _costs, _goods, _penalty, _other, _rent, _deposit;

    _agent = returnFloat($("#statement_agent_debit").val()) - returnFloat($("#statement_agent_credit").val());
    _costs = returnFloat($("#statement_costs_debit").val()) - returnFloat($("#statement_costs_credit").val());
    _goods = returnFloat($("#statement_goods_debit").val()) - returnFloat($("#statement_goods_credit").val());
    _penalty = returnFloat($("#statement_penalty_debit").val()) - returnFloat($("#statement_penalty_credit").val());
    _other = returnFloat($("#statement_other_debit").val()) - returnFloat($("#statement_other_credit").val());
    _rent = returnFloat($("#statement_rent_debit").val()) - returnFloat($("#statement_rent_credit").val());
    _deposit = returnFloat($("#statement_deposit_debit").val()) - returnFloat($("#statement_deposit_credit").val());

    var _total = _agent + _costs + _goods + _penalty + _other + _rent + _deposit;
    var _total_color = "";
    if (_total < 0) {
        _total_color = "error";
    }
    $("#statement_balance").html("大写：<label class=\"" + _total_color + "\" style='font-weight: bold;'>" + returnToUpperMoney(returnValue(_total).replace("-", "")) + "</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;小写：<label class=\"" + _total_color + "\" style='font-weight: bold;'>" + returnFloat(_total) + "</label>");
}

/** 【8.招租管理】 */
function houseRentManagement () {
    $.ajax({
        type: "POST",
        url: "/houseLibrary/queryIsForRent",
        data: {
            hi_code: hi_code
        },
        dataType: "json",
    }).done(function (result) {
        var houseUnderLine=result.data.houseUnderLine; // 线下房源
        var houseOnline=result.data.houseOnline;  //线上房源
        var HouseStateRelation=result.data.HouseStateRelation; //查询房屋类型

        //招租状态
        var hi_isForRent = returnHouseIsForRent(houseUnderLine.hi_isForRent);
        var html='';
        html += '<div class="box-nav">';
        html += '<input type="hidden" id="his_name" value="'+HouseStateRelation.his_name+'">';
        html += '<input type="hidden" id="he_id" value="'+houseUnderLine.he_id+'">';
        html += '<input type="hidden" id="hiIsForRent" value="'+houseUnderLine.hi_isForRent+'">';
        html += '	<div class="sub-title" style="border-bottom:none;">';
        html += '  		<ul class="title-nav">';
        html += '  			<li class="visited" data-id="itemlist">房屋基本信息</li>';
        html += '  		</ul>';
        html += '	</div>';
        html += '   <div class="box-information">';
        html += '       <dl>';
        html += '           <dt>招租状态</dt>';
        html += '           <dd class="'+hi_isForRent.style+'" style="width: 80px;">'+hi_isForRent.text+'</dd>';
        //【暂时不开启】
        html += '           <div class="update-pencil">';
        html += '               <i class="icon-rent-edit fa-pencil forRent" style="display: none;" title="编辑招租状态" onclick="updateIsForRent();"></i>';
        html += '           </div>';
        html += '       </dl>';
        html += '       <div class="update-isForRent">';
        html += '           <dl>';
        html += '              <dd style="width: 300px;">';
        if (returnValue(houseUnderLine.hi_isForRent) == 0) {
            html += '                  <label class="common-checkbox common-checkbox-checked" style="margin: 10px"><input type="radio" name="isForRent" value="0" checked data="停止招租">停止招租</label>';
            html += '                  <label class="common-checkbox" style="margin: 10px"><input type="radio" name="isForRent" value="1" data="正在招租">正在招租</label>';
            html += '                  <label class="common-checkbox" style="margin: 10px"><input type="radio" name="isForRent" value="2" data="暂停招租">暂停招租</label>';
        } else if (returnValue(houseUnderLine.hi_isForRent) == 1) {
            html += '                  <label class="common-checkbox" style="margin: 10px"><input type="radio" name="isForRent" value="0" checked data="停止招租">停止招租</label>';
            html += '                  <label class="common-checkbox common-checkbox-checked" style="margin: 10px"><input type="radio" name="isForRent" value="1" data="正在招租">正在招租</label>';
            html += '                  <label class="common-checkbox" style="margin: 10px"><input type="radio" name="isForRent" value="2" data="暂停招租">暂停招租</label>';
        } else {
            html += '                  <label class="common-checkbox" style="margin: 10px"><input type="radio" name="isForRent" value="0" checked data="停止招租">停止招租</label>';
            html += '                  <label class="common-checkbox" style="margin: 10px"><input type="radio" name="isForRent" value="1" data="正在招租">正在招租</label>';
            html += '                  <label class="common-checkbox common-checkbox-checked" style="margin: 10px"><input type="radio" name="isForRent" value="2" data="暂停招租">暂停招租</label>';
        }
        html += '              </dd>';
        html += '           </dl>';
        html += '           <dl>';
        html += '               <dd>';
        html += '                   <textarea placeholder="日志内容" id="isForRentContent"></textarea>';
        html += '               </dd>';
        html += '           </dl>';
        html += '           <dl style="padding: 8px;">';
        html += '               <dd style="width: 80px;"><button id="submit" class="from-data" onclick="suerIsForRent();">提交</button></dd>';
        html += '               <dd style="width: 80px;"><button id="submit" class="from-data" onclick="closeIsForRent();">取消</button></dd>';
        html += '           </dl>';
        html += '       </div>';
        html += '       <dl>';
        html += '           <dt>发布渠道</dt>';
        html += '           <dd style="width: 500px;">';
        html += '               <div class="div-channel">';
        html += '                   <div class="div-channel-main">';
        html += '                       <div>'+"官网/外部app"+'</div>';
        if (houseOnline) {
            html += '<input type="hidden" id="houseOnline" value="1">';
            html += '              <div style="color: #27AE60">'+"已发布"+'</div>';
            if (houseOnline.hi_isForRent ==1) {
                html += '              <div style="color: #27AE60;width: 45px;">'+"已上架"+'</div>';
                html += '              <div class="update-pencil app-pencil" style="display: none;">';
                html += '                  <i class="icon-rent-edit fa-pencil" title="下架" onclick="lowerAppHouse();"></i>';
                html += '              </div>';
            } else {
                html += '              <div style="color: #E74C3C;width: 45px;">'+"已下架"+'</div>';
                html += '              <div class="update-pencil app-pencil" style="display: none;">';
                html += '                  <i class="icon-rent-edit fa-pencil" title="上架" onclick="lowerAppHouse();"></i>';
                html += '              </div>';
            }
        } else {
            html += '              <div style="color: #E74C3C;width: 45px;">'+"未发布"+'</div>';
            html += '              <div class="update-pencil">';
            html += '                  <i class="icon-rent-edit fa-pencil" title="发布房源" onclick="fb()"></i>';
            html += '              </div>';
            html += '              <div style="color: #E74C3C;width: 45px;">'+"已下架"+'</div>';
            html += '              <div class="update-pencil app-pencil" style="display: none;">';
            html += '                  <i class="icon-rent-edit fa-pencil" title="上架" onclick="lowerAppHouse();"></i>';
            html += '              </div>';
        }
            html += '           </div>';
            <!--记录日志-->
            html += '           <div class="app-lower">';
            html += '              <dl>';
            html += '                  <dd style="margin-left: 30px;">';
            if (houseOnline) {
                if (houseOnline.hi_isForRent ==1) {
                    html += '                     <label class="common-channelbox common-channelbox-checked" style="border-radius: 4px;"><input type="checkbox" name="appLower" data="0" lower="下架"/>'+"下架"+'</label>';
                } else {
                    html += '                     <label class="common-channelbox common-channelbox-checked" style="border-radius: 4px;"><input type="checkbox" name="appLower" data="1" lower="上架"/>'+"上架"+'</label>';
                }
            }
            html += '                  </dd>';
            html += '              </dl>';
            html += '              <dl>';
            html += '                  <dd>';
            html += '                      <textarea placeholder="日志内容" id="appLowerContent"></textarea>';
            html += '                  </dd>';
            html += '              </dl>';
            html += '              <dl style="padding: 8px;">';
            html += '                  <dd style="width: 80px;"><button id="submit" class="from-data" onclick="sureAppLower();">提交</button></dd>';
            html += '                  <dd style="width: 80px;"><button id="submit" class="from-data" onclick="closeAppLower();">取消</button></dd>';
            html += '              </dl>';
            html += '           </div>';
            <!--支付宝-->
            // if (result.data.rentHouse) {
            //     html += '<input type="hidden" id="room_code" value="'+result.data.rentHouse.room_code+'">';
                html += '       <div class="div-channel-main">';
                html += '           <div>'+"支付宝"+'</div>';
                if (houseOnline) {
                    html += '           <div style="color: #27AE60">'+"已发布"+'</div>';
                } else {
                    html += '           <div style="color: #E74C3C;width: 45px;">'+"未发布"+'</div>';
                    html += '           <div class="update-pencil">';
                    html += '               <i class="icon-rent-edit fa-pencil" style="" title="发布房源" onclick=""></i>';
                    html += '           </div>';
                }
                if (result.data.rentHouse) {
                    html += '<input type="hidden" id="room_code" value="'+result.data.rentHouse.room_code+'">';
                    if (result.data.rentHouse.room_status == 1) {
                        html += '           <div style="color: #27AE60;width: 45px;">'+"已上架"+'</div>';
                        html += '           <div class="update-pencil">';
                        html += '               <i class="icon-rent-edit fa-pencil zfb-pencil" style="display: none;" title="下架" onclick="lowerAlipayHouse();"></i>';
                        html += '           </div>';
                    } else {
                        html += '           <div style="color: #E74C3C;width: 45px;">'+"已下架"+'</div>';
                        html += '           <div class="update-pencil">';
                        html += '               <i class="icon-rent-edit fa-pencil zfb-pencil" style="display: none;" title="上架" onclick="lowerAlipayHouse();"></i>';
                        html += '           </div>';
                    }
                } else {
                    html += '           <div style="color: #E74C3C;width: 45px;">'+"已下架"+'</div>';
                    html += '           <div class="update-pencil">';
                    html += '               <i class="icon-rent-edit fa-pencil zfb-pencil" style="display: none;" title="上架" onclick="lowerAlipayHouse();"></i>';
                    html += '           </div>';
                }
                html += '       </div>';
                <!--日志记录-->
                html += '       <div class="zfb-lower">';
                html += '          <dl>';
                html += '             <dd style="margin-left: 30px;">';
                if (result.data.rentHouse) {
                    if (result.data.rentHouse.room_status == 1) {
                        html += '                 <label class="common-channelbox common-channelbox-checked" style="border-radius: 4px;"><input type="checkbox" name="room_status" value="" data="0" lower="下架"/>'+"下架"+'</label>';
                    } else {
                        html += '                 <label class="common-channelbox common-channelbox-checked" style="border-radius: 4px;"><input type="checkbox" name="room_status" value="" data="1" lower="上架"/>'+"上架"+'</label>';
                    }
                } else {
                    html += '                 <label class="common-channelbox common-channelbox-checked" style="border-radius: 4px;"><input type="checkbox" name="room_status" value="" data="1" lower="上架"/>'+"上架"+'</label>';
                }
                html += '             </dd>';
                html += '          </dl>';
                html += '          <dl>';
                html += '              <dd>';
                html += '                  <textarea placeholder="日志内容" id="zfbLowerContent"></textarea>';
                html += '              </dd>';
                html += '          </dl>';
                html += '          <dl style="padding: 8px;">';
                html += '              <dd style="width: 80px;"><button id="submit" class="from-data" onclick="sureZfbLower();">提交</button></dd>';
                html += '              <dd style="width: 80px;"><button id="submit" class="from-data" onclick="closeZfbLower();">取消</button></dd>';
                html += '          </dl>';
                html += '       </div>';
            // }

        html += '               </div>';
        html += '           </dd>';
        html += '       </dl>';
        html += '   </div>';
        html += '</div>';
        $("#contentShow").html(html);

        // 查询是否有权限设置招租房源是否招租
        $.ajax({
            type: "POST",
            url: "/user/checkRoleJdjustPrice",
            data: {
                ucps_url: "updateIsForRent()",
            },
            dataType: "json",
        }).done(function (result) {
            if (result.hasAdjustPrice == true) {
                $('.forRent').show();
            }
        });

        // 查询是否有权限设置官网app上下架
        $.ajax({
            type: "POST",
            url: "/user/checkRoleJdjustPrice",
            data: {
                ucps_url: "lowerAppHouse()",
            },
            dataType: "json",
        }).done(function (result) {
            if (result.hasAdjustPrice == true) {
                $('.app-pencil').show();
            }
        });
        // 查询是否有权限设置支付宝上下架
        $.ajax({
            type: "POST",
            url: "/user/checkRoleJdjustPrice",
            data: {
                ucps_url: "lowerAlipayHouse()",
            },
            dataType: "json",
        }).done(function (result) {
            if (result.hasAdjustPrice == true) {
                $('.zfb-pencil').show();
            }
        });

    });
}
/**更改招租状态**/
function updateIsForRent () {
    $('.update-isForRent').show();
}
/**取消修改招租状态操作**/
function closeIsForRent () {
    $('#isForRentContent').val('');
    $('.update-isForRent').hide();
}
/**确定修改招租状态**/
function suerIsForRent () {
    if ($('#isForRentContent').val() == '') {
        $.hint.tip("日志内容不能为空", "error");
        return false;
    }
    var hi_isForRent=$("input[name=isForRent]:checked").val();
    var cir_content=$("input[name=isForRent]:checked").attr('data');
    var content=cir_content+"："+$('#isForRentContent').val();
    var result='hi_code='+hi_code+'&hi_isForRent='+hi_isForRent+'&cir_content='+content
    $.ajax({
        type: "post",
        url: "/houseLibrary/updateIsForRent",
        data: result,
        dataType: "json"
    }).done(function (result) {
        if (result.code != 200) {
            $.hint.tip("失败", "error");
            return;
        }
        //支付宝上下架操作
        zfbLowerFrame();
        $.hint.tip("更改房屋招租状态成功", "success");
        houseRentManagement();
    });
}
/**支付宝上下架操作**/
function zfbLowerFrame () {
    var roomStatus='';
    var hi_isForRent=$("input[name=isForRent]:checked").val();
    if (hi_isForRent == 1) {
        roomStatus=1;
    } else {
        roomStatus=0;
    }
    $.ajax({
        type: "post",
        url: "/houseLibrary/updateRentHouse",
        data: {
            hi_code : hi_code,
            roomCode : $('#room_code').val(),
            roomStatus: roomStatus,
            rentStatus: 1,
            his_name: $('#his_name').val()
        },
        dataType: "json"
    }).done(function (result) {
        if (result.code != 200) {
            $.hint.tip("失败", "error");
            return;
        }
    });
}

/**app房源上下架操作**/
function lowerAppHouse () {
    if ($('#hiIsForRent').val() ==1) {
        if ($('#houseOnline').val() ==1) {
            $('.app-lower').show();
        }else {
            $.hint.tip("房屋未发布，不能上下架", "error");
        }
    }else {
        $.hint.tip("房屋未招租，不能上下架", "error");
    }
}
/**app,官网上下架窗口关闭操作**/
function closeAppLower() {
    $('#appLowerContent').val('');
    $('.app-lower').hide();
}
/**确定app,官网上下架**/
function sureAppLower () {
    if ($('#appLowerContent').val() == '') {
        $.hint.tip("日志内容不能为空", "error");
        return false;
    }
    //线上房源   上架【招租】  下架【未招租】
    var hi_isForRent=$('input[name=appLower]').attr('data');
    var lower=$("input[name=appLower]").attr('lower');
    var cir_content=lower+':'+$('#appLowerContent').val();
    var result='hi_code='+hi_code+'&hi_isForRent='+hi_isForRent+'&cir_content='+cir_content;
    $.ajax({
        type: "post",
        url: "/houseLibrary/updateLowerAppHouse",
        data: result,
        dataType: "json"
    }).done(function (result) {
        if (result.code != 200) {
            $.hint.tip("失败", "error");
            return;
        }
        $.hint.tip("成功", "success");
        houseRentManagement();
    });
}

/**上下架支付宝房源操作**/
function lowerAlipayHouse() {
    if ($('#hiIsForRent').val() ==1) {
        if ($('#houseOnline').val() ==1) {
            $('.zfb-lower').show();
        } else {
            $.hint.tip("房屋未发布，不能上下架", "error");
        }
    } else {
        $.hint.tip("房屋未招租，不能上下架", "error");
    }
}
/**支付宝下架窗口关闭**/
function closeZfbLower () {
    $('#zfbLowerContent').val('');
    $('.zfb-lower').hide();
}
/**确定上下架支付宝房源**/
function sureZfbLower () {
    if ($('#zfbLowerContent').val() == '') {
        $.hint.tip("日志内容不能为空", "error");
        return false;
    }
    var room_status=$('input[name=room_status]').attr('data');
    var lower=$("input[name=room_status]").attr('lower');
    var cir_content=lower+':'+$('#zfbLowerContent').val();
    var result='hi_code='+hi_code+'&room_status='+room_status+'&room_code='+$('#room_code').val()+'&his_name='+$('#his_name').val()+'&cir_content='+cir_content;
    $.ajax({
        type: "post",
        url: "/houseLibrary/lowerAppHouse",
        data: result,
        dataType: "json"
    }).done(function (result) {
        if (result.code != 200) {
            $.hint.tip("失败", "error");
            return;
        }
        $.hint.tip("成功", "success");
        houseRentManagement();
    });

}