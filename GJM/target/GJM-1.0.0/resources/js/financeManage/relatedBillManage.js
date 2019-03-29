var cache_id;
// 被关联订单数据
var _item_data = '';

$(function() {
	// 加载数据
	load_data();
	// 加载事件
	load_event();
});

/** 加载数据*/
function load_data(){
	// 时间
	var filterDateParams = [];
	filterDateParams.push({ name : "添加日期", value : "ro_createTime", sort : 'DESC'});
	
	// 标题
	var listParams = [];
	listParams.push({text : "小区房号", name : "house_address", param : "", href : '/houseLibrary/jumpHouseInfo&hi_code'});
	listParams.push({text : "客户类型", name : "ro_customerType", param: {201 : "房东", 202 : "租客",}});
	listParams.push({text : "客户姓名", name : "ro_customerName", param : ""});
	listParams.push({text : "客户电话", name : "ro_customerPhone", param : ""});
	listParams.push({text : "总金额", name : "ro_totalMoney", param : "float"});
	listParams.push({text : "状态", name : "ro_payState", param: {
		1 : { text : "未支付", style : "hint"},
		2 : { text : "已支付", style : "next"},
		3 : { text : "已撤销", style : "error"},
	}});
	listParams.push({text : "关联", name : "ro_state", param: {
		1 : { text : "未关联", style : "hint"},
		2 : { text : "已关联", style : "next"},
	}});
	listParams.push({text : "经办人", name : "ro_create_name", param: ""});
	listParams.push({text : "添加时间", name : "ro_createTime", param : "time"});
	
	var filterBars = [];
	filterBars.push({name:"ro_payState", type:"select", selected:"0",data:{
		0 : "全部状态",
		1 : "未支付",
		2 : "已支付",
		3 : "已撤销",
	}});
	
	// 初始化
	$.table({
		filterDateParams : filterDateParams,
		filterBars : filterBars,
		listParams : listParams,
		filterWhere : true,
		ajaxParams : {
			url : "/financeManage/queryRelatedBillPageList",
		},
		ajaxDone : function(h) {
			h.find(".list-content-item").each(function(){
				var data = $(this).find("[name=table-checkbox]").data("data");
				if(!isEmpty(cache_id) && cache_id == data.ro_id){
					$(this).find("[name=table-checkbox]").attr("checked", "checked").parent().addClass("table-checkbox-checked");
					cache_id = null;
				}
			});
		},
		column : true,
		columnResult : function(_index, data){
			var html = '';
			html += '<button class="list-item-option" style="color: #3498DB" onclick="showOptionBox(this,'+ _index +')"><i class="fa-reorder"></i>查看</button>';
			var state = {
				style : 'hint',
				option : '',
			};
			if(data.ro_state != 1 || data.ro_payState != 1){
				state.style = 'disabled';
				state.option = 'disabled';
			}
			html += '<button class="list-item-option '+ state.style +'" onclick="option_add_bill(this)" '+ state.option +'><i class="fa-edit"></i>编辑</button>';
			
			var state2 = {
				style : 'disabled',
				option : 'disabled',
			};
			if(data.ro_payState == 2){
				state2.style = 'next';
				state2.option = '';
			}
			html += '<button class="list-item-option '+ state2.style +'" onclick="printBudgetBill(this,'+ _index +')" '+ state2.option +'><i class="fa-print"></i>打印</button>';
			return html;
		}
	});
}

/** 加载事件*/
function load_event(){
	
	//  
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
	
	// 【事件】删除账单-------------------------
	$(document).on("click", ".subtable-remove", function() {
		var body_box = $(this).parents(".form-list-tbody");
		var parent_box = $(this).parents(".subtable-item");
		var parent_box_data = parent_box.data("data");
		if(!isEmpty(parent_box_data.rb_id)){
			$.jBox.confirm("确定要删除该账单么吗？", "提示", function(v, h, f) {
				if (v == 'ok') {
					$.ajax({
						type : "POST",
						url : "/financeManage/deleteRelatedBill",
						data : {
							rb_id : parent_box_data.rb_id
						},
						dataType : "json"
					}).done(function(result) {
						if (result.code != 200) {
							$.jBox.tip(result.msg);
							return;
						}
						$.jBox.tip("删除成功", "success");

						// 删除元素
						parent_box.remove();

						// 最后一个元素判断
						var item_len = body_box.find("tr").length;
						if(item_len == 0){
							var html = "";
							html += '<tr class="load-tr">';
							html += '	<td colspan="7"><img style="margin-top: 17px;" src="/resources/image/notdata.jpg"></td>';
							html += '</tr>';
							body_box.html(html);
							return;
						}

						// 计算总金额
						calculatePayableCost(body_box);
						
						// 初始化序号
						body_box.find("tr").each(function(index) {
							$(this).find(".item-index").html(index + 1).attr("data-index", index + 1);
						});
					});
				}
				return true;
			});
		} else {
			// 删除元素
			parent_box.remove();
			
			// 最后一个元素判断
			var item_len = body_box.find("tr").length;
			if(item_len == 0){
				var html = "";
				html += '<tr class="load-tr">';
				html += '	<td colspan="7"><img style="margin-top: 17px;" src="/resources/image/notdata.jpg"></td>';
				html += '</tr>';
				body_box.html(html);
				return;
			}
			
			// 计算总金额
			calculatePayableCost(body_box);
			
			// 初始化序号
			body_box.find("tr").each(function(index) {
				$(this).find(".item-index").html(index + 1).attr("data-index", index + 1);
			});
		}
	});
}

/** 打印账单单据*/
function printBudgetBill(obj,_index) {
	var _main_box = $(".list-content-item[data-index="+ _index +"]");
	var _main_box_data = _main_box.find("[name=table-checkbox]").data("data");
	
	// 加载账单数据
	$.ajax({
		url : '/financeManage/queryRelatedBill',
		data : {
			ro_code : _main_box_data.ro_code
		},
		dataType : 'json'
	}).done(function(result){
		if(result.code != 200){
			return;
		}
		
		var items = [];
		$.each(result.data.relatedBillVos, function(index, _data){
			value = _data.rb_balPay == 1 ? -returnFloat(_data.rb_paymentMoney) : returnFloat(_data.rb_paymentMoney);
			items.push({
				name : returnBillType(_data.rb_type),
				desc : returnValue(_data.rb_remarks),
				value : value,
				date : returnDate(_data.rb_paymentDate, "yyyy年MM月dd日"),
			});
		});
		

		var order_code = _main_box_data.ro_code;
		order_code = order_code.substring(3, order_code.length);
		var order_time = order_code.substring(0, order_code.length - 4);
		var order_random = order_code.substring(order_code.length - 4, order_code.length);
		
		var list = [];
		list.push({
			code : returnDate(returnNumber(order_time), 'yyyyMMddHHmmss') + order_random,
			name : returnValue(_main_box_data.ro_customerName),
			address : returnValue(_main_box_data.house_address),
			items : items,
			person : {
				p1 : returnValue(_main_box_data.ro_create_name), 
				p2 : "",
				p3 : "",
				p4_remark : (_main_box_data.ro_customerType == 201 ? "房东" : "租户")
			}
		});
		if(isEmpty(list)){
			$.jBox.tip("请选择打印的内容!", "error");
			return;
		}
		
		// 打印
		commonBillPrint({
			title : '重庆管家婆房屋托管中心专用收据',
			subTitle : (_main_box_data.ro_customerType == 202?'收':'付') + '款凭证',
			maxLine : 5,
			list : list
		});
	});
}

