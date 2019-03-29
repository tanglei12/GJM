var _STATE = false;
$(function () {
    data();

    $("#cc_code").on("click", function () {
        $(this).openModel({
            title: "选择客户",
            target: {
                code: "cc_code",
                name: "cc_name",
                phone: "ccp_phone",
                card: "cc_card",
            },
            done: function (result) {
                $(this).val(result.cc_code);
                $("[name=cc_name]").val(result.cc_name).attr("readonly", "readonly");
                $("[name=cc_phone]").val(result.ccp_phone).attr("readonly", "readonly");
                $("[name=cc_cardNum]").val(result.cc_cardNum).attr("readonly", "readonly");
                $("[name=cc_cardType]").val(result.cc_cardType).attr("readonly", "readonly");
                var sex = result.cc_sex;
                if ("0" == sex) {
                    $("[name=cc_sex]").eq(0).attr("checked", "checked").parent().addClass("common-checkbox-checked");
                } else {
                    $("[name=cc_sex]").eq(1).attr("checked", "checked").parent().addClass("common-checkbox-checked");
                }
                var cc_type = $("[name=cc_type]");
                if (null != cc_type && "" != cc_type) {
                    if ("房东" == cc_type) {
                        $("[name=cc_type]").eq(2).attr("checked", "checked").parent().addClass("common-checkbox-checked");
                    } else if ("租客" == cc_type) {
                        $("[name=cc_type]").eq(3).attr("checked", "checked").parent().addClass("common-checkbox-checked");
                    }
                }
            }
        });
    });
});

// 筛选获取数据
function data() {
    $("#content").table({
        titleBg: "#34495E",
        titleColor: "#FFF",
        search: true,
        trClick: false,
        dataTime: [
            {
                name: "拉黑时间",
                string: "bl_date"
            }
        ],
        title: [
            {
                name: "编号",
                string: "bl_id",
                parameter: ""
            },
            {
                name: "客户名称",
                string: "cust",
                parameter: ""
            },
            //            {
            //                name: "性别",
            //                string: "cc_sex",
            //                parameter: {
            //                	1: "男",
            //                    2: "女",
            //                    3: "未知"
            //                }
            //            },
            {
                name: "证件信息",
                string: "idCard",
                parameter: ""
            },
            {
                name: "客户类型",
                string: "cc_type",
                parameter: {
                    "1": "意向房东",
                    "2": "意向租客",
                    "3": "正式房东",
                    "4": "正式租客"
                }
            },
            {
                name: "状态",
                string: "bl_state",
                parameter: {
                    "0": "解除",
                    "1": "生效"
                }
            },
            {
                name: "拉黑原因",
                string: "black_comment",
                parameter: ""
            },
            {
                name: "操作人员",
                string: "em_name",
                parameter: ""
            },
            {
                name: "操作日期",
                string: "bl_date",
                parameter: "",
                format: "yyyy-MM-dd"
            }

        ],
        url: "/customer/queryCustomerBlackList",
        data: {},
        success: function (result) {
            $(result).find("table.personTable tbody tr").each(function () {
                var _data = $(this).find("[name=check]").data("data");

                if (!isEmpty(_data)) {

                    // 【申请状态】
                    var bl_state = $(this).find("td[data-text=bl_state]");
                    bl_state.addClass(bl_state.text() == "生效" ? "hint" : "next");
                }
            });
        }
    });

    //关闭窗口
    $('.cd-popup-close').on('click', function (event) {
        event.preventDefault();
        //          removeInput();//清除数据
        $(".cd-popup3").removeClass('is-visible3');

    });

    $("[name=is_forever]").on('click', function () {
        var v = $("[name=is_forever]:checked").val();
        if (v == "0") {
            $("#exp_dateDL").show();
        } else {
            $("#exp_dateDL").hide();
        }
    });
}

/**
 * 添加黑名单客户
 */
function showAdd() {
    $('.cd-popup3').show();
    //打开窗口
    $('.cd-popup3').addClass('is-visible3');

    $("[name=cc_type]").eq(0).parent().show();
    $("[name=cc_type]").eq(1).parent().show();
    $("[name=cc_type]").eq(2).parent().hide();
    $("[name=cc_type]").eq(3).parent().hide();
    $("[name=cc_name]").removeAttr("readonly");
    $("[name=cc_phone]").removeAttr("readonly");
    $("[name=cc_cardNum]").removeAttr("readonly");
    $("[name=inputtext]").val("添加黑名单客户");
    $("#codeDL").hide();
}

