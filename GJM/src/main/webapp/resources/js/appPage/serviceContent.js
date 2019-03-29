var imageLoad = null;
var imageBill = null;
var md_ids = 0;
var user_id = null;
var so_id = getUrlParam("so_id");
var em_id = getUrlParam("em_id");
var hi_code = "";
var so_payObject = "";
var so_payNameNew = "";
var so_code = "";
var order_sn = "";
var ucc_order_sn = "";
var startPoint = "";
var endPoint = "";

$(function () {
    $("#service_addressbox").hide();
    $(".moveAddress").hide();
    $(".endTiemAfter").hide();
    $(".serviceContent").hide();
    $(".serviceBillb-box").hide();
    $(".servicePayOrder-box").hide();
    $(".servicePayOrderDetail-box").hide();
    $(".alert-content").height($(window).height());
    $(".alert-content-bg").height($(window).height())

    if (so_id != null) {
        data(so_id);
    }
    $(".alert-content-bg").click(function () {
        $(this).parent().hide();
    });

    $(".serviceMechanics").click(function () {
        $(".serviceContent").toggle();
        $(window).scrollTop(300);
    });

    //客户服务费信息
    $(document).on("click", "[name=conContractRecord]", function (e) {
        e.stopPropagation();

        var _this = $(this);
        var box = $(".pullup-box");
        if (box.length > 0) {
            box.remove();
            _this.removeClass("error-bg").addClass("next-bg").find("i").removeClass("fa-remove").addClass("fa-reorder");
            return;
        }
        box = $('<div class="pullup-box"><div class="pullup-box-head">客户服务费</div><div class="pullup-box-main">加载中...</div></div>').appendTo("body");
        _this.removeClass("next-bg").addClass("error-bg").find("i").removeClass("fa-reorder").addClass("fa-remove");


        $.ajax({
            type: "POST",
            url: "/service/queryServiceInfo",
            data: {
                so_code: so_code
            },
            dataType: "json",
        }).done(function (result) {
            var main = box.find(".pullup-box-main");

            if (result.code != 200) return main.html(result.msg);

            var serviceOrderInfo = result.data.serviceOrderInfo;

            main.empty();
            var html = "";
            html += "   <dl class='pullup-box-item' style='line-height: 15px;font-size: 13px;color: #ff6666;'>";
            html += "       <dt>建筑面积</dt>";
            html += "       <dd><label><label id='houseInfoLabel'> " + (isEmpty(serviceOrderInfo.contractObject_Date_f) ? "无" : (returnFloat(serviceOrderInfo.hi_measure) + " 平米，" + returnNumber(serviceOrderInfo.hi_houseS) + " 室 " + returnNumber(serviceOrderInfo.hi_houseT) + " 厅 " + returnNumber(serviceOrderInfo.hi_houseW) + " 卫")) + "</label></label></dd>";
            html += "   </dl>";
            html += "   <dl class='pullup-box-item' style='line-height: 15px;font-size: 13px;color: #ff6666;'>";
            html += "       <dt>托管期限</dt>";
            html += "       <dd><label><label id='contractObject_TG'> " + (isEmpty(serviceOrderInfo.contractObject_Date_f) ? "无" : ((returnDate(serviceOrderInfo.contractObject_Date_f) + "~" + returnDate(serviceOrderInfo.contractObject_DeadlineTime_f)) + " | " + returnContractOptionState(serviceOrderInfo.contractObject_OptionState_f).text + " | " + returnValue(serviceOrderInfo.cc_name_f) + " | 包修费: " + (returnFloat(serviceOrderInfo.surplus_serveMoney_f) + "/" + returnFloat(serviceOrderInfo.init_serveMoney_f) + " 元"))) + "</label></label></dd>";
            html += "   </dl>";
            html += "   <dl class='pullup-box-item' style='line-height: 15px;font-size: 13px;color: #ff6666;'>";
            html += "       <dt>租赁期限</dt>";
            html += "       <dd><label><label id='contractObject_ZL'> " + (isEmpty(serviceOrderInfo.contractObject_Date_z) ? "无" : ((returnDate(serviceOrderInfo.contractObject_Date_z) + "~" + returnDate(serviceOrderInfo.contractObject_DeadlineTime_z)) + " | " + returnContractOptionState(serviceOrderInfo.contractObject_OptionState_z).text + " | " + returnValue(serviceOrderInfo.cc_name_z) + " | 服务费: " + (returnFloat(serviceOrderInfo.surplus_serveMoney_z) + "/" + returnFloat(serviceOrderInfo.init_serveMoney_z) + " 元"))) + "</label></label></dd>";
            html += "   </dl>"
            main.append(html);
        });

        box.on("click", function (e) {
            e.stopPropagation();
        });
        $(document).on("click", function () {
            box.remove();
            _this.removeClass("error-bg").addClass("next-bg").find("i").removeClass("fa-remove").addClass("fa-reorder");
        });
    });

    //拒绝接单弹窗
    $(document).on("click", ".refuseBillb", function (e) {
        e.stopPropagation();

        var _this = $(this);
        var box = $(".pullup-box");
        if (box.length > 0) {
            box.remove();
            _this.removeClass("error-bg").addClass("next-bg").find("i").removeClass("fa-remove").addClass("fa-reorder");
            return;
        }
        box = $('<div class="pullup-box"><div class="pullup-box-head">拒绝接单</div><div class="pullup-box-main">加载中...</div></div>').appendTo("body");
        _this.removeClass("next-bg").addClass("error-bg").find("i").removeClass("fa-reorder").addClass("fa-remove");
        var main = box.find(".pullup-box-main");
        main.empty();
        var html = "";
        html += "   <dl class='pullup-box-item' style='line-height: 15px;font-size: 13px;color: #ff6666;'>";
        html += "       <dt style='width: 100%;height: auto;'><input class='item-button-style' onclick='buttonStyle(this)' type='button' value='客户放弃'><input class='item-button-style' onclick='buttonStyle(this)'  type='button' value='派单错误'><input class='item-button-style' type='button' onclick='buttonStyle(this)'  value='工作饱和'><input class='item-button-style' type='button' onclick='buttonStyle(this)'  value='人不在岗'><input class='item-button-style' onclick='buttonStyle(this)'  type='button' value='其他原因'></dt>";
        html += "   </dl>";
        html += "   <dl class='pullup-box-item' style='line-height: 15px;font-size: 13px;color: #ff6666;'>";
        html += "       <dt style='width: 100%;height: auto;'><input onclick='refuseBillb()' class='item-button-style' style='background-color: #ff6666;color:#fff;text-align: center;border: none'  type='button' value='保存'></dt>";
        html += "   </dl>";
        main.append(html);
        box.on("click", function (e) {
            e.stopPropagation();
        });
        $(document).on("click", function () {
            box.remove();
            _this.removeClass("error-bg").addClass("next-bg").find("i").removeClass("fa-remove").addClass("fa-reorder");
        });

    });
});


