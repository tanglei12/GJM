var hpm_code, mode, con_code, conType;

$(function () {

    mode = getQueryString("mode");
    con_code = getQueryString("con_code");

    $("#submitHandover").text(mode == "normal" ? "提交" : "下一步");

    // 初始化视图数据
    initViewData();

    $('input:file').localResizeIMG({
        width: 1440,
        success: function (result) {
            var img = new Image();
            img.src = result.base64;
            $('body').append(img);
            console.log(result);
        }
    });

    imageDrag();

});

/** 初始化视图数据 */
function initViewData() {
    $.ajax({
        type: "POST",
        url: "/transferKeep/queryTransferInfo",
        data: {
            con_code: getQueryString("con_code")
        },
        dataType: "json"
    }).done(function (result) {
        switch (result.code) {
            case 200:
                data = result.data;
                contract = data.contract;
                handoverMain = data.handoverMain;

                conType = contract.contractObject_Type;

                if (isEmpty(mode) || "normal" == mode) {
                    $("input[name^=hpv_end]").attr("disabled", "disabled");
                    if (window.location.hash != "#attach") {
                        $(".transfer-start-title").text("抄表数");
                        $(".transfer-start").find("[name^=hpv_start]").attr("placeholder", "抄表数");
                        $(".transfer-end-title, .transfer-end").hide();
                    }
                } else {
                    $("input[name^=hpv_start]").attr("disabled", "disabled");
                    if (window.location.hash != "#attach") {
                        $(".transfer-end-title").text("抄表数");
                        $(".transfer-end").find("[name^=hpv_end]").attr("placeholder", "抄表数");
                        $(".transfer-start-title, .transfer-start").hide();
                    }
                }

                $("#handover-head").html(
                    '<span>交接清单</span>' +
                    '<span class="title_label_black">' + contract.contractObject_Type + '&nbsp;|&nbsp;' + contract.contractObject_No + '</span>' +
                    '<span class="title_label_black">小区房号&nbsp;|&nbsp;' + contract.house_address + '</span>');

                // 设置默认交接日期
                var _hpm_handoverDate = $("input[name=hpm_handoverDate]");
                if (isEmpty(_hpm_handoverDate.val())) {
                    _hpm_handoverDate.val(returnDate(new Date()));
                }

                // 初始化物品配置
                var goods = "";
                $.each(result.data.houseGoodsList, function (index, data) {
                    if (data.ht_parentId == data.ht_superId) {
                        goods += '<option value="' + data.ht_id + '">' + data.ht_name + '</option>';
                    }
                });
                $("#menu-dl").html(goods)
                .data("data", result.data.houseGoodsList)
                .on("change", function () {
                    changeSelect(this);
                }).change();

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
                var _stw = "";
                $.each(stwArr, function (index, data) {
                    _stw += '<option value="' + data + '">' + data + '</option>';
                });
                $("#house-dl").html(_stw);

                // 初始化装饰情况
                initDecoList(stwArr, result.data.houseDecoList);

                // -------------------------

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

                // 交接清单
                if (!isEmpty(handoverMain)) {
                    hpm_code = handoverMain.hpm_code;

                    // 备注
                    $("textarea[name=hpm_remark]").val(returnValue(handoverMain.hpm_remark));
                    if (mode == "normal") {
                        // 交接人
                        $("input[name=hpm_handoverPerson_id]").val(returnNumber(handoverMain.hpm_handoverPersonIn));
                        $("input[name=hpm_handoverPerson]").val(returnValue(handoverMain.hpm_handoverPersonInName));
                        // 交接日期
                        $("input[name=hpm_handoverDate]").val(returnDate(handoverMain.hpm_handoverDateIn));
                    }
                    if (mode == "compary") {
                        // 交接人
                        $("input[name=hpm_handoverPerson_id]").val(returnNumber(handoverMain.hpm_handoverPersonOut));
                        $("input[name=hpm_handoverPerson]").val(returnValue(handoverMain.hpm_handoverPersonOutName));
                        // 交接日期
                        $("input[name=hpm_handoverDate]").val(returnDate(handoverMain.hpm_handoverDateOut));
                    }

                    // 卡号值
                    if (!isEmpty(data.energyValues)) {
                        var _p_mode = data.property_mode;
                        $.each(data.energyValues, function (index, data) {
                            switch (data.hpv_type) {
                                case "水":
                                    if (mode == "normal") {
                                        if (_p_mode != "PID") {
                                            $("input[name=hpv_start_water]").val(data.hpv_start);
                                            $("input[name=hpv_end_water]").val(data.hpv_end);
                                        } else {
                                            $("input[name=hpv_start_water]").val(data.hpv_end);
                                        }
                                    } else {
                                        $("input[name=hpv_start_water]").val(data.hpv_start);
                                        $("input[name=hpv_end_water]").val(data.hpv_end);
                                    }
                                    break;
                                case "电":
                                    if (mode == "normal") {
                                        if (_p_mode != "PID") {
                                            $("input[name=hpv_start_electric]").val(data.hpv_start);
                                            $("input[name=hpv_end_electric]").val(data.hpv_end);
                                        } else {
                                            $("input[name=hpv_start_electric]").val(data.hpv_end);
                                        }
                                    } else {
                                        $("input[name=hpv_start_electric]").val(data.hpv_start);
                                        $("input[name=hpv_end_electric]").val(data.hpv_end);
                                    }
                                    break;
                                case "气":
                                    if (mode == "normal") {
                                        if (_p_mode != "PID") {
                                            $("input[name=hpv_start_gas]").val(data.hpv_start);
                                            $("input[name=hpv_end_gas]").val(data.hpv_end);
                                        } else {
                                            $("input[name=hpv_start_gas]").val(data.hpv_end);
                                        }
                                    } else {
                                        $("input[name=hpv_start_gas]").val(data.hpv_start);
                                        $("input[name=hpv_end_gas]").val(data.hpv_end);
                                    }
                                    break;
                            }
                        });
                    }
                    if (mode == "compary") {
                        if (!isEmpty(data.lastEnergyValues)) {
                            $.each(data.lastEnergyValues, function (index, data) {
                                switch (data.hpv_type) {
                                    case "水":
                                        $("input[name=hpv_end_water]").val(data.hpv_end);
                                        break;
                                    case "电":
                                        $("input[name=hpv_end_electric]").val(data.hpv_end);
                                        break;
                                    case "气":
                                        $("input[name=hpv_end_gas]").val(data.hpv_end);
                                        break;
                                }
                            });
                        }
                    }

                    // 交接物品配置信息
                    $.each(data.handoverGoods, function (index, data) {
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
                            '<input type="checkbox" class="ps_on" onclick="changeCheckItem(this)" data-type="on" value="' + _ps_on + '" ' + (_ps_on == 0 ? 'checked' : '') + '>' +
                            '<span>' + (_ps_on == 0 ? "新" : "旧") + '</span>' +
                            '</label></span>' +
                            '<span style="width:60px">' +
                            '<label class="check-item ' + (_ps_gb == 0 ? 'check-item-well' : 'check-item-bad') + '">' +
                            '<input type="checkbox" class="ps_gb" onclick="changeCheckItem(this)" data-type="gb" value="' + _ps_gb + '" ' + (_ps_gb == 0 ? 'checked' : '') + '>' +
                            '<span>' + (_ps_gb == 0 ? '好' : '坏') + '</span>' +
                            '</label></span>' +
                            '<span style="width:60px"><a href="javascript:;" onclick="removeList(this)" class="error">移除</a></span>' +
                            '</dd>');
                        $(".i-hint").text($("#menu-dl-list .menu-content").length);
                    });

                    // 装饰情况
                    $.each(data.handoverDecorations, function (index, data) {
                        var _box = $(".item-tr[data-roomtype=" + data.hpd_roomType + "][data-decotype=" + data.hpd_decoType + "]");
                        if (data.hpd_decoState == 1) {
                            _box.find("input[name=hpd_decoState]").val(1).removeAttr("checked");
                            _box.find("input[name=hpd_decoState]").parent().removeClass("box-on").addClass("box-off").attr("data-title", "有损");
                        }
                        _box.find("input[name=hpd_desc]").val(data.hpd_desc);

                    });
                }

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
                $(".loading-mask").remove();
                break;
            default:
                $(".loading-mask").fadeOut();
                $("#main-content").html('<div class="loading-hint">' + result.msg + '</div>');
                break;
        }
        initFunction();
    }).fail(function () {

    });
}

