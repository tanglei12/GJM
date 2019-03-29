var _id,
	_content;

$(function() {
	load_data();
	load_event();
});

/** 加载数据*/
function load_data(){
	
	// 时间
	var filterDateParams = [];
	filterDateParams.push({ name : "支付日期", value : "bcb_repaymentDate", sort : 'DESC', init : 'toDay'});
	
	// 标题
	var listParams = [];
	listParams.push({text : "小区房号", name : "house_address", param : "", location : {
		pathname : '/houseLibrary/jumpHouseInfo',
		searchs : { 'hi_code' : 'hi_code' },
		currentTabName : '预算清单',
		targetTabName : '房源信息'
	}});
	listParams.push({text : "合同号", name : "contractObject_No", param : "", location : {
		pathname : '/contractObject/jumpDisplayContract',
		searchs : { 'contractObject_Code' : 'contractObject_Code' },
		currentTabName : '预算清单',
		targetTabName : '合同信息'
	}});
	listParams.push({text : "款项类型", name : "contractObject_Type", param : {
		"托管合同" : "付款",
		"租赁合同" : "收款"
	}});
	listParams.push({text : "客户信息", name : "bco_customerName", param : ""});
	listParams.push({text : "支付期数", name : "totalCycle", param: ""});
	listParams.push({text : "支付类型", name : "contractBody_PayStyle", param: {
		"月付" : "月付",
		"季付" : "季付",
		"半年付" : "半年付",
		"年付" : "年付",
	}});
	listParams.push({text : "总支付金额", name : "totalRePayment", param : "float"});
	listParams.push({text : "当期支付金额", name : "totalRealPayment", param : "float"});
	listParams.push({text : "支付日期", name : "bcb_repaymentDate", param : "date"});
	listParams.push({text : "账单状态", name : "bcb_state", param: "returnBillState"});

	// 初始化
	$.table({
		filterDateParams : filterDateParams,
		filterWhere : true,
		filterWhereDisplay : false,
		listParams : listParams,
		filterBars : [{
			type : "select",
			name : "contractObject_Type",
			data : {
				"" : "款项类型",
				"租赁合同" : "收款",
				"托管合同" : "付款",
			}
		},{
			type : "select",
			name : "",
			data : {
				"contract" : "合同预算",
				"compensate" : "代偿预算",
			}
		}],
		column : true,
		columnResult : function(_index, data){
			var html = '';
			html += '<button class="list-item-option hint" onclick="showOrderBillList(this,'+ _index +')"><i class="fa-reorder"></i>查看</button>';
			html += '<button class="list-item-option next" onclick="showOrderBudget(this,'+ _index +')"><i class="fa-reorder"></i>预算</button>';
			return html;
		},
		ajaxParams : {
			url : "/financeManage/queryOrderManageList",
		},
		ajaxDone : function(h) {
			h.find(".list-content-item").each(function(){});
			calculatePayableCost(h.find(".list-content-item").attr("data-index"));
		}
	});
}

/** 加载事件*/
function load_event(){
	
	// 应付金额计算
	$(document).on("input propertychange", "[name=order-payable]", function() {
		var _parent = $(this).parents(".subtable-item");
		calculatePayableCost(_parent.attr("data-code"));
	});

	// 实付金额计算
	$(document).on("input propertychange", "[name=order-actual]", function() {
		var _parent = $(this).parents(".subtable-item");
		var len = _parent.find("[name=order-payable]").length;
		if (len > 0) {
			var _payable = returnFloat(_parent.find("[name=order-payable]").val());
			_parent.find("[name=order-balance]").val(returnFloat(_payable - returnFloat($(this).val())));
		}
		calculatePayableCost(_parent.attr("data-code"));
	});

	// 未付金额计算
	$(document).on("input propertychange", "[name=order-balance]", function() {
		var _parent = $(this).parents(".subtable-item");
		calculatePayableCost(_parent.attr("data-code"));
	});

	// 删除其他费用项目
	$(document).on("click", ".subtable-remove", function() {
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
							bcb_id : _tr_data.bcb_id
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
						$(".table-tbody-option" + _code).find(".subtable-item").each(function(index) {
							$(this).find("td:eq(1)").attr("data-index", (index + 1)).html('<span class="item-index">' + (index + 1) + '</span>');
						});
					});
				}
				return true;
			});
		} else {
			// 删除元素
			_parent.remove();

			// 计算总金额
			calculatePayableCost(_code);

			// 初始化序号
			$(".table-tbody-option" + _code).find(".subtable-item").each(function(index) {
				$(this).find("td:eq(1)").attr("data-index", (index + 1)).html('<span class="item-index">' + (index + 1) + '</span>');
			});
		}
	});
	
	/** */
	$(document).on("change", "[name=budget-checkbox]", function() {
		var _box = $(this).parents(".option-subtable");
		var order_code = null;

		if ($(this).attr("data-type") == "all") {
			order_code = $(this).parents("[class^=table-tbody-option]").attr("data-code");
			if ($(this).is(":checked")) {
				_box.find("[name=budget-checkbox]").not(":disabled").attr("checked", "checked").parent().addClass("table-checkbox-checked");
			} else {
				_box.find("[name=budget-checkbox]").not(":disabled").removeAttr("checked").parent().removeClass("table-checkbox-checked");
			}
		} else {
			order_code = $(this).parents(".subtable-item").attr("data-code");
			if ($(this).is(":checked")) {
				$(this).parent().addClass("table-checkbox-checked");
			} else {
				$(this).parent().removeClass("table-checkbox-checked");
			}
		}
		calculatePayableCost(order_code);
	});
}

