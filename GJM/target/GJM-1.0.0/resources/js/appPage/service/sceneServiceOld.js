$(function () {
    // 图片上传
    imageLoad = $("#imageLoad").imageUpload({
        skin: "appImageBox",
        uploadType: 'maintenance',
        limitUpload: false,
        isTailor: false,
        multiple: false,
        width: 70,
        height: 70,
        success: function (box) {
            box.find('.image-item-add').append('<span class="imagefont">上传照片</span>');
        },
        builds: {
            onUpload: function (img) {

                // 保存图片到数据库
                addServicePicture(img.attr("data-url"));
            },
            onDelete: function (path) {
                // 删除图片
                deleteServicePicture(path);
            }
        }
    });

    $.ajax({
        type: "POST",
        url: "/service/serviceProject",
        data: {
            md_id: getQueryString("so_id")
        },
        dataType: "json",
        success: function (result) {

            //服务类型
            var md_types = result.declaration.md_type;
            console.log(md_types)
            switch (md_types) {
                case "1" :
                    md_types = "居家保洁";
                    break;
                case "2" :
                    md_types = "居家维修";
                    break;
                case "3" :
                    md_types = "翻新改造";
                    break;
                case "5" :
                    md_types = "宽带服务";
                    break;
                case "6" :
                    md_types = "自由搬家";
                    break;
                case "7" :
                    md_types = "租约申请";
                    break;
                case "8" :
                    md_types = "理财投资";
                    break;
                case "9" :
                    md_types = "发票申请";
                    break;
                case "10" :
                    md_types = "我要投诉";
                    break;
                case "11" :
                    md_types = "其它服务";
                    break;
                case "12" :
                    md_types = "家电清洗";
                    break;
                case "13" :
                    md_types = "开锁换锁";
                    break;
            }
            $("#service_title").val(md_types);
            // 服务问题列表
            $(".problem_content ul").html("");
            $(result.problems).each(function (index, item) {
                $(".problem_content ul").append("<li>" + item.mdp_content + "</li>");
            });
        }
    });
});

/** 现场确认提交 */
function problemSubmit() {
    var md_id = getQueryString("so_id");
    if (md_id == "" || md_id == null) {
        theConfirm("提交错误，请刷新重试");
    }
    var problem = "";
    if ($(".content dl").length > 0) {
        $(".content dl").each(function () {
            problem += $(this).find("input").val() + ";";
        });
        if (problem != "") {
            problem = problem.substring(0, problem.length - 1);
        }
    }
    $.ajax({
        type: "POST",
        url: "/service/addProblemList",
        data: {
            md_id: getQueryString("so_id"),
            problem: problem
        },
        dataType: "json",
        success: function (result) {
            if (result.message == "success") {
                //window.location.href="/appPage/serviceContent?md_id="+md_id;
                theConfirm("提交成功！");
                if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                    window.webkit.messageHandlers.goBackRefresh.postMessage([]);
                } else if (/(Android)/i.test(navigator.userAgent)) {
                    webview.goBackRefresh();
                }

            } else {
                theConfirm("提交出错！");
            }
        }
    });
}

function addServiceProject(ids) {
    if ($(ids).prev().val() != "") {
        $(".content").append("<dl><dd><input style='width: 90%;' type='text' value='" + $(ids).prev().val() + "' readonly='readonly' /><i class='fa-minus-square-o' style='font-size: 20px;' onclick='removeServiceProject(this)'></i></dd></dl>");
        $(ids).prev().val("");
    }
}

/** 删除项目 */
function removeServiceProject(ids) {
    $(ids).parent().parent().remove();
}

/** 获取url值*/
function getQueryString(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var result = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null;
}

function deleteServicePictureData(path) {
    $.ajax({
        type: "POST",
        url: "/service/deleteServiceImage",
        data: {
            image_url: path
        },
        dataType: "json",
        error: function (e) {
            alert("系统异常，请联系管理员");
        },
        success: function (result) {
            if (result.msg == "success") {
                console.log("成功");
            }
        }
    });
}

/**
 * 保存图片
 *
 * @param path 图片路径
 */
function addServicePicture(path) {

    $.ajax({
        type: "POST",
        url: "/service/addServiceImageMoney",
        data: {
            md_id: getQueryString("so_id"),
            image_url: path,
            type: 'fault'
        },
        dataType: "json",
        error: function (e) {
            alert("系统异常，请联系管理员");
        },
        success: function (result) {
            if (result.msg == "success") {
                console.log("成功");
            }
        }
    });
}

/**
 * 删除图片
 *
 * @param path 图片路径
 */
function deleteServicePicture(path) {
    console.log(path);
    $.ajax({
        type: "POST",
        url: "/service/deleteServiceImageFile",
        data: {
            image_url: path,
            uploadType: 'maintenance'
        },
        dataType: "json",
        error: function (e) {
            alert("系统异常，请联系管理员");
        },
        success: function (result) {
            if (result.msg == "success") {
                console.log("成功");
                deleteServicePictureData(path);
            }
        }
    });
}

function theConfirm(msg) {
    if (confirm(msg)) {
        return true;
    } else {
        return true;
    }
}