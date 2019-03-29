<%@ page language="java" pageEncoding="utf-8"%>
<%
	response.setHeader("Pragma", "No-cache");
	response.setHeader("Cache-Control", "no-cache");
	response.setDateHeader("Expires", -10);
%>
<!DOCTYPE>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="Expires" CONTENT="0">
<meta http-equiv="Cache-Control" CONTENT="no-cache">
<meta http-equiv="Pragma" CONTENT="no-cache">
<title>修改房屋</title>
<link href="/resources/css/manage_index.css" rel="stylesheet" type="text/css">
<link href="/resources/css/common/common.css" rel="stylesheet" type="text/css">
<link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href="/resources/common/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href="/resources/common/sweet-alert/css/sweet-alert.css" rel="stylesheet" type="text/css">
<link href="/resources/common/perfect-scrollbar/css/perfect-scrollbar.min.css" rel="stylesheet" type="text/css">
<link href="/resources/common/uber-zoom/uber-zoom.css" rel="stylesheet" type="text/css">
<link href="/resources/Plug-in/kindeditor-4.1.10/themes/default/default.css" rel="stylesheet" type="text/css" />
<link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">
<link href="/resources/css/library/house-info-eidt.css" rel="stylesheet" type="text/css">

<script src="/resources/js/jquery-1.7.2.min.js"></script>
<script src="/resources/common/perfect-scrollbar/js/perfect-scrollbar.jquery.js"></script>
<script src="/resources/Plug-in/My97DatePicker4.7.2/WdatePicker.js"></script>
<script src="/resources/Plug-in/kindeditor-4.1.10/kindeditor-min.js"></script>
<script src="/resources/Plug-in/kindeditor-4.1.10/lang/zh_CN.js"></script>
<script src="/resources/common/sweet-alert/js/sweet-alert.min.js"></script>
<script src="/resources/common/uber-zoom/uber-zoom.js"></script>
<script src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
<script src="/resources/Plug-in/html5_imageUpload/imageUpload.js"></script>
<script src="/resources/Plug-in/jquery.rotate/jquery.rotate.min.js"></script>
<script src="/resources/js/common/common.js"></script>
<!-- <script src="/resources/js/common/image-upload.js"></script> -->
<script src="/resources/js/common/optionModel.js"></script>
<script src="/resources/js/library/house-info-edit.js"></script>
</head>
<body>
	<input type="hidden" id="house_data" />
	<div id="main-box">
		<!-- 标题 -->
		<div class="box-nav">
			<a class="nav-tab nav-tab-focus" href="javascript:;">修改房屋</a>
		</div>
		<!-- 房屋信息 -->
		<div class="box-content">
			<div class="sub-title">
				<ul class="title-nav">
					<li class="visited">房屋信息</li>
				</ul>
			</div>
			<div class="sub-content">
				<!-- 楼层房号 -->
				<dl class="input-box" style="width: 100%;">
					<dt class="item">
						<em>*</em>
						<span class="item-titile">小区房号</span>
					</dt>
					<dd class="item">
						<label class="suffix" style="border-radius: 4px;background: #1ABC9C;margin-left: 0;">
							<span class="suffix suffix-ft" id="house-info"></span>
							<span class="suffix suffix-ed" id="house-edit" onclick="updateProp()"><i class="fa-pencil" style="margin-right: 4px;"></i>编辑</span>
						</label>
					</dd>
					<dd class="tisp item" style="padding: 10px 0 14px;width: 100%;">
						<div class="prop_box" style="display: none;">
							<span class="suffix">所属小区</span>
							<div id="propertyInfo_idGroups">
								<input type="text" class="form-control" name="propertyInfo_id" placeholder="所属物业" style="margin-right: 12px" readonly required>
							</div>
							<hr style="height: 16px;">
							<span class="suffix">楼层房号</span>
							<div id="house_groups">
								<input type="text" class="form-control" name="hi_floor" placeholder="楼层" style="width: 77px; text-align: center;" required>
								<label class="suffix">-</label>
								<input type="text" class="form-control houseNumber" name="hi_address" placeholder="房号" style="width: 77px; text-align: center;" required>
							</div>
							<hr>
							<div class="prop_box_bottom">
								<button class="prop_btn" onclick="submitProp()" style="margin-right: 10px;">确认修改</button>
								<button class="prop_cancel" onclick="updateProp()">取消</button>
							</div>
						</div>
					</dd>
				</dl>
				<hr>
					<!-- 产权地址 -->
				<dl class="input-box">
					<dt class="item">
						<em>*</em>
						<span class="item-titile">产权地址</span>
					</dt>
					<dd class="item">
						<input type="text" class="form-control-address" name="he_address" placeholder="产权地址" required>
					</dd>
					<dd class="tisp error">
						该地址为产权证上的产权地址
					</dd>
				</dl>
				<hr>
				<!-- 房屋户型 -->
				<dl class="input-box">
					<dt class="item">
						<em>*</em>
						<span class="item-titile">房屋户型</span>
					</dt>
					<dd class="item">
						<input type="text" class="form-control number" name="hi_houseS" placeholder="室" maxlength="1" style="width: 60px; text-align: center;" required>
						<label class="suffix">室</label>
						<input type="text" class="form-control number" name="hi_houseT" placeholder="厅" maxlength="1" style="width: 60px; text-align: center;" required>
						<label class="suffix">厅</label>
						<input type="text" class="form-control number" name="hi_houseW" placeholder="卫" maxlength="1" style="width: 60px; text-align: center;" required>
						<label class="suffix">卫</label>
					</dd>
					<dd class="tisp"></dd>
				</dl>
				<!-- 房屋面积 -->
				<dl class="input-box">
					<dt class="item">
						<em>*</em>
						<span class="item-titile">房屋面积</span>
					</dt>
					<dd class="item">
						<input type="text" class="form-control money" name="hi_measure" placeholder="房屋面积" required>
						<label class="suffix">㎡</label>
					</dd>
					<dd class="tisp"></dd>
				</dl>
				<hr>
				<!-- 存房价格 -->
				<dl class="input-box">
					<dt class="item">
						<em>*</em>
						<span class="item-titile">存房价格</span>
					</dt>
					<dd class="item">
						<input type="text" class="form-control money" name="hi_keepMoney" placeholder="存房价格" disabled>
						<label class="suffix">元/月</label>
					</dd>
					<dd class="tisp"></dd>
				</dl>
				<hr>
				<!-- 出房价格 -->
				<dl class="input-box">
					<dt class="item">
						<em>*</em>
						<span class="item-titile">出房价格</span>
					</dt>
					<dd class="item">
						<input type="text" class="form-control money" name="hi_money" placeholder="出房价格" disabled>
						<label class="suffix">元/月</label>
					</dd>
					<dd class="tisp"></dd>
				</dl>
				<hr>
				<!-- 房屋类型 -->
				<dl class="input-box">
					<dt class="item">
						<em>*</em>
						<span class="item-titile">房屋类型</span>
					</dt>
					<dd class="item">
						<select class="form-control" name="hi_type" required>
							<option value="普通住宅">普通住宅</option>
							<option value="高档住宅">高档住宅</option>
						</select>
					</dd>
					<dd class="tisp"></dd>
				</dl>
				<hr>
				<!-- 房屋情况 -->
				<dl class="input-box">
					<dt class="item">
						<em>*</em>
						<span class="item-titile">装修情况</span>
					</dt>
					<dd class="item">
						<select class="form-control" name="hi_state" style="margin-right: 16px;" required>
							<option value="基装">基装</option>
							<option value="精装">精装</option>
							<option value="中装">中装</option>
							<option value="清水">清水</option>
							<option value="豪装">豪装</option>
						</select>
						<label class="suffix">
							<span class="suffix-titile">房屋朝向</span>
							<select class="form-control" name="hi_orientation">
								<option value="">选择朝向</option>
								<option value="东">东</option>
								<option value="南">南</option>
								<option value="西">西</option>
								<option value="北">北</option>
								<option value="东南">东南</option>
								<option value="东北">东北</option>
								<option value="西南">西南</option>
								<option value="西北">西北</option>
							</select>
						</label>
					</dd>
					<dd class="tisp"></dd>
				</dl>
				<hr>
				<!-- 房屋品牌 -->
				<dl class="input-box">
					<dt class="item">
						<em>*</em>
						<span class="item-titile">房屋品牌</span>
					</dt>
					<dd class="item">
						<select class="form-control" name="hb_id" style="margin-right: 16px;" required>
							<option value="0">选择品牌</option>
						</select>
						<div id="hb_id_sub_box" style="display: none;float: left;"></div>
						<!-- 公寓类型 -->
						<label id="hi_version_box" class="suffix" style="display: none">
							<em>*</em>
							<span class="suffix-titile">公寓类型</span>
							<select class="form-control" name="hi_version" required>
								<option value="">公寓类型</option>
							</select>
						</label>
					</dd>
					<dd class="tisp"></dd>
				</dl>
				<hr>
			</div>
			<!-- 房东信息 -->
			<div class="sub-title">
				<ul class="title-nav">
					<li class="visited">房东信息</li>
				</ul>
			</div>
			<div class="sub-content">
				<dl class="input-box">
					<dt class="item">
						<span class="item-titile">房东信息</span>
					</dt>
					<dd class="item">
						<input type="hidden" class="form-control" name="cc_code" >
						<input type="hidden" class="form-control" name="cc_name" >
						<input type="hidden" class="form-control" name="ccp_phone" >
						<input type="hidden" class="form-control" name="cc_card" >
						<label class="suffix" style="border-radius: 4px;background: #3498DB;margin-left: 0;">
							<span class="suffix suffix-ft" id="cc_info" style="cursor: pointer;"></span>
							<span class="suffix suffix-ed" id="perfect-info" onclick="perfect_more(this)" data-mode="edit"><i class="fa-pencil" style="margin-right: 4px;"></i>编辑</span>
						</label>
					</dd>
					<dd class="tisp"></dd>
				</dl>
			</div>
			<!-- 20170327 shenhongxi 修改房屋界面取消图片上传 -->
			<!-- 图片信息 -->
