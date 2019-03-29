$(window).resize(function() {
    windowSize();
    $("#timeLine_message").perfectScrollbar("update");
    $("body").perfectScrollbar("update");
});

$(function(){
	windowSize();
	$("#timeLine_message").perfectScrollbar();
	
//	$("body").perfectScrollbar();

    rentHouse1();
    rentHouse2();
    rentHouse3();
    rentHouse4();
    rentHouse5();
    payRecord();
    service();
    businessVolume();
    housePeople();

    $(".title_head_tag li").click(function(){
        $(".title_head_tag li").attr("class","");
    	$(this).attr("class","click");
        payRecord();
	});
});

function windowSize(){
}

function rentHouse1(){
    $.ajax({
        type: "POST",
        url: "/chart/rentHouse",
        data: {},
        dataType: "json",
        success: function (result) {
            $("#rentHouse").html("");
            var sum = result.vacantHouseCount + result.subleaseHouseCount; //+ result.depositHouseCount;
			var data = [
				{genre:'空置房源',sold:result.vacantHouseCount},
				{genre:'转租房源',sold:result.subleaseHouseCount},
				//{genre:'已交定金',sold:result.depositHouseCount},
			];
			var dv = new DataSet.View().source(data);
			dv.transform({
				type: 'percent',
				field: 'sold',
				dimension: 'genre',
				as: 'percent'
			});

			var chart = new G2.Chart({
				container: 'rentHouse',
				orceFit: true,
				width: 236,
				height : 230
			});

			chart.source(dv,{
				percent: {
					formatter(val){
						return parseInt(sum*val); //百分比
					}
				}
			});
            // 辅助文本
            chart.guide().html({
                position: [ '50%', '50%' ],
                html: '<div style="color:#8c8c8c;font-size: 14px;text-align: center;width: 10em;">招租房源<br><span style="color:#8c8c8c;font-size:15px">'+ result.rentHouseCount +'('+ result.baifen +'%)</span></div>',
                alignX: 'middle',
                alignY: 'middle'
            });
			chart.coord('theta',{
				radius: 1,
				innerRadius: 0.85
			});
			chart.legend({
				useHtml: true,
				position: 'bottom',
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
			$("#rentHouse canvas").css("margin-left","-5px");
			$("#rentHouse .g2-legend").css("top","165px");
            $("#rentHouse .g2-legend").css("max-width","none");
            $("#rentHouse .g2-legend").css("width","100%");
            $("#rentHouse .g2-legend").css("text-align","center");
			$("#rentHouse .g2-legend-list-item").css("margin-right","10px");
        }
    });
}

function rentHouse2(){
    $.ajax({
        type: "POST",
        url: "/chart/billBeOverdue",
        data: {},
        dataType: "json",
        success: function (result) {
            $("#billBeOverdue").html("");
            var sum = result.billBeOverdue1_5 + result.billBeOverdue5_10 + result.billBeOverdue10_;
			var data = [
				{genre:'1-5天',sold:result.billBeOverdue1_5},
				{genre:'5-10天',sold:result.billBeOverdue5_10},
				{genre:'10天以上',sold:result.billBeOverdue10_},
			];
			var dv = new DataSet.View().source(data);
			dv.transform({
				type: 'percent',
				field: 'sold',
				dimension: 'genre',
				as: 'percent'
			});

			var chart = new G2.Chart({
				container: 'billBeOverdue',
				orceFit: true,
				width: 236,
				height : 230
			});

			chart.source(dv,{
				percent: {
					formatter(val){
						return parseInt(sum*val); //百分比
					}
				}
			});
            // 辅助文本
            chart.guide().html({
                position: [ '50%', '50%' ],
                html: '<div style="color:#8c8c8c;font-size: 14px;text-align: center;width: 10em;">租客逾期<br><span style="color:#8c8c8c;font-size:15px">'+ result.billBeOverdueCount +'</span></div>',
                alignX: 'middle',
                alignY: 'middle'
            });
			chart.coord('theta',{
				radius: 1,
				innerRadius: 0.85
			});
			chart.legend({
				useHtml: true,
				position: 'bottom',
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
			$("#billBeOverdue canvas").css("margin-left","-5px");
			$("#billBeOverdue .g2-legend").css("top","165px");
            $("#billBeOverdue .g2-legend").css("max-width","none");
            $("#billBeOverdue .g2-legend").css("width","100%");
			$("#billBeOverdue .g2-legend").css("text-align","center");
			$("#billBeOverdue .g2-legend-list-item").css("margin-right","10px");
        }
    });
}

function rentHouse3(){
    $.ajax({
        type: "POST",
        url: "/chart/overdueContract",
        data: {},
        dataType: "json",
        success: function (result) {
            $("#overdueContract").html("");
            var sum = result.overdueContractZl + result.overdueContractTg;
			var data = [
				{genre:'租赁合同',sold:result.overdueContractZl},
				{genre:'托管合同',sold:result.overdueContractTg},
			];
			var dv = new DataSet.View().source(data);
			dv.transform({
				type: 'percent',
				field: 'sold',
				dimension: 'genre',
				as: 'percent'
			});

			var chart = new G2.Chart({
				container: 'overdueContract',
				orceFit: true,
				width: 236,
				height : 230
			});

			chart.source(dv,{
				percent: {
					formatter(val){
						return parseInt(sum*val); //百分比
					}
				}
			});
            // 辅助文本
            chart.guide().html({
                position: [ '50%', '50%' ],
                html: '<div style="color:#8c8c8c;font-size: 14px;text-align: center;width: 10em;">超期合同<br><span style="color:#8c8c8c;font-size:15px">'+ result.overdueContractCount +'</span></div>',
                alignX: 'middle',
                alignY: 'middle'
            });
			chart.coord('theta',{
				radius: 1,
				innerRadius: 0.85
			});
			chart.legend({
				useHtml: true,
				position: 'bottom',
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
			$("#overdueContract canvas").css("margin-left","-5px");
            $("#overdueContract .g2-legend").css("max-width","none");
            $("#overdueContract .g2-legend").css("width","100%");
			$("#overdueContract .g2-legend").css("top","165px");
            $("#overdueContract .g2-legend").css("text-align","center");
			$("#overdueContract .g2-legend-list-item").css("margin-right","10px");
        }
    });
}

function rentHouse4(){
    $.ajax({
        type: "POST",
        url: "/chart/perfectContract",
        data: {},
        dataType: "json",
        success: function (result) {
            $("#perfectContract").html("");
            var sum = result.perfectContractEdit + result.perfectContractAudit + result.perfectContractToReview;
			var data = [
				{genre:'编辑中',sold:result.perfectContractEdit},
				{genre:'审核中',sold:result.perfectContractAudit},
				{genre:'复核中',sold:result.perfectContractToReview},
			];
			var dv = new DataSet.View().source(data);
			dv.transform({
				type: 'percent',
				field: 'sold',
				dimension: 'genre',
				as: 'percent'
			});

			var chart = new G2.Chart({
				container: 'perfectContract',
				orceFit: true,
				width: 236,
				height : 230
			});

			chart.source(dv,{
				percent: {
					formatter(val){
						return parseInt(sum*val); //百分比
					}
				}
			});
            // 辅助文本
            chart.guide().html({
                position: [ '50%', '50%' ],
                html: '<div style="color:#8c8c8c;font-size: 14px;text-align: center;width: 10em;">待完善合同<br><span style="color:#8c8c8c;font-size:15px">'+ result.perfectContract +'</span></div>',
                alignX: 'middle',
                alignY: 'middle'
            });
			chart.coord('theta',{
				radius: 1,
				innerRadius: 0.85
			});
			chart.legend({
				useHtml: true,
				position: 'bottom',
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
			$("#perfectContract canvas").css("margin-left","-5px");
			$("#perfectContract .g2-legend").css("top","165px");
            $("#perfectContract .g2-legend").css("max-width","none");
            $("#perfectContract .g2-legend").css("width","100%");
            $("#perfectContract .g2-legend").css("text-align","center");
			$("#perfectContract .g2-legend-list-item").css("margin-right","10px");
        }
    });
}

function rentHouse5(){
    $.ajax({
        type: "POST",
        url: "/chart/expireContract",
        data: {},
        dataType: "json",
        success: function (result) {
            $("#expireContract").html("");
            var sum = result.expireContractTg + result.expireContractZl;
			var data = [
				{genre:'租赁合同',sold:result.expireContractZl},
				{genre:'托管合同',sold:result.expireContractTg},
			];
			var dv = new DataSet.View().source(data);
			dv.transform({
				type: 'percent',
				field: 'sold',
				dimension: 'genre',
				as: 'percent'
			});

			var chart = new G2.Chart({
				container: 'expireContract',
				orceFit: true,
				width: 236,
				height : 230
			});

			chart.source(dv,{
				percent: {
					formatter(val){
						return parseInt(sum*val); //百分比
					}
				}
			});
            // 辅助文本
            chart.guide().html({
                position: [ '50%', '50%' ],
                html: '<div style="color:#8c8c8c;font-size: 14px;text-align: center;width: 10em;">到期合同<br><span style="color:#8c8c8c;font-size:15px">'+ result.expireContract +'</span></div>',
                alignX: 'middle',
                alignY: 'middle'
            });
			chart.coord('theta',{
				radius: 1,
				innerRadius: 0.85
			});
			chart.legend({
				useHtml: true,
				position: 'bottom',
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
			$("#expireContract canvas").css("margin-left","-5px");
			$("#expireContract .g2-legend").css("top","165px");
            $("#expireContract .g2-legend").css("max-width","none");
            $("#expireContract .g2-legend").css("width","100%");
            $("#expireContract .g2-legend").css("text-align","center");
			$("#expireContract .g2-legend-list-item").css("margin-right","10px");
        }
    });
}

function payRecord(){
    $.ajax({
        type: "POST",
        url: "/chart/queryBillRecord",
        data: {
            balpay: $("#billType").val(),
            date: $(".title_head_tag li[class='click']").text()
        },
        dataType: "json",
        success: function (result) {
        	var pay_type = "收入流水";
            $("#bill_water").html("");
			var data = [];
			if($("#billType").val() == "1"){
				data = [
					{genre:'租金：'+ result.rentStr +"元",sold: result.rent },
					{genre:'服务费：'+ result.serviceStr +"元",sold: result.service },
					{genre:'定金：'+ result.depositStr +"元",sold: result.deposit },
					{genre:'其他：'+ result.otherStr +"元",sold: result.other }
				];
                pay_type = "收入流水"
			}else{
				data = [
					{genre:'租金 ￥'+ result.rentStr +"元",sold: result.rent },
					{genre:'其他 ￥'+ result.otherStr +"元",sold: result.other }
				];
                pay_type = "支出流水"
			}
			var dv = new DataSet.View().source(data);
			dv.transform({
				type: 'percent',
				field: 'sold',
				dimension: 'genre',
				as: 'percent'
			});

			var chart = new G2.Chart({
				container: 'bill_water',
				orceFit: true,
				height : 380
			});

			chart.source(dv,{
				percent: {
					formatter(val){
					return (val * 100).toFixed(2) + '%';
					}
				}
			});
			chart.coord('theta',{
				radius: 1,
				innerRadius: 0.75
			});
            // 辅助文本
            chart.guide().html({
                position: [ '50%', '50%' ],
                html: '<div style="color:#8c8c8c;font-size: 14px;text-align: center;width: 10em;">'+ pay_type +'<br><span style="color:#8c8c8c;font-size:19px; display: block; margin-top: 8px;">￥ '+ result.sumMoney +'</span></div>',
                alignX: 'middle',
                alignY: 'middle'
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
			$("#bill_water canvas").css("margin-left","-90px");
			$("#bill_water .g-guide").css("margin-left","-90px");
            $("#bill_water .g2-legend").css("right","30px");
            $("#bill_water .g2-legend").css("font-size", "17px");
            $("#bill_water .g2-legend").css("top","30px");
            $("#bill_water .g2-legend li").css("margin-top", "30px");
            $(".g2-legend").css("left","");

            var htmlButton = '<div class="biil_water_count"><div class="left">笔数：'+ result.count +'笔</div><div class="right"></div></div>';
            $("#bill_water .g2-legend").append(htmlButton);
            $(".biil_water_count").width($("#bill_water .g2-legend").width());
		}
    });
}

function service(){
    $.ajax({
        type: "POST",
        url: "/chart/queryService",
        data: {},
        dataType: "json",
        success: function (result) {
            var data = [];
            for (var i = 0; i < result.date.length; i++) {
                var item = {month: result.date[i], 居家保洁: result.service1[i], 居家维修: result.service2[i], 翻新改造: result.service3[i], 宽带服务: result.service4[i], 自由搬家: result.service5[i], 家电清洗: result.service6[i], 开锁换锁: result.service7[i]};
                data.push(item);
            }
            var ds = new DataSet();
            var dv = ds.createView().source(data);
            dv.transform({
                type: 'fold',
                fields: ['居家保洁', '居家维修', '翻新改造', '宽带服务', '自由搬家', '家电清洗', '开锁换锁'], // 展开字段集
                key: 'sum', // key字段
                value: 'temperature', // value字段
            });
            var chart = new G2.Chart({
                container: 'service',
                forceFit: true,
                height: 400
            });
            chart.source(dv, {
                month: {
                    range: [0, 1]
                }
            });
            chart.line().position('month*temperature').color('sum').size(2);
            chart.render();
            $("#service canvas").css("margin-left","-20px");
        }
    });
}

function businessVolume(){
    $.ajax({
        type: "POST",
        url: "/chart/queryBusinessVolume",
        data: {},
        dataType: "json",
        success: function (result) {
            if(result.data != null){
				var data = eval(result.data);
                var date = result.date;
                var datas = [];
                datas.push(JSON.parse(data[0]));
                datas.push(JSON.parse(data[1]));
                datas.push(JSON.parse(data[2]));
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
                    container: 'businessVolume',
                    forceFit: true,
                    height: 410
                });
                chart.source(dv);
                chart.intervalStack()
                    .position('时间*数量')
                    .color('name', ['#FACC14','#2FC25B','#FF6666']).size(12);
                chart.render();
                $("#service canvas").css("margin-left","-20px");
            }
        }
    });
}

function housePeople(){
    $.ajax({
        type: "POST",
        url: "/chart/queryHousePeople",
        data: {},
        dataType: "json",
        success: function (result) {
			if(result.inHouse != null && result.outHouse != null){
                $("#inHouse ul").html("");
                $("#outHouse ul").html("");
				var inHouse = "";
				var outHouse = "";
                $(result.inHouse).each(function(index, item){
                	if(index == 0){
                        inHouse += '<li><i class="first_b">'+ (index+1) +'</i><label>'+ item.em_name +'</label><label>'+ item.ucc_name +'</label><label style="text-align: right; width: 20%;">'+ item.count +'套</label></li>';
                    }else{
                        inHouse += '<li><i>'+ (index+1) +'</i><label>'+ item.em_name +'</label><label>'+ item.ucc_name +'</label><label style="text-align: right; width: 20%;">'+ item.count +'套</label></li>';
					}
				});
                $("#inHouse ul").html(inHouse);
                $(result.outHouse).each(function(index, item){
                	if(index == 0){
                        outHouse += '<li><i class="first">'+ (index+1) +'</i><label>'+ item.em_name +'</label><label>'+ item.ucc_name +'</label><label style="text-align: right; width: 20%;">'+ item.count +'套</label></li>';
                    }else{
                        outHouse += '<li><i>'+ (index+1) +'</i><label>'+ item.em_name +'</label><label>'+ item.ucc_name +'</label><label style="text-align: right; width: 20%;">'+ item.count +'套</label></li>';
					}
				});
                $("#outHouse ul").html(outHouse);

                $("#inHouseNum").text(result.inHouseSum);
                $("#outHouseNum").text(result.outHouseSum);
			}
        }
    });
}
