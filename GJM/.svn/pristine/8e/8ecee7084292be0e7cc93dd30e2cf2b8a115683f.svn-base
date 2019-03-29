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
<link href="/resources/css/manage_index.css" rel="stylesheet" type="text/css">
<link href="/resources/css/contractList/contract_v2.css" rel="stylesheet" type="text/css">
<link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href="/resources/common/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"><!-- 旧字体样式 -->

<script src="/resources/js/jquery-1.7.2.min.js" type="text/javascript"></script>
<script src="/resources/js/common/common.js"></script>
<script src="/resources/Plug-in/jquery.print/jquery.jqprint-0.3.js"></script>
<script src="/resources/js/contractList/contractZL_v2-1.js?v=<%=System.currentTimeMillis()%>"></script>

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
	$(".conTitle").css({"margin-left" : "145px"});
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
				<label class="rightFont">零中介费、租金月付，放心租、安心住！</label>
			</div>
			<div style="">
				<hr style="width:100%;height:1px;border:none;border-top:2px solid #555555; ">
			</div>
			<%--<div style="margin: 5px auto;display: flex;" id="wenxints">--%>
				<%--<div class="fontTx">--%>
					<%--<p>温馨提醒：</p>--%>
					<%--<p>1、房屋内不允许喂养猫狗等宠物，一经发现，我公司会立即终止本合同，并按客户违约处理。</p>--%>
					<%--<p>2、客户只能通过APP和我公司签订电子合同（可打印保存），合同其它签订方式无效（包括但不限于签纸质合同）。</p>--%>
					<%--<p>3、我公司已对本合同作出详细说明，客户确认签字之前已对本合同作详细阅读和充分理解。</p>--%>
					<%--<p>4、客户只能通过APP线上支付相关款项，我公司不允许工作人员线下收款。如客户把相关款项交给相关人员而导致利益受损的，我公司概不负责!</p>--%>
					<%--<p>5、为最大程度的保障客户利益和减少损失，我公司赠送20万保额家财险。如在委托期内,发生被盗、水淹、火灾、电器爆燃、坠落物品伤人等意外情况，请客户保护好现场并马上联系保险公司勘查现场（可委托我公司报案），具体赔偿事宜 由保险公司决定。我公司可协助客户办理保险理赔相关事项，不承担赔偿责任。</p>--%>
				<%--</div>--%>
				<%--<div style="border: 1px solid #555555;width: 18%;">--%>
					<%--<img src="/resources/image/appPage/gjp_wechat.png" style="" width="150px" height="160px"></img>--%>
				<%--</div>--%>
			<%--</div>--%>
			<div style="margin-top: 10px;">
				<label class="conTitle">房屋租赁合同</label><label id="tgPrintTime" style="position: relative;font-size: 15px;float : right;"></label>
			</div>
			<div>
				<label class="conNo">合同编号：${contractObject.contractObject_No }</label>
			</div>
			<div>
				<table>
					<tbody align="center">
						<tr width="100%">
							<td width="13%"><label class="conDigest">出租方(甲方):</label></td>
							<td width="22%" class="tdLine">&nbsp;${contractVo.cc_name }</td>
							<td width="3%">
							<td width="13%"><label class="conDigest">承租方(乙方):</label></td>
							<td width="22%" class="tdLine">&nbsp;${customerInfo.cc_name }</td>
							<td width="12%" style="text-align:right;"><label class="conDigest">QQ或微信:</label></td>
							<td width="22%" class="tdLine">&nbsp;${customerInfo.cc_qq }</td>
						</tr>
						<tr width="100%">
							<td width="12%"><label class="conDigest">身份证号码:</label></td>
							<td width="22%" class="tdLine">&nbsp;${contractVo.cc_cardNum }</td>
							<td width="3%">
							<td width="12%"><label class="conDigest">身份证号码:</label></td>
							<td width="22%" class="tdLine">&nbsp;${customerInfo.cc_cardNum }</td>
							<td width="12%" style="text-align:right;"><label class="conDigest">工作单位:</label></td>
							<td width="22%" class="tdLine">&nbsp;${customerInfo.cc_work }</td>
						</tr>
						<tr width="100%">
							<td width="12%"><label class="conDigest">联系电话:</label></td>
							<td width="22%" class="tdLine">&nbsp;88067511</td>
							<td width="3%">
							<td width="12%"><label class="conDigest">联系电话:</label></td>
							<td width="22%" class="tdLine">&nbsp;${customerInfo.ccp_phone }</td>
							<td width="12%" style="text-align:right;"><label class="conDigest">单位电话:</label></td>
							<td width="22%" class="tdLine">&nbsp;${customerInfo.company_tel }</td>
						</tr>
						<tr width="100%">
							<td width="12%"><label class="conDigest">丙方:</label></td>
							<td width="22%" style="text-align: left;"><label style="font-size:14px; font-family:'黑体 font-weight:bold;padding-left:5px;">&nbsp;重庆管家婆房地产经纪有限公司</label></td>
							<td width="3%">
							<td width="12%"><label class="conDigest">营业执照号:</label></td>
							<td width="22%" style="text-align: left;"><label style="font-size:14px; font-family:'黑体 font-weight:normal;padding-left:5px;">&nbsp;915001085540918999</label></td>
						</tr>
						<tr width="100%">
							<td width="12%"><label class="conDigest">签约代表:</label></td>
							<td width="22%" class="tdLine">&nbsp;${contractor.em_name }</td>
							<td width="3%">
							<td width="12%"><label class="conDigest">联系电话:</label></td>
							<td width="22%" class="tdLine">&nbsp;${contractor.em_phone }</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div>
				<p class="conInfo" style="text-indent: 2em;">
					根据《中华人民共和国合同法》及相关法律法规的规定,甲、乙、丙叁方在平等自愿的基础上,就甲方将房屋出租给乙方、甲方全权委托丙方经营管理出租房屋事宜,为明确叁方权利责任,经协商一致,订立本合同。
				</p>
			</div>
			<div>
				<p class="conDigest_left">
					第一条&nbsp;&nbsp;房屋概述
				</p>
				<p class="conInfo">
					1、&nbsp;房屋地址<label class="textUnderLine">&nbsp;${houseInfo.he_address }&nbsp;</label>，建筑面积<label class="textUnderLine" id="template6">&nbsp;${houseInfo.hi_measure }&nbsp;</label>平米，户型是<label class="textUnderLine" id="template1">&nbsp;${houseInfo.hi_houseS }&nbsp;</label>室<label class="textUnderLine" id="template2">&nbsp;${houseInfo.hi_houseT }&nbsp;</label>厅<label class="textUnderLine" id="template3">&nbsp;${houseInfo.hi_houseW }&nbsp;</label>卫。
				</p>
				<p class="conInfo">
					2、&nbsp;该房屋现有家具家电等设施设备情况详见合同附件。
				</p>
			</div>
			<div>
				<p class="conDigest_left">
					第二条&nbsp;&nbsp;房屋用途：<label class="textUnderLine" id="template4">&nbsp;${contractBody.contractBody_Use } &nbsp;</label>，居住<label class="textUnderLine" id="template5">&nbsp;${contractObject.contractObject_PeopleNumber }&nbsp;</label>人。除三方另有约定外，乙方不得擅自改变房屋用途。
				</p>
			</div>
			<div>
				<p class="conDigest_left">
					第三条&nbsp;&nbsp;租期、租金、保证金、服务费等
				</p>
				<p class="conInfo"><input type="hidden" value="${ymd_year}" id="ymd_year"><input type="hidden" value="${ymd_month}" id="ymd_month"><input type="hidden" value="${ymd_day}" id="ymd_day">
					1、&nbsp;租期：<label class="textUnderLine" id="template7">&nbsp;${startDateArray[0] }&nbsp;</label>年<label class="textUnderLine" id="template8">&nbsp;${startDateArray[1] }&nbsp;</label>月<label class="textUnderLine" id="template9">&nbsp;${startDateArray[2] }&nbsp;</label>日起至<label class="textUnderLine" id="template10">&nbsp;${endDateArray[0] }&nbsp;</label>年<label class="textUnderLine" id="template11">&nbsp;${endDateArray[1] }&nbsp;</label>月<label class="textUnderLine" id="template12">&nbsp;${endDateArray[2] }&nbsp;</label>日止(<label id="ymdLabel" style="font-weight: bold;"></label>)。
				</p>
				<p class="conInfo"><input type="hidden" value="${contractObject.contractObject_Date }" id="data_4"><input type="hidden" value="${contractObject.contractObject_DeadlineTime }" id="data_5">
					2、&nbsp;租金（丙方代收）：<label class="textUnderLine" id="template13">&nbsp; ${payStyle } &nbsp;</label>付，<label class="textUnderLine" id="data_1">&nbsp;${contractBody.contractBody_Rent }&nbsp;</label>元/月（大写：<label class="textUnderLine" id="data_2">&nbsp;&nbsp;</label>整）。
				</p>
				<p class="conInfo" style="text-indent:2em;">
					总租金： <label class="textUnderLine" id="data_10">&nbsp;&nbsp;</label>元（大写：<label class="textUnderLine" id="data_3">&nbsp;&nbsp;</label>整）。符合条件的乙方可申请与丙方合作的第三方分期月付服务，乙方依据分期协议进行月付还款。如乙方未通过第三方审核，支付方式自动转为季付。
				</p>
				<p class="conInfo">
					3、&nbsp;乙方租金支付日：
				</p>
				<p class="conInfo" style="text-indent:2em;">
					从第2次支付日开始，月付须提前7天、季付和半年付须提前15天支付下次应付租金，乙方支付租金等款项具体约定时间见下表。如乙方逾期支付租金，每天须按月租金1%支付滞纳金给丙方。如乙方逾期超过5天，丙方有权单方面解除并终止本合同， 乙方承担相应违约责任。
				</p>
				<div style="text-indent: 2em;" id="zhangdan">
					<%--<p class="conInfo">--%>
						<%--<span>第01次：<label class="textUnderLine">&nbsp;${billContractList[0].repaymentDateArr[0] }&nbsp;</label>年<label class="textUnderLine">&nbsp;${billContractList[0].repaymentDateArr[1] }&nbsp;</label>月<label class="textUnderLine">&nbsp;${billContractList[0].repaymentDateArr[2] }&nbsp;</label>日&nbsp;&nbsp;</span>--%>
						<%--<span>第02次：<label class="textUnderLine">&nbsp;${billContractList[1].repaymentDateArr[0] }&nbsp;</label>年<label class="textUnderLine">&nbsp;${billContractList[1].repaymentDateArr[1] }&nbsp;</label>月<label class="textUnderLine">&nbsp;${billContractList[1].repaymentDateArr[2] }&nbsp;</label>日&nbsp;&nbsp;</span>--%>
						<%--<span>第03次：<label class="textUnderLine">&nbsp;${billContractList[2].repaymentDateArr[0] }&nbsp;</label>年<label class="textUnderLine">&nbsp;${billContractList[2].repaymentDateArr[1] }&nbsp;</label>月<label class="textUnderLine">&nbsp;${billContractList[2].repaymentDateArr[2] }&nbsp;</label>日&nbsp;&nbsp;</span>--%>
					<%--</p>                                                                                                                                                                                                                                                                             --%>
					<%--<p class="conInfo">                                                                                                                                                                                                                                                              --%>
						<%--<span>第04次：<label class="textUnderLine">&nbsp;${billContractList[3].repaymentDateArr[0] }&nbsp;</label>年<label class="textUnderLine">&nbsp;${billContractList[3].repaymentDateArr[1] }&nbsp;</label>月<label class="textUnderLine">&nbsp;${billContractList[3].repaymentDateArr[2] }&nbsp;</label>日&nbsp;&nbsp;</span>--%>
						<%--<span>第05次：<label class="textUnderLine">&nbsp;${billContractList[4].repaymentDateArr[0] }&nbsp;</label>年<label class="textUnderLine">&nbsp;${billContractList[4].repaymentDateArr[1] }&nbsp;</label>月<label class="textUnderLine">&nbsp;${billContractList[4].repaymentDateArr[2] }&nbsp;</label>日&nbsp;&nbsp;</span>--%>
						<%--<span>第06次：<label class="textUnderLine">&nbsp;${billContractList[5].repaymentDateArr[0] }&nbsp;</label>年<label class="textUnderLine">&nbsp;${billContractList[5].repaymentDateArr[1] }&nbsp;</label>月<label class="textUnderLine">&nbsp;${billContractList[5].repaymentDateArr[2] }&nbsp;</label>日&nbsp;&nbsp;</span>--%>
					<%--</p>                                                                                                                                                                                                                                                                             --%>
					<%--<p class="conInfo">                                                                                                                                                                                                                                                              --%>
						<%--<span>第07次：<label class="textUnderLine">&nbsp;${billContractList[6].repaymentDateArr[0] }&nbsp;</label>年<label class="textUnderLine">&nbsp;${billContractList[6].repaymentDateArr[1] }&nbsp;</label>月<label class="textUnderLine">&nbsp;${billContractList[6].repaymentDateArr[2] }&nbsp;</label>日&nbsp;&nbsp;</span>--%>
						<%--<span>第08次：<label class="textUnderLine">&nbsp;${billContractList[7].repaymentDateArr[0] }&nbsp;</label>年<label class="textUnderLine">&nbsp;${billContractList[7].repaymentDateArr[1] }&nbsp;</label>月<label class="textUnderLine">&nbsp;${billContractList[7].repaymentDateArr[2] }&nbsp;</label>日&nbsp;&nbsp;</span>--%>
						<%--<span>第09次：<label class="textUnderLine">&nbsp;${billContractList[8].repaymentDateArr[0] }&nbsp;</label>年<label class="textUnderLine">&nbsp;${billContractList[8].repaymentDateArr[1] }&nbsp;</label>月<label class="textUnderLine">&nbsp;${billContractList[8].repaymentDateArr[2] }&nbsp;</label>日&nbsp;&nbsp;</span>--%>
					<%--</p>                                                                                                                                                                                                                                                                             --%>
					<%--<p class="conInfo">                                                                                                                                                                                                                                                              --%>
						<%--<span>第10次：<label class="textUnderLine">&nbsp;${billContractList[9].repaymentDateArr[0] }&nbsp;</label>年<label class="textUnderLine">&nbsp;${billContractList[9].repaymentDateArr[1] }&nbsp;</label>月<label class="textUnderLine">&nbsp;${billContractList[9].repaymentDateArr[2] }&nbsp;</label>日&nbsp;&nbsp;</span>--%>
						<%--<span>第11次：<label class="textUnderLine">&nbsp;${billContractList[10].repaymentDateArr[0] }&nbsp;</label>年<label class="textUnderLine">&nbsp;${billContractList[10].repaymentDateArr[1] }&nbsp;</label>月<label class="textUnderLine">&nbsp;${billContractList[10].repaymentDateArr[2] }&nbsp;</label>日&nbsp;&nbsp;</span>--%>
						<%--<span>第12次：<label class="textUnderLine">&nbsp;${billContractList[11].repaymentDateArr[0] }&nbsp;</label>年<label class="textUnderLine">&nbsp;${billContractList[11].repaymentDateArr[1] }&nbsp;</label>月<label class="textUnderLine">&nbsp;${billContractList[11].repaymentDateArr[2] }&nbsp;</label>日&nbsp;&nbsp;</span>--%>
					<%--</p>--%>
					<%--<p class="conInfo">--%>
						<%--<span>第13次：<label class="textUnderLine">&nbsp;${billContractList[12].repaymentDateArr[0] }&nbsp;</label>年<label class="textUnderLine">&nbsp;${billContractList[12].repaymentDateArr[1] }&nbsp;</label>月<label class="textUnderLine">&nbsp;${billContractList[12].repaymentDateArr[2] }&nbsp;</label>日&nbsp;&nbsp;</span>--%>
						<%--<span>第14次：<label class="textUnderLine">&nbsp;${billContractList[13].repaymentDateArr[0] }&nbsp;</label>年<label class="textUnderLine">&nbsp;${billContractList[13].repaymentDateArr[1] }&nbsp;</label>月<label class="textUnderLine">&nbsp;${billContractList[13].repaymentDateArr[2] }&nbsp;</label>日&nbsp;&nbsp;</span>--%>
						<%--<span>第15次：<label class="textUnderLine">&nbsp;${billContractList[14].repaymentDateArr[0] }&nbsp;</label>年<label class="textUnderLine">&nbsp;${billContractList[14].repaymentDateArr[1] }&nbsp;</label>月<label class="textUnderLine">&nbsp;${billContractList[14].repaymentDateArr[2] }&nbsp;</label>日&nbsp;&nbsp;</span>--%>
					<%--</p>--%>
					<%--<p class="conInfo">--%>
						<%--<span>第16次：<label class="textUnderLine">&nbsp;${billContractList[15].repaymentDateArr[0] }&nbsp;</label>年<label class="textUnderLine">&nbsp;${billContractList[15].repaymentDateArr[1] }&nbsp;</label>月<label class="textUnderLine">&nbsp;${billContractList[15].repaymentDateArr[2] }&nbsp;</label>日&nbsp;&nbsp;</span>--%>
						<%--<span>第17次：<label class="textUnderLine">&nbsp;${billContractList[16].repaymentDateArr[0] }&nbsp;</label>年<label class="textUnderLine">&nbsp;${billContractList[16].repaymentDateArr[1] }&nbsp;</label>月<label class="textUnderLine">&nbsp;${billContractList[16].repaymentDateArr[2] }&nbsp;</label>日&nbsp;&nbsp;</span>--%>
						<%--<span>第18次：<label class="textUnderLine">&nbsp;${billContractList[17].repaymentDateArr[0] }&nbsp;</label>年<label class="textUnderLine">&nbsp;${billContractList[17].repaymentDateArr[1] }&nbsp;</label>月<label class="textUnderLine">&nbsp;${billContractList[17].repaymentDateArr[2] }&nbsp;</label>日&nbsp;&nbsp;</span>--%>
					<%--</p>--%>
					<%--<p class="conInfo">--%>
						<%--<span>第19次：<label class="textUnderLine">&nbsp;${billContractList[18].repaymentDateArr[0] }&nbsp;</label>年<label class="textUnderLine">&nbsp;${billContractList[18].repaymentDateArr[1] }&nbsp;</label>月<label class="textUnderLine">&nbsp;${billContractList[18].repaymentDateArr[2] }&nbsp;</label>日&nbsp;&nbsp;</span>--%>
						<%--<span>第20次：<label class="textUnderLine">&nbsp;${billContractList[19].repaymentDateArr[0] }&nbsp;</label>年<label class="textUnderLine">&nbsp;${billContractList[19].repaymentDateArr[1] }&nbsp;</label>月<label class="textUnderLine">&nbsp;${billContractList[19].repaymentDateArr[2] }&nbsp;</label>日&nbsp;&nbsp;</span>--%>
						<%--<span>第21次：<label class="textUnderLine">&nbsp;${billContractList[20].repaymentDateArr[0] }&nbsp;</label>年<label class="textUnderLine">&nbsp;${billContractList[20].repaymentDateArr[1] }&nbsp;</label>月<label class="textUnderLine">&nbsp;${billContractList[20].repaymentDateArr[2] }&nbsp;</label>日&nbsp;&nbsp;</span>--%>
					<%--</p>--%>
					<%--<p class="conInfo">--%>
						<%--<span>第22次：<label class="textUnderLine">&nbsp;${billContractList[21].repaymentDateArr[0] }&nbsp;</label>年<label class="textUnderLine">&nbsp;${billContractList[21].repaymentDateArr[1] }&nbsp;</label>月<label class="textUnderLine">&nbsp;${billContractList[21].repaymentDateArr[2] }&nbsp;</label>日&nbsp;&nbsp;</span>--%>
						<%--<span>第23次：<label class="textUnderLine">&nbsp;${billContractList[22].repaymentDateArr[0] }&nbsp;</label>年<label class="textUnderLine">&nbsp;${billContractList[22].repaymentDateArr[1] }&nbsp;</label>月<label class="textUnderLine">&nbsp;${billContractList[22].repaymentDateArr[2] }&nbsp;</label>日&nbsp;&nbsp;</span>--%>
						<%--<span>第24次：<label class="textUnderLine">&nbsp;${billContractList[23].repaymentDateArr[0] }&nbsp;</label>年<label class="textUnderLine">&nbsp;${billContractList[23].repaymentDateArr[1] }&nbsp;</label>月<label class="textUnderLine">&nbsp;${billContractList[23].repaymentDateArr[2] }&nbsp;</label>日&nbsp;&nbsp;</span>--%>
					<%--</p>--%>
				</div>
				<p class="conInfo">
					4、&nbsp;乙方保证金：<label class="textUnderLine" id="data_6">&nbsp;${contractBody.contractBody_Pay }&nbsp;</label>元（大写：<label class="textUnderLine" id="data_7">&nbsp;&nbsp;</label>整），签订合同时丙方一次性收取。
				</p>
				<p class="conInfo">
					5、&nbsp;服务费： 
				</p>
				<p class="conInfo" style="text-indent:2em;" >
					<i class="fa fa-square-o" style="margin-right: 10px;margin-left: -28px;" id="fuwu1"></i>服务费套餐：<input type="hidden" value="${contractBody.contractBody_Service }" id="serviceM"><label class="textUnderLine" id="data_8">&nbsp;${contractBody.contractBody_Service }&nbsp;</label>元（大写：<label class="textUnderLine" id="data_9">&nbsp;&nbsp;</label>整），包含300元维修费用(详见维修条款)。合同期间，丙方为乙方提供的相关服务（包括但不限于清洁、维修、办理分期月付、借款担保等）支付的服务费，签订合同时丙方按年度一次性收取。如乙方中途转租或退房，丙方不退还该费用。
				</p>
				<p class="conInfo" style="text-indent:2em;">
					<i class="fa fa-square-o" style="margin-right: 10px;margin-left: -28px;" id="fuwu2"></i>乙方自己负责合同内的房屋清洁和维修等并承担全部费用，丙方可按次数提供有偿服务。
				</p>
				<p class="conInfo">
					6、&nbsp;代收租金： 丙方扣除相关费用后，再转交给甲方。丙方代甲方向乙方收取租金。
				</p>
				<p class="conInfo">
					7、&nbsp;税费：房屋租赁税、房产税及政府规定的出租房屋征收的其他税费等由乙方承担，甲方和丙方协助办理。
				</p>
				<p class="conInfo">
					8、&nbsp;乙方须按时交纳自行承担的费用,不拖欠如水电气费、物管费、清洁费、电话费、宽带费、有线电视费等。
				</p>
			</div>
			<div>
				<p class="conDigest_left">
					第四条  乙方保证
				</p>
				<p class="conInfo">
					1、&nbsp;合同期内，乙方保证出租房屋的使用安全（包括但不限于防火、防盗、防漏水、防坠落及高空坠物等相关财产和人身安全）。如发生被盗、火灾、水淹、坠落、高空坠物等相关安全或人身事故,由此引起的法律责任、损失和赔偿等全部由乙方承担。
				</p>
				<p class="conInfo">
					2、&nbsp;合同期内，乙方保证房屋清洁干净、爱护家具家电和装修等，保证墙面干净整洁（尤其避免小孩涂画），保证不在房屋内喂养猫狗等宠物，并保证搞好邻里关系，没有邻居或物业相关投诉。
				</p>
				<p class="conInfo">
					3、&nbsp;合同期内，乙方保证在租赁房屋使用过程中的行为符合有关法律、法规及规章的规定，不做违法事情。
				</p>
				<p class="conInfo">
					4、&nbsp;合同期内，乙方保证不改变房屋的内部结构、装修等，不设置对房屋结构有影响的设备。
				</p>
			</div>
			<div>
				<p class="conDigest_left">
					第五条  丙方责任义务
				</p>
				<p class="conInfo">
					1、&nbsp;合同期内，甲方全权委托丙方经营管理出租房屋，办理相关手续等(包括但不限于签订租赁合同和代催收租金等）。
				</p>
				<p class="conInfo">
					2、&nbsp;合同期内，如因乙方原因导致甲方租金收益受损的（包括拖欠租金、水电气费、物管费等），丙方承担连带责任。丙方在向甲方承担相关责任后，有权向乙方追偿。
				</p>
			</div>
			<div>
				<p class="conDigest_left">
					第六条  维修
				</p>
				<p class="conInfo">
					1、&nbsp;合同期内，如有维修，乙方可通过手机APP、微信、网站或023-88067511转3报修。
				</p>
				<p class="conInfo">
					2、&nbsp;合同期内，乙方入住1月内的维修(乙方人为损坏除外)，费用全部由甲方承担。
				</p>
				<p class="conInfo">
					3、&nbsp;合同期内，乙方入住1月后的维修费用：
				</p>
				<p class="conInfo" style="text-indent:2em;">
					①如乙方选择的是丙方套餐服务，则丙方负责300元以内的维修费用(包括电器、综合维修的人工和材料费用，不包括人为损坏、换锁、地面、墙面维修和疏通下水道费用)，超过300元的维修费用由乙丙双方各承担50%。
				</p>
				<p class="conInfo" style="text-indent:2em;">
					②如乙方自己负责合同期内的房屋清洁和维修等，全部费用由乙方承担，丙方可按次数提供有偿服务。
				</p>
				<p class="conInfo">
					4、&nbsp;该乙方负责维修责任,丙方在通知乙方2天内,如乙方还是不维修好的,丙方有权代为维修,维修费用等由乙方全部承担。
				</p>
				<p class="conInfo">
					5、&nbsp;租赁期内,因房屋自然老化、外墙渗水、沉降、给排水管、强弱电路、防水等隐蔽工程或其它装修问题导致房屋内和楼下墙面、木地板、地砖、墙砖、门窗发生裂缝、起泡、变形、起层、发霉、破裂情况,乙方不承担维修和赔偿责任。但如有明显撞痕、火烧、水淹、污染的,则由乙方全部承担维修和赔偿责任。
				</p>
			</div>
			<div>
				<p class="conDigest_left">
					第七条  清洁
				</p>
				<p class="conInfo">
					1、&nbsp;合同期内或期满，乙方退房给丙方时，须保证房屋清洁干净。
				</p>
				<p class="conInfo">
					2、&nbsp;清洁标准：家具家电表面、抽屉及橱柜内无明显灰尘，地面干净无灰尘痕迹，灶具及抽油烟机无明显油烟污渍，卫生间洁具明显污垢等。
				</p>
			</div>
			<div>
				<p class="conDigest_left">
					第八条  转租
				</p>
				<p class="conInfo">
					1、&nbsp;乙方如需转租承租房屋，必须先和丙方签订《房屋转租协议》后才可以转租。否则，按乙方违约处理，甲方不退还乙方保证金和剩余租金等款项。
				</p>
				<p class="conInfo" style="text-indent:2em;">
					①合同期内的1、2和12月份，只能由乙方自行招租，丙方认同新承租人后，负责新承租人合同变更等手续，乙方须支付丙方300元合同变更服务费。
				</p>
				<p class="conInfo" style="text-indent:2em;">
					②合同期内的3-11月份，乙方可自行招租或委托丙方招租。如乙方找到新承租人后，乙方须支付丙方300元合同变更服务费。如委托丙方找到新承租人后，乙方须支付丙方50%月租金作为转租服务费。
				</p>
				<p class="conInfo" style="text-indent:2em;">
					③在未成功转租前,乙方必须按本合同约定时间按时全额交纳租金等费用。否则,乙方承担相应违约责任,丙方不退还乙方保证金，并可强制收回该房屋。
				</p>
				<p class="conInfo">
					2、&nbsp;新承租人继承乙方原有责任、权利和义务。为保障新承租人利益，须新承租人入住确认无人为损坏问题后，丙方第15天与乙方办理费用结算手续，扣除相关费用后，退还乙方剩余房租和保证金等。
				</p>
				<p class="conInfo">
					3、&nbsp;合同期内，如乙方隐瞒丙方或未经过丙方书面同意，擅自转租承租房屋。乙方的擅自转租无效，丙方有权立即终止合同，丙方不承认新承租人的合法性，丙方有权要求新承租人立即搬出房屋，且丙方有权收回该房屋和处置房屋内遗留物品，并不退还乙方保证金和剩余房租，乙方须承担相应违约责任，因此引起的法律责任全部由乙方承担。
				</p>
			</div>
			<div>
				<p class="conDigest_left">
					第九条  退房
				</p>
				<p class="conInfo">
					1、&nbsp;合同期内的退房:
				</p>
				<p class="conInfo" style="text-indent:2em;">
					①合同期内的1、2和12月份，丙方不允许乙方退房。否则，按乙方违约处理，丙方不退还乙方保证金和剩余租金等款项。
				</p>
				<p class="conInfo" style="text-indent:2em;">
					②合同期内的3-11月份,丙方验收房屋内装修\家具家电等无人为损坏,同意乙方办理退房手续,扣除乙方1个月租金和相关费用后，第15天退还乙方剩余款项。
				</p>
				<p class="conInfo" style="text-indent:2em;">
					③合同期内,如丙方不同意乙方退房,乙方不得擅自退房。否则,乙方承担相应违约责任，丙方有权立即终止合同。
				</p>
				<p class="conInfo">
					2、&nbsp;合同期满的退房：
				</p>
				<p class="conInfo" style="text-indent:2em;">
					①合同期满，乙方应及时交还房屋给丙方。如逾期交还，每天须按本合同日租金的1.5倍支付逾期天数租金直到交还房屋为止。
				</p>
				<p class="conInfo" style="text-indent:2em;">
					②合同期满退房，丙方验收房屋内装修、家具家电等无人为损坏，丙方与乙方办理结算手续，扣除相关费用后，第15天退还乙方剩余款项。
				</p>
				<p class="conInfo" style="text-indent:2em;">
					③乙方交还房屋时,应当保持房屋装修、家具家电等设施设备的完好状态，清洁合格，不得留存物品或影响房屋的正常使用。对未经同意留存的物品,丙方在告知乙方2天之内,乙方仍未取走的,丙方有权处置遗留物品,由此造成的损失由乙方自行承担。
				</p>
			</div>
			<div>
				<p class="conDigest_left">
					第十条  续租
				</p>
				<p class="conInfo">
					1、&nbsp;合同期满前1个月,乙方须书面通知丙方是否续租。在同等条件下,乙方享有优先承租权。如需续租,应重新签订《房屋租赁合同》。
				</p>
				<p class="conInfo">
					2、&nbsp;合同期满前，如乙方不续租，丙方享有提前7天招租的权利，乙方不得以任何理由推脱或阻拦丙方带客户看房。否则，乙方承担相应违约责任。
				</p>
			</div>
			<div>
				<p class="conDigest_left">
					第十一条  乙方违约责任
				</p>
				<p class="conInfo" style="text-indent:2em;">
					合同期内，乙方有下列行为之一的，丙方有权单方面解除并终止合同，采取断水、断电、开门、封门、换锁等方式强制收回该房屋，丙方有权对乙方室内物品进行处置，并不再退还乙方所余房租和保证金等费用，乙方还应按照本合同租金总额的30%向丙方支付违约金。若支付的违约金不足弥补丙方损失的，乙方还应负责赔偿丙方的损失直至达到弥补全部损失为止。
				</p>
				<p class="conInfo" style="text-indent:2em;">
					1、&nbsp;逾期未交房租，经丙方催告后，5天内仍不交纳租金的。
				</p>
				<p class="conInfo" style="text-indent:2em;">
					2、&nbsp;拖欠各项费用总额达1000元及以上(包括租金、宽带费、有线费、水电气费、物管费、服务费等)。
				</p>
				<p class="conInfo" style="text-indent:2em;">
					3、&nbsp;因乙方原因导致第三方分期月付逾期，经第三方或丙方催告后，仍不交纳租金的。乙方承担第三方相应违约金、滞纳金和违约责任。
				</p>
				<p class="conInfo" style="text-indent:2em;">
					4、&nbsp;未经丙方书面同意或隐瞒丙方，擅自退房、擅自转租、擅自拆改变动房屋结构、擅自装修或擅自改变房屋租赁用途。
				</p>
				<p class="conInfo" style="text-indent:2em;">
					5、&nbsp;利用承租房屋进行违法活动或存放危险物品。
				</p>
				<p class="conInfo" style="text-indent:2em;">
					6、&nbsp;邻居或物业累计投诉3次及以上。
				</p>
				<p class="conInfo" style="text-indent:2em;">
					7、&nbsp;不依据本合同承担维修责任或支付维修费用，致使房屋装修或家具家电等设施设备严重损坏的，或在丙方提出的合理期限内仍未修复的。
				</p>
			</div>
			<div>
				<p class="conDigest_left">
					第十二条   合同的变更、解除与终止
				</p>
				<p class="conInfo" style="text-indent:2em;">
					1、&nbsp;甲、乙、丙叁方可以协商变更、解除或终止本合同。合同期满合同自然终止。
				</p>
				<p class="conInfo" style="text-indent:2em;">
					2、&nbsp;因不可抗力或因国家政策需要拆除或改造等原因导致房屋、房屋装修及室内财产受损的,合同终止,甲乙丙叁方互不承担责任。
				</p>
				<p class="conInfo" style="text-indent:2em;">
					3、&nbsp;如因甲、乙双方原因导致合同解除或终止的，丙方不退还已收的甲方管理费和乙方服务费。
				</p>
			</div>
			<div>
				<p class="conDigest_left">
					第十三条  本合同未尽事宜,甲、乙、丙叁方可协商一致订立补充条款。补充条款及附件均为本合同组成部分,具有同等法律效力。
				</p>
			</div>
			<div>
				<p class="conDigest_left">
					第十四条   争议纠纷解决：本合同项下发生的争议,由甲乙丙叁方协商或申请调解；协商或调解解决不成的,可向丙方所在地人民法院提起诉讼,由败诉方承担诉讼费、律师费等相关费用。
				</p>
			</div>
			<div>
				<p class="conDigest_left">
					第十五条   本合同壹式叁份,甲乙丙叁方各执壹份,具有同等法律效力。丙方可代甲方签字生效,本合同自叁方签字（盖章）后生效。
				</p>
			</div>
			<div>
				<p class="conDigest_left">
					第十六条   甲方、乙方任一方联系地址和电话的变更均应在三日内书面通知丙方,否则由此造成的损失由过错方承担。
				</p>
			</div>
			<div>
				<p class="conDigest_left">
					第十七条   其它约定：
				</p>
				<p class="conDigest_left" style="text-indent: 2em;">
					${contractObject.contractObject_Other}
				</p>
				<p class="conInfo" style="text-indent:2em;">
					附件：1、《授权委托书》 2、《物业交接单》
				</p>
			</div>
			<fieldset style="border-top: 1px dashed #000000;margin-top: 35px;">	<legend>(以下无正文)</legend>  </fieldset>
			<%--<div style="margin-top: 15px;">--%>
				<%--<div style="display:flex;">--%>
					<%--<label class="conDigest" style="display: flex;flex-direction: column-reverse;">甲方：</label>--%>
					<%--<div style="border-bottom: 1px solid #101010;width: 24%;">--%>
						<%--<input type="text" style="font-size:15px; position: relative; top: 80%;" id="custmoerSignFD" readonly="readonly" name="custmoerSign_TG" value="${contractVo.cc_name }">--%>
						<%--<img name="custmoerFDSign" style="background-color: transparent; display:none;" src="" width="140px" height="72px" >--%>
					<%--</div>--%>
					<%--&lt;%&ndash;<div style="width: 36%;"></div>&ndash;%&gt;--%>
					<%--<label class="conDigest" style="display: flex;flex-direction: column-reverse;">乙方(签字手印)：</label>--%>
					<%--<div style="border-bottom: 1px solid #101010;width: 22%;">--%>
						<%--<input type="text" style="font-size:15px; position: relative; top: 80%;" id="custmoerSignZK" readonly="readonly" name="custmoerSign_ZL" value="${customerInfo.cc_name }">--%>
						<%--<img name="custmoerZKSign" style="background-color: transparent; display:none;" src="" width="140px" height="72px" >--%>
					<%--</div>--%>
				<%--</div>--%>
				<%--<div style="display:flex;">--%>
					<%--<label class="conDigest" style="padding-top: 6px;">丙方：</label>--%>
					<%--<div style="border-bottom: 1px solid #101010;width: 230px;">--%>
						<%--重庆管家婆房地产经纪有限公司--%>
						<%--&lt;%&ndash;<img id="backgroudImg1" src="/resources/image/appPage/contractCachet3.png" style="width:227px; height:151px;position: absolute;left: 10%;z-index: 10;bottom: 8px;">&ndash;%&gt;--%>
					<%--</div>--%>
					<%--&lt;%&ndash;<div style="width: 36%;"></div>&ndash;%&gt;--%>
					<%--<label class="conDigest">日     期：</label>--%>
					<%--<div style="">--%>
						<%--<label class="conDigest" style="">--%>
							<%--<label class="textUnderLine" style="font-size: 15px;">&nbsp;&nbsp;${fillTimeArray[0] }&nbsp;&nbsp;</label>年<label class="textUnderLine" style="font-size: 15px;">&nbsp;&nbsp;&nbsp;&nbsp;${fillTimeArray[1] }&nbsp;&nbsp;&nbsp;&nbsp;</label>月<label class="textUnderLine" style="font-size: 15px;">&nbsp;&nbsp;&nbsp;&nbsp;${fillTimeArray[2] }&nbsp;&nbsp;&nbsp;&nbsp;</label>日--%>
						<%--</label>--%>
					<%--</div>--%>
				<%--</div>--%>
			<%--</div>--%>
			<table style="margin-top: 60px;">
				<tr style="height: 60px;">
					<td width="10%">甲方：</td>
					<td width="40%"><input type="text" style="font-size:15px; position: relative; top: 80%;" id="custmoerSignFD" readonly="readonly" name="custmoerSign_TG" value="${contractVo.cc_name }"><img name="custmoerFDSign" style="background-color: transparent; display:none;" src="" width="140px" height="72px" ></td>
					<td width="12%">乙方(签字)：</td>
					<td width="45%"><input type="text" style="font-size:15px; position: relative; top: 80%;" id="custmoerSignZK" readonly="readonly" name="custmoerSign_ZL" value="${customerInfo.cc_name }"><img name="custmoerZKSign" style="background-color: transparent; display:none;" src="" width="140px" height="72px" ></td>
				</tr>
				<tr style="height: 60px;">
					<td width="10%">丙方：</td>
					<td width="40%">重庆管家婆房地产经纪有限公司<img id="backgroudImg1" src="/resources/image/appPage/contractCachet3.png" style="width:227px; height:151px;position: absolute;left: 10%;z-index: 10;display: none;"></td>
					<td width="12%">日     期：</td>
					<td width="45%"><label class="textUnderLine" style="font-size: 15px;">&nbsp;&nbsp;&nbsp;&nbsp;${fillTimeArray[0] }&nbsp;&nbsp;&nbsp;&nbsp;</label>年<label class="textUnderLine" style="font-size: 15px;">&nbsp;&nbsp;&nbsp;&nbsp;${fillTimeArray[1] }&nbsp;&nbsp;&nbsp;&nbsp;</label>月<label class="textUnderLine" style="font-size: 15px;">&nbsp;&nbsp;&nbsp;&nbsp;${fillTimeArray[2] }&nbsp;&nbsp;&nbsp;&nbsp;</label>日</td>
				</tr>
				<tr style="height: 60px;">
					<td width="10%">签署地：</td>
					<td width="90%" colspan="3">重庆</td>
				</tr>
			</table>
		</div>
	</div>
</body>
</html>