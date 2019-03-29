var customerData = null;
//身份证
var cardCode = "";
var tt = "";
//定位数组
var position = '';
$(function () {
    $(".leftTile-menu a").attr("class", "nav-menu");
    //	if(getUrlParam("typeState") == null || getUrlParam("typeState") == 1){
    //		$(".leftTile-menu a").each(function(i){
    //			if(i == 0){
    //				$(this).attr("class", "nav-menu nav-menu-focus");
    //				$("#contents1").show();
    //				$("#contents2").hide();
    //			}
    //		});
    //	}else if(getUrlParam("typeState") == 2){
    //		$(".leftTile-menu a").each(function(i){
    //			if(i == 1){
    //				$(this).attr("class", "nav-menu nav-menu-focus");
    //				$("#contents1").hide();
    //				$("#contents2").show();
    //			}
    //		});
    //	}
    $(".leftTile-menu a").eq(0).click();

    if (getUrlParam("cc_code") == null) {
        customerEdit();
        $("#sex").attr("disabled", true);
        $(".bankCode").bankInput();
    } else {
        data();
        init_power();
    }

    var images = new Array();
    $("#image-upload-box").imageUpload({
        width: 110,
        height: 110,
        dataList: images,
        success: function (box) {
            box.css("width", "100%");
            // 添加提示信息
            var html = '';
            html += '<div class="tips">';
            html += '	<span class="" style="display: inline-block;margin-top: 12px;color: #666666">温馨提示：</span>';
            html += '	<ul class="" style="font-size: 12px;color: #666;">';
            html += '		<li class="">1、拍照时请保持房间干净整洁，照片内不要有人像</li>';
            html += '		<li class="">2、手机横向拍摄，保持水平</li>';
            html += '		<li class="">3、建议尺寸：1366*768，最大15M；仅支持jpg、png格式</li>';
            html += '		<li class="">4、照片数量：最少5张、最多24张</li>';
            html += '	</ul>';
            html += '</div>';
            box.after(html);
        },
        builds: {
            onUpload: function (img) {
                // 待开发
            },
            onDelete: function (path) {
                // 待开发
            }
        }
    });

    // 小区房号搜索
    $("input[name=houseSorceId]").AutoAddressSearch({
        placeholder: "小区房号",
        result: function (obj) {
            $("[name=hi_price]").val(returnFloat($(obj).attr("data-hi_price")));
            $("#hi_code").val(returnValue($(obj).attr("data-hi_code")));
            housePayType($("#hs_payType"));
        }
    });

    // 产权地址搜索
    $("input[name=propertyInfo_id]").AutoSearch({
        placeholder: "物业名称",
        result: function (obj) {
            $.ajax({
                type: "POST",
                url: "/houseLibrary/queryPropertyInfoList",
                data: {
                    upn_sid: $(obj).attr("data-uid")
                },
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    switch (result.code) {
                        case 200:
                            $("select[name=porp_name]").remove();
                            // 更新物业
                            initPropertyNameList(result.data);
                            // 更新房屋楼层房号显示
                            initHouseFloorAddress();
                            break;
                    }
                }
            });
        }
    });

    //关闭窗口
    $('.cd-popup-close').on('click', function (event) {
        event.preventDefault();
        $(".cd-popup3").removeClass('is-visible3');
    });

    customerEdit();
    checkTextLength("fangyuandianpings");//房源点评字数统计
});

/**
 * 选择证件类型
 */
function IDCardChange() {
    if ($("#cardType").val() == 1) {
        $("#sex").attr("disabled", true);
    } else {
        $("#sex").attr("disabled", false);
    }
}

/**
 * 选择按钮
 *
 * @param ids
 */
function clickTitle(ids) {
    $(".leftTile-menu a").attr("class", "nav-menu")
    $(ids).attr("class", "nav-menu nav-menu-focus");
    if ($(ids).text() == "客户概述") {
        $("#contents1").show();
        $("#contents2").hide();
        $("#contents3").hide();
        $("#contents4").hide();
        $("#contents5").hide();
        $("#contents6").hide();
        $(".title_top li", window.parent.document).each(function (i) {
            if ($(this).css("background-color") == "rgb(48, 54, 65)") {
                var href = $(this).find(".meunTitle").attr("data-href").replace("&typeState=1", "");
                href = href.replace("&typeState=2", "").replace("&typeState=3", "").replace("&typeState=4", "").replace("&typeState=5", "").replace("&typeState=6", "");
                $(this).find(".meunTitle").attr("data-href", href + "&typeState=1");
            }
        });
    } else if ($(ids).text() == "客户完善") {
        //检查是否为正式客户
        $.ajax({
            type: "POST",
            url: "/customer/isCustomer",
            data: {
                cc_code: returnValue(getUrlParam("cc_code"))
            },
            dataType: "json",
            success: function (result) {
                if (result.isCustomer) {
                    $("#contents2").show();
                } else {
                    $.jBox.tip("该客户为意向客户，暂不支持完善信息", "error");
                    $("#contents2").hide();
                }
            }
        });
        $("#contents1").hide();
        //		$("#contents2").show();
        $("#contents3").hide();
        $("#contents4").hide();
        $("#contents5").hide();
        $("#contents6").hide();
        $(".title_top li", window.parent.document).each(function (i) {
            if ($(this).css("background-color") == "rgb(48, 54, 65)") {
                var href = $(this).find(".meunTitle").attr("data-href").replace("&typeState=2", "");
                href = href.replace("&typeState=1", "").replace("&typeState=3", "").replace("&typeState=4", "").replace("&typeState=5", "").replace("&typeState=6", "");
                $(this).find(".meunTitle").attr("data-href", href + "&typeState=2");
            }
        });
        initInterface();
    } else if ($(ids).text() == "房源录入") {
        $("#contents1").hide();
        $("#contents2").hide();
        $("#contents3").show();
        $("#contents4").hide();
        $("#contents5").hide();
        $("#contents6").hide();
        $(".title_top li", window.parent.document).each(function (i) {
            if ($(this).css("background-color") == "rgb(48, 54, 65)") {
                var href = $(this).find(".meunTitle").attr("data-href").replace("&typeState=3", "");
                href = href.replace("&typeState=1", "").replace("&typeState=2", "").replace("&typeState=4", "").replace("&typeState=5", "").replace("&typeState=6", "");
                $(this).find(".meunTitle").attr("data-href", href + "&typeState=3");
            }
        });
    } else if ($(ids).text() == "客户带看") {
        $("#contents1").hide();
        $("#contents2").hide();
        $("#contents3").hide();
        $("#contents4").show();
        $("#contents5").hide();
        $("#contents6").hide();
        $(".title_top li", window.parent.document).each(function (i) {
            if ($(this).css("background-color") == "rgb(48, 54, 65)") {
                var href = $(this).find(".meunTitle").attr("data-href").replace("&typeState=4", "");
                href = href.replace("&typeState=2", "").replace("&typeState=3", "").replace("&typeState=1", "").replace("&typeState=5", "").replace("&typeState=6", "");
                $(this).find(".meunTitle").attr("data-href", href + "&typeState=4");
            }
        });
        // 初始化客户带看记录
        initSeeingRecord();
    } else if ($(ids).text() == "客户日志") {
        $("#contents1").hide();
        $("#contents2").hide();
        $("#contents3").hide();
        $("#contents4").hide();
        $("#contents5").show();
        $("#contents6").hide();
        $(".title_top li", window.parent.document).each(function (i) {
            if ($(this).css("background-color") == "rgb(48, 54, 65)") {
                var href = $(this).find(".meunTitle").attr("data-href").replace("&typeState=6", "");
                href = href.replace("&typeState=2", "").replace("&typeState=3", "").replace("&typeState=4", "").replace("&typeState=5", "").replace("&typeState=1", "");
                $(this).find(".meunTitle").attr("data-href", href + "&typeState=6");
            }
        });
        initCustomerLog();
        queryUserCenterInformationList();
        $("select[name=record-add-type],[name=record-type]").removeAttr("disabled");
    } else if ($(ids).text() == "客户评价") {
        $("#contents1").hide();
        $("#contents2").hide();
        $("#contents3").hide();
        $("#contents4").hide();
        $("#contents5").hide();

        //检查是否为正式客户
        $.ajax({
            type: "POST",
            url: "/customer/isCustomer",
            data: {
                cc_code: returnValue(getUrlParam("cc_code"))
            },
            dataType: "json",
            success: function (result) {
                if (result.isCustomer) {
                    $("#contents6").show();
                } else {
                    $.jBox.tip("该客户为意向客户，暂不支持客户评价", "error");
                    $("#contents6").hide();
                }
            }
        });
        $(".title_top li", window.parent.document).each(function (i) {
            if ($(this).css("background-color") == "rgb(48, 54, 65)") {
                var href = $(this).find(".meunTitle").attr("data-href").replace("&typeState=5", "");
                href = href.replace("&typeState=2", "").replace("&typeState=3", "").replace("&typeState=4", "").replace("&typeState=1", "").replace("&typeState=6", "");
                $(this).find(".meunTitle").attr("data-href", href + "&typeState=5");
            }
        });
    }

    window.parent.titleCookie();
}

/**
 * 初始化客户日志信息
 * @returns
 */
function initCustomerLog() {
    // 【初始化选项数据】
    $.ajax({
        type: "POST",
        url: "/customer/queryCustomerLogType",
        data: {},
        dataType: "json",
    }).done(function (result) {
        if (result.code != 200) {
            return;
        }
        // 类型
        var _option = '<option value="">选择来源</option>';
        var _option2 = '';
        $("[name=record-source]").append(_option);
        $("[name=record-add-type]").append(_option2);

        $.each(result.data.userLogType, function (index, data) {
            _option += '<option value="' + returnValue(data.type_id) + '">' + returnValue(data.type_name) + '</option>';
            _option2 += '<option value="' + returnValue(data.type_id) + '">' + returnValue(data.type_name) + '</option>';
        });
        $("[name=record-type]").append(_option);
        $("[name=record-add-type]").append(_option2);

        // 加载数据
        queryCustomerLogList();
    });

    // 【条件变更】
    $("[name=record-contract],[name=record-type],[name=record-source],[name=record-where]").on("change", function () {
        $("#record-pageNo").val(1);
        queryCustomerLogList();
    });

    // 【选择文件】
    $("[name=record-file]").on("change", function () {
        for (var i = 0; i < this.files.length; i++) {
            var _file = this.files[i];
            var _suffix = _file.name.substring(_file.name.lastIndexOf(".") + 1, _file.name.length);

            if (_file.size > 20 * 1024 * 1024) {
                $.jBox.tip(_file.name + " 文件大小超过20MB，上传文件不能大于20MB");
                $(this).val("");
                return false;
            }
            var _unfile = 'exe|bat';
            if (_unfile.indexOf(_suffix) > -1) {
                $.jBox.tip("不支持exe、bat等类型的文件上传");
                $(this).val("");
                return false;
            }
            var _size = _file.size;
            if (_size / 1024 < 1) {
                _size = _size + " B";
            } else if (_size / 1024 / 1024 < 1) {
                _size = returnFloat(_size / 1024) + " KB";
            } else {
                _size = returnFloat(_size / 1024 / 1024) + " MB";
            }

            var _names = "pad|txt|pdf|swf|zip|rar|xls|ppt|ttf|doc";
            var _img = '';
            if (_names.indexOf(_suffix) > -1) {
                _img = '<img src="/resources/common/zyupload/skins/images/fileType/' + _suffix + '.png">';
            } else {
                var _imgs = "png|jpg|gif";
                if (_imgs.indexOf(_suffix) > -1) {
                    var URL = window.URL || window.webkitURL;
                    var blobURL = URL.createObjectURL(_file);
                    _img = '<img src="' + blobURL + '">';
                } else {
                    _img = '<img src="/resources/common/zyupload/skins/images/fileType/unknown.png">';
                }
            }

            var _subitem_len = $(".more-main-item-subitem").length + 1;

            var data = new FormData();
            data.append("file", _file);
            data.append("index", _subitem_len);
            $.ajax({
                type: "POST",
                url: "/contractObject/uploadFile",
                data: data,
                dataType: "json",
                processData: false,
                contentType: false,
                beforeSend: function () {
                    var html = '';
                    html += '<div class="more-main-item-subitem item-subitem' + _subitem_len + '">';
                    html += '    <span class="item-subitem-1">' + _img + '</span>';
                    html += '    <span class="item-subitem-2">';
                    html += '    	<label class="attach-file-name" style="display: block;height: 20px;line-height: 20px;font-size: 13px;color: #000;">' + _file.name + '</label>';
                    html += '    	<label class="attach-file-size" style="display: block;height: 16px;line-height: 16px;">' + _size + '</label>';
                    html += '    </span>';
                    html += '    <span class="item-subitem-3">';
                    html += '    	<i class="upload-success icon-spinner icon-spin" title="上传中..."></i>';
                    html += '    </span>';
                    html += '	 <hr style="height: 0;">';
                    html += '</div>';
                    $("#record-attach-box").append(html);
                }
            }).done(function (result) {
                if (result.code != 200) {
                    return;
                }
                var _data = result.data;

                var _box = $(".item-subitem" + _data.index);
                var _sub_box_item = _box.find(".item-subitem-3");
                _sub_box_item.find(".icon-spinner").fadeOut();
                _sub_box_item.html('<i class="upload-success icon-ok-circle"></i>');

                _box.hover(function () {
                    $(this).find(".item-subitem-3").html('<i class="upload-success icon-remove-circle" onclick="deleteAttachFile(this,\'' + _data.url + '\')" title="删除附件"></i>');
                }, function () {
                    $(this).find(".item-subitem-3").html('<i class="upload-success icon-ok-circle"></i>');
                });
                _box.data("data", _data);

            });
        }
        $(this).val("");
    });

    var _box = $("#record-table-foot");

    // 【上一页】
    _box.find(".fa-angle-left").on("click", function () {
        var pageNo = returnNumber(_box.find("#record-pageNo").val());
        if (pageNo <= 1) {
            return;
        }
        var totalPage = returnNumber(_box.find("#record-totalPage").text());
        if (pageNo > totalPage) {
            _box.find("#record-pageNo").val(totalPage);
        } else {
            _box.find("#record-pageNo").val(pageNo - 1);
        }
        queryCustomerLogList();
    });

    // 【下一页】
    _box.find(".fa-angle-right").on("click", function () {
        var pageNo = returnNumber(_box.find("#record-pageNo").val());
        var totalPage = returnNumber(_box.find("#record-totalPage").text());
        if (pageNo >= totalPage) {
            return;
        }
        _box.find("#record-pageNo").val(pageNo + 1);
        queryCustomerLogList();
    });
}

/** 客户记录--查询客户日志记录*/
function queryCustomerLogList() {
    $.ajax({
        type: "POST",
        url: "/customer/queryCustomerLogList",
        data: {
            cc_code: returnValue(getUrlParam("cc_code")),
            cl_type: $("[name=record-type]").val(),
            pageNo: returnValue($("#record-pageNo").val()),
            pageSize: 15
        },
        dataType: "json",
        beforeSend: function () {
            $("#record-table-body").html('<tr><td colspan="7"><div class="loading"></div></td></tr>');
        }
    }).done(function (result) {
        if (result.code != 200) {
            return;
        }
        $("#record-table-body").empty();

        if (result.data.list.length == 0) {
            $("#record-table-body").html('<tr><td colspan="7" style="text-align: center;line-height: 120px;">没有记录</td></tr>');
            $("#record-totalPage").text(0);
            $("#record-totalRecords").text(0);
            return;
        }
        $.each(result.data.list, function (index, data) {
            // 数据项
            var html = '';
            html += '<tr class="record-visible-tr' + returnValue(data.cl_id) + '" style="background: ' + (index % 2 == 0 ? "#f5f8fa" : "#ffffff") + ';">';
            html += '	<td style="width: 40px;text-align: center;">' + (index + 1) + '</td>';
            //			html += '	<td style="width: 97px;text-align: left;">'+ returnValue(data.contractObject_No) +'</td>';
            html += '	<td class="next" style="width: 60px;text-align: center;">' + data.cl_typeZH + '</td>';
            html += '	<td onclick="displayRecordTr(\'' + returnValue(data.cl_id) + '\')" style="text-align: left;cursor: pointer;" title="查看更多">';
            html += '		<div class="record-td-content-hint" style="' + (isEmpty(data.userCustomerLogAttachmentList) ? "background: #c3c3c3;" : "") + '">附</div>';
            html += '		<div class="record-td-content-main" style="width: 390px;">' + returnValue(data.cl_content) + '</div>';
            html += '	</td>';
            html += '	<td style="width: 80px;text-align: right;">' + returnValue(data.em_name) + '</td>';
            html += '	<td style="width: 153px;text-align: right;">' + returnTime(data.cl_createTime) + '</td>';
            html += '	<td style="width: 74px;text-align: center;">' + returnValue(data.cl_source == 1 ? "手动添加" : "系统添加") + '</td>';
            //			html += '	<td style="width: 120px;text-align: center;"></td>'; // <a href="javascript:;" class="hint" onclick="eidtImplRecord(\''+ returnValue(data.cir_id) +'\')">编辑</a>
            html += '</tr>';
            // 隐藏操作项
            html += '<tr class="record-hidden-tr' + returnValue(data.cl_id) + '" style="background: ' + (index % 2 == 0 ? "#f5f8fa" : "#ffffff") + ';">';
            html += '</tr>';
            $("#record-table-body").append(html);
            $('.record-visible-tr' + returnValue(data.cl_id)).data("data", data);
        });
        $("#record-table-box").perfectScrollbar();
        $("#record-table-box").perfectScrollbar("update");

        $("#record-totalPage").text(result.data.totalPage);
        $("#record-totalRecords").text(result.data.totalRecords);

    });
}

