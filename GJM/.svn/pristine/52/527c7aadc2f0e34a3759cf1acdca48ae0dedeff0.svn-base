<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
    <title>账单管理</title>
  </head>
<link href="/resources/css/manage_index.css" rel="stylesheet" type="text/css">
<link href="/resources/css/print.css" rel="stylesheet" type="text/css">
<link href="/resources/css/ProjectManagement.css" rel="stylesheet" type="text/css">
<link href="/resources/css/perfect-scrollbar.css" rel="stylesheet" type="text/css">
<link href="/resources/css/select_xs.css" rel="stylesheet" type="text/css">
<link href="/resources/css/body.css" rel="stylesheet" type="text/css">
</head>
<script type="text/javascript" src="/resources/js/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="/resources/js/jquery.cookie.js"></script>
<script type="text/javascript" src="/resources/js/order.js"></script>
<script type="text/javascript" src="/resources/js/manage_index_right.js"></script>
<!-- 弹出层 -->
<script type="text/javascript" src="/resources/fancybox/jquery.mousewheel-3.0.4.pack.js"></script>
<script type="text/javascript" src="/resources/fancybox/jquery.fancybox-1.3.4.pack.js"></script>
<link rel="stylesheet" type="text/css" href="/resources/fancybox/jquery.fancybox-1.3.4.css" media="screen" />
<!-- End -->
<style>
#contentDiv{
position: relative;
}
.billList{
	width:400px;
	height:auto;
	overflow:hidden;
	background:#FFF;
	position: absolute;
	top:70px;
	left: 0;
	box-shadow: 0 0 14px #ccc;
	z-index: 100;
	display: none;
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
</style>
  <body>

    <div class="rightinfo">
    <div class="tools">
    	<ul class="toolbar">
        	<li class="click" style="width: 90px;"><span><img src="/resources/image/t10.png" /></span><a id="insert" href="javascript:refresh();">刷新</a></li>
        </ul>
       <ul class="toolbar_input">
       	<li><input type="text" id="orderInput" onblur="data()" placeholder="订单号/租客/管家" /></li>
       	<li style="margin-left: 10px;"><select id="orderType" onchange="data()"><option value="状态">状态</option><option value="逾期">逾期</option><option value="催租">催租</option><option value="未还款">未还款</option><option value="待还款">待还款</option></select></li>
       </ul>
        <ul class="toolbar1">
        <li onclick="updateOrder()"><span style="display: block; width: 21px; height: 19px; float: left; margin-top: 7px; margin-left: 5px; margin-right: 5px;"><img src="/resources/image/loading.png"/></span>同步</li>
        </ul>
    </div>
    <div id="contentDiv">
    <div id="content">
        <div id="tableTitle">
            <ul>
            <li ><input name="" type="checkbox" value="" id="ck_all"/>&nbsp;</li>
            <li>编号<i class="sort"><a href="javascript:showHide_contentShow();"><img src="/resources/image/px.gif" /></a></i>
            	<div class="div_showHide">
                	<i class="showHide_list"></i>
                    <div class="showHide_content">
                    	
                    </div>
                </div>
            </li>
        	<li>订单号</li>
        	<li>合同号</li>
        	<li>租客信息</li>
        	<li>管家信息</li>
        	<li>支付状态</li>
        	<li>当期金额</li>
        	<li>总租金</li>
        	<li>订单生成时间</li>
            </ul>
        </div>
        <div id="tableContent">
         <table class="tablelist" id="tableData">
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
    				<td>租客信息</td>
    				<td>账单状态</td>
    				<td>金额</td>
    				<td>应还款金额</td>
    				<td>应还款时间</td>
    				<td>实际支付时间</td>
    				<td>支付方式</td>
    				</tr>
    			</thead>
    			<tbody>
    				
    			</tbody>
    		</table>
    	</div>
    </div>
</div>
 <div class="pagin">
 	<div class="message" style="border: 0px; margin-top: 0;">共<i class="blue" id="nums"></i>条记录，当前显示第&nbsp;<i class="blue" id="Num">1</i>&nbsp;页，共&nbsp;<i class="blue" id="sizeNum"></i>&nbsp;页&nbsp;有效账单<i class="blue" id="sizeCount" style="float:none; margin-left: 0;"></i>条</div>
     <ul class="paginList">
     
     </ul>
 </div>
 <div id="loadings" style="display: none;">
 	<div id="loading"></div>
 	<div id="loadingDiv"><img src="/resources/image/loadings.gif"><span>正在同步中，请耐心等待...</span></div>
 </div>
 <div id="data"></div>
</body>
</html>
