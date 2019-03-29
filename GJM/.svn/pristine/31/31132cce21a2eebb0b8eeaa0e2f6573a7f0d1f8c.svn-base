<%@ page pageEncoding="utf-8" %>
<%@ page import="com.gjp.util.AppUtil" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
    <title>服务订单</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"><!-- 旧字体样式 -->
    <link href="/resources/common/imageUpload/css/jquery.image-upload.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/common/common.css" rel="stylesheet" type="text/css">
    <link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/common/page.list.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/service/serviceList.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/service/addService.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/serve/addService.css" rel="stylesheet" type="text/css">

    <script src="/resources/js/jquery-1.7.2.min.js"></script>
    <script src="/resources/common/My97DatePicker/WdatePicker.js"></script>
    <script src="/resources/common/imageUpload/js/jquery.image-upload.js"></script>
    <script src="/resources/print/LodopFuncs.js"></script>
    <script src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
    <script src="/resources/js/product/jquery-cookie.js"></script>
    <script src="/resources/js/common/common.js"></script>
    <script src="/resources/js/common/common.hint.js"></script>
    <script src="/resources/js/common/common.state.js"></script>
    <script src="/resources/js/common/common.page.js"></script>
    <script src="/resources/js/service/serviceList.js"></script>
</head>
<body>
<!-- 打印 -->
<div id="print" style="display: none;">
    <table style="border-collapse: collapse; width: 730px; height:360px;  position: relative; text-align: center; font-size: 14px;">
        <thead>
        <tr>
            <td colspan="8"
                style="height: 40px; line-height: 40px; font-size: 19px; font-weight: bold; text-align: center;">派工单
            </td>
        </tr>
        <tr>
            <td colspan="3" style="height: 35px; line-height: 35px;">派工单位:重庆管家婆房屋托管中心</td>
            <td colspan="2">服务热线:023-88067511-3</td>
            <td colspan="2" id="md_number">No:</td>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td rowspan="2" style=" font-size: 17px; border: 1px solid #000; width: 50px; padding-left: 5px;">客户信息</td>
            <td style="width: 10%; border: 1px solid #000; height: 23px; line-height: 23px">联系人</td>
            <td style="border: 1px solid #000; text-align: left; text-indent: 10px;" id="md_contactpeople"></td>
            <td style="width: 10%; border: 1px solid #000;">联系电话</td>
            <td style="border: 1px solid #000; text-align: left; text-indent: 10px;" id="md_contactPhone"></td>
            <td style="width: 76px; border: 1px solid #000;">所属门店</td>
            <td style="width: 123px; border: 1px solid #000;" id="owenUcc"></td>
        </tr>
        <tr>
            <td style="border: 1px solid #000; height: 23px; line-height: 23px;">小区房号</td>
            <td colspan="3" style="border: 1px solid #000; text-align: left; text-indent: 10px;"
                id="house_address"></td>
            <td style="border: 1px solid #000;">报修人员</td>
            <td style="border: 1px solid #000;" id="applyer"></td>
            <td rowspan="3" style="width: 20px;">白客服</td>
        </tr>
        <tr>
            <td rowspan="3" style=" font-size: 17px; border: 1px solid #000; width: 50px; padding-left: 5px;">问题描述</td>
            <td rowspan="3" colspan="4" style="border: 1px solid #000; text-align: left; text-indent: 10px;"
                id="md_problem"></td>
            <td style="border: 1px solid #000; height: 23px; line-height: 23px">接单人员</td>
            <td style="border: 1px solid #000;" id="accpet_name"></td>
        </tr>
        <tr>
            <td style="border: 1px solid #000; height: 23px; line-height: 23px;">报事时间</td>
            <td style="border: 1px solid #000; font-size: 15px; font-size: 12px;" id="md_time"></td>
        </tr>
        <tr>
            <td style="border: 1px solid #000; height: 23px; line-height: 23px;">派工时间</td>
            <td style="border: 1px solid #000; font-size: 12px;" id="mdg_time"></td>
        </tr>
        <tr>
            <td rowspan="3" style=" font-size: 17px; border: 1px solid #000; width: 50px; padding-left: 5px;">处理描述</td>
            <td rowspan="3" colspan="4" style="border: 1px solid #000;"></td>
            <td style="border: 1px solid #000; height: 23px; line-height: 23px;">开始时间</td>
            <td style="border: 1px solid #000; font-size: 15px;"></td>
            <td rowspan="3" style="width: 20px;">红财务</td>
        </tr>
        <tr>
            <td style="border: 1px solid #000; height: 23px; line-height: 23px;">完成时间</td>
            <td style="border: 1px solid #000; font-size: 15px;"></td>
        </tr>
        <tr>
            <td style="border: 1px solid #000; height: 23px; line-height: 23px;">付款对象</td>
            <td style="border: 1px solid #000;" id="md_applyType"></td>
        </tr>
        <tr>
            <td rowspan="6" style=" font-size: 17px; border: 1px solid #000; width: 50px; padding-left: 5px;">服务须知</td>
            <td rowspan="6" colspan="4" style="text-align: left; font-size: 12px; border: 1px solid #000; ">
                1、师傅上门维修时间，按报修的先后顺序进行排队，报修时预约大概日期，师傅确定具体上门时间，48小时内上门（无预约）<br/>
                2、师傅2天内未联系上客户的用短信通知客户，此次报事自动完结，客户需重新报修;<br/>
                3、租客入住15天内，除人为原因外的报修，费用由业主承担；<br/>
                4、租客入住15天后，除装修与人为原因外的报修，费用包修费里扣除，不足补齐。<br/>
            </td>
            <td style="border: 1px solid #000; height: 23px; line-height: 23px;">付费人</td>
            <td style="border: 1px solid #000; text-indent: 0;" id="md_phone"></td>
            <td rowspan="3" style="width: 20px;">黄客户</td>
        </tr>
        <tr>
            <td style="border: 1px solid #000; height: 23px; line-height: 23px;">人工费用</td>
            <td style="border: 1px solid #000;"></td>
        </tr>
        <tr>
            <td style="border: 1px solid #000; height: 23px; line-height: 23px;">材料费用</td>
            <td style="border: 1px solid #000;"></td>
        </tr>
        <tr>
            <td style="border: 1px solid #000; height: 23px; line-height: 23px;">其他费用</td>
            <td style="border: 1px solid #000;"></td>
        </tr>
        <tr>
            <td style="border: 1px solid #000; height: 23px; line-height: 23px;">合计金额</td>
            <td style="border: 1px solid #000;"></td>
        </tr>
        </tbody>
        <tfoot>
        <tr>
            <td colspan="3" style="text-align: left; text-indent: 30px; height: 35px; line-height: 35px;">审核签字：</td>
            <td colspan="2" style="text-align: left; text-indent: 30px; height: 35px; line-height: 35px;">处理人员：</td>
            <td colspan="2" style="text-align: left; text-indent: 30px; height: 35px; line-height: 35px;">客户签名：</td>
        </tr>
        </tfoot>
    </table>
</div>
</body>
</html>