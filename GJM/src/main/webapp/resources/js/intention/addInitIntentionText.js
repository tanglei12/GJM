//var hi_id = getUrlParam("phi_id"); // 房屋编号
var type = "intent";
var tipnum = 0;
var em_id = 0;
var houseType = "";
var ccName = "";//房东姓名
var ccPhone  ="";//房东联系方式
var ccCode = "";//客户唯一编码（房东属于意向客户）
var msg = "";//是否存房成功
$(function(){
    //图片插件
    $("#image-upload-box").imageUpload({
        width:110,
        height:110,
        uploadType: 'house',
    });
	houseIntentionList();
})

function chanageText(obj){
	$("#submitdiv"+obj).show();
	$("#fieldset"+obj).css("background-color","#000");
	$("#fieldset"+obj).css("opacity","0.3");
	 
}

function removeText(obj){
	$("#submitdiv"+obj).hide();
	$("#fieldset"+obj).css("background-color","#fff");
	$("#fieldset"+obj).css("opacity","1");
}

function updateDivText(obj){
	updateDivCheck();
	$("#fieldset"+obj+"s").css("display","block");
	$("#fieldset"+obj).css("display","none");
	$("#divFieldset"+obj).css("margin-bottom","20px");
	$("#submitdiv"+obj).hide();
}


/**
 * 将每个DIV还原到数据显示初始状态
 */
function updateDivCheck(){
	for(var int = 0; int < 6; int++) {
		$("#fieldset"+int+"s").css("display","none");
		$("#fieldset"+int).css("display","block");
		$("#divFieldset"+int).css("margin-bottom","0px");
		$("#submitdiv"+int).hide();
	}
}


/**
 * 意向跟进信息读取
 */
