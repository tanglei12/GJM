$(function(){
	loadData();
	initTableCheck();
});

/** 加载数据*/
function loadData(_mode){
	if(_mode == "reload"){
		$("#pageNo").text(1);
	}
	
	var pageSize = $.cookie("page_size");
	if(isEmpty(pageSize)){
		$.cookie("page_size", 16, {expires:7});
		pageSize = $.cookie("page_size");
	}
	var _con_type = $("select[name=orderType] option:selected").val();
	
	$.ajax({
		type : "POST",
		url : "/financeManage/queryBudgetManageList",
		data : {
			pageNo : returnNumber($("#pageNo").text()),
			pageSize : pageSize,
			con_type : _con_type,
			query_where : $("[name=orderWhere]").val()
		},
		dataType : "json",
		beforeSend : function(){
			
		}
	}).done(function(result){
		if(result.code != 200){
			return;
		}
		$("#list-table-tbody").empty();
		if(result.data.list <= 0){
			$(".list-table-content").addClass("table-bg");
		} else {
			$(".list-table-content").removeClass("table-bg");
		}
		$.each(result.data.list, function(index, data){
			var con_type = {};
			var con_type1 = {};
			var _bbb_state = {};
			var _bbb_payType = {};
			
			con_type.title = data.contractObject_Type == "租赁合同" ? "收款" : "付款";
			con_type1.title = data.contractObject_Type == "租赁合同" ? "收款" : "付款";
			
			switch (data.bbb_state) {
				case 0:
					_bbb_state.title = "待" + con_type.title;
					_bbb_state.color = "next";
					break;
				case 1:
					_bbb_state.title = "已" + con_type.title;
					_bbb_state.color = "ok";
					con_type1.title = "查看";
					con_type1.style = "background: #ececec;color: #666666;";
					break;
			}
			
			switch (data.bbb_payType) {
				case 0:
					_bbb_payType.title = "收款";
					_bbb_payType.color = "ok";
					break;
				case 1:
					_bbb_payType.title = "付款";
					_bbb_payType.color = "error";
					break;
			}
			
			var html = '';
			html += '<tr class="'+ (index%2 == 0?"even":"odd") +' table-tbody-item'+ index +'" data-style="yes" onclick="tableTrCheck(this)">';
			html += '	<td style="width: 40px;">';
			html += '		<label class="table-checkbox-box"><input type="checkbox" name="table-checkbox"></label>';
			html += '	</td>';
			html += '	<td style="width: 40px;">'+ (index + 1) +'</td>';
			html += '	<td>'+ returnDate(data.bbb_budgetDate) +'</td>';
			html += '	<td class="'+ _bbb_payType.color +'">'+ _bbb_payType.title +'</td>';
			html += '	<td>'+ returnFloat(data.bbb_repayment) +'</td>'; 
			html += '	<td>'+ returnFloat(data.bbb_realPayment) +'</td>';
			html += '	<td>'+ returnFloat(data.bbb_balance) +'</td>';
			html += '	<td>'+ returnNumber(data.budgetWillCount) +'</td>';
			html += '	<td>'+ returnNumber(data.budgetIngCount) +'</td>';
			html += '	<td>'+ returnNumber(data.budgetEdCount) +'</td>';
			html += '	<td>'+ returnNumber(data.budgetTotalCount) +'</td>';
			html += '	<td class="'+ (returnValue(data.budgetState) == "未完成"?"hint":"ok") +'">'+ returnValue(data.budgetState) +'</td>';
			html += '	<td>';
			html += '		<button class="option-btn" name="order-budget-btn" onclick="showOrderBudget(this, \''+ index +'\')" style="'+ con_type1.style +'">'+ con_type1.title +'</button>';
			html += '	</td>';
			html += '</tr>';
			html += '<tr class="'+ (index%2 == 0?"even":"odd") +' table-tbody-option'+ index +'" style="display: none;">';
			html += '	<td colspan="13" style="padding: 4px 10px 8px;"><div class="loading" style="height: 60px;"></div></td>';
			html += '</tr>';
			$("#list-table-tbody").append(html);
			$(".table-tbody-option" + index).data("data", data);
		});
		
		$("#totalPage").text(result.data.totalPage);
		$("#totalRecords").text(result.data.totalRecords);
		listPage(result.data);
	});
}

