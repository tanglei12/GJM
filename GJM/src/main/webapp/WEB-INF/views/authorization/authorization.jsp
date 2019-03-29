<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%
	response.setHeader("Pragma","No-cache");
	response.setHeader("Cache-Control","no-cache");
	response.setDateHeader("Expires", -10);
%>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>组织架构</title>
	<link href="/resources/css/orgchart/font-awesome.min.css" rel="stylesheet" type="text/css"/>
<%--<link href="/resources/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />--%>
<%--<link href="/resources/css/framework.css" rel="stylesheet" type="text/css">--%>
<%--<!-- jBox皮肤样式 -->--%>
<%--<link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">--%>


	<link href="/resources/css/orgchart/jquery.orgchart.css" rel="stylesheet" type="text/css"/>
	<link href="/resources/css/orgchart/style.css" rel="stylesheet" type="text/css"/>

<script src="/resources/js/jquery-1.7.2.min.js"></script>
<!-- jBox -->
<script charset="utf-8" src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
<script charset="utf-8" src="/resources/Plug-in/jbox-v2.3/jBox/i18n/jquery.jBox-zh-CN.js"></script>
	<script src="/resources/js/orgchart/jquery.mockjax.min.js"></script>
	<script src="/resources/js/orgchart/jquery.orgchart.js"></script>
<!-- 时间控件 -->
<script src="/resources/Plug-in/My97DatePicker4.7.2/WdatePicker.js"></script>
<script src="/resources/js/authorization/authorization.js"></script>
<script src="/resources/js/manage_index_right.js"></script>
<style>
.jianju{
	margin-left: 12px;
}
.jianjus{
	margin-left: 24px;
}
</style>
</head>

<body>
<div id="center">
    <%--<table width="100%" class="frameworks" cellspacing="1" cellpadding="2" align="center" class="tab">
    	<tbody>
    		<tr>
    			<td align=center class="td1"><br>
    			    <table cellspacing="1" cellpadding="4">
				      <tr>
				        <td class="tdbottom" style="border: 1 solid #000000" nowrap>
				          <!--<a href='javascript:showers();'>管家婆</a> -->
				          <a class="organizationgs1" href='javascript:void();'>重庆管家婆房屋托管中心</a>
				        </td>
				      </tr>
				     </table>
				     <i></i>
				      <table border="0" cellspacing="0" cellpadding="0" width="100%">
    					 <tr class="one" id="organizationgs1">

    					 </tr>
    				  </table>
    			</td>
    		</tr>
    	</tbody>
    </table>--%>
		<div class="type-box">
		<!--显示组织架构图-->
		<div id="chart-container"></div>
</div>
</body>
</html>
