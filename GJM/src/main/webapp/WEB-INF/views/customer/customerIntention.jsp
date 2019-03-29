\<%@ page language="java" pageEncoding="utf-8"%>
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
<title>客户信息</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="Expires" CONTENT="0">
<meta http-equiv="Cache-Control" CONTENT="no-cache">
<meta http-equiv="Pragma" CONTENT="no-cache">
<!-- CSS样式 -->
<link href="/resources/css/table-min.css" rel="stylesheet" type="text/css" /><!-- 表格样式 -->
<link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"><!-- 字体图标 -->
<link href="/resources/common/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href="/resources/common/zyupload/skins/zyupload-1.0.0.css" rel="stylesheet" type="text/css"><!-- 文件上传插件 -->
<link href="/resources/css/manage_index.css" rel="stylesheet" type="text/css">
<link href="/resources/css/common/common.css" rel="stylesheet" type="text/css">
<link href="/resources/common/sweet-alert/css/sweet-alert.css" rel="stylesheet" type="text/css">
<link href="/resources/common/swipeslider-develop/dist/swipeslider.css" rel="stylesheet" type="text/css">
<link href="/resources/css/houseIntention/intention.css" rel="stylesheet" type="text/css">
<link href="/resources/css/product/addInitIntention.css" rel="stylesheet" type="text/css">
<link href="/resources/css/contractList/displayContract.css" rel="stylesheet" type="text/css">
<link href="/resources/css/houseIntention/addInitIntentionText.css" rel="stylesheet" type="text/css">

<!-- JS脚本 -->
<script src="/resources/js/jquery-1.7.2.min.js"></script>
<script src="/resources/js/common/common.js"></script>
<script src="/resources/js/table-min.js"></script><!-- 表格公共js -->
<script src="/resources/common/zyupload/zyupload-1.0.0.js"></script><!-- 文件上传插件 -->
<script src="/resources/js/manage_index_right.js"></script>
<script src="/resources/common/sweet-alert/js/sweet-alert.min.js"></script><!-- 提示弹窗 -->
<script src="/resources/js/product/jquery-cookie.js"></script><!-- COOKIE -->
<script src="/resources/js/customer/customerIntention.js"></script>
</head>
<style>
#content{
    padding: 14px 12px;
    min-width: 1405px;
}
.fa-home{
	font-size: 15px;
	color: #3498DB;
	margin-top: 10px;
}
a{
text-indent: 2px;
color:#666;
}
dl {
    float: left; 
    width: 33%;
    margin-bottom: 0px;
    min-height: 45px;
}
.common-checkbox{
    position: relative;
    height: 20px;
/*     line-height: 20px;  */
    width: auto; 
/*     text-indent: 25px;  */
    display: block; 
    float: left; 
    cursor: pointer; 
    -moz-user-select: none; 
    -webkit-user-select: none; 
} 
</style>
<body>
<div id="content">
	<!-- 数据读取 -->
