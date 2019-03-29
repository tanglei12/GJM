var so_id = -1;

$(function () {
    // 加载数据
    load_data();
});

/**
 * 加载数据
 */
function load_data() {
    $.table({
        // 时间筛选
        filterDateParams: [
            {name: "发布时间", value: "am_release_time", sort: 'DESC'},
            {name: "开始时间", value: "am_start_time", sort: 'DESC'},
            {name: "结束时间", value: "am_end_time", sort: 'DESC'},
            {name: "创建时间", value: "am_create_time", sort: 'DESC'}
        ],
        // 选项筛选
        filterBars: [],
        // 列表参数
        listParams: [
            {text: "活动主题", name: "am_title", param: "", func: {type: "onclick", name: "$.table.popupOpen(this)"}},
            {text: "活动描述", name: "am_description"},
            {text: "活动类型", name: "am_type", param: "returnActivityType"},
            {text: "活动状态", name: "am_state", param: "returnActivityState"},
            {text: "发布时间", name: "am_release_time", param: "time"},
            {text: "开始时间", name: "am_start_time", param: "time"},
            {text: "结束时间", name: "am_end_time", param: "time"},
        ],
        // 请求参数
        ajaxParams: {
            url: "/activity/queryActivityPageList",
            data: {}
        },
        popup: {
            result: function (box, _data) {
                load_service_popup(box.main, _data);
            }
        }
    });
}

/**
 * 加载服务弹出层
 *
 * @param box
 * @param _data
 */
function load_service_popup(box, _data) {
    box.css({
        display: "flex",
        flexDirection: "column",
        overflowY: "hidden"
    });
    so_id = _data.so_id;
    $.ajax({
        type: "POST",
        url: "/activity/queryActivityInfo",
        data: {
            am_id: _data.am_id
        },
        dataType: "json"
    }).done(function (result) {
        if (result.code != 200) return;

        var activity = result.data.activityManageVo || "";
        var activityImages = result.data.activityImageVos || "";
        var coverimage = "";
        var thumbnail = "";
        $(activityImages).each(function (index, img) {
            if (img.ai_type == 1) {
                coverimage += "<img class='showboxImg' style='width: 110px; height: 110px;' src='" + returnValue(img.ai_image_url) + "' data-url='" + returnValue(img.ai_image_url) + "'>";
            } else if (img.ai_type == 2) {
                thumbnail += "<img class='showboxImg' style='width: 110px; height: 110px;' src='" + returnValue(img.ai_image_url) + "' data-url='" + returnValue(img.ai_image_url) + "'>";
            }
        });

        var html = '';
        html += '<div class="popup-list" style="padding: 0 0 6px 0">';
        html += '   <div style="font-size: 16px;font-weight: bold;line-height: 30px;"><a href="">' + returnValue(activity.am_title) + '</a></div>';
        html += '   <dl style="font-size: 12px;line-height: 1.4em"><dt class="next">NO.' + returnValue(activity.am_code) + '</dt><input type="hidden" id="am_code" value="' + returnValue(activity.am_code) + '"></dl>';
        html += '</div>';
        html += '';
        html += '<div class="popup-list">';
        html += '   <dl><dt>活动渠道</dt><dd style="min-width: 200px;">' + returnActivityChannel(activity.am_channel).text + '</dd><dt style="margin-left: 30px;">活动类型</dt><dd class="">' + returnActivityType(activity.am_type).text + '</dd></dl>';
        html += '   <dl><dt>活动描述</dt>';
        html += '       <dd>' + returnValue(activity.am_description) + '</dd>';
        html += '   </dl>';
        html += '   <dl>';
        html += '      <dt>活动状态</dt>';
        html += '      <dd style="min-width: 200px;">' + returnActivityState(activity.am_state).text + '</dd>';
        html += '   </dl>';
        html += '   <dl>';
        html += '      <dt>开始时间</dt>';
        html += '      <dd style="min-width: 200px;">' + returnTime(activity.am_start_time) + '</dd>';
        html += '      <dt style="margin-left: 30px;">结束时间</dt>';
        html += '      <dd>' + returnTime(activity.am_end_time) + '</dd>';
        html += '   </dl>';
        html += '   <dl><dt>发布时间</dt><dd style="min-width: 200px;">' + returnTime(activity.am_release_time) + '</dd><dt style="margin-left: 30px;">创建时间</dt><dd>' + returnTime(activity.am_create_time) + '</dd></dl>';
        html += '   <dl>';
        html += '   <dt>活动图片</dt>';
        html += '       <div>';
        html += '       <dd>';
        html += '          <div class="step-record-head">';
        html += '               <button class="next-bg-bd-w img-btn" style="margin: 0 0;" name="imageBtn2" data-value="1">封面图</button>';
        html += '               <button class="next-bg-bd-w img-btn"" style="margin: 0 10px;" name="imageBtn2" data-value="2">缩略图</button>';
        html += '          </div>';
        html += '       </dd>';
        html += '       <dd style="margin-top: 15px;">';
        html += '           <div id="coverImageUpload2" class="images-box-img" style="display: none;">' + coverimage + '</div>';
        html += '           <div id="thumbnailUpload2" class="images-box-img" style="display: none;">' + thumbnail + '</div>';
        html += '       </dd>';
        html += '       </div>';
        html += '   </dl>';
        html += '</div>';
        html += '';
        html += '<div class="popup-list popup-step" style="flex:1;flex-direction: row">';
        html += '   <div class="popup-step-content" id="step-content" style="padding: 0;"></div>';
        // html += '   <div class="popup-step-record" id="step-record"></div>';
        html += '</div>';
        box.html(html);

        $("#am_code").data("data", activity);

        $("button[name=imageBtn2]").on("click", function () {
            if ($(this).hasClass("state-check")) {
                $(this).removeClass("state-check");
                $("#thumbnailUpload2").hide();
                $("#coverImageUpload2").hide();
            } else {
                $(this).addClass("state-check").siblings().removeClass("state-check");
            }
            if ($(this).attr("data-value") == "1") {
                $("#coverImageUpload2").show();
                $("#thumbnailUpload2").hide();
            } else if ($(this).attr("data-value") == "2") {
                $("#thumbnailUpload2").show();
                $("#coverImageUpload2").hide();
            }
        });

        load_prize_list(result.data.activityPrizeVos);

        // 关闭刷新特效
        $.popupRefreshClose();
    });
}