/** 客户记录--查询客户短信记录*/
function queryUserCenterInformationList() {
    $.ajax({
        type: "POST",
        url: "/customer/queryUserCenterInformationList",
        data: {
            cc_code: returnValue(getUrlParam("cc_code")),
            pageNo: returnValue($("#record-pageNo2").val()),
            pageSize: 15
        },
        dataType: "json",
        beforeSend: function () {
            $("#record-table-body2").html('<tr><td colspan="7"><div class="loading"></div></td></tr>');
        }
    }).done(function (result) {
        if (result.code != 200) {
            return;
        }
        $("#record-table-body2").empty();

        if (result.data.list.length == 0) {
            $("#record-table-body2").html('<tr><td colspan="7" style="text-align: center;line-height: 120px;">没有记录</td></tr>');
            return;
        }
        $.each(result.data.list, function (index, data) {
            // 数据项
            var html = '';
            html += '<tr class="record-visible-tr' + returnValue(data.ui_id) + '" style="background: ' + (index % 2 == 0 ? "#f5f8fa" : "#ffffff") + ';">';
            html += '	<td style="width: 40px;text-align: center;">' + (index + 1) + '</td>';
            //			html += '	<td style="width: 97px;text-align: left;">'+ returnValue(data.contractObject_No) +'</td>';
            html += '	<td class="next" style="width: 180px;text-align: center;">' + returnValue(data.house_address) + '</td>';
            html += '	<td class="next" style="width: 100px;text-align: center;">' + formatMsgType(data.msg_type) + '</td>';
            html += '	<td onclick="displayMsgRecordTr(' + returnValue(data.ui_id) + ')" style="text-align: left;cursor: pointer;" title="短信详情">';
            html += '		<div class="record-td-content-main" style="width: 390px;">' + returnValue(data.msg_content) + '</div>';
            html += '	</td>';
            html += '	<td style="width: 80px;text-align: center;">' + returnValue(data.send_result == 0 ? "失败" : "成功") + '</td>';
            html += '	<td style="width: 75px;text-align: right;">' + returnValue(data.em_name) + '</td>';
            html += '	<td style="width: 153px;text-align: right;">' + returnTime(data.send_time) + '</td>';
            //			html += '	<td style="width: 120px;text-align: center;"></td>'; // <a href="javascript:;" class="hint" onclick="eidtImplRecord(\''+ returnValue(data.cir_id) +'\')">编辑</a>
            html += '</tr>';
            // 隐藏操作项
            html += '<tr class="record-hidden-tr' + returnValue(data.ui_id) + '" style="background: ' + (index % 2 == 0 ? "#f5f8fa" : "#ffffff") + ';display: none;">';
            html += '</tr>';
            $("#record-table-body2").append(html);
            $('.record-visible-tr' + returnValue(data.ui_id)).data("data", data);
        });
        $("#record-table-box2").perfectScrollbar();
        $("#record-table-box2").perfectScrollbar("update");

        $("#record-totalPage2").text(result.data.totalPage);
        $("#record-totalRecords2").text(result.data.totalRecords);

    });
}

/** 房屋记录--添加日志*/
function addContractRecord() {
    //	if($(".record-option-more").is(":hidden")){
    $(".record-option-more-main").show();
    $(".record-option-more-foot").show();
    $(".record-option-more").show();
    $(".record-option-more-foot button").eq(0).html("确认添加");
    $(".record-option-more-head").eq(0).html("添加日志");
    $("[name=record-add-content]").attr("placeholder", "日志内容");
    $(".record-option-more-main select").show();
    $(".record-option-more-head").show();
    //	} else {
    //		closeAddContractRecord();
    //	}
}

/**
 * 保存日志
 * @returns
 */
function submitUserRecord() {

    var _cl_content = $("[name=record-add-content]").val().trim();
    if (isEmpty(_cl_content)) {
        $("[name=record-add-content]").msg("请填写记录内容");
        return;
    }

    var data = {};
    var userCustomerLog = {};
    userCustomerLog.cc_code = returnValue(getUrlParam("cc_code"));
    userCustomerLog.cl_type = _cl_type;
    userCustomerLog.cl_content = _cl_content;
    data.userCustomerLog = JSON.stringify(userCustomerLog);

    var userCustomerLogAttachmentList = [];
    var isOk = true;
    var _attach_file = $(".more-main-item-subitem");
    if (_attach_file.length > 0) {
        _attach_file.each(function () {
            var _data = $(this).data("data");
            if (isEmpty(_data)) {
                isOk = false;
                return false;
            }
            var logAttachment = {};
            logAttachment.ca_name = _data.name;
            logAttachment.ca_path = _data.url;
            logAttachment.ca_type = _data.type;
            userCustomerLogAttachmentList.push(logAttachment);
        });
        data.userCustomerLogAttachmentList = JSON.stringify(userCustomerLogAttachmentList);
    }
    $.ajax({
        type: "POST",
        url: "/customer/addUserCustomerLog",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $("#record-table-body").html('<tr><td colspan="7"><div class="loading"></div></td></tr>');
        }
    }).done(function (result) {
        if (result.code != 200) {
            $.jBox.tip(result.msg, "error");
            return;
        }
        $.jBox.tip("添加成功", "success");
        closeAddUserRecord();
        queryCustomerLogList();
    });

}

/** 客户日志--关闭添加日志*/
function closeAddUserRecord() {
    $(".record-option-more").hide();
    $(".record-option-more").find("select option:eq(0)").attr("selected", "selected");
    $(".record-option-more").find("textarea").val("");
}

/** 客户日志--显示隐藏记录*/
function displayRecordTr(id) {
    var _box = $(".record-hidden-tr" + id);
    if (_box.is(":visible")) {
        _box.hide();
        $("#record-table-box").perfectScrollbar("update");
        return;
    }

    var data = $(".record-visible-tr" + id).data("data");
    var html = '';
    html += '	<td colspan="99" style="padding: 10px;">';
    html += '       <div class="record-hidden-content">';
    html += '       	<i class="i-hand-1"></i>';
    html += '       	<table>';
    html += '       	<tr style="border-bottom: 1px solid #ddd;">';
    html += '       	    <td style="width: 120px;text-align: right;color: #000;">记录内容</td>';
    html += '       	    <td>' + returnValue(data.cl_content) + '</td>';
    html += '       	</tr>';
    html += '       	<tr>';
    html += '       	    <td style="width: 120px;text-align: right;color: #000;">附件</td>';
    html += '       	    <td>';
    if (!isEmpty(data.userCustomerLogAttachmentList)) {
        html += '<div class="record-attach-title">';
        html += '	<ul>';
        $.each(data.userCustomerLogAttachmentList, function (index, _data) {
            html += '<li title="点击查看 ' + returnValue(_data.ca_name) + '">';
            html += '	<a href="' + _data.ca_path_real + '" target="_blank">';
            if (_data.ca_type == "txt") {
                html += '<div class="attach-title-head"><img src="/resources/common/zyupload/skins/images/fileType/' + _data.ca_type + '.png" alt="' + returnValue(_data.ca_name) + '"></div>';
            } else if (_data.ca_type == "rar" || _data.ca_type == "zip") {
                html += '<div class="attach-title-head"><img src="/resources/common/zyupload/skins/images/fileType/' + _data.ca_type + '.png" alt="' + returnValue(_data.ca_name) + '"></div>';
            } else if (_data.ca_type == "jpeg" || _data.ca_type == "jpg" || _data.ca_type == "png") {
                html += '<div class="attach-title-head"><img src="' + _data.ca_path_real + '" alt="' + returnValue(_data.ca_name) + '"></div>';
            } else {
                html += '<div class="attach-title-head"><img src="/resources/common/zyupload/skins/images/fileType/' + _data.ca_type + '.png" alt="' + returnValue(_data.ca_name) + '"></div>';
            }
            html += '		<div class="attach-title-foot">' + returnValue(_data.ca_name) + '</div>';
            html += '	</a>';
            html += '</li>';
        });
        html += '	</ul>';
        html += '</div>';
        html += '<div class="record-attach-content" id="attach-content' + returnValue(data.cl_id) + '" style="display:none">';
        html += '   <div class="attach-content-head">';
        html += '   	';
        html += '   </div>';
        html += '   <div class="attach-content-foot">';
        html += '   	';
        html += '   </div>';
        html += '</div>';
    } else {
        html += '无附件';
    }
    html += '       	    </td>';
    html += '       	</tr>';
    html += '       	</table>';
    html += '       </div>';
    html += '	</td>';

    _box.html(html).fadeIn();
}

/** 短信记录--显示隐藏记录*/
function displayMsgRecordTr(id) {
    var _box = $(".record-hidden-tr" + id);
    if (_box.is(":visible")) {
        _box.hide();
        $("#record-table-box").perfectScrollbar("update");
        return;
    }

    var data = $(".record-visible-tr" + id).data("data");
    var html = '';
    html += '	<td colspan="99" style="padding: 10px;">';
    html += '       <div class="record-hidden-content">';
    html += '       	<i class="i-hand-1"></i>';
    html += '       	<table>';
    html += '       	<tr style="border-bottom: 1px solid #ddd;">';
    html += '       	    <td style="width: 80px;text-align: right;color: #000;">短信内容</td>';
    html += '       	    <td>' + returnValue(data.msg_content) + '</td>';
    html += '       	</tr>';
    html += '       	</table>';
    html += '       </div>';
    html += '	</td>';

    _box.html(html).fadeIn();
}

/**
 * 默认开户名
 *
 * @param ids
 */
function bankUserName(ids) {
    $("#bank_contents .bank_div").each(function (i) {
        if ($(this).find(".openAccount").val() == "") {
            $(".openAccount").val($(ids).val());
        }
    });
}

/**
 * 完善客户信息
 */
function userPerfect() {
    $(".leftTile-menu a").attr("class", "nav-menu");
    $("#houseIntention2").attr("class", "nav-menu nav-menu-focus");
    $("#contents1").hide();
    //检查是否为正式客户
    $.ajax({
        type: "POST",
        url: "/customer/isCustomer",
        data: {
            cc_code: returnValue(getUrlParam("cc_code"))
        },
        dataType: "json",
        success: function (result) {
            if (result.isCustomer) {
                $("#contents2").show();
            } else {
                $.jBox.tip("该客户为意向客户，暂不支持完善信息", "error");
                $("#contents2").hide();
            }
        }
    });
    $("#contents3").hide();
    $("#contents4").hide();
    $("#contents5").hide();
    $("#contents6").hide();
    $(".title_top li", window.parent.document).each(function (i) {
        if ($(this).css("background-color") == "rgb(48, 54, 65)") {
            var href = $(this).find(".meunTitle").attr("data-href").replace("&typeState=1", "");
            href = href.replace("&typeState=2", "");
            $(this).find(".meunTitle").attr("data-href", href + "&typeState=2");
        }
    });
    window.parent.titleCookie();
}

/**
 * 客户带看
 */
function houseSee() {
    $(".leftTile-menu a").attr("class", "nav-menu");
    $("#houseIntention4").attr("class", "nav-menu nav-menu-focus");
    $("#contents1").hide();
    $("#contents2").hide();
    $("#contents3").hide();
    $("#contents4").show();
    $("#contents5").hide();
    $("#contents6").hide();
    $(".title_top li", window.parent.document).each(function (i) {
        if ($(this).css("background-color") == "rgb(48, 54, 65)") {
            var href = $(this).find(".meunTitle").attr("data-href").replace("&typeState=1", "");
            href = href.replace("&typeState=2", "");
            $(this).find(".meunTitle").attr("data-href", href + "&typeState=2");
        }
    });
    window.parent.titleCookie();
}

/**
 * 房源录入
 */
function houseEnterIn() {
    $(".leftTile-menu a").attr("class", "nav-menu");
    $("#houseIntention3").attr("class", "nav-menu nav-menu-focus");
    $("#contents1").hide();
    $("#contents2").hide();
    $("#contents3").show();
    $("#contents4").hide();
    $("#contents5").hide();
    $("#contents6").hide();
    $(".title_top li", window.parent.document).each(function (i) {
        if ($(this).css("background-color") == "rgb(48, 54, 65)") {
            var href = $(this).find(".meunTitle").attr("data-href").replace("&typeState=1", "");
            href = href.replace("&typeState=2", "");
            $(this).find(".meunTitle").attr("data-href", href + "&typeState=2");
        }
    });
    window.parent.titleCookie();
}

/**
 * 显示更多房屋信息
 */
function moreHouseMessage() {
    if ($("#textContent").is(":hidden")) {
        $("#textContent").slideDown();
    } else {
        $("#textContent").slideUp();
    }
}

/**
 * 收起显示银行卡信息
 *
 * @param ids
 */
function bankUp(ids) {
    if ($(ids).parent().next().is(":hidden")) {
        $(ids).attr("class", "fa fa-angle-double-down");
        $(ids).parent().next().slideDown(function () {
            $(ids).parent().next().attr("style", "");
        });
    } else {
        $(ids).parent().next().slideUp();
        $(ids).attr("class", "fa fa-angle-double-up");
    }

}

/**
 * 添加手机号码
 *
 * @param ids
 */
function addPhone(ids) {
    if ($(ids).parent().next().is(":hidden")) {
        $(ids).parent().next().show();
        $(ids).parent().next().find("select,input").removeAttr("disabled");
    } else {
        $(ids).parent().next().hide();
    }
}

/**
 * 增加银行卡
 */
function addBankCard() {
    $("#bank_contents").append('<div class="bank_div">' +
        '<i class="fa fa-minus-square" style="margin-left: 10px; color:#E74C3C; cursor: pointer;" onclick="phoneDelete(this)"></i>' +
        '<div class="bank_div_title"><i class="fa fa-credit-card-alt" style="margin-right: 10px"></i><span class="bankTitle">银行卡</span><i class="fa fa-angle-double-up" style="float: right; width: 20px; height: 22px; line-height: 22px; margin-top: 7px; margin-left: 25px; cursor:pointer;" onclick="bankUp(this)"></i><label class="common-checkbox" style="float: right;"><input type="radio" name="bank">使用</label></div>' +
        '<div class="bank_div_content" style="display: none;">' +
        '<dl style="width: 100%;">' +
        '<dt>银行卡号：</dt>' +
        '<dd>' +
        '<input class="bankCode edit" style="width: 345px;" value=""  onblur="bankMessage(this)" onkeyup="bankMessage(this)" />' +
        '<label class="common-checkbox" onclick="bankAnther(this)" style="float: right;top:12px"><input type="checkbox" name="onther" class="edit">其他</label>' +
        '</dd>' +
        '</dl>' +
        '<dl style="width: 100%; display: none;">' +
        '<dt>银行卡信息：</dt>' +
        '<dd>' +
        '<img alt="" src="" style="height: 50px; width:110px; float: left; margin-top: -13px;">' +
        '<input value="" class="bankMessage" style="width: 200px; float: left;" readonly />' +
        '</dd>' +
        '</dl>' +
        '<dl style="width: 100%; display:none;">' +
        '<dt>银行卡信息：</dt>' +
        '<dd>' +
        '<input class="bankMessageTitle edit" onblur="bankMessageTitle(this)" onkeyup="bankMessageTitle(this)" value="" style="width: 140px; float: left;" />' +
        '<input class="bankMessage1" value="" style="width: 240px; float: left;" readonly />' +
        '</dd>' +
        '</dl>' +
        '<dl>' +
        '<dt>开户网点：</dt>' +
        '<dd>' +
        '<input class="accountOpening edit" value="" />' +
        '</dd>' +
        '</dl>' +
        '<dl>' +
        '<dt>开户名：</dt>' +
        '<dd>' +
        '<input class="openAccount edit" value="' + $("#userName").val() + '" />' +
        '</dd>' +
        '</dl>' +
        '<dl style="height: auto;">' +
        '<dt>银行卡照片：</dt>' +
        '<dd style="width: 110px; min-width: 110px; height: auto;">' +
        '<div class="images-box" id="BK' + ($(".bank_content .bank_div").length + 1) + '-box">' +
        '<div class="images-btn" data-box="BKupload" data-url="" data-del-url="/customer/deleteImage" data-type="BK' + ($(".bank_content .bank_div").length + 1) + '" style="display: inline-block;">选择图片</div>' +
        '</div>' +
        '</dd>' +
        '<dd class="tisp" style="height:24px; line-height: 24px;"><span id="BK' + ($(".bank_content .bank_div").length + 1) + '-count">0</span>/<span id="BK' + ($(".bank_content .bank_div").length + 1) + '-limit">1</span></dd>' +
        '</dl>' +
        '</div>' +
        '</div>');
}

/**
 * 增加其他证件信息
 */
function addOtherCard() {
    $("#otherID_contents").append('<div class="bank_div">' +
        '<i class="fa fa-minus-square" style="margin-left: 10px; color:#E74C3C; cursor: pointer;" onclick="phoneDelete(this)"></i>' +
        '<div class="bank_div_title" style="border-bottom: 1px solid #031d18;"><i class="fa fa-vcard" style="margin-right: 10px"></i><span class="bankTitle">其他证件信息</span><i class="fa fa-angle-double-up" style="float: right; width: 20px; height: 22px; line-height: 22px; margin-top: 7px; margin-left: 25px; cursor:pointer;" onclick="bankUp(this)"></i></div>' +
        '<div class="bank_div_content" style="height: 310px; display:none;">' +
        '<dl style="width: 50%;">' +
        '<dt>证件类型：</dt>' +
        '<dd>' +
        '<select name="id_type" onchange="IDCardChange()" style="border:1px solid #ccc;">' +
        '<option value="-1">请选择</option>' +
        '<option value="1" selected="selected">身份证</option>' +
        '<option value="2">军官证</option>' +
        '<option value="3">商户号</option>' +
        '<option value="4">护照</option>' +
        '<option value="5">台湾居民通行证</option>' +
        '<option value="6">香港居民通行证</option>' +
        '<option value="7">临时身份证</option>' +
        '<option value="8">外国人永久居留证</option>' +
        '</select>' +
        '</dd>' +
        '</dl>' +
        '<dl style="width: 50%;">' +
        '<dt>证件号码：</dt>' +
        '<dd>' +
        '<input value="" name="id_no" class="openAccount edit" style="width: 160px;" />' +
        '</dd>' +
        '</dl>' +
        '<dl style="width: 100%;">' +
        '<dt>证件有效期：</dt>' +
        '<dd>' +
        '<input type="date" value="" name="id_pastDate" class="openAccount edit" />' +
        '</dd>' +
        '</dl>' +
        '<dl style="height: auto;" class="bankImage">' +
        '<dt>证件照片：</dt>' +
        '<dd style="width: 110px; min-width: 110px; height: auto;">' +
        '<div class="images-box" id="BK-box">' +
        '<div class="images-btn" data-box="BKupload" data-type="BK" data-url="" data-del-url="/customer/deleteImage" style="display: inline-block;">选择图片</div>' +
        '</div>' +
        '</dd>' +
        '<dd class="tisp" style="height:24px; line-height: 24px;"><span id="BK-count">0</span>/<span id="BK-limit">1</span></dd>' +
        '</dl>' +
        '</div>' +
        '</div>');
}

/**
 * 增加更多联系人
 * @returns
 */
