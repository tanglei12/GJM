$(function () {
    load_data();
});

function load_data() {
    var filterDateParams = [
        {name: "录入时间", value: "contractObject_CreateTime", sort: 'DESC'},
        {name: "签订日期", value: "contractObject_FillTime", sort: 'ASC'},
    ];
    var filterBars = [
        {
            text: "逾期", name: "pent_repaymentDate", type: "select1", selected: "-5", custom: false, data: {
            '-6': "逾期全部",
            '-5': "逾期5天以上",
            '-4': "逾期4天",
            '-3': "逾期3天",
            '-2': "逾期2天",
            '-1': "逾期1天",
        }
        },
        {
            text: "催收", name: "pent_repaymentDate", type: "select1", selected: "00", custom: false, data: {
            '00': "催收当天",
            '7': "催收7天内",
            '3': "催收3天内",
            '1': "催收1天内",
        }
        },
        // {name: "ucc_name", type: "select", selected: "", data: "returnUccNameState"},
    ];
    var listParams = [
        {text: "合同编号", name: "contractObject_No", param: "", func: {type: "onclick", name: "$.table.popupOpen(this)"}},
        {text: "小区房号", name: "house_address", param: ""},
        {text: "客户信息", name: "cc_name{-}ccp_phone", param: "", string1: "ccp_phone", parameter1: "", string1_prefix: " / "},
        {text: "合同状态", name: "contractObject_State", param: "returnContractState"},
        {text: "起止日期", name: "contractBody_StartTOEnd", param: ""},
        {text: "租金", name: "contractBody_Rent", param: ""},
        {text: "付款方式", name: "contractBody_PayStyle", param: ""},
        {text: "金融机构", name: "contractBody_PayType", param: ""},
        {text: "管家信息", name: "em_name", param: "", string1: "em_phone", parameter1: "", string1_prefix: " / "},
        {text: "合同归属部门", name: "ucc_name", param: ""},
        {text: "签订日期", name: "contractObject_FillTime", param: "date"},
    ];

    var dtd = $.Deferred();
    // 获取权限
    $.power.getButton(function (list) {
        $.each(list, function (index, item) {
            if (item.ucps_url.indexOf("ucc_name") >-1) {
                filterBars.push({name: "ucc_id", type: "select", selected: "", data: "returnUccNameState"});
            }
        });
        dtd.resolve();
    });

    // 获取列表数据
    $.when(dtd).done(function () {
        $.table({
            filterDateParams: filterDateParams,
            listParams: listParams,
            filterBars: filterBars,
            filterWhere: true,
            ajaxParams: {
                url: "/collection/collectionList",
            },
            ajaxDone: function (h) {
                h.find(".list-content-item").each(function () {
                    var data = $(this).find("[name=table-checkbox]").data("data");
                    var time = returnNullReplace(returnDate(data.bco_createTime), 'yyyy-MM-dd');
                    var mydate = new Date();
                    var str = "" + mydate.getFullYear() + "-";
                    str += (mydate.getMonth() + 1) + "-";
                    str += mydate.getDate();
                    var start = new Date(str.replace("-", "/").replace("-", "/"));
                    var strr = returnDate(data.bcb_repaymentDate);
                    var end = new Date(strr.replace("-", "/").replace("-", "/"));
                    if (Date.parse(start) > Date.parse(end)) {
                        $(this).find("[name=contractObject_No]").append("<span class='contractObject_yu'>" + "逾期" + "</span>");
                    }
                });
            },
            popup: {
                width: "73%",
                result: function (box, _data) {
                    loadingData(box.main, _data);
                },
                close: function () {
                    $.table.loadData();
                }
            }
        });
    });
}

/**
 * 加载弹出层
 *
 * @param box
 * @param _data
 */