<!-- 			<div class="sub-title"> -->
<!-- 				<ul class="title-nav"> -->
<!-- 					<li class="visited">图片信息</li> -->
<!-- 				</ul> -->
<!-- 			</div> -->
<!-- 			<div class="sub-content"> -->
<!-- 				<dl class="input-box"> -->
<!-- 					<dt class="item"> -->
<!-- 						<span class="item-titile">房源图片</span> -->
<!-- 					</dt> -->
<!-- 					<dd class="item" style="max-width: initial;"> -->
<!-- 						<input type="file" name="house-upload"> -->
<!-- 					</dd> -->
<!-- 					<dd class="tisp"></dd> -->
<!-- 				</dl> -->
<!-- 			</div> -->
		</div>
		<!-- 扩展信息 -->
		<div class="box-content">
			<div class="sub-title">
				<ul class="title-nav">
					<li class="visited">扩展信息</li>
				</ul>
				<buttom class="fa-angle-double-right" id="extend_btn"></buttom>
			</div>
			<div class="sub-content" id="extend_box">
				<dl class="input-box">
					<dt class="item">
						<span class="item-titile">房屋标题</span>
					</dt>
					<dd class="item">
						<input type="text" class="form-control" name="hi_name" placeholder="房屋标题" maxlength="30" style="width: 450px">
					</dd>
					<dd class="tisp hint">限定字数30字</dd>
				</dl>
				<hr>
				<!-- 推荐群体 -->
				<dl class="input-box">
					<dt class="item">
						<span class="item-titile">推荐群体</span>
					</dt>
					<dd class="item" id="recommendGroup_IdGroups"></dd>
					<dd class="tisp"></dd>
				</dl>
				<hr>
				<!-- 房源优势-->
				<dl class="input-box">
					<dt class="item">
						<span class="item-titile">房源优势</span>
					</dt>
					<dd class="item" id="hi_functionGroups">
						<label class="common-borderbox">
							家电齐全
							<input type="checkbox" name="hi_function" value="家电齐全">
						</label>
						<label class="common-borderbox">
							3号线
							<input type="checkbox" name="hi_function" value="3号线">
						</label>
						<label class="common-borderbox">
							精装修
							<input type="checkbox" name="hi_function" value="精装修">
						</label>
						<button class="common-borderbox-add" name="hi_function" onclick="addLabel(this)">
							<i class="icon-plus"></i>
						</button>
					</dd>
					<dd class="tisp"></dd>
				</dl>
				<hr>
				<!-- 房源配置-->
				<dl class="input-box">
					<dt class="item">
						<span class="item-titile">房源配置</span>
					</dt>
					<dd class="item" id="hi_projectGroups">
						<label class="common-borderbox">
							床
							<input type="checkbox" name="hi_project" value="床">
						</label>
						<label class="common-borderbox">
							衣柜
							<input type="checkbox" name="hi_project" value="衣柜">
						</label>
						<label class="common-borderbox">
							沙发
							<input type="checkbox" name="hi_project" value="沙发">
						</label>
						<label class="common-borderbox">
							电视
							<input type="checkbox" name="hi_project" value="电视">
						</label>
						<label class="common-borderbox">
							冰箱
							<input type="checkbox" name="hi_project" value="冰箱">
						</label>
						<label class="common-borderbox">
							洗衣机
							<input type="checkbox" name="hi_project" value="洗衣机">
						</label>
						<label class="common-borderbox">
							空调
							<input type="checkbox" name="hi_project" value="空调">
						</label>
						<label class="common-borderbox">
							热水器
							<input type="checkbox" name="hi_project" value="热水器">
						</label>
						<label class="common-borderbox">
							宽带
							<input type="checkbox" name="hi_project" value="宽带">
						</label>
						<%-- 
						<button class="common-borderbox-add" name="hi_project" onclick="addLabel(this)">
							<i class="icon-plus"></i>
						</button>
						--%>
					</dd>
					<dd class="tisp"></dd>
				</dl>
				<hr>
				<!-- 房源点评-->
				<dl class="input-box">
					<dt class="item">
						<span class="item-titile">房源点评</span>
					</dt>
					<dd class="item">
						<textarea rows="5" class="form-control" name="hi_content" maxlength="200" style="width: 100%"></textarea>
					</dd>
					<dd class="tisp hint">限定字数20~200字</dd>
				</dl>
				<hr>
				<!-- 房屋简介 -->
				<dl class="input-box">
					<dt class="item">
						<span class="item-titile">房屋简介</span>
					</dt>
					<dd class="item">
						<input type="text" class="form-control no-select" name="hi_text" placeholder="已有房屋简介,点击修改" onchange="textChange();" readonly>
					</dd>
					<dd class="tisp"></dd>
				</dl>
				<!-- 托管管家 -->
				<dl class="input-box">
					<dt class="item">
						<span class="item-titile">托管管家</span>
					</dt>
					<dd class="item">
						<input type="text" class="form-control no-select" name="hi_userManaged" placeholder="已有托管管家,点击修改" readonly>
					</dd>
					<dd class="tisp"></dd>
				</dl>
				<hr>
				<!-- 房屋简介 -->
				<dl id="kindEditor-box" class="input-box" style="padding: 12px;position: relative;border: 1px solid #ddd;border-radius: 4px;display: none;">
					<dt class="kindEditor-title" style="font-size: 16px;color: #3498db;margin-bottom: 12px;">12</dt>
					<dd class="item" id="kindEditor" style="width: 1100px;max-width: 1100px;margin: 0;"></dd>
					<dd style="clear: both;">
						<button class="btn" name="getContent" style="margin-top: 12px;background: #3E97C9;color: #fff;" onchange="">确定</button>
					</dd>
				</dl>
				<hr>
			</div>
		</div>
		<!-- 操作 -->
		<div class="box-content">
			<div class="content-foot">
				<button class="btn" onclick="submitHouseInfo(this)">提交</button>
			</div>
		</div>
		<div id="wuyeDiv"></div>
	</div>
</body>
</html>