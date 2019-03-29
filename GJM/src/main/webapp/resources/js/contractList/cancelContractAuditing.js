var con_code, mode, conType, statement_code;
var review = true;

$(function () {
    con_code = getQueryString("con_code");
    mode = getQueryString("mode");

    UrlPosition();
});

/** Url定位*/
function UrlPosition(hash) {
    hash = isEmpty(hash) ? window.location.hash : hash;
    switch (getQueryString("mode")) {
        case "auditing":
            $("#auditing-nav").html("主管审核");
            switch (hash) {
                case "#step1":
                    $(".step-tag").removeClass("step-tag-focus");
                    $(".step-tag[data-hash=" + hash + "]").addClass("step-tag-focus");
                    $("button[name=auditing-prev]").attr("data-hash", "#step1").css({"display": "none"});
                    $("button[name=auditing-next]").attr("data-hash", "#step2").text("下一步");
                    loadContractApplyData();
                    break;
                case "#step2":
                    $(".step-tag").removeClass("step-tag-focus").eq(3).addClass("step-tag-focus");
                    $("button[name=auditing-prev]").attr("data-hash", "#step1").css({"display": "inline-block"});
                    $("button[name=auditing-next]").attr("data-hash", "#done").text("提交");
                    $(".title-option").hide();
                    loadAuditingData();
                    break;
                default:
                    $(".step-tag").removeClass("step-tag-focus");
                    $(".step-tag[data-hash=" + hash + "]").addClass("step-tag-focus");
                    $("button[name=auditing-prev]").attr("data-hash", "#step1").css({"display": "none"});
                    $("button[name=auditing-next]").attr("data-hash", "#step2").text("下一步");
                    loadContractApplyData();
                    break;
            }
            break;
        case "reAuditing":
            $("#auditing-nav").html("主管复审");
            switch (hash) {
                case "#step1":
                    $(".step-tag").removeClass("step-tag-focus");
                    $(".step-tag[data-hash=" + hash + "]").addClass("step-tag-focus");
                    $("button[name=auditing-prev]").attr("data-hash", "#step1").css({"display": "none"});
                    $("button[name=auditing-next]").attr("data-hash", "#step2").text("下一步");
                    $(".title-option").hide();
                    loadHandoverData();
                    break;
                case "#step2":
                    $(".step-tag").removeClass("step-tag-focus").eq(1).addClass("step-tag-focus");
                    $("button[name=auditing-prev]").attr("data-hash", "#step1").css({"display": "inline-block"});
                    $("button[name=auditing-next]").attr("data-hash", "#step3").text("下一步");
                    $(".title-option").hide();
                    loadBalanceData();
                    break;
                case "#step3":
                    $(".step-tag").removeClass("step-tag-focus").eq(2).addClass("step-tag-focus");
                    $("button[name=auditing-prev]").attr("data-hash", "#step2").css({"display": "inline-block"});
                    $("button[name=auditing-next]").attr("data-hash", "#done").text("提交");
                    $(".title-option").hide();
                    loadAuditingData();
                    break;
                default:
                    $(".step-tag").removeClass("step-tag-focus");
                    $(".step-tag[data-hash=" + hash + "]").addClass("step-tag-focus");
                    $("button[name=auditing-prev]").attr("data-hash", "#step1").css({"display": "none"});
                    $("button[name=auditing-next]").attr("data-hash", "#step2").text("下一步");
                    loadHandoverData();
                    break;
            }
            break;
        case "review":
            $("#auditing-nav").html("财务复核");
            switch (hash) {
                case "#step1":
                    $(".step-tag").removeClass("step-tag-focus");
                    $(".step-tag[data-hash=" + hash + "]").addClass("step-tag-focus");
                    $("button[name=auditing-prev]").attr("data-hash", "#step1").css({"display": "none"});
                    $("button[name=auditing-next]").attr("data-hash", "#step2").text("下一步");
                    loadBalanceData();
                    break;
                case "#step2":
                    $(".step-tag").removeClass("step-tag-focus").eq(3).addClass("step-tag-focus");
                    $("button[name=auditing-prev]").attr("data-hash", "#step1").css({"display": "inline-block"});
                    $("button[name=auditing-next]").attr("data-hash", "#done").text("提交");
                    $(".title-option").hide();
                    loadAuditingData();
                    break;
                default:
                    $(".step-tag").removeClass("step-tag-focus");
                    $(".step-tag[data-hash=" + hash + "]").addClass("step-tag-focus");
                    $("button[name=auditing-prev]").attr("data-hash", "#step1").css({"display": "none"});
                    $("button[name=auditing-next]").attr("data-hash", "#step2").text("下一步");
                    loadBalanceData();
                    break;
            }
            break;
    }
}

