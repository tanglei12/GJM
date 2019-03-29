var selectServe = null;
var IMG_LIMIT = 5;
var APPLY_TYPE_1101 = 1101;
var APPLY_TYPE_1102 = 1102;
$(function () {
    step();// 步骤指示
//	showDesc();
//	uploadPic();
//	showStatePic();
//	propertychange();
    alert(2);

    $(".money").bind("input propertychange", function () {
        if (/[^0-9.]/g.test($(this).val())) {
            $(this).val("");
        }
        var sum = 0;
        $(".money").each(function () {
            var val = $(this).val();
            if (!isEmpty(val)) {
                sum += parseInt($(this).val());
            }
        });
        $("#moneyTotal").val(sum);
    });

    $("#service-type").change(function () {
        $.ajax({
            type: "POST",
            url: "/service/changeType",
            data: {
                typeId: $(this).val()
            },
            dataType: "json"
        }).done(function (result) {
            if (result.code == 200) {
                $("#type-content").empty();
                $.each(result.data, function (index, data) {
                    $("#type-content").append('<option value="' + data.st_id + '">' + data.st_name + '</option>');
                });
            } else {

            }
        });
    });
    /** 表单验证*/
    $("#service-from").validationEngine();
    /** 表单验证*/
    $("#billform").validationEngine();
    /** */
    $("#apply-type").change(function () {
        var $thisVal = $(this).val();
        if (APPLY_TYPE_1101 == $thisVal) {
            $("#sgin-info").hide();
        }
        if (APPLY_TYPE_1102 == $thisVal) {
            $("#sgin-info").show();
        }

    });

});

function step() {
    // 根据jQuery选择器找到需要加载ystep的容器
    // loadStep 方法可以初始化ystep
    $("#main-box-step").loadStep({
        // ystep的外观大小
        // 可选值：small,large
        size: "large",
        // ystep配色方案
        // 可选值：green,blue
        color: "blue",
        // ystep中包含的步骤
        steps: [{
            // 步骤名称
            title: "服务申请",
            // 步骤内容(鼠标移动到本步骤节点时，会提示该内容)
            content: ""
        }, {
            title: "服务受理",
            content: ""
        }, {
            title: "业务处理",
            content: ""
        }, {
            title: "客服回访",
            content: ""
        }, {
            title: "完成",
            content: ""
        }]
    });
    $("#main-box-step").setStep(4);
}

/***/
function propertychange() {
    $("#houseInfo").bind("input propertychange", function () {
        $(this).removeData("data");
        $.ajax({
            type: "POST",
            url: "/queryHouseInfo",
            data: {
                param: $(this).val(),
                type: $("#conid").attr("data-value")
            },
            dataType: "json"
        }).done(function (result) {
            if (result.code == 200) {
                var li = '';
                $.each(result.data, function (index, data) {
                    li +=
                        '<tr class="item-li" onclick="setToInput(this)">' +
                        '<td class="query-item" title="房屋编码"><input type="hidden" value="' + data.hi_id + '"/>' + data.hi_code + '</td>' +
                        '<td class="query-item" title="房东姓名">' + data.hi_peopleName + '</td>' +
                        '<td class="query-item" title="房屋产权地址">' + data.hi_address + '</td>' +
                        '</tr>';
                });
                if (result.data.length > 0) {
                    $("#queryList").empty().html('<table>' + li + '</table>').show();
                } else {
                    $("#queryList").hide().empty();
                }
            } else {
                $("#queryList").empty().html(result.msg);
            }
        });
    }).keyup(function (event) {
        var $this = $(this);
        var $list = $('#queryList');
        var $li = $('#queryList .item-li');
        //上键
        if (event.keyCode == 40) {
            eindex++;
            if (eindex >= $li.length) {
                eindex = 0;
            }
            setEmailLi(eindex);
            //下键
        } else if (event.keyCode == 38) {
            eindex--;
            if (eindex < 0) {
                eindex = $li.length - 1;
            }
            setEmailLi(eindex);
            //回车键
        } else if (event.keyCode == 13) {
            if (eindex >= 0) {
                $this.val($li.eq(eindex).children(".query-item").eq(2).text());
                $("#houseId").val($li.eq(eindex).find(":hidden").val());
            }
        } else {
            eindex = -1;
            //init($this);
        }
        //如果在表单中，防止回车提交
    }).keydown(function (event) {
        if (event.keyCode == 13) {
            return false;
        }
    });
}

