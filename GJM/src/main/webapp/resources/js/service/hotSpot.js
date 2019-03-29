var selectHotSpot = null;
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
					string: "md_id",
					parameter: ""
				},
				{
					name: "热点问题",
					string: "sip_name",
					parameter: "",
					leftDiv: "",
					rightDiv: "",
					href: ""
				},
				{
					name: "服务类型",
					string: "mdg_state",
					parameter:""
				},
				{
					name: "服务类型",
					string: "st_name",
					parameter: ""
				},
				{
					name: "上传者",
					string: "sip_people",
					parameter: ""
				},
				{
					name: "上传时间",
					string: "sip_time",
					parameter: ""
				}
			],
		url: "/service/selectHotSpot",
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
function ck() {
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
		swal("请选择一个");
	} else if (checkCount > 1) {
		swal("只能选择一个");
	} else {
		functionIfram('/service/selectHotSpotById?id=' + id,'修改问题','热点问题');
	}
}