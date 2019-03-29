var selectServeMessage = $.Deferred();
var MTID; // 维修类型编号
var ueditor = null;	// UE
var imageUpload = null;
var ue_project = null;

$(function () {
    // 自主申请
    // data();
    initModel();
    modelMove();

    ue_project = UE.getEditor('project_content', {
        initialFrameHeight: 440,
        scaleEnabled: true
    });
});

function modelMove() {
    var _move = false;//移动标记
    var _x, _y;//鼠标离控件左上角的相对位置
    $(".drag").mousedown(function (e) {
        $(".drag").css("cursor", "move");
        _move = true;
        _x = e.pageX - parseInt($(".window").css("left"));
        _y = e.pageY - parseInt($(".window").css("top"));
    });
    $(document).mousemove(function (e) {
        if (_move) {
            var x = e.pageX - _x;//移动时根据鼠标位置计算控件左上角的绝对位置
            var y = e.pageY - _y;
            $(".window").css({top: y, left: x});//控件新位置
        }
    }).mouseup(function () {
        _move = false;
        $(".drag").css("cursor", "default");
    });
}

/** 添加/更新服务名称*/
function change(obj) {
    var $val = $(obj).val();
    var $id = $(obj).data("id");
    var $pid = $(obj).data("pid");
    var $obj = $(obj).data("obj");
    var str = $val.replace(/\s+/g, "");
    if (str.length <= 0) {
        return;
    }
    if (isEmpty($id)) {
        /** 添加服务子类型*/
        $.ajax({
            type: "POST",
            url: "/addServiceSubType",
            data: {
                sm_id: $pid,
                typeName: $val
            },
            dataType: "json"
        }).done(function (result) {
            if (result.code == 200) {
                $(obj).data("id", result.data.st_id);
                $obj.before('<div class="sub-div">' +
                    '<input type="text" class="sub-input" data-id="' + result.data.st_id + '" value="' + result.data.st_name + '" readonly onclick="openModel(this);">' +
                    '<i onclick="delInput(this)"></i>' +
                    '</div>');
                $("#descTitle").css("border-bottom-color", "#ddd");
            } else {
                alert(result.msg);
            }
        });
    } else {
        /** 更新服务子类型*/
        $.ajax({
            type: "POST",
            url: "/updateServiceSubType",
            data: {
                typeId: $id,
                typeName: $val
            },
            dataType: "json"
        }).done(function (result) {
            if (result.code == 200) {
                $obj.val($val);
            } else {
                alert(result.msg);
            }
        });
    }
}

