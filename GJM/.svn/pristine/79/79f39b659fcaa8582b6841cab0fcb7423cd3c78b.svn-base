<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<!DOCTYPE>
<html>
  <head>
    <title>托管订单</title>
  </head>
<link href="/resources/css/manage_index.css" rel="stylesheet" type="text/css">
<link href="/resources/css/print.css" rel="stylesheet" type="text/css">
<link href="/resources/css/ProjectManagement.css" rel="stylesheet" type="text/css">
<link href="/resources/css/perfect-scrollbar.css" rel="stylesheet" type="text/css">
<link href="/resources/css/select_xs.css" rel="stylesheet" type="text/css">
<link href="/resources/css/body.css" rel="stylesheet" type="text/css">
<link href="/resources/common/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="/resources/js/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="/resources/js/jquery.cookie.js"></script>
<script type="text/javascript" src="/resources/js/manage_index_right.js"></script>
<script type="text/javascript" src="/resources/js/trusteeshipOrder.js"></script>
<!-- 弹出层 -->
<script type="text/javascript" src="/resources/fancybox/jquery.mousewheel-3.0.4.pack.js"></script>
<script type="text/javascript" src="/resources/fancybox/jquery.fancybox-1.3.4.pack.js"></script>
<link rel="stylesheet" type="text/css" href="/resources/fancybox/jquery.fancybox-1.3.4.css" media="screen" />
<!-- End -->
<style>
.billList tr td{
    font-size: 12px;
}
#contentDiv{
position: relative;
}
.billList{
	width:98.4%;
	height:auto;
	overflow:hidden;
	background:#FFF;
	position: absolute;
	top:70px;
	left: 0.8%;
	box-shadow: 0 1px 3px 0 rgba(0,0,0,.14);
	z-index: 100;
	display: none;
    min-width: 1405px;
}
.billList .billList_title{
	width: 100%;
	height: 35px;
}
.billList .billList_title span{
	display: block;
	height: 35px;
	line-height: 35px;
	font-size: 15px;
	text-indent: 20px;
}
.billList .billList_title a{
	display: block;
    width: 22px;
    height: 22px;
    position: absolute;
    top: 7px;
    right: 20px;
    background: url(/resources/image/close.png) no-repeat;
}
    
.billList table{
	width:100%;
	box-shadow: 0 0 0 #FFF;
}
.billList table thead{
	background:url(/resources/image/th.gif) repeat-x;
	height: 34px;
    line-height: 34px;
}

.billList table tr{
	height: 35px;
	line-height: 35px;
}
.billList table tr td{
text-indent: 11px;
}

.billList table tbody tr{
	border-bottom:  solid 1px #d3dbde;
}
.billList table tbody tr td{
	border-right: dotted 1px #c7c7c7;
}
#loading{
	width:100%;
	height:400px;
	background-color: #000;
	opacity: 0.3;
	position: absolute;
	top: 0;
	left:0;
	z-index: 100;
}
#loadingDiv{
	width: 400px;
	height: 81px;
	line-height:81px;
	background-color: #FFF;
	z-index: 101;
	position: absolute;
	top: 30%;
	left:40%;
}
#loadingDiv img{
	float: left;
}
#loadingDiv span{
	width:190px;
	float:left;
	display:block;
	height: 81px;
	line-height:81px;
	font-size: 16px;
}
.toolbar_input #to_people {
  width: 90px;
  height: 32px;
  line-height: 32px;
  border: 1px solid #CCC;
  text-indent: 5px;
</style>
  <body style="min-width: 1210px;">

    <div id="contentDiv">
	    <div class="rightinfo">
	    <div class="tools">
	    	<ul class="toolbar">
	        	<li class="click" style="width: 90px;"><span class="table-icon table-icon-refresh"></span><a id="insert" href="javascript:refresh();">刷新</a></li>
	        	<li class="click" style="width: 90px;"><span class="table-icon table-icon-pay"></span><a id="insert" href="javascript:ck();">付租</a></li>
	        </ul>
	        <ul class="searchBar">
	       		<li><input type="text" id="orderInput" onblur="data()" placeholder="订单号/租客/管家" /></li>
	       		<li style="margin-left: 10px;"><select id="orderType" onchange="data()"><option value="状态">状态</option><option value="逾期">逾期</option><option value="催租">催租</option><option value="未还款">未还款</option><option value="待还款">待还款</option></select></li>
	       		<li style="margin-left: 10px;"><select id="to_people" name="to_people" onchange="data()"><option value="合作伙伴">合作伙伴</option></select></li>
	        </ul>
	        <!-- 
	        <ul class="toolbar1">
	        	<li onclick="updateOrder()"><span style="display: block; width: 21px; height: 19px; float: left; margin-top: 7px; margin-left: 5px; margin-right: 5px;"><img src="/resources/image/loading.png"/></span>同步</li>
	        </ul> -->
	    </div>
    <div id="content">
        
        <div id="tableContent">
         <table class="tablelist" id="tableData">
         	<thead>
         		<tr>
             <td ><!-- <input name="" type="checkbox" value="" id="ck_all" style="margin-top: 5px;" />&nbsp; -->
		            <div class="checkbox checkbox-success" id="ck_all">
	                    <input id="checkbox0" type="checkbox">
	                    <label for="checkbox0" id="ckLabel">
	                    </label>
                    </div>
		            </td>
            <td>编号<i class="sort"><a href="javascript:showHide_contentShow();"><img src="/resources/image/px.gif" /></a></i>
            	<div class="div_showHide">
                	<i class="showHide_list"></i>
                    <div class="showHide_content">
                    	
                    </div>
                </div>
            </td>
        	<td>订单号</td>
        	<td>合同号</td>
        	<td>是否催租</td>
        	<td>订单类型</td>
        	<td>房东信息</td>
        	<td>管家信息</td>
        	<td>订单状态</td>
        	<td>支付状态</td>
        	<td>当期金额</td>
        	<td>总租金</td>
        	<td>订单生成时间</td>
            </tr>
         	</thead>
            <tbody>
            </tbody>
            </table>
        </div>
    </div>
    	<div class="billList">
    	<div class="billList_title">
    		<span>订单记录信息</span>
    		<a href='javascript:billListClose();'></a>
    	</div>
    		<table>
    			<thead>
    				<tr>
    				<td>期数</td>
    				<td>订单号</td>
    				<td>是否催租</td>
    				<td>租客信息</td>
    				<td>账单状态</td>
    				<td>金额</td>
    				<td>实收金额</td>
    				<td>应还款时间</td>
    				<td>实际支付时间</td>
    				<td>逾期天数</td>
    				<td>支付方式</td>
    				<td>催租短信</td>
    				</tr>
    			</thead>
    			<tbody>
    				
    			</tbody>
    		</table>
    	</div>
 <div class="pagin">
 	<div class="message" style="border: 0px; margin-top: 0;">共<i class="blue" id="nums"></i>条记录，当前显示第&nbsp;<i class="blue" id="Num">1</i>&nbsp;页，共&nbsp;<i class="blue" id="sizeNum"></i>&nbsp;页&nbsp;有效账单<i class="blue" id="sizeCount" style="float:none; margin-left: 0;"></i>条</div>
     <ul class="paginList">
     
     </ul>
 </div>
    </div>
</div>
 <div id="loadings" style="display: none;">
 	<div id="loading"></div>
 	<div id="loadingDiv"><img src="/resources/image/loadings.gif"><span>正在同步中，请耐心等待...</span></div>
 </div>
 <div id="data"></div>
