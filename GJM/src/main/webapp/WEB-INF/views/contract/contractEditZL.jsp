<%@ page pageEncoding="utf-8" %>
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
    <title></title>
    <link href="/resources/css/common/common.css?v=<%=System.currentTimeMillis()%>" rel="stylesheet" type="text/css">
    <link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/uber-zoom/uber-zoom.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/zyupload/skins/zyupload-1.0.0.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/datepicker/jquery-ui.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/sweet-alert/css/sweet-alert.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/perfect-scrollbar/css/perfect-scrollbar.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/contractList/addContract.css" rel="stylesheet" type="text/css">

    <script src="/resources/js/jquery-1.7.2.min.js"></script>
    <script src="/resources/js/common/common.js"></script>
    <script src="/resources/js/common/common.type.js"></script>
    <script src="/resources/common/uber-zoom/uber-zoom.js"></script>
    <script src="/resources/common/zyupload/zyupload-1.0.0.js"></script>
    <script src="/resources/common/datepicker/js/jquery-ui-datepicker.js"></script>
    <script src="/resources/common/My97DatePicker/WdatePicker.js"></script>
    <script src="/resources/common/sweet-alert/js/sweet-alert.min.js"></script>
    <script src="/resources/common/perfect-scrollbar/js/perfect-scrollbar.jquery.js"></script>
    <script src="/resources/Plug-in/jquery.rotate/jquery.rotate.min.js"></script>
    <script src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.js"></script>
    <script src="/resources/js/product/jquery-cookie.js"></script>
    <script src="/resources/js/common/optionModel.js"></script>
    <script src="/resources/js/contractList/contractEdit.js?v=<%=System.currentTimeMillis()%>"></script>
