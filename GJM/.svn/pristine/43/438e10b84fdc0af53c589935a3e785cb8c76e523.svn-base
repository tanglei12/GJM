<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>管家ERP</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <link href="/resources/image/favicon.ico" rel="shortcut icon" type="image/x-icon">
    <link href="/resources/css/manage_index.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/print.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/ProjectManagement.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/perfect-scrollbar.css" rel="stylesheet" type="text/css">
    <link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"><!-- 旧图标样式 -->
    <link href="/resources/css/select_xs.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/body.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/smartMenu.css" rel="stylesheet" type="text/css"/>
    <link href="/resources/common/perfect-scrollbar/css/perfect-scrollbar.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/Plug-in/msgBox/css/msgBox.css" rel="stylesheet" type="text/css">

    <script src="/resources/js/jquery-1.7.2.min.js"></script>
    <script src="/resources/js/manage_index_left.js"></script>
    <script src="/resources/js/manage_index.js?v=1.0"></script>
    <script src="/resources/js/manage_index_top.js"></script>
    <script src="/resources/js/jquery-smartMenu.js"></script>
    <script src="/resources/js/jquery.cookie.js"></script>
    <script src="/resources/Plug-in/msgBox/js/msgBox.js"></script>
    <script src="/resources/js/serviceSocket.js"></script>
    <script src="/resources/js/common/common.js"></script>
    <script src="/resources/js/sockjs-1.0.3.min.js"></script>
    <script src="/resources/js/encryption/jQuery.md5.js"></script>
    <script src="/resources/common/perfect-scrollbar/js/perfect-scrollbar.jquery.js"></script>
    <style type="text/css">html, body { height: 100%; }</style>
</head>
<body style="overflow: hidden;">
<div id="centerContent">
    <div id="left">
        <div class="topleft">
            <a href="/" target="_parent" class="logoImage"><img src="/resources/image/LOGO.png" title="系统首页" style="margin-top: 10px;"/></a>
            <a class="menus"><span class="entypo-menu"></span></a>
        </div>
        <dl class="leftContent"></dl>
    </div>
    <div id="right">
        <%@include file="topS.jsp" %>
        <div class="chatContent">
            <div class="chatContent-left">
                <div class="chatContent-search"><input type="text" id="chatSearch" onkeyup="personLike()" onchange="personLike()" placeholder="搜索联系人"/><i class="msgs searchIcon"></i></div>
                <div class="chatContent-people">
                    <%-- <div class="chatPerson bgclick" data-send="管家婆群">
                        <div class="chatleft"><img src="/resources/image/chatIcon.jpg"></div>
                        <div class="chatright">管家婆群</div>
                    </div> --%>
                </div>
            </div>
            <div class="chatContent-right">
                <div class="chatContent-right-title">聊天内容<a href="javascript:messageClose();">X</a></div>
                <div class="selectChatMessage">
                    <div class="selectMessage"><span><i class="msgtime timeIcon"></i><a href="javascript:;" onclick="selectChatMeaageHistory()">查看更多消息</a></span></div>

                </div>
                <div class="chatContent-right-send"><input type="text" id="messageContent" placeholder="按回车键也可以发送消息" onkeypress="sendMessage(event)">
                    <div class="sendmessage" onclick="sendM()">发送</div>
                </div>
            </div>
        </div>
        <div class="messageChat">
            <div class="messageChat-bg"></div>
            <div class="messageChat-font"><i class="msg chatIcon"></i>私信聊天</div>
        </div>
        <div id="iframeHtml" style="width: 100%;"></div>
    </div>
    <div class="alertMessageMemo" style="display: none;">
        <div class="alertMessageMemo-left"><img alt="" src="/resources/image/alert-person.png"></div>
        <div class="alertMessageMemo-title">提醒你:</div>
        <div class="alertMessageMemo-close" onclick="alertMessageMemoClose()">x</div>
        <div class="alertMessageMemo-content">
            <ul>
                <!-- <li>1、你<span class="alertMessageMemo-month">10</span>月有3个日程安排未完成<i class="fa fa-mail-forward"></i></li>
                <li>1、你<span class="alertMessageMemo-month">9</span>月有3个日程安排未完成<i class="fa fa-mail-forward"></i></li> -->
            </ul>
        </div>
        <button onclick="alertMessageMemoClose()">知道了</button>
    </div>
