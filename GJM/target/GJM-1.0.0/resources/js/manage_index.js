//自定义右键上下文
var imageMenuData = [
    [{
        text: "关闭标签页",
        func: function () {
            titleClose($(this).find(".meunTitle").attr("id").replace("meunTitle", ""), null, "1");
        }
    }, {
        text: "关闭其他标签页",
        func: function () {
            var text_title = $(this).text();
            $(".title_top li").each(function () {
                if (text_title == $(this).text()) {
                    titleCloseOther($(this).find(".meunTitle").attr("id").replace("meunTitle", ""), null, "1");
                }
            });
        }
    }, {
        text: "刷新该页面",
        func: function () {
            $('#iframepages' + $(this).find(".meunTitle").attr("id").replace("meunTitle", "") + '').find("iframe").attr("src", $(this).find(".meunTitle").attr("data-href"));
        }
    }]
];

$(function () {
    //标题栏读取cookie
    if ($.cookie('strBuffTile') != null && $.cookie('strBuffTile') != "null") {
//		userJurisdictionUrl($.cookie('strBuffTile'));
        var strBuffTile = $.cookie('strBuffTile');
        // 判断标签页是否有权限
        strArr = strBuffTile.substring(0, strBuffTile.indexOf("#")).split("|");
        strInt = strBuffTile.split("#");
        var strindex = 0;
        strindex = strInt[1];
        $(".title_top ul").append('<li style="text-align: center; text-indent: 0;"><span id="meunTitle0" class="meunTitle" onclick="meunTitle(this,\'0\')" data-href="/user/welcome" data-type="工作门户">工作门户</span></li>');
        for (var i = 0; i < strArr.length; i++) {
            var str = strArr[i];
            strList = str.split("-");
            $(".title_top ul").append('<li><span id="meunTitle' + strList[0] + '" class="meunTitle" onclick="meunTitle(this,\'' + strList[0] + '\',\'\',\'' + $.cookie(strList[3]) + '\',\'' + strList[3] + '\')" data-href="' + strList[2] + '" data-type="' + strList[3] + '">' + strList[1] + '</span><span id="icon-remove" onclick="titleClose(\'' + strList[0] + '\')"><i class="icon-remove"></i></span></li>');
            if (strindex - 1 == i) {
                var sss = strArr[i].split("-");
                if ($.cookie(sss[3]) != null && $.cookie(sss[3]) != "null") {
                    var func = $.cookie(strList[3]);
                    meunTitle("#meunTitle" + strindex + "", strindex, "", func, $.cookie(sss[3]));
                } else {
                    meunTitle("#meunTitle" + strindex + "", strindex);
                }
            }
        }
        meunTitle("#meunTitle" + strindex + "", strindex);
        $(".title_top li").smartMenu(imageMenuData, {
            name: "li"
        });
    } else {
        $(".title_top ul").append('<li style="text-align: center; text-indent: 0;"><span id="meunTitle0" class="meunTitle" onclick="meunTitle(this,\'0\')" data-href="/user/welcome" data-type="工作门户">工作门户</span></li>');
        meunTitle("#meunTitle0", '0');
    }

    $("#iframeHtml").height($(document.body).height() - 52.1);

    $(".title_top li").hover(function () {
        $(this).find(".meunTitle").parent().attr("class", "lihover");
        $(this).find("#icon-remove").show();
    }, function () {
        $(this).find(".meunTitle").parent().attr("class", "");
        $(this).find("#icon-remove").hide();
    });

    //聊天滚动条
    $(".chatContent-people").perfectScrollbar();
    $(".selectChatMessage").perfectScrollbar();

    //聊天框显示
    $(".messageChat").click(function () {
        if ($(".chatContent").is(":hidden")) {
            $(".chatContent").show();
            $("#messageContent").focus();
            $(this).hide();
            $(".messageChat-bg").hide();
            $(".messageChat-font").html('<i class="msg chatIcon"></i>私信聊天');

            $('.selectChatMessage').scrollTop($('.chatContent-right-content .messageCont').length * 50);
            $('.selectChatMessage').perfectScrollbar('update');
        } else {
            $(".chatContent").hide();
        }
    });

    chatPerson();

    //事程提醒
    businessProcess();
    //60*60*1000
    setInterval('businessProcess();', 60 * 60 * 1000);

    //企业通信展开
    $(".messageChat").hover(function () {
        $(this).css("right", "0");
        $(this).find(".msg").css("position", "relative");
        $(this).find(".msg").css("top", "0");
        $(this).find(".msg").css("left", "0");
    }, function () {
        $(this).css("right", "-96px");
        $(this).find(".msg").css("position", "absolute");
        $(this).find(".msg").css("top", "13px");
        $(this).find(".msg").css("left", "3px");
    });

});

