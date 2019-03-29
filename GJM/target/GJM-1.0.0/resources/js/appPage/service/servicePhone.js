var hi_code = getQueryString("hiCode");
var so_id = getQueryString("so_id");
$(function () {
    load_data();
});

function load_data() {
    $.ajax({
        type: 'post',
        url: "/appService/queryServicePhone",
        data: {
            hi_code: hi_code,
            so_id: so_id
        },
        dataType: 'json'
    }).done(function (result) {
        if (result.code != 200) {
            $.hint.tip("加载联系人失败", "error");
            return;
        }
        var html = "";
        var contractServiceOfz = result.data.contractServiceOfz;
        var contractServiceOft = result.data.contractServiceOft;
        var serviceOrderVo = result.data.serviceOrderVo;
        if (!isEmpty(contractServiceOfz)) {
            html += " <dl onclick='callphone(\"" + contractServiceOfz.ccp_phone + "\")'>";
            html += "         <dt><label>租客</label></dt>";
            html += "     <dd><label>" + contractServiceOfz.cc_name + "</label><label style='margin-left: 20px'>" + contractServiceOfz.ccp_phone + "</label><div><img src='/resources/image/appPage/service_phone.png'></div></dd>";
            html += "     </dl>";
        }
        if (!isEmpty(contractServiceOft)) {
            html += " <dl onclick='callphone(\"" + contractServiceOft.ccp_phone + "\")'>";
            html += "         <dt><label>房东</label></dt>";
            html += "     <dd><label>" + contractServiceOft.cc_name + "</label><label style='margin-left: 20px'>" + contractServiceOft.ccp_phone + "</label><div><img src='/resources/image/appPage/service_phone.png'></div></dd>";
            html += "     </dl>";
        }
        if (!isEmpty(contractServiceOft)) {
            html += " <dl onclick='callphone(\"" + contractServiceOft.em_phone + "\")'>";
            html += "         <dt><label>存房人</label></dt>";
            html += "     <dd><label>" + contractServiceOft.em_name + "</label><label style='margin-left: 20px'>" + contractServiceOft.em_phone + "</label><div><img src='/resources/image/appPage/service_phone.png'></div></dd>";
            html += "     </dl>";
        }
        if (!isEmpty(contractServiceOfz)) {
            html += " <dl onclick='callphone(\"" + contractServiceOfz.em_phone + "\")'>";
            html += "         <dt><label>出房人</label></dt>";
            html += "     <dd><label>" + contractServiceOfz.em_name + "</label><label style='margin-left: 20px'>" + contractServiceOfz.em_phone + "</label><div><img src='/resources/image/appPage/service_phone.png'></div></dd>";
            html += "     </dl>";
        }
        if (!isEmpty(serviceOrderVo)) {
            html += " <dl onclick='callphone(\"" + serviceOrderVo.so_contractPhone + "\")'>";
            html += "         <dt><label>联系人</label></dt>";
            html += "     <dd><label>" + serviceOrderVo.so_contractor + "</label><label style='margin-left: 20px'>" + serviceOrderVo.so_contractPhone + "</label><div><img src='/resources/image/appPage/service_phone.png'></div></dd>";
            html += "     </dl>";
            html += " <dl onclick='callphone(\"" + serviceOrderVo.so_payPhoneNew + "\")'>";
            html += "         <dt><label>付费人</label></dt>";
            html += "     <dd><label>" + serviceOrderVo.so_payNameNew + "</label><label style='margin-left: 20px'>" + serviceOrderVo.so_payPhoneNew + "</label><div><img src='/resources/image/appPage/service_phone.png'></div></dd>";
            html += "     </dl>";
        }
        $(".center").html(html);

    })
}

/** 获取url值*/
function getQueryString(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var result = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null;
}

/** 是否为空 */
var isEmpty = function (str) {
    return str == null || typeof str == "undefined" || str == "" || str == "undefined" || str == "null" || str.length == 0 || str == {};
};

/**
 * 拨打电话
 */
function callphone(tel){
    window.location.href = "tel://"+tel+"";
}