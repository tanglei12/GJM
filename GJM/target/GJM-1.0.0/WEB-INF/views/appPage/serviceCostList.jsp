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
    <title>订单信息</title>
    <link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/app/common.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/app/serviceCostList.css?v=<%=System.currentTimeMillis()%>" rel="stylesheet" type="text/css">


    <script src="/resources/js/jquery-2.0.0.min.js"></script>
    <script src="/resources/js/common/common.js?v=<%=System.currentTimeMillis()%>"></script>
    <script src="/resources/js/appPage/serviceCostList.js"></script><%--?v=<%=System.currentTimeMillis()%>--%>
</head>
<body>
<main>
    <div class="main-content">
        <div class="box-dl">
            <div class="box-dl-dt">
                <div class="dl-dt-title">费用来源</div>
                <div class="dl-dt-content">
                    <button class="item-add next" name="itemAdd"><i class="fa-plus-square-o"></i></button>
                </div>
            </div>
            <div class="box-dl-dd" id="itemList"></div>
            <div class="box-dl-dd">
                <div class="dl-dd-item" style="display: none;">
                    <div class="item-title">付款方</div>
                    <div class="item-content">
                        <label class="select-label" id="payObjLabel">
                            <select name="payObj" required>
                                <option>请选择</option>
                                <option>租客</option>
                                <option>房东</option>
                                <option>公司</option>
                            </select>
                        </label>
                    </div>
                </div>
                <div class="dl-dd-item">
                    <div class="item-title">合计</div>
                    <div class="item-content">
                        <div class="error" id="payCostTotal">0&nbsp;元</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="main-footer">
        <button name="done" class="error-bg">完成</button>
    </div>
</main>
</body>
</html>