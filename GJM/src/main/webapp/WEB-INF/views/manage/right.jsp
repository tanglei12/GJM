<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
    <title>账单管理</title>
  </head>
<link href="/resources/css/print.css" rel="stylesheet" type="text/css">
<link href="/resources/css/ProjectManagement.css" rel="stylesheet" type="text/css">
<link href="/resources/css/perfect-scrollbar.css" rel="stylesheet" type="text/css">
<link href="/resources/css/select_xs.css" rel="stylesheet" type="text/css">
</head>
<script type="text/javascript" src="/resources/js/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="/resources/js/date.js"></script>
<script type="text/javascript" src="/resources/js/manage_index_right.js"></script>
<script src="/resources/js/perfect-scrollbar.js"></script>
<!-- 时间格式化-->
<script type="text/javascript" src="/resources/js/jquery.formatDate.js"></script>
<!-- 弹出层 -->
<script type="text/javascript" src="/resources/fancybox/jquery.mousewheel-3.0.4.pack.js"></script>
<script type="text/javascript" src="/resources/fancybox/jquery.fancybox-1.3.4.pack.js"></script>
<link rel="stylesheet" type="text/css" href="/resources/fancybox/jquery.fancybox-1.3.4.css" media="screen" />
<!-- End -->
    <div class="rightinfo">
    <div class="tools">
    	<ul class="toolbar">
        <%-- <li class="click"><span><img src="/resources/image/t01.png" /></span><a id="insert" href="#Zc">增加</a></li> --%>
        </ul>
        <ul class="toolbar1">
        <li><span><img src="/resources/image/t05.png" /></span>设置</li>
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
        	<li>用户姓名</li>
        	<li>用户手机</li>
        	<li>合同编号</li>
        	<li>期数</li>
        	<li>账单金额</li>
        	<li>账单号</li>
        	<li>约定缴费时间</li>
        	<li>支付状态</li>
            </ul>
        </div>
        <div id="tableContent">
         <table class="tablelist" id="tableData">
            <tbody>
            </tbody>
            </table>
        </div>
    </div>
    </div>
</div>
 <div class="pagin">
 	<div class="message" style="border: 0px; margin-top: 0;">共<i class="blue" id="nums"></i>条记录，当前显示第&nbsp;<i class="blue" id="Num">1</i>&nbsp;页，共&nbsp;<i class="blue" id="sizeNum"></i>&nbsp;页</div>
     <ul class="paginList">
     
     </ul>
 </div>
</body>
</html>
