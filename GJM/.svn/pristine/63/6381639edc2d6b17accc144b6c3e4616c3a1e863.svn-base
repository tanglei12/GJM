<%@ page pageEncoding="utf-8" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>合约申请</title>
    <link href="/resources/css/common/common.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/datepicker/jquery-ui.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/zyupload/skins/zyupload-1.0.0.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/sweet-alert/css/sweetalert.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/Plug-in/jquery-nice-select/css/nice-select.css" rel="stylesheet" type="text/css">
    <link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/contractList/contractApply.css?v=<%=System.currentTimeMillis()%>" rel="stylesheet" type="text/css">

    <script src="/resources/js/jquery-1.7.2.min.js"></script>
    <script src="/resources/common/datepicker/js/jquery-ui-datepicker.js"></script>
    <script src="/resources/common/sweet-alert/js/sweet-alert.min.js"></script>
    <script src="/resources/common/zyupload/zyupload-1.0.0.js"></script>
    <script src="/resources/common/My97DatePicker/WdatePicker.js"></script>
    <script src="/resources/Plug-in/jquery-nice-select/js/jquery.nice-select.js"></script>
    <script src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
    <script src="/resources/js/product/jquery-cookie.js"></script>
    <script src="/resources/js/common/common.js"></script>
    <script src="/resources/js/common/optionModel.js"></script>
    <script src="/resources/js/contractList/cancelContractEdit.js?v=<%=System.currentTimeMillis()%>"></script>
    <%----%>
</head>
<body>
<div id="main-box">
    <div class="nav-contype clear">
        <a href="javascript:;" class="contype-tab contype-tab-focus">合约申请</a>
    </div>
    <!-- 基本信息 -->
    <div class="box-content">
        <div class="sub-title">
            <ul>
                <li class="visited">基本信息</li>
            </ul>
        </div>
        <div class="sub-content content-item" id="show-info-box"></div>
    </div>
    <!-- 申请内容 -->
    <div class="box-content">
        <div class="sub-title">
            <ul class="title-nav">
                <li class="visited">申请内容</li>
            </ul>
        </div>
        <div class="sub-content">
            <!-- 房屋地址 -->
            <dl class="main-box-list" style="display: none;">
                <dt class="item">
                    <span class="item-titile">房屋地址</span>
                </dt>
                <dd class="item">
                    <input class="form-control" id="houseAddress" data-code="" placeholder="房屋地址、房号、客户姓名" style="width: 300px;" readonly>
                </dd>
                <dd class="tisp"></dd>
                <dd id="moreInfo-box"></dd>
            </dl>
            <hr>
            <!-- 合约类型 -->
            <dl class="main-box-list">
                <dt class="item">
                    <span class="item-titile">合约类型</span>
                </dt>
                <dd class="item" id="contractTypeBox"></dd>
                <dd class="tisp"></dd>
            </dl>
            <hr>
            <!-- 转租日期 -->
            <dl class="main-box-list">
                <dt class="item">
                    <em>*</em> <span class="item-titile">客户申请日期</span>
                </dt>
                <dd class="item">
                    <input class="form-control" id="cco_handleDate" placeholder="客户申请日期" readonly required>
                </dd>
                <dd class="tisp error">该日期为客户申请办理此业务的日期</dd>
            </dl>
            <hr>
            <!-- 业务申请人 -->
            <dl class="main-box-list" data-type="customer">
                <dt class="item">
                    <em>*</em> <span class="item-titile">业务申请人</span>
                </dt>
                <dd class="item">
                    <select id="cco_applicant"></select>
                    <label class="suffix" id="add-customer" style="display: none">
                        <input type="hidden" name="customer-id">
                        <input class="form-control" name="customer-name" placeholder="选择客户" readonly>
                        <span class="suffix">
								<button class="form-control" id="customer-btn">绑定</button>
							</span>
                    </label>
                </dd>
                <dd class="tisp error">绑定错误的客户需要在合同维护里解绑</dd>
            </dl>
            <hr>
            <!-- 服务费用 -->
            <dl class="main-box-list" style="display: none;">
                <dt class="item">
                    <em>*</em> <span class="item-titile sublet-cost-title">服务费用</span>
                </dt>
                <dd class="item">
                    <input class="form-control number" id="cco_subletCost" maxlength="5" title="">
                    <label class="suffix">元</label>
                </dd>
                <dd class="tisp hint">解约费用：年租金20%；退租费用：月租金100%；转租费用：月租金50%</dd>
            </dl>
            <hr>
            <!-- 申请内容 -->
            <dl class="main-box-list">
                <dt class="item">
                    <em>*</em> <span class="item-titile handle-date-content">申请说明</span>
                </dt>
                <dd class="item">
                    <textarea class="form-control" id="cco_applicationContent" rows="5" style="width: 400px;" maxlength="255" required></textarea>
                </dd>
                <dd class="tisp tips"></dd>
            </dl>
            <hr>
            <!-- 申请书 -->
            <dl class="main-box-list" style="display: none;">
                <dt class="item">
                    <em>*</em> <span class="item-titile">证据文件</span>
                </dt>
                <dd class="item">
                    <div class="images-box" id="cco_sqs">
                        <div class="images-btn" data-type="HY">选择图片</div>
                    </div>
                </dd>
                <dd class="tisp">
                    <div style="line-height: 26px; text-align: left; font-size: 13px;">
                        <span id="HY-count">0</span>/<span id="HY-limit">3</span>
                    </div>
                </dd>
            </dl>
            <hr>
            <!-- 经办人 -->
            <dl class="main-box-list">
                <dt class="item">
                    <span class="item-titile">经办人</span>
                </dt>
                <dd class="item">
                    <input class="form-control" id="cco_peopleName" placeholder="经办人" disabled>
                </dd>
                <dd class="tisp"></dd>
            </dl>
            <hr>
            <!-- 经办日期 -->
            <dl class="main-box-list">
                <dt class="item">
                    <span class="item-titile">经办日期</span>
                </dt>
                <dd class="item">
                    <input class="form-control" id="cco_createDate" placeholder="经办日期" readonly disabled>
                </dd>
                <dd class="tisp error"></dd>
            </dl>
            <hr>
        </div>
    </div>
    <!-- 操作 -->
    <div class="box-content">
        <div class="sub-content" style="border-top: none;">
            <dl class="main-box-list">
                <dt class="item" style="line-height: 30px; height: 30px;">&nbsp;</dt>
                <dd class="item">
                    <button class="form-control" id="applySubmit" onclick="applySubmit()">申请并提交审核</button>
                </dd>
            </dl>
            <hr>
        </div>
    </div>
</div>
</body>
</html>