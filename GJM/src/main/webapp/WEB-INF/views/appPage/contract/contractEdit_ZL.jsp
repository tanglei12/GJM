<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>租赁合同</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="format-detection" content="telephone=no">
    <meta name="format-detection" content="email=no">
    <link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/mui/mui-scroll.css?v=1.0" rel="stylesheet" type="text/css">
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
<input type="hidden" name="conType" value="租赁合同">
<input type="hidden" name="outMoney"><!-- 月付 -->
<input type="hidden" name="seasonMoney"><!-- 季付 -->
<input type="hidden" name="halfYearMoney"><!-- 半年付 -->
<input type="hidden" name="yeayMoney"><!-- 年付 -->
<input type="hidden" name="house-rent"><!-- 原始统一出房价 -->

<main>
    <!-- 房源情况 -->
    <div class="content content-top">
        <div class="content-item" id="show-house-more">
            <div class="item-content" style="line-height: 48px;padding-right: 0;padding-bottom: 0;">
                <div class="content-top-icon next">
                    <i class="fa-home"></i>
                </div>
                <div class="content-top-text" id="house-address" style="flex: 1;"></div>
                <div class="content-top-text error" id="house-rent"></div>
                <button class="content-top-option" name="show-house-more"><i class="fa-angle-down"></i></button>
            </div>
        </div>
        <div class="content-item house-more" id="house-more">
            <div class="item-content" style="padding-bottom: 0;">
                <div class="item-more-title">托管期限：</div>
                <div class="item-more-content" id="house-rentLimit"></div>
            </div>
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
    <!-- 客户信息 -->
    <div class="content">
        <div class="content-item">
            <div class="item-title">
                <div class="item-title-content">客户信息<em>*</em></div>
                <div class="item-title-option" style="padding-right: 0;">
                    <button class="ok" name="customer-add" style="width: 46px; line-height: inherit; float: right;">
                        <i class="fa-plus-circle" style="font-size: 22px; position: relative; top: 3px;"></i>
                    </button>
                </div>
            </div>
            <div class="item-content" style="padding-right: 0;">
                <button class="item-content-prefix">主</button>
                <input type="text" class="form-control" name="cc_info" data-type="1" placeholder="请选择客户" onclick="$.contract.customerClick(1)" style="border-radius: 0 3px 3px 0;" readonly required>
                <button class="iten-content-suffix next" name="cc_edit"><i class="fa-pencil" style="font-size: 18px"></i></button>
            </div>
        </div>
    </div>
    <!-- 合同信息 -->
    <div class="content">
        <div class="content-item">
            <div class="item-title">房屋用途 & 居住人数<em>*</em></div>
            <div class="item-content">
                <label class="change-angle"><select class="form-control" name="conUse"></select></label>
                <input type="number" class="form-control" name="peoNum" max="11" placeholder="居住人数" style="width: 30%;margin-left: 10px;flex: none;" required>
            </div>
        </div>
        <div class="content-item">
            <div class="item-title">
                <div class="item-title-content">合同期限<em>*</em></div>
                <div class="item-title-option" id="conTotalDate" style="text-align: right;"></div>
            </div>
            <div class="item-content" style="padding-bottom: 0;">
                <input type="date" class="form-control" name="conStartDate" datepicker="起始日期" placeholder="起始日期" style="width: 90px;" required>
                <label style="line-height: 40px; padding: 0 6px;">至</label>
                <input type="date" class="form-control" name="conEndDate" datepicker="截止日期" placeholder="截止日期" min="2017-03-06" style="width: 90px;" required>
            </div>
        </div>
        <div class="content-item">
            <div class="item-title">支付方式<em>*</em></div>
            <div class="item-content" style="padding-bottom: 0;">
                <label class="change-angle"><select class="form-control" name="conPayType" required></select></label>
                <label class="change-angle" id="monthPayType" style="display: none; margin-left: 10px;"><select class="form-control" name="conMonthPay" required></select></label>
            </div>
        </div>
        <div class="content-item">
            <div class="item-title">
                <div class="item-title-content">租金(元/月)<em>*</em></div>
                <div class="item-title-option" id="conTotalRent" style="text-align: right;"></div>
            </div>
            <div class="item-content" style="padding-bottom: 0;">
                <input type="number" class="form-control" name="conRent" max="11" placeholder="元/月" required>
            </div>
        </div>
        <div class="content-item" id="rentPlus" style="display: none;">
            <div class="item-title">租金上浮比例(%)</div>
            <div class="item-content" style="padding-bottom: 0;">
                <label class="change-angle"><select id="upRatio" class="form-control"></select></label>
                <input type="number" class="form-control" id="contractBody_RentPlus" max="3" style="display: none;">
            </div>
        </div>
        <div class="content-item">
            <div class="item-title">押金方式<em>*</em></div>
            <div class="item-content" style="padding-bottom: 0;">
                <label class="change-angle" id="conPay_div"></label>
            </div>
        </div>
        <div class="content-item">
            <div class="item-title">押金(元)<em>*</em></div>
            <div class="item-content" style="padding-bottom: 0;">
                <input type="number" class="form-control" name="conPay" max="11" placeholder="元" required>
            </div>
        </div>
        <div class="content-item">
            <div class="item-title">
                服务费(元)<em>*</em>
                <button class="fa-question-circle" name="service" style="margin-top: -2px; color: #3498db; font-size: 17px;"></button>
            </div>
            <div class="item-content">
                <input type="number" class="form-control" name="conService" max="11" placeholder="元" required>
            </div>
        </div>
    </div>
    <!-- 首付租金日|约定还款日 -->
    <div class="content">
        <div class="content-item">
            <div class="item-title">
                首付租金日<em>*</em>
            </div>
            <div class="item-content" style="padding-bottom: 0;">
                <input type="date" class="form-control" name="conStartPayDate" required>
            </div>
        </div>
        <div class="content-item">
            <div class="item-title">
                约定还款日<em>*</em>
            </div>
            <div class="item-content">
                <label class="change-angle"><select class="form-control" name="conAgreeDate" required></select></label>
            </div>
        </div>
    </div>
    <!-- 特价房源 -->
    <div class="content" style="display: none;">
        <div class="content-item">
            <div class="item-title">特价房源</div>
            <div class="item-content">
                <label class="change-angle"><select class="form-control"></select></label>
            </div>
        </div>
    </div>
    <!-- 其他约定|备注 -->
    <div class="content">
        <div class="content-item">
            <div class="item-content" style="padding: 0">
                <textarea class="form-control" name="conother" placeholder="其他约定"></textarea>
            </div>
        </div>
    </div>
    <!-- 图片 -->
    <div class="content PC_MODE">
        <div class="content-item" style="padding-bottom: 0;">
            <div class="item-title">
                <div class="item-title-content">合同照(限5张)<em>*</em></div>
                <div class="item-title-option" style="text-align: right;">
                    <button class="option-btn next-bg" name="imageHTZ">
                        <i class="fa-upload" style="margin-right: 4px;"></i>
                        上传图片
                    </button>
                </div>
            </div>
            <div class="item-content" id="image-box-htz" data-image-box style="display: none;"></div>
        </div>
    </div>
    <!-- 管家信息 -->
    <div class="content">
        <div class="content-item">
            <div class="item-title">
                <div class="item-title-content">
                    管家信息<em>*</em>
                </div>
                <div class="item-title-option" style="padding-right: 0;">
                    <button class="ok" name="housekeeper-add" style="width: 46px; line-height: inherit; float: right;">
                        <i class="fa-plus-circle" style="font-size: 22px; position: relative; top: 3px;"></i>
                    </button>
                </div>
            </div>
            <div class="item-content" style="padding-right: 0;">
                <button class="item-content-prefix">主</button>
                <input type="text" class="form-control" name="housekeeper_info" data-type="1" placeholder="请选择主管家" onclick="$.contract.clickChooseHousekeeper(1)" style="border-radius: 0 3px 3px 0;" readonly required>
                <input type="text" class="form-control" name="housekeeper_perforSplit" value="100" placeholder="业绩分成" style="border-radius: 3px 0 0 3px; width: 40px; margin-left: 10px;">
                <button class="iten-content-suffix" disabled>
                    <i class="fa-minus-circle"></i>
                </button>
            </div>
        </div>
    </div>
    <!-- 保存 -->
    <div class="content" style="display: flex; background: none;padding-bottom: 0;">
        <button class="content-submmit next-bg" name="conSave" onclick="$.contract.save();">保存</button>
    </div>
</main>

<!-- 客户服务描述 -->
<div class="content-mask" style="display: none;">
    <div class="content-mask-main" style="bottom: 0px;">
        <div class="mask-main-head">
            <div class="mask-main-head-title">600元/年服务费</div>
            <div class="mask-main-head-option">
                <button name="contractBillClose">
                    <i class="fa-remove"></i>
                </button>
            </div>
        </div>
        <div class="mask-main-content">
            <label>1.提供一次日常的入住清洁</label> <label>2.提供一次入住维修(以托管顾问/租客保修为准)</label> <label>3.提供300元以内的维修服务(以托管顾问/租客保修为准)</label> <label>4.超出400元以外的维修费,公司和租客各承担50%</label> <label>5.提供一次居家安全巡检</label> <label>6.享受公司增值服务9.5折优惠(小件搬家、清洁、清洗)</label> <label>7.赠送1万家财盗抢险</label>
        </div>
    </div>
</div>
</body>
</html>