function houseIntentionList(){
	$.ajax({
	    type: "POST",
	    url: "/intention/jumpAddIntention",
	    data: "phi_id="+getUrlParam("phi_id"),
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	ccName = result.hi.phi_user;//房东姓名
	    	ccPhone = result.hi.phi_phone;//房东联系方式
	    	ccCode = result.hi.cc_code;//客户唯一编码（房东属于意向客户）
	    	$("#houseAddUser").text(result.hi.em_name+'/'+returnDate(result.hi.phi_date));//房源收录
	    	$("#houseUpdateUser").text(result.hi.new_emName+'/'+returnDate(result.hi.phi_new_addTime));//最新跟进
	    	//$("#houseUpdateType").text("(" + result.hi.buildType+")"+result.hi.phi_type);//房源状态
	    	
	    	houseType = result.hi.buildType;//公盘；私盘；保护
	    	var rb_money = "";//支付金额
	    	var bs_payType = "";//支付方式
	    	var bs_state = "";//支付状态
			var phi_rentDay=result.hi.phi_rentDay; //免租期
	    	if(result.rb != null && result.rb != ""){
	    		rb_money = result.rb.rb_money;//支付金额
		    	bs_payType = result.rb.bs_payType;//支付方式
		    	bs_state = result.rb.bs_state;//支付状态
	    	}
	    	var html = "";
	    		//房源装修下情况
	    		var situ = "";
	    		if(result.hi.hi_situation != null && result.hi.hi_situation != "" && result.hi.hi_situation == 0){
	    			situ = "清水";
	    		}else if(result.hi.hi_situation != null && result.hi.hi_situation != "" && result.hi.hi_situation == 1){
	    			situ = "简装";
	    		}else if(result.hi.hi_situation != null && result.hi.hi_situation != "" && result.hi.hi_situation == 2){
	    			situ = "精装";
	    		}else if(result.hi.hi_situation != null && result.hi.hi_situation != "" && result.hi.hi_situation == 3){
	    			situ = "豪装";
	    		}else if(result.hi.hi_situation != null && result.hi.hi_situation != "" && result.hi.hi_situation == 4){
	    			situ = "中装";
	    		}
	    		var houseMoney = "";
    			if(result.hi.phi_money != null && result.hi.phi_money != ""){//定价
    				houseMoney = houseMoney + "报价："+result.hi.phi_money+"元";
    				if(result.hi.phi_price != null && result.hi.phi_price != ""){//报价
    				houseMoney = houseMoney + "/定价："+result.hi.phi_price+"元";
    			}else{html = html+"";}
    			}
    		
    		$("#phi_name_span").text((result.hi.phi_name==null ? "" : result.hi.phi_name));//标题
    		$("#hi_content_span").text((result.hi.hi_content==null ? "" : result.hi.hi_content));//点评
    		$("#propertyInfo_Name_span").text((result.hi.propertyInfo_Name==null ? "":result.hi.propertyInfo_Name)+"-"+(result.hi.phi_address==null?"":result.hi.phi_address));//地址
    		$("#hi_houseSTW_span").text((result.hi.hi_houseS==null ? "" : result.hi.hi_houseS)+'室'+(result.hi.hi_houseT==null?"":result.hi.hi_houseT)+'厅'+(result.hi.hi_houseW==null?"":result.hi.hi_houseW));//户型
    		$("#hi_situation_span").text(situ);//装修
    		$("#phi_price_span").text(houseMoney);//价格
    		$("#phi_user_span").text((result.hi.phi_user==null ? "" : result.hi.phi_user)+' · '+(result.hi.phi_user_sex==null?"":result.hi.phi_user_sex)+'（'+(result.hi.phi_phone==null?"":result.hi.phi_phone)+")");//房东
    		$("#his_name_span").text((result.hi.his_name == null || result.hi.his_name == "") ? "" : result.hi.his_name );//品牌
    		$("#recommend_name_span").text((result.hi.recommend_name==null ? "" : result.hi.recommend_name));//推荐
    		$("#hi_project_span").text((result.hi.hi_project==null ? "" : result.hi.hi_project));//配置
    		$("#hi_function_span").text((result.hi.hi_function==null ? "" : result.hi.hi_function));//优势
	    	$("#houseImage_span").html(html);//图片加载
	    	$("#fangyuanfanghaos").val(result.hi.phi_address == null ? "" : result.hi.phi_address);//房源房号
	    	$("#fangwushi").val(result.hi.hi_houseS == null ? "" : result.hi.hi_houseS);//房源户型室
	    	$("#fangwuting").val(result.hi.hi_houseT == null ? "" : result.hi.hi_houseT);//房源户型厅
	    	$("#fangwuwei").val(result.hi.hi_houseW == null ? "" : result.hi.hi_houseW);//房源户型卫
	    	$("#lianxiren").val(result.hi.phi_user == null ? "" : result.hi.phi_user);//房东姓名
	    	$("#phiUserName").val(result.hi.phi_user);
	    	radio_select("phi_user_sex",result.hi.phi_user_sex);//房东性别默认选中
	    	
	    	$("#useriphone").val(result.hi.phi_phone == null ? "" : result.hi.phi_phone);//房东电话
	    	$("#lianxiphone").val(result.hi.phi_phone);
	    	$("#fangdongbaojia").val(result.hi.phi_money == null ? "" : result.hi.phi_money);//房东报价
	    	$("#fangyuanlaiyuan").val(result.hi.phi_source == null ? "" : result.hi.phi_source);//房屋来源
	    	radio_select("buildTypes", result.hi.buildType);//楼盘类型默认选中
	    	$("#fangyuanyoushigenjin").val(result.hi.hi_function == null ? "" : result.hi.hi_function);//房源优势
	    	$("#fangyuanyoushi").val(result.hi.hi_function == null ? "" : result.hi.hi_function);//房源优势
	    	
	    	$("#fangwushis").val(result.hi.hi_houseS == null ? "" : result.hi.hi_houseS);//实勘-室
	    	$("#fangwutings").val(result.hi.hi_houseT == null ? "" : result.hi.hi_houseT);//实勘-厅
	    	$("#fangwuweis").val(result.hi.hi_houseW == null ? "" : result.hi.hi_houseW);//实勘-卫
	    	$("#fangyuanmianji").val(result.hi.hi_measure == null ? "" : result.hi.hi_measure);//实勘-房屋面积
	    	$("#zhuangxiuqingkuang").val(result.hi.hi_situation == null ? "" : result.hi.hi_situation);//装修情况
	    	$("#phi_style").val(result.hi.phi_style == null ? "" : result.hi.phi_style);//装修情况
	    	//$("#recommendGroupDiv1").text(result.hi.recommendGroup_Id == null ? "" : result.hi.recommendGroup_Id);//推荐群体
	    	$("#tuijianqunti").val(result.hi.recommendGroup_Id == null ? "" : result.hi.recommendGroup_Id);
	    	$("#fangyuandianpings").text(result.hi.hi_content == null ? "" : result.hi.hi_content);//房源点评
	    	// 加载房屋图片

	    	var images = new Array();
            var s = '';
	    	$(result.hImage).each(function(index,item){
                var arr={};
	    		arr.url=item.him_path;
	    		arr.key=item.him_path.split('com/')[1].split("?")[0];
                images.push(arr);
            });

            // if(result.hi.tipnum != 5){
    			$("#image-upload-box").imageUpload({
					width:110,
					height:110,
                    uploadType: 'house',
                    dataList: images,
					success:function(box){
						box.css("width","100%");
						// 添加提示信息
						var html = '';
						html +='<div class="tips">';
						html +='	<span class="" style="display: inline-block;margin-top: 12px;color: #666666">温馨提示：</span>';
						html +='	<ul class="" style="font-size: 12px;color: #666;">';
						html +='		<li class="">1、拍照时请保持房间干净整洁，照片内不要有人像</li>';
						html +='		<li class="">2、手机横向拍摄，保持水平</li>';
						html +='		<li class="">3、建议尺寸：1366*768，最大15M；仅支持jpg、png格式</li>';
						html +='		<li class="">4、照片数量：最少5张、最多24张</li>';
						html +='	</ul>';
						html +='</div>';
						box.after(html);
					},
					builds : {
						onUpload : function(img){
							// 待开发
						},
						onDelete : function(path){
							// 待开发
						}
					}
    			});
    		// }
	    	checkTextLength("fangyuandianpings");//房源点评字数统计
	    	$("#dingjia").val(result.hi.phi_price == null ? "" : result.hi.phi_price); //房源定价
	    	$("#houseUserPicer").text(result.hi.phi_money);
	    	//$("#buildtypes").val(result.hi.buildType == null ? "" : result.hi.buildType);//楼盘类型
	    	radio_select("buildTypeDingjia", houseType);//定价-楼盘类型
	    	if(result.hi.phi_beginTime != null && result.hi.phi_beginTime != ""){
	    		$("#protect_beginTime").val(returnDate(result.hi.phi_beginTime));//保护开始时间
	    	}
	    	$("#protect_endTine").val(returnDate(result.hi.phi_endTime));//保护结束时间
	    	$("#protect_cause").text(result.hi.protect_cause == null ? "" : result.hi.protect_cause);//保护原因

	    	em_id = result.hi.phi_new_emId;
	    	$("#imageNum").val(result.hi.imageNum);//房源已有照片
	    	tipnum = result.hi.tipnum;
	    	//步骤完善的添加图片√；
	    	for (var int = 1; int < tipnum; int++) {
	    		$("#divRadius"+int+"s").addClass("aimage");
	    	}
	    	
	    	$("#updatephi_id").val(result.hi.phi_id == null ? "" : result.hi.phi_id);
	    	$("#propertyInfo_Id").val(result.hi.propertyInfo_Id == null ? "" : result.hi.propertyInfo_Id);
	    	
	    	$("#buildtype").val(result.hi.buildType == null ? "" : result.hi.buildType);
	    	$("#fangyuanpeizhi").val(result.hi.hi_project == null ? "" : result.hi.hi_project);
	    	$("#houseid").val(result.hi.hb_id == null ? "" : result.hi.hb_id);
	    	$("#recommendGroup").val(result.hi.recommendGroup_Id == null ? "" : result.hi.recommendGroup_Id);
	    	$("#resfangyuanyoushi").val(result.hi.hi_function == null ? "" : result.hi.hi_function);
	    	$("#hicode").val(result.hi.hi_code == null ? "" : result.hi.hi_code);
	    	
	    	var ss ="";
			var pp="<select id='housepinpai' name='phi_source' class='selects'>"
					+"<option value=''>--请选择--</option>";
			/** 推荐群体 */
			$.each(result.ru,function(index,date){
				ss = ss + "<label class='type-label'  onclick='changeqt(this)' for='type"+(index+100)+"'>"
						+date.recommendGroup_Name+"<i></i>" 
						+" <input type='checkbox' class='type-radio' name='hi_function' value='"+date.recommendGroup_Id+"' id='type"+(index+100)+"'>"
						+"</label>"
			})
			/** 房源品牌 */
			$.each(result.hb,function(index,date){
					pp = pp +"<option value='"+date.his_id+"' id=''>"+date.his_name+"</option>";
			})
			
			/** 房源配置 */
			pp = pp + "</select>";
			ss = ss + "</select>";
			document.getElementById("recommendGroupDiv1").innerHTML =ss;
			document.getElementById("fangyuanpinpaidiv").innerHTML =pp;
			$("#housepinpai").val(result.hi.his_id == null ? "" : result.hi.his_id);//房源品牌
			
	    	var s = $("#fangyuanfanghaos").val();//房源房号
	    	if(s== null || s=="0-0"){
	    		$("#fanghao1").addClass("span-checked");
	    		$("#fangyuanlouceng").val("0");
	    		$("#fangyuanfanghao").val("0");
	    	}else{
	    		$("#fangyuanfanghao").val(fanghaochuli(s,1));
	    		$("#fangyuanlouceng").val(fanghaochuli(s,2));
	    	}
	    	
	    	var hi_function = $("#resfangyuanyoushi").val();//房源优势
	    	if(hi_function != null && hi_function != ""){
	    		StringJiexi(hi_function,$("#fangyuanyoushigenjin"));//多选加载选中状态---房源优势
	    		if(strCheck != null && strCheck != ""){
	    			addProject(strCheck,2);
	    		}
	    	}
	    	var recommendGroup = result.hi.recommendGroup_Id;
	    	if(recommendGroup != null && recommendGroup != ""){
	    		StringJiexi(recommendGroup,$("#recommendGroupDiv1"));//多选加载选中状态---推荐群体
	    	}
	    	var hi_project = result.hi.hi_project;
	    	if(hi_project != null && hi_project != ""){
	    		StringJiexi(hi_project,$("#houseProject"));//多选加载选中状态---房源配置
	    		if(strCheck != null && strCheck != ""){
	    			addProject(strCheck,1);//1：房源配置；2：房源优势
	    		}
	    	}
	    	if(result.hi.phi_type != null && result.hi.phi_type == "存房失败"){
	    		$("#genjinjieguo").val("存房失败");
	    	}else if(result.hi.phi_type != null && result.hi.phi_type == "完成"){
	    		$("#genjinjieguo").val("完成");
	    		if(result.rb != null && result.rb.rb_playType != null  && result.rb.rb_playType != ""){
	    			var obj = result.rb.rb_playType.split(",");
	    			$("#moneyType").find(".type-label").each(function() {
	    				for (var int = 0; int < obj.length; int++) {
	    					if(obj[int]==$(this).find(".common-radio").val()){
	    						$(this).addClass("span-checked");
	    						$(this).find(".common-radio").attr("checked", true);
	    					}
	    				}
	    			});
	    			chanageradio(1);
	    		}else{
	    			$("#moneyType").find(".type-label").each(function() {
	    					if("合同"==$(this).find(".common-radio").val()){
	    						$(this).addClass("span-checked");
	    						$(this).find(".common-radio").attr("checked", true);
	    					}
	    			});
	    		}
	    	}
	    	$('#phi_rentDay').val(phi_rentDay); //免租期
	    	$("#zhifujine").val(rb_money);//支付金额
	    	$("#fukuanfangshi").val(bs_payType);//支付方式
	    	cunfangjieguo($("#genjinjieguo").val());
	    	// 物业信息
			var prop_name =returnValue(result.hi.propertyInfo_Name);
			$("input[name='propertyInfo_id']")
				.val(prop_name)
				//.val(prop_name.replace(/\d+/g,'').replace("-","").trim())
				.attr("data-id", result.hi.propertyInfo_Id)
				.attr("data-uid", result.hi.upn_id);
					$.ajax({
						type: "POST",
						url: "/houseLibrary/queryPropertyInfoList",
						data: {
							upn_sid: result.hi.upn_id
						},
						contentType: "application/x-www-form-urlencoded; charset=utf-8",
						dataType: "json",
						success: function(result) {
							switch (result.code) {
							case 200:
								$("select[name=porp_name]").remove();
								// 更新物业
//								initPropertyNameList(result.data);
								break;
							}
						}
					});
	    }
	});
}

