;(function ($) {
    /** 搜索*/
    $.search = function () {
        // 缓存时间
        var cache_time = null;
        // 定时时间
        var setOutTime = 600;
        // 定时器
        var outTime = null;
        // 缓存文本
        var cache_text = "";

        // 事件-搜索框
        $("[name=search-content]").on({
            "input propertychange": function () {
                var _this = $(this);
                var _close = $(this).next(".input-close");

                var currentTime = new Date().getTime();
                if (cache_time == null) {
                    cache_time = currentTime;
                }

                if ($(this).val().length > 0) {
                    var boo = true;
                    if (currentTime - cache_time < setOutTime) {
                        boo = false;
                        // 还在输入时，移除定时器
                        clearTimeout(outTime);
                    }
                    cache_time = currentTime;
                    // 执行定时器
                    outTime = setTimeout(function () {
                        $.search.load_data();
                    }, setOutTime);
                    if (boo) {
                        // 可查询时，移除定时器
                        clearTimeout(outTime);
                        // 加载数据
                        $.search.load_data();
                    }
                    // 显示文本清空图标时，并绑定事件
                    if (_close.is(":hidden")) {
                        _close.fadeIn().on("click", function () {
                            _this.val("").focus();
                            $(this).hide().off("click");
                            $.search.remove_search_data();
                            // 加载数据
                            $.search.load_data();
                        });
                    }
                } else {
                    // 搜索框为空时，移除定时器
                    clearTimeout(outTime);
                    _close.fadeOut().off("click");
                    $.search.remove_search_data();
                    // 加载数据
                    $.search.load_data();
                }
            },
        }).focus();

        // 选中
        $("#search-data").on("click", ".customer-item", function () {
            var _data = $(this).data("data");
            if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                window.webkit.messageHandlers.goBackWhere.postMessage([JSON.stringify(_data)]);
            } else if (/(Android)/i.test(navigator.userAgent)) {
                webview.goBackWhere(JSON.stringify(_data));
            }
        });

        $.search.load_data();
    };

    /** 搜索-变量*/
    $.search.param = {
        pageNo: 1,
        pageSize: 10,
    };

    /**搜索-加载数据*/
    $.search.load_data = function (mode) {
        var param = $("[name=search-content]").val();
        $.ajax({
            type: "POST",
            //url : "/service/queryHouseInfo",
            //url: "/service/queryHouseCustomerInfo",
            url: "/service/queryAllContractHouse",
            data: {
                /*pageNo : $.search.param.pageNo,
                 pageSize : $.search.param.pageSize,
                 param : param,
                 typeF : getUrlParam("typeF")*/
                where: param,
                pageNo:0
            },
            dataType: "json",
            beforeSend: function () {
                if (mode != "update") {
                    $("#search-data").html('<div style="text-align: center;line-height: 40px;font-size:14px;">搜索中...</div>');
                }
            }
        }).done(function (result) {
            if (result.code != 200) {
                $("#search-data").html('<div style="text-align: center;line-height: 40px;font-size:14px;">无数据...</div>');
                return;
            }
            if (mode != "update") {
                $("#search-data").empty();
            }
            $.each(result.data.list, function (index, data) {
                var html = '';
                html += '<div class="content-item customer-item">';
                html += '	<div class="item-content">';
                html += '		<div class="item-content-main" style="padding: 0;">';
                html += '			<div><strong>' + returnValue(data.house_address) + '</strong><strong style="display: none">' + returnValue(data.propertyInfo_coordinate) + '</strong><span style="float:right">' +
                   // '' + returnValue(data.cc_name) + " - " + returnValue(data.ccp_phone) + '' +
                    '</span></div>';
                /*html += '			<div style="font-size: 12px; ">'+ (returnNumber(data.hi_houseS) + "室" + returnNumber(data.hi_houseT) + "厅" + returnNumber(data.hi_houseW) + "卫") +'</div>';*/
                html += '		</div>';
                html += '	</div>';
                html += '</div>';
                data.type="serviceHouse";
                $("#search-data").append(html).find(".customer-item:last").data("data", data);
                //$("#data-list").append(html).find(".customer-item:last").data("data", data);
            });
        });
    };

    /** 清除结果*/
    $.search.remove_search_data = function () {
        $("#search-data").empty();
    };

    /** 重新加载数据*/
    $.search.reloadData = function () {
        $.search.load_data();
    };

    $(function () {
        $.search();
    });

})(jQuery);



