$(function () {
    $.houseContract();
});
;(function ($) {

    $.houseContract = function () {
        $.houseContract.load_data();
        $.houseContract.load_event();
    };

    $.houseContract.param = {};

    $.houseContract.load_data = function () {
        var html = '';
        html += '<div class="content" style="padding: 0;margin-top: 10px;">';
        html += '	<div class="content-item">';
        html += '		<div class="content-item-title next">托管合同</div>';
        html += '		<div class="content-item-option">';
        html += '			<button class="contract-add" name="contractAdd" value="tg" disabled></button>';
        html += '		</div>';
        html += '	</div>';
        html += '	<div class="content-item" id="contractTG" style="flex-direction: column;">';
        html += '		<div class="contract-loading" style="text-align: center;line-height: 40px;font-size: 14px;">加载中...</div>';
        html += '	</div>';
        html += '</div>';
        html += '<div class="content" style="padding: 0;margin-top: 0;">';
        html += '	<div class="content-item">';
        html += '		<div class="content-item-title ok">租赁合同</div>';
        html += '		<div class="content-item-option">';
        html += '			<button class="contract-add" name="contractAdd" value="zl" disabled></button>';
        html += '		</div>';
        html += '	</div>';
        html += '	<div class="content-item" id="contractZL" style="flex-direction: column;">';
        html += '		<div class="contract-loading" style="text-align: center;line-height: 40px;font-size: 14px;">加载中...</div>';
        html += '	</div>';
        html += '</div>';
        $("#main").html(html);

        $.ajax({
            type: "POST",
            url: "/contractObject/queryHouseContractInfoList",
            data: {
                hi_code: getUrlParam("hi_code")
            },
            dataType: "json"
        }).done(function (result) {
            if (result.code != 200) return;
            var libraryInfo = result.data.libraryInfo || "";
            $.houseContract.param.he_address = libraryInfo.he_address;

            var viewContractInfo = result.data.viewContractInfo;
            $.houseContract.setInfo(viewContractInfo);
        });
    };

    /**
     * 设置合同信息
     *
     * @param mainData
     */
    $.houseContract.setInfo = function (mainData) {
        $("#contractTG, #contractZL").empty();

        var tgCount = 0;
        $.each(mainData, function (index, data) {
            if (data.contractObject_Type == "托管合同") {
                tgCount++;
            }
            var box = $(data.contractObject_Type == "托管合同" ? "#contractTG" : "#contractZL");
            var optionState = returnContractOptionState(data.contractObject_OptionState);
            var isEdit = (data.contractObject_OptionState == 101 || data.contractObject_OptionState == 103 || data.contractObject_OptionState == 105);
            var edit = {
                style: isEdit ? "hint-bg" : "disabled-bg",
                option: isEdit ? "" : "disabled",
            };

            var html = '';
            html += '<div class="contract-item">';
            html += '   <div class="contract-item-header" name="contractView">';
            html += '   	<div style="font-weight: bold;width: 88px;">' + returnValue(data.contractObject_No) + '</div>';
            html += '   	<div class="' + optionState.color + '">' + optionState.title + '</div>';
            html += '   </div>';
//			html += '   <div class="contract-item-footer" style="display: none;margin-bottom: 10px;">';
//			html += '   	<button class="next-bg" name="contractView">查看</button>';
//			html += '   	<button class="'+ edit.style +'" name="contractEdit" '+ edit.option +'>编辑</div>';
//			html += '   </div>';
            html += '</div>';
            $(html).appendTo(box).data("data", data);
            box.find(".contract-loading").remove();
        });

        if (tgCount == 0) $("[name=contractAdd][value=tg]").removeAttr("disabled");

        $.ajax({
            url: "/appPage/houseContractInfo",
            data: {
                hi_code: getQueryString("hi_code")
            },
            dataType: "json"
        }).done(function (result) {
            if (result.code != 200) {
                return;
            }
            houseData = result.data;

            if (houseData.contract_intoStatus == '未签合同') {
                $("[name=contractAdd][value=tg]").removeAttr("disabled");
            }
            if (houseData.contract_intoStatus == '已签合同') {
                if (houseData.contract_outStatus == "未签合同") {
                    $("[name=contractAdd][value=zl]").removeAttr("disabled");
                }
            }
        });
    };

    $.houseContract.load_event = function () {

        // 显示更多操作
//		$("#main").on("click", ".contract-item-header", function(){
//			var next = $(this).next(".contract-item-footer");
//			if(next.is(":hidden")){
//				$(".contract-item-footer").hide();
//				next.show();
//			} else {
//				next.hide();
//			}
//		});

        // 添加合同
        $("#main").on("click", "[name=contractAdd]", function () {
            // 判断产权地址
            if (isEmpty($.houseContract.param.he_address)) {
                return $.hint.tip("请在[房源修改]完善产权地址后再签订托管合同", "error");
            }
            OCHouse.contractAdd($(this).val(), getUrlParam("hi_code"));
        });

        // 查看合同
        $("#main").on("click", "[name=contractView]", function () {
            var data = $(this).parents(".contract-item").data("data");
            OCHouse.contractInfo(data.contractObject_Code);
        });

        // 编辑合同
        $("#main").on("click", "[name=contractEdit]", function () {
            var data = $(this).parents(".contract-item").data("data");
            switch (data.contractObject_Type) {
                case "托管合同":
                    OCHouse.contractEdit("tg", data.contractObject_Code);
                    break;
                case "租赁合同":
                    OCHouse.contractEdit("zl", data.contractObject_Code);
                    break;
            }
        });
    };

})(jQuery);