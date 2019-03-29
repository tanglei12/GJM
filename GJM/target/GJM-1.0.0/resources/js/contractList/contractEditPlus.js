$(function () {
    $.contract();
});

;(function ($) {

    /** 合同-初始化*/
    $.contract = function () {
        // 初始化参数
        $.contract.init_param();
        // 初始化数据
        $.contract.init_data();
        // 初始化事件
        $.contract.init_event();
    };

    /** 合同-参数*/
    $.contract.param = {
        hi_code: getUrlParam("hi_code"),
        con_code: getUrlParam("contractObject_Code"),
        mode: getUrlParam("mode"),
    };

    /** 合同-加载参数*/
    $.contract.init_param = function () {
        // title
        switch (getUrlParam("mode")) {
            case "addTG":
                $.contract.param.title = "添加合同";
                break;
            case "addZL":
                $.contract.param.title = "添加合同";
                break;
            case "edit":
                $.contract.param.title = "编辑合同";
                break;
            case "renew":
                $.contract.param.title = "续约合同";
                break;
            case "change":
                $.contract.param.title = "改签合同";
                break;
            default:
                $.contract.param.title = "添加合同";
                break;
        }
        $("title").text($.contract.param.title);

        // type
        var type = $("#conType").val();
        $.contract.param.con_type = type;

        // option
        $("#saveContract").attr("data-option", returnValue(getUrlParam("option")));
    };

    /** 合同-加载数据*/
    $.contract.init_data = function () {
        $.ajax({
            type: "POST",
            url: "/contractObject/queryContractInfo",
            data: {
                con_code: returnValue($.contract.param.con_code),
                hi_code: returnValue($.contract.param.hi_code)
            },
            dataType: "json",
            beforeSend: function () {
                $('<div class="loading-mask"></div>').appendTo("body").fadeIn();
            }
        }).done(function (result) {
            if (result.code != 200) return;

            // 缓存数据
            $.contract.param.data = result.data;
            if ($.contract.param.mode == "renew") {
                $.contract.param.old_con_no = result.data.contractObject.contractObject_No;
                $.contract.param.old_con_id = result.data.contractObject.contractObject_Id;
            }

            switch ($.contract.param.con_type) {
                case '托管合同' :
                    $.contract.loadContractTG(result.data);
                    break;
                case '租赁合同' :
                    $.contract.loadContractZL(result.data);
                    break;
            }

        }).always(function () {
            $(".loading-mask").fadeOut(500, function () {
                $(this).remove();
            });
        });
    };

    /** 合同-加载合同-托管*/
    $.contract.loadContractTG = function (mainData) {
        // 合同期限字典数据
        var contractLimitList = mainData.contractLimitList;
        // 支付方式类型列表
        var payWayList = mainData.payWayList;
        // 房源数据
        var houseData = mainData.viewLibraryInfo;

        // --------------------------------------------------

        // 合同对象数据
        var contractObject = mainData.contractObject;
        // 合同主体数据
        var contractBody = mainData.contractBody;
        // 客户数据
        var customers = mainData.customers;
        // 合作照片数据
        var contractImageList = mainData.contractImageList;
        //
        var contractRelaEmps = mainData.contractRelaEmps;
        // 签约代表
        var contractor = mainData.contractor;

        // --------------------------------------------------

        // 添加模式
        var isAdd = $.contract.param.mode.indexOf("add") > -1;
        // 编辑模式
        var isEdit = $.contract.param.mode == "edit";//!isEmpty(contractObject);
        // 续约模式
        var isRenew = $.contract.param.mode == "renew";// || ;
        // 续约编辑
        var isRenewEdit = $.contract.param.mode == "edit" && (returnNumber(contractObject.contractObject_ExtState) == 12 || returnNumber(contractObject.contractObject_ExtState) == 22);
        // 改签模式
        var isChange = $.contract.param.mode == "change";

        // 【设置公共参数】------------------------

        if (!isEmpty(houseData.hi_code)) {
            $.contract.param.hi_code = houseData.hi_code;
        }

        // 编辑模式
        if (isEdit) {
            // 合同对象ID
            $.contract.param.contractBody_Id = contractBody.contractBody_Id;
            $.contract.param.contractObject_Id = contractObject.contractObject_Id;
        }

        // 【初始视图数据】------------------------

        // 合同号
        $("#conno").val(isEdit ? returnValue(contractObject.contractObject_No) : "");
        // 小区房号
        $("#conhouseno").val(returnValue(houseData.house_address));
        // 产权地址
        $("#he_address").val(returnValue(houseData.he_address));

        if (isRenew || (isEdit && (returnNumber(contractObject.contractObject_ExtState) == 12 || returnNumber(contractObject.contractObject_ExtState) == 22))) {
            $(".house-hint").html("合同续约").fadeIn();
        }
        if (isChange || (isEdit && returnNumber(contractObject.contractObject_ExtState) == 13)) {
            $(".house-hint").html("合同改签").fadeIn();
        }

        // 合同期限|起止日期
        var limit = 3,
            startDate,
            endDate;

        if (isEdit || isRenewEdit) {
            startDate = returnDate(contractObject.contractObject_Date);
            endDate = returnDate(contractObject.contractObject_DeadlineTime);

            var ymd_data = returnYearMonthDayData(startDate, endDate);
            limit = ymd_data.year != 0 ? ymd_data.year : 1;
        } else {
            var currentDate = new Date();
            var change = true;
            startDate = returnDate(currentDate);

            if (isChange) {
                currentDate = contractObject.contractObject_DeadlineTime;
                if (new Date().getTime() >= currentDate) {
                    change = true;
                    currentDate = new Date();
                } else {
                    change = false;
                }
            }
            if (change) {
                currentDate.setFullYear(currentDate.getFullYear() + limit);
                currentDate.setDate(currentDate.getDate() - 1);
            }
            endDate = returnDate(currentDate);
        }

        var html = "";
        $.each(contractLimitList, function (index, data) {
            html += '<label class="common-radio">' + returnValue(data.contractType_Name) + '年';
            html += '	<input type="radio" name="conLimit" onclick="$.contract.change_limit();" value="' + returnValue(data.contractType_Name) + '" data-value="' + returnValue(data.contractType_Value) + '">';
            html += '</label>';
        });
        $("#contractLimitList-box").html(html);

        $("[name=conLimit][value=" + limit + "]").attr("checked", "checked").parent().addClass("common-radio-checked");
        $("#conOpenDate").val(startDate);
        $("#conEndDate").val(endDate);

        // 起止日期-值
        $("#startEndDate").html(returnBusinessYMD(startDate, endDate)).fadeIn();

        // 起止日期-提前接房
        if (isEdit && !isRenew) {
            var _forRentDate = returnNumber(contractObject.contractObject_ForRentDate);
            if (_forRentDate != 0) {
                $("input[name=forRentDate_box]").attr("checked", "checked").parent().addClass("common-borderbox-checked");
                $(".prop_box").fadeIn();
                $(".forRentDate").text(_forRentDate);
                var _end_forRentDate = new Date(bodyStartDate);
                _end_forRentDate = _end_forRentDate.setDate(_end_forRentDate.getDate() - _forRentDate);
                $("#forRentDate").val(returnDate(_end_forRentDate));
            }
        }

        // 签订日期
        $("#condate").val(isEdit && !isRenew ? returnDate(contractObject.contractObject_FillTime) : returnDate(startDate));

        // 首付租金日期
        $("#conStartPayDate").val(isEdit && !isRenew ? returnDate(contractBody.contractBody_StartPayTime) : returnDate(startDate));

        // 租金
        var rent = returnFloat(isEdit ? contractBody.contractBody_Rent : houseData.hi_keepMoney);
        $("#conRent").val(rent);

        // 付款方式
        common.pay_cycle_tg(function (result) {
            $.each(result.data, function (index, data) {
                var html = '';
                html += '<option value="' + data.contractType_Name + '" data-value="' + data.contractType_Value + '" ' + (data.contractType_isOpen == 2 ? "disabled" : "") + '>' + data.contractType_Name + '</option>';
                $("#conPayType").append(html);
            });
            $("#conPayType").val(isEdit ? contractBody.contractBody_PayStyle : '季付');
        });

        // 合作方
        common.pay_way_tg(function (result) {
            $.each(result.data, function (index, data) {
                var html = "";
                html += '<label class="common-radio">' + returnValue(data.contractType_Name);
                html += '	<input type="radio" name="payType" value="' + returnValue(data.contractType_Name) + '">';
                html += '</label>';
                $("#monthPayType").append(html).attr("data-value", returnValue(data.contractBody_PayType));
            });
            $('[name=payType][value=' + contractBody.contractBody_PayType + ']').attr("checked", "checked").parent().addClass("common-radio-checked");
        });

        // 租金-打包模式
        if (isEdit && contractObject.contractObject_RentFreeMode == 1) {
            changeRendModel(contractObject.contractObject_RentFreeMode);
        }

        // 约定还款日
        $.contract.change_agreeDate();
        $("#conAgreeDate option[value=" + contractBody.contractBody_AgreedRepayTime + "]").attr("selected", "selected");

        // 账单生成方式
        common.bill_way_tg(function (result) {
            $.each(result.data, function (index, data) {
                $('#conBillWay').append('<option value="' + returnValue(data.contractType_Code) + '">' + returnValue(data.contractType_Name) + '</option>');
            });
            $('#conBillWay').val(returnNumber(contractBody.contractBody_BillWay));
            if ($("[name=payType]:checked").val() == "收租宝") {
                $('#conBillWay option[value=2]').attr("disabled", "disabled");
            }
        });

        // 付款方式-租金比例
        if (isEdit) {
            $("#contractBody_RentPlus").val(filterUnNumber(contractBody.contractBody_RentPlus));
            if (!isEmpty(contractBody.contractBody_RentPlus)) {
                if (contractBody.contractBody_RentPlus.indexOf("+") > -1) {
                    $(".option-prop").hide();
                    $(".option-plus").show();
                }
                if (contractBody.contractBody_RentPlus.indexOf("%") > -1) {
                    $(".option-plus").hide();
                    $(".option-prop").show();
                }
            }
        }

        // 保证金|定金
        if (isEdit) {
            $("#conPay").val(!isRenew ? returnFloat(contractBody.contractBody_Pay) : 0);
            $("#conDepslit").val(!isRenew ? returnFloat(contractBody.contractBody_Depslit) : 0);
        } else {
            $("#conPay").val(1000);
            $("#conDepslit").val(0);
        }

        // 免租期
        btnZdy('conFreeDate', isEdit ? contractBody.contractBody_FreeTime.split("|") : null);

        // 租金递增
        btnZdy('conIncreasing', isEdit ? contractBody.contractBody_Increasing.split("|") : null);

        // 保修费
        btnZdy('guaranteecost', isEdit ? contractBody.contractBody_GuaranteeCost.split("|") : null);

        // 管理费
        $("#conService").val(returnNumber(isEdit ? contractBody.contractBody_Service : 0));

        // 租金分成
        $("#A_rate").val(isEdit ? returnNumber(contractBody.contractBody_RentRate_A) : 0);
        $("#B_rate").val(isEdit ? returnNumber(contractBody.contractBody_RentRate_B) : 100);

        // 总租金
        $.contract.compute_totalRent();

        // 主客户|联系人
        if (!isEmpty(customers)) {
            $.each(customers, function (index, data) {
                if (data.crc_role == 0) {
                    $("#customer-main").load_customer(data);
                    if ($.contract.param.mode == "renew" || returnNumber(contractObject.contractObject_ExtState) == 12 || returnNumber(contractObject.contractObject_ExtState) == 22) {
                        $("#customer-main").data("customers", customers);
                    }
                } else if ($.contract.param.mode != "renew") {
                    $.contract.add_customer(null, "dynamic", data);
                }
            });
        } else {
            $("#customer-main").load_customer();
        }

        // 其他约定|备注
        if (isEdit) {
            $("#conother").text(!isRenew ? returnValue(contractObject.contractObject_Other) : "");
            $("#conRemark").text(!isRenew ? returnValue(contractBody.contractBody_Remark) : "");
        } else {
            $("#conother").text("");
            $("#conRemark").text("");
        }

        // 合同照片
        if (isEdit && !isEmpty(contractImageList)) {
            $.each(contractImageList, function (index, data) {
                if (isRenew && data.ci_type == "HTZ") {
                    return;
                }
                var html = "";
                html += '<div class="images-box-img">';
                html += '	<img class="showboxImg" name="' + returnValue(data.ci_type) + '" src="' + returnValue(data.ci_path_real) + '">';
                html += '	<span class="images-box-img-delete" data-type="' + returnValue(data.ci_type) + '">删除</span>';
                html += '</div>';
                $('.images-btn[data-type=' + returnValue(data.ci_type) + ']').before(html);
            });
            var HTZ = $("[name=HTZ]");
            var WTS = $("[name=WTS]");
            var FCZ = $("[name=FCZ]");

            if (HTZ.length > returnNumber($("#HTZ-limit").text())) {
                $(".images-btn[data-type=HTZ]").hide();
            }
            if (WTS.length > returnNumber($("#WTS-limit").text())) {
                $(".images-btn[data-type=WTS]").hide();
            }
            if (FCZ.length > returnNumber($("#FCZ-limit").text())) {
                $(".images-btn[data-type=FCZ]").hide();
            }

            $("#HTZ-count").text(HTZ.length);
            $("#WTS-count").text(WTS.length);
            $("#FCZ-count").text(FCZ.length);
        }

        // 签约代表
        $("[name=contractor_id]").val(!isEmpty(contractor) && !isRenew ? contractor.em_id : $.cookie("em_id"));
        $("[name=contractor_name]").val(!isEmpty(contractor) && !isRenew ? contractor.em_name : $.cookie("em_name"));
        $("[name=contractor_phone]").val(!isEmpty(contractor) && !isRenew ? contractor.em_phone : $.cookie("em_phone"));

        // 管家信息
        $("#gj-box").empty();
        if (!isEmpty(contractRelaEmps) && $.contract.param.mode != "renew") {
            $.each(contractRelaEmps, function (index, data) {
                if (data.cre_role == 1) {
                    $("input[name=em_id]").val(data.em_id);
                    $("input[name=em_name]").val(data.em_name);
                    $("input[name=em_phone]").val(data.em_phone);
                    $("input[name=contract_perforSplit]").val(data.contract_perforSplit);
                } else {
                    addGJlist(data);
                }
            });
        } else {
            $("input[name=em_id]").val($.cookie("em_id"));
            $("input[name=em_name]").val($.cookie("em_name"));
            $("input[name=em_phone]").val($.cookie("em_phone"));
            $("input[name=contract_perforSplit]").val(100);
        }
    };

    /** 合同-加载合同-租赁*/
    $.contract.loadContractZL = function (mainData) {
        // 房源数据
        var houseData = mainData.viewLibraryInfo;
        // 托管期限
        var contractTGDate = mainData.contractTGDate;

        // --------------------------------------------------

        // 合同期限字典数据
        var contractLimitList = mainData.contractLimitList;
        // 支付方式类型列表
        var payWayList = mainData.payWayList;
        // 支付方式类型列表
        var payTypeList = mainData.payTypeList;
        // 房屋用途
        var houseUseList = mainData.houseUseList;

        // --------------------------------------------------

        // 合同对象数据
        var contractObject = mainData.contractObject;
        // 合同主体数据
        var contractBody = mainData.contractBody;
        // 客户数据
        var customers = mainData.customers;
        // 合作照片数据
        var contractImageList = mainData.contractImageList;
        //
        var contractRelaEmps = mainData.contractRelaEmps;
        // 签约代表
        var contractor = mainData.contractor;

        // 月付
        var outMoney = houseData.hi_price == 0 ? 0 : houseData.hi_price;
        $("[name='outMoney']").val(outMoney);
        // 季付
        var seasonMoney = houseData.hi_price == 0 ? 0 : houseData.hi_price + 50;
        $("[name='seasonMoney']").val(seasonMoney);
        // 半年付
        var halfYearMoney = houseData.hi_price == 0 ? 0 : houseData.hi_price * (1 - (3.0 / 100));
        $("[name='halfYearMoney']").val(halfYearMoney);
        // 年付
        var yeayMoney = houseData.hi_price == 0 ? 0 : houseData.hi_price * (1 - (6.0 / 100));
        $("[name='yeayMoney']").val(yeayMoney);

        // --------------------------------------------------

        // 是编辑模式
        var isEdit = !isEmpty(contractObject);
        // 是续约模式
        var isRenew = $.contract.param.mode == "renew";

        // 【设置公共参数】------------------------

        if (!isEmpty(houseData.hi_code)) {
            $.contract.param.hi_code = houseData.hi_code;
        }

        // 编辑模式
        if (isEdit) {
            // 合同对象ID
            $.contract.param.contractBody_Id = contractBody.contractBody_Id;
            $.contract.param.contractObject_Id = contractObject.contractObject_Id;
        }

        // 【初始视图数据】------------------------

        // 主客户|联系人
        if (!isEmpty(customers)) {
            $.each(customers, function (index, data) {
                if (data.crc_role == 0) {
                    $("#customer-main").load_customer(data);
                    if ($.contract.param.mode == "renew" || returnNumber(contractObject.contractObject_ExtState) == 12 || returnNumber(contractObject.contractObject_ExtState) == 22) {
                        $("#customer-main").data("customers", customers);
                    }
                } else if ($.contract.param.mode != "renew") {
                    $.contract.add_customer(null, "dynamic", data);
                }
            });
        } else {
            $("#customer-main").load_customer();
        }

        // 合同号
        if (isEdit && !isRenew) {
            $("#conno").val(returnValue(contractObject.contractObject_No));
        }
        // 小区房号
        $("#conhouseno").val(returnValue(houseData.house_address));
        if (isRenew || (isEdit && (returnNumber(contractObject.contractObject_ExtState) == 12 || returnNumber(contractObject.contractObject_ExtState) == 22))) {
            $(".house-hint").html("合同续约").fadeIn();
        }

        // 托管期限
        $("#houseContractInfo").html('托管期限：' + returnDate(contractTGDate.startDate) + ' - ' + returnDate(contractTGDate.endDate)).data("data", contractTGDate);

        // 房屋用途
        $.each(houseUseList, function (index, data) {
            $("#conUse").append('<option value="' + returnValue(data.contractType_Name) + '" data-value="' + returnValue(data.contractType_Value) + '">' + returnValue(data.contractType_Name) + '</option>');
        });
        if (isEdit) {
            $("#conUse option[value=" + contractBody.contractBody_Use + "]").attr("selected", "selected");
        }

        // 付款方式
        $.each(payWayList, function (index, data) {
            $("#conPayType").append('<option value="' + data.contractType_Name + '" data-value="' + data.contractType_Value + '">' + data.contractType_Name + '</option>');
        });
        // 合作方
//		common.pay_way_zl(function(result){
//			$.each(result.data, function(index, data) {
//				var html = "";
//				html += '<label class="common-radio">' + returnValue(data.contractType_Name);
//				html += '	<input type="radio" name="payType" value="' + returnValue(data.contractType_Name) + '">';
//				html += '</label>';
//				$("#monthPayType").append(html).attr("data-value", returnValue(data.contractBody_PayType));
//			});
//			$('[name=payType][value='+ contractBody.contractBody_PayType +']').attr("checked", "checked").parent().addClass("common-radio-checked");
//		});

        // 合作方
        $.each(payTypeList, function (index, data) {
            var html = "";
            html += '<label class="type-label">' + returnValue(data.contractType_Name) + '<i></i>';
            html += '	<input type="checkbox" class="type-radio" name="payType" onclick="changeType(this)" value="' + returnValue(data.contractType_Name) + '">';
            html += '</label>';
            $("#monthPayType").append(html).attr("data-value", returnValue(data.contractBody_PayType));
        });
        if (isEdit) {
            $("#conPayType option[value=" + contractBody.contractBody_PayStyle + "]").attr("selected", "selected");
            if (contractBody.contractBody_PayStyle == "月付") {
                $("[name=payType][value=" + contractBody.contractBody_PayType + "]").attr("checked", "checked").parent().addClass("span-checked");
                $("#monthPayType").show();
                $("#rentPlus").show();
                $("#contractBody_RentPlus").val(filterUnNumber(contractBody.contractBody_RentPlus));
            } else {
                $("#monthPayType").hide();
                $("#rentPlus").hide();
            }
        } else {
            if ($("#conPayType option:selected").val() != '月付') {
                $("#monthPayType").hide();
            }
        }

        // 起止日期
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
        $("#conOpenDate").val(startDate);
        $("#conEndDate")
        .val(endDate)
        .attr("data-max-date", returnDate(contractTGDate.endDate));

        // 起止日期-值
        $("#startEndDate").html(returnBusinessYMD(startDate, endDate)).fadeIn();

        // 租金
        var rent = 0;
        if (isEdit) {
            rent = returnFloat(contractBody.contractBody_Rent);
        } else {
//			rent = returnFloat(houseData.hi_keepMoney);
            rent = returnFloat(houseData.hi_price);
        }
        $("#house-rent").val(rent);
        $("#conRent").val(rent);
        $("#old-house-rent").val(rent);

        // 租金上涨

        // 总租金
        $.contract.compute_totalRent();

        // 服务费
        $("#conService").val(returnNumber(isEdit ? contractBody.contractBody_Service : 600));

        // 保证金
        if (isEdit) {
            if (!isRenew) {
                $("#conPay").val(returnFloat(contractBody.contractBody_Pay));
            } else {
                $("#conPay").val(0);
            }
        } else {
//			$("#conPay").val(returnFloat(rent * 2));
            // shenhx 201705012

            var conPayMoney = $.contract.compute_pledgeCase();
            $("#conPay").val(returnFloat(conPayMoney)).attr("data-cache", returnFloat(conPayMoney));
        }
        $("#hi_houseS").val(houseData.hi_houseS);

        // 签订日期|首付租金日期
        if (isEdit && !isRenew) {
            $("#condate").val(returnDate(contractObject.contractObject_FillTime));
            $("#conStartPayDate").val(returnDate(contractBody.contractBody_StartPayTime));
        } else {
            $("#condate").val(returnDate(startDate));
            $("#conStartPayDate").val(returnDate(startDate));
        }

        // 约定还款日
        $.contract.change_agreeDate();
        if (isEdit && !isRenew) {
            $("#conAgreeDate option[value=" + contractBody.contractBody_AgreedRepayTime + "]").attr("selected", "selected");
        }

        // 付款方式-租金比例
        if (isEdit) {
            $("#contractBody_RentPlus").val(filterUnNumber(contractBody.contractBody_RentPlus));
        }

        // 其他约定|备注
        if (isEdit && !isRenew) {
            $("#conother").text(returnValue(contractObject.contractObject_Other));
            $("#conRemark").text(returnValue(contractBody.contractBody_Remark));
        } else {
            $("#conother").text("");
            $("#conRemark").text("");
        }

        // 合同照
        if (isEdit && !isEmpty(contractImageList)) {
            $.each(contractImageList, function (index, data) {
                if (isRenew && data.ci_type == "HTZ") {
                    return;
                }
                var html = "";
                html += '<div class="images-box-img">';
                html += '	<img class="showboxImg" name="' + returnValue(data.ci_type) + '" src="' + returnValue(data.ci_path_real) + '">';
                html += '	<span class="images-box-img-delete" data-type="' + returnValue(data.ci_type) + '">删除</span>';
                html += '</div>';
                $('.images-btn[data-type=' + returnValue(data.ci_type) + ']').before(html);
            });
            var HTZ = $("[name=HTZ]");
            if (HTZ.length > returnNumber($("#HTZ-limit").text())) {
                $(".images-btn[data-type=HTZ]").hide();
            }
            $("#HTZ-count").text(HTZ.length);
        }

        // 签约代表
        if (!isEmpty(contractor) && !isRenew) {
            $("[name=contractor_id]").val(contractor.em_id);
            $("[name=contractor_name]").val(contractor.em_name);
            $("[name=contractor_phone]").val(contractor.em_phone);
        } else {
            $("[name=contractor_id]").val($.cookie("em_id"));
            $("[name=contractor_name]").val($.cookie("em_name"));
            $("[name=contractor_phone]").val($.cookie("em_phone"));
        }

        // 管家信息
        $("#gj-box").empty();
        if (!isEmpty(contractRelaEmps) && $.contract.param.mode != "renew") {
            $.each(contractRelaEmps, function (index, data) {
                if (data.cre_role == 1) {
                    $("input[name=em_id]").val(data.em_id);
                    $("input[name=em_name]").val(data.em_name);
                    $("input[name=em_phone]").val(data.em_phone);
                    $("input[name=contract_perforSplit]").val(data.contract_perforSplit);
                } else {
                    addGJlist(data);
                }
            });
        } else {
            $("input[name=em_id]").val($.cookie("em_id"));
            $("input[name=em_name]").val($.cookie("em_name"));
            $("input[name=em_phone]").val($.cookie("em_phone"));
            $("input[name=contract_perforSplit]").val(100);
        }
    };

    /** 合同-加载事件*/
    $.contract.init_event = function () {

        $(document).on("click", function () {
            $(".select>.option").hide();
        });

        // 托管合同期限
        var noBlur = true;
        $("#conno").on("blur", function () {
            if (noBlur) {
                if ($(this).val().length < 10) {
                    $(this).msg("合同编号不足10位，请确认合同编号是否正确");
                    noBlur = false;
                }
            }
        });

        // 起始日期
        $("#conOpenDate").on("focus", function () {
            var _this = $(this);
            var _minDate = "";
            if (!isEmpty(_this.attr("data-min-date"))) {
                _minDate = new Date(_this.attr("data-min-date"));
                _minDate = returnDate(_minDate.setDate(_minDate.getDate()));
            }
            WdatePicker({
                minDate: _minDate,
                onpicked: function (dp) {
                    // 改变开始日期
                    $.contract.change_startDate();

                    var minDate = new Date(_this.attr("data-min-date"));
                    minDate = minDate.setDate(minDate.getDate() + 1);

                    var maxDate = new Date(_this.val());
                    if (maxDate.getTime() <= minDate) {
                        $("input[name=forRentDate_box]").removeAttr("checked").parent().removeClass("common-borderbox-checked").fadeOut();
                        $(".prop_box").fadeOut();
                    } else {
                        $("input[name=forRentDate_box]").parent().fadeIn();
                    }

                    // 判斷是否為短租期
                    var isShort = $.contract.short_Rent();
                    if (isShort) {
                        // 原始统一出房价
                        var house_rent = $("[name=house-rent]").val();
//						// 计算出房价
//						$("#house-rent").html(returnFloat(returnFloat(house_rent)*1.5) + "元/月");
                        // 租金为出房价1.5倍
                        $("#conRent").val(returnFloat(returnFloat(house_rent) * 1.5));
                        // 押金与租金相同
                        $("#conPay").val(returnFloat(returnFloat(house_rent) * 1.5));
                    } else {
                        // 原始统一出房价
                        var house_rent = $("#old-house-rent").val();
                        // 租金为出房价
                        $("#conRent").val(returnFloat(house_rent));
                        // 重新计算押金 shenhx 20170520
                        var conPayMoney = $.contract.compute_pledgeCase();
                        $("#conPay").val(returnFloat(conPayMoney)).attr("data-cache", returnFloat(conPayMoney));
                    }
                }
            });
        });

        // 终止日期
        $("#conEndDate").on("focus", function () {
            var _minDate = "";
            if (!isEmpty(returnValue($("#conOpenDate").val()))) {
                _minDate = new Date(returnValue($("#conOpenDate").val()));
                _minDate = returnDate(_minDate.setMonth(_minDate.getMonth() + 1, _minDate.getDate() - 1));
            }
            var _maxDate = "";
            if (isEmpty($(this).attr("data-max-date"))) {
                var date = new Date(_minDate);
                date = date.setFullYear(date.getFullYear() + 5);
                date = new Date(date).setDate(new Date(date).getDate() - 1);
                _maxDate = returnDate(date);
            } else {
                var date = new Date($(this).attr("data-max-date"));
                date = date.setMonth(date.getMonth() + 3);
                _maxDate = returnDate(date);
            }
            WdatePicker({
                minDate: _minDate,
                maxDate: _maxDate,
                onpicked: function (dp) {
                    $.contract.change_endDate();
                    var isShort = $.contract.short_Rent();
                    if (isShort) {
                        // 原始统一出房价
                        var house_rent = $("#old-house-rent").val();
//						// 计算出房价
//						$("#house-rent").html(returnFloat(returnFloat(house_rent)*1.5) + "元/月");
                        // 租金为出房价1.5倍
                        $("#conRent").val(returnFloat(returnFloat(house_rent) * 1.5));
                        // 押金与租金相同
                        $("#conPay").val(returnFloat(returnFloat(house_rent) * 1.5));
                    } else {
                        // 原始统一出房价
                        var house_rent = $("#old-house-rent").val();
                        // 租金为出房价
                        $("#conRent").val(returnFloat(house_rent));
                        // 重新计算押金 shenhx 20170520
                        var conPayMoney = $.contract.compute_pledgeCase();
                        $("#conPay").val(returnFloat(conPayMoney)).attr("data-cache", returnFloat(conPayMoney));
                    }
//					showPayDate();
                }
            });
        });

        // 签订日期
        $("#condate").on("focus", function () {
            var _startDate = returnValue($("#conOpenDate").val());
            if (!isEmpty(_startDate)) {
                var date = new Date(_startDate);
                _startDate = returnDate(date.setDate(date.getDate() + 3));
            }
            WdatePicker({
                maxDate: _startDate,
                onpicked: function (dp) {
                }
            });
        });

        // 合作平台
        $(document).on("click", "[name=payType]", function () {
            if ($(this).val() == "收租宝") {
                $("#conBillWay").val(1);
                $("#conBillWay option[value=2]").attr("disabled", "disabled");
            } else {
                $("#conBillWay option[value=2]").removeAttr("disabled");
            }
        });

        // 修改打包年付触发总租金计算
        /*$("[name=payRentModel]").on("change", function(){
         $.contract.compute_totalRent();
         });*/

        // 修改免租期触发总租金计算
        $("#conFreeDate").on("change", "#conFreeDate>input", function () {
            $.contract.compute_totalRent();
        });

        // 修改租金递增触发总租金计算
        $("#conIncreasing").on("change", "#conIncreasing>input", function () {
            $.contract.compute_totalRent();
        });

        // 点击租金递增转换按钮触发总租金计算
        $("#conIncreasingCustom").on("click", function () {
            $.contract.compute_totalRent();
        });

        // 点击租金加成触发总租金计算
        $(".rentPlus").on("click", function () {
            $.contract.compute_totalRent();
        });

        // 签订日期
//		$("#conAgreeDate").on("focus", function() {
//			var _openDate = returnValue($("#conOpenDate").val());
//			var date = new Date(_openDate);
//			var minDate = returnDate(date.setDate(date.getDate() - 18));
//
//			date = new Date(_openDate);
//			var maxDate = returnDate(date.setDate(date.getDate() - 3));
//			WdatePicker({
//				el : 'hiddenConAgreeDate',
//				srcEl : $("#conAgreeDate")[0],
//				minDate : minDate,
//				maxDate : maxDate,
//				onpicked : function(dp) {
//					$("#conAgreeDate").val(new Date($("#hiddenConAgreeDate").val()).getDate());
//				}
//			});
//		});

        // 首付租金日期
        $("#conStartPayDate").on("focus", function () {
            var _this = $(this);
            var _startDate = returnValue($("#conOpenDate").val());
            WdatePicker({
                minDate: _startDate,
                onpicked: function (dp) {
                }
            });
        });

        // 租金加成替换
        $("#rentPlus>.toolbox-option").on("click", function () {
            var _box = $(this).siblings(".toolbox-value");
            if (_box.hasClass("value-suffix")) {
                _box.addClass("value-prefix").removeClass("value-suffix").find("input").attr("data-type", "+");
            } else {
                _box.addClass("value-suffix").removeClass("value-prefix").find("input").attr("data-type", "%");
            }
        });

        // 提前接房
        $("input[name=forRentDate_box]").on("click", function () {
            if ($(this).is(":checked")) {
                $(".prop_box").fadeIn();
            } else {
                $(".prop_box").fadeOut();
            }
        });

        // 接房日期
        $("#forRentDate").on("focus", function () {
            var _this = $(this);
            var _minDate = new Date($("#conOpenDate").attr("data-min-date"));
            _minDate = _minDate.setDate(_minDate.getDate() + 1);

            var _maxDate = new Date(returnValue($("#conOpenDate").val()));
            _maxDate = _maxDate.setDate(_maxDate.getDate() - 1);
            WdatePicker({
                minDate: returnDate(_minDate),
                maxDate: returnDate(_maxDate),
                onpicked: function (dp) {
                    var endDate = new Date($("#conOpenDate").val()).getTime();
                    var startDate = new Date(_this.val()).getTime();
                    var forRentDate = (endDate - startDate) / (24 * 60 * 60 * 1000);
                    $(".forRentDate").text(forRentDate);
                    _this.attr("data-forRentDate", forRentDate);
                }
            });
        });

        // 业绩分成
        $(document).on("input propertychange", "input.emp-yj", function () {
            var total = 0;
            $(".emp-yj").each(function () {
                total += returnFloat($(this).val());
            });
            if (total > 100) {
                $(this).val(100 - (total - returnFloat($(this).val())));
            }
        });

        // 绑定客户选择弹窗事件
//		$("input[name=cc_name],input[name=ccp_phone],input[name=cc_cardNum]").on("click", function() {
//			var _param = "";
//			var cc_ids = new Array();
//			if (!isEmpty($(this).data("customers"))) {
//				$.each($(this).data("customers"), function(index, data) {
//					cc_ids.push(data.cc_id);
//				});
//				_param = JSON.stringify(cc_ids);
//			}
//			$(this).openModel({
//				title : "客户信息",
//				param : _param,
//				target : {
//					id : "cc_id",
//					name : "cc_name",
//					phone : "ccp_phone",
//					card : "cc_cardNum",
//					images : ".images-box[data-type=SFZ]"
//				},
//				repeatClass : "cc_id"
//			});
//		});

        // 绑定管家选择弹窗事件
        $("input[name=em_id],input[name=em_name],input[name=em_phone]").on("click", function () {
            $(this).openModel({
                title: "管家信息",
                target: {
                    id: "em_id",
                    name: "em_name",
                    phone: "em_phone"
                },
                repeatClass: "em_id"
            });
        });
        // 绑定管家选择弹窗事件
        $("[name^=contractor_]").on("click", function () {
            $(this).openModel({
                title: "管家信息",
                target: {
                    id: "contractor_id",
                    name: "contractor_name",
                    phone: "contractor_phone"
                },
                repeatClass: "contractor_id"
            });
        });

        // 租金改变
        $("#conRent").on({
            "input propertychange": function () {
                $.contract.compute_totalRent();
                if ($.contract.param.con_type == "租赁合同") {
                    if (!$.contract.short_Rent()) {
                        // 重新计算押金 shenhx 20170409
                        var conPayMoney = $.contract.compute_pledgeCase();
                        $("#conPay").val(returnFloat(conPayMoney)).attr("data-cache", returnFloat(conPayMoney));
                        var _val = returnFloat($(this).val());
                        var _limit = returnFloat($(this).attr("data-limit"));
                        if (_val < _limit) {
                            $(this).appMsg("租金不能小于统一出房价");
                        }
                    }
                }
            },
            "blur": function () {
                if ($.contract.param.con_type == "租赁合同") {
                    var curRent = returnFloat($("#conRent").val());
                    var rent = $.contract.short_Rent() ? returnFloat(returnFloat($("#old-house-rent").val()) * 1.5) : returnFloat($("#house-rent").val());
                    if (curRent < rent) {
                        var _this = $(this);
                        $(".msg-box").remove();
                        var box = $('<div class="msg-box">' + "租金最低应为" + rent + "元" + '</div>').appendTo(_this.parent()).hide().show("fast");
                        _this.val(rent);
                        scrollTimer = setTimeout(function () {
                            box.hide("fast", function () {
                                $(this).remove();
                            });
                        }, 2000);
                    } else {
                        $(".msg-box").remove();
                    }
                    if (!$.contract.short_Rent()) {

                        // 重新计算押金 shenhx 20170409
                        var conPayMoney = $.contract.compute_pledgeCase();
                        $("#conPay").val(returnFloat(conPayMoney)).attr("data-cache", returnFloat(conPayMoney));
                    }

                }
            }
        });

        // 支付方式
        $("#conPayType").on("change", function () {
            if ($(this).val() == "月付" || ($.contract.param.con_type == "托管合同" && $(this).val() == "季付")) {
                $("#monthPayType").show();
            } else {
                if (!($.contract.param.con_type == "托管合同" && $(this).val() == "季付")) {
                    $("#monthPayType").hide();
                }
            }
            // 租金模式：打包年付
            if ($.contract.param.con_type == "托管合同") {
                // 租金加成
                changeRentPlus(this);
                changeRendModel();
                $.contract.compute_totalRent();
            }
            if ($.contract.param.con_type == "租赁合同") {
                // 判断月付
                if ($("#conPayType option:selected").val() == "月付") {
                    $("#monthPayType").show();
                    $("#rentPlus").show();
                    $("#contractBody_RentPlus").val(0);
                } else {
                    $("#monthPayType").hide();
                    $("#rentPlus").hide();
                    $("#contractBody_RentPlus").val(0);
                }
                if (!$.contract.short_Rent()) {
                    // 重新计算租金 shenhx 20170517
                    var conType = $(this).val();
                    var moneyV;
                    if (conType == "月付") {
                        moneyV = returnFloat($("[name=outMoney]").val());
                    } else if (conType == "季付") {
                        moneyV = returnFloat($("[name=seasonMoney]").val());
                    } else if (conType == "半年付") {
                        moneyV = $.contract.moneys(returnFloat($("[name=halfYearMoney]").val()));
                    } else if (conType == "年付") {
                        moneyV = $.contract.moneys(returnFloat($("[name=yeayMoney]").val()));
                    }
                    $("#house-rent").val(moneyV);
                    $("#conRent").val(moneyV);

                    // 重新计算押金 shenhx 20170409
                    var conPayMoney = $.contract.compute_pledgeCase();
                    $("#conPay").val(returnFloat(conPayMoney)).attr("data-cache", returnFloat(conPayMoney));
                }
            }
            // 约定还款日
            $.contract.change_agreeDate();
        });

        // 押金
        $("#conPay").on("blur", function () {
            if ($.contract.param.con_type == "租赁合同") {
                var curConPay = $(this).val();
                if (!$.contract.short_Rent()) {
                    var conPayMoney = $.contract.compute_pledgeCase();
                    var houseS_p = $("#hi_houseS").val();
                    var minMoney = 0;
                    if (houseS_p == "1") {
                        minMoney = 2000;
                    } else if (houseS_p == "2") {
                        minMoney = 2500;
                    } else if (houseS_p == "3") {
                        minMoney = 3000;
                    }
                    if (curConPay < minMoney) {
                        $("#conPay").val(returnFloat(conPayMoney)).attr("data-cache", returnFloat(conPayMoney));
                        $(this).appMsg("押金须大于" + minMoney + "元");
                    }
                } else {
                    var shortConPay = returnFloat(returnFloat($("#house-rent").val()) * 1.5);
                    if (returnFloat(curConPay) < shortConPay) {
                        $("#conPay").val(returnFloat(shortConPay)).attr("data-cache", returnFloat(shortConPay));
                        $(this).appMsg("押金须不低于" + shortConPay + "元");
                    }
                }
            }
            if ($.contract.param.con_type == "托管合同") {
                var curConPay = $(this).val();
                if (curConPay > 1000) {
                    $("#conPay").val(1000).attr("data-cache", returnFloat(1000));
                    $(this).appMsg("押金不能大于1000元");
                }
            }
        });

        // 第三方插件--自定义滚动条
        $(".model-main").perfectScrollbar();
    };

    // ---------------------------------------------

    /** 计算押金 */
    $.contract.compute_pledgeCase = function () {
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
//		var houseType = $("#house-stw").html();
//		var houseS_p = returnNumber(houseType.substring(0, houseType.indexOf("室")));// 户型-室数
        var hi_houseS = $("#hi_houseS").val();
        var payType_p = $("#conPayType").val();// 付款方式
        var rent = returnFloat($("#conRent").val()); // 租金
        var conPayMoney = 0;// 押金
        conPayMoney = payType_p == '月付' ? rent * 2 : rent * 1.5;
        if (hi_houseS == 1) {
            conPayMoney = conPayMoney >= 2000 ? conPayMoney : 2000;
        } else if (hi_houseS == 2) {
            conPayMoney = conPayMoney >= 2500 ? conPayMoney : 2500;
        } else if (hi_houseS >= 3) {
            conPayMoney = conPayMoney >= 3000 ? conPayMoney : 3000;
        }
        return conPayMoney;
    }

    /** 合同-合同期限*/
    $.contract.change_limit = function () {
        // 租赁期限
        var limit = returnNumber($("[name=conLimit]:checked").val());

        // 改变起止日期
        var startDate = new Date($("#conOpenDate").val());
        var endDate = new Date(startDate.setFullYear(startDate.getFullYear() + limit));
        endDate = new Date(endDate.setDate(endDate.getDate() - 1));
        $("#conEndDate").val(returnDate(endDate));

        // 改变起止日期差值
        $("#startEndDate").html(returnBusinessYMD(returnDate($("#conOpenDate").val()), returnDate($("#conEndDate").val()))).fadeIn();

        // 改变免租期
        btnZdy('conFreeDate');

        // 改变租金递增自定义
        btnZdy('conIncreasing');

        // 改变包修费
        btnZdy('guaranteecost');

        // 改变总租金
        $.contract.compute_totalRent();
    };

    /** 合同-合同起始日期*/
    $.contract.change_startDate = function () {
        // 起始日期
        var startDate = returnDate($("#conOpenDate").val());
        // 截止日期
        var endDate = returnDate($("#conEndDate").val());

        // 改变租赁期限
        var ymd_data = returnYearMonthDayData(startDate, endDate);
        var limit = ymd_data.year != 0 ? ymd_data.year : 1;
        $("[name=conLimit]").removeAttr("checked").parent().removeClass("common-radio-checked");
        $("[name=conLimit][value=" + limit + "]").attr("checked", "checked").parent().addClass("common-radio-checked");

        // 改变起止日期差值
        $("#startEndDate").html(returnBusinessYMD(startDate, endDate)).fadeIn();

        // 改变签订日期
        $("#condate").val(startDate);

        // 改变首付租金日期
        $("#conStartPayDate").val(startDate);

        // 改变约定还款日
        $.contract.change_agreeDate();

        // 改变免租期
        btnZdy('conFreeDate');

        // 改变租金递增自定义
        btnZdy('conIncreasing');

        // 改变包修费
        btnZdy('guaranteecost');

        // 改变总租金
        $.contract.compute_totalRent();
    };

    /** 合同-合同截止日期*/
    $.contract.change_endDate = function () {
        // 起始日期
        var startDate = returnDate($("#conOpenDate").val());
        // 截止日期
        var endDate = returnDate($("#conEndDate").val());

        // 改变租赁期限
        var ymd_data = returnYearMonthDayData(startDate, endDate);
        var limit = ymd_data.year != 0 ? ymd_data.year : 1;
        $("[name=conLimit]").removeAttr("checked").parent().removeClass("common-radio-checked");
        $("[name=conLimit][value=" + limit + "]").attr("checked", "checked").parent().addClass("common-radio-checked");

        // 改变起止日期差值
        $("#startEndDate").html(returnBusinessYMD(startDate, endDate)).fadeIn();

        // 改变免租期
        btnZdy('conFreeDate');

        // 改变租金递增自定义
        btnZdy('conIncreasing');

        // 改变包修费
        btnZdy('guaranteecost');

        // 改变总租金
        $.contract.compute_totalRent();
    };

    /** 合同-约定还款日*/
    $.contract.change_agreeDate = function () {
        // 起始日期
        var startDate = returnDate($("#conOpenDate").val());
        // 截止日期
        var endDate = returnDate($("#conEndDate").val());
        // 付款类型
        var conPayType = $("#conPayType option:selected").val();
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
        $("#conAgreeDate").empty();
        for (var i = 0; i <= cycle; i++) {
            var oldDate = new Date(startDate);
            oldDate = new Date(oldDate.setDate(oldDate.getDate() - i));
            $("#conAgreeDate").append('<option value="' + oldDate.getDate() + '" data-value="' + (0 - i) + '">' + (i == 0 ? "当日" : ('提前' + i + '日')) + '还款</option>');
        }
    };

    /** 合同-计算总租金*/
    $.contract.compute_totalRent = function () {
        // 起始日期
        var startDate = returnDate($("#conOpenDate").val());
        // 截止日期
        var endDate = returnDate($("#conEndDate").val());
        // 租金
        var rent = returnFloat($("#conRent").val());
        // 租金加成
        var rentPlus = returnFloat($("#contractBody_RentPlus").val());
        // 付款类型
        var conPayType = $("#conPayType option:selected").val();

        // 计算总租金
        var ymd = returnYearMonthDayData(startDate, endDate);
        var totalMonth = ymd.year * 12 + ymd.month;
        var remainDay = ymd.day;
        var totalRent = 0;

        if ($.contract.param.con_type == "托管合同") {
            if ($("#conPayType").val() == "打包年付") {
                totalRent = rent * ymd.year;
            } else {
                for (var i = 0; i < totalMonth; i++) {
                    var index = returnNumber(i / 12);
                    var index_remain = i % 12;
                    var currentRent = rent;

                    // 租金递增
                    var conIncreasing = returnFloat($("#conIncreasing>input").eq(index).val());
                    if ($("#conIncreasingCustom").text().indexOf("%") > -1) {
                        currentRent = returnFloat(currentRent * (1 + conIncreasing / 100));
                    } else {
                        currentRent = returnFloat(currentRent + conIncreasing);
                    }

                    // 免租期
                    if (index_remain == 0) {
                        var conFreeDate = returnFloat($("#conFreeDate>input").eq(index).val());
                        currentRent = currentRent - (currentRent / 30 * conFreeDate);
                    }
                    // 租金加成
                    if (currentRent > 0) {
                        var _rentplus = $(".rentPlus:visible").text();
                        if (_rentplus.indexOf("+") > -1) {
                            currentRent = currentRent + rentPlus;
                        } else if (_rentplus.indexOf("%") > -1) {
                            currentRent = currentRent * (rentPlus / 100);
                        }
                    }
                    if (i == (totalMonth - 1)) {
                        currentRent = currentRent + (currentRent / 30 * remainDay);
                    }
                    totalRent += currentRent;
                }
            }
        }
        if ($.contract.param.con_type == "租赁合同") {
            var ymd = returnYearMonthDayData(startDate, endDate);
            totalRent = returnFloat((ymd.year * 12 + ymd.month) * rent + (rent / 30 * ymd.day));
        }
        $("#totalRent .toolbox-value").html(returnFloat(totalRent));

    };

    /** 合同-显示账单列表*/
    $.contract.show_bill_list = function () {
        // 起始日期
        var startDate = returnDate($("#conOpenDate").val());
        // 截止日期
        var endDate = returnDate($("#conEndDate").val());
        // 首付租金日期
        var startPayDate = returnDate($("#conStartPayDate").val());
        // 付款方式
        var cycleValue = returnNumber($("#conPayType>option:selected").attr("data-value"));
        // 约定日
        var agreeValue = returnNumber($("#conAgreeDate>option:selected").attr("data-value"));
        // 租赁期限
        var ymd_data = returnYearMonthDayData(startDate, endDate);
        // 总月数
        var totalMonth = ymd_data.year * 12 + ymd_data.month;
        // 总期数
        var totalCycle = returnNumber(totalMonth / cycleValue);
        // 余月
        var remainMonth = totalMonth % cycleValue;
        // 余日
        var remainDay = ymd_data.day;

        var html = '';
        if ($.contract.param.con_type == "托管合同") {
            for (var i = 0; i < totalCycle; i++) {
                var _startDate = new Date(startDate);
                var currentDate = new Date(_startDate.setMonth(_startDate.getMonth() + i));
                var agreeDate = new Date(_startDate.setDate(_startDate.getDate() + agreeValue));
                ;

                html += '<tr>';
                html += '	<td>' + i + '</td>';
//				html += '	<td></td>';
                // 首期
                if (i == 0 && i != (totalCycle - 1)) {
                    html += '<td>' + startPayDate + '</td>';
                    html += '<td>' + returnDate(currentDate) + '</td>';
                }
                // 中期
                if (i != 0 && i != (totalCycle - 1)) {
                    html += '<td>' + returnDate(agreeDate) + '</td>';
                    html += '<td>' + returnDate(currentDate) + '</td>';
                }
                // 尾期
                if (i != 0 && i == (totalCycle - 1)) {
                    html += '<td>' + returnDate(agreeDate) + '</td>';
                    html += '<td>' + returnDate(currentDate) + '</td>';
                }
                html += '</tr>';
            }
        }
        if ($.contract.param.con_type == "租赁合同") {
            for (var i = 0; i < totalCycle; i++) {
                var _startDate = new Date(startDate);
                var currentDate = new Date(_startDate.setMonth(_startDate.getMonth() + i));
                var agreeDate = new Date(_startDate.setDate(_startDate.getDate() + agreeValue));
                ;

                html += '<tr>';
                html += '	<td>' + i + '</td>';
//				html += '	<td></td>';
                // 首期
                if (i == 0 && i != (totalCycle - 1)) {
                    html += '<td>' + startPayDate + '</td>';
                    html += '<td>' + returnDate(currentDate) + '</td>';
                }
                // 中期
                if (i != 0 && i != (totalCycle - 1)) {
                    html += '<td>' + returnDate(agreeDate) + '</td>';
                    html += '<td>' + returnDate(currentDate) + '</td>';
                }
                // 尾期
                if (i != 0 && i == (totalCycle - 1)) {
                    html += '<td>' + returnDate(agreeDate) + '</td>';
                    html += '<td>' + returnDate(currentDate) + '</td>';
                }
                html += '</tr>';
            }
        }

        $(".preview-box").remove();

        var box = '';
        box += '<div class="preview-box">';
        box += '	<div class="preview-box-mark">';
        box += '	</div>';
        box += '	<div class="preview-box-main">';
        box += '	    <div class="preview-box-close"><i class="fa-remove"></i></div>';
        box += '	    <div class="preview-box-title">合同账单预览</div>';
        box += '	    <div class="preview-box-list">';
        box += '	    	<table>';
        box += '	    		<thead>';
        box += '	    			<tr>';
        box += '	    				<th>期数</th>';
//		box += '	    				<th>金额</th>';
        box += '	    				<th>约定还款日期</th>';
        box += '	    				<th>最后还款日期</th>';
        box += '	    			</tr>';
        box += '	    		</thead>';
        box += '	    		<tbody>' + html + '</tbody>';
        box += '	    	</table>';
        box += '	    </div>';
        box += '	    <div class="preview-box-title">合同账单预览</div>';
        box += '	</div>';
        box += '</div>';
        var _box = $(box).appendTo($("body")).css({right: "-435px"}).animate({right: "0px"}, 300);

        // 事件-关闭预览
        _box.find(".preview-box-close").on("click", function () {
            $(".preview-box").animate({
                right: "-435px"
            }, function () {
                $(this).remove();
            });
        });
        // 事件-关闭预览
        _box.find(".preview-box-mark").on("click", function () {
            $(".preview-box").animate({
                right: "-435px"
            }, function () {
                $(this).remove();
            });
        });

//		var startDate = $("#conOpenDate").val();
//		var endDate = $("#conEndDate").val();
//		if (isEmpty(startDate) || isEmpty(endDate)) {
//			return;
//		}
//		$.ajax({
//			type : 'POST',
//			url : '/contractObject/calBillDate',
//			data : {
//				startDate : startDate,
//				endDate : endDate,
//				monthCount : _monthCount
//			},
//			dataType : 'json',
//			beforeSend : function() {
//				$("#everyPayDate").html('<div class="loading"></div>');
//			}
//		}).done(function(result) {
//			if (result.code == 200) {
//				$("#everyPayDate").empty();
//				$.each(result.data, function(index, data) {
//					var i = index + 1;
//					if(i > 70){
//						return false;
//					}
//					if ($.contract.param.con_type == "托管合同") {
//						$("#everyPayDate").append('<label class="form-box">' + '<span class="form-span">' + (i <= 9 ? '0' + i : i) + '、</span>' + '<input type="text" class="form-control" readonly="readonly" value="' + (index == 0 ? $("#conStartPayDate").val() : data) + '" id="conBillDate' + i + '" >' + '</label>');
//					}
//					if ($.contract.param.con_type == "租赁合同") {
//						$("#everyPayDate").append('<label class="form-box">' + '<span class="form-span">' + (i <= 9 ? '0' + i : i) + '、</span>' + '<input type="text" class="form-control" readonly="readonly" value="' + data + '" id="conBillDate' + i + '" >' + '</label>');
//					}
//				});
//			}
//		});
    };

    /** 合同-添加客户信息*/
    $.contract.add_customer = function (obj, mode, data) {
        mode = mode || "dynamic";

        var param = function () {
            var params = $("#customer-main").data("customers") || "";
            var cc_ids = [];
            $.each(params, function (index, data) {
                cc_ids.push(data.cc_id);
            });
            return cc_ids.length == 0 ? "" : JSON.stringify(cc_ids);
        };
        params = param();

        if (obj != null) {
            $(obj).openModel({
                title: "客户信息",
//				param : params,
                repeatClass: 'cc_id',
                done: function (result) {
                    $("#contacts-main").load_customer(result, mode);
                }
            });
        }
        if (data != null) {
            $("#contacts-main").load_customer(data, mode);
        }
    };

    /** 合同-加载客户信息*/
    $.fn.load_customer = function (data, mode) {
        var self = this;
        var isData = data != null;
        var content = null;

        if (isData) {
            if (data.cc_name != null) {
                content = data.cc_name;
            }
            if (data.ccp_phone != null) {
                if (content == null) {
                    content = data.ccp_phone;
                } else {
                    content += "-" + data.ccp_phone;
                }
            }
            if (data.cc_cardNum != null) {
                if (content == null) {
                    content = data.cc_cardNum;
                } else {
                    content += "-" + data.cc_cardNum;
                }
            }
        }

        var html = '';
        html += '<div class="content-change" style="' + (mode == 'dynamic' ? "margin-bottom: 20px;" : "") + '">';
        html += '	<button class="content-change-main" title="选择主客户" style="flex: 1;text-align: left;">' + (content != null ? content : "选择主客户") + '</buttom>';
        if (isData) {
            html += '	<button class="content-change-image" title="查看图片"><i class="fa-image"></i><span class="buoy"></span></buttom>';
            html += '	<button class="content-change-edit" title="编辑"><i class="fa-pencil"></i></button>';
            html += '	<button class="content-change-refresh" title="刷新"><i class="fa-refresh"></i></button>';
        }
        if (mode == 'dynamic') {
            html += '	<button class="content-change-remove" title="移除"><i class="fa-remove"></i></button>';
        }
        html += '   <input type="hidden" name="cc_id" value="' + returnValue(isData ? data.cc_id : "") + '">';
        html += '</div>';
        if (mode == 'dynamic') {
            $(html).appendTo(self).find("[name=cc_id]").data("data", data);
        } else {
            $(self).html(html).find("[name=cc_id]").data("data", data);
        }

        // 初始化图片数据
        $(self).find(".content-change-image").find(".buoy").html(returnNumber(data != null ? data.customerImages.length : 0));

        // 事件-查看图片
        $(self).find(".content-change-image").on("click", function (e) {
            e.stopPropagation();
            var _this = $(this);
            $(".image-box").remove();

            var html = '';
            html += '<div class="image-box">';
            html += '	<i></i>';
            $.each(data.customerImages, function (index, data) {
                var title = '';
                switch (data.cci_type) {
                    case "CD1" :
                        title = '证件前面';
                        break;
                    case "CD2" :
                        title = '证件后面';
                        break;
                    default :
                        title = '证件照';
                        break;
                }
                html += '<div style="border: 1px solid #ddd;float:left;margin-right: 8px;">';
                html += '	<img src="' + data.cci_path + '" style="display: block;width: 120px;height:120px;" alt="' + title + '">';
                html += '	<div style="font-size: 12px;line-height: 26px;border-top: 1px solid #ddd;">' + title + '</div>';
                html += '</div>';
            });
            html += '</div>';
            _this.append(html).find(".image-box").css({
                width: 130 * data.customerImages.length + 10
            });

            $(document).on("click", function () {
                _this.find(".image-box").hide("fast", function () {
                    this.remove();
                });
            });
        });

        // 事件-选中客户
        $(self).find(".content-change-main").on("click", function () {
            var param = function () {
                var params = $("#customer-main").data("customers") || "";
                var cc_ids = [];
                $.each(params, function (index, data) {
                    cc_ids.push(data.cc_id);
                });
                return cc_ids.length == 0 ? "" : JSON.stringify(cc_ids);
            };
            params = param();

            $(this).openModel({
                title: "客户信息",
                param: params,
                repeatClass: 'cc_id',
                done: function (result) {
                    $(self).load_customer(result);
                }
            });
        });

        // 事件-编辑
        $(self).find(".content-change-edit").on("click", function () {
            window.parent.href_mo('/customer/customerEdit?cc_code=' + data.cc_code, "编辑客户", $("title").text());
        });

        // 事件-刷新
        $(self).find(".content-change-refresh").on("click", function () {
            var _this = $(this);
            $.ajax({
                type: "POST",
                url: "/contractObject/queryCustomerInfo",
                data: {
                    cc_code: data.cc_code
                },
                dataType: "json",
                beforeSend: function () {
                    _this.find(".i").addClass("animation-spin");
                }
            }).done(function (result) {
                if (result.code != 200) {
                    $.jBox.tip(result.msg);
                    return;
                }
                $(self).load_customer(result.data, mode);
            }).always(function () {
                _this.find(".i").removeClass("animation-spin");
            });
        });

        // 事件-移除客户
        $(self).find(".content-change-remove").on("click", function () {
            $(this).parents(".content-change").remove();
        });
    };

    /** 短租（1-3个月内）计算租金、押金*/
    $.contract.short_Rent = function () {
        // 托管合同结束日期距离当前日期小于3个月的，不属于短租期
        var tgDate = $("#houseContractInfo").html();
        if (null != tgDate && tgDate != undefined) {
            var tgDateArray = tgDate.split(" - ");
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
        var startDate = $("#conOpenDate").val();
        // 截止日期
        var endDate = $("#conEndDate").val();
        var contractLimit = returnYearMonthDayData(returnDate(startDate), returnDate(endDate));
        var limitYear = contractLimit.year;
        var limitMonth = contractLimit.month;
        var limitDay = contractLimit.day;
        if (limitYear <= 0 &&
            ((limitMonth >= 0 && limitMonth < 3) || (limitMonth == 3 && limitDay <= 0))) {
            return true;
        }
        return false;
    };

    /**定金算法:日租金 * 2 * 天数 去掉小数点 个位数抹掉 十位数小于5大于0整为5 大于五进一位十位数为0*/
    $.contract.moneys = function (money) {
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
    };

    // ---------------------------------------------

    /** 合同-提交数据*/
    $.contract.submit = function (obj) {
        var is_ok = true;
        $(".form-control[required]:visible").each(function () {
            if (isEmpty($(this).val())) {
                $(this).msg("不能为空");
                return is_ok = false;
            }
        });
        if (!is_ok) return;

        if ($.contract.param.con_type == "租赁合同") {
            if ($("#conPayType option:selected").val() == "月付" && $("[name=payType]:checked").length < 1) {
                $.jBox.tip("请选择合作平台");
                return;
            }
        }
        if ($.contract.param.con_type == "托管合同") {
            if (($("#conPayType").val() == "月付" || $("#conPayType").val() == "季付") && $("[name=payType]:checked").length < 1) {
                $.jBox.tip("请选择合作平台");
                return;
            }
        }
        if (returnFloat($("#conRent").val()) == 0) {
            $("#conRent").msg("租金不能为0");
            return;
        }
        if ($("img[name=HTZ]").length <= 0) {
            $.jBox.tip("请上传合同照");
            return;
        }
        if (isEmpty($("[name=contractor_id]").val())) {
            $("[name=contractor_phone]").msg("请选择主签约代表");
            return;
        }

        // 集成数据
        var data = {};

        var contractObject = {};
        contractObject.contractObject_Id = returnValue($.contract.param.contractObject_Id);
        contractObject.contractObject_Type = $.contract.param.con_type;
        contractObject.he_address = $("#he_address").val();
        contractObject.contractObject_No = $("#conno").val();
        contractObject.hi_code = $.contract.param.hi_code;
        contractObject.contractObject_Version = $("input[name='version']:checked").val();
        contractObject.contractObject_FillTime = $("#condate").val();
        contractObject.contractObject_Date = $("#conOpenDate").val();
        contractObject.contractObject_DeadlineTime = $("#conEndDate").val();
        contractObject.contractObject_Other = $("#conother").val();
        contractObject.contractObject_Successor = returnNumber($.contract.param.old_con_id);
        contractObject.contractObject_1st = $("[name=cc_id]:eq(0)").val();

        var peoNum = $("#peoNum").val();
        if (null != peoNum && undefined != peoNum) {

            contractObject.contractObject_PeopleNumber = peoNum;
        }

        // 提前接房
        if ($("input[name=forRentDate_box]").is(":checked")) {
            if (isEmpty($("#forRentDate").val())) {
                $("#forRentDate").after('<div class="msg-box" style="top: 14px;left: 280px;">不能为空</div>');
                $(".msg-box").on("click", function () {
                    $(this).remove();
                });
                $('html,body').animate({
                    scrollTop: $("#forRentDate").offset().top - 300
                }, 200);
                return;
            }
            var _data_forrentdate = new Date($("#forRentDate").val()).getTime();
            var _data_conOpenDate = new Date($("#conOpenDate").val()).getTime();
            if (_data_forrentdate >= _data_conOpenDate) {
                $("#forRentDate").after('<div class="msg-box" style="top: 14px;left: 280px;">提前接房日期只能小于合同起始日期</div>');
                $(".msg-box").on("click", function () {
                    $(this).remove();
                });
                $('html,body').animate({
                    scrollTop: $("#forRentDate").offset().top - 300
                }, 200);
                return;
            }
        }
        contractObject.contractObject_ForRentDate = $("[name=forRentDate_box]").is(":checked") ? $("#forRentDate").attr("data-forrentdate") : 0;
        contractObject.contractObject_RentFreeMode = $("#conPayType").val() == "打包年付" ? 1 : 0;
        contractObject.contractObject_Contractor = $("[name=contractor_id]").val();
        data.contractObject = JSON.stringify(contractObject);

        // 【合同主体】
        var contractBody = {};
        var addcon = "";
        var addConMoney = 0;
        // 增值保证金1
        var _addChe = $(".add-con:checked");
        _addChe.each(function (index) {
            addcon += $(this).val() + (index == (_addChe.length - 1) ? "" : ",");
            addConMoney += returnNumber($(this).attr("data-value"));
        });
        contractBody.contractBody_AdditionConditions = addcon;
        contractBody.contractBody_Use = $("#conUse option:selected").val();
        contractBody.contractBody_StartTOEnd = $("#conOpenDate").val() + "~" + $("#conEndDate").val();
        contractBody.contractBody_PayStyle = $("#conPayType").val();
        if ($.contract.param.con_type == "托管合同" && (contractBody.contractBody_PayStyle == "月付" || contractBody.contractBody_PayStyle == "季付")) {
            contractBody.contractBody_PayType = $("[name=payType]:checked").val();
        }
        if ($.contract.param.con_type == "租赁合同" && contractBody.contractBody_PayStyle == "月付") {
            contractBody.contractBody_PayType = $("[name=payType]:checked").val();
        }
        contractBody.contractBody_PayType = isEmpty(contractBody.contractBody_PayType) ? "管家婆" : contractBody.contractBody_PayType;
        contractBody.contractBody_StartPayTime = $("#conStartPayDate").val();
        contractBody.contractBody_Rent = $("#conRent").val();
        contractBody.contractBody_AgreedRepayTime = $("#conAgreeDate").val();

        var _contractBody_RentPlus = 0;
        var _contractBody_Pay = returnNumber($("#conPay").val());

        /** 托管合同*/
        if ($.contract.param.con_type == "托管合同") {
            // 租金加成
            var _rentplus = $(".rentPlus:visible").text();
            _contractBody_RentPlus = returnNumber($("#contractBody_RentPlus").val());
            if (_rentplus.indexOf("+") > -1) {
                _contractBody_RentPlus = _rentplus + _contractBody_RentPlus;
            } else if (_rentplus.indexOf("%") > -1) {
                _contractBody_RentPlus = _contractBody_RentPlus + _rentplus;
            }
            contractBody.contractBody_TimeLimit = $("input[name='conLimit']:checked").val() + "年";
            // 租金递增
            var _conIncreasing = "";
            var _findList = $("#conIncreasing").find(".form-control");
            _findList.each(function (index) {
                var _thisVal = returnFloat($(this).val());
                _conIncreasing += _thisVal + ($("#conIncreasingCustom").attr("data-type") == '自定义' ? "" : "%") + (index == (_findList.length - 1) ? "" : "|");
            });
            contractBody.contractBody_Increasing = _conIncreasing;
            // 包修费
            var _guaranteecost = "";
            var _findList = $("#guaranteecost").find(".form-control");
            _findList.each(function (index) {
                var _thisVal = returnNumber($(this).val());
                if (_findList.length == (index + 1)) {
                    _guaranteecost += _thisVal > 0 ? _thisVal : "0";
                } else {
                    _guaranteecost += _thisVal + "|";
                }
            });
            contractBody.contractBody_guaranteecost = _guaranteecost;
            // 免租期
            var _conFreeDate = "";
            var _findList = $("#conFreeDate").find(".form-control");
            var _len = _findList.length;
            _findList.each(function (index) {
                _conFreeDate += returnNumber($(this).val()) + (_len == (index + 1) ? "" : "|");
            });
            contractBody.contractBody_FreeTime = _conFreeDate;
            // 账单生成方式
            contractBody.contractBody_BillWay = $("#conBillWay").val();
        }
        /** 租赁合同 */
        if ($.contract.param.con_type == "租赁合同") {
            contractBody.contractBody_TimeLimit = $("#conLimit").val() + "个月";
            if ($("#conPayType option:selected").val() == "月付") {
                _contractBody_RentPlus = returnNumber($("#contractBody_RentPlus").val());
                _contractBody_RentPlus = _contractBody_RentPlus + returnValue($("#contractBody_RentPlus").attr("data-type"));
            }
        }
        contractBody.contractBody_RentPlus = _contractBody_RentPlus;
        contractBody.contractBody_Pay = _contractBody_Pay;
        contractBody.contractBody_Depslit = $("#conDepslit").val();
        contractBody.contractBody_Service = $("#conService").val();
        contractBody.contractBody_PayTime = $("#conOpenDate").val();
        contractBody.contractBody_BillTime = $("#conOpenDate").val();
        contractBody.contractBody_Remark = $("#conRemark").val();
        contractBody.contractBody_GjName = $("input[name=em_name]").val();
        contractBody.contractBody_GjPhone = $("input[name=em_phone]").val();
        contractBody.contractBody_RentRate_A = returnNumber($("#A_rate").val());
        contractBody.contractBody_RentRate_B = returnNumber($("#B_rate").val());
        contractBody.contractBody_Id = $.contract.param.contractBody_Id;
        data.contractBody = JSON.stringify(contractBody);

        // 【合同客户关系数据】
        var customerInfos = [];
        var cc_boo = true;
        $("[name=cc_id]").each(function (index) {
            if (index == 0) {
                var cc_data = $(this).data("data");
                if (cc_data == null) {
                    $.jBox.tip("请选择客户信息");
                    return cc_boo = false;
                }
                if (cc_data.cc_name == null) {
                    $.jBox.tip("客户姓名不能为空");
                    return cc_boo = false;
                }
                if (cc_data.ccp_phone == null) {
                    $.jBox.tip("客户电话不能为空");
                    return cc_boo = false;
                }
                if (cc_data.cc_cardNum == null) {
                    $.jBox.tip("客户证件不能为空");
                    return cc_boo = false;
                }
                if (cc_data.customerImages.length < 1) {
                    $.jBox.tip("请上传客户证件照");
                    return cc_boo = false;
                }
            }
            var customerInfo = {};
            customerInfo.cc_id = $(this).val();
            customerInfo.crc_role = index == 0 ? 0 : 1;
            customerInfos.push(customerInfo);
        });
        if (!cc_boo) return;
        data.customers = JSON.stringify(customerInfos);

        // 【合同管家关系数据】
        var employeeList = [];
        var perfor_total = 0;
        $("[name^=em_id]").each(function (index) {
            var employee = {};
            employee.em_id = returnNumber($(this).val());
            if (isEmpty(employee.em_id)) {
                return true;
            }
            employee.cre_role = returnNumber($(this).data().type);
            employee.contract_perforSplit = returnFloat($("input[name^=contract_perforSplit]:eq(" + index + ")").val());
            employeeList.push(employee);

            perfor_total += returnFloat(employee.contract_perforSplit);
        });
        if (perfor_total != 100) {
            $.jBox.tip("管家业绩分成总和必须是100%");
            return;
        }
        data.employeeList = JSON.stringify(employeeList);

        // 【合同图片数据】
        var contractImages = [];
        $(".showboxImg").each(function () {
            var contractImage = {};
            contractImage.ci_type = this.name;
            contractImage.ci_path = this.src;
            contractImages.push(contractImage);
        });
        data.contractImages = JSON.stringify(contractImages);

        data.old_contractObject_No = returnValue($.contract.param.old_con_no);
        data.option = getUrlParam("option");
        data.mode = $.contract.param.mode.replace("ZL", "").replace("TG", "");

        // 提交数据
        $.ajax({
            type: "POST",
            url: "/contractObject/contractObjectSave",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $.jBox.tip("数据保存中", "loading");
                $("#saveContract").attr("disabled", "disabled");
            }
        }).done(function (result) {
            if (result.code != 200) {
                $.jBox.tip(result.msg, "error");
                return;
            }
            $.jBox.closeTip();
            saveSeccuss(result.data);
        }).fail(function () {
            $.jBox.tip("数据提交失败，请重试或联系管理员", "error");
        }).always(function () {
            $("#saveContract").removeAttr("disabled");
        });
    };

})(jQuery);

