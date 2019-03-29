$(function () {
    load_data();
});

function load_data() {
    var filterDateParams = [
        {name: "开始时间", value: "uc_start_time", sort: 'DESC'},
        {name: "过期时间", value: "uc_end_time", sort: 'DESC'},
        {name: "获取时间", value: "uc_create_time", sort: 'DESC'},
    ];
    var filterBars = [
        {name: "uccfg_id", type: "select", selected: "0", data: "returnUccfgName"}
    ];
    var listParams = [
        {text: "优惠券名称", name: "uccfg_name", param: "", func: {type: "onclick", name: "$.table.popupOpen(this)"}},
        {text: "优惠券来源", name: "uccfg_source", param: "returnUccfgSource"},
        {text: "总金额", name: "uc_total_price", param: ""},
        {text: "剩余金额", name: "uc_overplus_price", param: ""},
        {text: "开始时间", name: "uc_start_time", param: "time"},
        {text: "过期时间", name: "uc_end_time", param: "time"},
        {text: "优惠券状态", name: "uc_status", param: "returnUcStatus"},
        {text: "用户信息", name: "user_realName{/}user_phone", param: ""},
        {text: "获得时间", name: "uc_create_time", param: "time"},
    ];
    // 获取列表数据
    $.table({
        filterDateParams: filterDateParams,
        listParams: listParams,
        filterBars: filterBars,
        filterWhere: true,
        ajaxParams: {
            url: "/activity/queryCouponsList",
            beforeSend: function () {
            }
        },
        ajaxDone: function (h) {
            h.find(".list-content-item").each(function () {
                var data = $(this).find("[name=table-checkbox]").data("data");
            });
        },
        popup: {
            width: "60%",
            result: function (box, _data) {
                loadingData(box.main, _data);
            },
            close: function () {
            }
        }
    });
}

/**
 * 加载弹出层
 * @param box
 * @param _data
 */
function loadingData(box, _data) {
    uccfg_id = _data.uccfg_id;
    var html = '';
    html += '<div>';
    html += '   <dl class="lcouponsConfig-dl title-dl">';
    html += '       <div class="first-title"><span>优惠券信息</span></div>';
    html += '   </dl>';
    html += '   <dl class="lcouponsConfig-dl">';
    html += '       <dt>用户信息</dt>';
    html += '       <dd>' + returnValue(_data.user_realName) + '/' + returnValue(_data.user_phone) + '</dd>';
    html += '   </dl>';
    html += '   <dl class="lcouponsConfig-dl">';
    html += '       <dt>优惠券名称</dt>';
    html += '       <dd>' + returnValue(_data.uccfg_name) + '</dd>';
    html += '   </dl>';
    html += '   <dl class="lcouponsConfig-dl">';
    html += '       <dt>总金额</dt>';
    html += '       <dd class="dd-line">' + returnValue(_data.uc_total_price) + '元</dd>';
    html += '       <dt>剩余金额</dt>';
    html += '       <dd>' + returnValue(_data.uc_overplus_price) + '元</dd>';
    html += '   </dl>';
    html += '   <dl class="lcouponsConfig-dl">';
    html += '       <dt>优惠券开始时间</dt>';
    html += '       <dd class="dd-line">' + returnTime(_data.uc_start_time) + '</dd>';
    html += '       <dt>优惠券过期时间</dt>';
    html += '       <dd>' + returnTime(_data.uc_end_time) + '</dd>';
    html += '   </dl>';
    html += '   <dl class="lcouponsConfig-dl">';
    html += '       <dt>优惠券状态</dt>';
    html += '       <dd class="' + returnUcStatus(_data.uc_status).style + '">' + returnUcStatus(_data.uc_status).text + '</dd>';
    html += '   </dl>';
    html += '   <dl class="lcouponsConfig-dl">';
    html += '       <dt>领取时间</dt>';
    html += '       <dd>' + returnTime(_data.uc_create_time) + '</dd>';
    html += '   </dl>';
    html += '</div>';

    html += '<div>';
    html += '   <dl class="lcouponsConfig-dl title-dl">';
    html += '       <div class="first-title"><span>优惠券配置信息</span></div>';
    html += '   </dl>';
    html += '   <dl class="lcouponsConfig-dl">';
    html += '       <dt>状态</dt>';
    html += '       <dd class="' + returnUccfgStatus(_data.uccfg_status).style + '">' + returnValue(returnUccfgStatus(_data.uccfg_status).text) + '</dd>';
    html += '   </dl>';
    html += '   <dl class="lcouponsConfig-dl">';
    html += '       <dt>类型</dt>';
    html += '        <dd class="' + returnUccfgUse(_data.uccfg_type).style + '">' + returnValue(returnUccfgUse(_data.uccfg_type).text) + '</dd>';
    html += '   </dl>';
    html += '   <dl class="lcouponsConfig-dl">';
    html += '       <dt>来源</dt>';
    html += '       <dd class="' + returnUccfgSource(_data.uccfg_source).style + '">' + returnValue(returnUccfgSource(_data.uccfg_source).text) + '</dd>';
    html += '   </dl>';
    html += '   <dl class="lcouponsConfig-dl">';
    html += '       <dt>金额</dt>';
    html += '       <dd>' + returnValue(_data.uccfg_price) + '元</dd>';
    html += '   </dl>';
    html += '   <dl class="lcouponsConfig-dl">';
    html += '       <dt>有效期限</dt>';
    html += '       <dd>' + returnValue(_data.uccfg_valid_value) + '</dd>';
    html += '       <dd class="' + returnUccfgValidValue(_data.uccfg_valid_way).style + '">' + returnValue(returnUccfgValidValue(_data.uccfg_valid_way).text) + '</dd>';
    html += '   </dl>';
    html += '   <dl class="lcouponsConfig-dl">';
    html += '       <dt>特性</dt>';
    html += '       <dd class="' + returnUccfgInvalidWay(_data.uccfg_invalid_way).style + '">' + returnValue(returnUccfgInvalidWay(_data.uccfg_invalid_way).text) + '</dd>';
    html += '   </dl>';
    html += '   <dl class="lcouponsConfig-dl">';
    html += '       <dt>描述</dt>';
    html += '       <dd>' + returnValue(_data.uccfg_description) + '</dd>';
    html += '   </dl>';
    /*html += '   <dl class="lcouponsConfig-dl">';
     html += '       <dt>备注</dt>';
     html += '       <dd>'+_data.uccfg_remarks+'</dd>';
     html += '   </dl>';*/
    html += '</div>';
    box.html(html);
    $.popupRefreshClose();
}