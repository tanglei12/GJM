<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <title>添加流水</title>
</head>
<link href="/resources/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
<link href="/resources/css/manage_index.css" rel="stylesheet" type="text/css">
<link href="/resources/css/print.css" rel="stylesheet" type="text/css">
<link href="/resources/css/ProjectManagement.css" rel="stylesheet" type="text/css">
<link href="/resources/css/perfect-scrollbar.css" rel="stylesheet" type="text/css">
<link href="/resources/css/select_xs.css" rel="stylesheet" type="text/css">
<!-- 时间控件 -->
<script src="/resources/Plug-in/My97DatePicker4.7.2/WdatePicker.js"></script>
</head>
<script type="text/javascript" src="/resources/js/jquery-1.7.2.min.js"></script>
<script src="/resources/common/uploadify/js/jquery.uploadify.js"></script><!-- 文件上传插件 -->
<style>
    .place {
        height: 2px;
        background: #3eafe0;
        position: fixed;
        width: 100%;
        margin-top: -50px;
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
        var $parent = $("#queryList");
        var $show = $("#search-show");
        var $box = $("#search-box");
        var $input = $("#search-box input");
        var $item = $('#search-show .search-item');
        var $tips = '<div class="search-tisp">没有数据</div>';

        $input.bind("input propertychange", function () {
            $.ajax({
                type: "POST",
                url: "/lineWaterHouse",
                data: {
                    param: $input.val(),
                    type: $dataValue
                },
                dataType: "json"
            }).done(function (result) {
                if (result.code == 200) {
                    var content = '';
                    $.each(result.data, function (index, data) {
                        content +=
                            '<tr class="search-item" onclick="new search().setToInput(this)">' +
                            '<td title="房屋编码">' + data.hi_code + '</td>' +
                            '<td title="房东姓名">' + data.hi_peopleName + '</td>' +
                            '<td title="房屋产权地址">' + data.hi_address + '</td>' +
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
                    $source.val($td.eq(2).text());
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
            $source.val($objChildren.eq(2).text());
            $source.data("data", $objChildren.eq(0).text());
            $source.change();
            close();
        }
        /** 关闭搜索框 */
        var close = function () {
            $input.val("");
            $show.empty().html($tips);
            $parent.hide();
        }

//	$parent.bind("click",function(e){stopPropagation(e); });
        $source.bind("click", function (e) {
            stopPropagation(e);
        });

        $(document).bind("click", function () {
            close();
        })
        $source.focus(function () {
            $parent.show();
            $input.focus();
        });

        var stopPropagation = function (e) {//把事件对象传入
            if (e.stopPropagation) { //支持W3C标准
                e.stopPropagation();
            } else { //IE8及以下浏览器
                e.cancelBubble = true;
            }
        }
    }
</script>
<body style="background: #F5F5F5;">

<!-- <div style="margin-top: 30px;margin-left: 50px;">
    <ul>
        <li style="float:left;line-height:44px;text-align:center; width:100px;height:44px; background-color: #3E97C9;color:#fff;" onclick="changeType1()">收入流水<i class="down"></i></li>
        <li style="float:left;line-height:44px;text-align:center; width:100px;height:44px; background-color: #fff;color:#000;" onclick="changeType2()">支出流水<i class="down"></i></li>
    </ul>
</div> -->
<form class="form-inline" id="addProfit" action="" style="margin-top: 30px;">
    <div style="margin-left: 5%;background: #fff;width: 90%;">
        <div style="color:#4799E6;font-size: 18px;padding-top: 20px;margin-left: 30px; ">添加收益流水</div>
        <hr>
        <table border="0" style="margin-bottom: 40px;margin-left: 10px;">
            <tr>
                <td class="main-box-list" style="padding-left: 20px;position: relative;">所属房屋
                    <input type="text" class="form-control vaildbox data-change1 jianju" id="conhouseno" placeholder="所属房屋" readonly="readonly" required="required" style="width: 400px;">
                    <span class="error-tisp"></span>
                    <div id="queryList" style="margin-left: 82px; margin-top: 16px;">
                        <div id="search-box"><input type="text" placeholder="输入租客姓名、租客联系方式"></div>
                        <div id="search-show">
                            <div class="search-tisp">没有数据</div>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="check-box">
                        <label class="type-label" onclick="changeType(this)" for="type3">
                            非房屋产生流水<i></i>
                            <input type="checkbox" class="type-radio" name="perimeter" value="非房屋产生流水" id="type3">
                        </label>
                    </div>
                </td>
            </tr>
            <tr id="cost">
                <td style="padding-left: 20px;">
                    费用
                    <select class="form-control jianjuss" style="width: 150px;" name="PropertyInfo_ManaStyle">
                        <option value="开放式">租金</option>
                        <option value="半开放式">押金</option>
                        <option value="封闭的">服务费</option>
                        <option value="封闭的">定金</option>
                    </select>
                    <span class="jianjuss">金额</span>
                    <input type="text" style="width: 100px;" class="form-control jianju" name="">

                </td>
            </tr>
            <tr>
                <td style="padding-left: 20px;">
                    <i class="glyphicon glyphicon-plus-sign"></i>
                    <a href="javascript:addCost();">添加费用</a>
                </td>
            </tr>
            <tr>
                <td style="padding-left: 20px;">交易时间<input type="text" class="form-control jianju" readonly="readonly" onclick="WdatePicker({startDate:'%y-%M-%d',dateFmt:'yyyy-MM-dd',alwaysUseStartDate:true})" name="">
                    <span class="jianjuss">支付方式</span>
                    <select class="form-control jianju" style="width: 150px;" name="PropertyInfo_ManaStyle">
                        <option value="银行卡支付">银行卡支付</option>
                        <option value="支付宝">支付宝</option>
                        <option value="现金支付">现金支付</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td style="padding-left: 20px;">
                    备注<textarea class="form-control jianjuss" name="ghf_content" style="width: 500px;" rows="3"></textarea>
                </td>
            </tr>
            <tr>
                <td style="padding-left: 20px;font-size: 18px;">
                    共计应收：0元
                </td>
            </tr>
        </table>
        <hr>
        <div style="margin-left: 30px;">
            <button class="btn btn-info" style="width:70px;margin-bottom: 30px;" onclick="addsubmit();" type="button">提交</button>
        </div>
    </div>
</form>

<script>
    function changeType1() {
        $("#addDefray").css("display", "none");
        $("#addProfit").css("display", "block");
    }

    function changeType2() {
        $("#addDefray").css("display", "block");
        $("#addProfit").css("display", "none");
    }
</script>
</body>
</html>
