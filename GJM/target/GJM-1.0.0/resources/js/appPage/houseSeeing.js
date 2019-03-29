$(function () {
    $("#hi_code").val(getQueryString("hi_code"));
    $("#em_id").val(getQueryString("em_id"));

    // 默认时间
    var date = new Date();
    var dateString = date.getFullYear()+"-"+((date.getMonth()+1) < 10 ? "0"+(date.getMonth()+1):(date.getMonth()+1))+"-"+(date.getDate() < 10 ? "0"+date.getDate():date.getDate());
    $("#contractStartDate").val(dateString);

    // 加载事件
    load_event();

    data();
});

/**
 * 加载事件
 */
function load_event() {
    $("#contractDay").on("blur", function () {
        var value = $(this).val();
        $(this).val(value.replace(/[^\d]/g, ""));
        if (value.length > 2) {
            $(this).val(value.substring(0, 2));
        }
        if (parseInt(value) <= 3) {
            alert("短租,请注意出房价格");
        }
    });

    $(".dayDiv .checkboxDay").click(function () {
        $(".checkboxDay").attr("class", "checkboxDay");
        if ($(this).attr("class") == "checkboxDay click") {
            $(this).attr("class", "checkboxDay");
        } else {
            $(this).attr("class", "checkboxDay click");
            $(this).parent().hide();
            $(this).parent().prev().find("input").val($(this).attr("data-type"));
            $("[name=payMoney]").val(moneys($(".money").attr("data-type"), $(this).attr("data-type")));
            $("[name=payMoney]").attr("data-type", moneys($(".money").text(), $(this).attr("data-type")));
        }
    });

    $(".houseDay input").click(function () {
        if ($(this).parent().next().is(":hidden")) {
            $(this).parent().next().show();
        } else {
            $(this).parent().next().hide();
        }
    });

    // $("[name=ccp_phone]").on("input propertychange", function () {
    //     var _val = $(this).val();
    //     var _len = _val.length;
    //     if (_len != 11) {
    //         $("#numberCard").val("");
    //         $("[name=cc_name]").val("");
    //         return;
    //     }
    //     $.ajax({
    //         type: "POST",
    //         url: "/customer/customerControllerBool",
    //         data: {
    //             ccp_phone: $(this).val()
    //         },
    //         dataType: "json",
    //         success: function (result) {
    //             if (result.customer != null) {
    //                 $("#ccp_phone").val(result.customer.cc_phone);
    //                 $("#cc_name").val(result.customer.cc_name);
    //                 $("#numberCard").val(result.customer.cc_cardNum);
    //             } else {
    //                 $("#cc_name").val("");
    //                 $("#numberCard").val("");
    //             }
    //         }
    //     });
    // });

    // 查询客户信息
    $("#numberCard").on({
        "input propertychange": function () {
            var _val = $(this).val();
            if (isEmpty(_val)) {
                $("[name=cc_name]").val("");
                $("[name=ccp_phone]").val("");
                return;
            }
            $.ajax({
                type: "POST",
                url: "/customer/customerControllerBool",
                data: {
                    cc_cardNum: _val
                },
                dataType: "json",
            }).done(function (result) {
                var customer = result.customer || "";
                $("#ccp_phone").val(returnValue(customer.cc_phone));
                $("#cc_name").val(returnValue(customer.cc_name));
                $("#cc_code").val(returnValue(customer.cc_code));

                $.ajax({
                    type: "POST",
                    url: "/dictionary/queryDistrictDictionary",
                    data: {
                        idCardNum: _val
                    },
                    dataType: "json",
                    success: function (rst) {
                        if (rst.code != 200) {
                            $("#cardPlace").html(rst.msg);
                        } else {
                            $("#cardPlace").html(rst.district_address);
                        }
                    }
                });
            });
        }
        // ,"blur": function () {
        //     if (!isIDCard(this.value)) {
        //         return $(this).appMsg("请输入正确的证件号");
        //     }
        // }
    });
}

