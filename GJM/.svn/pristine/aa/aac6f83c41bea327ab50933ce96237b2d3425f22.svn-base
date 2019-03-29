var BINDSTATE = 0; // 0:全部、1:匹配
var con_code;
var hi_codei;
var con_type;
var house_address;
var contract_type;
var cc_name;
var ccp_phone;
var mode;
var xdate;
var billTypeList = {};
var payStating;
var LODOP; //声明为全局变量

var billList = null;

$(function () {

    // 初始化数据
    initData();
    // 加载数据
    loadingData();
    // 最后加载
    lastLoadData();
    //订单类型
    getBillTypeList();

});

/** 初始化数据*/
function initData() {
    mode = getUrlParam("mode");
    switch (mode) {
        case "display":
            $("title").text("查看合同");
            break;
        case "auditing":
            $("title").text("审核合同");
            break;
        case "review":
            $("title").text("复核合同");
            break;
        default :
            $("title").text("查看合同");
            break;
    }
}

/** 初始化定位*/
function initHash() {
    switch (window.location.hash) {
        case "#propJoin":
            list1();
            break;
        case "#houseConfig":
            list2();
            break;
        case "#itemsAdd":
            list3();
            break;
        case "#decRecord":
            list4();
            break;
        case "#contractBill":
            list5();
            break;
        case "#handover":
            list8();
            break;
        case "#contractRecord":
            list6();
            break;
        case "#execRecord":
            list7();
            break;
        case "#userContractRecord":
            list9();
            break;
        default:
            list1();
            break;
    }
}

/** 合同数据*/
var contractBody = '';

function loadingData() {
    // 显示合同数据
    $("#contract-content").html('<div class="loading"></div>');
    $("#contract-content").displayContract({
        data: {
            cno: getUrlParam("contractObject_No"),
            con_code: getUrlParam("con_code")
        },
        done: function (result) {
            var data = result.data || "";
            // 合同
            contractObject = result.contractObject || "";
            // 合同
            contractBody = result.contractBody || "";
            // 合同
            viewLibraryInfo = result.viewLibraryInfo || "";

            // -------------------------------------------

            house_address = viewLibraryInfo.house_address;

            if (contractObject.contractObject_Type == "托管合同") {
                contract_type = "托管订单";
                payStating = "付";
            } else {
                contract_type = "租赁订单";
                payStating = "收";
            }

            if (!isEmpty(result.customers)) {
                cc_name = result.customers[0].cc_name;
                ccp_phone = result.customers[0].ccp_phone;
            }

            // 合同唯一编号
            hi_codei = contractObject.hi_code;
            // 合同类型
            con_type = contractObject.contractObject_Type;

            // -------------------------------------------

            // 显示标题
            var main_title = "";
            if (mode == "auditing") {
                $("#main-box>.box-nav").html('<a href="javascript:;" class="nav-tab nav-tab-focus">合同审核</a>');
            } else if (mode == "review") {
                $("#main-box>.box-nav").html('<a href="javascript:;" class="nav-tab nav-tab-focus">合同复核</a>');
            } else {
                $("#main-box>.box-nav").remove();
            }

            // 【审核】
            if (mode == "auditing" && contractObject.contractObject_OptionState == 102) {
                $.auditing("auditing");
            }
            // 【复核】
            if (mode == "review" && contractObject.contractObject_OptionState == 104) {
                $.auditing("review");
            }

            // 初始化定位
            initHash();

            // 图片延迟加载
            $("img").lazyload();
        }
    });
}

/** 初始化数据*/
function lastLoadData() {
    var _hash = window.location.hash;
    var html = "";
    html += '<ul class="title-nav">';
    html += '	<li class="' + (_hash == "#propJoin" || isEmpty(_hash) ? "visited" : "link") + '" data-hash="#propJoin">物业交接</li>';
    html += '	<li class="' + (_hash == "#handover" ? "visited" : "link") + '" data-hash="#handover">费用结算</li>';
    html += '	<li class="' + (_hash == "#houseConfig" ? "visited" : "link") + '" data-hash="#houseConfig">房屋配置</li>';
    html += '	<li class="' + (_hash == "#itemsAdd" ? "visited" : "link") + '" data-hash="#itemsAdd">物品添置</li>';
    html += '	<li class="' + (_hash == "#decRecord" ? "visited" : "link") + '" data-hash="#decRecord">装修记录</li>';
    html += '	<li class="' + (_hash == "#contractBill" ? "visited" : "link") + '" data-hash="#contractBill">合同账单</li>';
    html += '	<li class="' + (_hash == "#contractRecord" ? "visited" : "link") + '" data-hash="#contractRecord">合同记录</li>';
    html += '	<li class="' + (_hash == "#execRecord" ? "visited" : "link") + '" data-hash="#execRecord">执行记录</li>';
    html += '	<li class="' + (_hash == "#userContractRecord" ? "visited" : "link") + '" data-hash="#userContractRecord">管家变更记录</li>';
    html += '</ul>';
    $("#other-title").html(html);

    // 绑定点击事件
    $("#other-title .link,#other-title .visited").live("click", function () {
        window.location.href = window.location.href.split("#", 1) + $(this).attr("data-hash");
        initHash();
    });
}

/** 交接清单*/
function list1() {
    $.ajax({
        type: "POST",
        url: "/contractObject/queryTransferInfo",
        data: {
            cno: getUrlParam("contractObject_No") || '',
            con_code: getUrlParam("con_code")
        },
        dataType: "json",
        beforeSend: function () {
            $("#other-content").html('<div class="loading"></div>');
        }
    }).done(function (result) {
        switch (result.code) {
            case 200:
                // 物业
                propertyMain = result.data.propertyMain;
                if (isEmpty(propertyMain)) {
                    $("#other-content").html("没有数据");
                    return;
                }
                var html = "";
                html += '<div class="content-item">';
                html += '	<div class="handover-content">';
                $.each(result.data.propertyEnergyCardValueList, function (index, data) {
                    if ("水电气".indexOf(data.hpec_type) > -1) {
                        var _more = "";
                        _more += '<br>';
                        _more += '<span>起数：<label class="error">' + (data.hpv_start == null ? "--" : returnValue(data.hpv_start)) + '</label></span>&nbsp;&nbsp;';
                        _more += '<span>止数：<label class="error">' + (data.hpv_end == null ? "--" : returnValue(data.hpv_end)) + '</label></span>';

                        html += '<dl style="width: 200px;"><dt>' + returnValue(data.hpec_type) + '</dt><dd style="line-height:30px;"><span class="next">' + returnValue(data.hpec_newNumber) + '</span>' + _more + '</dd></dl>';
                    } else {
                        html += '<dl><dt>' + returnValue(data.hpec_type) + '</dt><dd><span class="next">' + returnValue(data.hpec_newNumber) + '</span></dd></dl>';
                    }
                });
                var _key = "";
                var _style = "";
                var _hk_type = "防盗门钥匙";
                var _hk_newNumber = "";
                if (!isEmpty(result.data.houseKey)) {
                    _hk_type = returnValue(result.data.houseKey.hk_type);
                    _hk_newNumber = returnValue(result.data.houseKey.hk_newNumber);
                    if (_hk_type == "密码钥匙") {
                        _hk_newNumber = '<label class="pro-key" data-pwd="' + _hk_newNumber + '">******</label>';
                        _key += '<br>';
                        _key += '<a class="pro-key-query" href="javascript:;">查看</a>';
                        _style = 'style="line-height:30px;"';
                    }
                }
                html += '		<dl><dt>' + _hk_type + '</dt><dd class="error" ' + _style + ' >' + _hk_newNumber + _key + '</dd></dl>';
                html += '	</div>';
                html += '	<div class="handover-head">';
                html += '		<dl style="float:left;"><dt style="float:left;margin-right: 8px;">备注</dt><dd class="error" style="float:left;">' + returnValue(propertyMain.hpm_remark) + '</dd></dl>';
                html += '		<hr>';
                html += '	</div>';
                html += '	<div class="handover-foot" style="padding: 0;">';
                html += '		<dl style="float:left;margin-right: 20px;"><dt style="float:left;margin-right: 8px;">签订合同交接人：</dt><dd class="next" style="float:left;">' + returnValue(propertyMain.hpm_handoverPersonInName) + '</dd></dl>';
                html += '		<dl style="float:left;"><dt style="float:left;margin-right: 8px;">签订合同交接日期：</dt><dd class="next" style="float:left;">' + returnDate(propertyMain.hpm_handoverDateIn) + '</dd></dl>';
                html += '		<dl style="float:right;"><dt style="float:left;margin-right: 8px;">解除合同交接日期：</dt><dd class="next" style="float:left;">' + (isEmpty(propertyMain.hpm_handoverDateOut) ? "--" : returnDate(propertyMain.hpm_handoverDateOut)) + '</dd></dl>';
                html += '		<dl style="float:right;margin-right: 20px;"><dt style="float:left;margin-right: 8px;">解除合同交接人：</dt><dd class="next" style="float:left;">' + (isEmpty(propertyMain.hpm_handoverPersonOutName) ? "--" : returnValue(propertyMain.hpm_handoverPersonOutName)) + '</dd></dl>';
                html += '		<hr>';
                html += '	</div>';
                html += '</div>';
                $("#other-content").html(html);

                // 时间绑定
                $(".pro-key-query").click(function () {
                    if ($(this).text() == "查看") {
                        $(this).text("隐藏");
                        $(".pro-key").text($(".pro-key").data().pwd);
                    } else {
                        $(this).text("查看");
                        $(".pro-key").text("******");
                    }
                });
                break;
            default :

                break;
        }
    });
}

/** 房屋配置*/
function list2() {
    $.ajax({
        type: "POST",
        url: "/contractObject/queryTransferInfo",
        data: {
            cno: getUrlParam("contractObject_No") || '',
            con_code: getUrlParam("con_code")
        },
        dataType: "json",
        beforeSend: function () {
            $("#other-content").html('<div class="loading"></div>');
        }
    }).done(function (result) {
        switch (result.code) {
            case 200:
                // 配置
                propertyGoodsList = result.data.propertyGoodsList;
                if (isEmpty(propertyGoodsList)) {
                    $("#other-content").html("没有数据");
                    return;
                }
                var html = "";
                html += '<div class="div-table">';
                html += '    <div class="div-thead">';
                html += '        <ul>';
                html += '            <li style="width: 40px;text-align: center;">#</li>';
                html += '            <li style="width: 10%;">房间</li>';
                html += '            <li style="width: 10%;">类型</li>';
                html += '            <li style="width: 20%;">名称</li>';
                html += '            <li style="width: 20%;">品牌</li>';
                html += '            <li style="width: 10%;">数量</li>';
                html += '            <li style="width: 10%;">新旧</li>';
                html += '            <li style="width: 10%;">好坏</li>';
                html += '        </ul>';
                html += '    </div>';
                html += '    <div class="div-tbody" style="height: 340px;overflow: hidden;">';
                $.each(propertyGoodsList, function (index, data) {
                    html += '	<ul style="background: ' + (index % 2 == 0 ? '#f9f9f9' : '#fff') + ';">';
                    html += '	    <li style="width: 40px;text-align: center;">' + (index + 1) + '</li>';
                    html += '	    <li style="width: 10%;">' + returnValue(data.hpg_roomType) + '</li>';
                    html += '	    <li style="width: 10%;">' + returnValue(data.hpg_itemType) + '</li>';
                    html += '	    <li style="width: 20%;">' + returnValue(data.hpg_itemName) + '</li>';
                    html += '	    <li style="width: 20%;">' + returnValue(data.hpg_itemBrand) + '</li>';
                    html += '	    <li style="width: 10%;">' + returnValue(data.hpg_number) + '</li>';
                    html += '	    <li style="width: 10%;">' + returnValue(data.hpg_on == 0 ? '新' : '旧') + '</li>';
                    html += '	    <li style="width: 10%;">' + returnValue(data.hpg_gb == 0 ? '好' : '坏') + '</li>';
                    html += '	</ul>';
                });
                html += '	</div>';
                html += '</div>';
                $("#other-content").html(html);
                $(".div-tbody").perfectScrollbar();
                break;
        }
    });
}

/**
 * 获取宽带配置数据
 * @constructor
 */