/**
 * 设置黑名单客户
 */
function showSet() {
    $('.cd-popup3').show();
    //打开窗口
    $('.cd-popup3').addClass('is-visible3');

    $("[name=cc_type]").eq(0).parent().hide();
    $("[name=cc_type]").eq(1).parent().hide();
    $("[name=cc_type]").eq(2).parent().show();
    $("[name=cc_type]").eq(3).parent().show();
    $("[name=cc_name]").attr("readonly", "readonly");
    $("[name=cc_phone]").attr("readonly", "readonly");
    $("[name=cc_cardNum]").attr("readonly", "readonly");
    $("[name=inputtext]").val("设置黑名单客户");
    $("#codeDL").show();
}

function submitText(obj) {

    var cc_name = $("#cc_name").val();
    if ("" == cc_name || null == cc_name) {
        swal("请输入客户姓名");
        return;
    }
    var cc_sex = $("[name=cc_sex]:checked").val();
    if ("" == cc_sex || null == cc_sex) {
        swal("请选择客户性别");
        return;
    }
    var cc_phone = $("[name=cc_phone]").val();
    if ("" == cc_phone || null == cc_phone) {
        swal("请输入客户电话");
        return;
    } else {
        if (!isPhone(cc_phone)) {
            swal("请输入正确电话");
            return;
        }
    }
    var cc_cardType = $("[name=cc_cardType]").val();
    var cc_cardNum = $("[name=cc_cardNum]").val();
    if ("-1" != cc_cardType && "" == cc_cardNum) {
        swal("请输入证件号码");
        return;
    }
    if (cc_cardNum != "") {
        if ("1" == cc_cardType && !isIDCard(cc_cardNum)) {

            swal("请输入正确证件号码");
            return;
        }
        if ("-1" == cc_cardType) {
            swal("请选择证件类型");
            return;
        }
    }
    var black_comment = $("[name=black_comment]").val();
    if ("" == black_comment || null == black_comment) {
        swal("请输入拉黑原因");
        return;
    }
    var cc_type = $("[name=cc_type]:checked").val();
    if ("" == cc_type || null == cc_type) {
        swal("请选择客户类型");
        return;
    }

    var data = {};
    var UserCustomerBlackList = {};
    UserCustomerBlackList.cc_code = $("[name=cc_code]").val();
    UserCustomerBlackList.cc_name = cc_name;
    UserCustomerBlackList.cc_sex = cc_sex;
    UserCustomerBlackList.cc_phone = cc_phone;
    if ("-1" != $("[name=cc_cardType]").val()) {
        UserCustomerBlackList.cc_cardType = $("[name=cc_cardType]").val();
        UserCustomerBlackList.cc_cardNum = cc_cardNum;
    }
    UserCustomerBlackList.black_comment = black_comment;
    UserCustomerBlackList.bl_state = "1";
    UserCustomerBlackList.cc_type = $("[name=cc_type]:checked").val();
    data.UserCustomerBlackList = JSON.stringify(UserCustomerBlackList);
    $.ajax({
        type: "POST",
        url: "/customer/saveCustomerBlackList",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (resultObj) {
            if (resultObj.msg == "success") {
                $(".cd-popup3").removeClass('is-visible3');
                swal("添加成功");
                window.location.reload();
            } else if (resultObj.code != 200) {
                swal("系统异常，请联系管理员");
                return;
            }
        }
    });
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

/**
 * 取消拉黑
 * @returns
 */
function cancel() {
    var id = 0;
    $("td .input_check").each(function () {
        if ($(this).is(":checked")) {
            id = $(this).parent().attr("data-id");
        }
    });
    if (id == 0) {
        swal('请选择一个！');
    } else {
        if (confirm("确认解除拉黑该客户？")) {

            var data = {};
            var UserCustomerBlackList = {};
            UserCustomerBlackList.bl_id = id;
            UserCustomerBlackList.bl_state = "0";
            data.UserCustomerBlackList = JSON.stringify(UserCustomerBlackList);
            $.ajax({
                type: "POST",
                url: "/customer/saveCustomerBlackList",
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (resultObj) {
                    if (resultObj.msg == "success") {
                        swal("取消拉黑客户成功");
                        window.location.reload();
                    } else if (resultObj.code != 200) {
                        swal("系统异常，请联系管理员");
                        return;
                    }
                }
            });
        }
    }
}