//
;(function ($) {
    $.load_contract_view = function (type) {
        var html = '';
        html += '';
        html += '<div class="box-nav">';
        html += '	<a class="nav-tab nav-tab-focus" href="javascript:;">托管合同</a>';
        html += '</div>';
        html += '<div class="box-content">';
        html += '	<div class="sub-title"><ul class="title-nav"><li class="visited">客户信息</li></ul></div>';
        html += '	<div class="sub-content">';
        html += '		<dl class="main-box-list">';
        html += '			<dt class="item"><em>*</em>主客户</dt>';
        html += '			<dd class="item" id="customer-main" style="min-width: inherit;"></dd>';
        html += '			<dd class="tisp"></dd>';
        html += '		</dl>';
        html += '		<hr>';
        html += '		<dl class="main-box-list">';
        html += '			<dt class="item">联系人</dt>';
        html += '			<dd class="item" id="contacts-main" style="min-width: inherit;"></dd>';
        html += '			<dd class="tisp" style="clear: none;float: left;margin-left: 10px;">';
        html += '				<button class="form-input" onclick="$.contract.add_customer(this, \'dynamic\');">添加联系人</button>';
        html += '			</dd>';
        html += '		</dl>';
        html += '		<hr>';
        html += '	</div>';
        html += '	<div class="sub-title">';
        html += '		<ul class="title-nav">';
        html += '			<li class="visited">合同信息</li>';
        html += '		</ul>';
        html += '	</div>';
        html += '	<div class="sub-content">';
        html += '		<select class="form-control" id="conUse" style="display: none;"><option value="综合" selected>综合</option></select>';
        html += '		<dl class="main-box-list">';
        html += '			<dt class="item"><span class="item-titile">合同版本</span></dt>';
        html += '			<dd class="item">';
        html += '				<label class="common-radio common-radio-checked">精装版<input type="radio" name="version" value="精装版" checked></label>';
        html += '				<label class="common-radio common-radio-disabled">清水版<input type="radio" name="version" value="清水版" disabled></label>';
        html += '				<label class="more-tip-error qs_version"></label>';
        html += '			</dd>';
        html += '			<dd class="tisp"></dd>';
        html += '		</dl>';
        html += '		<hr>';
        html += '		<dl class="main-box-list">';
        html += '			<dt class="item"><em>*</em><span class="item-titile">合同编号</span></dt>';
        html += '			<dd class="item"><input type="text" class="form-control" id="conno" placeholder="合同编号" maxlength="10" required></dd>';
        html += '			<dd class="tisp error">如果合同编号重复，请仔细核对合同编号或者咨询管理员</dd>';
        html += '		</dl>';
        html += '		<hr>';
        html += '		<dl class="main-box-list" id="show-item-table" style="display: none;">';
        html += '			<dt class="item"><span class="item-titile" style="color: #E74C3C">已存在合同</span></dt>';
        html += '			<dd class="item">';
        html += '				<table class="item-table">';
        html += '					<thead><tr><th>#</th><th>合同编号</th><th>房号</th><th>操作人</th></tr></thead>';
        html += '					<tbody id="item-table-cnoList"></tbody>';
        html += '				</table>';
        html += '			</dd>';
        html += '			<dd class="tisp"></dd>';
        html += '		</dl>';
        html += '		<hr>';
        html += '		<!-- 小区房号 -->';
        html += '		<dl class="main-box-list">';
        html += '			<dt class="item"><span class="item-titile">小区房号</span></dt>';
        html += '			<dd class="item">';
        html += '				<input type="text" class="form-control" id="conhouseno" placeholder="小区房号" style="width: 300px;" readonly disabled>';
        html += '				<label class="house-hint"></label>';
        html += '			</dd>';
        html += '			<dd class="tisp"></dd>';
        html += '		</dl>';
        html += '		<hr>';
        html += '		<!-- 产权地址 -->';
        html += '		<dl class="main-box-list">';
        html += '			<dt class="item"><em>*</em><span class="item-titile">产权地址</span></dt>';
        html += '			<dd class="item">';
        html += '				<input type="text" class="form-control" id="he_address" placeholder="产权地址" style="width: 300px;" required>';
        html += '			</dd>';
        html += '			<dd class="tisp"></dd>';
        html += '		</dl>';
        html += '		<hr>';
        html += '		<!-- 托管期限 -->';
        html += '		<dl class="main-box-list main-box-list2">';
        html += '			<dt class="item"><em>*</em><span class="item-titile">合同期限</span></dt>';
        html += '			<dd class="item" id="contractLimitList-box"></dd>';
        html += '			<dd class="tisp"></dd>';
        html += '		</dl>';
        html += '		<hr>';
        html += '		<dl class="main-box-list">';
        html += '			<dt class="item"><em>*</em><span class="item-titile">合同起止日期</span></dt>';
        html += '			<dd class="item">';
        html += '				<input type="text" class="form-control" id="conOpenDate" placeholder="开始日期" readonly required>';
        html += '				<label class="suffix">至</label>';
        html += '				<input type="text" class="form-control" id="conEndDate" placeholder="结束日期" readonly required>';
        html += '				<label id="startEndDate" class="suffix"></label>';
        html += '				<label class="common-borderbox"><input type="checkbox" name="forRentDate_box">提前接房</label>';
        html += '			</dd>';
        html += '			<dd class="item" style="padding: 10px 0 14px;width: 100%;min-height: 28px;margin-left: 130px;">';
        html += '				<div class="prop_box" style="display: none;">';
        html += '					<label class="suffix">接房日期</label>';
        html += '					<input type="text" class="form-control" id="forRentDate" placeholder="接房日期" readonly>';
        html += '					<label class="suffix">招租期</label>';
        html += '					<label class="suffix forRentDate error" style="margin: 0;font-weight: 600;">0</label>';
        html += '					<label class="suffix">天</label>';
        html += '					<hr>';
        html += '					<label class="error" style="margin-left: 75px;line-height: 28px;">招租期内不会给房东计算租金</label>';
        html += '					<hr>';
        html += '				</div>';
        html += '			</dd>';
        html += '		</dl>';
        html += '		<hr>';
        html += '		<dl class="main-box-list">';
        html += '			<dt class="item"><em>*</em><span class="item-titile">签订日期</span></dt>';
        html += '			<dd class="item">';
        html += '				<input type="text" class="form-control" id="condate" placeholder="点击选择签订日期" readonly required>';
        html += '			</dd>';
        html += '			<dd class="tisp"></dd>';
        html += '		</dl>';
        html += '		<dl class="main-box-list">';
        html += '			<dt class="item"><em>*</em><span class="item-titile">首付租金日期</span></dt>';
        html += '			<dd class="item">';
        html += '				<input type="text" class="form-control" id="conStartPayDate" placeholder="点击选择首付租金日期" readonly required>';
        html += '			</dd>';
        html += '			<dd class="tisp"></dd>';
        html += '		</dl>';
        html += '		<hr>';
        html += '		<dl class="main-box-list">';
        html += '			<dt class="item"><span class="item-titile">付款方式</span></dt>';
        html += '			<dd class="item">';
        html += '				<select class="form-control" id="conPayType" onchange="$.contract.change_type(this);"></select>';
        html += '				<div class="rentplus-box">';
        html += '					<ul class="form-control ul-select">';
        html += '						<li class="option-plus rentPlus" onclick="$(\'.option-prop\').show();$(this).hide();" style="display: none">+</li>';
        html += '						<li class="option-content">';
        html += '							<input type="text" class="form-control number" id="contractBody_RentPlus" value="100" maxlength="3" placeholder="租金加成" style="width: 80px; border: none; height: 32px;border-radius: 2px;">';
        html += '						</li>';
        html += '						<li class="option-prop rentPlus" onclick="$(\'.option-plus\').show();$(this).hide();">%</li>';
        html += '					</ul>';
        html += '					<label class="suffix">元</label>';
        html += '				</div>';
        html += '			</dd>';
        html += '			<dd class="tisp"></dd>';
        html += '		</dl>';
        html += '		<hr>';
        html += '		<dl class="main-box-list" id="conRent-box">';
        html += '			<dt class="item"><em>*</em><span class="item-titile">租金</span></dt>';
        html += '			<dd class="item">';
        html += '				<input type="text" class="form-control money" id="conRent" onchange="$.contract.compute_totalRent();" placeholder="月租金" maxlength="11" required>';
        html += '				<label class="suffix">元/月</label>';
        html += '				<div id="totalRent" class="toolbox">';
        html += '					<span class="toolbox-title">';
        html += '						总租金';
        html += '						<i class="icon-info-sign" title="该总租金不包含其他费用（服务费、保证金等）" style="position: absolute; top: 2px; right: 2px;"></i>';
        html += '					</span>';
        html += '					<span class="toolbox-value">0</span>';
        html += '					<span class="toolbox-suffix">元</span>';
        html += '				</div>';
        html += '				<button class="form-input" onclick="$.contract.show_bill_list();"><i class="fa-list-ul" style="margin-right: 4px;"></i>预览账单</button>';
        html += '			</dd>';
        html += '			<dd class="tisp"></dd>';
        html += '		</dl>';
        html += '		<hr>';
        html += '		<dl class="main-box-list">';
        html += '			<dt class="item"><em>*</em><span class="item-titile">约定付款日</span></dt>';
        html += '			<dd class="item">';
        html += '				<input type="hidden" id="hiddenConAgreeDate">';
        html += '				<select class="form-control" id="conAgreeDate" required></select>';
        html += '			</dd>';
        html += '			<dd class="tisp"></dd>';
        html += '		</dl>';
        html += '		<hr>';
        html += '		<!-- 保证金 -->';
        html += '		<dl class="main-box-list">';
        html += '			<dt class="item"><em>*</em><span class="item-titile">保证金</span></dt>';
        html += '			<dd class="item">';
        html += '				<input type="text" class="form-control number" id="conPay" placeholder="保证金" maxlength="11" required>';
        html += '				<label class="suffix">元</label>';
        html += '			</dd>';
        html += '			<dd class="tisp"></dd>';
        html += '		</dl>';
        html += '		<!-- 定金 -->';
        html += '		<dl class="main-box-list">';
        html += '			<dt class="item"><span class="item-titile">定金</span></dt>';
        html += '			<dd class="item">';
        html += '				<input type="text" class="form-control number" id="conDepslit" maxlength="11" placeholder="定金">';
        html += '				<label class="suffix">元</label>';
        html += '			</dd>';
        html += '			<dd class="tisp"></dd>';
        html += '		</dl>';
        html += '		<hr>';
        html += '		<!-- 免租期（天/年） -->';
        html += '		<dl class="main-box-list">';
        html += '			<dt class="item"><span class="item-titile">免租期</span></dt>';
        html += '			<dd class="item">';
        html += '				<div id="conFreeDate" class="input-box">';
        html += '					<input type="text" class="form-control number" placeholder="每年" value="15" maxlength="3">';
        html += '				</div>';
        html += '				<label class="suffix">天/年</label>';
        html += '			</dd>';
        html += '			<dd class="tisp"></dd>';
        html += '		</dl>';
        html += '		<hr>';
        html += '		<!-- 租金递增 -->';
        html += '		<dl class="main-box-list">';
        html += '			<dt class="item"><span class="item-titile">租金递增</span></dt>';
        html += '			<dd class="item">';
        html += '				<div id="conIncreasing" class="input-box">';
        html += '					<input type="text" class="form-control money" placeholder="每年(默认0不递增)" value="0" maxlength="6">';
        html += '				</div>';
        html += '				<button class="conIncreasing-convert ok-bg" id="conIncreasingCustom" onclick="custom(this)" data-type="百分比">%<i class="icon-retweet"></i></button>';
        html += '			</dd>';
        html += '			<dd class="tisp"></dd>';
        html += '		</dl>';
        html += '		<hr>';
        html += '		<!-- 包修费 -->';
        html += '		<dl class="main-box-list">';
        html += '			<dt class="item"><span class="item-titile">包修费</span></dt>';
        html += '			<dd class="item">';
        html += '				<div id="guaranteecost" class="input-box"></div>';
        html += '				<label class="suffix">元/年</label>';
        html += '			</dd>';
        html += '			<dd class="tisp"></dd>';
        html += '		</dl>';
        html += '		<hr>';
        html += '		<!-- 管理费 -->';
        html += '		<dl class="main-box-list" id="jz-glf">';
        html += '			<dt class="item"><span class="item-titile">管理费</span></dt>';
        html += '			<dd class="item">';
        html += '				<input type="text" class="form-control minusNumber" id="conService" placeholder="管理费" maxlength="11">';
        html += '				<label class="suffix">元/年</label>';
        html += '			</dd>';
        html += '			<dt class="item"><span class="item-titile">超额租金分成</span></dt>';
        html += '			<dd class="item">';
        html += '				<label onclick="$(\'#A_rate\').focus().select();" style="position: absolute; top: -10px; left: 6px; font-size: 12px; color: #A9A9A9; background: #fff; padding: 0 2px;">甲方</label>';
        html += '				<input type="text" class="form-control number" id="A_rate" value="0" onkeyup="isEmpty($(this).val())?$(\'#B_rate\').val(\'\'):$(\'#B_rate\').val(100-returnNumber($(this).val()))" maxlength="3" style="width: 75px; text-align: center;">';
        html += '				<label class="suffix">%</label>';
        html += '				<label onclick="$(\'#B_rate\').focus().select();" style="position: absolute; top: -10px; left: 112px; font-size: 12px; color: #A9A9A9; background: #fff; padding: 0 2px;">管家婆</label>';
        html += '				<input type="text" class="form-control number" id="B_rate" value="100" onkeyup="isEmpty($(this).val())?$(\'#A_rate\').val(\'\'):$(\'#A_rate\').val(100-returnNumber($(this).val()))" maxlength="3" style="width: 75px; text-align: center;">';
        html += '				<label class="suffix">%</label>';
        html += '			</dd>';
        html += '			<dd class="tisp error">乙方每年度第一次付租时一次性收取，若第一次支付周期不足以收取管理费额，剩余部分则延至下一个支付周期。</dd>';
        html += '		</dl>';
        html += '		<hr>';
        html += '		<dl class="main-box-list" id="limitBox" style="display: none;">';
        html += '			<dt class="item"><span class="item-titile"></span></dt>';
        html += '			<dd class="item" style="width: 500px; border: 1px solid #ddd;">';
        html += '				<table style="width: 100%;">';
        html += '					<thead>';
        html += '						<tr>';
        html += '							<th width="25%" style="height: 30px; line-height: 30px;">委托期限</th>';
        html += '							<th width="25%" style="height: 30px; line-height: 30px;">免租期</th>';
        html += '							<th width="25%" style="height: 30px; line-height: 30px;">月租金</th>';
        html += '							<th width="25%" style="height: 30px; line-height: 30px;">租金递增</th>';
        html += '						</tr>';
        html += '					</thead>';
        html += '					<tbody id="limitList"></tbody>';
        html += '				</table>';
        html += '			</dd>';
        html += '			<dd class="tisp"></dd>';
        html += '		</dl>';
        html += '		<hr>';
        html += '	</div>';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '	';
        html += '';
        html += '';
        html += '';
        html += '';
        html += '';
        html += '';
        html += '';
        html += '';
        html += '';
        html += '';
        html += '';
        html += '';
        html += '';
        html += '';
        html += '';
        html += '';
        html += '';
        html += '';
        html += '';
        html += '';
        html += '';
        html += '';
        html += '';
        html += '';
        html += '';
        html += '';
        html += '';
        html += '';
        html += '';
        html += '';
        html += '';
        html += '';
        html += '';
        html += '';
        html += '';
        html += '';
        html += '';
        html += '';
        html += '';
        html += '';
        html += '';
        html += '';
        html += '';
        html += '';
        html += '';
        html += '';
        html += '';
//		$(html).appendTo("body");
    };
})(jQuery);

