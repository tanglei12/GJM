<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!-- 底部 css样式 -->
<link href="/resources/css/serve/orderProcess.css" rel="stylesheet" type="text/css">
<link href="/resources/css/manage_index.css" rel="stylesheet" type="text/css">
<link href="/resources/css/body.css" rel="stylesheet" type="text/css">
<link href="/resources/css/serve/addService.css" rel="stylesheet" type="text/css">

<script src="/resources/js/jquery-1.7.2.min.js"></script>
<script src="/resources/js/service/showListInfo.js"></script>

<!-- 位置栏 -->

<!-- 主体内容 -->
<div id="main-box">
	<!-- 状态 -->
	<div id="main-box-title">
		<a class="title-sub">服务申请</a>
		<span class="title-bottom"></span>
		<a class="title-sub">服务受理</a>
		<span class="title-bottom"></span>
		<a class="title-sub">业务处理</a>
		<span class="title-bottom"></span>
		<a class="title-sub">客服回访</a>
		<span class="title-bottom"></span>
		<a class="title-sub">完成</a>
	</div>
	<!-- 申报信息 -->
	<div class="main-box-info" id="info1">
		<div id="info-applyInfo">
			<div class="info-title"><span>服务申报信息</span></div>
			<div class="info-main">
				<dl>
					<dt>服务类型</dt><dd>${declaration.md_type}</dd>
				</dl>
				<dl class="info-dl">
					<dt>问题描述</dt><dd>${declaration.md_problem}</dd>
				</dl>
				<dl class="info-dl">
					<dt>服务申请类型</dt><dd>${declaration.md_applyType==""?'&nbsp;':declaration.md_applyType}</dd>
					<dt>申报来源</dt><dd>${declaration.md_source==""?'&nbsp;':declaration.md_source}(${declaration.applyer==""?'&nbsp;':declaration.applyer})</dd>
				</dl>
				<c:if test="${declaration.md_phone != '' && declaration.md_phone != null}">
				<dl class="info-dl">
					<dt>付费姓名</dt>
					<dd>${declaration.md_people==''?'&nbsp;':declaration.md_people}</dd>
					<dt>付费人电话</dt>
					<dd>${declaration.md_phone}</dd>
				</dl>
				</c:if>
				<dl class="info-dl">
					<dt>联系人</dt>
					<dd>${declaration.md_contactpeople==''?'&nbsp;':declaration.md_contactpeople}</dd>
					<dt>联系人电话</dt>
					<dd>${declaration.md_contactPhone}</dd>
				</dl>
				<dl class="info-dl">
					<dt>房屋地址</dt><dd>${declaration.propertyInfo_Name}${declaration.hi_address}</dd>
				</dl>
				<dl class="info-dl">
					<dt>申报时间</dt><dd><fmt:formatDate value="${declaration.md_time}" pattern="yyyy-MM-dd HH:mm:ss"/></dd>
				</dl>
				<dl class="info-dl">
					<dt>受理状态</dt>
					<dd>${declaration.md_state =='未受理'?'<span style="color:#F39C12;font-size:14px;">未受理</span>':(declaration.md_state=='已受理'?'<span style="color:#27AE60;font-size:14px;">已受理</span>':'<span style="color:#E74C3C;font-size:14px;">终止受理</span>')}</dd>
				</dl>
				<dl class="info-dl" style="height: auto;">
					<dt>图片描述</dt>
					<dd style="margin-top: 9px;">
						<c:forEach items="${imageList}" var="item" varStatus="status">
							<img src="${item.mi_path}" width="110" height="110">
						</c:forEach>
					</dd>
				</dl>
			</div>
		</div>
	</div>
	<!-- 服务受理 -->
	<div class="main-box-info" id="info2">
		<div id="info-applyInfo">
			<div class="info-title"><span>服务受理</span></div>
			<div class="info-main">
				<c:if test="${not empty clearOrder}">
					<dl class="info-dl">
						<dt>服务订单号</dt>
						<dd>${clearOrder.bco_code}</dd>
					</dl>
					<dl class="info-dl">
						<dt>客户支付费用</dt><dd><fmt:formatNumber value="${clearOrder.bco_shouldMoney}" pattern="#.##"/><span style="margin-left: 6px;font-size: 14px;">元</span></dd>
					</dl>
					<dl class="info-dl">
						<dt>保洁次数</dt><dd>已做${declaration.thereNum}次，共${clearOrder.bco_num}次</dd>
					</dl>
				</c:if>
				<dl class="info-dl">
					<dt>派工人员</dt><dd>${employee.em_name==null?'&nbsp;':employee.em_name}</dd>
					<dt>联系电话</dt><dd>${employee.em_phone}</dd>
				</dl>
				<dl class="info-dl">
					<dt>派工时间/受理时间</dt><dd><fmt:formatDate value="${dispatching.mdg_time}" pattern="yyyy-MM-dd HH:mm:ss"/></dd>
				</dl>
			</div>
		</div>
	</div>
	<!-- 订单跟进 -->
	<div class="main-box-info" id="info3">
		<div id="info-applyInfo">
			<div class="info-title"><span>服务跟进</span></div>
			<div class="info-main">
				<dl class="info-dl">
					<dt>服务状态</dt>
					<dd>${tracks.mtk_state=='yes'?'服务完成':(tracks.mtk_state=='no'?'服务中':(tracks.mtk_state=='auditing'?'申请审核':'出现问题'))}<dd>
				</dl>
				<dl class="info-dl">
					<dt>特殊情况说明</dt>
					<dd>${tracks.mtk_spe_cir}</dd>
				</dl>
				<dl class="info-dl">
					<dt>图片说明</dt>
					<dd style="margin-top: 9px;">
						<c:forEach items="${tracksImglist}" var="item">
							<img alt="" src="${item.mpe_path}" style="float: left;margin-right: 6px;display: block;width: 110px;height: 110px;" >
						</c:forEach>
					</dd>
				</dl>
			</div>
		</div>
	</div>
	<!-- 处理进度 -->
	<div class="main-box-info" id="info4">
		<div id="info-applyInfo">
			<div class="info-title"><span>处理进度</span></div>
			<div class="info-main">
				<c:forEach items="${orderVoList}" var="item">
					<dl class="info-dl" style="height: auto;line-height: normal;padding-bottom: 8px;">
						<dt>
							<span style="display: block;font-size: 14px;color: #222;"><fmt:formatDate value="${item.mo_date}" pattern="yyyy-MM-dd"/></span>
							<span><fmt:formatDate value="${item.mo_date}" pattern="HH:mm:ss"/></span>
						</dt>
						<dd>${item.mo_content}</dd>
					</dl>
				</c:forEach>
			</div>
		</div>
	</div>
	<!-- 服务清单 -->
	<c:if test="${not empty serviceMoneyList}">
		<div class="main-box-info" id="info6">
		<div id="info-applyInfo">
			<div class="info-title"><span>服务清单</span></div>
			<div class="info-main">
				<dl>
					<dd style="margin-left: 20px; width: 900px; height: auto; overflow: hidden; margin-bottom: 20px; line-height: 0;">
						<table class="moneyTable">
							<thead>
								<tr>
									<td colspan="6" align="center" style="font-size: 16px; height: 36px;">费用列表(清单编码：${declaration.mdg_moneyCode})</td>
								</tr>
								<tr>
									<td>费用来源</td>
									<td>单价(元)</td>
									<td>数量</td>
									<td>单位</td>
									<td>总价(元)</td>
									<td>备注</td>
								</tr>
							</thead>
							<tbody>
								<c:forEach items="${serviceMoneyList}" var="item">
									<tr>
										<td>${item.ssm_source}</td>
										<td>${item.ssm_univalent}</td>
										<td>${item.ssm_num}</td>
										<td>${item.ssm_company}</td>
										<td>${item.ssm_money}</td>
										<td>${item.ssm_beizhu}</td>
									</tr>
								</c:forEach>
							</tbody>
						</table>
					</dd>
				</dl>
			</div>
		</div>
	</div>
	</c:if>
	<!-- 服务回访 -->
	<c:if test="${not empty userCenterUserFraction}">
		<div class="main-box-info" id="info7" style="padding-bottom: 20px;">
		<div id="info-applyInfo">
			<div class="info-title"><span>服务回访</span></div>
			<div class="info-main">
				<dl class="info-dl">
					<dt>服务评分</dt>
					<dd>${userCenterUserFraction.uf_fraction}分<dd>
				</dl>
				<dl class="info-dl">
					<dt>服务评价</dt>
					<dd>${userCenterUserFraction.uf_content}<dd>
				</dl>
				<dl class="info-dl">
					<dt>评价图片</dt>
					<dd>
						<c:forEach items="${userCenterUserFraction.uf_image.split('-')}" var="customer">
               			<div style="float: left;height: 100px;margin-left:10px; line-height: 100px; width: 100px; border-radius: 3px;"><img src="${customer}" style="width: 100px; height: 100px;"/></div>
            			</c:forEach>
					<dd>
				</dl>
			</div>
		</div>
	</div>
	</c:if>
