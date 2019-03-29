$(function(){
	data();
});

//筛选获取数据
function data(){
	$("#content").table({
		titleBg:"#34495E",
		titleColor:"#FFF",
		search: true,
		title: [
			    {
					name: "编号",
					string: "he_id",
					parameter: ""
				},
				{
					name: "产权人",
					string: "he_peopleName",
					parameter: "",
					href: "/houseExtended/updata&he_id"
				},
				{
					name: "房屋状态",
					string: "he_state",
					parameter: {
						"free" : "未租",
						"rental" : "已租",
						"expire" : "托管到期",
						"clean" : "需要打扫",
						"edit" : "未发布"
					}
				},
				{
					name: "小区房号",
					string: "house_address",
					parameter: ""
				},
				{
					name: "房东电话",
					string: "he_phone",
					parameter: ""
				}
			],
		url: "/houseExtended/selectExtended",
		data: {},
		success: function(result){
			$(result).find("table tbody tr").each(function(i){
				if($(this).find("td").eq(3).text() == "已租"){
					$(this).find("td").eq(3).attr("class","free");
				}else{
					$(this).find("td").eq(3).attr("class","rental");
				}
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
    var cbl_s = document.getElementsByName("check");  
    var id = 0;
    $("#content table tbody input[name='check']").each(function(){
    	if($(this).is(":checked")){
    		id = $(this).parent().attr("data-id");
    	}
    });
    if (id == 0) {  
		 $.jBox.info('请选择一个！', '管家婆管理系统');
    } else {  
    	window.parent.href_mo('/houseExtended/updata?he_id='+id,"修改扩展","房屋扩展");
	 //window.location.href = '/houseExtended/updata?id='+id;
 } 
}

//跳转修改界面
//多选按钮判断
function ck_eds(id){
	 window.location.href = '/houseExtended/updata?id='+id;
}

//改变页面显示的房屋状态
function updataStart(houseExtended){
	if(houseExtended.he_state == 'free'){
		houseExtended.he_state="<span class='free'>未租</span>"
	}
	if(houseExtended.he_state == 'rental'){
		houseExtended.he_state="<span class='rental'>已租</span>"
	}
	if(houseExtended.he_state == 'expire'){
		houseExtended.he_state="<span class='expire'>托管到期</span>"
	}
	if(houseExtended.he_state == 'clean'){
		houseExtended.he_state="<span class='clean'>需要打扫</span>"
	}
	if(houseExtended.he_state == 'edit'){
		houseExtended.he_state="<span class='edit'>未发布</span>"
	}
}

function hrefClick(ids){
	window.parent.href_mo($(ids).attr("data-type"),"修改扩展","房屋扩展");
}