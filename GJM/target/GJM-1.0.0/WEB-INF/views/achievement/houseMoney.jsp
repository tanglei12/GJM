<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%
	response.setHeader("Pragma","No-cache");
	response.setHeader("Cache-Control","no-cache");
	response.setDateHeader("Expires", -10);
%>
<!DOCTYPE html>
<html>
<head>
<title>房屋利润</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="Expires" CONTENT="0">
<meta http-equiv="Cache-Control" CONTENT="no-cache">
<meta http-equiv="Pragma" CONTENT="no-cache">
<!-- CSS样式 -->
<link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"><!-- 字体图标 -->
<link href="/resources/css/table-min.css" rel="stylesheet" type="text/css" /><!-- 表格样式 -->
<link href="/resources/css/manage_index.css" rel="stylesheet" type="text/css">
<link href="/resources/common/sweet-alert/css/sweet-alert.css" rel="stylesheet" type="text/css">
<link href="/resources/common/swipeslider-develop/dist/swipeslider.css" rel="stylesheet" type="text/css">
<link href="/resources/css/body.css" rel="stylesheet" type="text/css">
<link href="/resources/css/achievement/HouseMoney.css" rel="stylesheet" type="text/css">
<!-- JS脚本 -->
<script src="/resources/js/jquery-1.7.2.min.js"></script>
<script src="/resources/js/common/common.js"></script>
<script src="/resources/js/table-min.js"></script><!-- 表格公共js -->
<script src="/resources/js/jquery.freezeheader.js"></script><!-- 表头固定 -->
<script src="/resources/common/sweet-alert/js/sweet-alert.min.js"></script><!-- 提示弹窗 -->
<script src="/resources/common/My97DatePicker/WdatePicker.js"></script>
<script src="/resources/js/product/jquery-cookie.js"></script><!-- COOKIE -->
<script src="/resources/js/achievement/HouseMoney.js"></script>
<!-- 日期控件 -->
<script src="/resources/common/My97DatePicker/WdatePicker.js"></script>
</head>
<style>
#content{
    padding: 14px 12px;
    min-width: 1405px;
}
.fa-home{
	font-size: 15px;
	color: #3498DB;
	margin-top: 10px;
}
a{
text-indent: 2px;
color:#666;
}
</style>
<body>
<div id="content">
	<div class="search-div">
		<div class="tools">
			<ul class="searchBar">
				<li><select class="form-control" id="dateSelect" style="height: 40px;"><option value="contractObject_Date">起始时间</option></select></li>
				<li class="timeClick mouseDown" name="time">全部</li><li class="timeClick" name="time">今天</li><li class="timeClick" name="time">最近一周</li>
				<li class="timeClick" name="time">最近一月</li><li class="timeClick" name="times" style="margin-right: 0;">自定义日期</li>
				<li class="inputTime"><div class="dateTimeTitle"><i class="fa fa-calendar"></i><div class="dateTimeContent"><input type="text" class="dateTime1"><i class="dateTimeC"></i><input type="text" class="dateTime2"></div></div></li>
			</ul>
			<ul style="float: left;">
			</ul>
		</div>
	</div>
	<!-- 数据读取 -->
	<div class="HouseMoney_title">
		<div class="houseTitle">
			<label class="titleFont">重庆管家婆</label>
			<label class="titleDate">全部时间</label>
		</div>
		<div class="houseContent">
			<label class="sumMoney">收入合计：<label style="color:#FF6666" class="sumMoneyFont">00.00</label>元</label>
			<label class="sMoney">直接收入：<label class="sMoneyFont">00.00</label>元</label>
			<label class="fMoney">间接收入：<label class="fMoneyFont">00.00</label>元</label>
		</div>
	</div>
	<div class="houseBody">
		<table class="table personTable">
			<thead>
				<tr>
					<th style="width:33px;"><label class="checkbox-min"><input type="checkbox" class="input_check" name="check"/><span></span></label></th>
					<th>编号</th>
					<th>房源地址</th>
					<th>租金差价</th>
					<th>空置期盈亏</th>
					<th>服务费</th>
					<th>清洁费</th>
					<th>维修费</th>
					<th>违约金</th>
					<th>转租费</th>
					<th title="物管、水、电、气">其他费用</th>
					<th>收入</th>
				</tr>
			</thead>
			<tbody>
			</tbody>
		</table>
	</div>
</div>
</body>
</html>