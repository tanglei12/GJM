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
    <title>托管合同</title>
    <link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/mui/mui-scroll.css?v=1.0" rel="stylesheet" type="text/css">
    <link href="/resources/css/app/common.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/app/contractEdit.css" rel="stylesheet" type="text/css">


    <script src="/resources/js/jquery-2.0.0.min.js"></script>
    <script src="/resources/js/jquery-1.7.2.min.js"></script>
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
<input type="hidden" name="conType" value="托管合同">
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
<main>
    <!-- 客户信息 -->
    <div class="content">
        <div class="content-item">
            <div class="item-title">
                <div class="item-title-content">客户信息<em>*</em></div>
                <div class="item-title-option" style="padding-right: 0">
                    <button name="customer-add" style="width: 46px;line-height: inherit;float: right;"><i class="fa-plus-circle ok" style="font-size: 22px;position: relative;top: 3px;"></i></button>
                </div>
            </div>
            <div class="item-content" style="padding-right: 0;">
                <button class="item-content-prefix">主</button>
                <input type="text" class="form-control" name="cc_info" data-type="1" placeholder="请选择客户" onclick="$.contract.customerClick(1)" style="border-radius: 0 3px 3px 0;" readonly required>
                <button class="iten-content-suffix next" name="cc_edit"><i class="fa-pencil" style="font-size: 18px"></i></button><!-- fa-minus-circle -->
            </div>
        </div>
    </div>
    <div class="content">
        <div class="content-item">
            <div class="item-title">
                <div class="item-title-content">合同期限<em>*</em></div>
                <div class="item-title-option" id="conTotalDate" style="text-align: right;"></div>
            </div>
            <div class="item-content" style="padding-bottom: 0;">
                <input type="date" class="form-control" name="conStartDate" datepicker="起始日期" placeholder="起始日期" style="width: 90px;" required>
                <label style="line-height: 40px;padding: 0 6px;">至</label>
                <input type="date" class="form-control" name="conEndDate" datepicker="截止日期" placeholder="截止日期" min="2017-03-06" style="width: 90px;" required>
            </div>
            <div class="item-content" style="padding-bottom: 0;" id="rent-free">
                <label class="common-check common-checkbox-checked" id="month-1" style="margin: 10px"><input type="radio" name="rent" value="0" checked data="">n-1</label>
                <label class="common-check" id="month_1" style="margin: 10px;display: none;"><input type="radio" name="rent" value="1" data="">n+1</label>
            </div>
        </div>
        <div class="content-item">
            <div class="item-title">支付方式<em>*</em></div>
            <div class="item-content" style="padding-bottom: 0;">
                <label class="change-angle"><select class="form-control" name="conPayType" required></select></label>
                <label class="change-angle" id="monthPayType" style="margin-left: 10px;"><select class="form-control" name="conMonthPay" required></select></label>
            </div>
        </div>
        <%--<div class="content-item">
            <div class="item-title">账单生成方式(默认租期等长)<em>*</em></div>
            <div class="item-content" style="padding-bottom: 0;">
                <label class="change-angle"><select class="form-control" name="conBillWay" required></select></label>
            </div>
        </div>--%>
        <div class="content-item">
            <div class="item-title">
                <div class="item-title-content"><span id="rent-unit">租金(元/月)</span><em>*</em></div>
                <div class="item-title-option" id="conTotalRent" style="text-align: right;"></div>
            </div>
            <div class="item-content" style="padding-bottom: 0;">
                <input type="number" class="form-control" name="conRent" max="11" placeholder="元/月" required>
            </div>
        </div>
        <div class="content-item">
            <div class="item-title">押金(元)<em>*</em></div>
            <div class="item-content" style="padding-bottom: 0;">
                <input type="number" class="form-control" name="conPay" max="11" placeholder="元" required>
            </div>
        </div>
        <div class="content-item">
            <div class="item-title">定金(元)</div>
            <div class="item-content" style="padding-bottom: 0;">
                <input type="number" class="form-control" name="conDepslit" max="11" placeholder="元" required>
            </div>
        </div>
        <div class="content-item">
            <div class="item-title">管理费(元)</div>
            <div class="item-content" style="padding-bottom: 0;">
                <input type="number" class="form-control" name="conService" max="11" placeholder="元" required>
            </div>
        </div>
        <div class="content-item">
            <div class="item-title">免租期(天/年)</div>
            <div class="item-content extend-list" id="conFreeDate"></div>
        </div>
        <div class="content-item">
            <div class="item-title">
                <div class="item-title-content">租金递增</div>
                <div class="item-title-option" style="text-align: right;">
                    <div class="switch-button"></div>
                </div>
            </div>
            <div class="item-content extend-list" id="conIncreasing"></div>
        </div>
        <div class="content-item" style="padding-bottom: 10px;">
            <div class="item-title">包修费(元/年)</div>
            <div class="item-content extend-list" id="guaranteecost"></div>
        </div>
    </div>
    <div class="content">
        <div class="content-item">
            <div class="item-title">首付租金日<em>*</em></div>
            <div class="item-content" style="padding-bottom: 0;">
                <input type="date" class="form-control" name="conStartPayDate" required>
            </div>
        </div>
        <div class="content-item">
            <div class="item-title">约定还款日<em>*</em></div>
            <div class="item-content">
                <label class="change-angle"><select class="form-control" name="conAgreeDate" required></select></label>
            </div>
        </div>
    </div>
    <div class="content" style="display: none;">
        <div class="content-item">
            <div class="item-title">特价房源</div>
            <div class="item-content">
                <label class="change-angle"><select class="form-control"></select></label>
            </div>
        </div>
    </div>
    <div class="content">
        <div class="content-item">
            <div class="item-content" style="padding: 0">
                <textarea class="form-control" name="conother" placeholder="其他约定"></textarea>
            </div>
        </div>
    </div>
    <div class="content PC_MODE PC_MODE1">
        <div class="content-item" style="padding-bottom: 0;">
            <div class="item-title">
                <div class="item-title-content">合同照(限5张)<em id="PC_MODE1_EM">*</em></div>
                <div class="item-title-option" style="text-align: right;">
                    <button class="option-btn next-bg" name="imageHTZ"><i class="fa-upload" style="margin-right:4px;"></i>上传图片</button>
                </div>
            </div>
            <div class="item-content" id="image-box-htz" data-image-box style="display: none;"></div>
        </div>
    </div>
    <div class="content PC_MODE PC_MODE2">
        <div class="content-item" style="padding-bottom: 0;">
            <div class="item-title">
                <div class="item-title-content">委托书(限1张)<em>*</em></div>
                <div class="item-title-option" style="text-align: right;">
                    <button class="option-btn next-bg" name="imageWTS"><i class="fa-upload" style="margin-right:4px;"></i>上传图片</button>
                </div>
            </div>
            <div class="item-content" id="image-box-wts" data-image-box style="display: none;"></div>
        </div>
    </div>
    <div class="content PC_MODE PC_MODE3">
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
    <!-- 管家信息 -->
    <div class="content">
        <div class="content-item">
            <div class="item-title">
                <div class="item-title-content">管家信息<em>*</em></div>
                <div class="item-title-option" style="padding-right: 0;">
                    <button class="ok" name="housekeeper-add" style="width: 46px;line-height: inherit;float: right;"><i class="fa-plus-circle" style="font-size: 22px;position: relative;top: 3px;"></i></button>
                </div>
            </div>
            <div class="item-content" style="padding-right: 0;">
                <button class="item-content-prefix">主</button>
                <input type="text" class="form-control" name="housekeeper_info" data-type="1" placeholder="请选择主管家" onclick="$.contract.clickChooseHousekeeper(1)" style="border-radius: 0 3px 3px 0;" readonly required>
                <input type="text" class="form-control" name="housekeeper_perforSplit" value="100" placeholder="业绩分成" style="border-radius: 3px 0 0 3px;width: 40px;margin-left: 10px;">
                <button class="iten-content-suffix" disabled><i class="fa-minus-circle"></i></button>
            </div>
        </div>
    </div>
    <div class="content" style="display: flex;background: none;padding-bottom: 0;">
        <button class="content-submmit next-bg" name="conSave" onclick="$.contract.save();">保存</button>
    </div>
</main>

<!-- 客户服务描述 -->
<div class="content-mask" style="display: none;">
    <div class="content-mask-main" style="bottom: 0px;">
        <div class="mask-main-head">
            <div class="mask-main-head-title">合同账单</div>
            <div class="mask-main-head-option">
                <button name="contractBillClose"><i class="fa-remove"></i></button>
            </div>
        </div>
        <div class="mask-main-content"></div>
    </div>
</div>
</body>
</html>