/**
 * 选择拒绝接单理由
 */
function buttonStyle(val) {
    $(".item-button-style-check").removeClass("item-button-style-check");
    $(val).addClass("item-button-style-check");
}

/**
 * 拒绝接单
 */
function refuseBillb() {
    var theLength = $(".item-button-style-check").length;
    if (theLength == 0) {
        $.hint.tip("您必须选择一个拒绝理由");
        return;
    }
    var data = {
        soState: "2100",
        so_id: so_id,
        sp_id: $("#em_id").val(),
        em_id: em_id,
        remark: $(".item-button-style-check").val()
    }

    $.ajax({
        type: "POST",
        url: "/appService/serviceTracks",
        data: data,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            console.log(result);
            if (result.code != 200) {
                $.hint.close();
                $.hint.tip("拒绝接单失败", "error");
                return;
            }
            $.hint.close();
            $.hint.tip("您已拒绝接单成功", "ok")
            $(".serviceProblem").hide();
            $(".serviceBillb-box").hide();
            $(".serviceStartAppointment").hide();
            $(".serviceFeedbackEnd").hide();
            $(".endTiemAfter").show();

            $("#service_types1").text("已受理-待派单").addClass("hint");
            $(".content").css("margin-bottom", "48px");

        }
    });
}

/**
 * 服务描述
 */
function circleClick() {
    $(".alert-content").show();
}

/**
 * 获取数据
 * @param md_id
 */
