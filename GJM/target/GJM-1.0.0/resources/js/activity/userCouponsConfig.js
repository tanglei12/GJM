var uccfg_id = '';
$(function () {
    load_data();

    // 优惠券勾选互斥
    $(document).on('click', '.add-ucuName .checkbox-min', function () {
        $(this).each(function () {
            if ($(this).find('input[name=un]').attr('checked')) {
                $(this).siblings().find('input').attr("checked", false);
            }
            if ($(this).find('input[name=ucu_name]').attr('checked')) {
                $(this).siblings().find('input[name=un]').attr("checked", false);
            }
        })
    })
});

// 加载数据
function load_data() {
    var filterDateParams = [
        {name: "创建时间", value: "uccfg_create_time", sort: 'DESC'},
    ];
    var filterBars = [];
    var listParams = [
        {text: "名称", name: "uccfg_name", param: "", func: {type: "onclick", name: "$.table.popupOpen(this)"}},
        {text: "券种类型", name: "uccfg_use", param: "returnUccfgUse"},
        {text: "优惠方式", name: "uccfg_way", param: returnUccfgWay().list},
        {text: "优惠值", name: "uccfg_price", param: ""},
        {text: "使用方式", name: "uccfg_invalid_way", param: returnUccfgInvalidWay().list},
        {text: "状态", name: "uccfg_status", param: "returnUccfgStatus"},
        {text: "创建时间", name: "uccfg_create_time", param: "time"},
    ];
    // 获取列表数据
    $.table({
        filterDateParams: filterDateParams,
        listParams: listParams,
        filterBars: filterBars,
        filterWhere: true,
        ajaxParams: {
            url: "/activity/queryCouponsConfigList",
            beforeSend: function () {
            }
        },
        ajaxDone: function (h) {
            h.find(".list-content-item").each(function () {
                var data = $(this).find("[name=table-checkbox]").data("data");
            });
        },
        popup: {
            width: "60%",
            result: function (box, _data) {
                loadingData(box.main, _data);
            },
            close: function () {
                $.table.loadData();
            }
        }
    });
}

/**
 * 加载弹出层
 * @param box
 * @param _data
 */
function loadingData(box, _data) {
    $.ajax({
        type: "POST",
        url: "/activity/selectCouponsConfig",
        data: {uccfg_id: _data.uccfg_id},
        dataType: "json",
        beforeSend: function () {
            $("#contract-content").html('<div class="loading"></div>');
        }
    }).done(function (result) {
        if (result.code == 200) {
            load_content("query", box, result.data.couponsConfig);
        }
        $.popupRefreshClose();
    });
}

/**
 * 添加优惠券配置
 */
function addCouponsConfig() {
    $.popupBox({
        width: "60%",
        target: $(".custom-table-body"),
        done: function (box, data) {
            load_content("add", box.main, data);
        }
    });

    // 关闭刷新特效
    $.popupRefreshClose();
}

/**
 * 修改优惠券配置
 */
function updateCouponsConfig() {
    var data = $("[name=table-checkbox]:checked").data("data");
    if (isEmpty(data)) return $.hint.tip("请选择一个");

    $.popupBox({
        width: "60%",
        data: data,
        target: $(".custom-table-body"),
        done: function (box, data) {
            // 加载内容
            load_content("update", box.main, data);
        }
    });
}

// 优惠券
function load_use_limit() {
    $.ajax({
        type: 'POST',
        url: '/activity/queryCouponsUse',
        data: {ucu_pn: $("#uccfg_use option:selected").attr("data-id")},
        async: false,
        dataType: 'json',
        success: function (result) {
            $('.add-ucuName').empty();
            var html = '';
            if (result.code == 200) {
                $(result.data).each(function (index, item) {
                    if (item.ucu_number == 0) {
                        html += '<label class="checkbox-min"><input type="checkbox" name="un" data-number="' + item.ucu_number + '" class="input_check"><span></span><div>' + item.ucu_name + '</div></label>';
                    } else {
                        html += '<label class="checkbox-min"><input type="checkbox" name="ucu_name" data-number="' + item.ucu_number + '" class="input_check" ><span></span><div>' + item.ucu_name + '</div></label>';
                    }
                });
                $('.add-ucuName').append(html);
            }
        }
    })
}

