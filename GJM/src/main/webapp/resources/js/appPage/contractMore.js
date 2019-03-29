$(function () {
    contractMore();
});

var param = {
    conRenew: {
        title: "合同续约",
        desc: "",
    }
};

/** 初始化*/
function contractMore() {
    contractMore_loadData();
    contractMore_loadEvent();
}

/** 加载数据*/
function contractMore_loadData() {
    $.ajax({
        type: "POST",
        url: "/appPage/queryContractInfo",
        data: {
            con_code: getUrlParam("con_code"),
        },
        dataType: "json"
    }).done(function (result) {
        if (result.code != 200) return;
        // 数据
        var data = result.data;

        // 合同对象
        var contractObject = data.contractObject;
        // 合同主体
        var contractBody = data.contractBody;
        // 合同主体
        var cancelContract = data.cancelContract || "";
        // 房源信息
        var houseInfo = data.houseInfo;
        // 管家信息
        var contractRelaEmps = data.contractRelaEmps;
        // 签约代表
        var contractor = data.contractor;
        // 房源归属
        var positionRecord = data.positionRecord;
        // 客户信息
        var customers = data.customers;
        // 合同照片
        var contractImageList = data.contractImageList || "";
        // 合同订单
        var contractOrder = data.contractOrder;
        // 合同首期账单列表
        var contractBillFirstList = data.contractBillFirstList;
        // 物业交接
        var propertyMain = data.propertyMain;
        // 费用结算
        var statementOrder = data.statementOrder;
        // 增值服务
        var services = data.services;
        // 签名
        var signature = data.signature;

        // 是否托管
        var isTG = contractObject.contractObject_Type == "托管合同";

        // 是否APP
        var isApp = contractObject.contractObject_Source == "PHONE";

        // 合同状态
        var state = contractObject.contractObject_State;
        var _state = returnContractState(state);

        // 合同操作状态
        var optionState = contractObject.contractObject_OptionState;
        var _optionState = returnContractOptionState(optionState);

        // 扩展状态
        var extState = returnContractExtendState(contractObject.contractObject_ExtState);

        // 合同状态
        var html = '';
        html += '<div class="content-btn-box-title" style="text-align: center;display: inline-block;">合同状态：<label class="' + _state.style + '">' + _state.text + '</label></div>';
        html += '<div class="content-btn-box-title" style="text-align: center;display: inline-block;">操作状态：<label class="' + _optionState.color + '">' + _optionState.title + '</label></div>';
        $("[name=conState]").find(".content-btn-box").html(html);

        // 续约
        var _conRenew = $("[name=conRenew]");
        // 改签
        var _conChange = $("[name=conChange]");
        // 解约
        var _conCancel = $("[name=conCancel]");
        // 招租
        var _conForRent = $("[name=conForRent]");
        // 维护
        var _conMaintain = $("[name=conMaintain]");
        // 添置
        var _conAddItem = $("[name=conAddItem]");

        // 租赁合同，隐藏解约申请
        if (!isTG) _conCancel.attr("disabled", "disabled");
        _conRenew.attr("disabled", "disabled");
        _conCancel.attr("disabled", "disabled");
        _conForRent.attr("disabled", "disabled");
        _conMaintain.attr("disabled", "disabled");
        _conAddItem.attr("disabled", "disabled");
        if (isTG) {
            _conForRent.hide();// 隐藏招租
        } else {
            _conCancel.hide();// 隐藏解约
        }

        // 合同状态
        switch (state) {
            case 2:
                _conChange.find(".content-btn-box-desc").html("可改签").addClass("next");
                break;
        }

        // 合同操作状态
        switch (optionState) {
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
                _conAddItem.removeAttr("disabled");// 启用添置
                break;
            case 106:
                _conRenew.removeAttr("disabled");// 启用续约
                _conMaintain.removeAttr("disabled");// 启用维护
                _conAddItem.removeAttr("disabled");// 启用添置

                if (isTG) {
                    _conCancel.removeAttr("disabled");// 启用解约
                    _conRenew.find(".content-btn-box-desc").html("可续约").addClass("next");
                } else {
                    _conForRent.removeAttr("disabled");// 禁用招租
                    _conForRent.find(".content-btn-box-desc").html("可申请").addClass("next");

                    var d = new Date(returnDate(contractObject.contractObject_DeadlineTime));
                    d = d.setFullYear(d.getFullYear(), d.getMonth() - 1, d.getDate());
                    if (d <= new Date().getTime()) {
                        _conRenew.find(".content-btn-box-desc").html("可续约").addClass("next");
                    }
                }
                break;
            case 107:
                _conRenew.attr("disabled", "disabled");// 禁用续约
                _conCancel.attr("disabled", "disabled");// 禁用解约
                _conForRent.attr("disabled", "disabled");// 禁用招租
                break;
            case 201:
                _conRenew.find(".content-btn-box-desc").html("已续约");
                _conMaintain.removeAttr("disabled");// 启用维护
                _conAddItem.removeAttr("disabled");// 启用添置
                break;
            case 202:
                _conChange.attr("disabled", "disabled");
                break;
            default:
                _conForRent.attr("data-mode", "info");
                if ("401,402,403".indexOf(optionState) > -1) {
                    _conCancel.find(".content-btn-box-desc").html(_optionState.title + " - " + cancelContract.cco_state).addClass("next");
                } else {
                    _conForRent.find(".content-btn-box-desc").html(_optionState.title + " - " + cancelContract.cco_state).addClass("next");
                }

                if (optionState <= 303) {
                    _conForRent.removeAttr("disabled");// 启用招租
                } else if (optionState <= 403) {
                    _conCancel.attr("data-mode", "info");
                    _conCancel.removeAttr("disabled");// 启用解约
                } else if (optionState <= 503) {
                    _conForRent.removeAttr("disabled");// 启用招租
                } else if (optionState <= 603) {
                    _conForRent.removeAttr("disabled");// 启用招租
                } else if (optionState <= 703) {
                    _conForRent.removeAttr("disabled");// 启用招租
                } else if (optionState <= 803) {
                    _conForRent.removeAttr("disabled");// 启用招租
                } else if (optionState <= 903) {
                    _conForRent.removeAttr("disabled");// 启用招租
                }
                break;
        }

        // 【续约申请】
        _conRenew.off().on("click", function () {
            // 已续约提示
            if (optionState == 201) {
                return $.hint.tip("该合同已续约", "hint");
            }
            // 非正常状态的合同不能续约
            if (!(state == 2 && optionState == 106)) {
                return $.hint.tip("该合同不能续约", "hint");
            }
            // 租赁只能在解约前一个月内申请续约
            if (!isTG) {
                var d = new Date(returnDate(contractObject.contractObject_DeadlineTime));
                d = d.setFullYear(d.getFullYear(), d.getMonth() - 3, d.getDate());
                if (d > new Date().getTime()) return $.hint.tip("租赁合同提前续约时间不应超过3个月", "hint");
            }
            // 执行JS回调
            var con_type = "托管合同";
            if(!isTG){
                con_type = "租赁合同";
            }
            window.location.href = "/appPage/contractEdit?contract_type="+ (isTG ? "tg" : "zl") +"&con_code="+getQueryString("con_code")+"&mode=renew&con_type="+con_type;
        });

        // 【合同改签】
        _conChange.off().on("click", function () {
            if (optionState == 202) {
                return $.hint.tip("该合同已改签", "hint");
            }
            if (state != 2) {
                return $.hint.tip("该合同不能改签", "hint");
            }
            var con_type = "托管合同";
            if(!isTG){
                con_type = "租赁合同";
            }
            window.location.href = "/appPage/contractEdit?contract_type="+ (isTG ? "tg" : "zl") +"&con_code="+getQueryString("con_code")+"&mode=change&con_type="+con_type;
        });

        // 【解约申请】
        _conCancel.off().on("click", function () {
            $.ajax({
                type: "POST",
                url: "/contractObject/isHouseContractRelease",
                data: {
                    hi_code: contractObject.hi_code,
                },
                dataType: "json"
            }).done(function (result) {
                var tip = '<span class="error" style="font-size: 16px;">该合同不能申请解约</span><p style="line-height: 1.4em;">如果要解约托管合同，需要先处理完毕租赁合同</p>';
                if (result.code != 200 || !result.data) return $.hint.tip(tip, "error");
                window.location.href = "/appPage/cancelContract?mode=auditing&con_code=" + getUrlParam("con_code") + "&em_id=" + getUrlParam("em_id");
            });
        });

        // 【招租申请】
        _conForRent.off().on("click", function () {
            if ($(this).attr("data-mode") == "add") {
                if (!isEmpty(cancelContract.cco_code)) return $.hint.tip("该合同已" + (cancelContract.cco_applicationType == "退租" ? "强退" : cancelContract.cco_applicationType) + "，不能再申请合约", "hint");
                if (state != 2 && optionState != 106) return $.hint.tip("该合同不能合约申请", "hint");
                window.location.href = "/appPage/cancelContract?mode=auditing&con_code=" + getUrlParam("con_code") + "&em_id=" + getUrlParam("em_id");
            } else {
                window.location.href = "/appPage/cancelContractInfo?cco_code=" + getUrlParam("con_code");
            }
        });

        // 【合同维护】
        _conMaintain.off().on("click", function () {
            //OCContractMore.conMaintain();
        });

        // 【物品添置】
        _conAddItem.off().on("click", function () {
            //OCContractMore.conAddItem();
        });

        // 【结算订单】
        $("[name=conForRentList]").off().on("click", function () {
            //OCContractMore.conForRentList(getUrlParam("con_code"));
        });
    });
}

/** 加载事件*/
function contractMore_loadEvent() {

}
