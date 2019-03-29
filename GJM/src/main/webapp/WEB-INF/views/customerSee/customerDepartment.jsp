<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>部门统计</title>
<!-- 底部 CSS样式 -->
<link href="/resources/css/manage_index.css" rel="stylesheet" type="text/css">
<link href="/resources/css/body.css" rel="stylesheet" type="text/css">
<link href="/resources/css/welcome.css" rel="stylesheet" type="text/css">
<link href="/resources/common/sweet-alert/css/sweet-alert.css" rel="stylesheet" type="text/css">
<link href="/resources/common/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href="/resources/css/jquery.gridly.css" rel="stylesheet" type="text/css"><!-- 日期插件 -->
<link href="/resources/common/datepicker/jquery-ui.css" rel="stylesheet" type="text/css"><!-- 日期插件 -->

<script src="/resources/js/jquery-1.7.2.min.js"></script>
<script src="/resources/js/common/common.js"></script>
<script src="/resources/common/sweet-alert/js/sweet-alert.min.js"></script><!-- 提示弹窗 -->
<script src="/resources/js/product/jquery-cookie.js"></script><!-- cookie -->
<script src="/resources/common/datepicker/js/jquery-ui-datepicker.js"></script><!-- 日期插件 -->
<script src="/resources/js/customerDepartment.js"></script>
<script type="text/javascript" src="/resources/js/dist/echarts-all.js"></script>
<!-- <script src="/resources/js/service/service.js"></script> -->
</head>
<script type="text/javascript">
$(window).resize(function() {
	windowSize();
	achievement();
});
</script>
<body>
<!-- 主体 -->
    <!-- 房屋信息 -->
	<div id="contentDiv">
		<div class="rightinfo">
	 		<div class="achievement">
				<span class="title_tongji" style="font-weight: bold;">部门统计图</span>
				<div id="achievement_tongji" class="achievement_tongji">
					
				</div>
			</div>
		</div>
    </div>
</body>
</html>