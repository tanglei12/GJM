$(function(){ 
	selectHouseExtended();
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


//查询推荐群体
function selectHouseExtended(){
	$.ajax({
	    type: "POST",
	    url: "/houseHouseBrand/selectRecommendGroup",
	    data: "id=0",
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    async:false,
	    success: function(result) {
	    	if(result != "1"){
	    		$.each(result.hoseRecommendGroupList, function(idx, hoseRecommendGroup) {
					$("#hoseRecommendGroups").append("<input type='checkbox' style='margin-left: 20px;' name='recommendGroup_Id' value='"+hoseRecommendGroup.recommendGroup_Name+"'>"+hoseRecommendGroup.recommendGroup_Name);
				});
			}
	    }
	    });
}

//添加推荐群体
function houseHouseBrand(houseHouseBrand){
	$("input[name='hb_id']").val(houseHouseBrand.hb_id);
	$("input[name='hb_name']").val(houseHouseBrand.hb_name);
	$("textarea[name='hb_desc']").val(houseHouseBrand.hb_desc);
}

function addsubmit(){
	var i = 0;
	$.jBox.tip("正在添加", 'loading');
	$("#addSubmit").submit();
	if(i == 1){
		$.jBox.closeTip()
	}
}