/** 1.加载合约申请内容*/
function loadContractApplyData(data) {
    $.ajax({
        type: "POST",
        url: "/contractObject/queryCancelContractInfo",
        data: {
            con_code: con_code
        },
        dataType: "json",
        beforeSend: function () {
            $("#auditing-content").html('<div class="loading"></div>');
            $("button[name=auditing-prev],button[name=auditing-next]").attr("disabled", "disabled");
        }
    }).done(function (result) {
        if (result.code == 200) {
            var data = result.data;
            var contract = data.contractInfo;
            var cancelContract = data.cancelContract;

            conType = contract.contractObject_Type;

            var html = "";
            html += '<div class="sub-title" style="border-bottom: 0;">';
            html += '	<ul class="title-nav">';
            html += '		<li class="visited">申请内容</li>';
            html += '	</ul>';
            if (mode == "auditing") {
                html += '	<div class="title-option">';
                html += '		<button class="option-edit">编辑</button>';
                html += '		<button class="option-save" style="display: none;">保存</button>';
                html += '		<button class="option-cancel" style="display: none;">取消</button>';
                html += '	</div>';
            }
            html += '</div>';
            html += '<div class="sub-content">';
            html += '<dl class="info-box">';
            html += '	<dt class="item">小区房号</dt>';
            html += '	<dd class="item">';
            html += '		<input type="text" class="form-control" id="houseAddress" value="' + returnValue(contract.house_address) + '" data-code="' + returnValue(contract.hi_code) + '" style="width: 300px;" readonly>';
            html += '	</dd>';
            html += '	<dd class="tisp"></dd>';
            html += '	<dd id="moreInfo-box"></dd>';
            html += '</dl>';
            html += '<hr>';
            html += '<dl class="info-box">';
            html += '	<dt class="item">合约类型</dt>';
            html += '	<dd class="item">';
            html += '       <label class="common-borderbox common-borderbox-checked">';
            html += '       	<input type="radio" name="cancelType" value="' + cancelContract.cco_applicationType + '" checked>' + cancelContract.cco_applicationType + '';
            html += '       </label>';
            html += '	</dd>';
            html += '	<dd class="tisp"></dd>';
            html += '</dl>';
            html += '<hr>';
            html += '<dl class="info-box">';
            html += '	<dt class="item"><em>*</em>客户申请日期</dt>';
            html += '	<dd class="item">';
            html += '		<input type="text" class="form-control" id="cco_handleDate" value="' + returnDate(cancelContract.cco_handleDate) + '" placeholder="客户申请日期" readonly required disabled>';
            html += '	</dd>';
            html += '	<dd class="tisp error"></dd>';
            html += '</dl>';
            html += '<hr>';
            html += '<dl class="info-box">';
            html += '	<dt class="item"><em>*</em>业务申请人</dt>';
            html += '	<dd class="item">';
            html += '		<select id="cco_applicant" disabled></select>';
            html += '		<label class="suffix" id="add-customer" style="display: none">';
            html += '			<input type="hidden" name="customer-id">';
            html += '			<input type="text" class="form-control" name="customer-name" placeholder="选择客户" readonly>';
            html += '			<span class="suffix">';
            html += '				<button class="form-control" id="customer-btn">绑定</button>';
            html += '			</span>';
            html += '		</label>';
            html += '	</dd>';
            html += '	<dd class="tisp error" style="font-size: 12px;">绑定错误的客户需要在合同维护里解绑</dd>';
            html += '</dl>';
            html += '<hr>';
            html += '<dl class="info-box">';
            html += '	<dt class="item"><em>*</em>申请说明</dt>';
            html += '	<dd class="item">';
            html += '		<textarea class="form-control" id="cco_applicationContent" rows="5" style="width: 400px;" maxlength="255" required disabled>' + returnValue(cancelContract.cco_applicationContent) + '</textarea>';
            html += '	</dd>';
            html += '	<dd class="tisp"></dd>';
            html += '</dl>';
            html += '<hr>';
            html += '<dl class="info-box">';
            html += '	<dt class="item"><em>*</em>申请书</dt>';
            html += '	<dd class="item">';
            html += '		<div class="images-box">';
            // 申请书
            var path_len = 0;
            if (!isEmpty(cancelContract.cco_path)) {
                var paths = cancelContract.cco_path.split(";");
                $.each(paths, function (index, data) {
                    if (!isEmpty(data)) {
                        html += '<div class="images-box-img" data-limit="disabled">';
                        html += '	<img class="showboxImg" name="HY" src="' + data + '">';
                        html += '	<span class="images-box-img-delete" data-type="HY" data-del-url="">删除</span>';
                        html += '</div>';
                        path_len++;
                    }
                });
            }
            html += '			<div class="images-btn" data-type="HY" style="display:none">选择图片</div>';
            html += '		</div>';
            html += '	</dd>';
            html += '	<dd class="tisp" style="font-size: 12px;"><span id="HY-count">' + path_len + '</span>/<span id="HY-limit">3</span></dd>';
            html += '</dl>';
            html += '<hr>';
            html += '<dl class="info-box">';
            html += '	<dt class="item">经办人</dt>';
            html += '	<dd class="item">';
            html += '		<input type="text" class="form-control" id="cco_peopleName" value="' + returnValue(cancelContract.cco_peopleName) + '" placeholder="经办人" disabled>';
            html += '	</dd>';
            html += '	<dd class="tisp"></dd>';
            html += '</dl>';
            html += '<dl class="info-box">';
            html += '	<dt class="item">经办日期</dt>';
            html += '	<dd class="item">';
            html += '		<input type="text" class="form-control" id="cco_createDate" value="' + returnDate(cancelContract.cco_applicationTime) + '" placeholder="经办日期" readonly disabled>';
            html += '	</dd>';
            html += '	<dd class="tisp"></dd>';
            html += '</dl>';
            html += '<hr>';
            html += '</div>';
            $("#auditing-content").hide().html(html).fadeIn();
            $(".loading").fadeOut();
            // 加载客户信息
            queryCustomerInfo(cancelContract.cco_applicant);
        }
        initFunction();
    }).always(function () {
        $("button[name=auditing-prev],button[name=auditing-next]").removeAttr("disabled");
    });
}