//iframe连接地址
//增加标签页和页面层
//function href_mo(href,title,parentTile,name){
//sessions();

/**
 * 关闭聊天窗口
 * */
function messageClose() {
    if ($(".messageChat").is(":hidden")) {
        $(".chatContent").hide();
        $(".messageChat").show();
    } else {
        $(".messageChat").hide();
    }
}

$(window).resize(function () {
    $("#iframeHtml").height($(document.body).height() - 52.1);
});

/**
 * 根据连接查询权限
 *
 * @param url 权限
 */
function userJurisdictionUrl(strBuffTile) {
    var strBuffer = "";
    var strNum = 0;
    var strArr = strBuffTile.substring(0, strBuffTile.indexOf("#")).split("|");
    for (var i = 0; i < strArr.length; i++) {
        var str = strArr[i];
        var strList = str.split("-");
        $.ajax({
            type: "POST",
            url: "/user/userJurisdictionBool",
            data: {
                url: strList[2],
                ucps_type: 2
            },
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {
                if (result.bool == true) {
                    strBuffer += str + "|";
                    strNum += 1
                }
            }
        });
    }

    if (strBuffer != "") {
        strBuffer = strBuffer.substring(0, strBuffer.length - 1);
    }
    strBuffer += "#" + strNum;
    $.cookie('strBuffTile', strBuffer);
}

/**
 * 聊天显示人和聊天内容
 */
function chatPerson() {
    $.ajax({
        type: "POST",
        url: "/user/chatPerson",
        data: [],
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var msg = [];
            var msgContent = [];
            msg.push('<div class="chatPerson bgclick" id="chatPerson0" data-send="管家婆群" onclick="chatPersonClick(this)">');
            msg.push('<div class="chatleft"><img src="/resources/image/chatIcon.jpg"></div>');
            msg.push('<div class="chatright">管家婆群</div>');
            msg.push('<div class="messageLine" style="display:none;">0</div></div>');
            msgContent.push('<div class="chatContent-right-content" id="chatContent0"></div>');
            $.each(result.selectALLMessage, function (idx, item) {
                msg.push('<div class="chatPerson" id="chatPerson' + (idx + 1) + '" data-send="' + item.em_account + '" onclick="chatPersonClick(this)">');
                if (item.em_image == null || item.em_image == "") {
                    msg.push('<div class="chatleft"><img src="/resources/image/chatIcon.jpg"></div>');
                } else {
                    msg.push('<div class="chatleft"><img src="/resources/image/chatIcon.jpg"></div>');
                    /*msg.push('<div class="chatleft"><img src="' + item.em_image + '"></div>');*/
                }
                msg.push('<div class="chatright">' + item.em_name + '</div>');
                msg.push('<div class="messageLine" style="display:none;">0</div></div>');
                msgContent.push('<div class="chatContent-right-content" id="chatContent' + (idx + 1) + '" style="display:none;"></div>');
            });
            $(".chatContent-people").append(msg.join(''));
            $(".selectChatMessage").append(msgContent.join(''));
        }
    });
}

/**
 * 点击事件执行聊天窗口
 *
 * @param ids
 */
