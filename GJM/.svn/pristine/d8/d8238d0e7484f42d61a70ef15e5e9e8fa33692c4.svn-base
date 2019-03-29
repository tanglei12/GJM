<%@ page pageEncoding="utf-8" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>物业交接</title>
    <link href="/resources/css/manage_index.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/common/common.css" rel="stylesheet" type="text/css">
    <link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/datepicker/jquery-ui.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/sweet-alert/css/sweet-alert.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/perfect-scrollbar/css/perfect-scrollbar.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/product/transfer.css" rel="stylesheet" type="text/css">

    <script src="/resources/js/jquery-1.7.2.min.js"></script>
    <script src="/resources/js/common/common.js"></script>
    <script src="/resources/common/perfect-scrollbar/js/perfect-scrollbar.jquery.js"></script>
    <script src="/resources/Plug-in/My97DatePicker4.7.2/WdatePicker.js"></script>
    <script src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
    <script src="/resources/common/datepicker/js/jquery-ui-datepicker.js"></script>
    <script src="/resources/common/sweet-alert/js/sweet-alert.min.js"></script>
    <script src="/resources/js/product/jquery-cookie.js"></script>
    <script src="/resources/js/common/optionModel.js"></script>
    <script src="/resources/Plug-in/html5_imageUpload/imageUpload.js"></script>
    <script src="/resources/js/transfer/itemTransfer.js"></script>
