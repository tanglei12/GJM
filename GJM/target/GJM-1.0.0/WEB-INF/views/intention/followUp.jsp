<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE>
<html>
  <head>
    <title>跟进房源</title>
  </head>
<!-- 底部 css样式 -->
<link href="/resources/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
<link href="/resources/css/manage_index.css" rel="stylesheet" type="text/css">
<link href="/resources/css/houseIntention/followUp.css" rel="stylesheet" type="text/css">
<link href="/resources/css/upload/uploadPage.css" type="text/css" rel="Stylesheet" />
<link href="/resources/css/houseIntention/orderProcess.css" rel="stylesheet" type="text/css">

<script src="/resources/js/jquery-2.0.0.min.js"></script>
<script src="/resources/bootstrap/js/bootstrap.min.js"></script>
<script src="/resources/js/jquery-migrate-1.2.1.js"></script>
<link type="text/css" rel="stylesheet" href="/resources/css/userInfo.css">
<link type="text/css" rel="stylesheet" href="/resources/common/cropper/cropper.css">
<link type="text/css" rel="stylesheet" href="/resources/common/uploadify/css/uploadify.css">
<!-- 图片剪切 -->
<script type="text/javascript" src="/resources/common/cropper/cropper.js"></script>
<!-- 文件上传 -->
<script type="text/javascript" src="/resources/common/uploadify/js/jquery.uploadify.js"></script>
<script src="/resources/js/intention/ajaxfileupload.js"></script>
<!-- 流程 -->
<script src="/resources/js/intention/orderProcess.js"></script>
<script src="/resources/js/intention/followUp.js"></script>
<!-- jBox -->
<link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">
<script charset="utf-8" src="<%= request.getContextPath()%>/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
<script charset="utf-8" src="<%= request.getContextPath()%>/resources/Plug-in/jbox-v2.3/jBox/i18n/jquery.jBox-zh-CN.js"></script>
<!-- 时间控件 -->
<script src="/resources/Plug-in/My97DatePicker4.7.2/WdatePicker.js"></script>
<script charset="utf-8" src="<%= request.getContextPath()%>/resources/js/intention/addHouseMain.js"></script>
<script src="/resources/js/intention/addHouseIntention.js"></script>
<style>
input[type="text"]{
	width: 179px;
	height: 34px;
	border-radius: 4px;
	border: 1px solid #ccc;
	text-indent: 5px;
	float: none;
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
/** 索引房屋编码*/
#queryList{
	position: absolute;
	top: 40px;
    left: 0;
	height: auto;
	clear: both;
	display:none;
	min-width: 424px;
	border: 1px solid #dddddd;/* #CAE2F0; */
	background-color: #fff;
	z-index: 99;
	-moz-box-shadow:0px 0px 13px #BFBFBF;
	-webkit-box-shadow:0px 0px 13px #BFBFBF;
	box-shadow: 0px 0px 13px #BFBFBF;
}
#search-box input[type="text"]{
	width: 100%;
	height: 34px;
	border-bottom: 1px solid #ddd;
	text-indent: 10px;
	outline: none;
	background-color: #f8f8f8;
}
#search-show{
	min-height: 34px;
}
.search-tisp{
	color: #666;
	line-height: 34px;
	text-indent: 10px;
}
#queryList table { width: 100%;}
#queryList table tr{ border-bottom: 1px solid #e6e6e6;}
#queryList table tbody>tr:HOVER,tr.item-hover{background-color: #e1eff7;cursor: pointer;}
#queryList table tr th{
	overflow:hidden;
	text-overflow:ellipsis;
	-o-text-overflow:ellipsis;
	white-space:nowrap;
	padding: 0 10px;
    height: 34px;
    text-align: left;
}
#queryList table tr td{
	overflow:hidden;
	text-overflow:ellipsis;
	-o-text-overflow:ellipsis;
	white-space:nowrap;
	padding: 0 10px;
    height: 34px;
    text-align: left;
}
/** 索引房屋编码end*/
/** 房屋列表Start*/
#hosueList{
	position: relative;
	width: 1020px;
	background: #069;
}
#hosueList .house-title{
	position: relative;
	height: 30px;
}
#hosueList .house-content{
	position: relative;
	height: 120px;	
}
/** 房屋列表end*/


