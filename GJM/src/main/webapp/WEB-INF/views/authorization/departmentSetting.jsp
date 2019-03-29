<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%
	response.setHeader("Pragma","No-cache");
	response.setHeader("Cache-Control","no-cache");
	response.setDateHeader("Expires", -10);
%>
<!doctype html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="Expires" CONTENT="0">
<meta http-equiv="Cache-Control" CONTENT="no-cache">
<meta http-equiv="Pragma" CONTENT="no-cache">
<title>部门设置</title>
<link href="/resources/common/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href="/resources/css/authorization/departmentSetting.css" rel="stylesheet" type="text/css" />
<link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">
<link href="/resources/css/tree-min.css" rel="stylesheet" type="text/css" /><!-- 树形样式 -->
<link href="/resources/css/alert-min.css" rel="stylesheet" type="text/css" />
<link href="/resources/css/table-min.css" rel="stylesheet" type="text/css" /><!-- 表格样式 -->
</head>
<script src="/resources/js/jquery-1.7.2.min.js"></script>
<script src="/resources/js/jquery.cookie.js"></script>
<script src="/resources/js/common/common.js"></script>
<script src="/resources/js/table-min.js"></script><!-- 表格公共js -->
<script src="/resources/js/common/common.js"></script>
<script src="/resources/common/My97DatePicker/WdatePicker.js"></script><!-- 时间插件 -->
<script src="/resources/js/tree-min.js"></script>
<script src="/resources/js/autoTextarea.js"></script>
<script src="/resources/js/authorization/departmentSetting.js"></script>
<script src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
<script src="/resources/js/product/jquery-cookie.js"></script>
<script src="/resources/js/common/image-upload2.js"></script>
<script src="/resources/js/common/optionModel.js"></script>
<body>
	<div class="center">
		<div class="title">
			<i class="fa fa-group"></i>
			<label class="title-font"></label>
			<label class="title-icon success">启用</label>
		</div>
		<div class="menu">
			<ul>
				<li class="clicks" data-list="content1" onclick="titleClick(this)">部门信息<i class="bottom-triangle" style="display: block;"></i></li>
				<li data-list="content2" onclick="titleClick(this)">下级组织<i class="bottom-triangle"></i></li>
				<li data-list="content3" onclick="titleClick(this)">职位<i class="bottom-triangle"></i></li>
				<li data-list="content4" onclick="titleClick(this)">部门人员<i class="bottom-triangle"></i></li>
			</ul>
		</div>
		<!-- 部门信息 -->
		<div class="content" id="content1" style="padding-bottom: 30px;">
			<div class="content-operation">
				<button onclick="departmentEdit(this)">编辑</button>
				<button onclick="qiutDepartments(0)">停用</button>
				<button onclick="qiutDepartments(1)">启用</button>
				<button onclick="setCompanyPowers()">设置权限</button>
			</div>
			<div class="content-message">
				<dl>
					<dt>全称：</dt>
					<dd><input type="text" class="fullName" value="" readonly="readonly" /></dd>
				</dl>
				<dl>
					<dt>简称：</dt>
					<dd><input type="text" class="abbreviation" value="" readonly="readonly" /></dd>
				</dl>
				<dl>
					<dt>上级组织：</dt>
					<dd><input type="text" class="topOrganization" value="" readonly="readonly" /></dd>
				</dl>
				<dl>
					<dt>组织负责人：</dt>
					<dd><input type="text" class="organizationName" value="" readonly="readonly" /></dd>
				</dl>
				<dl>
					<dt>负责人电话：</dt>
					<dd><input type="text" class="organizationPhone" value="" readonly="readonly" /></dd>
				</dl>
				<dl>
					<dt>成立时间：</dt>
					<dd><input type="text" class="dateTime" value="" readonly="readonly" /></dd>
				</dl>
				<dl>
					<dt>区域：</dt>
					<dd><input type="text" class="region" value="" /></dd>
				</dl>
				<dl>
					<dt>地址：</dt>
					<dd><input type="text" class="address" value="" /></dd>
				</dl>
				<dl style="height: auto; overflow: hidden;">
					<dt>备注：</dt>
					<dd style="height: auto; overflow: hidden; line-height: 12px;">
						<textarea class="remarks" rows="" cols=""  readonly="readonly"></textarea>
					</dd>
				</dl>
				<input type="hidden" value="" class="em_id" />
				<input type="hidden" value="" class="ucc_pid" />
				<button style="margin-left: 140px; margin-top: 20px; display: none;" onclick="updateDepartment()">确定</button>
				<button style="margin-left: 140px; margin-top: 20px; display: none;" onclick="departmentClose()">取消</button>
			</div>
		</div>
		<!-- 下级组织 -->
		<div class="content" id="content2" style="height: auto; overflow:hidden; display: none;">
			<div class="tree-center" style="margin-left: 15px; display: table-cell;" data-click="true">
				<ul class="tree-center-ul">
					<li>
						<span class=""></span>
						<span class="tree-icon" onclick="iconDown(this)"><i class="fa fa-minus"></i></span>
						<label class="checkbox-a" ondblclick="downChecked(this)"><input type="checkbox" class="input_check" name="powerId"/><span></span><i>设计部</i></label>
						<ul>
							<li>
								<span class="left-solid"><span class="vertical-solid"></span><span class="line-solid"></span></span>
								<span class="tree-icon"><i class="fa fa-plus"></i></span>
								<label class="checkbox-a"><input type="checkbox" class="input_check" name="powerId"/><span></span><i>设计部</i></label>
							</li>
							<li>
								<span class="bottom-solid"><span class="vertical-solid"></span><span class="line-solid"></span></span>
								<span class="tree-icon"><i class="fa fa-plus"></i></span>
								<label class="checkbox-a"><input type="checkbox" class="input_check" name="powerId"/><span></span><i>java开发部</i></label>
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<div class="content-operation" style="display: table-cell; width: 1%; border-bottom: 1px solid #1ABC9C; height: 36px;">
				<button onclick="addDepartmentPage(this)">添加下级</button>
				<button onclick="updateDepartmentPage(this)">修改部门</button>
				<button onclick="qiutDepartment(0)">停用</button>
				<button onclick="qiutDepartment(1)">启用</button>
				<button onclick="setChildCompanyPowers()">设置权限</button>
			</div>
			<div class="content-message-edit" id="departmentEdit" style="display: none;">
				<dl>
					<dt>全称：</dt>
					<dd><input type="text" value="" id="fullNameEdit" /></dd>
				</dl>
				<dl>
					<dt>简称：</dt>
					<dd><input type="text" value="" id="abbreviationEdit" /></dd>
				</dl>
				<dl>
					<dt>上级组织：</dt>
					<dd><input type="text" value="" id="topOrganizationEdit" readonly="readonly" name="topOrganizationEdit" onclick="editDepartment()" /></dd>
				</dl>
				<dl>
					<dt>组织负责人：</dt>
					<dd><input type="text" value="" id="organizationNameEdit" readonly="readonly" onclick="editName()"  name="organizationNameEdit" /></dd>
				</dl>
				<dl>
					<dt>负责人电话：</dt>
					<dd><input type="text" value="" id="organizationPhoneEdit"  name="organizationPhoneEdit" readonly="readonly" /></dd>
				</dl>
				<dl>
					<dt>成立时间：</dt>
					<dd><input type="text" value="" id="dateTimeEdit" /></dd>
				</dl>
				<dl>
					<dt>区域：</dt>
					<dd><input type="text" class="region" value="" /></dd>
				</dl>
				<dl>
					<dt>地址：</dt>
					<dd><input type="text" class="address" value="" /></dd>
				</dl>
				<dl style="height: auto; overflow: hidden;">
					<dt>备注：</dt>
					<dd style="height: auto; overflow: hidden;">
						<textarea class="remarksEdit" rows="" cols="" id="remarksEdit" >内部系统开发，手机APP，官网</textarea>
					</dd>
				</dl>
				<input type="hidden" value="" id="em_idEdit" name="em_idEdit" />
				<input type="hidden" value="" id="ucc_idEdit"  />
				<input type="hidden" value="" id="ucc_pidEdit" name="ucc_pidEdit"  />
				<button style="margin-left: 120px; display:none;" class="addDepartment" onclick="addDepartment()">添加</button>
				<button style="margin-left: 120px;" class="updateDepartment" onclick="updateDepartment()">修改</button>
			</div>
		</div>
		<!-- 职位 -->
		<div class="content" id="content3" style="height: 530px; display: none;">
			<div class="tree-center" style="margin-left: 15px; display: table-cell;" data-click="true">
				<ul class="tree-center-ul">
					<li>
						<span class=""></span>
						<span class="tree-icon" onclick="iconDown(this)"><i class="fa fa-minus"></i></span>
						<label class="checkbox-a" ondblclick="downChecked(this)"><input type="checkbox" class="input_check" name="powerId"/><span></span><i>IT主管</i></label>
						<ul>
							<li>
								<span class="left-solid"><span class="vertical-solid"></span><span class="line-solid"></span></span>
