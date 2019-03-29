var _STATE = false;
var roomNum1 = "";
var roomNum2 = "";
$(function () {
    data();

    // 房源搜索
	$("input[name=hi_code]").AutoAddressSearch({
		placeholder : "意向房源",
		result : function(obj){
		}
	});
	
});

// 筛选获取数据
function data() {
    $("#content").table({
        titleBg: "#34495E",
        titleColor: "#FFF",
        search: true,
        trClick: false,
        dataTime: [
            {
                name: "录入时间",
                string: "contact_time"
            }
        ],
        title: [
            {
                name: "编号",
                string: "cc_id",
                parameter: ""
            },
            {
                name: "联系人",
                string: "cust",
                parameter: "",
                href: "/customer/customerEdit&cc_code"
            },
//            {
//                name: "性别",
//                string: "ci_sex",
//                parameter: {
//                    0: "女",
//                    1: "男"
//                }
//            },
//            {
//                name: "电话",
//                string: "ci_phone",
//                parameter: ""
//            },
            {
                name: "证件信息",
                string: "idCard",
                parameter: ""
            },
            {
                name: "客户类型",
                string: "cc_type",
                parameter: {
                    1: "意向房东",
                    2: "意向租客"
                }
            },
            {
                name: "状态",
                string: "follow_statusStr",
                parameter: ""
            },
            {
                name: "客户需求",
                string: "customer_need",
                parameter: ""
            },
//            {
//                name: "小区地址",
//                string: "house_address",
//                parameter: ""
//            },
//            {
//                name: "意向房源",
//                string: "hi_address",
//                parameter: ""
//            },
//            {
//                name: "跟进结果",
//                string: "contact_result",
//                parameter: {
//                    0: "是吧",
//                    1: "成功",
//                    2: "可持续跟进"
//                }
//            },
            {
                name: "备注",
                string: "contact_remark",
                parameter: ""
            },
            {
                name: "录入人员",
                string: "em_name",
                parameter: ""
            },
            {
                name: "录入时间",
                string: "contact_time",
                parameter: "",
                format: "yyyy-MM-dd"
            }
        ],
        url: "/customer/queryCustomerIntention",
        data: {
        	isFixSize : 0
        },
        success: function (result) {
        }
    });
    
  //关闭窗口
    $('.cd-popup-close').on('click', function(event){
        event.preventDefault();
        $(".cd-popup3").removeClass('is-visible3');
        
    });
}

/**
 * 打开添加意向房源
 */
function showAdd(){
	$('.cd-popup3').show();
	//打开窗口
    $('.cd-popup3').addClass('is-visible3');
    
    $("#cd-buttons").show();
	$("#showCustInfo").hide();
    
    $("[name=cc_id]").val("");
	$("[name=ci_name]").val("");
	$("[name=ci_phone]").val("");
	$("[name=cc_cardType]").val("");
	$("[name=cc_cardNum]").val("");
	$("[name=customer_need]").val("");
	$("[name=contact_result]").val("");
	$(".images-btn").eq(0).html("");
	$(".images-btn").eq(1).html("");
	$("#CD1-count").text(0);
	$("#CD2-count").text(0);
	$("[name=ci_sex]").each(function(){
		if($(this).is(':checked')){
			$(this).removeAttr("checked");
			$(this).parent().attr("class", "common-checkbox");
		}
	});
	$("[name=ci_type]").each(function(){
		if($(this).is(':checked')){
			$(this).removeAttr("checked");
			$(this).parent().attr("class", "common-checkbox");
		}
	});
	
	$(".images-box-img").remove();
    $(".images-btn").show();
}

/**
 * 打开添加意向房源
 */
