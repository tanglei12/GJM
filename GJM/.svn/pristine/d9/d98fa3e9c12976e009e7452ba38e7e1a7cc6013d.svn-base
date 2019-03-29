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
                text: "标题",
                name: "t_title",
                param: "",
                func: {type: "onclick", name: "reviewPopup(this)"}
            },
            /* {text: "封面", name: "t_cover", param: ""},
             {text: "缩略图", name: "t_coverSmall", param: ""},*/
            {text: "是否启用", name: "t_isDelete", param: "returnCaState"},
            {text: "是否发布", name: "t_isRelease", param: "returnIsRelease"},
            {text: "创建者", name: "em_name", param: ""},
            {text: "创建时间", name: "t_createTime", param: "time"},
        ],
        // 请求参数
        ajaxParams: {
            url: "/manageExamine/queryTopicList",
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
    var t_id = _data.t_id;
    $.popupBox({
        target: $(".custom-table-body"),
        data: {},
        done: function (box, data) {
            box.main.html("<iframe src='/manageExamine/topicManage?type=check&t_id="+t_id+"'  frameborder='0' width='100%' height='100%' scrolling='auto'></iframe>");
            // 关闭刷新特效
            $.popupRefreshClose();
        }
    });
}

//是否启用
function returnCaState(param) {
    var data = {};
    data.list = {1: "启用", 0: "禁用"};
    data.text = returnValue(data.list[param]);
    switch (returnNumber(param)) {
        case 0:
            data.style = 'error';
            break;

        case 1:
            data.style = 'ok';
            break;

        default :
            data.style = 'error';
            break;
    }
    return data;
}

//是否发布
function returnIsRelease(param) {
    var data = {};
    data.list = {0: "未发布", 1: "已发布"};
    data.text = returnValue(data.list[param]);
    switch (returnNumber(param)) {
        case 0:
            data.style = 'error';
            break;

        case 1:
            data.style = 'ok';
            break;

        default :
            data.style = 'error';
            break;
    }
    return data;
}

/** 添加圈子 */
function addTopic() {
    $.popupBox({
        target: $(".custom-table-body"),
        data: {},
        done: function (box, data) {
            box.main.html("<iframe src='/manageExamine/topicManage?type=add'  frameborder='0' width='100%' height='100%' scrolling='auto'></iframe>");
            // 关闭刷新特效
            $.popupRefreshClose();
        }
    });
}

/**
 * 修改圈子
 */
function updateTopic() {
    var data = $("[name=table-checkbox]:checked").data("data");
    if (isEmpty(data)) return $.hint.tip("请选择一条数据");
    $.popupBox({
        target: $(".custom-table-body"),
        data: data,
        done: function (box, data) {
            box.main.html("<iframe src='/manageExamine/topicManage?type=update&t_id="+data.t_id+"'  frameborder='0' width='100%' height='100%' scrolling='auto'></iframe>");
            // 关闭刷新特效
            $.popupRefreshClose();
        }
    });
}

/**
 * 发布圈子
 */
function releaseTopic() {
    $.popupBox({
        target: $(".custom-table-body"),
        data: {},
        done: function (box, data) {
            box.main.html(releaseTopicHtml());

            // 关闭刷新特效
            $.popupRefreshClose();
        }
    });
}

/**
 * 发布圈子html
 * @returns {string}
 */
function releaseTopicHtml() {
    var html = "";
    html += "<div id='main-box-content'>";
    html += "<div id='topiclist'>";
    /*html += "     <div class='topicdes'>"
      html += "       <span>发布排列(可拖动排序)</span>"
      html += "     </div>"*/
    /*html += "     <div class='topiclist_modle'   ondrop='drop(event,this)' ondragover='allowDrop(event)' draggable='true' ondragstart='drag(event, this)' >"
    html += "         <p>2!</p>"
    html += "     </div>"*/
    html += "</div>";
    html += "<div id='select_box'>"
    html += "    <dl class='content-dl' style='margin-top: 10px'>";
    html += "          <dt>选择发布数据</dt>";
    html += "          <dd>";
    html += "             <input type='text' class='from-data' id='topic_pick' name='topic_pick' placeholder='' value='' onclick='editName()' style='width: 300px'>";
    html += "          </dd>";
    html += "    </dl>";
    html += "    <dl class='content-dl'>";
    html += "         <dt></dt>";
    html += "          <dd>";
    html += "             <input type='button' class='from-data' id='' name='' placeholder='' onclick='releaseTopicData()' value='发布'>";
    html += "          </dd>";
    html += "    </dl>";
    html += "</div>"
    html += "</div>";
    return html;
}

/**
 * 编辑框选择管家信息
 */
function editName(){
    $("#topic_pick").editModel({
        title : "圈子列表",
        target : {
            id : "em_idEdit",
            name : "topic_pick",
            phone : "",
        },
        select_all : true
    });
}

/**
 * 发布圈子
 */
function releaseTopicData() {
    var topiclistlength = $(".topiclist_modle").length;//已选中的圈子数量
    if (topiclistlength <2){
        $.hint.tip("至少发布两条", "error");
        return;
    }
    var t_idL="";
    $(".topiclist_modle").each(function () {
        var data_id = $(this).find("span").attr("topic_id");
        t_idL+=data_id+";"
    })
    t_idL=t_idL.substring(0,t_idL.length-1)
    $.ajax({
        type: "POST",
        url: "/manageExamine/releaseTopic",
        data: {
            r_tid: t_idL,
            r_releaseEm: $.cookie("em_id"),
        },
        dataType: "json",
        success: function (result) {
            if (result.code != 200) return $.hint.tip(result.msg, "error");
            $.hint.tip("发布成功", "success");
            $.popupBoxClose();
            $.table.loadData();
        }
    })
}

/**
 * 拖动
 * @param ev
 */
function allowDrop(ev) {

    ev.preventDefault();
}

var srcdiv = null;

function drag(ev, divdom) {
    srcdiv = divdom;
    ev.dataTransfer.setData("text/html", divdom.innerHTML);
}

function drop(ev, divdom) {
    console.log(1)
    ev.preventDefault();
    if (srcdiv != divdom) {
        srcdiv.innerHTML = divdom.innerHTML;
        divdom.innerHTML = ev.dataTransfer.getData("text/html");
    }
}