/** 【操作】显示预算 */
function showOrderBudget(obj, _index) {
	
	// 【获取元素】
	var _item_box = $.table.getItemBox(_index);
	var _option_box = $.table.getOptionBox(_index);
	
	// 【获取数据】
	var _data = _item_box.find("[name=table-checkbox]").data("data");
	
	// 【赋值局部变量】
	// 订单编号
	var order_code = _data.bco_code;
	
	// 【赋值全局变量】
	// 收付标识
	_id = _data.contractObject_Type == "租赁合同" ? "收" : "付";

	// 【初始化】
	// 显示/关闭
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

	// 【获取数据】
	$.ajax({
		type : "POST",
		url : "/financeManage/queryOrderBillList",
		data : {
			con_code : _data.contractObject_Code,
			order_code : order_code,
		},
		dataType : "json"
	}).done(function(result) {
		if (result.code != 200) {
			_option_box.find("td").html('<div class="error" style="font-size: 14px;line-height: 60px;box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.19);">' + result.msg + '</div>');
			return;
		}

		// -- 合同账单 --
		var contractBillList = result.data.contractBillList;

		// -- 预算项目清单
		var budgetItems = result.data.budgetItems;
		// -- 业务类型 --
		var businesTypeList = result.data.businesTypeList;
		// -- 账户银行信息 --
		var customerBankList = result.data.customerBankList;

		// 按钮
		var _btn = {};
		_btn.text = (_data.bcb_budgetState != 1 ? "加入预算" : "修改预算");
		_btn.style = (_data.bcb_budgetState != 1 ? '' : 'background: #1ABC9C;');

		// 加载元素
		var html = '';
		html += '<table class="option-subtable">';
		html += '	<thead>';
		html += '	    <tr>';
		html += '	    	<td colspan="10" style="text-align: left;padding: 0 10px;height: 38px;font-size: 13px;">';
		html += '	    		<label class="char-sepa-first">' + _id + '款预算</label>';
		html += '	    		<div style="float:right;">';
		html += '	    		    <label class="char-sepa">订单号：<label class="char-sepa-text error">' + order_code + '</label></label>';
		html += '	    		    <label class="char-sepa-split">|</label>';
		html += '	    		    <label class="char-sepa">合同号：<label class="char-sepa-text error">' + _data.contractObject_No + '</label></label>';
		html += '	    		</div>';
		html += '	    	</td>';
		html += '	    </tr>';
		html += '	    <tr style="background: #e1f1fb;">';
		html += '	    	<td style="width: 40px;"><label class="table-checkbox-box"><input type="checkbox" name="budget-checkbox" data-type="all"></label></td>';
		html += '	    	<td style="width: 44px;">序号</td>';
		html += '	    	<td style="width: 230px;">期数</td>';
		html += '	    	<td style="width: 100px;">应还款日期</td>';
		html += '	    	<td style="width: 84px;">' + _id + '款类型</td>';
		html += '	    	<td style="width: 84px;">' + _id + '款状态</td>';
		html += '	    	<td style="width: 100px;">应' + _id + '金额</td>';
		html += '	    	<td style="text-align:left;padding: 0 10px;">备注</td>';
		html += '	    	<td style="width: 84px;">状态</td>';
		html += '	    	<td style="width: 84px;">预算日期</td>';
		html += '	    </tr>';
		html += '	</thead>';
		html += '	<tbody class="option-subtable-tbody">';
		html += '	    <tr class="subtable-item">';
		html += '	    	<td colspan="10"><div class="loading"></div></td>';
		html += '	    </tr>';
		html += '	</tbody>';
		html += '	<tfoot>';
		html += '	    <tr class="subtable-target">';
		html += '	    	<td colspan="10" style="padding: 8px 10px;">';
		html += '	    		<button class="option-subtable-select ok-bg" name="order-add-cost">增加费用</button>';
		html += '	    		<div class="option-subtable-option" style="display:none;">';
		html += '	    			<div class="subtable-option-head"></div>';
		html += '	    			<div class="subtable-option-main">';
		html += '	    				<div class="loading"></div>';
		html += '	    			</div>';
		html += '	    		</div>';
		html += '	    		<div style="float:right;">';
		if (_data.contractObject_Type == "托管合同") {
			html += '	    		    <div class="option-subtable-box">';
			html += '	                    <i class="order-box-icon fa-credit-card"></i>';
			html += '	    		    	<label class="order-box-info order-bankInfo" title="选择打款账户" style="border-right: 1px solid #ddd;border-top-right-radius: 3px;border-bottom-right-radius: 3px;">选择账户</label>';
			html += '	    		    </div>';
		}
		html += '	    		    <div class="option-subtable-box">';
		html += '	                    <label class="order-box-title">总计</label>';
		html += '	                    <label class="order-box-content error order-total-payable">--</label>';
		html += '	                    <label class="order-box-suffix" style="border-left: none;padding-left: 0;">元</label>';
		html += '	                </div>';
		html += '	    		    <button class="option-subtable-handle" name="order-join-budget" onclick="submitBillBudget(\'' + order_code + '\')" style="' + _btn.style + '">' + _btn.text + '</button>';
		html += '	    		</div>';
		html += '	    	</td>';
		html += '	    </tr>';
		html += '	</tfoot>';
		html += '</table>';
		html += '';

		// 添加数据
		_option_box.find("td").html(html);
		// 显示元素
		_option_box.fadeIn();
		// 设置数据
		_option_box.find("[name=order-add-cost]").data("data", businesTypeList);
		// 清空数据
		_option_box.find(".option-subtable-tbody").empty();

		// 加载托管账单数据
		if (!isEmpty(contractBillList)) {
			$.each(contractBillList, function(index, data) {
				if (data.bcb_state != 2) {
					return;
				}
				// 收款状态
				var _tb_state = returnBillState(data.bcb_state, _id);
				// 序号
				var current_index = _option_box.find(".subtable-item").length + 1;
				// 期数
				var _cycle_date = returnDate(data.bcb_repaymentDate) + '~' + returnDate(data.repaymentEndDate);
				var _payCycle = '第<label class="char-sepa-text error" >' + returnNumber(data.bcb_cycle) + '</label>期[&nbsp;' + _cycle_date + '&nbsp;]';
				// 预算状态
				var budgetState = {
					text : "",
					style : ""
				};
				// 预算日期
				var budgetDate = "--";
				// TR样式
				var _class = "";
				// 选择框
				var _change = {
					style : "table-checkbox-disabled",
					option : "disabled"
				};

				// 待收款
				if (data.bcb_state == 2) {
					switch (returnNumber(data.bcb_budgetState)) {
					case 0 :
						budgetState.text = "未加入预算";
						budgetState.style = "hint";

						_class = (data.bcb_type != 0 && data.bcb_type != 11 && data.bcb_type != 12 ? "subtable-add" : "");

						if (data.bcb_repaymentDate <= new Date(returnDate(new Date())).getTime()) {
							_change.style = "table-checkbox-checked";
							_change.option = "checked";
						} else {
							_change.style = "";
							_change.option = "";
						}
						break;
					case 1 :
						budgetState.text = "已加入预算";
						budgetState.style = "next";
						budgetDate = returnDate(data.bbo_budgetDate);

						_class = (data.bcb_type != 0 && data.bcb_type != 11 && data.bcb_type != 12 ? "subtable-add" : "");

						_change.style = "";
						_change.option = "";
						break;
					case 2 :
						budgetState.text = "预算未通过";
						budgetState.style = "error";
						budgetDate = returnDate(data.bbo_budgetDate);

						_change.style = "";
						_change.option = "";
						break;
					case 3 :
						budgetState.text = "预算已通过";
						budgetState.style = "next";
						budgetDate = returnDate(data.bbo_budgetDate);
						break;
					case 4 :
						budgetState.text = "预算已完结";
						budgetState.style = "ok";
						budgetDate = returnDate(data.bbo_budgetDate);
						break;
					}
				} else {
					budgetDate = "";
				}

				// 应付金额
				var bcb_repayment = {
					style : "",
					text : returnFloat(data.bcb_repayment)
				};
				switch (data.bcb_balPay) {
				case 0 :
					if (_data.contractObject_Type == "托管合同") {
						bcb_repayment.text = '-' + bcb_repayment.text;
						bcb_repayment.style = 'error';
					} else {
						bcb_repayment.style = 'ok';
					}
					break;
				case 1 :
					if (_data.contractObject_Type == "托管合同") {
						bcb_repayment.style = 'ok';
					} else {
						bcb_repayment.text = '-' + bcb_repayment.text;
						bcb_repayment.style = 'error';
					}
					break;
				}
				
				// 应付金额是否开启
				var openRepayment = 'disabled';
				var bg_style = '';
				if (data.bcb_state == 2 && data.bcb_type != 0 && data.bcb_type != 11 && data.bcb_type != 12) {
					openRepayment = '';
					bcb_repayment.style = "";
				} else {
					bg_style = 'style="background: #fff;"';
				}

				var html = "";
				html += '	<tr class="subtable-item ' + _class + '" data-code="' + data.bco_code + '" data-cycle="' + data.bcb_cycle + '" data-type="' + data.bcb_type + '">';
				html += '		<td><label class="table-checkbox-box ' + _change.style + '"><input type="checkbox" name="budget-checkbox" ' + _change.option + '></label></td>';
				html += '		<td><span class="item-index" data-index="' + current_index + '">' + current_index + '</span></td>';
				html += '		<td style="width: 230px;" data-cycle-date="' + _cycle_date + '">' + _payCycle + '</td>';
				html += '		<td>' + returnDate(data.bcb_repaymentDate) + '</td>';
				html += '		<td>' + returnBillType(data.bcb_type) + '</td>';
				html += '		<td class="' + _tb_state.style + '">' + _tb_state.text + '</td>';
				html += '		<td style="width: 100px;"><input type="text" class="budget-input minusNumber ' + bcb_repayment.style + '" maxlength="11" placeholder="应付' + returnBillType(data.bcb_type) + '" name="order-payable" value="'+ bcb_repayment.text +'" '+ bg_style + openRepayment +'></td>';
				html += '		<td><input type="text" class="budget-input" maxlength="120" name="order-remarks" placeholder="备注" value="' + returnValue(returnValue(data.bbb_remarks).split("^")[1]) + '" style="text-align: left;"' + (data.bcb_state == 3 ? "disabled" : "") + '></td>';
				html += '		<td class="' + budgetState.style + '">' + budgetState.text + '</td>';
				html += '		<td>' + budgetDate + '</td>';
				html += '	</tr>';
				_option_box.find(".option-subtable-tbody").append(html);
				_option_box.find(".subtable-item:last").data("data", data);
				_option_box.find(".subtable-add[data-cycle=" + data.bcb_cycle + "][data-type=" + data.bcb_type + "]")
					.hover(function() {
						var item = $(this).find(".item-index");
						item.addClass("subtable-remove fa-minus-circle").empty();
					}, function() {
						var item = $(this).find(".item-index");
						item.removeClass("subtable-remove fa-minus-circle").html(item.attr("data-index"));
					});
			});

			var all_length = _option_box.find(".option-subtable-tbody").find("[name=budget-checkbox]").length;
			var disabled_length = _option_box.find(".option-subtable-tbody").find("[name=budget-checkbox]:disabled").length;
			var checked_length = _option_box.find(".option-subtable-tbody").find("[name=budget-checkbox]:checked").length;
			if ((disabled_length + checked_length) == all_length) {
				_option_box.find("[name=budget-checkbox][data-type=all]").attr("checked", "checked").parent().addClass("table-checkbox-checked");
			}

			// 总计
			calculatePayableCost(order_code);
		} else {
			var html = "";
			html += '	<tr class="subtable-item">';
			html += '		<td colspan="99" style="line-height: 100px;font-size: 14px;color: #e74c3c;">没有可以加入预算的账单</td>';
			html += '	</tr>';
			_option_box.find(".option-subtable-tbody").append(html);
			_option_box.find("[name=order-add-cost]").attr("disabled", "disabled");
			_option_box.find("[name=order-join-budget]").attr("disabled", "disabled");
		}

		// 加载账户信息
		if (!isEmpty(customerBankList)) {
			$.each(customerBankList, function(index, data) {
				if (data.cbc_state == 0) {
					_option_box.find(".order-bankInfo").html(returnValue(data.cbc_name) + ' - ' + returnValue(data.cbc_bankName) + ' - ' + returnValue(data.cbc_cardNum)).attr("data-bankAccount", returnValue(data.cbc_name)).attr("data-bankName", returnValue(data.cbc_bankName)).attr("data-bankCard", returnValue(data.cbc_cardNum));
					return false;
				}
			});
		} else {
			_option_box.find(".order-bankInfo").html("--");
		}

		// ------------------------------

		// 选择账户信息
		_option_box.find(".order-bankInfo").attr("data-id", _data.bco_customer).on("click", function() {
			var _data_id = $(this).attr("data-id");
			$(this).editCustomerModel({
				data : {
					cc_id : _data_id
				},
				result : function(data1) {
					$(".order-bankInfo[data-id=" + _data_id + "]").html(returnValue(data1.cbc_name) + ' - ' + returnValue(data1.cbc_bankName) + ' - ' + returnValue(data1.cbc_cardNum)).attr("data-bankAccount", returnValue(data1.cbc_name)).attr("data-bankName", returnValue(data1.cbc_bankName)).attr("data-bankCard", returnValue(data1.cbc_cardNum));
				}
			});
		});

		// 【添加其他费用】
		_option_box.find("[name=order-add-cost]").on("click", function() {
			window.event.stopPropagation();

			// 初始化期数
			var arr = new Array();
			_option_box.find(".subtable-item").each(function() {
				var item_data = $(this).data("data");
				if (!isEmpty(item_data)) {
					var budgetState = returnNumber(item_data.bbb_state);
					if (budgetState == 0 || budgetState == 2) {
						arr.push(returnNumber($(this).attr("data-cycle")));
					}
				}
			});
			var html = '';
			$.each(arr.unique(), function(index, item) {
				html += '<button class="subtable-option-main-sub1" data-cycle="' + item + '">第' + item + '期</button>';
				// data-cycle-date="'+
				// item.cycleDate
				// +'"
			});
			if (isEmpty(html)) {
				html = '<label class="error" style="display: inline-block;height: 38px;">没有发现可以添加费用的账单<label>';
			}
			// _option_box.find(".subtable-option-head").html("选择期数");
			_option_box.find(".subtable-option-head").html(html);
			_option_box.find(".subtable-option-main").hide();

			// 选择期数
			_option_box.find(".subtable-option-main-sub1").on("click", function() {
				_option_box.find(".subtable-option-main-sub1").removeClass("next-bg");
				$(this).addClass("next-bg");
				var _cycle = $(this).attr("data-cycle");
				var _box = _option_box.find(".subtable-item[data-cycle=" + _cycle + "]");
				var _option = "";

				// 初始化类型
				$.each($("[name=order-add-cost]").data("data"), function(index, data) {
					var disabled = "";
					_box.each(function() {
						if (returnNumber($(this).attr("data-type")) == data.bt_code) {
							disabled = "disabled";
							return false;
						}
					});
					_option += '<button class="subtable-option-main-sub2" data-value="' + data.bt_code + '" data-cycle="' + _cycle + '" ' + disabled + '>' + returnValue(data.bt_name) + '</button>';
				});
				// _option_box.find(".subtable-option-head").html("选择费用类型");
				_option_box.find(".subtable-option-main").html(_option).show();

				// 选择费用类型
				_option_box.find(".subtable-option-main-sub2").click(function() {
					var _type = returnNumber($(this).attr("data-value"));
					var _target_cycle = $(this).attr("data-cycle");
					var _target = _option_box.find(".subtable-item[data-cycle=" + _target_cycle + "]:last");
					var _target_td = _target.find("td:eq(2)");
					var _target_date = _target_td.text().split("期")[1];
					var _index = _target.length + 1;

					var html = "";
					html += '	<tr class="subtable-item subtable-add" data-code="' + order_code + '" data-cycle="' + _target_cycle + '" data-type="' + _type + '">';
					html += '		<td><label class="table-checkbox-box table-checkbox-checked"><input type="checkbox" name="budget-checkbox" checked></label></td>';
					html += '		<td><span class="item-index" data-index="' + _index + '">' + _index + '</span></td>';
					html += '		<td data-cycle-date="' + (_target_td.attr("data-cycle-date")) + '">第<label class="char-sepa-text error">' + _target_cycle + '</label>期' + _target_date + '</td>';
					html += '		<td>--</td>';
					html += '		<td>' + returnBillType(_type) + '</td>';
					html += '		<td class="hint">待' + _id + '款</td>';
					html += '		<td style="width: 100px;"><input type="text" class="budget-input minusNumber" name="order-payable" maxlength="11" placeholder="' + returnBillType(_type) + '" ></td>';
					html += '		<td><input type="text" class="budget-input" maxlength="120" placeholder="备注" name="order-remarks" style="text-align: left;"></td>';
					html += '		<td class="hint">待加入预算</td>';
					html += '		<td>--</td>';
					html += '	</tr>';
					_option_box.find(".subtable-item[data-cycle=" + _target_cycle + "]:last").after(html);

					// 禁用已选费用类型
					$(this).attr("disabled", "disabled");

					// 初始化序号
					$(".table-tbody-option" + order_code).find(".subtable-item").each(function(index) {
						$(this).find(".item-index").attr("data-index", (index + 1)).html(index + 1);
					});

					// 选中应收金额
					_option_box.find(".subtable-add[data-cycle=" + _target_cycle + "][data-type=" + _type + "]")
						.hover(function() {
							var _index = $(this).find(".item-index");
							_index.data("index", _index.html()).addClass("subtable-remove fa-minus-circle").empty();
						}, function() {
							var _index = $(this).find(".item-index");
							_index.removeClass("subtable-remove fa-minus-circle").html(_index.data("index"));
						})
						.find("[name=order-payable]").focus();
				});
			});
			_option_box.find(".option-subtable-option").show().on("click", function() {
				window.event.stopPropagation();
			});
			$(document).on("click", function() {
				_option_box.find(".option-subtable-option").hide();
			});
		});
	});
}

