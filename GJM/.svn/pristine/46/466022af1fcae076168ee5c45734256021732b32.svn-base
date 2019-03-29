var customerIndex = 1;
var userIndex = 1;
$(function () {
    $.contract();
});

// 回调参数
function where(where) {
    var json = eval(where);
    // 客户返回
    if (json.type != null && json.type == "customer") {
        $.contract.setCustomerValue(customerIndex, json.cc_code, json.cc_name, json.ccp_phone, json.cc_cardNum);
    } else if (json.type != null && json.type == "em") {
        $.contract.setHousekeeperValue(userIndex, json.em_id, json.em_name, json.em_phone);
    }
}

(function ($) {

    // 定时器
    var timeOut = 0;
    // 图片循环次数
    var updateCount = 0;

    /** 初始化*/
    $.contract = function () {
        $.contract.load_data();
        $.contract.load_event();
    };

    /** 参数*/
    $.contract.param = {
        hi_code: getUrlParam("hi_code"),
        mode: getUrlParam("mode"),
        con_code: getUrlParam("con_code"),
        con_type: $("[name=conType]").val(),
        title: (isEmpty(getUrlParam("hi_code")) ? "编辑合同" : "添加合同"),
        customer_limit: 5,
        cc_code: getUrlParam("cc_code")
    };

    /** 加载数据*/
    $.contract.load_data = function () {
        // 设置标题
        var type = getUrlParam("contract_type") == "tg" ? "托管合同" : "租赁合同";
        var title = "";
        switch ($.contract.param.mode) {
            case "add":
                title = type + " - 添加";
                break;
            case "edit":
                title = type + " - 编辑";
                break;
            case "renew":
                title = type + " - 续约";
                break;
            case "change":
                title = type + " - 改签";
                break;
            case "perfect":
                title = "合同附件";
                break;
        }
        $("title").html(title);

        // 初始化数据
        $.ajax({
            type: "POST",
            url: "/contractObject/queryContractInfo",
            data: {
                con_code: returnValue($.contract.param.con_code),
                hi_code: returnValue($.contract.param.hi_code),
                cc_code: returnValue($.contract.param.cc_code),
                em_id: getUrlParam("em_id")
            },
            dataType: "json",
            beforeSend: function () {
                $.hint.tip("数据加载中...", "loading");
            }
        }).done(function (result) {
            if (result.code != 200) return $.hint.tip(result.msg, "error");
            $.hint.closeTip();

            // 缓存数据
            var data = result.data;
            $.contract.param.data = data;
            $.contract.param.con_type = $("[name=conType]").val() || result.data.contractObject.contractObject_Type;

            switch ($.contract.param.con_type) {
                case '托管合同' :
                    $.contract.loadContractTG(data);
                    break;
                case '租赁合同' :
                    $.contract.loadContractZL(data);
                    break;
            }
        });
    };

    /** 加载托管合同*/
    $.contract.loadContractTG = function (mainData) {
        // 房源数据
        var houseData = mainData.viewLibraryInfo || "";
        // 合同期限字典数据
        var contractLimitList = mainData.contractLimitList;
        // 支付方式类型列表
        var payWayList = mainData.payWayList;
        // 支付方式类型列表
        var payTypeList = mainData.payTypeList;
        // 房屋用途
        var houseUseList = mainData.houseUseList;
        // 合同对象数据
        var contractObject = mainData.contractObject || "";
        // 合同主体数据
        var contractBody = mainData.contractBody || "";
        // 客户数据
        var customers = mainData.customers;
        // 合同管家关系数据
        var contractRelaEmps = mainData.contractRelaEmps;
        // 签约代表
        var contractor = mainData.contractor;
        // 图片
        var contractImageList = mainData.contractImageList;
        // 房东信息
        var customerInfo = mainData.customerInfo || "";

        // --------------------------------------------------

        // 编辑模式
        var isEdit = !isEmpty(contractObject);
        // 续约模式
        var isRenew = "renew" == $.contract.param.mode;
        // 改签模式
        var isChange = "change" == $.contract.param.mode;

        // 【设置公共参数】------------------------

        $.contract.param.con_mode = contractObject.contractObject_Mode;

        // 续约模式
        if (isRenew || isChange) {
            $.contract.param.old_con_code = contractObject.contractObject_Code;
            $.contract.param.old_con_no = contractObject.contractObject_No;
        }

        $(".PC_MODE").hide();

        // 编辑模式
        if (isEdit) {
            // 合同对象ID
            $.contract.param.contractBody_Id = contractBody.contractBody_Id;
            $.contract.param.contractObject_Id = contractObject.contractObject_Id;
            $.contract.param.hi_code = houseData.hi_code;
        }
        $.contract.param.he_address = houseData.he_address;

        // 【初始视图数据】------------------------

        // 合同房源显示
        $("#house-address").html(returnValue(houseData.house_address));
        $("#house-rent").html(returnFloat(houseData.hi_keepMoney) + "元/月");
        $("#he-address").html(returnValue(houseData.he_address));
        $("#house-measure").html(returnFloat(houseData.hi_measure) + "m²");
        $("#house-stw").html(returnNumber(houseData.hi_houseS) + "室" + returnNumber(houseData.hi_houseT) + "厅" + returnNumber(houseData.hi_houseW) + "卫");

        // 客户信息|管家信息
        $.contract.setCurrentHousekeeperValue(getUrlParam("em_id"));
        if (isEdit) {
            $.each(customers, function (index, data) {
                if (index == 0) {
                    $.contract.setCustomerValue(1, data.cc_code, data.cc_name, data.ccp_phone, data.cc_cardNum);
                } else {
                    $.contract.addCustomer();
                    $.contract.setCustomerValue((index + 1), data.cc_code, data.cc_name, data.ccp_phone, data.cc_cardNum);
                }
            });
            $.each(contractRelaEmps, function (index, data) {
                if (index == 0) {
                    $.contract.setHousekeeperValue(1, data.em_id, data.em_name, data.em_phone);
                } else {
                    $.contract.addHousekeeper();
                    $.contract.setHousekeeperValue((index + 1), data.em_id, data.em_name, data.em_phone);
                }
            });
        } else {
            $.contract.setCustomerValue(1, customerInfo.cc_code, customerInfo.cc_name, customerInfo.ccp_phone, customerInfo.cc_cardNum);
            if (!isEmpty(contractor)) {
                $.contract.setHousekeeperValue(1, contractor.em_id, contractor.em_name, contractor.em_phone);
            }
        }

        // 合同期限
        var startDate,
            endDate,
            currentDate = new Date();

        if (isEdit && !isRenew) {
            startDate = returnDate(contractObject.contractObject_Date);
            endDate = returnDate(contractObject.contractObject_DeadlineTime);
        } else {
            startDate = returnDate(currentDate);
            currentDate.setFullYear(currentDate.getFullYear() + 3);
            currentDate.setDate(currentDate.getDate() - 1);
            endDate = returnDate(currentDate);
        }
        $("[name=conStartDate]").val(startDate);
        $("[name=conEndDate]").val(endDate);

        //n-1选项
        // $('#month_1').show();
        if (contractBody.contractBody_ContractMode == 0) {
            $('#month-1').addClass("common-checkbox-checked");
            $('#month_1').removeClass("common-checkbox-checked");
        } else if (contractBody.contractBody_ContractMode == 1) {
            $('#month_1').addClass("common-checkbox-checked");
            $('#month-1').removeClass("common-checkbox-checked");
        }

        // 付款方式
        common.pay_cycle_tg(function (result) {
            $.each(result.data, function (index, data) {
                var html = '';
                html += '<option value="' + data.contractType_Name + '" data-value="' + data.contractType_Value + '" ' + (data.contractType_isOpen == 2 ? "disabled" : "") + '>' + data.contractType_Name + '</option>';
                $("[name=conPayType]").append(html);
            });
            $("[name=conPayType]").val(isEdit ? contractBody.contractBody_PayStyle : '季付');
        });

        // 合作方
        common.pay_way_tg(function (result) {
            $.each(result.data, function (index, data) {
                var html = '';
                html += '<option value="' + data.contractType_Name + '" ' + (data.contractType_isOpen == 2 ? "disabled" : "") + '>' + data.contractType_Name + '</option>';
                $("[name=conMonthPay]").append(html);
            });
            $('[name=conMonthPay]').val(contractBody.contractBody_PayType);
        });

        // 房东年付金融方式
        common.pay_year_tg(function (result) {
            $.each(result.data, function (index, data) {
                var html = '';
                html += '<option value="' + data.contractType_Name + '" ' + (data.contractType_isOpen == 2 ? "disabled" : "") + '>' + data.contractType_Name + '</option>';
                $("[name=conMonthPay]").append(html);
            });
            $('[name=conMonthPay]').val(contractBody.contractBody_PayType);
        });

        // 账单生成方式
        common.bill_way_tg(function (result) {
            $.each(result.data, function (index, data) {
                var html = '';
                html += '<option value="' + returnValue(data.contractType_Code) + '">' + returnValue(data.contractType_Name) + '</option>';
                $('[name=conBillWay]').append(html);
            });
            $('[name=conBillWay]').val(returnNumber(contractBody.contractBody_BillWay));
            if ($("[name=conMonthPay]:checked").val() == "收租宝") {
                $("[name=conBillWay] option[value='2']").attr("disabled", "disabled");
            }
        });

        // 金融机构
        //		$.each(payTypeList, function(index, data) {
        //			$("[name=conMonthPay]").append('<option value="' + returnValue(data.contractType_Name) + '" data-value="' + returnValue(data.contractType_Value) + '">' + returnValue(data.contractType_Name) + '</option>');
        //		});
        if (isEdit) {
            if (contractBody.contractBody_PayStyle == "月付") {
                $("input[name=payType][value=" + contractBody.contractBody_PayType + "]").attr("checked", "checked").parent().addClass("span-checked");
                $("#rentPlus").show();
                $("#contractBody_RentPlus").val(filterUnNumber(contractBody.contractBody_RentPlus));
            } else {
                $("#rentPlus").hide();
            }
        } else {
            if ($("[name=conPayType] option:selected").val() != '月付') {
            }
        }

        // 租金
        var rent = isEdit ? returnFloat(contractBody.contractBody_Rent) : returnFloat(houseData.hi_keepMoney);
        $("[name=conRent]").val(rent);

        // 租金-打包模式
        if (isEdit && contractObject.contractObject_RentFreeMode == 1) {
            $.contract.changeRendMode(contractObject.contractObject_RentFreeMode);
        }

        // 押金 编辑或续约取原合同或上一份合同的押金，且不可更改
        if (isEdit || isRenew) {
            $("[name=conPay]").val(returnFloat(contractBody.contractBody_Pay));
        } else {
            $("[name=conPay]").val(1000);
        }

        if (isEdit) {
            $("[name=conPayType]").val(contractBody.contractBody_PayStyle);
            if (contractBody.contractBody_PayStyle == "年付") {
                $("[name=conMonthPay]").val(contractBody.contractBody_PayType);
                $("[name=payType] option[value=" + contractBody.contractBody_PayType + "]").attr("checked", "checked").parent().addClass("span-checked");
                $("#monthPayType").show();
                $("#rentPlus").show();
                $("#contractBody_RentPlus").val(filterUnNumber(contractBody.contractBody_RentPlus));
            } else {
                $("#monthPayType").hide();
                $("#rentPlus").hide();
            }
        } else {
            $("[name=conMonthPay] option[value=管家婆]").attr("disabled", "disabled");
            if ($("[name=conPayType]").val() != '年付') {
                $("#monthPayType").hide();
            } else {
                $("#monthPayType").show();
            }
        }

        // 定金
        $("[name=conDepslit]").val(returnNumber(isEdit ? contractBody.contractBody_Depslit : 0));

        // 管理费
        $("[name=conService]").val(returnNumber(isEdit ? contractBody.contractBody_Service : 0));

        // 首年免租期
        var hi_rentDay = houseData.hi_rentDay;
        var hi_rentDayArray = new Array([hi_rentDay, 0, 0, 0, 0]);
        // 免租期
        $.contract.extendCostCustom('conFreeDate', isEdit ? (contractBody.contractBody_FreeTime || "").split("|") : (null != hi_rentDay && "" != hi_rentDay && undefined != hi_rentDay) ? hi_rentDayArray : null);

        // 租金递增
        $.contract.extendCostCustom('conIncreasing', isEdit ? (contractBody.contractBody_Increasing || "").split("|") : null);
        $(".switch-button").SwitchButton({
            on: {
                value: "%",
                text: "比例等增(%)",
            },
            off: {
                value: "",
                text: "金额等增(元/月)",
            },
            def: (isEdit ? (contractBody.contractBody_Increasing || "").indexOf("%") == -1 ? "off" : "on" : "off"),
            name: "conIncreasingCustom"
        });

        // 保修费
        $.contract.extendCostCustom('guaranteecost', isEdit ? (contractBody.contractBody_GuaranteeCost || "").split("|") : null);
        // shenhx 20170426 添加选中输入框内所有字体
        $(".extend-item input").on("focus", function () {
            $(this).select();
            // 阻止冒泡事件
            window.event.stopPropagation();
        });

        // 首付租金日期|约定还款日
        $.contract.change_agreeDate();
        if (isEdit && !isRenew) {
            $("[name=conStartPayDate]").val(returnDate(contractBody.contractBody_StartPayTime)).attr({
                "min": startDate,
                "max": endDate,
            });

            $("[name=conAgreeDate] option[value='" + contractBody.contractBody_AgreedRepayTime + "']").attr("selected", "selected");
        } else {
            var _startDate = new Date($("[name=conStartDate]").val());
            var startPayDate = new Date(_startDate.setDate(_startDate.getDate() + parseInt($('#oneConFreeDate').val())))
            $("[name=conStartPayDate]").val(returnDate(startPayDate)).attr({
                "min": startPayDate,
                "max": endDate
            });
        }

        // 其他约定|备注
        if (isEdit && !isRenew) {
            $("[name=conother]").text(returnValue(contractObject.contractObject_Other));
            $("[name=conRemark]").text(returnValue(contractBody.contractBody_Remark));
        } else {
            $("[name=conother]").text("");
            $("[name=conRemark]").text("");
        }

        if (isEdit) {
            $.each(contractImageList, function (index, data) {
                switch (data.ci_type) {
                    case "HTZ":
                        $.appImageUpload.addImage("#image-box-htz", {
                            id: data.ci_id,
                            type: data.ci_type,
                            blob: data.ci_path_real,
                            path: data.ci_path_real,
                            key: data.ci_path,
                        });
                        $("#image-box-htz").show();
                        break;
                    case "WTS":
                        $.appImageUpload.addImage("#image-box-wts", {
                            id: data.ci_id,
                            type: data.ci_type,
                            blob: data.ci_path_real,
                            path: data.ci_path_real,
                            key: data.ci_path,
                        });
                        $("#image-box-wts").show();
                        break;
                    case "FCZ":
                        $.appImageUpload.addImage("#image-box-fcz", {
                            id: data.ci_id,
                            type: data.ci_type,
                            blob: data.ci_path_real,
                            path: data.ci_path_real,
                            key: data.ci_path,
                        });
                        $("#image-box-fcz").show();
                        break;
                }
            });
        }

        if (!isEmpty(contractor)) {

        }

        // 计算：总日期
        $.contract.compute_totalDate();
        // 计算：总租金
        $.contract.compute_totalRent();

        //首年免租期变化
        $('#oneConFreeDate').on('blur', function () {
            var startDate = new Date($("[name=conStartDate]").val());
            var day = $('#oneConFreeDate').val();
            var newDate = DateAdd("d ", parseInt(day), startDate);
            $("[name=conStartPayDate]").val(returnDate(newDate)).attr({
                "min": newDate,
                "max": endDate,
            });
        });

        //免租期方式
        $(document).on('click', '#rent-free .common-check', function () {
            $('#rent-free .common-check').each(function () {
                if ($(this).hasClass('common-checkbox-checked')) {
                    // 改变免租期
                    // btnZdy('conFreeDate');
                    $.contract.extendCostCustom('conFreeDate');
                    // 改变租金递增自定义
                    // btnZdy('conIncreasing');
                    $.contract.extendCostCustom('conIncreasing');
                    // 改变包修费
                    // btnZdy('guaranteecost');
                    $.contract.extendCostCustom('guaranteecost');
                    if ($(this).find('[name=rent]').val() == 1) {
                        var startDate = new Date($("[name=conStartDate]").val());
                        var day = $('#oneConFreeDate').val();
                        var newDate = DateAdd("d ", parseInt(day), startDate);
                        $("[name=conStartPayDate]").val(returnDate(newDate)).attr({
                            "min": newDate,
                            "max": endDate,
                        });
                    }
                }
            });
        });
    };

    /** 加载租赁合同*/
    $.contract.loadContractZL = function (mainData) {
        // 房源数据
        var houseData = mainData.viewLibraryInfo;
        // 托管期限
        var contractTGDate = mainData.contractTGDate;
        // 合同期限字典数据
        var contractLimitList = mainData.contractLimitList;
        // 支付方式类型列表
        var payWayList = mainData.payWayList;
        // 支付方式类型列表
        var payTypeList = mainData.payTypeList;
        // 房屋用途
        var houseUseList = mainData.houseUseList;
        // 合同对象数据
        var contractObject = mainData.contractObject || "";
        // 合同主体数据
        var contractBody = mainData.contractBody || "";
        // 客户数据
        var customers = mainData.customers;
        //
        var contractRelaEmps = mainData.contractRelaEmps;
        // 签约代表
        var contractor = mainData.contractor;
        // 图片
        var contractImageList = mainData.contractImageList;
        // 数据字典-押金支付方式
        var conPayTypeList = mainData.conPayTypeList;

        // --------------------------------------------------

        // 编辑模式
        var isEdit = !isEmpty(contractObject);
        // 续约模式
        var isRenew = "renew" == $.contract.param.mode;
        // 改签模式
        var isChange = "change" == $.contract.param.mode;

        // 【设置公共参数】------------------------

        // 租赁隐藏委托书、房产证图片
        $(".content-tg").hide();

        // 月付
        var outMoney = houseData.hi_price == 0 ? 0 : houseData.hi_price * (1 + 5.0 / 100);
        $("[name='outMoney']").val(returnNumber(outMoney));
        // 季付
        var seasonMoney = houseData.hi_price == 0 ? 0 : houseData.hi_price;
        $("[name='seasonMoney']").val(seasonMoney);
        // 半年付
        var halfYearMoney = houseData.hi_price == 0 ? 0 : houseData.hi_price * (1 - (3.0 / 100));
        $("[name='halfYearMoney']").val(halfYearMoney);
        // 年付
        var yeayMoney = houseData.hi_price == 0 ? 0 : houseData.hi_price * (1 - (5.0 / 100));
        $("[name='yeayMoney']").val(yeayMoney);

        /**
         * 初始化押金支付方式
         */
        if (null != conPayTypeList && undefined != conPayTypeList) {
            $("#conPay_div").html("");
            var html = '<select class="form-control" name="conPayOption" required>';
            for (var i = 0; i < conPayTypeList.length; i++) {
                html += '<option value="' + conPayTypeList[i].dictionary_value + '" data-value="' + conPayTypeList[i].dictionary_value + '"' + (conPayTypeList[i].is_checked == 1 ? "selected" : "") + '>' + conPayTypeList[i].dictionary_name + '</option>';
            }
            html += '</select>';
            $("#conPay_div").html(html);
        }

        // 【设置公共参数】------------------------

        $(".PC_MODE").hide();

        // 续约模式
        if (isRenew || isChange) {
            // 旧合同编号
            $.contract.param.old_con_no = contractObject.contractObject_No;
        }

        // 编辑模式
        if (isEdit) {
            // 合同对象ID
            $.contract.param.contractBody_Id = contractBody.contractBody_Id;
            $.contract.param.contractObject_Id = contractObject.contractObject_Id;
            $.contract.param.hi_code = houseData.hi_code;
        }
        $.contract.param.he_address = houseData.he_address;

        // 月付租金上浮比例
        common.up_ratio_zl(function (result) {
            $.each(result.data, function (index, data) {
                var html = "";
                html += '<option value="' + data.contractType_Name + '" data-value="' + data.contractType_Value + '" ' + (index == 0 ? "selected" : "") + (data.contractType_isOpen == 2 ? "disabled" : "") + '>' + data.contractType_Name + '</option>';
                $("#upRatio").append(html);
            });
            if (isEdit && !isEmpty(contractBody.contractBody_RentPlus)) {
                $("#upRatio").val(contractBody.contractBody_RentPlus);
            }
        });

        // 【初始视图数据】------------------------

        // 合同房源显示
        $("#house-address").html(returnValue(houseData.house_address));
        $("#house-rent").html(returnFloat(houseData.hi_price) + "元/月").css("paddingRight", "0");
        $("[name=house-rent]").val(houseData.hi_price);
        $("#he-address").html(returnValue(houseData.he_address));
        $("#house-measure").html(returnFloat(houseData.hi_measure) + "m²");
        $("#house-stw").html(returnNumber(houseData.hi_houseS) + "室" + returnNumber(houseData.hi_houseT) + "厅" + returnNumber(houseData.hi_houseW) + "卫");
        $("#house-rentLimit").html(returnDate(houseData.contract_beginDate) + " ~ " + returnDate(houseData.contract_expiryDate));

        // 客户信息|管家信息
        $.contract.setCurrentHousekeeperValue(getUrlParam("em_id"));
        if (isEdit) {
            $.each(customers, function (index, data) {
                if (index == 0) {
                    $.contract.setCustomerValue(1, data.cc_code, data.cc_name, data.ccp_phone, data.cc_cardNum);
                } else {
                    $.contract.addCustomer();
                    $.contract.setCustomerValue((index + 1), data.cc_code, data.cc_name, data.ccp_phone, data.cc_cardNum);
                }
            });
            $.each(contractRelaEmps, function (index, data) {
                if (index == 0) {
                    $.contract.setHousekeeperValue(1, data.em_id, data.em_name, data.em_phone);
                } else {
                    $.contract.addHousekeeper();
                    $.contract.setHousekeeperValue((index + 1), data.em_id, data.em_name, data.em_phone);
                }
            });
        } else {
            var data = mainData.zlUserInfo;
            if ($.contract.param.cc_code != null && $.contract.param.cc_code != undefined && $.contract.param.cc_code != "") {
                $.contract.setCustomerValue(1, data.cc_code, data.cc_name, data.ccp_phone, data.cc_cardNum);
            }
            if (!isEmpty(contractor)) {
                $.contract.setHousekeeperValue(1, contractor.em_id, contractor.em_name, contractor.em_phone);
            }
        }

        // 居住人数
        if (isEdit) {
            $("[name=peoNum]").val(returnNumber(contractObject.contractObject_PeopleNumber));
        } else {
            $("[name=peoNum]").val(1);
        }

        // 合同期限
        var startDate, endDate;
        if (isEdit && !isRenew) {
            startDate = returnDate(contractObject.contractObject_Date);
            endDate = returnDate(contractObject.contractObject_DeadlineTime);
        } else {
            var currentDate = new Date();
            startDate = returnDate(currentDate);

            var ymd_data = returnYearMonthDayData(startDate, contractTGDate.endDate);
            var totalMonth = ymd_data.year * 12 + ymd_data.month;
            var remianDay = ymd_data.day;
            if (totalMonth < 12) {
                currentDate.setMonth(currentDate.getMonth() + totalMonth);
                currentDate.setDate(currentDate.getDate() + (remianDay != 0 ? remianDay - 1 : -1));
            } else {
                currentDate.setFullYear(currentDate.getFullYear() + 1);
                currentDate.setDate(currentDate.getDate() - 1);
            }
            endDate = returnDate(currentDate);
        }

        var tg_startDate = new Date(contractTGDate.startDate);
        tg_startDate.setDate(tg_startDate.getDate() - 30);
        $("[name=conStartDate]").val(startDate).attr({
            "min": returnDate(tg_startDate),
            "max": returnDate(contractTGDate.endDate),
        });
        $("[name=conEndDate]").val(endDate).attr({
            "min": returnDate(contractTGDate.startDate),
            "max": returnDate(contractTGDate.endDate),
        });

        // 期限值
        $.contract.compute_totalDate();

        // 房屋用途-初始化数据
        $.each(houseUseList, function (index, data) {
            $("[name=conUse]").append('<option value="' + returnValue(data.contractType_Name) + '" data-value="' + returnValue(data.contractType_Value) + '">' + returnValue(data.contractType_Name) + '</option>');
        });

        // 房屋用途
        if (isEdit) {
            $("[name=conUse] option[value=" + contractBody.contractBody_Use + "]").attr("selected", "selected");
        }

        // 付款方式-初始化数据
        $.each(payWayList, function (index, data) {
            $("[name=conPayType]").append('<option value="' + data.contractType_Name + '" data-value="' + data.contractType_Value + '">' + data.contractType_Name + '</option>');
        });

        // 起始日期
        var startDate = $("[name=conStartDate]").val();
        // 截止日期
        var endDate = $("[name=conEndDate]").val();
        var contractLimit = returnYearMonthDayData(returnDate(startDate), returnDate(endDate));
        var limitYear = contractLimit.year;
        var limitMonth = contractLimit.month;
        if (limitYear <= 0) {
            if (limitMonth < 6) {
                $("[name=conPayType] option[value=年付]").attr("disabled", "disabled");
            }
            if (limitMonth < 3) {
                $("[name=conPayType] option[value=年付]").attr("disabled", "disabled");
                $("[name=conPayType] option[value=半年付]").attr("disabled", "disabled");
            }
            if (limitMonth < 1) {
                $("[name=conPayType] option[value=年付]").attr("disabled", "disabled");
                $("[name=conPayType] option[value=半年付]").attr("disabled", "disabled");
                $("[name=conPayType] option[value=季付]").attr("disabled", "disabled");
            }
            if (limitMonth >= 1) {
                $("[name=conPayType] option[value=季付]").removeAttr("disabled");
            }
            if (limitMonth >= 3) {
                $("[name=conPayType] option[value=半年付]").removeAttr("disabled");
                $("[name=conPayType] option[value=季付]").removeAttr("disabled");
            }
            if (limitMonth >= 6) {
                $("[name=conPayType] option[value=年付]").removeAttr("disabled");
                $("[name=conPayType] option[value=半年付]").removeAttr("disabled");
                $("[name=conPayType] option[value=季付]").removeAttr("disabled");
            }
        } else {
            $("[name=conPayType] option[value=年付]").removeAttr("disabled");
            $("[name=conPayType] option[value=半年付]").removeAttr("disabled");
            $("[name=conPayType] option[value=季付]").removeAttr("disabled");
        }

        // // 金融机构-初始化数据
        // $.each(payTypeList, function (index, data) {
        //     $("[name=conMonthPay]").append('<option value="' + returnValue(data.contractType_Name) + '" data-value="' + returnValue(data.contractType_Value) + '">' + returnValue(data.contractType_Name) + '</option>');
        // });
        // 合作方
        common.pay_way_zl(function (result) {
            $.each(result.data, function (index, data) {
                $("[name=conMonthPay]").append('<option value="' + data.contractType_Name + '" ' + (data.contractType_isOpen == 2 ? "disabled" : "") + '>' + data.contractType_Name + '</option>');
            });
            // $('[name=conMonthPay]').val(contractBody.contractBody_PayType);
        });

        if (isEdit) {
            $("[name=conPayType]").val(contractBody.contractBody_PayStyle);
            if ($("[name=conPayType]").val() == "月付") {
                $("[name=conMonthPay]").val(contractBody.contractBody_PayType);
                $("[name=payType] option[value=" + contractBody.contractBody_PayType + "]").attr("checked", "checked").parent().addClass("span-checked");
                $("#monthPayType").show();
                $("#rentPlus").show();
                $("#contractBody_RentPlus").val(filterUnNumber(contractBody.contractBody_RentPlus));
            } else {
                $("#monthPayType").hide();
                $("#rentPlus").hide();
            }
        } else {
            $("[name=conMonthPay] option[value=管家婆]").attr("disabled", "disabled");
            if ($("[name=conPayType]").val() != '月付') {
                $("#monthPayType").hide();
            } else {
                $("#monthPayType").show();
            }
        }

        // 续约月付也要上浮
        if (isRenew && contractBody.contractBody_PayStyle == "月付") {
            // 租金加成
            var rentPlus = $("#upRatio").is(":hidden") ? returnFloat($("#contractBody_RentPlus").val()) : returnFloat($("#upRatio").val());
            var moneyV = returnNumber($("[name=house-rent]").val() * (1 + returnFloat(rentPlus / 100)));
            $("[name=conRent]").val(moneyV);
            $("#monthPayType").show();
            $("#rentPlus").show();
        }

        // 租金
        var rent = 0;
        if (isEdit) {
            rent = returnFloat(contractBody.contractBody_Rent);
        } else {

            // 根据托管合同日期计算对应租金   2017-05-05未考虑好算法，暂时直接取统一出房价
            //			var money = $.contract.complute_conRent(houseData.pm_outMoney);
            //			pmOutMoney = houseData.pm_outMoney;
            //			$("[name=outMoney]").val(pmOutMoney);
            //			rent = returnFloat("" != money ? money : houseData.hi_money);
            //			$("#house-rent").html(returnFloat(rent) + "元/月");
            rent = houseData.hi_price;
            $("[name=outMoney]").val(houseData.hi_price);
            $("#house-rent").html(returnFloat(houseData.hi_price) + "元/月");
        }
        $("[name=conRent]").val(rent).attr("data-limit", returnFloat(houseData.hi_price));

        // 押金
        if (isEdit) {
            $("[name=conPay]").val(returnFloat(contractBody.contractBody_Pay));
        } else {
            // shenhx 20170409
            var conPayMoney = $.contract.compute_pledgeCase();
            if ("user_defined" != conPayMoney) {

                $("[name=conPay]").val(returnFloat(conPayMoney)).attr("data-cache", returnFloat(conPayMoney));
            } else {

            }

            //			$("[name=conPay]").val(returnFloat(rent * 2)).attr("data-cache", returnFloat(rent * 2));
        }

        // 服务费
        $("[name=conService]").val(returnNumber(isEdit ? contractBody.contractBody_Service : 600));

        // 首付租金日期|约定还款日
        $.contract.change_agreeDate();
        if (isEdit && !isRenew) {
            $("[name=conStartPayDate]").val(returnDate(contractBody.contractBody_StartPayTime)).attr({
                "min": startDate,
                "max": endDate,
            });

            $("[name=conAgreeDate] option[value='" + contractBody.contractBody_AgreedRepayTime + "']").attr("selected", "selected");
        } else {
            $("[name=conStartPayDate]").val(returnDate(startDate)).attr({
                "min": startDate,
                "max": endDate,
            });
        }

        // 其他约定|备注
        if (isEdit && !isRenew) {
            $("[name=conother]").text(returnValue(contractObject.contractObject_Other));
            $("[name=conRemark]").text(returnValue(contractBody.contractBody_Remark));
        } else {
            $("[name=conother]").text("");
            $("[name=conRemark]").text("");
        }

        if (isEdit) {
            $.each(contractImageList, function (index, data) {
                switch (data.ci_type) {
                    case "HTZ":
                        $.appImageUpload.addImage("#image-box-htz", {
                            id: data.ci_id,
                            type: data.ci_type,
                            blob: data.ci_path_real,
                            path: data.ci_path_real,
                            key: data.ci_path,
                        });
                        $("#image-box-htz").show();
                        break;
                }
            });
        }

        // 总租金
        $.contract.compute_totalRent();
    };

    /** 加载事件*/
    $.contract.load_event = function () {

        // 2017.4.20 申洪喜反馈弹窗输入器样式有变
        $(window).resize(function () {
            $(".content-top").css({top: 0});
        });

        // APP:编辑客户信息
        $("[name=cc_edit]").on("click", function () {
            customerIndex = 1;
            window.location.href = "/appPage/customerEdit?cc_code=" + $("[name=cc_info]").data("data").cc_code;
        });

        // 查看服务类型
        $(document).on("click", "[name=service]", function () {
            var box = $(".content-mask");
            if ($(box).is(":hidden")) {
                box.show();
                box.find(".content-mask-main").css("bottom", "0px");
            }

            box.find("[name=contractBillClose]").on("click", function () {
                box.find(".content-mask-main").stop().animate({
                    bottom: "-1000px",
                }, function () {
                    box.fadeOut("fast", function () {
                        box.hide();
                        $('body').css('overflow', 'auto');
                    });
                });
            });

            box.on("click", function () {
                box.find(".content-mask-main").stop().animate({
                    bottom: "-1000px",
                }, function () {
                    box.fadeOut("fast", function () {
                        box.hide();
                        $('body').css('overflow', 'auto');
                    });
                });
            });

        });

        // 查看合同账单
        $(document).on("click", "[name=contractBillView]", function () {
            box.find("[name=contractBillClose]").on("click", function () {
                box.find(".content-mask-main").animate({
                    bottom: "-1000px",
                }, function () {
                    box.fadeOut("fast", function () {
                        box.remove();
                        $('body').css('overflow', 'auto');
                    });
                });
            });

            box.on("click", function () {
                box.find(".content-mask-main").animate({
                    bottom: "-1000px",
                }, function () {
                    box.fadeOut("fast", function () {
                        box.remove();
                        $('body').css('overflow', 'auto');
                    });
                });
            });
        });

        // 合作平台
        $(document).on("change", "[name=conMonthPay]", function () {
            if ($(this).val() == "收租宝") {
                $("[name=conBillWay]").val(1);
                $("[name=conBillWay] option[value='2']").attr("disabled", "disabled");
            } else {
                $("[name=conBillWay] option[value='2']").removeAttr("disabled");
            }
        });

        // 合同期限变化
        $("[name=conStartDate]").on("change", function () {
            // 起始日期
            var startDate = $("[name=conStartDate]").val();
            // 截止日期
            var endDate = $("[name=conEndDate]").val();
            var contractLimit = returnYearMonthDayData(returnDate(startDate), returnDate(endDate));
            var limitYear = contractLimit.year;
            var limitMonth = contractLimit.month;
            var limitDay = contractLimit.day;
            if (limitYear <= 0) {
                if (limitMonth < 6) {
                    $("[name=conPayType] option[value=年付]").attr("disabled", "disabled");
                }
                if (limitMonth < 3) {
                    $("[name=conPayType] option[value=年付]").attr("disabled", "disabled");
                    $("[name=conPayType] option[value=半年付]").attr("disabled", "disabled");
                }
                if (limitMonth < 1) {
                    $("[name=conPayType] option[value=年付]").attr("disabled", "disabled");
                    $("[name=conPayType] option[value=半年付]").attr("disabled", "disabled");
                    $("[name=conPayType] option[value=季付]").attr("disabled", "disabled");
                }
                if (limitMonth >= 1) {
                    $("[name=conPayType] option[value=季付]").removeAttr("disabled");
                }
                if (limitMonth >= 3) {
                    $("[name=conPayType] option[value=半年付]").removeAttr("disabled");
                    $("[name=conPayType] option[value=季付]").removeAttr("disabled");
                }
                if (limitMonth >= 6) {
                    $("[name=conPayType] option[value=年付]").removeAttr("disabled");
                    $("[name=conPayType] option[value=半年付]").removeAttr("disabled");
                    $("[name=conPayType] option[value=季付]").removeAttr("disabled");
                }
            } else {
                $("[name=conPayType] option[value=年付]").removeAttr("disabled");
                $("[name=conPayType] option[value=半年付]").removeAttr("disabled");
                $("[name=conPayType] option[value=季付]").removeAttr("disabled");
            }
            $("[name=conStartPayDate]").val(startDate).attr("min", startDate);
            // 初始化约定还款日
            $.contract.change_agreeDate();
            // 重新计算总租金
            $.contract.compute_totalRent();
        });
        $("[name=conEndDate]").on("change", function () {
            // 起始日期
            var startDate = $("[name=conStartDate]").val();
            // 截止日期
            var endDate = $("[name=conEndDate]").val();
            var contractLimit = returnYearMonthDayData(returnDate(startDate), returnDate(endDate));
            // 改变起止日期差值
            var str=returnBusinessYMD(startDate, endDate);
            if (str.indexOf('月') >-1 || str.indexOf('天')>-1) {
                $('#month_1').show();
            } else {
                $('#month_1').hide();
            }

            var limitYear = contractLimit.year;
            var limitMonth = contractLimit.month;
            if (limitYear <= 0) {
                if (limitMonth < 6) {
                    $("[name=conPayType] option[value=年付]").attr("disabled", "disabled");
                }
                if (limitMonth < 3) {
                    $("[name=conPayType] option[value=年付]").attr("disabled", "disabled");
                    $("[name=conPayType] option[value=半年付]").attr("disabled", "disabled");
                }
                if (limitMonth < 1) {
                    $("[name=conPayType] option[value=年付]").attr("disabled", "disabled");
                    $("[name=conPayType] option[value=半年付]").attr("disabled", "disabled");
                    $("[name=conPayType] option[value=季付]").attr("disabled", "disabled");
                }
                if (limitMonth >= 1) {
                    $("[name=conPayType] option[value=季付]").removeAttr("disabled");
                }
                if (limitMonth >= 3) {
                    $("[name=conPayType] option[value=半年付]").removeAttr("disabled");
                    $("[name=conPayType] option[value=季付]").removeAttr("disabled");
                }
                if (limitMonth >= 6) {
                    $("[name=conPayType] option[value=年付]").removeAttr("disabled");
                    $("[name=conPayType] option[value=半年付]").removeAttr("disabled");
                    $("[name=conPayType] option[value=季付]").removeAttr("disabled");
                }
            } else {
                $("[name=conPayType] option[value=年付]").removeAttr("disabled");
                $("[name=conPayType] option[value=半年付]").removeAttr("disabled");
                $("[name=conPayType] option[value=季付]").removeAttr("disabled");
            }
            // 重新计算总租金
            $.contract.compute_totalRent();
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

        // 添加客户信息
        $("[name=customer-add]").on("click", function () {
            $.contract.addCustomer();
        });

        // 添加管家信息
        $("[name=housekeeper-add]").on("click", function () {
            $.contract.addHousekeeper();
        });

        // 添加增值服务
        $("[name=housekeeper-addService]").on("click", function () {
            $.contract.addService(this);
        });

        // 合同起始日期
        $("[name=conStartDate]").on({
            "focus": function () {
                $(this).attr("max", $("[name=conEndDate]").val());
            },
            "change": function () {
                // 总合同期限
                $.contract.compute_totalDate();
                // 总合同租金
                $.contract.compute_totalRent();
                $.contract.extendCostCustom("conFreeDate");
                $.contract.extendCostCustom("conIncreasing");
                $.contract.extendCostCustom("guaranteecost");

                if ($.contract.param.con_type == "租赁合同") {
                    //					var rent = $.contract.complute_conRent($("[name=outMoney]").val());
                    //					$("[name=conRent]").val(rent);

                    var isShort = $.contract.short_Rent();
                    if (isShort) {

                        // 原始统一出房价
                        var house_rent = $("[name=house-rent]").val();
                        // 计算出房价
                        //						$("#house-rent").html(returnFloat(returnFloat(house_rent)*1.5) + "元/月");
                        // 租金为出房价1.5倍
                        $("[name=conRent]").val(returnFloat(returnFloat(house_rent) * 1.5));
                        // 押金与租金相同
                        $("[name=conPay]").val(returnFloat(returnFloat(house_rent) * 1.5));
                    } else {
                        // 原始统一出房价
                        var house_rent = $("[name=house-rent]").val();
                        // 计算出房价
                        $("#house-rent").html(returnFloat(house_rent) + "元/月");
                        // 租金为出房价
                        $("[name=conRent]").val(returnFloat(house_rent));
                        // 重新計算押金
                        var conPayMoney = $.contract.compute_pledgeCase();
                        if ("user_defined" != conPayMoney) {

                            $("[name=conPay]").val(returnFloat(conPayMoney)).attr("data-cache", returnFloat(conPayMoney));
                        } else {
                            // 自定义输入
                        }
                    }
                }
                // 重新计算总租金
                $.contract.compute_totalRent();
            }
        });

        // 合同截止日期
        $("[name=conEndDate]").on({
            "focus": function () {
                var startDate = $("[name=conStartDate]").val();
                var _startDate = new Date(startDate);
                _startDate.setFullYear(_startDate.getFullYear() + 8);
                _startDate.setDate(_startDate.getDate() - 1);
                $(this).attr({
                    "min": startDate,
                    "max": returnDate(_startDate),
                });
            },
            "change": function () {
                // 总合同期限
                $.contract.compute_totalDate();
                // 总合同租金
                $.contract.compute_totalRent();
                $.contract.extendCostCustom("conFreeDate");
                $.contract.extendCostCustom("conIncreasing");
                $.contract.extendCostCustom("guaranteecost");

                if ($.contract.param.con_type == "租赁合同") {
                    //					var rent = $.contract.complute_conRent($("[name=outMoney]").val());
                    //					$("[name=conRent]").val(rent);

                    // 计算短租期
                    var isShort = $.contract.short_Rent();
                    if (isShort) {

                        // 原始统一出房价
                        var house_rent = $("[name=house-rent]").val();
                        // 计算出房价
                        //						$("#house-rent").html(returnFloat(returnFloat(house_rent)*1.5) + "元/月");
                        // 租金为出房价1.5倍
                        $("[name=conRent]").val(returnFloat(returnFloat(house_rent) * 1.5));
                        // 押金与租金相同
                        $("[name=conPay]").val(returnFloat(returnFloat(house_rent) * 1.5));
                    } else {
                        // 原始统一出房价
                        var house_rent = $("[name=house-rent]").val();
                        // 计算出房价
                        $("#house-rent").html(returnFloat(house_rent) + "元/月");
                        // 租金为出房价倍
                        $("[name=conRent]").val(returnFloat(house_rent));
                        // 重新計算押金
                        var conPayMoney = $.contract.compute_pledgeCase();
                        if ("usCer_defined" != conPayMoney) {

                            $("[name=conPay]").val(returnFloat(conPayMoney)).attr("data-cache", returnFloat(conPayMoney));
                        } else {
                            // 押金自定义输入
                        }
                    }
                    // 重新计算总租金
                    $.contract.compute_totalRent();
                }
            }
        });

        // 租金改变
        $("[name=conRent]").on({
            "input propertychange": function () {
                $.contract.compute_totalRent();
                if ($.contract.param.con_type == "租赁合同") {
                    if (!$.contract.short_Rent()) {

                        // 重新计算押金 shenhx 20170409
                        var conPayMoney = $.contract.compute_pledgeCase();
                        if ("user_defined" != conPayMoney) {
                            var payMoney = $(this).val();
                            if (payMoney < conPayMoney) {
                                $(this).appMsg("租金不能小于统一出房价");
                                $("[name=conPay]").val(returnFloat(conPayMoney)).attr("data-cache", returnFloat(conPayMoney));
                            } else {

                                $("[name=conPay]").val(returnFloat(payMoney)).attr("data-cache", returnFloat(payMoney));
                            }
                        } else {
                            // 押金自定义输入
                        }
                    }
                    var _val = returnFloat($(this).val());
                    var _limit = returnFloat($(this).attr("data-limit"));
                    //					if(_val < _limit){
                    //						$(this).val(_limit);
                    //						$(this).appMsg("租金不能小于统一出房价");
                    //					}
                }
                // 重新计算总租金
                $.contract.compute_totalRent();
            },
            "blur": function () {
                if ($.contract.param.con_type == "租赁合同") {
                    if (!$.contract.short_Rent()) {

                        var conType = $("[name=conPayType]").val();
                        var moneyV;
                        if (conType == "月付") {
                            // 租金加成
                            var rentPlus = $("#upRatio").is(":hidden") ? returnFloat($("#contractBody_RentPlus").val()) : returnFloat($("#upRatio").val());
                            moneyV = returnNumber(returnFloat($("[name=outMoney]").val()) * (1 + returnFloat(rentPlus / 100)));
                        } else if (conType == "季付") {
                            moneyV = returnFloat($("[name=seasonMoney]").val());
                        } else if (conType == "半年付") {
                            moneyV = returnNumber(returnFloat($("[name=halfYearMoney]").val()));
                        } else if (conType == "年付") {
                            moneyV = returnNumber(returnFloat($("[name=yeayMoney]").val()));
                        } else if (conType == "一次性付") {
                            // 起始日期
                            var startDate = $("[name=conStartDate]").val();
                            // 截止日期
                            var endDate = $("[name=conEndDate]").val();
                            var contractLimit = returnYearMonthDayData(returnDate(startDate), returnDate(endDate));
                            var limitYear = contractLimit.year;
                            var limitMonth = contractLimit.month;

                            if (limitYear >= 1) {
                                moneyV = returnNumber(returnFloat($("[name=yeayMoney]").val()));
                            } else if (limitYear < 1 && limitMonth >= 6 && limitMonth < 12) {
                                moneyV = returnNumber(returnFloat($("[name=halfYearMoney]").val()));
                            } else {
                                moneyV = returnNumber($("[name=seasonMoney]").val());
                            }
                        }
                        var rentV = $(this).val();
                        if (returnFloat(rentV) < returnFloat(moneyV)) {
                            $(this).appMsg(conType + "支付方式租金最低为" + moneyV + "元");
                            $(this).val(returnFloat(moneyV)).attr("data-cache", returnFloat(moneyV));
                        } else {
                            $(this).val(returnFloat(rentV)).attr("data-cache", returnFloat(rentV));
                        }

                        // 重新计算押金 shenhx 20170409
                        var conPayMoney = $.contract.compute_pledgeCase();
                        if ("user_defined" != conPayMoney) {
                            var payMoeny = $(this).val();
                            if (payMoeny > conPayMoney) {
                                $("[name=conPay]").val(returnFloat(payMoeny)).attr("data-cache", returnFloat(payMoeny));
                            } else {
                                $("[name=conPay]").val(returnFloat(conPayMoney)).attr("data-cache", returnFloat(conPayMoney));
                            }
                        } else {
                            // 押金自定义输入
                        }
                    } else {
                        var rent = returnFloat($("#house-rent").html());
                        rent = returnFloat(rent * 1.5);
                        var hi_priceM = returnFloat($("#house-rent").html());
                        var curRent = returnFloat($("input[name='conRent']").val());
                        /****** 春节期间暂不校验 *****/
                        var _this = $(this);
                        if (curRent < hi_priceM) {
                            $(".msg-box").remove();
                            var box = $('<div class="msg-box">' + "租金最低应为" + hi_priceM + "元" + '</div>').appendTo(_this.parent()).hide().show("fast");
                            _this.val(hi_priceM);
                            scrollTimer = setTimeout(function () {
                                box.hide("fast", function () {
                                    $(this).remove();
                                });
                            }, 2000);
                        }
                        // if (curRent < rent) {
                        //     $(".msg-box").remove();
                        //     var box = $('<div class="msg-box">' + "租金最低应为" + rent + "元" + '</div>').appendTo(_this.parent()).hide().show("fast");
                        //     _this.val(rent);
                        //     scrollTimer = setTimeout(function () {
                        //         box.hide("fast", function () {
                        //             $(this).remove();
                        //         });
                        //     }, 2000);
                        // } else {
                        //     $(this).val(curRent);
                        //     $("[name=conPay]").val(curRent);
                        //     $(".msg-box").remove();
                        // }
                    }
                    // 重新计算总租金
                    $.contract.compute_totalRent();
                }
            }
        });

        // 支付方式
        $("[name=conPayType]").on("change", function () {
            if (($.contract.param.con_type == "租赁合同" && $(this).val() == "月付") || ($.contract.param.con_type == "托管合同" && $(this).val() == "年付")) {
                $("#monthPayType").show();
                $("#rentPlus").show();
            } else {
                if (!($.contract.param.con_type == "托管合同" && $(this).val() == "年付")) {
                    $("#monthPayType").hide();
                }
                if (!($.contract.param.con_type == "租赁合同" && $(this).val() == "月付")) {
                    $("#rentPlus").hide();
                }
            }
            // 租金模式：打包年付
            if ($.contract.param.con_type == "托管合同") {
                $.contract.changeRendMode();
                $.contract.compute_totalRent();
            }
            if ($.contract.param.con_type == "租赁合同") {
                if (!$.contract.short_Rent()) {
                    // 重新计算租金 shenhx 20170517
                    var conType = $(this).val();
                    var moneyV;
                    if (conType == "月付") {
                        // 租金加成
                        var rentPlus = $("#upRatio").is(":hidden") ? returnFloat($("#contractBody_RentPlus").val()) : returnFloat($("#upRatio").val());
                        moneyV = returnNumber($("[name=outMoney]").val() * (1 + returnFloat(rentPlus / 100)));
                    } else if (conType == "季付") {
                        moneyV = returnNumber($("[name=seasonMoney]").val());
                    } else if (conType == "半年付") {
                        moneyV = returnNumber(returnFloat($("[name=halfYearMoney]").val()));
                    } else if (conType == "年付") {
                        moneyV = returnNumber(returnFloat($("[name=yeayMoney]").val()));
                    } else if (conType == "一次性付") {
                        // 起始日期
                        var startDate = $("[name=conStartDate]").val();
                        // 截止日期
                        var endDate = $("[name=conEndDate]").val();
                        var contractLimit = returnYearMonthDayData(returnDate(startDate), returnDate(endDate));
                        var limitYear = contractLimit.year;
                        var limitMonth = contractLimit.month;

                        if (limitYear >= 1) {
                            moneyV = returnNumber(returnFloat($("[name=yeayMoney]").val()));
                        } else if (limitYear < 1 && limitMonth >= 6 && limitMonth < 12) {
                            moneyV = returnNumber(returnFloat($("[name=halfYearMoney]").val()));
                        } else {
                            moneyV = returnNumber($("[name=seasonMoney]").val());
                        }
                    }
                    //					$("#house-rent").html(moneyV + "元/月");
                    $("[name='conRent']").val(moneyV);

                    // 重新计算押金 shenhx 20170409
                    var conPayMoney = $.contract.compute_pledgeCase();
                    if ("user_defined" != conPayMoney) {

                        $("[name=conPay]").val(returnFloat(conPayMoney)).attr("data-cache", returnFloat(conPayMoney));
                    } else {
                        // 押金自定义输入
                    }
                }

                // 重新计算总租金
                $.contract.compute_totalRent();
            }
        });

        // shenhx 20170409
        // 押金
        $("[name=conPay]").on("blur", function () {
            if ($.contract.param.con_type == "租赁合同") {
                if (getUrlParam("mode") != "renew") {

                    var curConPay = $(this).val();
                    var conPayMoney = $.contract.compute_pledgeCase();
                    var type = $("[name=conPayOption]").val();

                    if (type == "1") {
                        if (curConPay < conPayMoney) {
                            $(this).appMsg("押金最低不能少于" + conPayMoney + "元");
                            $("[name=conPay]").val(returnFloat(conPayMoney)).attr("data-cache", returnFloat(conPayMoney));
                        } else {

                            $("[name=conPay]").val(returnFloat(curConPay)).attr("data-cache", returnFloat(curConPay));
                        }
                    } else if (type == "2") {
                        if (!$.contract.short_Rent()) {

                            var houseType = $("#house-stw").html();
                            var houseS_p = returnNumber(houseType.substring(0, houseType.indexOf("室")));// 户型-
                            var minMoney = 0;
                            if (houseS_p == 1) {
                                minMoney = 2000;
                            } else if (houseS_p == 2) {
                                minMoney = 2500;
                            } else if (houseS_p == 3) {
                                minMoney = 3000;
                            }
                            if (curConPay < minMoney) {
                                $("[name=conPay]").val(returnFloat(conPayMoney)).attr("data-cache", returnFloat(conPayMoney));
                                $(this).appMsg("押金须不低于" + minMoney + "元");
                            }
                        } else {
                            var shortConPay = returnFloat(returnFloat($("[name=house-rent]").val()) * 1.5);
                            if (returnFloat(curConPay) < shortConPay) {
                                $("[name=conRent]").val(returnFloat(shortConPay)).attr("data-cache", returnFloat(shortConPay));
                                $("[name=conPay]").val(returnFloat(shortConPay)).attr("data-cache", returnFloat(shortConPay));
                                $(this).appMsg("押金须不低于" + shortConPay + "元");
                            }
                        }
                    } else if (type == "3") {
                        // 押金自定义
                        if (curConPay < 0) {
                            $(this).appMsg("押金不能为负");
                            $("[name=conPay]").val(returnFloat(conPayMoney)).attr("data-cache", returnFloat(conPayMoney));
                            return;
                        }
                    }
                }
            }
            if ($.contract.param.con_type == "托管合同") {
                var curConPay = $(this).val();
                // if (curConPay > 1000) {
                //     $("[name=conPay]").val(1000).attr("data-cache", returnFloat(1000));
                //     $(this).appMsg("押金不能大于1000元");
                // }
            }
        });

        // 押金支付方式
        $("[name=conPayOption]").on("change", function () {
            if ($.contract.param.con_type == "租赁合同") {
                var type = $(this).val();
                var curConPay = $("[name=conPay]").val();
                var conPayMoney = $.contract.compute_pledgeCase();
                if (type == 1) {
                    $("[name=conPay]").val(returnFloat(conPayMoney)).attr("data-cache", returnFloat(conPayMoney));
                } else if (type == 2) {
                    if (!$.contract.short_Rent()) {

                        var houseType = $("#house-stw").html();
                        var houseS_p = returnNumber(houseType.substring(0, houseType.indexOf("室")));// 户型-
                        var minMoney = 0;
                        if (houseS_p == 1) {
                            minMoney = 2000;
                        } else if (houseS_p == 2) {
                            minMoney = 2500;
                        } else if (houseS_p == 3) {
                            minMoney = 3000;
                        }
                        if (curConPay < minMoney) {
                            $("[name=conPay]").val(returnFloat(conPayMoney)).attr("data-cache", returnFloat(conPayMoney));
                            $(this).appMsg("押金须不低于" + minMoney + "元");
                        }
                    } else {
                        var shortConPay = returnFloat(returnFloat($("[name=house-rent]").val()) * 1.5);
                        if (returnFloat(curConPay) < shortConPay) {
                            $("[name=conRent]").val(returnFloat(shortConPay)).attr("data-cache", returnFloat(shortConPay));
                            $("[name=conPay]").val(returnFloat(shortConPay)).attr("data-cache", returnFloat(shortConPay));
                            $(this).appMsg("押金须不低于" + shortConPay + "元");
                        }
                    }
                } else if (type == 3) {
                    // 押金自定义
                }
                // 重新计算总租金
                $.contract.compute_totalRent();
            }
        });

        // 免租期改变
        $("#conFreeDate input").on("blur", function () {
            if ($.contract.param.con_type == "托管合同") {
                // 重新计算总租金
                $.contract.compute_totalRent();
            }
        });

        // 租金上浮比例
        $("#upRatio").on("change", function () {
            if ("自定义" == $(this).val()) {
                $("#contractBody_RentPlus").show();
                $(this).parent().hide();
            } else {
                // 租金加成
                var rentPlus = $("#upRatio").is(":hidden") ? returnFloat($("#contractBody_RentPlus").val()) : returnFloat($("#upRatio").val());
                var moneyV = returnFloat(returnFloat($("[name=house-rent]").val()) * (1 + returnFloat(rentPlus / 100)));
                $("[name='conRent']").val(moneyV);
                $.contract.compute_totalRent();
            }
        });

        // 自定义上浮比例
        $("#contractBody_RentPlus").on("input propertychange", function () {
            var ratio = $(this).val();
            if (isNaN(ratio)) {
                $(this).appMsg("请输入数字");
                return;
            }
            if (returnFloat(ratio) < 0) {
                $(this).appMsg("请输入大于零的数字");
                return;
            }
            // 租金加成
            var rentPlus = $("#upRatio").is(":hidden") ? returnFloat($("#contractBody_RentPlus").val()) : returnFloat($("#upRatio").val());
            var moneyV = returnFloat(returnFloat($("[name=house-rent]").val()) * (1 + returnFloat(rentPlus / 100)));

            $("[name='conRent']").val(moneyV);
            $.contract.compute_totalRent();
        });

        // 上传完成
        var uploadDone = function (mode, opts, fileData) {
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
        };

        $.appImageUpload({
            id: "[name=imageHTZ]",
            box: "#image-box-htz",
            type: "HTZ",
            limit: 5,
            done: uploadDone,
        });

        // 图片-委托书
        $.appImageUpload({
            id: "[name=imageWTS]",
            box: "#image-box-wts",
            type: "WTS",
            limit: 1,
            done: uploadDone,
        });

        // 图片-房产证
        $.appImageUpload({
            id: "[name=imageFCZ]",
            box: "#image-box-fcz",
            limit: 3,
            type: "FCZ",
            done: uploadDone,
        });

        //n-1 点击事件
        $("#rent-free .common-check").on("click", function () {
            $(this).each(function () {
                if ($(this).hasClass('common-checkbox-checked')) {
                    $(this).removeClass("common-checkbox-checked");
                    $(this).siblings().addClass("common-checkbox-checked");
                } else {
                    $(this).addClass("common-checkbox-checked");
                    $(this).siblings().removeClass("common-checkbox-checked");
                }
            });
        });

        // 图片预览
        mui.previewImage();

        /*
         * 经常用的是通过遍历,重构数组
         *　方法:Array.remove(dx)
         *　功能:删除数组元素.
         *　参数:dx删除元素的下标.
         *　返回:在原数组上修改数组 */
        Array.prototype.remove = function (dx) {
            if (isNaN(dx) || dx > this.length) {
                return false;
            }
            for (var i = 0, n = 0; i < this.length; i++) {
                if (this[i] != this[dx]) {
                    this[n++] = this[i]
                }
            }
            this.length -= 1
        };

        //首年免租期变化
        $('#oneConFreeDate').on('blur', function () {
            var startDate = new Date($("[name=conStartDate]").val());
            var day = $('#oneConFreeDate').val();
            var newDate = DateAdd("d ", parseInt(day), startDate);
            $("[name=conStartPayDate]").val(returnDate(newDate)).attr({
                "min": newDate,
                "max": endDate,
            });
        });
    };

    /** 短租（1-3个月内）计算租金、押金*/
    $.contract.short_Rent = function () {
        // 续约模式不计算是否为短租
        if ("renew" == $.contract.param.mode) {
            return false;
        }
        //		var type = $("[name=conPayOption]").val();
        //		if(type == "1" || type == "3"){
        //			return false;
        //		} else if(type == "2"){
        // 托管合同结束日期距离当前日期小于3个月的，不属于短租期
        var tgDate = $("#house-rentLimit").html();
        if (null != tgDate && tgDate != undefined) {
            var tgDateArray = tgDate.split(" ~ ");
            var tgLimit = returnYearMonthDayData(returnDate(new Date()), returnDate(tgDateArray[1]));
            var limitTgYear = tgLimit.year;
            var limitTgMonth = tgLimit.month;
            var limitTgDay = tgLimit.day;
            if (limitTgYear <= 0 &&
                ((limitTgMonth >= 0 && limitTgMonth < 3) || (limitTgMonth == 3 && limitTgDay <= 0))) {
                return false;
            }
        }

        // 起始日期
        var startDate = $("[name=conStartDate]").val();
        // 截止日期
        var endDate = $("[name=conEndDate]").val();
        var contractLimit = returnYearMonthDayData(returnDate(startDate), returnDate(endDate));
        var limitYear = contractLimit.year;
        var limitMonth = contractLimit.month;
        var limitDay = contractLimit.day;
        if (limitYear <= 0 &&
            ((limitMonth >= 0 && limitMonth < 3) || (limitMonth == 3 && limitDay <= 0))) {
            return true;
        }
        return false;
        //		}
    }

    /** 租赁合同计算租金*/
    $.contract.complute_conRent = function (pmOutMoney) {
        // 出房定价
        var pm_outMoney = pmOutMoney;
        if ("" == pm_outMoney || null == pm_outMoney || undefined == pm_outMoney) {
            return "";
        }
        // 合同起止日期
        var rentLimit = $("#house-rentLimit").html();
        var rentLimitArray = rentLimit.split(" ~ ");
        // 租赁合同开始日期
        var currentDate = new Date(returnDate($("[name=conStartDate]").val()));
        // 计算托管合同起止日期时间差
        var dateJson = returnYearMonthDayData(returnDate(rentLimitArray[0]), returnDate((rentLimitArray[1])));
        var months = dateJson.year * 12 + dateJson.month;
        var rentStr = rentLimitArray[0] + "&";
        var halfYearDate = "";
        for (var i = 0; i < (months / 6 + 1); i++) {
            var date = new Date("" == halfYearDate ? rentLimitArray[0] : halfYearDate);
            halfYearDate = $.contract.halfYearLater(date);
            if (Date.parse(rentLimitArray[1]) >= Date.parse(new Date(halfYearDate))) {

                rentStr += halfYearDate + "&";
            }
        }
        // 拼接合同结束日期
        rentStr += rentLimitArray[1];
        var rentArray = rentStr.split("&");
        var curIndex = -1;

        for (var i = 0; i < rentArray.length; i++) {
            if (Date.parse(currentDate) >= Date.parse(new Date(rentArray[i])) && Date.parse(currentDate) < Date.parse(new Date(rentArray[i + 1]))) {
                curIndex = i / 2;
                break;
            }
        }
        var money = "";
        var outMoneyArray = pm_outMoney.split("-");
        if (outMoneyArray.length == 2) {
            var halfYearLater = $.contract.halfYearLater(new Date(rentLimitArray[0]));
            if (Date.parse(currentDate) >= Date.parse(new Date(rentArray[i]))) {
                money = outMoneyArray[1];
            }
        } else {

            money = outMoneyArray[curIndex];
        }
        return money;
    }

    /** 计算半年后的日期*/
    $.contract.halfYearLater = function (date) {
        var date = new Date(date);
        date.setMonth(date.getMonth() + 6);
        var yy1 = date.getFullYear();
        var mm1 = date.getMonth() + 1;//因为getMonth（）返回值是 0（一月） 到 11（十二月） 之间的一个整数。所以要给其加1
        var dd1 = date.getDate();
        if (mm1 < 10) {
            mm1 = '0' + mm1;
        }
        if (dd1 < 10) {
            dd1 = '0' + dd1;
        }
        return (yy1 + '-' + mm1 + '-' + dd1);
    }

    /** 合同-约定还款日*/
    $.contract.change_agreeDate = function () {
        // 起始日期
        var startDate = returnDate($("[name=conStartDate]").val());
        // 截止日期
        var endDate = returnDate($("[name=conEndDate]").val());
        // 付款类型
        var conPayType = $("[name=conPayType] option:selected").val();
        // 循环期数
        var cycle = 0;
        switch (conPayType) {
            case "月付":
                cycle = 7;
                break;
            default:
                cycle = 15;
                break;
        }
        $("[name=conAgreeDate]").empty();
        if ($("[name=conType]").val() == '托管合同') {
            var oldDate = new Date(startDate);
            oldDate = new Date(oldDate.setDate(oldDate.getDate()));
            var html = '';
            html += '<option value="' + 0 + '" data-value="' + 1 + '">' + "免租期后还款" + '</option>'
            $("[name=conAgreeDate]").append(html);
        } else {
            for (var i = 0; i <= cycle; i++) {
                var oldDate = new Date(startDate);
                oldDate = new Date(oldDate.setDate(oldDate.getDate() - i));
                $("[name=conAgreeDate]").append('<option value="' + oldDate.getDate() + '" data-value="' + (0 - i) + '">' + (i == 0 ? "当日" : ('提前' + i + '日')) + '还款</option>');
            }
        }

    };

    /** 计算总日期*/
    $.contract.compute_totalDate = function () {
        // 起始日期
        var startDate = $("[name=conStartDate]").val();
        // 截止日期
        var endDate = $("[name=conEndDate]").val();
        if (isEmpty(startDate) || isEmpty(endDate)) {
            $("#conTotalDate").empty();
            return;
        }
        if (new Date(startDate).getTime() > new Date(endDate).getTime()) {
            $("#conTotalDate").empty();
            return;
        }

        $("#conTotalDate").html('<span class="font-money">' + returnBusinessYMD(returnDate(startDate), returnDate(endDate)) + '</span>');
    };

    /** 额外费用自定义*/
    $.contract.extendCostCustom = function (param, init) {
        var _box = $("#" + param);
        // 起始日期
        var startDate = $("[name=conStartDate]").val();
        // 截止日期
        var endDate = $("[name=conEndDate]").val();
        var ymd = returnYearMonthDayData(returnDate(startDate), returnDate(endDate));
        // var limit = ymd.year + (ymd.month > 0 || ymd.day > 0 ? 1 : 0);
        var limit = '';
        $('#rent-free .common-check').each(function () {
            if ($(this).hasClass('common-checkbox-checked')) {
                if ($(this).find('[name=rent]').val() == 0) {
                    limit = ymd.year + (ymd.month > 0 || ymd.day > 0 ? 1 : 0);
                } else {
                    limit = ymd.year;
                }
            }
        });
        var value = [];
        switch (param) {
            case "conFreeDate":
                // 免租期
                if (!isEmpty(init)) {
                    for (var i = 0; i < limit; i++) {
                        value[i] = init[i];
                    }
                } else {
                    value = [30, 30, 30, 30, 30];
                }
                break;
            case "conIncreasing":
                // 租金递增
                if (!isEmpty(init)) {
                    for (var i = 0; i < limit; i++) {
                        if (i <= (init.length - 1)) {
                            value[i] = returnNumber(filterUnNumber(init[i]));
                        } else {
                            value[i] = 0;
                        }
                    }
                } else {
                    value = [0, 0, 0, 0, 0];
                }
                break;
            case "guaranteecost":
                // 包修费
                if (!isEmpty(init)) {
                    for (var i = 0; i < limit; i++) {
                        if (i <= (init.length - 1)) {
                            value[i] = returnNumber(filterUnNumber(init[i]));
                        } else {
                            value[i] = 0;
                        }
                    }
                } else {
                    value = [300, 300, 300, 0, 0];
                }
                break;
        }
        if (!isEmpty(init)) {
            _box.empty();
        }
        var currentCount = _box.find(".extend-item").length;
        if (limit > currentCount) {
            for (var i = currentCount; i < limit; i++) {
                var property = "conIncreasing" == param && i == 0 ? "disabled" : "";
                _box.append('<div class="extend-item"><input type="number" id="oneConFreeDate" class="form-control" value="' + returnNumber(!isEmpty(init) ? value[i] : 0) + '" max="3" ' + property + '></div>');
            }
        } else {
            _box.find('.extend-item:gt(' + (limit - 1) + ')').remove();
        }
        _box.find(".extend-item").each(function (index) {
            $(this).attr("data-index", "第" + (index + 1) + "年")
            $(this).find("input").css({textAlign: (limit != 1 ? "center" : "left")});
        });
    };

    /** 改变租金模式*/
    $.contract.changeRendMode = function (mode) {
        var check = $("[name=conPayType]");
        var conRent = $("[name=conRent]");

        if (mode == 1) {
            check.val("打包年付");
        }
        if (check.val() == "打包年付") {
            conRent.attr("placeholder", "打包租金");
            // 初始化提示内容
            $("#rent-unit").html('租金(<span class="error">元/年</span>)');
        } else {
            conRent.attr("placeholder", "租金");
            // 初始化提示内容
            $("#rent-unit").html("租金(元/月)");
        }
    };

    /**定金算法:日租金 * 2 * 天数 去掉小数点 个位数抹掉 十位数小于5大于0整为5 大于五进一位十位数为0*/
    $.contract.moneys = function (money) {
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
        return money;
    };

    /** 计算押金 */
    $.contract.compute_pledgeCase = function () {

        var houseType = $("#house-stw").html();
        var houseS_p = returnNumber(houseType.substring(0, houseType.indexOf("室")));// 户型-室数
        var payType_p = $("[name=conPayType]").val();// 付款方式
        var conPayMoney = 0;// 押金
        var type = $("[name=conPayOption]").val();// 押金支付类型
        var rent = $("#house-rent").html();
        rent = returnFloat(rent.substring(0, rent.indexOf("元/月")).trim()); // 统一出房价
        var conRent = $("[name=conRent]").val();// 当前租金
        if (type == "1") {
            //			$("[name=conRent]").val(rent.substring(0, rent.indexOf("元/月")).trim());
            /*
             * 添加活动规则查询
             * 查询数据字典
             * 1-押一月租金，
             * 2-正常缴纳，
             * 3-自定义
             */
            conPayMoney = returnFloat($("[name=conRent]").val());
        } else if (type == "2") {

            /*
             * shenhx 20170409  更改押金计算方式
             * 计算规则及事项：
             * 	1、月付押2倍租金，其余支付方式1.5倍
             * 	2、一房押金须大于等于2000，不足则取最低值2000元
             *  3、两房押金须大于等于2500，不足则取最低值2500元
             *  4、三房及以上押金须大于等于3000，不足则取最低值3000元
             *  5、当租金或支付方式变化时，押金也应相应更新
             *
             */
            conPayMoney = payType_p == '月付' ? conRent * 2 : conRent * 1.5;
            if (houseS_p == 1) {
                conPayMoney = conPayMoney >= 2000 ? conPayMoney : 2000;
            } else if (houseS_p == 2) {
                conPayMoney = conPayMoney >= 2500 ? conPayMoney : 2500;
            } else if (houseS_p >= 3) {
                conPayMoney = conPayMoney >= 3000 ? conPayMoney : 3000;
            }
        } else if (type == "3") {
            return "user_defined";// 自定义
        }
        return conPayMoney;
    };

    /** 计算总租金*/
    $.contract.compute_totalRent = function () {
        // 起始日期
        var startDate = $("[name=conStartDate]").val();
        // 截止日期
        var endDate = $("[name=conEndDate]").val();
        if (isEmpty(startDate) || isEmpty(endDate)) {
            $("#conTotalRent").empty();
            return;
        }
        if (new Date(startDate).getTime() > new Date(endDate).getTime()) {
            $("#conTotalRent").empty();
            return;
        }
        // 租金
        var rent = returnFloat($("[name=conRent]").val());
        // 租金加成
        var rentPlus = $("#upRatio").is(":hidden") ? returnFloat($("#contractBody_RentPlus").val()) : returnFloat($("#upRatio").val());
        // 付款类型
        var conPayType = $("[name=conPayType] option:selected").val();
        // 月付有租金加成
        if (conPayType == "月付") {
            rent = rent * (1 + (rentPlus / 100));
        }
        // 打包年付
        if (conPayType == "打包年付") {
            rent = rent / 12;
        }
        // 计算总租金
        var ymd = returnYearMonthDayData(returnDate(startDate), returnDate(endDate));
        if ($.contract.param.con_type == "托管合同") {
            var freeDate = 0;
            $("#conFreeDate input").each(function () {
                freeDate += returnNumber($(this).val());
            });
            $("#conTotalRent").html('<span class="font-money">' + returnFloat((ymd.year * 12 + ymd.month) * rent + (rent / 30 * ymd.day) - (rent / 30 * freeDate)) + '元</span>');
        } else {

            $("#conTotalRent").html('<span class="font-money">' + returnFloat((ymd.year * 12 + ymd.month) * rent + (rent / 30 * ymd.day)) + '元</span>');
        }
    };

    /** 添加客户*/
    $.contract.addCustomer = function () {
        var parent = $("[name=customer-add]").parents(".content-item");
        var len = parent.find("[name=cc_info]").length;

        var html = '';
        html += '<div class="item-content" style="padding-top: 10px;padding-right:0">';
        html += '	<div class="item-content-prefix">副</div>';
        html += '	<input class="form-control" name="cc_info" data-type="' + (len + 1) + '" placeholder="请选择" onclick="$.contract.customerClick(' + (len + 1) + ')" style="border-radius: 0 3px 3px 0;" readonly required>';
        html += '	<button name="cc_remove" class="iten-content-suffix error"><i class="fa-minus-circle"></i></button>';
        html += '</div>';
        $(html).appendTo(parent).find("[name=cc_remove]").on("click", function () {
            $(this).parents(".item-content").remove();
        });
    };

    /** 选择客户 **/
    $.contract.customerClick = function (index) {
        customerIndex = index;
        window.location.href = "/appPage/customerSearch";
    }

    /** 添加增值服务 **/
    $.contract.addService = function (ids) {
        var option = "";
        var _parent = $(ids).parent().parent().parent().parent();
        var array = new Array();
        var list = ["小件搬家", "宽带", "包月清洁", "单次清洁", "清洗服务"]
        $(_parent).find(".change-angle select").each(function (i) {
            array.push($(this).val());
        });
        for (var i = 0; i < list.length; i++) {
            for (var k = 0; k < array.length; k++) {
                if (list[i] == array[k]) {
                    list.remove(i);
                }
            }
        }
        for (var i = 0; i < list.length; i++) {
            option += "<option value='" + list[i] + "'>" + list[i] + "</option>";
        }
        var html = '';
        html += '<div class="item-content" style="margin-bottom: 10px;">';
        html += '	<label class="change-angle">';
        html += '		<select class="form-control" required><option>请选择</option>' + option + '</select>';
        html += '	</label>';
        html += '	<button name="housekeeper_remove" class="iten-content-suffix error"><i class="fa-minus-circle"></i></button>';
        html += '</div>';
        $(ids).parent().parent().parent().append(html);
        $(ids).parent().parent().parent().find("[name=housekeeper_remove]").on("click", function () {
            $("[name=housekeeper-add]").removeAttr("disabled").addClass("ok").removeClass("disabled");
            $(this).parents(".item-content").remove();
            $(ids).parent().parent().parent().find(".item-content").each(function () {
                $(this).find("[name=housekeeper_perforSplit]").val(100 / parent.find(".item-content").length);
            });
        });
    }

    /** 添加管家*/
    $.contract.addHousekeeper = function () {
        var parent = $("[name=housekeeper-add]").parents(".content-item");
        var len = parent.find("[name=housekeeper_info]").length;
        $("[name=housekeeper-add]").attr("disabled", "disabled").addClass("disabled");

        var html = '';
        html += '<div class="item-content" style="padding-top: 10px;padding-right: 0;">';
        html += '	<div class="item-content-prefix">副</div>';
        html += '	<input class="form-control" name="housekeeper_info" data-type="' + (len + 1) + '" placeholder="请选择副管家" onclick="$.contract.clickChooseHousekeeper(' + (len + 1) + ')" style="border-radius: 0 3px 3px 0;" readonly required>';
        html += '	<input class="form-control" name="housekeeper_perforSplit" value="50" placeholder="业绩分成" style="border-radius: 3px 0 0 3px;width: 40px;margin-left: 10px;">';
        html += '	<button name="housekeeper_remove" class="iten-content-suffix error"><i class="fa-minus-circle"></i></button>';
        html += '</div>';
        $(html).appendTo(parent).find("[name=housekeeper_remove]").on("click", function () {
            $("[name=housekeeper-add]").removeAttr("disabled").addClass("ok").removeClass("disabled");
            $(this).parents(".item-content").remove();
            parent.find(".item-content").each(function () {
                $(this).find("[name=housekeeper_perforSplit]").val(100 / parent.find(".item-content").length);
            });
        });
        parent.find(".item-content").each(function () {
            $(this).find("[name=housekeeper_perforSplit]").val(100 / parent.find(".item-content").length);
        });
    };

    /** 合同保存*/
    $.contract.save = function () {
        var boo = true;
        $(".form-control[required]:visible").each(function () {
            if (isEmpty($(this).val())) {
                $(this).appMsg("不能为空", false);
                return boo = false;
            }
        });
        if (!boo) return;

        var cc_info_data = $("[name=cc_info][data-type='1']").data("data") || "";

        if (isEmpty(cc_info_data.ccp_phone)) {
            $("[name=cc_edit]").appMsg("请完善客户手机号");
            return;
        }
        if (isEmpty(cc_info_data.cc_cardNum)) {
            $("[name=cc_edit]").appMsg("请完善客户证件号");
            return;
        }

        if (returnFloat($("[name=conRent]").val()) <= 0) {
            return $.hint.tip("租金不能为0，请确认后提交", "error");
        }

        var data = {};
        var contractObject = {};
        var contractBody = {};
        if ($.contract.param.con_type == "托管合同") {
            // 【合同对象】
            contractObject.contractObject_Id = returnValue($.contract.param.contractObject_Id);
            contractObject.contractObject_Type = $.contract.param.con_type;
            contractObject.hi_code = $.contract.param.hi_code;
            contractObject.contractObject_Date = $("[name=conStartDate]").val();
            contractObject.contractObject_DeadlineTime = $("[name=conEndDate]").val();
            contractObject.contractObject_1st = $("[name=cc_info][data-type='1']").data("data").cc_code;
            contractObject.contractObject_Other = $("[name=conother]").val().trim();
            contractObject.contractObject_Successor = returnNumber($.contract.param.old_con_id);
            contractObject.contractObject_Contractor = $.contract.param.currentHousekeeper;
            contractObject.contractObject_RentFreeMode = $("[name=conPayType]").val() == "打包年付" ? 1 : 0;
            data.contractObject = JSON.stringify(contractObject);

            // 【合同主体】
            contractBody.contractBody_Id = $.contract.param.contractBody_Id;
            contractBody.contractBody_Use = $("[name=conUse]").val();
            contractBody.contractBody_StartTOEnd = $("[name=conStartDate]").val() + "~" + $("[name=conEndDate]").val();
            contractBody.contractBody_Rent = $("[name=conRent]").val();
            contractBody.contractBody_Depslit = $("[name=conDepslit]").val();
            contractBody.contractBody_Pay = returnNumber($("[name=conPay]").val());
            contractBody.contractBody_Service = $("[name=conService]").val();
            contractBody.contractBody_PayStyle = $("[name=conPayType]").val();
            if ($.contract.param.con_type == "托管合同" && contractBody.contractBody_PayStyle == "年付") {//(contractBody.contractBody_PayStyle == "月付" || contractBody.contractBody_PayStyle == "季付")
                contractBody.contractBody_PayType = $("[name=conMonthPay]").val();
            }
            if ($.contract.param.con_type == "租赁合同" && contractBody.contractBody_PayStyle == "月付") {
                contractBody.contractBody_PayType = $("[name=conMonthPay]").val();
            }
            contractBody.contractBody_PayType = isEmpty(contractBody.contractBody_PayType) ? "管家婆" : contractBody.contractBody_PayType;
            contractBody.contractBody_StartPayTime = $("[name=conStartPayDate]").val();
            contractBody.contractBody_AgreedRepayTime = $("[name=conAgreeDate] option:selected").val();
            contractBody.contractBody_Remark = $("[name=conRemark]").val();
            // contractBody.contractBody_BillWay = $("[name=conBillWay]").val();// 账单生成方式

            // 免租期
            var _conFreeDate = "";
            var _findList = $("#conFreeDate").find(".form-control");
            _findList.each(function (index) {
                _conFreeDate += returnNumber($(this).val()) + (_findList.length == (index + 1) ? "" : "|");
            });
            contractBody.contractBody_FreeTime = _conFreeDate;

            //合同模式 0:n-1;1:n+1
            var ContractBody_ContractMode = '';
            $('#rent-free .common-check').each(function () {
                if ($(this).hasClass('common-checkbox-checked')) {
                    ContractBody_ContractMode = $(this).find('[name=rent]').val();
                }
            });
            contractBody.ContractBody_ContractMode = ContractBody_ContractMode;

            // 租金递增
            var _conIncreasing = "";
            var _findList = $("#conIncreasing").find(".form-control");
            _findList.each(function (index) {
                _conIncreasing += returnFloat($(this).val()) + $("[name=conIncreasingCustom]").val() + (index == (_findList.length - 1) ? "" : "|");
            });
            contractBody.contractBody_Increasing = _conIncreasing;

            // 包修费
            var _guaranteecost = "";
            var _findList = $("#guaranteecost").find(".form-control");
            _findList.each(function (index) {
                _guaranteecost += _findList.length == (index + 1) ? (returnNumber($(this).val()) > 0 ? returnNumber($(this).val()) : "0") : returnNumber($(this).val()) + "|";
            });
            contractBody.contractBody_guaranteecost = _guaranteecost;
            data.contractBody = JSON.stringify(contractBody);
        }
        if ($.contract.param.con_type == "租赁合同") {
            // 【合同对象】
            contractObject.contractObject_Id = returnValue($.contract.param.contractObject_Id);
            contractObject.contractObject_Type = $.contract.param.con_type;
            contractObject.hi_code = $.contract.param.hi_code;
            contractObject.contractObject_Date = $("[name=conStartDate]").val();
            contractObject.contractObject_DeadlineTime = $("[name=conEndDate]").val();
            contractObject.contractObject_1st = $("[name=cc_info][data-type='1']").data("data").cc_code;
            contractObject.contractObject_Other = $("[name=conother]").val();
            contractObject.contractObject_Successor = returnNumber($.contract.param.old_con_id);
            contractObject.contractObject_Contractor = $.contract.param.currentHousekeeper;
            contractObject.contractObject_PeopleNumber = $("[name=peoNum]").val();
            data.contractObject = JSON.stringify(contractObject);

            // 【合同主体】
            contractBody.contractBody_Id = $.contract.param.contractBody_Id;
            contractBody.contractBody_Use = $("[name=conUse]").val();
            contractBody.contractBody_StartTOEnd = $("[name=conStartDate]").val() + "~" + $("[name=conEndDate]").val();
            contractBody.contractBody_Rent = $("[name=conRent]").val();
            contractBody.contractBody_Pay = returnNumber($("[name=conPay]").val());
            contractBody.contractBody_Service = $("[name=conService]").val();
            contractBody.contractBody_PayStyle = $("[name=conPayType]").val();
            contractBody.contractBody_PayType = contractBody.contractBody_PayStyle == "月付" ? $("[name=conMonthPay]").val() : "管家婆";
            contractBody.contractBody_StartPayTime = $("[name=conStartPayDate]").val();
            contractBody.contractBody_AgreedRepayTime = $("[name=conAgreeDate]").val();
            contractBody.contractBody_Remark = $("[name=conRemark]").val();
            data.contractBody = JSON.stringify(contractBody);
        }

        // 【合同管家关系数据】
        var employeeList = [];
        var perfor_total = 0;
        $("[name=housekeeper_info]").each(function () {
            var employee = {};
            employee.em_id = returnNumber($(this).attr("data-id"));
            employee.cre_role = returnNumber($(this).attr("data-type"));
            employee.contract_perforSplit = returnFloat($(this).next("[name=housekeeper_perforSplit]").val());
            employeeList.push(employee);

            perfor_total += returnFloat(employee.contract_perforSplit);
        });
        if (perfor_total != 100) return $.hint.tip("管家业绩分成总和必须是100%", "error");
        data.employeeList = JSON.stringify(employeeList);

        // 【合同客户关系数据】
        var customerInfos = [];
        $("[name=cc_info]").each(function () {
            var customerInfo = {};
            customerInfo.cc_code = $(this).data("data").cc_code;
            customerInfo.crc_role = returnNumber($(this).attr("data-type")) == 1 ? 0 : 1;
            customerInfos.push(customerInfo);
        });
        data.customers = JSON.stringify(customerInfos);

        // 【合同图片数据】
        if ($(".image-box-item").length > 0) {
            var contractImages = [];
            $(".image-box-item").each(function () {
                var data = $(this).data("data");
                var contractImage = {};
                contractImage.id = data.id;
                contractImage.ci_type = data.type;
                contractImage.ci_path = data.key;
                if (isEmpty(data.key)) {
                    $.hint.tip(updateCount < 5 ? '图片上传中...' : '图片上传中，网络有点慢，请耐心等待', 'loading');
                    clearTimeout(timeOut);
                    timeOut = setTimeout(function () {
                        $.contract.save();
                    }, 1000);
                    updateCount++;
                    return boo = false;
                }
                contractImages.push(contractImage);
            });
            data.contractImages = JSON.stringify(contractImages);
        }

        // 合同编号
        data.old_contractObject_No = returnValue($.contract.param.old_con_no);
        // 合同编号
        data.old_con_code = returnValue($.contract.param.old_con_code);
        // 当前管家
        data.currentHousekeeper = $.contract.param.currentHousekeeper;
        // 来源
        data.source = "app";
        // 模式
        data.mode = $.contract.param.mode;
        data.em_id = getUrlParam("em_id");

        var dtd = $.Deferred();
        if (!isEmpty(contractObject.contractObject_Other)) {
            $.hint.confirm("包含有其他约定，需要审核后才能继续。<br>确认提交约定审核吗？", function (box, boo) {
                if (boo) {
                    dtd.resolve(); // 完成
                } else {
                    dtd.reject(); // 拒绝
                }
            });
        } else {
            dtd.resolve();
        }

        // 提交数据
        $.when(dtd).done(function () {
            $.ajax({
                type: "POST",
                url: "/appPage/contractSave",
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                    $.hint.tip("保存中..", "loading");
                    $("[name=conSave]").attr("disabled", "disabled");
                }
            }).done(function (result) {
                if (result.code != 200) return $.hint.tip(result.msg, "error");
                var data = result.data;
                $.hint.tip("保存成功", "success", 2000, function () {
                    if (getUrlParam("mode") == "edit") {
                        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                            window.webkit.messageHandlers.goBackRefresh.postMessage([]);
                        } else if (/(Android)/i.test(navigator.userAgent)) {
                            webview.goBackRefresh();
                        }
                    } else {
                        window.location.href = "/appPage/contractInfo?con_code=" + data.contractObject_Code + "&em_id=" + getUrlParam("em_id") + "&operation=true";
                    }
                });
            }).fail(function () {
                $.hint.tip("数据提交失败，请重试或联系管理员", "error");
            }).always(function () {
                $("[name=conSave]").removeAttr("disabled");
            });
        });
    };

    /** 完善保存*/
    $.contract.savePerfect = function () {
        var boo = true;
        $(".form-control[required]:visible").each(function () {
            if (isEmpty($(this).val())) {
                $(this).appMsg("不能为空", false);
                return boo = false;
            }
        });
        if (!boo) return;

        var data = {};

        // 【合同对象】
        var contractObject = {};
        contractObject.contractObject_Code = getUrlParam("con_code");
        data.contractObject = JSON.stringify(contractObject);

        // 【合同主体】
        var contractBody = {};
        contractBody.contractBody_Id = $.contract.param.contractBody_Id;
        if ($.contract.param.con_type == "租赁合同") {
            contractBody.contractBody_PayType = $("[name=conPayType]").val() == "月付" ? $("[name=conMonthPay]").val() : "管家婆";
        }
        contractBody.contractBody_Remark = $("[name=conRemark]").val();
        data.contractBody = JSON.stringify(contractBody);

        // 【合同图片数据】
        // if ($("[name=imageWTS]").is(":visible") && $("#image-box-wts").find(".image-box-item").length == 0) {
        //     $("[name=imageWTS]").appMsg("请上传委托书");
        //     return;
        // }
        // if ($("[name=imageFCZ]").is(":visible") && $("#image-box-fcz").find(".image-box-item").length == 0) {
        //     $("[name=imageFCZ]").appMsg("请上传房产证");
        //     return;
        // }
        // 阈值
        var boo = true;
        var contractImages = [];
        $(".image-box-item").each(function () {
            var data = $(this).data("data");
            var contractImage = {};
            contractImage.id = data.id;
            contractImage.ci_type = data.type;
            contractImage.ci_path = data.key;
            if (isEmpty(data.key)) {
                $.hint.tip(updateCount < 5 ? '图片上传中...' : '图片上传中，网络有点慢，请耐心等待', 'loading');
                clearTimeout(timeOut);
                timeOut = setTimeout(function () {
                    $.contract.savePerfect();
                }, 1000);
                updateCount++;
                return boo = false;
            }
            contractImages.push(contractImage);
        });
        data.contractImages = JSON.stringify(contractImages);
        // 模式
        data.mode = "perfect";
        if (!boo) return;

        // 提交数据
        $.ajax({
            type: "POST",
            url: "/appPage/contractSave",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $.hint.tip('数据保存中..', 'loading');
                $("[name=conSave]").attr("disabled", "disabled");
            }
        }).done(function (result) {
            if (result.code != 200) return $.hint.tip(result.msg, "error");
            var data = result.data;
            $.hint.tip("保存成功", "success", 2000, function () {
                if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                    window.webkit.messageHandlers.goBackRefresh.postMessage([]);
                } else if (/(Android)/i.test(navigator.userAgent)) {
                    webview.goBackRefresh();
                }
            });
        }).fail(function () {
            $.hint.tip("数据提交失败，请重试或联系管理员", "error");
        }).always(function () {
            $("[name=conSave]").removeAttr("disabled");
        });
    };

    /**
     * APP:设置客户数据
     *
     * @param type
     * @param cc_id
     * @param cc_code
     * @param cc_name
     * @param ccp_phone
     * @param cc_cardNum
     */
    $.contract.setCustomerValue = function (type, cc_code, cc_name, ccp_phone, cc_cardNum) {
        var box = $("[name=cc_info][data-type=" + type + "]");
        var boo = true;
        $("[name=cc_info]").each(function () {
            if (returnNumber($(this).attr("data-code")) == cc_code && returnNumber(box.attr("data-code")) != cc_code) {
                $(this).appMsg("该客户已存在，不能重复选择");
                box.focus();
                return boo = false;
            }
        });
        if (!boo) return;
        box.val(returnValue(cc_name) + " - " + returnValue(ccp_phone) + " - " + returnValue(cc_cardNum)).attr("data-code", cc_code);
        box.data("data", {
            cc_code: cc_code,
            cc_name: cc_name,
            ccp_phone: ccp_phone,
            cc_cardNum: cc_cardNum
        });
    };

    /**
     * APP:设置管家数据
     *
     * @param type
     * @param em_id
     * @param em_name
     * @param em_phone
     */
    $.contract.setHousekeeperValue = function (type, em_id, em_name, em_phone) {
        var boo = true;
        $("[name=housekeeper_info]").each(function () {
            if (returnNumber($(this).attr("data-id")) == em_id) {
                $(this).appMsg("该管家已存在，不能重复选择");
                $("[name=housekeeper_info][data-type=" + type + "]").focus();
                return boo = false;
            }
        });
        if (!boo) return;
        $("[name=housekeeper_info][data-type=" + type + "]").val(returnValue(em_name) + " - " + returnValue(em_phone)).attr("data-id", em_id);
    };

    /**
     * APP:设置当前管家数据
     *
     * @param em_id
     */
    $.contract.setCurrentHousekeeperValue = function (em_id) {
        $.contract.param.currentHousekeeper = em_id;
    };

    /** 开关插件*/
    $.fn.SwitchButton = function (param) {
        param = $.extend({
            on: {
                key: "",
                value: "",
            },
            off: {
                key: "",
                value: "",
            },
            def: "on",
            name: "",
        }, param, true);

        var _this = $(this);

        // 元素
        var html = '';
        // 元素-控件
        if (_this.find("[type=checkbox]").length == 0) {
            html += '<input type="checkbox" name="' + param.name + '" data-mode="' + param.def + '" value="' + param[param.def].value + '">';
        } else {
            _this.find("[type=checkbox]").attr({
                "data-mode": param.def,
                "name": param.name,
            }).val(param[param.def].value);
        }
        // 元素-图标
        if (_this.find("i").length == 0) html += '<i></i>';
        // 元素-文本
        if (_this.find("span").length == 0) {
            html += '<span>' + param[param.def].text + '</span>';
        } else {
            _this.find("span").html(param[param.def].text);
        }
        if (html != "") _this.html(html);

        // 样式
        _this.removeClass("switch-button-off").removeClass("switch-button-on");
        if (param.def == "on") {
            _this.addClass("switch-button-on");
        }
        if (param.def == "off") {
            _this.addClass("switch-button-off");
        }

        // 事件
        this.off("click").on("click", function () {
            var check = $(this).find("[type=checkbox]");
            var text = $(this).find("span");
            var mode = check.attr("data-mode");

            $(this).removeClass("switch-button-off").removeClass("switch-button-on");
            if (mode == "on") {
                check.attr("data-mode", "off").val(param["off"].value);
                text.html(param["off"].text);
                $(this).addClass("switch-button-off");
            }
            if (mode == "off") {
                check.attr("data-mode", "on").val(param["on"].value);
                text.html(param["on"].text);
                $(this).addClass("switch-button-on");
            }
        });
    };

    /** 选择管家 **/
    $.contract.clickChooseHousekeeper = function (index) {
        userIndex = index;
        window.location.href = "/appPage/housekeeperSearch?em_id=" + getUrlParam("em_id");
    };

    //免租期方式
    $(document).on('click', '#rent-free .common-check', function () {
        // 截止日期
        var endDate = $("[name=conEndDate]").val();
        $('#rent-free .common-check').each(function () {
            if ($(this).hasClass('common-checkbox-checked')) {
                // 改变免租期
                // btnZdy('conFreeDate');
                $.contract.extendCostCustom('conFreeDate');
                // 改变租金递增自定义
                // btnZdy('conIncreasing');
                $.contract.extendCostCustom('conIncreasing');
                // 改变包修费
                // btnZdy('guaranteecost');
                $.contract.extendCostCustom('guaranteecost');
                if ($(this).find('[name=rent]').val() == 1) {
                    var startDate = new Date($("[name=conStartDate]").val());
                    var day = $('#oneConFreeDate').val();
                    var newDate = DateAdd("d ", parseInt(day), startDate);
                    $("[name=conStartPayDate]").val(returnDate(newDate)).attr({
                        "min": newDate,
                        "max": endDate,
                    });
                }
            }
        });
    });

})($);