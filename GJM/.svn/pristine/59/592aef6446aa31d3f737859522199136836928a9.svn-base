//修改上级组织搜索框
$(function () {
    search();
});
var CONTRACT_STATE = true;

/** 搜索列表*/
function search() {
    // 外部常量
    var $sources = $('#houseno');
    // 外部常量
    var $hicode = $('#hicode');
    var $hiaddress = $('#hiaddress');
    var $source = $('#conhouseno');
    var $dataValue = $("#conid").attr("data-value");
    // 内部常量
    var $queryList = $("#queryList");
    var $show = $("#search-show");
    var $box = $("#search-box");
    var $input = $("#search-box>input");
    var $item = $('#search-show .search-item');
    var $tips = '<div class="search-tisp">没有数据</div>';

    $input.bind("input propertychange", function () {
        $.ajax({
            type: "POST",
            url: "/selectOrganizationPage",
            data: {
                param: $input.val(),
                type: $dataValue,
                hType: $(".nav-item-focus").attr("data-type")
            },
            dataType: "json"
        }).done(function (result) {
            if (result.companyList != null) {
                var content = '';
                $.each(result.companyList, function (index, data) {
                    content +=
                        '<tr class="search-item" onclick="new search().setToInput(this)">' +
                        '<td title="房屋编码">' + data.ucc_short + '</td>' +
                        '<td title="房东姓名" style="display:none;">' + data.ucc_id + '</td>' +
                        '<td title="房屋产权地址">' + data.ucc_name + '</td>' +
                        '</tr>';
                });
                $show.html('<table style="margin-left:0px;"><body>' + content + '</body></table>');
            } else {
                $show.html('<div class="search-tisp">没有数据</div>');
            }
        });
    });
    // 上、下、回车选择
    $input.keyup(function (event) {
        var $item = $('#search-show .search-item');
        if (event.keyCode == 40) {// 上键
            eindex++;
            if (eindex >= $item.length) {
                eindex = 0;
            }
            showSearchResult(eindex);
        } else if (event.keyCode == 38) {// 下键
            eindex--;
            if (eindex < 0) {
                eindex = $item.length - 1;
            }
            showSearchResult(eindex);
        } else if (event.keyCode == 13) { // 回车
            if (eindex >= 0) {
                var $td = $item.eq(eindex).children("td");
                $source.val($td.eq(0).text());
                $sources.val($td.eq(2).text());
                $("#ucc_parentId").val($td.eq(1).text());
                $(".conhousenoformError").remove();
                $source.data("data", $td.eq(0).text());
                $source.change();
                close();
                eindex = -1
                return false;
            }
        } else {
            eindex = -1;
        }
    });
    //如果在表单中，防止回车提交
    $input.keydown(function (event) {
        if (event.keyCode == 13) {
            return false;
        }
    });

    /** 显示搜索结果 */
    var showSearchResult = function (index) {
        var $item = $('#search-show .search-item');
        $item.removeClass('item-hover').eq(index).addClass('item-hover');
    }
    /** 设置input值 */
    this.setToInput = function (param) {
        var $objChildren = $(param).children("td");
        $source.val($objChildren.eq(0).text());
        $sources.val($objChildren.eq(2).text());
        $("#ucc_parentId").val($objChildren.eq(1).text());
        $(".conhousenoformError").remove();
        $source.data("data", $objChildren.eq(0).text());
        $source.change();
        close();
        $("#wyj").remove();
    }
    /** 关闭搜索框 */
    var close = function () {
        $input.val("");
        $show.empty().html($tips);
        $queryList.hide();
    }

    $queryList.bind("click", function (e) {
        stopPropagation(e);
    });
    $source.bind("click", function (e) {
        stopPropagation(e);
    });
    $(document).bind("click", function () {
        close();
    })
    $source.on("focus", function () {
        $queryList.show();
        $input.focus();
        $input.trigger("propertychange");
        $queryList.hover(function () {
            $(document).unbind("click");
        }, function () {
            $(document).bind("click", function () {
                close();
            });
        });
    });

    var stopPropagation = function (e) {//把事件对象传入
        if (e.stopPropagation) { //支持W3C标准
            e.stopPropagation();
        } else { //IE8及以下浏览器
            e.cancelBubble = true;
        }
    }
}

//毫秒转换为日期格式
var format = function (time, format) {
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

/** jQuery Ajax封装通用类 */
$(function () {
    content_width1();
});

/**
 * tr点击选中
 *
 * @param ids
 */
function mousedownTr(ids) {
    $(".tablelist tbody tr").each(function (i) {
        $(this).find("td input[type=checkbox]").attr("checked", false);
    });

    $(ids).find("td").each(function (i) {
        if (i == 0) {
            if (!$(this).find("input").is(':checked')) {
                $(this).find("input").attr("checked", true);
            } else {
                $(this).find("input").attr("checked", false);
            }
        }
    });
}

//多选按钮判断
function ck_ed() {
    var ck = false;
    $(".tablelist tbody tr").each(function (index, element) {
        if ($(this).find("input").attr("checked") == "checked") {
            ck = true;
        } else {
            ck = false;
            return false;
        }
    });
    if (ck == true) {
        $("#ck_all").attr("checked", "checked");
    } else {
        $("#ck_all").removeAttr("checked");
    }
}

//表格的自适应
function content_width() {
    $("#tableData tbody").find("tr").attr("onclick", "mousedownTr(this)");
    if ($("#tableData tbody").find("tr").length == 0) {
        var width = 0;
        $("#tableTitle ul li").each(function (index) {
            var fontContent = 0;
            $("#font_width").html($(this).text());
            if (fontContent < ($("#font_width").width() + 40)) {
                fontContent = $("#font_width").width() + 40;

                $(this).width(fontContent);
                width += fontContent;
            }
        });

        //判断内容标题的长度
        var widths = $(window).width();
        var heights = $(window).height();
        if (width < widths) {
            $("#tableTitle").css("width", "100%");
            $(".tablelist").css("width", "100%");
        } else {
            $("#tableTitle").width(width);
            $(".tablelist").width(width);
        }
    } else {

        var width = 0;
        $("#tableTitle ul li").each(function (index) {
            if ($(this).is(':visible')) {
                var fontContent = 0;
                var titleWidth = 0;
                if (index > 1) {
                    $("#font_width").html($(this).text());
                    titleWidth = $("#font_width").width() + 50;
                }
                $("#tableContent tbody tr").each(function (idx) {
                    $(this).find("td").each(function (i) {
                        if (index == i && $(this).is(':visible') && $(this).attr("colspan") != 10) {
                            $("#font_width").html($(this).text());
                            if (fontContent < ($("#font_width").width() + 40)) {
                                if (titleWidth < ($("#font_width").width() + 50)) {
                                    fontContent = $("#font_width").width() + 50;
                                } else {
                                    fontContent = titleWidth + 50;
                                }
                            }
                        }
                    });
                });

                $("#tableContent tbody tr").each(function (idx) {
                    $(this).find("td").each(function (i) {
                        if (index == i && $(this).is(':visible')) {
                            $(this).width(fontContent);
                        }
                    });
                });

                $(this).width(fontContent);
                width += fontContent;
            }
        });
        //判断内容标题的长度

        var widths = $(window).width();
        var heights = $(window).height();
        if (width < widths) {
            $("#tableTitle").css("width", "100%");
            $(".tablelist").css("width", "100%");
            var tdWidth = "";
            $("#tableContent tbody tr").each(function (idx) {
                if (idx == 0 && $(this).attr("colspan") != 10) {
                    $(this).find("td").each(function (i) {
                        tdWidth += $(this).width() + ",";
                    });
                }
            });
            tdWidth = tdWidth.substring(0, tdWidth.length - 1);

            tdWidths = tdWidth.split(",");

            for (var i = 0; i < tdWidths.length; i++) {
                $("#tableTitle ul li").each(function (index) {
                    if (i == index) {
                        if (tdWidths[i].indexOf('.') > -1) {
                            if (tdWidths[i].substring(tdWidths[i].indexOf('.') + 1, tdWidths[i].length) > 4) {
                                $(this).width(parseInt(tdWidths[i]) + 1);
                            }
                        } else if ((tdWidths.length - 1) == index) {
                            $(this).width(parseInt(tdWidths[i]) - 1);
                        } else {
                            $(this).width(parseInt(tdWidths[i]) + 1);
                        }

                    }
                });
            }

            var maxIndex = 0;
            $("#tableTitle ul li").each(function (index) {
                if ($(this).is(':visible')) {
                    maxIndex = index;
                }
            });

            $("#tableTitle ul li").each(function (index) {
                if (maxIndex == index) {
                    $(this).width($(this).width() - 2);
                }
            });

        } else {
            $("#tableTitle").width(width);
            $(".tablelist").width(width);
        }

        //去掉right的border
        var borderRight = 0;
        $("#tableContent tbody tr").each(function (idx) {
            if (idx == 0) {
                $(this).find("td").each(function (i) {
                    if ($(this).is(':visible')) {
                        borderRight = i;
                    }
                });
            }
        });

    }

    //div隐藏显示表格获取，取得位置
    if ($("#tableTitle").find(".sort").length > 0) {
        var X = $(".sort").position().top;
        var Y = $(".sort").position().left;
    }
    $(".div_showHide").css("top", (X + 15) + "px");
    $(".div_showHide").css("left", (Y - 10) + "px");

}

//表格的自适应
function content_width1() {
    $("#tableDatas tbody").find("tr").attr("onclick", "mousedownTr(this)");

}

//隐藏字段
function hide_table() {
    //去字段层自适应
    var fontDiv = 0;

    $(".showHide_content").html("");
    $("#tableTitle ul li").each(function (index) {
        if (index > 1) {
            if ($(this).text() != "") {
                $(".showHide_content").append("<div class='showHide_font'><input type='checkbox' style='margin-right:1px;' checked='checked' onclick='hide_font(this)' value='" + $(this).text() + "' />" + $(this).text() + "</div>");
            }
        }
    });

    $(".showHide_content div").each(function (index) {
        if ($(this).text() != "") {
            $("#font_width").html($(this).text());
            if (fontDiv < ($("#font_width").width() + 50)) {
                fontDiv = $("#font_width").width() + 120;
            }
        }
    });
    $(".showHide_content").width(fontDiv);
}

//隐藏字段font
function hide_font(id) {
    var name = $(id).val();
    var index = 0;
    if ($(id).attr("checked") != "checked") {
        $("#tableTitle ul li").each(function (idx) {
            if ($(this).text() == name) {
                $(this).hide();
                index = idx;
            }
        });
        $("#tableContent tbody tr").each(function (idx) {
            $(this).find("td").each(function (i) {
                if (i == index) {
                    $(this).hide();
                }
            });
        });
    } else {
        $("#tableTitle ul li").each(function (idx) {
            if ($(this).text() == name) {
                $(this).show();
                index = idx;
            }
        });
        $("#tableContent tbody tr").each(function (idx) {
            $(this).find("td").each(function (i) {
                if (i == index) {
                    $(this).css("border-right", "dotted 1px #c7c7c7");
                    $(this).show();
                }
            });
        });
    }

}

function showHide_contentShow() {
    if ($(".div_showHide").is(':visible')) {
        $(".div_showHide").hide();
    } else {
        $(".div_showHide").show();
    }
}

var selectExtended = null;

//查询组织
function subordinateOrganization() {
    closeDiv();
    selectExtended = $.Deferred();
    var sizeCount = 10;
    if ($.cookie('userSize') != null) {
        sizeCount = $.cookie('userSize');
    } else {
        $.cookie("userSize", sizeCount, {expires: 7});
    }
    if ($("#sizeCount input").val() != null) {
        sizeCount = $("#sizeCount input").val();
        $.cookie("userSize", sizeCount, {expires: 7});
    }
    $.ajax({
        type: "POST",
        url: "/subordinateOrganization",
        data: "ucc_id=" + $("#ucc_id").val() + "&cookie=15&page=" + $("#Num").text(),
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $("#tableContent #tableData tbody").html("");
            $(".content").css("display", "none");
            $("#content1").css("display", "block");
            $("#sizeNum").text("");
            $("#nums").text("");
            $(".paginList").html("");
            $("#triangle-up").css("marginLeft", "100px");
            $("#tableData").children("thead").children("tr").children("td").each(function (idx) {
                if (idx > 1) {
                    $(this).remove();
                }
            });
            $(".operation").html("");
            $(".operation").append("<ul><li style='display:none;'><a href='javascript:addOrganization(1);'>新建同级组织</a></li><li><a href='javascript:installJurisdiction(1);'>设置权限</a></li><li><a href='javascript:addOrganization(2);'>新建下级组织</a></li><li><a href='javascript:deleteOrganization();'>删除</a></li></ul>");
            $("#tableData").children("thead").children("tr").append("<td>组织类型</td><td>组织简称</td><td>组织全称</td><td>组织负责人</td><td>负责人电话</td><td>组织成立时间</td>");
            $.each(result.pageModel.list, function (idx, company) {
                var tt = format(company.ucc_establishDate, 'yyyy-MM-dd');
                $("#tableData tbody").append("<tr class='tr'  id='data_contents'><td><input name='chickes' type='checkbox' id='" + company.ucc_id + "'/></td><td>" + (idx + 1) + "</td><td class='css2'><a href='javascript:;' onclick='hrefClick(this)' data-type='/houseExtended/updata?id=" + company.ucc_id + "'>" + company.ucc_type + "</a></td><td>" + company.ucc_short + "</td><td class='css2'>" + company.ucc_name + "</a></td><td>" + company.ucc_corporation + "</td><td>" + company.ucc_phone + "</td><td class='css2'>" + tt + "</td></tr>");
            });
            $("#sizeNum").text(result.pageModel.totalPage);
            $("#nums").text(result.pageModel.totalRecords);
            selectExtended.resolve();
        }
    });

    $.when(selectExtended).done(function () {
        page();

        hide_table();
    });
}

/*=======================================页面分页==============================================*/

