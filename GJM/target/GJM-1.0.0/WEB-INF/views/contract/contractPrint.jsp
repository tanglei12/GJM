<%@ page language="java" pageEncoding="utf-8"%>
<%
	response.setHeader("Pragma", "No-cache");
	response.setHeader("Cache-Control", "no-cache");
	response.setDateHeader("Expires", -10);
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="Expires" CONTENT="0">
<meta http-equiv="Cache-Control" CONTENT="no-cache">
<meta http-equiv="Pragma" CONTENT="no-cache">
<title>发票打印</title>
<script src="/resources/print/LodopFuncs.js"></script>
</head>
<body>
<a href="javascript:PrintMytable();">开始打印</a>
<div id="content">
	<table style="border-collapse: collapse; width: 730px; height:400px;  position: relative;">
		<thead style="font-size: 14px;">
			<tr>
				<td colspan="2"></td>
				<td colspan="4" style=" height: 25px; font-size: 20px; line-height: 25px;text-align: center; color: #E74C3C;">重庆管家婆房屋托管中心专用收据</td>
				<td><input style="width: 50px; border:none;"  value="" readonly="readonly" /></td>
				<td><input style="width: 50px; border:none;" value=""  readonly="readonly"/></td>
			</tr>
			<tr>
				<td colspan="2"></td>
				<td colspan="4" style="height:4px; text-align: center; color: #E74C3C; border-bottom: 1px solid #666; border-top: 1px solid #666;"></td>
				<td></td>
				<td></td>
			</tr>
			<tr>
				<td colspan="2"></td>
				<td colspan="4" style=" height: 25px; font-size: 20px; line-height: 25px; text-align: center; color: #E74C3C;">付款凭证</td>
				<td colspan="2" style="text-align: left; height: 25px; line-height: 25px;">NO.<font style="color: #E74C3C; font-size: 15px;">2011477705589992318</font></td>
			</tr>
			<tr>
				<td colspan="2" style=" width:180px; height: 28px; line-height: 28px; font-size: 15px;">客户名称：张三三</td>
				<td colspan="4" style=" width:470px; height: 28px; line-height: 28px; font-size: 15px; text-indent: 50px">房号：融侨彩虹道26-2</td>
				<td colspan="2" style=" width:160px; height: 28px; line-height: 28px; font-size: 15px; text-align: left;">日期：2016年11月29日</td>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td colspan="2" style="border: 1px solid #000; height: 28px; line-height: 28px; text-align: center; font-size: 15px;">款项类型</td>
				<td colspan="5" style=" border: 1px solid #000; height: 28px; line-height: 28px; text-align: center; font-size: 15px;">款项说明</td>
				<td style=" border: 1px solid #000; height: 28px; line-height: 28px; text-align: center; font-size: 15px;">金额</td>
			</tr>
			<tr>
				<td colspan="2" style="border: 1px solid #000; height: 22px; line-height: 22px; text-align: center; font-size: 15px;">租金</td>
				<td colspan="5" style="border: 1px solid #000; height: 22px; line-height: 22px; text-align: center; font-size: 15px; text-align: left; text-indent: 10px;">第一季度租金(11月-2日),超额收取滞纳金200元</td>
				<td style="border: 1px solid #000; height: 22px; line-height: 22px; text-align: center; font-size: 15px;">5100</td>
			</tr>
			<tr>
				<td colspan="2" style="border: 1px solid #000; height: 22px; line-height: 22px; text-align: center; font-size: 15px;">维修费</td>
				<td colspan="5" style="border: 1px solid #000; height: 22px; line-height: 22px; text-align: center; font-size: 15px; text-align: left; text-indent: 10px;">家电维修费用</td>
				<td style="border: 1px solid #000; height: 22px; line-height: 22px; text-align: center; font-size: 15px;">0</td>
			</tr>
			<tr>
				<td colspan="2" style="border: 1px solid #000; height: 22px; line-height: 22px; text-align: center; font-size: 15px;">水费</td>
				<td colspan="5" style="border: 1px solid #000; height: 22px; line-height: 22px; text-align: center; font-size: 15px; text-align: left; text-indent: 10px;">代缴11月水费</td>
				<td style="border: 1px solid #000; height: 22px; line-height: 22px; text-align: center; font-size: 15px;">0</td>
			</tr>
			<tr>
				<td colspan="2"  style="border: 1px solid #000; height: 22px; line-height: 22px; text-align: center; font-size: 15px;">其他</td>
				<td colspan="5"  style="border: 1px solid #000; height: 22px; line-height: 22px; text-align: center; font-size: 15px; text-align: left; text-indent: 10px;"></td>
				<td  style="border: 1px solid #000; height: 22px; line-height: 22px; text-align: center; font-size: 15px;">0</td>
			</tr>
			<tr>
				<td colspan="2" style="border: 1px solid #000; height: 22px; line-height: 22px;">&nbsp;</td>
				<td colspan="5" style="border: 1px solid #000; height: 22px; line-height: 22px;">&nbsp;</td>
				<td style="border: 1px solid #000; height: 22px; line-height: 22px;">&nbsp;</td>
			</tr>
			<tr>
				<td colspan="7" style="border: 1px solid #000; height: 28px; line-height: 28px; text-align: center; font-size: 15px; text-align: left; text-indent: 10px;">人民币(大写)：伍仟元整</td>
				<td style="border: 1px solid #000; height: 28px; line-height: 28px; text-align: center; font-size: 15px;">￥5700</td>
			</tr>
			<tr>
				<td colspan="8" style="border: 1px solid #000; height: 28px; line-height: 28px; text-align: center; font-size: 15px; text-align: left; text-indent: 10px;">注:机打收据，手写无效，盖章后生效</td>
			</tr>
		</tbody>
		<tfoot style="font-size: 14px;">
			<tr style=" height: 35px;">
				<td colspan="8">
				经办人：<input type="text" style="width: 114px; border: none;" readonly="readonly"  />
				主管审核：<input type="text" style="width: 114px; border: none;" readonly="readonly"  />
				财务复核：<input type="text" style="width: 114px; border: none;" readonly="readonly"  />
				客户：<input type="text" style="width: 114px; border: none;" readonly="readonly"  />
				</td>
			</tr>
		</tfoot>
	</table>
</div>
<script language="javascript" type="text/javascript"> 
var LODOP; //声明为全局变量
function PrintMytable(){
	LODOP=getLodop();  
	LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_打印表格");
	LODOP.ADD_PRINT_TABLE(30,17,"99.8%",600,document.getElementById("content").innerHTML);
	LODOP.PREVIEW();
// 	LODOP.PRINT();
};
</script> 
</body>
</html>