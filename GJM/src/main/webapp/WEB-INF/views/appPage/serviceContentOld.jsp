<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
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
    <link href="/resources/css/appPage/serviceContentOld.css?v=<%=System.currentTimeMillis()%>" rel="stylesheet" type="text/css"><!-- 下拉刷新上拉更多样式 -->
    <link href="/resources/mui/mui.css" rel="stylesheet" type="text/css"><!-- 下拉刷新上拉更多样式 -->
    <link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/imageUpload/css/jquery.image-upload.css" rel="stylesheet" type="text/css">
    <!-- 图片上传 -->
    <link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

    <script src="/resources/js/jquery-2.0.0.min.js"></script><!-- jQuery插件 -->
    <script src="/resources/js/jquery-1.7.2.min.js"></script>
    <script src="/resources/js/common/common.js"></script>
    <script src="/resources/js/jquery.cookie.js"></script>
    <script src="/resources/common/imageUpload/js/jquery.image-upload.js"></script><!-- 图片上传 -->
    <script src="/resources/mui/mui.min.js"></script>
    <script src="/resources/mui/mui.previewimage.js"></script><!-- 图片浏览 -->
    <script src="/resources/mui/mui.zoom.js"></script><!-- 图片浏览 -->
    <script src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
    <script src="/resources/js/appPage/serviceContentOld.js?v=<%=System.currentTimeMillis()%>"></script>
</head>

<style>
    .appImageBox .image-item-add {
        display: none;
    }

    #service_image .appImageBox .image-item .image-item-close {
        display: none;
    }

    .appImageBox .image-item-add .imagefont {
        margin-top: 43px;
    }
</style>
<body>
<div class="content">
    <div class="center">
        <dl style="overflow: hidden; height:auto;">
            <dt><label>服务类型：</label><i class="serviceType"><img alt="" src="/resources/image/service.png"></i></dt>
            <dd id="service_type" style="overflow: hidden; height:auto; width: 59%;"></dd>
        </dl>
        <dl>
            <dt><label>申请类型：</label><i class="applyType"><img alt="" src="/resources/image/service1.png"></i></dt>
            <dd id="service_types"></dd>
        </dl>
        <dl>
            <dt><label>订单状态：</label><i class="applyType"><img alt="" src="/resources/image/service1.png"></i></dt>
            <dd id="service_types1"></dd>
        </dl>
        <dl>
            <dt><label>约定时间：</label><i class="date1"><img alt="" src="/resources/image/date1.png"></i></dt>
            <dd id="service_date"></dd>
        </dl>
        <dl>
            <dt><label>申请时间：</label><i class="date2"><img alt="" src="/resources/image/date2.png"></i></dt>
            <dd id="service_sdate"></dd>
        </dl>
        <dl style="overflow: hidden; height: auto;">
            <dt><label>图片描述：</label><i></i></dt>
            <dd style="overflow: hidden; height: auto; position: relative;" id="service_image">
                <div id="imageLoad"></div>
            </dd>
        </dl>
    </div>
    <div class="custmor_message">
        <dl>
            <dt><label>联系方式：</label><i class="name_phone"><img alt="" src="/resources/image/name.png"></i></dt>
            <dd><label id="service_custmorName"></label><label style="margin-left: 10px; color:#44acfc;"
                                                               id="service_custmorPhone"></label></dd>
        </dl>
        <dl style="overflow: hidden; height: auto;" id="service_addressbox">
            <dt><label>房屋地址：</label><i class="address"><img alt="" src="/resources/image/address.png"></i></dt>
            <dd style="overflow: hidden; width:65%; line-height: 24px; padding-top: 10px; padding-bottom: 5px; padding-right: 5px; font-size: 13px;min-height: 40px"
                id="service_address"></dd>
        </dl>

        <dl style="overflow: hidden; height: auto;" class="moveAddress">
            <dt><label>搬出地址：</label><i class="address"><img alt="" src="/resources/image/address.png"></i></dt>
            <dd style="overflow: hidden; width:65%; line-height: 22px; padding-top: 10px; padding-bottom: 5px; padding-right: 5px; font-size: 13px;min-height: 40px"
                id="fromMoveAddress"></dd>
        </dl>

        <dl style="overflow: hidden; height: auto;" class="moveAddress">
            <dt><label>搬入地址：</label><i class="address"><img alt="" src="/resources/image/address.png"></i></dt>
            <dd style="overflow: hidden; width:65%; line-height: 22px; padding-top: 10px; padding-bottom: 5px; padding-right: 5px; font-size: 13px;min-height: 40px"
                id="toMoveAddress"></dd>
        </dl>
        <%-- <dl style="overflow: hidden; height: auto;" class="" >
             <dt><label>备&nbsp;&nbsp;&nbsp;&nbsp;注：</label><i class="address"><img alt="" src="/resources/image/service1.png"></i></dt>
             <dd style="overflow: hidden; width:65%; line-height: 22px; padding-top: 10px; padding-bottom: 5px; padding-right: 5px; font-size: 13px;" ></dd>
         </dl>--%>

        <dl style="overflow: hidden; height: auto;" class="startTiemBefor">
            <dt><label>预计开始：</label><i class="address"><img alt="" src="/resources/image/date2.png"></i></dt>
            <dd style="overflow: hidden; width:65%; line-height: 22px; padding-top: 5px; padding-bottom: 5px; padding-right: 5px; font-size: 13px;">
                <input id="mtk_start_time" style="line-height: 30px;height: 30px;padding-left: 5px;font-size: 14px"
                       type="datetime-local"/></dd>
        </dl>
        <dl style="overflow: hidden; height: auto;" class="startTiemAfter">
            <dt><label>预计开始：</label><i class="address"><img alt="" src="/resources/image/date2.png"></i></dt>
            <dd style="overflow: hidden; width:65%; line-height: 22px; padding-top: 10px; padding-bottom: 5px; padding-right: 5px; font-size: 13px;"></dd>
        </dl>

        <dl style="overflow: hidden; height: auto;" class="endTiemBefor">
            <dt><label>预计结束：</label><i class="address"><img alt="" src="/resources/image/date2.png"></i></dt>
            <dd style="overflow: hidden; width:65%; line-height: 22px; padding-top: 5px; padding-bottom: 5px; padding-right: 5px; font-size: 13px;">
                <input id="mtk_end_time" style="line-height: 30px;height: 30px;padding-left: 5px;font-size: 14px"
                       type="datetime-local"/></dd>
        </dl>
        <dl style="overflow: hidden; height: auto;" class="endTiemAfter">
            <dt><label>预计结束：</label><i class="address"><img alt="" src="/resources/image/date2.png"></i></dt>
            <dd style="overflow: hidden; width:65%; line-height: 22px; padding-top: 10px; padding-bottom: 5px; padding-right: 5px; font-size: 13px;"></dd>
        </dl>
        <dl>
            <dd style="width: 100%; margin-left: 0; border-bottom: none;">
                <label class="seeAddress">
                    <button>查看路线</button>
                </label>
                <label class="telPhone">
                    <button>拨打电话</button>
                </label>
            </dd>
        </dl>
    </div>
