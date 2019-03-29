<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE>
<html>
<head>
    <title>增加公寓</title>
</head>
<link href="/resources/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
<link href="/resources/css/manage_index.css" rel="stylesheet" type="text/css">
<!-- 时间控件 -->
<script src="/resources/common/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript" src="/resources/js/jquery-1.7.2.min.js"></script>
<!-- jBox -->
<link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">
<script charset="utf-8" src="<%= request.getContextPath()%>/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
<script charset="utf-8" src="<%= request.getContextPath()%>/resources/Plug-in/jbox-v2.3/jBox/i18n/jquery.jBox-zh-CN.js"></script>
<style>
    .place {
        height: 2px;
        background: #3eafe0;
        position: fixed;
        width: 100%;
        margin-top: -30px;
    }
    .dfs {
        width: 90%;
        min-width: 1080px;
        padding: 5px 30px;
        margin: 50px;
        background: #fff;
        border: 4px solid #ebcbbe;
    }
    .titles {
        display: block;
        width: 150px;
        height: 30px;
        position: relative;
        color: #333;
        top: -30px;
        font-size: 22px;
        text-align: center;
        background: white;
    }
    td {
        padding-left: 40px;
        padding-top: 20px;
    }
    .jianju {
        margin-left: 12px;
    }
    .jianjus {
        margin-left: 24px;
    }
    .jianjuss {
        margin-left: 36px;
    }
    .jianjusss {
        margin-left: 48px;
    }
    input[type="text"] {
        width: 179px;
        height: 34px;
        border-radius: 4px;
        border: 1px solid #ccc;
        text-indent: 5px;
    }
    .type-label {
        position: relative;
        top: 1px;
        border: 2px solid #ccc;
        color: #888;
        padding: 4px 18px;
        font-size: 14px;
        display: block;
        float: left;
        margin-right: 14px;
        cursor: pointer;
        -moz-border-radius: 4px;
        -webkit-border-radius: 4px;
        border-radius: 4px;
        float: left;
    }
    .span-checked { border: 2px solid #1ABC9C; color: #1ABC9C; }
    .span-checked i {
        position: absolute;
        right: 1px;
        bottom: 1px;
        width: 14px;
        height: 14px;
        background-image: url("/resources/image/true.png");
        background-repeat: no-repeat;
    }
    .delete {
        position: absolute;
        left: -6px;
        top: -6px;
        bottom: 1px;
        font-size: 16px;
        width: 12px;
        height: 12px;
        color: #666;
    }
    .type-label input[type="checkbox"] { display: none; height: 0; opacity: 0; }
    .btn-info {
        color: #fff;
        background-color: #5bc0de;
        border-color: #46b8da;
    }
    .btn {
        display: inline-block;
        padding: 6px 12px;
        margin-bottom: 0;
        font-size: 14px;
        font-weight: 400;
        line-height: 1.42857143;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        -ms-touch-action: manipulation;
        touch-action: manipulation;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        background-image: none;
        border: 1px solid transparent;
        border-radius: 4px;
    }
    .down {
        margin-left: -30px;
        padding-bottom: 20px;
        width: 0;
        height: 0;
        border-top: 6px solid #3E97C9;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
    }
    /** 绱㈠紩鎴垮眿缂栫爜*/
    #queryList {
        position: absolute;
        top: 40px;
        left: 0;
        height: auto;
        clear: both;
        display: none;
        min-width: 424px;
        border: 1px solid #dddddd; /* #CAE2F0; */
        background-color: #fff;
        z-index: 99;
        -moz-box-shadow: 0px 0px 13px #BFBFBF;
        -webkit-box-shadow: 0px 0px 13px #BFBFBF;
        box-shadow: 0px 0px 13px #BFBFBF;
    }
    #search-box input[type="text"] {
        width: 100%;
        height: 34px;
        border-bottom: 1px solid #ddd;
        text-indent: 10px;
        outline: none;
        background-color: #f8f8f8;
    }
    #search-show {
        min-height: 34px;
    }
    .search-tisp {
        color: #666;
        line-height: 34px;
        text-indent: 10px;
    }
    .form-control[disabled], .form-control[readonly] { background-color: #f7f7f7; opacity: 1; }
    .form-control[readonly].vaildbox { background-color: #EEF7FB; }
    #queryList table { width: 100%; }
    #queryList table tr { border-bottom: 1px solid #e6e6e6; }
    #queryList table tr:HOVER, tr.item-hover { background-color: #e1eff7; cursor: pointer; }
    #queryList table tr td {
        overflow: hidden;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
        white-space: nowrap;
        padding: 0 10px;
        height: 34px;
        text-align: left;
    }
    /***/
</style>
<script>
    $(function () {
        search();
        $(":checkbox").click(function () {
            if ($(this).attr("name") != 'recommendGroup_Id') {
                if ($(this).attr("checked") != 'true') {
                    var name = $(this).attr("name");
                    $(this).siblings(":checkbox[name='" + name + "']").attr("checked", false);
                    $(this).attr("checked", true);
                }
                if ($(this).attr("checked") == 'checked') {
                    $("input:checkbox[name='propertyInfo_Id']").each(function (i) {
                        $(this).attr("checked", false);
                    });
                    $(this).attr("checked", true);
                }
            }
        });
    });

    function changeType(obj) {
        if ($(obj).find("input").is(":checked")) {
            $(obj).removeClass("span-checked");
            $(obj).find("input").attr("checked", false);
        } else {
            $(obj).addClass("span-checked");
            $(obj).find("input").attr("checked", true);
        }
    }

    function addCost() {
        $("#cost").after("<tr><td style='padding-left: 20px;'>费用<select class='form-control jianjuss' style='width: 150px;' name='PropertyInfo_ManaStyle'><option value='开放式'>租金</option><option value='半开放式'>押金</option><option value='封闭的'>服务费</option><option value='封闭的'>定金</option></select><span class='jianjusss'>金额</span><input type='text' style='width: 100px;' class='form-control jianju' name='' ><span class='jianjuss' onclick='deleteCost(this)'><i class='glyphicon glyphicon-trash'></i>&nbsp;<a href='javascript:deleteCost(this);'>删除</a></span></td></tr>");
    }

    function deleteCost(obj) {
        $(obj).parent().parent().remove();
    }

    /** 搜索列表*/
    function search() {

        // 外部常量
        var $source = $('#conhouseno');
        var $dataValue = $("#conid").attr("data-value");
        // 内部常量
        var $queryList = $("#queryList");
        var $parent = $("#queryList");
        var $show = $("#search-show");
        var $box = $("#search-box");
        var $input = $("#search-box input");
        var $item = $('#search-show .search-item');
        var $tips = '<div class="search-tisp">没有数据</div>';

        $input.bind("input propertychange", function () {
            $.ajax({
                type: "POST",
                url: "/propertyInfo/fuzzySelectPro",
                data: {
                    param: $input.val(),
                    type: $dataValue
                },
                dataType: "json"
            }).done(function (result) {
                if (result.userCenterPropertyInfoList != null) {
                    var content = '';
                    $.each(result.userCenterPropertyInfoList, function (index, data) {
                        content +=
                            '<tr class="search-item" onclick="new search().setToInput(this)">' +
                            '<td title="房屋编码">' + data.propertyInfo_Name + '</td>' +
                            '<td title="房东姓名">' + data.propertyInfo_Id + '</td>' +
                            '<td title="房屋产权地址">' + data.propertyInfo_address + '</td>' +
                            '</tr>';
                    });
                    $show.html('<table><body>' + content + '</body></table>');
                } else {
                    $show.html('<div class="search-tisp">' + result.msg + '</div>');
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
                    $("#propertyInfo_Id").val($td.eq(1).text());
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
            $("#propertyInfo_Id").val($objChildren.eq(1).text());
            $source.data("data", $objChildren.eq(0).text());
            $source.change();
            close();
        }
        /** 关闭搜索框 */
        var close = function () {
            $input.val("");
            $show.empty().html($tips);
            $queryList.hide();
        }

//	$parent.bind("click",function(e){stopPropagation(e); });
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

    function addVer() {
        var html = "<div style='padding:10px;'>输入公寓类型：<input type='text' id='ver' name='ver' /></div>";
        var submit = function (v, h, f) {
            var i = 0
            $(".ver-radio").each(function () {
                if ($(this).val() == f.ver) {
                    i = 1;
                }
            });

            if (i == 0) {
                if (f.ver != null && f.ver != '') {
                    $("#addVer").before("<label class='type-label' onclick='changeTypeVer(this)' for='type7'><span class='glyphicon glyphicon-remove-circle delete' onclick='deleteType(this);'></span>" + f.ver + "<i></i> <input type='checkbox' checked='' class='ver-radio' name='hi_version' value='" + f.ver + "'></label>");
                    addBrandType(f.ver);
                }
                return true;
            } else {
                $.jBox.tip("已有公寓类型");
                return false;
            }
        };

        $.jBox(html, {title: "公寓类型", submit: submit});
    }

    function deleteType(obj) {
        $(obj).parent().remove();
    }

    function changeTypeVer(obj) {
        $(".ver-radio").each(function () {
            $(".ver-radio").parent().removeClass("span-checked");
            $(".ver-radio").removeAttr("checked");
        });
        $(obj).addClass("span-checked");
        $(obj).find("input").attr("checked", true);
    }

    function addBrandType(str) {
        $.ajax({
            type: "POST",
            url: "/houseHouseBrand/addBrandType",
            data: "str=" + str,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {

            }
        });
    }


</script>
<body style="background: #F5F5F5;">
<!-- <div style="margin-top: 30px;margin-left: 50px;">
    <ul>
        <li style="float:left;line-height:44px;text-align:center; width:100px;height:44px; background-color: #3E97C9;color:#fff;" onclick="changeType1()">收入流水<i class="down"></i></li>
        <li style="float:left;line-height:44px;text-align:center; width:100px;height:44px; background-color: #fff;color:#000;" onclick="changeType2()">支出流水<i class="down"></i></li>
    </ul>
</div> -->
<form class="form-inline" id="addSubmit" action="/houseLibrary/addApartment" method="POST" style="margin-top: 30px;">
    <input type="hidden" name="token" value="${token}">
    <div style="margin-left: 5%;background: #fff;width: 90%;">
        <div style="color:#4799E6;font-size: 18px;padding-top: 20px;margin-left: 30px; ">添加公寓</div>
        <hr>
        <table border="0" style="margin-bottom: 40px;margin-left: 10px;">
            <tr>
                <td class="main-box-list" style="padding-left: 20px;position: relative;">所属物业
                    <input type="text" class="form-control vaildbox data-change1 jianju" name='conhouseno' id="conhouseno" placeholder="所属物业" readonly="readonly" required="required" style="width: 400px;">
                    <span class="error-tisp"></span>
                    <div id="queryList" style="margin-left: 82px; margin-top: 16px;">
                        <div id="search-box"><input type="text" placeholder="输入物业地址"></div>
                        <div id="search-show">
                            <div class="search-tisp">没有数据</div>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <td colspan="4" style="padding-left: 20px;" id="versions">
                    <span style="float: left;margin-right: 12px;">公寓类型</span>
                    <!-- <c:forEach items="${versions}" var="version">
			    		<div class='type-label' onclick='changeTypeVer(this)' for='type7'>${version}<i></i> <input type='checkbox' class='ver-radio' checked='' name='hi_version' value='${version}'></div>
			    	</c:forEach>
			    	<div class="type-label" style="display: none;" onclick="addVer();" id="addVer">
						+<i></i> 
					</div> -->
                </td>
            </tr>
            <tr>
                <td style="padding-left: 20px;">房号<input type="text" onblur="selectHouseNum();" class="form-control jianjuss" name="hi_address" placeholder="房号" data-validation-engine="validate[required]"></td>
            </tr>
        </table>
        <hr>
        <table border="0">
            <tr>
                <td style="padding-left: 20px;">产权人<input type="text" class="form-control jianjus" name="he_peopleName" placeholder="产权人" data-validation-engine="validate[required]"></td>
                <td>购买价格<input type="text" onkeyup="this.value=this.value.replace(/^[a-z\u4E00-\u9FA5]+$/,'')" class="form-control jianju" name="he_money" placeholder="房屋购买价格" data-validation-engine="validate[required]"><span class="jianju">万元</span></td>
                <td>房东电话<input type="text" data-validation-engine="validate[required,custom[phone],maxSize[11],minSize[11]]" class="form-control jianju" name="he_phone" placeholder="房屋房东电话"></td>
            </tr>
            <tr>
                <td style="padding-left: 20px;">产权编号<input type="text" onkeyup="this.value=this.value.replace(/[^A-Za-z0-9]+$/,'')" class="form-control jianju" name="he_number" placeholder="如:" data-validation-engine="validate[required]"></td>
                <td>产权证号<input type="text" onkeyup="this.value=this.value.replace(/[^A-Za-z0-9]+$/,'')" class="form-control jianju" name="he_cardNumber" placeholder="如:" data-validation-engine="validate[required]"></td>
                <td>购买时间<input type="text" data-validation-engine="validate[required]" class="form-control jianju" readonly="readonly" onclick="WdatePicker({startDate:'%y-%M-%d %h:%m:%s',dateFmt:'yyyy-MM-dd HH:mm:ss',alwaysUseStartDate:true})" name="buyTime" placeholder="点击获取房屋购买时间"></td>
            </tr>
            <tr>
                <td style="padding-left: 20px;">房东住址<input type="text" data-validation-engine="validate[required]" class="form-control jianju" name="he_address" placeholder="房东地址"></td>
                <td style="padding-left: 20px;display: none;">房东住址<input type="text" id="propertyInfo_Id" name="propertyInfo_Id"></td>
            </tr>
            <tr>
                <td colspan="3" style="padding-left: 20px;">房屋用途<input type="checkbox" style="margin-left: 20px;" name="he_nature" value="住宅" checked="checked">住宅<input type="checkbox" value="商住" style="margin-left: 20px;" name="he_nature">商住<input type="checkbox" value="商业"
                                                                                                                                                                                                                                                         style="margin-left: 20px;" name="he_nature">商业
                </td>
            </tr>
        </table>
        <hr>
        <div style="margin-left: 30px;">
            <input id="addSub" class="btn btn-info" style="width:70px;margin-bottom: 30px;" onclick="addSubmit();" type="button" value="提交">
        </div>
    </div>
</form>
<script type="text/javascript">
    function addSubmit() {
        var he_peopleName = $("input[name='he_peopleName']").val();
        var he_phone = $("input[name='he_phone']").val();
        var hi_address = $("input[name='hi_address']").val();
        var conhouseno = $("#conhouseno").val();
        var hi_version = "";
        $('input[name="hi_version"]:checked').each(function () {
            hi_version = ($(this).val());
        });

        if (he_peopleName == "" || he_phone == "" || conhouseno == "" || hi_version == "" || hi_address == "") {
            $.jBox.tip('请完善必填信息');
        } else {
            $("#addSubmit").submit();
        }
    }

    function selectType() {
        $.ajax({
            type: "POST",
            url: "/houseLibrary/selectType",
            data: "hi_id=" + 1,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {
                $.each(result.versions, function (idx, version) {
                    $("#versions").append("<div class='type-label' onclick='changeTypeVer(this)' for='type7'>" + version + "<i></i> <input type='checkbox' class='ver-radio' checked='' name='hi_version' value='" + version + "'></div>");
                });
            }
        });
    }

    selectType();
    var succ = '${success}';
    if (succ == 'success') {
        var submit = function (v, h, f) {
            if (v == 'ok')
                jBox.tip("请添加", 'info');
            else if (v == 'cancel')
                window.location.href = '/houseLibrary/houseLibrary';
            return true; //close
        };

        $.jBox.confirm("是否继续添加公寓？", "提示", submit);
    }

    function selectHouseNum() {
        var hi_address = $("input[name='hi_address']").val();
        var propertyInfo_Id = $("input[name='propertyInfo_Id']").val();
        if (propertyInfo_Id == null || propertyInfo_Id == "") {
            alert("请先选择物业");
            $("input[name='hi_address']").val("");
        } else {
            $.ajax({
                type: "POST",
                url: "/houseLibrary/selectHouseNum",
                data: "hi_address=" + hi_address + "&propertyInfo_Id=" + propertyInfo_Id,
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                dataType: "json",
                async: false,
                success: function (result) {
                    if (result.result == 0) {
                        alert("该公寓已经添加");
                        $("#addSub").attr("disabled", "disabled");
                    } else {
                        $("#addSub").removeAttr("disabled");
                    }
                }
            });
        }
    }
</script>
</body>