/** 显示预算*/
function showOrderBudget(obj, bbb_id){
	window.event.stopPropagation();
	$(".order-model-box").remove();
	
	var _option_box = $(".table-tbody-option" + bbb_id);
	var _data = _option_box.data("data");
	var _type = _data.contractObject_Type == "租赁合同" ? "收" : "付";
	var _type_back = _data.contractObject_Type == "租赁合同" ? "付" : "收";
	var _bbb_state = returnNumber(_data.bbb_state);
	var order_code = _data.tb_code;
	
	if(_option_box.is(":hidden")){
		_option_box.fadeIn();
		if(_bbb_state == 1){
			$(obj).html('收起').css({background: "#e74c3c",color: "#fff"});
		} else {
			$(obj).html('取消').css({background: "#e74c3c",color: "#fff"});
		}
		
		// 加载元素
		var html = '';
		html += '<table class="option-subtable">';
		html += '	<thead>';
		html += '	    <tr>';
		html += '	    	<td colspan="12" style="text-align: left;padding: 0 10px;height: 43px;font-size: 13px;">';
		html += '	    		<label class="char-sepa-first">'+ _type +'款预算</label>';
		html += '	    		<div class="char-sepa-right" style="float:right;">';
//		html += '	    		    <label class="char-sepa">订单号：<label class="char-sepa-text error">' + returnValue(order_code) + '</label></label>';
//		html += '	    		    <label class="char-sepa-split">|</label>';
//		html += '	    		    <label class="char-sepa">合同号：<label class="char-sepa-text error">' +  + '</label></label>';
//		html += '	    		    <label class="char-sepa-split">|</label>';
//		html += '	    		    <label class="char-sepa">'+ _type +'款银行：<label class="char-sepa-text error">' + returnValue(_data.bbb_bankCard) + "-" + returnValue(_data.bbb_bankName) + "-" + returnValue(_data.bbb_bankAddress) + '</label></label>';
		html += '	    		</div>';
		html += '	    	</td>';
		html += '	    </tr>';
		html += '	    <tr style="background: #e1f1fb;">';
		html += '	    	<td style="width: 40px;">#</td>';
		html += '	    	<td style="width: 150px; padding: 0 8px;">房号</td>';
		html += '	    	<td style="width: 44px;">期数</td>';
		html += '	    	<td style="width: 84px;">账单类型</td>';
		html += '	    	<td style="width: 84px;">账单状态</td>';
		html += '	    	<td style="width: 84px;">应还款日期</td>';
		html += '	    	<td style="width: 74px;">应'+ _type +'款</td>';
		html += '	    	<td style="width: 74px;">实'+ _type +'款</td>';
		html += '	    	<td style="width: 74px;">未'+ _type +'款</td>';
		html += '	    	<td style="width: 84px;">实还款日期</td>';
		html += '	    	<td style="text-align:left;padding: 0 10px;">备注</td>';
		html += '	    	<td style="width: 100px;">预算状态</td>';
		html += '	    </tr>';
		html += '	</thead>';
		html += '	<tbody class="option-subtable-tbody">';
		html += '	    <tr class="subtable-item">';
		html += '	    	<td colspan="12"><div class="loading"></div></td>';
		html += '	    </tr>';
		html += '	</tbody>';
		html += '	<tfoot>';
//		html += '	    <tr class="subtable-target">';
//		html += '	    	<td colspan="9" style="text-align: right;padding-right: 10px;">总计</td>';
//		html += '	    	<td style="width: 100px;"><input type="text" class="budget-input minusNumber" name="order-total-payable" maxlength="11" placeholder="总应'+ _type +'金额" disabled></td>';
//		html += '	    	<td style="width: 100px;"><input type="text" class="budget-input minusNumber" name="order-total-actual" maxlength="11" placeholder="总实'+ _type +'金额" disabled></td>';
//		html += '	    	<td style="width: 100px;"><input type="text" class="budget-input minusNumber" name="order-total-balance" maxlength="11" placeholder="总未'+ _type +'金额" disabled></td>';
//		html += '	    </tr>';
		html += '	    <tr>';
		html += '	    	<td colspan="12" style="padding: 8px 10px;">';
		html += '	    		<div style="float:right;">';
		if(_bbb_state == 0){
			html += '	    		    <div class="option-subtable-box">';
			html += '	                    <label class="order-box-icon" style="width: auto;padding: 0 8px;font-size: 12px;line-height: 28px;">'+ _type +'款方式</label>';
			html += '	                    <select class="order-box-info" name="budget-payType"></select>';
			html += '	                    <select class="order-box-info" name="budget-bank"></select>';
			html += '	                </div>';
//			html += '	    		    <div class="option-subtable-box">';
//			html += '	                    <label class="order-box-icon" style="width: auto;padding: 0 8px;font-size: 12px;line-height: 28px;">'+ _type +'款日期</label>';
//			html += '	                    <input type="text" class="order-box-info option-subtable-input" name="order-budget-date" placeholder="'+ _type +'款日期" title="选择'+ _type +'款日期" value="'+ returnDate(new Date()) +'" style="width: 140px;" readonly>';
//			html += '	                </div>';
//			if(returnFloat(_data.bbb_balance) > 0){
//				html += '	    		    <div class="option-subtable-box">';
//				html += '	                    <label class="order-box-icon" style="width: auto;padding: 0 8px;font-size: 12px;line-height: 28px;">未'+ _type +'款'+ _type_back +'日期</label>';
//				html += '	                    <input type="text" class="order-box-info option-subtable-input" name="order-repay-date" placeholder="未'+ _type +'款'+ _type_back +'日期" title="选择未'+ _type +'款'+ _type_back +'日期" style="width: 140px;" readonly>';
//				html += '	                </div>';
//			}
			html += '	    		    <button class="option-subtable-handle" name="order-join-budget" onclick="submitBillBudget(\''+ bbb_id +'\')">确认'+ _type +'款</button>';
		} else {
			html += '	    		    <div class="option-subtable-box">';
			html += '	                    <label class="order-box-icon" style="width: auto;padding: 0 8px;font-size: 12px;line-height: 28px;">'+ _type +'款方式</label>';
			html += '	                    <label class="order-box-info">'+ returnValue(_data.bbb_paymentWay) +'</label>';
			html += '	                </div>';
			html += '	    		    <div class="option-subtable-box">';
			html += '	                    <label class="order-box-icon" style="width: auto;padding: 0 8px;font-size: 12px;line-height: 28px;">'+ _type +'款日期</label>';
			html += '	                    <input type="text" class="order-box-info option-subtable-input" value="'+ returnDate(_data.bbb_paymentDate) +'" style="width: 140px;background: #fff;" disabled>';
			html += '	                </div>';
		}
		html += '	    		</div>';
		html += '	    	</td>';
		html += '	    </tr>';
		html += '	</tfoot>';
		html += '</table>';
		html += '';
		_option_box.find("td").html(html);
		
		// 【获取数据】
		$.ajax({
			type : "POST",
			url : "/financeManage/queryBudgetItemList",
			data : {
				bbb_budgetDate : returnDate(_data.bbb_budgetDate),
				bbb_payType : _data.bbb_payType,
			},
			dataType : "json"
		}).done(function(result){
			if(result.code != 200){
				$.jBox.tip(result.msg);
				return;
			}
			// -- 预算项目清单
			var tenantBills = result.data.tenantBills;
			var trusteeshipBills = result.data.trusteeshipBills;
			var typeList = result.data.typeList;
			
			// 加载预算清单项目数据
			if(!isEmpty(tenantBills)){
				var html = "";
				var _cache = {};
				$.each(tenantBills, function(index, data){
					var _disabled = "";
					var _payment = "--";
					if(isEmpty(_cache)){
						_cache.code = data.tb_code;
						_cache.color = "#fff";
					}
					if(_cache.code != data.tb_code){
						_cache.code = data.tb_code;
						_cache.color = _cache.color == "#f5f8fa"?"#fff":"#f5f8fa";
					}
					
					if(data.bbi_source == 1){
						_payment = '<input type="text" class="budget-input minusNumber" maxlength="11" placeholder="应付'+ returnBillType(data.bbi_type) +'" name="order-payable" value="'+ returnFloat(data.bbi_repayment) +'" '+ _disabled +'>';
					}
					
					var _state = returnBillState(data.tb_state);
					var _order_date = _state.title == "已还款"?returnDate(data.tb_date):returnDate(data.tb_shouldDate);
					var _order_balance = _state.title == "已还款"?returnFloat(data.bbb_balance):returnFloat(data.bbb_repayment);
					
					var _budget_state = {};
					switch (data.bbb_state) {
						case 0:
							_budget_state.title = "待预算";
							_budget_state.color = "hint";
							break;
						case 1:
							_budget_state.title = "已预算";
							_budget_state.color = "ok";
							_disabled = "disabled";
							break;
					}
					
					html += '	<tr class="subtable-item" data-state="'+ data.tb_state +'" data-code="'+ returnValue(data.tb_code) +'" style="background: '+ _cache.color +'">';
					html += '		<td data-index="'+ (index + 1) +'">'+ (index + 1) +'</td>';
					html += '		<td style="width: 150px; padding: 0 8px;">'+ returnValue(data.house_address) +'</td>';
					html += '		<td>'+ returnValue(data.tb_payCycleNum) +'</td>';
					html += '		<td>'+ returnBillType(data.bbb_billType) +'</td>';
					html += '		<td class="'+ _state.color +'" style="width: 84px;">'+ _state.title +'</td>';
					html += '		<td>'+ returnDate(data.tb_shouldDate) +'</td>';
					html += '		<td style="width: 84px;"><input type="text" class="budget-input minusNumber" maxlength="11"  name="order-payable" value="'+ returnFloat(data.bbb_repayment) +'" disabled></td>';
					html += '		<td style="width: 84px;"><input type="text" class="budget-input minusNumber" maxlength="11"  name="order-actual" value="'+ returnFloat(data.bbb_realPayment) +'" '+ _disabled +'></td>';
					html += '		<td style="width: 84px;"><input type="text" class="budget-input minusNumber" maxlength="11"  name="order-balance" value="'+ _order_balance +'" disabled></td>';
					html += '		<td style="width: 96px;"><input type="text" class="budget-input" name="order-date" value="'+ _order_date +'" placeholder="实还款日期" style="background: #fffcfc;cursor: pointer;" readonly '+ _disabled +'></td>';
					html += '		<td><input type="text" class="budget-input" maxlength="120" name="order-remarks" value="'+ returnValue(data.bbb_remarks) +'" placeholder="备注" style="text-align: left;" '+ _disabled +'></td>';
					html += '		<td class="'+ _budget_state.color +'">'+ _budget_state.title +'</td>';
					html += '	</tr>';
					
				});
				_option_box.find(".option-subtable-tbody").html(html);
				// 总计
				calculatePayableCost(_data.bbb_id);
			}
			
			if(!isEmpty(typeList)){
				$("[name=budget-payType]").empty();
				var first_boo = true;
				$.each(typeList, function(index, data){
					if(first_boo){
						first_boo = false;
						queryType(data.contractType_Id);
					}
					$("[name=budget-payType]").append('<option value="'+ data.contractType_Name +'" data-id="'+ data.contractType_Id +'">'+ data.contractType_Name +'</option>');
				});
				$("[name=budget-payType]").on("change", function(){
					queryType($(this).find("option:selected").attr("data-id"));
				});
			}
			
			// 选择日期
			$("[name=order-budget-date],[name=order-date]").on("focus", function(){
				WdatePicker({
					onpicked : function(dp){}
				});
			});
			
			// 选择日期
			$("[name=order-repay-date]").on("focus", function(){
				var minDate = returnDate(isEmpty(repayDateStart) ? new Date() : repayDateStart);
				var _date = new Date();
				_date = _date.setMonth(_date.getMonth(), 1);
				var maxDate = returnDate(isEmpty(repayDateEnd) ? _date : repayDateEnd);
				WdatePicker({
					minDate : minDate,
					maxDate : maxDate,
					onpicked : function(dp){}
				});
			});
			
			// 实付款
			$(document).on("input propertychange", "[name=order-actual]", function(){
				var _parent =  $(this).parents(".subtable-item");
				var _payable = _parent.find("[name=order-payable]");
				var _balance = _parent.find("[name=order-balance]");
				_balance.val(returnFloat(_payable.val()) - returnFloat($(this).val()));
				calculatePayableCost(_parent.attr("data-code"));
			});
		});
	} else {
		_option_box.fadeOut(function(){
			switch (_data.bbb_state) {
				case 0:
					$(obj).html(_type + '款').css({background: "#3498db",color: "#fff"});
					break;
				case 1:
					$(obj).html("查看").css({background: "#ececec",color: "#666"});
					break;
				default:
					$(obj).html(_type + '款').css({background: "#3498db",color: "#fff"});
				break;
			}
		});
	}
}

