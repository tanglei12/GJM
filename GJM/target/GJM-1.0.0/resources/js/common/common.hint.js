;(function ($) {

    /**
     * 是否为移动端
     * @type {boolean}
     */
    var isMobile = /(iPhone|iPad|iPod|iOS|Android|SymbianOS|Windows Phone)/i.test(navigator.userAgent);
    var time_out_index;

    /**
     * 提示-主体
     *
     * @param param
     * @returns {boolean}
     */
    $.hint = function (param) {
        param = $.extend({
            hint: '',
            title: '提示',
            msg: '',					// 标题
            type: 'hint',				// 提示类型
            autoClose: 0,				// 自动关闭
            autoCloseCallback: function () {
            },		// 回调
        }, param);
        return isMobile ? $.hint.mobile(param) : $.hint.pc(param);
    };

    /**
     * 移动端
     * @param param
     * @returns {boolean}
     */
    $.hint.mobile = function (param) {
        var msg_class = isMobile ? "mobile" : "pc";
        var msg_type = $.hint.returnMsgType(param.type);
        var msg_box = $(".hint-" + msg_class);

        switch (param.hintType) {
            case "tip":
                // 初始化视图
                if (msg_box.length > 0) {
                    msg_box.find(".icon").html(msg_type.icon);
                    msg_box.find(".title").html(param.msg);
                } else {
                    var html = '';
                    html += '<div class="hint-' + msg_class + '">';
                    html += '	<div class="hint-' + msg_class + '-tip-main">';
                    html += '		<div class="icon">' + msg_type.icon + '</div>';
                    html += '		<div class="title">' + param.msg + '</div>';
                    if (msg_class == "mobile") {
                        html += '		<div class="tip"></div>';
                    }
                    html += '	</div>';
                    html += '</div>';
                    msg_box = $(html).appendTo("body");
                }

                // 初始化事件
                msg_box.off("click");
                if (param.type != "loading") {
                    // 【事件】关闭窗口
                    msg_box.off().on("click", function () {
                        clearInterval(time_out_index);
                        $.hint.closeTip();
                        param.autoCloseCallback();
                    });
                }

                if (param.autoClose > 0) {
                    msg_box.find(".tip").html(parseFloat(param.autoClose / 1000) + "s后关闭");
                    // 倒计时
                    time_out_index = setTimeout(function () {
                        $.hint.closeTip();
                        param.autoCloseCallback();
                    }, param.autoClose);
                }
                break
            case "alert":
                break
            case "confirm":
                var html = '';
                html += '<div class="hint-' + msg_class + '">';
                html += '	<div class="hint-' + msg_class + '-confirm-main">';
                // html += '      <div class="confirm-head">';
                // html += '          <div class="confirm-head-title">提示</div>';
                // html += '          <div class="confirm-head-close error-bg-w"><i class="fa-remove"></i></div>';
                // html += '      </div>';
                html += '      <div class="confirm-main">' + param.msg + '</div>';
                html += '      <div class="confirm-foot">';
                html += '          <button class="hint-btn error" name="hint-cancel" value="no">取消</button>';
                html += '          <button class="hint-btn next" name="hint-confirm" value="yes">确定</button>';
                html += '      </div>';
                html += '   </div>';
                html += '</div>';
                msg_box = $(html).appendTo("body");

                // var msg_box_main = msg_box.find('.hint-' + msg_class + '-confirm-main');
                // msg_box_main.css("marginTop", -(msg_box_main.outerHeight() / 2) - 20);

                // 【事件】确定
                msg_box.find("[name=hint-confirm]").off().on("click", function () {
                    $.hint.close();
                    param.autoCloseCallback(msg_box, true);
                });

                // 【事件】取消
                msg_box.find("[name=hint-cancel]").off().on("click", function () {
                    $.hint.close();
                    param.autoCloseCallback(msg_box, false);
                });

                // 【事件】阻止关闭窗口
                msg_box.find('.hint-' + msg_class + '-confirm-main').off().on("click", function (e) {
                    e.stopPropagation();
                });

                // 【事件】关闭窗口
                msg_box.off().on("click", function () {
                    $.hint.close();
                });
                break
            case "box":
                var html = '';
                html += '<div class="hint-' + msg_class + '">';
                html += '	<div class="hint-' + msg_class + '-confirm-main">';
                html += '      <div class="confirm-head">';
                // html += '          <div class="confirm-head-title">提示</div>';
                html += '      </div>';
                html += '      <div class="confirm-main">' + param.msg + '</div>';
                html += '      <div class="confirm-foot">';
                html += '          <button class="hint-btn next-bg-w" name="hint-confirm" value="yes">确定</button>';
                html += '          <button class="hint-btn error-bg-w" name="hint-cancel" value="no">取消</button>';
                html += '      </div>';
                html += '   </div>';
                html += '</div>';
                msg_box = $(html).appendTo("body");

                // 【事件】确定
                msg_box.find("[name=hint-confirm]").off().on("click", function () {
                    if (param.autoCloseCallback(msg_box.find(".confirm-main"))) msg_box.remove();
                });

                // 【事件】取消
                msg_box.find("[name=hint-cancel]").off().on("click", function () {
                    msg_box.remove();
                });
                break;
        }
        return false;
    };

    /**
     * 电脑端
     * @param param
     * @returns {boolean}
     */
    $.hint.pc = function (param) {
        var msg_class = isMobile ? "mobile" : "pc";
        var msg_type = $.hint.returnMsgType(param.type);
        var msg_box = $(".hint-" + msg_class);

        switch (param.hintType) {
            case "tip":
                clearTimeout(time_out_index);

                // 初始化视图
                if (msg_box.length > 0) {
                    var msg_box_main = msg_box.find('.hint-' + msg_class + '-tip-main');
                    var msg_icon = msg_box_main.find(".icon");
                    var msg_title = msg_box_main.find(".title");
                    var is_having = msg_icon.html() == msg_type.icon && msg_title.html() == param.msg;

                    msg_icon.html(msg_type.icon);
                    msg_title.html(param.msg);

                    if (is_having) {
                        msg_box_main.animate({left: "48%"}, 80);
                        msg_box_main.animate({left: "52%"}, 80);
                        msg_box_main.animate({left: "49%"}, 80);
                        msg_box_main.animate({left: "51%"}, 80);
                        msg_box_main.animate({left: "50%"}, 80);
                    }
                } else {
                    var html = '';
                    html += '<div class="hint-' + msg_class + '">';
                    html += '	<div class="hint-' + msg_class + '-tip-main">';
                    html += '		<button class="icon">' + msg_type.icon + '</button>';
                    html += '		<div class="title">' + param.msg + '</div>';
                    if (msg_class == "mobile") {
                        html += '		<div class="tip"></div>';
                    }
                    html += '	</div>';
                    html += '</div>';
                    msg_box = $(html).appendTo("body");
                }

                // 初始化样式
                var tip_main = msg_box.find('.hint-' + msg_class + '-tip-main');
                tip_main.css({marginLeft: -tip_main.width() / 2});

                // 初始化事件
                msg_box.off("click");
                if (param.type != "loading") {
                    // 倒计时
                    time_out_index = setTimeout(function () {
                        $.hint.closeTip();
                        param.autoCloseCallback();
                    }, 2000);
                }
                break;
            case "confirm":
                var html = '';
                html += '<div class="hint-' + msg_class + '">';
                html += '	<div class="hint-' + msg_class + '-confirm-main">';
                html += '      <div class="confirm-head">';
                html += '          <div class="confirm-head-title">' + param.title + '</div>';
                //html += '          <button class="confirm-head-close error-bg-w"><i class="fa-remove"></i></button>';
                html += '      </div>';
                html += '      <div class="confirm-main">' + param.msg + '</div>';
                html += '      <div class="confirm-foot">';
                html += '          <button class="hint-btn next-bg-w" name="hint-confirm" value="yes">确定</button>';
                html += '          <button class="hint-btn error-bg-w" name="hint-cancel" value="no">取消</button>';
                html += '      </div>';
                html += '   </div>';
                html += '</div>';
                msg_box = $(html).appendTo("body");

                // 【事件】确定
                msg_box.find("[name=hint-confirm]").off().on("click", function () {
                    $(this).attr("disabled", "disabled");
                    var result_boo = param.autoCloseCallback(msg_box);
                    if (!result_boo) {
                        msg_box.remove();
                    } else {
                        $(this).removeAttr("disabled");
                    }
                });

                // 【事件】取消
                msg_box.find("[name=hint-cancel]").off().on("click", function () {
                    msg_box.remove();
                });
                break;
            case "box":
                var html = '';
                html += '<div class="hint-' + msg_class + '">';
                html += '	<div class="hint-' + msg_class + '-confirm-main">';
                html += '      <div class="confirm-head">';
                // html += '          <div class="confirm-head-title">提示</div>';
                html += '      </div>';
                html += '      <div class="confirm-main">' + param.msg + '</div>';
                html += '      <div class="confirm-foot">';
                html += '          <button class="hint-btn next-bg-w" name="hint-confirm" value="yes">确定</button>';
                html += '          <button class="hint-btn error-bg-w" name="hint-cancel" value="no">取消</button>';
                html += '      </div>';
                html += '   </div>';
                html += '</div>';
                msg_box = $(html).appendTo("body");

                // 【事件】确定
                msg_box.find("[name=hint-confirm]").off().on("click", function () {
                    if (param.autoCloseCallback(msg_box.find(".confirm-main"))) msg_box.remove();
                });

                // 【事件】取消
                msg_box.find("[name=hint-cancel]").off().on("click", function () {
                    msg_box.remove();
                });
                break;
        }
        return false;
    };

    /**
     * 提示-消息提示
     *
     * @param msg
     * @param msg_type
     */
    $.hint.tip = function (msg, type, autoClose, autoCloseCallback) {
        return $.hint({
            hintType: "tip",
            msg: msg,
            type: type,
            autoClose: autoClose,
            autoCloseCallback: autoCloseCallback
        });
    };

    /**
     * 提示-弹窗提示
     * @param msg
     */
    $.hint.alert = function (msg) {

    };

    /**
     * 提示-对话框
     * @param msg
     */
    $.hint.dialog = function (msg) {

    };

    /**
     * 提示-弹窗提示
     * @param msg
     */
    $.hint.box = function (html, autoCloseCallback) {
        $.hint({
            hintType: "box",
            msg: html,
            autoCloseCallback: autoCloseCallback
        });
    };

    /**
     * 提示-确认框
     * @param msg
     * @param callBack
     */
    $.hint.confirm = function (title, callback) {
        $.hint({
            hintType: "confirm",
            msg: title,
            autoCloseCallback: callback
        });
    };

    /**
     * 提示-上拉框
     *
     * @param title 标题
     * @param content 内容
     * @param callback 回调
     */
    $.hint.pullup = function (title, content, callback) {
        var box = $(".hint-pull-up");
        if (box.length < 1) {
            // 加载元素
            var html = '';
            html += '<div class="hint-pull-up">';
            html += '	<div class="pull-up-mask"></div>';
            html += '	<div class="pull-up-main">';
            html += '		<div class="mask-main-head">';
            html += '			<div class="mask-main-head-title">' + title + '</div>';
            html += '			<div class="mask-main-head-option"><button class="mask-close"><i class="fa-remove"></i></button></div>';
            html += '		</div>';
            html += '		<div class="mask-main-content">' + content + '</div>';
            html += '	</div>';
            html += '</div>';
            box = $(html).appendTo("body");

            // 加载样式
            box.find(".pull-up-main").animate({"bottom": "0px"});
            $('body').css('overflow', 'hidden');

            // 【事件】关闭上拉框
            box.find(".mask-close").on("click", function () {
                box.find(".pull-up-main").animate({bottom: "-1000px"}, function () {
                    box.fadeOut("fast", function () {
                        box.remove();
                        $('body').css('overflow', 'auto');
                    });
                });
            });

            // 【事件】关闭上拉框
            box.find(".pull-up-mask").on("click", function () {
                box.find(".pull-up-main").animate({bottom: "-1000px"}, function () {
                    box.fadeOut("fast", function () {
                        box.remove();
                        $('body').css('overflow', 'auto');
                    });
                });
            });
        } else {
            box.find(".mask-main-head-title").html(title);
            box.find("mask-main-content").html(content);
        }

        // 回调函数
        if (typeof callback == "function") {
            callback(box);
        }
    };

    /**
     * 提示-消息关闭
     */
    $.hint.close = function (type) {
        var pc = $(".hint-pc");
        var mobile = $(".hint-mobile");
        var pullup = $(".hint-pull-up");
        if (pc.length > 0) {
            switch (type) {
                case "tip":
                    pc.find(".hint-pc-tip-main").animate({top: "10%", opacity: 0}, 600, function () {
                        $(this).parents(".hint-pc").remove();
                    });
                    break;
                case "confirm":
                    pc.find(".hint-pc-confirm-main").fadeIn("fast", function () {
                        $(this).parents(".hint-pc").remove();
                    });
                    break;
                default:
                    pc.fadeIn("fast", function () {
                        $(this).parents(".hint-pc").remove();
                    });
                    break;
            }
        }

        if (mobile.length > 0) {
            switch (type) {
                case "tip":
                    mobile.animate({opacity: 0}, 800, function () {
                        $(this).hide("fast", function () {
                            $(this).remove();
                        });
                    });
                    break;
                case "confirm":
                    mobile.find(".hint-mobile-confirm-main").fadeIn("fast", function () {
                        $(this).parent().remove();
                    });
                    break;
                default:
                    mobile.fadeIn("fast", function () {
                        $(this).remove();
                    });
                    break;
            }
        }

        if (pullup.length > 0) {
            pullup.find(".pull-up-main").animate({bottom: "-1000px"}, function () {
                pullup.fadeOut("fast", function () {
                    pullup.remove();
                    $('body').css('overflow', 'auto');
                });
            });
        }
    };

    /**
     * 关闭消息提示
     */
    $.hint.closeTip = function () {
        $.hint.close("tip");
    };

    /**
     * 关闭确认框
     */
    $.hint.closeConfirm = function () {
        $.hint.close("confirm");
    };

    /**
     * 返回消息类型
     *
     * @param msg_type
     * @returns {{}}
     */
    $.hint.returnMsgType = function (msg_type) {
        var data = {};
        data.type = "fa-info-circle";
        data.style = "next";
        switch (msg_type) {
            case "info":
                data.type = "fa-info-circle";
                data.style = "next";
                data.icon = '<i class="fa-info-circle next"></i>';
                break;
            case "error":
                data.type = "fa-times-circle";
                data.style = "error";
                data.icon = '<i class="fa-times-circle error"></i>';
                break;
            case "warn":
            case "warning":
            case "hint":
                data.type = "fa-exclamation-circle";
                data.style = "hint";
                data.icon = '<i class="fa-exclamation-circle hint"></i>';
                break;
            case "success":
                data.type = "fa-check-circle";
                data.style = "ok";
                data.icon = '<i class="fa-check-circle ok"></i>';
                break;
            case "loading":
                data.type = "fa-circle-o-notch";
                data.style = "ok";
                data.icon = '<i class="fa-circle-o-notch animation-spin next"></i>';
                // data.icon = '<img src="/resources/image/svg/rolling.svg" style="width:38px;">';
                break;
            default:
                data.type = "fa-info-circle";
                data.style = "next";
                data.icon = '<i class="fa-info-circle next"></i>';
                break
        }
        return data;
    };

})(jQuery);