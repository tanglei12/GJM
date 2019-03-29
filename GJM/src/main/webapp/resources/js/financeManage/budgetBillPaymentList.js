var _id = "";
var _mode = getUrlParam("mode");

$(function() {
	// 加载列表数据
	load_view();

	// 加载列表数据
	load_list_data();

	// 初始化列表事件
	init_list_event();
});

/** 初始化视图*/
function load_view() {
	_mode = getUrlParam("mode");
	switch (_mode) {
	case "collect" :
		$("title").text("收预算款");
		break;
	case "payment" :
		$("title").text("付预算款");
		break;
	}
}

/** 加载数据*/
function load_list_data(mode) {
	if (mode == "reload") {
		$("#pageNo").text(1);
	}

	var pageSize = $.cookie("pageSize");
	if (isEmpty(pageSize)) {
		$.cookie("pageSize", 16, { expires : 7 });
		pageSize = $.cookie("pageSize");
	}
	var _type = (getUrlParam("mode") == "collect" ? 0 : 1);
	
	// 赋值全局变量
	_id = getUrlParam("mode") == "collect" ? "收" : "付";

	var _state = $("select[name=orderState] option:selected").val();

	$.ajax({
		type : "POST",
		url : "/financeManage/queryBudgetOrderPaymentList",
		data : {
			pageNo : returnNumber($("#pageNo").text()),
			pageSize : pageSize,
			type : _type,
			state : _state,
			query_where : $("[name=orderWhere]").val().trim()
		},
		dataType : "json",
		beforeSend : function() {

		}
	}).done(function(result) {
		if (result.code != 200) {
			return;
		}
		$("#list-table-tbody").empty();
		if (result.data.list <= 0) {
			$(".list-table-content").addClass("table-bg");
		} else {
			$(".list-table-content").removeClass("table-bg");
		}
		$.each(result.data.list, function(index, data) {
			// 类型
			var _bbo_type = {};
			switch (returnNumber(data.bbo_type)) {
			case 0:
				_bbo_type.text = "收款";
				_bbo_type.style = "next";
				break;
			case 1:
				_bbo_type.text = "付款";
				_bbo_type.style = "hint";
				break;
			}

			// 状态
			var _bbo_state = {};
			switch (data.bbo_state) {
			case 0:
				_bbo_state.text = "待审核";
				_bbo_state.style = "hint";
				break;
			case 1:
				_bbo_state.text = "待" + _id + "款";
				_bbo_state.style = "next";
				break;
			case 2:
				_bbo_state.text = "已完结";
				_bbo_state.style = "ok";
				break;
			}

			// 操作
			var _option_html = "";
			if (data.bbo_state == 1) {
				if (returnNumber(data.bill_count) > 0) {
					_option_html = '<button class="option-btn option-btn-next" name="order-budget-btn" onclick="load_detail_data(this, ' + index + ')"><i class="fa-paypal"></i>' + _id + '款</button>';
				}
			} else if (data.bbo_state == 2) {
				_option_html = '<button class="option-btn option-btn-next" name="order-budget-btn" onclick="load_detail_data(this, ' + index + ')"><i class="fa-reorder"></i>查看</button>';
			}

			var html = '';
			html += '<tr class="' + (index % 2 == 0 ? "even" : "odd") + ' table-tbody-item' + index + '" onclick="tableTrCheck(this)">';
			html += '	<td style="width: 40px;"><label class="table-checkbox-box"><input type="checkbox" name="table-checkbox"></label></td>';
			html += '	<td style="width: 40px;">' + (index + 1) + '</td>';
			html += '	<td>' + returnValue(data.bbo_code) + '</td>';
			html += '	<td class="' + _bbo_type.style + '" style="width: 84px;">' + _bbo_type.text + '</td>';
			html += '	<td style="width: 84px;">' + returnValue(data.bbo_name) + '</td>';
			html += '	<td style="text-align: left;">' + returnValue(data.bbo_desc) + '</td>';
			html += '	<td>' + returnNumber(data.bill_count) + '</td>';
			html += '	<td class="money-font20" style="font-size: 16px;display: table-cell;">' + returnMoney(returnNumber(data.bill_sum)) + '</td>';
			html += '	<td style="width: 84px;">' + returnValue(data.bbo_creatorName) + '</td>';
			html += '	<td class="' + _bbo_state.style + '">' + _bbo_state.text + '</td>';
			html += '	<td style="width: 84px;">' + returnDate(data.bbo_budgetDate) + '</td>';
			html += '	<td>' + _option_html + '</td>';
			html += '</tr>';
			html += '<tr class="' + (index % 2 == 0 ? "even" : "odd") + ' table-tbody-option' + index + '" style="display: none;">';
			html += '	<td colspan="13" style="padding: 0px 0 8px;"><div class="loading" style="height: 60px;"></div></td>';
			html += '</tr>';
			$("#list-table-tbody").append(html).find(".table-tbody-option" + index).data("data", data);
		});

		$("#totalPage").text(result.data.totalPage);
		$("#totalRecords").text(result.data.totalRecords);
		listPage(result.data);
	});
}

