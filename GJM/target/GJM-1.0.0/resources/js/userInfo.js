$(function () {
    $(".pt5 label").click(function () {
        $(".pt5 label").each(function () {
            $(this).attr("class", "icon-sex");
            $(this).children("input").attr("checked", false);
        });
        $(this).attr("class", "icon-sex icon-sex-checked");
        $(this).children("input").attr("checked", true);
    });
    selectUserInfo();
});

//查询当前登陆人员信息
function selectUserInfo() {
    $.ajax({
        type: "POST",
        url: "/user/selectUserInfo",
        data: "em_id=" + emid,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $(".pt5 label").each(function () {
                $(this).attr("class", "icon-sex");
                $(this).children("input").attr("checked", false);
            });
            $("input[name='em_name']").val(result.userCenterEmployee.em_name);
            $("input[name='em_phone']").val(result.userCenterEmployee.em_phone);
            if (result.userCenterEmployee.em_documentID == null) {
                result.userCenterEmployee.em_documentID = "";
            }
            if (result.userCenterEmployee.em_address == null) {
                result.userCenterEmployee.em_address = "";
            }
            $("input[name='em_address']").val(result.userCenterEmployee.em_address);
            $("input[name='em_documentID']").val(result.userCenterEmployee.em_documentID);
            $("input[name='em_id']").val(result.userCenterEmployee.em_id);
            if (result.userCenterEmployee.em_sex == 'man') {
                $(".icon-sex1").parent("label").attr("class", "icon-sex icon-sex-checked");
                $(".icon-sex1").parent("label").children("input").attr("checked", true);
            } else {
                $(".icon-sex2").parent("label").attr("class", "icon-sex icon-sex-checked");
                $(".icon-sex2").parent("label").children("input").attr("checked", true);
            }
            $("#em_account").html(result.userCenterEmployee.em_account);
            if (result.userCenterEmployee.ucc_short == null) {
                result.userCenterEmployee.ucc_short = "";
                result.userCenterEmployee.ucr_name = "";
            }
            $(".ucc_short").html(result.userCenterEmployee.ucc_short);
            $(".ucr_name").html(result.userCenterEmployee.ucr_name);
            if (result.userCenterEmployee.em_image != null) {
                $("#pic-img").attr("src", result.userCenterEmployee.em_image);
                $("#em_image", window.parent.document).attr("src", result.userCenterEmployee.em_image);
                $(".chatContent-people .chatPerson", window.parent.document).each(function (i) {
                    if (i > 0) {
                        if ($(this).attr("data-send") == result.userCenterEmployee.em_account) {
                            $(this).find(".chatleft img").attr("src", result.userCenterEmployee.em_image);
                        }
                    }
                });
            } else {
                $("#pic-img").attr("src", "../resources/image/chatIcon.jpg");
            }
            if (result.userCenterEmployee.em_cardImage != null && result.userCenterEmployee.em_cardImage != '') {
                var html = "";
                html += '<div class="image-item">';
                html += '<label class="image-item-add" for="house-image"><input type="file" id="house-image">'
                html += '	<div><img class="image-item-img image-card" onmouseover="getImageMouse()" onmouseout="leverImage()" src="' + result.userCenterEmployee.em_cardImage + '"></div>';
                html += '	<div class="divImageCard"><input type="text" value="修改图片" name="cardImageText" id="cardImageText" class="span-card-imageText" style="width:212px;"/></div>';
                //html +='	<span class="image-item-close icon-remove" title="删除" data-src="'+ result.userCenterEmployee.em_cardImage +'" data-id="'+ result.userCenterEmployee.em_id +'"></span>';
                html += '</label>';
                html += '</div>';
                $(".image-upload-box").html(html);
            } else {

            }

            $(".phones").remove();
            if (result.userCenterEmployee.em_phone1 != null && result.userCenterEmployee.em_phone1 != "" && result.userCenterEmployee.em_phone1 != 'undefined') {
                $(".type-label").parent("dd").parent("dl").after("<dl class='phones'><dt>副手机</dt><dd><input type='text' style='clear:both;' value='" + result.userCenterEmployee.em_phone1 + "' class='item-input' name='em_phone1'></dd></dl>");
            }
            if (result.userCenterEmployee.em_phone2 != null && result.userCenterEmployee.em_phone2 != "" && result.userCenterEmployee.em_phone2 != 'undefined') {
                $(".type-label").parent("dd").parent("dl").after("<dl class='phones'><dt>副手机</dt><dd><input type='text' style='clear:both;' value='" + result.userCenterEmployee.em_phone2 + "' class='item-input' name='em_phone2'></dd></dl>");
            }
        }
    });
}