/** 【查看】显示账单 */
function showOrderBillList(obj, _index) {
	window.event.stopPropagation();

	// 【获取元素】
	var _item_box = $(".list-content-item[data-index="+ _index +"]");
	var _option_box = $(".list-content-box[data-index="+ _index +"]");
	
	// 【获取数据】
	var _data = _item_box.find("[name=table-checkbox]").data("data");
	
	// 【赋值局部变量】
	var order_code = _data.bco_code;
	var _type = _data.contractObject_Type == "租赁合同" ? "收" : "付";

	var _parent = $(obj).parents("tr");

	if ($(".order-model-box").is(":visible") && $(".order-model-box").attr("data-code") == order_code) {
		$(".order-model-box").remove();
		return;
	}

	// 加载元素
	$(".order-model-box").remove();
	var html = '';
	html += '<div class="order-model-box" data-code="' + order_code + '">';
	html += '   <table class="option-subtable" style="box-shadow:none;">';
	html += '   	<thead>';
	html += '   	    <tr>';
	html += '   	    	<td colspan="10" style="text-align: left;padding: 0 10px;height: 43px;font-size: 13px;">';
	html += '   	    		<label class="char-sepa-first">' + (_type == "收" ? "租赁订单" : "托管订单") + '</label>';
	html += '   	    		<div style="float:right;">';
	html += '   	    		    <label class="char-sepa">订单号：<label class="char-sepa-text error">' + order_code + '</label></label>';
	html += '   	    		    <label class="char-sepa-split">|</label>';
	html += '   	    		    <label class="char-sepa">合同号：<label class="char-sepa-text error">' + _data.contractObject_No + '</label></label>';
	html += '   	    		<div>';
	html += '   	    	</td>';
	html += '   	    </tr>';
	html += '   	    <tr style="background: #61acde !important;color:#fff;">';
	html += '   	    	<td style="width: 64px;">期数</td>';
	html += '   	    	<td style="width: 84px;">' + _type + '款类型</td>';
	html += '   	    	<td style="width: 84px;">' + _type + '款状态</td>';
	html += '   	    	<td style="width: 100px;">应' + _type + '金额</td>';
	html += '   	    	<td style="width: 100px;">实' + _type + '金额</td>';
	html += '   	    	<td style="width: 100px;">未收款</td>';
	html += '   	    	<td style="width: 100px;">应' + _type + '款日期</td>';
	html += '   	    	<td style="width: 100px;">实' + _type + '款日期</td>';
	html += '   	    	<td style="text-align:left;padding: 0 10px;">备注</td>';
	html += '   	    	<td style="width: 50px;">操作</td>';
	html += '   	    </tr>';
	html += '   	</thead>';
	html += '   	<tbody class="option-subtable-tbody">';
	html += '   	    <tr class="subtable-item">';
	html += '   	    	<td colspan="10"><div class="loading"></div></td>';
	html += '   	    </tr>';
	html += '   	</tbody>';
	html += '   </table>';
	html += '</div>';
	$("body").append(html);

	var _box = $(".order-model-box");
	_box.css({
		top : _parent.offset().top + 36,
		left : _parent.offset().left,
		width : _parent.width()
	});

	$(window).resize(function() {
		_box.css({
			width : _parent.width()
		});
	});
	$(document).click(function() {
		$(".order-model-box").remove();
	});
	$(".order-model-box").click(function() {
		window.event.stopPropagation();
	});

	// 【获取数据】
	$.ajax({
		type : "POST",
		url : "/financeManage/queryOrderBillAllList",
		data : {
			con_type : _data.contractObject_Type,
			bill_code : order_code,
		},
		dataType : "json",
	}).done(function(result) {
		if (result.code != 200) {
			return;
		}
		// -- 账单 --
		var contractBillList = result.data;

		var html = "";

		// 加载账单数据
		if (!isEmpty(contractBillList)) {
			$.each(contractBillList, function(index, data) {
				var state = returnBillState(data.bcb_state);
				if(data.totalCycle > 1){
					state.style = 'hint';
					state.text = '综合';
				}
				var _option = returnNumber(data.totalNumber) > 1 ? '<button class="fa-reorder" onclick="querySubBill(this,\'' + order_code + '\',\'' + data.bcb_cycle + '\');"></button>' : '';

				html += '	<tr class="subtable-item subtable-add" style="background: #ecf3fb;">';
				html += '		<td><span class="item-index">' + returnValue(data.bcb_cycle) + '</span></td>';
				html += '		<td>' + returnBillType(data.bcb_type, returnNumber(data.totalNumber) > 1) + '</td>';
				html += '		<td class="' + state.style + '">' + state.text + '</td>';
				html += '		<td>' + returnMoney(data.bcb_repayment) + '</td>';
				html += '		<td>' + returnMoney(data.bcb_realPayment) + '</td>';
				html += '		<td>' + returnMoney(data.bcb_balance) + '</td>';
				html += '		<td>' + returnDate(data.bcb_repaymentDate) + '</td>';
				html += '		<td>' + returnDate(data.bcb_realPaymentDate) + '</td>';
				html += '		<td><div class="td-remarks error" title="' + returnValue(data.bcb_remarks) + '">' + returnValue(data.bcb_remarks) + '<div></td>';
				html += '		<td>' + _option + '</td>';
				html += '	</tr>';
			});
		}
		_box.find(".option-subtable-tbody").html(html);
		_box.css({
			width : _parent.width()
		});
	});
}