/** 显示操作域 **/
function showOptionBox(_obj, _index){
	var _item_box = $(".list-content-item[data-index="+ _index +"]");
	var _box_box = $(".list-content-box[data-index="+ _index +"]");
	var _data = _item_box.find("[name=table-checkbox]").data("data");
	var _text = $(_obj).data("text");
	
	if(_box_box.is(":visible")){
		_box_box.hide("fast", function(){
			$(_obj).html(_text).removeClass("error-bg");
		});
		return;
	}
	$(_obj).data("text", $(_obj).html()).html('<i class="fa-remove"></i>关闭').addClass("error-bg");
	_box_box.show("fast");
	
	// 加载账单数据
	$.ajax({
		url : '/financeManage/queryRelatedBill',
		data : {
			ro_code : _data.ro_code
		},
		dataType : 'json'
	}).done(function(result){
		if(result.code != 200){
			return;
		}
		var html = '';
		html += '<div>';
		html += '	<table class="option-subtable">';
		html += '		<thead>';
		html += '	    	<tr>';
		html += '	    		<td style="width: 40px;">序号</td>';
		html += '	    		<td style="width: 84px;">支付类型</td>';
		html += '	    		<td style="width: 84px;">支付金额</td>';
		html += '	    		<td style="width: 96px;">支付日期</td>';
		html += '	    		<td style="width: auto;">备注</td>';
		html += '	    		<td style="width: 84px;">经办人</td>';
		html += '	    		<td style="width: 96px;">创建日期</td>';
		html += '	    	</tr>';
		html += '		</thead>';
		html += '		<tbody></tbody>';
		html += '	</table>';
		html += '</div>';
		html += '';
		_box_box.find("td").html(html);

		$.each(result.data.relatedBillVos, function(index, data){
			var html = '';
			html += '<tr class="subtable-item">';
			html += '	<td><span class="item-index" data-index="'+ (index + 1) +'">'+ (index + 1) +'</span></td>';
			html += '	<td data-value="'+ data.rb_type +'">'+ returnBillType(data.rb_type) +'</td>';
			html += '	<td class="'+ (data.rb_balPay == 0?'ok':'error') +'">'+ returnMoney(data.rb_paymentMoney) +'</td>';
			html += '	<td>'+ returnDate(data.rb_paymentDate) +'</td>';
			html += '	<td><div class="form-list-remarks">'+ returnValue(data.rb_remarks) +'</div></td>';
			html += '	<td>'+ returnValue(data.rb_create_name) +'</td>';
			html += '	<td>'+ returnDate(data.rb_createTime) +'</td>';
			html += '</tr>';
			_box_box.find("td").find("tbody").append(html);
		});
	});
}

