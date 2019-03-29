/**
 * 预算管理分页插件
 * @author 唐雷
 * @createTime 2016.12.23
 **/
;(function ($) {

    /**
     * 初始化
     * @param opts
     */
    $.table = function (opts) {
        var _popup = $.table.defaults.popup;
        var _ajaxParams = $.table.defaults.ajaxParams;

        opts = $.extend($.table.defaults, opts);
        opts.popup = $.extend(_popup, opts.popup);
        opts.ajaxParams = $.extend(_ajaxParams, opts.ajaxParams);

        $.table.defaults = opts;

        /** 变量*/
            // var list_item_length = 0;
        var filter_date_init = '';

        var html = '';
        if (opts.tableThead.length >0) {
        html += '<div class="page-box">';
        html += '   <!-- 菜单 -->';
        html += '   <div class="list-menu" style="display: ' + (opts.filterWhereDisplay ? 'block' : 'none') + ';">';
        // 筛选内容
        if (opts.filterWhere) {
            html += '		<div class="screen-where">';//  screen-where-absolute
            html += '			<div class="screen-where-head">';
            html += '				<button class="where-head-btn next-bg" name="filter-add"><i class="fa-plus"></i>添加</button>';
            html += '				<button class="where-head-btn ok-bg" name="filter-search"><i class="fa-search"></i>搜索</button>';
            html += '				<button class="where-head-btn error-bg" name="filter-clean-all"><i class="fa-remove"></i>清除</button>';
            html += '			</div>';
            html += '			<div class="screen-where-main"></div>';
            html += '		</div>';
        }
        html += '   </div>';
        html += '   <!-- 列表 -->';
        html += '   <div class="list-table" data-type="table">';
        html += '	    <!-- 操作 -->';

        html += '	    <div class="list-table-head">';
        html += '		    <ul class="filter-ul">';
        // 条件筛选
        if (opts.filterWhere) {
            html += '<li>';
            html += '	<button class="toolbar" name="screen-btn" style="border: 1px solid #ddd;background: #fff;border-radius: 0 20px 20px 0;margin-left: -11px;border-left: 0;padding: 0 18px;">';
            html += '       <i class="fa-search ok" style="margin-right: 0"></i>';
            html += '       <span class="toolbar-subscript"></span>';
            html += '   </button>';
            html += '</li>';
        }
        // 时间筛选
       if (opts.filterDate) {
            html += '		<li class="screen ok-border-color">';
            html += '			<select class="searchBar" name="screen-date-data" style="border-radius: 3px 0 0 3px;border-right: 0 !important;">';
            $.each(opts.filterDateParams, function (index, data) {
                filter_date_init = index === 0 ? data.init : filter_date_init;
                html += '			<option value="' + data.value + '" data-init="' + data.init + '" data-sort="' + data.sort + '">' + data.name + '</option>';
            });
            html += '			</select>';
            html += '			<select class="searchBar ok-bg" name="screen-date-change" style="border-radius: 0 3px 3px 0;border-color: #1abc9c;">';
            html += '				<option value="7">7天</option>';
            html += '				<option value="30">30天</option>';
            html += '				<option value="all">全部</option>';
            html += '				<option value="custom">自定义</option>';
            html += '			</select>';
            html += '			<label class="searchBar custom-box" style="padding: 0;border-radius: 0 3px 3px 0;border-left: 0;display:' + (filter_date_init === 'custom' ? 'block' : 'none') + ';">';
            html += '				<input class="searchBar" name="custom-start-date" placeholder="起始日期" readonly>';
            html += '				<span class="searchBar">|</span>';
            html += '				<input class="searchBar" name="custom-end-date" value="' + returnDate(new Date()) + '" placeholder="截止日期" readonly>';
            html += '			</label>';
            html += '		</li>';
        }
        html += '</ul>';
        //列表筛选
        html += '   <div class="list-table-main">';
        html += '       <div class="table-money">';
        html += '       <table>';
        html += '           <tbody>';
        html += '           <tr>';
        html += '               <td class="td-title"></td>';
        $.each(opts.tableThead, function (index, data) {
                html += '			<td class="td-title" colspan="3">' + data.text + '</td>';
        });
        html += '               <td class="td-title">合计</td>';
        html += '           </tr>';
        html += '           <tr>';
        html += '               <td class="td-title"></td>';
        $.each(opts.tableTheadtr, function (index, data) {
        html += '				<td class="td-title">' + data.text + '</td>';
        });
        html += '               <td class="td-title"></td>';
        html += '           </tr>';
        html += '           </tbody>';
        html += '           <tbody class="table-budget"></tbody>';
        html += '       </table>';
        html += '       </div>';
        html += '   </div>';
        html += '	</div>';

        html += '	<!-- 更多 -->';
        html += '	<div class="list-table-custom"></div>';
        html += '	<!-- 列表 -->';
        html += '	<div class="list-table-content">';
        html += '		<div class="custom-table-head" style="display: none;">';
        html += '		    <div style="width: 40px;min-width: 40px;text-align: center;">' + (opts.listMultiple ? '<label class="table-checkbox-box"><input type="checkbox" name="table-checkbox" data-type="all"></label>' : '#') + '</div>';
        html += '			<div style="width: 44px;min-width: 44px;text-align: center;">序号</div>';
        $.each(opts.listParams, function (index, data) {
            html += '		<div>' + data.text + '</div>';
        });
        if (opts.column) {// 多栏操作
            html += '		<div style="text-align: center;">操作</div>';
        }
        html += '		</div>';
        html += '		<div class="custom-table-body custom-scroll" style="display: none;">';
        html += '		    <table>';
        html += '		        <thead>';
        html += '		    	    <tr>';
        html += '		    		    <td style="width: 40px;min-width: 40px;text-align: center;">' + (opts.listMultiple ? '<label class="table-checkbox-box"><input type="checkbox" name="table-checkbox" data-type="all"></label>' : '#') + '</td>';
        html += '		    		    <td style="width: 44px;min-width: 44px;text-align: center;">序号</td>';
        $.each(opts.listParams, function (index, data) {
            html += '				    <td>' + data.text + '</td>';
        });
        if (opts.column) {// 多栏操作
            html += '				    <td style="text-align: center;">操作</td>';
        }
        html += '   		    	    </tr>';
        html += '   		        </thead>';
        html += '   		        <tbody id="table_tbody_list"></tbody>';
        html += '   		    </table>';
        html += '   		</div>';
        html += '   	</div>';
        html += '   	<!-- 状态 -->';
        html += '   	<div class="list-table-foot" style="display: none;">';
        html += '   		<div class="foot-page-info">第&nbsp;<span id="pageNo">1</span>/<span id="totalPage"></span>&nbsp;页，共<span id="totalRecords"></span>条记录</div>';
        html += '   		<div class="foot-page-option"></div>';
        html += '   	</div>';
        html += '   </div>';
        html += '</div>';
        }
        var target = (opts.targetId !== null && opts.targetId !== '' ? $(opts.targetId) : $(document.body));
        var tableBox = $(html).appendTo(target);
        var filter_ul = tableBox.find(".filter-ul");

        // 自定义操作栏
        $.each(opts.filterBars, function (index, data) {
            var html = '';
            switch (data.type) {
                case 'select':
                    html += '<li>';
                    html += '	<select class="searchBar" name="' + data.name + '">';
                    try {
                        $.each(eval('(' + data.data + ')')().list, function (key, value) {
                            html += '	<option value="' + key + '" ' + (data.selected === key ? 'selected' : '') + '>' + value + '</option>';
                        });
                    } catch (err) {
                        $.each(data.data, function (key, value) {
                            html += '	<option value="' + key + '" ' + (data.selected === key ? 'selected' : '') + '>' + value + '</option>';
                        });
                    }
                    html += '	</select>';
                    html += '</li>';
                    filter_ul.append(html);
                    break;
                case 'select1':
                    if ($("[name=screen-custom-data]").length == 0) {
                        html += '<li class="screen ok-border-color">';
                        html += '	<select class="searchBar" name="screen-custom-data" style="border-radius: 3px 0 0 3px;border-right: 0 !important;"></select>';
                        html += '	<select class="searchBar ok-bg" name="screen-custom-change" style="border-radius: 0 3px 3px 0;border-color: #1abc9c;"></select>';
                        html += '	<label class="searchBar custom-box ok-border-color" style="padding: 0;border-radius: 0 3px 3px 0;border-left: 0;display:none;">';
                        html += '		<input class="searchBar" name="custom-value" style="width: 80px;">';
                        html += '		<button class="ok-bg" name="custom-search" style="width:36px;cursor: pointer;"><i class="fa-search"></i></button>';
                        html += '	</label>';
                        html += '</li>';
                        filter_ul.append(html);
                    }
                    $.screen_custom_select1("add", data);
                    break;
            }
        });

        // 初始化日期类型选择
        tableBox.find("[name=screen-date-change]").val(filter_date_init);

        // 赋值变量 多栏操作
        // list_item_length = 2 + opts.listParams.length + (opts.column ? 1 : 0);

        // 加载数据
        $.table.loadData(opts);

        // 加载权限
        $.table.loadPower(opts);

        // 加载事件
        $.table.loadEvent(opts);

        //
        $.table.resize();

        return tableBox;
    };

    /**
     * 默认参数
     * @type {{id: string, targetId: string, filterDate: boolean, filterDateParams: Array, filterWhere: boolean, filterWhereDisplay: boolean, filterBars: Array, listParams: Array, listMultiple: boolean, listCheckForItem: boolean, column: boolean, columnResult: $.table.defaults.columnResult, ajaxParams: {type: string, url: string, data: {}, dataType: string, contentType: string, beforeSend: $.table.defaults.ajaxParams.beforeSend}, ajaxDone: $.table.defaults.ajaxDone, ajaxFail: $.table.defaults.ajaxFail, popup: {width: number, buttons: [string], result: $.table.defaults.popup.result, close: $.table.defaults.popup.close}}}
     */
    $.table.defaults = {
        tableThead : "",
        tableTheadtr: "",
        id: "",
        targetId: "",
        filterDate: true,				// 筛选-时间条件
        filterDateParams: [],			// 筛选-时间条件参数{name:"",value:""}
        filterWhere: true,			    // 筛选-筛选按钮
        filterWhereDisplay: false,		// 筛选-筛选框
        filterBars: [],					// 自定义筛选元素{name:"",type:"select|input|button",selected:"data.key",data:{key:value}}
        listParams: [],				    // 列表元素{name:"",type:"select|input|button",selected:"data.key",data:{key:value}}
        listMultiple: false, 			// 列表多选开启 true|false
        listCheckForItem: true,			// 列表项目选中多选框
        column: false,					// 多栏操作 true|false
        columnResult: function () {
        },	                            // 多栏操作自定义内容 html
        ajaxParams: {                   // ajax请求参数
            type: 'POST',
            url: '',
            data: {},
            dataType: 'json',
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            beforeSend: function () {
            }
        },
        ajaxDone: function () {
        },		                        // ajax请求完成
        ajaxFail: function () {
        },		                        // ajax请求失败
        popup: {
            width: "75%",
            buttons: [""],
            result: function () {
            },
            close: function () {
            }
        }                                       // 弹出层
    };

    /**
     * 加载数据
     */
    $.table.loadData = function () {
        var opts = $.table.defaults;
        // 参数
        var pageNo = returnNumber($.table.getBox().find("#pageNo").text());
        var pageSize = $.cookie("pageSize");
        if (isEmpty(pageSize)) {
            $.cookie("pageSize", 16, {expires: 7, path: "/"});
            pageSize = $.cookie("pageSize");
        }
        var data = {
            pageNo: pageNo,
            pageSize: pageSize,
            queryWhere: [],
            querySort: []
        };
        // 筛选日期
        if (opts.filterDate) {
            var dateObj = $.table.getBox().find("[name=screen-date-data]");
            var dateMode = $.table.getBox().find("[name=screen-date-change]");
            data.queryWhere.push({
                key: dateObj.val(),
                mode: dateMode.val(),
                startDate: $.table.getBox().find("[name=custom-start-date]:visible").val(),
                endDate: $.table.getBox().find("[name=custom-end-date]:visible").val()
            });
            data.querySort.push({
                key: dateObj.val(),
                sort: dateObj.find("option:selected").attr("data-sort")
            });
        }
        // 筛选条件
        if (opts.filterWhere) {
            var valid_where = 0;
            $.table.getBox().find(".screen-where-item").each(function () {
                if ($(this).find("[name=where-checkbox]").is(":checked")) {
                    var where_content = $(this).find("[name=where-content]");
                    var name = where_content.attr("data-name");
                    var where_data = {};

                    // 若有组合值：name1{-}name2，需判断
                    if (typeof name === 'string' && name.indexOf("{") > -1 && name.indexOf("}") > -1) {
                        where_data.key = name.substring(0, name.indexOf("{"));
                        where_data.value = where_content.val().trim();
                        if (!isEmpty(where_data.value)) {
                            valid_where++;
                        }
                        data.queryWhere.push(where_data);

                        where_data = {};
                        where_data.key = name.substring(name.indexOf("}") + 1, name.length);
                        where_data.value = where_content.val().trim();
                        if (!isEmpty(where_data.value)) {
                            valid_where++;
                        }
                        data.queryWhere.push(where_data);
                    } else {
                        where_data.key = name;
                        where_data.value = where_content.val().trim();
                        if (where_content[0].tagName === "SELECT") {
                            where_data.operator = "filter";
                            if (where_data.value == "0") {
                                return;
                            }
                        }
                        if (!isEmpty(where_data.value)) {
                            valid_where++;
                        }
                        data.queryWhere.push(where_data);
                    }
                }
            });

            // 如果有效条件数大于0，则记录筛选角标
            if (valid_where > 0) {
                $.table.getBox().find(".toolbar-subscript").html(valid_where);
            } else {
                $.table.getBox().find(".toolbar-subscript").empty();
            }
        }
        // 自定义筛选
        if (opts.filterBars.length > 0) {
            $.each(opts.filterBars, function (index, item) {
                var bar = $.table.getBox().find("[name=" + item.name + "]");
                var bar_val = bar.val();
                if (isEmpty(bar_val)) return;
                if (bar_val === "0") return;
                data.queryWhere.push({
                    key: bar.attr("name"),
                    value: bar_val.trim(),
                    operator: "filter"
                });
            });
        }

        // 自定义筛选1
        var custom_data = $("[name=screen-custom-data]");
        if (custom_data.length > 0) {
            var custom_change = $("[name=screen-custom-change]");
            var custom_value = $("[name=custom-value]");
            data.queryWhere.push({
                key: custom_data.val(),
                value: (custom_change.val() != "custom" ? custom_change.val() : custom_value.val()).trim(),
                operator: "filter"
            });
        }

        opts.ajaxParams.data = $.extend({}, opts.ajaxParams.data, data);

        // 请求数据
        $.ajax({
            type: opts.ajaxParams.type,
            url: opts.ajaxParams.url,
            data: opts.ajaxParams.data,
            dataType: opts.ajaxParams.dataType,
            contentType: opts.ajaxParams.contentType,
            beforeSend: opts.ajaxParams.beforeSend
        }).done(function (result) {
            if (result.code !== 200) return;

            var list = result.data.list;
            var _box = $.table.getBox().find(".list-table-content");

            // body
            _box.find("#table_tbody_list").empty();
            if (list == null || list.length === 0) {
                var empty_html =
                    '<tr style="background: #ffffff !important;">' +
                    '   <td class="table-data-empty" colspan="99"></td>' +
                    '</tr>';
                _box.find("#table_tbody_list").html(empty_html);
            }
            $.each(list, function (index, data) {
                var body_html = '';
                body_html += '<tr class="list-content-item ' + (index % 2 === 0 ? 'odd' : 'even') + '" data-index="' + index + '">';
                body_html += '	<td style="width: 40px;min-width: 40px;text-align: center;"><label class="table-checkbox-box"><input type="checkbox" name="table-checkbox"></label></td>';
                body_html += '	<td style="width: 40px;min-width: 44px;text-align: center;">' + (index + 1) + '</td>';
                // 遍历参数
                $.each(opts.listParams, function (index1, item) {
                    var state = {};
                    // 处理拼接参数
                    if (typeof item.name === "string" && item.name.indexOf("{") > -1 && item.name.indexOf("}") > -1) {
                        var to_boo = true;
                        var text = item.name;
                        var name1 = text.substring(0, text.indexOf("{"));
                        var name2 = text.substring(text.indexOf("}") + 1, text.length);

                        state.text = data[text.substring(0, text.indexOf("{"))];
                        state = $.table.init_param(item, state);
                        to_boo = !isEmpty(state.text);
                        var html1 = '<label class="' + returnValue(state.style) + '">' + returnValue(state.text) + '</label>';

                        state.text = data[text.substring(text.indexOf("}") + 1, text.length)];
                        state = $.table.init_param(item, state);
                        to_boo = !isEmpty(state.text);
                        var html2 = '<label class="' + returnValue(state.style) + '">' + returnValue(state.text) + '</label>';

                        var to = to_boo ? text.substring(text.indexOf("{") + 1, text.indexOf("}")) : "";

                        body_html += '<td name="' + name1 + "_" + name2 + '">' + html1 + to + html2 + '</td>';
                    } else {
                        state.text = data[item.name];
                        state = $.table.init_param(item, state);
                        /**
                         * 方法识别
                         * func : {
                         *      type : 'onclick',
                         *      name : 'functionName(param1, param2)'
                         * }
                         */
                        if (!isEmpty(item.func) && typeof item.func === "object") {
                            var state_function;
                            switch (item.func.type) {
                                case 'onclick':
                                    var _name = item.func.name;
                                    var _frist_name = _name.substring(0, _name.indexOf("("));
                                    var _param_name = _name.substring(_name.indexOf("(") + 1, _name.indexOf(")"));
                                    var _new_param = "";
                                    $.each(_param_name.split(","), function (index, subData) {
                                        _new_param += isEmpty(data[subData]) ? subData : "'" + data[subData] + "'";
                                    });
                                    item.func.name = _frist_name + '(' + _new_param + ')';
                                    state_function = ' onclick="' + item.func.name + '" style="cursor: pointer;"';
                                    break;
                            }
                            state.func = state_function;
                        }
                        body_html += '<td name="' + returnValue(item.name) + '" class="' + returnValue(state.style) + '" ' + (isEmpty(state.style2) ? "" : 'style="' + state.style2 + '"') + ' ' + (isEmpty(state.title) ? "" : 'title="' + state.title + '"') + ' ' + returnValue(state.func) + '>' + returnValue(state.text) + '</td>';
                    }
                });
                // 多栏操作
                if (opts.column) {
                    body_html += '<td style="width: 100px;">' + opts.columnResult(index, data) + '</td>';
                }
                body_html += '</tr>';

                // 控制域
                // 多栏操作
                if (opts.column) {
                    body_html += '<tr class="list-content-box" data-index="' + index + '" style="display:none;">';
                    body_html += '	<td colspan="' + (opts.listParams.length + 3) + '" style="padding:0;"></td>';
                    body_html += '</tr>';
                }
                _box.find("#table_tbody_list").append(body_html).find('.list-content-item[data-index=' + index + ']').find("[name=table-checkbox]").data("data", data);
            });

            // 分页
            $.table.getBox().find("#totalPage").text(result.data.totalPage);
            $.table.getBox().find("#totalRecords").text(result.data.totalRecords);
            $.table.loadPage(result.data);
            //
            $.popupBoxClose();
            // 返回数据
            opts.ajaxDone($.table.getBox());
            //
            $.table.resize();
        }).fail(opts.ajaxFail);
    };

    /**
     * 初始化参数
     * @param item
     * @param state
     * @returns {*}
     */
    $.table.init_param = function (item, state) {
        // 数据格式化1
        if (!isEmpty(item.param) && typeof item.param === "string") {
            switch (item.param) {
                case "textarea":
                    state.text = state.text;
                    state.style = "td-textarea";
                    state.title = state.text;
                    break;
                case "string":
                    state.text = returnValue(state.text);
                    break;
                case "int":
                    state.text = returnNumber(state.text);
                    break;
                case "float":
                    state.text = returnFloat(state.text);
                    break;
                case "float_money":
                    state.text = returnFloat(state.text, 2, true);
                    break;
                case "money":
                    state.text = returnMoney(state.text, 2);
                    state.style2 = "text-align: right;";
                    break;
                case "date":
                case "yyyy-MM-dd":
                    state.text = isEmpty(state.text) ? "" : returnDate(state.text, "yyyy-MM-dd");
                    break;
                case "yyyy-MM-dd HH:mm:ss":
                case "time":
                    state.text = isEmpty(state.text) ? "" : returnDate(state.text, "yyyy-MM-dd HH:mm:ss");
                    break;
                case "returnBillState":
                    state = returnBillState(state.text);
                    break;
                case "returnOrderOptionState":
                    state = returnOrderOptionState(state.text);
                    break;
                case "returnOrderType":
                    state = returnOrderType(state.text);
                    break;
                case null:
                    state.text = returnValue(state.text);
                    break;
                case "":
                    state.text = returnValue(state.text);
                    break;
                case undefined:
                    state.text = returnValue(state.text);
                    break;
                default:
                    state = window[item.param](state.text);
                    break;
            }
            if (!isEmpty(state.list)) {
                item.filterList = state.list;
            }
        }

        // 数据格式化2
        if (!isEmpty(item.param) && typeof item.param === "object") {
            var _state = item.param[state.text];
            if (!isEmpty(_state) && typeof _state === "object") {
                state = _state;
            } else {
                state.text = returnValue(_state);
            }
        }

        /**
         * 数据格式化-地址
         * location : {
		 * 		pathname 		: '/index/index',       // 地址
		 * 		searchs 		: 'p1=name1&p2=name2',  // 参数：此name为参数
		 * 		hash 			: '#top',               // 定位
		 * 		currentTabName 	: '当前页面title',
		 * 		targetTabName 	: '目标地址title'
		 * }
         * */
        if (!isEmpty(item.location) && typeof item.location === "object") {
            var text = state.text;
            var pathname = item.location.pathname;
            var search = '?';
            if (!isEmpty(item.location.searchs) && typeof item.location.searchs === 'object') {
                $.each(item.location.searchs, function (key, value) {
                    search += key + '=' + data[value] + '&';
                });
            }
            search = search.substring(0, search.length - 1);

            var hash = isEmpty(item.location.hash) ? '' : item.location.hash;
            var currentTabName = isEmpty(item.location.currentTabName) ? $("title").val() : item.location.currentTabName;
            var targetTabName = isEmpty(item.location.targetTabName) ? '' : item.location.targetTabName;
            state.text = '<a href="javascript:window.parent.href_mo(\'' + pathname + search + hash + '\',\'' + targetTabName + '\',\'' + currentTabName + '\');">' + text + '</a>';
        }
        return state;
    };

    /**
     * 加载数据-条件
     */
    $.table.loadDataWhere = function () {
        $.table.getBox().find("#pageNo").text(1);
        $.table.loadData();
    };

    /**
     * 加载分页
     * @param data
     */
    $.table.loadPage = function (data) {
        var _box = $.table.getBox().find(".foot-page-option");
        var _pageNo = returnNumber($("#pageNo").text());
        var _totalPage = returnNumber($("#totalPage").text());
        var _limit = 10;
        _limit = _totalPage < _limit ? _totalPage : _limit;
        var _offset = returnNumber((_pageNo - 1) / _limit) * _limit + 1;
        _limit = _offset + _limit - 1;

        // 基础样式
        var html = '';
        html += '<button class="page-option page-prev fa-angle-left"></button>';
        for (var i = _offset; i <= _limit; i++) {
            html += '<button class="page-option page-num" value="' + i + '">' + i + '</button>';
        }
        html += '<button class="page-option page-next fa-angle-right"></button>';
        html += '<input type="type" class="page-input number" value="' + returnNumber(data.pageSize) + '">';
        html += '<button class="page-option page-set">设置</button>';
        _box.html(html);

        // 翻页样式
        if (_pageNo === _totalPage && _totalPage !== 1) {
            _box.find(".page-prev").removeAttr("disabled");
            _box.find(".page-next").attr("disabled", "disabled");
        } else if (_pageNo === 1 && _totalPage > 1) {
            _box.find(".page-prev").attr("disabled", "disabled");
            _box.find(".page-next").removeAttr("disabled");
        } else if (_pageNo === 1 && _totalPage <= 1) {
            _box.find(".page-prev").attr("disabled", "disabled");
            _box.find(".page-next").attr("disabled", "disabled");
        } else if (_pageNo !== 1 && _pageNo !== _totalPage) {
            _box.find(".page-prev").removeAttr("disabled");
            _box.find(".page-next").removeAttr("disabled");
        }

        // 页码样式
        _box.find(".page-num[value=" + _pageNo + "]").attr("disabled", "disabled");

        // 上一页
        _box.find(".page-prev").on("click", function () {
            $("#pageNo").text(_pageNo - 1);
            $.table.loadData();
        });
        // 下一页
        _box.find(".page-next").on("click", function () {
            $("#pageNo").text(_pageNo + 1);
            $.table.loadData();
        });
        // 点击页码
        _box.find(".page-num").on("click", function () {
            $("#pageNo").text($(this).val());
            $.table.loadData();
        });

        // 设置数值1
        _box.find(".page-set").on("click", function () {
            var _page_num = returnNumber(_box.find(".page-input").val());
            if (_page_num < 1 || _page_num > 100) {
                $.hint.tip("设值范围1~100");
                return;
            }
            $("#pageNo").text(1);
            $.cookie("pageSize", _page_num, {expires: 7});
            $.table.loadData();
        });
        // 设置数值2
        _box.find(".page-input").on("change", function () {
            var _page_num = returnNumber($(this).val());
            if (_page_num < 1 || _page_num > 100) {
                $.hint.tip("设值范围1~100");
                return;
            }
            $("#pageNo").text("1");
            $.cookie("pageSize", _page_num, {expires: 7});
            $.table.loadData();
        });
    };

    /**
     * 加载权限
     */
    $.table.loadPower = function () {
        $.ajax({
            type: "POST",
            url: "/user/userJurisdiction",
            data: {
                url: window.location.pathname + window.location.search,
                ucps_type: 2
            },
            dataType: "json"
        }).done(function (result) {
            if (result == null) return;
            if (result.menuLists.length < 1) return;
            $.each(result.menuLists, function (index, item) {
                var html = '';
                if (item.ucps_url.indexOf("(") > -1 && item.ucps_url.indexOf(")") > -1) {
                    html += '<li>';
                    html += '	<button class="toolbar" onclick="' + item.ucps_url + '"><i class="' + item.ucps_icon + '"></i>' + item.ucps_name + '</button>';
                    html += '</li>';
                }
                else if (item.ucps_url.indexOf("select:") > -1) {

                }
                else {
                    html += '<li>';
                    html += '	<button class="toolbar" onclick="functionIfram(\'' + item.ucps_url + '\',\'' + item.ucps_name + '\',\'' + $("title").text() + '\')"><i class="' + item.ucps_icon + '"></i>' + item.ucps_name + '</button>';
                    html += '</li>';
                }
                $.table.getBox().find(".list-table-head ul").append(html);
            });
        });
    };

    /**
     * 加载事件
     * @param opts
     */
    $.table.loadEvent = function (opts) {
        var table_box = $.table.getBox();

        // 开启日期筛选
        if (opts.filterDate) {
            // 【事件】选择日期
            table_box.find("[name=screen-date-data]").on("change", function () {
                // 加载数据
                $.table.loadDataWhere();
            });

            // 【事件】选择日期查询类型
            table_box.find("[name=screen-date-change]").on("change", function () {
                var custom_box = $(this).parent(".screen").find(".custom-box");
                switch ($(this).val()) {
                    case "custom":
                        custom_box.show("fast");

                        custom_box.find("[name=custom-start-date]").val("");
                        custom_box.find("[name=custom-end-date]").val(returnDate(new Date()));

                        $(this).css({
                            "borderTopRightRadius": 0,
                            "borderBottomRightRadius": 0
                        });

                        // 加载数据
                        $.table.loadDataWhere();
                        break;
                    default:
                        custom_box.hide("fast");

                        $(this).css({
                            "borderTopRightRadius": "3px",
                            "borderBottomRightRadius": "3px"
                        });

                        // 加载数据
                        $.table.loadDataWhere();
                        break;
                }
            });

            // 【事件】选择开始日期
            table_box.find("[name=custom-start-date]").on("focus", function () {
                var maxDate = table_box.find("[name=custom-end-date]").val();
                WdatePicker({
                    minDate: getCurrentTime(),   //获取当前时间
                    isShowClear: true,
                    onpicked: function () {
                        // 加载数据
                        $.table.loadDataWhere();
                    },
                    oncleared: function () {
                        // 加载数据
                        $.table.loadDataWhere();
                    }
                });
            });

            // 【事件】选择结束日期
            table_box.find("[name=custom-end-date]").on("focus", function () {
                var minDate = table_box.find("[name=custom-start-date]").val();
                WdatePicker({
                    minDate: returnDate(minDate),
                    isShowClear: true,
                    onpicked: function () {
                        // 加载数据
                        $.table.loadDataWhere();
                    },
                    oncleared: function () {
                        // 加载数据
                        $.table.loadDataWhere();
                    }
                });
            });
        }

        // 自定义筛选
        if (opts.filterBars.length > 0) {
            $.each(opts.filterBars, function (index, data) {
                if (isEmpty(data.name)) return;
                if (data.type == "select1") return;

                $("[name=" + data.name + "]").on("change", function () {
                    $.table.loadDataWhere();
                });
            });

        }

        // 开启查询筛选
        if (opts.filterWhere) {

            // 【事件】筛选按钮
            table_box.find("[name=screen-btn]").on("click", function () {
                if (table_box.find(".list-menu").is(":hidden")) {
                    $.table.screenOpen();
                } else {
                    $.table.screenClose();
                }
            });

            // 【事件】添加筛选
            table_box.find("[name=filter-add]").on("click", function () {
                var _box = table_box.find(".screen-where-main");
                var filterBoo = true;
                $.each(opts.listParams, function (index, data) {
                    if (filterBoo && !data.filterSelected) {
                        $.table.filterBox(_box, data);
                        filterBoo = false;
                        data.filterSelected = true;
                    }
                });

                // 选择筛选条件
                _box.find("[name=filter-add-name]").on("click", function (e) {
                    e.stopPropagation();
                    $(".where-mask").remove();
                    var _this = $(this);
                    var _ul = $('<ul class="where-mask custom-scroll"></ul>');
                    $.each(opts.listParams, function (index, data) {
                        $('<li>' + returnValue(data.text) + '<li>').appendTo(_ul).data("data", data);
                    });
                    _ul = _ul.appendTo(table_box);
                    _ul.css({
                        top: _this.offset().top + _this.height() + 4,
                        left: _this.offset().left // + _this.width() + 10
                    });

                    _ul.on("click", function (e) {
                        e.stopPropagation();
                    });

                    _ul.find("li").on("click", function () {
                        var data = $(this).data("data");
                        $.table.filterBox(_box, data, _this);
                        _ul.remove();
                    });
                });
            });

            // 【事件】执行筛选
            table_box.find("[name=filter-search]").on("click", function () {
                $.table.loadDataWhere();
            });

            // 【事件】清除全部筛选
            table_box.find("[name=filter-clean-all]").on("click", function () {
                table_box.find(".screen-where-main").find(".screen-where-item").each(function () {
                    var _parent = $(this);
                    $.each(opts.listParams, function (index, data) {
                        if (data.name == _parent.find("[name=where-content]").attr("data-name")) {
                            data.filterSelected = false;
                            return false;
                        }
                    });
                    $(this).remove();
                });
                $.table.loadDataWhere();
            });

            // 【事件】清除单个筛选
            table_box.on("click", "[name=filter-clean-one]", function () {
                var _parent = $(this).parents(".screen-where-item");
                $.each(opts.listParams, function (index, data) {
                    if (data.name == _parent.find("[name=where-content]").attr("data-name")) {
                        data.filterSelected = false;
                        return false;
                    }
                });
                _parent.hide("fast", function () {
                    $(this).remove();
                });
            });

            // 【事件】筛选条件
            table_box.on("keyup", "[name=where-content]", function (e) {
                if (e.keyCode === 13) {
                    $.table.loadDataWhere();
                }
            });

            // 【事件】多选框初始化
            checkboxList("where-checkbox");

            // 【事件】
            // table_box.find(".custom-table-body").on({
            //     "mouseover": function () {
            //         $.table.screenClose();
            //     }
            // });
        }

        // 合同类型
        table_box.find("[name=contractObjectType] label").each(function () {
            $(this).on("click", function () {
                if ($(this).siblings().hasClass('borderbox-checked')) {
                    $(this).siblings().removeClass('borderbox-checked');
                }
                if ($(this).hasClass('borderbox-checked')) {
                    $(this).removeClass('borderbox-checked');
                } else {
                    $(this).addClass('borderbox-checked');
                }
                $.table.loadDataWhere();
            })
        })
        //收支类型选择
        table_box.find("[name=balPay] label").each(function () {
            $(this).on("click", function () {
                if ($(this).siblings().hasClass('borderbox-checked')) {
                    $(this).siblings().removeClass('borderbox-checked');
                }
                if ($(this).hasClass('borderbox-checked')) {
                    $(this).removeClass('borderbox-checked');
                } else {
                    $(this).addClass('borderbox-checked');
                }
                $.table.loadDataWhere();
            })
        })
        //账单类型
        table_box.find("[name=bcbType] label").each(function () {
            $(this).on("click", function () {
                if ($(this).siblings().hasClass('borderbox-checked')) {
                    $(this).siblings().removeClass('borderbox-checked');
                }
                if ($(this).hasClass('borderbox-checked')) {
                    $(this).removeClass('borderbox-checked');
                } else {
                    $(this).addClass('borderbox-checked');
                }
                $.table.loadDataWhere();
            })
        })
        //应还款时间类型
        table_box.find("[name=repaymentDate] label").each(function () {
            $(this).on("click", function () {
                if ($(this).siblings().hasClass('borderbox-checked')) {
                    $(this).siblings().removeClass('borderbox-checked');
                }
                if ($(this).hasClass('borderbox-checked')) {
                    $(this).removeClass('borderbox-checked');
                } else {
                    $(this).addClass('borderbox-checked');
                }
                if ($(this).hasClass('borderbox-checked') && $(this).text() == '自定义') {
                    $('.custom-box').show();
                } else {
                    $('.custom-box').hide();
                }
                    $.table.loadDataWhere();
            })
        })

        // 【事件】列表选项
        if (opts.listCheckForItem) {
            $(document).on("click", ".list-content-item", function () {
                var len_all, len_checked;
                var check = $(this).find("[name=table-checkbox]");
                if (check.is(":checked")) {
                    // check.removeAttr("checked");
                    // check.parent().removeClass("table-checkbox-checked");
                    // if (opts.listMultiple) {
                    //     len_all = table_box.find("[name=table-checkbox]").not("[data-type=all]").length;
                    //     len_checked = table_box.find("[name=table-checkbox]:checked").not("[data-type=all]").length;
                    //     if (len_checked !== len_all) {
                    //         table_box.find("[name=table-checkbox][data-type=all]").removeAttr("checked").parent().removeClass("table-checkbox-checked");
                    //     }
                    // }
                } else {
                    if (!opts.listMultiple) {
                        table_box.find("[name=table-checkbox]").removeAttr("checked").parent().removeClass("table-checkbox-checked");
                    }
                    check.attr("checked", "checked").parent().addClass("table-checkbox-checked");
                    if (opts.listMultiple) {
                        len_all = table_box.find("[name=table-checkbox]").not("[data-type=all]").length;
                        len_checked = table_box.find("[name=table-checkbox]:checked").not("[data-type=all]").length;
                        if (len_checked === len_all) {
                            table_box.find("[name=table-checkbox][data-type=all]").attr("checked", "checked").parent().addClass("table-checkbox-checked");
                        }
                    }
                }
            });
        } else {
            $(document).on("change", "[name=table-checkbox]", function () {
                if ($(this).attr("data-type") === "all") {
                    if ($(this).is(":checked")) {
                        table_box.find("[name=table-checkbox]").attr("checked", "checked").parent().addClass("table-checkbox-checked");
                    } else {
                        table_box.find("[name=table-checkbox]").removeAttr("checked").parent().removeClass("table-checkbox-checked");
                    }
                } else {
                    var len_all, len_checked;
                    if ($(this).is(":checked")) {
                        if (!opts.listMultiple) {
                            table_box.find("[name=table-checkbox]").removeAttr("checked").parent().removeClass("table-checkbox-checked");
                        }
                        $(this).attr("checked", "checked").parent().addClass("table-checkbox-checked");
                        if (opts.listMultiple) {
                            len_all = table_box.find("[name=table-checkbox]").not("[data-type=all]").length;
                            len_checked = table_box.find("[name=table-checkbox]:checked").not("[data-type=all]").length;
                            if (len_checked === len_all) {
                                table_box.find("[name=table-checkbox][data-type=all]").attr("checked", "checked").parent().addClass("table-checkbox-checked");
                            }
                        }
                    } else {
                        $(this).parent().removeClass("table-checkbox-checked");
                        if (opts.listMultiple) {
                            len_all = table_box.find("[name=table-checkbox]").not("[data-type=all]").length;
                            len_checked = table_box.find("[name=table-checkbox]:checked").not("[data-type=all]").length;
                            if (len_checked !== len_all) {
                                table_box.find("[name=table-checkbox][data-type=all]").removeAttr("checked").parent().removeClass("table-checkbox-checked");
                            }
                        }
                    }
                }
            });
        }

        $(window).resize(function () {
            $.table.resize();
        });

        $(document).on("click", function () {
            table_box.find(".where-mask").remove();
        });
    };

    /**
     * 筛选-自定义下拉选择框1
     *
     * @param mode 模式（add：添加模式、change：选择模式）
     * @param data 数据
     */
    $.screen_custom_select1 = function (mode, data) {
        var table_box = $.table.getBox();
        var screen_custom_data = table_box.find("[name=screen-custom-data]");
        var screen_custom_change = table_box.find("[name=screen-custom-change]");

        // 加载一级数据
        var load_data = function (data) {
            $('<option value="' + data.name + '">' + data.text + '</option>').appendTo(screen_custom_data).data("data", data);
        };
        // 加载二级数据
        var load_change = function (data) {
            screen_custom_change.empty();
            screen_custom_change.parent(".screen").find(".custom-box").hide("fast");

            $.each(data.data, function (key, value) {
                screen_custom_change.append('<option value="' + key + '" ' + (data.selected == key ? "selected" : "") + '>' + value + '</option>');
            });
            if (data.custom) {
                screen_custom_change.append('<option value="custom">自定义</option>');
            }
        };
        // 加载三级自定义数据
        var load_custom_box = function () {
            var custom_box = screen_custom_change.parent(".screen").find(".custom-box");
            switch (screen_custom_change.val()) {
                case "custom":
                    custom_box.show("fast");

                    custom_box.find("[name=custom-value]").val("").focus().off().on("keyup", function (e) {
                        if (e.keyCode != 13) return;
                        $.table.loadDataWhere();
                    });

                    custom_box.find("[name=custom-search]").off().on("click", function () {
                        $.table.loadDataWhere();
                    });

                    screen_custom_change.css({"borderTopRightRadius": 0, "borderBottomRightRadius": 0});
                    break;
                default:
                    custom_box.hide("fast");

                    screen_custom_change.css({"borderTopRightRadius": "3px", "borderBottomRightRadius": "3px"});

                    $.table.loadDataWhere();
                    break;
            }
        };

        // 添加模式
        if (mode == "add") {
            load_data(data);
            if (screen_custom_change.val() == null) {
                load_change(data);
            }
        }
        // 选择模式
        if (mode == "change") {
            screen_custom_data.find("option").each(function () {
                if ($(this).text() == data.text) $(this).attr("seleced", "selected");
            });
            load_change(data);
            load_custom_box();
        }

        // 【事件】选择自定义查询类型
        screen_custom_data.off().on("change", function () {
            $.screen_custom_select1("change", $(this).find("option:selected").data("data"));
        });

        // 【事件】选择自定义查询类型
        screen_custom_change.off().on("change", function () {
            load_custom_box();
        });
    };

    /**
     * 筛选框-打开
     */
    $.table.screenOpen = function () {
        var table_box = $.table.getBox();
        table_box.find("[name=screen-btn]").find("i").removeClass("ok").removeClass("fa-search").addClass("fa-remove").addClass("error");
        table_box.find(".list-menu").show("fast");
        $.table.resize();
    };

    /**
     * 筛选框-关闭
     */
    $.table.screenClose = function () {
        var table_box = $.table.getBox();
        table_box.find(".list-menu").hide(10, function () {
            table_box.find("[name=screen-btn]").find("i").removeClass("error").removeClass("fa-remove").addClass("fa-search").addClass("ok");
            $.table.resize();
        });
    };

    /**
     * 筛选BOX
     * @param _box
     * @param data
     * @param obj
     */
    $.table.filterBox = function (_box, data, obj) {
        var whereHtml = '<input name="where-content" data-name="' + returnValue(data.name) + '" >';
        /*placeholder="' + returnValue(data.text) + '"*/
        if (!isEmpty(data.param) && typeof data.param == 'object') {
            whereHtml = '';
            whereHtml += '<select name="where-content" data-name="' + returnValue(data.name) + '">';
            $.each(data.param, function (key, value) {
                whereHtml += '<option value="' + key + '">' + (typeof value == "string" ? value : value.text) + '</option>';
            });
            whereHtml += '</select>';
        }
        if (!isEmpty(data.filterList)) {
            whereHtml = '';
            whereHtml += '<select name="where-content" data-name="' + returnValue(data.name) + '">';
            $.each(data.filterList, function (key, value) {
                whereHtml += '<option value="' + key + '">' + (typeof value == "string" ? value : value.text) + '</option>';
            });
            whereHtml += '</select>';
        }

        if (obj != null) {
            var _item = $(obj).parents(".screen-where-item");
            _item.find("[name=filter-add-name]").text(returnValue(data.text)).data("data", data);
            _item.find(".filter-add-where").html(whereHtml);
            _item.find("[name=where-content]").focus();
        } else {
            var html = '';
            // html += '<div class="screen-where-item">';
            // html += '	<label class="where-subitem table-checkbox-box table-checkbox-checked" style="top: 7px;"><input type="checkbox" name="where-checkbox" checked></label>';
            // html += '	<label class="where-subitem error" name="filter-add-name" style="min-width: 50px;cursor: pointer;">' + returnValue(data.text) + '</label>';
            // html += '	<label class="where-subitem">包含</label>';
            // html += '	<label class="where-subitem filter-add-where" style="">' + whereHtml + '</label>';
            // html += '	<label class="where-subitem"><button class="fa-times-circle" name="filter-clean-one"></button></label>';
            // html += '</div>';
            html += '<div class="screen-where-item screen-where-item-fieldset">';
            html += '	<label class="where-subitem table-checkbox-box table-checkbox-checked" style="top: 10px;"><input type="checkbox" name="where-checkbox" checked></label>';
            html += '	<fieldset class="where-subitem">';
            html += '       <legend name="filter-add-name">' + returnValue(data.text) + '</legend>';
            html += '       <div class="filter-add-where">' + whereHtml + '</div>';
            html += '   </fieldset>';
            html += '   <button class="where-subitem error-bg-w" name="filter-clean-one"><i class="fa-remove"></i></button>';
            html += '</div>';
            $(html).appendTo(_box).find("[name=filter-add-name]").data("data", data);
            // 获取焦点
            _box.find("[name=where-content]:last").focus();
        }
        // 动态样式调整
        _box.scrollTop(_box[0].scrollHeight);
    };

    /**
     * 重载数据-样式
     */
    $.table.resize = function () {
        var _box = $.table.getBox().find(".list-table-content");
        var _head = _box.find(".custom-table-head");
        var _head_div = _head.find("div");
        var _body = _box.find(".custom-table-body");
        var _body_table = _body.find("table");
        _body_table.find('thead tr td').each(function (index) {
            if (index <= 1) return;
            _head_div.eq(index).css({
                width: $(this).outerWidth(),
                textAlign: $(this).css("text-align")
            });
        });
        _head.css('width', _body_table.outerWidth());
        if (_body.outerWidth() < _body_table.outerWidth()) {
            _body.parent().css('width', _body_table.outerWidth() + 10);
        } else {
            _body.parent().css('minWidth', '100%');
        }
    };

    /**
     * 弹出层-开启
     * @param obj
     */
    $.table.popupOpen = function (obj) {
        $.popupBox({
            target: $.table.getBox().find(".list-table-content"),
            width: $.table.defaults.popup.width,
            data: $(obj).parents("tr").find("[name=table-checkbox]").data("data"),
            done: function (box, data) {
                $.table.defaults.popup.result(box, data);
            },
            close: function () {
                $.table.defaults.popup.close();
            }
        });
    };

    /**
     * 获取BOX
     * @returns {*|HTMLElement}
     */
    $.table.getBox = function () {
        // return $(".list-table[data-type=table]");
        return $(".page-box");
    };

    /**
     * 获取自定义BOX
     */
    $.table.getCustomBox = function () {
        return $.table.getBox().find('.list-table-custom');
    };

    /**
     * 设置自定义BOX
     * @param html
     */
    $.table.setCustomBox = function (html) {
        return $.table.getBox().find('.list-table-custom').html(html);
    };

    /**
     * 获取列表BOX
     * @param i
     */
    $.table.getItemBox = function (i) {
        return $.table.getBox().find('.list-content-item[data-index=' + i + ']');
    };

    /**
     * 获取操作BOX
     * @param i
     */
    $.table.getOptionBox = function (i) {
        return $.table.getBox().find('.list-content-box[data-index=' + i + ']');
    };

    window.table = $.table;

    /**
     * 弹出层-开启
     * @param obj
     */
    $.popupBox = function (param) {
        param = $.extend({
            target: "",
            data: {},
            width: "70%",
            buttons: {
                "close": "关闭",
                "refresh": "刷新"
            },
            done: function () {
            },
            close: function () {
            }
        }, param);

        var _box = $(param.target || "body");// $.table.getBox().find(".list-table-content");
        var _data = param.data;// $(obj).parents("tr").find("[name=table-checkbox]").data("data");
        var subBox = $(".custom-popup");
        if (subBox.length < 1) {
            var html = '';
            html += '<div class="custom-popup">';
            html += '   <div class="popup-option">';
            $.each(param.buttons, function (key, value) {
                switch (key) {
                    case "close":
                        html += '<button name="popup-close" class="error-bg-w" title="' + value + '"><i class="fa-remove"></i></button>';
                        break;
                    case "refresh":
                        html += '<button name="popup-refresh" class="next-bg-w" title="' + value + '"><i class="fa-refresh"></i></button>';
                        break;
                }
            });
            html += '   </div>';
            html += '   <div class="popup-main custom-scroll"></div>';
            html += '</div>';
            subBox = $(html).appendTo(_box);
        }

        // 样式
        subBox.css({
            width: param.width
        });

        // 关闭
        subBox.find("[name=popup-close]").off().on("click", function () {
            $.popupBoxClose();
            param.close();
        });

        // 刷新
        subBox.find("[name=popup-refresh]").off().on("click", function () {
            $(this).find("i").addClass("animation-spin");
            param.done(subBox.find(".popup-main"), _data);
        });

        // 特效
        subBox.off().on({
            "mouseover": function () {
                // subBox.css("background", "rgba(255, 255, 255, 1)");
            },
            "mouseleave": function () {
                // subBox.css("background", "rgba(255, 255, 255, 0.7)");
            }
        });
        param.done(subBox.find(".popup-main"), _data);
    };

    /**
     * 弹出层-关闭
     */
    $.popupBoxClose = function () {
        $(".custom-popup").remove();
    };

    /**
     * 弹出层-刷新
     */
    $.popupRefresh = function () {
        $(".custom-popup").find("[name=popup-refresh]").click();
    };

    /**
     * 弹出层-刷新关闭
     */
    $.popupRefreshClose = function () {
        $(".custom-popup").find("[name=popup-refresh] > i").removeClass("animation-spin");
    };

    /**
     * 弹出侧边层-开启
     * @param obj
     */
    $.popupSideView = function (param) {
        param = $.extend({
            mode: "bottom", // top,bottom,right,left
            wh: "50%",
            wh_min: "auto",
            title: "",
            done: function () {
            }
        }, param);

        var subBox = $(".custom-popup");
        var subSideBox = $(".custom-popup-side");
        if (subBox.length < 1) {
            return;
        }
        if (subSideBox.length < 1) {
            var html =
                '<div class="custom-popup-side">' +
                '   <div class="popup-side-head">' +
                '       <div class="popup-side-option">' +
                '           <button name="popup-side-close" class="error-bg-w"><i class="fa-remove"></i></button>' +
                '       </div>' +
                '   </div>' +
                '   <div class="popup-side-main">' +
                '       <div class="popup-side-title">' + returnValue(param.title) + '</div>' +
                '       <div class="popup-side-content"></div>' +
                '   </div>' +
                '</div>';
            subSideBox = $(html).appendTo(subBox);

            // 初始化模式
            switch (param.mode) {
                case "top":
                    subSideBox.css({
                        flexDirection: "column-reverse"
                    });
                    subSideBox.find(".popup-side-main").css({
                        height: param.wh,
                        minHeight: param.wh_min,
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.07)",
                        padding: "10px 10px 20px 20px"
                    });
                    subSideBox.find(".popup-side-option").css({
                        top: "-20px",
                        bottom: "auto"
                    });
                    break;
                case "bottom":
                    subSideBox.find(".popup-side-main").css({
                        height: param.wh,
                        minHeight: param.wh_min
                    });
                    break;
                case "right":
                    subSideBox.css({
                        flexDirection: "row"
                    });
                    subSideBox.find(".popup-side-main").css({
                        width: param.wh,
                        height: "auto",
                        padding: "10px 10px 10px 20px"
                    });
                    subSideBox.find(".popup-side-option").css({
                        top: "10%",
                        left: "auto",
                        right: "-20px",
                        bottom: "auto",
                        marginTop: "-20px"
                    });
                    break;
                case "left":
                    subSideBox.css({
                        flexDirection: "row-reverse"
                    });
                    subSideBox.find(".popup-side-main").css({
                        width: param.wh,
                        height: "auto",
                        padding: "10px 20px 10px 20px"
                    });
                    subSideBox.find(".popup-side-option").css({
                        top: "10%",
                        left: "-20px",
                        right: "auto",
                        bottom: "auto",
                        marginTop: "-20px",
                        marginLeft: "0"
                    });
                    break;
            }
        }

        // 关闭
        subSideBox.find(".popup-side-head").off().on("click", function () {
            $.popupSideViewClose();
        });

        // 关闭
        subSideBox.find("[name=popup-side-close]").off().on("click", function () {
            $.popupSideViewClose();
        });

        // 回调
        param.done(subSideBox.find(".popup-side-content"));
    };

    /**
     * 弹出侧边层-关闭
     */
    $.popupSideViewClose = function () {
        $(".custom-popup-side").remove();
    };

})(jQuery);
