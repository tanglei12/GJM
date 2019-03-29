<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <!-- 底部 CSS样式 -->
    <link href="/resources/css/manage_index.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/body.css" rel="stylesheet" type="text/css"/>
    <link href="/resources/css/topS.css" rel="stylesheet" type="text/css"/>
    <link href="/resources/css/jquery.jgrowl.css" rel="stylesheet" type="text/css"/>
    <link href="/resources/fancybox/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" media="screen"/>
    <link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">

    <script type="text/javascript" src="/resources/fancybox/jquery.mousewheel-3.0.4.pack.js"></script>
    <script src="/resources/js/http.js"></script><!-- url -->
    <script type="text/javascript" src="/resources/fancybox/jquery.fancybox-1.3.4.pack.js"></script>
    <script src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
    <script type="text/javascript" src="/resources/js/top.js"></script>
    <script type="text/javascript" src="/resources/js/sockjs-1.0.3.min.js"></script>
</head>
<body>
<!-- 顶部 -->
<div id="top">
    <div class="title_top">
        <ul></ul>
    </div>
    <div class="topright">
        <div class="user">
            <span id="mouseImage"><img id="em_image" src=""/></span>
            <span id="userEdit"></span>
            <span style="display: none" id='em_id'></span>
            <i class="top-icon top-icon-close" onclick="javascript:window.location.href='/user/removeSession';"></i>
            <div class='tishi'>
                <ul>
                    <li style="border-bottom: 1px solid #fff;"><a href="javascript:;" onclick="hrefIframe(this)" data-name="m758" data-herf="/user/userInfo">个人信息</a></li>
                    <li style="border-bottom: 1px solid #fff;"><a href="javascript:updatePassword();">修改密码</a></li>
                    <li style="border-bottom: 1px solid #fff;"><a href="javascript:leftTheCompany();">离职申请</a></li>
                    <li><a href="/user/removeSession">退出</a></li>
                </ul>
            </div>
        </div>
    </div>
    <%--版本更新提示--%>
    <div class="topright" style="margin-right: 30px; margin-top: 4px; height: 38px;display: none">
        <a href="javascript:downClick();">
            <i class="icon icon-email"></i>
            <!--     		<span class="badge badge-notification badge-warning animated fadeIn">0</span> -->
        </a>
        <div class="updateMessage">
            <div class="updateMessage-title">
                <span style="display: block; width: 68px; height: 68px; margin: 0 auto; margin-top: 10px; margin-bottom: 4px;"><img src="/resources/image/icon-update.png" style="width: 68px; height: 68px;"/></span>
                <span class="updateMessage-title-font">【版本更新】</span>
            </div>
            <div class="updateMessage-content">
                <div class="updateMessage-content-title">更新内容:</div>
                <div class="updateMessage-content-text">
                    <ul>
                        <li>1.产权地址添加方法：(1).在【合同维护】里面添加。(2).签订合同时添加</li>
                        <li>2.增加房态管理：管理招租房源，管理特价房源，管理特价促销方式</li>
                        <li>3.增加线上支付和机打发票（财务管理和合同里面可以操作）</li>
                        <li>4.增加房源定价</li>
                    </ul>
                </div>
                <button onclick="downClick()">知道了</button>
            </div>
        </div>
        <div class="dropdown-menu dropdown-messages">
            <div id="msg_content">
                <%-- <div class="dropdown-line">
                    <a href="javascript:;">
                        <div class="content-font">黄晓洁派单给你一个保洁，点击进行查看并进行接单操作</div>
                    </a>
                </div>
                <div class="dropdown-line">
                    <a href="javascript:;">
                        <div class="content-font">黄晓洁派单给你一个保洁，点击进行查看并进行接单操作</div>
                    </a>
                </div> --%>
            </div>
            <div class="close-message">
                <a href="javascript:downClick();">
                    <div class="content-font">关闭信息</div>
                </a>
            </div>
        </div>
    </div>
    <%--APP二维码--%>
    <div class="topright" style="margin-right: 20px;display: none">
		<span id="ewm_title" style="display: inline-block;
					padding: 0 10px;
					line-height: 30px;
					border: 1px solid #fff;
					border-radius: 4px;
					color: #fff;
					cursor: default;
					">安卓手机下载</span>
        <div id="ewm_img" style="padding: 1px;
				    background: #fff;
				    border: 1px solid #f1f1f1;
				    display: none;">
            <img src="http://m.cqgjp.com/resources/image/24e0ad95f649d369d17093b68942a52f.png" style="
			    width: 90px;
			    height: 90px;
			    display: block;">
        </div>
    </div>
