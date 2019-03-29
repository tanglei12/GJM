<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE>
<html>
  <head>
    <title>小区估价</title>
  </head>
<meta http-equiv="Expires" CONTENT="0">
<meta http-equiv="Cache-Control" CONTENT="no-cache">
<meta http-equiv="Pragma" CONTENT="no-cache">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!-- 底部 css样式 -->
<link href="/resources/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
<link href="/resources/css/manage_index.css" rel="stylesheet" type="text/css">
<!-- jBox皮肤样式 -->
<link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">

<script src="/resources/js/jquery-1.7.2.min.js"></script>
<!-- jBox -->
<script charset="utf-8" src="<%= request.getContextPath()%>/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
<script charset="utf-8" src="<%= request.getContextPath()%>/resources/Plug-in/jbox-v2.3/jBox/i18n/jquery.jBox-zh-CN.js"></script>
<script src="/resources/Plug-in/My97DatePicker4.7.2/WdatePicker.js"></script>
<!-- 验证 -->
<link href="/resources/Plug-in/jQuery-Validation-Engine-master/css/validationEngine.jquery.css" rel="stylesheet" type="text/css" media="screen" charset="utf-8">
<script src="/resources/Plug-in/jQuery-Validation-Engine-master/js/languages/jquery.validationEngine-zh_CN.js"></script>
<script src="/resources/Plug-in/jQuery-Validation-Engine-master/js/jquery.validationEngine.js"></script>
<script src="/resources/js/propertyInfo/valuationPropertyInfo.js"></script>
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
.jianjuss{
	margin-left: 36px;
}
input[type="text"]{
	width: 179px;
	height: 34px;
	border-radius: 4px;
	border: 1px solid #ccc;
	text-indent: 5px;
}
.type-label{
	position: relative;
    top: 1px;
    border: 2px solid #ccc;
    color: #888;
    padding: 4px 18px;
    font-size: 14px;
    display: block;
    float: left;
    margin-right: 14px;
    cursor: pointer;
    -moz-border-radius:4px; 
    -webkit-border-radius:4px; 
    border-radius:4px;
    float: left;
}
.span-checked{border: 2px solid #1ABC9C; color: #1ABC9C;}
.span-checked i{
	position: absolute;
	right: 1px;
    bottom: 1px;
	width: 14px;
	height: 14px;
	background-image: url("/resources/image/true.png");
	background-repeat: no-repeat;
}
.type-label input[type="checkbox"]{display: none;height: 0;opacity: 0;}
.btn-info {
    color: #fff;
    background-color: #5bc0de;
    border-color: #46b8da;
}
.btn {
    display: inline-block;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
}
.delete{
	position: absolute;
	left: -6px;
	top:-6px;
    bottom: 1px;
    font-size:16px;
	width: 12px;
	height: 12px;
	color:#666;
}
.box-title {
    position: relative;
    height: 36px;
    line-height: 37px;
    font-size: 15px;
    border-bottom: 1px solid #3E97C9;
    padding: 0 20px;
    /* margin-bottom: 30px; */
    color: #100F0F;}
.box-title:BEFORE {
    content: "";
    position: absolute;
    height: 20px;
    width: 4px;
    top: 8px;
    left: 8px;
    background: #3E97C9;
    border-radius: 3px;
}
 em {
    color: red;
    text-align: center;
    margin-right: 6px;
    position: relative;
    font-size: 14px;
    font-weight: 600;
    top: 3px;
}
.font_col{
	color: #FA5521;
	font-size: 18px;
	padding: 0px 5px;
}
</style>
<script type="text/javascript">

function addKj(){
	if($("input[name='hv_max']").val() == ""){
		alert("填写最高控价");
		$("input[name='hv_max']").focus();
	}else{
		$(".kj").after("<tr class='hxkj'>"+
			    "<td style='padding-left: 120px;'>户型:<span class='font_col'>"+$("select[name='hi_houseS']").val()+"</span>室<span class='font_col'>"+$("select[name='hi_houseT']").val()+"</span>厅<span class='font_col'>"+$("select[name='hi_houseW']").val()+"</span>卫，最高控价<span class='font_col'>"+$("input[name='hv_max']").val()+"</span>元，占比<span class='font_col'>"+$("input[name='hv_size']").val()+"</span>%</td>"+
			  "</tr>"
				);
	}
}
</script>
<body style="background-color: #f0f0f0;">
<!-- 位置栏 -->

    <form class="form-inline" alt="First slide" action="" method="post">
    	<input type="hidden" name="token" value="${token}">
			<table border="0" style="font-size: 12px;background-color: #fff;width: 96%;min-width: 1115px;margin: 0px auto;margin-top: 20px;">
				
				  <tr>
				  	<td colspan="4">
				  		<div class="box-title" id="contract-object" style="">小区估价</div>
				  	</td>
				</tr>
				  <tr style="max-width: 500px;">
				    <td style="padding-left: 60px;"><em>*</em>交通<input type="text" class="form-control jianjuss"  name="hv_traffic" placeholder="小区交通"></td>
				    <td>位置<input type="text" class="form-control jianjuss"  name="hv_position" placeholder="小区位置" ></td>
				    <td>环境<input type="text" class="form-control jianjuss" onkeyup="this.value=this.value.replace(/[^0-9]\D*$/,'')"  name="hv_env" placeholder="小区环境" ></td>
				  </tr>
				  <tr style="max-width: 500px;">
				    <td style="padding-left: 60px;"><em>*</em>主要客户<input type="text" class="form-control jianju"  name="hv_customer" placeholder="主要客户"></td>
				    <td>活跃度<input type="text" class="form-control jianjus"  name="hv_active" placeholder="租房活跃度" ></td>
				  </tr>
				  <tr style="max-width: 500px;" class="kj">
				    <td colspan="2" style="padding-left: 60px;">
				 	<div style="float: left;">
				    房屋户型
				  		<select class="form-control jianju" name="hi_houseS">
					    	<option value="1">1室</option>
					    	<option value="2">2室</option>
					    	<option value="3">3室</option>
					    	<option value="4">4室</option>
						</select>
						<select class="form-control jianju" name="hi_houseT">
							<option value="0">0厅</option>
					    	<option value="1">1厅</option>
					    	<option value="2">2厅</option>
					    	<option value="3">3厅</option>
						</select>
						<select class="form-control jianju" name="hi_houseW">
							<option value="0">0卫</option>
					    	<option value="1">1卫</option>
					    	<option value="2">2卫</option>
					    	<option value="3">3卫</option>
						</select>
						<input type="text" class="form-control jianju"  name="hv_size" placeholder="户型">
						<input type="text" class="form-control jianju"  name="hv_max" placeholder="最高控价">
						<input type="hidden" class="form-control jianju" value="${id}" name="propertyInfo_Id" placeholder="最高控价">
						</div>   
						<label class="type-label" onclick="addKj();" style="margin-left: 20px;" id="addZb">
							+<i></i> 
						</label>
				  	</td>
				  </tr>
				  <tr>
				  	<td colspan="3" style="padding-left: 125px;"><button class="btn btn-info" style="width:70px;margin-bottom: 330px;" onclick="addSub();">添加</button></td>
				  </tr>
			</table>
	</form>
<script>
var id = '${id}';
selectvaluation(id);
</script>
</body>
</html>