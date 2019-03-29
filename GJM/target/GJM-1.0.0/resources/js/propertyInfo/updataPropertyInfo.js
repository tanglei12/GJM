

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


//查询房屋信息
function selectHouseExtended(id){
	$.ajax({
	    type: "POST",
	    url: "/propertyInfo/selectPropertyInfoById",
	    data: "id="+id,
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    async:false,
	    success: function(result) {
	    	if(result != "1"){
	    		$("#propertyInfo").html("");
	    		propertyInfo(result.userCenterPropertyInfo)
	    		userCenterSubwany(result.userCenterSubwany);
			}
	    }
	    });
}

//添加房屋扩展信息
function propertyInfo(userCenterPropertyInfo){
	var tts = format(userCenterPropertyInfo.propertyInfo_OpenTime, 'yyyy-MM-dd');
	$("input[name='openTime']").val(tts);
	$("input[name='propertyInfo_Id']").val(userCenterPropertyInfo.propertyInfo_Id);
	$("input[name='PropertyInfo_Name']").val(userCenterPropertyInfo.propertyInfo_Name);
	$("select[name='PropertyInfo_State']").val(userCenterPropertyInfo.propertyInfo_State);
	$("textarea[name='propertyInfo_introduce']").val(userCenterPropertyInfo.propertyInfo_introduce);
	$("select[name='PropertyInfo_Type']").val(userCenterPropertyInfo.propertyInfo_Type);
	$("select[name='PropertyInfo_ManaStyle']").val(userCenterPropertyInfo.propertyInfo_ManaStyle);
	$("input[name='PropertyInfo_OpenPrice']").val(userCenterPropertyInfo.propertyInfo_OpenPrice);
	$("input[name='PropertyInfo_TotalArea']").val(userCenterPropertyInfo.propertyInfo_TotalArea);
	$("input[name='PropertyInfo_BuildArea']").val(userCenterPropertyInfo.propertyInfo_BuildArea);
	$("input[name='PropertyInfo_TotalAmount']").val(userCenterPropertyInfo.propertyInfo_TotalAmount);
	$("input[name='PropertyInfo_PlotRate']").val(userCenterPropertyInfo.propertyInfo_PlotRate);
	$("input[name='PropertyInfo_GreenRate']").val(userCenterPropertyInfo.propertyInfo_GreenRate);
	$("input[name='PropertyInfo_Life']").val(userCenterPropertyInfo.propertyInfo_Life);
	$("input[name='PropertyInfo_CarPark']").val(userCenterPropertyInfo.propertyInfo_CarPark);
	$("input[name='PropertyInfo_Public']").val(userCenterPropertyInfo.propertyInfo_Public);
	$("input[name='PropertyInfo_Wuguan']").val(userCenterPropertyInfo.propertyInfo_Wuguan);
	$("input[name='PropertyInfo_Tel']").val(userCenterPropertyInfo.propertyInfo_Tel);
	$("input[name='PropertyInfo_Cost']").val(userCenterPropertyInfo.propertyInfo_Cost);
	$("input[name='PropertyInfo_address']").val(userCenterPropertyInfo.propertyInfo_address);
	$("textarea[name='PropertyInfo_remark']").val(userCenterPropertyInfo.propertyInfo_remark);
	$("input[name='pi_id']").val(userCenterPropertyInfo.pi_id);
	if(userCenterPropertyInfo.pi_id != 0){
		$("#conhouseno").val(userCenterPropertyInfo.pi_name);
	}else{
		$("#conhouseno").val("无");
	}
	$("input[name='PropertyInfo_developer']").val(userCenterPropertyInfo.propertyInfo_developer);
	
}

function userCenterSubwany(userCenterSubwany){
	var adIds = ""; 
	$("input:checkbox[name='perimeter']").each(function(i){  
	    if(0==i){  
	        adIds = $(this).val();  
	    }else{  
	        adIds += (","+$(this).val());  
	    }  
	});  
	var subwanyName = "";
	$.each(userCenterSubwany, function(idx, subwany) {
		subwanyName += subwany.subway_Name+",";
	});
	var phi_configure = subwanyName;
	var strs=subwanyName.split(",");
	var is=adIds.split(","); //字符分割
	for (i=0;i<is.length ;i++ ) {
		for (j=0;j<strs.length ;j++ ) {
			if(is[i] == strs[j]){
				$("input:checkbox[name='perimeter']").each(function(i){ 
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
			 $("#addZb").before("<label class='type-label span-checked' onclick='changeType(this)' for='type7'><span class='glyphicon glyphicon-remove-circle delete' onclick='deleteType(this);'></span>"+phi_configureList[i]+"<i></i> <input type='checkbox'  checked='checked' class='type-radio' name='perimeter' value='"+phi_configureList[i]+"'></label>");
			}
		}
	}
}