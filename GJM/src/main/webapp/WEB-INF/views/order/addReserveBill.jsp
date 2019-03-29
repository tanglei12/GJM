<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<link href="/resources/css/manage_index.css" rel="stylesheet" type="text/css">
<link type="text/css" rel="stylesheet" href="/resources/css/tenantBill.css">
<link href="/resources/common/uploadify/css/uploadify.css" rel="stylesheet" type="text/css">
<link href="/resources/common/sweet-alert/css/sweet-alert.css" rel="stylesheet" type="text/css">
<link href="/resources/common/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<!-- 时间控件 -->
<script src="/resources/Plug-in/My97DatePicker4.7.2/WdatePicker.js"></script>
<script type="text/javascript" src="/resources/js/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="/resources/js/addReserveBill.js"></script>
<script src="/resources/common/uploadify/js/jquery.uploadify.js"></script>
<!-- 文件上传插件 -->
<link href="/resources/css/contractList/addContract.css" rel="stylesheet" type="text/css">
<!-- 本地CSS -->
<!-- 验证 -->
<link href="/resources/Plug-in/jQuery-Validation-Engine-master/css/validationEngine.jquery.css" rel="stylesheet" type="text/css">
<script src="/resources/Plug-in/jQuery-Validation-Engine-master/js/languages/jquery.validationEngine-zh_CN.js"></script>
<script src="/resources/Plug-in/jQuery-Validation-Engine-master/js/jquery.validationEngine.js"></script>
<script>
	jQuery(document).ready(function() {
		jQuery("#addSubmit").validationEngine();
	});
</script>
<style>
.place {
	height: 2px; background: #3eafe0; position: fixed; width: 100%; margin-top: -30px;
}

.dfs {
	width: 90%; min-width: 1080px; padding: 5px 30px; margin: 50px; background: #fff; border: 4px solid #ebcbbe;
}

.titles {
	display: block; width: 150px; height: 30px; position: relative; color: #333; top: -30px; font-size: 22px; text-align: center; background: white;
}

#info td {
	padding-left: 40px; padding-top: 20px;
}

.jianju {
	margin-left: 12px;
}

.jianjus {
	margin-left: 24px;
}

.jianjuss {
	margin-left: 36px;
}

.jianjusss {
	margin-left: 48px;
}

input[type="text"] {
	width: 179px; height: 34px; border-radius: 4px; border: 1px solid #ccc; text-indent: 5px;
}

textarea {
	width: 179px; height: 64px; border-radius: 4px; border: 1px solid #ccc; text-indent: 5px;
}

.type-label {
	position: relative; top: 1px; border: 2px solid #ccc; color: #888; padding: 4px 18px; font-size: 14px; display: block; float: left; margin-right: 14px; cursor: pointer; -moz-border-radius: 4px; -webkit-border-radius: 4px; border-radius: 4px; float: left;
}

.span-checked {
	border: 2px solid #1ABC9C; color: #1ABC9C;
}

.span-checked i {
	position: absolute; right: 1px; bottom: 1px; width: 14px; height: 14px; background-image: url("/resources/image/true.png"); background-repeat: no-repeat;
}

.delete {
	position: absolute; left: -6px; top: -6px; bottom: 1px; font-size: 16px; width: 12px; height: 12px; color: #666;
}

.type-label input[type="checkbox"] {
	display: none; height: 0; opacity: 0;
}

.btn-info {
	color: #fff; background-color: #5bc0de; border-color: #46b8da;
}

.btn {
	display: inline-block; padding: 6px 12px; margin-bottom: 0; font-size: 14px; font-weight: 400; line-height: 1.42857143; text-align: center; white-space: nowrap; vertical-align: middle; -ms-touch-action: manipulation; touch-action: manipulation; cursor: pointer; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; background-image: none; border: 1px solid transparent; border-radius: 4px;
}

.model-list table tr td {
	height: 36px; line-height: 36px; border-bottom: 1px solid #e1e1e1; text-align: center;
}

.down {
	margin-left: -30px; padding-bottom: 20px; width: 0; height: 0; border-top: 6px solid #3E97C9; border-left: 6px solid transparent; border-right: 6px solid transparent;
}
</style>
<script>
	function changeTypeVer(obj) {
		$(".ver-radio").each(function() {
			$(".ver-radio").parent().removeClass("span-checked");
			$(".ver-radio").removeAttr("checked");
		});
		$(obj).addClass("span-checked");
		$(obj).find("input").attr("checked", true);
	}