/** 2.加载物业交接数据*/
function loadHandoverData() {
    $.ajax({
        type: "POST",
        url: "/transferKeep/queryTransferInfo",
        data: {con_code: con_code},
        dataType: "json",
        beforeSend: function () {
            $("#auditing-content").html('<div class="loading"></div>');
            $("button[name=auditing-prev],button[name=auditing-next]").attr("disabled", "disabled");
        }
    }).done(function (result) {
        if (result.code == 200) {
            var data = result.data;
            var contract = data.contract || "";
            var handoverMain = data.handoverMain || "";
            conType = contract.contractObject_Type;

            var html = "";
            html += '<div class="sub-title" style="border-bottom: 0;">';
            html += '	<ul class="title-nav">';
            html += '		<li class="visited">交接清单</li>';
            html += '	</ul>';
            html += '</div>';
            html += '<div class="sub-content">';
            html += '	<div class="content-item">';
            html += '		<ul class="transfer-box">';
            html += '			<li>';
            html += '				<span class="transfer-box-title"><em>*</em>水卡号</span>';
            html += '				<span class="transfer-box-content">';
            html += '					<input type="text" name="hpec_number_water" value="" data-type="水" placeholder="水卡号" required disabled>';
            html += '				</span>';
            html += '				<span class="transfer-box-title">起始数</span>';
            html += '				<span class="transfer-box-content">';
            html += '					<input type="text" class="number" name="hpv_start_water" placeholder="起始数" maxlength="11" disabled>';
            html += '				</span>';
            html += '				<span class="transfer-box-title">截止数</span>';
            html += '				<span class="transfer-box-content">';
            html += '					<input type="text" class="number" name="hpv_end_water" placeholder="截止数" maxlength="11" disabled>';
            html += '				</span>';
            html += '			</li>';
            html += '			<li>';
            html += '				<span class="transfer-box-title"><em>*</em>电卡号</span>';
            html += '				<span class="transfer-box-content">';
            html += '					<input type="text" name="hpec_number_electric" data-type="电" placeholder="电卡号" required disabled>';
            html += '				</span>';
            html += '				<span class="transfer-box-title">起始数</span>';
            html += '				<span class="transfer-box-content">';
            html += '					<input type="text" class="number" name="hpv_start_electric" placeholder="起始数" maxlength="11" disabled>';
            html += '				</span>';
            html += '				<span class="transfer-box-title">截止数</span>';
            html += '				<span class="transfer-box-content">';
            html += '					<input type="text" class="number" name="hpv_end_electric" placeholder="截止数" maxlength="11" disabled>';
            html += '				</span>';
            html += '			</li>';
            html += '			<li>';
            html += '				<span class="transfer-box-title"><em>*</em>气卡号</span>';
            html += '				<span class="transfer-box-content">';
            html += '					<input type="text" name="hpec_number_gas" data-type="气" placeholder="气卡号" required disabled>';
            html += '				</span>';
            html += '				<span class="transfer-box-title">起始数</span>';
            html += '				<span class="transfer-box-content">';
            html += '					<input type="text" class="number" name="hpv_start_gas" placeholder="起始数" maxlength="11" disabled>';
            html += '				</span>';
            html += '				<span class="transfer-box-title">截止数</span>';
            html += '				<span class="transfer-box-content">';
            html += '					<input type="text" class="number" name="hpv_end_gas" placeholder="截止数" maxlength="11" disabled>';
            html += '				</span>';
            html += '			</li>';
            html += '			<li>';
            html += '				<span class="transfer-box-title">有线电视</span>';
            html += '				<span class="transfer-box-title transfer-box-title-left">智能卡号</span>';
            html += '				<span class="transfer-box-content">';
            html += '					<input type="text" name="hpec_number_ZL" data-type="智能卡号" placeholder="智能卡号" disabled>';
            html += '				</span>';
            html += '				<span class="transfer-box-title">缴费卡号</span>';
            html += '				<span class="transfer-box-content">';
            html += '					<input type="text" name="hpec_number_JF" data-type="缴费卡号" placeholder="缴费卡号" disabled>';
            html += '				</span>';
            html += '			</li>';
            html += '			<li>';
            html += '				<span class="transfer-box-title"><em>*</em>钥匙</span>';
            html += '				<span class="transfer-box-title">';
            html += '					<select name="hk_type" disabled>';
            html += '						<option value="防盗门钥匙">防盗门钥匙</option>';
            html += '						<option value="密码钥匙">密码钥匙</option>';
            html += '					</select>';
            html += '				</span>';
            html += '				<span class="transfer-box-content">';
            html += '					<input type="text" class="number" name="hk_number" placeholder="数量" required disabled>';
            html += '				</span>';
            html += '			</li>';
            html += '			<li>';
            html += '				<span class="transfer-box-title">备注</span>';
            html += '				<span class="transfer-box-content">';
            html += '					<textarea name="hpm_remark" maxlength="100" disabled>' + returnValue(handoverMain.hpm_remark) + '</textarea>';
            html += '				</span>';
            html += '			</li>';
            html += '			<li>';
            html += '				<span class="transfer-box-title"><em>*</em>交接人</span>';
            html += '				<span class="transfer-box-content">';
            html += '					<input type="hidden" name="hpm_handoverPerson_id">';
            html += '					<input type="text" name="hpm_handoverPerson" placeholder="交接人" readonly required disabled>';
            html += '				</span>';
            html += '				<span class="transfer-box-title">交接日期</span>';
            html += '				<span class="transfer-box-content">';
            html += '					<input type="text" name="hpm_handoverDate" placeholder="交接日期" readonly required disabled>';
            html += '				</span>';
            html += '			</li>';
            html += '		</ul>';
            html += '	</div>';
            html += '</div>';
            html += '<div class="sub-title" style="border-bottom: 0;">';
            html += '	<ul class="title-nav">';
            html += '		<li class="visited">房屋配置</li>';
            html += '	</ul>';
            html += '</div>';
            html += '<div class="sub-content">';
            html += '	<div class="item-box">';
            html += '		<div class="item-list">';
            html += '			<dl>';
            html += '				<dt class="menuB">';
            html += '					<span style="width: 40px;">';
            html += '						#';
            html += '						<i class="i-hint" style="left: 42px;">0</i>';
            html += '					</span>';
            html += '					<span style="width: 84px">配置类型</span>';
            html += '					<span style="width: 84px">房屋房间</span>';
            html += '					<span style="width: 85px">名称</span>';
            html += '					<span style="width: 86px">品牌</span>';
            html += '					<span style="width: 60px">数量</span>';
            html += '					<span style="width: 60px">新旧</span>';
            html += '					<span style="width: 60px">好坏</span>';
            html += '				</dt>';
            html += '			</dl>';
            html += '			<dl id="menu-dl-list"></dl>';
            html += '		</div>';
            html += '	</div>';
            html += '</div>';
            html += '<!-- 装修记录 -->';
            html += '<div class="sub-title" style="border-bottom: 0;">';
            html += '	<ul class="title-nav">';
            html += '		<li class="visited">装修记录</li>';
            html += '	</ul>';
            html += '</div>';
            html += '<div class="sub-content">';
            html += '	<div class="item-box" id="redeBox"></div>';
            html += '</div>';
            $("#auditing-content").hide().html(html).fadeIn();
            $(".loading").fadeOut();

            // 初始化房间
            var stwArr = new Array();
            for (var i = 0; i < returnNumber(contract.hi_houseT); i++) {
                if (i == 0) {
                    stwArr.push("客厅");
                } else {
                    stwArr.push("客厅" + i);
                }
            }
            for (var i = 0; i < returnNumber(contract.hi_houseS); i++) {
                if (i == 0) {
                    stwArr.push("主卧");
                } else if (i == 1) {
                    stwArr.push("次卧");
                } else {
                    stwArr.push("次卧" + i);
                }
            }
            for (var i = 0; i < returnNumber(contract.hi_houseW); i++) {
                if (i == 0) {
                    stwArr.push("卫生间");
                } else if (i == 1) {
                    stwArr.push("次卫生间");
                } else {
                    stwArr.push("次卫生间" + i);
                }
            }
            // 初始化装饰情况
            initDecoList(stwArr, data.houseDecoList);

            // 交接人
            $("input[name=hpm_handoverPerson_id]").val(returnNumber(handoverMain.hpm_handoverPersonOut));
            $("input[name=hpm_handoverPerson]").val(returnValue(handoverMain.hpm_handoverPersonOutName));
            // 交接日期
            $("input[name=hpm_handoverDate]").val(returnDate(handoverMain.hpm_handoverDateOut));

            // 卡号
            if (!isEmpty(data.energyCards)) {
                $.each(data.energyCards, function (index, data) {
                    switch (data.hpec_type) {
                        case "水":
                            $("input[name=hpec_number_water]").val(data.hpec_newNumber);
                            break;
                        case "电":
                            $("input[name=hpec_number_electric]").val(data.hpec_newNumber);
                            break;
                        case "气":
                            $("input[name=hpec_number_gas]").val(data.hpec_newNumber);
                            break;
                        case "智能卡号":
                            $("input[name=hpec_number_ZL]").val(data.hpec_newNumber);
                            break;
                        case "缴费卡号":
                            $("input[name=hpec_number_JF]").val(data.hpec_newNumber);
                            break;
                    }
                });
            }

            // 卡号值
            if (!isEmpty(data.energyValues)) {
                $.each(data.energyValues, function (index, data) {
                    switch (data.hpv_type) {
                        case "水":
                            $("input[name=hpv_start_water]").val(data.hpv_start);
                            $("input[name=hpv_end_water]").val(data.hpv_end);
                            break;
                        case "电":
                            $("input[name=hpv_start_electric]").val(data.hpv_start);
                            $("input[name=hpv_end_electric]").val(data.hpv_end);
                            break;
                        case "气":
                            $("input[name=hpv_start_gas]").val(data.hpv_start);
                            $("input[name=hpv_end_gas]").val(data.hpv_end);
                            break;
                    }
                });
            }

            // 交接物品配置信息
            $.each(data.handoverGoods || "", function (index, data) {
                var bg = "";
                var _roomType = data.hpg_roomType;
                var _type = data.hpg_itemType;
                switch (_type) {
                    case "家具":
                        bg = "item-type-jj";
                        break;
                    case "家电":
                        bg = "item-type-jd";
                        break;
                    case "洁具":
                        bg = "item-type-jieju";
                        break;
                    case "灯具":
                        bg = "item-type-dj";
                        break;
                    default :
                        bg = "item-type-dj";
                        break;
                }
                var _ps_on = returnNumber(data.hpg_on);
                var _ps_gb = returnNumber(data.hpg_gb);
                $("#menu-dl-list").append(
                    '<dd class="menu-content" data-type="add">' +
                    '<span style="width:40px">' + ($("#menu-dl-list .menu-content").length + 1) + '</span>' +
                    '<span style="width:84px"><label class="item-type ' + bg + '">' + _type + '</label></span>' +
                    '<span style="width:84px">' + returnValue(_roomType) + '</span>' +
                    '<span style="width:85px;max-width:85px;" title="' + returnValue(data.hpg_itemName) + '">' + returnValue(data.hpg_itemName) + '</span>' +
                    '<span style="width:86px;max-width:86px;" title="' + returnValue(data.hpg_itemBrand) + '">' + returnValue(data.hpg_itemBrand) + '</span>' +
                    '<span style="width:60px">' + returnNumber(data.hpg_number) + '</span>' +
                    '<span style="width:60px">' +
                    '<label class="check-item ' + (_ps_on == 0 ? "check-item-well" : "check-item-old") + '">' +
                    '<input type="checkbox" class="ps_on" onclick="changeCheckItem(this)" data-type="on" value="' + _ps_on + '" ' + (_ps_on == 0 ? 'checked' : '') + ' disabled>' +
                    '<span>' + (_ps_on == 0 ? "新" : "旧") + '</span>' +
                    '</label></span>' +
                    '<span style="width:60px">' +
                    '<label class="check-item ' + (_ps_gb == 0 ? 'check-item-well' : 'check-item-bad') + '">' +
                    '<input type="checkbox" class="ps_gb" onclick="changeCheckItem(this)" data-type="gb" value="' + _ps_gb + '" ' + (_ps_gb == 0 ? 'checked' : '') + ' disabled>' +
                    '<span>' + (_ps_gb == 0 ? '好' : '坏') + '</span>' +
                    '</label></span>' +
                    '</dd>');
                $(".i-hint").text($("#menu-dl-list .menu-content").length);
            });

            // 装饰情况
            $.each(data.handoverDecorations || "", function (index, data) {
                var _box = $(".item-tr[data-roomtype=" + data.hpd_roomType + "][data-decotype=" + data.hpd_decoType + "]");
                if (data.hpd_decoState == 1) {
                    _box.find("input[name=hpd_decoState]").val(1).removeAttr("checked");
                    _box.find("input[name=hpd_decoState]").parent().removeClass("box-on").addClass("box-off").attr("data-title", "有损");
                }
                _box.find("input[name=hpd_desc]").val(data.hpd_desc);

            });

            // 钥匙
            if (!isEmpty(data.houseKey)) {
                var _placeholder = "";
                switch (data.houseKey.hk_type) {
                    case "防盗门钥匙":
                        _placeholder = "数量";
                        break;
                    case "密码钥匙":
                        _placeholder = "密码";
                        break;
                }
                $("select[name=hk_type] option[value=" + data.houseKey.hk_type + "]").attr("selected", "selected");
                $("input[name=hk_number]").val(returnValue(data.houseKey.hk_newNumber)).attr("placeholder", _placeholder);
            }
        } else {
            $("#auditing-content").html('<div class="error" style="line-height: 120px;text-align:center;font-size: 16px;">' + result.msg + '</div>');
            return;
        }
        initFunction();
    }).always(function () {
        $("button[name=auditing-prev],button[name=auditing-next]").removeAttr("disabled");
    });
}

