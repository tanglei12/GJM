<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="Expires" CONTENT="0">
<meta http-equiv="Cache-Control" CONTENT="no-cache">
<meta http-equiv="Pragma" CONTENT="no-cache">
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="format-detection" content="telephone=no">
<meta name="format-detection" content="email=no">
<title>订单信息</title>
<link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href="/resources/css/app/common.css" rel="stylesheet" type="text/css">
<link href="/resources/css/app/serviceEdit.css" rel="stylesheet" type="text/css">

</head>
<body>
	<!-- 客户信息 -->
	<div class="content">
		<div class="content-item">
			<div class="item-title">
				<div class="item-title-content"><span>服务类型</span><em>*</em></div>
				<div class="item-title-option"></div>
			</div>
			<div class="item-content">
				<label class="change-angle"><select class="form-control" name="serviceType"></select></label>
				<label class="change-angle" style="padding-left: 10px;"><select class="form-control" name="serviceSubType" ></select></label>
			</div>
		</div>
		<div class="content-item" id="serviceTypeBox" style="display: none;">
			<div class="item-title">
				<div class="item-title-content"><span>服务项目</span><em>*</em></div>
				<div class="item-title-option"></div>
			</div>
			<div class="item-content">
				<label class="change-angle"><select class="form-control" name="serviceItem" ></select></label>
			</div>
		</div>
		<div class="content-item">
			<div class="item-title">
				<div class="item-title-content"><span>申请类型 | 申请对象</span><em>*</em></div>
				<div class="item-title-option"></div>
			</div>
			<div class="item-content">
				<label class="change-angle"><select class="form-control" name="serviceApplyType" ></select></label>
				<label class="change-angle" style="padding-left: 10px;"><select class="form-control" name="serviceApplyObject" ></select></label>
			</div>
		</div>
		<div class="content-item">
			<div class="item-title">
				<div class="item-title-content"><span>小区房号</span><em>*</em></div>
				<div class="item-title-option"></div>
			</div>
			<div class="item-content">
				<label class="choose-angle"><input type="text" class="form-control" name="house_address" placeholder="选择小区房号" required readonly/></label>
			</div>
		</div>
		<div class="content-item">
			<div class="item-title">
				<div class="item-title-content"><span>服务描述</span><em>*</em></div>
				<div class="item-title-option"></div>
			</div>
			<div class="item-content">
				<label class="change-angle"><select class="form-control" name="serviceDesc" ></select></label>
			</div>
			<div class="item-content" id="serviceDescOtherBox" style="margin-top: 10px;display: none;">
				<textarea class="form-control" name="serviceDescOther" placeholder="描述" required></textarea>
			</div>
		</div>
		<div class="content-item">
			<div class="item-title">
				<div class="item-title-content"><span>联系人</span><em>*</em></div>
				<div class="item-title-option"></div>
			</div>
			<div class="item-content">
				<input type="text" class="form-control" name="contactPeople" placeholder="联系人" required />
			</div>
		</div>
		<div class="content-item">
			<div class="item-title">
				<div class="item-title-content"><span>联系电话</span><em>*</em></div>
				<div class="item-title-option"></div>
			</div>
			<div class="item-content">
				<input type="text" class="form-control" name="contactPhone" placeholder="联系电话" required />
			</div>
		</div>
		<div class="content-item">
			<div class="item-title">
				<div class="item-title-content"><span>费用</span><em>*</em></div>
				<div class="item-title-option"></div>
			</div>
			<div class="item-content">
				<input type="number" class="form-control" name="serviceMoney" placeholder="费用" required />
			</div>
		</div>
	</div>
	<div class="content">
		<div class="content-item">
			<div class="item-title">
				<div class="item-title-content"><span>申请日期</span><em>*</em></div>
				<div class="item-title-option"></div>
			</div>
			<div class="item-content">
				<input type="date" class="form-control" name="serviceDate" required/>
			</div>
		</div>
		<div class="content-item">
			<div class="item-title">
				<div class="item-title-content"><span>经办人</span></div>
				<div class="item-title-option"></div>
			</div>
			<div class="item-content">
				<input type="text" class="form-control" name="serviceApplyer" readonly/>
			</div>
		</div>
	</div>
	<div class="content">
		<div class="content-item" style="padding-bottom: 0;">
			<div class="item-title">
				<div class="item-title-content"><span>图片描述</span></div>
				<div class="item-title-option">
					<button class="option-btn next-bg" name="imageDESC"><i class="fa-upload" style="margin-right:4px;"></i>上传图片</button>
				</div>
			</div>
			<div class="item-content" id="imageDESC-box" data-image-box style="padding: 10px 0;display: none;"></div>
		</div>
	</div>
	<div class="content" style="display: flex;background: none;">
		<button class="content-submmit next-bg" name="save" onclick="$.service.save();">保存</button>
	</div>
	
	<script src="/resources/js/jquery-2.0.0.min.js"></script>
	<script src="/resources/js/common/common.js"></script>
	<script src="/resources/js/appPage/appImageUpload.js"></script>
	<script src="/resources/js/appPage/serviceEdit.js"></script>
</body>
</html>