var so_id = getQueryString("so_id");
var em_id = getQueryString("em_id");
$(function () {
    sceneFeedbackInfo();
    $("#addFeedback").attr("onclick","serviceFeedback()");
});

/**
 * 反馈信息列表
 */
function sceneFeedbackInfo() {
    $.ajax({
        type: "post",
        url: "/appService/sceneFeedbackInfo",
        data: {
            so_id: so_id
        },
        dataType: "json"
    }).done(function (result) {
        if (result.code != 200) {
            $.hint.tip(result.msg, "error")
            return;
        }

        //跟进记录
        var htm = "";
        $.each(result.serviceProcessProblem, function (index, item) {
            var createTime = format(item.spp_createTime, "yyyy-MM-dd HH:mm:ss");
            htm += " <dl id='spp_id"+item.spp_id+"'>";
            htm += "     <dt onclick='deleteSceneFeedback("+item.spp_id+")'><label><img class='problem-img' src='/resources/image/appPage/pro_img.png'>"+returnValue(item.spp_item)+"</label><label style='float: right;width: 100px;'><button class='scene-button'>删除</button></label></dt>";
            htm += "     <dt class='textareaBox'>";
            htm += "         <span style='text-align: left'>" + returnValue(item.spp_content) + "</span>";
            htm += "     </dt>";
            htm += "     <dt class='nameAndDate'>";
            htm += "         <label>" + returnValue(item.em_name) + "</label><label style='float: right;'>" + createTime + "</label>";
            htm += "     </dt>";
            htm += " </dl>";

        })
        $("#serviceProcessProblem").html(htm);

        //完成确认
        var html = "";
        $.each(result.serviceOrderItem, function (index, item) {
            html += "  <dl style='line-height: 40px;margin-top: 0' data_id='" + item.soit_id + "' data='" + (item.st_id_c == null ? (item.st_id_b == null ? "" : item.st_id_b ) : item.st_id_c) + "'>";
            html += "  <input type='hidden' id='" + item.soit_id + "' soit_done='"+(item.soit_done)+"'  >"
            html += "          <dt class='textareaBox' style='height:40px;line-height: 40px'><label>" + (item.st_name == null ? (item.st_namep == null ? "" : item.st_namep ) : item.st_name) + "</label><label style='float: right;'>";
            html += " <img class='select-img' src='" + (item.soit_done == '1' ? '/resources/image/appPage/select_out.png' : '/resources/image/appPage/select_in.png') + "'></label></dt>";
            html += " </dl>";
        })
        $("#serviceOrderItem").html(html);

        //完成确认选择
        $("#serviceOrderItem > dl").click(function () {
            var imgSrc = $(this).find("img").attr("src");
            if (imgSrc == '/resources/image/appPage/select_out.png') {//如果是未选中状态,则变为选中
                $(this).find("img").attr("src", '/resources/image/appPage/select_in.png');
                $(this).find("input").attr("soit_done",2);
            } else {//如果是选中状态,则变为未选中
                $(this).find("img").attr("src", '/resources/image/appPage/select_out.png')
                $(this).find("input").attr("soit_done",1);
            }
        })
    })
}

/** 获取url值*/
function getQueryString(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var result = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null;
}

/**
 * 提交完成确认
 * */
function submit() {

    if (isEmpty(em_id) || isEmpty(so_id)) {
        $.hint.tip("提交错误，请刷新重试", "error")
        return;
    }

    //拼接数据字符
    var dataStr = "";
    if ($("#serviceOrderItem > dl").length > 0) {
        $("#serviceOrderItem > dl").each(function () {
            dataStr += $(this).find("input").attr("id") +":"+$(this).find("input").attr("soit_done")+";";
        });
        if (dataStr != "") {
            dataStr = dataStr.substring(0, dataStr.length - 1);
        }
    }
    $.ajax({
        type: "POST",
        url: "/appService/submitSceneFeedback",
        data: {
            dataStr : dataStr,
            so_id:so_id,
            em_id : em_id
        },
        dataType: "json",
    }).done(function (result) {
        if (result.code == "200") {
            $.hint.tip(result.msg, "success")
            if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                window.webkit.messageHandlers.goBack.postMessage([]);
            } else if (/(Android)/i.test(navigator.userAgent)) {
                webview.goBack();
            }

        } else {
            $.hint.tip(result.msg, "error")
        }
    })
}

/**
 * 删除
 * @param spp_id
 */
function deleteSceneFeedback(spp_id) {
    if (!confirm("是否确认删除!")) {
        return;
    }
    $.ajax({
        type: "POST",
        url: "/appService/deleteSceneFeedback",
        data: {
            spp_id : spp_id
        },
        dataType: "json",
    }).done(function (result) {
        if (result.code == "200") {
            $("#spp_id"+spp_id).remove();
            $.hint.tip(result.msg, "success");
        } else {
            $.hint.tip(result.msg, "error")
        }
    })
}

/**
 * 添加反馈
 */
function serviceFeedback() {
    window.location.href="/appService/addFeedback?so_id="+so_id+"&em_id="+em_id+"";
}