/** 【查看】显示账单->显示子账单 */
function querySubBill(obj, order_code, bill_cycle) {
	var _data = $(".table-tbody-option" + order_code).data("data");

	if ($('.subtable-sub' + order_code + bill_cycle).length > 0) {
		$('.subtable-sub' + order_code + bill_cycle).remove();
		$(obj).css({
			background : 'none',
			color : '#3498db'
		});
		return;
	}
	$(obj).css({
		background : '#3498db',
		color : '#fff'
	});

	// 【获取数据】
	$.ajax({
		type : "POST",
		url : "/financeManage/queryOrderBillSubList",
		data : {
			bill_code : _data.bco_code,
			bill_cycle : bill_cycle
		},
		dataType : "json",
	}).done(function(result) {
		if (result.code != 200) {
			return;
		}

		// -- 账单 --
		var contractBillList = result.data;

		// 加载账单数据
		var _box = $(obj).parents(".subtable-item");

		if (!isEmpty(contractBillList)) {
			var html = "";
			$.each(contractBillList, function(index, data) {
				var state = returnBillState(data.bcb_state);
				html += '	<tr class="subtable-item subtable-sub' + order_code + bill_cycle + '" style="background: #fff;">';
				html += '		<td><span class="item-index">' + returnNumber(data.bcb_cycle) + '</span></td>';
				html += '		<td>' + returnBillType(data.bcb_type) + '</td>';
				html += '		<td class="' + state.style + '">' + state.text + '</td>';
				html += '		<td>' + (data.bcb_state == 3 && (data.bcb_type == 11 || data.bcb_type == 12) ? "" : returnFloat(data.bcb_repayment)) + '</td>';
				html += '		<td>' + returnValue(data.bcb_realPayment) + '</td>';
				html += '		<td>' + returnValue(data.bcb_balance) + '</td>';
				html += '		<td>' + returnDate(data.bcb_repaymentDate) + '</td>';
				html += '		<td>' + returnDate(data.bcb_realPaymentDate) + '</td>';
				html += '		<td><div class="td-remarks" title="' + returnValue(data.bcb_remarks) + '">' + returnValue(data.bcb_remarks) + '<div></td>';
				html += '		<td></td>';
				html += '	</tr>';
			});
			_box.after(html);
		}
	});
}

