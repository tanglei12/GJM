<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "
http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%--<jsp:include page="/WEB-INF/views/scrf/scrf.jsp"/>--%>
<html>
<head>
    <meta charset="UTF-8">
    <title>房管员注册审核</title>
    <link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/datepicker/jquery-ui.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/common/common.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/common/page.list.css" rel="stylesheet" type="text/css">
    <link href="/resources/js/zkd/viewer/css/viewer.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/zkd/agentExamine.css?v=<%=System.currentTimeMillis()%>" rel="stylesheet" type="text/css"/>

    <script src="/resources/js/jquery-1.7.2.min.js"></script>
    <script src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
    <script src="/resources/common/My97DatePicker/WdatePicker.js"></script>
    <script src="/resources/common/datepicker/js/jquery-ui-datepicker.js"></script>
    <script src="/resources/js/product/jquery-cookie.js"></script>
    <script src="/resources/js/common/common.js"></script>
    <script src="/resources/js/common/common.hint.js"></script>
    <script src="/resources/js/common/common.state.js"></script>
    <script src="/resources/js/zkd/viewer/js/viewer.min.js"></script>
    <script src="/resources/js/zkd/agentExamine.js?v=<%=System.currentTimeMillis()%>"></script>

</head>
<body>
<div class="center_box">
    <div class="main-box-1">
        <div class="manage-subtitle"><span
                id="er_name_title"></span><%--<span style="position: absolute;right: 40px;cursor: pointer;color:#02d3aa"><img style="width: 18px;position: relative;top: 3px" src="/resources/image/zkd/ic_edit.png" alt=""/>&nbsp;&nbsp;编辑</span>--%><%--<span style="position: absolute;right: 40px;cursor: pointer;color:#02d3aa"><img style="width: 18px;position: relative;top: 3px" src="/resources/image/zkd/ic_edit.png" alt=""/>&nbsp;&nbsp;编辑</span>--%>
        </div>
        <div class="content_text">
            <div class="content_text_title">
                <div class="title_content"><i></i><label>基础信息</label></div>

            </div>
            <dl style="width: 65%; margin-left: 14px">
                <dt style="width: 157px;"><label class="title" style="width: 140px;">房管员姓名</label></dt>
                <dd><span id="ca_name"></span></dd>
            </dl>
            <dl style="width: 65%; margin-left: 14px">
                <dt style="width: 157px;"><label class="title" style="width: 140px;">联系电话</label></dt>
                <dd><span id="ca_phone"></span></dd>
            </dl>
            <dl style="width: 65%; margin-left: 14px">
                <dt style="width: 157px;"><label class="title" style="width: 140px;">所属企业</label></dt>
                <dd><span id="ca_remark"></span></dd>
            </dl>
            <dl style="margin-left: 70px; margin-bottom: 10px;">
                <dt style="width: 100px;"><label class="title" style="width: 84px;">头像</label></dt>
                <dd style="overflow: hidden; height: auto" id="er_bnusinessLicenseimage_box">
                    <div class="uploadImage">
                        <div class="image_div">
                            <img id="ca_headImage" class="imageDown" src="">
                        </div>
                    </div>
                </dd>
            </dl>
            <div class="content_text_title">
                <div class="title_content"><i></i><label>房管员实名</label></div>

            </div>
            <dl style="width: 65%; margin-left: 14px">
                <dt style="width: 157px;"><label class="title" style="width: 102px;">真实姓名</label></dt>
                <dd><span id="cai_name"></span></dd>
            </dl>
            <dl style="width: 65%; margin-left: 14px">
                <dt style="width: 157px;"><label class="title" style="width: 102px;">身份证号码</label></dt>
                <dd><span id="cai_number"></span></dd>
            </dl>
            <dl style="margin-left: 70px; margin-bottom: 10px; width: 44%">
                <dt style="width: 100px;"><label class="title" style="width: 44px;">身份证</label></dt>
                <dd>个人信息页<label style="margin-left: 82px;">国徽</label></dd>
            </dl>
            <dl style="margin-top: 0px; overflow: hidden; width: 70%">
                <dt></dt>
                <dd style="overflow: hidden; height: auto">

                    <div class="uploadImage">
                        <div class="image_div">
                            <img id="cai_positiveImage" class="imageDown" src="">
                        </div>
                    </div>
                    <div class="uploadImage" style="margin-left: 41px">
                        <div class="image_div">
                            <img id="cai_oppositeImage" class="imageDown" src="">
                        </div>
                    </div>
                </dd>
            </dl>
            <div class="line-box"></div>
            <div class="content_text_title">
                <div class="title_content"><i></i><label>审核结果</label></div>

            </div>
            <dl style="width: 65%; margin-left: 14px" id="er_state_box">
                <dt style="width: 157px;"><label class="title" style="width: 140px;">审核状态</label></dt>
                <dd>
                    <select name="ca_state" style="width: 200px">
                        <option value="3">通过</option>
                        <option value="0">未通过</option>
                    </select>
                </dd>
            </dl>

            <dl style="width: 65%; margin-left: 14px">
                <dt style="width: 157px;"><label class="title" style="width: 140px;"></label></dt>
                <dd>
                    <button class="" id="submit" onclick="submit()" style="width: 200px">审核</button>
                </dd>
            </dl>
            <div class="manage-subtitle_bottom"><span></span></div>
        </div>
    </div>
</div>
</body>
</html>