$(function () {
    $("#noe").click(function (e) {
        var result = $(this).text();
        if (result != "无效√") {
            $(this).text(result + "√");
        }
        $(this).removeClass().addClass("btn btn-danger");
        $("#zj").text("中介")
        $("#zj").removeClass().addClass("btn btn-info");
        $("#gr").text("个人")
        $("#gr").removeClass().addClass("btn btn-info");
        $("#tg").text("托管")
        $("#tg").removeClass().addClass("btn btn-info");
        $("input[name='phi_state']").val("无效");
    });
    $("#zj").click(function (e) {
        var result = $(this).text();
        if (result != "中介√") {
            $(this).text(result + "√");
        }
        $(this).removeClass().addClass("btn btn-danger");
        $("#noe").text("无效")
        $("#noe").removeClass().addClass("btn btn-info");
        $("#gr").text("个人")
        $("#gr").removeClass().addClass("btn btn-info");
        $("#tg").text("托管")
        $("#tg").removeClass().addClass("btn btn-info");
        $("input[name='phi_state']").val("中介");
    });
    $("#tg").click(function (e) {
        var result = $(this).text();
        if (result != "托管√") {
            $(this).text(result + "√");
        }
        $(this).removeClass().addClass("btn btn-danger");
        $("#zj").text("中介")
        $("#zj").removeClass().addClass("btn btn-info");
        $("#noe").text("无效")
        $("#noe").removeClass().addClass("btn btn-info");
        $("#gr").text("个人")
        $("#gr").removeClass().addClass("btn btn-info");
        $("input[name='phi_state']").val("托管");
    });
    $("#gr").click(function (e) {
        var result = $(this).text();
        if (result != "个人√") {
            $(this).text(result + "√");
        }
        $(this).removeClass().addClass("btn btn-danger");
        $("#zj").text("中介")
        $("#zj").removeClass().addClass("btn btn-info");
        $("#noe").text("无效")
        $("#noe").removeClass().addClass("btn btn-info");
        $("#tg").text("托管")
        $("#tg").removeClass().addClass("btn btn-info");
        $("input[name='phi_state']").val("个人");
    });
    $("#dj").click(function (e) {
        var result = $(this).text();
        if (result != "定金√") {
            $(this).text(result + "√");
        }
        $(this).removeClass().addClass("btn btn-danger");
        $("#yj").text("诚意金")
        $("#yj").removeClass().addClass("btn btn-info");
        $("#ht").text("合同")
        $("#ht").removeClass().addClass("btn btn-info");
        $("input[name='ate']").val("定金");
        $("#money").css("display", "block");
    });
    $("#yj").click(function (e) {
        var result = $(this).text();
        if (result != "诚意金√") {
            $(this).text(result + "√");
        }
        $(this).removeClass().addClass("btn btn-danger");
        $("#dj").text("定金")
        $("#dj").removeClass().addClass("btn btn-info");
        $("#ht").text("合同")
        $("#ht").removeClass().addClass("btn btn-info");
        $("input[name='ate']").val("诚意金");
        $("#money").css("display", "block");
    });
    $("#ht").click(function (e) {
        var result = $(this).text();
        if (result != "合同√") {
            $(this).text(result + "√");
        }
        $(this).removeClass().addClass("btn btn-danger");
        $("#dj").text("定金")
        $("#dj").removeClass().addClass("btn btn-info");
        $("#yj").text("诚意金")
        $("#yj").removeClass().addClass("btn btn-info");
        $("input[name='ate']").val("合同");
        $("#money").css("display", "none");
    });
});

function changeState() {
    return false;
}

//上传到本地
function ajaxFile() {
    $.ajaxFileUpload({
        url: '/intention/upload',
        type: 'post',
        secureuri: false, //一般设置为false
        fileElementId: 'file5', // 上传文件的id、name属性名
        dataType: 'text', //返回值类型，一般设置为json、application/json
        elementIds: "", //传递参数到服务器
        success: function (data) {
            $("#imageTyp").css("display", "block");
            $("#Step2Container").css("display", "block");
            alert();
            $("#pic-img-content").attr("src", "/resources/image/upload/" + data).cropper("replace", "/resources/image/upload/" + data).show();
            cropper = $image.data("cropper");
            alert(cropper);
            $image.cropper("destroy");
            $image.cropper("reset");
        },
        error: function (data, status, e) {
            alert(e);
        }
    });
    //return false; 
}

