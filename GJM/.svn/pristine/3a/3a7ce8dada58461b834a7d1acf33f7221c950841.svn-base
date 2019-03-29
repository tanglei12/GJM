var statement_code,
	con_code,
	cco_code,
	mode,
	conType;

$(function() {
	con_code = getQueryString("con_code");
	mode = getQueryString("mode");
	
	// 自定义滚动条初始化
	$("#menu-dl-box,#menu-dl-list,#sourceList,.dlList").perfectScrollbar();
	// 时间控件初始化
	$("input[name=cco_realDate],input[name=calCostDate]").datepicker();
	// 计算应收金额
	calAllCost();
	
	// 初始化数据
	initViewData();
	
	initFunction();
})

/** 初始化房屋结算数据*/
function initViewData(){
	$.ajax({
		type : 'POST',
		url : '/contractObject/queryContractStatementInfo',
		data : {
			con_code : con_code,
			mode : mode
		},
		dataType : 'json',
		beforeSend : function(){
			$("body").append('<div class="loading-mark"></div>');
		}
	}).done(function(result){
		if(result.code == 200){
			data = result.data;
			cancelContract = data.cancelContract;
			contract = data.contract;
			customer = data.customer;
			statementOrder = data.statementOrder;
			energyCardList = data.energyCardList;
			cardValueList = data.cardValueList;
			
			conType = contract.contractObject_Type;
			// --START--------------------------
			
			// 设置参数数据
			$("#edit-customer-bank").data({
				"customer" : customer,
				"statementOrder" : statementOrder
			});
			
			if(mode == "in"){
				$("[data-type=违约金],[data-type=代理费]").hide();
				$("[data-type=结余][data-name=3],[data-type=结余][data-name=4],[data-type=结余][data-name=6],[data-type=结余][data-name=7]").hide();
				
				if(conType == "托管合同"){
					$(".active-title").text("交房结算");
					$("#sub-title-diy").text("业主交房结算单");
					$(".cco_handhouse_title").text("交房日期");
					$("[name=cco_realDate]").attr("placeholder", "交房日期");
					$("#statement_deposit_credit").val(0);
					$("#statement_deposit_debit").val(contract.contractBody_Pay);
				}
				if(conType == "租赁合同"){
					$(".active-title").text("接房结算");
					$("#sub-title-diy").text("租客接房结算单");
					$(".cco_handhouse_title").text("接房日期");
					$("[name=cco_realDate]").attr("placeholder", "接房日期");
					$("#statement_deposit_credit").val(contract.contractBody_Pay);
					$("#statement_deposit_debit").val(0);
				}
			} else {
				if(conType == "托管合同"){
					$("[data-type=违约金][data-name=金融公司]").hide();
					var html ="";
					html +='<td class="title" colspan="2">违约金/滞纳金</td>';
					html +='<td><input type="text" class="money" name="sci_unitPrice" placeholder="月租金"></td>';
					html +='<td>';
					html +='	<input type="text" class="minusNumber" name="sci_number" maxlength="11" style="text-align: center;" placeholder="违约金">';
					html +='</td>';
					html +='<td colspan="3"><input type="text" name="sci_desc" placeholder="说明"></td>';
					html +='<td><input type="text" name="sci_totalCosts"  placeholder="小计" disabled></td>';
					$("[data-type=违约金][data-name=滞纳金]").html(html).find("[name=sci_number]").change(function(){
						$("[data-type=违约金][data-name=滞纳金]").find("[name=sci_totalCosts]").val(returnFloat($(this).val()));
						calTotalCost("违约金");
					});
					
					$(".active-title").text("接房结算");
					$("#sub-title-diy").text("业主接房结算单");
					$(".cco_handhouse_title").text("接房日期");
					$("[name=cco_realDate]").attr("placeholder", "接房日期");

					$("#statement_deposit_credit").val(contract.contractBody_Pay);
					$("#statement_deposit_debit").val(0);
				}
				if(conType == "租赁合同"){
					$(".active-title").text("交房结算");
					$("#sub-title-diy").text("租客交房结算单");
					$(".cco_handhouse_title").text("交房日期");
					$("[name=cco_realDate]").attr("placeholder", "交房日期");

					$("#statement_deposit_credit").val(0);
					$("#statement_deposit_debit").val(contract.contractBody_Pay);
				}
			}
			
			// 押金
			$("input[name=contractBody_Pay]").val(contract.contractBody_Pay);
			
			if(!isEmpty(cancelContract)){
				// 初始化
				cco_code = cancelContract.cco_code;
				// 合约备注
				$(".cco_applicationType").html(returnValue(cancelContract.cco_applicationType == '退租'?"强退":cancelContract.cco_applicationType));
				// 客户1
				$("input[name=cco_applicant]").val(cancelContract.cco_applicantName + (contract.contractObject_Type == "托管合同"?"（业主）":"（租客）"));
				// 客户2
				$("#cco_applicant").val(cancelContract.cco_applicantName);
				// 销售主管
				$("#em_director").val(contract.ucc_corporation);
				// 复核人员
				$("#em_reviewer").val(cancelContract.auditingRecord_author2);
			} else {
				// 客户1
				$("input[name=cco_applicant]").val(contract.cc_name + (contract.contractObject_Type == "托管合同"?"（业主）":"（租客）"));
				// 客户2
				$("#cco_applicant").val(contract.cc_name);
				// 销售主管
				$("#em_director").val(contract.ucc_corporation);
				// 复核人员
				$("#em_reviewer").val(contract.em_reviewer);
			}
			
			// 地址
			$(".house_address").text(contract.house_address);
			
			// 合同日期
			$("input[name=contract_date]").val(contract.contractBody_StartTOEnd);
			
			// 月租金
			$("input[name=contract_rent]").val(contract.contractBody_Rent);
			
			// 租金/天
			$("[data-type=消费][data-name=租金]").find("input[name=sci_unitPrice]").val(returnFloat(contract.contractBody_Rent/30));
			
			// 初始化交接单
			if(!isEmpty(statementOrder)){
				// 赋值结算单编号
				statement_code = statementOrder.statement_code;
				
				// 备注
				$("#statement_remarks").val(returnValue(statementOrder.statement_remarks));
				
				// 图片
				var _paths = (statementOrder.statement_path || "").split(";");
				if(!isEmpty(_paths)){
					var len = 0;
					$.each(_paths, function(index, data){
						if(!isEmpty(data)){
							var img=data.split('image.cqgjp.com/');
							var imgg=img[1].split('?');
							var html ="";
							html += '<div class="images-box-img"><img class="showboxImg" name="JSD" src="'+ data +'" data-url="'+imgg[0]+'" ><span class="images-box-img-delete" data-type="JSD" data-url="'+img[1]+'" data-del-url="">删除</span></div>';
							$(".images-box").append(html);
							len++;
						}
					})
					$("#JSD-count").text(returnNumber(len));
				}
				// 交/接房日期
				$("input[name=cco_realDate]").val(returnDate(statementOrder.statement_handoverDate));
				// 结算日期
				$("input[name=calCostDate]").val(returnDate(statementOrder.statement_balanceTime));
				// 结算人
				$("[name=statement_balancer]").val(returnValue(statementOrder.statement_balancer));
				
				// 银行卡
				if(isEmpty(statementOrder.statement_bankType) && isEmpty(statementOrder.statement_bankCard)){
					$("input[name=customer_bank]").val("--");
				} else {
					$("input[name=customer_bank]")
						.val(returnValue(statementOrder.statement_bankPerson) + returnValue(isEmpty(statementOrder.statement_bankCard)?'':' - ' + returnValue(statementOrder.statement_bankCard)) + " - " + returnValue(statementOrder.statement_bankType))
						.attr({
							"data-name" : returnValue(statementOrder.statement_bankPerson),
							"data-type" : returnValue(statementOrder.statement_bankType),
							"data-number" : returnValue(statementOrder.statement_bankCard)
						});
				}
			} else {
				if(!isEmpty(cancelContract)){
					// 合约备注
					$("#cco_applicationContent").text(returnValue(cancelContract.cco_applicationContent));
					
					var _type = returnValue(cancelContract.cco_applicationType);
					var _rent = returnNumber(contract.contractBody_Rent);
					switch (_type) {
						case "转租":
							_rent = _rent * 0.5;
							break;
						case "解约":
							_rent = 0;
							break;
						case "退租":
							_rent = _rent;
							break;
						case "强退":
							_rent = _rent;
							break;
						case "到期":
							_rent = 0;
							break;
						default :
							_rent = 0;
							break;
					}
					// 代理费
					$("[data-type=代理费]").find("[name=sci_unitPrice]").val(returnFloat(_rent));
					$("[data-type=代理费]").find("[name=sci_totalCosts]").val(returnFloat(_rent));
					$("[data-type=代理费]").find("[name=total-cost]").val(returnFloat(_rent));
					if(_type == "解约" || _type == "到期"){
						$("[data-type=代理费]").find("[name=sci_unitPrice]").attr("disabled","disabled");
						$("[data-type=代理费]").find("[name=sci_desc]").attr("disabled","disabled");
					}
				}
				// 结算人
				$("[name=statement_balancer]").val($.cookie("em_name"));
				
				// 银行卡
				if(!isEmpty(customer.customerBank)){
					$("input[name=customer_bank]")
						.val(returnValue(customer.customerBank.cbc_name) + returnValue(isEmpty(customer.customerBank.cbc_cardNum)?'':' - ' + customer.customerBank.cbc_cardNum) + " - " +returnValue(customer.customerBank.cbc_bankName))
						.attr({
							"data-name" : returnValue(customer.customerBank.cbc_name),
							"data-type" : returnValue(customer.customerBank.cbc_bankName),
							"data-number" : returnValue(customer.customerBank.cbc_cardNum)
						});
				} else {
					$("input[name=customer_bank]").val('--');
				}
			}

			// 【违约金结算】
			
			// 类型
			$("[name=rent_type]").val(returnValue(contract.contractBody_PayStyle) + returnValue(isEmpty(contract.contractBody_PayType)?"":" : " + contract.contractBody_PayType));
			// 租金
			var _contractBody_Rent = returnFloat(contract.contractBody_Rent);
			if(contract.contractObject_RentFreeMode == 1){
				_contractBody_Rent = returnFloat(_contractBody_Rent / 12);
			}
			$("[data-type=违约金]").find("[name=sci_unitPrice]").val(_contractBody_Rent);
			
			// 【消费结算】
			if(!isEmpty(result.data.statementCostItems)){
				$.each(result.data.statementCostItems, function(index, data){
					var _box;
					switch (data.sci_type) {
						case '代理费':// 【代理费结算】
							_box = $('[data-type='+ data.sci_type +']');
							
							_box.find(".cco_applicationType").text(data.sci_itemName);
							_box.find("input[name=sci_unitPrice]").val(data.sci_unitPrice);
							_box.find("input[name=sci_number]").val(data.sci_number);
							_box.find("input[name=sci_desc]").val(data.sci_desc);
							_box.find("input[name=sci_totalCosts]").val(returnFloat(data.sci_totalCosts));
							
							calTotalCost(_box.attr("data-type"));
							break;
						case '消费':// 【消费结算】
							_box = $('[data-type='+ data.sci_type +'][data-name='+ data.sci_itemName +']');
							_box.find("input[name=sci_number]").val(returnValue(data.sci_number));
							_box.find("input[name=sci_unitPrice]").val(returnValue(data.sci_unitPrice));
							_box.find("input[name=sci_penalty]").val(returnValue(data.sci_penalty));
							var _desc = returnValue(data.sci_desc);
							if(_desc.indexOf("#") > -1){
								var split = _desc.split("#");
								_box.find("input[name=sci_desc_q]").val(split[0]);
								if(mode == "out"){
									_box.find("input[name=sci_desc_z]").val(split[1]);
								}
							} else {
								_box.find("input[name=sci_desc]").val(_desc);
							}
							_box.find("input[name=sci_totalCosts]").val(returnFloat(data.sci_totalCosts));
							
							calCost2(_box.attr("data-type"), _box.attr("data-name"));
							//calTotalCost(_box.attr("data-type"));
							break;
						case '违约金':// 【违约金结算】
							_box = $("[data-type="+ data.sci_type +"][data-name="+ data.sci_itemName +"]");
							_box.find("input[name=sci_unitPrice]").val(returnFloat(data.sci_unitPrice));
							_box.find("input[name=sci_number]").val(returnFloat(data.sci_number));
							_box.find("input[name=sci_desc]").val(returnValue(data.sci_desc));
							_box.find("input[name=sci_totalCosts]").val(returnFloat(data.sci_totalCosts));
							
							calTotalCost(_box.attr("data-type"));
							break;
					}
				});

                // 【初始化能源信息】
                if(!isEmpty(cardValueList)){
                    $.each(cardValueList, function(index, data){
                        var _box = $("[data-type=消费][data-name="+ data.hpec_type +"]");
                        if(mode == "in"){
                            _box.find("input[name=sci_desc_z]").val(data.hpv_start);
                        }
                        if(mode == "out"){
                            _box.find("input[name=sci_desc_z]").val(data.hpv_end);
                        }
                    });
                }
			} else {
				// 【初始化能源信息】
				if(!isEmpty(cardValueList)){
					$.each(cardValueList, function(index, data){
						var _box = $("[data-type=消费][data-name="+ data.hpec_type +"]");
						if(mode == "in"){
							// _box.find("input[name=sci_desc_q]").val(data.hpv_start);
							_box.find("input[name=sci_desc_z]").val(data.hpv_start);
							// 计算
							calCost2(_box.attr("data-type"), _box.attr("data-name"));
						} else {
							_box.find("input[name=sci_desc_z]").val(data.hpv_end);
						}
					});
				}
			}
			// 【初始化能源卡】
			if(!isEmpty(energyCardList)){
				$.each(energyCardList, function(index, data){
					var _box = $("[data-type=消费][data-name="+ data.hpec_type +"]");
					_box.find("input[name=sci_card]").val(returnValue(data.hpec_newNumber));
				});
			}

			// 【物品结算】
			if(!isEmpty(result.data.statementDamageItems)){
				$.each(result.data.statementDamageItems, function(index, data){
					var _box = $("[data-type=物品][data-name="+ data.sdi_type +"]");
					var lists = data.sdi_list.split(";");
					if(!isEmpty(lists)){
						$.each(lists, function(index, data){
							var subs = data.split("#");
							if(!isEmpty(subs)){
								var html = '';
								html += '<div class="cost-add-list" style="text-align: left;">';
								html += '	<span class="cost-add-list-icon icon-minus-sign" onclick="removeCostItems(this)" data- title="移除"></span>';
								html += '	<div class="cost-add-list-content">';
								html += '		<span><label>名称</label><input type="text" name="add-list-name" value="'+ returnValue(subs[0]) +'" placeholder="名称" required></span>';
								html += '		<span><label>费用</label><input type="text" class="minusNumber" name="add-list-cost" value="'+ returnValue(subs[1]) +'" maxlength="11" placeholder="费用" required></span>';
								html += '	</div>';
								html += '</div>';
								_box.find(".cost-add-box").before(html);
							}
						});
					}
					_box.find("[name=sdi_remark]").val(returnValue(data.sdi_desc));
					_box.find("input[name=sci_totalCosts]").val(returnFloat(data.sdi_cost));
					$("#statement_goods").val(returnNumber($("#statement_goods").val()) + returnFloat(data.sdi_cost));
				});
			}
			
			// 修改银行卡信息
			$("#edit-customer-bank").click(function(){
				var _this = $(this);
				$(this).editCustomerModel({
					data : _this.data("customer"),
					result : function(_data){
						$("[name=customer_bank]")
							.val(returnValue(_data.cbc_name) + " - " + returnValue(_data.cbc_cardNum) + " - " + returnValue(_data.cbc_bankName))
							.attr({
								"data-name" : returnValue(_data.cbc_name),
								"data-type" : returnValue(_data.cbc_bankName),
								"data-number" : returnValue(_data.cbc_cardNum)
							});
					}
				});
			});
			
			// 搬移数据
			moveBalabceCost();
			
			$("#box-content-prop").perfectScrollbar();
		}
	}).always(function(){
		$(".loading-mark").fadeOut();
		setTimeout(function(){
			$(".loading-mark").remove();
		},400);
	});
}

