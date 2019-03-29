var con_code,	// 合同编号
    cco_code,	// 合约编号
    mode,		// 模式
    conType,	// 合同类型
    bill_code	// 订单编号
;

$(function () {
    // 初始化URL参数
    con_code = getQueryString("con_code");
    mode = getQueryString("mode");

    // 【初始化数据】
    initContractApply();
});

/*=====================================================================================*/

/** 初始化数据*/
function initContractApply() {
    $.ajax({
        type: "POST",
        url: "/contractObject/queryCancelContract",
        data: {
            con_code: getQueryString("con_code"),
            mode: mode
        },
        dataType: "json"
    }).done(function (result) {
        switch (result.code) {
            case 200:
                // 【加载基本数据】
                loadBaseData(result.data);
                switch (mode) {
                    case "auditing":
                        // 【合约申请】
                        loadAuditingData(result.data);
                        break;
                    case "payway":
                        // 【支付变更】
                        loadPaywayData(result.data);
                        break;
                    default :
                        loadAuditingData(result.data);
                        break;
                }
                // 获取客户信息
                queryCustomerInfo();
                break;
            default :
                break;
        }
        initBind();
    });
}

/** 加载基本信息*/
function loadBaseData(data) {
    var contractVo = data.contractInfo;
    var contractCustomer = data.contractCustomer;

    // 【初始化变量】
    conType = contractVo.contractObject_Type;

    var html = "";
    html += '	<span><label>小区房号：</label>' + returnValue(contractVo.house_address) + '</span>';
    html += '	<span style="min-width: 50%;width: 50%;"><label>合同期限：</label>' + returnValue(contractVo.contractBody_StartTOEnd) + '（' + returnValue(contractVo.contractBody_TimeLimit) + '）</span>';
    html += '	<hr>';
    html += '	<span><label>租金：</label><i class="money-font20">' + returnMoney(contractVo.contractBody_Rent) + '</i>元/月（' + returnValue(contractVo.contractBody_PayStyle) + '）</span>';
    // 保证金
    html += '	<span><label>保证金：</label><i class="money-font20">' + returnMoney(contractVo.contractBody_Pay) + '</i>元</span>';
    $("#show-info-box").html(html);
}