/** 计算应付金额 */
function calculatePayableCost(order_code) {
	var _option_box = $(".list-content-box[data-index="+ order_code +"]");

	var _total_payable = 0;
	var _total_actual = 0;
	var _total_balance = 0;

	_option_box.find(".subtable-item").each(function() {
		if ($(this).find("[name=budget-checkbox]").is(":checked")) {
			$(this).find("[name=order-payable]").each(function() {
				_total_payable += returnFloat($(this).val());
			});
			$(this).find("[name=order-actual]").each(function() {
				_total_actual += returnFloat($(this).val());
			});
			$(this).find("[name=order-balance]").each(function() {
				_total_balance += returnFloat($(this).val());
			});
		}
	});

	_option_box.find(".order-total-payable").text(returnFloat(_total_payable));
	_option_box.find(".order-total-actual").text(returnFloat(_total_actual));
	_option_box.find(".order-total-balance").text(returnFloat(_total_balance));
}

/** 弹窗信息 */
function editBudgetOrder(order_code, mode, obj) {

	var _main_data = $(".table-tbody-option" + order_code).data("data");
	var _type = _main_data.contractObject_Type == "租赁合同" ? 0 : 1;

	var _parent = $(".budget-order-box").find(".order-box-model");
	var _add_icon = $(".budget-order-box").find(".budget-model-addIcon");
	var _add_model = _parent.find(".budget-model-add");
	var _len = _add_model.length;

	if (mode != "edit") {
		if (_len > 0) {
			_add_icon.removeClass("fa-close").addClass("fa-plus").css({
				background : '#3498db'
			});
			_add_model.remove();
			return;
		}
	}
	_add_icon.removeClass("fa-plus").addClass("fa-close").css({
		background : '#e74c3c'
	});
	_add_model.remove();

	var html = "";
	if (mode != "edit") {
		html += '<div class="budget-model-add">';
		html += '	<input type="hidden" name="addOrder-budgetType" value="' + _type + '">';
		html += '	<dl>';
		html += '		<dd><input type="text" name="addOrder-budgetDate" placeholder="预算日期" readonly required></dd>';
		html += '		<dd><input type="text" name="addOrder-budgetName" placeholder="名称" maxlength="16" required></dd>';
		html += '		<dd><textarea type="text" name="addOrder-budgetDesc" placeholder="填写描述" maxlength="120"></textarea></dd>';
		html += '		<dd>';
		html += '			<button onclick="submitAddBudgetOrder(this,\'' + order_code + '\')">添加预算单</button>';
		html += '		</dd>';
		html += '	</dl>';
		html += '</div>';
	} else {
		var _data = $(obj).parents("tr").data("data");

		html += '<div class="budget-model-add">';
		html += '	<input type="hidden" name="addOrder-budgetId" value="' + returnValue(_data.bbo_id) + '">';
		html += '	<input type="hidden" name="addOrder-budgetType" value="' + _type + '">';
		html += '	<dl>';
		html += '		<dd><input type="text" name="addOrder-budgetDate" placeholder="预算日期" value="' + returnDate(_data.bbo_budgetDate) + '" readonly required></dd>';
		html += '		<dd><input type="text" name="addOrder-budgetName" placeholder="名称" maxlength="16" value="' + returnValue(_data.bbo_name) + '" required></dd>';
		html += '		<dd><textarea type="text" name="addOrder-budgetDesc" placeholder="填写描述" maxlength="120">' + returnValue(_data.bbo_desc) + '</textarea></dd>';
		html += '		<dd>';
		html += '			<button onclick="submitAddBudgetOrder(this,\'' + order_code + '\')">修改预算单</button>';
		html += '		</dd>';
		html += '	</dl>';
		html += '</div>';
	}
	_parent.append(html);

	// 事件绑定-时间控件
	_parent.find("[name=addOrder-budgetDate]").on("click", function() {
		WdatePicker();
	});
}