/** 初始化model*/
function initModel() {
    $("body").append(
        '<div>' +
        '<div class="model-mark"></div>' +
        '<div class="model-content window">' +
        '<div class="drag" style="display: flex;height: 35px;font-size: 16px; line-height: 35px;text-align: left; text-indent: 20px; margin-bottom: 4px;"></div>' +
        '<i onclick="closeModel()"></i>' +
        '<div style="display:flex;">' +
        '<div style="width:50%;">' +
        '<div class="model-tisp"><input type="text" id="descTitle" placeholder="服务名称" onchange="change(this)"><i style="position: absolute;bottom: 4px; left: 5px; font-size: 22px;color: #999;" class="icon-pencil"></i></div>' +
        '<div class="content-box" id="service-desc" style="display:none;">' +
        '<div class="content-top">' +
        '<span style="position:absolute;top:6px;left:-63px;display:block;font-size:14px;">服务描述</span>' +
        '<input type="text" placeholder="服务描述" id="serviceDesc" style="text-align:left; text-indent: 10px;">' +
        '<button onclick="addServiceDesc()">添加</button>' +
        '</div>' +
        '<div class="content-tisp tisp0" style="height:5px;"></div>' +
        '<div class="content-list" id="list0"></div>' +
        '</div>' +
        '<div class="content-box" id="plm-type" style="display:none;">' +
        '<div class="content-top">' +
        '<span style="position:absolute;top:6px;left:-63px;display:block;font-size:14px;">服务项目</span>' +
        '<input type="text" placeholder="服务项目" id="mtName" style="text-align:left; text-indent: 10px; border:1px solid #3498DB;">' +
        '<button onclick="addSubType()" style="background-color:#3498DB;">添加</button>' +
        '</div>' +
        '<div class="content-tisp tisp1" style="height:5px;"></div>' +
        '<div class="content-list" id="list1"></div>' +
        '</div>' +
        '<div class="content-box" id="plm-desc" style="display:none;">' +
        '<div class="content-top">' +
        '<input type="text" placeholder="项目跳转地址" id="descContent" style="text-align:left; text-indent: 10px;">' +
        '<button onclick="addSubDesc()">添加</button>' +
        '</div>' +
        '<div class="content-tisp tisp2" style="height:5px;"></div>' +
        '<div class="content-list" id="list2"></div>' +
        '</div>' +
        '<div class="content-box" id="plm-img" style="">' +
        '<div class="content-top">' +
        '<span style="position:absolute;top:6px;left:-63px;display:block;font-size:14px;">服务图标</span>' +
        '<li class="images_img" style="float: left;">' +
        '<div class="imageFile">' +
        '<img id="imgg" src="" width="61px" height="61px" onclick="$(\'#file5\').trigger(\'click\')" style="cursor:pointer" />' +
        '<label id="dellabel" style="display: none; float: left;height: 16px;line-height: 16px; position: relative;top: 46px;left: 4px;cursor: pointer; color: #999;">删除</label>' +
        '<input type="file" name="file5" id="file5" onchange="ajaxFile();" style="display: none" accept=".jpg,.png,.jpeg,.bmp,.gif" />' +
        '</div>' +
        '<div class="class_image"></div>' +
        '</li>' +
        '<li style="color:#CCC">最多上传1张图片，支持BMP,GIF,JPG,PNG,JPEG格式文件</li>' +
        '</div>' +
        '</div>' +
        '<div class="content-box" id="plm-img" style="">' +
        '<div class="content-top">' +
        '<span style="position:absolute;top:6px;left:-63px;display:block;font-size:14px;">展示图片</span>' +
        '<div id="image-upload-box" style="width: 100%;"></div>' +
        '<div class="content-tisp tisp3" style="height:5px;"></div>' +
        '</div>' +
        '</div>' +
        '<div class="content-box" id="plm-input" style="">' +
        '<div class="content-top">' +
        '<span style="position:absolute;top:6px;left:-63px;display:block;font-size:14px;">服务费用</span>' +
        '<input type="text" placeholder="服务金额" id="st_money" maxlength="6" style="text-align:left; text-indent: 10px;" onkeyup="this.value=this.value.replace(/\\D/g,\'\')" onafterpaste="this.value=this.value.replace(/\\D/g,\'\')">' +
        '<div class="content-tisp tisp4"></div>' +
        '</div>' +
        '</div>' +
        '<div class="content-box" id="plm-input" style="">' +
        '<div class="content-top">' +
        '<span style="position:absolute;top:6px;left:-63px;display:block;font-size:14px;">跳转界面</span>' +
        '<input type="text" placeholder="跳转界面" id="redirectPath" style="text-align:left; text-indent: 10px;">' +
        '<div class="content-tisp tisp5"></div>' +
        '</div>' +
        '</div>' +
        '<div class="content-box" id="plm-input" style="">' +
        '<div class="content-top">' +
        '<span style="position:absolute;top:6px;left:-63px;display:block;font-size:14px;">服务描述</span>' +
        '<input type="text" placeholder="服务描述" id="st_content" style="text-align:left; text-indent: 10px;">' +
        '<div class="content-tisp tisp5"></div>' +
        '</div>' +
        '</div>' +
        '<div class="content-box" id="plm-input">' +
        '<div class="content-top">' +
        '<span style="position:absolute;top:6px;left:-63px;display:block;font-size:14px;">服务费用</span>' +
        '<div style="height:34px; line-height: 34px; text-align: left;">' +
        '<label class="checkbox-min"><input type="radio" name="in" data-id="1" class="input_check" /><span></span><div>允许抵扣</div></label>' +
        '<label class="checkbox-min"><input type="radio" name="in" data-id="0" class="input_check" checked="checked" /><span></span><div>不允许抵扣</div></label>' +
        '</div>' +
        '<div class="content-tisp tisp5"></div>' +
        '</div>' +
        '</div>' +
        //						'<div class="model-tisp">' +
        //							'<h3>小提示</h3>' +
        //							'<ul>' +
        //								'<li>如果是新增“维修”类型的服务，必须包含“维修”。例：家具维修、家电维修</li>' +
        //							'</ul>' +
        //						'</div>' +
        '</div>' +
        '<div style="width:50%;">' +
        '<span style="position:absolute;display:block;font-size:14px;">服务说明</span>' +
        '<div>' +
        '<textarea name="hi_text" id="hi_text" style="width:95%;height:450px;margin-top:20px;"></textarea>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="btn" style="margin-left: 500px; margin-top: 50px;">' +
        '<button onclick="saveDate()">保  存</button><button onclick="closeModel();" style="position: relative;margin-left: 60px;">取  消</button>' +
        '</div>' +
        '</div>' +
        '</div>');
    // 加载编辑器
    ueditor = UE.getEditor('hi_text', {imagePathFormat: "/resources/upload/image/{yyyy}{mm}{dd}/{time}{rand:6}", autoHeightEnabled: false});
    // 加载图片上传插件
    imageUpload = $("#image-upload-box").imageUpload({
        uploadUrl: "/service/uploadServiceImage",
        deleteUrl: "/service/deleteServiceImageFile"
    });

    $(".image-item-add").on("click", function (event) {
        var imgData = $(".image-item img");
        if (imgData.length >= 1) {
            $(".tisp3").show();
            $(".tisp3").text("展示图片只能上传一张").addClass("error");
            setTimeout(function () {
                $(".tisp3").hide();
            }, 3000);
            event.stopPropagation();
            return false;
        } else {
            $(".tisp3").show();
        }
    });
}