</div>
<!-- 修改密码 -->
<div id="loadings" style="display: none;">
    <div id="loading"></div>
    <div id="updatePass">
        <div style="color:#4799E6;font-size: 18px;padding-top: 20px;margin-left: 30px;border-bottom: 1px solid #f0f0f0; "><b style="font-size: 15px;">修改密码</b><b class='passw'></b></div>
        <ul>
            <li class="closeDiv" style="cursor:pointer;float:right;line-height:50px;text-align:center;margin-top:-42px; width:100px;height:34px;"><b><span id="closeDivs" onclick="closeDiv();" style="font-size: 26px;color: #000;" class="table-icon table-icon-close"></span></b></li>
        </ul>
        <hr/>
        <table style="margin-bottom: 40px;margin-top: 20px;margin-left: 10px;">
            <tr>
                <td style="padding-left: 20px;padding-bottom: 20px;"><span style="float: left;">原始密码</span><input type="password" onblur="selectPass();" style="width: 200px;float: left;margin-left: 24px;" class="form-control jianjuss" name="oldPassword" placeholder="原始密码"/><i
                        style="margin-left: 10px;line-height: 30px;"></i></td>
            </tr>
            <tr>
                <td style="padding-left: 20px;padding-bottom: 20px;"><span style="float: left;">新密码</span><input type="password" style="width: 200px;float: left;margin-left: 36px;" class="form-control jianjuss" name="newPassword" placeholder="新密码"/></td>
            </tr>
            <tr>
                <td style="padding-left: 20px;padding-bottom: 20px;"><span style="float: left;">确定密码</span><input type="password" onblur="ensurePassword();" style="width: 200px;float: left;margin-left: 24px;" class="form-control jianjuss" name="ensurePassword" placeholder="确定密码"/><i
                        style="margin-left: 10px;line-height: 30px;"></i></td>
            </tr>
        </table>
        <hr/>
        <div style="margin-left: 30px;">
            <input id="updatePs" onclick="updatePs();" class="btn" style="width:70px;margin-bottom: 30px;" type="button" value="修改"/>
        </div>
    </div>
</div>
<!-- end -->
<script>
    $("#userEdit").html($.cookie("em_name"));
    $("#em_id").html($.cookie("em_id"));

    if ($.cookie("em_image") != null) {
        $("#em_image").attr("src", $.cookie("em_image"));
    } else {
        $("#em_image").attr("src", "/resources/image/chatIcon.jpg");
    }
    /*********邮件信息推送*********/
    var username = $.cookie("em_account");
    var ws = new WebSocket('ws://'+ soketHttp +'/meessageSocket');
    //     var ws = new WebSocket('ws://192.168.0.35/meessageSocket');

    ws.onerror = function (event) {
        console.log(event);
    };

    ws.onopen = function (event) {
        start();
    };

    ws.onclose = function (event) {
        var msg = JSON.stringify({'username': username, 'type': '3'});
        ws.send(msg);
    };

    ws.onmessage = function (event) {
        var data = JSON.parse(event.data);
        if (data.type == '2') {
            render_data(data.username, data.data, data.payName, data.href, data.titleName, data.umc_id);
        }
    };

    function render_data(usernames, data, payName, href, titleName, umc_id) {
        var msg = [];
        if (payName != null && payName != "") {
            if (username == payName) {
                msg.push('<div class="dropdown-line">');
                msg.push('<a href="javascript:;" onclick="href_mo(\'' + href + '\',\'' + titleName + '\',\'sendmessage\',\'' + umc_id + '\',this);">');
                msg.push('<div class="content-font">' + data + '</div>');
                msg.push('</a></div>');
                $(".badge").text(parseInt($(".badge").text()) + 1);
            }
        } else {
            msg.push('<div class="dropdown-line">');
            msg.push('<a href="javascript:;" onclick="href_mo(\'' + href + '\',\'' + titleName + '\',\'sendmessage\',\'' + umc_id + '\',this);">');
            msg.push('<div class="content-font">' + data + '</div>');
            msg.push('</a></div>');
        }
        $('#msg_content').append(msg.join(''));
    }

    function start() {
        if (username != '') {
            var msg = JSON.stringify({'username': username, 'type': '1', payName: ''});
            ws.send(msg);
        }
    }

    function send_msg(text, href, titleName, umc_id) {
        if (text != '') {
            var data = text;
            var payName = "";
            if (text.indexOf("@") > -1) {
                payName = text.substring(1, text.indexOf(" "));
                data = text.substring(text.indexOf(" ") + 1, text.length);
            }
            var msg = JSON.stringify({'username': username, 'type': '2', 'data': data, 'payName': payName, 'href': href, 'titleName': titleName, 'umc_id': umc_id});
            ws.send(msg);
        }
    }

    /**
     * 提交推送消息
     * */
    function sendMessageSub(titleName) {
        $.ajax({
            type: "POST",
            url: "/service/sendMessageContent",
            data: {},
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.data == 0) {
                    return;
                }
                var indexs = 0;
                var msg = [];
                console
                $.each(result.userMessageContents, function (index, item) {
                    if (index == 0) {
                        send_msg("@" + item.umc_account + " " + item.umc_content, item.umc_href, titleName, item.umc_id);
                        return;
                    }
                });
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
<script>
    /** 单点登陆 **/
    var em_id = $.cookie("em_id");
    var wsOneLogin = new WebSocket('ws://'+ soketHttp +'/loginOneSocket');
    var bools = true;
    var loginIp = "";

    wsOneLogin.onerror = function (event) {
        console.log(event);
    };

    wsOneLogin.onopen = function (event) {
        startOne();
    };

    wsOneLogin.onclose = function (event) {

    };

    wsOneLogin.onmessage = function (event) {
        var data = JSON.parse(event.data);
        if(loginIp == ""){
            loginIp = data.eml_pcIp;
        }else if(data.eml_pcIp != "" && em_id == data.em_id && loginIp != data.eml_pcIp){
            alert("你的帐号于"+ data.dateStr +"在另一台[电脑]登录，如果不是本人登录请修改密码，重新登录");
            window.location.href = "/user/removeSession";
        }
    };

    function startOne() {
        var json = {};
        json.em_id = em_id;
        json.phoneType = "pc";
        send_msgOne(JSON.stringify(json));
    }

    function send_msgOne(msg) {
        wsOneLogin.send(msg);
    }
</script>
</body>
</html>
