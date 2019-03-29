<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE>
<html>
<head>
  <title>修改房源</title>
</head>
<!-- 底部 css样式 -->
<link href="/resources/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
<link href="/resources/css/manage_index.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="<%= request.getContextPath()%>/resources/Plug-in/kindeditor-4.1.10/themes/default/default.css" />
<link href="/resources/css/product/updataHouse.css" rel="stylesheet" type="text/css">
<link href="/resources/css/upload/uploadPage.css" type="text/css" rel="Stylesheet" />
<script src="/resources/js/jquery-1.7.2.min.js"></script>

<link type="text/css" rel="stylesheet" href="/resources/css/userInfo.css">
<link type="text/css" rel="stylesheet" href="/resources/common/cropper/cropper.css">
<link type="text/css" rel="stylesheet" href="/resources/common/uploadify/css/uploadify.css">

<!-- 图片剪切 -->
<script type="text/javascript" src="/resources/common/cropper/cropper.js"></script>
<!-- 文件上传 -->
<script type="text/javascript" src="/resources/common/uploadify/js/jquery.uploadify.js"></script>
<script src="/resources/js/intention/ajaxfileupload.js"></script>
<script charset="utf-8" src="<%= request.getContextPath()%>/resources/js/product/updataHouseInfo.js"></script>
<!-- 时间控件 -->
<script src="/resources/Plug-in/My97DatePicker4.7.2/WdatePicker.js"></script>
<!-- 文本编辑器 -->
<script charset="utf-8" src="<%= request.getContextPath()%>/resources/Plug-in/kindeditor-4.1.10/kindeditor-min.js"></script>
<script charset="utf-8" src="<%= request.getContextPath()%>/resources/Plug-in/kindeditor-4.1.10/lang/zh_CN.js"></script>
<!-- jBox -->
<link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">
<script charset="utf-8" src="<%= request.getContextPath()%>/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
<script charset="utf-8" src="<%= request.getContextPath()%>/resources/Plug-in/jbox-v2.3/jBox/i18n/jquery.jBox-zh-CN.js"></script>
<script src="/resources/js/intention/addHouseIntention.js"></script>
<style>
.place {
    height: 2px;
    background: #3eafe0;
    position: fixed;
    width: 100%;
    margin-top: -50px;
}
.df{
	width:90%;
	padding:5px 30px;
	min-width:1080px;
	margin:50px;
	border:4px solid #ebcbbe;
}
.dfs{
	width:90%;
	padding:5px 30px;
	min-width:1080px;
	margin:50px;
	border:4px solid #ebcbbe;
}
.image{
	width:90%;
	padding:5px 30px;
	height:100%;
	margin:50px;
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
	padding-left: 20px;
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
			    $("#addPz").before("<div class='type-label span-checked' onclick='changeTypes(this)' for='type7'><span class='glyphicon glyphicon-remove-circle delete' onclick='deleteType(this);'></span>"+f.pz+"<i></i> <input type='checkbox' checked='checked' class='type-radio' name='hi_function' value='"+f.pz+"'></div>");
			}
		    return true;
		}else{
			$.jBox.tip("已有房源优势");
			 return false;
		}
	};

	$.jBox(html, { title: "房源优势", submit: submit });
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