//弹出框html
function load_content(mode, box, data) {
    data = data || "";

    var is_query = mode == "query";
    var is_add = mode == "add";
    var is_update = mode == "update";

    // --加载样式--------------------------------------

    var html = '';
    html += '<div>';
    html += '   <dl class="couponsConfig-dl title-dl">';
    html += '   <div class="first-title">';
    switch (mode) {
        case "query":
            html += '<span class="title">' + returnValue(data.uccfg_name) + '</span>';
            break;
        case "add":
            html += '<span class="title">添加优惠券</span>';
            break;
        case "update":
            html += '<span class="title">编辑优惠券</span>';
            break;
    }
    html += '   </div>';
    html += '   </dl>';
    // ====【状态】============
    html += '   <dl class="couponsConfig-dl">';
    html += '       <dt><em>*</em>状态</dt>';
    if (is_add || is_update) {
        html += '       <dd>';
        html += '           <label class="checkbox-min"><input type="radio" name="uccfg_status" data-id="1" class="input_check" checked="checked"><span></span><div>启用</div></label> ';
        html += '           <label class="checkbox-min"><input type="radio" name="uccfg_status" data-id="2" class="input_check"><span></span><div>关闭</div></label> ';
        html += '       </dd>';
    }
    if (is_query) {
        html += '       <dd>' + returnUccfgStatus(data.uccfg_status).text + '</dd>';
    }
    html += '   </dl>';
    // ====【使用方式】============
    html += '   <dl class="couponsConfig-dl">';
    html += '       <dt><em>*</em>使用方式</dt>';
    if (is_add || is_update) {
        html += '       <dd>';
        html += '           <label class="checkbox-min"><input type="radio" name="uccfg_invalid_way" data-id="1" class="input_check" checked="checked"><span></span><div>一次性</div></label> ';
        html += '           <label class="checkbox-min"><input type="radio" name="uccfg_invalid_way" data-id="2" class="input_check"><span></span><div>持续性</div></label> ';
        html += '       </dd>';
    }
    if (is_query) {
        html += '       <dd>' + returnUccfgInvalidWay(data.uccfg_invalid_way).text + '</dd>';
    }
    html += '   </dl>';
    // ====【名称】============
    if (is_add || is_update) {
        html += '   <dl class="couponsConfig-dl">';
        html += '       <dt><em>*</em>名称</dt>';
        html += '       <dd><input type="text" id="uccfg_name" value="' + returnValue(data.uccfg_name) + '" placeholder="优惠券名称"></dd>';
        html += '   </dl>';
    }
    // ====【描述】============
    html += '   <dl class="couponsConfig-dl">';
    html += '       <dt>描述</dt>';
    if (is_add || is_update) {
        html += '   <dd><textarea class="from-data" cols="3" id="uccfg_description" placeholder="优惠券描述" maxlength="50"></textarea></dd>';
    }
    if (is_query) {
        html += '   <dd>' + returnValue(data.uccfg_description) + '</dd>';
    }
    html += '   </dl>';
    // ====【优惠方式】============
    html += '   <dl class="couponsConfig-dl">';
    html += '       <dt><em>*</em>优惠方式</dt>';
    if (is_add || is_update) {
        html += '   <dd id="uccfgWay">';
        html += '       <label class="common-checkbox common-checkbox-checked" style="margin-top: 8px"><input type="radio" name="uccfg_way" value="1" checked>金额</label>';
        html += '       <label class="common-checkbox" style="margin-top: 8px"><input type="radio" name="uccfg_way" value="2">折扣</label>';
        html += '       <input type="text" class="money" id="uccfg_price"><label style="margin-left: 4px" id="uccfg_way_label">元</label>';
        html += '   </dd>';
    }
    if (is_query) {
        html += '   <dd>' + (returnNumber(data.uccfg_way) == 2 ? "[折扣]" : "[金额]") + returnValue(data.uccfg_price) + (returnNumber(data.uccfg_way) == 2 ? "%" : "元") + '</dd>';
    }
    html += '   </dl>';
    // ====【有效期限】============
    html += '   <dl class="couponsConfig-dl">';
    html += '       <dt><em>*</em>有效期限</dt>';
    if (is_add || is_update) {
        html += '   <dd><input type="text" class="number" id="uccfg_valid_value" value=""></dd>';
        html += '   <dd><select id="uccfg_valid_way"></select></dd>';
    }
    if (is_query) {
        html += '   <dd>' + returnValue(data.uccfg_valid_value) + '</dd>';
        html += '   <dd>' + returnUccfgValidValue(data.uccfg_valid_way).text + '</dd>';
    }
    html += '   </dl>';
    // ====【券种类型】============
    html += '   <dl class="couponsConfig-dl" style="padding-bottom: 4px;">';
    html += '       <dt><em>*</em>券种类型</dt>';
    if (is_add || is_update) {
        html += '   <dd><select id="uccfg_use" onchange="load_use_limit();"></select></dd>';
    }
    if (is_query) {
        html += '   <dd style="flex-direction: column;">' + returnUccfgUse(data.uccfg_use).text + '</dd>';
    }
    html += '   </dl>';
    // ====【使用限制】============
    html += '   <dl class="couponsConfig-dl">';
    html += '       <dt><em>*</em>使用限制</dt>';
    if (is_add || is_update) {
        html += '   <dd class="add-ucuName"></dd>';
    }
    if (is_query) {
        html += '   <dd style="flex-direction: column;">';
        html += '       <div id="uccfg_use_limit" style="display: flex;line-height: 24px;margin-top: 5px;"></div>';
        html += '   </dd>';
    }
    html += '   </dl>';
    if (is_add || is_update) {
        html += '   <dl class="couponsConfig-dl">';
        html += '       <dt></dt>';
        html += '       <dd><button id="submit" class="from-data" onclick="submitCouponsConfig()">提交</button></dd>';
        html += '   </dl>';
    }
    html += '   <input type="hidden" id="uccfg_id" value="">';
    html += '   <input type="hidden" id="uccfg_code" value="">';
    html += '</div>';
    box.html(html);

    // --加载事件--------------------------------------

    // 加载事件
    box.find("[name=uccfg_way]").off().on("change", function () {
        switch (this.value) {
            case "1":
                $("#uccfg_way_label").text("元");
                break;
            case "2":
                $("#uccfg_way_label").text("%");
                break;
        }
    });

    // --加载数据--------------------------------------

    // 移除必填样式
    box.find("em").remove();

    // 【显示模式】
    if (is_query) {

        // 加载用途数据
        $.each((data.uccfg_use_limit || "").split(','), function (index, item) {
            $("#uccfg_use_limit").append('<div class="ok-bg" style="margin-right: 10px;padding: 0 6px;border-radius: 3px;font-size: 12px;">' + returnUccfgUseLimit(data.uccfg_use, item).text + '</div>');
        });
    }

    // 【编辑模式】
    if (is_add || is_update) {
        // 获取焦点
        if (is_add) $("#uccfg_name").focus();

        // 【内部方法】优惠券状态
        var init_uccfg_status = function (id) {
            if (!isEmpty(id)) {
                box.find("[name=uccfg_status][data-id=" + id + "]").click();
            } else {
                box.find("[name=uccfg_status]:eq(0)").click();
            }
        };
        // 【内部方法】使用方式
        var init_uccfg_invalid_way = function (id) {
            if (!isEmpty(id)) {
                box.find("[name=uccfg_invalid_way][data-id=" + id + "]").click();
            } else {
                box.find("[name=uccfg_invalid_way]:eq(0)").click();
            }
        };
        // 【内部方法】优惠方式
        var init_uccfg_way = function (value) {
            if (!isEmpty(value)) {
                box.find("[name=uccfg_way][value=" + value + "]").click();
            } else {
                box.find("[name=uccfg_way]:eq(0)").click();
            }
            var checked_value = box.find("[name=uccfg_way]:checked").val();
            switch (checked_value) {
                case "1":
                    $("#uccfg_way_label").text("元");
                    break;
                case "2":
                    $("#uccfg_way_label").text("%");
                    break;
            }
        };

        // 优惠券状态
        init_uccfg_status(data.uccfg_status);
        // 优惠券使用方式
        init_uccfg_invalid_way(data.uccfg_invalid_way);
        // 优惠券优惠方式
        init_uccfg_way(data.uccfg_way);

        // 优惠券id
        $('#uccfg_id').val(returnValue(data.uccfg_id));
        // 优惠券号
        $('#uccfg_code').val(returnValue(data.uccfg_code));
        // 名称
        $('#uccfg_name').val(returnValue(data.uccfg_name));
        // 描述
        $("#uccfg_description").val(returnValue(data.uccfg_description));
        // 金额
        $('#uccfg_price').val(returnValue(data.uccfg_price));
        // 有效期限-值
        $('#uccfg_valid_value').val(returnValue(data.uccfg_valid_value));
        // 有效期限-类型
        $.each(returnUccfgValidValue().list, function (key, value) {
            $("#uccfg_valid_way").append('<option value="' + key + '">' + value + '</option>');
        });
        $("#uccfg_valid_way").val(returnValue(data.uccfg_valid_way));
        // 券种类型
        $.each(returnUccfgUse1().list, function (index, data) {
            $("#uccfg_use").append('<option value="' + data.ucu_number + '" data-id="' + data.ucu_id + '">' + data.ucu_name + '</option>');
        });
        $("#uccfg_use").val(returnValue(data.uccfg_use));
        // 使用限制
        load_use_limit();
        $.each((data.uccfg_use_limit || "").split(','), function (index, item) {
            if (returnNumber(item) == 0) {
                $("[name=un][data-number=" + item + "]").attr("checked", "checked");
            } else {
                $("[name=ucu_name][data-number=" + item + "]").attr("checked", "checked");
            }
        });
    }

    $.popupRefreshClose();
}

