$(function(){
    data();
    dataHealthy();
    billTransaction();
});

/**
 * 读取数据
 */
function data(){
    $.ajax({
        type: "POST",
        url: "/zkdStatistics/statisticsData",
        data: {
            w_payType: $("#billType").val()
        },
        dataType: "json",
        success: function (result) {
            // 总成交量
            if(result.data1 != null){
                $("#sumCurrency").text(result.data1.sumCoin);
                if(result.data1.lastWeekLift < 0){
                    $("#lastweekLift").text(result.data1.lastWeekLift+"%");
                    $("#lastweekLift").next().attr("class", "fa-caret-down");
                }else if(result.data1.lastWeekLift > 0){
                    $("#lastweekLift").text(result.data1.lastWeekLift+"%");
                    $("#lastweekLift").next().attr("class", "fa-caret-up");
                }else{
                    $("#lastweekLift").text(result.data1.lastWeekLift+"%");
                    $("#lastweekLift").next().hide();
                }
                if(result.data1.yesterdayLift < 0){
                    $("#yesterdayLift").text(result.data1.yesterdayLift);
                    $("#yesterdayLift").next().attr("class", "fa-caret-down");
                }else if(result.data1.yesterdayLift > 0){
                    $("#yesterdayLift").text(result.data1.yesterdayLift);
                    $("#yesterdayLift").next().attr("class", "fa-caret-up");
                }else{
                    $("#yesterdayLift").text(result.data1.yesterdayLift);
                    $("#yesterdayLift").next().hide();
                }
                $("#sumToday").text(result.data1.daySumCoin);
            }
            if(result.data2 != null){
               $("#sumRent").text(result.data2.sumRent);
               $("#toDayRent").text(result.data2.toDayRent);
                // 求租信息列表
                rentMessage(eval(result.data2.dayRent));
            }
            if(result.data3 != null){
               $("#sumUser").text(result.data3.sumUser);
               $("#toDaySumUser").text(result.data3.toDaySumUser);
                // 累计客户
                sumCustomer(eval(result.data3.sumUsers));
            }
            if(result.data4 != null){
                // 转化率
                conversionRate(result.data4);
            }
            if(result.data5 != null){
                // 数据量统计
                dataSum(result.data5.customerDateStr, result.data5.releaseNum12, result.data5.seeNum12, result.data5.purchaseNum12);
            }
            if(result.data7 != null){
                // 活跃度
                activeSum(result.data7.activeDateStr, result.data7.loginNum, result.data7.loginCount);
            }
        }
    });
}

/**
 * 求租信息
 */
function rentMessage(c0Data){
    var data = c0Data.map(function (value, i) {
        return {
            x: '' + i,
            求租量: value
        };
    });
    var chart = new G2.Chart({
        container: 'rentMessage',
        forceFit: true,
        height: 50,
        padding: 0
    });
    chart.source(data);
    chart.axis(false);
    chart.legend(false);
    chart.tooltip({
        showTitle: false,
    });
    // 绘制曲线图
    chart.area()
        .position('x*求租量')
        .color('red')
        .shape('smooth')
        .size(0); //渐变颜色
    chart.point().position('x*y').size(0).shape('circle');
    chart.render();
}

/**
 * 累计客户
 */
function sumCustomer(dataItem){
    var data = dataItem.map(function (value, i) {
        return {
            x: '' + i,
            累计客户: value
        };
    });
    var chart = new G2.Chart({
        container: 'sumCustomer',
        forceFit: true,
        height: 50,
        padding: 0
    });
    chart.source(data);
    chart.axis(false);
    chart.legend(false);
    chart.tooltip({
        showTitle: false,
    });
    // 绘制曲线图
    chart.interval()
        .position('x*累计客户')
        .color('#8543E0')
        .shape('smooth'); //渐变颜色
    chart.point().position('x*y').color('city').size(0).shape('circle');
    chart.render();
}

/**
 * 转化率
 */
function conversionRate(data){
    var width = parseFloat($("#purchase").width());
    $("#toDayDealNum").text(data.toDayNum);
    if(data.ascDesc != null && data.ascDesc == "asc"){
        $("#toDayDealNum").next().attr("class", "fa-caret-up");
    }else if(data.ascDesc != null && data.ascDesc == "asc"){
        $("#toDayDealNum").next().attr("class", "fa-caret-down");
    }else{
        $("#toDayDealNum").next().hide();
    }
    var purchaseNumLift = parseFloat(data.purchaseNumLift);
    var dealNumLift = parseFloat(data.dealNumLift);
    $("#purchaseNum").text(data.purchaseNumLift+"%");
    $("#purchase").width(width / 100 * purchaseNumLift );
    $("#dealNum").text(data.dealNumLift+"%");
    $("#deal").width(width / 100 * dealNumLift);

}

/**
 * 数据量统计
 */