function imageDrag() {

    var self = this;
    var target = $("#ss")[0];

    target.addEventListener("dragover", function (e) {
        self.funDragHover(e);
    }, false);

    target.addEventListener("dragleave", function (e) {
        self.funDragHover(e);
    }, false);

    target.addEventListener("drop", function (e) {
        self.funGetFiles(e);
    }, false);

    this.funDragHover = function (e) {
        e.stopPropagation();
        e.preventDefault();
        return this;
    };

    this.funGetFiles = function (e) {
        var self = this;
        // 取消鼠标经过样式
        this.funDragHover(e);
        // 从事件中获取选中的所有文件
        var files = e.target.files || e.dataTransfer.files;
        return true;
    }
}

function dragP(e) {
    e.preventDefault();
}

/** 初始化方法*/
function initFunction() {
    // 用户弹窗显示绑定
    $("input[name=hpm_handoverPerson]").on("click", function () {
        $(this).openModel({
            title: "管家信息",
            target: {
                id: "hpm_handoverPerson_id",
                name: "hpm_handoverPerson"
            },
            afterFocus: "hpm_handoverPerson"
        });
    });

    // 钥匙类型改变事件
    $("select[name=hk_type]").on("change", function () {
        var _option = $(this).find("option:selected").val();
        switch (_option) {
            case "防盗门钥匙":
                $("input[name=hk_number]").attr("placeholder", "数量").select();
                break;
            case "密码钥匙":
                $("input[name=hk_number]").attr("placeholder", "密码").select();
                break;
        }
    });

    // 时间插件绑定
    $("input[name=hpm_handoverDate]").datepicker();

    $("#recyclebin-box,#menu-dl-box,#menu-dl-list").perfectScrollbar();
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
            html += '		<label class="box-on-off box-on" data-title="正常" data-json=\'{"on":"正常","on_state":"0","off":"有损","off_state":"1"}\'><input type="checkbox" name="hpd_decoState" value="0" checked></label>';
            html += '	</td>';
            html += '	<td>';
            html += '		<input type="text" class="imo-input1" name="hpd_desc" placeholder="情况描述" style="width: 94%;">';
            html += '	</td>';
            html += '</tr>';
        });
        html += '		</tbody>';
        html += '	</table>';
        html += '</div>';
    });
    $("#redeBox").html(html);
}

// ----------------