function loadingData(box, _data) {
    con_code = _data.contractObject_Code;
    hi_code = _data.hi_code;
    cc_code = _data.cc_code;
    // 查询合同信息
    $.ajax({
        type: "POST",
        url: "/collection/queryHouseContract",
        data: {
            contractObject_Code: con_code
        },
        dataType: "json",
        beforeSend: function () {
            $("#contract-content").html('<div class="loading"></div>');
        }
    }).done(function (result) {
        var contractInfo = result.data.businessContractVos;  //合同信息
        var financeBillList = result.data.financeBillList;   //账单信息
        var userInformation = result.data.userInformation;   //短信记录
        var employee = result.data.employee;    //用户信息
        var rentReminder = result.data.rentReminder;  // 催收记录
        if (result.code == 200) {
            var html = '';
            html += '<div class="sb-title">';
            html += '   <ul class="title-nav" style="float:left;width: 98%;">';
            html += '	    <li class="visited">' + "基本信息";
            html += '	    </li>';
            html += '   </ul>';
            html += '</div>';
            html += '<div class="popup-list" style="width: 100%;display: block;">';
            html += '   <dl>';
            html += '       <dt>房号</dt>';
            html += '       <dd class="popup-list-dd">' + contractInfo.house_address + ' <i class="fa fa-home" title="点击查看房屋信息" onclick="window.parent.href_mo(\'/houseLibrary/jumpHouseInfo?hi_code=\'+hi_code,\'房屋信息\')"></i></dd>';
            html += '       <dt>签约客户</dt>';
            html += '       <dd>' + contractInfo.cc_name + '/' + contractInfo.ccp_phone + '<i class="fa fa-address-card-o" title="点击查看客户信息" onclick="window.parent.href_mo(\'/customer/customerEdit?cc_code=\'+cc_code,\'客户管理\')"></i></dd>';
            html += '   </dl>';
            html += '   <dl>';
            html += '       <dt>合同状态</dt>';
            html += '       <dd class="popup-list-dd"><span style="color: #18bc9c !important">' + (returnValue(contractInfo.contractObject_State) == 2 ? '生效' : '') + '</span></span></dd>';
            html += '       <dt>合同期限</dt>';
            html += '       <dd>' + contractInfo.contractBody_StartTOEnd + '（' + contractInfo.contractBody_FinalBillMerge + '年）' + '</dd>';
            html += '   </dl>';
            html += '   <dl>';
            html += '       <dt>租赁价格</dt>';
            html += '       <dd class="popup-list-dd"><strong style="color: #E74C3C !important">' + returnValue(contractInfo.contractBody_Rent) + '</strong>' + '元/月' + '（' + returnValue(contractInfo.contractBody_PayStyle) + '：' + returnValue(contractInfo.contractBody_PayType) + '）' + '</dd>';
            html += '       <dt>约定还款日</dt>';
            var str = contractInfo.contractBody_StartTOEnd.split('~');
            var strr = str[0].substring(str[0].length - 2, str[0].length);
            html += '       <dd>' + (returnValue(contractInfo.contractBody_AgreedRepayTime) == '' ? strr : returnValue(contractInfo.contractBody_AgreedRepayTime)) + '日' + '</dd>';
            html += '   </dl>';
            html += '   <dl>';
            html += '       <dt>主管家</dt>';
            html += '       <dd>' + returnValue(contractInfo.em_name) + ' - ' + returnValue(contractInfo.em_phone) + '</dd>';
            html += '   </dl>';
            html += '   <dl>';
            html += '       <dt>其他约定</dt>';
            html += '       <dd>' + (returnValue(contractInfo.contractObject_Other) == '' ? "-" : returnValue(contractInfo.contractObject_Other)) + '</dd>';
            html += '   </dl>';
            html += '   <dl>';
            html += '       <dt>备注</dt>';
            html += '       <dd>' + (returnValue(contractInfo.contractBody_Remark) == '' ? "-" : returnValue(contractInfo.contractBody_Remark)) + '</dd>';
            html += '   </dl>';
            html += '</div>';
            <!--记录-->
            html += '<div class="contractBill-div">';
            html += '   <div class="information-amin">';
            html += '       <div class="sb-title">';
            html += '           <ul class="information-ul">';
            html += '               <tab class="information-li next-bgg" name="userInformation" disabled="disabled">短信记录</tab>';
            html += '               <tab class="pent-Reminder-li" name="rentReminder">催收记录</tab>';
            html += '           </ul>';
            html += '           <button name="informationHandle" class="information-button next-bg"><label class="information-label">添加记录</label></button>';
            html += '       </div>';
            html += '       <div class="information-Record">';
            html += '           <table class="cont-table">';
            html += '               <tr class="cont-table-tr">';
            html += '                   <th class="cont-table-tr-th1">发送时间</th>';
            html += '                   <th class="cont-table-tr-th2">发送方</th>';
            html += '                   <th class="cont-table-tr-th3">接收人</th>';
            html += '                   <th class="cont-table-tr-th4">短信内容</th>';
            html += '               </tr>';
            html += '               <tbody class="cont-table-tbody custom-scroll" >';
            if (!isEmpty(userInformation)) {
                for (var i = 0; i < userInformation.length; i++) {
                    if (userInformation[i].receive_type == 1) {  //客户
                        html += '<tr class="cont-table-tbody-tr">';
                        html += '    <td class="tr1">' + returnTime(userInformation[i].send_time) + '</td>';
                        html += '    <td class="tr2">' + returnValue(userInformation[i].em_name) + '</td>';
                        html += '    <td class="tr3">' + returnValue(userInformation[i].cc_name) + '/' + returnValue(contractInfo.ccp_phone) + '</td>';
                        html += '    <td class="tr4" name="look-Information" data="' + returnValue(userInformation[i].msg_content) + '">' + '【查看】' + '</td>';
                        html += '</tr>';
                    } else if (userInformation[i].receive_type == 2) {
                        html += '<tr class="cont-table-tbody-tr">';
                        html += '    <td class="tr1">' + returnTime(userInformation[i].send_time) + '</td>';
                        html += '    <td class="tr2">' + returnValue(userInformation[i].em_name) + '</td>';
                        html += '    <td class="tr3">' + returnValue(userInformation[i].receive_em_name) + '/' + returnValue(contractInfo.em_phone) + '</td>';
                        html += '    <td class="tr4" name="look-Information" data="' + returnValue(userInformation[i].msg_content) + '">' + '【查看】' + '</td>';
                        html += '</tr>';
                    }
                }
            }
            html += '               </tbody>';
            html += '           </table>';
            html += '       </div>';
            html += '       <div class="popup-list" style="display: none;width: 100%;">';
            html += '       </div>';
            html += '   </div>';
            html += '   <div class="contractBill-amin">';
            html += '       <div class="sb-title">';
            html += '           <ul class="title-nav" style="width: 40%;">';
            html += '	            <li class="visited">' + "合同账单";
            html += '	            </li>';
            html += '           </ul>';
            html += '       </div>';
            html += '       <div>';
            html += '           <table class="cont-table">';
            html += '               <tr class="cont-table-tr">';
            html += '                   <th>账单期数</th>';
            html += '                   <th>账单类型</th>';
            html += '                   <th>应收金额</th>';
            html += '                   <th>实收金额</th>';
            html += '                   <th>未收金额</th>';
            html += '                   <th>账单状态</th>';
            html += '                   <th>应还款日期</th>';
            html += '                   <th style="padding: 0 17px;">支付日期</th>';
            html += '               </tr>';
            html += '               <tbody class="cont-table-tbody custom-scroll">';
            if (!isEmpty(financeBillList)) {
                for (var i = 0; i < financeBillList.length; i++) {
                    var bcb_type = financeBillList[i].bcb_type;
                    var bcb_state = financeBillList[i].bcb_state;
                    if (bcb_type == 0) {
                        var state = returnBillState(financeBillList[i].bcb_state, financeBillList[i].bcb_state === "2" ? "还" : "")
                        html += '<tr class="cont-table-tbody-tr">';
                        html += '    <td><div class="cont-table-tbody-div1">' + returnValue(financeBillList[i].bcb_cycle) + '</div></td>';
                        html += '    <td><div class="cont-table-tbody-div1">' + (returnValue(financeBillList[i].bcb_type) == 0 ? '租金' : '') + '</div></td>';
                        html += '    <td><div class="cont-table-tbody-div2">' + returnValue(financeBillList[i].totalRepayment) + '</div></td>';
                        html += '    <td><div class="cont-table-tbody-div2">' + returnValue(financeBillList[i].totalRealPayment) + '</div></td>';
                        html += '    <td><div class="cont-table-tbody-div2">' + returnValue(financeBillList[i].bcb_balance) + '</div></td>';
                        html += '    <td><div class="cont-table-tbody-div1 ' + (state.text == '第三方' ? 'ok' : state.style) + '">' + returnValue(state.text == '第三方' ? returnValue(contractInfo.contractBody_PayType) : state.text) + '</div></td>';
                        html += '     <td><div class="cont-table-tbody-div3">' + returnDate(financeBillList[i].bcb_repaymentDate) + '</div></td>';
                        html += '     <td><div class="cont-table-tbody-div3">' + returnDate(financeBillList[i].bcb_realPaymentDate) + '</div></td>';
                        html += '</tr>';
                    }
                }
            }
            html += '               </tbody>';
            html += '           </table>';
            html += '       </div>';
            html += '   </div>';
            html += '</div>';

            box.html(html);
        }
        // 【事件】催租记录
        box.find("[name=rentReminder]").off().on("click", function () {
            rentReminderHandle(this, box, rentReminder, userInformation, contractInfo, employee);
        });
        // 【事件】催租处理
        box.find("[name=informationHandle]").off().on("click", function () {
            informationHandle(this, contractInfo, employee);
            $(this).attr("disabled", "disabled");
        });
        //查看短信
        box.find("[name=look-Information]").off().on("click", function () {
            lookInformation(this);
        });
        $.popupRefreshClose();
    });
}