/** 加载合约申请数据*/
function loadAuditingData(data) {
    var contractInfo = data.contractInfo,
        cancelContract = data.cancelContract,
        payTypeList = data.payTypeList,
        contractCustomer = data.contractCustomer;

    // 房屋地址
    $("#houseAddress")
    .val(contractInfo.house_address)
    .attr("data-code", contractInfo.hi_code);

    // 合约类型
    if (isEmpty(cancelContract)) {
        $("#contractTypeBox").empty();
        $.each(payTypeList, function (index, data) {
            var html = "";
            html += '<label class="common-borderbox ' + (index == 0 ? 'common-borderbox-checked' : '') + '">';
            html += '	<input type="radio" name="cancelType" value="' + data.contractType_Name + '" ' + (index == 0 ? 'checked' : '') + '>' + data.contractType_Name + '';
            html += '</label>';
            $("#contractTypeBox").append(html);
        });

        var _dealDate = new Date(returnDate(contractInfo.contractObject_DeadlineTime))
        _dealDate = _dealDate.setFullYear(_dealDate.getFullYear(), _dealDate.getMonth(), _dealDate.getDate() - 15);
        if (_dealDate > new Date().getTime()) {
            $("input[name=cancelType][value=到期]").attr("disabled", "disabled").parent().addClass("common-borderbox-disabled");
        }
        // 经办日期
        $("#cco_createDate").val(returnDate(new Date()));
    } else {

        // 初始化变量
        cco_code = cancelContract.cco_code;

        var html = "";
        html += '<label class="common-borderbox common-borderbox-checked">';
        html += '	<input type="radio" name="cancelType" value="' + cancelContract.cco_applicationType + '" checked>' + cancelContract.cco_applicationType + '';
        html += '</label>';
        $("#contractTypeBox").html(html);

        // 业务日期
        var path_len = 0;

        if (!isEmpty(cancelContract.cco_path)) {
            var paths = cancelContract.cco_path.split(";");
            $.each(paths, function (index, data) {
                if (!isEmpty(data)) {
                    var html = "";
                    html += '<div class="images-box-img">';
                    html += '	<img class="showboxImg" name="HY" src="' + data + '">';
                    html += '	<span class="images-box-img-delete" data-type="HY" data-del-url="">删除</span>';
                    html += '</div>';
                    $("#cco_sqs").append(html);
                    path_len++;
                }
            });
        }
        $("#HY-count").text(path_len);

        // 业务日期
        $("#cco_handleDate").val(returnDate(cancelContract.cco_handleDate));
        // 业务日期
        $("#cco_handleDate").val(returnDate(cancelContract.cco_handleDate));
        // 业务费用
        $("#cco_subletCost").val(returnFloat(cancelContract.cco_subletCost));
        // 申请内容
        $("#cco_applicationContent").html(returnValue(cancelContract.cco_applicationContent));
        // 经办人
        $("#cco_peopleName").val(returnValue(cancelContract.cco_peopleName));
        // 经办日期
        $("#cco_createDate").val(returnDate(cancelContract.cco_applicationTime));

        $("#applySubmit").text("修改");
    }
    $("#cco_subletCost").attr("data-rent", returnNumber(contractInfo.contractBody_Rent));

    // ======【客户】======

    // 客户姓名
    $("#cco_applicant").val(returnValue(contractCustomer.cc_name));
    // 客户手机
    $("#cco_phone").val(returnValue(contractCustomer.ccp_phone));
    if (!isEmpty(contractCustomer.customerBank)) {
        // 客户开户行
        $("#cco_bank").val(returnValue(contractCustomer.customerBank.cbc_bankName));
        // 银行卡号
        $("#cco_bankCard").val(returnValue(contractCustomer.customerBank.cbc_cardNum));
    }

    changeCancelType();
}

