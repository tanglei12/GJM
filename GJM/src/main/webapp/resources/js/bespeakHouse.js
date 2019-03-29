var selectExtended = null;
$(function(){
	
	data();
});

//筛选获取数据
function data(){
	$("#content").table({
		titleBg:"#34495E",
		titleColor:"#FFF",
		search: true,
		dataTime: [
		           {
		        	   name: "预约时间",
		        	   string: "haa_time"
		           }
		],
		title: [
			    {
					name: "编号",
					string: "haa_id",
					parameter: ""
				},
				{
					name: "联系人",
					string: "haa_name",
					parameter: "",
					string1: "haa_phone",
					parameter1: ""
				},
				{
					name: "处理状态",
					string: "ha_operationState",
					parameter: ""
				},
				{
					name: "小区房号",
					string: "house_address",
					parameter: ""
				},
				{
					name: "预约类型",
					string: "haa_type",
					parameter: ""
				},
				{
					name: "备注",
					string: "haa_txt",
					parameter: ""
				},
				{
					name: "预约时间",
					string: "haa_time",
					parameter: ""
				},
				{
					name: "来源",
					string: "haa_source",
					parameter: {
						1:"灯杆",
						2:"天桥",
						3:"新潮广告",
						4:"广告门",
						5:"目标广告",
						6:"公交站广告",
						58:"58网站"
					}
				}
			],
		url: "/selectBespeakHouse",
		data: {},
		success: function(result){
			$(result).find("tbody tr").each(function(i){
				var dateTime = "";
				if($(this).find("td").eq(7).text() != ""){
					dateTime = returnDate(parseInt($(this).find("td").eq(7).text()));
				}
				$(this).find("td").eq(7).text(dateTime);
			});
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

//跳转修改房屋扩展信息界面
//多选按钮判断
function ck(){
	var checkCount = $("tbody input[name='check']:checked").length;
	var id = $("tbody input[name='check']:checked").parent().attr("data-id");
  if (checkCount == 0) {  
		 $.jBox.info('请选择一个！', '管家婆管理系统');
  } else if (checkCount > 1) {  
 	 $.jBox.info('只能选择一个！', '管家婆管理系统');
  } else {  
  	var jBoxConfig={};
  	jBoxConfig.defaults={
  			width:'auto',
  			buttons:{'确定':'ok'},
  			buttonsFocus:0,
  			
  	}
  	$.jBox.setDefaults(jBoxConfig);
  	
  	var ha_operationState = "";
	var haa_txt = ""
  	$.ajax({
	    type: "POST",
	    url: "/selectBespeakHe",
	    data: "ht_id="+id,
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	if(result.houseAppointments.haa_txt != null){
	    		haa_txt = result.houseAppointments.haa_txt;
	    	}
	    	ha_operationState = result.houseAppointments.ha_operationState;
	    	var hi_text = $("input[name='hi_text']").val();
	    	var html = "<div style='background:#f5f5f5;width:600px;height:400px;'>";
	    	
	    	html += "<div style='width:200px;padding:20px 20px;'>状态: <select class='form-control' id='ha_operationState' name='ha_operationState'><option value='未联系'>未联系</option><option value='已联系'>已联系</option><option value='成功'>成功</option><option value='失败'>失败</option></select></div>";
	    	html += "<div style='width:200px;padding-left:20px;'>备注: <textarea id='haa_txt' class='form-control' name='haa_txt' style='width: 500px;' rows='3'>"+haa_txt+"</textarea></div></div>"
	    		var submit = function (v, h, f) {
	    		$.ajax({
	    			type: "POST",
	    			url: "/updateBespeakHe",
	    			data: "haa_id="+id+"&ha_operationState="+$("#ha_operationState").val()+"&haa_txt="+$("#haa_txt").val(),
	    			contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    			dataType: "json",
	    			success: function(result) {
	    				data();
	    			}
	    		});
	    		return true;
	    	};
	    	$.jBox(html, { title: "管家婆", submit: submit });
	    	$("#ha_operationState").val(ha_operationState);
	    }
  	});
}}

//跳转修改界面
//多选按钮判断
function ck_eds(id){
	 window.location.href = '/houseExtended/updata?id='+id;
}

function selectByCondition(){
	$("#Num").text("1");
	data();
}