<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%
	response.setHeader("Pragma","No-cache");
	response.setHeader("Cache-Control","no-cache");
	response.setDateHeader("Expires", -10);
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="Expires" CONTENT="0">
<meta http-equiv="Cache-Control" CONTENT="no-cache">
<meta http-equiv="Pragma" CONTENT="no-cache">
<title>合约订单查看</title>
<link href="/resources/css/common.css" rel="stylesheet" type="text/css">
<link href="/resources/common/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href="/resources/common/sweet-alert/css/sweet-alert.css" rel="stylesheet" type="text/css">
<link href="/resources/common/datepicker/jquery-ui.css" rel="stylesheet" type="text/css">
<link href="/resources/common/perfect-scrollbar/css/perfect-scrollbar.min.css" rel="stylesheet" type="text/css">
<link href="/resources/css/contractList/cancelContract.css" rel="stylesheet" type="text/css">

<script src="/resources/js/jquery-1.7.2.min.js"></script>
<script src="/resources/js/common/common.js"></script>
<script src="/resources/common/datepicker/js/jquery-ui-datepicker.js">/* 日期插件 */</script>
<script src="/resources/common/perfect-scrollbar/js/perfect-scrollbar.jquery.js">/* 插件 */</script>
<script src="/resources/common/sweet-alert/js/sweet-alert.min.js">/* 提示弹窗 */</script>
<script src="/resources/js/contractList/contractStatement.js"></script>
</head>
<body>
<div id="main-box">
	<div class="box-nav">
		<ul>
			<li class="nav-tab-focus">合约订单查看</li>
		</ul>
	</div>
	<div class="box-content">
		<div class="sub-content">
			<div class="sub-title">
				<ul class="title-nav">
					<li class="visited" data-id="itemlist0">基本信息</li>
				</ul>
			</div>
			<div class="content-main">
				<div class="content-item">
					<fieldset>
						<legend>订单信息&nbsp;<span class="error">No.${cancelContractListVo.cco_code}</span></legend>
						<dl>
							<dt>申请人/电话：</dt>
							<dd>${cancelContractListVo.cco_applicant}&nbsp;/&nbsp;${cancelContractListVo.cco_phone}</dd>
						</dl>
						<dl>
							<dt>合约类型：</dt>
							<dd>${cancelContractListVo.cco_applicationType}</dd>
						</dl>
						<dl>
							<dt>经办人：</dt>
							<dd>${cancelContractListVo.cco_peopleName}</dd>
						</dl>
						<dl>
							<dt>${cancelContractListVo.cco_applicationType}费用：</dt>
							<dd><fmt:formatNumber value="${cancelContractListVo.cco_subletCost}" pattern="#.##"/><c:if test="${!empty cancelContractListVo.cco_subletCost}">&nbsp;元</c:if></dd>
						</dl>
						<dl>
							<dt>钥匙：</dt>
							<dd>${cancelContractListVo.cco_key}<c:if test="${!empty cancelContractListVo.cco_key}">&nbsp;把</c:if></dd>
						</dl>
						<dl>
							<dt>银行名称/卡号：</dt>
							<dd>${cancelContractListVo.cco_bank}<c:if test="${!empty cancelContractListVo.cco_bankCard}">&nbsp;/&nbsp;${cancelContractListVo.cco_bankCard}</c:if></dd>
						</dl>
						<dl>
							<dt>收费比例：</dt>
							<dd>${cancelContractListVo.cco_moneyProportion}</dd>
						</dl>
						<dl>
							<dt>状态：</dt>
							<dd>${cancelContractListVo.cco_state}</dd>
						</dl>
						<dl>
							<dt>审核人/方式：</dt>
							<dd>${cancelContractListVo.cco_processer}<c:if test="${!empty cancelContractListVo.cco_processMode}">&nbsp;/&nbsp;${cancelContractListVo.cco_processMode}</c:if></dd>
						</dl>
						<hr>
						<dl>
							<dt>申请内容：</dt>
							<dd class="error">${cancelContractListVo.cco_applicationContent}</dd>
						</dl>
						<hr>
						<dl>
							<dt>申请时间：</dt>
							<dd><fmt:formatDate value="${cancelContractListVo.cco_applicationTime}" pattern="yyyy-MM-dd"/></dd>
						</dl>
						<dl>
							<dt>完成时间：</dt>
							<dd><fmt:formatDate value="${cancelContractListVo.cco_FinishTime}" pattern="yyyy-MM-dd"/></dd>
						</dl>
					</fieldset>
					<fieldset>
						<legend>合同信息(${businessContractVo.contractObject_Type})&nbsp;<span class="error">No.${businessContractVo.contractObject_No}</span></legend>
						<dl>
							<dt>房屋地址：</dt>
							<dd>${businessContractVo.propertyInfo_address}（${businessContractVo.propertyInfo_Name}）${businessContractVo.hi_address}，建筑面积<strong>${businessContractVo.hi_measure}</strong>平方米，户型<strong>${businessContractVo.hi_houseS}</strong>室<strong>${businessContractVo.hi_houseT}</strong>厅<strong>${businessContractVo.hi_houseW}</strong>卫</dd>
						</dl>
						<hr>
						<dl>
							<dt>租赁期限：</dt>
							<dd>${businessContractVo.contractBody_TimeLimit}（${businessContractVo.contractBody_StartTOEnd}）</dd>
						</dl>
						<dl>
							<dt>租赁价格：</dt>
							<dd><fmt:formatNumber value="${businessContractVo.contractBody_Rent}"  pattern="#.##"/><c:if test="${!empty businessContractVo.contractBody_Rent}">元/月<c:if test="${!empty businessContractVo.contractBody_PayStyle}">（${businessContractVo.contractBody_PayStyle}：${businessContractVo.contractBody_PayType}）</c:if></c:if></dd>
						</dl>
						<dl>
							<dt>保证金：</dt>
							<dd><fmt:formatNumber value="${businessContractVo.contractBody_Pay}" pattern="#.##"/><c:if test="${!empty businessContractVo.contractBody_Pay}">元</c:if></dd>
						</dl>
						<dl>
							<dt>服务费：</dt>
							<dd><fmt:formatNumber value="${businessContractVo.contractBody_Service}" pattern="#.##"/><c:if test="${!empty businessContractVo.contractBody_Service}">元</c:if></dd>
						</dl>
						<dl>
							<dt>诚意金/定金：</dt>
							<dd><fmt:formatNumber value="${businessContractVo.contractBody_Depslit}" pattern="#.##"/><c:if test="${!empty businessContractVo.contractBody_Depslit}">元</c:if></dd>
						</dl>
						<dl>
							<dt>合同状态：</dt>
							<dd>${businessContractVo.contractObject_State}</dd>
						</dl>
						<dl>
							<dt>登记人：</dt>
							<dd>${businessContractVo.contractBody_Optioner}</dd>
						</dl>
						<dl>
							<dt>登记时间：</dt>
							<dd><fmt:formatDate value="${businessContractVo.contractObject_CreateTime}" pattern="yyyy-MM-dd HH:mm:ss"/></dd>
						</dl>
						<hr>
						<dl>
							<dt>其他约定：</dt>
							<dd class="error">${businessContractVo.contractObject_Other}</dd>
						</dl>
						<hr>
						<dl>
							<dt>备注：</dt>
							<dd class="error">${businessContractVo.contractBody_Remark}</dd>
						</dl>
					</fieldset>
				</div>
			</div>
		</div>
		<c:if test="${!empty statementVo}">
			<div class="sub-title">
				<ul class="title-nav">
					<li class="visited" data-id="itemlist1">消费费用清单</li>
					<li class="link" data-id="itemlist2">损坏物品清单</li>
				</ul>
			</div>
			<div class="sub-content itemlist" id="itemlist1" style="display: block;">
				<div class="content-main" id="costItemList">
					<fieldset class="fieldset">
						<legend class="legend">1、水</legend>
						<dl class="main-box-list">
							<dt class="item"><span class="item-titile">单价</span></dt>
							<dd class="item"><input type="text" maxlength="11" onkeyup="calCost(this)" class="form-control money cs_unitPrice" value="4.3"><label class="suffix">元/m³</label></dd>
						</dl>
						<dl class="main-box-list">
							<dt class="item"><span class="item-titile">起止数</span></dt>
							<dd class="item"><input type="text" maxlength="11" onkeyup="calCost(this)" class="form-control money cs_value"><label class="suffix">m³</label></dd>
						</dl>
						<dl class="main-box-list">
							<dt class="item"><span class="item-titile">违约金</span></dt>
							<dd class="item"><input type="text" maxlength="11" onkeyup="calCost(this)" class="form-control money cs_penalty"><label class="suffix">元</label></dd>
						</dl>
						<dl class="main-box-list" style="float: right;">
							<dt class="item"><span class="item-titile">合计</span></dt>
							<dd class="item"><input type="text" maxlength="11" class="form-control money cs_total" data-name="水" readonly><label class="suffix">元</label></dd>
						</dl>
					</fieldset>
					<fieldset class="fieldset">
						<legend class="legend">2、电</legend>
						<dl class="main-box-list">
							<dt class="item"><span class="item-titile">单价</span></dt>
							<dd class="item"><input type="text" maxlength="11" onkeyup="calCost(this)" class="form-control cs_unitPrice money" value="0.52"><label class="suffix">元/度</label></dd>
						</dl>
						<dl class="main-box-list">
							<dt class="item"><span class="item-titile">起止数</span></dt>
							<dd class="item"><input type="text" maxlength="11" onkeyup="calCost(this)" class="form-control cs_value money"><label class="suffix">度</label></dd>
						</dl>
						<dl class="main-box-list">
							<dt class="item"><span class="item-titile">违约金</span></dt>
							<dd class="item"><input type="text" maxlength="11" onkeyup="calCost(this)" class="form-control cs_penalty money"><label class="suffix">元</label></dd>
						</dl>
						<dl class="main-box-list" style="float: right;">
							<dt class="item"><span class="item-titile">合计</span></dt>
							<dd class="item"><input type="text" maxlength="11" class="form-control cs_total money" data-name="电" readonly><label class="suffix">元</label></dd>
						</dl>
					</fieldset>
					<fieldset class="fieldset">
						<legend class="legend">3、天燃气</legend>
						<dl class="main-box-list">
							<dt class="item"><span class="item-titile">单价</span></dt>
							<dd class="item"><input type="text" maxlength="11" onkeyup="calCost(this)" class="form-control cs_unitPrice money" value="1.72"><label class="suffix">元/m³</label></dd>
						</dl>
						<dl class="main-box-list">
							<dt class="item"><span class="item-titile">起止数</span></dt>
							<dd class="item"><input type="text" maxlength="11" onkeyup="calCost(this)" class="form-control cs_value money"><label class="suffix">m³</label></dd>
						</dl>
						<dl class="main-box-list">
							<dt class="item"><span class="item-titile">违约金</span></dt>
							<dd class="item"><input type="text" maxlength="11" onkeyup="calCost(this)" class="form-control cs_penalty money"><label class="suffix">元</label></dd>
						</dl>
						<dl class="main-box-list" style="float: right;">
							<dt class="item"><span class="item-titile">合计</span></dt>
							<dd class="item"><input type="text" maxlength="11" class="form-control cs_total money" data-name="天然气" readonly><label class="suffix">元</label></dd>
						</dl>
					</fieldset>
					<fieldset class="fieldset">
						<legend class="legend">4、垃圾处理费</legend>
						<dl class="main-box-list">
							<dt class="item"><span class="item-titile">每月</span></dt>
							<dd class="item"><input type="text" maxlength="11" onkeyup="calCost(this)" class="form-control cs_unitPrice money"><label class="suffix">元</label></dd>
						</dl>
						<dl class="main-box-list">
							<dt class="item"><span class="item-titile">消费</span></dt>
							<dd class="item"><input type="text" maxlength="11" onkeyup="calCost(this)" class="form-control cs_value money"><label class="suffix">月</label></dd>
						</dl>
						<dl class="main-box-list" style="float: right;">
							<dt class="item"><span class="item-titile">合计</span></dt>
							<dd class="item"><input type="text" maxlength="11" class="form-control cs_total money" data-name="垃圾处理费" readonly><label class="suffix">元</label></dd>
						</dl>
					</fieldset>
					<fieldset class="fieldset">
						<legend class="legend">5、物管费</legend>
						<dl class="main-box-list">
							<dt class="item"><span class="item-titile">每月</span></dt>
							<dd class="item"><input type="text" maxlength="11" onkeyup="calCost(this)" class="form-control cs_unitPrice money"><label class="suffix">元</label></dd>
						</dl>
						<dl class="main-box-list">
							<dt class="item"><span class="item-titile">消费</span></dt>
							<dd class="item"><input type="text" maxlength="11" onkeyup="calCost(this)" class="form-control cs_value money"><label class="suffix">月</label></dd>
						</dl>
						<dl class="main-box-list" style="float: right;">
							<dt class="item"><span class="item-titile">合计</span></dt>
							<dd class="item"><input type="text" maxlength="11" class="form-control cs_total money" data-name="物管费" readonly><label class="suffix">元</label></dd>
						</dl>
					</fieldset>
					<fieldset class="fieldset">
						<legend class="legend">6、有线电视费</legend>
						<dl class="main-box-list">
							<dt class="item"><span class="item-titile">每月</span></dt>
							<dd class="item"><input type="text" maxlength="11" onkeyup="calCost(this)" class="form-control cs_unitPrice money"><label class="suffix">元</label></dd>
						</dl>
						<dl class="main-box-list">
							<dt class="item"><span class="item-titile">消费</span></dt>
							<dd class="item"><input type="text" maxlength="11" onkeyup="calCost(this)" class="form-control cs_value money"><label class="suffix">月</label></dd>
						</dl>
						<dl class="main-box-list" style="float: right;">
							<dt class="item"><span class="item-titile">合计</span></dt>
							<dd class="item"><input type="text" maxlength="11" class="form-control cs_total money" data-name="有线电视费" readonly><label class="suffix">元</label></dd>
						</dl>
					</fieldset>
					<fieldset class="fieldset">
						<legend class="legend">7、清洁费</legend>
						<dl class="main-box-list">
							<dt class="item"><span class="item-titile">单价</span></dt>
							<dd class="item"><input type="text" maxlength="11" onkeyup="calCost(this)" class="form-control cs_unitPrice money"><label class="suffix">元/m³</label></dd>
						</dl>
						<dl class="main-box-list">
							<dt class="item"><span class="item-titile">建筑面积</span></dt>
							<dd class="item"><input type="text" value="${businessContractVo.hi_measure}" maxlength="11" onkeyup="calCost(this)" class="form-control cs_value money"><label class="suffix">m³</label></dd>
						</dl>
						<dl class="main-box-list" style="float: right;">
							<dt class="item"><span class="item-titile">合计</span></dt>
							<dd class="item"><input type="text" maxlength="11" class="form-control cs_total money" data-name="清洁费" readonly><label class="suffix">元</label></dd>
						</dl>
					</fieldset>
					<fieldset class="fieldset">
						<legend class="legend">8、滞纳金</legend>
						<dl class="main-box-list">
							<dt class="item"><span class="item-titile">租金</span></dt>
							<dd class="item"><input type="text" value="<fmt:formatNumber value="${businessContractVo.contractBody_Rent/30}"  pattern="#.##"/>" maxlength="11" onkeyup="calCost(this)" class="form-control cs_unitPrice money"><label class="suffix">元/天</label></dd>
						</dl>
						<dl class="main-box-list">
							<dt class="item"><span class="item-titile">超期</span></dt>
							<dd class="item"><input type="text" maxlength="11" onkeyup="calCost(this)" class="form-control cs_value money"><label class="suffix">天</label></dd>
						</dl>
						<dl class="main-box-list" style="float: right;">
							<dt class="item"><span class="item-titile">合计</span></dt>
							<dd class="item"><input type="text" maxlength="11" class="form-control cs_total money" data-name="滞纳金" readonly><label class="suffix">元</label></dd>
						</dl>
					</fieldset>
					<fieldset class="fieldset">
						<legend class="legend">9、房租</legend>
						<dl class="main-box-list">
							<dt class="item"><span class="item-titile">租金</span></dt>
							<dd class="item"><input type="text" value="<fmt:formatNumber value="${businessContractVo.contractBody_Rent/30}"  pattern="#.##"/>" maxlength="11" onkeyup="calCost(this)" class="form-control cs_unitPrice money"><label class="suffix">元/天</label></dd>
						</dl>
						<dl class="main-box-list">
							<dt class="item"><span class="item-titile">超期</span></dt>
							<dd class="item"><input type="text" maxlength="11" onkeyup="calCost(this)" class="form-control cs_value money"><label class="suffix">天</label></dd>
						</dl>
						<dl class="main-box-list" style="float: right;">
							<dt class="item"><span class="item-titile">合计</span></dt>
							<dd class="item"><input type="text" maxlength="11" class="form-control cs_total money" data-name="房租" readonly><label class="suffix">元</label></dd>
						</dl>
					</fieldset>
					<fieldset class="fieldset">
						<legend class="legend" style="min-width: auto;">10、违约金</legend>
						<dl class="main-box-list">
							<dd class="item"><input type="text" maxlength="11" class="form-control cs_total money" data-name="违约金"><label class="suffix">元</label></dd>
						</dl>
						<legend class="legend">11、转租代理费</legend>
						<dl class="main-box-list">
							<dd class="item"><input type="text" maxlength="11" class="form-control cs_total money" data-name="转租代理费"><label class="suffix">元</label></dd>
						</dl>
						<legend class="legend" style="min-width: auto;">12、维修费</legend>
						<dl class="main-box-list">
							<dd class="item"><input type="text" maxlength="11" class="form-control cs_total money" data-name="维修费"><label class="suffix">元</label></dd>
						</dl>
					</fieldset>
				</div>
			</div>
			<div class="sub-content itemlist" id="itemlist2">
				<div class="content-main">
					<div class="item-menu">
						<dl>
							<dt class="menuB">
								<span style="width:15%">配置类型</span>
								<span style="width:15%">房间</span>
								<span style="width:15%">名称</span>
								<span style="width:15%">品牌</span>
								<span style="width:10%">数量</span>
								<span style="width:10%">新旧</span>
								<span style="width:10%">好坏</span>
								<span style="width:auto">赔偿费用(元)</span>
							</dt>
						</dl>
						<dl id="menu-dl-box" style="height: 385px;">
							<c:forEach items="${situationList}" var="item" varStatus="status">
								<dd class="menu-content" style="${status.index%2==0?'background: #f8f8f8':'background: #ffffff'}">
									<input type="hidden" class="ps_id" value="${item.ps_id}">
									<c:if test="${item.ps_type=='家具'}"><span style="width:15%"><label class="item-type" style="background: #3498DB">${item.ps_type}</label></span></c:if>
									<c:if test="${item.ps_type=='家电'}"><span style="width:15%"><label class="item-type" style="background: #1ABC9C">${item.ps_type}</label></span></c:if>
									<c:if test="${item.ps_type=='灯具'}"><span style="width:15%"><label class="item-type" style="background: #F39C12">${item.ps_type}</label></span></c:if>
									<c:if test="${item.ps_type=='洁具'}"><span style="width:15%"><label class="item-type" style="background: #2ECC71">${item.ps_type}</label></span></c:if>
									<span style="width:15%">${item.ps_moon}</span>
									<span style="width:15%">${item.ps_name}</span>
									<span style="width:15%">${item.pc_brand}</span>
									<span style="width:10%">${item.ps_num}</span>
									<span style="width:10%" data-value="${item.ps_oldAndNew}">${item.ps_oldAndNew ==0?'新':'旧'}</span>
									<span style="width:10%" data-value="${item.ps_bol}">${item.ps_bol ==0?'好':'坏'}</span>
									<span style="width:10%;font-size: 18px;color: #1ABC9C" class="icon-plus" title="添加" onclick="addItemToList(this)"></span>
								</dd>
							</c:forEach>
							<ins class="ins-dw"></ins>
						</dl>
						<dl class="main-box-list" style="float: right;width: 100%;">
							<dt class="item"><span class="item-titile">赔偿费用共</span></dt>
							<dd class="item"><input type="text" maxlength="11" id="bad-item-cost" class="form-control cs_total money" data-name="赔偿费用" readonly><label class="suffix">元</label></dd>
						</dl>
					</div>
				</div>
			</div>
		</c:if>
	</div>
</div>
</body>
</html>