<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!-- 底部 css样式 -->
<link href="/resources/css/manage_index.css" rel="stylesheet" type="text/css">
<link href="/resources/css/body.css" rel="stylesheet" type="text/css">
<link href="/resources/common/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

<!-- jBox皮肤样式 -->
<link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">
<script src="/resources/js/jquery-1.7.2.min.js"></script>
<script src="/resources/js/manage_index_right.js"></script>
<!-- jBox -->
<script charset="utf-8" src="<%= request.getContextPath()%>/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
<script charset="utf-8" src="<%= request.getContextPath()%>/resources/Plug-in/jbox-v2.3/jBox/i18n/jquery.jBox-zh-CN.js"></script>
<!-- cookie -->
<script src="/resources/js/product/jquery-cookie.js"></script>
<script src="/resources/js/ejz/reserveBill.js"></script>
<style>
.css2 {
overflow: hidden; /*自动隐藏文字*/
text-overflow: ellipsis;/*文字隐藏后添加省略号*/
white-space: nowrap;/*强制不换行*/
width: 30px;/*不允许出现半汉字截断*/
}
.free{
	color:green;
}

.rental{
	color:#EE2C2C;
}

.expire{
	color:#DC143C;
}

.clean{
	color:#00B2EE;
}

.numColor{
	color:#FF7F00;
}
</style>
<!-- 位置栏 -->
	<!-- 房屋信息 -->
	<div id="contentDiv" style="margin-top: 0px;">
	    <!-- 主体 -->
	    <div class="rightinfo">
		    <!-- 操作栏 -->
		    <div class="tools">
		    	<ul class="toolbar">
		        	<!--<li class="click"><span><img src="/resources/image/t02.png" /></span><a id="update" href="javascript:ck();">修改</a></li>
		        	<li class="click"><span><img src="/resources/image/t08.png" /></span><a id="update" href="javascript:ck();">修改</a></li>-->
		        </ul>
		        <ul class="toolbar_input">
		       		<li><input type="text" id="orderInput" onblur="data()" placeholder="预订单号/租客姓名/租客电话" /></li>
		       </ul>
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
	        		<td>预订单号</td>
	        		<td>审核状态</td>
	        		<td>姓名</td>
	        		<td>电话</td>
	        		<td>金额</td>
	        		<td>身份证号</td>
	        		<td>付费周期</td>
	        		<td>合作伙伴</td>
	        		<td>备注</td>
	        		<td>预订状态</td>
	        		<td>操作状态</td>
	        		<td>房屋预留时间</td>
	        		<td>创建时间</td>
	            </tr>
	           		</thead>
	              <tbody>
	              </tbody>
	            </table>
	        </div>
	    </div>
		 <div class="pagin">
	    	<div class="message" style="border: 0px; margin-top: 0;">共<i class="blue" id="nums"></i>条记录，当前显示第&nbsp;<i class="blue" id="Num">1</i>&nbsp;页，共&nbsp;<i class="blue" id="sizeNum"></i>&nbsp;页</div>
	        <ul class="paginList">
	        
	        </ul>
	    </div>
	    </div>
	    </div>
		
<script>
	${success};
	${error}
</script>