/** 加载支付变更数据*/
function loadPaywayData(data) {
    var contractInfo = data.contractInfo;

    // 显示账单
    var bill_html = '';
    bill_html += '<fieldset>';
    bill_html += '	<legend>账单信息</legend>';
    if (contractInfo.contractObject_Type == '托管合同') {
        // 【初始化变量】
        bill_code = data.trusteeshipOrder.tso_code;

        bill_html += '<div class="sub-content" style="padding: 0">';
        bill_html += '	<div class="item-table item-table-head">';
        bill_html += '		<ul>';
        bill_html += '			<li style="width: 10%">期数</li>						';
        bill_html += '			<li style="width: 20%">订单号</li>';
        bill_html += '			<li style="width: 20%">房东信息</li>';
        bill_html += '			<li style="width: 10%">应付金额</li>';
        bill_html += '			<li style="width: 10%">实付金额</li>';
        bill_html += '			<li style="width: 20%">应付款时间</li>';
        bill_html += '			<li style="width: 10%">账单状态</li>';
        bill_html += '		</ul>';
        bill_html += '	</div>';
        bill_html += '	<div class="item-table item-table-body" style="max-height: 320px;">';
        $.each(data.trusteeshipBill, function (index, data) {
            bill_html += '<ul style="' + (index % 2 == 0 ? 'background: #f8f8f8' : 'background: #E0EFF7') + '">';
            bill_html += '	<li style="width: 10%">' + returnValue(data.tsb_payCycleNum) + '</li>';
            bill_html += '	<li style="width: 20%">' + returnValue(data.tsb_code) + '</li>';
            bill_html += '	<li style="width: 20%">' + returnValue(data.tsb_name) + '&nbsp;/&nbsp;' + returnValue(data.tsb_phone) + '</li>';
            bill_html += '	<li style="width: 10%">' + returnValue(isEmpty(data.tsb_repayment) ? '' : data.tsb_repayment + '元') + '</li>';
            bill_html += '	<li style="width: 10%">' + returnValue(isEmpty(data.tsb_realPayment) ? '' : data.tsb_realPayment + '元') + '</li>';
            bill_html += '	<li style="width: 20%">' + returnDate(data.tsb_repaymentDate) + '</li>';
            var tsb_state_color = '';
            switch (data.tsb_state) {
                case '待还款':
                    tsb_state_color = 'hint';
                    break;
                case '已还款':
                    tsb_state_color = 'ok';
                    break;
                case '逾期':
                    tsb_state_color = 'error';
                    break;
            }
            bill_html += '	<li class="' + tsb_state_color + '" style="width: 10%">' + returnValue(data.tsb_state) + '</li>';
            bill_html += '</ul>';
        });
        bill_html += '	</div>';
        bill_html += '</div>';
    }
    if (contractInfo.contractObject_Type == '租赁合同') {
        bill_code = data.tenantOrder.to_code;

        bill_html += '<div class="sub-content" style="padding: 0">';
        bill_html += '	<div class="item-table item-table-head">';
        bill_html += '		<ul>';
        bill_html += '			<li style="width: 10%">期数</li>						';
        bill_html += '			<li style="width: 20%">订单号</li>';
        bill_html += '			<li style="width: 20%">租客信息</li>';
        bill_html += '			<li style="width: 10%">应收金额</li>';
        bill_html += '			<li style="width: 10%">实收金额</li>';
        bill_html += '			<li style="width: 20%">应收款时间</li>';
        bill_html += '			<li style="width: 10%">账单状态</li>';
        bill_html += '		</ul>';
        bill_html += '	</div>';
        bill_html += '	<div class="item-table item-table-body" style="max-height: 320px;">';
        $.each(data.billTenantBill, function (index, data) {
            bill_html += '<ul style="' + (index % 2 == 0 ? 'background: #f8f8f8' : 'background: #E0EFF7') + '">';
            bill_html += '	<li style="width: 10%">' + returnValue(data.tb_payCycleNum) + '</li>';
            bill_html += '	<li style="width: 20%">' + returnValue(data.tb_code) + '</li>';
            bill_html += '	<li style="width: 20%">' + returnValue(data.tb_name) + '&nbsp;/&nbsp;' + returnValue(data.tb_phone) + '</li>';
            bill_html += '	<li style="width: 10%">' + returnValue(isEmpty(data.tb_shouldMoney) ? '' : data.tb_shouldMoney + '元') + '</li>';
            bill_html += '	<li style="width: 10%">' + returnValue(isEmpty(data.tb_money) ? '' : data.tb_money + '元') + '</li>';
            bill_html += '	<li style="width: 20%">' + returnDate(data.tb_shouldDate) + '</li>';
            var tb_state_color = '';
            switch (data.tb_state) {
                case '待还款':
                    tb_state_color = 'hint';
                    break;
                case '已还款':
                    tb_state_color = 'ok';
                    break;
                case '逾期':
                    tb_state_color = 'error';
                    break;
            }
            bill_html += '	<li class="' + tb_state_color + '" style="width: 10%">' + returnValue(data.tb_state) + '</li>';
            bill_html += '</ul>';
        });
        bill_html += '	</div>';
        bill_html += '</div>';
    }

    bill_html += '</fieldset>';
    $("#show-info-box").append(bill_html);

    var html = "";
    html += '<dl class="main-box-list">';
    html += '	<dt class="item">';
    html += '		<em>*</em>';
    html += '		<span class="item-titile">付款方式</span>';
    html += '	</dt>';
    html += '	<dd class="item">';
    html += '		<select class="form-control" id="conPayType" onchange="showPayType(this);showPayDate();" required>';
    // 付款方式
    $.each(data.payWayList, function (index, data) {
        html += '	<option value="' + data.contractType_Name + '" data-value="' + data.contractType_Value + '" ' + (contractInfo.contractBody_PayStyle == data.contractType_Name ? 'selected' : '') + '>' + data.contractType_Name + '</option>';
    });
    html += '    	</select>';
    if (contractInfo.contractObject_Type == '托管合同') {
        html += '	<div id="rentPlus" class="toolbox" style="margin-left: 14px;">';
        html += '		<span class="toolbox-title">租金加成<i class="icon-info-sign" style="position: absolute;top: 2px;right: 1px;color: #fff;" title="租金加成月付+50、季付100%、半年付94%、年付88%"></i></span>';
        html += '		<span class="toolbox-value value-suffix" style="padding: 0 14px;">';
        html += '			<input type="text" id="contractBody_RentPlus" class="money" value="100" data-type="%" maxlength="3">';
        html += '		</span>';
        html += '		<span class="toolbox-suffix">元</span>';
        html += '		<span class="toolbox-option icon-retweet" id="retweetRent" title="切换租金加成方式"></span>';
        html += '	</div>';
    }
    if (contractInfo.contractObject_Type == '租赁合同') {
        html += '	<div id="monthPayType" class="item-left" data-value="' + contractInfo.contractBody_PayType + '" style="display: ' + (contractInfo.contractBody_PayStyle != '月付' ? 'none' : '') + '">';
        $.each(data.payTypeList, function (index, data) {
            html += '	<label class="type-label ' + (data.contractType_Name != '管家婆' ? 'dis_label' : 'span-checked') + '">' + data.contractType_Name + '<i></i>';
            html += '		<input type="checkbox" class="type-radio" name="payType" onclick="changeType(this)" checked value="' + data.contractType_Name + '" ' + (data.contractType_Name != '管家婆' ? 'disabled' : '') + '>';
            html += '	</label>';
        });
        html += '	</div>';
    }
    html += '	</dd>';
    html += '	<dd class="item hint" style="clear: both;text-indent: 120px;line-height: 28px;height: 28px;">' + (contractInfo.contractObject_Type == '租赁合同' ? '月付如果改成第三方支付，则需要作废该合同并重新签订新合同' : '') + '</dd>';
    html += '</dl>';
    html += '<hr>';
    html += '<hr>';
    html += '<dl class="main-box-list">';
    html += '	<dt class="item">';
    html += '		<span class="item-titile">合同期限</span>';
    html += '	</dt>';
    html += '	<dd class="item" style="min-width: 100px;">';
    html += '		<input type="text" class="form-control number" value="' + contractInfo.contractBody_TimeLimit + '" onchange="changeDate();" maxlength="2" placeholder="租赁期限" readonly>';
    html += '	</dd>';
    html += '	<dd class="tisp"></dd>';
    html += '</dl>';
    html += '<dl class="main-box-list">';
    html += '	<dt class="item">';
    html += '		<span class="item-titile">起止时间</span>';
    html += '	</dt>';
    html += '	<dd class="item">';
    html += '		<input type="text" class="form-control" id="conOpenDate" value="' + (contractInfo.contractBody_StartTOEnd.split("~")[0]) + '" placeholder="开始日期" readonly>';
    html += '		<span class="dd-span">至</span>';
    html += '		<input type="text" class="form-control" id="conEndDate" value="' + (contractInfo.contractBody_StartTOEnd.split("~")[1]) + '" placeholder="结束日期" readonly>';
    html += '	</dd>';
    html += '	<dd class="tisp"></dd>';
    html += '</dl>';
    html += '<hr>';
    html += '<dl class="main-box-list">';
    html += '	<dt class="item">';
    html += '		<span class="item-titile">变更前付租日期</span>';
    html += '	</dt>';
    html += '	<dd class="item payDate" id="oldPayDate">';
    if (contractInfo.contractObject_Type == '托管合同') {
        $.each(data.trusteeshipBill, function (index, data) {
            var _isBoo = data.tsb_state == '已还款';
            html += '	<label class="form-box ' + (_isBoo ? "form-false" : "form-true") + '"><span class="form-span" style="color: ' + (_isBoo ? "#27AE60" : "") + ';">' + (data.tsb_payCycleNum < 10 ? '0' + data.tsb_payCycleNum : data.tsb_payCycleNum) + '、</span><input type="text" class="form-control" value="' + returnDate(data.tsb_repaymentDate) + '" style="' + (_isBoo ? "border: 1px solid #27ae60;color: #27AE60;background: #fff" : "") + ';" readonly></label>';
        });
    }
    if (contractInfo.contractObject_Type == '租赁合同') {
        $.each(data.billTenantBill, function (index, data) {
            var _isBoo = data.tb_state == '已还款';
            html += '	<label class="form-box ' + (_isBoo ? "form-false" : "form-true") + '"><span class="form-span" style="color: ' + (_isBoo ? "#27AE60" : "") + ';">' + (data.tb_payCycleNum < 10 ? '0' + data.tb_payCycleNum : data.tb_payCycleNum) + '、</span><input type="text" class="form-control" value="' + returnDate(data.tb_shouldDate) + '" style="' + (_isBoo ? "border: 1px solid #27ae60;color: #27AE60;background: #fff" : "") + ';" readonly></label>';
        });
    }
    html += '	</dd>';
    html += '</dl>';
    html += '<hr>';
    html += '<dl class="main-box-list">';
    html += '	<dt class="item">';
    html += '		<span class="item-titile">变更后付租日期</span>';
    html += '	</dt>';
    html += '	<dd class="item payDate" id="newPayDate"></dd>';
    html += '	<dd class="tisp"></dd>';
    html += '</dl>';
    html += '<hr>';
    html += '<dl class="main-box-list main-box-bottom">';
    html += '	<dt class="item">&nbsp;</dt>';
    html += '	<dd class="item">';
    html += '		<button class="form-control" onclick="submitPayWay()">提交</button>';
    html += '	</dd>';
    html += '	<dd class="item">';
    html += '		<button class="form-control back" onclick="back()">返回</button>';
    html += '	</dd>';
    html += '</dl>';
    html += '<hr>';
    $("#payway-option").html(html);

    // 后续操作初始化
    showPayDate();
    applyInit();

    $("#rentPlus>.toolbox-option").on("click", function () {
        var _box = $(this).siblings(".toolbox-value");
        if (_box.hasClass("value-suffix")) {
            _box.addClass("value-prefix").removeClass("value-suffix").find("input").attr("data-type", "+");
        } else {
            _box.addClass("value-suffix").removeClass("value-prefix").find("input").attr("data-type", "%");
        }
    });

    $(".item-table-body").perfectScrollbar();
};