function addLinkMan() {
    $("#linkMan_contents").append('<div class="bank_div">' +
        '<i class="fa fa-minus-square" style="margin-left: 10px; color:#E74C3C; cursor: pointer;" onclick="phoneDelete(this)"></i>' +
        '<div class="bank_div_title" style="border-bottom: 1px solid #031d18;"><i class="fa fa-user-circle" style="margin-right: 10px"></i><span class="bankTitle">更多联系人信息</span><i class="fa fa-angle-double-up" style="float: right; width: 20px; height: 22px; line-height: 22px; margin-top: 7px; margin-left: 25px; cursor:pointer;" onclick="bankUp(this)"></i></div>' +
        '<div class="bank_div_content" style="height: 310px; display:none; border-left: 1px dashed #ccc;border-right:1px dashed #ccc;border-bottom:1px dashed #ccc;">' +
        '<dl style="width:100%;">' +
        '<dt>姓名：</dt>' +
        '<dd><input name="linkManName" class="openAccount edit" value="" onblur="bankUserName(this)" /></dd>' +
        '</dl>' +
        '<dl style="width:100%;">' +
        '<dt>证件类型：</dt>' +
        '<dd>' +
        '<select style="border:1px solid #ccc;" name="id_type" onchange="IDCardChange()"><option value="-1">请选择</option><option value="1" selected>身份证</option><option value="2">军官证</option><option value="3">商户号</option><option value="4">护照</option><option value="5">台湾居民通行证</option><option value="6">香港居民通行证</option><option value="7">临时身份证</option><option value="8">外国人永久居留证</option></select>' +
        '<input style="width:160px; margin-left: 10px;" name="id_no" class="openAccount edit" value="" onkeyup="isCards(this)" maxlength="19" />' +
        '<select style="margin-left: 10px; width: 40px; text-align: center; text-indent: 0;border:1px solid #ccc;" name="sex"><option value="0">女</option><option value="1">男</option><option value="2">未知</option></select>' +
        '<div class="alertMessage" style="display: none;">' +
        '<i class="alertMessage_icon"></i>' +
        //						 	'<div id="alertContent">用户已经存在！</div>'+
        '</div>' +
        '</dd>' +
        '</dl>' +
        '<dl style="width: 310px;">' +
        '<dt style="width:90px">邮箱：</dt>' +
        '<dd style="width: 60%;">' +
        '<input name="email" class="openAccount edit" value=""/>' +
        '</dd>' +
        '</dl>' +
        '<dl style="width: 310px;">' +
        '<dt style="width:90px">联系电话：</dt>' +
        '<dd style="width: 60%;">' +
        '<input name="phone" class="openAccount edit" value=""/>' +
        '</dd>' +
        '</dl>' +
        '<dl style="width: 310px;">' +
        '<dt style="width:90px">联系地址：</dt>' +
        '<dd style="width: 60%;">' +
        '<input name="address" class="openAccount edit" value=""/>' +
        '</dd>' +
        '</dl>' +
        '<dl style="width: 310px;">' +
        '<dt style="width:90px">QQ：</dt>' +
        '<dd style="width: 60%;">' +
        '<input  name="qq" class="openAccount edit" value=""/>' +
        '</dd>' +
        '</dl>' +
        '<dl style="width: 310px;">' +
        '<dt style="width:90px">工作单位：</dt>' +
        '<dd style="width: 60%;">' +
        '<input  name="workplace" class="openAccount edit" value=""/>' +
        '</dd>' +
        '</dl>' +
        '<dl style="width: 310px;">' +
        '<dt style="width:90px">与客户关系：</dt>' +
        '<dd style="width: 60%;">' +
        '<select style="border:1px solid #ccc;" name="relation" onchange="IDCardChange()">' +
        '<option value="-1">请选择</option>' +
        '<option value="1">夫妻</option>' +
        '<option value="2">父母</option>' +
        '<option value="3">子女</option>' +
        '<option value="4">兄弟姐妹</option>' +
        '<option value="5">同事</option>' +
        '<option value="6">朋友</option>' +
        '<option value="7">同学</option>' +
        '<option value="8">其他</option>' +
        '</select>' +
        '</dd>' +
        '</dl>' +
        '</div>' +
        '</div>');
}

/**
 * 插入数据
 *
 * @param ids
 */
function addPhones(ids) {
    if (!isPhone($(ids).prev().val())) {
        $(ids).prev().css("border", "1px solid #E74C3C");
        return;
    } else {
        $(ids).css("border", "1px solid #CCC");
    }
    if (isPhone($(ids).prev().val())) {
        var phone = $("#phone").val();
        if ($(ids).prev().val() == phone) {
            $(ids).prev().css("border", "1px solid #E74C3C");
            alert("已经存在该电话号码！");
            return;
        }
        var bool = true;
        $(".morePhone .phoneDiv").each(function (i) {
            if ($(this).find(".phoneCopy").val() == $(ids).prev().val()) {
                bool = false;
                return false;
            }
        });

        if (!bool) {
            $(ids).prev().css("border", "1px solid #E74C3C");
            alert("已经存在该电话号码！");
            return;
        }

        $(ids).prev().css("border", "1px solid #ccc");
        if ($(ids).prev().prev().val() == "常用") {
            $("#phone").val($(ids).prev().val());
            $(".morePhone").append('<div class="phoneDiv"><select class="cardType edit" onchange="phoneSelect(this)" style="width: 75px; margin-right: 10px;"><option value="1">常用</option><option value="2" selected>备用</option></select><input value="' + phone + '" class="phoneCopy edit" onkeypress="keyPress()" onblur="phoneBool(this)"  /><i class="fa fa-minus-square" style="margin-left: 10px; color:#E74C3C; cursor: pointer;" onclick="phoneDelete(this)"></i></div>');
        } else {
            $(".morePhone").append('<div class="phoneDiv"><select class="cardType edit" onchange="phoneSelect(this)" style="width: 75px; margin-right: 10px;"><option value="1">常用</option><option value="2" selected>备用</option></select><input value="' + $(ids).prev().val() + '" class="phoneCopy edit" onkeypress="keyPress()"  onblur="phoneBool(this)"  /><i class="fa fa-minus-square" style="margin-left: 10px; color:#E74C3C; cursor: pointer;" onclick="phoneDelete(this)"></i></div>');
        }
        $(ids).parent().hide();
        $("#phoneEdit").val("");
    } else {
        $(ids).prev().css("border", "1px solid #E74C3C");
        alert("电话不正确");
    }
}

/**
 * 电话类型选择
 *
 * @param ids
 */
function phoneSelect(ids) {
    if ($(ids).val() == "1" && $(ids).next().attr("id") != "phone") {
        var z1Phone = $(".phoneDiv #phone").val();
        var z2Phone = $(ids).next().val();
        $(".phoneDiv #phone").val(z2Phone);
        $(ids).next().val(z1Phone);
        $(ids).val("2");
    }

    if ($(ids).val() == "2" && $(ids).next().attr("id") == "phone") {
        if ($(".morePhone .phoneDiv").length > 0) {
            $(".morePhone .phoneDiv").each(function (i) {
                if (i == 0) {
                    var z1Phone = $(ids).next().val();
                    var z2Phone = $(this).find(".phoneCopy").val();
                    $(ids).val("1");
                    $(".phoneDiv #phone").val(z2Phone);
                    $(this).find(".phoneCopy").val(z1Phone);
                }
            });
        } else {
            $(ids).val("1");
        }
    }
}

/**
 * 添加跟进记录
 */
function addCutomerFollowUp() {
    var code = "";
    if (getUrlParam("cc_code") != null) {
        code = getUrlParam("cc_code");
    }
    if ($("#htType").val() != "提醒") {
        if ($("#htType").val() == null || $("#htType").val() == "-1" || $("#htCount").val() == null || $("#htCount").val() == "") {
            $.jBox.tip("请将带*的内容完善");
            return;
        }
    } else {
        if ($("#htType").val() == "-1") {
            $.jBox.tip("请将带*的内容完善");
            return;
        }
    }
    if ($("#ht_remind_time").val() != null && $("#ht_remind_time").val() != "") {
        if ($("#htRemindCount").val() == null || $("#htRemindCount").val() == "") {
            $.jBox.tip("请填入提醒内容");
            return;
        }
    }
    var hour = "";
    var min = "";
    if ($("#hour").val() == "") {
        hour = "00";
    } else {
        if (parseInt($("#hour").val()) < 10) {
            hour = "0" + $("#hour").val();
        } else {
            hour = $("#hour").val();
        }
    }

    if ($("#min").val() == "") {
        min = "00";
    } else {
        if (parseInt($("#min").val()) < 10) {
            min = "0" + $("#min").val();
        } else {
            min = $("#min").val();
        }
    }
    var dateStr = "";
    if ($("#ht_remind_time").val() != "") {
        dateStr = $.trim($("#ht_remind_time").val()) + " " + hour + ":" + min + ":" + "00";
    }

    var count = "ht_type=" + $.trim($("#htType").val()) + "&ht_count=" + $.trim($("#htCount").val()) + "&dateStr=" + dateStr
        + "&ht_remind_count=" + $.trim($("#htRemindCount").val()) + "&cc_code=" + code;
    $.ajax({
        type: "POST",
        url: "/customer/addCutomerFollowUp",
        data: count,
        datatype: "json",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (result) {
            if (result.massage == "error") {
                $.jBox.tip("数据添加失败");
            } else {
                var tTime = "--";
                if ($("#ht_remind_time").val() != "") {
                    tTime = '<i class="alarmIcon alarmClock"></i>' + $("#ht_remind_time").val() + " " + hour + ":" + min + ":";
                }

                var tContent = "--";
                if ($("#htRemindCount").val() != "") {
                    tContent = $("#htRemindCount").val();
                }

                if (tTime == "--" && tContent == "--") {
                    tTime = "";
                }

                var dateTime = returnDate(new Date()) + '<div class="corner corner-myself" title="手动录入">手</div>';

                var html = '<tr onmouseover="showContent(this)" onmouseout="hideContent(this)">' +
                    '<td style="width: 130px;">' + dateTime + '</td>' +
                    '<td style="width: 130px; ">' + $("#htType").val() + '</td>' +
                    '<td class="content-font-text"><div class="text-font" style="z-index:' + (999 - $(".conten-text tbody tr").length) + '">' + $.trim($("#htCount").val()) + '</div></td>' +
                    '<td style="width: 130px; ">' + $.cookie('em_name') + '</td>' +
                    '<td class="content-font-text"  style="width: 300px; "><div class="text-font" style="z-index:' + (999 - $(".conten-text tbody tr").length) + '">' + tTime + tContent + '</div></td>' +
                    '</tr>';
                $(".conten-text tbody").append(html);

                $("#name").text(result.newName);

                $.jBox.tip("数据添加成功");

                $("#htType").val("-1");
                $("#htCount").val("");
                $("#ht_remind_time").val("");
                $("#htRemindCount").val("");
                $("#hour").val("9");
                $("#min").val("40");
            }

        }
    });

}

/**
 * 时间控件
 */
function dates() {
    var date = new Date(returnDate(new Date()))
    data = date.setFullYear(date.getFullYear(), date.getMonth(), date.getDate() + 5);
    WdatePicker({
        //		minDate : returnDate(new Date()),
        //		maxDate : returnDate(data),
        onpicked: function (dp) {
            if ($(".dateTime1").val() != "" && $(".dateTime2").val() != "") {
                //data();
            }
        }
    });
}

/**
 * 读取数据
 */