function data(md_id) {
    md_ids = md_id;
    $.ajax({
        type: "POST",
        url: "/appService/serviceOrderInfo",
        data: {
            so_id: so_id,
            em_id: em_id
        },
        dataType: "json",
    }).done(function (result) {

        //房屋code
        hi_code = result.serviceOrderVo.hi_code;
        so_payObject = result.serviceOrderVo.so_payObject;
        so_payNameNew = result.serviceOrderVo.so_payNameNew;
        so_code = result.serviceOrderVo.so_code;

        $("#em_id").val(result.serviceOrderVo.so_currentCharger);
        var soState = result.serviceOrderVo.so_state;
        //订单状态
        $("#service_types1").text(returnServiceState(soState).text + "-" + returnServiceOperateState(soState).text);
        $("#service_types1").addClass(returnServiceState(soState).style);

        //申请类型
        var problemStnamep = "";
        var problemStnamep1 = "";
        var service_st_name = "";
        $.each(result.serviceOrderItemVos, function (index, item) {
            if (item.st_namep != null) {
                problemStnamep = "-" + item.st_namep + "";
                problemStnamep1 = "" + item.st_namep + "";
            }
            if (item.st_name != null) {
                service_st_name += "[" + item.st_name + "]";
            }
        })
        $("#service_types").text(result.serviceOrderVo.sm_name);//申请类型
        $("#service_st_name").text(problemStnamep1 + (service_st_name == "" ? "" : "-" + service_st_name));//服务项目

        //付费人
        $("#so_payNameNew").text(returnValue(result.serviceOrderVo.so_payNameNew));
        $("#so_payPhoneNew").text(returnValue(result.serviceOrderVo.so_payPhoneNew));

        //联系方式
        $("#service_custmorName").text(returnValue(result.serviceOrderVo.so_contractor));
        $("#service_custmorPhone").text(returnValue(result.serviceOrderVo.so_contractPhone));


        var soPayObject = result.serviceOrderVo.so_payObject;
        switch (soPayObject) {
            case 4:
                soPayObject = "租客";
                break;
            case 5:
                soPayObject = "房东";
                break;
            case 2:
                soPayObject = "管家";
                break;
            case 3:
                soPayObject = "门店";
                break;
            case 6:
                soPayObject = "用户";
                break;
            default :
                soPayObject = "无付费对象";
                break;
        }
        $("#service_payObject").text(soPayObject);

        var soProblem = result.serviceOrderVo.so_problem;
        $("#service_problem").text(soProblem == null ? "" : soProblem);

        // $(".telPhone button").attr("onclick", "OCServiceContent.servicePhone(\"" + result.serviceOrderVo.hi_code + "\"," + so_id + ")");
        $(".telPhone button").attr("onclick", "servicePhone(\"" + result.serviceOrderVo.hi_code + "\"," + so_id + ")");

        $("#service_date").text(returnDate(result.serviceOrderVo.so_targetTime, "yyyy-MM-dd HH:mm"));
        $("#service_sdate").text(returnDate(result.serviceOrderVo.so_createTime, "yyyy-MM-dd HH:mm"));
        var mtkendtime = result.serviceOrderVo.spro_expectEndDuration;//预计时长

        //预计时长
        if (mtkendtime != null) {
            $(".endTiemAfter dd").html("" + mtkendtime + "<span style='margin-left: 5px'>小时</span>");
        }

        var soCurrentChargerName = result.serviceOrderVo.so_currentChargerName;
        $("#service_soCurrentChargerName").text(soCurrentChargerName == null ? "" : soCurrentChargerName);

        var siPath = +result.serviceImageVos.si_path;
        if (siPath != null) {
            $("#customerImage").attr("src", "" + siPath + "");
        } else {
            $("#customerImage").hide();
        }

        //现场确认
        $.each(result.serviceProcessProblem, function (index, item) {
            $("#service_ProcessProblem").text(item.spp_isConform == 1 ? ("相符" + (isEmpty(item.spp_content) ? "" : "-" + item.spp_content)) : ("不相符" + (isEmpty(item.spp_content) ? "" : "-" + item.spp_content)));
            $("#processProblem").show()
        })

        //根据坐标调用地图

        startPoint = result.serviceOrderVo.startPoint;
        endPoint = result.serviceOrderVo.endPoint;

        // 显示费用清单图片
        var imgList = new Array();
        var htms = "";
        var serviceImageVos = result.serviceImageVos;
        $(serviceImageVos).each(function (index, item) {
            htms += "<div class='image-item'><img class='image-item-img' src='" + item.si_path + "' data-url='" + item.si_path + "'  data-preview-src data-preview-group='1'> </div>"
            imgList.push(item.si_path);
        });

        //没有清单则隐藏服务清单板块
        if (serviceImageVos == null || serviceImageVos == "") {
            $("#service-image").hide();
        }

        var typet = getUrlParam("type");
        var sproFollowState = result.serviceOrderVo.spro_followState;

        // var order_status = result.payOrder.order_status;
        var payOrder = result.payOrder;

        //当前登录是否是服务人员,如果为空,返回true，表示不是服务人员
        var isServicePersonVo = isEmpty(result.servicePersonVo);

        if (isServicePersonVo ? false : result.serviceOrderVo.so_currentCharger == result.servicePersonVo.sp_id) {
            switch (result.serviceOrderVo.so_state) {
                case 2200 ://已派单
                    $(".serviceBillb-box").show();
                    $(".serviceStartAppointment").hide();
                    $(".serviceFeedbackEnd").hide();
                    $(".content").css("margin-bottom", "48px");
                    break;
                case 3100://已接单

                    $(".serviceProblem").hide();
                    $(".serviceBillb-box").hide();
                    $(".serviceStartAppointment").show();
                    $(".serviceFeedbackEnd").hide();
                    $(".endTiemAfter").show();
                    $(".content").css("margin-bottom", "48px");
                    break;

                case 3200://处理中-开始服务
                    if (sproFollowState == '3200') {
                        $(".serviceBillb-box").hide();
                        $(".serviceStartAppointment").hide();

                        $(".endTiemAfter").show();
                        $(".serviceFeedbackEnd").show();
                        $(".content").css("margin-bottom", "48px");
                        $("#service_ProcessProblem").attr("onclick", "serviceProblem()");
                    } else if (sproFollowState == '3212' || sproFollowState == '3220') {
                        $(".serviceBillb-box").hide();
                        $(".serviceStartAppointment").hide();
                        $(".endTiemAfter").show();
                        $(".serviceFeedbackEnd").show();
                        $(".content").css("margin-bottom", "48px");
                        $("#service_ProcessProblem").attr("onclick", "serviceProblem()");
                    } else if (sproFollowState == '3230') {
                        $(".serviceBillb-box").hide();
                        $(".serviceStartAppointment").hide();
                        $(".endTiemAfter").show();
                        if (isEmpty(result.serviceMoney) || result.serviceMoney.is_order == 0) {
                            $(".serviceCostList-box").show();
                        } else {
                            $(".servicePayOrder-box").show();
                        }
                        $("#service_ProcessProblem").attr("onclick", "serviceProblem()");
                        $(".content").css("margin-bottom", "48px");
                    } else if (sproFollowState == '3232') {
                        $(".serviceBillb-box").hide();
                        $(".serviceStartAppointment").hide();
                        $(".serviceFeedbackEnd").hide();
                        $(".endTiemAfter").show();
                        if (!(payOrder) && payOrder.order_status==2){
                            $(".servicePayOrder-box").show();
                        }else {
                            $(".servicePayOrderDetail-box").show();
                        }
                        $(".content").css("margin-bottom", "48px");
                    }
                    break;

                case 3300://已处理
                    $(".serviceBillb-box").hide();
                    $(".serviceStartAppointment").hide();
                    $(".serviceFeedbackEnd").hide();
                    $(".endTiemAfter").show();
                    if (!(payOrder) && payOrder.order_status==2){
                        $(".servicePayOrder-box").show();
                    }else {
                        $(".servicePayOrderDetail-box").show();
                    }
                    $(".content").css("margin-bottom", "48px");
                    break;
                case 3400://已结算
                    $(".serviceBillb-box").hide();
                    $(".serviceStartAppointment").hide();
                    $(".serviceFeedbackEnd").hide();
                    $(".endTiemAfter").show();
                    if (!(payOrder) && payOrder.order_status==2){
                        $(".servicePayOrder-box").show();
                    }else {
                        $(".servicePayOrderDetail-box").show();
                    }
                    $(".content").css("margin-bottom", "48px");
                    break;
                case 4100:
                    $(".serviceBillb-box").hide();
                    $(".serviceStartAppointment").hide();
                    $(".serviceFeedbackEnd").hide();
                    $(".endTiemAfter").show();
                    if (!(payOrder) && payOrder.order_status==2){
                        $(".servicePayOrder-box").show();
                    }else {
                        $(".servicePayOrderDetail-box").show();
                    }
                    $(".content").css("margin-bottom", "48px");
                    break;
                default:
                    $(".serviceBillb-box").hide();
                    $(".serviceStartAppointment").hide();
                    $(".serviceFeedbackEnd").hide();
                    $(".endTiemAfter").show();
                    $(".content").css("margin-bottom", "48px");
                    break;
            }
        } else {
            $(".endTiemAfter").show();
            $(".serviceContent .service-image").hide();
        }

        if (result.serviceOrderVo.so_state == null) {
            $(".endTiemAfter").hide();
        }
        // 服务进度
        var html = "";
        if (result.serviceRecord != null) {
            var serviceRecord = result.serviceRecord;
            for (var i = 0; i < serviceRecord.length; i++) {
                var dateTime = returnDate(serviceRecord[i].sr_createTime, "yyyy-MM-dd HH:mm");
                switch (serviceRecord[i].ss_code) {
                    case 1100:
                        html += '<div class="servcie-content-div">';

                        html += '	<div class="service-contents">';
                        html += '		<label>' + serviceRecord[i].sr_content_inside + '</label>';
                        html += '	</div>';
                        html += '	<div class="service-time">';
                        html += '		<label class="fontYear">' + dateTime.split(" ")[0] + ' ' + dateTime.split(" ")[1] + '</label>';
                        html += '	</div>';
                        html += '	<div class="service-line"><div class="line1"></div><div class="line2"></div></div>';
                        html += '</div>';
                        $(".serviceTitle_xiang").eq(0).attr("class", "serviceTitle_xiang");
                        break;
                    case 2100:
                        html += '<div class="servcie-content-div">';

                        html += '	<div class="service-contents">';
                        html += '		<label>' + serviceRecord[i].sr_content_inside + '</label>';
                        html += '		<label>' + serviceRecord[i].sr_content_business + '</label>';
                        html += '	</div>';
                        html += '	<div class="service-time">';
                        html += '		<label class="fontYear">' + dateTime.split(" ")[0] + ' ' + dateTime.split(" ")[1] + '</label>';
                        html += '	</div>';
                        html += '	<div class="service-line"><div class="line1"></div><div class="line2"></div></div>';
                        html += '</div>';
                        $(".serviceTitle_xiang").eq(1).attr("class", "serviceTitle_xiang");
                        break;
                    case 2200:
                        html += '<div class="servcie-content-div">';

                        html += '	<div class="service-contents">';
                        html += '		<label>' + serviceRecord[i].sr_content_inside + '</label>';
                        html += '	</div>';
                        html += '	<div class="service-time">';
                        html += '		<label class="fontYear">' + dateTime.split(" ")[0] + ' ' + dateTime.split(" ")[1] + '</label>';
                        html += '	</div>';
                        html += '	<div class="service-line"><div class="line1"></div><div class="line2"></div></div>';
                        html += '</div>';
                        $(".serviceTitle_xiang").eq(2).attr("class", "serviceTitle_xiang");
                        break;
                    case 3100:
                        html += '<div class="servcie-content-div">';

                        html += '	<div class="service-contents">';
                        html += '		<label>' + serviceRecord[i].sr_content_inside + '</span></label>';
                        html += '	</div>';
                        html += '	<div class="service-time">';
                        html += '		<label class="fontYear">' + dateTime.split(" ")[0] + ' ' + dateTime.split(" ")[1] + '</label>';
                        html += '	</div>';
                        html += '	<div class="service-line"><div class="line1"></div><div class="line2"></div></div>'
                        html += '</div>';
                        $(".serviceTitle_xiang").eq(3).attr("class", "serviceTitle_xiang");
                        break;

                    case 3210:
                        html += '<div class="servcie-content-div">';

                        html += '	<div class="service-contents">';
                        html += '		<label>' + serviceRecord[i].sr_content_inside + '</span></label>';
                        html += '	</div>';
                        html += '	<div class="service-time">';
                        html += '		<label class="fontYear">' + dateTime.split(" ")[0] + ' ' + dateTime.split(" ")[1] + '</label>';
                        html += '	</div>';
                        html += '	<div class="service-line"><div class="line1"></div><div class="line2"></div></div>'
                        html += '</div>';
                        $(".serviceTitle_xiang").eq(4).attr("class", "serviceTitle_xiang");
                        break;
                    case 3212:
                        html += '<div class="servcie-content-div">';

                        html += '	<div class="service-contents">';
                        html += '		<label>' + serviceRecord[i].sr_content_inside + '</span></label>';
                        html += '	</div>';
                        html += '	<div class="service-time">';
                        html += '		<label class="fontYear">' + dateTime.split(" ")[0] + ' ' + dateTime.split(" ")[1] + '</label>';
                        html += '	</div>';
                        html += '	<div class="service-line"><div class="line1"></div><div class="line2"></div></div>'
                        html += '</div>';
                        $(".serviceTitle_xiang").eq(5).attr("class", "serviceTitle_xiang");
                        break;
                    case 3220:
                        html += '<div class="servcie-content-div">';

                        html += '	<div class="service-contents">';
                        html += '		<label>' + serviceRecord[i].sr_content_inside + '</span></label>';
                        html += '	</div>';
                        html += '	<div class="service-time">';
                        html += '		<label class="fontYear">' + dateTime.split(" ")[0] + ' ' + dateTime.split(" ")[1] + '</label>';
                        html += '	</div>';
                        html += '	<div class="service-line"><div class="line1"></div><div class="line2"></div></div>'
                        html += '</div>';
                        $(".serviceTitle_xiang").eq(6).attr("class", "serviceTitle_xiang");
                        break;
                    case 3230:
                        html += '<div class="servcie-content-div">';

                        html += '	<div class="service-contents">';
                        html += '		<label>' + serviceRecord[i].sr_content_inside + '</span></label>';
                        html += '	</div>';
                        html += '	<div class="service-time">';
                        html += '		<label class="fontYear">' + dateTime.split(" ")[0] + ' ' + dateTime.split(" ")[1] + '</label>';
                        html += '	</div>';
                        html += '	<div class="service-line"><div class="line1"></div><div class="line2"></div></div>'
                        html += '</div>';
                        $(".serviceTitle_xiang").eq(7).attr("class", "serviceTitle_xiang");
                        break;

                    case 3232:
                        html += '<div class="servcie-content-div">';

                        html += '	<div class="service-contents">';
                        html += '		<label>' + serviceRecord[i].sr_content_inside + '</span></label>';
                        html += '	</div>';
                        html += '	<div class="service-time">';
                        html += '		<label class="fontYear">' + dateTime.split(" ")[0] + ' ' + dateTime.split(" ")[1] + '</label>';
                        html += '	</div>';
                        html += '	<div class="service-line"><div class="line1"></div><div class="line2"></div></div>'
                        html += '</div>';
                        $(".serviceTitle_xiang").eq(8).attr("class", "serviceTitle_xiang");
                        break;

                    case 3300:
                        html += '<div class="servcie-content-div">';

                        html += '	<div class="service-contents">';
                        html += '		<label>' + serviceRecord[i].sr_content_inside + '</label>';
                        html += '	</div>';
                        html += '	<div class="service-time">';
                        html += '		<label class="fontYear">' + dateTime.split(" ")[0] + ' ' + dateTime.split(" ")[1] + '</label>';
                        html += '	</div>';
                        html += '	<div class="service-line"><div class="line1"></div><div class="line2"></div></div>';
                        html += '</div>';
                        $(".serviceTitle_xiang").eq(9).attr("class", "serviceTitle_xiang");
                        break;
                    case 3400:
                        html += '<div class="servcie-content-div">';

                        html += '	<div class="service-contents">';
                        html += '		<label>' + serviceRecord[i].sr_content_inside + '</label>';
                        html += '	</div>';
                        html += '	<div class="service-time">';
                        html += '		<label class="fontYear">' + dateTime.split(" ")[0] + ' ' + dateTime.split(" ")[1] + '</label>';
                        html += '	</div>';
                        html += '	<div class="service-line"><div class="line1"></div><div class="line2"></div></div>';
                        html += '</div>';
                        $(".serviceTitle_xiang").eq(10).attr("class", "serviceTitle_xiang");
                        break;

                    case 4100:
                        html += '<div class="servcie-content-div">';

                        html += '	<div class="service-contents">';
                        html += '		<label>服务评价：<span id="simplestar" style="margin-top: 6px;"><img id="image0" src="/resources/image/T1j.png"><img id="image1" src="/resources/image/T1j.png"><img id="image2" src="/resources/image/T1j.png"><img id="image3" src="/resources/image/T1j.png"><img id="image4" src="/resources/image/T1j.png"></span></label>';
                        html += '	</div>';
                        html += '	<div class="service-time">';
                        html += '		<label class="fontYear">' + dateTime.split(" ")[0] + ' ' + dateTime.split(" ")[1] + '</label>';
                        html += '	</div>';

                        html += '	<div class="service-line"><div class="line1"></div><div class="line2"></div></div>';
                        html += '</div>';
                        $(".serviceTitle_xiang").eq(11).attr("class", "serviceTitle_xiang");
                        break;

                    case 5020:
                        html += '<div class="servcie-content-div">';
                        html += '	<div class="service-contents">';
                        html += '		<label>' + serviceRecord[i].sr_content_inside + '</label>';
                        html += '	</div>';
                        html += '	<div class="service-time">';
                        html += '		<label class="fontYear">' + dateTime.split(" ")[0] + ' ' + dateTime.split(" ")[1] + '</label>';
                        html += '	</div>';
                        html += '	<div class="service-line"><div class="line1"></div><div class="line2"></div></div>';
                        html += '</div>';
                        //$(".serviceTitle_xiang").eq(12).attr("class", "serviceTitle_xiang");
                        break;
                }
                // }
            }
            $(".service-content").html(html);
            if (result.userCenterUserFraction != null) {
                var score = parseInt(result.userCenterUserFraction.uf_fraction);
                $("#simplestar img").each(function () {
                    var index = parseInt($(this).attr("id").replace("image", ""));
                    if (index < score) {
                        if (score <= 2) {
                            $(this).attr("src", "/resources/image/T1lg.png");
                        } else {
                            $(this).attr("src", "/resources/image/T1e.png");
                        }
                    }
                });
            }
            $(".service-line").last().remove();

            order_sn = result.order_sn;
            ucc_order_sn = result.ucc_order_sn;

        }
    });
}

