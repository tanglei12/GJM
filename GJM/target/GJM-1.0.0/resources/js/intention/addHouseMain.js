$(function() {
	feedback();
	selectImage();
	selecthouseInfo();
	
	/** 更改房源实勘--验证*/
	$("#addTrack").find(".form-control").focus(function(){
		if (typeof($(this).data("oldData")) == "undefined") {
			$(this).data("oldData", $(this).val());
		}
	}).change(function(){
		var $this = $(this);
		var $thisVal = $(this).val();
		$this.data("newData", $thisVal);
	});
	
	/** 更改房源实勘(多选验证)--验证*/
	$("#addTrack").find(".checkboxs").focus(function(){
		if (typeof($(this).data("oldData")) == "undefined") {
			$(this).data("oldData", $(this).attr("checked"));
		}
	}).change(function(){
		var $this = $(this);
		var $thisVal = $(this).attr("checked");
		$this.data("newData", $thisVal);
	});
	
	/** 更改房源基础信息--验证*/
	$("#xiugai").find(".form-control").focus(function(){
		if (typeof($(this).data("oldData")) == "undefined") {
			$(this).data("oldData", $(this).val());
		}
	}).change(function(){
		var $this = $(this);
		var $thisVal = $(this).val();
		$this.data("newData", $thisVal);
	});
	
	/** 更改房源实勘(多选验证)--验证*/
	$("#updataInfo").find(".type-radio").focus(function(){
		if (typeof($(this).data("oldData")) == "undefined") {
			$(this).data("oldData", $(this).attr("checked"));
		}
	}).change(function(){
		var $this = $(this);
		var $thisVal = $(this).attr("checked");
		$this.data("newData", $thisVal);
	});
});


//得到物业、品牌、扩展、推荐群体基础信息
function jumpAddHouse(){
	$.ajax({
	    type: "POST",
	    url: "/house/addInfo",
	    data: "PropertyInfo_Id=",
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    async:false,
	    success: function(result) {
	    	if(result != "1"){
				$("#userCenterPropertyInfo").html("");
				$("#userCenterPropertyInfo").append("<option selected='selected' value=''>请选择</option>");
				$.each(result.userCenterPropertyInfoList, function(idx, userCenterPropertyInfo) {
					$("#userCenterPropertyInfo").append("<option value='"+userCenterPropertyInfo.propertyInfo_Id+"'>"+userCenterPropertyInfo.propertyInfo_Name+"</option>");
				});
			}
	    }
	    });
}

