<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="format-detection" content="telephone=no">
    <meta name="format-detection" content="email=no">
    <title>订单信息</title>
    <link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/common/common.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/appPage/serviceContent.css" rel="stylesheet" type="text/css">

    <script src="/resources/js/jquery-2.0.0.min.js"></script>
    <script src="http://api.map.baidu.com/api?v=2.0&ak=9HqNP0u7U4ZU5ZTKHT8BCbUa"></script>
    <script src="/resources/js/common/common.js"></script>
    <script src="/resources/js/common/common.state.js"></script>
    <script src="/resources/js/common/common.hint.js"></script>
    <script src="/resources/js/appPage/serviceContent.js?v=<%=System.currentTimeMillis()%>"></script>
    <jsp:include page="../scrf/scrf.jsp"/>
</head>
<body>
<input type="hidden" id="md_id"/>
<input type="hidden" id="em_id"/>
<div class="content">
    <div class="center">
        <dl>
            <dt><label>订单状态</label></dt>
            <dd id="service_types1"></dd>
        </dl>
        <dl style="overflow: hidden; height: auto;" id="service_addressbox">
            <dt><label>房屋地址</label></dt>
            <dd style="overflow: hidden; width:65%; line-height: 24px; padding-top: 10px; padding-bottom: 5px; padding-right: 5px; font-size: 13px;min-height: 40px"
                id="service_address"></dd>
        </dl>
        <dl style="overflow: hidden; height: auto;" class="moveAddress">
            <dt><label>搬出地址</label></dt>
            <dd style="overflow: hidden; width:65%; line-height: 22px; padding-top: 10px; padding-bottom: 5px; padding-right: 5px; font-size: 13px;min-height: 40px"
                id="fromMoveAddress"></dd>
        </dl>

        <dl style="overflow: hidden; height: auto;" class="moveAddress">
            <dt><label>搬入地址</label></dt>
            <dd style="overflow: hidden; width:65%; line-height: 22px; padding-top: 10px; padding-bottom: 5px; padding-right: 5px; font-size: 13px;min-height: 40px"
                id="toMoveAddress"></dd>
        </dl>
        <dl>
            <dt><label>申请类型</label></dt>
            <dd id="service_types"></dd>
        </dl>
        <dl>
            <dt><label>申请项目</label></dt>
            <dd id="service_st_name"><span></span></dd>
        </dl>
        <dl>
            <dt><label>补充说明</label></dt>
            <dd id="service_problem"></dd>
        </dl>
        <dl>
            <dt><label>预约时间</label></dt>
            <dd id="service_date"></dd>
        </dl>
        <dl>
            <dt><label>申请时间</label></dt>
            <dd id="service_sdate"></dd>
        </dl>
        <dl>
            <dt><label>付费对象</label></dt>
            <dd id="service_payObject"></dd>
        </dl>
        <dl style="overflow: hidden; height: auto;" class="endTiemAfter">
            <dt><label>预计时长</label></dt>
            <dd style="overflow: hidden; width:65%; line-height: 22px; padding-top: 10px; padding-bottom: 5px; padding-right: 5px; font-size: 13px;"></dd>
        </dl>
      <%--  <dl id="processProblem">
            <dt><label>现场确认</label></dt>
            <dd id="service_ProcessProblem"></dd>
        </dl>--%>

    </div>
    <div class="center">
        <dl>
            <dt><label>付费人</label></dt>
            <dd><label id="so_payNameNew"></label><label style="margin-left: 10px; color:#44acfc;" id="so_payPhoneNew"></label></dd>
        </dl>
        <dl>
            <dt><label>联系人</label></dt>
            <dd><label id="service_custmorName"></label><label style="margin-left: 10px; color:#44acfc;" id="service_custmorPhone"></label></dd>
        </dl>
        <dl>
            <dt><label>责任人</label></dt>
            <dd id="service_soCurrentChargerName"></dd>
        </dl>
        <dl>
            <dd style="width: 100%; margin-left: 0; border-bottom: none; height: 40px">
                <label class="seeAddress">
                    <button onclick="toBaiduMap()">查看路线</button>
                </label>
                <label class="telPhone">
                    <button>拨打电话</button>
                </label>
                <label class="serviceMechanics">
                    <button>服务进度</button>
                </label>
            </dd>
        </dl>
    </div>
    <div class="center serviceContent" style="display: none;">
        <div class="service-content">
            <!-- 服务进度内容 -->
        </div>
        <div class="service-image" id="service-image" style="display: none">
            <dl style="overflow: hidden; height: auto; border-bottom: none;">
                <dt><label>费用单据：</label><i></i></dt>
                <dd style="overflow: hidden; height: auto; position: relative;" id="service_imageBill">
                    <div id="imageLoad"></div>
                </dd>
            </dl>
        </div>
    </div>
</div>
<div class="button">

    <div class="serviceBillb-box">
        <button class="refuseBillb" onclick="">拒绝接单</button>
        <button class="serviceBillb" onclick="serviceBillSubmit()">立即接单</button>
    </div>
    <div class="serviceCostList-box">
        <button class="serviceCostList" onclick="serviceMoney()">确认费用</button>
        <button class="content-submmit next-bg" name="conContractRecord" style="width: 48px;flex: inherit;"><i class="fa-reorder" style="margin: 0;"></i></button>
    </div>
    <div class="servicePayOrder-box">
        <button class="servicePayOrder" onclick="servicePayOrder()">支付订单</button>
        <button class="content-submmit next-bg" name="conContractRecord" style="width: 48px;flex: inherit;"><i class="fa-reorder" style="margin: 0;"></i></button>
    </div>
    <div class="servicePayOrderDetail-box">
        <button class="servicePayOrder" onclick="servicePayOrder()">订单详情</button>
        <button class="content-submmit next-bg" name="conContractRecord" style="width: 48px;flex: inherit;"><i class="fa-reorder" style="margin: 0;"></i></button>
    </div>
    <div class="serviceStartAppointment">
        <button class="serviceAppointment" onclick="appointment()">预约上门</button>
        <button class="serviceStart" onclick="startServiceBillSubmit()">到达现场</button>
        <button class="content-submmit next-bg" name="conContractRecord" style="width: 48px;flex: inherit;"><i class="fa-reorder" style="margin: 0;"></i></button>
    </div>
       <div class="serviceFeedbackEnd">
           <button class="serviceFeedback" onclick="sceneFeedback()">现场反馈</button>
           <button class="serviceEnd" onclick="endServiceBillSubmit()">完成服务</button>
           <button class="content-submmit next-bg" name="conContractRecord" style="width: 48px;flex: inherit;"><i class="fa-reorder" style="margin: 0;"></i></button>
       </div>
</div>
<div class="alert-content" style="display: none;">
    <div class="alert-content-bg"></div>
    <div class="alert-content-list">
        <div style="font-size: 18px; color: #3498DB;">现场问题</div>
        <ul>
            <li></li>
        </ul>
    </div>
</div>
</body>
</html>