function chatPersonClick(ids) {
    $(".chatContent-people").find(".chatPerson").attr("class", "chatPerson");
    $(ids).attr("class", "chatPerson bgclick");

    $(".chatContent-right-content").hide();
    $("#chatContent" + $(ids).attr("id").replace("chatPerson", "") + "").show();

    //判断是否有更多消息
    var account = "";
    var start = "";
    $('.selectChatMessage .chatContent-right-content').each(function (i) {
        if (!$(this).is(":hidden")) {
            start = $(this).find(".messageCont").length;
        }
    });
    $('.chatContent-people .chatPerson').each(function (i) {
        if ($(this).attr("class") == "chatPerson bgclick") {
            account = $(this).attr("data-send");
        }
    });
    $.ajax({
        type: "POST",
        url: "/selectChatMeaageHistoryCount",
        data: "start=" + start + "&sendaccount=" + account + "&receiveaccount=" + username,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result == "0") {
                $(".selectMessage span").html("没有更多消息了");
                $(".selectMessage").css("border-bottom", "1px solid #efefef");
            } else {
                $(".selectMessage span").html('<div class="selectMessage"><span><i class="msgtime timeIcon"></i><a href="javascript:;" onclick="selectChatMeaageHistory()">查看更多消息</a></span></div>');
                $(".selectMessage").css("border-bottom", "1px solid #FFF");
            }
        }
    });

    //隐藏消息数字
    $(ids).find(".messageLine").text(0);
    $(ids).find(".messageLine").hide();

    $('.selectChatMessage').scrollTop($('.chatContent-right-content .messageCont').length * 50);
    $('.selectChatMessage').perfectScrollbar('update');
}

/**
 * 模糊搜索聊天人
 */
function personLike() {
    if ($("#chatSearch").val() != "") {
        $(".chatContent-people .chatPerson").hide();
    }

    $(".chatContent-people .chatPerson").each(function (i) {
        if ($(this).find(".chatright").text().indexOf($("#chatSearch").val()) > -1) {
            $(this).show();
        }
    });
}

/**
 * 查看聊天历史记录
 *
 * @param start
 */
