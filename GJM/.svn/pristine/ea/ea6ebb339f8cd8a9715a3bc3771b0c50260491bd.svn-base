$(function () {
    $(":checkbox").click(function () {
        if ($(this).attr("name") != 'recommendGroup_Id') {
            if ($(this).attr("checked") != 'true') {
                var name = $(this).attr("name");
                $(this).siblings(":checkbox[name='" + name + "']").attr("checked", false);
                $(this).attr("checked", true);
            }
            if ($(this).attr("checked") == 'checked') {
                $("input:checkbox[name='propertyInfo_Id']").each(function (i) {
                    $(this).attr("checked", false);
                });
                $(this).attr("checked", true);
            }
        }
    });
});

function delete_image() {
    $("#yhks").css("display", "block");
    $("#Step2Container").css("display", "none");
    $("#imageTyp").css("display", "none");
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

//查询房屋信息
function selectHouseDescc(id) {
    $.ajax({
        type: "POST",
        url: "/house/selectHouseById",
        data: "id=" + id,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            if (result != "1") {
                houseInfo(result.houseHouseInformation);
                houseExtendedInfo(result.houseHouseExtended)
                $.each(result.houseHouseBrandList, function (idx, houseBrand) {
                    if (result.houseHouseInformation == null) {
                        $("#houseHouseBrands").append("<input type='checkbox' onclick='changeBrand(this);' style='margin-left: 20px;' name='hb_id' value='" + houseBrand.hb_id + "'>" + houseBrand.hb_name);
                    } else {
                        if (houseBrand.hb_id == result.houseHouseInformation.hb_id) {
                            $("#houseHouseBrands").append("<input type='checkbox' onclick='changeBrand(this);' checked='checked' style='margin-left: 20px;' name='hb_id' value='" + houseBrand.hb_id + "' checked='checked'>" + houseBrand.hb_name);
                        } else {
                            $("#houseHouseBrands").append("<input type='checkbox' onclick='changeBrand(this);' style='margin-left: 20px;' name='hb_id' value='" + houseBrand.hb_id + "'>" + houseBrand.hb_name);
                        }
                    }
                });

                $.each(result.versions, function (idx, version) {
                    if (version != result.houseHouseInformation.hi_version) {
                        $("#addVer").before("<div class='type-label' onclick='changeTypeVer(this)' for='type7'><span class='glyphicon glyphicon-remove-circle delete'></span>" + version + "<i></i> <input type='checkbox' class='ver-radio' name='hi_version' value='" + version + "'></div>");
                    } else {
                        $("#addVer").before("<div onclick='changeTypeVer(this)' class='type-label span-checked' for='type7'><span class='glyphicon glyphicon-remove-circle delete' ></span>" + version + "<i></i> <input type='checkbox' class='ver-radio' checked='checked' name='hi_version' value='" + version + "'></div>");
                    }
                });

                $('input[name="hb_id"]:checked').each(function () {
                    if ($(this).val() == '1') {
                        $("#versions").css("display", "block");
                    }
                });

//	    		$.each(result.userCenterPropertyInfoList, function(idx, userCenterPropertyInfo) {
//					if(result.houseHouseInformation == null){
//						$("#userCenterPropertyInfos").append("<div style='width:200px;float:left;'><input type='checkbox' style='margin-left: 20px;' name='propertyInfo_Id' value='"+userCenterPropertyInfo.propertyInfo_Id+"'><span onclick='checkPro(this);'>"+userCenterPropertyInfo.propertyInfo_Name+"</span></div>");
//					}else{
//						if(userCenterPropertyInfo.propertyInfo_Id == result.houseHouseInformation.propertyInfo_Id){
//							$("#userCenterPropertyInfos").append("<div style='width:200px;float:left;'><input type='checkbox' style='margin-left: 20px;' name='propertyInfo_Id' value='"+userCenterPropertyInfo.propertyInfo_Id+"' checked='checked'><span onclick='checkPro(this);'>"+userCenterPropertyInfo.propertyInfo_Name+"</span></div>");
//							$("#propertyInfo_address").append("<td id='pr"+userCenterPropertyInfo.propertyInfo_Id+"'>"+userCenterPropertyInfo.propertyInfo_address+"</td>");
//						}else{
//							$("#userCenterPropertyInfos").append("<div style='width:200px;float:left;'><input type='checkbox' style='margin-left: 20px;' name='propertyInfo_Id' value='"+userCenterPropertyInfo.propertyInfo_Id+"'><span onclick='checkPro(this);'>"+userCenterPropertyInfo.propertyInfo_Name+"</span></div>");
//							$("#propertyInfo_address").append("<td id='pr"+userCenterPropertyInfo.propertyInfo_Id+"'>"+userCenterPropertyInfo.propertyInfo_address+"</td>");
//						}
//					}
//					
//				});

                $.each(result.userCenterPropertyInfoList, function (idx, userCenterPropertyInfo) {
                    if (result.houseHouseInformation == null) {
                        //$("#userCenterPropertyInfos").append("<div style='width:200px;float:left;'><input type='checkbox' style='margin-left: 20px;' name='propertyInfo_Id' value='"+userCenterPropertyInfo.propertyInfo_Id+"'><span onclick='checkPro(this);'>"+userCenterPropertyInfo.propertyInfo_Name+"</span></div>");
                    } else {
                        if (userCenterPropertyInfo.propertyInfo_Id == result.houseHouseInformation.propertyInfo_Id) {
                            //$("#userCenterPropertyInfos").append("<div style='width:200px;float:left;'><input type='checkbox' style='margin-left: 20px;' name='propertyInfo_Id' value='"+userCenterPropertyInfo.propertyInfo_Id+"' checked='checked'><span class='sdfssss' onclick='checkPro(this);'>"+userCenterPropertyInfo.propertyInfo_Name+"</span></div>");
                            //$("#propertyInfo_address").append("<td id='pr"+userCenterPropertyInfo.propertyInfo_Id+"'>"+userCenterPropertyInfo.propertyInfo_address+"</td>");
                            $("#propertyInfo_Id").val(result.houseHouseInformation.propertyInfo_Id);
                            $("#conhouseno").val(userCenterPropertyInfo.propertyInfo_Name);
                            $("#propertyInfo_address").append("<td id='pr" + userCenterPropertyInfo.propertyInfo_Id + "'>" + userCenterPropertyInfo.propertyInfo_address + "</td>");
                        } else {
                            //$("#userCenterPropertyInfos").append("<div style='width:200px;float:left;'><input type='checkbox' style='margin-left: 20px;' name='propertyInfo_Id' value='"+userCenterPropertyInfo.propertyInfo_Id+"'><span onclick='checkPro(this);'>"+userCenterPropertyInfo.propertyInfo_Name+"</span></div>");
                            //$("#propertyInfo_address").append("<td id='pr"+userCenterPropertyInfo.propertyInfo_Id+"'>"+userCenterPropertyInfo.propertyInfo_address+"</td>");
                            $("#propertyInfo_address").append("<td id='pr" + userCenterPropertyInfo.propertyInfo_Id + "'>" + userCenterPropertyInfo.propertyInfo_address + "</td>");
                        }
                    }

                });

                $.each(result.hoseRecommendGroupList, function (idx, hoseRecommendGroup) {
                    $("#hoseRecommendGroups").append("<input type='checkbox' style='margin-left: 20px;' name='recommendGroup_Id' value='" + hoseRecommendGroup.recommendGroup_Id + "'>" + hoseRecommendGroup.recommendGroup_Name);
                });
                var strs = result.houseHouseInformation.recommendGroup_Id.split(","); //字符分割
                var adIds = "";
                $("input:checkbox[name='recommendGroup_Id']").each(function (i) {
                    if (0 == i) {
                        adIds = $(this).val();
                    } else {
                        adIds += ("," + $(this).val());
                    }
                });
                var is = adIds.split(","); //字符分割
                for (i = 0; i < is.length; i++) {
                    for (j = 0; j < strs.length; j++) {
                        if (is[i] == strs[j]) {
                            $("input:checkbox[name='recommendGroup_Id']").each(function (i) {
                                if ($(this).val() == strs[j]) {
                                    $(this).attr("checked", 'checked');
                                }
                            });
                        }
                    }
                }
            }
        }
    });
}