/** 提交受理*/
function submit() {
    $("#labor-msg").empty();
    $("#emid-msg").empty();
    var laborVal = $("#mdg_labor_cost").val();
    if (isEmpty(laborVal)) {
        $("#labor-msg").html("<label style='color:red;'>请填写人工费用</label>");
        return;
    }
    var emIdVal = $(".type-radio:radio[name='em_id']:checked").val();
    if (isEmpty(emIdVal)) {
        $("#emid-msg").html("<label style='color:red;'>请选择派工人员</label>");
        return;
    }
    $.ajax({
        type: "POST",
        url: "/serve/addDispatching",
        data: {
            md_id: $("#md_id").val(),
            mdg_labor_cost: $("#mdg_labor_cost").val(),
            mdg_mat_cost: $("#mdg_mat_cost").val(),
            mdg_other_cost: $("#mdg_other_cost").val(),
            mdg_user_cost: $("#mdg_user_cost").val(),
            em_id: emIdVal
        },
        dataType: "json"
    }).done(function (result) {
        if (result.code == 200) {
            window.location.reload();
        } else {
            alert(result.msg);
        }
    });
}

/** 完成回访*/
function okVisit() {
    $.ajax({
        type: "POST",
        url: "/serve/completeVisit",
        data: {
            md_id: $("#md_id").val()
        },
        dataType: "json"
    }).done(function (result) {
        if (result.code == 200) {
            window.location.reload();
        } else {
            alert(result.msg);
        }
    });
}

/** 接单*/
function transfers() {
    $("#time-msg").empty();
    var openTime = $("#openTime").val();
    if (isEmpty(openTime)) {
        $("#time-msg").html("<label style='color:red;'>请选择联系客户时间</label>");
        return;
    }
    var endTime = $("#endTime").val();
    if (isEmpty(endTime)) {
        $("#time-msg").html("<label style='color:red;'>请选择预计结束时间</label>");
        return;
    }
    $.ajax({
        type: "POST",
        url: "/serve/addTracks",
        data: {
            md_id: $("#md_id").val(),
            openTime: openTime,
            endTime: endTime,
            mtk_state: $("#mtk_state").val(),
            mtk_spe_cir: $("#mtk_spe_cir").val(),
            imgs: $("input[name='servicePic']").val()
        },
        dataType: "json"
    }).done(function (result) {
        if (result.code == 200) {
            window.location.reload();
        } else {
            alert(result.msg);
        }
    });
}

/** 上传图片 */
function uploadPic() {
    var len = $(".img-box").length;
    $("#file-tisp").text(len);
    $("#uploadfile").uploadify({
        'uploader': '/serve/fileUpload',
        'buttonText': '请选择图片',
        'swf': '../resources/common/uploadify/img/uploadify.swf',
        'fileTypeExts': '*.gif;*.jpg;*.bmp;*.jpeg;*.png',
        'fileTypeDesc': '*.gif;*.jpg;*.bmp;*.jpeg;*.png',
        'method': 'POST',
        'width': 98,
        'height': 98,
        'dataType': 'json',
        'formData': {
            type: "WTS"
        },
        'onInit': function () {
            $("#uploadfile-queue").remove();
        },//隐藏进度条
        'onUploadStart': function () {
            $("#uploadfile").append('<div id="img-loading"><i></i></div>');
        },
        'onUploadSuccess': function (file, result, response) {
            var result = eval('(' + result + ')');
            if (result.code == 200) {
                var $file = $("#uploadfile");
                $.each(result.data, function (index, data) {
                    $file.before(
                        "<div class='img-box'>" +
                        "<input type='hidden' name='servicePic' value='" + result.data + "'>" +
                        "<img class='img-img' src='" + result.data + "' width='100' height='100' style='cursor:pointer;' />" +
                        "<span class='img-mark'></span>" +
                        "<span class='img-title' onclick='delfile(this,\"" + result.data + "\")' >删除</span>" +
                        "</div>");
                    var newLen = $(".img-box").length;
                    $("#file-tisp").text(newLen);
                    if (newLen == IMG_LIMIT) {
                        $file.hide();
                    }
                    $file.find("#img-loading").remove();
                });
            } else {
                alert(result.msg);
            }
        }
    });
}

