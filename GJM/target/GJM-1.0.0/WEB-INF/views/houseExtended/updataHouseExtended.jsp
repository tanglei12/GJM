<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE>
<html>
  <head>
    <title>修改扩展</title>
  </head>
<!-- 底部 css样式 -->
<link href="/resources/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
<link href="/resources/css/manage_index.css" rel="stylesheet" type="text/css">

<script src="/resources/js/jquery-1.7.2.min.js"></script>
<script charset="utf-8" src="/resources/js/houseExtended/updataHouseExtended.js"></script>
<!-- 时间控件 -->
<script src="/resources/Plug-in/My97DatePicker4.7.2/WdatePicker.js"></script>
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
  	
    <form class="form-inline" alt="First slide" action="/houseExtended/updataInfo" method="POST" id="addSubmit">
    	<input type="hidden" name="token" value="${token}">
    	<div class="dfs">
			<span class="titles">房屋扩展信息</span>
			<table border="0">
				  <tr>
				    <td style="padding-left: 20px;">产权人<input type="text" class="form-control jianjus" name="he_peopleName" placeholder="产权人" data-validation-engine="validate[required]"></td>
				    <td>购买价格<input type="text" onkeyup="this.value=this.value.replace(/^[a-z\u4E00-\u9FA5]+$/,'')" class="form-control jianju" name="he_money" placeholder="房屋购买价格" data-validation-engine="validate[required]"><span class="jianju">万元</span></td>
				    <td>房东电话<input type="text" data-validation-engine="validate[required,custom[phone],maxSize[11],minSize[11]]" class="form-control jianju" name="he_phone" placeholder="房屋房东电话"></td>
				  </tr>
				  <tr>
				    <td style="padding-left: 20px;">产权编号<input type="text" onkeyup="this.value=this.value.replace(/[^A-Za-z0-9]+$/,'')" class="form-control jianju" name="he_number" placeholder="如:" data-validation-engine="validate[required]"></td>
				    <td>产权证号<input type="text" onkeyup="this.value=this.value.replace(/[^A-Za-z0-9]+$/,'')" class="form-control jianju" name="he_cardNumber" placeholder="如:" data-validation-engine="validate[required]"></td>
				    <td>购买时间<input type="text" data-validation-engine="validate[required]" class="form-control jianju" readonly="readonly" onclick="WdatePicker({startDate:'%y-%M-%d %h:%m:%s',dateFmt:'yyyy-MM-dd HH:mm:ss',alwaysUseStartDate:true})" name="buyTime" placeholder="点击获取房屋购买时间"></td>
				  </tr>
				  <tr>
				    <td style="padding-left: 20px;">房东住址<input type="text" data-validation-engine="validate[required]" class="form-control jianju" name="he_address" placeholder="房东地址"></td>
				    <td><input type="text" name="he_id" id="he_ids" style="display: none;" /></td>
				    <td><input type="text" name="hi_id" id="hi_ids" style="display: none;" /></td>
				    <td><input type="text" name="he_state" id="he_state" style="display: none;" /><input type="text" name="phi_id" id="phi_id" style="display: none;" /></td>
				  </tr>
				  <tr>
				    <td colspan="3" style="padding-left: 20px;">房屋用途<input type="checkbox" style="margin-left: 20px;" name="he_nature" value="住宅" checked="checked">住宅<input type="checkbox" value="商住" style="margin-left: 20px;" name="he_nature">商住<input type="checkbox" value="商业" style="margin-left: 20px;" name="he_nature">商业</td>
				  </tr>
				  <tr>
				  	<td colspan="3" style="padding-left: 78px;"><button class="btn btn-info" style="width:70px;margin-bottom: 30px;" type="submit">修改</button></td>
				  </tr>
			</table>
		</div>
	</form>	
<script>
var id = '${id}';
selectHouseExtended(id);
</script>