function list3_InitBroadbandAgent() {
    $.ajax({
        url: "/itemManage/InitBroadbandAgent",
        type: "get",
        data: {
            contractObject_code: getUrlParam("con_code"),
            hi_code: hi_codei
        },
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $("#other-content-box").html('<div class="loading"></div>');
        }
    }).done(function (result) {
        if (result.code == 200) {
            var item = result.data.broadbandConfig;
            bcId = item.bc_id;
            cdata = item;
            var htmlInfo = "";
            htmlInfo += "<div style='width: 1017px;' class='res'>";
            htmlInfo += "        <dl>";
            htmlInfo += "        <dt>安装类型：</dt>";
            htmlInfo += "    <dd style='color:#000;line-height:35px'>" + returnBcInstallType(returnValue(item.bc_installType)).text + "</dd>";
            htmlInfo += "        </dl>";
            htmlInfo += "        <dl>";
            htmlInfo += "        <dt>宽带品牌：</dt>";
            htmlInfo += "    <dd style='color:#000;line-height:35px'>" + returnValue(item.bc_brand) + "</dd>";
            htmlInfo += "        </dl>";
            htmlInfo += "        <dl>";
            htmlInfo += "        <dt>接入类型：</dt>";
            htmlInfo += "    <dd style='color:#000;line-height:35px'>" + returnValue(item.bc_type) + "</dd>";
            htmlInfo += "        </dl>";
            htmlInfo += "        <dl>";
            htmlInfo += "        <dt>宽带状态：</dt>";
            htmlInfo += "    <dd style='color:#000;line-height:35px'>" + returnBcBroadbandState(returnValue(item.bc_broadbandState)).text + "</dd>";
            htmlInfo += "        </dl>";
            htmlInfo += "        <dl>";
            htmlInfo += "        <dt>资费：</dt>";
            htmlInfo += "    <dd style='color:#000;line-height:35px'>" + returnValue(item.bc_cost) + "元</dd>";
            htmlInfo += "        </dl>";
            htmlInfo += "        <dl>";
            htmlInfo += "        <dt>带宽：</dt>";
            htmlInfo += "    <dd style='color:#000;line-height:35px'>" + returnValue(item.bc_bandwidth) + "M</dd>";
            htmlInfo += "        </dl>";
            htmlInfo += "        <dl>";
            htmlInfo += "        <dt>办理时间：</dt>";
            htmlInfo += "    <dd style='color:#000;line-height:35px'>" + format(item.bc_installationTime, "yyyy-MM-dd") + "</dd>";
            htmlInfo += "        </dl>";
            htmlInfo += "        <dl>";
            htmlInfo += "        <dt>承诺期(年)：</dt>";
            htmlInfo += "    <dd style='color:#000;line-height:35px'>" + returnValue(item.bc_term) + " 年</dd>";
            htmlInfo += "        </dl>";
            htmlInfo += "        <dl>";
            htmlInfo += "        <dt>帐号：</dt>";
            htmlInfo += "    <dd style='color:#000;line-height:35px'>" + returnValue(item.bc_account) + "</dd>";
            htmlInfo += "        </dl>";
            htmlInfo += "        <dl>";
            htmlInfo += "        <dt>密码：</dt>";
            htmlInfo += "    <dd style='color:#000;line-height:35px'>" + returnValue(item.bc_password) + "</dd>";
            htmlInfo += "        </dl>";
            htmlInfo += "        <dl>";
            htmlInfo += "        <dt>客户姓名：</dt>";
            htmlInfo += "    <dd style='color:#000;line-height:35px'>" + returnValue(item.bc_cname) + "</dd>";
            htmlInfo += "        </dl>";
            htmlInfo += "        <dl>";
            htmlInfo += "        <dt>证件：</dt>";
            htmlInfo += "    <dd style='color:#000;line-height:35px'>" + returnValue(item.bc_IDNumber) + "</dd>";
            htmlInfo += "        </dl>";
            htmlInfo += "        <dl>";
            htmlInfo += "        <dt>经理电话：</dt>";
            htmlInfo += "    <dd style='color:#000;line-height:35px'>" + returnValue(item.bc_telephone) + "</dd>";
            htmlInfo += "        </dl>";
            htmlInfo += "        <dl>";
            htmlInfo += "        <dt>客户经理：</dt>";
            htmlInfo += "    <dd style='color:#000;line-height:35px'>" + returnValue(item.bc_customerManager) + "</dd>";
            htmlInfo += "        </dl>";
            htmlInfo += "        <dl>";
            htmlInfo += "        <dt>经办人：</dt>";
            htmlInfo += "    <dd style='color:#000;line-height:35px'>" + returnValue(item.bc_agent) + "</dd>";
            htmlInfo += "        </dl>";
            htmlInfo += "        <dl>";
            htmlInfo += "        <dt>是否使用：</dt>";
            htmlInfo += "    <dd style='color:#000;line-height:35px'>" + (returnValue(item.bc_isUsed) == 0 ? "否" : "是") + "</dd>";
            htmlInfo += "        </dl>";
            htmlInfo += "    <div style='height: 40px'></div>";
            htmlInfo += "        <dl style='height: auto;width: 1017px;border-left: 1px solid #ddd'>";
            htmlInfo += "        <dt style='height: auto'>设备信息：</dt>";
            htmlInfo += "    <dd style='color:#000;width: 740px;height: auto;margin-top: 8px'>" + returnValue(item.bc_equipmentInfo) + "</dd>";
            htmlInfo += "    </dl>";
            htmlInfo += "        <dl style='height: auto;width: 1017px;border-left: 1px solid #ddd'>";
            htmlInfo += "        <dt style='height: auto'>路由器配置：</dt>";
            htmlInfo += "    <dd style='color:#000;width: 740px;height: auto;margin-top: 8px'>" + returnValue(item.bc_router) + "</dd>";
            htmlInfo += "    </dl>";
            htmlInfo += "        <dl style='height: auto;width: 1017px;border-left: 1px solid #ddd'>";
            htmlInfo += "        <dt style='height: auto'>备注：</dt>";
            htmlInfo += "    <dd style='color:#000;width: 740px;height: auto;margin-top: 8px'>" + returnValue(item.bc_remarks) + "</dd>";
            htmlInfo += "    </dl>";
            htmlInfo += "  </div>";
            $("#other-content-box").html(htmlInfo);
        } else {
            $("#other-content-box").html("没有数据");
        }
    })
}

//返回安装类型
function returnBcInstallType(param) {
    var data = {};
    data.list = {0: "公司新装", 1: "公司迁移", 2: "客户新装", 3: "客户迁移"};
    data.text = returnValue(data.list[param]);
    return data;
}

//返回安装类型
function returnBcBroadbandState(param) {
    var data = {};
    data.list = {0: "正常", 1: "欠费", 2: "暂停"};
    data.text = returnValue(data.list[param]);
    return data;
}

/**
 * 获取房屋和合同下的保险
 */
function list3_getInsurance() {
    $.ajax({
        url: "/itemManage/getInsurance",
        type: "get",
        data: {
            contractObject_code: getUrlParam("con_code"),
            hi_code: hi_codei
        },
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $("#other-content-box").html('<div class="loading"></div>');
        }
    }).done(function (result) {
        if (result.code == 200) {
            var isNull = result.data.isNull;
            var data = result.data.insurance;
            var htmlInfo = "";
            $.each(result.data.insurance, function (index, item) {
                var insuranceRecord = "";
                var insuranceHouseRecord = "";
                var insuranceHouseRecordNum = "";
                $.ajax({
                    url: "/itemManage/getInsuranceAndAddres",
                    type: "get",
                    data: {
                        i_correlation: item.i_correlation,
                    },
                    contentType: "application/x-www-form-urlencoded; charset=utf-8",
                    dataType: "json",
                    async: false,
                }).done(function (msg) {
                    insuranceHouseRecordNum += "<a>" + ((msg.data.insuranceAndAddres.length) - 1) + "次</a>"
                    $.each(msg.data.insuranceAndAddres, function (index, item1) {
                        if (item1.i_insuranceNumber == item.i_insuranceNumber) {
                            if (msg.data.insuranceAndAddres.length == index + 1) {
                                insuranceRecord += "<a href='/houseLibrary/jumpHouseInfo?hi_code=" + item1.hi_code + "' style='color:#3e97c9 '>" + item1.i_insuranceNumber + "[当前保单]</a>";
                                insuranceHouseRecord += "<a href='/houseLibrary/jumpHouseInfo?hi_code=" + item1.hi_code + "' style='color:#3e97c9 '>" + item1.house_address + "[当前房屋]</a>";
                            } else {
                                insuranceRecord += "<a href='/houseLibrary/jumpHouseInfo?hi_code=" + item.hi_code + "' style='color:#3e97c9 '>" + item1.i_insuranceNumber + "[当前保单]</a>==>";
                                insuranceHouseRecord += "<a href='/houseLibrary/jumpHouseInfo?hi_code=" + item1.hi_code + "' style='color:#3e97c9 '>" + item1.house_address + "[当前房屋]</a>==>";
                            }
                        } else {
                            if (msg.data.insuranceAndAddres.length == index + 1) {
                                insuranceRecord += "<a href='/houseLibrary/jumpHouseInfo?hi_code=" + item1.hi_code + "'>" + item1.i_insuranceNumber + "</a>";
                                insuranceHouseRecord += "<a href='/houseLibrary/jumpHouseInfo?hi_code=" + item1.hi_code + "'>" + item1.house_address + "</a>";
                            } else {
                                insuranceRecord += "<a href='/houseLibrary/jumpHouseInfo?hi_code=" + item1.hi_code + "'>" + item1.i_insuranceNumber + "==></a>";
                                insuranceHouseRecord += "<a href='/houseLibrary/jumpHouseInfo?hi_code=" + item1.hi_code + "'>" + item1.house_address + "==></a>";
                            }
                        }
                    })
                })

                i_id = item.i_id;
                htmlInfo += "<div style='width: 1017px' class='res'>";
                if (!isEmpty(item.i_insuranceNumberHead)) {
                    htmlInfo += "        <dl>";
                    htmlInfo += "        <dt>源保单号：</dt>";
                    htmlInfo += "    <dd style='color:#000;line-height:35px'>" + returnValue(item.i_insuranceNumberHead) + "</dd>";
                    htmlInfo += "        </dl>";
                }
                htmlInfo += "        <dl>";
                htmlInfo += "        <dt>保单号：</dt>";
                htmlInfo += "    <dd style='color:#000;line-height:35px'>" + returnValue(item.i_insuranceNumber) + "</dd>";
                htmlInfo += "        </dl>";
                htmlInfo += "        <dl>";
                htmlInfo += "        <dt>保险公司：</dt>";
                htmlInfo += "    <dd style='color:#000;line-height:35px'>" + returnValue(item.i_company) + "</dd>";
                htmlInfo += "        </dl>";
                htmlInfo += "        <dl>";
                htmlInfo += "        <dt>生效时间：</dt>";
                htmlInfo += "    <dd style='color:#000;line-height:35px'>" + format(item.i_insurant_strat, "yyyy-MM-dd") + "</dd>";
                htmlInfo += "        </dl>";
                htmlInfo += "        <dl>";
                htmlInfo += "        <dt>失效日期：</dt>";
                htmlInfo += "    <dd style='color:#000;line-height:35px'>" + format(item.i_insurant_end, "yyyy-MM-dd") + "</dd>";
                htmlInfo += "        </dl>";
                htmlInfo += "        <dl>";
                htmlInfo += "        <dt>办理日期：</dt>";
                htmlInfo += "    <dd style='color:#000;line-height:35px'>" + format(item.i_insureDate, "yyyy-MM-dd") + "</dd>";
                htmlInfo += "        </dl>";
                htmlInfo += "        <dl>";
                htmlInfo += "        <dt>保费：</dt>";
                htmlInfo += "    <dd style='color:#000;line-height:35px'>" + returnValue(item.i_cost) + "元</dd>";
                htmlInfo += "        </dl>";
                htmlInfo += "        <dl>";
                htmlInfo += "        <dt>被保险人：</dt>";
                htmlInfo += "    <dd style='color:#000;line-height:35px'>" + returnValue(item.i_insurant) + "</dd>";
                htmlInfo += "        </dl>";
                htmlInfo += "        <dl>";
                htmlInfo += "        <dt>证件号：</dt>";
                htmlInfo += "    <dd style='color:#000;line-height:35px'>" + returnValue(item.i_IDNumber) + "</dd>";
                htmlInfo += "        </dl>";
                htmlInfo += "        <dl>";
                htmlInfo += "        <dt>经办人：</dt>";
                htmlInfo += "    <dd style='color:#000;line-height:35px'>" + returnValue(item.i_agent) + "</dd>";
                htmlInfo += "        </dl>";
                htmlInfo += "        <dl style='height: auto;width: 1017px'>";
                htmlInfo += "        <dt style='height: auto'>批改：</dt>";
                htmlInfo += "    <dd style='color:#000;width: 740px;height: auto;margin-top: 8px'>" + (returnValue(item.i_isCorrections) == 0 ? "未批改" : "已批改") + "<br/>[批改次数：" + insuranceHouseRecordNum + "]<br/>[保单记录：" + insuranceRecord + "]<br/>[参保房屋：" + insuranceHouseRecord + "]</dd>";
                htmlInfo += "        </dl>";
                htmlInfo += "        <dl style='height: auto;width: 1017px'>";
                htmlInfo += "        <dt style='height: auto'>理赔情况：</dt>";
                htmlInfo += "    <dd style='color:#000;width: 740px;height: auto;margin-top: 8px'>" + returnValue(item.i_ClaimSituation) + "</dd>";
                htmlInfo += "    </dl>";
                htmlInfo += "        <dl style='height: auto;width: 1017px'>";
                htmlInfo += "        <dt style='height: auto'>备注：</dt>";
                htmlInfo += "    <dd style='color:#000;width: 740px;height: auto;margin-top: 8px'>" + returnValue(item.i_remarks) + "</dd>";
                htmlInfo += "    </dl>";
                htmlInfo += "  </div>";
            })
            $("#other-content-box").html(htmlInfo);
        } else {
            $("#other-content-box").html("没有数据");
        }
    })
}

/**  物品信息**/
function list3_wp() {
    $.ajax({
        type: "POST",
        url: "/contractObject/queryTransferInfo",
        data: {
            cno: getUrlParam("contractObject_No") || '',
            con_code: getUrlParam("con_code")
        },
        dataType: "json",
        beforeSend: function () {
            $("#other-content-box").html('<div class="loading"></div>');
        }
    }).done(function (result) {
        switch (result.code) {
            case 200:
                // 配置
                itemsList = result.data.itemsList;
                if (isEmpty(itemsList)) {
                    $("#other-content-box").html("没有数据");
                    return;
                }
                var html = "";
                html += '<div class="div-table">';
                html += '    <div class="div-thead">';
                html += '        <ul>';
                html += '            <li style="width: 40px;text-align: center;">#</li>';
                html += '            <li style="width: 10%;">类型</li>';
                html += '            <li style="width: 10%;">名称</li>';
                html += '            <li style="width: 10%;">品牌</li>';
                html += '            <li style="width: 10%;">数量</li>';
                html += '            <li style="width: 10%;">新旧</li>';
                html += '            <li style="width: 10%;">好坏</li>';
                html += '            <li style="width: 10%;">来源</li>';
                html += '            <li style="width: 10%;">付费对象</li>';
                html += '            <li style="width: 10%;">经办人</li>';
                html += '        </ul>';
                html += '    </div>';
                html += '    <div class="div-tbody" style="height: 340px;overflow: hidden;">';
                $.each(itemsList, function (index, data) {
                    html += '	<ul style="background: ' + (index % 2 == 0 ? '#f9f9f9' : '#fff') + ';">';
                    html += '	    <li style="width: 40px;text-align: center;">' + (index + 1) + '</li>';
                    html += '	    <li style="width: 10%;">' + returnValue(data.purchaseItems_type) + '</li>';
                    html += '	    <li style="width: 10%;">' + returnValue(data.purchaseItems_name) + '</li>';
                    html += '	    <li style="width: 10%;">' + returnValue(data.purchaseItems_brand) + '</li>';
                    html += '	    <li style="width: 10%;">' + returnValue(data.purchaseItems_count) + '</li>';
                    html += '	    <li style="width: 10%;">' + returnValue(data.purchaseItems_On == 0 ? '新' : '旧') + '</li>';
                    html += '	    <li style="width: 10%;">' + returnValue(data.purchaseItems_Gb == 0 ? '好' : '坏') + '</li>';
                    html += '	    <li style="width: 10%;">' + returnValue(data.purchaseItems_source) + '</li>';
                    html += '	    <li style="width: 10%;">' + returnValue(data.ps_num) + '</li>';
                    html += '	    <li style="width: 10%;">' + returnValue(data.ps_num) + '</li>';
                    html += '	</ul>';
                });
                html += '	</div>';
                html += '</div>';
                $("#other-content").html(html);
                $(".div-tbody").perfectScrollbar();
                break;
            default :

                break;
        }
    });
}