function data() {
    customerData = $.Deferred();
    var code = "";
    if (getUrlParam("cc_code") != null) {
        code = getUrlParam("cc_code");
    }
    $.ajax({
        type: "POST",
        url: "/customer/customerCodeUser",
        data: {
            cc_code: code,
        },
        dataType: "json",
        success: function (result) {
            if (null != result.userCustomerIntention) {
                var data = result.userCustomerIntention;
                $("[name=cc_code]").val(data.cc_code);
                $("[name=cc_cardType]").val(data.cc_cardType);
                $("[name=cc_cardNum]").val(data.cc_cardNum);
                $("[name=cc_phone]").val(data.ccp_phone);
                $("[name=phi_user]").val(data.cc_name);
                var sex = data.ci_sex;
                if (sex == "0") {
                    $("[name=phi_user_sex]").eq(0).attr("checked", true).parent().addClass("common-checkbox-checked");
                    $("[name=phi_user_sex]").eq(2).attr("checked", true).parent().addClass("common-checkbox-checked");
                } else {
                    $("[name=phi_user_sex]").eq(1).attr("checked", true).parent().addClass("common-checkbox-checked");
                    $("[name=phi_user_sex]").eq(3).attr("checked", true).parent().addClass("common-checkbox-checked");
                }
                $("#numberCard").val(data.cc_cardNum);
                $("[name=useriphone]").val(data.ccp_phone);
                $("#userFIntention").html(data.customer_need);
                $("#userFIntention1").html(data.customer_need);
                $(".titleType img").attr("src", "/resources/image/yx.png");
            } else {

                // 客户跟进
                var html = "";
                $.each(result.cutomerFollowUps, function (index, data) {
                    var tTime = "--";
                    if (data.ht_remind_time != null && data.ht_remind_time != '') {
                        tTime = '<i class="alarmIcon alarmClock"></i>' + returnTimeHourMin(data.ht_remind_time) + ":";
                    }
                    var tContent = "--";
                    if (data.ht_remind_count != null && data.ht_remind_count != '') {
                        tContent = data.ht_remind_count;
                    }
                    if (tTime == "--" && tContent == "--") {
                        tTime = "";
                    }
                    var dateTime = returnDate(data.ht_time) + '<div class="corner corner-myself" title="手动录入">手</div>';
                    if (data.ht_houseType == 1) {
                        dateTime = returnDate(data.ht_time) + '<div class="corner" title="系统生成">系</div>';
                    }
                    if (index % 2 != 0) {
                        html += '<tr class="odd" onmouseover="showContent(this)" onmouseout="hideContent(this)">' +
                            '<td style="width: 130px;">' + dateTime + '</td>' +
                            '<td style="width: 130px; ">' + data.ht_type + '</td>' +
                            '<td class="content-font-text"><div class="text-font" onmouseover="showContent(this)" onmouseout="hideContent(this)" style="z-index:' + (999 - index) + '">' + data.ht_count + '</div></td>' +
                            '<td style="width: 130px; ">' + data.em_name + '</td>' +
                            '<td class="content-font-text" style="width: 300px; "><div class="text-font" onmouseover="showContent(this)" onmouseout="hideContent(this)" style="z-index:' + (999 - index) + '">' + tTime + tContent + '</div></td>' +
                            '</tr>';
                    } else {
                        html += '<tr onmouseover="showContent(this)" onmouseout="hideContent(this)">' +
                            '<td style="width: 130px;">' + dateTime + '</td>' +
                            '<td style="width: 130px; ">' + data.ht_type + '</td>' +
                            '<td class="content-font-text"><div class="text-font" onmouseover="showContent(this)" onmouseout="hideContent(this)" style="z-index:' + (999 - index) + '">' + data.ht_count + '</div></td>' +
                            '<td style="width: 130px; ">' + data.em_name + '</td>' +
                            '<td class="content-font-text" style="width: 300px; "><div class="text-font" onmouseover="showContent(this)" onmouseout="hideContent(this)" style="z-index:' + (999 - index) + '">' + tTime + tContent + '</div></td>' +
                            '</tr>';
                    }
                });
                $("#conten-text1 tbody").html(html);

                $("[name=cc_id]").val(result.customerCode.cc_id);
                // 性别
                var sex = "男";
                if (result.customerCode.cc_sex == 0) {
                    sex = "女";
                    $("[name=phi_user_sex]").eq(0).attr("checked", true).parent().addClass("common-checkbox-checked");
                    $("[name=phi_user_sex]").eq(2).attr("checked", true).parent().addClass("common-checkbox-checked");
                } else if (result.customerCode.cc_sex == 3) {
                    sex = "其他";
                } else if (result.customerCode.cc_sex == 1) {
                    $("[name=phi_user_sex]").eq(1).attr("checked", true).parent().addClass("common-checkbox-checked");
                    $("[name=phi_user_sex]").eq(3).attr("checked", true).parent().addClass("common-checkbox-checked");
                }

                $("[name=cc_code]").val(result.customerCode.cc_code);
                $("[name=useriphone]").val(result.customerCode.ccp_phone);
                $("[name=phi_user]").val(result.customerCode.cc_name);
                $("#numberCard").val(result.customerCode.cc_cardNum);

                // 常用电话号码
                $(".namePhone").text(result.customerCode.cc_name + "-" + result.customerCode.ccp_phone + "-" + sex);

                //银行卡
                if (result.customerCode.cc_type != null) {
                    if (result.customerCode.cc_type.indexOf("房东") > -1) {
                        $(".bankContent").show();
                    } else {
                        $(".bankContent").hide();
                    }
                    var types = result.customerCode.cc_type.split("-");
                    for (var i = 0; i < types.length; i++) {
                        $(".types").append("<button>" + types[i] + "</button>");
                    }
                }

                //备用电话号码
                if (result.customerPhoneB == "") {
                    $("#phoneUpDown").hide();
                } else {
                    $.each(result.customerPhoneB, function (index, data) {
                        $(".morePhone").append('<div class="phoneDiv"><select class="cardType" onchange="phoneSelect(this)" style="width: 75px; margin-right: 10px;"><option value="1">常用</option><option value="2" selected>备用</option></select><input value="' + data.ccp_phone + '" class="phoneCopy"  /><i class="fa fa-minus-square" style="margin-left: 10px; color:#E74C3C; cursor: pointer; display:none;" onclick="phoneDelete(this)"></i></div>');
                    });
                }

                $("#phone").val(result.customerCode.ccp_phone);
                //=======

                $("#userName").val(result.customerCode.cc_name);

                $("#sex").val(result.customerCode.cc_sex);
                //====

                //客户类型
                var typeHtml = "";
                var bool = false;
                $.each(result.addressList, function (index, data) {
                    var person = "，";
                    var objectType = "";
                    var typeText = "";
                    if (data.typeText == "审核中" || data.typeText == "失效") {
                        typeText = "<span style='color: #E74C3C'>：" + data.typeText + "</span>";
                    } else if (data.typeText == "正常") {
                        typeText = "<span style='color: #1ABC9C'>： " + data.typeText + "</span>";
                    }
                    if (data.typeText == "审核中" || data.typeText == "正常") {
                        bool = true;
                    }
                    typeHtml += "<div class='houseMessage'>" + objectType + "<span><a href='javascript:;' onclick='hrefClick(this)' style='color: #2471a4;' data-type='/houseLibrary/jumpHouseInfo?hi_code=" + data.hi_code + "'>" + data.house_address + "</a></span>（<a style='color: #E74C3C;font-weight: normal;font-size: 14px;' onclick='hrefClickNo(this)' data-type='/contractObject/jumpDisplayContract?con_code=" + data.contractObject_code + "' href='javascript:;'>No." + data.contractObject_No + "</a>“" + data.contractBody_StartTOEnd + "”" + typeText + "）" + (data.frendPerson == "" ? "" : person + data.frendPerson) + "</div>";
                });
                if (bool) {
                    initInterface();
                    $(".titleType img").attr("src", "/resources/image/zx.png");
                } else if (result.customerCode.cc_state == 2) {
                    updateCustomer();
                    $(".titleType img").attr("src", "/resources/image/yx.png");
                } else {
                    initInterface();
                    $(".titleType img").attr("src", "/resources/image/dq.png");
                }
                $(".type").html(typeHtml);

                var types = result.customerCode.cc_type;
                if (types != null && types != "") {
                    var type = result.customerCode.cc_type.split("-");
                    for (var i = 0; i < type.length; i++) {
                        $(".customerType label").each(function (index) {
                            if ($(this).text() == type[i]) {
                                $(this).addClass("common-borderbox-checked");
                                $(this).find("input").attr("checked", true);
                            }
                        });
                    }
                }
                $(".tyeTxt").html(types);
                //====

                $(".source").text(result.customerCode.cc_source == null ? "" : result.customerCode.cc_source);
                $(".fraction").text(result.customerCode.cc_fraction == null ? "" : result.customerCode.cc_fraction);

                // 证件类型-证件号码
                $("#cardType").val(result.customerCode.cc_cardType);
                $("#cardNum").val(result.customerCode.cc_cardNum == null ? "" : result.customerCode.cc_cardNum);
                var cardType = "身份证-";
                if (result.customerCode.cc_cardType == 2) {
                    cardType = "军官证-";
                } else if (result.customerCode.cc_cardType == 3) {
                    cardType = "商户号-";
                } else if (result.customerCode.cc_cardType == 4) {
                    cardType = "护照-";
                } else if (result.customerCode.cc_cardType == 5) {
                    cardType = "台湾居民通行证-";
                } else if (result.customerCode.cc_cardType == 6) {
                    cardType = "香港居民通行证-";
                } else if (result.customerCode.cc_cardType == 7) {
                    cardType = "临时身份证-";
                } else if (result.customerCode.cc_cardType == 8) {
                    cardType = "外国人永久居留证-";
                }
                cardCode = (result.customerCode.cc_cardNum == null ? "" : result.customerCode.cc_cardNum);
                $(".IDCard").text(cardType + (result.customerCode.cc_cardNum == null ? "" : result.customerCode.cc_cardNum));
                // ============

                // QQ
                $(".QQ").text(result.customerCode.cc_qq == null ? "" : result.customerCode.cc_qq);
                $("[name=QQ]").val(result.customerCode.cc_qq == null ? "" : result.customerCode.cc_qq);
                // ====

                // WX
                $(".WX").text(result.customerCode.cc_wx == null ? "" : result.customerCode.cc_wx);
                $("[name=WX]").text(result.customerCode.cc_wx == null ? "" : result.customerCode.cc_wx);
                // ====

                $(".occupation").text((result.customerCode.cc_occupation == null ? "" : result.customerCode.cc_occupation) + (result.customerCode.cc_work == null ? "" : "-" + result.customerCode.cc_work));
                $(".phoneAddress").text(result.customerCode.cc_address == null ? "" : result.customerCode.cc_address);
                if (result.customerPhoneUrgent != null) {
                    $(".urgentUser").text(result.customerPhoneUrgent.ccp_phone == null ? "" : result.customerPhoneUrgent.ccp_phone);
                }

                // 通讯地址
                $(".address").html(result.customerCode.house_address == null ? "" : result.customerCode.house_address);
                $("#address").html(result.customerCode.house_address == null ? "" : result.customerCode.house_address);
                // =====

                if (result.customerImages == null || result.customerImages == "") {
                    $(".card-image").prev().css("background-color", "#c3c3c3");
                    $(".card-image").prev().attr("onclick", "");
                } else {
                    // 身份证图片
                    $.each(result.customerImages, function (index, data) {
                        if (data.cci_type == "CD1") {
                            $("#frontCard .images-box").append('<div class="images-box-img"><img class="showboxImg" name="CD1" src="' + data.img_path + '" data-url="' + data.cci_path + '"><span class="images-box-img-delete" data-url="' + data.cci_path + '" data-type="CD1" data-del-url="/customer/deleteImage">删除</span></div>');
                            $("#frontCard .images-btn").hide();
                            $("#frontCard").next().find("#CD1-count").text("1");
                        } else if (data.cci_type == "CD2") {
                            $("#inverseCard .images-box").append('<div class="images-box-img"><img class="showboxImg" name="CD2" src="' + data.img_path + '" data-url="' + data.cci_path + '"><span class="images-box-img-delete" data-url="' + data.cci_path + '" data-type="CD2" data-del-url="/customer/deleteImage">删除</span></div>');
                            $("#inverseCard .images-btn").hide();
                            $("#inverseCard").next().find("#CD2-count").text("1");
                        }
                        $(".card-image").append('<img class="showboxImg" src="' + data.img_path + '">');
                    });
                }

                //银行卡
                var html = "";
                if (result.customerBanks != null && result.customerBanks != "") {
                    $.each(result.customerBanks, function (index, data) {
                        var bankpoto = "";
                        if (data.bl_path != null && data.bl_path != '') {
                            bankpoto = data.bl_path;
                        }
                        var bankType = data.cbc_grade;
                        var bank1, bank2, check, checked;
                        if (data.cbc_grade != null && data.cbc_grade != undefined && data.cbc_grade.indexOf("存折") > -1) {
                            bank1 = "display:none;";
                            bank2 = "";
                            checked = 'checked';
                            check = " common-checkbox-checked";
                        } else {
                            bank1 = "";
                            bank2 = "display:none;";
                            checked = '';
                            check = "";
                        }
                        var removeHtml = "";
                        if (index != 0) {
                            removeHtml = '<i class="fa fa-minus-square" style="margin-left: 10px; color:#E74C3C; cursor: pointer; display:none;" onclick="phoneDelete(this)"></i>';
                        }
                        if (data.cbc_state == 0) {
                            var bankCode = data.cbc_cardNum;
                            var bankImage = "";
                            if (data.cbc_path == null || data.cbc_path == "undefined") {
                                bankImage = '<div class="images-btn" data-box="BKupload" data-type="BK" data-url="" style="display: inline-block;">选择图片</div>';
                            } else {
                                bankImage = '<div class="images-btn" data-box="BKupload" data-type="BK" data-url="" style="display: none;">选择图片</div>' +
                                    '<div class="images-box-img"><img class="showboxImg" name="bank" image-type="customer" src="' + (data.img_path == null ? "" : data.img_path) + '" data-url="' + data.cbc_path + '"><span class="images-box-img-delete" data-url="' + data.cbc_path + '" data-type="BK"  data-del-url="/customer/deleteImage">删除</span></div>';
                            }
                            $(".bankText").text(data.cbc_bankName + "-" + (data.cbc_type == null ? "" : data.cbc_type + "-") + bankCode + "-" + data.cbc_name);
                            var bankNum = bankCode.replace(/(\d{4})/g, '$1 ').replace(/\s*$/, '');
                            html += '<div class="bank_div">' +
                                removeHtml +
                                '<div class="bank_div_title"><i class="fa fa-credit-card-alt" style="margin-right: 10px"></i><span class="bankTitle">' + data.cbc_bankName + '</span><i class="fa fa-angle-double-up" style="float: right; width: 20px; height: 22px; line-height: 22px; margin-top: 7px; margin-left: 25px; cursor:pointer;" onclick="bankUp(this)"></i><label class="common-checkbox common-checkbox-checked" style="float: right;"><input type="radio" name="bank" checked />使用</label></div>' +
                                '<div class="bank_div_content" style="display: none;">' +
                                '<input type="hidden" name="cbc_id" value="' + data.cbc_id + '">' +
                                '<dl style="width: 100%;">' +
                                '<dt>银行卡号：</dt>' +
                                '<dd>' +
                                '<input style="width: 345px;" value="' + bankNum + '" class="bankCode"  readonly onblur="bankMessage(this)" onkeyup="bankMessage(this)" />' +
                                '<label class="common-checkbox' + check + '" onclick="bankAnther(this)" style="float: right;top:12px"><input type="checkbox" name="onther" class="edit" ' + checked + ' >其他</label>' +
                                '</dd>' +
                                '</dl>' +
                                '<dl style="width: 100%;' + bank1 + '">' +
                                '<dt>银行卡信息：</dt>' +
                                '<dd>' +
                                '<img alt="" src="' + bankpoto + '" style="height: 50px; width:110px; float: left; margin-top: -13px;">' +
                                '<input class="bankMessage" value="' + (data.cbc_grade == null ? "" : data.cbc_grade) + (data.cbc_type == null ? "" : "-" + data.cbc_type) + '" style="width: 240px; float: left;" readonly />' +
                                '</dd>' +
                                '</dl>' +
                                '<dl style="width: 100%;' + bank2 + '">' +
                                '<dt>银行卡信息：</dt>' +
                                '<dd>' +
                                '<input class="bankMessageTitle" onblur="bankMessageTitle(this)" onkeyup="bankMessageTitle(this)" value="' + data.cbc_bankName + '" style="width: 140px; float: left;" readonly />' +
                                '<input class="bankMessage1" value="' + (data.cbc_grade == null ? "" : data.cbc_grade) + (data.cbc_type == null ? "" : "-" + data.cbc_type) + '" style="width: 240px; float: left;" readonly />' +
                                '</dd>' +
                                '</dl>' +
                                '<dl>' +
                                '<dt>开户网点：</dt>' +
                                '<dd>' +
                                '<input value="' + (data.cbc_address == null ? "" : data.cbc_address) + '" readonly class="accountOpening" />' +
                                '</dd>' +
                                '</dl>' +
                                '<dl>' +
                                '<dt>开户名：</dt>' +
                                '<dd>' +
                                '<input value="' + (data.cbc_name == null ? "" : data.cbc_name) + '" readonly class="openAccount" />' +
                                '</dd>' +
                                '</dl>' +
                                '<dl style="height: auto;" class="bankImage">' +
                                '<dt>银行卡照片：</dt>' +
                                '<dd style="width: 110px; min-width: 110px; height: auto;">' +
                                '<div class="images-box" id="BK-box">' + bankImage +
                                '</div>' +
                                '</dd>' +
                                '<dd class="tisp" style="height:24px; line-height: 24px;"><span id="BK-count">1</span>/<span id="BK-limit">1</span></dd>' +
                                '</dl>' +
                                '</div>' +
                                '</div>';
                            if (data.cbc_path != null) {
                                $(".bank-image").append('<img class="showboxImg" src="' + data.img_path + '">');
                            } else {
                                $(".bank-image").prev().css("background-color", "#c3c3c3");
                                $(".bank-image").prev().attr("onclick", "");
                            }
                        } else {
                            var bankCode = data.cbc_cardNum;
                            var bankImage = "";
                            if (data.cbc_path == null) {
                                bankImage = '<div class="images-btn" data-box="BKupload" data-type="BK" data-url="" style="display: inline-block;">选择图片</div>';
                            } else {
                                bankImage = '<div class="images-btn" data-box="BKupload" data-type="BK" data-url="" style="display: none;">选择图片</div>' +
                                    '<div class="images-box-img"><img class="showboxImg" name="bank" image-type="customer" src="' + (data.cbc_path == null ? "" : data.cbc_path) + '"><span class="images-box-img-delete" data-del-url="/customer/deleteImage" data-type="CD1">删除</span></div>';
                            }
                            var bankNum = bankCode.replace(/(\d{4})/g, '$1 ').replace(/\s*$/, '');
                            html += '<div class="bank_div">' +
                                removeHtml +
                                '<div class="bank_div_title"><i class="fa fa-credit-card-alt" style="margin-right: 10px"></i><span class="bankTitle">' + data.cbc_bankName + '</span><i class="fa fa-angle-double-up" style="float: right; width: 20px; height: 22px; line-height: 22px; margin-top: 7px; margin-left: 25px; cursor:pointer;" onclick="bankUp(this)"></i><label class="common-checkbox" style="float: right;"><input type="radio" name="bank" />使用</label></div>' +
                                '<div class="bank_div_content" style="display: none;">' +
                                '<dl style="width: 100%;">' +
                                '<input type="hidden" name="cbc_id" value="' + data.cbc_id + '">' +
                                '<dt>银行卡号：</dt>' +
                                '<dd>' +
                                '<input style="width: 345px;" value="' + bankNum + '" class="bankCode"  readonly onblur="bankMessage(this)" onkeyup="bankMessage(this)" />' +
                                '<label class="common-checkbox' + check + '" onclick="bankAnther(this)" style="float: right;top:12px"><input type="checkbox" name="onther" class="edit" ' + checked + ' >其他</label>' +
                                '</dd>' +
                                '</dl>' +
                                '<dl style="width: 100%;' + bank1 + '">' +
                                '<dt>银行卡信息：</dt>' +
                                '<dd>' +
                                '<img alt="" src="' + bankpoto + '" style="height: 50px; width:110px; float: left; margin-top: -13px;">' +
                                '<input class="bankMessage" value="' + (data.cbc_grade == null ? "" : data.cbc_grade) + (data.cbc_type == null ? "" : "-" + data.cbc_type) + '" style="width: 240px; float: left;" readonly />' +
                                '</dd>' +
                                '</dl>' +
                                '<dl style="width: 100%;' + bank2 + '">' +
                                '<dt>银行卡信息：</dt>' +
                                '<dd>' +
                                '<input class="bankMessageTitle" onblur="bankMessageTitle(this)" onkeyup="bankMessageTitle(this)" value="' + data.cbc_bankName + '" style="width: 140px; float: left;" readonly />' +
                                '<input class="bankMessage1" value="' + (data.cbc_grade == null ? "" : data.cbc_grade) + (data.cbc_type == null ? "" : "-" + data.cbc_type) + '" style="width: 240px; float: left;" readonly />' +
                                '</dd>' +
                                '</dl>' +
                                '<dl>' +
                                '<dt>开户网点：</dt>' +
                                '<dd>' +
                                '<input value="' + (data.cbc_address == null ? "" : data.cbc_address) + '" readonly class="accountOpening" />' +
                                '</dd>' +
                                '</dl>' +
                                '<dl>' +
                                '<dt>开户名：</dt>' +
                                '<dd>' +
                                '<input value="' + (data.cbc_name == null ? "" : data.cbc_name) + '" readonly class="openAccount" />' +
                                '</dd>' +
                                '</dl>' +
                                '<dl style="height: auto;" class="bankImage">' +
                                '<dt>银行卡照片：</dt>' +
                                '<dd style="width: 110px; min-width: 110px; height: auto;">' +
                                '<div class="images-box" id="BK-box">' + bankImage +
                                '</div>' +
                                '</dd>' +
                                '<dd class="tisp" style="height:24px; line-height: 24px;"><span id="BK-count">1</span>/<span id="BK-limit">1</span></dd>' +
                                '</dl>' +
                                '</div>' +
                                '</div>';
                        }
                    });
                } else {
                    html += '<div class="bank_div">' +
                        '<div class="bank_div_title"><i class="fa fa-credit-card-alt" style="margin-right: 10px"></i><span class="bankTitle">银行卡</span><i class="fa fa-angle-double-up" style="float: right; width: 20px; height: 22px; line-height: 22px; margin-top: 7px; margin-left: 25px; cursor:pointer;" onclick="bankUp(this)"></i><label class="common-checkbox common-checkbox-checked" style="float: right;"><input type="radio" name="bank" checked />使用</label></div>' +
                        '<div class="bank_div_content" style="display: none;">' +
                        '<dl style="width: 100%;">' +
                        '<dt>银行卡号：</dt>' +
                        '<dd>' +
                        '<input style="width: 345px;" value="" class="bankCode"  readonly onblur="bankMessage(this)" onkeyup="bankMessage(this)" />' +
                        '<label class="common-checkbox" onclick="bankAnther(this)" style="float: right;top:12px"><input type="checkbox" name="onther" class="edit">其他</label>' +
                        '</dd>' +
                        '</dl>' +
                        '<dl style="width: 100%; display:none;">' +
                        '<dt>银行卡信息：</dt>' +
                        '<dd>' +
                        '<img alt="" src="" style="height: 50px; width:110px; float: left; margin-top: -13px;">' +
                        '<input class="bankMessage" value="" style="width: 240px; float: left;" readonly />' +
                        '</dd>' +
                        '</dl>' +
                        '<dl style="width: 100%; display:none;">' +
                        '<dt>银行卡信息：</dt>' +
                        '<dd>' +
                        '<input class="bankMessageTitle" onblur="bankMessageTitle(this)" onkeyup="bankMessageTitle(this)" value="" style="width: 140px; float: left;" readonly />' +
                        '<input class="bankMessage1" value="" style="width: 240px; float: left;" readonly />' +
                        '</dd>' +
                        '</dl>' +
                        '<dl>' +
                        '<dt>开户网点：</dt>' +
                        '<dd>' +
                        '<input value="" readonly class="accountOpening" />' +
                        '</dd>' +
                        '</dl>' +
                        '<dl>' +
                        '<dt>开户名：</dt>' +
                        '<dd>' +
                        '<input value="" readonly class="openAccount" />' +
                        '</dd>' +
                        '</dl>' +
                        '<dl style="height: auto;" class="bankImage">' +
                        '<dt>银行卡照片：</dt>' +
                        '<dd style="width: 110px; min-width: 110px; height: auto;">' +
                        '<div class="images-box" id="BK-box">' +
                        '<div class="images-btn" data-box="BKupload" data-type="BK" data-url="" style="display: inline-block;">选择图片</div>' +
                        '</div>' +
                        '</dd>' +
                        '<dd class="tisp" style="height:24px; line-height: 24px;"><span id="BK-count">0</span>/<span id="BK-limit">1</span></dd>' +
                        '</dl>' +
                        '</div>' +
                        '</div>';
                    $(".bank-image").prev().hide();
                    $(".bank-image").prev().attr("onclick", "");
                }
                $("#bank_contents").html(html);
                $("#main-box .bank_div .fa-minus-square").hide();

                // 客户扩展信息
                if (result.customerExtend != null && result.customerExtend != undefined) {
                    var customerExtend = result.customerExtend;
                    // 客户扩展信息
                    $("[name=nation]").val(customerExtend.nation);
                    $("[name=native_place]").val(customerExtend.native_place);
                    $("[name=birthday]").val(returnDate(customerExtend.birthday));
                    $("[name=age]").val(customerExtend.age);
                    $("[name=stature]").val(customerExtend.stature);
                    $("[name=education]").val(customerExtend.education);
                    $("[name=major]").val(customerExtend.major);
                    $("[name=work_years]").val(customerExtend.work_years);
                    $("[name=interests]").val(customerExtend.interests);
                    $("[name=fax]").val(customerExtend.fax);
                    $("[name=contact_address]").val(customerExtend.contact_address);
                    $("[name=companyName]").val(customerExtend.company_name);
                    $("[name=companyAddress]").val(customerExtend.company_address);
                    $("[name=companyTel]").val(customerExtend.company_tel);
                    $("[name=business]").val(customerExtend.business);
                    $("[name=profession]").val(customerExtend.profession);
                    $("[name=marital_status]").val(customerExtend.marital_status);
                    $("[name=income_status]").val(customerExtend.income_status);
                    $("[name=QQ]").val(result.customerCode.cc_qq);
                    $("[name=WX]").val(result.customerCode.cc_wx);
                    $("[name=email]").val(result.customerCode.cc_email);

                    // 初始化客户评分
                    $(".fenshu").html(result.customerExtend.star_level);
                    $("[name=customer_comment]").val(result.customerExtend.customer_comment);
                    var indexO = result.customerExtend.star_level / 0.5;
                    $(".star_score a").eq(indexO - 1).addClass("clibg");
                }

                if (result.userCustomerIDList != null && result.userCustomerIDList != undefined) {

                    if (result.userCustomerIDList.length > 1) {
                        $("#otherID_contents").html("");
                        $.each(result.userCustomerIDList, function (index, data) {
                            var idImage = "";
                            if (data.id_path == null) {
                                idImage = '<div class="images-btn" data-box="BKupload" data-type="BK" data-url="" style="display: inline-block;">选择图片</div>';
                            } else {
                                idImage = '<div class="images-btn" data-box="BKupload" data-type="BK" data-url="" style="display: none;">选择图片</div>' +
                                    '<div class="images-box-img"><img class="showboxImg" name="CD1" src="' + (data.id_path == null ? "" : data.id_path) + '"><span class="images-box-img-delete" data-del-url="/customer/deleteImage" data-type="CD1">删除</span></div>';
                            }
                            $("#otherID_contents").append('<div class="bank_div">' +
                                '<i class="fa fa-minus-square" style="margin-left: 10px; color:#E74C3C; cursor: pointer;" onclick="phoneDelete(this)"></i>' +
                                '<div class="bank_div_title" style="border-bottom: 1px solid #031d18;"><i class="fa fa-vcard" style="margin-right: 10px"></i><span class="bankTitle">其他证件信息</span><i class="fa fa-angle-double-up" style="float: right; width: 20px; height: 22px; line-height: 22px; margin-top: 7px; margin-left: 25px; cursor:pointer;" onclick="bankUp(this)"></i></div>' +
                                '<div class="bank_div_content" style="height: 310px; display:none;">' +
                                '<input type="hidden" name="cc_id" value="' + data.cc_id + '"/>' +
                                '<dl style="width: 50%;">' +
                                '<dt>证件类型：</dt>' +
                                '<dd>' +
                                '<select name="id_type" onchange="IDCardChange()" style="border:1px solid #ccc;">' +
                                '<option value="-1">请选择</option>' +
                                '<option value="1" selected>身份证</option>' +
                                '<option value="2">军官证</option>' +
                                '<option value="3">商户号</option>' +
                                '<option value="4">护照</option>' +
                                '<option value="5">台湾居民通行证</option>' +
                                '<option value="6">香港居民通行证</option>' +
                                '<option value="7">临时身份证</option>' +
                                '<option value="8">外国人永久居留证</option>' +
                                '</select>' +
                                '</dd>' +
                                '</dl>' +
                                '<dl style="width: 50%;">' +
                                '<dt>证件号码：</dt>' +
                                '<dd>' +
                                '<input value="' + data.id_no + '" name="id_no" class="openAccount edit" style="width: 160px;" />' +
                                '</dd>' +
                                '</dl>' +
                                '<dl style="width: 100%;">' +
                                '<dt>证件有效期：</dt>' +
                                '<dd>' +
                                '<input type="date" value="' + returnDate(data.id_pastDate) + '" name="id_pastDate" class="openAccount edit" />' +
                                '</dd>' +
                                '</dl>' +
                                '<dl style="height: auto;" class="bankImage">' +
                                '<dt>证件照片：</dt>' +
                                '<dd style="width: 110px; min-width: 110px; height: auto;">' +
                                '<div class="images-box" id="BK-box">' +
                                //    										'<div class="images-btn" data-box="BKupload" data-type="BK" data-url="" data-del-url="/customer/deleteImage" style="display: inline-block;">选择图片</div>'+
                                idImage +
                                '</div>' +
                                '</dd>' +
                                '<dd class="tisp" style="height:24px; line-height: 24px;"><span id="BK-count">0</span>/<span id="BK-limit">1</span></dd>' +
                                '</dl>' +
                                '</div>' +
                                '</div>');
                            $("[name=id_type]").val(data.id_type);
                        });
                    } else {
                        var data = result.userCustomerIDList[0] || "";
                        var idImage = "";
                        if (data.id_path == null || data.id_path == undefined) {
                            idImage = '<div class="images-btn" data-box="BKupload" data-type="BK" data-url="" style="display: inline-block;">选择图片</div>';
                        } else {
                            idImage = '<div class="images-btn" data-box="BKupload" data-type="BK" data-url="" style="display: none;">选择图片</div>' +
                                '<div class="images-box-img"><img class="showboxImg" name="CD1" src="' + (data.id_path == null ? "" : data.id_path) + '"><span class="images-box-img-delete" data-del-url="/customer/deleteImage" data-type="CD1">删除</span></div>';
                        }
                        $("#otherID_contents [name=ci_id]").val(data.cc_id);
                        $("#otherID_contents [name=id_type]").val(data.id_type);
                        $("#otherID_contents [name=id_no]").val(data.id_no);
                        $("#otherID_contents [name=id_pastDate]").val(returnDate(data.id_pastDate));
                        $("#otherID_contents .images-box").html(idImage);
                    }
                }

                if (result.userCustomerLinkManList != null && result.userCustomerLinkManList != undefined) {
                    if (result.userCustomerLinkManList.length > 1) {

                        $("#linkMan_contents").html("");

                        $.each(result.userCustomerLinkManList, function (index, data) {
                            $("#linkMan_contents").append('<div class="bank_div">' +
                                '<i class="fa fa-minus-square" style="margin-left: 10px; color:#E74C3C; cursor: pointer;" onclick="phoneDelete(this)"></i>' +
                                '<div class="bank_div_title" style="border-bottom: 1px solid #031d18;"><i class="fa fa-user-circle" style="margin-right: 10px"></i><span class="bankTitle">更多联系人信息</span><i class="fa fa-angle-double-up" style="float: right; width: 20px; height: 22px; line-height: 22px; margin-top: 7px; margin-left: 25px; cursor:pointer;" onclick="bankUp(this)"></i></div>' +
                                '<div class="bank_div_content" style="height: 310px; display:none; border-left: 1px dashed #ccc;border-right:1px dashed #ccc;border-bottom:1px dashed #ccc;">' +
                                '<input type="hidden" name="cl_id" value="' + data.cl_id + '">' +
                                '<dl style="width:100%;">' +
                                '<dt>姓名：</dt>' +
                                '<dd><input name="linkManName" class="openAccount edit" value="' + data.cl_name + '" onblur="bankUserName(this)" /></dd>' +
                                '</dl>' +
                                '<dl style="width:100%;">' +
                                '<dt>证件类型：</dt>' +
                                '<dd>' +
                                '<select style="border:1px solid #ccc;" value="" name="id_type" onchange="IDCardChange()"><option value="-1">请选择</option><option value="1" selected>身份证</option><option value="2">军官证</option><option value="3">商户号</option><option value="4">护照</option><option value="5">台湾居民通行证</option><option value="6">香港居民通行证</option><option value="7">临时身份证</option><option value="8">外国人永久居留证</option></select>' +
                                '<input style="width:160px; margin-left: 10px;" name="id_no" class="openAccount edit" value="' + data.cl_cardNum + '" onkeyup="isCards(this)" maxlength="19" />' +
                                '<select style="margin-left: 10px; width: 40px; text-align: center; text-indent: 0;border:1px solid #ccc;" value="" name="sex"><option value="0">女</option><option value="1">男</option><option value="2">未知</option></select>' +
                                '<div class="alertMessage" style="display: none;">' +
                                '<i class="alertMessage_icon"></i>' +
                                //    	    								 	'<div id="alertContent">用户已经存在！</div>'+
                                '</div>' +
                                '</dd>' +
                                '</dl>' +
                                '<dl style="width: 310px;">' +
                                '<dt style="width:90px">邮箱：</dt>' +
                                '<dd style="width: 60%;">' +
                                '<input name="email" class="openAccount edit" value="' + data.cl_email + '"/>' +
                                '</dd>' +
                                '</dl>' +
                                '<dl style="width: 310px;">' +
                                '<dt style="width:90px">联系电话：</dt>' +
                                '<dd style="width: 60%;">' +
                                '<input name="phone" class="openAccount edit" value="' + data.cl_phone + '"/>' +
                                '</dd>' +
                                '</dl>' +
                                '<dl style="width: 310px;">' +
                                '<dt style="width:90px">联系地址：</dt>' +
                                '<dd style="width: 60%;">' +
                                '<input name="address" class="openAccount edit" value="' + data.cl_address + '"/>' +
                                '</dd>' +
                                '</dl>' +
                                '<dl style="width: 310px;">' +
                                '<dt style="width:90px">QQ：</dt>' +
                                '<dd style="width: 60%;">' +
                                '<input name="qq" class="openAccount edit" value="' + data.cl_qq + '"/>' +
                                '</dd>' +
                                '</dl>' +
                                '<dl style="width: 310px;">' +
                                '<dt style="width:90px">工作单位：</dt>' +
                                '<dd style="width: 60%;">' +
                                '<input name="workplace" class="openAccount edit" value="' + data.cl_work + '"/>' +
                                '</dd>' +
                                '</dl>' +
                                '<dl style="width: 310px;">' +
                                '<dt style="width:90px">与客户关系：</dt>' +
                                '<dd style="width: 60%;">' +
                                '<select style="border:1px solid #ccc;" name="relation" onchange="" value="">' +
                                '<option value="-1">请选择</option>' +
                                '<option value="1">夫妻</option>' +
                                '<option value="2">父母</option>' +
                                '<option value="3">子女</option>' +
                                '<option value="4">兄弟姐妹</option>' +
                                '<option value="5">同事</option>' +
                                '<option value="6">朋友</option>' +
                                '<option value="7">同学</option>' +
                                '<option value="8">其他</option>' +
                                '</select>' +
                                '</dd>' +
                                '</dl>' +
                                '</div>' +
                                '</div>');
                            $("[name=sex]").val(data.cl_sex);
                            $("[name=id_type]").val(data.cl_cardType);
                            $("[name=relation]").val(data.relationship);
                        });
                    } else {
                        var data = result.userCustomerLinkManList[0] || "";
                        $("#linkMan_contents [name=cl_id]").val(data.cl_id);
                        $("#linkMan_contents [name=linkManName]").val(data.cl_name);
                        $("#linkMan_contents [name=id_type]").val(data.cl_cardType);
                        $("#linkMan_contents [name=id_no]").val(data.cl_cardNum);
                        $("#linkMan_contents [name=sex]").val(data.cl_sex);
                        $("#linkMan_contents [name=email]").val(data.cl_email);
                        $("#linkMan_contents [name=phone]").val(data.cl_phone);
                        $("#linkMan_contents [name=address]").val(data.cl_address);
                        $("#linkMan_contents [name=qq]").val(data.cl_qq);
                        $("#linkMan_contents [name=workplace]").val(data.cl_work);
                        $("#linkMan_contents [name=relation]").val(data.relationship);
                    }
                }
            }
            var ss = "";
            var pp = "<select id='housepinpai' name='phi_source' class='selects'>"
                + "<option value=''>--请选择--</option>";
            /** 推荐群体 */
            $.each(result.ru, function (index, date) {
                ss = ss + "<label class='type-label'  onclick='changeqt(this)' for='type" + (index + 100) + "'>"
                    + date.recommendGroup_Name + "<i></i>"
                    + " <input type='checkbox' class='type-radio' name='recommendGroup_Id' value='" + date.recommendGroup_Id + "' id='type" + (index + 100) + "'>"
                    + "</label>"
            })
            /** 房源品牌 */
            $.each(result.hb, function (index, date) {
                pp = pp + "<option value='" + date.his_id + "' id=''>" + date.his_name + "</option>";
            })

            /** 房源配置 */
            pp = pp + "</select>";
            ss = ss + "</select>";
            document.getElementById("recommendGroupDiv1").innerHTML = ss;
            document.getElementById("fangyuanpinpaidiv").innerHTML = pp;

            customerEdit();
            customerData.resolve();
        }
    });

    $.when(customerData).done(function () {
        $(".bankCode").bankInput();
    });
}

