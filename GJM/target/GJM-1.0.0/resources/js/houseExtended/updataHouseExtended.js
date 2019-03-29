$(function(){ 
$(":checkbox").click(function(){ 
	if($(this).attr("checked")!='true') 
	{ 
		var name = $(this).attr("name");
		$(this).siblings(":checkbox[name='"+name+"']").attr("checked",false); 
		$(this).attr("checked",true); 
	} 
}); 
}); 
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
	    url: "/houseExtended/selectHouseExtendedById",
	    data: "id="+id,
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    async:false,
	    success: function(result) {
	    	if(result != "1"){
	    		$("#houseHouseExtended").html("");
	    		houseExtendedInfo(result.houseHouseExtended)
			}
	    }
	    });
}

//添加房屋扩展信息
function houseExtendedInfo(houseHouseExtended){
	$("#he_id").val(houseHouseExtended.he_id);
	$("#he_ids").val(houseHouseExtended.he_id);
	$("input[name='he_peopleName']").val(houseHouseExtended.he_peopleName);
	$("input[name='he_money']").val(houseHouseExtended.he_money);
	$("input[name='he_phone']").val(houseHouseExtended.he_phone);
	$("input[name='he_address']").val(houseHouseExtended.he_address);
	$("input[name='he_number']").val(houseHouseExtended.he_number);
	$("input[name='he_cardNumber']").val(houseHouseExtended.he_cardNumber);
	$("input[name='he_state']").val(houseHouseExtended.he_state);
	
	if(houseHouseExtended.he_nature == "住宅"){
		$(":checkbox[value='住宅']").attr("checked",true); 
	}
	if(houseHouseExtended.he_nature == "商住"){
		$(":checkbox[value='商住']").attr("checked",true); 
		$(":checkbox[value='住宅']").attr("checked",false);
	}
	if(houseHouseExtended.he_nature == "商业"){
		$(":checkbox[value='商业']").attr("checked",true); 
		$(":checkbox[value='住宅']").attr("checked",false);
	}
	var tts = format(houseHouseExtended.he_buyTime, 'yyyy-MM-dd');
	$("input[name='buyTime']").val(tts);
}

/** 查询Url参数*/
function getUrlParam(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return decodeURI(r[2]); return null; 
}