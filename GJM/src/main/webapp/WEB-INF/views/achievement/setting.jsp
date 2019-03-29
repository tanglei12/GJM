<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<!DOCTYPE>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>业绩设置</title>
<link href="/resources/css/achievement/setting.css" rel="stylesheet" type="text/css" />
<link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"><!-- 字体样式 -->
<link href="/resources/common/datepicker/jquery-ui.css" rel="stylesheet" type="text/css"><!-- 日期插件 -->
</head>
<script type="text/javascript" src="/resources/js/jquery-1.7.2.min.js"></script>
<script src="/resources/js/common/common.js"></script>
<script type="text/javascript" src="/resources/js/achievement/setting.js"></script>
<script src="/resources/common/datepicker/js/jquery-ui-datepicker.js"></script><!-- 日期插件 -->
<body>
<div class="centers">
	<div class="title">业绩设置
		<div class="timeSetting"><input type="text" id="dataTime" readonly="readonly" />
			<div class="timeTable">
			
			</div>
		</div>
	</div>
    <div class="content">
    	<dl class="settingDl">
        	<dt>免租期</dt>
            <dd>
            	<div class="selectCheckDiv">
	            	<div class="checkDiv" onclick="checked(this)"><div class="checkbox checkbox-success"><input name="chickes" type="checkbox" checked="checked" /><label for="chickes" id="ckLabel"></label></div><span>是</span></div>
	            	<div class="checkDiv" onclick="checked(this)"><div class="checkbox checkbox-success"><input name="chickes" type="checkbox" /><label for="chickes" id="ckLabel"></label></div><span>否</span></div>
            	</div>
            </dd>
        </dl>
        <dl class="settingDl">
        	<dt>差价</dt>
            <dd>
            	<div class="selectCheckDiv">
	            	<div class="checkDiv" onclick="checked(this)"><div class="checkbox checkbox-success"><input name="chickes" type="checkbox" checked="checked" /><label for="chickes" id="ckLabel"></label></div><span>是</span></div>
	            	<div class="checkDiv" onclick="checked(this)"><div class="checkbox checkbox-success"><input name="chickes" type="checkbox" /><label for="chickes" id="ckLabel"></label></div><span>否</span></div>
            	</div>
            </dd>
        </dl>
        <dl class="settingDl">
        	<dt>转租费</dt>
            <dd>
            	<div class="selectCheckDiv">
	            	<div class="checkDiv" onclick="checked(this)"><div class="checkbox checkbox-success"><input name="chickes" type="checkbox" checked="checked" /><label for="chickes" id="ckLabel"></label></div><span>是</span></div>
	            	<div class="checkDiv" onclick="checked(this)"><div class="checkbox checkbox-success"><input name="chickes" type="checkbox" /><label for="chickes" id="ckLabel"></label></div><span>否</span></div>
            	</div>
            </dd>
        </dl>
        <dl class="settingDl">
        	<dt>物品购置</dt>
            <dd>
            	<div class="selectCheckDiv">
	            	<div class="checkDiv" onclick="checked(this)"><div class="checkbox checkbox-success"><input name="chickes" type="checkbox" checked="checked" /><label for="chickes" id="ckLabel"></label></div><span>是</span></div>
	            	<div class="checkDiv" onclick="checked(this)"><div class="checkbox checkbox-success"><input name="chickes" type="checkbox" /><label for="chickes" id="ckLabel"></label></div><span>否</span></div>
            	</div>
            </dd>
        </dl>
    	<dl class="settingDl">
        	<dt>管理费</dt>
            <dd>
            	<div class="selectCheckDiv">
	            	<div class="checkDiv" onclick="checked(this)"><div class="checkbox checkbox-success"><input name="chickes" type="checkbox" checked="checked" /><label for="chickes" id="ckLabel"></label></div><span>是</span></div>
	            	<div class="checkDiv" onclick="checked(this)"><div class="checkbox checkbox-success"><input name="chickes" type="checkbox" /><label for="chickes" id="ckLabel"></label></div><span>否</span></div>
            	</div>
            	<div class="settingDiv">
            		<dl>
            			<dt>提成比例</dt>
            			<dd><input type="text" value="100" maxlength="3" onkeyup="scaleNum(this)" /> %</dd>
            		</dl>
            	</div>
            </dd>
        </dl>
        <dl class="settingDl">
        	<dt>包修费</dt>
            <dd>
            	<div class="selectCheckDiv">
	            	<div class="checkDiv" onclick="checked(this)"><div class="checkbox checkbox-success"><input name="chickes" type="checkbox" checked="checked" /><label for="chickes" id="ckLabel"></label></div><span>是</span></div>
	            	<div class="checkDiv" onclick="checked(this)"><div class="checkbox checkbox-success"><input name="chickes" type="checkbox" /><label for="chickes" id="ckLabel"></label></div><span>否</span></div>
            	</div>
            	<div class="settingDiv">
            		<dl>
            			<dt>出房</dt>
            			<dd><input type="text" value="400" class="houseOut" /> 元</dd>
            		</dl>
            		<dl>
            			<dt>存房</dt>
            			<dd><input type="text" value="200" class="houseSave" /> 元</dd>
            		</dl>
            	</div>
            </dd>
        </dl>
        <dl class="settingDl">
        	<dt>定金</dt>
            <dd>
            	<div class="selectCheckDiv">
	            	<div class="checkDiv" onclick="checked(this)"><div class="checkbox checkbox-success"><input name="chickes" type="checkbox" checked="checked" /><label for="chickes" id="ckLabel"></label></div><span>是</span></div>
	            	<div class="checkDiv" onclick="checked(this)"><div class="checkbox checkbox-success"><input name="chickes" type="checkbox" /><label for="chickes" id="ckLabel"></label></div><span>否</span></div>
            	</div>
            	<div class="settingDiv">
            		<dl>
            			<dt>提成比例</dt>
            			<dd><input type="text" value="100" onkeyup="scaleNum(this)" /> %</dd>
            		</dl>
            	</div>
            </dd>
        </dl>
        <dl class="settingDl">
        	<dt>出房补贴</dt>
            <dd>
            	<div class="selectCheckDiv">
	            	<div class="checkDiv" onclick="checked(this)"><div class="checkbox checkbox-success"><input name="chickes" type="checkbox" checked="checked" /><label for="chickes" id="ckLabel"></label></div><span>是</span></div>
	            	<div class="checkDiv" onclick="checked(this)"><div class="checkbox checkbox-success"><input name="chickes" type="checkbox" /><label for="chickes" id="ckLabel"></label></div><span>否</span></div>
            	</div>
            	<div class="settingDiv">
            		<i class="fa fa-plus-square" onclick="addSubsidy(this)"></i>
            		<div class="houseAdd">
	            		<dl style="width: 100%;">
	            			<dt><select><option value="新出房">新出房</option><option value="转租房" selected="selected">转租房</option><option value="到期房">到期房</option><option value="退租房">退租房</option><option value="强收房">强收房</option></select></dt>
	            			<dd>不满半月租金,按前份合同租金的 <input type="text" value="50"  onkeyup="scaleNum(this)" /> % <i class="fa fa-minus-square" onclick="removeHouseB(this)"></i></dd>
	            		</dl>
            		</div>
            	</div>
            </dd>
        </dl>
        <dl class="settingDl">
        	<dt>资金成本</dt>
            <dd>
            	<div class="selectCheckDiv">
	            	<div class="checkDiv" onclick="checked(this)"><div class="checkbox checkbox-success"><input name="chickes" type="checkbox" /><label for="chickes" id="ckLabel"></label></div><span>是</span></div>
	            	<div class="checkDiv" onclick="checked(this)"><div class="checkbox checkbox-success"><input name="chickes" type="checkbox" checked="checked" /><label for="chickes" id="ckLabel"></label></div><span>否</span></div>
            	</div>
            	<!-- <div class="settingDiv">
            		<dl>
            			<dt>成本比例</dt>
            			<dd><input type="text" value="100" /> %</dd>
            		</dl>
            	</div> -->
            </dd>
        </dl>
        <dl style="border-bottom:1px solid #1ABC9C; margin-bottom:0;">
      		<a class="settingMoney" id="settingMoney" href="javascript:;">设置业绩</a>
            	<div class="setting" style="display: none;">
            	<input type="text" class="FileText" id="sumMoney" placeholder="总业绩"  />
                <input type="text" class="FileText" id="sumCompany" placeholder="单位" style="width:50px;" value="元"  />
                <input type="text" class="FileText" id="newMoney" placeholder="新业绩"  />
                <input type="text" class="FileText" id="newCompany" placeholder="单位" style="width:50px;" value="元"  />
                <input type="text" class="FileText" id="startTime" placeholder="开始时间" style="margin-left:20px;"  />
                <input type="text" class="FileText" id="endTime" placeholder="结束时间"  />
                <a href="javascript:moneySetting();" class="settingButton">确定</a>
            </div>
            <a class="settingMoney" style="float: right;" href="javascript:;" onclick="updateMoneySetting()">修改</a>
        </dl>
        <div class="MoneyData">
        	<table border="0" cellspacing="0" cellpadding="0">
            	<thead>
                	<tr>
                		<td>部门</td>
                    	<td>总业绩</td>
                        <td>新业绩</td>
                        <td>续约业绩</td>
                        <td>开始时间</td>
                        <td>结束时间</td>
                    </tr>
                </thead>
                <tbody>
                	<%-- <tr>
                    	<td><input class="tableInput" type="text" value="390000" /><span style="margin-left:3px;">元</span></td>
                        <td><input class="tableInput" type="text" value="200000" /><span style="margin-left:3px;">元</span></td>
                        <td><input class="tableInput" type="text" value="190000" /><span style="margin-left:3px;">元</span></td>
                        <td><input class="tableInput" type="text" value="2016-05-01" /></td>
                        <td><input class="tableInput" type="text" value="2016-06-01" /></td>
                        <td>公司</td>
                        <td style="display:none;">1</td>
                        <td style="display:none;">1</td>
                        <td><i class="icon-remove-sign" style="font-size: 19px; color:#E74C3C" onclick="closeTR(this)"></i></td>
                    </tr> --%>
                </tbody>
            </table>
            <div id="ca_id" style="display: none;"></div>
        </div>
        <div class="errorMessage">
        	公司目标总业绩  - 部门总业绩  ：<span class="errorFont">0元</span>，公司目标新业绩  - 部门新业绩  ：<span class="errorNewFont">0元</span>
        </div>
        <a id="submitButton" href="javascript:;" onclick="submit()">确定</a>
    </div>
</div>
<div id="dataContent" style="display: none;"></div>
<div id="as_id" style="display: none"></div>
</body>
</html>