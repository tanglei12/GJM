<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE>
<html>
  <head>
    <title>修改物业</title>
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
<script charset="utf-8" src="<%= request.getContextPath()%>/resources/js/propertyInfo/updataPropertyInfo.js"></script>
<!-- 时间控件 -->
<script src="/resources/Plug-in/My97DatePicker4.7.2/WdatePicker.js"></script>
<!-- 验证 -->
<link href="/resources/Plug-in/jQuery-Validation-Engine-master/css/validationEngine.jquery.css" rel="stylesheet" type="text/css">
<script src="/resources/Plug-in/jQuery-Validation-Engine-master/js/languages/jquery.validationEngine-zh_CN.js"></script>
<script src="/resources/Plug-in/jQuery-Validation-Engine-master/js/jquery.validationEngine.js"></script>
<script src="/resources/js/propertyInfo/addPropertyInfo.js"></script>
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
#queryList {
    position: absolute;
    top: 40px;
    left: 0;
    height: auto;
    clear: both;
    display: none;
    min-width: 424px;
    border: 1px solid #dddddd;
    background-color: #fff;
    z-index: 99;
    -moz-box-shadow: 0px 0px 13px #BFBFBF;
    -webkit-box-shadow: 0px 0px 13px #BFBFBF;
    box-shadow: 0px 0px 13px #BFBFBF;
}
#search-show {
    min-height: 34px;
}
#search-box input[type="text"] {
    width: 100%;
    height: 34px;
    border-bottom: 1px solid #ddd;
    text-indent: 10px;
    outline: none;
    background-color: #f8f8f8;
}
#queryList table tr td {
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 10px;
    height: 34px;
    text-align: left;
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
function add(){
	var html = "<div style='padding:10px;'>输入周边：<input type='text' id='pz' name='pz' /></div>";
	var submit = function (v, h, f) {
		var i= 0
		$(".type-radio").each(function (){
			if($(this).val() == f.pz){
				i = 1;
			}
		});
		
		if(i == 0){
			if(f.pz != null && f.pz != ""){
				$("#addZb").before("<label class='type-label span-checked' onclick='changeType(this)' for='type7'><span class='glyphicon glyphicon-remove-circle delete' onclick='deleteType(this);'></span>"+f.pz+"<i></i> <input type='checkbox' checked='checked' class='type-radio' name='perimeter' value='"+f.pz+"'></label>");
			}
		    return true;
		}else{
			$.jBox.tip("已有周边");
			 return false;
		}
		
	};

	$.jBox(html, { title: "物业周边", submit: submit });
}
function deleteType(obj){
	$(obj).parent().remove();
}
</script>
<body style="background-color: #f0f0f0;">
<!-- 位置栏 -->

    <form class="form-inline" alt="First slide" action="/propertyInfo/updataInfo" method="POST" id="addSubmit">
    	<input type="hidden" name="token" value="${token}">
			<table border="0" style="font-size: 12px;background-color: #fff;width: 96%;min-width: 1115px;margin: 0px auto;margin-top: 20px;">
				<tr>
				  	<td colspan="4">
				  		<div class="box-title" id="contract-object" style="">小区信息</div>
				  	</td>
				</tr>
				  <tr style="max-width: 500px;">
				    <td style="padding-left: 60px;"><em>*</em>小区名称<input type="text" data-validation-engine="validate[required]" class="form-control jianju" onblur="validate();"  name="PropertyInfo_Name" placeholder="物业名称"></td>
				    <td>电梯配置<input type="text" class="form-control jianju"  name="PropertyInfo_Life" placeholder="如:1梯3户" ></td>
				    <td>车库<input type="text" class="form-control jianjuss" onkeyup="this.value=this.value.replace(/[^0-9]\D*$/,'')"  name="PropertyInfo_CarPark" placeholder="车库" ></td>
				  </tr>
				  <tr>
				    <td  style="padding-left: 60px;"><em>*</em>地址<input type="text" class="form-control jianjuss" style="width: 240px;" data-validation-engine="validate[required]" name="PropertyInfo_address" placeholder="小区地址" ></td>
				  </tr>
				  <tr>
				  	<td style="padding-left: 60px;" colspan="3">小区介绍<textarea class="form-control jianjus" name="propertyInfo_introduce" style="width: 630px;max-width: 630px;max-height: 55px;" rows="2"></textarea></td>
				  </tr>
				  <tr>
				  	<td style="padding-left: 60px;">
				    	<dl style="float: left;">
			            	<dt style="float: left;">所属物业</dt>
			                <dd style="float: left;margin-left: 12px;">
					        	<div class="main-box-list" style="position: relative;" >
									<input type="text" class="form-control vaildbox data-change1" id="conhouseno" placeholder="点击搜索物业" readonly="readonly" required="required" style="width: 300px;">
									<span class="error-tisp"></span>
									<div id="queryList" style="font-size: 12px;">
										<div id="search-box"><input type="text" placeholder="输入物业名"></div>
										<div id="search-show">
											<div class="search-tisp">没有数据</div>
										</div>
									</div>
							   </div>
			                </dd>
			            </dl>
			            <input type="text" name="pi_id" id="pi_id" value="0" style="display: none;">
			            <input type="text" name="propertyInfo_Id" id="propertyInfo_Id" value="0" style="display: none;">
			            <span style="line-height: 30px;margin-left: 24px;" id='tishi'></span>
					</td>
				  </tr>
				  <tr>
				  	<td colspan="4">
				  		<div class="box-title" id="contract-object" style="">小区周边</div>
				  	</td>
				  </tr>
				  <tr>
				    <td style="padding-left: 60px;max-width: 1000px;" colspan="6">
					    <label class="type-label" onclick="changeType(this)" for="type1">
					    	<span class="glyphicon glyphicon-remove-circle delete" onclick="deleteType(this);"></span>
							新世纪超市<i></i> 
							<input type="checkbox" class="type-radio" name="perimeter" value="新世纪超市" id="type1">
						</label>
					    <label class="type-label" onclick="changeType(this)" for="type2">
					    	<span class="glyphicon glyphicon-remove-circle delete" onclick="deleteType(this);"></span>
							南坪实验小学正街校区<i></i> 
							<input type="checkbox" class="type-radio" name="perimeter" value="南坪实验小学正街校区" id="type2">
						</label>
					    <label class="type-label" onclick="changeType(this)" for="type3">
					    	<span class="glyphicon glyphicon-remove-circle delete" onclick="deleteType(this);"></span>
							浪高小天使幼儿园<i></i> 
							<input type="checkbox" class="type-radio" name="perimeter" value="浪高小天使幼儿园" id="type3">
						</label>
						<label class="type-label" onclick="add();" id="addZb">
							+<i></i> 
						</label>
					</td>
				  </tr>
				  <tr>
				  	<td colspan="4">
				  		<div class="box-title" id="contract-object" style="">物业信息</div>
				  	</td>
				</tr>
				  <tr>
				    <td style="padding-left: 60px;">物管电话<input type="text" class="form-control jianju"  name="PropertyInfo_Tel" placeholder="物管电话" ></td>
				    <td>物管名称<input type="text" class="form-control jianju"  name="PropertyInfo_Wuguan" placeholder="物管名称" ></td>
				    <td>物管费<input type="text" class="form-control jianjus" onkeyup="this.value=this.value.replace(/^[a-z\u4E00-\u9FA5]+$/,'')" name="PropertyInfo_Cost" placeholder="物管费" ><span class="jianju">元每平方米</span></td>
				  </tr>
				  <tr>
				    <td style="padding-left: 60px;">管理方式
			    		<select class="form-control jianju" name="PropertyInfo_ManaStyle">
				    		<option value="开放式">开放式</option>
				    		<option value="半开放式">半开放式</option>
				    		<option value="封闭的">封闭的</option>
				    	</select>
					</td>
				    <td>物业用途
			    	   <select class="form-control jianju" name="PropertyInfo_State">
				    		<option value="住宅">住宅</option>
				    		<option value="商业">商业</option>
				    		<option value="商住">商住</option>
				    		<option value="其它">其它</option>
				    	</select>
				    </td>
				    <td>物业类型
			    		<select class="form-control jianju" name="PropertyInfo_Type">
				    		<option value="高层">高层</option>
				    		<option value="洋房">洋房</option>
				    		<option value="别墅">别墅</option>
				    		<option value="公寓">公寓</option>
				    		<option value="小区">小区</option>
				    		<option value="门面">门面</option>
				    		<option value="办公">办公</option>
				    		<option value="厂房">厂房</option>
				    		<option value="其它">其它</option>
				    	</select>
					</td>
				  </tr>
				  <tr>
				  	<td colspan="4">
				  		<div class="box-title" id="contract-object" style="">其它信息</div>
				  	</td>
				  </tr>
				  <tr>
				    <td style="padding-left: 60px;">公共设施<input type="text" class="form-control jianju"  name="PropertyInfo_Public" placeholder="如:游泳池..." ></td>
				    <td>开盘时间<input type="text" class="form-control jianju"  readonly="readonly"  onclick="WdatePicker({startDate:'%y-%M-%d',dateFmt:'yyyy-MM-dd',alwaysUseStartDate:true})" name="openTime" placeholder="点击获取开盘时间"></td>
				    <td>开盘价<input type="text" class="form-control jianjus" onkeyup="this.value=this.value.replace(/^[a-z\u4E00-\u9FA5]+$/,'')" name="PropertyInfo_OpenPrice" placeholder="开盘价" ><span class="jianju">元每平方米</span></td>
				  </tr>
				  <tr>
				    <td style="padding-left: 60px;">占地面积<input type="text" onkeyup="this.value=this.value.replace(/^[a-z\u4E00-\u9FA5]+$/,'')" class="form-control jianju"  name="PropertyInfo_TotalArea" placeholder="占地面积" ><span class="jianju">万平方米</span></td>
				    <td>建筑面积<input type="text" class="form-control jianju" onkeyup="this.value=this.value.replace(/^[a-z\u4E00-\u9FA5]+$/,'')" name="PropertyInfo_BuildArea" placeholder="建筑面积" ><span class="jianju">万平方米</span></td>
				    <td>总套数<input type="text" class="form-control jianjus" onkeyup="this.value=this.value.replace(/[^0-9]\D*$/,'')"  name="PropertyInfo_TotalAmount" placeholder="总套数" ></td>
				  </tr>
				  <tr>
				    <td  style="padding-left: 60px;">容积率<input type="text" onkeyup="this.value=this.value.replace(/^[a-z\u4E00-\u9FA5]+$/,'')" class="form-control jianjus" name="PropertyInfo_PlotRate" placeholder="建筑面积/占地面积" ></td>
				    <td>绿化率<input type="text" class="form-control jianjus" onkeyup="this.value=this.value.replace(/^[a-z\u4E00-\u9FA5]+$/,'')" name="PropertyInfo_GreenRate" placeholder="绿化面积/占地面积" ><span class="jianju">%</span></td>
				  </tr>
				  <tr>
				    <td  style="padding-left: 60px;">开发商<input type="text" class="form-control jianjus" name="PropertyInfo_developer" placeholder="开发商" ></td>
				  </tr>
				  <tr>
				  	<td style="padding-left: 60px;" colspan="3">备注<textarea class="form-control jianjus" name="PropertyInfo_remark" style="width: 630px;max-width: 630px;max-height: 55px;" rows="2"></textarea></td>
				  </tr>
				  <tr>
				  	<td colspan="4">
				  		<div style="border-bottom: 1px solid #3E97C9;"></div>
				  	</td>
				  </tr>
				  <tr>
				  	<td colspan="3" style="padding-left: 79px;"><button class="btn btn-info" style="width:70px;margin-bottom: 30px;" type="submit">修改</button></td>
				  </tr>
			</table>
	</form>	
<script>
var id = '${id}';
selectHouseExtended(id);
</script>
</body>
</html>