/** 删除图片 */
function delfile(obj, src) {
    var $this = $(obj);
    var $file = $("#uploadfile");
    var $tisp = $("#file-tisp");
    $(obj).parent(".img-box").hide();
    $.ajax({
        type: "POST",
        url: "/serve/deleteImage",
        data: "df=" + src,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        async: true,
        success: function (result) {
            if (result.code == 200) {
                $file.show();
                $this.parent(".img-box").remove();
                var newLen = $(".img-box").length;
                $tisp.text(newLen);
                if (newLen < 5) {
                    $file.show();
                    $("#fczFileBox").append('<input type="file" name="fczFile" id="fczFile" class="input-file"/>');
                    uploadPic();
                }
            }
        }
    });
}

/** 显示和隐藏上传图片*/
function showStatePic() {
    var state = $("#mtk_state").val();
    if (state == "yes") {
        $("#upload").show();
    } else {
        $("#upload").hide();
    }
}

function changeType(obj) {
    $(".type-label").removeClass("span-checked");
    $(obj).addClass("span-checked");
}

function setEmailLi(index) {
    var $li = $('#queryList .item-li');
    $li.removeClass('item-hover').eq(index).addClass('item-hover');
//	$("#houseInfo").val($li.eq(index).children(".query-item").eq(2).text());
//	$("#houseId").val($li.eq(index).find(":hidden").val());
}

function setToInput(obj) {
    $('#houseInfo').val($(obj).children(".query-item").eq(2).text());
    $("#houseId").val($(obj).children(".query-item").eq(0).find(":hidden").val());
}

function queryHouseInfo() {
    $.ajax({
        type: "POST",
        url: "/querySginInfo",
        data: {
            param: $("#houseInfo").data("data")
        },
        dataType: "json"
    }).done(function (result) {
        if (result.code == 200) {
            $("#people").val(result.contractSign_Name);
            $("#phone").val(result.contractSign_Phone);
        }
    });
}

/** 图片描述 */
function showDesc() {
    var len = $(".img-box").length;
    $("#desc-tisp").text(len);
    $("#descFile").uploadify({
        'uploader': 'AddFileUpload',
        'buttonText': '请选择图片',
        'swf': '../resources/common/uploadify/img/uploadify.swf',
        'fileTypeExts': '*.gif;*.jpg;*.bmp;*.jpeg;*.png',
        'fileTypeDesc': '*.gif;*.jpg;*.bmp;*.jpeg;*.png',
        'method': 'POST',
        'width': 98,
        'height': 98,
        'dataType': 'json',
        'formData': {
            type: "WTS"
        },
        'onInit': function () {
            $("#descFile-queue").remove();
        },//隐藏进度条
        'onUploadStart': function () {
            $("#descFile").append('<div id="img-loading"><i></i></div>');
        },
        'onUploadSuccess': function (file, result, response) {
            var result = eval('(' + result + ')');
            if (result.code == 200) {
                var $file = $("#descFile");
                $.each(result.data, function (index, data) {
                    $file.before(
                        "<div class='img-box'>" +
                        "<input type='hidden' name='servicePicDesc' value='" + result.data + "'>" +
                        "<img class='img-img' src='" + result.data + "' width='100' height='100' style='cursor:pointer;' />" +
                        "<span class='img-mark'></span>" +
                        "<span class='img-title' onclick='del(this,\"" + result.data + "\")' >删除</span>" +
                        "</div>");
                    var newLen = $(".img-box").length;
                    $("#desc-tisp").text(newLen);
                    if (newLen == IMG_LIMIT) {
                        $file.hide();
                    }
                    $file.find("#img-loading").remove();
                });
            } else {
                alert(result.msg);
            }
        }
    });
}

