<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
<meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1,user-scalable=no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="format-detection" content="telephone=no">
<meta name="format-detection" content="email=no">
<title>APP增值服务</title>
<link href="/resources/mui/mui.css" rel="stylesheet" type="text/css"><!-- 下拉刷新上拉更多样式 -->
<link href="/resources/css/appPage/contractAppreService.css" rel="stylesheet" type="text/css">
<link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

<script src="/resources/js/jquery-2.0.0.min.js"></script><!-- jQuery插件 -->
<script src="/resources/js/appPage/contractAppreService.js"></script>

</head>
<body>
<!--下拉刷新容器-->
<div id="appreService" class="">
<!-- 	<div class="service-title" style=""> -->
<!-- 		<div style="padding-top: 5vw;"> -->
<!-- 			<font style="font-weight:bold; text-align:center;">增值服务</font> -->
<!-- 		</div> -->
<!-- 	</div> -->
	<input type="hidden" value="" id="houseInfo-hi_code">
	<input type="hidden" value="" id="userCustomer-cc_name">
	<input type="hidden" value="" id="userCustomer-ccp_phone">
	<input type="hidden" value="" id="contractObject-ContractObject_No">
	<div style="position: relative; padding-top: 3vw;">
		<div class="house-list" onclick="checkIn(this);">
			<div class="houseImage">
				<i class="fa-check-square" style="margin-left: 16px;" onclick="changeColor(this);" aria-hidden="true"></i>
				<input type="checkbox" name="serviceType" value="小件搬家" style="display:none;">
			</div>
			<div class="houseTitle">小件搬家</div>
			<div class="houseInfo"><i class="fa-question-circle-o" style="color : rgb(210, 20, 20);" aria-hidden="true" onclick="showInfo(xiaojian);"></i></div>
		</div>
		<div style="display:none;" id="xiaojian" class="showInfo">
			<table width="441" height="232" border="1" class="table-qingxi">
			  <tbody>
			    <tr>
			      <td colspan="6"><div align="center"><font style="font-size:3vw;">小件搬家(参考报价)</font></div></td>
			    </tr>
			    <tr>
			      <td rowspan="2"><div align="center"><font style="font-size:3vw;">车型</font></div></td>
			      <td rowspan="2"><div align="center"><font style="font-size:3vw;">基础运费</font></div></td>
			      <td colspan="2"><p align="center"><font style="font-size:3vw;">基础运费+搬运费</font></p>
			      <p align="center"><font style="font-size:3vw;">(限电梯房客户)</font></p></td>
			      <td colspan="2"><div align="center"><font style="font-size:3vw;">公里数</font></div></td>
			    </tr>
			    <tr>
			      <td><p align="center"><font style="font-size:3vw;">1-5个</font></p>
			      <p align="center"><font style="font-size:3vw;">编织袋</font></p></td>
			      <td><p align="center"><font style="font-size:3vw;">6-10个</font></p>
			      <p align="center"><font style="font-size:3vw;">编织袋</font></p></td>
			      <td><div align="center"><font style="font-size:3vw;">基础公里数</font></div></td>
			      <td><div align="center"><font style="font-size:3vw;">超公里计数</font></div></td>
			    </tr>
			    <tr>
			      <td><div align="center"><font style="font-size:3vw;">小型面包车<br>(1吨)</font></div></td>
			      <td><div align="center"><font style="font-size:3vw;">48元</font></div></td>
			      <td><div align="center"><font style="font-size:3vw;">78元</font></div></td>
			      <td><div align="center"><font style="font-size:3vw;">98元</font></div></td>
			      <td rowspan="4"><div align="center"><font style="font-size:3vw;">5公里内</font></div></td>
			      <td><div align="center"><font style="font-size:3vw;">3元/公里</font></div></td>
			    </tr>
			    <tr>
			      <td><div align="center"><font style="font-size:3vw;">金杯车<br>(1.5吨)</font></div></td>
			      <td><div align="center"><font style="font-size:3vw;">76元</font></div></td>
			      <td><div align="center"><font style="font-size:3vw;">106元</font></div></td>
			      <td><div align="center"><font style="font-size:3vw;">126元</font></div></td>
			      <td><div align="center"><font style="font-size:3vw;">4元/公里</font></div></td>
			    </tr>
			    <tr>
			      <td><div align="center"><font style="font-size:3vw;">小型箱货<br>(1.5吨)</font></div></td>
			      <td><div align="center"><font style="font-size:3vw;">86元</font></div></td>
			      <td><div align="center"><font style="font-size:3vw;">116元</font></div></td>
			      <td><div align="center"><font style="font-size:3vw;">136元</font></div></td>
			      <td><div align="center"><font style="font-size:3vw;">4元/公里</font></div></td>
			    </tr>
			    <tr>
			      <td><div align="center"><font style="font-size:3vw;">箱货<br>(4吨)</font></div></td>
			      <td><div align="center"><font style="font-size:3vw;">126元</font></div></td>
			      <td><div align="center"><font style="font-size:3vw;">156元</font></div></td>
			      <td><div align="center"><font style="font-size:3vw;">176元</font></div></td>
			      <td><div align="center"><font style="font-size:3vw;">5元/公里</font></div></td>
			    </tr>
			    <tr>
			      <td colspan="6"><p align="left"><font style="font-size:3vw;">备注：客户须自行打包好，司机免费等候1小时，超过1小时每15分钟收取10元，不足15分钟按15分钟计。高速路、停车场、过路、过桥费按实际产生费用另外收取。<font style="font-size:3vw;"></p></td>
			    </tr>
			  </tbody>
			</table>
		</div>
		<div class="house-list" onclick="checkIn(this);">
			<div class="houseImage">
				<i class="fa-check-square" style="margin-left: 16px;" onclick="changeColor(this);" aria-hidden="true"></i>
				<input type="checkbox" name="serviceType" value="代办服务" style="display:none;">
			</div>
			<div class="houseTitle">代办服务</div>
			<div class="houseInfo"><i class="fa-question-circle-o" style="color : rgb(210, 20, 20);" aria-hidden="true" onclick="showInfo(daiban);"></i></div>
		</div>
		<div style="display:none;" id="daiban" class="showInfo"><font style="font-size:3vw;">
				&nbsp;&nbsp;费用说明：具体收费明细，根据所选中代办业务实际收费为准。
			</font>
		</div>
		<div class="house-list" onclick="checkIn(this);">
			<div class="houseImage">
				<i class="fa-check-square" style="margin-left: 16px;" onclick="changeColor(this);" aria-hidden="true"></i>
				<input type="checkbox" name="serviceType" value="保洁服务" style="display:none;">
			</div>
			<div class="houseTitle">保洁服务</div>
			<div class="houseInfo"><i class="fa-question-circle-o" style="color : rgb(210, 20, 20);" aria-hidden="true" onclick="showInfo(baojie);"></i></div>
		</div>
		<div style="display:none;" id="baojie" class="showInfo">
			<div align="center"><font style="font-size:4vw;">保洁服务(参考报价)</font></div>
			<table width="441" height="232" border="1" class="table-qingxi">
			  <tbody>
			    <tr>
			      <td colspan="5"><div align="center"><font style="font-size:3vw;">日常保洁</font><font style="font-size:3vw; color: rgb(210, 20, 20);">(扣保修费)</font></div></td>
			    </tr>
			    <tr>
			      <td><div align="center"><font style="font-size:3vw;">户型</font></div></td>
			      <td><div align="center"><font style="font-size:3vw;">单配或一室</font></div></td>
			      <td><div align="center"><font style="font-size:3vw;">两室</font></div></td>
			      <td><div align="center"><font style="font-size:3vw;">三室</font></div></td>
			      <td><div align="center"><font style="font-size:3vw;">四室</font></div></td>
			    </tr>
			    <tr>
			      <td><div align="center"><font style="font-size:3vw;">价格</font></div></td>
			      <td><div align="center"><font style="font-size:3vw;">60元/次</font></div></td>
			      <td><div align="center"><font style="font-size:3vw;">80元/次</font></div></td>
			      <td><div align="center"><font style="font-size:3vw;">100元/次</font></div></td>
			      <td><div align="center"><font style="font-size:3vw;">120元/次</font></div></td>
			    </tr>
			    <tr>
			      <td width="26%"><div align="center"><font style="font-size:3vw;" >清洁范围/标准</font></div></td>
			      <td colspan="4"><font style="font-size:3vw;">家具家电表面，抽屉及橱柜无明显灰尘，地面干净无灰尘无痕迹，灶具及抽油烟机无明显油烟污渍，卫生间洁具无明显污垢等。</font></td>
			    </tr>
			  </tbody>
			</table>
			<table width="441" height="232" border="1" class="table-qingxi" style="position: relative; margin-top: 2vw;">
			  <tbody>
			    <tr>
			      <td colspan="5"><div align="center"><font style="font-size:3vw;">单次保洁</font><font style="font-size:3vw; color: rgb(210, 20, 20);">(定制服务)</font></div></td>
			    </tr>
			    <tr>
			      <td><div align="center"><font style="font-size:3vw;">户型</font></div></td>
			      <td><div align="center"><font style="font-size:3vw;">单配或一室</font></div></td>
			      <td><div align="center"><font style="font-size:3vw;">两室</font></div></td>
			      <td><div align="center"><font style="font-size:3vw;">三室</font></div></td>
			      <td><div align="center"><font style="font-size:3vw;">四室</font></div></td>
			    </tr>
			    <tr>
			      <td><div align="center"><font style="font-size:3vw;">价格</font></div></td>
			      <td><div align="center"><font style="font-size:3vw;">80-100元/次</font></div></td>
			      <td><div align="center"><font style="font-size:3vw;">100-120元/次</font></div></td>
			      <td><div align="center"><font style="font-size:3vw;">130-160元/次</font></div></td>
			      <td><div align="center"><font style="font-size:3vw;">170-210元/次</font></div></td>
			    </tr>
			    <tr>
			      <td width="26%"><div align="center"><font style="font-size:3vw;" >清洁范围/标准</font></div></td>
			      <td colspan="4"><font style="font-size:3vw;">1、家具家电表面无明显灰尘，地面干净无灰尘无痕迹，灶具及抽油烟机无明显油烟污渍，卫生间洁具无明显污垢等。<br>2、日常清洁范围+玻璃窗内侧、门窗柜清洁。</font></td>
			    </tr>
			  </tbody>
			</table>
			<table width="441" height="232" border="1" class="table-qingxi" style="position: relative; margin-top: 2vw;">
			  <tbody>
			    <tr>
			      <td colspan="5"><div align="center"><font style="font-size:3vw;">包月保洁</font></div></td>
			    </tr>
			    <tr>
			      <td><div align="center"><font style="font-size:3vw;">户型</font></div></td>
			      <td><div align="center"><font style="font-size:3vw;">单配或一室</font></div></td>
			      <td><div align="center"><font style="font-size:3vw;">两室</font></div></td>
			      <td><div align="center"><font style="font-size:3vw;">三室</font></div></td>
			      <td><div align="center"><font style="font-size:3vw;">四室</font></div></td>
			    </tr>
			    <tr>
			      <td><div align="center"><font style="font-size:3vw;">价格</font></div></td>
			      <td><div align="center"><font style="font-size:3vw;">240元/月</font></div></td>
			      <td><div align="center"><font style="font-size:3vw;">320元/月</font></div></td>
			      <td><div align="center"><font style="font-size:3vw;">400元/月</font></div></td>
			      <td><div align="center"><font style="font-size:3vw;">480元/月</font></div></td>
			    </tr>
			    <tr>
			      <td width="26%"><div align="center"><font style="font-size:3vw;" >清洁范围/标准</font></div></td>
			      <td colspan="4"><font style="font-size:3vw;">日常清洁3次+1次大清洁(含玻璃窗内侧清洁)。</font></td>
			    </tr>
			  </tbody>
			</table>
			<div><font style="font-size:2vw;">&nbsp;特别提示：联系定制3个月清洁服务的，从第四个月开始享受优质客户9折优惠。</font></div>
		</div>
		<div class="house-list" onclick="checkIn(this);">
			<div class="houseImage">
				<i class="fa-check-square" style="margin-left: 16px;" onclick="changeColor(this);" aria-hidden="true"></i>
				<input type="checkbox" name="serviceType" value="清洗服务" style="display:none;">
			</div>
			<div class="houseTitle">清洗服务</div>
			<div class="houseInfo"><i class="fa-question-circle-o" style="color : rgb(210, 20, 20);" aria-hidden="true" onclick="showInfo(qingxi);"></i></div>
		</div>
		<div style="display:none;" id="qingxi" class="showInfo">
			<table width="346" height="129" border="1" class="table-qingxi">
			  <tbody>
			    <tr>
			      <td colspan="5" align="center"><font style="font-size:11px;">清洗价格(参考价格)</font></td>
			    </tr>
			    <tr>
			      <td align="center"><font style="font-size:3vw;">类型</font></td>
			      <td align="center"><font style="font-size:3vw;">品牌</font></td>
			      <td align="center"><font style="font-size:3vw;">价格</font></td>
			      <td colspan="2" rowspan="2" align="center"><font style="font-size:3vw;">可以和&quot;包月&quot;共享优惠</font></td>
			    </tr>
			    <tr>
			      <td align="center"><font style="font-size:3vw;">抽油烟机清洗</font></td>
			      <td align="center"><font style="font-size:3vw;">中式、欧式</font></td>
			      <td align="center"><font style="font-size:3vw;">150元/台</font></td>
			    </tr>
			  </tbody>
			</table>
		</div>
	</div>
	<div class="bottom_footer">
		<div class="house-list">
			<div class="houseImage">
				<i class="fa-check-square" style="margin-left: 16px;" onclick="checkAll(this);" aria-hidden="true" id="allI"></i>
			</div>
			<div class="houseTitle">已选择&nbsp;<font id="checkCount" style="color:#ff0000;" >0</font>&nbsp;项</div>
			<div class="houseSubmit" onclick="submitAppreService();"><font style="color:#ddd">确认提交</div>
		</div>
	</div>
</div>
</body>
</html>