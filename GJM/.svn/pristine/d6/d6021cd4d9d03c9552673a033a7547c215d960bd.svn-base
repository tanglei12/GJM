<%@page import="com.gjp.util.AppUtil"%>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	response.setHeader("Pragma", "No-cache");
	response.setHeader("Cache-Control", "no-cache");
	response.setDateHeader("Expires", -10);
%>
<html>
<head>
<title></title>
	<link href="/resources/css/common/common.css" rel="stylesheet" type="text/css">
	<link rel="stylesheet" href="/resources/js/tree/css/demo.css" type="text/css"></link>
	<link rel="stylesheet" href="/resources/js/tree/css/zTreeStyle/zTreeStyle.css" type="text/css"></link>
	<link rel="stylesheet" href="/resources/common/font-awesome/css/font-awesome.min.css" type="text/css"></link>
	<link href="/resources/common/sweet-alert/css/sweetalert.css" rel="stylesheet" type="text/css">
	<link href="/resources/css/propertyInfo/propertyInfomain.css" rel="stylesheet" type="text/css">
	<link href="/resources/common/perfect-scrollbar/css/perfect-scrollbar.min.css" rel="stylesheet" type="text/css">
	<link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">
	
	<script type="text/javascript" src="/resources/js/jquery-1.7.2.min.js"></script>
	<script src="/resources/js/common/common.js"></script>
	<script src="/resources/common/perfect-scrollbar/js/perfect-scrollbar.jquery.js"></script>
	<script type="text/javascript" src="/resources/js/propertyInfo/propertyInfomain.js"> </script>
	<script src="/resources/js/product/jquery-cookie.js"></script><!-- COOKIE -->
	<script src="/resources/common/sweet-alert/js/sweetalert-dev.js">/* 提示弹窗 */</script>
	<script type="text/javascript" src="/resources/js/tree/js/jquery.ztree.all.js"></script>
	<script type="text/javascript" src="/resources/js/tree/js/jquery.ztree.exedit-3.5.js"></script>
	<script type="text/javascript" src="/resources/Plug-in/map/Js/public.js"></script>
	<script charset="utf-8" src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
	<script charset="utf-8" src="/resources/Plug-in/jbox-v2.3/jBox/i18n/jquery.jBox-zh-CN.js"></script>
	<!-- 时间控件 -->
	<script src="/resources/Plug-in/My97DatePicker4.7.2/WdatePicker.js"></script>
	<script src="/resources/js/propertyInfo/propertyInfomain.js"></script>
<style>

.ztree li span.button.add {
	margin-left: 2px;
	margin-right: -1px;
	background-position: -144px 0;
	vertical-align: top;
	*vertical-align: middle
}

.box-title {
	position: relative;
	height: 36px;
	line-height: 37px;
	font-size: 15px;
	border-bottom: 1px solid #3E97C9;
	padding: 0 20px;
	/* margin-bottom: 30px; */
	color: #100F0F;
}

.common-borderbox{
	position: relative;
    border: 2px solid #ccc;
    color: #888;
    padding: 0 16px;
    line-height: 28px;
    font-size: 14px;
    display: block;
    float: left;
    margin-right: 12px;
    cursor: pointer;
    -moz-border-radius: 4px;
    -webkit-border-radius: 4px;
    border-radius: 4px;
    -moz-user-select: none;
    -webkit-user-select: none;
    margin-bottom: 5px;
}

.common-borderbox-checked {
    border: 2px solid #1ABC9C;
    color: #1ABC9C;
}

input[type="text"] {
	width: 179px;
	height: 34px;
	border-radius: 4px;
	border: 1px solid #ccc;
	text-indent: 5px;
	margin-right: 5px;
}

.box-title:BEFORE {
	content: "";
	position: absolute;
	height: 20px;
	width: 4px;
	top: 8px;
	left: 8px;
	background: #3E97C9;
	border-radius: 3px;
}

