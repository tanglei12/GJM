<%@page import="com.gjp.util.AppUtil"%>
<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE>
<html>
<head>
<title>跟进房源</title>
<link href="/resources/css/manage_index.css" rel="stylesheet" type="text/css">
<link href="/resources/css/common/common.css" rel="stylesheet" type="text/css">
<link href="/resources/common/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<!-- 弹窗警示样式 -->
<link href="/resources/common/sweet-alert/css/sweetalert.css" rel="stylesheet" type="text/css">
<!-- jBox皮肤样式 -->
<link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">
<!-- 多选按钮 -->
<link href="/resources/css/contractList/displayContract.css" rel="stylesheet" type="text/css">
<link href="/resources/css/purchase/purchaseOrderList.css" rel="stylesheet" type="text/css">


<script src="/resources/js/jquery-1.7.2.min.js"></script>
<script src="/resources/js/common/common.js"></script>
<script src="/resources/js/manage_index_right.js"></script>
<!-- 弹窗警示样式 -->
<script src="/resources/common/sweet-alert/js/sweetalert-dev.js"></script>
<!-- cookie -->
<script src="/resources/js/product/jquery-cookie.js"></script>
<!-- 日期控件 -->
<script src="/resources/common/My97DatePicker/WdatePicker.js"></script>
<!-- jBox -->
<script src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js" charset="utf-8" ></script>
<script src="/resources/Plug-in/jbox-v2.3/jBox/i18n/jquery.jBox-zh-CN.js" charset="utf-8"></script>

<script src="/resources/js/purchase/purchaseOrderList.js"></script>

</head>
<body>
	<!-- 物品库存信息 -->
	<div id="contentDiv" style="margin-top: 0px;">
		 <div class="rightinfo">
		    <!-- 操作栏 -->
		    <div class="tools">
		    <!-- 操作栏 -->
				<ul class="searchBar">
					<li class="timeClick mouseDown" onclick="timeClick(this)">全部</li>
					<li class="timeClick" onclick="timeClick(this)">今天</li>
					<li class="timeClick" onclick="timeClick(this)">最近一周</li>
					<li class="timeClick" onclick="timeClick(this)">最近一月</li>
					<li class="timeClick" onclick="showTime(this)" style="margin-right: 0;">自定义时间</li>
					<li class="inputTime">
						<div class="dateTimeTitle">
							<i class="icon-calendar"></i>
							<div class="dateTimeContent">
								<input type="text" class="dateTime1" onfocus="dates()" />
								<i class="dateTimeC"></i>
								<input type="text" class="dateTime2" onfocus="dates()" />
							</div>
						</div>
					</li>
					<li class="jselect" onclick="accurateSelect()">精确查询<i></i></li>
				</ul>
				<!-- <ul class="searchBar">
		        	<li class="click">
		        		<select class='form-control' id="houseType" onchange="selectByCondition();" style="height: 40px;">
		        			<option value='myHouse'>我的房源</option>
		        			<option value='departmentHouse'>部门房源</option>
		        			<option value='allHouse'>全部房源</option>
		        		</select>
		        	</li>
		        	
		        	<li class="click">
		        		<select class='form-control' id="fangyuanid" onchange="selectByCondition();" style="height: 40px;">
		        			<option selected='selected' value=''>房源来源</option>
		        			<option value='线下拓展'>线下拓展</option>
		        			<option value='中介合作'>中介合作</option>
		        			<option value='转介绍'>转介绍</option>
		        			<option value='58同城'>58同城</option>
		        			<option value='赶集网'>赶集网</option>
		        			<option value='安居客'>安居客</option>
		        			<option value='官网'>官网</option>
		        			<option value='其他'>其他</option>
		        		</select>
		        	</li>
		        </ul> -->
				<ul class="toolbar">
					<li class="click"><span class="table-icon table-icon-add"></span><a href="javascript:;" class="cd-popup-trigger3">增加</a></li>
		        </ul>
			</div>
			<div class="selectDiv">
				<div class="button">
					<ul>
						<li class="buttonTitle" onclick="addWhere()">增加条件</li>
						<li class="buttonTitle" onclick="queryWhere()">搜索</li>
						<li class="buttonTitle" onclick="cleanWhere()">全部清除</li>
					</ul>
				</div>
				<div class="selectList">
				
				</div>
				<div class="selectCeng">
					<ul>
					
					</ul>
				</div>
		    </div>
			<input type="hidden" id="gj-id" value="<%=AppUtil.getCookieEmployee().getEm_account()%>"/>
		</div>
		
		<div id="content">
	        <div id="tableContent">
	        	<table class="tablelist" id="tableData">
	         		<thead>
	         		 	<tr>
		             		<td >
		            			<div class="checkbox checkbox-success" id="ck_all">
	                    			<input id="checkbox0" type="checkbox">
	                    			<label for="checkbox0" id="ckLabel"></label>
                    			</div>
		            		</td>
		           			<td>编号<i class="sort"><a href="javascript:showHide_contentShow();"><img src="/resources/image/px.gif" /></a></i>
		            			<div class="div_showHide">
		                			<i class="showHide_list"></i>
		                    		<div class="showHide_content"></div>
		               	 		</div>
		            		</td>
	        				<!-- <td data-text="art_type">物品名称</td>
	        				<td data-text="art_name">物品类型</td>
	        				<td data-text="art_brand">物品品牌</td>
	        				<td data-text="art_price">物品单价</td>
	        				<td data-text="art_count">物品数量</td>
	        				<td data-text="art_priceSum">物品总价</td>
	        				<td data-text="art_payer">付费对象</td>
	        				<td data-text="art_spec">物品规格</td>
	        				<td data-text="art_on">新旧</td>
	        				<td data-text="art_remark">备注</td> -->
	        				<td data-text="pur_code">采购单唯一编码</td>
	        				<td data-text="pur_type">审核状态</td>
	        				<td data-text="pur_addTime">创建时间</td>
	        				<td data-text="pur_emId">申请人</td>
	        				<td data-text="pur_sumMoney">采购总价</td>
	        				<td data-text="pur_specification">采购说明</td>
	        				<!-- <td data-text="pur_purId">采购人</td>
	        				<td data-text="pur_purTime">采购时间</td>
	        				<td data-text="pur_audit_emid">审核人</td>
	        				<td data-text="pur_audit_time">审核时间</td>
	        				<td data-text="pur_audit_suggestion">审核意见</td> -->
	            		</tr>
	         		</thead>
	           		<tbody></tbody>
	        	</table>
	      </div>
	   </div>
	   <div class="pagin">
	    	<div class="message" style="border: 0px; margin-top: 0;">共<i class="blue" id="nums"></i>条记录，当前显示第&nbsp;<i class="blue" id="Num">1</i>&nbsp;页，共&nbsp;<i class="blue" id="sizeNum"></i>&nbsp;页</div>
	        	<ul class="paginList"></ul>
	    </div>
	</div>
    <div id="data"></div>
</body>
</html>