/********************************************************/

/** 免租期/租金递增自定义
 * @obj 对象
 * @param 参数
 * @init 是否有初始化值
 * */
function btnZdy(param, init) {
    var _box = $("#" + param);
    // 起始日期
    var startDate = $("#conOpenDate").val();
    // 截止日期
    var endDate = $("#conEndDate").val();
    var ymd = returnYearMonthDayData(returnDate(startDate), returnDate(endDate));
    var limit = ymd.year + (ymd.month > 0 || ymd.day > 0 ? 1 : 0);
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
    var _style = limit > 1 ? 'width: 64px;text-align: center;margin-left: 24px' : '';
    var currentCount = _box.find(".form-control").length;
    if (limit > currentCount) {
        for (var i = currentCount; i < limit; i++) {
            _box.append('<input type="text" class="form-control number" value="' + returnNumber(!isEmpty(init) ? value[i] : 0) + '" maxlength="3" style="' + _style + '">');
        }
        if (_box.find(".form-control").length > 1) {
            _box.find(".form-control:eq(0)").css({
                width: "64px",
                textAlign: "center",
                marginLeft: "0",
            });
        }
    } else {
        for (var i = currentCount; i > limit; i--) {
            _box.find('.form-control:eq(' + (i - 1) + ')').remove();
        }
        if (_box.find(".form-control").length == 1) {
            _box.find(".form-control:eq(0)").css({
                width: "auto",
                textAlign: "left",
            });
        }
    }
}

