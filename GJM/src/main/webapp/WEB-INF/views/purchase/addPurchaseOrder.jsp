<%@page import="com.gjp.util.AppUtil"%>
<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE>
<html>
<head>
<title>跟进房源</title>
<link href="/resources/css/manage_index.css" rel="stylesheet" type="text/css">
<link href="/resources/css/common/common.css" rel="stylesheet" type="text/css">
<link href="/resources/common/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<!-- 弹窗警示样式 -->
<link href="/resources/common/sweet-alert/css/sweetalert.css" rel="stylesheet" type="text/css">
<!-- jBox皮肤样式 -->
<link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">
<!-- 多选按钮 -->
<link href="/resources/css/contractList/displayContract.css" rel="stylesheet" type="text/css">
<link href="/resources/css/purchase/addPurchaseOrder.css" rel="stylesheet" type="text/css">


<script src="/resources/js/jquery-1.7.2.min.js"></script>
<script src="/resources/js/common/common.js"></script>
<!-- 弹窗警示样式 -->
<script src="/resources/common/sweet-alert/js/sweetalert-dev.js"></script>
<!-- cookie -->
<script src="/resources/js/product/jquery-cookie.js"></script>
<!-- 日期控件 -->
<script src="/resources/common/My97DatePicker/WdatePicker.js"></script>
<!-- jBox -->
<script src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js" charset="utf-8" ></script>
<script src="/resources/Plug-in/jbox-v2.3/jBox/i18n/jquery.jBox-zh-CN.js" charset="utf-8"></script>

<script src="/resources/js/purchase/addPurchaseOrder.js"></script>

</head>
<body>
<input type="hidden" value="${pur_code }" id="pur_code">
	<!-- 物品库存信息 -->
	<div id="contentDiv" style="margin-top: 0px;">
		<!-- 采购单 -->
		<div class="purchase">
			<!-- 标题 -->
			<div class="purTitle">
				
				<div class="titleDiv">
					物品申购单
					<div class="titleNoDiv">
					${pur_code }
					</div>
				</div>
				<div class="titleDateDiv" style="margin-left: 5px;float: left;">
					<dl>
						<dt>订单状态：</dt>
						<dd><span id="purType"></span></dd>
					</dl>
				</div>
				<div class="titleDateDiv">
					<dl>
						<dt>申购日期：</dt>
						<dd><fmt:formatDate value="${dateTime }" type="date"/></dd>
					</dl>
				</div>
				<div class="tableDiv">
					<div>
					<table style="margin-top: 10px;font-size: 14px;">
						<tbody>
							<tr style="color: #000;line-height: 40px;border-bottom: 1px #ddd solid;">
								<td>名称</td>
								<td>类型</td>
								<td>品牌</td>
								<td>单价</td>
								<td>数量</td>
								<td>总价</td>
								<td>规格</td>
								<td>新旧</td>
								<td>付费对象</td>
								<td>备注</td>
							</tr>
							<!-- <tr>
								<td>空调</td>
								<td>家电</td>
								<td>美的</td>
								<td>2800.00</td>
								<td>2</td>
								<td>5600.00</td>
								<td>KFR-72LW/SY-PA400(D3)</td>
								<td>新</td>
								<td>公司</td>
								<td>公司采购</td>
							</tr> -->
							
						</tbody>
					</table>
					</div>
					<!-- 采购单添加 -->
			<div class="addPurchaseDiv" id="addPurchaseDivID">
				<input type="text" value="${cno_code }" id="pur_addres" name="pur_addres">
				<div  style="margin-top: 25px;">
					<dl>
						<dt><em>*</em>类型：</dt>
						<dd>
							<select style="text-align: center;" id="art_type" onchange="selectHouseTypeParent3(this.value)">
							</select>
						</dd>
					</dl>
						
					<dl>
						<dt><em>*</em>名称：</dt>
						<dd>
							<input type="hidden" value="" id="artnames" name="artnames">
							<select id="art_name" onchange="getOtherName(this.value)" style="width: 140px;float: left;">
								<option value="">--请选择--</option>
							</select>
							<div id="art_nameDiv" style="float: left;display: none;margin-left: 5px;">
								<input type="text" value="" id="art_names" name="art_names" class="countentText" style="width: 80px;">
							</div>
						</dd>
					</dl>
					<!-- <dl id="artNamesDl">
						<dd>
							<input type="text" value="" id="artNames" name="artNames" class="countentText">
						</dd>
					</dl>
					 -->
					<dl>
						<dt><em>*</em>规格：</dt>
						<dd>
							<input value="" id="art_spec" name="art_spec" class="countentText">
						</dd>
					</dl>
					<dl>
						<dt>品牌：</dt>
						<dd>
							<input value="" id="art_brand" name="art_brand" class="countentText">
						</dd>
					</dl>
					<dl>
						<dt><em>*</em>新旧：</dt>
						<dd>
							<!-- <input value="" id="art_on" name="art_on" class="countentText"> -->
							<select id="art_on">
								<option value="0">新</option>
								<option value="1">旧</option>
							</select>
						</dd>
					</dl>
					<dl>
						<dt><em>*</em>单价：</dt>
						<dd>
							<input value="" id="art_price" name="art_price" class="countentText money"
								style="width: 120px;" onchange="getPriceSum()">（元）
						</dd>
					</dl>
					<dl>
						<dt><em>*</em>数量：</dt>
						<dd>
							<input value="1" id="art_count" name="art_count" class="countentText number" onkeydown="getPriceSum()">
						</dd>
					</dl>
					<dl>
						<dt><em>*</em>总价：</dt>
						<dd>
							<input value="0.00" id="art_priceSum" name="art_priceSum" class="countentText money" 
								readonly="readonly" style="background-color: #eee;width: 120px;">（元）

						</dd>
					</dl>
					<dl>
						<dt><em>*</em>付费对象：</dt>
						<dd>
							<select id="art_payer">
								<option value="">请选择</option>
								<option value="公司">公司</option>
								<option value="租客">租客</option>
								<option value="房东">房东</option>
							</select>
						</dd>
					</dl>
					<dl style="width: 55%;">
						<dt>备注：</dt>
						<dd>
							<input value="" id="art_remark" name="art_remark" class="countentText" style="width: 475px;">
						</dd>
					</dl>
					<div style="width: 20%;margin-bottom: 15px;float: left;" >
						<!-- <input type="button" value="添加" class="submitPur" onclick="submitArt()"> -->
						<!-- <a href="" class="submitPur" onclick="submitArt()">添加</a> -->
						<button class="submitPur" id="submitPur" onclick="submitArt()">添加</button>
					</div>
				</div>
			</div>
			
				</div>
				<div class="addPurchaseDiv" style="border: none;margin-top: 10px;color: #666;">
					<dl>
						<dt style="font-size: 12px;">申请人：<%=AppUtil.getCookieEmployee().getEm_name()%></dt>
						<dd>
						</dd>
					</dl>
					<dl>
						<dt style="font-size: 12px;">经办人：</dt>
						<dd>
						</dd>
					</dl>
					<dl>
						<dt style="font-size: 12px;">审核：</dt>
						<dd>
						</dd>
					</dl>
					<dl>
						<dt style="font-size: 12px;">复核：</dt>
						<dd>
						</dd>
					</dl>
				</div>
			</div>
			
			<div>
				<dl style="width: 100%;margin-bottom: 30px;margin-top: 30px;">
					<dd style="width: 100%;text-align: center;">
						<input type="button" value="提交审核" class="submitPur" id="submitSugges">
					</dd>
				</dl>
			</div>
		</div>
	</div>
</body>
</html>