/** 3.加载物业结算数据*/
function loadBalanceData() {

    var html = '';
    html += '<div class="sub-title" style="border-bottom: 0;"><ul class="title-nav"><li class="visited">结算清单</li></ul></div>';
    html += '<div class="sub-content" id="handoverOrder" style="padding:0;"></div>';
    $("#auditing-content").html(html);

    $("#handoverOrder").handoverBox({
        data: {
            con_code: con_code,
            mode: "out"
        },
        mode: (getQueryString("mode") == "review" ? "review" : "query"),
        display_title: false,
        display_all: true,
        init: function (result, statementOrder) {
            statement_code = statementOrder.statement_code;
            conType = result.contractObject_Type;
        },
        result: function (data) {
            $("button[name=auditing-prev],button[name=auditing-next]").removeAttr("disabled");
        }
    })
}

/** 4.加载提交审核数据*/
function loadAuditingData() {
    var html = "";
    html += '<div class="sub-title" style="border-bottom: 0;">';
    html += '	<ul class="title-nav">';
    html += '		<li class="visited">审核确认</li>';
    html += '	</ul>';
    html += '</div>';
    html += '<div class="sub-content">';
    html += '   <dl class="input-box">';
    html += '   	<dt class="item">处理方式</dt>';
    html += '   	<dd class="item">';
    html += '          <select class="form-control" name="auditing-way">';
    html += '          		<option value="协议确认">协议确认</option>';
    html += '          		<option value="电话确认">电话确认</option>';
    html += '          </select>';
    html += '   	</dd>';
    html += '   	<dd class="tisp"></dd>';
    html += '   </dl>';
    html += '   <hr>';
    html += '   <dl class="input-box">';
    html += '   	<dt class="item">处理结果</dt>';
    html += '   	<dd class="item">';
    if (mode == "auditing") {
        html += '          <label class="common-borderbox common-borderbox-checked">';
        html += '          		<input type="radio" name="result" value="待审核" checked>通过';
        html += '          </label>';
        html += '          <label class="common-borderbox">';
        html += '          		<input type="radio" name="result" value="审核未通过">退回';
        html += '          </label>';
    }
    if (mode == "reAuditing") {
        html += '          <label class="common-borderbox common-borderbox-checked">';
        html += '          		<input type="radio" name="result" value="待复审" checked>通过';
        html += '          </label>';
        html += '          <label class="common-borderbox">';
        html += '          		<input type="radio" name="result" value="复审未通过">退回';
        html += '          </label>';
    }
    if (mode == "review") {
        html += '          <label class="common-borderbox common-borderbox-checked">';
        html += '          		<input type="radio" name="result" value="待复核" checked>通过';
        html += '          </label>';
        html += '          <label class="common-borderbox">';
        html += '          		<input type="radio" name="result" value="复核未通过">退回';
        html += '          </label>';
    }
    html += '   	</dd>';
    html += '   	<dd class="tisp"></dd>';
    html += '   </dl>';
    html += '   <hr>';
    if (mode == "review") {
        html += '   <dl class="input-box">';
        html += '   	<dt class="item">合同账单</dt>';
        html += '   	<dd class="item" style="min-width: 400px;">';
        html += '   		<table class="item-table">';
        html += '   			<thead>';
        html += '   			    <tr>';
        html += '   			    	<td>期数</td>';
        html += '   			    	<td>金额</td>';
        html += '   			    	<td>状态</td>';
        html += '   			    	<td>付款日期</td>';
        html += '   			    </tr>';
        html += '   			</thead>';
        html += '   			<tbody id="contract_bill"></tbody>';
        html += '   		</table>';
        html += '   	</dd>';
        html += '   	<dd class="tisp"></dd>';
        html += '   </dl>';
    }
    html += '   <dl class="input-box" id="result-desc" style="display:none;">';
    html += '   	<dt class="item"><em>*</em>退回说明</dt>';
    html += '   	<dd class="item">';
    html += '   		<textarea class="form-control" name="auditing-desc" rows="5" style="width: 400px;" maxlength="255" required></textarea>';
    html += '   	</dd>';
    html += '   	<dd class="tisp"></dd>';
    html += '   </dl>';
    html += '   <hr>';
    html += '</div>';
    $("#auditing-content").hide().html(html).fadeIn();
    $(".loading").fadeOut();

    //
    $("input[name=result]").on("click", function () {
        if ($("input[name=result]:checked").val().indexOf("未通过") > -1) {
            $("#result-desc").fadeIn();
        } else {
            $("#result-desc").fadeOut();
        }
    });

    if (mode == "review") {
        $.ajax({
            type: "POST",
            url: "/contractObject/queryContractBillList",
            data: {
                con_code: con_code
            },
            dataType: "json",
        }).done(function (result) {
            if (result.code != 200) {
                return;
            }
            contractOrder = result.data.contractOrder;
            contractBillList = result.data.contractBillList;
            statementOrder = result.data.statementOrder || "";

            var boo = false;
            var html = '';
            var cacheData;
            var list = [];
            $.each(contractBillList, function (index, data) {
                var state = returnBillState(data.bcb_state);
                if (state.text == "已还款") {
                    html += '<tr class="tr' + data.bcb_id + '" style="display: none;">';
                    html += '	<td>' + returnValue(data.bcb_cycle) + '</td>';
                    html += '	<td>' + returnValue(data.bcb_repayment) + '</td>';
                    html += '	<td>' + state.text + '</td>';
                    html += '	<td>' + returnDate(data.bcb_repaymentDate) + '</td>';
                    html += '</tr>';
                    boo = true;
                    cacheData = data;
                } else if (state.text == "待还款") {
                    if (boo) {
                        html += '<tr>';
                        html += '	<td colspan="4" style="text-align: center;background: #f3f3f3;">查看已还款账单</td>';
                        html += '</tr>';
                        boo = false;
                    }

                    var billDate = new Date(data.bcb_repaymentDate).getTime();
                    var currentDate = new Date(statementOrder.statement_handoverDate).getTime();
                    if (billDate <= currentDate) {
                        list[list.length] = data.bcb_id;
                    }
                    html += '<tr class="tr' + data.bcb_id + '">';
                    html += '	<td>' + returnValue(data.bcb_cycle) + '</td>';
                    html += '	<td>' + returnValue(data.bcb_repayment) + '</td>';
                    html += '	<td>' + state.text + '</td>';
                    html += '	<td>' + returnDate(data.bcb_repaymentDate) + '</td>';
                    html += '</tr>';
                } else {
                    html += '<tr class="tr' + data.bcb_id + '">';
                    html += '	<td>' + returnValue(data.bcb_cycle) + '</td>';
                    html += '	<td>' + returnValue(data.bcb_repayment) + '</td>';
                    html += '	<td>' + state.text + '</td>';
                    html += '	<td>' + returnDate(data.bcb_repaymentDate) + '</td>';
                    html += '</tr>';
                }
            });
            $("#contract_bill").html(html);

            if (list.length >= 2) {
                for (var i = 0; i < (list.length - 1); i++) {
                    $(".tr" + list[i]).addClass("error");
                }
                review = false;
            }
        });
    }
}

