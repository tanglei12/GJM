;(function($){
	
	/** 初始化*/
	$.contract = function(){
		$.contract.load_data();
		$.contract.load_event();
		
		// 图片上传
		uploadImage = $("#uploadImage").imageUpload({
			skin: "appImageBox",
			limitUpload: false,
			isTailor: false,
			success :function(box){
				box.find('.image-item-add').append('<span class="imagefont">上传照片</span>');
			},
			builds : {
				onUpload : function(img){
					var imgHtml = $("#uploadImage").html();
					if(null != imgHtml && "" != imgHtml){
						$(".tips").hide();
					}
					if($(".image-item img.image-item-img").length >= 3){
						$(".image-item-add").hide();
					}
					$("#imgCount").html("<font class='font-money'>"+$(".image-item img.image-item-img").length + "/3" + "</font>");
				},
				onDelete : function(path){
					setTimeout(function(){
						var imgHtml = $("#uploadImage").html();
						if(imgHtml.indexOf("<img") < 0){
							$(".tips").show();
						}
					}, 800);
					if($(".image-item img.image-item-img").length < 3){
						$(".image-item-add").show();
					}
					$("#imgCount").html("<font class='font-money'>"+$(".image-item img.image-item-img").length + "/3" + "</font>");
				}
			}
		});
		
		$("#imgCount").html("<font class='font-money'>"+$(".image-item img.image-item-img").length + "/3" + "</font>");
	};
	
	/** 参数*/
	$.contract.param = {
		mode : getUrlParam("mode"),
		con_code : getUrlParam("con_code"),
		em_id : getUrlParam("em_id")
	};
	
	/** 加载数据*/
	$.contract.load_data = function(){
		$.ajax({
			type : "POST",
			url : "/contractObject/queryCancelContract",
			data : {
				con_code : returnValue($.contract.param.con_code),
				mode : returnValue($.contract.param.mode),
				em_id : returnValue($.contract.param.em_id)
			},
			dataType : "json"
		}).done(function(result){
			switch (result.code) {
				case 200:
					// 【加载基本数据】
					$.contract.loadBaseData(result.data);
					$.contract.loadAuditingData(result.data);
					// 获取客户信息
					$.contract.queryCustomerInfo();
					break;
				default :
					break;
			}
			$.contract.initBind();
		});
	};
	
	/** 加载事件*/
	$.contract.load_event = function(){
		
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
	};
	
	/** 加载基本信息*/
	$.contract.loadBaseData = function(data){
		var contractVo = data.contractInfo;
		var contractCustomer = data.contractCustomer;
		
		// 【初始化变量】
		conType = contractVo.contractObject_Type;
		// 
		$("#house-address").html("<span>" + returnValue(contractVo.house_address) + "</span>");
		$("#house-rentLimit").html('<span style="min-width: 50%;width: 50%;">' + returnValue(contractVo.contractBody_StartTOEnd) + '（' + returnYearMonthDay(returnDate(contractVo.contractObject_Date), returnDate(contractVo.contractObject_DeadlineTime)) + '）</span>');
		$("#house-conRent").html('<span><i class="money-font20">' + returnMoney(contractVo.contractBody_Rent) + '</i>元/月（' + returnValue(contractVo.contractBody_PayStyle) + '）</span>');
		$("#house-conPay").html('<span><i class="money-font20">' + returnMoney(contractVo.contractBody_Pay) + '</i>元</span>');
	};

	/** 加载合约申请数据*/
	$.contract.loadAuditingData = function(data){
		var contractInfo = data.contractInfo,
			cancelContract = data.cancelContract,
			payTypeList = data.payTypeList,
			contractCustomer = data.contractCustomer;
			centerEmployee = data.centerEmployee;
		
		// 房屋地址
		$("#houseAddress")
			.val(contractInfo.house_address)
			.attr("data-code", contractInfo.hi_code);
		
		// 合约类型
		if(isEmpty(cancelContract)){ 
			var _dealDate =new Date(returnDate(contractInfo.contractObject_DeadlineTime)) 
			_dealDate = _dealDate.setFullYear(_dealDate.getFullYear(), _dealDate.getMonth(), _dealDate.getDate() - 30);
			if(_dealDate > new Date().getTime()){
				$("#heyueType option").eq(2).attr("disabled","disabled");
			}
			$("#curEmName").val(returnValue(centerEmployee.em_name));
			// 经办人
			$("#cco_peopleName").val(returnValue($("#curEmName").val()));
			// 经办日期
			$("#cco_createDate").val(returnDate(new Date()));
		} else {
			
			// 初始化变量
			cco_code = cancelContract.cco_code;
			$("#heyueType option").each(function(){
				var textV = $(this).val();
				if(cancelContract.cco_applicationType == textV){
					$(this).attr("selected","selected");
				}
			});

			if(!isEmpty(cancelContract.cco_path)){
				var paths = cancelContract.cco_path.split(";");
				// 意向图片
	  	    	var imgList = new Array();
	  	    	$(paths).each(function(index, data){
	  	    		if(data != "" && data != null && data != undefined){
	  	    			
	  	    			imgList.push(data);
	  	    		}
	  	    	});
	  	    	$("#imgCount").html("<font class='font-money'>"+imgList.length + "/3" + "</font>");
	  	    	uploadImage.push(imgList);
	  	    	// 若有图片则隐藏文字提示
	  	    	if(!$.isEmptyObject(imgList)){
	  	    		$(".tips").hide();
	  	    	}
			}
			// 业务日期
			$("#cco_handleDate").val(returnDate(cancelContract.cco_handleDate));
			// 业务费用
			$("#cco_subletCost").val(returnFloat(cancelContract.cco_subletCost));
			// 申请内容
			$("#cco_applicationContent").html(returnValue(cancelContract.cco_applicationContent));
			// 经办人
			$("#cco_peopleName").val(returnValue(cancelContract.cco_peopleName));
			// 经办日期
			$("#cco_createDate").val(returnDate(cancelContract.cco_applicationTime));
			
			$("#applySubmit").text("修改");
		}
		$("#cco_subletCost").attr("data-rent", returnNumber(contractInfo.contractBody_Rent));
		
		// ======【客户】======
		
		// 客户姓名
		$("#cco_applicant").val(returnValue(contractCustomer.cc_name));
		// 客户手机
//		$("#cco_phone").val(returnValue(contractCustomer.ccp_phone));
		if(!isEmpty(contractCustomer.customerBank)){
			// 客户开户行
			$("#cco_bank").val(returnValue(contractCustomer.customerBank.cbc_bankName));
			// 银行卡号
			$("#cco_bankCard").val(returnValue(contractCustomer.customerBank.cbc_cardNum));
		}
		
		$.contract.changeCancelType($("#heyueType"));
		
		// 初始化日期插件
		$("#cco_handleDate").on("focus", function(){
			var _max = new Date(contractInfo.contractObject_DeadlineTime);
			_max.setMonth(_max.getMonth() + 1);
		});
	};
	
	/** 初始化绑定事件*/
	$.contract.initBind = function(){
		
		// 合约类型	
		$("#heyueType").on("change", function(){
			$.contract.changeCancelType($(this));
		});
		
		// 业务申请人添加
		$("#cco_applicant").on("change", function(){
			if($(this).val() == -1){
//				$("#applyPerson").show();
				$("#add-customer").fadeIn();
				$("#add-customer").css({"display" : "flex"});
			} else {
				$("#add-customer").hide();
			}
		});
		
		// 绑定客户信息
		$("#customer-btn").on("click", function(){
			var _this = $(this);
			var _cus_id = returnValue($("input[name=customer-id]").val());
			if(isEmpty(_cus_id)){
				$.jBox.tip("请选择一个客户进行绑定", "warning");
				return;
			}
			$.ajax({
				type : "POST",
				url : "/contractObject/bindCustomerRelaInfo",
				data : {
					con_code : con_code,
					cus_id : _cus_id
				},
				dataType : "json",
				beforeSend : function(){
					_this.attr("disabled","disabled");
					$.jBox.tip("客户绑定中","loading");
				}
			}).done(function(result){
				if(result.code == 200){
					$.jBox.tip("客户绑定成功","success");
					
					$("#add-customer").hide();
					$("#add-customer").find("input[name=customer-id]").val("");
					$("#add-customer").find("input[name=customer-name]").val("");
					
					$.contract.queryCustomerInfo(_cus_id);
				} else {
					$.jBox.tip(result.msg,"error");
				}
			}).always(function(){
				_this.removeAttr("disabled").text("绑定");
			});
		});
		
	};
	
	/** 服务费用计算*/
	$.contract.changeCancelType = function(obj){
		var _type = obj.val();
		var _rent =returnNumber($("#cco_subletCost").attr("data-rent"));
		$("#applyPerson").fadeIn();
		switch (_type) {
			case "解约":
				$("#cco_subletCost").val(returnFloat(_rent * 12 * 0.2)).removeAttr("readonly");
				break;
			case "转租":
				$("#cco_subletCost").val(returnFloat(_rent * 1 * 0.5)).removeAttr("readonly");
				break;
			case "退租":
				_type = '强退';
				$("#cco_subletCost").val(returnFloat(_rent)).removeAttr("readonly");
				break;
			case "强收":
				$("#applyPerson").hide();
				$("#cco_subletCost").val(0).attr("readonly","readonly");
				break;
			case "换房":
				$("#cco_subletCost").val(returnFloat(_rent * 1 * 0.5)).removeAttr("readonly");
				break;
			case "到期":
				$("#cco_subletCost").val(0).attr("readonly","readonly");
				break;
		}
		$("#servicePay").html(_type + "费用" + "<em>*</em>");
		$("#descption").html(_type + "说明" + "<em>*</em>");
	};
	
	/** 查询客户信息*/
	$.contract.queryCustomerInfo = function(id){
		$.ajax({
			type : "POST",
			url : "/contractObject/queryCustomerInfo",
			data : {
				con_code : returnValue($.contract.param.con_code)
			},
			dataType : "json"
		}).done(function(result){
			switch (result.code) {
				case 200:
					var data = result.data;
					if(!isEmpty(data)){
						$("#cco_applicant").html("");
						$.each(data, function(index, data){
							var role = "";
							if(conType == "托管合同"){
								switch (data.crc_role) {
									case 0:
										role = "房东";
										break;
									case 1:
										role = "联系人";
										break;
								}
							}
							if(conType == "租赁合同"){
								switch (data.crc_role) {
									case 0:
										role = "租客";
										break;
									case 1:
										role = "室友";
										break;
								}
							}
							$("#cco_applicant").append('<option value="'+ data.cc_id +'" '+ (returnNumber(id) == data.cc_id?"selected":"") +'>'+ role +' - '+ returnValue(data.cc_name) +' - '+ returnValue(data.ccp_phone) +'</option>');
						});
//						$("#cco_applicant").append('<option value="-1">添加</option>');
					}
					break;
				default :
					break;
			}
		});
	};
	
	/** 提交解约申请*/
	$.contract.applySubmit = function(){
		var isOk = true; 
		$(".form-control[required]:visible").each(function(){
			if(isEmpty($(this).val())){
				$(this).appMsg("不能为空");
				return isOk = false;
			}
		});
		if(!isOk) return;
		
		var _path = "";
		$(".image-item-img").each(function(){
			_path += $(this).attr("src") + ";";
		});
//		if(_path.length < 10){
//			$("#applySubmit").msg("请添加申请书图片");
//			return;
//		}
		$.ajax({
			type : "POST",
			url : "/contractObject/applySubmit",
			data : {
				contractObject_Code : returnValue($.contract.param.con_code),
				hi_code : $("#houseAddress").attr("data-code"),
				cco_applicationContent : $("#cco_applicationContent").val(),
				cco_applicationTime : $("#cco_createDate").val(),
				cco_applicationType : $("#heyueType").val(),
				cco_applicant : $("#cco_applicant").val(),
				cco_path : _path,
				cco_phone : $("#cco_phone").val(),
				cco_peopleName : $("#cco_peopleName").val(),
				cco_handleDate : $("#cco_handleDate").val()
			},
			dataType : "json",
			beforeSend : function(){
				$("#applySubmit").append("中..").attr("disabled", "disabled");
			}
		}).done(function(result){
			if(result.code != 200) return $.hint.tip(result.msg, "error");
            $.hint.tip("保存成功,请联系主管进行合约审核", "success", 2000, function () {
                OCContract.goBack();
            });
		}).always(function(){
			$("#applySubmit").removeAttr("disabled").text($("#applySubmit").text().replace("中..",""));
		});
	}
	
	$(function(){
		$.contract();
	});
	
})($);