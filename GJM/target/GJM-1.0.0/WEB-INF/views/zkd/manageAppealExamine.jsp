<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "
http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="UTF-8">
    <title>客户申诉审核</title>
    <link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/common/common.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/zkd/manageAppealExamine.css?v=<%=System.currentTimeMillis()%>" rel="stylesheet" type="text/css"/>
    <script src="/resources/js/jquery-1.7.2.min.js"></script>
    <script src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
    <script src="/resources/js/jquery.cookie.js"></script>
    <script src="/resources/js/common/common.js"></script>
    <script src="/resources/js/common/common.hint.js"></script>
    <script src="/resources/js/zkd/managAppealExamine.js?v=<%=System.currentTimeMillis()%>"></script>

</head>
<body>
<div class="center_box">
    <div class="main-box-1">
        <div class="manage-subtitle"><span id="cc_title"></span></div>
        <div class="content_text">
            <div class="content_text_title">
                <div class="title_content"><i></i><label>求租需求</label></div>
            </div>
            <dl>
                <dt><label class="title">求租人</label></dt>
                <dd style="width: 250px"><span id="cc_name"></span></dd>
                <dt><label class="title">联系方式</label></dt>
                <dd style="width: 150px"><span id="cc_phone"></span></dd>
                <dt><label class="title">发布时间</label></dt>
                <dd style="width: 150px"><span id="cc_createTime"></span></dd>
            </dl>
            <dl>
                <dt><label class="title">求租地段</label></dt>
                <dd style="width: 250px"><span id="pat"></span></dd>
                <dt><label class="title">期望小区</label></dt>
                <dd style="width: 150px"><span id="cc_propertyInfo"></span></dd>
                <dt><label class="title">户型</label></dt>
                <dd style="width: 150px"><span id="cc_room"></span></dd>
            </dl>
            <dl>
                <dt><label class="title">求租类型</label></dt>
                <dd style="width: 250px"><span id="cc_mode"></span></dd>
                <dt><label class="title">租期</label></dt>
                <dd style="width: 150px"><span id="cc_lease"></span></dd>
                <dt><label class="title">租金</label></dt>
                <dd style="width: 150px"><span id="cc_money"></span><span>元</span></dd>
            </dl>
            <dl>
                <dt><label class="title">求租说明</label></dt>
                <dd style="width: 600px;height: auto"><span style="position: relative;top: 5px;line-height: 28px" id="cc_require"></span></dd>
            </dl>

            <div class="content_text_title">
                <div class="title_content"><i></i><label>举报信息</label></div>
            </div>
            <dl>
                <dt><label class="title">举报人</label></dt>
                <dd style="width: 250px"><span id="informant"></span></dd>

                <dt><label class="title">联系方式</label></dt>
                <dd style="width: 150px"><span id="informant_phone"></span></dd>
                <dt><label class="title">举报时间</label></dt>
                <dd style="width: 150px"><span id="ce_createTime"></span></dd>
            </dl>
            <dl>
                <dt><label class="title">举报说明</label></dt>
                <dd style="width: 600px;height: auto"><span style="position: relative;top: 5px;line-height: 28px" id="ce_explain"></span></dd>
            </dl>
            <div class="line-box"></div>
            <div class="content_text_title">
                <div class="title_content"><i></i><label>申诉信息</label></div>
            </div>
            <dl>
                <dt><label class="title">申诉人</label></dt>
                <dd style="width: 250px"><span id="ca_name"></span></dd>

                <dt><label class="title">被投诉理由</label></dt>
                <dd style="width: 150px"><span id="ce_types"></span></dd>
                <dt><label class="title">申诉时间</label></dt>
                <dd style="width: 150px"><span id="ap_creatime"></span></dd>
            </dl>
            <dl>
                <dt><label class="title">联系方式</label></dt>
                <dd style="width: 250px"><span id="ca_phone"></span></dd>
                <dt><label class="title">被投诉次数</label></dt>
                <dd style="width: 150px"><span id="er_count"></span><span>次</span></dd>
            </dl>
            <dl>
                <dt><label class="title">申诉说明</label></dt>
                <dd style="width: 600px;height: auto"><span style="position: relative;top: 5px;line-height: 28px" id="ap_explain"><</span></dd>
            </dl>
            <div class="line-box"></div>
            <div class="content_text_title">
                <div class="title_content"><i></i><label>申诉结果</label></div>
               
            </div>
            <dl>
                <dt><label class="title">申诉结果</label></dt>
                <dd style="width: 200px">
                    <select name="ap_state" >
                        <option>请选择申诉结果</option>
                        <option value="1">处理中</option>
                        <option value="2">申诉成功</option>
                        <option value="3">申诉失败</option>
                     </select>
                </dd>
            </dl>
            <dl style="margin-top: 20px">
                <dt><label class="title"></label></dt>
                <dd style="width: 250px">
                    <button  id="submit" onclick="submit()">处理</button>
                </dd>
            </dl>
            <div class="manage-subtitle_bottom"><span></span></div>
        </div>
    </div>
</div>
</body>
</html>