<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%> 
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%
	response.setHeader("Pragma","No-cache");
	response.setHeader("Cache-Control","no-cache");
	response.setDateHeader("Expires", -10);
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="Expires" CONTENT="0">
<meta http-equiv="Cache-Control" CONTENT="no-cache">
<meta http-equiv="Pragma" CONTENT="no-cache">
<!-- 公共CSS -->
<link href="/resources/css/common/common.css" rel="stylesheet" type="text/css">
<link href="/resources/css/manage_index.css" rel="stylesheet" type="text/css">
<link href="/resources/common/zyupload/skins/zyupload-1.0.0.css" rel="stylesheet" type="text/css"><!-- 文件上传插件 -->
<link href="/resources/common/uber-zoom/uber-zoom.css" rel="stylesheet" type="text/css"><!-- 图片缩放 -->
<link href="/resources/common/datepicker/jquery-ui.css" rel="stylesheet" type="text/css">
<link href="/resources/common/sweet-alert/css/sweet-alert.css" rel="stylesheet" type="text/css">
<link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href="/resources/common/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"><!-- 旧字体样式 -->
<link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">
<link href="/resources/css/body.css" rel="stylesheet" type="text/css">
<link href="/resources/common/swipeslider-develop/dist/swipeslider.css" rel="stylesheet" type="text/css">
<link href="/resources/css/customer/customer.css" rel="stylesheet" type="text/css"><!-- 本地CSS -->
<!-- 公共JS -->
<script src="/resources/js/jquery-1.7.2.min.js"></script>
<script src="/resources/js/common/common.js"></script><!-- 公共插件 -->
	<script src="/resources/common/imageUpload/js/jquery.image-upload.js"></script>
<script src="/resources/common/My97DatePicker/WdatePicker.js"></script><!-- 时间插件 -->
<script src="/resources/common/sweet-alert/js/sweet-alert.min.js"></script><!-- 提示弹窗 -->
<script src="/resources/common/datepicker/js/jquery-ui-datepicker.js"></script><!-- 日期插件-->
<script src="/resources/js/product/jquery-cookie.js"></script><!-- COOKIE -->
<script src="/resources/Plug-in/jquery.rotate/jquery.rotate.min.js"></script>
<script src="/resources/common/uber-zoom/uber-zoom.js"></script><!-- 图片缩放 -->
<script src="/resources/common/zyupload/zyupload-1.0.0.js"></script><!-- 文件上传插件 -->
<script src="/resources/js/customer/customerEdit.js"></script>
<script src="/resources/js/bank.js"></script>
<script src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js" charset="utf-8"></script>
<script src="/resources/Plug-in/jbox-v2.3/jBox/i18n/jquery.jBox-zh-CN.js" charset="utf-8"></script>
</head>
<style>
.checkbox input[type="checkbox"]:checked + label::after {
    font-family: 'FontAwesome';
    content: "\f00c";
    color: #fff;
    position: absolute;
    top: 0;
    left: 2px;
    z-index: 100;
    width: 17px;
	height: 17px;
	text-indent: 0;
	font-size: 13px;
}
</style>
<script type="text/javascript">
	
