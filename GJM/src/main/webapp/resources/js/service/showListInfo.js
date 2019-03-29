var boolse = true;
$(function () {
    dataList(getQueryString("md_id"));

    // $(".cd-popup-close").on("click", cancelDiv);

    // 加载图片插件
    $("#imageUpload").imageUpload({
        width: 110,
        height: 110,
        uploadType: 'maintenance'
    });

});

function dataList(md_id) {
    $.ajax({
        type: "POST",
        url: "/service/showListInfos",
        data: {
            md_id: md_id,
        },
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
//	    	console.log(result);
            var employee;
            if (result.employee != null) {
                employee = result.employee;
            }
            var declaration = result.declaration;
            var imageList = result.imageList;
            var dispatching = result.dispatching;
            var fraction = result.userCenterUserFraction;
            var tracks = result.tracks;

            // 进度条
            $("#main-box-title .title-sub").each(function () {
                var step = parseInt($(this).attr("data-step"));
                if (step < result.state) {
                    $(this).addClass("title-sub-over").next().addClass("title-bottom-over");
                } else if (step == result.state) {
                    $(this).addClass("title-sub-ok").next().addClass("title-bottom-ok");
                }
            });
            // // 签字
            // if (declaration.md_CustomerImage != null) {
            //     $("#customerImage").attr("src", "data:image/png;base64," + declaration.md_CustomerImage + "");
            // } else {
            //     $("#customerImage").parent().parent().hide();
            // }
            // 服务基本信息
            if (!isEmpty(declaration)) {
                var prob = "";
                $(result.problems).each(function (index, item) {
                    prob += item.mdp_content + ",";
                });
                if (prob != "") {
                    prob = "," + prob.substring(0, prob.length - 1)
                }
                $("#md_id").val(declaration.md_id);
                $("#hi_code").val(declaration.hi_code);
                $("#service_type").text(declaration.sm_name);
                $("#service_fault").text(declaration.md_problem + prob);
                $("#service_types").text(!isNaN(declaration.md_applyType) ? (isEmpty(declaration.md_payType) ? declaration.st_name : returnValue(declaration.md_payType)) : returnValue(declaration.md_applyType));// declartion.st_name
                $("#service_typese").text(declaration.md_source);
                $("#service_custmorName").text(declaration.md_contactpeople);
                $("#service_custmorPhone").text(declaration.md_contactPhone);
                $("#user_id").val(declaration.user_id);
                $("#mdState").val(declaration.md_state);
                $("#mdgMoney").val(declaration.mdg_money);
                $("#service_address").text(declaration.md_type == 6 ? declaration.house_address.replace(",", "-->") : (isEmpty(declaration.house_address) ? declaration.old_address: declaration.house_address));
                $("#service_sdate").text(format(declaration.apply_time, "yyyy-MM-dd HH:mm:ss"));
                // var numMoney = 0;
                // if (result.clearOrder != null) {
                //     numMoney = result.clearOrder.bco_numMoney;
                // }
                // $("#service_money").text(numMoney + "元");
            }
            if (!isEmpty(employee)) {
                $("#em_id").val(employee.em_id);
            }
            if (!isEmpty(declaration)) {
                $("#service_date").text(format(declaration.md_time, "yyyy-MM-dd HH:mm:ss"));
            }
            if (!isEmpty(imageList)) {
                $("#service_image").html("");
                $(imageList).each(function (index, item) {
                    if (item.mi_type == "fault") {
                        $("#service_image").append("<span class='spanImgBox'><img class='showboxImg' src='" + item.img_path + "' data-url='" + item.mi_path + "' style='width:110px;height:110px;margin-right:10px;'></span>");
                    }
                });
                $("#imageDeList").data("data", imageList);
            }
            // 服务问题列表
            $(".problem_content ul").html("");
            $(result.problems).each(function (index, item) {
                $(".problem_content ul").append("<li>" + item.mdp_content + "</li>");
            });
            // 服务进度
            if (!isEmpty(result.orderVoList)) {
                var html = "";
                var length = result.orderVoList.length;
                $.each(result.orderVoList, function (index, item) {
                    html += "<div class='date-content-list'>" +
                        "<div class='date-content-list-title' data-step='" + returnValue(item.mo_step) + "' onclick='showContent(this)' >" +
                        "<label class='dates'>" + format(item.mo_date, "yyyy-MM-dd HH:mm:ss") + "</label>" +
                        "<label class='titles'>" + returnValue(item.mo_state) + "</label>" +
                        "<i></i>";
                    if (index == (length - 1)) {
                        if (result.state == 0 && declaration.md_state == '已受理') {
                            html += "<button onclick='servicePage(event)'>派单</button>";
                        } else if (result.state == 1) {
                            html += "<button onclick='receiveOrderPage(event)'>接单</button>";
                        } else if ((result.state == 2 || result.state == 4) && dispatching.mdg_state != '等待回访') {
                            html += "<button onclick='serviceBill(event)'>跟进</button>";
                        } else if (result.state == 4) {
                            html += "<button onclick='visitServicePage(event)'>回访</button>";
                        } else if (returnTime(declaration.apply_time) < '2017-11-15 00:00:00' && dispatching.mdg_state == '等待回访' && (!isEmpty(result.selectServiceMoney) && result.selectServiceMoney != undefined)) {// 兼容老数据
                            html += "<button onclick='visitServicePage(event)'>回访</button>";
                        }
                    } else if (index == 2 && result.state == 3 && declaration.md_state == '已受理') {
                        html += "<button onclick='followOrderPage(event)' id='feiyong'>费用</button>";//followOrderPage
                    }
                    html += "</div>" +
                        "</div>";
                });
                $(".date-content").empty().append(html);
                // 进度详情信息
                $(".date-content-list-title").each(function () {
                    var step = parseInt($(this).attr("data-step"));
                    switch (step) {
                        case 0: // 服务申请详情
                            var html = "<div class='content-list'>" +
                                "<dl>" +
                                "<dt>申请人：</dt>" +
                                "<dd>" + (returnValue(declaration.md_source).indexOf("内部") > -1 ? returnValue(declaration.typeOfApply_Name) : returnValue(declaration.md_source)) + "</dd>" +
                                "</dl>" +
                                "</div>";
                            $(this).after(html);
                            break;
                        case 1: // 服务受理详情
                            var html = "<div class='content-list'>" +
                                "<dl>" +
                                "<dt>受理人：</dt>" +
                                "<dd>" + returnValue(declaration.accepter) + "</dd>" +
                                "</dl>" +
                                "<dl>" +
                                "<dt>派工人员：</dt>" +
                                "<dd>[" + returnValue(employee.em_post || '') + "]" + returnValue(employee.em_name || '') + "</dd>" +
                                "</dl>" +
                                "<dl>" +
                                "<dt>联系方式：</dt>" +
                                "<dd>" + returnValue(employee.em_phone) + "</dd>" +
                                "</dl>" +
                                "<dl>" +
                                "<dt><button class='button bg-green' onclick='printService()'>打印派工单</button></dt>" +
                                "<dd></dd>" +
                                "</dl>" +
                                "</div>";
                            $(this).after(html);
                            break;
                        case 2: // 服务处理详情
                            var html = "";
                            var htmlTable = "";
                            var detailTable = "";
                            var totalMoney = 0;
                            $(result.selectServiceMoney).each(function (index, item) {
                                htmlTable += "<tr>";
                                if (item.payObject == 1) {
                                    if (isEmpty(item.cc_code)) {
                                        htmlTable += "<td>" + item.userName + "(用户)" + "</td>";
                                    } else {
                                        htmlTable += "<td>" + item.cc_name + "(客户)" + "</td>";
                                    }
                                } else if (item.payObject == 2) {
                                    htmlTable += "<td>" + item.em_name + "(管家)" + "</td>";
                                } else if (item.payObject == 3) {
                                    htmlTable += "<td>" + item.ucc_name + "(门店)" + "</td>";
                                } else {
                                    htmlTable += "<td></td>";
                                }

                                htmlTable += "<td>" + item.ssm_source + "</td>";
                                htmlTable += "<td>" + item.ssm_money + "</td>";
                                htmlTable += "</tr>";
                                totalMoney += item.ssm_money;
                            });
                            if (returnNumber(totalMoney) >= 0) {
                                // 全局变量
                                $("#serviceMoney").data("data", result.selectServiceMoney);
                            }
                            htmlTable += "<tr><td colspan='4' style='color: red;text-align:right;'>合计：<label id='totalM'>" + totalMoney + "</label>元</td></tr>";
                            if (htmlTable != "") {
                                html += "<dl><dt>费用清单：</dt><dd id='moneyDetail'><table style='border-collapse: collapse;' class='tableBill'><thead><tr><td>付费对象</td><td>费用名称</td><td>费用金额</td></tr></thead><tbody>" + htmlTable + "</tbody></table></dd></dl>";
                                html += "<input type='hidden' id='totalServMoney' value='" + totalMoney + "'>";
                            }
                            $.each(result.moneyDetails, function (index, item) {
                                detailTable += "<tr>";
                                if (item.payObject == 1) {
                                    if (returnNumber(item.num) >= 1) {
                                        detailTable += "<td rowspan='" + returnNumber(item.num) + "'>" + (isEmpty(item.cc_name) ? (item.user_name + "(用户)") : (item.cc_name + "(客户)")) + "</td>";
                                    }
                                } else if (item.payObject == 2) {
                                    if (returnNumber(item.num) >= 1) {
                                        detailTable += "<td rowspan='" + returnNumber(item.num) + "'>" + (item.em_name + "(管家)") + "</td>";
                                    }
                                } else if (item.payObject == 3) {
                                    if (returnNumber(item.num) >= 1) {
                                        detailTable += "<td rowspan='" + returnNumber(item.num) + "'>" + (item.ucc_name + "(门店)") + "</td>";
                                    }
                                }
                                detailTable += "<td>" + item.ssm_source + "</td>";
                                detailTable += "<td>" + item.ssm_univalent + "</td>";
                                detailTable += "<td>" + item.ssm_num + "</td>";
                                detailTable += "<td>" + item.ssm_money + "</td>";
                                detailTable += "</tr>";

                                // detailTable += "<tr><td colspan='5' style='text-align: right;color: red;'>合计："+returnMoney(item.totalMoney)+"元</tr>";
                            });
                            if (!isEmpty(detailTable)) {
                                html += "<dl style='padding-top: 10px;'><dt>费用明细：</dt><dd id='moneyDetailInfo'><table style='border-collapse: collapse;' class='tableBill'><thead><tr><td>付费人</td><td>名目</td><td>单价</td><td>数量</td><td>总额</td></tr></thead><tbody>" + detailTable + "</tbody></table></dd></dl>";
                            }
                            var html = "<div class='content-list'>" +
                                "<dl>" +
                                "<dt>接单人员：</dt>" +
                                "<dd>" + ((tracks == null || isEmpty(tracks.em_name)) ? "" : returnValue(tracks.em_name)) + "</dd>" +
                                "</dl>" +
                                "<dl>" +
                                "<dt>联系方式：</dt>" +
                                "<dd>" + ((tracks == null || isEmpty(tracks.em_phone)) ? "" : returnValue(tracks.em_phone)) + "</dd>" +
                                "</dl>" +
                                "<dl>" +
                                "<dt>接单时间：</dt>" +
                                "<dd>" + ((tracks == null || isEmpty(tracks.mtk_createTime)) ? "" : format(tracks.mtk_createTime, "yyyy-MM-dd HH:mm:ss")) + "</dd>" +
                                "</dl>" +
                                html +
                                "</div>";
                            $(this).after(html);
                            break;
                        case 3: // 客服回访详情
                            var html = "<div class='content-list'>" +
                                "<dl>" +
                                "<dt>服务状态：</dt>" +
                                "<dd>" + returnValue(dispatching.mdg_state) + "</dd>" +
                                "</dl>" +
                                "</div>";
                            $(this).after(html);
                            break;
                        case 4: // 完成详情
                            var html = "<div class='content-list'>" +
                                "<dl>" +
                                "<dt>服务回访：</dt>" +
                                "<dd>" + ((fraction == null || isEmpty(fraction.uf_date)) ? "" : format(fraction.uf_date, "yyyy-MM-dd HH:mm:ss")) + "</dd>" +
                                "</dl>" +
                                "<dl>" +
                                "<dt>服务进度：</dt>" +
                                "<dd>已完成</dd>" +
                                "</dl>" +
                                "<dl>" +
                                "<dt>服务评价：</dt>" +
                                "<dd>" +
                                "<span id='simplestar' style='margin-top: 6px;'>" +
                                "<img id='image0' src='/resources/image/T1j.png'>" +
                                "<img id='image1' src='/resources/image/T1j.png'>" +
                                "<img id='image2' src='/resources/image/T1j.png'>" +
                                "<img id='image3' src='/resources/image/T1j.png'>" +
                                "<img id='image4' src='/resources/image/T1j.png'>" +
                                "</span>" +
                                "<div class='fraction' style='margin-top: 6px;'>" +
                                "<em id='scores'></em> 分" +
                                "</div>" +
                                "</dd>" +
                                "</dl>" +
                                "<dl>" +
                                "<dt>评价内容：</dt>" +
                                "<dd>" +
                                // fraction.uf_content
                                "</dd>" +
                                "</dl>" +
                                "</div>";
                            $(this).after(html);
                            // 好评渲染
                            // var score = parseInt(fraction.uf_fraction);
                            // $("#simplestar img").each(function () {
                            //     var index = parseInt($(this).attr("id").replace("image", ""));
                            //     if (index < score) {
                            //         if (score <= 2) {
                            //             $(this).attr("src", "/resources/image/T1lg.png");
                            //         } else {
                            //             $(this).attr("src", "/resources/image/T1e.png");
                            //         }
                            //     }
                            // });
                            // $("#scores").text(score).parent().show();
                            break;
                    }
                });
            }
            // 派工单
            if (!isEmpty(declaration)) {
                $("#md_number").text("No:" + returnValue(declaration.md_number));
                $("#md_contactpeople").text(returnValue(declaration.md_contactpeople));
                $("#md_contactPhone").text(returnValue(declaration.md_contactPhone));
                $("#owenUcc").text(returnValue(declaration.ucc_name));
                $("#house_address").text(declaration.house_address);
                $("#applyer").text(returnValue(declaration.typeOfApply_Name));
                $("#md_applyType").text(!isNaN(declaration.md_applyType) ? returnValue(declaration.md_payType) : returnValue(declaration.md_applyType));
                $("#md_phone").text(returnValue(declaration.md_people).substring(0, 1) + returnValue(declaration.md_phone));
                $("#md_problem").text(returnValue(declaration.md_problem));
                $("#md_time").text(format(declaration.apply_time, "yyyy-MM-dd HH:mm:ss"));
            }
            if (!isEmpty(dispatching)) {
                $("#mdg_time").text(format(dispatching.mdg_time, "yyyy-MM-dd HH:mm:ss"));
            }
            if (!isEmpty(tracks)) {
                $("#accpet_name").text(returnValue(tracks.em_name));
            }
            // 获取权限
            init_power();
        }
    });
}

