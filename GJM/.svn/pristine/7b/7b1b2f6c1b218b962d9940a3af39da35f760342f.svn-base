<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%
	response.setHeader("Pragma","No-cache");
	response.setHeader("Cache-Control","no-cache");
	response.setDateHeader("Expires", -10);
%>
<!doctype html>
<html>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="Expires" CONTENT="0">
<meta http-equiv="Cache-Control" CONTENT="no-cache">
<meta http-equiv="Pragma" CONTENT="no-cache">
<head>
<meta charset="utf-8">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>客户跟踪</title>
<link href="/resources/css/common/common.css" rel="stylesheet" type="text/css" />
<link href="/resources/css/customerSee.css" rel="stylesheet" type="text/css" />
<link href="/resources/common/sweet-alert/css/sweet-alert.css" rel="stylesheet" type="text/css"><!-- 提示弹窗 -->
<link href="/resources/common/uber-zoom/uber-zoom.css" rel="stylesheet" type="text/css"><!-- 图片缩放 -->
<link href="/resources/common/zyupload/skins/zyupload-1.0.0.css" rel="stylesheet" type="text/css"><!-- 文件上传插件 -->
<link href="/resources/common/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"><!-- 字体图标 -->
</head>
<script type="text/javascript" src="/resources/js/jquery-1.7.2.min.js"></script>
<script src="/resources/js/common/common.js"></script>
<script src="/resources/common/sweet-alert/js/sweet-alert.min.js"></script><!-- 提示弹窗 -->
<script src="/resources/Plug-in/jquery.rotate/jquery.rotate.min.js"></script>
<script src="/resources/common/uber-zoom/uber-zoom.js"></script><!-- 图片缩放 -->
<script src="/resources/common/zyupload/zyupload-1.0.0.js"></script><!-- 文件上传插件 -->
<script src="/resources/common/My97DatePicker/WdatePicker.js"></script><!-- 时间选择空间 -->
<script src="/resources/js/manage_index_right.js"></script>
<script type="text/javascript" src="/resources/js/customerSee.js"></script>
<body>
<div class="buttonTitle">
	<div class="userButton" onclick="openModel(this,'sginInfo',0);">我的客户</div>
	<input type="text" id="emName" style="height: 41px; border: 1px solid #BDC6CF; margin-left: 20px; float:left; -webkit-user-select: none; text-indent: 5px; outline: none;"  onclick="openModel(this,'sginInfo',2);" placeholder="内部人员" readonly>
	<input type="hidden" id="emID">
	<div class="clean" onclick="cleanEM();">清除内部人员</div>
    <div class="addButton"><span class="addButton-icon addButton-icon-add" onclick="functionIfram('/customerSeeAdd','房屋带看','客户跟进')"></span></div>
    <div class="dateTime">
    	<ul>
    		<li class="timeClick mouseDown" onclick="timeClick(this)">今天</li>
		    <li class="timeClick" onclick="timeClick(this)">最近7天</li>
		    <li class="timeClick" onclick="timeClick(this)">最近30天</li>
		    <li class="timeClick" onclick="showTime(this)" style="margin-right: 0;">自定义时间</li>
		    <li class="inputTime" style="display:none; padding:0; overflow: hidden; width: 200px; float: left;">
				<div class="dateTimeTitle">
					<i class="icon-calendar"></i>
					<div class="dateTimeContent">
						<input type="text" class="dateTime1" onfocus="dates()">
						<i class="dateTimeC"></i>
						<input type="text" class="dateTime2" onfocus="dates()">
					</div>
				</div>
			</li>
    	</ul>
    </div>