/** 删除描述图片 */
function del(obj, src) {
    var $this = $(obj);
    var $file = $("#descFile");
    var $tisp = $("#desc-tisp");
    $(obj).parent(".img-box").hide();
    $.ajax({
        type: "POST",
        url: "AddDeleteImage",
        data: "df=" + src,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        async: true,
        success: function (result) {
            if (result.code == 200) {
                $file.show();
                $this.parent(".img-box").remove();
                var newLen = $(".img-box").length;
                $tisp.text(newLen);
                if (newLen < 5) {
                    $file.show();
                    $("#fczFileBox").append('<input type="file" name="fczFile" id="fczFile" class="input-file"/>');
                    showDesc();
                }
            }
        }
    });
}

/* =======================================页面分页============================================== */

// 判断页数
function page() {
    // 开始的页数样式
    if ($("#sizeNum").text() <= 5) {
        $(".paginList").html("<li class='paginItem'><a href='javascript:up();'><span class='pagepre' id='up'></span></a></li>");
        for (var i = 1; i <= $("#sizeNum").text(); i++) {
            $(".paginList").append("<li id='paginList_" + i + "' class='paginItem'><a href='javascript:li(" + i + ");'>" + i + "</a></li>");
        }
        $(".paginList").append("<li class='paginItem'><a href='javascript:down();'><span class='pagenxt' id='down'></span></a></li>");
        $(".paginList").append("<li id='sizeCount'><input type='text' onkeyup='this.value=this.value.replace(/[^0-9]\D*$/,\"\")' value='" + $("#data").data("pageCount") + "' placeholder='请输入条数' /></li>");
        $(".paginList").append("<li class='paginItem'><a href='javascript:data();'>设置</a></li>");
    } else {
        if ($("#Num").text() <= 5) {
            $(".paginList").html("<li class='paginItem'><a href='javascript:up();'><span class='pagepre' id='up'></span></a></li>");
            for (var i = 1; i <= 5; i++) {
                $(".paginList").append("<li id='paginList_" + i + "' class='paginItem'><a href='javascript:li(" + i + ");'>" + i + "</a></li>");
            }
            $(".paginList").append("<li class='paginItem'><a href='javascript:down();'><span class='pagenxt' id='down'></span></a></li>");
            $(".paginList").append("<li id='sizeCount'><input type='text' onkeyup='this.value=this.value.replace(/[^0-9]\D*$/,\"\")' value='" + $("#data").data("pageCount") + "' placeholder='请输入条数' /></li>");
            $(".paginList").append("<li class='paginItem'><a href='javascript:data();'>设置</a></li>");
        }
    }
    // end

    // 样式变化
    $(".paginList li").each(function (idx) {
        $(this).attr("class", "paginItem");
    });
    $("#paginList_" + $("#Num").text() + "").attr("class", "paginItem current");
    // end

    // 判断最后一页和第一页的样式
    if ($("#Num").text() == $("#sizeNum").text() && $("#sizeNum").text() != "1") {
        $(".paginItem span[id=down]").css("background", "url(/resources/image/next_1.gif) no-repeat center center");
        $(".paginItem span[id=up]").css("background", "url(/resources/image/pre.gif) no-repeat center center");
    } else if ($("#Num").text() == "1" && $("#sizeNum").text() != "1") {
        $(".paginItem span[id=down]").css("background", "url(/resources/image/next.gif) no-repeat center center");
        $(".paginItem span[id=up]").css("background", "url(/resources/image/pre_1.gif) no-repeat center center");
    } else if ($("#Num").text() == "1" && $("#sizeNum").text() == "1") {
        $(".paginItem span[id=down]").css("background", "url(/resources/image/next_1.gif) no-repeat center center");
        $(".paginItem span[id=up]").css("background", "url(/resources/image/pre_1.gif) no-repeat center center");
    } else if ($("#Num").text() != "1" && $("#Num").text() != $("#sizeNum").text()) {
        $(".paginItem span[id=down]").css("background", "url(/resources/image/next.gif) no-repeat center center");
        $(".paginItem span[id=up]").css("background", "url(/resources/image/pre.gif) no-repeat center center");
    }
    // end

    // 间隔变色
    $('.tablelist tbody tr:odd').addClass('odd');
}