/** 初始化方法*/
function initFunction(){
	
	// 费用结余计算
	$("input[name=csb_credit],input[name=csb_debit]").change(function(){
		calBalanceCost();
	});
	
	// 
	$("input[name=sci_desc_q],input[name=sci_desc_z],input[name=sci_unitPrice],input[name=sci_penalty],input[name=sci_number]").change(function(){
		var _box = $(this).parents("tr");
		calCost2(_box.attr("data-type"), _box.attr("data-name"));
	});
	
	// 代理费结算
	$("[data-type=代理费][data-name=费用]").find("[name=sci_unitPrice]").change(function(){
		$("[data-type=代理费]").find("input[name=sci_totalCosts]").val(returnFloat($(this).val()));
		$("[data-type=代理费]").find("input[name=total-cost]").val(returnFloat($(this).val()));
		moveBalabceCost();
	});
	
	// 结算人选择
	$("[name=statement_balancer]").on("click", function(){
		$(this).openModel({
			title : "管家信息",
			target : {
				name : "statement_balancer"
			}
		});
	});
	
}
// ***************** //

/** 添加费用项目*/
function addCostItems(obj){
	var _this = $(obj);
	if(_this.next().is(".cost-add-box-content")){
		$(".cost-add-box-content").remove();
	} else {
		$(".cost-add-box-content").remove();
		var html ='';
		html += '<div class="cost-add-box-content">';
		html += '	<span><label>名称</label><input type="text" name="add-box-name" placeholder="名称" required></span>';
		html += '	<span><label>费用</label><input type="text" class="minusNumber" name="add-box-cost" maxlength="11" placeholder="费用" required></span>';
		html += '	<button onclick="submitCostItems(this)">添加</button>';
		html += '</div>';
		_this.after(html);
		$("input[name=add-box-name]").select();
		window.event.stopPropagation();
		
		$("input[name=add-box-name],input[name=add-box-cost]").on("keyup", function(e){
			if(e.keyCode == 13){
				submitCostItems(_this);
			}
		});
		$(".cost-add-box-content").on("click", function(e){
			e.stopPropagation();
		});
		$(document).click(function(){
			$(".cost-add-box-content").remove();
		});
	}
}

