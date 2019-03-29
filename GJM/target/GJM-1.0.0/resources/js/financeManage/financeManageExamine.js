var cno;
$(function(){	
	// 初始化数据
	initData();
	// 加载数据
	loading();
});
//金额
function fmoney(s, n)  {  
   n = n > 0 && n <= 20 ? n : 2;  
   s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";  
   var l = s.split(".")[0].split("").reverse(),  
   r = s.split(".")[1];  
   t = "";  
   for(i = 0; i < l.length; i ++ )  
   {  
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");  
   }  
   return t.split("").reverse().join("") + "." + r;  
}
/** 初始化数据*/
function initData(){
	cno = getQueryString("bs_id");
}

/** 处理结果*/
function loading(){
	// 查询处理结果
	$.ajax({
		type : "POST",
		url: "/financeManage/selectDepositManage",
		data : {
			cno : cno
		},
		dataType : "json",
		beforeSend : function(){
		}
	}).done(function(result){
		switch (result.code) {
			case 200:
				data = result.data;
				//定金信息
				financePayFlowStatement=data.billPayFlowStatementBo;
				//定金处理信息
				billPayResult=data.list;
				//管家信息
				userCenter=data.userCenter;
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
					url : "/financeManage/selectDepositManage",
					data : opts.data,
					dataType : "json"
				}).done(function(result) {
					if (result.code != 200) {
						return;
					}
					data = result.data;
					//定金信息
					financePayFlowStatement=data.billPayFlowStatementBo;
					var	contractObjectCode=financePayFlowStatement.contractObject_code;  //是否关联
					//定金处理信息
					billPayResult=data.list;
					//管家信息
					userCenter=data.userCenter;
					//登录人信息
					user=data.user;
					
						var html = '';
								html += '<ul class="title-nav" style="border-bottom: 1px solid #878787;width: 88%;margin-left: 10px;">';
								html += '	<li class="visited" style="font-size: 17px;">' + "基本信息";
								html += '	</li>';
								html += '</ul>';
								html += '<input type="hidden" class="bs_id" value='+financePayFlowStatement.bs_id+'>';  //流水表记录id
								html += '<div>';
								html += '  <div style="display:flex;">';
								html += '    <div style="color: #878787;border-width: 0px;border-style: solid;text-align: left;line-height: 20px;float: left;width: 100px;height: 37px;"><div style="width:55px;margin:10px 26px;"><p style="font-size:14px;width: 100px;">'+"客户名称"+'</p></div></div>';
								html += '    <div style="left: 103px;top: 102px;background-color: transparent;font-size: 14.0px;padding: 0px;border-radius: 0px;border-width: 0px;float: left;width: 300px;height: 37px;"><div style="width:55px;margin:10px 26px;"><p style="font-size:14px;width:200px;">'+financePayFlowStatement.bs_payerName+'</p></div></div>';
								html += '  </div>';
								html += '  <div style="display:flex;">';
								html += '    <div style="color: #878787;border-width: 0px;border-style: solid;text-align: left;line-height: 20px;float: left;width: 100px;height: 37px;"><div style="width:55px;margin:10px 26px;"><p style="font-size:14px;width: 100px;">'+"联系信息"+'</p></div></div>';
								html += '    <div style="left: 103px;top: 102px;background-color: transparent;font-size: 14.0px;padding: 0px;border-radius: 0px;border-width: 0px;float: left;width: 300px;height: 37px;"><div style="width:55px;margin:10px 26px;"><p style="font-size:14px;width:200px;">'+financePayFlowStatement.payer_phone+'</p></div></div>';
								html += '  </div>';
								html += '  <div style="display:flex;">';
								html += '    <div style="color: #878787;border-width: 0px;border-style: solid;text-align: left;line-height: 20px;float: left;width: 100px;height: 37px;"><div style="width:55px;margin:10px 26px;"><p style="font-size:14px;width: 100px;">'+"小区房号"+'</p></div></div>';
								html += '    <div style="left: 103px;top: 102px;background-color: transparent;font-size: 14.0px;padding: 0px;border-radius: 0px;border-width: 0px;float: left;width: 300px;height: 37px;"><div style="width:55px;margin:10px 26px;"><p style="font-size:14px;width:200px;">'+financePayFlowStatement.house_address+'</p></div></div>';
								html += '  </div>';
								html += '  <div style="display:flex;">';
								html += '    <div style="color: #878787;border-width: 0px;border-style: solid;text-align: left;line-height: 20px;float: left;width: 100px;height: 37px;"><div style="width:55px;margin:10px 26px;"><p style="font-size:14px;width: 100px;">'+"房屋管家"+'</p></div></div>';
								html += '    <div style="left: 103px;top: 102px;background-color: transparent;font-size: 14.0px;padding: 0px;border-radius: 0px;border-width: 0px;float: left;width: 300px;height: 37px;"><div style="width:55px;margin:10px 26px;"><p style="font-size:14px;width:200px;">'+userCenter.em_name+'&nbsp;/&nbsp;'+userCenter.em_phone+'</p></div></div>';
								html += '  </div>';
								html += '</div>';
								
								html += '<ul class="title-nav" style="border-bottom: 1px solid #878787;width: 88%;margin-left: 10px;">';
								html += '	<li class="visited" style="font-size: 17px;">' + "定单信息";
								html += '	</li>';
								html += '</ul>';
								html += '<div>';
								if (financePayFlowStatement.bco_orderType == 4) {
									html += '  <div style="display:flex;">';
									html += '    <div style="color: #878787;border-width: 0px;border-style: solid;text-align: left;line-height: 20px;float: left;width: 100px;height: 37px;"><div style="width:55px;margin:10px 26px;"><p style="font-size:14px;">'+"订单类型"+'</p></div></div>';
									html += '    <div style="left: 103px;top: 102px;background-color: transparent;font-size: 14.0px;padding: 0px;border-radius: 0px;border-width: 0px;float: left;width: 300px;height: 37px;"><div style="width:55px;margin:10px 26px;"><p style="font-size:14px;width:200px;">'+"定金订单"+'</p></div></div>';
									html += '  </div>';
								}
								html += '  <div style="display:flex;">';
								html += '    <div style="color: #878787;border-width: 0px;border-style: solid;text-align: left;line-height: 20px;float: left;width: 100px;height: 37px;"><div style="width:55px;margin:10px 26px;"><p style="font-size:14px;width: 100px;">'+"商户订单号"+'</p></div></div>';
								html += '    <div style="left: 103px;top: 102px;background-color: transparent;font-size: 14.0px;padding: 0px;border-radius: 0px;border-width: 0px;float: left;width: 300px;height: 37px;"><div style="width:55px;margin:10px 26px;"><p style="font-size:14px;width:200px;">'+financePayFlowStatement.bs_orderNumber+'</p></div></div>';
								html += '  </div>';
								html += '  <div style="display:flex;">';
								html += '    <div style="color: #878787;border-width: 0px;border-style: solid;text-align: left;line-height: 20px;float: left;width: 100px;height: 37px;"><div style="width:55px;margin:10px 26px;"><p style="font-size:14px;width: 100px;">'+"定金金额"+'</p></div></div>';
								html += '    <div style="left: 103px;top: 102px;background-color: transparent;font-size: 14.0px;padding: 0px;border-radius: 0px;border-width: 0px;float: left;width: 300px;height: 37px;"><div style="width:55px;margin:10px 26px;"><p id="bs_money" style="font-size:14px;width:200px;">'+fmoney(financePayFlowStatement.bs_money,2)+'&nbsp;&nbsp;元</p></div></div>';
								html += '  </div>';
								html += '  <div style="display:flex;">';
								html += '    <div style="color: #878787;border-width: 0px;border-style: solid;text-align: left;line-height: 20px;float: left;width: 100px;height: 37px;"><div style="width:55px;margin:10px 26px;"><p style="font-size:14px;width: 100px;">'+"支付方式"+'</p></div></div>';
								html += '    <div style="left: 103px;top: 102px;background-color: transparent;font-size: 14.0px;padding: 0px;border-radius: 0px;border-width: 0px;float: left;width: 300px;height: 37px;"><div style="width:55px;margin:10px 26px;"><p style="font-size:14px;width:200px;">'+financePayFlowStatement.bs_payType+'</p></div></div>';
								html += '  </div>';
								html += '  <div style="display:flex;">';
								html += '    <div style="color: #878787;border-width: 0px;border-style: solid;text-align: left;line-height: 20px;float: left;width: 100px;height: 37px;"><div style="width:55px;margin:10px 26px;"><p style="font-size:14px;width: 100px;">'+"支付状态"+'</p></div></div>';
								if (financePayFlowStatement.bs_state == 1) {
									html += '    <div style="left: 103px;top: 102px;background-color: transparent;font-size: 14.0px;padding: 0px;border-radius: 0px;border-width: 0px;float: left;width: 300px;height: 37px;"><div style="width:55px;margin:10px 26px;"><p style="font-size:14px;width:200px;">'+"代付款"+'</p></div></div>';
								} else if (financePayFlowStatement.bs_state == 2) {
									html += '    <div style="left: 103px;top: 102px;background-color: transparent;font-size: 14.0px;padding: 0px;border-radius: 0px;border-width: 0px;float: left;width: 300px;height: 37px;"><div style="width:55px;margin:10px 26px;"><p style="font-size:14px;width:200px;">'+"已付款"+'</p></div></div>';
								} else {
									html += '    <div style="left: 103px;top: 102px;background-color: transparent;font-size: 14.0px;padding: 0px;border-radius: 0px;border-width: 0px;float: left;width: 300px;height: 37px;"><div style="width:55px;margin:10px 26px;"><p style="font-size:14px;width:200px;">'+"已取消 "+'</p></div></div>';
								}
								html += '  </div>';
								html += '  <div style="display:flex;">';
								html += '    <div style="color: #878787;border-width: 0px;border-style: solid;text-align: left;line-height: 20px;float: left;width: 100px;height: 37px;"><div style="width:55px;margin:10px 26px;"><p style="font-size:14px;width: 100px;">'+"支付日期"+'</p></div></div>';
								html += '    <div style="left: 103px;top: 102px;background-color: transparent;font-size: 14.0px;padding: 0px;border-radius: 0px;border-width: 0px;float: left;width: 300px;height: 37px;"><div style="width:55px;margin:10px 26px;"><p style="font-size:14px;width:200px;">'+format(financePayFlowStatement.bs_createTime,'yyyy-MM-dd HH:mm:ss')+'</p></div></div>';
								html += '  </div>';
								html += '  <div style="display:flex;">';
								html += '    <div style="color: #878787;border-width: 0px;border-style: solid;text-align: left;line-height: 20px;float: left;width: 100px;height: 37px;"><div style="width:55px;margin:10px 26px;"><p style="font-size:14px;width: 100px;">'+"逾期日期"+'</p></div></div>';
								html += '    <div style="left: 103px;top: 102px;background-color: transparent;font-size: 14.0px;padding: 0px;border-radius: 0px;border-width: 0px;float: left;width: 300px;height: 37px;"><div style="width:55px;margin:10px 26px;"><p style="font-size:14px;width:200px;">'+format(financePayFlowStatement.bco_invalidTime,'yyyy-MM-dd')+'</p></div></div>';
								html += '  </div>';
								html += '</div>';
								
								html += '<ul class="title-nav" style="border-bottom: 1px solid #878787;width: 88%;margin-left: 10px;">';
								html += '	<li class="visited">' + "处理信息";
								html += '	</li>';
								html += '</ul>';
								html += '<div>';
								var state='';
								if (!isEmpty(billPayResult)) {
									for (var i=0;i<billPayResult.length;i++) {
										if (billPayResult[i].fr_state == 1) {
											state ='不退定金';
											html+='<p style="margin: 12px 15px;">'+format(billPayResult[i].fr_time,'yyyy-MM-dd HH:mm:ss')+'&nbsp;&nbsp;&nbsp;&nbsp;'+returnValue(billPayResult[i].em_name)+'&nbsp;&nbsp;&nbsp;&nbsp;'+state+'&nbsp;&nbsp;&nbsp;&nbsp;'+returnValue(billPayResult[i].fr_content)+'</p>';
										} else if (billPayResult[i].fr_state == 2) {
											state ='退定金';
											html+='<p style="margin: 12px 15px;">'+format(billPayResult[i].fr_time,'yyyy-MM-dd HH:mm:ss')+'&nbsp;&nbsp;&nbsp;&nbsp;'+returnValue(billPayResult[i].em_name)+'&nbsp;&nbsp;&nbsp;&nbsp;'+state+'&nbsp;&nbsp;&nbsp;&nbsp;'+fmoney(billPayResult[i].fr_money,2)+'元&nbsp;&nbsp;&nbsp;&nbsp;'+returnValue(billPayResult[i].fr_content)+'</p>';
										} else if (billPayResult[i].fr_state == 3) {
											state ='通过退定金';
											html+='<p style="margin: 12px 15px;">'+format(billPayResult[i].fr_time,'yyyy-MM-dd HH:mm:ss')+'&nbsp;&nbsp;&nbsp;&nbsp;'+returnValue(billPayResult[i].em_name)+'&nbsp;&nbsp;&nbsp;&nbsp;'+state+'&nbsp;&nbsp;&nbsp;&nbsp;'+fmoney(billPayResult[i].fr_money,2)+'元&nbsp;&nbsp;&nbsp;&nbsp;'+returnValue(billPayResult[i].fr_content)+'</p>';
										}
									}
								}
								html += '</div>';
								
//								if (isEmpty(billPayResult) && user.ucc_id != 23 && financePayFlowStatement.bs_state == 2) {
//									html += '<div style="display: grid;float: left;">';
//									html += '  <div class="suer-button" style="float:left;margin: 12px 15px;">';
//									html += '     <button type="butten" class="finish-butten" id="reject" style="background-color:#f2893d">违约处理</button>';
//									html += '  </div>';
//									html += '  <div class="radio_div" style="float: left;margin-left: 25px;display:none;">';
//									html += '     <p style="font-size:15px;">'+"是否退定金？"+'</p>';
//									html += '     <div class="peopleImg" style="margin: 10px auto;">';
//									html += '       <label class="label-noMoney"><input type="radio" name="state" value="1">&nbsp;&nbsp;不退款</label>';
//									html += '       <label class="label-money" style="margin-left:35px;"><input type="radio" name="state" value="2">&nbsp;&nbsp;退款</label>';
//									html += '     </div>';
//									html += '	  <div class="money" style="display: none;">';
//									html += '	  		<input type="text" id="money"  style="float:left;width: 115px;height: 27px;margin-left: 1px;border: 1px solid;" placeholder="请输入退款金额"><p style="margin-left: 15px;margin-top: 5px;float: left;">'+"最多输入"+fmoney(financePayFlowStatement.bs_money,2)+'&nbsp;元</p>';
//									html += '     </div>';
//									html += '  </div>';
//									html += '  <div class="button-div" style="font-size: 14px;margin-left:25px;float:left;display:none;">';
//									html += '     <p style="width:150px;margin-bottom: 6px;float: left;">退款原因：</P>';
//									html += '     <div>';
//									html += '        <textarea class="textarea" style="width:220px;height:80px;"></textarea>';
//									html += '     </div>';
//									html += '     <button type="butten" class="finish-butten" id="close" style="background-color:red">关闭</button>';
//									html += '     <button type="butten" class="finish-butten" id="suer" style="background-color:#18bc9c">提交</button>';
//									html += '  </div>';
//									html += '</div>';
//							}
								var stat='';
								if (!isEmpty(billPayResult)) {
									for (var i=0;i<billPayResult.length;i++) {
										stat=billPayResult[i].fr_state; 
									}
									    if (user.ucc_id == 23 && stat == 2 && stat != 3  && financePayFlowStatement.bs_state == 2 && contractObjectCode == 1) {
									    	html += '<div style="display: grid;float: left;">';
											html += '  <div class="suer-button" style="float:left;margin: 12px 15px;">';
											html += '     <button type="butten" class="finish-butten" id="noAgree" style="background-color:#f2893d">不同意</button>';
											html += '     <button type="butten" class="finish-butten" id="agree" style="background-color:#18bc9c">同意</button>';
											html += '  </div>';
											html += '  <div class="radio_div" style="float: left;margin-left: 25px;display:none;">';
									        html += '	  <input type="text" id="money" style="float:left;width: 115px;height: 27px;margin-left: 1px;display:none;border: 1px solid;" placeholder="请输入退款金额"><p style="margin-left: 15px;margin-top: 5px;float: left;">'+"最多输入"+fmoney(financePayFlowStatement.bs_money,2)+'&nbsp;元</p>';
											html += '  </div>';
											html += '  <div class="button-div" style="font-size: 14px;margin-left:15px;float:left;display:none;">';
									        html += '     <p style="width:150px;margin-bottom: 6px;float: left;">原因：</P>';
										    html += '     <div>';
										    html += '        <textarea class="textarea" style="width:220px;height:80px;resize:none"></textarea>';
										    html += '     </div>';
										    html += '     <button type="butten" class="finish-butten" id="close" style="background-color:red">关闭</button>';
										    html += '     <button type="butten" class="finish-butten" id="financeOk" style="background-color:#18bc9c">提交</button>';
										    html += '  </div>';
										    html += '  <div class="button" style="font-size: 14px;margin-left:15px;float:left;display:none;">';
										    html += '     <button type="butten" class="finish-butten" id="close" style="background-color:red">关闭</button>';
										    html += '     <button type="butten" class="finish-butten" id="financeOk" style="background-color:#18bc9c">提交</button>';
										    html += '  </div>';
										    html += '</div>';
							    	}
							}
								
						$("#contract-title").html(html);
				});
			};

			_this.init();
		});
	};
})($, document);