//查询当前登陆人员信息
function updateUser() {
    $.ajax({
        type: "POST",
        url: "/user/updateUser",
        data: "em_id=" + $("input[name='em_id']").val() + "&em_name=" + $("input[name='em_name']").val() + "&em_phone=" + $("input[name='em_phone']").val() + "&em_address=" + $("input[name='em_address']").val() + "&em_sex=" + $("input[name='em_sex']:checked").val() + "&em_documentID=" + $("input[name='em_documentID']").val() + "&em_phone1=" + $("input[name='em_phone1']").val() + "&em_phone2=" + $("input[name='em_phone2']").val(),
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.result != 1) {
                swal("修改失败", "", "error");
            } else {
                swal("修改成功", "", "success");
            }

            selectUserInfo();

        }
    });
}

/** 判断字符串是否为空 */
function isEmpty(param) {
    return (param == null || param == "" || typeof(param) == "undefined");
}

/** 剪切用户头像*/
function cutUserPic(obj) {
    var imgSrc = $("#pic-img-content").attr("src");
    if (isEmpty(imgSrc)) {
        $("#tisp4").empty().text("请选择图片");
        return;
    }
    var dx = $("#pic-img-content").attr("data-x");
    var dy = $("#pic-img-content").attr("data-y");
    var dw = $("#pic-img-content").attr("data-width");
    var dh = $("#pic-img-content").attr("data-height");
    var src = $("#pic-img-content").attr("src");
    $.ajax({
        type: "POST",
        url: "/cutUserPic",
        data: {
            src: src,
            x: parseInt(dx),
            y: parseInt(dy),
            width: parseInt(dw),
            height: parseInt(dh),
            type: obj
        },
        dataType: "json"
    }).done(function (result) {
        if (result.code == 200) {
            $("#tisp4").empty().text(result.msg);
            boxClose();
            window.location.reload();
        } else {
            $("#tisp3").text(result.msg);
        }
    });
}