/** 修改--显示model*/
function openModel(obj) {
    var $name = $(obj).parent().parent().find(".pid").attr("data-name");
    var $val = $(obj).val();
    var $id = $(obj).attr("data-id");
    $(".drag").html($name + "<h3></h3>");
    $("#plm-type").hide();
    $(".model-content .model-list").empty();
    $("#descTitle").siblings("i").show();
    if (isEmpty($id)) {
        $("#descTitle").attr("readonly", "readonly");
        $("#descTitle").siblings("i").hide();
        $id = $(obj).attr("data-hid");
    }
    $("#plm-type").show();
    // 查询服务子类型子类型列表
    $.ajax({
        type: "POST",
        url: "/queryServiceSubTypeList",
        data: {
            parent_id: $id
        },
        dataType: "json"
    }).done(function (result) {
        if (result.code == 200) {
            $.each(result.data.serviceTypeList, function (index, data) {
                $("#list1").append('<span title="' + data.st_name + '"><label onclick="changeSubType(this,' + data.st_id + ')">' + data.st_name + '</label><i onclick="delSubType(this,' + data.st_id + ')"></i></span>');
            });

            // 展示图片
            var service = result.data.serviceTypeData;
            $(".image-item").remove();
            var imgHtml = "";
            imgHtml += '<div class="image-item">';
            imgHtml += '	<img class="image-item-img" src="' + service.st_image + '" data-href="' + service.st_logoPath + '" data-preview-src="" data-preview-group="1">';
            imgHtml += '	<span class="image-item-close" title="删除照片">X</span>';
            imgHtml += '	<div class="image-item-wait" style="display: none;"></div>';
            imgHtml += '</div>';
            $(".image-item-add").before(imgHtml);
            $(".image-item-close").on("click", function () {
                imageUpload.deleteImage(this);
            });

            // 服务金额
            $("#st_money").val(service.st_money);
            // 服务描述
            $("#st_content").val(service.st_content);

            // 跳转界面
            $("#redirectPath").val(service.redrict_path);

            // 服务图标
            $("#imgg").attr("src", service.st_logo);
            $("#imgg").attr("data-href", service.st_logoPath);

            // 是否加入
            $(".checkbox-min input[data-id='" + service.st_moneyBool + "']").attr("checked", true);

            // 服务说明
            var ue = UE.getEditor('hi_text');
            ue.setContent(service.st_explain);
        }
    });
    $("#descTitle").val($val);
    $("#descTitle").data("id", $id);
    $("#descTitle").data("obj", $(obj));
    $(".model-mark,.model-content").show();
}

