$(function () {
    data();
});

/** 遍历数据*/
function data(bools, ucc_id) {
    var mode = getQueryString("mode");
    var houseAdd = 0;
    $("#content").table({
        search: true,
        dataBool: bools,
        dataTime: [
            {
                name: "存房时间",
                string: "hi_date"
            },
            {
                name: "起始时间",
                string: "contract_beginDate"
            },
            {
                name: "到期时间",
                string: "contract_expiryDate"
            }
        ],
        title: [
            {
                name: "编号",
                string: "hi_code",
                parameter: ""
            },
            {
                name: "小区房号",
                string: "house_address",
                parameter: "",
                leftDiv: '<i class="fa-image" onclick="selectImg(this)"></i>',
                rightDiv: "<div class='rightContent' style='float:left; margin-left:10px; padding:0 6px; margin-top:7px; background-color: #E74C3C; color:#FFF; height:22px; line-height:22px; text-indent: 0; border-radius: 3px;'>?hi_boolActive&</div>",
                href: "/houseLibrary/jumpHouseInfo&hi_code"
            },
            {
                name: "招租期",
                string: "hi_leaseDay",
                parameter: ""
            },
            {
                name: "发布审核",
                string: "hp_status",
                parameter: {
                    10: "审核中",
                    11: "审核未通过",
                    12: "审核通过",
                }
            },
            {
                name: "招租类型",
                string: "hi_isForRent",
                parameter: {
                    0: "停止招租",
                    1: "正在招租",
                    2: "暂停招租"
                    /*
                     1001: "新存招租",
                     1002: "转租招租",
                     1003: "退租招租",
                     1004: "到期招租",
                     1005: "强收招租",
                     1006: "换房招租",
                     1020: "停止招租",
                     1021: "已解约",
                     1022: "未接房",
                     2000: "暂停招租"*/
                }
            },
            {
                name: "特价房源",
                string: "hi_boolActive",
                parameter: {
                    0: "",
                    1: "特价",
                },
                string1_prefix: "/",
                string1: "pst_name",
                parameter1: ""
            },
            {
                name: "统一出房价",
                string: "hi_money",
                parameter: ""
            },
            {
                name: "房屋区域",
                string: "hi_area",
                parameter: ""
            },
            {
                name: "公司回收",
                string: "hi_houseActive",
                parameter: {
                    "null": "",
                    0: "否",
                    1: "是",
                }
            },
            {
                name: "房屋品牌",
                string: "hb_name",
                parameter: ""
            },
            {
                name: "户型",
                string: "houseTSW",
                parameter: ""
            },
            {
                name: "房东",
                string: "he_peopleName",
                parameter: "",
                string1: "he_phone",
                parameter1: ""
            },
            {
                name: "房屋管家",
                string: "em_name",
                parameter: "",
                string1: "em_phone",
                parameter1: ""
            },
            {
                name: "房源归属部门",
                string: "ucc_name",
                parameter: "",
            },
        ],
        houseAdd: houseAdd,
        url: "/houseLibrary/information",
        data: {
            mode: mode,
            ucc_id: ucc_id,
            hi_forRentState: $("[name=hi_forRentState]").val() || 2
        },
        success: function (result) {
            $(result).find("tbody tr").each(function () {
                var rightContent = $(this).find("td").eq(2).find(".rightContent").text();
                if (rightContent == 0) {
                    $(this).find("td").eq(2).find(".rightContent").remove();
                } else {
                    $(this).find("td").eq(2).find(".rightContent").text("特价");
                }
                //招租状态
                var forRent = $(this).find("td").eq(5).text();
                $(this).find("td").eq(5).html(isForRent(forRent));
                //审核状态
                var check_status = $(this).find("td").eq(4).text();
                $(this).find("td").eq(4).html(returnCheckStatus(check_status));

                //获取参数
                var _checked = $(this).find("[name=check]").data("data") || "";
                //是否发布
                var push = _checked.he_isPublish;
                var td = $(this).find("td").eq(2).html();
                $(this).find("td").eq(2).text('');
                var td2 = $(this).find("td").eq(2);
                var div = '';
                if (push == 1) {  //不等于停止 解约  暂停招租
                    div = '<div>' + td + '<span style="color:white;font-style:normal;border:1px solid;margin-left:2px;padding:4px 6px;background-color:#27AE60;">' + "已发布" + '</span></div>';
                } else {
                    div = '<div>' + td + '<span style="color:white;font-style:normal;border:1px solid;margin-left:2px;padding:4px 6px;background-color:#E74C3C;">' + "未发布" + '</span></div>';
                }
                td2.append(div);

                //没线上图片不能点击变灰色
                var _this = $(this);
                $.ajax({
                    type: "POST",
                    url: "/houseLibrary/foldSImg",
                    data: {
                        hi_code: _checked.hi_code,
                        imgfoldName: 1
                    },
                    contentType: "application/x-www-form-urlencoded; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        var data = result.data.houseLibraryImageVos;
                        if (data == '') {
                            _this.find("td").eq(2).find("i").css('color', '#878787');
                            _this.find("td").eq(2).find("i").removeAttr('onclick');
                            _this.find("td").eq(2).find("i").css('cursor', 'default');
                        }
                    }
                });
            });

            if (bools == null) {
                $(result).find(".searchBar .department").remove();
                var html = "";
                $.ajax({
                    type: "POST",
                    url: "/user/saleDepartment",
                    data: {},
                    contentType: "application/x-www-form-urlencoded; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        var htm = "";
                        $(data.company).each(function (index, item) {
                            htm += "<option value='" + item.ucc_id + "'>" + item.ucc_name + "</option>";
                        });
                        $(result).find(".searchBar").append("<li><select class='department' style='height: 40px;' onchange='deSelect(this)'><option value=''>全部</option>" + htm + "</select></li>");
                    }
                });

                // 全部房源|有效房源|解约房源
                html = '';
                html += '<option value="1">全部房源</option>';
                html += '<option value="2" selected>有效房源</option>';
                html += '<option value="3">解约房源</option>';
                $(result).find(".searchBar").append("<li><select class='department' name='hi_forRentState' style='height: 40px;' onchange='data(false)'>" + html + "</select></li>");
            }
        }
    });
}

