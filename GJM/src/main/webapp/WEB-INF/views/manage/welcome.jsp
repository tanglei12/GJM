<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%
	response.setHeader("Pragma","No-cache");
	response.setHeader("Cache-Control","no-cache");
	response.setDateHeader("Expires", -10);
%>
<!DOCTYPE html>
<html>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="Expires" CONTENT="0">
<meta http-equiv="Cache-Control" CONTENT="no-cache">
<meta http-equiv="Pragma" CONTENT="no-cache">
<link href="/resources/css/welcome.css" rel="stylesheet" type="text/css">
<link href="/resources/css/jquery.gridly.css" rel="stylesheet" type="text/css">
<link href="/resources/common/perfect-scrollbar/css/perfect-scrollbar.min.css" rel="stylesheet" type="text/css">
<link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="/resources/js/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="/resources/common/perfect-scrollbar/js/perfect-scrollbar.jquery.js"></script>
<script type="text/javascript" src="/resources/js/welcome.js?v=1.3"></script>
<!-- g2图表插件 -->
<script src="/resources/js/g2/g2.min.js"></script>
<script src="/resources/js/g2/data-set.min.js"></script>
<!-- end -->
<head>
<title>工作门户</title>
<body>
<div class="welcome_center">
	<div class="people top" style="width: 98%">
		<span class="title_tongji">经营统计<a href="javascript:;">X</a></span>
		<div class="contents">
			<div class="content_div">
                <div class="content_title">招租房源(套)</div>
                <div class="content_chart quans" id="rentHouse"></div>
            </div>
            <div class="content_line"></div>
			<div class="content_div">
                <div class="content_title">租客逾期(笔)</div>
                <div class="content_chart quans" id="billBeOverdue"></div>
            </div>
            <div class="content_line"></div>
			<div class="content_div">
                <div class="content_title">超期合同(份)</div>
                <div class="content_chart quans" id="overdueContract"></div>
            </div>
            <div class="content_line"></div>
			<div class="content_div">
                <div class="content_title">待完善合同(份)</div>
                <div class="content_chart quans" id="perfectContract"></div>
            </div>
            <div class="content_line"></div>
			<div class="content_div">
                <div class="content_title">到期合同(份)</div>
                <div class="content_chart quans" id="expireContract"></div>
            </div>
		</div>
	</div>
    <div class="achievement" style="width: 98%">
        <span class="title_tongji">业务量统计<a href="javascript:;">X</a></span>
        <div id="businessVolume" class="bill_tongji" style="float: left; width: 70%;">

        </div>
        <div class="businessRanking">
            <div class="inHouse">
                <div class="inHouse_title"><img src="/resources/image/inHouse_title.png"><label>存房排名(月度) 总数:<label id="inHouseNum" style="float: none; margin-left: 0;"></label></label></div>
                <div class="inHouse_content" id="inHouse">
                    <ul>
                    </ul>
                </div>
            </div>
            <div class="inHouse" style="margin-top: 35px;">
                <div class="inHouse_title"><img src="/resources/image/outHouse_title.png"><label>出房排名(月度) 总数:<label id="outHouseNum" style="float: none; margin-left: 0;"></label></label></div>
                <div class="inHouse_content" id="outHouse">
                    <ul>
                    </ul>
                </div>
            </div>
        </div>
    </div>
	<div class="achievement" style="width: 40%">
		<span class="title_tongji">财务流水<a href="javascript:;">X</a></span>
		<div class="bill_tongji">
			<div class="title_head">
                <div class="title_head_tag">
                    <ul>
                        <li class="click">今日</li>
                        <li style="left: 84px;">昨日</li>
                        <li style="left: 153px;">近7天</li>
                    </ul>
                </div>
                <div class="title_head_select">
                    <select id="billType" onchange="payRecord()"><option value="1">收入流水</option><option value="2">支出流水</option></select>
                </div>
            </div>
            <div class="body_content zheng" id="bill_water"></div>
		</div>
	</div>
	<div class="people" style="width: 57%; height: 490px;">
		<span class="title_tongji">服务统计<a href="javascript:;">X</a></span>
		<div id="service" class="people_tongji">
			
		</div>
	</div>
    <div class="memoListDiv" style="width: 98%; height:auto; margin: 1% 1% 0 1%; background:#FFF; float: left; box-shadow: 0 1px 3px 0 rgba(0,0,0,.14);">
        <!-- <iframe src="/memo/memoList" style="width: 98%; height: 920px; border: 0; margin: 1% 1% 0 1%; overflow: hidden;"></iframe> -->
        <jsp:include page="/WEB-INF/views/memo/memorandum.jsp"></jsp:include>
        <%-- <%@ include file="/WEB-INF/views/memo/memorandum.jsp" %> --%>
    </div>
	<div class="people" style="margin-bottom: 1%;">
		<span class="title_tongji"><label class="title_lable lableClick">行政通知</label><label class="title_lable">日志话题</label><label class="title_lable">最新房源</label><label class="title_lable">待办事项</label><a href="javascript:;">X</a></span>
		<div id="timeLine_message" class="people_tongji" style="height: 408px;">
			<ul class="timeline">
               <li>
                   <div class="timeline-badge"><i class="fa fa-check"></i>
                   </div>
                   <div class="timeline-panel">
                       <div class="timeline-heading">
                           <h4 class="timeline-title remove margin bottom">行政通知</h4>
                           <p>
                               <small class="text-muted"><i class="fa fa-time"></i>12月27号</small>
                           </p>
                       </div>
                       <div class="timeline-body">
                           <p>管家婆组织河北-北京6日游，大家该准备的准备，该安排的安排，大家一起嗨.</p>
                       </div>
                   </div>
               </li>
               <li class="timeline-inverted">
                   <div class="timeline-badge"><i class="fa fa-check"></i>
                   </div>
                   <div class="timeline-panel">
                       <div class="timeline-heading">
                           <h4 class="timeline-title remove margin bottom">行政通知</h4>
                           <p>
                               <small class="text-muted"><i class="fa fa-time"></i>12月27号</small>
                           </p>
                       </div>
                       <div class="timeline-body">
                           <p>管家婆组织河北-北京6日游，大家该准备的准备，该安排的安排，大家一起嗨.</p>
                       </div>
                   </div>
               </li>
               <li>
                   <div class="timeline-badge"><i class="fa fa-check"></i>
                   </div>
                   <div class="timeline-panel">
                       <div class="timeline-heading">
                           <h4 class="timeline-title remove margin bottom">行政通知</h4>
                           <p>
                               <small class="text-muted"><i class="fa fa-time"></i>12月27号</small>
                           </p>
                       </div>
                       <div class="timeline-body">
                           <p>管家婆组织河北-北京6日游，大家该准备的准备，该安排的安排，大家一起嗨.</p>
                       </div>
                   </div>
               </li>
               <li class="timeline-inverted">
                   <div class="timeline-badge"><i class="fa fa-check"></i>
                   </div>
                   <div class="timeline-panel">
                       <div class="timeline-heading">
                           <h4 class="timeline-title remove margin bottom">行政通知</h4>
                           <p>
                               <small class="text-muted"><i class="fa fa-time"></i>12月27号</small>
                           </p>
                       </div>
                       <div class="timeline-body">
                           <p>管家婆组织河北-北京6日游，大家该准备的准备，该安排的安排，大家一起嗨.</p>
                       </div>
                   </div>
               </li>
           </ul>
		</div>
	</div>
	<div class="achievement" style="margin-bottom: 1%;">
		<span class="title_tongji"><label class="title_lable lableClick">个人业绩</label><label class="title_lable">业务动态</label><a href="javascript:;">X</a></span>
		<div class="money_message">
			
		</div>
	</div>
</div>
</body>
</html>