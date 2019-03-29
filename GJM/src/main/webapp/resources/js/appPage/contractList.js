;(function ($) {

    /** 合同列表*/
    $.contractList = function () {
        // 初始化
        mui.init({
            pullRefresh: {
                container: '#refreshContainer',
                down: {
                    height: 50,//可选,默认50.触发下拉刷新拖动距离,
                    auto: true,//可选,默认false.自动下拉刷新一次
                    callback: function () {
                        $.contractList.param.pageNo = 1;
                        $.contractList.load_data();
                    }
                },
                up: {
                    contentrefresh: '正在加载...',
                    contentnomore: '没有更多数据了',
                    callback: function () {
                        $.contractList.param.pageNo++;
                        $.contractList.load_data("update");
                    }
                }
            }
        });
        // 查看
        mui("#refreshContainer").on('tap', '.content-item', function () {
            var con_code = this.getAttribute('data-code');
            console.log(con_code);
            if (typeof OCContract != "undefined") {
                $("[name=search-content]").blur();
                OCContract.contractInfo(con_code);
            }
        });
        // 编辑
        mui("#refreshContainer").on('tap', '[name=contract-edit]', function (e) {
            var con_code = this.getAttribute('data-code');
            var con_type = this.getAttribute('data-type');
            if (this.getAttribute('data-mode') == "edit") {
                e.stopPropagation();
                console.log(con_code + "," + con_type);
                if (typeof OCContract != "undefined") {
                    OCContract.contractEdit(con_code, con_type);
                }
            }
        });
        $.contractList.search();
        $.contractList.query();
    };

    /** 合同列表-变量*/
    $.contractList.param = {
        pageNo: 1,
        pageSize: 10,
    };

    /** 合同列表-搜索==*/
    $.contractList.search = function () {
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
                        $.contractList.load_data();
                    }, setOutTime);
                    if (boo) {
                        // 可查询时，移除定时器
                        clearTimeout(outTime);
                        // 加载数据
                        $.contractList.load_data();
                    }
                    // 显示文本清空图标时，并绑定事件
                    if (_close.is(":hidden")) {
                        _close.fadeIn().on("click", function () {
                            _this.val("");
                            $(this).hide().off("click");
                            // 加载数据
                            $.contractList.load_data();
                        });
                    }
                } else {
                    // 搜索框为空时，移除定时器
                    clearTimeout(outTime);
                    _close.fadeOut().off("click");
                    $("#search-data").empty();
                    // 加载数据
                    $.contractList.load_data();
                }
            },
        });

        // 选中item
