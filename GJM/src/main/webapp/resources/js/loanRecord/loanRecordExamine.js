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
	cno = getQueryString("bm_id");
}

/** 处理结果*/
function loading(){
	// 查询处理结果
	$.ajax({
		type : "POST",
		url: "/loanRecord/examine",
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
				//借款信息
				contractObject=data.LoanRecord;
				//合同编号
				userCustomer=data.userCustomer;
				//身份信息
				certificstes=data.certificstes;
				//银行信息
				band=data.band;
				//处理信息
				resultList=data.resultList;
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
					url : "/loanRecord/examine",
					data : opts.data,
					dataType : "json"
				}).done(function(result) {
					if (result.code != 200) {
						return;
					}
					data = result.data;
					//借款信息
					contractObject=data.LoanRecord;
					//合同编号
					userCustomer=data.userCustomer;
					//身份信息
					certificstes=data.certificstes;
					//银行信息
					band=data.band;
					//处理信息
					resultList=data.resultList;
					
						var html = '';
							if (contractObject.bm_loan_state == 2 ) {
								html += '<ul class="title-nav" style="border-bottom: 1px solid #efefef;width: 98%;margin-left: 10px;">';
								html += '	<li class="visited">' + "借款信息";
								html += '	</li>';
								html += '</ul>';
								html += '<input type="hidden" class="bm_userId" value='+contractObject.bm_userId+'>';  //申请人id
								html += '<input type="hidden" class="bm_id" value='+contractObject.bm_id+'>';  //借款记录id
								html += '<div class="div-list">';
								html += '	<dl>';
								html += '	   <dt>申请人</dt>';
                                html += '		<dd>'+contractObject.bm_name+'</dd>';
								html += '	</dl>';
                                html += '	<dl>';
                                html += '	   <dt>身份证号</dt>';
                                html += '		<dd>'+contractObject.bm_numCard+'</dd>';
                                html += '	</dl>';
                                html += '	<dl>';
                                html += '	   <dt>联系信息</dt>';
                                html += '		<dd>'+contractObject.bm_phone+'</dd>';
                                html += '	</dl>';
                                html += '	<dl>';
                                html += '	   <dt>借款金额</dt>';
                                html += '		<dd>'+fmoney(contractObject.bm_monery,2)+'&nbsp;&nbsp;元</dd>';
                                html += '	</dl>';
                                html += '	<dl>';
                                html += '	   <dt>借款用途</dt>';
                                html += '		<dd>'+contractObject.bm_purpose+'</dd>';
                                html += '	</dl>';
                                html += '	<dl>';
                                html += '   <dt>借款期限</dt>';
                                html += '		<dd>'+contractObject.bm_days+'天</dd>';
                                html += '	</dl>';
                                html += '	<dl>';
                                html += '	   <dt>租约信息</dt>';
                                html += '		<dd><a class="lookBook" style="color:#3aa4f0;text-decoration:underline;cursor:pointer;">'+"去查看"+'</a></dd>';
                                html += '	</dl>';
                                html += '	<dl>';
                                html += '	   <dt>申请时间</dt>';
                                html += '		<dd>'+format(contractObject.bm_apply_time,'yyyy-MM-dd HH:mm:ss')+'</dd>';
                                html += '	</dl>';
								html += '</div>';
								html += '<div style="margin-left:27px;margin-top:20px;"><p style="font-size:15px;">'+"借款信息与租约信息是否正常？"+'</p></div>';
								html += '<div class="loanSuer" style="margin:20px 30px;">';
								html += '<label><input type="radio" name="sure" value="1" checked="checked" disabled="disabled">&nbsp;&nbsp;正常</label>';
								html += '<label style="margin-left:35px;"><input type="radio" name="sure" value="2" checked="checked" disabled="disabled">&nbsp;&nbsp;不正常</label>';
								html += '</div>';
								
								html += '<ul class="title-nav" style="border-bottom: 1px solid #efefef;width: 98%;margin-left: 10px;">';
								html += '	<li class="visited">' + "身份信息";
								html += '	</li>';
								html += '</ul>';
								html += '<div class="cardImg" style="margin-top:30px;margin-left:34px;">';
								html += '  <div style="float: left;margin-right: 80px;">';
								html += '    <img style="width:200px;height:200px;" src='+certificstes.cd_peopleImg+'>';
								html += '    <p style="font-size:15px;">'+"申请人照片是否和证件相符？"+'</p>';
						        html += '    <div class="peopleImg" style="margin: 10px 10px;">';
						        html += '    <label><input type="radio" name="peopleImg" value="1" disabled="disabled">&nbsp;&nbsp;符合</label>';
						        html += '    <label style="margin-left:35px;"><input type="radio" name="peopleImg" value="2" disabled="disabled">&nbsp;&nbsp;不符合</label>';
						        html += '    </div>';
								html += '  </div>';
								html += '  <div style="float: left;margin-right: 80px;">';
								html += '    <img style="width:200px;height:200px;" src='+certificstes.cd_idCard+'>';
								html += '    <p style="font-size:15px;">'+"身份证正面信息是否真实有效？"+'</p>';
								html += '    <div class="idCard" style="margin: 10px 10px;">';
								html += '    <label><input type="radio" name="idCard" value="1" disabled="disabled">&nbsp;&nbsp;符合</label>';
								html += '    <label style="margin-left:35px;"><input type="radio" name="idCard" value="2" disabled="disabled">&nbsp;&nbsp;不符合</label>';
								html += '    </div>';
								html += '  </div>';
								html += '  <div style="float: left;margin-right: 80px;">';
								html += '    <img style="width:200px;height:200px;" src='+certificstes.cd_idCard_side+'>';
								html += '    <p style="font-size:15px;">'+"身份证反面信息是否真实有效？"+'</p>';
								html += '    <div class="idCard_side" style="margin: 10px 10px;">';
								html += '    <label><input type="radio" name="idCard_side" value="1" disabled="disabled">&nbsp;&nbsp;符合</label>';
								html += '    <label style="margin-left:35px;"><input type="radio" name="idCard_side" value="2" disabled="disabled">&nbsp;&nbsp;不符合</label>';
								html += '    </div>';
								html += '  </div>';
								html += '</div >';
								
								html += '<ul class="title-nav" style="float:left;border-bottom: 1px solid #efefef;width: 98%;margin-left: 10px;">';
								html += '	<li class="visited">' + "银行信息";
								html += '	</li>';
								html += '</ul>';
								html += '<div style="float:left;">';
								html += ' 		<div class="div-list"> ';
                                html += '			<dl>';
                                html += '			   <dt>所属银行</dt>';
                                html += '				<dd class="band">'+band.bd_band+'<img src='+band.bd_bandImg+' style="width:60px;height:25px;margin-left:15px;"></dd>';
                                html += '			</dl>';
                                html += '			<dl>';
                                html += '			   <dt>银行账号</dt>';
                                html += '				<dd>'+band.bd_number+'</dd>';
                                html += '			</dl>';
                                html += ' 		</div>';
								html += '    <div style="margin-left:27px;margin-top:20px;">';
								html += '    <p style="font-size:15px;">'+"银行卡照片与银行账号相同？"+'</p>';
								html += '    <div class="band" style="margin: 10px 10px;">';
								html += '    	<label><input type="radio" name="band" value="1" disabled="disabled">&nbsp;&nbsp;符合</label>';
								html += '    	<label style="margin-left:35px;"><input type="radio" name="band" value="2" disabled="disabled">&nbsp;&nbsp;不符合</label>';
								html += '    </div>';
								html += '	 </div>';
								html += '</div>';
								html += '<ul class="title-nav" style="float:left;border-bottom: 1px solid #efefef;width: 98%;margin-left: 10px;">';
								html += '	<li class="visited">' + "处理信息";
								html += '	</li>';
								html += '</ul>';
								html += '<div style="float:left;">';
								var state='';
								if (!isEmpty(resultList)) {
									for (var i=0;i<resultList.length;i++) {
										if (resultList[i].lh_state == 1) {
											state ='拒绝';
										} else if (resultList[i].lh_state == 2) {
											state ='通过';
										} 
										html+='<p style="margin: 12px 15px;">'+format(resultList[i].lh_time,'yyyy-MM-dd HH:mm:ss')+'&nbsp;&nbsp;&nbsp;&nbsp;'+returnValue(resultList[i].em_name)+'&nbsp;&nbsp;&nbsp;&nbsp;'+state+'&nbsp;&nbsp;&nbsp;&nbsp;'+returnValue(resultList[i].lh_content)+'</p>';
									}
								}
								html += '</div>';
							} else {
								html += '<ul class="title-nav" style="border-bottom: 1px solid #efefef;width: 98%;margin-left: 10px;">';
								html += '	<li class="visited">' + "借款信息";
								html += '	</li>';
								html += '</ul>';
								html += '<input type="hidden" class="bm_userId" value='+contractObject.bm_userId+'>';  //申请人id
								html += '<input type="hidden" class="bm_id" value='+contractObject.bm_id+'>';  //借款记录id
                                html += '<div class="div-list">';
                                html += '	<dl>';
                                html += '	   <dt>申请人</dt>';
                                html += '		<dd>'+contractObject.bm_name+'</dd>';
                                html += '	</dl>';
                                html += '	<dl>';
                                html += '	   <dt>身份证号</dt>';
                                html += '		<dd>'+contractObject.bm_numCard+'</dd>';
                                html += '	</dl>';
                                html += '	<dl>';
                                html += '	   <dt>联系信息</dt>';
                                html += '		<dd>'+contractObject.bm_phone+'</dd>';
                                html += '	</dl>';
                                html += '	<dl>';
                                html += '	   <dt>借款金额</dt>';
                                html += '		<dd>'+fmoney(contractObject.bm_monery,2)+'&nbsp;&nbsp;元</dd>';
                                html += '	</dl>';
                                html += '	<dl>';
                                html += '	   <dt>借款用途</dt>';
                                html += '		<dd>'+contractObject.bm_purpose+'</dd>';
                                html += '	</dl>';
                                html += '	<dl>';
                                html += '   <dt>借款期限</dt>';
                                html += '		<dd>'+contractObject.bm_days+'天</dd>';
                                html += '	</dl>';
                                html += '	<dl>';
                                html += '	   <dt>租约信息</dt>';
                                html += '		<dd><a class="lookBook" style="color:#3aa4f0;text-decoration:underline;cursor:pointer;">'+"去查看"+'</a></dd>';
                                html += '	</dl>';
                                html += '	<dl>';
                                html += '	   <dt>申请时间</dt>';
                                html += '		<dd>'+format(contractObject.bm_apply_time,'yyyy-MM-dd HH:mm:ss')+'</dd>';
                                html += '	</dl>';
                                html += '</div>';
								html += '<div style="margin-left:27px;margin-top:20px;"><p style="font-size:15px;">'+"借款信息与租约信息是否正常？"+'</p></div>';
								html += '<div class="loanSuer" style="margin:20px 30px;">';
								html += '<label><input type="radio" name="sure" value="1" checked="checked">&nbsp;&nbsp;正常</label>';
								html += '<label style="margin-left:35px;"><input type="radio" name="sure" value="2" checked="checked">&nbsp;&nbsp;不正常</label>';
								html += '</div>';
								
								html += '<ul class="title-nav" style="border-bottom: 1px solid #efefef;width: 98%;margin-left: 10px;">';
								html += '	<li class="visited">' + "身份信息";
								html += '	</li>';
								html += '</ul>';
								html += '<div class="cardImg" style="margin-top:30px;margin-left:34px;">';
								html += '  <div style="float: left;margin-right: 80px;">';
								html += '    <img src='+certificstes.cd_peopleImg+'>';
								html += '    <p style="font-size:15px;">'+"申请人照片是否和证件相符？"+'</p>';
						        html += '    <div class="peopleImg" style="margin: 10px 10px;">';
						        html += '    <label><input type="radio" name="peopleImg" value="1">&nbsp;&nbsp;符合</label>';
						        html += '    <label style="margin-left:35px;"><input type="radio" name="peopleImg" value="2">&nbsp;&nbsp;不符合</label>';
						        html += '    </div>';
								html += '  </div>';
								html += '  <div style="float: left;margin-right: 80px;">';
								html += '    <img src='+certificstes.cd_idCard+'>';
								html += '    <p style="font-size:15px;">'+"身份证正面信息是否真实有效？"+'</p>';
								html += '    <div class="idCard" style="margin: 10px 10px;">';
								html += '    <label><input type="radio" name="idCard" value="1">&nbsp;&nbsp;符合</label>';
								html += '    <label style="margin-left:35px;"><input type="radio" name="idCard" value="2">&nbsp;&nbsp;不符合</label>';
								html += '    </div>';
								html += '  </div>';
								html += '  <div style="float: left;margin-right: 80px;">';
								html += '    <img src='+certificstes.cd_idCard_side+'>';
								html += '    <p style="font-size:15px;">'+"身份证反面信息是否真实有效？"+'</p>';
								html += '    <div class="idCard_side" style="margin: 10px 10px;">';
								html += '    <label><input type="radio" name="idCard_side" value="1">&nbsp;&nbsp;符合</label>';
								html += '    <label style="margin-left:35px;"><input type="radio" name="idCard_side" value="2">&nbsp;&nbsp;不符合</label>';
								html += '    </div>';
								html += '  </div>';
								html += '</div>';
								
								html += '<ul class="title-nav" style="float:left;border-bottom: 1px solid #efefef;width: 98%;margin-left: 10px;">';
								html += '	<li class="visited">' + "银行信息";
								html += '	</li>';
								html += '</ul>';
								html += '<div style="float:left;">';
                                html += ' 		<div class="div-list"> ';
                                html += '			<dl>';
                                html += '			   <dt>所属银行</dt>';
                                html += '				<dd class="band">'+band.bd_band+'<img src='+band.bd_bandImg+' style="width:60px;height:25px;margin-left:15px;"></dd>';
                                html += '			</dl>';
                                html += '			<dl>';
                                html += '			   <dt>银行账号</dt>';
                                html += '				<dd>'+band.bd_number+'</dd>';
                                html += '			</dl>';
                                html += ' 		</div>';
								html += '    <div style="margin-left:27px;margin-top:20px;">';
								html += '    <p style="font-size:15px;">'+"银行卡照片与银行账号相同？"+'</p>';
								html += '    <div class="band" style="margin: 10px 10px;">';
								html += '    	<label><input type="radio" name="band" value="1">&nbsp;&nbsp;符合</label>';
								html += '    	<label style="margin-left:35px;"><input type="radio" name="band" value="2">&nbsp;&nbsp;不符合</label>';
								html += '	 </div>';
								html += '</div>';
								html += '<ul class="title-nav" style="float:left;border-bottom: 1px solid #efefef;width: 98%;margin-left: 10px;">';
								html += '	<li class="visited">' + "处理信息";
								html += '	</li>';
								html += '</ul>';
								html += '<div style="float:left;">';
								var state='';
								if (!isEmpty(resultList)) {
									for (var i=0;i<resultList.length;i++) {
										if (resultList[i].lh_state == 1) {
											state ='拒绝';
										} else if (resultList[i].lh_state == 2) {
											state ='通过';
										} 
										html+='<p style="margin: 12px 15px;">'+format(resultList[i].lh_time,'yyyy-MM-dd HH:mm:ss')+'&nbsp;&nbsp;&nbsp;&nbsp;'+returnValue(resultList[i].em_name)+'&nbsp;&nbsp;&nbsp;&nbsp;'+state+'&nbsp;&nbsp;&nbsp;&nbsp;'+returnValue(resultList[i].lh_content)+'</p>';
									}
								}
								html += '</div>';
								if (contractObject.bm_loan_state !=3 ) {
									html += '<ul class="title-nav" style="float:left;border-bottom:1px solid #878787;width:88%;margin-left:10px;">';
									html += '	<li class="visited">' + "借款处理";
									html += '	</li>';
									html += '</ul>';
									html += '<div style="float:left;">';
									html += '<div class="suer-button" style="float:left;">';
									html += '   <button type="butten" class="finish-butten" id="reject" style="background-color:#f2893d">拒绝</button>';
									html += '   <button type="butten" class="finish-butten" id="pass" style="background-color:#3aa4f0">通过</button>';
									html += '</div>';
									
									html += '<div class="button-div" style="font-size: 14px;margin-left:10px;display:none;">';
									html += '<p style="width:150px;margin-bottom: 6px;">拒绝原因：</P>';
									html += '<div>';
									html += '<textarea class="textarea" style="width:220px;height:80px;"></textarea>';
									html += '</div>';
									html += '<button type="butten" class="finish-butten" id="refuseSuer" style="background-color:#3aa4f0">确认拒绝</button>';
									html += '</div>';
									html +='<input type="hidden" class="bm_userState" value='+contractObject.bm_userState+'>';
									html+='<div class="div" style="font-size: 14px;margin-left:10px;display:none">';
									html+='<div>';
									html+='<select class="seelct-div" style="float:left;width: 100px;height: 30px;" >';
									html+='    <option>选择审核人</option>';
									html+='    <option value="1">第三方</option>';
									html+='    <option value="2">公司</option>';
									html+='</select>';
									html+='<div>';
									html+='<button type="butten" class="suer-butten" style="background-color:#3aa4f0;float:left;font-size: 15px;width: 81px;margin-left:20px;border-radius: 6px;line-height: initial;text-align:center;height:30px;margin-top:15px;">确认通过</button>';
									html+='</div>';
									html+='</div>';
									html+='</div>';
									html+='</div>';
								}
							}
						$("#contract-title").html(html);
						
					$('.cardImg').viewer();
					$('.band').viewer();
					//借款信息信息状态
					$('.loanSuer input').each(function () {
						if ($(this).val() == contractObject.bm_state) {
							$(this).attr("checked",'checked');
						}
					});
					//身份信息状态
					$('.peopleImg input').each(function () {
						if ($(this).val() == certificstes.cd_peopleImg_state) {
							$(this).attr("checked",'checked');
						}
					});
					$('.idCard input').each(function () {
						if ($(this).val() == certificstes.cd_idCard_state) {
							$(this).attr("checked",'checked');
						}
					});
					$('.idCard_side input').each(function () {
						if ($(this).val() == certificstes.cd_idCard_side_state) {
							$(this).attr("checked",'checked');
						}
					});
					//银行信息状态
					$('.band input').each(function () {
						if ($(this).val() == band.bd_state) {
							$(this).attr("checked",'checked');
						}
					});
					
					//合同预览
					$(document).on('click','.lookBook',function(){
						for (var i=0;i<userCustomer.length;i++) {
							window.top.href_mo("/contractObject/contractPreview?con_code=" + userCustomer[i].contractObject_code + "&con_type=" + (contractObject.bm_userState == 1 ? "zl" : "tg" ) + "&con_uses=preview&con_where=pc", '合同预览', "合同详情"); //1:租客
						}
					})
					
				  //银行卡 账号	
			      var $this = $('.number');
			      v = $this.html();
			      /\S{5}/.test(v) && $this.html(v.replace(/\s/g,'').replace(/(.{4})/g, "$1 "));
		
				});
			};

			_this.init();
		});
	};
})($, document);