/**
 * 显示更多数据
 *
 * @param ids
 */
function showContent(ids) {
    var textLength = parseInt($(ids).text().length / 28);
    if ($(ids).text() > 28) {
        var textLengthM = $(ids).text().length % 28
    }
    if (textLength > 1) {
        $(ids).find(".text-font").css("line-height", "26px");
        $(ids).height(39 + 24 * (textLength - 1));
        $(ids).find(".text-font").height(39 + 24 * (textLength - 1));
    }
}

/**
 * 隐藏更多数据
 *
 * @param ids
 */
function hideContent(ids) {
    $(ids).height(39);
    $(ids).find(".text-font").height(39);
    $(ids).find(".text-font").css("line-height", "39px");
}

/**
 * 提醒控制填写内容
 *
 * @param ids
 */
function changeRemindShow(ids) {
    if ($(ids).val() == "提醒") {
        $(".checkbox-success input").attr("checked", true);
        $("#remindShow").show();
        $("#followUp").hide();
        var h = $(document).height();
        $(document).scrollTop(h);
    } else {
        $("#followUp").show();
        $("#remindShow").hide();
        $(".checkbox-success input").attr("checked", false);
    }

    $("#ht_remind_time").val("");
    $("#htRemindCount").val("");
    $("#hour").val("9");
    $("#min").val("40");
}

/**
 * 手机号码显示更多
 */
function phoneDown(ids) {
    if ($(".morePhone").is(":hidden")) {
        $(ids).attr("class", "fa fa-chevron-circle-up");
        $(".morePhone").slideDown();
    } else {
        $(ids).attr("class", "fa fa-chevron-circle-down");
        $(".morePhone").slideUp();
    }
}

/**
 * 点击显示图片
 */
function cardImage(ids) {
    if ($(ids).next().is(":hidden")) {
        $(ids).next().show();
    } else {
        $(ids).next().hide();
    }
}

/**
 * 判断手机格式
 *
 * @param ids
 */
function phoneBool(ids) {
    if (!isPhone($(ids).val())) {
        $(ids).css("border", "1px solid #E74C3C");
    } else {
        $(ids).css("border", "1px solid #CCC");
    }

    // 发送请求
    $.ajax({
        type: "POST",
        url: "/customer/checkBlackListByCardNumPhone",
        data: {
            cc_cardNum: "",
            phone: $(ids).val()
        },
        dataType: "json",
        success: function (result) {
            if (result.isBlack == false) {
                $(ids).focus();
                swal("请注意，该客户为公司黑名单客户");
                return;
            } else {
            }
        }
    });
}

/**
 * 删除备用电话
 *
 * @param ids
 */
function phoneDelete(ids) {
    $(ids).parent().remove();
}

/**
 * 添加提醒
 */
function remindShow() {
    if ($("#remindShow").is(":hidden")) {
        $(".checkbox-success input").attr("checked", true);
        $("#remindShow").slideDown(function () {
            var h = $(document).height();
            $(document).scrollTop(h);
        });
    } else {
        $("#remindShow").slideUp();
        $(".checkbox-success input").attr("checked", false);
    }
}

/**
 * 编辑客户信息
 */
function customerEdit() {
    $("#contents2 input").addClass("edit");
    $("#contents2 input").removeAttr("readonly");
    // $("#contents2 input").attr("disabled", false);
    $("#contents2 select").addClass("edit");
    // $("#contents2 select").removeAttr("disabled");
    // $(".phoneDiv .addButton-icon-add").show();
    // $(".bank_content .addButton-icon-add").show();
    // $(".fa-minus-square").show();
    $(".edit-customer").next().show();
    $(".edit-customer").next().next().show();
    $(".bankMessage").removeClass("edit");
    $(".bankMessage1").removeClass("edit");
    // $(".bankMessage").attr("readonly", true);
    // $(".bankMessage1").attr("readonly", true);
    $("#phoneUpDown").hide();
    $(".morePhone").show();
    $("select").removeAttr("disabled");
}

/**
 * 取消编辑客户信息
 */
function customerCancel() {
    $("#contents2 input").removeClass("edit");
    $("#contents2 input").attr("readonly", true);
    $("#contents2 input").css("border", "");
    // $(".customerType input").attr("disabled", true);
    $("#contents2 select").removeClass("edit");
    // $("#contents2 select").attr("disabled", true);
    $(".phoneDiv .addButton-icon-add").hide();
    // $(".bank_content .addButton-icon-add").hide();
    $(".edit-customer").next().hide();
    $(".edit-customer").next().next().hide();
    $("#addPhoneDiv").hide();
    $("#phoneUpDown").show();
    $(".morePhone").hide();
    $(".fa-minus-square").hide();
}

/**
 * 保存客户信息
 */