</div>
<div class="centers">
	<%-- <div class="content">
		<div class="year">
			2016年
		</div>
		<div class="content_table">
			<div class="month">
				2/15
			</div>
			<div class="time_zou">
				<span class="zou_circular"></span>
				<span class="zou_height"></span>
			</div>
			<div class="content_conts">
				<div class="title">
					<div class="title_left">本周剩余：</div>
					<div class="title_right">成功率：70%</div>
				</div>
				<table>
					<thead class="content_title">
						<tr>
							<td style="width: 8%;">客户名称</td>
							<td style="width: 8%;">客户电话</td>
							<td style="width: 20%;">产权地址</td>
							<td style="width: 19%;">客户需求</td>
							<td style="width: 20%;">客户意见</td>
							<td style="width: 25%;">失败原因</td>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>陈智颖</td>
							<td>18580428139</td>
							<td>重庆市南岸区南城大道8号（南坪万达广场）3-29-5</td>
							<td>我需要一个2房有空调，有水电气的房子。</td>
							<td>我需要一个2房有空调，有水电气的房子。</td>
							<td>我需要一个2房有空调，有水电气的房子。</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div> --%>
</div>
<!-- <div class="more" onclick="moreSelect()">
点击更多
</div> -->
<!-- 提示信息 -->
<div>
	<div class="model-mark"></div>
	<!-- 客户信息 -->
	<div class="model-content window" id="sginInfo">
		<div class="model-drag">
			<span id="model-drag-title">我的客户</span>
			<i onclick="closeModel();" title="按ESC键可以关闭"></i>
		</div>
		<div class="model-main" id="main1">
			<div class="model-search">
				<i class="fa-search"></i>
				<input type="text" id="sginInfo-search" placeholder="客户姓名、手机号码">
				<input type="button" style="height: 40px; line-height: 40px;" id="sginBtn" value="添加客户>>" onclick="moveModelMainLeft();">
			</div>
			<div class="model-list">
				<table>
					<thead>
						<tr>
							<th width="20%">客户姓名</th>
							<th width="10%">性别</th>
							<th width="30%">手机号</th>
						</tr>
					</thead>
					<tbody id="sginInfo-Body"></tbody>
				</table>
			</div>
			<div class="model-footer">
				<span class="foot-left state-ok fa-angle-left" style="width: 20px; height: 20px; margin-top: 3px;" onclick="pageUp()" ></span>
				<input type="text" class="foot-left" id="pageNo" onkeyup="bindUpDown()" value="1" title="按“Enter”跳页，上下翻页">
				<span class="foot-left state-ok icon-angle-right" style="width: 20px; height: 20px; margin-top: 3px;" onclick="pageDown()"></span>
				<div class="foot-right">共<span id="totalPage"></span>页，<span id="totalRecords"></span>条记录</div>
			</div>
		</div>
		<div class="model-main" id="main2" style="display: none;">
			<dl class="main-box-list">
				<dt class="item"><em>*</em><span class="item-titile">客户姓名</span></dt>
				<dd class="item">
					<input type="hidden" id="ContractSign_id">
					<input type="text" class="form-control" id="userName" placeholder="客户姓名" required>
					
				</dd>
				<dd class="tisp"></dd>
			</dl>
			<dl class="main-box-list">
				<dt class="item"><em>*</em><span class="item-titile">手机号码</span></dt>
				<dd class="item">
				    <input type="text" class="form-control" id="userPhone" maxlength="11" placeholder="手机号码" required>
				</dd>
				<dd class="tisp"></dd>
			</dl>                                                                                                                                                      
			<hr>
			<dl class="main-box-list">
				<dt class="item"><span class="item-titile">性别</span></dt>
				<dd class="item">
					<select class="form-control" id="selectSex">
		    			<option value="男" selected>男</option>
		    			<option value="女">女</option>
		    			<option value="未知">未知</option>
			    	</select>
				</dd>
				<dd class="tisp"></dd>
			</dl>
			<dl class="main-box-list">
				<dt class="item"><em>*</em><span class="item-titile">客户需求</span></dt>
				<dd class="item">
					<textarea class="form-control" rows="" cols="" id="customerText" style="height: 90px"></textarea>
				</dd>
				<dd class="tisp"></dd>
			</dl>
			<dl class="main-box-list main-box-bottom">
				<dt class="item">&nbsp;</dt>
				<dd class="item">
					<button class="from-data" onclick="successSubmit('0')" style="margin-right: 30px;">保存</button>
					<button class="from-data" onclick="moveModelMainRight()">取消</button>
				</dd>
			</dl>
			<hr>
		</div>
	</div>
</div>
<!-- end -->
</body>
</html>