/** 弹窗数据 */
function load_data_model(mode, order_code, _type) {
	var _box = $(".budget-order-box");

	// 加载数据
	$.post("/financeManage/queryBudgetOrderList", {
		pageNo : returnNumber($(".page-no").text()),
		pageSize : 6,
		bbo_type : _type
	}, function(result) {
		if (result.code != 200) {
			return;
		}
		var _order_body = $(".budget-order-box");
		_order_body.find(".budget-order-box-tbody").empty();

		$.each(result.data.list, function(index, data) {

			// 类型
			var _bbo_type = {};
			switch (returnNumber(data.bbo_type)) {
			case 0 :
				_bbo_type.text = "收款预算";
				_bbo_type.style = 'class="next"';
				break;
			case 1 :
				_bbo_type.text = "付款预算";
				_bbo_type.style = 'class="hint"';
				break;
			}

			// 状态
			var _bbo_state = {};
			var _option_html = "";
			var _option_check = "disabled";
			var _option_style = "table-checkbox-disabled";
			switch (returnNumber(data.bbo_state)) {
			case 0 :
				_bbo_state.text = "待审核";
				_bbo_state.style = 'class="hint"';
				_option_html = '<a href="javascript:;" class="hint" onclick="editBudgetOrder(\'' + order_code + '\',\'edit\',this)">编辑</a>';
				_option_check = "";
				_option_style = "";
				break;
			case 1 :
				_bbo_state.text = "已审核";
				_bbo_state.style = 'class="next"';
				break;
			case 2 :
				_bbo_state.text = "已完结";
				_bbo_state.style = 'class="ok"';
				break;
			}

			var checked_id = returnNumber(_box.find("[name=checked-budget-order]").val());
			if (checked_id == data.bbo_id) {
				_option_style = "table-checkbox-checked";
				_option_check = "checked";
			}

			var html = "";
			html += '<tr>';
			html += '    <td><label class="table-checkbox-box ' + _option_style + '"><input type="radio" name="model-checkbox" data-code="' + data.bbo_code + '" ' + _option_check + '></label></td>';
			html += '    <td>' + (index + 1) + '</td>';
			html += '    <td>' + returnDate(data.bbo_budgetDate) + '</td>';
			html += '    <td ' + _bbo_type.style + '>' + _bbo_type.text + '</td>';
			html += '    <td style="text-align: left;padding: 0 10px;">' + returnValue(data.bbo_name) + '</td>';
			html += '    <td style="text-align: left;padding: 0 10px;line-height: 20px;">' + returnValue(data.bbo_desc) + '</td>';
			html += '    <td class="next">' + returnNumber(data.bill_count) + '</td>';
			html += '    <td class="money-font20" style="font-size: 16px;display: table-cell;">' + returnMoney(data.bill_sum) + '</td>';
			html += '    <td ' + _bbo_state.style + '>' + _bbo_state.text + '</td>';
			html += '    <td>' + _option_html + '</td>';
			html += '</tr>';
			_order_body.find(".budget-order-box-tbody").append(html);
			_order_body.find(".budget-order-box-tbody tr:last").data("data", data);
		});
		_order_body.find(".page-total-page").text(result.data.totalPage);
		_order_body.find(".page-total-record").text(result.data.totalRecords);

		// 事件绑定--选择
		_order_body.find(".budget-order-box-tbody tr").on("click", function() {
			if (!$(this).find("[name=model-checkbox]").is(":disabled")) {
				$("[name=model-checkbox]").removeAttr("checked").parent().removeClass("table-checkbox-checked");
				$(this).find("[name=model-checkbox]").attr("checked", "checked").parent().addClass("table-checkbox-checked");
			}
		});
	});

	if (mode != "reload") {
		// 上一页
		_box.find(".page-prev").on("click", function() {
			var pageNo = returnNumber(_box.find(".page-no").text());
			if (pageNo - 1 < 1) {
				return;
			}
			_box.find(".page-no").text(pageNo - 1);
			load_data_model("reload", order_code, _type);
		});
		// 下一页
		_box.find(".page-next").on("click", function() {
			var pageNo = returnNumber(_box.find(".page-no").text());
			var pageToltalPage = returnNumber(_box.find(".page-total-page").text());
			if (pageNo + 1 > pageToltalPage) {
				return;
			}
			_box.find(".page-no").text(pageNo + 1);
			load_data_model("reload", order_code, _type);
		});
	}
}

