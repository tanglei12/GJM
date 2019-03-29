;(function ($) {
    $.fn.search = function (param) {
        param = $.extend({
            trigger: "focus",   // 出发方式：focus,click,change...
            focus: true,
            placeholder: "",    // 占位符
            list: [
                // {text: "订单来源", name: "so_source"},
            ],                  // 展示列表
            request: {
                url: "",
                data: {}
            },                  // 请求
            done: function () {
            }                   //
        }, param, true);

        var _this = this;
        var box;

        /**
         * 加载视图
         */
        function load_view() {
            box = $(".common-search-box");
            if (box.length > 0) {
                if (param.focus) box.find("[type=search]").focus();
                return;
            }

            // ---------------------------------

            var html = '';
            html += '<div class="common-search-box">';
            html += '   <div class="common-search-head">';
            html += '       <input type="search" placeholder="' + param.placeholder + '">';
            html += '   </div>';
            html += '   <div class="common-search-main">';
            html += '       <table>';
            html += '           <thead class="search-table-head"><tr></tr></thead>';
            html += '           <tbody class="search-table-body"></tbody>';
            html += '       </table>';
            html += '   </div>';
            html += '</div>';
            box = $(html).appendTo("body");

            // ---------------------------------

            box.css({
                top: $(_this).offset().top + $(_this).height() + 6,
                left: $(_this).offset().left
            });
            if (param.focus) box.find("[type=search]").focus();

            // ---------------------------------

            var box_table_head = box.find(".search-table-head");
            var html = '';
            html += '<tr>';
            $.each(param.list, function (index, data) {
                html += '<th name="' + data.name + '">' + data.text + '</th>';
            });
            html += '</tr>';
            box_table_head.html(html);

            // 加载数据
            load_data();

            // 加载事件
            load_event();
        }

        /**
         * 加载数据
         */
        function load_data() {
            var dataParam = initRequestData(param.request.data);
            dataParam.where = box.find("[type=search]").val();
            $.ajax({
                type: "POST",
                url: param.request.url,
                data: dataParam,
                dataType: "json"
            }).done(function (result) {
                if (result.code != 200) return;

                var box_table_body = box.find(".search-table-body");
                box_table_body.empty();

                $.each(result.data.list, function (index0, data0) {
                    var html = '';
                    html += '<tr>';
                    $.each(param.list, function (index, data) {
                        if (typeof data.name === "string" && data.name.indexOf("{") > -1 && data.name.indexOf("}") > -1) {
                            var to_boo = true;
                            var text = data.name;
                            var name1 = text.substring(0, text.indexOf("{"));
                            var name2 = text.substring(text.indexOf("}") + 1, text.length);
                            var val1 = data0[name1];
                            var val2 = data0[name2];
                            to_boo = !isEmpty(val1);
                            var html1 = '<label>' + returnValue(val1) + '</label>';

                            to_boo = !isEmpty(val2);
                            var html2 = '<label>' + returnValue(val2) + '</label>';

                            var to = to_boo ? text.substring(text.indexOf("{") + 1, text.indexOf("}")) : "";

                            html += '<td name="' + name1 + "_" + name2 + '">' + html1 + to + html2 + '</td>';
                        } else {
                            html += '<td name="' + data.name + '">' + data0[data.name] + '</td>';
                        }
                    });
                    html += '</tr>';
                    var sub_box = $(html).appendTo(box_table_body);

                    // 设置数据
                    sub_box.data("data", data0);

                    // 【事件】点击
                    sub_box.off().on("click", function () {
                        param.done(data0);
                        box.remove();
                    });
                });
            })
        }

        /**
         * 加载事件
         */
        function load_event() {
            // 搜索
            box.find("[type=search]").on({
                "input propertychange": function () {
                    load_data();
                },
                "keyup": function (e) {
                    if (e.keyCode != 13) return;
                    load_data();
                }
            });

            box.on("click", function (e) {
                e.stopPropagation();
            });
            _this.on("click", function (e) {
                e.stopPropagation();
            });

            //
            $(document).on("click", _this, function () {
                box.remove();
            });
        }

        function initRequestData(data) {
            var result = {};
            $.each(data, function (key, value) {
                try {
                    result[key] = isEmpty(value) ? value : eval('(' + value + ')');
                } catch (e) {
                    result[key] = value;
                }
            });
            return result;
        }

        // 当前元素绑定事件
        _this.on(param.trigger, function () {
            load_view();
        });
    };
})(jQuery);