//删除图片
$(document).on('click','.close',function () {
    var path = $(this).parent().find(".image-item-img").attr("data-url");
	$.ajax({
        type: "POST",
        url: "/intention/deleteHouseIntentionImage",
        data: "him_path="+path,
        dataType: "json",
        success: function(result) {
			if (result.msg == 401) {
                $.jBox.tip("删除失败!");
			}
		}
	})
});

function chanageCountShow3(){
	$("#countDiv3").show();
	//$("#countDivShow3").hide();
	$("#contents3 .content-text-div-content dl dd").css("color","#ddd");
	$("#contents3 .content-text-div-content dl dt").css("color","#666");
	$("#contents3 .content-text-div-content dl dd img").css("opacity","0.3");
	
	$("#contents3 .content-text-div-content dl dd .image_title").css("opacity","0.3");
}

function chanageCountHide3(){
	$("#countDiv3").hide();
	//$("#countDivShow3").show();
	$("#contents3 .content-text-div-content dl dd").css("color","#666");
	$("#contents3 .content-text-div-content dl dt").css("color","#000");
	$("#contents3 .content-text-div-content dl dd img").css("opacity","1");
	$("#contents3 .content-text-div-content dl dd .image_title").css("opacity","1");
}

/*
 * 意向房源信息修改/跟进DIV显示
 */