function selectState(i) {
    var phi_id = $("input[name='phi_id']").val();
    var resu = 0;
    $.ajax({
        type: "POST",
        url: "/intention/selectState",
        data: "phi_id=" + phi_id,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.houseIntention.phi_state == '个人') {
                resu = 1;
            } else if (result.houseIntention.phi_state == '中介') {
                resu = 1;
            } else {
                $.jBox.tip('请先确定房源审查为个人或中介!');
            }
        }
    });
    if (resu == 1) {
        if (i == 1) {
            addFollow();
        }
        if (i == 2) {
            addTrack();
        }
        if (i == 3) {
            cutImage();
        }
        if (i == 4) {
            addProperty();
        }
        if (i == 5) {
            htOk();
        }
        if (i == 6) {
            fixedPrice();
        }
    }
}

function addFollow() {
    var ghf_item = $("textarea[name='ghf_item']").val();
    var ghf_content = $("textarea[name='ghf_content']").val();
    var phi_id = $("input[name='phi_id']").val();
    var ghf_state = $("select[name='ghf_state']").val();
    var ghf_d = $("input[name='ghf_d']").val();
    if (ghf_d == "") {
        $.jBox.tip('跟进时间不能为空!');
    } else if (ghf_item == "") {
        $.jBox.tip('跟进内容不能为空!');
    } else {
        $.ajax({
            type: "POST",
            url: "/intention/addFollow",
            data: "ghf_item=" + ghf_item + "&ghf_content=" + ghf_content + "&phi_id=" + phi_id + "&ghf_state=" + ghf_state + "&ghf_d=" + ghf_d,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result != 0) {
                    selectOrade(phi_id);
                }
            }
        });
    }
}

function fixedPrice() {
    var fixedPrice = $("input[name='fixedPrice']").val();
    var phi_id = $("input[name='phi_id']").val();
    if (fixedPrice == "") {
        $.jBox.tip('确认房源价格');
    } else {
        $.ajax({
            type: "POST",
            url: "/intention/fixedPrice",
            data: "fixedPrice=" + fixedPrice + "&phi_id=" + phi_id,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result != 0) {
                    selectOrade(phi_id);
                }
            }
        });
    }
}

function imageSize(ss) {
    $("#pic-img-content").cropper({
//		autoCropArea :  0.65 , 
        strict: true,
        guides: true,
        highlight: true,
        dragCrop: false,
        resizable: false,
        minCanvasWidth: 400,
        minCanvasHeight: 350,
        cropBoxMovable: true,
        cropBoxResizable: false,
        preview: ".img-preview",
        crop: function (data) {
            $("#pic-img-content").attr("data-x", Math.round(data.x));
            $("#pic-img-content").attr("data-y", Math.round(data.y));
            $("#pic-img-content").attr("data-width", Math.round(data.width));
            $("#pic-img-content").attr("data-height", Math.round(data.height));
        }
    });
}