/** TODO 提交信息*/
function submitHandoverInfo(obj) {
    var boo = true;
    $("input[required]:visible").each(function () {
        var _val = $(this).val();
        if (isEmpty(_val)) {
            $(this).msg(returnValue($(this).attr("placeholder")) + "不能为空");
            boo = false;
            return false;
        }
    });
    if (!boo) {
        return false;
    }
    ;

    var data = {};

    // 交接单
    var handoverMain = {};
    handoverMain.contractObject_code = getQueryString("con_code");
    if (mode == "normal") {
        handoverMain.hpm_handoverPersonIn = $("input[name=hpm_handoverPerson_id]").val();
        handoverMain.hpm_handoverDateIn = $("input[name=hpm_handoverDate]").val();
    }
    if (mode == "compary") {
        handoverMain.hpm_handoverPersonOut = $("input[name=hpm_handoverPerson_id]").val();
        handoverMain.hpm_handoverDateOut = $("input[name=hpm_handoverDate]").val();
    }
    handoverMain.hpm_remark = $("textarea[name=hpm_remark]").val().trim();
    data.handoverMain = JSON.stringify(handoverMain);

    // 钥匙库
    var houseKey = {};
    houseKey.hk_type = $("select[name=hk_type] option:selected").val();
    houseKey.hk_newNumber = $("input[name=hk_number]").val().trim();
    data.houseKey = JSON.stringify(houseKey);

    // 能源卡号&能源卡号数值
    var handoverEnergyCardList = new Array(),
        handoverEnergyCard = {};
    handoverEnergyCard.hpec_type = $("input[name=hpec_number_water]").data().type;
    handoverEnergyCard.hpec_newNumber = $("input[name=hpec_number_water]").val().trim();
    handoverEnergyCard.hpv_start = $("input[name=hpv_start_water]").val().trim();
    handoverEnergyCard.hpv_end = $("input[name=hpv_end_water]").val().trim();
    handoverEnergyCardList.push(handoverEnergyCard);

    handoverEnergyCard = {};
    handoverEnergyCard.hpec_type = $("input[name=hpec_number_electric]").data().type;
    handoverEnergyCard.hpec_newNumber = $("input[name=hpec_number_electric]").val().trim();
    handoverEnergyCard.hpv_start = $("input[name=hpv_start_electric]").val().trim();
    handoverEnergyCard.hpv_end = $("input[name=hpv_end_electric]").val().trim();
    handoverEnergyCardList.push(handoverEnergyCard);

    handoverEnergyCard = {};
    handoverEnergyCard.hpec_type = $("input[name=hpec_number_gas]").data().type;
    handoverEnergyCard.hpec_newNumber = $("input[name=hpec_number_gas]").val().trim();
    handoverEnergyCard.hpv_start = $("input[name=hpv_start_gas]").val().trim();
    handoverEnergyCard.hpv_end = $("input[name=hpv_end_gas]").val().trim();
    handoverEnergyCardList.push(handoverEnergyCard);

    handoverEnergyCard = {};
    handoverEnergyCard.hpec_type = $("input[name=hpec_number_ZL]").data().type;
    handoverEnergyCard.hpec_newNumber = $("input[name=hpec_number_ZL]").val().trim();
    handoverEnergyCardList.push(handoverEnergyCard);

    handoverEnergyCard = {};
    handoverEnergyCard.hpec_type = $("input[name=hpec_number_JF]").data().type;
    handoverEnergyCard.hpec_newNumber = $("input[name=hpec_number_JF]").val().trim();
    handoverEnergyCardList.push(handoverEnergyCard);

    data.handoverEnergyCardList = JSON.stringify(handoverEnergyCardList);

    // 交接物品
    var handoverGoodsList = new Array();
    $("#menu-dl-list .menu-content").each(function () {
        var handoverGoods = {};
        handoverGoods.hpg_itemType = $(this).find("span:eq(1)").text();
        handoverGoods.hpg_roomType = $(this).find("span:eq(2)").text();
        handoverGoods.hpg_itemName = $(this).find("span:eq(3)").text();
        handoverGoods.hpg_itemBrand = $(this).find("span:eq(4)").text();
        handoverGoods.hpg_number = $(this).find("span:eq(5)").text();
        handoverGoods.hpg_on = $(this).find(".ps_on").val();
        handoverGoods.hpg_gb = $(this).find(".ps_gb").val();
        handoverGoodsList.push(handoverGoods);
    });
    data.handoverGoodsList = JSON.stringify(handoverGoodsList);

    // 交接装饰情况
    var handoverDecoList = new Array();
    $("#redeBox .item-tr").each(function () {
        var handoverDeco = {};
        handoverDeco.hpd_roomType = $(this).data().roomtype;
        handoverDeco.hpd_decoType = $(this).data().decotype;
        handoverDeco.hpd_decoState = $(this).find("input[name=hpd_decoState]").val();
        handoverDeco.hpd_desc = $(this).find("input[name=hpd_desc]").val().trim();
        handoverDecoList.push(handoverDeco);
    });
    data.handoverDecoList = JSON.stringify(handoverDecoList);
    data.mode = getQueryString("mode")

    // 提交数据
    $.ajax({
        type: "POST",
        url: "/transferKeep/transferSubmit",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        beforeSend: function () {
            $.jBox.tip("数据保存中", "loading");
            $(obj).attr("disabled", "disabled");
        }
    }).done(function (result) {
        if (result.code == 200) {
            $.jBox.tip("保存成功", "success");
            var hash = window.location.hash;
            if (hash == "#attach") {
                parent.submitOk();
            } else {
                if (mode == "compary") {
                    window.location.href = '/contractObject/jumpContractClosingCost?mode=out&con_code=' + con_code;
                } else {
                    window.location.href = '/contractObject/jumpContractClosingCost?mode=in&con_code=' + con_code;
                }
            }
        } else {
            $.jBox.tip(result.msg);
        }
        $(obj).removeAttr("disabled");
    });
}

/** 显示/隐藏回收站*/
function toggleTrash() {
    $("#recyclebin").toggle();
}