/** 确认添加费用项目*/
function submitCostItems(obj){
	var _this = $(obj);
	var _name = $("input[name=add-box-name]").val();
	if(isEmpty(_name)){
		$("input[name=add-box-name]").msg("名称不能为空");
		return;
	}
	var _cost = $("input[name=add-box-cost]").val();
	if(isEmpty(_cost)){
		$("input[name=add-box-cost]").msg("费用不能为空");
		return;
	}
	var html = '';
	html += '<div class="cost-add-list" style="text-align: left;">';
	html += '	<span class="cost-add-list-icon icon-minus-sign" onclick="removeCostItems(this)" data- title="移除"></span>';
	html += '	<div class="cost-add-list-content">';
	html += '		<span><label>名称</label><input type="text" name="add-list-name" value="'+ returnValue(_name) +'" placeholder="名称" required></span>';
	html += '		<span><label>费用</label><input type="text" class="money" name="add-list-cost" value="'+ returnValue(_cost) +'" maxlength="11" placeholder="费用" required></span>';
	html += '	</div>';
	html += '</div>';
	_this.parents(".cost-add-box").before(html);
	$("input[name=add-box-name],input[name=add-box-cost]").val("");
	$("input[name=add-box-name]").select();
	
	var _type = _this.parents("tr").attr("data-type");
	var _name = _this.parents("tr").attr("data-name");
	calCost(_type, _name);
}

