$(function () {
    getAgentInfo();
})

//房管员注册信息详情
function getAgentInfo() {
    $.ajax({
        url: "/manageExamine/queryAgentInfo",
        type: "get",
        data: {
            ca_id: GetQueryString("ca_id")
        },
        dataType: 'json'
    }).done(function (result) {
        var data = result.data;
        //房管员姓名(标题)
        $("#er_name_title").text(returnValue(data.ca_name));
        //房管员姓名
        $("#ca_name").text(returnValue(data.ca_name));
        //所属企业
        $("#ca_remark").text(returnValue(data.ca_remark));
        //联系电话
        $("#ca_phone").text(returnValue(data.ca_phone));
        //头像
        $("#ca_headImage").attr("src", isEmpty(returnValue(data.ca_headImage)) ? "/resources/image/zkd/default-img.png" : data.ca_headImage);
        //真实姓名
        $("#cai_name").text(returnValue(data.cai_name));
        //身份证号码
        $("#cai_number").text(returnValue(data.cai_number));
        //个人信息页
        $("#cai_positiveImage").attr("src", isEmpty(returnValue(data.cai_positiveImage)) ? "/resources/image/zkd/default-img.png" : data.cai_positiveImage);
        //国徽
        $("#cai_oppositeImage").attr("src", isEmpty(returnValue(data.cai_oppositeImage)) ? "/resources/image/zkd/default-img.png" : data.cai_oppositeImage);

        //审核状态
        returnSelect('ca_state', data.ca_state);

        //审核状态判断
        if (data.ca_state == '0' || data.ca_state == '3') {
            $("select[name=ca_state]").attr("disabled", "disabled");
            $("#submit").attr("onclick", "");
            $("#submit").css("background-color", "#c6c6c6");
            $("#submit").text("已审核")
        }
        $(".uploadImage img").viewer();
    })
}

/**
 * 提交审核
 */
function submit() {
    var ca_state = $("select[name=ca_state] option:selected").val();

    if (isEmpty(ca_state)) {
        $("#ca_state").msg("必填");
        return;
    }

    $.ajax({
        url: "/manageExamine/submitAgentExamine",
        type: "post",
        data: {
            ca_state: ca_state,
            ca_id: GetQueryString("ca_id")
        },
        dataType: "json"
    }).done(function (result) {
        var data = result.data.zkdCompanyAgent;
        if (result.code == '501') {
            $.hint.tip(result.msg, "error");
        } else {   //审核状态判断
            if (data.ca_state == '0' || data.ca_state == '3') {
                $("select[name=ca_state]").attr("disabled", "disabled");
                $("#submit").attr("onclick", "");
                $("#submit").css("background-color", "#c6c6c6");
                $("#submit").text("已审核")
            }
            $.jBox.prompt(result.msg, "提示", "success", {
                closed: function () {
                    parent.window.self.location.reload()
                }
            });
        }
    })

}

//url参数获取
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

//下拉选择匹配
function returnSelect(name, val) {
    $("select[name=" + name + "]>option").each(function () {
        if ($(this).val() == val) {
            $(this).attr("selected", "selected");
        }
    });
}