// 部门筛选
function deSelect(ids) {
    data(false, $(ids).val());
}

//跳转发布图片界面
function uploads() {
    var cbl_s = document.getElementsByName("chickes");
    var checkCount = 0;
    var id = 0;
    for (var i = 0; i < cbl_s.length; i++) {
        if (cbl_s[i].checked) {
            checkCount++;
            id = cbl_s[i].id;
        }
    }
    if (checkCount == 0) {
        $.jBox.info('请选择一个！', '管家婆管理系统');
    } else if (checkCount > 1) {
        $.jBox.info('只能选择一个！', '管家婆管理系统');
    } else {
        window.location.href = '/image/upload?id=' + id;
    }
}

//改变页面显示的房屋状态
function updataStart(house) {
    if (house.hi_measure == null) {
        house.hi_measure = "";
    }
    if (house.hi_type == null) {
        house.hi_type = "";
    }
    if (house.hi_money == null) {
        house.hi_money = "";
    }
    if (house.hi_keepMoney == null) {
        house.hi_keepMoney = "";
    }
    if (house.he_state == 'free') {
        house.he_state = "未租";
    }
    if (house.he_state == 'rental') {
        house.he_state = "已租";
    }
    if (house.he_state == 'expire') {
        house.he_state = "托管到期";
    }
    if (house.he_state == 'clean') {
        house.he_state = "需要打扫";
    }
    if (house.he_state == 'edit' || house.he_state == null) {
        house.he_state = "未发布";
    }
}

function setPage() {
    var nums = $("#nums").text();
    var page = $("input[name='spage']").val();
    $.cookie('the_cookie', page, {expires: 7, path: '/'});
    data();
}

function selectByCondition() {
    $("#Num").text("1");
    data();
}

function bianji() {
    $.jBox.tip('请先完善信息!');
}

function yulan() {
    $.jBox.tip('已发布房屋请到发布房源中预览');
}

/** 添加公寓*/
function addApartment() {
    window.location.href = '/houseLibrary/addApartmentPage';
}

/** 库存房源--修改房屋*/
function ckHouse() {
    var _checked = $(".personTable input[name=check]:checked");
    if (_checked.length == 1) {
        window.parent.href_mo('/houseLibrary/jumpHouseInfoEdit?hi_code=' + _checked.parent().attr("data-id"), "修改房屋", "库存房源");
    } else {
        $.jBox.tip("请选择一个房源");
    }
}