function init_power() {

    $.ajax({
        type: "POST",
        url: "/user/userJurisdiction",
        data: {
            url: window.location.pathname,
            ucps_type: 3
        },
        dataType: "json"
    }).done(function (result) {
        if (result == null || result.menuLists == null || result.menuLists.length == 0) {
            $("#power1").empty();
            $(".date-content-list").find("button").attr("disabled", "disabled");
            return;
        }

        $.each(result.menuLists, function (index, data) {
            $("#power1").append('<button onclick="' + data.ucps_url + '">' + data.ucps_name + '</button>');
        });

    });
}

/**服务受理**/
function changeType(obj) {
    $(".type-label").removeClass("span-checked");
    $(obj).addClass("span-checked");
    $(obj).parent().siblings("#mdOrderTable").html("");
    $.ajax({
        type: "POST",
        url: "/queryMdOrderByEmId",
        data: {
            em_id: $(obj).parent().attr("data-content")
        },
        dataType: "json"
    }).done(function (result) {
        var label = "<div class='sub-title' style='width: 180px;height: 5px;'><ul class='title-nav' style='width: 180px;height: 5px;'><li class='visited' style='padding: 0px;'>最新待完成订单</li></ul></div>";
        var html = '';
        if (result.code == 200) {
            var count = 0;
            $.each(result.data, function (index, item) {
                html += '<tr>';
                html += '<td>' + item.house_address + '</td>';
                html += '<td>' + item.sm_name + '</td>';
                html += '<td>' + getTractState(item.mtk_state) + '</td>';
                html += '<td>' + returnTime(item.mtk_end_time) + '</td>';
                html += '</tr>';
                count++;
            });
            if (count > 0) {
                $(obj).parent().siblings("#mdOrderTable").html(label + "<table class='ordertable'><thead style='font-weight: bold;color: #000000;'><tr><td>小区房号</td><td>订单类型</td><td>完成情况</td><td>预计结束时间</td></tr></thead><tbody>" + html + "</tbody></table>");
            }
        }
    });
}

// 关闭服务受理
function closeWindow(ids) {
    $(ids).parent().parent().animate({"opacity": "hide"});
    $(ids).parent().animate({"right": "-600px"});
}

// 服务受理界面
function servicePage(event) {
    // 阻止冒泡
    event.stopPropagation();

    $("#serviceProgress").text("服务派单");

    var payPersonHtml = '<div name="queryList"><div id="search-box1" style="display: flex;"><input type="text" style="margin-top: 0px;margin-right: 0px;width: 100%;border: none;background: #ddd;" placeholder="输入付费人名字、电话"><div onclick="closeWindow(this)" style="background: #ddd; cursor: pointer;"><i class="fa-close" style="margin: 7px 10px;"></i></div></div><div name="search-show"><div class="search-tisp">没有数据</div></div></div>';
    $.ajax({
        type: "POST",
        url: "/service/acceptancePeople",
        data: {},
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
//	    async: true,
        success: function (result) {
            var html = '';
            $(result.customerServiceState).each(function (index, item) {
                html += '<div class="state-model" data-content="' + item.em_id + '">';
                html += '<label class="type-label" onclick="changeType(this)" for="type' + index + '">';
                html += '<div style="display: flex;">';
                html += '<span class="type-label-name" title="' + item.em_name + '">' + item.em_name + '</span>';
                html += '<span class="type-label-state" style="' + (returnNumber(item.taskCount) == 0 ? 'color: #1ABC9C' : "color: #E67E22") + '">' + (returnNumber(item.taskCount) == 0 ? '空闲中' : "忙碌中") + '</span><i></i>';
                html += '</div>';
                html += '<span class="type-label-name">待处理订单' + '<label class="error">' + returnNumber(item.taskCount) + '</label>' + '笔</span>';
                html += '<input type="radio" class="type-radio" name="em_id" value="' + item.em_id + '" id="type' + index + '" required="required">';
                html += '</label>';
                html += '</div>';
            });
            html += '<div id="mdOrderTable">';
            html += '</div>';
            html += '<br>';
            // html += '<div style="padding-top: 20px;">';
            html += '<dl class="layout-dl" style="width: 100%; padding-top: 15px;">';
            html += '<label class="common-checkbox2" onclick="inputMoney(this)" id="enterLabel">已明确费用</label>';
            html += '</dl>';
            html += '<div style="display: none;" id="enterDl">';
            html += '<dl class="layout-dl">';
            html += '<dt class="layout-dt">费用总计：</dt>';
            html += '<dd class="layout-dd"><input style="width: 120px;" class="short" type="text" placeholder="本次费用总计" name="mdg_money"/></dd>';
            html += '</dl>';
            html += '<br>';
            html += '<dl class="layout-dl" >';
            html += '<dt class="layout-dt">费用清单：</dt>';
            html += '<dd class="layout-dd" style="width: 200px;">';
            html += '<table class="billList" style="font-size: 14px;margin-top: 14px;text-align: center; width: 360px;">';
            html += '<thead>';
            html += '<tr><td>付费对象</td><td>付费人</td><td>费用名目</td><td>应付费用</td><td>&nbsp;</td></tr>';
            html += '</thead>';
            html += '<tbody>';
            html += '<tr>';
            html += '<td><select style="width: 80px;" class="short" placeholder="付费对象" onchange="payObjectChange(this)"><option value="1">客户</option><option value="2">管家</option><option value="3">门店</option></select></td>';
            html += '<td><input style="width: 120px;" class="short" type="text" placeholder="付费人" onclick="selectPayPerson(this)" readonly/>' + payPersonHtml + '<input type="hidden" value="" name="payId">' + '</td>';
            html += '<td><input style="width: 120px;" class="short" type="text" placeholder="输入名目" value=""/></td>';
            html += '<td><input style="width: 78px;" class="short" type="text" name="price" value="" placeholder="应付费用" onkeyup="updateMoney(this)" /></td>';
            // html += '<td><input style="width: 60px;" class="short" type="text" name="count" value="1" placeholder="数量" onkeyup="updateMoney(this)" /></td>';
            // html += '<td><input style="width: 88px;" class="short" type="text" name="sumMoney" value="" placeholder="金额" onkeyup="updateMoney(this)" /></td>';
            html += '<td><span class="btn bg-ok" onclick="addBillPayMoney(this)">确认</span></td>';
            html += '</tr>';
            html += '</tbody>';
            html += '</table>';
            html += '</dd>';
            html += '</dl>';
            html += '</div>';
            // html += '</div>';

            $("#dispatch .content_add").empty().append(html);
            $("#contentSubmit").click(submit);
        }
    });

    $("#dispatch").show();
    $("#dispatch").next().slideUp(300);
    $("#dispatch").find(".serviceBg").animate({"opacity": "show"});
    $("#dispatch").find(".serviceContent").animate({"right": "0"});
}