</script>
<body>
<!-- 客户信息 -->
<div class="contents" id="contents2" style="margin-left: 20px;">
	<div class="content">
		<div class="content-title">
			<div class="content-title-font">客户信息</div>
			<!-- <a href="javascript:;" class="edit-customer" onclick="customerEdit()">编辑</a>
			<a href="javascript:;" class="edit-customer-save" onclick="customerSave()">保存</a>
			<a href="javascript:;" class="edit-customer-cancel" onclick="customerCancel()">取消</a> -->
		</div>
		<!-- 主体 -->
		<div id="main-box">
			<div class="main-box-sub">
				<div class="content-text-div" style="margin-top: 10px;">
					<div class="content-text-title">基本信息<font style="color:#E74C3C;">*</font><i class="fa fa-angle-double-down" style="float: right; width: 20px; height: 22px; line-height: 22px; margin-left: 8px; cursor:pointer;" onclick="bankUp(this)"></i></div>
					<div class="more-content">
					<div class="content-text-div-content">
						<dl>
							<dt><font color="#E74C3C">*</font>用户姓名：</dt>
							<dd><input type="text" id="userName" value="" readonly onblur="bankUserName(this)" /></dd>
						</dl>
						<dl>
							<dt><font color="#E74C3C">*</font>证件类型：</dt>
							<dd>
								<select disabled="disabled" id="cardType" onchange="IDCardChange()"><option value="-1">请选择</option><option value="1" selected="selected">身份证</option><option value="2">军官证</option><option value="3">商户号</option><option value="4">护照</option><option value="5">台湾居民通行证</option><option value="6">香港居民通行证</option><option value="7">临时身份证</option><option value="8">外国人永久居留证</option></select>
								<input style="width:160px; margin-left: 10px;" id="cardNum" type="text" value="" readonly onkeyup="isCards(this)" maxlength="19" />
								<select style="margin-left: 10px; width: 40px; text-align: center; text-indent: 0;" id="sex"><option value="0">女</option><option value="1">男</option><option value="2">未知</option></select>
								<div class="alertMessage" style="display: none;">
								 	<i class="alertMessage_icon"></i>
								 	<div id="alertContent">用户已经存在！</div>
								</div>
							</dd>
						</dl>
						<dl style="height: auto; width: 244px;">
							<dt>证件正面：</dt>
							<dd style="width: 110px; min-width: 110px; height: auto;" id="frontCard">
								<div class="images-box">
									<div class="images-btn" data-type="CD1" data-url="/customer/imageUpload" data-del-url="/customer/deleteImage"  style="display: inline-block;">选择图片</div>
								</div>
							</dd>
							<dd class="tisp" style="height:24px; line-height: 24px; margin-left: 99px;"><span id="CD1-count">0</span>/<span id="CD1-limit">1</span></dd>
						</dl>
						<dl style="height: auto; width: 244px;">
							<dt>证件反面：</dt>
							<dd style="width: 110px; min-width: 110px; height: auto;" id="inverseCard">
								<div class="images-box" id="CD2-box">
									<div class="images-btn" data-box="CD2upload" data-type="CD2" data-url="/customer/imageUpload" data-del-url="/customer/deleteImage" style="display: inline-block;">选择图片</div>
								</div>
							</dd>
							<dd class="tisp" style="height:24px; line-height: 24px; margin-left: 99px;"><span id="CD2-count">0</span>/<span id="CD2-limit">1</span></dd>
						</dl>
						<dl style="height: auto; overflow: hidden;">
							<dt><font color="#E74C3C">*</font>客户类型：</dt>
							<dd style="height: auto; overflow: hidden;">
								<div class="customerType">
									<label class="common-borderbox" style="margin-bottom: 5px;"><input type="checkbox">房东</label>
									<label class="common-borderbox" style="margin-bottom: 5px;"><input type="checkbox">租客</label>
									<label class="common-borderbox" style="margin-bottom: 5px;"><input type="checkbox">社区</label>
								</div>
							</dd>
						</dl>
						<dl style="height: auto; overflow: hidden;">
							<dt><font color="#E74C3C">*</font>手机号码：</dt>
							<dd style="height: auto; overflow: hidden;">
								<div class="phoneDiv">
									<div style="float: left; position: relative;">
										<select disabled="disabled" id="phoneType" style="width: 75px; margin-right: 10px;" onchange="phoneSelect(this)"><option value="1" selected="selected">常用</option><option value="2">备用</option></select><input type="text" id="phone" value="" onkeypress="keyPress()" onblur="phoneBool(this)"  readonly />
										<i class="fa fa-chevron-circle-down" id="phoneUpDown" style="margin-left: 10px; cursor: pointer;" onclick="phoneDown(this)"></i>
										<a class="addButton-icon addButton-icon-add" style="width: 34px; margin-left: 10px; position:absolute; right:-41px; top:-6px; cursor: pointer; display: none;" onclick="addPhone(this)"></a>
									</div>
									<div style="float: left; margin-left: 48px; display: none;" id="addPhoneDiv">
										<select class="edit" style="height: 33px; line-height: 33px;"><option>常用</option><option selected="selected">备用</option></select>
										<input type="text" style="height: 33px; line-height: 33px;" class="edit" id="phoneEdit" value="" onkeypress="keyPress()"   />
										<button onclick="addPhones(this)">确定</button>
									</div>
								</div>
								<div class="morePhone" style="display: none;">
									
								</div>
							</dd>
						</dl>
					</div>
					<div class="bank_content">
						<a class="addButton-icon addButton-icon-add" style="width: 34px; margin-left: 10px; cursor: pointer; display: none;" onclick="addBankCard(this)"></a>
						<div id="bank_contents">
							<div class="bank_div">
								<div class="bank_div_title"><i class="fa fa-credit-card-alt" style="margin-right: 10px"></i><span class="bankTitle">银行卡</span><i class="fa fa-angle-double-up" style="float: right; width: 20px; height: 22px; line-height: 22px; margin-top: 7px; margin-left: 25px; cursor:pointer;" onclick="bankUp(this)"></i><label class="common-checkbox common-checkbox-checked" style="float: right;"><input type="radio" name="bank" checked="checked" />使用</label></div>
								<div class="bank_div_content" style="height: 445px;">
									<dl style="width: 100%;">
										<dt>银行卡号：</dt>
										<dd>
											<input type="text" style="width: 345px;" value="" class="bankCode"  readonly onblur="bankMessage(this)" onkeyup="bankMessage(this)" />
											<label class="common-checkbox" onclick="bankAnther(this)" style="float: right;"><input type="checkbox" name="onther" class="edit">其他</label>
										</dd>
									</dl>
									<dl style="width: 100%; display: none;">
										<dt>银行卡信息：</dt>
										<dd>
											<img alt="" src="" style="height: 50px; width:110px; float: left; margin-top: -13px;">
											<input type="text" class="bankMessage" value="" style="width: 240px; float: left;" readonly />
										</dd>
									</dl>
									<dl style="width: 100%; display: none">
										<dt>银行卡信息：</dt>
										<dd>
											<input type="text" class="bankMessageTitle" onblur="bankMessageTitle(this)" onkeyup="bankMessageTitle(this)" value="" style="width: 140px; float: left;" readonly />
											<input type="text" class="bankMessage1" value="存折-存折" style="width: 240px; float: left;" readonly="readonly" />
										</dd>
									</dl>
									<dl>
										<dt>开户网点：</dt>
										<dd>
											<input type="text" value="" readonly class="accountOpening" />
										</dd>
									</dl>
									<dl>
										<dt>开户名：</dt>
										<dd>
											<input type="text" value="" readonly class="openAccount" />
										</dd>
									</dl>
									<dl style="height: auto;" class="bankImage">
										<dt>银行卡照片：</dt>
										<dd style="width: 110px; min-width: 110px; height: auto;">
											<div class="images-box" id="BK-box">
												<div class="images-btn" data-box="BKupload" data-type="BK" data-url="" data-del-url="/customer/deleteImage" style="display: inline-block;">选择图片</div>
											</div>
										</dd>
										<dd class="tisp" style="height:24px; line-height: 24px;"><span id="BK-count">0</span>/<span id="BK-limit">1</span></dd>
									</dl>
								</div>
							</div>
						</div>
						</div>
					</div>
				</div>
				<div class="content-text-div" style="margin-top: 15px;">
					<div class="content-text-title">更多信息<i class="fa fa-angle-double-down" style="float: right; width: 20px; height: 22px; line-height: 22px; margin-left: 8px; cursor:pointer;" onclick="bankUp(this)"></i></div>
					<div class="more-content" style="display:none;">
						<div class="content-text-div-content">
						<dl style="width: 300px;">
							<dt style="width:80px">民族：</dt>
							<dd style="width: 40%;">
								<select disabled="disabled" name="nation"><!-- 待后续数据字典配置 -->
									<option>汉族</option>
									<option>土家族</option>
									<option>苗族</option>
									<option>蒙古族</option>
									<option>回族</option>
									<option>藏族</option>
									<option>满族</option>
									<option>其他</option>
								</select>
							</dd>
						</dl>
						<dl style="width: 300px;">
							<dt style="width:80px">籍贯：</dt>
							<dd style="width: 40%;">
								<input type="text" name="native_place" value="" readonly />
							</dd>
						</dl>
						<dl style="width: 300px;">
							<dt style="width:80px">生日：</dt>
							<dd style="width: 40%;">
								<input type="date" name="birthday" value="" readonly />
							</dd>
						</dl>
						<dl style="width: 300px;">
							<dt style="width:80px">婚姻状况：</dt>
							<dd style="width: 40%;">
								<select disabled="disabled" name="marital_status"><!-- 待后续数据字典配置 -->
									<option value="-1">请选择</option>
									<option value="1">未婚</option>
									<option value="2">已婚</option>
									<option value="3">离异</option>
									<option value="4">丧偶</option>
									<option value="5">单身</option>
									<option value="6">恋爱中</option>
									<option value="7">其他</option>
								</select>
							</dd>
						</dl>
						<dl style="width: 300px;">
							<dt style="width:80px">年龄：</dt>
							<dd style="width: 40%;">
								<input type="text" name="age" value="" readonly />
							</dd>
						</dl>
						<dl style="width: 300px;">
							<dt style="width:80px">身高(cm)：</dt>
							<dd style="width: 40%;">
								<input type="text" name="stature" value="" readonly />
							</dd>
						</dl>
						<dl style="width: 300px;">
							<dt style="width:80px">工作年限：</dt>
							<dd style="width: 40%;">
								<select disabled="disabled" name="work_years"><!-- 待后续数据字典配置 -->
									<option value="-1">请选择</option>
									<option value="1">1-2年</option>
									<option value="2">3-5年</option>
									<option value="3">5-10年</option>
									<option value="4">10年以上</option>
								</select>
							</dd>
						</dl>
						<dl style="width: 300px;">
							<dt style="width:80px">收入状况：</dt>
							<dd style="width: 40%;">
								<select disabled="disabled" name="income_status"><!-- 待后续数据字典配置 -->
									<option value="-1">请选择</option>
									<option value="1">3000元以下</option>
									<option value="2">3000-5000</option>
									<option value="3">5000-8000</option>
									<option value="4">8000-10000</option>
									<option value="5">10000-15000</option>
									<option value="6">15000以上</option>
								</select>
							</dd>
						</dl>
						<dl style="width: 300px;">
							<dt style="width:80px">兴趣爱好：</dt>
							<dd style="width: 40%;">
								<input type="text" name="interests" value="" readonly />
							</dd>
						</dl>
						<dl style="width: 300px;">
							<dt style="width:80px">学历：</dt>
							<dd style="width: 40%;">
								<select disabled="disabled" name="education"><!-- 待后续数据字典配置 -->
									<option value="-1">请选择</option>
									<option value="1">小学</option>
									<option value="2">初中</option>
									<option value="3">高中</option>
									<option value="4">专科</option>
									<option value="5">本科</option>
									<option value="6">硕士及以上</option>
								</select>
							</dd>
						</dl>
						<dl style="width: 300px;">
							<dt style="width:80px">专业：</dt>
							<dd style="width: 40%;">
								<select disabled="disabled" name="major"><!-- 待后续数据字典配置 -->
									<option value="-1">请选择</option>
									<option value="1">哲学类</option>
									<option value="2">经济学类</option>
									<option value="3">教育学类</option>
									<option value="4">历史学类</option>
									<option value="5">法学类</option>
									<option value="6">文学类</option>
									<option value="7">管理类</option>
									<option value="8">心理学类</option>
									<option value="9">计算机科学与技术类</option>
									<option value="10">信息与电子科学类</option>
									<option value="11">力学类</option>
									<option value="12">其他</option>
								</select>
							</dd>
						</dl>
						<dl style="width: 300px;">
							<dt style="width:80px">QQ：</dt>
							<dd style="width: 40%;">
								<input type="text" name="QQ" value="" readonly />
							</dd>
						</dl>
						<dl style="width: 300px;">
							<dt style="width:80px">微信：</dt>
							<dd style="width: 40%;">
								<input type="text" name="WX" value="" readonly />
							</dd>
						</dl>
						<dl style="width: 300px;">
							<dt style="width:80px">邮箱：</dt>
							<dd style="width: 40%;">
								<input type="text" name="email" value="" readonly />
							</dd>
						</dl>
						<dl style="width: 300px;">
							<dt style="width:80px">传真：</dt>
							<dd style="width: 40%;">
								<input type="text" name="fax" value="" readonly />
							</dd>
						</dl>
						<dl style="width: 300px;">
							<dt style="width:80px">公司名称：</dt>
							<dd style="width: 40%;">
								<input type="text" name="companyName" value="" readonly />
							</dd>
						</dl>
						<dl style="width: 300px;">
							<dt style="width:80px">公司地址：</dt>
							<dd style="width: 40%;">
								<input type="text" name="companyAddress" value="" readonly />
							</dd>
						</dl>
						<dl style="width: 300px;">
							<dt style="width:80px">公司电话：</dt>
							<dd style="width: 40%;">
								<input type="text" name="companyTel" value="" readonly />
							</dd>
						</dl>
						<dl style="width: 300px;">
							<dt style="width:80px">行业：</dt>
							<dd style="width: 40%;">
								<select disabled="disabled" name="business" onchange="selectProfession();">
									<option value="-1">请选择</option>
									<option value="01">经营管理类</option>
									<option value="02">公关/市场营销类</option>
									<option value="03">贸易/销售/业务类</option>
									<option value="04">财务类</option>
									<option value="05">行政/人力资源管理类</option>
									<option value="06">文职类</option>
									<option value="07">客户服务类</option>
									<option value="08">工厂类</option>
									<option value="09">计算机/互联网类</option>
									<option value="10">电子/通讯类</option>
									<option value="11">机械类</option>
									<option value="12">规划/建筑/建材类</option>
									<option value="13">房地产/物业管理类</option>
									<option value="14">金融/经济</option>
								</select>
							</dd>
						</dl>
						<dl style="width: 300px;">
							<dt style="width:80px">行业：</dt>
							<dd style="width: 40%;">
								<select disabled="disabled" name="profession">
									<option value="-1">请选择</option>
									<option value="0101">总裁/总经理/CEO</option>
									<option value="0201">公关经理</option>
									<option value="0301">国内贸易</option>
									<option value="0401">财务经理/主任</option>
									<option value="0501">行政经理/主管</option>
									<option value="0601">图书情报/资料/文档管理</option>
									<option value="0701">客户服务经理</option>
									<option value="0801">厂长/副厂长</option>
									<option value="0901">技术主管/项目经理</option>
									<option value="1011">电子工程师</option>
									<option value="1101">机械工程师/模具设计</option>
									<option value="1201">城镇规划设计</option>
									<option value="1301">房地产开发/策划</option>
									<option value="1401">银行会计</option>
								</select>
							</dd>
						</dl>
						<dl>
							<dt style="width:80px">通讯地址：</dt>
							<dd>
								<input type="text" value="" style="width: 565px;" name="contact_address" readonly />
							</dd>
						</dl>