/**
 * 服务接单
 */
function serviceBillSubmit() {

    $.hint.box("<div style='display: flex;line-height: 36px;font-size: 14px;'><input class='input_class' id='spro_expectEndDuration' type='number' placeholder='预计时长' style='width: 40px' ><div style='padding-left: 10px;'>小时</div></div>", function (box) {
        var spro_expectEndDuration = $("#spro_expectEndDuration").val();

        if (spro_expectEndDuration == null || spro_expectEndDuration == "") {
            $("#spro_expectEndDuration").msg("必填");
            return;
        }

        var data = {
            soState: "3100",
            so_id: so_id,
            sp_id: $("#em_id").val(),
            em_id: em_id,
            spro_expectEndDuration: spro_expectEndDuration
        }

        $.ajax({
            type: "POST",
            url: "/appService/serviceTracks",
            data: data,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {
                console.log(result);
                if (result.code != 200) {
                    $.hint.close();
                    $.hint.tip("接单失败", "error");
                    return;
                }
                $.hint.close();
                $.hint.tip("您已接单成功", "ok")
                $(".serviceProblem").hide();
                $(".serviceBillb-box").hide();
                $(".serviceStartAppointment").show();
                $(".serviceFeedbackEnd").hide();
                $(".endTiemAfter").show();
                //预计结束
                if (spro_expectEndDuration != null) {
                    $(".endTiemAfter dd").html("" + spro_expectEndDuration + "<span style='margin-left: 5px'>小时</span>");
                }
                $("#service_types1").text("已接单-待处理").addClass("hint");
                $(".content").css("margin-bottom", "48px");

            }
        });

        return true;
    });
}


