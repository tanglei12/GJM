var hi_id = null;
var type = "library";
var house_image = null;
//定位数组
var position = '';
var houseS = [0, 1, 2, 3, 4, 5, 6, 7, 8];

$(function () {
    // 图片上传
    uploadImage = $("#uploadImage").imageUpload({
        skin: "appImageBox",
        limitUpload: false,
        isTailor: false,
        uploadUrl : "/file/uploadImage",
        deleteUrl : "/file/deleteImageFile",
        uploadType : "houseImage",
        success: function (box) {
            box.find('.image-item-add').append('<span class="imagefont">上传照片</span>');
            var html = '';
            html += '<div class="tips" style="position: absolute;top: 16px;left: 80px;color:#999">';
            html += '	<span class="" style="display: inline-block;color: #666666;font-size: 13px;">温馨提示：</span>';
            html += '	<ul class="" style="font-size: 12px;color: #666;">';
            html += '		<li class="">1、房间干净整洁，照片不要有人影</li>';
            html += '		<li class="">2、横向拍摄，仅支持jpg、png格式</li>';
            html += '	</ul>';
            html += '</div>';
            box.append(html);
        },
        builds: {
            onUpload: function (img) {
                var imgHtml = $("#uploadImage").html();
                if (null != imgHtml && "" != imgHtml) {
                    $(".tips").hide();
                }
            },
            onDelete: function (path) {
                setTimeout(function () {
                    var imgHtml = $("#uploadImage").html();
                    if (imgHtml.indexOf("<img") < 0) {
                        $(".tips").show();
                    }
                }, 800);
            }
        }
    });
    // 初始化页面数据
    loadData();
    loadEvent();
});

/** ----------------------------------------------- */

/** 加载数据*/
function loadData() {
    $.ajax({
        type: "POST",
        url: "/houseLibrary/selectHouseById",
        data: {
            hi_code: getUrlParam("hi_code")
        },
        dataType: "json",
    }).done(function (result) {
        if (result.code != 200) {
            return;
        }
        data = result.data;
        houseData = data.houseHouseInformation || "";
        houseHouseExtended = data.houseHouseExtended || "";
        customer = data.customer || "";
        stateRelations = data.stateRelations || "";
        houseInfoStates = data.houseInfoStates || "";

        // 意向图片
        var imgList = new Array();
        $(data.houseImgList).each(function (index, item) {
            var obj = [];
            obj.url = item.hm_path_real;
            obj.key = item.hm_path;
            imgList.push(obj);
        });
        uploadImage.push(imgList);
        // 若有图片则隐藏文字提示
        if (imgList.length > 0) {
            $(".tips").hide();
        }

        // 小区
        var p_name = returnValue(houseData.house_address).replace(returnValue(houseData.hi_address), "");
        var p_name_last = p_name.substring(p_name.length - 1, p_name.length);
        p_name = p_name_last == "-" ? p_name.replace(p_name_last, "") : p_name;
        $("[name=house-info]").val(p_name).attr("data-id", houseData.propertyInfo_Id);

        // 楼层房号
        $("[name=house-floor]").val(returnValue(houseData.hi_address.split("-")[0]));
        $("[name=house-room]").val(returnValue(houseData.hi_address.split("-")[1]));

        // 室厅卫
        $.each(houseS, function (index, data) {
            $("[name=hi_houseS]").append('<option value="' + data + '">' + data + '</option>');
            $("[name=hi_houseT]").append('<option value="' + data + '">' + data + '</option>');
            $("[name=hi_houseW]").append('<option value="' + data + '">' + data + '</option>');
        });
        $("[name=hi_houseT]").val(returnNumber(houseData.hi_houseT));
        $("[name=hi_houseS]").val(returnNumber(houseData.hi_houseS));
        $("[name=hi_houseW]").val(returnNumber(houseData.hi_houseW));

        // 产权地址
        $("[name=he_address]").val(returnValue(houseHouseExtended.he_address)).attr("data-id", returnValue(houseHouseExtended.he_id));

        // 面积
        $("[name=hi_measure]").val(returnFloat(houseData.hi_measure));

        // 存房价
        $("[name=hi_keepMoney]").val(returnFloat(houseData.hi_keepMoney));

        // 房屋类型
        $("select[name=hi_type]").val(houseData.hi_type);

        // 房屋情况
        $("select[name=hi_state]").val(houseData.hi_state);

        // 房屋朝向
        $("select[name=hi_orientation]").val(houseData.hi_orientation);

        // 房屋品牌
        $.each(houseInfoStates, function (index, data) {
            if (data.his_pid == 0) {
                $("select[name=hb_id]").append('<option value="' + data.his_id + '">' + returnValue(data.his_name) + '</option>');
            }
        });
        $("select[name=hb_id]").val(returnNumber((stateRelations[0] || "").his_id)).data("data", houseInfoStates);

        // 房东数据
        if (!isEmpty(customer)) {
            $("[name=cc_code]").val(returnValue(customer.cc_code));
            $("[name=cc_name]").val(returnValue(customer.cc_name));
            $("[name=ccp_phone]").val(returnValue(customer.ccp_phone));
            $("[name=cc_info]").val(returnValue(customer.cc_name) + " - " + returnValue(customer.ccp_phone));
        } else {
            $("[name=cc_edit]").removeClass("fa-pencil").addClass("fa-angle-right");
        }
    });
}