function updateHouseDiv(obj){
	$("#fieldset1s").hide();
	$("#fieldset2s").hide();
	$("#fieldset3s").hide();
	$("#fieldset4s").hide();
	$("#updateDiv").hide();
	var gid = $("#gj_emID").val();
	// 判断是否登录
	if(isEmpty(gid)){
		 if(confirm("账户缓存已清除，是否重新登陆？"))
			 window.parent.location.reload();
		return;
	}
	// 私盘
	if(houseType == "私盘" && gid != "" && em_id != gid){
		$.jBox.tip("该房源已设置保护","error");
		return;
	}
	if(!isEmpty(houseType) && (tipnum == 6 || houseType == "公盘" ||  em_id == gid) ){
		if(tipnum == 5){
			$.jBox.tip("该房源已跟进完成，不能修改！");
		}else{
			if(tipnum >= obj){
				$("#updateDiv").show();
				$("#fieldset"+obj+"s").show();
				if(obj==3){
					var buildtype = $("input[name='buildTypeDingjia']:checked").val();
					if(buildtype != null && buildtype != "" && buildtype == "保护"){
						$("#selectBuildTypePublic").show();
					}
				}
			}else{
				$.jBox.tip("请先跟进前面的内容！");
			}
		}
	}
}

$(function(){
	$("input[name='buildTypeDingjia']").click(function(){
		var buildtype = $("input[name='buildTypeDingjia']:checked").val();
		if(buildtype != null && buildtype != "" && buildtype == "保护"){
			$("#selectBuildTypePublic").show();
		}else{
			$("#selectBuildTypePublic").hide();
		}
	})
	
})