//判断页数
function page() {
    //开始的页数样式
    if ($("#sizeNum").text() <= 5) {
        $(".paginList").html("<li class='paginItem'><a href='javascript:up();'><span class='pagepre' id='up'></span></a></li>");
        for (var i = 1; i <= $("#sizeNum").text(); i++) {
            $(".paginList").append("<li id='paginList_" + i + "' class='paginItem'><a href='javascript:li(" + i + ");'>" + i + "</a></li>");
        }
        $(".paginList").append("<li class='paginItem'><a href='javascript:down();'><span class='pagenxt' id='down'></span></a></li>");
    } else {
        if ($("#Num").text() <= 5) {
            $(".paginList").html("<li class='paginItem'><a href='javascript:up();'><span class='pagepre' id='up'></span></a></li>");
            for (var i = 1; i <= 5; i++) {
                $(".paginList").append("<li id='paginList_" + i + "' class='paginItem'><a href='javascript:li(" + i + ");'>" + i + "</a></li>");
            }
            $(".paginList").append("<li class='paginItem'><a href='javascript:down();'><span class='pagenxt' id='down'></span></a></li>");
        }
    }
    //end

    //样式变化
    $(".paginList li").each(function (idx) {
        $(this).attr("class", "paginItem");
    });
    $("#paginList_" + $("#Num").text() + "").attr("class", "paginItem current");
    //end

    //判断最后一页和第一页的样式
    if ($("#Num").text() == $("#sizeNum").text() && $("#sizeNum").text() != "1") {
        $(".paginItem span[id=down]").css("background", "url(/resources/image/next_1.gif) no-repeat center center");
        $(".paginItem span[id=up]").css("background", "url(/resources/image/pre.gif) no-repeat center center");
    } else if ($("#Num").text() == "1" && $("#sizeNum").text() != "1") {
        $(".paginItem span[id=down]").css("background", "url(/resources/image/next.gif) no-repeat center center");
        $(".paginItem span[id=up]").css("background", "url(/resources/image/pre_1.gif) no-repeat center center");
    } else if ($("#Num").text() == "1" && $("#sizeNum").text() == "1") {
        $(".paginItem span[id=down]").css("background", "url(/resources/image/next_1.gif) no-repeat center center");
        $(".paginItem span[id=up]").css("background", "url(/resources/image/pre_1.gif) no-repeat center center");
    } else if ($("#Num").text() != "1" && $("#Num").text() != $("#sizeNum").text()) {
        $(".paginItem span[id=down]").css("background", "url(/resources/image/next.gif) no-repeat center center");
        $(".paginItem span[id=up]").css("background", "url(/resources/image/pre.gif) no-repeat center center");
    }
    //end

    //间隔变色
    $('.tablelist tbody tr:odd').addClass('odd');
}

/*点击LI分页读取数据*/
function li(id) {

    $("#Num").text(id);
    $("#paginList_" + id + " a").attr("class", "paginItem");
    data();
}

function up() {
    // 获取当前页数
    var pageMum = parseInt($("#Num").text());
    //最大页数
    var pageSize = parseInt($("#sizeNum").text());
    if (pageMum > 1) {
        if ((pageMum - 1) % 5 == 0) {
            $(".paginList").html("<li class='paginItem'><a href='javascript:up();'><span class='pagepre' id='up'></span></a></li>");
            for (var i = 5; i > 0; i--) {
                $(".paginList").append("<li id='paginList_" + (pageMum - i) + "' class='paginItem'><a href='javascript:li(" + (pageMum - i) + ");'>" + (pageMum - i) + "</a></li>");
            }
            $(".paginList").append("<li class='paginItem'><a href='javascript:down();'><span class='pagenxt' id='down'></span></a></li>");
        }
        $("#Num").text(pageMum - 1);
        data();
    }
}

function down() {
    // 获取当前页数
    var pageMum = parseInt($("#Num").text());
    //最大页数
    var pageSize = parseInt($("#sizeNum").text());
    if (pageMum < pageSize) {
        if ((pageMum + 5) < pageSize) {
            if (pageMum % 5 == 0) {

                $(".paginList").html("<li class='paginItem'><a href='javascript:up();'><span class='pagepre' id='up'></span></a></li>");
                for (var i = 1; i <= 5; i++) {
                    $(".paginList").append("<li id='paginList_" + (pageMum + i) + "' class='paginItem'><a href='javascript:li(" + (pageMum + i) + ");'>" + (pageMum + i) + "</a></li>");
                }
                $(".paginList").append("<li class='paginItem'><a href='javascript:down();'><span class='pagenxt' id='down'></span></a></li>");
            }
            $("#Num").text(pageMum + 1);
            data();
        } else {
            if (pageMum % 5 == 0) {
                $(".paginList").html("<li class='paginItem'><a href='javascript:up();'><span class='pagepre' id='up'></span></a></li>");
                for (var i = 4; i >= 0; i--) {
                    $(".paginList").append("<li id='paginList_" + (pageSize - i) + "' class='paginItem'><a href='javascript:li(" + (pageSize - i) + ");'>" + (pageSize - i) + "</a></li>");
                }
                $(".paginList").append("<li class='paginItem'><a href='javascript:down();'><span class='pagenxt' id='down'></span></a></li>");
            }
            $("#Num").text(pageMum + 1);
            data();
        }
    }
}

function basicInfo() {
    $(".content").css("display", "block");
    closeDiv();
    $("#content1").css("display", "none");
    $("#triangle-up").css("marginLeft", "30px");
    $(".operation").html("");
    $(".operation").append("<ul><li><a href='javascript:addOrganization(1);'>新建同级组织</a></li><li><a href='javascript:updateInfo();'>编辑</a></li><li><a href='javascript:selectJurCom();'>设置权限</a></li></ul>");
    $(".upd").css("display", "none");
    $(".bg_1").css("display", "block");
    $("#sub").css("display", "none");
}

//查询职位
function subordinateStation() {
    selectExtended = $.Deferred();
    var sizeCount = 10;
    if ($.cookie('userSize') != null) {
        sizeCount = $.cookie('userSize');
    } else {
        $.cookie("userSize", sizeCount, {expires: 7});
    }
    if ($("#sizeCount input").val() != null) {
        sizeCount = $("#sizeCount input").val();
        $.cookie("userSize", sizeCount, {expires: 7});
    }
    $.ajax({
        type: "POST",
        url: "/subordinateStation",
        data: "ucc_id=" + $("#ucc_id").val() + "&cookie=" + $.cookie('userSize') + "&page=" + $("#Num").text(),
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $("#tableContent #tableData tbody").html("");
            $("#sizeNum").text("");
            $("#nums").text("");
            $(".paginList").html("");
            $(".content").css("display", "none");
            $("#content1").css("display", "block");
            $("#triangle-up").css("marginLeft", "170px");
            $("#tableData").children("thead").children("tr").children("td").each(function (idx) {
                if (idx > 1) {
                    $(this).remove();
                }
            })
            $("#tableData").children("thead").children("tr").append("<td>岗位名称</td><td>备注</td><td>创建时间</td>");
            $(".operation").html("");
            $(".operation").append("<ul><li><a href='javascript:addStation();'>新建岗位</a></li><li><a href='javascript:addUser();'>人员导入</a></li><li><a href='javascript:updateStationInfo();'>编辑</a></li><li><a href='javascript:installJurisdiction(2);'>设置权限</a></li><li><a href='javascript:deleteStation();'>删除</a></li></ul>");
            $.each(result.pageModel.list, function (idx, position) {
                var tt = format(position.ucr_date, 'yyyy-MM-dd');
                if (position.ucr_text == null) {
                    position.ucr_text = "";
                }
                $("#tableData tbody").append("<tr class='tr'  id='data_contents'><td><input name='chickes' type='checkbox' id='" + position.ucr_id + "'/></td><td>" + (idx + 1) + "</td><td class='css2'><a href='javascript:;' onclick='hrefClick(this)' data-type='/houseExtended/updata?id=" + position.ucr_id + "'>" + position.ucr_name + "</a></td><td>" + position.ucr_text + "</td><td class='css2'>" + tt + "</td></tr>");
            });
            $("#sizeNum").text(result.pageModel.totalPage);
            $("#nums").text(result.pageModel.totalRecords);
            selectExtended.resolve();
        }
    });

    $.when(selectExtended).done(function () {
        page();

        hide_table();
    });
}

//查询下属人员
function subordinateEmployee() {
    closeDiv();
    selectExtended = $.Deferred();
    var sizeCount = 10;
    if ($.cookie('userSize') != null) {
        sizeCount = $.cookie('userSize');
    } else {
        $.cookie("userSize", sizeCount, {expires: 7});
    }
    if ($("#sizeCount input").val() != null) {
        sizeCount = $("#sizeCount input").val();
        $.cookie("userSize", sizeCount, {expires: 7});
    }
    $.ajax({
        type: "POST",
        url: "/subordinateEmployee",
        data: "ucc_id=" + $("#ucc_id").val() + "&cookie=" + $.cookie('userSize') + "&page=" + $("#Num").text(),
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $("#tableContent #tableData tbody").html("");
            $("#sizeNum").text("");
            $("#nums").text("");
            $(".paginList").html("");
            $(".content").css("display", "none");
            $("#content1").css("display", "block");
            $("#triangle-up").css("marginLeft", "240px");
            $("#tableData").children("thead").children("tr").children("td").each(function (idx) {
                if (idx > 1) {
                    $(this).remove();
                }
            })
            $("#tableData").children("thead").children("tr").append("<td>账号</td><td>员工</td><td>部门</td><td>岗位</td><td>状态</td><td>性别</td><td>住址</td>");
            $(".operation").html("");
            $(".operation").append("<ul><li><a href='javascript:insertEmployee();'>新建人员</a></li><li><a href='javascript:installJurisdiction(3);'>设置权限</a></li><li><a href='javascript:selectEmployeeById();'>修改</a></li><li><a href='javascript:resetPassword();'>重置密码</a></li></ul>");
            $.each(result.pageModel.list, function (idx, item) {
                var sex = "男"
                if (item.em_sex != "man") {
                    sex = "女";
                }
                var state = "<font style='color:#1ABC9C'>正常</font>"
                if (item.em_state == 0) {
                    state = "<font style='color:#E74C3C'>离职</font>";
                } else if (item.em_state == 2) {
                    state = "<font style='color:#E74C3C'>申请离职</font>";
                }
                $("#tableData tbody").append("<tr class='tr' id='data_contents'><td><input name='chickes' type='checkbox' id='" + item.em_id + "'/><input name='ucr_ids' type='hidden' value='" + item.ucr_id + "'/></td><td>" + (idx + 1) + "</td><td><a href='javascript:;' onclick='hrefClick(this)' data-type='/user/userUpdate?id=" + item.em_id + "'>" + item.em_account + "</a></td><td>" + item.em_name + "(" + item.em_phone + ")</td><td>" + item.ucc_short + "</td><td>" + item.ucr_name + "</td><td>" + state + "</td><td>" + sex + "</td><td>" + item.em_address + "</td></tr>");
            });
            $("#sizeNum").text(result.pageModel.totalPage);
            $("#nums").text(result.pageModel.totalRecords);
            selectExtended.resolve();
        }
    });

    $.when(selectExtended).done(function () {
        page();

        hide_table();
    });
}

function updateInfo() {
    $(".upd").css("display", "block");
    $(".bg_1").css("display", "none");
    $("#sub").css("display", "block");
}

function selectInfo(id, tj) {
    $(".upd").css("display", "none");
    $(".bg_1").css("display", "block");
    $("#sub").css("display", "none");
    $.ajax({
        type: "POST",
        url: "/selectOrganizationInfo",
        data: "id=" + id + "&tj=" + tj,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $(".content").children("div").children("table").children("tbody").children("tr").children(".bg_1").each(function () {
                $(this).html("");
            });
            $(".content").children("div").children("table").children("tbody").children("tr").children(".bg_1").each(function (idx) {
                if (idx == 0) {
                    $(this).html(result.result.ucc_short);
                }
                if (idx == 1) {
                    $(this).html(result.result.ucc_name);
                }
                if (idx == 2) {
                    $(this).html(result.result.pi_name);
                }
                if (idx == 3) {
                    $(this).html(result.result.ucc_corporation);
                }
                if (idx == 4) {
                    $(this).html(result.result.ucc_phone);
                }
                if (idx == 5) {
                    var tt = format(result.result.ucc_establishDate, 'yyyy-MM-dd');
                    $(this).html(tt);
                }
                if (idx == 6) {
                    $(this).html(result.result.ucc_text);
                }
            });
            $(".content").children("div").children("table").children("tbody").children("tr").children(".upd").each(function (idx) {
                if (idx == 0) {
                    $(this).children("input").val(result.result.ucc_short);
                }
                if (idx == 1) {
                    $(this).children("input").val(result.result.ucc_name);
                }
                if (idx == 2) {
                    $(this).children("input").val(result.result.pi_name);
                    $("#conhouseno").val(result.result.pi_name);
                }
                if (idx == 3) {
                    $(this).children("input").val(result.result.ucc_corporation);
                }
                if (idx == 4) {
                    $(this).children("input").val(result.result.ucc_phone);
                }
                if (idx == 5) {
                    var tt = format(result.result.ucc_establishDate, 'yyyy-MM-dd');
                    $(this).children("input").val(tt);
                }
                if (idx == 6) {
                    $(this).children("input").val(result.result.ucc_text);
                }
                $("#ucc_parentId").val(result.result.ucc_pid);
            });
            $("#name").html("");
            $("#name").html(result.result.ucc_name);
        }
    });
}

function submitUpdateInfo() {
    $(".upd").css("display", "none");
    $(".bg_1").css("display", "block");
    $("#sub").css("display", "none");
    $.ajax({
        type: "POST",
        url: "/updateOrganizationInfo",
        data: {
            ucc_short: $("input[name='ucc_short']").val(),
            ucc_name: $("input[name='ucc_name']").val(),
            ucc_phone: $("#sign-phone").val(),
            ucc_text: $("input[name='ucc_text']").val(),
            ucc_corporation: $("#sign-name").val(),
            ucc_type: $("input[name='ucc_type']").val(),
            ucc_establishDates: $("input[name='ucc_establishDates']").val(),
            ucc_id: $("input[name='ucc_id']").val(),
            ucc_parentId: $("input[name='ucc_parentId']").val()
        },
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.result != 1) {
                swal("修改失败!")
            }
        }
    });
    selectInfo($("#ucc_id").val(), "l");
}

function deleteOrganization() {
    var cbl_s = document.getElementsByName("chickes");
    var checkCount = 0;
    var id = 0;
    for (var i = 0; i < cbl_s.length; i++) {
        if (cbl_s[i].checked) {
            checkCount++;
            id = cbl_s[i].id;
        }
    }
    if (checkCount == 0) {
        swal("请选择一个!")
    } else if (checkCount > 1) {
        alert('只能选择一个！');
    } else {
        $.ajax({
            type: "POST",
            url: "/deleteOrganizationSelectEmployee",
            data: "ucc_id=" + id,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.result == 0) {
                    swal({
                        title: "请先移除该组织人员!",
                        timer: 2000
                    })
                } else {
                    swal({
                            title: "确认删除?",
                            text: "",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "确认",
                            cancelButtonText: "取消",
                            closeOnConfirm: false
                        },
                        function () {
                            $.ajax({
                                type: "POST",
                                url: "/deleteOrganization",
                                data: "ucc_id=" + id,
                                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                                dataType: "json",
                                success: function (result) {
                                    if (result.result == 1) {
                                        swal("删除成功", "", "success");
                                    } else {
                                        swal("删除失败", "", "error");
                                    }
                                    subordinateOrganization();
                                }
                            });
                        });
                }
            }
        });
    }

}