</script>
<body style="background: #F5F5F5;">

	<!-- <div style="margin-top: 30px;margin-left: 50px;">
    	<ul>
    		<li style="float:left;line-height:44px;text-align:center; width:100px;height:44px; background-color: #3E97C9;color:#fff;" onclick="changeType1()">收入流水<i class="down"></i></li>
    		<li style="float:left;line-height:44px;text-align:center; width:100px;height:44px; background-color: #fff;color:#000;" onclick="changeType2()">支出流水<i class="down"></i></li>
    	</ul>
    </div> -->
	<form class="form-inline" id="addSubmit" action="/addReserveBill" method="POST" style="margin-top: 30px;">
		<input type="hidden" name="token" value="${token}">
		<div style="margin-left: 20px; background: #fff; width: 90%;">
			<div style="color: #4799E6; font-size: 18px; padding-top: 20px; margin-left: 30px;">添加预定账单</div>
			<div style="width: 100%; height: 1px; background-color: #ccc; margin-top: 10px;"></div>
			<table border="0" id="info" style="margin-bottom: 40px; margin-left: 10px; min-width: 650px;">
				<tr>
					<td style="padding-left: 20px;">
						<dl style="float: left;">
							<dt style="float: left;">房屋编码</dt>
							<dd style="float: left; margin-left: 12px;">
								<div class="main-box-list" style="position: relative;">
									<input type="text" data-validation-engine="validate[required]" class="form-control vaildbox data-change1" id="conhouseno" placeholder="点击搜索房屋" readonly="readonly" required="required" style="width: 300px;">
									<span class="error-tisp"></span>
									<div id="queryList">
										<div id="search-box">
											<input type="text" placeholder="输入房屋编码、房屋地址">
										</div>
										<div id="search-show">
											<div class="search-tisp">没有数据</div>
										</div>
									</div>
								</div>
							</dd>
						</dl>
						<span style="line-height: 30px; margin-left: 24px;" id='tishi'></span>
					</td>
				</tr>
				<tr>
					<td>
						<div style="margin-left: -90px;">
							<!-- 客户信息  -->
							<dl class="main-box-list">
								<dt class="item">
									<span class="item-titile">姓名</span>
								</dt>
								<dd class="item">
									<input type="hidden" id="sign-id" class="sign-0" value="${contractSign.contractSign_Id}">
									<input type="text" data-validation-engine="validate[required]" class="form-control sign-1" id="sign-name" name="rb_name" data-id="sign" placeholder="姓名" onclick="openModel(this,'sginInfo');" readonly required>
									<i class="true-tisp"></i>
									<span class="error-tisp"></span>
								</dd>
								<dd class="tisp"></dd>
							</dl>
							<dl class="main-box-list">
								<dt class="item">
									<span class="item-titile">手机号码</span>
								</dt>
								<dd class="item">
									<input type="text" class="form-control sign-2" id="sign-phone" name="rb_phone" data-id="sign" placeholder="手机号码" onclick="openModel(this,'sginInfo');" readonly required>
									<i class="true-tisp"></i>
									<span class="error-tisp"></span>
								</dd>
								<dd class="tisp"></dd>
							</dl>
							<dl class="main-box-list">
								<dt class="item">
									<span class="item-titile">身份证号</span>
								</dt>
								<dd class="item">
									<input type="text" class="form-control sign-3" id="sign-carNo" name="rb_personNum" data-id="sign" placeholder="身份证号" onclick="openModel(this,'sginInfo');" readonly required>
									<i class="true-tisp"></i>
									<span class="error-tisp"></span>
								</dd>
								<dd class="tisp"></dd>
							</dl>
						</div>
					</td>
				</tr>
				<tr>
					<td style="padding-left: 20px;">
						<div style="margin-top: -20px;">
							<span style="float: left; margin-right: 12px;">合作伙伴</span>
							<c:forEach items="${billPartnersList}" var="billPartners">
								<c:if test="${billPartners.bp_name == '58月付'}">
									<div class="type-label span-checked" onclick="changeTypeVer(this)" for="type3">
										${billPartners.bp_name }
										<i></i>
										<input type="checkbox" checked="checked" class="ver-radio" name="rb_type" value="${billPartners.bp_name }" id="type3">
									</div>
								</c:if>
								<c:if test="${billPartners.bp_name != '58月付'}">
									<div class="type-label" onclick="changeTypeVer(this)" for="type3">
										${billPartners.bp_name }
										<i></i>
										<input type="checkbox" class="ver-radio" name="rb_type" value="${billPartners.bp_name }" id="type3">
									</div>
								</c:if>
							</c:forEach>
						</div>
					</td>
				</tr>
				<tr>
					<td style="padding-left: 20px;">
						定金
						<input type="text" onkeyup="this.value=this.value.replace(/[^0-9]\D*$/,'')" placeholder="定金" readonly style="background-color: #FDF7F7;" class="jianjuss" id="rb_money" name="rb_money">
						&nbsp;&nbsp;&nbsp;元
					</td>
				</tr>
				<tr>
					<td style="padding-left: 20px;">
						预留时间
						<input type="text" placeholder="预留时间" readonly style="background-color: #FDF7F7;" class=" jianju" value="3" name="rb_reserveDate">
						&nbsp;&nbsp;&nbsp;天
					</td>
				</tr>
				<tr>
					<td style="padding-left: 20px;">
						租房月数
						<input type="text" data-validation-engine="validate[required]" onkeyup="this.value=this.value.replace(/[^0-9]\D*$/,'')" placeholder="租房月数" class=" jianju" name="rb_cycle">
						&nbsp;&nbsp;&nbsp;月
					</td>
				</tr>
				<tr>
					<td style="padding-left: 20px; display: none;">
						预留时间
						<input type="text" class="form-control jianju" value="3" id="heState" name="heState">
						&nbsp;&nbsp;&nbsp;天 预留时间
						<input type="text" class="form-control jianju" value="3" id="rb_houseNum" name="rb_houseNum">
						&nbsp;&nbsp;&nbsp;天
					</td>
				</tr>
				<tr>
					<td style="padding-left: 20px;">
						支付状态
						<select class=" jianju" style="width: 150px;" onchange="changeDay();" name="rb_state">
							<option value="已付款">已付款</option>
							<option value="待付款">待付款</option>
						</select>
					</td>
				</tr>
				<tr>
					<td style="padding-left: 20px;">
						备注
						<textarea class="jianjuss" name="rb_remarks" style="width: 500px;" rows="3"></textarea>
					</td>
				</tr>
				<tr>
					<td style="padding-left: 20px;">
						<div style="margin-left: 60px;">
							<input class="btn btn-info" style="width: 70px; margin-bottom: 30px;" onclick="addReserveBill();" type="button" value="提交">
						</div>
					</td>
				</tr>
			</table>
			<div style="width: 400px; display: none; height: 400px; border: 1px solid #abcdef; position: absolute; left: 70%; top: 160px;">
				<div style="color: #4799E6; font-size: 18px; padding-top: 20px; margin-left: 30px;">房屋信息</div>
				<hr>
			</div>
			<hr>

		</div>
	</form>
	<!-- 提示信息 -->
	<div>
		<div class="model-mark"></div>
		<!-- 客户信息 -->
		<div class="model-content window" id="sginInfo">
			<div class="model-drag">
				<span id="model-drag-title">客户资料</span>
				<i onclick="closeModel();" title="按ESC键可以关闭"></i>
			</div>
			<div class="model-main" id="main1">
				<div class="model-search">
					<i class="fa-search"></i>
					<input type="text" id="sginInfo-search" placeholder="客户姓名/手机号码/房屋号">
					<input type="button" id="sginBtn" value="添加客户>>" onclick="moveModelMainLeft();">
				</div>
				<div class="model-list">
					<table>
						<thead>
							<tr>
								<th width="20%">客户姓名</th>
								<th width="10%">性别</th>
								<th width="30%">手机号</th>
								<th width="40%">身份证</th>
							</tr>
						</thead>
						<tbody id="sginInfo-Body"></tbody>
					</table>
				</div>
				<div class="model-footer">
					<span class="foot-left state-ok fa-angle-left" onclick="pageUp();"></span> <span class="foot-left" id="pageNo">1</span> <span class="foot-left state-ok icon-angle-right" onclick="pageDown();"></span>
					<input type="text" class="foot-left" id="pagaText" onkeyup="if(window.event.keyCode==13){jumpPage();}">
					<a class="foot-left" id="pagaGo" onclick="jumpPage();">Go</a>
					<div class="foot-right">
						共<span id="totalPage"></span>页，<span id="totalRecords"></span>条记录
					</div>
				</div>
			</div>
			<div class="model-main" id="main2" style="display: none;">
				<div class="model-main-mark" style="display: none;"></div>
				<div class="model-main-content" style="display: none;">
					保存成功
					<hr>
					<span class="sub-option" onclick="moveModelMainRight()">返回</span> <span class="sub-option" onclick="moveModelMainRight()">选择</span> <span class="sub-option" onclick="closeSubTip()">继续</span>
				</div>
				<dl class="main-box-list">
					<dt class="item">
						<em>*</em><span class="item-titile">姓名</span>
					</dt>
					<dd class="item">
						<input type="text" class="form-control" id="ContractSign_Name" placeholder="姓名" required>
						<span class="error-tisp"></span>
					</dd>
					<dd class="tisp"></dd>
				</dl>
				<dl class="main-box-list">
					<dt class="item">
						<em>*</em><span class="item-titile">手机号码</span>
					</dt>
					<dd class="item">
						<input type="text" class="form-control" id="ContractSign_Phone" placeholder="联系电话" required>
						<span class="error-tisp"></span>
					</dd>
					<dd class="tisp"></dd>
				</dl>
				<hr>
				<dl class="main-box-list">
					<dt class="item">
						<span class="item-titile">性别</span>
					</dt>
					<dd class="item">
						<select class="form-control" id="ContractSign_Sex">
							<option value="1">男</option>
							<option value="2">女</option>
						</select>
					</dd>
					<dd class="tisp"></dd>
				</dl>
				<dl class="main-box-list">
					<dt class="item">
						<em>*</em><span class="item-titile">身份证号</span>
					</dt>
					<dd class="item">
						<input type="text" class="form-control" id="ContractSign_CarNo" placeholder="证件号" required>
						<span class="error-tisp"></span>
					</dd>
					<dd class="tisp"></dd>
				</dl>
				<hr>
				<dl class="main-box-list">
					<dt class="item">
						<span class="item-titile">开户行</span>
					</dt>
					<dd class="item">
						<select class="form-control" id="ContractSign_Bank">
							<c:forEach items="${bankTypeList}" var="item">
								<option value="${item.contractType_Id}">${item.contractType_Name}</option>
							</c:forEach>
						</select>
					</dd>
					<dd class="tisp"></dd>
				</dl>
				<dl class="main-box-list">
					<dt class="item">
						<span class="item-titile">账户名</span>
					</dt>
					<dd class="item">
						<input type="text" class="form-control" id="ContractSign_CarName" placeholder="账户名">
						<span class="error-tisp"></span>
					</dd>
					<dd class="tisp"></dd>
				</dl>
				<dl class="main-box-list">
					<dt class="item">
						<span class="item-titile">银行卡号</span>
					</dt>
					<dd class="item">
						<input type="text" class="form-control" id="ContractSign_BCNo" placeholder="银行卡号">
						<span class="error-tisp"></span>
					</dd>
					<dd class="tisp"></dd>
				</dl>
				<dl class="main-box-list">
					<dt class="item">
						<span class="item-titile">座机电话</span>
					</dt>
					<dd class="item">
						<input type="text" class="form-control" id="ContractSign_Tel" placeholder="例：023xxxxxxxx">
					</dd>
					<dd class="tisp"></dd>
				</dl>
				<hr>
				<dl class="main-box-list">
					<dt class="item">
						<span class="item-titile">QQ</span>
					</dt>
					<dd class="item">
						<input type="text" class="form-control" id="ContractSign_QQ" placeholder="QQ">
					</dd>
					<dd class="tisp"></dd>
				</dl>
				<dl class="main-box-list">
					<dt class="item">
						<span class="item-titile">邮箱</span>
					</dt>
					<dd class="item">
						<input type="text" class="form-control" id="ContractSign_Email" placeholder="邮箱">
					</dd>
					<dd class="tisp"></dd>
				</dl>
				<hr>
				<dl class="main-box-list">
					<dt class="item">
						<span class="item-titile">微信</span>
					</dt>
					<dd class="item">
						<input type="text" class="form-control" id="ContractSign_weixin" placeholder="微信">
					</dd>
					<dd class="tisp"></dd>
				</dl>
				<dl class="main-box-list">
					<dt class="item">
						<span class="item-titile">工作单位</span>
					</dt>
					<dd class="item">
						<input type="text" class="form-control" id="ContractSign_Work" placeholder="工作单位">
					</dd>
					<dd class="tisp"></dd>
				</dl>
				<hr>
				<dl class="main-box-list">
					<dt class="item">
						<span class="item-titile">银行卡照片</span>
					</dt>
					<dd class="item">
						<div class="images-box" id="bankFileBox">
							<input type="file" name="bankFile" id="bankFile" class="input-file" />
						</div>
					</dd>
					<dd class="tisp">
						<span><span id="bank-tisp">0</span>/1</span>
					</dd>
				</dl>
				<hr>
				<dl class="main-box-list main-box-bottom">
					<dt class="item">&nbsp;</dt>
					<dd class="item">
						<input type="button" value="保存" id="saveSgin" class="btn" onclick="saveSgin(this)" />
						<input type="button" value="保存并选择" id="saveSgin" class="btn" onclick="saveSgin(this,'choose')" style="margin-left: 50px;" />
						<input type="button" value="取消" id="saveSgin" class="btn" onclick="moveModelMainRight()" style="margin-left: 50px;" />
						<span class="error-tisp"></span>
					</dd>
				</dl>
				<hr>
			</div>
		</div>
	</div>
	<script>
		followInter('${param.code}', '${param.name}', '${param.phone}')
		function changeDay() {
			var s = $("select[name='rb_state']").val();
			if (s == '已付款') {
				$("input[name='rb_reserveDate']").val("3");
			}
			if (s == '待付款') {
				$("input[name='rb_reserveDate']").val("0");
			}
		}
	</script>
</body>
</html>