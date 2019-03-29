
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


//查询推荐群体
function selectHouseExtended(id){
	$.ajax({
	    type: "POST",
	    url: "/recommendGroup/selectRecommendGroupById",
	    data: "id="+id,
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    async:false,
	    success: function(result) {
	    	if(result != "1"){
	    		$("#recommendGroup").html("");
	    		recommendGroup(result.hoseRecommendGroup)
			}
	    }
	    });
}

//添加推荐群体
function recommendGroup(hoseRecommendGroup){
	$("#recommendGroup_Id").val(hoseRecommendGroup.recommendGroup_Id);
	$("input[name='RecommendGroup_Name']").val(hoseRecommendGroup.recommendGroup_Name);
}