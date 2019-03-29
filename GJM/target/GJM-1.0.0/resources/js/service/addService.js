var selectServe = null;
var IMG_LIMIT = 5;
var APPLY_TYPE_1101 = "租前服务";
var APPLY_TYPE_1102 = "代申请服务";
var eindex = -1;

$(function () {
    // 加载图片插件
    $("#imageUpload").imageUpload({
        width: 110,
        height: 110,
        uploadType: 'maintenance'
    });

    // showDesc(); // 图片描述
    // uploadPic();// 上传图片
    search(); // 搜索
    search2();
    queryServiceItems(); //
    $(".money").bind("input propertychange",
        function () {
            if (/[^0-9.]/g.test($(this).val())) {
                $(this).val("");
            }
            var sum = 0;
            $(".money").each(function () {
                var val = $(this).val();
                if (!isEmpty(val)) {
                    sum += parseInt($(this).val());
                }
            });
            $("#moneyTotal").val(sum);
        });

    $("#service-type").change(function () {
        $.ajax({
            type: "POST",
            url: "/service/changeType",
            data: {
                typeId: $(this).val()
            },
            dataType: "json"
        }).done(function (result) {
            if (result.code == 200) {
                $("#type-content").empty();
                $.each(result.data, function (index, data) {
                    $("#type-content").append('<option value="' + data.st_id + '">' + data.st_name + '</option>');
                });
                queryServiceItems();
            }
        });
        // if ($("#service-type option:selected").text().indexOf("维修") > -1) {
        //     $("#year_order").hide();
        // } else {
        //     $("#year_order").show();
        // }
        // if ($("#service-type option:selected").text().indexOf("保洁") > -1) {
        //     $("#year_order").show();
        // } else {
        //     $("#year_order").hide();
        // }

        // if (($("#service-type option:selected").text().indexOf("维修") < 0) && ($("#service-type option:selected").text().indexOf("保洁") < 0)) {
        //     $("#year_order").show();
        // }
    });
    /** 表单验证 */
    // $("#service-from").validationEngine();
    /** 表单验证 */
    $("#billform").validationEngine();

    if ($("#startTime").html() != null && $("#startTime").html() != "null") {
        $("#startTime").datepicker();
    }

    $("#apply-type").change(function () {
        $("#houseInfo").val("");
        $("#houseId").val("");
        $("#people").val("");
        $("#phone").val("");
        $("#contactPeople").val("");
        $("#contactPhone").val("");
        $("#sgin-info").hide();
        if ($(this).val() == "租前服务") {
            $("#typeRadio").html('<label class="typeRadio"><input type="radio" value="管家婆" name="4" checked="checked">管家婆</label><label class="typeRadio"><input type="radio" value="房东" name="4">房东</label><label class="typeRadio"><input type="radio" value="管家" name="4">管家</label>');
        } else if ($(this).val() == "代申请服务") {
            $("#typeRadio").html('<label class="typeRadio"><input type="radio" value="管家婆" name="4" checked="checked">管家婆</label><label class="typeRadio"><input type="radio" value="房东" name="4">房东</label><label class="typeRadio"><input type="radio" value="现租客" name="4">现租客</label>');
        } else if ($(this).val() == "外部用户") {
            $("#typeRadio").hide();
        }
        $('.typeRadio').click(function () {
            $("#houseInfo").val("");
            $("#houseId").val("");
            $("#people").val("");
            $("#phone").val("");
            if ($('input[name="4"]:checked').val() != "管家婆") {
                $("#sgin-info").show();
            } else {
                $("#sgin-info").hide();
            }
        });
    });

    $('.typeRadio').click(function () {
        $("#houseInfo").val("");
        $("#houseId").val("");
        $("#people").val("");
        $("#phone").val("");
        if ($('input[name="4"]:checked').val() != "管家婆") {
            $("#sgin-info").show();
        } else {
            $("#sgin-info").hide();
        }
    });

    $(".state-model").hover(function () {
            initPersonState($(this), $(this).attr("data-content"));
        },
        function () {
            $(".state-box").remove();
        });
    // initPersonState();

});