/**
 * 服务类型
 *
 * @param obj
 */
function serviceTypeUpate(event) {
    // 阻止冒泡
    event.stopPropagation();
    var html = "<dl class='layout-dl'>" +
        "<dt class='layout-dt' style='width:95px'>申请类型：</dt>" +
        "<dd class='layout-dd'>" +
        "<select name='mtk_state' id='mtk_state' style='margin-top:10px;' onclick='mtk_state(this)'>" +
        "<option value='租期服务'>租期服务</option>" +
        "<option value='代申请服务'>代申请服务</option>" +
        "</select>" +
        "<div id='typeRadio' style='width: auto; overflow: hidden; margin-top:15px;'>" +
        "<label class='typeRadio radio' onclick='typeClick(this)'>管家婆</label>" +
        "<label class='typeRadio radio' onclick='typeClick(this)'>房东</label>" +
        "<label class='typeRadio radio' onclick='typeClick(this)'>管家</label>" +
        "</div>"
    "</dd>" +
    "</dl>";
    $("#dispatch .content_add").empty().append(html);
    $("#contentSubmit").click(typeSubmit);

    $("#dispatch").show();
    $("#dispatch").next().slideUp(300);
    $("#dispatch").find(".serviceBg").animate({"opacity": "show"});
    $("#dispatch").find(".serviceContent").animate({"right": "0"});
}

/** 申请类型状态 */
function mtk_state(ids) {
    var html = "";
    if ($(ids).val() == "租前服务") {
        html += "<label class='typeRadio radio click' onclick='typeClick(this)'>管家婆</label>" +
            "<label class='typeRadio radio' onclick='typeClick(this)'>房东</label>" +
            "<label class='typeRadio radio' onclick='typeClick(this)'>管家</label>";
    } else {
        html += "<label class='typeRadio radio click' onclick='typeClick(this)'>管家婆</label>" +
            "<label class='typeRadio radio' onclick='typeClick(this)'>房东</label>" +
            "<label class='typeRadio radio' onclick='typeClick(this)'>现租客</label>" +
            "<label class='typeRadio radio' onclick='typeClick(this)'>管家</label>";
    }
    $("#typeRadio").html(html);
}

/** 类型点击 */
function typeClick(ids) {
    $("#typeRadio .typeRadio").attr("class", "typeRadio radio")
    $(ids).attr("class", "typeRadio radio click");
}

/**
 * 接单提交
 */
function typeSubmit() {
    var typeF = $(".typeRadio.radio.click").text();
    $.ajax({
        type: "POST",
        url: "/service/updateHouseInfoHiCode",
        data: {
            md_id: $("#md_id").val(),
            hi_code: $("#hi_code").val(),
            type: $("#mtk_state").val(),
            typeF: typeF
        },
        dataType: "json"
    }).done(function (result) {
        if (result.message == "success") {
            $.jBox.tip("修改成功", "success");
            $("#dispatch .serviceBg").animate({"opacity": "hide"});
            $("#dispatch .serviceContent").animate({"right": "-600px"});
            // 异步刷新服务进度
            window.location.reload();
        }
    });
}

/**
 * 报事跟进
 *
 * @param obj
 */
function serviceThing(event) {
    var html = "";
    $(".problem_content ul li").each(function (index) {
        html += "<li>" + $(this).text() + "<label class='fa-minus-circle' onclick='remove(this)'></label></li>";
    });
    // 阻止冒泡
    event.stopPropagation();
    var html = "<dl class='layout-dl'>" +
        "<dt class='layout-dt' style='width:95px'>现场确认：</dt>" +
        "<dd class='layout-dd'>" +
        "<div id='typeRadio' style='width: auto; overflow: hidden;'>" +
        "<div class='problemList'>" +
        "<ul>" +
        html +
        "</ul>" +
        "</div>" +
        "<div><input type='text' value='' style='float:left;' class='problemText' /><button style='margin-top:12px;' onclick='problemList()'>添加</button></div>" +
        "</div>" +
        "</dd>" +
        "</dl>";
    $("#dispatch .content_add").empty().append(html);
    $("#contentSubmit").click(problemSubmit);

    $("#dispatch").show();
    $("#dispatch").next().slideUp(300);
    $("#dispatch").find(".serviceBg").animate({"opacity": "show"});
    $("#dispatch").find(".serviceContent").animate({"right": "0"});
}

/**
 * 显示选择服务
 */
function chooseService(event) {
    // $(".cd-popup3").show();
    // $(".cd-popup3").addClass("is-visible3");
// 阻止冒泡
    event.stopPropagation();

    var md_state = $("#mdState").val();
    if (md_state != "未受理") {
        $.jBox.tip("该服务订单" + md_state, "error");
        return;
    }

    $("#serviceProgress").text("服务受理");
    var html = "";
    $.ajax({
        type: "POST",
        url: "/service/queryHouseInfoByUser",
        data: {
            user_id: returnNumber($("#user_id").val())
        },
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
//	    async: true,
        success: function (result) {
            html += "<dl class='layout-dl'>";
            html += "<dt>联系人：</dt>";
            html += "<dd>" + $("#service_custmorName").text() + "/" + $("#service_custmorPhone").text() + "</dd>";
            html += "</dl>";
            html += "<br>";
            html += "<dl class='layout-dl'>";
            html += "<dt>报事地址：</dt>";
            html += "<dt>" + $("#service_address").text() + "</dt>";
            html += "</dl>";
            html += "<br>";
            html += "<dl>";
            html += "<label name='md_state' class='common-checkbox2' onclick='enterCase(this);' style='padding-right: 20px;'>确认受理</label><label name='md_state' class='common-checkbox2' onclick='enterCase(this);' style=''>拒绝受理</label>";
            html += "</dl>";
            html += "<br>";

            if (result.code == 200) {
                html += "<dl id='customerDl' style='display: none;'>";
                html += "<label style='color: #ff6666;font-weight: bold;'>更改为以下地址及联系人信息</label>";
                html += "<table style='width: 600px; text-align: center; border: 1px solid #ccc;'>"
                html += "<thead style='line-height: 36px; height: 36px; background: #f5f8fa;'><tr><th style='width: 50px; left: 15px;'>#</th><th>小区房号</th><th>客户名称</th><th>类型</th><th>电话</th></tr></thead>";
                html += "<tbody>";
                $.each(result.data, function (index, item) {
                    html += "<tr style='line-height: 30px; height: 30px;'>";
                    html += "<td><label class='common-checkbox2' style='left: 15px;' onclick='selectHouse(this)' name='5'></label></td>";
                    html += "<td><input type='hidden' value='" + item.hi_code + "'><label>" + item.house_address + "</label></td>";
                    html += "<td><input type='hidden' value='" + item.cc_code + "'><label>" + item.cc_name + "</label></td>";
                    html += "<td><label>" + (isEmpty(item.cc_type) ? "" : item.cc_type) + "</label></td>";
                    html += "<td><label>" + (isEmpty(item.ccp_phone) ? "" : item.ccp_phone) + "</label></td>";
                    html += "</tr>";
                });
                html += "</tbody>";
                html += "</table>"
                html += "</dl>";
            }

            $("#dispatch .content_add").empty().append(html);
            $("#contentSubmit").click(submitAccept);
        }
    });

    $("#dispatch").show();
    $("#dispatch").next().slideUp(300);
    $("#dispatch").find(".serviceBg").animate({"opacity": "show"});
    $("#dispatch").find(".serviceContent").animate({"right": "0"});
}

function changeService(obj) {
    var option = $(obj).find("option:selected").val();
    if ('1' == option) {
        $("#waixie").hide();
    } else if ('2' == option) {
        $("#waixie").show();
    }
}

/** 添加现场确认 */
function problemList() {
    $(".problemList ul").append("<li>" + $(".problemText").val() + "<label class='fa-minus-circle' onclick='remove(this)'></label></li>");
    $(".problemText").val("");
}

/** 删除现场确认 */
function remove(ids) {
    $(ids).parent().remove();
}

/** 现场确认提交 */
function problemSubmit() {
    var problem = "";
    if ($(".problemList ul li").length > 0) {
        $(".problemList ul li").each(function () {
            problem += $(this).text() + ";";
        });
        if (problem != "") {
            problem = problem.substring(0, problem.length - 1);
        }
    }
    $.ajax({
        type: "POST",
        url: "/service/addProblemList",
        data: {
            md_id: $("#md_id").val(),
            problem: problem
        },
        dataType: "json"
    }).done(function (result) {
        if (result.message == "success") {
            $.jBox.tip("现场确认成功", "success");
            $("#dispatch .serviceBg").animate({"opacity": "hide"});
            $("#dispatch .serviceContent").animate({"right": "-600px"});
            // 异步刷新服务进度
            window.location.reload();
        } else {
            $.jBox.tip("提交出错", "error");
        }
    });
}

/** 提交受理*/
function submit() {
    var emIdVal = $("#dispatch .type-radio:radio[name='em_id']:checked").val();
    if (isEmpty(emIdVal)) {
        $.jBox.tip("请选择派工人员", "error");
        return;
    }

    var moneyListt = "";
    if ($("#enterLabel").hasClass("common-checkbox-checked2")) {
        $(".billList tbody tr").each(function () {
            var tdObject = $(this).find("td");
            if (isEmpty(tdObject.eq(1).find("input[name=payId]").val())) {
                $.jBox.tip("请选择付费对象", "error");
                return;
            }
            moneyListt += tdObject.eq(0).find("select").val() + "-";
            moneyListt += tdObject.eq(1).find("input[name=payId]").val() + "-";
            if (isEmpty(tdObject.eq(2).find("input").val())) {
                $.jBox.tip("请输入付费名称", "error");
                return;
            }
            moneyListt += tdObject.eq(2).find("input").val() + "-";
            if (isEmpty(tdObject.eq(3).find("input").val())) {
                $.jBox.tip("请输入总费用", "error");
                return;
            } else if (returnMoney($("[name=mdg_money]").val()) < returnMoney(tdObject.eq(3).find("input").val())) {
                $.jBox.tip("客户应支付费用不能大于总费用", "error");
                return;
            }
            moneyListt += tdObject.eq(3).find("input").val() + "-";
            moneyListt += ";";
        });
        if (isEmpty(moneyListt)) {
            $.jBox.tip("请录入费用", "error");
            return;
        }
        if (isEmpty($("[name=mdg_money]").val())) {
            $.jBox.tip("请录入服务总费用", "error");
            return;
        }
    }

    $.ajax({
        type: "POST",
        url: "/service/addDispatching",
        data: {
            md_id: getQueryString("md_id"),
            em_id: emIdVal,
            moneyListt: moneyListt,
            mdg_money: returnMoney($("[name=mdg_money]").val())
        },
        dataType: "json"
    }).done(function (result) {
        if (result.msg == "success") {
            $.jBox.tip("派工成功", "success");
            $("#dispatch .serviceBg").animate({"opacity": "hide"});
            $("#dispatch .serviceContent").animate({"right": "-600px"});
            // 异步刷新服务进度
            window.location.reload();
            // 发送socket
            var employee = result.employee;
            window.parent.parent.sendMessages(employee.em_name + " ，你有一个派工单需要处理！", employee.em_id);
        } else {
            $.jBox.tip(result.msg, "error");
        }
    });
}

