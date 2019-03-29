<%@ page pageEncoding="utf-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="Expires" CONTENT="0">
    <meta http-equiv="Cache-Control" CONTENT="no-cache">
    <meta http-equiv="Pragma" CONTENT="no-cache">
    <title>附加信息</title>
    <link href="/resources/css/common/common.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/datepicker/jquery-ui.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/zyupload/skins/zyupload-1.0.0.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/uber-zoom/uber-zoom.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/sweet-alert/css/sweet-alert.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/perfect-scrollbar/css/perfect-scrollbar.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/contractList/addContract.css" rel="stylesheet" type="text/css">

    <script src="/resources/js/jquery-1.7.2.min.js"></script>
    <script src="/resources/common/datepicker/js/jquery-ui-datepicker.js"></script>
    <script src="/resources/common/sweet-alert/js/sweet-alert.min.js"></script>
    <script src="/resources/common/perfect-scrollbar/js/perfect-scrollbar.jquery.js"></script>
    <script src="/resources/js/product/jquery-cookie.js"></script>
    <script src="/resources/Plug-in/jquery.rotate/jquery.rotate.min.js"></script>
    <script src="/resources/common/uber-zoom/uber-zoom.js"></script>
    <script src="/resources/common/zyupload/zyupload-1.0.0.js"></script>
    <script src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
    <script src="/resources/js/common/common.js"></script>
    <script src="/resources/js/common/common.power.js"></script>
    <script src="/resources/js/common/optionModel.js"></script>
    <script src="/resources/js/contractList/contractAttach.js<%--?v=<%=System.currentTimeMillis()%>--%>"></script>