/** 物品添置*/
function list3() {
    var htm = "";
    htm += "<div style='position: relative;line-height: 38px;text-align: center;border-bottom: 1px solid #ddd;'>";
    htm += "    <button class='visitedes v1  onthis ' onclick='' style='background: transparent;cursor: pointer;'>物品</button>";
    htm += "    <label style='margin:0 6px;color:#ddd;'>|</label>";
    htm += "    <button class='visitedes v2' onclick='' style='background: transparent;cursor: pointer;'>宽带</button>";
    htm += "    <label style='margin:0 6px;color:#ddd;'>|</label>";
    htm += "    <button class='visitedes v3' onclick='' style='background: transparent;cursor: pointer;'>保险</button>";
    htm += "</div>";
    htm += '<div id="other-content-box" style="position:relative;height: 370px;margin-top: 6px;"></div>';
    $("#other-content").html(htm);
    list3_wp();
    navmuen();
}

/**
 * 切换物品添置分类
 */
function navmuen() {
    $(".visitedes").click(function () {
        $(".visitedes").removeClass("onthis");
        $(this).addClass("onthis");
        if ($(this).attr("class") == "visitedes v1 onthis") {
            list3_wp();
        }
        if ($(this).attr("class") == "visitedes v2 onthis") {
            list3_InitBroadbandAgent();
        }
        if ($(this).attr("class") == "visitedes v3 onthis") {
            list3_getInsurance();
        }
    })
}

/** 装修记录*/
function list4() {
    $.ajax({
        type: "POST",
        url: "/contractObject/queryTransferInfo",
        data: {
            cno: getUrlParam("contractObject_No") || '',
            con_code: getUrlParam("con_code")
        },
        dataType: "json",
        beforeSend: function () {
            $("#other-content").html('<div class="loading"></div>');
        }
    }).done(function (result) {
        switch (result.code) {
            case 200:
                // 装修
                propertyDecorationList = result.data.propertyDecorationList;
                if (isEmpty(propertyDecorationList)) {
                    $("#other-content").html("没有数据");
                    return;
                }
                var html = "";
                html += '<div class="div-table">';
                html += '    <div class="div-thead">';
                html += '        <ul>';
                html += '            <li style="width: 40px;text-align: center;">#</li>';
                html += '            <li style="width: 10%;">房间类型</li>';
                html += '            <li style="width: 10%;">装修面</li>';
                html += '            <li style="width: 10%;">现状</li>';
                html += '            <li style="width: auto;">情况说明</li>';
                html += '        </ul>';
                html += '    </div>';
                html += '    <div class="div-tbody" style="height: 340px;overflow: hidden;">';
                $.each(propertyDecorationList, function (index, data) {
                    html += '	<ul style="background: ' + (index % 2 == 0 ? '#f9f9f9' : '#fff') + ';">';
                    html += '	    <li style="width: 40px;text-align: center;">' + (index + 1) + '</li>';
                    html += '	    <li style="width: 10%;">' + returnValue(data.hpd_roomType) + '</li>';
                    html += '	    <li style="width: 10%;">' + returnValue(data.hpd_decoType) + '</li>';
                    html += '	    <li style="width: 10%;">' + returnValue(data.hpd_decoState == 0 ? "<label class=\"ok\">正常</label>" : "<label class=\"error\">有损坏</label>") + '</li>';
                    html += '	    <li style="width: auto;">' + returnValue(data.hpd_desc) + '</li>';
                    html += '	</ul>';
                });
                html += '	</div>';
                html += '</div>';
                $("#other-content").html(html);
                $(".div-tbody").perfectScrollbar();
                break;
            default :

                break;
        }
    });
}

/** 合同账单*/
function list5(cycle) {

    billList = $.Deferred();
    $.ajax({
        type: "POST",
        url: "/financeManage/selectBillList",
        data: {
            contractObject_code: getUrlParam("con_code"),
        },
        dataType: "json",
        beforeSend: function () {
            $("#other-content").html('<div class="loading"></div>');
        }
    }).done(function (result) {
        if (result.msg != "success") {
            $("#other-content").html("没有数据");
            return;
        }

        var contractOrder = result.order;
        var contractBillList = result.list;

        var html = "";
        html += '<div class="div-table">';

        if (!isEmpty(contractOrder)) {
            html += '<div class="div-thead" style="line-height: 38px;">';
            html += '    <div class="head-item" data-type="' + (contractOrder.bco_type == 201 ? "托管订单" : "租客订单") + '">订单号：<label class="next" id="code" style="float:none;">' + returnValue(contractOrder.bco_code) + '</label><label style="margin-left:10px;">状态：<font class="' + returnStateClass(contractOrder.bco_optionState) + '">' + returnState(contractOrder.bco_optionState, contractOrder.bco_cooperater) + '</font></label></div>';
            html += '    <div class="head-button"><button onclick="printBill()">打印凭证</button><button onclick="addBill()">添加账单</button><button onclick="payBill(this)">支付</button><div class="payBill" style="display:none;"></div></div>';
            html += '</div>';
        }

        if (!isEmpty(contractOrder) && !isEmpty(contractBillList)) {
            var _type = (contractOrder.bco_type == 201 ? "付" : "收");

            html += '<div class="div-thead">';
            html += '    <ul>';
            html += '    	<li style="width: 54px;">#</li>';
            html += '    	<li style="width: 220px;">期数</li>';
            html += '    	<li style="width: 84px;">账单类型</li>';
            html += '    	<li style="width: 84px;">账单状态</li>';
            html += '    	<li style="width: 84px">应' + _type + '金额</li>';
            html += '    	<li style="width: 84px">实' + _type + '金额</li>';
            html += '    	<li style="width: 84px">未' + _type + '金额</li>';
            html += '    	<li style="width: 104px">约定' + _type + '款时间</li>';
            html += '    	<li style="width: auto;">备注</li>';
            html += '    	<li style="width: 100px;">操作</li>';
            html += '    </ul>';
            html += '</div>';
            html += '<div class="div-tbody" style="height: 340px;overflow: hidden;"><table style="font-size:12px;"><tbody>';
            var tbody = "";
            var newIndex = -1;
            var dates = "";
            var money = 0;
            var titles = "";
            $.each(contractBillList, function (index, bcb) {
                if (newIndex == -1) {
                    if ((bcb.bcb_type == -1 || bcb.bcb_type == 11) && bcb.bcb_state == 2) {
                        newIndex = bcb.bcb_cycle;
                        dates = format(bcb.bcb_repaymentDate, 'yyyy-MM-dd');
                        money = (bcb.bcb_repayment - bcb.bcb_realPayment).toFixed(2);
                    }
                }
                if (newIndex != -1 && titles == "") {
                    var payStatese = "<option>请选择</option><option value='线上'>线上</option><option value='线下'>线下</option>";
                    if (payStating == "付") {
                        payStatese = "<option>请选择</option><option value='线下'>线下</option>";
                    }
                    titles += "<div class='bill-actions'>" +
                        "<label style='float:left; margin-right: 10px; font-size: 14px;'>应还款时间:" + dates + "，第<font style='color:#E74C3C; ' id='newIndex'>" + newIndex + "</font>期，应" + payStating + ":<font style='color:#E74C3C; ' id='sumMoney'>￥" + money + "</font></label>" +
                        "<label class='payType'>" + payStating + "款方式</label>" +
                        "<select class='paybank' onchange='bankTypes(this,\"" + newIndex + "\")'>" + payStatese + "</select>" +
                        "<select class='paybank' style='display:none; border-left:none;' onchange='bankType(this,\"" + newIndex + "\")'><option>请选择</option><option value='银行卡'>银行卡</option><option value='支付宝'>支付宝</option><option value='微信'>微信</option><option value='现金'>现金</option></select>" +
                        "<select class='paybankCode' style='display:none; border-left:none;'><option value='工行9976'>工行 [ 6222****9976 ]</option><option value='工行5665'>工行 [ 3100****5665 ]</option><option value='建行1787'>建行 [ 6227****1787 ]</option><option value='建行3217'>建行 [ 6236****3217 ]</option><option value='农行7879'>农行 [ 6228****7879 ]</option><option value='农行4832'>农行 [ 3106****4832 ]</option></select>" +
                        "<select class='payTypeItem' style='display:none; border-left:none;' onchange='selectVal(this)'></select>" +
                        "<input type='text' style='display:none; border-left:none;' class='payMoney' placeholder='金额' onkeyup='clearNoNumst(this)' />" +
                        "<button class='paySubmit' onclick='submitPay(this)' style='display:none; padding: 0 15px; border-radius: 0; border-top-right-radius: 3px; border-bottom-right-radius: 3px;'>" + payStating + "款</button>" +
                        "<input type='hidden' value='" + +"' />" +
                        "</div>";
                }
                html += "<tr>";
                html += "<td data-text='bcb_cycle' style='width: 52px;'><span class='item-index'>" + returnValue(bcb.bcb_cycle) + "</span></td>";
                if (returnValue(bcb.bcb_startDate) == '' && returnValue(bcb.bcb_endDate) == '') {
                    html += "<td data-text='dateStartEnd' style='width: 220px;'>第" + bcb.bcb_cycle + "期 [" + format(bcb.bcb_repaymentDate, 'yyyy-MM-dd') + "~" + format(bcb.repaymentEndDate, 'yyyy-MM-dd') + "]</td>";
                } else if (returnValue(bcb.bcb_startDate) == '' && returnValue(bcb.bcb_endDate) != '') {
                    html += "<td data-text='dateStartEnd' style='width: 220px;'>第" + bcb.bcb_cycle + "期 [" + format(bcb.bcb_repaymentDate, 'yyyy-MM-dd') + "~" + format(bcb.bcb_endDate, 'yyyy-MM-dd') + "]</td>";
                } else if (returnValue(bcb.bcb_startDate) != '' && returnValue(bcb.bcb_endDate) == '') {
                    html += "<td data-text='dateStartEnd' style='width: 220px;'>第" + bcb.bcb_cycle + "期 [" + format(bcb.bcb_startDate, 'yyyy-MM-dd') + "~" + format(bcb.repaymentEndDate, 'yyyy-MM-dd') + "]</td>";
                } else if (returnValue(bcb.bcb_startDate) != '' && returnValue(bcb.bcb_endDate) != '') {
                    html += "<td data-text='dateStartEnd' style='width: 220px;'>第" + bcb.bcb_cycle + "期 [" + format(bcb.bcb_startDate, 'yyyy-MM-dd') + "~" + format(bcb.bcb_endDate, 'yyyy-MM-dd') + "]</td>";
                }
                html += "<td data-text='bcb_type' style='width: 84px;'>" + parseBillType(bcb.bcb_type) + "</td>";
                html += "<td data-text='bcb_state' style='width: 84px;' class='" + returnStateClass(bcb.bcb_state) + "'>" + returnState(bcb.bcb_state, bcb.bco_cooperater) + "</td>";
                html += "<td data-text='bcb_repayment' style='width: 84px;' data-money='" + returnFloat(bcb.bcb_repayment) + "'>" + returnFloat(bcb.bcb_repayment) + "</td>";
                html += "<td data-text='bcb_realPayment' style='width: 84px;'>" + returnFloat(bcb.bcb_realPayment) + "</td>";
                html += "<td data-text='bcb_balance' style='width: 84px;'>" + returnFloat(bcb.bcb_balance) + "</td>";
                html += "<td data-text='bcb_repaymentDate' style='width: 104px;'>" + format(bcb.bcb_repaymentDate, 'yyyy-MM-dd') + "</td>";
                html += "<td data-text='bcb_remarks' style='width: 124px;'>" + returnValue(bcb.bcb_remarks) + "</td>";
                html += "<td style='width: 100px;'><button class='fa-reorder' onclick='flodChildBill(this," + bcb.bcb_cycle + ")'></button></td>";
                html += "<td style='display:none;'>" + format(bcb.bcb_realPaymentDate, 'yyyy-MM-dd') + "</td>";
                html += "</tr>";
                $.each(bcb.childs, function (indext, child) {
                    html += "<tr class='childBill' data-id='" + child.bcb_id + "' data-cycle='" + bcb.bcb_cycle + "'>" +
                        "<td></td>" +
                        "<td></td>" +
                        "<td data-text='bcb_type'>" + parseBillType(child.bcb_type) + "</td>" +
                        "<td data-text='bcb_state' class='" + returnStateClass(child.bcb_state) + "'>" + returnState(child.bcb_state, child.bco_cooperater) + "</td>" +
                        "<td data-text='bcb_repayment'><input type='text' style='background: transparent;' value='" + returnFloat(child.bcb_repayment) + "' readonly='readonly' /></td>" +
                        "<td data-text='bcb_realPayment'>" + returnFloat(child.bcb_realPayment) + "</td>" +
                        "<td data-text='bcb_balance'>" + returnFloat(child.bcb_balance) + "</td>" +
                        "<td data-text='bcb_repaymentDate'>" + format(child.bcb_repaymentDate, 'yyyy-MM-dd') + "</td>" +
                        "<td data-text='bcb_remarks'><input type='text' style='background: transparent;' value='" + returnValue(child.bcb_remarks) + "' readonly='readonly' /></td>";
                    if (returnState(child.bcb_state, child.bco_cooperater) == "待还款") {
                        html += "<td><i class='fa fa-pencil' onclick='updateBill(this)'></i></td>";
                    } else {
                        html += "<td></td>";
                    }
                    html += "</tr>";
                });
            });
            html += '</tbody></table></div>';
        }
        html += '</div>';
        $("#other-content").html(html);
        $(".payBill").append(titles);
        $(".div-tbody").perfectScrollbar();

        $("#other-content").find("[name=option-add-bill]").click(function () {
            window.parent.parent.href_mo('/financeManage/jumpBillManage#bco_code=' + contractOrder.bco_code + '&bco_type=' + contractOrder.bco_type, '账单管理', '账单管理');
        });
        billList.resolve();
    });

    $.when(billList).done(function () {
        var url = window.location.pathname + window.location.search;
        url = url.substring(0, url.indexOf("="));
        $.ajax({
            type: "POST",
            url: "/user/userJurisdiction",
            data: {
                url: window.location.pathname,
                ucps_type: 3
            },
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result == null) {
                    $(".head-button").html("");
                    $(".fa-pencil").remove();
                    return;
                }
                var bools1 = false;
                var bools2 = false;
                var bools3 = false;
                var bools4 = false;
                $(result.menuLists).each(function (index, item) {
                    if (item.ucps_name == "添加账单") {
                        bools1 = true;
                    } else if (item.ucps_name == "支付") {
                        bools2 = true;
                    } else if (item.ucps_name == "修改账单") {
                        bools3 = true;
                    } else if (item.ucps_name == "打印") {
                        bools4 = true;
                    }
                });
                if (!bools1) {
                    $(".head-button button").eq(1).remove();
                }
                if (!bools2) {
                    $(".head-button button").eq(2).remove();
                }
                if (!bools4) {
                    $(".head-button button").eq(0).remove();
                }
                if (!bools3) {
                    $(".fa-pencil").remove();
                }
                if (!bools1 && !bools2 && !bools3 && !bools4) {
                    $(".head-button").html("");
                }
            }
        });
        if (cycle != null) {
            var submit = function (v, h, f) {
                if (v == 'ok') {
                    printSubmit(cycle);
                    return true; //close
                }
                return true; //close
            };
            $.jBox.confirm("是否打印？", "提示", submit);
        }
    });
}