// 关闭处理原因
$(document).on('click','#close',function(){
	$('.button-div').hide();
	$('.radio_div').hide();
	$('.money').hide();
	$('.button').hide();
	$('.textarea').val('');
	$("input[type='radio']").removeAttr('checked');
	$('#money').val('');
})
//财务
//不同意
$(document).on('click','#noAgree',function(){
	$('.button-div').show();
	$('.radio_div').hide();
//	$('.money').hide();
	$('.button').hide();
})
//同意
$(document).on('click','#agree',function(){
	$('.radio_div').show();
	$('.button').show();
	$('#money').show();
	$('.button-div').hide();
})
//违约处理关闭
$(document).on('click','.close-button',function(){
	$('.expense').removeClass('is-visible3');
	$('.radio-div').empty();
})
//财务审核
var arr={};
$(document).on('click','#financeOk',function(){
		arr.fr_content=$('.textarea').val();
		arr.fr_bsId=$('.bs_id').val();  //流水记录id
		var state='';
		arr.fr_money=$('#money').val();  //退款金额
		if (eval($('#money').val()) > eval($('#bs_money').text())) {
			$.jBox.tip("应退定金与实际定金不符","error");
			return false;
		}
		if ($('#money').val() == '') {   //财务不通过
			state=1;
		}
		if (state == '') {   //财务通过
			state=3
		}
		arr.fr_state=state;
		if (state ==1 && $('.textarea').val() == '') {
			$.jBox.tip("填写原因不能为空","error");
			return false;
		}
		$('.expense').addClass('is-visible3');
		var html='';
		if (state == 1) {
			html+='<label id="typee" class="label active">不同意</label>';
		} else {
			html+='<label id="typee" class="label active">同意 </label>';
			html+='<i style="font-style: normal;margin-left: 19px;font-size: 15px;">金额 ：'+$('#money').val()+'</i>';
		}
		$('.radio-div').append(html);
		if (state == 1) {
			$('#text').text($('.textarea').val());
		} else {
			$('.title-div').hide();
			$('.div-textarea').hide();
		}
})
//确定提交
$(document).on('click','.sumbit-button',function(){
	$.ajax({
		url : "/financeManage/financeAgree?result="+encodeURI(JSON.stringify(arr)),
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