</head>
<body>
<!-- 数据 -->
<div id="main-box">
    <!-- 合同类型 -->
    <input type="hidden" id="conType" value="租赁合同">
    <!-- 统一出房价 -->
    <input type="hidden" id="house-rent" value="">
    <input type="hidden" id="old-house-rent" value="">
    <!-- 室 -->
    <input type="hidden" id="hi_houseS" value="">
    <input type="hidden" name="outMoney" value=""><!-- 月付 -->
    <input type="hidden" name="seasonMoney" value=""><!-- 季付 -->
    <input type="hidden" name="halfYearMoney" value=""><!-- 半年付 -->
    <input type="hidden" name="yeayMoney" value=""><!-- 年付 -->
    <input type="hidden" name="contractObjectMode" value=""><!-- 合同模式 -->
    <input type="hidden" name="oldVersion" value="">
    <!-- 标题 -->
    <div class="box-nav">
        <a class="nav-tab nav-tab-focus" href="javascript:">租赁合同</a>
    </div>
    <!-- 合同信息 -->
    <div class="box-content">
        <!-- 预定订单 -->
        <div class="sub-title" style="display: none;">
            <ul class="title-nav">
                <li class="visited">预定订单</li>
            </ul>
        </div>
        <div class="sub-content" style="display: none;">
            <dl class="main-box-list">
                <dt class="item">
                    <span class="item-titile">定金订单号</span>
                </dt>
                <dd class="item">
                    <input type="hidden" id="rbid">
                    <input class="form-control" id="orderId" onclick="openModel(this,'orderInfo')" style="width: 400px;" placeholder="定金订单号">
                    <label class="addcon-label no-select">公寓<input type="checkbox" value="公寓" name="gy" onclick="changeAll(this)">
                    </label>
                    <span class="icon-share-alt icon-close" onclick="closeOrder()">撤销</span>
                </dd>
                <dd class="tisp error">如果没有定金订单可以不用选择</dd>
            </dl>
        </div>
        <!-- 客户信息 -->
        <div class="sub-title">
            <ul class="title-nav">
                <li class="visited">客户信息</li>
            </ul>
        </div>
        <div class="sub-content">
            <dl class="main-box-list">
                <dt class="item"><em>*</em>主客户</dt>
                <dd class="item" id="customer-main" style="min-width: inherit;"></dd>
                <dd class="tisp"></dd>
            </dl>
            <hr>
            <dl class="main-box-list">
                <dt class="item">室友</dt>
                <dd class="item" id="contacts-main" style="min-width: inherit;"></dd>
                <dd class="tisp" style="clear: none;float: left;margin-left: 10px;">
                    <button class="form-input" onclick="$.contract.add_customer(this, 'dynamic');">添加室友</button>
                </dd>
            </dl>
            <hr>
        </div>
        <!-- 合同信息 -->
        <div class="sub-title">
            <ul class="title-nav">
                <li class="visited">合同信息</li>
            </ul>
        </div>
        <div class="sub-content">
            <!-- 合同版本 -->
            <dl class="main-box-list">
                <dt class="item">
                    <span class="item-titile">合同版本</span>
                </dt>
                <dd class="item">
                    <%--<label class="common-radio common-radio-checked">普通版<input type="radio" name="version" onclick="changeType(this)" value="普通版" checked></label>--%>
                    <label class="common-radio common-radio-checked">电子版<input type="radio" name="version" onclick="changeType(this)" value="电子版" checked></label>
                    <label class="common-radio">纸质版<input type="radio" name="version" onclick="changeType(this)" value="纸质版"></label>
                    <a class="next" href="javascript:;" id="downloadTemplate" onclick="downloadTemplate('zl')" style="line-height: 36px;font-size: 14px">下载合同模板</a>
                </dd>
                <dd class="tisp"></dd>
            </dl>
            <hr>
            <!-- 合同编号 -->
            <dl class="main-box-list" id="connoDL" style="display: none;">
                <dt class="item">
                    <em>*</em>
                    <span class="item-titile">合同编号</span>
                </dt>
                <dd class="item">
                    <input class="form-control" id="conno" placeholder="合同编号" maxlength="10" required><%--<label class="common-checkbox" style="margin-left: 10px;" id="genLabel">自动生成<input type="checkbox" name="generate" onclick="" value=""></label>--%>
                </dd>
                <dd class="tisp">
                    <span class="error">如果合同编号重复，请仔细核对合同编号或者咨询管理员</span>
                </dd>
            </dl>
            <hr>
            <dl class="main-box-list" id="show-item-table" style="display: none;">
                <dt class="item">
                    <span class="item-titile" style="color: #E74C3C">已存在合同</span>
                </dt>
                <dd class="item">
                    <table class="item-table">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>合同编号</th>
                            <th>产权地址</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody id="item-table-cnoList"></tbody>
                    </table>
                </dd>
                <dd class="tisp"></dd>
            </dl>
            <hr>
            <!-- 小区房号 -->
            <dl class="main-box-list">
                <dt class="item">
                    <em>*</em>
                    <span class="item-titile">小区房号</span>
                </dt>
                <dd class="item">
                    <input class="form-control" id="conhouseno" placeholder="小区房号" style="width: 300px;" readonly disabled>
                    <label class="house-hint"></label>
                    <label class="suffix hcinfo-box" id="houseContractInfo"></label>
                </dd>
                <dd class="tisp"></dd>
            </dl>
            <hr>
            <%--<!-- 产权地址 -->
            <dl class="main-box-list" id="he_address_box">
                <dt class="item">
                    <em>*</em>
                    <span class="item-titile">产权地址</span>
                </dt>
                <dd class="item">
                    <input class="form-control" id="he_address" placeholder="产权地址" style="width: 300px;" required>
                </dd>
                <dd class="tisp error">该地址为产权证上的产权地址</dd>
            </dl>
            <hr>--%>
            <!-- 房屋用途 -->
            <dl class="main-box-list">
                <dt class="item">
                    <span class="item-titile">房屋用途</span>
                </dt>
                <dd class="item">
                    <select class="form-control" id="conUse"></select>
                </dd>
                <dd class="tisp">
                    <div class="error">办公和宿舍须另加保证金2000元，如有宠物须另加保证金3000元，电信宽带光猫保证金300元</div>
                </dd>
            </dl>
            <hr>
            <dl class="main-box-list">
                <dt class="item">
                    <em>*</em>
                    <span class="item-titile">居住人数</span>
                </dt>
                <dd class="item">
                    <input class="form-control" id="peoNum" value="1">
                </dd>
                <dd class="tisp"></dd>
            </dl>
            <hr>
            <dl class="main-box-list">
                <dt class="item">
                    <em>*</em>
                    <span class="item-titile">付款方式</span>
                </dt>
                <dd class="item">
                    <select class="form-control" id="conPayType" required="required"></select>
                    <div class="item-left" id="monthPayType"></div>
                </dd>
                <dd class="tisp"></dd>
            </dl>
            <hr>
            <!-- 起止时间 -->
            <dl class="main-box-list">
                <dt class="item"> <!--  style="width: 98px;" -->
                    <em>*</em>
                    <span class="item-titile">起止时间</span>
                </dt>
                <dd class="item">
                    <input class="form-control" readonly id="conOpenDate" placeholder="开始日期" required>
                    <span class="dd-span">至</span>
                    <input class="form-control" readonly id="conEndDate" placeholder="结束日期" required>
                    <label id="startEndDate" class="suffix"></label>
                </dd>
                <dd class="tisp"></dd>
            </dl>
            <hr>
            <dl class="main-box-list">
                <dt class="item">
                    <em>*</em>
                    <span class="item-titile">租金</span>
                </dt>
                <dd class="item">
                    <input class="form-control money" id="conRent" onchange="$.contract.compute_totalRent();" placeholder="月租金" maxlength="11" required>
                    <label class="suffix">元/月</label>
                    <div id="rentPlus" class="toolbox" style="display:none;">
                        <span class="toolbox-title">租金上涨<i class="icon-info-sign" style="position: absolute; top: 2px; right: 2px;" title="月付：季付租金上涨"></i></span>
                        <span class="toolbox-value" style="padding: 0;">
                                <select id="upRatio" class="form-control" style="width: 90px; height: 32px; border: 0;"></select>
								<input id="contractBody_RentPlus" onchange="$.contract.compute_totalRent();" class="money" value="0" data-type="%" maxlength="3" style="display: none;">
							</span>
                        <span class="toolbox-suffix">%</span>
                    </div>
                    <div id="totalRent" class="toolbox">
							<span class="toolbox-title">
								总租金
								<i class="icon-info-sign" title="该总租金不包含其他费用（服务费、保证金等）" style="position: absolute; top: 2px; right: 2px;"></i>
							</span>
                        <span class="toolbox-value">0</span>
                        <span class="toolbox-suffix">元</span>
                    </div>
                    <button class="form-input" onclick="$.contract.show_bill_list();"><i class="fa-list-ul" style="margin-right: 4px;"></i>预览账单</button>
                </dd>
                <dd class="tisp"></dd>
            </dl>
            <hr>
            <!-- 服务费 -->
            <dl class="main-box-list">
                <dt class="item">
                    <em>*</em>
                    <span class="item-titile">服务费</span>
                </dt>
                <dd class="item">
                    <input class="form-control number" id="conService" value="600" maxlength="11" placeholder="服务费" required>
                    <label class="suffix">元</label>
                </dd>
                <dd class="tisp"></dd>
            </dl>
            <!-- 约定还款日 -->
            <dl class="main-box-list">
                <dt class="item">
                    <em>*</em>
                    <span class="item-titile">约定还款日</span>
                </dt>
                <dd class="item">
                    <input type="hidden" id="hiddenConAgreeDate">
                    <select class="form-control" id="conAgreeDate" required></select>
                </dd>
                <dd class="tisp"></dd>
            </dl>
            <hr>
            <!-- 保证金 -->
            <dl class="main-box-list">
                <dt class="item">
                    <em>*</em>
                    <span class="item-titile">保证金方式</span>
                </dt>
                <dd class="item">
                    <select class="form-control" id="conPay_dd" name="conPayOption" onchange="" required="required"></select>
                </dd>
                <dd class="tisp"></dd>
            </dl>
            <!-- 保证金 -->
            <dl class="main-box-list">
                <dt class="item">
                    <em>*</em>
                    <span class="item-titile">保证金</span>
                </dt>
                <dd class="item">
                    <input class="form-control number" id="conPay" maxlength="11" placeholder="保证金" required>
                    <label class="suffix">元</label>
                    <i class="ex-money" style="display: none;">+<span class="money">0</span>元</i>
                    <i class="dj-money" style="display: none;">-<span class="money">0</span>元(定金)</i>
                </dd>
                <dd class="tisp"></dd>
            </dl>
            <hr>
            <!-- 首付租金日期 -->
            <dl class="main-box-list">
                <dt class="item">
                    <em>*</em>
                    <span class="item-titile">首付租金日期</span>
                </dt>
                <dd class="item">
                    <input class="form-control" id="conStartPayDate" placeholder="点击选择付租日期" readonly required>
                </dd>
                <dd class="tisp"></dd>
            </dl>
            <!-- 签订日期 -->
            <dl class="main-box-list">
                <dt class="item">
                    <em>*</em>
                    <span class="item-titile">签订日期</span>
                </dt>
                <dd class="item">
                    <input class="form-control" id="condate" placeholder="点击选择签订日期" readonly required>
                    <i class="true-tisp"></i>
                </dd>
                <dd class="tisp"></dd>
            </dl>
            <hr>

        </div>
        <!-- 其他信息 -->
        <div class="sub-title">
            <ul class="title-nav">
                <li class="visited">其他信息</li>
            </ul>
        </div>
        <div class="sub-content">
            <dl class="main-box-list">
                <dt class="item">
                    <span class="item-titile">其他约定</span>
                </dt>
                <dd class="item">
                    <textarea class="form-control input-textarea" id="conother" rows="5"></textarea>
                </dd>
                <dd class="tisp"></dd>
            </dl>
            <dl class="main-box-list">
                <dt class="item">
                    <span class="item-titile">备注</span>
                </dt>
                <dd class="item">
                    <textarea class="form-control input-textarea" id="conRemark" rows="5"></textarea>
                </dd>
                <dd class="tisp"></dd>
            </dl>
            <hr>
            <!-- 【合同照】 -->
            <dl class="main-box-list">
                <dt class="item">
                    <em id="htzEM">*</em>
                    <span class="item-titile">合同照</span>
                </dt>
                <dd class="item">
                    <div class="images-box">
                        <div class="images-btn" data-type="HTZ">选择图片</div>
                    </div>
                </dd>
                <dd class="tisp">
                    <span id="HTZ-count">0</span>/<span id="HTZ-limit">5</span>
                </dd>
            </dl>
        </div>
        <!-- 签约代表 -->
        <div class="sub-title">
            <ul class="title-nav">
                <li class="visited">签约代表</li>
            </ul>
        </div>
        <div class="sub-content">
            <dl class="main-box-list" style="width: 100%; border-bottom: 1px solid #3e97c9; margin-bottom: 20px;">
                <dt class="item">&nbsp;</dt>
                <dd class="item">
                    <label class="suffix" style="width: 90px; margin-right: 30px; color: #000">姓名</label>
                    <label class="suffix" style="width: 120px; margin-right: 30px; color: #000">电话</label>
                </dd>
            </dl>
            <hr>
            <dl class="main-box-list">
                <dt class="item"><label class="lb-order" style="text-align: center;">签约人</label></dt>
                <dd class="item">
                    <input type="hidden" name="contractor_id">
                    <input class="form-control" name="contractor_name" placeholder="姓名" style="width: 110px; margin-right: 20px;" required readonly>
                    <input class="form-control" name="contractor_phone" placeholder="手机号码" style="width: 140px; margin-right: 20px;" required readonly>
                </dd>
                <dd class="tisp"></dd>
            </dl>
            <hr>
        </div>
        <!-- 管家信息 -->
        <div class="sub-title">
            <ul class="title-nav">
                <li class="visited">管家信息</li>
            </ul>
        </div>
        <div class="sub-content">
            <dl class="main-box-list" style="width: 100%; border-bottom: 1px solid #3e97c9; margin-bottom: 20px;">
                <dt class="item">&nbsp;</dt>
                <dd class="item">
                    <label class="suffix" style="width: 90px; margin-right: 30px; color: #000">姓名</label>
                    <label class="suffix" style="width: 120px; margin-right: 30px; color: #000">电话</label>
                    <label class="suffix" style="width: 90px; margin-right: 30px; color: #000">业绩分成 (%)</label>
                </dd>
            </dl>
            <hr>
            <dl class="main-box-list">
                <dt class="item">
                    <label class="lb-order" style="text-align: center;">主管家</label>
                </dt>
                <dd class="item">
                    <input type="hidden" name="em_id" data-type="1">
                    <input class="form-control" name="em_name" placeholder="姓名" style="width: 110px; margin-right: 20px;" required readonly>
                    <input class="form-control" name="em_phone" placeholder="手机号码" style="width: 140px; margin-right: 20px;" required readonly>
                    <input class="form-control number emp-yj" name="contract_perforSplit" placeholder="业绩分成" maxlength="3" style="width: 140px; margin-right: 20px;">
                    <label class="suffix suffix-flag" style="margin: 0;">
                        <i class="icon-flag"></i>
                        客源所有者
                    </label>
                </dd>
                <dd class="tisp"></dd>
            </dl>
            <hr>
            <div id="gj-box"></div>
            <dl class="main-box-list" id="addGJButton">
                <dt class="item">&nbsp;</dt>
                <dd class="item">
                    <button class="form-input" onclick="addGJlist()" style="float: none;">添加管家</button>
                </dd>
            </dl>
            <hr>
        </div>
    </div>
    <!-- 提交合同 -->
    <div class="box-content">
        <div class="content-foot">
            <button class="btn" id="saveContract" onclick="$.contract.submit(this)">提交</button>
            <button class="cancel" onclick="window.location.href='/contractObject/contractObjectList'">取消</button>
        </div>
    </div>
    <!-- 提交后提示 -->
    <div class="box-content" id="main-hint" style="display: none;">
        <div class="hint-title">保存成功</div>
        <div class="hint-content" id="hint-box-a"></div>
    </div>
