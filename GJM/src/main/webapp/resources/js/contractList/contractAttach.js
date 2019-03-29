var con_code = getQueryString("con_code"); // 合同号
$(function () {

    initAttach();
    //showUpdateEmployee()
    $(".nav-tab").on("click", function () {
        initAttach($(this).attr("href"));
    });

    // 绑定客户选择弹窗事件
    $("[name=cc_name],[name=ccp_phone],[name=cc_cardNum]").on("click", function () {
        $(this).openModel({
            title: "客户信息",
            target: {
                id: "cc_id",
                code: "cc_code",
                name: "cc_name",
                phone: "ccp_phone",
                card: "cc_cardNum"
            },
            repeatClass: "cc_id"
        });
    });

    // 绑定管家选择弹窗事件
    $("input[name=em_id],input[name=em_name],input[name=em_phone]").on("click", function () {
        $(this).openModel({
            title: "管家信息",
            target: {
                id: "em_id",
                name: "em_name",
                phone: "em_phone"
            },
            repeatClass: "em_id"
        });
    });
    $("#updateEmployee").hide();
    $.power.getQuery(function (result) {
        $(result).each(function (index, item) {
            if (item.ucps_name=="修改管家"){
                showUpdateEmployee();
            }
        })
    })
});

/**初始化*/
function initAttach(hash) {
    $("#prop-transfer-box, #contract-info-box").hide();
    var iden = isEmpty(hash) ? window.location.hash : hash;
    switch (iden) {
        case "#contract-info":
            initContractInfo();
            $("#contract-info-box").show();
            break;
        case "#prop-transfer":
            $("#prop-transfer-box").show();
            initTransferInfo();
            break;
        default :
            initContractInfo();
            $("#contract-info-box").show();
            break;
    }
    $(".nav-tab").removeClass("nav-tab-focus");
    $(".nav-tab[href=" + (isEmpty(iden) ? "#contract-info" : iden) + "]").addClass("nav-tab-focus");
}

/** 初始化合同信息*/
function initContractInfo() {
    // 查询合同信息
    $.ajax({
        url: "/contractObject/queryContractInfo",
        data: {
            con_code: con_code
        },
        dataType: "json",
        beforeSend: function () {
            $("body").append('<div class="loading-mask"></div>');
        }
    }).done(function (result) {
        switch (result.code) {
            case 200:
                var data = result.data;
                // 加载显示数据
                loadingShowData(data);
                // 加载编辑数据
                loadingEditData(data);
                break;
        }
        $(".loading-mask").remove();
    });
}

/** 初始化交接信息*/
function initTransferInfo() {
    $("#prop-transfer-box>.box-content").html('<iframe id="house-iframe" src="/transferKeep/transfer?mode=normal&con_code=' + con_code + '#attach" style="display:none" frameBorder="0"  width="100%" height="100%" scrolling="auto"></iframe>');
    $("#house-iframe").on("load", function () {
        var _content = $(this).contents();
        _content.find("#main-box").css({"padding": "0"});
        _content.find(".box-nav").remove();
        $(this).fadeIn().css({
            height: _content.height()
        });
    });
}

/** 加载显示数据*/
function loadingShowData(param) {
    data = param.contractObject;

    var isZL = returnValue(data.contractObject_Type) == "租赁合同";
    if (isZL) {
        $(".suffix-flag").html('<i class="icon-flag"></i>客源所有者');
    } else {
        $(".suffix-flag").html('<i class="icon-flag"></i>房源所有者');
    }
    var html = "";
    html += '<ul class="title-nav">';
    html += '	<li class="visited">' + returnValue(data.contractObject_Type);
    html += '		<span style="font-size: 14px;color: #000">(&nbsp;<label style="font-size: 14px;font-weight: initial;">' + returnValue(data.contractObject_Version) + '</label>&nbsp;)</span>';
    html += '		<span style="color: #E74C3C;font-weight: normal;font-size: 14px;">NO.' + returnValue(data.contractObject_No) + '</span>';
    html += '	</li>';
    html += '</ul>';
    $("#main-content").find(".sub-title").html(html).css({
        color: (isZL ? "#16A085" : "#3498DB")
    });
    $("#main-content").find(".sub-content").displayContract({
        show_other: false,
        data: {
            con_code: data.contractObject_Code
        }
    });
};