/**
 * 预约上门
 */
function appointment() {
    $.hint.box("<div style='  display: flex;line-height: 36px;font-size: 14px;'><input class='input_class' id='appointment' type='datetime-local'  placeholder='预约上门' style='width: 40px' ><div style='padding-left: 10px;'>上门时间</div></div>", function (box) {
        var appointment = $("#appointment").val();
        if (appointment == null || appointment == "") {
            $("#appointment").msg("必填");
            return;
        }
        appointment = format(appointment, "yyyy-MM-dd HH:mm").replace("T", " ");
        var data = {
            soState: "3210",
            so_id: so_id,
            em_id: em_id,
            remark: appointment
        }
        $.ajax({
            type: "POST",
            url: "/appService/serviceTracks",
            data: data,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
        }).done(function (result) {
            console.log(result);
            if (result.code != 200) {
                $.hint.close();
                $.hint.tip("请联系管理员", "error");
                return;
            }
            $.hint.close();
            $.hint.tip("预约上门成功", "ok")
        })
    })
}

/**
 * 到达现场
 */
function startServiceBillSubmit() {
    if (!confirm("是否到达现场")) {
        return;
    }
    var data = {
        soState: "3212",
        em_id: em_id,
        so_id: so_id
    }
    $.ajax({
        type: "POST",
        url: "/appService/serviceTracks",
        data: data,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            if (result.code == 200) {
                //alert("接下来请去服务吧！");
                $.hint.tip("接下来请去服务吧", "ok");
                $(".serviceBillb").hide();
                $(".serviceStartAppointment").hide();
                //$(".serviceProblem").show();
                $(".serviceFeedbackEnd").show();
                $("#service_types1").text("处理中-待完成").addClass("hint");
            }
            $(".content").css("margin-bottom", "48px");
        }
    });
}