/** 添加订单*/
function option_add_bill(_obj){
	var _data = $(_obj).parents(".list-content-item").find("[name=table-checkbox]").data("data");
	
	var html = '';
	html += '<div class="option-add-relatedBill" style="padding: 10px;">';
	html += '	<fieldset class="form-page-box">';
	html += '	    <div class="form-div">';
	html += '			<input type="hidden" name="ro_id">';
	html += '	    	<dl class="form-item">';
	html += '	    		<dt class="form-item-title">房源房号<em>*</em></dt>';
	html += '	    		<dd class="form-item-content">';
	html += '	    			<input type="text" class="form-content-in" name="house_address" onchange="toUpperCase(this)" maxlength="60" placeholder="小区+房号" required>';
	html += '	    		</dd>';
	html += '	    	</dl>';
	html += '	    	<dl class="form-item">';
	html += '	    		<dt class="form-item-title">客户类型<em>*</em></dt>';
	html += '	    		<dd class="form-item-content">';
	html += '	    			<select class="form-content-in" name="ro_customerType" placeholder="客户对象" required>';
	html += '	    				<option value="">请选择</option>';
	html += '	    				<option value="201">房东</option>';
	html += '	    				<option value="202">租客</option>';
	html += '	    			</select>';
	html += '	    		</dd>';
	html += '	    	</dl>';
	html += '	    	<dl class="form-item">';
	html += '	    		<dt class="form-item-title">客户姓名<em>*</em></dt>';
	html += '	    		<dd class="form-item-content">';
	html += '	    			<input type="text" class="form-content-in" name="ro_customerName" maxlength="20" placeholder="姓名" style="width: 90px;" required>';
	html += '	    		</dd>';
	html += '	    	</dl>';
	html += '	    	<dl class="form-item">';
	html += '	    		<dt class="form-item-title">客户电话<em>*</em></dt>';
	html += '	    		<dd class="form-item-content">';
	html += '	    			<input type="text" class="form-content-in" name="ro_customerPhone" maxlength="11" placeholder="电话" required>';
	html += '	    		</dd>';
	html += '	    	</dl>';
	html += '	    	<dl class="form-item form-right">';
	html += '	    		<dt class="form-item-title"></dt>';
	html += '	    		<dd class="form-item-content">';
	html += '	    			<button class="form-content-in next-bg" name="option-add-bill"><i class="fa-plus"></i>添加账单</button>';
	html += '	    		</dd>';
	html += '	    	</dl>';
	html += '	    </div>';
	html += '	</fieldset>';
	html += '	<fieldset class="form-page-box" style="min-height: 280px;">';
	html += '	    <table class="form-list">';
	html += '	    	<thead>';
	html += '	    		<tr>';
	html += '	    			<td style="width: 50px;">#</td>';
	html += '	    			<td style="width: 84px;">款项类型</td>';
	html += '	    			<td style="width: 84px;">金额</td>';
	html += '	    			<td style="width: 96px;">支付日期</td>';
	html += '	    			<td style="width: auto;">款项说明</td>';
	html += '	    			<td style="width: 84px;">经办人</td>';
	html += '	    			<td style="width: 96px;">创建日期</td>';
	html += '	    		</tr>';
	html += '	    	</thead>';
	html += '	    	<tbody class="form-list-tbody">';
	html += '	    		<tr class="load-tr">';
	html += '	    			<td colspan="8"><img src="/resources/image/notdata.jpg"></td>';
	html += '	    		</tr>';
	html += '	    	</tbody>';
	html += '	    </table>';
	html += '	    <div style="position: absolute;right: 0;bottom: 0;text-align: right;border: 1px solid #ddd;border-radius: 3px;padding: 0 10px;background: #fff;">总金额<label id="total-money" class="error" style="display:inline-block;margin:0 6px;">0</label>元</div>';
	html += '	</fieldset>';
	html += '</div>';
	
	var states = {
		state1 : {
			content : html,
			buttons : { '提交保存': 1, '取消': 0 },
			submit : function(v, h, f){
				if(v == 1){
					var _boo = true;
					h.find(".form-content-in:required").each(function(){
						if(isEmpty($(this).val())){
							$(this).msg('请'+ (this.tagName == "SELECT"?"选择":"填写") + returnValue($(this).attr("placeholder")));
							return _boo = false;
						}
					});
					if(!_boo){
						return false;
					}
					if(!isPhone(h.find("[name=ro_customerPhone]").val())){
						h.find("[name=ro_customerPhone]").msg("请输入正确的手机号码");
						return false;
					}
					
					var data = {};
					
					var relatedOrder = {};
					relatedOrder.ro_id = h.find("[name=ro_id]").val();
					if(!isEmpty(_data)){
						relatedOrder.ro_code = _data.ro_code;
					}
					relatedOrder.hi_code = h.find("[name=house_address]").attr("data-code");
					relatedOrder.house_address = h.find("[name=house_address]").val();
					relatedOrder.ro_customerType = h.find("[name=ro_customerType] option:selected").val();
					relatedOrder.ro_customerName = h.find("[name=ro_customerName]").val();
					relatedOrder.ro_customerPhone = h.find("[name=ro_customerPhone]").val();
					relatedOrder.ro_totalMoney = $("#total-money").text();
					data.relatedOrder = JSON.stringify(relatedOrder);

					var relatedBills = [];
					h.find(".subtable-item").each(function(){
						relatedBills.push($(this).data("data"));
					});
					data.relatedBills = JSON.stringify(relatedBills);
					
					// 收付款
					var balPay = (relatedOrder.ro_customerType == 201 ? "付款" : "收款");
					
					$.jBox.confirm('确定提交保存并进行下一步'+ balPay +'操作吗？<br><label class="next" style="font-size: 12px;line-height: 20px;">点击[&nbsp;确定&nbsp;]进入'+ balPay +'界面，点击[&nbsp;直接保存&nbsp;]则直接保存订单</label>', "提示", function(v, h1, f){
						if(v != 0){
							$.ajax({
								type : "POST",
								url : "/financeManage/addRelatedOrderBill",
								data : JSON.stringify(data),
								dataType : "json",
								contentType : "application/json;charset=utf-8",
								beforeSend : function(){
									if(v == 2){
										$.jBox.tip("数据保存中...", "loading");
									}
								}
							}).done(function(result) {
								if (result.code != 200) {
									$.jBox.tip(returnValue(result.msg));
									return false;
								}
								if(v == 1){
									// 加载账单数据
									$.ajax({
										url : '/financeManage/queryRelatedBill',
										data : {
											ro_code : result.data.ro_code,
											pay_way : "all"
										},
										dataType : 'json'
									}).done(function(result){
										if(result.code != 200){
											return;
										}
										var html = '';
										html += '<div style="padding: 10px;">';
										html += '	  <div class="form-div" style="padding-bottom: 0;">';
										html += '	  	 <input type="hidden" name="related-code" value="'+ returnValue(result.data.relatedBillVos[0].ro_code) +'">';
										html += '	  	 <dl class="form-item form-item-flex">';
										html += '	  	 	<dt class="form-item-title">房源房号</dt>';
										html += '	  	 	<dd class="form-item-content" style="font-weight: bold;">'+ h.find("[name=house_address]").val() +'</dd>';
										html += '	  	 </dl>';
										html += '	  	 <dl class="form-item form-item-flex">';
										html += '	  	 	<dt class="form-item-title">客户类型</dt>';
										html += '	  	 	<dd class="form-item-content" style="font-weight: bold;">'+ h.find("[name=ro_customerType] option:selected").text() +'</dd>';
										html += '	  	 </dl>';
										html += '	  	 <dl class="form-item form-item-flex">';
										html += '	  	 	<dt class="form-item-title">客户姓名</dt>';
										html += '	  	 	<dd class="form-item-content" style="font-weight: bold;">'+ h.find("[name=ro_customerName]").val() +'</dd>';
										html += '	  	 </dl>';
										html += '	  	 <dl class="form-item form-item-flex">';
										html += '	  	 	<dt class="form-item-title">客户电话</dt>';
										html += '	  	 	<dd class="form-item-content" style="font-weight: bold;">'+ h.find("[name=ro_customerPhone]").val() +'</dd>';
										html += '	  	 </dl>';
										html += '	  </div>';
										html += '	  <table class="form-list">';
										html += '	  	<thead>';
										html += '	  		<tr>';
										html += '	  			<td style="width: 50px;">#</td>';
										html += '	  			<td style="width: 84px;">款项类型</td>';
										html += '	  			<td style="width: 84px;">金额</td>';
										html += '	  			<td style="width: 96px;">支付日期</td>';
										html += '	  			<td style="width: auto;">款项说明</td>';
										html += '	  			<td style="width: 84px;">经办人</td>';
										html += '	  			<td style="width: 96px;">创建日期</td>';
										html += '	  		</tr>';
										html += '	  	</thead>';
										html += '	  	<tbody class="form-list-tbody">';
										$.each(result.data.relatedBillVos, function(index, data){
											html += '		<tr class="subtable-item" data-type="'+ data.rb_type +'">';
											html += '			<td><span class="item-index" data-index="'+ (index + 1) +'">'+ (index + 1) +'</span></td>';
											html += '	        <td data-value="'+ data.rb_type +'">'+ returnBillType(data.rb_type) +'</td>';
											html += '	        <td class="ok">'+ returnFloat(data.rb_paymentMoney) +'</td>';
											html += '	        <td>'+ returnDate(data.rb_paymentDate) +'</td>';
											html += '	        <td><div class="form-list-remarks">'+ returnValue(data.rb_remarks) +'</div></td>';
											html += '	        <td>'+ returnValue(data.rb_create_name) +'</td>';
											html += '	        <td>'+ returnDate(data.rb_createTime) +'</td>';
											html += '		</tr>';
										});
										html += '	  	</tbody>';
										html += '	  </table>';
										html += '	  <div class="form-div" style="padding-top: 10px;padding-bottom: 0;justify-content: space-between;">';
										html += '	  	 <dl class="form-item form-item-flex" style="flex: 1;">';
										html += '	  	 	<dt class="form-item-title" style="line-height: 34px;height: 34px;">支付方式</dt>';
										html += '	  	 	<dd class="form-item-content" id="payTypeBox" style="font-weight: bold;">';
										html += '	    		<select class="form-content-in" name="ro_payType" data-index="all" required>';
										$.each(result.data.contractTypes, function(index, data){
											html += '	    			<option value="'+ data.bt_code +'" data-parent="'+ data.bt_parentCode +'">'+ data.bt_name +'</option>';
										});
										html += '	    		</select>';
										html += '	    		<select class="form-content-in" name="ro_payType" required>';
										$.each(result.data.contractTypes32, function(index, data){
											html += '	    			<option value="'+ data.bt_code +'" data-parent="'+ data.bt_parentCode +'">'+ data.bt_name +'</option>';
										});
										html += '	    		</select>';
										html += '	    	</dd>';
										html += '	  	 </dl>';
										html += '	  	 <dl class="form-item form-item-flex">';
										html += '	  	 	<dt class="form-item-title">总金额</dt>';
										html += '	  	 	<dd class="form-item-content"><label class="error" style="margin-right: 8px;font-weight: bold;">'+ h.find("#total-money").text() +'</label>元</dd>';
										html += '	  	 </dl>';
										html += '	  </div>';
										html += '</div>';
										$.jBox.nextState(html);
									});
								}
								if(v == 2){
									$.jBox.tip("保存成功");
									$.jBox.close(h);
									// 缓存id
									cache_id = result.data.ro_id;
									$.table.loadData();
								}
							}).fail(function(e){
								$.jBox.tip("数据错误，请刷新后重试");
							});
						}
					}, {buttons : { "确定" : 1, "直接保存" : 2, "取消" : 0, }});
					return false;
				}
			}
		},
		state2 : {
			content : '<div style="text-align:center; line-height: 40px;">数据加载中....</div>',
			buttons : { '上一步': -1, '确定收/付款': 1, '取消': 0},
			submit : function(v, h, f){
				if(v == -1){
					$.jBox.getState("state2").find(".jbox-button-panel").find(".jbox-button[value=1]").removeAttr("disabled").removeClass("disabled-bg");
					$.jBox.prevState();
					return false;
				}
				if (v == 1) {
					if(isEmpty(h.find("[name=related-code]").val())){
						$.jBox.tip("参数错误，请刷新后重试或联系管理员");
						return false;
					}
					var pay_length = h.find("[name=ro_payType]").length;
					var pay_mode = h.find("[name=ro_payType]:eq(0) option:selected").val() == 31 ? "online" : "offline";
					var pay_way = '';
					var pay_acount = '';
					if(pay_length == 2){
						pay_way = h.find("[name=ro_payType]:eq(1) option:selected").text();
					}
					if(pay_length == 3){
						pay_way = h.find("[name=ro_payType]:eq(1) option:selected").text();
						pay_acount = h.find("[name=ro_payType]:eq(2) option:selected").attr("data-value");
					}
					$.ajax({
						type : "POST",
						url : "/financeManage/updateRelatedOrderBill",
						data : {
							ro_code : h.find("[name=related-code]").val(),
							pay_mode : pay_mode,
							pay_way : pay_way,
							pay_acount : pay_acount
						},
						dataType : "json"
					}).done(function(result){
						if(result.code != 200){
							$.jBox.tip(result.msg)
							return false;
						}
						$.jBox.tip("保存成功");
						// 缓存id
						cache_id = result.data.ro_id;
						$.table.loadData();
					});
				}
			}
		}
	};
	
	$.jBox(states, {
		title : "添加订单",
		width : 800,
		loaded : function(h){
			var _box = h.find(".option-add-relatedBill");

			/** 加载订单数据*/
			if(!isEmpty(_data)){
				h.find("[name=ro_id]").val(_data.ro_id);
				h.find("[name=house_address]").val(_data.house_address).attr("data-code", _data.hi_code);
				h.find("[name=ro_customerType] option[value="+ _data.ro_customerType +"]").attr("selected", "selected");
				h.find("[name=ro_customerName]").val(_data.ro_customerName);
				h.find("[name=ro_customerPhone]").val(_data.ro_customerPhone);
				
				// 加载账单数据
				$.ajax({
					url : '/financeManage/queryRelatedBill',
					data : {
						ro_code : _data.ro_code
					},
					dataType : 'json'
				}).done(function(result){
					if(result.code != 200){
						return;
					}

					$.each(result.data.relatedBillVos, function(index, data){
						var html = '';
						html += '<tr class="subtable-item" data-type="'+ data.rb_type +'">';
						html += '	<td><span class="item-index" data-index="'+ (index + 1) +'">'+ (index + 1) +'</span></td>';
						html += '	<td data-value="'+ data.rb_type +'">'+ returnBillType(data.rb_type) +'</td>';
						html += '	<td class="ok">'+ returnFloat(data.rb_paymentMoney) +'</td>';
						html += '	<td>'+ returnDate(data.rb_paymentDate) +'</td>';
						html += '	<td><div class="form-list-remarks">'+ returnValue(data.rb_remarks) +'</div></td>';
						html += '	<td>'+ returnValue(data.rb_create_name) +'</td>';
						html += '	<td>'+ returnDate(data.rb_createTime) +'</td>';
						html += '</tr>';

						_box.find(".form-list-tbody").find(".load-tr").remove();
						_box.find(".form-list-tbody").append(html);
						_box.find(".form-list-tbody tr:last").data("data", data)
							.hover(function() {
								var item = $(this).find(".item-index");
								item.addClass("subtable-remove fa-minus-circle").empty();
							}, function() {
								var item = $(this).find(".item-index");
								item.removeClass("subtable-remove fa-minus-circle").html(item.attr("data-index"));
							});
						
						calculatePayableCost(_box.find(".form-list-tbody"));
					});
				});
				
			}
			
			/** 选中指定文本框*/
			_box.find("[name=house_address]").focus().AutoHouse({
				result : function(data){
					_box.find("[name=house_address]")
						.val(data.house_address)
						.attr("data-code", data.hi_code);
					if(!isEmpty(data.hi_code)){
						
					}
				}
			});
			
			// 【事件】添加账单-------------------------
			_box.on("click", "[name=option-add-bill]", function(){
				var item_data = $(this).parents(".subtable-item").data("data");
				
				var html ='';
				html += '<div class="form-model-box">';
				html += '	<div class="form-model-main">';
				html += '		<div class="form-model-head">';
				html += '			<label class="form-model-title">添加账单</label>';
				html += '			<button class="fa-close" name="option-close-bill"></button>';
				html += '		</div>';
				html += '	    <table class="form">';
				html += '	    	<tbody>';
				html += '	    		<tr class="form-item">';
				html += '	    			<td class="form-item-title"><em>*</em>支付类型</td>';
				html += '	    			<td class="form-item-content">';
				html += '	    				<select class="form-content-in" name="rb_type" placeholder="支付类型" required>';
				html += '	    					<option value="">请选择</option>';
				html += '	    					<option>租金</option>';
				html += '	    					<option>押金</option>';
				html += '	    				</select>';
				html += '	    			</td>';
				html += '	    		</tr>';
				html += '	    		<tr class="form-item">';
				html += '	    			<td class="form-item-title"><em>*</em>支付金额</td>';
				html += '	    			<td class="form-item-content">';
				html += '	    				<input type="text" class="form-content-in minusNumber" name="rb_paymentMoney" maxlength="11" placeholder="支付金额" required>';
				html += '	    			</td>';
				html += '	    		</tr>';
				html += '	    		<tr class="form-item">';
				html += '	    			<td class="form-item-title"><em>*</em>支付日期</td>';
				html += '	    			<td class="form-item-content">';
				html += '	    				<label class="form-item-content-box fa-calendar"><input type="text" class="form-content-in" name="rb_paymentDate" value="'+ returnDate(new Date()) +'" onfocus="WdatePicker()" placeholder="支付日期" readonly required></label>';
				html += '	    			</td>';
				html += '	    		</tr>';
				html += '	    		<tr class="form-item">';
				html += '	    			<td class="form-item-title">备注</td>';
				html += '	    			<td class="form-item-content">';
				html += '	    				<textarea class="form-content-in" name="rb_remarks" style="width: 250px; height: 60px;" maxlength="120" placeholder="备注"></textarea>';
				html += '	    			</td>';
				html += '	    		</tr>';
				html += '	    		<tr class="form-item">';
				html += '	    			<td class="form-item-title"></td>';
				html += '	    			<td class="form-item-content">';
				html += '	    				<button class="form-content-in next-bg" name="rb_add_btn" style="border: none;">确定添加</button>';
				html += '	    			</td>';
				html += '	    		</tr>';
				html += '	    	</tbody>';
				html += '	    </table>';
				html += '	</div>';
				html += '</div>';
				$(html).prependTo(h).show('fast');
				
				var _item_box =h.find(".form-model-box");
				
				// 【初始化】支付类型数据-------------------------
				$.ajax({
					type : "POST",
					url : "/financeManage/queryBillTypeList",
					data : { pCode : 2 },
					dataType : "json",
				}).done(function(result) {
					if (result.code != 200) {
						return false;
					}
					var html = '';
					html += '<option value="">请选择</option>';
					$.each(result.data, function(index, data){
						var _option = "";
						_box.find(".form-list-tbody tr").each(function(){
							if(!isEmpty($(this).data("data")) && $(this).data("data").rb_type == data.bt_code){
								_option = "disabled";
							}
						});
						html += '<option value="'+ data.bt_code +'" '+ _option +'>'+ data.bt_name +'</option>';
					});
					_item_box.find("[name=rb_type]").html(html);
					
					// 加载数据
					if(!isEmpty(item_data)){
						_item_box.find("[name=rb_type] option[value="+ item_data.rb_type +"]").removeAttr("disabled").attr("selected", "selected");
						_item_box.find("[name=rb_type]").attr("disabled", "disabled");
					}
				});
				
				// 加载数据
				if(!isEmpty(item_data)){
					_item_box.find("[name=rb_paymentMoney]").val(item_data.rb_paymentMoney);
					_item_box.find("[name=rb_paymentDate]").val(returnDate(item_data.rb_paymentDate));
					_item_box.find("[name=rb_remarks]").val(item_data.rb_remarks);
					_item_box.find("[name=rb_add_btn]").text("确定修改");
					_item_box.find(".form-model-title").text("编辑账单");
					// 定位
					_item_box.find(".form-content-in:required").eq(1).select();
				} else {
					// 定位
					_item_box.find(".form-content-in:required").eq(0).focus();
				}

				// 【事件】添加账单按钮-------------------------
				_item_box.find("[name=rb_add_btn]").on("click", function(){
					var item_len = _box.find(".form-list-tbody").find("tr").not(".load-tr").length;
					var _boo = true;
					
					var rb_type = _item_box.find("[name=rb_type] option:selected");
					var rb_paymentMoney = _item_box.find("[name=rb_paymentMoney]");
					var rb_paymentDate = _item_box.find("[name=rb_paymentDate]");
					var rb_remarks = _item_box.find("[name=rb_remarks]");
					
					_item_box.find(".form-content-in:required").each(function(){
						if(isEmpty($(this).val())){
							$(this).msg('请'+ (this.tagName == "SELECT"?"选择":"填写") + returnValue($(this).attr("placeholder")));
							return _boo = false;
						}
					});
					
					if(!_boo){
						return;
					}

					var data = {};
					data.rb_type = rb_type.val();
					data.rb_type_name = rb_type.text();
					data.rb_paymentMoney = returnFloat(rb_paymentMoney.val());
					data.rb_paymentDate = rb_paymentDate.val();
					data.rb_remarks = $.trim(rb_remarks.val());
					data.rb_create_name = $.cookie("em_name");
					data.rb_creator = $.cookie("em_id");
					data.rb_createTime = new Date().getTime();
					
					var html = '';
					html += '<tr class="subtable-item" data-type="'+ rb_type.val() +'">';
					html += '	<td><span class="item-index" data-index="'+ (item_len + 1) +'">'+ (item_len + 1) +'</span></td>';
					html += '	<td data-value="'+ rb_type.val() +'">'+ rb_type.text() +'</td>';
					html += '	<td class="ok">'+ rb_paymentMoney.val() +'</td>';
					html += '	<td>'+ rb_paymentDate.val() +'</td>';
					html += '	<td><div class="form-list-remarks">'+ rb_remarks.val() +'</div></td>';
					html += '	<td>'+ data.rb_create_name +'</td>';
					html += '	<td>'+ returnDate(new Date()) +'</td>';
					html += '</tr>';

					if(isEmpty(item_data)){
						_box.find(".form-list-tbody").find(".load-tr").remove();
						_box.find(".form-list-tbody").append(html);
						_box.find(".form-list-tbody tr:last").data("data", data)
							.hover(function() {
								var item = $(this).find(".item-index");
								item.addClass("subtable-remove fa-minus-circle").empty();
							}, function() {
								var item = $(this).find(".item-index");
								item.removeClass("subtable-remove fa-minus-circle").html(item.attr("data-index"));
							});
					} else {
						var target_box = _box.find(".subtable-item[data-type="+ rb_type.val() +"]");
						target_box.html($(html).html());
						target_box.data("data", $.extend(target_box.data("data"), data));
					}
					
					calculatePayableCost(_box.find(".form-list-tbody"));
					
					_item_box.slideDown("fast", function(){ 
						$(this).remove();
						_box.find("[name=option-add-bill]").focus();
					});
				});
				
				// 【事件】关闭添加账单-------------------------
				_item_box.find("[name=option-close-bill]").on("click", function(){
					_item_box.slideDown("fast", function(){ $(this).remove(); });
				});
			});
			
			// 【事件】选择支付方式-------------------------
			var _state2 = $.jBox.getState("state2");
			_state2.on("change", "[name=ro_payType]", function(){
				var _this = $(this);
				if(_this.attr("data-index") == "all"){
					_this.siblings("[name=ro_payType]").remove();
				} else {
					_this.next().remove();
				}
				var _sel_val = returnNumber(_this.find("option:selected").val());
				if(_sel_val == 311 || _sel_val == 312){
					_state2.find(".jbox-button-panel").find(".jbox-button[value=1]").attr("disabled", "disabled").addClass("disabled-bg");
				} else {
					_state2.find(".jbox-button-panel").find(".jbox-button[value=1]").removeAttr("disabled").removeClass("disabled-bg");
				}
				$.ajax({
					type : "POST",
					url : "/financeManage/queryTypeList",
					data : {
						bt_parentCode : _this.find("option:selected").val()
					},
					dataType : "json"
				}).done(function(result){
					if(result.code != 200){
						return;
					}
					if(isEmpty(result.data)){
						return;
					}
					var html = [];
					html.push('<select class="form-content-in" name="ro_payType" required>');
					if(returnNumber(_this.find("option:selected").val()) == 31){
						html.push('<option value="">请选择</option>');
					}
					$.each(result.data, function(index, data){
						var _val = '';
						if(!isEmpty(data.bt_value)){
							_val = ' [ ' + data.bt_value.substring(0, 4) + '****' + (data.bt_value.substring(data.bt_value.length - 4, data.bt_value.length)) + ' ]';
						}
						html.push('<option value="'+ data.bt_code +'" data-parent="'+ data.bt_parentCode +'" data-value="'+ data.bt_value +'">'+ data.bt_name + _val +'</option>');
					});
					html.push('</select>');
					_this.after(html.join(""));
				});
			});
		},
	});
}

