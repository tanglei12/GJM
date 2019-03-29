<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>无标题文档</title>
<link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href="/resources/common/sweet-alert/css/sweet-alert.css" rel="stylesheet" type="text/css">
<link href="/resources/css/table-min.css" rel="stylesheet" type="text/css" /><!-- 表格样式 -->
<link href="/resources/css/authorization/roleManage.css" rel="stylesheet" type="text/css">

<script src="/resources/js/jquery-1.7.2.min.js"></script>
<script src="/resources/common/sweet-alert/js/sweet-alert.min.js"></script><!-- 提示弹窗 -->
<script src="/resources/js/common/jquery.validate.min.js"></script>
<script src="/resources/js/jquery.cookie.js"></script>
<script src="/resources/js/table-min.js"></script><!-- 表格公共js -->
<script src="/resources/js/authorization/roleManage.js"></script>
</head>
<body>
	<div class="center">
		<div class="title">
			<i class="fa fa-group"></i> <label class="title-font">角色管理</label>
		</div>
		<div class="menu">
			<ul>
				<li class="clicks">角色设置<i class="bottom-triangle"></i></li>
			</ul>
		</div>
		<div class="content">
			<div class="content-operation">
			
			</div>
			<div class="table-public">
				<!-- 数据读取 -->
			</div>
			<div class="addRole" id="addRole">
				<span class="addRole-close" onclick="closeAddRole()"><i
					class="fa fa-close"></i></span>
				<div class="addRole-title">添加角色</div>
				<form action="" id="listForm">
					<fieldset>
					<dl>
						<dt>角色名称</dt>
						<dd>
							<input type="text" name="ucr_name" id="ucr_name" />
						</dd>
					</dl>
					<dl>
						<dt>角色备注</dt>
						<dd>
							<input type="text" name="ucr_remarks" id="ucr_remarks" />
						</dd>
					</dl>
					<button class="button-a">确定</button>
					</fieldset>
				</form>
			</div>
			<div class="importPerson" id="importPerson">
				<input type="hidden" id="roleId" name="roleId" value=""/>
				<div class="title">
					<span class="title-left">人员导入</span>
					<span class="title-right" onclick="closeImportPerson()">X</span>
				</div>
				<div class="import" >
					<div class="import-left">
						<div class="import-left-top" id="roleName">java工程师(人员)</div>
						<ul id="imported">
							
						</ul>
					</div>
					<i class="fa fa-arrow-circle-left"></i>
					<div class="import-right">
						<div>
							<input type="text" class="personSearch" placeholder="员工姓名/联系电话" onkeyup="loadNotImported()" />
							<i class="fa fa-search"></i>
						</div>
						<ul id="notImported">
							
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>