/** 【提交数据】添加预算账单 */
function submitBillBudget(order_code) {
	var _option_box = $(".table-tbody-option" + order_code);
	var _data = _option_box.data("data");
	var _boo = false;

	var data = {};

	// 银行账户信息
	var bbb_bankAccount = "";
	var bbb_bankName = "";
	var bbb_bankCard = "";
	var balPay = "收";
	if (_data.contractObject_Type == "托管合同") {
		var _bankaccount = _option_box.find(".order-bankInfo").attr("data-bankaccount");
		if (isEmpty(_bankaccount)) {
			$.jBox.tip("请完善账户信息-账户姓名");
			return;
		}
		bbb_bankAccount = _bankaccount;
		bbb_bankName = _option_box.find(".order-bankInfo").attr("data-bankName");

		var _bankcard = _option_box.find(".order-bankInfo").attr("data-bankcard");
		if (isEmpty(_bankcard)) {
			$.jBox.tip("请完善账户信息-银行卡");
			return;
		}
		bbb_bankCard = _bankcard;
		balPay = "付";
	} else {
		balPay = "收";
	}

	// 【预算清单】
	var billBudgets = new Array();
	var length = _option_box.find(".subtable-item").find("[name=budget-checkbox]:checked").length;
	if (length <= 0) {
		$.jBox.tip("请选择一个或者多个账单加入预算");
		return;
	}
	_option_box.find(".subtable-item").each(function(index) {
		var isChecked = $(this).find("[name=budget-checkbox]").is(":checked");
		if (isChecked) {
			var bill_repayment = $(this).find("[name=order-payable]");
			if (isEmpty(bill_repayment.val())) {
				bill_repayment.msg("请填写金额");
				return _boo = false;
			}
			var _item_data = $(this).data("data");
			var _remarks = returnValue($(this).find("td:eq(2)").text()).split("期");

			var billBudget = {};
			billBudget.bill_id = isEmpty(_item_data) ? '' : _item_data.bcb_id;
			billBudget.bill_code = _data.bco_code;
			billBudget.bill_type = isEmpty(_item_data) ? returnNumber($(this).attr("data-type")) : returnNumber(_item_data.bcb_type);
			billBudget.bill_cycle = $(this).attr("data-cycle");
			billBudget.contractObject_Type = _data.contractObject_Type;
			billBudget.bill_repayment = bill_repayment.val();
			billBudget.bbb_id = isEmpty(_item_data) ? '' : _item_data.bbb_id;
			billBudget.bbb_paymentWay = bbb_bankAccount + "-" + bbb_bankName + "-" + bbb_bankCard;
			billBudget.bbb_remarks = _remarks[0] + "期" + balPay + "款" + _remarks[1] + '^' + $(this).find("[name=order-remarks]").val();
			billBudget.bbb_cycleSegment = $(this).find("td:eq(2)").attr("data-cycle-date");
			billBudgets.push(billBudget);
		}
	});
	data.billBudgets = JSON.stringify(billBudgets);

	if (_boo) {
		return;
	}

	// 弹窗
	var html = '';
	html += '<div class="budget-order-box" style="min-height: 120px;">';
	html += '	<input type="hidden" name="checked-budget-order">';
	html += '	<div style="min-height: 216px;">';
	html += '	    <table>';
	html += '	    	<thead>';
	html += '	    	<tr>';
	html += '	    		<th style="width: 36px;">#</th>';
	html += '	    		<th style="width: 36px;">序号</th>';
	html += '	    		<th style="width: 84px;">预算日期</th>';
	html += '	    		<th style="width: 64px;">类型</th>';
	html += '	    		<th style="text-align: left;padding: 0 10px;width: 120px;">预算名称</th>';
	html += '	    		<th style="text-align: left;padding: 0 10px;">描述</th>';
	html += '	    		<th style="width: 64px;">账单数量</th>';
	html += '	    		<th style="width: 84px;">预算总金额</th>';
	html += '	    		<th style="width: 64px;">账单状态</th>';
	html += '	    		<th style="width: 64px;">操作</th>';
	html += '	    	</tr>';
	html += '	    	</thead>';
	html += '	    	<tbody class="budget-order-box-tbody"></tbody>';
	html += '	    </table>';
	html += '	</div>';
	html += '	<div class="order-box-model" colspan="7">';
	html += '	   	<button class="budget-model-addIcon fa-plus" onclick="editBudgetOrder(\'' + order_code + '\')"></button>';
	html += '		<div style="float: left;">共&nbsp;<label class="page-total-page">--</label>&nbsp;页，<label class="page-total-record"></label>&nbsp;条记录</div>';
	html += '		<div style="float: right;">';
	html += '			<button class="page-option page-prev fa-angle-left"></button>';
	html += '			<button class="page-option page-no">1</button>';
	html += '			<button class="page-option page-next fa-angle-right"></button>';
	html += '		</div>';
	html += '	</div>';
	html += '</div>';

	// 加载弹窗
	$.jBox(html, {
		title : "选择预算单",
		width : 800,
		submit : function(v, h, f) {
			if (v == "ok") {
				var checked = h.find("[name=model-checkbox]:checked");
				if (checked.length <= 0) {
					$.jBox.tip("请选择一项预算订单");
					return false;
				}

				data.bbo_code = checked.attr("data-code");

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
							$.jBox.close(h);
							$.jBox.tip("提交成功", "success");
							$(".table-tbody-item" + order_code).find("[name=order-budget-btn]").click();
							$(".table-tbody-item" + order_code).find(".budget-state").addClass("next").text("已加入预算");
						});
					}
					return true;
				});
			}
			return false;
		}
	});
	// 加载数据
	load_data_model("load", order_code, (_data.contractObject_Type == "租赁合同" ? 0 : 1));
}

