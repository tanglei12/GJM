<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE>
<html>
  <head>
    <title>审核测评</title>
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
<script charset="utf-8" src="<%= request.getContextPath()%>/resources/js/evaluationPerson/auditingEvaluationPerson.js"></script>
<style>
.prebj{
	width: 90%;
	margin-left: 5%;
	background-color: #fff;
	margin-bottom: 2%;
}
.divbj{
	width: 90%;
	margin-left: 5%;
}
span{
	font-size: 17px;
	font-family: 微软雅黑;
	color: #5F5F5F;
}
.sp{
	font-size: 15px;
	color: #F0405D;
	margin-left: 2%;
}
.divbj tr td{
	width: 20%;
	margin-left: 5%;
	
}
.place {
    height: 2px;
    background: #3eafe0;
    position: fixed;
    width: 100%;
    margin-top: -1.2%;
}
.dfs{
	width:90%;
	min-width:1080px;
	padding:5px 30px;
	margin-top:2%;
	margin-left: 5%;
	margin-bottom:2%;
	border:4px solid #abcdef;
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
	margin-left: 20px;
}
.jianjuDo{
	padding-bottom: 20px;
}
.success{
	background-image: url("/resources/image/ghf.jpg");
	filter:
		"progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale')";
	-moz-background-size: 100% 100%;
	background-size: 100% 100%;
	width: 150px;
	height: 150px;
}
</style>
    <h3 align="center">平安银行新一贷测评记录</h3>
    <pre class="prebj" style="">测评人: ${userCenterEvaluationPerson.ep_name}       性别: ${userCenterEvaluationPerson.ep_sex}

测评电话: ${userCenterEvaluationPerson.ep_phone}

测评时间: <fmt:formatDate value="${userCenterEvaluationPerson.ep_time}" type="both"/>

<c:if test="${userCenterEvaluationPerson.ep_state == 'edit'}">贷款状态: <span style="color: green;">审核中</span></c:if><c:if test="${userCenterEvaluationPerson.ep_state == 'success'}">贷款状态: <span style="color: rgb(245, 121, 3);">成功</span></c:if><c:if test="${userCenterEvaluationPerson.ep_state == 'error'}">贷款状态: <span style="color: red;">失败</span></c:if>
<c:if test="${not empty userCenterEvaluationPerson.ep_money}">
贷款金额: ${userCenterEvaluationPerson.ep_money}万元</c:if>       <c:if test="${not empty userCenterEvaluationPerson.ep_wayMon}">分成金额: ${userCenterEvaluationPerson.ep_wayMon}元</c:if>

<c:if test="${not empty userCenterEvaluationPerson.ep_leave}">剩余佣金: ${userCenterEvaluationPerson.ep_leave}元</c:if>
    </pre>
    <table class="table table-hover divbj">
    	<thead>
	      <tr>
	         <th>名称</th>
	         <th>内容</th>
	      </tr>
	   </thead>
	   <tbody>
		   <c:forEach items="${userCenterEvaluationContentList}" var="content">
		   		 <tr style="height: 40px;">
	         		<td  width="550px">${content.ec_title }</td>
	         		<td>${content.ec_content }</td>
	      		</tr>
		   </c:forEach>
   	   </tbody>
   </table>
   <h3 align="center" id="jss" style="display: none;">结算明细</h3>
   <table class="table table-hover divbj" style="display: none;">
    	<thead>
	      <tr>
	         <th>名称</th>
	         <th>百分比</th>
	         <th>金额</th>
	         <th>状态</th>
	         <th>时间</th>
	      </tr>
	   </thead>
	   <tbody  id="fcfs">
		   
   	   </tbody>
   </table>
	<form class="form-inline" alt="First slide" action="/evaluationPerson/updateState" method="POST" id="addSubmit">
		<input type="hidden" name="token" value="${token}">
		<div class="dfs">
			<span class="titles">结算信息</span>
			<table>
				<tr>
					<td class="jianjuDo">贷款金额 <input name="ep_money" class="form-control jianju" type="text" placeholder="贷款金额"><span class="jianju">万元</span></td>
					<td class="jianjuDo">分成金额<input onkeyup="this.value=this.value.replace(/[^0-9]\D*$/,'')" name="ep_wayMon" id="fall" class="form-control jianju" type="text" placeholder="分成金额"><span class="jianju">元</span></td>
				</tr>
				<tr>
					<td class="jianjuDo">一级分成<input name="one" onkeyup="this.value=this.value.replace(/[^0-9]\D*$/,'')" class="form-control jianju" type="text" placeholder="一级分成"><span class="jianju">%</span></td>
					<td class="jianjuDo">二级分成<input name="two" onkeyup="this.value=this.value.replace(/[^0-9]\D*$/,'')" class="form-control jianju" type="text" placeholder="二级分成"><span class="jianju">%</span></td>
				</tr>
				<tr>
					<td class="jianjuDo">三级分成<input name="three" onkeyup="this.value=this.value.replace(/[^0-9]\D*$/,'')" class="form-control jianju" type="text" placeholder="三级分成"><span class="jianju">%</span></td>
					<td class="jianjuDo">四级分成<input name="four" onkeyup="this.value=this.value.replace(/[^0-9]\D*$/,'')" class="form-control jianju" type="text" placeholder="四级分成"><span class="jianju">%</span></td>
				</tr>
			   <tr>
			   		<td class="jianjuDo"><input type="button" class="btn btn-success" style="width: 120px;" onclick="updateState(this);" value="贷款成功">&nbsp;&nbsp;&nbsp;<input type="button" class="btn btn-danger" style="width: 120px;" onclick="updateState(this);" value="贷款失败"></td>
			   </tr>
			   <tr style="display: none"><td><input type="text" name="ep_id" id="ep_id" value="${userCenterEvaluationPerson.ep_id}"></td></tr>
			   <tr style="display: none"><td><input type="text" name="uda_id" value="${userCenterEvaluationPerson.uda_id}"></td></tr>
			   <tr style="display: none"><td><input type="text" name="ep_state"></td></tr>
			</table>
		</div>
	</form>
<script>
	var state ='${userCenterEvaluationPerson.ep_state}';
	if(state == 'edit'){
		
	}else if(state == 'error'){
		$("#addSubmit").css("display","none");
	}else{
		$("#addSubmit").css("display","none");
		$.ajax({
		    type: "POST",
		    url: "/evaluationPerson/selectSeparate",
		    data: "&ep_id="+$("#ep_id").val(),
		    contentType: "application/x-www-form-urlencoded; charset=utf-8",
		    dataType: "json",
		    async:false,
		    success: function(result) {
		    	$(".divbj").css("display","block");
		    	$("#jss").css("display","block");
		    	$.each(result.userCenterSeparateList, function(idx, separate) {
		    		var tts = format(separate.ew_date, 'yyyy-MM-dd HH:mm:ss');
			    	$("#fcfs").append("<tr><td>"+separate.uda_account+"</td><td>"+separate.ew_percent+"%</td><td>"+separate.ew_money+"</td><td>"+separate.ew_state+"</td><td>"+tts+"</td></tr>");
	    		});
		    }
		    });
	}
</script>