function deleteImage(obj) {
    var submit = confirm("确定要删除该图片吗？");
    if (submit == true) {
        // 获取图片路径
        var path = $(obj).parent().find(".image-item-img").attr("src");
        $(obj).parent().find(".image-item-wait").show();
        // 1.延迟执行界面删除
        var timeout = setTimeout(function () {
            // 更新图片数量
            if (options.limitUpload) {
                var nowSize = parseInt($("#" + _id + " .nowSize").text());
                $("#" + _id + " .nowSize").text(nowSize - 1);
            }
            // 移除元素
            $(obj).parent().remove();
            clearTimeout(timeout);
        }, options.delay);
        // 2.后台异步删除图片
        if (options.isAjaxUpload) {
            $.ajax({
                type: "POST",
                url: options.deleteUrl,
                data: {
                    image_url: path,
                    uploadType: options.uploadType
                },
                dataType: "json",
                error: function (e) {
                    alert("系统错误，请重试");
                },
                success: function (result) {
                    if (result.msg == "success") {
                        // 删除成功
                        options.builds.onDelete(path);
                    } else {
                        alert(result.msg);
                    }
                }
            });
        }
    }
};

/** 新增--显示model*/
function newModel(obj) {
    var $name = $(obj).parent().find(".pid").attr("data-name");

    $(".image-item").remove();

    // 服务图标
    $("#imgg").attr("src", "");

    // 服务说明
    var ue = UE.getEditor('hi_text');
    ue.setContent("");

    $(".drag").html($name + "<h3></h3>");
    $("#plm-type").hide();
    $("#descTitle").siblings("i").show();
    var $pid = $(obj).parent().find(".pid").val();
    $("#descTitle").data("pid", $pid);
    $("#descTitle").data("obj", $(obj));
    $(".content-list").empty();
    $(".model-mark,.model-content").show();
}

/** 改变常量值,并查询显示下一级*/
function changeSubType(obj, param) {
    MTID = param;
    $(obj).parent().parent().find("span").removeClass("list1-span-style");
    $(obj).parent().addClass("list1-span-style");
    // 查询服务描述
    $.ajax({
        type: "POST",
        url: "/queryServiceTypes",
        data: {
            st_id: param
        },
        dataType: "json"
    }).done(function (result) {
        $("#plm-desc").show();
        $("#descContent").attr("data-id", param);
        if (result.code == 200) {
            $("#descContent").val(result.data.redrict_path);
        }
    });
}

/** 关闭model*/
function closeModel() {
    $(".model-mark,.model-content").hide();
    $("#descTitle").removeData("id").removeData("pid").removeAttr("readonly");
    $("#descTitle").css("border-bottom-color", "#ddd");
    $("#plm-desc").hide();
    $(".content-tisp").removeClass("error").empty();
    $(".model-content input").val("");
    $(".model-content .content-list").empty();
    MTID = "";
}

/** 添加子服务分类*/
function addSubType() {
    var $id = $("#descTitle").data("id");
    if (isEmpty($id)) {
        $(".tisp1").text("请输入服务名称").addClass("error");
        $("#descTitle").css("border-bottom-color", "#E74C3C").focus();
        return;
    }
    var $mtName = $("#mtName").val();
    if (isEmpty($mtName)) {
        $(".tisp1").text("请输入分类名称").addClass("error");
        return;
    }
    /** 添加服务子类型*/
    $.ajax({
        type: "POST",
        url: "/addServiceSubType",
        data: {
            parent_id: $id,
            typeName: $mtName
        },
        dataType: "json"
    }).done(function (result) {
        if (result.code == 200) {
            $("#list1").append('<span title="' + result.data.st_name + '"><label onclick="changeSubType(this,' + result.data.st_id + ')">' + result.data.st_name + '</label><i onclick="delSubType(this,' + result.data.st_id + ')"></i></span>');
            $("#mtName").val("");
            $(".tisp1").empty();
        } else {
            $(".tisp1").empty().text(result.msg).addClass("error");
        }
    });
}