/** 移除费用项目*/
function removeCostItems(obj){
	var _this = $(obj);
	var _type = _this.parents("tr").attr("data-type");
	var _name = _this.parents("tr").attr("data-name");
	
	_this.parents(".cost-add-list").remove();
	calCost(_type, _name);
}

/** 小计1*/
function calCost(_type, name){
	var _box = $("[data-type="+ _type +"][data-name="+ name +"]");
	
	var _total = 0;
	_box.find(".cost-add-list-content").each(function(){
		_total += returnFloat($(this).find("input[name=add-list-cost]").val());
	});
	_box.find("input[name=sci_totalCosts]").val(returnFloat(_total));
	calTotalCost(_type);
}

/** 小计2*/
function calCost2(_type, name){
	var _box = $("[data-type="+ _type +"][data-name="+ name +"]");
	
	var _total = 0;
	if(_box.find("input[name=sci_desc_q]").length > 0){
		var _q = returnNumber(_box.find("input[name=sci_desc_q]").val());
		var _z = returnNumber(_box.find("input[name=sci_desc_z]").val());
		_box.find("input[name=sci_number]").val(_z - _q);
	}
	var _sci_unitPrice = returnFloat(_box.find("input[name=sci_unitPrice]").val());
	var _sci_number = returnFloat(_box.find("input[name=sci_number]").val());
	var _sci_penalty = returnFloat(_box.find("input[name=sci_penalty]").val());
	if(_type == "违约金"){
		_box.find("input[name=sci_totalCosts]").val(returnFloat(_sci_unitPrice * (_sci_number/100) + _sci_penalty));
	} else {
		_box.find("input[name=sci_totalCosts]").val(returnFloat(_sci_unitPrice * _sci_number + _sci_penalty));
	}
	calTotalCost(_type);
}