function deleteStation() {
    var cbl_s = document.getElementsByName("chickes");
    var checkCount = 0;
    var id = 0;
    for (var i = 0; i < cbl_s.length; i++) {
        if (cbl_s[i].checked) {
            checkCount++;
            id = cbl_s[i].id;
        }
    }
    if (checkCount == 0) {
        swal("请选择一个!")
    } else if (checkCount > 1) {
        alert('只能选择一个！');
    } else {
        $.ajax({
            type: "POST",
            url: "/deleteStationSelectEmployee",
            data: "ucr_id=" + id + "&ucc_id=" + $("#ucc_id").val(),
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.result == 0) {
                    swal({
                        title: "请先移除该岗位人员!",
                        timer: 2000
                    })
                } else {
                    swal({
                            title: "确认删除?",
                            text: "",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "确认",
                            cancelButtonText: "取消",
                            closeOnConfirm: false
                        },
                        function () {
                            $.ajax({
                                type: "POST",
                                url: "/deleteStation",
                                data: "ucr_id=" + id + "&ucc_id=" + $("#ucc_id").val(),
                                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                                dataType: "json",
                                success: function (result) {
                                    if (result.result == 1) {
                                        swal("删除成功", "", "success");
                                    } else {
                                        swal("删除失败", "", "error");
                                    }
                                    subordinateStation();
                                }
                            });
                        });
                }
            }
        });
    }
}

function updateStationInfo() {
    var cbl_s = document.getElementsByName("chickes");
    var checkCount = 0;
    var id = 0;
    for (var i = 0; i < cbl_s.length; i++) {
        if (cbl_s[i].checked) {
            checkCount++;
            id = cbl_s[i].id;
        }
    }
    if (checkCount == 0) {
        swal("请选择一个!")
    } else if (checkCount > 1) {
        alert('只能选择一个！');
    } else {
        $.ajax({
            type: "POST",
            url: "/selectPositionById",
            data: "ucr_id=" + id,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            success: function (result) {
                $("#manipulateJurisdiction").html("");
                tcc();
                $("#setTitle").text("修改岗位");
                $("#manipulateJurisdiction").append("<div style='margin-top: 20px;margin-left: 20px;'>职位名称:<input style='margin-left:10px;' value='" + result.position.ucr_name + "' type='text' name='ucr_name' ><br><br>岗位备注:<input style='margin-left:10px;width:300px;' value='" + result.position.ucr_text + "' type='text' name='ucr_text' ><div style='border-bottom:1px solid #3E97C9;width:520px;height:2px;margin-left: -20px;margin-top: 20px;'></div><button class='btn' style=' float: none;margin-top: 10px;margin-left:0px;' onclick='updatePosition(" + id + ")'>修改</button></div>");
            }
        });

    }
}

//修改岗位信息
function updatePosition(ucr_id) {
    $.ajax({
        type: "POST",
        url: "/updatePosition",
        data: "ucr_id=" + ucr_id + "&ucr_name=" + $("input[name='ucr_name']").val() + "&ucr_text=" + $("input[name='ucr_text']").val(),
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            swal("修改成功", "", "success");
            closeTc();
            subordinateStation();
        }
    });
}

function clickBase() {
    $(".label").children("ul").children("li").each(function (idx) {
        if (idx == 0) {
            $(this).css("background-color", "#3498db");
            $(this).children("a").children("span").css("color", "#fff");
        } else {
            $(this).css("background-color", "#fff");
            $(this).children("a").children("span").css("color", "#000");
        }
    });
    $("#triangle-down").css("marginLeft", "42px");
    $("#jurisdiction").css("display", "none");
    $("#organization").css("display", "none");
    $("#employee").css("display", "none");
    $(".base").css("display", "block");
}

function clickJurisdiction() {

    $("#triangle-down").css("marginLeft", "41px");
    $("#organization").css("display", "none");
    $(".base").css("display", "none");
    $("#employee").css("display", "none");
    $("#jurisdiction").css("display", "block");
    switchJurisdiction(2);
}

function clickOrganization() {

    $("#triangle-down").css("marginLeft", "41px");
    $("#jurisdiction").css("display", "none");
    $(".base").css("display", "none");
    $("#employee").css("display", "none");
    $("#organization").css("display", "block");
    selectRole();
}

//查询所有权限架构
function selectAllJurisdiction() {
    $.ajax({
        type: "POST",
        url: "/selectAllJurisdiction",
        data: "type=" + "organization" + "&ucc_id=" + $("#ucc_id").val(),
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $(".jurisdiction").html("");
            $.each(result.menuList, function (idx, item) {
                if (item.pi_id == 0) {
                    $(".jurisdiction").append("<div class='menuJ1' id='menu" + item.ucm_id + "'><div class='checkboxFive'><input type='checkbox' value='" + item.ucm_id + "' id='sd" + item.ucm_id + "' name='ucm_id' /><label onclick='checkAllJurisdiction(this,1);' for='sd" + item.ucm_id + "'></label></div><span style='cursor: pointer' onclick='shrinkSublayer(this);'>" + item.ucm_name + "</span></div>");
                } else {
                    $("#menu" + item.pi_id).append("<div class='menuJ2 " + item.ucm_code + "' id='menu" + item.ucm_id + "'><div class='checkboxFive'><input type='checkbox' value='" + item.ucm_id + "' id='sd" + item.ucm_id + "' name='ucm_id' /><label onclick='checkAllJurisdiction(this,2);' for='sd" + item.ucm_id + "'></label></div>" + item.ucm_name + "</div>");
                    $("." + item.ucm_code).append("<div class='gnbh'></div>");
                }
            });
            $.each(result.functionList, function (idx, item) {
                $("." + item.ucm_code).children(".gnbh").css("height", "40px");
                $("." + item.ucm_code).children(".gnbh").append("<div class='menuJ3' id='function" + item.ucf_id + "'><div class='checkboxFive'><input type='checkbox' value='" + item.ucf_id + "' id='gn" + item.ucf_id + "' name='ucf_id' /><label onclick='checkSuperiorJurisdiction(this);' for='gn" + item.ucf_id + "'></label></div>" + item.ucf_name + "</div>");
            });
            $.each(result.menuLists, function (idx, item) {
                $("#menu" + item.ucm_id).children(".checkboxFive").children("input").attr('checked', true);
            });
            $.each(result.functionLists, function (idx, item) {
                $("#function" + item.ucf_id).children(".checkboxFive").children("input").attr('checked', true);
            });
        }
    });
}

//权限全选
function checkAllJurisdiction(obj, num) {
    var check = false;
    $(obj).parent("div").parent("div").find("input").each(function (idx) {
        if (idx == 0) {
            if ($(this).attr('checked') == 'checked') {
                check = false;
            } else {
                check = true;
            }
        }
        if (idx != 0) {
            if ($(this).attr('checked') == 'checked') {
                $(this).attr('checked', check);
            } else {
                $(this).attr('checked', check);
            }
        }
    });

    $(obj).parent("div").parent("div").find("input").each(function (idx) {
        if (idx != 0) {
            if ($(this).attr('checked') == 'checked') {
                $(obj).parent("div").parent("div").find("input").each(function (idxs) {
                    if (idxs == 0) {
                        if ($(this).attr('checked') == 'checked') {
                            $(this).attr('checked', false);
                        } else {
                            $(this).attr('checked', false);

                        }
                    }
                });
            }
        }
    });

    if (num == 2) {
        $(obj).parent("div").parent("div").parent("div").find("input").each(function (idx) {
            if (idx != 0) {
                if (idx != 0) {
                    if ($(this).attr('checked') == 'checked') {
                    } else {
                        $(obj).parent("div").parent("div").parent("div").find("input").each(function (idxs) {
                            if (idxs == 0) {
                                $(this).attr('checked', true);
                            }
                        });
                    }
                }
            }
        });
    }
}

//权限选中下级默认选中上级
function checkSuperiorJurisdiction(obj) {
    $(obj).parent("div").parent("div").parent("div").prev("div").children("input").attr('checked', true);
}

//修改权限
function updateJurisdiction() {
    $.ajax({
        type: "POST",
        url: "/updateJurisdiction",
        data: $('#updateJurisdiction').serialize(),
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            swal("修改成功", "", "success");
            basicInfo();
            closeTc1();
        }
    });
}

//切换权限设置添加页面
function switchJurisdiction(idx) {
    $(".operations").html("");
    if (idx == 1) {
        $(".content3").css("display", "block");
        $("#triangle-ups").css("marginLeft", "30px");
        $(".content4").css("display", "none");
        clickJurisdiction();
    } else {
        $(".operations").append("<ul><li><a href='javascript:updateUserCenterMenu(1);'>上 移</a></li><li><a href='javascript:updateUserCenterMenu(2);'>下 移</a></li><li><a href='javascript:manipulateJurisdiction(1);'>添加同级权限</a></li><li><a href='javascript:manipulateJurisdiction(2);'>添加下级权限</a></li><li><a href='javascript:manipulateJurisdiction(3);'>编辑权限</a></li><li><a href='javascript:disableJurisdiction();'>禁用/启用</a></li><li><a href='javascript:manipulateJurisdiction(4);'>删除权限</a></li></ul>");
        $(".content4").css("display", "block");
        $(".content3").css("display", "none");
        $("#triangle-ups").css("marginLeft", "100px");
        $.ajax({
            type: "POST",
            url: "/selectAllJurisdiction",
            data: "type=" + "organization" + "&ucc_id=" + $("#ucc_id").val(),
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            success: function (result) {
                $(".addJurisdiction").html("");
                $.each(result.menuList, function (idx, item) {

                    if (item.pi_id == 0) {
                        $(".addJurisdiction").append("<div class='menuJ1' id='menuAdd" + item.ucm_id + "'><div class='checkboxFive'><input type='hidden' value='" + item.pi_id + "' id='pid" + item.ucm_id + "' name='pid' /><input type='hidden' value='" + item.order_num + "' id='order" + item.ucm_id + "' name='order' /><input type='checkbox' value='" + item.ucm_id + "' id='sds" + item.ucm_id + "' name='ucm_id' /><label onclick='checkBoxRadio(this,1);' for='sds" + item.ucm_id + "'></label></div><span style='cursor: pointer' onclick='shrinkSublayer(this);'>" + item.ucm_name + "</span></div>");
                    } else {

                        $("#menuAdd" + item.pi_id).append("<div class='menuJ2 s" + item.ucm_code + "' id='menuAdd" + item.ucm_id + "'><div class='checkboxFive'><input type='hidden' value='" + item.pi_id + "' id='pid" + item.ucm_id + "' name='pid' /><input type='hidden' value='" + item.order_num + "' id='order" + item.ucm_id + "' name='order' /><input type='checkbox' value='" + item.ucm_id + "' id='sds" + item.ucm_id + "' name='ucm_id' /><label onclick='checkBoxRadio(this,2);' for='sds" + item.ucm_id + "'></label></div>" + item.ucm_name + "</div>");
                        $(".s" + item.ucm_code).append("<div class='gnbh'></div>");
                    }
                });
                $.each(result.functionList, function (idx, item) {
                    $(".s" + item.ucm_code).children(".gnbh").css("height", "40px");
                    $(".s" + item.ucm_code).children(".gnbh").append("<div class='menuJ3' id='function" + item.ucf_id + "'><div class='checkboxFive'><input type='hidden' value='" + item.ucm_code + "' id='code" + item.ucm_code + "' name='code' /><input type='hidden' value='" + item.ucf_id + "' id='func" + item.ucf_id + "' name='func' /><input type='checkbox' value='" + item.ucf_id + "' id='gns" + item.ucf_id + "' name='ucf_id' /><label onclick='checkBoxRadio(this);' for='gns" + item.ucf_id + "'></label></div>" + item.ucf_name + "</div>");
                });
            }
        });
    }
}

//收缩权限下层
function shrinkSublayer(obj) {
    $(obj).nextAll("div").each(function (idx) {
        if ($(this).css("display") == 'block') {
            $(this).css("display", "none");
        } else {
            $(this).css("display", "block");
        }
    });
}

var ucm_id = null;
var pid = null;
var order = null;
var ucf_id = null;

//添加权限复选框变单选
function checkBoxRadio(obj, num) {
    var len = $(".addJurisdiction").find("input").each(function (idx) {
        $(this).attr('checked', false);
    });
    $(obj).attr('checked', true);
    if (num != null && (num == 1 || num == 2)) {
        ucm_id = $(obj).parent().find("input[name=ucm_id]").val();
        pid = $(obj).parent().find("input[name=pid]").val();
        order = $(obj).parent().find("input[name=order]").val();
        ucf_id = null;
    } else {
        ucf_id = $(obj).parent().find("input[name=func]").val();
        ucm_id = null;
        pid = null;
        order = null;
    }
    //alert(" ucm_id= " + ucm_id + " pid= " + pid +" order= " + order +" ucf_id= " + ucf_id);
}

//禁用权限
function disableJurisdiction() {
    var re = 0;
    var id = 0;
    $(".addJurisdiction").find("input").each(function (idx) {
        if ($(this).attr('checked') == 'checked') {
            id = $(this).val();
        }
    });
    var len = $(".addJurisdiction").find("input").each(function (idx) {
        if ($(this).attr('checked') == 'checked') {
            re = 1;
        }
    });
    if (re != 1) {
        swal("请选择一个!");
        return false;
    }
    var clas = ""
    $(".addJurisdiction").find("input").each(function (idx) {
        if ($(this).attr('checked') == 'checked') {
            clas = $(this).parent("div").parent("div").attr("class");
        }
    });
    $.ajax({
        type: "POST",
        url: "/disableJurisdiction",
        data: "ucm_id=" + id + "&clas=" + clas,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            switchJurisdiction(2);
        }
    });
}