<!-- 						<dl> -->
<!-- 							<dt style="width:80px">紧急联系：</dt> -->
<!-- 							<dd> -->
<!-- 								<select disabled="disabled" id="urgentType"><option>请选择</option><option>父母</option><option>亲人</option><option>朋友</option></select> -->
<!-- 								<input type="text" id="urgentPhone" style="margin-left: 10px;" value="" readonly /> -->
<!-- 							</dd> -->
<!-- 						</dl> -->
					</div>
						<div class="bank_content">
						<a class="addButton-icon addButton-icon-add" style="width: 34px; margin-left: 10px; cursor: pointer; display: none;" onclick="addOtherCard(this)"></a>
						<div id="otherID_contents" >
							<div class="bank_div">
								<div class="bank_div_title" style="border-bottom: 1px solid #031d18;"><i class="fa fa-vcard" style="margin-right: 10px"></i><span class="bankTitle">其他证件信息</span><i class="fa fa-angle-double-up" style="float: right; width: 20px; height: 22px; line-height: 22px; margin-top: 7px; margin-left: 25px; cursor:pointer;" onclick="bankUp(this)"></i></div>
								<div class="bank_div_content" style="border-left: 1px dashed #ccc;border-right:1px dashed #ccc;border-bottom:1px dashed #ccc; height: 310px; display:none;">
									<dl style="width: 50%;">
										<dt>证件类型：</dt>
										<dd>
											<select disabled="disabled" name="id_type" onchange="IDCardChange()">
												<option value="-1">请选择</option>
												<option value="1" selected="selected">身份证</option>
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
									<dl style="width: 50%;">
										<dt>证件号码：</dt>
										<dd>
											<input type="text" value="" name="id_no" style="width: 160px;" readonly/>
										</dd>
									</dl>
									<dl style="width: 100%;">
										<dt>证件有效期：</dt>
										<dd>
											<input type="date" value="" name="id_pastDate" readonly/>
										</dd>
									</dl>
									<dl style="height: auto;" class="bankImage">
										<dt>证件照片：</dt>
										<dd style="width: 110px; min-width: 110px; height: auto;">
											<div class="images-box" id="BK-box">
												<div class="images-btn" data-box="BKupload" data-type="BK" data-url="" data-del-url="/customer/deleteImage" style="display: inline-block;">选择图片</div>
											</div>
										</dd>