em {
	color: red;
	text-align: center;
	margin-right: 6px;
	position: relative;
	font-size: 14px;
	font-weight: 600;
	top: 3px;
}

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
select:focus {
    border: 2px solid #46b8da;
}
input:focus {
    border: 2px solid #46b8da;
}
</style>
<style type="text/css">
*{margin:0 auto;padding:0;list-style-type:none;}
/* tab */
#tab{width:400px;position:relative;margin:50px auto;}
#tab .tab_menu{width:100%;float:left;position:absolute;z-index:1;}
#tab .tab_menu li a{text-decoration:none; color: gray;}
#tab .tab_menu li{float:left;width:92px;height:30px;line-height:30px;border:1px solid #ccc;border-bottom:0px;cursor:pointer;text-align:center;margin:0 2px 0 0;}
#tab .tab_box{width:420px;height:72%;position: relative; top:30px;border:1px solid #ccc;background-color:#fff;min-height: 72%;} 
#tab .tab_menu .selected{background-color:#CBE9EC;cursor:pointer;}
.hide{display:none;}
.tab_box{padding:60px;} 
</style>
<!-- 弹出层 -->
<style type="text/css">
#win{  
    border:1px gray solid;  
    width : 400px;  
    position : absolute;  
    top : 200px;  
    left: 500px;  
    display : none;  
}  
#title{  
    background-color : #5bc0de;  
    padding-left: 3px;  
}  
#cotent{  
	background-color:red;
    padding-left : 3px;  
    padding-top :  5px;  
}  
#close{  
    margin-left: 260px;  
    cursor: pointer;  
}  
</style>

<script type="text/javascript">
$(document).ready(function(){
	var $tab_li = $('#tab ul li');
	$tab_li.click(function(){
		$(this).addClass('selected').siblings().removeClass('selected');
		var index = $tab_li.index(this);
		$('div.tab_box > div').eq(index).show().siblings().hide();
	});	
});
var setting = {
				treeId:"zitTree",
				data: {
					simpleData: {
						enable: true,
						idKey:"id",
						pIdKey:"pid",
						rootPId:0
					}
				},callback : {
					beforeClick: zTreeOnCheck,
					
				}
			};
			//点击树触发的事件
		function zTreeOnCheck(treeId, treeNode, clickFlag) {
			$("#win").hide();
			$("#upn_id").val(treeNode.id);
			$("#sid").val(treeNode.sid);
			chakanwuye();
		};
		function checkcaozuo(obj){
			var xuanxiang=obj.innerHTML;
			return xuanxiang;
			
		}
		var zNodes = ${pInfoNames};
			//var tree = null ;
			$(function(){
				$.fn.zTree.init($("#treeDemo"), setting, zNodes);
			});
			//关闭继承框
			function hide(){  
			    var winNode = $("#win");  
			    winNode.hide();  
			} 
	
	/** 物业基本情况下拉框  */
	$(function(){
		$("#chakan").perfectScrollbar();
		//$("#content").perfectScrollbar();
	});
			
		</script>
</head>