//		$("#search-data").on("click", ".customer-item", function(){
//			var data = $(this).data("data");
//			var con_code = data.contractObject_Code;
//			var con_type = data.contractObject_Type == "托管合同" ? "tg" : "zl";
//			OCContract.selectedContract(con_code, con_type);
//		});
    };

    /** 合同列表-筛选==*/
    $.contractList.query = function () {
        $.contractList.query_load_event();
    };

    /** 筛选-改变筛选*/
    $.contractList.query_changeFilter = function (obj, type) {
        var box = $("#filter-box");
        var content = box.find(".item-mask-main");

        if ($(obj).attr("data-checked") == "true") {
            $.contractList.query_closeFilterBox();
            return;
        }

        $(".filter-angle").removeAttr("data-checked");
        $(".filter-angle>.text").removeClass("angle-up ok").addClass("angle-down");
        switch (type) {
            case "department" :
                if ($.contractList.param.data == null) {
                    $.ajax({
                        type: "POST",
                        url: "/appPage/housekeeperDepartment",
                        dataType: "json",
                        beforeSend: function () {
                            content.html('<div class="mask-main-item">加载中...</div>');
                        }
                    }).done(function (result) {
                        if (result.code != 200) {
                            return;
                        }
                        $.contractList.param.data = result.data;
                        // 加载部门数据
                        $.contractList.query_load_departmentData(obj);
                    });
                } else {
                    // 加载部门数据
                    $.contractList.query_load_departmentData(obj);
                }
                break;
            case "type" :
                var html = '';
                html += '<div class="mask-main-item" data-value="-1">全部</div>';
                html += '<div class="mask-main-item" data-value="托管合同">托管合同</div>';
                html += '<div class="mask-main-item" data-value="租赁合同">租赁合同</div>';
                content.html(html);
                content.find(".mask-main-item[data-value=" + $(obj).val() + "]").addClass("ok");
                break;
            case "state" :
                var html = '';
                html += '<div class="mask-main-item" data-value="-1">全部</div>';
                html += '<div class="mask-main-item" data-value="101">编辑中</div>';
                html += '<div class="mask-main-item" data-value="102">待审核</div>';
                html += '<div class="mask-main-item" data-value="103">审核未通过</div>';
                html += '<div class="mask-main-item" data-value="1021">待结算</div>';
                html += '<div class="mask-main-item" data-value="104">待复核</div>';
                html += '<div class="mask-main-item" data-value="105">复核未通过</div>';
                html += '<div class="mask-main-item" data-value="106">已复核</div>';
                html += '<div class="mask-main-item" data-value="107">已作废</div>';
                html += '<div class="mask-main-item" data-value="201">已续约</div>';
                html += '<div class="mask-main-item" data-value="202">已改签</div>';
                html += '<div class="mask-main-item" data-value="300">到期</div>';
                html += '<div class="mask-main-item" data-value="301">到期申请</div>';
                html += '<div class="mask-main-item" data-value="302">到期处理中</div>';
                html += '<div class="mask-main-item" data-value="303">到期处理完成</div>';
                html += '<div class="mask-main-item" data-value="401">解约申请</div>';
                html += '<div class="mask-main-item" data-value="402">解约中</div>';
                html += '<div class="mask-main-item" data-value="403">解约完成</div>';
                html += '<div class="mask-main-item" data-value="501">转租申请</div>';
                html += '<div class="mask-main-item" data-value="502">转租中</div>';
                html += '<div class="mask-main-item" data-value="503">转租完成</div>';
                html += '<div class="mask-main-item" data-value="601">强退申请</div>';
                html += '<div class="mask-main-item" data-value="602">强退中</div>';
                html += '<div class="mask-main-item" data-value="603">强退完成</div>';
                html += '<div class="mask-main-item" data-value="701">强收申请</div>';
                html += '<div class="mask-main-item" data-value="702">强收中</div>';
                html += '<div class="mask-main-item" data-value="703">强收完成</div>';
                html += '<div class="mask-main-item" data-value="801">代偿申请</div>';
                html += '<div class="mask-main-item" data-value="802">代偿中</div>';
                html += '<div class="mask-main-item" data-value="803">代偿完成</div>';
                html += '<div class="mask-main-item" data-value="901">换房申请</div>';
                html += '<div class="mask-main-item" data-value="902">换房中</div>';
                html += '<div class="mask-main-item" data-value="903">换房成功</div>';
                content.html(html);
                content.find(".mask-main-item[data-value=" + $(obj).val() + "]").addClass("ok");
                break;
        }
        ;
        box.show();
        $(obj).attr("data-checked", "true");
        $(obj).find(".text").removeClass("angle-down").addClass("angle-up ok");
    };

    /** 筛选-绑定事件*/
    $.contractList.query_load_event = function () {
        $("#filter-box").on("click", function () {
            $.contractList.query_closeFilterBox();
        });
        $("#filter-box").on("click", ".mask-main-item", function () {
            var target = $(".filter-angle[data-checked=true]");
            target.val($(this).attr("data-value"));
            if (returnNumber($(this).attr("data-value")) == -1) {
                target.find(".text").html(target.find(".text").attr("data-text"));
            } else {
                target.find(".text").html($(this).text());
            }
            $.contractList.load_where_data();
        });
    };

    /** 筛选-关闭筛选Box*/
    $.contractList.query_closeFilterBox = function () {
        $("#filter-box").hide();
        $(".filter-angle").removeAttr("data-checked");
        $(".filter-angle>.text").removeClass("angle-up ok").addClass("angle-down");
    };

    /** 筛选-加载部门数据*/
    $.contractList.query_load_departmentData = function (obj) {
        var box = $("#filter-box");
        var content = box.find(".item-mask-main");

        var html = '';
        html += '<div class="mask-main-item" data-value="-1">所有部门</div>';
        $.each($.contractList.param.data, function (index, data) {
            html += '<div class="mask-main-item" data-value="' + data.ucc_id + '">' + returnValue(data.ucc_name) + '</div>';
        });
        content.html(html);
        if (obj) {
            content.find(".mask-main-item[data-value=" + $(obj).val() + "]").addClass("ok");
            content.scrollTop(content.find(".mask-main-item[data-value=" + $(obj).val() + "]").position().top);
        }
    };

    /** 加载数据*/
    $.contractList.load_where_data = function (mode) {
        $.contractList.param.pageNo = 1;
        mui('#refreshContainer').pullRefresh().enablePullupToRefresh();
        $.contractList.load_data(mode);
    };

    /** 加载部门*/
    $.contractList.load_currentDepartment = function (ucc_id, em_id) {
        $.ajax({
            type: "POST",
            url: "/appPage/housekeeperDepartment",
            data: {
                ucc_id: ucc_id,
                em_id: em_id
            },
            dataType: "json",
        }).done(function (result) {
            if (result.code != 200) {
                return;
            }
            var data = (result.data || "")[0];
            $("[name=ucc_id]").find(".text").html(returnValue(data.ucc_name));
        });
    };

    /** 加载数据*/
    $.contractList.load_data = function (way) {
        var param = $("[name=search-content]").val();
        $("[name=ucc_id]").attr("disabled", "disabled");

        var em_id = "";
        var ucc_id = "";
        var mode = getUrlParam("mode");
        switch (mode) {
            case "self":
                em_id = getUrlParam("id");
                $.contractList.load_currentDepartment(null, em_id);
                break;
            case "department":
                ucc_id = getUrlParam("id");
                $.contractList.load_currentDepartment(ucc_id);
                break;
            case "expire":
                ucc_id = getUrlParam("id");
                $.contractList.load_currentDepartment(ucc_id);
                break;
            case "all":
                $("[name=ucc_id]").removeAttr("disabled");
                ucc_id = returnNumber($("[name=ucc_id]").val()) == -1 ? "" : $("[name=ucc_id]").val();
                break;
        }
        var contractObject_Type = returnNumber($("[name=type]").val()) == -1 ? "" : $("[name=type]").val();
        var contractObject_OptionState = returnNumber($("[name=state]").val()) == -1 ? "" : $("[name=state]").val();

        $.ajax({
            type: "POST",
            url: "/appPage/queryContractList",
            data: {
                pageNo: $.contractList.param.pageNo,
                pageSize: $.contractList.param.pageSize,
                queryWhere: [
                    {key: "house_address", value: param},
                    {key: "contractObject_No", value: param},
                    {key: "contractObject_Type", value: contractObject_Type, operator: "filter"},
                    {key: "contractObject_OptionState", value: contractObject_OptionState, operator: "filter"},
                    {key: "ucc_id", value: ucc_id, operator: "filter"},
                    {key: "em_id", value: em_id, operator: "filter"},
                ],
            },
            dataType: "json",
        }).done(function (result) {
            if (result.code != 200) {
                return;
            }
            if (way != "update") {
                $("#search-data").empty();
            }
            $.each(result.data.list, function (index, data) {
                var state = returnContractOptionState(data.contractObject_OptionState);
                var con_type = data.contractObject_Type == "托管合同" ? "tg" : "zl";
                var con_optionState = data.contractObject_OptionState;
                var optionState = {};
                if (con_optionState == 101 || con_optionState == 103 || con_optionState == 105) {
                    optionState.text = "编辑";
                    optionState.style = "next";
                    optionState.mode = "edit";
                } else {
                    optionState.text = "查看";
                optionState.style = "ok";
                optionState.mode = "query";
            }

                var extState = returnContractExtendState(data.contractObject_ExtState);
                var html = '';
                html += '<li class="content-item" data-code="' + data.contractObject_Code + '">';
                html += '	<div class="item-content customer-item">';
                html += '		<div class="item-content-main" style="padding: 0;">';
                html += '			<div style="line-height:28px;"><strong class="next">' + returnValue(data.contractObject_No) + '</strong><span class="' + state.color + '" style="float:right;">' + state.title + '</span><span class="' + extState.style + '" style="float:right;">' + extState.text + ' <span style="color: #000;">-</span>&nbsp;</span></div>';
                html += '			<div><span style="font-size: 12px;">' + returnValue(data.contractObject_Type) + '</span><span style="float: right;font-size: 12px;">' + returnValue(data.contractObject_Source) + '</span></div>';
                html += '			<div><span style="color: #9c9c9c;font-size: 12px;">' + returnValue(data.house_address) + '</span><span style="float: right;color: #9c9c9c;font-size: 12px;">' + returnValue(data.ucc_name) + '&nbsp;-&nbsp;' + returnValue(data.em_name) + '</span></div>';
                html += '		</div>';
//				html += '		<button class="item-content-option '+ optionState.style +'" data-code="'+ data.contractObject_Code +'" data-type="'+ con_type +'" data-mode="'+ optionState.mode +'" name="contract-edit" style="width:auto;padding-left: 10px;padding-right: 0px;border-left: 1px solid #f5f5f5;margin-left: 10px;">'+ optionState.text +'</button>';
                html += '	</div>';
                html += '	<button class="list-item"></button>';
                html += '</li>';
                $("#search-data").append(html).find(".customer-item:last").data("data", data);
                $("img").lazyload();
            });
            if (way != "update") {
                mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                mui('#refreshContainer').pullRefresh().scrollTo(0, 0, 500);
            }
            if (result.data.list.length >= 10) {
                mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
            } else {
                mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
            }
        });
    };

    $(function () {
        $.contractList();
    });

})(jQuery);
