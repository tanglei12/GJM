<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE>
<html>
  <head>
    <title>增加房源</title>
  </head>
<!-- 底部 css样式 -->
<link href="/resources/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
<link href="/resources/css/manage_index.css" rel="stylesheet" type="text/css">
<!-- jBox皮肤样式 -->
<link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">
<link href="/resources/css/contractList/addContract.css" rel="stylesheet" type="text/css"><!-- 本地CSS -->
<script src="/resources/js/jquery-1.7.2.min.js"></script>
<!-- jBox -->
<script charset="utf-8" src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
<script charset="utf-8" src="/resources/Plug-in/jbox-v2.3/jBox/i18n/jquery.jBox-zh-CN.js"></script>
<script src="/resources/js/intention/addHouseIntention.js"></script>
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
	padding-left: 140px;
	padding-top: 20px;
}
.jianju{
	margin-left: 12px;
}
.jianjus{
	margin-left: 24px;
}
input[type="text"]{
	width: 179px;
	height: 34px;
	border-radius: 4px;
	border: 1px solid #ccc;
	text-indent: 5px;
	float: none;
}
select{
	float: none;
}
textarea{
	width: 179px;
	height: 34px;
	border-radius: 4px;
	border: 1px solid #ccc;
	text-indent: 5px;
	float: none;
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
    <form class="form-inline" action="/intention/addHouseIntention" method="POST" id="addSubmit">
    	<div class="dfs">
			<span class="titles">意向房源信息</span>
			<table border="0">
				<tr>
				  	<td style="padding-left: 20px;">
				    	<dl style="float: left;">
			            	<dt style="float: left;">所属物业</dt>
			                <dd style="float: left;margin-left: 12px;">
					        	<div class="main-box-list" style="position: relative;" >
									<input type="text" data-validation-engine="validate[required]" class="form-control vaildbox data-change1" id="conhouseno" placeholder="点击搜索物业" readonly="readonly" required="required" style="width: 300px;text-indent: 0;">
									<span class="error-tisp"></span>
									<div id="queryList" style="border: 1px solid rgb(221, 221, 221);border-radius: 3px;background: rgb(255, 255, 255);">
										<div id="search-box"><input type="text" placeholder="输入物业名" style="width: 100%;border: none;border-bottom: 1px solid #ddd;border-radius: 0;text-indent: 10px;"></div>
										<div id="search-show">
											<div class="search-tisp">没有数据</div>
										</div>
									</div>
							   </div>
			                </dd>
			            </dl>
			           <!--  <input type="text" name="propertyInfo_Id" id="propertyInfo_Id" style="display: none;"> -->
			            <span style="line-height: 30px;margin-left: 24px;" id='tishi'></span>
					</td>
				  </tr>
				  <tr>
				    <td style="padding-left: 20px;">房源房号<input type="text" class="form-control jianju" onblur="addBefore()" name="phi_address" placeholder="房源房号" data-validation-engine="validate[required]"></td>
				  </tr>
				  <tr>
				    <td style="padding-left: 20px;">房源标题<input type="text" class="form-control jianju" name="phi_name" placeholder="房源标题" data-validation-engine="validate[required]"></td>
				    <td>房东报价<input type="text"  class="form-control jianju" name="phi_money" placeholder="房源价格/月" data-validation-engine="validate[custom[integer],required]"></td>
				  </tr>
				  <tr>
				    <td style="padding-left: 20px;">房源楼层<input type="text"  class="form-control jianju" name="phi_floor" placeholder="房源楼层" data-validation-engine="validate[custom[integer],required]"></td>
				    <td>楼层总数<input type="text" class="form-control jianju"  name="phi_total_floor" placeholder="楼层总数" data-validation-engine="validate[custom[integer],required]"></td>
				  </tr>
				  <tr>
				    <td style="padding-left: 20px;">联系人<input type="text" class="form-control jianjus" name="phi_user" placeholder="联系人" data-validation-engine="validate[required]"></td>
				    <td>联系电话<input type="text" class="form-control jianju" name="phi_phone" placeholder="联系电话" data-validation-engine="validate[required,custom[phone],maxSize[11],minSize[11]]"></td>
				  </tr>
				  <tr>
				    <td style="padding-left: 20px;"><span style="float: left;display: block;">房源来源</span>
				    	<select class="form-control jianju" name="hs_id">
					    	<option value="1">线下拓展</option>
					    	<option value="5">58同城</option>
					    	<option value="6">赶集网</option>
					    	<option value="7">安居客</option>
					    	<option value="2">中介介绍</option>
					    	<option value="3">转介绍</option>
					    	<option value="8">官网</option>
					    	<option value="4">其他</option>
						</select>
					</td>
				  </tr>
				  <tr>
				    <td colspan="3" style="padding-left: 20px;"><span style="float: left;display: block;">房源概况</span><textarea class="form-control jianju" name="phi_status" style="width: 630px;" rows="3" data-validation-engine="validate[required]"></textarea></td>
				  </tr>
				  <tr>
				    <td style="padding-left: 20px;" colspan="6">
				    	<span style="float: left;margin-right: 12px;">房源优势</span>
				    	
					    <label class="type-label" onclick="changeType(this)" for="type1">
					    	<span class="glyphicon glyphicon-remove-circle delete" onclick="deleteType(this);"></span>
							家电齐全<i></i> 
							<input type="checkbox" class="type-radio" name="phi_configure" value="家电齐全" id="type1">
						</label>
						
					    <label class="type-label" onclick="changeType(this)" for="type2">
					    <span class="glyphicon glyphicon-remove-circle delete" onclick="deleteType(this);"></span>
							3号线<i></i> 
							<input type="checkbox" class="type-radio" name="phi_configure" value="3号线" id="type2">
						</label>
						
					    <label class="type-label" onclick="changeType(this)" for="type3">
					    <span class="glyphicon glyphicon-remove-circle delete" onclick="deleteType(this);"></span>
							精装修<i></i> 
							<input type="checkbox" class="type-radio" name="phi_configure" value="精装修" id="type3">
						</label>
						
						<label class="type-label" onclick="add();" id="addPz">
							+
						</label>
					</td>
				  </tr>
				  <tr>
				  	<td colspan="3" style="padding-left: 78px;"><button class="btn btn-info" style="width:70px;margin-bottom: 30px;" type="button" onclick="addSub();">保存</button></td>
				  </tr>
			</table>
		</div>
	</form>
	<script>
		function addSub(){
			if($("input[name='phi_name']").val() == "" || $("input[name='propertyInfo_Id']").val() == ""){
			}else{
				$.ajax({
				    type: "POST",
				    url: "/intention/addHouseIntention",
				    data: $('#addSubmit').serialize(),
				    contentType: "application/x-www-form-urlencoded; charset=utf-8",
				    dataType: "json",
				    async:false,
				    success: function(result) {
				    	if(result.result == 0){
				    		$.jBox.tip('该房源已存在,请仔细检查物业或房号');
				    	}else if(result.result == 2){
				    		$.jBox.tip('添加失败');
				    	}else{
				    		window.location.href = '/intention/houseIntention';
				    	}
				    }
				});
			}
		}
		
		function addBefore(){
			if($("input[name='phi_address']").val() == "" || $("input[name='propertyInfo_Id']").val() == ""){
			}else{
				$.ajax({
				    type: "POST",
				    url: "/intention/addBefore",
				    data: "phi_address="+$("input[name='phi_address']").val()+"&propertyInfo_Id="+$("input[name='propertyInfo_Id']").val(),
				    contentType: "application/x-www-form-urlencoded; charset=utf-8",
				    dataType: "json",
				    async:false,
				    success: function(result) {
				    	if(result.result == 0){
				    		$.jBox.tip('该房源已存在,请仔细检查物业或房号');
				    	}else{
				    	}
				    }
				});
			}
		}
	</script>