function dataSum(customerDateStr, releaseNum12, seeNum12, purchaseNum12){
    var data = [];
    for (var i = 0; i < customerDateStr.length; i++) {
        var item = { month: customerDateStr[i], 发布量: releaseNum12[i], 浏览量: seeNum12[i], 查看量: purchaseNum12[i] };
        data.push(item);
    }
    var ds = new DataSet();
    var dv = ds.createView().source(data);
    dv.transform({
        type: 'fold',
        fields: [ '发布量', '浏览量', '查看量' ], // 展开字段集
        key: 'sum', // key字段
        value: 'temperature', // value字段
    });
    var chart = new G2.Chart({
        container: 'dataSum',
        forceFit: true,
        height: 430
    });
    chart.source(dv, {
        month: {
            range: [ 0, 1 ]
        }
    });
    chart.line().position('month*temperature').color('sum').size(2);
    chart.render();
}

/**
 * 支付流水
 */
function billTransaction(){
    $.ajax({
        type: "POST",
        url: "/zkdStatistics/statisticsBill",
        data: {
            w_payType: $("#billType").val()
        },
        dataType: "json",
        success: function (result) {
            $("#bill").html("");
            if(result.data6 != null){
                var item = result.data6;
                // 财务流水
                $("#billSum").text("￥"+result.data6.accountWalletSum);
                var data = [];
                if($("#billType").val() == "1"){
                    data = [
                        {genre:'经纪人钱包充值 ￥'+ item.agentWalletMoney +"元",sold:item.agentWalletMoney},
                        {genre:'经纪人多币充值 ￥'+ item.agentWalletCoin +"元",sold:item.agentWalletCoin},
                        {genre:'企业会员充值 ￥'+ item.accountWalletRenew +"元",sold:item.accountWalletRenew},
                        {genre:'企业钱包充值 ￥'+ item.accountWalletMoney +"元",sold:item.accountWalletMoney}
                    ];
                }else{
                    data = [
                        {genre:'余额提现 ￥'+ item.withdrawalsMoney +"元",sold:item.withdrawalsMoney}
                    ];
                }
                var dv = new DataSet.View().source(data);
                dv.transform({
                    type: 'percent',
                    field: 'sold',
                    dimension: 'genre',
                    as: 'percent'
                });

                var chart = new G2.Chart({
                    container: 'bill',
                    orceFit: true,
                    height : 430
                });

                chart.source(dv,{
                    percent: {
                        formatter: val => {
                        return (val * 100).toFixed(2) + '%';
                        }
                    }
                });
                chart.coord('theta',{
                    radius: 1,
                    innerRadius: 0.75
                });
                chart.legend({
                    useHtml: true,
                    position: 'right',
                    containerTpl: '<div class="g2-legend" style="right: 0;">' +
                    '<table class="g2-legend-list" style="list-style-type:none;margin:0;padding:0;"></table>' +
                    '</div>',
                });
                chart.tooltip({
                    showTitle: false,
                });
                chart.intervalStack()
                    .position('percent')
                    .color('genre');
                chart.render();
                $(".g2-legend").css("left","");
            }
        }
    });
}

/**
 * 活跃度
 */
function activeSum(activeDateStr, loginNum, loginCount){
    var data = [];
    for (var i = 0; i < activeDateStr.length; i++) {
        var item = { month: activeDateStr[i], 登陆人数: loginCount[i], 登陆人次: loginNum[i] };
        data.push(item);
    }
    var ds = new DataSet();
    var dv = ds.createView().source(data);
    dv.transform({
        type: 'fold',
        fields: [ '登陆人数', '登陆人次'], // 展开字段集
        key: 'sum', // key字段
        value: 'temperature', // value字段
    });
    var chart = new G2.Chart({
        container: 'activeSum',
        forceFit: true,
        height: 430
    });
    chart.source(dv, {
        month: {
            range: [ 0, 1 ]
        }
    });
    chart.line().position('month*temperature').color('sum').size(2);
    chart.render();
}

/**
 * 数据健康
 */
function dataHealthy(){
    $.ajax({
        type: "POST",
        url: "/zkdStatistics/dataHealthy",
        data: {
            w_payType: $("#billType").val()
        },
        dataType: "json",
        success: function (result) {
            if(result.data != null){
                data(eval(result.data),result.date)
            }
        }
    });
    function data(data,date){
        var datas = [];
        datas.push(JSON.parse(data[0]));
        datas.push(JSON.parse(data[1]));
        var dates = [];
        for (var i = 0; i < date.length; i++) {
            dates.push(date[i]);
        }
        var ds = new DataSet();
        var dv = ds.createView().source(datas);
        dv.transform({
            type: 'fold',
            fields: dates, // 展开字段集
            key: '时间', // key字段
            value: '数量', // value字段
        });

        var chart = new G2.Chart({
            container: 'dataHealthy',
            forceFit: true,
            height: 430
        });
        chart.source(dv);
        chart.intervalStack()
            .position('时间*数量')
            .color('name', ['#FACC14','#2FC25B']).size(35);
        chart.render();
    }
}
