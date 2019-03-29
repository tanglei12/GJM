<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!-- 底部 css样式 -->
<link href="/resources/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
<link href="/resources/css/manage_index.css" rel="stylesheet" type="text/css">
<!-- jBox皮肤样式 -->
<link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">

<script src="/resources/js/jquery-1.7.2.min.js"></script>
<!-- jBox -->
<script charset="utf-8" src="<%= request.getContextPath()%>/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
<script charset="utf-8" src="<%= request.getContextPath()%>/resources/Plug-in/jbox-v2.3/jBox/i18n/jquery.jBox-zh-CN.js"></script>
<style>
.prebj{
	width: 90%;
	margin-left: 5%;
	background-color: #fff;
	margin-bottom: 2%;
}
.divbj{
	width: 90%;
	margin-left: 5%;
}
span{
	font-size: 17px;
	font-family: 微软雅黑;
	color: #5F5F5F;
}
.sp{
	font-size: 15px;
	color: #F0405D;
	margin-left: 2%;
}
.divbj tr td{
	width: 20%;
	margin-left: 5%;
	
}
.dfs{
	width:90%;
	min-width:1080px;
	padding:5px 30px;
	margin-top:2%;
	margin-left: 5%;
	margin-bottom:2%;
	border:4px solid #abcdef;
}
.titles{
	display:block;
	width:150px;
	height:30px;
	position:relative;
	color:#333;
	top:-30px;
	font-size:22px;
	text-align: center;
	background: white;
}
td{
	padding-left: 40px;
	padding-top: 20px;
}
.jianju{
	margin-left: 20px;
}
.jianjuDo{
	padding-bottom: 20px;
}
.success{
	background-image: url("/resources/image/ghf.jpg");
	filter:
		"progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale')";
	-moz-background-size: 100% 100%;
	background-size: 100% 100%;
	width: 150px;
	height: 150px;
}
.font_1{
	color: red;
	font-size: 18px;
}
</style>
    <h3 align="center">EJZ分佣</h3>
    <pre class="prebj" style="">预定单号: <span class="font_1">${reserveBill.rb_number}</span>    合同号: ${userCenterContractObject.contractObject_No}

房屋预留时间: <span class="font_1">${reserveBill.rb_reserveDate}</span>天           房屋编码: <span class="font_1">${reserveBill.rb_houseNum}</span>

预定定金: <span class="font_1">${reserveBill.rb_money}</span>元            <c:if test="${not empty reserveBill.ep_wayMon}">分成金额: <span class="font_1">${reserveBill.ep_wayMon}</span>元</c:if>            <c:if test="${not empty reserveBill.ep_leave}">剩余佣金: <span class="font_1">${reserveBill.ep_leave}</span>元</c:if>

预定时间: <fmt:formatDate value="${reserveBill.rb_date}" type="both"/>

预定人: ${reserveBill.rb_name}              预定人电话: ${reserveBill.rb_phone}        身份证号: ${reserveBill.rb_personNum}

合作伙伴: ${reserveBill.rb_type}            付费周期: ${reserveBill.rb_cycle}

