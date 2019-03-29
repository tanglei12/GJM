<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE>
<html>
  <head>
    <title>编辑模板</title>
  </head>
<!-- 底部 css样式 -->
<link href="/resources/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
<link href="/resources/css/manage_index.css" rel="stylesheet" type="text/css">
<link href="/resources/css/book/houseBookTemplateEdit.css" rel="stylesheet" type="text/css">

<script src="/resources/js/jquery-1.7.2.min.js"></script>
<script src="/resources/js/common/image-upload2.js"></script>
<script src="/resources/js/common/common.js"></script>
<!-- <script src="/resources/common/sweet-alert/js/sweet-alert.min.js"></script>提示弹窗 -->
<script src="/resources/js/jquery.cookie.js"></script>
<script src="/resources/js/table-min.js"></script><!-- 表格公共js -->
<script charset="utf-8" src="/resources/js/book/houseBookTemplateEdit.js"></script>
<!-- 验证 -->
<link href="/resources/Plug-in/jQuery-Validation-Engine-master/css/validationEngine.jquery.css" rel="stylesheet" type="text/css">
<script src="/resources/Plug-in/jQuery-Validation-Engine-master/js/languages/jquery.validationEngine-zh_CN.js"></script>
<script src="/resources/Plug-in/jQuery-Validation-Engine-master/js/jquery.validationEngine.js"></script>

<script>
		jQuery(document).ready(function(){
			jQuery("#addSubmit").validationEngine();
		});
</script>
<style>
.place {
    height: 2px;
    background: #3eafe0;
    position: fixed;
    width: 100%;
    margin-top: -50px;
}
.dfs{
	width:90%;
	min-width:1080px;
	padding:5px 30px;
	margin:50px;
	border:4px solid #ebcbbe;
}
.titles{
	display:block;
	width:150px;
	height:30px;
	position:relative;
	color:#333;
	top:-30px;
	font-size:22px;
	text-align: center;
	background: white;
}
td{
	padding-left: 40px;
	padding-top: 20px;
}
.jianju{
	margin-left: 12px;
}
.jianjus{
	margin-left: 24px;
}
</style>
<!-- 位置栏 -->
  	
    <form class="form-inline" alt="First slide" action="/book/saveTemplateInfo" method="POST" id="addSubmit">
    	<input type="hidden" name="token" value="${token}">
    	<div class="dfs">
			<span class="titles">预约模板信息</span>
			<table border="0">
				  <tr>
				    <td style="padding-left: 20px;">模板名称<input type="text" style="margin-left:18px;" class="form-control jianjus" name="templateName" placeholder="" data-validation-engine="validate[required]"></td>
				  	<td><input type="text" name="bt_id" id="bt_id" style="display: none;" /></td>
				  </tr>
				  <tr>
				    <td style="padding-left: 20px;">模板用途
					    <select type="text" class="form-control jianju" name="templateUse" placeholder="" data-validation-engine="validate[required]">
					    	<option value="1" selected="selected">预约</option>
					    	<option value="2">其他</option>
					    </select>
				    </td>
				 </tr>
				 <tr>
				    <td style="padding-left: 20px;">模板状态
					    <select type="text" class="form-control jianju" name="templateStatus" placeholder="" data-validation-engine="validate[required]">
					    	<option value="1" selected="selected">启用</option>
					    	<option value="0">停用</option>
					    </select>
				    </td>
				 </tr>
				 <tr>
				 	<td style="padding-left: 20px;">模板图像
				 		<input type="hidden" id="bs_idU">
						<div class="box-content" style="width: 328px;margin-left:83px;margin-top:-20px;">
<!-- 							<div class="sub-title"><ul class="title-nav"><li class="visited">模板图像</li></ul></div> -->
							<div class="sub-content" style="padding-left: 13px; width: 325px; padding: 10px;"><div class="image-upload-box image-card-div"><label class="image-item-add" for="house-image"><input type="file" id="house-image" accept="image/jpg;image/png;image/gif"></label></div></div>
							<input type="hidden" name="templateImg">
						</div>
				 	</td>
				 </tr>
				 <tr>
				 	<td style="padding-left: 20px;">模板描述
				 		<textarea class="form-control jianju" name="templateDesc" style="width:100%;height:150px;margin-left:83px;margin-top:-20px;"></textarea>
				 	</td>
				 </tr>
				 <tr>
				 	<td style="padding-left: 20px;">发布范围
				 		<div id="templateArea" style="width:100%;height:100%;margin-left:83px;margin-top:-20px;">
				 		<input type="hidden" name="contentIds">
				 	</td>
				 </tr>
				 <tr>
				  	<td colspan="3" style="padding-left: 78px;"><button class="btn btn-info" style="width:70px;margin-bottom: 30px;" type="button" onclick="saveBookTemplateInfo();">保存</button></td>
				 </tr>
			</table>
		</div>
	</form>	
<script>
var id = '${id}';
selectHouseBookTemplate(id);
</script>