/** 合计*/
function calTotalCost(_type){
	var _box = $("[data-type="+ _type +"]");
	
	var _total = 0;
	_box.find("input[name=sci_totalCosts]").each(function(){
		_total += returnFloat($(this).val());
	});
	_box.find("input[name=total-cost]").val(returnFloat(_total));
	moveBalabceCost();
}

/** 移植结余费用*/
function moveBalabceCost(){
	
	// 公司应收：credit、公司应付： debit
	if(mode == "in"){
		if(conType == "托管合同"){ // 应收
			// 代理费
			$("#statement_agent_credit").val(returnFloat($("#statement_agent").val()));
			// 消费
			$("#statement_costs_credit").val(returnFloat($("#statement_costs").val()));
			// 物品
			$("#statement_goods_credit").val(returnFloat($("#statement_goods").val()));
			// 违约金
			$("#statement_penalty_credit").val(returnFloat($("#statement_penalty").val()));
			// 其他
			$("#statement_other_credit").val();
			// 预交租金
			$("#statement_rent_credit").val();
			// 押金
			$("#statement_deposit_credit").val();
		}
		if(conType == "租赁合同"){// 应付
			// 代理费
			$("#statement_agent_debit").val(returnFloat($("#statement_agent").val()));
			// 消费
			$("#statement_costs_debit").val(returnFloat($("#statement_costs").val()));
			// 物品
			$("#statement_goods_debit").val(returnFloat($("#statement_goods").val()));
			// 违约金
			$("#statement_penalty_debit").val(returnFloat($("#statement_penalty").val()));
			// 其他
			$("#statement_other_debit").val();
			// 预交租金
			$("#statement_rent_debit").val();
			// 押金
			$("#statement_deposit_debit").val();
		}
	}
	if(mode == "out"){
		if(conType == "托管合同"){ // 应付
			// 代理费
			$("#statement_agent_debit").val(returnFloat($("#statement_agent").val()));
			// 消费
			$("#statement_costs_debit").val(returnFloat($("#statement_costs").val()));
			// 物品
			$("#statement_goods_debit").val(returnFloat($("#statement_goods").val()));
			// 违约金
			$("#statement_penalty_debit").val(returnFloat($("#statement_penalty").val()));
			// 其他
			$("#statement_other_debit").val();
			// 预交租金
			$("#statement_rent_debit").val();
			// 押金
			$("#statement_deposit_debit").val();
		}
		if(conType == "租赁合同"){// 应收
			// 代理费
			$("#statement_agent_credit").val(returnFloat($("#statement_agent").val()));
			// 消费
			$("#statement_costs_credit").val(returnFloat($("#statement_costs").val()));
			// 物品
			$("#statement_goods_credit").val(returnFloat($("#statement_goods").val()));
			// 违约金
			$("#statement_penalty_credit").val(returnFloat($("#statement_penalty").val()));
			// 其他
			$("#statement_other_credit").val();
			// 预交租金
			$("#statement_rent_credit").val();
			// 押金
			$("#statement_deposit_credit").val();
		}
	}
	calBalanceCost();
}

/** 计算结余费用*/
function calBalanceCost(){
	var _agent, _costs, _goods, _penalty, _other, _rent, _deposit;
	
	// 公司应收：credit、公司应付： debit
	_agent = returnFloat($("#statement_agent_debit:visible").val()) - returnFloat($("#statement_agent_credit:visible").val()); 
	_costs = returnFloat($("#statement_costs_debit:visible").val()) - returnFloat($("#statement_costs_credit:visible").val()); 
	_goods = returnFloat($("#statement_goods_debit:visible").val()) - returnFloat($("#statement_goods_credit:visible").val()); 
	_penalty = returnFloat($("#statement_penalty_debit:visible").val()) - returnFloat($("#statement_penalty_credit:visible").val()); 
	_other = returnFloat($("#statement_other_debit:visible").val()) - returnFloat($("#statement_other_credit:visible").val()); 
	_rent = returnFloat($("#statement_rent_debit:visible").val()) - returnFloat($("#statement_rent_credit:visible").val()); 
	_deposit = returnFloat($("#statement_deposit_debit:visible").val()) - returnFloat($("#statement_deposit_credit:visible").val());
	
	var _total = returnFloat(_agent + _costs + _goods + _penalty + _other + _rent + _deposit);
	var html = "";
	if(conType == "托管合同"){
		html += '<label class="money-hint">公司'+ (_total >= 0?'应付业主':'应收业主') + Math.abs(returnFloat(_total)) + '元</label>';
	}
	if(conType == "租赁合同"){
		html += '<label class="money-hint">公司'+ (_total >= 0?'应付租客':'应收租客') + Math.abs(returnFloat(_total)) + '元</label>';
	}
	html += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;大写：<label class=\''+ ((_total < 0) ? "error" : "") +'\' style="font-weight: bold;">'+ returnToUpperMoney(_total) +'</label>';
	html += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;小写：<label class=\''+ ((_total < 0) ? "error" : "") +'\' style="font-weight: bold;">'+ _total +'</label>';
	$("#statement_balance_box").html(html);
	$("#statement_balance").val(_total);
}

//***************** //