<!-- 										<dd class="tisp" style="height:24px; line-height: 24px;"><span id="BK-count">0</span>/<span id="BK-limit">1</span></dd> -->
									</dl>
								</div>
							</div>
						</div>
					</div>
					</div>
				</div>
				
				<div class="content-text-div" style="margin-top: 15px;">
					<div class="content-text-title">联系人信息<i class="fa fa-angle-double-down" style="float: right; width: 20px; height: 22px; line-height: 22px; margin-left: 8px; cursor:pointer;" onclick="bankUp(this)"></i></div>
					<div class="more-content" style="display:none;">
						<div class="bank_content">
						<a class="addButton-icon addButton-icon-add" style="width: 34px; margin-left: 10px; cursor: pointer; display: none;" onclick="addLinkMan(this)"></a>
						<div id="linkMan_contents" >
							<div class="bank_div">
								<div class="bank_div_title" style="border-bottom: 1px solid #031d18;"><i class="fa fa-user-circle" style="margin-right: 10px"></i><span class="bankTitle">更多联系人信息</span><i class="fa fa-angle-double-up" style="float: right; width: 20px; height: 22px; line-height: 22px; margin-top: 7px; margin-left: 25px; cursor:pointer;" onclick="bankUp(this)"></i></div>
								<div class="bank_div_content" style="border-left: 1px dashed #ccc;border-right:1px dashed #ccc;border-bottom:1px dashed #ccc;height: 360px;">
									<dl style="width:100%;">
										<dt>姓名：</dt>
										<dd><input type="text" name="linkManName" value="" readonly /></dd>
									</dl>
									<dl style="width:100%;">
										<dt>证件类型：</dt>
										<dd>
											<select disabled="disabled" name="id_type" onchange="IDCardChange()"><option value="-1">请选择</option><option value="1" selected="selected">身份证</option><option value="2">军官证</option><option value="3">商户号</option><option value="4">护照</option><option value="5">台湾居民通行证</option><option value="6">香港居民通行证</option><option value="7">临时身份证</option><option value="8">外国人永久居留证</option></select>
											<input style="width:160px; margin-left: 10px;" name="id_no" type="text" value="" readonly onkeyup="isCards(this)" maxlength="19" />
											<select style="margin-left: 10px; width: 40px; text-align: center; text-indent: 0;" name="sex"><option value="0">女</option><option value="1">男</option><option value="2">未知</option></select>
											<div class="alertMessage" style="display: none;">
											 	<i class="alertMessage_icon"></i>