function data() {
    $.ajax({
        type: "POST",
        url: "/appHouse/houseAPPCode",
        data: {
            code: getQueryString("hi_code")
        },
        dataType: "json",
        success: function (result) {
            var imagePath = "";
            $("#house_address").html(result.houseInformationKeepVo.hi_address);
            $(".money").val((result.houseInformationKeepVo.hi_price == null ? "0" : result.houseInformationKeepVo.hi_price));
            $(".money").attr("data-data", (result.houseInformationKeepVo.hi_price == null ? "0" : result.houseInformationKeepVo.hi_price));
            $(".money").attr("data-type", (result.houseInformationKeepVo.hi_price == null ? "0" : result.houseInformationKeepVo.hi_price));
            if (result.houseInformationKeepVo.hi_price != null) {
                $("[name=payMoney]").val(moneys(result.houseInformationKeepVo.hi_price, 3));
                $("[name=payMoney]").attr("data-type", moneys(result.houseInformationKeepVo.hi_price, 3));
            }
        }
    });
}

function submit() {
    var boo = true;
    $(":required").each(function () {
        if (isEmpty(this.value)) return boo = $(this).appMsg("请填写" + $(this).attr("placeholder"));
    });
    if (!boo) return;

    var rentMoney = $(".money");
    if (parseFloat(rentMoney.val()) < parseFloat(rentMoney.attr("data-type"))) {
        return rentMoney.appMsg("输入出房价不能小于最低价格");
    }

    var phone = $("#ccp_phone");
    if (!isPhone(phone.val())) {
        return $("#ccp_phone").appMsg("请填写正确电话号码");
    }

    var payMoney = $("[name=payMoney]");
    if (returnFloat(payMoney.val()) == 0) {
        return payMoney.appMsg("金额不能为空");
    }
    if (returnFloat(payMoney.val()) < returnFloat(payMoney.attr("data-type"))) {
        return payMoney.appMsg("输入金额不能小于系统定金");
    }

    var numberCard = $("#numberCard");
    if (!cardBool(numberCard.val())) {
        return numberCard.appMsg("请输入正确的证件号");
    }

    var contractStartDate = $("#contractStartDate").val();
    if (contractStartDate == "") {
        return contractStartDate.appMsg("起租日期不能为空");
    }

    var house_address = $("#house_address").text();
    var type = $("#payType").val();
    var hs_content = $("#hs_content").val();
    var hs_type = $("#hs_type").val();
    var moneys = (parseFloat($(".money").val()) * (parseInt($("#contractDay").val()) + 2) + 600) * 20 / 100;
    if (moneys < parseFloat($(".money").val())) {
        moneys = parseFloat($(".money").val());
    }
    if (moneys < parseFloat(payMoney.val())) {
        return payMoney.appMsg("输入金额不能大于总租金的20%");
    }
    $.ajax({
        type: "POST",
        // url: "/financeManage/relatedOrdePayAPPAli",
        url: "/customer/addCustomerFollow",
        data: {
            data: JSON.stringify({
                hi_code: getUrlParam("hi_code"),
                cc_name: $("#cc_name").val(),
                cc_phone: phone.val(),
                cc_card: $("#numberCard").val(),
                payMoney: payMoney.val(),
                payWay: type,
                hs_content: hs_content + hs_type,
                hs_day: $(".houseDay input").val(),
                invalidDay: $(".houseDay input").val(),
                hs_payType: $("#hs_payType").val(),
                hs_contractDay: $("#contractDay").val(),
                em_id: getQueryString("em_id"),
                cc_code: $("#cc_code").val(),
                contractStartDate: contractStartDate
            })
        },
        dataType: "json",
        beforeSend: function () {
            $.hint.tip("订单生成中..", "loading");
        }
    }).done(function (result) {
        if (result.code != 200) return $.hint.tip(result.msg, "error");
        $.hint.close();
        var order_sn = result.data.orderInfo.order_sn;
        var json = {};
        json.house_address = house_address;
        json.money = $(".money").val();
        json.day = $(".houseDay input").val();
        json.moneyD = $("input[name=payMoney]").val();
        json.startDate = $("#contractStartDate").val();
        json.date = $("#contractDay").val();
        json.createTime = (new Date()).Format("yyyy-MM-dd hh:mm:ss");
        json.user = $("#cc_name").val();
        json.phone = $("#ccp_phone").val();
        json.card = $("#numberCard").val();
        json.order_sn = order_sn;
        var jsons = Base64.encode(JSON.stringify(json), "UTF-8");
        window.location.href = '/appHouse/houseSeeingOrder?json=' + jsons;
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
            window.webkit.messageHandlers.goBack.postMessage([]);
        } else if (/(Android)/i.test(navigator.userAgent)) {
            webview.goBack();
        }
    });
}