/** 租金递增--自定义 */
function custom(obj) {
    var _this = $(obj);
    switch (_this.attr("data-type")) {
        case '百分比':
            _this.html('元/月<i class="icon-retweet"></i>')
            .removeClass("ok-bg")
            .addClass("next-bg")
            .attr("data-type", '自定义');
            break;
        case '自定义':
            _this.html('%<i class="icon-retweet"></i>')
            .removeClass("next-bg")
            .addClass("ok-bg")
            .attr("data-type", '百分比');
            break;
    }
    $("#conIncreasing").find("input:eq(0)").select();
}

/********************************************************/

/** 打包年付*/
function changeRendModel(mode) {
    var check = $("#conPayType");
    if (mode == 1) {
        check.val("打包年付");
    }
    var parent_box = $("#conRent-box");
    var _rent = $("#conRent");
    var rent = $("#conRent").val();

    if (check.val() == "打包年付") {
        check.attr("data-cache-rent", rent);
        // 初始化付款方式
        if (isEmpty(rent)) {
            showPayDate("update");
            changeRentPlus($(this));
        }
        $("#contractBody_RentPlus").val(100).attr("disabled", "disabled");

        // 初始化提示内容
        parent_box.find(".item-titile").text("打包租金").addClass("error");
        parent_box.find(".suffix").text("元/年").addClass("error");
        _rent.attr("placeholder", "打包租金");
    } else {
        var cache_rent = check.attr("data-cache-rent") || rent;
        $("#conPayType").removeAttr("disabled");
        $("#contractBody_RentPlus").removeAttr("disabled");

        parent_box.find(".item-titile").text("租金").removeClass("error");
        parent_box.find(".suffix").text("元/月").removeClass("error");
        _rent.attr("placeholder", "月租金").val(cache_rent);
    }
}