/** 拖动弹窗*/
function modelMove() {
//	var _obj = $(".model-drag");
//	var _parent = $(".window");
//	var _move = false;// 移动标记
//	var _x, _y;// 鼠标离控件左上角的相对位置
//	_obj.mousedown(function(e) {
//		_obj.css("cursor", "move");
//		_move = true;
//		_x = e.pageX - parseInt(_parent.css("left"));
//		_y = e.pageY - parseInt(_parent.css("top"));
//	});
//	$(document).mousemove(function(e) {
//		if (_move) {
//			var x = e.pageX - _x;// 移动时根据鼠标位置计算控件左上角的绝对位置
//			var y = e.pageY - _y;
//			_parent.css({
//				top : y,
//				left : x
//			});// 控件新位置
//		}
//	}).mouseup(function() {
//		_move = false;
//		_obj.css("cursor", "default");
//	});
}

/** 添加物品*/
function addItems() {
    $.each($("input[required].item-top"), function () {
        $(this).change();
        if (!valid) {
            $(this).focus();
            return false;
        }
    })
    if (!valid) {
        return false;
    }
    var $itemNameVal = $("#purchaseItems_name option:selected").val();
    if ("其他" == $itemNameVal) {
        if (!isEmpty($("#pi_qt").val())) {
            $itemNameVal = $("#pi_qt").val();
        }
    }
    $.ajax({
        type: "POST",
        url: "/contractObject/addItems",
        data: {
            purchaseItems_type: $("#purchaseItems_type option:selected").val(),
            purchaseItems_name: $itemNameVal,
            purchaseItems_brand: $("#purchaseItems_brand").val(),
            purchaseItems_cost: $("#purchaseItems_cost").val(),
            purchaseItems_count: $("#purchaseItems_count").val(),
            purchaseItems_totalCost: $("#purchaseItems_totalCost").val(),
            purchaseItems_source: $("#purchaseItems_source").val(),
            purchaseItems_payObject: $("#purchaseItems_payObject option:selected").val(),
            purchaseItems_remarks: $("#purchaseItems_remarks").val(),
            purchaseItems_On: $("#purchaseItems_On option:selected").val(),
            purchaseItems_Gb: $("#purchaseItems_Gb option:selected").val()
        },
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            if (result.code == 200) {
                queryItemList();
                moveModelMainRight();
                $(".item-top input[type='text'],textarea.item-top").val("");
            } else {
                alert(result.msg);
            }
        }
    })
}

/** 查询房屋配置列表
 * @param {} obj
 */
function queryHouseConfigType(obj) {
    var _obj = $("#" + obj);
    var _param = $("#" + obj + "-title").text();
    $.ajax({
        type: "POST",
        url: "/queryHouseConfigType",
        data: {
            typeName: _param
        },
        dataType: "json"
    }).done(function (result) {
        if (result.code == 200) {
            _obj.empty();
            $.each(result.data, function (index, data) {
                cfgTypeArr.push(data.ht_id);
                _obj.append(
                    '<tr>' +
                    '<td>' +
                    '<input type="hidden" value="' + data.ht_parentId + '" id="pt' + data.ht_id + '" class="pt-hid">' +
                    '<input type="hidden" value="' + data.ht_id + '" id="ht' + data.ht_id + '" data-name="' + data.ht_name + '" class="ht-hid">' + data.ht_name + '</td>' +
                    '<td><input type="text" class="imo-input1" id="bd' + data.ht_id + '" placeholder="品牌"></td>' +
                    '<td><input type="text" class="imo-input2" id="ct' + data.ht_id + '" placeholder="数量" onkeyup="this.value=this.value.replace(/[^0-9]\D*$/,\'\')" maxlength="3"></td>' +
                    '<td style="width: 60px;">' +
                    '<label id="lon' + data.ht_id + '-0" for="on' + data.ht_id + '-0" class="span-imo newold"><input type="checkbox" id="on' + data.ht_id + '-0" value="0" name="newold' + data.ht_id + '" >新</label>' +
                    '<label id="lon' + data.ht_id + '-1" for="on' + data.ht_id + '-1" class="span-imo newold"><input type="checkbox" id="on' + data.ht_id + '-1" value="1" name="newold' + data.ht_id + '">旧</label>' +
                    '</td>' +
                    '<td style="width: 60px;">' +
                    '<label id="ltf' + data.ht_id + '-0" for="tf' + data.ht_id + '-0" class="span-imo truefalse"><input type="checkbox" id="tf' + data.ht_id + '-0" value="0" name="truefalse' + data.ht_id + '">好</label>' +
                    '<label id="ltf' + data.ht_id + '-1" for="tf' + data.ht_id + '-1" class="span-imo truefalse"><input type="checkbox" id="tf' + data.ht_id + '-1" value="1" name="truefalse' + data.ht_id + '">坏</label>' +
                    '</td>' +
                    '</tr>');
            });
        }
    });
    _obj.find("input[type='checkbox']").live('click', function () {
        var $this = $(this);
        var $text = $(this).parent().text();
        var $name = $("input[name='" + $(this).attr("name") + "']");
        $name.not($this).parent().removeClass("span-imo0").removeClass("span-imo1").removeClass("span-imo2");
        $name.not($this).removeAttr("checked");
        if (!$(this).is(":checked")) {
            $name.parent().removeClass("span-imo0").removeClass("span-imo1");
            return;
        }
        if ($text == "新") {
            $this.parent().addClass("span-imo0");
        } else if ($text == "旧") {
            $this.parent().addClass("span-imo1");
        } else if ($text == "好") {
            $this.parent().addClass("span-imo0");
        } else if ($text == "坏") {
            $this.parent().addClass("span-imo2");
        }
    });
}

/** 查询房屋配置列表
 * @param {} obj
 */