//权限操作
function manipulateJurisdiction(num) {
    var re = 0
    var len = $(".addJurisdiction").find("input").each(function (idx) {
        if ($(this).attr('checked') == 'checked') {
            re = 1;
        }
    });
    if (re != 1) {
        swal("请选择一个!");
        return false;
    }
    var clas = ""
    $(".addJurisdiction").find("input").each(function (idx) {
        if ($(this).attr('checked') == 'checked') {
            clas = $(this).parent("div").parent("div").attr("class");
        }
    });
    if (num == 1) {
        $("#manipulateJurisdiction").html("");
        tcc();
        $("#setTitle").text("添加同级权限");
        if (clas == 'menuJ3') {
            $("#manipulateJurisdiction").append("<div style='margin-top: 20px;margin-left: 20px;'>权限名称:<input style='margin-left:10px;' type='text' name='name' ><br><br><br>权限路径:<input style='margin-left:10px;' type='text' name='url' ><br><br><br>权限标题:<input style='margin-left:10px;' type='text' name='title' ><br><br><br>权限图标:<input style='margin-left:10px;' type='text' name='img' ><div style='border-bottom:1px solid #3E97C9;width:520px;height:2px;margin-left: -20px;margin-top: 20px;'></div><button class='btn' style=' float: none;margin-top: 10px;margin-left:0px;' onclick='addJurisdiction(" + num + ");'>添加</button></div>");
        } else {
            $("#manipulateJurisdiction").append("<div style='margin-top: 20px;margin-left: 20px;'>权限名称:<input style='margin-left:10px;' type='text' name='name' ><br><br><br>权限路径:<input style='margin-left:10px;' type='text' name='url' ><br><br><br>权限图标:<input style='margin-left:10px;' type='text' name='img' ><div style='border-bottom:1px solid #3E97C9;width:520px;height:2px;margin-left: -20px;margin-top: 20px;'></div><button class='btn' style=' float: none;margin-top: 10px;margin-left:0px;' onclick='addJurisdiction(" + num + ");'>添加</button></div>");
        }
    }
    if (num == 2) {
        if (clas == 'menuJ3') {
            swal("该权限模块不能开通下级权限!");
        } else if (clas == 'menuJ1') {
            $("#manipulateJurisdiction").html("");
            tcc();
            $("#setTitle").text("添加下级权限");
            $("#manipulateJurisdiction").append("<div style='margin-top: 20px;margin-left: 20px;'>权限名称:<input style='margin-left:10px;' type='text' name='name' ><br><br><br>权限路径:<input style='margin-left:10px;' type='text' name='url' ><br><br><br>权限图标:<input style='margin-left:10px;' type='text' name='img' ><div style='border-bottom:1px solid #3E97C9;width:520px;height:2px;margin-left: -20px;margin-top: 20px;'></div><button class='btn' style=' float: none;margin-top: 10px;margin-left:0px;' onclick='addJurisdiction(" + num + ");'>添加</button></div>");
        } else {
            $("#manipulateJurisdiction").html("");
            tcc();
            $("#setTitle").text("添加同级权限");
            $("#manipulateJurisdiction").append("<div style='margin-top: 20px;margin-left: 20px;'>权限名称:<input style='margin-left:10px;' type='text' name='name' ><br><br><br>权限路径:<input style='margin-left:10px;' type='text' name='url' ><br><br><br>权限标题:<input style='margin-left:10px;' type='text' name='title' ><br><br><br>权限图标:<input style='margin-left:10px;' type='text' name='img' ><div style='border-bottom:1px solid #3E97C9;width:520px;height:2px;margin-left: -20px;margin-top: 20px;'></div><button class='btn' style=' float: none;margin-top: 10px;margin-left:0px;' onclick='addJurisdiction(" + num + ");'>添加</button></div>");
        }
    }
    if (num == 3) {
        $("#manipulateJurisdiction").html("");
        tcc();
        $("#setTitle").text("编辑权限");
        var clas = ""
        var id = 0;
        $(".addJurisdiction").find("input").each(function (idx) {
            if ($(this).attr('checked') == 'checked') {
                clas = $(this).parent("div").parent("div").attr("class");
                id = $(this).val();
            }
        });
        var pi_id = "";
        if (clas == 'menuJ1') {
            pi_id = 0;
        } else if (clas == 'menuJ3') {
            pi_id = 2;
        } else {
            pi_id = 1;
        }
        $.ajax({
            type: "POST",
            url: "/selectJurisdictionById",
            data: "pi_id=" + pi_id + "&id=" + id,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (pi_id == 2) {
                    $("#manipulateJurisdiction").append("<div style='margin-top: 20px;margin-left: 20px;'>权限名称:<input style='margin-left:10px;' value='" + result.result.ucf_name + "' type='text' name='name' ><br><br><br>权限路径:<input style='margin-left:10px;width:300px;' value='" + result.result.ucf_url + "' type='text' name='url' ><br><br><br>权限标题:<input style='margin-left:10px;' value='" + result.result.title + "' type='text' name='title' ><br><br><br>权限图标:<input style='margin-left:10px;' type='text' value='" + result.result.img + "' name='img' ><div style='border-bottom:1px solid #3E97C9;width:520px;height:2px;margin-left: -20px;margin-top: 20px;'></div><button class='btn' style=' float: none;margin-top: 10px;margin-left:0px;' onclick='updateJurisdictionById(" + pi_id + "," + id + ");'>修改</button></div>");
                } else {
                    $("#manipulateJurisdiction").append("<div style='margin-top: 20px;margin-left: 20px;'>权限名称:<input style='margin-left:10px;' value='" + result.result.ucm_name + "' type='text' name='name' ><br><br><br>权限路径:<input style='margin-left:10px;width:300px;' value='" + result.result.ucm_url + "' type='text' name='url' ><br><br><br>权限图标:<input style='margin-left:10px;' type='text' value='" + result.result.img + "' name='img' ><div style='border-bottom:1px solid #3E97C9;width:520px;height:2px;margin-left: -20px;margin-top: 20px;'></div><button class='btn' style=' float: none;margin-top: 10px;margin-left:0px;' onclick='updateJurisdictionById(" + pi_id + "," + id + ");'>修改</button></div>");
                }
            }
        });
    }
    if (num == 4) {
        var count = "1=1";
        if (ucm_id != null && ucm_id != "") {
            count = count + "&ucm_id=" + ucm_id + "&pi_id=" + pid;
        }
        if (ucf_id != null && ucf_id != "") {
            count = count + "&ucf_id=" + ucf_id;
        }
        $.ajax({
            type: "POST",
            url: "/deleteUserCenterMenuFuncOne",
            data: count,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            success: function (result) {
                alert("删除成功");
                switchJurisdiction(0);
            }
        })
    }
}

//添加权限
function addJurisdiction(num) {
    var clas = ""
    var id = 0;
    $(".addJurisdiction").find("input").each(function (idx) {
        if ($(this).attr('checked') == 'checked') {
            clas = $(this).parent("div").parent("div").attr("class");
            id = $(this).val();
        }
    });
    var pi_id = "";
    if (num == 1) {
        if (clas == 'menuJ1') {
            pi_id = 0;
        } else if (clas == 'menuJ3') {
            pi_id = 2;
        } else {
            pi_id = 1;
        }
    }
    if (num == 2) {
        if (clas == 'menuJ1') {
            pi_id = 1;
        } else if (clas == 'menuJ3') {
            swal("该权限模块不能开通下级权限!");
            return false;
        } else {
            pi_id = 2;
        }
    }
    if (num == 3) {
    }
    if (num == 4) {
    }
    $.ajax({
        type: "POST",
        url: "/addJurisdiction",
        data: "pi_id=" + pi_id + "&ucm_id=" + id + "&name=" + $("input[name='name']").val() + "&url=" + $("input[name='url']").val() + "&num=" + num + "&title=" + $("input[name='title']").val() + "&img=" + $("input[name='img']").val(),
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.result != 0) {
                switchJurisdiction(2);
                closeTc();
                swal("添加成功!");
            }
        }
    });
}

//新建岗位
function addStation() {
    $("#manipulateJurisdiction").html("");
    tcc();
    $("#setTitle").text("添加下属职位");
    $("#manipulateJurisdiction").append("<div style='margin-top: 20px;margin-left: 20px;'>职位名称:<input style='margin-left:10px;' type='text' name='ucr_name' ><br><br>职位备注:<textarea id='ucr_text' style='width: 300px;margin-left: 10px;' rows='3' name='ucr_text' ></textarea><div style='border-bottom:1px solid #3E97C9;width:520px;height:2px;margin-left: -20px;margin-top: 20px;'></div><button class='btn' style=' float: none;margin-top: 10px;margin-left:0px;' onclick='addStationSubmit();'>添加</button></div>");
}

//添加下属职位
function addStationSubmit() {
    $.ajax({
        type: "POST",
        url: "/addStation",
        data: "ucc_id=" + $("#ucc_id").val() + "&ucr_name=" + $("input[name='ucr_name']").val() + "&ucr_text=" + $("#ucr_text").val(),
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.result != 0) {
                subordinateStation();
                swal("添加成功!");
                closeTc();
            }
        }
    });
}

//新建部门
function addOrganization(num) {
    $("#manipulateJurisdiction").html("");
    tcc();
    $("#setTitle").text("添加组织");
    $("#manipulateJurisdiction").append("<div style='margin-top: 20px;margin-left: 20px;'>组织名称:<input style='margin-left:34px;' type='text' name='ucc_names' ><br><br>组织负责人:<input style='margin-left:22px;' type='text' name='ucc_corporations' ><br><br>组织电话:<input style='margin-left:34px;' type='text' name='ucc_phones' ><br><br>组织简称:<input style='margin-left:34px;' type='text' name='ucc_shorts' ><br><br>组织类型:<select style='margin-left:34px;' name='ucc_types'><option value='公司'>公司</option><option value='部门'>部门</option></select><br><br>组织成立时间:<input style='margin-left:10px;' type='text' name='ucc_establishDatess' onclick='WdatePicker({startDate:\"%y-%M-%d\",dateFmt:\"yyyy-MM-dd\",alwaysUseStartDate:true})'><br><br>组织备注:<textarea id='ucc_text' style='width: 300px;margin-left: 34px;' rows='3' name='ucc_text' ></textarea><div style='border-bottom:1px solid #3E97C9;width:520px;height:2px;margin-left: -20px;margin-top: 20px;'></div><button class='btn' style=' float: none;margin-top: 10px;margin-left:0px;' onclick='addOrganizationSubmit(" + num + ");'>添加</button></div>");
}

//添加下属组织
function addOrganizationSubmit(num) {
    $.ajax({
        type: "POST",
        url: "/addOrganization",
        data: "ucc_id=" + $("#ucc_id").val() + "&ucc_name=" + $("input[name='ucc_names']").val() + "&ucc_establishDate=" + $("input[name='ucc_establishDatess']").val() + "&ucc_short=" + $("input[name='ucc_shorts']").val() + "&ucc_type=" + $("select[name='ucc_types']").val() + "&ucc_phone=" + $("input[name='ucc_phones']").val() + "&ucc_corporation=" + $("input[name='ucc_corporations']").val() + "&ucc_text=" + $("#ucc_text").val() + "&num=" + num,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.result != 0) {
                closeTc();
                swal("添加成功!");
                subordinateOrganization();
            }
        }
    });

}

/** 查询客户信息*/
function openModel1(obj, param) {
    var $commonId = $(obj).attr("data-id");
    COMMONID = $commonId;
    _OBJ = "#" + param;
    $(".model-content").hide();
    $(".model-mark,#" + param).show();
    var $text = $("#" + param + "-search");
    // 初始化
    list();
    // 搜索框绑定propertychange
    $text.bind("input propertychange", function () {
        $(_OBJ + " #pageNo").text(1);
        list();
    }).focus();
    eindex = -1;
    // 上、下、回车选择
    $text.keyup(function (event) {
        var $item = $(_OBJ + '-Body>tr');
        if (event.keyCode == 40) {// 下键
            eindex++;
            if (eindex >= $item.length) {
                eindex = 0;
            }
            choose(eindex);
        } else if (event.keyCode == 38) {// 上键
            eindex--;
            if (eindex < 0) {
                eindex = $item.length - 1;
            }
            choose(eindex);
        } else if (event.keyCode == 13) { // 回车
            if (eindex >= 0) {
                setSginInfo(this, COMMONID);
                eindex = -1
                return false;
            }
        } else {
            eindex = -1;
        }
    });
    // 显示搜索结果
    var choose = function (index) {
        var $item = $(_OBJ + '-Body>tr');
        $item.removeClass('item-hover').eq(index).addClass('item-hover');
    }
}

/** 列表集*/
function list() {
    if (_OBJ == "#orderInfo") {
        queryReserveOrder(COMMONID);
    } else if (_OBJ == "#employee") {
        showEmpList(COMMONID);
    } else {
        showSginList(COMMONID);
    }
}

/** 设置客户信息*/
function setSginInfo(obj, param) {
    var $this = $(obj);
    var $did = $this.find(".dataId").val();
    var signid = $("#sign-id").val();
    if ($did == signid) {
        alert("该客户已选择");
        return;
    }
    var boo = false;
    $.each($("input[type='hidden'].form-input"), function (index) {
        if ($(this).val() == $did) {
            alert("该客户已选择");
            boo = true;
            return false;
        }
    });
    if (boo) return;
    // TODO 昨天
    $("." + param + "-0").val($did);
    $("." + param + "-1").val($this.find(".data0").text());
    $("." + param + "-2").val($this.find(".data2").text());
    $("." + param + "-3").val($this.find(".data3").text());
    if ("sign" == param) {
        $("#sign-name,#sign-phone,#sign-carNo").change();
    }
    $(".sign-nameformError").remove();
    closeModel();
}

/** 关闭Model*/
function closeModel() {
    moveModelMainRight();
    $(".model-mark,.model-content").hide();
    $(".model-content input[type='text']").val("");
}

/** 显示客户列表信息*/
function showSginList(param) {
    var _body = $(_OBJ + "-Body");
    $.ajax({
        type: "POST",
        url: "/ueseEmployeeList",
        data: {
            param: $(_OBJ + "-search").val(),
            pageNo: $(_OBJ + " #pageNo").text()
        },
        dataType: "json"
    }).done(function (result) {
        if (result.code == 200) {
            _body.empty();
            $.each(result.data.list, function (index, data) {
                if (data.em_name == undefined) {
                    data.em_name = "";
                }
                if (data.em_sex == "man") {
                    data.em_sex = "男";
                }
                if (data.em_sex == "woman") {
                    data.em_sex = "女";
                }
                _body.append(
                    '<tr style="font-size: 12px;" onclick="setSginInfo(this,\'' + param + '\');">' +
                    '<td class="data0"><input type="hidden" class="dataId" value="' + data.em_id + '">' + data.em_name + '</td>' +
                    '<td class="data1">' + data.em_sex + '</td>' +
                    '<td class="data2">' + data.em_phone + '</td>' +
                    '<td class="data3">' + data.em_post + '</td>' +
                    '</tr>');
            });
            $(_OBJ + " #totalPage").text(result.data.totalPage);
            $(_OBJ + " #totalRecords").text(result.data.totalRecords);
        }
    });
}

/** 切换窗口2*/
function moveModelMainRight() {
    $('#main2').animate({marginRight: '-700px', opacity: 0}, 300, '', function () {
        $(this).hide();
        $(this).css("marginRight", 0);
        $("#main1").show().animate({opacity: 1}, 200);
        $("#model-drag-title").text('客户资料');
        $("#main1 input[type='text']:first").focus();
    });
    $('#main2').find(".tisp").removeClass("error").empty();
    $('#main2').find(".form-control").val("");
    $("#main2").find(".images-box-img").remove();
    list();
}

