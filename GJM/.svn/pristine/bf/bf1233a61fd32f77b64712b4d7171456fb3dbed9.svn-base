<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<!doctype html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>订单管理</title>
    <link href="/resources/css/common/common.css" rel="stylesheet" type="text/css">
    <link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"><!-- 字体图标 -->
    <link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/table-min.css" rel="stylesheet" type="text/css"/><!-- 表格样式 -->
    <link href="/resources/css/financeManage/orderManage.css" rel="stylesheet" type="text/css">
    <link href="/resources/Plug-in/chosen/chosen.css" rel="stylesheet" type="text/css"><!-- 模糊下拉框 -->

    <script src="/resources/js/jquery-1.7.2.min.js"></script>
    <script src="/resources/js/table-min.js"></script>
    <script src="/resources/js/product/jquery-cookie.js"></script>
    <script src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
    <script src="/resources/common/My97DatePicker/WdatePicker.js"></script><!-- 时间插件 -->
    <script src="/resources/Plug-in/chosen/chosen.jquery.js"></script><!-- 模糊下拉框 -->
    <script src="/resources/print/LodopFuncs.js"></script><!-- 打印插件 -->
    <script src="/resources/js/common/common.js"></script>
    <script src="/resources/js/jquery.qrcode.min.js"></script><!-- 二维码 -->
    <script src="/resources/js/financeManage/orderManage.js"></script>
</head>
<body>
<div id="content" style="padding: 12px"></div>
<div id="orderPrint" style="display: none;"></div>
<div id="olinePay"></div>
<script language="javascript" type="text/javascript">
    var LODOP; //声明为全局变量
    function printMytable() {
        LODOP = getLodop();
        LODOP.PRINT_INIT("票据打印");
        $("#orderPrint .tablePrint").each(function (index) {
            LODOP.ADD_PRINT_TABLE(30, 17, "99.8%", 400, $(this).html());
            LODOP.ADD_PRINT_TEXT(10, 700, 100, 22, $(this).find("table").attr("data-index") + "/" + $(this).find("table").attr("data-sum"));
            LODOP.NewPageA();//分页
        });
        if (LODOP.CVERSION) {
            LODOP.On_Return = function (TaskID, Value) {
                // 大于0成功,数字表示打印了几页。
                if (Value > 0) {
                    $.ajax({
                        type: "POST",
                        url: "/financeManage/printLogs",
                        data: {
                            bco_code: $("#orderPrint .prinltCode").val(),
                            bco_num: $("#orderPrint .prinltNum").val(),
                            cpl_num: Value
                        },
                        contentType: "application/x-www-form-urlencoded; charset=utf-8",
                        dataType: "json",
                        success: function (result) {

                        }
                    });
                }
            };
        }
        LODOP.PREVIEW();

    };
</script>
</body>
</html>