//添加房屋基本信息
function houseInfo(houseHouseInformation) {
    $("#houseInfo").html("");
    $("#hi_id").val(houseHouseInformation.hi_id);
    $("#hi_ids").val(houseHouseInformation.hi_id);
    $("input[name='hi_name']").val(houseHouseInformation.hi_name);
    $("input[name='hi_keepMoney']").val(houseHouseInformation.hi_keepMoney);
    $("input[name='hi_money']").val(houseHouseInformation.hi_money);
    $("select[name='hi_area']").val(houseHouseInformation.hi_area);
    $("input[name='hi_measure']").val(houseHouseInformation.hi_measure);
    $("select[name='hi_district']").val(houseHouseInformation.hi_district);
    $("select[name='hi_track']").val(houseHouseInformation.hi_track);
    $("input[name='hi_floor']").val(houseHouseInformation.hi_floor);
    $("input[name='hi_totalFloor']").val(houseHouseInformation.hi_totalFloor);
    $("input[name='hi_peopleName']").val(houseHouseInformation.hi_peopleName);
    $("input[name='hi_address']").val(houseHouseInformation.hi_address);
    $("select[name='hi_houseT']").val(houseHouseInformation.hi_houseT);
    $("select[name='hi_houseS']").val(houseHouseInformation.hi_houseS);
    $("select[name='hi_houseW']").val(houseHouseInformation.hi_houseW);
    $("textarea[name='hi_content']").text(houseHouseInformation.hi_content);

    var adIds = "";
    $("input:checkbox[name='hi_function']").each(function (i) {
        if (0 == i) {
            adIds = $(this).val();
        } else {
            adIds += ("," + $(this).val());
        }
    });
    if (houseHouseInformation.hi_function != null) {
        var phi_configure = houseHouseInformation.hi_function;
        var strs = houseHouseInformation.hi_function.split(",");
        var is = adIds.split(","); //字符分割
        for (i = 0; i < is.length; i++) {
            for (j = 0; j < strs.length; j++) {
                if (is[i] == strs[j]) {
                    $("input:checkbox[name='hi_function']").each(function (i) {
                        if ($(this).val() == strs[j]) {
                            $(this).parent(".type-label").addClass("span-checked");
                            $(this).attr("checked", 'checked');
                            phi_configure = phi_configure.replace($(this).val() + ",", "");
                            phi_configure = phi_configure.replace($(this).val(), "");
                        }
                    });
                }
            }
        }
        var phi_configureList = phi_configure.split(","); //字符分割
        if (phi_configureList.length > 0) {
            for (i = 0; i < phi_configureList.length; i++) {
                if (phi_configureList[i] != "") {
                    $("#addPz").before("<div class='type-label span-checked' onclick='changeTypes(this)' for='type7'><span class='glyphicon glyphicon-remove-circle delete' onclick='deleteType(this);'></span>" + phi_configureList[i] + "<i></i> <input type='checkbox'  checked='checked' class='type-radio' name='hi_function' value='" + phi_configureList[i] + "'></div>");
                }
            }
        }
    }
    $("input[name='hi_latitude']").val(houseHouseInformation.hi_latitude);
    $("input[name='hi_text']").val(houseHouseInformation.hi_text);
    $("input[name='phi_id']").val(houseHouseInformation.phi_id);
    $("input[name='hi_code']").val(houseHouseInformation.hi_code);
    if (houseHouseInformation.hi_text == "") {
        $("#hiText").append("房屋简介<span class='btn btn-primary jianju' onclick='tianjia(1);'>还没有房屋简介,点击添加</span>");
    } else {
        $("#hiText").append("房屋简介<span class='btn btn-danger jianju' onclick='tianjia(1);'>已有房屋简介,点击修改</span>");
    }
    if (houseHouseInformation.hi_userManaged == "") {
        $("#hiUserManaged").append("托管管家<span class='btn btn-primary jianju' onclick='tianjia(2);'>还没有管家详情,点击添加</span>");
    } else {
        $("#hiUserManaged").append("托管管家<span class='btn btn-danger jianju' onclick='tianjia(2);'>已有管家详情,点击修改</span>");
    }
    $("input[name='hi_userManaged']").val(houseHouseInformation.hi_userManaged);
    $("input[name='hi_id']").val(houseHouseInformation.hi_id);
    $("input[name='pu_id']").val(houseHouseInformation.pu_id);
    KindEditor.ready(function (K) {
        KindEditor.html("#texts", houseHouseInformation.hi_text);
        KindEditor.html("#userManageds", houseHouseInformation.hi_userManaged);
    });

    if (houseHouseInformation.hi_type == "高档住宅") {
        $(":checkbox[value='高档住宅']").attr("checked", true);
        $(":checkbox[value='普通住宅']").attr("checked", false);
    }
    if (houseHouseInformation.hi_type == "普通住宅") {
        $(":checkbox[value='普通住宅']").attr("checked", true);
    }
    if (houseHouseInformation.hi_state == "精装") {
        $(":checkbox[value='精装']").attr("checked", true);
        $(":checkbox[value='基装']").attr("checked", false);
    }
    if (houseHouseInformation.hi_state == "基装") {
        $(":checkbox[value='基装']").attr("checked", true);
    }
    if (houseHouseInformation.hi_state == "清水") {
        $(":checkbox[value='清水']").attr("checked", true);
        $(":checkbox[value='基装']").attr("checked", false);
    }
    if (houseHouseInformation.hi_orientation == "东") {
        $(":checkbox[value='东']").attr("checked", true);
    }
    if (houseHouseInformation.hi_orientation == "南") {
        $(":checkbox[value='南']").attr("checked", true);
        $(":checkbox[value='东']").attr("checked", false);
    }
    if (houseHouseInformation.hi_orientation == "西") {
        $(":checkbox[value='西']").attr("checked", true);
        $(":checkbox[value='东']").attr("checked", false);
    }
    if (houseHouseInformation.hi_orientation == "北") {
        $(":checkbox[value='北']").attr("checked", true);
        $(":checkbox[value='东']").attr("checked", false);
    }
}