/** 跳转添加活动 */
function jumpAddActivity() {
    window.parent.href_mo('/activity/addActivity', '添加活动', '活动维护');
}

/** 跳转编辑活动 */
function jumpEditActivity() {
    var data = $("[name=table-checkbox]:checked").data("data");
    if (isEmpty(data)) {
        $.hint.tip("请选择一条数据", "error");
        return;
    }
    window.parent.href_mo('/activity/editActivity?am_id=' + data.am_id, '添加活动', '活动维护');
}

function load_prize_list(activityPrizeVos) {

    if (isEmpty(activityPrizeVos) || undefined == activityPrizeVos) {
        // return;
    }

    var content = $("#step-content");

    var html = "";
    html += "<dl>";
    html += "<dt><label class='step-head-title' style='font-size: 14px;color: #000000'>奖品信息</label><button id='' class='item-box-main-option fa-plus' title='添加奖品信息' onclick='editPrize()'></button></dt>";
    html += "<dd>";
    var trHtml = "";
    $(activityPrizeVos).each(function (index, data) {
        trHtml += "<tr>";
        trHtml += "    <td>" + returnValue(data.ap_name) + "</td>";
        trHtml += "    <td>" + returnValue(data.ap_odds) + "</td>";
        trHtml += "    <td>" + returnApType(returnNumber(data.ap_type)).text + "</td>";
        trHtml += "    <td>" + (returnNumber(data.ap_remaining_number) == -1 ? "不限" : returnNumber(data.ap_remaining_number)) + "</td>";
        trHtml += "    <td>" + (returnNumber(data.ap_total_number) == -1 ? "不限" : returnNumber(data.ap_total_number)) + "</td>";
        trHtml += "    <td><input type='hidden' value='" + returnNumber(data.ap_id) + "'><i class='icon-activity-edit fa-pencil' title='编辑奖品信息' onclick='editPrize(" + returnNumber(data.ap_id) + ")'></i></td>";
        trHtml += "</tr>";
    });
    if (!isEmpty(trHtml)) {
        html += "<div class='pd-main-list custom-scroll custom-scroll-w2' style='height: 450px;'><table style='border-collapse: collapse;width: 600px;' class='tableBill'><thead><th>奖品名称</th><th>中奖率</th><th>奖品类型</th><th>剩余数量</th><th>奖品总数</th><th>操作</th></thead><tbody>" + trHtml + "</tbody></table></div>";
    }
    html += "</dd>";
    html += "</dl>";
    content.html(html);
}

