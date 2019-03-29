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
					string: "bp_id",
					parameter: ""
				},
				{
					name: "公司名称",
					string: "bp_name",
					parameter: ""
				},
				{
					name: "合作状态",
					string: "bp_type",
					parameter: ""
				},
				{
					name: "业务联系人",
					string: "bp_businessPerson",
					parameter: "",
					string1: "bp_businessPhone",
					parameter1: ""
				},
				{
					name: "财务联系人",
					string: "bp_moneyPerson",
					parameter: "",
					string1: "bp_moneyPhone",
					parameter1: ""
				},
				{
					name: "技术联系人",
					string: "bp_technologyPerson",
					parameter: "",
					string1: "bp_technologyPhone",
					parameter1: ""
				},
				{
					name: "公司地址",
					string: "bp_address",
					parameter: ""
				},
				{
					name: "合作时间",
					string: "dp_date",
					parameter: ""
				}
			],
		url: "/billPartnersAll",
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
    return format.replace(/yyyy|MM|dd/g, function(a){
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
    var cbl_s = document.getElementsByName("chickes");  
    var checkCount = 0;
    var id = 0;
    for (var i = 0; i < cbl_s.length; i++) {  
            if (cbl_s[i].checked) {  
                checkCount++;
                id = cbl_s[i].id;
            }  
    }  
    if (checkCount == 0) {  
		 $.jBox.info('请选择一个！', '管家婆管理系统');
    } else if (checkCount > 1) {  
   	 $.jBox.info('只能选择一个！', '管家婆管理系统');
    } else {  
	 window.location.href = '/houseHouseBrand/updata?id='+id;
 } 
}

//跳转修改界面
//多选按钮判断
function ck_eds(id){
	window.location.href = '/jumpUpdataBillPartners?bp_id='+id;
}

function hrefClick(ids){
	window.parent.href_mo($(ids).attr("data-type"),"修改合作","合作伙伴");
}