<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<!DOCTYPE>
<html>
<head>
  <title>房屋分配</title>
</head>
<link href="/resources/common/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href="/resources/css/user/userDistributionTrusteeship.css" rel="stylesheet" type="text/css" />
<link href="/resources/css/alert-min.css" rel="stylesheet" type="text/css" />
<link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">

<script src="/resources/js/jquery-1.7.2.min.js"></script>
<script src="/resources/js/common/common.js"></script>
<script src="/resources/js/common/optionModel.js"></script>
<script src="/resources/js/product/jquery-cookie.js"></script>
<script src="/resources/js/user/userDistributionTrusteeship.js"></script>
<script src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
<body>
<div class="content-center">
	<div class="house-left">
		<div class="house-left-title"><i class="title-icon"></i>当前房源</div>
		<table>
			<thead>
				<tr>
					<td style="width: 35px;"><label class="checkbox-min" onclick="allclick(this)"><input type="checkbox" class="input_check" name="check"/><span></span><i></i></label></td>
					<td>房屋地址</td>
					<td>合同编码</td>
					<td>托管期限</td>
					<td>价格</td>
					<td>管家</td>
					<%--<td>分配状态</td>--%>
				</tr>
			</thead>
			<tbody>
<!-- 				<tr onclick="ckeckClick(this)"> -->
<!-- 					<td><label class="checkbox-min"><input type="checkbox" class="input_check" name="check"/><span></span><i></i></label></td> -->
<!-- 					<td>万达广场1-10-17</td> -->
<!-- 					<td>623600014</td> -->
<!-- 					<td>2016-03-05~2017-03-04</td> -->
<!-- 					<td><font color="#E74C3C">1800</font></td> -->
<!-- 					<td><span class="success-icon">已分配</span></td> -->
<!-- 				</tr> -->
<!-- 				<tr onclick="ckeckClick(this)"> -->
<!-- 					<td><label class="checkbox-min"><input type="checkbox" class="input_check" name="check"/><span></span><i></i></label></td> -->
<!-- 					<td>万达广场1-10-17</td> -->
<!-- 					<td>623600014</td> -->
<!-- 					<td>2016-03-05~2017-03-04</td> -->
<!-- 					<td><font color="#E74C3C">1800</font></td> -->
<!-- 					<td></td> -->
<!-- 				</tr> -->
			</tbody>
		</table>
	</div>
	<div class="house-right">
		<div class="house-right-title"><i class="title-icon"></i>分配管家</div>
		<dl class="newDl">
			<dt>现管家</dt>
			<dd><input type="text" value="" id="newHousekeeper" readonly="readonly" onclick="editName()" name="newHousekeeper" ></dd>
		</dl>
		<input type="hidden" value="" id="em_idEdit" name="em_idEdit" />
		<button onclick="submit()">确定</button>
	</div>
</div>
</body>
</html>