/**
 * 完成服务
 */
function endServiceBillSubmit() {
    if (confirm("是否确认完成服务!")) {
        var data = {
            soState: "3230",
            em_id: em_id,
            so_id: so_id
        }
        $.ajax({
            type: "POST",
            url: "/appService/serviceTracks",
            data: data,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {
                if (result.code == 201) {
                    $.hint.tip(result.msg, "error");
                    return;
                }
                if (result.code == 200) {
                    $(".serviceBillb").hide();
                    $(".serviceStartAppointment").hide();
                    $(".serviceFeedbackEnd").hide();
                    $(".serviceAutograph").show();
                    $("#service_types1").text("处理中-待完成").addClass("hint");
                    $(".serviceCostList-box").show();
                    $(".servicexcproblem button").attr("onclick", "");
                    $.hint.tip("确认完成服务成功", "ok");
                } else {
                    $.hint.tip("确认完成服务失败", "error");
                }
                $(".content").css("margin-bottom", "48px");
            }
        });
    }
}

/**
 * 保存服务图片
 *
 * @param path 图片路径
 */
function addServiceImage(path) {
    $.ajax({
        type: "POST",
        url: "/service/addServiceImage",
        data: {
            md_id: $("#md_id").val(),
            image_url: path
        },
        dataType: "json",
        error: function (e) {
            alert("系统异常，请联系管理员");
        },
        success: function (result) {
            if (result.msg == "success") {
                console.log("成功");
            }
        }
    });
}

