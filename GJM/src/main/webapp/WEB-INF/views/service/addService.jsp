<%@ page import="com.gjp.util.AppUtil" %>
<%@ page pageEncoding="utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link href="/resources/css/common/common.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/manage_index.css" rel="stylesheet" type="text/css">
    <link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/imageUpload/css/jquery.image-upload.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/datepicker/jquery-ui.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/sweet-alert/css/sweetalert.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/serve/addService.css" rel="stylesheet" type="text/css">

    <script src="/resources/js/jquery-1.7.2.min.js"></script>
    <script src="/resources/js/common/common.js"></script>
    <script src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
    <script src="/resources/common/imageUpload/js/jquery.image-upload.js"></script>
    <script src="/resources/common/datepicker/js/jquery-ui-datepicker.js"></script>
    <script src="/resources/common/sweet-alert/js/sweetalert-dev.js"></script>
    <script src="/resources/Plug-in/map/Js/public.js?v=<%=System.currentTimeMillis()%>"></script>
    <script src="/resources/js/service/addService.js?v=<%=System.currentTimeMillis()%>"></script>
</head>
<body>
<div id="main-box">
    <div id="main-box-title">
        <a class="title-sub title-sub-ok">服务申请</a> <span class="title-bottom title-bottom-ok"></span> <a class="title-sub">服务受理</a> <span class="title-bottom"></span> <a class="title-sub">业务处理</a> <span class="title-bottom"></span> <a class="title-sub">客服回访</a> <span class="title-bottom"></span> <a
            class="title-sub">完成</a>
    </div>
    <div id="main-box-content">
        <dl class="content-dl">
            <dt>服务类型</dt>
            <dd>
                <select class="from-data validate[required]" name="serviceType" id="service-type" onchange="checkSerbiceType(this)">
                    <c:forEach items="${serviceList}" var="item">
                        <option value="${item.sm_id}">${item.sm_name}</option>
                    </c:forEach>
                </select>
            </dd>
        </dl>
        <dl class="content-dl">
            <dt>服务子类型</dt>
            <dd>
                <select class="from-data validate[required]" name="serviceContent" id="type-content" style="width: auto;" onchange="queryServiceItems()">
                    <c:forEach items="${typeList}" var="item">
                        <option value="${item.st_id}">${item.st_name}</option>
                    </c:forEach>
                </select>
            </dd>
        </dl>
        <dl class="content-dl" id="service-items" style="display: none;">
            <dt>服务项目</dt>
            <dd id="st_item">
                <%--<select class="from-data validate[required]" name="serviceDesc" id="type-desc" style="width: auto;" onchange="queryServiceItemsDesc()">--%>
                <%--<c:forEach items="${typeList}" var="item">--%>
                <%--<option value="${item.st_id}">${item.st_name}</option>--%>
                <%--</c:forEach>--%>
                <%--</select>--%>
            </dd>
        </dl>
        <dl class="content-dl">
            <dt>申请类型</dt>
            <dd style="width: 422px;">
                <%--<select class="from-data validate[required]" name="serviceApplyType" id="apply-type">--%>
                <%--<c:forEach items="${contractTypeList}" var="item">--%>
                <%--<option value="${item.contractType_Name}">${item.contractType_Name}</option>--%>
                <%--</c:forEach>--%>
                <%--</select>--%>
                <div id="typeRadio" style="width: auto; overflow: hidden;">
                    <%--<label class="typeRadio"><input type="radio" value="管家婆" name="4" checked="checked" />管家婆</label>--%>
                    <label class="typeRadio"><input type="radio" value="租客" name="4"/>租客</label>
                    <label class="typeRadio"><input type="radio" value="房东" name="4"/>房东</label>
                    <label class="typeRadio"><input type="radio" value="管家" name="4"/>管家</label>
                    <label class="typeRadio"><input type="radio" value="门店" name="4"/>门店</label>
                </div>
            </dd>
            <dd>
                <div class="from-data-state"></div>
            </dd>
        </dl>
        <dl class="content-dl">
            <dt>
                <em>*</em><label id="moveName">房屋地址</label>
            </dt>
            <dd>
                <input type="text" class="from-data validate[required]" id="houseInfo" placeholder="房屋地址" autocomplete="off" style="width: 334px;">
                <img src="/resources/image/localtion_map.png" class="mapImg" onclick="mapsszuobiao(this)" data-content-id="2"><input type="hidden" id="out_point" disabled>
                <input type="hidden" name="contractObject_Code" id="contractObject_Code">
                <input type="hidden" name="cc_code" id="cc_code">
                <input type="hidden" name="user_id" id="user_id">
                <input type="hidden" name="serviceObjHouseId" id="houseId">
                <input type="hidden" name="InputMeasure" id="InputMeasure">
                <input type="hidden" name="InputHouseF" id="InputHouseF">
                <input type="hidden" name="he_address" id="he_address">
                <input type="hidden" name="propertyInfo_coordinate" id="propertyInfo_coordinate">
                <div id="queryList">
                    <div id="search-box">
                        <input type="text" placeholder="输入房屋地址、客戶或管家信息">
                    </div>
                    <div id="search-show">
                        <div class="search-tisp">没有数据</div>
                    </div>
                </div>
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
                <input type="text" class="from-data validate[required]" id="houseInfo2" placeholder="请填写搬入房屋地址" autocomplete="off" style="width: 334px;">
                <img src="/resources/image/localtion_map.png" class="mapImg" onclick="mapsszuobiao(this)" data-content-id="3"><input type="hidden" id="in_point" disabled>
                <input type="hidden" name="contractObject_Code2" id="contractObject_Code2">
                <input type="hidden" name="cc_code2" id="cc_code2">
                <input type="hidden" name="user_id2" id="user_id2">
                <input type="hidden" name="serviceObjHouseId2" id="houseId2">
                <input type="hidden" name="InputMeasure2" id="InputMeasure2">
                <input type="hidden" name="InputHouseF2" id="InputHouseF2">
                <input type="hidden" name="he_address2" id="he_address2">
                <input type="hidden" name="propertyInfo_coordinate2" id="propertyInfo_coordinate2">
                <div id="queryList2">
                    <div id="search-box2">
                        <input type="text" placeholder="输入房屋地址、客戶或管家信息">
                    </div>
                    <div id="search-show2">
                        <div class="search-tisp">没有数据</div>
                    </div>
                </div>
            </dd>
            <dd>
                <div class="from-data-state"></div>
            </dd>
        </dl>
        <div class="">
        </div>
        <dl class="content-dl">
            <dt>
                <em>*</em>服务备注
            </dt>
            <dd>
                <%--<div id="desc-box"></div>--%>
                <div id="complain_div" style="display: none;">
                    <label class="common-checkbox" style="margin: 5px 10px;">
                        管家态度恶劣<input type="checkbox" name="phi_user_sex" value="管家态度恶劣">
                    </label>
                    <label class="common-checkbox" style="margin: 5px 10px;">
                        存在欺诈和欺骗行为<input type="checkbox" name="phi_user_sex" value="存在欺诈和欺骗行为">
                    </label>
                    <label class="common-checkbox" style="margin: 5px 10px;">
                        擅自口头承诺<input type="checkbox" name="phi_user_sex" value="擅自口头承诺">
                    </label>
                    <label class="common-checkbox" style="margin: 5px 10px;">
                        恶意骚扰或者恐吓<input type="checkbox" name="phi_user_sex" value="恶意骚扰或者恐吓">
                    </label>
                    <label class="common-checkbox" style="margin: 5px 10px;">
                        建议反馈<input type="checkbox" name="phi_user_sex" value="建议反馈">
                    </label>
                </div>
                <textarea class="from-data validate[required]" cols="3" name="serviceProblemDesc" placeholder="服务描述" maxlength="50"></textarea>
            </dd>
        </dl>
        <%--<div id="sgin-info" style="display: none;">--%>
        <%--<div style="display: flex;">--%>
        <%--<dl class="content-dl">--%>
        <%--<dt>--%>
        <%--<em>*</em>付费姓名--%>
        <%--</dt>--%>
        <%--<dd>--%>
        <%--<input type="text" class="from-data validate[required]" name="serviceObjName" id="people" placeholder="客户姓名">--%>
        <%--</dd>--%>
        <%--</dl>--%>
        <%--<dl class="content-dl">--%>
        <%--<dt>--%>
        <%--<em>*</em>付费人电话--%>
        <%--</dt>--%>
        <%--<dd>--%>
        <%--<input type="text" class="from-data validate[required]" name="serviceObjPhone" id="phone" placeholder="客户电话">--%>
        <%--</dd>--%>
        <%--</dl>--%>
        <%--</div>--%>
        <%--</div>--%>
        <div id="sgin-infoT">
            <div style="display: flex;">
                <dl class="content-dl">
                    <dt>
                        <em>*</em>联系人
                    </dt>
                    <dd>
                        <input type="text" class="from-data validate[required]" name="contactPeople" id="contactPeople" placeholder="联系人">
                    </dd>
                </dl>
                <dl class="content-dl">
                    <dt>
                        <em>*</em>联系电话
                    </dt>
                    <dd>
                        <input type="text" class="from-data validate[required]" name="contactPhone" id="contactPhone" placeholder="联系电话">
                    </dd>
                </dl>
            </div>
            <%--<dl class="content-dl">--%>
            <%--<dt>--%>
            <%--<em>*</em>费用--%>
            <%--</dt>--%>
            <%--<dd>--%>
            <%--<input type="text" class="from-data validate[required]" name="money" id="money" placeholder="费用">--%>
            <%--</dd>--%>
            <%--</dl>--%>
        </div>
        <div id="year_order" style="display: flex;">
            <dl class="content-dl">
                <dt>
                    <em>*</em>预约时间
                </dt>
                <dd>
                    <input type="text" class="from-data validate[required]" name="startTime" id="startTime" readonly="readonly">
                </dd>
            </dl>
            <dl class="content-dl">
                <dt>代理申请人</dt>
                <dd>
                    <input type="text" class="from-data" placeholder="代理申请人" value="<%=AppUtil.getCookieEmployee().getEm_name()%>" readonly disabled>
                </dd>
            </dl>
        </div>
        <dl class="content-dl">
            <dt>图片描述</dt>
            <dd style="width: 400px;">
                <div id="imageUpload"></div>
            </dd>
        </dl>
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