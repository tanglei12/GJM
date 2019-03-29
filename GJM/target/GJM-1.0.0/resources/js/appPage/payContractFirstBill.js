;(function ($) {

    // 合同订单
    var contractOrder;
    // 合同账单列表
    var contractBillList;
    // 当前账单列表
    var currentBillList = [];
    // 定金账单
    var depositBill;
    // 实际支付金额
    var repayment = 0;
    // 实际支付金额
    var cache_repayment = 0;
    // 房源数据
    var houseData;
    // 客户数据
    var customerData;

    $.contractBillPay = function () {
        // 加载数据
        $.contractBillPay.load_data();
        // 绑定事件
        $.contractBillPay.load_event();
    };

    /** 加载数据*/
    $.contractBillPay.load_data = function () {
        // 加载房源数据
        $.ajax({
            url: "/appPage/queryContractOrderInfo",
            data: {
                bco_code: getUrlParam("bco_code")
            },
            dataType: "json",
            beforeSend: function () {
                $.hint.tip("加载中...", "loading");
            }
        }).done(function (result) {
            $.hint.close();
            if (result.code !== 200) return;

            houseData = result.data.houseLibraryInfo;
            customerData = result.data.customerInfo;
            contractOrder = result.data.contractOrder || "";
            contractBillList = result.data.contractBillList || "";

            $(".balPay").html(contractOrder.bco_type === 201 ? "付" : "收");
            $("#house-address").html(returnValue(houseData.house_address));

            $("#contractBillList").empty();
            var cycle = returnNumber(getUrlParam("cycle"));
            $.each(contractBillList, function (index, data) {
                if (returnNumber(data.bcb_cycle) === cycle) {
                    // 赋值数据
                    currentBillList = data.childs;
                    // 遍历数据
                    $.each(data.childs, function (index, subData) {
                        var repay_style = '';
                        var type_hint = "";
                        var repay_text = '￥' + returnFloat(subData.bcb_repayment);

                        if (subData.bcb_state === 3) {
                            repay_style += 'class="text-line"';
                        } else {
                            repay_style += 'class="error"';
                        }

                        if (returnFloat(subData.bcb_balance) !== 0) {
                            if (subData.bcb_state === 2) {
                                repayment += returnFloat(subData.bcb_balance);
                            }

                            type_hint = '<label class="error fa-info-circle" data-info="（' + returnFloat(subData.bcb_repayment) + '-' + returnFloat(subData.bcb_realPayment) + '）" style="margin-left: 4px;"></label>';

                            repay_style += ' data-info="' + '<div>[总]￥' + returnFloat(subData.bcb_repayment) + ' - [已付]￥' + returnFloat(subData.bcb_realPayment) + '</div><div>= ￥' + returnFloat(subData.bcb_balance) + '</div>"';
                            repay_text = '￥' + returnFloat(subData.bcb_balance);
                        } else {
                            if (subData.bcb_state === 2) {
                                repayment += returnFloat(subData.bcb_repayment);
                            }
                        }

                        var _state = returnBillState(subData.bcb_state);

                        var html = '';
                        html += '<div class="content-item">';
                        html += '	<dl>';
                        html += '		<dt>' + returnBillType(subData.bcb_type) + type_hint + '</dt>';
                        html += '		<dd ' + repay_style + '>' + repay_text + '</dd>';
                        html += '		<dd class="' + _state.style + '" style="flex: initial;padding-left: 10px;">' + _state.text + '</dd>';
                        html += '	</dl>';
                        html += '</div>';
                        $("#contractBillList").append(html);
                    });
                }
            });

            $("#repayment").html((cycle == 0 ? '首' : '第' + cycle) + '期' + (contractOrder.bco_type == 201 ? "付" : "收") + '款：<span class="error">￥' + returnFloat(repayment) + '</span>');
            $("#realpayment").html("￥" + returnFloat(repayment));
            if (cycle != 0) $("#deposit-parent-box").hide();

            cache_repayment = repayment;

            $.contractBillPay.calRealpayment();
        });
    };

    /** 计算实付金额*/
    $.contractBillPay.calRealpayment = function () {
        var money = returnFloat($("#deposit").attr("data-money"));
        repayment = returnFloat(cache_repayment - money);
        $("#realpayment").html("￥" + returnFloat(repayment));
        if (returnFloat(repayment) <= 0) $("[name=pay]").attr("disabled", "disabled");
    };

    /** 绑定事件*/
    $.contractBillPay.load_event = function () {

        // 选择定金
        $("#deposit-box").on("click", function () {
            OCPay.chooseDeposit(houseData.house_address, customerData.cc_name, customerData.ccp_phone);
        });

        // 查看合同账单
        $("#contractBillView").on("click", function () {
            $(".content-mask").remove();

            var html = '';
            html += '<div class="content-mask">';
            html += '	<div class="content-mask-main">';
            html += '		<div class="mask-main-head">';
            html += '			<div class="mask-main-head-title">合同账单</div>';
            html += '			<div class="mask-main-head-option"><button class="head-option-close"><i class="fa-remove"></i></button></div>';
            html += '		</div>';
            html += '		<div class="mask-main-content">';
            html += '			<div><img src="/resources/image/svg/rolling.svg" style="width:38px;display: block;margin: 20% auto;"></div>';
            html += '		</div>';
            html += '	</div>';
            html += '</div>';
            var box = $(html).appendTo("body");
            box.find(".content-mask-main").animate({"bottom": "0px"});

            html = '';
            $.each(contractBillList, function (index, data) {
                var bcb_cycle = returnNumber(data.bcb_cycle) === 0 ? "首" : returnNumber(data.bcb_cycle);
                var bcb_state = returnBillState(data.bcb_state, contractOrder.bco_type === "201" ? "还" : "收");
                if (bcb_state.text === "第三方") {
                    bcb_state.text = contractOrder.bco_cooperater;
                    bcb_state.style = "ok";
                }
                html += '<div class="mask-main-content-item">';
                html += '	<div style="display:flex;font-size: 14px;"><span style="flex:1;">' + bcb_cycle + '期</span><span style="font-weight: bold;">￥' + returnFloat(data.bcb_repayment) + '</span></div>';
                html += '	<div style="display: flex;"><span style="flex: 1;">' + returnDate(data.bcb_repaymentDate) + '</span><span class="' + bcb_state.style + '">' + bcb_state.text + '</span></div>';
                html += '</div>';
            });
            box.find(".mask-main-content").html(html);

            box.find(".head-option-close").on("click", function () {
                box.find(".content-mask-main").animate({
                    bottom: "-1000px"
                }, function () {
                    box.fadeOut("fast", function () {
                        box.remove();
                        $('body').css('overflow', 'auto');
                    });
                });
            });

            box.on("click", function () {
                box.find(".content-mask-main").animate({
                    bottom: "-1000px"
                }, function () {
                    box.fadeOut("fast", function () {
                        box.remove();
                        $('body').css('overflow', 'auto');
                    });
                });
            });
        });

    };

    /** APP:设置定金*/
    $.contractBillPay.setDeposit = function (deposit) {
        depositBill = JSON.parse(deposit);
        if (isEmpty(depositBill.bcb_repayment)) {
            $.hint.tip("定金参数有误，请重试或者联系管理员", "error");
            return;
        }
        $("#deposit").attr("data-money", depositBill.bcb_repayment).html("-￥" + returnFloat(depositBill.bcb_repayment));
        $.contractBillPay.calRealpayment();
    };

    /** 确认支付*/
    $.pay = function () {
        var payWay = $("[name=payType]").val();
        if (!isEmpty(depositBill)) {
            currentBillList.push(depositBill);
        }

        // 加载房源数据
        $.ajax({
            url: "/appPage/financeBillPay",
            data: {
                bco_code: contractOrder.bco_code,
                payMoney: repayment,
                payWay: payWay,
                billList: JSON.stringify(currentBillList),
                em_id: getUrlParam("em_id")
            },
            dataType: "json",
            beforeSend: function () {
                $("[name=pay]").attr("disabled", "disabled");
                $.hint("二维码生成中...", "loading");
            }
        }).done(function (result) {
            if (result.code !== 200) return $.hint.tip(result.msg, "error");
            $.hint.close();
            OCPay.payMoney(houseData.house_address, repayment, result.data.qr_code, payWay, houseData.hi_code, result.data.trade_code, contractOrder.bco_currentCycle);
        }).fail(function () {
            $.hint("请求服务器出错，请重试或联系管理员", "error");
        }).always(function () {
            $("[name=pay]").removeAttr("disabled");
        });
    };

    /** 支付完成 TODO 暂未用*/
    $.payDone = function () {
        // $.ajax({
        // 	url : "/appPage/queryContractOrderList",
        // 	data : {
        // 		bco_code : getUrlParam("bco_code")
        // 	},
        // 	dataType : "json",
        // 	beforeSend : function(){
        // 		$("[name=pay]").attr("disabled", "disabled");
        // 	}
        // }).done(function(result){
        // 	if(result.code != 200) return $.hint.tip(result.msg, "error");
        // 	OCPay.payMoney();
        // }).fail(function(){
        //    $.hint("请求服务器出错，请重试或联系管理员", "error");
        // }).always(function(){
        // 	$("[name=pay]").removeAttr("disabled");
        // });
    };

    $(function () {
        $.contractBillPay();
    });

})(jQuery);