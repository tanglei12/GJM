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
            {name: "创建时间", value: "er_createTime", sort: 'DESC'}
        ],
        // 选项筛选
        filterBars: [],
        // 列表参数
        listParams: [
            {
                text: "企业名称",
                name: "er_name",
                param: "",
                func: {type: "onclick", name: "reviewPopup(this)"}
            },
            {text: "企业简称", name: "er_jname", param: ""},
            {text: "企业法人", name: "er_person", param: ""},
            {text: "企业手机号码", name: "er_phone", param: ""},
            {text: "身份证号码", name: "er_cardNo", param: ""},
            {text: "企业区域", name: "er_region", param: ""},
            {text: "创建时间", name: "er_createTime", param: "time"},
            {text: "到期时间", name: "cg_endDate", param: "date"},
            {text: "企业状态", name: "er_state", param: "returnPrStatus"},
        ],
        // 请求参数
        ajaxParams: {
            url: "/manageExamine/queryCompanyExamineList",
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
 * 重写框架弹出层方法
 */
function reviewPopup(obj) {
    var _item = $(obj).parents(".list-content-item");
    var _item_data = _item.find("[name=table-checkbox]").eq(0).data("data");
  /*  if(_item_data.er_state==1){
        return;
    };*/
    $.popupBox({
        target: $.table.getTableContent(),
        data: _item_data,
        done: function (box, data) {
            $.table.defaults.popup.result(box, data);
        },
        close: function () {
            $.table.defaults.popup.close();
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
    var erId = _data.er_id;
    $(".popup-main").html("<iframe src='/manageExamine/manageCompanyExamine?er_id=" + erId + "'  frameborder='0' width='100%' height='100%' scrolling='auto'></iframe>")
    // 关闭刷新特效
    $.popupRefreshClose();
}

//返回状态
function returnPrStatus(param) {
    var data = {};
    data.list = {0: "补充资料", 1: "创建", 2: "审核中", 3: "完成", 4: "关闭"};
    data.text = returnValue(data.list[param]);
    switch (returnNumber(param)) {
        case 0:
            data.style = 'next';
            break;
        case 1:
            data.style = 'next';
            break;

        case 2:
            data.style = 'hint';
            break;

        case 3:
            data.style = 'ok';
            break;
        case 4:
            data.style = 'error';
            break;
        default :
            data.style = 'error';
            break;
    }
    return data;
}