function showUpd(){
	var data = null;
	var id = -1;
	$("td .input_check").each(function(){
    	if($(this).is(":checked")){
    		id = $(this).parent().attr("data-id");
    		data =  $(this).data("data");
    	}
    });
    if (data == null) {  
    	swal('请选择一个！');
    	return;
    } else if(data.follow_status == 4){// 签约客户
    	swal('客户已签约，请到客户信息处修改！');
    	return;
    } else {  
    	
    	$('.cd-popup3').show();
    	//打开窗口
    	$('.cd-popup3').addClass('is-visible3');
//    $("td .checkbox-min").each(function(){
//    	if($(this).children("input").is(":checked")){
//    		id = $(this).attr("data-id");
//    	}
//    });
    	$.ajax({
    		type: "POST",
    		url: "/customer/queryCustomerIntentionById",
    		data : {
    			cc_id : id
    		},
    		dataType: "json",
    		success: function(resultObj) {
    			if(resultObj.customerIntention != null && resultObj.customerIntention != undefined){
    				$(".images-btn").eq(0).html("");
    				$(".images-btn").eq(1).html("");
    				$("#CD1-count").text(0);
    				$("#CD2-count").text(0);
    				var data = resultObj.customerIntention;
    				$("[name=cc_id]").val(data.cc_id);
    				$("[name=ci_name]").val(data.cc_name);
    				$("[name=ci_phone]").val(data.ccp_phone);
    				$("[name=cc_cardType]").val(data.cc_cardType);
    				$("[name=cc_cardNum]").val(data.cc_cardNum);
    				$("[name=customer_need]").val(data.customer_need);
    				$("[name=contact_result]").val(data.contact_remark);
    				var cc_sex = data.cc_sex;
    				if("1" == cc_sex){
    					$("[name=ci_sex]").eq(1).attr("checked", "checked").parent().addClass("common-checkbox-checked");
    				} else {
    					$("[name=ci_sex]").eq(0).attr("checked", "checked").parent().addClass("common-checkbox-checked");
    				}
    				var cc_type = data.cc_type;
    				if("1" == cc_type){
    					$("[name=ci_type]").eq(0).attr("checked", "checked").parent().addClass("common-checkbox-checked");
    				} else {
    					$("[name=ci_type]").eq(1).attr("checked", "checked").parent().addClass("common-checkbox-checked");
    				}
    				var img_card1 = data.img_card1;
    				if(null != img_card1 && "" != img_card1){
    					var html = '';
    					html += '<div class="images-box-img" data-type="CD1">';
    					html += '<img class="showboxImg" name="CD1" src="' + img_card1 + '">';
    					html += '<span class="images-box-img-delete" data-type="CD1" data-id="' + data.cc_id + '" data-del-url="/customer/deleteImage" style="display: none;">删除</span>';
    					html += '</div>';
    					$(".images-btn").eq(0).html(html);
    					$("#CD1-count").text(1);
    				}
    				var img_card2 = data.img_card2;
    				if(null != img_card2 && "" != img_card2){
    					var html = '';
    					html += '<div class="images-box-img" data-type="CD1">';
    					html += '<img class="showboxImg" name="CD2" src="' + img_card2 + '">';
    					html += '<span class="images-box-img-delete" data-type="CD1" data-id="' + data.cc_id + '" data-del-url="/customer/deleteImage" style="display: none;">删除</span>';
    					html += '</div>';
    					$(".images-btn").eq(1).html(html);
    					$("#CD2-count").text(1);
    				}
    			}
    		}
    	});
    }
	

}

function intentionFlow(){
	var id = 0;
    $("td .checkbox-min").each(function(){
    	if($(this).find("input").is(":checked")){
    		id = $(this).parent().next().text();
    	}
    });
    if (id == 0) {  
    	swal('请选择一个！', '管家婆管理系统');
    } else {  
    	window.parent.href_mo('/customer/customerIntentionFollow?ci_id='+id, "客户管理", "客户信息");
    } 
}

//楼层号值写入
function updateAddress1(obj){
	roomNum1 = obj;
}
//房号值写入
function updateAddress2(obj){
	roomNum2 = obj;
}

function submitText(obj){
	
	var ci_name = $("#ci_name").val();
	if("" == ci_name || null == ci_name){
		swal("请输入客户姓名");
		return;
	}
	var ci_sex = $("[name=ci_sex]:checked").val();
	if("" == ci_sex || null == ci_sex){
		swal("请输入客户性别");
		return;
	}
	var ci_phone = $("[name=ci_phone]").val();
	if("" == ci_phone || null == ci_phone){
		swal("请输入客户电话");
		return;
	} else {
		if(!isPhone(ci_phone)){
			swal("请输入正确电话");
			return;
		}
	}
	var ci_type = $("[name=ci_type]:checked").val();
	if("" == ci_type || null == ci_type){
		swal("请选择客户类型");
		return;
	}
	
	var customer_need = $("[name=customer_need]").val();
	if("" == customer_need || null == customer_need){
		swal("请输入客户需求");
		return;
	}
	
	var data = {};
	var UserCustomerIntention = {};
	UserCustomerIntention.cc_id = $("[name=cc_id]").val();
	UserCustomerIntention.cc_name = ci_name;
	UserCustomerIntention.cc_sex = ci_sex;
	UserCustomerIntention.ccp_phone = ci_phone;
	UserCustomerIntention.cc_type = ci_type;
	UserCustomerIntention.customer_need = $("[name=customer_need]").val();
	UserCustomerIntention.contact_remark = $("#contact_result").val();
	
	var cc_cardType = $("[name=cc_cardType]").val();
	var cc_cardNum = $("[name=cc_cardNum]").val();
	if("-1" != cc_cardType){
		if(null == cc_cardNum || "" == cc_cardNum){
			swal("请输入证件号码");
			return;
		} else if(cc_cardType == "1" && !isIDCard(cc_cardNum)){
			swal("请输入正确证件号码");
			return;
		}
		UserCustomerIntention.cc_cardType = cc_cardType;
		UserCustomerIntention.cc_cardNum = cc_cardNum;
	}
	// 身份证正面
	var frontCard = $("#frontCard img").attr("src");
	// 身份证反面
	var inverseCard = $("#inverseCard img").attr("src");
	if(!isEmpty(frontCard) && isEmpty(inverseCard)){
		swal("请上传证件背面照");
		return;
	} else if(isEmpty(frontCard) && !isEmpty(inverseCard)){
		swal("请上传证件正面照");
		return;
	} else if((!isEmpty(frontCard) && !isEmpty(inverseCard)) && (isEmpty(cc_cardType) || isEmpty(cc_cardNum))){
		swal("请输入证件信息");
		return;
	} else if(!isEmpty(frontCard) && !isEmpty(inverseCard)){
		UserCustomerIntention.img_card1 = frontCard;
		UserCustomerIntention.img_card2 = inverseCard;
	}
	UserCustomerIntention.cc_code2 = $("[name=cc_code2]").val();
	
	data.UserCustomerIntention = JSON.stringify(UserCustomerIntention);
	$.ajax({
		type: "POST",
		url: "/customer/saveCustomerIntention",
		data : JSON.stringify(data),
		dataType: "json",
	    contentType: "application/json; charset=utf-8",
	    success: function(resultObj) {
			if(resultObj.result == "success"){
				swal("保存成功");
				$(".cd-popup3").removeClass('is-visible3');
				window.location.href = "/customer/customerIntention";
			}else{
				swal("保存失败，请联系系统管理员");
			}
		}
	});
}

