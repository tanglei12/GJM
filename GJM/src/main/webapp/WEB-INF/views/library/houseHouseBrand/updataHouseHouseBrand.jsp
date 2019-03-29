<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE>
<html>
  <head>
    <title>修改品牌</title>
  </head>
<!-- 底部 css样式 -->
<link href="/resources/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
<link href="/resources/css/manage_index.css" rel="stylesheet" type="text/css">

<!-- jBox皮肤样式 -->
<link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">

<script src="/resources/js/jquery-1.7.2.min.js"></script>
<!-- jBox -->
<script charset="utf-8" src="<%= request.getContextPath()%>/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
<script charset="utf-8" src="<%= request.getContextPath()%>/resources/Plug-in/jbox-v2.3/jBox/i18n/jquery.jBox-zh-CN.js"></script>
<script charset="utf-8" src="<%= request.getContextPath()%>/resources/js/houseHouseBrand/updataHouseHouseBrand.js"></script>
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
  	
    <form class="form-inline" alt="First slide" action="/houseHouseBrand/updataInfo" method="POST" id="addSubmit">
    	<input type="hidden" name="token" value="${token}">
    	<div class="dfs">
			<span class="titles">房屋品牌信息</span>
			<table border="0">
				  <tr>
				    <td style="padding-left: 20px;">品牌名称<input type="text" class="form-control jianju" name="hb_name" placeholder="品牌名称" data-validation-engine="validate[required]"></td>
				  </tr>
				  <tr>
				    <td colspan="3" style="padding-left: 20px;">品牌描述<textarea class="form-control jianju" name="hb_desc" style="width: 630px;" rows="3" data-validation-engine="validate[required]"></textarea></td>
				  </tr>
				  <tr>
				  	<td style="padding-left: 20px;">最低租金<input type="text" onkeyup="this.value=this.value.replace(/[^0-9]\D*$/,'')" class="form-control jianju" name="minMoney" placeholder="最低租金"><span class="jianju">元</span></td>
				  	<td>最高租金<input type="text" class="form-control jianju" onkeyup="this.value=this.value.replace(/[^0-9]\D*$/,'')" name="maxMoney" placeholder="最高租金"><span class="jianju">元</span></td>
				  	<td>租金间隔<input type="text" class="form-control jianju" onkeyup="this.value=this.value.replace(/[^0-9]\D*$/,'')" name="money" placeholder="租金间隔"><span class="jianju">元</span></td>
				  </tr>
				  <tr>
				  	<td style="padding-left: 20px;">最小面积<input type="text" onkeyup="this.value=this.value.replace(/[^0-9]\D*$/,'')" class="form-control jianju" name="minArea" placeholder="最小面积"><span class="jianju">㎡</span></td>
				  	<td>最大面积<input type="text" class="form-control jianju" onkeyup="this.value=this.value.replace(/[^0-9]\D*$/,'')" name="maxArea" placeholder="最大面积"><span class="jianju">㎡</span></td>
				  	<td>面积间隔<input type="text" class="form-control jianju" onkeyup="this.value=this.value.replace(/[^0-9]\D*$/,'')" name="area" placeholder="面积间隔"><span class="jianju">㎡</span></td>
				  </tr>
				  <tr style="display: none;">
				  	<td><input type="text" value="渝中区,大渡口区,江北区,沙坪坝区,九龙坡区,南岸区,北碚区,渝北区,巴南区" class="form-control jianju" name="address" placeholder="面积间隔"></td>
				  	<td><input type="text" value="渝中区解放碑,江北区观音桥,沙坪坝区双巷子,九龙坡区杨家坪,南岸区南坪" class="form-control jianju" name="district" placeholder="面积间隔"></td>
				  	<td><input type="text" value="1号线,2号线,3号线,6号线" class="form-control jianju" name="track" placeholder="面积间隔"></td>
				  </tr>
				  <tr>
				    <td colspan="3" id="hoseRecommendGroups">人群</td>
				  </tr>
				  <tr style="display:none;">
				    <td colspan="3" style="padding-left: 20px;"><input type="text" class="form-control jianju" name="hb_id" placeholder="品牌名称"></td>
				  </tr>
				  <tr>
				  	<td colspan="3" style="padding-left: 78px;"><button class="btn btn-info" style="width:70px;margin-bottom: 30px;" onclick="addsubmit();" type="button">修改</button></td>
				  </tr>
			</table>
		</div>
	</form>	
<script>
var id = '${id}';
selectHouseExtended(id);
</script>