//添加房屋扩展信息
function houseExtendedInfo(houseHouseExtended) {
    $("#he_id").val(houseHouseExtended.he_id);
    $("#he_ids").val(houseHouseExtended.he_id);
    $("input[name='he_peopleName']").val(houseHouseExtended.he_peopleName);
    $("input[name='he_money']").val(houseHouseExtended.he_money);
    $("input[name='he_phone']").val(houseHouseExtended.he_phone);
    $("input[name='he_address']").val(houseHouseExtended.he_address);
    $("input[name='he_number']").val(houseHouseExtended.he_number);
    $("input[name='he_cardNumber']").val(houseHouseExtended.he_cardNumber);
    $("select[name='he_state']").val(houseHouseExtended.he_state);

    if (houseHouseExtended.he_nature == "住宅") {
        $(":checkbox[value='住宅']").attr("checked", true);
    }
    if (houseHouseExtended.he_nature == "商住") {
        $(":checkbox[value='商住']").attr("checked", true);
        $(":checkbox[value='住宅']").attr("checked", false);
    }
    if (houseHouseExtended.he_nature == "商业") {
        $(":checkbox[value='商业']").attr("checked", true);
        $(":checkbox[value='住宅']").attr("checked", false);
    }
    var tts = format(houseHouseExtended.he_buyTime, 'yyyy-MM-dd HH:mm:ss');
    $("input[name='buyTime']").val(tts);
}

