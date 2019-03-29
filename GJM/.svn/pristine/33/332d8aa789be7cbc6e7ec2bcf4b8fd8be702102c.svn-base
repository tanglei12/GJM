<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	response.setHeader("Pragma", "No-cache");
	response.setHeader("Cache-Control", "no-cache");
	response.setDateHeader("Expires", -10);
%>
<!DOCTYPE>
<html>
<head>
<meta charset="UTF-8">
<meta http-equiv="Expires" CONTENT="0">
<meta http-equiv="Cache-Control" CONTENT="no-cache">
<meta http-equiv="Pragma" CONTENT="no-cache">
    <title>预约模板管理</title>
  </head>
<!-- 底部 css样式 -->
<link href="/resources/css/common/common.css" rel="stylesheet" type="text/css">
<link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">
<link href="/resources/css/common/page.list.css" rel="stylesheet" type="text/css">
<link href="/resources/css/financeManage/orderBillList2.css" rel="stylesheet" type="text/css">

<script src="/resources/js/jquery-1.7.2.min.js"></script>
<script src="/resources/common/My97DatePicker/WdatePicker.js"></script>
<script src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
<script src="/resources/js/product/jquery-cookie.js"></script>
<script src="/resources/js/common/common.js"></script>
<script src="/resources/print/LodopFuncs.js"></script>
<script src="/resources/js/book/houseBookTemplateManage.js"></script>

<!-- jBox -->
<script charset="utf-8" src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
<script charset="utf-8" src="/resources/Plug-in/jbox-v2.3/jBox/i18n/jquery.jBox-zh-CN.js"></script>
<!-- cookie -->
<script src="/resources/js/product/jquery-cookie.js"></script>
</head>
<body>
	<div id="orderPrint" style="display: none;"></div>
	<div class="list-table">
		<!-- 操作 -->
		<div class="list-table-head">
			<ul>
				<li>
					<input type="button" class="searchBar ok-bg" style="border: none" onclick="ck_add();" value="添 加">
				</li>
				<li>
					<input type="button" class="searchBar ok-bg" style="border: none" onclick="ck();" value="修 改">
				</li>
			</ul>
		</div>
		<!-- 列表 -->
		<div class="list-table-content">
			<table class="tablelist" id="tableData">
				<thead>
					<tr>
						<td>
							<label class="table-checkbox-box"><input type="checkbox" name="table-checkbox" data-type="all"></label>
						</td>
						<td style="width: 40px;">编号</td>
						<td style="width: 180px;">模板名称</td>
						<td style="width: 84px;">模板用途</td>
						<td style="width: 84px;">模板状态</td>
						<td style="text-align: left;">模板描述</td>
						<td style="width: 84px;">发布日期</td>
						<td style="width: 84px;">操作</td>
					</tr>
				</thead>
				<tbody id="list-table-tbody"></tbody>
			</table>
		</div>
		<div class="list-table-foot">
			<div class="foot-page-info">
				第&nbsp;<span id="pageNo">1</span>&nbsp;页，共&nbsp;<span id="totalPage"></span>&nbsp;页，共 <span id="totalRecords"></span>条记录
			</div>
			<div class="foot-page-option"></div>
		</div>
	</div>
</body>
</html>
