<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<link href="/resources/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
<link href="/resources/css/manage_index.css" rel="stylesheet" type="text/css">
<link type="text/css" rel="stylesheet" href="/resources/css/tenantBill.css">
<!-- 时间控件 -->
<script src="/resources/Plug-in/My97DatePicker4.7.2/WdatePicker.js"></script>
<script type="text/javascript" src="/resources/js/jquery-1.7.2.min.js"></script>
<style>
.place {
    height: 2px;
    background: #3eafe0;
    position: fixed;
    width: 100%;
    margin-top: -50px;
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
<script>
function changeTypeVer(obj){
	$(".ver-radio").each(function (){
		$(".ver-radio").parent().removeClass("span-checked");
		$(".ver-radio").removeAttr("checked");
	});
	$(obj).addClass("span-checked");
	$(obj).find("input").attr("checked",true);
}
</script>
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
			<div style="color:#4799E6;font-size: 18px;padding-top: 20px;margin-left: 30px; ">修改预定账单</div>
			<hr>
			<table border="0" style="margin-bottom: 40px;margin-left: 10px;min-width: 650px;">
			  <tr>
			    <td style="padding-left: 20px;">
			    	<dl style="float: left;">
		            	<dt style="float: left;">房屋编码</dt>
		                <dd style="float: left;margin-left: 12px;">
				        	<div class="main-box-list" style="position: relative;" >
								<input type="text" class="form-control vaildbox data-change1" value="${reserveBill.rb_houseNum }" name="rb_houseNum" id="conhouseno" placeholder="点击搜索房屋" readonly="readonly" required="required" style="width: 300px;">
								<span class="error-tisp"></span>
								<div id="queryList">
									<div id="search-box"><input type="text" placeholder="输入房屋编码、房屋地址"></div>
									<div id="search-show">
										<div class="search-tisp">没有数据</div>
									</div>
								</div>
						   </div>
		                </dd>
		            </dl>
		            <span style="line-height: 30px;margin-left: 24px;" id='tishi'></span>
				</td>
			  </tr>
			  <tr>
			    <td style="padding-left: 20px;">客户姓名<input value="${reserveBill.rb_name }" type="text" class="form-control jianju" name="rb_name" >
			  </tr>
			  <tr>
			  	<td style="padding-left: 20px;">
			  		   电话<input type="text" value="${reserveBill.rb_phone }" class="form-control jianjuss" name="rb_phone" ></td>
			  	</td>
			  </tr>
			  <tr>
			  	<td style="padding-left: 20px;">
			  		身份证号<input type="text" value="${reserveBill.rb_personNum }" class="form-control jianju" name="rb_personNum" >
			  	</td>
			  </tr>
			  <tr>
			  	<td style="padding-left: 20px;"><span style="float: left;margin-right: 12px;">合作伙伴</span>
			  		<c:forEach items="${billPartnersList}" var="billPartners">
			  			<c:if test="${reserveBill.rb_type == billPartners.bp_name}">
				  			<div class="type-label span-checked" onclick="changeTypeVer(this)" for="type3">
								${billPartners.bp_name }<i></i> 
								<input type="checkbox" class="ver-radio" checked="checked" name="rb_type" value="${billPartners.bp_name }" id="type3">
							</div>
			  			</c:if>
			  			<c:if test="${reserveBill.rb_type != billPartners.bp_name}">
				  			<div class="type-label" onclick="changeTypeVer(this)" for="type3">
								${billPartners.bp_name }<i></i> 
								<input type="checkbox" class="ver-radio" name="rb_type" value="${billPartners.bp_name }" id="type3">
							</div>
			  			</c:if>
			  		</c:forEach>
			  	</td>
			  </tr>
			  <tr>
			  	<td style="padding-left: 20px;">
			  		定金<input type="text" value="${reserveBill.rb_money }" class="form-control jianjuss" name="rb_money" >&nbsp;&nbsp;&nbsp;元
			  	</td>
			  </tr>
			  <tr>
			  	<td style="padding-left: 20px;">
			  		预留时间<input type="text" value="${reserveBill.rb_reserveDate }" class="form-control jianju" value="3" name="rb_reserveDate" >&nbsp;&nbsp;&nbsp;天
			  	</td>
			  </tr>
			  <tr>
			  	<td style="padding-left: 20px;">
			  		租房月数<input type="text" value="${reserveBill.rb_cycle }" class="form-control jianju" name="rb_cycle" >&nbsp;&nbsp;&nbsp;月
			  	</td>
			  </tr>
			  <tr>
			  	<td style="padding-left: 20px;display: none;">
			  		预留时间<input type="text" class="form-control jianju" value="3" id="heState" name="heState" >&nbsp;&nbsp;&nbsp;天
			  		预留时间<input type="text" class="form-control jianju" id="rb_id" value='${reserveBill.rb_id}' name="rb_id" >&nbsp;&nbsp;&nbsp;天
			  	</td>
			  </tr>
			  <tr>
		    	<td style="padding-left: 20px;">
			  		支付状态
				  	<select class="form-control jianju" style="width: 150px;" name="rb_state">
					  	<c:if test="${reserveBill.rb_state == '已付款'}">
				    		<option selected="selected" value="已付款">已付款</option>
				    		<option value="待付款">待付款</option>
				    		<option value="已租">已租</option>
				    		<option value="取消">取消</option>
					  	</c:if>
					  	<c:if test="${reserveBill.rb_state == '待付款'}">
				    		<option selected="selected" value="待付款">待付款</option>
				    		<option value="已付款">已付款</option>
				    		<option value="已租">已租</option>
				    		<option value="取消">取消</option>
					  	</c:if>
					  	<c:if test="${reserveBill.rb_state == '已租'}">
				    		<option  value="待付款">待付款</option>
				    		<option value="已付款">已付款</option>
				    		<option selected="selected" value="已租">已租</option>
				    		<option value="取消">取消</option>
					  	</c:if>
					  	<c:if test="${reserveBill.rb_state == '取消'}">
				    		<option  value="待付款">待付款</option>
				    		<option value="已付款">已付款</option>
				    		<option value="已租">已租</option>
				    		<option selected="selected" value="取消">取消</option>
					  	</c:if>
			    	</select>
		    	</td>
		    </tr>
			  <tr>
		    	<td style="padding-left: 20px;">
		    		备注<textarea class="form-control jianjuss" name="rb_remarks" style="width: 500px;" rows="3">${reserveBill.rb_remarks }</textarea>
		    	</td>
			  </tr>
		    </table>
		    <div style="width: 400px;display:none; height: 400px;border:1px solid #abcdef; position: absolute;left: 70%;top: 160px;">
		    	<div style="color:#4799E6;font-size: 18px;padding-top: 20px;margin-left: 30px; ">房屋信息</div>
				<hr>
		    </div>
		    <hr>
		    <div style="margin-left: 30px;">
		    	<input class="btn btn-info" id="add" style="display:none; width:70px;margin-bottom: 30px;" onclick="addReserveBill();" type="button" value="修改">
		    	<input class="btn btn-danger" id="abandon" style="width:100px;margin-bottom: 30px;margin-left: 20px;" onclick="abandonReserveBill();" type="button" value="放弃订单">
		    </div>
		</div>
	</form>
	<script>
	if($("select[name='rb_state']").val() == '取消' || $("select[name='rb_state']").val() == '已租'){
		$("#add").attr({"disabled":"disabled"});
		$("#abandon").attr({"disabled":"disabled"});
	}
	function abandonReserveBill(){
		$.ajax({
		    type: "POST",
		    url: "/abandonReserveBill",
		    data: "rb_id="+$("#rb_id").val(),
		    contentType: "application/x-www-form-urlencoded; charset=utf-8",
		    dataType: "json",
		    success: function(result) {
		    	if(result.result == '1'){
		    		 window.location.href = '/reserveBill';
		    	}else{
		    		alert("取消失败!");
		    	}
		    }
		 });
	}
	
	function updateReserveBill(){
		$.ajax({
		    type: "POST",
		    url: "/updateReserveBill",
		    data: $('#addSubmit').serialize(),
		    contentType: "application/x-www-form-urlencoded; charset=utf-8",
		    dataType: "json",
		    async:false,
		    success: function(result) {
		    	if(result.result == '1'){
		    		 window.location.href = '/reserveBill';
		    	}else{
		    		alert("修改失败!");
		    	}
		    }
		    });
	}
	</script>
</body>
</html>