/** 修改头像*/
function midifyPic(obj) {
    $("body").append(
        '<div id="modify-userpic-mark" onclick="boxClose()"></div>' +
        '<div id="modify-userpic-content">' +
        '<dl class="s-dl">' +
        '<dd>' +
        '<input type="file" id="userpic" name="userpic" class="item-input" onchange="uploadImg()"><span id="tisp3"></span>' +
        '<div class="c"></div>' +
        '<div style="margin-top:10px;">仅支持JPG、GIF、PNG、JPEG、BMP格式，文件小于4M</div>' +
        '</dd>' +
        '</dl>' +
        '<dl style="margin-top:-15px;">' +
        '<dd class="input-image">' +
        '<div id="pic-img-tisp"><h2 style="vertical-align: middle;display: inline-block;margin-top: 100px;">请选择图片上传</h2></div>' +
        '<img id="pic-img-content" src="" alt="请选择图片" style="display:none;">' +
        '</dd>' +
        '<dd>' +
        '<div id="pic-img-sub">' +
        '<h3>效果预览</h3>' +
        '<div class="img-preview preview-lg"></div>' +
        '<p>110 * 110像素</p>' +
        '<div class="img-preview preview-md"></div>' +
        '<p>70 * 70像素</p>' +
        '</div>' +
        '</dd>' +
        '</dl>' +
        '<dl style="margin:0;">' +
        '<dd>' +
        '<input type="button" class="item-input" onclick="cutUserPic(' + obj + ');" value="保存">' +
        '<span id="tisp4"></span>' +
        '</dd>' +
        '<dd style="float:right;">' +
        '<input type="button" class="item-close" onclick="boxClose()" value="取消">' +
        '</dd>' +
        '</dl>' +
        '</div>');
    /** 异步提交头像*/
    $("#userpic").uploadify({
        'uploader': 'uploadUserPic',
        'buttonText': '本地图片',
        'swf': '../resources/common/uploadify/img/uploadify.swf',
        'fileTypeExts': '*.gif;*.jpg;*.bmp;*.jpeg;*.png',
//            'auto' : false,
        'method': 'POST',
        'width': 100,
        'height': 30,
        'dataType': 'json',
        'onInit': function () {
            $("#userpic-queue").hide();
        },//隐藏进度条
        'onUploadSuccess': function (file, result, response) {
            if (result == "110") {
                $("#tisp3").empty().text("图片大小不得超过4M");
            } else if (result == "111") {
                $("#tisp3").empty().text("没有发现此图片");
            } else {
                $("#pic-img-tisp").hide();
                $("#tisp4").empty();
                $("#tisp3").empty();
                $("#pic-img-content").attr("src", result).cropper("replace", result).show();
            }
        }
    });

    // 剪切图片
    $(".input-image>#pic-img-content").cropper({
        aspectRatio: 1 / 1,
//		autoCropArea :  0.65 , 
        strict: true,
        guides: true,
        highlight: true,
        dragCrop: true,
        cropBoxMovable: true,
        cropBoxResizable: true,
        preview: ".img-preview",
        crop: function (data) {
            $("#pic-img-content").attr("data-x", Math.round(data.x));
            $("#pic-img-content").attr("data-y", Math.round(data.y));
            $("#pic-img-content").attr("data-width", Math.round(data.width));
            $("#pic-img-content").attr("data-height", Math.round(data.height));
        }
    });
}

/** 关闭弹窗*/
function boxClose() {
    $("#modify-userpic-mark,#modify-userpic-content").remove();
    selectUserInfo();
}

function addPhone() {
    var length = $(".info-item").children("dl").length;
    if (length < 8) {
        if (length == 6) {
            $(".type-label").parent("dd").parent("dl").after("<dl class='phones'><dt>副手机</dt><dd><input type='text' style='clear:both;' class='item-input' name='em_phone1'></dd></dl>");
        } else {
            $(".type-label").parent("dd").parent("dl").after("<dl class='phones'><dt>副手机</dt><dd><input type='text' style='clear:both;' class='item-input' name='em_phone2'></dd></dl>");
        }
    }
}

//根据身份证判断性别
function accordingIdGender() {
    var id = $("input[name='em_documentID']").val();
    if (isCard(id)) {
        $("#sfz").html("可以使用");
        $("#sfz").css("color", "green");
        $("#subs").removeAttr("disabled");
    } else {
        $("#sfz").html("格式错误");
        $("#sfz").css("color", "red");
        $("#subs").attr("disabled", "disabled");
    }
}

//根据手机
function isPhoneF() {
    var id = $("input[name='em_phone']").val();
    if (isPhone(id)) {
        $("#phone").html("可以使用");
        $("#phone").css("color", "green");
        $("#subs").removeAttr("disabled");
    } else {
        $("#phone").html("格式错误");
        $("#phone").css("color", "red");
        $("#subs").attr("disabled", "disabled");
    }
}

/** 是否为身份证 */
var isCard = function (str) {
    var reg = /^(\d{6})(18|19|20)?(\d{2})([01]\d)([0123]\d)(\d{3})(\d|X)?$/;
    var boo = reg.test(str);
    var year = str.substr(6, 4);
    var month = str.substr(10, 2);
    var day = str.substr(12, 2);
    return !(boo == false || month > 12 || day > 31);
}

/** 是否为手机号码 */

/*var isPhone = function(str) {
 var reg = /^1[3-9]\d{9}$/;
 return reg.test(str);
 }*/

function getImageMouse() {
    $(".divImageCard").show();
}

function leverImage() {
    $(".divImageCard").hide();
}