// 打印
function printBill() {
    var html = "";
    html += "<div class='biilstyle' id='addBill'>";
    html += "<dl>";
    html += "<dt>期数</dt>";
    html += "<dd><select class='nums' onchange='printNum(this)'>";
    var cycleStr = "";
    $(".div-tbody tr").each(function (index) {
        if (index == 0) {
            cycleStr = $(this).find("td").eq(1).text();
        }
        if ($(this).find("td").eq(0).text() != "") {
            html += "<option value='" + $(this).find("td").eq(0).text() + "'>" + $(this).find("td").eq(1).text() + "</option>";
        }
    });
    html += "</select></dd></dl>";
    html += "<dl>";
    html += "<dt>类型</dt>";
    html += "<dd><div class='printType'>";
    $(".div-tbody").find("tr.childBill[data-cycle='" + $(".div-tbody").find("tr").eq(0).find("td").eq(0).text() + "']").each(function (i) {
        html += "<label style='margin-top:5px; margin-left:5px;' class='common-checkbox common-checkbox-checked'>" + $(this).find("td").eq(2).text() + "<input type='checkbox' name='hava-cooper' checked='checked'></label>";
    });
    html += "</div></dd></dl>";
    html += "</div>";
    var submit = function (v, h, f) {
        if (v == 'ok') {
            var arr = Array();
            $(".printType").find(".common-checkbox").each(function () {
                if ($(this).find("input").is(":checked")) {
                    arr.push($(this).text());
                }
            });
            printSubmit($(".nums").val(), arr);
        }
        return true;
    }
    $.jBox(html, {title: "打印票据", width: 600, submit: submit});
}

// 打印内容
function printNum(ids) {
    var html = "";
    $(".div-tbody").find("tr.childBill[data-cycle='" + $(ids).val() + "']").each(function (i) {
        html += "<label style='margin-top:5px; margin-left:5px;' class='common-checkbox common-checkbox-checked'>" + $(this).find("td").eq(2).text() + "<input type='checkbox' name='hava-cooper' checked='checked'></label>";
    });
    $(".printType").html(html);
}

// 添加账单
function addBill() {
    var submit = function (v, h, f) {
        if (v == 'ok') {
            var _this = $("#addBill");
            if ($(_this).find(".moneys").val() == "") {
                $.jBox.tip("应" + payStating + "金额不能为空", "error");
                return false;
            }
            if ($(_this).find(".date").val() == "") {
                $.jBox.tip("日期不能为空", "error");
                return false;
            }

            var money = $(_this).find(".moneys").val();
            var type = $(_this).find(".moneyType").val();
            var remarks = $(_this).find(".remark").val();
            var types = $(".head-item").attr("data-type");
            var date = $(_this).find(".date").val();

            var payCycleNum = $(_this).find(".nums").val();
            var code = $(".head-item .next").text();

            var id = "";

            $.ajax({
                type: "POST",
                url: "/financeManage/submitBill",
                data: {
                    id: id,
                    code: code,
                    money: money,
                    payCycleNum: payCycleNum,
                    type: type,
                    date: date,
                    types: types,
                    remarks: remarks
                },
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    if (result.message == "success") {
                        $.jBox.tip("添加成功！", "success");
                        var htmlt = "<tr class='childBill' data-id='" + result.id + "' data-cycle='" + payCycleNum + "'>" +
                            "<td><i class='fa fa-minus-circle' onclick='closeTr(this)'></i></td>" +
                            "<td></td>" +
                            "<td data-text='bcb_type'>" + type + "</td>" +
                            "<td data-text='bcb_state' class='hint'>待还款</td>" +
                            "<td data-text='bcb_repayment'><input type='text' style='background: transparent;' value='" + returnFloat(money) + "' readonly='readonly' /></td>" +
                            "<td data-text='bcb_realPayment'>0</td>" +
                            "<td data-text='bcb_balance'>0</td>" +
                            "<td data-text='bcb_repaymentDate'>" + date + "</td>" +
                            "<td data-text='bcb_remarks'><input type='text' style='background: transparent;' value='" + remarks + "' readonly='readonly' /></td>" +
                            "<td><i class='fa fa-pencil' onclick='updateBill(this)'></i></td>"
                        "</tr>";
                        $(".div-tbody").find(".childBill[data-cycle='" + payCycleNum + "']").last().after(htmlt);
                        $(".div-tbody").find(".childBill[data-cycle='" + payCycleNum + "']").show();
                        var sumMoney = 0;
                        $(".div-tbody").find(".childBill[data-cycle='" + payCycleNum + "']").each(function (i) {
                            sumMoney += parseFloat($(this).find("td").eq(4).find("input").val());
                        });
                        $(".div-tbody").find(".childBill[data-cycle='" + payCycleNum + "']").first().prev().find("td").eq(4).text(sumMoney);
                        $("#sumMoney").text("￥" + sumMoney);
                        return true;
                    } else {
                        $.jBox.tip("输入有误，请重新填写", "error");
                        return false;
                    }
                }
            });
        }
    };
    var html = "";
    html += "<div class='biilstyle' id='addBill'>";
    html += "<dl>";
    html += "<dt>期数</dt>";
    html += "<dd><select class='nums' onchange='numsType(this)'>";
    var cycleStr = "";
    $(".div-tbody tr").each(function (index) {
        if (index == 0) {
            cycleStr = $(this).find("td").eq(1).text();
        }
        if ($(this).find("td").eq(0).text() != "") {
            html += "<option value='" + $(this).find("td").eq(0).text() + "'>" + $(this).find("td").eq(1).text() + "</option>";
        }
    });
    html += "</select></dd>";
    html += "</dl>";
    html += "<dl>";
    html += "<dt>类型</dt>";
    html += "<dd>";
    html += "<select name='dept' style='width:170px;' class='moneyType'>" +
        "<option value='租金'>租金</option>" +
        "<option value='免租期'>免租期</option>" +
        "<option value='押金'>押金</option>" +
        "<option value='包修费'>包修费</option>" +
        "<option value='材料费'>材料费</option>" +
        "<option value='管理费'>管理费</option>" +
        "<option value='服务费'>服务费</option>" +
        "<option value='物管费'>物管费</option>" +
        "<option value='宽带费'>宽带费</option>" +
        "<option value='燃气费'>燃气费</option>" +
        "<option value='电费'>电费</option>" +
        "<option value='水费'>水费</option>" +
        "<option value='燃气费'>燃气费</option>" +
        "<option value='保洁费'>保洁费</option>" +
        "<option value='维修费'>维修费</option>" +
        "<option value='滞纳金'>滞纳金</option>" +
        "<option value='其他'>其他</option>" +
        "</select>";
    html += "</dd>";
    html += "</dl>";
    html += "<dl>";
    html += "<dt>应" + payStating + "金额</dt>";
    html += "<dd><input type='text' onkeyup='clearNoNums(this)' class='moneys' /></dd>";
    html += "</dl>";
    html += "<dl>";
    html += "<dt>最后还款日</dt>";
    html += "<dd><input type='text' class='date' onfocus='WdatePicker()' value='" + cycleStr.substring(cycleStr.indexOf("[") + 1, cycleStr.indexOf("~")) + "' /></dd>";
    html += "</dl>";
    html += "<dl>";
    html += "<dt>备注</dt>";
    html += "<dd style='height: auto; overflow: hidden;'><textarea rows='' cols=''  class='remark'></textarea></dd>";
    html += "</dl>";
    html += "</div>";
    $.jBox(html, {title: "添加账单", width: 600, submit: submit});
    //第0期初始化
    $(".div-tbody").find(".childBill[data-cycle='0']").each(function (index) {
        var type = $(this).find("td").eq(2).text();
        $("#addBill").find(".moneyType option").each(function (i) {
            if (type == $(this).val()) {
                $(this).attr("disabled", true);
            }
        });
    });
    var bools = true;
    $("#addBill").find(".moneyType option").each(function (i) {
        if (!$(this).is(":disabled")) {
            if (bools) {
                $(this).attr("selected", true);
                bools = false;
            }
        }
    });
}

// 修改订单
function updateBill(ids) {
    var submit = function (v, h, f) {
        if (v == 'ok') {
            var _this = $("#updateBill");
            if ($(_this).find(".moneys").val() == "") {
                $.jBox.tip("应" + payStating + "金额不能为空", "error");
                return false;
            }
            if ($(_this).find(".date").val() == "") {
                $.jBox.tip("日期不能为空", "error");
                return false;
            }

            var money = $(_this).find(".moneys").val();
            var type = $(_this).find(".moneyType").val();
            var remarks = $(_this).find(".remark").val();
            var types = $(".head-item").attr("data-type");
            var date = $(_this).find(".date").val();

            var payCycleNum = $(_this).find(".nums").val();
            var code = $(".head-item .next").text();

            var id = $(_this).find(".idt").val();

            $.ajax({
                type: "POST",
                url: "/financeManage/submitBill",
                data: {
                    id: id,
                    code: code,
                    money: money,
                    payCycleNum: payCycleNum,
                    type: type,
                    date: date,
                    types: types,
                    remarks: remarks
                },
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    if (result.message == "success") {
                        $.jBox.tip("修改成功！", "success");
                        $(ids).parent().parent().find("td").eq(4).find("input").val(returnFloat(money));
                        $(ids).parent().parent().find("td").eq(7).text(date);
                        $(ids).parent().parent().find("td").eq(8).html("<input type='text' style='background: transparent;' readonly='readonly' value='" + remarks + "' />");
                        $(".div-tbody").find(".childBill[data-cycle='" + payCycleNum + "']").show();
                        var sumMoney = 0;
                        $(ids).parent().parent().parent().find(".childBill[data-cycle='" + payCycleNum + "']").each(function (i) {
                            sumMoney += parseFloat($(this).find("td").eq(4).find("input").val());
                        });
                        if (parseFloat($(ids).parent().parent().find("td").eq(4).find("input").val()) == parseFloat($(ids).parent().parent().find("td").eq(5).text())) {
                            $(ids).parent().parent().find("td").eq(3).text("已还款");
                            $(ids).parent().parent().find("td").eq(3).attr("class", "next");
                            $(ids).parent().parent().find("td").eq(6).text(0);
                            $(ids).parent().parent().parent().find("tr").each(function (i) {
                                if ($(this).find("td").eq(0).text() == payCycleNum) {
                                    $(this).find("td").eq(3).text("已还款");
                                    $(this).find("td").eq(3).attr("class", "next");
                                    $(this).find("td").eq(6).text(0);
                                }
                            });
                            $(ids).parent().parent().parent().find("td[text=3]").parent().parent().find("td").eq(3).text("已还款");
                            $(ids).parent().parent().parent().find("label[data-cycle=3]").parent().parent().find("td").eq(3).attr("class", "next");
                        }
                        $(ids).parent().parent().parent().find(".childBill[data-cycle='" + payCycleNum + "']").first().prev().find("td").eq(4).text(sumMoney);
                        $("#sumMoney").text("￥" + sumMoney);
                        return true;
                    } else {
                        $.jBox.tip("输入有误，请重新填写", "error");
                        return false;
                    }
                }
            });
        }
    };
    var html = "";
    html += "<div class='biilstyle' id='updateBill'>";
    html += "<dl>";
    html += "<dt>期数</dt>";
    html += "<dd><select class='nums' onchange=''>";
    html += "<option value='" + $(".div-tbody").find(".childBill[data-cycle='" + $(ids).parent().parent().attr("data-cycle") + "']").first().prev().find("td").eq(0).text() + "'>" + $(".div-tbody").find(".childBill[data-cycle='" + $(ids).parent().parent().attr("data-cycle") + "']").first().prev().find("td").eq(1).text() + "</option>";
    html += "</select></dd>";
    html += "</dl>";
    html += "<dl>";
    html += "<dt>类型</dt>";
    html += "<dd>";
    html += "<select name='dept' style='width:170px;' class='moneyType'>";
    html += "<option value='" + $(ids).parent().parent().find("td").eq(2).text() + "'>" + $(ids).parent().parent().find("td").eq(2).text() + "</option>";
    html += "</select>";
    html += "</dd>";
    html += "</dl>";
    html += "<dl>";
    html += "<dt>应" + payStating + "金额</dt>";
    html += "<dd><input type='text' onkeyup='clearNoNums(this)' class='moneys' value='" + $(ids).parent().parent().find("td").eq(4).find("input").val() + "' /></dd>";
    html += "</dl>";
    html += "<dl>";
    html += "<dt>最后还款日</dt>";
    html += "<dd><input type='text' class='date' onfocus='WdatePicker()' value='" + $(ids).parent().parent().find("td").eq(7).text() + "'/></dd>";
    html += "</dl>";
    html += "<dl>";
    html += "<dt>备注</dt>";
    html += "<dd style='height: auto; overflow: hidden;'><textarea rows='' cols=''  class='remark'>" + $(ids).parent().parent().find("td").eq(8).find("input").val() + "</textarea></dd>";
    html += "</dl>";
    html += "<input type='hidden' class='idt' value='" + $(ids).parent().parent().attr("data-id") + "' />";
    html += "</div>";
    $.jBox(html, {title: "修改账单", width: 600, submit: submit});
}

/**
 * 删除添加账单
 *
 * @param ids
 */
function closeTr(ids) {
    if ($(ids).parent().parent().attr("data-id") == "" || $(ids).parent().parent().attr("data-id") == null) {
        $(ids).parent().parent().remove();
        return;
    }
    $.ajax({
        type: "POST",
        url: "/financeManage/removeBill",
        data: {
            id: $(ids).parent().parent().attr("data-id")
        },
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.message == "success") {
                $(ids).parent().parent().remove();
            } else {
                $.jBox.tip("删除失败，请重新删除！", "error");
            }
        }
    });
}

/**
 * 线上线下
 *
 * @param ids
 */
