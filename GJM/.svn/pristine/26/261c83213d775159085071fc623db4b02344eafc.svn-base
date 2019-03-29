var so_id = getQueryString("so_id");
var em_id = getQueryString("em_id");
$(function () {

});

/**
 * 选择反馈项
 * @param val
 */
function buttonStyle(val) {
    $(".selectButton-checked").removeClass("selectButton-checked");
    $(val).addClass("selectButton-checked");
}

/** 现场反馈提交 */
function problemSubmit() {
    if (isEmpty(so_id) || isEmpty(em_id)) {
        $.hint.tip("提交错误，请刷新重试","error");
        return;
    }

    var theLength = $(".selectButton-checked").length;
    if (theLength == 0) {
        $.hint.tip("您必须选择一个反馈选项");
        return;
    }
    var spp_content = $("#spp_content").val();

    /*if (spp_content == null || spp_content == '') {
        $.hint.tip("请填写问题描述");
        return;
    }*/
    $.ajax({
        type: "POST",
        url: "/appService/addServiceFeedback",
        data: {
            so_id: so_id,
            em_id: em_id,
            spp_item: $(".selectButton-checked").val(),
            spp_content: spp_content
        },
        dataType: "json",
        success: function (result) {
            if (result.code == "200") {
                $.hint.tip("提交成功！","success");
                if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                    window.webkit.messageHandlers.goBackRefresh.postMessage([]);
                } else if (/(Android)/i.test(navigator.userAgent)) {
                    webview.goBackRefresh();
                }
            } else {
                $.hint.tip("提交出错", "error")
            }
        }
    });
}
/** 获取url值*/
function getQueryString(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var result = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null;
}