function queryHouseRede(obj) {
    var _obj = $("#" + obj);
    $.ajax({
        type: "POST",
        url: "/queryHouseConfigType",
        data: {
            typeName: '装修类型'
        },
        dataType: "json"
    }).done(function (result) {
        if (result.code == 200) {
            _obj.empty();
            $.each(result.data, function (index, data) {
                cfgTypeArr.push(data.ht_id);
                _obj.append(
                    '<tr>' +
                    '<td>' +
                    '<input type="hidden" value="' + data.ht_parentId + '" id="pt' + data.ht_id + '" class="pt-hid">' +
                    '<input type="hidden" value="' + data.ht_id + '" id="ht' + data.ht_id + '" data-name="' + data.ht_name + '" class="ht-hid">' + data.ht_name + '</td>' +
                    '<td style="width: 60px;">' +
                    '<label id="lon' + data.ht_id + '-0" for="on' + data.ht_id + '-0" class="span-imo newold"><input type="radio" id="on' + data.ht_id + '-0" value="0" name="newold' + data.ht_id + '" >正常</label>' +
                    '<label id="lon' + data.ht_id + '-1" for="on' + data.ht_id + '-1" class="span-imo newold"><input type="radio" id="on' + data.ht_id + '-1" value="1" name="newold' + data.ht_id + '">有损</label>' +
                    '</td>' +
                    '<td><input type="text" class="imo-input1" id="bd' + data.ht_id + '" placeholder="品牌"></td>' +
                    '</tr>');
            });
        }
    });
}

/** 重置
 * @param {} obj
 */
function reset(obj) {
    var _obj = $(obj);
    var _parent = _obj.parent().parent().parent().parent();
    _parent.find("input[type='radio']").removeAttr("checked");
    _parent.find("input[type='text']").val("");
}

/** 装修记录列表*/
function initRoomBasic() {
    $.ajax({
        type: "POST",
        url: "/queryHouseConfigType",
        data: {
            typeName: "装修类型"
        },
        dataType: "json"
    }).done(function (result) {
        if (result.code == 200) {
            $("#room-box-list").empty();
            $.each(result.data, function (index, data) {
                $("#room-box-list").append(
                    '<div class="room-box ht-box" data-value="' + data.ht_id + '" data-name="' + data.ht_name + '">' +
                    '<div class="room-item" style="width: 100px;"><span style="font-size: 14px;">' + data.ht_name + '</span></div>' +
                    '<div class="room-item" style="width: 140px;">' +
                    '<label for="ra' + data.ht_id + '-1"><input type="radio" name="status' + data.ht_id + '" id="ra' + data.ht_id + '-1" value="0">正常</label>' +
                    '<label for="ra' + data.ht_id + '-2"><input type="radio" name="status' + data.ht_id + '" id="ra' + data.ht_id + '-2" value="1">有损坏</label>' +
                    '</div>' +
                    '<div class="room-item" style="width: 360px;">' +
                    '<input type="text" class="item-top ht-desc" style="width: 360px;text-align: left;text-indent: 12px;">' +
                    '</div>' +
                    '</div>');
            });
        }
    });
}

/** 保存成功*/
function saveSuccess() {
    $(".box-content").hide();
    var html = '';
    html += '<div class="hint-title">保存成功</div>';
    html += '<div class="hint-content">';
    html += '	<a href="/contractObject/jumpItemAdd?con_code=' + getQueryString("con_code") + '">物品添置</a>';
    html += '	<button onclick="submitContractAuditing(this,\'' + getQueryString("con_code") + '\')">提交审核</button>';
    html += '	<a href="/contractObject/contractObjectList" style="background:#ddd;">返回列表</a>';
    html += '</div>';
    $("#main-hint").html(html).fadeIn();
}

/** 提交审核*/
function submitContractAuditing(obj, param) {
    $.ajax({
        type: "POST",
        url: "/contractObject/submitContractAuditing",
        data: {
            con_code: param
        },
        dataType: "json",
        beforeSend: function () {
            $(obj).attr("disabled", "disabled").text("提交中...");
        }
    }).done(function (result) {
        switch (result.code) {
            case 200:
                $.jBox.success("提交成功", "提示", {
                    closed: function () {
                        window.location.href = "/contractObject/contractObjectList";
                    }
                });
                break;
            default :
                $.jBox.tip(result.msg, "warning");
                break;
        }
        $(obj).removeAttr("disabled").text("提交审核");
    }).error(function () {
        window.location.href = "/contractObject/contractObjectList";
    });
}

function changeAdd4(obj) {
    var all = $(obj).attr("data-all");
    var $check = $(obj);
    if ("all" == all) {
        if ($check.is(":checked")) {
            $(obj).parent().addClass("item-cked");
            $("#menu-dl-box").find(".item-check").attr("checked", "checked");
            $("#menu-dl-box").find(".item-check").parent().addClass("item-cked");
        } else {
            $(obj).parent().removeClass("item-cked");
            $("#menu-dl-box").find(".item-check").removeAttr("checked");
            $("#menu-dl-box").find(".item-check").parent().removeClass("item-cked");
        }
    } else {
        if ($check.is(":checked")) {
            $(obj).parent().addClass("item-cked");
        } else {
            $(obj).parent().removeClass("item-cked");
        }
    }
}

/** 改变支付类型*/
function changeAdd(obj) {
    var all = $(obj).attr("data-all");
    var $check = $(obj);
    if ("all" == all) {
        if (!$check.is(":disabled")) {
            if ($check.is(":checked")) {
                $(obj).parent().addClass("item-cked");
                $(".ck-ok").children("input[type='checkbox']").attr("checked", "checked");
                $(".ck-ok").addClass("item-cked");
            } else {
                $(obj).parent().removeClass("item-cked");
                $(".ck-ok").children("input[type='checkbox']").removeAttr("checked");
                $(".ck-ok").removeClass("item-cked");
            }
        }
    } else {
        if (!$check.is(":disabled")) {
            if ($check.is(":checked")) {
                $(obj).parent().addClass("item-cked");
            } else {
                $(obj).parent().removeClass("item-cked");
            }
        }
    }
}