function bankTypes(ids, index) {
    if ($(ids).val() == "线上") {
        $(ids).next().show();
        $(ids).next().next().hide();
        $(ids).next().next().next().show();
        $(ids).next().next().next().next().show();
        $(ids).next().next().next().next().next().show();
        $(ids).next().html("<option value='支付宝'>支付宝</option><option value='微信'>微信</option>");
        $(ids).next().removeAttr("onchange");

        if ($(ids).val() != "请选择") {
            var _this = $(ids).parent().parent().parent().parent().next().next().find("tbody");
            $(".payTypeItem").html("<option>全部</option>");
            $(_this).find("tr.childBill[data-cycle='" + index + "']").each(function (i) {
                $(".payTypeItem").append("<option>" + $(this).find("td").eq(2).text() + "</option>")
            });
        }
    } else {
        $(ids).next().show();
        $(ids).next().html("<option value=''>请选择</option><option value='银行卡'>银行卡</option><option value='支付宝'>支付宝</option><option value='微信'>微信</option><option value='现金'>现金</option>");
        $(ids).next().attr("onchange", 'bankType(this,"' + index + '")');
        $(ids).next().next().hide();
        $(ids).next().next().next().hide();
        $(ids).next().next().next().next().hide();
        $(ids).next().next().next().next().next().hide();
    }
}

/**
 * 选择支付类型
 *
 * @param ids
 */
function bankType(ids, index) {
    if ($(ids).val() == "请选择") {
        $(ids).next().hide();
        $(ids).next().next().hide();
        $(ids).next().next().next().hide();
        $(ids).next().next().next().next().hide();
        $(".payTypeItem").html("");
    } else if ($(ids).val() == "银行卡") {
        $(ids).next().show();
        $(ids).next().next().show();
        $(ids).next().next().next().show();
        $(ids).next().next().next().next().show();
    } else {
        $(ids).next().hide();
        $(ids).next().next().show();
        $(ids).next().next().next().show();
        $(ids).next().next().next().next().show();
    }
    if ($(ids).val() != "请选择") {
        var _this = $(ids).parent().parent().parent().parent().next().next().find("tbody");
        $(".payTypeItem").html("<option>全部</option>");
        $(_this).find("tr.childBill[data-cycle='" + index + "']").each(function (i) {
            $(".payTypeItem").append("<option>" + $(this).find("td").eq(2).text() + "</option>")
        });
    }

}

/**
 * 期数选择判断类型是否能选择
 * */
function numsType(ids) {
    var nums = $(ids).val();
    var cycleStr = $(ids).find("[value='" + nums + "']").text();
    $(ids).parent().parent().next().next().next().find("input").val(cycleStr.substring(cycleStr.indexOf("[") + 1, cycleStr.indexOf("~")));
    $(ids).parent().parent().next().find(".moneyType option").attr("disabled", false);
    $(".div-tbody").find(".childBill[data-cycle='" + nums + "']").each(function (index) {
        var type = $(this).find("td").eq(2).text();
        $(ids).parent().parent().next().find(".moneyType option").each(function (i) {
            if (type == $(this).val()) {
                $(this).attr("disabled", true);
            }
        });
    });
    var bools = true;
    $(ids).parent().parent().next().find(".moneyType option").each(function (i) {
        if (!$(this).is(":disabled")) {
            if (bools) {
                $(this).attr("selected", true);
                bools = false;
            }
        }
    });
}

/**
 * 收款
 *
 * @param obj
 */
function submitPay(ids) {
    var paytypese = $(ids).prev().prev().prev().prev().prev().val();
    var bank = $(ids).prev().prev().prev().val();
    var payTypes = $(ids).prev().prev().prev().prev().val();
    var moneys = $(ids).prev().val();
    var content = "";
    var sumMoney = 0;
    var yMoneys = $(ids).parent().find("#sumMoney").text().replace("￥", "");
    var newIndex = $(ids).parent().find("#newIndex").text();
    if (parseFloat(moneys) > parseFloat(yMoneys)) {
        $.jBox.tip("输入金额不能超过此次支付账单的金额(" + yMoneys + ")", "error");
        return;
    }
    var type = "";
    if (paytypese == "线下") {
        type = $(ids).prev().prev().val();
    } else {
        type = "全部";
    }
    var cha = 0;
    $(ids).parent().parent().parent().parent().next().next().find("tbody tr").each(function () {
        if ($(this).find("td").eq(0).text() == newIndex) {
            if (type != "全部") {
                $(this).parent().find(".childBill[data-cycle='" + $(this).find("td").eq(0).text() + "']").each(function () {
                    if (type == $(this).find("td").eq(2).text()) {
                        var ys = (parseFloat($(this).find("td").eq(4).find("input").val()) - parseFloat($(this).find("td").eq(5).text()));
                        if (ys != 0) {
                            content += "<tr>" +
                                "<td>" + $(this).find("td").eq(2).text() + "</td>" +
                                "<td>" + ys + "</td>" +
                                "</tr>";
                            sumMoney += ys;

                            yMoneys = $(this).find("td").eq(4).find("input").val();
                        }
                    }
                });
            } else {
                $(this).parent().find("tr.childBill[data-cycle='" + $(this).find("td").eq(0).text() + "']").each(function () {
                    var ys = (parseFloat($(this).find("td").eq(4).find("input").val()) - parseFloat($(this).find("td").eq(5).text()));
                    if (ys != 0) {
                        content += "<tr>" +
                            "<td>" + $(this).find("td").eq(2).text() + "</td>" +
                            "<td>" + ys + "</td>" +
                            "</tr>";
                        sumMoney += ys;
                    }
                });
            }
        }
    });
    //第几期
    newIndex = $(ids).parent().find("#newIndex").text();
    // 差额
    cha = parseFloat(yMoneys) - parseFloat(moneys).toFixed(2);
    content += "<tr>" +
        "<td>总计</td>" +
        "<td>" + sumMoney + "</td>" +
        "</tr>";
    var moreHtml = "";
    if (cha != 0) {
        moreHtml = "<div style='height: 35px; margin-top:10px;'>" +
            "<lable style='float:left;'>添加未收款项：</lable>" +
            "<select name='dept' style='width:170px;' multiple tabindex='1' id='dept' class='moneyType'>" +
            "<option value='租金'>租金</option>" +
            "<option value='免租期'>免租期</option>" +
            "<option value='押金'>押金</option>" +
            "<option value='包修费'>包修费</option>" +
            "<option value='材料费'>材料费</option>" +
            "<option value='管理费'>管理费</option>" +
            "<option value='服务费'>服务费</option>" +
            "<option value='物管费'>物管费</option>" +
            "<option value='宽带费'>宽带费</option>" +
            "<option value='燃气费'>燃气费</option>" +
            "<option value='电费'>电费</option>" +
            "<option value='水费'>水费</option>" +
            "<option value='燃气费'>燃气费</option>" +
            "<option value='保洁费'>保洁费</option>" +
            "<option value='维修费'>维修费</option>" +
            "<option value='滞纳金'>滞纳金</option>" +
            "</select>" +
            "<input type='text' class='insertMoney' style='height:32px;' placeholder='金额' />" +
            "<button class='insertButton' onclick='uncollList(this)'>添加</button>" +
            "</div>" +
            "<table class='uncollectedTable'>" +
            "<thead>" +
            "<tr>" +
            "<td>未收类型</td>" +
            "<td>未收金额</td>" +
            "<td>操作</td>" +
            "</tr>" +
            "</thead>" +
            "<tbody>" +
            "<tr>" +
            "<td>总计</td>" +
            "<td>0</td>" +
            "<td></td>" +
            "</tr>" +
            "</tbody>" +
            "</table>";
    }
    var typet = "";
    if (type != "全部") {
        typet = " " + type;
    }
    if (house_address.indexOf("逾") > 0) {
        house_address = house_address.substring(0, house_address.indexOf("逾"));
    }
    var html = "<div style='padding:10px;'>" +
        "<div>房号：" + house_address + "（租客" + typet + "）第" + newIndex + "期，应" + payStating + "：<font style='color:#F39C12'>" + yMoneys + "</font> 元，实" + payStating + "：<font style='color:#E74C3C'>" + moneys + "</font> 元，结余：<font style='color:#E74C3C' id='surplus' name='surplus'>" + cha.toFixed(2) + "</font> 元</div>" +
        "<table class='payTable'>" +
        "<thead>" +
        "<tr>" +
        "<td>费用类型</td>" +
        "<td>应" + payStating + "金额</td>" +
        "</tr>" +
        "</thead>" +
        "<tbody>" +
        content +
        "</tbody>" +
        "</table>" +
        moreHtml +
        "</div>";
    var submit = function (v, h, f) {
        var sumMoney = parseFloat($(".uncollectedTable tbody tr").eq($(".uncollectedTable tbody tr").length - 1).find("td").eq(1).text());
        if (parseFloat($("#surplus").text()) != "0" && parseFloat($("#surplus").text()) != sumMoney) {
            $.jBox.tip("未收款项目和结余不一致！", 'error', {focusId: "surplus"}); // 关闭设置 yourname 为焦点
            return false;
        }
        if ($(h).parent().next().find("input").val() == "") {
            $.jBox.tip("请选择" + payStating + "款日期", 'error');
            return false;
        }

        var billtype = contract_type;
        var code = $(".head-item #code").text();
        var yPay = "[";
        var len1 = $(".payTable tbody tr").length - 1;
        $(".payTable tbody tr").each(function (i) {
            if (i < len1) {
                yPay += "{";
                yPay += "\"type\":\"" + $(this).find("td").eq(0).text() + "\",";
                yPay += "\"money\":\"" + $(this).find("td").eq(1).text() + "\"";
                yPay += "},";
            }
        });
        yPay = yPay.substring(0, yPay.length - 1);
        yPay += "]";

        var wPay = "";
        if ($(".uncollectedTable").length > 0) {
            var len2 = $(".uncollectedTable tbody tr").length - 1;
            wPay = "[";
            $(".uncollectedTable tbody tr").each(function (i) {
                if (i < len2) {
                    wPay += "{";
                    wPay += "\"type\":\"" + $(this).find("td").eq(0).text() + "\",";
                    wPay += "\"money\":\"" + $(this).find("td").eq(1).text() + "\"";
                    wPay += "},";
                }
            });
            wPay = wPay.substring(0, yPay.length - 1);
            wPay += "]";
        }
        var yMoney = yMoneys;
        var sMoney = moneys;
        var payName = cc_name;
        var payPhone = ccp_phone;
        var payType = payTypes;
        var payAccount = bank;
        var indexs = newIndex;
        var date = $(h).parent().next().find("input").val() + " 00:00:00";

        var urls = "";
        if (paytypese == "线上") {
            urls = "/financeManage/onlinePay";
        } else {
            urls = "/financeManage/payBill";
        }

        $.ajax({
            type: "POST",
            url: urls,
            data: {
                billtype: billtype,
                code: code,
                yPay: yPay,
                wPay: wPay,
                yMoney: yMoney,
                sMoney: sMoney,
                payName: payName,
                payPhone: payPhone,
                payType: payType,
                payAccount: payAccount,
                cycle: indexs,
                date: date,
                house_address: house_address,
                type: payTypes
            },
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {
                if (result.message == "success") {
                    if (paytypese == "线上") {
                        var paySubmit = function (v, h, f) {
                            list5(indexs);
                            return true;
                        }
                        var logoImage = "";
                        var payColor = "";
                        if (payTypes == "支付宝") {
                            logoImage = "/resources/image/aliPayLogo.png";
                            payColor = "#0AE";
                        } else {
                            logoImage = "/resources/image/wxPayLogo.png";
                            payColor = "#00c800";
                        }
                        var wxpayHtml = "<div class='titleCode' style='float:left; border-right: 1px solid #CCC; margin-right: 10px; height: 270px;'>" +
                            "<div class='wxLogo'><img src='" + logoImage + "' style='width:138px; height:41px; margin-left: 29px; margin-top: 10px;' /></div>" +
                            "<div class='wxPayImage'>" +
                            "<span style='display:block; width:200px; color:#21ba14; font-size: 14px; text-align: center; height: 5px;'>欢迎使用" + payTypes + "支付</span>" +
                            "<div id='qrcode' style='text-align: center;'></div>" +
                            "<span style='display:block; width:200px; color:" + payColor + "; font-size: 14px; text-align: center; height: 5px; position: absolute; bottom: 23px;'>" + payTypes + "扫码，向我付款</span>" +
                            "</div>" +
                            "</div>" +
                            "<div class='wxSuccess' style='width: 200px; height: 268px; float:left; border-right: 1px solid #CCC; margin-right: 10px; display:none;'><img style='margin-left: 50px; margin-top: 66px;' src='/resources/image/wxSuccess.png' /><span style='display:block; width:200px; color:#21ba14; font-size: 16px; text-align: center;'>订单支付成功！</span></div>" +
                            "<div class='wxMessage'><dl><dt>订单号:</dt><dd>" + code + "<dd></dl><dl><dt>房号:</dt><dd>" + house_address + "<dd></dl><dl><dt>期数:</dt><dd>第" + indexs + "期[" + payStating + "]<dd></dl><dl><dt>金额:</dt><dd><font style='color:#E74C3C'>" + sMoney + "</font>元<dd></dl><dl><dt>缴费方式:</dt><dd>" + payTypes + "支付<dd></dl></div>";
                        $.jBox(wxpayHtml, {title: payTypes, showIcon: 'wxIcon', width: 620, submit: paySubmit});

                        var options = {
                            render: "canvas",
                            ecLevel: 'H',//识别度
                            fill: '#000',//二维码颜色
                            background: '#ffffff',//背景颜色
                            quiet: 2,//边距
                            width: 170,//宽度
                            height: 170,
                            text: result.image,//二维码内容
                            //中间logo start
                            mode: 4,
                            mSize: 11 * 0.01,
                            mPosX: 50 * 0.01,
                            mPosY: 50 * 0.01,
                            src: "/resources/image/10.png",//logo图片
                            //中间logo end
                            label: 'jQuery.qrcode',
                            fontname: 'Ubuntu',
                            fontcolor: '#ff9818',
                        };
                        $('#qrcode').empty().qrcode(options);

                        var interva = setInterval(function () {
                            if ($(".titleCode").length > 0) {
                                $.ajax({
                                    type: "POST",
                                    url: "/financeManage/selectBillSuccess",
                                    data: {
                                        bco_code: code,
                                        bcb_cycle: indexs
                                    },
                                    contentType: "application/x-www-form-urlencoded; charset=utf-8",
                                    dataType: "json",
                                    success: function (result) {
                                        if (result.message == "success") {
                                            $(".titleCode").hide();
                                            $(".wxSuccess").show();
                                            window.clearInterval(interva);
                                        }
                                    }
                                });
                            } else {
                                window.clearInterval(interva);
                            }
                        }, 1000);
                    } else {
                        $.jBox.tip("支付成功", "success");
                        list5(indexs);
                    }
                    return true;
                } else {
                    $.jBox.tip("支付失败，请刷新后重新尝试！", "error");
                    return false;
                }
            }
        });
    };
    var dateStr = "<div style='height: 30px; line-height: 30px; margin-left: 10px; float: left;'><lable style='float:left; height: 30px; line-height: 30px;'>" + payStating + "款日期：</lable><lable style='float:left;'><input type='text' id='payDate' style='text-align: left; text-indent: 10px; border: 1px solid #ddd;' onfocus='WdatePicker()' /></lable></div>";
    $.jBox(html, {title: "确认" + payStating + "款", width: 620, submit: submit});
    $(".jbox-button-panel").prepend(dateStr);
    $(".jbox-state").find(".jbox-content").attr("style", "");
    $(".moneyType").chosen({
        no_results_text: "没有找到",
        allow_single_de: true
    });
}

