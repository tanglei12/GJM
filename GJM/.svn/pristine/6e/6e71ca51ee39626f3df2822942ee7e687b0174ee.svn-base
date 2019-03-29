<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%
	response.setHeader("Pragma","No-cache");
	response.setHeader("Cache-Control","no-cache");
	response.setDateHeader("Expires", -10);
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="Expires" CONTENT="0">
<meta http-equiv="Cache-Control" CONTENT="no-cache">
<meta http-equiv="Pragma" CONTENT="no-cache">
<title>业绩统计</title>
<!-- CSS -->
<link href="/resources/css/manage_index.css" rel="stylesheet" type="text/css">
<link href="/resources/css/common/common.css" rel="stylesheet" type="text/css">
<link href="/resources/common/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"><!-- 字体图标 -->
<link href="/resources/common/datepicker/jquery-ui.css" rel="stylesheet" type="text/css"><!-- 日期插件 -->
<link href="/resources/common/zyupload/skins/zyupload-1.0.0.css" rel="stylesheet" type="text/css"><!-- 文件上传插件 -->
<link href="/resources/common/uber-zoom/uber-zoom.css" rel="stylesheet" type="text/css"><!-- 图片缩放 -->
<link href="/resources/common/sweet-alert/css/sweet-alert.css" rel="stylesheet" type="text/css"><!-- 提示弹窗 -->
<link href="/resources/common/perfect-scrollbar/css/perfect-scrollbar.min.css" rel="stylesheet" type="text/css"><!-- 自定义滚动条 -->
<link href="/resources/css/achievement/achievement.css" rel="stylesheet" type="text/css"><!-- 本地CSS -->
<!-- JS -->
<script src="/resources/js/jquery-1.7.2.min.js"></script>
<script src="/resources/js/manage_index_right.js"></script>
<script src="/resources/js/common/common.js"></script>
<script src="/resources/common/datepicker/js/jquery-ui-datepicker.js"></script><!-- 日期插件 -->
<script src="/resources/common/sweet-alert/js/sweet-alert.min.js"></script><!-- 提示弹窗 -->
<script src="/resources/common/perfect-scrollbar/js/perfect-scrollbar.jquery.js"></script><!-- 自定义滚动条 -->
<script src="/resources/js/product/jquery-cookie.js"></script><!-- COOKIE -->
<script src="/resources/Plug-in/jquery.rotate/jquery.rotate.min.js"></script>
<script src="/resources/common/uber-zoom/uber-zoom.js"></script><!-- 图片缩放 -->
<script src="/resources/common/zyupload/zyupload-1.0.0.js"></script><!-- 文件上传插件 -->
<script src="/resources/js/achievement/achievement.js"></script>
<c:if test="${empty employeePositionCompany}">
	<script type="text/javascript">$(function(){alert("身份验证失败，请重新登录");});</script>
</c:if>
<c:if test="${empty companyAchievement}">
	<script type="text/javascript">$(function(){$(".date-box").click()});</script>
</c:if>
<script type="text/javascript">
	mode = "${mode eq 'member'?'1':'0'}";
	isDisplayPeopleMore = "${mode eq 'member'?'true':'false'}";
