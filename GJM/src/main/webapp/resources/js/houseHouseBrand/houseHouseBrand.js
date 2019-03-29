var selectHouseHouseBrand = null;

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
		        	   name: "创建时间",
		        	   string: "hb_time"
		           }
		],
		title: [
			    {
					name: "编号",
					string: "hb_id",
					parameter: ""
				},
				{
					name: "品牌名称",
					string: "hb_name",
					parameter: ""
				},
				{
					name: "品牌描述",
					string: "hb_desc",
					parameter: ""
				},
				{
					name: "创建时间",
					string: "hb_time",
					parameter: "",
					format: "yyyy-MM-dd"
				}
			],
		url: "/houseHouseBrand/selectHouseHouseBrand",
		data: {},
		success: function(result){
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

//跳转修改推荐群体界面
//多选按钮判断
function ck(){
    var id = 0;
    $("tbody .checkbox-min").each(function(){
    	if($(this).find("input").is(":checked")){
    		id = $(this).attr("data-id");
    	}
    });
    if (id == 0) {  
		 $.jBox.info('请选择一个！', '管家婆管理系统');
    } else {  
    	window.parent.href_mo('/houseHouseBrand/updata?id='+id,"修改品牌","房屋品牌");
	    //window.location.href = '/houseHouseBrand/updata?id='+id;
    } 
}

function hrefClick(ids){
	window.parent.href_mo($(ids).attr("data-type"),"修改品牌","房屋品牌");
}

//跳转修改界面
//多选按钮判断
function ck_eds(id){
	window.location.href = '/houseHouseBrand/updata?id='+id;
}