/**
 * 支付账单
 *
 * @param obj
 */
function payBill(ids) {
    if ($(ids).next().is(":hidden")) {
        $(ids).next().show();
    } else {
        $(ids).next().hide();
    }
}

/**
 * 未收款选项
 *
 * @param obj
 */
function uncollList(ids) {
    if ($(ids).prev().val() == "") {
        $.jBox.tip("请填写金额未" + payStating + "款项金额!");
        return;
    }
    $(".moneyType option").attr("disabled", false);
    $(ids).prev().prev().find(".chosen-choices .search-choice").each(function () {
        var type = $(this).text();
        var money = $(ids).prev().val();
        $(".uncollectedTable tbody").prepend("<tr><td>" + type + "</td><td>" + money + "</td><td><i class='fa fa-minus-circle' onclick='dataclose(this)'></i></td></tr>");
        $(".moneyType option").each(function () {
            if ($(this).val() == type) {
                $(this).attr("disabled", true);
            }
        });
    });
    var sumMoney = 0;
    $(".uncollectedTable tbody tr").each(function (i) {
        if (i < ($(".uncollectedTable tbody tr").length - 1)) {
            sumMoney += parseFloat($(this).find("td").eq(1).text());
        }
    });
    $(".uncollectedTable tbody tr").eq($(".uncollectedTable tbody tr").length - 1).find("td").eq(1).text(sumMoney.toFixed(2));
    $(ids).prev().prev().find(".search-choice").remove();
    $(ids).prev().val("");
    $(".uncollectedTable").show();
}

/**
 * 删除未收款数据
 *
 * @param obj
 */
function dataclose(ids) {
    var money = $(ids).parent().prev().text();
    var sumMoney = $(".uncollectedTable tbody tr").eq($(".uncollectedTable tbody tr").length - 1).find("td").eq(1).text();
    var cha = parseFloat(sumMoney) - parseFloat(money);
    $(".uncollectedTable tbody tr").eq($(".uncollectedTable tbody tr").length - 1).find("td").eq(1).text(cha);
    $(ids).parent().parent().remove();
    if ($(".uncollectedTable tbody tr").length < 1) {
        $(".uncollectedTable").hide();
    }
    var type = $(ids).parent().parent().find("td").eq(0).text();
    $(".moneyType option").each(function () {
        if ($(this).val() == type) {
            $(this).attr("disabled", false);
        }
    });
    $(".moneyType").trigger("chosen:updated");
}

/**
 * 合同记录
 */
function list6() {
    $.ajax({
        type: "POST",
        url: "/contractObject/queryContractRecord",
        data: {
            cno: getUrlParam("contractObject_No") || '',
            con_code: getUrlParam("con_code")
        },
        dataType: "json"
    }).done(function (result) {
        switch (result.code) {
            case 200:
                // 合同记录
                auditingRecordList = result.data.auditingRecordList;
                if (isEmpty(auditingRecordList)) {
                    $("#other-content").html("没有数据");
                    return;
                }
                var html = "";
                html += '<div class="div-table">';
                html += '    <div class="div-thead">';
                html += '        <ul>';
                html += '            <li style="width: 40px;text-align: center;">#</li>';
                html += '            <li style="width: 150px;">操作时间</li>';
                html += '            <li style="text-align: left;">问题描述</li>';
                html += '            <li style="width: 74px;">操作人</li>';
                html += '        </ul>';
                html += '    </div>';
                html += '    <div class="div-tbody" style="height: 340px;overflow: hidden;">';
                $.each(auditingRecordList, function (index, data) {
                    html += '	<ul style="background: ' + (index % 2 == 0 ? '#f9f9f9' : '#fff') + ';">';
                    html += '	    <li style="width: 40px;text-align: center;">' + (index + 1) + '</li>';
                    html += '	    <li style="width: 150px;">' + returnTime(data.auditingRecord_createTime) + '</li>';
                    html += '	    <li class="next" style="text-align: left;" title="' + returnValue(data.auditingRecord_content) + '">' + returnValue(data.auditingRecord_content) + '</li>';
                    html += '	    <li style="width: 74px;">' + returnValue(data.auditingRecord_author) + '</li>';
                    html += '	</ul>';
                });
                html += '	</div>';
                html += '</div>';
                $("#other-content").html(html);
                $(".div-tbody").perfectScrollbar();
                break;
            default :

                break;
        }
    });
}

/** 执行记录*/
function list7() {
    $.ajax({
        type: "POST",
        url: "/contractObject/queryContractRecord",
        data: {
            cno: getUrlParam("contractObject_No") || '',
            con_code: getUrlParam("con_code")
        },
        dataType: "json",
        beforeSend: function () {
            $("#other-content").html('<div class="loading"></div>');
        }
    }).done(function (result) {
        switch (result.code) {
            case 200:
                // 合同记录
                var implementRecordList = result.data.implementRecordList;
                if (isEmpty(implementRecordList)) {
                    $("#other-content").html("没有数据");
                    return;
                }
                var html = "";
                html += '<div class="div-table">';
                html += '    <div class="div-thead">';
                html += '        <ul>';
                html += '            <li style="width: 40px;text-align: center;">#</li>';
                html += '            <li style="width: 20%;">操作时间</li>';
                html += '            <li>问题描述</li>';
                html += '            <li style="width: 10%;">操作人</li>';
                html += '        </ul>';
                html += '    </div>';
                html += '    <div class="div-tbody" style="height: 340px;overflow: hidden;">';
                $.each(implementRecordList, function (index, data) {
                    html += '	<ul style="background: ' + (index % 2 == 0 ? '#f9f9f9' : '#fff') + ';">';
                    html += '	    <li style="width: 40px;text-align: center;">' + (index + 1) + '</li>';
                    html += '	    <li style="width: 14%;">' + returnTime(data.cir_createTime) + '</li>';
                    html += '	    <li class="next">' + returnValue(data.cir_content) + '</li>';
                    html += '	    <li style="width: 10%;">' + returnValue(data.em_name) + '</li>';
                    html += '	</ul>';
                });
                html += '	</div>';
                html += '</div>';
                $("#other-content").html(html);
                $(".div-tbody").perfectScrollbar();
                break;
            default :

                break;
        }
    });
}

/** 交接结算*/
function list8(mode) {

    var html = '';
    html += '<div style="position: relative;line-height: 38px;text-align: center;border-bottom: 1px solid #ddd;">';
    if (mode != "out") {
        if (con_type == "托管合同") {
            html += '	<button onclick="list8(\'in\')" style="background: transparent;cursor: pointer;color:#3e97c9">业主交房结算单</button>';
            html += '	<label style="margin:0 6px;color:#ddd;">|</label>';
            html += '	<button onclick="list8(\'out\')" style="background: transparent;cursor: pointer;">业主接房结算单</button>';
        }
        if (con_type == "租赁合同") {
            html += '	<button onclick="list8(\'in\')" style="background: transparent;cursor: pointer;color:#3e97c9">租客接房结算单</button>';
            html += '	<label style="margin:0 6px;color:#ddd;">|</label>';
            html += '	<button onclick="list8(\'out\')" style="background: transparent;cursor: pointer;">租客交房结算单</button>';
        }
    } else {
        if (con_type == "托管合同") {
            html += '	<button onclick="list8(\'in\')" style="background: transparent;cursor: pointer;">业主交房结算单</button>';
            html += '	<label style="margin:0 6px;color:#ddd;">|</label>';
            html += '	<button onclick="list8(\'out\')" style="background: transparent;cursor: pointer;color:#3e97c9">业主接房结算单</button>';
        }
        if (con_type == "租赁合同") {
            html += '	<button onclick="list8(\'in\')" style="background: transparent;cursor: pointer;">租客接房结算单</button>';
            html += '	<label style="margin:0 6px;color:#ddd;">|</label>';
            html += '	<button onclick="list8(\'out\')" style="background: transparent;cursor: pointer;color:#3e97c9">租客交房结算单</button>';
        }
    }
    html += '</div>';
    html += '<div id="other-content-box" style="position:relative;height: 370px;margin-top: 6px;"></div>';
    html += '';
    $("#other-content").html(html);
    $("#other-content-box").handoverBox({
        data: {
            con_code: getUrlParam("con_code"),
            mode: (isEmpty(mode) ? "in" : mode)
        },
        display_title: false,
        display_all: true,
        init: function (result) {
            conType = result.contractObject_Type;
        },
        error: function (e) {
            $("#other-content-box").html('<div class="error" style="text-align:left;line-height: 30px;">' + e + '</div>');
        },
        result: function () {
            $("#other-content-box").perfectScrollbar();
        }
    }).perfectScrollbar();
}

/** 合同管家变更记录 */
function list9() {
    $.ajax({
        type: "POST",
        url: "/contractObject/queryUserContractRecord",
        data: {
            cno: getUrlParam("contractObject_No") || '',
            con_code: getUrlParam("con_code")
        },
        dataType: "json",
        beforeSend: function () {
            $("#other-content").html('<div class="loading"></div>');
        }
    }).done(function (result) {
        switch (result.code) {
            case 200:
                // 合同记录
                userContractRecordList = result.data.userContractRecordList;
                if (isEmpty(userContractRecordList)) {
                    $("#other-content").html("没有数据");
                    return;
                }
                var html = "";
                html += '<div class="div-table">';
                html += '    <div class="div-thead">';
                html += '        <ul>';
                html += '            <li style="width: 40px;text-align: center;">#</li>';
                html += '            <li style="width: 30%;">变更前主管家</li>';
                html += '            <li style="width: 30%;">变更后主管家</li>';
                html += '            <li style="width: 15%;">交接时间</li>';
                html += '            <li style="width: 15%;">状态</li>';
                html += '        </ul>';
                html += '    </div>';
                html += '    <div class="div-tbody" style="height: 340px;overflow: hidden;">';
                $.each(userContractRecordList, function (index, data) {
                    html += '	<ul style="background: ' + (index % 2 == 0 ? '#f9f9f9' : '#fff') + ';">';
                    html += '	    <li style="width: 40px;text-align: center;">' + (index + 1) + '</li>';
                    html += '	    <li style="width: 30%;">' + returnValue(data.em_name_old) + '</li>';
                    html += '	    <li style="width: 30%;">' + returnValue(data.em_name_new) + '</li>';
                    html += '	    <li style="width: 15%;">' + returnTime(data.handover_time) + '</li>';
                    html += '	    <li style="width: 15%;">' + returnValue(data.handover_status == 1 ? '已交接' : '未交接') + '</li>';
                    html += '	</ul>';
                });
                html += '	</div>';
                html += '</div>';
                $("#other-content").html(html);
                $(".div-tbody").perfectScrollbar();
                break;
            default :

                break;
        }
    });
}

/** 初始化首期账单*/
// function initFirstBill() {
//     $(".bill-box").BillBox({
//         cno: cno,
//         title_display: false,				// 订单标题
//         title_order: false,				    // 订单信息
//         title_display: false,				// 标题信息
//         title_contract: false,				// 合同信息
//         displayHint: true
//     });
// }

/** 租金上浮计算*/
function rentPlusTotal() {
    var _contractBody_Rent = returnFloat($("#contractBody_Rent").val());
    var _contractBody_RentPlus = returnFloat($("#contractBody_RentPlus").val());
    if (_contractBody_RentPlus == 0) {
        //		$("#rentPlusTotal").hide();
    } else {
        var html = '';
        html += '<i class="icon-double-angle-up" style="margin-left: 6px;color: #E74C3C; font-size: 17px;"></i>';
        html += '<i id="rentPlusTotal" style="display: inline-block;color: #E74C3C;font-family: Georgia;font-size: 20px;">' + _contractBody_Rent * (1 + (_contractBody_RentPlus / 100)) + '</i>';
        html += '<i style="color: #E74C3C;">元</i>';
        $("#rentPlusTotal").append(html).show();
    }
}

/**
 * 查询更多账单
 *
 * @param code
 *            账单编号
 * @param cycle
 *            账单期数
 */
function queryMoreBill(obj, code, cycle, _balPay) {
    var trusBill = $(".trusBill" + cycle);
    var _subtrusBill = $(".subtrusBill" + cycle);
    if (_subtrusBill.length > 1) {
        _subtrusBill.remove();
        $(obj).css({color: "#3E97C9", background: "none"});
        return;
    }
    $(obj).css({color: "#fff", background: "#3E97C9"});
    $.ajax({
        type: "POST",
        url: "/contractObject/queryBillForCode",
        data: {
            bcode: code,
            bcycle: cycle,
        },
        dataType: "json",
        success: function (result) {
            if (result.code != 200) {
                return;
            }
            var html = '';
            $.each(result.data.contractBillList, function (index, data) {
                // 账单类型
                var bill_type = returnBillType(data.bcb_type);
                // 账单应付款
                var bill_repayment = returnFloat(data.bcb_repayment);
                // 账单实际付款
                var bill_realPayment = isEmpty(data.bcb_realPayment) ? "" : returnFloat(data.bcb_realPayment) + "元";
                // 账单未付款
                var bill_balance = returnValue(data.bcb_balance);

                // 收支类型
                switch (_balPay) {
                    case "收": // 租赁
                        switch (data.bcb_balPay) {
                            case 0: // 收
                                bill_repayment = '<label class="ok">' + bill_repayment + '元</label>';
                                break;
                            case 1: // 付
                                bill_repayment = '<label class="error">-' + bill_repayment + '元</label>';
                                break;
                        }
                        break;
                    case "付": // 托管
                        switch (data.bcb_balPay) {
                            case 0: // 收
                                bill_repayment = '<label class="error">-' + bill_repayment + '元</label>';
                                break;
                            case 1: // 付
                                bill_repayment = '<label class="ok">' + bill_repayment + '元</label>';
                                break;
                        }
                        break;
                }

                // 账单状态
                var bill_state = returnBillState(data.bcb_state);

                html += '    <ul class="subtrusBill' + cycle + '" style="background: #ffffff;border-bottom: 1px solid #ddd;">';
                html += '    	<li style="width: 54px;">' + (index + 1) + '</li>';
                html += '    	<li style="width: 220px;">第' + returnValue(cycle) + '期&nbsp;[' + $(obj).attr("data-cycle-date") + ']</li>';
                html += '    	<li style="width: 84px;">' + bill_type + '</li>';
                html += '    	<li style="width: 84px;">' + bill_repayment + '</li>';
                html += '    	<li style="width: 84px;">' + bill_realPayment + '</l>';
                html += '    	<li style="width: 84px;">' + bill_balance + '</li>';
                html += '    	<li style="width: auto;text-align: left;">' + returnValue(data.bcb_remarks) + '</li>';
                html += '    	<li style="width: 84px;" class="' + bill_state.style + '">' + bill_state.text + '</li>';
                html += '    	<li style="width: 100px;">' + returnDate(data.bcb_repaymentDate) + '</li>';
                html += '    	<li style="width: 100px;">' + "" + '</li>';
                html += '    </ul>'
            });
            ;
            trusBill.after(html);
        }
    });
}