function loadHtml(box, activity, data) {

    var prize = !isEmpty(data) ? data.activityPrizeVo : "";
    activity = activity || "";
    var ap_type = prize.ap_type || "";
    var am_type = activity.am_type;
    var prizeImageVoList = !isEmpty(data) ? data.prizeImageVoList : "";

    var html = "";
    html += "<div style='margin-top: 10px;'>";
    html += "   <input type='hidden' name='ap_id' value='" + returnNumber(prize.ap_id) + "'>";
    html += "   <dl class='input-layout-dl'>";
    html += "       <dt>奖品类型：</dt>";
    html += "       <dd><select name='ap_type'><option value='1'>虚拟</option><option value='2'>实物</option></select></dd>";
    html += "   </dl>";
    html += "   <dl class='input-layout-dl' id='prDl' style='display: none;'>";
    html += "       <dt>产品名称：</dt>";
    html += "       <dd><input name='pr_sn' placeholder='产品名称' data-value='" + returnValue(prize.pr_sn) + "' value='" + returnValue(prize.pr_name) + "'></dd>";
    html += "   </dl>";
    html += "   <dl class='input-layout-dl' id='uccfgDl' style='" + (returnNumber(am_type) != 1003 && returnNumber(ap_type) == 1 ? "" : "display: none;") + "'>";
    html += "       <dt>优惠券：</dt>";
    html += "       <dd><input name='uccfg_code' placeholder='优惠券名称' data-value='" + returnValue(prize.uccfg_code) + "' value='" + returnValue(prize.uccfg_name) + "'></dd>";
    html += "   </dl>";
    html += "   <dl class='input-layout-dl'>";
    html += "       <dt>奖品名称：</dt>";
    html += "       <dd><input name='ap_name' value='" + returnValue(prize.ap_name) + "'></dd>";
    html += "   </dl>";
    html += "   <dl class='input-layout-dl'>";
    html += "       <dt>奖品描述：</dt>";
    html += "       <dd><textarea name='ap_description'>" + returnValue(prize.ap_description) + "</textarea></dd>";
    html += "   </dl>";
    html += "   <dl class='input-layout-dl'>";
    html += "       <dt>获取方式：</dt>";
    html += "       <dd><select name='ap_way'><option value='1'>抽奖</option><option value='2'>赠送</option></select></dd>";
    html += "   </dl>";
    html += "   <dl class='input-layout-dl zs_more'>";
    html += "       <dt>赠送金额：</dt>";
    html += "       <dd><input name='ap_value' class='money' value='" + returnFloat(prize.ap_value) + "' maxlength='11'><label style='margin-left: 4px;'>元</label></dd>";
    html += "   </dl>";
    html += "   <dl class='input-layout-dl'>";
    html += "       <dt>奖品数量：</dt>";
    html += "       <dd style='display: flex;'><input name='ap_total_number' class='number' class='' data-value='" + returnValue(prize.ap_total_number) + "' placeholder='奖品数量' value='" + returnValue(prize.ap_total_number) + "'><label class='common-checkbox' name='noNumber' style='left: 5px; top: 5px;'>不限</label></dd>";
    html += "   </dl>";
    html += "   <dl class='input-layout-dl'>";
    html += "       <dt>用户获奖限制：</dt>";
    html += "       <dd style='display: flex;'><input name='ap_user_limit' class='number' data-value='" + returnValue(prize.ap_user_limit) + "' placeholder='用户限制' value='" + returnValue(prize.ap_user_limit) + "'><label class='common-checkbox' name='ap_user_limit_checkbox' style='left: 5px; top: 5px;'>不限</label></dd>";
    html += "   </dl>";
    html += "   <dl class='input-layout-dl cj_more'>";
    html += "       <dt>中奖率：</dt>";
    html += "       <dd><input class='' name='ap_odds' class='money' value='" + returnValue(prize.ap_odds) + "'></dd>";
    html += "   </dl>";
    html += "   <dl class='input-layout-dl cj_more'>";
    html += "       <dt>角度：</dt>";
    html += "       <dd><input class='' name='ap_andgle' value='" + returnFloat(prize.ap_andgle) + "'></dd>";
    html += "   </dl>";
    html += "   <dl class='input-layout-dl'>";
    html += "       <dt>奖品图片：</dt>";
    html += "       <div>";
    html += "       <dd>";
    html += '           <div class="step-record-head">';
    // html += "               <button class='next-bg-bd-w img-btn' style='margin: 0 0px;' name='imageBtn' data-value='1'>封面图</button>";
    // html += "               <button class='next-bg-bd-w img-btn' style='margin: 0 10px;' name='imageBtn' data-value='2'>缩略图</button>";
    html += '           </div>';
    html += "       </dd>";
    html += "       <dd style=''>";
    // html += "           <div id='coverImageUpload' ></div>";
    html += "           <div id='thumbnailUpload'></div>";
    html += "       </dd>";
    html += "       </div>";
    html += "   </dl>";
    html += "   <dl class='input-layout-dl'>";
    html += "       <dt>是否启用：</dt>";
    html += "       <dd style='display: flex;'>";
    html += "           <label class='common-checkbox common-checkbox-checked' data-value='1' style='left: 5px; top: 5px;'>";
    html += "              <input type='radio' name='is_used' value='1' checked>启用";
    html += "           </label>";
    html += "           <label class='common-checkbox' data-value='0' style='left: 30px; top: 5px;'>";
    html += "              <input type='radio' name='is_used' value='0'>关闭";
    html += "           </label>";
    html += "       </dd>";
    html += "   </dl>";
    html += "   <dl class='input-layout-dl'>";
    html += "       <dt></dt>";
    html += "       <dd><button class='next-bg' name='submit'>提交</button></dd>";
    html += "   </dl>";
    html += "</div>";
    box.html(html);

    // 充值活动初始化
    if (am_type == 1003) {
        // 奖品类型默认虚拟奖品，不可选择
        $("[name=ap_type]").val(1).attr("disabled", "disabled");
        // 产品名称显示
        $("#prDl").show();
    }

    if (!isEmpty(prize)) {
        $("[name=ap_type]").val(prize.ap_type);
        $("[name=ap_way]").val(prize.ap_way);
    }

    if (returnNumber(prize.ap_total_number) == -1) {
        $("[name=ap_total_number]").val("数量不限").attr("disabled", "disabled");
        $("[name=noNumber]").addClass("common-checkbox-checked");
    }

    if (returnNumber(prize.ap_user_limit) == -1) {
        $("[name=ap_user_limit]").val("数量不限").attr("disabled", "disabled");
        $("[name=ap_user_limit_checkbox]").addClass("common-checkbox-checked");
    }

    // 是否启用
    $("[name=is_used]").removeAttr("checked").parent().removeClass("common-checkbox-checked");
    $("[name=is_used][value="+ returnNumber(prize.is_used) +"]").attr("checked", "checked").parent().addClass("common-checkbox-checked");

    if (am_type != 1003 && returnNumber($("[name=ap_type]").val()) == 1) {
        $("#uccfgDl").show();
    } else {
        $("#uccfgDl").hide();
    }

    $("input[name=ap_total_number]").on("input propertychange", function () {
        if (isNaN($(this).val())) {
            $("input[name=ap_total_number]").msg("请输入整数");
        }
    });

    $("[name=noNumber]").on("click", function () {
        if ($(this).hasClass("common-checkbox-checked")) {
            $(this).removeClass("common-checkbox-checked");
            $("[name=ap_total_number]").val("").removeAttr("disabled").focus();
        } else {
            $(this).addClass("common-checkbox-checked");
            $("[name=ap_total_number]").val("数量不限").attr("disabled", "disabled");
        }
    });

    $("[name=ap_user_limit_checkbox]").on("click", function () {
        if ($(this).hasClass("common-checkbox-checked")) {
            $(this).removeClass("common-checkbox-checked");
            $("[name=ap_user_limit]").val("").removeAttr("disabled").focus();
        } else {
            $(this).addClass("common-checkbox-checked");
            $("[name=ap_user_limit]").val("数量不限").attr("disabled", "disabled");
        }
    });

    $("[name=pr_sn]").RechargeSearch({
        placeholder: "产品名称",
        top: 123,
        left: 120,
        result: function (rlt) {
            console.log(rlt);
            var data = $(rlt).data("data");
            $("[name=ap_name]").val(returnValue(data.pr_name));
        }
    });

    $("[name=uccfg_code]").RechargeConfigSearch({
        placeholder: "优惠券名称",
        top: $("[name=pr_sn]").is(":hidden") ? 123 : 165,
        left: 120,
        result: function (rlt) {
            console.log(rlt);
            var data = $(rlt).data("data");
            $("[name=ap_name]").val(returnValue(data.uccfg_name));
        }
    });

    // 加载图片插件
    // $("#coverImageUpload").imageUpload({
    //     width: 110,
    //     height: 110,
    //     uploadType: 'advertisement'
    // });

    // 加载图片插件
    $("#thumbnailUpload").imageUpload({
        width: 110,
        height: 110,
        uploadType: 'advertisement'
    });

    $("select[name=ap_type]").on("change", function () {
        if (am_type == 1003 && returnNumber($(this).val()) == 1) {
            $("#prDl").show();
        } else {
            $("#prDl").hide();
        }
        if (am_type != 1003 && returnNumber($(this).val()) == 1) {
            $("#uccfgDl").show();
        } else {
            $("#uccfgDl").hide();
        }
    });

    // 【方法】改变获奖方式
    var change_get_way = function () {
        switch ($("[name=ap_way]").val()) {
            case "1": // 抽奖
                $(".cj_more").show();
                $(".zs_more").hide();
                break;
            case "2": // 赠送
                $(".zs_more").show();
                $(".cj_more").hide();
                break;
        }
    };
    // 初始化
    change_get_way();

    // 【事件】改变获奖方式
    $("[name=ap_way]").on("change", function () {
        change_get_way();
    });

    $("button[name=imageBtn]").on("click", function () {
        if ($(this).hasClass("state-check")) {
            $(this).removeClass("state-check");
        } else {
            $(this).addClass("state-check").siblings().removeClass("state-check");
        }
        if ($(this).attr("data-value") == "1") {
            $("#coverImageUpload").show();
            $("#thumbnailUpload").hide();
        } else if ($(this).attr("data-value") == "2") {
            $("#thumbnailUpload").show();
            $("#coverImageUpload").hide();
        }
    });

    if (!isEmpty(prizeImageVoList)) {
        var thumbnail = "";
        $(prizeImageVoList).each(function (index, item) {
            if (returnNumber(item.aip_type) == 2) {
                thumbnail += "<div class='image-item' style='width: 110px; height: 110px;'><img class='image-item-img' src='" + returnValue(item.aip_path_url) + "' data-url='" + returnValue(item.aip_path) + "' data-preview-src='' data-preview-group='1'><span class='image-item-close' title='删除照片' onclick='deleteImg(this)'>X</span><div class='image-item-wait' style='display: none;'></div>";
            }
        });
        if (!isEmpty(thumbnail)) {
            $("#thumbnailUpload .image-item-add").before(thumbnail);
        }
    }

    var search_list = [
        {text: "活动主题", name: "am_title"},
        {text: "活动状态", name: "am_state"},
    ];

    $("[name=submit]").on("click", function () {
        var data = {};
        var prize = {};
        var prizeImage = [];
        prize.ap_id = $("input[name=ap_id]").val();
        prize.am_code = $("#am_code").val();

        var ap_name = $("input[name=ap_name]").val();
        if (isEmpty(ap_name)) {
            $("input[name=ap_name]").msg("请输入活动名称");
            return;
        }
        prize.ap_name = ap_name;

        var ap_description = $("textarea[name=ap_description]").val();
        // if(isEmpty(ap_description)){
        //     $("textarea[name=ap_description]").msg("请输入奖品描述");
        //     return;
        // }
        prize.ap_description = ap_description;

        var ap_odds = $("input[name=ap_odds]").val();
        if (isEmpty(ap_odds)) {
            $("input[name=ap_odds]").msg("请输入奖品中奖率");
            return;
        }
        prize.ap_odds = ap_odds;

        prize.ap_type = returnNumber($("[name=ap_type]").val());
        prize.ap_way = returnNumber($("[name=ap_way]").val());
        prize.ap_value = returnFloat($("[name=ap_value]").val());

        // 奖品数量
        var ap_total_number = $("[name=noNumber]").hasClass("common-checkbox-checked") ? -1 : $("input[name=ap_total_number]").val();
        if (isEmpty(ap_total_number)) {
            $("input[name=ap_total_number]").msg("请输入奖品总数量");
            return;
        }
        if (isNaN(ap_total_number)) {
            $("input[name=ap_total_number]").msg("请输入数字");
        }
        prize.ap_total_number = ap_total_number;
        prize.ap_remaining_number = ap_total_number;

        // 用户获奖限制
        var ap_user_limit = $("[name=ap_user_limit_checkbox]").hasClass("common-checkbox-checked") ? -1 : $("[name=ap_user_limit]").val();
        if (isEmpty(ap_user_limit)) {
            $("[name=ap_user_limit]").msg("请输入用户获奖限制");
            return;
        }
        prize.ap_user_limit = ap_user_limit;

        var ap_andgle = $("input[name=ap_andgle]").val();
        if (isEmpty(ap_andgle)) {
            $("input[name=ap_andgle]").msg("请输入奖品展示角度");
            return;
        }
        prize.ap_andgle = ap_andgle;

        if (returnNumber(am_type) == 1003 && returnNumber($("select[name=ap_type]").val()) == 1) {
            var pr_sn = isEmpty($("[name=pr_sn]").data("data")) ? $("[name=pr_sn]").attr("data-value") : $("[name=pr_sn]").data("data").pr_sn;
            if (isEmpty(pr_sn)) {
                $("[name=pr_sn]").msg("请选择产品");
                return;
            }
            prize.pr_sn = pr_sn;
        }

        if (returnNumber(am_type) != 1003 && returnNumber($("select[name=ap_type]").val()) == 1) {
            var uccfg_code = isEmpty($("[name=uccfg_code]").data("data")) ? $("[name=uccfg_code]").attr("data-value") : $("[name=uccfg_code]").data("data").uccfg_code;
            if (isEmpty(uccfg_code)) {
                $("[name=uccfg_code]").msg("请选择优惠券");
                return;
            }
            prize.uccfg_code = uccfg_code;
        }

        prize.is_used = $("[name=is_used]:checked").val();

        data.activity = JSON.stringify(prize);

        // if($("#coverImageUpload img").length <= 0){
        //     $.hint.tip("请上传封面图", "error");
        //     return;
        // }
        // $("#coverImageUpload img").each(function () {
        //     var coverimage = {};
        //     coverimage.aip_type = 1;
        //     coverimage.aip_path = $(this).attr("data-url");
        //     prizeImage.push(coverimage);
        // });

        if ($("#thumbnailUpload img").length <= 0) {
            $.hint.tip("请上传缩略图", "error");
            return;
        }
        $("#thumbnailUpload img").each(function () {
            var thumbnail = {};
            thumbnail.aip_type = 2;
            thumbnail.aip_path = $(this).attr("data-url");
            prizeImage.push(thumbnail);
        });

        data.prizeImage = JSON.stringify(prizeImage);

        $.ajax({
            type: "POST",
            url: "/activity/saveActivityPrize",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result.code != 200) return $.hint.tip(result.msg, "error");
                $.hint.tip("奖品信息保存成功", "success");
                // 刷新
                $.popupSideViewClose();
                $.popupRefresh();
            }
        });
    });
}