/**
 * 删除服务图片
 *
 * @param path 图片路径
 */
function deleteServiceImage(path) {
    $.ajax({
        type: "POST",
        url: "/service/deleteServiceImage",
        data: {
            image_url: path
        },
        dataType: "json",
        error: function (e) {
            alert("系统异常，请联系管理员");
        },
        success: function (result) {
            if (result.msg == "success") {
                console.log("成功");
            }
        }
    });
}

/**
 * 到达现场
 */

/*function serviceProblem() {
    OCServiceContent.serviceScene(so_id);// 现场确认
}*/

/**
 * 保存服务图片
 *
 * @param path 图片路径
 */
function addServiceImage1(path) {
    $.ajax({
        type: "POST",
        url: "/service/addServiceImageMoney",
        data: {
            md_id: $("#md_id").val(),
            image_url: path
        },
        dataType: "json",
        error: function (e) {
            alert("系统异常，请联系管理员");
        },
        success: function (result) {
            if (result.msg == "success") {
                console.log("成功");
            }
        }
    });
}

/**
 * 删除服务图片
 *
 * @param path 图片路径
 */
function deleteServiceImage1(path) {
    $.ajax({
        type: "POST",
        url: "/service/deleteServiceImageMoney",
        data: {
            image_url: path
        },
        dataType: "json",
        error: function (e) {
            alert("系统异常，请联系管理员");
        },
        success: function (result) {
            if (result.msg == "success") {
                console.log("成功");
            }
        }
    });
}