/** 分页--[上一页]*/
function pageUp() {
    var pageNo = parseInt($(_OBJ + " #pageNo").text());
    if (pageNo <= 1) {
        return;
    }
    $(_OBJ + " #pageNo").text(pageNo - 1);
    list();
}

/** 分页--[下一页]*/
function pageDown() {
    var pageNo = parseInt($(_OBJ + " #pageNo").text());
    var totalPage = parseInt($(_OBJ + " #totalPage").text());
    if (pageNo >= totalPage) {
        return;
    }
    $(_OBJ + " #pageNo").text(pageNo + 1);
    list();
}

/** 切换窗口1*/
function moveModelMainLeft() {
    $('#main1').animate({marginLeft: '-700px', opacity: 0}, 300, '', function () {
        $(this).hide();
        $(this).css("marginLeft", 0);
        $("#main2").show().animate({opacity: 1}, 200);
        $("#model-drag-title").text('添加客户');
        $("#main2 input[type='text']:first").focus();
    });
}

/** 跳页*/
function jumpPage() {
    var pagaText = parseInt($(_OBJ + " #pagaText").val());
    var totalPage = parseInt($(_OBJ + " #totalPage").text());
    if (isNaN(pagaText)) return;
    if (pagaText > totalPage || pagaText < 1) return;
    $(_OBJ + " #pageNo").text(pagaText);
    list();
}

//设置人员
function addUser() {
    var cbl_s = document.getElementsByName("chickes");
    var checkCount = 0;
    var id = 0;
    for (var i = 0; i < cbl_s.length; i++) {
        if (cbl_s[i].checked) {
            checkCount++;
            id = cbl_s[i].id;
        }
    }
    if (checkCount == 0) {
        swal("请选择一个!")
    } else if (checkCount > 1) {
        alert('只能选择一个！');
    } else {
        $("#importPersonnel").css("display", "block");
        selectUser(id);
    }
}

//根据条件查询人员
function selectUser(ucr_id) {
    $.ajax({
        type: "POST",
        url: "/selectEmployeeList",
        data: "param=" + $("#userCondition").val() + "&ucr_id=" + ucr_id,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.userCenterEmployeeList != 0) {
                $("#select1").html("");
                $.each(result.userCenterEmployeeList, function (idx, item) {
                    var res = 1;
                    $.each(result.userCenterEmployeeList1, function (idx, items) {
                        if (item.em_id == items.em_id) {
                            res = 0;
                        }
                    });
                    if (res == 1) {
                        $("#select1").append("<option style='padding-top:8px;' value='" + item.em_id + "'>" + item.em_name + "(" + item.em_phone + ")</option>");
                    }
                });
            }
            if (result.userCenterEmployeeList1 != 0) {
                $("#select2").html("");
                $.each(result.userCenterEmployeeList1, function (idx, item) {
                    $("#select2").append("<option style='padding-top:8px;' value='" + item.em_id + "'>" + item.em_name + "(" + item.em_phone + ")</option>");
                });
            }

        }
    });
}

//根据条件查询人员
function selectUsers(ucr_id) {
    $.ajax({
        type: "POST",
        url: "/selectEmployeeList",
        data: "param=" + $("#userCondition").val() + "&ucr_id=" + ucr_id,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.userCenterEmployeeList != 0) {
                $("#select1").html("");
                $.each(result.userCenterEmployeeList, function (idx, item) {
                    var res = 1;
                    $("#select2 option").each(function () {
                        if (item.em_id == $(this).val()) {
                            res = 0;
                        }
                    });
                    if (res == 1) {
                        $("#select1").append("<option style='padding-top:8px;' value='" + item.em_id + "'>" + item.em_name + "(" + item.em_phone + ")</option>");
                    }
                });
            }
        }
    });
}

//关闭右边弹出层
function closeDiv() {
    $("#select1").html("");
    $("#select2").html("");
    $("#importPersonnel").css("display", "none");
}

//人员导入
function importPersonnel() {
    var cbl_s = document.getElementsByName("chickes");
    var checkCount = 0;
    var id = 0;
    for (var i = 0; i < cbl_s.length; i++) {
        if (cbl_s[i].checked) {
            checkCount++;
            id = cbl_s[i].id;
        }
    }
    $("#select2 option").attr("selected", "selected");
    $.ajax({
        type: "POST",
        url: "/importPersonnel",
        data: "em_id=" + $("#select2").val() + "&ucc_id=" + $("#ucc_id").val() + "&ucr_id=" + id,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            subordinateEmployee();
            closeDiv();
            swal("人员设置成功!")
        }
    });
}

function xxxxxxxxxxxxxxx() {
    $.ajax({
        type: "POST",
        url: "/xxxxxxxxxxxxxxx",
        data: "",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {

        }
    });
}

function installJurisdiction(num) {
    var cbl_s = document.getElementsByName("chickes");
    var checkCount = 0;
    var id = 0;
    for (var i = 0; i < cbl_s.length; i++) {
        if (cbl_s[i].checked) {
            checkCount++;
            id = cbl_s[i].id;
        }
    }
    if (checkCount == 0) {
        swal("请选择一个!")
    } else if (checkCount > 1) {
        alert('只能选择一个！');
    } else {
        $("#manipulateJurisdiction").html("");
        $("#setTitle").text("设置权限");
        tcc();
        if (num == 1) {
            $.ajax({
                type: "POST",
                url: "/selectAllJurisdiction",
                data: "type=" + "organization" + "&ucc_id=" + id,
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    $(".jurisdiction").html("");
                    $("#manipulateJurisdiction").append("<form class='form-inline' action='' method='POST' id='updateComJurisdiction'>");
                    $.each(result.menuList, function (idx, item) {
                        if (item.pi_id == 0) {
                            $("#updateComJurisdiction").append("<div class='menuJ1' id='menu" + item.ucm_id + "'><div class='checkboxFive'><input type='checkbox' value='" + item.ucm_id + "' id='sd" + item.ucm_id + "' name='ucm_id' /><label onclick='checkAllJurisdiction(this,1);' for='sd" + item.ucm_id + "'></label></div><span style='cursor: pointer' onclick='shrinkSublayer(this);'>" + item.ucm_name + "</span></div>");
                        } else {
                            $("#menu" + item.pi_id).append("<div class='menuJ2 " + item.ucm_code + "' id='menu" + item.ucm_id + "'><div class='checkboxFive'><input type='checkbox' value='" + item.ucm_id + "' id='sd" + item.ucm_id + "' name='ucm_id' /><label onclick='checkAllJurisdiction(this,2);' for='sd" + item.ucm_id + "'></label></div>" + item.ucm_name + "</div>");
                            $("." + item.ucm_code).append("<div class='gnbh'></div>");
                        }
                    });
                    $.each(result.functionList, function (idx, item) {
                        $("." + item.ucm_code).children(".gnbh").css("height", "40px");
                        $("." + item.ucm_code).children(".gnbh").append("<div class='menuJ3' id='function" + item.ucf_id + "'><div class='checkboxFive'><input type='checkbox' value='" + item.ucf_id + "' id='gn" + item.ucf_id + "' name='ucf_id' /><label onclick='checkSuperiorJurisdiction(this);' for='gn" + item.ucf_id + "'></label></div>" + item.ucf_name + "</div>");
                    });
                    $.each(result.menuLists, function (idx, item) {
                        $("#menu" + item.ucm_id).children(".checkboxFive").children("input").attr('checked', true);
                    });
                    $.each(result.functionLists, function (idx, item) {
                        $("#function" + item.ucf_id).children(".checkboxFive").children("input").attr('checked', true);
                    });
                    $("#updateComJurisdiction").append("<input type='hidden' name='ucc_id' value='" + id + "'></div></div>");
                    $("#manipulateJurisdiction").append("</form");
                    $("#jurSubmit").css("display", "block");
                    $("#jurSubmitBtn").attr("onclick", "updateComJurisdiction();");
                }
            });
        }

        if (num == 2) {
            $.ajax({
                type: "POST",
                url: "/selectAllJurisdiction",
                data: "type=" + "organization" + "&ucc_id=" + $("#ucc_id").val(),
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    $(".jurisdiction").html("");
                    $("#manipulateJurisdiction").append("<form class='form-inline' action='' method='POST' id='updateComJurisdiction'>");
                    $.each(result.menuList, function (idx, item) {
                        if (item.pi_id == 0) {
                            $("#updateComJurisdiction").append("<div class='menuJ1' id='menu" + item.ucm_id + "'><div class='checkboxFive'><input type='checkbox' value='" + item.ucm_id + "' id='sd" + item.ucm_id + "' name='ucm_id' /><label onclick='checkAllJurisdiction(this,1);' for='sd" + item.ucm_id + "'></label></div><span style='cursor: pointer' onclick='shrinkSublayer(this);'>" + item.ucm_name + "</span></div>");
                        } else {
                            $("#menu" + item.pi_id).append("<div class='menuJ2 " + item.ucm_code + "' id='menu" + item.ucm_id + "'><div class='checkboxFive'><input type='checkbox' value='" + item.ucm_id + "' id='sd" + item.ucm_id + "' name='ucm_id' /><label onclick='checkAllJurisdiction(this,2);' for='sd" + item.ucm_id + "'></label></div>" + item.ucm_name + "</div>");
                            $("." + item.ucm_code).append("<div class='gnbh'></div>");
                        }
                    });
                    $.each(result.functionList, function (idx, item) {
                        $("." + item.ucm_code).children(".gnbh").css("height", "40px");
                        $("." + item.ucm_code).children(".gnbh").append("<div class='menuJ3' id='function" + item.ucf_id + "'><div class='checkboxFive'><input type='checkbox' value='" + item.ucf_id + "' id='gn" + item.ucf_id + "' name='ucf_id' /><label onclick='checkSuperiorJurisdiction(this);' for='gn" + item.ucf_id + "'></label></div>" + item.ucf_name + "</div>");
                    });
                    $.each(result.menuLists, function (idx, item) {
                        $("#menu" + item.ucm_id).children(".checkboxFive").children("input").attr('checked', true);
                        $("#menu" + item.ucm_id).children(".checkboxFive").children("input").attr("disabled", "disabled");
                        $("#menu" + item.ucm_id).children(".checkboxFive").children("label").removeAttr("onclick");
                        $("#menu" + item.ucm_id).children(".checkboxFive").children("input").attr('name', 'exist');
                    });
                    $.each(result.functionLists, function (idx, item) {
                        $("#function" + item.ucf_id).children(".checkboxFive").children("input").attr('checked', true);
                        $("#function" + item.ucf_id).children(".checkboxFive").children("input").attr("disabled", "disabled");
                        $("#function" + item.ucf_id).children(".checkboxFive").children("label").removeAttr("onclick");
                        $("#function" + item.ucf_id).children(".checkboxFive").children("input").attr('name', 'exist');
                    });
                    selectPosJurisdiction(id);
                    $("#updateComJurisdiction").append("<input type='hidden' name='ucr_id' value='" + id + "'></div>");
                    $("#manipulateJurisdiction").append("</form");
                    $("#jurSubmit").css("display", "block");
                    $("#jurSubmitBtn").attr("onclick", "updatePosJurisdiction();");
                }
            });
        }

        if (num == 3) {
            $.ajax({
                type: "POST",
                url: "/selectAllJurisdiction",
                data: "type=" + "organization" + "&ucc_id=" + $("#ucc_id").val(),
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    $(".jurisdiction").html("");
                    $("#manipulateJurisdiction").append("<form class='form-inline' action='' method='POST' id='updateComJurisdiction'>");
                    $.each(result.menuList, function (idx, item) {
                        if (item.pi_id == 0) {
                            $("#updateComJurisdiction").append("<div class='menuJ1' id='menu" + item.ucm_id + "'><div class='checkboxFive'><input type='checkbox' value='" + item.ucm_id + "' id='sd" + item.ucm_id + "' name='ucm_id' /><label onclick='checkAllJurisdiction(this,1);' for='sd" + item.ucm_id + "'></label></div><span style='cursor: pointer' onclick='shrinkSublayer(this);'>" + item.ucm_name + "</span></div>");
                        } else {
                            $("#menu" + item.pi_id).append("<div class='menuJ2 " + item.ucm_code + "' id='menu" + item.ucm_id + "'><div class='checkboxFive'><input type='checkbox' value='" + item.ucm_id + "' id='sd" + item.ucm_id + "' name='ucm_id' /><label onclick='checkAllJurisdiction(this,2);' for='sd" + item.ucm_id + "'></label></div>" + item.ucm_name + "</div>");
                            $("." + item.ucm_code).append("<div class='gnbh'></div>");
                        }
                    });
                    $.each(result.functionList, function (idx, item) {
                        $("." + item.ucm_code).children(".gnbh").css("height", "40px");
                        $("." + item.ucm_code).children(".gnbh").append("<div class='menuJ3' id='function" + item.ucf_id + "'><div class='checkboxFive'><input type='checkbox' value='" + item.ucf_id + "' id='gn" + item.ucf_id + "' name='ucf_id' /><label onclick='checkSuperiorJurisdiction(this);' for='gn" + item.ucf_id + "'></label></div>" + item.ucf_name + "</div>");
                    });
                    $.each(result.menuLists, function (idx, item) {
                        $("#menu" + item.ucm_id).children(".checkboxFive").children("input").attr('checked', true);
                        $("#menu" + item.ucm_id).children(".checkboxFive").children("input").attr("disabled", "disabled");
                        $("#menu" + item.ucm_id).children(".checkboxFive").children("label").removeAttr("onclick");
                        $("#menu" + item.ucm_id).children(".checkboxFive").children("input").attr('name', 'exist');
                    });
                    $.each(result.functionLists, function (idx, item) {
                        $("#function" + item.ucf_id).children(".checkboxFive").children("input").attr('checked', true);
                        $("#function" + item.ucf_id).children(".checkboxFive").children("input").attr("disabled", "disabled");
                        $("#function" + item.ucf_id).children(".checkboxFive").children("label").removeAttr("onclick");
                        $("#function" + item.ucf_id).children(".checkboxFive").children("input").attr('name', 'exist');
                    });
                    selectEmpJurisdiction(id, $("#" + id).next("input").val());
                    $("#updateComJurisdiction").append("<input type='hidden' name='em_id' value='" + id + "'></div>");
                    $("#manipulateJurisdiction").append("</form");
                    $("#jurSubmit").css("display", "block");
                    $("#jurSubmitBtn").attr("onclick", "updateEmpJurisdiction();");
                }
            });
        }
    }
}

//修改下级组织权限
function updateComJurisdiction() {
    $.ajax({
        type: "POST",
        url: "/updateJurisdiction",
        data: $('#updateComJurisdiction').serialize(),
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            swal("修改成功", "", "success");
            closeTc();
            subordinateOrganization();
        }
    });
}