//拒绝
$(document).on('click','#reject',function(){
	$('.button-div').show();
	$('.div').hide();
});
//通过
$(document).on('click','#pass',function(){
	var userId=$('.bm_userId').val();
	var nid=$('.bm_id').val();
	$('.button-div').hide();
	if ($('.bm_userState').val() == 2) {  //房东
		$('.div').show();
	} else {   //租客
		var userId=$('.bm_userId').val();
		var nid=$('.bm_id').val();
		var sure=$('input:radio[name="sure"]:checked').val();  //借款信息判断
		var peopleImg=$('input:radio[name="peopleImg"]:checked').val(); //申请人判断
		var idCard=$('input:radio[name="idCard"]:checked').val();    //身份证正面信息判断
		var idCard_side=$('input:radio[name="idCard_side"]:checked').val();   //身份证反面信息判断
		var band=$('input:radio[name="band"]:checked').val();   //银行卡信息判断
		var content=$('.textarea').val();
		if (sure ==2 || peopleImg ==2 || idCard == 2 || idCard_side == 2 || band ==2) {
			$.jBox.tip("符合状态才能通过","error");
			return false;
		}
		$.ajax({
			url : "/loanRecord/sureExamine",
			type : "POST",
			data : {userId:userId,nid:nid,sure:sure,peopleImg:peopleImg,idCard:idCard,idCard_side:idCard_side,band:band,content:content},
			dataType : "json",
			success:function(data){
				location.reload();
			},
			error:function(){
				$.jBox.tip(data.msg,"error");
			}
		})
	}
});
//确认拒绝
$(document).on('click','#refuseSuer',function (){
	var userId=$('.bm_userId').val();
	var nid=$('.bm_id').val();
	var sure=$('input:radio[name="sure"]:checked').val();  //借款信息判断
	var peopleImg=$('input:radio[name="peopleImg"]:checked').val(); //申请人判断
	var idCard=$('input:radio[name="idCard"]:checked').val();    //身份证正面信息判断
	var idCard_side=$('input:radio[name="idCard_side"]:checked').val();   //身份证反面信息判断
	var band=$('input:radio[name="band"]:checked').val();   //银行卡信息判断
	var content=$('.textarea').val();
	$.ajax({
		url : "/loanRecord/updateExamine",
		type : "POST",
		data : {userId:userId,nid:nid,sure:sure,peopleImg:peopleImg,idCard:idCard,idCard_side:idCard_side,band:band,content:content},
		dataType : "json",
		success:function(data){
			location.reload();
		},
		error:function(){
			$.jBox.tip(data.msg,"error");
		}
	})
})