</div>
<div class="serviceContent" style="display: none;">
    <div class="serviceTitle">
        <%--  <div class="serviceTitle_xiang not"><i class="serviceTitle_yuan"></i><i class="serviceTitle_line"></i><label>服务受理</label>
          </div>
          <div class="serviceTitle_xiang not"><i class="serviceTitle_yuan"></i><i
                  class="serviceTitle_line"></i><label>已派单</label></div>
          <div class="serviceTitle_xiang not"><i class="serviceTitle_yuan"></i><i
                  class="serviceTitle_line"></i><label>已接单</label></div>
          <div class="serviceTitle_xiang not"><i class="serviceTitle_yuan"></i><i
                  class="serviceTitle_line"></i><label>服务中</label></div>
          <div class="serviceTitle_xiang not"><i class="serviceTitle_yuan"></i><label>已完成</label></div>--%>

        <div class="serviceTitle_xiang not"><i class="serviceTitle_yuan"></i><i class="serviceTitle_line"></i><label>服务申请</label>
        </div>
        <div class="serviceTitle_xiang not"><i class="serviceTitle_yuan"></i><i
                class="serviceTitle_line"></i><label>服务受理</label></div>
        <div class="serviceTitle_xiang not"><i class="serviceTitle_yuan"></i><i
                class="serviceTitle_line"></i><label>服务处理</label></div>
        <%--<div class="serviceTitle_xiang not"><i class="serviceTitle_yuan"></i><i
                class="serviceTitle_line"></i><label>服务完成</label></div>--%>
        <div class="serviceTitle_xiang not"><i class="serviceTitle_yuan"></i><label>客服回访</label></div>
    </div>
    <div class="service-content">
        <!-- 服务进度内容 -->
    </div>
    <%--<div class="customerImage" style=" border-top: 1px solid #e8e8e8;">
        <dl style="border: none; overflow: hidden; height: auto;">
            <dt>客户签字：</dt>
            <dd style="overflow: hidden; height: auto;"><img data-preview-src="" data-preview-group="1" style="width: 50%; height: 85px;" alt="没有图片" id="customerImage" src=""></dd>
        </dl>
    </div>--%>
    <div class="service-image">
        <dl style="overflow: hidden; height: auto; border-bottom: none;">
            <dt><label>服务清单：</label><i></i></dt>
            <dd style="overflow: hidden; height: auto; position: relative;" id="service_imageBill">
                <div id=imageBill></div>
            </dd>
        </dl>
    </div>
</div>
<input type="hidden" id="md_id"/>
<input type="hidden" id="em_id"/>
<div class="button" style="padding-top: 72px;">
    <button class="serviceBillb" onclick="serviceBillSubmit()">立即接单</button>
    <button class="serviceProblem" onclick="serviceProblem()">现场确认</button>
    <button class="serviceStart" onclick="startServiceBillSubmit()">开始服务</button>
    <button class="serviceEnd" onclick="endServiceBillSubmit()">结束服务</button>
    <button class="serviceCostList" onclick="serviceMoney()">确认费用</button>
    <%--<button class="serviceCostList" onclick="serviceCostListSubmit()">费用清单</button>--%>
    <%--<button class="serviceAutograph" style="display: none" onclick="autographSubmit()">客户签名</button>--%>
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