function deleteImg(obj) {
    var _this = $(obj);
    var type = _this.parent().find(".image-item-img").attr("data-type");
//	if(type == "page"){
//		$.jBox.tip("封面图片不能删除", "waring");
//		return;
//	}
    $.hint.confirm("确定要删除该图片吗？", function () {
        $.ajax({
            type: "POST",
            url: "/customer/deleteImage",
            data: {
                id: _this.attr("data-id"),
                imgUrl: _this.parent().find(".image-item-img").attr("data-url"),
            },
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            success: function (result) {
                switch (result.code) {
                    case 200:
                        $("#imageNum").val($("#imageNum").val() - 1);
                        $("#imageNumEnd").val(-1);
                        $.hint.tip('删除成功', 'success');
                        _this.parents(".image-item").fadeOut().remove();
                        break;
                    default:
                        $.hint.tip(result.msg, 'error');
                        break;
                }
            }
        });
    });
}

/**
 * 活动渠道
 * @param param
 * @returns {{}}
 */
function returnActivityChannel(param) {
    var data = {};
    data.list = {
        1100: "ERP",
        1101: "ERP_APP",
        1102: "ERP_PC",
        1200: "USER",
        1201: "USER_APP",
        1202: "USER_PC",
    };
    data.text = data.list[param];
    switch (param) {
        case 1100 :
        case 1101 :
        case 1102 :
            data.style = "next";
            break;
        case 1200 :
        case 1201 :
        case 1202 :
            data.style = "ok";
            break;
    }
    return data;
}