/** 初始化绑定事件*/
function initBind() {
    // 初始化日期插件
    $("#cco_handleDate,#cco_createDate").datepicker();

    // 合约类型
    $("input[name=cancelType]").on("click", function () {
        changeCancelType($(this));
    });

    // 业务申请人添加
    $("#cco_applicant").on("change", function () {
        if ($(this).val() == -1) {
            $("#add-customer").fadeIn();
        } else {
            $("#add-customer").hide();
        }
    });

    // 选择客户
    $("input[name=customer-name]").on("click", function () {
        $(this).openModel({
            title: "客户信息",
            target: {
                id: "customer-id",
                name: "customer-name"
            }
        });
    });

    // 绑定客户信息
    $("#customer-btn").on("click", function () {
        var _this = $(this);
        var _cus_id = returnValue($("input[name=customer-id]").val());
        if (isEmpty(_cus_id)) {
            $.jBox.tip("请选择一个客户进行绑定", "warning");
            return;
        }
        $.ajax({
            type: "POST",
            url: "/contractObject/bindCustomerRelaInfo",
            data: {
                con_code: con_code,
                cus_id: _cus_id
            },
            dataType: "json",
            beforeSend: function () {
                _this.attr("disabled", "disabled");
                $.jBox.tip("客户绑定中", "loading");
            }
        }).done(function (result) {
            if (result.code == 200) {
                $.jBox.tip("客户绑定成功", "success");

                $("#add-customer").hide();
                $("#add-customer").find("input[name=customer-id]").val("");
                $("#add-customer").find("input[name=customer-name]").val("");

                queryCustomerInfo(_cus_id);
            } else {
                $.jBox.tip(result.msg, "error");
            }
        }).always(function () {
            _this.removeAttr("disabled").text("绑定");
        });
    });

    // Select样式
    $("select").niceSelect();
}