function changeJJObject(obj) {
    var $check = $(obj);
    if (!$check.is(":disabled")) {
        if ($check.is(":checked")) {
            $("input[name='" + $(obj).attr("name") + "']").parent().removeClass("radioed");
            $("input[name='" + $(obj).attr("name") + "']").not($(obj)).removeAttr("checked");
            $(obj).parent().addClass("radioed");
        } else {
            $(obj).parent().removeClass("radioed");
        }
    }
}

/** 是否为空*/
function isEmpty(str) {
    return str == "" || str == null || typeof(str) == "undefined";
}

/**==============================**/
/** 查询客户信息*/
function openModel(obj, param) {
    var $commonId = $(obj).attr("data-id");
    COMMONID = $commonId;
    _OBJ = "#" + param;
    $(".model-content").hide();
    $(".model-mark,#" + param).show();
    var $text = $("#" + param + "-search");
    // 初始化
    list();
    // 搜索框绑定propertychange
    $text.bind("input propertychange", function () {
        $(_OBJ + " #pageNo").val(1);
        list();
    }).focus();

    $("#param_type,#param_name").change(function () {
        list();
    });

    // 上、下、回车选择
    $text.keyup(function (event) {
        var $item = $(_OBJ + '-Body>tr');
        if (event.keyCode == 40) {// 下键
            eindex++;
            if (eindex >= $item.length) {
                eindex = 0;
            }
            choose(eindex);
        } else if (event.keyCode == 38) {// 上键
            eindex--;
            if (eindex < 0) {
                eindex = $item.length - 1;
            }
            choose(eindex);
        } else if (event.keyCode == 13) { // 回车
            if (eindex >= 0) {
                setSginInfo(this, COMMONID);
                eindex = -1
                return false;
            }
        } else {
            eindex = -1;
        }
    });
    // 显示搜索结果
    var choose = function (index) {
        var $item = $(_OBJ + '-Body>tr');
        $item.removeClass('item-hover').eq(index).addClass('item-hover');
    }
}

/** 切换窗口1*/
function moveModelMainLeft() {
    $('#main1').animate({marginLeft: '-700px', opacity: 0}, 300, '', function () {
        $(this).hide();
        $(this).css("marginLeft", 0);
        $("#main2").show().animate({opacity: 1}, 200);
        $("#model-drag-title").text('添置物品');
        $("#main2 input[type='text']:first").focus();
    });
}

/** 切换窗口2*/
function moveModelMainRight() {
    $('#main2').animate({marginRight: '-700px', opacity: 0}, 300, '', function () {
        $(this).hide();
        $(this).css("marginRight", 0);
        $("#main1").show().animate({opacity: 1}, 200);
        $("#model-drag-title").text('物品列表');
        $("#main1 input[type='text']:first").focus();
    });
    $('#main2').find(".tisp").removeClass("error").empty();
    $('#main2').find(".form-control").val("");
    $("#main2").find(".images-box-img").remove();
}

/** 关闭Model*/
function closeModel() {
    moveModelMainRight();
    $(".model-mark,.model-content").hide();
    $(".model-content input#" + _OBJ + "-search").val("");
}

/** 设置客户信息*/
function setSginInfo(obj, param) {
    var $this = $(obj);
    var $did = $this.find(".dataId").val();
    var signid = $("#sign-id").val();
    if ($did == signid) {
        alert("该客户已选择");
        return;
    }
    $.each($("input[type='hiden'].form-input"), function (index) {
        if ($(this).val() == $did) {
            alert("该客户已选择");
            return false;
        }
    });
    $("." + param + "-0").val($did);
    $("." + param + "-1").val($this.find(".data0").text());
    $("." + param + "-2").val($this.find(".data2").text());
    $("." + param + "-3").val($this.find(".data3").text());
    if ("sign" == param) {
        $("#sign-name,#sign-phone,#sign-carNo").change();
    }
    closeModel();
}

/** 跳页*/
function jumpPage() {
    var pageNo = returnNumber($(_OBJ + " #pageNo").val());
    var totalPage = returnNumber($(_OBJ + " #totalPage").text());
    if (pageNo > totalPage || pageNo < 1) return;
    $(_OBJ + " #pageNo").val(pageNo);
    list();
}

/** 分页--[上一页]*/
function pageUp() {
    var pageNo = returnNumber($(_OBJ + " #pageNo").val());
    if (pageNo <= 1) {
        return;
    }
    var totalPage = returnNumber($(_OBJ + " #totalPage").text());
    if (pageNo > totalPage) {
        $(_OBJ + " #pageNo").val(totalPage);
    } else {
        $(_OBJ + " #pageNo").val(pageNo - 1);
    }
    list();
}

/** 分页--[下一页]*/
function pageDown() {
    var pageNo = returnNumber($(_OBJ + " #pageNo").val());
    var totalPage = returnNumber($(_OBJ + " #totalPage").text());
    if (pageNo >= totalPage) {
        return;
    }
    $(_OBJ + " #pageNo").val(pageNo + 1);
    list();
}

/** 绑定按键*/
function bindUpDown() {
    var event = window.event;
    switch (event.keyCode) {
        case 13:
            jumpPage();
            break;
        case 38:
            pageUp();
            break;
        case 40:
            pageDown();
            break;
    }
}

/** 列表集*/
function list() {
    if (_OBJ == "#itemInfo") {
        queryItemList();
    } else if (_OBJ == "#employee") {
        showEmpList();
    }
}

