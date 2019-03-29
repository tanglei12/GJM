$(function () {
    search();
    showBank(); // 银行卡
});
var CONTRACT_STATE = true;

/** 搜索列表*/
function search() {
    // 外部常量
    var $sources = $('#houseno');
    // 外部常量
    var $hicode = $('#hicode');
    var $hiaddress = $('#hiaddress');
    var $source = $('#conhouseno');
    var $dataValue = $("#conid").attr("data-value");
    // 内部常量
    var $queryList = $("#queryList");
    var $show = $("#search-show");
    var $box = $("#search-box");
    var $input = $("#search-box>input");
    var $item = $('#search-show .search-item');
    var $tips = '<div class="search-tisp">没有数据</div>';

    $input.bind("input propertychange", function () {
        $.ajax({
            type: "POST",
            url: "/addReserveBillSelectHouse",
            data: {
                param: $input.val(),
                type: $dataValue,
                hType: $(".nav-item-focus").attr("data-type")
            },
            dataType: "json"
        }).done(function (result) {
            if (result.payRentList != null) {
                var content = '';
                $.each(result.payRentList, function (index, payRent) {
                    if (payRent.he_state == 'free') {
                        payRent.he_state = "未租"
                    }
                    if (payRent.he_state == 'rental') {
                        payRent.he_state = "已租"
                    }
                    if (payRent.he_state == 'expire') {
                        payRent.he_state = "托管到期"
                    }
                    if (payRent.he_state == 'clean') {
                        payRent.he_state = "需要打扫"
                    }
                    if (payRent.he_state == 'edit') {
                        payRent.he_state = "未发布"
                    }
                    if (payRent.deposit == '' || payRent.deposit == null) {
                        payRent.deposit = ""
                    }
                    content +=
                        '<tr class="search-item" onclick="new search().setToInput(this)">' +
                        '<td title="小区房号">' + payRent.propertyInfo_Name + " " + payRent.hi_address + '</td>' +
                        '<td title="管家">' + payRent.hb_name + '</td>' +
                        '<td title="租客">' + payRent.he_state + '</td>' +
                        '<td title="小区房号">' + payRent.hi_code + '</td>' +
                        '<td title="定金" style="display:none;">' + payRent.deposit + '</td>' +
                        '</tr>';
                });
                $show.html('<table><body>' + content + '</body></table>');
            } else {
                $show.html('<div class="search-tisp">' + result.msg + '</div>');
            }
        });
    });
    // 上、下、回车选择
    $input.keyup(function (event) {
        var $item = $('#search-show .search-item');
        if (event.keyCode == 40) {// 上键
            eindex++;
            if (eindex >= $item.length) {
                eindex = 0;
            }
            showSearchResult(eindex);
        } else if (event.keyCode == 38) {// 下键
            eindex--;
            if (eindex < 0) {
                eindex = $item.length - 1;
            }
            showSearchResult(eindex);
        } else if (event.keyCode == 13) { // 回车
            if (eindex >= 0) {
                var $td = $item.eq(eindex).children("td");
                $source.val($td.eq(0).text());
                $sources.val($td.eq(2).text());
                $("#heState").val($td.eq(2).text());
                $("#rb_houseNum").val($td.eq(3).text());
                $("#rb_money").val($td.eq(4).text());
                $(".conhousenoformError").remove();
                $source.data("data", $td.eq(0).text());
                $source.change();
                close();
                eindex = -1
                return false;
            }
        } else {
            eindex = -1;
        }
    });
    //如果在表单中，防止回车提交
    $input.keydown(function (event) {
        if (event.keyCode == 13) {
            return false;
        }
    });

    /** 显示搜索结果 */
    var showSearchResult = function (index) {
        var $item = $('#search-show .search-item');
        $item.removeClass('item-hover').eq(index).addClass('item-hover');
    }
    /** 设置input值 */
    this.setToInput = function (param) {
        var $objChildren = $(param).children("td");
        $source.val($objChildren.eq(0).text());
        $sources.val($objChildren.eq(2).text());
        $("#heState").val($objChildren.eq(2).text());
        $("#rb_houseNum").val($objChildren.eq(3).text());
        $("#rb_money").val($objChildren.eq(4).text());
        $(".conhousenoformError").remove();
        $source.data("data", $objChildren.eq(0).text());
        $source.change();
        close();
        $("#wyj").remove();
        selecter();
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
    })
    $source.on("focus", function () {
        $queryList.show();
        $input.focus();
        $input.trigger("propertychange");
        $queryList.hover(function () {
            $(document).unbind("click");
        }, function () {
            $(document).bind("click", function () {
                close();
            });
        });
    });

    var stopPropagation = function (e) {//把事件对象传入
        if (e.stopPropagation) { //支持W3C标准
            e.stopPropagation();
        } else { //IE8及以下浏览器
            e.cancelBubble = true;
        }
    }
}