/** 库存房源--房源定价*/
function housePrice() {
    var hi_code = "";
    if ($("table tbody input[name='check']").is(":checked")) {
        hi_code = $("table tbody input[name='check']:checked").parent().attr("data-id");
    }
    if (hi_code == "") {
        $.jBox.tip("请选择一个房屋！", "error");
        return;
    }
    $.ajax({
        type: "POST",
        url: "/housePrice/selectHouseyear",
        data: {
            hi_code: hi_code
        },
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.message == "active") {
                $.jBox.tip("该房屋已经参加活动!", "error");
            } else if (result.message == "error") {
                $.jBox.tip("没有该房屋定价权限", "error");
            } else if (result.message == "success") {
                var html = "";
                var submit = function (v, h, f) {
                    var money = "";
                    var pm_id = $("#pm_id").val();
                    var bools = 1;
                    $(".housePrice dd input").each(function (index) {
                        money += $(this).val() + "-";
                    });
                    if (pm_id != "") {
                        bools = 2;
                    }
                    money = money.substring(0, money.length - 1);
                    $.ajax({
                        type: "POST",
                        url: "/housePrice/addPriceMoney",
                        data: {
                            pm_outMoney: money,
                            pm_id: pm_id,
                            bools: bools,
                            hi_code: hi_code
                        },
                        contentType: "application/x-www-form-urlencoded; charset=utf-8",
                        dataType: "json",
                        success: function (result) {
                            if (result.message == "success") {
                                $.jBox.tip("定价成功！", "success");
                                return true;
                            } else {
                                $.jBox.tip("定价失败，请重新尝试！", "error");
                                return false;
                            }
                        }
                    });
                }
                var money;
                if (result.money != null) {
                    money = result.money.split("-");
                }
                var content = "";
                if (money == null) {
                    if (result.year != 0) {
                        for (var i = 0; i < result.year; i++) {
                            if (i == 0) {
                                content += "<div style='width:100%; margin-bottom:5px;'>第" + (i + 1) + "年：<input type='text' class='housePrice_" + (i + 1) + "' placeholder='第" + (i + 1) + "年' /><label style='color:#E74C3C; width: 150px; margin-left: 5px;'>建议定价：" + (result.outMoney + 100) + "~" + (result.outMoney + 200) + "</label></div>";
                            } else {
                                content += "<div style='width:100%; margin-bottom:5px;'>第" + (i + 1) + "年：<input type='text' class='housePrice_" + (i + 1) + "' placeholder='第" + (i + 1) + "年' /><label style='color:#E74C3C; width: 150px; margin-left: 5px;'>建议定价：" + (result.outMoney + (i * 200) + 100) + "~" + (result.outMoney + (i * 200) + 200) + "</label></div>";
                            }
                        }
                    } else {
                        content = "<div style='width:100%; margin-bottom:5px;'>第1年：<input type='text' class='housePrice_1' placeholder='第1年' /><label style='color:#E74C3C; width: 150px; margin-left: 5px;'>建议定价：" + (result.outMoney + 100) + "~" + (result.outMoney + 200) + "</label></div>";
                    }
                } else {
                    if (result.year != 0) {
                        for (var i = 0; i < result.year; i++) {
                            if (i == 0) {
                                content += "<div style='width:100%; margin-bottom:5px;'>第" + (i + 1) + "年：<input type='text' value='" + money[i] + "' class='housePrice_" + (i + 1) + "' placeholder='第" + (i + 1) + "年' /><label style='color:#E74C3C; width: 150px; margin-left: 5px;'>建议定价：" + (result.outMoney + 100) + "~" + (result.outMoney + 200) + "</label></div>";
                            } else {
                                content += "<div style='width:100%; margin-bottom:5px;'>第" + (i + 1) + "年：<input type='text' value='" + money[i] + "' class='housePrice_" + (i + 1) + "' placeholder='第" + (i + 1) + "年' /><label style='color:#E74C3C; width: 150px; margin-left: 5px;'>建议定价：" + (result.outMoney + (i * 200) + 100) + "~" + (result.outMoney + (i * 200) + 200) + "</label></div>";
                            }
                        }
                    } else {
                        content = "<div style='width:100%; margin-bottom:5px;'>第1年：<input type='text' class='housePrice_1' placeholder='第1年' /><label style='color:#E74C3C; width: 150px; margin-left: 5px;'>建议定价：" + (result.outMoney + 100) + "~" + (result.outMoney + 200) + "</label></div>";
                    }
                }
                var pm_id = "";
                if (result.pm_id != null) {
                    pm_id = result.pm_id;
                }
                content = content.substring(0, content.length - 1);
                html += '<div class="housePrice">' +
                    '<dl>' +
                    '<dt>存房价格：￥<span class="priceOutMoney">' + result.outMoney + '</span></dt>' +
                    '<dd>' + content + '</dd>' +
                    '</dl>' +
                    '<input type="hidden" id="pm_id" value="' + pm_id + '" />' +
                    '</div>';
                $.jBox(html, {title: "房源定价", width: 500, submit: submit});
            }
        }
    });
}