/** 全部未绑定订单*/
// function allBindOrder() {
//     var data = {
//         pageNo: returnNumber($("#pageNo").val()),
//         cno: '',
//         to_name: '',
//         to_phone: '',
//         to_idCard: '',
//     };
//     BINDSTATE = 0;
//     queryBindOrder(data);
// }

/** 未绑定订单*/
// function bindOrder() {
//     var data = {
//         pageNo: returnNumber($("#pageNo").val()),
//         cno: cno,
//         to_name: $("#to_name").val(),
//         to_phone: $("#to_phone").val(),
//         to_idCard: $("#to_idCard").val()
//     };
//     BINDSTATE = 1;
//     queryBindOrder(data);
// }

// function list() {
//     switch (BINDSTATE) {
//         case 0:
//             allBindOrder()
//             break;
//         case 1:
//             bindOrder();
//             break;
//         default:
//             break;
//     }
// }

/** 上一页*/
// function pageUp() {
//     var pageNo = returnNumber($("#pageNo").val());
//     if (pageNo <= 1) {
//         $("#pageNo").val(1);
//     } else {
//         $("#pageNo").val(pageNo - 1);
//         list();
//     }
// }

/** 下一页*/
// function pageDown() {
//     var pageNo = returnNumber($("#pageNo").val());
//     var totalPage = returnNumber($("#totalPage").text());
//     if (pageNo >= totalPage) {
//         $("#pageNo").val(totalPage);
//     } else {
//         $("#pageNo").val(pageNo + 1);
//         list();
//     }
// }

/** 跳页*/
// function pageGo() {
//     var pageNo = returnNumber($("#pageNo").val());
//     var totalPage = returnNumber($("#totalPage").text());
//     if (pageNo <= 1) {
//         $("#pageNo").val(1);
//     } else if (pageNo >= totalPage) {
//         $("#pageNo").val(totalPage);
//     } else {
//         list();
//     }
// }

/** 查询绑定订单*/
// function queryBindOrder(data) {
//     $.ajax({
//         type: "POST",
//         url: "/contractObject/queryNoBindOrder",
//         data: data,
//         dataType: "json",
//         beforeSend: function () {
//             var text = $(".bill-hint-title").text();
//             $(".bill-hint-title").attr("data-cache", text);
//             $(".bill-hint-title").text("系统正在匹配订单...");
//         },
//         success: function (result) {
//             if (result.code == 200) {
//                 // 如果没有匹配的订单就提示
//                 if (result.data.list.length == 0) {
//                     $(".bill-hint-title").html('没有发现与该合同相匹配的订单<br><a href="javascript:allBindOrder();" style="font-size:14px;color:#3E97C9;">[查看全部订单]</a>').show();
//                     return;
//                 }
//                 // 有匹配的订单就列表输入
//                 $(".bill-hint-title").empty().hide();
//                 $(".content-ul-list").empty();
//                 $.each(result.data.list, function (index, data) {
//                     $(".content-ul-list").append(
//                         '<ul style="background:' + (index % 2 == 0 ? "#f7f7f7" : "#ffffff") + '">' +
//                         '<li style="width: 30px;">' + (index + 1) + '</li>' +
//                         '<li style="width: 10%">' + returnValue(data.to_contractCode) + '</li>' +
//                         '<li style="width: 15%">' + returnValue(data.to_name) + '/' + returnValue(data.to_phone) + '</li>' +
//                         '<li style="width: 15%">' + returnValue(data.to_peopleName) + '/' + returnValue(data.to_peoplePhone) + '</li>' +
//                         '<li style="width: 8%">' + returnValue(data.to_people) + '</li>' +
//                         '<li style="width: 8%">' + returnFloat(data.to_shouldMoney) + '元</li>' +
//                         '<li style="width: 15%">' + returnValue(data.to_idCard) + '</li>' +
//                         '<li style="width: 8%">' + returnValue(data.to_state) + '</li>' +
//                         '<li style="width: auto">' + format(data.to_startDate, "yyyy-MM-dd") + '</li>' +
//                         '<li style="width: 8%"><bottom onclick="ppOrder(this)" style="color:#27AE60;cursor: pointer;">选择</bottom></li>' +
//                         '</ul>');
//                 });
//                 $(".bill-hint-content").show();
//             }
//             $("#totalPage").text(result.data.totalPage);
//             $("#totalRecords").text(result.data.totalRecords);
//         }
//     });
// }

// function ppOrder(obj) {
//     var _this = $(obj);
//     var _pli = _this.parents("ul").find("li");
//     var $otop = $(".option-top>ul>li");
//     var $obtn = $(".option-bottom>ul>li");
//     var $omid = $(".option-middle>ul>li");
//     $otop.eq(1).text(_pli.eq(1).text());// 合同号
//     $otop.eq(2).text(_pli.eq(2).text());// 租客信息
//     $otop.eq(3).text(_pli.eq(4).text());// 付款方式
//     $otop.eq(4).text(_pli.eq(5).text());// 月租
//     $otop.eq(5).text(_pli.eq(6).text());// 身份证号
//     var $optionTop = $(".option-top");
//     $optionTop.css({boxShadow: "0px 0px 10px #27AE60"});
//     ($otop.eq(1).text() == $obtn.eq(1).text()) ? $omid.eq(1).find(".ok").show().siblings(".error").hide() : $omid.eq(1).find(".error").show().siblings(".ok").hide();
//     ($otop.eq(2).text() == $obtn.eq(2).text()) ? $omid.eq(2).find(".ok").show().siblings(".error").hide() : $omid.eq(2).find(".error").show().siblings(".ok").hide();
//     ($otop.eq(3).text() == $obtn.eq(3).text()) ? $omid.eq(3).find(".ok").show().siblings(".error").hide() : $omid.eq(3).find(".error").show().siblings(".ok").hide();
//     ($otop.eq(4).text() == $obtn.eq(4).text()) ? $omid.eq(4).find(".ok").show().siblings(".error").hide() : $omid.eq(4).find(".error").show().siblings(".ok").hide();
//     ($otop.eq(5).text() == $obtn.eq(5).text()) ? $omid.eq(5).find(".ok").show().siblings(".error").hide() : $omid.eq(5).find(".error").show().siblings(".ok").hide();
//     setTimeout(function () {
//         $optionTop.css({boxShadow: "0px 0px 0px #ddd"});
//     }, 1000);
// }

/** 改变付款方式*/
function changeFKWay(obj) {
    var _thisVal = $(obj).find("option:selected").val();
    if ($(obj).attr("id") == 'tb_payWay') {
        $("#bfrr_receiptWay option").each(function () {
            if ($(this).val().indexOf(_thisVal) > -1) {
                $(this).attr("selected", "selected");
                return false;
            }
        });
    }
    if ($(obj).attr("id") == 'bfrr_receiptWay') {
        $("#tb_payWay option").each(function () {
            if (_thisVal.indexOf($(this).val()) > -1) {
                $(this).attr("selected", "selected");
                return false;
            }
        });
    }
}

/** 重新生成业绩*/
function reBuildAchi(cno) {
    $.ajax({
        type: "POST",
        url: "/contractObject/reBuildAchi",
        data: {
            cno: getUrlParam("contractObject_No"),
            con_code: getUrlParam("con_code")
        },
        dataType: "json"
    });
}

/** 返回合同类型*/
function parseBillType(param) {
    if (param == -1) {
        return "综合";
    }
    var bt_name = "";
    for (var i = 0; i < billTypeList.length; i++) {
        var billType = billTypeList[i];
        if (billType.bt_code == param) {
            bt_name = billType.bt_name;
            break;
        }
    }
    return bt_name;
}

/**
 * 收款状态样式
 * @param obj
 */
function returnStateClass(obj) {
    // 账单状态（1：待审核、2：待还款、3：已还款、4：取消、5：未缴清、10：转租、11：退租、12：解约、13：清退、14：代偿）
    switch (obj) {
        case 2:
            return 'hint';
            break;
        case 3:
            return 'next';
            break;
        case 5:
            return 'error';
            break;
        case 9:
            return 'green';
            break;
        default:
            return '';
            break;
    }
}

/**
 * 收款状态
 * @param obj
 * @returns {String}
 */
function returnState(obj, extend) {
    // 账单状态（1：待审核、2：待还款、3：已还款、4：取消、5：未缴清、10：转租、11：退租、12：解约、13：清退、14：代偿）
    switch (obj) {
        case 1:
            return '待审核';
            break;
        case 2:
            return '待还款';
            break;
        case 3:
            return '已还款';
            break;
        case 4:
            return '取消';
            break;
        case 5:
            return '未缴清';
            break;
        case 9:
            return extend || '';
            break;
        case 10:
            return '转租';
            break;
        case 11:
            return '退租';
            break;
        case 12:
            return '解约';
            break;
        case 13:
            return '清退';
            break;
        case 14:
            return '代偿';
            break;
        default:
            return '';
            break;
    }
}

/**
 * 获取账单类型列表
 */
function getBillTypeList() {
    $.get("/financeManage/getBillTypeList", function (result) {
        billTypeList = result.list;
    }, "json");
}

/**
 * 子账单显示与隐藏
 * @param obj
 */