/** 租金加成*/
function changeRentPlus(obj) {
    $(".option-plus").hide();
    $(".option-prop").show();
    switch ($(obj).find("option:selected").val()) {
        case "月付":
            $(".option-plus").show();
            $(".option-prop").hide();
            $("#contractBody_RentPlus").val(50);
            break;
        case "季付":
            $("#contractBody_RentPlus").val(100);
            break;
        case "半年付":
            $("#contractBody_RentPlus").val(100);
            break;
        case "年付":
            $("#contractBody_RentPlus").val(100);
            break;
    }
}

/** 付租日期*/
function showPayDate(param) {
    var selectData = $("#conPayType option:selected").attr("data-value");
    var _startVal = $("#conOpenDate").val();
    var _endVal = $("#conEndDate").val();
    if (isEmpty(_startVal) || isEmpty(_endVal)) {
        return;
    }
    // 后台请求账单周期
    $.ajax({
        type: "POST",
        url: "/contractObject/calBillDate",
        data: {
            startDate: _startVal,
            endDate: _endVal,
            monthCount: selectData
        },
        dataType: "json"
    }).done(function (result) {
        if (result.code == 200) {
            $("#everyPayDate").empty();
            $.each(result.data, function (index, data) {
                var i = index + 1;
                if ($.contract.param.con_type == "托管合同") {
                    $("#everyPayDate").append('<label class="form-box">' + '<span class="form-span">' + (i <= 9 ? '0' + i : i) + '、</span>' + '<input type="text" class="form-control" readonly="readonly" value="' + (index == 0 ? $("#conStartPayDate").val() : data) + '" id="conBillDate' + i + '" >' + '</label>');
                }
                if ($.contract.param.con_type == "租赁合同") {
                    $("#everyPayDate").append('<label class="form-box">' + '<span class="form-span">' + (i <= 9 ? '0' + i : i) + '、</span>' + '<input type="text" class="form-control" readonly="readonly" value="' + data + '" id="conBillDate' + i + '" >' + '</label>');
                }
            });
            if (isEmpty(param)) {
                if ($.contract.param.con_type == "托管合同") {
//					var datec = returnNumber(result.msg);
//					var year = "";
//					var month = "";
//					if (datec >= 12) {
//						year = Math.floor(datec / 12) + "年";
//					}
//					if (datec % 12 > 0) {
//						month = datec % 12 + "月";
//					}
//					$.each($("input[name=conLimit]"), function(index, data) {
//						if ($(this).val() == Math.ceil(datec / 12)) {
//							$("input[name=conLimit]").removeAttr("checked").parent().removeClass("common-radio-checked");
//							$(this).attr("checked", "checked").parent().addClass("common-radio-checked");
//						}
//					});
//					$("#startEndDate").html(returnBusinessYMD($("#conOpenDate").val(), $("#conEndDate").val())).fadeIn();
//
//					// 免租期
//					btnZdy('conFreeDate');
//					// 租金递增自定义
//					btnZdy('conIncreasing');
//					// 包修费
//					btnZdy('guaranteecost');
                }
                if ($.contract.param.con_type == "租赁合同") {
                    $("#conLimit").val(result.msg);
                }
            }
        }
    });
}

