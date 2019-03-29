<%@ page language="java" pageEncoding="utf-8" %>
<%
    response.setHeader("Pragma", "No-cache");
    response.setHeader("Cache-Control", "no-cache");
    response.setDateHeader("Expires", -10);
%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="Expires" CONTENT="0">
    <meta http-equiv="Cache-Control" CONTENT="no-cache">
    <meta http-equiv="Pragma" CONTENT="no-cache">
    <title></title>
    <!-- CSS -->
    <link href="/resources/css/manage_index.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/common/common.css" rel="stylesheet" type="text/css">
    <link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/datepicker/jquery-ui.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/zyupload/skins/zyupload-1.0.0.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/uber-zoom/uber-zoom.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/sweet-alert/css/sweet-alert.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/perfect-scrollbar/css/perfect-scrollbar.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/contractList/addContract.css" rel="stylesheet" type="text/css">

    <script src="/resources/js/jquery-1.7.2.min.js"></script>
    <script src="/resources/js/common/common.js"></script>
    <script src="/resources/js/common/common.type.js"></script>
    <script src="/resources/Plug-in/html5_imageUpload/imageUpload.js"></script>
    <script src="/resources/common/datepicker/js/jquery-ui-datepicker.js"></script>
    <script src="/resources/common/sweet-alert/js/sweet-alert.min.js"></script>
    <script src="/resources/common/perfect-scrollbar/js/perfect-scrollbar.jquery.js"></script>
    <script src="/resources/common/My97DatePicker/WdatePicker.js"></script>
    <script src="/resources/js/product/jquery-cookie.js"></script>
    <script src="/resources/common/uber-zoom/uber-zoom.js"></script>
    <script src="/resources/common/zyupload/zyupload-1.0.0.js"></script>
    <script src="/resources/Plug-in/jquery.rotate/jquery.rotate.min.js"></script>
    <script src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
    <script src="/resources/js/common/optionModel.js"></script>
    <script src="/resources/js/contractList/contractEdit.js?v=<%=System.currentTimeMillis()%>"></script>
