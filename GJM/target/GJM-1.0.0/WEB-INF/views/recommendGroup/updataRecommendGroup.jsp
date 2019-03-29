<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE>
<html>
  <head>
    <title>修改群体</title>
  </head>
<!-- 底部 css样式 -->
<link href="/resources/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
<link href="/resources/css/manage_index.css" rel="stylesheet" type="text/css">

<script src="/resources/js/jquery-1.7.2.min.js"></script>
<script charset="utf-8" src="<%= request.getContextPath()%>/resources/js/recommendGroup/updataRecommendGroup.js"></script>
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
</style>
<!-- 位置栏 -->

    <form class="form-inline" alt="First slide" action="/recommendGroup/updataInfo" method="POST" id="addSubmit">
    	<input type="hidden" name="token" value="${token}">
    	<div class="dfs">
			<span class="titles">推荐群体信息</span>
			<table border="0">
				  <tr>
				    <td style="padding-left: 20px;">推荐群体<input type="text" class="form-control jianju" data-validation-engine="validate[required]" name="RecommendGroup_Name" placeholder="推荐群体名称"></td>
				    <td><input type="text" name="recommendGroup_Id" id="recommendGroup_Id" style="display: none;" /></td>
				  </tr>
				  <tr>
				  	<td colspan="2" style="padding-left: 78px;"><button class="btn btn-info" style="width:70px;margin-bottom: 30px;" type="submit">修改</button></td>
				  </tr>
			</table>
		</div>
	</form>	
<script>
var id = '${id}';
selectHouseExtended(id);
</script>