/** 服务费用计算*/
function changeCancelType() {
    var _type = $("input[name='cancelType']:checked").val();
    var _rent = returnNumber($("#cco_subletCost").attr("data-rent"));
    $(".main-box-list[data-type=customer]").fadeIn();
    switch (_type) {
        case "解约":
            $("#cco_subletCost").val(returnFloat(_rent * 12 * 0.2)).removeAttr("readonly");
            break;
        case "转租":
            $("#cco_subletCost").val(returnFloat(_rent * 1 * 0.5)).removeAttr("readonly");
            break;
        case "退租":
            $("#cco_subletCost").val(returnFloat(_rent)).removeAttr("readonly");
            break;
        case "强收":
            $(".main-box-list[data-type=customer]").hide();
            $("#cco_subletCost").val(0).attr("readonly", "readonly");
            break;
        case "换房":
            $("#cco_subletCost").val(returnFloat(_rent * 1 * 0.5)).removeAttr("readonly");
            break;
        case "到期":
            $("#cco_subletCost").val(0).attr("readonly", "readonly");
            break;
    }
//	$(".handle-date-title").html(_type + "日期");
//	$("#cco_handleDate").attr("placeholder", _type + "日期");
    $(".sublet-cost-title").html(_type + "费用");
    $(".handle-date-content").html(_type + "说明");
}