/** 显示预算*/
function load_detail_data(obj, _index) {
	window.event.stopPropagation();

	$(".order-model-box").remove();
	var _option_box = $(".table-tbody-option" + _index);
	var _data = _option_box.data("data");

	// 赋值全局变量
	_id = _data.bbo_type == 0 ? "收" : "付";

	if ($(obj).attr("data-way") == "close") {
		_option_box.fadeOut();
		$(obj).html($(obj).data("cache")).removeAttr("data-way").removeClass($(obj).attr("class")).addClass($(obj).data("style"));
		return;
	}

	// 其他按钮样式初始化
	var other_obj = $(obj).parent().find(".option-btn-error");
	other_obj.html(other_obj.data("cache")).removeAttr("data-way").removeClass(other_obj.attr("class")).addClass(other_obj.data("style"));

	// 当前按钮样式初始化
	$(obj).data({
		"cache" : $(obj).html(),
		"style" : $(obj).attr("class")
	}).html('<i class="fa-remove"></i>关闭').attr("data-way", "close").removeClass($(obj).attr("class")).addClass("option-btn option-btn-error");

	// 加载数据
	$.ajax({
		type : "POST",
		url : "/financeManage/queryBudgetItemList",
		data : {
			bbo_code : _data.bbo_code,
		},
		dataType : "json",
	}).done(function(result) {
		if (result.code != 200) {
			$.jBox.tip(result.msg);
			return;
		}
		// -- 预算项目清单
		var budgetBillList = result.data.budgetBillList;
		// -- 支付类型
		var typeList = result.data.typeList;

		var colspan = (_data.bbo_type == 1 ? 15 : 14);

		// 加载视图
		var html = '';
		html += '<table class="option-subtable">';
		html += '	<thead>';
		html += '	    <tr>';
		html += '	    	<td colspan="' + colspan + '" style="text-align: left;padding: 0 10px;height: 43px;font-size: 13px;">';
		html += '	    		<label class="char-sepa-first">' + _id + '款预算</label>';
		html += '	    		<div style="float:right;">';
		html += '	    		    <div class="option-subtable-box">';
		html += '	                    <label class="order-box-icon">' + _id + '款方式</label>';
		html += '	                    <select class="order-box-info" name="budget-payType"></select>';
		html += '	                    <select class="order-box-info" name="budget-bank" style="display:none"></select>';
		html += '	                    <label class="order-box-suffix fa-unlock-alt" style="font-size: 14px;cursor: pointer;" title="未锁定">';
		html += '	                		<input type="checkbox" name="bankLock" style="display:none">';
		html += '	                	</label>';
		html += '	                </div>';
		html += '	    		</div>';
		html += '	    	</td>';
		html += '	    </tr>';
		html += '	    <tr style="background: #e1f1fb;">';
		html += '	    	<td style="width: 40px;"><label class="table-checkbox-box"><input type="checkbox" name="budget-checkbox" data-type="all"></label></td>';
		html += '	    	<td style="width: 40px;">序号</td>';
		html += '	    	<td style="width: 120px; padding: 0 8px;">房号</td>';
		html += '	    	<td style="width: 44px;">期数</td>';
		html += '	    	<td style="width: 64px;">账单类型</td>';
		html += '	    	<td style="width: 64px;">账单状态</td>';
		if (_data.bbo_type == 1) {
			html += '	    	<td style="width: 74px;">银行信息</td>';
		}
		html += '	    	<td style="width: 84px;">应' + _id + '款日期</td>';
		html += '	    	<td style="width: 64px;">应' + _id + '款</td>';
		html += '	    	<td style="width: 64px;">实' + _id + '款</td>';
		html += '	    	<td style="width: 64px;">未' + _id + '款</td>';
		html += '	    	<td style="text-align:left;padding: 0 10px;">备注</td>';
		html += '	    	<td style="width: 96px;">实际' + _id + '款日期</td>';
		html += '	    	<td style="width: 74px;">状态</td>';
		html += '	    	<td style="width: 84px;">操作</td>';
		html += '	    </tr>';
		html += '	</thead>';
		html += '	<tbody class="option-subtable-tbody">';
		html += '	    <tr class="subtable-item">';
		html += '	    	<td colspan="' + colspan + '"><div class="loading"></div></td>';
		html += '	    </tr>';
		html += '	</tbody>';
		html += '	<tfoot>';
		html += '	    <tr>';
		html += '	    	<td colspan="' + colspan + '" style="padding: 8px 10px;">';
		html += '	    		<div style="float:left;">';
		html += '					<button class="option-subtable-handle" name="order-join-budget" onclick="printBudgetBill(this,' + _index + ')" style="margin-left: 0;"><i class="fa-print"></i>打印</button>';
		html += '	    		</div>';
		html += '	    		<div style="float:right;">';
		html += '					<button class="option-subtable-handle" name="order-join-budget" onclick="submitBudgetOrder(' + _index + ')" ' + (_data.bbo_state != 1 ? "disabled" : "") + '>提交结果</button>';
		html += '	    		</div>';
		html += '	    	</td>';
		html += '	    </tr>';
		html += '	</tfoot>';
		html += '</table>';
		_option_box.find("td").html(html);

		// 锁定
		_option_box.find("[name=bankLock]").on("change", function() {
			if ($(this).is(":checked")) {
				$(this).parent().removeClass("fa-unlock-alt").addClass("fa-lock next").attr("title", "已锁定");
			} else {
				$(this).parent().removeClass("fa-lock next").addClass("fa-unlock-alt").attr("title", "未锁定");
			}
		});

		// 显示数据
		_option_box.fadeIn();
		
		// 清空数据
		_option_box.find(".option-subtable-tbody").empty();

		// 加载数据
		if (!isEmpty(budgetBillList)) {

			var _cache = {};
			$.each(budgetBillList, function(index, data) {

				var _disabled = "";
				var _payment = "--";

				// 状态
				var _state = returnBillState(data.bill_state, _id);
				// 分组房号+期数
				var boo = false;
				if(_cache.code != data.house_code){
					_cache.code = data.house_code;
					_cache.cycle = data.bill_cycle;
					boo = true;
				} else {
					if(_cache.cycle != data.bill_cycle){
						_cache.cycle = data.bill_cycle;
						boo = true;
					} else {
						boo = false;
					}
				}
				if (_cache.address != data.house_address) {
					_cache.address = data.house_address;
					_cache.style = "#fff";
				}
				if (_cache.address != data.house_address) {
					_cache.address = data.house_address;
					_cache.style = _cache.style == "#f5f8fa" ? "#fff" : "#f5f8fa";
				}

				var _budget_state = {};
				switch (data.bill_budgetState) {
				case 1:
					_budget_state.text = "待审核";
					_budget_state.style = "hint";
					break;
				case 3:
					_budget_state.text = "待" + _id + "款";
					_budget_state.style = "next";
					_disabled = "disabled";
					break;
				case 2:
					_budget_state.text = "退回";
					_budget_state.style = "error";
					_disabled = "disabled";
					break;
				case 4:
					_budget_state.text = (_data.bbo_type == 0 ? "已收款" : "已付款");
					_budget_state.style = "ok";
					_disabled = "disabled";
					break;
				}

				// 金额操作
				var _actual = "", _balance = "", _order_option = "", _date = returnDate(data.bill_repaymentDate), _date_option = "readonly";

				if (data.bill_state == 3) {
					_actual = returnFloat(data.bill_realpayment);
					_balance = returnFloat(data.bill_balance);
					_date = returnDate(data.bill_realpaymentDate);
					_date_option = "disabled";
					_order_option = "disabled";
				}

				// 按钮操作
				var option = {
					btn1 : "disabled",
					btn2 : "disabled",
					btn3 : "disabled",
				};
				if (data.bill_state != 3) {
					if (data.bill_budgetState == 3) {
						option.btn1 = "";
						option.btn2 = "";
					}
				} else {
					option.btn3 = "";
				}
				var btn_html = "";
				btn_html += '<button class="sub-option-btn ok-bg" onclick="submitBudgetBill(this,' + _index + ')" ' + option.btn1 + '>按单' + _id + '款</button>';
				btn_html += '<button class="sub-option-btn next-bg" onclick="customPayment(this,' + _index + ')" style="margin-left: 8px;" ' + option.btn2 + '>自定义</button>';
				btn_html += '<button class="sub-option-btn error-bg" onclick="revokeBudgetPayment(this,' + _index + ',' + data.bbb_id + ')" style="margin-left: 8px;" ' + option.btn3 + '>撤销' + _id + '款</button>';

				// 更多操作
				var more_option = '';
				more_option += '<div class="more-option-box">';
				more_option += '	<button class="fa-angle-double-right"></button>';
				more_option += '</div>';
				more_option += '<div class="more-option-model"></div>';
				
				// 期数更多操作
				var cycle_more = '';
				cycle_more +='<i class="next fa-info-circle"></i>';
				cycle_more +='<div class="cycle-more-option">';
				cycle_more +='	 <div class="more-option-icon"></div>';
				cycle_more +='	 <div class="more-option-main">'+ returnValue(data.bbb_cycleSegment) +'</div>';
				cycle_more +='</div>';
				
				// 列表
				var html = "";
				html += '	<tr class="subtable-item" data-code="'+ data.bill_code +'" data-cycle="'+ data.bill_cycle +'" data-type="'+ data.bill_type +'" style="background: ' + _cache.style + '">';
				if(boo){
					html += '		<td style="border-bottom: none;"><label class="table-checkbox-box"><input type="checkbox" name="budget-checkbox"></label></td>';
				} else {
					html += '		<td style="border-bottom: none;border-top: none;"></td>';
				}
				html += '		<td><span class="item-index" data-index="' + (index + 1) + '">' + (index + 1) + '</span></td>';
				html += '		<td class="budget-bill-address" onclick="showMoreOption(this,'+ _index +')">' + returnValue(data.house_address) + more_option +'</td>';
				html += '		<td class="budget-bill-cycle" style="width: 74px;padding:0 4px;padding-right: 16px;">第<label class="error">' + returnValue(data.bill_cycle) + '</label>期'+ cycle_more +'</td>';
				html += '		<td>' + returnBillType(data.bill_type) + '</td>';
				html += '		<td class="budget-bill-state ' + _state.style + '">' + _state.text + '</td>';
				if (_data.bbo_type == 1) {
					html += '		<td style="padding: 0 10px;width: 264px;">' + returnValue(data.bbb_paymentWay) + '</td>';
				}
				html += '		<td>' + returnDate(data.bill_repaymentDate) + '</td>';
				html += '		<td style="min-width: 64px;width: 64px;"><input type="text" class="budget-input minusNumber" maxlength="11"  name="order-payable" value="' + returnFloat(data.bill_repayment) + '" disabled></td>';
				html += '		<td style="min-width: 64px;width: 64px;"><input type="text" class="budget-input minusNumber" maxlength="11"  name="order-actual" value="' + _actual + '" disabled></td>';
				html += '		<td style="min-width: 64px;width: 64px;"><input type="text" class="budget-input minusNumber" maxlength="11"  name="order-balance" value="' + _balance + '" disabled></td>';
				var _remarks = returnValue(data.bbb_remarks).split("^");
				html += '		<td style="min-width: 150px;"><input type="text" class="budget-input" maxlength="120" name="order-remarks" value="' + returnValue(_remarks[1]) + '" data-remark-cache="' + returnValue(_remarks[0]) + '" placeholder="' + returnValue(_remarks[0]) + '" title="' + returnValue(_remarks[0]) + '" style="text-align: left;" ' + _order_option + '></td>';
				html += '		<td style="min-width: 96px;width: 64px;"><input type="text" class="budget-input" name="order-date" value="' + _date + '" ' + _date_option + '></td>';
				html += '		<td class="budget-bill-state ' + _budget_state.style + '">' + _budget_state.text + '</td>';
				html += '		<td class="bill_option" style="width: 132px;padding: 0 10px;">' + btn_html + '</td>';
				html += '	</tr>';
				_option_box.find(".option-subtable-tbody").append(html).find(".subtable-item:last").data("data", data);

			});

			// 总计
			calculatePayableCost(_data.bbb_id);

			// 事件绑定--
			_option_box.find("[name^=option_change]").on("click", function() {
				var _name = this.name;
				if ($(this).is(":checked")) {
					$("[name=" + _name + "]").removeAttr("checked").parent().removeClass("common-checkbox-checked");
					$(this).attr("checked", "checked").parent().addClass("common-checkbox-checked");
				} else {
					$(this).removeAttr("checked").parent().removeClass("common-checkbox-checked");
				}
			});

			// 事件绑定--
			_option_box.find("[name=order-date]").on("click", function() {
				WdatePicker();
			});
		} else {
			_option_box.find(".option-subtable-tbody").html('<tr><td colspan="10" style="line-height: 120px;font-size: 14px;color: #e74c3c;">没有数据</td></tr>');
		}

		// 加载银行账户信息
		if (!isEmpty(typeList)) {
			_option_box.find("[name=budget-payType]").empty();
			_option_box.find("[name=budget-payType]").append('<option value="">请选择</option>');
			$.each(typeList, function(index, data) {
				_option_box.find("[name=budget-payType]").append('<option value="' + data.contractType_Name + '" data-id="' + data.contractType_Id + '">' + data.contractType_Name + '</option>');
			});
			// 改变
			_option_box.find("[name=budget-payType]").on("change", function() {
				if (!isEmpty($(this).find("option:selected").attr("data-id"))) {
					queryType(_option_box, $(this).find("option:selected").attr("data-id"));
				} else {
					_option_box.find("[name=budget-bank]").hide();
				}
			});
		}

		// 实付款
		$(document).on("input propertychange", "[name=order-actual]", function() {
			var _parent = $(this).parents(".subtable-item");
			var _payable = _parent.find("[name=order-payable]");
			if(!isEmpty(_payable.val())){
				var _balance = _parent.find("[name=order-balance]");
				_balance.val(returnFloat(_payable.val()) - returnFloat($(this).val()));
			}
			calculatePayableCost(_parent.attr("data-code"));
		});
	});
	
	// 删除其他费用项目
	$(document).on("click", ".subtable-remove", function() {
		var _box = $(this).parents(".option-subtable");
		var _parent = $(this).parents(".subtable-add");
		var _code = _parent.attr("data-code");
		var _tr_data = _parent.data("data");
		
		if (!isEmpty(_tr_data)) {
			$.jBox.confirm("确定要删除该账单么吗？", "提示", function(v, h, f) {
				if (v == 'ok') {
					$.ajax({
						type : "POST",
						url : "/financeManage/deleteBudgetBill",
						data : {
							bcb_id : _tr_data.bill_id
						},
						dataType : "json"
					}).done(function(result) {
						if (result.code != 200) {
							$.jBox.tip(result.msg);
							return;
						}
						$.jBox.tip("删除成功", "success");

						// 删除元素
						_parent.remove();

						// 计算总金额
						calculatePayableCost(_code);

						// 初始化序号
						_box.find(".subtable-item").each(function(index) {
							$(this).find(".item-index").html(index + 1).attr("data-index", index + 1);
						});
					});
				}
				return true;
			});
		} else {
			// 计算总金额
			calculatePayableCost(_code);

			// 删除元素
			_parent.remove();

			// 初始化序号
			_box.find(".subtable-item").each(function(index) {
				$(this).find(".item-index").html(index + 1).attr("data-index", index + 1);
			});

		}
	});
}

