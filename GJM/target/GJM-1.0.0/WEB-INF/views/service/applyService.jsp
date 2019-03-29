<%@page import="com.gjp.util.AppUtil" %>
<%@ page pageEncoding="utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>服务申请</title>
    <link href="/resources/css/common/common.css" rel="stylesheet" type="text/css">
    <link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"><!-- 旧字体样式 -->
    <link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/imageUpload/css/jquery.image-upload.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/sweet-alert/css/sweetalert.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/datepicker/jquery-ui.css" rel="stylesheet" type="text/css">
    <link href="/resources/Plug-in/jQuery-Validation-Engine-master/css/validationEngine.jquery.css" rel="stylesheet" type="text/css"/>
    <link href="/resources/css/serve/addService.css" rel="stylesheet" type="text/css">

    <script src="/resources/js/libs/jquery/jquery-1.7.2.min.js"></script>
    <script src="/resources/js/common/common.js"></script>
    <script src="/resources/js/common/common.search.js"></script>
    <script src="/resources/common/My97DatePicker/WdatePicker.js"></script>
    <script src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
    <script src="/resources/common/imageUpload/js/jquery.image-upload.js"></script>
    <script src="/resources/common/datepicker/js/jquery-ui-datepicker.js"></script>
    <script src="/resources/Plug-in/map/Js/public.js?v=<%=System.currentTimeMillis()%>"></script>
    <script src="/resources/common/sweet-alert/js/sweetalert-dev.js"></script>
    <script src="/resources/js/common/common.hint.js"></script>
    <script src="/resources/js/service/applyService.js?v=1.9"></script>
</head>
<body>
    <div id="main-box">
        <div id="main-box-content">
            <dl class="content-dl">
                <dt>服务大类</dt>
                <dd>
                    <select class="from-data" name="serviceType" id="service-type" onchange="checkSerbiceType(this)" title="">
                        <c:forEach items="${serviceList}" var="item">
                            <option value="${item.sm_id}">${item.sm_name}</option>
                        </c:forEach>
                    </select>
                </dd>
            </dl>
            <dl class="content-dl">
                <dt>服务小类</dt>
                <dd>
                    <select class="from-data" name="serviceContent" id="type-content" style="width: auto;" onchange="queryServiceItems()" title="">
                        <c:forEach items="${typeList}" var="item">
                            <option value="${item.st_id}">${item.st_name}</option>
                        </c:forEach>
                    </select>
                </dd>
            </dl>
            <dl class="content-dl" id="service-items" style="display: none;padding-bottom: 4px;">
                <dt>服务项目</dt>
                <dd id="st_item"></dd>
            </dl>
            <dl class="content-dl">
                <dt>
                    <em>*</em><label id="moveName">房屋地址</label>
                </dt>
                <dd>
                    <input type="text" class="from-data" id="houseInfo" placeholder="房屋地址" autocomplete="off" style="width: 334px;">
                    <img src="/resources/image/localtion_map.png" class="mapImg" onclick="mapsszuobiao(this)" data-content-id="2"><input type="hidden" id="out_point" disabled>
                </dd>
                <dd>
                    <div class="from-data-state"></div>
                </dd>
            </dl>
            <dl class="content-dl" id="moveInDl" style="display: none;">
                <dt>
                    <em>*</em>搬入地址
                </dt>
                <dd>
                    <input type="text" class="from-data" id="houseInfo2" placeholder="请填写搬入房屋地址" autocomplete="off" style="width: 334px;">
                    <img src="/resources/image/localtion_map.png" class="mapImg" onclick="mapsszuobiao(this)" data-content-id="3"><input type="hidden" id="in_point" disabled>
                </dd>
                <dd>
                    <div class="from-data-state"></div>
                </dd>
            </dl>
            <dl class="content-dl">
                <dt>补充说明</dt>
                <dd>
                    <textarea class="from-data" cols="3" name="serviceProblemDesc" placeholder="补充说明" maxlength="50"></textarea>
                </dd>
            </dl>
            <dl class="content-dl">
                <dt>付费对象</dt>
                <dd>
                    <div id="typeRadio">
                        <label class="typeRadio"><input type="radio" value="4" name="4"/>租客</label>
                        <label class="typeRadio"><input type="radio" value="5" name="4"/>房东</label>
                        <label class="typeRadio"><input type="radio" value="2" name="4"/>管家</label>
                        <label class="typeRadio"><input type="radio" value="3" name="4"/>门店</label>
                        <label class="typeRadio"><input type="radio" value="6" name="4"/>用户</label>
                    </div>
                </dd>
                <dd>
                    <div class="from-data-state"></div>
                </dd>
            </dl>
            <div id="sgin-infoT">
                <dl class="content-dl">
                    <dt><em>*</em>付费人</dt>
                    <dd>
                        <input type="text" class="from-data" name="so_payName" id="so_payName" placeholder="付费人" style="width: 100px">
                        <div style="padding: 0 10px;">-</div>
                        <input type="text" class="from-data" name="so_payPhone" id="so_payPhone" placeholder="联系电话">
                    </dd>
                </dl>
                <dl class="content-dl">
                    <dt>
                        <em>*</em>联系人
                    </dt>
                    <dd>
                        <input type="text" class="from-data" name="contactPeople" id="contactPeople" placeholder="联系人" style="width: 100px">
                        <div style="padding: 0 10px;">-</div>
                        <input type="text" class="from-data" name="contactPhone" id="contactPhone" placeholder="联系电话">
                    </dd>
                </dl>
            </div>
            <div id="year_order">
                <dl class="content-dl">
                    <dt>
                        <em>*</em>预约时间
                    </dt>
                    <dd>
                        <input type="text" class="from-data" name="startTime" id="startTime" placeholder="预约时间" readonly="readonly" title="" onblur="checkBookTime(this)" onfocus='WdatePicker({dateFmt:"yyyy-MM-dd HH:mm:ss"})'>
                    </dd>
                </dl>
                <dl class="content-dl">
                    <dt>申请人</dt>
                    <dd>
                        <input type="text" class="from-data" placeholder="申请人" value="<%=AppUtil.getCookieEmployee().getEm_name()%>" readonly="readonly" disabled="disabled">
                    </dd>
                </dl>
            </div>
            <dl class="content-dl">
                <dt></dt>
                <dd>
                    <input type="button" id="submit" class="from-data" value="提交" onclick="submitData()">
                </dd>
            </dl>
        </div>
    </div>
</body>
</html>