/** 提交数据 */
function submitData() {
    var serviceProblemDesc = "";
    serviceProblemDesc = $('input[name="desc"]:checked').attr("data-value");
    if (serviceProblemDesc == null) {
        serviceProblemDesc = "";
    }
    var checkItem = $(".check-item input:checked").parent();
    serviceProblemDesc += "[";
    $.each(checkItem, function (index, item) {
        serviceProblemDesc += item.innerText;
        if (index < checkItem.length - 1) {
            serviceProblemDesc += ",";
        }
    });
    if ($("textarea[name='serviceProblemDesc']").val() != "") {
        serviceProblemDesc += "]:" + $("textarea[name='serviceProblemDesc']").val();
    }
    $(".msg").empty();
    if (isEmpty(serviceProblemDesc)) {
        $("textarea[name='serviceProblemDesc']").parent().siblings(".msg").text("请选择或填写服务描述").addClass("error");
        return;
    }
    var $hinfo = $("#houseInfo").val();
    if (isEmpty($hinfo)) {
        $("#houseInfo").parent().siblings(".msg").text("请填写房屋地址").addClass("error");
        return;
    }
    // if (!$("#people").is(":hidden")) {
    //     var $people = $("#people").val();
    //     var $phone = $("#phone").val();
    //     if (isEmpty($people)) {
    //         $("#people").parent().siblings(".msg").text("请填写客户姓名").addClass("error");
    //         return;
    //     }
    //     if (isEmpty($phone)) {
    //         $("#phone").parent().siblings(".msg").text("请填写客户电话").addClass("error");
    //         return;
    //     }
    // }

    if (isEmpty($("#contactPeople").val())) {
        $("#contactPeople").parent().siblings(".msg").text("请填写联系人").addClass("error");
        return;
    }
    if (isEmpty($("#contactPhone").val())) {
        $("#contactPhone").parent().siblings(".msg").text("请填写联系人电话").addClass("error");
        return;
    }
    var md_time = $('input[name=startTime]').val();
    if (isEmpty(md_time)) {
        $("input[name=startTime]").parent().siblings(".msg").text("请选择预约时间").addClass("error");
        return;
    }

    var servicePicDescs = new Array();
    $('#imageUpload .image-item-img').each(function () {
        servicePicDescs.push($(this).attr("data-url"));
    });
    // var serviceObjMoney = null;
    // if (!$("#year_order").is(":hidden")) {
    //     var money = $("#money").val();
    //     var startTime = $("#startTime").val();
    //     if (isEmpty(money)) {
    //         $("#money").parent().siblings(".msg").text("请填写费用").addClass("error");
    //         return;
    //     }
    //     if (isEmpty(startTime)) {
    //         $("#startTime").parent().siblings(".msg").text("请选择生效时间").addClass("error");
    //         return;
    //     }
    //     serviceObjMoney = $("#money").val();
    // }

    var data = {};
    var declaration = {};
    var pointList = [];

    declaration.serviceDesc = $('select[name="serviceType"] option:selected').text();
    declaration.md_remark = serviceProblemDesc;
    // declaration.serviceObjHouseCode = $('input[name="serviceObjHouseId"]').val();
    declaration.md_type = $('select[name="serviceType"] option:selected').val();
    declaration.md_applyType = $('#type-content').val();
    declaration.md_contactpeople = $('input[name="contactPeople"]').val();
    declaration.md_contactPhone = $('input[name="contactPhone"]').val();
    // declaration.serviceObjMoney = serviceObjMoney;
    declaration.md_time = $('input[name="startTime"]').val();
    // declaration.serviceObjStartObjctNo = $('#contractObject_No').val();
    declaration.servicePicDesc = servicePicDescs;
    declaration.contractObject_Code = $("#contractObject_Code").val() || $("#contractObject_Code2").val();
    declaration.cc_code = $("#cc_code").val() || $("#cc_code2").val();
    // declaration.md_address = $("#houseInfo").val();
    declaration.user_id = ('undefined' == $("#user_id").val() ? "" : $("#user_id").val()) || ('undefined' == $("#user_id2").val() ? "" : $("#user_id2").val());
    declaration.mdg_money = $("#money").val();
    declaration.md_payType = $("[name=4]:checked").val();
    data.declaration = JSON.stringify(declaration);

    if (returnNumber($('select[name="serviceType"]').val()) == 6) {
        var point1 = {};
        point1.p_type = 2;
        point1.hi_code = $("#houseId").val();
        point1.house_longlat = $("#out_point").val();
        point1.house_address = $("#houseInfo").val();
        pointList.push(point1);
        var point2 = {};
        point2.p_type = 3;
        point2.hi_code = $("#houseId2").val();
        point2.house_longlat = $("#in_point").val();
        point2.house_address = $("#houseInfo2").val();
        pointList.push(point2);
        data.pointList = JSON.stringify(pointList);
    } else {
        var point1 = {};
        point1.p_type = 1;
        point1.hi_code = $("#houseId").val();
        point1.house_longlat = $("#out_point").val();
        point1.house_address = $("#houseInfo").val();
        pointList.push(point1);
        data.pointList = JSON.stringify(pointList);
    }

    $.ajax({
        type: "POST",
        url: "/service/addServiceApplyInfo",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        // serviceDesc: $('select[name="serviceType"] option:selected').text(),
        // serviceProblemDesc: $('select[name="serviceDesc"] option:selected').text()+"-"+serviceProblemDesc,
        // serviceObjHouseCode: $('input[name="serviceObjHouseId"]').val(),
        // serviceContent: $('select[name="serviceType"] option:selected').text(),
        // serviceApplyType: '代申请服务' + "(" + $('input[name="4"]:checked').val() + ")",
        // serviceObjName: $('input[name="serviceObjName"]').val(),
        // serviceObjPhone: $('input[name="serviceObjPhone"]').val(),
        // contactPeople: $('input[name="contactPeople"]').val(),
        // contactPhone: $('input[name="contactPhone"]').val(),
        // serviceObjMoney: serviceObjMoney,
        // serviceObjStartTime: $('input[name="startTime"]').val(),
        // serviceObjStartObjctNo: $('#contractObject_No').val(),
        // 'servicePicDesc': servicePicDescs,
        // contractObject_Code : $("#contractObject_Code").val(),
        // cc_code : $("#cc_code").val(),
        // md_address : $("#houseInfo").val(),
        // user_id : $("#user_id").val()
        success: function (result) {
            if (result.code == 200) {
                window.location.href = "/service/myService";
            } else {
                alert(result.msg);
            }
        }
    });
}