/** 显示管家信息列表*/
function showEmpList() {
    var _body = $(_OBJ + "-Body");
    $.ajax({
        type: "POST",
        url: "/contractObject/queryEmpList",
        data: {
            param: $(_OBJ + "-search").val(),
            pageNo: $(_OBJ + " #pageNo").val()
        },
        dataType: "json"
    }).done(function (result) {
        if (result.code == 200) {
            _body.empty();
            $.each(result.data.list, function (index, data) {
                _body.append(
                    '<tr onclick="setInfo(this);">' +
                    '<td class="data0">' +
                    '<input type="hidden" id="emid" value="' + data.em_id + '">' +
                    '' + data.em_name + '</td>' +
                    '<td class="data1">' + data.em_position + '</td>' +
                    '<td class="data2">' + data.em_phone + '</td>' +
                    '<td class="data3">' + data.em_post + '</td>' +
                    '<td class="data4">' + (data.em_state == 1 ? "正常" : "异常") + '</td>' +
                    '</tr>');
            });
            $(_OBJ + " #totalPage").text(result.data.totalPage);
            $(_OBJ + " #totalRecords").text(result.data.totalRecords);
        }
    });
}

/** 设置管家信息*/
function setInfo(obj) {
    var $this = $(obj);
    $("input[name='transfer_people']").val($this.find(".data0").text());
    closeModel();
}

