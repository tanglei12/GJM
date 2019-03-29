<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>无标题文档</title>
<link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href="/resources/common/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href="/resources/common/sweet-alert/css/sweet-alert.css" rel="stylesheet" type="text/css">
<link href="/resources/css/table-min.css" rel="stylesheet" type="text/css" /><!-- 表格样式 -->
<link href="/resources/css/authorization/employeeManage.css" rel="stylesheet" type="text/css">

<script src="/resources/js/jquery-1.7.2.min.js"></script>
<script src="/resources/js/common/common.js"></script>
<script src="/resources/common/sweet-alert/js/sweet-alert.min.js"></script><!-- 提示弹窗 -->
<script src="/resources/js/jquery.cookie.js"></script>
<script src="/resources/js/table-min.js"></script><!-- 表格公共js -->
<script src="/resources/js/common/image-upload2.js"></script>
<script src="/resources/js/authorization/employeeManage.js"></script>
</head>
<body>
	<div class="center">
		<div class="title">
			<i class="fa fa-group"></i> <label class="title-font">用户管理</label>
		</div>
		<div class="menu">
			<ul>
				<li class="clicks">用户管理<i class="bottom-triangle"></i></li>
			</ul>
		</div>
		<div class="content">
			<div class="content-operation">
			
			</div>
			<div class="search-div">
				<input type="text" placeholder="请输入员工姓名/电话/账号" onblur="searchEmp(this)"/>
				<i class="fa fa-search"></i>
			</div>
			<div class="table-public">
				<!-- 数据读取 -->
			</div>
			<div class="addPerson">
				<span class="addPerson-close" onclick="closeAddperson()"><i class="fa fa-close"></i></span>
				<div class="addPerson-title">添加人员</div>
				<dl>
					<dt>账号</dt>
					<dd><input type="text" id="account" /></dd>
				</dl>
				<dl>
					<dt>姓名</dt>
					<dd><input type="text" id="userName" /></dd>
				</dl>
				<dl>
					<dt>联系电话</dt>
					<dd><input type="text" id="userPhone" /></dd>
				</dl>
				<dl>
					<dt>身份证号码</dt>
					<dd><input type="text" id="IDCard" style="width: 234px;" onkeyup="isCards(this)" /></dd>
				</dl>
				<dl>
					<dt>用户住址</dt>
					<dd><input type="text" id="userAddress" style="background-color: #FFF; width: 234px;" /></dd>
				</dl>
				<dl>
					<dt>性别</dt>
					<dd id="userSex">
						<label class="checkbox-a"><input type="radio" class="input_check" name="sex" checked="checked"/><span></span><i>男</i></label>
						<label class="checkbox-a"><input type="radio" class="input_check" name="sex"/><span></span><i>女</i></label>
					</dd>
				</dl>
				<input type="hidden" id="em_idU">
				<div class="box-content" style="width: 330px;margin-left:13px;margin-top:20px;">
					<div class="sub-title"><ul class="title-nav"><li class="visited">电子名片</li></ul></div>
					<div class="sub-content" style="padding-left: 13px; width: 310px; padding: 10px;"><div class="image-upload-box image-card-div"><label class="image-item-add" for="house-image"><input type="file" id="house-image" accept="image/jpg;image/png;image/gif"></label></div></div>
				</div>
				<button class="button-a" onclick="addEmployee()">确定</button>
				<button class="button-a" onclick="updateEmployee()">修改</button>
			</div>
		</div>
	</div>
</body>
</html>