//查询职位权限
function selectPosJurisdiction(num) {
    $.ajax({
        type: "POST",
        url: "/selectPosJurisdiction",
        data: "ucr_id=" + num + "&ucc_id=" + $("#ucc_id").val(),
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $.each(result.posMenuLists, function (idx, item) {
                $("#menu" + item.ucm_id).children(".checkboxFive").children("input").attr('checked', true);
            });
            $.each(result.posFunctionLists, function (idx, item) {
                $("#function" + item.ucf_id).children(".checkboxFive").children("input").attr('checked', true);
            });
        }
    });
}

//查询人员权限
function selectEmpJurisdiction(num, idx) {
    $.ajax({
        type: "POST",
        url: "/selectPosJurisdiction",
        data: "ucr_id=" + idx + "&ucc_id=" + $("#ucc_id").val(),
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $.each(result.posMenuLists, function (idx, item) {
                $("#menu" + item.ucm_id).children(".checkboxFive").children("input").attr('checked', true);
                $("#menu" + item.ucm_id).children(".checkboxFive").children("input").attr("disabled", "disabled");
                $("#menu" + item.ucm_id).children(".checkboxFive").children("label").removeAttr("onclick");
                $("#menu" + item.ucm_id).children(".checkboxFive").children("input").attr('name', 'exist');
            });
            $.each(result.posFunctionLists, function (idx, item) {
                $("#function" + item.ucf_id).children(".checkboxFive").children("input").attr('checked', true);
                $("#function" + item.ucf_id).children(".checkboxFive").children("input").attr("disabled", "disabled");
                $("#function" + item.ucf_id).children(".checkboxFive").children("label").removeAttr("onclick");
                $("#function" + item.ucf_id).children(".checkboxFive").children("input").attr('name', 'exist');
            });
        }
    });

    $.ajax({
        type: "POST",
        url: "/selectEmpJurisdiction",
        data: "em_id=" + num + "&ucc_id=" + $("#ucc_id").val(),
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $.each(result.posMenuLists, function (idx, item) {
                $("#menu" + item.ucm_id).children(".checkboxFive").children("input").attr('checked', true);
            });
            $.each(result.posFunctionLists, function (idx, item) {
                $("#function" + item.ucf_id).children(".checkboxFive").children("input").attr('checked', true);
            });
        }
    });

}

//修改下级岗位权限
function updatePosJurisdiction() {
    $.ajax({
        type: "POST",
        url: "/updatePosJurisdiction",
        data: $('#updateComJurisdiction').serialize(),
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            swal("修改成功", "", "success");
            closeTc();
            subordinateOrganization();
        }
    });
}

//修改下级人员权限
function updateEmpJurisdiction() {
    $.ajax({
        type: "POST",
        url: "/updateEmpJurisdiction",
        data: $('#updateComJurisdiction').serialize(),
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            swal("修改成功", "", "success");
            closeTc();
            subordinateOrganization();
        }
    });
}

//修改权限内容
function updateJurisdictionById(num, id) {
    $.ajax({
        type: "POST",
        url: "/updateJurisdictionById",
        data: "num=" + num + "&id=" + id + "&name=" + $("input[name='name']").val() + "&url=" + $("input[name='url']").val() + "&title=" + $("input[name='title']").val() + "&img=" + $("input[name='img']").val(),
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            swal("修改成功", "", "success");
            closeTc();
            switchJurisdiction(2);
        }
    });
}

//新建人员
function insertEmployee() {
    $("#manipulateJurisdiction").html("");
    tcc();
    $("#setTitle").text("添加人员");
    var html = "";
    html += "<div><table border='0'><tbody>" +
        "<tr><td style='padding-left: 20px;'>用户账号<input type='text' class='jianju' onblur='verificationAccount();' name='em_account' placeholder='用户账号' aria-required='true'><span id='zhts' class='jianju'></span></td></tr>" +
        "<tr><td style='padding-left: 20px; width: 240px;'>用户名称<input type='text' class='jianju' name='em_name' placeholder='用户名称' aria-required='true'></td></tr>" +
        "<tr><td style='padding-left: 20px;'>联系电话<input type='text' class='jianju' name='em_phone' placeholder='联系电话' aria-required='true'></td></tr>" +
        "<tr><td style='padding-left: 20px;'>身份证号<input type='text' onblur='accordingIdGender();' style='width: 300px;' class='jianju' name='em_documentID' placeholder='身份证号' aria-required='true'><span id='sfz' class='jianju'></span></td></tr>" +
        "<tr><td style='padding-left: 20px;' colspan='2'>用户住址<input type='text' style='width: 300px;' class='jianju' name='em_address' placeholder='用户住址' aria-required='true'></td></tr>" +
        "<tr><td style='padding-left: 20px;'>用户性别<input type='checkbox' style='margin-left: 15px; margin-right: 3px;' id='man' name='em_sex' value='man' checked='checked' />男<input type='checkbox' style='margin-left: 5px; margin-right: 3px;' name='em_sex' id='woman' value='woman' />女</td></tr>" +
        "</tbody></table></div>" +

        "<div class='col-md-6' style='width: 386px;margin-left: 94px;margin-bottom: 40px;'>" +
        "<div class='box-content' style='min-width: 230px;width: 386px;margin-left:-70px;margin-top:20px;'>" +
        "<div class='sub-title'>" +
        "<ul class='title-nav'>" +
        "<li class='visited'>电子名片</li>" +
        "</ul></div>" +
        "<div class='sub-content' style='padding-left: 66px;' >" +
        "<div class='image-upload-box image-card-div' >" +
        "<label class='image-item-add' for='house-image'>" +
        "<input type='file' id='house-image' accept='image/*'>" +
        "</label></div></div></div></div>" +

        "<div><table border='0'><tbody>" +
        "<tr><td style='padding-left: 0px;' colspan='2'><div style='border-bottom:1px solid #3E97C9;width:520px;height:2px;margin-top: 0px;'></div><button id='subs' class='btn' onclick='insertEmployeeSubmit()'>确认</button></td></tr>" +
        "</tbody></table></div>"

    $("#manipulateJurisdiction").append(html);
    $(":checkbox").click(function () {
        if ($(this).attr("name") != 'em_sex') {

        } else {
            if ($(this).attr("checked") != 'true') {
                var name = $(this).attr("name");
                $(this).siblings(":checkbox[name='" + name + "']").attr("checked", false);
                $(this).attr("checked", true);
            }
        }
    });
}

//根据身份证判断性别
function accordingIdGender() {
    var id = $("input[name='em_documentID']").val();
    if (isIDCard(id)) {
        if (id.substr(16, 1) % 2 == 1) {
            $("#man").attr('checked', true);
            $("#woman").attr('checked', false);
        } else {
            $("#woman").attr('checked', true);
            $("#man").attr('checked', false);
        }
        $("#sfz").html("可以使用");
        $("#sfz").css("color", "green");
        $("#subs").removeAttr("disabled");
    } else {
        $("#sfz").html("格式错误");
        $("#sfz").css("color", "red");
        $("#subs").attr("disabled", "disabled");
    }
}

//添加人员
function insertEmployeeSubmit() {
    $.ajax({
        type: "POST",
        url: "/user/insertEmployee",
        data: "em_name=" + $("input[name='em_name']").val() + "&em_sex=" + $("input[name='em_sex']").val() + "&em_phone=" + $("input[name='em_phone']").val() + "&em_address=" + $("input[name='em_address']").val() + "&em_account=" + $("input[name='em_account']").val() + "&em_documentID=" + $("input[name='em_documentID']").val() + "&em_cardImage=" + $("#imageUrl").val(),
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            swal({
                    title: "是否设置该人员岗位?",
                    text: "",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "确认",
                    cancelButtonText: "取消",
                    closeOnConfirm: false
                },
                function () {
                    swal("点击人员导入设置岗位!")
                    subordinateStation();
                });
            closeTc();
        }
    });
}

//验证账号是否可用
function verificationAccount() {
    var account = $("input[name='em_account']").val();
    $.ajax({
        type: "POST",
        url: "/user/accountBool",
        data: "fieldValue=" + account + "&fieldId=1",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result == '1,false') {
                $("#zhts").html("该账户已有人使用");
                $("#zhts").css("color", "red");
                $("#subs").attr("disabled", "disabled");
            } else {
                $("#zhts").html("该账户可以使用");
                $("#zhts").css("color", "green");
                $("#subs").removeAttr("disabled");
            }
        }
    });
}

//修改人员信息前查询信息
function selectEmployeeById() {
    var cbl_s = document.getElementsByName("chickes");
    var checkCount = 0;
    var id = 0;
    for (var i = 0; i < cbl_s.length; i++) {
        if (cbl_s[i].checked) {
            checkCount++;
            id = cbl_s[i].id;
        }
    }
    if (checkCount == 0) {
        swal("请选择一个!")
    } else if (checkCount > 1) {
        alert('只能选择一个！');
    } else {
        $.ajax({
            type: "POST",
            url: "/user/selectEmployeeById",
            data: "em_id=" + id,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            success: function (result) {
                $("#manipulateJurisdiction").html("");
                tcc();
                emid = result.userCenterEmployees.em_id;
                $("#setTitle").text("修改人员信息");
                var html = "";
                html += "<div><table border='0'><tbody>" +
                    "<tr><td style='padding-left: 20px;'>用户账号<input type='text' class='jianju' value='" + result.userCenterEmployees.em_account + "' name='em_account' readonly='readonly' placeholder='用户账号' aria-required='true'><span id='zhts' class='jianju'></span></td></tr>" +
                    "<tr><td style='padding-left: 20px; width: 240px;'>用户名称<input type='text' class='jianju' value='" + result.userCenterEmployees.em_name + "' name='em_name' placeholder='用户名称' aria-required='true'></td></tr>" +
                    "<tr><td style='padding-left: 20px;'>联系电话<input type='text' class='jianju' name='em_phone' value='" + result.userCenterEmployees.em_phone + "' placeholder='联系电话' aria-required='true'></td></tr>" +
                    "<tr><td style='padding-left: 20px;'>主要职务<select class='jianju' name='em_chiefPos'></select></td></tr>" +
                    "<tr><td style='padding-left: 20px;' colspan='2'>用户状态<select class='jianju' name='em_state'><option value='1'>在职</option><option value='2'>申请离职</option><option value='0'>离职</option></select></td></tr>" +
                    "<tr><td style='padding-left: 20px;' colspan='2'>在职状态<select class='jianju' name='em_jobState'><option value='1'>试用</option><option value='2'>实习</option><option value='0'>转正</option></select></td></tr>" +
                    "<tr><td style='padding-left: 20px;' colspan='2'>用户住址<input type='text' style='width: 300px;' class='jianju' value='" + result.userCenterEmployees.em_address + "' name='em_address' placeholder='用户住址' aria-required='true'></td></tr>" +
                    "<tr><td style='padding-left: 20px;'>身份证号<input type='text' onblur='accordingIdGender();' value='" + result.userCenterEmployees.em_documentID + "' style='width: 300px;' class='jianju' name='em_documentID' placeholder='身份证号' aria-required='true'><span id='sfz' class='jianju'></span></td></tr>" +
                    "<tr><td style='padding-left: 20px;'>用户性别<input type='checkbox' style='margin-left: 15px; margin-right: 3px;' id='man' name='em_sex' value='man' />男<input type='checkbox' style='margin-left: 5px; margin-right: 3px;' name='em_sex' id='woman' value='woman' />女</td></tr>" +
                    "</tbody></table></div>" +

                    "<div class='col-md-6' style='width: 386px;margin-left: 94px;margin-bottom: 40px;'>" +
                    "<div class='box-content' style='min-width: 230px;width: 386px;margin-left:-70px;margin-top:20px;'>" +
                    "<div class='sub-title'>" +
                    "<ul class='title-nav'>" +
                    "<li class='visited'>电子名片</li>" +
                    "</ul></div>" +
                    "<div class='sub-content' style='padding-left: 66px;' >" +
                    "<div class='image-upload-box image-card-div' >" +
                    "<label class='image-item-add' for='house-image'>" +
                    "<input type='file' id='house-image' accept='image/*'>" +
                    "</label></div></div></div></div>" +

                    "<div><table border='0'><tbody>" +
                    "<tr><td style='padding-left: 0px;' colspan='2'><div style='border-bottom:1px solid #3E97C9;width:520px;height:2px;margin-left: 0px;margin-top: 0px;'></div><button id='subs' class='btn' onclick='updateEmployeeById(" + id + ")'>确认</button></td></tr>" +
                    "</tbody></table></div>"
                $("#manipulateJurisdiction").append(html);

                if (result.userCenterEmployees.em_cardImage != null && result.userCenterEmployees.em_cardImage != '') {
                    var html = "";
                    html += '<div class="image-item">';
                    html += '<label class="image-item-add" for="house-image"><input type="file" id="house-image">'
                    html += '	<div><img class="image-item-img image-card" onmouseover="getImageMouse()" onmouseout="leverImage()" src="' + result.userCenterEmployees.em_cardImage + '"></div>';
                    html += '	<div class="divImageCard"><input type="text" value="修改名片" name="cardImageText" id="cardImageText" class="span-card-imageText" style="width:212px;" /></div>';
                    //html +='	<span class="image-item-close icon-remove" title="删除" data-src="'+ result.userCenterEmployees.em_cardImage +'" data-id="'+ result.userCenterEmployees.em_id +'"></span>';
                    html += '</label>';
                    html += '</div>';
                    $(".image-upload-box").html(html);
                } else {

                }

                if (result.userCenterEmployees.em_state == '0') {
                    $("select[name='em_state']").val("0");
                } else if (result.userCenterEmployees.em_state == '1') {
                    $("select[name='em_state']").val("1");
                } else {
                    $("select[name='em_state']").val("2");
                }
                if (result.userCenterEmployees.em_jobState == '0') {
                    $("select[name='em_jobState']").val("0");
                } else if (result.userCenterEmployees.em_jobState == '1') {
                    $("select[name='em_jobState']").val("1");
                } else {
                    $("select[name='em_jobState']").val("2");
                }
                if (result.userCenterEmployees.em_sex == 'man') {
                    $("#man").attr("checked", true);
                } else {
                    $("#woman").attr("checked", true);
                }
                $(":checkbox").click(function () {
                    if ($(this).attr("name") != 'em_sex') {

                    } else {
                        if ($(this).attr("checked") != 'true') {
                            var name = $(this).attr("name");
                            $(this).siblings(":checkbox[name='" + name + "']").attr("checked", false);
                            $(this).attr("checked", true);
                        }
                    }
                });
                $.each(result.positionList, function (idx, item) {
                    $("select[name='em_chiefPos']").append("<option value='" + item.ucr_id + "'>" + item.ucr_name + "</option>");
                });
                $("select[name='em_chiefPos']").val(result.userCenterEmployees.em_chiefPos);
            }
        });
    }
}

