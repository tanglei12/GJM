<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<title>服务信息</title>
<!-- 公共CSS -->
<%-- <link href="/resources/css/manage_index.css" rel="stylesheet" type="text/css"> --%>
<link href="/resources/css/body.css" rel="stylesheet" type="text/css">
<link href="/resources/css/serve/message.css" rel="stylesheet" type="text/css">
<link href="/resources/common/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">
<link href="/resources/common/sweet-alert/css/sweet-alert.css" rel="stylesheet" type="text/css">
<link href="/resources/common/imageUpload/css/jquery.image-upload.css" rel="stylesheet" type="text/css">

<!-- 公共JS -->
<script src="/resources/js/jquery-1.7.2.min.js"></script>
<script src="/resources/js/manage_index_right.js"></script>
<script src="/resources/common/sweet-alert/js/sweet-alert.min.js"></script><!-- 提示弹窗 -->
<script src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
<script src="/resources/js/product/jquery-cookie.js"></script><!-- cookie -->

<!-- 上传插件 -->
<script src="/resources/js/service/ajaxfileupload.js"></script>
<script src="/resources/common/imageUpload/js/jquery.image-upload1.js"></script>

<!-- UE编辑器 -->
<script src="/resources/umeditor/ueditor.config.js"></script>
<script src="/resources/umeditor/ueditor.all.min.js"></script>
<script src="/resources/umeditor/lang/zh-cn/zh-cn.js"></script>
<!-- 本地JS -->
<script src="/resources/js/service/serveMessage.js"></script>
<!-- 位置栏 -->
<style>
</style>
<div id="main-box">
	<div id="main-box-title">服务类型</div>
	<div id="main-box-content">
		<input type="hidden" id="hidden-id" data-id="${employee.em_id}">
		<c:forEach items="${serviceList}" var="item" varStatus="status">
			<div class="sub-main">
				<span id="sub_main_title${status.index}" class="sub_title">${item.sm_name}<a class="icon-cog" onclick="functionIfram('/service/updataMessage?id=${item.sm_id}','服务修改','服务信息');" href="javascript:;"></a><i class="icon-chevron-right"></i></span>
				<input type="hidden" class="pid" value="${item.sm_id}" data-name="${item.sm_name}">
				<c:forEach items="${serviceType}" var="item2" varStatus="status2">
					<c:if test="${item.sm_id == item2.sm_id}">
						<c:if test="${employee.em_id == item2.em_id}">
							<div class="sub-div">
								<input type="text" class="sub-input inputOK" data-href="${item2.redrict_path}" data-id="${item2.st_id}" value="${item2.st_name}" readonly onclick="openModel(this);" >
								<i onclick="delInput(this)"></i>
							</div>
						</c:if>
						<c:if test="${employee.em_id != item2.em_id}">
							<div class="sub-div">
								<input type="text" class="sub-input inputNo" data-href="${item2.redrict_path}" data-hid="${item2.st_id}" value="${item2.st_name}" readonly onclick="openModel(this)">
								<i onclick="delInput(this)"></i>
							</div>
						</c:if>
					</c:if>
				</c:forEach>
				<a class="add-label" onclick="newModel(this)" title="添加服务">+</a>
			</div>
		</c:forEach>
		<div class="sub-main" style="margin-bottom: 0;"><span onclick="addServiceType();">添加<i class="icon-plus"></i></span></div>
	</div>
</div>
<div class="project_content">
	<div class="project_bg"></div>
	<div class="project_content">
		<div class="project_title">服务项目内容<i onclick="project_close()"></i></div>
		<textarea name="project_content" id="project_content" style="width:95%;height:450px;margin:20px;"></textarea>
		<div class="content-box" id="plm-input"><div class="content-top"><div style="height:34px; line-height: 34px; text-align: left;"><label class="checkbox-min"><input type="radio" name="st_in" data-id="1" class="input_check" checked="checked"><span></span><div>允许抵扣</div></label><label class="checkbox-min"><input type="radio" name="st_in" data-id="0" class="input_check" checked="checked"><span></span><div>不允许抵扣</div></label></div><div class="content-tisp tisp5"></div></div></div>
		<div class="project_button"><button onclick="moban()">模板</button><button onclick="addServiceContent()">保存</button></div>
	</div>
</div>