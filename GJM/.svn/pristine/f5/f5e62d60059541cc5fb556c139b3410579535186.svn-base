<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE>
<html>
  <head>
    <title>房源排序</title>
  </head>
<!-- 右边框架 css样式 -->
<link rel="stylesheet" href="<%= request.getContextPath()%>/resources/css/product/houseBasicInformation.css" />
<link href="/resources/css/manage_index.css" rel="stylesheet" type="text/css">
<link href="/resources/css/body.css" rel="stylesheet" type="text/css">
<link href="/resources/common/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<!-- jBox皮肤样式 -->
<link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">
<link href="/resources/css/product/sort.css" rel="stylesheet" type="text/css">

<script src="/resources/js/jquery-1.7.2.min.js"></script>
<script src="/resources/js/product/sort.js"></script>
<script src="/resources/js/manage_index_right.js"></script>
<!-- jBox -->
<script charset="utf-8" src="<%= request.getContextPath()%>/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
<script charset="utf-8" src="<%= request.getContextPath()%>/resources/Plug-in/jbox-v2.3/jBox/i18n/jquery.jBox-zh-CN.js"></script>
<!-- 加密 -->
<!-- cookie -->
<script src="/resources/js/product/jquery-cookie.js"></script>
<style>
.css2 {
overflow: hidden; /*自动隐藏文字*/
text-overflow: ellipsis;/*文字隐藏后添加省略号*/
white-space: nowrap;/*强制不换行*/
width: 30px;/*不允许出现半汉字截断*/
}
.table-icon {
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transform: translate(0, 0);
    color: #666;
    font-size: 16px;
}
.billList{
	width: 100%;
	height:auto;
	overflow:hidden;
	background:#FFF;
	box-shadow: 0 0 14px #ccc;
	z-index: 100;
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
</style>

<!-- 位置栏 -->

	
	<!-- 房屋信息 -->
	<div id="contentDiv" style="margin-top: -10px;">
	    <!-- 主体 -->
	    <div class="rightinfo">
		    <!-- 操作栏 -->
		    <div class="tools">
		    	<ul class="toolbar">
		        </ul>
		        <ul class="searchBar">
		        	<li class="click"><input type='text' class='form-control' onblur="selectByCondition();" id='houseName' name='houseName' placeholder='房屋名称'></li>
		        	<li class="click">
		        		<select class='form-control' onchange="selectByCondition();" id="houseBrand" name='houseBrand'>
		        			
		        		</select>
		        	</li>
		        </ul>
		    </div>
		
	    <div id="content">
	        
	        <div id="tableContent" style="width: 99%">
	           <table class="tablelist" id="tableData">
	           <thead>
	           	<tr>
		            <td>排序码</td>
	        		<td>房屋名称</td>
	        		<td>房屋状态</td>
	        		<td>房东名称</td>
	        		<td>房东电话</td>
	        		<td>发布人员</td>
	        		<td>操作</td>
	            </tr>
	           </thead>
	              <tbody>
	              </tbody>
	           </table>
	        </div>
	    </div>
		 <div class="pagin">
	    	<div class="message" style="border: 0px margin-top: 0;">共<i class="blue" id="nums"></i>条记录，当前显示第&nbsp;<i class="blue" id="Num">1</i>&nbsp;页，共&nbsp;<i class="blue" id="sizeNum"></i>&nbsp;页</div>
	        <ul class="paginList">
	        
	        </ul>
	    </div>
	    </div>
	    </div>
<script>
	${success};
	${error}
</script>