/** 提交合同结算单*/
function submitContractStatement(){
	var boo = true;
	$("input[required]:visible,textarea[required]:visible").each(function(){
		if(isEmpty($(this).val())){
			$(this).msg("该数据不能为空");
			boo = false;
			return false;
		}
	});
	if(!boo) return;
	
	var data = {};
	data.mode = mode;
	
	// 结算单
	var statement ={};
	statement.statement_code = returnValue(statement_code);
	statement.contractObject_code = returnValue(con_code);
	statement.cco_code = returnValue(cco_code);
	statement.statement_costs = $("#statement_costs").val();
	statement.statement_totalCost =$("#statement_penalty").val();
	statement.statement_agent =$("#statement_agent").val();
	statement.statement_penalty =$("#statement_penalty").val();
	statement.statement_balance =$("#statement_balance").val();
	statement.statement_bankPerson =$("[name=customer_bank]").attr("data-name");
	statement.statement_bankType =$("[name=customer_bank]").attr("data-type");
	statement.statement_bankCard =$("[name=customer_bank]").attr("data-number");
	statement.statement_balancer =$("[name=statement_balancer]").val();
	statement.statement_balanceTime =$("input[name=calCostDate]").val();
	statement.statement_remarks =$("#statement_remarks").val();
	statement.statement_handoverDate = $("input[name=cco_realDate]").val();
	var _src = "";
	$(".showboxImg").each(function(){
		_src += $(this).attr("data-url") + ";";
	});
	if(_src.length < 10){
		$("#submitContractStatement").msg("请上传结算单图片");
		return;
	}
	statement.statement_path = _src;
	data.statement = JSON.stringify(statement);
	
	// 【结算消费项目清单】
	var statementCostItemsList = new Array();
	
	// 【代理费】
	$("[data-type=代理费]:visible").each(function(){
		var _type = $(this).attr("data-type");
		var _name = $(this).attr("data-name");
		if(isEmpty(_name)){
			return;
		}
		var statementCostItems ={};
		statementCostItems.sci_type = _type;
		statementCostItems.sci_itemName = $(this).find(".cco_applicationType").text();
		statementCostItems.sci_unitPrice = $(this).find("input[name=sci_unitPrice]").val();
		statementCostItems.sci_desc = $(this).find("input[name=sci_desc]").val();
		statementCostItems.sci_totalCosts = $(this).find("input[name=sci_totalCosts]").val();
		statementCostItemsList.push(statementCostItems);
	});
	
	// 【消费】
	$("[data-type=消费]:visible").each(function(){
		var _type = $(this).attr("data-type");
		var _name = $(this).attr("data-name");
		if(isEmpty(_name)){
			return;
		}
		
		var statementCostItems ={};
		statementCostItems.sci_type = _type;
		statementCostItems.sci_itemName = _name;
		statementCostItems.sci_unitPrice = $(this).find("input[name=sci_unitPrice]").val();
		statementCostItems.sci_number = $(this).find("input[name=sci_number]").val();
		statementCostItems.sci_penalty = $(this).find("input[name=sci_penalty]").val();
		
		var _q = returnFloat($(this).find("input[name=sci_desc_q]").val());
		var _z = returnFloat($(this).find("input[name=sci_desc_z]").val());
		var _desc = returnValue($(this).find("input[name=sci_desc]").val());
		var _qz = _q + _z;
		statementCostItems.sci_desc = isEmpty(_qz) ? _desc : (_q + "#" + _z);
		statementCostItems.sci_totalCosts = $(this).find("input[name=sci_totalCosts]").val();
		statementCostItemsList.push(statementCostItems);
	});
	
	// 违约金
	$("[data-type=违约金]:visible").each(function(){
		var _type = $(this).attr("data-type");
		var _name = $(this).attr("data-name");
		if(isEmpty(_name)){
			return;
		}
		var statementCostItems ={};
		statementCostItems.sci_type = _type;
		statementCostItems.sci_itemName = _name;
		statementCostItems.sci_unitPrice = returnFloat($(this).find("input[name=sci_unitPrice]").val());
		statementCostItems.sci_number = returnFloat($(this).find("input[name=sci_number]").val());
		statementCostItems.sci_desc = $(this).find("input[name=sci_desc]").val();
		statementCostItems.sci_totalCosts = $(this).find("input[name=sci_totalCosts]").val();
		statementCostItemsList.push(statementCostItems);
	});
	data.statementCostItemsList = JSON.stringify(statementCostItemsList);
	
	// 【物品结算】
	var statementDamageItemsList = new Array();
	$("[data-type=物品]:visible").each(function(){
		var _name = $(this).attr("data-name");
		if(isEmpty(_name)){
			return;
		}
		var _list = "";
		$(this).find(".cost-add-list-content").each(function(){
			_list += returnValue($(this).find("input[name=add-list-name]").val()) + '#' + returnValue($(this).find("input[name=add-list-cost]").val()) + ';';
		});

		var statementDamageItems ={};
		statementDamageItems.sdi_type = _name;
		statementDamageItems.sdi_list = _list;
		statementDamageItems.sdi_desc = $(this).find("[name=sdi_remark]").val();
		statementDamageItems.sdi_cost = $(this).find("input[name=sci_totalCosts]").val();
		statementDamageItemsList.push(statementDamageItems);
	});
	data.statementDamageItemsList = JSON.stringify(statementDamageItemsList);
	
	// 【消费结余】
	var statementBalanceList = new Array();
	$("[data-type=结余]:visible").each(function(){
		var _name = $(this).attr("data-name");
		if(isEmpty(_name)){
			return;
		}
		var statementBalance = {};
		statementBalance.csb_type = _name;
		statementBalance.csb_credit = $(this).find("input[name=csb_credit]").val();
		statementBalance.csb_debit = $(this).find("input[name=csb_debit]").val();
		statementBalance.csb_desc = $(this).find("input[name=csb_desc]").val();
		statementBalanceList.push(statementBalance);
	});
	data.statementBalanceList = JSON.stringify(statementBalanceList);
	
	var confirm_title = '确定提交吗？';
	if (getUrlParam("mode") == "out") {
		confirm_title = "确定提交吗？<br>提交后需要主管复审，请及时通知主管处理";
	}
	$.jBox.confirm(confirm_title, "提示", function (v, h, f) {
	    if (v == 'ok') {
	    	// 提交
	    	$.ajax({
	    		type : "POST",
	    		url : "/contractObject/addContractStatement",
	    		data : JSON.stringify(data),
	    		dataType : "json",
	    		contentType: "application/json; charset=utf-8",
	    		beforeSend : function(){
	    			$.jBox.tip("数据提交中...", 'loading');
	    		}
	    	}).done(function(result){
	    		if(result.code != 200){
	    			$.jBox.tip(result.msg, "error");
	    			return;
	    		}
	    		cco_code = result.data;
	    		if(mode == "in"){
	    			$.jBox.closeTip();
	    			saveSuccess1();
	    		} else {
	    			$.jBox.tip("提交成功", "success");
	    			window.parent.titleClose(window.frameElement.id.replace("iframepage",""), null, '1');
	    		}
	    	});
	    }
	    return true;
	});
}