</div>

<!-- 新增時修改意向用戶信息 -->
<div class="cd-popup3" style="display:none;">
    <div class="cd-popup-container3" id="cd-popup-container3">
        <div id="cd-buttons">
            <div style="margin: auto; width: 90%; text-align: center; padding: 15px 0; border-bottom: 1px solid #06B;">
                <input value="预约客户录入" id="inputtext" name="inputtext" style="border: none; text-align: center; font-size: 20px; color: #3E97C9; font-family: 微软雅黑; -moz-user-select: none; -webkit-user-select: none; cursor: default;" readonly>
            </div>
            <input type="hidden" id="custIt_cc_id">
            <input type="hidden" name="cc_code2">
            <dl style="width: 45%;margin-top: 20px;" class="dlClass">
                <dt class="dtClass"><em>*</em>&nbsp;客户姓名：</dt>
                <dd class="ddClass">
                    <input value="" id="ci_name" name="ci_name" placeholder="客户姓名" class="updateInput">
                </dd>
            </dl>
            <dl style="width: 45%;margin-top: 20px;" class="dlClass">
                <dt class="dtClass"><em>*</em>&nbsp;客户性别：</dt>
                <dd style="margin-top: 5px;" class="ddClass">
                    <label class="common-checkbox" style="margin-left: 0px;">
                        <input type="radio" name="ci_sex" value="0">女士
                    </label>
                    <label class="common-checkbox" style="margin-left: 35px;">
                        <input type="radio" name="ci_sex" value="1">先生
                    </label>
                </dd>
            </dl>
            <dl style="width: 45%;float:left;" class="dlClass">
                <dt class="dtClass">
                    <em>*</em>&nbsp;客户电话：
                </dt>
                <dd class="ddClass">
                    <input value="" id="ci_phone" onkeyup="" name="ci_phone" placeholder="客户电话" class="updateInput">
                </dd>
            </dl>
            <dl style="width: 45%;" class="dlClass">
                <dt class="dtClass"><em>*</em>&nbsp;客户类型：</dt>
                <dd style="margin-top: 5px;" class="ddClass">
                    <label class="common-checkbox" style="margin-left: 0px;">
                        <input type="radio" name="ci_type" value="1">意向房东
                    </label>
                    <label class="common-checkbox" style="margin-left: 10px;">
                        <input type="radio" name="ci_type" value="2">意向租客
                    </label>
                </dd>
            </dl>
            <dl style="width: 45%;" class="dlClass">
                <dt class="dtClass">证件类型：</dt>
                <dd class="ddClass">
                    <select id="cc_cardType" onchange="" name="cc_cardType" class="updateInput">
                        <option value="-1">请选择</option>
                        <option value="1">身份证</option>
                        <option value="2">军官证</option>
                        <option value="3">商户号</option>
                        <option value="4">护照</option>
                        <option value="5">台湾居民通行证</option>
                        <option value="6">香港居民通行证</option>
                        <option value="7">临时身份证</option>
                        <option value="8">外国人永久居留证</option>
                    </select>
                </dd>
            </dl>
            <dl style="width: 45%;" class="dlClass">
                <dt class="dtClass">证件号码：</dt>
                <dd class="ddClass">
                    <input value="" id="cc_cardNum" name="cc_cardNum" placeholder="证件号码" class="updateInput">
                </dd>
            </dl>
            <dl style="width: 45%;" class="dlClass">
                <dt class="dtClass">证件正面：</dt>
                <dd style="width: 110px; min-width: 110px; height: auto;" id="frontCard" class="ddClass">
                    <div class="images-box">
                        <div class="images-btn" data-type="CD1" data-url="/customer/imageUpload" data-del-url="/customer/deleteImage" style="display: inline-block;">选择图片</div>
                    </div>
                </dd>
                <dd class="tisp" style="height:24px; line-height: 24px; margin-left: 99px;"><span id="CD1-count">0</span>/<span id="CD1-limit">1</span></dd>
            </dl>
            <dl style="width: 45%;" class="dlClass">
                <dt class="dtClass">证件反面：</dt>
                <dd style="width: 110px; min-width: 110px; height: auto;" id="inverseCard" class="ddClass">
                    <div class="images-box" id="CD2-box">
                        <div class="images-btn" data-box="CD2upload" data-type="CD2" data-url="/customer/imageUpload" data-del-url="/customer/deleteImage" style="display: inline-block;">选择图片</div>
                    </div>
                </dd>
                <dd class="tisp" style="height:24px; line-height: 24px; margin-left: 99px;"><span id="CD2-count">0</span>/<span id="CD2-limit">1</span></dd>
            </dl>
            <dl style="width: 100%;" id="house_address_DL" class="dlClass">
                <dt class="dtClass">
                    <em>*</em>&nbsp;客户需求：
                </dt>
                <dd class="ddClass">
                    <input value="" style="width: 500px;" id="customer_need" name="customer_need" placeholder="客户需求" class="updateInput">
                </dd>
            </dl>
            <dl style="width: 100%;" class="dlClass">
                <dt class="dtClass">
                    &nbsp;客户备注：
                </dt>
                <dd class="ddClass">
                    <input value="" style="width: 500px;" id="contact_result" name="contact_result" placeholder="客户备注" class="updateInput"/>
                </dd>
            </dl>
            <div class="col-md-12  modelAdd" style="width: 300px; margin: auto;">
                <input class="btn btn-info pull-left" id="addHouseIn" style="margin-left: 110px;" onclick="submitText(this)" type="button" value=" 提  交  "/>
            </div>
        </div>
        <div id="showCustInfo" style="display:none;">
            <div style="margin: auto; width: 90%; text-align: center; padding: 15px 0; border-bottom: 1px solid #06B;" id="titleInsert">
                <label style="border: none; text-align: center; font-size: 20px; color: #3E97C9; font-family: '微软雅黑',serif; -moz-user-select: none; -webkit-user-select: none; cursor: default;">
                    客户已存在，信息如下，请确认：
                </label>
            </div>
            <dl style="width:55%;margin-top:20px;display: flex;margin-left: 30px;">
                <dt>&nbsp;客户名称: &nbsp;&nbsp;</dt>
                <dd style="text-align: left;">
                    <label></label><input type="hidden" id="cc_code2Hide">
                </dd>
            </dl>
            <dl style="width:55%;display: flex;margin-left: 30px;margin-top: 15px;">
                <dt>&nbsp;客户性别: &nbsp;&nbsp;</dt>
                <dd style="text-align: left;">
                    <label></label><input type="hidden" id="sexHide">
                </dd>
            </dl>
            <dl style="width:55%;display: flex;margin-left: 30px;margin-top: 15px;">
                <dt>&nbsp;客户电话: &nbsp;&nbsp;</dt>
                <dd style="text-align: left;">
                    <label></label>
                </dd>
            </dl>
            <dl style="width:55%;display: flex;margin-left: 30px;margin-top: 15px;">
                <dt>&nbsp;证件类型: &nbsp;&nbsp;</dt>
                <dd style="text-align: left;">
                    <label></label><input type="hidden" id="cardTypeHide">
                </dd>
            </dl>
            <dl style="width:55%;display: flex;margin-left: 30px;margin-top: 15px;">
                <dt>&nbsp;证件号码: &nbsp;&nbsp;</dt>
                <dd style="text-align: left;">
                    <label></label>
                </dd>
            </dl>
            <dl style="width:55%;display: flex;margin-left: 30px;margin-top: 15px;">
                <dt>&nbsp;客户证件照:</dt>
                <dd style="display: flex;">
                    <img alt="" src="" style="height:100px;">&nbsp;&nbsp;&nbsp;&nbsp;<img alt="" src="" style="height:100px;">
                </dd>
            </dl>
            <div class="col-md-12  modelAdd" style="width: 300px; margin: auto;">
                <input class="btn btn-info pull-left" style="margin-top: 88px;" onclick="enterText(this);" type="button" value=" 确  认  "/>
                <input class="btn btn-info pull-left" style="margin-top: 88px; margin-left: 88px;" onclick="cancelText(this);" type="button" value=" 取  消  "/>
            </div>
        </div>
        <a href="#0" class="cd-popup-close" style="color: red;">X</a>
    </div>
</div>
</body>
</html>