/**
 * 提交数据
 */
function submitCouponsConfig() {
    var uccfg_source = $("input[name=uccfg_source]:checked").attr('data-id');
    var uccfg_valid_way = $('#uccfg_valid_way').find("option:selected").attr('data-val');
    var uccfg_invalid_way = $("input[name=uccfg_invalid_way]:checked").attr('data-id');
    var uccfg_status = $("input[name=uccfg_status]:checked").attr('data-id');
    var uccfg_use = $("#uccfg_use").find("option:selected").val();
    //优惠券限用途制
    var uccfg_use_limit = '';
    $("[name=un]:checked").each(function () {
        uccfg_use_limit += $(this).attr("data-number") + ",";
    });
    $("[name=ucu_name]:checked").each(function () {
        uccfg_use_limit += $(this).attr("data-number") + ",";
    });
    uccfg_use_limit = uccfg_use_limit.substring(0, uccfg_use_limit.length - 1);
    //优惠方式
    var boo = true;
    var uccfg_way = $("[name=uccfg_way]:checked").val();
    switch (returnNumber(uccfg_way)) {
        case 2:
            if (returnFloat($("#uccfg_price").val()) > 100) {
                $("#uccfg_price").msg("优惠方式为折扣时，优惠值不能大于100");
                boo = false;
            }
            break;
    }
    if (!boo) return;

    var data = {
        uccfg_id: $('#uccfg_id').val(),
        uccfg_code: $('#uccfg_code').val(),
        uccfg_name: $('#uccfg_name').val(),
        uccfg_source: uccfg_source,
        uccfg_way: uccfg_way,
        uccfg_price: $('#uccfg_price').val(),
        uccfg_valid_value: $('#uccfg_valid_value').val(),
        uccfg_valid_way: uccfg_valid_way,
        uccfg_invalid_way: uccfg_invalid_way,
        uccfg_description: $('#uccfg_description').val(),
        uccfg_remarks: $('#uccfg_remarks').val(),
        uccfg_status: uccfg_status,
        uccfg_use: uccfg_use,
        uccfg_use_limit: uccfg_use_limit
    }
    if ($('input:radio[name=uccfg_status]:checked').val() == null || $('input:radio[name=uccfg_invalid_way]:checked').val() == null ||
        $('#uccfg_name').val() == '' || $('#uccfg_description').val() == '' || $('#uccfg_price').val() == '' ||
        $('#uccfg_valid_value').val() == '') {
        $.hint.tip("数据未填写完整", "error");
        return false;
    }
    $.ajax({
        type: "post",
        url: "/activity/addCouponsConfig",
        data: data,
        dataType: "json"
    }).done(function (result) {
        if (result.code != 200) {
            $.hint.tip("失败", "error");
            return;
        }
        $.hint.tip(result.msg, "success");
        $.popupBoxClose();
        $.table.loadData();
    })
}