</head>
<body>
<input type="hidden" id="cid" value="${businessContractVo.contractObject_Id}">
<div id="main-box">
    <div class="box-nav">
        <a class="nav-tab nav-tab-focus" href="#contract-info">合同信息</a> <a class="nav-tab" href="#prop-transfer">物业交接</a>
    </div>
    <!-- 合同信息 -->
    <div id="contract-info-box">
        <div class="box-content" id="main-content">
            <div class="sub-title"></div>
            <div class="sub-content">
                <div>加载中...</div>
            </div>
        </div>
        <!-- 其他信息 -->
        <div class="box-content">
            <div class="sub-title">
                <ul class="title-nav">
                    <li class="visited">费用信息</li>
                </ul>
            </div>
            <div class="sub-content">
                <dl class="main-box-list">
                    <dt class="item">
                        <span class="item-titile">合作费</span>
                    </dt>
                    <dd class="item">
                        <input class="form-control money" name="cooper-cost" placeholder="合作费">
                    </dd>
                    <dd class="tisp"></dd>
                </dl>
                <hr>
            </div>
        </div>
        <!-- 其他信息 -->
        <div class="box-content">
            <div class="sub-title">
                <ul class="title-nav">
                    <li class="visited">照片信息</li>
                </ul>
            </div>
            <div class="sub-content">
                <!-- 图片上传--合同照 -->
                <dl class="main-box-list">
                    <dt class="item">
                        <em>*</em>
                        <span class="item-titile">合同照</span>
                    </dt>
                    <dd class="item">
                        <div class="images-box" id="HTZ-box">
                            <a href="javascript:;" class="images-btn" data-box="htzupload" data-type="HTZ" style="display: ${fn:length(htzImgs) eq 5?'none':'inline-block'};">选择图片</a>
                            <div id="htzupload" class="upload-box"></div>
                            <c:forEach items="${htzImgs}" var="item" varStatus="status">
                                <div class="images-box-img" data-type="${item.ci_type}">
                                    <img class="showboxImg" src="${item.ci_path_real}">
                                </div>
                            </c:forEach>
                        </div>
                    </dd>
                    <dd class="tisp">
                        <span id="HTZ-count">${fn:length(htzImgs)}</span>/<span id="HTZ-limit">10</span>
                    </dd>
                </dl>
                <hr>
                <c:if test="${businessContractVo.contractObject_Type=='托管合同'}">
                    <!-- 图片上传--授权委托书 -->
                    <dl class="main-box-list">
                        <dt class="item">
                            <span class="item-titile">授权委托书</span>
                        </dt>
                        <dd class="item">
                            <div class="images-box" id="WTS-box">
                                <a href="javascript:;" class="images-btn" data-box="wtsupload" data-type="WTS" style="display: ${fn:length(wtsImgs) eq 1?'none':'inline-block'};">选择图片</a>
                                <div id="wtsupload" class="upload-box"></div>
                                <c:forEach items="${wtsImgs}" var="item" varStatus="status">
                                    <div class="images-box-img" data-type="${item.ci_type}">
                                        <img class="showboxImg" src="${item.ci_path_real}">
                                        <span class="images-box-img-delete" data-type="WTS">删除</span>
                                    </div>
                                </c:forEach>
                            </div>
                        </dd>
                        <dd class="tisp">
                            <span id="WTS-count">${fn:length(wtsImgs)}</span>/<span id="WTS-limit">1</span>
                        </dd>
                    </dl>
                    <!-- 图片上传--房产证 -->
                    <dl class="main-box-list">
                        <dt class="item">
                            <span class="item-titile">房产证</span>
                        </dt>
                        <dd class="item">
                            <div class="images-box" id="FCZ-box">
                                <a href="javascript:;" class="images-btn" data-box="fczupload" data-type="FCZ" style="display: ${fn:length(fczImgs) eq 5?'none':'inline-block'};">选择图片</a>
                                <div id="fczupload" class="upload-box"></div>
                                <c:forEach items="${fczImgs}" var="item" varStatus="status">
                                    <div class="images-box-img" data-type="${item.ci_type}">
                                        <img class="showboxImg" src="${item.ci_path_real}">
                                        <span class="images-box-img-delete" data-type="FCZ">删除</span>
                                    </div>
                                </c:forEach>
                            </div>
                        </dd>
                        <dd class="tisp">
                            <span id="FCZ-count">${fn:length(fczImgs)}</span>/<span id="FCZ-limit">15</span>
                        </dd>
                    </dl>
                </c:if>
            </div>
        </div>
        <!-- 客户信息 -->
        <div class="box-content">
            <div class="sub-title">
                <ul class="title-nav">
                    <li class="visited">客户信息</li>
                </ul>
            </div>
            <div class="sub-content">
                <dl class="main-box-list" style="width: 100%; border-bottom: 1px solid #3e97c9; margin-bottom: 12px;">
                    <dt class="item">&nbsp;</dt>
                    <dd class="item">
                        <label class="suffix" style="width: 90px; margin-right: 30px; color: #000">姓名</label>
                        <label class="suffix" style="width: 120px; margin-right: 30px; color: #000">手机号码</label>
                        <label class="suffix" style="width: 90px; margin-right: 30px; color: #000">证件号</label>
                    </dd>
                </dl>
                <hr>
                <dl class="main-box-list">
                    <dt class="item"><label class="lb-order" style="text-align: center;">主客户</label></dt>
                    <dd class="item">
                        <input type="hidden" name="cc_id">
                        <input type="hidden" name="cc_code">
                        <input class="form-control" name="cc_name" placeholder="姓名" style="width: 110px; margin-right: 20px;" disabled readonly>
                        <input class="form-control" name="ccp_phone" placeholder="手机号码" style="width: 140px; margin-right: 20px;" disabled readonly>
                        <input class="form-control" name="cc_cardNum" placeholder="证件号" style="width: 200px; margin-right: 20px;" disabled readonly>
                        <button class="perfect-info" onclick="perfect_more(this)" data-mode="edit" style="display: none;">完善客户信息</button>
                    </dd>
                    <dd class="tisp"></dd>
                </dl>
                <hr>
                <div id="customer-box"></div>
                <dl class="main-box-list">
                    <dt class="item">&nbsp;</dt>
                    <dd class="item">
                        <button class="form-input" id="addSginButton" data-title="联系人" onclick="addSginlist()" style="float: none;">添加联系人</button>
                    </dd>
                </dl>
            </div>
            <!-- 管家信息 -->
            <div class="sub-title">
                <ul class="title-nav">
                    <li class="visited">管家信息</li>
                </ul>
            </div>
            <div class="sub-content">
                <dl class="main-box-list" style="width: 100%; border-bottom: 1px solid #3e97c9; margin-bottom: 12px;">
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
                        <input class="form-control" name="em_name" placeholder="姓名" style="width: 110px; margin-right: 20px;" required disabled>
                        <input class="form-control" name="em_phone" placeholder="手机号码" style="width: 140px; margin-right: 20px;" required disabled>
                        <input class="form-control number emp-yj" name="contract_perforSplit" placeholder="业绩分成" maxlength="3" style="width: 140px; margin-right: 20px;" disabled>
                        <label class="suffix suffix-flag" style="margin: 0;"><i class="icon-flag"></i>客源所有者</label>
                        <button class="btn" id="updateEmployee" onclick="updateEmployee()" style="margin-left: 20px;height: 36px;line-height: 36px ">修改</button>
                    </dd>
                    <dd class="tisp"></dd>
                </dl>
                <hr>
                <div id="gj-box"></div>
                <!-- 					<dl class="main-box-list" id="addGJButton"> -->
                <!-- 						<dt class="item">&nbsp;</dt> -->
                <!-- 						<dd class="item"><button class="form-input" onclick="addGJlist()"style=" float: none;">添加管家</button></dd> -->
                <!-- 					</dl> -->
                <hr>
            </div>
        </div>
        <!-- 提交信息 -->
        <div class="box-content">
            <div class="content-foot">
                <button class="btn" id="saveContract" onclick="updateContractAttach(this)">保存</button>
                <button class="cancel" onclick="window.location.href='/contractObject/contractObjectList'">取消</button>
            </div>
        </div>
    </div>
    <!-- 物业交接 -->
    <div id="prop-transfer-box">
        <div class="box-content">加载中...</div>
    </div>
</div>
</body>
</html>