/** 初始化方法 */
function initFunction() {

    // 业务申请人添加
    $("#cco_applicant").change(function () {
        if (returnNumber($(this).val()) == -1) {
            $("#add-customer").fadeIn();
        } else {
            $("#add-customer").fadeOut();
        }
    });

    // 选择客户
    $("input[name=customer-name]").on("click", function () {
        $(this).openModel({
            title: "客户信息",
            target: {
                id: "customer-id",
                name: "customer-name"
            }
        });
    });

    // 绑定客户信息
    $("#customer-btn").on("click", function () {
        var _this = $(this);
        var _cus_id = returnValue($("input[name=customer-id]").val());
        if (isEmpty(_cus_id)) {
            $.jBox.tip("请选择一个客户进行绑定", "warning");
            return;
        }
        $.ajax({
            type: "POST",
            url: "/contractObject/bindCustomerRelaInfo",
            data: {
                con_code: con_code,
                cus_id: _cus_id
            },
            dataType: "json",
            beforeSend: function () {
                _this.attr("disabled", "disabled");
                $.jBox.tip("客户绑定中", "loading");
            }
        }).done(function (result) {
            if (result.code == 200) {
                $.jBox.tip("客户绑定成功", "success");

                $("#add-customer").hide();
                $("#add-customer").find("input[name=customer-id]").val("");
                $("#add-customer").find("input[name=customer-name]").val("");

                queryCustomerInfo(_cus_id);
            } else {
                $.jBox.tip(result.msg, "error");
            }
        }).always(function () {
            _this.removeAttr("disabled").text("绑定");
        });
    });

    // 编辑
    $(".option-edit").on("click", function () {
        $(this).hide();
        $("[class^=option]:not(.option-edit)").fadeIn();
        $("#auditing-content").find(".info-box").removeClass("info-box").addClass("input-box");
        //
        $("#cco_applicant").removeAttr("disabled");
        $("select").niceSelect("update");
        //
        $("#cco_applicationContent").removeAttr("disabled");
        //
        $("#cco_handleDate").removeAttr("disabled");
        //
        $(".images-box-img").attr("data-limit", "none");
        //
        $(".images-btn[data-type=HY]").show();
    });

    // 取消
    $(".option-cancel").on("click", function () {
        $("[class^=option]").fadeOut();
        $("#auditing-content").find(".input-box").removeClass("input-box").addClass("info-box");
        //
        $("#cco_applicant").attr("disabled", "disabled");
        $("select").niceSelect("update");
        //
        $("#cco_applicationContent").attr("disabled", "disabled");
        //
        $("#cco_handleDate").attr("disabled", "disabled");
        //
        $(".images-box-img").attr("data-limit", "disabled");
        //
        $(".images-btn[data-type=HY]").hide();
        $("#upload-box").remove();

        if (returnNumber($("#cco_applicant").val()) == -1) {
            $("#cco_applicant").find("option[value=" + $("#cco_applicant").attr("data-id") + "]").attr("selected", "selected").change();
            $('select').niceSelect("update");
        }

        setTimeout(function () {
            $(".option-edit").fadeIn();
        }, 500);
    });

    // 保存
    $(".option-save").on("click", function () {
        var _this = $(this);

        var isOk = true;
        $(".form-control:required").each(function () {
            if (isEmpty($(this).val())) {
                $(this).msg("不能为空");
                isOk = false;
                return false;
            }
        });
        if (!isOk) {
            return;
        }
        var _path = "";
        $(".showboxImg[name=HY]").each(function () {
            _path += $(this).attr("src") + ";";
        });
        //		if(_path.length < 10){
        //			$.jBox.tip("请添加申请书图片","warning");
        //			return;
        //		}
        $.ajax({
            type: "POST",
            url: "/contractObject/applySubmit",
            data: {
                contractObject_Code: returnValue(con_code),
                hi_code: $("#houseAddress").attr("data-code"),
                cco_applicationContent: $("#cco_applicationContent").val(),
                cco_applicationTime: $("#cco_createDate").val(),
                cco_applicationType: $("input[name='cancelType']:checked").val(),
                cco_applicant: $("#cco_applicant").val(),
                cco_path: _path,
                cco_peopleName: $("#cco_peopleName").val(),
                cco_handleDate: $("#cco_handleDate").val()
            },
            dataType: "json",
            beforeSend: function () {
                $.jBox.tip("保存中", "loading");
                _this.attr("disabled", "disabled");
            }
        }).done(function (result) {
            switch (result.code) {
                case 200:
                    $.jBox.tip("保存成功", "warning");
                    $(".option-cancel").click();
                    break;
                default :
                    $.jBox.tip(result.msg, "warning");
                    break;
            }
        }).always(function () {
            _this.removeAttr("disabled");
        });
    });

    // 自定义滚动条
    $("#recyclebin-box,#menu-dl-box,#menu-dl-list").perfectScrollbar();
    // 初始化日期插件
    $("#cco_handleDate,#cco_createDate").datepicker();
    // Select样式
    $("select").niceSelect();

}