/*===============================================*/

/** 更新自定义滚动条*/
function updateScrollbar(){
	$("#menu-dl-box").perfectScrollbar('update');
	$("#menu-dl-list").perfectScrollbar('update');
}

/** 计算费用 */
function calCost1(obj) {
	var _this = $(obj);
	var parent = _this.parent().parent().parent();
	var cs_unitPrice = returnFloat(parent.find(".cs_unitPrice").val());
	var cs_value = 1
	if (parent.find(".cs_value").length > 0) {
		cs_value = returnFloat(parent.find(".cs_value").val());
	}
	var cs_penalty = returnFloat(parent.find(".cs_penalty").val());
	parent.find(".cs_total").val(((cs_value * cs_unitPrice) + cs_penalty));
	calxfCost();
}

/**计算损坏费用*/
function calBadItemCost(){
	var tatal = 0;
	$("#menu-dl-list>.menu-content").each(function(){
		tatal += returnFloat($(this).find(".pc_cost").val());
	});
	$("#bad-item-cost").val(tatal);
	calxfCost();
}

/** 计算消费费用*/
function calxfCost(){
	var total = 0;
	$("#costItemList").find(".cs_total").each(function(){
		total += returnFloat($(this).val());
	});
	$("#cs_totalAll").val(total+returnFloat($("#bad-item-cost").val()));
	calAllCost();
}

/** 计算应收金额*/
function calAllCost(){
	var parent = $("#should_get");
	var cs_unitPrice = 0;
	parent.find(".cs_unitPrice").each(function(){
		cs_unitPrice +=returnFloat($(this).val());
	});
	parent.find(".cs_total").val((cs_unitPrice));
	realCost();
	$("#cost-yf").text($("#contractPay").val());
	$("#cost-ys").text($("#allTotalMoney").val());
}

/** 计算实收金额*/
function realCost(){
	$("#show-totalMoney").val((returnFloat($("#contractPay").val()) - returnFloat($("#allTotalMoney").val())));
}

/** 页面跳转*/
function functionIfram(href,title,parentTile){
	window.parent.href_mo(href, title, parentTile);
}

/** 添加物品*/
function addItemToList(obj){
	var _this =$(obj);
	var _parent=_this.parent();
	var ps_id=_parent.find(".ps_id").val();
	var span=_parent.find("span");
	$("#menu-dl-list").find(".ins-dw").before(
		'<dt class="menu-content" style="border-bottom: 1px solid #ddd;background:'+ _parent.css("background") +'">' +
			'<input type="hidden" class="ps_id" value="'+ ps_id +'">' +
			'<input type="hidden" class="ps_item" value="'+ span.eq(1).text() +'">' +
			'<input type="hidden" class="ps_item" value="'+ span.eq(3).text() +'">' +
			'<span style="width:10%">'+ span.eq(0).html() +'</span>' +
			'<span style="width:15%">'+ span.eq(2).text() +'</span>' +
			'<span style="width:8%">'+ span.eq(4).text() +'</span>' +
			'<span style="width:10%"><label class="check-item '+ (returnNumber(span.eq(5).attr("data-value"))==0?'check-item-well':'check-item-old') +'"><input type="checkbox" class="ps_on" onclick="changeCheckItem(this)" data-cache="'+ span.eq(5).attr("data-value") +'" data-cache-name="'+ span.eq(5).text() +'" data-type="on" value="'+ span.eq(5).attr("data-value") +'" '+ (returnNumber(span.eq(5).attr("data-value"))==0?'checked':'') +'><span>'+ span.eq(5).text() +'</span></label></span>' +
			'<span style="width:10%"><label class="check-item '+ (returnNumber(span.eq(6).attr("data-value"))==0?'check-item-well':'check-item-bad') +'"><input type="checkbox" class="ps_gb" onclick="changeCheckItem(this)" data-cache="'+ span.eq(6).attr("data-value") +'" data-cache-name="'+ span.eq(6).text() +'" data-type="gb" value="'+ span.eq(6).attr("data-value") +'" '+ (returnNumber(span.eq(6).attr("data-value"))==0?'checked':'') +'><span>'+ span.eq(6).text() +'</span></label></span>' +
			'<span style="width:20%"><input type="text" class="pc_cost money" maxlength="7" onkeyup="calBadItemCost()"></span>' +
			'<span style="width:auto"><input type="text" class="pc_ramark" maxlength="50"></span>' +
			'<span style="width:34px;font-size: 18px;color: #E74C3C;" class="icon-remove" onclick="removeItem(this)"></span>' +
		'</dt>');
	number();
	_parent.remove();
	updateScrollbar();
}