/** 预算订单--房号更多操作*/
function showMoreOption(obj, _index) {
	window.event.stopPropagation();

	var _main_box_data = $(".table-tbody-option" + _index).data("data");
	var _body_box = $(obj).parents(".option-subtable-tbody");
	var _box = $(obj).parents(".subtable-item");
	var _data = _box.data("data");
	_box.parents("tbody").find(".more-option-model").hide().empty().css("overflow", "inherit");

	var html = '';
	html += '<div class="more-option-model-icon"></div>';
	html += '<div class="model-content-body" style="width: 68px;">';
	html += '	<button class="option-model-btn next-bg" name="model-btn-target">查看房源</button>';
	html += '	<button class="option-model-btn next-bg" name="model-add-bill" '+ (_main_box_data.bbo_state == 2?"disabled":"") +'>添加账单</button>';
	html += '</div>';
	html += '<div class="model-content-body model-bill-type" style="display:none;width: 349px;padding-left: 8px;border-left: 1px solid #ddd;"></div>';

	_box.find(".more-option-model").html(html).show().css("width", "auto");

	// 【事件】查看房源
	_box.find('[name=model-btn-target]').on("click", function() {
		window.parent.href_mo('/houseLibrary/jumpHouseInfo?hi_code=' + _data.house_code, '房屋信息', '预算审核');
	});

	// 【事件】添加账单
	_box.find("[name=model-add-bill]").on("click", function() {
		var _data = _box.data("data");
		var _this = $(this);
		$.ajax({
			type : "POST",
			url : "/financeManage/queryBillTypeList",
			data : {
				pCode : 2,
				param : JSON.stringify({
					bill_type : (_data.bbb_type == 0 ? "ZL" : "TG"),
					bill_code : _data.bill_code,
					bill_cycle : _data.bill_cycle,
				}),
			},
			dataType : "json",
			beforeSend : function() {
				_box.find(".model-bill-type").html('<div class="data-loading"></div>').show();
				_box.find(".more-option-model").css("width", "425px");
				_this.attr("disabled", "disabled");
			}
		}).done(function(result) {
			if (result.code != 200) {
				return;
			}

			var html = '';
			$.each(result.data, function(index, data) {
				_body_box.find('.subtable-add[data-cycle=' + _data.bill_cycle + ']').each(function() {
					if (returnNumber($(this).attr("data-type")) == data.bt_code) {
						data.checked = true;
					}
				});
				html += '<button class="model-body-item ok-border-color" data-value="' + data.bt_code + '" ' + (data.checked ? "disabled" : "") + '>' + returnValue(data.bt_name) + '</button>';
			});
			_box.find(".model-bill-type").html(html).show();
			_box.find(".more-option-model").css("width", "425px");
			_this.removeAttr("disabled");

			// 【事件】选择账单类型
			_box.find('.model-body-item').not(":disabled").on("click", function() {
				var order_code = _data.bill_code;
				var _target_cycle = _data.bill_cycle;
				var _type = returnNumber($(this).attr("data-value"));
				var length = _body_box.find(".subtable-item[data-cycle=" + _target_cycle + "]").length + 1;

				var option_btn = "";
				option_btn += '<button class="sub-option-btn ok-bg" onclick="addBudgetBill(this,'+ _index +',4)" data-state="2" style="margin-left: 8px;">添加并'+ _id +'款</button>';
				
				// 期数更多操作
				var cycle_more = '';
				cycle_more +='<i class="next fa-info-circle"></i>';
				cycle_more +='<div class="cycle-more-option">';
				cycle_more +='	 <div class="more-option-icon"></div>';
				cycle_more +='	 <div class="more-option-main">'+ returnValue(_data.bbb_cycleSegment) +'</div>';
				cycle_more +='</div>';
				
				var html = "";
				html += '	<tr class="subtable-item subtable-add" data-code="' + order_code + '" data-cycle="' + _target_cycle + '" data-type="' + _type + '">';
				html += '		<td style="border-bottom: none;border-top: none;"></td>';
				html += '		<td><span class="item-index" data-index="' + length + '">' + length + '</span></td>';
				html += '		<td style="width: 140px; padding: 0 8px;padding-right: 16px;text-align: left;cursor: pointer;">'+ returnValue(_data.house_address) + '</td>';
				html += '		<td class="budget-bill-cycle" data-cycle-date="'+ _data.bbb_cycleSegment +'" style="width: 74px;padding:0 4px;padding-right: 16px;">第<label class="error">'+ _target_cycle +'</label>期'+ cycle_more +'</td>';
				html += '		<td>' + returnBillType(_type) + '</td>';
				html += '		<td class="budget-bill-state next">待'+ _id +'款</td>';
				if(_main_box_data.bbo_type == 1){
					html += '		<td>--</td>';
				}
				html += '		<td class="budget-bill-date">--</td>';
				html += '		<td style="min-width: 64px;width: 64px;"><input type="text" class="budget-input minusNumber" name="order-payable" maxlength="11" disabled></td>';
				html += '		<td style="min-width: 64px;width: 64px;"><input type="text" class="budget-input minusNumber" name="order-actual" maxlength="11" placeholder="' + returnBillType(_type) + '"></td>';
				html += '		<td style="min-width: 64px;width: 64px;"><input type="text" class="budget-input minusNumber" name="order-balance" maxlength="11" disabled></td>';
				html += '		<td style="min-width: 150px;"><input type="text" class="budget-input" maxlength="120" placeholder="备注" name="order-remarks" style="text-align: left;"></td>';
				html += '		<td style="min-width: 96px;width: 64px;"><input type="text" class="budget-input" name="order-date" value="' + returnDate(_data.bill_repaymentDate) + '" onfocus="WdatePicker();" readonly></td>';
				html += '		<td class="budget-bill-state next">待'+ _id +'款</td>';
				html += '		<td>'+ option_btn +'</td>';
				html += '	</tr>';
				_body_box.find(".subtable-item[data-cycle=" + _target_cycle + "]:last").after(html);
				$(this).parents(".more-option-model").hide("fast", function() {
					$(this).empty().css("overflow", "inherit");
				});;
				
				// 【事件绑定】
				_body_box.find(".subtable-add[data-cycle=" + _target_cycle + "][data-type=" + _type + "]")
					.data("prev", _data)
					.hover(function() {
						$(this).find(".item-index").text("").addClass("subtable-remove fa-minus-circle");
					}, function() {
						$(this).find(".item-index").removeClass("subtable-remove fa-minus-circle").html($(this).find(".item-index").attr("data-index"));
					})
					.find("[name=order-actual]").focus();

				// 禁用已选费用类型
				$(this).attr("disabled", "disabled");

				// 初始化序号
				_body_box.find(".subtable-item").each(function(index) {
					$(this).find(".item-index").not(".subtable-remove").html(index + 1);
					$(this).find(".item-index").attr("data-index", index + 1);
				});
			});
		});
	});

	_box.find(".more-option-model").on("click", function() {
		window.event.stopPropagation();
	});

	$(document).on("click", function() {
		_box.find(".more-option-model").hide("fast", function() {
			$(this).empty().css("overflow", "inherit");
		});
	});
}