/**
 * 接单界面
 *
 * @param obj
 */
function receiveOrderPage(event) {
    // 阻止冒泡
    event.stopPropagation();
    $("#serviceProgress").text("服务接单");
    var html = "<dl class='layout-dl'>" +
        "<dt class='layout-dt' style='width:130px'>服务状态：</dt>" +
        "<dd class='layout-dd'>" +
        "<select name='mtk_state' id='mtk_state' >" +
        "<option value='no'>接单</option>" +
        "</select>" +
        "</dd>" +
        "</dl>" +
        "<dl class='layout-dl'>" +
        "<dt class='layout-dt' style='width:130px'>联系客户时间：</dt>" +
        "<dd class='layout-dd'>" +
        "<input class='dateTime' type='text' id='openTime' value='' placeholder='点击选择联系客户时间' onfocus='WdatePicker({dateFmt:\"yyyy-MM-dd HH:mm:ss\"})'/>" +
        "</dd>" +
        "</dl>" +
        "<dl class='layout-dl'>" +
        "<dt class='layout-dt' style='width:130px'>预计结束时间：</dt>" +
        "<dd class='layout-dd'>" +
        "<input class='dateTime' type='text' id='endTime' value='' placeholder='点击选择预计结束时间'  onfocus='WdatePicker({dateFmt:\"yyyy-MM-dd HH:mm:ss\"})'/>" +
        "</dd>" +
        "</dl>";

    $("#dispatch .content_add").empty().append(html);
    $("#contentSubmit").click(receiveSubmit);

    $("#dispatch").show();
    $("#dispatch").next().slideUp(300);
    $("#dispatch").find(".serviceBg").animate({"opacity": "show"});
    $("#dispatch").find(".serviceContent").animate({"right": "0"});
}

/**
 * 接单提交
 */
function receiveSubmit() {
    $.ajax({
        type: "POST",
        url: "/service/addTracks",
        data: {
            mtk_state: $("#mtk_state").val(),
            md_id: $("#md_id").val(),
            em_id: $("#em_id").val(),
            openTime: $("#openTime").val(),
            endTime: $("#endTime").val()
        },
        dataType: "json"
    }).done(function (result) {
        if (result.code == 200 && result.msg == "true") {
            $.jBox.tip("接单成功", "success");
            $("#dispatch .serviceBg").animate({"opacity": "hide"});
            $("#dispatch .serviceContent").animate({"right": "-600px"});
            // 异步刷新服务进度
            window.location.reload();
        } else if (result.code != 200 && result.msg != "true") {
            $.jBox.tip(result.msg, "error");
        }
    });
}

/**
 * 跟进页面
 */
function followOrderPage(event) {
    // 阻止冒泡
    event.stopPropagation();
    $("#serviceProgress").text("费用明细录入");
    var md_type = $("#service_type").text();

    var _data = $("#serviceMoney").data("data");
    if (_data == undefined || _data == null) {
        $.jBox.tip("数据异常，请联系管理员", "error");
        return;
    }
    var tableHtml = "";
    tableHtml += "<dl>";
    tableHtml += "<table style='width: 600px; text-align: center; border: 1px solid #ccc;'>"
    tableHtml += "<thead style='line-height: 36px; height: 36px; background: #f5f8fa;'><tr><th style='width: 50px; left: 15px;'>#</th><th>付费对象</th><th>费用名称</th><th>费用金额(元)</th></tr></thead>";
    tableHtml += "<tbody>";
    $.each(_data, function (index, item) {
        tableHtml += "<tr style='line-height: 30px; height: 30px;'>";
        tableHtml += "<td><label class='common-checkbox2' style='left: 15px;' onclick='selectHouse(this)' name='6'></label></td>";
        if (item.payObject == 1) {
            if (isEmpty(item.cc_code)) {
                tableHtml += "<td><input type='hidden' value='" + item.payObject + "'><input type='hidden' value='" + item.user_id + "'><label>" + item.userName + "(用户)" + "</label></td>";
            } else {
                tableHtml += "<td><input type='hidden' value='" + item.payObject + "'><input type='hidden' value='" + item.cc_code + "'><label>" + item.cc_name + "(客户)" + "</label></td>";
            }
        } else if (item.payObject == 2) {
            tableHtml += "<td><input type='hidden' value='" + item.payObject + "'><input type='hidden' value='" + item.em_id + "'><label>" + item.em_name + "(管家)" + "</label></td>";
        } else if (item.payObject == 3) {
            tableHtml += "<td><input type='hidden' value='" + item.payObject + "'><input type='hidden' value='" + item.ucc_id + "'><label>" + item.ucc_name + "(门店)" + "</label></td>";
        }

        tableHtml += "<td><label>" + item.ssm_source + "</label></td>";
        tableHtml += "<td><label>" + item.ssm_money + "</label></td>";
        tableHtml += "</tr>";
    });
    tableHtml += "</tbody>";
    tableHtml += "</table>"
    tableHtml += "</dl>";

    var html = "";
    // 维修界面
    html += tableHtml +
        "<dl class='layout-dl' id='inputMoney1' style='display: block;'>" +
        "<dt class='layout-dt'>费用清单：</dt>" +
        "<dd class='layout-dd'>" +
        "<table class='billList' style='font-size: 14px;margin-top: 14px;text-align: center; width: 600px;'>" +
        "<thead>" +
        "<tr><td>费用名目</td><td>单价</td><td>数量</td><td>小计</td><td>&nbsp;</td></tr>" +
        "</thead>" +
        "<tbody>" +
        "<tr>" +
        "<td><input style='width: 120px;' class='short' type='text' placeholder='输入名目'/></td>" +
        "<td><input style='width: 78px;' class='short' type='text' name='price' value='' placeholder='单价' onkeyup='updateMoney(this)' /></td>" +
        "<td><input style='width: 60px;' class='short' type='text' name='count' value='1' placeholder='数量' onkeyup='updateMoney(this)' /></td>" +
        "<td><input style='width: 88px;' class='short' type='text' name='sumMoney' value='' placeholder='金额' onkeyup='updateMoney(this)' /></td>" +
        "<td><span class='btn bg-ok' onclick='addBillMoney(this)'>+</span></td>" +
        "</tr>" +
        "</tbody>" +
        "</table>" +
        "</dd>" +
        "</dl>" +
        "<dl class='layout-dl' id='inputMoney2' style='display: flex; width: 600px;text-align: right;'>" +
        // "<dt class='layout-dt'>费用合计：</dt>" +
        "<dd class='layout-dd'>" +
        "<span style='color:red'>￥<em id='mdg_sumMoney'>0.00</em>元</span>" +
        "</dd>" +
        "</dl>" +
        "<dl class='layout-dl' id='inputMoney2' style='display: flex; width: 600px;'>" +
        "<button style='margin: 3px auto;' onclick='maintainOrderSubmit(event)'>保存</button>" +
        "</dl>" +
        "<dl>" +
        "<label style='color: red; font-size: 12px;'>注：提交后将不能录入费用，慎点！</label>"
    "</dl>";
    // "<dl class='layout-dl' id='upload' >" +
    // "<dt class='layout-dt'>图片描述：</dt>" +
    // "<dd class='layout-dd' style='widows: 532px'>" +
    // "<div id='images'></div>" +
    // "</dd>" +
    // "</dl>" +
    // "<dl class='layout-dl' style='display:none' id='inputContent'>" +
    // "<dt class='layout-dt'>问题描述：</dt>" +
    // "<dd class='layout-dd'>" +
    // "<textarea name='mtk_spe_cir' id='mtk_spe_cir'></textarea>" +
    // "</dd>" +
    // "</dl>" ;
    // "<dl>" +
    // "<label class='common-checkbox2' onclick='confirmMoney(this)' id='enterLabel'>费用确认后，将发送给客户</label>" +
    // "</dl>";

    $("#dispatch .content_add").empty().append(html);
    // 加载图片插件
    // var list = new Array();
    // $("#service_image img").each(function () {
    //     // list.push($(this).attr("src"));
    // });
    // $("#images").imageUpload({
    //     dataList: list,
    //     width: 110,
    //     height: 110,
    //     success: function (result) {
    //         result.css({"border": "none", "padding-left": "0px"});
    //     },
    //     builds: {
    //         onUpload: function (img) {
    //             // 保存图片到数据库
    //             addServicePicture(img.attr("src"));
    //         },
    //         onDelete: function (path) {
    //             // 删除图片
    //             deleteServicePicture(path);
    //         }
    //     }
    // });
    $("#contentSubmit").click(overOrder);

    $("#dispatch").show();
    $("#dispatch").next().slideUp(300);
    $("#dispatch").find(".serviceBg").animate({"opacity": "show"});
    $("#dispatch").find(".serviceContent").animate({"right": "0"});
}

/**
 * 费用提交
 */
