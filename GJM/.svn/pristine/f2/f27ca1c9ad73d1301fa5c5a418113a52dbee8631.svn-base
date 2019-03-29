<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
	response.setHeader("Pragma","No-cache");
	response.setHeader("Cache-Control","no-cache");
	response.setDateHeader("Expires", -10);
%>
<!DOCTYPE>
<html>
  <head>
    <title>内部人员</title>
  </head>
<meta http-equiv="Expires" CONTENT="0">
<meta http-equiv="Cache-Control" CONTENT="no-cache">
<meta http-equiv="Pragma" CONTENT="no-cache">
<link href="/resources/css/manage_index.css" rel="stylesheet" type="text/css">
<link href="/resources/css/print.css" rel="stylesheet" type="text/css">
<link href="/resources/css/ProjectManagement.css" rel="stylesheet" type="text/css">
<link href="/resources/css/perfect-scrollbar.css" rel="stylesheet" type="text/css">
<link href="/resources/css/select_xs.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="/resources/Plug-in/jQuery-Validation-Engine-master/css/validationEngine.jquery.css" type="text/css"/>
</head>
<script type="text/javascript" src="/resources/js/jquery-1.7.2.min.js"></script>
<!-- 弹出层 -->
<script type="text/javascript" src="/resources/fancybox/jquery.mousewheel-3.0.4.pack.js"></script>
<script type="text/javascript" src="/resources/fancybox/jquery.fancybox-1.3.4.pack.js"></script>
<script src="/resources/Plug-in/jQuery-Validation-Engine-master/js/jquery.validationEngine.js" type="text/javascript" charset="utf-8"></script>
<script src="/resources/Plug-in/jQuery-Validation-Engine-master/js/languages/jquery.validationEngine-zh_CN.js"></script>
<link rel="stylesheet" type="text/css" href="/resources/fancybox/jquery.fancybox-1.3.4.css" media="screen" />
<!-- End -->
<style>
.dfs{
	width:90%;
	padding:30px 30px;
	margin:50px;
	border:4px solid #ebcbbe;
}
.titles{
	display:block;
	width:150px;
	height:30px;
	position:relative;
	color:#333;
	top:-50px;
	font-size:22px;
	text-align: center;
	background: white;
}
td{
	padding-left: 60px;
	padding-top: 30px;
}
td #type{
	display: block;
	width: 77px;
	height: 34px;
	line-height: 34px;
	float: left;
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
input[type="password"]{
	width: 179px;
	height: 34px;
	border-radius: 4px;
	border: 1px solid #ccc;
	text-indent: 5px;
}
select{
	width: 90px;
	height: 34px;
	border-radius: 4px;
	border: 1px solid #ccc;
	text-indent: 5px;
	margin-left: 12px;
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
    margin-bottom: 5px;
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
</style>
<script type="text/javascript">
$(function(){
	$("#fromTable").validationEngine();
});
function checkd(id){
	if($(id).attr("id") == "man"){
		$("#man").attr("checked",true);
		$("#woman").attr("checked",false);
	}else{
		$("#man").attr("checked",false);
		$("#woman").attr("checked",true);
	}
}
function changeType(obj){
	if($(obj).find("input").is(":checked")){
		$(obj).removeClass("span-checked");
		$(obj).find("input").attr("checked",false);
	}else{
		$(obj).addClass("span-checked");
		$(obj).find("input").attr("checked",true);
	}
}
</script>
<body>

<div class="rightinfo">
	<div class="dfs">
		<span class="titles">用户注册</span>
		<form action="/user/userUpdateTo" method="post" id="fromTable">
		<input type="hidden" name="token" value="${token}">
			<table border="0">
				<tbody>
				  <tr>
				    <td style="padding-left: 20px; width: 240px;">用户名称<input type="text" class="validate[required] form-control jianju" name="name" placeholder="用户名称" aria-required="true" value="${userCenterEmployees.em_name}"></td>
				    <td>用户部门<input type="text" class="validate[required] form-control jianju" name="department" placeholder="用户部门" aria-required="true" value="${userCenterEmployees.em_position}" /></td>
				  </tr>
				  <tr>
				  <c:choose>
					 <c:when test="${userCenterEmployees.em_sex =='man'}">
					  	<td style="padding-left: 20px;">用户性别<input type="checkbox" style="margin-left: 15px; margin-right: 3px;" id="man" name="sex" value="man" onchange="checkd(this)" checked="checked" />男<input type="checkbox" onchange="checkd(this)" style="margin-left: 5px; margin-right: 3px;" name="sex" id="woman" value="woman" />女</td>
					  </c:when>
					  <c:otherwise>
					  	<td style="padding-left: 20px;">用户性别<input type="checkbox" style="margin-left: 15px; margin-right: 3px;" id="man" name="sex" value="man" onchange="checkd(this)" />男<input type="checkbox" onchange="checkd(this)" style="margin-left: 5px; margin-right: 3px;" name="sex" id="woman" value="woman" checked="checked" />女</td>
					  </c:otherwise>
				  </c:choose>
				  </tr>
				  <tr>
				    <td style="padding-left: 20px;">联系电话<input type="text" class="validate[required,custom[phone]] form-control jianju" name="phone" placeholder="联系电话" aria-required="true" value="${userCenterEmployees.em_phone}" /></td>
				  </tr>
				  <tr>
				    <td style="padding-left: 20px;">用户账号<input type="text" class="form-control jianju" name="account" readonly="readonly" style="background-color: #F1F1F1;" placeholder="用户账号" aria-required="true" value="${userCenterEmployees.em_account}" />
				    </td>
				    <td>用户密码<input type="password" class="form-control jianju" name="password" placeholder="用户密码" aria-required="true" /></td>
				  </tr>
				  <tr>
				    <td style="padding-left: 20px;">用户岗位<input type="text" class="validate[required] form-control jianju" name="station" placeholder="用户岗位" aria-required="true" value="${userCenterEmployees.em_post}"></td>
				  </tr>
				  <tr>
				    <td style="padding-left: 20px;" colspan="2">用户住址<input type="text" style="width: 477px;" class="form-control jianju" name="address" placeholder="用户住址" aria-required="true" value="${userCenterEmployees.em_address}"></td>
				  </tr>
				   <tr>
				   <c:choose>
					 <c:when test="${userCenterEmployees.em_state == 1}">
					  <td style="padding-left: 20px;" colspan="2">用户状态<select name="state"><option value="1">在职</option><option value="0">离职</option></select></td>
					  </c:when>
					  <c:otherwise>
					  <td style="padding-left: 20px;" colspan="2">用户状态<select name="state"><option value="0">离职</option><option value="1">在职</option></select></td>
					  </c:otherwise>
				  </c:choose>
				    
				  </tr>
				  <tr>
				    <td style="padding-left: 20px;" colspan="6">
				    	<span id="type">访问权限</span>
				    	<label class="type-label" onclick="changeType(this)" for="type1" id="type1">
							基本配置<i></i> 
							<input type="checkbox" class="type-radio" name="chek" value="基本配置">
						</label>
					    <label class="type-label" onclick="changeType(this)" for="type2" id="type2">
							房源管理<i></i> 
							<input type="checkbox" class="type-radio" name="chek" value="房源管理">
						</label>
					    <label class="type-label" onclick="changeType(this)" for="type3" id="type3">
							合同管理<i></i> 
							<input type="checkbox" class="type-radio" name="chek" value="合同管理">
						</label>
					    <label class="type-label" onclick="changeType(this)" for="type4" id="type4">
							服务管理<i></i> 
							<input type="checkbox" class="type-radio" name="chek" value="服务管理">
						</label>
					    <label class="type-label" onclick="changeType(this)" for="type5" id="type5">
							分析管理<i></i> 
							<input type="checkbox" class="type-radio" name="chek" value="分析管理">
						</label>
					    <label class="type-label" onclick="changeType(this)" for="type6" id="type6">
							财务管理<i></i> 
							<input type="checkbox" class="type-radio" name="chek" value="财务管理">
						</label>
					    <label class="type-label" onclick="changeType(this)" for="type7" id="type7">
							系统设置<i></i> 
							<input type="checkbox" class="type-radio" name="chek" value="系统设置">
						</label>
						<label class="type-label" onclick="changeType(this)" for="type8" id="type8">
							平安新一贷<i></i> 
							<input type="checkbox" class="type-radio" name="chek" value="平安新一贷">
						</label>
						<label class="type-label" onclick="changeType(this)" for="type9" id="type9">
							e兼职<i></i> 
							<input type="checkbox" class="type-radio" name="chek" value="e兼职">
						</label>
						<label class="type-label" onclick="changeType(this)" for="type10" id="type10">
							合同审核<i></i> 
							<input type="checkbox" class="type-radio" name="chek" value="合同审核">
						</label>
						<label class="type-label" onclick="changeType(this)" for="type11" id="type11">
							客户订单<i></i> 
							<input type="checkbox" class="type-radio" name="chek" value="客户订单">
						</label>
						<label class="type-label" onclick="changeType(this)" for="type12" id="type12">
							客户管理<i></i> 
							<input type="checkbox" class="type-radio" name="chek" value="客户管理">
						</label>
						<label class="type-label" onclick="changeType(this)" for="type13" id="type13">
							组织权限<i></i> 
							<input type="checkbox" class="type-radio" name="chek" value="组织权限">
						</label>
						<label class="type-label" onclick="changeType(this)" for="type14" id="type14">
							客户跟踪<i></i> 
							<input type="checkbox" class="type-radio" name="chek" value="客户跟踪">
						</label>
				    	<c:forEach var="userType" items="${userEmployeeType}" varStatus="status">
						 <c:if test="${userType.et_name =='基本配置'}">
							<script type="text/javascript">
								$("#type1").addClass("span-checked");
								$("#type1").find("input").attr("checked",true);
							</script>
						  </c:if>
						 <c:if test="${userType.et_name =='房源管理'}">
							<script type="text/javascript">
								$("#type2").addClass("span-checked");
								$("#type2").find("input").attr("checked",true);
							</script>
						  </c:if>
						 <c:if test="${userType.et_name =='合同管理'}">
							<script type="text/javascript">
								$("#type3").addClass("span-checked");
								$("#type3").find("input").attr("checked",true);
							</script>
						  </c:if>
						 <c:if test="${userType.et_name =='服务管理'}">
							<script type="text/javascript">
								$("#type4").addClass("span-checked");
								$("#type4").find("input").attr("checked",true);
							</script>
						  </c:if>
						 <c:if test="${userType.et_name =='分析管理'}">
							<script type="text/javascript">
								$("#type5").addClass("span-checked");
								$("#type5").find("input").attr("checked",true);
							</script>
						  </c:if>
						 <c:if test="${userType.et_name =='财务管理'}">
							<script type="text/javascript">
								$("#type6").addClass("span-checked");
								$("#type6").find("input").attr("checked",true);
							</script>
						  </c:if>
						 <c:if test="${userType.et_name =='系统设置'}">
						 	<script type="text/javascript">
								$("#type7").addClass("span-checked");
								$("#type7").find("input").attr("checked",true);
							</script>
						  </c:if>
						  <c:if test="${userType.et_name =='平安新一贷'}">
						 	<script type="text/javascript">
								$("#type8").addClass("span-checked");
								$("#type8").find("input").attr("checked",true);
							</script>
						  </c:if>
						  <c:if test="${userType.et_name =='e兼职'}">
						 	<script type="text/javascript">
								$("#type9").addClass("span-checked");
								$("#type9").find("input").attr("checked",true);
							</script>
						  </c:if>
						  <c:if test="${userType.et_name =='合同审核'}">
						 	<script type="text/javascript">
								$("#type10").addClass("span-checked");
								$("#type10").find("input").attr("checked",true);
							</script>
						  </c:if>
						  <c:if test="${userType.et_name =='客户订单'}">
						 	<script type="text/javascript">
								$("#type11").addClass("span-checked");
								$("#type11").find("input").attr("checked",true);
							</script>
						  </c:if>
						  <c:if test="${userType.et_name =='客户管理'}">
						 	<script type="text/javascript">
								$("#type12").addClass("span-checked");
								$("#type12").find("input").attr("checked",true);
							</script>
						  </c:if>
						  <c:if test="${userType.et_name =='组织权限'}">
						 	<script type="text/javascript">
								$("#type13").addClass("span-checked");
								$("#type13").find("input").attr("checked",true);
							</script>
						  </c:if>
						  <c:if test="${userType.et_name =='客户跟踪'}">
						 	<script type="text/javascript">
								$("#type14").addClass("span-checked");
								$("#type14").find("input").attr("checked",true);
							</script>
						  </c:if>
				    	</c:forEach>
					</td>
				  </tr>
				  <tr style="display: none;">
				    <td style="padding-left: 20px;" colspan="2">用户ID<input type="text" style="width: 477px;" class="form-control jianju" name="id" placeholder="用户ID" aria-required="true" value="${userCenterEmployees.em_id}"></td>
				  </tr>
				  <tr>
				    <td colspan="3" style="padding-left: 78px;"><button class="btn btn-info" style="width:90px;" type="submit">修改用户</button></td>
				  </tr>
				</tbody>
			</table>
		</form>
	</div>
</div>
 <div id="data"></div>
</body>
</html>