/** 自定义付款*/
function customPayment(obj, _index) {
	var _this = $(obj);
	var parent = _this.parent();
	var cache = parent.html();

	// 初始化元素
	var _box = _this.parents(".subtable-item");
	_box.find("[name=order-actual]").removeAttr("disabled").attr("placeholder", "实付款").focus();

	// 替换内容
	var html = '';
	html += '<button class="sub-option-btn" onclick="submitBudgetBill(this, ' + _index + ', \'confirm\')">确认付款</button>';
	html += '<button class="sub-option-btn" name="cancelPayment" style="margin-left: 8px;background: #e74c3c;">取消</button>';
	parent.html(html);

	// 取消
	parent.find("[name=cancelPayment]").on("click", function() {
		_box.find("[name=order-actual]").removeAttr("placeholder").attr("disabled", "disabled").val("");
		_box.find("[name=order-balance]").val("");
		$(this).parent().html(cache);
	});
}

/** 查询类型*/
function queryType(_option_box, pid) {
	$.ajax({
		type : "POST",
		url : "/financeManage/querytBusinessType",
		data : {
			pid : pid
		},
		dataType : "json"
	}).done(function(result) {
		var target_box = _option_box.find("[name=budget-bank]");
		if (result.code != 200) {
			if (target_box.is(":visible")) {
				_option_box.find("[name=budget-bank]").fadeOut();
			}
			return;
		}
		var typeList = result.data;

		if (typeList.length < 1 && target_box.is(":visible")) {
			_option_box.find("[name=budget-bank]").fadeOut();
			return;
		}
		if (!isEmpty(typeList)) {
			_option_box.find("[name=budget-bank]").empty();
			$.each(typeList, function(index, data) {
				_option_box.find("[name=budget-bank]").append('<option value="' + data.contractType_Name + '">' + data.contractType_Name + ' [ ' + data.contractType_Value + ' ]</option>');
			});
			_option_box.find("[name=budget-bank]").fadeIn();
		}
	});
}