/** 查询类型*/
function queryType(pid){
	$.ajax({
		type : "POST",
		url : "/financeManage/querytBusinessType",
		data : {
			pid : pid
		},
		dataType : "json"
	}).done(function(result){
		var target_box = $("[name=budget-bank]");
		if(result.code != 200){
			if(target_box.is(":visible")){
				$("[name=budget-bank]").fadeOut();
			}
			return;
		}
		var typeList = result.data;
		
		if(typeList.length < 1 && target_box.is(":visible")){
			$("[name=budget-bank]").fadeOut();
			return;
		}
		if(!isEmpty(typeList)){
			$("[name=budget-bank]").empty();
			$.each(typeList, function(index, data){
				$("[name=budget-bank]").append('<option value="'+ data.contractType_Name +'">'+ data.contractType_Name + ' [ '+ data.contractType_Value +' ]</option>');
			});
			$("[name=budget-bank]").fadeIn();
		}
	});
}

/** 显示隐藏删除费用项*/
function hoverOrderItem(){
	$(".subtable-add").hover(function(){
		var _td = $(this).find("td:eq(0)");
		_td.find(".item-index").addClass("subtable-remove").addClass("fa-minus-circle").empty();
	},function(){
		var _td = $(this).find("td:eq(0)");
		_td.find(".item-index").removeClass("subtable-remove").removeClass("fa-minus-circle").html(_td.attr("data-index"));
	});
}