function serviceBill(event) {
    var curTotalMoney = 0.0;
    // 阻止冒泡
    event.stopPropagation();
    var md_type = $("#service_type").text();
    var payPersonHtml = '<div name="queryList"><div id="search-box1" style="display: flex;"><input type="text" style="margin-top: 0px;margin-right: 0px;width: 100%;border: none;background: #ddd;" placeholder="输入付费人名字、电话"><div onclick="closeWindow(this)" style="background: #ddd; cursor: pointer;"><i class="fa-close" style="margin: 7px 10px;"></i></div></div><div name="search-show"><div class="search-tisp">没有数据</div></div></div>';
    var html = "";
    $("#serviceProgress").text("服务跟进");
    var _data = $("#serviceMoney").data("data");
    // 费用提交
    html += "<dl class='layout-dl'>";
    html += "<dt class='layout-dt'>服务状态：</dt>";
    html += "<dd class='layout-dd'>";
    html += "<select name='mtk_state' id='mtk_state' onchange='chageServiceState(this)'>";
    html += "<option value='yes'>处理完成</option>";
    html += "<option value='error'>出现问题</option>";
    html += "</select>";
    html += "</dd>";
    html += "</dl>";
    // html += "<label style='color: red; font-weight: bold;'>此处费用总和须与跟进录入费用总和相同</label>";
    html += "<dl class='layout-dl'>";
    html += "<dt class='layout-dt'>费用总计：</dt>";
    html += "<dd class='layout-dd'><input style='width: 120px;' class='short' type='text' placeholder='本次费用总计' name='mdg_money' value='" + returnMoney($("#mdgMoney").val()) + "'/>元</dd>";
    html += "</dl>"
    html += "<dl class='layout-dl' id='inputMoney1'>";
    html += "<dt class='layout-dt'>费用清单：</dt>";
    html += "<dd class='layout-dd'>";
    html += "<table class='billList' style='font-size: 14px;margin-top: 14px;text-align: center;'>";
    html += "<thead>";
    html += "<tr><td>付费对象</td><td>付费人</td><td>费用名称</td><td>费用金额</td><td>&nbsp;</td></tr>";
    html += "</thead>";
    html += "<tbody>";
    if (null != _data && undefined != _data && _data.length > 0) {
        $.each(_data, function (index, item) {
            var payId = "";
            var payName = "";
            if (item.payObject == 1) {
                if (isEmpty(item.cc_code)) {
                    payId = item.user_id;
                    payName = item.userName;
                } else {
                    payId = item.cc_code;
                    payName = item.cc_name;
                }
            } else if (item.payObject == 2) {
                payId = item.em_id;
                payName = item.em_name;
            } else if (item.payObject == 3) {
                payId = item.ucc_id;
                payName = item.ucc_name;
            }
            html += "<tr>";
            html += "<td><select style='width: 80px;' class='short' placeholder='付费对象' onchange='payObjectChange(this)' disabled><option value='1' " + (item.payObject == 1 ? 'selected' : '') + ">客户</option><option value='2' " + (item.payObject == 2 ? 'selected' : '') + ">管家</option><option value='3' " + (item.payObject == 3 ? 'selected' : '') + ">门店</option></select></td>";
            html += "<td><input style='width: 120px;' class='short' type='text' placeholder='付费人' value='" + payName + "' onclick='selectPayPerson(this)' disabled/>" + payPersonHtml + "<input type='hidden' value='" + payId + "' name='payId'>" + "</td>";
            html += "<td><input style='width: 120px;' class='short' type='text' placeholder='输入名称' value='" + item.ssm_source + "' disabled/></td>";
            html += "<td><input style='width: 78px;' class='short' type='text' name='price' value='" + item.ssm_money + "' placeholder='费用金额' disabled/></td>";
            // if(item.is_order != 1){
            html += "<td><span class='btn bg-ok' onclick='addBillPayMoney(this)'>确认</span><input type='hidden' value='1'></td>";
            // } else {
            //     html += "<td></td>";
            // }
            html += "</tr>";
            curTotalMoney += returnMoney(item.ssm_money);
        });
    } else {
        html += "<tr>";
        html += "<td><select style='width: 80px;' class='short' placeholder='付费对象' onchange='payObjectChange(this)'><option value='1'>客户</option><option value='2'>管家</option><option value='3'>门店</option></select></td>";
        html += "<td><input style='width: 120px;' class='short' type='text' placeholder='付费人' onclick='selectPayPerson(this)' readonly/>" + payPersonHtml + "<input type='hidden' value='' name='payId'>" + "</td>";
        html += "<td><input style='width: 120px;' class='short' type='text' placeholder='输入名称' name='payTitle'/></td>";
        html += "<td><input style='width: 78px;' class='short' type='text' name='price' value='' placeholder='费用金额' onkeyup='updateMoney(this)' /></td>";
        html += "<td><span class='btn bg-ok' onclick='addBillPayMoney(this)'>确认</span><input type='hidden' value='0'></td>";
        html += "</tr>";
    }
    html += "</tbody>";
    html += "</table>";
    html += "</dd>";
    html += "</dl>";
    html += "<dl class='layout-dl' id='inputMoney2'>";
    html += "<dt class='layout-dt'>费用合计：</dt>";
    html += "<dd class='layout-dd'>";
    html += "<span style='color:red'>￥<em id='mdg_sumMoney'>" + 0.0 + "</em>元</span>";// $("#totalM").text()
    html += "</dd>";
    html += "</dl>";
    html += "<dl class='layout-dl' id='upload' >";
    html += "<dt class='layout-dt'>费用图片：</dt>";
    html += "<dd class='layout-dd' style='widows: 532px;'>";
    html += "<div id='images'></div>";
    html += "</dd>";
    html += "</dl>";
    html += "<dl class='layout-dl' style='display:none' id='inputContent'>";
    html += "<dt class='layout-dt'>问题描述：</dt>";
    html += "<dd class='layout-dd'>";
    html += "<textarea name='mtk_spe_cir' id='mtk_spe_cir'></textarea>";
    html += "</dd>";
    html += "</dl>";

    $("#dispatch .content_add").empty().append(html);

    // 加载图片插件
    var list = new Array();
    // $("#service_image img").each(function () {
    //     list.push($(this).attr("src"));
    // });
    var imgObj = [];
    var imageList = $("#imageDeList").data("data");
    if (undefined != imageList && null != imageList) {
        $.each(imageList, function (index, item) {
            if (item.mi_type == "charge") {
                imgObj.url = item.img_path;
                imgObj.key = item.mi_path;
                list.push(imgObj);
            }
        });
    }

    $("#images").imageUpload({
        dataList: list,
        width: 110,
        height: 110,
        uploadType: 'maintenance',
        success: function (result) {
            result.css({"border": "none", "padding-left": "0px"});
        },
        builds: {
            onUpload: function (img) {
                // 保存图片到数据库
                addServicePicture(img.attr("data-url"), "charge");
            },
            onDelete: function (path) {
                // 删除图片
                deleteServicePicture(img.attr("data-url"));
            }
        }
    });
    $("#contentSubmit").click(mainServiceBill);

    $("#dispatch").show();
    $("#dispatch").next().slideUp(300);
    $("#dispatch").find(".serviceBg").animate({"opacity": "show"});
    $("#dispatch").find(".serviceContent").animate({"right": "0"});
}

/**
 * 更新合计费用
 *
 * @param obj
 */
function updateMoney(obj) {
    var _this = $(obj).parent().parent();
    var price = returnFloat($(_this).find("input[name='price']").val());
    var count = returnNumber($(_this).find("input[name='count']").val());
    var sumMoney = price * count;
    // 更新信息
    $(_this).find("input[name='sumMoney']").val(sumMoney);
}

/**
 * 删除账单
 *
 * @param obj
 */
function removeBill(obj) {
    if (returnNumber($(obj).parent().find("input").val()) == 1) {
        $.jBox.tip("该付费信息已生成订单，不可删除", "error");
        return;
    }
    var _this = $(obj).parent().parent();
    var sumMoney = returnFloat($(_this).find("input[name='price']").val());
    var mdg_sumMoney = returnFloat($("#mdg_sumMoney").text());
    $("#mdg_sumMoney").text(mdg_sumMoney - sumMoney);

    $(_this).remove();
}

/**
 * 添加费用清单
 *
 * @param obj
 */
function addBillMoney(obj) {
    var bool = true;
    var _this = $(obj).parent().parent();
    $(_this).find("input.text-input").each(function () {
        if (isEmpty($(this).val())) {
            $(this).focus();
            bool = false;
            return false;
        }
    });

    if (bool) {
        $(_this).find("input.text-input").attr("readonly", true).css("border", "none");
        // 更新总金额
        var sumMoney = returnFloat($(_this).find("input[name='sumMoney']").val());
        var mdg_sumMoney = returnFloat($("#mdg_sumMoney").text());
        $("#mdg_sumMoney").text(mdg_sumMoney + sumMoney);

        $(obj).parent().append("<span class='btn' onclick='removeBill(this)'>删除</span>");
        $(obj).remove();
        var html = "<tr>" +
            "<td><input style='width: 120px;' class='short' type='text' placeholder='输入名称'/></td>" +
            "<td><input style='width: 78px;' class='short' type='text' name='price' value='' placeholder='单价' onkeyup='updateMoney(this)' /></td>" +
            "<td><input style='width: 60px;' class='short' type='text' name='count' value='1' placeholder='数量' onkeyup='updateMoney(this)' /></td>" +
            "<td><input style='width: 88px;' class='short' type='text' name='sumMoney' value='' placeholder='金额' onkeyup='updateMoney(this)' /></td>" +
            "<td><span class='btn bg-ok' onclick='addBillMoney(this)'>添加</span></td>" +
            "</tr>";
        $(_this).after(html);
    }
}

/**
 * 添加费用清单
 *
 * @param obj
 */
function addBillPayMoney(obj) {
    var bool = true;
    var _this = $(obj).parent().parent();
    _this.find("input").attr("disabled", "disabled");
    $(_this).find("input.text-input").each(function () {
        if (isEmpty($(this).val())) {
            $(this).focus();
            bool = false;
            return false;
        }
    });

    if (bool) {
        $(_this).find("input.text-input").attr("readonly", true).css("border", "none");
        // 更新总金额
        var sumMoney = returnFloat($(_this).find("input[name='price']").val());
        var mdg_sumMoney = returnFloat($("#mdg_sumMoney").text());
        $("#mdg_sumMoney").text(mdg_sumMoney + sumMoney);

        var payPersonHtml = '<div name="queryList"><div id="search-box1" style="display: flex;"><input type="text" style="margin-top: 0px;margin-right: 0px;width: 100%;border: none;background: #ddd;" placeholder="输入付费人名字、电话"><div onclick="closeWindow(this)" style="background: #ddd; cursor: pointer;"><i class="fa-close" style="margin: 7px 10px;"></i></div></div><div name="search-show"><div class="search-tisp">没有数据</div></div></div>';

        $(obj).parent().append("<span class='btn' onclick='removeBill(this)'>删除</span>");
        $(obj).remove();
        var html = "<tr>" +
            "<td><select style='width: 80px;' class='short' placeholder='付费对象' onchange='payObjectChange(this)'><option value='1'>客户</option><option value='2'>管家</option><option value='3'>门店</option></select></td>" +
            "<td><input style='width: 120px;' class='short' type='text' placeholder='付费人' onclick='selectPayPerson(this)' readonly/>" + payPersonHtml + "<input type='hidden' value='' name='payId'>" + "</td>" +
            "<td><input style='width: 120px;' class='short' type='text' placeholder='输入名称'/></td>" +
            "<td><input style='width: 78px;' class='short' type='text' name='price' value='' placeholder='费用金额' onkeyup='updateMoney(this)' /></td>" +
            // "<td><input style='width: 60px;' class='short' type='text' name='count' value='1' placeholder='数量' onkeyup='updateMoney(this)' /></td>" +
            // "<td><input style='width: 88px;' class='short' type='text' name='sumMoney' value='' placeholder='金额' onkeyup='updateMoney(this)' /></td>" +
            "<td><span class='btn bg-ok' onclick='addBillPayMoney(this)'>确认</span><input type='hidden' value='0'></td>" +
            "</tr>";
        $(_this).after(html);
    }
}

