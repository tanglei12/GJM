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
		url: "/loanRecord/lending",
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
					url : "/loanRecord/lending",
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
							html += '<ul class="title-nav" style="border-bottom: 1px solid #efefef;width: 98%;margin-left: 10px;">';
							html += '	<li class="visited">' + "借款信息";
							html += '	</li>';
							html += '</ul>';
							html += '<input type="hidden" class="bm_userId" value='+contractObject.bm_userId+'>';  //申请人id
							html += '<input type="hidden" class="bm_id" value='+contractObject.bm_id+'>';  //借款记录id
							html += '<div class="div-list">';
                    		html += '		<dl>';
                    		html += '		   <dt>申请人</dt>';
                    		html += '			<dd>'+contractObject.bm_name+'</dd>';
                    		html += '		</dl>';
                    		html += '		<dl>';
                    		html += '		   <dt>身份证号</dt>';
                    		html += '			<dd>'+contractObject.bm_numCard+'</dd>';
                    		html += '		</dl>';
                    		html += '		<dl>';
                    		html += '		   <dt>联系信息</dt>';
                    		html += '			<dd>'+contractObject.bm_phone+'</dd>';
                    		html += '		</dl>';
                    		html += '		<dl>';
                    		html += '		   <dt>借款金额</dt>';
                    		html += '			<dd>'+fmoney(contractObject.bm_monery,2)+'&nbsp;&nbsp;元</dd>';
                    		html += '		</dl>';
                    		html += '		<dl>';
                    		html += '		   <dt>借款用途</dt>';
                    		html += '			<dd>'+contractObject.bm_purpose+'</dd>';
                    		html += '		</dl>';
                    		html += '		<dl>';
                    		html += '   	<dt>借款期限</dt>';
                    		html += '			<dd>'+contractObject.bm_days+'天</dd>';
                    		html += '		</dl>';
                    		html += '		<dl>';
                    		html += '		   <dt>租约信息</dt>';
                    		html += '			<dd><a class="lookBook" style="color:#3aa4f0;text-decoration:underline;cursor:pointer;">'+"去查看"+'</a></dd>';
                    		html += '		</dl>';
                    		html += '		<dl>';
                    		html += '		   <dt>申请时间</dt>';
                    		html += '			<dd>'+format(contractObject.bm_apply_time,'yyyy-MM-dd HH:mm:ss')+'</dd>';
                    		html += '		</dl>';
							html += '</div>';
							html += '<ul class="title-nav" style="border-bottom: 1px solid #efefef;width: 98%;margin-left: 10px;">';
							html += '	<li class="visited">' + "身份信息";
							html += '	</li>';
							html += '</ul>';
							html += '<div class="cardImg" style="margin-top:30px;margin-left:34px;">';
							html += '  <div style="float: left;margin-right: 80px;">';
							html += '    <img src='+certificstes.cd_peopleImg+'>';
							html += '  </div>';
							html += '  <div style="float: left;margin-right: 80px;">';
							html += '    <img src='+certificstes.cd_idCard+'>';
							html += '  </div>';
							html += '  <div style="float: left;margin-right: 80px;">';
							html += '    <img src='+certificstes.cd_idCard_side+'>';
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
						if (contractObject.bm_loan_state !=4) {
							html += '<ul class="title-nav" style="float:left;border-bottom: 1px solid #efefef;width: 98%;margin-left: 10px;">';
							html += '	<li class="visited">' + "借款处理";
							html += '	</li>';
							html += '</ul>';
							html += '<div style="float:left;">';
							html += '<div class="suer-button" style="float:left;">';
							html += '   <button type="butten" class="finish-butten" id="reject" style="background-color:#f2893d">拒绝</button>';
							html += '   <button type="butten" class="finish-butten" id="pass" style="background-color:#3aa4f0">通过</button>';
							html += '</div>';
						}
							//拒绝原因
							html += '<div class="button-div" style="font-size: 14px;margin-left:10px;display:none;">';
						    html += '<p style="width:150px;margin-bottom: 6px;">拒绝原因：</P>';
						    html += '<div>';
						    html += '<textarea class="textarea" style="width:220px;height:80px;"></textarea>';
						    html += '</div>';
						    html += '<button type="butten" class="finish-butten" id="refuseSuer" style="background-color:#3aa4f0">确认拒绝</button>';
						    html += '</div>';
					        // 打款人信息
						    html += '<div class="lending" style="font-size: 14px;margin-left:10px;display:none;">';
						    html += '  <div style="display:flex;border-bottom: 1px solid #878787;width: 250px;">';
							html += '    <div style="color: #878787;border-width: 0px;border-style: solid;text-align: left;line-height: 20px;float: left;width: 100px;height: 37px;"><div style="width:75px;margin:10px 26px;"><p style="font-size:13px;">'+"收款人："+'</p></div></div>';
							html += '    <div style="left: 103px;top: 102px;background-color: transparent;font-size: 14.0px;padding: 0px;border-radius: 0px;border-width: 0px;float: left;width: 300px;height: 37px;"><div style="width:75px;margin:10px 26px;"><p style="font-size:13px;">'+contractObject.bm_name+'</p></div></div>';
							html += '  </div>';
							html += '  <div style="display:flex;border-bottom: 1px solid #878787;width: 250px;">';
							html += '    <div style="color: #878787;border-width: 0px;border-style: solid;text-align: left;line-height: 20px;float: left;width: 100px;height: 37px;"><div style="width:75px;margin:10px 26px;"><p style="font-size:13px;">'+"收款账号："+'</p></div></div>';
							html += '    <div style="left: 103px;top: 102px;background-color: transparent;font-size: 14.0px;padding: 0px;border-radius: 0px;border-width: 0px;float: left;width: 300px;height: 37px;"><div style="width:75px;margin:10px 26px;"><p class="number" style="font-size:13px;width:200px;">'+band.bd_number+'</p></div></div>';
							html += '  </div>';
							html += '  <div style="display:flex;border-bottom: 1px solid #878787;width: 250px;">';
							html += '    <div style="color: #878787;border-width: 0px;border-style: solid;text-align: left;line-height: 20px;float: left;width: 100px;height: 37px;"><div style="width:75px;margin:10px 26px;"><p style="font-size:13px;">'+"授信金额："+'</p></div></div>';
							html += '    <div style="left: 103px;top: 102px;background-color: transparent;font-size: 14.0px;padding: 0px;border-radius: 0px;border-width: 0px;float: left;width: 300px;height: 37px;"><div style="width:75px;margin:10px 26px;"><p style="font-size:13px;">'+fmoney(contractObject.bm_monery,2)+'元</p></div></div>';
							html += '  </div>';