/** 计算应付金额*/
function calculatePayableCost(bbb_id){
	var _option_box = $(".table-tbody-option" + bbb_id);
	
	var _total_payable = 0;
	var _total_actual = 0;
	var _total_balance = 0;
	
	_option_box.find("[name=order-payable]").each(function(){
		_total_payable += returnFloat($(this).val());
	});
	_option_box.find("[name=order-actual]").each(function(){
		_total_actual += returnFloat($(this).val());
	});
	_option_box.find("[name=order-balance]").each(function(){
		_total_balance += returnFloat($(this).val());
	});
	
	_option_box.find("[name=order-total-payable]").val(returnFloat(_total_payable));
	_option_box.find("[name=order-total-actual]").val(returnFloat(_total_actual));
	_option_box.find("[name=order-total-balance]").val(returnFloat(_total_balance));
}

/** 提交预算*/
function submitBillBudget(bbb_id){
	var _option_box = $(".table-tbody-option" + bbb_id);
	var _data = _option_box.data("data");
	
	var _type = _data.contractObject_Type == "租赁合同" ? "收" : "付";
	var _type_back = _data.contractObject_Type == "租赁合同" ? "付" : "收";
	var payment_way = _option_box.find("[name=budget-payType] option:selected").val();
	var bank_info = "";
	var budget_bank = _option_box.find("[name=budget-bank]:visible");
	if (budget_bank.length > 0) {
		bank_info = budget_bank.find("option:selected").text();
	}
	
	// [收|付]款日期 
	var payment_date = _option_box.find("[name=order-budget-date]").val();
	if(isEmpty(payment_date)){
		_option_box.find("[name=order-budget-date]").msg("请选择"+ _type +"款日期");
		return;
	}
	// 未[收|付]款[付|收]款日期
	if(_option_box.find("[name=order-repay-date]").is(":visible")){
		var repay_date = _option_box.find("[name=order-repay-date]").val();
		if(isEmpty(repay_date)){
			_option_box.find("[name=order-repay-date]").msg("请选择未"+ _type +"款"+ _type_back +"日期");
			return;
		}
	}
	
	$.jBox.confirm("确定提交"+ _type +"款信息吗？", "提示", function (v, h, f) {
	    if (v == 'ok'){
	    	$.ajax({
	    		type : "POST",
	    		url : "/financeManage/updateContractBill",
	    		data : {
	    			bbb_id : bbb_id,
	    			bank_info : bank_info,
	    			payment_way : payment_way,
	    			payment_date : payment_date,
	    			repay_date : repay_date,
	    		},
	    		dataType : "json",
	    	}).done(function(result){
	    		if(result.code != 200){
	    			$.jBox.tip(result.msg);
	    			return;
	    		}
	    		$.jBox.tip("提交成功", "success");
	    		_option_box.hide();
	    		$(".table-tbody-item" + bbb_id).find(".budget-state").removeClass("next").addClass("ok").text("已"+ _type +"款");
	    		$(".table-tbody-item" + bbb_id).find("[name=order-budget-btn]").html("查看").css({background: "#ececec",color: "#666"});
	    		$(".table-tbody-option" + bbb_id).find("[name=order-join-budget]").remove();
	    		$(".table-tbody-option" + bbb_id).find("[name=order-budget-date]").attr("disabled", "disabled");
	    		
//	    		_data.bbb_id = result.data.bbb_id;
//	    		_option_box.data("data", _data);
	    	});
	    }
	    return true;
	});
}

