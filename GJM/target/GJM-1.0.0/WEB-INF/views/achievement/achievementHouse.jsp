<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>房屋业绩</title>
<!-- 底部 CSS样式 -->
<link href="/resources/css/manage_index.css" rel="stylesheet" type="text/css">
<link href="/resources/css/body.css" rel="stylesheet" type="text/css">
<link href="/resources/css/serve/serve.css" rel="stylesheet" type="text/css">
<link href="/resources/common/sweet-alert/css/sweet-alert.css" rel="stylesheet" type="text/css">
<link href="/resources/common/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

<script src="/resources/js/jquery-1.7.2.min.js"></script>
<script src="/resources/js/manage_index_right.js"></script>
<script src="/resources/js/common/common.js"></script>
<script src="/resources/common/sweet-alert/js/sweet-alert.min.js"></script><!-- 提示弹窗 -->
<script src="/resources/js/product/jquery-cookie.js"></script><!-- cookie -->
<script src="/resources/js/achievement/achievementHouse.js"></script>
</head>
<body>
<!-- 主体 -->
    <!-- 房屋信息 -->
	<div id="contentDiv">
	<div class="rightinfo">
	 	<!-- 操作栏 -->
		<div class="tools">
	    	<ul class="toolbar">
	        	<li class="click"><span class="table-icon table-icon-sh"></span><a href="javascript:achievementUpdate();">调整业绩</a></li>
	        </ul>
	        <ul class="searchBar">
	       		
	       	</ul>
	    </div>
	    <div id="content">
				<div id="tableContent">
					<table class="tablelist" id="tableData">
						<thead>
							<tr>
					            <td>
					            	<div class="checkbox checkbox-success" id="ck_all">
					                    <input id="checkbox0" type="checkbox">
					                    <label for="checkbox0" id="ckLabel">
					                    </label>
			                    	</div>
					            </td>
					            <td>编号<i class="sort"><a href="javascript:showHide_contentShow();"><img src="/resources/image/px.gif" /></a></i>
						          	<div class="div_showHide">
						              	<i class="showHide_list"></i>
						                  <div class="showHide_content"></div>
						            </div>
				           		</td>
				        		<td>房屋地址</td>
				        		<td>业绩类型</td>
				        		<td>旧业绩金额</td>
					      		<td>新业绩金额</td>
				        		<td>审核状态</td>
				        		<td>亏损天数</td>
				        		<td>亏损金额</td>
				        		<td>合同起始时间</td>
				          	</tr>
						</thead>
						<tbody>
						</tbody>
					</table>
				</div>
			</div>
			<div class="pagin" style="display: none;">
		  	<div class="message" style="border: 0px; margin-top: 0;">共<i class="blue" id="nums"></i>条记录，当前显示第&nbsp;<i class="blue" id="Num">1</i>&nbsp;页，共&nbsp;<i class="blue" id="sizeNum"></i>&nbsp;页</div>
		    <ul class="paginList">
		    </ul>
			</div>
		<div id="data"></div>
		</div>
    </div>
</body>
</html>