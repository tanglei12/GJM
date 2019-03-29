<%@ page language="java" pageEncoding="utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%
    response.setHeader("Pragma", "No-cache");
    response.setHeader("Cache-Control", "no-cache");
    response.setDateHeader("Expires", -10);
%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="Expires" CONTENT="0">
    <meta http-equiv="Cache-Control" CONTENT="no-cache">
    <meta http-equiv="Pragma" CONTENT="no-cache">
    <!-- 公共CSS -->
    <link href="/resources/css/manage_index.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/sweet-alert/css/sweet-alert.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/body.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/customer/userAuth.css" rel="stylesheet" type="text/css">
    <!-- 公共JS -->
    <script src="/resources/js/jquery-1.7.2.min.js"></script>
    <script src="/resources/common/sweet-alert/js/sweet-alert.min.js"></script><!-- 提示弹窗 -->
</head>
<body>
<!-- 主体 -->
<div id="main-box">
    <div class="main-box-sub">
        <div class="main-box-title">用户基本信息</div>
        <div class="main-box-content">
            <input type="hidden" id="user_id" value="${userAuthListVo.user_id}">
            <input type="hidden" id="userVerify_id" value="${userAuthListVo.userVerify_id}">
            <dl class="main-box-list">
                <dt class="item"><span class="item-titile">账号</span></dt>
                <dd class="item">${userAuthListVo.user_account}</dd>
            </dl>
            <dl class="main-box-list">
                <dt class="item"><span class="item-titile">用户类型</span></dt>
                <dd class="item">${userAuthListVo.user_type}</dd>
            </dl>
            <hr>
            <dl class="main-box-list">
                <dt class="item"><span class="item-titile">手机号码</span></dt>
                <dd class="item" id="user_phone">${userAuthListVo.user_phone}</dd>
            </dl>
            <dl class="main-box-list">
                <dt class="item"><span class="item-titile">性别</span></dt>
                <dd class="item">${userAuthListVo.user_sex}</dd>
            </dl>
            <hr>
            <dl class="main-box-list">
                <dt class="item"><span class="item-titile">状态</span></dt>
                <dd class="item"><c:if test="${userAuthListVo.user_state==0}"><span>正常</span></c:if><c:if test="${userAuthListVo.user_state==1}"><span style="color: #f00;">异常</span></c:if></dd>
            </dl>
        </div>
        <div class="main-box-title">认证提交信息</div>
        <div class="main-box-content">
            <dl class="main-box-list">
                <dt class="item"><span class="item-titile">姓名</span></dt>
                <dd class="item" id="realName">${userAuthListVo.userVerify_cardUserName}</dd>
            </dl>
            <dl class="main-box-list">
                <dt class="item"><span class="item-titile">身份证</span></dt>
                <dd class="item" id="cnum">${userAuthListVo.userVerify_cardNumber}</dd>
            </dl>
            <hr>
            <dl class="main-box-list">
                <dt class="item"><span class="item-titile">证件正面照</span></dt>
                <dd class="item">
                    <c:if test="${empty userAuthListVo.userVerify_cardPicPath1}">
                        没有图片
                    </c:if>
                    <c:if test="${!empty userAuthListVo.userVerify_cardPicPath1}">
                        <img id="userVerify_cardPicPath1" style="position: relative; top: 11px;width: 260px;height: 166px;" src="${userAuthListVo.userVerify_cardPicPath1}"/>
                    </c:if>
                </dd>
            </dl>
            <dl class="main-box-list">
                <dt class="item"><span class="item-titile">证件背面照</span></dt>
                <dd class="item">
                    <c:if test="${empty userAuthListVo.userVerify_cardPicPath1}">
                        没有图片
                    </c:if>
                    <c:if test="${!empty userAuthListVo.userVerify_cardPicPath1}">
                        <img id="userVerify_cardPicPath2" style="position: relative; top: 11px;width: 260px;height: 166px;" src="${userAuthListVo.userVerify_cardPicPath2}"/>
                    </c:if>
                </dd>
            </dl>
            <hr>
            <dl class="main-box-list">
                <dt class="item"><span class="item-titile">证件有效期</span></dt>
                <dd class="item">${userAuthListVo.userVerify_cardValid}</dd>
            </dl>
            <dl class="main-box-list">
                <dt class="item"><span class="item-titile">认证状态</span></dt>
                <dd class="item">${userAuthListVo.userVerify_state}</dd>
            </dl>
            <hr>
            <dl class="main-box-list">
                <dt class="item"><span class="item-titile">备注</span></dt>
                <dd class="item">${userAuthListVo.userVerify_remark}</dd>
            </dl>
            <hr>
        </div>
        <div class="main-box-title">租房/托管记录</div>
        <div class="main-box-content">
            <input type="hidden" id="contractObject_Id" value="${contractVo.contractObject_Id}">
            <input type="hidden" id="contractSign_Id" value="${contractSign.contractSign_Id}">
            <c:if test="${empty contractVo}">
                <dl class="main-box-list">
                    <dt class="item"><span class="item-titile"></span></dt>
                    <dd class="item">无</dd>
                </dl>
                <hr>
            </c:if>
            <c:if test="${!empty contractVo}">
                <dl class="main-box-list">
                    <dt class="item"><span class="item-titile">房屋地址</span></dt>
                    <dd class="item">${contractVo.propertyInfo_address}${contractVo.hi_address}<em class="error">（房屋编号：${contractVo.hi_code}）</em></dd>
                </dl>
                <hr>
                <dl class="main-box-list">
                    <dt class="item"><span class="item-titile">合同类型</span></dt>
                    <dd class="item">${contractVo.contractObject_Type}</dd>
                </dl>
                <dl class="main-box-list">
                    <dt class="item"><span class="item-titile">审核状态</span></dt>
                    <dd class="item">${contractVo.contractObject_OptionState}</dd>
                </dl>
                <hr>
                <dl class="main-box-list">
                    <dt class="item"><span class="item-titile">甲方</span></dt>
                    <dd class="item" id="aName">${contractVo.contractObject_A}</dd>
                </dl>
                <dl class="main-box-list">
                    <dt class="item"><span class="item-titile">合同编号</span></dt>
                    <dd class="item">${contractVo.contractObject_No}</dd>
                </dl>
                <hr>
                <dl class="main-box-list">
                    <dt class="item"><span class="item-titile">手机号码</span></dt>
                    <dd class="item">${contractVo.contractSign_Phone}</dd>
                </dl>
                <dl class="main-box-list">
                    <dt class="item"><span class="item-titile">身份证</span></dt>
                    <dd class="item">${contractVo.contractSign_CarNo}</dd>
                </dl>
                <hr>
                <dl class="main-box-list">
                    <dt class="item"><span class="item-titile">证件正面照</span></dt>
                    <dd class="item"><img id="contractSign_cardPicPath1" style="position: relative; top: 11px;width: 260px;height: 166px;" src="${CD1IMG}"/></dd>
                </dl>
                <dl class="main-box-list">
                    <dt class="item"><span class="item-titile">证件背面照</span></dt>
                    <dd class="item"><img id="contractSign_cardPicPath2" style="position: relative; top: 11px;width: 260px;height: 166px;" src="${CD2IMG}"/></dd>
                </dl>
                <hr>
            </c:if>
        </div>
        <c:if test="${userAuthListVo.userVerify_state == '认证中'}">
            <div class="main-box-title">处理结果</div>
            <div class="main-box-content">
                <dl class="main-box-list">
                    <dt class="item"><em>*</em><span class="item-titile">审核方式</span></dt>
                    <dd class="item">
                        <select class="form-control" id="authChoose" onchange="changeAuth(this)">
                            <option value="认证成功">认证成功</option>
                            <option value="认证失败">认证失败</option>
                        </select>
                    </dd>
                    <dd class="tisp"></dd>
                </dl>
                <hr>
                <dl class="main-box-list" id="failBox" style="display: none;">
                    <dt class="item"><em>*</em><span class="item-titile">原因</span></dt>
                    <dd class="item"><textarea id="failContent" class="form-control" style="width: 350px;height: 94px;"></textarea></dd>
                    <dd class="tisp"></dd>
                </dl>
                <hr>
            </div>
            <div class="main-box-footer">
                <dl class="main-box-list">
                    <dt class="item">&nbsp;</dt>
                    <dd class="item">
                        <input type="button" value="提交" class="btn" onclick="authSubmit(this)"/>
                    </dd>
                    <dd class="item">
                        <a href="/customer/userAuthList" class="btn" id="cancelBtn">取消</a>
                    </dd>
                </dl>
            </div>
        </c:if>
    </div>
