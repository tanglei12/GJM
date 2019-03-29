<%@ page pageEncoding="utf-8" %>
<%
	response.setHeader("Pragma", "No-cache");
	response.setHeader("Cache-Control", "no-cache");
	response.setDateHeader("Expires", -10);
%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
	<meta name="format-detection" content="telephone=no">
	<meta name="format-detection" content="email=no">
	<title>电子合同</title>
	<link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
	<link href="/resources/common/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"><!-- 旧字体样式 -->
	<link href="/resources/css/common/common.css" rel="stylesheet" type="text/css">
	<link href="/resources/css/app/contractprint.css" rel="stylesheet" type="text/css">
	<link href="/resources/css/appPage/e-contract/contractPrint.css?v=<%=System.currentTimeMillis()%>" rel="stylesheet" type="text/css">


	<script src="/resources/js/jquery-2.0.0.min.js"></script>
	<script src="/resources/js/common/common.js"></script>
	<script src="/resources/js/common/common.hint.js"></script>
	<script src="/resources/js/appPage/contractPrint_ZL2-2.js?v=<%=System.currentTimeMillis()%>"></script>
</head>
<body>
<%--<div class="top-warning">--%>
	<%--<label style="font-size: 12px;color: #f17070;">&nbsp;&nbsp;<img id="hintImg" src="/resources/image/contract/contract_hint.png" style="width: 15px;height: 15px; margin-top: 2px;visibility:visible">&nbsp;&nbsp;<label>请认真阅读本页内容，确认并完成签字</label></label>--%>