function updateEmployeeById(em_id) {
    $.ajax({
        type: "POST",
        url: "/user/updateEmployeeById",
        data: "em_name=" + $("input[name='em_name']").val() + "&em_sex=" + $("input[name='em_sex'][checked]").val() + "&em_phone=" + $("input[name='em_phone']").val() + "&em_address=" + $("input[name='em_address']").val() + "&em_state=" + $("select[name='em_state']").val() + "&em_chiefPoss=" + $("select[name='em_chiefPos']").val() + "&em_jobState=" + $("select[name='em_jobState']").val() + "&em_documentID=" + $("input[name='em_documentID']").val() + "&em_id=" + em_id,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.result != 1) {
                swal("修改失败", "", "error");
            } else {
                closeTc();
                swal("修改成功", "", "success");
                subordinateEmployee();
            }
        }
    });
}

//重置密码
function resetPassword() {
    var cbl_s = document.getElementsByName("chickes");
    var checkCount = 0;
    var id = 0;
    for (var i = 0; i < cbl_s.length; i++) {
        if (cbl_s[i].checked) {
            checkCount++;
            id = cbl_s[i].id;
        }
    }
    if (checkCount == 0) {
        swal("请选择一个!")
    } else if (checkCount > 1) {
        alert('只能选择一个！');
    } else {
        swal({
                title: "确认重置?",
                text: "",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                closeOnConfirm: false
            },
            function () {
                $.ajax({
                    type: "POST",
                    url: "/user/resetPassword",
                    data: "em_id=" + id,
                    contentType: "application/x-www-form-urlencoded; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        if (result.result == 1) {
                            swal("重置成功", "", "success");
                        } else {
                            swal("重置失败,检查身份证号码", "", "error");
                        }
                    }
                });
            });
    }
}

//查询所有角色
function selectRole() {
    selectExtended = $.Deferred();
    var sizeCount = 10;
    if ($.cookie('userSize') != null) {
        sizeCount = $.cookie('userSize');
    } else {
        $.cookie("userSize", sizeCount, {expires: 7});
    }
    if ($("#sizeCount input").val() != null) {
        sizeCount = $("#sizeCount input").val();
        $.cookie("userSize", sizeCount, {expires: 7});
    }
    $.ajax({
        type: "POST",
        url: "/selectRole",
        data: "cookie=" + $.cookie('userSize') + "&page=" + $("#NumRole").text(),
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $("#tableContents #tableDatas tbody").html("");
            $("#sizeNums").text("");
            $("#numss").text("");
            $(".paginList").html("");
            $.each(result.pageModel.list, function (idx, item) {
                var tt = format(item.ucr_date, 'yyyy-MM-dd');
                if (item.ucr_state == 0) {
                    item.ucr_state = '正常';
                } else {
                    item.ucr_state = '失效';
                }
                $("#tableDatas tbody").append("<tr class='tr' onclick='mousedownTr(this)' id='data_contents'><td><input name='chickes' type='checkbox' id='" + item.ucr_id + "'/></td><td>" + (idx + 1) + "</td><td class='css2'>" + item.ucr_name + "</a></td><td>" + item.ucr_state + "</td><td class='css2'>" + item.ucr_text + "</td><td class='css2'>" + tt + "</td></tr>");
            });
            $("#sizeNums").text(result.pageModel.totalPage);
            $("#numss").text(result.pageModel.totalRecords);
            selectExtended.resolve();
        }
    });

    $.when(selectExtended).done(function () {
        pageRole();

        hide_table();
    });
}

/*=======================================角色管理页面分页==============================================*/

//判断页数
function pageRole() {
    //开始的页数样式
    if ($("#sizeNums").text() <= 5) {
        $(".paginList").html("<li class='paginItem'><a href='javascript:upRole();'><span class='pagepre' id='up'></span></a></li>");
        for (var i = 1; i <= $("#sizeNums").text(); i++) {
            if (i == $("#NumRole").text()) {
                $(".paginList").append("<li id='paginLists_" + i + "' class='paginItem current'><a href='javascript:liRole(" + i + ");'>" + i + "</a></li>");
            } else {
                $(".paginList").append("<li id='paginLists_" + i + "' class='paginItem'><a href='javascript:liRole(" + i + ");'>" + i + "</a></li>");
            }
        }
        $(".paginList").append("<li class='paginItem'><a href='javascript:downRole();'><span class='pagenxt' id='down'></span></a></li>");
    } else {
        if ($("#NumRole").text() <= 5) {
            $(".paginList").html("<li class='paginItem'><a href='javascript:upRole();'><span class='pagepre' id='up'></span></a></li>");
            for (var i = 1; i <= 5; i++) {
                if (i == $("#NumRole").text()) {
                    $(".paginList").append("<li id='paginLists_" + i + "' class='paginItem current'><a href='javascript:liRole(" + i + ");'>" + i + "</a></li>");
                } else {
                    $(".paginList").append("<li id='paginLists_" + i + "' class='paginItem'><a href='javascript:liRole(" + i + ");'>" + i + "</a></li>");
                }
            }
            $(".paginList").append("<li class='paginItem'><a href='javascript:downRole();'><span class='pagenxt' id='down'></span></a></li>");
        }
    }
    //end

    //样式变化

    $("#paginLists_" + $("#NumRole").text() + "").attr("class", "paginItem current");
    //end
    //判断最后一页和第一页的样式
    if ($("#NumRole").text() == $("#sizeNums").text() && $("#sizeNums").text() != "1") {
        $(".paginItem span[id=down]").css("background", "url(/resources/image/next_1.gif) no-repeat center center");
        $(".paginItem span[id=up]").css("background", "url(/resources/image/pre.gif) no-repeat center center");
    } else if ($("#Nums").text() == "1" && $("#sizeNums").text() != "1") {
        $(".paginItem span[id=down]").css("background", "url(/resources/image/next.gif) no-repeat center center");
        $(".paginItem span[id=up]").css("background", "url(/resources/image/pre_1.gif) no-repeat center center");
    } else if ($("#Nums").text() == "1" && $("#sizeNums").text() == "1") {
        $(".paginItem span[id=down]").css("background", "url(/resources/image/next_1.gif) no-repeat center center");
        $(".paginItem span[id=up]").css("background", "url(/resources/image/pre_1.gif) no-repeat center center");
    } else if ($("#Nums").text() != "1" && $("#Nums").text() != $("#sizeNums").text()) {
        $(".paginItem span[id=down]").css("background", "url(/resources/image/next.gif) no-repeat center center");
        $(".paginItem span[id=up]").css("background", "url(/resources/image/pre.gif) no-repeat center center");
    }
    //end

    //间隔变色
    $('.tablelist tbody tr:odd').addClass('odd');
}

/*点击LI分页读取数据*/
function liRole(id) {

    $("#NumRole").text(id);
    $("#paginLists_" + id + " a").attr("class", "paginItem");
    selectRole();
}

function upRole() {
    //获取当前页数
    var pageMum = parseInt($("#NumRole").text());
    //最大页数
    var pageSize = parseInt($("#sizeNums").text());
    if (pageMum > 1) {
        if ((pageMum - 1) % 5 == 0) {
            $(".paginList").html("<li class='paginItem'><a href='javascript:upRole();'><span class='pagepre' id='up'></span></a></li>");
            for (var i = 5; i > 0; i--) {
                if (i == $("#NumRole").text()) {
                    $(".paginList").append("<li id='paginLists_" + (pageMum - i) + "' class='paginItem current'><a href='javascript:liRole(" + (pageMum - i) + ");'>" + (pageMum - i) + "</a></li>");
                } else {
                    $(".paginList").append("<li id='paginLists_" + (pageMum - i) + "' class='paginItem'><a href='javascript:liRole(" + (pageMum - i) + ");'>" + (pageMum - i) + "</a></li>");
                }
            }
            $(".paginList").append("<li class='paginItem'><a href='javascript:downRole();'><span class='pagenxt' id='down'></span></a></li>");
        }
        $("#NumRole").text(pageMum - 1);
        selectRole();
    }
}

function downRole() {
    //获取当前页数
    var pageMum = parseInt($("#NumRole").text());
    //最大页数
    var pageSize = parseInt($("#sizeNums").text());
    if (pageMum < pageSize) {
        if ((pageMum + 5) < pageSize) {
            if (pageMum % 5 == 0) {

                $(".paginList").html("<li class='paginItem'><a href='javascript:upRole();'><span class='pagepre' id='up'></span></a></li>");
                for (var i = 1; i <= 5; i++) {
                    $(".paginList").append("<li id='paginLists_" + (pageMum + i) + "' class='paginItem'><a href='javascript:liRole(" + (pageMum + i) + ");'>" + (pageMum + i) + "</a></li>");
                }
                $(".paginList").append("<li class='paginItem'><a href='javascript:downRole();'><span class='pagenxt' id='down'></span></a></li>");
            }
            $("#NumRole").text(pageMum + 1);
            selectEmployee();
        } else {
            if (pageMum % 5 == 0) {
                $(".paginList").html("<li class='paginItem'><a href='javascript:upRole();'><span class='pagepre' id='up'></span></a></li>");
                for (var i = 4; i >= 0; i--) {
                    $(".paginList").append("<li id='paginLists_" + (pageSize - i) + "' class='paginItem'><a href='javascript:liRole(" + (pageSize - i) + ");'>" + (pageSize - i) + "</a></li>");
                }
                $(".paginList").append("<li class='paginItem'><a href='javascript:downRole();'><span class='pagenxt' id='down'></span></a></li>");
            }
            $("#NumRole").text(pageMum + 1);
            selectRole();
        }
    }
}

//添加角色
function addRole() {
    $("#manipulateJurisdiction").html("");
    tcc();
    $("#setTitle").text("添加角色");
    var html = "";
    html += "<table border='0'><tbody>" +
        "<tr><td style='padding-left: 20px;'>角色名称<input type='text' class='jianju' name='ucr_name' placeholder='角色名称' aria-required='true'></td></tr>" +
        "<tr><td style='padding-left: 20px;' colspan='2'>角色备注<input type='text' style='width: 377px;' class='jianju' name='ucr_text' placeholder='角色备注' aria-required='true'></td></tr>" +
        "<tr><td style='padding-left: 0px;' colspan='2'><div style='border-bottom:1px solid #3E97C9;width:520px;height:2px;margin-left: 0px;margin-top: 0px;'></div><button id='subs' class='btn' onclick='addRoleSubmit()'>确认</button></td></tr>" +
        "</tbody></table>"
    $("#manipulateJurisdiction").append(html);
}

function addRoleSubmit() {
    $.ajax({
        type: "POST",
        url: "/user/addRole",
        data: "ucr_name=" + $("input[name='ucr_name']").val() + "&ucr_text=" + $("input[name='ucr_text']").val(),
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.result == 1) {
                swal("添加成功", "", "success");
                clickOrganization();
                closeTc();
            } else {
                swal("添加失败", "", "error");
                closeTc();
            }
        }
    });
}

//为角色设置人员
function setPersonnel() {
    var cbl_s = document.getElementsByName("chickes");
    var checkCount = 0;
    var id = 0;
    for (var i = 0; i < cbl_s.length; i++) {
        if (cbl_s[i].checked) {
            checkCount++;
            id = cbl_s[i].id;
        }
    }
    if (checkCount == 0) {
        swal("请选择一个!")
    } else if (checkCount > 1) {
        alert('只能选择一个！');
    } else {
        $.ajax({
            type: "POST",
            url: "/selectEmployeeList",
            data: "param=" + $("#userCondition").val() + "&id=" + id,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            success: function (result) {
                $("#importPersonnel").css("display", "block");
                if (result.userCenterEmployeeList != 0) {
                    $("#select1").html("");
                    $.each(result.userCenterEmployeeList, function (idx, item) {
                        $("#select1").append("<option style='padding-top:8px;' value='" + item.em_id + "'>" + item.em_name + "(" + item.em_phone + ")</option>");
                    });
                }
                if (result.userCenterEmployeeList2 != 0) {
                    $("#select2").html("");
                    $.each(result.userCenterEmployeeList2, function (idx, item) {
                        $("#select2").append("<option style='padding-top:8px;' value='" + item.em_id + "'>" + item.em_name + "(" + item.em_phone + ")</option>");
                    });
                }
                $("#importPersonnels").attr("onclick", "roleSetPersonnel()");
            }
        });
    }
}

function roleSetPersonnel() {
    var cbl_s = document.getElementsByName("chickes");
    var checkCount = 0;
    var id = 0;
    for (var i = 0; i < cbl_s.length; i++) {
        if (cbl_s[i].checked) {
            checkCount++;
            id = cbl_s[i].id;
        }
    }
    $("#select2 option").attr("selected", "selected");
    $.ajax({
        type: "POST",
        url: "/roleSetPersonnel",
        data: "em_id=" + $("#select2").val() + "&ucc_id=" + $("#ucc_id").val() + "&ucr_id=" + id,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            clickOrganization();
            swal("人员设置成功!");
            closeDiv();
            $("#importPersonnels").attr("onclick", "importPersonnel()");
        }
    });
}

//删除角色
function deleteRole() {
    var cbl_s = document.getElementsByName("chickes");
    var checkCount = 0;
    var id = 0;
    for (var i = 0; i < cbl_s.length; i++) {
        if (cbl_s[i].checked) {
            checkCount++;
            id = cbl_s[i].id;
        }
    }
    if (checkCount == 0) {
        swal("请选择一个!")
    } else if (checkCount > 1) {
        alert('只能选择一个！');
    } else {
        $.ajax({
            type: "POST",
            url: "/deleteRoleSelectEmployee",
            data: "ucr_id=" + id,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.result != 0) {
                    swal({
                        title: "请先移除该角色人员!",
                        timer: 2000
                    })
                } else {
                    swal({
                            title: "确认删除?",
                            text: "",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "确认",
                            cancelButtonText: "取消",
                            closeOnConfirm: false
                        },
                        function () {
                            $.ajax({
                                type: "POST",
                                url: "/deleteRole",
                                data: "ucr_id=" + id,
                                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                                dataType: "json",
                                success: function (result) {
                                    if (result.result == 1) {
                                        swal("删除成功", "", "success");
                                    } else {
                                        swal("删除失败", "", "error");
                                    }
                                    clickOrganization();
                                }
                            });
                        });
                }
            }
        });
    }
}