function selectChatMeaageHistory(start, account, indextd) {

    if (start == null) {
        $('.selectChatMessage .chatContent-right-content').each(function (i) {
            if (!$(this).is(":hidden")) {
                start = $(this).find(".messageCont").length;
            }
        });
    }
    if (account == null) {
        $('.chatContent-people .chatPerson').each(function (i) {
            if ($(this).attr("class") == "chatPerson bgclick") {
                account = $(this).attr("data-send");
            }
        });
    }
    var ids = null;
    $.ajax({
        type: "POST",
        url: "/selectChatMeaageHistory",
        data: "start=" + start + "&sendaccount=" + account + "&receiveaccount=" + username,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var msg = [];
            if (result.chatMeaageHistory == "") {
                if (indextd == null) {
                    $(".selectMessage span").html("没有更多消息了");
                    $(".selectMessage").css("border-bottom", "1px solid #efefef");
                }
            } else {
                if (indextd == null) {
                    if (result.chatMeaageHistory.length < 4) {
                        $(".selectMessage span").html("没有更多消息了");
                        $(".selectMessage").css("border-bottom", "1px solid #efefef");
                    } else {
                        $(".selectMessage span").html('<div class="selectMessage"><span><i class="msgtime timeIcon"></i><a href="javascript:;" onclick="selectChatMeaageHistory()">查看更多消息</a></span></div>');
                        $(".selectMessage").css("border-bottom", "1px solid #FFF");
                    }
                }
                $.each(result.chatMeaageHistory, function (idx, item) {
                    if (idx == 3) {
                        if (item.cm_receiveAccount == "管家婆群") {
                            ids = $("#chatContent0");
                        } else {
                            $(".chatContent-people .chatPerson").each(function (i) {
                                if ($(this).attr("data-send") == account) {
                                    ids = $("#chatContent" + $(this).attr("id").replace("chatPerson", "") + "");
                                }
                            });
                        }
                        if (item.cm_sendAccount == username) {
                            msg.push('<div class="messageCont">');
                            msg.push('<div class="me">【' + item.department + '】' + item.name + ' ' + format(item.cm_timer, 'yyyy-MM-dd HH:mm:ss') + '</div>');
                            msg.push('<div class="meeageFont">' + item.cm_content + '</div>');
                            msg.push('</div>');
                        } else {
                            msg.push('<div class="messageCont">');
                            msg.push('<div class="meeageName">【' + item.department + '】' + item.name + ' ' + format(item.cm_timer, 'yyyy-MM-dd HH:mm:ss') + '</div>');
                            msg.push('<div class="meeageFont">' + item.cm_content + '</div>');
                            msg.push('</div>');
                        }
                    }
                });
                $.each(result.chatMeaageHistory, function (idx, item) {
                    if (idx == 2) {
                        if (item.cm_receiveAccount == "管家婆群") {
                            ids = $("#chatContent0");
                        } else {
                            $(".chatContent-people .chatPerson").each(function (i) {
                                if ($(this).attr("data-send") == account) {
                                    ids = $("#chatContent" + $(this).attr("id").replace("chatPerson", "") + "");
                                }
                            });
                        }
                        if (item.cm_sendAccount == username) {
                            msg.push('<div class="messageCont">');
                            msg.push('<div class="me">【' + item.department + '】' + item.name + ' ' + format(item.cm_timer, 'yyyy-MM-dd HH:mm:ss') + '</div>');
                            msg.push('<div class="meeageFont">' + item.cm_content + '</div>');
                            msg.push('</div>');
                        } else {
                            msg.push('<div class="messageCont">');
                            msg.push('<div class="meeageName">【' + item.department + '】' + item.name + ' ' + format(item.cm_timer, 'yyyy-MM-dd HH:mm:ss') + '</div>');
                            msg.push('<div class="meeageFont">' + item.cm_content + '</div>');
                            msg.push('</div>');
                        }
                    }
                });
                $.each(result.chatMeaageHistory, function (idx, item) {
                    if (idx == 1) {
                        if (item.cm_receiveAccount == "管家婆群") {
                            ids = $("#chatContent0");
                        } else {
                            $(".chatContent-people .chatPerson").each(function (i) {
                                if ($(this).attr("data-send") == account) {
                                    ids = $("#chatContent" + $(this).attr("id").replace("chatPerson", "") + "");
                                }
                            });
                        }
                        if (item.cm_sendAccount == username) {
                            msg.push('<div class="messageCont">');
                            msg.push('<div class="me">【' + item.department + '】' + item.name + ' ' + format(item.cm_timer, 'yyyy-MM-dd HH:mm:ss') + '</div>');
                            msg.push('<div class="meeageFont">' + item.cm_content + '</div>');
                            msg.push('</div>');
                        } else {
                            msg.push('<div class="messageCont">');
                            msg.push('<div class="meeageName">【' + item.department + '】' + item.name + ' ' + format(item.cm_timer, 'yyyy-MM-dd HH:mm:ss') + '</div>');
                            msg.push('<div class="meeageFont">' + item.cm_content + '</div>');
                            msg.push('</div>');
                        }
                    }
                });
                $.each(result.chatMeaageHistory, function (idx, item) {
                    if (idx == 0) {
                        if (item.cm_receiveAccount == "管家婆群") {
                            ids = $("#chatContent0");
                        } else {
                            $(".chatContent-people .chatPerson").each(function (i) {
                                if ($(this).attr("data-send") == account) {
                                    ids = $("#chatContent" + $(this).attr("id").replace("chatPerson", "") + "");
                                }
                            });
                        }
                        if (item.cm_sendAccount == username) {
                            msg.push('<div class="messageCont">');
                            msg.push('<div class="me">【' + item.department + '】' + item.name + ' ' + format(item.cm_timer, 'yyyy-MM-dd HH:mm:ss') + '</div>');
                            msg.push('<div class="meeageFont">' + item.cm_content + '</div>');
                            msg.push('</div>');
                        } else {
                            msg.push('<div class="messageCont">');
                            msg.push('<div class="meeageName">【' + item.department + '】' + item.name + ' ' + format(item.cm_timer, 'yyyy-MM-dd HH:mm:ss') + '</div>');
                            msg.push('<div class="meeageFont">' + item.cm_content + '</div>');
                            msg.push('</div>');
                        }
                    }
                });
                $(ids).prepend(msg.join(''));
            }
        }
    });

}

/**
 * iframe连接地址
 * 增加标签页和页面层
 *
 * @param href 链接
 * @param title 标题
 * @param parentTile 主标题
 * @param umc_id 消息提醒编码
 */