/** 显示隐藏删除费用项*/
function hoverOrderItem() {
	$(".subtable-add").hover(function() {
		var _td = $(this).find("td:eq(0)");
		_td.find(".item-index").addClass("subtable-remove").addClass("fa-minus-circle").empty();
	}, function() {
		var _td = $(this).find("td:eq(0)");
		_td.find(".item-index").removeClass("subtable-remove").removeClass("fa-minus-circle").html(_td.attr("data-index"));
	});
}

/** 计算应付金额*/
function calculatePayableCost(bbb_id) {
	var _option_box = $(".table-tbody-option" + bbb_id);

	var _total_payable = 0;
	var _total_actual = 0;
	var _total_balance = 0;

	_option_box.find("[name=order-payable]").each(function() {
		_total_payable += returnFloat($(this).val());
	});
	_option_box.find("[name=order-actual]").each(function() {
		_total_actual += returnFloat($(this).val());
	});
	_option_box.find("[name=order-balance]").each(function() {
		_total_balance += returnFloat($(this).val());
	});

	_option_box.find("[name=order-total-payable]").val(returnFloat(_total_payable));
	_option_box.find("[name=order-total-actual]").val(returnFloat(_total_actual));
	_option_box.find("[name=order-total-balance]").val(returnFloat(_total_balance));
}