function flodChildBill(obj, cycle) {
    var tbody = $(obj).parent().parent().parent();
    $(tbody).find("tr.childBill[data-cycle='" + cycle + "']").each(function () {
        if ($(this).is(":hidden")) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
}

//金钱
function clearNoNums(obj) {
    //得到第一个字符是否为负号
    var t = obj.value.charAt(0);
    obj.value = obj.value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
    obj.value = obj.value.replace(/^\./g, "");  //验证第一个字符是数字而不是.
    obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
    obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数
    if (t == '-') {
        obj.value = '-' + obj.value;
    }
}

/**
 * 打印
 *
 * */
function printSubmit(cyclet, arr) {
    $("#orderPrint").html("");
    var boolls = true;
    var html = "";
    $(".div-tbody table tbody tr").each(function (index) {
        if (parseInt($(this).find("td").eq(0).text()) == cyclet) {
            var indexType = 1;
            var billRemak = "";
            var types = contract_type;
            var titleType = "";
            if (types == "租赁订单") {
                types = "收款凭证";
                titleType = "(租客)";
            } else {
                types = "付款凭证";
                titleType = "(房东)";
            }
            var name = (cc_name + "/" + ccp_phone).split("/")[0];
            var code = $(".head-item #code").text();
            var house = house_address;
            var dateList = $(this).find("td").eq(10).text().split("-");
            var payState = $(this).find("td").eq(3).text();
            var date = dateList[0] + "年" + dateList[1] + "月" + dateList[2] + "日";
            if (payState != "已还款") {
                boolls = false;
                return false;
            }
            var sumMoney = 0;
            var sumCapital = "";
            var cycle = $(this).find("td").eq(1).text();
            var len = $(this).siblings("tr.childBill[data-cycle='" + cyclet + "']").length - 1;
            var sum = Math.ceil((len + 1) / 5);
            var sums = 0;
            $(this).siblings("tr.childBill[data-cycle='" + cyclet + "']").each(function (i) {
                var zMoney = 0;
                var zRmark = "";
                var type = $(this).find("td").eq(2).text();
                var smoney = $(this).find("td").eq(5).text();
                var remark = $(this).find("td").eq(8).find("input").val();
                if (type == "租金") {
                    zMoney = parseFloat(smoney);
                    zRmark = cycle + "租金 " + remark;
                } else {
                    zMoney = parseFloat(smoney);
                    zRmark = remark + " ";
                }
                if (i % 5 == 0) {
                    html += '<div class="tablePrint"><table style="border-collapse: collapse; width: 730px; height:400px;  position: relative;" data-index="' + indexType + '" data-sum="' + sum + '">' +
                        '<thead>' +
                        '<tr>' +
                        '<td colspan="2"></td>' +
                        '<td colspan="4" style=" height: 25px; font-size: 20px; line-height: 25px;text-align: center; color: #E74C3C;">重庆管家婆房屋托管中心专用收据</td>' +
                        '<td><input style="width: 50px; border:none;"  value="" readonly="readonly" /></td>' +
                        '<td><input style="width: 50px; border:none;" value=""  readonly="readonly"/></td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td colspan="2"></td>' +
                        '<td colspan="4" style="height:4px; text-align: center; color: #E74C3C; border-bottom: 1px solid #666; border-top: 1px solid #666;"></td>' +
                        '<td></td>' +
                        '<td></td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td colspan="2"></td>' +
                        '<td colspan="4" style=" height: 25px; font-size: 20px; line-height: 25px; text-align: center; color: #E74C3C;">' + types + '</td>' +
                        '<td colspan="2" style="text-align: left; height: 25px; line-height: 25px;">NO.<font style="color: #E74C3C; font-size: 15px;">' + code + '</font></td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td colspan="2" style=" width:180px; height: 28px; line-height: 28px; font-size: 15px;">客户名称：' + name + '</td>' +
                        '<td colspan="4" style=" width:470px; height: 28px; line-height: 28px; font-size: 15px; text-indent: 50px">房号：' + house + '</td>' +
                        '<td colspan="2" style=" width:160px; height: 28px; line-height: 28px; font-size: 15px; text-align: left;">日期：' + date + '</td>' +
                        '</tr>' +
                        '</thead>';
                    html += '<tbody>' +
                        '<tr>' +
                        '<td colspan="2" style="border: 1px solid #000; height: 28px; line-height: 28px; text-align: center; font-size: 15px;">款项类型</td>' +
                        '<td colspan="5" style=" border: 1px solid #000; height: 28px; line-height: 28px; text-align: center; font-size: 15px;">款项说明</td>' +
                        '<td style=" border: 1px solid #000; height: 28px; line-height: 28px; text-align: center; font-size: 15px;">金额</td>' +
                        '</tr>';
                }
                if (i == 0) {
                    billRemak = '<td rowspan="5"><label style="width: 20px; display: block;">白存根</label><label style="width: 20px; display: block; margin-top: 5px;">红客户</label><label style="width: 20px; display: block; margin-top: 5px;">黄财务</label></td>';
                } else {
                    billRemak = "";
                }
                var boolt = false;
                if (arr != null) {
                    for (var k = 0; k < arr.length; k++) {
                        if ($(this).find("td").eq(2).text() == arr[k]) {
                            boolt = true;
                            break;
                        }
                    }
                } else {
                    boolt = true;
                }
                if (boolt) {
                    sums = sums + 1;
                    sumMoney += zMoney;
                    html += '<tr>' +
                        '<td colspan="2" style="border: 1px solid #000; height: 22px; line-height: 22px; text-align: center; font-size: 15px;">' + type + '</td>' +
                        '<td colspan="5" style="border: 1px solid #000; height: 22px; line-height: 22px; text-align: center; font-size: 15px; text-align: left; text-indent: 10px;">' + zRmark + '</td>' +
                        '<td style="border: 1px solid #000; height: 22px; line-height: 22px; text-align: center; font-size: 15px;">' + zMoney.toFixed(2) + '</td>' +
                        billRemak +
                        '</tr>';
                }
                if (i == len) {
                    var onther = "";
                    var lent = (5 - sums);
                    for (var i = 0; i < lent; i++) {
                        onther += '<tr>' +
                            '<td colspan="2" style="border: 1px solid #000; height: 22px; line-height: 22px; text-align: center; font-size: 15px;"></td>' +
                            '<td colspan="5" style="border: 1px solid #000; height: 22px; line-height: 22px; text-align: center; font-size: 15px; text-align: left; text-indent: 10px;"></td>' +
                            '<td style="border: 1px solid #000; height: 22px; line-height: 22px; text-align: center; font-size: 15px;"></td>' +
                            '</tr>';
                    }
                    html += onther;
                    sumCapital = DX(sumMoney);
                    html += '<tr>' +
                        '<td colspan="7" style="border: 1px solid #000; height: 28px; line-height: 28px; text-align: center; font-size: 15px; text-align: left; text-indent: 10px;">人民币(大写)：' + sumCapital + '</td>' +
                        '<td style="border: 1px solid #000; height: 28px; line-height: 28px; text-align: center; font-size: 15px;">￥' + sumMoney.toFixed(2) + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td colspan="8" style="border: 1px solid #000; height: 28px; line-height: 28px; text-align: center; font-size: 15px; text-align: left; text-indent: 10px;">注:机打收据，手写无效，盖章后生效</td>' +
                        '</tr>' +
                        '</tbody>' +
                        '<tfoot style="font-size: 14px;">' +
                        '<tr style=" height: 35px;">' +
                        '<td colspan="8">' +
                        '经办人：<input type="text" style="width: 114px; border: none;" readonly="readonly" value="' + $.cookie("em_name") + '"  />' +
                        '审核人：<input type="text" style="width: 114px; border: none;" readonly="readonly"  />' +
                        '财务复核：<input type="text" style="width: 114px; border: none;" readonly="readonly"  />' +
                        '客户' + titleType + '：<input type="text" style="width: 90px; border: none;" readonly="readonly"  />' +
                        '</td>' +
                        '</tr>' +
                        '<tr><td colspan="8" style=" text-align: right;">打印时间：' + format(new Date(), 'yyyy-MM-dd HH:mm:ss') + '</td></tr>' +
                        '</tfoot>' +
                        '</table></div>';
                } else if (i != 0 && i % 4 == 0) {
                    html += '<tr>' +
                        '<td colspan="7" style="border: 1px solid #000; height: 28px; line-height: 28px; text-align: center; font-size: 15px; text-align: left; text-indent: 10px;">人民币(大写)：</td>' +
                        '<td style="border: 1px solid #000; height: 28px; line-height: 28px; text-align: center; font-size: 15px;"></td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td colspan="8" style="border: 1px solid #000; height: 28px; line-height: 28px; text-align: center; font-size: 15px; text-align: left; text-indent: 10px;">注:机打收据，手写无效，盖章后生效</td>' +
                        '</tr>' +
                        '</tbody>' +
                        '<tfoot style="font-size: 14px;">' +
                        '<tr style=" height: 35px;">' +
                        '<td colspan="8">' +
                        '经办人：<input type="text" style="width: 114px; border: none;" readonly="readonly" value="' + $.cookie("em_name") + '"  />' +
                        '审核人：<input type="text" style="width: 114px; border: none;" readonly="readonly"  />' +
                        '财务复核：<input type="text" style="width: 114px; border: none;" readonly="readonly"  />' +
                        '客户' + titleType + '：<input type="text" style="width: 90px; border: none;" readonly="readonly"  />' +
                        '</td>' +
                        '</tr>' +
                        '<tr><td colspan="8" style=" text-align: right;">打印时间：' + format(new Date(), 'yyyy-MM-dd HH:mm:ss') + '</td></tr>' +
                        '</tfoot>' +
                        '</table></div>';
                }
            });
        }
    });
    $("#orderPrint").html(html);
    if (boolls) {
        if ($("#orderPrint table").length > 0) {
            printMytable();
        } else {
            $.jBox.tip("请选择打印的内容!", "error");
        }
    } else {
        $.jBox.tip("还未支付!", "error");
    }
}

function printMytable() {
    LODOP = getLodop();
    LODOP.PRINT_INIT("票据打印");
    $("#orderPrint .tablePrint").each(function (index) {
        LODOP.ADD_PRINT_TABLE(30, 17, "99.8%", 400, $(this).html());
        LODOP.ADD_PRINT_TEXT(10, 700, 100, 22, $(this).find("table").attr("data-index") + "/" + $(this).find("table").attr("data-sum"));
        LODOP.NewPageA();//分页
    });
    if (LODOP.CVERSION) {
        LODOP.On_Return = function (TaskID, Value) {
            // 大于0成功,数字表示打印了几页。
            if (Value > 0) {
                $.ajax({
                    type: "POST",
                    url: "/financeManage/printLogs",
                    data: {
                        bco_code: $("#orderPrint .prinltCode").val(),
                        bco_num: $("#orderPrint .prinltNum").val(),
                        cpl_num: Value
                    },
                    contentType: "application/x-www-form-urlencoded; charset=utf-8",
                    dataType: "json",
                    success: function (result) {

                    }
                });
            }
        };
    }
    LODOP.PREVIEW();
};

//金钱
function clearNoNumst(obj) {
    obj.value = obj.value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
    obj.value = obj.value.replace(/^\./g, "");  //验证第一个字符是数字而不是.
    obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
    obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数
}

var DX = function (num) {
    var strOutput = "";
    var strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分';
    num += "00";
    var intPos = num.indexOf('.');
    if (intPos >= 0)
        num = num.substring(0, intPos) + num.substr(intPos + 1, 2);
    strUnit = strUnit.substr(strUnit.length - num.length);
    for (var i = 0; i < num.length; i++)
        strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(num.substr(i, 1), 1) + strUnit.substr(i, 1);
    return strOutput.replace(/零角零分$/, '整').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(/^元/, "零元");
};

/** 合同审核/复核插件 **/
;(function ($) {

    /** 审核*/
    $.auditing = function (mode) {
        var _accept = $("#main-accept");
        var _title;
        switch (mode) {
            case "auditing" :
                _title = '合同审核';
                break;
            case "review" :
                _title = '合同复核';
                break;
        }

        // HEAD
        var html = '';
        html += '<ul class="title-nav"><li class="visited">' + _title + '</li></ul>';
        _accept.find(".sub-title").html(html);

        // MAIN
        html = '';
        html += '<dl class="main-box-list">';
        html += '	<dt class="item">';
        html += '		<span class="item-titile">处理结果</span>';
        html += '	</dt>';
        html += '	<dd class="item">';
        html += '		<select class="form-control" id="processResult">';
        html += '		    <option value="1">审核通过</option>';
        html += '		    <option value="2">未通过</option>';
        html += '		</select>';
        html += '	</dd>';
        html += '	<dd class="tisp tips"></dd>';
        html += '</dl>';
        html += '<hr>';
        html += '<dl class="main-box-list" id="resultContent" style="display: none;">';
        html += '	<dt class="item">';
        html += '		<em>*</em>';
        html += '		<span class="item-titile">原因</span>';
        html += '	</dt>';
        html += '	<dd class="item">';
        html += '		<textarea class="form-control" id="resultMsg" rows="5" style="width: 400px;height: 130px;" required></textarea>';
        html += '	</dd>';
        html += '	<dd class="tisp tips"></dd>';
        html += '</dl>';
        html += '<hr>';
        html += '<dl class="main-box-list" id="cooper-box" style="display: none;">';
        html += '	<dt class="item">';
        html += '		<span class="item-titile">第三方合作费</span>';
        html += '	</dt>';
        html += '	<dd class="item">';
        html += '		<input type="text" class="form-control money" name="cooper-cost" placeholder="合作费" required/>';
        html += '		<label class="suffix" style="margin-right: 0;">元</label>';
        html += '		<label class="common-checkbox" style="top: 8px;left:6px">无合作费<input type="checkbox" name="hava-cooper" value="0"></label>';
        html += '	</dd>';
        html += '	<dd class="tisp tips"></dd>';
        html += '</dl>';
        html += '<hr>';
        html += '<dl class="main-box-list" id="cooperater-box" style="display: none;">';
        html += '	<dt class="item">';
        html += '		<span class="item-titile">金融机构</span>';
        html += '	</dt>';
        html += '	<dd class="item">';
        html += '		<select class="form-control" name="cooperater" disabled></select>';
        html += '		<label class="common-checkbox" style="top: 8px;left:6px">变更金融机构<input type="checkbox" name="hava-cooperater"></label>';
        html += '	</dd>';
        html += '	<dd class="tisp tips"></dd>';
        html += '</dl>';
        html += '<hr>';
        html += '<dl class="main-box-list main-box-bottom">';
        html += '	<dt class="item">&nbsp;</dt>';
        html += '	<dd class="item">';
        html += '		<input type="button" value="确认" class="btn" onclick="$.auditing.submit()" />';
        html += '		<span class="error-tisp"></span>';
        html += '	</dd>';
        html += '	<dd class="item">';
        html += '		<input type="button" class="btn cancel" value="取消" onclick="window.location.href=\'/contractObject/contractObjectList?mode=' + mode + '\'">';
        html += '	</dd>';
        html += '</dl>';
        _accept.find(".sub-content").html(html);
        _accept.show();

        if (mode == "auditing") {
            $("#cooper-box").show();
        }
        if (mode == "review" && contractObject.contractObject_Type == "租赁合同" && contractBody.contractBody_PayStyle == "月付") {
            $("#cooperater-box").show();
        }

        // 初始化数据
        common.pay_way_zl(function (result) {
            $.each(result.data, function (index, data) {
                $("[name=cooperater]").append('<option value="' + data.contractType_Name + '">' + data.contractType_Name + '</option>');
            });
            $("[name=cooperater]").val(contractBody.contractBody_PayType);
        });

        // 加载事件
        $.auditing.event();
    };

    /** 审核-事件*/
    $.auditing.event = function () {

        // 变更金融机构
        $("[name=hava-cooperater]").click(function () {
            if ($(this).is(":checked")) {
                $("[name=cooperater]").removeAttr("disabled").attr("required", "required");
            } else {
                $("[name=cooperater]").removeAttr("required").attr("disabled", "disabled");
            }
        });

        // 合作费
        $("[name=hava-cooper]").click(function () {
            if ($(this).is(":checked")) {
                $("input[name=cooper-cost]").removeAttr("required").attr("disabled", "disabled");
            } else {
                $("input[name=cooper-cost]").removeAttr("disabled").attr("required", "required");
            }
            $("input[name=cooper-cost]").val("");
        });

        // 特价(关闭)
        $("[name=hava-offers]").click(function () {
            if ($(this).is(":checked")) {
                $("[name=offers-content]").removeAttr("required").attr("disabled", "disabled");
            } else {
                $("[name=offers-content]").removeAttr("disabled").attr("required", "required");
            }
            $("[name=offers-content]").val("");
        });

        // 通过、未通过
        $("#processResult").on("change", function () {
            var _val = $(this).val();
            if (_val == 2) {
                $("#resultContent").show();
                $("#resultMsg").focus();
            } else {
                $("#resultContent").hide();
                $("#resultMsg").val("");
            }
        });
    };

    /** 审核-提交*/
    $.auditing.submit = function () {
        var boo = true;
        $("#main-accept").find(".form-control[required]:visible").each(function () {
            if (isEmpty($(this).val().trim())) {
                $(this).msg("不能为空");
                return boo = false;
            }
        });
        if (!boo) return;

        // 结果
        var _processResult = $("#processResult option:selected").val();
        // 金融机构
        var cooperater = $("[name=hava-cooperater]").is(":checked") ? $("[name=cooperater]").val() : '';
        // 不通过说明
        var _resultMsg = $("#resultMsg").val().trim();
        $.ajax({
            type: "POST",
            url: "/contractObject/contractAuditing",
            data: {
                cno: getUrlParam("contractObject_No") || "",
                con_code: getUrlParam("con_code"),
                mode: getUrlParam("mode"),
                result: _processResult,
                resultMsg: _resultMsg,
                cooperater: cooperater,
                orderCost: returnValue($("input[name=cooper-cost][required]").val())
            },
            dataType: "json"
        }).done(function (result) {
            switch (result.code) {
                case 200:
                    $.jBox.prompt("审核完成", "提示", "success", {
                        closed: function () {
                            window.location.href = "/contractObject/contractObjectList?mode=" + getUrlParam("mode");
                        }
                    });
                    break;
                case 112:
                    $.jBox.prompt("审核完成", "提示", "success", {
                        closed: function () {
                            reBuildAchi(result.data);
                        }
                    });
                    break;
                default :
                    $.jBox.alert(result.msg, "提示", "warning");
                    break;
            }
        });
    };

})(jQuery);