/** 查询客户信息*/
function queryCustomerInfo(id) {
    $.ajax({
        type: "POST",
        url: "/contractObject/queryCustomerInfo",
        data: {
            con_code: con_code
        },
        dataType: "json"
    }).done(function (result) {
        switch (result.code) {
            case 200:
                var data = result.data;
                if (!isEmpty(data)) {
                    $("#cco_applicant").html("");
                    $.each(data, function (index, data) {
                        var role = "";
                        if (conType == "托管合同") {
                            switch (data.crc_role) {
                                case 0:
                                    role = "房东";
                                    break;
                                case 1:
                                    role = "联系人";
                                    break;
                            }
                        }
                        if (conType == "租赁合同") {
                            switch (data.crc_role) {
                                case 0:
                                    role = "租客";
                                    break;
                                case 1:
                                    role = "室友";
                                    break;
                            }
                        }
                        $("#cco_applicant").append('<option value="' + data.cc_id + '" ' + (returnNumber(id) == data.cc_id ? "selected" : "") + '>' + role + ' - ' + returnValue(data.cc_name) + ' - ' + returnValue(data.ccp_phone) + '</option>');
                    });
                    $("#cco_applicant").append('<option value="-1">添加</option>');
                    $("select").niceSelect("update");
                }
                break;
            default :
                break;
        }
    });
}

/** 跳转客户编辑*/
function jumpCustomer(code) {
    window.parent.href_mo('/customer/customerEdit/?typeState=2&cc_code=' + code, '编辑客户', '合约申请');
}

/** 返回*/
function back() {
    window.location.href = "/contractObject/contractObjectList?mode=list";
}