function href_mo(href, title, parentTile, umc_id, ids, name) {
//function href_mo(href,title,parentTile,umc_id,ids){
    var indexs = 0;
    if ($(".title_top ul li").html() != null && $(".title_top ul li").html() != "") {
        $(".title_top ul li").each(function (i) {
            indexs = parseInt($(this).find(".meunTitle").attr("id").replace("meunTitle", "")) + 1;
        });
    }
    if ($(".title_top ul li").html() == null) {
        if (parentTile != "sendmessage" && parentTile != null && parentTile != "") {
            $(".title_top ul").append('<li style="background-color:#3eafe0; color:#FFF;"><span id="meunTitle' + indexs + '" class="meunTitle" onclick="meunTitle(this,\'' + indexs + '\')" data-href="' + href + '" data-type="' + parentTile + '">' + title + '</span><span id="icon-remove" onclick="titleClose(\'' + indexs + '\',null,\'0\')"><i class="icon-remove"></i></span></li>');
        } else {
            $(".title_top ul").append('<li style="background-color:#3eafe0; color:#FFF;"><span id="meunTitle' + indexs + '" class="meunTitle" onclick="meunTitle(this,\'' + indexs + '\')" data-href="' + href + '" data-type="' + title + '">' + title + '</span><span id="icon-remove" onclick="titleClose(\'' + indexs + '\',null,\'0\')"><i class="icon-remove"></i></span></li>');
        }
        $("#iframeHtml").append("<div id='iframepages" + indexs + "' class='iframepages' style='width: 100%; height: 100%;'><iframe src='" + href + "'  id='iframepage" + indexs + "' name='iframepage" + indexs + "' frameBorder=0 width='100%' height='100%' scrolling='auto'></iframe></div>")
    } else {
        bool = false;
        $(".title_top ul li").each(function (i) {
            if ($(this).find(".meunTitle").attr("data-type") == title) {
                bool = true;
                var indexmov = parseInt($(this).find(".meunTitle").attr("id").replace("meunTitle", ""));
                meunTitle("#meunTitle" + indexmov + "", indexmov, "", name, title);
                return false;
            }
        });
        if (bool == false) {
            if (($(".title_top ul li").length + 1) > 9) {
                $(".title_top ul li").each(function (i) {
                    var indexs = parseInt($(this).find(".meunTitle").attr("id").replace("meunTitle", ""));
                    if (i == 1) {
                        titleClose(indexs, null, null, "9");
                        return false;
                    }
                });
            }
            $("#iframeHtml").append("<div id='iframepages" + indexs + "' class='iframepages' style='width: 100%; height: 100%;'><iframe src='" + href + "'  id='iframepage" + indexs + "' name='iframepage" + indexs + "' frameBorder=0 width='100%' height='100%' scrolling='auto'></iframe></div>")

            if (parentTile != "sendmessage" && parentTile != null && parentTile != "") {
                $(".title_top ul").append('<li><span id="meunTitle' + indexs + '"  class="meunTitle" onclick="meunTitle(this,\'' + indexs + '\')" data-href="' + href + '" data-type="' + parentTile + '">' + title + '</span><span id="icon-remove" onclick="titleClose(\'' + indexs + '\',null,\'0\')"><i class="icon-remove"></i></span></li>');
            } else {
                $(".title_top ul").append('<li><span id="meunTitle' + indexs + '"  class="meunTitle" onclick="meunTitle(this,\'' + indexs + '\')" data-href="' + href + '" data-type="' + title + '">' + title + '</span><span id="icon-remove" onclick="titleClose(\'' + indexs + '\',null,\'0\')"><i class="icon-remove"></i></span></li>');
            }
            meunTitle("#meunTitle" + indexs + "", indexs, "", name, title);
        }
    }
    titleCookie();
    $(".title_top li").smartMenu(imageMenuData, {
        name: "li"
    });
//	if(name != null && name != ""){
//		setFunctionalJurisdiction(name,indexs,title);
//	}

    //删除XML存储这次点击事件提醒
    if (parentTile == "sendmessage") {
        $.ajax({
            type: "POST",
            url: "/service/sendMessageDelete",
            data: "umc_id=" + umc_id,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result == "1") {
                    $(".title_top ul li").each(function (i) {
                        var titles = $(this).find("span").attr("data-type");
                        if (titles == title) {
                            $('#iframepages' + $(this).find(".meunTitle").attr("id").replace("meunTitle", "") + '').find("iframe").attr("src", $('#iframepages' + $(this).find(".meunTitle").attr("id").replace("meunTitle", "") + '').find("iframe").attr("src"));
                        }
                    });
                }
            }
        });

        $(ids).parent().fadeOut("fast", function () {
            $(".badge").text(parseInt($(".badge").text()) - 1);
            $(this).remove();
        });
    }

    $(".title_top li").hover(function () {
        $(this).find(".meunTitle").parent().attr("class", "lihover");
        $(this).find("#icon-remove").show();
    }, function () {
        $(this).find(".meunTitle").parent().attr("class", "");
        $(this).find("#icon-remove").hide();
    });
}

