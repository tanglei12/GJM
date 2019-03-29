var pageNo = 0;
var houseType = "库存房源";
$(function () {
    // android显示搜索
//	if (navigator.userAgent.match(/Android/i)) {
    search();
    $("#android-sreach").show();
//	} else {
//		$('.mui-pull-top-pocket').css("top", "50px");
//		$('#data-list').css("marginTop", "50px");
//	}

    $(".search_div").width($(window).width());
    mui.init({
        pullRefresh: {
            container: '#pullrefresh',
            down: {
                height: 50,//可选,默认50.触发下拉刷新拖动距离,
                auto: true,//可选,默认false.自动下拉刷新一次
                callback: pulldownRefresh,
            },
            up: {
                contentrefresh: '正在加载...',
                contentnomore: '没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback: pullupRefresh,
            }
        }
    });

});

/** 合同列表-搜索==*/
function search() {
    // 缓存时间
    var cache_time = null;
    // 定时时间
    var setOutTime = 600;
    // 定时器
    var outTime = null;
    // 缓存文本
    var cache_text = "";

    // 事件-搜索框
    $("[name=search-content]").on({
        "input propertychange": function () {
            var _this = $(this);
            var _close = $(this).next(".input-close");

            var currentTime = new Date().getTime();
            if (cache_time == null) {
                cache_time = currentTime;
            }

            if ($(this).val().length > 0) {
                var boo = true;
                if (currentTime - cache_time < setOutTime) {
                    boo = false;
                    // 还在输入时，移除定时器
                    clearTimeout(outTime);
                }
                cache_time = currentTime;
                // 执行定时器
                outTime = setTimeout(function () {
                    houseAddress(_this.val());
                }, setOutTime);
                if (boo) {
                    // 可查询时，移除定时器
                    clearTimeout(outTime);
                    // 加载数据
                    houseAddress(_this.val());
                }
                // 显示文本清空图标时，并绑定事件
                if (_close.is(":hidden")) {
                    _close.fadeIn().on("click", function () {
                        _this.val("");
                        $(this).hide().off("click");
                        // 加载数据
                        houseAddress(_this.val());
                    });
                }
            } else {
                // 搜索框为空时，移除定时器
                clearTimeout(outTime);
                _close.fadeOut().off("click");
                $("#search-data").empty();
                // 加载数据
                houseAddress(_this.val());
            }
        },
    });
};

/**
 * 下拉刷新具体业务实现
 */
function pulldownRefresh() {
    // 刷新
    if (houseType == "库存房源") {
        pageNo = 0;
        if (navigator.userAgent.match(/Android/i)) {
            data(pageNo, $("[name=search-content]").val());
        } else {
            data(pageNo);
        }
    } else if (houseType == "部门房源") {
        houseType = "部门房源";
        OCHouseList.houseUcc();
    } else {
        houseType = "个人房源";
        OCHouseList.houseUcc();
    }
}

/**
 * 上拉加载具体业务实现
 */
function pullupRefresh() {
    // 加载
    pageNo = pageNo + 10;
    if (navigator.userAgent.match(/Android/i)) {
        data(pageNo, $("[name=search-content]").val());
    } else {
        data(pageNo);
    }
}