/** 总金额计算*/
function calculatePayableCost(_box){
	var _total_money = 0;
	_box.find("tr").each(function(){
		_total_money += $(this).data("data").rb_paymentMoney;
	});
	$("#total-money").html(_total_money);
}

/** 关联房源*/
function relatedHouse(){
	var check = $("[name=table-checkbox]:checked");
	switch (check.length) {
		case 0:
			$.jBox.tip("请选择需要关联的订单");
			break;
		case 1:
			// 关联订单数据
			var _data = check.data("data");
			// 关联账单数据
			var related_data = '';
			// 缓存map
			var cacheMap = {};
			// 缓存list
			var cacheList = [];
			
			if(_data.ro_state != 1){
				if(_data.ro_state == 2){
					$.jBox.tip("该订单已关联，不能再关联订单", "warning");
				}
				return;
			}
			
			$.ajax({
				url : '/financeManage/queryRelatedBill',
				data : {
					ro_code : _data.ro_code
				},
				dataType : 'json'
			}).done(function(result){
				if(result.code != 200){
					return;
				}
				related_data = result.data.relatedBillVos;
			});
			
			var html1 = '';
			html1 +='<div class="model-related-box">';
			html1 +='   <div class="related-box-head">';
			html1 +='   	<dl class="related-item"><dt>小区房号</dt><dd>'+ returnValue(_data.house_address) +'<i class="related-icon fa-search ok" data-value="'+ returnValue(_data.house_address) +'" title="搜索小区房号"></i></dd></dl>'; //  style="flex:1;"
			html1 +='   	<dl class="related-item"><dt>客户类型</dt><dd>'+ returnValue(_data.ro_customerType == 201?"房东":"租客") +'</dd></dl>';
			html1 +='   	<dl class="related-item"><dt>客户姓名</dt><dd>'+ returnValue(_data.ro_customerName) +'<i class="related-icon fa-search ok" data-value="'+ returnValue(_data.ro_customerName) +'" title="搜索客户姓名"></i></dd></dl>';
			html1 +='   	<dl class="related-item"><dt>客户电话</dt><dd>'+ returnValue(_data.ro_customerPhone) +'<i class="related-icon fa-search ok" data-value="'+ returnValue(_data.ro_customerPhone) +'" title="搜索客户电话"></i></dd></dl>';
			html1 +='   	<div style="display:flex;flex:1;">';
			html1 +='   		<input type="text" name="related-house" value="'+ returnValue(_data.house_address) +'" data-code="'+ returnValue(_data.hi_code) +'" data-type="'+ (_data.ro_customerType == 201?"托管合同":"租赁合同") +'" placeholder="小区房号、电话、姓名" style="line-height: 32px;padding: 0 8px;border: 1px solid #ddd;flex: 1;">';
			html1 +='   		<button class="fa-search ok-bg" name="related-house-search" style="width: 36px;font-size: 14px;cursor: pointer;"></button>';
			html1 +='   	</div>';
			html1 +='   </div>';
			html1 +='   <div class="related-box-main"></div>';
			html1 +='   <div class="related-box-foot">';
			html1 +='		<button class="foot-item fa-angle-left" name="prevPage"></button>';
			html1 +='		<span style="margin-right: 6px;min-width: 16px;text-align: center;" id="pageNo">1</span>';
			html1 +='		<span style="margin-right: 6px;">/</span>';
			html1 +='		<span style="margin-right: 6px;min-width: 16px;text-align: center;" id="totalPage"></span>';
			html1 +='		<button class="foot-item fa-angle-right" name="nextPage"></button>';
			html1 +='		<div style="flex: 1;text-align: right;">共<span id="totalRecords"></span>条记录</div>';
			html1 +='	</div>';
			html1 +='</div>';
			
			var states = {};
			states.state1 = {
				content : html1,
				buttons : { '下一步': 1, '取消': 0 },
				submit : function(v, h, f){
					if(v == 1){
						if(h.find("[name=related-checkbox]:checked").length < 1){
							$.jBox.tip("请选择关联订单");
							return false;
						}
						
						_item_data = h.find("[name=related-checkbox]:checked").data("data");
						

						cacheMap = {};
						cacheList = [];
						initRelatedData(related_data, _item_data.billCycleList, cacheMap, cacheList);
							
						var html = '';
						html +='<div class="model-related-box">';
						html +='	<div class="related-box-head">';
						html +='   		<dl class="related-item" style="flex:1;">';
						html +='			<dd style="line-height: 30px;text-align: left;border-bottom: 1px solid #21b0e2;">关联账单</dd>';
						html +='			<dd style="display: flex;justify-content: space-between;line-height: 30px;">';
						html +='				<span>'+ returnValue(_data.house_address) +'</span>';
						html +='				<span>'+ returnValue(_data.ro_customerType == 201?"房东":"租客") +'/'+ returnValue(_data.ro_customerName) +'/'+ returnValue(_data.ro_customerPhone) +'</span>';
						html +='			</dd>';
						html +='			<dd>';
						html +='				<table class="related-table">';
						html +='					<thead>';
						html +='						<tr>';
						html +='							<td>账单类型</td>';
						html +='							<td>账单金额</td>';
						html +='							<td>账单日期</td>';
						html +='							<td>账单备注</td>';
						html +='						</tr>';
						html +='					</thead>';
						html +='					<tbody>';
						$.each(related_data, function(index, data){
							var bal = {};
							if(_data.ro_customerType == 201) {
								if(data.rb_balPay == 0){
									bal.text = "-";
									bal.style = "error";
								}
								if(data.rb_balPay == 1){
									bal.text = "";
									bal.style = "ok";
								}
							}
							if(_data.ro_customerType == 202) {
								if(data.rb_balPay == 0){
									bal.text = "";
									bal.style = "ok";
								}
								if(data.rb_balPay == 1){
									bal.text = "-";
									bal.style = "error";
								}
							}
							
							html +='                    <tr class="subtable-item">';
							html +='                    	<td data-value="'+ data.rb_type +'">'+ returnBillType(data.rb_type) +'</td>';
							html +='                    	<td class="'+ bal.style +'">'+ bal.text + returnFloat(data.rb_paymentMoney) +'</td>';
							html +='                    	<td>'+ returnDate(data.rb_paymentDate) +'</td>';
							html +='                    	<td><div>'+ returnValue(data.rb_remarks) +'</div></td>';
							html +='                    </tr>';
						});
						html +='					</tbody>';
						html +='				</table>';
						html +='			</dd>';
						html +='		</dl>';
						html +='   		<dl class="related-item" style="width:30px;text-align:center;padding: 0;">';
						html +='			<dd style="line-height: 30px;border-bottom: 1px solid transparent;">&nbsp;</dd>';
						html +='			<dt style="line-height: 30px;">&nbsp;</dt>';
						html +='			<dd>';
						html +='				<table class="related-table" style="border-color: transparent;">';
						html +='					<thead>';
						html +='						<tr style="border-color: transparent;">';
						html +='							<td>&nbsp;</td>';
						html +='						</tr>';
						html +='					</thead>';
						html +='					<tbody id="iconList">';
						$.each(cacheList, function(index, data){
							html +='                    <tr class="subtable-item" style="border-color: transparent;">';
							html +='                    	<td id="iconItem'+ data.type +'" style="height: 29px;">'+ data.icon +'</td>'; 
							html +='                    </tr>';
						});
						html +='					</tbody>';
						html +='				</table>';
						html +='			</dd>';
						html +='		</dl>';
						html +='   		<dl class="related-item" style="flex:1;">';
						html +='			<dd style="line-height: 30px;text-align:left;border-bottom: 1px solid #1ABC9C;">被关联账单';
						html +='				<div class="related-item-option">期数';
						html +='					<select name="related-cycle">';
						$.each(_item_data.billCycleList, function(sub_index, sub_data){
							if(sub_data.bcb_type == 0){
								html +='				<option value="'+ sub_data.bcb_cycle +'">'+ sub_data.bcb_cycle +'</option>';
							}
						});
						html +='					</select>';
						html +='				</div>';
						html +='			</dd>';
						html +='			<dd style="display: flex;justify-content: space-between;line-height: 30px;">';
						html +='				<span>'+ returnValue(_item_data.house_address) +'</span>';
						html +='				<span>'+ returnValue(_item_data.contractObject_Type == "托管合同"?"房东":"租客") +'/'+ returnValue(_item_data.bco_customerName) +'/'+ returnValue(_item_data.bco_customerPhone) +'</span>';
						html +='			</dd>';
						html +='			<dd>';
						html +='				<table class="related-table">';
						html +='					<thead>';
						html +='						<tr>';
						html +='							<td>账单类型</td>';
						html +='							<td>账单金额</td>';
						html +='							<td>账单日期</td>';
						html +='							<td>账单状态</td>';
						html +='						</tr>';
						html +='					</thead>';
						html +='					<tbody id="contractBillList">';
						$.each(cacheList, function(sub_index, sub_data){
							if(!isEmpty(sub_data.list)){
								var bal = {};
								if(_item_data.bco_type == 201) {
									if(sub_data.list.bcb_balPay == 0){
										bal.text = "-";
										bal.style = "error";
									}
									if(sub_data.list.bcb_balPay == 1){
										bal.text = "";
										bal.style = "ok";
									}
								}
								if(_item_data.bco_type == 202) {
									if(sub_data.list.bcb_balPay == 0){
										bal.text = "";
										bal.style = "ok";
									}
									if(sub_data.list.bcb_balPay == 1){
										bal.text = "-";
										bal.style = "error";
									}
								}
								var bcb_state = returnBillState(sub_data.list.bcb_state);
								html += '                   <tr>';
								html += '                   	<td>'+ returnBillType(sub_data.list.bcb_type) +'</td>';
								html += '                   	<td class="'+ bal.style +'">'+ bal.text + returnFloat(sub_data.list.bcb_repayment) +'</td>';
								html += '                   	<td>'+ returnDate(sub_data.list.bcb_repaymentDate) +'</td>';
								html += '                   	<td class="'+ bcb_state.style +'">'+ bcb_state.text +'</td>';
								html += '                   </tr>';
							} else {
								html += '                   <tr>';
								html += '                   	<td>--</td>';
								html += '                   	<td></td>';
								html += '                   	<td></td>';
								html += '                   	<td></td>';
								html += '                   </tr>';
							}
						});
						html +='					</tbody>';
						html +='				</table>';
						html +='			</dd>';
						html +='		</dl>';
						html +='	</div>';
						html +='</div>';
						$.jBox.nextState(html);
						return false;
					}
				}
			};
			states.state2 = {
				content : '',
				buttons : { '上一步': -1, '确认关联': 1,'取消': 0 },
				submit : function(v, h, f){
					if(v == -1){
						$.jBox.prevState();
						return false;
					}
					if(v == 1){
						var hint = '';
						$.each(cacheList, function(index, data){
							if(data.model == "error"){
								hint += returnBillType(data.type) + "、";
							}
						});
						hint = isEmpty(hint) ? hint : hint.substring(0, hint.length - 1);
						hint = isEmpty(hint) ? '确定关联该订单吗？' : '<label class="error">关联的'+ hint +'金额不匹配</label><br>确定还要继续关联该订单吗？';
						$.jBox.confirm(hint, "提示", function(v){
							if(v == 'ok'){
								$.ajax({
									type : "POST",
									url : "/financeManage/submitRelatedOrder",
									data : {
										ro_id : _data.ro_id,
										bco_code : _item_data.bco_code,
										bcb_cycle: h.find('[name=related-cycle] option:selected').val(),
									},
									dataType : "json"
								}).done(function(result){
									if(result.code != 200){
										$.jBox.closeTip();
										$.jBox.tip(result.msg);
										return;
									}
									$.jBox.close(h);
									$.jBox.tip("关联成功", "success");
									$.table.loadData();
								});
							}
						});
						return false;
					}
				}
			};
			$.jBox(states, {
				title : '关联订单',
				width : 780,
				height : 'auto',
				loaded : function(h){
					// 【事件】上一页
					h.find(".related-icon").on("click", function(){
						h.find("#pageNo").text(1);
						h.find("#totalPage").text(1);
						h.find("#totalRecords").text(0);
						h.find("[name=related-house]").val($(this).attr("data-value"));
						h.find("[name=related-house-search]").click();
					});
					
					// 【事件】上一页
					h.find("[name=prevPage]").on("click", function(){
						var pageNo = returnNumber(h.find("#pageNo").text());
						if (pageNo <= 1) {
							return;
						}
						var totalPage = returnNumber(h.find("#totalPage").text());
						if(pageNo > totalPage){
							h.find("#pageNo").text(totalPage);
						} else {
							h.find("#pageNo").text(pageNo - 1);
						}
						h.find("[name=related-house-search]").click();
					});
					// 【事件】下一页
					h.find("[name=nextPage]").on("click", function(){
						var pageNo = returnNumber(h.find("#pageNo").text());
						var totalPage = returnNumber(h.find("#totalPage").text());
						if (pageNo >= totalPage) {
							return;
						}
						h.find("#pageNo").text(pageNo + 1);
						h.find("[name=related-house-search]").click();
					});
					// 【事件】搜索房源
					h.find("[name=related-house]").on("change", function(){
						h.find("#pageNo").text(1);
						h.find("#totalPage").text(1);
						h.find("#totalRecords").text(0);
						h.find("[name=related-house-search]").click();
					});
					// 【事件】搜索房源
					h.find("[name=related-house-search]").on("click", function(){
						$.ajax({
							type : "POST",
							url : "/financeManage/queryRelatedHouseContractList",
							data : {
								pageNo : h.find("#pageNo").text(),
								pageSize : 6,
								con_type : $("[name=related-house]").attr("data-type"),
								query_where : $("[name=related-house]").val(),
							},
							dataType : "json"
						}).done(function(result){
							if(result.code != 200){
								h.find(".related-box-main").html(result.msg);
								return;
							}
							h.find(".related-box-main").find("tbody").empty();
							if(isEmpty(result.data.list)){
								h.find(".related-box-main").html("没有找到相关信息");
								return;
							}

							var html = '';
							html +='<table>';
							html +='	<thead>';
							html +='	    <tr style="background: #e1f0f5;">';
							html +='	    	<td>#</td>';
							html +='	    	<td style="text-align: left;">小区房号</td>';
							html +='	    	<td>合同号</td>';
							html +='	    	<td>客户类型</td>';
							html +='	    	<td>客户姓名</td>';
							html +='	    	<td>客户电话</td>';
							html +='	    	<td>支付类型</td>';
							html +='	    	<td>金融机构</td>';
							html +='	    	<td>订单状态</td>';
							html +='	    </tr>';
							html +='	</thead>';
							html +='	<tbody></tbody>';
							html +='</table>';
							h.find(".related-box-main").html(html);
							
							$.each(result.data.list, function(index, data){
								var bco_optionState = returnBillState(data.bco_optionState);
								var html = '';
								html +='<tr class="related-model-item" data-index="'+ index +'">';
								html +='	<td><label class="table-checkbox-box"><input type="checkbox" name="related-checkbox"></label></td>';
								html +='	<td style="text-align: left;">'+ returnValue(data.house_address) +'</td>';
								html +='	<td>'+ returnValue(data.contractObject_No) +'</td>';
								html +='	<td>'+ returnValue(data.contractObject_Type =="托管合同"?"房东":"租客") +'</td>';
								html +='	<td>'+ returnValue(data.bco_customerName) +'</td>';
								html +='	<td>'+ returnValue(data.bco_customerPhone) +'</td>';
								html +='	<td>'+ returnValue(data.contractBody_PayStyle) +'</td>';
								html +='	<td>'+ returnValue(data.bco_cooperater) +'</td>';
								html +='	<td class="'+ bco_optionState.style +'">'+ bco_optionState.text +'</td>';
								html +='</tr>';
								html +='<tr class="related-model-box" data-index="'+ index +'" style="display: none">';
								html +='</tr>';
								h.find(".related-box-main").find("tbody").append(html);
								h.find(".related-box-main").find(".related-model-item:last").find("[name=related-checkbox]").data("data", data);
							});
							
							h.find("#totalPage").text(result.data.totalPage);
							h.find("#totalRecords").text(result.data.totalRecords);
						});
					});
					
					// 【事件】改变期数
					$(document).on("change", "[name=related-cycle]", function(e) {
						var _this = $(this);
						var option_box = $("#contractBillList");
						option_box.empty();
						
						cacheMap = {};
						cacheList = [];
						initRelatedData(related_data, _item_data.billCycleList, cacheMap, cacheList, returnNumber(_this.find("option:selected").val()));
						
						$("#iconList").empty();
						$.each(cacheList, function(index, data){
							var html = '';
							html +='<tr class="subtable-item" style="border-color: transparent;">';
							html +='	<td id="iconItem'+ data.type +'" style="height: 29px;">'+ data.icon +'</td>'; 
							html +='</tr>';
							$("#iconList").append(html);
						});
						
						$.each(cacheList, function(index, data){
							if(!isEmpty(data.list)){
								var bcb_state = returnBillState(data.list.bcb_state);
								var bal = {};
								if(_item_data.bco_type == 201) {
									if(data.list.bcb_balPay == 0){
										bal.text = "-";
										bal.style = "error";
									}
									if(data.list.bcb_balPay == 1){
										bal.text = "";
										bal.style = "ok";
									}
								}
								if(_item_data.bco_type == 202) {
									if(data.list.bcb_balPay == 0){
										bal.text = "";
										bal.style = "ok";
									}
									if(data.list.bcb_balPay == 1){
										bal.text = "-";
										bal.style = "error";
									}
								}
								var bcb_state = returnBillState(data.list.bcb_state);
								
								var html= '';
								html += '<tr>';
								html += '	<td>'+ returnBillType(data.list.bcb_type) +'</td>';
								html += '	<td class="'+ bal.style +'">'+ bal.text + returnFloat(data.list.bcb_repayment) +'</td>';
								html += '	<td>'+ returnDate(data.list.bcb_repaymentDate) +'</td>';
								html += '	<td class="'+ bcb_state.style +'">'+ bcb_state.text +'</td>';
								html += '</tr>';
								option_box.append(html);
							} else {
								var html= '';
								html += '<tr>';
								html += '	<td>--</td>';
								html += '	<td></td>';
								html += '	<td></td>';
								html += '	<td></td>';
								html += '</tr>';
								option_box.append(html);
							}
						});
					});
					
					// 【执行事件】
					h.find("[name=related-house-search]").click();
				}
			});
			
			$(document).on("click", ".related-model-item", function(e) {
				var _name = "[name=related-checkbox]";
				var check = $(this).find(_name);
				$(_name).removeAttr("checked").parent().removeClass("table-checkbox-checked");
				check.attr("checked", "checked").parent().addClass("table-checkbox-checked");
			});
			
			break;
		default :
			$.jBox.tip("只能选择一项");
			break;
	}
}

