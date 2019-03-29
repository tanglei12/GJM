<%@ page language="java" pageEncoding="utf-8"%>
<%
	response.setHeader("Pragma", "No-cache");
	response.setHeader("Cache-Control", "no-cache");
	response.setDateHeader("Expires", -10);
%>
<!DOCTYPE>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>房屋租赁合同打印</title>

<script src="/resources/js/jquery-1.7.2.min.js" type="text/javascript"></script>
<script src="/resources/js/common/common.js"></script>
<script src="/resources/print/LodopFuncs.js"></script><!-- 打印插件1 -->
<script src="/resources/js/appPage/contractZLPrint.js?v=1.8"></script>
<script src="/resources/Plug-in/jquery.print/jquery.jqprint-0.3.js"></script>
<script type="text/javascript">
function ss(){
	var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
	var regStr_chrome = /chrome\/[\d.]+/gi 
	if(userAgent.indexOf("Chrome") > -1){
		var browserNV = userAgent.match(regStr_chrome);  
		if(browserNV.indexOf("58.0") == 0){
			aelrt("请升级谷歌浏览器版本！");
			return;
		}
	} else {
		alert("请在谷歌浏览器上打印！");
		return;
	}
	$("#zlPrintTime").html(returnTime(new Date()));
	$("#contractTGPrint").jqprint();
}
</script>
</head>
<body>
	<button id="printBtn" onclick="ss()">打印</button>
<!-- 	<div class="contract-print-box"><a href="javascript:printMytable();">开始打印</a></div> -->
	<div class="contrantPrint">
	</div>
</body>
</html>