function updateHouse() {
    $.ajax({
        type: "POST",
        url: "/house/updateHouse",
        data: $('#updateHouse').serialize(),
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            if (result.updata == 0) {
                $.jBox.tip('修改房屋基本信息失败');
            } else {
                $.jBox.tip('修改房屋基本信息成功');
            }
        }
    });
}

function updateExt() {
    $.ajax({
        type: "POST",
        url: "/house/updateExt",
        data: $('#updateExt').serialize(),
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            if (result.updata == 0) {
                $.jBox.tip('修改房屋扩展信息失败');
            } else {
                $.jBox.tip('修改房屋扩展信息成功');
            }
        }
    });
}

function selectImage(id) {
    $.ajax({
        type: "POST",
        url: "/house/selectImage",
        data: "hi_id=" + id,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            $.each(result.houseImageList, function (idx, image) {
                var num = Math.random() * 700 + 800;
                num = parseInt(num, 10);
                var hm_id = image.hm_id;
                var ty = "";
                if (image.ty == 'page') {
                    ty = "封面";
                }
                if (image.ty == 'effect') {
                    ty = "效果图片";
                }
                if (image.ty == 'solid') {
                    ty = "户型图片";
                }
                if (image.ty == '3d') {
                    ty = "3D效果图";
                }
                $("#yhk").append("<div  id='" + num + "' style='margin-left:20px;margin-top:10px;position: relative; width: 150px;float:left;'><img class='imagesf' width='150px' onclick='deleteImage(" + num + "," + hm_id + ")' height='150px;' src=" + image.hm_path + "><span class='imageTypes' style='position: absolute; top: 120; left: 50;width:100;line-height:20px;height:20;color:#fff;background:#404144;text-align:center;opacity:0.9;'>" + ty + "</span></div>");
            });
        }
    });
}