</head>
<body>
<div id="main-box">
    <!-- 合同类型 -->
    <input type="hidden" id="conType" value="托管合同">
    <input type="hidden" name="contractObjectMode" value=""><!-- 合同模式 -->
    <input type="hidden" name="oldVersion" value="">
    <!-- 标题 -->
    <div class="box-nav">
        <a class="nav-tab nav-tab-focus" href="javascript:;">托管合同</a>
    </div>
    <!-- 合同信息 -->
    <div class="box-content">
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
                <dt class="item">联系人</dt>
                <dd class="item" id="contacts-main" style="min-width: inherit;"></dd>
                <dd class="tisp" style="clear: none;float: left;margin-left: 10px;">
                    <button class="form-input" onclick="$.contract.add_customer(this, 'dynamic');">添加联系人</button>
                </dd>
            </dl>
            <hr>
        </div>

        <div class="sub-title">
            <ul class="title-nav">
                <li class="visited">合同信息</li>
            </ul>
        </div>
        <div class="sub-content">
            <select class="form-control" id="conUse" style="display: none;">
                <option value="综合" selected>综合</option>
            </select>
            <dl class="main-box-list">
                <dt class="item">
                    <span class="item-titile">合同版本</span>
                </dt>
                <dd class="item">
                    <%--<label class="common-radio common-radio-checked">精装版<input type="radio" name="version" value="精装版" checked></label>--%>
                    <%--<label class="common-radio common-radio-disabled">清水版<input type="radio" name="version" value="清水版" disabled></label>--%>
                    <label class="common-radio common-radio-checked">电子版<input type="radio" name="version" onclick="changeType(this)" value="电子版" checked></label>
                    <label class="common-radio">纸质版<input type="radio" name="version" onclick="changeType(this)" value="纸质版"></label>
                    <a class="next" href="javascript:;" id="downloadTemplate" onclick="downloadTemplate('tg')" style="line-height: 36px;font-size: 14px">下载合同模板</a>
                    <label class="more-tip-error qs_version"></label>
                </dd>
                <dd class="tisp"></dd>
            </dl>
            <hr>
            <dl class="main-box-list" id="connoDL" style="display: none;">
                <dt class="item">
                    <em>*</em>
                    <span class="item-titile">合同编号</span>
                </dt>
                <dd class="item">
                    <input type="text" class="form-control" id="conno" placeholder="合同编号" maxlength="10" required><%--<label class="common-checkbox" style="margin-left: 10px;">自动生成<input type="checkbox" name="generate" onclick="" value=""></label>--%>
                </dd>
                <dd class="tisp error">如果合同编号重复，请仔细核对合同编号或者咨询管理员</dd>
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
                            <th>房号</th>
                            <th>操作人</th>
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
                    <span class="item-titile">小区房号</span>
                </dt>
                <dd class="item">
                    <input type="text" class="form-control" id="conhouseno" placeholder="小区房号" style="width: 300px;" readonly disabled>
                    <label class="house-hint"></label>
                </dd>
                <dd class="tisp"></dd>
            </dl>
            <hr>
            <!-- 产权地址 -->
            <dl class="main-box-list">
                <dt class="item">
                    <em>*</em>
                    <span class="item-titile">产权地址</span>
                </dt>
                <dd class="item">
                    <input type="text" class="form-control" id="he_address" placeholder="产权地址" style="width: 300px;" required>
                </dd>
                <dd class="tisp"></dd>
            </dl>
            <hr>
            <!-- 托管期限 -->
            <dl class="main-box-list main-box-list2">
                <dt class="item">
                    <em>*</em>
                    <span class="item-titile">合同期限</span>
                </dt>
                <dd class="item" id="contractLimitList-box"></dd>
                <dd class="tisp"></dd>
            </dl>
            <hr>
            <dl class="main-box-list">
                <dt class="item">
                    <em>*</em>
                    <span class="item-titile">合同起止日期</span>
                </dt>
                <dd class="item" id="rent-free">
                    <input type="text" class="form-control" id="conOpenDate" placeholder="开始日期" readonly required>
                    <label class="suffix">至</label>
                    <input type="text" class="form-control" id="conEndDate" placeholder="结束日期" readonly required>
                    <label id="startEndDate" class="suffix"></label>
                    <label class="common-checkbox common-checkbox-checked" id="month-1" style="margin: 10px"><input type="radio" name="rent" value="0" checked data="">n-1</label>
                    <label class="common-checkbox" id="month_1" style="margin: 10px;display: none;"><input type="radio" name="rent" value="1" data="">n+1</label>
                    <!-- <label class="common-borderbox"><input type="checkbox" name="forRentDate_box">提前接房</label> -->
                </dd>
                <dd class="item" style="padding: 10px 0 14px;width: 100%;min-height: 28px;margin-left: 130px;">
                    <div class="prop_box" style="display: none;">
                        <label class="suffix">接房日期</label>
                        <input type="text" class="form-control" id="forRentDate" placeholder="接房日期" readonly>
                        <label class="suffix">招租期</label>
                        <label class="suffix forRentDate error" style="margin: 0;font-weight: 600;">0</label>
                        <label class="suffix">天</label>
                        <hr>
                        <label class="error" style="margin-left: 75px;line-height: 28px;">招租期内不会给房东计算租金</label>
                        <hr>
                    </div>
                </dd>
            </dl>
            <hr>
            <dl class="main-box-list">
                <dt class="item">
                    <em>*</em>
                    <span class="item-titile">签订日期</span>
                </dt>
                <dd class="item">
                    <input type="text" class="form-control" id="condate" placeholder="点击选择签订日期" readonly required>
                </dd>
                <dd class="tisp"></dd>
            </dl>
            <dl class="main-box-list">
                <dt class="item">
                    <em>*</em>
                    <span class="item-titile">首付租金日期</span>
                </dt>
                <dd class="item">
                    <input type="text" class="form-control" id="conStartPayDate" placeholder="点击选择首付租金日期" readonly required>
                </dd>
                <dd class="tisp"></dd>
            </dl>
            <hr>
            <dl class="main-box-list">
                <dt class="item">
                    <span class="item-titile">付款方式</span>
                </dt>
                <dd class="item">
                    <select class="form-control" id="conPayType"></select>
                    <div class="item-left" id="monthPayType"></div>
                    <%--<div class="rentplus-box">
                        <ul class="form-control ul-select">
                            <li class="option-plus rentPlus" onclick="$('.option-prop').show();$(this).hide();" style="display: none">+</li>
                            <li class="option-content">
                                <input type="text" class="form-control number" id="contractBody_RentPlus" value="100" maxlength="3" placeholder="租金加成" style="width: 80px; border: none; height: 32px;border-radius: 2px;">
                            </li>
                            <li class="option-prop rentPlus" onclick="$('.option-plus').show();$(this).hide();">%</li>
                        </ul>
                        <label class="suffix">元</label>
                    </div>--%>
                </dd>
                <dd class="tisp"></dd>
            </dl>
            <hr>
            <dl class="main-box-list" id="conRent-box">
                <dt class="item">
                    <em>*</em>
                    <span class="item-titile">租金</span>
                </dt>
                <dd class="item">
                    <input type="text" class="form-control money" id="conRent" onchange="$.contract.compute_totalRent();" placeholder="月租金" maxlength="11" required>
                    <label class="suffix">元/月</label>
                    <!-- 						<label class="common-borderbox"><input type="checkbox" name="payRentModel" onclick="changeRendModel()">打包年付</label> -->
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
            <dl class="main-box-list">
                <dt class="item">
                    <em>*</em>
                    <span class="item-titile">约定付款日</span>
                </dt>
                <dd class="item">
                    <input type="hidden" id="hiddenConAgreeDate">
                    <select class="form-control" id="conAgreeDate" required></select>
                </dd>
                <dd class="tisp"></dd>
            </dl>
            <%--<dl class="main-box-list">
                <dt class="item">
                    <em>*</em>
                    <span class="item-titile">账单生成方式</span>
                </dt>
                <dd class="item">
                    <select class="form-control" id="conBillWay" required></select>
                </dd>
                <dd class="tisp"></dd>
            </dl>--%>
            <hr>
            <!-- 保证金 -->
            <dl class="main-box-list">
                <dt class="item">
                    <em>*</em>
                    <span class="item-titile">保证金</span>
                </dt>
                <dd class="item">
                    <input type="text" class="form-control number" id="conPay" placeholder="保证金" maxlength="11" required>
                    <label class="suffix">元</label>
                </dd>
                <dd class="tisp"></dd>
            </dl>
            <!-- 定金 -->
            <dl class="main-box-list">
                <dt class="item">
                    <span class="item-titile">定金</span>
                </dt>
                <dd class="item">
                    <input type="text" class="form-control number" id="conDepslit" maxlength="11" placeholder="定金">
                    <label class="suffix">元</label>
                </dd>
                <dd class="tisp"></dd>
            </dl>
            <hr>
            <!-- 免租期（天/年） -->
            <dl class="main-box-list">
                <dt class="item">
                    <span class="item-titile">免租期</span>
                </dt>
                <dd class="item">
                    <div id="conFreeDate" class="input-box">
                        <input type="text" class="form-control number" id="oneConFreeDate" placeholder="每年" value="15" maxlength="3">
                    </div>
                    <label class="suffix">天/年</label>
                </dd>
                <dd class="tisp"></dd>
            </dl>
            <hr>
            <!-- 租金递增 -->
            <dl class="main-box-list">
                <dt class="item">
                    <span class="item-titile">租金递增</span>
                </dt>
                <dd class="item">
                    <div id="conIncreasing" class="input-box">
                        <input type="text" class="form-control money" placeholder="每年(默认0不递增)" value="0" maxlength="6">
                    </div>
                    <button class="conIncreasing-convert ok-bg" id="conIncreasingCustom" onclick="custom(this)" data-type="百分比">%<i class="icon-retweet"></i></button>
                </dd>
                <dd class="tisp"></dd>
            </dl>
            <hr>
            <!-- 包修费 -->
            <dl class="main-box-list">
                <dt class="item">
                    <span class="item-titile">包修费</span>
                </dt>
                <dd class="item">
                    <div id="guaranteecost" class="input-box"></div>
                    <label class="suffix">元/年</label>
                </dd>
                <dd class="tisp"></dd>
            </dl>
            <hr>
            <!-- 管理费 -->
            <dl class="main-box-list" id="jz-glf">
                <dt class="item">
                    <span class="item-titile">管理费</span>
                </dt>
                <dd class="item">
                    <input type="text" class="form-control minusNumber" id="conService" placeholder="管理费" maxlength="11">
                    <label class="suffix">元/年</label>
                </dd>
                <dt class="item">
                    <span class="item-titile">超额租金分成</span>
                </dt>
                <dd class="item">
                    <label onclick="$('#A_rate').focus().select();" style="position: absolute; top: -10px; left: 6px; font-size: 12px; color: #A9A9A9; background: #fff; padding: 0 2px;">甲方</label>
                    <input type="text" class="form-control number" id="A_rate" value="0" onkeyup="isEmpty($(this).val())?$('#B_rate').val(''):$('#B_rate').val(100-returnNumber($(this).val()))" maxlength="3" style="width: 75px; text-align: center;">
                    <label class="suffix">%</label>
                    <label onclick="$('#B_rate').focus().select();" style="position: absolute; top: -10px; left: 112px; font-size: 12px; color: #A9A9A9; background: #fff; padding: 0 2px;">管家婆</label>
                    <input type="text" class="form-control number" id="B_rate" value="100" onkeyup="isEmpty($(this).val())?$('#A_rate').val(''):$('#A_rate').val(100-returnNumber($(this).val()))" maxlength="3" style="width: 75px; text-align: center;">
                    <label class="suffix">%</label>
                </dd>
                <dd class="tisp error">乙方每年度第一次付租时一次性收取，若第一次支付周期不足以收取管理费额，剩余部分则延至下一个支付周期。</dd>
            </dl>
            <hr>
            <dl class="main-box-list" id="limitBox" style="display: none;">
                <dt class="item">
                    <span class="item-titile"></span>
                </dt>
                <dd class="item" style="width: 500px; border: 1px solid #ddd;">
                    <table style="width: 100%;">
                        <thead>
                        <tr>
                            <th width="25%" style="height: 30px; line-height: 30px;">委托期限</th>
                            <th width="25%" style="height: 30px; line-height: 30px;">免租期</th>
                            <th width="25%" style="height: 30px; line-height: 30px;">月租金</th>
                            <th width="25%" style="height: 30px; line-height: 30px;">租金递增</th>
                        </tr>
                        </thead>
                        <tbody id="limitList"></tbody>
                    </table>
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
                <dt class="item">其他约定</dt>
                <dd class="item">
                    <textarea class="form-control input-textarea" id="conother" rows="5"></textarea>
                </dd>
                <dd class="tisp"></dd>
            </dl>
            <dl class="main-box-list">
                <dt class="item">备注</dt>
                <dd class="item">
                    <textarea class="form-control input-textarea" id="conRemark" rows="5"></textarea>
                </dd>
                <dd class="tisp"></dd>
            </dl>
            <hr>
            <!-- 图片上传-合同照 -->
            <dl class="main-box-list">
                <dt class="item"><em id="htzEM">*</em>合同照</dt>
                <dd class="item">
                    <div class="images-box">
                        <div class="images-btn" data-type="HTZ">选择图片</div>
                    </div>
                </dd>
                <dd class="tisp">
                    <span id="HTZ-count">0</span>/<span id="HTZ-limit">5</span>
                </dd>
            </dl>
            <!-- 图片上传-授权委托书 -->
            <dl class="main-box-list">
                <dt class="item"><span class="item-titile">授权委托书</span></dt>
                <dd class="item">
                    <div class="images-box">
                        <div class="images-btn" data-type="WTS">选择图片</div>
                    </div>
                </dd>
                <dd class="tisp">
                    <span id="WTS-count">0</span>/<span id="WTS-limit">1</span>
                </dd>
            </dl>
            <hr>
            <!-- 图片上传-房产证 -->
            <dl class="main-box-list">
                <dt class="item"><span class="item-titile">房产证</span></dt>
                <dd class="item">
                    <div class="images-box" data-offset="0" data-limit="3">
                        <div class="images-btn" data-type="FCZ">选择图片</div>
                    </div>
                </dd>
                <dd class="tisp">
                    <span id="FCZ-count">0</span>/<span id="FCZ-limit">3</span>
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
                    <input type="text" class="form-control" name="contractor_name" placeholder="姓名" style="width: 110px; margin-right: 20px;" required readonly>
                    <input type="text" class="form-control" name="contractor_phone" placeholder="手机号码" style="width: 140px; margin-right: 20px;" required readonly>
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
                <dt class="item"><label class="lb-order" style="text-align: center;">主管家</label></dt>
                <dd class="item">
                    <input type="hidden" name="em_id" data-type="1">
                    <input type="text" class="form-control" name="em_name" placeholder="姓名" style="width: 110px; margin-right: 20px;" required readonly>
                    <input type="text" class="form-control" name="em_phone" placeholder="手机号码" style="width: 140px; margin-right: 20px;" required readonly>
                    <input type="text" class="form-control number emp-yj" name="contract_perforSplit" placeholder="业绩分成" maxlength="3" style="width: 140px; margin-right: 20px;">
                    <label class="suffix suffix-flag" style="margin: 0px;"><i class="icon-flag"></i>房源所有者</label>
                </dd>
                <dd class="tisp"></dd>
            </dl>
            <hr>
            <div id="gj-box"></div>
            <dl class="main-box-list" id="addGJButton">
                <dt class="item">&nbsp;</dt>
                <dd class="item">
                    <button class="form-input" onclick="addGJlist()" style=" float: none;">添加管家</button>
                </dd>
            </dl>
            <hr>
        </div>
    </div>
    <!-- 提交信息 -->
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
            <div style="margin: auto; width: 90%; text-align: center; padding: 15px 0px; border-bottom: 1px solid #06B;" id="titleInsert">
                <input type="text" value="预约客户录入" id="inputtext" name="inputtext" style="border: none; text-align: center; font-size: 20px; color: #3E97C9; font-family: 微软雅黑; -moz-user-select: none; -webkit-user-select: none; cursor: default;" readonly="readonly">
            </div>
            <input type="hidden" id="custIt_cc_id">
            <input type="hidden" name="cc_code2">
            <dl style="width: 45%;margin-top: 20px;" class="dlClass">
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
            <dl style="width: 45%;margin-top: 20px;" class="dlClass">
                <dt class="dtClass">证件号码：</dt>
                <dd class="ddClass">
                    <input value="" id="cc_cardNum" name="cc_cardNum" placeholder="证件号码" class="updateInput" onblur="checkCardNum(this);">
                </dd>
            </dl>
            <dl style="width: 45%;" class="dlClass">
                <dt class="dtClass"><em>*</em>&nbsp;客户姓名：</dt>
                <dd class="ddClass">
                    <input value="" id="ci_name" name="ci_name" placeholder="客户姓名" class="updateInput">
                </dd>
            </dl>
            <dl style="width: 45%;" class="dlClass">
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
            <div style="margin: auto; width: 90%; text-align: center; padding: 15px 0px; border-bottom: 1px solid #06B;" id="titleInsert">
                <label style="border: none; text-align: center; font-size: 20px; color: #3E97C9; font-family: 微软雅黑; -moz-user-select: none; -webkit-user-select: none; cursor: default;">
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