#more-a{
	border: 1px solid #e1e1e1;
    padding: 0 20px;
    display: block;
    line-height: 34px;
    font-size: 14px;
    border-radius: 4px;
    text-align: center;
}

/***/
#more-hide{
	display: none;
	border: 1px dashed #e1e1e1;margin: 0 30px 20px 30px; padding-top: 30px;
}
#more-hide .dl .dt{
	width: 89px;
}
/***/
#more-hide #saveContract3{
	width: 80px;
    float: left;
    border: 1px solid #d3d3d3;
    background-color: #fff;
    display: block;
    padding: 6px 12px;
    margin-top: 2px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    border-radius: 4px;
}
#more-hide #saveContract3:HOVER{
	background-color: #69afd6;
	border: 1px solid #69afd6;
	color: #fff;
	cursor: pointer;
}
/***/
</style>
<script type="text/javascript">
function changeTypes(obj){
	var i = 0;
	$(".type-radio").each(function (){
		if($(this).attr("checked")){
			i++;
		}
	});
	if($(obj).find("input").is(":checked")){
		$(obj).removeClass("span-checked");
		$(obj).find("input").attr("checked",false);
	}else{
		if(i<5){
			$(obj).addClass("span-checked");
			$(obj).find("input").attr("checked",true);
			i = i--;
		}else{
			$.jBox.tip("只能选择五个");
		}
	}
}

function changeTypeVer(obj){
	$(".ver-radio").each(function (){
		$(".ver-radio").parent().removeClass("span-checked");
		$(".ver-radio").removeAttr("checked");
	});
	$(obj).addClass("span-checked");
	$(obj).find("input").attr("checked",true);
}

function add(){
	var html = "<div style='padding:10px;'>输入房源优势：<input type='text' id='pz' name='pz' /></div>";
	var submit = function (v, h, f) {
		var i= 0
		$(".type-radio").each(function (){
			if($(this).val() == f.pz){
				i = 1;
			}
		});
		
		if(i == 0){
			if(f.pz != null && f.pz != ''){
				$("#addPz").before("<label class='type-label span-checked' onclick='changeTypes(this)' for='type7'><span class='glyphicon glyphicon-remove-circle delete' onclick='deleteType(this);'></span>"+f.pz+"<i></i> <input type='checkbox' checked='checked' class='type-radio' name='phi_configure' value='"+f.pz+"'></label>");
				}
		    return true;
		}else{
			$.jBox.tip("已有房源优势");
			 return false;
		}
	};

	$.jBox(html, { title: "房源优势", submit: submit });
}

function adds(){
	var html = "<div style='padding:10px;'>输入房屋配置：<input type='text' id='pz' name='pz' /></div>";
	var submit = function (v, h, f) {
		var i= 0
		$(".pz-radio").each(function (){
			if($(this).val() == f.pz){
				i = 1;
			}
		});
		
		if(i == 0){
			if(f.pz != null && f.pz != ''){
				$("#addPzs").before("<label class='type-label span-checked' onclick='changeTypes(this)' for='type7'><span class='glyphicon glyphicon-remove-circle delete' onclick='deleteType(this);'></span>"+f.pz+"<i></i> <input type='checkbox' checked='checked' class='pz-radio' name='hi_project' value='"+f.pz+"'></label>");
				}
		    return true;
		}else{
			$.jBox.tip("已有房屋配置");
			 return false;
		}
	};

	$.jBox(html, { title: "房屋配置", submit: submit });
}