/********************************************************/

/** 保存成功*/
function saveSeccuss(data) {
    $(".box-content").hide();
    $("#main-hint").show();
    var html = "";
    html += '<a href="/contractObject/jumpItemAdd?contractObject_No=' + data.contractObject_Code + '&hicode=' + $.contract.param.hi_code + '">物品添置</a>';
    if (data.contractObject_ExtState == 12 || data.contractObject_ExtState == 22) {
        html += '<button onclick="submitContractAuditing(this,\'' + data.contractObject_Code + '\')">提交审核</button>';
    } else {
        html += '<a href="javascript:;" onclick="submitHandover(\'' + data.contractObject_Code + '\')">物业交接</a>';
        if (data.contractObject_OptionState.indexOf("未通过") > -1) {
            html += '<button onclick="submitContractAuditing(this,\'' + data.contractObject_Code + '\')">提交审核</button>';
        }
    }
    html += '<a href="/contractObject/contractObjectList" style="background: #ddd;">返回列表</a>';

    $("#hint-box-a").html(html);
}

/** 物业交接*/
function submitHandover(con_code) {
    $.ajax({
        type: 'post',
        url: '/contractObject/queryUpContractForRentOrder',
        data: {
            con_code: con_code
        },
        dataType: 'json',
        beforeSend: function () {
            $.jBox.tip("请稍候，数据请求中..", "loading");
        }
    }).done(function (result) {
        if (result.code != 200) {
            $.jBox.tip(result.msg, "error");
            return;
        }
        $.jBox.closeTip();
        //
        var cancelContract = result.data.cancelContract;
        if (!isEmpty(cancelContract) && cancelContract.cco_applicationType == '转租') {
            if (cancelContract.cco_state == '完成') {
                window.parent.href_mo('/transferKeep/transfer?mode=normal&con_code=' + con_code, '物业交接', $.contract.param.title);
            } else {
                $.jBox.confirm("该合同有转租交接结算未处理，是否需要立即处理？", "提示", function (v, h, f) {
                    if (v) {
                        window.parent.href_mo('/transferKeep/transfer?mode=compary&con_code=' + cancelContract.contractObject_Code, '交接结算', $.contract.param.title);
                    }
                    return true;
                }, {
                    buttons: {
                        '立即处理': true,
                        '暂不处理': false
                    }
                });
            }
        } else {
            window.parent.href_mo('/transferKeep/transfer?mode=normal&con_code=' + con_code, '物业交接', $.contract.param.title);
        }
    });
}

