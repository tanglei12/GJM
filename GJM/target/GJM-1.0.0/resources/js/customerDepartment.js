
$(function(){
	windowSize();
	achievement();
});

function windowSize(){
	var height = $(window.parent.document.body).height();
	$(".achievement_tongji").height(height-100);
}

/**
 * 获取url参数
 * 
 * @param name
 * @returns
 */
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

/**
 * 业绩比例
 */
function achievement(){
	windowSize();
	// 基于准备好的dom，初始化echarts图表
    var myChart = echarts.init(document.getElementById('achievement_tongji')); 
    if(GetQueryString("type") == 0){
    	$(".title_tongji").text("录入房屋统计图");
    }else if(GetQueryString("type") == 1){
    	$(".title_tongji").text("实勘房屋统计图");
    }else if(GetQueryString("type") == 2){
    	$(".title_tongji").text("客户带看统计图");
    }
    var titleData = [];
    var dataD = [];
    var week = 0;
    var name = "";
    var series = [];
    $.ajax({
	    type: "POST",
	    url: "/customerSee/deprecationImage",
	    data : "&type="+ GetQueryString("type") +"&strDate="+ GetQueryString("strDate") +"&strDateEnd="+ GetQueryString("strDateEnd"),
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    async: false,
	    success: function(result) {
	    	$.each(result.dNum_TJse, function(indexs, items) {
	    		var date = new Date();
	    		/*if(items.cycle == 7){
	    			titleData.push(items.cycleNum+"天");
	    			name = items.cycleNum+"天";
	    		}else{*/
	    			var dateStr = getNewDay(date.getFullYear()+"-01-01",items.cycleNum)
	    			titleData.push(dateStr);
	    			name = dateStr;
//	    		}
	    		var data = [];
	    		$.each(result.bmse1, function(index, item) {
	    			var bool = true;
	    			if(indexs == 0){
	    				if(index == 0){
		    				dataD.push(item.department);
		    				bool = false;
		    			}else{
		    				for (var i = 0; i < dataD.length; i++) {
								if(item.department == dataD[i]){
									bool = false;
									break;
								}
							}
		    			}
		    			if(bool == true){
		    				dataD.push(item.department);
		    			}
	    			}
	    			if(items.id == item.id){
	    				data.push(item.num);
	    			}
		    	});
	    		var itemt={
						name: name,
						type:'bar',
						data: data
						}
				series.push(itemt);
	    	});
	    }
	});
	var option = {
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		        data:titleData
		    },
		    calculable : true,
		    xAxis : [
		        {
		            type : 'value',
		            boundaryGap : [0, 0.01]
		        }
		    ],
		    yAxis : [
		        {
		            type : 'category',
		            data : dataD
		        }
		    ],
		    series : series
		};
	 // 为echarts对象加载数据 
    myChart.setOption(option);
}

function getNewDay(dateTemp, days) {  
	var dateTemp = dateTemp.split("-");  
	var nDate = new Date(dateTemp[1] + '-' + dateTemp[2] + '-' + dateTemp[0]);
	    var millSeconds = Math.abs(nDate) + (days * 24 * 60 * 60 * 1000);  
	    var rDate = new Date(millSeconds);  
	    var year = rDate.getFullYear();  
	    var month = rDate.getMonth() + 1;  
	    if (month < 10) month = "0" + month;  
	    var date = rDate.getDate()-1;  
	    if (date < 10) date = "0" + date;  
	    return (year + "-" + month + "-" + date);  
	} 
