var serviceList = [];
$(function () {
    $.cancelContractInfo();
});
;(function ($) {

    /** 初始化*/
    $.cancelContractInfo = function () {
        // 加载数据
        $.cancelContractInfo.load_data();
        // 绑定事件
        $.cancelContractInfo.load_event();
    };

    /** 参数*/
    $.cancelContractInfo.param = {
        cco_code: getUrlParam("cco_code"),
        mode: getUrlParam("mode"),
    };

    /** 加载数据*/
    $.cancelContractInfo.load_data = function () {
        // 查询合同数据
        $.ajax({
            type: "POST",
            url: "/appPage/queryCancelContractInfo",
            data: {
                cco_code: $.cancelContractInfo.param.cco_code,
                mode: $.cancelContractInfo.param.mode
            },
            dataType: "json",
            async: false,
        }).done(function (result) {
            if (result.code != 200) return $.hint.tip(result.msg, "error");
            $.cancelContractInfo.setInfo(result.data);
        });
    };

    /** 加载事件*/
    $.cancelContractInfo.load_event = function () {

        // 招租编辑
        $(document).on("click", "[name=conEdit]", function () {
            OCCancelContract.cancelContractEdit($.cancelContractInfo.param.con_code, "auditing");
        });

        // 物业交接编辑
        $(document).on("click", "[name=propertyHandoverEdit]", function () {
//			alert('功能暂未完善，请到PC端操作');
//			return;
            OCCancelContract.propertyHandoverEdit($.cancelContractInfo.param.con_code, "compary");
        });

        // 物业交接详情
        $(document).on("click", "[name=propertyHandoverInfo]", function () {
            OCCancelContract.propertyHandoverInfo($.cancelContractInfo.param.con_code, "compary");
        });

        // 费用结算编辑
        $(document).on("click", "[name=propertySettlementEdit]", function () {
//			alert('功能暂未完善，请到PC端操作');
//			return;
            OCCancelContract.propertySettlementEdit($.cancelContractInfo.param.con_code, "out");
        });

        // 费用结算详情
        $(document).on("click", "[name=propertySettlementInfo]", function () {
            OCCancelContract.propertySettlementInfo($.cancelContractInfo.param.con_code, "out");
        });

        // 审核
        $(document).on("click", "[name=conAuditing]", function () {
//			alert('功能暂未完善，请到PC端操作');
//			return;
            if ($(this).attr("data-property") == "disabled") {
                return $.hint.tip($(this).attr("data-hint"), "hint");
            }
            $.cancelContractInfo.submitContractAuditing();
        });

        // 审核记录
        $(document).on("click", "[name=cancelContractRecord]", function () {
            var box = $(".content-mask");
            if (box.length > 0) {
                box.remove();
                return;
            }

            var html = '';
            html += '<div class="content-mask">';
            html += '	<div class="content-mask-main">';
            html += '		<div class="mask-main-head">';
            html += '			<div class="mask-main-head-title">审核记录</div>';
            html += '			<div class="mask-main-head-option"><button name="contractBillClose"><i class="fa-remove"></i></button></div>';
            html += '		</div>';
            html += '		<div class="mask-main-content">';
            html += '			<div><img src="/resources/image/svg/rolling.svg" style="width:38px;display: block;margin: 20% auto;"></div>';
            html += '		</div>';
            html += '	</div>';
            html += '</div>';
            box = $(html).appendTo("body");
            box.find(".content-mask-main").animate({"bottom": "0px"});

            $.ajax({
                type: 'POST',
                url: '/contractObject/queryCancelRecord',
                data: {
                    cco_code: $.cancelContractInfo.param.cco_code
                },
                dataType: 'json',
                beforeSend: function () {
                    box.find(".mask-main-content").html('<div style="line-height: 60px;font-size: 14px;text-align: center;">加载中...</div>').fadeIn();
                }
            }).done(function (result) {
                if (result.code != 200) {
                    box.find(".mask-main-content").html('<div style="line-height: 60px;color: #E74C3C;font-size: 14px;text-align: center;">' + result.msg + '</div>');
                    return;
                }
                var html = "";
                html += '<table class="table-record">';
                $.each(result.data, function (index, data) {
                    html += '	<tr>';
                    html += '		<td style="width:82px;font-weight: bold;" title="' + returnDate(data.auditingRecord_createTime) + '">' + returnDate(data.auditingRecord_createTime) + '</td>';
                    html += '		<td style="text-align: left;">' + returnValue(data.auditingRecord_state) + returnValue(isEmpty(data.auditingRecord_content) ? data.auditingRecord_content : data.auditingRecord_content) + '</td>';
                    html += '		<td style="width:64px">' + returnValue(data.auditingRecord_author) + '</td>';
                    html += '	</tr>';
                });
                html += '</table>';
                box.find(".mask-main-content").html(html);
            });

            box.find("[name=contractBillClose]").off("click").on("click", function () {
                box.find(".content-mask-main").animate({
                    bottom: "-1000px",
                }, function () {
                    box.fadeOut("fast", function () {
                        box.remove();
                    });
                });
            });

            box.find(".content-mask-main").off("click").on("click", function (e) {
                e.stopPropagation();
            });

            box.off("click").on("click", function () {
                box.find(".content-mask-main").animate({
                    bottom: "-1000px",
                }, function () {
                    box.fadeOut("fast", function () {
                        box.remove();
                    });
                });
            });
        });

    };

    /** 设置合同信息*/
    $.cancelContractInfo.setInfo = function (data) {
        console.log(data);
        // 合同数据
        contract = data.contract || "";
        // 招租订单
        cancelContract = data.cancelContract || "";
        // 客户信息
        customer = data.custome || "";
        propertyMain = data.propertyMain || "";
        statementOrder = data.statementOrder || "";

        // 赋值合同CODE
        $.cancelContractInfo.param.con_code = contract.contractObject_Code;

        var html = '';

        // 【订单信息】
        var cco_state = returnCancelContractState(cancelContract.cco_state);
        html += '';
        html += '<div class="content">';
        html += '	<div class="content-head">';
        html += '		<div class="content-item-title">订单信息</div>';// （<span class="next">'+ returnValue(cancelContract.cco_applicationType) +'</span>）
        html += '		<div class="content-item-option">';//		html += '		<div class="content-item-option '+ cco_state.color +'" style="padding-right: 10px;">'+ cco_state.title +'</div>';
        html += '			<button class="item-option-btn" name="cancelContractRecord">审核记录</button>';
        html += '		</div>';
        html += '	</div>';
        html += '	<div class="content-main">';
        html += '	    <div class="content-item">';
        html += '	    	<dl><dt>招租类型</dt><dd class="error">' + returnValue(cancelContract.cco_applicationType) + '</dd></dl>';
        html += '	    	<dl><dt>订单状态</dt><dd class="' + cco_state.color + '">' + cco_state.title + '</dd></dl>';
        html += '	    </div>';
        html += '	    <div class="content-item">';
        html += '	    	<dl><dt>申请人</dt><dd>' + returnValue(cancelContract.cco_applicantName) + '</dd></dl>';
        html += '	    	<dl><dt>申请日期</dt><dd>' + returnDate(cancelContract.cco_handleDate) + '</dd></dl>';
        html += '	    </div>';
        html += '	    <div class="content-item">';
        html += '	    	<dl><dt>经办人</dt><dd>' + returnValue(cancelContract.cco_peopleName) + '</dd></dl>';
        html += '	    	<dl><dt>经办日期</dt><dd>' + returnDate(cancelContract.cco_applicationTime) + '</dd></dl>';
        html += '	    </div>';
        html += '	    <div class="content-item">';
        html += '	    	<dl><dt>申请说明</dt><dd>' + returnValue(cancelContract.cco_applicationContent) + '</dd></dl>';
        html += '	    </div>';
        html += '	</div>';
        html += '</div>';
        html += '';

        // 【房源信息】
        html += '';
        html += '<div class="content">';
        html += '	<div class="content-head">';
        html += '		<div class="content-item-title">房源信息</div>';
        html += '	</div>';
        html += '	<div class="content-main">';
        html += '	    <div class="content-item">';
        html += '	    	<dl><dt>小区房号</dt><dd>' + returnValue(contract.house_address) + '</dd></dl>';
        html += '	    </div>';
        html += '	    <div class="content-item">';
        html += '	    	<dl><dt>户型面积</dt><dd>建筑面积' + returnValue(contract.hi_measure) + '平方米，' + returnNumber(contract.hi_houseS) + '室' + returnNumber(contract.hi_houseT) + '厅' + returnNumber(contract.hi_houseW) + '卫</dd></dl>';
        html += '	    </div>';
        html += '	</div>';
        html += '</div>';
        html += '';

        var startDate = returnDate(contract.contractObject_Date);
        var endDate = returnDate(contract.contractObject_DeadlineTime);

        html += '';
        html += '<div class="content">';
        html += '	<div class="content-head">';
        html += '		<div class="content-item-title">合同信息（<span class="error">NO.' + contract.contractObject_No + '</span>）</div>';
        html += '	</div>';
        html += '	<div class="content-main">';
        html += '	    <div class="content-item">';
        html += '	    	<dl><dt>合同期限</dt><dd>' + startDate + '~' + endDate + '（' + returnBusinessYMD(startDate, endDate) + '）</dd></dl>';
        html += '	    </div>';
        html += '	    <div class="content-item">';
        html += '	    	<dl><dt>租金</dt><dd class="error">' + returnValue(contract.contractBody_Rent) + (contract.contractObject_RentFreeMode == 1 ? '元/年（<i class="error" style="font-style: normal;">打包年付</i>）' : '元/月') + '</dd></dl>';
        html += '	    </div>';
        html += '	    <div class="content-item">';
        html += '	    	<dl><dt>押金</dt><dd>' + returnFloat(contract.contractBody_Pay) + '元</dd></dl>';
        html += '	    </div>';
        html += '	    <div class="content-item">';
        html += '	    	<dl><dt>服务费</dt><dd>' + returnFloat(contract.contractBody_Service) + '元</dd></dl>';
        html += '	    </div>';
        html += '	</div>';
        html += '</div>';
        html += '';

        //【物业交接】
        html += '';
        html += '<div class="content step2">';
        html += '	<div class="content-head">';
        html += '		<div class="content-item-title">物业交接</div>';
        html += '		<div class="content-item-option">';
        if (isEmpty(propertyMain) || isEmpty(propertyMain.hpm_handoverPersonOut)) {
            html += '		<button class="item-option-btn error" name="propertyHandoverEdit">待交接</button>';
        } else {
            html += '		<button class="item-option-btn" name="propertyHandoverInfo">查看</button>';
            html += '		<button class="item-option-btn next" name="propertyHandoverEdit">交接</button>';
        }
        html += '		</div>';
        html += '	</div>';
        html += '</div>';
        html += '';

        //【费用结算】
        html += '';
        html += '<div class="content step2">';
        html += '	<div class="content-head">';
        html += '		<div class="content-item-title">费用结算</div>';
        html += '		<div class="content-item-option">';
        if (isEmpty(statementOrder)) {
            html += '		<button class="item-option-btn error" name="' + (isEmpty(propertyMain) ? "propertyHandoverEdit" : "propertySettlementEdit") + '">待结算</button>';
        } else {
            html += '		<button class="item-option-btn" name="propertySettlementInfo">查看</button>';
            html += '		<button class="item-option-btn next" name="propertySettlementEdit">结算</button>';
        }
        html += '		</div>';
        html += '	</div>';
        html += '</div>';
        html += '';

        $("#main").html(html);

        var param = {};
        param.propertyHandoverEdit = {isOpen: false, style: "", property: ""};
        param.conAuditing = {isOpen: false, style: "", property: ""};

        html = "";
        html += '<div class="content content-footer">';
        if (cancelContract.cco_state == "审核未通过") {
            $(".step2").hide();
            html += '<button class="content-submmit next-bg" name="conEdit"><i class="fa-edit"></i>修改订单</button>';
            html += '<button class="content-submmit error-bg" name="conAuditing"><i class="fa-legal"></i>提交审核</button>';
        } else if (cancelContract.cco_state == "待审核") {
            $(".step2").hide();
            html += '<button class="content-submmit hint-bg"><i class="fa-hourglass-half"></i>审核中...</button>';
        } else if (cancelContract.cco_state == "待交接" || cancelContract.cco_state == "待结算" || cancelContract.cco_state == "复审未通过") {
            // 未完善合同和交接结算不能提交
            if (isEmpty(statementOrder)) {
                param.conAuditing.property = "disabled";
                param.conAuditing.hint = "请完善费用结算";
            } else {
                if (isEmpty(statementOrder.statement_sign)) {
                    param.conAuditing.property = "disabled";
                    param.conAuditing.hint = "请完善[费用结算]客户签字";
                } else {
                    $("[name=propertySettlementEdit]").attr("disabled");
                }
            }
            if (isEmpty(propertyMain) || isEmpty(propertyMain.hpm_handoverPersonOut)) {
                param.conAuditing.property = "disabled";
                param.conAuditing.hint = "请完善物业交接";
            }
            html += '<button class="content-submmit error-bg" name="conAuditing" data-property="' + param.conAuditing.property + '" data-hint="' + param.conAuditing.hint + '"><i class="fa-legal"></i>提交复审</button>';
        } else if (cancelContract.cco_state == "待复审") {
            $("[name=propertyHandoverEdit]").hide();
            $("[name=propertySettlementEdit]").hide();
            html += '<button class="content-submmit hint-bg"><i class="fa-hourglass-half"></i>复审中...</button>';
        } else if (cancelContract.cco_state == "复核未通过") {
            html += '<button class="content-submmit error-bg" name="conAuditing"><i class="fa-legal"></i>提交复审</button>';
        } else if (cancelContract.cco_state == "待复核") {
            $("[name=propertyHandoverEdit]").hide();
            $("[name=propertySettlementEdit]").hide();
            html += '<button class="content-submmit hint-bg"><i class="fa-hourglass-half"></i>复核中...</button>';
        } else if (cancelContract.cco_state == "完成") {
            $("[name=propertyHandoverEdit]").hide();
            $("[name=propertySettlementEdit]").hide();
            html += '<button class="content-submmit ok-bg"><i class="fa-check-circle"></i>' + cancelContract.cco_state + '</button>';
        } else {
            $("[name=propertyHandoverEdit]").hide();
            $("[name=propertySettlementEdit]").hide();
            html += '<button class="content-submmit error-bg">' + cancelContract.cco_state + '</button>';
        }
        html += '</div>';
        html += '';
        $("#footer").html(html);
    };

    /** 提交合同审核*/
    $.cancelContractInfo.submitContractAuditing = function () {
        $.ajax({
            url: "/appPage/submitCancelContractAuditing",
            data: {
                cco_code: $.cancelContractInfo.param.cco_code
            },
            dataType: "json",
            beforeSend: function () {
                $.hint.tip("提交中...", "loading");
                $("[name=conAuditing]").attr("disabled", "disabled");
            }
        }).done(function (result) {
            if (result.code != 200) return $.hint.tip(result.msg, "error");
            $.hint.tip("提交成功", "success", 2000, function () {
                $.cancelContractInfo.load_data();
            });
        }).always(function () {
            $("[name=conAuditing]").removeAttr("disabled");
        });
    };

})(jQuery);