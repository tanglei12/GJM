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
    <title>客户编辑</title>
    <link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/app/common.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/app/customerEdit.css" rel="stylesheet" type="text/css">

    <script src="/resources/js/jquery-2.0.0.min.js"></script>
    <script src="/resources/js/common/common.js"></script>
    <script src="/resources/js/common/common.hint.js"></script>
    <script src="/resources/js/appPage/appImageUpload.js"></script>
    <script src="/resources/js/appPage/customerEdit.js?v=<%=System.currentTimeMillis()%>"></script>
</head>
<body>
<div class="content">
    <div class="content-item">
        <div class="item-title">
            <div class="item-title-content">客户姓名<em>*</em></div>
            <div class="item-title-option"></div>
        </div>
        <div class="item-content">
            <input class="form-control" name="customerName" placeholder="客户姓名" required>
        </div>
    </div>
    <div class="content-item">
        <div class="item-title">
            <div class="item-title-content">手机号码<em>*</em></div>
            <div class="item-title-option" style="text-align: right;">
                <button class="ok" name="phone-add" style="width: 36px;line-height: 46px;padding-left: 8px;float: right;"><i class="fa-plus-circle" style="font-size: 22px;position: relative;top: 3px;"></i></button>
            </div>
        </div>
        <div class="item-content">
            <label class="change-angle" style="flex: initial;margin-right: 10px;"><select class="form-control" name="customerPhoneType" style="width: auto;"></select></label>
            <input class="form-control" name="customerPhone" placeholder="手机号码" style="flex:3" required>
            <button class="form-control" style="width: 36px;padding-left: 8px;" disabled><i class="fa-minus-circle disabled" style="font-size: 22px;"></i></button>
        </div>
    </div>
    <div class="content-item">
        <div class="item-title">
            <div class="item-title-content">联系地址<em>*</em></div>
            <div class="item-title-option"></div>
        </div>
        <div class="item-content">
            <input class="form-control" name="customerAddress" placeholder="联系地址" required>
        </div>
    </div>
</div>

<div class="content">
    <div class="content-item">
        <div class="item-title">
            <div class="item-title-content">客户证件<em>*</em></div>
            <div class="item-title-option" style="text-align: right;color: #ff6666;" id="cardPlace">
                <%--<button class="ok" name="phone-add" style="width: 36px;line-height: 46px;padding-left: 8px;float: right;"><i class="fa-plus-circle" style="font-size: 22px;position: relative;top: 3px;"></i></button>--%>
            </div>
        </div>
        <div class="item-content">
            <label class="change-angle" style="flex: initial;margin-right: 10px;"><select class="form-control" name="customerCardType"></select></label>
            <input class="form-control" name="customerCard" placeholder="证件号码" required>
            <label class="change-angle customer-sex-box" style="flex: initial;margin-left: 10px;display: none;"><select class="form-control" name="customerSexType" style="width: auto;"></select></label>
        </div>
        <div class="item-content">
            <div class="item-upload" name="customerCardPhoneA" style="margin-right: 10px;">
                <div class="item-upload-head"><i class="fa-camera"></i></div>
                <div class="item-upload-footer">上传证件正面</div>
            </div>
            <div class="item-upload" name="customerCardPhoneB">
                <div class="item-upload-head"><i class="fa-camera"></i></div>
                <div class="item-upload-footer">上传证件背面</div>
            </div>
        </div>
    </div>
</div>

<div class="content">
    <div class="content-item">
        <div class="item-title">
            <div class="item-title-content">银行卡<%--<em>*</em>--%></div>
            <div class="item-title-option" style="text-align: right;">
                <button class="ok" name="add-bank" style="width: 36px;line-height: 46px;padding-left: 8px;float: right;"><i class="fa-plus-circle" style="font-size: 22px;position: relative;top: 3px;"></i></button>
            </div>
        </div>
        <div class="item-content" id="bank-box" style="flex-direction: column;padding-bottom: 0;"></div>
    </div>
</div>

<div class="content" style="display: flex;">
    <button class="content-submmit next-bg" name="cusSave" onclick="$.customer.save()">保存</button>
</div>

</body>
</html>