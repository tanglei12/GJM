$(function () {
    getCompanyInfo();

    //审核状态选择
    $("#bczl_box").show();
    $("#cg_type_box").show();
    $("#cg_endDate_box").show();
    $("select[name=er_state]").change(function () {
        //补充资料
        if($(this).val()==0){
            $("#bczl_box").show();
            $("#cg_type_box").hide();
            $("#cg_endDate_box").hide();
        }
        //通过申请
        if ($(this).val()==3){
            $("#bczl_box").hide();
            $("#cg_type_box").show();
            $("#cg_endDate_box").show();
        }
        //关闭申请
        if ($(this).val()==4){
            $("#bczl_box").hide();
            $("#cg_type_box").hide();
            $("#cg_endDate_box").hide();
        }
    })
})

//公司注册信息详情
function getCompanyInfo() {
    $.ajax({
        url: "/manageExamine/queryEnterprise",
        type : "get",
        data : {
            er_id:GetQueryString("er_id")
        },
        dataType : 'json'
    }).done(function (result) {
        var data = result.data;
        //企业全称(标题)
        $("#er_name_title").text(returnValue(data.er_name));
        //企业全称
        $("#er_name").text(returnValue(data.er_name));
        //社会信用代码(注册码)
        $("#er_bnusinessLicense").text(returnValue(data.er_bnusinessLicense));
        //企业营业执照
        $("#er_bnusinessLicenseimage").attr("src",isEmpty(returnValue(data.er_bnusinessLicenseimage)) ? "/resources/image/zkd/default-img.png" : data.er_bnusinessLicenseimage);
        //法定代表人姓名
        $("#er_person").text(returnValue(data.er_person));
        //法定代表人身份证号
        $("#er_cardNo").text(returnValue(data.er_cardNo));
        //国徽
        $("#er_positiveImage").attr("src",isEmpty(returnValue(data.er_positiveImage)) ? "/resources/image/zkd/default-img.png" : data.er_positiveImage);
        //个人信息页
        $("#er_oppositeImage").attr("src",isEmpty(returnValue(data.er_oppositeImage)) ? "/resources/image/zkd/default-img.png" : data.er_oppositeImage);
        //企业注册地址
        $("#er_registerAddress").text(returnValue(data.er_registerAddress));
        //企业简称
        $("#er_jname").text(returnValue(data.er_jname));
        //企业区域
        $("#er_region").text(returnValue(data.er_region));
        //企业规模
        $("#er_scale").text(returnValue(data.er_scale));
        //补充建议
        $("#bczl").text(returnValue(data.er_checkFeedback));
        //企业LOGO
        $("#er_logo").attr("src",isEmpty(returnValue(data.er_logo)) ? "/resources/image/zkd/default-img.png" : data.er_logo);
        //试用结束时间
        $("#cg_endDate").val(format(data.cg_endDate,"yyyy-MM-dd"));
        //费用等级
        returnSelect('cg_type', data.cg_type);
        //审核状态
        returnSelect('er_state', data.er_state);

        //审核状态判断
        if (data.er_state == '4'){
            $("#bczl_box").hide();
            $("#cg_type_box").hide();
            $("#cg_endDate_box").hide();
            $("#cg_endDate").attr("disabled","disabled");
            $("select[name=er_state]").attr("disabled","disabled");
            $("select[name=cg_type]").attr("disabled","disabled");
            $("#submit").attr("onclick","");
            $("#submit").css("background-color","#c6c6c6");
            $("#submit").text("已关闭")
        }
        if (data.er_state == '3'){
            $("#bczl_box").hide();
            $("#cg_type_box").show();
            $("#cg_endDate_box").show();
            $("#cg_endDate").attr("disabled","disabled");
            $("select[name=er_state]").attr("disabled","disabled");
            $("select[name=cg_type]").attr("disabled","disabled");
            $("#submit").attr("onclick","");
            $("#submit").css("background-color","#c6c6c6");
            $("#submit").text("已审核")
        }
        if(data.er_state == '1'){
            $("#bczl_box").hide();
            $("#cg_type_box").hide();
            $("#cg_endDate_box").hide();

            $("#er_state_box").html("<dt style='width: 157px;'><label class='title' style='width: 140px;'>审核状态</label></dt>\n" +
                "<dd>\n" +
                "    <select name='er_state' style='width: 200px'>\n" +
                "        <option value='4'>关闭申请</option>\n" +
                "    </select>\n" +
                "</dd>")
        }
        if(data.er_state == '0'){
            $("#bczl_box").show();
            $("#cg_type_box").hide();
            $("#cg_endDate_box").hide();
            $("#cg_endDate").attr("disabled","disabled");
            $("select[name=er_state]").attr("disabled","disabled");
            $("select[name=cg_type]").attr("disabled","disabled");
            $("#submit").attr("onclick","");
            $("#submit").css("background-color","#c6c6c6");
            $("#submit").text("补充资料中")
        }
        if(data.er_state == '2'){
            $("#bczl_box").hide();
        }
        $(".uploadImage img").viewer();
    })
}