<c:if test="${empty reserveBill.rb_Ejz}">审核状态: <span style="color: green;">审核中</span></c:if><c:if test="${reserveBill.rb_Ejz == 'success'}">审核状态: <span style="color: rgb(245, 121, 3);">成功</span></c:if>
    </pre>
    
   <h3 align="center" id="jss" style="display: none;">结算明细</h3>
   <table class="table table-hover divbj" style="display: none;">
    	<thead>
	      <tr>
	         <th>名称</th>
	         <th>百分比</th>
	         <th>金额</th>
	         <th>状态</th>
	         <th>时间</th>
	      </tr>
	   </thead>
	   <tbody  id="fcfs">
		   
   	   </tbody>
   </table>
	<form class="form-inline" alt="First slide" action="/ejzUpdateState" method="POST" id="addSubmit">
		<input type="hidden" name="token" value="${token}">
		<div class="dfs">
			<span class="titles">结算信息</span>
			<table>
				<tr>
					<td class="jianjuDo">分成金额<input onkeyup="this.value=this.value.replace(/[^0-9]\D*$/,'')" name="ep_wayMon" id="fall" class="form-control jianju" type="text" placeholder="分成金额"><span class="jianju">元</span></td>
				</tr>
				<tr>
					<td class="jianjuDo">一级分成<input name="one" onkeyup="this.value=this.value.replace(/[^0-9]\D*$/,'')" class="form-control jianju" type="text" placeholder="一级分成"><span class="jianju">%</span></td>
					<td class="jianjuDo">二级分成<input name="two" onkeyup="this.value=this.value.replace(/[^0-9]\D*$/,'')" class="form-control jianju" type="text" placeholder="二级分成"><span class="jianju">%</span></td>
				</tr>
				<tr>
					<td class="jianjuDo">三级分成<input name="three" onkeyup="this.value=this.value.replace(/[^0-9]\D*$/,'')" class="form-control jianju" type="text" placeholder="三级分成"><span class="jianju">%</span></td>
					<td class="jianjuDo">四级分成<input name="four" onkeyup="this.value=this.value.replace(/[^0-9]\D*$/,'')" class="form-control jianju" type="text" placeholder="四级分成"><span class="jianju">%</span></td>
				</tr>
			   <tr>
			   		<td class="jianjuDo"><input type="button" class="btn btn-success" style="width: 120px;" onclick="updateState(this);" value="审核成功">&nbsp;&nbsp;&nbsp;<input type="button" class="btn btn-danger" style="width: 120px;" onclick="updateState(this);" value="审核失败"></td>
			   </tr>
			   <tr style="display: none"><td><input type="text" name="ep_id" id="ep_id" value="${reserveBill.rb_number}"></td></tr>
			   <tr style="display: none"><td><input type="text" name="uda_id" value="${reserveBill.rb_fxCode}"></td></tr>
			   <tr style="display: none"><td><input type="text" name="ep_state"></td></tr>
			</table>
		</div>
	</form>
<script>
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

	var state ='${reserveBill.rb_Ejz}';
	if(state == 'edit' || state == '' || state == null){
		
	}else if(state == 'error'){
		$("#addSubmit").css("display","none");
	}else{
		$("#addSubmit").css("display","none");
		$.ajax({
		    type: "POST",
		    url: "/evaluationPerson/selectSeparate",
		    data: "&ep_id="+$("#ep_id").val(),
		    contentType: "application/x-www-form-urlencoded; charset=utf-8",
		    dataType: "json",
		    async:false,
		    success: function(result) {
		    	$(".divbj").css("display","block");
		    	$("#jss").css("display","block");
		    	$.each(result.userCenterSeparateList, function(idx, separate) {
		    		var tts = format(separate.ew_date, 'yyyy-MM-dd HH:mm:ss');
			    	$("#fcfs").append("<tr><td>"+separate.uda_account+"</td><td>"+separate.ew_percent+"%</td><td>"+separate.ew_money+"</td><td>"+separate.ew_state+"</td><td>"+tts+"</td></tr>");
	    		});
		    }
		    });
	}
	
	function updateState(obj){
		var one = $("input[name='one']").val();
		var two = $("input[name='two']").val();
		var three = $("input[name='three']").val();
		var four = $("input[name='four']").val();
		var ep_wayMon = $("input[name='ep_wayMon']").val();
		if($(obj).val() == "审核成功"){
			var sum = Number(one) + Number(two) + Number(three) +Number(four);
			if(one == null || one == ""){
				$.jBox.tip('请完善信息');
				return;
			}
			if(two == null || two == ""){
				$.jBox.tip('请完善信息');
				return;
			}
			if(three == null || three == ""){
				$.jBox.tip('请完善信息');
				return;
			}
			if(four == null || four == ""){
				$.jBox.tip('请完善信息');
				return;
			}
			
			if(ep_wayMon == null || ep_wayMon == ""){
				$.jBox.tip('请完善信息');
				return;
			}
			if(sum > 100 || sum <=0){
				$.jBox.tip('分成总数应为1%~100%');
				return;
			}
			if(Number(one) <= Number(two) || Number(one) <= Number(three) || Number(one) <= Number(four)){
				$.jBox.tip('一级分成必须大于其他');
			}else{
				$("input[name='ep_state']").val("success");
				$("#addSubmit").submit();
			}
		}else{
			$("input[name='ep_state']").val("error");
			$("#addSubmit").submit();
		}

	}
</script>