/** 加载编辑数据*/
function loadingEditData(data) {
    // 合同信息
    businessContract = data.businessContract;
    // 客户
    contractSign = data.contractSign;
    // 客户关系人
    affSignArr = data.affSignArr;
    // 合同人员关系
    contractRelaEmps = data.contractRelaEmps;
    // 合作费用
    businessBill = data.businessBill;
    // 产权地址
    viewLibraryInfo = data.viewLibraryInfo;

    // 【产权地址】
    if (!isEmpty(viewLibraryInfo)) {
        $("#he_address").val(returnValue(viewLibraryInfo.he_address));
    }

    // 【合作费】
    if (!isEmpty(businessBill)) {
        $("input[name=cooper-cost]").val(returnFloat(businessBill.bbb_repayment)).attr("data-id", businessBill.bbb_id);
    }

    // 【客户信息】
    $("#customer-box").empty();
    $.each(data.customers, function (index, data) {
        if (data.crc_role == 0) {
            $("input[name=cc_id]").val(returnValue(data.cc_id));
            $("input[name=cc_code]").val(returnValue(data.cc_code));
            $("input[name=cc_name]").val(returnValue(data.cc_name));
            $("input[name=ccp_phone]").val(returnValue(data.ccp_phone));
            $("input[name=cc_cardNum]").val(returnValue(data.cc_cardNum));
        } else {
            addSginlist(data);
        }
    })
    // 【管家信息】
    $("#gj-box").empty();
    if (!isEmpty(data.contractRelaEmps)) {
        $.each(data.contractRelaEmps, function (index, data) {
            if (data.cre_role == 1) {
                $("input[name=contract_perforSplit]").val(data.contract_perforSplit);
                $("input[name=em_id]").val(data.em_id);
                $("input[name=em_name]").val(data.em_name);
                $("input[name=em_phone]").val(data.em_phone);
            } else {
                addGJlist(data, "disabled");
            }
        });
    } else {
        $("input[name=contract_perforSplit]").val(100);
        $("input[name=em_id]").val($.cookie("em_id"));
        $("input[name=em_name]").val($.cookie("em_name"));
        $("input[name=em_phone]").val($.cookie("em_phone"));
    }
};

/** ====================ADD======================== **/

/** 提交成功*/
function submitOk() {
    window.location.href = "/contractObject/contractObjectList/?mode=list";
}

/** 添加合同附加信息*/
function updateContractAttach() {

    var data = {};

    // 【合同对象】
    var contractObject = {};
    contractObject.contractObject_code = con_code;
    data.contractObject = JSON.stringify(contractObject);

    // 【合同主体】
    var contractBody = {}
    contractBody.contractBody_GjName = $("input[name=em_name]").val();
    contractBody.contractBody_GjPhone = $("input[name=em_phone]").val();
    data.contractBody = JSON.stringify(contractBody);

    // 【合作费】
    var businessBill = {};
    businessBill.bbb_id = $("input[name=cooper-cost]").attr("data-id");
    businessBill.bbb_repayment = $("input[name=cooper-cost]").val();
    data.businessBill = JSON.stringify(businessBill);

    // 【客户信息】
    var customerInfos = new Array();
    $("input[name^=cc_code]").each(function () {
        customerInfos.push($(this).val());
    });
    data.customers = JSON.stringify(customerInfos);

    // 【合同图片数据】
    var contractImages = [];
    $(".images-box-img").each(function () {
        var contractImage = {};
        contractImage.ci_type = $(this).attr("data-type");
        contractImage.ci_path = getImageUploadUrl($(this).find("img").attr("src"));
        contractImages.push(contractImage);
    });
    data.contractImages = JSON.stringify(contractImages);

    // 【管家合同关系信息】
    var employeeList = new Array();
    $("input[name^=em_id]").each(function (index) {
        var employee = {};
        employee.em_id = returnNumber($(this).val());
        if (isEmpty(employee.em_id)) {
            return true;
        }
        employee.cre_role = returnNumber($(this).data().type);
        employee.contract_perforSplit = returnNumber($("input[name^=contract_perforSplit]:eq(" + index + ")").val());
        employee.cir_author=$.cookie("em_id")
        employeeList.push(employee);
    });
    var perfor_total = 0;
    $.each(employeeList, function (index, data) {
        perfor_total += returnFloat(data.contract_perforSplit);
    });
    if (perfor_total != 100) {
        $.jBox.tip("管家业绩分成总和必须是100%");
        return;
    }
    data.employeeList = JSON.stringify(employeeList);

    // 提交数据
    $.ajax({
        type: "POST",
        url: "/contractObject/updateContractAttachInfo",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $.jBox.tip('数据保存中...', 'loading');
        },
        success: function (result) {
            if (result.code != 200) {
                $.jBox.tip(result.msg, "error");
                return;
            }
            $.jBox.closeTip();
            $.jBox.success('保存成功', '提示', {
                closed: function () {
                    window.location.href = "/contractObject/contractObjectList";
                }
            });
        }
    });
}

//修改管家
function updateEmployee() {
    $("input[name=contract_perforSplit]").attr("disabled",false);
    $("input[name=em_name]").attr("disabled",false);
    $("input[name=em_phone]").attr("disabled",false);
}

function showUpdateEmployee(){
    $("#updateEmployee").show();
}