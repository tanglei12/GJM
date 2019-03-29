var selectContractList = null;
$(function(){
	data();
	$("#loading").height($(window).height());
});

$(window).resize(function(){
	$("#loading").height($(window).height());
});

function refresh(){
	$("#orderInput").val("");
	data();
}

/**
 *  同步数据
 */
function updateOrder(){
	$(".toolbar1 span img").attr("src","/resources/image/loading.gif");
	$(".toolbar1 li").attr("onclick","");
	$("#loadings").show();
	$.ajax({
	    type: "POST",
	    url: "updateOrder",
	    data: [],
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	if(result == "1"){
	    		data();
	    		$(".toolbar1 span img").attr("src","/resources/image/loading.png");
	    		$(".toolbar1 li").attr("onclick","updateOrder()");
	    		$("#loadings").hide();
	    	}
	    }
	});
}

//筛选获取数据
function data(sizeCount){
	selectContractList = $.Deferred();
	var sizeCount = "";
	if($.cookie("orderSize")!=null){
		sizeCount = $.cookie("orderSize");
	}
	if($("#sizeCount input").val()!=null){
		sizeCount = $("#sizeCount input").val();
		 $.cookie("orderSize", sizeCount, { expires: 7 });
	}
	$.ajax({
	    type: "POST",
	    url: "orderList",
	    data: "txt="+$("#orderInput").val()+"&status="+$("#orderType").val()+"&page="+$("#Num").text()+"&sizeCount="+sizeCount,
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	$("#tableContent #tableData tbody").html("");
	    	if(result != "1"){
	    		var html = "";
	    		$.each(result.lSFOrderTable, function(idx, item) {
	    			var date = format(item.lsfo_dealingDat, 'yyyy-MM-dd HH:mm:ss');
	    			var status = "";
	    			if(item.lsfo_type == "逾期"){
	    				status = "<font color='#E74C3C'>"+ item.lsfo_type +"</font>"
	    			}else if(item.lsfo_type == "未还款"){
	    				status = "<font color='#F1C40F'>"+ item.lsfo_type +"</font>"
	    			}else if(item.lsfo_type == "催租"){
	    				status = "<font color='#E67E22'>"+ item.lsfo_type +"</font>"
	    			}else if(item.lsfo_type == "待还款"){
	    				status = "<font color='#1ABC9C'>"+ item.lsfo_type +"</font>"
	    			}else{
	    				status = item.lsfo_type;
	    			}
	    			
	    			html+="<tr class='tr'  id='data_contents'><td><input name='chickes' type='checkbox' id='"+item.lsfo_id+"'/></td><td>"+(idx+1)+"</td><td><a href='javascript:billData(\""+ (idx+1) +"\",\""+ (item.lsfo_orderCode) +"\");'>"+item.lsfo_orderCode+"</a></td><td>"+item.lsfo_contractNo+"</td><td>"+item.lsfo_contactName+"（"+item.lsfo_contactPhone+"）</td><td>"+item.lsfo_agentName+"（"+item.lsfo_agentPhone+"）</td><td>"+status+"</td><td>"+ item.lsfo_payMoney +"</td><td>"+item.lsfo_totalpay+"</td><td>"+ date +"</td></tr>";
	    	    });
	    		$("#tableData tbody").html(html);
		    	$("#sizeNum").text(result.pages.page);
		        $("#nums").text(result.pages.size);
		        $.each(result.lSFOrderTable, function(idx, item) {
		        	if(idx == 0){
		        		$("#sizeCount").html(item.size);
		        		return false;
		        	}
		        });
	    	}else{
	    		$(".tablelist tbody").html("");
	    		$("#sizeNum").text("");
	    		$("#Nums").html("");
	    		$("#sizeCount").text("");
	    	}
	    	$("#data").data("pageCount",result.pages.pageCount)
	    	selectContractList.resolve();
	    }
	    });
	
	$.when(selectContractList).done(function () {
		page();
		
		hide_table();
		
	});
	
}

/**
 * 账单隐藏
 */
function billListClose(){
	$(".billList").hide();
}

/**
 * 账单显示并读取数据
 */
