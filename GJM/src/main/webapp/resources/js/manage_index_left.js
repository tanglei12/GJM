// JavaScript Document
var selectContractList = null;

$(function () {
    selectContractList = $.Deferred();
    $.ajax({
        type: "POST",
        url: "/user/leftItem",
        data: [],
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = "";
            $(".leftContent").html("");
            if (result != null) {
                $.each(result.menuLists, function (idx, item) {
                    var bool = true;
                    if (item.ucps_pid == 0) {
                        $(".leftContent")
                        .append(
                            "<dd id='"
                            + item.ucps_id
                            + "'><div class='left_title'><span style='color:#efefef;font-size: 18px;' class='icon-image'><i class='"
                            + item.ucps_icon
                            + "'></i></span><span class='font_title'>"
                            + item.ucps_name
                            + "</span><span class='nav-Phoneover-title'>"
                            + item.ucps_name
                            + "</span><span class='fa arrow'></span></div><ul class='menuson'></ul></dd>");
                    }
                });
                $.each(result.menuLists, function (idx, item) {
                    if (item.ucps_pid != 0) {
                        $("#" + item.ucps_pid)
                        .children("ul")
                        .append(
                            "<li><a href='javascript:;' onclick='hrefIframe(this)' data-herf='"
                            + item.ucps_url
                            + "'>"
                            + item.ucps_name
                            + "</a></li>");
                    }
                });
            }
            $('.left_title').each(function (i) {
                var len = $(this).next("ul").children("li").length;
                $(this).next("ul").height((len * 40));
            });
            selectContractList.resolve();
        }
    });

    $.when(selectContractList).done(function () {
        // 判断左边导航菜单隐藏还是显示
        if ($.cookie('leftOperation') != null && $.cookie('leftOperation') != "null") {
            if ($.cookie('leftOperation') == "hide") {
                $("#left").width(17);
                $("#left .font_title").hide();
                $("#left .menuson").hide();
                $("#left .fa").hide();
                $('.left_title').attr("class", "left_title");
                $(".leftContent .menuson").attr("class",
                    "menuson phoneMenuson");
                $(".topleft .logoImage").hide();
            } else {
                $("#left").width(250);
            }
        }

        // 导航切换
        $(".menuson li").click(function () {
            $(".menuson li.active").removeClass("active");
            $(this).addClass("active");
        });

        $('.left_title').click(function () {
            if ($("#left").width() != 46) {
                $('.left_title').attr("class",
                    "left_title ");
                $('.left_title').find(".fa").attr(
                    "class", "fa arrow");
                $(this).attr("class",
                    "left_title nav-hover");
                var $ul = $(this).next('ul');
                var num = 0;
                $(this).next('ul').find("li").each(
                    function (i) {
                        num++;
                    });
                $(this).next('ul').height(num * 40);
                if ((num * 30 + 180) > ($(window)
                    .height() - 88)) {
                    $("#left").height(num * 40 + 180);
                } else {
                    $("#left").height(
                        $(window).height() - 88);
                }
                $('dd').find('ul').slideUp();
                if ($ul.is(':visible')) {
                    var ids = this;
                    $(this).next('ul').slideUp(
                        function () {
                            $('.left_title').attr(
                                "class",
                                "left_title");
                        });
                    $(this).find(".fors").attr("class",
                        "fa arrow");
                    $("#left").height(
                        $(window).height() - 88);
                } else {
                    $(this).next('ul').slideDown();
                    $(this).find(".arrow").attr(
                        "class", "fa fors");
                }
            }
        });

        // 缩小导航
        $(".menus").click(function () {
            if ($("#left").width() != 46) {
                $("#left").width(17);
                $("#left .font_title").hide();
                $("#left .menuson").hide();
                $("#left .fa").hide();
                $('.left_title').attr("class",
                    "left_title");
                $(".leftContent .menuson")
                .attr("class",
                    "menuson phoneMenuson");
                $(".topleft .logoImage").hide();
                titleLeftOperation();
            } else {
                $("#left").width(250);
                $("#left .font_title")
                .slideToggle("slow");
                $("#left .fa").slideToggle(
                    "slow");
                $(".topleft .logoImage")
                .slideToggle("slow");
                $(".leftContent .menuson")
                .attr("class",
                    "menuson");
                $('.left_title').find(".fa")
                .attr("class",
                    "fa arrow");
                titleLeftOperation();
            }
        });

        // 导航条颜色
        $(".left_title").hover(function () {
                if ($("#left").width() != 46) {
                    $(this)
                    .attr("class",
                        "left_title navPC-hover");
                    $(this).find("span").css(
                        "color", "#FFF");
                } else {
                    $(this)
                    .attr("class",
                        "left_title navPhone-hover");
                    $(this).find("span").css(
                        "color", "#424F63");
                    $(".nav-Phoneover-title").css(
                        "color", "#FFF");
                    $(this).next(".menuson").show();
                    $(this).find(
                        ".nav-Phoneover-title")
                    .show();
                }
            },
            function () {
                $('.left_title').attr("class",
                    "left_title");
                $(this).find("span").css("color",
                    "#efefef");
                $(".nav-Phoneover-title").hide();
                $(".left_title")
                .each(
                    function () {
                        if ($("#left")
                            .width() != 46) {
                            if ($(this)
                                .find(
                                    ".fa")
                                .attr(
                                    "class") == "fa fors") {
                                $(this)
                                .attr(
                                    "class",
                                    "left_title nav-hover");
                            }
                        }
                    });
                if ($("#left").width() == 46) {
                    $("#left").find(".menuson")
                    .hide();
                }
            });

        $("#left").find(".menuson").hover(
            function () {
                if ($("#left").width() == 46) {
                    $(this).prev().find(
                        ".nav-Phoneover-title").show();
                    $(this).show();
                    $(this).prev().attr("class",
                        "left_title navPhone-hover");
                    $(this).prev().find("span").css(
                        "color", "#424F63");
                    $(".nav-Phoneover-title").css("color",
                        "#FFF");
                }
            },
            function () {
                if ($("#left").width() == 46) {
                    $(this).prev().find(
                        ".nav-Phoneover-title").hide();
                    $(this).hide();
                    $(this).prev().attr("class",
                        "left_title");
                    $(this).prev().find("span").css(
                        "color", "#efefef");
                }
            });

        // 第一个赋予样式 并读取数据
        /*
         * $(".leftContent dd").each(function(i){ if(i == 0){
         * $(this).find("ul li").each(function(indx){ if(indx ==
         * 0){ $(this).attr("class","active");
         * hrefIframe($(this).find("a")); } }); } });
         */

    });
});

/**
 * 左边导航菜单操作cookie
 */
function titleLeftOperation() {
    if ($("#left").width() == 46) {
        $.cookie('leftOperation', "hide");
    } else {
        $.cookie('leftOperation', "show");
    }
}

/**
 *
 * 框架跳转
 *
 * @param ids
 */
function hrefIframe(ids) {
    // 判断用户是否登录
    if (!getCookie("em_id")) {
        if (confirm("账户缓存已清除，是否重新登陆？"))
            window.location.reload();
        return;
    }
    var title = $(ids).text();
    if (title.length > 4) {
        title = title.substring(0, 4);
    }
    href_mo($(ids).attr("data-herf"), title, "", "", $(ids).attr("data-name"));
}

/**
 * 获取cookie
 * @param name
 * @returns
 */
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}