</div>
<script type="text/javascript">
init();
function init(){
	var state = "${declaration.md_state}";
	if(state == "未受理"){
		var $obj =$("#main-box-title");
		$(".title-sub").removeClass("title-sub-over").removeClass("title-sub-ok");
		$(".title-bottom").removeClass("title-bottom-over").removeClass("title-bottom-ok");
		var inum = 1;
		$obj.find(".title-sub").each(function(index){
			if(index < inum){
				$(this).addClass("title-sub-over");
			}
			if(index == inum){
				$(this).addClass("title-sub-ok");
			}
		});
		$(".main-box-info").hide();
		$("#info1").show();
	} else {
		var state = "${state}";
		var $obj =$("#main-box-title");
		$(".title-sub").removeClass("title-sub-over").removeClass("title-sub-ok");
		$(".title-bottom").removeClass("title-bottom-over").removeClass("title-bottom-ok");
		var inum =parseInt(state);
		$obj.find(".title-sub").each(function(index){
			if(index < inum){
				$(this).addClass("title-sub-over");
			}
			if(index == inum){
				$(this).addClass("title-sub-ok");
			}
		});
		$obj.find(".title-bottom").each(function(index){
			if(index < inum){
				$(this).addClass("title-bottom-over");
			}
			if(index == inum){
				$(this).addClass("title-bottom-ok");
			}
		});
		$(".main-box-info").hide();
		$("#info1").show();
		$("#info2").show();
		$("#info3").show();
		$("#info4").show();
		$("#info6").show();
		$("#info7").show();
	}
}
</script>