/**
 * 活动状态
 * @param param
 * @returns {{}}
 */
function returnActivityState(param) {
    var data = {};
    data.list = {
        1: "开启",
        2: "关闭",
    };
    data.text = data.list[param];
    switch (param) {
        case 2 :
            data.style = "next";
            break;
        case 1 :
            data.style = "ok";
            break;
    }
    return data;
}

/**
 * 活动状态
 * @param param
 * @returns {{}}
 */
function returnActivityType(param) {
    var data = {};
    data.list = {
        1001: "新人活动",
        1002: "抽奖活动",
        1003: "充值活动",
    };
    data.text = data.list[param];
    switch (param) {
        case 1001 :
        case 1002 :
        case 1003 :
            data.style = "ok";
            break;
    }
    return data;
}

/**
 * 奖品类型
 * @param param
 * @returns {{}}
 */
function returnApType(param) {
    var data = {};
    data.list = {
        1: "虚拟",
        2: "实物",
    };
    data.text = data.list[param];
    switch (param) {
        case 2 :
            data.style = "next";
            break;
        case 1 :
            data.style = "ok";
            break;
    }
    return data;
}

function editPrize(ap_id) {

    var activity = $("#am_code").data("data") || "";

    $.popupSideView({
        title: "奖品维护",
        mode: "right",
        wh: "50%",
        done: function (box) {
            if (isEmpty(ap_id)) {
                loadHtml(box, activity);
            } else {
                $.ajax({
                    type: "POST",
                    url: "/activity/queryActivityPrizeInfo",
                    data: {
                        ap_id: ap_id,
                    },
                    dataType: "json",
                    success: function (result) {
                        if (result.code != 200) return $.hint.tip(result.msg, "error");
                        loadHtml(box, activity, result.data);
                    }
                });
            }
        }
    });
}

