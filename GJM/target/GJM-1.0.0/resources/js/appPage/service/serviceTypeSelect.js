$(function () {
    $.ajax({
        type: "post",
        url: "/appService/serviceTypeList",
        data: "",
        dataType: "json",
        success: function (msg) {
            if (msg.code == 200) {
                var htm = "";
                $.each(msg.data, function (index, item) {
                    var typeLogo = "";
                    if (item.sm_id == 1) {
                        typeLogo = "<img class='left_img' id='typeLogo' src='/resources/image/appPage/service_cleaning.png'>";
                    }
                    if (item.sm_id == 2) {
                        typeLogo = "<img class='left_img' id='typeLogo' src='/resources/image/appPage/service_repair.png'>";
                    }
                    if (item.sm_id == 3) {
                        typeLogo = "<img class='left_img' id='typeLogo' src='/resources/image/appPage/service_renovate.png'>";
                    }
                    if (item.sm_id == 5) {
                        typeLogo = "<img class='left_img' id='typeLogo' src='/resources/image/appPage/service_broadband.png'>";
                    }
                    if (item.sm_id == 6) {
                        typeLogo = "<img class='left_img' id='typeLogo' src='/resources/image/appPage/service_housemoving.png'>";
                    }
                    if (item.sm_id == 12) {
                        typeLogo = "<img class='left_img' id='typeLogo' src='/resources/image/appPage/service_wash.png'>";
                    }
                    if (item.sm_id == 13) {
                        typeLogo = "<img class='left_img' id='typeLogo' src='/resources/image/appPage/service_unlock.png'>";
                    }
                    htm += "<div class='line' id='"+item.sm_id+"' onclick='toSelectService("+item.sm_id+","+item.sm_state+");'>\n" +
                        "    "+typeLogo+"\n" +
                        "    <div class='line-left'>\n" +
                        "        <div class='service-type'>\n" +
                        "            <span >" + item.sm_name + "</span>\n" +
                        "        </div>\n" +
                        "        <div class='service-des'>\n" +
                        "            <span >" + item.sm_content + "</span>\n" +
                        "        </div>\n" +
                        "    </div>\n" +
                        "    <img class='right-img' src='/resources/image/appPage/right.png'>\n" +
                        "</div>";
                })
                $(".content").append(htm)
            }
        }
    })
})

function toSelectService(sm_id,sm_state) {
    if(sm_state == 1){
        window.location.href = "/appService/serviceApply?sm_id="+sm_id;
    } else {
        alert("暂不提此供服务,敬请期待!");
    }
}

/**
 * 回调传惨
 */
function where(result){
    var json = eval(result);
    if(json.type != null && json.type == "refresh"){
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
            window.webkit.messageHandlers.goBackRefresh.postMessage([]);
        } else if (/(Android)/i.test(navigator.userAgent)) {
            webview.goBackRefresh();
        }
    }
}