/** 提交支付变更*/
function submitPayWay() {
    swal({
        title: "您确定需要更改合同付款方式吗",
        text: "我们将对该合同未还款的账单进行清除，并生成新的账单",
        type: "warning",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true
    }, function () {
        $.ajax({
            type: "POST",
            url: "/contractObject/updatePayWay",
            data: {
                con_code: con_code,
                payWay: $("#conPayType option:selected").val(),
                order_code: bill_code,
                firstPayDate: $("#firstPayDate").val(),
                rentPlus: $("#contractBody_RentPlus").val() + $("#contractBody_RentPlus").attr("data-type")
            },
            dataType: "json"
        }).done(function (result) {
            if (result.code == 200) {
                swal({
                    title: result.msg,
                    text: "",
                    type: "success"
                }, function () {
                    window.location.href = '/contractObject/contractObjectList?mode=review';
                });
            } else {
                swal(result.msg, "", "warning");
            }
        });
    });
}

function changeType(obj) {
    var _name = $(obj).attr("name");
    $("input[name='" + _name + "']").parent().removeClass("span-checked");
    $(obj).parent().addClass("span-checked");
}

/** 初始化*/
function applyInit() {
    $(".form-control:required").on("change", function () {
        var $this = $(this);
        if ($this.is(":hidden")) {
            return;
        }
        var $thisId = $this.attr("id");
        var $thisVal = $this.val();
        var $parent = $this.parent().parent();
        var text = $parent.find(".item-titile").text();
        if (isEmpty($thisVal)) {
            $this.addClass("input-error");
            $this.siblings(".true-tisp").hide();
            $parent.find(".tisp").addClass("error").text(text + "不能为空");
            return;
        }
        if ($thisId == "houseAddress") {
            $.ajax({
                type: "POST",
                url: "/contractObject/isHavingVaildCancelContract",
                data: {
                    contractObject_No: $("#contractObject_No").val(),
                    hi_code: $("#hi_code").val()
                },
                dataType: "json"
            }).done(function (result) {
                if (result.code == 200) {
                    $this.addClass("input-error");
                    $this.siblings(".true-tisp").hide();
                    $parent.find(".tisp").addClass("error").text("该合同已签订解约申请");
                    return;
                }
            });
        }
        $this.siblings(".true-tisp").show();
        $this.removeClass("input-error");
        $parent.find(".tisp").removeClass("error").empty();
    });
}

/** 提交解约申请*/
function applySubmit() {
    var isOk = true;
    $(".form-control[required]:visible").each(function () {
        if (isEmpty($(this).val())) {
            $(this).msg("不能为空");
            isOk = false;
            return false;
        }
    });
    if (!isOk) {
        return;
    }
    var _path = "";
    $(".showboxImg[name=HY]").each(function () {
        _path += $(this).attr("src") + ";";
    });
//	if(_path.length < 10){
//		$("#applySubmit").msg("请添加申请书图片");
//		return;
//	}
    $.ajax({
        type: "POST",
        url: "/contractObject/applySubmit",
        data: {
            contractObject_Code: returnValue(con_code),
            hi_code: $("#houseAddress").attr("data-code"),
            cco_applicationContent: $("#cco_applicationContent").val(),
            cco_applicationTime: $("#cco_createDate").val(),
            cco_applicationType: $("input[name='cancelType']:checked").val(),
            cco_applicant: $("#cco_applicant").val(),
            cco_path: _path,
            cco_phone: $("#cco_phone").val(),
            cco_peopleName: $("#cco_peopleName").val(),
            cco_handleDate: $("#cco_handleDate").val()
        },
        dataType: "json",
        beforeSend: function () {
            $("#applySubmit").val("申请中..").attr("disabled", "disabled");
        }
    }).done(function (result) {
        switch (result.code) {
            case 200:
                $.jBox.tip("保存成功", "success");
                window.location.href = '/transferKeep/transfer?con_code=' + con_code + '&mode=compary';
                break;
            default :
                $.jBox.tip(result.msg, "error");
                break;
        }
    }).always(function () {
        $("#applySubmit").val("申请").removeAttr("disabled");
    });
}