/** 添加服务描述*/
function addServiceDesc() {
    var $id = $("#descTitle").data("id");
    if (isEmpty($id)) {
        $(".tisp0").text("请输入服务名称").addClass("error");
        $("#descTitle").css("border-bottom-color", "#E74C3C").focus();
        return;
    }
    var desc = $("#serviceDesc").val();
    if (isEmpty(desc)) {
        $(".tisp0").text("请输入问题描述").addClass("error");
        return;
    }
    $.ajax({
        type: "POST",
        url: "/addServiceSubDesc",
        data: {
            serviceSubId: $id,
            serviceSubDesc: desc
        },
        dataType: "json"
    }).done(function (result) {
        if (result.code == 200) {
            $("#list0").append('<span title="' + result.data.pl_name + '"><label>' + result.data.pl_name + '</label><i onclick="delDesc(this,' + result.data.pl_id + ')"></i></span>');
            $("#serviceDesc").val("");
            $(".tisp0").empty();
        } else {
            $(".content-tisp").empty().text(result.msg).addClass("error");
        }
    });
}

/** 添加子服务描述*/
function addSubDesc() {
    $(".project_content").show();
    if ($("#descContent").val() != "") {
        $.ajax({
            type: "POST",
            url: "/service/selectServiceContent",
            data: {
                href: $("#descContent").val()
            },
            dataType: "json",
            success: function (result) {
                ue_project.setContent(result.content)
            }
        });
    }
}

function addServiceContent() {
    //获取编译内容
    var content = ue_project.getContent();
    var st_id = $("#descContent").attr("data-id");
    $.ajax({
        type: "POST",
        url: "/service/addServiceContent",
        data: {
            text: content,
            st_id: st_id,
            href: $("#descContent").val()
        },
        dataType: "json",
        success: function (result) {
            if (result.code == 200) {
                alert("添加成功");
                $(".project_content").hide();
                ue_project.setContent("");
                $("#descContent").val(result.path);
            } else {
                alert("添加失败");
            }
        }
    });
}

/** 删除子服务描述*/
function delDesc(obj, param) {
    $(obj).parent().hide();
    $.ajax({
        type: "POST",
        url: "/delServiceSubDesc",
        data: {
            id: param
        },
        dataType: "json"
    }).done(function (result) {
        if (result.code == 200) {
            $(obj).parent().remove();
        } else {
            $(obj).parent().show();
            alert(result.msg);
        }
    });
}

/** 删除子服务项目*/
function delSubType(obj, param) {
    $(obj).parent().hide();
    if ($("#list2").children("span").length <= 1) {
        $("#plm-desc").hide();
    }
    $.ajax({
        type: "POST",
        url: "/service/delServiceSubType",
        data: {
            typeId: param
        },
        dataType: "json"
    }).done(function (result) {
        if (result.code == 200) {
            $(obj).parent().remove();
            if ($("#list2").children("span").length <= 0) {
                $("#plm-desc").hide();
            }
        } else {
            $(obj).parent().show();
            $("#plm-desc").show();
            alert(result.msg);
        }
    });
}

/** 删除服务子类型*/
function delInput(obj) {
    var $this = $(obj);
    var $id = $this.parent().find(".sub-input").attr("data-id");
    var $val = $this.parent().find(".sub-input").val();
    swal({
        title: "你确定要删除[" + $val + "]?",
        text: "在删除的同时，将删除该服务下的所有服务描述",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        closeOnConfirm: true
    }, function (isConfirm) {
        if (isConfirm) {
            $this.parent().hide();
            /** 删除服务子类型*/
            $.ajax({
                type: "POST",
                url: "/delServiceSubType",
                data: {
                    typeId: $id
                },
                dataType: "json"
            }).done(function (result) {
                if (result.code == 200) {
                    $this.parent().remove();
                } else {
                    $this.parent().show();
                    swal(result.msg);
                }
            });
        }
    });
}