//确认通过
$(document).on('click','.suer-butten',function(){
	var select=$('.seelct-div option:selected').val();
	var userId=$('.bm_userId').val();
	var nid=$('.bm_id').val();
	var sure=$('input:radio[name="sure"]:checked').val();  //借款信息判断
	var peopleImg=$('input:radio[name="peopleImg"]:checked').val(); //申请人判断
	var idCard=$('input:radio[name="idCard"]:checked').val();    //身份证正面信息判断
	var idCard_side=$('input:radio[name="idCard_side"]:checked').val();   //身份证反面信息判断
	var band=$('input:radio[name="band"]:checked').val();   //银行卡信息判断
	var content=$('.textarea').val();
	if (sure ==2 || peopleImg ==2 || idCard == 2 || idCard_side == 2 || band ==2) {
		$.jBox.tip("符合状态才能通过","error");
		return false;
	}
	$.ajax({
		url : "/loanRecord/sureExamine",
		type : "POST",
		data : {userId:userId,nid:nid,sure:sure,peopleImg:peopleImg,idCard:idCard,idCard_side:idCard_side,band:band,content:content,select:select},
		dataType : "json",
		success:function(data){
			location.reload();
		},
		error:function(){
			$.jBox.tip(data.msg,"error");
		}
	})
})