function customerSave() {
    var cc_code = "";
    if (getUrlParam("cc_code") != null && getUrlParam("cc_code") != "") {
        cc_code = getUrlParam("cc_code");
    }

    // 用户姓名
    var userName = $("#userName").val();
    // 证件类型
    var cardType = $("#cardType").val();
    // 证件号码
    var cardNum = $("#cardNum").val();
    if ($("#cardNum").prev().val() == "1") {
        if (!isIDCard(cardNum)) {
            $("#cardNum").css("border", "1px solid #E74C3C");
            return;
        }
    }
    // 性别
    var sex = $("#sex").val();
    // 身份证正面
    var frontCard = $("#frontCard img").attr("data-url");

    // 身份证反面
    var inverseCard = $("#inverseCard img").attr("data-url");
    return;
    // 客户类型
    var type = "";
    $(".customerType label").each(function (i) {
        if ($(this).find("input").is(":checked")) {
            type += $(this).text() + "-";
        }
    });
    type = type.substring(0, type.length - 1);

    // 手机号码
    var phone = "";
    var phoneBool = true;
    var phoneProject;
    phone += $("#phoneType").val() + "-" + $("#phone").val() + ",";
    $(".morePhone .phoneDiv").each(function (i) {
        if (!isPhone($(this).find(".phoneCopy").val())) {
            phoneBool = false;
            phoneProject = $(this).find(".phoneCopy");
            return;
        }
        phone += $(this).find(".cardType").val() + "-" + $(this).find(".phoneCopy").val() + ",";
    });
    if (!phoneBool) {
        $(phoneProject).msg("手机号码格式不正确！");
        return;
    }
    phone = phone.substring(0, phone.length - 1);
    // 银行卡
    var bankCard = "";
    var bankText = "";
    var bankImage = "";
    var bankBool = true;
    var oneBool = true;
    $("#bank_contents .bank_div").each(function (i) {
        if ($("#bank_contents .bank_div").length == 1 && $(this).find(".bankCode").val().NoSpace() == "") {
            oneBool = false;
            return false;
        }
        if ($(this).find(".bankCode").val().NoSpace() != "") {
            var state = 1;
            if ($(this).find(".bank_div_title label input").is(":checked")) {
                state = 0;
                bankText = $(this).find(".bankTitle").text() + "-" + $(this).find(".bankCode").val().NoSpace() + "-" + $(this).find(".openAccount").val();
                bankImage = $(this).find(".bankImage img").attr("src");
            }
            if ($(this).find(".bank_div_content .common-checkbox input").is(":checked")) {
                bankCard += $(this).find(".bankTitle").text() + "*" + $(this).find(".bankCode").val().NoSpace() + "*" + $(this).find(".bankMessage1").val() + "*" + $(this).find(".accountOpening").val() + "*" + $(this).find(".openAccount").val() + "*" + "" + "*" + state + ",";
            } else {
                if ($(this).find(".bankTitle").text() == "银行卡") {
                    $(this).find(".bankCode").css("border", "1px solid #E74C3C");
                    bankBool = false;
                    return false;
                }
                if ($(this).find(".bankCode").val().NoSpace() != "") {
                    var image = $(this).find(".bankImage img").attr("data-url");
                    if (image == null || image == "") {
                        image = "";
                    }
                    bankCard += $(this).find(".bankTitle").text() + "*" + $(this).find(".bankCode").val().NoSpace() + "*" + $(this).find(".bankMessage").val() + "*" + $(this).find(".accountOpening").val() + "*" + $(this).find(".openAccount").val() + "*" + image + "*" + state + ",";
                }
            }
        }
    });
    if (oneBool) {
        if (!bankBool) {
            alert("银行卡未被识别！");
            return;
        }
    }
    if (bankCard != "") {
        bankCard = bankCard.substring(0, bankCard.length - 1);
    }

    if (!$(".alertMessage").is(":hidden")) {
        return;
    }

    if (userName == "" || cardType == "" || cardNum == "" || sex == "" || type == "" || phone == "") {
        alert("请完善基本信息在进行提交！");
        return;
    }

    var bool = true;

    if (cardCode != $("#cardNum").val()) {
        $.ajax({
            type: "POST",
            url: "/customer/customerCard",
            data: {
                cardNum: $("#cardNum").val()
            },
            dataType: "json",
            async: false,
            success: function (result) {
                if (result.message == "success") {
                    $(".alertMessage").hide();
                } else {
                    $(".alertMessage").show();
                    bool = false;
                }
            }
        });
    }

    if (!bool) {
        return;
    }

    // QQ
    var qq = $("#QQ").val();
    // 微信
    var wx = $("#WX").val();
    // 职业
    var occupation = $("#occupation").val();
    if ($("#occupation").val() == "请选择") {
        occupation = "";
    }
    // 工作单位
    var work = $("#work").val();
    // 通讯地址
    var address = $("#address").val();
    // 紧急联系人
    var phoneUser = ($("#urgentType").val() == "请选择" ? "" : $("#urgentType").val()) + ($("#urgentPhone").val() == "" ? "" : "-" + $("#urgentPhone").val());

    $.ajax({
        type: "POST",
        url: "/customer/addCustomer",
        data: {
            cc_code: cc_code,
            cc_name: userName,
            cc_cardType: cardType,
            cc_cardNum: cardNum,
            cc_sex: sex,
            cc_type: type,
            frontCard: frontCard,
            inverseCard: inverseCard,
            phone: phone,
            bankMessage: bankCard,
            cc_qq: qq,
            cc_wx: wx,
            cc_occupation: occupation,
            cc_work: work,
            phoneUser: phoneUser,
            cc_address: address
        },
        dataType: "json",
        success: function (result) {
            if (result.message == "success") {
                // customerCancel();
                var sexName = "男";
                if (sex == 0) {
                    sexName = "女";
                } else if (sex == 2) {
                    sexName = "未知";
                }
                //联系人
                $(".namePhone").text($("#userName").val() + "-" + $("#phone").val() + "-" + sexName);
                //身份证
                $(".IDCard").text($("#cardNum").val());
                $(".IDCard").next().css("background-color", "#E74C3C");
                $(".IDCard").next().attr("onclick", "cardImage(this)");
                $(".card-image").html('<img class="showboxImg" src="' + $("#frontCard img").attr("src") + '"><img class="showboxImg" src="' + $("#inverseCard img").attr("src") + '">');
                //类型
                $(".type").text(type);
                //银行卡
                if (bankCard != "") {
                    $(".bankText").text(bankText);
                    $(".bankText").next().css("background-color", "#E74C3C");
                    $(".bankText").next().attr("onclick", "cardImage(this)");
                    $(".bank-image").html('<img class="showboxImg" src="' + bankImage + '">');
                }

                $(".QQ").text(qq);
                $(".WX").text(wx);
                $(".occupation").text(occupation + "-" + work);
                $(".phoneAddress").text(address);
                $(".urgentUser").text(phoneUser);
            }
        }
    });
}

/**
 * 打开添加意向房源
 */
function showADD() {
    //打开窗口
    $('.cd-popup3').addClass('is-visible3');
}

/**
 * 保存客户信息
 */
function customerSaveAdd() {

    var cc_code = "";
    if (getUrlParam("cc_code") != null && getUrlParam("cc_code") != "") {
        cc_code = getUrlParam("cc_code");
    }
    // 用户姓名
    var userName = $("#userName").val();
    // 证件类型
    var cardType = $("#cardType").val();
    // 证件号码
    var cardNum = $("#cardNum").val();

    if ($("#cardNum").prev().val() == "1") {
        if (!isIDCard(cardNum)) {
            $("#cardNum").msg("身份证错误！");
            $("#cardNum").css("border", "1px solid #E74C3C");
            return;
        }
    }
    // 性别
    var sex = $("#sex").val();
    // 身份证正面
    var frontCard = $("#frontCard img").attr("data-url");
    // 身份证反面
    var inverseCard = $("#inverseCard img").attr("data-url");
    // 客户类型
    var type = "";
    $(".customerType label").each(function (i) {
        if ($(this).find("input").is(":checked")) {
            type += $(this).text() + "-";
        }
    });
    type = type.substring(0, type.length - 1);

    // 手机号码
    var phone = "";
    var phoneBool = true;
    var phoneProject;
    phone += $("#phoneType").val() + "-" + $("#phone").val() + ",";
    if (!isPhone($("#phone").val())) {
        $("#phone").msg("手机号码输入有误");
        return;
    }
    $(".morePhone .phoneDiv").each(function (i) {
        if (!isPhone($(this).find(".phoneCopy").val())) {
            phoneProject = $(this).find(".phoneCopy");
            phoneBool = false;
            return false;
        }
        phone += $(this).find(".cardType").val() + "-" + $(this).find(".phoneCopy").val() + ",";
    });
    if (!phoneBool) {
        $(phoneProject).msg("手机号码格式不正确！");
        return;
    }
    phone = phone.substring(0, phone.length - 1);

    if (!$(".alertMessage").is(":hidden")) {
        return;
    }

    if (userName == "" || cardType == "" || cardNum == "" || sex == "" || type == "" || phone == "") {
        alert("请完善基本信息在进行提交！");
        return;
    }

    // 黑名单检索
    checkBlackList(cardNum, phone);

    var bool = true;

    if (cardCode != $("#cardNum").val()) {
        $.ajax({
            type: "POST",
            url: "/customer/customerCard",
            data: {
                cardNum: $("#cardNum").val()
            },
            dataType: "json",
            async: false,
            success: function (result) {
                if (result.message == "success") {
                    $.jBox.tip('提交成功', 'success');
                    $(".alertMessage").hide();
                } else {
                    $(".alertMessage").show();
                    bool = false;
                }
            }
        });
    }

    if (!bool) {
        $.jBox.close(true);
        return;
    }
    $.jBox.tip("正在提交中...", 'loading');
    // QQ
    var qq = $("[name=QQ]").val();
    // 微信
    var wx = $("[name=WX]").val();
    // 职业
    var occupation = $("#occupation").val();
    if ($("#occupation").val() == "请选择") {
        occupation = "";
    }
    // 工作单位
    var work = $("#work").val();
    // 通讯地址
    var address = $("#cc_address").val();
    // 紧急联系人
    var phoneUser = ($("#urgentType").val() == "请选择" ? "" : $("#urgentType").val()) + ($("#urgentPhone").val() == "" ? "" : "-" + $("#urgentPhone").val());

    var data = {};
    // 客户信息
    var UserCustomer = {};
    // 客户银行卡信息
    var UserCustomerBankArray = new Array();
    // 客户其他证件信息
    var UserCustomerIDArray = new Array();
    // 客户关联人信息
    var UserCustomerLinkManArray = new Array();

    // 客户基本信息
    UserCustomer.cc_id = $("[name=cc_id]").val();
    UserCustomer.cc_code = cc_code;
    UserCustomer.cc_name = userName;
    UserCustomer.cc_cardType = cardType;
    UserCustomer.cc_cardNum = cardNum;
    UserCustomer.cc_sex = sex;
    UserCustomer.cc_type = type;
    UserCustomer.frontCard = frontCard;
    UserCustomer.inverseCard = inverseCard;
    UserCustomer.ccp_phone = phone;
    UserCustomer.bankMessage = bankCard;
    UserCustomer.cc_qq = qq;
    UserCustomer.cc_wx = wx;
    UserCustomer.cc_email = $("[name=email]").val();
    UserCustomer.cc_occupation = occupation;
    UserCustomer.cc_work = work;
    UserCustomer.phoneUser = phoneUser;
    UserCustomer.cc_address = address;
    // 客户扩展信息
    UserCustomer.nation = $("[name=nation]").val();
    UserCustomer.native_place = $("[name=native_place]").val();
    UserCustomer.birthday = $("[name=birthday]").val();
    UserCustomer.age = $("[name=age]").val();
    UserCustomer.stature = $("[name=stature]").val();
    UserCustomer.education = $("[name=education]").val();
    UserCustomer.major = $("[name=major]").val();
    UserCustomer.work_years = $("[name=work_years]").val();
    UserCustomer.interests = $("[name=interests]").val();
    UserCustomer.fax = $("[name=fax]").val();
    UserCustomer.contact_address = $("[name=contact_address]").val();
    UserCustomer.company_name = $("[name=companyName]").val();
    UserCustomer.company_address = $("[name=companyAddress]").val();
    UserCustomer.company_tel = $("[name=companyTel]").val();
    UserCustomer.business = $("[name=business]").val();
    UserCustomer.profession = $("[name=profession]").val();
    UserCustomer.marital_status = $("[name=marital_status]").val();
    UserCustomer.income_status = $("[name=income_status]").val();
    UserCustomer.contact_address = $("[name=contact_address]").val();
    data.UserCustomer = JSON.stringify(UserCustomer);

    // 银行卡
    var bankCard = "";
    var bankBool = true;
    var oneBool = true;
    $("#bank_contents .bank_div").each(function (i) {
        var UserCustomerBank = {};
        if ($("#bank_contents .bank_div").length == 1 && $(this).find(".bankCode").val().NoSpace() == "") {
            oneBool = false;
            return false;
        }
        var state = 1;
        if ($(this).find(".bank_div_title label input").is(":checked")) {
            state = 0;
        }
        if ($(this).find(".bank_div_content .common-checkbox input").is(":checked")) {
            bankCard += $(this).find(".bankTitle").text() + "*" + $(this).find(".bankCode").val().NoSpace() + "*" + $(this).find(".bankMessage1").val() + "*" + $(this).find(".accountOpening").val() + "*" + $(this).find(".openAccount").val() + "*" + "" + "*" + state + ",";
            UserCustomerBank.cbc_id = $(this).find("[name=cbc_id]").val();
            UserCustomerBank.cbc_cardNum = $(this).find(".bankCode").val().NoSpace();
            UserCustomerBank.cbc_type = $(this).find(".bankMessage1").val().split("-")[1];
            UserCustomerBank.cbc_address = $(this).find(".accountOpening").val();
            UserCustomerBank.cbc_name = $(this).find(".openAccount").val();
            UserCustomerBank.cbc_bankName = $(this).find(".bankTitle").text();
            UserCustomerBank.cbc_path = $(this).find(".bankImage img").attr("src");
            UserCustomerBank.cbc_state = state;
            UserCustomerBank.cbc_grade = $(this).find(".bankMessage1").val().split("-")[0];
            UserCustomerBankArray.push(UserCustomerBank);
        } else {
            if ($(this).find(".bankTitle").text() == "银行卡") {
                $(this).find(".bankCode").css("border", "1px solid #E74C3C");
                bankBool = false;
                return false;
            }
            if ($(this).find(".bankCode").val().NoSpace() != "") {
                var image = $(this).find(".bankImage img").attr("src");
                if (image == null || image == "") {
                    image = "";
                }
                bankCard += $(this).find(".bankTitle").text() + "*" + $(this).find(".bankCode").val().NoSpace() + "*" + $(this).find(".bankMessage").val() + "*" + $(this).find(".accountOpening").val() + "*" + $(this).find(".openAccount").val() + "*" + image + "*" + state + ",";

                UserCustomerBank.cbc_id = $(this).find("[name=cbc_id]").val();
                UserCustomerBank.cbc_cardNum = $(this).find(".bankCode").val().NoSpace();
                UserCustomerBank.cbc_type = $(this).find(".bankMessage").val().split("-")[1];
                UserCustomerBank.cbc_address = $(this).find(".accountOpening").val();
                UserCustomerBank.cbc_name = $(this).find(".openAccount").val();
                UserCustomerBank.cbc_bankName = $(this).find(".bankTitle").text();
                UserCustomerBank.cbc_path = $(this).find(".bankImage img").attr("data-url");
                UserCustomerBank.cbc_state = state;
                UserCustomerBank.cbc_grade = $(this).find(".bankMessage").val().split("-")[0];
                UserCustomerBankArray.push(UserCustomerBank);
            }
        }
        data.UserCustomerBankArray = JSON.stringify(UserCustomerBankArray);
    });
    if (oneBool) {
        if (!bankBool) {
            alert("银行卡未被识别！");
            return;
        }
    }
    if (bankCard != "") {
        bankCard = bankCard.substring(0, bankCard.length - 1);
    }

    // 客户其他证件
    $("#otherID_contents .bank_div").each(function (i) {
        // 黑名单检索
        checkBlackList($(this).find("[name=id_no]").val(), "");

        var UserCustomerID = {};
        UserCustomerID.ci_id = $(this).find("[name=ci_id]").val();
        UserCustomerID.id_type = $(this).find("[name=id_type]").val();
        UserCustomerID.id_no = $(this).find("[name=id_no]").val();
        UserCustomerID.id_pastDate = $(this).find("[name=id_pastDate]").val();
        UserCustomerID.id_path = $(this).find("[name=BK]").attr("src");
        UserCustomerIDArray.push(UserCustomerID);
    });
    data.UserCustomerIDArray = JSON.stringify(UserCustomerIDArray);

    // 联系人信息
    $("#linkMan_contents .bank_div").each(function (i) {
        // 黑名单检索
        checkBlackList($(this).find("[name=id_no]").val(), $(this).find("[name=phone]").val());

        var UserCustomerLinkMan = {};
        UserCustomerLinkMan.cl_id = $(this).find("[name=cl_id]").val();
        UserCustomerLinkMan.cl_name = $(this).find("[name=linkManName]").val();
        UserCustomerLinkMan.cl_cardType = $(this).find("[name=id_type]").val();
        UserCustomerLinkMan.cl_cardNum = $(this).find("[name=id_no]").val();
        UserCustomerLinkMan.cl_sex = $(this).find("[name=sex]").val();
        UserCustomerLinkMan.cl_email = $(this).find("[name=email]").val();
        UserCustomerLinkMan.cl_phone = $(this).find("[name=phone]").val();
        UserCustomerLinkMan.cl_qq = $(this).find("[name=qq]").val();
        UserCustomerLinkMan.cl_address = $(this).find("[name=address]").val();
        UserCustomerLinkMan.cl_work = $(this).find("[name=workplace]").val();
        UserCustomerLinkMan.relationship = $(this).find("[name=relation]").val();
        UserCustomerLinkManArray.push(UserCustomerLinkMan);
    });
    data.UserCustomerLinkManArray = JSON.stringify(UserCustomerLinkManArray);

    $.ajax({
        type: "POST",
        //	    url: "/customer/addCustomer",
        url: "/customer/saveCustomer",
        //	    data : {
        //	    	cc_code : cc_code,
        //	    	cc_name : userName,
        //	    	cc_cardType : cardType,
        //	    	cc_cardNum : cardNum,
        //	    	cc_sex : sex,
        //	    	cc_type : type,
        //	    	frontCard : frontCard,
        //	    	inverseCard : inverseCard,
        //	    	phone : phone,
        //	    	bankMessage : bankCard,
        //	    	cc_qq : qq,
        //	    	cc_wx : wx,
        //	    	cc_occupation : occupation,
        //	    	cc_work : work,
        //	    	phoneUser : phoneUser,
        //	    	cc_address : address
        //	    },
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            //	    	if(result.message == "success"){
            window.location.reload();
            //	    	}
        }
    });
}

//加载得到值得多选默认选中
function StringJiexi(obj, ids) {
    if (obj != null && obj != "") {
        strCheck = obj + ",";
        var obj = obj.split(",");
        $(ids).find(".type-label").each(function () {
            for (var int = 0; int < obj.length; int++) {
                if (obj[int] == $(this).find(".type-radio").val()) {
                    $(this).addClass("span-checked");
                    $(this).find(".type-radio").attr("checked", true);
                    strCheck = strCheck.replace(obj[int] + ",", "");
                }
            }
        });
    }
}

function cunfangjieguo(obj) {
    if (obj == "完成") {
        $("#dlType").css("display", "block");
    } else {
        $("#dlType").css("display", "none");
    }
}

function changeTypes(obj) {
    var i = 0;
    $(".type-radio").each(function () {
        if ($(this).attr("checked")) {
            i++;
        }
    });

    if ($(obj).find("input").is(":checked")) {
        $(obj).removeClass("span-checked");
        $(obj).find("input").attr("checked", false);
        var s = $(obj).find("input").val();
        $("#fangyuanyoushi").val($("#fangyuanyoushi").val().replace(s, ""));

    } else {
        if (i < 15) {
            $(obj).addClass("span-checked");
            $(obj).find("input").attr("checked", true);
            $("#fangyuanyoushi").val(
                $("#fangyuanyoushi").val() + "," + $(obj).find("input").val());
            i = i--;
        } else {
            $.jBox.tip("只能选择五个");
        }
    }

}

function chanageradio(obj) {
    var count = $("#radio" + obj).val();
    if (count == tt) {
        $("#zhifujine").val($("#zhifujinehidden").val());
        $("#fukuanfangshi").val($("#fangshis").val());
        $("#zhifuzhuangtai").val($("#zhuangtais").val());
    } else {
        $("#zhifujine").val("");
        $("#fukuanfangshi").val("");
        $("#zhifuzhuangtai").val("");
    }
    for (var int = 1; int < 4; int++) {
        if (int == obj) {
            $("#radio" + int).attr("checked", true);
            $("#radio" + int).parent().addClass(" span-checked");
            $("#rb_lx").val(count);
        } else {
            $("#radio" + int).attr("checked", false);
            $("#radio" + int).parent().removeClass("span-checked");
            $("#rb_lx").val(count);
        }
    }

    if (obj != null && obj != 3) {
        $("#div1").css("display", "block");
    } else {
        $("#div1").css("display", "none");
    }

}