$.fn.RechargeSearch = function (options) {
    return this.each(function () {
        var _this = $(this);
        var _obj = this;

        var defaults = {
            placeholder: "",
            result: function (obj) {
            }
        };
        var opts = $.extend(defaults, options);

        this.init = function () {
            this.createHTML();
        };

        /* 生成html*/
        this.createHTML = function () {
            var html = "";
            html += '<div id="search-box" style="position: absolute; top: 34px;left: 0;">';
            html += '  <div class="search-head">';
            html += '		<i class="fa-search"></i>';
            html += '		<input type="text" id="search-text1" placeholder="' + opts.placeholder + '" style=" background: #fff;">';
            html += '  </div>';
            html += '  <div class="search-list">';
            html += '  	<table>';
            html += '        <thead>';
            html += '            <tr class="search-item">';
            html += '                <th style="width: 42px;">#</th>';
            html += '                <th>充值名称</th>';
            html += '                <th>充值数值</th>';
            html += '                <th>产品状态</th>';
            html += '            </tr>';
            html += '        </thead>';
            html += '        <tbody id="search-listBox1"></tbody>';
            html += '		</table>';
            html += '  </div>';
            html += '  <div class="search-foot">';
            html += '		<button class="foot-left fa-angle-left" id="pageUp"></button>';
            html += '		<input type="text" class="foot-left number" id="pageNo" value="1">';
            html += '		<button class="foot-left fa-angle-right" id="pageDown"></button>';
            html += '  	<div class="foot-right">共<span id="totalPage1">0</span>页，<span id="totalRecords1">0</span>条记录</div>';
            html += '	 </div>';
            html += '</div>';
            _this.after(html);
            this.addEvent();
        };
        /* 绑定事件*/
        this.addEvent = function () {
            var _box = $("#search-box");
            var _text = $("#search-text1");
            var _list = $(".search-list");
            var eindex = -1;

            // 文本框获取焦点
            _this.on("focus", function () {
                if (_box.is(":hidden")) {
                    _box.slideDown(100);
                    _text.focus();
                    _obj.queryPropertyInfoList();
                    $("#search-box2").slideUp(100);
                }
            });
            _this.on("click", function (e) {
                if (_box.is(":hidden")) {
                    _box.slideDown(100);
                    _text.focus();
                }
                e.stopPropagation();
            });
            // 上一页
            $("#pageUp").on("click", function () {
                var pageNo = returnNumber($("#pageNo").val());
                if (pageNo <= 1) {
                    return;
                }
                var totalPage = returnNumber($("#totalPage1").text());
                if (pageNo > totalPage) {
                    $("#pageNo").val(totalPage);
                } else {
                    $("#pageNo").val(pageNo - 1);
                }
                _obj.queryPropertyInfoList();
            });
            // 下一页
            $("#pageDown").on("click", function () {
                var pageNo = returnNumber($("#pageNo").val());
                var totalPage = returnNumber($("#totalPage1").text());
                if (pageNo >= totalPage) {
                    return;
                }
                $("#pageNo").val(pageNo + 1);
                _obj.queryPropertyInfoList();
            });
            // 跳转
            $("#pageNo").on("keyup", function (e) {
                switch (e.keyCode) {
                    case 13:
                        var pageNo = returnNumber($("#pageNo").val());
                        var totalPage = returnNumber($("#totalPage1").text());
                        if (pageNo > totalPage) {
                            $("#pageNo").val(returnNumber($("#totalPage1").text()));
                        } else if (pageNo < 1) {
                            $("#pageNo").val(1);
                        } else {
                            $("#pageNo").val(pageNo);
                        }
                        ;
                        _obj.queryPropertyInfoList();
                        break;
                    case 38:
                        $("#pageUp").click();
                        break;
                    case 40:
                        $("#pageDown").click();
                        break;
                }
            });
            // 文本框绑定事件
            _text.on("input propertychange", function () {
                $("#pageNo").val(1);
                _obj.queryPropertyInfoList();
            });

            $('#search-box .fa-search').on("click", function () {
                _obj.queryPropertyInfoList();
            });

            // 绑定上下按键事件
            _text.on("keyup", function (e) {
                var _item = $('#search-listBox1 .search-item');
                switch (e.keyCode) {
                    case 13:
                        $(".search-item" + eindex).click();
                        eindex = -1;
                        _obj.queryPropertyInfoList();
                        break;
                    case 38:
                        eindex--;
                        if (eindex < 0) {
                            eindex = _item.length - 1;
                        }
                        _item.removeClass("item-hover").eq(eindex).addClass("item-hover");
                        break;
                    case 40:
                        eindex++;
                        if (eindex >= _item.length) {
                            eindex = 0;
                        }
                        _item.removeClass("item-hover").eq(eindex).addClass("item-hover");
                        break;
                }
            });
            // 绑定点击不隐藏事件
            $("#search-box").on("click", function (e) {
                e.stopPropagation();
            });
            $(document).on("click", function (e) {
                $("#search-list,#search-box").slideUp(100);
            });
        };
        this.queryPropertyInfoList = function () {
            $.ajax({
                type: "POST",
                url: "/product/queryProductRechargeList",
                data: {
                    where: $("#search-text1").val().trim(),
                    pageNo: returnNumber($("#pageNo").val()),
                    pageSize: 10
                },
                dataType: "json"
            }).done(function (result) {
                if (result.code == 200) {
                    var _body = $("#search-listBox1");
                    if (result.data.list.length <= 0) {
                        _body.html('<tr><td colspan="99" style="text-align: center;height: 60px;">没有数据</td></tr>');
                        $("#totalPage1").text(0);
                        $("#totalRecords1").text(0);
                        return;
                    }
                    _body.empty();
                    $.each(result.data.list, function (index, data) {
                        // 加载列表数据
                        _body.append('<tr class="search-item search-item' + index + '">' + '<td style="width: 42px;">' + (index + 1) + '</td>' + '<td>' + returnValue(data.pr_name) + '</td>' + '<td>' + returnValue(data.pr_price) + '</td>' + '<td>' + returnPrStatus(data.pr_status).text + '</td>' + '</tr>');

                        // 点击单个列表数据 TODO
                        $(".search-item" + index).on("click", function () {
                            var _data = $(this).data("data");
                            _this.val(_data.pr_name).data("data", _data);
                            opts.result(_this);

                            eindex = -1;
                            $("#search-list, #search-box").slideUp(100);
                        }).data("data", data);
                    });
                    $(".search-list").show();
                    $("#totalPage1").text(result.data.totalPage);
                    $("#totalRecords1").text(result.data.totalRecords);
                } else {
                    _body.html('<tr><td colspan="99" style="text-align: center;height: 60px;">没有数据</td></tr>');
                    $("#totalPage1").text(0);
                    $("#totalRecords1").text(0);
                }
            });
        };
        this.init();
    });
};