//查看短信
function lookInformation(obj) {
    var content = $(obj).attr('data');
    if ($(obj).attr('code') == 1) {
        $(obj).parents('tr').next('tr').remove();
        $(obj).removeAttr('code', '');
    } else {
        var html = '';
        html += '<tr class="tr-hidden"><td class="td-hidden" colspan="4"><div class="content-main"><i class="fa fa-angle-up"></i>' + content + '</div></td></tr>';
        $(obj).parents('tr').after(html);
        $(obj).attr('code', '1');
    }
}

/**
 * 点击催收记录
 */
function rentReminderHandle(obj, box, rentReminder, userInformation, contractInfo, employee) {
    $('.information-amin').empty();
    var html = '';
    html += '       <div class="sb-title">';
    html += '           <ul class="information-ul">';
    html += '               <tab class="information-li" name="userInformation">短信记录</tab>';
    html += '               <tab class="pent-Reminder-li next-bgg" disabled="disabled" name="rentReminder">催收记录</tab>';
    html += '           </ul>';
    html += '           <button name="informationHandle" class="information-button next-bg"><label class="information-label">添加记录</label></button>';
    html += '       </div>';
    html += '       <div class="information-Record">';
    html += '           <table class="cont-table">';
    html += '               <tr class="cont-table-tr">';
    html += '                   <th class="cont-table-tr-th1">催收时间</th>';
    html += '                   <th class="cont-table-tr-th2">催收人</th>';
    html += '                   <th class="cont-table-tr-th3">客户</th>';
    html += '                   <th class="cont-table-tr-th4">催收内容</th>';
    html += '               </tr>';
    html += '               <tbody class="cont-table-tbody custom-scroll" >';
    if (!isEmpty(rentReminder)) {
        for (var i = 0; i < rentReminder.length; i++) {
            html += '<tr class="cont-table-tbody-tr">';
            html += '    <td class="tr1">' + returnTime(rentReminder[i].pr_time) + '</td>';
            html += '    <td class="tr2">' + returnValue(rentReminder[i].em_name) + '</td>';
            html += '    <td class="tr3">' + returnValue(rentReminder[i].cc_name) + '/' + returnValue(contractInfo.ccp_phone) + '</td>';
            html += '    <td class="tr4" name="look-Information" data="' + returnValue(rentReminder[i].pr_content) + '">' + '【查看】' + '</td>';
            html += '</tr>';
        }
    }
    html += '               </tbody>';
    html += '           </table>';
    html += '       </div>';
    html += '       <div class="popup-list" style="display: none;width: 100%;">';
    html += '       </div>';
    $('.information-amin').append(html);
    // 【事件】短信记录
    box.find("[name=userInformation]").off().on("click", function () {
        userInformationHandel(this, box, rentReminder, userInformation, contractInfo, employee);
    });
    // 【事件】催租处理
    box.find("[name=informationHandle]").off().on("click", function () {
        informationHandle(this, contractInfo, employee);
        $(this).attr("disabled", "disabled");
    });
    //查看短信
    box.find("[name=look-Information]").off().on("click", function () {
        lookInformation(this);
    });
}

