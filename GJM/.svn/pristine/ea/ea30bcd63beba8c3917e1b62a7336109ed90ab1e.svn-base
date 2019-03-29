var md_id = getQueryString("md_id");
var em_id = getQueryString("em_id");
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

});

/** 现场确认提交 */
function problemSubmit() {

    if (md_id == "" || md_id == null) {
        alert("提交错误，请刷新重试");
        return;
    }
    var problem = "";
    if ($(".content dl").length > 0) {
        $(".content dl").each(function () {
            problem += $(this).find("input").val() + ";";
        });
        if (problem != "") {
            problem = problem.substring(0, problem.length - 1);
        }
    } else {
        alert("请填写问题！");
        return;
    }
    $.ajax({
        type: "POST",
        url: "/appPage/addProblemList",
        data: {
            so_id: md_id,
            em_id : em_id,
            problem: problem
        },
        dataType: "json",
        success: function (result) {
            if (result.message == "success") {
                alert("提交成功！");
                OCServiceContent.goBack();
            } else {
                alert("提交出错！");
            }
        }
    });
}

function addServiceProject(ids) {
    if ($(ids).prev().val() != "") {
        $("<dl><dd><input value='" + $(ids).prev().val() + "' style='width: 90%;' placeholder='问题描述' readonly /><i class='fa-minus-square-o' style='font-size: 20px;' onclick='removeServiceProject(this)'></i></dd></dl>").appendTo(".content").find("input:last").focus();
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
        url: "/appPage/insertServiceImage",
        data: {
            so_id: getQueryString("md_id"),
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
        url: "/appPage/deleteServiceImageFile",
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