$.fn.RechargeConfigSearch = function (options) {
    return this.each(function () {
        var _this = $(this);
        var _obj = this;

        var defaults = {
            placeholder: "",
            result: function (obj) {
            }
        };
        var opts = $.extend(defaults, options);

        this.init = function () {
            this.createHTML();
        };

        /* 生成html*/
        this.createHTML = function () {
            var html = "";
            html += '<div id="search-box2" style="position: absolute; top: 34px;left: 0;">';
            html += '  <div class="search-head">';
            html += '		<i class="fa-search"></i>';
            html += '		<input type="text" id="search-text2" placeholder="' + opts.placeholder + '" style=" background: #fff; ">';
            html += '  </div>';
            html += '  <div class="search-list">';
            html += '  	<table>';
            html += '        <thead>';
            html += '            <tr class="search-item">';
            html += '                <th style="width: 42px;">#</th>';
            html += '                <th>优惠券名称</th>';
            html += '                <th>优惠券金额</th>';
            html += '                <th>失效方式</th>';
            html += '                <th>优惠券状态</th>';
            html += '            </tr>';
            html += '        </thead>';
            html += '        <tbody id="search-listBox2"></tbody>';
            html += '		</table>';
            html += '  </div>';
            html += '  <div class="search-foot">';
            html += '		<button class="foot-left fa-angle-left" id="pageUp2"></button>';
            html += '		<input type="text" class="foot-left number" id="pageNo2" value="1">';
            html += '		<button class="foot-left fa-angle-right" id="pageDown2"></button>';
            html += '  	<div class="foot-right">共<span id="totalPage2">0</span>页，<span id="totalRecords2">0</span>条记录</div>';
            html += '	 </div>';
            html += '</div>';
            _this.after(html);
            this.addEvent();
        };
        /* 绑定事件*/
        this.addEvent = function () {
            var _box = $("#search-box2");
            var _text = $("#search-text2");
            var _list = $(".search-list");
            var eindex = -1;

            // 文本框获取焦点
            _this.on("focus", function () {
                if (_box.is(":hidden")) {
                    _box.slideDown(100);
                    _text.focus();
                    _obj.queryPropertyInfoList();
                    $("#search-box").slideUp(100);
                }
            });
            _this.on("click", function (e) {
                if (_box.is(":hidden")) {
                    _box.slideDown(100);
                    _text.focus();
                }
                e.stopPropagation();
            });
            // 上一页
            $("#pageUp2").on("click", function () {
                var pageNo = returnNumber($("#pageNo2").val());
                if (pageNo <= 1) {
                    return;
                }
                var totalPage = returnNumber($("#totalPage2").text());
                if (pageNo > totalPage) {
                    $("#pageNo2").val(totalPage);
                } else {
                    $("#pageNo2").val(pageNo - 1);
                }
                _obj.queryPropertyInfoList();
            });
            // 下一页
            $("#pageDown2").on("click", function () {
                var pageNo = returnNumber($("#pageNo2").val());
                var totalPage = returnNumber($("#totalPage2").text());
                if (pageNo >= totalPage) {
                    return;
                }
                $("#pageNo2").val(pageNo + 1);
                _obj.queryPropertyInfoList();
            });
            // 跳转
            $("#pageNo2").on("keyup", function (e) {
                switch (e.keyCode) {
                    case 13:
                        var pageNo = returnNumber($("#pageNo").val());
                        var totalPage = returnNumber($("#totalPage1").text());
                        if (pageNo > totalPage) {
                            $("#pageNo2").val(returnNumber($("#totalPage1").text()));
                        } else if (pageNo < 1) {
                            $("#pageNo2").val(1);
                        } else {
                            $("#pageNo2").val(pageNo);
                        }
                        ;
                        _obj.queryPropertyInfoList();
                        break;
                    case 38:
                        $("#pageUp2").click();
                        break;
                    case 40:
                        $("#pageDown2").click();
                        break;
                }
            });
            // 文本框绑定事件
            _text.on("input propertychange", function () {
                $("#pageNo2").val(1);
                _obj.queryPropertyInfoList();
            });

            $('#search-box2 .fa-search').on("click", function () {
                _obj.queryPropertyInfoList();
            });

            // 绑定上下按键事件
            _text.on("keyup", function (e) {
                var _item = $('#search-listBox2 .search-item');
                switch (e.keyCode) {
                    case 13:
                        $(".search-item" + eindex).click();
                        eindex = -1;
                        _obj.queryPropertyInfoList();
                        break;
                    case 38:
                        eindex--;
                        if (eindex < 0) {
                            eindex = _item.length - 1;
                        }
                        _item.removeClass("item-hover").eq(eindex).addClass("item-hover");
                        break;
                    case 40:
                        eindex++;
                        if (eindex >= _item.length) {
                            eindex = 0;
                        }
                        _item.removeClass("item-hover").eq(eindex).addClass("item-hover");
                        break;
                }
            });
            // 绑定点击不隐藏事件
            $("#search-box2").on("click", function (e) {
                e.stopPropagation();
            });
            $(document).on("click", function (e) {
                $("#search-list2,#search-box2").slideUp(100);
            });
        };
        this.queryPropertyInfoList = function () {
            $.ajax({
                type: "POST",
                url: "/activity/queryCouponsConfigPageList",
                data: {
                    where: $("#search-text2").val().trim(),
                    pageNo: returnNumber($("#pageNo2").val()),
                    pageSize: 10
                },
                dataType: "json"
            }).done(function (result) {
                if (result.code == 200) {
                    var _body = $("#search-listBox2");
                    if (result.data.list.length <= 0) {
                        _body.html('<tr><td colspan="99" style="text-align: center;height: 60px;">没有数据</td></tr>');
                        $("#totalPage2").text(0);
                        $("#totalRecords2").text(0);
                        return;
                    }
                    _body.empty();
                    $.each(result.data.list, function (index, data) {
                        // 加载列表数据
                        _body.append('<tr class="search-item search-item' + index + '">' + '<td style="width: 42px;">' + (index + 1) + '</td>' + '<td>' + returnValue(data.uccfg_name) + '</td>' + '<td>' + returnFloat(data.uccfg_price) + '</td>' + '<td>' + returnUccfgInvalidWay(data.uccfg_invalid_way).text + '</td>' + '<td>' + returnUccfgStatus(data.uccfg_status).text + '</td>' + '</tr>');

                        // 点击单个列表数据 TODO
                        $(".search-item" + index).on("click", function () {
                            var _data = $(this).data("data");
                            _this.val(_data.uccfg_name).data("data", _data);
                            opts.result(_this);

                            eindex = -1;
                            $("#search-list2, #search-box2").slideUp(100);
                        }).data("data", data);
                    });
                    $(".search-list").show();
                    $("#totalPage2").text(result.data.totalPage);
                    $("#totalRecords2").text(result.data.totalRecords);
                } else {
                    _body.html('<tr><td colspan="99" style="text-align: center;height: 60px;">没有数据</td></tr>');
                    $("#totalPage2").text(0);
                    $("#totalRecords2").text(0);
                }
            });
        };
        this.init();
    });
};

function returnPrStatus(param) {
    var data = {};
    data.list = {
        1: "开启",
        2: "关闭",
        3: "暂停",
    };
    data.text = data.list[param];
    switch (param) {
        case 2 :
        case 3 :
            data.style = "next";
            break;
        case 1 :
            data.style = "ok";
            break;
    }
    return data;
}