/** 支付变更--是否显示支付类型*/
function showPayType(obj) {
    // 显示隐藏月付合作方式
    var $payType = $("#monthPayType");
    var $thisVal = $("#conPayType").val();
    if ($thisVal == "月付") {
        $payType.show();
        $("#moreImgBox").show();
    } else {
        $("#moreImgBox").hide();
        $payType.hide();
    }
    var _rentPlus = $("#contractBody_RentPlus");
    if ($(obj).val() == "月付") {
        if (_rentPlus.attr("data-type") != "+") {
            $("#retweetRent").click();
        }
        _rentPlus.val(50);
    }
    if ($(obj).val() == "季付") {
        if (_rentPlus.attr("data-type") != "%") {
            $("#retweetRent").click();
        }
        _rentPlus.val(100);
    }
    if ($(obj).val() == "半年付") {
        if (_rentPlus.attr("data-type") != "%") {
            $("#retweetRent").click();
        }
        _rentPlus.val(94);
    }
    if ($(obj).val() == "年付") {
        if (_rentPlus.attr("data-type") != "%") {
            $("#retweetRent").click();
        }
        _rentPlus.val(88);
    }
}

/** 支付变更--显示支付日期*/
function showPayDate(param) {
    var selectData = $("#conPayType option:selected").attr("data-value");
    var $startVal = $("#oldPayDate .form-true:first").find("input.form-control").val();
    var $endVal = $("#conEndDate").val();
    if (isEmpty($startVal) || isEmpty($endVal)) {
        return;
    }
    if ($(".form-false").length < 1) {
        $startVal = $("#conOpenDate").val();
    }
//	var oldPayWay =$("#contractBody_PayStyle").val();
//	var newPayWay =$("#conPayType option:selected").val();
//	if(oldPayWay == newPayWay){
//		$("#newPayDate").empty();
//		return;
//	}
    // 计算账单日期
    $.ajax({
        type: "POST",
        url: "/contractObject/calBillDate",
        data: {
            startDate: $startVal,
            endDate: $endVal,
            monthCount: selectData
        },
        dataType: "json"
    }).done(function (result) {
        if (result.code == 200) {
            $("#newPayDate").empty();
            $.each(result.data, function (index, data) {
                var i = index + 1;
                if (conType == "托管合同") {
                    if (index == 0) {
                        $("#newPayDate").append(
                            '<label class="form-box">' +
                            '<span class="form-span">' + (i <= 9 ? '0' + i : i) + '、</span>' +
                            '<input type="text" class="form-control" readonly="readonly" value="' + data + '" id="firstPayDate">' +
                            '</label>');
                    } else {
                        $("#newPayDate").append(
                            '<label class="form-box">' +
                            '<span class="form-span">' + (i <= 9 ? '0' + i : i) + '、</span>' +
                            '<input type="text" class="form-control" readonly="readonly" value="' + data + '" >' +
                            '</label>');
                    }
                }
                if (conType == "租赁合同") {
                    if (index == 0) {
                        $("#newPayDate").append(
                            '<label class="form-box">' +
                            '<span class="form-span">' + (i <= 9 ? '0' + i : i) + '、</span>' +
                            '<input type="text" class="form-control" readonly="readonly" value="' + data + '" id="firstPayDate">' +
                            '</label>');
                    } else {
                        $("#newPayDate").append(
                            '<label class="form-box">' +
                            '<span class="form-span">' + (i <= 9 ? '0' + i : i) + '、</span>' +
                            '<input type="text" class="form-control" readonly="readonly" value="' + data + '" >' +
                            '</label>');
                    }
                }
            })
        }
    });
}