/**
 * 保洁订单提交
 */
function cleanOrderSubmit() {
    $.ajax({
        type: "POST",
        url: "/service/addTracks",
        data: {
            mtk_state: $("#mtk_state").val(),
            md_id: $("#md_id").val(),
            em_id: $("#em_id").val(),
            name: $("#moneyName").val(),
            phone: $("#moneyPhone").val()
        },
        dataType: "json"
    }).done(function (result) {
        if (result.code == 200) {
            $.jBox.tip("跟进成功", "success");
            $("#dispatch .serviceBg").animate({"opacity": "hide"});
            $("#dispatch .serviceContent").animate({"right": "-600px"});
            // 异步刷新服务进度
            window.location.reload();
        } else {
            $.jBox.tip(result.msg, "error");
        }
    });
}

/**
 * 费用清单
 */
function mainServiceBill() {

    var mdgMoney = returnFloat($("[name=mdg_money]").val());
    var totalMoney = returnFloat($("#mdg_sumMoney").text());
    if (mdgMoney < 0) {
        $.jBox.tip("请录入总费用", "error");
        return;
    }
    if (mdgMoney != totalMoney) {
        $.jBox.tip("费用总计须与费用合计相同", "error");
        return;
    }

    var moneyListt = "";
    $(".billList tbody tr").each(function () {
        if ($(this).find("td").eq(1).find("input").val() != "") {
            moneyListt += $(this).find("td").eq(0).find("select").val() + "-";
            moneyListt += $(this).find("td").eq(1).find("input[name=payId]").val() + "-";
            moneyListt += $(this).find("td").eq(2).find("input").val() + "-";
            moneyListt += $(this).find("td").eq(3).find("input[name=price]").val() + "-";
            moneyListt += $(this).find("td").eq(4).find("input").val() + "-";
            // moneyListt += "元-";
            // moneyListt += $(this).find("td").eq(5).find("input").val() + "-";
            moneyListt += ";";
        }
    });

    $.ajax({
        type: "POST",
        url: "/service/addserviceMoney",
        data: {
            md_id: getQueryString("md_id"),
            // mdg_sumMoney: $("#mdg_sumMoney").text(),
            moneyListt: moneyListt,
            mdgMoney: mdgMoney
        },
        dataType: "json"
    }).done(function (result) {
        if (result.message == "success") {
            $.jBox.tip("费用提交成功", "success");
            $("#dispatch .serviceBg").animate({"opacity": "hide"});
            $("#dispatch .serviceContent").animate({"right": "-600px"});
            // 异步刷新服务进度
            window.location.reload();
        } else {
            $.jBox.tip(result.msg, "error");
        }
    });
}

/**
 * 费用明细提交
 */
function maintainOrderSubmit() {

    var payObject = "";
    var payId = "";

    $.each($("[name=6]"), function (index, item) {
        if ($(this).hasClass("common-checkbox-checked2")) {
            var _td = $(this).parent().siblings();
            // infolist = _td.eq(0).find("input").val() + "&" + _td.eq(0).find("label").text() + "&" + _td.eq(1).find("input").val() + "&" + _td.eq(1).find("label").text() + "&" + _td.eq(2).find("label").text() + "&" + _td.eq(3).find("label").text();
            payObject = _td.eq(0).find("input").eq(0).val();
            payId = _td.eq(0).find("input").eq(1).val();
        }
    });

    if (isEmpty(payObject) || isEmpty(payId)) {
        $.jBox.tip("请选择录入费用明细对象", "error");
        return;
    }

    var moneyListt = "";
    $(".billList tbody tr").each(function () {
        if ($(this).find("td").eq(1).find("input").val() != "") {
            moneyListt += payObject + "-";
            moneyListt += payId + "-";
            moneyListt += $(this).find("td").eq(0).find("input").val() + "-";
            moneyListt += $(this).find("td").eq(1).find("input").val() + "-";
            moneyListt += $(this).find("td").eq(2).find("input").val() + "-";
            moneyListt += "元-";
            moneyListt += $(this).find("td").eq(3).find("input").val() + "-";
            moneyListt += ";";
        }
    });
    $.ajax({
        type: "POST",
        url: "/service/addServiceMoneyDetail",
        data: {
            // mtk_state: $("#mtk_state").val(),
            md_id: getQueryString("md_id"),
            // em_id: $("#em_id").val(),
            moneyList: moneyListt,
            // mdg_sumMoney: $("#mdg_sumMoney").text(),
            // mtk_spe_cir: $("#mtk_spe_cir").val(),
        },
        dataType: "json"
    }).done(function (result) {
        if (result.code == 200) {
            $.jBox.tip("费用明细录入成功", "success");
            // $("#dispatch .serviceBg").animate({"opacity": "hide"});
            // $("#dispatch .serviceContent").animate({"right": "-600px"});
            // 异步刷新服务进度
            // window.location.reload();
            $("#feiyong").click();
        } else {
            $.jBox.tip(result.msg, "error");
        }
    });
}

/**
 * 回访页面
 */
function visitServicePage(event) {
    // 阻止冒泡
    event.stopPropagation();
    $("#serviceProgress").text("服务回访");
    var html = "<dl class='layout-dl'>" +
        "<dt class='layout-dt'>服务打分：</dt>" +
        "<dd class='layout-dd' style='position: relative; cursor:default; '>" +
        "<span id='simplestar'>" +
        "<img id='image0' src='/resources/image/T1j.png'>" +
        "<img id='image1' src='/resources/image/T1j.png'>" +
        "<img id='image2' src='/resources/image/T1j.png'>" +
        "<img id='image3' src='/resources/image/T1j.png'>" +
        "<img id='image4' src='/resources/image/T1j.png'>" +
        "</span>" +
        "<div class='tooltip'>" +
        "<div class='tip-inner'>" +
        "<strong style='color: #F40;'>3分 一般</strong><span>质量一般，没有卖家描述的那么好</span>" +
        " </div>" +
        "<div class='tip-arrow'></div>" +
        "<div class='tip-arrow-inner'></div>" +
        "</div>" +
        "<div class='fraction'><em id='scores'></em> 分</div>" +
        "</dd>" +
        "</dl>" +
        "<dl class='layout-dl'>" +
        "<dt class='layout-dt'>评价信息：</dt>" +
        "<dd class='layout-dd'>" +
        "<textarea id='contentMessage'></textarea>" +
        "</dd>" +
        "</dl>" +
        "<dl class='layout-dl'>" +
        "<dt class='layout-dt'>图片描述：</dt>" +
        "<dd class='layout-dd'>" +
        "<div id='images'></div>" +
        "</dd>" +
        "</dl>";

    $("#dispatch .content_add").empty().append(html);
    // 加载图片插件
    var list = new Array();
    $("#service_image img").each(function () {
        list.push($(this).attr("src"));
    });
    $("#images").imageUpload({
        dataList: list,
        width: 110,
        height: 110,
        uploadType: 'maintenance',
        success: function (result) {
            result.css({"border": "none", "padding-left": "0px"});
        },
        builds: {
            onUpload: function (img) {
                // 保存图片到数据库
                addServiceImage(img.attr("data-url"));
            },
            onDelete: function (img) {
                // 删除图片
                deleteServiceImage(img.attr("data-url"));
            }
        }
    });
    $("#contentSubmit").click(submitFach);
    // 初始化插件
    initSimplestar();

    $("#dispatch").show();
    $("#dispatch").next().slideUp(300);
    $("#dispatch").find(".serviceBg").animate({"opacity": "show"});
    $("#dispatch").find(".serviceContent").animate({"right": "0"});
}

// 点击服务类型出现详细情况
function showContent(ids) {
    var _this = $(ids).next();
    if ($(_this).is(":hidden")) {
        $(_this).slideDown(300);
    } else {
        $(_this).slideUp(300);
    }
}

/**
 * 初始化评价插件
 */
function initSimplestar() {
    $("#simplestar img").hover(function () {
        var index = parseInt($(this).attr("id").replace("image", ""));
        $("#simplestar img").attr("src", "/resources/image/T1j.png");
        $("#simplestar img").each(function (i) {
            if (i <= index) {
                if (index < 2) {
                    $(this).attr("src", "/resources/image/T1lg.png");
                } else {
                    $(this).attr("src", "/resources/image/T1e.png");
                }
            }
        });

        if (index == 0) {
            $(".tooltip").css("left", "-91px").show();
            $(".tooltip strong").text("1分 很不满意");
            $(".tooltip span").text("差的太离谱，和服务不相符合！");
        } else if (index == 1) {
            $(".tooltip").css("left", "-69px").show();
            $(".tooltip strong").text("2分 不满意");
            $(".tooltip span").text("完成的比较差，和服务不相符合！");
        } else if (index == 2) {
            $(".tooltip").css("left", "-46px").show();
            $(".tooltip strong").text("3分 一般");
            $(".tooltip span").text("完成的一般，没有想象中的好");
        } else if (index == 3) {
            $(".tooltip").css("left", "-23px").show();
            $(".tooltip strong").text("4分 满意");
            $(".tooltip span").text("服务比较满意，与想象中的一致，还挺不错的");
        } else if (index == 4) {
            $(".tooltip").css("left", "0px").show();
            $(".tooltip strong").text("5分 很满意");
            $(".tooltip span").text("服务很满意，与想象中的一致，非常满意");
        }
    }, function () {
        $("#simplestar img").attr("src", "/resources/image/T1j.png");
        $(".tooltip").hide();
        if ($(".fraction em").text() != "") {
            var index = parseInt($(".fraction em").text()) - 1;
            $("#simplestar img").each(function (i) {
                if (i <= index) {
                    if (index < 2) {
                        $(this).attr("src", "/resources/image/T1lg.png");
                    } else {
                        $(this).attr("src", "/resources/image/T1e.png");
                    }
                }
            });
        }
    });

    //服务评分
    $(".tooltip").hover(function () {
        $(".tooltip").show();
        $("#simplestar img").attr("src", "/resources/image/T1j.png");
        var index = parseInt($(".tooltip strong").text().substring(0, 1)) - 1;
        $("#simplestar img").each(function (i) {
            if (i <= index) {
                if (index < 2) {
                    $(this).attr("src", "/resources/image/T1lg.png");
                } else {
                    $(this).attr("src", "/resources/image/T1e.png");
                }
            }
        });
    }, function () {
        $(".tooltip").hide();
        $("#simplestar img").attr("src", "/resources/image/T1j.png");
        if ($(".fraction em").text() != "") {
            var index = parseInt($(".fraction em").text()) - 1;
            $("#simplestar img").each(function (i) {
                if (i <= index) {
                    if (index < 2) {
                        $(this).attr("src", "/resources/image/T1lg.png");
                    } else {
                        $(this).attr("src", "/resources/image/T1e.png");
                    }
                }
            });
        }
    });

    $("#simplestar img").click(function () {
        var index = parseInt($(this).attr("id").replace("image", ""));
        $("#simplestar img").each(function (i) {
            if (i <= index) {
                if (index < 2) {
                    $(this).attr("src", "/resources/image/T1lg.png");
                } else {
                    $(this).attr("src", "/resources/image/T1e.png");
                }
            }
        });
        $("#contentMessage").val($(".tip-inner span").text());
        $(".fraction em").text(index + 1);
        $(".fraction").show();
    });
}