function selecter() {
    $("#tishi").html("");
    $("#tishi").css("color", 'red');
    var heState = $("#heState").val();
    if (heState == '未租') {
        $("#tishi").css("color", 'green');
        $("#tishi").html("该房屋可以预定!");
    }
    if (heState == '已租') {
        $("#tishi").css("color", 'red');
        $("#tishi").html("该房屋已预定或已出租，请重新选房!");
    }
    if (heState == '未发布') {
        $("#tishi").css("color", 'red');
        $("#tishi").html("该房屋还未发布，请重新选房!");
    }
}

/**
 * 获取url中的参数
 * */
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}

/**
 *时间戳转化为时间
 * */
function FormatDate(strTime) {
    var date = new Date(strTime);
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
}

function addReserveBill() {
    if ($("input[name='rb_cycle']").val() == "0") {
        alert("租房月数不能为0!");
    }
//	if($("#conhouseno").val() == "" || $("input[name='rb_name']").val() == '' || $("input[name='rb_phone']").val() == '' || $("input[name='rb_personNum']").val() == '' || $("input[name='rb_money']").val() == '' || $("input[name='rb_reserveDate']").val() == '' || $("input[name='rb_cycle']").val() == ''){
//		alert("请完善信息!");
//	}else{
    if ($("#tishi").html() == '该房屋可以预定!') {
        $("#addSubmit").submit();
//			$.ajax({
//			    type: "POST",
//			    url: "/addReserveBill",
//			    data: $('#addSubmit').serialize(),
//			    contentType: "application/x-www-form-urlencoded; charset=utf-8",
//			    dataType: "json",
//			    async:false,
//			    success: function(result) {
//			    	if(result.result == '1'){
//			    		 window.location.href = '/reserveBill';
//			    	}else{
//			    		alert("添加失败!");
//			    	}
//			    }
//			    });
    } else {
        alert("请重新选择房屋!");
    }
//	}
}

/** 查询客户信息*/
function openModel(obj, param) {
    var $commonId = $(obj).attr("data-id");
    COMMONID = $commonId;
    _OBJ = "#" + param;
    $(".model-content").hide();
    $(".model-mark,#" + param).show();
    var $text = $("#" + param + "-search");
    // 初始化
    list();
    // 搜索框绑定propertychange
    $text.bind("input propertychange", function () {
        $(_OBJ + " #pageNo").text(1);
        list();
    }).focus();
    eindex = -1;
    // 上、下、回车选择
    $text.keyup(function (event) {
        var $item = $(_OBJ + '-Body>tr');
        if (event.keyCode == 40) {// 下键
            eindex++;
            if (eindex >= $item.length) {
                eindex = 0;
            }
            choose(eindex);
        } else if (event.keyCode == 38) {// 上键
            eindex--;
            if (eindex < 0) {
                eindex = $item.length - 1;
            }
            choose(eindex);
        } else if (event.keyCode == 13) { // 回车
            if (eindex >= 0) {
                setSginInfo(this, COMMONID);
                eindex = -1
                return false;
            }
        } else {
            eindex = -1;
        }
    });
    // 显示搜索结果
    var choose = function (index) {
        var $item = $(_OBJ + '-Body>tr');
        $item.removeClass('item-hover').eq(index).addClass('item-hover');
    }
}

/** 列表集*/
function list() {
    if (_OBJ == "#orderInfo") {
        queryReserveOrder(COMMONID);
    } else if (_OBJ == "#employee") {
        showEmpList(COMMONID);
    } else {
        showSginList(COMMONID);
    }
}

/** 设置客户信息*/
function setSginInfo(obj, param) {
    var $this = $(obj);
    var $did = $this.find(".dataId").val();
    var signid = $("#sign-id").val();
    if ($did == signid) {
        alert("该客户已选择");
        return;
    }
    var boo = false;
    $.each($("input[type='hidden'].form-input"), function (index) {
        if ($(this).val() == $did) {
            alert("该客户已选择");
            boo = true;
            return false;
        }
    });
    if (boo) return;
    // TODO 昨天
    $("." + param + "-0").val($did);
    $("." + param + "-1").val($this.find(".data0").text());
    $("." + param + "-2").val($this.find(".data2").text());
    $("." + param + "-3").val($this.find(".data3").text());
    if ("sign" == param) {
        $("#sign-name,#sign-phone,#sign-carNo").change();
    }
    $(".sign-nameformError").remove();
    closeModel();
}

/** 关闭Model*/
function closeModel() {
    moveModelMainRight();
    $(".model-mark,.model-content").hide();
    $(".model-content input[type='text']").val("");
}