/** 初始化装修情况列表*/
function initDecoList(list, houseDecoList) {
    var html = "";
    $.each(list, function (index, data) {
        html += '<div class="add-item">';
        html += '	<table>';
        html += '		<thead>';
        html += '			<tr>';
        html += '				<td colspan="6" class="redeList-title list-title" style="padding: 0 10px;text-align: left;">' + data + '</td>';
        html += '			</tr>';
        html += '			<tr>';
        html += '				<th>装修面</th>';
        html += '				<th>现状</th>';
        html += '				<th>情况说明</th>';
        html += '			</tr>';
        html += '		</thead>';
        html += '		<tbody class="redeList">';
        $.each(houseDecoList, function (index, data1) {
            html += '<tr class="item-tr" data-roomType="' + data + '" data-decoType="' + data1.ht_name + '">';
            html += '	<td>' + data1.ht_name + '</td>';
            html += '	<td>';
            html += '		<label class="box-on-off box-on" data-title="正常" data-json=\'{"on":"正常","on_state":"0","off":"有损","off_state":"1"}\'><input type="checkbox" name="hpd_decoState" value="0" checked disabled></label>';
            html += '	</td>';
            html += '	<td>';
            html += '		<input type="text" class="imo-input1" name="hpd_desc" placeholder="情况描述" style="width: 94%;height: 30px;background: #f9f9f9;" disabled>';
            html += '	</td>';
            html += '</tr>';
        });
        html += '		</tbody>';
        html += '	</table>';
        html += '</div>';
    });
    $("#redeBox").html(html);
}