function billData(ids,orderCode){
	var selectBill = $.Deferred();
	//订单记录显示层
	$(".billList").show();
	var pageCount = parseInt($("#data").data("pageCount"));
	$(".billList").css("top",(ids*35+35)+"px");
	$(".billList").width($("#contentDiv").width());
	
	$.ajax({
	    type: "POST",
	    url: "billDataList",
	    data: "orderCode="+orderCode,
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	$(".billList tbody").html("");
	    	$.each(result.lSFBillDataTable, function(idx, item) {
	    		var date = format(item.lsfd_payDate, 'yyyy-MM-dd HH:mm:ss');
	    		var money1 = "";
	    		if(item.lsfd_payAmount != null){
	    			money1 = item.lsfd_payAmount;
	    		}
	    			
	    		var date1 = "";
	    		if(item.lsfd_date != null){
	    			date1 = format(item.lsfd_date, 'yyyy-MM-dd HH:mm:ss');
	    		}
	    			
	    		var Paytype = "";
	    		if(item.lsfd_payType != null){
	    			Paytype = item.lsfd_payType;
	    		}
	    			
	    		$(".billList tbody").append("<tr><td>"+ item.lsfd_cyclenum +"</td><td>"+ item.lsfd_orderCode +"</td><td>"+ item.lsfd_realName +"（"+ item.lsfd_phone +"）</td><td>"+ item.lsfd_billStatus +"</td><td>"+ item.lsfd_amount +"</td><td>"+ money1 +"</td><td>"+ date +"</td><td>"+ date1 +"</td><td>"+ Paytype +"</td></tr>");
	    	});
	    	selectBill.resolve();
	    }
	 });
	
	$.when(selectBill).done(function () {
		$(".billList").width($("#contentDiv").width());
		
		hide_table();
	});
}

/*=======================================页面分页==============================================*/
//判断页数
function page(){
	//开始的页数样式
	if($("#sizeNum").text()<=5){
		$(".paginList").html("<li class='paginItem'><a href='javascript:up();'><span class='pagepre' id='up'></span></a></li>");
		for(var i=1; i<=$("#sizeNum").text(); i++){
			$(".paginList").append("<li id='paginList_"+ i +"' class='paginItem'><a href='javascript:li("+ i +");'>"+ i +"</a></li>");
		}
		$(".paginList").append("<li class='paginItem'><a href='javascript:down();'><span class='pagenxt' id='down'></span></a></li>");
		$(".paginList").append("<li id='sizeCount'><input type='text' onkeyup='this.value=this.value.replace(/[^0-9]\D*$/,\"\")' value='"+ $("#data").data("pageCount")  +"' placeholder='请输入条数' /></li>");
		$(".paginList").append("<li class='paginItem'><a href='javascript:data();'>设置</a></li>");
	}else{
		if($("#Num").text()<=5){
			$(".paginList").html("<li class='paginItem'><a href='javascript:up();'><span class='pagepre' id='up'></span></a></li>");
			for(var i=1; i<=5; i++){
				$(".paginList").append("<li id='paginList_"+ i +"' class='paginItem'><a href='javascript:li("+ i +");'>"+ i +"</a></li>");
			}
			$(".paginList").append("<li class='paginItem'><a href='javascript:down();'><span class='pagenxt' id='down'></span></a></li>");
			$(".paginList").append("<li id='sizeCount'><input type='text' onkeyup='this.value=this.value.replace(/[^0-9]\D*$/,\"\")' value='"+ $("#data").data("pageCount") +"' placeholder='请输入条数' /></li>");
			$(".paginList").append("<li class='paginItem'><a href='javascript:data();'>设置</a></li>");
		}
	}
	//end
	
	//样式变化
	$(".paginList li").each(function(idx) {
		$(this).attr("class", "paginItem");
	});
	$("#paginList_"+$("#Num").text()+"").attr("class", "paginItem current");
	//end
	
	//判断最后一页和第一页的样式
	if($("#Num").text() == $("#sizeNum").text() && $("#sizeNum").text() != "1"){
		$(".paginItem span[id=down]").css("background","url(/resources/image/next_1.gif) no-repeat center center");
		$(".paginItem span[id=up]").css("background","url(/resources/image/pre.gif) no-repeat center center");
	}else if($("#Num").text() == "1" && $("#sizeNum").text() != "1"){
		$(".paginItem span[id=down]").css("background","url(/resources/image/next.gif) no-repeat center center");
		$(".paginItem span[id=up]").css("background","url(/resources/image/pre_1.gif) no-repeat center center");
	}else if($("#Num").text() == "1" && $("#sizeNum").text() == "1"){
		$(".paginItem span[id=down]").css("background","url(/resources/image/next_1.gif) no-repeat center center");
		$(".paginItem span[id=up]").css("background","url(/resources/image/pre_1.gif) no-repeat center center");
	}else if($("#Num").text() != "1" && $("#Num").text() != $("#sizeNum").text()){
		$(".paginItem span[id=down]").css("background","url(/resources/image/next.gif) no-repeat center center");
		$(".paginItem span[id=up]").css("background","url(/resources/image/pre.gif) no-repeat center center");
	}
	//end
	
	//间隔变色
	$('.tablelist tbody tr:odd').addClass('odd');
}

/*点击LI分页读取数据*/
function li(id){
	
	$("#Num").text(id);
	$("#paginList_"+id+" a").attr("class", "paginItem");
	data();
}

