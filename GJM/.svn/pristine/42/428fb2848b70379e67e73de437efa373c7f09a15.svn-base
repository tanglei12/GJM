				//查看物业
				function chakanwuye(){
					var upn_id=$("#upn_id").val();
					if(upn_id==""||upn_id==null){
						swal("请选择要查看的物业哦  亲!");
						$("#shuidianqi").hide();
						$("#wuguanjiaotong").hide();
						$("#jibenpeizi").hide();
						$("#caipan").hide();
						$("#imgs").hide();
						return false;
					}
					$("#shuidianqi").hide();
					$("#wuguanjiaotong").hide();
					$("#jibenpeizi").hide();
					$("#caipan").hide();
					$("#imgs").hide();
					$("#chakan").show();
					$.ajax({
					    type: "POST",
					    url: "/propertyInfo/propertySelect",
					    data:"upn_id="+upn_id,
					    contentType: "application/x-www-form-urlencoded; charset=utf-8",
					    success: function(result) {
					    	if(result.message=="success"){
					    		//alert(result.queryPropertyInfo.propertyInfo_broadband);
					    		$("#ckkuandai").text(result.queryPropertyInfo.propertyInfo_broadband==null?"":result.queryPropertyInfo.propertyInfo_broadband);
					    		$("#zonglouceng").text(result.queryPropertyInfo.propertyInfo_floor==null?"":result.queryPropertyInfo.propertyInfo_floor);
					    		$("#ckdianti").text(result.queryPropertyInfo.propertyInfo_Life==null?"":result.queryPropertyInfo.propertyInfo_Life);
					    		$("#ckpark").text(result.queryPropertyInfo.propertyInfo_CarPark==null?"":result.queryPropertyInfo.propertyInfo_CarPark+"个");
					    		$("#ckgonggongsheshi").text(result.queryPropertyInfo.propertyInfo_Public==null?"":result.queryPropertyInfo.propertyInfo_Public);
					    		$("#ckxiaoquhuanjin").text(result.queryPropertyInfo.propertyInfo_you==2?"优":(result.queryPropertyInfo.propertyInfo_you==1?"差":"中"));
					    		$("#ckwuyename").text(result.queryPropertyInfo.propertyInfo_Name==null?"":result.queryPropertyInfo.propertyInfo_Name);
					    		$("#ckwuyguanphone").text(result.queryPropertyInfo.propertyInfo_Tel==null?"":result.queryPropertyInfo.propertyInfo_Tel);
					    		$("#ckwuguanprice").text(result.queryPropertyInfo.propertyInfo_Cost==null?"":result.queryPropertyInfo.propertyInfo_Cost+"元/㎡");
					    		$("#ckwuguancompany").text(result.queryPropertyInfo.propertyInfo_Wuguan==null?"":result.queryPropertyInfo.propertyInfo_Wuguan);
					    		$("#ckwuguandizhi").text(result.queryPropertyInfo.propertyInfo_address==null?"":result.queryPropertyInfo.propertyInfo_address);
					    		$("#ckquyu").text(result.queryPropertyInfo.propertyInfo_quyu==null?"":result.queryPropertyInfo.propertyInfo_quyu);
					    		$("#ckguidao").text(result.queryPropertyInfo.propertyInfo_gui==null?"":result.queryPropertyInfo.propertyInfo_gui);
					    		$("#ckshangquan").text(result.queryPropertyInfo.propertyInfo_quan==null?"":result.queryPropertyInfo.propertyInfo_quan);
					    		$("#ckzuobiao").text(result.queryPropertyInfo.propertyInfo_coordinate==null?"":result.queryPropertyInfo.propertyInfo_coordinate);
					    		$("#ckgongjiao").text(result.queryPropertyInfo.propertyInfo_transit==null?"":result.queryPropertyInfo.propertyInfo_transit);
					    		if(result.queryPropertyLivingPayment){
					    			$.each(result.queryPropertyLivingPayment, function(idx, item) {
					    				if(item.lp_type=="水"){
					    					$("#ckshuijfzq").text(item.lp_cycle==null?"":item.lp_cycle);
					    					$("#ckshuiprice").text(item.lp_money==null?"":item.lp_money);
					    					$("#ckshuitsfd").text(item.lp_duan==null?"":item.lp_duan);
					    					$("#ckshuijtjf").text(item.lp_bool==null?"":item.lp_bool==0?"是":"否");
					    					$("#ckshuicompany").text(item.lp_company==null?"":item.lp_company);
					    					$("#ckshuilxr").text(item.lp_name==null?"":item.lp_name);
					    					$("#ckshuiphone").text(item.lp_phone==null?"":item.lp_phone);
					    					$("#ckshuirmark").text(item.lp_beizhu==null?"":item.lp_beizhu);
					    				}else if(item.lp_type=="电"){
					    					$("#ckdianjfzq").text(item.lp_cycle==null?"":item.lp_cycle);
					    					$("#ckdianprice").text(item.lp_money==null?"":item.lp_money);
					    					$("#ckdiantsfd").text(item.lp_duan==null?"":item.lp_duan);
					    					$("#ckdianjtjf").text(item.lp_bool==null?"":item.lp_bool==0?"是":"否");
					    					$("#ckdiancompany").text(item.lp_company==null?"":item.lp_company);
					    					$("#ckdianlxr").text(item.lp_name==null?"":item.lp_name);
					    					$("#ckdianphone").text(item.lp_phone==null?"":item.lp_phone);
					    					$("#ckdianrmark").text(item.lp_beizhu==null?"":item.lp_beizhu);
					    				}else if(item.lp_type=="气"){
					    					$("#ckqijfzq").text(item.lp_cycle==null?"":item.lp_cycle);
					    					$("#ckqiprice").text(item.lp_money==null?"":item.lp_money);
					    					$("#ckqitsfd").text(item.lp_duan==null?"":item.lp_duan);
					    					$("#ckqijtjf").text(item.lp_bool==null?"":item.lp_bool==0?"是":"否");
					    					$("#ckqicompany").text(item.lp_company==null?"":item.lp_company);
					    					$("#ckqilxr").text(item.lp_name==null?"":item.lp_name);
					    					$("#ckqiphone").text(item.lp_phone==null?"":item.lp_phone);
					    					$("#ckqirmark").text(item.lp_beizhu==null?"":item.lp_beizhu);
					    				}
							    	});
					    		} else {
					    			//水
					    			$("#ckshuijfzq").text('');
			    					$("#ckshuiprice").text('');
			    					$("#ckshuitsfd").text('');
			    					$("#ckshuijtjf").text('');
			    					$("#ckshuicompany").text('');
			    					$("#ckshuilxr").text('');
			    					$("#ckshuiphone").text('');
			    					$("#ckshuirmark").text('');
			    					//电
			    					$("#ckdianjfzq").text('');
			    					$("#ckdianprice").text('');
			    					$("#ckdiantsfd").text('');
			    					$("#ckdianjtjf").text('');
			    					$("#ckdiancompany").text('');
			    					$("#ckdianlxr").text('');
			    					$("#ckdianphone").text('');
			    					$("#ckdianrmark").text('');
			    					//气
			    					$("#ckqijfzq").text('');
			    					$("#ckqiprice").text('');
			    					$("#ckqitsfd").text('');
			    					$("#ckqijtjf").text('');
			    					$("#ckqicompany").text('');
			    					$("#ckqilxr").text('');
			    					$("#ckqiphone").text('');
			    					$("#ckqirmark").text('');
					    		}
					    	}else{
					    		swal("暂无数据  请跟进物业!");
					    		$("#chakan").hide();
					    		$("#imgs").show();
					    		$("#shuidianqi").show();
					    		genjinwuye();
					    	}
					    	
					    }
					});
					
				}
				//跟进物业
				function genjinwuye(){
					$("#win").hide();
					var upn_id=$("#upn_id").val();
					if(upn_id==""||upn_id==null){
						swal("请选择要跟进的物业哦  亲!");
						$("#chakan").hide();
						$("#shuidianqi").hide();
						$("#wuguanjiaotong").hide();
						$("#jibenpeizi").hide();
						$("#caipan").hide();
						$("#imgs").hide();
						return false;
					}
					$("#chakan").hide();
					$("#imgs").show();
					$("#shuidianqi").show();
					$("#wuguanjiaotong").hide();
					$("#jibenpeizi").hide();
					$("#caipan").hide();
					$('#tab').hide();
					$('#tab').attr('code','');
					
					$("#img1").css("background-image","url(/resources/image/sdql270120.png)");
					$("#img2").css("background-image","url(/resources/image/wgjth270120.png)");
					$("#img3").css("background-image","url(/resources/image/jbpzh270120.png)");
					$("#img4").css("background-image","url(/resources/image/cph270120.png)");
					$("#price").val("");
					$("#jiaofeizhouqi option[value='单月']").attr("selected","selected");
					$("#jietijifei option[value='否']").attr("selected","selected");
					$("#sfkt option[value='1']").attr("selected","selected");
					$("#teshufenduan").val("");
					$("#company").val("");
					$("#lianxiren").val("");
					$("#phone").val("");
					selectpropertyInfo(upn_id);
				}

			//继承物业	
			function jichengwuye(){
					$("#imgs").hide();
					$("#shuidianqi").hide();
					$("#wuguanjiaotong").hide();
					$("#jibenpeizi").hide();
					$("#caipan").hide();
					var upn_id=$("#upn_id").val();
					var sid=$("#sid").val();
					$("#chakan").hide();
					if(upn_id==""||upn_id==null){
						swal("请选择要跟进的物业哦  亲!");
						return false;
					}
					if(sid==0){
						swal("最高级不能继承");
						return false;
					}
					$('#tab').hide();
					$('#tab').attr('code','');
					$.ajax({
					    type: "POST",
					    url: "/propertyInfo/selectsid",
					    data:"sid="+sid,
					    contentType: "application/x-www-form-urlencoded; charset=utf-8",
					    success: function(result) {
					    	$("#win").show();
					    	$("#content>table").html("");
					    	//$("#content>table").append('<tr align="center" class="trcss1" ><td class="tdcss">编码</td><td class="tdcss" onclick="checkwuye(this);">'+"名称"+'</td></tr>');
					    	$.each(result.lists, function(idx, item) {
					    		if(idx%2==0){
					    			$("#content>table").append('<tr align="center" class="trcss" style="background-color: #efefef;"></td><td class="tdcss2" >'+item.upn_id+'</td><td class="tdcss2" id="tdh" onclick="aaa(this);" style="cursor: pointer;">'+item.upn_name+(item.upn_code==null?"":item.upn_code)+'</td></tr>');
					    		}else{
					    			$("#content>table").append('<tr align="center" class="trcss" ></td><td class="tdcss1" >'+item.upn_id+'</td><td class="tdcss1" id="tdh"  onclick="aaa(this);" style="cursor: pointer;">'+item.upn_name+(item.upn_code==null?"":item.upn_code)+'</td></tr>');
					    		}
					    	});
					    }
					});
			}
	//继承某个物业   回调
	function aaa(obj){
			var td=obj;
			var jcvalue=$(td).text();
			var upn_id=$(td).prev().text();
			var pid=$("#upn_id").val();
			swal({  title: "确定继承"+jcvalue+"物业?",  
				text: "", 
				type: "warning",   
				showCancelButton: true,  
				confirmButtonColor: "#DD6B55",  
				confirmButtonText: "确定继承",  
				closeOnConfirm: false }, 
				function(){  
					$.ajax({
					    type: "POST",
					    url: "/propertyInfo/propertyParent",
					    data:"pid="+upn_id+"&upn_id="+pid+"&account="+$("#gj-id").val(),
					    contentType: "application/x-www-form-urlencoded; charset=utf-8",
					    success: function(result) {
					    	if(result.message=="success"){
					    		swal("继承成功!");
					    		$("#win").hide();
					    	}else{
					    		swal("继承失败!");
					    		$("#win").hide();
					    	}
					    }
					  });
					});
			}

		//验证模糊查询物业
			function suosuowuye(){
				return true;
			}
			//跟进物业水电气
			function selectpropertyInfo(obj){
				$("#cptijiao").removeAttr("disabled");
				$.ajax({
				    type: "POST",
				    url: "/propertyInfo/propertyWater",
				    data:"upn_id="+obj,
				    contentType: "application/x-www-form-urlencoded; charset=utf-8",
				    success: function(result) {
				    	if(result.message=="success"){
				    	if(result.propertyInfos.propertyInfo_success==1){
				    		$("#sdqtijiao").attr("disabled","disabled");
				    		$("#shuidianqi").hide();
							$("#wuguanjiaotong").hide();
							$("#jibenpeizi").hide();
							$("#caipan").hide();
							$("#imgs").hide();
							swal("修改需要向直接主管提交申请 !");
			    		}else{
				    	$("#sdqtijiao").removeAttr("disabled");
				    	$("#shuidianqi").show();
				    	$("#wuguanjiaotong").hide();
						$("#jibenpeizhi").hide();
						$("#caipan").hide();
				    	if(result.queryPropertyLivingPayment!=null&&result.queryPropertyLivingPayment!=""){
				    				$("#wuyetype option[value='"+result.queryPropertyLivingPayment.lp_type+"']").attr("selected","selected");
				    				$("#price").val(result.queryPropertyLivingPayment.lp_money);
					    			$("#jiaofeizhouqi option[value='"+result.queryPropertyLivingPayment.lp_cycle+"']").attr("selected","selected");
					    			$("#jietijifei option[value='"+result.queryPropertyLivingPayment.lp_bool+"']").attr("selected","selected");
				    				$("#teshufenduan").val(result.queryPropertyLivingPayment.lp_duan);
				    				$("#company").val(result.queryPropertyLivingPayment.lp_company);
				    				$("#lianxiren").val(result.queryPropertyLivingPayment.lp_name);
				    				$("#phone").val(result.queryPropertyLivingPayment.lp_phone);
				    				$("#lq_id").val(result.queryPropertyLivingPayment.lp_id);
				    				$("#propertyInfoid").val(result.queryPropertyLivingPayment.propertyInfo_Id);
				    		}
				    	}
				    }else{
				    	$("#sdqtijiao").removeAttr("disabled");
				    	$("#shuidianqi").show();
				    	$("#wuguanjiaotong").hide();
						$("#jibenpeizhi").hide();
						$("#caipan").hide();
				    	
				    }
				   }
				});
				
			}
			//跟进物管交通
			function checkwgjt(){
				var propertyInfoId=	$("#propertyInfoid").val();
				var state=$("#state").val();
				if($("#wuguanname").val()=="" || $("#wuguanname").val()==null ||$("#wuguanphone").val()=="" || $("#wuguanphone").val()==null || $("#wuyedizhi").val()=="" || $("#wuyedizhi").val()==null || $("#quyu").val()==null || $("#quyu").val()=="" || $("#guidao").val()==null || $("#guidao").val()=="" || $("#shangquan").val()=="" || $("#wuyedizhi").val()==null || $("#biaozhu").val()==null || $("#biaozhu").val()==null){
					swal("请将带星号的信息完善!");
					return false;
				}
				if(isNaN($('#wuguanprice').val())){
					swal("物管费用请填写正确的数字类型!");
					return false;
				}
					$.ajax({
						type: "POST",
						url: "/propertyInfo/insertPropertys",
						data:"upn_id="+$("#upn_id").val()+"&propertyInfo_Id="+propertyInfoId+"&account="+$("#gj-id").val()+"&typeState="+state+"&propertyInfo_Wuguan="+$("#wuguanname").val()+"&propertyInfo_Tel="+$("#wuguanphone").val()+"&propertyInfo_Cost="+$("#wuguanprice").val()+"&propertyInfo_address="+$("#wuyedizhi").val()+"&propertyInfo_company="+$("#wuguancompany").val()+"&propertyInfo_waddress="+$("#wuguandizhi").val()+"&propertyInfo_quyu="+$("#quyu").val()+"&propertyInfo_gui="+$("#guidao").val()+"&propertyInfo_quan="+$("#shangquan").val()+"&propertyInfo_coordinate="+$("#biaozhu").val()+"&propertyInfo_transit="+$("#gongjiao").val(),
						contentType: "application/x-www-form-urlencoded; charset=utf-8",
						success: function(result) {
							//swal(result.stage);
							if(result.message=="success"){
								$("#img1").css("background-image","url(/resources/image/sdq270120.png)");
								$("#img2").css("background-image","url(/resources/image/wgjt270120.png)");
								$("#img3").css("background-image","url(/resources/image/jbpzl270120.png)");
								$.ajax({
									type: "POST",
									url: "/propertyInfo/propertySelect",
									data:"upn_id="+$("#upn_id").val(),
									contentType: "application/x-www-form-urlencoded; charset=utf-8",
									success: function(result) {
										if(result.message=="error"){
											//swal("提交成功!");
										}else{
											$("#zoulouceng").val(result.queryPropertyInfo.propertyInfo_TotalAmount);
											$("#kuandai").val(result.queryPropertyInfo.propertyInfo_broadband);
											$("#dianti").val(result.queryPropertyInfo.propertyInfo_Life);
											$("#cheku").val(result.queryPropertyInfo.propertyInfo_CarPark);
											$("#gonggongsheshi").val(result.queryPropertyInfo.propertyInfo_Public);
											$("#xiaoquhuanjin option[value='"+result.queryPropertyInfo.propertyInfo_you+"']").attr("selected","selected");
											$("#state").val(result.queryPropertyInfo.propertyInfo_stage);
										}
										swal("操作成功!");
									}
								  });

								$("#wuguanjiaotong").hide();
								$("#jibenpeizi").show();
								$("#state").val(result.stage);
								$("#wuguanname").val("");
								$("#wuguanphone").val("");
								$("#wuguanprice").val("");
								$("#wuyedizhi").val("");
								$("#wuguancompany").val("");
								$("#wuguandizhi").val("");
								$("#quye").val("");
								$("#guidao").val("");
								$("#shangquan").val("");
								$("#zuobiao").val("");
								$("#gongjiao").val("");
							}else{
								swal("操作失败!");
								}

							}
					});
			}
			//水电气跟进（水电气）
			function checksdq(){
				if($("#upn_id").val()==""){
					swal("请选择一个物业!");
				}
					$.ajax({
					    type: "POST",
					    url: "/propertyInfo/propertyWater",
					    data:"upn_id="+$("#upn_id").val()+"&type="+$("#wuyetype").val(),
					    contentType: "application/x-www-form-urlencoded; charset=utf-8",
					    success: function(result) {
					    	if(result.message=="success"){
				    				$("#wuyetype option[value='"+result.queryPropertyLivingPayment.lp_type+"']").attr("selected","selected");
					    			$("#jiaofeizhouqi option[value='"+result.queryPropertyLivingPayment.lp_cycle+"']").attr("selected","selected");
				    				$("#price").val(result.queryPropertyLivingPayment.lp_money);
					    			$("#jietijifei option[value='"+result.queryPropertyLivingPayment.lp_bool+"']").attr("selected","selected");
					    			$("#sfkt option[value='"+result.queryPropertyLivingPayment.lp_bools+"']").attr("selected","selected");
				    				$("#teshufenduan").val(result.queryPropertyLivingPayment.lp_duan);
				    				$("#company").val(result.queryPropertyLivingPayment.lp_company);
				    				$("#lianxiren").val(result.queryPropertyLivingPayment.lp_name);
				    				$("#phone").val(result.queryPropertyLivingPayment.lp_phone);
				    				$("#lq_id").val(result.queryPropertyLivingPayment.lp_id);
				    				$("#propertyInfoid").val(result.queryPropertyLivingPayment.propertyInfo_Id);
				    				
					    		}else{
					    			//swal("暂未添加!");
					    			$("#price").val("");
					    			$("#jiaofeizhouqi option[value='单月']").attr("selected","selected");
					    			$("#jietijifei option[value='否']").attr("selected","selected");
					    			$("#teshufenduan").val("");
				    				$("#company").val("");
				    				$("#lianxiren").val("");
				    				$("#phone").val("");
				    				$("#lq_id").val("");
					    		}
					    	}
					    });
			}
			//跟进水电气(提交)
			function sdqtijiao(){
				$("#sdqtijiao").removeAttr("disabled");
				if($("#sfkt").val()==1){
					if($("#price").val()=="" || $("#price").val()==null ||$("#company").val()=="" || $("#price").val()==null || $("#phone").val()==""|| $("#price").val()==null){
						swal("请将带星号的信息完善!");
						return false;
					}
				}
				if(isNaN($('#price').val())){
					swal("价格请填写正确的数字类型!");
					return false;
				}
				if($("#upn_id").val()==""){
					swal("请选择一个物业!");
					return false;
				}
				$.ajax({
				    type: "POST",
				    url: "/propertyInfo/insertPropertyLivingPayment",
				    data:"upn_id="+$("#upn_id").val()+"&propertyInfo_Id="+$("#propertyInfoid").val()+"&lp_id="+$("#lq_id").val()+"&upn_id="+$("#upn_id").val()+"&lp_type="+$("#wuyetype").val()+"&lp_cycle="+$("#jiaofeizhouqi").val()+"&lp_money="+$("#price").val()+"&lp_duan="+$("#teshufenduan").val()+"&lp_company="+$("#company").val()+"&lp_name="+$("#lianxiren").val()+"&lp_phone="+$("#phone").val()+"&lp_bool="+$("#jietijifei").val()+"&lp_bools="+$("#sfkt").val()+"&account="+$("#gj-id").val(),
				    contentType: "application/x-www-form-urlencoded; charset=utf-8",
				    success: function(result) {
				    	if(result.message=="success"){
				    		swal("操作成功  水电气需要完善完相应数据!");
				    		$("#lq_id").val(result.lp_id);
				    		if(result.stage!=0){
				    			//是否继续修改
				    			if(result.stage==2){
				    				swal({   title: "是否下一步?", 
				    					text: "", 
				    					type: "warning",   
				    					showCancelButton: true,  
				    					confirmButtonColor: "#DD6B55", 
				    					confirmButtonText: "确定"
				    					},
				    					function(){ 
				    						$("#img1").css("background-image","url(/resources/image/sdq270120.png)");
				    						$("#img2").css("background-image","url(/resources/image/wgjtl270120.png)");
							    			$.ajax({
					    					    type: "POST",
					    					    url: "/propertyInfo/propertySelect",
					    					    data:"upn_id="+$("#upn_id").val(),
					    					    contentType: "application/x-www-form-urlencoded; charset=utf-8",
					    					    success: function(result) {
					    					    	if(result.message=="error"){
					    					    		$("#state").val(2);
					    					    		//swal("提交成功!");
					    					    	}else{
					    					    		$("#wuguanname").val(result.queryPropertyInfo.propertyInfo_Wuguan);
					    					    		$("#wuguanphone").val(result.queryPropertyInfo.propertyInfo_Tel);
					    					    		$("#wuguanprice").val(result.queryPropertyInfo.propertyInfo_Cost);
					    					    		$("#wuyedizhi").val(result.queryPropertyInfo.propertyInfo_address);
					    					    		$("#wuguancompany").val(result.queryPropertyInfo.propertyInfo_company);
					    					    		$("#wuguandizhi").val(result.queryPropertyInfo.propertyInfo_waddress);
					    					    		$("#quyu").val(result.queryPropertyInfo.propertyInfo_quyu);
					    					    		$("#guidao").val(result.queryPropertyInfo.propertyInfo_gui);
					    					    		$("#shangquan").val(result.queryPropertyInfo.propertyInfo_quan);
					    					    		$("#biaozhu").val(result.queryPropertyInfo.propertyInfo_coordinate);
					    					    		$("#gongjiao").val(result.queryPropertyInfo.propertyInfo_transit);
					    					    		$("#state").val(result.queryPropertyInfo.propertyInfo_stage);
					    					    	}
					    					    	swal("操作成功!");
					    					    }
					    					  });
							    			$("#shuidianqi").hide();
							    			$("#wuguanjiaotong").show();
							    			$("#img1").css("background-image","url(/resources/image/sdq270120.png)");
				    						$("#img2").css("background-image","url(/resources/image/wgjtl270120.png)");
							    			$.ajax({
					    					    type: "POST",
					    					    url: "/propertyInfo/propertySelect",
					    					    data:"upn_id="+$("#upn_id").val(),
					    					    contentType: "application/x-www-form-urlencoded; charset=utf-8",
					    					    success: function(result) {
					    					    	if(result.message=="error"){
					    					    		$("#state").val(2);
					    					    		//swal("提交成功!");
					    					    	}else{
					    					    		$("#wuguanname").val(result.queryPropertyInfo.propertyInfo_Wuguan);
					    					    		$("#wuguanphone").val(result.queryPropertyInfo.propertyInfo_Tel);
					    					    		$("#wuguanprice").val(result.queryPropertyInfo.propertyInfo_Cost);
					    					    		$("#wuyedizhi").val(result.queryPropertyInfo.propertyInfo_address);
					    					    		$("#wuguancompany").val(result.queryPropertyInfo.propertyInfo_company);
					    					    		$("#wuguandizhi").val(result.queryPropertyInfo.propertyInfo_waddress);
					    					    		$("#quyu").val(result.queryPropertyInfo.propertyInfo_quyu);
					    					    		$("#guidao").val(result.queryPropertyInfo.propertyInfo_gui);
					    					    		$("#shangquan").val(result.queryPropertyInfo.propertyInfo_quan);
					    					    		$("#biaozhu").val(result.queryPropertyInfo.propertyInfo_coordinate);
					    					    		$("#gongjiao").val(result.queryPropertyInfo.propertyInfo_transit);
					    					    		$("#state").val(result.queryPropertyInfo.propertyInfo_stage);
					    					    	}
					    					    }
					    					  });
							    			$("#shuidianqi").hide();
							    			$("#wuguanjiaotong").show();
							    			
				    					});
				    			}
				    			else{
				    			$("#state").val(result.stage);
				    			$("#wuguanname").val("");
					    		$("#wuguanphone").val("");
					    		$("#wuguanprice").val("");
					    		$("#wuyedizhi").val("");
					    		$("#wuguancompany").val("");
					    		$("#wuguandizhi").val("");
					    		$("#quyu").val("");
					    		$("#guidao").val("");
					    		$("#shangquan").val("");
					    		$("#biaozhu").val("");
					    		$("#gongjiao").val("");
				    			}
				    		}
				    	}else{
				    		swal("操作失败,请重试!");
				    	}
				    	
				    }
				});
			}
			//验证电话号码
			function chenkphone(obj){
				var isMobile=/^(?:13\d|15\d)\d{5}(\d{3}|\*{3})$/;   
				var isPhone=/^((0\d{2,3}))?(\d{7,8})((\d{3,}))?$/;
				 if(!isMobile.test($.trim($("#phone").val())) && !isPhone.test($.trim($("#phone").val()))){
					 swal("请正确填写电话号码!");
					 obj.focus();
				            return false;
				        }
			}
			function chenkwuyephone(obj){
				var isMobile=/^(?:13\d|15\d)\d{5}(\d{3}|\*{3})$/;   
				var isPhone=/^((0\d{2,3}))?(\d{7,8})((\d{3,}))?$/;
				 if(!isMobile.test($.trim($("#wuguanphone").val())) && !isPhone.test($.trim($("#wuguanphone").val()))){
					 swal("请正确填写电话号码!");
					 obj.focus();
				            return false;
				        }
			}
			//地图坐标
			function mapzuobiao(){
				var hi_address = $("#wuyedizhi").val();
				var xyz = $("#biaozhu").val();
				$.jBox("iframe:/propertyInfo/map?hi_address="+hi_address+"&xyz="+xyz, {
				    title: "管家婆管理系统",
				    width: 1200,
				    height: 550,
				    buttons: { '关闭': true }
				});
			}
			//基本配置更进
			function checkjbpztijiao(){
				var propertyInfoId=	$("#propertyInfoid").val();
			    var state=$("#state").val();
			    if($("#kuandai").val()=="" || $("#kuandai").val()==null ||$("#dianti").val()=="" || $("#dianti").val()==null || $("#zoulouceng").val()=="" || $("#zoulouceng").val()==null ){
					swal("请将带星号的信息完善!");
					return false;
				}
					$.ajax({
					    type: "POST",
					    url: "/propertyInfo/insertPropertys",
					    data:"upn_id="+$("#upn_id").val()+"&propertyInfo_Id="+propertyInfoId+"&account="+$("#gj-id").val()+"&typeState="+state+"&propertyInfo_CarPark="+$("#cheku").val()+"&propertyInfo_Public="+$("#gonggongsheshi").val()+"&propertyInfo_Life="+$("#dianti").val()+"&propertyInfo_broadband="+$("#kuandai").val()+"&propertyInfo_you="+$("#xiaoquhuanjin").val()+"&propertyInfo_TotalAmount="+$("#zoulouceng").val(),
					    contentType: "application/x-www-form-urlencoded; charset=utf-8",
					    success: function(result) {
					    	if(result.message=="success"){
						    	$("#img3").css("background-image","url(/resources/image/jbpz270120.png)");
						    	$("#img4").css("background-image","url(/resources/image/cpl270120.png)");
						    	$.ajax({
		    					    type: "POST",
		    					    url: "/propertyInfo/propertySelect",
		    					    data:"upn_id="+$("#upn_id").val(),
		    					    contentType: "application/x-www-form-urlencoded; charset=utf-8",
		    					    success: function(result) {
		    					    	if(result.message=="error"){
		    					    		$("#state").val(3);
		    					    	}else{
		    					    		$("#kaifashang").val(result.queryPropertyInfo.propertyInfo_developer);
		    					    		$("#guanlifangshi").val(result.queryPropertyInfo.propertyInfo_ManaStyle);
		    					    		$("#lvhualv").val(result.queryPropertyInfo.propertyInfo_GreenRate);
		    					    		$("#rongjilv").val(result.queryPropertyInfo.propertyInfo_PlotRate);
		    					    		$("#zongtaoshu").val(result.queryPropertyInfo.propertyInfo_TotalAmount);
		    					    		$("#jianzhumianji").val(result.queryPropertyInfo.propertyInfo_BuildArea);
		    					    		$("#kaipanjia").val(result.queryPropertyInfo.propertyInfo_OpenPrice);
		    					    		$("#zhandimianji").val(result.queryPropertyInfo.propertyInfo_TotalArea);
		    					    		$("#kaipandate").val(result.queryPropertyInfo.propertyInfoStrTime);
		    					    		$("#wuyexingtai option[value='"+result.queryPropertyInfo.propertyInfo_State+"']").attr("selected","selected");
		    					    		$("#state").val(result.queryPropertyInfo.propertyInfo_stage);
		    					    	}
		    					    	
		    					    	var htmlCheck = "";
		    					    	$.each(result.propertyInfoSubwanys, function(index, item) {
		    					    		htmlCheck += "<label class='common-borderbox common-borderbox-checked'>"+
															""+ item.subway_Name +""+
															"<input type='checkbox' name='hi_function' value='"+ item.subway_Name +"' checked='checked'>"+
															"</label>";
		    					    	});
		    					    	if(htmlCheck != ""){
		    					    		htmlCheck+="<em>*</em>"+
		    					    		"<button class='common-borderbox-add' name='hi_function' onclick='addLabel(this)'>"+
											"<i class='icon-plus'></i>"+
											"</button>";
		    					    		$("#perimeter").html(htmlCheck);
		    					    	}
		    					    	swal("操作成功!");	
		    					    }
		    					  });
					    		$("#jibenpeizi").hide();
					    		$("#caipan").show();
					    		$("#state").val(result.stage);
					    		$("#kuandai").val("");
					    		$("#dianti").val("");
					    		$("#cheku").val("");
					    		$("#gonggongsheshi").val("");
					    		$("#xiaoquhuanjin").val("");
					    	}else{
					    		swal("操作失败!");	
					    		}
					    	
					    	}
					});
			}
			
			//踩盘更进 
			function checkcaipantijiao(){
				var propertyInfoId=	$("#propertyInfoid").val();
				
				var subway_Name = "";
				$("#perimeter .common-borderbox").each(function(i){
					if($(this).attr("class") == "common-borderbox common-borderbox-checked"){
						subway_Name+= $(this).find("input").val() + ",";
					}
				});
				subway_Name = subway_Name.substring(0,subway_Name.length-1);
				
				if(subway_Name== null || subway_Name == ""){
					swal("请填写小区周边!");
					return;
				}
				
			    var state=$("#state").val();
					$.ajax({
					    type: "POST",
					    url: "/propertyInfo/insertPropertys",
					    data:"upn_id="+$("#upn_id").val()+"&propertyInfo_Id="+propertyInfoId+"&account="+$("#gj-id").val()+"&typeState="+state+"&propertyInfo_developer="+$("#kaifashang").val()+"&propertyInfo_ManaStyle="+$("#guanlifangshi").val()+"&propertyInfo_GreenRate="+$("#lvhualv").val()+"&propertyInfo_PlotRate="+$("#rongjilv").val()+"&propertyInfo_TotalAmount="+$("#zongtaoshu").val()+"&propertyInfo_BuildArea="+$("#jianzhumianji").val()+"&propertyInfo_TotalArea="+$("#zhandimianji").val()+"&propertyInfo_OpenPrice="+$("#kaipanjia").val()+"&propertyInfo_Type="+$("#wuyeleibie").val()+"&propertyInfo_State="+$("#wuyexingtai").val()+"&propertyInfoDate="+$("#kaipandate").val()+"&subway_Name="+subway_Name,
					    contentType: "application/x-www-form-urlencoded; charset=utf-8",
					    success: function(result) {
					    	if(result.message=="success"){
						    	$("#img4").css("background-image","url(/resources/image/cp270120.png)");
					    		$("#kaifashang").hide();
					    		$("#guanlifangshi").show();
					    		$("#lvhualv").val(result.stage);
					    		$("#rongjilv").val("");
					    		$("#zongtaoshu").val("");
					    		$("#jianzhumianji").val("");
					    		$("#zhandimianji").val("");
					    		$("#wuyeleibie").val("");
					    		$("#wuyexingtai").val("");
					    		$("#kaipandate").val("");
					    		swal("操作成功!");
//					    		swal({  title: "确定提交?",  
//					    				text: "提交后将不能任意修改!", 
//					    				type: "warning",   
//					    				showCancelButton: true,  
//					    				confirmButtonColor: "#DD6B55",  
//					    				confirmButtonText: "确定提交",  
//					    				closeOnConfirm: false }, 
//					    				function(){  
//					    					$.ajax({
//					    					    type: "POST",
//					    					    url: "/propertyInfo/propertySuccess",
//					    					    data:"propertyInfo_Id="+propertyInfoId+"&account="+$("#gj-id").val(),
//					    					    contentType: "application/x-www-form-urlencoded; charset=utf-8",
//					    					    success: function(result) {
//					    					    	if(result.message=="success"){
//					    					    		swal("提交成功!");
//					    					    		$("#shuidianqi").hide();
//					    								$("#wuguanjiaotong").hide();
//					    								$("#jibenpeizi").hide();
//					    								$("#caipan").hide();
//					    								$("#imgs").hide();
//					    								$("#chakan").show();
//					    								chakanwuye();
//					    					    	}else{
//					    					    		swal("提交失败!");
//					    					    	}
//					    					    }
//					    					  });
//					    					});
					    	}else{
					    		swal("操作失败!");	
					    		}
					    	
					    	}
					});
				
			}
			