function submit1() {
    // 获取数据
    var cc_name = $("#cc_name").val();
    if (cc_name == "") {
        alert("客户姓名不能为空");
        return;
    }
    var ccp_phone = $("#ccp_phone").val();
    if (ccp_phone == "") {
        alert("客户电话不能为空");
        return;
    }
    if (parseFloat($(".money").val()) < parseFloat($(".money").attr("data-type"))) {
        alert("输入出房价不能小于最低价格");
        $(".money").focus();
        return;
    }
    if (!isPhone(ccp_phone)) {
        alert("请填写正确电话号码");
        return;
    }
    var hs_content = $("#hs_content").val();
    var hs_state = $("#hs_state").val();
    var hs_type = "";
    if ($("#hs_type").val() == "合同") {
        hs_type = "签订合同";
    } else if ($("#hs_type").val() == "跟进") {
        hs_type = "跟进中";
    } else if ($("#hs_type").val() == "放弃") {
        hs_type = "放弃跟进";
    }
    if (hs_content != "") {
        hs_content = hs_type + "[" + hs_content + "]";
    } else {
        hs_content = hs_type
    }
    // 发送请求
    $.ajax({
        type: "POST",
        url: "/appPage/addHouseSeeing",
        data: {
            cc_name: cc_name,
            ccp_phone: ccp_phone,
            hs_content: hs_content,
            hs_state: hs_state,
            hi_code: $("#hi_code").val(),
            em_id: getQueryString("em_id"),
            hs_day: $(".houseDay input").val(),
            hs_payType: $("#hs_payType").val()
        },
        dataType: "json",
        error: function (e) {
            alert("网络异常，请刷新重试");
        },
        success: function (result) {
            if (result.msg == "success") {
                alert("带看完成");
                if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                    window.webkit.messageHandlers.goBack.postMessage([]);
                } else if (/(Android)/i.test(navigator.userAgent)) {
                    webview.goBack();
                }
                window.location.href = "";
            } else if (result.msg == "error") {
                alert("已经带看该客户了");
            } else if (result.code == 101) {
                alert(result.msg);
            }
        }
    });
}

/**
 * 手机验证
 * */
function personPhones(name, phone) {
    $("#ccp_phone").val(phone.replace(/-/g, ""));
    $("#cc_name").val(name);
    $.ajax({
        type: "POST",
        url: "/customer/customerControllerBool",
        data: {
            ccp_phone: phone.replace(/-/g, "")
        },
        dataType: "json",
        error: function (e) {
            alert("网络异常，请刷新重试");
        },
        success: function (result) {
            if (result.customer != null) {
                $("#ccp_phone").val(result.customer.cc_phone);
                $("#cc_name").val(result.customer.cc_name);
                $("#numberCard").val(result.customer.cc_cardNum);
            }
        }
    });
}

/**
 * 提交带看
 */
function submitHouseSeeing() {
    if ($("#hs_state").val() == "1") {
        if ($("#hs_type").val() == "合同") {
            submit1();
        } else {
            submit();
        }
    } else {
        submit1();
    }
}

/**
 * 设置user
 * */
function userNum(name, num) {
    $("#cc_name").val(name);
    $("#numberCard").val(num);
}

// 定金
function moneyUp(ids) {
    if (parseFloat($(ids).val()) > parseFloat($(".money").text())) {
        $(ids).val($(".money").text());
    }
}

// 跟进客户
function genSeeing(ids) {
    var _parent = $(ids).parent().parent();
    if ($(ids).val() == "1") {
        $(_parent).next().show();
        $(".payMoney").show();
        $("#card-box").show();
        $("#hs_type").html('<option value="定金">定金</option><option value="合同">合同</option>');
    } else {
        $(_parent).next().show();
        $(".payMoney").hide();
        $("#card-box").hide();
        $("#hs_type").html('<option value="跟进">跟进</option><option value="放弃">放弃</option>');
    }
}

