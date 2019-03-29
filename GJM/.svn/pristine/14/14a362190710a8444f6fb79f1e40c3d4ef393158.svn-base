$(function () {
    $.contract();
});

/**
 * 1.选择客户
 */
;(function ($) {
})(jQuery);

/**
 * 2.编辑合同
 */
;(function ($) {

    /** 合同-初始化*/
    $.contract = function () {
        // 初始化参数
        $.contract.init_param();
        // 初始化数据
        $.contract.init_data();
        // 初始化事件
        $.contract.init_event();

        //关闭窗口
        $('.cd-popup-close').on('click', function (event) {
            event.preventDefault();
            $(".cd-popup3").removeClass('is-visible3');
        });
    };

    /** 合同-参数*/
    $.contract.param = {
        hi_code: getUrlParam("hi_code"),
        con_code: getUrlParam("contractObject_Code"),
        mode: getUrlParam("mode")
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
        $.contract.param.con_type = $("#conType").val();

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
        var contractBody = mainData.contractBody || "";
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

        if (!isAdd) {
            $('#month_1').show();
            if (contractBody.contractBody_ContractMode == 0) {
                $('#month-1').addClass("common-checkbox-checked");
                $('#month_1').removeClass("common-checkbox-checked");
            } else if (contractBody.contractBody_ContractMode == 1) {
                $('#month_1').addClass("common-checkbox-checked");
                $('#month-1').removeClass("common-checkbox-checked");
            }
        }


        // 签订日期
        $("#condate").val(isEdit && !isRenew ? returnDate(contractObject.contractObject_FillTime) : returnDate(startDate));

        // 首付租金日期
        var _startDate=new Date($("#conOpenDate").val());
        var startPayDate=new Date(_startDate.setDate(_startDate.getDate()+parseInt($('#oneConFreeDate').val())))
        $("#conStartPayDate").val(isEdit && !isRenew ? returnDate(contractBody.contractBody_StartPayTime) : returnDate(startPayDate));

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

        // 房东年付金融方式
        common.pay_year_tg(function (result) {
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

        if (isEdit) {
            if ("E" == contractObject.contractObject_Mode) {
                $("[name=version][value=电子版]").attr("checked", "checked").parent().addClass("common-radio-checked");
                $("[name=version][value=纸质版]").removeAttr("checked").attr("disabled", "disabled").parent().removeClass("common-radio-checked").addClass("common-radio-disabled");
                $("#connoDL").hide();
                $("#downloadTemplate").hide();
                $("input[name=oldVersion]").val(contractObject.contractObject_Version);
            } else if ("P" == contractObject.contractObject_Mode) {
                $("[name=version][value=纸质版]").attr("checked", "checked").parent().addClass("common-radio-checked");
                $("[name=version][value=电子版]").removeAttr("checked").attr("disabled", "disabled").parent().removeClass("common-radio-checked").addClass("common-radio-disabled");
                $("#connoDL").show();
                $("#downloadTemplate").show();
            }
        }
        // 约定还款日
        $.contract.change_agreeDate();
        // $("#conAgreeDate option[value=" + contractBody.contractBody_AgreedRepayTime + "]").attr("selected", "selected");

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
        if (isEdit || isRenew) {
//			$("#conPay").val(!isRenew ? returnFloat(contractBody.contractBody_Pay) : 0);
//			$("#conDepslit").val(!isRenew ? returnFloat(contractBody.contractBody_Depslit) : 0);
            $("#conPay").val(returnFloat(contractBody.contractBody_Pay));
            $("#conDepslit").val(returnFloat(contractBody.contractBody_Depslit));
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

        if (isEdit) {
            $("#conPayType option[value=" + contractBody.contractBody_PayStyle + "]").attr("selected", "selected");
            if (contractBody.contractBody_PayStyle == "年付") {
                $("[name=payType][value=" + contractBody.contractBody_PayType + "]").attr("checked", "checked").parent().addClass("span-checked");
                $("#monthPayType").show();
                $("#rentPlus").show();
                $("#contractBody_RentPlus").val(filterUnNumber(contractBody.contractBody_RentPlus));
            } else {
                $("#monthPayType").hide();
                $("#rentPlus").hide();
            }
        } else {
            if ($("#conPayType option:selected").val() != '年付') {
                $("#monthPayType").hide();
            }
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

        //首年免租期变化
        $('#oneConFreeDate').on('blur',function () {
            var startDate = new Date($("#conOpenDate").val());
            var day=$('#oneConFreeDate').val();
            var newDate = DateAdd("d ", parseInt(day), startDate);
            $('#conStartPayDate').val(returnDate(newDate));
        });
        //免租期方式
        $('#rent-free .common-checkbox').on('click',function () {
            $('#rent-free .common-checkbox').each(function () {
                if ($(this).hasClass('common-checkbox-checked')) {
                    // 改变免租期
                    btnZdy('conFreeDate');
                    // 改变租金递增自定义
                    btnZdy('conIncreasing');
                    // 改变包修费
                    btnZdy('guaranteecost');
                    if ($(this).find('[name=rent]').val() == 1) {
                        var startDate = new Date($("#conOpenDate").val());
                        var day=$('#oneConFreeDate').val();
                        var newDate = DateAdd("d ", parseInt(day), startDate);
                        $('#conStartPayDate').val(returnDate(newDate));
                    }
                }
            });
        });
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

        // 数据字典-押金支付方式
        var conPayTypeList = mainData.conPayTypeList;

        // 月付
        var outMoney = houseData.hi_price == 0 ? 0 : houseData.hi_price * (1 + 5.0 / 100);
        $("[name='outMoney']").val(outMoney);
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
            var html = "";
            for (var i = 0; i < conPayTypeList.length; i++) {
                html += '<option value="' + conPayTypeList[i].dictionary_value + '" data-value="' + conPayTypeList[i].dictionary_value + '"' + (conPayTypeList[i].is_checked == 1 ? "selected" : "") + '>' + conPayTypeList[i].dictionary_name + '</option>';
            }
            $("#conPay_dd").html(html);
        }

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

        if (isEdit) {
            // 合同模式
            $("[name=contractObjectMode]").val(contractObject.contractObject_Mode);
            if ("E" == contractObject.contractObject_Mode) {
                $("[name=version][value=电子版]").attr("checked", "checked").parent().addClass("common-radio-checked");
                $("[name=version][value=纸质版]").removeAttr("checked").attr("disabled", "disabled").parent().removeClass("common-radio-checked").addClass("common-radio-disabled");
                $("#connoDL").hide();
                $("#downloadTemplate").hide();
                $("input[name=oldVersion]").val(contractObject.contractObject_Version);
            }
            else if ("P" == contractObject.contractObject_Mode) {
                $("[name=version][value=纸质版]").attr("checked", "checked").parent().addClass("common-radio-checked");
                $("[name=version][value=电子版]").removeAttr("checked").attr("disabled", "disabled").parent().removeClass("common-radio-checked").addClass("common-radio-disabled");
                $("#connoDL").show();
                $("#downloadTemplate").show();
            }
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
            if ("P" == contractObject.contractObject_Mode) {
                $("#conno").removeAttr("disabled");
            }
        }
        // 小区房号
        $("#conhouseno").val(returnValue(houseData.house_address));
        if (isRenew || (isEdit && (returnNumber(contractObject.contractObject_ExtState) == 12 || returnNumber(contractObject.contractObject_ExtState) == 22))) {
            $(".house-hint").html("合同续约").fadeIn();
        }

        // 居住人数
        if (isEdit) {
            $("#peoNum").val(returnNumber(contractObject.contractObject_PeopleNumber));
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

        // 续约月付也要上浮
        if(isRenew && contractBody.contractBody_PayStyle == "月付"){
            // 租金加成
            var rentPlus = $("#upRatio").is(":hidden") ? returnFloat($("#contractBody_RentPlus").val()) : returnFloat($("#upRatio").val());
            var moneyV = returnNumber(returnFloat($("#house-rent").val()) * (1 + rentPlus / 100));
            $("#conRent").val(moneyV);
            $("#monthPayType").show();
            $("#rentPlus").show();
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

        // 起始日期
        var startDate = $("#conOpenDate").val();
        // 截止日期
        var endDate = $("#conEndDate").val();
        var contractLimit = returnYearMonthDayData(returnDate(startDate), returnDate(endDate));
        var limitYear = contractLimit.year;
        var limitMonth = contractLimit.month;
        var limitDay = contractLimit.day;
        if (limitYear <= 0) {
            if (limitMonth < 6) {
                $("#conPayType option[value=年付]").attr("disabled", "disabled");
            }
            if (limitMonth < 3) {
                $("#conPayType option[value=年付]").attr("disabled", "disabled");
                $("#conPayType option[value=半年付]").attr("disabled", "disabled");
            }
            if (limitMonth < 1) {
                $("#conPayType option[value=年付]").attr("disabled", "disabled");
                $("#conPayType option[value=半年付]").attr("disabled", "disabled");
                $("#conPayType option[value=季付]").attr("disabled", "disabled");
            }
            if (limitMonth >= 6) {
                $("#conPayType option[value=年付]").removeAttr("disabled");
                $("#conPayType option[value=半年付]").removeAttr("disabled");
                $("#conPayType option[value=季付]").removeAttr("disabled");
            }
        } else {
            if (limitMonth >= 6) {
                $("#conPayType option[value=年付]").removeAttr("disabled");
                $("#conPayType option[value=半年付]").removeAttr("disabled");
                $("#conPayType option[value=季付]").removeAttr("disabled");
            }
        }

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

        // 月付租金上浮比例
        common.up_ratio_zl(function (result) {
            $.each(result.data, function (index, data) {
                var html = "";
                html += '<option value="' + data.contractType_Name + '" data-value="' + data.contractType_Value + '" ' + (data.contractType_isOpen == 2 ? "disabled" : "") + '>' + data.contractType_Name + '</option>';
                $("#upRatio").append(html);
            });
            $("#upRatio").val(isEdit ? contractBody.contractBody_RentPlus : '');
        });

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

    /** 计算押金 */
    $.contract.compute_pledgeCase = function () {
        var type = $("[name=conPayOption]").val();// 押金支付类型
        var hi_houseS = $("#hi_houseS").val();
        var payType_p = $("#conPayType").val();// 付款方式

        if (type == "1") {
            $("#conRent").val($("#old-house-rent").val());
        }
        var rent = returnFloat($("#old-house-rent").val()); // 租金
        var conPayMoney = 0;// 押金

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
        /*
         * 添加活动规则查询
         * 查询数据字典
         * 1-押一月租金，
         * 2-正常缴纳，
         * 3-自定义
         */

        if (type == "1") {
            conPayMoney = rent;
        } else if (type == "2") {

            conPayMoney = payType_p == '月付' ? rent * 2 : rent * 1.5;
            if (hi_houseS == 1) {
                conPayMoney = conPayMoney >= 2000 ? conPayMoney : 2000;
            } else if (hi_houseS == 2) {
                conPayMoney = conPayMoney >= 2500 ? conPayMoney : 2500;
            } else if (hi_houseS >= 3) {
                conPayMoney = conPayMoney >= 3000 ? conPayMoney : 3000;
            }
        } else if (type == "3") {
            return "user_defined";// 自定义
        }
        return conPayMoney;
    }

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
//						var house_rent = $("#old-house-rent").val();
//						// 租金为出房价
//						$("#conRent").val(returnFloat(house_rent));
//						// 重新计算押金 shenhx 20170520
//						var conPayMoney = $.contract.compute_pledgeCase();
//						if("user_defined" != conPayMoney){
//
//							$("#conPay").val(returnFloat(conPayMoney)).attr("data-cache", returnFloat(conPayMoney));
//						} else {
//							// 押金自定义
//						}
                    }
                    // 重新计算总租金
                    $.contract.compute_totalRent();
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
//						var house_rent = $("#old-house-rent").val();
//						// 租金为出房价
//						$("#conRent").val(returnFloat(house_rent));
//						// 重新计算押金 shenhx 20170520
//						var conPayMoney = $.contract.compute_pledgeCase();
//						if("user_defined" != conPayMoney){
//
//							$("#conPay").val(returnFloat(conPayMoney)).attr("data-cache", returnFloat(conPayMoney));
//						} else {
//							// 押金自定义
//						}
                    }
//					showPayDate();
                    // 重新计算总租金
                    $.contract.compute_totalRent();
                }
            });
        });

        // 合同期限变化
        $("#conOpenDate").on("change", function () {
            // 起始日期
            var startDate = $("#conOpenDate").val();
            // 截止日期
            var endDate = $("#conEndDate").val();
            var contractLimit = returnYearMonthDayData(returnDate(startDate), returnDate(endDate));
            var limitYear = contractLimit.year;
            var limitMonth = contractLimit.month;
            var limitDay = contractLimit.day;
            if (limitYear <= 0) {
                if (limitMonth < 6) {
                    $("#conPayType option[value=年付]").attr("disabled", "disabled");
                }
                if (limitMonth < 3) {
                    $("#conPayType option[value=年付]").attr("disabled", "disabled");
                    $("#conPayType option[value=半年付]").attr("disabled", "disabled");
                }
                if (limitMonth < 1) {
                    $("#conPayType option[value=年付]").attr("disabled", "disabled");
                    $("#conPayType option[value=半年付]").attr("disabled", "disabled");
                    $("#conPayType option[value=季付]").attr("disabled", "disabled");
                }
                if (limitMonth >= 6) {
                    $("#conPayType option[value=年付]").removeAttr("disabled");
                    $("#conPayType option[value=半年付]").removeAttr("disabled");
                    $("#conPayType option[value=季付]").removeAttr("disabled");
                }
            } else {
                $("#conPayType option[value=年付]").removeAttr("disabled");
                $("#conPayType option[value=半年付]").removeAttr("disabled");
                $("#conPayType option[value=季付]").removeAttr("disabled");
            }
            $("[name=conStartPayDate]").val(startDate).attr("min", startDate);
            // 初始化约定还款日
            $.contract.change_agreeDate();
            // 重新计算总租金
            $.contract.compute_totalRent();
        });
        $("#conEndDate").on("change", function () {
            // 起始日期
            var startDate = $("#conOpenDate").val();
            // 截止日期
            var endDate = $("#conEndDate").val();
            var contractLimit = returnYearMonthDayData(returnDate(startDate), returnDate(endDate));
            var limitYear = contractLimit.year;
            var limitMonth = contractLimit.month;
            if (limitYear <= 0) {
                if (limitMonth < 6) {
                    $("#conPayType option[value=年付]").attr("disabled", "disabled");
                }
                if (limitMonth < 3) {
                    $("#conPayType option[value=年付]").attr("disabled", "disabled");
                    $("#conPayType option[value=半年付]").attr("disabled", "disabled");
                }
                if (limitMonth < 1) {
                    $("#conPayType option[value=年付]").attr("disabled", "disabled");
                    $("#conPayType option[value=半年付]").attr("disabled", "disabled");
                    $("#conPayType option[value=季付]").attr("disabled", "disabled");
                }
                if (limitMonth >= 6) {
                    $("#conPayType option[value=年付]").removeAttr("disabled");
                    $("#conPayType option[value=半年付]").removeAttr("disabled");
                    $("#conPayType option[value=季付]").removeAttr("disabled");
                }
            } else {
                $("#conPayType option[value=年付]").removeAttr("disabled");
                $("#conPayType option[value=半年付]").removeAttr("disabled");
                $("#conPayType option[value=季付]").removeAttr("disabled");
            }
            // 重新计算总租金
            $.contract.compute_totalRent();
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
                        if ("user_defined" != conPayMoney) {

                            $("#conPay").val(returnFloat(conPayMoney)).attr("data-cache", returnFloat(conPayMoney));
                        } else {
                            // 押金自定义
                        }
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
                    // 计算总租金
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
                    // 重新计算押金 shenhx 20170409
                    var conPayMoney = $.contract.compute_pledgeCase();
                    if (!$.contract.short_Rent()) {

                        if ("user_defined" != conPayMoney) {

                            $("#conPay").val(returnFloat(conPayMoney)).attr("data-cache", returnFloat(conPayMoney));
                        } else {
                            // 押金自定义
                        }
                    } else {
                        var conPay = returnFloat($("#conRent").val());// 租金
                        var shortConPay = returnFloat(returnFloat($("#old-house-rent").val()) * 1.5);
                        if (conPay < shortConPay) {
                            $(this).appMsg("短租期租金不能小于统一出房价的1.5倍-" + shortConPay + "元");
                            $(this).val(shortConPay);
                            $("#conPay").val(returnFloat(shortConPay)).attr("data-cache", returnFloat(shortConPay));
                        } else {
                            $(this).val(conPay);
                            $("#conPay").val(returnFloat(conPay)).attr("data-cache", returnFloat(conPay));
                        }
                    }
                    // 计算总租金
                    $.contract.compute_totalRent();
                }
            }
        });

        // 支付方式
        $("#conPayType").on("change", function () {
            if (($.contract.param.con_type == "租赁合同" && $(this).val() == "月付") || ($.contract.param.con_type == "托管合同" && $(this).val() == "年付")) {
                $("#monthPayType").show();
            } else {
                if (!($.contract.param.con_type == "托管合同" && $(this).val() == "年付")) {
                    $("#monthPayType").hide();
                }
            }
            //更改账单生成方式
            /*if ($.contract.param.con_type == "托管合同" && $(this).val() != '季付') {
                common.bill_way_tg(function (result) {
                    $('#conBillWay').empty();
                    $.each(result.data, function (index, data) {
                        if (returnValue(data.contractType_Name) == '租期等长') {
                            $('#conBillWay').append('<option value="' + returnValue(data.contractType_Code) + '">' + returnValue(data.contractType_Name) + '</option>');
                        }
                    });
                });
            } else {
                common.bill_way_tg(function (result) {
                    $('#conBillWay').empty();
                    $.each(result.data, function (index, data) {
                        $('#conBillWay').append('<option value="' + returnValue(data.contractType_Code) + '">' + returnValue(data.contractType_Name) + '</option>');
                    });
                });
            }*/
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
                    $.contract.compute_totalRent();
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
                        // 租金加成
                        var rentPlus = $("#upRatio").is(":hidden") ? returnFloat($("#contractBody_RentPlus").val()) : returnFloat($("#upRatio").val());
                        moneyV = returnNumber(returnFloat($("[name=outMoney]").val()) * (1 + rentPlus / 100));
                    } else if (conType == "季付") {
                        moneyV = returnNumber($("[name=seasonMoney]").val());
                    } else if (conType == "半年付") {
                        // moneyV = $.contract.moneys(returnFloat($("[name=halfYearMoney]").val()));
                        moneyV = returnNumber(returnFloat($("[name=halfYearMoney]").val()));
                    } else if (conType == "年付") {
                        // moneyV = $.contract.moneys(returnFloat($("[name=yeayMoney]").val()));
                        moneyV = returnNumber(returnFloat($("[name=yeayMoney]").val()));
                    } else if (conType == "一次性付"){
                        // 起始日期
                        var startDate = $("#conOpenDate").val();
                        // 截止日期
                        var endDate = $("#conEndDate").val();
                        var contractLimit = returnYearMonthDayData(returnDate(startDate), returnDate(endDate));
                        var limitYear = contractLimit.year;
                        var limitMonth = contractLimit.month;

                        if(limitYear >= 1){
                            moneyV = returnNumber(returnFloat($("[name=yeayMoney]").val()));
                        } else if(limitYear < 1 && limitMonth >=6 && limitMonth < 12){
                            moneyV = returnNumber(returnFloat($("[name=halfYearMoney]").val()));
                        } else {
                            moneyV = returnNumber($("[name=seasonMoney]").val());
                        }
                    }
                    $("#house-rent").val(moneyV);
                    $("#conRent").val(moneyV);

                    // 重新计算押金 shenhx 20170409
                    var conPayMoney = $.contract.compute_pledgeCase();
                    if ("user_defined" != conPayMoney) {

                        $("#conPay").val(returnFloat(conPayMoney)).attr("data-cache", returnFloat(conPayMoney));
                    } else {
                        // 押金自定义
                    }
                }
                // 重新计算总租金
                $.contract.compute_totalRent();
            }
            // 约定还款日
            $.contract.change_agreeDate();
        });

        // 押金
        $("#conPay").on("blur", function () {
            if ($.contract.param.con_type == "租赁合同") {
                var curConPay = $(this).val();
                var conPayMoney = $.contract.compute_pledgeCase();
                var type = $("[name=conPayOption]").val();
                if (type == "1") {
                    if (curConPay < conPayMoney) {
                        $(this).appMsg("押金最低不能少于" + conPayMoney + "元");
                        $("#conPay").val(returnFloat(conPayMoney)).attr("data-cache", returnFloat(conPayMoney));
                    } else {
                        $("#conPay").val(returnFloat(curConPay)).attr("data-cache", returnFloat(curConPay));
                    }
                } else if (type == "2") {

                    if (!$.contract.short_Rent()) {
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
                        var shortConPay = returnFloat(returnFloat($("#old-house-rent").val()) * 1.5);
                        if (returnFloat(curConPay) < shortConPay) {
                            $("#conPay").val(returnFloat(shortConPay)).attr("data-cache", returnFloat(shortConPay));
                            $("#conRent").val(returnFloat(shortConPay)).attr("data-cache", returnFloat(shortConPay));
                            $(this).appMsg("押金须不低于" + shortConPay + "元");
                        }
                    }
                } else {
                    // 押金自定义
                    if (curConPay < 0) {
                        $(this).appMsg("押金不能为负");
                        $("#conPay").val(returnFloat(conPayMoney)).attr("data-cache", returnFloat(conPayMoney));
                        return;
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

        // 押金支付方式
        $("[name=conPayOption]").on("change", function () {
            if ($.contract.param.con_type == "租赁合同") {
                var type = $(this).val();
                var curConPay = $("#conPay").val();
                var conPayMoney = $.contract.compute_pledgeCase();
                if (type == "1") {
                    $("#conPay").val(returnFloat(conPayMoney)).attr("data-cache", returnFloat(conPayMoney));
                } else if (type == "2") {
                    if (!$.contract.short_Rent()) {

                        var houseS_p = $("#hi_houseS").val();// 户型-
                        var minMoney = 0;
                        if (houseS_p == 1) {
                            minMoney = 2000;
                        } else if (houseS_p == 2) {
                            minMoney = 2500;
                        } else if (houseS_p == 3) {
                            minMoney = 3000;
                        }
                        if (curConPay < minMoney) {
                            $("#conPay").val(returnFloat(conPayMoney)).attr("data-cache", returnFloat(conPayMoney));
                            $(this).appMsg("押金须不低于" + minMoney + "元");
                        }
                    } else {
                        var shortConPay = returnFloat(returnFloat($("#old-house-rent").val()) * 1.5);
                        if (returnFloat(curConPay) < shortConPay) {
                            $("#conPay").val(returnFloat(shortConPay)).attr("data-cache", returnFloat(shortConPay));
                            $("#conRent").val(returnFloat(shortConPay)).attr("data-cache", returnFloat(shortConPay));
                            $(this).appMsg("押金须不低于" + shortConPay + "元");
                        }
                    }
                } else if (type == "3") {
                    // 押金自定义
                }
                // 重新计算总租金
                $.contract.compute_totalRent();
            }
        });

        // 第三方插件--自定义滚动条
        $(".model-main").perfectScrollbar();

        var mode = $.contract.param.mode;
        var version = $("[name=version]:checked").val();
        if ("edit" == mode) {
            $("#conno").attr("disabled", "disabled");
            $("#conno").next().hide();
            // $("[name=version]").attr("disabled", "disabled");
            if ("电子版" == version) {
                $("#downloadTemplate").hide();
                $("#htzEM").hide();
            } else {
                $("#downloadTemplate").show();
                $("#htzEM").show();
            }
        } else if ("addZL" == mode || "addTG" == mode || "renew" == mode) {
            if ("电子版" == version) {
                $("#conno").val("").attr("disabled", "disabled");
                $("#conno").next().hide();
                $("#connoDL").hide();
                $("#downloadTemplate").hide();
                $("#htzEM").hide();
            } else {
                $("#conno").removeAttr("disabled", "disabled");
                $("#conno").next().show();
                $("#connoDL").show();
                $("#downloadTemplate").show();
                $("#htzEM").show();
            }
        }
        $("[name=generate]").on("click", function () {
            if ($(this).is(":checked")) {
                $("#conno").attr("disabled", "disabled");
            } else {
                $("#conno").removeAttr("disabled");
            }
        });

        // 租金上浮比例
        $("#upRatio").on("change", function () {
            if("自定义" == $(this).val()){
                $("#contractBody_RentPlus").show();
                $(this).hide();
            } else {
                // 租金加成
                var rentPlus = $("#upRatio").is(":hidden") ? returnFloat($("#contractBody_RentPlus").val()) : returnFloat($("#upRatio").val());
                var moneyV = returnFloat($("#house-rent").val()) * (1 + rentPlus / 100);
                // $("#house-rent").val(moneyV);
                $("#conRent").val(moneyV);
                $.contract.compute_totalRent();
            }
        });

        // 自定义上浮比例
        $("#contractBody_RentPlus").on("input propertychange", function () {
            var ratio = $(this).val();
            if(isNaN(ratio)){
                $.jBox.tip("请输入数字");
                return;
            }
            if(returnFloat(ratio) < 0){
                $.jBox.tip("请输入大于零的数字");
                return;
            }
            // 租金加成
            var rentPlus = $("#upRatio").is(":hidden") ? returnFloat($("#contractBody_RentPlus").val()) : returnFloat($("#upRatio").val());
            var moneyV = returnFloat($("#house-rent").val()) * (1 + rentPlus / 100);

            // $("#house-rent").val(returnFloat(moneyV));
            $("#conRent").val(returnFloat(moneyV));
            $.contract.compute_totalRent();
        });

        //首年免租期变化
        $('#oneConFreeDate').on('blur',function () {
            var startDate = new Date($("#conOpenDate").val());
            var day=$('#oneConFreeDate').val();
            var newDate = DateAdd("d ", parseInt(day), startDate);
            $('#conStartPayDate').val(returnDate(newDate));
        });

    };

    /** 计算押金 */
    $.contract.compute_pledgeCase = function () {

        var hi_houseS = $("#hi_houseS").val();
        var payType_p = $("#conPayType").val();// 付款方式
        var rent = returnFloat($("#conRent").val()); // 租金
        var conPayMoney = 0;// 押金
        var type = $("[name=conPayOption]").val();// 押金支付类型
        var payMoney = $("#house-rent").val();// 统一出房价
        if (type == "1") {
            conPayMoney = rent;
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
//		var houseType = $("#house-stw").html();
//		var houseS_p = returnNumber(houseType.substring(0, houseType.indexOf("室")));// 户型-室数

            conPayMoney = payType_p == '月付' ? rent * 2 : rent * 1.5;
            if (hi_houseS == 1) {
                conPayMoney = conPayMoney >= 2000 ? conPayMoney : 2000;
            } else if (hi_houseS == 2) {
                conPayMoney = conPayMoney >= 2500 ? conPayMoney : 2500;
            } else if (hi_houseS >= 3) {
                conPayMoney = conPayMoney >= 3000 ? conPayMoney : 3000;
            }
        } else if (type == "3") {
            return "user_defined";// 自定义
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
        $('#month_1').hide();
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
        var str=returnBusinessYMD(startDate, endDate);
        if (str.indexOf('月') >-1 || str.indexOf('天') >-1) {
            $('#month_1').show();
        } else {
            $('#month_1').hide();
        }
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
        if ($('#conType').val() == '托管合同') {
            var oldDate = new Date(startDate);
            oldDate = new Date(oldDate.setDate(oldDate.getDate()));
            var html ='';
            // html +='<option value="'+oldDate.getDate()+'" data-value="' + 0 + '">' +  "当日还款"+'</option>'
            html +='<option value="'+0+'" data-value="' + 1 + '">' +  "免租期后还款" + '</option>'
            $("#conAgreeDate").append(html);
        } else {
            for (var i = 0; i <= cycle; i++) {
                var oldDate = new Date(startDate);
                oldDate = new Date(oldDate.setDate(oldDate.getDate() - i));
                $("#conAgreeDate").append('<option value="' + oldDate.getDate() + '" data-value="' + (0 - i) + '">' + (i == 0 ? "当日" : ('提前' + i + '日')) + '还款</option>');
            }
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
        var rentPlus = $("#upRatio").is(":hidden") ? returnFloat($("#contractBody_RentPlus").val()) : returnFloat($("#upRatio").val());
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
            totalRent = returnFloat(((ymd.year * 12 + ymd.month) * rent + (rent / 30 * ymd.day)));
        }
        $("#totalRent .toolbox-value").html(returnFloat(totalRent));

    };

    /** 合同-显示账单列表*/
    $.contract.show_bill_list = function () {
        // 起始日期
        var startDate = returnDate($("#conOpenDate").val());
        // 截止日期
        var endDate = returnDate($("#conEndDate").val());
        // 租赁期限
        var ymd_data = returnYearMonthDayData(startDate, endDate);
        // 首付租金日期
        var startPayDate = returnDate($("#conStartPayDate").val());
        // 付款方式
        var payType = $("#conPayType>option:selected").val();
        // 总期数
        var totalCycle='';

        var freeDate='';
        var html = '';
        if ($.contract.param.con_type == "托管合同") {
        $('#rent-free .common-checkbox').each(function () {
            if ($(this).hasClass('common-checkbox-checked')) {
                var fullYear = 0; //循环年周期
                var cacheFullYear = 0;  //缓存全年
                var cacheFreeTime = 0;

                // 免租期
                var _conFreeDate = 0;
                var _findList = $("#conFreeDate").find(".form-control");
                var _len = _findList.length;
                _findList.each(function (index) {
                    _conFreeDate += Number($(this).val());
                    freeDate += returnNumber($(this).val()) + (_len == (index + 1) ? "" : "|");
                });
                var strs = new Array();
                strs = freeDate.split('|');

                if ($(this).find('[name=rent]').val() == 1) {
                    var startDate = new Date($("#conOpenDate").val());
                    startDate = DateAdd("d ", parseInt(_conFreeDate), startDate);
                    ymd_data = returnYearMonthDayData(startDate, endDate);

                    // 总月数
                    var totalMonth = ymd_data.year * 12 + ymd_data.month;
                    var cycleValue = returnNumber("一次性付" != payType ? $("#conPayType>option:selected").attr("data-value") : totalMonth);
                    // 约定日
                    var agreeValue = returnNumber($("#conAgreeDate>option:selected").attr("data-value"));
                    // 总期数
                    totalCycle = returnNumber(totalMonth / cycleValue);
                    // 余月
                    var remainMonth = totalMonth % cycleValue;
                    // 余日
                    var remainDay = ymd_data.day;

                    if ((remainMonth > 0 || remainDay > 0)) {
                        totalCycle++;
                    }

                    var _startDate = new Date($("#conOpenDate").val());  //开始日期
                    //第0期  首期
                    html += '<tr>';
                    html += '	<td>' + 0 + '</td>';
                    html += '   <td>' + returnDate(_startDate) + '</td>';
                    html += '   <td>' + returnDate(_startDate) + '</td>';
                    html += '</tr>';
                    _startDate = new Date(_startDate.setDate(_startDate.getDate() + parseInt(strs[0])));  //第一期加上免租期后日期
                    for (var i = 1; i <= totalCycle; i++) {
                        // 年索引
                        var index = cacheFullYear / 12;

                        if (payType != "年付") {
                            var freeTimesIndex = strs.length - 1;
                            cacheFreeTime = index > freeTimesIndex ? 0 : parseInt(strs[index]);
                        }
                        if (i != 1 && payType == "年付") {
                            var freeTimesIndex = strs.length - 1;
                            cacheFreeTime = index > freeTimesIndex ? 0 : parseInt(strs[index]);
                        }

                        html += '<tr>';
                        html += '	<td>' + i + '</td>';
                        if (i == 1) {
                            html += '<td>' + startPayDate + '</td>';
                            html += '<td>' + returnDate(startPayDate) + '</td>';
                        } else {
                            if (fullYear == 0 && cacheFreeTime != 0) {
                                _startDate = new Date(_startDate.setMonth(_startDate.getMonth() + cycleValue));
                                if (cacheFreeTime >=28 ) {
                                    _startDate = new Date(_startDate.setMonth(_startDate.getMonth() + 1));
                                } else {
                                    _startDate = new Date(_startDate.setDate(_startDate.getDate() + cacheFreeTime));
                                }
                                html += '<td>' + returnDate(_startDate) + '</td>';
                                html += '<td>' + returnDate(_startDate) + '</td>';
                            } else {
                                _startDate = new Date(_startDate.setMonth(_startDate.getMonth() + cycleValue));
                                html += '<td>' + returnDate(_startDate) + '</td>';
                                html += '<td>' + returnDate(_startDate) + '</td>';
                            }
                        }
                        html += '</tr>';
                        fullYear += cycleValue;
                        cacheFullYear += cycleValue;
                        if (fullYear >= 12) {
                            fullYear = 0;
                        }
                    }
                } else {
                    // 总月数
                    var totalMonth = ymd_data.year * 12 + ymd_data.month;
                    var cycleValue = returnNumber("一次性付" != payType ? $("#conPayType>option:selected").attr("data-value") : totalMonth);
                    // 约定日
                    var agreeValue = returnNumber($("#conAgreeDate>option:selected").attr("data-value"));
                    // 总期数
                    totalCycle = returnNumber(totalMonth / cycleValue);
                    // 余月
                    var remainMonth = totalMonth % cycleValue;
                    // 余日
                    var remainDay = ymd_data.day;
                    if ( remainMonth > 0 || remainDay > 0) {
                        totalCycle++;
                    }
                    var _startDate = new Date($("#conOpenDate").val());

                    //第0期  首期
                    html += '<tr>';
                    html += '	<td>' + 0 + '</td>';
                    html += '   <td>' + returnDate(_startDate) + '</td>';
                    html += '   <td>' + returnDate(_startDate) + '</td>';
                    html += '</tr>';
                    for (var i = 1; i <= totalCycle; i++) {

                        // 年索引
                        var index = cacheFullYear / 12;
                        if (payType != "年付") {
                            var freeTimesIndex = strs.length - 1;
                            cacheFreeTime = index > freeTimesIndex ? 0 : parseInt(strs[index]);
                        }
                        if (i != 1 && payType == "年付") {
                             var j = index;
                             if (j > 0) {
                                 cacheFreeTime = parseInt(strs[j]);
                             }
                        }

                        html += '<tr>';
                        html += '	<td>' + i + '</td>';
                        if (i == 1) {
                            html += '<td>' + returnDate(startPayDate) + '</td>';
                            html += '<td>' + returnDate(startPayDate) + '</td>';
                            // _startDate = new Date(_startDate.setMonth(_startDate.getMonth() + cycleValue));
                        } else {
                            if (fullYear ==0 && cacheFreeTime != 0) {
                                var nowDate=new Date(_startDate);
                                nowDate = new Date(nowDate.setMonth(nowDate.getMonth() + cycleValue));
                                /*if (cacheFreeTime >= 28) {
                                    var i=1;
                                    nowDate = new Date(nowDate.setMonth(nowDate.getMonth() + i));
                                } else {
                                    nowDate = new Date(nowDate.setDate(nowDate.getDate() + cacheFreeTime));
                                }*/
                                nowDate = new Date(nowDate.setDate(nowDate.getDate() + cacheFreeTime));
                                html += '<td>' + returnDate(nowDate) + '</td>';
                                html += '<td>' + returnDate(nowDate) + '</td>';
                                _startDate = new Date(_startDate.setMonth(_startDate.getMonth() + cycleValue));
                            } else {
                                _startDate = new Date(_startDate.setMonth(_startDate.getMonth() + cycleValue));
                                html += '<td>' + returnDate(_startDate) + '</td>';
                                html += '<td>' + returnDate(_startDate) + '</td>';
                            }
                        }
                        html += '</tr>';
                        fullYear += cycleValue;
                        cacheFullYear += cycleValue;
                        if (fullYear >= 12) {
                            fullYear = 0;
                        }
                    }
                }
            }
        });
        }



        if ($.contract.param.con_type == "租赁合同") {
            if("一次性付" != payType){
                for (var i = 0; i < totalCycle; i++) {
                    var _startDate = new Date($("#conOpenDate").val());
                    var currentDate = new Date(_startDate.setMonth(_startDate.getMonth() + i));
                    var agreeDate = new Date(_startDate.setDate(_startDate.getDate() + agreeValue));

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
            } else {
                var _startDate = new Date(startDate);
                var currentDate = new Date(_startDate.setMonth(_startDate.getMonth()));
                var agreeDate = new Date(_startDate.setDate(_startDate.getDate() + agreeValue));
                html += '<tr>';
                html += '	<td>' + 0 + '</td>';
                html += '   <td>' + startPayDate + '</td>';
                html += '   <td>' + returnDate(currentDate) + '</td>';
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

            var model_ = $.contract.param.mode;
            $(this).openModel({
                // title : (model_ == "addTG" || model_ == "addZL") && $(this).parent().parent().attr("id") != "contacts-main" ? "意向客户" : "客户信息",
                title: "客户信息",
                param: params,
                repeatClass: 'cc_id',
                done: function (result) {
                    $(self).load_customer(result);
                    $("[name=cc_code]").val(result.cc_code);
                    // if(result.cc_code2 != null && result.cc_code2 != "" && result.cc_code2 != undefined){
                    // 	$("[name=cc_code]").val(result.cc_code2);
                    // }
                }
            });
        });

        // 事件-编辑
        $(self).find(".content-change-edit").on("click", function () {
            // if("addTG" == getUrlParam("mode") || "addZL" == getUrlParam("mode")){
            //
            // 	customerIntentionUpd();
            // } else {

            window.parent.href_mo('/customer/customerEdit?cc_code=' + data.cc_code, "编辑客户", $("title").text());
            // }
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
        if ($.contract.param.mode == "renew") {
            return false;
        }
//		var type = $("[name=conPayOption]").val();
//		if(type == "1" || type == "3"){
//			return false;
//		} else if(type == "2"){

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
//		}
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
        return money
    };

    /** 合同-提交数据*/
    $.contract.submit = function (obj) {
        var is_ok = true;
        $(".form-control[required]:visible").each(function () {
            if (isEmpty($(this).val())) {
                $(this).msg("不能为空");
                return is_ok = false;
            }
        });
        if ($("input[name='version']:checked").val() == "电子版" ||
            ($("input[name='version']:checked").val() == "纸质版") /*&& $("[name=generate]").is(":checked")*/) {
            is_ok = true;
        }
        if (!is_ok) return;


        if ($.contract.param.con_type == "租赁合同") {
            if ($("#conPayType option:selected").val() == "月付" && $("[name=payType]:checked").length < 1) {
                $.jBox.tip("请选择合作平台");
                return;
            }
        }
        if ($.contract.param.con_type == "托管合同") {
            // 月付、季付默认为管家婆
            // if (($("#conPayType").val() == "月付" || $("#conPayType").val() == "季付") && $("[name=payType]:checked").length < 1) {
            //     $.jBox.tip("请选择合作平台");
            //     return;
            // }
        }
        if (returnFloat($("#conRent").val()) == 0) {
            $("#conRent").msg("租金不能为0");
            return;
        }
        if ($("input[name='version']:checked").val() == "纸质版" && $("img[name=HTZ]").length <= 0) {
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
        var oldVersion = ($.contract.param.mode == "edit") ? $("input[name=oldVersion]").val() : "";
        contractObject.contractObject_Version = isEmpty(oldVersion) ? $("input[name='version']:checked").val() : oldVersion;
        contractObject.contractObject_FillTime = $("#condate").val();
        contractObject.contractObject_Date = $("#conOpenDate").val();
        contractObject.contractObject_DeadlineTime = $("#conEndDate").val();
        contractObject.contractObject_Other = $("#conother").val();
        contractObject.contractObject_Successor = returnNumber($.contract.param.old_con_id);
        var custData = $("[name=cc_id]:eq(0)").data("data");
        // if(custData.cc_code2 != null && custData.cc_code2 != "" && custData.cc_code2 != undefined){
        // 	contractObject.contractObject_1st = custData.cc_code2;
        // } else {
        contractObject.contractObject_1st = custData.cc_code;
        // }
        if ($.contract.param.con_type == "租赁合同") {

            // 起始日期
            var startDate = $("#conOpenDate").val();
            // 截止日期
            var endDate = $("#conEndDate").val();
            var contractLimit = returnYearMonthDayData(returnDate(startDate), returnDate(endDate));
            var limitYear = contractLimit.year;
            var limitMonth = contractLimit.month;
            if(limitYear < 1 & limitMonth < 1){
                $.jBox.tip("合同期限不能低于一个月");
                return;
            }

            var peoNum = $("#peoNum").val();
            if (peoNum == '') {
                $("#peoNum").msg("请输入居住人数");
                return;
            }
            if (returnNumber(peoNum) <= 0) {
                $("#peoNum").msg("居住人数至少为一人");
                return;
            }
            contractObject.contractObject_PeopleNumber = returnNumber(peoNum);
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
        if ($.contract.param.con_type == "托管合同" && contractBody.contractBody_PayStyle == "年付") {//(contractBody.contractBody_PayStyle == "月付" || contractBody.contractBody_PayStyle == "季付")
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
            // contractBody.contractBody_BillWay = $("#conBillWay").val();

            //合同模式 0:n-1;1:n+1
            var ContractBody_ContractMode='';
            $('#rent-free .common-checkbox').each(function () {
                if ($(this).hasClass('common-checkbox-checked')) {
                    ContractBody_ContractMode=$(this).find('[name=rent]').val();
                }
            });
            contractBody.ContractBody_ContractMode=ContractBody_ContractMode;
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
            var customerInfo = {};
            var cc_data = $(this).data("data");
            if (index == 0) {
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
            customerInfo.cc_code = cc_data.cc_code;
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

            // 意向客户信息编辑时有证件信息img，需要排除在外 shenhx 20170713
            if (this.name != "CD1" && this.name != "CD2") {

                var contractImage = {};
                contractImage.ci_type = this.name;
                contractImage.ci_path = this.src;
                contractImages.push(contractImage);
            }
        });
        data.contractImages = JSON.stringify(contractImages);

        data.old_contractObject_No = returnValue($.contract.param.old_con_no);
        data.option = getUrlParam("option");
        data.mode = $.contract.param.mode.replace("ZL", "").replace("TG", "");
        // 意向客户编码
        data.cc_code = $("[name=cc_code]").val();

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

    //免租期方式
    $(document).on('click','#rent-free .common-checkbox',function () {
        $('#rent-free .common-checkbox').each(function () {
            if ($(this).hasClass('common-checkbox-checked')) {
                // 改变免租期
                btnZdy('conFreeDate');
                // 改变租金递增自定义
                btnZdy('conIncreasing');
                // 改变包修费
                btnZdy('guaranteecost');
                if ($(this).find('[name=rent]').val() == 1) {
                    var startDate = new Date($("#conOpenDate").val());
                    var day=$('#oneConFreeDate').val();
                    var newDate = DateAdd("d ", parseInt(day), startDate);
                    $('#conStartPayDate').val(returnDate(newDate));
                }
            }
        });
    });

})(jQuery);

/**
 * 2.1.附加条款审核
 */
;(function ($) {
})(jQuery);

/**
 * 3.客户签字
 */
;(function ($) {
})(jQuery);

/**
 * 4.合同审核
 */
;(function ($) {
})(jQuery);

/**
 * 5.交接结算
 */
;(function ($) {
})(jQuery);

/**
 * 6.合同复核
 */
;(function ($) {
})(jQuery);

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
    var limit='';
    $('#rent-free .common-checkbox').each(function(){
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
    var _style = limit > 1 ? 'width: 64px;text-align: center;margin-left: 24px' : '';
    var currentCount = _box.find(".form-control").length;
    if (limit > currentCount) {
        for (var i = currentCount; i < limit; i++) {
            _box.append('<input type="text" class="form-control number" id="oneConFreeDate" value="' + returnNumber(!isEmpty(init) ? value[i] : 0) + '" maxlength="3" style="' + _style + '">');
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
        if (data.contractObject_OptionState == 103 || data.contractObject_OptionState == 105) {
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
        // if ("普通版" == version) {
        //     $(".rentplus-box").hide();
        // }
        // if ("精装版" == version) {
        //     $("#jz-glf").show();
        // }
        // if ("清水版" == version) {
        //     $("input[name='conLimit']").eq(4).click();
        //     $("#conFreeDate").attr("readonly", "readonly").removeAttr("required");
        //     $(".qs_version").text("清水分期装修合同").fadeIn();
        // }
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

    var conVersion = $(obj).val();
    if (conVersion == "电子版") {
        $("#conno").next().hide();
        var mode = $.contract.param.mode;
        if ("addTG" == mode || "addZL" == mode || "renew" == mode) {
            $("#conno").val("").attr("disabled", "disabled");
            $("[name=generate]").removeAttr("checked").parent().attr("class", "common-checkbox");
        } else if ("edit" == mode) {
            $("#conno").attr("disabled", "disabled");
        }
        $("#connoDL").hide();
        $("#downloadTemplate").hide();
        $("#htzEM").hide();
    } else if (conVersion == "纸质版") {
        $("#conno").next().show();
        $("#conno").removeAttr("disabled");
        $("#connoDL").show();
        $("#downloadTemplate").show();
        $("#htzEM").show();
    }
}

/**
 * 意向客戶信息修改
 */
function customerIntentionUpd() {
    $('.cd-popup3').show();
    //打开窗口
    $('.cd-popup3').addClass('is-visible3');
    $("#inputtext").val("预约客户信息编辑");
    $.ajax({
        type: "POST",
        url: "/customer/queryCustomerIntentionById",
        data: {
            cc_id: $("[name=cc_id]").val()
        },
        dataType: "json",
        success: function (resultObj) {
            if (resultObj.customerIntention != null && resultObj.customerIntention != undefined) {
                $(".images-btn").eq(0).html("");
                $(".images-btn").eq(1).html("");
                $("#CD1-count").text(0);
                $("#CD2-count").text(0);
                var data = resultObj.customerIntention;
                $("#custIt_cc_id").val(data.cc_id);
                $("[name=ci_name]").val(data.cc_name);
                $("[name=ci_phone]").val(data.ccp_phone);
                $("[name=cc_cardType]").val(data.cc_cardType);
                $("[name=cc_cardNum]").val(data.cc_cardNum);
                $("[name=customer_need]").val(data.customer_need);
                $("[name=contact_result]").val(data.contact_remark);
                var cc_sex = data.cc_sex;
                if ("1" == cc_sex) {
                    $("[name=ci_sex]").eq(1).attr("checked", "checked").parent().addClass("common-checkbox-checked");
                } else {
                    $("[name=ci_sex]").eq(0).attr("checked", "checked").parent().addClass("common-checkbox-checked");
                }
                var cc_type = data.cc_type;
                if ("1" == cc_type) {
                    $("[name=ci_type]").eq(0).attr("checked", "checked").parent().addClass("common-checkbox-checked");
                } else {
                    $("[name=ci_type]").eq(1).attr("checked", "checked").parent().addClass("common-checkbox-checked");
                }
                var mode = getUrlParam("mode");
                var img_card1 = data.img_card1;
                if (null != img_card1 && "" != img_card1) {
                    var html = '';
                    html += '<div class="images-box-img" data-type="CD1">';
                    html += '<img class="showboxImg" name="CD1" src="' + img_card1 + '">';
                    html += '<span class="images-box-img-delete" data-type="CD1" data-id="' + data.cc_id + '" data-del-url="/customer/deleteImage" style="display: none;">删除</span>';
                    html += '</div>';
                    if (mode == "addTG") {
                        $(".images-btn").eq(3).html(html);
                    } else if (mode == "addZL") {
                        $(".images-btn").eq(1).html(html);
                    }
                    $("#CD1-count").text(1);
                }
                var img_card2 = data.img_card2;
                if (null != img_card2 && "" != img_card2) {
                    var html = '';
                    html += '<div class="images-box-img" data-type="CD1">';
                    html += '<img class="showboxImg" name="CD2" src="' + img_card2 + '">';
                    html += '<span class="images-box-img-delete" data-type="CD1" data-id="' + data.cc_id + '" data-del-url="/customer/deleteImage" style="display: none;">删除</span>';
                    html += '</div>';
                    if (mode == "addTG") {
                        $(".images-btn").eq(4).html(html);
                    } else if (mode == "addZL") {
                        $(".images-btn").eq(2).html(html);
                    }

                    $("#CD2-count").text(1);
                }
            }
        }
    });
}

/**
 * 提交修改预约客户信息
 * @param obj
 * @returns
 */
function submitText(obj) {

    var ci_name = $("#ci_name").val();
    if ("" == ci_name || null == ci_name) {
        swal("请输入客户姓名");
        return;
    }
    var ci_sex = $("[name=ci_sex]:checked").val();
    if ("" == ci_sex || null == ci_sex) {
        swal("请输入客户性别");
        return;
    }
    var ci_phone = $("[name=ci_phone]").val();
    if ("" == ci_phone || null == ci_phone) {
        swal("请输入客户电话");
        return;
    } else {
        if (!isPhone(ci_phone)) {
            swal("请输入正确电话");
            return;
        }
    }
    var ci_type = $("[name=ci_type]:checked").val();
    if ("" == ci_type || null == ci_type) {
        swal("请选择客户类型");
        return;
    }

    var customer_need = $("[name=customer_need]").val();
    if ("" == customer_need || null == customer_need) {
        swal("请输入客户需求");
        return;
    }

    var data = {};
    var UserCustomerIntention = {};
    UserCustomerIntention.cc_id = $("#custIt_cc_id").val();
    UserCustomerIntention.cc_name = ci_name;
    UserCustomerIntention.cc_sex = ci_sex;
    UserCustomerIntention.ccp_phone = ci_phone;
    UserCustomerIntention.cc_type = ci_type;
    UserCustomerIntention.customer_need = $("[name=customer_need]").val();
    UserCustomerIntention.contact_remark = $("#contact_result").val();

    var cc_cardType = $("[name=cc_cardType]").val();
    var cc_cardNum = $("[name=cc_cardNum]").val();
    if ("-1" != cc_cardType) {
        if (null == cc_cardNum || "" == cc_cardNum) {
            swal("请输入证件号码");
            return;
        } else if (cc_cardType == "1" && !isIDCard(cc_cardNum)) {
            swal("请输入正确证件号码");
            return;
        }
        UserCustomerIntention.cc_cardType = cc_cardType;
        UserCustomerIntention.cc_cardNum = cc_cardNum;
    }
    // 身份证正面
    var frontCard = $("#frontCard img").attr("src");
    // 身份证反面
    var inverseCard = $("#inverseCard img").attr("src");
    if (!isEmpty(frontCard) && isEmpty(inverseCard)) {
        swal("请上传证件背面照");
        return;
    } else if (isEmpty(frontCard) && !isEmpty(inverseCard)) {
        swal("请上传证件正面照");
        return;
    } else if ((!isEmpty(frontCard) && !isEmpty(inverseCard)) && (isEmpty(cc_cardType) || isEmpty(cc_cardNum))) {
        swal("请输入证件信息");
        return;
    } else if (!isEmpty(frontCard) && !isEmpty(inverseCard)) {
        UserCustomerIntention.img_card1 = frontCard;
        UserCustomerIntention.img_card2 = inverseCard;
    }

    data.UserCustomerIntention = JSON.stringify(UserCustomerIntention);
    $.ajax({
        type: "POST",
        url: "/customer/saveCustomerIntention",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (resultObj) {
            if (resultObj.result == "success") {
                swal("保存成功");
                $(".cd-popup3").removeClass('is-visible3');
            } else {
                swal("保存失败，请联系系统管理员");
            }
        }
    });
}

/**
 * 检查身份证号码
 * @param obj
 * @returns
 */
function checkCardNum(obj) {
    if ($("[name=cc_cardType]").val() == "1" && $(obj).val() != null &&
        $(obj).val() != "" && !isIDCard($(obj).val())) {
        swal("请输入正确身份证号码");
        return;
    }
    if ($(obj).val() != null &&
        $(obj).val() != "") {

        $.ajax({
            type: "POST",
            url: "/customer/checkCardNum",
            data: {
                cc_cardNum: $(obj).val()
            },
            dataType: "json",
            success: function (resultObj) {
                if (resultObj.code == 200) {// 证件号码已存在，须返显信息
                    $("#cd-buttons").animate({
                        left: "+=500px"
                    }, 3000);
                    $("#cd-buttons").hide();
                    $("#showCustInfo").show();
                    var data = resultObj.result;
                    var div_ = $("#showCustInfo label");
                    div_.eq(1).text(returnValue(data.cc_name));
                    div_.eq(2).text(data.cc_sex == 0 ? "女" : (data.sex == 1 ? "男" : "未知"));
                    $("#sexHide").val(data.cc_sex);
                    div_.eq(3).text(returnValue(data.ccp_phone));
                    if (data.cc_cardType == 1) {
                        div_.eq(4).text("身份证");
                    } else if (data.cc_cardType == 2) {
                        div_.eq(4).text("军官证");
                    } else if (data.cc_cardType == 3) {
                        div_.eq(4).text("商户号");
                    } else if (data.cc_cardType == 4) {
                        div_.eq(4).text("护照");
                    } else if (data.cc_cardType == 5) {
                        div_.eq(4).text("台湾居民通行证");
                    } else if (data.cc_cardType == 6) {
                        div_.eq(4).text("香港居民通行证");
                    } else if (data.cc_cardType == 7) {
                        div_.eq(4).text("临时身份证");
                    } else if (data.cc_cardType == 8) {
                        div_.eq(4).text("外国人永久居留证");
                    }
                    $("#cardTypeHide").val(data.cc_cardType);
                    div_.eq(5).text(returnValue(data.cc_cardNum));
                    $.each(data.customerImages, function (index, data) {
                        if (data.cci_type == "CD1") {
                            $("#showCustInfo img").eq(0).attr("src", data.cci_path);
                        }
                        if (data.cci_type == "CD2") {
                            $("#showCustInfo img").eq(1).attr("src", data.cci_path);
                        }
                    });
                    // $("#cc_code2Hide").val(data.cc_code);
                }
            }
        });
    }
}

function enterText() {
    var div_ = $("#showCustInfo label");
    $("[name=ci_name]").val(div_.eq(1).text());
    var sex = $("#sexHide").val();
    if (sex == 0) {
        $("[name=ci_sex]").eq(0).attr("checked", "checked").parent().addClass("common-checkbox-checked");
        $("[name=ci_sex]").eq(1).parent().attr("class", "common-checkbox");
    } else if (sex == 1) {
        $("[name=ci_sex]").eq(1).attr("checked", "checked").parent().addClass("common-checkbox-checked");
        $("[name=ci_sex]").eq(0).parent().attr("class", "common-checkbox");
    }
    $("[name=ci_phone]").val(div_.eq(3).text());
    $("[name=cc_cardType]").val($("#cardTypeHide").val());
    $("[name=cc_cardNum]").val(div_.eq(5).text());
    var img_card1 = $("#showCustInfo img").eq(0).attr("src");
    if (null != img_card1 && "" != img_card1) {
        var html = '';
        html += '<div class="images-box-img" data-type="CD1">';
        html += '<img class="showboxImg" name="CD1" src="' + img_card1 + '">';
        html += '<span class="images-box-img-delete" data-type="CD1" data-id="' + ""/*data.cc_id*/ + '" data-del-url="/customer/deleteImage" style="display: none;">删除</span>';
        html += '</div>';
        var mode = getUrlParam("mode");
        if ("addTG" == mode) {
            $(".images-btn").eq(3).html(html);
        } else if ("addZL" == mode) {
            $(".images-btn").eq(1).html(html);
        }
        $("#CD1-count").text(1);
    }
    var img_card2 = $("#showCustInfo img").eq(1).attr("src");
    if (null != img_card2 && "" != img_card2) {
        var html = '';
        html += '<div class="images-box-img" data-type="CD1">';
        html += '<img class="showboxImg" name="CD2" src="' + img_card2 + '">';
        html += '<span class="images-box-img-delete" data-type="CD1" data-id="' + ""/*data.cc_id*/ + '" data-del-url="/customer/deleteImage" style="display: none;">删除</span>';
        html += '</div>';
        if ("addTG" == mode) {
            $(".images-btn").eq(4).html(html);
        } else if ("addZL" == mode) {
            $(".images-btn").eq(2).html(html);
        }
        $("#CD2-count").text(1);
    }
    // $("[name=cc_code2]").val($("#cc_code2Hide").val());
    cancelText();
}

function cancelText() {
    $("#cd-buttons").animate({
        left: "-=500px"
    }, 3000);
    $("#cd-buttons").show();
    $("#showCustInfo").hide();
}

/**
 * 下载合同模板
 * @param con_type
 */
function downloadTemplate(con_type){
    window.parent.href_mo("/contractObject/generateContractTemplate?con_type="+con_type+"&template=true", "模板下载", "合同打印");
    // $.ajax({
    //     type: "POST",
    //     // url: "/contractObject/downloadContractTemplate",
    //     data: {
    //         con_type: con_type
    //     },
    //     dataType: "json",
    //     beforeSend: function () {
    //         $.jBox.tip("合同模板生成中...", "loading");
    //     }
    // }).done(function (result) {
    //     // if (result.code == 200) {
    //     //     window.open(result.template_url);
    //     //     $.jBox.tip("合同模板生成成功", "success");
    //     // } else {
    //     //     $.jBox.tip("合同模板下载失败", "error");
    //     // }
    // });
}