/**
 * 点击短信记录
 */
function userInformationHandel(obj, box, rentReminder, userInformation, contractInfo, employee) {
    $('.information-amin').empty();
    var html = '';
    html += '       <div class="sb-title">';
    html += '           <ul class="information-ul">';
    html += '               <tab class="information-li next-bgg" name="userInformation" disabled="disabled">短信记录</tab>';
    html += '               <tab class="pent-Reminder-li" name="rentReminder"">催收记录</tab>';
    html += '           </ul>';
    html += '           <button name="informationHandle" class="information-button next-bg"><label class="information-label">添加记录</label></button>';
    html += '       </div>';
    html += '       <div class="information-Record">';
    html += '           <table class="cont-table">';
    html += '               <tr class="cont-table-tr">';
    html += '                   <th class="cont-table-tr-th1">发送时间</th>';
    html += '                   <th class="cont-table-tr-th2">发送人</th>';
    html += '                   <th class="cont-table-tr-th3">接收人</th>';
    html += '                   <th class="cont-table-tr-th4">短信内容</th>';
    html += '               </tr>';
    html += '               <tbody class="cont-table-tbody custom-scroll" >';
    if (!isEmpty(userInformation)) {
        for (var i = 0; i < userInformation.length; i++) {
            if (userInformation[i].receive_type == 1) {  //客户
                html += '<tr class="cont-table-tbody-tr">';
                html += '    <td class="tr1">' + returnTime(userInformation[i].send_time) + '</td>';
                html += '    <td class="tr2">' + returnValue(userInformation[i].em_name) + '</td>';
                html += '    <td class="tr3">' + returnValue(userInformation[i].cc_name) + '/' + returnValue(contractInfo.ccp_phone) + '</td>';
                html += '    <td class="tr4" name="look-Information" data="' + returnValue(userInformation[i].msg_content) + '">' + '【查看】' + '</td>';
                html += '</tr>';
            } else if (userInformation[i].receive_type == 2) {
                html += '<tr class="cont-table-tbody-tr">';
                html += '    <td class="tr1">' + returnTime(userInformation[i].send_time) + '</td>';
                html += '    <td class="tr2">' + returnValue(userInformation[i].em_name) + '</td>';
                html += '    <td class="tr3">' + returnValue(userInformation[i].receive_em_name) + '/' + returnValue(contractInfo.em_phone) + '</td>';
                html += '    <td class="tr4" name="look-Information" data="' + returnValue(userInformation[i].msg_content) + '">' + '【查看】' + '</td>';
                html += '</tr>';
            }
        }
    }
    html += '               </tbody>';
    html += '           </table>';
    html += '       </div>';
    html += '       <div class="popup-list" style="display: none;width: 100%;">';
    html += '       </div>';
    $('.information-amin').append(html);
    // 【事件】催租记录
    box.find("[name=rentReminder]").off().on("click", function () {
        rentReminderHandle(this, box, rentReminder, userInformation, contractInfo, employee);
    });
    // 【事件】催租处理
    box.find("[name=informationHandle]").off().on("click", function () {
        informationHandle(this, contractInfo, employee);
        $(this).attr("disabled", "disabled");
    });
    //查看短信
    box.find("[name=look-Information]").off().on("click", function () {
        lookInformation(this);
    });
}

