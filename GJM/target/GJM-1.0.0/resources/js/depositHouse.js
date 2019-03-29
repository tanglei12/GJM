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
		        	   name: "时间",
		        	   string: "ts_time"
		           }
		],
		title: [
			    {
					name: "编号",
					string: "ts_id",
					parameter: ""
				},
				{
					name: "托管人",
					string: "ts_name",
					parameter: "",
					string1: "ts_phone",
					parameter1: ""
				},
				{
					name: "几房",
					string: "ts_houseT",
					parameter: ""
				},
				{
					name: "房屋类型",
					string: "ts_houseType",
					parameter: ""
				},
				{
					name: "地址",
					string: "ts_address",
					parameter: ""
				},
				{
					name: "状态",
					string: "ts_state",
					parameter: ""
				},
				{
					name: "备注",
					string: "ts_txt",
					parameter: ""
				},
				{
					name: "时间",
					string: "ts_time",
					parameter: ""
				}
			],
		url: "/selectDepositHouse",
		data: {},
		success: function(result){
			$(result).find("tbody tr").each(function(i){
				var dateTime = "";
				if($(this).find("td").eq(8).text() != ""){
					dateTime = returnDate(parseInt($(this).find("td").eq(8).text()));
				}
				$(this).find("td").eq(8).text(dateTime);
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
    	var ts_state = "";
    	var ts_txt = ""
    	$.ajax({
		    type: "POST",
		    url: "/selectTrusteeship",
		    data: "ht_id="+id,
		    contentType: "application/x-www-form-urlencoded; charset=utf-8",
		    dataType: "json",
		    success: function(result) {
		    	if(result.trusteeships.ts_txt != null){
		    		ts_txt = result.trusteeships.ts_txt;
		    	}
		    	ts_state = result.trusteeships.ts_state;
		    	var hi_text = $("input[name='hi_text']").val();
		    	var html = "<div style='background:#f5f5f5;width:600px;height:400px;'>";
		    	
		    	html += "<div style='width:200px;padding:20px 20px;'>状态: <select  class='form-control' id='ht_state' name='ht_state'><option value='未联系'>未联系</option><option value='已联系'>已联系</option><option value='成功'>成功</option><option value='失败'>失败</option></select></div>";
		    	html += "<div style='width:400px;padding-left:20px;'>备注: <textarea id='ht_txt' class='form-control' name='ht_txt' style='width: 500px;' rows='3'>"+ts_txt+"</textarea></div></div>"
		    	var submit = function (v, h, f) {
		    		$.ajax({
		    			type: "POST",
		    			url: "/updateHe",
		    			data: "ht_id="+id+"&ht_state="+"&ht_state="+$("#ht_state").val()+"&ht_txt="+$("#ht_txt").val(),
		    			contentType: "application/x-www-form-urlencoded; charset=utf-8",
		    			dataType: "json",
		    			success: function(result) {
		    				data();
		    			}
		    		});
		    		return true;
		    	};
		    	$.jBox(html, { title: "管家婆", submit: submit });
		    	$("#ht_state").val(ts_state);
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
