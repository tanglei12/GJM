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
            {name: "创建时间", value: "ca_create", sort: 'DESC'}
        ],
        // 选项筛选
        filterBars: [],
        // 列表参数
        listParams: [
            {
                text: "房管员姓名",
                name: "ca_name",
                param: "",
                func: {type: "onclick", name: "reviewPopup(this)"}
            },
            {text: "联系电话", name: "ca_phone", param: ""},
           // {text: "在职状态", name: "ca_bool", param: "returnBool"},
            {text: "身份证号码", name: "cai_number", param: ""},
            {text: "真实姓名", name: "cai_name", param: ""},
            {text: "房管员状态", name: "ca_state", param: "returnCaState"},
            {text: "创建时间", name: "ca_create", param: "time"},
        ],
        // 请求参数
        ajaxParams: {
            url: "/manageExamine/queryAgentExamineList",
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
    var ca_id = _data.ca_id;
    $(".popup-main").html("<iframe src='/manageExamine/agentExamine?ca_id=" + ca_id + "'  frameborder='0' width='100%' height='100%' scrolling='auto'></iframe>")
    // 关闭刷新特效
    $.popupRefreshClose();
}

//返回房管员状态
function returnCaState(param) {
    var data = {};
    data.list = {0:"未通过",1: "创建", 2: "实名审核", 3: "正常"};
    data.text = returnValue(data.list[param]);
    switch (returnNumber(param)) {
        case 1:
            data.style = 'next';
            break;

        case 2:
            data.style = 'hint';
            break;

        case 3:
            data.style = 'ok';
            break;
        default :
            data.style = 'error';
            break;
    }
    return data;
}



///////////////////////////////////////
//返回状态
/*function returnPrStatus(param) {
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

/!**
 * 返回在职状态
 *!/
function returnBool() {
    var data={};
    data.list={0:"离职",1:"在职"};
    data.text = returnValue(data.list[param]);
    switch (returnNumber(param)){
        case 0 :
            data.style = 'next';
            break;
        case 1 :
            data.style = 'ok';
            break;
        default:
            data.style='error';
            break;
    }
    return data;
}*/


