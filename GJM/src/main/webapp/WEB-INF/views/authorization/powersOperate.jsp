<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>无标题文档</title>
<link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href="/resources/common/sweet-alert/css/sweet-alert.css" rel="stylesheet" type="text/css">
<link href="/resources/css/authorization/powersOperate.css" rel="stylesheet" type="text/css">

<script src="/resources/js/jquery-1.7.2.min.js"></script>
<script src="/resources/js/common/common.js"></script>
<script src="/resources/js/common/jquery.validate.min.js"></script>
<script src="/resources/common/sweet-alert/js/sweet-alert.min.js"></script><!-- 提示弹窗 -->
<script src="/resources/js/authorization/powersOperate.js"></script>
</head>
<body>
	<div class="center">
		<div class="title">
			<i class="fa fa-group"></i>
			<label class="title-font">权限配置</label>
		</div>
		<div class="menu">
			<ul>
				<li class="clicks">权限管理<i class="bottom-triangle"></i></li>
			</ul>
		</div>
		<div class="content">
			<div class="content-operation">
			
			</div>
			<div class="content-center" id="content-center" >
				<div class="powersList" id="powersList">
		
				</div>
			</div>
			<div class="addPowers" id="addPowers">
				<span class="addPowers-close" onclick="closeAddPowers()"><i class="fa fa-close"></i></span>
				<div class="addPowers-title">添加权限</div>
				<form action="" id="listForm">
					<fieldset>
						<dl>
							<dt>权限名称</dt>
							<dd><input type="text" name="ucps_name" id="ucps_name" /></dd>
						</dl>
						<dl>
							<dt>权限操作</dt>
							<dd><input type="text" name="ucps_url" id="ucps_url" /></dd>
						</dl>
						<dl>
							<dt>权限图标</dt>
							<dd><input type="text" name="ucps_icon" id="ucps_icon" /></dd>
						</dl>
						<dl>
							<dt>权限类型</dt>
							<dd>
								<label class='checkbox-b'><input type='radio' class='input_check' name='ucps_type' value="1" checked="checked" /><span></span><i>查询权限</i></label>
								<label class='checkbox-b'><input type='radio' class='input_check' name='ucps_type' value="2"/><span></span><i>操作权限</i></label>
								<label class='checkbox-b' style="display:none;"><input type='radio' class='input_check' name='ucps_type' value="3"/><span></span><i>按钮权限</i></label>
							</dd>
						</dl>
						<input type="hidden" name="ucps_id" id="ucps_id"/>
						<input type="hidden" name="ucps_pid" id="ucps_pid"/>
						<input type="hidden" name="ucps_level" id="ucps_level"/>
						<input type="hidden" name="ucps_asc" id="ucps_asc"/>
						<button class="button-a">确定</button>
					</fieldset>
				</form>
			</div>
		</div>
	</div>
</body>
</html>