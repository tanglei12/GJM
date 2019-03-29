<%@ page pageEncoding="utf-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>租客多首页</title>
</head>
<!-- css -->
<link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href="/resources/css/zkd/zkdStatistics.css" rel="stylesheet" type="text/css">
<!-- js -->
<script src="/resources/js/jquery-1.7.2.js"></script>
<script src="/resources/js/zkd/zkdStatistics.js"></script>
<!-- g2图表插件 -->
<script src="/resources/js/g2/g2.min.js"></script>
<script src="/resources/js/g2/data-set.min.js"></script>
<!-- end -->
<body>
<div class="center">
    <div class="sum_div">
        <div class="title">总成交量</div>
        <div class="content"><img src="/resources/image/zkd/ic_money.svg" alt=""/><label class="font" id="sumCurrency"></label></div>
        <div class="content_bottom" style="padding-top: 10px; margin-bottom: 5px;">
            <div class="font_left"><label>比上周</label><label class="percentage" id="lastweekLift"></label><i class="fa-caret-up"></i></div>
            <div class="font_right"><label>比昨日</label><label class="percentage" id="yesterdayLift"></label><i class="fa-caret-down"></i></div>
        </div>
        <div class="bottom">
            <div class="bottom_left" style="width: 100%"><label>今日成交量</label><label id="sumToday"></label></div>
        </div>
    </div>
    <div class="sum_div">
        <div class="title">求租信息</div>
        <div class="content"><label class="font" style="margin-left: 0px;" id="sumRent"></label></div>
        <div class="content_bottom" id="rentMessage">

        </div>
        <div class="bottom">
            <div class="bottom_left" style="width: 100%"><label>今日求租信息</label><label id="toDayRent"></label></div>
        </div>
    </div>
    <div class="sum_div">
        <div class="title">累计客户</div>
        <div class="content"><label class="font" style="margin-left: 0px;" id="sumUser"></label></div>
        <div class="content_bottom" id="sumCustomer">

        </div>
        <div class="bottom">
            <div class="bottom_left" style="width: 100%"><label>今日入驻量</label><label id="toDaySumUser"></label></div>
        </div>
    </div>
    <div class="sum_div" style="margin-right: 0;">
        <div class="title">转化率</div>
        <div class="content_bottom" id="conversionRate" style="height: 95px; line-height: 95px; padding-top: 8px;">
            <div class="purchase">
                <div class="font" id="purchaseNum">0%</div>
                <div class="chart" style="background-color: #FACC14" id="purchase">购买</div>
            </div>
            <div class="purchase" style="margin-top: 10px">
                <div class="font" id="dealNum">0%</div>
                <div class="chart" style="background-color: #25C25B; width: 45%" id="deal">成交</div>
            </div>
        </div>
        <div class="bottom">
            <div class="bottom_left" style="width: 100%"><label>今日成交量</label><label id="toDayDealNum"></label><i class="fa-caret-up"></i></div>
        </div>
    </div>
    <div class="sum_div_content">
        <div class="title">数据量统计</div>
        <div class="data data1" id="dataSum"></div>
    </div>
    <div class="sum_div_content" style="margin-right: 0;">
        <div class="title">财务流水占比<select id="billType" onchange="billTransaction()"><option value="1">收入流水</option><option value="2">支出流水</option></select></div>
        <div class="data data2" id="bill" style="overflow: hidden;"></div>
        <div class="money">
            <div class="money-title">收入流水</div>
            <div class="money-content" id="billSum"></div>
        </div>
    </div>
    <div class="sum_div_content">
        <div class="title">数据健康度</div>
        <div class="data data1" id="dataHealthy" style="padding-top: 7px;"></div>
    </div>
    <div class="sum_div_content" style="margin-right: 0;">
        <div class="title">活跃度</div>
        <div class="data data1" id="activeSum"></div>
    </div>
</div>
</body>
</html>
