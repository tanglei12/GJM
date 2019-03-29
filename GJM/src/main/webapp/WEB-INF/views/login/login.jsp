<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>管家ERP - 登录</title>
    <link type="image/x-icon" rel="shortcut icon" href="/resources/image/favicon.ico">
    <link href="/resources/css/login.css?v=<%=System.currentTimeMillis()%>" rel="stylesheet" type="text/css">
    <script src="/resources/js/jquery-1.7.2.min.js"></script>
    <script src="/resources/js/http.js"></script><!-- url -->
    <script src="/resources/js/product/jquery-cookie.js"></script>
    <script src="/resources/js/login.js"></script>
    <script src="/resources/js/jquery.qrcode.min.js"></script>
</head>
<body>
<div class="bg"></div>
<div class="login">
    <div class="login-box">
        <div class="login-tab">
            <div class="tab tab-l" style="width: 100%;cursor: default;">密码登录</div>
            <div class="tab-scroll" style="width: 100%;"></div>
            <div class="tab_qie"><img src="/resources/image/login/qrcode_login.png"><div class="tab_qie title"><div class="qie_font">扫码登录</div><div class="tab_qie jiao"><em></em><span></span></div></div></div>
        </div>
        <%--
                <div class="login-tab">
                    <div class="tab tab-l" onclick="changeLogin(1)">验证码登录</div>
                    <div class="tab tab-r checked" onclick="changeLogin(2)">密码登录</div>
                    <div class="tab-scroll"></div>
                </div>
        --%>
        <div class="mobile-lg" style="display: none;">
            <div class="lg-div">
                <i class="icon icon-mobile"></i>
                <input class="text" type="number" name="mobile" id="mobile" placeholder="手机号" oninput="checkMobile(this)"/>
            </div>
            <div class="lg-div" style="margin-bottom: 0;">
                <i class="icon icon-lock"></i>
                <input class="text" type="number" name="mobile_code" id="mobile_code" placeholder="动态码" oninput="checkMobileCode(this)"/>
                <button class="code" onclick="getLoginCode(this)">获取动态码</button>
            </div>
            <div class="lg-error"></div>
            <button class="button" id="mobileLogin" onclick="mobileLogin(this)">登&nbsp;&nbsp;录</button>
        </div>
        <div class="account-lg">
            <div class="lg-div lg-name">
                <i class="icon icon-user"></i>
                <input type="text" name="em_account" class="text" id="em_account" autocomplete="off" spellcheck="false" placeholder="手机号"/>
            </div>
            <div class="lg-div lg-pwd" style="margin-bottom: 0;">
                <i class="icon icon-lock"></i>
                <input type="password" name="em_password" class="text" id="em_password" autocomplete="new-password" spellcheck="false" placeholder="密码"/>
                <input type="text" name="password-text" class="text" disabled style="z-index: 5;background: none">
            </div>
            <div class="lg-error"></div>
            <button class="button" id="accountLogin" onclick="accountLogin(this)">登&nbsp;&nbsp;录</button>
        </div>
        <div class="qrcode_div">
            <div class="qrcode_content"></div>
            <div class="qrcode_code"></div>
        </div>
    </div>
    <%--<div class="login-ad"></div>--%>
</div>
<script>
    /*********邮件信息推送*********/
    var ws = new WebSocket('ws://'+ soketHttp +'/loginSocket');

    ws.onerror = function (event) {
        console.log(event);
    };

    ws.onopen = function (event) {
        start();
    };

    ws.onclose = function (event) {
        var msg = JSON.stringify({'type': '1'});
        ws.send(msg);
    };

    ws.onmessage = function (event) {
        var data = JSON.parse(event.data);
        if (data.type == '2') {
            render_data(data.em_phone, data.em_password, data.loginno);
        }
    };

    function render_data(phone, password, loginno) {
        if($(".qrcode_code").data("loginno") == loginno){
            accountLoginQrcode(phone,password);
        }
        accountLoginQrcode()
    }

    function start() {
        var msg = JSON.stringify({'type': '1'});
        ws.send(msg);
    }

    /**
     * 账号登陆
     * @param obj
     */
    function accountLoginQrcode(em_phone, em_password) {
        $.ajax({
            type: "POST",
            url: "/user/accountLoginQrcode",
            data: {
                em_phone: em_phone,
                em_password: em_password
            },
            dataType: "json",
            beforeSend: function () {
            },
            error: function (e) {
                $(".account-lg .lg-error").text("系统异常，请联系管理员");
            },
            success: function (result) {
                if (result.msg != "success") {
                    return;
                }
                window.location.href = '/';
            }
        });
    }

    /**
     * 获取url中的参数
     * */
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; //返回参数值
    }
</script>
</body>
</html>