/**
 * cookie执行存储
 */
function titleCookie() {
    var strBuffTile = "";
    var pox = 0;
    $(".title_top ul li").each(function (i) {
        if (i != 0) {
            if ($(this).css("background-color") == "rgb(48, 54, 65)") {
                pox = $(this).find(".meunTitle").attr("id").replace("meunTitle", "");
            }
            strBuffTile += parseInt($(this).find(".meunTitle").attr("id").replace("meunTitle", "")) + "-" + $(this).find(".meunTitle").text() + "-" + $(this).find(".meunTitle").attr("data-href") + "-" + $(this).find(".meunTitle").attr("data-type") + "|";
        }
    });
    if ($(".title_top ul li").length > 1) {
        strBuffTile = strBuffTile.substring(0, strBuffTile.length - 1);
        strBuffTile = strBuffTile + "#" + pox;
        $.cookie('strBuffTile', null);
        if ($(".title_top ul li").html() != null) {
            if (strBuffTile != "" && strBuffTile != null) {
                $.cookie('strBuffTile', strBuffTile);
            }
        }
    } else {
        $.cookie('strBuffTile', null);
    }
}

/**
 * 单个标签页删除
 *
 * maxlen 超过9个标签页就传递值
 * @param index
 */
function titleClose(index, indexsP, COO, maxlen) {

    var idt = 0;
    $(".title_top ul li").each(function (i) {
        var indexg = parseInt($(this).find(".meunTitle").attr("id").replace("meunTitle", ""));
        if (index == indexg) {
            idt = i;
        }
    });

    if ($("#meunTitle" + index + "").attr("data-type") != $("#meunTitle" + index + "").text() && COO == null) {
        $(".title_top ul li").each(function (i) {
            if ($(this).find(".meunTitle").text() == $("#meunTitle" + index + "").attr("data-type")) {
                meunTitle("#" + $(this).find(".meunTitle").attr("id"), parseInt($(this).find(".meunTitle").attr("id").replace("meunTitle", "")));
                $('#iframepages' + $(this).find(".meunTitle").attr("id").replace("meunTitle", "") + '').find("iframe").attr("src", $('#iframepages' + $(this).find(".meunTitle").attr("id").replace("meunTitle", "") + '').find("iframe").attr("src"));
            }
        });
    } else {
        $(".title_top ul li").each(function (i) {
            var idIndex = parseInt($(this).find(".meunTitle").attr("id").replace("meunTitle", ""));
            if ((idt - 1) == i) {
                var idTitle = "#meunTitle" + parseInt($(this).find(".meunTitle").attr("id").replace("meunTitle", ""));
                if (maxlen == null) {
                    meunTitle(idTitle, idIndex);
                } else {
                    meunTitle(idTitle, idIndex, maxlen);
                }

            }
        });
    }

    $(".title_top ul li").each(function (i) {
        var indexs = parseInt($(this).find(".meunTitle").attr("id").replace("meunTitle", ""));
        if (indexs != 0) {
            if (indexs == index) {
                $(this).remove();
            }
        }
    });

    $("#iframeHtml .iframepages").each(function (i) {
        var indexs = parseInt($(this).attr("id").replace("iframepages", ""));
        if (indexs != 0) {
            if (indexs == index) {
                $(this).remove();
            }
        }
    });

    if ($(".title_top ul li").html() == null || $(".title_top ul li").html() == "null") {
        $('.leftContent dd .menuson li').attr("class", "");
        $('.leftContent dd .menuson').hide();
    }

    titleCookie();
}