function selProperName(){
var v = $("#sousuowuyename").val();
	
	$.ajax({
	    type: "POST",
	    url: "/propertyInfo/sousuowuyemain",
	    data:"propertyInfo_Name="+v,
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    success: function(result) {
	    	var zNodes = result.pInfoNames;
	    	var setting = {
	    			treeId:"zitTree",
	    			data: {
	    				simpleData: {
	    					enable: true,
	    					idKey:"id",
	    					pIdKey:"pid",
	    					rootPId:0
	    				}
	    			},callback : {
	    				beforeClick: zTreeOnCheck,
	    				
	    			}
	    		};
	    	$.fn.zTree.init($("#treeDemo"), setting, eval('(' + zNodes + ')'));
	    }
	});
}		

/** 添加标签*/
function addLabel(obj) {
	var _this = $(obj);
	var html = "<div style='padding:10px;'><div style='display:block;float:left;line-height:34px;'>输入标签：</div><input type='text' class='form-control' id='pz' name='pz' /><hr></div>";
	var submit = function(v, h, f) {
		var i = 0
		$("input[name='" + _this.attr("name") + "']").each(function() {
			if ($(this).val() == f.pz) {
				i = 1;
				return false;
			}
		});
		if (i == 0) {
			if (f.pz != null && f.pz != '') {
				_this.before('<label class="common-borderbox common-borderbox-checked">' + f.pz + '<input type="checkbox" name="hi_function" value="' + f.pz + '" checked></label>');
			}
			return true;
		} else {
			$.jBox.tip("该标签已存在");
			return false;
		}
	};
	$.jBox(html, {
		title: "添加标签",
		submit: submit
	});
	$("#pz").focus();
}









