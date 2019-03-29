$(function(){
	$.propertySettlement();
});
;(function(window,$){
	
	/** 费用结算*/
	$.propertySettlement = function(){
		$.propertySettlement.load_data();
		$.propertySettlement.load_event();
	};
	
	/** 参数*/
	$.propertySettlement.param = {
		con_code : getUrlParam("con_code"),
		mode : getUrlParam("mode"),
	};
	
	/** 加载数据*/
	$.propertySettlement.load_data = function(){
		$.ajax({
			url : '/contractObject/queryContractStatementInfo',
			data : {
				con_code : $.propertySettlement.param.con_code,
				mode : $.propertySettlement.param.mode
			},
			dataType : 'json',
		}).done(function(result){
			if(result.code != 200){
				return;
			}

			data = result.data;
			contract = data.contract;
			statementCostItems = data.statementCostItems || "";
			statementDamageItems = data.statementDamageItems || "";
			statementBalances = data.statementBalances || "";
			statementOrder = data.statementOrder || "";
			cardValueList = data.cardValueList || "";
			cancelContract = data.cancelContract || "";
			
			// 是否App
			var isApp = contract.contractObject_Source == "PHONE";
			
			if($.propertySettlement.param.mode == "in"){
				$("[data-type=违约金],[data-type=代理费]").hide();
				$("[name=statement_3]").parents(".content-item").hide();
				$("[name=statement_4]").parents(".content-item").hide();
				$("[name=statement_6]").parents(".content-item").hide();
				$("[name=statement_7]").parents(".content-item").hide();
			}
			if($.propertySettlement.param.mode == "out"){
				// 押金
				$("[name=statement_7]").val(-returnFloat(contract.contractBody_Pay));
				
				// 代理费
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
				$("#statement_dlf_title").html(_type + "费");
				$("[name=statement_dlf]").val(returnFloat(_rent));
				$.moneySubtotal("代理费");
			}
			
			// 房屋数据显示
			$("#house-address").html(returnValue(contract.house_address));
			$("#house-rent").html(returnFloat(contract.contractBody_Rent) + "元/月");
			$("#con-date").html(returnValue(contract.contractBody_StartTOEnd));
			$("#house-pay").html(returnFloat(contract.contractBody_Pay) + "元");
			$("#house-stw").html(returnNumber(contract.hi_houseS) + "室" + returnNumber(contract.hi_houseT) + "厅" + returnNumber(contract.hi_houseW) + "卫");
			
			var cardValues = {};
			$.each(cardValueList, function(index, data){
				cardValues[data.hpv_type] = returnNumber(data.hpv_start);
			});   
			
			// 消费结算
			if(!isEmpty(statementCostItems)){
				$.each(statementCostItems, function(index, data){
					if(data.sci_itemName == "水" || data.sci_itemName == "电" || data.sci_itemName == "气"){
						var sdq = $("[name=statement_sdq]");
						var itemData = sdq.data("data") || {};
						itemData[data.sci_itemName] = data;
						itemData[data.sci_itemName].sci_end = cardValues[data.sci_itemName];
						
						sdq.data("data", itemData);
						sdq.val(returnFloat(returnFloat($("[name=statement_sdq]").val()) + returnFloat(data.sci_totalCosts)));
					} else if(data.sci_itemName == "垃圾处理"){
						$("[name=statement_lj]").val(returnFloat(data.sci_totalCosts)).data("data", data);
					} else if(data.sci_itemName == "物管费"){
						$("[name=statement_wgf]").val(returnFloat(data.sci_totalCosts)).data("data", data);
					} else if(data.sci_itemName == "有线电视"){
						$("[name=statement_tv]").val(returnFloat(data.sci_totalCosts)).data("data", data);
					} else if(data.sci_itemName == "宽带"){
						$("[name=statement_kd]").val(returnFloat(data.sci_totalCosts)).data("data", data);
					} else if(data.sci_itemName == "租金"){
						$("[name=statement_rent]").val(returnFloat(data.sci_totalCosts)).data("data", data);
					} else if(data.sci_itemName == "其他"){
						$("[name=statement_other]").val(returnFloat(data.sci_totalCosts)).data("data", data);
					}
				});
			} else {
				$.each(cardValues, function(name, value){
					var sdq = $("[name=statement_sdq]");
					var itemData = sdq.data("data") || {};
					itemData[name] = {
						sci_itemName : name,
						sci_end : value
					};
					sdq.data("data", itemData);
				});
			}
			$.moneySubtotal("消费");
			
			// 物品结算
			$.each(statementDamageItems, function(index, data){
				if(data.sdi_type == "维修"){
					$("[name=statement_wx]").val(returnFloat(data.sdi_cost)).data("data", data);
				} else if(data.sdi_type == "赔偿"){
					$("[name=statement_pc]").val(returnFloat(data.sdi_cost)).data("data", data);
				} else if(data.sdi_type == "保洁"){
					$("[name=statement_bj]").val(returnFloat(data.sdi_cost)).data("data", data);
				} else if(data.sdi_type == "其他"){
					$("[name=statement_other2]").val(returnFloat(data.sdi_cost)).data("data", data);
				}
			});
			
			// 费用结余
//			$.each(statementBalances, function(index, data){
//				var csb_money = returnFloat(data.csb_credit) - returnFloat(data.csb_debit);
//				switch (data.csb_type) {
//					case 1:
//						$("[name=statement_1]").val(returnFloat(csb_money));
//						break;
//					case 2:
//						$("[name=statement_2]").val(returnFloat(csb_money));
//						break;
//					case 3:
//						$("[name=statement_3]").val(returnFloat(csb_money));
//						break;
//					case 4:
//						$("[name=statement_4]").val(returnFloat(csb_money));
//						break;
//					case 5:
//						$("[name=statement_5]").val(returnFloat(csb_money));
//						break;
//					case 6:
//						$("[name=statement_6]").val(returnFloat(csb_money));
//						break;
//					case 7:
//						$("[name=statement_7]").val(returnFloat(csb_money));
//						break;
//				}
//			});
			$.moneyTotal();
			
			// 招租订单不为空
			if(!isEmpty(cancelContract)){
				var cco_code = cancelContract.cco_code;
				$.propertySettlement.param.cco_code = cco_code;
			}
			
			// 其他信息|结算订单不为空
			$.propertySettlement.param.statement_code = statementOrder.statement_code;
			// 备注
			$("[name=statement_remarks]").val(returnValue(statementOrder.statement_remarks));
			// 结算人
			$("[name=statement_balancer]").val(returnValue(statementOrder.statement_balancer));
			// 结算日期
			$("[name=calCostDate]").val(returnDate(statementOrder.statement_balanceTime || new Date()));
			// 结算日期
			$("[name=statement_sign]").val(returnDate(statementOrder.statement_balanceTime || new Date()));
			// 结算签字
			$("#image-jsd-box").hide();
			$("#image-sign-box").hide();
			if(isApp){
				// $("#image-sign-box").show();
				if(!isEmpty(statementOrder.statement_sign)){
					$("[name=customer-qz]").parent().hide();
					$("#image-box-qz").html('<img id="statement_sign" src="data:image/png;base64,'+ statementOrder.statement_sign +'" style="width:100%;height:100%;">').show();
				} else {
					// 签字
					$("[name=customer-qz]").attr("data-code", statementOrder.statement_code);
					// 滚动到底部
					$(document).scrollTop($(document).height() - $(window).height());
				}
			} else {
				// $("#image-jsd-box").show();
				// // 结算单图片
				// $.each((statementOrder.statement_path || "").split(";"), function(index, data){
				// 	if(isEmpty(data)) return;
				// 	$.appImageUpload.addImage("#image-box-jsd", {
				// 		id : -1,
				// 		mode : "view",
				// 		type : "JSD",
				// 		blob : data,
				// 		path : data,
				// 	});
				// 	$("#image-box-jsd").show();
				// });
			}
		});
	};
	
	/** 加载事件*/
	$.propertySettlement.load_event = function(){

		// 图片预览
		mui.previewImage();
		
		// 结算签字
		$("[name=customer-qz]").on("click", function(){
			OCPropertySettlement.customerSign($(this).attr("data-code"));
		});
		
		// 显示更多房源信息
		$("#show-house-more").on("click", function(){
			var moreBox = $("#house-more");
			if(moreBox.is(":hidden")){
				moreBox.slideDown(300);
				$(this).find("[name=show-house-more]>i").removeClass("fa-angle-down").addClass("fa-angle-up");
			} else {
				moreBox.slideUp(200);
				$(this).find("[name=show-house-more]>i").removeClass("fa-angle-up").addClass("fa-angle-down");
			}
		});
		
		// 图片-结算单
		$.appImageUpload({
			id : "[name=imageJSD]",
			box : "#image-box-jsd",
			type : "JSD",
			mode : "view",
			limit : 3,
			done : function(mode, opts, fileData){
				$(opts.id).removeAttr("disabled").removeClass("disabled-bg").removeClass("next-bg");
				opts.fileCount >= opts.limit ? $(opts.id).attr("disabled", "disabled").addClass("disabled-bg") : $(opts.id).addClass("next-bg");
				opts.fileCount == 0 ? $(opts.box).hide() : $(opts.box).fadeIn();
				
				var type = "contract";
				switch (mode) {
					case "add" :
						$.appImageUpload.upload(opts, fileData, type);
						break;
					case "remove" :
						$.appImageUpload.remove(opts, fileData, type);
						break;
				}
			},
		});
	};
	
	/** 查看项*/ 
	$.openWPItem = function(obj){
		
	};
	
	/** 查看项*/ 
	$.openXFItem = function(obj){
		var mode = $(obj).attr("data-mode");
		var itemBox = $(obj).parents(".content-item");
		if(itemBox.find(".item-view").length > 0){
			itemBox.find(".item-view").remove();
			itemBox.find("[class^=fa-angle]").removeClass("fa-angle-down").addClass("fa-angle-right");
		} else {
			var html = '';
			html +='<div class="item-view">';
			var data = itemBox.find(".statement_xf").data("data");
			html +='	<div style="display:flex;line-height: 30px;border-top: 1px solid #f3f3f3;color: #adadad;">';
			if(mode == "水电气") html +='	    <div style="width:44px;text-align: center;">项目</div>';
			html +='	    <div style="flex:1;text-align: center;">消费量</div>';
			html +='	    <div style="flex:1;text-align: center;">单价</div>';
			html +='	    <div style="flex:1;text-align: center;">违约金</div>';
			html +='	    <div style="flex:1;text-align: center;">小计</div>';
			html +='	</div>';
			if(data == null) {
				html +='<div style="display:flex;line-height: 36px;border-top: 1px solid #f3f3f3;">';
				if(mode == "水电气") html +='    <div style="width:44px;text-align: center;">--</div>';
				html +='    <div style="flex:1;text-align: center;">--</div>';
				html +='    <div style="flex:1;text-align: center;">--</div>';
				html +='    <div style="flex:1;text-align: center;">--</div>';
				html +='    <div style="flex:1;text-align: center;">--</div>';
				html +='</div>';
			} else {
				if(mode == "水电气"){
					$.each(data, function(key, item){
						if(isEmpty(key)) return;
						html +='<div style="display:flex;line-height: 36px;border-top: 1px solid #f3f3f3;">';
						html +='    <div style="width:44px;text-align: center;">'+ returnValue(item.sci_itemName) +'</div>';
						html +='    <div style="flex:1;text-align: center;">'+ returnFloat(item.sci_number) +'</div>';
						html +='    <div style="flex:1;text-align: center;">'+ returnFloat(item.sci_unitPrice) +'</div>';
						html +='    <div style="flex:1;text-align: center;">'+ returnFloat(item.sci_penalty) +'</div>';
						html +='    <div class="error" style="flex:1;text-align: center;">'+ returnFloat(item.sci_totalCosts) +'</div>';
						html +='</div>';
					});
				} else {
					html +='<div style="display:flex;line-height: 36px;border-top: 1px solid #f3f3f3;">';
					html +='    <div style="flex:1;text-align: center;">'+ returnFloat(data.sci_number) +'</div>';
					html +='    <div style="flex:1;text-align: center;">'+ returnFloat(data.sci_unitPrice) +'</div>';
					html +='    <div style="flex:1;text-align: center;">'+ returnFloat(data.sci_penalty) +'</div>';
					html +='    <div class="error" style="flex:1;text-align: center;">'+ returnFloat(data.sci_totalCosts) +'</div>';
					html +='</div>';
				}
			}
			html +='</div>';
			itemBox.append(html);
			itemBox.find("[class^=fa-angle]").removeClass("fa-angle-right").addClass("fa-angle-down");
		}
	};
	
	/** 小计*/
	$.moneySubtotal = function(mode){
		var subtotal = 0; 
		switch (mode) {
			case "消费":
				$("main").find(".statement_xf").each(function(){
					subtotal += returnFloat($(this).val());
				});
				$("#statement_costs").html(returnFloat(subtotal));
				$("[name=statement_1]").val(returnFloat(subtotal));
				break;
			case "物品":
				$("main").find(".statement_wp").each(function(){
					subtotal += returnFloat($(this).val());
				});
				$("#statement_goods").html(returnFloat(subtotal));
				$("[name=statement_2]").val(returnFloat(subtotal));
				break;
			case "代理费":
				$("main").find(".statement_dlf").each(function(){
					subtotal += returnFloat($(this).val());
				});
				$("#statement_agent").html(returnFloat(subtotal));
				$("[name=statement_3]").val(returnFloat(subtotal));
				break;
			default :
				
				break;
		}
		$.moneyTotal();
	};
	
	/** 总计*/
	$.moneyTotal = function(){
		var total = 0;
		total += returnFloat($("[name=statement_1]").val());
		total += returnFloat($("[name=statement_2]").val());
		total += returnFloat($("[name=statement_3]").val());
		total += returnFloat($("[name=statement_4]").val());
		total += returnFloat($("[name=statement_5]").val());
		total += returnFloat($("[name=statement_6]").val());
		total += returnFloat($("[name=statement_7]").val());
		total = returnFloat(total);
		$("#statement_total").html(total);
		
		if($.propertySettlement.param.isTG){
			if($.propertySettlement.param.mode == "in"){
				if(total < 0){
					$("#money-dx").html("公司应支付房东"+ Math.abs(total) +"元");
				} else {
					$("#money-dx").html("公司应收取房东"+ Math.abs(total) +"元");
				}
			}
			if($.propertySettlement.param.mode == "out"){
				if(total < 0){
					$("#money-dx").html("公司应支付房东"+ Math.abs(total) +"元");
				} else {
					$("#money-dx").html("公司应收取房东"+ Math.abs(total) +"元");
				}
			}
		} else {
			if($.propertySettlement.param.mode == "in"){
				if(total < 0){
					$("#money-dx").html("公司应收取租客"+ Math.abs(total) +"元");
				} else {
					$("#money-dx").html("公司应支付租客"+ Math.abs(total) +"元");
				}
			}
			if($.propertySettlement.param.mode == "out"){
				if(total < 0){
					$("#money-dx").html("公司应支付租客"+ Math.abs(total) +"元");
				} else {
					$("#money-dx").html("公司应收取租客"+ Math.abs(total) +"元");
				}
			}
		}
	};
	
})(window,$);