/** 库存房源--查看图片 */
function selectImg(obj) {
    var _checked = $(obj).parents("tr").find("[name=check]");
    $.ajax({
        type: "POST",
        url: "/houseLibrary/foldSImg",
        data: {
            hi_code: _checked.data("data").hi_code,
            imgfoldName: 1
        },
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var data = result.data.houseLibraryImageVos;
            switch (result.code) {
                case 200:
                    $("#image-model").remove();
                    var html = "";
                    html += '<div id="image-model">';
                    html += '	<div class="image-model-title drag">房屋图片<a href="javascript:$(\'#image-model\').remove();" class="icon-remove"></a><a href="javascript:$(\'#image-model\').remove();" style="cursor: pointer;color:#ff6666;float:right;">X</a></div>';
                    html += '	<div class="image-model-content">';
                    html += '		<figure id="house_slider" class="swipeslider">';
                    html += '  			<ul class="sw-slides">';
                    for (var i = 0; i < data.length; i++) {
                        var url = data[i].hm_path;
                        html += '    <li class="sw-slide">';
                        html += '      <img src="' + url + '">';
                        html += '    </li>';
                    }
                    html += '  			</ul>';
                    html += '		</figure>';
                    html += '	</div>';
                    html += '</div>';
                    $("body").append(html);
                    $("#house_slider").swipeslider();
                    modelMove();
                    break;
                default :
                    break;
            }
        }
    });
    $(".sw-slides").viewer();
    //	window.parent.href_mo("/houseLibrary/jumpHouseInfo?hi_code=" + _checked.data("data").hi_code + "#houseImage", "房屋信息", "房屋照片");
    //	$.ajax({
    //  	    type: "POST",
    //		url: "/houseLibrary/getHouseImageList",
    //		data: {
    //			hi_id: _checked.data("data").hi_id
    //		},
    //  	    dataType: "json",
    //  	}).done(function(result){
    //  		if(result.code != 200){
    //  			$.jBox.tip(result.msg);
    //  			return;
    //  		}
    //		var html ="";
    //		html +='<figure id="house_slider" class="swipeslider">';
    //		html +='	<ul class="sw-slides">';
    //		$.each(result.data, function(index, data){
    //			var type = '';
    //			var type_class;
    //			switch (data.hit_type) {
    //				case "page":
    //					type = "封面图片";
    //					type_class = 'next-bg';
    //					break;
    //				case "effect":
    //					type = "效果图片";
    //					type_class = '';
    //					break;
    //				case "solid":
    //					type = "户型图片";
    //					type_class = 'hint-bg';
    //					break;
    //				case "3d":
    //					type = "3D图片";
    //					type_class = 'error-bg';
    //					break;
    //			}
    //			html +='    <li class="sw-slide">';
    //			html +='      <img src="'+ data.houseImage.hm_path +'" alt="'+ type +'" title="'+ type +'">';
    //			html +='    </li>';
    //		});
    //		html +='	</ul>';
    //		html +='</figure>';
    //		$.jBox(html, { title : "房源图片", width : 700});
    //		$("#house_slider").swipeslider();
    //  	});
}

/** 库存房源--房屋归属*/
function houseGs() {
    var html = "";
    var submit = function (v, h, f) {

    }
    var html = "<input type='text' id='house_address' onchange='dataHouseG()'>";
    html += '<table id="houseG">';
    html += '<thead>';
    html += '	<tr style="background: #F5F8FA;">';
    html += '		<th width="22%">房屋编号</th>';
    html += '		<th width="22%">小区房号</th>';
    html += '		<th width="22%">所属部门</th>';
    html += '		<th width="22%">所属人</th>';
    html += '		<th width="12%">操作</th>';
    html += '	</tr>';
    html += '</thead>';
    html += '<tbody>';
    html += '</tbody>';
    html += '</table>';
    $.jBox(html, {title: "离职人员房源归属", width: 700, height: 500, submit: submit});
    dataHouseG();
}

