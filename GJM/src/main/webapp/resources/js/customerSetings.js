$(function(){
	$.ajax({
	    type: "POST",
	    url: "/customerSee/selectCustomerSettings",
	    data : [],
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	if(result.queryCustomerSettings != null){
	    		$.each(result.queryCustomerSettings, function(index, item) {
		    		if(item.css_type == 0){
		    			$("#houseNum").val(item.css_num);
		    		}else if(item.css_type == 2){
		    			$("#daiNum").val(item.css_num);
		    		}else{
		    			$("#seeNum").val(item.css_num);
		    		}
		    	});
	    	}
	    }
	});
});

/**
 * 提交设置
 */
function submit(){
	if($("#houseNum").val() == ""){
		$("#houseNum").parent().next().text("新增房屋个数不能空");
		$("#houseNum").focus();
		return;
	}else{
		$("#houseNum").parent().next().text("");
		userName = $("#houseNum").val();
	}
	if($("#daiNum").val() == ""){
		$("#daiNum").parent().next().text("带看房屋个数不能空");
		$("#daiNum").focus();
		return;
	}else{
		$("#daiNum").parent().next().text("");
		userName = $("#daiNum").val();
	}
	if($("#seeNum").val() == ""){
		$("#seeNum").parent().next().text("实勘房屋个数不能空");
		$("#seeNum").focus();
		return;
	}else{
		$("#seeNum").parent().next().text("");
		userName = $("#seeNum").val();
	}
	
	$.ajax({
	    type: "POST",
	    url: "/customerSee/insertCustomerSettings",
	    data : "houseNum=" + $("#houseNum").val() +"&daiNum="+ $("#daiNum").val() +"&seeNum="+ $("#seeNum").val(),
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	if(result.code == 1){
	    		alert("统计设置成功！");
	    	}else{
	    		alert("统计设置失败！");
	    	}
	    }
	});
}