<!-- 								<span class="tree-icon"><i class="fa fa-plus"></i></span> -->
								<label class="checkbox-a"><input type="checkbox" class="input_check" name="powerId"/><span></span><i>java工程师</i></label>
							</li>
							<li>
								<span class="bottom-solid"><span class="vertical-solid"></span><span class="line-solid"></span></span>
<!-- 								<span class="tree-icon"><i class="fa fa-plus"></i></span> -->
								<label class="checkbox-a"><input type="checkbox" class="input_check" name="powerId"/><span></span><i>前端设计师</i></label>
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<div class="content-operation" style="display: table-cell; width: 1%; border-bottom: 1px solid #1ABC9C; height: 36px;">
				<button onclick="outPerson()">人员导入</button>
				<button onclick="addSelectPosition()">添加职位</button>
				<button onclick="selectPosition()">修改职位</button>
				<button onclick="setPositionPowers()">设置权限</button>
			</div>
			<div class="personImport" style="display: none;">
				<div class="personImport-left">
					<div class="personImport-left-top">java工程师(人员)</div>
					<ul style="overflow: Hidden; overflow-y: scroll; height: 401px;">
					
					</ul>
				</div>
				<i class="fa fa-arrow-circle-left"></i>
				<div class="personImport-right">
					<div>
						<input type="text" class="personSearch" placeholder="员工姓名/联系电话" onkeyup="userData()" />
						<i class="fa fa-search"></i>
					</div>
					<div class="personImport-user-content">
						<ul>
							
						</ul>
					</div>
				</div>
			</div>
			<div class="content-message-edit" id="positionEdit" style="display: none;">
				<dl>
					<dt>职位名称：</dt>
					<dd><input type="text" value="" id="positionNameEdit" /></dd>
				</dl>
				<dl>
					<dt>上级组织：</dt>
					<dd><input type="text" value="" id="topPositionEdit" readonly="readonly" /></dd>
				</dl>
				<dl style="height: auto; overflow: hidden;">
					<dt>备注：</dt>
					<dd style="height: auto; overflow: hidden;">
						<textarea class="remarksEdit" rows="" cols="" id="positionRemarksEdit" ></textarea>
					</dd>
				</dl>
				<input type="hidden" value="" id="ucp_idEdit"  />
				<input type="hidden" value="" id="ucp_pidEdit" name="ucp_pidEdit"  />
				<button style="margin-left: 120px; display:none;" class="addPosition" onclick="addPosition()">添加</button>
				<button style="margin-left: 120px;" class="updatePosition" onclick="updatePosition()">修改</button>
			</div>
		</div>
		<!-- 部门人员 -->
		<div class="content" id="content4" style="height: 750px; display: none;">
			<div class="content-operation">
				<button onclick="addPersonDiv()">添加人员</button>
				<button onclick="updatePersonDiv()">修改人员</button>
				<button onclick="userQuit()">申请离职</button>
				<button onclick="userNO()()">暂停使用</button>
				<button onclick="quitUser()">离职</button>
				<button onclick="workForce()">在职</button>
				<button>设置角色</button>
				<button onclick="setPersonPowers()">设置权限</button>
			</div>
			<div class="table-public">
				<!-- 数据读取 -->
			</div>
			<div class="addPerson">
				<span class="addPerson-close" onclick="closeAddperson(this)"><i class="fa fa-close"></i></span>
				<div class="addPerson-title">添加人员</div>
				<dl>
					<dt>账号</dt>
					<dd><input type="text" id="account" /></dd>
				</dl>
				<dl>
					<dt>姓名</dt>
					<dd><input type="text" id="userName" /></dd>
				</dl>
				<dl>
					<dt>联系电话</dt>
					<dd><input type="text" id="userPhone" /></dd>
				</dl>
				<dl>
					<dt>身份证号码</dt>
					<dd><input type="text" id="IDCard" style="width: 234px;" onkeyup="isCards(this)" /></dd>
				</dl>
				<dl>
					<dt>用户住址</dt>
					<dd><input type="text" id="userAddress" style="background-color: #FFF; width: 234px;" /></dd>
				</dl>
				<dl>
					<dt>性别</dt>
					<dd id="userSex">
						<label class="checkbox-a"><input type="radio" class="input_check" name="sex" checked="checked"/><span></span><i>男</i></label>
						<label class="checkbox-a"><input type="radio" class="input_check" name="sex"/><span></span><i>女</i></label>
					</dd>
				</dl>
				<input type="hidden" id="em_idU">
				<div class="box-content" style="width: 330px;margin-left:13px;margin-top:20px;">
					<div class="sub-title"><ul class="title-nav"><li class="visited">电子名片</li></ul></div>
					<div class="sub-content" style="padding-left: 13px; width: 310px; padding: 10px;"><div class="image-upload-box image-card-div"><label class="image-item-add" for="house-image"><input type="file" id="house-image" accept="image/jpg;image/png;image/gif"></label></div></div>
				</div>
				<button style="margin-left: 15px;" onclick="addDepartmentUser()">确定</button>
				<button style="margin-left: 15px;" onclick="updateDepartmentUser()">修改</button>
			</div>
		</div>
	</div>
</body>
</html>