<%--</div>--%>
<div id="contractTGPrint" style="padding: 10px;background : url(/resources/image/appPage/contract/gjp_bg.png);">
	<div id="div1" class="" style="position: relative;text-align:center;margin: 0 auto;width: 100%; margin-bottom: 20px;">
		<div>
			<img src="/resources/image/appPage/gjp_logo.png" class="logoImg">
			<label class="font18">重庆管家婆房屋托管中心</label>
			<label class="rightFont">零中介费、租金月付，放心租、安心住！！</label>
		</div>
		<hr class="box-hr">
		<div class="box-title">房屋租赁合同</div>
		<div class="conNo">合同编号：${contractObject.contractObject_No}</div>
		<div class="flex-list">
			<div class="flex-item"><span>出租方(甲方):</span><span class="flex-item-line">${contractVo.cc_name }</span></div>
			<div class="flex-item"><span>身份证号码:</span><span class="flex-item-line">${contractVo.cc_cardNum }</span></div>
		</div>
		<div class="flex-list">
			<div class="flex-item"><span>联系电话:</span><span class="flex-item-line">88067511</span></div>
			<%--<div class="flex-item"><span>联络地址:</span><span class="flex-item-line"></span></div>--%>
		</div>
		<div class="flex-list">
			<div class="flex-item"><span>承租方(乙方):</span><span class="flex-item-line">${customerInfo.cc_name }</span></div>
			<div class="flex-item"><span>身份证号码:</span><span class="flex-item-line">${customerInfo.cc_cardNum }</span></div>
		</div>
		<div class="flex-list">
			<div class="flex-item"><span>联系电话:</span><span class="flex-item-line">${customerInfo.ccp_phone }</span></div>
		</div>
		<div class="flex-list">
			<div class="flex-item"><span>丙方:</span><span class="flex-item-line">重庆管家婆房地产经纪有限公司</span></div>
			<div class="flex-item"><span>营业执照号:</span><span class="flex-item-line">915001085540918999</span></div>
		</div>
		<div class="flex-list">
			<div class="flex-item"><span>签约代表:</span><span class="flex-item-line">${contractor.em_name }</span></div>
			<div class="flex-item"><span>联系电话:</span><span class="flex-item-line">${contractor.em_phone }</span></div>
		</div>
		<dl class="dl-list">
			<dd>根据《中华人民共和国合同法》及相关法律法规的规定，甲、乙、丙叁方在平等自愿且充分理解相关条款的基础上，就甲方将房屋出租给乙方，甲方委托丙方全权经营管理出租房屋事宜，为明确叁方权利责任，经协商一致，订立本合同。</dd>
		</dl>
		<dl class="dl-list">
			<dt>第一条&nbsp;&nbsp;房屋概述</dt>
			<dd>1、房屋地址<label class="textUnderLine">&nbsp;${houseInfo.he_address}&nbsp;</label>，建筑面积<label class="textUnderLine">&nbsp;${houseInfo.hi_measure }&nbsp;</label>平米，户型是<label class="textUnderLine">&nbsp;${houseInfo.hi_houseS }&nbsp;</label>室<label
					class="textUnderLine">&nbsp;${houseInfo.hi_houseT }&nbsp;</label>厅<label class="textUnderLine">&nbsp;${houseInfo.hi_houseW }&nbsp;</label>卫。
			</dd>
			<dd>2、该房屋现有家具家电设施设备情况详见合同附件(物业交割单)。</dd>
		</dl>
		<dl class="dl-list">
			<dt>第二条&nbsp;&nbsp;房屋用途：<label class="textUnderLine">&nbsp;${contractBody.contractBody_Use } &nbsp;</label>，居住<label class="textUnderLine">&nbsp;${contractObject.contractObject_PeopleNumber }&nbsp;</label>人。除三方另有约定外，乙方不得擅自改变房屋用途。</dt>
		</dl>
		<dl class="dl-list">
			<dt>第三条&nbsp;&nbsp;租期、租金、保证金、服务费等</dt>
			<input type="hidden" value="${contractObject.contractObject_Date }" id="data_4"><input type="hidden" value="${contractObject.contractObject_DeadlineTime }" id="data_5">
			<dd>1、租期：<label class="textUnderLine">&nbsp;${startDateArray[0] }&nbsp;</label>年<label class="textUnderLine">&nbsp;${startDateArray[1] }&nbsp;</label>月<label class="textUnderLine">&nbsp;${startDateArray[2] }&nbsp;</label>日起至<label
					class="textUnderLine">&nbsp;${endDateArray[0] }&nbsp;</label>年<label class="textUnderLine">&nbsp;${endDateArray[1] }&nbsp;</label>月<label class="textUnderLine">&nbsp;${endDateArray[2] }&nbsp;</label>日止(<label id="ymdLabel" style="font-weight: bold;"></label>)。
			</dd>
			<dd>2、租金（丙方代收）：<label class="textUnderLine">&nbsp; ${payStyle } &nbsp;</label>付，<label class="textUnderLine" id="data_1">&nbsp;¥${contractBody.contractBody_Rent }&nbsp;</label>元/月（大写：<label class="textUnderLine" id="data_2">&nbsp;&nbsp;</label>整）。</dd>
			<dd>总租金： <label class="textUnderLine" id="data_10">&nbsp;&nbsp;</label>元（大写：<label class="textUnderLine" id="data_3">&nbsp;&nbsp;</label>整）。符合条件的乙方可申请与丙方合作的第三方分期月付服务，乙方依据分期协议进行月付还款。如乙方未通过第三方审核，自动转为丙方季付。</dd>
			<dd>3、乙方租金支付日：</dd>
			<dd>从第2次支付日开始，月付须提前7天、季付和半年付须提前15天支付下次应付租金，乙方支付租金等款项具体约定时间见下表。如乙方逾期支付租金，每天须按当期应付租金总额1%支付滞纳金给丙方。如乙方逾期超过10天，丙方有权单方面解除并终止本合同，乙方承担相应违约责任。</dd>
			<dd>
				<div style="text-indent: 2em;" id="zhangdan">
					<%--<p class="conInfo">--%>
						<%--<span>第01次：<label class="textUnderLine">&nbsp;${billContractList[0].repaymentDateArr[0] }&nbsp;</label>年<label class="textUnderLine">&nbsp;${billContractList[0].repaymentDateArr[1] }&nbsp;</label>月<label class="textUnderLine">&nbsp;${billContractList[0].repaymentDateArr[2] }&nbsp;</label>日&nbsp;&nbsp;</span>--%>
					<%--</p>--%>
					<%--<p class="conInfo">--%>
						<%--<span>第02次：<label class="textUnderLine">&nbsp;${billContractList[1].repaymentDateArr[0] }&nbsp;</label>年<label class="textUnderLine">&nbsp;${billContractList[1].repaymentDateArr[1] }&nbsp;</label>月<label class="textUnderLine">&nbsp;${billContractList[1].repaymentDateArr[2] }&nbsp;</label>日&nbsp;&nbsp;</span>--%>
					<%--</p>--%>
					<%--<p class="conInfo">--%>
						<%--<span>第03次：<label class="textUnderLine">&nbsp;${billContractList[2].repaymentDateArr[0] }&nbsp;</label>年<label class="textUnderLine">&nbsp;${billContractList[2].repaymentDateArr[1] }&nbsp;</label>月<label class="textUnderLine">&nbsp;${billContractList[2].repaymentDateArr[2] }&nbsp;</label>日&nbsp;&nbsp;</span>--%>
					<%--</p>--%>
					<%--<p class="conInfo">--%>
						<%--<span>第04次：<label class="textUnderLine">&nbsp;${billContractList[3].repaymentDateArr[0] }&nbsp;</label>年<label class="textUnderLine">&nbsp;${billContractList[3].repaymentDateArr[1] }&nbsp;</label>月<label class="textUnderLine">&nbsp;${billContractList[3].repaymentDateArr[2] }&nbsp;</label>日&nbsp;&nbsp;</span>--%>
					<%--</p>--%>
					<%--<p class="conInfo">--%>
						<%--<span>第05次：<label class="textUnderLine">&nbsp;${billContractList[4].repaymentDateArr[0] }&nbsp;</label>年<label class="textUnderLine">&nbsp;${billContractList[4].repaymentDateArr[1] }&nbsp;</label>月<label class="textUnderLine">&nbsp;${billContractList[4].repaymentDateArr[2] }&nbsp;</label>日&nbsp;&nbsp;</span>--%>
					<%--</p>--%>
					<%--<p class="conInfo">--%>
						<%--<span>第06次：<label class="textUnderLine">&nbsp;${billContractList[5].repaymentDateArr[0] }&nbsp;</label>年<label class="textUnderLine">&nbsp;${billContractList[5].repaymentDateArr[1] }&nbsp;</label>月<label class="textUnderLine">&nbsp;${billContractList[5].repaymentDateArr[2] }&nbsp;</label>日&nbsp;&nbsp;</span>--%>
					<%--</p>--%>
					<%--<p class="conInfo">--%>
						<%--<span>第07次：<label class="textUnderLine">&nbsp;${billContractList[6].repaymentDateArr[0] }&nbsp;</label>年<label class="textUnderLine">&nbsp;${billContractList[6].repaymentDateArr[1] }&nbsp;</label>月<label class="textUnderLine">&nbsp;${billContractList[6].repaymentDateArr[2] }&nbsp;</label>日&nbsp;&nbsp;</span>--%>
					<%--</p>--%>
					<%--<p class="conInfo">--%>
						<%--<span>第08次：<label class="textUnderLine">&nbsp;${billContractList[7].repaymentDateArr[0] }&nbsp;</label>年<label class="textUnderLine">&nbsp;${billContractList[7].repaymentDateArr[1] }&nbsp;</label>月<label class="textUnderLine">&nbsp;${billContractList[7].repaymentDateArr[2] }&nbsp;</label>日&nbsp;&nbsp;</span>--%>
					<%--</p>--%>
					<%--<p class="conInfo">--%>
						<%--<span>第09次：<label class="textUnderLine">&nbsp;${billContractList[8].repaymentDateArr[0] }&nbsp;</label>年<label class="textUnderLine">&nbsp;${billContractList[8].repaymentDateArr[1] }&nbsp;</label>月<label class="textUnderLine">&nbsp;${billContractList[8].repaymentDateArr[2] }&nbsp;</label>日&nbsp;&nbsp;</span>--%>
					<%--</p>--%>
					<%--<p class="conInfo">--%>
						<%--<span>第10次：<label class="textUnderLine">&nbsp;${billContractList[9].repaymentDateArr[0] }&nbsp;</label>年<label class="textUnderLine">&nbsp;${billContractList[9].repaymentDateArr[1] }&nbsp;</label>月<label class="textUnderLine">&nbsp;${billContractList[9].repaymentDateArr[2] }&nbsp;</label>日&nbsp;&nbsp;</span>--%>
					<%--</p>--%>
					<%--<p class="conInfo">--%>
                        <%--<span>第11次：<label class="textUnderLine">&nbsp;${billContractList[10].repaymentDateArr[0] }&nbsp;</label>年<label class="textUnderLine">&nbsp;${billContractList[10].repaymentDateArr[1] }&nbsp;</label>月<label class="textUnderLine">&nbsp;${billContractList[10].repaymentDateArr[2] }&nbsp;</label>日&nbsp;&nbsp;</span>--%>
					<%--</p>--%>
					<%--<p class="conInfo">--%>
                        <%--<span>第12次：<label class="textUnderLine">&nbsp;${billContractList[11].repaymentDateArr[0] }&nbsp;</label>年<label class="textUnderLine">&nbsp;${billContractList[11].repaymentDateArr[1] }&nbsp;</label>月<label class="textUnderLine">&nbsp;${billContractList[11].repaymentDateArr[2] }&nbsp;</label>日&nbsp;&nbsp;</span>--%>
					<%--</p>--%>
					<%--<p class="conInfo">--%>
						<%--<span>第13次：<label class="textUnderLine">&nbsp;${billContractList[12].repaymentDateArr[0] }&nbsp;</label>年<label class="textUnderLine">&nbsp;${billContractList[12].repaymentDateArr[1] }&nbsp;</label>月<label class="textUnderLine">&nbsp;${billContractList[12].repaymentDateArr[2] }&nbsp;</label>日&nbsp;&nbsp;</span>--%>
					<%--</p>--%>
					<%--<p class="conInfo">--%>
						<%--<span>第14次：<label class="textUnderLine">&nbsp;${billContractList[13].repaymentDateArr[0] }&nbsp;</label>年<label class="textUnderLine">&nbsp;${billContractList[13].repaymentDateArr[1] }&nbsp;</label>月<label class="textUnderLine">&nbsp;${billContractList[13].repaymentDateArr[2] }&nbsp;</label>日&nbsp;&nbsp;</span>--%>
					<%--</p>--%>
					<%--<p class="conInfo">--%>
						<%--<span>第15次：<label class="textUnderLine">&nbsp;${billContractList[14].repaymentDateArr[0] }&nbsp;</label>年<label class="textUnderLine">&nbsp;${billContractList[14].repaymentDateArr[1] }&nbsp;</label>月<label class="textUnderLine">&nbsp;${billContractList[14].repaymentDateArr[2] }&nbsp;</label>日&nbsp;&nbsp;</span>--%>
					<%--</p>--%>
					<%--<p class="conInfo">--%>
						<%--<span>第16次：<label class="textUnderLine">&nbsp;${billContractList[15].repaymentDateArr[0] }&nbsp;</label>年<label class="textUnderLine">&nbsp;${billContractList[15].repaymentDateArr[1] }&nbsp;</label>月<label class="textUnderLine">&nbsp;${billContractList[15].repaymentDateArr[2] }&nbsp;</label>日&nbsp;&nbsp;</span>--%>
					<%--</p>--%>
					<%--<p class="conInfo">--%>
						<%--<span>第17次：<label class="textUnderLine">&nbsp;${billContractList[16].repaymentDateArr[0] }&nbsp;</label>年<label class="textUnderLine">&nbsp;${billContractList[16].repaymentDateArr[1] }&nbsp;</label>月<label class="textUnderLine">&nbsp;${billContractList[16].repaymentDateArr[2] }&nbsp;</label>日&nbsp;&nbsp;</span>--%>
					<%--</p>--%>
					<%--<p class="conInfo">--%>
						<%--<span>第18次：<label class="textUnderLine">&nbsp;${billContractList[17].repaymentDateArr[0] }&nbsp;</label>年<label class="textUnderLine">&nbsp;${billContractList[17].repaymentDateArr[1] }&nbsp;</label>月<label class="textUnderLine">&nbsp;${billContractList[17].repaymentDateArr[2] }&nbsp;</label>日&nbsp;&nbsp;</span>--%>
					<%--</p>--%>
					<%--<p class="conInfo">--%>
						<%--<span>第19次：<label class="textUnderLine">&nbsp;${billContractList[18].repaymentDateArr[0] }&nbsp;</label>年<label class="textUnderLine">&nbsp;${billContractList[18].repaymentDateArr[1] }&nbsp;</label>月<label class="textUnderLine">&nbsp;${billContractList[18].repaymentDateArr[2] }&nbsp;</label>日&nbsp;&nbsp;</span>--%>
					<%--</p>--%>
					<%--<p class="conInfo">--%>
						<%--<span>第20次：<label class="textUnderLine">&nbsp;${billContractList[19].repaymentDateArr[0] }&nbsp;</label>年<label class="textUnderLine">&nbsp;${billContractList[19].repaymentDateArr[1] }&nbsp;</label>月<label class="textUnderLine">&nbsp;${billContractList[19].repaymentDateArr[2] }&nbsp;</label>日&nbsp;&nbsp;</span>--%>
					<%--</p>--%>
					<%--<p class="conInfo">--%>
						<%--<span>第21次：<label class="textUnderLine">&nbsp;${billContractList[20].repaymentDateArr[0] }&nbsp;</label>年<label class="textUnderLine">&nbsp;${billContractList[20].repaymentDateArr[1] }&nbsp;</label>月<label class="textUnderLine">&nbsp;${billContractList[20].repaymentDateArr[2] }&nbsp;</label>日&nbsp;&nbsp;</span>--%>
					<%--</p>--%>
					<%--<p class="conInfo">--%>
						<%--<span>第22次：<label class="textUnderLine">&nbsp;${billContractList[21].repaymentDateArr[0] }&nbsp;</label>年<label class="textUnderLine">&nbsp;${billContractList[21].repaymentDateArr[1] }&nbsp;</label>月<label class="textUnderLine">&nbsp;${billContractList[21].repaymentDateArr[2] }&nbsp;</label>日&nbsp;&nbsp;</span>--%>
					<%--</p>--%>
					<%--<p class="conInfo">--%>
						<%--<span>第23次：<label class="textUnderLine">&nbsp;${billContractList[22].repaymentDateArr[0] }&nbsp;</label>年<label class="textUnderLine">&nbsp;${billContractList[22].repaymentDateArr[1] }&nbsp;</label>月<label class="textUnderLine">&nbsp;${billContractList[22].repaymentDateArr[2] }&nbsp;</label>日&nbsp;&nbsp;</span>--%>
					<%--</p>--%>
					<%--<p class="conInfo">--%>
						<%--<span>第24次：<label class="textUnderLine">&nbsp;${billContractList[23].repaymentDateArr[0] }&nbsp;</label>年<label class="textUnderLine">&nbsp;${billContractList[23].repaymentDateArr[1] }&nbsp;</label>月<label class="textUnderLine">&nbsp;${billContractList[23].repaymentDateArr[2] }&nbsp;</label>日&nbsp;&nbsp;</span>--%>
					<%--</p>--%>
				</div>
			</dd>
			<dd>4、乙方保证金：<label class="textUnderLine" id="data_6">&nbsp;¥${contractBody.contractBody_Pay }&nbsp;</label>元（大写：<label class="textUnderLine" id="data_7">&nbsp;&nbsp;</label>整），签订合同时丙方一次性收取。</dd>
			<dd>5、服务费：</dd>
			<dd>
				<p class="conInfo" style="text-indent:2em;">
					<i class="fa fa-check-square-o" style="margin-right: 10px;margin-left: -28px;" id="fuwu1"></i>服务费套餐：<input type="hidden" value="${contractBody.contractBody_Service }" id="serviceM"><label class="textUnderLine" id="data_8">&nbsp;¥${contractBody.contractBody_Service }&nbsp;</label>元（大写：<label class="textUnderLine" id="data_9">&nbsp;&nbsp;</label>整），包含300元维修费用(详见维修条款)。合同期间，丙方为乙方提供的相关服务（包括但不限于清洁、维修、办理分期月付、借款担保等）支付的服务费，签订合同时丙方按年度一次性收取。如乙方中途转租或退房，丙方不退还该费用。
				</p>
				<p class="conInfo" style="text-indent:2em;">
					<i class="fa fa-square-o" style="margin-right: 10px;margin-left: -28px;" id="fuwu2"></i>乙方自己负责合同内的房屋清洁和维修等并承担全部费用，丙方可按次数提供有偿服务。
				</p>
			</dd>
			<dd>6、代收租金： 丙方代甲方向乙方收取租金。丙方扣除相关费用后，再转交给甲方。</dd>
			<dd>7、税费：房屋租赁税、房产税及政府规定的出租房屋征收的其他税费等由乙方承担，甲方和丙方协助办理。</dd>
			<dd>8、乙方须按时交纳自行承担的费用,不拖欠如水电气费、物管费、清洁费、电话费、宽带费、有线电视费等。</dd>
		</dl>
		<dl class="dl-list">
			<dt>第四条&nbsp;&nbsp;乙方保证</dt>
			<dd>1、合同期内，乙方保证出租房屋的使用安全（包括但不限于防火、防盗、防漏水、防坠落及高空坠物等相关财产和人身安全）。如发生被盗、火灾、水淹、坠落、高空坠物等相关安全或人身事故，由此引起的法律责任、损失和赔偿等全部由乙方承担。</dd>
			<dd>2、合同期内，乙方保证房屋清洁干净、爱护家具家电和装修等，保证墙面干净整洁（尤其避免小孩涂画），保证不在房屋内喂养猫狗等宠物，并保证搞好邻里关系，没有邻居或物业相关投诉。</dd>
			<dd>3、合同期内，乙方保证在租赁房屋使用过程中的行为符合有关法律、法规及规章的规定，不做违法事情。</dd>
			<dd>4、合同期内，乙方保证不改变房屋的内部结构、装修等，不设置对房屋结构有影响的设备。</dd>
		</dl>
		<dl class="dl-list">
			<dt>第五条&nbsp;&nbsp;丙方责任义务</dt>
			<dd>1、合同期内，甲方全权委托丙方经营管理出租房屋，办理相关手续等(包括但不限于签订租赁合同和代催收租金等）。</dd>
			<dd>2、合同期内，如因乙方原因导致甲方租金收益受损的（包括拖欠租金、水电气费、物管费等），丙方承担连带责任。丙方在向甲方承担相关责任后，有权向乙方追偿。</dd>
		</dl>
		<dl class="dl-list">
			<dt>第六条&nbsp;&nbsp;维修</dt>
			<dd>1、合同期内，如有维修，乙方可通过手机APP、微信、网站或023-88067511转3报修。</dd>
			<dd>2、合同期内，乙方入住1月内的维修(乙方人为损坏除外)，费用全部由甲方承担。</dd>
			<dd>3、合同期内，乙方入住1月后的维修费用：</dd>
			<dd>①如乙方选择的是丙方套餐服务，则丙方负责300元以内的维修费用(包括电器、综合维修的人工和材料费用，不包括人为损坏、换锁、地面、墙面维修和疏通下水道费用)，超过300元的维修费用由乙丙双方各承担50%。</dd>
			<dd>②如乙方自己负责合同期内的房屋清洁和维修等，全部费用由乙方承担，丙方可按次数提供有偿服务。</dd>
			<dd>4、该乙方负责维修责任，丙方在通知乙方2天内，如乙方还是不维修好的，丙方有权代为维修，维修费用等由乙方全部承担。</dd>
			<dd>5、租赁期内，因房屋自然老化、外墙渗水、沉降、给排水管、强弱电路、防水等隐蔽工程或其它装修问题导致房屋内和楼下墙面、木地板、地砖、墙砖、门窗发生裂缝、起泡、变形、起层、发霉、破裂情况，乙方不承担维修和赔偿责任。但如有明显撞痕、火烧、水淹、污染的,则由乙方全部承担维修和赔偿责任。</dd>
		</dl>
		<dl class="dl-list">
			<dt>第七条&nbsp;&nbsp;清洁</dt>
			<dd>1、合同期内或期满，乙方退房给丙方时，须保证房屋清洁干净。如未做清洁或清洁不达标，则按3元/平米收取退房清洁费用（不低于80元/套）。</dd>
			<dd>2、清洁标准：家具家电表面、抽屉及橱柜内无明显灰尘，地面干净无灰尘痕迹，灶具及抽油烟机无明显油烟污渍，卫生间洁具明显污垢等。</dd>
		</dl>
		<dl class="dl-list">
			<dt>第八条&nbsp;&nbsp;转租</dt>
			<dd>1、乙方如需转租承租房屋，必须先和丙方签订《房屋转租协议》后才可以转租。否则，按乙方违约处理，甲方不退还乙方保证金和剩余租金等款项。</dd>
			<dd>①合同期内的1、2和12月份，只能由乙方自行招租，丙方认同新承租人后，负责新承租人合同变更等手续，乙方须支付丙方300元合同变更服务费。</dd>
			<dd>②合同期内的3-11月份，乙方可自行招租或委托丙方招租。如乙方找到新承租人后，乙方须支付丙方300元合同变更服务费。如委托丙方找到新承租人后，乙方须支付丙方50%月租金作为转租服务费。</dd>
			<dd>③在未成功转租前,乙方必须按本合同约定时间按时全额交纳租金等费用。否则,乙方承担相应违约责任,丙方不退还乙方保证金，并可强制收回该房屋。</dd>
			<dd>2、新承租人继承乙方原有责任、权利和义务。为保障新承租人利益，须新承租人入住确认无人为损坏问题后，丙方第15天与乙方办理费用结算手续，扣除相关费用后，退还乙方剩余房租和保证金等。</dd>
			<dd>3、合同期内，如乙方隐瞒丙方或未经过丙方书面同意，擅自转租承租房屋。乙方的擅自转租无效，丙方有权立即终止合同，丙方不承认新承租人的合法性，丙方有权要求新承租人立即搬出房屋，且丙方有权收回该房屋和处置房屋内遗留物品，并不退还乙方保证金和剩余房租，乙方须承担相应违约责任，因此引起的法律责任全部由乙方承担。</dd>
		</dl>
		<dl class="dl-list">
			<dt>第九条&nbsp;&nbsp;退房</dt>
			<dd>1、合同期内的退房:</dd>
			<dd>①合同期内的1、2和12月份，丙方不允许乙方退房。否则，按乙方违约处理，丙方不退还乙方保证金和剩余租金等款项。</dd>
			<dd>②合同期内的3-11月份，丙方验收房屋内装修\家具家电等无人为损坏，同意乙方办理退房手续，扣除乙方1个月租金和相关费用后，第15天退还乙方剩余款项。</dd>
			<dd>③合同期内，如丙方不同意乙方退房,乙方不得擅自退房。否则，乙方承担相应违约责任，丙方有权立即终止合同。</dd>
			<dd>2、合同期满的退房：</dd>
			<dd>①合同期满，乙方应及时交还房屋给丙方。如逾期交还，每天须按本合同日租金的1.5倍支付逾期天数租金直到交还房屋为止。</dd>
			<dd>②合同期满退房，丙方验收房屋内装修、家具家电等无人为损坏，丙方与乙方办理结算手续，扣除相关费用后，第15天退还乙方剩余款项。</dd>
			<dd>③乙方交还房屋时，应当保持房屋装修、家具家电等设施设备的完好状态，清洁合格，不得留存物品或影响房屋的正常使用。对未经同意留存的物品,丙方在告知乙方2天之内，乙方仍未取走的，丙方有权处置遗留物品，由此造成的损失由乙方自行承担。</dd>
		</dl>
		<dl class="dl-list">
			<dt>第十条&nbsp;&nbsp;续租</dt>
			<dd>1、合同期满前1个月,乙方须书面通知丙方是否续租。在同等条件下,乙方享有优先承租权。如需续租,应重新签订《房屋租赁合同》。</dd>
			<dd>2、合同期满前，如乙方不续租，丙方享有提前7天招租的权利，乙方不得以任何理由推脱或阻拦丙方带客户看房。否则，乙方承担相应违约责任。</dd>
		</dl>
		<dl class="dl-list">
			<dt>第十一条&nbsp;&nbsp;乙方违约责任</dt>
			<dd>合同期内，乙方有下列行为之一的，丙方有权单方面解除并终止合同，采取断水、断电、开门、封门、换锁等方式强制收回该房屋，丙方有权对乙方室内物品进行处置，并不再退还乙方所余房租和保证金等费用，乙方还应按照本合同租金总额的30%向丙方支付违约金。若支付的违约金不足弥补丙方损失的，乙方还应负责赔偿丙方的损失直至达到弥补全部损失为止。</dd>
			<dd>1、逾期未交房租，经丙方催告后，10天内仍不交纳租金的。</dd>
			<dd>2、拖欠各项费用总额达1000元及以上(包括租金、宽带费、有线费、水电气费、物管费、服务费等)。</dd>
			<dd>3、因乙方原因导致第三方分期月付逾期，经第三方或丙方催告后，仍不交纳租金的。乙方承担第三方相应违约金、滞纳金和违约责任。</dd>
			<dd>4、未经丙方书面同意或隐瞒丙方，擅自退房、擅自转租、擅自拆改变动房屋结构、擅自装修或擅自改变房屋租赁用途。</dd>
			<dd>5、利用承租房屋进行违法活动或存放危险物品。</dd>
			<dd>6、邻居或物业累计投诉3次及以上。</dd>
			<dd>7、不依据本合同承担维修责任或支付维修费用，致使房屋装修或家具家电等设施设备严重损坏的，或在丙方提出的合理期限内仍未修复的。</dd>
		</dl>
		<dl class="dl-list">
			<dt>第十二条&nbsp;&nbsp;合同的变更、解除与终止</dt>
			<dd>1、甲、乙、丙叁方可以协商变更、解除或终止本合同。合同期满合同自然终止。</dd>
			<dd>2、因不可抗力或因国家政策需要拆除或改造等原因导致房屋、房屋装修及室内财产受损的，合同终止,甲乙丙叁方互不承担责任。</dd>
			<dd>3、如因甲、乙双方原因导致合同解除或终止的，丙方不退还已收的甲方管理费和乙方服务费。</dd>
		</dl>
		<dl class="dl-list">
			<dt>第十三条&nbsp;&nbsp;本合同未尽事宜，甲、乙、丙叁方可协商一致订立补充条款。补充条款及附件均为本合同组成部分，具有同等法律效力。</dt>
		</dl>
		<dl class="dl-list">
			<dt>第十四条&nbsp;&nbsp;争议纠纷解决：本合同项下发生的争议，由甲乙丙叁方协商或申请调解；协商或调解解决不成的，可向丙方所在地人民法院提起诉讼，由败诉方承担诉讼费、律师费等相关费用。</dt>
		</dl>
		<dl class="dl-list">
			<dt>第十五条&nbsp;&nbsp;本合同壹式叁份,甲乙丙叁方各执壹份，具有同等法律效力。丙方可代甲方签字生效，本合同自叁方签字（盖章）后生效。</dt>
		</dl>
		<dl class="dl-list">
			<dt>第十六条&nbsp;&nbsp;甲方、乙方任一方联系地址和电话的变更均应在三日内书面通知丙方，否则由此造成的损失由过错方承担。</dt>
		</dl>
		<dl class="dl-list">
			<dt>第十七条&nbsp;&nbsp;其它约定</dt>
			<dd>${contractObject.contractObject_Other }</dd>
		</dl>
		<div id="signTab1">
			<div class="flex-list">
				<div class="flex-item" style="height: auto;"><span>甲方：</span><span class="flex-item-line" id="custmoerSign_TG1">${contractVo.cc_name }</span><img id="custmoerSign_show1" name="custmoerFDSign" src="" style="display: none;" width="100px" height="51px"></div>
				<img class="flex-item-img" src="/resources/image/appPage/contractCachet3.png">
				<div class="flex-item" style="height: auto;"><span>乙方：</span><span class="flex-item-line" id="custmoerSign_ZL1">${customerInfo.cc_name }</span><img id="custmoerSign1" name="custmoerZKSign" style="display:none;" src="" width="100px" height="51px"></div>
				<div class="flex-item"><span>丙方：</span><span class="flex-item-line">重庆管家婆房地产经纪有限公司</span></div>
				<div class="flex-list">
					<div class="flex-item">
						<span>签约日期：</span>
						<span class="flex-item-line" style="text-align: center;">${fillTimeArray[0]}</span>
						<span>年</span>
						<span class="flex-item-line" style="text-align: center;">${fillTimeArray[1]}</span>
						<span>月</span>
						<span class="flex-item-line" style="text-align: center;">${fillTimeArray[2]}</span>
						<span>日</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</div>
<div class="" id="signBtn" style="display:none;padding: 10px;">
	<input type="hidden" value="${isSign }" id="isSign">
	<button class="next-btn error-bg">确认并签字</button>
</div>
<div class="" style="height: 3px;"></div>
</body>
</html>