/** 添加物品配置 */
function addItemForList(obj) {
    // 添加提示
    var _this = $(obj);
    var len = $("#menu-dl-box").find(".item-check:checked").length;
    if (len <= 0) {
        _this.after('<label class="option-hint">请选择</label>');
        setTimeout(function () {
            _this.parent().find(".option-hint").remove();
        }, 1000);
    } else {
        $("#menu-dl-box").find(".item-check").each(function () {
            if ($(this).is(":checked")) {
                var _pppt = $(this).parent().parent().parent();
                var _roomType = $("#house-dl:visible option:selected").val();
                var type = $("#menu-dl option:selected").text();
                switch (type) {
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
                var _ps_on = returnNumber(_pppt.find(".ps_on").val());
                var _ps_gb = returnNumber(_pppt.find(".ps_gb").val());
                $("#menu-dl-list").append(
                    '<dd class="menu-content" data-type="add">' +
                    '<span style="width:40px">' + ($("#menu-dl-list .menu-content").length + 1) + '</span>' +
                    '<span style="width:84px"><label class="item-type ' + bg + '">' + type + '</label></span>' +
                    '<span style="width:84px">' + returnValue(_roomType) + '</span>' +
                    '<span style="width:85px;max-width:85px;" title="' + _pppt.find(".ps_name").val() + '">' + _pppt.find(".ps_name").val() + '</span>' +
                    '<span style="width:86px;max-width:86px;" title="' + _pppt.find(".ps_bd").val() + '">' + _pppt.find(".ps_bd").val() + '</span>' +
                    '<span style="width:60px">' + _pppt.find(".ps_num").val() + '</span>' +
                    '<span style="width:60px">' +
                    '<label class="check-item ' + (_ps_on == 0 ? "check-item-well" : "check-item-old") + '">' +
                    '<input type="checkbox" class="ps_on" onclick="changeCheckItem(this)" data-type="on" value="' + _ps_on + '" ' + (_ps_on == 0 ? 'checked' : '') + '>' +
                    '<span>' + (_ps_on == 0 ? "新" : "旧") + '</span>' +
                    '</label></span>' +
                    '<span style="width:60px">' +
                    '<label class="check-item ' + (_ps_gb == 0 ? 'check-item-well' : 'check-item-bad') + '">' +
                    '<input type="checkbox" class="ps_gb" onclick="changeCheckItem(this)" data-type="gb" value="' + _ps_gb + '" ' + (_ps_gb == 0 ? 'checked' : '') + '>' +
                    '<span>' + (_ps_gb == 0 ? '好' : '坏') + '</span>' +
                    '</label></span>' +
                    '<span style="width:60px"><a href="javascript:;" onclick="removeList(this)" class="error">移除</a></span>' +
                    '</dd>');
                $(".i-hint").text($("#menu-dl-list .menu-content").length);
            }
        });
        // 添加提示
        var _this = $(obj);
        _this.after('<label class="option-hint">添加成功</label>');
        _this.attr("disabled", "disabled");
        $(".item-check,#item-ckAll").removeAttr("checked").parent().removeClass("item-cked");

        setTimeout(function () {
            _this.parent().find(".option-hint").remove();
            _this.removeAttr("disabled");
        }, 1000)
    }
}

function removeList(obj) {
    var _this = $(obj);
    _this.parents(".menu-content").remove();
    $("#menu-dl-list .menu-content").each(function (index) {
        $(this).find("span:eq(0)").text(index + 1);
    });
    $(".i-hint").text($("#menu-dl-list .menu-content").length);
}

/** */
function queryItemList() {
    var _body = $(_OBJ + "-Body");
    $.ajax({
        type: "POST",
        url: "/queryItemPagList",
        data: {
            type: $(_OBJ + " #param_type").val(),
            name: $(_OBJ + " #param_name").val(),
            param: $(_OBJ + "-search").val(),
            pageNo: $(_OBJ + " #pageNo").val()
        },
        dataType: "json"
    }).done(function (result) {
        if (result.code == 200) {
            _body.empty();
            $.each(result.data.list, function (index, data) {
                _body.append(
                    '<tr onclick="addItemList(this);">' +
                    '<input type="hidden" class="pId" value="' + returnNumber(data.purchaseItems_id) + '">' +// onclick="setInfo(this);",\'' + param + '\'
                    '<input type="hidden" id="num" value="' + returnNumber(data.purchaseItems_count) + '">' +// onclick="setInfo(this);",\'' + param + '\'
                    '<input type="hidden" id="on" value="' + returnNumber(data.purchaseItems_On) + '">' +
                    '<input type="hidden" id="gb" value="' + returnNumber(data.purchaseItems_Gb) + '">' +
                    '<td class="data0">' + returnValue(data.purchaseItems_type) + '</td>' +
                    '<td class="data1">' + returnValue(data.purchaseItems_name) + '</td>' +
                    '<td class="data2">' + returnValue(data.purchaseItems_brand) + '</td>' +
                    '<td class="data3">' + returnNumber(data.purchaseItems_count) + '</td>' +
                    '<td class="data4">' + returnValue(data.purchaseItems_source) + '</td>' +
                    '<td class="data5">' + (typeof(data.contractObject_No) == "undefined" || data.contractObject_No == "" ? "空闲" : "使用中") + '</td>' +
                    '</tr>');
            });
            $(_OBJ + " #totalPage").text(result.data.totalPage);
            $(_OBJ + " #totalRecords").text(result.data.totalRecords);
        }
    });
}

/** 添加房屋配置记录*/
function changeSelect(obj) {
    var _this = $(obj);
    switch (_this.attr("id")) {
        case "menu-dl":
            var _id = returnNumber(_this.val());
            if ($("#item-ckAll").is(":checked")) {
                $("#item-ckAll").parent().click();
            }
            if (_id == 208) {
                $("#house-dl").hide();
            } else {
                $("#house-dl").show();
            }
            var html = "";
            $.each(_this.data().data, function (index, data) {
                if (data.ht_parentId == returnNumber(_this.val())) {
                    html += '<dd class="menu-content">' +
                        '<span style="width:10%"><label class="item-ck"><i></i><input type="checkbox" class="item-check" onclick="changeAdd(this)"></label></span>' +
                        '<span style="width:20%"><input type="text" class="menu-content-input ps_name" value="' + data.ht_name + '" readonly style="border: none"></span>' +
                        '<span style="width:30%"><input type="text" class="menu-content-input ps_bd" placeholder="品牌"></span>' +
                        '<span style="width:10%"><input type="text" class="menu-content-input number ps_num" value="1" maxlength="4" placeholder="数量"></span>' +
                        '<span style="width:15%"><label class="check-item check-item-old"><input type="checkbox" class="ps_on" onclick="changeCheckItem(this)" data-type="on" value="1"><span>旧</span></label></span>' +
                        '<span style="width:15%"><label class="check-item check-item-well"><input type="checkbox" class="ps_gb" onclick="changeCheckItem(this)" data-type="gb" value="0" checked><span>好</span></label></span>' +
                        '</dd>';
                }
            });
            html += '<dd class="menu-content">' +
                '<span style="width:10%"><label class="item-ck"><i></i><input type="checkbox" class="item-check" onclick="changeAdd(this)"></label></span>' +
                '<span style="width:20%"><input type="text" class="menu-content-input ps_name" placeholder="其他" ></span>' +
                '<span style="width:30%"><input type="text" class="menu-content-input ps_bd" placeholder="品牌"></span>' +
                '<span style="width:10%"><input type="text" class="menu-content-input number ps_num" value="1" maxlength="4" placeholder="数量"></span>' +
                '<span style="width:15%"><label class="check-item check-item-old"><input type="checkbox" class="ps_on" onclick="changeCheckItem(this)" data-type="on" value="1"><span>旧</span></label></span>' +
                '<span style="width:15%"><label class="check-item check-item-well"><input type="checkbox" class="ps_gb" onclick="changeCheckItem(this)" data-type="gb" value="0" checked><span>好</span></label></span>' +
                '</dd>';
            $("#menu-dl-box").html(html);
            break;
        default :
            if ($(obj).attr("id") == "param_type") {
                $("#param_name").empty();
                $("#param_name").append('<option value="">全部</option>');
                $.each(result.data, function (index, data) {
                    $("#param_name").append('<option value="' + data.ht_name + '">' + data.ht_name + '</option>');
                });
                return;
            }
            if ("ps_type" == $(obj).attr("id")) {
                $("#ps_qt").hide();
                $("#ps_name").empty();
                $.each(result.data, function (index, data) {
                    $("#ps_name").append('<option value="' + data.ht_name + '">' + data.ht_name + '</option>');
                });
                $("#ps_name").append('<option value="其他">其他</option>');
                return;
            }
            if ("purchaseItems_type" == $(obj).attr("id")) {
                $("#pi_qt").hide();
                $("#purchaseItems_name").empty();
                $.each(result.data, function (index, data) {
                    $("#purchaseItems_name").append('<option value="' + data.ht_name + '">' + data.ht_name + '</option>');
                });
                $("#purchaseItems_name").append('<option value="其他">其他</option>');
                return;
            }
            break;
    }
}

function changeCheckItem(obj) {
    var _this = $(obj);
    var _type = _this.attr("data-type");
    var _parent = _this.parent();
    var _well = "check-item-well";
    var _old = "check-item-old";
    var _bad = "check-item-bad";
    _parent.removeClass(_well)
    .removeClass(_old)
    .removeClass(_bad);
    if (_this.is(":checked")) {
        if (_type == "on") {
            _parent.addClass(_well);
            _parent.find("span").text("新");
            _this.val(0);
        }
        if (_type == "gb") {
            _parent.addClass(_well);
            _parent.find("span").text("好");
            _this.val(0);
        }
    } else {
        if (_type == "on") {
            _parent.addClass(_old);
            _parent.find("span").text("旧");
            _this.val(1);
        }
        if (_type == "gb") {
            _parent.addClass(_bad);
            _parent.find("span").text("坏");
            _this.val(1);
        }
    }
}
