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
    <title>服务申请</title>

    <link href="/resources/css/common/common.css" rel="stylesheet" type="text/css">
    <link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/imageUpload/css/jquery.image-upload.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/appPage/service/serviceApply.css?v=<%=System.currentTimeMillis()%>" rel="stylesheet" type="text/css">

    <script src="/resources/js/jquery-2.0.0.min.js"></script><!-- jQuery插件 -->
    <script src="/resources/js/common/common.js"></script>
    <script src="/resources/js/common/common.hint.js"></script>
    <script src="/resources/common/imageUpload/js/jquery.image-upload.js"></script><!-- 图片上传 -->
    <script src="/resources/js/appPage/service/serviceApply.js?v=<%=System.currentTimeMillis()%>"></script>
    <jsp:include page="../../scrf/scrf.jsp"/>
</head>
<body>
<div class="content">
    <div class="center" style="margin-top: 15px">
        <dl class="bottom">
            <dt><label>服务类型</label></dt>
            <dd>
                <select id="st_name" id="type" style="width: 100%;padding-right: 30px;">
                    <%--<option value="日常保洁">日常保洁</option>
                    <option value="居家维修">居家维修</option>--%>
                </select>
                <label class="font-icon"></label></dd>
        </dl>

    </div>

    <div class="center" id="serviceTBox">
        <div class="serviceTBox">
            <%--<div class="serviceT">
                <img class="unchecked" style="display: block" src="/resources/image/appPage/appliance_lampblack_unchecked_Image.png"/>
                <img class="checked" style="display: none" src="/resources/image/appPage/appliance_lampblack_checked_Image.png"/>
                <span class="serviceTName">电灯</span>
            </div>
           --%>
        </div>
    </div>

    <div class="center">
        <div id="address">
            <dl>
                <dt><label>房屋地址</label></dt>
                <dd><input id="so_targetAddress" type="text" value="" placeholder="选择房屋地址"
                           onclick="houseSearch()"><label class="font-icon"></label></dd>
            </dl>
        </div>

        <dl >
            <dt><label>付费对象</label></dt>
            <dd>
                <select id="so_payObject" style="width:100%;padding-right:30px;<%--onchange="typep(this)--%>">
                    <option value="4">租客</option>
                    <option value="5">房东</option>
                    <option value="2">管家</option>
                    <option value="3">门店</option>
                    <%--<option value="6">用户</option>--%>
                </select>
                 <label class="font-icon"></label>
            </dd>
        </dl>

        <dl>
            <dt><label>付费人</label></dt>
            <%--<dd><input id="so_payName" type="text" value=""  placeholder="付费人"></dd>--%>
            <dd>
                <select id="so_payName" style="width:100%;padding-right:30px;">
                </select>
                <label class="font-icon"></label>
            </dd>
        </dl>
        <dl >
            <dt><label>付费电话</label></dt>
            <%--<dd><input id="so_payPhone" type="text" value="" placeholder="付费电话"></dd>--%>
            <dd>
                <select id="so_payPhone" style="width:100%;padding-right:30px;">
                </select>
                <label class="font-icon"></label>
            </dd>
        </dl>
        <dl>
            <dt><label>联系人</label></dt>
            <dd><input id="cc_name" type="text" value="" placeholder="联系人"><%--<label class="font-icon"></label>--%></dd>
            <%--<dd>
                <select id="cc_name" style="width:100%;padding-right:30px;">
                </select>
                <label class="font-icon"></label>
            </dd>--%>
        </dl>
        <dl >
            <dt><label>联系电话</label></dt>
            <dd><input id="ccp_phone" type="text" value="" placeholder="联系电话"><%--<label class="font-icon"></label>--%></dd>
           <%-- <dd>
                <select id="ccp_phone" style="width:100%;padding-right:30px;">
                </select>
                <label class="font-icon"></label>
            </dd>--%>
        </dl>
        <dl class="bottom">
            <dt><label>预约时间</label>
            <dd style="position: relative;" ><input id="selectDate" type="datetime-local" value="" min=""
                                                    style="border: none; width: 100%;-webkit-appearance: none; top: 10px; color: #5a5a5a;padding-right: 0%;height:41px;overflow: hidden;"
                                                    placeholder="选择日期"><%--<label class="font-icon"></label>--%>
            </dd>
        </dl>
        <%--<dl class="bottom">--%>
            <%--<dt><label>预约时间</label></dt>--%>
            <%--<dd style="position: relative;"><input id="selectDate" type="datetime-local" value="" placeholder="" style="" ><label class="font-icon"></label></dd>--%>
        <%--</dl>--%>

        <input type="hidden" id="houseS"/>
        <input type="hidden" id="con_no"/>
        <input type="hidden" id="hi_code" />
        <input type="hidden" id="em_id"/>
    </div>

    <div class="center">
        <dl class="bottom" style="width: auto;height: auto;display: block;line-height: 40px">
            <dt><label>故障说明</label></dt>
            <dt class="textareaBox"><textarea id="so_problem" rows="3"  placeholder="请填写故障说明"></textarea></dt>
        </dl>
    </div>
   <%-- <div class="center">
        <dl class="bottom" style="width: auto;height: auto;display: block">
            <dt><label>图片描述</label></dt>
            <dt class="textareaBox">
                <div id="imageLoad" style=" padding: 0px 0 16px 0;margin-left: 0px"></div>
            </dt>
        </dl>--%>
        <%--<div class="lines">
            <div style="display: flex">
                <span class="line-lefts">图片描述:</span>
            </div>
            <div class="line-rights">
                <div id="imageLoad" style=" padding: 0px 0 16px 0;margin-left: 24px"></div>
            </div>
        </div>--%>
    <%--</div>--%>
    <div class="contentService" style="margin-bottom: 68px;"></div>
    <div class="bottom_service">
        <label class="title"><span id="so_totalMoney">0</span>元<span
                style="color:#5a5a5a;padding-left: 5px ">起</span></label>
        <!--<label class="money">￥0.00起</label>-->
        <button class="submitButton" onclick="serviceSubmit()">立即预约</button>
    </div>
</div>
</body>
</html>