/**
 * 提交评价
 */
function submitFach() {
    //分数
    var fraction = $("#scores").text();
    if (isEmpty(fraction)) {
        $.jBox.tip("请为本次服务评分！", " ");
        return;
    }
    //图片路径
    var path = "";
    $.ajax({
        type: "POST",
        url: "/service/addVisit",
        data: {
            fraction: fraction,
            contentMessage: $("#contentMessage").val(),
            path: path,
            md_id: $("#md_id").val(),
            em_id: $("#em_id").val(),
            contractNo: $("#contractNo").val()
        },
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.msg == "success") {
                $.jBox.tip("评价成功", "sucess");
                $("#dispatch .serviceBg").animate({"opacity": "hide"});
                $("#dispatch .serviceContent").animate({"right": "-600px"});
                // 异步刷新服务进度
                window.location.reload();
            } else {
                $.jBox.tip(result.msg, "error");
            }
        }
    });
}

/**
 * 服务状态切换
 *
 * @param obj
 */
function chageServiceState(obj) {

    if ($(obj).val() == "error") {
        $("#inputContent").show();
        $("#inputMoney1").hide();
        $("#inputMoney2").hide();
    } else {
        $("#inputContent").hide();
        $("#inputMoney1").show();
        $("#inputMoney2").show();
    }
}

/** 改派 */
function updateDistributeLeaflets(event) {
    // 阻止冒泡
    event.stopPropagation();
    $("#serviceProgress").text("服务派单");

    var payPersonHtml = '<div name="queryList"><div id="search-box1" style="display: flex;"><input type="text" style="margin-top: 0px;margin-right: 0px;width: 100%;border: none;background: #ddd;" placeholder="输入付费人名字、电话"><div onclick="closeWindow(this)" style="background: #ddd; cursor: pointer;"><i class="fa-close" style="margin: 7px 10px;"></i></div></div><div name="search-show"><div class="search-tisp">没有数据</div></div></div>';
    $.ajax({
        type: "POST",
        url: "/service/acceptancePeople",
        data: {},
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
//	    async: true,
        success: function (result) {
            var html = '';
            $(result.customerServiceState).each(function (index, item) {
                html += '<div class="state-model" data-content="' + item.em_id + '">';
                html += '<label class="type-label" onclick="changeType(this)" for="type' + index + '">';
                html += '<div style="display: flex;">';
                html += '<span class="type-label-name" title="' + item.em_name + '">' + item.em_name + '</span>';
                html += '<span class="type-label-state" style="' + (returnNumber(item.taskCount) == 0 ? 'color: #1ABC9C' : "color: #E67E22") + '">' + (returnNumber(item.taskCount) == 0 ? '空闲中' : "忙碌中") + '</span><i></i>';
                html += '</div>';
                html += '<span class="type-label-name">待处理订单' + '<label class="error">' + returnNumber(item.taskCount) + '</label>' + '笔</span>';
                html += '<input type="radio" class="type-radio" name="em_id" value="' + item.em_id + '" id="type' + index + '" required="required">';
                html += '</label>';
                html += '</div>';
            });
            html += '<div id="mdOrderTable">';
            html += '</div>';
            $("#dispatch .content_add").empty().append(html);
            $("#contentSubmit").click(updateDistributeLeafletsSubmit);
        }
    });

    boolse = false;
    $("#dispatch").show();
    $("#dispatch").next().slideUp(300);
    $("#dispatch").find(".serviceBg").animate({"opacity": "show"});
    $("#dispatch").find(".serviceContent").animate({"right": "0"});
}

/** 房源改派 */
function updateDistributeLeafletsSubmit() {
    var emIdVal = $("#dispatch .type-radio:radio[name='em_id']:checked").val();
    if (isEmpty(emIdVal)) {
        $.jBox.tip("请选择派工人员", "error");
        return;
    }
    $.ajax({
        type: "POST",
        url: "/service/updateDistributeLeaflets",
        data: {
            md_id: getQueryString("md_id"),
            em_id: emIdVal
        },
        dataType: "json"
    }).done(function (result) {
        if (result.message == "success") {
            $.jBox.tip("派工成功", "success");
            $("#dispatch .serviceBg").animate({"opacity": "hide"});
            $("#dispatch .serviceContent").animate({"right": "-600px"});
            // 异步刷新服务进度
            window.location.reload();
            // 发送socket
            var employee = result.employee;
            window.parent.parent.sendMessages(employee.em_name + " ，你有一个派工单需要处理！", employee.em_id);
        } else {
            $.jBox.tip(result.msg, "error");
        }
    });
}

/**
 * 打印派工单
 */
function printService() {
    LODOP = getLodop();
    LODOP.PRINT_INIT("票据打印");
    $("#print").each(function (index) {
        LODOP.ADD_PRINT_TABLE(10, 17, "99.8%", 400, $(this).html());
    });
    LODOP.PREVIEW();
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
            RegExp.$1.length == 1 ? o[k] :
                ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}

/**
 * 保存维修图片
 *
 * @param path 图片路径
 */
