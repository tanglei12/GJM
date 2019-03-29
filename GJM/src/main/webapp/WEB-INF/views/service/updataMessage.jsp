<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!-- 公共CSS -->
<link href="/resources/css/manage_index.css" rel="stylesheet" type="text/css">
<link href="<%= request.getContextPath()%>/resources/Plug-in/kindeditor-4.1.10/themes/default/default.css" rel="stylesheet" type="text/css"/>
<link href="/resources/common/sweet-alert/css/sweet-alert.css" rel="stylesheet" type="text/css">
<link href="/resources/css/serve/message.css" rel="stylesheet" type="text/css">
<link href="/resources/common/imageUpload/css/jquery.image-upload.css" rel="stylesheet" type="text/css">

<!-- 公共JS -->
<script src="/resources/js/jquery-1.7.2.min.js"></script>
<script src="/resources/js/common/common.js"></script>
<script src="/resources/js/service/ajaxfileupload.js"></script>
<script src="/resources/common/sweet-alert/js/sweet-alert.min.js"></script><!-- 提示弹窗 -->
<script src="/resources/Plug-in/My97DatePicker4.7.2/WdatePicker.js"></script><!-- 文本编辑器 -->
<!-- 上传插件 -->
<script src="/resources/js/service/ajaxfileupload.js"></script>
<script src="/resources/common/imageUpload/js/jquery.image-upload1.js"></script>
<!-- 本地JS -->
<script src="/resources/js/service/updataMessage.js"></script>
<!-- 位置栏 -->

<%--<form class="form-inline" action="/service/updataMessages" target="iframepage" method="POST" id="addSubmit">--%>
	<section id="main-box">
		<div class="box-title">修改服务信息</div>
		<div id="main-box-content">
			<dl class="content-dl">
				<dt>服务名称</dt>
				<dd>
					<input type="text" class="from-data" value="${serviceMessage.sm_name}" required="required" name="sm_name" placeholder="服务名称">
				</dd>
				<dd class="msg"></dd>
			</dl>
			<dl class="content-dl">
				<dt>服务描述</dt>
				<dd>
					<textarea class="from-data" name="sm_content" style="width: 630px;" rows="3">${serviceMessage.sm_content}</textarea>
				</dd>
				<dd class="msg"></dd>
			</dl>
			<dl class="content-dl">
				<dt>归属部门</dt>
				<dd><input type="hidden" id="ucc_id" value="${serviceMessage.ucc_id }">
					<select class="from-data" name="ucc_id" value="${serviceMessage.ucc_id }"></select>
				</dd>
				<dd class="msg"></dd>
			</dl>
			<%-- <dl class="content-dl">
				<dt>问题描述</dt>
				<dd>
					<input type="text" class="from-data" name="pl_name" style="width: 96%;">
				</dd>
				<dd>
					<button class="from-data" type="button" onclick="addBewrite();">添加</button>
				</dd>
				<dd class="msg" style="height: auto;">
					<div id="bewrite">
						<table class="table table-hover" style="width: 96%;">
							<tbody class="bewrite">
								<c:forEach items="${serviceProblemList}" var="problemList">
									<tr onclick="deleteBewrite(${problemList.pl_id});remove();">
										<td style="height: 24px;line-height: 24px;">${problemList.pl_name}</td>
									</tr>
								</c:forEach>
							</tbody>
						</table>
					</div>
				</dd>
				<dd class="msg"></dd>
			</dl> --%>
<!-- 			<dl class="content-dl"> -->
<!-- 				<dt>上传图标</dt> -->
<!-- 				<dd> -->
<!-- 					<div id="yhks"> -->
<!-- 					 	<div style="float: left;" id="dfg"> -->
<!-- 			                 <ul> -->
<!-- 			                     <li class="images_img"> -->
<!-- 				                     <div class="imageFile"> -->
<%-- 					                     <img id="imgg" src="${serviceMessage.sm_image }" width="61px" height="61px" onclick="$('#file5').trigger('click')" style='cursor:pointer' /> --%>
<!-- 					                     <label id="dellabel" style="display: none; float: left;height: 16px;line-height: 16px; position: relative;top: 46px;left: 4px;cursor: pointer; color: #999;">删除</label> -->
<!-- 					                     <input type="file" name="file5" id="file5" onchange="ajaxFile();" style="display: none" accept=".jpg,.png,.jpeg,.bmp,.gif" /> -->
<!-- 				                     </div> -->
<!-- 				                     <div class="class_image"></div> -->
<!-- 			                     </li> -->
			                     
<!-- 			                     <li style="color:#CCC">最多可上传1张图片，支持BMP,GIF,JPG,PNG,JPEG格式文件</li> -->
<!-- 			                 </ul> -->
<!-- 			             </div> -->
<!-- 					 </div> -->
<!-- 				</dd> -->
<!-- 				<dd class="msg"></dd> -->
<!-- 			</dl> -->
			<dl class="content-dl">
				<dt>图片</dt>
				<dd style="width: auto;">
					<div id="image-upload-box" style="width: 100%;">
					</div>
				</dd>
				<dd class="msg"></dd>
			</dl>
			<div class="col-md-12 modelAddTop modelAdd" style="display: none;">
				<input type="text" class="form-control" id="sm_image" value="${serviceMessage.sm_image}" data-href="${serviceMessage.sm_imagepath}" name="sm_image">
				<input type="text" class="form-control" id="pl_names" value="" name="pl_names">
				<input type="text" class="form-control" id="sm_id" value="${serviceMessage.sm_id}" name="sm_id">
			</div>
			<dl class="content-dl">
				<dt></dt>
				<dd>
					<button class="from-data" onclick="saveDate()">修改</button>
				</dd>
				<dd class="msg"></dd>
			</dl>
		</div>
	</section>
<%--</form>--%>