<!-- 位置栏 -->

    <div style="min-width: 1400px;">
    <form class="form-inline" alt="First slide" action="/houseLibrary/upDataHouse" method="POST" id="updateHouse">
	    <div class="df">
			<span class="titles">房屋基本信息</span>
			<table width="100%" border="0">
			  <tr>
			    <td>房屋标题<input type="text" class="form-control jianju" name="hi_name" placeholder="房屋名称" required></td>
			    <td>存屋价格<input type="text" class="form-control jianju" name="hi_keepMoney" placeholder="存房价格" required><span class="jianju">元/月</span></td>
			    <td>出房价格<input type="text" class="form-control jianju" name="hi_money" placeholder="出房价格" required><span class="jianju">元/月</span></td>
			  </tr>
			  <tr>
			    <td>房屋面积<input type="text" onkeyup="this.value=this.value.replace(/^[a-z\u4E00-\u9FA5]+$/,'')" class="form-control jianju" name="hi_measure" placeholder="房屋面积" required><span class="jianju">㎡</span></td>
			    <td>房屋楼层<input type="text" onkeyup="this.value=this.value.replace(/[^0-9]\D*$/,'')" class="form-control jianju" name="hi_floor" placeholder="房屋楼层" required></td>
			    <td>楼层总层<input type="text" onkeyup="this.value=this.value.replace(/[^0-9]\D*$/,'')" class="form-control jianju" name="hi_totalFloor" placeholder="房屋楼层总层数" required></td>
			  </tr>
			  <tr>
			    <td>房东名称<input type="text" class="form-control jianju" name="hi_peopleName" placeholder="房东名称" required></td>
			    <td>房号<input type="text" class="form-control jianjuss" id="hi_address" name="hi_address" placeholder="房源地址" required></td>
			  </tr>
			  <tr>
			    <td>房屋类型<input type="checkbox" style="margin-left: 20px;" name="hi_type" value="普通住宅" checked="checked">普通住宅<input type="checkbox" value="高档住宅" style="margin-left: 20px;" name="hi_type">高档住宅</td>
			    <td>房屋情况<input type="checkbox" style="margin-left: 20px;" name="hi_state" value="基装" checked="checked">基装<input type="checkbox" value="精装" style="margin-left: 20px;" name="hi_state">精装<input type="checkbox" value="中装" style="margin-left: 20px;" name="hi_state">中装<input type="checkbox" value="清水" style="margin-left: 20px;" name="hi_state">清水<input type="checkbox" value="豪装" style="margin-left: 20px;" name="hi_state">豪装</td>
			    <td colspan="2">房屋朝向<input type="checkbox" style="margin-left: 20px;" name="hi_orientation" value="东" checked="checked">东<input type="checkbox" value="南" style="margin-left: 20px;" name="hi_orientation">南<input type="checkbox" value="西" style="margin-left: 20px;" name="hi_orientation">西<input type="checkbox" value="北" style="margin-left: 20px;" name="hi_orientation">北</td>
			  </tr>
			  <tr>
			  	<td colspan="4">房屋户型
			  		<select class="form-control jianju" name="hi_houseS">
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
			  	</td>
			  </tr>
			 <tr>
			     <td>房屋轨道
				    <select class="form-control jianju" id="houseHouseBrand" name="hi_track">
				    	<option value="无">无</option>
				    	<option value="1号线">1号线</option>
				    	<option value="2号线">2号线</option>
				    	<option value="3号线">3号线</option>
				    	<option value="6号线">6号线</option>
					</select>
				 </td>
				 <td>房屋区域
				 	<select class="form-control jianju" name="hi_area">
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
				 </td>
				 <td>房屋商圈
				    <select class="form-control jianju" name="hi_district">
				    	<option value="南坪">南坪</option>
				    	<option value="解放碑">解放碑</option>
				    	<option value="观音桥">观音桥</option>
				    	<option value="沙坪坝">沙坪坝</option>
				    	<option value="杨家坪">杨家坪</option>
					</select>
				 </td>
			  </tr>
			  <tr>
			    <td style="padding-left: 20px;" colspan="6">
			    	<span style="float: left;margin-right: 12px;">房源优势</span>
				    <div class="type-label" onclick="changeTypes(this)" for="type1">
				    	<span class='glyphicon glyphicon-remove-circle delete' onclick='deleteType(this);'></span>
						家电齐全<i></i> 
						<input type="checkbox" class="type-radio" name="hi_function" value="家电齐全" id="type1">
					</div>
				    <div class="type-label" onclick="changeTypes(this)" for="type2">
				    	<span class='glyphicon glyphicon-remove-circle delete' onclick='deleteType(this);'></span>
						3号线<i></i> 
						<input type="checkbox" class="type-radio" name="hi_function" value="3号线" id="type2">
					</div>
				    <div class="type-label" onclick="changeTypes(this)" for="type3">
				    	<span class='glyphicon glyphicon-remove-circle delete' onclick='deleteType(this);'></span>
						精装修<i></i> 
						<input type="checkbox" class="type-radio" name="hi_function" value="精装修" id="type3">
					</div>
					<div class="type-label" onclick="add();" id="addPz">
							+<i></i> 
					</div>
				</td>
			  </tr>
			  <tr>
			    <td colspan="4">房源点评<textarea class="form-control jianju" name="hi_content" style="width: 630px;max-width: 630px;max-height: 55px;" rows="2"></textarea></td>
			    <td><input type="text" name="he_id" id="he_id" style="display: none;" />
			    <input type="text" name="hi_code" id="hi_code" style="display: none;" />
				<input type="text" name="hi_id" id="hi_id" style="display: none;" />
				<input type="text" name="pu_id" id="pu_id" style="display: none;" /></td>
			  </tr>
			  <tr>
			    <td>房屋经纬<input type="text" class="form-control jianju" id="biaozhu" onclick="mapss();" readonly="readonly" name="hi_latitude" placeholder="点击获取房屋经纬度" required></td>
			    <td id="hiText"></td>
			    <td id="hiUserManaged"></td>
			    <td>
			    	<input type="text" class="form-control jianju" name="hi_text" placeholder="房屋简介" readonly="readonly" onchange="textChange();" required style="display: none;">
			    	<input type="text" class="form-control jianju" name="hi_userManaged" placeholder="托管管家" readonly="readonly" onchange="textChange();" required style="display: none;">
			    </td>
			  </tr>
			  <tr>
			    <td colspan="4" id="houseHouseBrands">房屋品牌</td>
			  </tr>
			  <tr>
			    <td colspan="4" style="padding-left: 20px;display: none;" id="versions">
			    	<span style="float: left;margin-right: 12px;">公寓类型</span>
			    	<div class="type-label" onclick="addVer();" id="addVer">
						+<i></i> 
					</div>
			    </td>
			  </tr>
			  <tr>
			    <td colspan="4" id="hoseRecommendGroups">推荐群体</td>
			  </tr>
			  <!-- <tr>
			    <td colspan="4">物业信息<div style="float: left;margin-left: 48px;margin-top: -20px;" id="userCenterPropertyInfos"></div></td>
			  </tr> -->
			  <tr>
			  	<td style="padding-left: 20px;">
			    	<dl style="float: left;">
		            	<dt style="float: left;">所属物业</dt>
		                <dd style="float: left;margin-left: 12px;">
				        	<div class="main-box-list" style="position: relative;" >
								<input type="text" data-validation-engine="validate[required]" class="form-control vaildbox data-change1" id="conhouseno" placeholder="点击搜索物业" readonly="readonly" required="required" style="width: 300px;">
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
		            <input type="text" name="propertyInfo_Id" id="propertyInfo_Id" style="display: none;">
		            <span style="line-height: 30px;margin-left: 24px;" id='tishi'></span>
				</td>
			  </tr>
			  <tr>
			  	<td colspan="4"><button class="btn btn-info" style="width:70px;margin-left:63px;margin-bottom: 30px;" onclick="updateHouse();" type="button">修改</button></td>
			  </tr>
			  <tr style="display: none;" id="propertyInfo_address"></tr>
			</table>
		</div>
	</form>
	<form class="form-inline" alt="First slide" action="/houseLibrary/upDataHouse" method="POST" id="updateExt">
		<div class="dfs">
			<span class="titles">房屋扩展信息</span>
			<table width="80%" border="0">
				   <tr>
				    <td style="padding-left: 20px;">产权人<input type="text" class="form-control jianjus" name="he_peopleName" placeholder="产权人" data-validation-engine="validate[required]"></td>
				    <td>房东电话<input type="text" data-validation-engine="validate[required,custom[phone],maxSize[11],minSize[11]]" class="form-control jianju" name="he_phone" placeholder="房屋房东电话"></td>
				    <td>产权证号<input type="text" style="width: 220px;" onkeyup="this.value=this.value.replace(/[^A-Za-z0-9]+$/,'')" class="form-control jianju" name="he_cardNumber" placeholder="如:" data-validation-engine="validate[required]"></td>
				  </tr>
				  <tr>
				    <td  style="padding-left: 20px;">购买价格<input type="text" onkeyup="this.value=this.value.replace(/^[a-z\u4E00-\u9FA5]+$/,'')" class="form-control jianju" name="he_money" placeholder="房屋购买价格" data-validation-engine="validate[required]"><span class="jianju">万元</span></td>
				    <td>购买时间<input type="text" data-validation-engine="validate[required]" class="form-control jianju" readonly="readonly" onclick="WdatePicker({startDate:'%y-%M-%d %h:%m:%s',dateFmt:'yyyy-MM-dd HH:mm:ss',alwaysUseStartDate:true})" name="buyTime" placeholder="点击获取房屋购买时间"></td>
				    <td>房东住址<input type="text" style="width: 220px;" data-validation-engine="validate[required]" class="form-control jianju" name="he_address" placeholder="房东地址"></td>
				  </tr>
				  <tr style="display: none">
				  <td>产权编号<input type="text" onkeyup="this.value=this.value.replace(/[^A-Za-z0-9]+$/,'')" class="form-control jianju" name="he_number" placeholder="如:" data-validation-engine="validate[required]"></td> 
				    <td><input type="text" name="he_id" id="he_ids" style="display: none;" /></td>
				    <td><input type="text" name="hi_id" id="hi_ids" style="display: none;" /></td>
				  </tr>
				  <tr>
				    <td colspan="3" style="padding-left: 20px;">房屋用途<input type="checkbox" style="margin-left: 20px;" name="he_nature" value="住宅" checked="checked">住宅<input type="checkbox" value="商住" style="margin-left: 20px;" name="he_nature">商住<input type="checkbox" value="商业" style="margin-left: 20px;" name="he_nature">商业</td>
				  </tr>
				  <tr>
				    <td colspan="3">房屋状态
					    <select class="form-control jianju" name="he_state">
					    	<option value="free">未租</option>
					    	<option value="rental">已租</option>
					    	<option value="expire">托管到期</option>
					    	<option value="clean">需要打扫</option>
					    	<option value="edit">未发布</option>
						</select>
					</td>
				  </tr>
				  <tr>
				  	<td colspan="4"><button class="btn btn-info" style="width:70px;margin-bottom: 30px;" onclick="updateExt();" type="button">修改</button></td>
				  </tr>
				  <tr style="display: none;" id="propertyInfo_address"></tr>
			</table>
		</div>
	</form>
	<div class="image">
		<span class="titles">房屋图片</span>
		<div style="width:50%;">
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
<script>
var id = '${id}';
selectHouseDescc(id);
selectImage(id);

</script>