/** 撤销预算付款*/
function revokeBudgetPayment(obj, _index, _bbb_id) {
	var _this = $(obj);
	$.jBox.confirm("确定要撤销该账单支付吗？", "提示", function(v, h, f) {
		if (v == 'ok') {
			$.ajax({
				type : "POST",
				url : "/financeManage/revokeBudgetBillPayment",
				data : {
					bbb_id : _bbb_id,
				},
				dataType : "json",
			}).done(function(result) {
				if (result.code != 200) {
					$.jBox.tip(result.msg);
					return;
				}
				$.jBox.tip("提交成功", "success");

				var _box = _this.parents(".subtable-item");
				_box.find("[name=order-actual]").val("");
				_box.find("[name=order-balance]").val("");
				_box.find("[name=order-remarks]").removeAttr("disabled");
				_box.find("[name=order-date]").removeAttr("disabled").attr("readonly", "readonly");
				_box.find(".budget-bill-state").removeClass("ok").html('待' + _id + '款').addClass("next");

				var html = '';
				html += '<button class="sub-option-btn ok-bg" onclick="submitBudgetBill(this,' + _index + ')">按单' + _id + '款</button>';
				html += '<button class="sub-option-btn next-bg" onclick="customPayment(this,' + _index + ')" style="margin-left: 8px;">自定义</button>';
				html += '<button class="sub-option-btn error-bg" onclick="revokeBudgetPayment(this,' + _index + ',' + _bbb_id + ')" style="margin-left: 8px;" disabled>撤销' + _id + '款</button>';
				_this.parent().html(html);
			});
		}
		return true;
	});
}

/** 分页*/
function listPage(data) {

	var _box = $(".foot-page-option");
	var _pageNo = returnNumber($("#pageNo").text());
	var _totalPage = returnNumber($("#totalPage").text());
	var _limit = 10;
	_limit = _totalPage < _limit ? _totalPage : _limit;
	var _offset = returnNumber((_pageNo - 1) / _limit) * _limit + 1;
	_limit = _offset + _limit - 1;

	// 基础样式
	var html = '';
	html += '<button class="page-option page-prev fa-angle-left"></button>';
	for (var i = _offset; i <= _limit; i++) {
		html += '<button class="page-option page-num" value="' + i + '">' + i + '</button>';
	}
	html += '';
	html += '';
	html += '<button class="page-option page-next fa-angle-right"></button>';
	html += '<input type="type" class="page-input number" value="' + returnNumber(data.pageSize) + '">';
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
	_box.find(".page-num[value=" + _pageNo + "]").attr("disabled", "disabled");

	// 【事件绑定】

	// 上一页
	_box.find(".page-prev").on("click", function() {
		$("#pageNo").text(_pageNo - 1);
		load_list_data();
	});
	// 下一页
	_box.find(".page-next").on("click", function() {
		$("#pageNo").text(_pageNo + 1);
		load_list_data();
	});
	// 点击页码
	_box.find(".page-num").on("click", function() {
		$("#pageNo").text($(this).val());
		load_list_data();
	});
	// 设置数值1
	_box.find(".page-set").on("click", function() {
		var _page_num = returnNumber(_box.find(".page-input").val());
		if (_page_num < 1 || _page_num > 100) {
			$.jBox.tip("设值范围1~100");
			return;
		}
		$("#pageNo").text("1");
		$.cookie("pageSize", _page_num, {
			expires : 7
		});
		load_list_data();
	});
	// 设置数值2
	_box.find(".page-input").on("keydown", function(e) {
		if (e.keyCode == 13) {
			var _page_num = returnNumber($(this).val());
			if (_page_num < 1 || _page_num > 100) {
				$.jBox.tip("设值范围1~100");
				return;
			}
			$("#pageNo").text("1");
			$.cookie("pageSize", _page_num, {
				expires : 7
			});
			load_list_data();
		}
	});
}

/** 初始化列表事件*/
function init_list_event() {
	
	$("[name=table-checkbox]").on("change", function() {
		if ($(this).attr("data-type") == "all") {
			if ($(this).is(":checked")) {
				$("[name=table-checkbox]").attr("checked", "checked").parent().addClass("table-checkbox-checked");
			} else {
				$("[name=table-checkbox]").removeAttr("checked").parent().removeClass("table-checkbox-checked");
			}
		} else {
			if ($(this).is(":checked")) {
				$(this).parent().addClass("table-checkbox-checked");
			} else {
				$(this).parent().removeClass("table-checkbox-checked");
			}
		}
	});
	
	$(document).on("change", "[name=budget-checkbox]", function() {
		var _this = $(this);
		var _box = _this.parents(".option-subtable");
		
		if (_this.attr("data-type") == "all") {
			if (this.checked) {
				_box.find('[name='+ this.name +']').not(":disabled").attr("checked", "checked").parent().addClass("table-checkbox-checked");
			} else {
				_box.find('[name='+ this.name +']').not(":disabled").removeAttr("checked").parent().removeClass("table-checkbox-checked");
			}
		} else {
			var all_check_length = _box.find('[name='+ this.name +']').not('[name='+ this.name +'][data-type=all]').length;
			var all_checked_length = _box.find('[name='+ this.name +']:checked').not('[name='+ this.name +'][data-type=all]').length;
			
			if (this.checked) {
				_this.parent().addClass("table-checkbox-checked");
				if(all_check_length == all_checked_length){
					_box.find('[name='+ this.name +'][data-type=all]').attr("checked", "checked").parent().addClass("table-checkbox-checked");
				}
			} else {
				_this.parent().removeClass("table-checkbox-checked");
				if(all_check_length != all_checked_length){
					_box.find('[name='+ this.name +'][data-type=all]').removeAttr("checked").parent().removeClass("table-checkbox-checked");
				}
			}
		}
	});
}

/** 初始化表格点击*/
function tableTrCheck(obj) {
	var _check = $(obj).find("input[type=checkbox]");
	$("input[name=" + _check[0].name + "]").removeAttr("checked").parent().removeClass("table-checkbox-checked");
	_check.attr("checked", "checked").parent().addClass("table-checkbox-checked");
}

