$(function(){
	data();
	mui.previewImage();
})

function data(){
	$.ajax({
  	    type: "POST",
  	    url: "/intention/jumpAddIntentionAjax",
  	    data : {
  	    	phi_id: getQueryString("phi_id"),
  	    },
  	    dataType: "json",
  	    success: function(result) {
  	    	
  	    	$("#newName").text(result.hi.new_emName+"/"+result.hi.new_emPhone);
  	    	$("#houseType").text("("+result.hi.buildType+")"+result.hi.phi_type);
  	    	$("#addrss").text(result.hi.house_address);
  	    	$("#houseTSW").text((result.hi.hi_houseS == null ? "": result.hi.hi_houseS+"室")+(result.hi.hi_houseT == null ? "": result.hi.hi_houseT+"厅")+(result.hi.hi_houseW == null ? "": result.hi.hi_houseW+"卫"));
  	    	$("#name").text(result.hi.phi_user+"-"+result.hi.phi_user_sex+"("+ result.hi.phi_phone +")");
  	    	$("#brand").text(result.hi.his_name == null ? "" : result.hi.his_name);
  	    	$("#renovation").text(result.hi.hi_situation == null ? "" : zhuangxiu(result.hi.hi_situation));
  	    	$("#house_project").text(result.hi.hi_project == null ? "" : result.hi.hi_project);
  	    	$("#advantage").text(result.hi.hi_function == null ? "" : result.hi.hi_function);
  	    	$("#comment").text(result.hi.hi_content == null ? "" : result.hi.hi_content);
  	    	$("#recommend").text(result.hi.recommend_name == null ? "" : result.hi.recommend_name);
  	    	
  	    	var image = "";
  	    	$(result.houseIntentionImages).each(function(index, item){
  	    		image += '<img class="image-item-img" src="'+ item.him_path +'" data-preview-src="" data-preview-group="1">';
  	    	});
  	    	$("#image").html(image);
  	    	
  	    	// 意向房源跟进记录
  	    	$(".loading ul").html("");
  	    	$(result.ht).each(function(index, item){
  	    		$(".loading ul").append('<li><label class="name">'+ item.em_name +'</label><label class="phone">'+ item.ht_count +'</label><label class="date">'+ format(item.ht_time,"yyyy-MM-dd HH:mm") +'</label></li>');
  	    	});
  	    }
	});
}

function zhuangxiu(val){
	switch (val) {
		case 0:
			return "清水";
			break;
		case 1:
			return "简装";
			break;
		case 2:
			return "精装";
		break;
	default:
		break;
	}
}

/**
 * 毫秒转换为日期格式
 * @param time 时间/时间字符串
 * @param format 时间格式 "yyyy-MM-dd" || "yyyy-MM-dd HH:mm:ss"
 * @returns
 */
function format(time, format) {
	if (time == null) {
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

function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
} 