/** 分页*/
function listPage(data){
	
	var _box = $(".foot-page-option");
	var _pageNo = returnNumber($("#pageNo").text());
	var _totalPage = returnNumber($("#totalPage").text());
	var _limit = 10;
	var _offset = returnNumber((_pageNo - 1) / _limit) * _limit + 1;
	_limit = _offset + _limit - 1;
	
	// 基础样式
	var html = '';
	html += '<button class="page-option page-prev fa-angle-left"></button>';
	for (var i = _offset; i <= _limit; i++) {
		html += '<button class="page-option page-num" value="'+ i +'">'+ i +'</button>';
	}
	html += '';
	html += '';
	html += '<button class="page-option page-next fa-angle-right"></button>';
	html += '<input type="type" class="page-input number" value="'+ returnNumber(data.pageSize) +'">';
	html += '<button class="page-option page-set">设置</button>';
	_box.html(html);
	
	// 翻页样式
	if (_pageNo == _totalPage && _totalPage != 1) {
		_box.find(".page-prev").removeAttr("disabled");
		_box.find(".page-next").attr("disabled", "disabled");
	} else if (_pageNo == 1 && _totalPage != 1) {
		_box.find(".page-prev").attr("disabled", "disabled");
		_box.find(".page-next").removeAttr("disabled");
	} else if (_pageNo == 1 && _totalPage == 1) {
		_box.find(".page-prev").attr("disabled", "disabled");
		_box.find(".page-next").attr("disabled", "disabled");
	} else if (_pageNo != 1 && _pageNo != _totalPage) {
		_box.find(".page-prev").removeAttr("disabled");
		_box.find(".page-next").removeAttr("disabled");
	}
	
	// 页码样式
	_box.find(".page-num[value="+ _pageNo +"]").attr("disabled", "disabled");
	
	// 【事件绑定】
	
	// 上一页
	_box.find(".page-prev").on("click", function(){
		$("#pageNo").text(_pageNo - 1);
		loadData();
	});
	// 下一页
	_box.find(".page-next").on("click", function(){
		$("#pageNo").text(_pageNo + 1);
		loadData();
	});
	// 点击页码
	_box.find(".page-num").on("click", function(){
		$("#pageNo").text($(this).val());
		loadData();
	});
	// 设置数值1
	_box.find(".page-set").on("click", function(){
		var _page_num = returnNumber(_box.find(".page-input").val());
		if (_page_num < 1 || _page_num > 100) {
			$.jBox.tip("设值范围1~100");
			return;
		}
		$.cookie("page_size", _page_num, {expires:7});
		loadData();
	});
	// 设置数值2
	_box.find(".page-input").on("keydown", function(e){
		if(e.keyCode == 13){
			var _page_num = returnNumber($(this).val());
			if (_page_num < 1 || _page_num > 100) {
				$.jBox.tip("设值范围1~100");
				return;
			}
			$.cookie("page_size", _page_num, {expires:7});
			loadData();
		}
	});
}

/** 初始化表格点击*/
function initTableCheck(){
	$(".table-checkbox-box").find("input[type=checkbox]").on("change", function(){
		if($(this).is(":checked")){
			$(this).parent().addClass("table-checkbox-checked");
		} else {
			$(this).parent().removeClass("table-checkbox-checked");
		}
	});
	$("[name=table-checkbox-all]").on("change", function(){
		if($(this).is(":checked")){
			$("[name=table-checkbox]").attr("checked", "checked").parent().addClass("table-checkbox-checked");
		} else {
			$("[name=table-checkbox]").removeAttr("checked").parent().removeClass("table-checkbox-checked");
		}
	});
}

/** 初始化表格点击*/
function tableTrCheck(obj){
	var _check = $(obj).find("input[type=checkbox]");
	$("input[name="+ _check[0].name +"]").removeAttr("checked").parent().removeClass("table-checkbox-checked");
	_check.attr("checked", "checked").parent().addClass("table-checkbox-checked");
}