/** 打印账单单据*/
function printBudgetBill(obj,_index) {
	var _main_box = $(".table-tbody-option" + _index);
	var _main_box_data = _main_box.data("data");
	
	var map = {};
	var list = [];
	var boo = true;
	_main_box.find(".subtable-item").find("[name=budget-checkbox]:checked").each(function(){
		var _data_code = $(this).parents(".subtable-item").attr("data-code");
		var _data_cycle = $(this).parents(".subtable-item").attr("data-cycle");
		
		_main_box.find(".subtable-item[data-code="+ _data_code +"][data-cycle="+ _data_cycle +"]").each(function(){
			var _data = $(this).data("data");
			if(!isEmpty(_data) && _data.bill_state == 3){
				if(!map[_data.bill_code + _data.bill_cycle]){
					list.push({
						code : returnDate(new Date(), 'yyyyMMddHHmmss'),
						name : '',
						address : _data.house_address,
						items : [{
							name : returnBillType(_data.bill_type),
							desc : returnValue(_data.bill_type == 0?returnValue(_data.bbb_remarks).replace("^",""):returnValue(_data.bbb_remarks).split("^")[1]),
							value : returnFloat(_data.bill_realpayment),
							date : returnDate(_data.bill_realpaymentDate, "yyyy年MM月dd日")
						}]
					});
					map[_data.bill_code + _data.bill_cycle] = _data.bill_code + _data.bill_cycle; 
				} else {
					$.each(list, function(index, data){
						if((data.code + data.cycle) == (_data.bill_code + _data.bill_cycle)){
							data.items.push({
								name : returnBillType(_data.bill_type),
								desc : returnValue(_data.bill_type == 0?returnValue(_data.bbb_remarks).replace("^",""):returnValue(_data.bbb_remarks).split("^")[1]),
								value : returnFloat(_data.bill_realpayment),
								date : returnDate(_data.bill_realpaymentDate, "yyyy年MM月dd日")
							});
						} 
					});
				}
			} else {
				return boo = false;
			}
		});
	});
	
	if(!boo){
		$.jBox.tip("请选择已经支付的账单!","error");
		return;
	}
	if(isEmpty(list)){
		$.jBox.tip("请选择打印的内容!", "error");
		return;
	}
	
	// 打印
	commonBillPrint({
		title : '重庆管家婆房屋托管中心专用收据',
		subTitle : (_main_box_data.bbo_type == 0?'收':'付') + '款凭证',
		maxLine : 5,
		list : list
	});
}

/** 加载打印服务*/
function load_print_service(_box){
	var LODOP = getLodop();  
	LODOP.PRINT_INIT("票据打印");
	var _sub_box = $(_box).find(".tablePrint");
	_sub_box.each(function(index){
		LODOP.ADD_PRINT_TABLE(30,17,"99.8%",400,$(this).html());
		LODOP.ADD_PRINT_TEXT(10,700,100,22, "第"+ (index+1) +"页/共"+ _sub_box.length +"页");
		LODOP.NewPageA();//分页
	});
	LODOP.PREVIEW();
}

/** 【提交数据】添加预算账单 */
function addBudgetBill(obj, _index, _type) {
	var _main_box = $(".table-tbody-option" + _index);
	var _main_box_data = _main_box.data("data");
	var _item_box = $(obj).parents(".subtable-item");
	var _item_box_data = _item_box.data("prev");

	var _boo = false;

	// 银行账户信息
	var bbb_bankAccount = "";
	var bbb_bankName = "";
	var bbb_bankCard = "";
	var balPay = (_item_box_data.contractObject_Type == "租赁合同"?'收':'付'); 
	
	var bill_repayment = _item_box.find("[name=order-actual]");
	if (isEmpty(bill_repayment.val())) {
		bill_repayment.msg("请填写金额");
		return _boo = false;
	}
	var bill_realpaymentDate = _item_box.find("[name=order-date]");
	if (isEmpty(bill_realpaymentDate.val())) {
		bill_realpaymentDate.msg("请选择日期");
		return _boo = false;
	}
	if (isEmpty(_type)) {
		$.jBox.tip("参数错误，请刷新页面重试");
		return _boo = false;
	}
	
	var payment_way = _main_box.find("[name=budget-payType] option:selected");
	if (isEmpty(payment_way.val())) {
		_main_box.find("[name=budget-payType]").msg("请选择收款方式");
		return;
	}
	
	// 设置数据
	var data = {};
	var billBudgets = new Array();
	var billBudget = {};
	billBudget.bill_code = _item_box.attr("data-code");
	billBudget.bill_type = _item_box.attr("data-type");
	billBudget.bill_cycle = _item_box.attr("data-cycle");
	billBudget.bill_budgetState = _type;// TODO 昨天未完成处
	billBudget.contractObject_Type = _item_box_data.contractObject_Type;
	billBudget.bill_paymentWay = payment_way.val();
	billBudget.bill_repayment = bill_repayment.val();
	billBudget.bill_realpaymentDate = bill_realpaymentDate.val();
	billBudget.bbb_paymentWay = bbb_bankAccount + bbb_bankName + bbb_bankCard;
	billBudget.bbb_remarks = "第"+ _item_box.attr("data-cycle") + "期" + balPay + "款[ " + _item_box_data.bbb_cycleSegment + " ]^" + _item_box.find("[name=order-remarks]").val();
	billBudget.bbb_cycleSegment = _item_box_data.bbb_cycleSegment;
	billBudgets.push(billBudget);
	data.billBudgets = JSON.stringify(billBudgets);
	data.bbo_code = _main_box_data.bbo_code;
	
	if (_boo) {
		return;
	}

	$.jBox.confirm("确定提交预算吗？", "提示", function(v) {
		if (v == 'ok') {
			$.ajax({
				type : "POST",
				url : "/financeManage/addBudgetBill",
				data : JSON.stringify(data),
				dataType : "json",
				contentType : "application/json; charset=utf-8",
			}).done(function(result) {
				if (result.code != 200) {
					$.jBox.tip(result.msg);
					return;
				}
				$.jBox.tip("提交成功", "success");
				
				var html = '';
				html += '<button class="sub-option-btn ok-bg" onclick="submitBudgetBill(this,' + _index + ')" disabled>按单' + _id + '款</button>';
				html += '<button class="sub-option-btn next-bg" onclick="customPayment(this,' + _index + ')" style="margin-left: 8px;" disabled>自定义</button>';
				html += '<button class="sub-option-btn error-bg" onclick="revokeBudgetPayment(this,' + _index + ',' + result.data.bbb_id + ')" style="margin-left: 8px;">撤销' + _id + '款</button>';
				$(obj).parent().html(html);
				
				_item_box.find(".budget-bill-date").html(returnDate(result.data.bill_repaymentDate));
				_item_box.find("[name=order-payable]").val(result.data.bill_repayment);
				_item_box.find("[name=order-actual]").attr("disabled", "disabled");
				_item_box.find("[name=order-remarks]").attr("disabled", "disabled");
				_item_box.find("[name=order-date]").attr("disabled", "disabled");
				_item_box.find(".budget-bill-state").removeClass("hint").removeClass("next").html('已'+ _id +'款').addClass("ok");
				
				_item_box.data("data", result.data).removeClass("subtable-add").unbind("hover");
				
			});
		}
		return true;
	});
}

