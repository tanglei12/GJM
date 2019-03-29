<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<!DOCTYPE>
<html>
  <head>
    <title>增加合作</title>
  </head>
<link href="/resources/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
<link href="/resources/css/manage_index.css" rel="stylesheet" type="text/css">
<!-- 时间控件 -->
<script src="/resources/Plug-in/My97DatePicker4.7.2/WdatePicker.js"></script>
<script type="text/javascript" src="/resources/js/jquery-1.7.2.min.js"></script>
<!-- 验证 -->
<link href="/resources/Plug-in/jQuery-Validation-Engine-master/css/validationEngine.jquery.css" rel="stylesheet" type="text/css">
<script src="/resources/Plug-in/jQuery-Validation-Engine-master/js/languages/jquery.validationEngine-zh_CN.js"></script>
<script src="/resources/Plug-in/jQuery-Validation-Engine-master/js/jquery.validationEngine.js"></script>
<script>
		jQuery(document).ready(function(){
			jQuery("#addSubmit").validationEngine();
		});
</script>
<style>
.place {
    height: 2px;
    background: #3eafe0;
    position: fixed;
    width: 100%;
    margin-top: -30px;
}
.dfs{
	width:90%;
	min-width:1080px;
	padding:5px 30px;
	margin:50px;
	background:#fff;
	border:4px solid #ebcbbe;
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
	margin-left: 12px;
}
.jianjus{
	margin-left: 24px;
}
.jianjuss{
	margin-left: 36px;
}
.jianjusss{
	margin-left: 48px;
}
input[type="text"]{
	width: 179px;
	height: 34px;
	border-radius: 4px;
	border: 1px solid #ccc;
	text-indent: 5px;
}
.type-label{
	position: relative;
    top: 1px;
    border: 2px solid #ccc;
    color: #888;
    padding: 4px 18px;
    font-size: 14px;
    display: block;
    float: left;
    margin-right: 14px;
    cursor: pointer;
    -moz-border-radius:4px; 
    -webkit-border-radius:4px; 
    border-radius:4px;
    float: left;
}
.span-checked{border: 2px solid #1ABC9C; color: #1ABC9C;}
.span-checked i{
	position: absolute;
	right: 1px;
    bottom: 1px;
	width: 14px;
	height: 14px;
	background-image: url("/resources/image/true.png");
	background-repeat: no-repeat;
}
.delete{
	position: absolute;
	left: -6px;
	top:-6px;
    bottom: 1px;
    font-size:16px;
	width: 12px;
	height: 12px;
	color:#666;
}
.type-label input[type="checkbox"]{display: none;height: 0;opacity: 0;}
.btn-info {
    color: #fff;
    background-color: #5bc0de;
    border-color: #46b8da;
}
.btn {
    display: inline-block;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
}
.down {
  margin-left:-30px;
  padding-bottom:20px;
  width: 0;
  height: 0;
  border-top: 6px solid #3E97C9;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
}
</style>
  <body style="background: #F5F5F5;">

    <!-- <div style="margin-top: 30px;margin-left: 50px;">
    	<ul>
    		<li style="float:left;line-height:44px;text-align:center; width:100px;height:44px; background-color: #3E97C9;color:#fff;" onclick="changeType1()">收入流水<i class="down"></i></li>
    		<li style="float:left;line-height:44px;text-align:center; width:100px;height:44px; background-color: #fff;color:#000;" onclick="changeType2()">支出流水<i class="down"></i></li>
    	</ul>
    </div> -->
    <form class="form-inline" id="addSubmit" action="/addBillPartners" method="POST" style="margin-top: 30px;">
    	<input type="hidden" name="token" value="${token}">
	    <div style="margin-left: 5%;background: #fff;width: 90%;">
			<div style="color:#4799E6;font-size: 18px;padding-top: 20px;margin-left: 30px; ">添加合作伙伴</div>
			<hr>
			<table border="0" style="margin-bottom: 40px;margin-left: 10px;">
			  <tr>
			    <td style="padding-left: 20px;">公司名称<input data-validation-engine="validate[required]" type="text" style="width: 350px;" class="form-control jianjuss" name="bp_name" placeholder="公司名称" ></td>
			  </tr>
			  <tr>
			    <td style="padding-left: 20px;">公司地址<input type="text" style="width: 350px;" class="form-control jianjuss" name="bp_address" placeholder="公司地址" ></td>
			  </tr>
			  <tr>
			    <td style="padding-left: 20px;">业务联系人<input type="text" class="form-control jianjus" name="bp_businessPerson" >
			     <span class="jianjuss">&nbsp;</span>
			    电话<input type="text" class="form-control jianjuss" data-validation-engine="validate[custom[phone],maxSize[11],minSize[11]]" name="bp_businessPhone" ></td>
			  </tr>
			  <tr>
			    <td style="padding-left: 20px;">财务联系人<input type="text" class="form-control jianjus" name="bp_moneyPerson" >
			     <span class="jianjuss">&nbsp;</span>
			    电话<input type="text" class="form-control jianjuss" data-validation-engine="validate[custom[phone],maxSize[11],minSize[11]]" name="bp_moneyPhone" ></td>
			  </tr>
			  <tr>
			    <td style="padding-left: 20px;">技术联系人<input type="text" class="form-control jianjus" name="bp_technologyPerson" >
			    <span class="jianjuss">&nbsp;</span>
			    电话<input type="text" class="form-control jianjuss" data-validation-engine="validate[custom[phone],maxSize[11],minSize[11]]" name="bp_technologyPhone" ></td>
			  </tr>
			  <tr>
		    	 <td style="padding-left: 20px;">合作时间<input type="text" class="form-control jianjuss"  readonly="readonly"  onclick="WdatePicker({startDate:'%y-%M-%d',dateFmt:'yyyy-MM-dd',alwaysUseStartDate:true})" name="bp_cooperation">
			  		<span class="jianjuss">合作状态</span>
				  	<select class="form-control jianjus" style="width: 150px;" name="dp_state">
			    		<option value="合作中">合作中</option>
			    		<option value="终止合作">终止合作</option>
			    	</select>
		    	</td>
		    </tr>
		    <tr>
		    	<td style="padding-left: 20px;">
			  		所属类型
				  	<select class="form-control jianjuss" style="width: 150px;" name="bp_type">
			    		<option value="合作中">合作中</option>
			    		<option value="终止合作">终止合作</option>
			    	</select>
		    	</td>
		    </tr>
			  <tr>
		    	<td style="padding-left: 20px;">
		    		合作条件<textarea class="form-control jianjuss" name="bp_where" style="width: 500px;" rows="3"></textarea>
		    	</td>
			  </tr>
		    </table>
		    <hr>
		    <div style="margin-left: 30px;">
		    	<input class="btn btn-info" style="width:70px;margin-bottom: 30px;" type="submit" value="提交">
		    </div>
		</div>
	</form>
</body>
</html>
