<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!DOCTYPE>
<html>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<head>
<title>订单详情</title>
<link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href="/resources/css/contractList/orderMore.css" rel="stylesheet" type="text/css">
</head>
<script type="text/javascript" src="/resources/js/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="/resources/js/oridomi.min.js"></script>
<script type="text/javascript" src="/resources/js/contractList/orderMore.js"></script>
<body>
	<div class="contentDiv">
		<div class="titleFont">
			交房结算单 <a href="javascript:;" onclick="moreMessage(this)" class="moreMessage">详细信息 <i class="fa fa-caret-down"></i></a>
		</div>
		<div class="houseCode">
			<dl>
				<dt>房号</dt>
				<dd>万达广场1-2-3-4</dd>
			</dl>
		</div>
		<div class="houseDate">
			<dl>
				<dt>结算日期</dt>
				<dd>2016年9月1日</dd>
			</dl>
		</div>
		<table style="margin-bottom: -1px;">
			<thead>
				<tr>
					<td class="taTitle">客户</td>
					<td></td>
					<td class="taTitle">合同日期</td>
					<td></td>
					<td class="taTitle">最近交租日</td>
					<td></td>
					<td class="taTitle">接房日期</td>
					<td></td>
				</tr>
				<tr>
					<td class="taTitle">月租金</td>
					<td></td>
					<td class="taTitle">押金</td>
					<td></td>
					<td class="taTitle">银行卡</td>
					<td colspan="3"></td>
				</tr>
			</thead>
		</table>
		<div class="moreList">
			<table>
				<tbody>
					<!-- 代理费结算 -->
					<tr>
						<td class="taTitleT" colspan="8">代理费结算</td>
					</tr>
					<tr>
						<td class="taTitle" colspan="5">结算类型</td>
						<td class="taTitle" colspan="2">收费说明</td>
						<td class="taTitle" colspan="1">小计</td>
					</tr>
					<tr>
						<td colspan="5"></td>
						<td colspan="2"></td>
						<td colspan="1"></td>
					</tr>
					<!-- END -->
					<!-- 费用结算 -->
					<tr>
						<td class="taTitleT" colspan="8">费用结算</td>
					</tr>
					<tr>
						<td class="taTitle">消费类型</td>
						<td class="taTitle" colspan="3">未交费起止数</td>
						<td class="taTitle" style="width: 100x;">消费量</td>
						<td class="taTitle" style="width: 20%">单价</td>
						<td class="taTitle" style="width: 100x;">违约金</td>
						<td class="taTitle" style="width: 20%;">小计</td>
					</tr>
					<tr>
						<td class="taTitle">水</td>
						<td colspan="3"></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td class="taTitle">电</td>
						<td colspan="3"></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td class="taTitle">气</td>
						<td colspan="3"></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td class="taTitle">垃圾处理费</td>
						<td colspan="3"></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td class="taTitle">物管费</td>
						<td colspan="3"></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td class="taTitle">有线电视</td>
						<td colspan="3"></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td class="taTitle">宽带</td>
						<td colspan="3"></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td class="taTitle">租金</td>
						<td colspan="3"></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td class="taTitle">其他</td>
						<td colspan="3"></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td class="taTitle" colspan="6">合计</td>
						<td colspan="2"></td>
					</tr>
					<!-- END -->
					<!-- 物品结算 -->
					<tr>
						<td class="taTitleT" colspan="8">物品结算</td>
					</tr>
					<tr>
						<td class="taTitle">物品类型</td>
						<td class="taTitle" colspan="4">未交费起止数</td>
						<td class="taTitle" colspan="2">费用</td>
						<td class="taTitle" style="width: 20%;">小计</td>
					</tr>
					<tr>
						<td class="taTitle">维修</td>
						<td colspan="4"></td>
						<td colspan="2"></td>
						<td style="width: 20%;"></td>
					</tr>
					<tr>
						<td class="taTitle">赔偿</td>
						<td colspan="4"></td>
						<td colspan="2"></td>
						<td style="width: 20%;"></td>
					</tr>
					<tr>
						<td class="taTitle">保洁</td>
						<td colspan="4"></td>
						<td colspan="2"></td>
						<td style="width: 20%;"></td>
					</tr>
					<tr>
						<td class="taTitle">其他</td>
						<td colspan="4"></td>
						<td colspan="2"></td>
						<td style="width: 20%;"></td>
					</tr>
					<tr>
						<td class="taTitle" colspan="6">合计</td>
						<td colspan="2"></td>
					</tr>
					<!-- END -->
					<!-- 违约金结算 -->
					<tr>
						<td class="taTitleT" colspan="8">违约金结算</td>
					</tr>
					<tr>
						<td class="taTitle" colspan="3">违约金类型</td>
						<td class="taTitle">月租金</td>
						<td class="taTitle">违约金比例</td>
						<td class="taTitle" colspan="2">说明</td>
						<td class="taTitle">小计</td>
					</tr>
					<tr>
						<td class="taTitle">金融公司</td>
						<td colspan="2"></td>
						<td></td>
						<td></td>
						<td colspan="2"></td>
						<td></td>
					</tr>
					<tr>
						<td class="taTitle">滞纳金</td>
						<td colspan="2"></td>
						<td></td>
						<td></td>
						<td colspan="2"></td>
						<td></td>
					</tr>
					<tr>
						<td class="taTitle" colspan="6">合计</td>
						<td colspan="2"></td>
					</tr>
					<!-- END -->
				</tbody>
			</table>
		</div>
		<table style="margin-top: -1px;">
			<tbody>
				<!-- 费用结余 -->
				<tr>
					<td class="taTitleT" colspan="8">费用结余</td>
				</tr>
				<tr>
					<td class="taTitle" colspan="2">费用名称</td>
					<td class="taTitle" colspan="2">说明</td>
					<td class="taTitle" colspan="2">应收</td>
					<td class="taTitle" colspan="2">应付</td>
				</tr>
				<tr>
					<td class="taTitle" colspan="2">消费结算费用</td>
					<td colspan="2"></td>
					<td colspan="2"></td>
					<td colspan="2"></td>
				</tr>
				<tr>
					<td class="taTitle" colspan="2">物品结算费用</td>
					<td colspan="2"></td>
					<td colspan="2"></td>
					<td colspan="2"></td>
				</tr>
				<tr>
					<td class="taTitle" colspan="2">代理结算费用</td>
					<td colspan="2"></td>
					<td colspan="2"></td>
					<td colspan="2"></td>
				</tr>
				<tr>
					<td class="taTitle" colspan="2">违约金结算费用</td>
					<td colspan="2"></td>
					<td colspan="2"></td>
					<td colspan="2"></td>
				</tr>
				<tr>
					<td class="taTitle" colspan="2">其他结算费用</td>
					<td colspan="2"></td>
					<td colspan="2"></td>
					<td colspan="2"></td>
				</tr>
				<tr>
					<td class="taTitle" colspan="2">预交租金</td>
					<td colspan="2"></td>
					<td colspan="2"></td>
					<td colspan="2"></td>
				</tr>
				<tr>
					<td class="taTitle" colspan="2">押金</td>
					<td colspan="2"></td>
					<td colspan="2"></td>
					<td colspan="2"></td>
				</tr>
				<tr>
					<td class="taTitle" colspan="4">应付结余（应付-应收）</td>
					<td colspan="4"></td>
				</tr>
				<tr>
					<td class="taTitle">备注</td>
					<td colspan="7"></td>
				</tr>
				<!-- END -->
			</tbody>
		</table>
	</div>
</body>
</html>