/** 剪切用户头像*/
function cutUserPic() {
    var imgSrc = $("#pic-img-content").attr("src");
    if (isEmpty(imgSrc)) {
        $("#tisp4").empty().text("请选择图片");
        return;
    }

    var txt_width = $("#dataX").val();
    var txt_height = $("#dataY").val();
    var txt_top = $("#dataHeight").val();
    var txt_left = $("#dataWidth").val();
    var src = $("#pic-img-content").attr("src");
    alert(imgSrc + "aaa" + src);

    alert(txt_width + " " + txt_height + " " + txt_top + " " + txt_left);

    return false;
    $.ajax({
        type: "POST",
        url: "/cutUserPic",
        data: {
            ContractSign_Id: $("#ContractSign_Id").val(),
            ContractSign_UserType: $("#ContractSign_UserType option:selected").val(),
            ContractSign_Name: $("#ContractSign_Name").val(),
            ContractSign_CarType: '身份证',
            ContractSign_Sex: $("#ContractSign_Sex option:selected").val(),
            ContractSign_CarNo: $("#ContractSign_CarNo").val(),
            ContractSign_Phone: $("#ContractSign_Phone").val(),
            ContractSign_Tel: $("#ContractSign_Tel").val(),
            ContractSign_QQ: $("#ContractSign_QQ").val(),
            ContractSign_Email: $("#ContractSign_Email").val(),
            ContractSign_Bank: $("#ContractSign_Bank option:selected").val(),
            ContractSign_weixin: $("#ContractSign_weixin").val(),
            ContractSign_CarName: $("#ContractSign_CarName").val(),
            ContractSign_BankAddress: $("#ContractSign_BankAddress").val(),
            ContractSign_Work: $("#ContractSign_Work").val(),
            ContractSign_BCNo: $("#ContractSign_BCNo").val(),
            ContractSign_CarPic: $("#bImg").attr("src")
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

function cutImage() {
    $.jBox.tip("正在上传", 'loading');
    var phi_id = $("input[name='phi_id']").val();
    var txt_width = $("#dataX").val();
    var txt_height = $("#dataY").val();
    var txt_top = $("#dataHeight").val();
    var txt_left = $("#dataWidth").val();
    var txt_DropWidth = $("input[name='txt_DropWidth']").val();
    var txt_DropHeight = $("input[name='txt_DropHeight']").val();
    var hm_name = $("input[name='hm_name']").val();
    var type = $("select[name='hit_type']").val();
    var picture = $("input[name='picture']").val();
    var i = 0;
    var imageTypes = 0;
    return false;
    $(".imageTypes").each(function (i) {
        if ($(this).text() == '封面') {
            imageTypes = 1;
        }
    });
    if (imageTypes == 1 && type == 'page') {
        $.jBox.closeTip();
        $.jBox.tip("已有封面");
    } else {
        $.ajax({
            type: "POST",
            url: "/intention/cutUserPic",
            data: "txt_width=" + txt_width + "&txt_height=" + txt_height + "&phi_id=" + phi_id + "&txt_top=" + txt_top + "&txt_left=" + txt_left + "&txt_DropWidth=" + txt_DropWidth + "&txt_DropHeight=" + txt_DropHeight + "&hm_name=" + hm_name + "&type=" + type + "&picture=" + picture,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result == "" || result == null) {
                    window.setTimeout(function () {
                        $.jBox.tip('上传失败。', 'error');
                    }, 2000);
                } else {
                    $("#yhks").css("display", "block");
                    $("#Step2Container").css("display", "none");
                    $("#imageTyp").css("display", "none");
                    var num = Math.random() * 700 + 800;
                    num = parseInt(num, 10);
                    var him_id = result.him_id;
                    var ty = "";
                    if (type == 'page') {
                        ty = "封面";
                    }
                    if (type == 'effect') {
                        ty = "效果图片";
                    }
                    if (type == 'solid') {
                        ty = "户型图片";
                    }
                    if (type == '3d') {
                        ty = "3D效果图";
                    }
                    $("#yhk").append("<div  id='" + num + "' style='margin-left:20px;margin-top:10px;position: relative; width: 150px;float:left;'><img class='imagesf' width='150px' onclick='deleteImage(" + num + "," + him_id + ")' height='150px;' src=" + result.result + "><span class='imageTypes' style='position: absolute; top: 120; left: 50;width:100;line-height:20px;height:20;color:#fff;background:#404144;text-align:center;opacity:0.9;'>" + ty + "</span></div>");
                    $("input[name='him_id']").val(result.him_id);
                    selectOrade(phi_id);
                    $.jBox.closeTip()
                }
            }
        });
    }
    if (i == 1) {
        $.jBox.closeTip()
    }
}

function delete_image() {
    $("#yhks").css("display", "block");
    $("#Step2Container").css("display", "none");
    $("#imageTyp").css("display", "none");
}

/*function deleteImage(num,him_id){
 var submit = function (v, h, f) {
 if (v == 'ok'){
 var df = $("#"+num).children(".imagesf").attr("src");
 del(df,him_id);
 $("#"+num).remove();
 }
 else if (v == 'cancel'){}
 return true; //close
 };
 $.jBox.confirm("确定删除吗？", "管家婆管理系统",submit);
 }
 */

//筛选获取数据
function del(df, him_id) {
    $.ajax({
        type: "POST",
        url: "/intention/deleteImage",
        data: "df=" + df + "&him_id=" + him_id,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result != "1") {
                if (result == 'success') {
                    return true;
                } else {
                    return false;
                }
            }
        }
    });
}

