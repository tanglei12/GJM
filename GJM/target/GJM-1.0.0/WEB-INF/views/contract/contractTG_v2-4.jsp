<%@ page language="java" pageEncoding="utf-8"%>
<%
	response.setHeader("Pragma", "No-cache");
	response.setHeader("Cache-Control", "no-cache");
	response.setDateHeader("Expires", -10);
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title></title>
<!-- CSS -->
<link href="/resources/css/common/common.css" rel="stylesheet" type="text/css">
<link href="/resources/css/contractList/contract_v2.css" rel="stylesheet" type="text/css">
<link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href="/resources/common/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"><!-- 旧字体样式 -->

<script src="/resources/js/jquery-1.7.2.min.js" type="text/javascript"></script>
<script src="/resources/js/common/common.js"></script>
<script src="/resources/Plug-in/jquery.print/jquery.jqprint-0.3.js"></script>
<script src="/resources/js/contractList/contractTG_v2-4.js?v=<%=System.currentTimeMillis()%>"></script>

<script type="text/javascript">

function print(){
	var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
	var regStr_chrome = /chrome\/[\d.]+/gi 
	if(userAgent.indexOf("Chrome") > -1){
		var browserNV = userAgent.match(regStr_chrome);  
		if(browserNV.indexOf("58.0") == 0){
			aelrt("请升级谷歌浏览器版本");
			return;
		}
	} else {
		alert("请在谷歌浏览器上打印！");
		return;
	}
	$("#wenxints").hide();
	$(".conTitle").css({"margin-left" : "150px"});
	$("#tgPrintTime").html(returnTime(new Date()));
	$("#contractTGPrint").jqprint({
		debug: false,//如果是true则可以显示iframe查看效果，默认是false 
        importCSS: true,//true表示引进原来的页面的css，默认是true。
        printContainer: true,//表示如果原来选择的对象必须被纳入打印，默认是true。
        operaSupport: true///表示如果插件也必须支持歌opera浏览器，默认是true。
	});
}

