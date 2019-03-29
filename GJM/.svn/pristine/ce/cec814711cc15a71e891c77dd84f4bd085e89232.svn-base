$(function(){ 
	ejz();
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

//查询所有一级账号
function ejz(){
	$(".one").children().html("");
	$.ajax({
	    type: "POST",
	    url: "/selectejz",
	    data: "",
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    async:false,
	    success: function(result) {
	    	$.each(result.userCenterDistributionAccountList, function(idx, distribution) {
	    		if(distribution.uda_name == '' || distribution.uda_name == null){
	    			var name = distribution.uda_account
	    		}else{
	    			var name = distribution.uda_name
	    		}
	    		if(result.size > 1){
	    			if(idx == 0){
		    			$(".one").append("<td align=center valign='top'><table border='0'  cellspacing='0' cellpadding='0' width='100%' height=1><tr><td width='50%'></td><td width='50%' bgcolor='#000000'></td></tr></table><i></i><table cellspacing='1' cellpadding='4'><tr><td class='tdbottom' style='border: 1 solid #000000' nowrap><a href='javascript:shower("+distribution.uda_id+");' id='"+distribution.uda_id+"'>"+name+"</a><span id='ejzss"+distribution.uda_id+"' onclick='down("+distribution.uda_id+");' style='cursor:pointer;margin-top:0px;color:#3EAFE0;font-size:14px;display:block;text-align: center;' class='glyphicon glyphicon-plus-sign'></span></td></tr></table></td>");
		    		}else if((idx+1) == result.size){
		    			$(".one").append("<td align=center valign='top'><table border='0'  cellspacing='0' cellpadding='0' width='100%' height=1><tr><td width='50%' bgcolor='#000000'></td><td width='50%'></td></tr></table><i></i><table cellspacing='1' cellpadding='4'><tr><td class='tdbottom' style='border: 1 solid #000000' nowrap><a href='javascript:shower("+distribution.uda_id+");' id='"+distribution.uda_id+"'>"+name+"</a><span id='ejzss"+distribution.uda_id+"' onclick='down("+distribution.uda_id+");' style='cursor:pointer;margin-top:0px;color:#3EAFE0;display:block;font-size:14px;text-align: center;' class='glyphicon glyphicon-plus-sign'></span></td></tr></table></td>");
		    		}else{
		    			$(".one").append("<td align=center valign='top'><table border='0'  cellspacing='0' cellpadding='0' width='100%' height=1><tr><td width='50%' bgcolor='#000000'></td><td width='50%' bgcolor='#000000'></td></tr></table><i></i><table cellspacing='1' cellpadding='4'><tr><td class='tdbottom' style='border: 1 solid #000000' nowrap><a href='javascript:shower("+distribution.uda_id+");' id='"+distribution.uda_id+"'>"+name+"</a><span id='ejzss"+distribution.uda_id+"' onclick='down("+distribution.uda_id+");' style='cursor:pointer;color:#3EAFE0;margin-top:0px;font-size:14px;display:block;text-align: center;' class='glyphicon glyphicon-plus-sign'></span></td></tr></table></td>");
		    		}
		    	}else if(result.size == 1){
		    		//只有一个下级时添加包裹
		    		$(".one").append("<td align=center valign='top'><table cellspacing='1' cellpadding='4'><tr><td class='tdbottom' style='border: 1 solid #000000' nowrap><a href='javascript:shower("+distribution.uda_id+");' id='"+distribution.uda_id+"'>"+name+"</a><span id='ejzss"+distribution.uda_id+"' onclick='down("+distribution.uda_id+");' style='cursor:pointer;margin-top:0px;color:#3EAFE0;font-size:14px;display:block;text-align: center;' class='glyphicon glyphicon-plus-sign'></span></td></tr></table></td>");
		    	}
	    		
	    	 });
	    }
	    });
}

//查询当前账号下一级账号
function down(ejzss){
	//得到当前账号的编号
	var id = $("#ejzss"+ejzss).prev().attr("id");
	//修改下拉方法和样式
	$("#ejzss"+ejzss).removeAttr("onclick");
	$("#ejzss"+ejzss).attr("onclick","up("+ejzss+");");
	$("#ejzss"+ejzss).removeClass();
	$("#ejzss"+ejzss).addClass("glyphicon glyphicon-minus-sign");
	$.ajax({
	    type: "POST",
	    url: "/selectejzNext",
	    data: "uda_id="+id,
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    async:false,
	    success: function(result) {
	    	if(result.size > 1){
	    		//多个下级时添加包裹
	    		$("#ejzss"+ejzss).parent("td").parent("tr").parent("tbody").parent("table").parent("td").append("<i></i>");
	    		$("#ejzss"+ejzss).parent("td").parent("tr").parent("tbody").parent("table").parent("td").append("<table cellspacing='1' cellpadding='4'><tr class='next'></tr></table");
	    	}else if(result.size == 1){
	    		//只有一个下级时添加包裹
	    		$("#ejzss"+ejzss).parent("td").parent("tr").parent("tbody").parent("table").parent("td").append("<table cellspacing='0' cellpadding='0'><tr class='next'></tr></table");
	    	}
	    	$.each(result.userCenterDistributionAccountList, function(idx, distribution) {
	    		if(distribution.uda_name == '' || distribution.uda_name == null){
	    			var name = distribution.uda_account
	    		}else{
	    			var name = distribution.uda_name
	    		}
	    		if(result.size == 1){
	    			//只有一个下级时添加
	    			$("#ejzss"+ejzss).parent("td").parent("tr").parent("tbody").parent("table").parent("td").children("table").children("tbody").children(".next").append("<td align=center valign='top'><table border='0'  cellspacing='1' cellpadding='4' width='100%' height=1><tr><td width='50%'></td><td width='50%'></td></tr></table><i></i><table cellspacing='0' cellpadding='0'><tr><td class='tdbottom' style='border: 1 solid #000000' nowrap><a href='javascript:shower("+distribution.uda_id+");' id='"+distribution.uda_id+"'>"+name+"</a><span id='ejzss"+distribution.uda_id+"' onclick='down("+distribution.uda_id+");' style='cursor:pointer;color:#3EAFE0;margin-top:0px;display:block;text-align: center;font-size:14px;'class='glyphicon glyphicon-plus-sign'></span></td></tr></table></td>");
	    		}else{
	    			//多个下级时添加包裹
	    			if(idx == 0){
	    				//第一个下级
	    				$("#ejzss"+ejzss).parent("td").parent("tr").parent("tbody").parent("table").parent("td").children("table").children("tbody").children(".next").append("<td align=center class='next' valign='top'><table border='0'  cellspacing='0' cellpadding='0' width='100%' height=1><tr><td width='50%'></td><td width='50%' bgcolor='#000000'></td></tr></table><i></i><table style='margin-left:10px;' cellspacing='1' cellpadding='4'><tr><td class='tdbottom' style='border: 1 solid #000000' nowrap><a href='javascript:shower("+distribution.uda_id+");' id='"+distribution.uda_id+"'>"+name+"</a><span id='ejzss"+distribution.uda_id+"' onclick='down("+distribution.uda_id+");' style='cursor:pointer;margin-left:-10px;font-size:14px;color:#3EAFE0;display:block;text-align: center;'class='glyphicon glyphicon-plus-sign'></span></td></tr></table></td>");
	    			}else if((idx+1) == result.size){
	    				//最后一个下级
	    				$("#ejzss"+ejzss).parent("td").parent("tr").parent("tbody").parent("table").parent("td").children("table").children("tbody").children(".next").append("<td align=center class='next' valign='top'><table border='0'  cellspacing='0' cellpadding='0' width='100%' height=1><tr><td width='50%' bgcolor='#000000'></td><td width='50%'></td></tr></table><i></i><table style='margin-left:10px;' cellspacing='1' cellpadding='4'><tr><td class='tdbottom' style='border: 1 solid #000000' nowrap><a href='javascript:shower("+distribution.uda_id+");' id='"+distribution.uda_id+"'>"+name+"</a><span id='ejzss"+distribution.uda_id+"' onclick='down("+distribution.uda_id+");' style='cursor:pointer;margin-left:-10px;display:block;color:#3EAFE0;font-size:14px;text-align: center;'class='glyphicon glyphicon-plus-sign'></span></td></tr></table></td>");
	    			}else{
	    				//中间的下级
	    				$("#ejzss"+ejzss).parent("td").parent("tr").parent("tbody").parent("table").parent("td").children("table").children("tbody").children(".next").append("<td align=center class='next' valign='top'><table border='0'  cellspacing='0' cellpadding='0' width='100%' height=1><tr><td width='50%' bgcolor='#000000'></td><td width='50%' bgcolor='#000000'></td></tr></table><i></i><table style='margin-left:10px;' cellspacing='1' cellpadding='4'><tr><td class='tdbottom' style='border: 1 solid #000000' nowrap><a href='javascript:shower("+distribution.uda_id+");' id='"+distribution.uda_id+"'>"+name+"</a><span id='ejzss"+distribution.uda_id+"' onclick='down("+distribution.uda_id+");' style='cursor:pointer;margin-left:-10px;color:#3EAFE0;display:block;font-size:14px;text-align: center;'class='glyphicon glyphicon-plus-sign'></span></td></tr></table></td>");
	    			}
	    		}
	    	 });
	    }
	    });
}

//点击收缩时移除下级
function up(ejzss){
	var text = $("#ejzss"+ejzss).parent("td").parent("tr").parent("tbody").parent("table").next("i").remove();
	var dis = $("#ejzss"+ejzss).parent("td").parent("tr").parent("tbody").parent("table").next("table").remove();
	//改变收缩样式和点击方法
	$("#ejzss"+ejzss).removeAttr("onclick");
	$("#ejzss"+ejzss).attr("onclick","down("+ejzss+");");
	$("#ejzss"+ejzss).removeClass();
	$("#ejzss"+ejzss).addClass("glyphicon glyphicon-plus-sign");
//	if(dis == 'none'){
//		$(obj).parent("td").parent("tr").parent("tbody").parent("table").next("table").css("display","block");
//	}else{
//		$(obj).parent("td").parent("tr").parent("tbody").parent("table").next("table").css("display","none");
//	}
}

//显示弹出层
function shower(uda_id){
	$(".closeDiv").remove();
	$(".zxcvb").remove();
	$("input[name='iders']").val(uda_id);
	//查询收益
	selectejz();
	//查询当前账号信息
	selectUda(uda_id);
	//添加关闭按钮
	$("#cs109").children("ul").append("<li class='closeDiv' style='cursor:pointer;float:right;line-height:60px;text-align:center; width:100px;height:44px;'><b><span style='font-size: 26px;' onclick='hiden("+uda_id+");' class='glyphicon glyphicon-remove-sign'></span></b></li>");
	//添加新增按钮
	$("#tow").children("table").children("tbody").append("<tr class='zxcvb'><td colspan='4'><span onclick='addUda("+uda_id+");' style='float: right;margin-top: 10px;' class='btn btn-success'>添加</span></td></tr>");
	//弹出层
	$("#divObj").slideDown();
	//添加修改按钮
	$("#three").children("table").children("tbody").append("<tr class='zxcvb'><td colspan='4'><span onclick='updateUda("+uda_id+");' style='float: right;margin-top: 10px;' class='btn btn-success'>修改</span></td></tr>");
}

function showers(){
	$("#Obj").slideDown();
}

//查询收益
function selectejz(){
	$("#ejzsy").html("");
	$.ajax({
	    type: "POST",
	    url: "/selectejzMon",
	    data: "uda_id="+$("input[name='iders']").val()+"&ep_name="+$("input[name='ep_name']").val()+"&stateTime="+$("input[name='stateTime']").val()+"&endTime="+$("input[name='endTime']").val()+"&ew_way="+$("select[name='ew_way']").val(),
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    async:false,
	    success: function(result) {
	    	$.each(result.userCenterEvaluationPersonList, function(idx, ejz) {
	    		var tts = format(ejz.ew_date, 'yyyy-MM-dd HH:mm:ss');
	    		if(ejz.ew_state == '未打款'){
	    			if(ejz.ep_way != '租房'){
	    				ejz.ep_money = ejz.ep_money +"万元";
	    			}
	    			if(ejz.ew_grade == '0级'){
	    				var namers = "介绍费";
	    			}else{
	    				var namers = "佣金";
	    			}
	    			$("#ejzsy").append("<tr><td>"+ejz.ew_way+"</td><td>"+ejz.ep_name+"</td><td>"+ejz.ep_money+"</td><td>"+ejz.ew_grade+":&nbsp;"+ejz.ew_money+"元("+namers+")</td><td>"+tts+"</td><td id='ejz"+ejz.ew_id+"' style='color:red;'>"+ejz.ew_state+"</td><td><a href='javascript:updateState("+ejz.ew_id+",1);'>打款</a></td></tr>");
	    		}
	    		if(ejz.ew_state == '已打款'){
	    			if(ejz.ep_way != '租房'){
	    				ejz.ep_money = ejz.ep_money +"万元";
	    			}
	    			if(ejz.ew_grade == '0级'){
	    				var namers = "介绍费";
	    			}else{
	    				var namers = "佣金";
	    			}
	    			$("#ejzsy").append("<tr><td>"+ejz.ew_way+"</td><td>"+ejz.ep_name+"</td><td>"+ejz.ep_money+"</td><td>"+ejz.ew_grade+":&nbsp;"+ejz.ew_money+"元("+namers+")</td><td>"+tts+"</td><td id='ejz"+ejz.ew_id+"' style='color:green;'>"+ejz.ew_state+"</td><td><a href='javascript:updateState("+ejz.ew_id+",2);'>撤销</a></td></tr>");
	    		}
	    	});
	    }
	});
}

//隐藏弹出层
function hiden(ejzss){
//隐藏弹出层
$("#divObj").hide();//hide()函数,实现隐藏,括号里还可以带一个时间参数(毫秒)例如hide(2000)以2000毫秒的速度隐藏,还可以带slow,fast
//标签栏改回初始样式
s();
//移除修改添加按钮
$(".zxcvb").remove();
//把弹出层的表单置为空
$("input[name='iders']").val("");
$("input[name='uda_name']").val("");
$("input[name='stateTime']").val("");
$("input[name='endTime']").val("");
$("input[name='uda_names']").val("");
$("input[name='uda_zfbNum']").val("");
$("input[name='uda_account']").val("");
$("input[name='uda_password']").val("");
//查询当前账号的上一级以便信息同步
if($("input[name='uda_num']").val() == ''){
	ejz();
}else{
	$("#ejzss"+$("input[name='uda_num']").val()).parent("td").parent("tr").parent("tbody").parent("table").next("i").remove();
	$("#ejzss"+$("input[name='uda_num']").val()).parent("td").parent("tr").parent("tbody").parent("table").next("table").remove();
	down($("input[name='uda_num']").val());
}
$("input[name='ij']").val("");
$("input[name='uda_num']").val("");
//移除关闭按钮
$(".closeDiv").remove();
}

//隐藏管家婆的弹出层
function hidens(){
	$("#Obj").hide();//hide()函数,实现隐藏,括号里还可以带一个时间参数(毫秒)例如hide(2000)以2000毫秒的速度隐藏,还可以带slow,fast
	$("input[name='uda_names']").val("");
	$("input[name='uda_zfbNum']").val("");
	$("input[name='uda_account']").val("");
	$("input[name='uda_password']").val("");
	}

function slideToggle(){
$("#divObj").slideToggle(200);//窗帘效果的切换,点一下收,点一下开,参数可以无,参数说明同上
}
function show(){
$("#divObj").show();//显示,参数说明同上
}
function toggle(){
$("#divObj").toggle(200);//显示隐藏切换,参数可以无,参数说明同上
}
function slide(){
$("#divObj").slideDown();//窗帘效果展开
}

//标签栏样式的改变
function s() {
	document.getElementById('one').style.display = 'block';
	document.getElementById('tow').style.display = 'none';
	document.getElementById('three').style.display = 'none';
	document.getElementById('cs106').style.backgroundColor = ' #a7d500';
	document.getElementById('cs107').style.backgroundColor = ' #fff';
	document.getElementById('cs108').style.backgroundColor = ' #fff';
	document.getElementById('cs107').style.color = ' #000';
	document.getElementById('cs106').style.color = ' #fff';
	document.getElementById('cs108').style.color = ' #000';
}
//标签栏样式的改变
function s1() {
	document.getElementById('one').style.display = 'none';
	document.getElementById('tow').style.display = 'block';
	document.getElementById('three').style.display = 'none';
	document.getElementById('cs107').style.backgroundColor = ' #a7d500';
	document.getElementById('cs106').style.backgroundColor = ' #fff';
	document.getElementById('cs106').style.color = ' #000';
	document.getElementById('cs107').style.color = ' #fff';
	document.getElementById('cs108').style.color = ' #000';
	document.getElementById('cs108').style.backgroundColor = ' #fff';
}
//标签栏样式的改变
function s2() {
	document.getElementById('one').style.display = 'none';
	document.getElementById('tow').style.display = 'none';
	document.getElementById('three').style.display = 'block';
	document.getElementById('cs108').style.backgroundColor = ' #a7d500';
	document.getElementById('cs106').style.color = ' #000';
	document.getElementById('cs107').style.color = ' #000';
	document.getElementById('cs108').style.color = ' #fff';
	document.getElementById('cs106').style.backgroundColor = ' #fff';
	document.getElementById('cs107').style.backgroundColor = ' #fff';
}

//修改收益的打款状态
function updateState(ew_id,i){
	$.ajax({
	    type: "POST",
	    url: "/updateState",
	    data: "ew_id="+ew_id+"&ew_state="+i,
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    async:false,
	    success: function(result) {
	    	if(result.result == 0){
	    		$.jBox.tip('修改失败');
	    	}else{
	    		if(i == 1){
	    			$("#ejz"+ew_id).html("已打款");
	    			$("#ejz"+ew_id).css("color","green");
	    			$("#ejz"+ew_id).next("td").children("a").html("撤销");
	    			$("#ejz"+ew_id).next("td").children("a").attr("href","javascript:updateState("+ew_id+",2);");
	    		}else{
	    			$("#ejz"+ew_id).html("未打款");
	    			$("#ejz"+ew_id).css("color","red");
	    			$("#ejz"+ew_id).next("td").children("a").html("打款");
	    			$("#ejz"+ew_id).next("td").children("a").attr("href","javascript:updateState("+ew_id+",1);");
	    		}
	    	}
	    }
	});
}

//添加e兼职账号
function addUda(uda_id){
	if($("input[name='uda_password']").val() == ""){
		$.jBox.tip('输入密码');
		return;
	}
	if($("input[name='uda_account']").val() == ""){
		$.jBox.tip('输入手机号码');
		return;
	}
	if (!$("input[name='uda_account']").val().match(/^1[3|4|5|8][0-9]\d{4,8}$/)) { 
		$.jBox.tip("手机号输入不正确");
  		return;
	}
	$.ajax({
	    type: "POST",
	    url: "/addUda",
	    data: "uda_id="+uda_id+"&uda_name="+$("input[name='uda_names']").val()+"&uda_zfbNum="+$("input[name='uda_zfbNum']").val()+"&uda_account="+$("input[name='uda_account']").val()+"&uda_password="+$("input[name='uda_password']").val(),
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    async:false,
	    success: function(result) {
	    	if(result.result == 0){
	    		$.jBox.tip('添加失败');
	    	}else{
	    		$.jBox.tip('添加成功');
	    	}
	    }
	});
}

//添加一级e兼职账号
function addUdas(uda_id){
	if($("input[name='uda_passwords']").val() == ""){
		$.jBox.tip('输入密码');
		return;
	}
	if($("input[name='uda_accounts']").val() == ""){
		$.jBox.tip('输入手机号码');
		return;
	}
	if (!$("input[name='uda_accounts']").val().match(/^1[3|4|5|8][0-9]\d{4,8}$/)) { 
		$.jBox.tip("手机号输入不正确");
  		return;
	}
	$.ajax({
	    type: "POST",
	    url: "/addUda",
	    data: "uda_id="+uda_id+"&uda_name="+$("input[name='uda_namess']").val()+"&uda_zfbNum="+$("input[name='uda_zfbNums']").val()+"&uda_account="+$("input[name='uda_accounts']").val()+"&uda_password="+$("input[name='uda_passwords']").val(),
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    async:false,
	    success: function(result) {
	    	if(result.result == 0){
	    		$.jBox.tip('添加失败');
	    	}else{
	    		$.jBox.tip('添加成功');
	    		ejz();
	    	}
	    }
	});
}

//查询当前账号的信息
function selectUda(uda_id){
	$.ajax({
	    type: "POST",
	    url: "/selectUda",
	    data: "uda_id="+uda_id,
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    async:false,
	    success: function(result) {
	    	if(result.result.uda_name == '' || result.result.uda_name == null){
	    		result.result.uda_name = result.result.uda_account;
	    	}
	    	if(result.result.uda_zfbNum == '' || result.result.uda_zfbNum == null){
	    		result.result.uda_zfbNum = "未绑定";
	    	}
	    	$("#cs109").children("ul").append("<span class='closeDiv' style='margin-left:10px;line-height:44px;font-size:16px;float:left;display:block;'>"+result.result.uda_name+"</span><span class='closeDiv' style='margin-left:10px;line-height:44px;float:left;display:block;'>("+result.result.uda_zfbNum+")</span>");
	    	$("input[name='uda_name3']").val(result.result.uda_name);
	    	$("input[name='uda_zfbNum3']").val(result.result.uda_zfbNum);
	    	$("input[name='uda_account3']").val(result.result.uda_account);
	    	$("input[name='uda_password3']").val(result.result.uda_password);
	    	$("input[name='ij']").val(result.result.uda_id);
	    	$("input[name='uda_num']").val(result.result.uda_num);
	    }
	});
}

//修改当前账号的信息
function updateUda(uda_id){
	$.ajax({
	    type: "POST",
	    url: "/updateUda",
	    data: "uda_id="+uda_id+"&uda_name="+$("input[name='uda_name3']").val()+"&uda_account="+$("input[name='uda_account3']").val(),
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    async:false,
	    success: function(result) {
	    	if(result.result == 0){
	    		$.jBox.tip('修改失败');
	    	}else{
	    		$.jBox.tip('修改成功');
	    	}
	    }
	});
}