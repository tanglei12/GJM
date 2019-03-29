var selectContractList = null;
$(function(){
	data();
	$("#loading").height($(window).height());
	selectTo_people();
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
	    url: "trusteeshipOrderList",
	    data: "txt="+$("#orderInput").val()+"&status="+$("#orderType").val()+"&page="+$("#Num").text()+"&sizeCount="+sizeCount+"&to_people="+$("select[name='to_people']").val(),
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	$("#tableContent #tableData tbody").html("");
	    	if(result != "1"){
	    		var html = "";
	    		$.each(result.billTrusteeshipOrderVos, function(idx, item) {
	    			var date = format(item.tso_startDate, 'yyyy-MM-dd HH:mm:ss');
	    			var status = "";
	    			if(item.tso_payState == "逾期"){
	    				status = "<font color='#E74C3C'>"+ item.tso_payState +"</font>"
	    			}else if(item.tso_payState == "未还款"){
	    				status = "<font color='#F1C40F'>"+ item.tso_payState +"</font>"
	    			}else if(item.tso_payState == "催租"){
	    				status = "<font color='#E67E22'>"+ item.tso_payState +"</font>"
	    			}else if(item.tso_payState == "待还款"){
	    				status = "<font color='#1ABC9C'>"+ item.tso_payState +"</font>"
	    			}else{
	    				status = item.tso_payState;
	    			}
	    			if(item.tso_overdue == 0 || item.tso_overdue == null){
	    				item.tso_overdue = "";
	    			}else{
	    				item.tso_overdue = "(已逾期"+item.tso_overdue+"天)";
	    			}
	    			if(item.tso_stateUser == '催租'){
	    				item.tso_stateUser = "<td style='color:red'>催租</td>"
	    			}else{
	    				item.tso_stateUser = "<td>正常</td>"
	    			}
	    			html+="<tr class='tr'  id='data_contents'><td><input name='chickes' type='checkbox' id='"+item.tso_code+"'/></td><td>"+(idx+1)+"</td><td><a href='javascript:billData(\""+ (idx+1) +"\",\""+ (item.tso_code) +"\");'>"+item.tso_code+"</a></td><td>"+item.tso_contractCode+"</td>"+item.tso_stateUser+"</td><td>租金</td><td>"+item.tso_name+"（"+item.tso_phone+"）</td><td>"+item.tso_peopleName+"（"+item.tso_peoplePhone+"）</td><td>"+item.tso_state+"</td><td>"+status+item.tso_overdue+"</td><td>"+ item.tso_shouldMoney +"</td><td>"+item.tso_sumMoney+"</td><td>"+ date +"</td></tr>";
	    	    });
	    		$("#tableData tbody").html(html);
		    	$("#sizeNum").text(result.pages.page);
		        $("#nums").text(result.pages.size);
		        $.each(result.billTrusteeshipOrderVos, function(idx, item) {
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
	    },
	    beforeSend:upLoadAnimation()
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
	$(".billList").css("top",(ids*35+99)+"px");
	
	$.ajax({
	    type: "POST",
	    url: "trusteeshipBillList",
	    data: "orderCode="+orderCode,
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	$(".billList tbody").html("");
	    	$.each(result.billTenantBillTable, function(idx, item) {
	    		var date = format(item.tsb_realPaymentDate, 'yyyy-MM-dd HH:mm:ss');
	    		var money1 = "";
	    		if(item.tsb_realPayment != null){
	    			money1 = item.tsb_realPayment;
	    		}
	    			
	    		var date1 = "";
	    		if(item.tsb_repaymentDate != null){
	    			date1 = format(item.tsb_repaymentDate, 'yyyy-MM-dd HH:mm:ss');
	    		}
	    			
	    		var Paytype = "";
	    		if(item.tsb_payWay != null){
	    			Paytype = item.tsb_payWay;
	    		}
	    		if(date == '1970-01-01 08:00:00'){
	    			date = "";
	    		}	
	    		var tsb_overdue = "";
	    		if(item.tsb_state == "已还款"){
	    			tsb_overdue = "未逾期";
	    		}
	    		if(item.tsb_overdue != "" && item.tsb_overdue != null){
	    			tsb_overdue = item.tsb_overdue+"天";
	    		}
	    		if(item.tsb_messageNum != "" && item.tsb_messageNum != null){
	    		}else{
	    			item.tsb_messageNum = "未发短信";
	    		}
	    		if(item.tso_stateUser == '催租'){
    				item.tso_stateUser = "<td style='color:red'>催租</td>"
    			}else{
    				item.tso_stateUser = "<td>正常</td>"
    			}
	    		$(".billList tbody").append("<tr><td>"+ item.tsb_payCycleNum +"</td><td>"+ item.tsb_code +"</td>"+ item.tso_stateUser +"<td>"+ item.tsb_name +"（"+ item.tsb_phone +"）</td><td>"+ item.tsb_state +"</td><td>"+ item.tsb_repayment +"</td><td>"+ money1 +"</td><td>"+ date1 +"</td><td>"+ date +"</td><td>"+ tsb_overdue +"</td><td>"+ Paytype +"</td><td>"+item.tsb_messageNum+"</td></tr>");
	    	});
	    	selectBill.resolve();
	    }
	 });
	
	$.when(selectBill).done(function () {
		
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


function selectTo_people(){
	$.ajax({
	    type: "POST",
	    url: "selectTo_people",
	    data: [],
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	if(result != 0){
	    		$.each(result.billPartnersList, function(idx, item) {
	    			$("select[name='to_people']").append("<option value='"+item.bp_name+"'>"+item.bp_name+"</option>");
	    		});
	    	}
	    }
	});
}

//跳转打租界面
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
	  window.parent.href_mo('/jumpaddLeaseToLandlordPage?tso_code='+id,"付租","托管订单");
	 //window.location.href = '/jumpaddLeaseToLandlordPage?tso_code='+id;
} 
}