/** 加载事件*/
function loadEvent() {
    // 选择小区
    $("[name=house-info]").on("click", function () {
        window.location.href="/appIntent/propertyInfoAPPPage";
    });
    // 选择房东
    $("[name=cc_info]").on("click", function () {
        window.location.href = "/appPage/customerSearch";
    });
    // 编辑房东
    $("[name=cc_edit]").on("click", function () {
        /*var code = $("[name=cc_code]").val();
        if (isEmpty(code)) {
            window.location.href="/appPage/customerEdit";
        } else {
            window.location.href="/appPage/customerEdit?cc_code="+code;
        }*/
    });
    // 保存
    $("[name=save]").on("click", function () {
        submitHouseInfo();
    });
};

// 页面返回参数
function where(result){
    var arry = eval(result);
    // 物业选择返回
    if(arry.type != null && arry.type == "propertyInfo") {
        setProperty(arry.propertyInfo_Id,arry.upn_name);
    }else if(arry.type != null && arry.type == "customer"){
        setCustomer(arry.cc_code,arry.cc_name,arry.ccp_phone);
    }
}

/** ----------------------------------------------- */

/** 提交房屋信息*/
function submitHouseInfo() {
    // 数据验证
    var boo = true;
    $("input[required], select[required]").each(function () {
        if (isEmpty(this.value)) {
            $(this).appMsg(returnValue(this.placeholder) + "不能为空");
            return boo = false;
        }
        if (this.name == "hi_money" || this.name == "hi_keepMoney") {
            if (returnNumber(this.value) == 0) {
                $(this).appMsg(returnValue(this.placeholder) + "不能为0");
                return boo = false;
            }
        }
        if (this.name == "hb_id") {
            if (returnNumber(this.value) == 0) {
                $(this).appMsg("请选择" + returnValue(this.placeholder));
                return boo = false;
            }
        }
    });
    if (!boo) return;

    if (isEmpty($("input[name=cc_code]").val())) {
        $("[name=cc_info]").appMsg("请选择房东");
        return;
    }

    var data = {};
    data.hi_code = getUrlParam("hi_code");
    data.propertyInfo_Id = $("[name=house-info]").attr("data-id");
    data.hi_address = $("[name=house-floor]").val() + "-" + $("[name=house-room]").val();
    data.hi_keepMoney = $("input[name=hi_keepMoney]").val();
    data.hi_measure = $("input[name=hi_measure]").val();
    data.hi_houseS = $("select[name=hi_houseS]").val();
    data.hi_houseT = $("select[name=hi_houseT]").val();
    data.hi_houseW = $("select[name=hi_houseW]").val();
    data.cc_code = $("input[name=cc_code]").val();
    data.hi_type = $("select[name=hi_type]").val();
    data.hi_state = $("select[name=hi_state]").val();
    data.hi_orientation = $("select[name=hi_orientation]").val();
    data.hi_text = $("input[name=hi_text]").data("data");
    data.hi_userManaged = $("input[name=hi_userManaged]").data("data");
    data.hi_content = $("textarea[name=hi_content]").val();
    data.he_id = $("[name=he_address]").attr("data-id");
    data.he_address = $("[name=he_address]").val();
    data.hb_id = $("[name=hb_id]").val();

    var path = "";
    var imageNum = 0;
    $("#uploadImage .image-item").each(function (i) {
        path += $(this).find(".image-item-img").attr("data-url") + ",";
        imageNum += 1;
    });
    if (path != "") {
        path = path.substring(0, path.length - 1);
    }
    data.houseImgListSrc = path;

    $.ajax({
        type: "POST",
        url: "/houseLibrary/updateHouseInfo",
        data: data,
        dataType: "json",
        beforeSend: function () {
            $.hint("数据保存中...", "loading");
            $("[name=save]").attr("disabled", "disabled");
        },
    }).done(function (result) {
        if (result.code != 200) return $.hint(result.msg, "error");
        $.hint.tip("保存成功", "success", 2000, function () {
            if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                window.webkit.messageHandlers.goBackRefresh.postMessage([]);
            } else if (/(Android)/i.test(navigator.userAgent)) {
                webview.goBackRefresh();
            }
        });
    }).fail(function (e) {
        $.hint("请求服务器出错，请重试或联系管理员", "error");
    }).always(function () {
        $("[name=save]").removeAttr("disabled");
    });
}

/**
 * 赋值小区
 *
 * @param id    物业ID
 * @param name    物业名称
 */
function setProperty(id, name) {
    $("[name=house-info]").val(returnValue(name)).attr("data-id", id);
}

/**
 * 赋值客户信息
 *
 * @param cc_code        客户CODE
 * @param cc_name        客户姓名
 * @param ccp_phone    客户电话
 * @param cc_cardNum    客户证件号
 */
function setCustomer(cc_code, cc_name, ccp_phone) {
    $("[name=cc_edit]").removeClass("fa-angle-right").addClass("fa-pencil");

    $("[name=cc_code]").val(cc_code);
    $("[name=cc_name]").val(cc_name);
    $("[name=ccp_phone]").val(ccp_phone);
    $("[name=cc_info]").val(returnValue(cc_name) + " - " + returnValue(ccp_phone));
}
