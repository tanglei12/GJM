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
<link href="/resources/css/itemsManage/itemsList.css" rel="stylesheet" type="text/css">


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

<script src="/resources/js/itemsManage/itemsList.js"></script>

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
				<!-- <ul class="toolbar">
					<li class="click"><span class="table-icon table-icon-add"></span><a href="javascript:;" class="cd-popup-trigger3">增加</a></li>
		        </ul> -->
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
	        				<td data-text="phi_name">物品名称</td>
	        				<td data-text="phi_type">物品类型</td>
	        				<td data-text="phi_user">物品品牌</td>
	        				<td data-text="phi_phone">物品单价</td>
	        				<td data-text="phi_money">物品数量</td>
	        				<td data-text="phi_address">物品总价</td>
	        				<!-- <td data-text="propertyInfo_Name">办理人</td> -->
	        				<td data-text="hi_function">付费对象</td>
	        				<td data-text="phi_source">购买日期</td>
	        				<td data-text="phi_date">状态</td>
	        				<td data-text="em_name">新旧</td>
	        				<td data-text="phi_new_addTime">好坏</td>
	        				<td data-text="phi_new_addTime">备注</td>
	        				<td data-text="new_emName">位置</td>
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
	
	
	<!-- <div class="cd-popup3">
    		<div class="cd-popup-container3" id="cd-popup-container3">
				<div id="cd-buttons">
					<div style="margin: auto;width: 90%;text-align: center;padding: 15px 0px;border-bottom: 1px solid #06B; " id="titleInsert">
						<input type="text" value="物品库存添加" id="inputtext" name="inputtext" style="border: none;text-align: center;font-size: 20px;color: #3E97C9;font-family:微软雅黑; -moz-user-select: none;-webkit-user-select: none; cursor:default;" readonly="readonly" >
					</div>
					<dl style="width: 45%;margin-top: 30px;float: left;">
						<dt><em>*</em>&nbsp;物品类型：</dt>
						<dd>
							<select id="inv_type" class="selectDd" onchange="selectHouseTypeParent3(this.value)"></select>
						</dd>
					</dl>
					<dl style="width: 45%;margin-top: 30px;float: left;">
						<dt><em>*</em>&nbsp;物品名称：</dt>
						<dd>
							<select id="inv_name"  class="selectDd">
								<option value="">--请选择--</option>
							</select>
						</dd>
					</dl>
					<hr>
					<dl style="width: 45%;">
						<dt><em>*</em>&nbsp;物品品牌：</dt>
						<dd><input value=""  id="inv_brand" name="inv_brand" placeholder="物品品牌" class="updateInput" style="width: 488px;"></dd>
					</dl>
					<hr>
					<dl style="width: 45%;float: left;" >
						<dt><em>*</em>&nbsp;物品价格：</dt>
						<dd><input value=""  id="inv_price" name="inv_price" placeholder="物品价格" class="money updateInput" onchange="getPriceSum()" style="width: 110px;">（元）</dd>
					</dl>
					<dl style="width: 45%;float: left;" >
						<dt><em>*</em>&nbsp;物品数量：</dt>
						<dd><input value="1"  id="inv_count" name="inv_count" placeholder="物品数量" class="updateInput number" onchange="getPriceSum()"></dd>
					</dl>
					<hr>
					<dl style="width: 45%;float: left;">
						<dt><em>*</em>&nbsp;物品总价：</dt>
						<dd><input value="0"  id="inv_priceSum" name="inv_priceSum" placeholder="物品总价" class="updateInput money" readonly="readonly" style="width: 110px;background-color: #eee">（元）</dd>
					</dl>
					<dl style="width: 45%;float: left;" >
						<dt><em>*</em>&nbsp;付费对象：</dt>
						<dd>
							<select id="inv_payer"  class="selectDd" onchange="selectPayer(this.value)">
								<option value="">--请选择--</option>
								<option value="公司">公司</option>
								<option value="租客">租客</option>
								<option value="房东">房东</option>
							</select>
						</dd>
					</dl>
					<hr>
					<dl id="payerDl" style="width: 45%;float: left;display: none">
						<dt><em>*</em>&nbsp;业绩扣除：</dt>
						<dd>
							<label class="common-checkbox  common-checkbox-checked" style="margin-left: 0px;">
								<input type="radio" name="ir_isCalAchi" value="0" checked >扣除</label>
							<label class="common-checkbox" style="margin-left: 20px;">
								<input type="radio" name="ir_isCalAchi"  value="1" >不扣除</label>
						</dd>
					</dl>
					
					<dl style="width: 45%;float: left;">
						<dt><em>*</em>&nbsp;物品状态：</dt>
						<dd>
							<label class="common-checkbox  common-checkbox-checked" style="margin-left: 0px;">
								<input type="radio" name="inv_state" value="0" checked >空闲</label>
							<label class="common-checkbox" style="margin-left: 20px;">
								<input type="radio" name="inv_state"  value="1" >使用中</label>
						</dd>
					</dl>
					<dl style="width: 45%;float: left;">
						<dt><em>*</em>&nbsp;物品新旧：</dt>
						<dd>
							<label class="common-checkbox  common-checkbox-checked" style="margin-left: 0px;">
								<input type="radio" name="inv_on" value="新" checked >新</label>
							<label class="common-checkbox" style="margin-left: 35px;">
								<input type="radio" name="inv_on"  value="旧" >旧</label>
						</dd>
					</dl>
					<dl style="width: 45%;float: left;">
						<dt><em>*</em>&nbsp;物品好坏：</dt>
						<dd>
							<label class="common-checkbox  common-checkbox-checked" style="margin-left: 0px;">
								<input type="radio" name="inv_gb" value="好" checked >好</label>
							<label class="common-checkbox" style="margin-left: 35px;">
								<input type="radio" name="inv_gb"  value="坏" >坏</label>
						</dd>
					</dl>
					<hr>
					<div class="col-md-12  modelAdd" style="width: 100px;margin: auto;margin-top: 20px;">
						<input class="btn btn-info pull-left" id="addHouseInventory" type="button" value=" 提  交  " /> 
					</div>
				</div>	
				<a href="#0" class="cd-popup-close" style="color: red;">X</a>
			</div>
		</div> -->
		
</body>
</html>
