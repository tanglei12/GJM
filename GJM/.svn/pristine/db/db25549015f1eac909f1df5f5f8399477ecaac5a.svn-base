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
<title>部门利润</title>
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
td,th{
	border:1px solid #CCCCCC;
}
thead td{
	text-align: center;
}
</style>
<body>
<div id="content">
	<div class="search-div">
		<div class="tools">
			<ul class="searchBar">
				<li><select class="form-control" id="dateSelect" style="height: 40px;"><option value="extractDate">提取时间</option></select></li>
				<li class="timeClick mouseDown" name="time">全部</li><li class="timeClick" name="time">今天</li><li class="timeClick" name="time">最近一周</li>
				<li class="timeClick" name="time">最近一月</li><li class="timeClick" name="times" style="margin-right: 0;">自定义日期</li>
				<li class="inputTime"><div class="dateTimeTitle"><i class="fa fa-calendar"></i><div class="dateTimeContent"><input type="text" class="dateTime1"><i class="dateTimeC"></i><input type="text" class="dateTime2"></div></div></li>
			</ul>
			<ul style="float: left; " class="toolbar">
				<li class="click" onclick="outdata()"><i class="fa-newspaper-o"></i><a href="javascript:;">导出数据</a></li>
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
			<ul>
				<li style="font-size: 15px;">
					总利润=收入-(支出+亏损+税费)
				</li>
				<li style="margin-top: 10px;">
					<label class="fMoney">总利润：<label class="sumMoneyFont" style="color: #FF6666;">00.00</label>元</label>
					<label class="sMoney" style="display: none;">直接收入：<label class="sMoneyFont">00.00</label>元</label>
					<label class="fMoney" style="display: none;">间接收入：<label class="fMoneyFont">00.00</label>元</label>
					<label class="fMoney">收入：<label class="sIncome">(直：间：)</label>元</label>
					<label class="sMoney">支出：<label class="sExpenditure">(直：间：)</label>元</label>
					<label class="fMoney">亏损：<label class="sLoss">(直：间：)</label>元</label>
					<label class="fMoney">税费：<label class="sTaxation">(直：间：)</label>元</label>
					<label class="fMoney">7月以前招租损失：<label class="julyMoney">00.00</label>元(总收入未计入)</label>
				</li>
			</ul>
		</div>
	</div>
	<div class="houseBody">
		<table class="personTable">
			<thead>
				<tr style="background: #FFFFFF; color: #666666;">
					<th colspan="4" style="border:1px solid #CCCCCC;"></th>
					<th colspan="7" style="text-align: center; border:1px solid #CCCCCC;">收入</th>
					<th colspan="13" style="text-align: center; border:1px solid #CCCCCC;">支出</th>
					<th colspan="3" style="text-align: center; border:1px solid #CCCCCC;">亏损</th>
					<th colspan="1" style="text-align: center; border:1px solid #CCCCCC;">税费</th>
					<th colspan="1" style="text-align: center; border:1px solid #CCCCCC;">利润</th>
				</tr>
				<tr>
					<th style="width:33px;"><label class="checkbox-min"><input type="checkbox" class="input_check" name="check"/><span></span></label></th>
					<th>编号</th>
					<th>房源地址</th>
					<th>类型</th>
					<th>租金差价</th>
					<th>免租期</th>
					<th>管理费</th>
					<th>服务费</th>
					<th title="强收、强退、房东违约、定金违约">违约金</th>
					<th>转租费</th>
					<th>小计</th>
					<th>合作费</th>
					<th>清洁费</th>
					<th>维修费</th>
					<th>物品配置</th>
					<th>出房提成</th>
					<th>保险</th>
					<th>管理费</th>
					<th>违约金</th>
					<th>经营费用</th>
					<th>服务费提成</th>
					<th>门店基金</th>
					<th>门店奖金</th>
					<th>小计</th>
					<th>空置期亏损</th>
					<th title="物管、水、电、气">其他费用</th>
					<th>小计</th>
					<th>税费</th>
					<th>利润</th>
				</tr>
			</thead>
			<tbody>
			</tbody>
		</table>
	</div>
</div>
</body>
</html>