$(function () {
    load_data();
});
function load_data() {
    var filterDateParams = [
        {name: "创建时间", value: "apr_createTime", sort: 'DESC'},
    ];
    var filterBars = [];
    var listParams = [
        {text: "用户类型", name: "user_type", param: ""},
        {text: "会员等级", name: "um_level", param: ""},
        {text: "用户姓名", name: "user_realName{/}user_phone", param: ""},
        {text: "用户昵称", name: "user_nickName", param: ""},
        {text: "创建时间", name: "um_create_time", param: "time"},
    ];

    // 获取列表数据
    $.table({
        filterDateParams: filterDateParams,
        listParams: listParams,
        filterBars: filterBars,
        filterWhere: true,
        ajaxParams: {
            url: "/activity/queryUserMember",
            beforeSend: function () {
            }
        },
        ajaxDone: function (h) {
            h.find(".list-content-item").each(function () {
                var data = $(this).find("[name=table-checkbox]").data("data");
            });
        },
        popup: {
            width: "73%",
            result: function (box, _data) {
            },
            close: function () {
            }
        }
    });
}