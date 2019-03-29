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
	<link href="/resources/common/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
	<link href="/resources/css/common/common.css" rel="stylesheet" type="text/css">
	<link href="/resources/css/app/contractprint.css" rel="stylesheet" type="text/css">
	<link href="/resources/css/appPage/e-contract/contractPrint.css?v=<%=System.currentTimeMillis()%>" rel="stylesheet" type="text/css">
	<link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
	<link href="/resources/common/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"><!-- 旧字体样式 -->


	<script src="/resources/js/jquery-2.0.0.min.js"></script>
	<script src="/resources/js/common/common.js"></script>
	<script src="/resources/js/common/common.hint.js"></script>
	<script src="/resources/js/appPage/contractPrint_TG2-3.js?v=<%=System.currentTimeMillis()%>"></script>
</head>
<body>
<%--<div class="top-warning">--%>
	<%--<label style="font-size: 12px;color: #f17070;">&nbsp;&nbsp;<img id="hintImg" src="/resources/image/contract/contract_hint.png" style="width: 15px;height: 15px; margin-top: 2px;visibility:visible">&nbsp;&nbsp;<label>请认真阅读本页内容，确认并完成签字</label></label>--%>
<%--</div>--%>
<div id="contractTGPrint" style="padding: 10px;background : url(/resources/image/appPage/contract/gjp_bg.png);">
	<div id="div1" class="" style="position: relative; text-align: center; margin: 0 auto; width: 100%; margin-bottom: 20px; ">
		<div class="box-head">
			<img src="/resources/image/appPage/gjp_logo.png" class="logoImg">
			<label class="font18">重庆管家婆房屋托管中心</label>
			<label class="rightFont">稳定高回报，出租无风险，客户更省心！</label>
		</div>
		<hr class="box-hr">
		<div class="box-title">房屋租赁委托经营管理合同（精装版）</div>
		<div class="conNo">合同编号：${contractObject.contractObject_No}</div>
		<div class="flex-list">
			<div class="flex-item"><span>甲方：</span><span class="flex-item-line">${contractVo.cc_name}</span></div>
			<div class="flex-item"><span>联系电话：</span><span class="flex-item-line">${contractVo.ccp_phone}</span></div>
		</div>
		<div class="flex-list">
			<div class="flex-item"><span>证件号码：</span><span class="flex-item-line">${contractVo.cc_cardNum}</span></div>
			<div class="flex-item"><span>银行户名：</span><span class="flex-item-line">${customers[0].customerBank.cbc_name }</span></div>
		</div>
		<div class="flex-list">
			<div class="flex-item"><span>银行卡号：</span><span class="flex-item-line">${customers[0].customerBank.cbc_cardNum}</span></div>
			<div class="flex-item"><span>开户网点：</span><span class="flex-item-line">${customers[0].customerBank.cbc_address}</span></div>
		</div>
		<div class="flex-list">
			<div class="flex-item"><span>QQ或微信：</span><span class="flex-item-line"></span></div>
			<div class="flex-item"><span>联络地址：</span><span class="flex-item-line"></span></div>
		</div>
		<div class="flex-list">
			<div class="flex-item"><span>乙方：</span><span class="flex-item-line">重庆管家婆房地产经纪有限公司</span></div>
			<div class="flex-item"><span>营业执照号：</span><span class="flex-item-line">915001085540918999</span></div>
		</div>
		<div class="flex-list">
			<div class="flex-item"><span>签约代表：</span><span class="flex-item-line">${contractor.em_name}</span></div>
			<div class="flex-item"><span>联系电话：</span><span class="flex-item-line">${contractor.em_phone} / 023-88067511 </span></div>
		</div>
		<dl class="dl-list">
			<dd>根据《中华人民共和国合同法》及相关法律法规的规定，甲、乙双方在平等自愿且充分理解相关条款的基础上，就甲方将房屋全权委托于乙方经营管理出租屋事宜，为明确双方权利责任，经协商一致，订立本合同。</dd>
		</dl>
		<dl class="dl-list">
			<dt>第一条&nbsp;&nbsp;房屋概述</dt>
			<dd>1、房屋地址<label class="textUnderLine">&nbsp;${houseInfo.he_address}&nbsp;</label>，建筑面积<label class="textUnderLine">&nbsp;${houseInfo.hi_measure }&nbsp;</label>平米，户型是<label class="textUnderLine">&nbsp;${houseInfo.hi_houseS }&nbsp;</label>室<label
					class="textUnderLine">&nbsp;${houseInfo.hi_houseT }&nbsp;</label>厅<label class="textUnderLine">&nbsp;${houseInfo.hi_houseW }&nbsp;</label>卫。
			</dd>
			<dd>2、该房屋现有家具家电设施设备情况详见合同附件(物业交接单)。</dd>
		</dl>
		<dl class="dl-list">
			<dt>第二条&nbsp;&nbsp;房屋托管约定：甲方须把房屋清洁和损坏物品维修好后，乙方才接房并开始计算租期。</dt>
			<dd>1、委托期限：<label class="textUnderLine">&nbsp;${startDateArray[0] }&nbsp;</label>年<label class="textUnderLine">&nbsp;${startDateArray[1] }&nbsp;</label>月<label class="textUnderLine">&nbsp;${startDateArray[2] }&nbsp;</label>日起至<label
					class="textUnderLine">&nbsp;${endDateArray[0] }&nbsp;</label>年<label class="textUnderLine">&nbsp;${endDateArray[1] }&nbsp;</label>月<label class="textUnderLine">&nbsp;${endDateArray[2] }&nbsp;</label>日止(<label id="ymdLabel" style="font-weight: bold;"></label>)。
			</dd>
			<dd>委托期内，如因承租方中途违约退房、转租等影 响剩余租期不足，导致乙方无法再次出租时，甲方同意本合同自动延长但不超过3个月，具体延长时间以乙方与承租人签订的租赁期限为准，延期租金按原合同执行。如截止时间在春节放假期间，则截止时间自动顺延至乙方上班第1天，且此期间免租金。</dd>
			<dd>2、租金（乙方代付）：<input type="hidden" value="${payStyle }" id="payStyle"><%--<label class="textUnderLine">&nbsp;${payStyle }&nbsp;</label>付，--%>
				<i class="fa fa-check-square-o" style="text-indent: 0em;" id="fu1"></i>月付
				<i class="fa fa-check-square-o" style="text-indent: 0em;" id="fu2"></i>季付
				<i class="fa fa-check-square-o" style="text-indent: 0em;" id="fu4"></i>半年付
				<i class="fa fa-check-square-o" style="text-indent: 0em;" id="fu3"></i>年付
			</dd>
			<dd>符合条件的甲方若选择年付，即默认自愿申请与乙方合作的第三方办理房东年付服务，甲方可提前一次性收到当年度乙方代付租金，乙方协助甲方按年度申请，乙方按本合同约定租金还款给第三方。如当年度甲方未通过第三方审核，按本合同约定租金自动转为乙方季付给甲方。</dd>
			<dd>
				<div style="text-indent: 2em;" id="rent"><input type="hidden" value="${rentPlusStr }" id="rentPlusStr"><input type="hidden" value="${contractBody.contractBody_StartTOEnd }" id="startEndDate"><input type="hidden" id="totalRent" value="${totalRent}">
					<%--<p class="conInfo">第 1 年租金：<label class="textUnderLine">&nbsp;&nbsp;</label>元/月（大写：<label class="textUnderLine">&nbsp;&nbsp;</label>整）。</p>--%>
					<%--<p class="conInfo">第 2 年租金：<label class="textUnderLine">&nbsp;&nbsp;</label>元/月（大写：<label class="textUnderLine">&nbsp;&nbsp;</label>整）。</p>--%>
					<%--<p class="conInfo">第 3 年租金：<label class="textUnderLine">&nbsp;&nbsp;</label>元/月（大写：<label class="textUnderLine">&nbsp;&nbsp;</label>整）。</p>--%>
					<%--<p class="conInfo">第 4 年租金：<label class="textUnderLine">&nbsp;&nbsp;</label>元/月（大写：<label class="textUnderLine">&nbsp;&nbsp;</label>整）。</p>--%>
					<%--<p class="conInfo">第 5 年租金：<label class="textUnderLine">&nbsp;&nbsp;</label>元/月（大写：<label class="textUnderLine">&nbsp;&nbsp;</label>整）。</p>--%>
				</div>
			</dd>
			<p class="conInfo">3、该租金是甲乙双方协商的最低出租月租金，如实际出租月租金超过该租金，超额租金分成比例如下：</p>
			<dd>超额租金分成：甲方<label class="textUnderLine">&nbsp;${contractBody.contractBody_RentRate_A }&nbsp;</label>％，乙方<label class="textUnderLine">&nbsp;${contractBody.contractBody_RentRate_B }&nbsp;</label>％。</dd>
			<dd id="freeDiv"><input type="hidden" value="${contractBody.contractBody_FreeTime }" id="bodyFreeTime">
				<%--4、免租期：第一年<label class="textUnderLine">&nbsp;${freeTime[0] }&nbsp;</label>天，第二年<label class="textUnderLine">&nbsp;${freeTime[1] }&nbsp;</label>天，第三年<label class="textUnderLine">&nbsp;${freeTime[2] }&nbsp;</label>天，第四年<label class="textUnderLine">&nbsp;${freeTime[3] }&nbsp;</label>天，第五年<label class="textUnderLine">&nbsp;${freeTime[4] }&nbsp;</label>天。--%>
			</dd>
			<dd id="serviceDiv"><input type="hidden" value="${contractBody.contractBody_Service }" id="bodyService">
				<%--5、管理费：<label class="textUnderLine" id="data_7">&nbsp;¥${contractBody.contractBody_Service }&nbsp;</label>元（大写<label class="textUnderLine" id="data_8">&nbsp;&nbsp;</label>整）。--%>
			</dd>
			<dd id="costDiv"><input type="hidden" value="${contractBody.contractBody_GuaranteeCost }" id="guaranteeCost">

			</dd>
			<dd>7、首次代付租金日：每年度的免租期租金，乙方在每年度首次付租时扣除。</dd>
			<dd>
				<div style="text-indent: 2em;" id="rentDay"><input type="hidden" id="startPayTime" value="${contractBody.contractBody_StartPayTime }">
					<%--<p class="conInfo">第 1 年：<label class="textUnderLine">&nbsp;&nbsp;</label>月<label class="textUnderLine">&nbsp;&nbsp;</label>日；</p>--%>
					<%--<p class="conInfo">第 2 年：<label class="textUnderLine">&nbsp;&nbsp;</label>月<label class="textUnderLine">&nbsp;&nbsp;</label>日；</p>--%>
					<%--<p class="conInfo">第 3 年：<label class="textUnderLine">&nbsp;&nbsp;</label>月<label class="textUnderLine">&nbsp;&nbsp;</label>日；</p>--%>
					<%--<p class="conInfo">第 4 年：<label class="textUnderLine">&nbsp;&nbsp;</label>月<label class="textUnderLine">&nbsp;&nbsp;</label>日；</p>--%>
					<%--<p class="conInfo">第 5 年：<label class="textUnderLine">&nbsp;&nbsp;</label>月<label class="textUnderLine">&nbsp;&nbsp;</label>日；</p>--%>
				</div>
			</dd>
			<dd>8、乙方保证金<label class="textUnderLine" id="data_5">&nbsp;¥${contractBody.contractBody_Pay }&nbsp;</label>元（大写<label class="textUnderLine" id="data_6">&nbsp;&nbsp;</label>整）。</dd>
			<dd>9、乙方定金<label class="textUnderLine" id="data_1">&nbsp;¥${contractBody.contractBody_Depslit }&nbsp;</label>元（大写<label class="textUnderLine" id="data_2">&nbsp;&nbsp;</label>整），乙方首次代付租金时减除。</dd>
			<dd>
				<p class="conInfo" style="text-indent: 2em;">
					甲方收取乙方定金后，则视为独家委托，甲方不得再自己或委托他人招租、管理房屋。否则，乙方有权立即终止本合同，并要求甲方双倍赔偿乙方定金和赔偿相关损失。
				</p>
			</dd>
			<dd>10、代付租金： 乙方代承租方支付租金给甲方后，甲方委托乙方向承租方催收租金，乙方扣除相关费用后，再转交给甲方。每次代付租金日根据支付方式按签合同日期顺延，3个工作日内到账，周末、节假日等顺延。</dd>
			<dd>11、税费： 甲方承担的房屋租赁税、房产税及政府规定的出租房屋征收的其他税费等，乙方协助办理。</dd>
			<dd>12、委托期间费用： 乙方为甲方垫付的托管前甲方未交清的水电气费、物管费、清洁费、电话费、宽带费、有线费等，包括托管期间应甲方承担的维修等费用,甲方同意乙方在支付下期租金时直接扣除。</dd>
		</dl>
		<dl class="dl-list">
			<dt>第三条&nbsp;&nbsp;甲方委托权限：详见《授权委托书》</dt>
			<%--<dd>1、甲方保证所交付委托管理的房屋符合国家对租赁房屋的有关规定，保证其对委托经营管理的房屋拥有合法所有权，保证房屋的其他共有人同意委托管理，保证出租房屋配套设施没有安全隐患等。否则，由此而引起的包括但不限于本合同被有关部门撤销或宣告无效或被承租人及第三人主张权利等相关责任全部由甲方承担。</dd>--%>
			<%--<dd>2、委托期内，乙方保障甲方室内财产安全和租金收益安全，如因承租方原因或承租方以外的第三人侵权行为导致甲方室内财或甲方租金收益受损的，乙方承担连带责任。</dd>--%>
			<%--<dd>3、委托房屋在租赁期间发生所有权变动，乙方有权要求房屋受让人继续履行原《房屋租赁委托经营管理合同》和《房屋租赁合同》。</dd>--%>
			<%--<dd>4、本合同签订后，因甲方原因而导致合同提前终止的，甲方应按照本合同当年年租金总额的20%向乙方支付违约金，并退还乙方所余代付房租、房屋租赁保证金等，并且若支付的违约金不足弥补乙方直接损失的，甲方应承担损失赔偿责任。</dd>--%>
		</dl>
		<dl class="dl-list">
			<dt>第四条&nbsp;&nbsp;甲方承诺保证</dt>
			<dd>1、甲方保证所委托管理的房屋符合国家对租赁房屋的有关规定，保证其对委托租赁经营管理的房屋拥有合法所有权，保证房屋的其他共有人同意委托管理，保证出租房屋没有安全隐患等，保证室内家具家电、装修配套等设施设备没有质量和权利瑕疵、无安全隐患，可以正常使用。否则，由此而引起的包括而不限于本合同被有关部门撤销或宣告无效或被承租人及第三人主张权利等相关责任全部由甲方承担，乙方可无条件终止本合同，乙方和承租方可无条件立即终止三方《房屋租赁合同》，并有权要求甲方全额退还保证金、租金等，甲方承担违约责任。</dd>
			<dd>2、委托房屋在租赁期间发生所有权变动，乙方有权要求房屋受让人继续履行原《房屋租赁委托经营管理合同》和《房屋租赁合同》。</dd>
			<dd>3、如甲方要出售该房屋，须至少提前1个月通知乙方，且至少给乙方1个月买卖独家委托权。</dd>
			<dd>4、如甲方要出售该房屋，必须经承租方同意后，才能带人看房，不得擅自开门。否则，甲方承担相应违约责任和法律纠纷。</dd>
			<dd>5、甲方承诺严格遵守甲、乙及承租方三方《房屋租赁合同》的约定。</dd>
		</dl>
		<dl class="dl-list">
			<dt>第五条&nbsp;&nbsp;乙方责任</dt>
			<dd>1、委托期内，乙方保障甲方室内财产安全和租金收益安全，不包括甲方原因导致损失和甲方遗留在室内的衣物鞋具、床上用品、锅碗瓢盆、玩具、小饰品等物品。</dd>
			<dd>2、委托期内，如因承租方原因（包括拖欠水电气费、物管费等）导致甲方租金收益受损的，乙方承担连带责任。</dd>
			<dd>3、委托期内，如因除甲方、乙方、承租方以外的第三人侵权行为导致甲方室内财产受损的，先由保险公司在保险责任范围内赔偿，不足的部分由承租方赔偿，乙方承担连带责任。乙方在向甲方承担相关责任后，有权向承租方或第三人追偿。</dd>
		</dl>
		<dl class="dl-list">
			<dt>第六条&nbsp;&nbsp;乙方服务内容</dt>
			<dd>1、租前服务：招租，带看，筛选租客、代购家具家电等物品，代开通水电气、有线、宽带等，代签《房屋租赁合同》。</dd>
			<dd>2、租后服务：安全巡检、维修、交退房手续、家具家电等物品交接和验收、费用结算、协助保险理赔、协助处理邻里和法律纠纷。</dd>
		</dl>
		<dl class="dl-list">
			<dt>第七条&nbsp;&nbsp;维修</dt>
			<dd>1、承租方入住1月内的维修费用：全部由甲方承担(承租方人为损坏除外)，乙方可有偿代为维修。</dd>
			<dd>2、承租方入住1月后的维修费用：除本条第3、4、5、6、7款外的其它维修费用,由乙方和承租方承担。</dd>
			<dd>3、委托期内，空调和冰箱的漏氟、加氟、电机和压缩机等维修更换费用全部由甲方承担。</dd>
			<dd>4、在质保期内的家具家电等物品，乙方通知甲方后，由甲方尽快联系商家维修好，维修相关费用由甲方承担。</dd>
			<dd>5、超过质保期的家具家电等同一物品，乙方维修3次及以上还无法修好的物品(以乙方维修单为准)，甲方须在7天内更换新的同类同档次物品。</dd>
			<dd>6、委托期内，由甲方承担维修更换责任的，乙方在通知甲方2日内未维修更换好的，乙方有权代为维修更换，相关费用等由甲方全部承担，乙方有权从下期代收租金中直接扣除。</dd>
			<dd>7、委托期内，甲方须承担下列维修、更换责任和相关费用，乙方可有偿代为维修、更换。</dd>
			<dd>
				<div style="text-indent: 2em;">
					<p class="conInfo">①内外墙乳胶漆或墙纸、天花板表皮老化脱落或返硝起层，玻璃自然破裂；</p>
					<p class="conInfo">②室内外水管、阀门老化破损、漏水、爆裂；</p>
					<p class="conInfo">③因进出水管道和防水层等隐蔽工程出现漏水，影响承租方或楼下邻居生活的；</p>
					<p class="conInfo">④下水管道因老化问题发生堵塞而产生的疏通费用或马桶更换；</p>
					<p class="conInfo">⑤因电表、空开、电路、电线老化、水表、天然气表等老化问题导致承租方无法正常用水电气等；</p>
					<p class="conInfo">⑥地砖、墙砖、木地板因装修原因脱层、脱落、翘拱或破损的；</p>
					<p class="conInfo">⑦因有规定对供水系统、照明系统、供暖系统、天然气系统、房屋结构等其它相关项目需要整体更换、施工、改造、修理等发生的费用；</p>
					<p class="conInfo">⑧阳台门窗、防盗门窗、房屋门窗老化问题影响承租方使用；</p>
				</div>
			</dd>
		</dl>
		<dl class="dl-list">
			<dt>第八条&nbsp;&nbsp;甲方违约责任</dt>
			<dd>1、委托期内，未经承租方允许，甲方不得进出该房屋。否则，因此引起的法律责任概由甲方全部负责。</dd>
			<dd>2、本合同签订后，甲方因不能提供本合同约定的房屋而解除合同的，须支付乙方当年年租金总额20%的违约金。</dd>
			<dd>3、委托期内，甲方因出售该房或违反本合同相关约定提前收回房屋而导致合同终止的，甲方应按照本合同当年年租金总额的20%向乙方支付违约金，并退还乙方所余房租、房屋租赁保证金等，并且若支付的违约金不足弥补乙方损失的，甲方应承担 损失赔偿责任。</dd>
			<dd>4、委托期满，甲方交接验收房屋后，甲方扣除未交的水电气费、物管费等，须在3个工作日内全额退还乙方剩余保证金。若甲方拒不退还保证金，乙方有权不交还房屋及钥匙或更换防盗门门锁直至甲方退还保证金为止，在此期间空置的租金由甲方承担。</dd>
		</dl>
		<dl class="dl-list">
			<dt>第九条&nbsp;&nbsp;其它约定</dt>
			<dd>1、为保障承租方安全，乙方将统一更换防盗门门锁，乙方不另行通知甲方。</dd>
			<dd>2、委托期内，承租方正常使用家具家电等室内物品和装修，有自然老化和正常损耗。退房时，甲方不得要求乙方按委托接房时标准交房。</dd>
			<dd>3、委托期内，已使用过的非恶意人为损坏且无法维修好的物品，以发票日期和金额按每天万分之六折旧后现金赔偿给甲方，甲方不得要求乙方和承租方赔偿新物品。</dd>
			<dd>4、委托期内，甲方擅自提高租金的，该提高行为无效，乙方有权按照合同约定的标准支付租金。</dd>
			<dd>5、如因甲方和承租方原因导致合同解除或终止的,乙方不退还已收的甲方管理费。</dd>
		</dl>
		<dl class="dl-list">
			<dt>第十条&nbsp;&nbsp;其它约定</dt>
			<dd>1、甲乙双方都有严格遵守和执行本合同相关约定的义务。</dd>
			<dd>2、因不可抗力导致本合同无法执行或或经双方同意的其它情况,本合同可解除,双方均不承担责任。</dd>
			<dd>3、本合同未尽事宜,经甲、乙双方协商一致,可订立补充条款。补充条款及附件均为本合同组成部分，与本合同具有同等法律力。</dd>
		</dl>
		<dl class="dl-list">
			<dt>第十一条&nbsp;&nbsp;争议解决:本合同项下发生的争议,由甲乙双方当事人协商；协商不成的,可向乙方所在地人民法院提起诉讼,诉讼费、律师费用等费用由败诉方承担。</dt>
		</dl>
		<dl class="dl-list">
			<dt>第十二条&nbsp;&nbsp;本合同壹式贰份,甲乙双方各执壹份,具有同等法律效力,自双方签字（盖章）后生效。</dt>
		</dl>
		<dl class="dl-list">
			<dt>第十三条&nbsp;&nbsp;甲、乙任一方联系地址和电话的变更均应在三日内书面通知对方。否则,由此造成的损失由过错方承担。</dt>
		</dl>
		<dl class="dl-list">
			<dt>第十四条&nbsp;&nbsp;补充约定：</dt>
			<dd>${contractObject.contractObject_Other}</dd>
		</dl>
		<div class="flex-list">
			<img class="flex-item-img" src="/resources/image/appPage/contractCachet3.png">
			<div class="flex-item" style="height: auto;"><span style="width: 90px;">甲方：</span><span class="flex-item-line" id="custmoerSign_TG1">${contractVo.cc_name}</span><img name="custmoerFDSign" style="background-color: transparent;" src="" width="100px" height="51px"></div>
			<div class="flex-item"><span style="width: 90px;">乙方：</span><span>重庆管家婆房地产经纪有限公司</span></div>
		</div>
		<div class="flex-list">
			<div class="flex-item"><span style="width: 90px;">签约代表：</span><span class="flex-item-line">${contractor.em_name}</span></div>
			<div class="flex-item">
				<span style="width: 90px;">签约日期：</span>
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
<div class="" id="signBtn" style="display: none;padding: 10px;">
	<input type="hidden" value="${isSign}" id="isSign">
	<button class="next-btn error-bg">确认并签字</button>
</div>
<div class="" style="height: 3px;"></div>
</body>
</html>