function up(){
	// 获取当前页数
	var pageMum =parseInt($("#Num").text());
	//最大页数
	var pageSize =parseInt($("#sizeNum").text());
	if(pageMum>1){
		if((pageMum-1) % 5 ==0){
			$(".paginList").html("<li class='paginItem'><a href='javascript:up();'><span class='pagepre' id='up'></span></a></li>");
				for(var i=5; i>0; i--){
					$(".paginList").append("<li id='paginList_"+ (pageMum-i) +"' class='paginItem'><a href='javascript:li("+ (pageMum-i) +");'>"+ (pageMum-i) +"</a></li>");
				}
				$(".paginList").append("<li class='paginItem'><a href='javascript:down();'><span class='pagenxt' id='down'></span></a></li>");
				$(".paginList").append("<li id='sizeCount'><input type='text' onkeyup='this.value=this.value.replace(/[^0-9]\D*$/,\"\")' value='"+ $("#data").data("pageCount") +"' placeholder='请输入条数' /></li>");
				$(".paginList").append("<li class='paginItem'><a href='javascript:data();'>设置</a></li>");
			}
		$("#Num").text(pageMum-1);
		data();
	}
}

function down(){
	// 获取当前页数
	var pageMum =parseInt($("#Num").text());
	//最大页数
	var pageSize =parseInt($("#sizeNum").text());
	if(pageMum < pageSize){
		if((pageMum + 5)<pageSize){
			if(pageMum % 5 == 0){
				
				$(".paginList").html("<li class='paginItem'><a href='javascript:up();'><span class='pagepre' id='up'></span></a></li>");
				for(var i=1; i<= 5; i++){
						$(".paginList").append("<li id='paginList_"+ (pageMum+i) +"' class='paginItem'><a href='javascript:li("+ (pageMum+i) +");'>"+ (pageMum+i) +"</a></li>");
					}
				$(".paginList").append("<li class='paginItem'><a href='javascript:down();'><span class='pagenxt' id='down'></span></a></li>");
				$(".paginList").append("<li id='sizeCount'><input type='text' onkeyup='this.value=this.value.replace(/[^0-9]\D*$/,\"\")' value='"+ $("#data").data("pageCount") +"' placeholder='请输入条数' /></li>");
				$(".paginList").append("<li class='paginItem'><a href='javascript:data();'>设置</a></li>");
			}
			$("#Num").text(pageMum+1);
			data();
		}else{
			if(pageMum % 5 == 0){
				$(".paginList").html("<li class='paginItem'><a href='javascript:up();'><span class='pagepre' id='up'></span></a></li>");
				for(var i=4; i>=0; i--){
						$(".paginList").append("<li id='paginList_"+ (pageSize-i) +"' class='paginItem'><a href='javascript:li("+ (pageSize-i) +");'>"+ (pageSize-i) +"</a></li>");
					}
				$(".paginList").append("<li class='paginItem'><a href='javascript:down();'><span class='pagenxt' id='down'></span></a></li>");
				$(".paginList").append("<li id='sizeCount'><input type='text' onkeyup='this.value=this.value.replace(/[^0-9]\D*$/,\"\")' value='"+ $("#data").data("pageCount") +"' placeholder='请输入条数' /></li>");
				$(".paginList").append("<li class='paginItem'><a href='javascript:data();'>设置</a></li>");
			}
			$("#Num").text(pageMum+1);
			data();
		}
	}
}

//毫秒转换为日期格式
var format = function(time, format){
    var t = new Date(time);
    var tf = function(i){return (i < 10 ? '0' : '') + i};
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
        switch(a){
            case 'yyyy':
                return tf(t.getFullYear());
                break;
            case 'MM':
                return tf(t.getMonth() + 1);
                break;
            case 'mm':
                return tf(t.getMinutes());
                break;
            case 'dd':
                return tf(t.getDate());
                break;
            case 'HH':
                return tf(t.getHours());
                break;
            case 'ss':
                return tf(t.getSeconds());
                break;
        }
    });
}

//跳转修改推荐群体界面
//多选按钮判断
function ck(){
    var cbl_s = document.getElementsByName("chickes");  
    var checkCount = 0;
    var id = 0;
    for (var i = 0; i < cbl_s.length; i++) {  
            if (cbl_s[i].checked) {  
                checkCount++;
                id = cbl_s[i].id;
            }  
    }  
    if (checkCount == 0) {  
		 $.jBox.info('请选择一个！', '管家婆管理系统');
    } else if (checkCount > 1) {  
   	 $.jBox.info('只能选择一个！', '管家婆管理系统');
    } else {  
	 window.location.href = '/contractObject/jumpUpdataContract?id='+id;
 } 
}