/** 查询服务子类型 */
function queryServiceItems() {
    var $val = $("#type-content").text();
    $("#desc-box").empty();
    $("#service-items").hide();
    $.ajax({
        type: "POST",
        url: "/service/changeType",
        data: {
            pId: $("#type-content").val()
        },
        dataType: "json"
    }).done(function (result) {
        if (result.code == 200) {
            if (isEmpty(result.data)) {
                $("#service-items").hide();
                return;
            }
            var html = "";
            $.each(result.data, function (index, item) {
                html += "<label class='check-item' onclick='checkProject(this)'><input type='checkbox' name='st_item' value='" + item.st_id + "' />" + item.st_name + "</label>";
            });
            $("#st_item").html(html);
            $("#service-items").show();
        }
    });
}

function checkProject(obj) {
    var checked = $(obj).find('input').is(":checked");
    if (checked) {
        $(obj).addClass("check-item-ok");
    } else {
        $(obj).removeClass("check-item-ok");
    }

}

/**
 *
 */
function descRadioCk(ids) {
    if ($(ids).find("input").attr("data-value") == "办公" || $(ids).find("input").attr("data-value") == "其他") {
        $("#money").val("");
    }
}

/** 查询服务项目描述 */
function queryServiceItemsDesc() {
    var $val = $("#type-content").text();
    $("#desc-box").empty();
    $.ajax({
        type: "POST",
        url: "/queryServiceDesc",
        data: {
            stId: $("#type-desc").val()
        },
        dataType: "json"
    }).done(function (result) {
        if (result.code == 200) {
            if (result.data && result.data.length > 0) {
                $.each(result.data,
                    function (index, data) {
                        if (index == 0) {
                            $("#desc-box").append('<label for="descRadio' + index + '"><input type="radio" data-id="' + data.pl_id + '" name="desc" checked="checked" id="descRadio' + index + '"  data-value="' + data.pl_name + '">' + data.pl_name + '</label>');
                        } else {
                            $("#desc-box").append('<label for="descRadio' + index + '"><input type="radio" data-id="' + data.pl_id + '" name="desc" id="descRadio' + index + '"  data-value="' + data.pl_name + '">' + data.pl_name + '</label>');
                        }
                    });
                $("#desc-box").append('<label for="descRadio"><input type="radio" name="desc" data-id="0" id="descRadio" data-value="其他">其他</label>');
                $("#desc-box").show();
            }
        }
    });
}

