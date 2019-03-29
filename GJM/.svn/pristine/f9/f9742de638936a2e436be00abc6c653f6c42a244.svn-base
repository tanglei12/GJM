$(function () {
    // 加载数据
    load_data();
});

/**
 * 加载数据
 */
function load_data() {
    $.table({
        // 时间筛选
        filterDateParams: [
            {name: "创建时间", value: "ap_creatime", sort: 'DESC'}
        ],
        // 选项筛选
        filterBars: [],
        // 列表参数
        listParams: [
            {
                text: "申诉人",
                name: "ca_name",
                param: "",
                func: {type: "onclick", name: "$.table.popupOpen(this)"}
            },
            {text: "申诉人电话", name: "ca_phone", param: ""},
            {text: "被投诉理由", name: "ce_types", param: "returnCeTypes"},
            {text: "求租人", name: "cc_name", param: ""},
            {text: "求租人电话", name: "cc_phone", param: ""},
            {text: "求租标题", name: "cc_title", param: ""},
           /* {text: "户型", name: "cc_room", param: "returnCcRoom"},
            {text: "类型", name: "cc_mode", param: "returnCcMode"},
            {text: "期限", name: "cc_lease", param: "returnCcLease"},*/
            {text: "申诉结果", name: "ap_state", param: "returnStatus"},
        ],
        // 请求参数
        ajaxParams: {
            url: "/manageExamine/queryAppealExamineList",
            data: {}
        },
        popup: {
            result: function (box, _data) {
                load_recharge_popup(box, _data);
            }
        }
    });
}

/**
 * 加载右侧弹出层
 *
 * @param box
 * @param _data
 */
function load_recharge_popup(box, _data) {
    var apId = _data.ap_id;
    $(".popup-main").html("<iframe src='/manageExamine/manageAppealExamine?ap_id=" + apId + "' id='' name='' frameborder='0' width='100%' height='100%' style='background-color: #fff' scrolling='auto'></iframe>")

    // 关闭刷新特效
    $.popupRefreshClose();
}

//返回状态
function returnStatus(param) {
    var data = {};
    data.list = {1: "处理中", 2: "成功", 3: "失败"};
    data.text = returnValue(data.list[param]);
    switch (returnNumber(param)) {
        case 1:
            data.style = 'hint';
            break;

        case 2:
            data.style = 'ok';
            break;

        case 3:
            data.style = 'error';
            break;
        default :
            data.style = 'error';
            break;
    }
    return data;
}


//返回预警(投诉)类型
function returnCeTypes(param) {
    var data = {};
    data.list = {1: "虚假信息", 2: "求租人已租", 3: "电话打不通", 4: "其它"};
    data.text = returnValue(data.list[param]);
    return data;
}

//返回户型
function returnCcRoom(param) {
    var data = {};
    data.list = {0:"单配",1: "1房", 2: "2房", 3: "3房", 4: "4房及以上"};
    data.text = returnValue(data.list[param]);
    return data;
}

//租客求租类型（1:整租,2:合租,3:不限）',
function returnCcMode(param) {
    var data = {};
    data.list = {1: "整租", 2: "合租", 3: "不限"};
    data.text = returnValue(data.list[param]);
    return data;
}
//租客租期(1:长租,2:短租,3:不限)'
function returnCcLease(param) {
    var data = {};
    data.list = {1: "长租", 2: "短租", 3: "不限"};
    data.text = returnValue(data.list[param]);
    return data;
}