</head>
<body>
<!-- 加载遮罩层 -->
<div class="loading-mask"></div>
<div id="main-box">
    <!-- 标题 -->
    <div class="box-nav">
        <a class="nav-tab nav-tab-focus">物业交接</a>
    </div>
    <!-- 提示 -->
    <div class="box-content" id="main-hint"></div>
    <!-- 内容 -->
    <div class="box-content" id="main-content">
        <!-- 交接清单 -->
        <div class="sub-title">
            <ul class="title-nav">
                <li class="visited" id="handover-head">
                    <span>交接清单</span>
                </li>
            </ul>
        </div>
        <div class="sub-content">
            <div class="content-item">
                <ul class="transfer-box">
                    <li>
                        <span class="transfer-box-title"><em>*</em>水卡号</span>
                        <span class="transfer-box-content">
								<input type="text" name="hpec_number_water" data-type="水" placeholder="水卡号" required>
							</span>
                        <span class="transfer-box-title transfer-start-title">起始数</span>
                        <span class="transfer-box-content transfer-start">
								<input type="text" class="number" name="hpv_start_water" placeholder="起始数" maxlength="11">
							</span>
                        <span class="transfer-box-title transfer-end-title">截止数</span>
                        <span class="transfer-box-content transfer-end">
								<input type="text" class="number" name="hpv_end_water" placeholder="截止数" maxlength="11">
							</span>
                    </li>
                    <li>
                        <span class="transfer-box-title"><em>*</em>电卡号</span>
                        <span class="transfer-box-content">
								<input type="text" name="hpec_number_electric" data-type="电" placeholder="电卡号" required>
							</span>
                        <span class="transfer-box-title transfer-start-title">起始数</span>
                        <span class="transfer-box-content transfer-start">
								<input type="text" class="number" name="hpv_start_electric" placeholder="起始数" maxlength="11">
							</span>
                        <span class="transfer-box-title transfer-end-title">截止数</span>
                        <span class="transfer-box-content transfer-end">
								<input type="text" class="number" name="hpv_end_electric" placeholder="截止数" maxlength="11">
							</span>
                    </li>
                    <li>
                        <span class="transfer-box-title"><em>*</em>气卡号</span>
                        <span class="transfer-box-content">
								<input type="text" name="hpec_number_gas" data-type="气" placeholder="气卡号" required>
							</span>
                        <span class="transfer-box-title transfer-start-title">起始数</span>
                        <span class="transfer-box-content transfer-start">
								<input type="text" class="number" name="hpv_start_gas" placeholder="起始数" maxlength="11">
							</span>
                        <span class="transfer-box-title transfer-end-title">截止数</span>
                        <span class="transfer-box-content transfer-end">
								<input type="text" class="number" name="hpv_end_gas" placeholder="截止数" maxlength="11">
							</span>
                    </li>
                    <li>
                        <span class="transfer-box-title">有线电视</span>
                        <span class="transfer-box-title transfer-box-title-left">智能卡号</span>
                        <span class="transfer-box-content">
								<input type="text" name="hpec_number_ZL" data-type="智能卡号" placeholder="智能卡号">
							</span>
                        <span class="transfer-box-title">缴费卡号</span>
                        <span class="transfer-box-content">
								<input type="text" name="hpec_number_JF" data-type="缴费卡号" placeholder="缴费卡号">
							</span>
                    </li>
                    <li>
                        <span class="transfer-box-title"><em>*</em>钥匙</span>
                        <span class="transfer-box-title">
								<select name="hk_type">
									<option value="防盗门钥匙">防盗门钥匙</option>
									<option value="密码钥匙">密码钥匙</option>
								</select>
							</span>
                        <span class="transfer-box-content">
								<input type="text" class="number" name="hk_number" placeholder="数量" required>
							</span>
                    </li>
                    <li>
                        <span class="transfer-box-title">备注</span>
                        <span class="transfer-box-content" style="height: 100px;">
								<textarea name="hpm_remark" maxlength="100"></textarea>
							</span>
                    </li>
                    <li style="display: none;">
                        <span class="transfer-box-title"><em>*</em>图片</span>
                        <span class="transfer-box-content">
								<div class="image-upload-box">
									<div id="ss" class="image-upload-main">
										<div class="image-upload-item">
											<img class="upload-item-img" src="https://ooo.0o0.ooo/2017/02/14/58a2ce0add8a6.jpg" alt="123">
											<div class="upload-item-option">
												<div class="option-title">12312.jpg</div>
												<button class="option-button fa-trash error-bg"></button>
											</div>
										</div>
									</div>
									<div class="image-upload-foot">
										<input type="file" multiple="multiple" style="display: none;">
										<button class="upload-foot-item upload-foot-item-first next-bg">选择文件</button>
										<div class="upload-foot-item upload-foot-item-last">0/3</div>
									</div>
								</div>
                            <!-- 								<div class="images-box"> -->
                            <!-- 									<div class="images-btn" data-type="JSD">选择图片</div> -->
                            <!-- 								</div> -->
							</span>
                    </li>
                    <li>
                        <span class="transfer-box-title"><em>*</em>交接人</span>
                        <span class="transfer-box-content">
								<input type="hidden" name="hpm_handoverPerson_id">
								<input type="text" name="hpm_handoverPerson" placeholder="交接人" readonly required>
							</span>
                        <span class="transfer-box-title">交接日期</span>
                        <span class="transfer-box-content">
								<input type="text" name="hpm_handoverDate" placeholder="交接日期" readonly required>
							</span>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 房屋配置 -->
        <div class="sub-title">
            <ul class="title-nav">
                <li class="visited">房屋配置</li>
            </ul>
        </div>
        <div class="sub-content">
            <div class="item-box">
                <div class="content-2sd" style="display: table;border-radius: 4px;">
                    <div class="item-menu">
                        <dl>
                            <dt class="menuA">
                                <select id="menu-dl" style="float: left;"></select>
                                <select id="house-dl" style="float: right;"></select>
                            </dt>
                            <dt class="menuB" style="border-bottom: 1px solid #ddd;">
                                <span style="width: 10%">#</span>
                                <span style="width: 20%">名称</span>
                                <span style="width: 30%">品牌</span>
                                <span style="width: 10%">数量</span>
                                <span style="width: 15%">新旧</span>
                                <span style="width: 15%">好坏</span>
                            </dt>
                        </dl>
                        <dl id="menu-dl-box"></dl>
                        <dl style="border-top: 1px solid #ddd;position: absolute;bottom: 0;left:0;width: 100%;background: #fff;">
                            <dd class="menu-foot">
									<span style="width: 10%">
										<label class="item-ck">
											<i></i>
											<input type="checkbox" onclick="changeAdd4(this)" id="item-ckAll" data-all="all">
										</label>
									</span>
                                <span style="text-align: left;">
										<button class="menu-foot-btn" onclick="addItemForList(this)" style="margin-right: 10px;">添加</button>
									</span>
                            </dd>
                        </dl>
                    </div>
                    <div class="item-list">
                        <dl>
                            <dt class="menuB">
                                <span style="width: 40px;position: relative;">#<i class="i-hint">0</i></span>
                                <span style="width: 84px">配置类型</span>
                                <span style="width: 84px">房屋房间</span>
                                <span style="width: 85px">名称</span>
                                <span style="width: 86px">品牌</span>
                                <span style="width: 60px">数量</span>
                                <span style="width: 60px">新旧</span>
                                <span style="width: 60px">好坏</span>
                                <span style="width: 60px">操作</span>
                            </dt>
                        </dl>
                        <dl id="menu-dl-list"></dl>
                    </div>
                </div>
                <div class="content-2sd">
                    <dl class="dl-item">
                        <dt style="font-weight: bold;">添置物品</dt>
                        <dd>
								<span class="pz7" style="margin-left: 10px;">
									<input type="button" class="item-top" id="" onclick="openModel(this,'itemInfo')" value="添置">
								</span>
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
        <!-- 装修记录 -->
        <div class="sub-title">
            <ul class="title-nav">
                <li class="visited">装修记录</li>
            </ul>
        </div>
        <div class="sub-content">
            <div class="item-box" id="redeBox">
                <div class="loading"></div>
            </div>
        </div>
    </div>
    <!-- 操作 -->
    <div class="box-content">
        <div class="content-foot">
            <button class="btn" id="submitHandover" onclick="submitHandoverInfo(this)">下一步</button>
        </div>
    </div>
</div>
</body>
</html>