// 支付方式
function housePayType(ids) {
    var money = parseFloat($(".money").attr("data-data"));
    if ($(ids).val() == "月付") {
        $(".money").val(money);
        $(".money").attr("data-type", money);
    } else if ($(ids).val() == "季付") {
        $(".money").val(money + 50);
        $(".money").attr("data-type", money + 50);
    } else if ($(ids).val() == "半年付") {
        $(".money").val(moneyt(parseInt(money * (1 - (3.0 / 100)) / 10) * 10));
        $(".money").attr("data-type", moneyt(parseInt(money * (1 - (3.0 / 100)) / 10) * 10));
    } else {
        $(".money").val(moneyt(parseInt(money * (1 - (6.0 / 100)) / 10) * 10));
        $(".money").attr("data-type", moneyt(parseInt(money * (1 - (6.0 / 100)) / 10) * 10));
    }
    $("[name=payMoney]").val(moneys($(".money").attr("data-type"), $(".houseDay input").val()));
    $("[name=payMoney]").attr("data-type", moneys($(".money").text(), $(".houseDay input").val()));
}

/**定金算法:日租金 * 2 * 天数 去掉小数点 个位数抹掉 十位数小于5大于0整为5 大于五进一位十位数为0*/
function moneyt(money) {
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

// 支付类型
function payType(ids) {
    if ($(ids).val() == "定金") {
        $(".payMoney").show();
    } else {
        $(".payMoney").hide();
    }
}

/**定金算法:日租金 * 2 * 天数 去掉小数点 个位数抹掉 十位数小于5大于0整为5 大于五进一位十位数为0*/
function moneys(money, day) {
    /*=========================================*/
    var moneyA = money / 30 * day * 2 / 100;

    var moneystr = moneyA.toString().substring(moneyA.toString().indexOf("."), moneyA.toString().length);
    if (0 < parseFloat(moneystr) && parseFloat(moneystr) <= 0.25) {
        money = parseFloat(parseInt(moneyA) * 100);
    } else if (moneystr == ".0") {
        money = moneyA * 100;
    } else if (0.25 < parseFloat(moneystr) && parseFloat(moneystr) < 0.75) {
        money = parseFloat(parseInt(moneyA) * 100 + 60);
    } else if (0.75 <= parseFloat(moneystr)) {
        money = parseFloat(parseInt(moneyA) * 100 + 100);
    } else {
        money = Math.round(moneyA) * 100;
    }
    return money
    /*=========================================*/
}


function getQueryString(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var result = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null;
}

// 对Date的扩展，将 Date 转化为指定格式的String
//月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
//年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
//例子：
//(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
//(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function cardBool(id) {
    // 1 "验证通过!", 0 //校验不通过
    var format = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/;
    //号码规则校验
    if(!format.test(id)){
        // return {'status':0,'msg':'身份证号码不合规'};
        return false;
    }
    //区位码校验
    //出生年月日校验   前正则限制起始年份为1900;
    var year = id.substr(6,4),//身份证年
        month = id.substr(10,2),//身份证月
        date = id.substr(12,2),//身份证日
        time = Date.parse(month+'-'+date+'-'+year),//身份证日期时间戳date
        now_time = Date.parse(new Date()),//当前时间戳
        dates = (new Date(year,month,0)).getDate();//身份证当月天数
    if(time>now_time||date>dates){
        //return {'status':0,'msg':'出生日期不合规'}
        return false;
    }
    //校验码判断
    var c = new Array(7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2);   //系数
    var b = new Array('1','0','X','9','8','7','6','5','4','3','2');  //校验码对照表
    var id_array = id.split("");
    var sum = 0;
    for(var k=0;k<17;k++){
        sum+=parseInt(id_array[k])*parseInt(c[k]);
    }
    if(id_array[17].toUpperCase() != b[sum%11].toUpperCase()){
        // return {'status':0,'msg':'身份证校验码不合规'}
        return false;
    }
    return true;
}