/** 提交审核*/
function submitContractAuditing(obj, param) {
    $.ajax({
        type: "POST",
        url: "/contractObject/submitContractAuditing",
        data: {
            con_code: param
        },
        dataType: "json",
        beforeSend: function () {
            $.jBox.tip("提交中...", "loading");
            $(obj).attr("disabled", "disabled");
        }
    }).done(function (result) {
        if (result.code == 200) {
            $.jBox.tip("提交成功", "success");
            window.location.href = "/contractObject/contractObjectList";
        } else {
            $.jBox.tip(result.msg, "error");
        }
    }).always(function () {
        $(obj).removeAttr("disabled");
    });
}

/** 改变合同类型*/
function changeType(obj) {
    if ($.contract.param.con_type == '托管合同') {
        var version = $(obj).val();
        $("#jz-glf").hide();
        $(".qs_version").hide().text("");
        $("#conFreeDate").parent().siblings(".tisp").removeClass("error").empty();
        $("#conIncreasing").parent().siblings(".tisp").removeClass("error").empty();
        $("#conService").val(0);
        $(".rentplus-box").show();
        if ("普通版" == version) {
            $(".rentplus-box").hide();
        }
        if ("精装版" == version) {
            $("#jz-glf").show();
        }
        if ("清水版" == version) {
            $("input[name='conLimit']").eq(4).click();
            $("#conFreeDate").attr("readonly", "readonly").removeAttr("required");
            $(".qs_version").text("清水分期装修合同").fadeIn();
        }
    }
    if ($.contract.param.con_type == '租赁合同') {
        if ($(obj).val() == "58分期" && $(obj).is(":checked")) {
            var cc_id = $("input[name=cc_id]").val();
            if (isEmpty(cc_id)) {
                swal({
                    title: "请先选择客户",
                    text: "",
                    type: "warning"
                }, function () {
                    $(obj).removeAttr('checked');
                    $(obj).parent().removeClass("span-checked");
                    $("#sign-carNo").focus();
                });
                return;
            } else {
                // 18-40
                var cc_data = $("input[name=cc_id]").data("data");
                if (!isEmpty(cc_data)) {
                    var age = returnNumber(getAgeByCard(cc_data.cc_cardNum));
                    if (age < 18 || age > 45) {
                        swal({
                            title: "客户年龄必须在18岁至45岁之间",
                            text: "",
                            type: "warning"
                        }, function () {
                            $(obj).removeAttr('checked');
                            $(obj).parent().removeClass("span-checked");
                        });
                        return;
                    }
                }
            }
        }
    }
    var _name = $(obj).attr("name");
    $("input[type='checkbox'][name='" + _name + "']").not($(obj)).removeAttr('checked');
    $("input[name='" + _name + "']").parent().removeClass("span-checked");
    if ($(obj).is(":checked")) {
        $(obj).parent().addClass("span-checked");
    }
}
