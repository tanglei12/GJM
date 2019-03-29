var selectContractList = null;
var _STATE = false;
var _title = $("title").text();
$(function () {
    data();
    $("#cname").on("input propretychange", function () {
        changeWhere();
    });
});

//筛选获取数据
function data() {
    $("#content").table({
        titleBg: "#34495E",
        titleColor: "#FFF",
        search: true,
        title: [
            {
                name: "编号",
                string: "user_id",
                parameter: ""
            },
            {
                name: "认证状态",
                string: "userVerify_state",
                parameter: ""
            },
            {
                name: "用户类型",
                string: "user_type",
                parameter: ""
            },
            {
                name: "用户",
                string: "user_realName",
                parameter: "",
                string1: "user_phone",
                parameter1: ""
            },
            {
                name: "身份证号",
                string: "user_cardNumber",
                parameter: ""
            },
            {
                name: "状态",
                string: "user_state",
                parameter: {
                    0: "正常",
                    1: "失效"
                }
            },
            {
                name: "有效时间",
                string: "userVerify_cardValid",
                parameter: ""
            }
        ],
        url: "/customer/queryUserAuthList",
        data: {},
        success: function (result) {
            $(result).find("tbody tr").each(function (i) {
                var dateTime = "";
                if ($(this).find("td").eq(8).text() != "") {
                    dateTime = returnDate(parseInt($(this).find("td").eq(8).text()));
                }
                $(this).find("td").eq(8).text(dateTime);
            });
        }
    });
}

function changeWhere() {
    data();
}

/*=======================================编辑页面==============================================*/
/** 表单验证*/
function isValidInput() {
    $(".form-control:required").on("change", function () {
        var $this = $(this);
        if ($this.is(":hidden")) {
            _STATE = true;
            return;
        }
        var $thisVal = $(this).val();
        var $parent = $this.parent().parent();
        var text = $parent.find(".item-titile").text();
        if (isEmpty($thisVal)) {
            $this.addClass("input-error").siblings(".true-tisp").hide();
            $parent.find(".tisp").addClass("error").text(text + "不能为空");
            _STATE = false;
            return;
        }
        var $thisId = $(this).attr("id");
        $this.removeClass("input-error").siblings(".true-tisp").show();
        $parent.find(".tisp").removeClass("error").empty();
        _STATE = true;
    });
}

/** 保存客户信息 */
function saveSgin() {
    $(".form-control:required").each(function () {
        $(this).change();
        if (!_STATE) {
            $(this).focus();
            return false;
        }
        ;
    });
    if (!_STATE) {
        return;
    }
    $.ajax({
        type: "POST",
        url: "/updateCustomer",
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
            swal({
                title: result.msg,
                type: "success"
            }, function () {
                window.location.reload();
            });
        } else {
            swal({
                title: result.msg,
                type: "warning"
            });
        }
    });
}

/** 银行卡*/
function showBank() {
    $("#bankFile").uploadify({
        'uploader': '/contractObject/uploadFile',
        'buttonText': '请选择图片',
        'swf': '/resources/common/uploadify/img/uploadify.swf',
        'fileTypeExts': '*.gif;*.jpg;*.bmp;*.jpeg;*.png',
        'fileTypeDesc': '*.gif;*.jpg;*.bmp;*.jpeg;*.png',
        'method': 'POST',
        'width': 100,
        'height': 100,
        'dataType': 'json',
        'formData': {
            type: "BANK"
        },
        'onInit': function () {
            $("#bankFile-queue").hide();
        },//隐藏进度条
        'onUploadStart': function () {
            $("#bankFileBox").append('<div id="img-loading"><i></i></div>');
        },
        'onUploadSuccess': function (file, result, response) {
            var result = eval('(' + result + ')');
            if (result.code == 200) {
                var $wtsImg = $("#bankFileBox");
                $wtsImg.append(
                    "<div id='bank1' class='images-box-img'>" +
                    "<img id='bImg' src='" + result.data + "' width='100' height='100' style='cursor:pointer;' />" +
                    "<span class='images-box-img-option'></span>" +
                    "<span class='images-box-img-title' onclick='del3(this,\"" + result.data + "\")' >删除</span>" +
                    "</div>");
                $("#bank-tisp").text(1);
                $("#bankFile").hide();
                $("#bankFileBox").find("#img-mark").remove();
                $("#bankFileBox").find("#img-loading").remove();
            } else {
                alert(result.msg);
            }
        }
    });
}

/** 删除银行卡**/
function del3(obj, df) {
    var $this = $(obj);
    $this.parent().css({'visibility': 'hidden'});
    $.ajax({
        type: "POST",
        url: "/contractObject/deleteImage",
        data: {
            id: $("#cid").val(),
            df: df
        },
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        async: true,
        success: function (result) {
            if (result.code == 200) {
                $("#bankFile").show();
                $this.parent().remove();
                $("#bank-tisp").text(parseInt($("#bank-tisp").text()) - 1);
                if ($("#bankFileBox .images-box-img").length < 5 && $("#bankFile").length <= 0) {
                    $("#bankFileBox").html('<input type="file" name="bankFile" id="bankFile" class="input-file"/>');
                    showBank();
                }
                return true;
            } else {
                $this.parent().css({'visibility': 'visible'});
                return false;
            }
        }
    });
}

//毫秒转换为日期格式
var format = function (time, format) {
    if (isEmpty(time)) {
        return "";
    }
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

function edit() {
    var checkCount = $("tbody input[name='check']:checked").length;
    if (checkCount == 0) {
        swal("请选择一个");
    } else if (checkCount > 1) {
        swal("只能选择一个");
    } else {
        var id = $("tbody input[name='check']:checked").parent().attr("data-id");
        functionIfram('/customer/userAuthEdit?uid=' + id, '认证审核', _title);
    }
}