/**
 * 删除出当前点击意外的标签页
 *
 * @param index
 */
function titleCloseOther(index) {
    $("#iframeHtml .iframepages").each(function (i) {
        var indexs = parseInt($(this).attr("id").replace("iframepages", ""));
        if (indexs != 0) {
            if (indexs != index) {
                $(this).remove();
            }
        }
    });

    var indext = 0;
    $(".title_top ul li").each(function (i) {
        var indexs = parseInt($(this).find(".meunTitle").attr("id").replace("meunTitle", ""));
        if (indexs != 0) {
            if (indexs != index) {
                $(this).remove();
            } else {
                indext = indexs;
            }
        }
    });

    $(".title_top ul li").each(function () {
        var indexs = parseInt($(this).find(".meunTitle").attr("id").replace("meunTitle", ""));
        if (indext == indexs) {
            meunTitle("#" + $(this).find(".meunTitle").attr("id"), indexs);
            return false;
        }
    });

    if ($(".title_top ul li").html() == null || $(".title_top ul li").html() == "null") {
        $('.leftContent dd .menuson li').attr("class", "");
        $('.leftContent dd .menuson').hide();
    }

    titleCookie();
}

/**
 * 标签页执行事件
 *
 * @param ids
 */
function meunTitle(ids, indexs, maxlen, name, title) {
    $(".title_top li").css("background-color", "#18bc9c");
    $(".title_top li").css("color", "#FFF");
    $(ids).parent().css("background-color", "#303641");
    $(ids).parent().css("color", "#FFF");

    if ($("#iframeHtml #iframepages" + indexs + "").html() == null) {
        $("#iframeHtml").append("<div id='iframepages" + indexs + "' class='iframepages' style='width: 100%; height: 100%;'><iframe src='" + $(ids).attr("data-href") + "'  id='iframepage" + indexs + "' name='iframepage" + indexs + "' frameBorder=0 width='100%' height='100%' scrolling='auto'></iframe></div>");
    }

    $("#iframeHtml .iframepages").each(function (i) {
        $(this).hide();
    });
    $("#iframepages" + indexs + "").show();

    //标签页触发导航条样式事件
    var text = "";
    $('.leftContent dd .menuson li').attr("class", "");
    var bool = false;
    $('.leftContent dd').each(function (i) {
        var kbool = false;
        $(this).find(".menuson li").each(function (idx) {
            text = $(this).find("a").text().substring(0, 4);
            if ($(ids).attr("data-type") == text && !$(this).parent().is(":hidden")) {
                bool = true;
                kbool = true;
                return false;
            }
        });
        if (kbool == false) {
            $(this).find(".left_title").attr("class", "left_title");
            $(this).find(".left_title .fa").attr("class", "fa arrow");
            $(this).find(".menuson").hide();
        }
    });

    $('.leftContent dd .menuson li').each(function (i) {
        var text = $(this).find("a").text().substring(0, 4);
        if ($(ids).attr("data-type") == text) {
            $(this).attr("class", "active");
            if ($("#left").width() != 46) {
                $(this).parent().prev().attr("class", "left_title navPC-hover");
            }
            $(this).parent().prev().find(".fa").attr("class", "fa fors");
            $(this).attr("class", "active");
            if ($("#left").width() != 46) {
                $(this).parent().slideDown();
            }
        }
    });

    titleCookie();
//	if(name != null && name != ""){
//    	setFunctionalJurisdiction(name,indexs,title);
//    }

}

//窗口变化自适应
$(window).resize(function () {
    windowSize();
});