</div>
<div class="cd-popup3" style="display:none;">
		<div class="cd-popup-container3" id="cd-popup-container3">
			<div id="cd-buttons">
				<div style="margin: auto; width: 90%; text-align: center; padding: 15px 0px; border-bottom: 1px solid #06B;" id="titleInsert">
					<input type="text" value="预约客户录入" id="inputtext" name="inputtext" style="border: none; text-align: center; font-size: 20px; color: #3E97C9; font-family: 微软雅黑; -moz-user-select: none; -webkit-user-select: none; cursor: default;" readonly="readonly">
				</div>
				<input type="hidden" name="cc_id">
				<input type="hidden" name="cc_code2">
				<dl style="width: 45%;margin-top: 20px;">
					<dt><em>*</em>&nbsp;客户姓名：</dt>
					<dd>
						<input value="" id="ci_name" name="ci_name" placeholder="客户姓名" class="updateInput">
					</dd>
				</dl>
				<dl style="width: 45%;margin-top: 20px;">
					<dt><em>*</em>&nbsp;客户性别：</dt>
					<dd style="margin-top: 5px;">
						<label class="common-checkbox" style="margin-left: 0px;">
							<input type="radio" name="ci_sex" value="0">女士
						</label>
						<label class="common-checkbox" style="margin-left: 35px;">
							<input type="radio" name="ci_sex" value="1">先生
						</label>
					</dd>
				</dl>
				<dl style="width: 45%;float:left;">
					<dt>
						<em>*</em>&nbsp;客户电话：
					</dt>
					<dd>
						<input value="" id="ci_phone" onkeyup="" name="ci_phone" placeholder="客户电话" class="updateInput">
					</dd>
				</dl>
				<dl style="width: 45%;">
					<dt><em>*</em>&nbsp;客户类型：</dt>
					<dd style="margin-top: 5px;">
						<label class="common-checkbox" style="margin-left: 0px;">
							<input type="radio" name="ci_type" value="1">意向房东
						</label>
						<label class="common-checkbox" style="margin-left: 10px;">
							<input type="radio" name="ci_type" value="2">意向租客
						</label>
					</dd>
				</dl>
				<dl style="width: 45%;">
					<dt>证件类型：</dt>
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
					<dt>证件号码：</dt>
					<dd>
						<input value="" id="cc_cardNum" name="cc_cardNum" placeholder="证件号码" class="updateInput" onblur="checkCardNum(this);">
					</dd>
				</dl>
				<dl style="width: 45%;">
					<dt>证件正面：</dt>
					<dd style="width: 110px; min-width: 110px; height: auto;" id="frontCard">
						<div class="images-box">
							<div class="images-btn" data-type="CD1" data-url="/customer/imageUpload" data-del-url="/customer/deleteImage"  style="display: inline-block;">选择图片</div>
						</div>
					</dd>
					<dd class="tisp" style="height:24px; line-height: 24px; margin-left: 99px;"><span id="CD1-count">0</span>/<span id="CD1-limit">1</span></dd>
				</dl>
				<dl style="width: 45%;">
					<dt>证件反面：</dt>
					<dd style="width: 110px; min-width: 110px; height: auto;" id="inverseCard">
						<div class="images-box" id="CD2-box">
							<div class="images-btn" data-box="CD2upload" data-type="CD2" data-url="/customer/imageUpload"  data-del-url="/customer/deleteImage"  style="display: inline-block;">选择图片</div>
						</div>
					</dd>
					<dd class="tisp" style="height:24px; line-height: 24px; margin-left: 99px;"><span id="CD2-count">0</span>/<span id="CD2-limit">1</span></dd>
				</dl>
				<dl style="width: 100%;" id="house_address_DL">
					<dt>
						<em>*</em>&nbsp;客户需求：
					</dt>
					<dd>
						<input value="" style="width: 500px;" id="customer_need" name="customer_need" placeholder="客户需求" class="updateInput"/>
					</dd>
				</dl>
				<dl style="width: 100%;">
					<dt>
						&nbsp;客户备注：
					</dt>
					<dd>
						<input value="" style="width: 500px;" id="contact_result" name="contact_result" placeholder="客户备注" class="updateInput"/>
					</dd>
				</dl>
				<div class="col-md-12  modelAdd" style="width: 300px; margin: auto;">
					<input class="btn btn-info pull-left" id="addHouseIn" style="" onclick="submitText(this)" type="button" value=" 提  交  " />
				</div>
			</div>
			<div id="showCustInfo" style="display:none;">
				<div style="margin: auto; width: 90%; text-align: center; padding: 15px 0px; border-bottom: 1px solid #06B;" id="titleInsert">
					<label style="border: none; text-align: center; font-size: 20px; color: #3E97C9; font-family: 微软雅黑; -moz-user-select: none; -webkit-user-select: none; cursor: default;">
						客户已存在，信息如下，请确认：
					</label>
				</div>
				<dl style="width:55%;margin-top:20px;">
					<dt>&nbsp;客户名称: &nbsp;&nbsp;</dt>
					<dd style="text-align: left;">
						<label ></label><input type="hidden" id="cc_code2Hide">
					</dd>
				</dl>
				<dl style="width:55%;">
					<dt>&nbsp;客户性别: &nbsp;&nbsp;</dt>
					<dd style="text-align: left;">
						<label ></label><input type="hidden" id="sexHide">
					</dd>
				</dl>
				<dl style="width:55%;">
					<dt>&nbsp;客户电话: &nbsp;&nbsp;</dt>
					<dd style="text-align: left;">
						<label ></label>
					</dd>
				</dl>
				<dl style="width:55%;">
					<dt>&nbsp;证件类型: &nbsp;&nbsp;</dt>
					<dd style="text-align: left;">
						<label ></label><input type="hidden" id="cardTypeHide">
					</dd>
				</dl>
				<dl style="width:55%;">
					<dt>&nbsp;证件号码: &nbsp;&nbsp;</dt>
					<dd style="text-align: left;">
						<label ></label>
					</dd>
				</dl>
				<dl style="width:55%;">
					<dt>&nbsp;客户证件照:</dt>
					<dd style="display: flex;">
						<img alt="" src="" style="height:100px;">&nbsp;&nbsp;&nbsp;&nbsp;<img alt="" src="" style="height:100px;">
					</dd>
				</dl>
				<div class="col-md-12  modelAdd" style="width: 300px; margin: auto;">
					<input class="btn btn-info pull-left" style="margin-top: 88px;" onclick="enterText(this);" type="button" value=" 确  认  " />
					<input class="btn btn-info pull-left" style="margin-top: 88px; margin-left: 88px;" onclick="cancelText(this);" type="button" value=" 取  消  " />
				</div>
			</div>
			<a href="#0" class="cd-popup-close" style="color: red;">X</a>
		</div>
	</div>	
</body>
</html>