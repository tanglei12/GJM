$(function () {
    // 加载角色列表
    loadData();
    // 加载权限控制
    loadOperation();
    // 验证表单
    $("#listForm").validate({
        submitHandler: function () {
            ajaxFormSubmit();
        },
        rules: {
            ucr_name: {
                required: true,
                maxlength: 20,
                remote: {
                    url: "/valid/checkRoleName",
                    type: "post",
                    dataType: "json",
                    data: {
                        ucr_name: function () {
                            return $("#ucr_name").val().trim();
                        }
                    }
                }
            },
            ucr_remarks: {
                maxlength: 255
            }
        },
        messages: {
            ucr_name: {
                required: "输入角色名称！",
                maxlength: "最多20个汉字！",
                remote: "角色已存在！"
            },
            ucr_remarks: {
                maxlength: "超出长度限制！"
            }
        }
    });
});

/**
 * 查询角色列表
 * @param searchStr
 */
function loadData(searchStr) {
    $(".table-public").table({
        titleBg: "#34495E",
        titleColor: "#FFF",
        search: false,
        title: [
            {
                name: "编号",
                string: "ucr_id",
                parameter: ""
            },
            {
                name: "角色名称",
                string: "ucr_name",
                parameter: "",
                divSpan: ""
            },
            {
                name: "类型",
                string: "ucr_type",
                parameter: {
                    1: "超级管理员",
                    2: "管理员",
                    3: "普通用户"
                }
            },
            {
                name: "备注",
                string: "ucr_remarks",
                parameter: ""
            },
            {
                name: "创建时间",
                string: "ucr_date",
                parameter: "",
                format: "yyyy-MM-dd HH:mm:ss"
            }
        ],
        url: "/company/getRoleList",
        data: {"searchStr": searchStr},
        success: function (result) {

        }
    });
}

/**
 * 关闭添加角色div
 */
function closeAddRole() {
    $("#addRole").animate({right: -436}, 500);
    $("#addRole input[type='text'],#addRole input[type='hidden']").val("");
}

/**
 * 添加角色
 */
function addRole() {
    // 清空表单数据
    $("#addRole input[type='text'],#addRole input[type='hidden']").val("");
    $("#addRole").animate({right: 0}, 500);
}

/**
 * 删除角色
 */
function delRole() {
    var ucr_id = $(".table-public table tbody input:checked").parent().attr("data-id");
    if (typeof(ucr_id) == "undefined") {
        swal("请选择角色！");
        return;
    }
    swal({
        title: "确认删除吗？",
        text: "删除后将删除其所有关联数据，请谨慎操作！",
        showCancelButton: true,
        closeOnConfirm: true,
        confirmButtonText: "确认",
        confirmButtonColor: "#ec6c62"
    }, function () {
        $.post("/company/delRole", {"ucr_id": ucr_id}, function (result) {
            if (result.msg == "success") {
                loadData();
            }
        }, "json");
    });
}

/**
 * 设置权限
 */
function setPowers() {
    var ucr_id = $(".table-public table tbody input:checked").parent().attr("data-id");
    if (typeof(ucr_id) == "undefined") {
        swal("请选择角色！");
        return;
    }
    // 跳转权限操作页面
    window.parent.href_mo("/company/settingPowers?type=role&typeId=" + ucr_id, "设置权限", "角色管理");
}

/**
 * 添加角色提交
 */
function ajaxFormSubmit() {
    $.post(
        "/company/saveRole",
        $('#listForm').serialize(),
        function (result) {
            if (result.msg == "success") {
                loadData();
            }
            $("#addRole").animate({right: -436}, 500);
            ;
        }, "json");
}

/**
 * 人员导入
 */
function importPerson() {
    var ucr_id = $(".table-public table tbody input:checked").parent().attr("data-id");
    if (typeof(ucr_id) == "undefined") {
        swal("请选择角色！");
        return;
    }
    $("#importPerson").show();
    $("#roleId").val(ucr_id);
    // 加载已分配人员
    loadImported();
    // 加载未分配人员
    loadNotImported();
}

/**
 * 查询已分配人员
 */
function loadImported() {
    var ucr_id = $(".table-public table tbody input:checked").parent().attr("data-id");
    $.post(
        "/company/selectPersonFromRole",
        {"ucr_id": ucr_id},
        function (result) {
            $("#roleName").html(result.role.ucr_name + "(人员)");
            // 加载人员列表
            $("#imported").empty();
            for (var i = 0; i < result.personList.length; i++) {
                var person = result.personList[i];
                $("#imported").append("<li data-id='" + person.em_id + "' >" + person.em_name + "(" + person.em_phone + ")<i class='fa-times-circle' onclick='delPerson(" + person.em_id + ")'></i></li>");
            }
        }, "json");
}

/**
 * 查询未分配人员
 */
function loadNotImported() {
    $.ajax({
        type: "POST",
        url: "/company/getPersonsBySearch",
        data: "personSearch=" + $(".personSearch").val().trim(),
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $("#notImported").empty();
            $(result.personList).each(function (index, item) {
                $("#notImported").append("<li data-id='" + item.em_id + "' ondblclick='checkedPerson(this)'>" + item.em_name + "(" + item.em_phone + ")</li>");
            });
        }
    });
}

/**
 * 关闭人员导入div
 */
function closeImportPerson() {
    $("#importPerson").hide();
}

/**
 * 导入人员
 * @param ids
 */
function checkedPerson(ids) {
    var bool = true;
    $("#imported li").each(function () {
        if ($(this).attr("data-id") == $(ids).attr("data-id")) {
            bool = false;
            return false;
        }
    });
    if (bool) {
        $.ajax({
            type: "POST",
            url: "/company/addPersonToRole",
            data: {"ucr_id": $("#roleId").val(), "personId": $(ids).attr("data-id")},
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.msg == "success") {
                    var person = result.person;
                    $("#imported").append("<li data-id='" + person.em_id + "' >" + person.em_name + "(" + person.em_phone + ")<i class='fa-check'></i><i class='fa-times-circle' onclick='delPerson(" + person.em_id + ")'></i></li>");
                }
            }
        });
    }
}

/**
 * 删除人员
 * @param id
 */
function delPerson(id) {
    $.ajax({
        type: "POST",
        url: "/company/delPersonFromRole",
        data: {"personId": id},
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.msg == "success") {
                ($("#imported li[data-id='" + id + "']")).remove();
            }
        }
    });
}

/**
 * 按钮权限控制
 */
function loadOperation() {
    $(".content-operation").html("");
    var url = window.location.pathname + window.location.search;
    $.ajax({
        type: "POST",
        url: "/user/userJurisdiction",
        data: {
            url: url,
            ucps_type: 2
        },
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var button = "";
            if (result.menuLists.length < 1) {
                return;
            }
            for (var i = result.menuLists.length; i > 0; i--) {
                var item = result.menuLists[i - 1];
                button += "<button onclick='" + item.ucps_url + "' ><i class='" + item.ucps_icon + "'></i>" + item.ucps_name + "</button>"
            }
            $(".content-operation").html(button);
        }
    });
}