function addVer(){
	var html = "<div style='padding:10px;'>输入公寓类型：<input type='text' id='ver' name='ver' /></div>";
	var submit = function (v, h, f) {
		var i= 0
		$(".ver-radio").each(function (){
			if($(this).val() == f.ver){
				i = 1;
			}
		});
		
		if(i == 0){
			if(f.ver != null && f.ver != ''){
				$("#addVer").before("<label class='type-label' onclick='changeTypeVer(this)' for='type7'><span class='glyphicon glyphicon-remove-circle delete' onclick='deleteType(this);'></span>"+f.ver+"<i></i> <input type='checkbox' checked='' class='ver-radio' name='hi_version' value='"+f.ver+"'></label>");
				 addBrandType(f.ver);
				}
		    return true;
		}else{
			$.jBox.tip("已有公寓类型");
			 return false;
		}
	};

	$.jBox(html, { title: "公寓类型", submit: submit });
}
function deleteType(obj){
	$(obj).parent().remove();
}
</script>
    <div style="min-width: 1600px;">
	<div class="divs2 modelAddTop" id="follow">
		<script>
			var start = '${start}';
			var phi_id = '${phi_id}';
			if(start == 1){
				$("#follow").css("display","block");
				selectOrade(phi_id);
			}
			if(start == 2){
				$("#follow").css("display","none");
				selectOrade(phi_id);
			}
		</script>
		<ul id="myTab" class="nav nav-tabs">
		   <li class="active"><a href="#ios" data-toggle="tab"><h5>房源审查</h5></a></li>
		   <li><a href="#home" data-toggle="tab"><h5>房源跟进</h5></a></li>
		   <li><a href="#jmeter" data-toggle="tab"><h5>房源实勘</h5></a></li>
		   <li><a href="#ejb" data-toggle="tab"><h5>房屋图片</h5></a></li>
		   
		   <li><a href="#xiugai" data-toggle="tab"><h5>房源更新</h5></a></li>
		   <li><a href="#fixedPrice" data-toggle="tab"><h5>房源定价</h5></a></li>
		   <li><a href="#contract" data-toggle="tab"><h5>合同确认</h5></a></li>
		</ul>
		<div id="myTabContent" class="tab-content">
			<div class="tab-pane fade in active" id="ios">
		   		<form class="form-inline" alt="First slide" action="/intention/addFeedback" id="addFeedback" method="POST">
		   			<label style="margin-top: 20px;margin-right: 16px;" class="jianju pull-left">房源审查</label>
					<ul class="modelAddTop pull-left">
			        	<li class="btn btn-info" id="gr">个人</li>
			        	<li class="btn btn-info" id="zj">中介</li>
			        	<li class="btn btn-info" id="tg">托管</li>
			        	<li class="btn btn-info" id="noe">无效</li>
			        </ul>
			        <div class="col-md-12 modelAddTop modelAdd" >
						<div class="form-group" >
					    	<label for="exampleInputPassword1" class="jianju">描述</label>
					    	<textarea class="form-control" name="phi_explain" style="width: 500px;" rows="3">${phi_explain}</textarea>
					    </div>
					</div>
			        <div class="col-md-12" style="display: none;">
					    <input type="text" class="form-control" name="phi_state" placeholder="房屋来源">
					    <input type="text" class="form-control" name="_sta" placeholder="房屋来源">
					</div>
					<div class="col-md-12 modelAdd">
						<button class="btn btn-info pull-left" style="margin-left: 77px;" onclick="changeState();" type="button">确认跟进</button>
					</div>
				</form>
		   </div>
		   <div class="tab-pane fade" id="home">
		   	  <form class="form-inline" alt="First slide" action="/intention/addFollow" id="addFollow" method="POST">
				  <div class="col-md-12 modelAddTop modelAdd">
					<div class="form-group" >
				    	<label for="exampleInputPassword1" class="jianju">跟进时间</label>
				    	<input type="text" class="form-control" readonly="readonly" onclick="WdatePicker({startDate:'%y-%M-%d %h:%m:%s',dateFmt:'yyyy-MM-dd HH:mm:ss',alwaysUseStartDate:true})" name="ghf_d" placeholder="点击获取跟进时间" required>
				    </div>
				  </div>
		          <div class="col-md-12 modelAddTop modelAdd" >
					 <div class="form-group" >
				    	<label for="exampleInputPassword1" class="jianju">跟进内容</label>
				    	<textarea class="form-control" name="ghf_item" style="width: 500px;" rows="3"></textarea>
				     </div>
				   </div>
					<div class="col-md-12 modelAdd">
						<div class="form-group" >
					    	<label for="exampleInputPassword1" class="jianju">说明</label>
					    	<textarea class="form-control" name="ghf_content" style="width: 500px;" rows="3"></textarea>
					    </div>
					</div>
					<div class="col-md-12 modelAdd">
						<button class="btn btn-info pull-left" style="margin-left: 77px;" onclick="selectState(1);" type="button">确认跟进</button>
					</div>
				</form>
		   </div>
		   <div class="tab-pane fade" id="jmeter">
		   	  <form class="form-inline" alt="First slide" action="/intention/addTrack" id="addTrack" method="POST">
			      <div class="col-md-6 modelAdd modelAddTop">
						<div class="form-group" >
					    	<label for="exampleInputPassword1" class="jianju">房源区域</label>
					    	<select class="form-control" name="hi_area">
						    	<option value="南岸区">南岸区</option>
						    	<option value="渝中区">渝中区</option>
						    	<option value="江北区">江北区</option>
						    	<option value="沙坪坝区">沙坪坝区</option>
						    	<option value="九龙坡区">九龙坡区</option>
						    	<option value="大渡口区">大渡口区</option>
						    	<option value="北碚区">北碚区 </option>
						    	<option value="渝北区 ">渝北区 </option>
						    	<option value="巴南区">巴南区</option>
							</select>
					    </div>
					</div>
					<div class="col-md-6 modelAdd modelAddTop">
						<div class="form-group" >
					    	<label for="exampleInputPassword1" class="jianju">房源商圈</label>
					    	<select class="form-control" name="hi_district">
						    	<option value="南坪">南坪</option>
						    	<option value="解放碑">解放碑</option>
						    	<option value="观音桥">观音桥</option>
						    	<option value="沙坪坝">沙坪坝</option>
						    	<option value="杨家坪">杨家坪</option>
							</select>
					    </div>
					</div>
					<div class="col-md-6 modelAdd" >
						<div class="form-group" >
					    	<label for="exampleInputPassword1" class="jianju">房源轨道</label>
					    	<select class="form-control" name="hi_track">
					    		<option value="无">无</option>
						    	<option value="1号线">1号线</option>
						    	<option value="2号线">2号线</option>
						    	<option value="3号线">3号线</option>
						    	<option value="6号线">6号线</option>
							</select>
					    </div>
					</div>
					<div class="col-md-6 modelAdd">
						<div class="form-group" >
					    	<label for="exampleInputPassword1" class="jianju">房源面积</label>
					    	<input type="text" class="form-control" name="hi_measure" placeholder="房源面积"><span class="jianju">㎡</span>
					    </div>
					</div>
					<div class="col-md-12 modelAdd">
						<div class="form-group" >
					    	<label for="exampleInputPassword1" class="jianju">房源户型</label>
					    	<select class="form-control" name="hi_houseS">
						    	<option value="1">1室</option>
						    	<option value="2">2室</option>
						    	<option value="3">3室</option>
						    	<option value="4">4室</option>
							</select>
							<select class="form-control jianju" name="hi_houseT">
								<option value="0">0厅</option>
						    	<option value="1">1厅</option>
						    	<option value="2">2厅</option>
						    	<option value="3">3厅</option>
							</select>
							<select class="form-control jianju" name="hi_houseW">
								<option value="0">0卫</option>
						    	<option value="1">1卫</option>
						    	<option value="2">2卫</option>
						    	<option value="3">3卫</option>
							</select>
					    </div>
					</div>
					<div class="col-md-12 modelAdd">
						<div class="form-group" >
					    	<label for="exampleInputPassword1" class="jianju">装修情况</label>
							<select class="form-control" name="hi_situation">
								<option value="2">精装</option>
								<option value="4">中装</option>
						    	<option value="1">简装</option>
						    	<option value="0">清水</option>
						    	<option value="3">豪装</option>
							</select>
					    </div>
					</div>
					<div class="col-md-6 modelAdd">
						<div class="form-group" >
					    	<label for="exampleInputPassword1" class="jianju">房源品牌</label>
					    	<select class="form-control" onchange="changeBrand();" id="houseHouseBrand" name="Propert">
					    	</select>
					    </div>
					</div>
					<div class="col-md-6 modelAdd" style="display: none;">
						<div class="form-group" >
					    	<label for="exampleInputPassword1" class="jianju">房源物业</label>
					    	<select class="form-control" id="userCenterPropertyInfo" name="P">
					    	</select>
					    </div>
					</div>
					<div id="versions" class="col-md-12 modelAdd modelAddTop">
						<label for="exampleInputPassword1" class="jianju" style="float: left;">公寓类型</label>
						<label class="type-label" onclick="addVer();" id="addVer">
								+<i></i> 
						</label>
					</div>
					<div class="col-md-12 modelAdd">
						<div class="form-group" >
					    	<div class="col-md-12 modelAdd modelAddTop" style="margin-left: 40px;float: left;" id="hoseRecommendGroups">
					    	<label style="margin-left: -45px;" class="jianju">推荐群体</label>
					 		</div>
					    </div>
					</div>
					<div class="col-md-12 modelAdd">
						<label for="exampleInputPassword1" class="jianju" style="float: left;">房源配置</label>
						<div style="margin-left: 10px;">
						    <label class="type-label" onclick="changeTypes(this)" for="type1">
						    	<span class='glyphicon glyphicon-remove-circle delete' onclick='deleteType(this);'></span>
								电视<i></i> 
								<input type="checkbox" class="pz-radio" name="hi_project" value="电视">
							</label>
						    <label class="type-label" onclick="changeTypes(this)" for="type2">
						    <span class='glyphicon glyphicon-remove-circle delete' onclick='deleteType(this);'></span>
								冰箱<i></i> 
								<input type="checkbox" class="pz-radio" name="hi_project" value="冰箱">
							</label>
						    <label class="type-label" onclick="changeTypes(this)" for="type3">
						    <span class='glyphicon glyphicon-remove-circle delete' onclick='deleteType(this);'></span>
								洗衣机<i></i> 
								<input type="checkbox" class="pz-radio" name="hi_project" value="洗衣机">
							</label>
							<label class="type-label" onclick="adds();" id="addPzs">
								+<i></i> 
							</label>
						</div>
					</div>
				<div class="col-md-12 modelAdd">
						<div class="form-group" >
					    	<label for="exampleInputPassword1" class="jianju">房源点评</label>
					    	<textarea class="form-control" name="hi_content" style="width: 500px;" rows="3"></textarea>
					    </div>
					</div>
				<div class="col-md-12" style="display: none;">
				    <input type="text" class="form-control" value="${phi_id }" name="phi_id" placeholder="房屋来源">
				</div>
				<div class="col-md-12 modelAdd">
					<button class="btn btn-info pull-left" style="width:70px;margin-left: 78px;" onclick="selectState(2);" style="width:70px;" type="button">提交</button>
				</div>
				</form>
		   </div>
		   <div class="tab-pane fade" id="xiugai">
		   	  <form class="form-inline" alt="First slide" action="/intention/updataHouseIntention" method="POST" id="updataInfo">
					<div class="inner">
						<div>
							<div class="col-md-6 modelAddTop modelAdd">
								<div class="form-group" >
							    	<label for="exampleInputPassword1" class="jianju">房源标题</label>
							    	<input type="text" class="form-control" value="${houseIntention.phi_name }" name="phi_name" placeholder="房源标题">
							    </div>
							</div>
							<div class="col-md-6 modelAddTop modelAdd" >
								<div class="form-group" >
							    	<label for="exampleInputPassword1" class="jianju">房东报价</label>
							    	<input type="text" class="form-control" onkeyup="this.value=this.value.replace(/[^0-9]\D*$/,'')" value="${houseIntention.phi_money }" name="phi_money" placeholder="房屋价格/月">
							    </div>
							</div>
							<div class="col-md-6 modelAdd" >
								<div class="form-group" >
							    	<label for="exampleInputPassword1" class="jianju">房源楼层</label>
							    	<input type="text" class="form-control" onkeyup="this.value=this.value.replace(/[^0-9]\D*$/,'')" value="${houseIntention.phi_floor }" name="phi_floor" placeholder="房屋楼层">
							    </div>
							</div>
							<div class="col-md-6 modelAdd" >
								<div class="form-group" >
							    	<label for="exampleInputPassword1" class="jianju">楼层总数</label>
							    	<input type="text" class="form-control" onkeyup="this.value=this.value.replace(/[^0-9]\D*$/,'')" value="${houseIntention.phi_total_floor }" name="phi_total_floor" placeholder="楼层总数">
							    </div>
							</div>
							<div class="col-md-6 modelAdd">
								<div class="form-group" >
							    	<label for="exampleInputPassword1" class="jianju">房源房号</label>
							    	<input type="text" class="form-control" value="${houseIntention.phi_address }" name="phi_address" placeholder="房源房号">
							    </div>
							</div>
							<div class="col-md-6 modelAdd" >
								<div class="form-group" >
							    	<label for="exampleInputPassword1" class="jianju">联系人</label>
							    	<input type="text" class="form-control" value="${houseIntention.phi_user }" name="phi_user" placeholder="联系人">
							    </div>
							</div>
							<div class="col-md-6 modelAdd">
								<div class="form-group" >
							    	<label for="exampleInputPassword1" class="jianju">联系电话</label>
							    	<input type="text" class="form-control" value="${houseIntention.phi_phone }" name="phi_phone" placeholder="联系电话">
							    </div>
							</div>
							<div class="col-md-12 modelAdd">
								<div class="form-group" >
							    	<dl style="float: left;margin-left: 12px;">
						            	<dt style="float: left;">所属物业</dt>
						                <dd style="float: left;margin-left: 12px;">
								        	<div class="main-box-list" style="position: relative;" >
												<input type="text" value="${houseIntention.propertyInfo_Name}" data-validation-engine="validate[required]" class="form-control vaildbox data-change1" id="conhouseno" placeholder="点击搜索物业" readonly="readonly" required="required" style="width: 300px;">
												<span class="error-tisp"></span>
												<div id="queryList">
													<div id="search-box"><input type="text" placeholder="输入物业名"></div>
													<div id="search-show">
														<div class="search-tisp">没有数据</div>
													</div>
												</div>
										   </div>
						                </dd>
						            </dl>
						            <input type="text" name="propertyInfo_Id" value="${houseIntention.propertyInfo_Id}" id="propertyInfo_Id" style="display: none;">
						            <span style="line-height: 30px;margin-left: 24px;" id='tishi'></span>
							    </div>
							</div>
							<div class="col-md-6 modelAdd">
								<div class="form-group" >
							    	<label for="exampleInputPassword1" class="jianju">房源来源</label>
							    	<select class="form-control" name="hs_id">
								    	<option value="1">线下拓展</option>
								    	<option value="5">58同城</option>
								    	<option value="6">赶集网</option>
								    	<option value="7">安居客</option>
								    	<option value="2">中介介绍</option>
								    	<option value="3">转介绍</option>
								    	<option value="8">官网</option>
								    	<option value="4">其他</option>
									</select>
							    </div>
							</div>
							<div class="col-md-12 modelAdd">
								<div class="form-group" >
							    	<label for="exampleInputPassword1" class="jianju">房源概况</label>
							    	<textarea class="form-control" name="phi_status" style="width: 500px;" rows="3">${houseIntention.phi_status }</textarea>
							    </div>
							</div>
							<div class="col-md-12 modelAdd">
								<label for="exampleInputPassword1" class="jianju" style="float: left;">房源优势</label>
								<div style="margin-left: 10px;">
								    <label class="type-label" onclick="changeTypes(this)" for="type1">
								    	<span class='glyphicon glyphicon-remove-circle delete' onclick='deleteType(this);'></span>
										家电齐全<i></i> 
										<input type="checkbox" class="type-radio" name="phi_configure" value="家电齐全" id="type1">
									</label>
								    <label class="type-label" onclick="changeTypes(this)" for="type2">
								    <span class='glyphicon glyphicon-remove-circle delete' onclick='deleteType(this);'></span>
										3号线<i></i> 
										<input type="checkbox" class="type-radio" name="phi_configure" value="3号线" id="type2">
									</label>
								    <label class="type-label" onclick="changeTypes(this)" for="type3">
								    <span class='glyphicon glyphicon-remove-circle delete' onclick='deleteType(this);'></span>
										精装修<i></i> 
										<input type="checkbox" class="type-radio" name="phi_configure" value="精装修" id="type3">
									</label>
									<label class="type-label" onclick="add();" id="addPz">
										+<i></i> 
									</label>
								</div>
							</div>
							<div class="col-md-12" style="display: none;">
							    <input type="text" class="form-control" value="${houseIntention.hs_name }" name="hs_name" placeholder="房屋来源">
							    <input type="text" class="form-control" value="${houseIntention.phi_id }" name="phi" placeholder="房屋来源">
							    <input type="text" class="form-control" value="${houseIntention.hs_id }" name="hs_id" placeholder="房屋来源">
							    <input type="text" class="form-control" value="${houseIntention.em_id }" name="em_id" placeholder="房屋来源">
							    <input type="text" class="form-control" value="${houseIntention.phi_state }" name="phi_state" placeholder="房屋来源">
							    <input type="text" class="form-control" value="${houseIntention.phi_explain }" name="phi_explain" placeholder="房屋来源">
							    <input type="text" class="form-control" value="${houseIntention.phi_type }" name="phi_type" placeholder="房屋来源">
							</div>
							<div class="col-md-10 modelAdd">
								<button class="btn btn-info pull-left" style="width:70px;margin-left: 77px;" type="button" onclick="updataInfo();">修改</button>
							</div>
						</div>
					</div>
				</form>
		   </div>
		   <div class="tab-pane fade" id="ejb">
		      <div class="image">
				<div style="width:100%;">
				      <div id="yhks" style="width: 100%;height: 200px;margin-top: 4%;display:block;">
					 	<div style="float: left;" id="dfg">
			                   <ul>
			                       <li class="images_img"><div class="imageFile"><img src="/resources/image/jpgName.jpg" width="130px" height="130px" onclick="$('#file5').trigger('click')" style='cursor:pointer'/><input type="file" name="file5" id="file5" onchange="ajaxFile()" style="display: none" accept=".jpg,.png,.jpeg,.bmp,.gif" /></div><div class="class_image"></div></li>
			                       <li>点击上传房屋图片,点击图片删除</li>
			                       <li style="color:#CCC">支持bmp,gif,jpg,png,jpeg格式文件</li>
			                   </ul>
			               </div>
			               <div id="yhk" style="width: 95%;margin-top:10px;padding-bottom:20px;padding-top:10px;overflow: hidden;border-radius: 12px;-webkit-border-radius: 12px; -moz-border-radius: 12px;background-color: #f7f7f7;border: 1px solid #eee;float: left;">
		  
			               </div>
					 </div>
					 <div id="imageTyp" style="display: none;padding-top: 20px;">
			         	<div class="col-md-6">
							<div class="form-group " >
						    	<input type="text" class="form-control" required="required" name="hm_name" placeholder="房屋图片名称" id="hm_name" />
						    </div>
						</div>
			            <div class="col-md-6">
							<div class="form-group " >
						    	 <select class="form-control" onchange="changeType();" name="hit_type">
					    	 		<option value="page">封面</option>
						    		<option value="effect">效果图片</option>
						    		<option value="solid">户型图片</option>
						    		<option value="3d">3D效果图</option>
						    	</select>
						    </div>
						</div>
		         	</div>
		         	<!--Step 2-->
			         <div id="Step2Container" style="display: none;padding-top: 80px;">
			         	<input type="hidden" name="picture"/>
			           <div class="title"><b> 裁切图像</b></div>
			           <div class="uploadtooltip">您可以拖动图像以裁剪满意的图像</div>                              
		               <div id="Canvas" class="uploaddiv">
		                    <img id="pic-img-content" src="" alt="请选择头像" style="display:none;">                       
		             	</div>
		         	 <div class="uploaddiv">
		                 <input type="button" class="btn btn-info pull-right" onclick="delete_image();" style="width: 70px;margin-left: 10px;" value="取消" id="delete_Image" />&nbsp;
		                 <input type="button" class="btn btn-info pull-right" onclick="cutImage();" name="btn_Image" value="保存图像" id="btn_Image" />
		             </div>
			         </div>
			   </div>	
	   </div>
		   </div>
		   <div class="tab-pane fade" id="fixedPrice">
		   	  <form class="form-inline" alt="First slide" action="/intention/addContract" id="addContract" method="POST">
				  <div class="col-md-10 modelAddTop modelAdd" >
					<div class="form-group" >
						<label for="exampleInputPassword1" class="jianju">存房价格</label>
						<input type="text" class="form-control" onkeyup="this.value=this.value.replace(/[^0-9]\D*$/,'')" name="fixedPrice" placeholder="存房价格">
						<span id="jgkj" class="jianju" style="color: red;font-size: 12px;"></span>
					</div>
				  </div>
				  <div class="col-md-12 modelAdd">
					 <button class="btn btn-info pull-left"  onclick="selectState(6);" style="width:70px;margin-left: 77px;" type="button">确认</button>
				  </div>
			  </form>
		   </div>
		   <div class="tab-pane fade" id="contract">
		   	  <form class="form-inline" alt="First slide" action="/intention/addContract" id="addContract" method="POST">
			        <div class="col-md-6 modelAdd modelAddTop pull-left" >
						<div class="form-group" >
					    	<label for="exampleInputPassword1" class="jianju">跟进结果</label>
					    	<select class="form-control" onchange="checkSta();" name="ghfc_con">
					    		<option>成功</option>
					    		<option>放弃</option>
					    		<option>失败</option>
					    	</select>
					    </div>
					 </div>
					 <ul class="modelAddTop pull-left" id="zt" style="display:block">
			        	<li class="btn btn-info" id="dj">定金</li>
			        	<li class="btn btn-info" id="yj">诚意金</li>
			        	<li class="btn btn-info" id="ht">合同</li>
			        </ul>
		   	  		<div class="col-md-12 modelAddTop modelAdd pull-left" id="money" style="display: none;">
						<div class="form-group" >
					    	<label for="exampleInputPassword1" class="jianju">金额</label>
					    	<input type="text" class="form-control" onkeyup="this.value=this.value.replace(/[^0-9]\D*$/,'')" name="money" placeholder="金额">
					    </div>
					</div>
					<div class="col-md-6 modelAddTop modelAdd" style="display: none;">
					    <input type="text" class="form-control" name="ate">
					</div>
					<div class="col-md-12 modelAddTop modelAdd" >
							<div class="form-group" >
						    	<label for="exampleInputPassword1" class="jianju">备注</label>
						    	<textarea class="form-control" name="ghfc_reason" style="width: 500px;" rows="3"></textarea>
						    </div>
						</div>
					<div class="col-md-12 modelAddTop modelAdd">
						<button class="btn btn-info pull-left" onclick="selectState(5);" style="width:70px;margin-left: 77px;" type="button">确认</button>
					</div>
				</form>
		   </div>
		</div>
	</div>
	<div class="modelAddTop divs">
		<div class="Pro_contents">
          <div class="Pro_content">
              <h4 class="h4Sty">意向房源跟踪记录</h4>
              <div id="Pro_content">
              	<ul>
              		<!-- 订单状态 -->
              	</ul>
              </div>
           </div>
        </div>
	</div>