//							html += '<button type="butten" class="finish-butten" id="suer" style="background-color:#3aa4f0">关闭</button>';
							html += '<button type="butten" class="finish-butten" id="suerMoney" style="background-color:#3aa4f0">确认打款</button>';
						    html += '</div>';

					    $("#contract-title").html(html);
						
						$('.cardImg').viewer();
						$('.band').viewer();
						
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

//不通过
$(document).on('click','#reject',function(){
	$('.lending').hide();
	$('.button-div').show();
});
//打款
$(document).on('click','#pass',function(){
	$('.button-div').hide();
	$('.lending').show();
});
//确认拒绝
$(document).on('click','#refuseSuer',function (){
	var userId=$('.bm_userId').val();
	var nid=$('.bm_id').val();
	var sure='';  //借款信息判断
	var peopleImg=''; //申请人判断
	var idCard='';    //身份证正面信息判断
	var idCard_side='';   //身份证反面信息判断
	var band='';   //银行卡信息判断
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
});
//通过放贷打款
$(document).on('click','#suerMoney',function(){
	var userId=$('.bm_userId').val();  //申请人
	var nid=$('.bm_id').val();  //贷款记录id
	$.ajax({
		url : "/loanRecord/lendingPass",
		type : "POST",
		data : {userId:userId,nid:nid},
		dataType : "json",
		success:function(data){
			location.reload();
		},
		error:function(){
			$.jBox.tip(data.msg,"error");
		}
	})
})

