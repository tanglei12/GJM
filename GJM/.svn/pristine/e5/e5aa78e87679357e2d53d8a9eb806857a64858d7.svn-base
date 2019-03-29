// JavaScript Document
$(function () {
    // 初始化账户信息
    $("[name=em_account]").val($.cookie('em_account') || "");
    $("[name=mobile]").val($.cookie('em_account') || "");
    var em_account = $("[name=em_account]").val();
    if (em_account == null || em_account == "") {
        $("[name=em_account]").focus();
    } else {
        $("[name=em_password]").focus();
    }

    //回车触发事件
    document.onkeydown = function (e) {
        var ev = document.all ? window.event : e;
        if (ev.keyCode == 13) {
            //要处理的事件
            var checked = $(".login-tab .tab-l").hasClass("checked");
            if (checked) {
                $("#mobileLogin").click();
            } else {
                $("#accountLogin").click();
            }
        }
    };

    // 选中文本框样式
    $("input.text").on({
        "focus": function () {
            $(this).parents(".lg-div").css({borderColor: "#1ABC9C"});
        },
        "blur": function () {
            $(this).parents(".lg-div").css({borderColor: "#A9A9A9"});
        }
    });

    // 二维码和密码登录切换
    $(".tab_qie img").click(function(){
        if($(".qrcode_div").is(":hidden")){
            $(".account-lg").hide();
            $(".qrcode_div").show();
            $(".qie_font").text("密码登录");
            $(".tab-l").text("扫码登录");
            var uuidStr = uuid();
            var href = window.location.href+"?loginNo="+uuidStr;
            $(".qrcode_code").data("loginno",uuidStr);
            $(".qrcode_content").html("");
            $(".qrcode_content").qrcode({width: 140,height: 140,text: href});
            $(".tab_qie img").attr("src","/resources/image/login/pc_login.png");
        }else{
            $(".account-lg").show();
            $(".qrcode_div").hide();
            $(".qie_font").text("扫码登录");
            $(".tab-l").text("密码登录");
            $(".tab_qie img").attr("src","/resources/image/login/qrcode_login.png");
        }
    });

});

/**
 * 切换登录方式
 * @param type
 */
function changeLogin(type) {
    // 验证码登录
    if (type == 1) {
        $(".tab-l").addClass("checked");
        $(".tab-r").removeClass("checked");
        $(".tab-scroll").animate({left: "0"}, 300);
        $(".mobile-lg").show();
        $(".account-lg").hide();
    }

    // 密码登录
    if (type == 2) {
        $(".tab-r").addClass("checked");
        $(".tab-l").removeClass("checked");
        $(".tab-scroll").animate({left: "50%"}, 300);
        $(".mobile-lg").hide();
        $(".account-lg").show();
        if ($("[name=em_account]").val() == "") $("[name=em_account]").focus();
        if ($("[name=em_password]").val() == "") $("[name=em_password]").focus();
    }
}

/**
 * 获取短信验证码
 * @param {Object} obj
 */
function getLoginCode(obj) {
    // 获取手机号
    var mobile = $("#mobile").val();
    if (!isMobile(mobile)) {
        $("#mobile").addClass("error").focus();
        $(".mobile-lg .lg-error").text("请填写正确手机号");
        return;
    }
    // 验证手机号是否已注册
    $.ajax({
        type: "POST",
        url: "/user/checkPhoneNo",
        data: {
            em_phone: mobile
        },
        dataType: "json",
        error: function (e) {
            $(".mobile-lg .lg-error").text("系统异常，请联系管理员");
        },
        success: function (result) {
            if (null == result.userCenterEmployee || undefined == result.userCenterEmployee) {
                $("#mobile").addClass("error").focus();
                $(".mobile-lg .lg-error").text("该手机号未注册，请检查");
                return;
            } else {

                // 移除错误提示
                $("#mobile").removeClass("error");
                $(".mobile-lg .lg-error").text("");
                // 发送验证码
                $.ajax({
                    type: "POST",
                    url: "/user/getLoginCode",
                    data: {
                        mc_phone: mobile
                    },
                    dataType: "json",
                    error: function (e) {
                        $(".mobile-lg .lg-error").text("系统异常，请联系管理员");
                    },
                    success: function (result) {
                        $("[name=mobile_code]").focus();
                    }
                });

                $(obj).attr("disabled", true);
                var time = 60;
                $(obj).html(time + "秒后重试");
                var interval = setInterval(function () {
                    time--;
                    $(obj).html(time + "秒后重试");
                    if (time == 0) {
                        $(obj).html("获取动态码");
                        $(obj).attr("disabled", false);
                        clearInterval(interval);
                    }
                }, 1000);
            }
        }
    });
}