/**
 * 服务清单提交
 */

/*function serviceCostListSubmit() {
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        window.location.href = "/appPage/serviceCostList?md_id=" + so_id;
    } else if (/(Android)/i.test(navigator.userAgent)) {
        OCServiceContentserviceCostList - box(so_id);
    }
}*/

/**
 * 现场确认费用
 */
function serviceMoney() {
    // OCServiceContent.serviceMoney(so_id);//确认费用
    window.location.href = "/appService/serviceMoney?md_id=" + so_id + "&em_id=" + em_id + "";
}

/**
 * 支付订单
 */
function servicePayOrder() {
    window.location.href = "/appService/serviceOrderPay?so_id=" + so_id + "&em_id=" + em_id + "&ucc_order_sn=" + ucc_order_sn + "&order_sn=" + order_sn;
}

/**
 * 现场反馈
 */
function sceneFeedback() {
    window.location.href = "/appService/sceneFeedback?so_id=" + so_id + "&em_id=" + em_id + "";
}

/**
 * 拨打电话
 */
function servicePhone(hiCode) {
    window.location.href = "/appService/servicePhone?so_id=" + so_id + "&hiCode=" + hiCode + "";
}

/**
 * 调用百度地图
 * */
function toBaiduMap() {
    var data = {};
    var latstarts = {};
    var latEnds = {};
    if(startPoint != null && startPoint != ""){
        var start = startPoint.split(",");
        if(parseFloat(start[0]) >= 0 && parseFloat(start[0]) <= 90){
            latstarts.latitude = start[0];
            latstarts.longitude = start[1];
        }else{
            latstarts.latitude = start[1];
            latstarts.longitude = start[0];
        }
    }
    if(endPoint != null && endPoint != ""){
        var end = endPoint.split(",");
        if(parseFloat(end[0]) >= 0 && parseFloat(end[0]) <= 90) {
            latEnds.latitude = end[0];
            latEnds.longitude = end[1];
        }else{
            latEnds.latitude = end[1];
            latEnds.longitude = end[0];
        }
    }
    data.latStart = JSON.stringify(latstarts);
    data.latEnd = JSON.stringify(latEnds);
    var json = JSON.stringify(data);
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        window.webkit.messageHandlers.toBaiduMap.postMessage([json]);
    } else if (/(Android)/i.test(navigator.userAgent)) {
        webview.toBaiduMap(json);
    }
}