//窗口大小left适应
function windowSize() {
    var userAgent = window.navigator.userAgent.toLowerCase();
    $.browser.msie10 = $.browser.msie && /msie 10\.0/i.test(userAgent);
    $.browser.msie9 = $.browser.msie && /msie 9\.0/i.test(userAgent);
    $.browser.msie8 = $.browser.msie && /msie 8\.0/i.test(userAgent);
    $.browser.msie7 = $.browser.msie && /msie 7\.0/i.test(userAgent);
    $.browser.msie6 = !$.browser.msie8 && !$.browser.msie7 && $.browser.msie && /msie 6\.0/i.test(userAgent);

    var width = $(window).width();
    var height = $(window).height();
    var title_height = 40;
    var num = 0;
    $(".leftContent .left_title").each(function (i) {
        title_height += 35;
    });
    $(".leftContent ul").each(function (i) {
        if ($(this).is(':visible')) {
            $(this).find("li").each(function (i) {
                num++;
            });
            return false;
        }
    });
    title_height += num * 30;
    if (height < title_height) {
        $("#left").height(title_height);
    } else {
        $("#left").height(height - 88);
    }

//    $("#right").width(width-$("#left").width()-18);
//	$("#right").height(height-$("#top").height()-44);

}

function setFunctionalJurisdiction(name, indexs, title) {
    $.ajax({
        type: "POST",
        url: "/user/setFunctionalJurisdiction",
        data: "name=" + name,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            $(".title_top ul li").each(function (i) {
                if ($(this).children("span").attr("data-type") == title) {
                    indexs = i;
                }
            });
            $.each(result.functionLists, function (idx, item) {
                $("#iframepage" + indexs).on("load", function () {
                    if (idx == 0) {
                        $(window.frames["iframepage" + indexs].document).find(".rightinfo").children("div").children(".toolbar").html("");
                    }
                    //加载完成，需要执行的代码
                    var url = item.ucf_url;
                    var length = '84px';
                    if (item.ucf_name.length > 2) {
                        length = '108px';
                    }
                    if (url.indexOf("javascript") == 0) {
                        $(window.frames["iframepage" + indexs].document).find(".rightinfo").children("div").children(".toolbar").append("<li class='click' style='width:" + length + "'><span class='" + item.img + "'></span><a id='update' href='" + item.ucf_url + "'>" + item.ucf_name + "</a></li>");
                    } else {
                        $(window.frames["iframepage" + indexs].document).find(".rightinfo").children("div").children(".toolbar").append("<li class='click' style='width:" + length + "'><span class='" + item.img + "'></span><a href='javascript:;' onclick=\"functionIfram('" + item.ucf_url + "','" + item.title + "','" + title + "')\">" + item.ucf_name + "</a></li>");
                    }
                });
                $.cookie(title, item.ucm_code);
            });
        }
    });
}

/**
 * 事程安排提醒
 */
function businessProcess() {
    $.ajax({
        type: "POST",
        url: "/memo/unfinishedEvent",
        data: [],
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = "";
            if (result.unfTask != 0) {
                unfTask = result.unfTask.split(",");
                html += '<li onclick="hrefAlertMessage(\'' + unfTask[2] + '\')">1、你<span class="alertMessageMemo-month">' + unfTask[0] + '</span>月有' + unfTask[1] + '个日程安排未完成<i class="fa fa-mail-forward"></i></li>';
            }
            if (result.unfTask1 != 0) {
                unfTask = result.unfTask1.split(",");
                html += '<li onclick="hrefAlertMessage(\'' + unfTask[2] + '\')">2、你<span class="alertMessageMemo-month">' + unfTask[0] + '</span>月有' + unfTask[1] + '个日程安排未完成<i class="fa fa-mail-forward"></i></li>';
            }
            if (result.unfTask2 != 0) {
                unfTask = result.unfTask2.split(",");
                html += '<li onclick="hrefAlertMessage(\'' + unfTask[2] + '\')">3、你<span class="alertMessageMemo-month">' + unfTask[0] + '</span>月以前有' + unfTask[1] + '个日程安排未完成<i class="fa fa-mail-forward"></i></li>';
            }
            $(".alertMessageMemo-content ul").html(html);

            if (html != "") {
                $(".alertMessageMemo").show();
            }
        }
    });
}

/**
 * 关闭事程安排
 */
function alertMessageMemoClose() {
    $(".alertMessageMemo").hide();
}

/**
 * 跳转到未安排事程
 */
function hrefAlertMessage(where) {
    $("#meunTitle0").attr("data-href", "/user/welcome?yearMonth=" + where);
    $("#iframepage0").attr("src", "/user/welcome?yearMonth=" + where);
    meunTitle("#meunTitle0", '0');
    $(".alertMessageMemo").hide();
}

function sendMessageSub(str) {

}
