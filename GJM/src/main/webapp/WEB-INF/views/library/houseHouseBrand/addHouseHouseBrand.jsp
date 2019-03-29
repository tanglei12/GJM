<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE>
<html>
  <head>
    <title>增加品牌</title>
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
<script charset="utf-8" src="<%= request.getContextPath()%>/resources/js/houseHouseBrand/addHouseHouseBrand.js"></script>
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
</style>
<script type="text/javascript">
function changeType(obj){
	var i = 0;
	$(".type-radio").each(function (){
		if($(this).attr("checked")){
			i++;
		}
	});
	if($(obj).find("input").is(":checked")){
		$(obj).removeClass("span-checked");
		$(obj).find("input").attr("checked",false);
	}else{
		if(i<5){
			$(obj).addClass("span-checked");
			$(obj).find("input").attr("checked",true);
			i = i--;
		}else{
			$.jBox.tip("只能选择五个");
		}
	}
}

function deleteType(obj){
	$(obj).parent().remove();
}

function add(){
	var html = "<div style='padding:10px;'>输入房源优势：<input type='text' id='pz' name='pz' /></div>";
	var submit = function (v, h, f) {
		var i= 0
		$(".type-radio").each(function (){
			if($(this).val() == f.pz){
				i = 1;
			}
		});
		if(i == 0){
			if(f.pz != null && f.pz != ''){
			$("#addPz").before("<label class='type-label' onclick='changeType(this)' for='type7'><span class='glyphicon glyphicon-remove-circle delete' onclick='deleteType(this);'></span>"+f.pz+"<i></i> <input type='checkbox' class='type-radio' name='phi_configure' value='"+f.pz+"'></label>");
			}
		    return true;
		}else{
			$.jBox.tip("已有房源优势");
			 return false;
		}
	};
	$.jBox(html, { title: "房源优势", submit: submit });
}
</script>
<!-- 位置栏 -->
  	
    <form class="form-inline" alt="First slide" action="/houseHouseBrand/addHouseHouseBrand" method="POST" id="addSubmit">
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
				  	<td>最高租金<input type="text" onkeyup="this.value=this.value.replace(/[^0-9]\D*$/,'')" class="form-control jianju" name="maxMoney" placeholder="最高租金"><span class="jianju">元</span></td>
				  	<td>租金间隔<input type="text" onkeyup="this.value=this.value.replace(/[^0-9]\D*$/,'')" class="form-control jianju" name="money" placeholder="租金间隔"><span class="jianju">元</span></td>
				  </tr>
				  <tr>
				  	<td style="padding-left: 20px;">最小面积<input type="text" onkeyup="this.value=this.value.replace(/[^0-9]\D*$/,'')" class="form-control jianju" name="minArea" placeholder="最小面积"><span class="jianju">㎡</span></td>
				  	<td>最大面积<input type="text" onkeyup="this.value=this.value.replace(/[^0-9]\D*$/,'')" class="form-control jianju" name="maxArea" placeholder="最大面积"><span class="jianju">㎡</span></td>
				  	<td>面积间隔<input type="text" onkeyup="this.value=this.value.replace(/[^0-9]\D*$/,'')" class="form-control jianju" name="area" placeholder="面积间隔"><span class="jianju">㎡</span></td>
				  </tr>
				  <tr style="display: none;">
				  	<td><input type="text" value="渝中区,大渡口区,江北区,沙坪坝区,九龙坡区,南岸区,北碚区,渝北区,巴南区" class="form-control jianju" name="address" placeholder="面积间隔"></td>
				  	<td><input type="text" value="渝中区解放碑,江北区观音桥,沙坪坝区双巷子,九龙坡区杨家坪,南岸区南坪" class="form-control jianju" name="district" placeholder="面积间隔"></td>
				  	<td><input type="text" value="1号线,2号线,3号线,6号线" class="form-control jianju" name="track" placeholder="面积间隔"></td>
				  </tr>
				  <tr>
				    <td colspan="3" id="hoseRecommendGroups">人群</td>
				  </tr>
				  <tr>
				  	<td colspan="3" style="padding-left: 78px;"><button class="btn btn-info" style="width:70px;margin-bottom: 30px;" onclick="addsubmit();" type="button">添加</button></td>
				  </tr>
			</table>
		</div>
	</form>	
<script>
	$("input[name='hb_name']").focus();
</script>