/**
 * 提交审核
 */
function submit() {
    var cg_endDate = $("#cg_endDate").val();
    var er_state = $("select[name=er_state] option:selected").val();
    var cg_type = $("select[name=cg_type] option:selected").val();
    var bczl = $("#bczl").val();
    if(er_state==3 && isEmpty(cg_type)){
        $("select[name=cg_type]").msg("必填");
        return;
    }
    if(er_state==3 && isEmpty(cg_endDate)){
        $("#cg_endDate").msg("必填");
        return;
    }
    if(isEmpty(bczl) && er_state==0){
        $("#bczl").msg("必填");
        return;
    }

    $.ajax({
        url : "/manageExamine/submitCompanyExamine",
        type : "post",
        data:{
            cg_endDate :cg_endDate,
            er_state : er_state,
            cg_type : cg_type,
            er_checkFeedback : bczl,
            er_id:GetQueryString("er_id")
        },
        dataType : "json"
    }).done(function (result) {
        var data = result.data.Enterprise;
        if(result.code=='501'){
            $.hint.tip(result.msg,"error");
        }else {   //审核状态判断
            if (data.er_state == '4'){
                $("#bczl_box").hide();
                $("#cg_type_box").hide();
                $("#cg_endDate_box").hide();
                $("#cg_endDate").attr("disabled","disabled");
                $("select[name=er_state]").attr("disabled","disabled");
                $("select[name=cg_type]").attr("disabled","disabled");
                $("#submit").attr("onclick","");
                $("#submit").css("background-color","#c6c6c6");
                $("#submit").text("已关闭")
            }
            if (data.er_state == '3'){
                $("#bczl_box").hide();
                $("#cg_type_box").show();
                $("#cg_endDate_box").show();
                $("#cg_endDate").attr("disabled","disabled");
                $("select[name=er_state]").attr("disabled","disabled");
                $("select[name=cg_type]").attr("disabled","disabled");
                $("#submit").attr("onclick","");
                $("#submit").css("background-color","#c6c6c6");
                $("#submit").text("已审核")
            }
            if(data.er_state == '0'){
                $("#bczl_box").show();
                $("#cg_type_box").hide();
                $("#cg_endDate_box").hide();
                $("#cg_endDate").attr("disabled","disabled");
                $("select[name=er_state]").attr("disabled","disabled");
                $("select[name=cg_type]").attr("disabled","disabled");
                $("#submit").attr("onclick","");
                $("#submit").css("background-color","#c6c6c6");
                $("#submit").text("补充资料中")
            }
            if(data.er_state == '2'){
                $("#bczl_box").hide();
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

//时间日期插件
function dateUtil(){
    var date = new Date(returnDate(new Date()))
    data = date.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
    WdatePicker({
        minDate : new Date(),
        maxDate : date.setFullYear(date.getFullYear(), date.getMonth()+3, date.getDate()),
    });
}

//下拉选择匹配
function returnSelect(name, val) {
    $("select[name=" + name + "]>option").each(function () {
        if ($(this).val() == val) {
            $(this).attr("selected", "selected");
        }
    });
}