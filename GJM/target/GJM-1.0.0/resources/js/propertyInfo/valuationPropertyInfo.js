function selectvaluation(id){
	$.ajax({
	    type: "POST",
	    url: "/propertyInfo/selectvaluation",
	    data: "id="+id,
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    async:false,
	    success: function(result) {
	    	if(result != "1"){
	    		$.each(result.housingValuationList, function(idx, item) {
	    			$("input[name='hv_traffic']").val(item.hv_traffic);
	    			$("input[name='hv_position']").val(item.hv_position);
	    			$("input[name='hv_env']").val(item.hv_env);
	    			$("input[name='hv_customer']").val(item.hv_customer);
	    			$("input[name='hv_active']").val(item.hv_active);
	    			$(".kj").after("<tr class='hxkj'>"+
				    "<td style='padding-left: 120px;'>户型:<span class='font_col'>"+item.hi_houseS+"</span>室<span class='font_col'>"+item.hi_houseT+"</span>厅<span class='font_col'>"+item.hi_houseW+"</span>卫，最高控价<span class='font_col'>"+item.hv_max+"</span>元，占比<span class='font_col'>"+item.hv_size+"</span>%</td>"+
				  "</tr>"
					);
	    		});
			}
	    }
	});
}
function addSub(){
	var txt  ="";
	$(".hxkj").each(function(idx){
		$(this).children("td").children("span").each(function(idxs){
			txt +="#"+$(this).text(); 
		});
		txt += "~";
	});
	$.ajax({
	    type: "POST",
	    url: "/propertyInfo/valuation",
	    data: "propertyInfo_Id="+$("input[name=propertyInfo_Id]").val()+"&hv_traffic="+$("input[name=hv_traffic]").val()+"&hv_position="+$("input[name=hv_position]").val()+"&hv_env="+$("input[name=hv_env]").val()+"&hv_customer="+$("input[name=hv_customer]").val()+"&hv_active="+$("input[name=hv_active]").val()+"&txt="+txt,
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    async:false,
	    success: function(result) {
	    	if(result != "1"){
	    		alert("修改成功");
	    		//window.parent.href_mo('/propertyInfo/propertyInfo',"房屋物业","房屋物业");
			}
	    }
	});
}