//房源修改提交
function submit1(obj){
	if(obj == 1){
		fangyuangenjinsubmit(tipnum,1);
	}else if(obj == 2){
		fangyuanshikansubmit(tipnum,2);
	}else if(obj == 3){
		fangyuandingjiasubmit(tipnum,4);
	}else if(obj == 4){
        if(tipnum == 5){
            $.jBox.tip("该房源已跟进完成，不能修改！");
            return;
        }
		if($("#genjinjieguo").val() == "完成"){
			if($("#rb_lx").val() == "定金" || $("#rb_lx").val() == "诚意金"){
				if($("#zhifujine").val() == null || $("#zhifujine").val() == "" || $("#fukuanfangshi").val() == null || $("#fukuanfangshi").val() == ""){
					$.jBox.tip("请将带*的内容完善！");
					return ;
				}
			}
			swal({
				title: "慎重操作",   
				text: "该房源将会进入招租房源表进行招租",   
				type: "warning",   
				showCancelButton: true,   
				confirmButtonColor: "#DD6B55",   
				confirmButtonText: "确定",  
				closeOnConfirm: false 
				}, function(){  
					fangyuancunfangsubmit(tipnum,5);
					if(msg == "success"){
						swal({
							title:"存房成功", 
							text : "恭喜您，存房成功，该房源已进入招租房源表!", 
							type : "success"
						});
					}else{
						swal({
							title:"存房失败", 
							text : "存房失败，请将所有带*的内容完善!", 
							type : "error"
						});
					}
					 
			});
			
		}else if($("#genjinjieguo").val() == "存房失败"){
			fangyuancunfangsubmit(5);
//			$.jBox.tip("存房成功");
		}
		
	}else{
		
	}
	updateDivCheck();
	$("#fieldset"+obj+"s").css("display","none");
	$("#fieldset"+obj).css("display","block");
	$("#divFieldset"+obj).css("margin-bottom","0px");
	$("#submitdiv"+obj).show();
	
}

