<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%
	response.setHeader("Pragma", "No-cache");
	response.setHeader("Cache-Control", "no-cache");
	response.setDateHeader("Expires", -10);
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="Expires" CONTENT="0">
<meta http-equiv="Cache-Control" CONTENT="no-cache">
<meta http-equiv="Pragma" CONTENT="no-cache">
<title>支付变更</title>
<link href="/resources/css/common/common.css" rel="stylesheet" type="text/css">
<link href="/resources/common/sweet-alert/css/sweetalert.css" rel="stylesheet" type="text/css">
<link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">
<link href="/resources/css/contractList/contractApply.css" rel="stylesheet" type="text/css">

<script src="/resources/js/jquery-1.7.2.min.js"></script>
<script src="/resources/common/datepicker/js/jquery-ui-datepicker.js"></script>
<script src="/resources/common/perfect-scrollbar/js/perfect-scrollbar.jquery.js"></script>
<script src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
<script src="/resources/js/common/common.js"></script>
<script src="/resources/js/contractList/contractPayway.js"></script>
</head>
<body>
	<input type="hidden" id="contractObject_No" value="${contractVo.contractObject_No}">
	<input type="hidden" id="contractBody_PayStyle" value="${contractVo.contractBody_PayStyle}">
	<div id="main-box">
		<div class="nav-contype clear">
			<a href="javascript:;" class="contype-tab contype-tab-focus">支付变更</a>
		</div>
		<div class="box-content">
			<div class="sub-title">
				<ul>
					<li class="visited">基本信息</li>
				</ul>
			</div>
			<!-- 显示信息 -->
			<div class="sub-content content-item" id="show-info-box">
				<fieldset>
					<legend>账单信息</legend>
					<c:if test="${contractVo.contractObject_Type=='托管合同'}">
						<div class="sub-content" style="padding: 0">
							<div class="item-table item-table-head">
								<ul>
									<li style="width: 10%">期数</li>
									<li style="width: 20%">订单号</li>
									<li style="width: 20%">房东信息</li>
									<li style="width: 10%">应付金额</li>
									<li style="width: 10%">实付金额</li>
									<li style="width: 20%">应付款时间</li>
									<li style="width: 10%">账单状态</li>
								</ul>
							</div>
							<div class="item-table item-table-body" style="max-height: 320px;">
								<c:forEach items="${trusteeshipBill}" var="item" varStatus="status">
									<ul style="${status.index%2==0?'background: #f8f8f8':'background: #E0EFF7'}">
										<li style="width: 10%">${item.tsb_payCycleNum}</li>
										<li style="width: 20%">${item.tsb_code}</li>
										<li style="width: 20%">${item.tsb_name}&nbsp;/&nbsp;${item.tsb_phone}</li>
										<li style="width: 10%">
											<fmt:formatNumber value="${item.tsb_repayment}" pattern="#.#" />
											<c:if test="${!empty item.tsb_repayment}">元</c:if>
										</li>
										<li style="width: 10%">
											<c:if test="${!empty item.tsb_realPayment and item.tsb_realPayment !=0}">
												<fmt:formatNumber value="${item.tsb_realPayment}" pattern="#.#" />元</c:if>
										</li>
										<li style="width: 20%">
											<fmt:formatDate value="${item.tsb_repaymentDate}" pattern="yyyy-MM-dd HH:mm:ss" />
										</li>
										<c:if test="${item.tsb_state == '待还款'}">
											<li class="tips" style="width: 10%">待还款</li>
										</c:if>
										<c:if test="${item.tsb_state == '已还款'}">
											<li class="ok" style="width: 10%">已付款</li>
										</c:if>
										<c:if test="${item.tsb_state == '逾期'}">
											<li class="error" style="width: 10%">${item.tsb_state}</li>
										</c:if>
										<c:if test="${item.tsb_state != '逾期' && item.tsb_state != '待还款' && item.tsb_state != '已还款'}">
											<li style="width: 10%">${item.tsb_state}</li>
										</c:if>
									</ul>
								</c:forEach>
							</div>
						</div>
					</c:if>
					<c:if test="${contractVo.contractObject_Type=='租赁合同'}">
						<div class="sub-content" style="padding: 0">
							<div class="item-table item-table-head">
								<ul>
									<li style="width: 10%">期数</li>
									<li style="width: 20%">订单号</li>
									<li style="width: 20%">租客信息</li>
									<li style="width: 10%">应收金额</li>
									<li style="width: 10%">实收金额</li>
									<li style="width: 20%">最后还款时间</li>
									<li style="width: 10%">账单状态</li>
								</ul>
							</div>
							<div class="item-table item-table-body" style="max-height: 320px;">
								<c:forEach items="${billTenantBill}" var="item" varStatus="status">
									<ul style="${status.index%2==0?'background: #f8f8f8':'background: #E0EFF7'}">
										<li style="width: 10%">${item.tb_payCycleNum}</li>
										<li style="width: 20%">${item.tb_code}</li>
										<li style="width: 20%">${item.tb_name}&nbsp;/&nbsp;${item.tb_phone}</li>
										<li style="width: 10%">
											<fmt:formatNumber value="${item.tb_shouldMoney}" pattern="#.#" />
											<c:if test="${!empty item.tb_shouldMoney}">元</c:if>
										</li>
										<li style="width: 10%">
											<c:if test="${!empty item.tb_money and item.tb_money !=0}">
												<fmt:formatNumber value="${item.tb_money}" pattern="#.#" />元</c:if>
										</li>
										<li style="width: 20%">
											<fmt:formatDate value="${item.tb_shouldDate}" pattern="yyyy-MM-dd HH:mm:ss" />
										</li>
										<c:if test="${item.tb_state == '待还款'}">
											<li class="tips" style="width: 10%">${item.tb_state}</li>
										</c:if>
										<c:if test="${item.tb_state == '已还款'}">
											<li class="ok" style="width: 10%">${item.tb_state}</li>
										</c:if>
										<c:if test="${item.tb_state == '逾期'}">
											<li class="error" style="width: 10%">${item.tb_state}</li>
										</c:if>
										<c:if test="${item.tb_state != '逾期' && item.tb_state != '待还款' && item.tb_state != '已还款'}">
											<li style="width: 10%">${item.tb_state}</li>
										</c:if>
									</ul>
								</c:forEach>
							</div>
						</div>
					</c:if>
				</fieldset>
			</div>
			<div class="sub-title">
				<ul class="title-nav">
					<li class="visited">变更内容</li>
				</ul>
			</div>
			<!-- 支付方式变更 -->
			<div class="sub-content" id="payway-option">
				<dl class="main-box-list">
					<dt class="item">
						<em>*</em>
						<span class="item-titile">付款方式</span>
					</dt>
					<dd class="item">
						<select class="form-control" id="conPayType" onchange="showPayType(this);showPayDate();" required>
							<c:forEach items="${payWayList}" var="item">
								<c:if test="${empty contractVo.contractBody_PayStyle}">
									<option value="${item.contractType_Name}" data-value="${item.contractType_Value}" ${'月付' == item.contractType_Name?'selected':''}>${item.contractType_Name}</option>
								</c:if>
								<c:if test="${!empty contractVo.contractBody_PayStyle}">
									<option value="${item.contractType_Name}" data-value="${item.contractType_Value}" ${contractVo.contractBody_PayStyle == item.contractType_Name?'selected':''}>${item.contractType_Name}</option>
								</c:if>
							</c:forEach>
						</select>
						<c:if test="${contractVo.contractObject_Type == '租赁合同'}">
							<div id="monthPayType" class="item-left" data-value="${contractVo.contractBody_PayType}" style="display: ${!empty contractVo and contractVo.contractBody_PayStyle != '月付'?'none':''}">
								<c:forEach items="${payTypeList}" var="item" varStatus="status">
									<label class="type-label ${item.contractType_Name !='管家婆'?'dis_label':'span-checked'}">${item.contractType_Name}<i></i>
										<input type="checkbox" class="type-radio" name="payType" onclick="changeType(this)" checked value="${item.contractType_Name}" ${item.contractType_Name !='管家婆'?'disabled':''}>
									</label>
								</c:forEach>
							</div>
						</c:if>
						<c:if test="${contractVo.contractObject_Type == '托管合同'}">
							<div id="rentPlus" class="toolbox" style="margin-left: 14px;">
								<span class="toolbox-title">
									租金加成
									<i class="icon-info-sign" style="position: absolute; top: 2px; right: 1px; color: #fff;" title="租金加成月付+50、季付100%、半年付94%、年付88%"></i>
								</span>
								<span class="toolbox-value value-suffix" style="padding: 0 14px;">
									<input type="text" id="contractBody_RentPlus" class="money" value="100" data-type="%" maxlength="3">
								</span>
								<span class="toolbox-suffix">元</span>
								<span class="toolbox-option icon-retweet" id="retweetRent" title="切换租金加成方式"></span>
							</div>
						</c:if>
					</dd>
					<dd class="item hint" style="clear: both; text-indent: 120px; line-height: 28px; height: 28px;">
						<c:if test="${contractVo.contractObject_Type == '租赁合同'}">月付如果改成第三方支付，则需要作废该合同并重新签订新合同</c:if>
					</dd>
				</dl>
				<hr>
				<dl class="main-box-list">
					<dt class="item">
						<span class="item-titile">合同期限</span>
					</dt>
					<dd class="item" style="min-width: 100px;">
						<input type="text" class="form-control number" value="${contractVo.contractBody_TimeLimit}" onchange="changeDate();" maxlength="2" placeholder="租赁期限" readonly>
					</dd>
					<dd class="tisp"></dd>
				</dl>
				<dl class="main-box-list">
					<dt class="item">
						<span class="item-titile">起止时间</span>
					</dt>
					<dd class="item">
						<input type="text" class="form-control" id="conOpenDate" value="${startDate}" placeholder="开始日期" readonly>
						<span class="dd-span">至</span>
						<input type="text" class="form-control" id="conEndDate" value="${endDate}" placeholder="结束日期" readonly>
					</dd>
					<dd class="tisp"></dd>
				</dl>
				<hr>
				<dl class="main-box-list">
					<dt class="item">
						<span class="item-titile">变更前付租日期</span>
					</dt>
					<dd class="item payDate" id="oldPayDate">
						<c:if test="${contractVo.contractObject_Type == '托管合同'}">
							<c:forEach items="${trusteeshipBill}" var="item" varStatus="status">
								<c:if test="${item.tsb_state=='已还款'}">
									<label class="form-box form-false">
										<span class="form-span" style="color: #27AE60;">${item.tsb_payCycleNum<10?'0':''}${item.tsb_payCycleNum}、</span>
										<input type="text" class="form-control" value="<fmt:formatDate value="${item.tsb_repaymentDate}" pattern="yyyy-MM-dd"/>" style="border: 1px solid #27ae60; color: #27AE60;" readonly>
									</label>
								</c:if>
								<c:if test="${item.tsb_state!='已还款'}">
									<label class="form-box form-true">
										<span class="form-span">${item.tsb_payCycleNum<10?'0':''}${item.tsb_payCycleNum}、</span>
										<input type="text" class="form-control" value="<fmt:formatDate value="${item.tsb_repaymentDate}" pattern="yyyy-MM-dd"/>" readonly>
									</label>
								</c:if>
							</c:forEach>
						</c:if>
						<c:if test="${contractVo.contractObject_Type == '租赁合同'}">
							<c:forEach items="${billTenantBill}" var="item" varStatus="status">
								<c:if test="${item.tb_state=='已还款'}">
									<label class="form-box form-false">
										<span class="form-span" style="color: #27AE60;">${item.tb_payCycleNum<10?'0':''}${item.tb_payCycleNum}、</span>
										<input type="text" class="form-control" value="<fmt:formatDate value="${item.tb_shouldDate}" pattern="yyyy-MM-dd"/>" style="border: 1px solid #27ae60; color: #27AE60;" readonly>
									</label>
								</c:if>
								<c:if test="${item.tb_state!='已还款'}">
									<label class="form-box form-true">
										<span class="form-span">${item.tb_payCycleNum<10?'0':''}${item.tb_payCycleNum}、</span>
										<input type="text" class="form-control" value="<fmt:formatDate value="${item.tb_shouldDate}" pattern="yyyy-MM-dd"/>" readonly>
									</label>
								</c:if>
							</c:forEach>
						</c:if>
					</dd>
				</dl>
				<hr>
				<dl class="main-box-list">
					<dt class="item">
						<span class="item-titile">变更后付租日期</span>
					</dt>
					<dd class="item payDate" id="newPayDate"></dd>
					<dd class="tisp"></dd>
				</dl>
				<hr>
				<dl class="main-box-list main-box-bottom">
					<dt class="item">&nbsp;</dt>
					<dd class="item">
						<button class="form-control" onclick="submitPayWay()">提交</button>
					</dd>
					<dd class="item">
						<button class="form-control back" onclick="back()">返回</button>
					</dd>
				</dl>
				<hr>
			</div>
		</div>
	</div>
</body>
</html>