<!-- 											 	<div id="alertContent">用户已经存在！</div> -->
											</div>
										</dd>
									</dl>
									<dl style="width: 310px;">
										<dt style="width:100px">邮箱：</dt>
										<dd style="width: 60%;">
											<input type="text" name="email" value="" readonly/>
										</dd>
									</dl>
									<dl style="width: 310px;">
										<dt style="width:100px">联系电话：</dt>
										<dd style="width: 60%;">
											<input type="text" name="phone" value="" readonly/>
										</dd>
									</dl>
									<dl style="width: 310px;">
										<dt style="width:100px">联系地址：</dt>
										<dd style="width: 60%;">
											<input type="text" name="address" value="" readonly/>
										</dd>
									</dl>
									<dl style="width: 310px;">
										<dt style="width:100px">QQ：</dt>
										<dd style="width: 60%;">
											<input type="text" name="qq" value="" readonly/>
										</dd>
									</dl>
									<dl style="width: 310px;">
										<dt style="width:100px">工作单位：</dt>
										<dd style="width: 60%;">
											<input type="text" name="workplace" value="" readonly/>
										</dd>
									</dl>
									<dl style="width: 310px;">
										<dt style="width:100px">与客户关系：</dt>
										<dd style="width: 60%;">
											<select disabled="disabled" name="relation" onchange="IDCardChange()">
												<option value="-1">请选择</option>
												<option value="1">夫妻</option>
												<option value="2">父母</option>
												<option value="3">子女</option>
												<option value="4">兄弟姐妹</option>
												<option value="5">同事</option>
												<option value="6">朋友</option>
												<option value="7">同学</option>
												<option value="8">其他</option>
											</select>
										</dd>
									</dl>
								</div>
							</div>
						</div>
					</div>
					</div>
				</div>
			</div>
			<center><button onclick="customerSaveAdd()">提交</button></center>
		</div>
	</div>
</div>
</body>
</html>