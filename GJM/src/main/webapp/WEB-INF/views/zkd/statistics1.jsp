<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<script src="/resources/js/jquery-1.7.2.js"></script>
<script src="https://gw.alipayobjects.com/os/antv/assets/g2/3.0.5-beta.5/g2.min.js"></script>
<script src="https://gw.alipayobjects.com/os/antv/assets/data-set/0.8.6/data-set.min.js"></script>
<style>
    body{
        padding: 0;
        margin: 0;
    }
</style>
<script>
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
            height: 410
        });
        chart.source(dv);
        chart.intervalStack()
            .position('时间*数量')
            .color('name', ['#FACC14','#2FC25B']);
        chart.render();
    }
</script>