/** 显示客户列表信息*/
function showSginList(param) {
    var _body = $(_OBJ + "-Body");
    $.ajax({
        type: "POST",
        url: "/contractObject/querySignInfo",
        data: {
            param: $(_OBJ + "-search").val(),
            pageNo: $(_OBJ + " #pageNo").text()
        },
        dataType: "json"
    }).done(function (result) {
        if (result.code == 200) {
            _body.empty();
            $.each(result.data.list, function (index, data) {
                if (data.contractSign_CarNo == undefined) {
                    data.contractSign_CarNo = "";
                }
                _body.append(
                    '<tr onclick="setSginInfo(this,\'' + param + '\');">' +
                    '<td class="data0"><input type="hidden" class="dataId" value="' + data.contractSign_Id + '">' + data.contractSign_Name + '</td>' +
                    '<td class="data1">' + data.contractSign_SexName + '</td>' +
                    '<td class="data2">' + data.contractSign_Phone + '</td>' +
                    '<td class="data3">' + data.contractSign_CarNo + '</td>' +
                    '</tr>');
            });
            $(_OBJ + " #totalPage").text(result.data.totalPage);
            $(_OBJ + " #totalRecords").text(result.data.totalRecords);
        }
    });
}

/** 切换窗口2*/
function moveModelMainRight() {
    $('#main2').animate({marginRight: '-700px', opacity: 0}, 300, '', function () {
        $(this).hide();
        $(this).css("marginRight", 0);
        $("#main1").show().animate({opacity: 1}, 200);
        $("#model-drag-title").text('客户资料');
        $("#main1 input[type='text']:first").focus();
    });
    $('#main2').find(".tisp").removeClass("error").empty();
    $('#main2').find(".form-control").val("");
    $("#main2").find(".images-box-img").remove();
    list();
}

/** 分页--[上一页]*/
function pageUp() {
    var pageNo = parseInt($(_OBJ + " #pageNo").text());
    if (pageNo <= 1) {
        return;
    }
    $(_OBJ + " #pageNo").text(pageNo - 1);
    list();
}

/** 分页--[下一页]*/
function pageDown() {
    var pageNo = parseInt($(_OBJ + " #pageNo").text());
    var totalPage = parseInt($(_OBJ + " #totalPage").text());
    if (pageNo >= totalPage) {
        return;
    }
    $(_OBJ + " #pageNo").text(pageNo + 1);
    list();
}

/** 切换窗口1*/
function moveModelMainLeft() {
    $('#main1').animate({marginLeft: '-700px', opacity: 0}, 300, '', function () {
        $(this).hide();
        $(this).css("marginLeft", 0);
        $("#main2").show().animate({opacity: 1}, 200);
        $("#model-drag-title").text('添加客户');
        $("#main2 input[type='text']:first").focus();
    });
}

/** 跳页*/
function jumpPage() {
    var pagaText = parseInt($(_OBJ + " #pagaText").val());
    var totalPage = parseInt($(_OBJ + " #totalPage").text());
    if (isNaN(pagaText)) return;
    if (pagaText > totalPage || pagaText < 1) return;
    $(_OBJ + " #pageNo").text(pagaText);
    list();
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

/** 删除银行卡*/
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

//客户跟进接口
function followInter(code, name, phone) {

    if (code == null || code == "") {
        return;
    }
    //房屋编码
    var $dataValue = $("#conid").attr("data-value");
    $.ajax({
        type: "POST",
        url: "/addReserveBillSelectHouse",
        data: {
            param: code,
            type: $dataValue,
            hType: $(".nav-item-focus").attr("data-type")
        },
        dataType: "json"
    }).done(function (result) {
        if (result.payRentList != null) {
            var content = '';
            $.each(result.payRentList, function (index, payRent) {
                $('#conhouseno').val(payRent.propertyInfo_Name + " " + payRent.hi_address);
                $('#houseno').val(payRent.he_state);
                $("#heState").val(payRent.he_state);
                $("#rb_houseNum").val(payRent.hi_code);
                $("#rb_money").val(payRent.deposit);
            });
        } else {
        }
    });

    //客户信息
    $.ajax({
        type: "POST",
        url: "/contractObject/querySignInfo",
        data: {
            param: name,
            pageNo: 0
        },
        dataType: "json"
    }).done(function (result) {
        if (result.code == 200) {
            $.each(result.data.list, function (index, data) {
                if (phone == data.contractSign_Phone) {
                    $(".sign-0").val(data.contractSign_Id);
                    $(".sign-1").val(data.contractSign_Name);
                    $(".sign-2").val(data.contractSign_Phone);
                    $(".sign-3").val(data.contractSign_CarNo);
                }
            });
        }
    });
}