/**
 * 初始化关联账单
 * 
 * @param relatedBillList
 *            关联账单列表
 * @param contractBillList
 *            合同账单列表
 * @param cacheMap
 *            缓存Map
 * @param cacheList
 *            缓存列表
 * @param mode
 *            模式[-1:初始化、0+:账单选择]
 */
function initRelatedData(relatedBillList, contractBillList, cacheMap, cacheList, mode){
	$.each(relatedBillList, function(index, data){
		cacheMap[data.rb_type] = data.rb_type;
		cacheList.push({
			type : data.rb_type,
			icon : '<i class="fa-long-arrow-right next" style="font-size: 18px;" title=""></i>',
			list : null,
			model : 'next',
			cache : data
		});
	});
	$.each(contractBillList, function(index, data){
		if (data.bcb_cycle == (mode || 0)) {
			if(cacheMap[data.bcb_type] == null){
				cacheMap[data.bcb_type] = data.bcb_type;
				cacheList.push({
					type : data.bcb_type,
					icon : '',
					list : data
				});
			} else {
				$.each(cacheList, function(index, data1){
					if(data1.type == data.bcb_type){
						data1.list = data;
						if(data1.cache != null){
							if(data1.cache.rb_balPay != data.bcb_balPay){
								data1.model = "error";
								data1.icon = '<i class="fa-arrows-h error" style="font-size: 18px;"></i>';
							} else if(data1.cache.rb_paymentMoney != data.bcb_repayment){
								data1.model = "error";
								data1.icon = '<i class="fa-arrows-h error" style="font-size: 18px;"></i>';
							} else {
								data1.model = "ok";
								data1.icon = '<i class="fa-check-circle ok" style="font-size: 18px;"></i>';
							}
						}
					}
				});
			}
		}
	});
}