function addServicePicture(path, type) {
    $.ajax({
        type: "POST",
        url: "/service/addServiceImageMoney",
        data: {
            md_id: $("#md_id").val(),
            image_url: path,
            type: type
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
 * 删除维修图片
 *
 * @param path 图片路径
 */
function deleteServicePicture(path) {
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

function submitWaixie() {
    var serType = $("[name=serType]").val();
    if ("-1" == serType) {
        $.jBox.tip("请选择服务", "error");
        return;
    }
    if ("2" == serType) {
        if (isEmpty($("[name=outsource_name]").val())) {
            $.jBox.tip("请输入外协名称", "error");
            return;
        }
        if (isEmpty($("[name=outsource_price]").val())) {
            $.jBox.tip("请输入外协报价", "error");
            return;
        }
        if (isEmpty($("[name=outsource_phone]").val())) {
            $.jBox.tip("请输入外协电话", "error");
            return;
        }
        if (isEmpty($("[name=outsource_result]").val())) {
            $.jBox.tip("请输入处理结果", "error");
            return;
        }
        if (isEmpty($("[name=end_time]").val())) {
            $.jBox.tip("请输入结束时间", "error");
            return;
        }
    }

    var paths = "";
    $("#imageUpload img").each(function () {
        paths += $(this).attr("data-url") + ";";
    });
    $.ajax({
        type: "POST",
        url: "/service/chooseService",
        data: {
            md_id: getQueryString("md_id"),
            serType: serType,
            outsource_name: $("[name=outsource_name]").val(),
            outsource_price: $("[name=outsource_price]").val(),
            outsource_phone: $("[name=outsource_phone]").val(),
            outsource_result: $("[name=outsource_result]").val(),
            end_time: $("[name=end_time]").val(),
            paths: paths,
        },
        dataType: "json",
        error: function (e) {
            alert("系统异常，请联系管理员");
        },
        success: function (result) {
            if (result.code == 200) {
                $.jBox.tip("处理完成", "success");
                cancelDiv();
            } else {
                $.jBox.tip(result.msg, "success");
            }
        }
    });
}

/**
 * 选择付费对象
 */
function selectPayPerson(obj) {
    // search($(obj).next().find("[name=search-show]"));
    var payType = $(obj).parent().prev().find("select").val();

    var $queryList = $(obj).next("[name=queryList]");
    var $show = $(obj).next().find("[name=search-show]");
    // var $box = $("#search-box");
    var $input = $queryList.find("input[type=text]");
    // var $item = $('#search-show .search-item');
    var $tips = '<div class="search-tisp">没有数据</div>';
    var param = $input.val();
    $.ajax({
        type: "POST",
        url: "/service/queryPayObject",
        data: {
            param: param,
            type: payType,
            md_id: getQueryString("md_id"),
        },
        dataType: "json",
        success: function (result) {
            if (result.code == 200) {
                var content = '';
                if (payType == "3") {
                    if (result.data.list.length <= 0) {
                        $show.html($tips);
                        return;
                    }
                    $.each(result.data.list, function (index, data) {
                        content += '<tr class="search-item" onclick="new search(this).setToInput(this)" ' + (data.ucc_name.indexOf("-") > -1 ? 'style="color:#ff6666;"' : '') + '>' + '<td title="付费人">' + '<input type="hidden" value="' + data.ucc_id + '">' + data.ucc_name + '</td>' + '<td title="联系电话">' + ((data.ucc_phone == null || data.ucc_phone == undefined) ? "" : data.ucc_phone) + '</td>' + '</tr>';
                    });
                } else {
                    if (result.data.length <= 0) {
                        $show.html($tips);
                        return;
                    }
                    $.each(result.data, function (index, data) {
                        if (payType == "1") {
                            content += '<tr class="search-item" onclick="new search(this).setToInput(this)">' + '<td title="付费人">' + '<input type="hidden" value="' + data.cc_code + '">' + data.cc_name + "(" + (isEmpty(data.cc_type) ? "" : data.cc_type) + ")" + '</td>' + '<td title="联系电话">' + data.ccp_phone + '</td>' + '</tr>';
                        } else if (payType == "2") {
                            content += '<tr class="search-item" onclick="new search(this).setToInput(this)" ' + (data.em_name.indexOf("-") > -1 ? 'style="color:#ff6666;"' : '') + '>' + '<td title="付费人">' + '<input type="hidden" value="' + data.em_id + '">' + data.em_name + '</td>' + '<td title="联系电话">' + data.em_phone + '</td>' + '</tr>';
                        }
                    });
                }
                $show.html('<table>' + '<thead>' + '<th style="text-a">付费人</th>' + '<th>联系电话</th>' + '</thead>' + '<tbody>' + content + '</tbody>' + '</table>');
            } else if (result.code == 201) {
                content = '<tr class="search-item" onclick="new search(this).setToInput(this)">' + '<td title="付费人">' + '<input type="hidden" value="' + result.data.user_id + '">' + (result.data.user_realName || result.data.user_nickName) + '</td>' + '<td title="联系电话">' + result.data.user_phone + '</td>' + '</tr>';
                $show.html('<table>' + '<thead>' + '<th style="text-a">付费人</th>' + '<th>联系电话</th>' + '</thead>' + '<tbody>' + content + '</tbody>' + '</table>');
            } else {
                $show.html('<div class="search-tisp">' + result.msg + '</div>');
            }
            $queryList.show();
        }
    });
    $input.bind("input propertychange",
        function () {
            $.ajax({
                type: "POST",
                url: "/queryPayObject",
                data: {
                    param: $(this).val(),
                    type: $(this).parent().parent().parent().prev().find("select").val(),
                    md_id: getQueryString("md_id"),
                },
                dataType: "json"
            }).done(function (result) {
                if (result.code == 200) {
                    var content = '';
                    if (payType == "3") {
                        if (result.data.list.length <= 0) {
                            $show.html($tips);
                            return;
                        }
                        $.each(result.data.list, function (index, data) {
                            content += '<tr class="search-item" onclick="new search(this).setToInput(this)"' + (data.ucc_name.indexOf("-") > -1 ? 'style="color:#ff6666;"' : '') + '>' + '<td title="付费人">' + '<input type="hidden" value="' + data.ucc_id + '">' + data.ucc_name + '</td>' + '<td title="联系电话">' + ((data.ucc_phone == null || data.ucc_phone == undefined) ? "" : data.ucc_phone) + '</td>' + '</tr>';
                        });
                    } else {
                        if (result.data.length <= 0) {
                            $show.html($tips);
                            return;
                        }
                        $.each(result.data, function (index, data) {
                            if (payType == "1") {
                                content += '<tr class="search-item" onclick="new search(this).setToInput(this)">' + '<td title="付费人">' + '<input type="hidden" value="' + data.cc_code + '">' + data.cc_name + "(" + (isEmpty(data.cc_type) ? "" : data.cc_type) + ")" + '</td>' + '<td title="联系电话">' + data.ccp_phone + '</td>' + '</tr>';
                            } else if (payType == "2") {
                                content += '<tr class="search-item" onclick="new search(this).setToInput(this)"' + (data.em_name.indexOf("-") > -1 ? 'style="color:#ff6666;"' : '') + '>' + '<td title="付费人">' + '<input type="hidden" value="' + data.em_id + '">' + data.em_name + '</td>' + '<td title="联系电话">' + data.em_phone + '</td>' + '</tr>';
                            }
                        });
                    }
                    $show.html('<table>' + '<thead>' + '<th style="text-a">付费人</th>' + '<th>联系电话</th>' + '</thead>' + '<tbody>' + content + '</tbody>' + '</table>');
                } else if (result.code == 201) {
                    content = '<tr class="search-item" onclick="new search(this).setToInput(this)">' + '<td title="付费人">' + '<input type="hidden" value="' + result.data.user_id + '">' + (result.data.user_realName || result.data.user_nickName) + '</td>' + '<td title="联系电话">' + result.data.user_phone + '</td>' + '</tr>';
                    $show.html('<table>' + '<thead>' + '<th style="text-a">付费人</th>' + '<th>联系电话</th>' + '</thead>' + '<tbody>' + content + '</tbody>' + '</table>');
                } else {
                    $show.html('<div class="search-tisp">' + result.msg + '</div>');
                }
            });
        });
    // 上、下、回车选择
    $input.keyup(function (event) {
        var $item = $('#search-show tbody>tr.search-item');
        if (event.keyCode == 40) { // 上键
            eindex++;
            if (eindex >= $item.length) {
                eindex = 0;
            }
            showSearchResult(eindex);
        } else if (event.keyCode == 38) { // 下键
            eindex--;
            if (eindex < 0) {
                eindex = $item.length - 1;
            }
            showSearchResult(eindex);
        } else if (event.keyCode == 13) { // 回车
            if (eindex >= 0) {
                setToInput($item.eq(eindex));
                close();
                eindex = -1;
                return false;
            }
        } else {
            eindex = -1;
        }
    });
    // 如果在表单中，防止回车提交
    $input.keydown(function (event) {
        if (event.keyCode == 13) {
            return false;
        }
    });

    /** 显示搜索结果 */
    var showSearchResult = function (index) {
        var $item = $('#search-show tbody>tr.search-item');
        $item.removeClass('item-hover').eq(index).addClass('item-hover');
    }
}

/** 搜索列表 */
function search(obj) {
    // 内部常量
    var eindex = -1;
    var $queryList = $(obj).parents("[name=queryList]");
    var $source = $queryList.prev();
    var $show = $(obj).parents("[name=search-show]");
    // var $box = $("#search-box1");
    var $input = $queryList.find("input[type=text]");
    var $item = $(obj).parents("[name=search-show]").find(".search-item");
    var $tips = '<div class="search-tisp">没有数据</div>';

    var param = $input.val();
    var payType = $queryList.prev().parent().prev().find("select").val();

    /** 显示搜索结果 */
    var showSearchResult = function (index) {
        var $item = $('#search-show tbody>tr.search-item');
        $item.removeClass('item-hover').eq(index).addClass('item-hover');
    }
    /** 设置input值 */
    this.setToInput = function (param) {
        var $objChildren = $(param).children("td");
        var payName = $objChildren.eq(0).text();
        $queryList.prev().val(payName.indexOf("-") > 1 ? payName.split("-")[0] : payName);
        $queryList.next().val($objChildren.eq(0).find("input[type=hidden]").val());
        $source.change();
        eindex = -1;
        close();
    }
    /** 关闭搜索框 */
    var close = function () {
        $input.val("");
        $show.empty().html($tips);
        $queryList.hide();
    }
    $queryList.bind("click", function (e) {
        stopPropagation(e);
    });
    $source.bind("click", function (e) {
        stopPropagation(e);
    });
    $(document).bind("click", function () {
        close();
    });
    $source.on("focus", function () {
        $queryList.show();
        $input.focus();
        $input.trigger("propertychange");
        $queryList.hover(function () {
                $(document).unbind("click");
            },
            function () {
                $(document).bind("click",
                    function () {
                        close();
                    });
            });
    });

    var stopPropagation = function (e) { // 把事件对象传入
        if (e.stopPropagation) { // 支持W3C标准
            e.stopPropagation();
        } else { // IE8及以下浏览器
            e.cancelBubble = true;
        }
    }
}

function payObjectChange(obj) {
    $(obj).parent().next().find("[type=text]").val("");
    closeWindow($(obj).parent().next().children("i.fa-colse").parent());
}

function confirmMoney(obj) {
    jBox.confirm('确认后，将无法继续录入', '提示', function (v, h, f) {
        if (v === 'ok') {
            $(obj).addClass("common-checkbox-checked2");
        } else if (v === 'cancel' && $(obj).hasClass("common-checkbox-checked2")) {
            $(obj).removeClass("common-checkbox-checked2");
        }
        return true;
    });
}

function inputMoney(obj) {
    if ($(obj).hasClass("common-checkbox-checked2")) {
        $(obj).removeClass("common-checkbox-checked2");
        $("#enterDl").hide();
    } else {
        $(obj).addClass("common-checkbox-checked2");
        $("#enterDl").show().attr("style", "display: block;");
    }
}

function getTractState(param) {
    var state = "";
    switch (param) {
        case "yes" :
            state = "服务完成";
            break;
        case "no" :
            state = "服务中";
            break;
        case "error" :
            state = "出现问题";
            break;
        case "confirm" :
            state = "客户确认";
            break;
        case "enter" :
            state = "费用确认";
            break;
        case "start" :
            state = "开始服务";
            break;
        case "stop" :
            state = "结束服务";
            break;
        default :
            state = "服务中";
            break;
    }

    return state;

}

function enterCase(obj) {
    if ($(obj).hasClass("common-checkbox-checked2")) {
        $(obj).removeClass("common-checkbox-checked2");
    } else {
        $(obj).addClass("common-checkbox-checked2").siblings().removeClass("common-checkbox-checked2");
    }
    if ($(obj).text().indexOf("确认") > -1 && $(obj).hasClass("common-checkbox-checked2")) {
        $("#customerDl").show();
    } else {
        $("#customerDl").hide();
    }
}

function selectHouse(obj) {
    if (!$(obj).hasClass("common-checkbox-checked2")) {
        $(obj).addClass("common-checkbox-checked2");
        $(obj).parent().parent().siblings().find(".common-checkbox2").removeClass("common-checkbox-checked2");
    } else {
        $(obj).removeClass("common-checkbox-checked2");
    }
}

function submitAccept() {
    var md_state = ""
    $.each($("label[name=md_state]"), function (index, item) {
        if ($(this).hasClass("common-checkbox-checked2")) {
            md_state = $(this).text();
        }
    });
    if (isEmpty(md_state)) {
        $.jBox.tip("请选择是否受理该服务订单", "error");
        return;
    }

    var infolist = "";
    $.each($("[name=5]"), function (index, item) {
        if ($(this).hasClass("common-checkbox-checked2")) {
            var _td = $(this).parent().siblings();
            infolist = _td.eq(0).find("input").val() + "&" + _td.eq(0).find("label").text() + "&" + _td.eq(1).find("input").val() + "&" + _td.eq(1).find("label").text() + "&" + _td.eq(2).find("label").text() + "&" + _td.eq(3).find("label").text();
        }
    });
    $.ajax({
        type: "POST",
        url: "/service/saveAccept",
        data: {
            md_id: getQueryString("md_id"),
            md_state: md_state,
            infolist: infolist
        },
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.code == 200) {
                $.jBox.tip("服务订单受理成功", "success");
                $("#dispatch .serviceBg").animate({"opacity": "hide"});
                $("#dispatch .serviceContent").animate({"right": "-600px"});
                // 异步刷新服务进度
                window.location.reload();
            } else {
                $.jBox.tip("服务订单受理失败，请联系管理员", "error");
            }
        }
    });
}

function overOrder(event) {

    // 阻止冒泡
    event.stopPropagation();

    $.jBox.confirm("确定提交费用明细吗？提交后将无法录入，慎点！", "提示", function (v, h, f) {
        if (v == 'ok') {
            $.ajax({
                type: "POST",
                url: "/service/overOrder",
                data: {
                    md_id: getQueryString("md_id"),
                },
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    if (result.code == 200) {
                        $.jBox.tip("费用明细提交成功，请早日完成回访客户", "success");
                        $("#dispatch .serviceBg").animate({"opacity": "hide"});
                        $("#dispatch .serviceContent").animate({"right": "-600px"});
                        // 异步刷新服务进度
                        window.location.reload();
                    } else {
                        $.jBox.tip("费用明细提交失败，请联系管理员", "error");
                    }
                }
            });
        }
        return true;
    });

}