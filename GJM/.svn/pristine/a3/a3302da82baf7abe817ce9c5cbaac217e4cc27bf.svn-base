<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>e兼职</title>
<link href="/resources/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
<link href="/resources/css/framework.css" rel="stylesheet" type="text/css">
<!-- jBox皮肤样式 -->
<link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">
<script src="/resources/js/jquery-1.7.2.min.js"></script>
<!-- jBox -->
<script charset="utf-8" src="<%= request.getContextPath()%>/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
<script charset="utf-8" src="<%= request.getContextPath()%>/resources/Plug-in/jbox-v2.3/jBox/i18n/jquery.jBox-zh-CN.js"></script>
<!-- 时间控件 -->
<script src="/resources/Plug-in/My97DatePicker4.7.2/WdatePicker.js"></script>
<!-- ejz -->
<script src="/resources/js/ejz/ejz.js"></script>
<style>
.jianju{
	margin-left: 12px;
}
.jianjus{
	margin-left: 24px;
}
</style>
</head>

<body>
<div id="center">
    <table width="100%" class="frameworks" cellspacing="1" cellpadding="2" align="center" class="tab">
    	<tbody>
    		<tr>
    			<td align=center class="td1"><br>
    			    <table cellspacing="1" cellpadding="4">
				      <tr>
				        <td class="tdbottom" style="border: 1 solid #000000" nowrap>
				          <!--<a href='javascript:showers();'>管家婆</a> -->
				          <a href='javascript:void();'>管家婆</a>
				        </td>
				      </tr>
				     </table>
				     <i></i>
				      <table border="0" cellspacing="0" cellpadding="0" width="100%">
    					 <tr class="one">
    					 
    					 </tr>
    				  </table>
    			</td>
    		</tr>
    	</tbody>
    </table>
	<div id="divObj" style="display:none;background-color:#fff; width:900px;position: absolute;top: 10%;left: 25%;">
		<div id="cs109" style=" border-bottom: 5px solid #a7d500;border-left: 1px solid #ccc;border-right: 1px solid #ccc;border-top: 1px solid #ccc; height:50px; width:900px;">
			<ul>
				<li id="cs106" style="cursor:pointer; float:left;line-height:44px;text-align:center; width:100px;height:44px; background-color: #a7d500;color:#fff;" onclick="s();"><b>收益明细</b></li>
				<!-- <li id="cs107" style="cursor:pointer;float:left;line-height:44px;text-align:center; width:100px;height:44px;" onclick="s1();"><b>添加</b></li>
				<li id="cs108" style="cursor:pointer;float:left;line-height:44px;text-align:center; width:100px;height:44px;" onclick="s2();"><b>修改</b></li>
				 -->
			</ul>
		</div>
		<div id="one" style="display:block;border:1px solid #ccc; width: 900px;height: 500px;" >
			<div id="ejzi" style="margin-top: 20px;">
				<table>
					<tr><td><input type="text" style="display: none;" name="iders"></td>
						<td><input type="text" class="form-control jianju" onblur="selectejz();" name="ep_name" placeholder="贷款人"></td>
						<td style="padding-left: 20px;">
						<select class='form-control jianju' onchange="selectejz();" id="ew_way" name='ew_way'>
		        			<option selected='selected' value='jsp'>选择成交方式</option>
		        			<option value='租房'>租房</option>
		        			<option value='新一贷'>新一贷</option>
		        		</select>
						</td>
				        <td style="padding-left: 20px;"><input type="text" onblur="selectejz();" class="form-control jianju" readonly="readonly" onclick="WdatePicker({startDate:'%y-%M-%d',dateFmt:'yyyy-MM-dd',alwaysUseStartDate:true})" name="stateTime" placeholder="开始时间"></td>
				        <td style="padding-left: 20px;">~</td>
				        <td><input type="text" class="form-control jianju" onblur="selectejz();" readonly="readonly" onclick="WdatePicker({startDate:'%y-%M-%d',dateFmt:'yyyy-MM-dd',alwaysUseStartDate:true})" name="endTime" placeholder="结束时间"></td>
					</tr>
				</table>
				<table class="table table-hover" style="margin-top: 20px;width: 880px;margin-left: 10px;margin-right: 10px;">
			    	<thead>
				      <tr>
				         <th>兼职产品</th>
				         <th>成交人姓名</th>
				         <th>成交金额</th>
				         <th>收益</th>
				         <th>成交时间</th>
				         <th>支付</th>
				         <th>操作</th>
				      </tr>
				   </thead>
				   <tbody id="ejzsy">
			   	   </tbody>
			   </table>
			</div>
		</div>
		<div id="tow" style="display:none;border:1px solid #ccc;width: 900px;height: 500px;" onclick="s1();">
			<table style="margin-left: 20px;">
				<tr>
					<td style="width: 100px;padding-top: 20px; margin-right: 20px;">姓名</td>
					<td style="padding-top: 20px;"><input type="text" class="form-control jianju" name="uda_names" placeholder="姓名"></td>
					<td style="width: 100px;padding-top: 20px; padding-left: 50px; margin-right: 20px;">密码</td>
					<td style="padding-top: 20px;"><input type="password" class="form-control jianju" name="uda_password" placeholder="密码"></td>
				</tr>
				<tr>
				</tr>
				<tr>
					<td style="width: 100px;padding-top: 20px; margin-right: 20px;">支付宝账号</td>
					<td style="padding-top: 20px;"><input type="text" class="form-control jianju" name="uda_zfbNum" placeholder="支付宝账号"></td>
					<td style="width: 100px;padding-top: 20px; padding-left: 50px;margin-right: 20px;">手机号码</td>
					<td style="padding-top: 20px;"><input type="text" class="form-control jianju" name="uda_account" placeholder="手机号码"></td>
				</tr>
				<tr>
				</tr>
			</table>
		</div>
		<div id="three" style="display:none;border:1px solid #ccc;width: 900px;height: 500px;" onclick="s2();">
			<table style="margin-left: 20px;">
				<tr>
					<td style="width: 100px;padding-top: 20px; margin-right: 20px;">姓名</td>
					<td style="padding-top: 20px;"><input type="text" class="form-control jianju" name="uda_name3" placeholder="姓名"></td>
					<td style="width: 100px;padding-top: 20px; padding-left: 50px;margin-right: 20px;">手机号码</td>
					<td style="padding-top: 20px;"><input type="text" class="form-control jianju" name="uda_account3" placeholder="手机号码"></td>
				</tr>
				<tr>
					<td style="width: 100px;padding-top: 20px; margin-right: 20px;">支付宝账号</td>
					<td style="padding-top: 20px;"><input readonly="readonly" type="text" class="form-control jianju" name="uda_zfbNum3" placeholder="支付宝账号"></td>
					<td><input type="text" style="display: none;" name="ij"></td>
					<td><input type="text" style="display: none;" name="uda_num"></td>
				</tr>
			</table>
		</div>
	</div>
	<div id="Obj" style="display:none;background-color:#fff; width:900px;position: absolute;top: 10%;left: 25%;">
		<div id="cs110" style="border-bottom: 5px solid #a7d500;border-left: 1px solid #ccc;border-right: 1px solid #ccc;border-top: 1px solid #ccc; height:50px; width:900px;">
			<ul>
				<li style="float:left;line-height:44px;text-align:center; width:100px;height:44px; background-color: #a7d500;color:#fff;"><b>添加</b></li>
				<li style="float:right;line-height:60px;text-align:center; width:100px;height:44px;"><b><span style="font-size: 26px;" onclick="hidens();" class="glyphicon glyphicon-remove-sign"></span></b></li>
			</ul>
		</div>
		<div style="display:block;border:1px solid #ccc;width: 900px;height: 500px;">
			<table style="margin-left: 20px;">
				<tr>
					<td style="width: 100px;padding-top: 20px; margin-right: 20px;">姓名</td>
					<td style="padding-top: 20px;"><input type="text" class="form-control jianju" name="uda_namess" placeholder="姓名"></td>
					<td style="width: 100px;padding-top: 20px; padding-left: 50px; margin-right: 20px;">密码</td>
					<td style="padding-top: 20px;"><input type="password" class="form-control jianju" name="uda_passwords" placeholder="密码"></td>
				</tr>
				<tr>
					<td style="width: 100px;padding-top: 20px; margin-right: 20px;">支付宝账号</td>
					<td style="padding-top: 20px;"><input type="text" class="form-control jianju" name="uda_zfbNums" placeholder="支付宝账号"></td>
					<td style="width: 100px;padding-top: 20px; padding-left: 50px;margin-right: 20px;">手机号码</td>
					<td style="padding-top: 20px;"><input type="text" class="form-control jianju" name="uda_accounts" placeholder="手机号码"></td>
				</tr>
				<tr><td colspan='4'><span onclick='addUdas(0);' style='float: right;margin-top: 10px;' class='btn btn-success'>添加</span></td></tr>
			</table>
		</div>
	</div>
</div>
<script type="text/javascript">
$(document).ready(function(){ 
	var move=false;//移动标记 
	var _x,_y;//鼠标离控件左上角的相对位置 
	$("#cs109").mousedown(function(e){ 
		move=true; 
		_x=e.pageX-parseInt($("#divObj").css("left")); 
		_y=e.pageY-parseInt($("#divObj").css("top")); 
		}); 
		$(document).mousemove(function(e){ 
		if(move){ 
		var x=e.pageX-_x;//控件左上角到屏幕左上角的相对位置 
		var y=e.pageY-_y; 
		$("#divObj").css({"top":y,"left":x}); 
		} 
		}).mouseup(function(){ 
		move=false; 
	});
	$("#cs110").mousedown(function(e){ 
		move=true; 
		_x=e.pageX-parseInt($("#Obj").css("left")); 
		_y=e.pageY-parseInt($("#Obj").css("top")); 
		}); 
		$(document).mousemove(function(e){ 
		if(move){ 
		var x=e.pageX-_x;//控件左上角到屏幕左上角的相对位置 
		var y=e.pageY-_y; 
		$("#Obj").css({"top":y,"left":x}); 
		} 
		}).mouseup(function(){ 
		move=false; 
	});
});
</script>
</body>
</html>