/** 合计*/
function calTotalCost(_type, _mode, _conType) {
    var _box = $("[data-type=" + _type + "]");

    var _total = 0;
    _box.find("input[name=sci_totalCosts]").each(function () {
        _total += returnFloat($(this).val());
    });
    _box.find("input[name=total-cost]").val(returnFloat(_total));
    moveBalabceCost(_mode, _conType);
}

/** 移植结余费用*/
function moveBalabceCost(mode, conType) {

    // 公司应收：credit、公司应付： debit
    if (mode == "in") {
        if (conType == "托管合同") { // 应收
            // 代理费
            $("#statement_agent_credit").val(returnFloat($("#statement_agent").val()));
            // 消费
            $("#statement_costs_credit").val(returnFloat($("#statement_costs").val()));
            // 物品
            $("#statement_goods_credit").val(returnFloat($("#statement_goods").val()));
            // 违约金
            $("#statement_penalty_credit").val(returnFloat($("#statement_penalty").val()));
            // 其他
            $("#statement_other_credit").val();
            // 预交租金
            $("#statement_rent_credit").val();
            // 押金
            $("#statement_deposit_credit").val();
        }
        if (conType == "租赁合同") {// 应付
            // 代理费
            $("#statement_agent_debit").val(returnFloat($("#statement_agent").val()));
            // 消费
            $("#statement_costs_debit").val(returnFloat($("#statement_costs").val()));
            // 物品
            $("#statement_goods_debit").val(returnFloat($("#statement_goods").val()));
            // 违约金
            $("#statement_penalty_debit").val(returnFloat($("#statement_penalty").val()));
            // 其他
            $("#statement_other_debit").val();
            // 预交租金
            $("#statement_rent_debit").val();
            // 押金
            $("#statement_deposit_debit").val();
        }
    }
    if (mode == "out") {
        if (conType == "托管合同") { // 应付
            // 代理费
            $("#statement_agent_debit").val(returnFloat($("#statement_agent").val()));
            // 消费
            $("#statement_costs_debit").val(returnFloat($("#statement_costs").val()));
            // 物品
            $("#statement_goods_debit").val(returnFloat($("#statement_goods").val()));
            // 违约金
            $("#statement_penalty_debit").val(returnFloat($("#statement_penalty").val()));
            // 其他
            $("#statement_other_debit").val();
            // 预交租金
            $("#statement_rent_debit").val();
            // 押金
            $("#statement_deposit_debit").val();
        }
        if (conType == "租赁合同") {// 应收
            // 代理费
            $("#statement_agent_credit").val(returnFloat($("#statement_agent").val()));
            // 消费
            $("#statement_costs_credit").val(returnFloat($("#statement_costs").val()));
            // 物品
            $("#statement_goods_credit").val(returnFloat($("#statement_goods").val()));
            // 违约金
            $("#statement_penalty_credit").val(returnFloat($("#statement_penalty").val()));
            // 其他
            $("#statement_other_credit").val();
            // 预交租金
            $("#statement_rent_credit").val();
            // 押金
            $("#statement_deposit_credit").val();
        }
    }
    calBalanceCost(mode, conType);
}

/** 计算结余费用*/
function calBalanceCost(mode, conType) {
    var _agent, _costs, _goods, _penalty, _other, _rent, _deposit;

    // 公司应收：credit、公司应付： debit
    _agent = returnFloat($("#statement_agent_debit:visible").val()) - returnFloat($("#statement_agent_credit:visible").val());
    _costs = returnFloat($("#statement_costs_debit:visible").val()) - returnFloat($("#statement_costs_credit:visible").val());
    _goods = returnFloat($("#statement_goods_debit:visible").val()) - returnFloat($("#statement_goods_credit:visible").val());
    _penalty = returnFloat($("#statement_penalty_debit:visible").val()) - returnFloat($("#statement_penalty_credit:visible").val());
    _other = returnFloat($("#statement_other_debit:visible").val()) - returnFloat($("#statement_other_credit:visible").val());
    _rent = returnFloat($("#statement_rent_debit:visible").val()) - returnFloat($("#statement_rent_credit:visible").val());
    _deposit = returnFloat($("#statement_deposit_debit:visible").val()) - returnFloat($("#statement_deposit_credit:visible").val());

    var _total = _agent + _costs + _goods + _penalty + _other + _rent + _deposit;
    var _total_color = (_total < 0) ? _total_color = "error" : "";

    $("#statement_balance").val(returnFloat(_total));
    $("#statement_balance_box").html("大写：<label class=\"" + _total_color + "\" style='font-weight: bold;'>" + returnToUpperMoney(returnValue(_total).replace("-", "")) + "</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;小写：<label class=\"" + _total_color + "\" style='font-weight: bold;'>" + returnFloat(_total) + "</label>");

    var _total_money = (_total < 0) ? (returnFloat(_total) + "").replace("-", "") : returnFloat(_total);
    if (mode == "in") {
        if (conType == "托管合同") { // 应收
            $("#remarks-box").attr("data-tip", "公司" + (_total >= 0 ? "应收" : "应付") + "客户" + _total_money + "元");
        }
        if (conType == "租赁合同") {// 应付
            $("#remarks-box").attr("data-tip", "公司" + (_total >= 0 ? "应付" : "应收") + "客户" + _total_money + "元");
        }
    }
    if (mode == "out") {
        if (conType == "托管合同") { // 应付
            $("#remarks-box").attr("data-tip", "公司" + (_total >= 0 ? "应付" : "应收") + "客户" + _total_money + "元");
        }
        if (conType == "租赁合同") {// 应收
            $("#remarks-box").attr("data-tip", "公司" + (_total >= 0 ? "应收" : "应付") + "客户" + _total_money + "元");
        }
    }
}