/*=======================================编辑页面==============================================*/
/** 表单验证*/
function isValidInput() {
    $(".form-control:required").on("change", function () {
        var $this = $(this);
        if ($this.is(":hidden")) {
            _STATE = true;
            return;
        }
        var $thisVal = $(this).val();
        var $parent = $this.parent().parent();
        var text = $parent.find(".item-titile").text();
        if (isEmpty($thisVal)) {
            $this.addClass("input-error").siblings(".true-tisp").hide();
            $parent.find(".tisp").addClass("error").text(text + "不能为空");
            _STATE = false;
            return;
        }
        var $thisId = $(this).attr("id");
        $this.removeClass("input-error").siblings(".true-tisp").show();
        $parent.find(".tisp").removeClass("error").empty();
        _STATE = true;
    });
}

//毫秒转换为日期格式
var format = function (time, format) {
    var t = new Date(time);
    var tf = function (i) {
        return (i < 10 ? '0' : '') + i
    };
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
        switch (a) {
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

function hrefClick(ids) {
//	checkBlackList($(ids).attr("data-type"));
	var url = $(ids).attr("data-type");
	var cc_code = url.substring(url.indexOf("cc_code=") + 8);
	// 发送请求
	$.ajax({
		type : "POST",
		url : "/customer/checkBlackList",
		data : {
			cc_code : cc_code
		},
		dataType : "json",
		success : function(result){
			if(result.isBlack == false){
				swal({  
                    title: "确认继续?",  
                    text: "请注意，该客户为公司黑名单客户!",  
                    type: "warning",  
                    showCancelButton: true,  
                    confirmButtonColor: "#DD6B55",  
                    showConfirmButton: true,  
                    showCancelButton: true },  
                function (isConfirm) {  
                    if (isConfirm) {  
                    	window.parent.href_mo($(ids).attr("data-type"), "客户管理", "客户信息");
                    } else {  
                    }  
                });  
			}else{
				window.parent.href_mo($(ids).attr("data-type"), "客户管理", "客户信息");
			}
		}
	});
}

function hrefClick1(ids) {
	var url = $(ids).attr("data-type");
	var cc_code = url.substring(url.indexOf("cc_code=") + 8);
	// 发送请求
	$.ajax({
		type : "POST",
		url : "/customer/checkBlackList",
		data : {
			cc_code : cc_code
		},
		dataType : "json",
		success : function(result){
			if(result.isBlack == false){
				swal({  
                    title: "确认继续?",  
                    text: "请注意，该客户为公司黑名单客户!",  
                    type: "warning",  
                    showCancelButton: true,  
                    confirmButtonColor: "#DD6B55",  
                    showConfirmButton: true,  
                    showCancelButton: true },  
                function (isConfirm) {  
                    if (isConfirm) {  
                    	window.parent.href_mo($(ids).attr("data-type"), "客户管理", "客户信息");
                    } else {  
                    }  
                });  
			}else{
				window.parent.href_mo($(ids).attr("data-type"), "客户管理", "客户信息");
			}
		}
	});
}

/**
 * 检查身份证号码
 * @param obj
 * @returns
 */
function checkCardNum(obj){
	if($("[name=cc_cardType]").val() == "1" && $(obj).val() != null && 
			$(obj).val() != "" && !isIDCard($(obj).val())){
		swal("请输入正确身份证号码");
		return;
	}
	if($(obj).val() != null && 
			$(obj).val() != ""){
		
		$.ajax({
			type: "POST",
			url: "/customer/checkCardNum",
			data : {
				cc_cardNum : $(obj).val()
			},
			dataType: "json",
			success: function(resultObj) {
				if(resultObj.code == 200){// 证件号码已存在，须返显信息
					$("#cd-buttons").animate({
						left:"+=500px"
					},3000);
					$("#cd-buttons").hide();
					$("#showCustInfo").show();
					var data = resultObj.result;
					var div_ = $("#showCustInfo label");
					div_.eq(1).text(returnValue(data.cc_name));
					div_.eq(2).text(data.cc_sex == 0 ? "女" : (data.sex == 1 ? "男" : "未知"));
					$("#sexHide").val(data.cc_sex);
					div_.eq(3).text(returnValue(data.ccp_phone));
					if(data.cc_cardType == 1){
						div_.eq(4).text("身份证");
					} else if(data.cc_cardType == 2){
						div_.eq(4).text("军官证");
					} else if(data.cc_cardType == 3){
						div_.eq(4).text("商户号");
					} else if(data.cc_cardType == 4){
						div_.eq(4).text("护照");
					} else if(data.cc_cardType == 5){
						div_.eq(4).text("台湾居民通行证");
					} else if(data.cc_cardType == 6){
                        div_.eq(4).text("香港居民通行证");
                    } else if(data.cc_cardType == 7){
                        div_.eq(4).text("临时身份证");
                    } else if(data.cc_cardType == 8){
                        div_.eq(4).text("外国人永久居留证");
                    }
                    $("#cardTypeHide").val(data.cc_cardType);
					div_.eq(5).text(returnValue(data.cc_cardNum));
					$.each(data.customerImages, function(index, data){
						if(data.cci_type == "CD1"){
							$("#showCustInfo img").eq(0).attr("src", data.cci_path);
						}
						if(data.cci_type == "CD2"){
							$("#showCustInfo img").eq(1).attr("src", data.cci_path);
						}
					});
					$("#cc_code2Hide").val(data.cc_code);
				}
			}
		});
	}
}

function enterText(){
	var div_ = $("#showCustInfo label");
	$("[name=ci_name]").val(div_.eq(1).text());
	var sex = $("#sexHide").val();
	if(sex == 0){
		$("[name=ci_sex]").eq(0).attr("checked", "checked").parent().addClass("common-checkbox-checked");
		$("[name=ci_sex]").eq(1).parent().attr("class", "common-checkbox");
	} else if(sex == 1){
		$("[name=ci_sex]").eq(1).attr("checked", "checked").parent().addClass("common-checkbox-checked");
		$("[name=ci_sex]").eq(0).parent().attr("class", "common-checkbox");
	}
	$("[name=ci_phone]").val(div_.eq(3).text());
	$("[name=cc_cardType]").val($("#cardTypeHide").val());
	$("[name=cc_cardNum]").val(div_.eq(5).text());
	var img_card1 = $("#showCustInfo img").eq(0).attr("src");
	if(null != img_card1 && "" != img_card1){
		var html = '';
		html += '<div class="images-box-img" data-type="CD1">';
		html += '<img class="showboxImg" name="CD1" src="' + img_card1 + '">';
		html += '<span class="images-box-img-delete" data-type="CD1" data-id="' + ""/*data.cc_id*/ + '" data-del-url="/customer/deleteImage" style="display: none;">删除</span>';
		html += '</div>';
		$(".images-btn").eq(0).html(html);
		$("#CD1-count").text(1);
	}
	var img_card2 = $("#showCustInfo img").eq(1).attr("src");
	if(null != img_card2 && "" != img_card2){
		var html = '';
		html += '<div class="images-box-img" data-type="CD1">';
		html += '<img class="showboxImg" name="CD2" src="' + img_card2 + '">';
		html += '<span class="images-box-img-delete" data-type="CD1" data-id="' + ""/*data.cc_id*/ + '" data-del-url="/customer/deleteImage" style="display: none;">删除</span>';
		html += '</div>';
		$(".images-btn").eq(1).html(html);
		$("#CD2-count").text(1);
	}
	$("[name=cc_code2]").val($("#cc_code2Hide").val());
	cancelText();
}

function cancelText(){
	$("#cd-buttons").animate({
		left:"-=500px"
	},3000);
	$("#cd-buttons").show();
	$("#showCustInfo").hide();
}
