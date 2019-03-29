<%@ page language="java" pageEncoding="utf-8"%>
<!DOCTYPE>
<html>
<head>
<title>意向房源</title>
</head>
<link href="/resources/css/common/common.css" rel="stylesheet" type="text/css">
<link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href="/resources/css/table-min.css" rel="stylesheet" type="text/css" />
<link href="/resources/css/houseIntention/intention.css" rel="stylesheet" type="text/css">
<link href="/resources/common/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href="/resources/common/swipeslider-develop/dist/swipeslider.css" rel="stylesheet" type="text/css">
<link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">
<link href="/resources/css/product/addInitIntention.css" rel="stylesheet" type="text/css">
<link href="/resources/css/contractList/displayContract.css" rel="stylesheet" type="text/css">
<link href="/resources/common/sweet-alert/css/sweet-alert.css" rel="stylesheet" type="text/css">
<link href="/resources/css/houseIntention/addInitIntentionText.css" rel="stylesheet" type="text/css">

<script src="/resources/js/jquery-1.7.2.min.js"></script>
<script src="/resources/js/common/common.js"></script>
<script src="/resources/js/table-min.js"></script>
<script src="/resources/js/manage_index_right.js"></script>
<script src="/resources/common/My97DatePicker/WdatePicker.js"></script>
<script src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js" charset="utf-8"></script>
<script src="/resources/Plug-in/jbox-v2.3/jBox/i18n/jquery.jBox-zh-CN.js" charset="utf-8"></script>
<script src="/resources/js/product/jquery-cookie.js"></script>
<script src="/resources/js/intention/image-upload.js"></script>
<script src="/resources/js/intention/imageEdit.js"></script>
<script src="/resources/common/sweet-alert/js/sweet-alert.min.js"></script><!-- 提示弹窗 -->
<script src="/resources/js/intention/houseIntentionNew.js"></script>
</head>
<style>
.common-checkbox{
    position: relative;
    height: 20px;
    line-height: 20px;
    width: auto;
    text-indent: 25px;
    display: block;
    float: left;
    cursor: pointer;
    -moz-user-select: none;
    -webkit-user-select: none;
}
</style>
<body>
	<div id="content"></div>

	<div class="cd-popup3">
		<div class="cd-popup-container3" id="cd-popup-container3">
			<div id="cd-buttons">
				<div style="margin: auto; width: 90%; text-align: center; padding: 15px 0px; border-bottom: 1px solid #06B;" id="titleInsert">
					<input type="text" value="客户信息录入" id="inputtext" name="inputtext" style="border: none; text-align: center; font-size: 20px; color: #3E97C9; font-family: 微软雅黑; -moz-user-select: none; -webkit-user-select: none; cursor: default;" readonly="readonly">
				</div>
				<dl style="width: 83%;margin-top: 20px;">
					<dt>
						<em>*</em>&nbsp;房东姓名：
					</dt>
					<dd>
						<input value="" id="phi_user" name="phi_user" placeholder="房东姓名" onKeyUp="inputMsg(this.id)" onblur="inptBulr(this.id)" class="updateInput">
					</dd>
				</dl>
				<dl style="width: 66%;">
					<dt>
						<em>*</em>&nbsp;房东电话：
					</dt>
					<dd>
						<input value="" id="useriphone" onblur="chenkphone(this.value)" name="useriphone" placeholder="房东电话" class="updateInput number">
					</dd>
				</dl>
				<dl style="width: 83%;">
					<dt>
						<em>*</em>&nbsp;证件类型：
					</dt>
					<dd>
						<select id="cc_cardType" onchange="" name="cc_cardType" class="updateInput">
							<option value="-1">请选择</option>
							<option value="1">身份证</option>
							<option value="2">军官证</option>
							<option value="3">商户号</option>
							<option value="4">护照</option>
							<option value="5">台湾居民通行证</option>
							<option value="6">香港居民通行证</option>
							<option value="7">临时身份证</option>
							<option value="8">外国人永久居留证</option>
						</select>
					</dd>
				</dl>
				<dl style="width: 45%;">
					<dt>
						<em>*</em>&nbsp;证件号码：
					</dt>
					<dd>
						<input value="" id="cc_cardNum" name="cc_cardNum" placeholder="证件号码" class="updateInput" onblur="checkCardNum(this);">
					</dd>
				</dl>
				<dl style="width: 45%;">
					<dt>房东性别：</dt>
					<dd style="padding-top: 5px;">
						<label class="common-checkbox" style="margin-left: 0px;">
							<input type="radio" name="phi_user_sex" value="女士">女士
						</label>
						<label class="common-checkbox" style="margin-left: 35px;">
							<input type="radio" name="phi_user_sex" value="先生">先生
						</label>
					</dd>
				</dl>
				<dl style="width: 83%;">
					<dt>
						<em>*</em>&nbsp;所属小区：
					</dt>
					<dd style="width: 80%;">
						<label class="item" id="propertyInfo_idGroups" for="properid" style="position: relative; float: left;" onmouseleave="onMouseLeave()"> <input type="text" class="form-control updateInput" id="properid" name="propertyInfo_id" placeholder="所属物业" style="margin-right: 12px; text-align: left; width: 175px; position: relative; float: left;" readonly required>
						</label> <label class="tisp"> </label>
					</dd>
				</dl>
				<div id="houseReadoDiv" style=""></div>
				<dl style="width: 45%;">
					<dt>
						<em>*</em>&nbsp;房源户型：
					</dt>
					<dd>
						<input value="" id="hi_houseS" name="hi_houseS" placeholder="室" class="updateInput min-short number" onKeyUp="inputMsg(this.id)" onblur="inptBulr(this.id)">
						<span class="block">室</span>
						<input value="" id="hi_houseT" name="hi_houseT" placeholder="厅" class="updateInput min-short number">
						<span class="block">厅</span>
						<input value="" id="hi_houseW" name="hi_houseW" placeholder="卫" class="updateInput min-short number">
						<span class="block">卫</span>
					</dd>
				</dl>
				<dl style="width: 45%;">
					<dt>
						<em>*</em>&nbsp;房东报价：
					</dt>
					<dd>
						<input value="" id="phi_money" name="phi_money" placeholder="房东报价   元/月" class="updateInput number" onKeyUp="inputMsg(this.id)" onblur="inptBulr(this.id)">
					</dd>
				</dl>
				<div class="col-md-12  modelAdd" style="width: 300px; margin: auto;">
					<input class="btn btn-info pull-left" id="addHouseIn" style="" onclick="submitT(this)" type="button" value=" 提  交  " />
				</div>
			</div>
			<a href="#0" class="cd-popup-close" style="color: red;">X</a>
		</div>
	</div>
</body>
</html>
