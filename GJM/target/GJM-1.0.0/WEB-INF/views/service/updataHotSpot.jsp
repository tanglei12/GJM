<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!-- 底部 css样式 -->
<link href="/resources/css/manage_index.css" rel="stylesheet" type="text/css">
<link href="/resources/css/print.css" rel="stylesheet" type="text/css">
<link href="/resources/css/ProjectManagement.css" rel="stylesheet" type="text/css">
<link href="/resources/css/perfect-scrollbar.css" rel="stylesheet" type="text/css">
<link href="/resources/css/select_xs.css" rel="stylesheet" type="text/css">
<link href="/resources/css/serve/hotSpot.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="<%= request.getContextPath()%>/resources/Plug-in/kindeditor-4.1.10/themes/default/default.css" />

<script src="/resources/js/jquery-1.7.2.min.js"></script>
<script src="/resources/js/serve/addHotSpot.js"></script>
<!-- 文本编辑器 -->
<script src="/resources/Plug-in/My97DatePicker4.7.2/WdatePicker.js"></script>
<script charset="utf-8" src="<%= request.getContextPath()%>/resources/Plug-in/kindeditor-4.1.10/kindeditor-min.js"></script>
<script charset="utf-8" src="<%= request.getContextPath()%>/resources/Plug-in/kindeditor-4.1.10/lang/zh_CN.js"></script>
<script>
var editor;
KindEditor.ready(function(K) {
	editor = K.create('textarea[class="content"]', {
		allowFileManager : true,
		uploadJson : '/resources/Plug-in/kindeditor-4.1.10/jsp/upload_json.jsp',
        fileManagerJson : '/resources/Plug-in/kindeditor-4.1.10/jsp/file_manager_json.jsp',
        allowFileManager : true,
        allowImageUpload : true, 
		minWidth : '500px',
		afterCreate : function() {this.loadPlugin('autoheight');},
		afterBlur : function(){ this.sync(); }  //Kindeditor下获取文本框信息
	});
	K('input[name=getHtml]').click(function(e) {
		alert(editor.html());
	});
	K('input[name=isEmpty]').click(function(e) {
		alert(editor.isEmpty());
	});
	K('input[name=getText]').click(function(e) {
		alert(editor.text());
	});
	K('input[name=selectedHtml]').click(function(e) {
		alert(editor.selectedHtml());
	});
	K('input[name=setHtml]').click(function(e) {
		editor.html('<h3>Hello KindEditor</h3>');
	});
	K('input[name=setText]').click(function(e) {
		editor.text('<h3>Hello KindEditor</h3>');
	});
	K('input[name=insertHtml]').click(function(e) {
		editor.insertHtml('<strong>插入HTML</strong>');
	});
	K('input[name=appendHtml]').click(function(e) {
		editor.appendHtml('<strong>添加HTML</strong>');
	});
	K('input[name=clear]').click(function(e) {
		editor.html('');
	});
});
</script>
<!-- 位置栏 -->

<form class="form-inline" action="/service/updataHotSpot" target="iframepage" method="POST" id="addSubmit">
	<section id="main-box">
		<div class="box-title">修改热点问题</div>
		<div id="main-box-content">
			<input type="hidden" id="sip_id" value="${hotspotIssuesProblem.sip_id }" name="sip_id">
			<dl class="content-dl">
				<dt>服务类型</dt>
				<dd>
					<select class="from-data" name="st_id">
						<c:if test="${not empty serviceTypeList}">
			    			<c:forEach items="${serviceTypeList}" var="serviceType">
			    				<c:if test="${serviceType.st_id == hotspotIssuesProblem.st_id}">
			    					<option selected="selected" value="${serviceType.st_id}">${serviceType.st_name}</option>
			    				</c:if>
			    				<c:if test="${serviceType.st_id != hotspotIssuesProblem.st_id}">
			    					<option value="${serviceType.st_id}">${serviceType.st_name}</option>
			    				</c:if>
			    			</c:forEach>
			    		</c:if>
					</select>
				</dd>
				<dd class="msg"></dd>
			</dl>
			<dl class="content-dl">
				<dt><em>*</em>热点问题描述</dt>
				<dd>
					<input type="text" class="from-data" value="${hotspotIssuesProblem.sip_name}" required="required" name="sip_name" placeholder="热点问题">
				</dd>
				<dd class="msg"></dd>
			</dl>
			<dl class="content-dl">
				<dt><em>*</em>热点问题答案</dt>
				<dd style="width: auto;">
					<textarea name="sip_content" class="content" style="width:960px;height:400px;visibility:hidden;">${hotspotIssuesProblem.sip_content }</textarea>
				</dd>
				<dd class="msg"></dd>
			</dl>
			<dl class="content-dl">
				<dt></dt>
				<dd>
					<button class="from-data" type="submit">发布</button>
				</dd>
				<dd class="msg"></dd>
			</dl>
		</div>
	</section>
</form>