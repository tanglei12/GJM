var pageNo = 0;
var boolt = true;
var serviceList = null;
var myScroll;
$(function () {

    //顶部导航点击
    mui(".top-nav").on('tap', '.nav1', function () {
        //获取id
        $("#data-list").empty();
        $(".nav").removeClass("on");
        $(".nav1").addClass("on");
        data(pageNo);
    })
    mui(".top-nav").on('tap', '.nav2', function () {
        //获取id
        $("#data-list").empty();
        $(".nav").removeClass("on");
        $(".nav2").addClass("on");
        data(pageNo);
    })

    mui(".top-nav").on('tap', '.nav3', function () {
        //获取id
        $("#data-list").empty();
        $(".nav").removeClass("on");
        $(".nav3").addClass("on");
        data(pageNo);
    })

    mui(".top-nav").on('tap', '.nav4', function () {
        //获取id
        $("#data-list").empty();
        $(".nav").removeClass("on");
        $(".nav4").addClass("on");
        data(pageNo);
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
        url: "/appService/serviceList",
        data: {
            pageNo: pageNo,
            type: getQueryString("type"),
            em_id: getQueryString("em_id"),
            house_address: house_address,
            apply_time : '2017-11-01 00:00:00',
            mdg_state: navName
        },
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (pageNo == 0) {
                $("#data-list").html("");
            }
            $(result.services).each(function (index, item) {
                var state = "";
                /*if (index == 0) {
                    state = "style='margin-top:0;'";
                }*/
                /* var mdg_state = "未受理";
                 if (item.mdg_state != null) {
                     mdg_state = item.mdg_state;
                 }*/

                //服务类型
                var md_types = item.md_type;
                switch (md_types) {
                    case "1" :
                        md_types = "居家保洁";
                        break;
                    case "2" :
                        md_types = "居家维修";
                        break;
                    case "3" :
                        md_types = "翻新改造";
                        break;
                    case "5" :
                        md_types = "宽带服务";
                        break;
                    case "6" :
                        md_types = "自由搬家";
                        break;
                    case "7" :
                        md_types = "租约申请";
                        break;
                    case "8" :
                        md_types = "理财投资";
                        break;
                    case "9" :
                        md_types = "发票申请";
                        break;
                    case "10" :
                        md_types = "我要投诉";
                        break;
                    case "11" :
                        md_types = "其它服务";
                        break;
                    case "12" :
                        md_types = "家电清洗";
                        break;
                    case "13" :
                        md_types = "开锁换锁";
                        break;

                }
                var mdg_state = "";
                var mtk_state = item.mtk_state
                var mdgstate="";

                if (mtk_state == "no") {
                    mdg_state = "接单";
                    mdgstate = "<label class='title_state "+states(mdg_state)+"' style='background-color: #ff6666'>"+mdg_state+" </label>"
                    //mdgstate = "<button id='serviceBillSubmit' style='background-color: #ff6666;margin-right: 1000px;' onclick='serviceBillSubmit("+item.em_id+","+item.md_id+")'>"+mdg_state+"</button>"
                } else if (mtk_state == "get" || mtk_state=='start' || mtk_state=='stop' || mtk_state == "enter") {
                    mdg_state = "服务中";
                    mdgstate = "<label class='title_state "+states(mdg_state)+"' style='background-color: #02dcb2'>"+mdg_state+"</label>"
                } else if (mtk_state=="yes") {
                    mdg_state = "已完成";
                    mdgstate = "<label class='title_state "+states(mdg_state)+"' style='background-color: #dddddd'>"+mdg_state+"</label>"
                }

                if (mtk_state == null) {
                    mdg_state = "未派单";
                    mdgstate = "<label class='title_state "+states(mdg_state)+"' style='background-color: #dddddd'>"+mdg_state+"</label>"
                }

                var html = "";
                html += '<div class="serviceDiv" ' + state + '>';
                html += '	<div class="serviceDiv_title">';
                html += '		<label class="title_name">' + md_types + '</label>';
                html += '		<label class="title_date">' + format(item.apply_time, "yyyy-MM-dd") + '</label>';
                html += '		'+mdgstate+'';
                html += '	</div>';
                html += '	<div class="serviceDiv_content">';
                html += '		<label class="address">' + item.house_address + '</label>';
                html += '		<label class="type">' + item.st_name + '</label>';
                html += '		<label class="person">' + item.md_problem + '</label>';
                html += '	</div>';
                html += '	<button onclick="serviceContentOld(\'' + item.md_id + '\')"></button>';
                html += '</div>';
                $("#data-list").append(html);
            });
            mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
            if (result.services.length < 10) {
                mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
            } else {
                mui('#pullrefresh').pullRefresh().refresh(true);
                mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
            }
        }
    });
}

function serviceContentOld(parme) {
    window.location.href="/appService/serviceContentOld?so_id="+parme+"&em_id="+getQueryString("em_id")+"";
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