/** 房号选择未知 qs */
function fanghaoweizhi(obj) {
	var houseNum = $("#fangyuanfanghaos").val();
	if ($(obj).find("input").is(":checked")) {
		$(obj).removeClass("span-checked");
		$(obj).find("input").attr("checked", false);
		if(houseNum != null && houseNum != ""){
			$("#fangyuanfanghao").val(fanghaochuli(houseNum,1));
			$("#fangyuanlouceng").val(fanghaochuli(houseNum,2));
		}else{
			$("#fangyuanlouceng").val(null);
			$("#fangyuanfanghao").val(null);
		}
		document.getElementById("fangyuanlouceng").readOnly=false;
		document.getElementById("fangyuanfanghao").readOnly=false;
		
	} else {
		$(obj).addClass("span-checked");
		$(obj).find("input").attr("checked", true);
		$("#fangyuanlouceng").val("0");
		$("#fangyuanfanghao").val("0");
		document.getElementById("fangyuanlouceng").readOnly=true;
		document.getElementById("fangyuanfanghao").readOnly=true;
	}

}


function radio_select(names,obj){//性别默认选中
	$("input[name='phi_user_sex']:checked").val();//获取选中的值
	$("input[name='"+names+"']").each(function(){
		if($(this).val() == obj){
			$(this).parent().addClass("common-checkbox-checked");
			$(this).attr("checked",true);
		}
	})
}














