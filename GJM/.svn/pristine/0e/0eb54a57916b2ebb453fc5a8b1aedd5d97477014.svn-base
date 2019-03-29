<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>短信模板</title>
</head>
<link href="/resources/css/common/common.css" rel="stylesheet" type="text/css">
<link href="/resources/css/customer/userMessageModel.css" rel="stylesheet" type="text/css">
<link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"><!-- 字体样式 -->

<script src="/resources/js/jquery-1.7.2.min.js"></script>
<script src="/resources/js/common/common.js"></script><!-- 公共插件 -->
<script src="/resources/js/customer/userMessageModel.js?v=1.0"></script><!-- 公共插件 -->
<script src="/resources/js/product/jquery-cookie.js"></script><!-- COOKIE -->
<body>
	<div class="contents">
		<div class="content">
			<div class="content-title">
				<div class="content-title-font">短信模板<a href="javascript:;" onclick="addMoDiv()">添加模板</a>
				</div>
			</div>
			<div class="content-text">
				<!-- <div class="content-mo">
					<div class="content-mo-title">生日短信 <i class="fa fa-minus-square" onclick="deleteDiv(this)"></i><a href="javascript:;">修改</a></div>
					<div class="content-mo-content">
						<div class="content-mo-text">
							成长的岁月里有烦恼有快乐，前进的道路上有荆棘有花朵，脑海的印记中有慢曲有欢歌。 你生日的这天里，有我的祝福有我的问候：祝开开心心，心想事成
						</div>
						<div class="content-mo-date">
							2016-08-15
						</div>
						<div class="content-mo-name">
							陈智颖
						</div>
					</div>
				</div> -->
			</div>
			<div class="content-edit" style="display: none;">
				<input type="hidden" value="" id="mm_id" />
				<dl>
					<dt>模板名称</dt>
					<dd><input type="text" id="moName" /></dd>
				</dl>
				<dl style="height: auto;">
					<dt>模板名称</dt>
					<dd onkeyup="specialContent(this,event)">
						<div contenteditable="true" style="min-height: 150px; width: 445px; font-size: 14px; padding-top: 2px;" id="textarea"  >
							
						</div>
						<div class="selectName" style="display: none;">
							<dl>
								<dd data-type="sendPerson">发送人</dd>
							</dl>
							<dl>
								<dd data-type="code">验证码</dd>
							</dl>
						</div>
					</dd>
				</dl>
				<button style="margin-left: 119px; margin-bottom: 20px;" onclick="submit()">提交</button>
			</div>
		</div>
	</div>
</body>
</html>