/** 上一页*/
function prevPage(obj) {
    var hash = $(obj).attr("data-hash");
    window.location.hash = hash;
    UrlPosition(hash);
}

/** 下一页/提交 */
function nextPage(obj) {
    var hash = $(obj).attr("data-hash");
    if (hash != "#done") {
        window.location.hash = hash;
        if (hash == "#step2" && getUrlParam("mode") == "review") {
            var _remarks_tip = $("#remarks-box").attr("data-tip");

            var data = {};
            // 结算单
            var statement = {};
            statement.statement_code = returnValue(statement_code);
            statement.statement_balance = $("#statement_balance").val();
            statement.statement_remarks = $("#statement_remarks").val();
            data.statement = JSON.stringify(statement);

            // 【结算消费项目清单】
            var statementCostItemsList = new Array();
            // 违约金
            $("[data-type=违约金]:visible").each(function () {
                var _type = $(this).attr("data-type");
                var _name = $(this).attr("data-name");
                if (isEmpty(_name)) {
                    return;
                }
                var statementCostItems = {};
                statementCostItems.sci_type = _type;
                statementCostItems.sci_itemName = _name;
                statementCostItems.sci_unitPrice = returnFloat($(this).find("input[name=sci_unitPrice]").val());
                statementCostItems.sci_number = returnFloat($(this).find("input[name=sci_number]").val());
                statementCostItems.sci_desc = $(this).find("input[name=sci_desc]").val();
                statementCostItems.sci_totalCosts = $(this).find("input[name=sci_totalCosts]").val();
                statementCostItemsList.push(statementCostItems);
            });
            data.statementCostItemsList = JSON.stringify(statementCostItemsList);

            // 【消费结余】
            var statementBalanceList = new Array();
            $("[data-type=结余]:visible").each(function () {
                var _name = $(this).attr("data-name");
                if (isEmpty(_name)) {
                    return;
                }
                var statementBalance = {};
                statementBalance.csb_type = _name;
                statementBalance.csb_credit = $(this).find("input[name=csb_credit]").val();
                statementBalance.csb_debit = $(this).find("input[name=csb_debit]").val();
                statementBalance.csb_desc = $(this).find("input[name=csb_desc]").val();
                statementBalanceList.push(statementBalance);
            });
            data.statementBalanceList = JSON.stringify(statementBalanceList);

            // 提交
            $.ajax({
                type: "POST",
                url: "/contractObject/updateContractStatementBalance",
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                    $.jBox.tip("数据保存中...", 'loading');
                }
            }).done(function (result) {
                if (result.code != 200) {
                    $.jBox.tip(result.msg, "error");
                    return;
                }
                $.jBox.closeTip();
                UrlPosition(hash);
            });
        } else {
            UrlPosition(hash);
        }
    } else {
        var boo = true;
        $(".form-control[required]:visible").each(function () {
            if (isEmpty($(this).val())) {
                $(this).msg("不能为空");
                boo = false;
                return false;
            }
        });
        if (!boo) return;

        if (!review && $("[name=result]:checked").val().indexOf("未通过") == -1) {
            alert("请把【红色】合同账单付款完毕后再提交复核");
            return;
        }

        $.ajax({
            type: "POST",
            url: "/contractObject/auditingSubmit",
            data: {
                con_code: returnValue(con_code),
                processMode: $(".form-control[name=auditing-way] option:selected").val(),
                processResult: $("input[name=result]:checked").val(),
                cco_content: $(".form-control[name=auditing-desc]:visible").val()
            },
            dataType: "json"
        }).done(function (result) {
            if (result.code == 200) {
                $.jBox.prompt("提交成功", "提示", "success", {
                    closed: function () {
                        window.location.href = "/houseLibrary/houseLibrary";
                    }
                });
            } else {
                $.jBox.tip(result.msg, "error");
            }
        });
    }
}

/** 查询客户信息*/
function queryCustomerInfo(id) {
    $.ajax({
        type: "POST",
        url: "/contractObject/queryCustomerInfo",
        data: {
            con_code: con_code
        },
        dataType: "json"
    }).done(function (result) {
        switch (result.code) {
            case 200:
                var data = result.data;
                if (!isEmpty(data)) {
                    $("#cco_applicant").html("");
                    $.each(data, function (index, data) {
                        var role = "";
                        if (conType == "托管合同") {
                            switch (data.crc_role) {
                                case 0:
                                    role = "房东";
                                    break;
                                case 1:
                                    role = "联系人";
                                    break;
                            }
                        }
                        if (conType == "租赁合同") {
                            switch (data.crc_role) {
                                case 0:
                                    role = "租客";
                                    break;
                                case 1:
                                    role = "室友";
                                    break;
                            }
                        }
                        $("#cco_applicant").append('<option value="' + data.cc_id + '" ' + (returnNumber(id) == data.cc_id ? "selected" : "") + '>' + role + ' - ' + returnValue(data.cc_name) + ' - ' + returnValue(data.ccp_phone) + '</option>').attr("data-id", (returnNumber(id) == data.cc_id ? data.cc_id : ""));
                    });
                    $("#cco_applicant").append('<option value="-1">添加</option>');
                    $("select").niceSelect("update");
                }
                break;
            default :
                break;
        }
    });
}