<body>
	<table border="1" style="font-size: 12px; background-color: #fff; width: 96%; min-width: 1115px; margin: 0px auto; margin-top: 20px;">
		<tr>
			<td colspan="4">
				<div class="box-title" id="contract-object" style="">物业基础管理</div>
			</td>
		</tr>
	</table>
		<input type="hidden" value="" id="sid">
		<input type="hidden" value="" id="upn_id">
		<input type="hidden" value="" id="lq_id">
		<input type="hidden" value="" id="state">
		<input type="hidden" value="" id="propertyInfoid">
		<input type="hidden" id="gj-id" value="<%=AppUtil.getCookieEmployee().getEm_account()%>"/>
	<div style="width: 80%;margin: 0px 0px 0px -30px;border: 0px red solid; margin-top:50px; min-width: 90%;height: 86%;">
			<div style="position: absolute;top:70px;left:50px;padding-top: 20px;">
				<!-- <form action="/propertyInfo/sousuowuyemain" id="form1" method="get" onsubmit="return suosuowuye();" > -->
					<div style="float: left;">
						<input type="text" value="" placeholder="请输入物业名称" id="sousuowuyename" style="width: 150px;" name="wuyename" onchange="selProperName()"/>
					</div>
					<div style="position: absolute;margin-left: 120px;margin-top: 10px;">
						<i class="fa-search" style="color: #069;content: \f002;" onclick="selProperName()"></i>
					</div>
					<!-- &nbsp;&nbsp;&nbsp;&nbsp;<input type="submit" class="btn btn-info"  style="width: 100px;" value="点击搜索"/> -->
				<!-- </form> -->
				
				<div>
					<input type="button" value="继承物业" class='btn btn-info' onclick="jichengwuye();" style="width:100px;position: absolute;left:165px;" >
				</div>
				<div>
					<input type="button" value="跟进物业" class='btn btn-info' onclick="genjinwuye();" style="width:100px;position: absolute;left:280px;" >
				</div>
				
				<!-- 操作栏 -->	
				<!-- 			
				<button >继承物业</button>
				<button class='btn btn-info' class="btn-info" onclick="chakanwuye();"  style="width:100px;position: absolute;left:260px; ">查看物业</button>
				<button class='btn btn-info' class="btn-info" onclick="genjinwuye();"  style="width:100px;position: absolute;left:420px; ">跟进物业</button>
				 -->
				
			</div>
			<div class="content_wrap"
				style=" float: left; position: absolute;top:140px ;left:50px;height: 655px; width: 380px;">
				<div class="zTreeDemoBackground left"  >
					<ul id="treeDemo" class="ztree" style="width: 370px; border: 1px solid #eeeeee; "></ul>
				</div>
				
			</div>
				<div class="wuyejichuright" id="imgs" style="display:none; position:absolute;left:540px;top:80px;float: left;width:600px ;height: 42px;min-width: 600px;">
					<div id="img1" style="background-image:url(/resources/image/sdqh270120.png);height: 45px;width: 120px;background-repeat: no-repeat; float: left; background-size: cover;"></div>
					<div id="img2" style="background-image:url(/resources/image/wgjth270120.png);height: 45px;width:120px;background-repeat: no-repeat; float: left; background-size: cover;margin-left: 5px; "></div>
					<div id="img3" style="background-image:url(/resources/image/jbpzh270120.png);height: 45px;width: 120px;background-repeat: no-repeat; float: left; background-size: cover;margin-left: 5px;"></div>
					<div id="img4" style="background-image:url(/resources/image/cph270120.png);height: 45px;width: 120px;background-repeat: no-repeat; float: left; background-size: cover;margin-left: 5px;"></div>
				</div>
				
				<!-- 水电气div -->
				<div id="shuidianqi" style="display:none; width: 520px; position:absolute;left:600px;top:146px; min-width: 480px;margin-top:4px; float: left;margin-left:-104px; border: 1px solid #eeeeee; padding:15px; min-height: 622px;">
					<table border="1" style="font-size: 12px; background-color: #fff; width: 40%; min-width: 490px; margin:10px 0px 0px -10px;">
							<tr>
								<td colspan="4">
									<div class="box-title" id="contract-object" style="">物业基础管理</div>
								</td>
							</tr>
					</table>
					<div style="margin: 15px 0; overflow: hidden;">
						<dl style="width: 100%; margin-bottom: 10px;">
								<dt>类型:</dt>
								<dd>
									<select style="width: 90px; height: 35px; line-height: 35px;" id="wuyetype" onchange="checksdq();">
										<option id="wuyetypeshui"  value="水">水</option>
										<option id="wuyetypedian" value="电">电</option>
										<option id="wuyetypeqi" value="气">气</option>
									</select>
									<em>*</em>
								</dd>
						</dl>
						<dl style="width: 100%; margin-bottom: 10px;">
							<dt>是否开通:</dt>
							<dd>
								<select  id="sfkt"  style="width: 90px; height: 30px;">
									<option value="1" id="sfkts">是</option>
									<option value="0" id="sfktf">否</option>			
								</select>
								<em>*</em>
							</dd>
						</dl>
						<dl style="margin-bottom: 10px;">
							<dt>缴费周期:</dt>
							<dd>
								<select id="jiaofeizhouqi" style="width: 90px; height: 30px ">
									<option id="jfzq1" value="单月">单月</option>
									<option id="jfzq2" value="双月">双月</option>
									<option id="jfzq3" value="每月">每月</option>
									<option id="jfzq4" value="先买后用">先买后用</option>
								</select>
								<em>*</em>
							</dd>
						</dl>
						<dl>
							<dt>价格:</dt>
							<dd>
								<input value="" id="price" placeholder="价格" type="text" style="width:  90px; "/>
								<em>*</em>
							</dd>
						</dl>
						<dl style="width: 100%; margin-bottom: 10px;">
							<dt>阶梯计费:</dt>
							<dd>
								<select id="jietijifei" style="  width: 90px; height: 30px">
									<option id="jie1"  value="0">否</option>
									<option id="jie2" value="1">是</option>
								</select>
								<em>*</em>
							</dd>
						</dl>
						<dl>
							<dt>特殊分段:</dt>
							<dd><input value="" type="text" id="teshufenduan" placeholder="特殊分段" /></dd>
						</dl>
					</div>
					<table border="1"
						style="font-size: 12px; background-color: #fff; width: 40%; min-width: 500px; margin:10px 0px 0px -10px;">
							<tr>
								<td colspan="4">
									<div class="box-title" id="contract-object" style="">联系方式</div>
								</td>
							</tr>
					</table>
					<div style="margin: 15px 0; overflow: hidden;">
						<dl style="width:100%; margin-bottom: 10px;">
							<dt>公司:</dt>
							<dd style="width: 200px;">
								<input value="" class="form-control jianju" type="text" id="company" placeholder="公司" />
								<em>*</em>
							</dd>
						</dl>
						<dl style="width:100%; margin-bottom: 10px;">
							<dt>联系人:</dt>
							<dd style="width: 200px;">
								<input value="" type="text" id="lianxiren" placeholder="联系人"/>
							</dd>
						</dl>
						<dl style="width:100%; margin-bottom: 10px;">
							<dt>电话:</dt>
							<dd style="width: 200px;">
								<input value="" type="text" placeholder="电话" id="phone" onblur="chenkphone(phone);"/>
								<em>*</em>
							</dd>
						</dl>
					</div>
					<button class='btn btn-info' id="sdqtijiao"  onclick="sdqtijiao();" style='width: 100px;margin: 20px 200px 0px 126px ;' type='submit'>提交</button>
				</div>
				
				<!-- 物管交通div -->
				<div id="wuguanjiaotong" style="position:absolute;left:600px;top:146px; width: 520px; display:none; min-width: 480px;margin-top:4px; float: left;margin-left:-104px; border: 1px solid #eeeeee; padding:15px; min-height: 600px;">
					<table border="1"
						style="font-size: 12px; background-color: #fff; width: 40%; min-width: 500px; margin:10px 0px 0px -10px;">
							<tr>
								<td colspan="4">
									<div class="box-title" id="contract-object" style="">物管信息</div>
								</td>
							</tr>
					</table>
					<div style="margin: 15px 0; overflow: hidden;">
						<dl style="width:100%; margin-bottom: 10px;">
							<dt>物管名称:</dt>
							<dd style="width: 200px;"><input value="" placeholder="物管名称" type="text" id="wuguanname"/><em>*</em></dd>
						</dl>
						<dl style="width:100%; margin-bottom: 10px;">
							<dt>物管电话:</dt>
							<dd style="width: 200px;"><input  id="wuguanphone" value="" onblur="chenkwuyephone(wuguanphone);" type="text" placeholder="物管电话"/><em>*</em></dd>
						</dl>
						<dl style="width:100%; margin-bottom: 10px;">
							<dt>物管费用:</dt>
							<dd style="width: 200px;"><input value="" type="text" placeholder="物管费用" id="wuguanprice"/><em>*</em></dd>
						</dl>
						<dl style="width:100%; margin-bottom: 10px;">
							<dt>物业地址:</dt>
							<dd style="width: 200px;"><input value="" placeholder="物业地址" id="wuyedizhi" type="text" /><em>*</em></dd>
						</dl>
						<dl style="width:100%; margin-bottom: 10px;">
							<dt>物管公司:</dt>
							<dd style="width: 200px;"><input value="" type="text" id="wuguancompany" placeholder="物管公司" /></dd>
						</dl>
						<dl style="width:100%; margin-bottom: 10px;">
							<dt>物管地址:</dt>
							<dd style="width: 200px;"><input value="" type="text" id="wuguandizhi" placeholder="物管地址" /></dd>
						</dl>
					</div>
					<table border="1"
						style="font-size: 12px; background-color: #fff; width: 40%; min-width: 500px; margin:10px 0px 0px -10px;">
							<tr>
								<td colspan="4">
									<div class="box-title" id="contract-object" style="">交通</div>
								</td>
							</tr>
					</table>
					<div style="margin: 15px 0; overflow: hidden;">
						<dl style="margin-bottom: 10px;">
							<dt>区域:</dt>
							<dd><input value="" placeholder="区域" type="text" id="quyu" style=" width: 70px;"/><em>*</em></dd>
						</dl>
						<dl style="margin-bottom: 10px;">
							<dt>轨道:</dt>
							<dd><input value="" type="text" id="guidao" style="width: 70px;"/><em>*</em></dd>
						</dl>
						<dl style="margin-bottom: 10px;">
							<dt>商圈:</dt>
							<dd><input placeholder="商圈" value="" type="text" id="shangquan" style="width: 70px;"/><em>*</em></dd>
						</dl>
						<dl style="margin-bottom: 10px;">
							<dt>坐标:</dt>
							<dd style="width: 136px;"><input value="" placeholder="坐标" readonly="readonly" name="hi_latitude" type="text" required="" onclick="mapsszuobiao();" placeholder="点击获取房屋经纬度" id="biaozhu" style="width: 120px;"/><em>*</em></dd>
						</dl>
						<dl style="width:100%; margin-bottom: 10px;">
							<dt>公交:</dt>
							<dd style="width: 200px;"><input value="" type="text" id="gongjiao"/></dd>
						</dl>
					</div>
					<button class='btn btn-info' id="wuguanjiaotongtijiao" onclick="checkwgjt();" style='width: 100px; margin: 20px 200px 0px 126px ;' type='submit'>提交</button>
				</div>
				
				<!-- 基本配置div -->
				<div id="jibenpeizi"   style="position:absolute;left:600px;top:146px; display:none;width: 520px; min-width: 480px;margin-top:4px; float: left;margin-left:-104px; border: 1px solid #eeeeee; padding:15px; min-height: 600px;">
					<table border="1"
						style="font-size: 12px; background-color: #fff; width: 40%; min-width: 490px; margin:10px 0px 0px -10px;">
							<tr>
								<td colspan="4">
									<div class="box-title" id="contract-object" style="">基本信息</div>
								</td>
							</tr>
					</table>
					<div style="margin: 15px 0; overflow: hidden;">
						<dl style="width:100%; margin-bottom: 10px;">
							<dt>宽带配置:</dt>
							<dd style="width: 200px;"><input value="" placeholder="宽带配置" type="text" id="kuandai"/><em>*</em></dd>
						</dl>
						<dl style="width:100%; margin-bottom: 10px;">
							<dt>电梯配置:</dt>
							<dd style="width: 200px;"><input value="" placeholder="电梯配置" id="dianti" type="text" /><em>*</em></dd>
						</dl>
						<dl style="width:100%; margin-bottom: 10px;">
							<dt>总楼层:</dt>
							<dd style="width: 200px;"><input value="" type="text" id="zoulouceng" placeholder="总楼层" style="width: 70px;"/><em>*</em></dd>
						</dl>
						<dl style="width:100%; margin-bottom: 10px;">
							<dt>车库:</dt>
							<dd style="width: 200px;"><input value="" type="text" id="cheku" placeholder="车库" style="width: 70px;"/></dd>
						</dl>
						<dl style="width:100%; margin-bottom: 10px;">
							<dt>公共设施:</dt>
							<dd style="width: 200px;"><input value="" type="text" id="gonggongsheshi" placeholder="公共设施" /></dd>
						</dl>
						<dl style="width:100%; margin-bottom: 10px;">
							<dt>小区环境:</dt>
							<dd style="width: 200px;">
								<select id="xiaoquhuanjin" style="width: 100px; height: 30px">
									<option  value="2">优</option>
									<option  value="0">良</option>
									<option  value="1">差</option>
								</select>
							</dd>
						</dl>
					</div>
					<button class='btn btn-info' id="jbpztijiao" onclick="checkjbpztijiao();" style='width: 100px; margin: 20px 200px 0px 150px ;' type='submit'>提交</button>
				</div>
				<!-- 踩盘div -->
				<div id="caipan" style="position:absolute;left:600px;top:146px; display:none; width: 520px; min-width: 480px;margin-top:4px; float: left;margin-left:-104px; border: 1px solid #eeeeee; padding:15px; min-height: 600px;">
					<table border="1"
						style="font-size: 12px; background-color: #fff; width: 40%; min-width: 490px; margin:10px 0px 0px -10px;">
							<tr>
								<td colspan="4">
									<div class="box-title" id="contract-object" style="">踩盘</div>
								</td>
							</tr>
					</table>
					<div style="margin: 15px 0; overflow: hidden;">
						<dl style="width:100%; margin-bottom: 10px; height: auto; overflow: hidden;">
							<dt>小区周边:</dt>
							<dd style="width: 390px;" id="perimeter">
								<label class="common-borderbox">
								学校
								<input type="checkbox" name="hi_function" value="学校">
								</label>
								<button class="common-borderbox-add" name="hi_function" onclick="addLabel(this)">
									<i class="icon-plus"></i>
								</button>
								<em>*</em>
							</dd>
						</dl>
						<dl style="width:100%; margin-bottom: 10px;">
							<dt>开发商:</dt>
							<dd style="width: 200px;"><input value="" type="text" id="kaifashang" placeholder="请输入开发商" /></dd>
						</dl>
						<dl style="width:100%; margin-bottom: 10px;">
							<dt>管理方式:</dt>
							<dd style="width: 200px;"><input value="" type="text" id="guanlifangshi" placeholder="请输入管理方式"/></dd>
						</dl>
						<dl style="margin-bottom: 10px;">
							<dt>绿化率:</dt>
							<dd><input value="" placeholder="绿化率" id="lvhualv" type="text" style="width: 70px; "/></dd>
						</dl>
						<dl style="margin-bottom: 10px;">
							<dt>容积率:</dt>
							<dd><input value="" placeholder="容积率" id="rongjilv" type="text" style="width: 70px; "/></dd>
						</dl>
						<dl style="margin-bottom: 10px;">
							<dt>总套数:</dt>
							<dd><input value="" placeholder="总套数" id="zongtaoshu" type="text" style="width: 70px; "/></dd>
						</dl>
						<dl style="margin-bottom: 10px;">
							<dt>建筑面积:</dt>
							<dd><input value=""placeholder="建筑面积" id="jianzhumianji" type="text" style="width: 70px; "/></dd>
						</dl>
						<dl style="margin-bottom: 10px;">
							<dt>占地面积:</dt>
							<dd><input value="" id="zhandimianji" placeholder="占地面积" type="text" style="width: 70px; "/></dd>
						</dl>
						<dl style="margin-bottom: 10px;">
							<dt>开盘价:</dt>
							<dd><input value="" placeholder="开盘价" id="kaipanjia" type="text" style="width: 70px; "/></dd>
						</dl>
						<dl style="margin-bottom: 10px;">
							<dt>物业类别:</dt>
							<dd>
								<select id="wuyexingtai" style="width: 70px;height: 30px; ">
									<option value="住宅">住宅</option>
									<option value="商业">商业</option>
									<option value="商住">商住</option>
									<option value="其它">其它</option>
								</select>
							</dd>
						</dl>
						<dl style="margin-bottom: 10px;">
							<dt>物业形态:</dt>
							<dd>
								<select   id="wuyeleibie"  style="width:  70px; height: 30px;">
									<option value="高层">高层</option>
									<option value="洋房">洋房</option>
									<option value="别墅">别墅</option>
									<option value="公寓">公寓</option>
									<option value="小区">小区</option>
									<option value="门面">门面</option>
									<option value="办公">办公</option>
									<option value="厂房">厂房</option>
									<option value="其它">其它</option>
								</select>
							</dd>
						</dl>
						<dl style="margin-bottom: 10px;">
							<dt>开盘时间:</dt>
							<dd>
								<input value="" type="text" id="kaipandate" onclick="WdatePicker({startDate:'%y-%M-%d %h:%m:%s',dateFmt:'yyyy-MM-dd HH:mm:ss',alwaysUseStartDate:true})" readonly="readonly" data-validation-engine="validate[required]" placeholder="请输入开盘时间" style="margin-left: 6px; border: 0px; border-radius:0px;border-bottom: 1px gray solid;" />
							</dd>
						</dl>
					</div>
					<button class='btn btn-info' id="cptijiao" onclick="checkcaipantijiao();" style='width: 100px; margin: 20px 200px 0px 56px ;' type='submit'>提交</button>
				</div>
			</div>
			
			<!-- 继承选择物业弹出框 -->
		    <div id="win"  style="border: 1px solid #EFEFE3;height: 500px;" >  
		        <div class="titlediv" style="border: none" >请选择继承物业<span id="close" onclick="hide()">X</span></div>  
		        <div>
		        	<table >
		        		<tr align="center" class="trcss1" >
		        			<td class="tdcss" style="width: 195px;">编码</td>
		        			<td class="tdcss" style="width: 195px;">名称</td>
		        		</tr>
		        	</table>
		        </div>
		        	<div id="content" style="height: 420px;overflow-y: auto;" >
		        	<table  style="border: none;border-collapse:collapse;color: #666666;" >
		        	</table>
		        </div>  
		    </div> 
		    
		     
    	<!-- 查看界面 -->
    	<div id="chakan" style="display:none; width: 700px; position: absolute;top:150px;left:500px;height: 635px;">
   			
   			<div class="divt1" style="margin-top: 10px;" >
					<div class="divt2">
						基本配置
					</div>
					<div style="padding: 5px 15px;">
					<div class="tablecss" >
						<dl>
							<dt >宽带配置：</dt><dd id="ckkuandai" ></dd>
						</dl>
						<dl>
							<dt>电梯配置：</dt><dd id="ckdianti"></dd>
						</dl>
						<dl>
							<dt>车库：</dt><dd id="ckpark"></dd>
						</dl>
						<dl>
							<dt>公共设施：</dt><dd id="ckgonggongsheshi"></dd>
						</dl>
						<dl>
							<dt>小区环境：</dt><dd id="ckxiaoquhuanjin"></dd>
						</dl>
					</div>
				</div>
				</div>
				
   			<!-- 物管信息 -->
   			<div class="divt1" style="margin-top: 20px;">
   				<div class="divt2">
						物管信息
				</div>
				<div style="padding: 5px 15px;">
					<div class="tablecss">
						<dl style="width: 100%;">
							<dt>物业名称：</dt>
							<dd id="ckwuyename" style="width: 478px;"></dd>
						</dl>
						<dl style="width: 100%; height: auto; overflow: hidden;">
							<dt>物管公司：</dt>
							<dd id="ckwuguancompany" style="width: 478px; height: auto; overflow: hidden;"></dd>
						</dl>
						<dl>
							<dt>物管电话：</dt>
							<dd id="ckwuyguanphone"></dd>
						</dl>
						<dl>
							<dt>物管费用：</dt>
							<dd id="ckwuguanprice" ></dd>
						</dl>
						<dl style="width: 100%; height: auto; overflow: hidden;">
							<dt>物管地址：</dt>
							<dd id="ckwuguandizhi" style="width: 460px; height: auto; overflow: hidden;" ></dd>
						</dl>
						
					</div>
				</div>
   			</div>
   			<!-- 水 -->
   			<div  class="divt1" style="margin-top: 20px;">
   				<div class="divt2">
						水
				</div>
				<div style="padding: 5px 15px;">

					<div class="tablecss">
						<dl>
							<dt>缴费周期:</dt>
							<dd id="ckshuijfzq"></dd>
						</dl>
						<dl>
							<dt>价格:</dt>
							<dd >
								<span id="ckshuiprice"></span><span>元</span>
							</dd>
						</dl>
						<dl>
							<dt>特殊分段:</dt>
							<dd id="ckshuitsfd"></dd>
						</dl>
						<dl>
							<dt>阶梯计费:</dt>
							<dd id="ckshuijtjf"></dd>
						</dl>
						<dl>
							<dt>公司名称:</dt>
							<dd id="ckshuicompany"></dd>
						</dl>
						<dl>
							<dt>联系人:</dt>
							<dd id="ckshuilxr"></dd>
						</dl>
						<dl>
							<dt>电话:</dt>
							<dd id="ckshuiphone"></dd>
						</dl>
						<dl>
							<dt>备注:</dt>
							<dd id="ckshuirmark" align="left"></dd>
						</dl>
					</div>
				</div>
   			</div>
   			<!-- 电 -->
   			<div class="divt1" style="margin-top: 20px;">
   				<div class="divt2">
						电
				</div>
				<div style="padding: 5px 15px;">
					<div  class="tablecss">
							<dl>
								<dt>缴费周期:</dt>
								<dd style="width: 50px;" id="ckdianjfzq"></dd>
							</dl>
							<dl>
								<dt>价格:</dt>
								<dd style="width: 50px;" >
									<span id="ckdianprice"></span><span>元</span>
								</dd>
							</dl>
							<dl>
								<dt>特殊分段:</dt>
								<dd style="width: 50px;" id="ckdiantsfd"></dd>
							</dl>
							<dl>
								<dt>阶梯计费:</dt>
								<dd style="width: 50px;" id="ckdianjtjf"></dd>
							</dl>
							<dl>
								<dt>公司名称:</dt>
								<dd id="ckdiancompany"></dd>
							</dl>
							<dl>
								<dt>联系人:</dt>
								<dd id="ckdianlxr"></dd>
							</dl>
							<dl>
								<dt>电话:</dt>
								<dd id="ckdianphone"></dd>
							</dl>
							<dl>
								<dt>备注:</dt>
								<dd id="ckdianrmark"></dd>
							</dl>
					</div>
				</div>
   			</div>
   			<!-- 气 -->
   			<div class="divt1" style="margin-top: 20px;">
   				<div class="divt2">
						气
				</div>
				<div style="padding: 5px 15px;">
					<div  class="tablecss">
							<dl >
								<dt>缴费周期:</dt>
								<dd style="width: 50px;" id="ckqijfzq"></dd>
							</dl>
							<dl>
								<dt>价格:</dt>
								<dd style="width: 50px;">
									<span id="ckqiprice"></span><span>元</span>
								</dd>
							</dl>
							<dl>
								<dt>特殊分段:</dt>
								<dd style="width: 50px;" id="ckqitsfd"></dd>
							</dl>
							<dl>
								<dt>阶梯计费:</dt>
								<dd style="width: 50px;" id="ckqijtjf"></dd>
							</dl>
						<dl>
							<dt>公司名称:</dt>
							<dd id="ckqicompany"></dd>
						</dl>
						<dl>
							<dt>联系人:</dt>
							<dd id="ckqilxr"></dd>
						</dl>
						<dl>
							<dt>电话:</dt>
							<dd id="ckqiphone"></dd>
						</dl>
						<dl>
							<dt>备注:</dt>
							<dd id="ckqirmark"></dd>
						</dl>
					</div>
				</div>
   			</div>
   			<!-- 物业交通 -->
   			<div class="divt1" style="margin-top: 20px;margin-bottom: 20px;">
   				<div class="divt2">
						物业交通
				</div>
				<div style="padding: 5px 15px;">
					<div  class="tablecss">
						<dl>
							<dt>区域:</dt>
							<dd id="ckquyu"></dd>
						</dl>
						<dl>
							<dt>轨道:</dt>
							<dd id="ckguidao"> </dd>
						</dl>
						<dl>
							<dt>商圈:</dt>
							<dd id="ckshangquan"></dd>
						</dl>
						<dl style="width: 100%;">
							<dt >坐标:</dt>
							<dd id="ckzuobiao"></dd>
						</dl>
						<dl style="width: 100%;">
							<dt>公交:</dt>
							<dd id="ckgongjiao"></dd>
						</dl>
					</div>
				</div>
   			</div>
   			
   		</div>
    </body>
</html>