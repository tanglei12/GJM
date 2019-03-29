var cno;
var mode;
var billList = null;
var ueditor = null;	// UE
$(function(){
	// 初始化数据
	initData();
	// 加载数据
	loading();
});
/** 是否为空 */
var isEmpty = function(str) {
	return str == null || typeof str == "undefined" || str == "" || str == "undefined"|| str == "null" || str.length == 0 || str == {};
};
/** 返回字符串 */
function returnValue(str) {
	return (str == null || typeof (str) == "undefined" || str == "undefined") ? "" : str + "";
}
/** 查询Url参数*/
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	//	if (r != null) return unescape(r[2]); return null;
	if (r != null)
		return decodeURI(r[2]);
	return null;
}
/** 为空替换 如果str为空，则返回replace*/
function returnNullReplace(str, replace) {return isEmpty(str) ? replace : returnValue(str);}

/** 初始化数据*/
function initData(){
	cno = getQueryString("ex_number");
}
/**
 * 毫秒转换为日期格式
 * @param time 时间/时间字符串
 * @param format 时间格式 "yyyy-MM-dd" || "yyyy-MM-dd HH:mm:ss"
 * @returns
 */
function format(time, format) {
	if (isEmpty(time)) {
		return "";
	}
	var t = new Date(time);
	var tf = function(i) {
		return (i < 10 ? '0' : '') + i
	};
	return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
		switch(a) {
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
/** 返回合同操作状态*/
function returnContractOptionState(param) {
	var _data = {};
	switch (param) {
	case 1 :
		_data.title = "处理中";
		_data.color = "next";
		_data.image = "sh-iocn-wcl";
		break;
	case 0 :
		_data.title = "处理完毕";
		_data.color = "next";
		_data.image = "sh-iocn-ycl";
		break;
	}
	return _data;
}

function changeNumMoneyToChinese(money){
	  var cnNums = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"); 
	  var cnIntRadice = new Array("", "拾", "佰", "仟"); 
	  var cnIntUnits = new Array("", "万", "亿", "兆");
	  var cnDecUnits = new Array("角", "分", "毫", "厘");
	  var cnInteger = "整"; 
	  var cnIntLast = "元";
	  var maxNum = 999999999999999.9999;
	  var IntegerNum; 
	  var DecimalNum; 
	  var ChineseStr = ""; 
	  var parts; 
	  if (money == ""){
	    return "";
	  }
	  money = parseFloat(money);
	  if (money >= maxNum) {
	    alert('超出最大处理数字');
	    return "";
	  }
	  if (money == 0) {
	    ChineseStr = cnNums[0] + cnIntLast + cnInteger;
	    return ChineseStr;
	  }
	  money = money.toString(); 
	  if (money.indexOf(".") == -1) {
	    IntegerNum = money;
	    DecimalNum = '';
	  } else {
	    parts = money.split(".");
	    IntegerNum = parts[0];
	    DecimalNum = parts[1].substr(0, 4);
	  }
	  if (parseInt(IntegerNum, 10) > 0) { 
	    var zeroCount = 0;
	    var IntLen = IntegerNum.length;
	    for (var index = 0; index < IntLen; index++) {
	      var n = IntegerNum.substr(index, 1);
	      var p = IntLen - index - 1;
	      var q = p / 4;
	      var m = p % 4;
	      if (n == "0") {
	        zeroCount++;
	      } else {
	        if (zeroCount > 0) {
	          ChineseStr += cnNums[0];
	        }
	        //归零
	        zeroCount = 0; 
	        ChineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
	      }
	      if (m == 0 && zeroCount < 4) {
	        ChineseStr += cnIntUnits[q];
	      }
	    }
	    ChineseStr += cnIntLast;
	  }
	  if (DecimalNum != '') { 
	    var decLen = DecimalNum.length;
	    for (var index = 0; index < decLen; index++) {
	      var n = DecimalNum.substr(index, 1);
	      if (n != '0') {
	        ChineseStr += cnNums[Number(n)] + cnDecUnits[index];
	      }
	    }
	  }
	  if (ChineseStr == '') {
	    ChineseStr += cnNums[0] + cnIntLast + cnInteger;
	  } else if (DecimalNum == '') {
	    ChineseStr += cnInteger;
	  }
	  return ChineseStr;
	}

/** 处理结果*/
function loading(){
	// 查询处理结果
	$.ajax({
		type : "POST",
		url: "/bookkeep/result",
		data : {
			cno : cno
		},
		dataType : "json",
		beforeSend : function(){
			$("#contract-content").html('<div class="loading"></div>');
		}
	}).done(function(result){
		switch (result.code) {
			case 200:
				data = result.data;
				// 报销申请
				contractObject = data.applyExpenselist;
				// 报销管理数据
				contractBody = data.viewBillExpenseVo;
				//报销处理
				contract = data.Record;
				//主管
				dapartment=data.dapartmentList;
				// 获取当前用户信息
				user=data.user;
				// 显示数据
				$("#contract-content").displayContract({
					data : { cno : cno }
				});
				break;
			default :
				break;
		}
	});
}

;(function($, document) {
	$.fn.displayContract = function(options) {
		return this.each(function() {
			var _this = this;

			var defaults = {
				data : {},
				show_house : true, 
				show_customer : true, 
				show_contract : true, 
			};
			var opts = $.extend(defaults, options);
			/** 初始化数据 */
			_this.init = function() {
				$.ajax({
					type : "POST",
					url : "/bookkeep/result",
					data : opts.data,
					dataType : "json"
				}).done(function(result) {
					if (result.code != 200) {
						return;
					}
					data = result.data;
					// 报销申请
					contractObject = data.applyExpenselist;
					// 报销管理数据
					contractBody = data.viewBillExpenseVo;
					var imgg=[];
                    var img='';
					if (contractBody.ex_enclasure !=null && contractBody.ex_enclasure !='') {
                        img=contractBody.ex_enclasure;
                        img=img.substring(0,img.length-1);
                        imgg=img.split(",");
                    }
					//报销处理数据
					contract = data.Record;
					//主管
					dapartment=data.UserDictionary;
					// 获取当前用户信息
					user=data.user;
					if  (user.em_name != contractBody.ex_person && user.em_name==contractBody.em_name && contractBody.ex_state == 3) {
						var html = "";
						html+='<div id="cd-buttons">';
						html+='<div style="margin: auto; width: 99%; text-align: center;border-bottom: 1px solid #06B;margin_top:-20px;" id="titleInsert">';
						html+='	<input type="text" value="重庆管家婆费用报销单" id="inputtext" name="inputtext" style="margin-top:10px;width:210px;border: none; text-align: center; font-size: 20px; color: #3E97C9; font-family: 微软雅黑; -moz-user-select: none; -webkit-user-select: none; cursor: default;" readonly="readonly">';
						html+='</div>';
						html+='<div class="sub-title" id="contract-title" style="margin: auto; width: 95%;margin-bottom: 10px;">';
					    html+='	<p style="float: left;;margin-top: 35px;font-size: 14px;">报销部门:'+returnValue(contractBody.ex_partment)+'</p>';
						html+='	<p style="float: right;margin-top: 30px;font-size: 14px;">填表日期:'+format(contractBody.ex_time,'yyyy-MM-dd HH:mm:ss')+'</p>';
						html+='<input type="hidden" class="num" value='+contractBody.ex_number+'>';
						html+='<input type="hidden" class="nid" value='+contractBody.ex_id+'>';
						html+='</div>';
						html+='<table id="expense" style="width: 96%;text-align: center;margin-left: 15px;">';
						html+='	<thead style="border:1px solid;width:20px;">';
						html+='		<tr style="font-size: 16px;font-weight:500;color: black;height: 30px;">';
						html+='			<td style="border:1px solid;">款项用途</td>';
						html+='			<td style="border:1px solid;">金额（元）</td>';
						html+='			<td style="border:1px solid;">备注信息</td>';
						html+='		</tr>';
						html+='	</thead>';
						html+='	<tbody style="border:1px solid;" class="tbody">';
						html+='<input type="hidden" class="ex_id" value="'+contractBody.ex_id+'">';
						if(!isEmpty(contractObject)){
						 for (var i=0;i<contractObject.length;i++) {
							 html+='<tr style="height: 30px;" class="expense-tr">';
							 html+='<input type="hidden" class="bx_id" value="'+returnValue(contractObject[i].bx_id)+'">';
							 html+='<input type="hidden" class="bx_bk_id" value="'+returnValue(contractObject[i].bx_bk_id)+'">';
							 html+='<input type="hidden" class="bx_number" value="'+returnValue(contractObject[i].bx_number)+'">';
							 html+=   '<td style="border:1px solid;"><i style="font-size:20px;color:red;margin-right:2px;" class="fa-minus-square"></i><input type="text" value="'+returnValue(contractObject[i].bx_custom)+'" style=\"height:30px;text-align: center;border: 1px solid;width:280px;\"></td>'; 
							 html+=   '<td style="border:1px solid;"><input type="text" value="'+returnValue(contractObject[i].bx_expense_money)+'" style=\"height:30px;text-align: center;border: 1px solid;width:280px;\"></td>';
							 html+=   '<td style="border:1px solid;"><input type="text" value="'+returnValue(contractObject[i].bx_category_details)+'" style=\"height:30px;text-align: center;border: 1px solid;width:280px;\"></td>';
							 html+='</tr>';
						 }
						}
						html+='	</tbody>';
						html+='</table>';
						html+='</div>';
						html+='<div style="float: right; margin-right: 142px; margin-top: 10px;font-size: 13px;margin-bottom: 10px;">'+'报销人：'+contractBody.em_name+'</div>';
						html+='<br>';
						if (opts.show_house) {
							html += '	<fieldset style="position: relative;padding: 8px 0; margin-bottom: 20px;border-radius: 3px;">';
							html += '		<legend style="margin-left: 10px;font-size: 14px;">附件信息：</legend>';
							html+='				<div style="border-bottom:1px solid;"></div>';
							html+='				<div id="image-upload-box" >';
							html+='				</div>';
							html += '	</fieldset>';
						}
						html+='<button type="butten" class="finish-butten" id="update" style="float:right;background-color:#3aa4f0;margin-right:40px;">提交修改</button>';
						$("#contract-title").html(html);
						$("#contract-content").css('display','none');
						$("#image-upload-box").imageUpload();
					}else{
						var html = "";
						html+='<div id="cd-buttons">';
						html+='<div style="margin: auto; width: 99%; text-align: center;border-bottom: 1px solid #06B;margin_top:-20px;" id="titleInsert">';
						html+='	<input type="text" value="重庆管家婆费用报销单" id="inputtext" name="inputtext" style="margin-top:10px;width:210px;border: none; text-align: center; font-size: 20px; color: #3E97C9; font-family: 微软雅黑; -moz-user-select: none; -webkit-user-select: none; cursor: default;" readonly="readonly">';
						html+='</div>';
						html+='<div class="sub-title title-table" id="contract-title" style="margin: auto; width: 95%;margin-bottom: 10px;">';
					    html+='	<p style="float: left;;margin-top: 35px;font-size: 14px;">报销部门:'+returnValue(contractBody.ex_partment)+'</p>';
						html+='	<p style="float: right;margin-top: 30px;font-size: 14px;">填表日期:'+format(contractBody.ex_time,'yyyy-MM-dd HH:mm:ss')+'</p>';
						html+='<input type="hidden" class="num" value='+contractBody.ex_number+'>';
						html+='<input type="hidden" class="nid" value='+contractBody.ex_id+'>';
						html+='</div>';
						html+='<table id="expense" style="width: 96%;text-align: center;margin-left: 15px;">';
						html+='	<thead style="border:1px solid;width:20px;">';
						html+='		<tr style="font-size: 16px;font-weight:500;color: black;height: 30px;">';
						html+='			<td style="border:1px solid;">款项用途</td>';
						html+='			<td style="border:1px solid;">金额（元）</td>';
						html+='			<td style="border:1px solid;">备注信息</td>';
						html+='		</tr>';
						html+='	</thead>';
						html+='	<tbody style="border:1px solid;" class="tbody">';
						if(!isEmpty(contractObject)){
							 for (var i=0;i<contractObject.length;i++) {
								 html+='<tr style="height: 30px;" class="expense-tr">';
								 html+=   '<td style="border:1px solid;">'+returnValue(contractObject[i].bx_custom)+'</td>';
								 html+=   '<td style="border:1px solid;">'+returnValue(contractObject[i].bx_expense_money)+'</td>';
								 html+=   '<td style="border:1px solid;">'+returnValue(contractObject[i].bx_category_details)+'</td>';
								 html+='</tr>';
							 }
						}
						html+='	</tbody>';
						html+='	<tfoot>';
						html+='		<tr style="height: 30px;" class="expense-tr">';
						html+='			<td style="border:1px solid;">'+"费用合计"+'</td>';
						html+='			<td style="border:1px solid;">'+contractBody.ex_expense_money+'</td>';
						html+='			<td style="border:1px solid;"><p style="text-align: -webkit-left;"><i style="font-style:normal">'+'金额大写：'+changeNumMoneyToChinese(contractBody.ex_expense_money)+'</i></P></td>';
						html+='		</tr>';
						html+='	</tfoot>';
						html+='</table>';
						html+='</div>';
						html+='<div style="float: right; margin-right: 142px; margin-top: 10px;font-size: 13px;margin-bottom: 10px;">'+'报销人：'+contractBody.em_name+'</div>';
						$("#contract-title").html(html);
					
						html = "";
						html += '<div class="content-it">';
						html+='<div style="margin-bottom: 16px;border-bottom: 1px solid;">';
						html+='<a style="margin-left:9px;color:darkturquoise;cursor: pointer;margin-top: 6px;font-size: 14px;" onclick="printMytable();">'+'打印报销单'+'</a>';
						html+='</div>';
					// 【显示投诉建议信息】
					if (opts.show_house) {
						html += '	<fieldset style="position: relative;padding: 8px 0; margin-bottom: 20px;border-radius: 3px;">';
						html += '		<legend style="margin-left: 10px;font-size: 14px;">附件信息：</legend>';
						html+='<div style="border-bottom:1px solid;"></div>';
						html+='<div class="viewer-img">';
						for (var i=0;i<imgg.length;i++) {
							html+='<div class="image-item" style="display: block;float: left;position: relative;width: 165px;height: 114px;cursor: pointer;margin-right: 10px;margin-bottom: 10px;box-shadow: 0 0 2px rgba(0, 0, 0, 0.24);overflow: hidden;">';
							html+='		<img src="'+imgg[i]+'" style="margin-left:4px;margin-top:5px;width: 100%;height: 100%;">';
							html+='</div>';
						}
						html+='</div>';
						html += '	</fieldset>';
					}
						html+='<fieldset style="position: relative;padding: 8px 0; margin-bottom: 20px;border-radius: 3px;">';
						html+='   <legend style="margin-left: 10px;font-size: 14px;">审批记录：</legend>';
						html+='<div style="border-bottom:1px solid;"></div>';
						var c='';
						if (!isEmpty(contract)) {
							for (var i=0;i<contract.length;i++){
								if (contract[i].ar_state == 1) {
									state ='驳回';
								} else if (contract[i].ar_state == 2) {
									state ='不通过';
								} else {
									state='通过';
								}
								html+='<p style="margin: 12px 15px;">'+format(contract[i].ar_time,'yyyy-MM-dd HH:mm:ss')+'&nbsp;&nbsp;&nbsp;&nbsp;'+returnValue(contract[i].em_name)+'&nbsp;&nbsp;&nbsp;&nbsp;'+state+'&nbsp;&nbsp;&nbsp;&nbsp;'+returnValue(contract[i].ar_text)+'</p>';
							}
						}
						html+='</fieldset>';
						
						html+='<fieldset style="position: relative;padding: 8px 0; margin-bottom: 20px;border-radius: 3px;">';
						html+='   <legend style="margin-left: 10px;font-size: 14px;">报销处理：</legend>';
						html+='<div style="border-bottom:1px solid;"></div>';
						if (user.em_name == contractBody.ex_person) {
							if (contractBody.ex_state == 1) {
								html+='<div class="suer-button">';
								html+='<button type="butten" class="finish-butten" id="reject" style="background-color:#f2893d">驳回</button>';
								html+='<button type="butten" class="finish-butten" id="notPass" style="background-color:red">不通过</button>';
								html+='<button type="butten" class="finish-butten" id="pass" style="background-color:#3aa4f0">通过</button>';
								html+='</div>';
							}
						}
						
						html+='<div class="button" style="display:none">';
						html+='<button type="butten" class="finish-butten" id="notBy" style="background-color:#f2893d">驳回</button>';
						html+='<button type="butten" class="finish-butten" id="ok" style="background-color:#3aa4f0">打款</button>';
						html+='</div>';						
						html+='</fieldset>';
						
						html+='<div class="button-div" style="font-size: 14px;margin-left:10px;display:none;">';
					    html+='<p>驳回原因：</P>';
					    html+='<div>';
					    html+='<textarea class="textarea" style="width:220px;height:80px;"></textarea>';
					    html+='</div>';
					    html+='<button type="butten" class="finish-butten" id="suer" style="background-color:#3aa4f0">确认驳回</button>';
					    html+='</div>';
					    
					    html+='<div class="button-ok" style="display:none">';
					    html+='<div style="margin: 10px 10px;font-size: 14px;border-bottom: 1px solid;width: 200px;">收款人：</div>';
					    html+='<div style="margin: 10px 10px;font-size: 14px;border-bottom: 1px solid;width: 200px;">付款方式：</div>';
					    html+='<div style="margin: 10px 10px;font-size: 14px;border-bottom: 1px solid;width: 200px;">收款账号：</div>';
					    html+='</div>';
					    
					    html+='<div class="div" style="display:none">';
					    html+='<select class="seelct-div" style="float:left;width: 100px;height: 30px;" >';
					    html+='    <option>选择审核人</option>';
					    for (var i=0;i<dapartment.length;i++) {
					    	html+='    <option value=\'+dapartment[i].dictionary_name+\'>\'+dapartment[i].dictionary_name+\'</option>';
					    }
					    html+='</select>';
					    html+='<button type="butten" class="suer-butten" style="background-color:#3aa4f0;float:left;font-size: 15px;width: 81px;margin-left:20px;border-radius: 6px;line-height: initial;text-align:center;height:30px;">确认通过</button>';
				    	html+='</div>';
				    	$(_this).html(html);
					}
					
					/*if(!isEmpty(contract)){
						for (var i=0;i<contract.length;i++) {
						   if (contract[i].ar_state == 3) {
							   $('.suer-button').css('display','none');
							   $('.button').css('display','block');
						}
					 }
					}*/
					for (var i=0;i<imgg.length;i++) {
						var div='<div  class="image-item"><img class="image-item-img" src="'+imgg[i]+'" data-preview-src="" data-preview-group="1"><span class="image-item-close" title="删除照片">X</span><div class="image-item-wait" style="display: none;"></div></div>';
						$('#image-upload-box').prepend(div);
					}
					$('.viewer-img').viewer();
				});
			};

			_this.init();
		});
	};
})($, document);

//修改报销单
var arr=[];
var img='';
$(document).on('click','#update',function(){
	$('#expense tbody tr').each(function(){
		var arry={};
		arry.bx_id=$(this).find('.bx_id').val();
		arry.bx_bk_id=$(this).find('.bx_bk_id').val();
		arry.bx_number=$(this).find('.bx_number').val();
		arry.bx_custom=$(this).find("td").eq(0).find('input').val();
		arry.bx_expense_money=$(this).find("td").eq(1).find('input').val();
		arry.bx_category_details=$(this).find("td").eq(2).find('input').val();
		arry.bx_state=1;
		arr.push(arry);
	});
	$('#image-upload-box').find('img').each(function(){
		img+=$(this).attr('src')+"_";
	});
	var ex_id=$('.ex_id').val();
	$.ajax({
		url : "/bookkeep/updateApplyExpense?result="+encodeURI(JSON.stringify(arr))+'&ex_id='+ex_id+'&ex_enclasure='+img,
		type : "POST",
		data : {},
		dataType : "json",
		success:function(data){
				location.reload();
		},
		error:function(){
			$.jBox.tip(data.msg,"error");
		}
	})
})
// 删除报销数据
$(document).on('click','.fa-minus-square',function(){
	var _this=$(this);
	$(this).each(function(){
		var submit = confirm("确定要删除该条数据吗？");
		if (submit == true) {
			var bx_id=$(this).parent().parent('tr').find('.bx_id').val();
			$.ajax({
				url : "/bookkeep/del?bx_id="+bx_id,
				type : "POST",
				data : {},
				dataType : "json",
				success:function(data){
					_this.parent('td').parent('tr').remove();
				},
				error:function(){
					
				}
			})
		}
	})
})

//删除图片
$(document).on("click", '.image-item-close', function() {
	$(this).each(function(){
		var submit = confirm("确定要删除该图片吗？");
		if (submit == true) {
			// 获取图片路径
			var path = $(this).parent().find(".image-item-img").attr("src");
			$(this).parent().find(".image-item-wait").show();
			$(this).parent().remove("div");
		}
	})
})

function ajax (arr) {
	$.ajax({
		url : "/bookkeep/examine?result="+encodeURI(JSON.stringify(arr)),
		type : "POST",
		data : {},
		dataType : "json",
		success:function(data){
			$('.contractInfo').hide();
				location.reload() ;
		},
		error:function(){
			
		}
	})
}
//复合驳回
$(document).on('click','#reject',function(){
	$('#reject').css('border','1px solid');
	$('#notPass').css('border','');
	$('#pass').css('border','');
	$('#suer').css('border','');
	$('.suer-butten').css('border','');
	$('#suer').html('确认驳回');
	$('.button-div').show();
	$('.div').hide();
	$('#suer').click(function(){
		$('#suer').css('border','1px solid');
		var arr={};
		var nid=$('.nid').val(); //报销id
		arr.ar_ex_id=nid;
		arr.ar_number=$('.num').val(); //报销单号;
		arr.ar_text=$('.textarea').val();  //文本框;
		arr.ar_state=1;
		$.ajax({
			url : "/bookkeep/examine?result="+encodeURI(JSON.stringify(arr)),
			type : "POST",
			data : {},
			dataType : "json",
			success:function(data){
				location.reload() ;
			},
			error:function(){
				
			}
		})
	})
})
//复合不通过
$(document).on('click','#notPass',function(){
	$('#notPass').css('border','1px solid');
	$('#reject').css('border','');
	$('#pass').css('border','');
	$('#suer').css('border','');
	$('.suer-butten').css('border','');
	$('#suer').html('确认不通过');
	$('.button-div').show();
	$('.div').hide();
	$('#suer').click(function (){
		$('#suer').css('border','1px solid');
		var arr={};
		var nid=$('.nid').val(); //报销id
		arr.ar_ex_id=nid;
		arr.ar_number=$('.num').val(); //报销单号;
		arr.ar_text=$('.textarea').val();  //文本框;
		arr.ar_state=2;
		ajax(arr);
	})
})

var person='';
//复合通过
$(document).on('click','#pass',function(){
	$('#pass').css('border','1px solid');
	$('#notPass').css('border','');
	$('#reject').css('border','');
	$('#suer').css('border','');
	$('.button-div').hide();
	$('.div').show();
	$(".seelct-div").change(function(){
		person=$('.seelct-div').val();
	})
	$('.suer-butten').click(function (){
		$('.suer-butten').css('border','1px solid');
		if (person == user.em_name) {
			$.jBox.tip("审核人不能为自己！");
			return false;
		}
		var arr={};
		var nid=$('.nid').val(); //报销管理 id
		arr.ar_ex_id=nid;
		arr.ar_number=$('.num').val(); //报销单号;
		if (user.em_name == '肖前容') {
			arr.ar_state=3;
		} else {
			arr.ar_state=4;
		}
		$.ajax({
			url : "/bookkeep/examine?result="+encodeURI(JSON.stringify(arr))+'&person='+person,
			type : "POST",
			data : {},
			dataType : "json",
			success:function(data){
				$('.contractInfo').hide();
					location.reload();
			},
			error:function(){
				
			}
		})
	})
})
//财务驳回
$(document).on('click','#notBy',function(){
	$('.button-ok').hide();
	$('#suer').html('确认驳回');
	$('.button-div').show();
})
//财务打款
$(document).on('click','#ok',function(){
	$('.button-div').hide();
	$('.button-ok').show();
})

// 打印
var LODOP='';
function printMytable(){
	LODOP=getLodop();
	LODOP.PRINT_INIT("费用报销单打印");
		LODOP.ADD_PRINT_HTM(5,5, "100%", "100%", $("#contract-title").html());
	LODOP.PREVIEW();   //预览
	LODOP.NewPageA();//分页
	LODOP.On_Return=function(TaskID,Value){
		window.location.reload();
		// 大于0成功,数字表示打印了几页。
		if(Value > 0){
		}
	};
};