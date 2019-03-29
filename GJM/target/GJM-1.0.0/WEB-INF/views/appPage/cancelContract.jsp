<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="format-detection" content="telephone=no">
    <meta name="format-detection" content="email=no">
    <title>招租申请</title>
    <link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/mui/mui-scroll.css?v=1.0" rel="stylesheet" type="text/css">
    <link href="/resources/css/app/common.css" rel="stylesheet" type="text/css">
    <link href="/resources/Plug-in/jquery-nice-select/css/nice-select.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/imageUpload/css/jquery.image-upload.css" rel="stylesheet" type="text/css"><!-- 图片上传 -->
    <link href="/resources/css/app/contractEdit.css" rel="stylesheet" type="text/css">

    <script src="/resources/js/jquery-2.0.0.min.js"></script>
    <script src="/resources/common/imageUpload/js/jquery.image-upload.js"></script><!-- 图片上传 -->
    <script src="/resources/js/common/common.js"></script>
    <script src="/resources/js/appPage/cancelContract.js"></script>
</head>
<body style="padding-top: 48px;">
<!-- 房源情况 -->
<div class="content content-top">
    <div class="content-item" id="show-house-more">
        <div class="item-content" style="line-height: 48px;padding-right: 0;padding-bottom: 0;">
            <div class="content-top-icon next"><i class="fa-home"></i></div>
            <div class="content-top-text" id="house-address" style="flex: 1;"></div>
            <div class="content-top-text error" id="house-rent"></div>
            <button class="content-top-option" name="show-house-more"><i class="fa-angle-down"></i></button>
        </div>
    </div>
    <div class="content-item house-more" id="house-more">
        <div class="item-content" style="padding-bottom: 0;">
            <div class="item-more-title">合同期限：</div>
            <div class="item-more-content" id="house-rentLimit"></div>
        </div>
        <div class="item-content" style="padding-bottom: 0;">
            <div class="item-more-title">房屋租金：</div>
            <div class="item-more-content" id="house-conRent"></div>
        </div>
        <div class="item-content" style="padding-bottom: 0;">
            <div class="item-more-title">&nbsp;&nbsp;保证金：</div>
            <div class="item-more-content" id="house-conPay"></div>
        </div>
    </div>
</div>

<div class="content">
    <div class="content-item">
        <div class="item-title">房屋地址<em>*</em></div>
        <div class="item-content" style="padding-bottom: 0;">
            <input id="houseAddress" class="form-control" data-code="" placeholder="房屋地址" style="" type="text" readonly/>
        </div>
    </div>
    <div class="content-item">
        <div class="item-title">合约类型<em>*</em></div>
        <div class="item-content" style="padding-bottom: 0;">
            <select class="form-control" style="width:100%;" id="heyueType">
                <option value="转租">转租</option>
                <option value="强退">强退</option>
                <option value="到期">到期</option>
                <option value="强收">强收</option>
                <option value="换房">换房</option>
            </select>
        </div>
    </div>
    <div class="content-item">
        <div class="item-title">申请日期<em>*</em></div>
        <div class="item-content" style="padding-bottom: 0;">
            <input id="cco_handleDate" class="form-control" datepicker="客户申请日期" placeholder="客户申请日期" type="date" required/>
        </div>
    </div>
    <div class="content-item" id="applyPerson">
        <div class="item-title">申请人<em>*</em></div>
        <div class="item-content" style="padding-bottom: 0;">
            <select class="form-control" id="cco_applicant"></select>
        </div>
    </div>
    <div class="content-item" style="display: none;">
        <div class="item-title" id="servicePay">服务费用<em>*</em></div>
        <div class="item-content" style="padding-bottom: 0;">
            <input type="text" class="form-control" id="cco_subletCost" maxlength="5"><label class="">元</label>
        </div>
    </div>
    <div class="content-item">
        <div class="item-title" id="descption">申请说明<em>*</em></div>
        <div class="item-content" style="padding-bottom: 0;">
            <textarea id="cco_applicationContent" rows="" cols="" style="width: 85%; height: 111px; resize: none; border: 1px solid #e8e8e8; outline: none; padding: 5px; box-shadow:0px 0px 0px rgba(0,0,0,0); -webkit-appearance:none;"></textarea>
        </div>
    </div>
    <div class="content-item">
        <div class="item-title">证明文件
            <div class="item-title-option" id="imgCount" style="text-align: right;"></div>
        </div>
        <div class="item-content" style="padding-bottom: 0;">
            <div id="uploadImage"></div>
        </div>
    </div>
    <div class="content-item">
        <div class="item-title">经办人</div>
        <div class="item-content" style="padding-bottom: 0;">
            <input id="cco_peopleName" class="form-control" type="text" readonly/>
        </div>
    </div>
    <div class="content-item">
        <div class="item-title">经办时间</div>
        <div class="item-content" style="padding-bottom: 8px;">
            <input id="cco_createDate" class="form-control" type="text" readonly/>
        </div>
    </div>
</div>
<input type="hidden" id="curEmName" value="">
<div class="content" style="display: flex;background: none;padding-bottom: 0;">
    <button class="content-submmit next-bg" name="conSave" onclick="$.contract.applySubmit();">提交并申请审核</button>
</div>
</body>
</html>