var pageNo = 0;
var boolt = true;
var serviceList = null;
$(function () {

    //顶部导航点击
    mui(".top-nav").on('tap', '.nav1', function () {
        //获取id
        $("#data-list").empty();
        $(".nav").removeClass("on");
        $(".nav1").addClass("on");
        pageNo = 0;
        data(0);
    })
    mui(".top-nav").on('tap', '.nav2', function () {
        //获取id
        $("#data-list").empty();
        $(".nav").removeClass("on");
        $(".nav2").addClass("on");
        pageNo = 0;
        data(0);
    })

    mui(".top-nav").on('tap', '.nav3', function () {
        //获取id
        $("#data-list").empty();
        $(".nav").removeClass("on");
        $(".nav3").addClass("on");
        pageNo = 0;
        data(0);
    })

    mui(".top-nav").on('tap', '.nav4', function () {
        //获取id
        $("#data-list").empty();
        $(".nav").removeClass("on");
        $(".nav4").addClass("on");
        pageNo = 0;
        data(0);
    })

});
$(function () {
    mui.init({
        pullRefresh: {
            container: '#pullrefresh',
            down: {
                height: 50,//可选,默认50.触发下拉刷新拖动距离,
                auto: true,//可选,默认false.自动下拉刷新一次
                callback: pulldownRefresh
            },
            up: {
                contentrefresh: '正在加载...',
                contentnomore: '没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback: pullupRefresh
            }
        }
    });
});

/**
 * 下拉刷新具体业务实现
 */
function pulldownRefresh() {
    // 刷新
    pageNo = 0;
    data(pageNo);
}

/**
 * 上拉加载具体业务实现
 */
function pullupRefresh() {
    // 加载
    pageNo = pageNo + 10;
    data(pageNo);
}

