<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="format-detection" content="telephone=no">
    <meta name="format-detection" content="email=no">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>服务费用</title>
    <link href="/resources/css/appPage/service/serviceMoneyOld.css" rel="stylesheet" type="text/css">
    <link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/imageUpload/css/jquery.image-upload.css" rel="stylesheet" type="text/css">
    <link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">
    <!-- 图片上传 -->

    <script src="/resources/js/jquery-2.0.0.min.js"></script><!-- jQuery插件 -->
    <script src="/resources/common/imageUpload/js/jquery.image-upload.js"></script><!-- 图片上传 -->
    <script src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
    <script src="/resources/js/common/common.js"></script>
    <script src="/resources/js/appPage/service/serviceMoneyOld.js?v=<%=System.currentTimeMillis()%>"></script>
</head>
<body>
<div class="content">
    <div class="lines">
        <div style="display: flex">
            <img class="left_img" style="height: 22px;width: 20px;margin-top: 9px"
                 src="/resources/image/appPage/left_pic.png">
            <span class="line-lefts">费用单据:</span>
        </div>
        <div class="line-rights">
            <div id="imageLoad" style=" padding: 0px 0 16px 0;margin-left: 24px"></div>
        </div>
    </div>
    <div class="line" style="display: none">
        <img class="left_img" src="/resources/image/appPage/left_zt.png">
        <span class="line-left">付费对象:</span>
        <div class="line-right">
            <div class="divSelect ">
                <select id="payObject" class="payObject" name="payObject" >
                    <option selected==true value="1">客户</option>
                    <%--<option value="2">管家</option>
                    <option value="3">门店</option>--%>
                </select>
            </div>
        </div>
        <img class="right-img" src="/resources/image/appPage/right.png">
    </div>
    <div class="line">
        <img class="left_img" src="/resources/image/appPage/left_zt.png">
        <span class="line-left">付款人:</span>
        <div class="line-right">
            <div class="divSelect ">
                <select id="payPerson" class="payObject" name="payPerson">
                    <option value="">请选择</option>
                </select>
            </div>
        </div>
        <img class="right-img" src="/resources/image/appPage/right.png">
    </div>
    <div class="line">
        <img class="left_img" src="/resources/image/appPage/left_zt.png">
        <span class="line-left">费用名目:</span>
        <div class="line-right">
            <input class="ssm_source" id="ssm_source" name="ssm_source" type="text" value="">
        </div>
        <img class="right-img" src="/resources/image/appPage/right.png">
    </div>

    <div class="line">
        <img class="left_img" src="/resources/image/appPage/left_money.png">
        <span class="line-left">总金额:</span>
        <div class="line-right">
            <input class="sumMoney" id="mdg_money" name="mdg_money" type="text" value="">
        </div>
        <img class="right-img" src="/resources/image/appPage/right.png">
    </div>
    <div class="line">
        <img class="left_img" src="/resources/image/appPage/left_money.png">
        <span class="line-left">应付金额:</span>
        <div class="line-right">
            <input class="sumMoney" id="sumMoney" name="sumMoney" type="text" value="">
        </div>
        <img class="right-img" src="/resources/image/appPage/right.png">
    </div>



    <%--<div class="line">
        <img class="left_img" src="/resources/image/appPage/left_money.png">
        <span class="line-left">人工费:</span>
        <div class="line-right">
            <input class="sumMoney" id="personMoney" name="personMoney" type="text" value="">
        </div>
        <img class="right-img" src="/resources/image/appPage/right.png">
    </div>--%>
    <div class="btn_div">
        <button class="button" onclick="mainServiceBill()">提交费用</button>
    </div>

</div>

</body>
</html>