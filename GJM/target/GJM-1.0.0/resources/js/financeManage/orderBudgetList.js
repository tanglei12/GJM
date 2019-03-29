$(function() {
	// 加载数据
	loadData();
	// 初始化列表点击事件
	initTableCheck();
});

/** 加载数据*/
function loadData(_mode) {
	if (_mode == "reload") {
		$("#pageNo").text(1);
	}

	var pageSize = $.cookie("pageSize");
	if (isEmpty(pageSize)) {
		$.cookie("pageSize", 16, {
			expires : 7
		});
		pageSize = $.cookie("pageSize");
	}
	var _type = $("select[name=orderType] option:selected").val();
	var _state = $("select[name=orderState] option:selected").val();

	$.ajax({
		type : "POST",
		url : "/financeManage/queryBudgetManageList",
		data : {
			pageNo : returnNumber($("#pageNo").text()),
			pageSize : pageSize,
			type : _type,
			state : _state,
			query_where : $("[name=orderWhere]").val().trim()
		},
		dataType : "json",
		beforeSend : function() {}
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
				_bbo_type.text = "收款预算";
				_bbo_type.style = "next";
				break;
			case 1:
				_bbo_type.text = "付款预算";
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
				_bbo_state.text = "已审核";
				_bbo_state.style = "next";
				break;
			case 2:
				_bbo_state.text = "已完结";
				_bbo_state.style = "ok";
				break;
			}

			// 操作
			var _option_html = "";
			if (data.bbo_state == 0) {
				if (returnNumber(data.bill_count) > 0) {
					_option_html += '<button class="option-btn option-btn-next" name="order-budget-btn" onclick="showOrderBudget(this, \'auditing\',' + index + ')"><i class="fa-key"></i>审核</button>';
					_option_html += '<button class="option-btn option-btn-hint" name="order-budget-btn" disabled><i class="fa-circle-o-notch"></i>反审</button>';
				}
			} else if (data.bbo_state == 1) {
				_option_html += '<button class="option-btn option-btn-next" name="order-budget-btn" onclick="showOrderBudget(this, \'query\', ' + index + ')"><i class="fa-reorder"></i>查看</button>';
				_option_html += '<button class="option-btn option-btn-hint" name="order-budget-btn" onclick="showOrderBudget(this, \'auditingBack\', ' + index + ')"><i class="fa-circle-o-notch"></i>反审</button>';
			} else {
				_option_html += '<button class="option-btn option-btn-next" name="order-budget-btn" onclick="showOrderBudget(this, \'query\', ' + index + ')" ><i class="fa-reorder"></i>查看</button>';
				_option_html += '<button class="option-btn option-btn-hint" name="order-budget-btn" disabled><i class="fa-circle-o-notch"></i>反审</button>';
			}

			var html = '';
			html += '<tr class="' + (index % 2 == 0 ? "even" : "odd") + ' table-tbody-item' + index + '" onclick="tableTrCheck(this)">';
			html += '	<td style="width: 40px;">';
			html += '		<label class="table-checkbox-box"><input type="checkbox" name="table-checkbox"></label>';
			html += '	</td>';
			html += '	<td style="width: 40px;">' + (index + 1) + '</td>';
			html += '	<td>' + returnValue(data.bbo_code) + '</td>';
			html += '	<td class="' + _bbo_type.style + '" style="width: 84px;">' + _bbo_type.text + '</td>';
			html += '	<td style="width: 84px;">' + returnValue(data.bbo_name) + '</td>';
			html += '	<td style="text-align: left;">' + returnValue(data.bbo_desc) + '</td>';
			html += '	<td>' + returnNumber(data.bill_count) + '</td>';
			html += '	<td class="money-font20" style="font-size: 16px;display: table-cell;">' + returnMoney(returnNumber(data.bill_sum)) + '</td>';
			html += '	<td style="width: 84px;">' + returnValue(data.bbo_creatorName) + '</td>';
			html += '	<td class="' + _bbo_state.style + '" style="width: 84px;">' + _bbo_state.text + '</td>';
			html += '	<td style="width: 84px;">' + returnDate(data.bbo_budgetDate) + '</td>';
			html += '	<td style="width: 160px;">' + _option_html + '</td>';
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
function showOrderBudget(obj, _mode, _index) {
	window.event.stopPropagation();
	$(".order-model-box").remove();

	var _option_box = $(".table-tbody-option" + _index);
	var _data = _option_box.data("data");
	var _type = _data.bbo_type == 0 ? "收" : "付";

	// 反审核模式
	if (_mode == "auditingBack") {
		$.jBox.confirm("确定撤销所有预算审核吗？", "提示", function(v, h, f) {
			if (v == 'ok') {
				$.ajax({
					type : "POST",
					url : "/financeManage/submitBudgetBillAuditingAll",
					data : {
						bbo_id : _data.bbo_id,
						bbo_state : 0
					},
					dataType : "json",
				}).done(function(result) {
					if (result.code != 200) {
						$.jBox.tip(result.msg);
						return;
					}
					$.jBox.tip("提交成功", "success");
					loadData();
				});
			}
			return true;
		});
		return;
	}

	// 显示/关闭
	if ($(obj).attr("data-way") == "close") {
		_option_box.hide(function() {
			$(this).empty().html('<td colspan="13" style="padding: 0px 0 8px;"><div class="loading" style="height: 60px;"></div></td>');
		});
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
		beforeSend : function() { _option_box.fadeIn();	}
	}).done(function(result) {
		if (result.code != 200) {
			$.jBox.tip(result.msg);
			return;
		}
		// -- 预算项目清单
		var budgetBillList = result.data.budgetBillList;

		// 加载预算清单项目数据
		if (isEmpty(budgetBillList)) {
			_option_box.find(".option-subtable-tbody").html('<tr><td colspan="10" style="line-height: 120px;font-size: 14px;color: #e74c3c;">没有数据</td></tr>');
			return;
		}

		// 加载元素
		var html = '';
		html += '<table class="option-subtable">';
		html += '	<thead>';
		html += '	    <tr>';
		html += '	    	<td colspan="12" style="text-align: left;padding: 0 10px;height: 43px;font-size: 13px;">';
		html += '	    		<label class="char-sepa-first">' + _type + '款预算</label>';
		html += '	    	</td>';
		html += '	    </tr>';
		html += '	    <tr class="subtable-title" style="background: #e1f1fb;">';
		html += '	    	<td style="width: 40px;"><label class="table-checkbox-box"><input type="checkbox" name="budget-checkbox" data-type="all"></label></td>';
		html += '	    	<td style="width: 40px;">序号</td>';
		html += '	    	<td style="width: 150px; padding: 0 8px;">房号</td>';
		html += '	    	<td style="width: 44px;">期数</td>';
		html += '	    	<td style="width: 84px;">账单类型</td>';
		html += '	    	<td style="width: 84px;">账单状态</td>';
		html += '	    	<td style="width: 84px;">应还款日期</td>';
		html += '	    	<td style="width: 74px;">应' + _type + '款</td>';
		html += '	    	<td style="text-align:left;padding: 0 10px;">备注</td>';
		html += '	    	<td style="width: 84px;">状态</td>';
		html += '	    	<td style="width: 100px;">操作</td>';
		html += '	    </tr>';
		html += '	</thead>';
		html += '	<tbody class="option-subtable-tbody">';
		html += '	    <tr class="subtable-item">';
		html += '	    	<td colspan="12"><div class="loading"></div></td>';
		html += '	    </tr>';
		html += '	</tbody>';
		html += '	<tfoot>';
		html += '	    <tr>';
		html += '	    	<td colspan="12" style="padding: 8px 10px;">';
		html += '	    		<div style="float:left;">';
		html += '					<button class="option-subtable-handle" name="order-join-budget" onclick="printBudgetBill(this,' + _index + ')" style="margin-left: 0;"><i class="fa-print"></i>打印</button>';
		html += '	    		</div>';
		html += '	    		<div style="float:right;">';
		html += '					<button class="option-subtable-handle" name="order-join-budget" onclick="submitBudgetBillAll(' + _index + ')" ' + (_data.bbo_state != 0 ? "disabled" : "") + '><i class="fa-key"></i>审核</button>';
		html += '	    		</div>';
		html += '	    	</td>';
		html += '	    </tr>';
		html += '	</tfoot>';
		html += '</table>';
		_option_box.find("td").html(html);
		// 显示主体
		_option_box.fadeIn();
		// 清空数据
		_option_box.find(".option-subtable-tbody").empty();

		var _cache = {};
		$.each(budgetBillList, function(index, data) {
			// 状态
			var _state = returnBillState(data.bill_state);
			// 背景色
			if (_cache.value != data.house_address) {
				_cache.value = data.house_address;
				_cache.style = _cache.style == "#fff" ? "#f5f8fa" : "#fff";
			}
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
			
			// 预算状态
			var _budget_state = {};
			var _btn_option = {
				opt1 : "disabled",
				opt2 : "disabled",
				opt3 : "disabled"
			};
			switch (data.bill_budgetState) {
			case 1:
				_budget_state.text = "待审核";
				_budget_state.style = "hint";
				if (_data.bbo_state == 0) {
					_btn_option.opt1 = "";
					_btn_option.opt2 = "";
				}
				break;
			case 3:
				_budget_state.text = "已审核";
				_budget_state.style = "next";
				if (_data.bbo_state == 0) {
					_btn_option.opt3 = "";
				}
				break;
			case 2:
				_budget_state.text = "退回";
				_budget_state.style = "error";
				if (_data.bbo_state == 0) {
					_btn_option.opt3 = "";
				}
				break;
			case 4:
				_budget_state.text = "已完结";
				_budget_state.style = "ok";
				break;
			}

			// 操作按钮
			var btn_html = "";
			btn_html += '<button class="sub-option-btn ok-bg" onclick="submitBudgetBillOne(this,' + _index + ')" data-state="3" ' + _btn_option.opt1 + '>通过</button>';
			btn_html += '<button class="sub-option-btn error-bg" onclick="submitBudgetBillOne(this,' + _index + ')" data-state="2" style="margin-left: 8px;" ' + _btn_option.opt2 + '>退回</button>';
			btn_html += '<button class="sub-option-btn hint-bg" onclick="submitBudgetBillOne(this,' + _index + ')" data-state="1" style="margin-left: 8px;" ' + _btn_option.opt3 + '>反审核</button>';

			// 更多操作
			var more_option = '';
			more_option += '<div class="more-option-box">';
			more_option += '	<button class="fa-angle-double-right"></button>';
			more_option += '</div>';
			more_option += '<div class="more-option-model"></div>';
			
			// 应付金额
			var bcb_repayment = {
				style : "",
				text : returnFloat(data.bill_repayment)
			};
			switch (data.bill_balPay) {
			case 0 :
				if (data.contractObject_Type == "托管合同") {
					bcb_repayment.text = '-' + bcb_repayment.text;
					bcb_repayment.style = 'error';
				} else {
					bcb_repayment.style = 'ok';
				}
				break;
			case 1 :
				if (data.contractObject_Type == "托管合同") {
					bcb_repayment.style = 'ok';
				} else {
					bcb_repayment.text = '-' + bcb_repayment.text;
					bcb_repayment.style = 'error';
				}
				break;
			}
			// 序号样式
			var index_option = "";
			if(_data.bbo_state == 0 && data.bill_type != 0 && data.bill_type != 11 && data.bill_type != 12){
				index_option = "subtable-add";
			}

			var html = "";
			html += '	<tr class="subtable-item '+ index_option +'" data-code="'+ data.bill_code +'" data-cycle="' + data.bill_cycle + '" data-type="'+ data.bill_type +'" style="background: ' + _cache.style + '">';
			if(boo){
				html += '		<td style="border-bottom: none;"><label class="table-checkbox-box"><input type="checkbox" name="budget-checkbox"></label></td>';
			} else {
				html += '		<td style="border-bottom: none;border-top: none;"></td>';
			}
			html += '		<td><span class="item-index" data-index="' + (index + 1) + '">' + (index + 1) + '</span></td>';
			html += '		<td class="budget-bill-address" onclick="showMoreOption(this,'+ _index +')">' + returnValue(data.house_address) + more_option + '</td>';
			html += '		<td style="width: 210px;" data-cycle-date="'+ returnValue(data.bbb_cycleSegment) +'">第<label class="error">' + returnValue(data.bill_cycle) + '</label>期&nbsp;[' + returnValue(data.bbb_cycleSegment) + ']</td>';
			html += '		<td>' + returnBillType(data.bill_type) + '</td>';
			html += '		<td class="' + _state.style + '" style="width: 84px;">' + _state.text + '</td>';
			html += '		<td>' + returnDate(data.bill_repaymentDate) + '</td>';
			html += '		<td class="'+ bcb_repayment.style +'" style="width: 84px;">' + bcb_repayment.text + '</td>';
			html += '		<td class="error" style="white-space: inherit;padding: 0 10px;line-height: 24px;text-align: left;">' + returnValue(data.bbb_remarks).replace("^", "&nbsp;") + '</td>';
			html += '		<td class="budget-bill-state ' + _budget_state.style + '">' + _budget_state.text + '</td>';
			html += '		<td style="width: 100px;padding:0 10px;">' + btn_html + '</td>';
			html += '	</tr>';
			_option_box.find(".option-subtable-tbody").append(html);
			_option_box.find(".option-subtable-tbody .subtable-item:last").data("data", data);
			_option_box.find('.subtable-add[data-cycle='+ data.bill_cycle +'][data-type='+ data.bill_type +']')
				.hover(function() {
					$(this).find(".item-index").addClass("subtable-remove fa-minus-circle").empty();
				}, function() {
					$(this).find(".item-index").removeClass("subtable-remove fa-minus-circle").html($(this).find(".item-index").attr("data-index"));
				});
//			var all_item = _option_box.find('.subtable-add[data-code='+ data.bill_code +'][data-cycle='+ data.bill_cycle +']');
//			all_item.eq(0).find("td:eq(0)").attr("colspan", all_item.length);
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
	html += '	<button class="option-model-btn next-bg" name="model-add-bill" '+ (_main_box_data.bbo_state == 1?"disabled":"") +'>添加账单</button>';
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
				option_btn += '<button class="sub-option-btn next-bg" onclick="addBudgetBill(this,'+ _index +',1)" data-state="3">确定添加</button>';
				option_btn += '<button class="sub-option-btn ok-bg" onclick="addBudgetBill(this,'+ _index +',3)" data-state="2" style="margin-left: 8px;">添加并通过</button>';
				
				var html = "";
				html += '	<tr class="subtable-item subtable-add" data-code="' + order_code + '" data-cycle="' + _target_cycle + '" data-type="' + _type + '">';
				html += '		<td style="border-bottom: none;border-top: none;"></td>';
				html += '		<td><span class="item-index" data-index="' + length + '">' + length + '</span></td>';
				html += '		<td style="width: 150px; padding: 0 8px;padding-right: 16px;text-align: left;cursor: pointer;">'+ returnValue(_data.house_address) + '</td>';
				html += '		<td data-cycle-date="'+ _data.bbb_cycleSegment +'">第<label class="char-sepa-text error">'+ _target_cycle +'</label>期['+ _data.bbb_cycleSegment +']</td>';
				html += '		<td>' + returnBillType(_type) + '</td>';
				html += '		<td class="next">待还款</td>';
				html += '		<td class="budget-bill-date">--</td>';
				html += '		<td style="width: 100px;"><input type="text" class="budget-input minusNumber" name="order-payable" maxlength="11" placeholder="' + returnBillType(_type) + '" ></td>';
				html += '		<td><input type="text" class="budget-input" maxlength="120" placeholder="备注" name="order-remarks" style="text-align: left;"></td>';
				html += '		<td class="budget-bill-state hint">待审核</td>';
				html += '		<td>'+ option_btn +'</td>';
				html += '	</tr>';
				_body_box.find(".subtable-item[data-cycle=" + _target_cycle + "]:last").after(html);
				
				// 【事件绑定】
				_body_box.find(".subtable-add[data-cycle=" + _target_cycle + "][data-type=" + _type + "]")
					.data("prev", _data)
					.hover(function() {
						$(this).find(".item-index").text("").addClass("subtable-remove fa-minus-circle");
					}, function() {
						$(this).find(".item-index").removeClass("subtable-remove fa-minus-circle").html($(this).find(".item-index").attr("data-index"));
					})
					.find("[name=order-payable]").focus();

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

/** 查询类型*/
function queryType(pid) {
	$.ajax({
		type : "POST",
		url : "/financeManage/querytBusinessType",
		data : {
			pid : pid
		},
		dataType : "json"
	}).done(function(result) {
		var target_box = $("[name=budget-bank]");
		if (result.code != 200) {
			if (target_box.is(":visible")) {
				$("[name=budget-bank]").fadeOut();
			}
			return;
		}
		var typeList = result.data;

		if (typeList.length < 1 && target_box.is(":visible")) {
			$("[name=budget-bank]").fadeOut();
			return;
		}
		if (!isEmpty(typeList)) {
			$("[name=budget-bank]").empty();
			$.each(typeList, function(index, data) {
				$("[name=budget-bank]").append('<option value="' + data.contractType_Name + '">' + data.contractType_Name + ' [ ' + data.contractType_Value + ' ]</option>');
			});
			$("[name=budget-bank]").fadeIn();
		}
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

/** 分页 */
function listPage(data) {

	var _box = $(".foot-page-option");
	var _pageNo = returnNumber($("#pageNo").text());
	var _totalPage = returnNumber($("#totalPage").text());
	var _limit = 10;
	// 限定数：当分页数小于限定数时，显示分页数
	_limit = _totalPage < _limit ? _totalPage : _limit;
	// 起始数：(页码 - 1)/限定数 * 限定数 + 1
	var _offset = returnNumber((_pageNo - 1) / _limit) * _limit + 1;
	// 限定数：起始数 + 限定数 - 1
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
		loadData();
	});
	// 下一页
	_box.find(".page-next").on("click", function() {
		$("#pageNo").text(_pageNo + 1);
		loadData();
	});
	// 点击页码
	_box.find(".page-num").on("click", function() {
		$("#pageNo").text($(this).val());
		loadData();
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
		loadData();
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
			loadData();
		}
	});
}

/** 初始化表格点击*/
function initTableCheck() {
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
	
	var bill_repayment = _item_box.find("[name=order-payable]");
	if (isEmpty(bill_repayment.val())) {
		bill_repayment.msg("请填写金额");
		return _boo = false;
	}
	if (isEmpty(_type)) {
		$.jBox.tip("参数错误，请刷新页面重试");
		return _boo = false;
	}
	
	// 设置数据
	var data = {};
	var billBudgets = new Array();
	var billBudget = {};
	billBudget.bill_code = _item_box.attr("data-code");
	billBudget.bill_type = _item_box.attr("data-type");
	billBudget.bill_cycle = _item_box.attr("data-cycle");
	billBudget.bill_budgetState = _type;
	billBudget.contractObject_Type = _item_box_data.contractObject_Type;
	billBudget.bill_repayment = bill_repayment.val();
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
				
				_item_box.data("data", result.data);

				var option = {};
				if(_type == 1){
					option.btn1 = "";
					option.btn2 = "";
					option.btn3 = "disabled";
				}
				if(_type == 3){
					option.btn1 = "disabled";
					option.btn2 = "disabled";
					option.btn3 = "";
				}
				var html = "";
				html += '<button class="sub-option-btn ok-bg" onclick="submitBudgetBillOne(this,' + _index + ')" data-state="3" ' + option.btn1 + '>通过</button>';
				html += '<button class="sub-option-btn error-bg" onclick="submitBudgetBillOne(this,' + _index + ')" data-state="2" style="margin-left: 8px;" ' + option.btn2 + '>退回</button>';
				html += '<button class="sub-option-btn hint-bg" onclick="submitBudgetBillOne(this,' + _index + ')" data-state="1" style="margin-left: 8px;" ' + option.btn3 + '>反审核</button>';
				$(obj).parent().html(html);
				
				_item_box.find("[name=order-payable]").attr("disabled", "disabled");
				_item_box.find("[name=order-remarks]").attr("disabled", "disabled");
				_item_box.find(".budget-bill-date").text(returnDate(result.data.bill_repaymentDate));
				
			});
		}
		return true;
	});
}

/** 【提交数据】提交单个预算账单 */
function submitBudgetBillOne(_this, _index) {
	var _option_box = $(".table-tbody-option" + _index);
	var _sub_box = $(_this).parents(".subtable-item");
	var _data = _sub_box.data("data");

	$.jBox.confirm("确定" + returnValue($(_this).text()) + "吗？", "提示", function(v, h, f) {
		if (v == 'ok') {
			$.ajax({
				type : "POST",
				url : "/financeManage/submitBudgetBillAuditingOne",
				data : {
					bbb_id : _data.bbb_id,
					bill_optionState : $(_this).attr("data-state")
				},
				dataType : "json",
			}).done(function(result) {
				if (result.code != 200) {
					$.jBox.tip(result.msg, "error");
					return;
				}

				var option = {
						btn1 : "disabled",
						btn2 : "disabled",
						btn3 : "disabled",
					};
				
				var state_box = _sub_box.find(".budget-bill-state");
				
				state_box.removeClass("hint").removeClass("error").removeClass("next");
				switch (result.data.bill_budgetState) {
				case 1:
					state_box.html("待审核").addClass("hint");
					option.btn1 = "";
					option.btn2 = "";
					break;
				case 2:
					state_box.html("退回").addClass("error");
					option.btn3 = "";
					break;
				case 3:
					state_box.html("已审核").addClass("next");
					option.btn3 = "";
					break;
				}

				var html = "";
				html += '<button class="sub-option-btn ok-bg" onclick="submitBudgetBillOne(this,' + _index + ')" data-state="3" ' + option.btn1 + '>通过</button>';
				html += '<button class="sub-option-btn error-bg" onclick="submitBudgetBillOne(this,' + _index + ')" data-state="2" style="margin-left: 8px;" ' + option.btn2 + '>退回</button>';
				html += '<button class="sub-option-btn hint-bg" onclick="submitBudgetBillOne(this,' + _index + ')" data-state="1" style="margin-left: 8px;" ' + option.btn3 + '>反审核</button>';
				$(_this).parent().html(html);

			}).fail(function(e) {
				$.jBox.tip("请求出错，请刷新页面或者联系管理员", "error");
			});
		}
		return true;
	});
}

/** 【提交数据】提交全部预算账单*/
function submitBudgetBillAll(index) {
	var _option_box = $(".table-tbody-option" + index);
	var _data = _option_box.data("data");

	var len = 0;
	_option_box.find(".subtable-item").each(function() {
		var _state = $(this).find("td:eq(8)").text();
		if (_state == "待审核") {
			len++;
		}
	});
	var tip = "确定提交预算审核信息吗？";
	if (len > 0) {
		tip = '<label class="error">您有&nbsp;' + len + '&nbsp;项【待审核】的账单</label><br>确定全部通过并提交审核结果吗？';
	}

	$.jBox.confirm(tip, "提示", function(v, h, f) {
		if (v == 'ok') {
			$.ajax({
				type : "POST",
				url : "/financeManage/submitBudgetBillAuditingAll",
				data : {
					bbo_id : _data.bbo_id,
					bbo_state : 1
				},
				dataType : "json",
			}).done(function(result) {
				if (result.code != 200) {
					$.jBox.tip(result.msg);
					return;
				}
				$.jBox.tip("提交成功", "success");
				loadData();
			});
		}
		return true;
	});
}