//设置角色权限
function setRoleJurisdiction() {
    var cbl_s = document.getElementsByName("chickes");
    var checkCount = 0;
    var id = 0;
    for (var i = 0; i < cbl_s.length; i++) {
        if (cbl_s[i].checked) {
            checkCount++;
            id = cbl_s[i].id;
        }
    }
    if (checkCount == 0) {
        swal("请选择一个!")
    } else if (checkCount > 1) {
        alert('只能选择一个！');
    } else {
        $("#manipulateJurisdiction").html("");
        tcc();
        $("#setTitle").text("设置权限");
        $.ajax({
            type: "POST",
            url: "/selectRoleJurisdiction",
            data: "type=" + "organization" + "&ucr_id=" + id,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            success: function (result) {
                $(".jurisdiction").html("");
                $("#manipulateJurisdiction").append("<form class='form-inline' action='' method='POST' id='updateComJurisdiction'>");
                $.each(result.menuList, function (idx, item) {
                    if (item.pi_id == 0) {
                        $("#updateComJurisdiction").append("<div class='menuJ1' id='menu" + item.ucm_id + "'><div class='checkboxFive'><input type='checkbox' value='" + item.ucm_id + "' id='sd" + item.ucm_id + "' name='ucm_id' /><label onclick='checkAllJurisdiction(this,1);' for='sd" + item.ucm_id + "'></label></div><span style='cursor: pointer' onclick='shrinkSublayer(this);'>" + item.ucm_name + "</span></div>");
                    } else {
                        $("#menu" + item.pi_id).append("<div class='menuJ2 " + item.ucm_code + "' id='menu" + item.ucm_id + "'><div class='checkboxFive'><input type='checkbox' value='" + item.ucm_id + "' id='sd" + item.ucm_id + "' name='ucm_id' /><label onclick='checkAllJurisdiction(this,2);' for='sd" + item.ucm_id + "'></label></div>" + item.ucm_name + "</div>");
                        $("." + item.ucm_code).append("<div class='gnbh'></div>");
                    }
                });
                $.each(result.functionList, function (idx, item) {
                    $("." + item.ucm_code).children(".gnbh").css("height", "40px");
                    $("." + item.ucm_code).children(".gnbh").append("<div class='menuJ3' id='function" + item.ucf_id + "'><div class='checkboxFive'><input type='checkbox' value='" + item.ucf_id + "' id='gn" + item.ucf_id + "' name='ucf_id' /><label onclick='checkSuperiorJurisdiction(this);' for='gn" + item.ucf_id + "'></label></div>" + item.ucf_name + "</div>");
                });
                $.each(result.menuLists, function (idx, item) {
                    $("#menu" + item.ucm_id).children(".checkboxFive").children("input").attr('checked', true);
                });
                $.each(result.functionLists, function (idx, item) {
                    $("#function" + item.ucf_id).children(".checkboxFive").children("input").attr('checked', true);
                });
                $("#updateComJurisdiction").append("<input type='hidden' name='ucr_id' value='" + id + "'></div>");
                $("#manipulateJurisdiction").append("</form");
                $("#jurSubmit").css("display", "block");
                $("#jurSubmitBtn").attr("onclick", "setRoleJurisdictionSubmit();");
            }
        });
    }
}

function setRoleJurisdictionSubmit() {
    $.ajax({
        type: "POST",
        url: "/setRoleJurisdictionSubmit",
        data: $('#updateComJurisdiction').serialize(),
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            swal("修改成功", "", "success");
            closeTc();
            clickOrganization();
        }
    });
}

//用户管理
//切换界面
function clickEmployee() {

    $("#triangle-down").css("marginLeft", "41px");
    $("#jurisdiction").css("display", "none");
    $(".base").css("display", "none");
    $("#organization").css("display", "none");
    $("#employee").css("display", "block");
    selectEmployee();
}

function selectEmployee() {
    closeDiv();
    selectExtended = $.Deferred();
    var sizeCount = 10;
    if ($.cookie('userSize') != null) {
        sizeCount = $.cookie('userSize');
    } else {
        $.cookie("userSize", sizeCount, {expires: 7});
    }
    if ($("#sizeCount input").val() != null) {
        sizeCount = $("#sizeCount input").val();
        $.cookie("userSize", sizeCount, {expires: 7});
    }
    $.ajax({
        type: "POST",
        url: "/user/userList",
        data: "sizeCount=" + sizeCount + "&page=" + $("#Nums").text() + "&txt=" + $("#orderInput").val() + "&status=" + $("#orderType").val(),
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $("#tableContent #tableDatar tbody").html("");
            $("#sizeNumsss").text("");
            $("#nums").text("");
            var html = "";
            $.each(result.userCenterEmployeeTable, function (idx, item) {
                var sex = "男"
                if (item.em_sex != "man") {
                    sex = "女";
                }
                var state = "<font style='color:#1ABC9C'>正常</font>"
                if (item.em_state == 0) {
                    state = "<font style='color:#E74C3C'>离职</font>";
                } else if (item.em_state == 2) {
                    state = "<font style='color:#E74C3C'>申请离职</font>";
                }
                if (item.ucc_short == null) {
                    item.ucc_short = "";
                }
                if (item.ucr_name == null) {
                    item.ucr_name = "";
                }
                $("#tableDatar tbody").append("<tr class='tr' onclick='mousedownTr(this)' id='data_contents'><td><input name='chickes' type='checkbox' id='" + item.em_id + "'/><input name='ucr_ids' type='hidden' value='" + item.ucr_id + "'/></td><td>" + (idx + 1) + "</td><td><a href='javascript:;' onclick='hrefClick(this)' data-type='/user/userUpdate?id=" + item.em_id + "'>" + item.em_account + "</a></td><td>" + item.em_name + "(" + item.em_phone + ")</td><td>" + item.ucc_short + "</td><td>" + item.ucr_name + "</td><td>" + state + "</td><td>" + sex + "</td></tr>");
            });
            $("#sizeNumsss").text(result.pages.page);
            $("#numsss").text(result.pages.size);
            selectExtended.resolve();
        }
    });

    $.when(selectExtended).done(function () {
        pages();

        hide_table();
    });
}

/*=======================================用户管理页面分页==============================================*/

//判断页数
function pages() {
    //开始的页数样式
    if ($("#sizeNumsss").text() <= 5) {
        $(".paginList").html("<li class='paginItem'><a href='javascript:ups();'><span class='pagepre' id='up'></span></a></li>");
        for (var i = 1; i <= $("#sizeNumsss").text(); i++) {
            if (i == $("#Nums").text()) {
                $(".paginList").append("<li id='paginLists_" + i + "' class='paginItem current'><a href='javascript:lis(" + i + ");'>" + i + "</a></li>");
            } else {
                $(".paginList").append("<li id='paginLists_" + i + "' class='paginItem'><a href='javascript:lis(" + i + ");'>" + i + "</a></li>");
            }
        }
        $(".paginList").append("<li class='paginItem'><a href='javascript:downs();'><span class='pagenxt' id='down'></span></a></li>");
    } else {
        if ($("#Nums").text() <= 5) {
            $(".paginList").html("<li class='paginItem'><a href='javascript:ups();'><span class='pagepre' id='up'></span></a></li>");
            for (var i = 1; i <= 5; i++) {
                if (i == $("#Nums").text()) {
                    $(".paginList").append("<li id='paginLists_" + i + "' class='paginItem current'><a href='javascript:lis(" + i + ");'>" + i + "</a></li>");
                } else {
                    $(".paginList").append("<li id='paginLists_" + i + "' class='paginItem'><a href='javascript:lis(" + i + ");'>" + i + "</a></li>");
                }
            }
            $(".paginList").append("<li class='paginItem'><a href='javascript:downs();'><span class='pagenxt' id='down'></span></a></li>");
        }
    }
    //end

    //样式变化

    $("#paginLists_" + $("#Nums").text() + "").attr("class", "paginItem current");
    //end
    //判断最后一页和第一页的样式
    if ($("#Nums").text() == $("#sizeNumsss").text() && $("#sizeNumsss").text() != "1") {
        $(".paginItem span[id=down]").css("background", "url(/resources/image/next_1.gif) no-repeat center center");
        $(".paginItem span[id=up]").css("background", "url(/resources/image/pre.gif) no-repeat center center");
    } else if ($("#Nums").text() == "1" && $("#sizeNumsss").text() != "1") {
        $(".paginItem span[id=down]").css("background", "url(/resources/image/next.gif) no-repeat center center");
        $(".paginItem span[id=up]").css("background", "url(/resources/image/pre_1.gif) no-repeat center center");
    } else if ($("#Nums").text() == "1" && $("#sizeNumsss").text() == "1") {
        $(".paginItem span[id=down]").css("background", "url(/resources/image/next_1.gif) no-repeat center center");
        $(".paginItem span[id=up]").css("background", "url(/resources/image/pre_1.gif) no-repeat center center");
    } else if ($("#Nums").text() != "1" && $("#Nums").text() != $("#sizeNumsss").text()) {
        $(".paginItem span[id=down]").css("background", "url(/resources/image/next.gif) no-repeat center center");
        $(".paginItem span[id=up]").css("background", "url(/resources/image/pre.gif) no-repeat center center");
    }
    //end

    //间隔变色
    $('.tablelist tbody tr:odd').addClass('odd');
}

/*点击LI分页读取数据*/
function lis(id) {

    $("#Nums").text(id);
    $("#paginLists_" + id + " a").attr("class", "paginItem");
    selectEmployee();
}

function ups() {
    // 获取当前页数
    var pageMum = parseInt($("#Nums").text());
    //最大页数
    var pageSize = parseInt($("#sizeNumsss").text());
    if (pageMum > 1) {
        if ((pageMum - 1) % 5 == 0) {
            $(".paginList").html("<li class='paginItem'><a href='javascript:ups();'><span class='pagepre' id='up'></span></a></li>");
            for (var i = 5; i > 0; i--) {
                if (i == $("#Nums").text()) {
                    $(".paginList").append("<li id='paginLists_" + (pageMum - i) + "' class='paginItem current'><a href='javascript:lis(" + (pageMum - i) + ");'>" + (pageMum - i) + "</a></li>");
                } else {
                    $(".paginList").append("<li id='paginLists_" + (pageMum - i) + "' class='paginItem'><a href='javascript:lis(" + (pageMum - i) + ");'>" + (pageMum - i) + "</a></li>");
                }
            }
            $(".paginList").append("<li class='paginItem'><a href='javascript:downs();'><span class='pagenxt' id='down'></span></a></li>");
        }
        $("#Nums").text(pageMum - 1);
        selectEmployee();
    }
}

function downs() {
    // 获取当前页数
    var pageMum = parseInt($("#Nums").text());
    //最大页数
    var pageSize = parseInt($("#sizeNumsss").text());
    if (pageMum < pageSize) {
        if ((pageMum + 5) < pageSize) {
            if (pageMum % 5 == 0) {

                $(".paginList").html("<li class='paginItem'><a href='javascript:ups();'><span class='pagepre' id='up'></span></a></li>");
                for (var i = 1; i <= 5; i++) {
                    $(".paginList").append("<li id='paginLists_" + (pageMum + i) + "' class='paginItem'><a href='javascript:lis(" + (pageMum + i) + ");'>" + (pageMum + i) + "</a></li>");
                }
                $(".paginList").append("<li class='paginItem'><a href='javascript:downs();'><span class='pagenxt' id='down'></span></a></li>");
            }
            $("#Nums").text(pageMum + 1);
            selectEmployee();
        } else {
            if (pageMum % 5 == 0) {
                $(".paginList").html("<li class='paginItem'><a href='javascript:ups();'><span class='pagepre' id='up'></span></a></li>");
                for (var i = 4; i >= 0; i--) {
                    $(".paginList").append("<li id='paginLists_" + (pageSize - i) + "' class='paginItem'><a href='javascript:lis(" + (pageSize - i) + ");'>" + (pageSize - i) + "</a></li>");
                }
                $(".paginList").append("<li class='paginItem'><a href='javascript:downs();'><span class='pagenxt' id='down'></span></a></li>");
            }
            $("#Nums").text(pageMum + 1);
            selectEmployee();
        }
    }
}

function selectJurCom() {
    $("#manipulateJurisdiction").html("");
    $("#setTitle").text("设置权限");
    tcc();
    $.ajax({
        type: "POST",
        url: "/selectAllJurisdiction",
        data: "type=" + "organization" + "&ucc_id=" + $("#ucc_id").val(),
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $(".jurisdiction").html("");
            $("#manipulateJurisdiction").append("<form class='form-inline' action='' method='POST' id='updateJurisdiction'><input type='hidden' name='ucc_id' value='" + $("#ucc_id").val() + "' id='idser'>");
            $.each(result.menuList, function (idx, item) {
                if (item.pi_id == 0) {
                    $("#updateJurisdiction").append("<div class='menuJ1' id='menu" + item.ucm_id + "'><div class='checkboxFive'><input type='checkbox' value='" + item.ucm_id + "' id='sd" + item.ucm_id + "' name='ucm_id' /><label onclick='checkAllJurisdiction(this,1);' for='sd" + item.ucm_id + "'></label></div><span style='cursor: pointer' onclick='shrinkSublayer(this);'>" + item.ucm_name + "</span></div>");
                } else {
                    $("#menu" + item.pi_id).append("<div class='menuJ2 " + item.ucm_code + "' id='menu" + item.ucm_id + "'><div class='checkboxFive'><input type='checkbox' value='" + item.ucm_id + "' id='sd" + item.ucm_id + "' name='ucm_id' /><label onclick='checkAllJurisdiction(this,2);' for='sd" + item.ucm_id + "'></label></div>" + item.ucm_name + "</div>");
                    $("." + item.ucm_code).append("<div class='gnbh'></div>");
                }
            });
            $.each(result.functionList, function (idx, item) {
                $("." + item.ucm_code).children(".gnbh").css("height", "40px");
                $("." + item.ucm_code).children(".gnbh").append("<div class='menuJ3' id='function" + item.ucf_id + "'><div class='checkboxFive'><input type='checkbox' value='" + item.ucf_id + "' id='gn" + item.ucf_id + "' name='ucf_id' /><label onclick='checkSuperiorJurisdiction(this);' for='gn" + item.ucf_id + "'></label></div>" + item.ucf_name + "</div>");
            });
            $.each(result.menuLists, function (idx, item) {
                $("#menu" + item.ucm_id).children(".checkboxFive").children("input").attr('checked', true);
            });
            $.each(result.functionLists, function (idx, item) {
                $("#function" + item.ucf_id).children(".checkboxFive").children("input").attr('checked', true);
            });
            $("#manipulateJurisdiction").append("</form");
            $("#jurSubmit").css("display", "block");
            $("#jurSubmitBtn").attr("onclick", "updateJurisdiction();");
        }
    });
}

function updateUserCenterMenu(obj) {
    $.ajax({
        type: "POST",
        url: "/updateUserCenterMenuOrderNum",
        data: "ucm_id=" + ucm_id + "&pi_id=" + pid + "&order_num=" + order + "&type=" + obj,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.massage = "success") {

                switchJurisdiction(0);
            }
        }
    });

}