//毫秒转换为日期格式
var format = function(time, format){
    var t = new Date(time);
    var tf = function(i){return (i < 10 ? '0' : '') + i};
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
        switch(a){
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


//新增房源的可选属性
function addHouseSubmit(){
	$("#addSubmit").submit();
};

/*
//得到存房信息
function feedback(){
	$.ajax({
	    type: "POST",
	    url: "/intention/selectFeedbackById",
	    data: "phi_id="+$("input[name='phi_id']").val(),
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    async:false,
	    success: function(result) {
	    	if(result.houeFeedback != null){
	    		$("input[name='hf_payType']").val(result.houeFeedback.hf_payType);
	    		$("input[name='hf_payMoney']").val(result.houeFeedback.hf_payMoney);
	    		var tt = format(result.houeFeedback.hf_houseDate, 'yyyy-MM-dd');
	    		$("input[name='hf_houseDate']").val(tt);
	    	}
	    }
	    });
}*/

//提交存房信息
function addFeedback(){
	$.ajax({
	    type: "POST",
	    url: "/intention/addFeedback",
	    data: "phi_id="+$("input[name='phi_id']").val()+"&hf_payType="+$("input[name='hf_payType']").val()+"&hf_payMoney="+$("input[name='hf_payMoney']").val()+"&hf_houseDate="+$("input[name='hf_houseDate']").val(),
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    async:false,
	    success: function(result) {
	    	if(result.result == 'success'){
	    		$.jBox.tip('提交存房信息成功');
	    	}else{
	    		$.jBox.tip('提交存房信息失败');
	    	}
	    }
	    });
}


//得到意向房源图片
function selectImage(){
	$.ajax({
	    type: "POST",
	    url: "/intention/selectImageById",
	    data: "phi_id="+$("input[name='phi_id']").val(),
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    async:false,
	    success: function(result) {
	    	$.each(result.houseIntentionImageList, function(idx, intentionImage) {
	    		var num = Math.random()*700 + 800;
	        	num = parseInt(num, 10);
	        	var him_id = intentionImage.him_id;
	        	var ty = "";
	        	if(intentionImage.ty == 'page'){
	        		ty = "封面";
	        	}
	        	if(intentionImage.ty == 'effect'){
	        		ty = "效果图片";
	        	}
	        	if(intentionImage.ty == 'solid'){
	        		ty = "户型图片";
	        	}
	        	if(intentionImage.ty == '3d'){
	        		ty = "3D效果图";
	        	}
	        	$("#yhk").append("<div  id='"+num+"' style='margin-left:20px;margin-top:10px;position: relative; width: 150px;float:left;'><img class='imagesf' width='150px' onclick='deleteImage("+num+","+him_id+")' height='150px;' src="+intentionImage.him_path+"><span class='imageTypes' style='position: absolute; top: 120; left: 50;width:100;line-height:20px;height:20;color:#fff;background:#404144;text-align:center;opacity:0.9;'>"+ty+"</span></div>");
			});
	    	
	    }
	    });
}

//得到意向房源实勘
function selecthouseInfo(){
	$.ajax({
	    type: "POST",
	    url: "/intention/selecthouseInfo",
	    data: "phi_id="+$("input[name='phi_id']").val(),
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    async:false,
	    success: function(result) {
			$("#houseHouseBrand").html("");
			$.each(result.houseHouseBrandList, function(idx, houseBrand) {
				if(result.houseTrack == null){
					$("#houseHouseBrand").append("<option value='"+houseBrand.hb_id+"'>"+houseBrand.hb_name+"</option>");
				}else{
					if(houseBrand.hb_id == result.houseTrack.hb_id){
						$("#houseHouseBrand").append("<option selected='selected' value='"+houseBrand.hb_id+"'>"+houseBrand.hb_name+"</option>");
					}else{
						$("#houseHouseBrand").append("<option value='"+houseBrand.hb_id+"'>"+houseBrand.hb_name+"</option>");
					}
				}
			});
			if(result.houseTrack != null){
				$.each(result.versions, function(idx, version) {
					if(version != result.houseTrack.hi_version){
						$("#addVer").before("<label class='type-label' onclick='changeTypeVer(this)' for='type7'><span class='glyphicon glyphicon-remove-circle delete' onclick='deleteType(this);'></span>"+version+"<i></i> <input type='checkbox' class='ver-radio' name='hi_version' value='"+version+"'></label>");
					}else{
						$("#addVer").before("<label class='type-label span-checked' onclick='changeTypeVer(this)' for='type7'><span class='glyphicon glyphicon-remove-circle delete' onclick='deleteType(this);'></span>"+version+"<i></i> <input type='checkbox' checked='checked' class='ver-radio' name='hi_version' value='"+version+"'></label>");
					}
				});
			}else{
				$.each(result.versions, function(idx, version) {
					$("#addVer").before("<label class='type-label' onclick='changeTypeVer(this)' for='type7'><span class='glyphicon glyphicon-remove-circle delete' onclick='deleteType(this);'></span>"+version+"<i></i> <input type='checkbox' checked='checked' class='ver-radio' name='hi_version' value='"+version+"'></label>");
				});
			}
			
			var brand = $("#houseHouseBrand").val();
			if(brand == '1'){
				$("#versions").css("display","block");
			}else{
				$("#versions").css("display","none");
			}
			
			$("#userCenterPropertyInfo").html("");
			$.each(result.userCenterPropertyInfoList, function(idx, userCenterPropertyInfo) {
				if(result.houseTrack == null){
					$("#userCenterPropertyInfo").append("<option value='"+userCenterPropertyInfo.propertyInfo_Id+"'>"+userCenterPropertyInfo.propertyInfo_Name+"</option>");
				}else{
					if(userCenterPropertyInfo.propertyInfo_Id == result.houseTrack.propertyInfo_Id){
						$("#userCenterPropertyInfo").append("<option selected='selected' value='"+userCenterPropertyInfo.propertyInfo_Id+"'>"+userCenterPropertyInfo.propertyInfo_Name+"</option>");
						$("input[name='PropertyInfo_way']").val("update");
					}else{
						$("#userCenterPropertyInfo").append("<option value='"+userCenterPropertyInfo.propertyInfo_Id+"'>"+userCenterPropertyInfo.propertyInfo_Name+"</option>");
					}
				}
				
			});
			$("#jgkj").html(result.housingValuationList);
			$.each(result.hoseRecommendGroupList, function(idx, hoseRecommendGroup) {
				$("#hoseRecommendGroups").append("<input type='checkbox' class='checkboxs' style='margin-left: 20px;' name='recommendGroup_Id' value='"+hoseRecommendGroup.recommendGroup_Id+"'>"+hoseRecommendGroup.recommendGroup_Name);
			});
			if(result.houseTrack != null){
				$("select[name='hi_area']").val(result.houseTrack.hi_area);
				$("select[name='hi_district']").val(result.houseTrack.hi_district);
				$("select[name='hi_track']").val(result.houseTrack.hi_track);
				$("input[name='hi_function']").val(result.houseTrack.hi_function);
				$("input[name='hi_measure']").val(result.houseTrack.hi_measure);
				$("select[name='hi_houseW']").val(result.houseTrack.hi_houseW);
				$("select[name='hi_houseT']").val(result.houseTrack.hi_houseT);
				$("select[name='hi_houseS']").val(result.houseTrack.hi_houseS);
				$("select[name='hi_situation']").val(result.houseTrack.hi_situation);
				var adIds = ""; 
				$("input:checkbox[name='hi_project']").each(function(i){  
				    if(0==i){  
				        adIds = $(this).val();  
				    }else{  
				        adIds += (","+$(this).val());  
				    }  
				});  
				var phi_configure = result.houseTrack.hi_project;
				var strs= result.houseTrack.hi_project.split(",");
				var is=adIds.split(","); //字符分割
				for (i=0;i<is.length ;i++ ) {
					for (j=0;j<strs.length ;j++ ) {
						if(is[i] == strs[j]){
							$("input:checkbox[name='hi_project']").each(function(i){ 
								if($(this).val() == strs[j]){
									$(this).parent(".type-label").addClass("span-checked");
									$(this).attr("checked",'checked');
									phi_configure=phi_configure.replace($(this).val() +",","");
									phi_configure=phi_configure.replace($(this).val(),"");
								}
					        });  
						}
					}
				}
				var phi_configureList=phi_configure.split(","); //字符分割
				if(phi_configureList.length > 0){
					for(i=0;i<phi_configureList.length ;i++ ){
						if(phi_configureList[i] != ""){
						 $("#addPzs").before("<label class='type-label span-checked' onclick='changeTypes(this)' for='type7'><span class='glyphicon glyphicon-remove-circle delete' onclick='deleteType(this);'></span>"+phi_configureList[i]+"<i></i> <input type='checkbox'  checked='checked' class='pz-radio' name='hi_project' value='"+phi_configureList[i]+"'></label>");
						}
					}
				}
				$("textarea[name='hi_content']").val(result.houseTrack.hi_content);
				if(result.houseTrack.recommendGroup_Id != null && result.houseTrack.recommendGroup_Id != ""){
					var strs=result.houseTrack.recommendGroup_Id.split(","); //字符分割 
					var adIds = "";  
					
			        $("input:checkbox[name='recommendGroup_Id']").each(function(i){  
			            if(0==i){  
			                adIds = $(this).val();  
			            }else{  
			                adIds += (","+$(this).val());  
			            }  
			        });  
			        var is=adIds.split(","); //字符分割
			        for (i=0;i<is.length ;i++ ) {
			        	for (j=0;j<strs.length ;j++ ) {
			        		if(is[i] == strs[j]){
			        			$("input:checkbox[name='recommendGroup_Id']").each(function(i){  
			        				if($(this).val() == strs[j]){
			        					$(this).attr("checked",'checked');
			        				}
									$("#dd").hide();
			    		        });  
			        		}
			        	}
					}
		        }
			}
	    }
	    });
}

//提交房源实勘
function addTrack(){
	
	var CONTRACT_STATE1 = true;
	var $control =$("#addTrack").find(".form-control");
	var $checkboxs =$("#addTrack").find(".checkboxs");
	var i =1;
	$control.each(function(){
		if(CONTRACT_STATE1){
			$(this).change();
			var oldData =$(this).data("oldData");
			var newData =$(this).data("newData");
			if (typeof(oldData) != "undefined" && newData != oldData) {
				i++;
			}
		} else {
			return false;
		}
	});
	
	$checkboxs.each(function(){
		if(CONTRACT_STATE1){
			$(this).change();
			var oldData =$(this).data("oldData");
			var newData =$(this).data("newData");
			if (typeof(oldData) != "undefined" && newData != oldData) {
				i++;
			}
		} else {
			return false;
		}
	});
	
	if(CONTRACT_STATE1){
		if (i == 0) {
			$.jBox.tip('您未做任何更改');
		}else{
			//获取房源基础信息
			var hi_area = $("select[name='hi_area']").val();
			var hi_district = $("select[name='hi_district']").val();
			var hi_track = $("select[name='hi_track']").val();
			var hi_content = $("textarea[name='hi_content']").val();
			var hi_measure = $("input[name='hi_measure']").val();
			var hi_houseS = $("select[name='hi_houseS']").val();
			var hi_houseT = $("select[name='hi_houseT']").val();
			var hi_houseW = $("select[name='hi_houseW']").val();
			var hi_project = "";
			$.ajax({
			    type: "POST",
			    url: "/propertyInfo/selectvaluation",
			    data: "id="+$("#propertyInfo_Id").val(),
			    contentType: "application/x-www-form-urlencoded; charset=utf-8",
			    dataType: "json",
			    async:false,
			    success: function(result) {
			    	var re = 0;
			    	if(result != "1"){
			    		$.each(result.housingValuationList, function(idx, item) {
			    			if(hi_houseS == item.hi_houseS && hi_houseT == item.hi_houseT && hi_houseW == item.hi_houseW){
			    				re = 1;
			    			}
			    		});
					}
//			    	if(re == 0){
//			    		alert("该小区不存在改户型，请检查或联系主管添加");
//			    		return;
//			    	}else{
			    		$('input[name="hi_project"]:checked').each(function(){ 
							hi_project += $(this).val()+",";
						}); 
						var Pro = "";  
						$("input[name='recommendGroup_Id']:checked").each(function(){ 
							Pro+=$(this).val()+","; 
							}) 
						var Propert = $("select[name='Propert']").val();
						var P = $("select[name='P']").val();
						var hi_version="";
						$('input[name="hi_version"]:checked').each(function(){ 
							hi_version=($(this).val()); 
						});
						$.ajax({
						    type: "POST",
						    url: "/intention/addTrack",
						    data: "phi_id="+$("input[name='phi_id']").val()+"&hi_area="+hi_area+"&hi_district="+hi_district+"&hi_track="+hi_track+"&hi_content="+hi_content+"&Pro="+Pro+"&Propert="+Propert+"&P="+P+"&hi_project="+hi_project+"&hi_version="+hi_version+"&hi_houseS="+hi_houseS+"&hi_houseT="+hi_houseT+"&hi_houseW="+hi_houseW+"&hi_measure="+hi_measure+"&hi_situation="+$("select[name='hi_situation']").val(),
						    contentType: "application/x-www-form-urlencoded; charset=utf-8",
						    dataType: "json",
						    async:false,
						    success: function(result) {
						    	if(result.result == 0){
						    		$.jBox.tip('提交房屋信息失败');
						    	}else{
						    		selectOrade($("input[name='phi_id']").val());
						    		$control.removeData("newData").removeData("oldData");
						    		$checkboxs.removeData("newData").removeData("oldData");
						    	}
						    }
						    });
			    	//}
			    }
			});
			
		}
	}
	
}

function addHouseConfirm(){
	var submit = function (v, h, f) {
	    if (v == 'ok'){
	    	addHouseInfo()
	    }
	    else if (v == 'cancel'){}
	    return true; //close
	};
	$.jBox.confirm("确定提交房源吗？", "管家婆管理系统",submit);
}

function addHouseInfo(){
	$.ajax({
	    type: "POST",
	    url: "/intention/addHouseInfo",
	    data: "phi_id="+$("input[name='phi_id']").val(),
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    async:false,
	    success: function(result) {
	    	if(result.result == 1){
	    		window.location.href = '/intention/JumpAddStockHouse?phi_id='+$("input[name='phi_id']").val();
	    	}else{
	    		$.jBox.tip('请先确定合同!');
	    	}
	    }
	    });
}

function selectIntention(){
	$.ajax({
	    type: "POST",
	    url: "/intention/selectIntention",
	    data: "phi_id="+$("input[name='phi_id']").val(),
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    async:false,
	    success: function(result) {
	    	$("input[name='hi_name']").val(result.houseIntention.phi_name);
			$("input[name='hi_money']").val(result.houseIntention.phi_money);
			$("input[name='hi_floor']").val(result.houseIntention.phi_floor);
			$("input[name='hi_address']").val(result.houseIntention.phi_address);
			$("input[name='hi_peopleName']").val(result.houseIntention.phi_user);
			$("select[name='propertyInfo_Id']").val(result.houseIntention.propertyInfo_Id);
	    }
	    });
}

//提交物业
function addProperty(){
	var wy = $("#wy").css("display");
	if(wy == 'block'){
		
	}
	$.ajax({
	    type: "POST",
	    url: "/intention/addProperty",
	    data: $('#addProperty').serialize(),
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    async:false,
	    success: function(result) {
	    	if(result.result == 0){
	    		$.jBox.tip('提交物业信息失败');
	    	}else{
	    		selectOrade($("input[name='phi_id']").val());
	    	}
	    }
	    });
}

//修改房源基本信息
function updataInfo(){
	
	var CONTRACT_STATE1 = true;
	var $control =$("#xiugai").find(".form-control");
	var $checkboxs =$("#xiugai").find(".type-radio");
	var i =1;
//	$control.each(function(){
//		if(CONTRACT_STATE1){
//			$(this).change();
//			var oldData =$(this).data("oldData");
//			var newData =$(this).data("newData");
//			if (typeof(oldData) != "undefined" && newData != oldData) {
//				i++;
//			}
//		} else {
//			return false;
//		}
//	});
//	
//	$checkboxs.each(function(){
//		if(CONTRACT_STATE1){
//			$(this).change();
//			var oldData =$(this).data("oldData");
//			var newData =$(this).data("newData");
//			if (typeof(oldData) != "undefined" && newData != oldData) {
//				i++;
//			}
//		} else {
//			return false;
//		}
//	});
	
	if(CONTRACT_STATE1){
		if (i == 0) {
			$.jBox.tip('您未做任何更改');
		}else{
			$.ajax({
			    type: "POST",
			    url: "/intention/updataInfo",
			    data: $('#updataInfo').serialize(),
			    contentType: "application/x-www-form-urlencoded; charset=utf-8",
			    dataType: "json",
			    async:false,
			    success: function(result) {
			    	if(result.result == 0){
			    		$.jBox.tip('修改房源基本信息失败');
			    	}else{
			    		selectOrade($("input[name='phi_id']").val());
			    		$control.removeData("newData").removeData("oldData");
			    	}
			    }
			});
		}
	}
	
}


function changeBrand(){
	var brand = $("#houseHouseBrand").val();
	if(brand == '1'){
		$("#versions").css("display","block");
	}else{
		$("#versions").css("display","none");
	}
}

function addBrandType(str){
	$.ajax({
		type: "POST",
	    url: "/houseHouseBrand/addBrandType",
	    data: "str="+str,
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    async:false,
	    success: function(result) {
	    		
	    	}
	    });
}