/** 【提交数据】添加预算订单 */
function submitAddBudgetOrder(obj, order_code) {

	var _box = $(".budget-order-box");
	var _budgetDate = _box.find("[name=addOrder-budgetDate]");
	if (isEmpty(_budgetDate.val())) {
		_budgetDate.msg("请选择预算日期");
		return;
	}
	var _budgetName = _box.find("[name=addOrder-budgetName]");
	if (isEmpty(_budgetName.val())) {
		_budgetName.msg("请填写预算描述");
		return;
	}
	var _budgetType = _box.find("[name=addOrder-budgetType]");
	var _budgetDesc = _box.find("[name=addOrder-budgetDesc]");

	var data = {
		bbo_id : _box.find("[name=addOrder-budgetId]").val(),
		bbo_name : _budgetName.val(),
		bbo_type : _budgetType.val(),
		bbo_desc : _budgetDesc.val(),
		bbo_budgetDate : _budgetDate.val()
	};

	$.ajax({
		type : "POST",
		url : "/financeManage/addBudgetOrder",
		data : JSON.stringify(data),
		dataType : "json",
		contentType : "application/json; charset=utf-8",
		beforeSend : function() {
			$(obj).attr("disabeld", "disabeld");
		}
	}).done(function(result) {
		if (result.code != 200) {
			$.jBox.tip(result.msg);
			return;
		}
		_box.find(".budget-model-addIcon").click();
		_box.find("[name=checked-budget-order]").val(result.data);
		$.jBox.tip("提交成功", "success");
		$(obj).removeAttr("disabeld");
		load_data_model("reload", order_code, _budgetType.val());
	});
}