function dataHouseG() {
    var checkBox = $("tbody .checkbox-min input[name='check']:checked");
    var code = checkBox.parent().attr("data-id");
    var value = checkBox.parent().parent().next().next().text();
    // 查询房屋所属部门信息
    var content = "";
    $.ajax({
        type: "POST",
        url: "/houseLibrary/queryHousePosition",
        data: {
            hiCode: code,
            house_address: $("#house_address").val()
        },
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $(result.emState).each(function (index, item) {
                content += '	<tr data-index="' + index + '" data-id="' + item.hpr_id + '">';
                content += '	<input type="hidden" id="postionId">';
                content += '	<td style="text-align: center;" data-id="' + item.hi_code + '">' + item.hi_code + '</td>';
                content += '	<td style="text-align: center;">' + item.house_address + '</td>';
                content += '	<td style="text-align: center;" data-id="' + item.ucc_id + '">' + (item.ucc_name == null ? "" : item.ucc_name) + '</td>';
                content += '	<td style="text-align: center;" data-id="' + item.hpr_newEmp + '">' + item.em_name_new + '</td>';
                content += '	<td style="padding-left: 22px;"><a onclick="queryPositionList(this)" style="color:#00a4ac;cursor: pointer;">编辑</a></td>';
                content += '	</tr>';
                content += '	<tr class="dwonContent" style="display:none;">';
                content += '	<td colspan="5"><div class="updateContent"></div></td>';
                content += '	</tr>';
            });
            $("#houseG tbody").html(content);
        }
    });
}

/** 库存房源--编辑部门分配*/
function queryPositionList(ids) {
    var _this = $(ids).parent().parent().next();
    var _text = $(ids).parent().parent().find('td').eq(2).text();
    var html = "";
    html += "<dl>";
    html += "<dt>归属部门</dt>";
    html += "<dd><input type='text' value='" + $(_this).prev().find("td").eq(2).text() + "' onclick='editDepartment(this)' name='department" + $(ids).parent().parent().attr("data-index") + "'><input type='hidden' value='" + $(_this).prev().find("td").eq(2).attr("data-id") + "' name='IDdepartment" + $(ids).parent().parent().attr("data-index") + "'></dd>";
    html += "</dl>";
    html += "<dl>";
    html += "<dt>归属人</dt>";
    html += "<dd><input type='text' value='" + $(_this).prev().find("td").eq(3).text() + "' onclick='editName(this)' name='EMDepartment" + $(ids).parent().parent().attr("data-index") + "'><input type='hidden' value='" + $(_this).prev().find("td").eq(3).attr("data-id") + "' name='IDEMDepartment" + $(ids).parent().parent().attr("data-index") + "'></dd>";
    html += "</dl>";
    if (_text == null || _text == '' || typeof(_text) == 'undifined') {
        html += "<dl style='width: 100%;'>";
        html += "<dd style='width: 100%;'><button onclick='positionEdit(this)'>添加</button></dd>";
        html += "</dl>";
    } else {
        html += "<dl style='width: 100%;'>";
        html += "<dd style='width: 100%;'><button onclick='positionEdit(this)'>修改</button></dd>";
        html += "</dl>";
    }
    $(_this).find(".updateContent").html(html);
    $(".dwonContent").hide();
    $(_this).show();
}

/** 编辑框选择部门信息 */
function editDepartment(ids) {
    var id = $(ids).next().attr("name");
    var name = $(ids).attr("name");
    $(ids).openModel({
        title: "部门信息",
        target: {
            id: id,
            name: name,
        }
    });
}

/** 编辑框选择管家信息 */
function editName(ids) {
    var id = $(ids).next().attr("name");
    var name = $(ids).attr("name");
    $(ids).openModel({
        title: "管家信息",
        target: {
            id: id,
            name: name,
        },
        select_all: true
    });
}

/** 房源归属*/
function positionEdit(ids) {
    var _parent = $(ids).parent().parent();
    var ucc_id = $(_parent).prev().prev().find("input").eq(1).val();
    var hpr_newEmp = $(_parent).prev().find("input").eq(1).val();
    var hpr_id = $(_parent).parent().parent().parent().prev().attr("data-id");
    var hi_code = $(ids).parents("tr.dwonContent").prev().find("td:first").attr("data-id");
    $.ajax({
        type: "POST",
        url: "/houseLibrary/updatePosition",
        data: {
            hpr_id: hpr_id,
            hpr_newEmp: hpr_newEmp,
            ucc_id: ucc_id,
            hi_code: hi_code
        },
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $.jBox.tip("归属成功!");
            houseGs();
        }
    });
}

/** 跳转页面*/
function hrefClick(ids) {
    window.parent.href_mo($(ids).attr("data-type"), "房屋信息", "库存房源");
}