/**移除物品*/
function removeItem(obj){
	var _this =$(obj);
	var _parent=_this.parent();
	var ps_id=_parent.find(".ps_id").val();
	var span=_this.siblings("span");
	var ps_item=_this.siblings(".ps_item");
	$("#menu-dl-box").find(".ins-dw").before(
			'<dd class="menu-content" style="background:'+ _parent.css("background") +'">' +
				'<input type="hidden" class="ps_id" value="'+ ps_id +'">' +
				'<span style="width:15%">'+ span.eq(0).html() +'</span>' +
				'<span style="width:15%">'+ ps_item.eq(0).val() +'</span>' +
				'<span style="width:15%">'+ span.eq(1).text() +'</span>' +
				'<span style="width:15%">'+ ps_item.eq(1).val() +'</span>' +
				'<span style="width:10%">'+ span.eq(2).text() +'</span>' +
				'<span style="width:10%" data-value="'+ span.eq(3).find(".ps_on").attr("data-cache") +'">'+ span.eq(3).find(".ps_on").attr("data-cache-name") +'</span>' +
				'<span style="width:10%" data-value="'+ span.eq(4).find(".ps_gb").attr("data-cache") +'">'+ span.eq(4).find(".ps_gb").attr("data-cache-name") +'</span>' +
				'<span style="width:10%;font-size: 18px;color: #1ABC9C" class="icon-plus" title="添加" onclick="addItemToList(this)"></span>' +
			'</dd>');
	_parent.remove();
	updateScrollbar();
	calBadItemCost();
}

/** 改变选项*/
function changeCheckItem(obj){
	var _this =$(obj);
	var _type =_this.attr("data-type");
	var _parent =_this.parent();
	var _well ="check-item-well";
	var _old ="check-item-old";
	var _bad ="check-item-bad";
	_parent.removeClass(_well)
		   .removeClass(_old)
		   .removeClass(_bad);
	if(_this.is(":checked")){
		if(_type =="on"){
			_parent.addClass(_well);
			_parent.find("span").text("新");
			_this.val(0);
		}
		if(_type =="gb"){
			_parent.addClass(_well);
			_parent.find("span").text("好");
			_this.val(0);
		}
	} else {
		if(_type =="on"){
			_parent.addClass(_old);
			_parent.find("span").text("旧");
			_this.val(1);
		}
		if(_type =="gb"){
			_parent.addClass(_bad);
			_parent.find("span").text("坏");
			_this.val(1);
		}
	}
}

/** 执行成功*/
function saveSuccess(){
	$(".box-content").hide();
	var html = '';
	html += '<div class="hint-title">保存成功</div>';
	html += '<div class="hint-content">';
	html += '	<a href="javascript:submitReview(this,\''+ cco_code +'\');" >提交审核</a>';
	html += '	<button onclick="submitContractAuditing(this,\''+ getQueryString("con_code") +'\')">提交审核</button>';
	html += '	<a href="/contractObject/jumpCancelContractList?mode=list" style="background: #ddd;">返回列表</a>';
	html += '</div>';
	$("#main-hint").html(html).fadeIn();
}

/** 保存成功*/
function saveSuccess1(){
	$(".box-content").hide();
	var html = '';
	html += '<div class="hint-title">保存成功</div>';
	html += '<div class="hint-content">';
	html += '	<a href="/contractObject/jumpItemAdd?con_code='+ getQueryString("con_code") +'">物品添置</a>';
	html += '	<button onclick="submitContractAuditing(this,\''+ getQueryString("con_code") +'\')">提交审核</button>';
	html += '	<a href="/contractObject/contractObjectList" style="background:#ddd;">返回列表</a>';
	html += '</div>';
	$("#main-hint").html(html).fadeIn();
}

/** 提交审核*/
function submitContractAuditing(obj, param){
	$.ajax({
		type : "POST",
		url : "/contractObject/submitContractAuditing",
		data : {
			con_code : param
		},
		dataType : "json",
		beforeSend : function(){
			$(obj).attr("disabled","disabled").text("提交中...");
		}
	}).done(function(result){
		switch (result.code) {
			case 200:
				$.jBox.success("提交成功", "提示", {
					closed : function(){
						window.location.href = "/contractObject/contractObjectList";
					}
				});
				break;
			default :
				$.jBox.tip(result.msg, "warning");
				break;
		}
		$(obj).removeAttr("disabled").text("提交审核");
	}).error(function(){
		window.location.href ="/contractObject/contractObjectList";
	});
}

/** 提交审核*/
function submitReview(obj, code){
	$.ajax({
		type : "POST",
		url : "/contractObject/submitOrderReview",
		data : {
			cco_code : code
		},
		dataType : "json",
		beforeSend : function(){
			$(obj).attr("disabled", "disabled");
			$.jBox.tip("数据提交中...", "loading");
		}
	}).done(function(result){
		if(result.code == 200){
			$.jBox.success("提交成功", "提示", {
				closed : function(){
					window.location.href ="/contractObject/jumpCancelContractList?mode=list";
				}
			});
		} else {
			$.jBox.tip(result.msg, "error");
		}
	}).alway(function(){
		$(obj).removeAttr("disabled");
	});
}
