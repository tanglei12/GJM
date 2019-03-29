<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>合同附件</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="format-detection" content="telephone=no">
    <meta name="format-detection" content="email=no">
    <link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/mui/mui-scroll.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/app/common.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/app/contractEdit.css" rel="stylesheet" type="text/css">

    <script src="/resources/js/jquery-2.0.0.min.js"></script>

    <script src="/resources/mui/mui.js"></script>
    <script src="/resources/mui/mui.zoom.js"></script>
    <script src="/resources/mui/mui.previewimage.js"></script>
    <script src="/resources/js/common/common.js"></script>
    <script src="/resources/js/common/common.hint.js"></script>
    <script src="/resources/js/common/common.type.js"></script>
    <script src="/resources/js/appPage/appImageUpload.js"></script>
    <script src="/resources/js/appPage/contractEdit.js?v=<%=System.currentTimeMillis()%>"></script>
</head>
<body style="padding-top: 48px;">
<!-- 房源情况 -->
<div class="content content-top">
    <div class="content-item" id="show-house-more" style="padding-bottom: 0;">
        <div class="item-content" style="line-height: 48px;padding-bottom: 0;padding-right: 0;">
            <div class="content-top-icon next"><i class="fa-home"></i></div>
            <div class="content-top-text" id="house-address" style="flex: 1;"></div>
            <div class="content-top-text error" id="house-rent"></div>
            <button class="content-top-option" name="show-house-more"><i class="fa-angle-down"></i></button>
        </div>
    </div>
    <div class="content-item house-more" id="house-more">
        <div class="item-content" style="padding-bottom: 0;">
            <div class="item-more-title">房屋户型：</div>
            <div class="item-more-content" id="house-stw"></div>
        </div>
        <div class="item-content" style="padding-bottom: 0;">
            <div class="item-more-title">房屋面积：</div>
            <div class="item-more-content" id="house-measure"></div>
        </div>
        <div class="item-content" style="padding-bottom: 0;">
            <div class="item-more-title">详细地址：</div>
            <div class="item-more-content" id="he-address"></div>
        </div>
    </div>
</div>
<div class="content">
    <div class="content-item" style="padding-bottom: 0;">
        <div class="item-title">
            <div class="item-title-content">合同照(限5张)</div>
            <div class="item-title-option" style="text-align: right;">
                <button class="option-btn next-bg" name="imageHTZ"><i class="fa-upload" style="margin-right:4px;"></i>上传图片</button>
            </div>
        </div>
        <div class="item-content" id="image-box-htz" data-image-box style="display: none;"></div>
    </div>
</div>
<div class="content content-tg">
    <div class="content-item" style="padding-bottom: 0;">
        <div class="item-title">
            <div class="item-title-content">委托书(限1张)</div>
            <div class="item-title-option" style="text-align: right;">
                <button class="option-btn next-bg" name="imageWTS"><i class="fa-upload" style="margin-right:4px;"></i>上传图片</button>
            </div>
        </div>
        <div class="item-content" id="image-box-wts" data-image-box style="display: none;"></div>
    </div>
</div>
<div class="content content-tg">
    <div class="content-item" style="padding-bottom: 0;">
        <div class="item-title">
            <div class="item-title-content">房产证(限3张)</div>
            <div class="item-title-option" style="text-align: right;">
                <button class="option-btn next-bg" name="imageFCZ"><i class="fa-upload" style="margin-right:4px;"></i>上传图片</button>
            </div>
        </div>
        <div class="item-content" id="image-box-fcz" style="display: none;"></div>
    </div>
</div>
<div class="content">
    <div class="content-item" style="padding-bottom: 10px;">
        <div class="item-title">支付方式</div>
        <div class="item-content" style="padding-bottom: 0;">
            <div class="change-angle"><select class="form-control" name="conPayType" disabled></select></div>
            <div class="change-angle" id="monthPayType" style="display: none; margin-left: 10px;"><select class="form-control" name="conMonthPay"></select></div>
        </div>
    </div>
</div>
<div class="content">
    <div class="content-item">
        <div class="item-content" style="padding: 0">
            <textarea class="form-control" name="conRemark" placeholder="备注"></textarea>
        </div>
    </div>
</div>
<div class="content" style="display: flex;background: none;">
    <button class="content-submmit next-bg" name="conSave" onclick="$.contract.savePerfect();">保存</button>
</div>
</body>
</html>