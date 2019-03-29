var billTypeList = [];
$(function(){
	data();
});

// 查询数据
function data(){
	getBillTypeList();
	var cycle = getQueryString("cycle");
	$.ajax({
  	    type: "POST",
  	    url: "/financeManage/selectBillListy",
  	    data : {
  	    	bco_id : getQueryString("bco_id"),
  	    	cycle: cycle
  	    },
  	    dataType: "json",
  	    async: false,
  	    success: function(result) {
  	    	var order = result.order;
  	    	var pay_type = order.bco_type;
  	    	var balPay = pay_type == 201 ? "付" : "收";
  	    	var customer_type = pay_type == 201 ? "[房东]" : "[租客]";
  	    	
  	    	$(".pay_type").html(pay_type == 201 ? "待付款" : "待收款");
  	    	$(".balPay").html(balPay);
  	    	
  	    	if(pay_type == 201){
  	    		$("#submit").attr("disabled", "disabled").text("移动端暂不支持付款").css("background", "#ddd");
  	    	}
  	    	
  	    	var cMoney = result.list.bcb_repayment - result.list.bcb_realPayment;
//  	    	if(cMoney > 0){
//  	    		cMoney = "+"+cMoney.toFixed(2);
//  	    	}else{
//  	    		cMoney = cMoney.toFixed(2);
//  	    	}
//  	    	if(result.order.bco_type != null && result.order.bco_type == 201){
//  	    		cMoney = -cMoney;
//  	    	}
//  	    	var yDay = result.order.bco_currentOverDay;
//  	    	if(yDay == null || yDay == 0){
//  	    		$(".content_top_cneter .state").text("");
//  	    		$(".content_top_cneter .state").css("background-color","#FFF");
//  	    	}else{
//  	    		$(".content_top_cneter .state").text("逾期"+yDay+"天")
//  	    	}
  	    	
  	    	$(".content_top_title .money").text(returnFloat(cMoney));
  	    	$(".content_top_cneter .nameLabel").text(getQueryString("name") + " " + customer_type);
  	    	$(".content_top_cneter .address").text(getQueryString("house_address"));
  	    	$(".content_top_cneter .bill_date").html(!isEmpty(result.list.bcb_repaymentDate) ? returnDate(result.list.bcb_repaymentDate) : "");
  	    	$(".content_top_cneter .month").text("第"+cycle+"/"+result.order.bco_totalCycle+"期");
  	    	var html = "";
  	    	$(result.list.childs).each(function(index,item){
  	    		// 样式
  	    		var bottom = "";
  	    		if(result.list.childs.length == (index+1)){
  	    			bottom = "bottom";
  	    		}
  	    		
  	    		// 备注
  	    		var remark = isEmpty(item.bcb_remarks) ? "没有备注信息" : item.bcb_remarks;
  	    		if(parseBillType(item.bcb_type) == "租金"){
  	    			remark = returnDate(item.bcb_repaymentDate) + "~" + returnDate(item.repaymentEndDate);
  	    		}
  	    		
  	    		var bcb_repayment = returnFloat(item.bcb_repayment) + "元";
  	    		var bcb_repayment_style = 'error';
  	    		if(item.bcb_state == 3){
  	    			bcb_repayment += '[已'+ balPay +'款]';
  	    			bcb_repayment_style = '';
  	    		}
  	    		
  	    		var more = '';
  	    		if(returnFloat(item.bcb_balance) > 0){
  	    			bcb_repayment = returnFloat(item.bcb_balance) + "元";
  	    			more = returnFloat(item.bcb_repayment) + '元[应'+ balPay +'] - ' + returnFloat(item.bcb_realPayment) + '元[已'+ balPay +']';
  	    		}
  	    		
    			html += '<div class="content_moneys_content '+ bottom +'">';
    			html += '	<div class="text_center">';
    			html += '		<div class="types">'+ parseBillType(item.bcb_type) +'</div>';
    			html += '		<div class="remark">'+ remark +'</div>';
    			html += '	</div>';
    			html += '	<div class="moneys">';
    			html += '		<div class="money '+ bcb_repayment_style +'">'+ bcb_repayment +'</div>';
    			html += '		<div class="more">'+ more +'</div>';
    			html += '	</div>';
    			html += '</div>';
  	    	});
  	    	$("#content_moneys_content").html(html);
  	    	$("#zyMoney").text(result.list.bcb_repayment.toFixed(2));
  	    	$("#zsMoney").text(result.list.bcb_realPayment == null ? "0.00":result.list.bcb_realPayment.toFixed(2));
  	    	$("#date").text(result.list.bcb_repaymentDate == null ? "审核未通过":format(result.list.bcb_repaymentDate,'yyyy-MM-dd'));
  	    	$("#bco_code").val(result.order.bco_code);
  	    	
  	    	$("#submit").attr("onclick","OCBillPay.pay(\""+ result.order.bco_code +"\",\""+ cycle +"\")")
  	    }
	});
}

/**
 * 获取账单类型列表
 */
function getBillTypeList(){
	$.ajax({
  	    type: "POST",
  	    url: "/financeManage/getBillTypeList",
  	    data : {},
  	    dataType: "json",
  	    async: false,
  	    success: function(result) {
  	    	billTypeList = result.list;
  	    }
	});
}

/** 返回合同类型*/
function parseBillType(param){
	if(param == -1){
		return "综合";
	}
	var bt_name = "";
	for(var i=0;i<billTypeList.length;i++){
		var billType = billTypeList[i];
		if(billType.bt_code==param){
			bt_name = billType.bt_name;
			break;
		}
	}
	return bt_name;
}

//获取url参数
function getQueryString(key){
    var reg = new RegExp("(^|&)"+key+"=([^&]*)(&|$)");
    var result = window.location.search.substr(1).match(reg);
    return result?decodeURIComponent(result[2]):null;
 }