// 读取数据
function data(pageNo, house_address) {
    var navName = $(".on").find(".nav_name").text();
    $.ajax({
        type: "POST",
        url: "/appPage/serviceOrderInfoList",
        data: {
            pageNo: pageNo,
            type: getQueryString("type"),
            so_currentCharger: getQueryString("em_id"),
            so_applicantEmp: getQueryString("em_id"),
            so_department: getQueryString("departmentId"),
            mdg_state: navName
        },
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (pageNo == 0) {
                $("#data-list").html("");
            }
            if (result.code == 200) {
                $(result.data).each(function (index, item) {
                    var state = "";
                    //服务类型
                    var md_types = item.sm_name;//服务类型
                    var mdg_state = "";
                    var mtk_state = item.so_state
                    var mdgstate = "";
                    var cm_number = item.cm_number;
                    //判断订单状态
                    switch (mtk_state) {
                        case 1100 :
                            mdg_state = "已下单";
                            mdgstate = "<label class='title_state " + states(mdg_state) + "' style='background-color: #dddddd'>" + mdg_state + " </label>"
                            break;
                        case 2100 :
                            mdg_state = "已受理";
                            mdgstate = "<label class='title_state " + states(mdg_state) + "' style='background-color: #dddddd'>" + mdg_state + " </label>"
                            break;
                        case 2200 :
                            mdg_state = "未接单";
                            mdgstate = "<label class='title_state " + states(mdg_state) + "' style='background-color: #ff6666'>" + mdg_state + " </label>"
                            break;
                        case 3100 :
                            mdg_state = "已接单";
                            mdgstate = "<label class='title_state " + states(mdg_state) + "' style='background-color: #02dcb2'>" + mdg_state + " </label>"
                            break;

                        case 3200 :
                            mdg_state = "处理中";
                            mdgstate = "<label class='title_state " + states(mdg_state) + "' style='background-color: #02dcb2'>" + mdg_state + " </label>"
                            break;
                        case 3201 :
                            mdg_state = "处理中";//开始服务
                            mdgstate = "<label class='title_state " + states(mdg_state) + "' style='background-color: #02dcb2'>" + mdg_state + " </label>"
                            break;
                        case 3202 :
                            mdg_state = "处理中";//服务跟进
                            mdgstate = "<label class='title_state " + states(mdg_state) + "' style='background-color: #02dcb2'>" + mdg_state + " </label>"
                            break;
                        case 3203 :
                            mdg_state = "处理中";//结束服务
                            mdgstate = "<label class='title_state " + states(mdg_state) + "' style='background-color: #02dcb2'>" + mdg_state + " </label>"
                            break;

                        case 3300 :
                            mdg_state = "已处理";
                            mdgstate = "<label class='title_state " + states(mdg_state) + "' style='background-color: #dddddd'>" + mdg_state + " </label>"
                            break;

                        case 3400 :
                            mdg_state = "已结算";
                            mdgstate = "<label class='title_state " + states(mdg_state) + "' style='background-color: #dddddd'>" + mdg_state + " </label>"
                            break;

                        case 4100 :
                            mdg_state = "已回访";
                            mdgstate = "<label class='title_state " + states(mdg_state) + "' style='background-color: #dddddd'>" + mdg_state + " </label>"
                            break;
                        case 5010 :
                            mdg_state = "已取消";
                            mdgstate = "<label class='title_state " + states(mdg_state) + "' style='background-color: #dddddd'>" + mdg_state + " </label>"
                            break;

                        case 5020 :
                            mdg_state = "已关闭";
                            mdgstate = "<label class='title_state " + states(mdg_state) + "' style='background-color: #dddddd'>" + mdg_state + " </label>"
                            break;

                    }

                    //当so_problem为空
                    var soProblem = item.so_problem;
                    if (soProblem == null || soProblem == "") {
                        soProblem = "无";
                    }

                    //加载列表
                    var html = "";
                    html += '<div class="serviceDiv" ' + state + '>';
                    html += '	<div class="serviceDiv_title">';
                    html += '		<label class="title_name">' + md_types + '</label>';
                    html += '		<label class="title_date">' + format(item.so_createTime, "yyyy-MM-dd HH:mm:ss") + '</label>';
                    html += '		' + mdgstate + '';
                    html += '	</div>';
                    html += '	<div class="serviceDiv_content">';
                    html += '		<label class="address">' + item.so_targetAddress + '</label>';
                    html += '		<label class="type">' + returnValue(item.st_name_b) + '</label>';
                    if (!isEmpty(item.so_applicantUserName) || !isEmpty(item.so_applicantEmpName)) {
                        html += '		<label class="person">' + (isEmpty(item.so_applicantUserName) ? returnValue(item.so_applicantEmpName) : item.so_applicantUserName) + '</label>';
                    }
                    html += '	</div>';
                    html += '	<button onclick="OCServiceList.serviceCode(\'' + item.so_id + '\')"></button>';
                    html += '</div>';
                    $("#data-list").append(html);
                });

                /**
                 * 上拉刷新下拉加载分页插件
                 */
                mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
                if (result.data.length < 10) {
                    mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
                } else {
                    mui('#pullrefresh').pullRefresh().refresh(true);
                    mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
                }
            } else {
                mui('#pullrefresh').pullRefresh().refresh(true);
            }
        }
    });
}

//　根据条件查询
function datawhere(pageNo, house_address) {
    data(pageNo, house_address);
}

/**
 * 毫秒转换为日期格式
 * @param time 时间/时间字符串
 * @param format 时间格式 "yyyy-MM-dd" || "yyyy-MM-dd HH:mm:ss"
 * @returns
 */
function format(time, format) {
    if (time == null) {
        return "";
    }
    var t = new Date(time);
    var tf = function (i) {
        return (i < 10 ? '0' : '') + i
    };
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
        switch (a) {
            case 'yyyy':
                return tf(t.getFullYear());
                break;
            case 'MM':
                return tf(t.getMonth() + 1);
                break;
            case 'mm':
                return tf(t.getMinutes());
                break;
            case 'dd':
                return tf(t.getDate());
                break;
            case 'HH':
                return tf(t.getHours());
                break;
            case 'ss':
                return tf(t.getSeconds());
                break;
        }
    });
}

// 订单状态
function states(state) {
    var stateClass = "";
    switch (state) {
        case "未接订单":
            stateClass = "error";
            break;
        case "已接订单":
            stateClass = "success";
            break;
        case "等待回访":
            stateClass = "yellow";
            break;
        default:
            stateClass = "error";
            break;
    }
    return stateClass;
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

// 列表页面接单
function serviceBillSubmit(em_id, md_id) {
    var data = {
        em_id: em_id,
        mtk_state: "no",
        md_id: md_id

    }
    $.ajax({
        type: "POST",
        url: "/service/addTracks",
        data: data,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            if (result.code == 200) {
                OCServiceList.serviceCode(md_id);
            }
        }
    });
}