/** 选择房源配置qs */
function changefangyuanpeizhi(obj) {
    var check = $(obj).find("input").is(":checked");
    if (check == false) {
        $(obj).addClass("span-checked");
        $(obj).find("input").attr("checked", true);
        $("#fangyuanpeizhi").val($("#fangyuanpeizhi").val() + "," + $(obj).find("input").val());
    } else {
        $(obj).removeClass("span-checked");
        $(obj).find("input").attr("checked", false);
        $("#fangyuanpeizhi").val($("#fangyuanpeizhi").val().replace($(obj).find("input").val(), ""));

    }
}

/**
 * 隐藏和显示信息跟进
 */
function messageFollowUp() {
    if ($(".messageList").is(":hidden")) {
        $(".messageList").slideDown(function () {
            $(".addButton-icon-add").hide();
            $(".addButton-icon-up").show();
            var h = $(document).height();
            $(document).scrollTop(h);
        });
    } else {
        $(".messageList").slideUp(function () {
            $(".addButton-icon-add").show();
            $(".addButton-icon-up").hide();
        });
    }

}

/**
 * 判断身份证并且判断性别
 *
 * @param ids
 */
function isCards(ids) {
    if ($(ids).prev().val() == "1") {
        $(ids).val($(ids).val().toUpperCase());
        if ($(ids).prev().val() == 1) {
            if (isIDCard($(ids).val())) {
                var sexType = $(ids).val().substring($(ids).val().length - 1, 1);
                if (sexType % 2 == 1) {
                    $("#sex").val("1");
                } else {
                    $("#sex").val("0");
                }
                $(ids).css("border", "1px solid #CCC");

                if (cardCode != $(ids).val()) {
                    $.ajax({
                        type: "POST",
                        url: "/customer/customerCard",
                        data: {
                            cardNum: $(ids).val()
                        },
                        dataType: "json",
                        success: function (result) {
                            if (result.message == "success") {
                                $(".alertMessage").hide();
                                $.ajax({
                                    type: "POST",
                                    url: "/dictionary/queryDistrictDictionary",
                                    data: {
                                        idCardNum: $(ids).val()
                                    },
                                    dataType: "json",
                                    success: function (rst) {
                                        if (rst.code != 200) {
                                            $("#idPlace").html(rst.msg);
                                        } else {
                                            $("#idPlace").html(rst.district_address);
                                            if (rst.sex % 2 == 0) {
                                                $("#sex").val(0);
                                            } else {
                                                $("#sex").val(1);
                                            }
                                        }
                                    }
                                });
                            } else {
                                $(".alertMessage").show();
                            }
                        }
                    });
                }

                // 发送请求
                $.ajax({
                    type: "POST",
                    url: "/customer/checkBlackListByCardNumPhone",
                    data: {
                        cc_cardNum: $(ids).val(),
                        phone: ""
                    },
                    dataType: "json",
                    success: function (result) {
                        if (result.isBlack == false) {
                            $(ids).focus();
                            swal("请注意，该客户为公司黑名单客户");
                            return;
                        } else {
                        }
                    }
                });
            } else {
                $(".alertMessage").hide();
                $(ids).css("border", "1px solid #E74C3C");
            }
        }

    } else {
        $(ids).css("border", "1px solid #CCC");
    }
}

/** 返回时间 2016-01-01 00:00*/
function returnTimeHourMin(time) {
    if (isEmpty(time)) {
        return "";
    }
    var t = new Date(time);
    var tf = function (i) {
        return (i < 10 ? '0' : '') + i
    };
    return "yyyy-MM-dd HH:mm".replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
        switch (a) {
            case 'yyyy':
                return tf(t.getFullYear());
                break;
            case 'MM':
                return tf(t.getMonth() + 1);
                break;
            case 'mm':
                return tf(t.getMinutes());
                break;
            case 'dd':
                return tf(t.getDate());
                break;
            case 'HH':
                return tf(t.getHours());
                break;
        }
    });
}

/**
 * 查询银行卡信息
 *
 * @param ids
 */
function bankMessage(ids) {
    if (!$(ids).find("input").is(':checked')) {
        var bankCode = $(ids).val().NoSpace();
        if (bankCode == "" || bankCode.length < 3) {
            $(ids).parent().parent().next().find("input").val("");
            $(ids).parent().parent().next().find("img").attr("src", "");
            $(ids).parent().parent().parent().prev().find(".bankTitle").text("银行卡");
        }
        /*if(bankCode.length >= 3 && bankCode.length <= 9){*/
        $.ajax({
            type: "POST",
            url: "/bank/bankMessage",
            data: {
                bankCode: bankCode,
            },
            dataType: "json",
            success: function (result) {
                if (result.bank != null) {
                    $(ids).parent().parent().parent().prev().find(".bankTitle").text(result.bank.bank_Name);
                    $(ids).parent().parent().next().find("input").val(result.bank.bank_CardType + "-" + result.bank.bank_CardName);
                    if (result.bank.bl_path == null) {
                        $(ids).parent().parent().next().find("img").attr("alt", result.bank.bank_Name);
                    } else {
                        $(ids).parent().parent().next().find("img").attr("src", result.bank.bl_path);
                    }
                    $(ids).parent().parent().next().show();
                } else {
                    $(ids).parent().parent().next().find("input").val("");
                    $(ids).parent().parent().next().find("img").attr("src", "");
                    $(ids).parent().parent().parent().prev().find(".bankTitle").text("银行卡");
                    $(ids).parent().parent().next().hide();
                }
            }
        });
        //	}
        /*if(bankCode.length > 9 || bankCode.length < 3){
         if(isBank(bankCode)){
         if($(ids).attr("class").indexOf("edit") > -1){
         $(ids).css("border","1px solid #ccc");
         }
         }else{
         $(ids).css("border","1px solid #E74C3C");
         }
         }*/
    }
}

/**
 * 判断银行卡号
 *
 * @returns {Boolean}
 */
function isBank(val) {
    var reg = /^[0-9]{16,19}$/; // 以19位数字开头，以19位数字结尾
    if (!reg.test(val)) {
        return false;
    } else {
        return true;
    }
}

//去掉空格
String.prototype.NoSpace = function () {
    return this.replace(/\s+/g, "");
}

//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}

/**
 * 文本框只能输入数字
 */
function keyPress() {
    var keyCode = event.keyCode;
    if ((keyCode >= 48 && keyCode <= 57)) {
        event.returnValue = true;
    } else {
        event.returnValue = false;
    }
}

function hrefClick(ids) {
    window.parent.href_mo($(ids).attr("data-type"), "房屋信息", "库存房源");
}

function hrefClickNo(ids) {
    window.parent.href_mo($(ids).attr("data-type"), "查看合同", "合同信息");
}

/**
 * 其他填写银行卡
 */
function bankAnther(ids) {
    if ($(ids).find("input").is(':checked')) {
        $(ids).parent().parent().next().hide();
        $(ids).parent().parent().next().next().show();
        $(ids).parent().parent().next().next().find(".bankMessage1").val("存折-存折");
    } else {
        $(ids).parent().parent().next().next().hide();
    }
}

/**
 * 其他识别银行
 *
 * @param ids
 */
function bankMessageTitle(ids) {
    $(ids).parent().parent().parent().parent().find(".bank_div_title .bankTitle").text($(ids).val());
}

/** 初始化物业名称*/
function initPropertyNameList(param) {
    var upn_id = returnNumber($("input[name=propertyInfo_id]").attr("data-uid"));
    if (param.length > 0) {
        // 物业定位
        getPropPosition(param, upn_id, param[0].upn_sid);
        // 遍历物业
        eachProperty(param, param[0].upn_sid, 0);
    }
    //
    position = '';
}

/** 初始化楼层房号*/
function initHouseFloorAddress(code) {
    var porp_name = $("select[name=porp_name]:last>option:selected").attr("data-code");
    if (isEmpty(code)) {
        porp_name = isEmpty(porp_name) ? "" : porp_name + "-";
    } else {
        porp_name = code + "-";
    }

    var hi_floor = returnValue($("input[name=hi_floor]").val()).trim();
    hi_floor = isEmpty(hi_floor) ? "" : hi_floor + "-";

    var hi_address = returnValue($("input[name=hi_address]").val()).trim();

    $("#house-info").html(returnValue($("input[name=propertyInfo_id]").val()) + porp_name + hi_floor + hi_address);
}

/**
 * 获取物业定位
 *
 * @param param 数组
 * @param id    物业编号
 * @param sid    超级编号
 */
function getPropPosition(param, id, sid) {
    if (id != sid) {
        $.each(param, function (index, data) {
            if (data.upn_id == id) {// 195
                position = data.upn_id + (isEmpty(position) ? "" : "-" + position);
                getPropPosition(param, data.upn_pid, sid);
            }
        });
    }
}

/** 遍历物业*/
function eachProperty(param, id, cycle) {
    var pos = returnNumber(position.split("-")[cycle]);

    var next_prop = $('.prop_cycle' + (cycle + 1));
    var html = (next_prop.length > 0 ? '' : '<select class="form-control prop_cycle' + cycle + ' selects" data-cycle="' + cycle + '" name="porp_name" style="margin-right: 12px;width: auto;min-width: 90px;">'),
        first_boo = true,
        first_id,
        isHaving = false;
    html += '<option value="" data-code="0" data-prop-id="0" selected>--请选择--</option>';
    $.each(param, function (index, data) {
        if (data.upn_pid == id) {
            if (pos != 0) {
                if (pos == data.upn_id) {
                    html += '<option value="' + data.upn_id + '" data-code="' + data.upn_code + '" data-prop-id="' + data.propertyInfo_Id + '" selected>' + data.upn_name + '</option>';
                    first_id = data.upn_id;
                } else {
                    html += '<option value="' + data.upn_id + '" data-code="' + data.upn_code + '" data-prop-id="' + data.propertyInfo_Id + '">' + data.upn_name + '</option>';
                }
            } else {
                if (first_boo) {
                    html += '<option value="' + data.upn_id + '" data-code="' + data.upn_code + '" data-prop-id="' + data.propertyInfo_Id + '">' + data.upn_name + '</option>';
                    first_boo = false;
                    first_id = data.upn_id;
                } else {
                    html += '<option value="' + data.upn_id + '" data-code="' + data.upn_code + '" data-prop-id="' + data.propertyInfo_Id + '">' + data.upn_name + '</option>';
                }
            }
            isHaving = true;
        }
    });
    if (isHaving) {
        if (next_prop.length > 0) {
            next_prop.html(html);
        } else {
            html += '</select>';
            $("#propertyInfo_idGroups").append(html);
        }
    }
    if (!isEmpty(first_id)) {
        eachProperty(param, first_id, cycle + 1);
    }
}

/** 选择群体qs */
function changeqt(obj) {
    var check = $(obj).find("input").is(":checked");
    if (check == false) {
        $(obj).addClass("span-checked");
        $(obj).find("input").attr("checked", true);
        $("#tuijianqunti").val($("#tuijianqunti").val() + "," + $(obj).find("input").val());
    } else {
        $(obj).removeClass("span-checked");
        $(obj).find("input").attr("checked", false);
        $("#tuijianqunti").val($("#tuijianqunti").val().replace($(obj).find("input").val(), ""));
    }
}

function checkTextLength(obj) {
    var ct = $("#" + obj).text().trim();
    $("#" + obj + "text").val(ct.length + "/100");
    $('#' + obj).bind('input propertychange', function () {
        if ($(this).val().length > 100) {
            $("#" + obj).val($("#" + obj).val().substring(0, 100));
            $("#" + obj + "text").val("100/100");
        } else {
            $("#" + obj + "text").val($(this).val().length + "/100");
        }
    });
}

/**
 * 房源录入信息提交
 * @param obj
 * @returns
 */
function submit1(obj) {

    var data = {};
    var houseIntention = {};

    houseIntention.phi_user = $("[name=phi_user]").val();
    houseIntention.phi_phone = $("[name=useriphone]").val();
    houseIntention.phi_user_sex = $("[name=phi_user_sex]:checked").val();
    houseIntention.propertyInfo_Id = $("[name=propertyInfo_id]").attr("data-id");
    houseIntention.phi_floor = $("[name=phi_floors]").val();
    houseIntention.phi_address = $("[name=phi_floors]").val() + "-" + $("[name=phi_address]").val();
    ;
    houseIntention.hi_houseS = $("[name=hi_houseS]").val();
    houseIntention.hi_houseT = $("[name=hi_houseT]").val();
    houseIntention.hi_houseW = $("[name=hi_houseW]").val();
    houseIntention.phi_money = $("[name=phi_money]").val();
    houseIntention.phi_source = $("#fangyuanlaiyuan").val();
    houseIntention.hi_measure = $("[name=hi_measure]").val();
    houseIntention.hi_situation = $("[name=hi_situation]").val();
    houseIntention.phi_style = $("[name=phi_style]").val();
    houseIntention.buildTypes = $("[name=buildTypes]").val();
    houseIntention.phi_price = $("[name=phi_price]").val();
    houseIntention.his_id = $("#housepinpai").val();

    var hi_function = "";
    $("#fangyuanyoushigenjin [name=hi_function]:checked").each(function () {
        hi_function += $(this).val() + ",";
    });
    houseIntention.hi_function = hi_function.substring(0, (hi_function.length - 1));

    var recommendGroup_Id = "";
    $("#recommendGroupDiv1 [name=recommendGroup_Id]:checked").each(function () {
        recommendGroup_Id += $(this).val() + ",";
    });
    houseIntention.RecommendGroup_Id = recommendGroup_Id;

    var hi_project = "";
    $("#houseProject [name=hi_project]:checked").each(function () {
        hi_project += $(this).val() + ",";
    });

    houseIntention.hi_project = hi_project;

    houseIntention.hi_content = $("[name=hi_content]").val();

    // 房源图片
    var img_path = "";
    var imagenum = 0;
    $("#image-upload-box .image-item-img").each(function () {
        img_path += $(this).attr("src") + ",";
        imagenum += 1;
    });
    if (imagenum == null || imagenum == "") {
        imagenum = 0;
    }
    if (img_path != "") {
        data.img_path = JSON.stringify(img_path);
    }

    houseIntention.phi_rentDay = $("[name=phi_rentDay]").val();
    houseIntention.phi_type = $("[name=phi_type]").val();
    houseIntention.imagenum = imagenum;
    houseIntention.cc_code = getUrlParam("cc_code");

    data.houseIntention = JSON.stringify(houseIntention);

    if ("完成" == $("[name=phi_type]").val()) {

        var reserveBill = {};

        reserveBill.rb_playType = $("[name=rb_playType]").val();
        //	reserveBill.rb_houseNum = // 房源编号
        reserveBill.rb_name = $("[name=phi_user]").val();//
        reserveBill.rb_phone = $("[name=useriphone]").val();
        reserveBill.rb_money = $("[name=rb_money]").val();
        reserveBill.playType = $("[name=rb_money]").val();

        data.reserveBill = JSON.stringify(reserveBill);
    }

    // 客户编码
    data.cc_code = JSON.stringify(getUrlParam("cc_code"));

    $.ajax({
        type: "POST",
        url: "/intention/addCustomerHouse",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $("#record-table-body").html('<tr><td colspan="7"><div class="loading"></div></td></tr>');
        }
    }).done(function (result) {
        if (null != result && result.code != undefined && result.code != 200) {
            $.jBox.tip(result.msg, "error");
            return;
        }

        // 更新意向客户状态
        $.ajax({
            type: "POST",
            url: "/customer/updCustomerIntentionByCode",
            data: {
                cc_code: $("[name=cc_code]").val(),
                follow_status: 3 //实勘完成
            },
            dataType: "json",
            contentType: "application/json; charset=utf-8"
        }).done(function (result) {
            if (result.code != undefined && result.code != 200) {
                $.jBox.tip(result.msg, "error");
                return;
            }
            swal({
                    title: "点击继续",
                    text: "房源录入成功!",
                    type: "success",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    showConfirmButton: true,
                    showCancelButton: false
                },
                function (isConfirm) {
                    if (isConfirm) {
                        $(".leftTile-menu .nav-menu").eq(0).click();
                        window.location.reload();
                    }
                });
        });
    });

}

//支付方式
function housePayType(ids) {
    var money = parseFloat($("[name=hi_price]").val());
    if ($(ids).val() == "月付") {
        $("[name=hi_price]").val(money);
        $("[name=hi_price]").attr("data-type", money);
    } else if ($(ids).val() == "季付") {
        $("[name=hi_price]").val(money + 50);
        $("[name=hi_price]").attr("data-type", money + 50);
    } else if ($(ids).val() == "半年付") {
        $("[name=hi_price]").val(moneyt(parseInt(money * (1 - (3.0 / 100)) / 10) * 10));
        $("[name=hi_price]").attr("data-type", moneyt(parseInt(money * (1 - (3.0 / 100)) / 10) * 10));
    } else {
        $("[name=hi_price]").val(moneyt(parseInt(money * (1 - (6.0 / 100)) / 10) * 10));
        $("[name=hi_price]").attr("data-type", moneyt(parseInt(money * (1 - (6.0 / 100)) / 10) * 10));
    }
    $("#dMoney").val(moneys($("[name=hi_price]").val(), $("[name=houseDay]").val()));
    $("#dMoney").attr("data-type", moneys($("[name=hi_price]").val(), $("[name=houseDay]").val()));
}

/**定金算法:日租金 * 2 * 天数 去掉小数点 个位数抹掉 十位数小于5大于0整为5 大于五进一位十位数为0*/
function moneyt(money) {
    /*=========================================*/
    var moneyA = money / 100;

    var moneystr = moneyA.toString().substring(moneyA.toString().indexOf("."), moneyA.toString().length);
    if (0 < parseFloat(moneystr) && parseFloat(moneystr) <= 0.25) {
        money = parseFloat(parseInt(moneyA) * 100);
    } else if (moneystr == ".0") {
        money = moneyA * 100;
    } else if (0.25 < parseFloat(moneystr) && parseFloat(moneystr) < 0.75) {
        money = parseFloat(parseInt(moneyA) * 100 + 50);
    } else if (0.75 <= parseFloat(moneystr)) {
        money = parseFloat(parseInt(moneyA) * 100 + 100);
    } else {
        money = Math.round(moneyA) * 100;
    }
    return money
    /*=========================================*/
}

/**定金算法:日租金 * 2 * 天数 去掉小数点 个位数抹掉 十位数小于5大于0整为5 大于五进一位十位数为0*/
function moneys(money, day) {
    /*=========================================*/
    var moneyA = money / 30 * day * 2 / 100;

    var moneystr = moneyA.toString().substring(moneyA.toString().indexOf("."), moneyA.toString().length);
    if (0 < parseFloat(moneystr) && parseFloat(moneystr) <= 0.25) {
        money = parseFloat(parseInt(moneyA) * 100);
    } else if (moneystr == ".0") {
        money = moneyA * 100;
    } else if (0.25 < parseFloat(moneystr) && parseFloat(moneystr) < 0.75) {
        money = parseFloat(parseInt(moneyA) * 100 + 60);
    } else if (0.75 <= parseFloat(moneystr)) {
        money = parseFloat(parseInt(moneyA) * 100 + 100);
    } else {
        money = Math.round(moneyA) * 100;
    }
    return money
    /*=========================================*/
}