/** 撤销订单*/
function removeOrder(){
	var check = $("[name=table-checkbox]:checked");
	switch (check.length) {
		case 0:
			$.jBox.tip("请选择需要撤销的订单");
			break;
		case 1:
			var _data = check.data("data");
			if(_data.ro_state == 2){
				$.jBox.tip("该订单已关联，不能撤销", "warning");
				return;
			}
			if(_data.ro_payState == 3){
				$.jBox.tip("该订单已经撤销，不需要重复操作", "warning");
				return;
			}
			if(_data.ro_payState == 2){
				$.jBox.tip("该订单已支付，确定需要撤销订单吗？", "warning");
				return;
			}
			$.jBox.tip("功能开发中...0");
			break;
		default :
			$.jBox.tip("只能选择一项");
			break;
	}
}

/** 解约订单*/
function cancelOrder(){
	var check = $("[name=table-checkbox]:checked");
	switch (check.length) {
	case 0:
		$.jBox.tip("请选择需要解约的订单");
		break;
	case 1:
		var _data = check.data("data");
		if(_data.ro_state != 2){
			$.jBox.tip("只有[已支付]的订单才能解约", "warning");
			return;
		}
		$.jBox.tip("功能开发中...1");
		break;
	default :
		$.jBox.tip("只能选择一项");
	break;
	}
}