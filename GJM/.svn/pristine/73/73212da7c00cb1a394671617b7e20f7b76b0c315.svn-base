<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE>
<html>
<head>
<title>用户管理</title>
</head>
<link href="/resources/css/manage_index.css" rel="stylesheet" type="text/css">
<link href="/resources/css/print.css" rel="stylesheet" type="text/css">
<link href="/resources/css/ProjectManagement.css" rel="stylesheet" type="text/css">
<link href="/resources/css/body.css" rel="stylesheet" type="text/css">
<link href="/resources/css/perfect-scrollbar.css" rel="stylesheet" type="text/css">
<link href="/resources/css/select_xs.css" rel="stylesheet" type="text/css">
<link href="/resources/fancybox/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" media="screen" />
<link href="/resources/common/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

<script type="text/javascript" src="/resources/js/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="/resources/js/jquery.cookie.js"></script>
<script type="text/javascript" src="/resources/js/manage_index_right.js"></script>
<script type="text/javascript" src="/resources/js/userAdmin.js"></script>
<script type="text/javascript" src="/resources/js/jquery-smartMenu.js"></script>
<script type="text/javascript" src="/resources/fancybox/jquery.mousewheel-3.0.4.pack.js"></script>
<script type="text/javascript" src="/resources/fancybox/jquery.fancybox-1.3.4.pack.js"></script>
</head>
<body>
	<div id="contentDiv">
		<div class="rightinfo">
			<div class="tools">
				<ul class="toolbar">
					<li class="click">
						<span class="table-icon table-icon-update"></span><a href="javascript:;" onclick="functionIfram('/user/userEdit','增加用户','用户管理')">增加用户</a>
					</li>
				</ul>
				<ul class="searchBar">
					<li>
						<input type="text" id="orderInput" onblur="data()" placeholder="姓名/部门/电话/账号" />
					</li>
				</ul>
			</div>
			<div id="content">
				<div id="tableContent">
					<table class="tablelist" id="tableData">
						<thead>
							<tr>
								<td>
									<div class="checkbox checkbox-success" id="ck_all">
										<input id="checkbox0" type="checkbox">
										<label for="checkbox0" id="ckLabel"> </label>
									</div>
								</td>
								<td>
									编号
									<i class="sort">
										<a href="javascript:showHide_contentShow();"><img src="/resources/image/px.gif" /></a>
									</i>
									<div class="div_showHide">
										<i class="showHide_list"></i>
										<div class="showHide_content"></div>
									</div>
								</td>
								<td>姓名</td>
								<td>性别</td>
								<td>部门</td>
								<td>电话</td>
								<td>住址</td>
								<td>账号</td>
								<td>状态</td>
								<td>岗位</td>
							</tr>
						</thead>
						<tbody>
						</tbody>
					</table>
				</div>
			</div>
			<div class="pagin">
				<div class="message" style="border: 0px; margin-top: 0;">
					共
					<i class="blue" id="nums"></i>
					条记录，当前显示第&nbsp;
					<i class="blue" id="Num">1</i>
					&nbsp;页，共&nbsp;
					<i class="blue" id="sizeNum"></i>
					&nbsp;页&nbsp;
				</div>
				<ul class="paginList">

				</ul>
			</div>
		</div>
	</div>
	<div id="data"></div>
</body>
</html>