</div>
<script>
var phi_state = '${phi_state}';
$("input[name='_sta']").val(phi_state);
if(phi_state == '个人'){
	$("#gr").text('个人'+"√");
	$("#gr").removeClass().addClass("btn btn-danger");
	$("input[name='phi_state']").val('个人');
}
if(phi_state == '中介'){
	$("#zj").text('中介'+"√");
	$("#zj").removeClass().addClass("btn btn-danger");
	$("input[name='phi_state']").val('中介');
}
if(phi_state == "托管"){
	$("#tg").text("托管"+"√");
	$("#tg").removeClass().addClass("btn btn-danger");
	$("input[name='phi_state']").val("托管");
}
if(phi_state == "无效"){
	$("#noe").text("无效"+"√");
	$("#noe").removeClass().addClass("btn btn-danger");
	$("input[name='phi_state']").val("无效");
}
</script>
<script>
var hs_id = '${houseIntention.hs_id}';
$("select[name='hs_id']").val(hs_id);
var propertyInfo_Id = '${houseIntention.propertyInfo_Id}';
$("select[name='propertyInfo_Id']").val(propertyInfo_Id);
var adIds = ""; 
$("input:checkbox[name='phi_configure']").each(function(i){  
    if(0==i){  
        adIds = $(this).val();  
    }else{  
        adIds += (","+$(this).val());  
    }  
});  
var phi_configure = '${houseIntention.phi_configure }'
var strs='${houseIntention.phi_configure }'.split(",");
var is=adIds.split(","); //字符分割
for (i=0;i<is.length ;i++ ) {
	for (j=0;j<strs.length ;j++ ) {
		if(is[i] == strs[j]){
			$("input:checkbox[name='phi_configure']").each(function(i){ 
				if($(this).val() == strs[j]){
					$(this).parent(".type-label").addClass("span-checked");
					$(this).attr("checked",'checked');
					phi_configure=phi_configure.replace($(this).val() +",","");
					phi_configure=phi_configure.replace($(this).val(),"");
				}
	        });  
		}
	}
}
var phi_configureList=phi_configure.split(","); //字符分割
if(phi_configureList.length > 0){
	for(i=0;i<phi_configureList.length ;i++ ){
		if(phi_configureList[i] != ""){
		 $("#addPz").before("<label class='type-label span-checked' onclick='changeTypes(this)' for='type7'><span class='glyphicon glyphicon-remove-circle delete' onclick='deleteType(this);'></span>"+phi_configureList[i]+"<i></i> <input type='checkbox'  checked='checked' class='type-radio' name='phi_configure' value='"+phi_configureList[i]+"'></label>");
		}
	}
}

</script>