function deleteImage(num, hm_id) {
    var submit = function (v, h, f) {
        if (v == 'ok') {
            var df = $("#" + num).children(".imagesf").attr("src");
            del(df, hm_id);
            $("#" + num).remove();
        }
        else if (v == 'cancel') {
        }
        return true; //close
    };
    $.jBox.confirm("确定删除吗？", "管家婆管理系统", submit);
}

//筛选获取数据
function del(df, hm_id) {
    $.ajax({
        type: "POST",
        url: "/house/deleteImage",
        data: "df=" + df + "&hm_id=" + hm_id,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        async: false,
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

function cutImage() {
    $.jBox.tip("正在上传", 'loading');
    var hi_id = $("#hi_id").val();
    var dx = $("#pic-img-content").attr("data-x");
    var dy = $("#pic-img-content").attr("data-y");
    var dw = $("#pic-img-content").attr("data-width");
    var dh = $("#pic-img-content").attr("data-height");
    var src = $("#pic-img-content").attr("src");
    var txt_width = $("#pic-img-content").attr("data-width");
    var txt_height = $("#pic-img-content").attr("data-height");
    var txt_top = $("#pic-img-content").attr("data-y");
    var txt_left = $("#pic-img-content").attr("data-x");
    var txt_DropWidth = $("input[name='txt_DropWidth']").val();
    var txt_DropHeight = $("input[name='txt_DropHeight']").val();
    var hm_name = $("input[name='hm_name']").val();
    var type = $("select[name='hit_type']").val();
    var picture = $("input[name='picture']").val();
    var i = 0;
    var imageTypes = 0;
    $(".imageTypes").each(function (i) {
        if ($(this).text() == '封面') {
            imageTypes = 1;
        }

    });

    if (imageTypes == 1 && type == 'page') {
        $.jBox.closeTip();
        $.jBox.tip("已有封面");
    } else {
        var i = 0;
        $.ajax({
            type: "POST",
            url: "/house/cutImage",
            data: "txt_width=" + txt_width + "&txt_height=" + txt_height + "&hi_id=" + hi_id + "&txt_top=" + txt_top + "&txt_left=" + txt_left + "&txt_DropWidth=" + txt_DropWidth + "&txt_DropHeight=" + txt_DropHeight + "&hm_name=" + hm_name + "&type=" + type + "&picture=" + picture,
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
                    var hm_id = result.hm_id;
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
                    $("input[name='hm_id']").val(result.hm_id);
                    $("#yhk").append("<div id='" + num + "' style='margin-left:20px;margin-top:10px;position: relative;width: 150px;float:left;'><img class='imagesf' width='150px' onclick='deleteImage(" + num + "," + hm_id + ")' height='150px;' src=" + result.result + "><span class='imageTypes' style='position: absolute; top: 120; left: 50;width:100;line-height:20px;height:20;color:#fff;background:#404144;text-align:center;opacity:0.9;'>" + ty + "</span></div>");
                    $.jBox.closeTip()
                    load();
                }
            }
        });
    }
    if (i == 1) {
        $.jBox.closeTip()
    }
}

function load() {
    location.reload();
}

function ajaxFile() {

    $.ajaxFileUpload({
        url: '/house/upload',
        type: 'post',
        secureuri: false, //一般设置为false
        fileElementId: 'file5', // 上传文件的id、name属性名
        dataType: 'text', //返回值类型，一般设置为json、application/json
        elementIds: "", //传递参数到服务器
        success: function (data) {
            $("input[name='picture']").val(data);
            $("#yhks").css("display", "none");
            $("#Step2Container").css("display", "block");
            $("#imageTyp").css("display", "block");
//        	$("#ImageDrag").attr("src","/resources/image/upload/"+data);
//        	$("#ImageIcon").attr("src","/resources/image/upload/"+data);
//        	$('#ImageIcon').load(function(){
//        		cut("/resources/image/upload/"+data)
//        	});
            $("#pic-img-tisp").hide();
            $("#tisp4").empty();
            $("#tisp3").empty();
            imageSize(1.14);
            $("#pic-img-content").attr("src", "/resources/image/upload/" + data).cropper("replace", "/resources/image/upload/" + data).show();

        },
        error: function (data, status, e) {
            alert(e);
        }
    });
    //return false;
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
            height: parseInt(dh)
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

function changeType() {
    var type = $("select[name='hit_type']").val();
    if (type == 'page') {
        var ss = $("input[name='picture']").val();
        $("#pic-img-content").cropper("getCroppedCanvas", {width: 400, height: 350});
        $("#pic-img-content").attr("src", "/resources/image/upload/" + ss).cropper("replace", "/resources/image/upload/" + ss).show();
        $("#Canvas").css("width", "564px");
        $("#Canvas").css("height", "496px");

    } else {
        var ss = $("input[name='picture']").val();
        $("#pic-img-content").cropper("getCroppedCanvas", {width: 517, height: 360});
        $("#pic-img-content").attr("src", "/resources/image/upload/" + ss).cropper("replace", "/resources/image/upload/" + ss).show();
        $("#Canvas").css("width", "681px");
        $("#Canvas").css("height", "506px");

    }
}

function textChange() {
    var hi_text = $("input[name='hi_text']").val();
    if (hi_text == "") {
        $("#hiText").html();
        $("#hiText").append("房屋简介:<span class='btn btn-primary' onclick='tianjia(1);'>还没有房屋简介,点击添加</span>");
    } else {
        $("#hiText").html();
        $("#hiText").append("房屋简介:<span class='btn btn-danger' onclick='tianjia(1);'>已有房屋简介,点击修改</span>");
    }
    $("input[name='hi_userManaged']").val(houseHouseInformation.hi_userManaged);
    if (houseHouseInformation.hi_userManaged == "") {
        $("#hiUserManaged").html();
        $("#hiUserManaged").append("托管管家:<span class='btn btn-primary' onclick='tianjia(2);'>还没有管家详情,点击添加</span>");
    } else {
        $("#hiUserManaged").html();
        $("#hiUserManaged").append("托管管家:<span class='btn btn-danger' onclick='tianjia(2);'>已有管家详情,点击修改</span>");
    }
}

function tianjia(i) {

    var jBoxConfig = {};
    jBoxConfig.defaults = {
        width: 'auto',
        buttons: {'确定': 'ok'},
        buttonsFocus: 0,

    }
    $.jBox.setDefaults(jBoxConfig);

    if (i == 1) {
        var hi_text = $("input[name='hi_text']").val();
        var html = "<textarea name='hi_texts' id='texts' class='contents' style='width:960px;height:300px;visibility:hidden;'>" + hi_text + "</textarea>";
        var submit = function (v, h, f) {
            if (f.hi_texts == '') {
                $("input[name='hi_text']").val("");
                $("#hiText").html("");
                $("#hiText").append("房屋简介:<span class='btn btn-primary' onclick='tianjia(1);'>还没有房屋简介,点击添加</span>");
                return true;
            } else {
                var hi_text = $("textarea[name='hi_texts']").val();
                $("input[name='hi_text']").val(hi_text);
                $("#hiText").html("");
                $("#hiText").append("房屋简介:<span class='btn btn-danger' onclick='tianjia(1);'>已有房屋简介,点击修改</span>");
                return true;
            }
        };
        $.jBox(html, {title: "房屋简介", submit: submit});
    } else {
        var hi_userManaged = $("input[name='hi_userManaged']").val();
        var html = "<textarea name='hi_userManageds' id='userManageds' class='contents' style='width:960px;height:300px;visibility:hidden;'>" + hi_userManaged + "</textarea>";
        var submit = function (v, h, f) {
            if (f.hi_userManageds == '') {
                $("input[name='hi_userManaged']").val("");
                $("#hiUserManaged").html("");
                $("#hiUserManaged").append("托管管家:<span class='btn btn-primary' onclick='tianjia(2);'>还没有管家详情,点击添加</span>");
                return true;
            } else {
                var hi_text = $("textarea[name='hi_userManageds']").val();
                $("input[name='hi_userManaged']").val(hi_text);
                $("#hiUserManaged").html("");
                $("#hiUserManaged").append("托管管家:<span class='btn btn-danger' onclick='tianjia(2);'>已有管家详情,点击修改</span>");
                return true;
            }
        };
        $.jBox(html, {title: "托管管家", submit: submit});
    }

    var editor;
    KindEditor.ready(function (K) {
        editor = K.create('textarea[class="contents"]', {
            allowFileManager: true,
            uploadJson: '../../resources/Plug-in/kindeditor-4.1.10/jsp/upload_json.jsp',

            fileManagerJson: '../../resources/Plug-in/kindeditor-4.1.10/jsp/file_manager_json.jsp',

            allowFileManager: true,

            allowImageUpload: true,

            minWidth: '500px',
            afterCreate: function () {
                this.loadPlugin('autoheight');
            },

            afterBlur: function () {
                this.sync();
            }  //Kindeditor下获取文本框信息
        });
        K('input[name=getHtml]').click(function (e) {
            alert(editor.html());
        });
        K('input[name=isEmpty]').click(function (e) {
            alert(editor.isEmpty());
        });
        K('input[name=getText]').click(function (e) {
            alert(editor.text());
        });
        K('input[name=selectedHtml]').click(function (e) {
            alert(editor.selectedHtml());
        });
        K('input[name=setHtml]').click(function (e) {
            editor.html('<h3>Hello KindEditor</h3>');
        });
        K('input[name=setText]').click(function (e) {
            editor.text('<h3>Hello KindEditor</h3>');
        });
        K('input[name=insertHtml]').click(function (e) {
            editor.insertHtml('<strong>插入HTML</strong>');
        });
        K('input[name=appendHtml]').click(function (e) {
            editor.appendHtml('<strong>添加HTML</strong>');
        });
        K('input[name=clear]').click(function (e) {
            editor.html('');
        });

    });
}

function mapss() {

    $.jBox("iframe:/house/map", {
        title: "管家婆管理系统",
        width: 1200,
        height: 550,
        buttons: {'关闭': true}
    });
}

function changeBrand(obj) {
    var hi_version = $(obj).val();
    if (hi_version == '1') {
        $("#versions").css("display", "block");
    } else {
//		$(".ver-radio").each(function (){
//			$(".ver-radio").parent().removeClass("span-checked");
//			$(".ver-radio").removeAttr("checked");
//		});
        $("#versions").css("display", "none");
    }
}

function addBrandType(str) {
    $.ajax({
        type: "POST",
        url: "/houseHouseBrand/addBrandType",
        data: "str=" + str,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {

        }
    });
}

function closeIf() {
    window.parent.window.jBox.close();
}

//选择物业
function checkPro(obj) {
    $("input:checkbox[name='propertyInfo_Id']").each(function (i) {
        $(this).attr("checked", false);
    });
    $(obj).prev("input").attr("checked", true);
}