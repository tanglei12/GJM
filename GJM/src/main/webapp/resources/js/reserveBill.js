var selectReserveBill = null;

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
		        	   string: "rb_date"
		           }
		],
		title: [
			    {
					name: "编号",
					string: "rb_id",
					parameter: ""
				},
				{
					name: "预定单号",
					string: "rb_number",
					parameter: "",
					leftDiv: "",
					rightDiv: "",
					href: ""
				},
				{
					name: "小区房号",
					string: "house_address",
					parameter: ""
				},
				{
					name: "预订状态",
					string: "rb_state",
					parameter: ""
				},
				{
					name: "预留剩余时间",
					string: "rb_reserveDate",
					parameter: ""
				},
				{
					name: "租客",
					string: "rb_name",
					parameter: "",
					string1: "rb_phone",
					parameter1: ""
				},
				{
					name: "金额(元)",
					string: "rb_money",
					parameter: ""
				},
				{
					name: "身份证号",
					string: "rb_personNum",
					parameter: ""
				},
				{
					name: "付费周期(月)",
					string: "rb_cycle",
					parameter: ""
				},
				{
					name: "合作伙伴",
					string: "rb_type",
					parameter: ""
				},
				{
					name: "备注",
					string: "rb_remarks",
					parameter: ""
				},
				{
					name: "操作状态",
					string: "rb_operationState",
					parameter: ""
				},
				{
					name: "创建时间",
					string: "rb_date",
					parameter: ""
				}
			],
		url: "/selectReserveBill",
		data: {},
		success: function(result){
			$(result).find("tbody tr").each(function(i){
				var dateTime = "";
				if($(this).find("td").eq(13).text() != ""){
					dateTime = returnDate(parseInt($(this).find("td").eq(13).text()));
				}
				$(this).find("td").eq(13).text(dateTime);
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
function cker(){
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
    window.location.href = '/updataReserveBill?id='+id;
 } 
}

//跳转修改界面
//多选按钮判断
function ck_eds(id){
	 window.location.href = '/updataReserveBill?id='+id;
}


//失效预定订单
//多选按钮判断
function ck(){
  var cbl_s = document.getElementsByName("check");  
  var checkCount = 0;
  if (checkCount == 0) {  
		 $.jBox.info('请选择一个！', '管家婆管理系统');
  } else if (checkCount > 1) {  
 	 $.jBox.info('只能选择一个！', '管家婆管理系统');
  } else {  
	  var is = id.split(",");
	  reserveOderClose(is[0],is[1],is[2]);
  } 
}

function reserveOderClose(number,state,houseCode){
	$.ajax({
	    type: "POST",
	    url: "http://my.cqgjp.com/orders/reserveOderClose",
	    data: "number="+number+"&state="+state+"&houseCode="+houseCode,
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	if(result == "1"){
	    		data();
	    	}
	    }
	});
}

//跳转确认预定订单收款
//多选按钮判断
function cks(){
var cbl_s = document.getElementsByName("check");  
var checkCount = 0;
var id = 0;
for (var i = 0; i < cbl_s.length; i++) {  
	  if (cbl_s[i].checked) {  
        checkCount++;
        id = cbl_s[i].className;
    }  
}  
if (checkCount == 0) {  
		 $.jBox.info('请选择一个！', '管家婆管理系统');
} else if (checkCount > 1) {  
	 $.jBox.info('只能选择一个！', '管家婆管理系统');
} else {  
	  var is = id.split(",");
	  if(is[1] == '已付款'){
		 alert('订单已付款'); 
	  }
	  if(is[1] == '取消'){
			 alert('订单已取消'); 
		  }
	  if(is[1] == '已出租'){
			 alert('订单已出租'); 
	  }
	  if(is[1] == '待付款'){
		  $.ajax({
		    type: "POST",
		    url: "/receivables",
		    data: "number="+is[0]+"&state="+is[1]+"&houseCode="+is[2],
		    contentType: "application/x-www-form-urlencoded; charset=utf-8",
		    dataType: "json",
		    success: function(result) {
		    	if(result == "1"){
		    		data();
		    	}
		    }
		});
	  }
	 
} 
}