//筛选获取数据
function data() {
    var id = "null";
    $.cookie("this_count", $("#sizeCount input:text").val());
    $.ajax({
        type: "POST",
        url: "/serve/selectServeMessage",
        data: "page=" + $("#Num").text() + "&cookie=" + $.cookie('this_count'),
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            $("#tableContent #tableData tbody").html("");
            if (result != "1") {
                $.each(result.pageModel.list, function (idx, message) {
                    var tts = format(message.sm_time, 'yyyy-MM-dd HH:mm:ss');
                    $("#tableData tbody").append(
                        "<tr class='tr'  id='data_contents'>" +
                        "<td><input name='chickes' type='checkbox' id='" + message.sm_id + "'/></td>" +
                        "<td>" + (idx + 1) + "</td>" +
                        "<td><a href='/serve/updataMessage?id=" + message.sm_id + "'>" + message.sm_name + "</a></td>" +
                        "<td>" + message.st_name + "</td>" +
                        "<td>" + message.sm_people + "</td>" +
                        "<td>" + tts + "</td>" +
                        "</tr>");
                });
                $("#sizeNum").text(result.pageModel.totalPage);
                $("#nums").text(result.pageModel.totalRecords);
            } else {
                $(".tablelist tbody").html("");
                $("#sizeNum").text("");
                $("#Nums").html("");
            }
            $("#data").data("pageCount", result.pageModel.pageSize);
            page();
            selectServeMessage.resolve();
        }
    });
    $.when(selectServeMessage).done(function () {

        hide_table();
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

//毫秒转换为日期格式
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

//跳转修改推荐群体界面
//多选按钮判断
function addServiceType() {
    functionIfram('/service/jumpAddServeMessage', '服务增加', '服务信息');
}

//跳转修改推荐群体界面
//多选按钮判断
function ck() {
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
        swal("请选择一个");
    } else if (checkCount > 1) {
        swal("只能选择一个");
    } else {
        window.location.href = '/serve/updataMessage?id=' + id;
    }
}

// 保存图片、服务说明
function saveDate() {
    var st_id = $("#descTitle").data("id");
    var st_image = "";
    var imgData = $(".image-item img");
    if (null == imgData || undefined == imgData || imgData.length == 0) {
        swal("请上传展示图片");
        return;
    } else if (imgData.length > 1) {
        swal("只能上传一张展示图片");
        return;
    } else {
        st_image = imgData.eq(0).attr("data-href");
    }

    var st_money = $("#st_money").val();
    if (null == st_money || "" == st_money) {
        swal("请输入服务费用");
        return;
    }
    var st_content = $("#st_content").val();
    if (null == st_content || "" == st_content) {
        swal("请输入服务描述");
        return;
    }

    var st_logo = $("#imgg").attr("data-href");
    if (null == st_logo || "" == st_logo) {
        swal("请上传服务图标");
        return;
    }

    var ue = UE.getEditor('hi_text');
    //获取编译内容
    var content = ue.getContent();

    var st_moneyBool = 0;
    if ($(".checkbox-min input[name='in']").is(":checked")) {
        st_moneyBool = $(".checkbox-min input[name='in']:checked").attr("data-id");
    }

    $.ajax({
        type: "POST",
        url: "/service/perfectService",
        data: {
            st_id: st_id,
            st_money: st_money,
            st_moneyBool: st_moneyBool,
            st_content: st_content,
            st_image: st_image,
            st_explain: content,
            st_logo: st_logo
        },
        dataType: "json",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (data) {
            if (data.message == "success") {
                swal({
                        title: "点击完成",
                        text: "保存成功!",
                        type: "success",
                        confirmButtonColor: "#DD6B55",
                        showConfirmButton: true,
                        showCancelButton: false
                    },
                    function (isConfirm) {
                        if (isConfirm) {
                            closeModel();
                        }
                    });
            } else {
                swal({
                        title: "点击继续",
                        text: "保存失败!",
                        type: "warning",
                        confirmButtonColor: "#DD6B55",
                        showConfirmButton: true,
                        showCancelButton: false
                    },
                    function (isConfirm) {
                        if (isConfirm) {
//							closeModel();
                        }
                    });
            }
        },
        error: function (e) {
            swal("保存失败，请联系管理员");
            return;
        }
    });
}

//筛选获取数据
function ajaxFile() {
    var st_id = $("#descContent").attr("data-id");
    data.st_id
    var oInput = document.getElementById('file5');
    if (oInput.value == '') {
        $.jBox.info('未选择任何文件！', '管家婆管理系统');
        return false;
    }
    $.ajaxFileUpload({
        url: '/service/upload5',
        type: 'post',
        secureuri: false, //一般设置为false
        fileElementId: 'file5', // 上传文件的id、name属性名
        dataType: 'application/json', //返回值类型，一般设置为json、application/json
        st_id: st_id, //传递参数到服务器
        success: function (data) {
            var obj = jQuery.parseJSON(jQuery(data).text());
            $("#imgg").attr("src", obj.st_logoPath);
            $("#imgg").attr("data-href", obj.st_logo);
        },
        error: function (data, status, e) {
            alert(e);
        }
    });
    //return false;
}

function isEmpty(obj) {
    return (typeof(obj) == "undefined") || obj == "";
}

function project_close() {
    $(".project_content").hide();
}

/**
 * 模板
 * */
function moban() {
    var html = '<div class="titles" style="font-size: 17px; color: rgb(87, 87, 87); text-align: center; height: 45px; line-height: 45px; border-bottom: 1px solid rgb(237, 237, 237); font-family: Arial, Verdana, 宋体; white-space: normal; background-color: rgb(255, 255, 255);">' +
        '    家电维修类' +
        '</div>' +
        '<div class="project_service" style="margin-top: 15px; color: rgb(102, 102, 102); font-family: Arial, Verdana, 宋体; font-size: 12px; white-space: normal; background-color: rgb(255, 255, 255);">' +
        '    <div class="project_title" style="height: 45px; line-height: 45px;">' +
        '        <div style="float:left;">' +
        '            <img src="http://www.cqgjp.com/resources/service_icon/appliance_aircondition_checked_Image.png" width="45" height="45"/> ' +
        ' &nbsp;' +
        '        </div><span style="margin-left: 10px; height:45px; line-height:45px; display:block; float:left; font-size: 15px; color: rgb(255, 102, 102);">空调维修</span>' +
        '    </div>' +
        '    <div class="project_content" style="margin-top: 5px; color: rgb(153, 153, 153);">' +
        '        快速上门，品质保证，价格透明' +
        '    </div>' +
        '</div>' +
        '<div class="title" style="margin-top: 15px; overflow: hidden; color: rgb(102, 102, 102); font-family: Arial, Verdana, 宋体; font-size: 12px; white-space: normal; background-color: rgb(255, 255, 255);">' +
        '    <em style="display: block; width: 5px; height: 15px; border-radius: 3px; background-color: rgb(255, 102, 102); float: left; margin-top: 1px;"></em> ' +
        ' <span style="display: block; float: left; margin-left: 5px; font-size: 13px; font-weight: bold;">收费说明</span>' +
        '</div>' +
        '<table width="344">' +
        '    <thead style="background-color: rgb(255, 243, 243);">' +
        '        <tr style="height: 24px; line-height: 24px;" class="firstRow">' +
        '            <td class="num" style="border-color: rgb(204, 204, 204);" width="25"></td>' +
        '            <td style="border-color: rgb(204, 204, 204);"></td>' +
        '            <td style="border-color: rgb(204, 204, 204);"></td>' +
        '            <td class="table_money" style="border-color: rgb(204, 204, 204);" width="65"></td>' +
        '        </tr>' +
        '    </thead>' +
        '    <tbody>' +
        '        <tr style="height: 24px; line-height: 24px;">' +
        '            <td style="border-color: rgb(204, 204, 204); color: rgb(153, 153, 153);">' +
        '                1' +
        '            </td>' +
        '            <td style="border-color: rgb(204, 204, 204); color: rgb(153, 153, 153);"></td>' +
        '            <td style="border-color: rgb(204, 204, 204); color: rgb(153, 153, 153);"></td>' +
        '            <td style="border-color: rgb(204, 204, 204); color: rgb(153, 153, 153);"></td>' +
        '        </tr>' +
        '        <tr style="height: 24px; line-height: 24px;">' +
        '            <td style="border-color: rgb(204, 204, 204); color: rgb(153, 153, 153);">' +
        '                2' +
        '            </td>' +
        '            <td style="border-color: rgb(204, 204, 204); color: rgb(153, 153, 153);"></td>' +
        '            <td style="border-color: rgb(204, 204, 204); color: rgb(153, 153, 153);"></td>' +
        '            <td style="border-color: rgb(204, 204, 204); color: rgb(153, 153, 153);"></td>' +
        '        </tr>' +
        '    </tbody>' +
        '</table>' +
        '<div class="shuoming_content" style="margin-top: 12px; color: rgb(153, 153, 153); font-family: Arial, Verdana, 宋体; font-size: 12px; white-space: normal; background-color: rgb(255, 255, 255);">' +
        '    温馨提醒： ' +
        ' <br/>1.同一电器同级别多项维修，每增加一项累计计算费用，同一级别维修收费累计最高不超过两项；不同级别的维修，进行累计收费。 ' +
        ' <br/>2.安装/维修需高空外墙作业，五层及五层以上加收100元/台高中作业费；同地址多台安装/维修，最高收取150元。 ' +
        ' <br/>3.在使用原有配件基础上，按照标准收费；如需更换新配件，则按实际情况另行加收配件费用； ' +
        ' <br/>4.商用电器、中央空调、多联空调机组服务价格上门面议。 ' +
        ' <br/>5.此价格仅供参考，具体以维修技师实际上门为准。 ' +
        ' <br/>' +
        '</div>' +
        '<div class="title" style="margin-top: 15px; overflow: hidden; color: rgb(102, 102, 102); font-family: Arial, Verdana, 宋体; font-size: 12px; white-space: normal; background-color: rgb(255, 255, 255);">' +
        '    <em style="display: block; width: 5px; height: 15px; border-radius: 3px; background-color: rgb(255, 102, 102); float: left; margin-top: 1px;"></em> ' +
        ' <span style="display: block; float: left; margin-left: 5px; font-size: 13px; font-weight: bold;">服务说明</span>' +
        '</div>' +
        '<div class="shuoming_content" style="margin-top: 12px; color: rgb(153, 153, 153); font-family: Arial, Verdana, 宋体; font-size: 12px; white-space: normal; background-color: rgb(255, 255, 255);">' +
        '    1.常规可选上门时间：9:00-20:00； ' +
        ' <br/>2.客户预约服务后，维修技师会联系客户确认信息以便更好的为您服务；上门后现场服务流程为：检测-客户确认价格-维修技师清洗服务-客户检查服务结果并线上支付-维修技师清理服务垃圾后离开； ' +
        ' <br/>3.服务范围支持：重庆主城区内的客户预约。 ' +
        ' <br/>' +
        '</div>' +
        '<div class="title" style="margin-top: 15px; overflow: hidden; color: rgb(102, 102, 102); font-family: Arial, Verdana, 宋体; font-size: 12px; white-space: normal; background-color: rgb(255, 255, 255);">' +
        '    <em style="display: block; width: 5px; height: 15px; border-radius: 3px; background-color: rgb(255, 102, 102); float: left; margin-top: 1px;"></em> ' +
        ' <span style="display: block; float: left; margin-left: 5px; font-size: 13px; font-weight: bold;">服务保障</span>' +
        '</div>' +
        '<div class="shuoming_content" style="margin-top: 12px; color: rgb(153, 153, 153); font-family: Arial, Verdana, 宋体; font-size: 12px; white-space: normal; background-color: rgb(255, 255, 255);">' +
        '    1.快速上门：下单完成后，紧急维修2小时内上门 ' +
        ' <br/>2.品质保证：品质配件，最高一年保修 ' +
        ' <br/>3.价格透明：透明定价，据实收费' +
        '</div>' +
        '<p>' +
        '    <br/>' +
        '</p>';
    ue_project.setContent(html);
}