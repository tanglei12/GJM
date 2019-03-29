<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!-- 底部 css样式 -->
<link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"><!-- 字体图标 -->
<link href="/resources/css/table-min.css" rel="stylesheet" type="text/css" /><!-- 表格样式 -->
<link href="/resources/css/manage_index.css" rel="stylesheet" type="text/css">
<link href="/resources/css/body.css" rel="stylesheet" type="text/css">
<link href="/resources/common/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

<!-- jBox皮肤样式 -->
<link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">
<script src="/resources/js/jquery-1.7.2.min.js"></script>
<script src="/resources/js/table-min.js"></script><!-- 表格公共js -->
<script src="/resources/js/manage_index_right.js"></script>
<script src="/resources/js/depositHouse.js"></script>
<script src="/resources/js/product/jquery-cookie.js"></script>
<!-- jBox -->
<script charset="utf-8" src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
<script charset="utf-8" src="/resources/Plug-in/jbox-v2.3/jBox/i18n/jquery.jBox-zh-CN.js"></script>
<!-- cookie -->
<script src="/resources/js/product/jquery-cookie.js"></script>
<script src="/resources/common/My97DatePicker/WdatePicker.js"></script><!-- 时间插件 -->
<style>
#content{
    padding: 14px 12px;
    min-width: 1405px;
}
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
<div id="content">
	<!-- 数据读取 -->
</div>