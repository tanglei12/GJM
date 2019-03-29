$(function () {

    // 加载数据
    load_data();

    // 加载事件
    load_event();
});

// 加载数据
function load_data() {
    $.ajax({
        type: "POST",
        url: "/appPage/queryServiceCostList",
        data: {
            md_id: getUrlParam("md_id")
        },
        dataType: "json"
    }).done(function (result) {
        if (result.code !== 200) return return_msg(result);

        var serviceMoneyList = result.data.serviceMoneyList || "";
        $.each(serviceMoneyList, function (index, data) {
            if (data.ssm_source === "人工费") {
                data.property = "disabled";
            }
            addCostItem(data);
        });
        calCostTotal();
    });
}

// 加载事件
function load_event() {

    /*添加费用项*/
    $("[name=itemAdd]").on("click", function () {
        addCostItem();
        $(this).attr("disabled", "disabled").addClass("disabled");
    });

    /*删除费用项*/
    $(document).on("click", "[name=itemDel]", function () {
        $(this).parents(".dl-dd-item").hide("fast", function () {
            $(this).remove();
            $("[name=itemAdd]").removeAttr("disabled").removeClass("disabled");
        });
    });

    /*填写费用*/
    $(document).on("focus", "[name=itemCost]", function () {
        $(this).select();
    });

    /*计算费用合计*/
    $(document).on("input propertychange", "[name=itemCost]", function () {
        calCostTotal();
    });

    /*提交保存*/
    $("[name=done]").on("click", function () {
        var boo = true;
        $("[required]:visible").each(function () {
            if (isEmpty($(this).val())) {
                $(this).appMsg("该字段不能为空");
                return boo = false;
            }
        });
        if (!boo) return;

        var data = {};
        var serviceMoneyList = [];
        $("#itemList").find(".dl-dd-item").each(function () {
            var serviceMoney = {};
            serviceMoney.ssm_source = $(this).find("[name=itemName]").val();
            serviceMoney.ssm_money = $(this).find("[name=itemCost]").val();
            serviceMoneyList.push(serviceMoney);
        });
        data.md_id = getUrlParam("md_id");
        data.serviceMoneyList = JSON.stringify(serviceMoneyList);

        $.ajax({
            type: "POST",
            url: "/appPage/updateServiceCostList",
            data: {
                data: JSON.stringify(data)
            },
            dataType: "json"
        }).done(function (result) {
            if (result.code !== 200) return alert(result.msg);

            if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                self.location = document.referrer;
            } else if (/(Android)/i.test(navigator.userAgent)) {
                // 返回
                OCServiceCost.goBack();
            }
        });
    });
}

// 加载消息
function return_msg(data) {

    var html =
        '<div class="box-msg">' +
        '   <div class="box-msg-content error">' + returnValue(data.msg) + '</div>' +
        '   <div class="box-msg-option"><button name="msg-reload" class="next-bg" onclick="window.location.reload()">刷新重试</button></div>' +
        '</div>';
    $("body").html(html);
}

// 添加费用项
function addCostItem(data) {
    data = data || "";
    var html = '';
    html += '<div class="dl-dd-item">';
    html += '    <div class="item-content">';
    html += '        <input name="itemName" value="' + returnValue(data.ssm_source) + '" placeholder="费用说明" required ' + returnValue(data.property) + '>';
    html += '        <input name="itemCost" value="' + returnFloat(data.ssm_money) + '" class="money" maxlength="11" placeholder="元" required ' + returnValue(data.property) + '>';
    html += '        <button class="item-add error ' + returnValue(data.property) + '" name="itemDel" ' + returnValue(data.property) + '><i class="fa-minus-square-o"></i></button>';
    html += '    </div>';
    html += '</div>';
    var box = $(html).appendTo("#itemList");
    box.show("fast");
}

// 计算费用合计
function calCostTotal() {
    var totalCost = 0;
    $("[name=itemCost]").each(function () {
        totalCost += returnFloat($(this).val());
    });
    $("#payCostTotal").html(returnFloat(totalCost) + " 元");
}