/**
 * 验证手机号
 * @param {Object} mobile
 */
function isMobile(mobile) {
    if (!(/^1(3|4|5|7|8)\d{9}$/.test(mobile))) {
        return false;
    }
    return true;
}

/**
 * 验证码登录
 */
function mobileLogin(obj) {
    var mobile = $("#mobile").val();
    var mobile_code = $("#mobile_code").val();
    if (mobile == "") {
        $("#mobile").addClass("error").focus();
        $(".mobile-lg .lg-error").text("请输入手机号");
        return;
    }
    if (mobile_code == "") {
        $("#mobile_code").addClass("error").focus();
        $(".mobile-lg .lg-error").text("请输入动态码");
        return;
    }

    $(obj).attr("disabled", true);
    $.ajax({
        type: "POST",
        url: "/user/mobileLogin",
        data: {
            mobile: mobile,
            mobile_code: mobile_code
        },
        dataType: "json",
        error: function (e) {
            $(".mobile-lg .lg-error").text("系统异常，请联系管理员");
        },
        success: function (result) {
            if (result.msg == "success") {
                window.location.href = '/';
            } else {
                $(obj).attr("disabled", false);
                $(".mobile-lg .lg-error").text(result.msg);
            }
        }
    });
}

/**
 * 账号登陆
 * @param obj
 */
function accountLogin(obj) {
    var em_account = $("[name=em_account]").val();
    var em_password = $("[name=em_password]").val();
    if (em_account == "") {
        $("#em_account").addClass("error").focus();
        $(".account-lg .lg-error").text("请输入账号");
        return;
    }
    if (em_password == "") {
        $("#em_password").addClass("error").focus();
        $(".account-lg .lg-error").text("请输入密码");
        return;
    }
    $.ajax({
        type: "POST",
        url: "/user/accountLogin",
        data: {
            em_account: em_account,
            em_password: em_password
        },
        dataType: "json",
        beforeSend: function () {
            $(obj).attr("disabled", true);
        },
        error: function (e) {
            $(".account-lg .lg-error").text("系统异常，请联系管理员");
        },
        success: function (result) {
            if (result.msg != "success") {
                $(obj).attr("disabled", false);
                $(".account-lg .lg-error").text(result.msg);
                return;
            }
            $("#em_password").remove();
            window.location.href = '/';
        }
    });
}

/**
 * 验证手机号
 *
 * @param obj
 */
function checkMobile(obj) {
    var mobile = $(obj).val();
    if (mobile.length == 11) {
        if (isMobile(mobile)) {
            // 移除错误提示
            $("#mobile").removeClass("error");
            $(".mobile-lg .lg-error").text("");
        } else {
            $("#mobile").addClass("error").focus();
            $(".mobile-lg .lg-error").text("请填写正确手机号");
        }
        return;
    }
    if (mobile.length > 11) {
        mobile = mobile.slice(0, 11);
        $(obj).val(mobile);
        return;
    }
}

/**
 * 验证验证码
 *
 * @param obj
 */
function checkMobileCode(obj) {
    var code = $(obj).val();
    if (code.length > 6) {
        code = code.slice(0, 6);
        $(obj).val(code);
        return;
    }
}

/**
 * 不重复的uuid
 * */
function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}