/** 【提交数据】提交预算账单收款、付款结果*/
function submitBudgetBill(_obj, _index, mode) {
	var _option_box = $(".table-tbody-option" + _index);

	var _box = $(_obj).parents(".subtable-item");
	var _data = _box.data("data");

	var _actual = _box.find("[name=order-actual]");
	var _balance = _box.find("[name=order-balance]");
	var _remarks = _box.find("[name=order-remarks]");

	var data = {};
	if (mode == "confirm") {
		if (isEmpty(_actual.val())) {
			_actual.msg("请输入实付款");
			return;
		}
		if (returnNumber(_balance.val()) != 0 && isEmpty(_remarks.val())) {
			_remarks.msg("请填写备注说明未付款原因");
			return;
		}
		data.bill_realpayment = _actual.val();
	} else {
		data.bill_realpayment = _data.bill_repayment;
	}

	var payment_way = _option_box.find("[name=budget-payType] option:selected");
	if (isEmpty(payment_way.val())) {
		_option_box.find("[name=budget-payType]").msg("请选择收款方式");
		return;
	}
	var payment_bank = "";
	var budget_bank = _option_box.find("[name=budget-bank]:visible");
	if (budget_bank.length > 0) {
		payment_bank = budget_bank.find("option:selected").text();
	}
	var _bill_date = _box.find("[name=order-date]").val();

	data.bill_realpaymentDate = _bill_date;
	data.bill_paymentWay = payment_way.val();
	data.bill_paymentBank = payment_bank;
	data.bill_balance = _balance.val();
	data.bbb_remarks = returnValue(_remarks.attr("data-remark-cache")) + "^" + _remarks.val();
	data.bbb_id = _data.bbb_id;

	var html = "";
	if (returnNumber(_balance.val()) == 0) {
		html += '<div style="padding: 10px;">';
		html += '确定' + (_id == "收" ? "收取" : "支付") + '&nbsp;' + _data.house_address + '&nbsp;' + '第<label class="error">' + _data.bill_cycle + '</label>期&nbsp;' + returnBillType(_data.bill_type) + '&nbsp;<label class="error">' + data.bill_realpayment + '</label>&nbsp;元吗？';
		html += '</div>';
	} else {
		html += '<div id="jbox-order-balance" style="padding: 10px;">';
		html += '	<label>未收款收款日期</label>';
		html += '	<input type="text" name="bill-balance-date" placeholder="选择日期" style="display: inline-block;line-height: 36px;padding: 0 10px;border: 1px solid #ddd;border-radius: 3px;margin-left: 4px;background: rgba(251, 174, 174, 0.14)" readonly>';
		html += '</div>';
	}

	// 提交数据
	$.jBox(html, {
		title : "提示",
		buttons : {
			"确定" : 1,
			"取消" : 0
		},
		submit : function(v, h, f) {
			if (v == 1) {

				if (returnNumber(_balance.val()) != 0) {

					h.find('.errorBlock').hide('fast', function() {
						$(this).remove();
					});

					var _balance_date = h.find("[name=bill-balance-date]").val();
					if (isEmpty(_balance_date)) {
						$('<div class="errorBlock" style="display: none;padding: 0 10px;background: #e74c3c;color: #fff;border-radius: 3px;">请选择日期</div>').prependTo(h).show('fast');
						return false;
					}
					data.bill_balanceDate = _balance_date;
				}

				$.ajax({
					type : "POST",
					url : "/financeManage/submitBudgetBillPayment",
					data : data,
					dataType : "json",
				}).done(function(result) {
					if (result.code != 200) {
						$.jBox.tip(result.msg);
						return;
					}
					// 是否初始化收付款方式
					if (!_option_box.find("[name=bankLock]").is(":checked")) {
						_option_box.find("[name=budget-payType] option:eq(0)").attr("selected", "selected");
						_option_box.find("[name=budget-bank]").hide();
					}
					// 初始化账单相关样式
					_box.find(".budget-bill-state").removeClass("hint").removeClass("next").html('已'+ _id +'款').addClass("ok");

					if (isEmpty(_actual.val())) {
						_actual.val(_box.find("[name=order-payable]").val());
					}
					_actual.attr("disabled", "disabled");

					_box.find("[name=order-remarks]").attr("disabled", "disabled");
					_box.find("[name=order-date]").attr("disabled", "disabled");

					var html = '';
					html += '<button class="sub-option-btn ok-bg" onclick="submitBudgetBill(this,' + _index + ')" disabled>按单' + _id + '款</button>';
					html += '<button class="sub-option-btn next-bg" onclick="customPayment(this,' + _index + ')" style="margin-left: 8px;" disabled>自定义</button>';
					html += '<button class="sub-option-btn error-bg" onclick="revokeBudgetPayment(this,' + _index + ',' + _data.bbb_id + ')" style="margin-left: 8px;">撤销' + _id + '款</button>';
					_box.find(".bill_option").html(html);
				});
			}
		}
	});

	$("#jbox-order-balance").find("[name=bill-balance-date]").on("click", function() {
		WdatePicker({
			minDate : _bill_date,
			startDate : _bill_date
		});
	});
}

/** 【提交数据】提交预算订单 */
function submitBudgetOrder(index) {
	var _option_box = $(".table-tbody-option" + index);
	var _data = _option_box.data("data");

	var boo = true;
	_option_box.find(".subtable-item").each(function() {
		if (returnValue($(this).find("td:eq(4)").text()) != "已还款") {
			boo = false;
			return false;
		}
	});
	if (!boo) {
		$.jBox.tip("您还有未" + _id + "款的账单，不能提交" + _id + "款结果", "warning");
		return;
	}

	$.jBox.confirm("确定提交预算支付信息吗？", "提示", function(v, h, f) {
		if (v == 'ok') {
			$.ajax({
				type : "POST",
				url : "/financeManage/submitBudgetPayment",
				data : {
					bbo_id : _data.bbo_id,
					bbo_state : 2
				},
				dataType : "json",
			}).done(function(result) {
				if (result.code != 200) {
					$.jBox.tip(result.msg);
					return;
				}
				$.jBox.tip("提交成功", "success");
				load_list_data();
			});
		}
		return true;
	});
}