function refresh(){
	location.reload();
}
</script>
</head>
<body oncontextmenu="event.returnValue=false">
	<%--<a href="#" onclick="print();" style="margin-left: 10px; margin-top: 10px;">打印</a>--%>
	<%--<a href="#" onclick="refresh();" style="margin-left: 20px; margin-top: 10px;">刷新</a>--%>
	<div id="contractTGPrint" style="width: 950px;margin: 2px auto;background : url(/resources/image/watermark.png);">
		<div id="div1" class="" style="position: relative;text-align:center;margin: 0 auto;width: 100%; margin-bottom: 20px;">
			<div>
				<img src="/resources/image/appPage/gjp_logo.png" class="logoImg">
				<label class="font18">重庆管家婆房屋托管中心</label>
				<label class="rightFont">稳定高回报，出租无风险，客户更省心！</label>
			</div>
			<div style="">
				<hr style="width:100%;height:1px;border:none;border-top:2px solid #555555; ">
			</div>
			<%--<div style="margin: 5px auto;display: flex;" id="wenxints">--%>
				<%--<div class="fontTx">--%>
					<%--<p>温馨提醒：</p>--%>
					<%--<p>1、客户只能通过APP和我公司签订电子合同（可打印保存），合同其它签订方式无效（包括但不限于签纸质合同）。</p>--%>
					<%--<p>2、我公司已对本合同作出详细说明，客户确认签字之前已对本合同作详细阅读和充分理解。</p>--%>
					<%--<p>3、客户只能通过APP线上支付相关款项，我公司不允许工作人员线下收款。如客户把相关款项交给相关人员而导致利益受损的，我公司概不负责!</p>--%>
					<%--<p>4、为最大程度的保障客户利益和减少损失，我公司赠送20万保额家财险。如在委托期内,发生被盗、水淹、火灾、电 器爆燃、坠落物品伤人等意外情况，请客户保护好现场并马上联系保险公司勘查现场（可委托我公司报案），具体赔偿事宜 由保险公司决定。我公司可协助客户办理保险理赔相关事项，不承担赔偿责任。</p>--%>
				<%--</div>--%>
				<%--<div style="border: 1px solid #555555;width: 18%;">--%>
					<%--<img src="/resources/image/appPage/gjp_wechat.png" style="" width="150px" height="160px"></img>--%>
				<%--</div>--%>
			<%--</div>--%>
			<div style="margin-top: 10px;">
				<label class="conTitle">房屋租赁委托经营管理合同（精装版）</label><label id="tgPrintTime" style="position: relative;font-size: 15px;float : right;"></label>
			</div>
			<div>
				<label class="conNo">合同编号：${contractObject.contractObject_No }</label>
			</div>
			<div>
				<table>
					<tbody align="center">
						<tr width="100%">
							<td width="8%" height="20px"><label class="conDigest">甲&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;方:</label></td>
							<td width="30%" height="20px" class="tdLine">&nbsp;${contractVo.cc_name }</td>
							<td width="4%" height="20px"></td>
							<td width="8%" height="20px"><label class="conDigest">银&nbsp;&nbsp;行&nbsp;&nbsp;户&nbsp;&nbsp;名:</label></td>
							<td width="30%" height="20px" class="tdLine">&nbsp;${customers[0].customerBank.cbc_name }</td>
						</tr>
						<tr width="100%">
							<td width="8%" height="20px"><label class="conDigest">身&nbsp;份&nbsp;证&nbsp;号&nbsp;码:</label></td>
							<td width="30%" height="20px" class="tdLine">&nbsp;${contractVo.cc_cardNum }</td>
							<td width="4%" height="20px"></td>
							<td width="8%" height="20px"><label class="conDigest">银&nbsp;&nbsp;行&nbsp;&nbsp;卡&nbsp;&nbsp;号:</label></td>
							<td width="30%" height="20px" class="tdLine">&nbsp;${customers[0].customerBank.cbc_cardNum }</td>
						</tr>
						<tr width="100%">
							<td width="8%" height="20px"><label class="conDigest">联&nbsp;&nbsp;系&nbsp;&nbsp;电&nbsp;&nbsp;话:</label></td>
							<td width="30%" height="20px" class="tdLine">&nbsp;${contractVo.ccp_phone }</td>
							<td width="4%" height="20px"></td>
							<td width="8%" height="20px"><label class="conDigest">开&nbsp;&nbsp;户&nbsp;&nbsp;网&nbsp;&nbsp;点:</label></td>
							<td width="30%" height="20px" class="tdLine">&nbsp;${customers[0].customerBank.cbc_address }</td>
						</tr>
						<tr width="100%">
							<td width="8%" height="20px"><label class="conDigest">联&nbsp;&nbsp;络&nbsp;&nbsp;地&nbsp;&nbsp;址:</label></td>
							<td width="30%" height="20px" class="tdLine" clospan="4">&nbsp;${customers[0].contact_address }&nbsp;</td>
							<td width="4%" height="20px"></td>
							<td width="8%" height="20px"><label class="conDigest">Q&nbsp;Q&nbsp;&nbsp;或&nbsp;&nbsp;微&nbsp;信:</label></td>
							<td width="30%" height="20px" class="tdLine">&nbsp;${customers[0].cc_qq }</td>
						</tr>
						<tr width="100%">
							<td width="8%" height="20px"><label class="conDigest">乙&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;方:</label></td>
							<td width="30%" height="20px" style="text-align: left;">&nbsp;<label style="font-size:15px; font-family:'黑体 font-weight:bold;padding-left:5px;">重庆管家婆房地产经纪有限公司</label></td>
							<td width="4%" height="20px"></td>
							<td width="8%" height="20px"><label class="conDigest">营&nbsp;业&nbsp;执&nbsp;照&nbsp;号:</label></td>
							<td width="30%" height="20px" style="text-align: left;"><label style="font-size:15px; font-family:'黑体 font-weight:normal;padding-left:5px;">&nbsp;915001085540918999</label></td>
						</tr>
						<tr width="100%" id="payYearPG" style="display: none;">
							<td width="8%" height="20px"></td>
							<td width="30%" height="20px" style="text-align: left;">&nbsp;<label style="font-size:15px; font-family:'黑体 font-weight:bold;padding-left:5px;" id="payYear1">${contractBody.contractBody_PayType }</label></td>
							<td width="4%" height="20px"></td>
							<td width="8%" height="20px"></td>
							<td width="30%" height="20px" style="text-align: left;"><label style="font-size:15px; font-family:'黑体 font-weight:normal;padding-left:5px;" id="payYear3">&nbsp;91510105MA6CLQBG5L</label></td>
						</tr>
						<tr width="100%">
							<td width="8%" height="20px"><label class="conDigest">签&nbsp;&nbsp;约&nbsp;&nbsp;代&nbsp;&nbsp;表:</label></td>
							<td width="30%" height="20px" class="tdLine">&nbsp;${contractor.em_name }</td>
							<td width="4%" height="20px"></td>
							<td width="8%" height="20px"><label class="conDigest">联&nbsp;&nbsp;系&nbsp;&nbsp;电&nbsp;&nbsp;话:</label></td>
							<td width="30%" height="20px" class="tdLine">&nbsp;${contractor.em_phone } / 023-88067511 </td>
						</tr>
					</tbody>
				</table>
			</div>
			<div>
				<p class="conInfo" style="text-indent: 2em;">
					根据《中华人民共和国合同法》及相关法律法规的规定，甲、乙双方在平等自愿且充分理解相关条款的基础上，就甲方将房屋全权委托于乙方经营管理出租屋事宜，为明确双方权利责任，经协商一致，订立本合同。
				</p>
			</div>
			<div>
				<p class="conDigest_left">
					第一条&nbsp;&nbsp;房屋概述
				</p>
				<p class="conInfo">
					1、&nbsp;房屋地址<label class="textUnderLine">&nbsp;${houseInfo.he_address }&nbsp;</label>，建筑面积<label class="textUnderLine" id="template1">&nbsp;${houseInfo.hi_measure }&nbsp;</label>平米，户型是<label class="textUnderLine" id="template2">&nbsp;${houseInfo.hi_houseS }&nbsp;</label>室<label class="textUnderLine" id="template3">&nbsp;${houseInfo.hi_houseT }&nbsp;</label>厅<label class="textUnderLine" id="template4">&nbsp;${houseInfo.hi_houseW }&nbsp;</label>卫。
				</p>
				<p class="conInfo">
					2、&nbsp;该房屋现有家具家电设施设备情况详见合同附件(物业交接单)。
				</p>
			</div>
			<div>
				<p class="conDigest_left">
					第二条&nbsp;&nbsp;房屋托管约定：甲方须把房屋清洁和损坏物品维修好后，乙方才接房并开始计算租期。
				</p>
				<p class="conInfo"><input type="hidden" value="${ymd_year}" id="ymd_year"><input type="hidden" value="${ymd_month}" id="ymd_month"><input type="hidden" value="${ymd_day}" id="ymd_day">
					1、&nbsp;委托期限：<label class="textUnderLine" id="template5">&nbsp;${startDateArray[0] }&nbsp;</label>年<label class="textUnderLine" id="template6">&nbsp;${startDateArray[1] }&nbsp;</label>月<label class="textUnderLine" id="template7">&nbsp;${startDateArray[2] }&nbsp;</label>日起至<label class="textUnderLine" id="template8">&nbsp;${endDateArray[0] }&nbsp;</label>年<label class="textUnderLine" id="template9">&nbsp;${endDateArray[1] }&nbsp;</label>月<label class="textUnderLine" id="template10">&nbsp;${endDateArray[2] }&nbsp;</label>日止(<label id="ymdLabel" style="font-weight: bold;"></label>)${aaa}。
				</p>
				<p class="conInfo" style="text-indent: 2em;">
					委托期内，如因承租方中途违约退房、转租等影响剩余租期不足，导致乙方无法再次出租时，甲方同意本合同自动延长但不超过3个月，具体延长时间以乙方与承租人签订的租赁期限为准，延期租金按原合同执行。如截止时间在春节放假期间，则截止时间自动顺延至乙方上班第1天，且此期间免租金。
				</p>
				<p class="conInfo" style="display: flex;">2、&nbsp;<input type="hidden" value="${rentPlusStr }" id="rentPlusStr"><label id="gjp1">租金（乙方代付）：</label><label id="pangu1" style="display: none;">固定租金回报（乙方定期向甲方支付的款项称为固定租金回报）：</label><input type="hidden" value="${payStyle }" id="payStyle"><%--<label class="textUnderLine">&nbsp;${payStyle }&nbsp;</label>付，--%>
					<i class="fa fa-square-o" style="margin-top: 3px;" id="fu1"></i>月付<i class="fa fa-square-o" style="margin-left: 30px;margin-top: 3px;" id="fu2"></i>季付<i class="fa fa-square-o" style="margin-left: 30px;margin-top: 3px;" id="fu4"></i>半年付<i class="fa fa-square-o" style="margin-left: 30px;margin-top: 3px;" id="fu3"></i>年付
				</p>
				<p class="conInfo" style="text-indent: 2em;" id="gjp2">符合条件的甲方若选择年付，即默认自愿申请与乙方合作的第三方办理房东年付金融服务，甲方可提前一次性收到当年度乙方代付租金，乙方协助甲方按年度申请，乙方按本合同约定租金还款给第三方。如当年度甲方未通过第三方审核，按本合同约定租金自动转为乙方季付给甲方。</p>
				<p class="conInfo" style="text-indent: 2em;">每年12月、1月和2月账期内租金支付双方约定自动变为月付。</p>
				<div style="text-indent: 2em;" id="rent"><input type="hidden" value="${contractBody.contractBody_StartTOEnd }" id="startEndDate"><input type="hidden" id="totalRent" value="${totalRent}">
					<%--<p class="conInfo">第 1 年租金：<label class="textUnderLine">&nbsp;&nbsp;</label>元/月（总租金：<label class="textUnderLine">&nbsp;&nbsp;</label>整）。</p>--%>
					<%--<p class="conInfo">第 2 年租金：<label class="textUnderLine">&nbsp;&nbsp;</label>元/月（总租金：<label class="textUnderLine">&nbsp;&nbsp;</label>整）。</p>--%>
					<%--<p class="conInfo">第 3 年租金：<label class="textUnderLine">&nbsp;&nbsp;</label>元/月（总租金：<label class="textUnderLine">&nbsp;&nbsp;</label>整）。</p>--%>
					<%--<p class="conInfo">第 4 年租金：<label class="textUnderLine">&nbsp;&nbsp;</label>元/月（总租金：<label class="textUnderLine">&nbsp;&nbsp;</label>整）。</p>--%>
					<%--<p class="conInfo">第 5 年租金：<label class="textUnderLine">&nbsp;&nbsp;</label>元/月（总租金：<label class="textUnderLine">&nbsp;&nbsp;</label>整）。</p>--%>
				</div>
				<p class="conInfo">3、&nbsp;<label id="gjp3">该租金是甲乙双方协商的最低出租月租金，如实际出租月租金超过该租金，超额租金分成比例如下:</label><label id="pangu2">乙方有权决定房屋的出租价格，甲方无权干涉。若乙方实际出租价格高于支付给甲方的固定租金回报的，则高出的部分归乙方所有，作为甲方支付给乙方的托管费用。</label></p>
				<p class="conInfo" id="gjp4">
					&nbsp;&nbsp;&nbsp;&nbsp;超额租金分成：甲方<label class="textUnderLine" id="template11">&nbsp;${contractBody.contractBody_RentRate_A }&nbsp;</label>％，乙方<label class="textUnderLine" id="template12">&nbsp;${contractBody.contractBody_RentRate_B }&nbsp;</label>％。
				</p>
				<p class="conInfo" id="freeDiv"><input type="hidden" value="${contractBody.contractBody_FreeTime }" id="bodyFreeTime">
					<%--4、&nbsp;免租期：第一年<label class="textUnderLine">&nbsp;${freeTime[0] }&nbsp;</label>天，第二年<label class="textUnderLine">&nbsp;${freeTime[1] }&nbsp;</label>天，第三年<label class="textUnderLine">&nbsp;${freeTime[2] }&nbsp;</label>天，第四年<label class="textUnderLine">&nbsp;${freeTime[3] }&nbsp;</label>天，第五年<label class="textUnderLine">&nbsp;${freeTime[4] }&nbsp;</label>天。--%>
				</p>
				<p class="conInfo" id="serviceDiv"><input type="hidden" value="${contractBody.contractBody_Service }" id="bodyService">
					<%--5、&nbsp;管理费：第一年<label class="textUnderLine">&nbsp;${contractBody.contractBody_Service }&nbsp;</label>元；第二年<label class="textUnderLine" >&nbsp;${contractBody.contractBody_Service }&nbsp;</label>元；第三年<label class="textUnderLine" >&nbsp;${contractBody.contractBody_Service }&nbsp;</label>元；第四年<label class="textUnderLine" >&nbsp;${contractBody.contractBody_Service }&nbsp;</label>元；第五年<label class="textUnderLine" >&nbsp;${contractBody.contractBody_Service }&nbsp;</label>元。--%>
				</p>
				<p class="conInfo" id="costDiv"><input type="hidden" value="${contractBody.contractBody_GuaranteeCost }" id="guaranteeCost">
					<%--6、&nbsp;包修费：第一年<label class="textUnderLine">&nbsp;${contractBody.contractBody_Service }&nbsp;</label>元；第二年<label class="textUnderLine" >&nbsp;${contractBody.contractBody_Service }&nbsp;</label>元；第三年<label class="textUnderLine" >&nbsp;${contractBody.contractBody_Service }&nbsp;</label>元；第四年<label class="textUnderLine" >&nbsp;${contractBody.contractBody_Service }&nbsp;</label>元；第五年<label class="textUnderLine" >&nbsp;${contractBody.contractBody_Service }&nbsp;</label>元。--%>
				</p>
				<p class="conInfo">
					7、&nbsp;<label id="gjp5">首次代付租金日：</label><label id="pangu3" style="display: none;">首次固定租金回报支付日</label>每年度的免租期租金、管理费、包修费，乙方在每年度首次付租时扣除。<br>
					<p class="conInfo" style="text-indent: 2em;" id="rentDay"><input type="hidden" id="startPayTime" value="${contractBody.contractBody_StartPayTime }">
						<%--<span>第 1 年：<label class="textUnderLine">&nbsp;&nbsp;</label>月<label class="textUnderLine">&nbsp;&nbsp;</label>日；</span>--%>
						<%--<span>第 2 年：<label class="textUnderLine">&nbsp;&nbsp;</label>月<label class="textUnderLine">&nbsp;&nbsp;</label>日；</span>--%>
						<%--<span>第 3 年：<label class="textUnderLine">&nbsp;&nbsp;</label>月<label class="textUnderLine">&nbsp;&nbsp;</label>日；</span>--%>
						<%--<span>第 4 年：<label class="textUnderLine">&nbsp;&nbsp;</label>月<label class="textUnderLine">&nbsp;&nbsp;</label>日；</span>--%>
						<%--<span>第 5 年：<label class="textUnderLine">&nbsp;&nbsp;</label>月<label class="textUnderLine">&nbsp;&nbsp;</label>日；</span>--%>
					</p>
				</p>
				<p class="conInfo">
					8、&nbsp;乙方保证金<label class="textUnderLine" id="data_5">&nbsp;${contractBody.contractBody_Pay }&nbsp;</label>元（大写<label class="textUnderLine" id="data_6">&nbsp;&nbsp;</label>整）。
				</p>
				<div id="gjpHT">
					<p class="conInfo">
						9、&nbsp;乙方定金<label class="textUnderLine" id="data_1">&nbsp;${contractBody.contractBody_Depslit }&nbsp;</label>元（大写<label class="textUnderLine" id="data_2">&nbsp;&nbsp;</label>整），乙方首次代付租金时减除。
					<p class="conInfo" style="text-indent: 2em;">
						甲方收取乙方定金后，则视为独家委托，甲方不得再自己或委托他人招租、管理房屋。否则，乙方有权立即终止本合同，并要求甲方双倍赔偿乙方定金和赔偿相关损失。
					</p>
					</p>
					<p class="conInfo">
						10、&nbsp;代付租金：乙方代承租方支付租金给甲方后，甲方委托乙方向承租方催收租金，乙方扣除相关费用后，再转交给甲方。每次代付租金日根据支付方式按签合同日期顺延，3个工作日内到账，周末、节假日等顺延。
					</p>
					<p class="conInfo">
						11、&nbsp;税费：甲方自行办理房屋租赁税、房产税、个人所得税及政府规定的出租房屋征收的其他税费等。
					</p>
					<p class="conInfo">
						12、&nbsp;委托期间费用：乙方为甲方垫付的托管前甲方未交清的水电气费、物管费、清洁费、电话费、宽带费、有线费等，包括托管期间应甲方承担的维修等费用,甲方同意乙方在支付下期租金时直接扣除。
					</p>
				</div>
				<div id="panguHT">
					<p class="conInfo">
						9、&nbsp;代付租金：乙方代承租方支付租金给甲方后，甲方委托乙方向承租方催收租金，乙方扣除相关费用后，再转交给甲方。每次代付租金日根据支付方式按签合同日期顺延，3个工作日内到账，周末、节假日等顺延。
					</p>
					<p class="conInfo">
						10、&nbsp;税费：甲方自行办理房屋租赁税、房产税、个人所得税及政府规定的出租房屋征收的其他税费等。
					</p>
					<p class="conInfo">
						11、&nbsp;委托期间费用：乙方为甲方垫付的托管前甲方未交清的水电气费、物管费、清洁费、电话费、宽带费、有线费等，包括托管期间应甲方承担的维修等费用,甲方同意乙方在支付下期租金时直接扣除。
					</p>
				</div>
			</div>
			<div>
				<p class="conDigest_left">
					第三条  甲方委托权限：详见《授权委托书》
				</p>
			</div>
			<div>
				<p class="conDigest_left">
					第四条  甲方承诺保证
				</p>
				<p class="conInfo">
					1、&nbsp;甲方保证所委托管理的房屋符合国家对租赁房屋的有关规定，保证其对委托租赁经营管理的房屋拥有合法所有权，保证房屋的其他共有人同意委托管理，保证出租房屋没有安全隐患等，保证室内家具家电、装修配套等设施设备没有质量和权利瑕疵、无安全隐患，可以正常使用。否则，由此而引起的包括而不限于本合同被有关部门撤销或宣告无效或被承租人及第三人主张权利等相关责任全部由甲方承担，乙方可无条件终止本合同，乙方和承租方可无条件立即终止三方《房屋租赁合同》，并有权要求甲方全额退还保证金、租金等，甲方承担违约责任。
				</p>
				<p class="conInfo">
					2、&nbsp;委托房屋在租赁期间发生所有权变动，乙方有权要求房屋受让人继续履行原《房屋租赁委托经营管理合同》和《房屋租赁合同》。
				</p>
				<p class="conInfo">
					3、&nbsp;如甲方要出售该房屋，须至少提前1个月通知乙方，且至少给乙方1个月买卖独家委托权。
				</p>
				<p class="conInfo">
					4、&nbsp;如甲方要出售该房屋，必须经承租方同意后，才能带人看房，不得擅自开门。否则，甲方承担相应违约责任和法律纠纷。
				</p>
				<p class="conInfo">
					5、&nbsp;甲方承诺严格遵守甲、乙及承租方三方《房屋租赁合同》的约定。
				</p>
			</div>
			<div>
				<p class="conDigest_left">
					第五条  乙方责任
				</p>
				<p class="conInfo">
					1、&nbsp;委托期内，乙方保障甲方室内财产安全和租金收益安全，不包括甲方原因导致损失和甲方遗留在室内的衣物鞋具、床上用品、锅碗瓢盆、玩具、小饰品等物品。
				</p>
				<p class="conInfo">
					2、&nbsp;委托期内，如因承租方原因（包括拖欠水电气费、物管费等）导致甲方租金收益受损的，乙方承担连带责任。
				</p>
				<p class="conInfo">
					3、&nbsp;委托期内，如因除甲方、乙方、承租方以外的第三人侵权行为导致甲方室内财产受损的，先由保险公司在保险责任范围内赔偿，不足的部分由承租方赔偿，乙方承担连带责任。乙方在向甲方承担相关责任后，有权向承租方或第三人追偿。
				</p>
			</div>
			<div>
				<p class="conDigest_left">
					第六条  乙方服务内容
				</p>
				<p class="conInfo">
					1、&nbsp;租前服务：招租，带看，筛选租客、代购家具家电等物品，代开通水电气、有线、宽带等，代签《房屋租赁合同》。
				</p>
				<p class="conInfo">
					2、&nbsp;租后服务：安全巡检、维修、交退房手续、家具家电等物品交接和验收、费用结算、协助保险理赔、协助处理邻里和法律纠纷。
				</p>
			</div>
			<div>
				<p class="conDigest_left">
					第七条  维修
				</p>
				<p class="conInfo">
					1、&nbsp;承租方入住1月内的维修费用：全部由甲方承担(承租方人为损坏除外)，乙方可有偿代为维修。
				</p>
				<p class="conInfo">
					2、&nbsp;承租方入住1月后的维修费用：除本条第3、4、5、6、7款外的其它维修费用,由乙方和承租方承担。
				</p>
				<p class="conInfo">
					3、&nbsp;委托期内，空调和冰箱的漏氟、加氟、电机和压缩机等维修更换费用全部由甲方承担。
				</p>
				<p class="conInfo">
					4、&nbsp;在质保期内的家具家电等物品，乙方通知甲方后，由甲方尽快联系商家维修好，维修相关费用由甲方承担。
				</p>
				<p class="conInfo">
					5、&nbsp;超过质保期的家具家电等同一物品，乙方维修3次及以上还无法修好的物品(以乙方维修单为准)，甲方须在7天内更换新的同类同档次物品。
				</p>
				<p class="conInfo">
					6、&nbsp;委托期内，由甲方承担维修更换责任的，乙方在通知甲方2日内未维修更换好的，乙方有权代为维修更换，相关费用等由甲方全部承担，乙方有权从下期代收租金中直接扣除。
				</p>
				<p class="conInfo">7、&nbsp;委托期内，甲方须承担下列维修、更换责任和相关费用，乙方可有偿代为维修、更换。</p>
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
			</div>
			<div>
				<p class="conDigest_left">
					第八条  甲方违约责任
				</p>
				<p class="conInfo">
					1、&nbsp;委托期内，未经承租方允许，甲方不得进出该房屋。否则，因此引起的法律责任概由甲方全部负责。
				</p>
				<p class="conInfo">
					2、&nbsp;本合同签订后，甲方因不能提供本合同约定的房屋而解除合同的，须支付乙方当年年租金总额20%的违约金。
				</p>
				<p class="conInfo">
					3、&nbsp;委托期内，甲方因出售该房或违反本合同相关约定提前收回房屋而导致合同终止的，甲方应按照本合同当年年租金总额的20%向乙方支付违约金，并退还乙方所余房租、房屋租赁保证金等，并且若支付的违约金不足弥补乙方损失的，甲方应承担损失赔偿责任。
				</p>
				<p class="conInfo">
					4、&nbsp;委托期满，甲方交接验收房屋后，甲方扣除未交的水电气费、物管费等，须在3个工作日内全额退还乙方剩余保证金。若甲方拒不退还保证金，乙方有权不交还房屋及钥匙或更换防盗门门锁直至甲方退还保证金为止，在此期间空置的租金由甲方承担。
				</p>
			</div>
			<div>
				<p class="conDigest_left">
					第九条  其它约定
				</p>
				<p class="conInfo">
					1、&nbsp;为保障承租方安全，乙方将统一更换防盗门门锁，乙方不另行通知甲方。
				</p>
				<p class="conInfo">
					2、&nbsp;委托期内，承租方正常使用家具家电等室内物品和装修，有自然老化和正常损耗。退房时，甲方不得要求乙方按委托接房时标准交房。
				</p>
				<p class="conInfo">
					3、&nbsp;委托期内，已使用过的非恶意人为损坏且无法维修好的物品，以发票日期和金额按每天万分之六折旧后现金赔偿给甲方，甲方不得要求乙方和承租方赔偿新物品。
				</p>
				<p class="conInfo">
					4、&nbsp;委托期内，甲方擅自提高租金的，该提高行为无效，乙方有权按照合同约定的标准支付租金。
				</p>
				<p class="conInfo">
					5、&nbsp;如因甲方和承租方原因导致合同解除或终止的,乙方不退还已收的甲方管理费。
				</p>
			</div>
			<div>
				<p class="conDigest_left">
					第十条  合同的解除、变更
				</p>
				<p class="conInfo">
					1、&nbsp;甲乙双方都有严格遵守和执行本合同相关约定的义务。
				</p>
				<p class="conInfo">
					2、&nbsp;因不可抗力导致本合同无法执行或或经双方同意的其它情况,本合同可解除,双方均不承担责任。
				</p>
				<p class="conInfo">
					3、&nbsp;本合同未尽事宜,经甲、乙双方协商一致,可订立补充条款。补充条款及附件均为本合同组成部分，与本合同具有同等法律力。
				</p>
				<p class="conInfo" id="pangu4" style="display: none;">
					4、&nbsp;无论本合同因何种原因解除或终止，甲方应将合同解除或终止时剩余委托期限对应的已支付的固定租金回报款项退回至如下账户：户名：<label class="textUnderLine">&nbsp;成都有家商业管理有限公司&nbsp;</label>，开户行：<label class="textUnderLine">&nbsp;招商银行顺城大街支行&nbsp;</label>，帐号：<label class="textUnderLine">&nbsp;128907831310101&nbsp;</label>。
				</p>
			</div>
			<div>
				<p class="conDigest_left">
					第十一条   争议解决:本合同项下发生的争议,由甲乙双方当事人协商；协商不成的,可向乙方所在地人民法院提起诉讼,诉讼费、律师费用等费用由败诉方承担。
				</p>
			</div>
			<div>
				<p class="conDigest_left" id="gjpYD">
					第十二条   本合同壹式贰份,甲乙双方各执壹份,具有同等法律效力,自双方签字（盖章）后生效。
				</p>
				<p class="conDigest_left" id="panguYD">
					第十二条   本合同壹式叁份,甲方执壹份,乙方执两份,具有同等法律效力,自双方签字（盖章）后生效。
				</p>
			</div>
			<div>
				<p class="conDigest_left">
					第十三条   甲、乙任一方联系地址和电话的变更均应在三日内书面通知对方。否则,由此造成的损失由过错方承担。
				</p>
			</div>
			<div>
				<p class="conDigest_left">
					第十四条   补充约定：
				</p>
				<p class="conDigest_left" style="text-indent: 2em;">
					${contractObject.contractObject_Other}
				</p>
			</div>
			<fieldset style="border-top: 1px dashed #000000;margin-top: 35px;">	<legend>(以下无正文)</legend>  </fieldset>
			<%--<div style="margin-top: 15px;">--%>
				<%--<div style="display:flex;">--%>
						<%--<label class="conDigest" style="display: flex;flex-direction: column-reverse;">甲方：</label>--%>
						<%--<div style="border-bottom: 1px solid #101010;width: 230px;">--%>
							<%--<input type="text" style="font-size:15px;" id="custmoerSign_TG1" readonly="readonly" name="lesserName" value="${contractVo.cc_name }">--%>
							<%--<img id="custmoerSign1" name="custmoerFDSign" style="background-color: transparent; display:none;" src="" width="140px" height="72px" >--%>
						<%--</div>--%>
						<%--<div style="width: 38%;"></div>--%>
						<%--<label class="conDigest" style="display: flex;flex-direction: column-reverse;">乙&nbsp;&nbsp;&nbsp;&nbsp;方：</label>--%>
						<%--<div style="border-bottom: 1px solid #101010;width: 230px;text-align: left;display: flex;flex-direction: column-reverse;">--%>
							 <%--重庆管家婆房地产经纪有限公司--%>
							<%--<img id="backgroudImg1" src="/resources/image/appPage/contractCachet3.png" style="width:227px; height:151px;position: absolute;left: 75%;z-index: 10;bottom: 8px;">--%>
						<%--</div>--%>
					<%--</div>--%>
					<%--<div style="display:flex;">--%>
						<%--<label class="conDigest">日期：</label>--%>
						<%--<div style="width: 230px;">--%>
							<%--<label class="textUnderLine" style="font-size: 15px;">&nbsp;&nbsp;${fillTimeArray[0] }&nbsp;&nbsp;</label>年<label class="textUnderLine" style="font-size: 15px;">&nbsp;&nbsp;&nbsp;&nbsp;${fillTimeArray[1] }&nbsp;&nbsp;&nbsp;&nbsp;</label>月<label class="textUnderLine" style="font-size: 15px;">&nbsp;&nbsp;&nbsp;&nbsp;${fillTimeArray[2] }&nbsp;&nbsp;&nbsp;&nbsp;</label>日--%>
						<%--</div>--%>
						<%--<div style="width: 38%;"></div>--%>
						<%--<label class="conDigest" style="padding-top: 6px;">签约代表：</label>--%>
						<%--<div style="border-bottom: 1px solid #101010;width: 230px;text-align: left;">--%>
							<%--${contractor.em_name }--%>
						<%--</div>--%>
					<%--</div>--%>
				<%--</div>		--%>
			<%--</div>--%>
			<table style="margin-top: 60px;">
				<tr style="height: 60px;">
					<td width="10%">甲方：</td>
					<td width="40%"><input type="text" style="font-size:15px;" id="custmoerSign_TG1" readonly="readonly" name="lesserName" value="${contractVo.cc_name }"><img id="custmoerSign1" name="custmoerFDSign" style="background-color: transparent; display:none;" src="" width="140px" height="72px" ></td>
					<td width="12%" style="text-align: right;">乙&nbsp;&nbsp;&nbsp;&nbsp;方：</td>
					<td width="38%"><img id="backgroudImg1" src="/resources/image/appPage/contractCachet3.png" style="width:227px; height:151px;position: absolute;left: 68%;z-index: 10;display: none;"><table><tr><td>重庆管家婆房地产经纪有限公司</td></tr><tr><td id="payYear2">${contractBody.contractBody_PayType }</td></tr></table></td>
				</tr>
				<tr style="height: 60px;">
					<td width="10%">日期：</td>
					<td width="40%"><label class="textUnderLine" style="font-size: 15px;">&nbsp;&nbsp;&nbsp;&nbsp;${fillTimeArray[0] }&nbsp;&nbsp;&nbsp;&nbsp;</label>年<label class="textUnderLine" style="font-size: 15px;">&nbsp;&nbsp;&nbsp;&nbsp;${fillTimeArray[1] }&nbsp;&nbsp;&nbsp;&nbsp;</label>月<label class="textUnderLine" style="font-size: 15px;">&nbsp;&nbsp;&nbsp;&nbsp;${fillTimeArray[2] }&nbsp;&nbsp;&nbsp;&nbsp;</label>日</td>
					<td width="12%" style="text-align: right;">签约代表：</td>
					<td width="38%">${contractor.em_name }</td>
				</tr>
				<tr style="height: 60px;" style="display: block;">
					<td width="10%">签署地：</td>
					<td width="90%" colspan="3">重庆</td>
				</tr>
			</table>
		</div>
	</div>
</body>
</html>