/**
 * 弹出层-催租处理
 * @param obj
 * @param
 */
function informationHandle(obj, contractInfo, employee) {
    $('.information-Record').hide();
    var p_box = $(obj).parents(".information-amin").find('.popup-list').show();
    p_box.find(".popup-list-result").remove();
    p_box.append(
        '<div class="popup-list-result" style="width: 100%;min-width: 100%;">' +
        '   <div class="popup-list-result-title">催租处理<button class="popup-list-result-close error"><i class="fa-remove"></i></button></div>' +
        '   <div class="popup-list-result-form"><div class="error">数据加载中</div></div>' +
        '</div>');
    var html = '';
    html += '<dl>';
    html += '    <dt>客户</dt>';
    html += '    <dd>' + contractInfo.cc_name + '</dd>';
    html += '</dl>';
    html += '<dl>';
    html += '    <dt>催租记录</dt>';
    html += '    <dd style="display: table-cell;">';
    html += '       <textarea class="popup-textarea" name="refund-desc" maxlength="120" style="border: 1px solid #dddddd"></textarea>';
    html += '    </dd>';
    html += '</dl>';
    html += '<dl>';
    html += '    <dt>催租人</dt>';
    html += '    <dd>' + employee.em_name + '</dd>';
    html += '</dl>';
    html += '<dl>';
    html += '    <dt>催租时间</dt>';
    html += '    <dd>' + getCurrentTime() + '</dd>';
    html += '</dl>';
    html += '<dl>';
    html += '    <dt></dt>';
    html += '    <dd>';
    html += '       <button class="popup-list-result-confirm next-bg" name="refundConfirm">提交</button>';
    html += '       <button class="popup-list-result-close error-bg">取消</button>';
    html += '    </dd>';
    html += '</dl>';
    p_box.find(".popup-list-result-form").html(html);

    // 【事件】关闭结果
    p_box.find(".popup-list-result-close").off().on("click", function () {
        $(this).parents(".popup-list-result").hide("fast", function () {
            this.remove();
            $(obj).removeAttr("disabled");
            $('.information-Record').css({'display': 'flex', 'width': '100%'});
            $(obj).parents(".information-amin").find('.popup-list').hide();
        });
    });

    // 【事件】提交催租
    p_box.find("[name=refundConfirm]").off().on("click", function () {
        // 描述
        var content = $('.popup-textarea').val();
        if (isEmpty(content)) {
            p_box.find("[name=refund-desc]").msg("请填写催租记录");
            return;
        }
        var contractObject_code = contractInfo.contractObject_Code
        var hi_code = contractInfo.hi_code;
        var cc_code = contractInfo.cc_code;
        $.hint.confirm("确定提交催租处理吗？", function () {
            $.ajax({
                type: "POST",
                url: "/collection/submitPentReminder",
                data: "contractObject_code=" + contractObject_code
                + "&hi_code=" + hi_code
                + "&Rent_cc_code=" + cc_code
                + "&pr_content=" + content,
                dataType: "json",
                beforeSend: function () {

                }
            }).done(function (result) {
                if (result.code != 200) {
                    $.hint.tip("提交失败!", 'error');
                } else {
                    $.hint.tip("提交成功!", 'success');
                }
                $.popupRefresh();
            });
        });
    });
}