function htOk() {
    var ate = $("input[name='ate']").val();
    var ghfc_reason = $("textarea[name='ghfc_reason']").val();
    var ghfc_con = $("select[name='ghfc_con']").val();
    var phi_id = $("input[name='phi_id']").val();
    if (ghfc_con == '成功') {
        if (ate == "") {
            $.jBox.tip('请选择!');
        } else {
            var moneye = $("input[name='money']").val();
            var ghf_item = ate;
            var money = moneye;

            if (ate == '定金' || ate == '诚意金') {
                if (money == '') {
                    $.jBox.tip('请填写金额');
                } else {
                    $.ajax({
                        type: "POST",
                        url: "/intention/addFollowContent",
                        data: "ghf_item=" + ghf_item + "&ghfc_reason=" + ghfc_reason + "&phi_id=" + phi_id + "&ghfc_con=" + ghfc_con + "&money=" + money,
                        contentType: "application/x-www-form-urlencoded; charset=utf-8",
                        dataType: "json",
                        success: function (result) {
                            if (result.result == '还未进行房屋实勘!') {
                                $.jBox.tip(result.result);
                                return;
                            }
                            if (result.hi_measure == '还未填写房屋面积!') {
                                $.jBox.tip(result.hi_measure);
                                return;
                            }
                            if (result.recommendGroup_Id == '还未选择推荐群体!') {
                                $.jBox.tip(result.recommendGroup_Id);
                                return;
                            }
                            if (result.cover == '还未上传封面!') {
                                $.jBox.tip(result.cover);
                                return;
                            }
                            if (result.house == '该房源已存入库存房源!') {
                                $.jBox.tip(result.house);
                                return;
                            }
                            if (result.result != 0) {
                                window.parent.href_mo("/houseLibrary/jumpHouseInfoEdit?id=" + result.result, "修改房屋", "库存房源");
                            }
                        }
                    });
                }
            } else {
                $.ajax({
                    type: "POST",
                    url: "/intention/addFollowContent",
                    data: "ghf_item=" + ghf_item + "&ghfc_reason=" + ghfc_reason + "&phi_id=" + phi_id + "&ghfc_con=" + ghfc_con,
                    contentType: "application/x-www-form-urlencoded; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        if (result.result == '还未进行房屋实勘!') {
                            $.jBox.tip(result.result);
                            return;
                        }
                        if (result.hi_measure == '还未填写房屋面积!') {
                            $.jBox.tip(result.hi_measure);
                            return;
                        }
                        if (result.recommendGroup_Id == '还未选择推荐群体!') {
                            $.jBox.tip(result.recommendGroup_Id);
                            return;
                        }
                        if (result.cover == '还未上传封面!') {
                            $.jBox.tip(result.cover);
                            return;
                        }
                        if (result.house == '该房源已存入库存房源!') {
                            $.jBox.tip(result.house);
                            return;
                        }
                        if (result.result != 0) {
                            window.parent.href_mo("/houseLibrary/jumpHouseInfoEdit?id=" + result.result, "修改房屋", "库存房源");
                        }
                    }
                });
            }
        }
    } else {
        $.ajax({
            type: "POST",
            url: "/intention/addFollowContent",
            data: "ghf_item=" + ghf_item + "&ghfc_reason=" + ghfc_reason + "&phi_id=" + phi_id + "&ghfc_con=" + ghfc_con,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.result == '还未进行房屋实勘!') {
                    $.jBox.tip(result.result);
                    return;
                }
                if (result.hi_measure == '还未填写房屋面积!') {
                    $.jBox.tip(result.hi_measure);
                    return;
                }
                if (result.recommendGroup_Id == '还未选择推荐群体!') {
                    $.jBox.tip(result.recommendGroup_Id);
                    return;
                }
                if (result.cover == '还未上传封面!') {
                    $.jBox.tip(result.cover);
                    return;
                }
                if (result.house == '该房源已存入库存房源!') {
                    $.jBox.tip(result.house);
                    return;
                }
                if (result.result != 0) {
                    window.parent.href_mo("/houseLibrary/jumpHouseInfoEdit?id=" + result.result, "修改房屋", "库存房源");
                }
            }
        });
    }
}

function checkSta() {
    var ghfc_con = $("select[name='ghfc_con']").val();
    if (ghfc_con == '成功') {
        $("#zt").css("display", "block");
        var ate = $("input[name='ate']").val();
        if (ate != '合同') {
            $("#money").css("display", "block");
        }
    } else {
        $("#zt").css("display", "none");
        $("#money").css("display", "none");
    }
}