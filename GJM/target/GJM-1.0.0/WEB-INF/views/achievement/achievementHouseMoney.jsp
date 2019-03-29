<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>房屋业绩</title>
<link href="/resources/css/achievement/achievementHouse.css" rel="stylesheet" type="text/css" />
<link href="/resources/common/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"><!-- 字体图标 -->
<link href="/resources/css/common/common.css" rel="stylesheet" type="text/css" />
<link href="/resources/css/body.css" rel="stylesheet" type="text/css">

</head>
<script type="text/javascript" src="/resources/js/jquery-1.7.2.min.js"></script>
<script src="/resources/js/common/common.js"></script>
<script type="text/javascript" src="/resources/js/achievement/achievementHouseMoney.js"></script>
<body>
<div class="centers">
	<div style="display: none;" id="sa_id"></div>
	<div style="display: none;" id="houseCode"></div>
	<div class="titleContent">
    	<dl>
        	<dt>房屋地址：</dt>
            <dd id="address"></dd>
        </dl>
        <dl class="floatDl">
        	<dt>新业绩：</dt>
            <dd id="newMoney"></dd>
        </dl>
        <dl class="floatDl">
        	<dt>旧业绩：</dt>
            <dd id="oldMoney"></dd>
        </dl>
        <dl class="floatDl">
        	<dt>业绩类型：</dt>
            <dd id="payType"></dd>
        </dl>
        <dl class="floatDl">
        	<dt>审核状态：</dt>
            <dd id="state"></dd>
        </dl>
        <dl class="floatDl">
        	<dt>亏损天数：</dt>
            <dd id="lossDay"></dd>
        </dl>
        <dl class="floatDl">
        	<dt>亏损金额：</dt>
            <dd id="lossMoney"></dd>
        </dl>
        <dl class="floatDl">
        	<dt>合同起始：</dt>
            <dd id="contractDate"></dd>
        </dl>
    </div>
    <div class="content">
    	<div class="outHouse">
        	<div class="titleType">出房业绩</div>
        	<div id="contentDivLeft">
        		<!-- <div class="outHouseContent">
	            	<div class="title">陈智颖</div>
	                <dl>
	                	<dt>新业绩：</dt>
	                    <dd><input type="text" value="1600" />元</dd>
	                </dl>
	                <dl>
	                	<dt>旧业绩：</dt>
	                    <dd><input type="text" value="1600" />元</dd>
	                </dl>
	                <dl>
	                	<dt>补贴业绩：</dt>
	                    <dd><input type="text" value="0" />元</dd>
	                </dl>
	                <dl>
	                	<dt>提取方式：</dt>
	                    <dd>半年付</dd>
	                </dl>
	                <dl>
	                	<dt>套数：</dt>
	                    <dd>0.5</dd>
	                </dl>
            	</div> -->
        	</div>
        </div>
        <div class="saveHouse">
        	<div class="titleType">存房业绩</div>
        		<div id="contentDivRight">
            
            	</div>
            </div>
        </div>
        <a href="javascript:submitAchievement();">业绩修改</a>
</div>
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
							<th width="30%">是否公开</th>
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