</div>
<script src="/resources/js/customer/userAuth.js"></script>
<script type="text/javascript">
    function changeAuth(obj) {
        if ($(obj).val() == "认证失败") {
            $("#failBox").show();
        } else {
            $("#failBox").hide();
            $("#failContent").parent().siblings(".tisp").empty().removeClass("error");
        }
    }

    function authSubmit(obj) {
        if (!$("#failContent").is(":hidden")) {
            var $authVal = $("#failContent").val();
            if (isEmpty($authVal)) {
                $("#failContent").parent().siblings(".tisp").text("请填写原因").addClass("error");
                return;
            }
        }
        var realName = "";
        if (isEmpty($("#realName").text())) {
            realName = $("#aName").text();
        } else {
            realName = $("#realName").text()
        }
        var cardPicPath1 = "";
        var cardPicPath2 = "";
        if (!isEmpty($("#contractSign_Id").val()) && !isEmpty($("#contractObject_Id").val())) {
            if (isEmpty($("#userVerify_cardPicPath1").val())) {
                cardPicPath1 = $("#contractSign_cardPicPath1").attr("src");
            }
            if (isEmpty($("#userVerify_cardPicPath2").val())) {
                cardPicPath2 = $("#contractSign_cardPicPath2").attr("src");
            }
        }
        $.ajax({
            type: "POST",
            url: "/submitAuthResult",
            data: {
                auth: $("#authChoose").val(),
                content: $("#failContent").val(),
                user_id: $("#user_id").val(),
                userVerify_id: $("#userVerify_id").val(),
                user_realName: $.trim(realName),
                user_cardNumber: $.trim($("#cnum").text()),
                user_phone: $.trim($("#user_phone").text()),
                userVerify_cardPicPath1: cardPicPath1,
                userVerify_cardPicPath2: cardPicPath2,
                contractSign_Id: $("#contractSign_Id").val(),
            },
            dataType: "json"
        }).done(function (result) {
            if (result.code == 200) {
                swal({title: result.msg, type: "success"}, function () {
                    window.location.href = $("#cancelBtn").attr("href");
                });
            } else {
                swal({title: result.msg, type: "warning"});
            }
        })
    }
</script>
</body>
</html>