/* 点击LI分页读取数据 */
function li(id) {

    $("#Num").text(id);
    $("#paginList_" + id + " a").attr("class", "paginItem");
    data();
}

function up() {
    // 获取当前页数
    var pageMum = parseInt($("#Num").text());
    // 最大页数
    var pageSize = parseInt($("#sizeNum").text());
    if (pageMum > 1) {
        if ((pageMum - 1) % 5 == 0) {
            $(".paginList").html("<li class='paginItem'><a href='javascript:up();'><span class='pagepre' id='up'></span></a></li>");
            for (var i = 5; i > 0; i--) {
                $(".paginList").append("<li id='paginList_" + (pageMum - i) + "' class='paginItem'><a href='javascript:li(" + (pageMum - i) + ");'>" + (pageMum - i) + "</a></li>");
            }
            $(".paginList").append("<li class='paginItem'><a href='javascript:down();'><span class='pagenxt' id='down'></span></a></li>");
            $(".paginList").append("<li id='sizeCount'><input type='text' onkeyup='this.value=this.value.replace(/[^0-9]\D*$/,\"\")' value='" + $("#data").data("pageCount") + "' placeholder='请输入条数' /></li>");
            $(".paginList").append("<li class='paginItem'><a href='javascript:data();'>设置</a></li>");
        }
        $("#Num").text(pageMum - 1);
        data();
    }
}

function down() {
    // 获取当前页数
    var pageMum = parseInt($("#Num").text());
    // 最大页数
    var pageSize = parseInt($("#sizeNum").text());
    if (pageMum < pageSize) {
        if ((pageMum + 5) < pageSize) {
            if (pageMum % 5 == 0) {

                $(".paginList").html("<li class='paginItem'><a href='javascript:up();'><span class='pagepre' id='up'></span></a></li>");
                for (var i = 1; i <= 5; i++) {
                    $(".paginList").append("<li id='paginList_" + (pageMum + i) + "' class='paginItem'><a href='javascript:li(" + (pageMum + i) + ");'>" + (pageMum + i) + "</a></li>");
                }
                $(".paginList").append("<li class='paginItem'><a href='javascript:down();'><span class='pagenxt' id='down'></span></a></li>");
                $(".paginList").append("<li id='sizeCount'><input type='text' onkeyup='this.value=this.value.replace(/[^0-9]\D*$/,\"\")' value='" + $("#data").data("pageCount") + "' placeholder='请输入条数' /></li>");
                $(".paginList").append("<li class='paginItem'><a href='javascript:data();'>设置</a></li>");
            }
            $("#Num").text(pageMum + 1);
            data();
        } else {
            if (pageMum % 5 == 0) {
                $(".paginList").html("<li class='paginItem'><a href='javascript:up();'><span class='pagepre' id='up'></span></a></li>");
                for (var i = 4; i >= 0; i--) {
                    $(".paginList").append("<li id='paginList_" + (pageSize - i) + "' class='paginItem'><a href='javascript:li(" + (pageSize - i) + ");'>" + (pageSize - i) + "</a></li>");
                }
                $(".paginList").append("<li class='paginItem'><a href='javascript:down();'><span class='pagenxt' id='down'></span></a></li>");
                $(".paginList").append("<li id='sizeCount'><input type='text' onkeyup='this.value=this.value.replace(/[^0-9]\D*$/,\"\")' value='" + $("#data").data("pageCount") + "' placeholder='请输入条数' /></li>");
                $(".paginList").append("<li class='paginItem'><a href='javascript:data();'>设置</a></li>");
            }
            $("#Num").text(pageMum + 1);
            data();
        }
    }
}

// 毫秒转换为日期格式
var format = function (time, format) {
    var t = new Date(time);
    var tf = function (i) {
        return (i < 10 ? '0' : '') + i
    };
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
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
            case 'ss':
                return tf(t.getSeconds());
                break;
        }
    });
}

function isEmpty(obj) {
    return (typeof(obj) == "undefined") || obj == "";
}