//跟进客户
function genSeeing(ids) {
    var _parent = $(ids).parent().parent();
    if ($(ids).val() == "1") {
        $(_parent).next().show();
        $(".payMoney").show();
        $("#hs_type").html('<option value="定金">定金</option><option value="合同">合同</option>');
    } else {
        $(_parent).next().show();
        $(".payMoney").hide();
        $("#hs_type").html('<option value="跟进">跟进</option><option value="放弃">放弃</option>');
    }
}

//支付类型
function payType(ids) {
    if ($(ids).val() == "定金") {
        $(".payMoney").show();
    } else {
        $(".payMoney").hide();
    }
}

/**
 * 提交带看
 */
function submitHouseSeeing() {
    if ($("#hs_state").val() == "1") {
        if ($("#hs_type").val() == "合同") {
            submitHT();
        } else {
            submitDJ();
        }
    } else {
        submitHT();
    }

    // 更新意向客户状态
    $.ajax({
        type: "POST",
        url: "/customer/updCustomerIntentionByCode",
        data: {
            cc_code: $("[name=cc_code]").val(),
            follow_status: 2 //带看完成
        },
        dataType: "json",
        contentType: "application/json; charset=utf-8"
    }).done(function (result) {
        if (result.code != 200) {
            $.jBox.tip(result.msg, "error");
            return;
        }
        //		$.jBox.tip("修改成功", "success");
    });
}

function submitDJ() {
    var moneys = 0;
    var phone = $("[name=useriphone]").eq(1).val();
    if (phone == "") {
        $.jBox.tip("电话号码不能为空", "error");
        return;
    }
    var name = $("[name=phi_user]").eq(1).val();
    if (name == "") {
        $.jBox.tip("姓名不能为空", "error");
        return;
    }
    if (!isPhone(phone)) {
        $.jBox.tip("请填写正确电话号码", "error");
        return;
    }
    var money = $("#dMoney").val();
    if (money == "") {
        $.jBox.tip("金额不能为空", "error");
        return;
    }
    if (parseFloat($("#dMoney").val()) < parseFloat($("#dMoney").attr("data-type"))) {
        $.jBox.tip("输入金额不能小于系统定金", "error");
        $("#dMoney").focus();
        return;
    }
    if (parseFloat($("[name=hi_price]").val()) < parseFloat($("[name=hi_price]").attr("data-type"))) {
        $.jBox.tip("输入出房价不能小于最低价格", "error");
        $("[name=hi_price]").focus();
        return;
    }
    if ($("#contractDay").val() == "") {
        $.jBox.tip("约定租期不能为空", "error");
        return;
    }
    var numberCard = $("#numberCard").val();
    if ($("#numberCard").val() == "") {
        $.jBox.tip("身份证号不能为空!", "error");
        return;
    }
    if (!isIDCard(numberCard)) {
        $.jBox.tip("证件号校验错误!", "error");
        $("#numberCard").focus();
        return;
    }

    var payType = $("[name=payType]").val();
    if ("" == payType) {
        $.jBox.tip("请选择支付方式!", "error");
        $("[name=payType]").focus();
        return;
    }
    moneys = (parseFloat($("[name=hi_price]").val()) * (parseInt($("#contractDay").val()) + 2) + 600) * 20 / 100;
    if (moneys < parseFloat($("[name=hi_price]").val())) {
        moneys = parseFloat($("[name=hi_price]").val());
    }
    if (moneys < parseFloat($("#money").val())) {
        alert("输入金额不能大于总租金的20%", "error");
        $("#money").focus();
        return;
    }
    var hi_code = $("#hi_code").val();
    var house_address = $("[name=houseSorceId]").val();
    var type = $("#payType").val();
    var hs_content = $("[name=hs_content]").val();
    var hs_type = $("#hs_type").val();

    $.ajax({
        type: "POST",
        //	    url: "/financeManage/relatedOrdePayAPPAli",
        url: "/customer/addCustomerFollow",
        data: {
            data: JSON.stringify({
                hi_code: hi_code,
                cc_code: getUrlParam("cc_code"),
                cc_name: name,
                cc_phone: phone,
                cc_card: $("#numberCard").val(),
                payMoney: money,
                payWay: type,
                hs_content: hs_content + hs_type,
                hs_payType: $("#hs_payType").val(),
                hs_day: $("[name=houseDay]").val(),
                hs_contractDay: $("#contractDay").val(),
                em_id: $("#em_id").val()
            })
        },
        dataType: "json",
        beforeSend: function () {
            $.jBox.tip("数据加载中..", "loading");
        },
        success: function (result) {
            if (result.code != 200) {
                $.jBox.tip(result.msg, "error");
                return;
            }
            $.jBox.tip("生成二维码中..", "success");
            showCode(result.data, type, house_address, money, getUrlParam("cc_code"));
            //	    	$.jBox.tip("等待扫码支付...", "loading");
            initSeeingRecord();
        }
    });
}

// 二维码展示
function showCode(resultObj, type, house_address, money, cc_code) {
    // 二维码展示
    $('.cd-popup3').show();
    //打开窗口
    $('.cd-popup3').addClass('is-visible3');

    var cycle = 0;

    if (type == "支付宝") {
        //		$(".payImage").attr("src","/resources/image/appPage/alipay.png");
        //		$(".payImage").next().text("支付宝扫码支付");
        $(".code-bottom").css("background-color", "#0AE");
        $(".code-bottom").css("color", "#FFF");
    } else {
        //		$(".payImage").attr("src","/resources/image/appPage/wxpay.png");
        //		$(".payImage").next().text("微信扫码支付");
        $(".code-bottom").css("background-color", "#00c800");
        $(".code-bottom").css("color", "#FFF");
    }

    $(".code-title").text(house_address);
    if (getQueryString("cycle") != null) {
        cycle = getQueryString("cycle");
    }

    $(".code-money").text("￥" + parseFloat(money).toFixed(2));
    var options = {
        render: "canvas",
        ecLevel: 'H',//识别度
        fill: '#000',//二维码颜色
        background: '#ffffff',//背景颜色
        quiet: 2,//边距
        width: 170,//宽度
        height: 170,
        text: resultObj.qr_code,//二维码内容
        //中间logo start
        mode: 4,
        mSize: 11 * 0.01,
        mPosX: 50 * 0.01,
        mPosY: 50 * 0.01,
        src: "/resources/image/10.png",//logo图片
        //中间logo end
        label: 'jQuery.qrcode',
        fontname: 'Ubuntu',
        fontcolor: '#ff9818',
    };
    $('#qrcode').empty().qrcode(options);
    $('#qrcode').append("<img src='/resources/image/appPage/LOGO00.png' style='width: 35px; height: 35px;position: absolute;left: 45%; top: 45%;' />")

    var interva = setInterval(function () {
        $.ajax({
            type: "POST",
            url: "/financeManage/responsePayResult",
            data: {
                trade_code: resultObj.trade_code
            },
            dataType: "json",
            success: function (result) {
                // 交易
                if (result.code == 110) {

                }
                // 等待付款
                if (result.code == 201) {

                }
                // 交易完成
                if (result.code == 200) {
                    $(".bottom-font").html("<div class='paySuccess'><label style='float:left;'>支付成功</label></div>");
                    $("#qrcode").html("<img src='/resources/image/appPage/dui.png' style='width: 80px; height:80px;'>");
                    window.clearInterval(interva);
                    setTimeout(function () {
                        // 关闭弹出层
                        $(".cd-popup3").removeClass('is-visible3');

                        // 更新带看记录
                        $.ajax({
                            type: "POST",
                            url: "/customer/updHouseSeeingRecordByCode",
                            data: {
                                cc_code: cc_code
                            },
                            dataType: "json",
                            success: function (result) {
                                swal({
                                        title: "点击继续",
                                        text: "客户定金支付成功!",
                                        type: "success",
                                        showCancelButton: true,
                                        confirmButtonColor: "#DD6B55",
                                        showConfirmButton: true,
                                        showCancelButton: false
                                    },
                                    function (isConfirm) {
                                        if (isConfirm) {
                                            initSeeingRecord();
                                            window.location.reload();
                                            $(".leftTile-menu .nav-menu").eq(3).click();
                                        }
                                    });
                                // 刷新带看记录
                                // initSeeingRecord();
                            }
                        });
                    }, 3000);
                    //		    		window.location.reload();
                    $(".leftTile-menu .nav-menu").eq(3).click();

                }
            }
        });
    }, 1000);
}

function submitHT() {
    // 获取数据
    var cc_name = $("[name=phi_user]").eq(1).val();
    if (cc_name == "") {
        $.jBox.tip("客户姓名不能为空");
        return;
    }
    var ccp_phone = $("[name=useriphone]").eq(1).val();
    if (ccp_phone == "") {
        $.jBox.tip("客户电话不能为空");
        return;
    }
    if (parseFloat($("[name=hi_price]").val()) < parseFloat($("[name=hi_price]").attr("data-type"))) {
        $.jBox.tip("输入出房价不能小于最低价格");
        $("[name=hi_price]").focus();
        return;
    }
    if (!isPhone(ccp_phone)) {
        $.jBox.tip("请填写正确电话号码");
        return;
    }
    var hs_content = $("[name=hs_content]").val();
    var hs_state = $("#hs_state").val();
    var hs_type = "";
    if ($("#hs_type").val() == "合同") {
        hs_type = "签订合同";
    } else if ($("#hs_type").val() == "跟进") {
        hs_type = "跟进中";
    } else if ($("#hs_type").val() == "放弃") {
        hs_type = "放弃跟进";
    }
    if (hs_content != "") {
        hs_content = hs_type + "[" + hs_content + "]";
    } else {
        hs_content = hs_type
    }
    // 发送请求
    $.ajax({
        type: "POST",
        url: "/customer/addHouseSeeing",
        data: {
            cc_code: getUrlParam("cc_code"),
            cc_name: cc_name,
            ccp_phone: ccp_phone,
            hs_content: hs_content,
            hs_state: hs_state,
            hi_code: $("#hi_code").val(),
            em_id: $("#em_id").val(),
            hs_day: $("[name=houseDay]").val(),
            hs_payType: $("#hs_payType").val()
        },
        dataType: "json",
        error: function (e) {
            $.jBox.tip("网络异常，请刷新重试");
        },
        success: function (result) {
            if (result.msg == "success") {
                swal({
                        title: "点击继续",
                        text: "客户带看成功!",
                        type: "success",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        showConfirmButton: true,
                        showCancelButton: false
                    },
                    function (isConfirm) {
                        if (isConfirm) {
                            initSeeingRecord();
                            window.location.reload();
                            $(".leftTile-menu .nav-menu").eq(3).click();
                        }
                    });
            } else {
                swal("已经带看该客户了");
            }
        }
    });
}

/**
 * 初始化客户带看记录
 * @param cc_code
 * @returns
 */
function initSeeingRecord() {
    // 发送请求
    $.ajax({
        type: "POST",
        url: "/customer/queryHouseSeeingListByCode",
        data: {
            cc_code: returnValue(getUrlParam("cc_code")),
            pageNo: returnValue($("#record-pageNo_see").val()),
            pageSize: 15
        },
        dataType: "json",
        beforeSend: function () {
            $("#record-table-body_see").html('<tr><td colspan="7"><div class="loading"></div></td></tr>');
        }
    }).done(function (result) {
        if (result.code != 200) {
            return;
        }
        $("#record-table-body_see").empty();

        if (result.data.list.length == 0) {
            $("#record-table-body_see").html('<tr><td colspan="7" style="text-align: center;line-height: 120px;">没有记录</td></tr>');
            return;
        }
        $.each(result.data.list, function (index, data) {
            // 数据项
            var html = '';
            html += '<tr class="record-visible-tr' + returnValue(data.cl_id) + '" style="background: ' + (index % 2 == 0 ? "#f5f8fa" : "#ffffff") + ';">';
            html += '	<td style="width: 40px;text-align: center;">' + (index + 1) + '</td>';
            //			html += '	<td style="width: 97px;text-align: left;">'+ returnValue(data.contractObject_No) +'</td>';
            html += '	<td class="next" style="width: 250px;text-align: center;">' + data.house_address + '</td>';
            //			html += '	<td onclick="displayRecordTr(\''+ returnValue(data.hs_id) +'\')" style="text-align: left;cursor: pointer;" title="查看更多">';
            //			html += '		<div class="record-td-content-hint" style="'+ (isEmpty(data.userCustomerLogAttachmentList)?"background: #c3c3c3;":"") +'">附</div>';
            //			html += '		<div class="record-td-content-main" style="width: 390px;">'+ returnValue(data.cl_content) + '</div>';
            //			html += '	</td>';
            html += '	<td style="width:auto;text-align: left;">' + returnValue(data.hs_content) + '</td>';
            html += '	<td style="width: 75px;text-align: center;">' + returnValue(data.hs_state == 1 ? "成功" : "失败") + '</td>'; // <a href="javascript:;" class="hint" onclick="eidtImplRecord(\''+ returnValue(data.cir_id) +'\')">编辑</a>
            html += '	<td style="width: 80px;text-align: center;">' + returnValue(data.em_name) + '</td>';
            html += '	<td style="width: 153px;text-align: center;">' + returnTime(data.hs_createTime) + '</td>';
            html += '</tr>';
            // 隐藏操作项
            html += '<tr class="record-hidden-tr' + returnValue(data.cl_id) + '" style="background: ' + (index % 2 == 0 ? "#f5f8fa" : "#ffffff") + ';">';
            html += '</tr>';
            $("#record-table-body_see").append(html);
            $('.record-visible-tr' + returnValue(data.cl_id)).data("data", data);
        });
        $("#record-table-box_see").perfectScrollbar();
        $("#record-table-box_see").perfectScrollbar("update");

        $("#record-totalPage_see").text(result.data.totalPage);
        $("#record-totalRecords_see").text(result.data.totalRecords);

    });
}

/**
 * 客户评论提交
 * @returns
 */
function submitEvaluate() {
    // 客户星评等级
    var star_level = $("span.fenshu").text();
    if (star_level == null || star_level == undefined || star_level == "") {
        $.jBox.tip("请给客户评级", "warn");
        return;
    }
    // 客户评论
    var customer_comment = $("[name=customer_comment]").val();
    // 发送请求
    $.ajax({
        type: "POST",
        url: "/customer/updCustomerExtendInfo",
        data: {
            cc_code: returnValue(getUrlParam("cc_code")),
            star_level: returnFloat(star_level),
            customer_comment: customer_comment
        },
        dataType: "json",
        success: function (result) {
            if (result.msg == "success") {
                swal("客户评价成功");
            } else if (result.code == 100) {
                swal(result.msg);
                return;
            }
        }
    });
}

// 黑名单检索
function checkBlackList(cardNum, phone) {

    // 发送请求
    $.ajax({
        type: "POST",
        url: "/customer/checkBlackListByCardNumPhone",
        data: {
            cc_cardNum: cardNum,
            phone: phone
        },
        dataType: "json",
        success: function (result) {
            if (result.isBlack == false) {
                $(ids).focus();
                swal("请注意，该客户为公司黑名单客户");
                return;
            } else {
            }
        }
    });
}

// 客户日志tab切换
function clickLog(ids) {
    $(".box-nav a").attr("class", "nav-tab")
    $(ids).attr("class", "nav-tab nav-tab-focus");
    if ($(ids).text() == "日志记录") {
        $("#customerLog1").show();
        $("#customerLog2").hide();
    } else if ($(ids).text() == "短信记录") {
        $("#customerLog1").hide();
        $("#customerLog2").show();
    }
}

/** 约定租期 */
function contractDay(ids) {
    var value = $(ids).val();
    $(ids).val(value.replace(/[^\d]/g, ""));
    if (value.length > 2) {
        $(ids).val(value.substring(0, 2));
    }
    if (parseInt(value) <= 3) {
        swal("短租,请注意出房价格");
    }
}

// 计算定金
function setDMoney(ids) {
    var value = $(ids).val();
    $("#dMoney").val(moneys($("[name=hi_price]").val(), $("[name=houseDay]").val()));
    $("#dMoney").attr("data-type", moneys($("[name=hi_price]").val(), $("[name=houseDay]").val()));
}

/**
 * 初始化权限
 */
function init_power() {

    $.ajax({
        type: "POST",
        url: "/user/userJurisdiction",
        data: {
            url: window.location.pathname,
            ucps_type: 3
        },
        dataType: "json"
    }).done(function (result) {
        if (result == null || result.menuLists == null || result.menuLists.length == 0) {
            $("#power1").empty();
            $("center button").hide();
            $(".date-content-list").find("button").attr("disabled", "disabled");
            return;
        }

        $("center button").show();
        $.each(result.menuLists, function (index, data) {
            $("#power1").append('<button onclick="' + data.ucps_url + '">' + data.ucps_name + '</button>');
        });

    });
}

/**
 * 修改
 */
function updateCustomer() {
    $("#main-box input,select").removeAttr("disabled");
    $("#main-box .addButton-icon").show();
    $("#main-box .bank_div .fa-minus-square").show();
    $("img[name=CD1]").after('<span class="images-box-img-delete" data-type="CD1" data-del-url="/customer/deleteImage" style="display: none;">删除</span>');
    $("img[name=CD2]").after('<span class="images-box-img-delete" data-type="CD2" data-del-url="/customer/deleteImage" style="display: none;">删除</span>');
}

/**
 * 编辑
 */
function editCustomer() {
    $("#main-box #moreInfo input,select").removeAttr("disabled");
    $("#main-box #linkManInfo input,select").removeAttr("disabled");
    $(".customerType .common-borderbox input[type=checkbox]").removeAttr("disabled");
    $("#main-box .addButton-icon").show();
    $("#main-box .bank_div .fa-minus-square").show();
}

/**
 * 添加
 */
function addCustomer() {
    $("#main-box .addButton-icon").show();
}

function initInterface() {
    $("#main-box input,select").attr("disabled", "disabled");
    $("img[name=CD1]").next().remove();
    $("img[name=CD2]").next().remove();
    $("#main-box .addButton-icon").hide();
    $("#main-box .bank_div .fa-minus-square").hide();
}

function checkCardPlace(obj) {
    $.ajax({
        type: "POST",
        url: "/dictionary/queryDistrictDictionary",
        data: {
            idCardNum: $(obj).val()
        },
        dataType: "json",
        success: function (rst) {
            if (rst.code != 200) {
                $("#numberCardPlace").html(rst.msg);
            } else {
                $("#numberCardPlace").html(rst.district_address);
            }
        }
    });
}

function formatMsgType(param) {
    var msg_type = "";
    switch (returnNumber(param)) {
        case 1:
            msg_type = "验证短信";
            break;
        case 2:
            msg_type = "通知短信";
            break;
        case 3:
            msg_type = "交易短信";
            break;
        case 4:
            msg_type = "祝福短信";
            break;
        case 5:
            msg_type = "营销短信";
            break;
        case 6:
            msg_type = "其他短信";
            break;
    }
    return msg_type;
}