</script>
</head>
<body style="background: #f7f7f7;">
<c:if test="${mode eq 'amaldar' or empty mode}"></c:if>
<c:if test="${mode eq 'director'}"><input type="hidden" id="ucc_id" value="${achievement.ucc_id}"></c:if>
<c:if test="${mode eq 'member'}"><input type="hidden" id="em_id" value="${achievementEmployee.em_id}"></c:if>
<!-- header -->
<div class="header-content">
	<div class="header-box">
		<div class="header-top">
			<!-- 标题 -->
			<c:if test="${mode eq 'amaldar' or empty mode}"><div class="header-top-title">业绩统计 - 总业绩</div></c:if>
			<c:if test="${mode eq 'director'}"><div class="header-top-title">业绩统计 - ${employeePositionCompany.ucc_name}</div></c:if>
			<c:if test="${mode eq 'member'}"><div class="header-top-title">业绩统计 - ${employeePositionCompany.em_name}</div></c:if>
			<!-- 操作 -->
			<div class="header-top-option">
				<div style="float: left;position: relative;">
					<i class="icon-calendar"></i>
					<button class="date-box">
						<span id="startDate" style="width: 84px;display: inline-block;"><fmt:formatDate value="${companyAchievement.ca_startDate}" pattern="yyyy-MM-dd"/></span>
						<span style="color: #ddd">|</span>
						<span id="endDate" style="width: 84px;display: inline-block;"><fmt:formatDate value="${companyAchievement.ca_endDate}" pattern="yyyy-MM-dd"/></span>
					</button>
					<div class="date-box-select"></div>
				</div>
				<c:if test="${mode eq 'amaldar'}">
					<button class="form-control" onclick="settingAchievement()">设置</button>
				</c:if>
			</div>
		</div>
		<div class="header-main">
			<!-- 主体显示内容 -->
			<div class="header-main-content">
				<fieldset>
					<legend class="legend-top"><img src="/resources/image/svg/vs.svg" style="width: 30px"></legend>
					<dl class="main-content-item">
						<dd><span class="money-font" style="font-size: 24px;"><fmt:formatNumber value="${empty sumAchievement.sa_sumMoney?0:sumAchievement.sa_sumMoney}" pattern="#,##0"/></span></dd>
						<dt>实际总业绩</dt>
					</dl>
					<dl class="main-content-item">
						<c:if test="${mode eq 'amaldar' or empty mode}"><dd><span class="money-font next" style="font-size: 24px;"><fmt:formatNumber value="${companyAchievement.ca_sum}" pattern="#,##0"/></span></dd></c:if>
						<c:if test="${mode eq 'director'}"><dd><span class="money-font next" style="font-size: 24px;"><fmt:formatNumber value="${achievement.ta_sum}" pattern="#,##0"/></span></dd></c:if>
						<c:if test="${mode eq 'member'}"><dd><span class="money-font next" style="font-size: 24px;"><fmt:formatNumber value="${achievementEmployee.pa_sum}" pattern="#,##0"/></span></dd></c:if>
						<dt>目标总业绩</dt>
					</dl>
					<div class="main-content-item">
						<div class="main-content-subitem1">
							<c:if test="${mode eq 'amaldar' or empty mode}"><span class="subitem-icon-box"><i id="new-achieve" style="width: <fmt:formatNumber value="${((achievementBill.newMoney)/companyAchievement.ca_sum)*100}" pattern="#0"/>%;max-width:100%;"></i></span></c:if>
							<c:if test="${mode eq 'director'}"><span class="subitem-icon-box"><i id="new-achieve" style="width: <fmt:formatNumber value="${((achievementBill.newMoney)/achievement.ta_sum)*100}" pattern="#0"/>%;max-width:100%;"></i></span></c:if>
							<c:if test="${mode eq 'member'}"><span class="subitem-icon-box"><i id="new-achieve" style="width: <fmt:formatNumber value="${((achievementBill.newMoney)/achievementEmployee.pa_sum)*100}" pattern="#0"/>%;max-width:100%;"></i></span></c:if>
						</div>
						<div class="main-content-subitem2" style="width: 30px;height: 30px;">
							<c:if test="${mode eq 'amaldar' or empty mode}"><span><fmt:formatNumber value="${((achievementBill.newMoney)/companyAchievement.ca_sum)*100}" pattern="#0"/>%</span></c:if>
							<c:if test="${mode eq 'director'}"><span><fmt:formatNumber value="${((achievementBill.newMoney)/achievement.ta_sum)*100}" pattern="#0"/>%</span></c:if>
							<c:if test="${mode eq 'member'}"><span><fmt:formatNumber value="${((achievementBill.newMoney)/achievementEmployee.pa_sum)*100}" pattern="#0"/>%</span></c:if>
						</div>
					</div>
				</fieldset>
				<fieldset>
					<legend class="legend-top"><img src="/resources/image/svg/vs.svg" style="width: 30px"></legend>
					<dl class="main-content-item">
						<dd><span class="money-font" style="font-size: 24px;"><fmt:formatNumber value="${empty sumAchievement.sa_newMoney?0:sumAchievement.sa_newMoney}" pattern="#,##0"/></span></dd>
						<dt>实际新业绩</dt>
					</dl>
					<dl class="main-content-item">
						<c:if test="${mode eq 'amaldar' or empty mode}"><dd><span class="money-font ok" style="font-size: 24px;"><fmt:formatNumber value="${companyAchievement.ca_new}" pattern="#,##0"/></span></dd></c:if>
						<c:if test="${mode eq 'director'}"><dd><span class="money-font ok" style="font-size: 24px;"><fmt:formatNumber value="${achievement.ta_new}" pattern="#,##0"/></span></dd></c:if>
						<c:if test="${mode eq 'member'}"><dd><span class="money-font ok" style="font-size: 24px;"><fmt:formatNumber value="${achievementEmployee.pa_new}" pattern="#,##0"/></span></dd></c:if>
						<dt>目标新业绩</dt>
					</dl>
					<div class="main-content-item">
						<div class="main-content-subitem1">
							<c:if test="${mode eq 'amaldar' or empty mode}"><span class="subitem-icon-box"><i id="new-achieve" style="width: <fmt:formatNumber value="${((achievementBill.newMoney)/companyAchievement.ca_new)*100}" pattern="#0"/>%;max-width:100%;"></i></span></c:if>
							<c:if test="${mode eq 'director'}"><span class="subitem-icon-box"><i id="new-achieve" style="width: <fmt:formatNumber value="${((achievementBill.newMoney)/achievement.ta_new)*100}" pattern="#0"/>%;max-width:100%;"></i></span></c:if>
							<c:if test="${mode eq 'member'}"><span class="subitem-icon-box"><i id="new-achieve" style="width: <fmt:formatNumber value="${((achievementBill.newMoney)/achievementEmployee.pa_new)*100}" pattern="#0"/>%;max-width:100%;"></i></span></c:if>
						</div>
						<div class="main-content-subitem2" style="width: 30px;height: 30px;">
							<c:if test="${mode eq 'amaldar' or empty mode}"><span><fmt:formatNumber value="${((achievementBill.newMoney)/companyAchievement.ca_new)*100}" pattern="#0"/>%</span></c:if>
							<c:if test="${mode eq 'director'}"><span><fmt:formatNumber value="${((achievementBill.newMoney)/achievement.ta_new)*100}" pattern="#0"/>%</span></c:if>
							<c:if test="${mode eq 'member'}"><span><fmt:formatNumber value="${((achievementBill.newMoney)/achievementEmployee.pa_new)*100}" pattern="#0"/>%</span></c:if>
						</div>
					</div>
				</fieldset>
			</div>
			<!-- 其他 -->
			<div class="header-main-more">
				<div style="margin-top: 16px;">
					<dl class="more-box-dl">
						<dt>亏损房屋</dt>
						<dd class="error"><fmt:formatNumber value="${empty achievementBill.lossHouseCount?0:achievementBill.lossHouseCount}" pattern="#0"/></dd>
						<dd class="suffix">套</dd>
					</dl>
					<dl class="more-box-dl">
						<dt>亏损业绩</dt>
						<dd class="error"><fmt:formatNumber value="${empty achievementBill.lossSumMoney?0:achievementBill.lossSumMoney}" pattern="#,##0"/></dd>
						<dd class="suffix">元</dd>
					</dl>
				</div>
			</div>
		</div>
	</div>
</div>
<div id="main-box" class="">
	<!-- Tab -->
	<div class="box-nav">
		<a class="nav-tab nav-tab-focus" href="#summary" onclick="changeTab(0)" data-id="${companyAchievement.ca_id}">部门概述</a>
		<a class="nav-tab" href="#achieve" onclick="changeTab(1)">房屋业绩</a>
		<a class="nav-tab" href="#people" onclick="changeTab(2)" data-id="${companyAchievement.ca_id}">${mode eq 'member'?'我的':'人员'}业绩</a>
	</div>
	<!-- 内容 -->
	<div id="main-summary" data-page="1">
		<div class="box-content" style="text-align: center;line-height: 100px;font-size: 18px;">加载中...</div>
	</div>
	<!-- scroll-top -->
	<div id="scroll-top"><i class="icon-angle-up"></i></div>
</div>
</body>
</html>