/** 搜索列表 */
function search() {
    // 外部常量
    var $source = $('#houseInfo');
    var $sourceVal = $('#houseId');

    // var $dataValue =$("#conid").attr("data-value");
    // 内部常量
    var eindex = -1;
    var $queryList = $("#queryList");
    var $show = $("#search-show");
    var $queryList2 = $("#queryList2");
    var $show2 = $("#search-show2");
    var $box = $("#search-box");
    var $input = $("#search-box input");
    var $item = $('#search-show .search-item');
    var $tips = '<div class="search-tisp">没有数据</div>';

    $input.bind("input propertychange",
        function () {
            $.ajax({
                type: "POST",
                url: "/service/queryHouseCustomerInfo",
                data: {
                    where: $input.val(),
                    // type: $("#apply-type:selected").val(),
                    customer_type: $('input[name="4"]:checked').val()
                },
                dataType: "json"
            }).done(function (result) {
                if (result.code == 200) {
                    var content = '';
                    if (result.data.list.length <= 0) {
                        $show.html($tips);
                        return;
                    }
                    $.each(result.data.list,
                        function (index, data) {
                            content += '<tr class="search-item" onclick="new search().setToInput(this)">' + '<td title="小区房号">' + '<input type="hidden" value="' + data.hi_code + '">' + '<input type="hidden" value="' + data.cc_code + '">' + '<input type="hidden" value="' + data.user_id + '">' + '<input type="hidden" value="' + data.contractObject_Code + '">' + '<input type="hidden" value="' + data.he_address + '">' + '<input type="hidden" value="' + data.propertyInfo_coordinate + '">' + data.house_address + '</td>' + '<td title="客戶信息">' + data.cc_name + '/' + data.ccp_phone + '</td>' + '<td title="管家信息">' + '<input type="hidden" value="' + data.em_id + '">' + data.em_name + '/' + data.em_phone + '</td>' + '<td title="所属门店">' + '<input type="hidden" value="' + data.ucc_id + '">' + data.ucc_name + '/' + data.ucc_phone + '</td>' + '</tr>';
                        });
                    $show.html('<table>' + '<thead>' + '<th style="text-a">小区房号</th>' + '<th>客户信息</th>' + '<th>管家信息</th>' + '<th>所属门店</th>' + '</thead>' + '<tbody>' + content + '</tbody>' + '</table>');
                } else {
                    $show.html('<div class="search-tisp">' + result.msg + '</div>');
                }
            });
            $show2.empty().html($tips);
            $queryList2.hide();
        });
    $source.bind("input propertychange", function () {
        close();
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
    /** 设置input值 */
    this.setToInput = function (param) {
        var $objChildren = $(param).children("td");
        $('#houseId').val($objChildren.eq(0).find("input[type='hidden']").eq(0).val());
        $("#cc_code").val($objChildren.eq(0).find("input[type='hidden']").eq(1).val());
        $("#user_id").val($objChildren.eq(0).find("input[type='hidden']").eq(2).val());
        $("#contractObject_Code").val($objChildren.eq(0).find("input[type='hidden']").eq(3).val());
        $("#he_address").val($objChildren.eq(0).find("input[type='hidden']").eq(4).val());
        $("#propertyInfo_coordinate").val($objChildren.eq(0).find("input[type='hidden']").eq(5).val());
        $('#houseInfo').val($objChildren.eq(0).text());

        var cust = new Array();
        var payType = $("[name=4]:checked").val();
        if ("租客" == payType || "房东" == payType) {
            cust = $objChildren.eq(1).text().split("/");
        } else if ("管家" == payType) {
            cust = $objChildren.eq(2).text().split("/");
        } else if ("门店" == payType) {
            cust = $objChildren.eq(3).text().split("/");
        }
        $("#contactPeople").val(cust[0]);
        $("#contactPhone").val(cust[1]);

        $source.change();
        eindex = -1;
        close();
    }
    /** 关闭搜索框 */
    var close = function () {
        $input.val("");
        $show.empty().html($tips);
        $queryList.hide();
        $show2.empty().html($tips);
        $queryList2.hide();
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
        // $input.focus();
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

/** 搜索列表 */
function search2() {
    // 外部常量
    var $source = $('#houseInfo2');
    var $sourceVal = $('#houseId2');

    // var $dataValue =$("#conid").attr("data-value");
    // 内部常量
    var eindex = -1;
    var $queryList1 = $("#queryList");
    var $show1 = $("#search-show");
    var $queryList = $("#queryList2");
    var $show = $("#search-show2");
    var $box = $("#search-box2");
    var $input = $("#search-box2 input");
    var $item = $('#search-show2 .search-item');
    var $tips = '<div class="search-tisp">没有数据</div>';

    $input.bind("input propertychange", function () {
        $.ajax({
            type: "POST",
            url: "/service/queryHouseCustomerInfo",
            data: {
                where: $input.val(),
                // type: $("#apply-type:selected").val(),
                customer_type: $('input[name="4"]:checked').val()
            },
            dataType: "json"
        }).done(function (result) {
            if (result.code == 200) {
                var content = '';
                if (result.data.list.length <= 0) {
                    $show.html($tips);
                    return;
                }
                $.each(result.data.list,
                    function (index, data) {
                        content += '<tr class="search-item" onclick="new search2().setToInput(this)">' + '<td title="小区房号">' + '<input type="hidden" value="' + data.hi_code + '">' + '<input type="hidden" value="' + data.cc_code + '">' + '<input type="hidden" value="' + data.user_id + '">' + '<input type="hidden" value="' + data.contractObject_Code + '">' + '<input type="hidden" value="' + data.he_address + '">' + '<input type="hidden" value="' + data.propertyInfo_coordinate + '">' + data.house_address + '</td>' + '<td title="客戶信息">' + data.cc_name + '/' + data.ccp_phone + '</td>' + '<td title="管家信息">' + '<input type="hidden" value="' + data.em_id + '">' + data.em_name + '/' + data.em_phone + '</td>' + '<td title="所属门店">' + '<input type="hidden" value="' + data.ucc_id + '">' + data.ucc_name + '/' + data.ucc_phone + '</td>' + '</tr>';
                    });
                $show.html('<table>' + '<thead>' + '<th style="text-a">小区房号</th>' + '<th>客户信息</th>' + '<th>管家信息</th>' + '<th>所属门店</th>' + '</thead>' + '<tbody>' + content + '</tbody>' + '</table>');
            } else {
                $show.html('<div class="search-tisp">' + result.msg + '</div>');
            }
        });
        $show1.empty().html($tips);
        $queryList1.hide();
    });
    $source.bind("input propertychange", function () {
        close();
    });
    // 上、下、回车选择
    $input.keyup(function (event) {
        var $item = $('#search-show2 tbody>tr.search-item');
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
        var $item = $('#search-show2 tbody>tr.search-item');
        $item.removeClass('item-hover').eq(index).addClass('item-hover');
    }
    /** 设置input值 */
    this.setToInput = function (param) {
        var $objChildren = $(param).children("td");
        $('#houseId2').val($objChildren.eq(0).find("input[type='hidden']").eq(0).val());
        $("#cc_code2").val($objChildren.eq(0).find("input[type='hidden']").eq(1).val());
        $("#user_id2").val($objChildren.eq(0).find("input[type='hidden']").eq(2).val());
        $("#contractObject_Code2").val($objChildren.eq(0).find("input[type='hidden']").eq(3).val());
        $("#he_address2").val($objChildren.eq(0).find("input[type='hidden']").eq(4).val());
        $("#propertyInfo_coordinate2").val($objChildren.eq(0).find("input[type='hidden']").eq(5).val());
        $('#houseInfo2').val($objChildren.eq(0).text());

        var cust = new Array();
        var payType = $("[name=4]:checked").val();
        if ("租客" == payType || "房东" == payType) {
            cust = $objChildren.eq(1).text().split("/");
        } else if ("管家" == payType) {
            cust = $objChildren.eq(2).text().split("/");
        } else if ("门店" == payType) {
            cust = $objChildren.eq(3).text().split("/");
        }
        $("#contactPeople").val(cust[0]);
        $("#contactPhone").val(cust[1]);

        $source.change();
        eindex = -1;
        close();
    }
    /** 关闭搜索框 */
    var close = function () {
        $input.val("");
        $show.empty().html($tips);
        $queryList.hide();
        $show1.empty().html($tips);
        $queryList1.hide();
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
        // $input.focus();
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

function initPersonState(obj, param) {
    $.ajax({
        type: "POST",
        url: "/initPersonState",
        data: {
            em_id: param
        },
        dataType: "json"
    }).done(function (result) {
        if (result.code == 200) {
            var tr = "";
            if (result.data.length <= 0) {
                return;
            }
            $.each(result.data,
                function (index, data) {
                    tr += '<tr>' + '<td>' + data.md_number + '</td>' + '<td>' + data.md_problem + '</td>' + '<td>' + data.propertyInfo_Name + data.hi_address + '</td>' + '<td>' + (data.md_state == "未受理" ? data.md_state : data.mdg_state) + '</td>' + '</tr>';
                });
            var show = '<div class="state-box"><table>' + '<thead>' + '<tr>' + '<th>订单号</th>' + '<th>描述</th>' + '<th>地点</th>' + '<th>状态</th>' + '</tr>' + '</thead>' + '<tbody>' + tr + '</tbody>' + '</table></div>';
            $(obj).append(show);
        } else {
            console.log(result.msg);
        }
    });
}

/** 时间出发事件 */
function dateChange() {
    $("#time-msg").text("");
}

/** 上传图片 */
function uploadPic() {
    var len = $(".img-box").length;
    $("#file-tisp").text(len);
    $("#uploadfile").uploadify({
        'uploader': '/service/fileUpload',
        'buttonText': '请选择图片',
        'swf': '../resources/common/uploadify/img/uploadify.swf',
        'fileTypeExts': '*.gif;*.jpg;*.bmp;*.jpeg;*.png',
        'fileTypeDesc': '*.gif;*.jpg;*.bmp;*.jpeg;*.png',
        'method': 'POST',
        'width': 98,
        'height': 98,
        'dataType': 'json',
        'formData': {
            type: "WTS"
        },
        'onInit': function () {
            $("#uploadfile-queue").remove();
        },
        // 隐藏进度条
        'onUploadStart': function () {
            $("#uploadfile").append('<div id="img-loading"><i></i></div>');
        },
        'onUploadSuccess': function (file, result, response) {
            var result = eval('(' + result + ')');
            if (result.code == 200) {
                var $file = $("#uploadfile");
                $.each(result.data,
                    function (index, data) {
                        $file.before("<div class='img-box'>" + "<input type='hidden' name='servicePic' value='" + result.data + "'>" + "<img class='img-img' src='" + result.data + "' width='100' height='100' style='cursor:pointer;' />" + "<span class='img-mark'></span>" + "<span class='img-title' onclick='delfile(this,\"" + result.data + "\")' >删除</span>" + "</div>");
                        var newLen = $(".img-box").length;
                        $("#file-tisp").text(newLen);
                        if (newLen == IMG_LIMIT) {
                            $file.hide();
                        }
                        $file.find("#img-loading").remove();
                    });
            } else {
                alert(result.msg);
            }
        }
    });
}

/** 删除图片 */
function delfile(obj, src) {
    var $this = $(obj);
    var $file = $("#uploadfile");
    var $tisp = $("#file-tisp");
    $(obj).parent(".img-box").hide();
    $.ajax({
        type: "POST",
        url: "/service/deleteImage",
        data: "df=" + src,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        async: true,
        success: function (result) {
            if (result.code == 200) {
                $file.show();
                $this.parent(".img-box").remove();
                var newLen = $(".img-box").length;
                $tisp.text(newLen);
                if (newLen < 5) {
                    $file.show();
                    $("#fczFileBox").append('<input type="file" name="fczFile" id="fczFile" class="input-file"/>');
                    uploadPic();
                }
            }
        }
    });
}

function changeType(obj) {
    $(".type-label").removeClass("span-checked");
    $(obj).addClass("span-checked");
}

function setEmailLi(index) {
    var $li = $('#queryList .item-li');
    $li.removeClass('item-hover').eq(index).addClass('item-hover');
}

//
// function setToInput(obj){
// $('#houseInfo').val($(obj).children(".query-item").eq(2).text());
// $("#houseId").val($(obj).children(".query-item").eq(0).find(":hidden").val());
// }
function queryHouseInfo() {
    $.ajax({
        type: "POST",
        url: "/querySginInfo",
        data: {
            param: $("#houseInfo").data("data")
        },
        dataType: "json"
    }).done(function (result) {
        if (result.code == 200) {
            $("#people").val(result.contractSign_Name);
            $("#phone").val(result.contractSign_Phone);
        }
    });
}

/** 图片描述 */
function showDesc() {
    var len = $(".img-box").length;
    $("#desc-tisp").text(len);
    $("#descFile").uploadify({
        'uploader': 'AddFileUpload',
        'buttonText': '请选择图片',
        'swf': '../resources/common/uploadify/img/uploadify.swf',
        'fileTypeExts': '*.gif;*.jpg;*.bmp;*.jpeg;*.png',
        'fileTypeDesc': '*.gif;*.jpg;*.bmp;*.jpeg;*.png',
        'method': 'POST',
        'width': 98,
        'height': 98,
        'dataType': 'json',
        'formData': {
            type: "WTS"
        },
        'onInit': function () {
            $("#descFile-queue").remove();
        },
        // 隐藏进度条
        'onUploadStart': function () {
            $("#descFile").append('<div id="img-loading"><i></i></div>');
        },
        'onUploadSuccess': function (file, result, response) {
            var result = eval('(' + result + ')');
            if (result.code == 200) {
                var $file = $("#descFile");
                $.each(result.data,
                    function (index, data) {
                        $file.before("<div class='img-box'>" + "<input type='hidden' name='servicePicDesc' value='" + result.data + "'>" + "<img class='img-img' src='" + result.data + "' width='100' height='100' style='cursor:pointer;' />" + "<span class='img-mark'></span>" + "<span class='img-title' onclick='del(this,\"" + result.data + "\")' >删除</span>" + "</div>");
                        var newLen = $(".img-box").length;
                        $("#desc-tisp").text(newLen);
                        if (newLen == IMG_LIMIT) {
                            $file.hide();
                        }
                        $file.find("#img-loading").remove();
                    });
            } else {
                alert(result.msg);
            }
        }
    });
}

/** 删除描述图片 */
function del(obj, src) {
    var $this = $(obj);
    var $file = $("#descFile");
    var $tisp = $("#desc-tisp");
    $(obj).parent(".img-box").hide();
    $.ajax({
        type: "POST",
        url: "AddDeleteImage",
        data: "df=" + src,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        async: true,
        success: function (result) {
            if (result.code == 200) {
                $file.show();
                $this.parent(".img-box").remove();
                var newLen = $(".img-box").length;
                $tisp.text(newLen);
                if (newLen < 5) {
                    $file.show();
                    $("#fczFileBox").append('<input type="file" name="fczFile" id="fczFile" class="input-file"/>');
                    showDesc();
                }
            }
        }
    });
}

/* =======================================页面分页============================================== */

// 判断页数
function page() {
    // 开始的页数样式
    if ($("#sizeNum").text() <= 5) {
        $(".paginList").html("<li class='paginItem'><a href='javascript:up();'><span class='pagepre' id='up'></span></a></li>");
        for (var i = 1; i <= $("#sizeNum").text(); i++) {
            $(".paginList").append("<li id='paginList_" + i + "' class='paginItem'><a href='javascript:li(" + i + ");'>" + i + "</a></li>");
        }
        $(".paginList").append("<li class='paginItem'><a href='javascript:down();'><span class='pagenxt' id='down'></span></a></li>");
        $(".paginList").append("<li id='sizeCount'><input type='text' onkeyup='this.value=this.value.replace(/[^0-9]\D*$/,\"\")' value='" + $("#data").data("pageCount") + "' placeholder='请输入条数' /></li>");
        $(".paginList").append("<li class='paginItem'><a href='javascript:data();'>设置</a></li>");
    } else {
        if ($("#Num").text() <= 5) {
            $(".paginList").html("<li class='paginItem'><a href='javascript:up();'><span class='pagepre' id='up'></span></a></li>");
            for (var i = 1; i <= 5; i++) {
                $(".paginList").append("<li id='paginList_" + i + "' class='paginItem'><a href='javascript:li(" + i + ");'>" + i + "</a></li>");
            }
            $(".paginList").append("<li class='paginItem'><a href='javascript:down();'><span class='pagenxt' id='down'></span></a></li>");
            $(".paginList").append("<li id='sizeCount'><input type='text' onkeyup='this.value=this.value.replace(/[^0-9]\D*$/,\"\")' value='" + $("#data").data("pageCount") + "' placeholder='请输入条数' /></li>");
            $(".paginList").append("<li class='paginItem'><a href='javascript:data();'>设置</a></li>");
        }
    }
    // end
    // 样式变化
    $(".paginList li").each(function (idx) {
        $(this).attr("class", "paginItem");
    });
    $("#paginList_" + $("#Num").text() + "").attr("class", "paginItem current");
    // end
    // 判断最后一页和第一页的样式
    if ($("#Num").text() == $("#sizeNum").text() && $("#sizeNum").text() != "1") {
        $(".paginItem span[id=down]").css("background", "url(/resources/image/next_1.gif) no-repeat center center");
        $(".paginItem span[id=up]").css("background", "url(/resources/image/pre.gif) no-repeat center center");
    } else if ($("#Num").text() == "1" && $("#sizeNum").text() != "1") {
        $(".paginItem span[id=down]").css("background", "url(/resources/image/next.gif) no-repeat center center");
        $(".paginItem span[id=up]").css("background", "url(/resources/image/pre_1.gif) no-repeat center center");
    } else if ($("#Num").text() == "1" && $("#sizeNum").text() == "1") {
        $(".paginItem span[id=down]").css("background", "url(/resources/image/next_1.gif) no-repeat center center");
        $(".paginItem span[id=up]").css("background", "url(/resources/image/pre_1.gif) no-repeat center center");
    } else if ($("#Num").text() != "1" && $("#Num").text() != $("#sizeNum").text()) {
        $(".paginItem span[id=down]").css("background", "url(/resources/image/next.gif) no-repeat center center");
        $(".paginItem span[id=up]").css("background", "url(/resources/image/pre.gif) no-repeat center center");
    }
    // end
    // 间隔变色
    $('.tablelist tbody tr:odd').addClass('odd');
}

/* 点击LI分页读取数据 */
function li(id) {

    $("#Num").text(id);
    $("#paginList_" + id + " a").attr("class", "paginItem");
    data();
}

function up() {
    // 获取当前页数
    var pageMum = parseInt($("#Num").text());
    // 最大页数
    var pageSize = parseInt($("#sizeNum").text());
    if (pageMum > 1) {
        if ((pageMum - 1) % 5 == 0) {
            $(".paginList").html("<li class='paginItem'><a href='javascript:up();'><span class='pagepre' id='up'></span></a></li>");
            for (var i = 5; i > 0; i--) {
                $(".paginList").append("<li id='paginList_" + (pageMum - i) + "' class='paginItem'><a href='javascript:li(" + (pageMum - i) + ");'>" + (pageMum - i) + "</a></li>");
            }
            $(".paginList").append("<li class='paginItem'><a href='javascript:down();'><span class='pagenxt' id='down'></span></a></li>");
            $(".paginList").append("<li id='sizeCount'><input type='text' onkeyup='this.value=this.value.replace(/[^0-9]\D*$/,\"\")' value='" + $("#data").data("pageCount") + "' placeholder='请输入条数' /></li>");
            $(".paginList").append("<li class='paginItem'><a href='javascript:data();'>设置</a></li>");
        }
        $("#Num").text(pageMum - 1);
        data();
    }
}

function down() {
    // 获取当前页数
    var pageMum = parseInt($("#Num").text());
    // 最大页数
    var pageSize = parseInt($("#sizeNum").text());
    if (pageMum < pageSize) {
        if ((pageMum + 5) < pageSize) {
            if (pageMum % 5 == 0) {

                $(".paginList").html("<li class='paginItem'><a href='javascript:up();'><span class='pagepre' id='up'></span></a></li>");
                for (var i = 1; i <= 5; i++) {
                    $(".paginList").append("<li id='paginList_" + (pageMum + i) + "' class='paginItem'><a href='javascript:li(" + (pageMum + i) + ");'>" + (pageMum + i) + "</a></li>");
                }
                $(".paginList").append("<li class='paginItem'><a href='javascript:down();'><span class='pagenxt' id='down'></span></a></li>");
                $(".paginList").append("<li id='sizeCount'><input type='text' onkeyup='this.value=this.value.replace(/[^0-9]\D*$/,\"\")' value='" + $("#data").data("pageCount") + "' placeholder='请输入条数' /></li>");
                $(".paginList").append("<li class='paginItem'><a href='javascript:data();'>设置</a></li>");
            }
            $("#Num").text(pageMum + 1);
            data();
        } else {
            if (pageMum % 5 == 0) {
                $(".paginList").html("<li class='paginItem'><a href='javascript:up();'><span class='pagepre' id='up'></span></a></li>");
                for (var i = 4; i >= 0; i--) {
                    $(".paginList").append("<li id='paginList_" + (pageSize - i) + "' class='paginItem'><a href='javascript:li(" + (pageSize - i) + ");'>" + (pageSize - i) + "</a></li>");
                }
                $(".paginList").append("<li class='paginItem'><a href='javascript:down();'><span class='pagenxt' id='down'></span></a></li>");
                $(".paginList").append("<li id='sizeCount'><input type='text' onkeyup='this.value=this.value.replace(/[^0-9]\D*$/,\"\")' value='" + $("#data").data("pageCount") + "' placeholder='请输入条数' /></li>");
                $(".paginList").append("<li class='paginItem'><a href='javascript:data();'>设置</a></li>");
            }
            $("#Num").text(pageMum + 1);
            data();
        }
    }
}

// 毫秒转换为日期格式
var format = function (time, format) {
    var t = new Date(time);
    var tf = function (i) {
        return (i < 10 ? '0' : '') + i
    };
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g,
        function (a) {
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
 * 增加费用列表
 */
function addMoneyF(ids) {
    if ($("#moneyL").val() == "") {
        $(ids).next().text("费用来源不能为空");
        $("#moneyL").focus();
        return;
    }
    if ($("#moneyF").val() == "") {
        $(ids).next().text("费用不能为空");
        $("#moneyF").focus();
        return;
    }
    if ($("#num").val() == "") {
        $(ids).next().text("费用不能为空");
        $("#num").focus();
        return;
    }
    $(".moneyTable tbody").append("<tr><td>" + $("#moneyL").val() + "</td><td>" + $("#moneyF").val() + "</td><td>" + $("#num").val() + "</td><td>" + $("#company").val() + "</td><td>" + parseInt($("#moneyF").val()) * parseInt($("#num").val()) + "</td><td>" + $("#beizhus").val() + "</td><td><a href='javascript:;' onclick='$(this).parent().parent().remove()'>删除</a></td></tr>");
    $("#moneyL").val("");
    $("#moneyF").val("");
    $("#company").val("");
    $("#beizhus").val("");
    $("#num").next().text("费用不能为空");
}

/**
 * 服务状态改变下拉框
 *
 * @param ids
 */
function stateChange(ids) {
    if ($(ids).val() == "auditing") {
        $("#inputMoney").show();
        $("#inputContent").hide();
    } else if ($(ids).val() == "error") {
        $("#inputMoney").hide();
        $("#inputContent").show();
    }
}

function returnNumber(str) {
    return (str == null || str == "" || typeof(str) == "undefined") ? 0 : parseInt(str);
}

function returnValue(str) {
    return (str == null || str == "" || typeof(str) == "undefined" || str == "undefined") ? "" : str;
}

function isEmpty(str) {
    return (typeof(str) == "undefined" || str == "" || str == null);
}

/**********地图坐标*********/
function mapsszuobiao(obj) {
    var he_address = $(obj).siblings("input:hidden").eq(7).val();
    var house_address = $(obj).prev().val();

    if (isEmpty(house_address)) {
        swal("房屋地址", "请选择房屋地址", "error");
        return;
    }

    var xyz = $(obj).siblings("input:hidden").eq(8).val();

    $.jBox("iframe:/propertyInfo/map?hi_address=" + (isEmpty(he_address) ? house_address : he_address) + "&xyz=" + xyz + "&house_type=" + $(obj).attr("data-content-id"), {
        title: "管家婆管理系统",
        width: 1000,
        height: 550,
        buttons: {'关闭': true}
    });
}

function checkSerbiceType(obj) {
    var servType = $(obj).val();
    if (returnNumber(servType) == 6) {// 搬家
        $("#moveInDl").show();
        $("#moveName").text("搬出地址");
        $("#houseInfo").attr("placeholder", "请输入搬出房屋地址");
    } else {
        $("#moveInDl").hide();
        $("#moveName").text("房屋地址");
        $("#houseInfo").attr("placeholder", "请输入房屋地址");
    }
}