// 读取房屋列表数据
function data(pageNo, address, ucc_em, hi_area, hi_houseS) {
    var state = $("#houseState").val();
    // 是否查询招租房源招租
    var hi_isForRent = "";
    if (getQueryString("hi_isForRent") != null && getQueryString("hi_isForRent") != "") {
        hi_isForRent = getQueryString("hi_isForRent");
    }
    var em_id = "";
    if (getQueryString("em_id") != null && getQueryString("em_id") != "") {
        em_id = getQueryString("em_id");
    }
    if (houseType == "个人房源") {
        em_id = ucc_em;
        ucc_em = "";
    }
    if (getQueryString("ucc_id") != null && getQueryString("ucc_id") != "") {
        ucc_em = getQueryString("ucc_id");
    }
    $.ajax({
        type: "POST",
        url: "/appHouse/houseAPPList",
        data: {
            pageNo: (pageNo = pageNo == null ? 1 : pageNo),
            pageSize: 10,
            address: address,
            state: state,
            hi_isForRent: hi_isForRent,
            hpr_newEmp: em_id,
            ucc_em: ucc_em,
            hi_area: $(".title_menu").eq(1).find(".search_title").attr("data-value"),
            hi_houseS: $(".title_menu").eq(2).find(".search_title").attr("data-value"),
            moneyStr: $(".title_menu").eq(3).find(".search_title").attr("data-value")
        },
        dataType: "json",
        success: function (result) {
            if (pageNo == 0) {
                $("#data-list").html("");
            }
            var html = "";
            $(result.queryAPPHouseList).each(function (index, item) {
                var hi_leaseDayStr = "";
                if (item.hi_leaseDay == null || item.hi_leaseDay == "") {
                    hi_leaseDayStr = "";
                } else {
                    hi_leaseDayStr = '<div class="house_day">招租：' + item.hi_leaseDay + '天</div>';
                }
                var money = item.hi_money;
                if (money == null) {
                    money = "无定价";
                } else {
                    money = item.hi_money + "元/月";
                }
                var onclicks = "";
                if (getQueryString("house") != null && getQueryString("house") == "true") {
                    onclicks = 'OCHouseModel.houseSelect(\'' + item.hi_code + '\')';
                } else {
                    onclicks = 'OCHouseList.houseSelect(\'' + item.hi_code + '\')';
                }
                item.hm_path = item.hm_path || "";
                html = '<div class="house">' +
                    '<button onclick="' + onclicks + '"></button>' +
                    '<div class="house_image">' +
                    '<img src="' + item.hm_path + '" />' +
                    '<div class="image_bg ' + houseState(item.hi_forRentState) + '"></div>' +
                    '<div class="image_title">' + houseStateStr(item.hi_forRentState) + '</div>' +
                    '</div>' +
                    '<div class="house_content">' +
                    '<div class="house_title">' + item.hi_address + '</div>' +
                    '<div class="house_configure"><label>' + item.houseTSW + '</label><label style="margin-left: 15px;">' + item.hi_measure + 'm²</label></div>' +
                    '<div class="house_configure"><label>' + (item.hi_area == null ? "" : item.hi_area) + '</label><label style="margin-left: 15px;">' + (item.hi_district == null ? "" : item.hi_district) + '</label></div>' +
                    '<div class="house_state"><label class="error">' + item.contract_intoStatus + '</label></div>' +
                    '</div>' +
                    '<div class="house_money">' + money + '</div>' +
                    //						hi_leaseDayStr+
                    '</div>';
                $("#data-list").append(html);
            });
            mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
            if (result.queryAPPHouseList.length < 10) {
                mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
            } else {
                mui('#pullrefresh').pullRefresh().refresh(true);
                mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
            }
        }
    });
}

function houseStates() {
    data(0, "");
}

// 地址搜索
function houseAddress(address) {
    pageNo = 0;
    data(pageNo, address);
}

function dataWhere() {
    pageNo = 0;
    data(pageNo);
}

/** 点击筛选 */
function titleClick(ids) {
    if ($(ids).find(".search_div").is(":hidden")) {
        $(".search_div").hide();
        $(ids).find(".search_div").show();
    } else {
        $(".search_div").hide();
    }
    $(ids).find("li").on("click", function () {
        $(ids).find(".search_title").html($(this).text() + "<i></i>");
        $(ids).find(".search_title").attr("data-value", $(this).attr("data-value"));
        if ($(this).attr("data-value") == "库存房源") {
            houseType = "库存房源";
            pageNo = 0;
            data(pageNo);
        } else if ($(this).attr("data-value") == "部门房源") {
            houseType = "部门房源";
            OCHouseList.houseUcc();
        } else if ($(this).attr("data-value") == "个人房源") {
            houseType = "个人房源";
            OCHouseList.houseUcc();
        } else {
            pageNo = 0;
            data(pageNo);
        }
    });

}

// 房子招租状态
function houseStateStr(state) {
    var str = "";
    switch (state) {
        case 1001:
            str = "招租";
            break;
        case 1002:
            str = "招租";
            break;
        case 1003:
            str = "招租";
            break;
        case 1004:
            str = "招租";
            break;
        case 1005:
            str = "招租";
            break;
        case 1006:
            str = "招租";
            break;
        case 1020:
            str = "停止招租";
            break;
        case 1021:
            str = "已解约";
            break;
        case 1022:
            str = "未接房";
            break;
        case 2000:
            str = "暂停招租";
            break;
        default:
            break;
    }
    return str;
}

// 招租状态样式
function houseState(state) {
    var states = "success";
    switch (state) {
        case 1003:
            states = "success";
            break;
        case 1005:
            states = "success";
            break;
        case 1020:
            states = "errors";
            break;
        case 1021:
            states = "errors";
            break;
        case 2000:
            states = "pause";
            break;
        default:
            break;
    }
    return states;
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}