</div>
<script>
    var password = '${userCenterEmployees.em_password}';
    var em_documentID = '${userCenterEmployees.em_documentID}';
    var password1 = em_documentID.substring(em_documentID.length - 6, em_documentID.length)
    if (password == $.md5(password1)) {
        updatePassword();
        $(".passw").html("(&nbsp;&nbsp;密码还为初始密码,请修改!&nbsp;&nbsp;)");
        $("#closeDivs").attr("onclick", "");
    }

    /*********邮件信息推送*********/
    var username = $.cookie("em_account");
    var name = $.cookie("em_name");
    var department = '管家婆';
    var chat = new WebSocket('ws://'+ soketHttp +'/chatSocket');

    chat.onerror = function (event) {
        console.log(event);
    };

    chat.onopen = function (event) {
        chat_start();
    };

    chat.onclose = function (event) {
        var msg = JSON.stringify({'username': username, 'type': '3'});
        chat.send(msg);
    };

    chat.onmessage = function (event) {
        var data = JSON.parse(event.data);
        if (data.type == '2') {
            chat_render_data(data.username, data.data, data.payName, data.timer, data.department, data.name, data.receive);
        } else if (data.type == '1') {
            if (data.data != "" && data.data != null) {
                if (data.receive == username) {
                    $.each(data.data, function (idx, item) {
                        chat_render_data(item.cm_sendAccount, item.cm_content, item.cm_receiveAccount, format(item.cm_timer, 'yyyy-MM-dd HH:mm:ss'), item.department, item.name, data.receive);
                    });
                }
            }
            $('.chatContent-people .chatPerson').each(function (i) {
                var ids = this;
                $("#chatContent" + $(ids).attr("id").replace("chatPerson", "") + "").each(function (index) {
                    if ($(this).find(".messageCont").length == 0) {
                        // TODO 选择性注释，要用时自行开启 selectChatMeaageHistory(0,$(ids).attr("data-send"),1);
                    }
                });
            });
        }
    };

    function chat_render_data(usernames, data, payName, timer, department, names, receives) {
        var ids = null;
        var leftid = null;
        var msg = [];
        if (payName == "管家婆群" || receives == "管家婆群") {
            ids = $("#chatContent0");
            leftid = $("#chatPerson0");
            if (username == usernames) {
                msg.push('<div class="messageCont">');
                msg.push('<div class="me">【' + department + '】' + names + ' ' + timer + '</div>');
                msg.push('<div class="meeageFont">' + data + '</div>');
                msg.push('</div>');
            } else {
                msg.push('<div class="messageCont">');
                msg.push('<div class="meeageName">【' + department + '】' + names + ' ' + timer + '</div>');
                msg.push('<div class="meeageFont">' + data + '</div>');
                msg.push('</div>');
            }
            if (payName == "管家婆群") {
                receives = payName;
            }
        } else {
            if (username == receives) {
                $(".chatContent-people .chatPerson").each(function (i) {
                    if ($(this).attr("data-send") == usernames) {
                        ids = $("#chatContent" + $(this).attr("id").replace("chatPerson", "") + "");
                        leftid = this;
                    }
                });
                if (username == usernames) {
                    msg.push('<div class="messageCont">');
                    msg.push('<div class="me">【' + department + '】' + names + ' ' + timer + '</div>');
                    msg.push('<div class="meeageFont">' + data + '</div>');
                    msg.push('</div>');
                } else {
                    msg.push('<div class="messageCont">');
                    msg.push('<div class="meeageName">【' + department + '】' + names + ' ' + timer + '</div>');
                    msg.push('<div class="meeageFont">' + data + '</div>');
                    msg.push('</div>');
                }
            } else {
                $(".chatContent-people .chatPerson").each(function (i) {
                    if ($(this).attr("data-send") == receives) {
                        ids = $("#chatContent" + $(this).attr("id").replace("chatPerson", "") + "");
                        leftid = this;
                    }
                });
                if (username == usernames) {
                    msg.push('<div class="messageCont">');
                    msg.push('<div class="me">【' + department + '】' + names + ' ' + timer + '</div>');
                    msg.push('<div class="meeageFont">' + data + '</div>');
                    msg.push('</div>');
                } else {
                    msg.push('<div class="messageCont">');
                    msg.push('<div class="meeageName">【' + department + '】' + names + ' ' + timer + '</div>');
                    msg.push('<div class="meeageFont">' + data + '</div>');
                    msg.push('</div>');
                }
            }
        }

        $(ids).append(msg.join(''));
        //接收成功返回值，消除离线推送
        $('.selectChatMessage').scrollTop($('.chatContent-right-content .messageCont').length * 50);
        $('.selectChatMessage').perfectScrollbar('update');

        if (receives == "管家婆群") {
            if (!$(".messageChat").is(":hidden")) {
                $(".messageChat-bg").show();
                $(".messageChat-font").html('<i class="msg chatIcon"></i>有新消息');
            }
        } else if (receives == username) {
            if (!$(".messageChat").is(":hidden")) {
                $(".messageChat-bg").show();
                $(".messageChat-font").html('<i class="msg chatIcon"></i>有新消息');
            }
        }
        //消息数字增加
        if ($(leftid).attr("class") != "chatPerson bgclick") {
            $(leftid).find(".messageLine").text(parseInt($(leftid).find(".messageLine").text()) + 1);
            $(leftid).find(".messageLine").show();
            var html = $(leftid).prop("outerHTML");
            $(leftid).remove();
            $(".chatContent-people").prepend(html);

        }
        var msg = JSON.stringify({'username': username, 'type': '4', payName: '', receives: receives, 'usernames': usernames});
        chat.send(msg);

    }

    function chat_start() {
        if (username != '') {
            var msg = JSON.stringify({'username': username, 'type': '1', payName: ''});
            chat.send(msg);
        }
    }

    function chat_send_msg(text, receive) {
        if (text != '') {
            var data = text;
            var timer = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
            var msg = JSON.stringify({'username': username, 'type': '2', 'data': data, payName: '', 'timer': timer, 'department': department, 'name': name, 'receive': receive});
            chat.send(msg);
        }
    }

    /**
     * 发送消息
     */
    function sendMessage(e) { //传入 event
        var e = e || window.event;
        if (e.keyCode == 13) {
            sendM();
        }
    }

    /**
     * 发送消息到socket
     */
    function sendM() {
        if ($("#messageContent").val() != "") {
            var text = $("#messageContent").val();
            var receive = "";
            $(".chatContent-people .chatPerson").each(function () {
                if ($(this).attr("class") == "chatPerson bgclick") {
                    receive = $(this).attr("data-send");
                }
            })
            chat_send_msg($("#messageContent").val(), receive);
            $("#messageContent").val("");
        }
    }

</script>
</body>
</html>