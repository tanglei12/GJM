/**
 * 动态加载css,js
 *
 * @type {{css: dynamicLoading.css, js: dynamicLoading.js}}
 */
var dynamicLoading = {
    css: function (path) {
        if (!path || path.length === 0) {
            throw new Error('argument "path" is required !');
        }
        if ($("link[href^='" + path + "']").length > 0) {
            return;
        }
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.href = path;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        head.appendChild(link);
    },
    js: function (path) {
        if (!path || path.length === 0) {
            throw new Error('argument "path" is required !');
        }
        if ($("script[src^='" + path + "']").length > 0) {
            return;
        }
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.src = path;
        script.type = 'text/javascript';
        head.appendChild(script);
    }
}

// ------------------------------------------------------

$(function () {
    // 加载提示插件
    dynamicLoading.js("/resources/js/common/common.hint.js");
    // 加载状态插件
    dynamicLoading.js("/resources/js/common/common.state.js");

    // 加载公共事件
    load_common_event();

    // 加载JS扩展
    load_js_extend();
});

// ------------------------------------------------------

/**
 * 加载公共事件
 */
function load_common_event() {
    /* 只能是数字*/
    $(document).on('input propertychange', "input.number", function () {
        this.value = this.value.replace(/[^\d]/g, '');
    });
    /* 只能是负号数字*/
    $(document).on('input propertychange', "input.houseNumber", function () {
        this.value = this.value.replace(/[^\d|^\u8d1f]/g, '');
    });
    /* 只能是负号数字*/
    $(document).on('input propertychange', "input.minusNumber", function () {
        var _thisVal = $(this).val();
        _thisVal = _thisVal.replace(/[^\d|.|-]/g, "");
        //清除"数字"和"."以外的字符
        _thisVal = _thisVal.replace(/^\./g, "");
        //验证第一个字符是数字而不是
        _thisVal = _thisVal.replace(/-{2,}/g, "-");
        //只保留第一个. 清除多余的
        _thisVal = _thisVal.replace(/\.{2,}/g, ".");
        //只保留第一个. 清除多余的
        _thisVal = _thisVal.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        //
        _thisVal = _thisVal.replace("-", "$#$").replace(/\-/g, "").replace("$#$", "-");
        //
        _thisVal = _thisVal.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
        //只能输入两个小数
        $(this).val(_thisVal);
    });

    /* 只能是数字和小数点*/
    $(document).on('input propertychange', "input.money", function () {
        var _thisVal = $(this).val();
        _thisVal = _thisVal.replace(/[^\d|.]/g, "");
        //清除"数字"和"."以外的字符
        _thisVal = _thisVal.replace(/^\./g, "");
        //验证第一个字符是数字而不是
        _thisVal = _thisVal.replace(/\.{2,}/g, ".");
        //只保留第一个. 清除多余的
        _thisVal = _thisVal.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        //
        _thisVal = _thisVal.replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
        //只能输入两个小数
        $(this).val(_thisVal);
    });

    /* 金钱*/
    $(document).on('input propertychange', "input.input-money", function () {
        var _thisVal = $(this).val();
        _thisVal = _thisVal.replace(/[^\d|.]/g, "");
        //清除"数字"和"."以外的字符
        _thisVal = _thisVal.replace(/^\./g, "");
        //验证第一个字符是数字而不是
        _thisVal = _thisVal.replace(/\.{2,}/g, ".");
        //只保留第一个. 清除多余的
        _thisVal = _thisVal.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        //
        _thisVal = _thisVal.replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
        //只能输入两个小数
        $(this).val(_thisVal);
    });

    /* 日期 */
    $(document).on('focus', "input.input-date", function () {
        var _minDate = $(this).attr("data-min");
        var _maxDate = $(this).attr("data-max");
        WdatePicker({
            minDate: _minDate,
            maxDate: _maxDate,
            onpicked: function (dp) {
            }
        });
    });

    $(document).on("hover", ".text-long", function () {
        var old_height = $(this).height();
        $(this).addClass("text-long-hover");
        var new_height = $(this).height();
        if (new_height > old_height) {
            $(this).css({
                lineHeight: "24px",
                textAlign: "left"
            });
        }
    });

    $(document).on("mouseout", ".text-long", function () {
        $(this).removeClass("text-long-hover");
    });

    /*
     * 显示数据选项卡
     * <ul class="title-nav">
     * <li class="visited">选中
     * <li class="link">未选中
     */
    $(document).on("click", "ul.title-nav>li.link", function () {
        var index = $(this).index();
        var _thisObj = $("." + $(this).attr("data-id"));
        if (_thisObj.eq(index).is(":visible"))
            return;
        _thisObj.hide().eq(index).show();
        $(this).parent().find("li").removeClass("visited").addClass("link");
        $(this).addClass("visited").removeClass("link");
    });

    /* 公共选择标签  input[type="radio"] */
    $(document).on("click", ".common-radio>input[type='radio']", function () {
        if ($(this).is(":disabled")) {
            return;
        }
        $("input[name='" + $(this).attr("name") + "']").parent().removeClass("common-radio-checked");
        $(this).attr("checked", "checked").parent().addClass("common-radio-checked");
    });

    /* 公共选择标签  input[type="checkbox"] */
    $(document).on("click", ".common-checkbox>input[type='checkbox']", function () {
        if ($(this).is(":checked")) {
            $(this).attr("checked", "checked").parent().addClass("common-checkbox-checked");
        } else {
            $(this).removeAttr("checked").parent().removeClass("common-checkbox-checked");
        }
    });

    /* 公共选择标签  input[type="checkbox"] */
    $(document).on("click", ".common-checkbox>input[type='radio']", function () {
        if ($(this).is(":disabled")) {
            return;
        }
        $("input[name='" + $(this).attr("name") + "']").parent().removeClass("common-checkbox-checked");
        $(this).attr("checked", "checked").parent().addClass("common-checkbox-checked");
        return;
    });

    /* 公共选择标签  input[type="checkbox"] */
    $(document).on("click", ".common-borderbox>input[type='checkbox']", function () {
        if ($(this).is(":disabled")) {
            return;
        }
        if ($(this).is(":checked")) {
            $(this).attr("checked", "checked").parent().addClass("common-borderbox-checked");
        } else {
            $(this).removeAttr("checked").parent().removeClass("common-borderbox-checked");
        }
    });

    /* 公共选择标签  input[type="radio"] */
    $(document).on("click", ".common-borderbox>input[type='radio']", function () {
        if ($(this).is(":disabled")) {
            return;
        }
        $("input[name='" + $(this).attr("name") + "']").parent().removeClass("common-borderbox-checked");
        $(this).attr("checked", "checked").parent().addClass("common-borderbox-checked");
    });

    /* 公共选择标签  input[type="radio"] */
    $(document).on("click", ".box-on-off>input[type=checkbox]", function () {
        if ($(this).is(":disabled")) {
            return;
        }
        var _box = $(this).parent();
        var _data = _box.data().json;
        if ($(this).is(":checked")) {
            $(this).val(_data.on_state).parent().attr("data-title", _data.on).removeClass("box-off").addClass("box-on");
        } else {
            $(this).val(_data.off_state).parent().attr("data-title", _data.off).removeClass("box-on").addClass("box-off");
        }
    });

    /* 绑定图片上传事件*/
    $(document).on("click", ".images-btn", function (e) {
        var _this = $(this);
        var _type = _this.attr("data-type");
        var _url = _this.attr("data-url");
        var _del_url = _this.attr("data-del-url");
        var _id = _this.attr("data-id");
        var _image_type = _this.attr("data-image-type");

        if ($("#upload-box").length > 0) {
            $("#upload-box").remove();
        } else {
            $('<div id="upload-box" class="upload-box"></div>').css({
                top: _this.offset().top,
                left: _this.offset().left + _this.outerWidth() + 10
            }).appendTo("body").find(".file_del").click();

            //		$(document).on("click", function(){ _param.empty().hide(); });
            //		e.stopPropagation();
            //		_type.on("click", function(e) { e.stopPropagation(); });
            imgUploadInit($(this), $("#upload-box"), _type, _url, _del_url, _id, _image_type);
        }
    });

    /* 绑定图片查看*/
    $(document).on("click", ".showboxImg", function () {
        var _this = $(this);
        var imgBox = "";
        $(".showboxImg").each(function (index, data) {
            var _allSrc = $(this).attr("src");
            var _thisSrc = _this.attr("src");
            imgBox += '<img class="' + (_thisSrc == _allSrc ? "img-focus" : "") + '" src="' + $(this).attr("src") + '"/>';
        });
        $(".show-box").remove();
        $("body").append('<div class="show-box">' + '<div class="show-box-head">' + '<button class="box-head-close icon-remove" title="关闭"></button>' + '<button class="img-up icon-chevron-left" title="上一张"></button>' + '<button class="img-next icon-chevron-right" title="下一张"></button>' + '<button class="rotate-right icon-repeat" title="右旋转"></button>' + '<button class="rotate-left icon-undo" title="左旋转"></button>' + '<button class="box-list-btn">图片列表</button>' + '</div>' + '<div class="show-box-list">' + imgBox + '</div>' + '<div class="show-box-main">' + '<div class="main-left"></div>' + '<div class="main-list"><img src="' + $(this).attr("src") + '" /></div>' + '<div class="main-right"></div>' + '</div>' + '</div>');
        $(".box-head-close").on("click", function () {
            $(".show-box").remove();
        });
        $(".box-list-btn").on("click", function () {
            var _list = $(".show-box-list");
            if (_list.is(":hidden")) {
                $(this).css({background: "rgba(0,0,0,0.5)"});
                $(".show-box-list").show();
            } else {
                $(this).css({background: "rgba(0,0,0,0.2)"});
                $(".show-box-list").hide();
            }
        });
        // 旋转-左
        var rotateVal = 0;
        $(".rotate-left").rotate({
            bind: {
                click: function () {
                    rotateVal -= 90;
                    $(".show-box-main>.main-list img").rotate({
                        animateTo: rotateVal,
                    });
                }
            }
        });
        // 旋转-右
        $(".rotate-right").rotate({
            bind: {
                click: function () {
                    rotateVal += 90;
                    $(".show-box-main>.main-list img").rotate({
                        animateTo: rotateVal,
                    });
                }
            }
        });
        // 列表图片绑定点击事件
        $(".show-box-list>img").on("click", function () {
            $(".show-box-list>img").removeClass("img-focus");
            $(this).addClass("img-focus");
            $(".show-box-main .main-list").find("img").attr("src", $(this).attr("src"));
        });
        // 绑定点击隐藏图片列表
        $(".show-box-main .main-list").on("click", function () {
            $(".show-box-list").hide();
        });
        // 图片绑定缩放
        $(".show-box-main .main-list>img").uberZoom({
            width: $(".main-list").width(),
            height: $(".main-list").height(),
        });
        // 上一张图片
        $(".img-up").on("click", function () {
            var _next = $("img.img-focus").prev();
            if (_next.length <= 0) {
                $("img.img-focus").parent().find("img:last").click();
            } else {
                _next.click();
            }
        });
        // 下一张图片
        $(".img-next").on("click", function () {
            var _next = $("img.img-focus").next();
            if (_next.length <= 0) {
                $("img.img-focus").parent().find("img:first").click();
            } else {
                _next.click();
            }
        });
    });

    //
    $(document).on("hover", ".images-box .images-box-img", function () {
        var _del = $(this).find(".images-box-img-delete");
        if (_del.is(":hidden")) {
            if ($(this).attr("data-limit") != "disabled") {
                $(this).find(".images-box-img-delete").show();
            }
        } else {
            $(this).find(".images-box-img-delete").hide();
        }
    });

    /* 删除图片*/
    $(document).on("click", ".images-box-img-delete", function () {
        var _this = $(this);
        var _type = _this.attr("data-type");
        var img_url = _this.attr("data-url");
        var _url = (!isEmpty(_this.attr("data-del-url")) ? _this.attr("data-del-url") : "/contractObject/deleteImage");
        var _id = (!isEmpty(_this.attr("data-id")) ? _this.attr("data-id") : $("#cid").val());

        var _box = $(".images-btn[data-type=" + _type + "]").parent();
        var _parent = _this.parent();
        // 父级div
        // 提示
        swal({
            title: "确定删除图片？",
            type: "info",
            showCancelButton: true
        }, function () {
            $.ajax({
                type: "POST",
                url: _url,
                data: {
                    id: _id,
                    imgUrl: img_url
                },
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                dataType: "json",
                async: true,
                beforeSend: function () {
                    // 删除前先删除图片父级元素
                    _parent.remove();
                },
                success: function (result) {
                    // 现有图片数量
                    var imgLen = _box.find(".images-box-img").length;
                    // 限制图片数量
                    var _limit = returnNumber($("#" + _type + "-limit").text());
                    // 更新现有图片数量标识
                    $("#" + _type + "-count").text(imgLen);
                    // 如果现有图片数量小于限制图片数量，则显示添加图片按钮
                    if (imgLen < _limit) {
                        _box.find(".images-btn").show();
                    }
                }
            });
        });
    });
}

/**
 * 加载JS扩展
 */
function load_js_extend() {
    /** 返回货币格式
     * @param places 保留数
     * @param symbol 前缀
     * @param thousand 千分位
     * @param decimal 小数点
     * @returns {String}
     */
    Number.prototype.formatMoney = function (places, symbol, thousand, decimal) {
        place = !isNaN(places = Math.abs(places)) ? places : 2;
        symbol = symbol !== undefined ? symbol : "";
        thousand = thousand || ",";
        decimal = decimal || ".";
        var number = this, negative = number < 0 ? "-" : "", i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "", j = (j = i.length) > 3 ? j % 3 : 0;
        return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
    };
    /** 空值截取*/
    String.prototype.trim = function () {
        return this.replace(/(^\s*)|(\s*$)/g, "");
    };
    /** toJson*/
    String.prototype.toJson = function () {
        return eval('(' + this + ')');
    };
    /** 空值截取*/
    String.prototype.NoSpace = function () {
        return this.replace(/\s+/g, "");
    };
    /**
     * 指定位置添加字符串
     * @param index 指定位置
     * @param str 字符串
     * @returns {string}
     */
    String.prototype.insert = function (str) {
        return this.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1" + str);
    };
    /** 数组去重*/
    Array.prototype.unique = function () {
        var n = {}, r = [];
        for (var i = 0; i < this.length; i++) {
            if (!n[this[i]]) {
                n[this[i]] = true;
                r.push(this[i]);
            }
        }
        return r;
    };
    /** 删除数组元素 参数:dx删除元素的下标 */
    Array.prototype.remove = function (dx) {
        if (isNaN(dx) || dx > this.length) {
            return false;
        }
        for (var i = 0, n = 0; i < this.length; i++) {
            if (this[i] != this[dx]) {
                this[n++] = this[i]
            }
        }
        this.length -= 1
    };
}

// ------------------------------------------------------

/**
 * 获取图片上传地址
 *
 * @param str
 * @returns {*}
 */
function getImageUploadUrl(str) {
    if (new RegExp(/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/).test(str)) {
        return str.split("?")[0].replace("http://image.cqgjp.com/", "");
    }
    return str;
}

/**
 * 图片上传初始化
 *
 * @param box 载体对象
 * @param type 参数
 * @param url 请求地址
 */
function imgUploadInit(obj, box, type, url, del_url, _id, _image_type) {
    var _parent = obj.parent();

    var limit = returnNumber($("#" + type + "-limit").text());
    // 限制图片数量
    var imgLen = _parent.find(".images-box-img").length;
    // 已有图片数量
    var fileCount = 2;
    //(limit - imgLen);

    box.zyUpload({
        width: "520px", // 宽度
        height: "auto", // 宽度
        itemWidth: "156px", // 文件项的宽度
        itemHeight: "115px", // 文件项的高度
        url: (isEmpty(url) ? "/contractObject/uploadFile" : url), // 上传文件的路径
        fileType: ["jpg", "png", "gif", "bmp", "jpeg"], // 上传文件的类型
        fileSize: 20 * 1024 * 1000, // 上传文件的大小
        multiple: true, // 是否可以多个文件上传
        dragDrop: true, // 是否可以拖动上传文件
        tailor: false, // 是否可以裁剪图片
        del: true, // 是否可以删除文件
        finishDel: true, // 是否在上传文件完成后删除预览
        fileCount: fileCount, // 文件限制数量
        type: (isEmpty(type) ? "temp" : type), // 请求参数类型
        onSuccess: function (file, response) {
            result = eval("(" + response + ")");
            if (result.code == 200) {
                _parent.append('<div class="images-box-img" data-type="' + type + '">' + '<img class="showboxImg" name="' + type + '" src="' + result.data.url + '" data-url="' + result.data.key + '">' + '<span class="images-box-img-delete" data-url="' + result.data.key + '" data-type="' + type + '" data-id="' + _id + '" data-del-url="' + returnValue(del_url) + '">删除</span>' + '</div>');
                imgLen = _parent.find(".images-box-img").length;
                if (imgLen >= limit) {
                    _parent.find(".images-btn").hide();
                }
                $("#" + type + "-count").text(imgLen);
                box.remove();
                //
                if (!isEmpty(_id)) {
                    $.ajax({
                        type: "POST",
                        url: "/customer/updateCustomerImage",
                        data: {
                            id: _id,
                            path: result.data.url
                        },
                        dataType: "json"
                    });
                }
            }
        },
        onFailure: function (file, response) {
            console.log("上传失败");
        }
    });
}

/**
 * 获取年龄
 * @param param
 */
function getAgeByCard(param) {
    var myDate = new Date();
    var month = myDate.getMonth() + 1;
    var day = myDate.getDate();
    var age = myDate.getFullYear() - param.substring(6, 10) - 1;
    if (param.substring(10, 12) < month || param.substring(10, 12) == month && param.substring(12, 14) <= day) {
        age++;
    }
    return age;
}

/**
 * 毫秒转换为日期格式
 * @param time 时间/时间字符串
 * @param format 时间格式 "yyyy-MM-dd" || "yyyy-MM-dd HH:mm:ss"
 * @returns
 */
function format(time, format) {
    if (isEmpty(time)) {
        return "";
    }
    var t = new Date(time);
    var tf = function (i) {
        return (i < 10 ? '0' : '') + i
    };
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
        switch (a) {
            case 'yyyy':
                return tf(t.getFullYear());
                break;
            case 'MM':
                return tf(t.getMonth() + 1);
                break;
            case 'mm':
                return tf(t.getMinutes());
                break;
            case 'dd':
                return tf(t.getDate());
                break;
            case 'HH':
                return tf(t.getHours());
                break;
            case 'ss':
                return tf(t.getSeconds());
                break;
        }
    });
}

/** 是否为空 */
function isEmpty(str) {
    return str === null || typeof str === "undefined" || str === "" || str === "undefined" || str === "null" || str.length === 0 || str === {};
};

/** 是否为邮箱 */
function isEmail(str) {
    var reg = /^([a-zA-Z0-9_.\-])+@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return reg.test(str);
};

/** 是否为手机号码 */
function isPhone(str) {
    var reg = /(^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{8})$|(^[1][3456789][0-9]{9})$/;
    return reg.test(str);
};

/**
 * 身份证验证(严格验证)
 * 身份证15位编码规则：dddddd yymmdd xx p<br>
 * dddddd：6位地区编码<br>
 * yymmdd: 出生年(两位年)月日，如：910215<br>
 * xx: 顺序编码，系统产生，无法确定<br>
 * p: 性别，奇数为男，偶数为女<br><br>
 *
 * 身份证18位编码规则：dddddd yyyymmdd xxx y<br>
 * dddddd：6位地区编码<br>
 * yyyymmdd: 出生年(四位年)月日，如：19910215<br>
 * xxx：顺序编码，系统产生，无法确定，奇数为男，偶数为女<br>
 * y: 校验码，该位数值可通过前17位计算获得<br><br>
 *
 * 前17位号码加权因子为 Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ]<br>
 * 验证位 Y = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ]<br>
 * 如果验证码恰好是10，为了保证身份证是十八位，那么第十八位将用X来代替<br>
 * 校验位计算公式：Y_P = mod( ∑(Ai×Wi),11 )<br>
 * i为身份证号码1...17 位; Y_P为校验码Y所在校验码数组位置<br>
 */
function isIDCard(idCard) {
    // 15位和18位身份证号码的正则表达式
    var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;

    // 如果通过该验证，说明身份证格式正确，但准确性还需计算
    if (regIdCard.test(idCard)) {
        if (idCard.length == 18) {
            var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            // 将前17位加权因子保存在数组里
            var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2);
            // 这是除以11后，可能产生的11位余数、验证码，也保存成数组
            var idCardWiSum = 0;
            // 用来保存前17位各自乖以加权因子后的总和
            for (var i = 0; i < 17; i++) {
                idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
            }

            var idCardMod = idCardWiSum % 11;
            // 计算出校验码所在数组的位置
            var idCardLast = idCard.substring(17);
            // 得到最后一位身份证号码

            // 如果等于2，则说明校验码是10，身份证号码最后一位应该是X
            if (idCardMod == 2) {
                if (idCardLast == "X" || idCardLast == "x") {
                    return true;
                } else {
                    return false;
                }
            } else {
                // 用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                if (idCardLast == idCardY[idCardMod]) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    } else {
        return false;
    }
}

/** 小写转大写*/
function toUpperCase(obj) {
    obj.value = obj.value.toUpperCase();
}

/** 是否生日*/
function isBirthday(str) {
    var boo = isIDCard(str);
    if (boo) {
        var birthday_month = str.substring(10, 12);
        var birthday_day = str.substring(12, 14);
        var now_date = new Date(returnDate(new Date()));
        var birthday_date = new Date(now_date.getFullYear() + '-' + birthday_month + '-' + birthday_day);
        boo = (now_date.getTime() - birthday_date.getTime() == 0);
    }
    return boo;
}

/**
 * 票据打印
 * <p>
 * [{
 * 	    code : '', 				// 编号
 * 	    name : '', 				// 客户姓名
 * 	    address : '',			// 房号
 * 	    date : '', 				// 日期[可为空]
 * 	    items : [{
 * 	    	name : '', 			// 款项类型
 * 	    	desc : '', 			// 款项说明
 * 	    	value : '', 		// 金额
 * 	    	date : '', 			// 日期
 * 	    }]
 * 	    person : {
 * 			p1 : '',
 * 			...
 * 			pn : ''
 * 		}, 						// 人员
 * }]
 * @param param
 * @returns {commonBillPrint}
 */
function commonBillPrint(params, callback) {
    params = $.extend({
        title: '重庆管家婆房屋托管中心专用收据',
        subTitle: '收款凭证',
        maxLine: 5,
        list: []
    }, params);

    var html = '';
    html += '<div id="printBox">';
    $.each(params.list, function (index, data) {
        // 设置日期
        params.list[index].date = params.list[index].date || data.items[0].date;
        // 人员
        var list_person = params.list[index].person || "";
        // 计算页数
        var page_size = Math.ceil(data.items.length / params.maxLine);
        // 计算总金额
        var cg_boo = true;
        // 计算总金额
        var total_money = 0;
        $.each(data.items, function (index, data) {
            total_money += returnFloat(data.value);
        });

        // 页数
        for (var i = 0; i < page_size; i++) {
            var j_index = i * params.maxLine;
            var j_len = j_index + params.maxLine;

            html += '<div class="tablePrint" data-page="' + (index + 1) + '" data-index="' + (i + 1) + '">';
            html += '	<table style="border-collapse: collapse; width: 730px; height:400px; position: relative;">';
            html += '		<thead>';
            html += '       	<tr>';
            html += '       		<td colspan="2"></td>';
            html += '               <td colspan="4" style="height: 25px; font-size: 20px; line-height: 25px;text-align: center; color: #E74C3C;">' + returnValue(params.title) + '</td>';
            html += '               <td><input style="width: 50px; border:none;" value="" readonly="readonly"/></td>';
            html += '               <td><input style="width: 50px; border:none;" value="" readonly="readonly"/></td>';
            html += '           </tr>';
            html += '           <tr>';
            html += '               <td colspan="2"></td>';
            html += '               <td colspan="4" style="height:4px; text-align: center; color: #E74C3C; border-bottom: 1px solid #666; border-top: 1px solid #666;"></td>';
            html += '               <td></td>';
            html += '               <td></td>';
            html += '           </tr>';
            html += '           <tr>';
            html += '               <td colspan="2"></td>';
            html += '               <td colspan="4" style=" height: 25px; font-size: 20px; line-height: 25px; text-align: center; color: #E74C3C;">' + returnValue(params.subTitle) + '</td>';
            html += '               <td colspan="2" style="height: 25px; line-height: 25px; text-align: right;">NO.<span style="color: #E74C3C; font-size: 16px;">' + data.code + '</span></td>';
            html += '           </tr>';
            html += '           <tr>';
            html += '               <td colspan="2" style=" width:180px; height: 28px; line-height: 28px; font-size: 15px;">客户姓名：' + data.name + '</td>';
            html += '               <td colspan="4" style=" width:auto; height: 28px; line-height: 28px; font-size: 15px;">房号：' + data.address + '</td>';
            html += '               <td colspan="2" style=" width:160px; height: 28px; line-height: 28px; font-size: 15px; text-align: right;">日期：' + data.date + '</td>';
            html += '           </tr>';
            html += '       </thead>';
            html += '		<tbody style="position: relative;">';
            html += '			<tr>';
            html += '               <td colspan="2" style="border: 1px solid #000; height: 28px; line-height: 28px; text-align: center; font-size: 15px;">款项类型</td>';
            html += '               <td colspan="5" style=" border: 1px solid #000; height: 28px; line-height: 28px; text-align: center; font-size: 15px;">款项说明</td>';
            html += '               <td style=" border: 1px solid #000; height: 28px; line-height: 28px; text-align: center; font-size: 15px;">金额</td>';
            html += '           </tr>';
            // 列表数据赋值
            for (var j = j_index; j < j_len; j++) {
                var item = data.items[j];
                if (!isEmpty(item)) {
                    html += '<tr>';
                    html += '	<td colspan="2" style="border: 1px solid #000; height: 22px; line-height: 22px; text-align: center; font-size: 15px;">' + returnValue(item.name) + '</td>';
                    html += '	<td colspan="5" style="border: 1px solid #000; height: 22px; line-height: 22px; font-size: 15px; text-align: left; text-indent: 10px;">' + returnValue(item.desc) + '</td>';
                    html += '	<td style="border: 1px solid #000; height: 22px; line-height: 22px; text-align: center; font-size: 15px;">' + returnFloat(item.value, 2, true) + '</td>';
                    if (cg_boo) {
                        html += '<td rowspan="6">';
                        html += '	<label style="width: 22px;display: block;text-align: center;line-height: 16px;font-size: 12px;padding-bottom: 4px;">白存根</label>';
                        html += '	<label style="width: 22px;display: block;text-align: center;line-height: 16px;font-size: 12px;padding-bottom: 4px;">红客户</label>';
                        html += '	<label style="width: 22px;display: block;text-align: center;line-height: 16px;font-size: 12px;padding-bottom: 4px;">黄财务</label>';
                        html += '</td>';
                        cg_boo = false;
                    }
                    html += '</tr>';
                } else {
                    html += '<tr>';
                    html += '	<td colspan="2" style="border: 1px solid #000; height: 22px; line-height: 22px; text-align: center; font-size: 15px;"></td>';
                    html += '	<td colspan="5" style="border: 1px solid #000; height: 22px; line-height: 22px; font-size: 15px; text-align: left; text-indent: 10px;"></td>';
                    html += '	<td style="border: 1px solid #000; height: 22px; line-height: 22px; text-align: center; font-size: 15px;"></td>';
                    html += '</tr>';
                }
            }
            // 最后一页数据赋值
            if (i == (page_size - 1)) {
                html += '        <tr>';
                html += '        	<td colspan="7" style="border: 1px solid #000; height: 28px; line-height: 28px; font-size: 15px; text-align: left; text-indent: 10px;">人民币(大写)：' + returnToUpperMoney(total_money) + '</td>';
                html += '        	<td style="border: 1px solid #000; height: 28px; line-height: 28px; text-align: center; font-size: 15px;">￥' + returnFloat(total_money, 2, true) + '</td>';
                html += '        </tr>';
            } else {
                html += '        <tr>';
                html += '        	<td colspan="7" style="border: 1px solid #000; height: 28px; line-height: 28px; font-size: 15px; text-align: left; text-indent: 10px;"></td>';
                html += '        	<td style="border: 1px solid #000; height: 28px; line-height: 28px; text-align: center; font-size: 15px;"></td>';
                html += '        </tr>';
            }
            html += '        <tr>';
            html += '        	<td colspan="8" style="border: 1px solid #000; height: 28px; line-height: 28px; font-size: 15px; text-align: left; text-indent: 10px;">注:机打收据，手写无效，盖章后生效</td>';
            html += '        </tr>';
            html += '    </tbody>';
            html += '    <tfoot style="font-size: 14px;">';
            html += '    	<tr style=" height: 35px;">';
            html += '    		<td colspan="8">';
            html += '    			<div style="display:flex;width:100%;">';
            html += '    				<span style="flex: 1;width: 170px">经办人：' + returnValue(list_person.p1) + '</span>';
            html += '    				<span style="flex: 1;width: 170px">审核人：' + returnValue(list_person.p2) + '</span>';
            html += '    				<span style="flex: 1;width: 170px">复核人：' + returnValue(list_person.p3) + '</span>';
            html += '    				<span style="flex: 1;width: 170px">客户' + (isEmpty(list_person.p4_remark) ? "" : "(" + list_person.p4_remark + ")") + '：</span>';
            html += '    			</div>';
            html += '    		</td>';
            html += '    	</tr>';
            html += '    	<tr style=" height: 35px;">';
            html += '    		<td colspan="8" style=" text-align: right;">' + returnTime(new Date()) + ' 第' + returnNumber(isEmpty(params.list[index].printNum) ? 1 : params.list[index].printNum) + '次打印</td>';
            html += '    	</tr>';
            html += '    </tfoot>';
            html += '    </table>';
            html += '</div>';
        }
    });
    html += '</div>';

    var lodop = getLodop();
    lodop.PRINT_INIT("票据打印");
    $(html).find(".tablePrint").each(function (index) {
        lodop.ADD_PRINT_TABLE(30, 17, "100%", 400, $(this).html());
        lodop.ADD_PRINT_TEXT(10, 700, 100, 22, ($(this).attr("data-page") + "-" + $(this).attr("data-index")));
        lodop.NewPageA();//分页
    });
    if (lodop.CVERSION) {
        lodop.On_Return = function (TaskID, value) {
            if (callback) callback(TaskID, value);
        };
    }
    lodop.PREVIEW();
    return this;
}

/** 为空替换 如果str为空，则返回replace*/
function returnNullReplace(str, replace) {
    return isEmpty(str) ? replace : returnValue(str);
}

/** 返回true|false*/
function isTrue(str) {
    return str == 'true' || str == true;
}

function returnEmpty(str) {
    return str === null || typeof str === "undefined" || str === "" || str === "undefined" || str === "null" || str.length === 0 || str === {};
}

/** 返回数字 */
function returnFloat(str, dec, qz) {
    if (str == null || str == "" || typeof (str) == "undefined") {
        return 0;
    }
    if (isNaN((str + "").replace(/[^\d.-]/g, ""))) {
        return 0;
    }
    var decs = dec || 2;
    var val = parseFloat((str + "").replace(/[^\d.-]/g, "")).toFixed(decs);
    qz = qz || false;
    if (!qz) {
        val = parseFloat(val.replace(".00", ""));
    }
    return val;
}

/** 返回货币格式
 * @param s 参数
 * @returns {String}
 */
function returnMoney(s) {
    s = parseFloat((returnFloat(s) + "").replace(/[^\d.-]/g, "")).toFixed(2) + "";
    var boo = s.indexOf("-") > -1;
    if (boo) {
        s = s.replace("-", "");
    }
    var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1], t = "";
    for (i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    var result = t.split("").reverse().join("") + "." + r;
    if (boo) {
        result = "-" + result;
    }
    return result.replace(".00", "");
}

/** 返回货币格式
 * @param s 参数
 * @param n 小数保留数
 * @returns {String}
 */
function returnMoney(s, n) {
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((returnFloat(s) + "").replace(/[^\d.-]/g, "")).toFixed(n) + "";
    var boo = s.indexOf("-") > -1;
    if (boo) {
        s = s.replace("-", "");
    }
    var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1], t = "";
    for (i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    var result = t.split("").reverse().join("") + "." + r;
    if (boo) {
        result = "-" + result;
    }
    return result;
}

/** 返回数字 */
function returnNumber(str) {
    return (str == null || str == "" || typeof (str) == "undefined") ? 0 : parseInt(str);
}

/** 返回字符串 */
function returnValue(str) {
    return (str == null || typeof (str) == "undefined" || str == "undefined") ? "" : str + "";
}

/** 返回日期 2016-01-01*/
function returnDate(time, format) {
    if (isEmpty(time)) {
        return "";
    }
    var t = new Date(time);
    var tf = function (i) {
        return (i < 10 ? '0' : '') + i;
    };
    return (format || "yyyy-MM-dd").replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
        switch (a) {
            case 'yyyy':
                return tf(t.getFullYear());
                break;
            case 'MM':
                return tf(t.getMonth() + 1);
                break;
            case 'mm':
                return tf(t.getMinutes());
                break;
            case 'dd':
                return tf(t.getDate());
                break;
            case 'HH':
                return tf(t.getHours());
                break;
            case 'ss':
                return tf(t.getSeconds());
                break;
        }
    });
}

/** 返回时间 2016-01-01 00:00:01*/
function returnTime(time) {
    if (isEmpty(time)) {
        return "";
    }
    var t = new Date(time);
    var tf = function (i) {
        return (i < 10 ? '0' : '') + i;
    };
    return "yyyy-MM-dd HH:mm:ss".replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
        switch (a) {
            case 'yyyy':
                return tf(t.getFullYear());
                break;
            case 'MM':
                return tf(t.getMonth() + 1);
                break;
            case 'mm':
                return tf(t.getMinutes());
                break;
            case 'dd':
                return tf(t.getDate());
                break;
            case 'HH':
                return tf(t.getHours());
                break;
            case 'ss':
                return tf(t.getSeconds());
                break;
        }
    });
}

/** 返回日*/
function returnDay(start, end) {
    var d = {};
    var startDate = new Date(returnDate(start)).getTime();
    var endDate = new Date(returnDate(end)).getTime();
    return returnNumber((endDate - startDate) / (24 * 60 * 60 * 1000));
}

/** 返回年月日*/
function returnYearMonthDay(start, end) {
    var d = {};
    var startDate = new Date(start);
    var endDate = new Date(end);
    endDate = new Date(endDate.setDate(endDate.getDate()));
    if (startDate.getTime() > endDate.getTime()) {
        return "";
    }
    if (startDate.getTime() == endDate.getTime()) {
        return "0天";
    }
    // 年
    var dYear = endDate.getFullYear() - startDate.getFullYear();
    d.year = dYear;
    // 月
    var dMonth = endDate.getMonth() - startDate.getMonth();
    if (dMonth < 0) {
        d.year = d.year - 1;
        d.month = dMonth + 12;
    } else {
        d.month = dMonth;
    }
    // 日
    var dDay = endDate.getDate() - startDate.getDate();
    var boo = false;
    if (dDay < 0) {
        if (d.month <= 0) {
            d.year = d.year - 1;
            d.month = 12 - 1;
        } else {
            d.month = d.month - 1;
        }
        var plusMonth = 30;
        if (dDay >= -1) {
            var currMonth = endDate.getMonth() - 1;
            if (currMonth == -1 || currMonth == 0 || currMonth == 2 || currMonth == 4 || currMonth == 6 || currMonth == 7 || currMonth == 9) {
                plusMonth = 31;
            }
        }
        d.day = plusMonth + dDay + 1;
    } else {
        d.day = dDay + 1;

        var diffDate = new Date(startDate.setFullYear(startDate.getFullYear() + d.year));
        diffDate = new Date(diffDate.setMonth(diffDate.getMonth() + d.month + 1));
        diffDate = new Date(diffDate.setDate(diffDate.getDate() - 1));
        if (endDate.getTime() == diffDate.getTime()) {
            boo = true;
        }
    }
    // 当日期-30大于等于0时，需要逆推
    if (d.day - 30 >= 0 || boo) {
        d.month = d.month + 1;
        d.day = 0;
        if (d.month == 12) {
            d.year = d.year + 1;
            d.month = d.month - 12;
        }
    }
    var new_date = "";
    if (d.year != 0) {
        new_date += d.year + "年";
    }
    if (d.month != 0) {
        new_date += d.month + "个月";
    }
    if (d.day != 0) {
        new_date += d.day + "天";
    }
    return new_date;
}

/** 返回年月日*/
function returnBusinessYMD(start, end, mode) {
    var d = {};
    var startDate = new Date(start);
    var endDate = new Date(end);
    endDate = new Date(endDate.setDate(endDate.getDate()));
    if (startDate.getTime() > endDate.getTime()) {
        return "";
    }
    if (startDate.getTime() == endDate.getTime()) {
        return "0天";
    }
    // 年
    var dYear = endDate.getFullYear() - startDate.getFullYear();
    d.year = dYear;
    // 月
    var dMonth = endDate.getMonth() - startDate.getMonth();
    if (dMonth < 0) {
        d.year = d.year - 1;
        d.month = dMonth + 12;
    } else {
        d.month = dMonth;
    }
    // 日
    var dDay = endDate.getDate() - startDate.getDate();
    var boo = false;
    if (dDay < 0) {
        if (d.month <= 0) {
            d.year = d.year - 1;
            d.month = 12 - 1;
        } else {
            d.month = d.month - 1;
        }
        var plusMonth = 30;
        if (dDay >= -1) {
            var currMonth = endDate.getMonth() - 1;
            if (currMonth == -1 || currMonth == 0 || currMonth == 2 || currMonth == 4 || currMonth == 6 || currMonth == 7 || currMonth == 9) {
                plusMonth = 31;
            }
        }
        d.day = plusMonth + dDay + 1;
    } else {
        d.day = dDay + 1;

        var diffDate = new Date(startDate.setFullYear(startDate.getFullYear() + d.year));
        diffDate = new Date(diffDate.setMonth(diffDate.getMonth() + d.month + 1));
        diffDate = new Date(diffDate.setDate(diffDate.getDate() - 1));
        if (endDate.getTime() == diffDate.getTime()) {
            boo = true;
        }
    }
    // 当日期-30大于等于0时，需要逆推
    if (d.day - 30 >= 0 || boo) {
        d.month = d.month + 1;
        d.day = 0;
        if (d.month == 12) {
            d.year = d.year + 1;
            d.month = d.month - 12;
        }
    }
    var new_date = "";
    if (d.year != 0) {
        new_date += d.year + "年";
    }
    if (d.month != 0) {
        new_date += d.month + "个月";
    }
    if (d.day != 0) {
        new_date += d.day + "天";
    }
    return new_date;
}

/** 返回年月日*/
function returnYearMonthDayData(start, end, mode) {
    var d = {};
    var startDate = new Date(start);
    var endDate = new Date(end);
    endDate = new Date(endDate.setDate(endDate.getDate()));
    if (startDate.getTime() > endDate.getTime()) {
        return d;
    }
    if (startDate.getTime() == endDate.getTime()) {
        return d;
    }
    // 年
    var dYear = endDate.getFullYear() - startDate.getFullYear();
    d.year = dYear;
    // 月
    var dMonth = endDate.getMonth() - startDate.getMonth();
    if (dMonth < 0) {
        d.year = d.year - 1;
        d.month = dMonth + 12;
    } else {
        d.month = dMonth;
    }
    // 日
    var dDay = endDate.getDate() - startDate.getDate();
    var boo = false;
    if (dDay < 0) {
        if (d.month <= 0) {
            d.year = d.year - 1;
            d.month = 12 - 1;
        } else {
            d.month = d.month - 1;
        }
        var plusMonth = 30;
        if (dDay >= -1) {
            var currMonth = endDate.getMonth() - 1;
            if (currMonth == -1 || currMonth == 0 || currMonth == 2 || currMonth == 4 || currMonth == 6 || currMonth == 7 || currMonth == 9) {
                plusMonth = 31;
            }
        }
        d.day = plusMonth + dDay + 1;
    } else {
        d.day = dDay + 1;

        var diffDate = new Date(startDate.setFullYear(startDate.getFullYear() + d.year));
        diffDate = new Date(diffDate.setMonth(diffDate.getMonth() + d.month + 1));
        diffDate = new Date(diffDate.setDate(diffDate.getDate() - 1));
        if (endDate.getTime() == diffDate.getTime()) {
            boo = true;
        }
    }
    // 当日期-30大于等于0时，需要逆推
    if (d.day - 30 >= 0 || boo) {
        d.month = d.month + 1;
        d.day = 0;
        if (d.month == 12) {
            d.year = d.year + 1;
            d.month = d.month - 12;
        }
    }
    return d;
}

/** 返回房屋托管状态*/
function returnHouseTGState(param) {
    var _data = {};
    switch (param) {
        case "":
            _data.title = "未签";
            _data.color = "error";
            break;
        case "未签合同":
            _data.title = "未签";
            _data.color = "error";
            break;
        case "已签合同":
            _data.title = "已签";
            _data.color = "next";
            break;
        default:
            _data.title = "完善中";
            _data.color = "hint";
            break;
    }
    return _data;
}

/** 返回合同扩展状态*/
function returnContractExtendState(param) {
    var data = {};
    data.list = {
        10: '新存房',
        12: '续约存房',
        13: '改签存房',
        20: '新出房',
        21: '改签出房',
        22: '续约出房',
        25: '转租出房',
        26: '退租出房',
        27: '强收出房',
        29: '换房出房'
    };
    data.text = data.list[param];
    switch (param) {
        case 10 :
            data.style = "ok";
            break;
        case 12 :
            data.style = "next";
            break;
        case 13 :
            data.style = "next";
            break;
        case 20 :
            data.style = "ok";
            break;
        case 21 :
            data.style = "next";
            break;
        case 22 :
            data.style = "next";
            break;
        case 23 :
            data.style = "next";
            break;
        case 25 :
            data.style = "next";
            break;
        case 26 :
            data.style = "next";
            break;
        case 27 :
            data.style = "next";
            break;
        case 29 :
            data.style = "next";
            break;
    }
    return data;
}

/** 返回合同扩展状态*/
function returnContractExtendStateStr(param) {
    var data = {};
    data.list = {
        10: '新存房',
        12: '续约存房',
        13: '改签存房',
        20: '新出房',
        21: '改签出房',
        22: '续约出房',
        23: '到期出房',
        25: '转租出房',
        26: '退租出房',
        27: '强收出房',
        29: '换房出房'
    };
    data.text = data.list[param];
    switch (param) {
        case "新存房" :
            _data.style = "ok";
            break;
        case "续约存房" :
            _data.style = "next";
            break;
        case "改签存房" :
            _data.style = "error";
            break;
        case "新出房" :
            _data.style = "ok";
            break;
        case "到期出房" :
            _data.style = "next";
            break;
        case "续约出房" :
            _data.style = "next";
            break;
        case "转租出房" :
            _data.style = "next";
            break;
        case "退租出房" :
            _data.style = "next";
            break;
        case "强收出房" :
            _data.style = "next";
            break;
        case "换房出房" :
            _data.style = "next";
            break;
    }
    return _data;
}

/** 返回合同状态*/
function returnContractStateStr(param) {
    var _data = {};
    switch (param) {
        case "审核":
            _data.title = "审核";
            _data.color = "hint";
            break;
        case "生效" :
            _data.title = "生效";
            _data.color = "ok";
            break;
        case "失效" :
            _data.title = "失效";
            _data.color = "error";
            break;
        case "作废" :
            _data.title = "作废";
            _data.color = "error";
            break;
    }
    return _data;
}

/** 返回合同操作状态*/
function returnContractOptionStateStr(param) {
    var _data = {};
    switch (param) {
        case "编辑" :
            _data.title = "编辑";
            _data.color = "hint";
            _data.image = "sh-iocn-bj";
            break;
        case "待审核" :
            _data.title = "待审核";
            _data.color = "next";
            _data.image = "sh-iocn-dsh";
            break;
        case "审核通过" :
            _data.title = "审核通过";
            _data.color = "next";
            _data.image = "sh-iocn-dsh";
            break;
        case "审核未通过" :
            _data.title = "审核未通过";
            _data.color = "error";
            _data.image = "sh-iocn-wtg";
            break;
        case "待复核" :
            _data.title = "待复核";
            _data.color = "next";
            _data.image = "sh-iocn-dfh";
            break;
        case "复核未通过" :
            _data.title = "复核未通过";
            _data.color = "error";
            _data.image = "sh-iocn-wtg";
            break;
        case "已复核" :
            _data.title = "已复核";
            _data.color = "ok";
            _data.image = "sh-iocn-sx";
            break;
        case "作废" :
            _data.title = "作废";
            _data.color = "error";
            _data.image = "";
            break;
        case "续约" :
            _data.title = "续约";
            _data.color = "next";
            break;
        case "到期" :
            _data.title = "到期";
            _data.color = "next";
            _data.image = "sh-iocn-dsh";
            break;
        case "到期申请" :
            _data.title = "到期申请";
            _data.color = "next";
            break;
        case "到期处理中" :
            _data.title = "到期处理中";
            _data.color = "next";
            break;
        case "到期处理完成" :
            _data.title = "到期处理完成";
            _data.color = "next";
            break;
        case "解约申请" :
            _data.title = "解约申请";
            _data.color = "next";
            break;
        case "解约中" :
            _data.title = "解约中";
            _data.color = "next";
            break;
        case "解约完成" :
            _data.title = "解约完成";
            _data.color = "error";
            break;
        case "转租申请" :
            _data.title = "转租申请";
            _data.color = "next";
            break;
        case "转租中" :
            _data.title = "转租中";
            _data.color = "next";
            break;
        case "转租完成" :
            _data.title = "转租完成";
            _data.color = "next";
            break;
        case "强退申请" :
            _data.title = "强退申请";
            _data.color = "next";
            break;
        case "强退中" :
            _data.title = "强退中";
            _data.color = "next";
            break;
        case "强退完成" :
            _data.title = "强退完成";
            _data.color = "next";
            break;
        case "强收申请" :
            _data.title = "强收申请";
            _data.color = "next";
            break;
        case "强收中" :
            _data.title = "强收中";
            _data.color = "next";
            break;
        case "强收完成" :
            _data.title = "强收完成";
            _data.color = "next";
            break;
        case "代偿申请" :
            _data.title = "代偿申请";
            _data.color = "next";
            break;
        case "代偿中" :
            _data.title = "代偿中";
            _data.color = "next";
            break;
        case "代偿完成" :
            _data.title = "代偿完成";
            _data.color = "next";
            break;
        case "换房申请" :
            _data.title = "换房申请";
            _data.color = "next";
            break;
        case "换房中" :
            _data.title = "换房中";
            _data.color = "next";
            break;
        case "换房成功" :
            _data.title = "换房成功";
            _data.color = "next";
            break;
    }
    return _data;
}

/** 返回合约状态*/
function returnCancelContractState(param) {
    var _data = {};
    switch (param) {
        case "待审核":
            _data.title = "待审核";
            _data.color = "next";
            break;
        case "审核未通过":
            _data.title = "审核未通过";
            _data.color = "error";
            break;
        case "待交接":
            _data.title = "待交接";
            _data.color = "next";
            break;
        case "待结算":
            _data.title = "待结算";
            _data.color = "next";
            break;
        case "结算完成":
            _data.title = "结算完成";
            _data.color = "hint";
            break;
        case "待复审":
            _data.title = "结算审核";
            _data.color = "hint";
            break;
        case "复审未通过":
            _data.title = "结算审核未通过";
            _data.color = "error";
            break;
        case "待复核":
            _data.title = "待复核";
            _data.color = "next";
            break;
        case "复核未通过":
            _data.title = "复核未通过";
            _data.color = "error";
            break;
        case "完成":
            _data.title = "完成";
            _data.color = "ok";
            break;
        case "取消":
            _data.title = "取消";
            _data.color = "error";
            break;
    }
    return _data;
}

/** 返回房屋状态*/
function returnHouseState(param) {
    var _data = {};
    switch (param) {
        case 'free' :
            _data.title = "未租";
            _data.color = "ok";
            break;
        case 'rental' :
            _data.title = "已租";
            _data.color = "error";
            break;
        case 'expire' :
            _data.title = "托管解约";
            _data.color = "disabled";
            break;
        default:
            _data.title = "未发布";
            _data.color = "hint";
            break;
    }
    return _data;
}

/** 返回房屋招租状态*/
function returnHouseForRentState(param) {
    var _data = {};
    switch (param) {
        case 1001 :
            _data._title = "新存招租";
            _data._class = "ok";
            break;
        case 1002 :
            _data._title = "转租招租";
            _data._class = "ok";
            break;
        case 1003 :
            _data._title = "强退招租";
            _data._class = "ok";
            break;
        case 1004 :
            _data._title = "到期招租";
            _data._class = "ok";
            break;
        case 1005 :
            _data._title = "强收招租";
            _data._class = "ok";
            break;
        case 1006 :
            _data._title = "换房招租";
            _data._class = "ok";
            break;
        case 1020 :
            _data._title = "停止招租";
            _data._class = "error";
            break;
        case 1021 :
            _data._title = "已解约";
            _data._class = "error";
            break;
        case 2000 :
            _data._title = "暂停招租";
            _data._class = "hint";
            break;
        default:
            _data._title = "无";
            _data._class = "";
            break;
    }
    return _data;
}

/** 返回合同类型*/
function returnBillType(param, boo) {
    boo = boo || false;
    switch (param) {
        case 0:
            return boo ? "综合" : "租金";
            break;
        case 1:
            return "押金";
            break;
        case 2:
            return "包修费";
            break;
        case 3:
            return "服务费";
            break;
        case 4:
            return "维修费";
            break;
        case 5:
            return "保洁费";
            break;
        case 6:
            return "水费";
            break;
        case 7:
            return "电费";
            break;
        case 8:
            return "燃气费";
            break;
        case 9:
            return "物管费";
            break;
        case 10:
            return "宽带费";
            break;
        case 11:
            return "往期结余";
            break;
        case 12:
            return "未收款";
            break;
        case 13:
            return "滞纳金";
            break;
        case 14:
            return "免租期";
            break;
        case 15:
            return "管理费";
            break;
        case 16:
            return "材料费";
            break;
        case 17:
            return "滞纳金";
            break;
        case 18:
            return "定金";
            break;
        default:
            return "其他费用";
            break;
    }
}

/** 返回格式化手机号*/
function returnFormatPhone(p) {
    return isEmpty(p) ? '' : (p.substring(0, 3) + " " + p.substring(3, 7) + " " + p.substring(7, 11));
}

/** 过滤非数字*/
function filterUnNumber(str) {
    return returnValue(str).replace(/[^0-9]+/g, '');
}

/** 复选框列表化*/
function checkboxList(_name) {
    $(document).on("change", "[name=" + _name + "]", function () {
        var _this = $(this);

        if (_this.attr("data-type") == "all") {
            if (this.checked) {
                $('[name=' + this.name + ']').not(":disabled").attr("checked", "checked").parent().addClass("table-checkbox-checked");
            } else {
                $('[name=' + this.name + ']').not(":disabled").removeAttr("checked").parent().removeClass("table-checkbox-checked");
            }
        } else {
            var all_check_length = $('[name=' + this.name + ']').not('[name=' + this.name + '][data-type=all]').length;
            var all_checked_length = $('[name=' + this.name + ']:checked').not('[name=' + this.name + '][data-type=all]').length;

            if (this.checked) {
                _this.parent().addClass("table-checkbox-checked");
                if (all_check_length == all_checked_length) {
                    $('[name=' + this.name + '][data-type=all]').attr("checked", "checked").parent().addClass("table-checkbox-checked");
                }
            } else {
                _this.parent().removeClass("table-checkbox-checked");
                if (all_check_length != all_checked_length) {
                    $('[name=' + this.name + '][data-type=all]').removeAttr("checked").parent().removeClass("table-checkbox-checked");
                }
            }
        }
    });
}

/** 转人民币大写*/
function returnToUpperMoney(currencyDigits) {
    if (currencyDigits == null) {
        return 0;
    }
    // Constants:
    var MAXIMUM_NUMBER = 99999999999.99;
    // Predefine the radix characters and currency symbols for output:
    var CN_ZERO = "零";
    var CN_ONE = "壹";
    var CN_TWO = "贰";
    var CN_THREE = "叁";
    var CN_FOUR = "肆";
    var CN_FIVE = "伍";
    var CN_SIX = "陆";
    var CN_SEVEN = "柒";
    var CN_EIGHT = "捌";
    var CN_NINE = "玖";
    var CN_TEN = "拾";
    var CN_HUNDRED = "佰";
    var CN_THOUSAND = "仟";
    var CN_TEN_THOUSAND = "万";
    var CN_HUNDRED_MILLION = "亿";
    var CN_SYMBOL = "";
    var CN_DOLLAR = "元";
    var CN_TEN_CENT = "角";
    var CN_CENT = "分";
    var CN_INTEGER = "整";

    // Variables:
    var integral;
    // 表示数字的整数部分.
    var decimal;
    // 表示数字的小数部分.
    var outputCharacters;
    // The output result.
    var parts;
    var digits, radices, bigRadices, decimals;
    var zeroCount;
    var i, p, d;
    var quotient, modulus;

    // Validate input string:
    currencyDigits = currencyDigits.toString().replace(/[^\d|.]/g, "");
    if (currencyDigits == "") {
        //        alert("Empty input!");
        return "";
    }
    if (currencyDigits.match(/[^,.\d]/) != null) {
        //        alert("Invalid characters in the input string!");
        return "";
    }
    if ((currencyDigits).match(/^((\d{1,3}(,\d{3})*(.((\d{3},)*\d{1,3}))?)|(\d+(.\d+)?))$/) == null) {
        //        alert("Illegal format of digit number!");
        return "";
    }

    // Normalize the format of input digits:
    currencyDigits = currencyDigits.replace(/,/g, "");
    // Remove comma delimiters.
    currencyDigits = currencyDigits.replace(/^0+/, "");
    // Trim zeros at the beginning.
    // Assert the number is not greater than the maximum number.
    if (Number(currencyDigits) > MAXIMUM_NUMBER) {
        alert("Too large a number to convert!");
        return "";
    }

    // Process the coversion from currency digits to characters:
    // Separate integral and decimal parts before processing coversion:
    parts = currencyDigits.split(".");
    if (parts.length > 1) {
        integral = parts[0];
        decimal = parts[1];
        // Cut down redundant decimal digits that are after the second.
        decimal = decimal.substr(0, 2);
    } else {
        integral = parts[0];
        decimal = "";
    }
    // Prepare the characters corresponding to the digits:
    digits = new Array(CN_ZERO, CN_ONE, CN_TWO, CN_THREE, CN_FOUR, CN_FIVE, CN_SIX, CN_SEVEN, CN_EIGHT, CN_NINE);
    radices = new Array("", CN_TEN, CN_HUNDRED, CN_THOUSAND);
    bigRadices = new Array("", CN_TEN_THOUSAND, CN_HUNDRED_MILLION);
    decimals = new Array(CN_TEN_CENT, CN_CENT);
    // Start processing:
    outputCharacters = "";
    // Process integral part if it is larger than 0:
    if (Number(integral) > 0) {
        zeroCount = 0;
        for (i = 0; i < integral.length; i++) {
            p = integral.length - i - 1;
            d = integral.substr(i, 1);
            quotient = p / 4;
            modulus = p % 4;
            if (d == "0") {
                zeroCount++;
            } else {
                if (zeroCount > 0) {
                    outputCharacters += digits[0];
                }
                zeroCount = 0;
                outputCharacters += digits[Number(d)] + radices[modulus];
            }
            if (modulus == 0 && zeroCount < 4) {
                outputCharacters += bigRadices[quotient];
            }
        }
        outputCharacters += CN_DOLLAR;
    }
    // Process decimal part if there is:
    if (decimal != "") {
        for (i = 0; i < decimal.length; i++) {
            d = decimal.substr(i, 1);
            if (d != "0") {
                outputCharacters += digits[Number(d)] + decimals[i];
            }
        }
    }
    // Confirm and return the final output string:
    if (outputCharacters == "") {
        outputCharacters = CN_ZERO + CN_DOLLAR;
    }
    if (decimal == "") {
        outputCharacters += CN_INTEGER;
    }
    outputCharacters = CN_SYMBOL + outputCharacters;
    return outputCharacters;
}

/** 查询Url参数*/
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return undefined;
}

/** 查询Url参数*/
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return undefined;
}

/** drag窗口移动*/
function modelMove() {
    var _move = false;
    // 移动标记
    var _drag = $(".drag");
    var _parent = _drag.parent();
    var _x, _y;
    // 鼠标离控件左上角的相对位置
    _drag.mousedown(function (e) {
        _move = true;
        _x = e.pageX - parseInt(_parent.css("left"));
        _y = e.pageY - parseInt(_parent.css("top"));
    });
    $(document).mousemove(function (e) {
        if (_move) {
            var x = e.pageX - _x;
            // 移动时根据鼠标位置计算控件左上角的绝对位置
            var y = e.pageY - _y;
            if (x < 0 || y < 0) {
                return;
            }
            _parent.css({
                top: y,
                left: x
            });
            //控件新位置
        }
    }).mouseup(function () {
        _move = false;
    });
}

/** 显示结算照片*/
function displayImage(obj) {
    var _this = $(obj);
    var _imgs = _this.attr("data-img");
    if (!isEmpty(_imgs)) {
        var _paths = _imgs.split(";");
        if (!isEmpty(_paths)) {
            $("#handover-img-box").remove();
            var html = "";
            html += '<div id="handover-img-box" class="images-box">';
            $.each(_paths, function (index, data) {
                if (!isEmpty(data)) {
                    html += '<div class="images-box-img" data-limit="disabled"><img class="showboxImg" name="JSD" src="' + data + '"><span class="images-box-img-delete" data-type="JSD" data-del-url="">删除</span></div>';
                }
            });
            html += '</div>';
            $("body").append(html);

            var _box = $("#handover-img-box");
            _box.css({
                top: _this.offset().top + _this.height() + 4,
                left: _this.offset().left
            });

            window.event.stopPropagation();
            //			$("#handover-img-box").on("click",function(e) { e.stopPropagation(); });
            $(document).on("click", function () {
                $("#handover-img-box").remove();
            });
        }
    }
}

/** 显示招租订单记录*/
function displayCancelRecord(obj, cco_code) {
    var _this = $(obj);
    var _box = $("#cancel-main-option-dd");
    if (_box.is(":hidden")) {
        _this.addClass("option-checked");
        $.ajax({
            type: 'POST',
            url: '/contractObject/queryCancelRecord',
            data: {
                cco_code: cco_code
            },
            dataType: 'json',
            beforeSend: function () {
                _box.html('<div class="loading"></div>').fadeIn();
            }
        }).done(function (result) {
            if (result.code != 200) {
                _box.html('<div style="line-height: 100px;color: #E74C3C;">' + result.msg + '</div>');
                return;
            }
            var html = "";
            html += '<table>';
            html += '	<tr>';
            html += '		<th style="width:40px">#</th>';
            html += '		<th style="width:82px">日期</th>';
            html += '		<th style="text-align: left;">问题描述</th>';
            html += '		<th style="width:64px">记录人</th>';
            html += '	</tr>';
            $.each(result.data, function (index, data) {
                html += '	<tr>';
                html += '		<td style="width:40px">' + (index + 1) + '</td>';
                html += '		<td style="width:82px" title="' + returnTime(data.auditingRecord_createTime) + '">' + returnDate(data.auditingRecord_createTime) + '</td>';
                html += '		<td style="text-align: left;">' + returnValue(data.auditingRecord_state) + returnValue(isEmpty(data.auditingRecord_content) ? data.auditingRecord_content : data.auditingRecord_content) + '</td>';
                html += '		<td style="width:64px">' + returnValue(data.auditingRecord_author) + '</td>';
                html += '	</tr>';
            });
            html += '</table>';
            _box.html(html);
        });
    } else {
        _this.removeClass("option-checked");
        _box.fadeOut();
    }
}

/**
 * 获得某月的最后一天
 * @param year
 * @param month
 * @returns {number}
 */
function getLastDay(year, month) {
    var new_year = year;
    //取当前的年份
    var new_month = month++;
    //取下一个月的第一天，方便计算（最后一天不固定）
    if (month > 12) {
        new_month -= 12;
        //月份减
        new_year++;
        //年份增
    }
    var new_date = new Date(new_year, new_month, 1);
    //取当年当月中的第一天
    return (new Date(new_date.getTime() - 1000 * 60 * 60 * 24)).getDate();
    //获取当月最后一天日期
}

/**
 * 获取hash值
 * @returns
 */
function getHashStringArgs() {
    //取得查询的hash，并去除开头的#号
    var hashStrings = (window.location.hash.length > 0 ? window.location.hash.substring(1) : "");
    //保持数据的对象
    var hashArgs = {};
    //取得每一项hash对
    var items = hashStrings.length > 0 ? hashStrings.split("&") : [];
    //逐个将每一项添加到hashArgs中
    for (i = 0; i < items.length; i++) {
        var item = items[i].split("=");
        var name = item[0];
        var value = item[1];
        if (name.length > 0) {
            hashArgs[name] = value;
        }
    }
    return hashArgs;
}

/**
 * 获取当前时间
 * @param i
 * @returns {*}
 */
function zeroFill(i) {
    if (i >= 0 && i <= 9) {
        return "0" + i;
    } else {
        return i;
    }
}

/**
 *
 * @returns {string}
 */
function getCurrentTime() {
    var date = new Date();//当前时间
    var month = zeroFill(date.getMonth() + 1);//月
    var day = zeroFill(date.getDate());//日
    var hour = zeroFill(date.getHours());//时
    var minute = zeroFill(date.getMinutes());//分
    var second = zeroFill(date.getSeconds());//秒
    return date.getFullYear() + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}

// ------------------------------------------------------

/* 插件-合同显示 */
;(function ($, document) {
    $.fn.displayContract = function (options) {
        return this.each(function () {
            var self = $(this);
            var opts = $.extend(true, {
                data: {},
                show_house: true, // 显示房源数据
                show_customer: true, // 显示客户
                show_contract: true, // 显示合同
                show_other: true,	// 显示其他
                done: function () {}
            }, options);

            // 初始化数据
            var load_contract = function () {
                $.ajax({
                    type: "POST",
                    url: "/contractObject/queryContractInfo",
                    data: opts.data,
                    dataType: "json"
                }).done(function (result) {
                    if (result.code != 200) return;

                    var _data = result.data;

                    // 合同对象
                    var contractObject = _data.contractObject;
                    // 合同主体
                    var contractBody = _data.contractBody;
                    // 房源信息
                    var houseInfo = _data.viewLibraryInfo;
                    // 管家信息
                    var contractRelaEmps = _data.contractRelaEmps;
                    // 签约代表
                    var contractor = _data.contractor;
                    // 房源归属
                    var positionRecord = _data.positionRecord;
                    // 客户信息
                    var customers = _data.customers;
                    // 图片信息
                    var contractImageList = _data.contractImageList;
                    // **********************************************

                    // 合同起止日期
                    var bodyStartDate = returnDate(contractObject.contractObject_Date);
                    var bodyEndDate = returnDate(contractObject.contractObject_DeadlineTime);
                    // 合同类型
                    var cType = contractObject.contractObject_Type;
                    // 管家变更记录
                    var userContractRecordList1 = _data.userContractRecordList1;
                    // 是否为托管
                    var isTG = contractObject.contractObject_Type == "托管合同";

                    var html = "";
                    html += '<ul class="title-nav">';
                    html += '	<li class="visited">' + returnValue(contractObject.contractObject_Type);
                    html += '		<span style="font-size: 14px;color: #000">(&nbsp;<label style="font-size: 14px;font-weight: initial;">' + returnValue(contractObject.contractObject_Mode == "E" ? "电子合同" : "纸质合同") + '</label>&nbsp;)</span>';
                    html += '		<span style="color: #E74C3C;font-weight: normal;font-size: 14px;">NO.' + returnValue(contractObject.contractObject_No) + '</span>';
                    html += '	</li>';
                    html += '</ul>';
                    $("#contract-title").html(html).addClass(isTG ? 'next' : 'ok');

                    var html = '';
                    // 【显示房屋信息】
                    if (opts.show_house) {
                        html += '	<fieldset>';
                        html += '		<legend>房屋信息</legend>';
                        html += '		<span><label>房号</label>' + returnValue(houseInfo.house_address) + '，建筑面积<strong>' + returnValue(houseInfo.hi_measure) + '</strong>平方米，户型<strong>' + returnNumber(houseInfo.hi_houseS) + '</strong>室<strong>' + returnNumber(houseInfo.hi_houseT) + '</strong>厅<strong>' + returnNumber(houseInfo.hi_houseW) + '</strong>卫</span>';
                        html += '		<hr>';
                        html += '		<span><label>产权地址</label>' + returnNullReplace(houseInfo.he_address, '<label class="error">无</label>') + '</span>';
                        html += '		<hr>';
                        //						if (isTG) {
                        //							if (!isEmpty(positionRecord)) {
                        //								html += '		<span><label>房源归属部门</label>' + returnNullReplace(positionRecord.ucc_name, '<label class="error">无</label>') + '</span>';
                        //								html += '		<span><label>房源所有者</label>' + returnNullReplace(positionRecord.em_name_new, '<label class="error">无</label>') + '</span>';
                        //							} else {
                        //								html += '		<span><label>房源归属部门</label><label class="error">无</label></span>';
                        //								html += '		<span><label>房源所有者</label><label class="error">无</label></span>';
                        //							}
                        //						}
                        html += '		<hr>';
                        html += '		<div class="sh-icon ' + returnContractOptionState(contractObject.contractObject_OptionState).image + '"></div>';
                        html += '	</fieldset>';
                    }
                    // 【显示客户信息】
                    if (opts.show_customer) {
                        html += '	<fieldset>';
                        if (isTG) {
                            html += '	<legend>房东信息</legend>';
                            var cus_html_start = "";
                            var cus_html_end = "";
                            var isRole = true;
                            var cache_index = 1;
                            $.each(_data.customers, function (index, data) {
                                switch (data.crc_role) {
                                    case 0:
                                        // 身份证图片、银行卡图片
                                        var _img_data = "", _bk_data = "";
                                        $.each(data.customerImages, function (index, data) {
                                            switch (data.cci_type) {
                                                case "CD":
                                                    _img_data += returnValue(data.img_path) + '#';
                                                    break;
                                                case "CD1":
                                                    _img_data += returnValue(data.img_path) + '#';
                                                    break;
                                                case "CD2":
                                                    _img_data += returnValue(data.img_path) + '#';
                                                    break;
                                                case "BK":
                                                    _bk_data += returnValue(data.img_path) + '#';
                                                    break;
                                            }
                                        });
                                        // 身份证2
                                        if (isEmpty(_img_data)) {
                                            $.each(data.contractImages, function (index, data) {
                                                switch (data.ci_type) {
                                                    case "SFZ":
                                                        _img_data += returnValue(data.img_path) + '#';
                                                        break;
                                                }
                                            });
                                        }
                                        // 身份证3
                                        if (isEmpty(_img_data) && !isEmpty(_data.SFZ)) {
                                            $.each(_data.SFZ, function (index, data) {
                                                _img_data += returnValue(data) + '#';
                                            });
                                        }
                                        cus_html_start += '	<span><label>签约客户</label>' + returnValue(data.cc_name) + ' - ' + returnValue(data.ccp_phone) + ' - ' + (data.cc_sex == 1 ? '男' : '女') + '</span>';
                                        cus_html_start += '	<span><label>身份证</label>' + returnValue(data.cc_cardNum) + '<label class="' + (_img_data.length < 10 ? "show-label-disabled" : "show-label-error") + ' sfz-show-label" style="height: 20px;top: 4px;" title="' + (_img_data.length < 10 ? "无身份证照片" : "点击查看身份证照片") + '" data-value="' + _img_data + '" data-hint="没有身份证">证</label></span>';
                                        cus_html_start += '	<hr>';
                                        if (!isEmpty(data.customerBank)) {
                                            cus_html_start += '	<span><label>银行账户</label>' + returnValue(data.customerBank.cbc_name) + ' - ' + returnValue(data.customerBank.cbc_cardNum) + '</span>';
                                            cus_html_start += '	<span><label>开户网点</label>' + returnValue(data.customerBank.cbc_bankName) + ' - ' + returnValue(data.customerBank.cbc_address) + '<label class="' + (_bk_data.length < 10 ? "show-label-disabled" : "show-label-error") + ' sfz-show-label" style="height: 20px;top: 4px;" title="' + (_bk_data.length < 10 ? "无银行卡照片" : "点击查看银行卡照片") + '" data-value="' + _bk_data + '" data-hint="没有银行卡">卡</label></span>';
                                        }
                                        break;
                                    case 1:
                                        if (isRole) {
                                            cus_html_end += '	<hr style="border-bottom:1px solid #3498db;width: 96%;margin: 0 auto 8px;padding-top: 8px;">';
                                            isRole = false;
                                        }
                                        cus_html_end += '	<span><label>联系人' + cache_index + '</label>' + returnValue(data.cc_name) + ' - ' + returnValue(data.ccp_phone) + ' - ' + (data.cc_sex == 1 ? '男' : '女') + '</span>';
                                        cus_html_end += '	<span><label>身份证</label>' + returnValue(data.cc_cardNum) + '</span>';
                                        cus_html_end += '	<hr>';
                                        cache_index++;
                                        break;
                                }
                            });
                            html += (cus_html_start + cus_html_end);
                        } else {
                            html += '	<legend>租客信息</legend>';
                            var cus_html_start = "";
                            var cus_html_end = "";
                            var isRole = true;
                            var cache_index = 1;
                            $.each(_data.customers, function (index, data) {
                                // 身份证图片、银行卡图片
                                var _img_data = "", _bk_data = "";
                                $.each(data.customerImages, function (index, data) {
                                    switch (data.cci_type) {
                                        case "CD":
                                            _img_data += returnValue(data.img_path) + '#';
                                            break;
                                        case "CD1":
                                            _img_data += returnValue(data.img_path) + '#';
                                            break;
                                        case "CD2":
                                            _img_data += returnValue(data.img_path) + '#';
                                            break;
                                        case "BK":
                                            _bk_data += returnValue(data.img_path) + '#';
                                            break;
                                    }
                                });
                                // 身份证2
                                if (isEmpty(_img_data)) {
                                    $.each(data.contractImages, function (index, data) {
                                        switch (data.ci_type) {
                                            case "SFZ":
                                                _img_data += returnValue(data.img_path) + '#';
                                                break;
                                        }
                                    });
                                }
                                // 身份证3
                                if (isEmpty(_img_data) && !isEmpty(_data.SFZ)) {
                                    $.each(_data.SFZ, function (index, data) {
                                        _img_data += returnValue(data) + '#';
                                    });
                                }
                                switch (data.crc_role) {
                                    case 0:
                                        cus_html_start += '	<span><label>签约客户</label>' + returnValue(data.cc_name) + ' - ' + returnValue(data.ccp_phone) + ' - ' + (data.cc_sex == 1 ? '男' : '女') + '</span>';
                                        cus_html_start += '	<span><label>身份证</label>' + returnValue(data.cc_cardNum) + '<label class="' + (_img_data.length < 10 ? "show-label-disabled" : "show-label-error") + ' sfz-show-label" style="height: 20px;top: 4px;" title="' + (_img_data.length < 10 ? "无身份证照片" : "点击查看身份证照片") + '" data-value="' + _img_data + '" data-hint="没有身份证">证</label></span>';
                                        cus_html_start += '	<hr>';
                                        if (!isEmpty(data.customerBank)) {
                                            cus_html_start += '	<span><label>银行账户</label>' + returnValue(data.customerBank.cbc_name) + ' - ' + returnValue(data.customerBank.cbc_cardNum) + '</span>';
                                            cus_html_start += '	<span><label>开户网点</label>' + returnValue(data.customerBank.cbc_bankName) + ' - ' + returnValue(data.customerBank.cbc_address) + '<label class="' + (_bk_data.length < 10 ? "show-label-disabled" : "show-label-error") + ' sfz-show-label" style="height: 20px;top: 4px;" title="' + (_bk_data.length < 10 ? "无银行卡照片" : "点击查看银行卡照片") + '" data-value="' + _bk_data + '" data-hint="没有银行卡">卡</label></span>';
                                        }
                                        break;
                                    case 1:
                                        if (isRole) {
                                            cus_html_end += '	<hr style="border-bottom:1px solid #3498db;width: 96%;margin: 0 auto 8px;padding-top: 8px;">';
                                            isRole = false;
                                        }
                                        cus_html_end += '	<span><label>室友' + cache_index + '</label>' + returnValue(data.cc_name) + ' - ' + returnValue(data.ccp_phone) + ' - ' + (data.cc_sex == 1 ? '男' : '女') + '</span>';
                                        cus_html_end += '	<span><label>身份证</label>' + returnValue(data.cc_cardNum) + '<label class="' + (_img_data.length < 10 ? "show-label-disabled" : "show-label-error") + ' sfz-show-label" style="height: 20px;top: 4px;" title="' + (_img_data.length < 10 ? "无身份证照片" : "点击查看身份证照片") + '" data-value="' + _img_data + '" data-hint="没有身份证">证</label></span>';
                                        cus_html_end += '	<hr>';

                                        cache_index++;
                                        break;
                                }
                            });
                            html += (cus_html_start + cus_html_end);
                        }
                        html += '	</fieldset>';
                    }
                    // 【显示合同信息】
                    if (opts.show_contract) {
                        var overDay = '';
                        if (contractObject.contractObject_State == 2) {
                            var s_date = new Date(returnDate(bodyEndDate)).getTime();
                            var e_date = new Date(returnDate(new Date())).getTime();
                            if (e_date > s_date) {
                                overDay = '<span class="item-option-overDay error-bg">超期&nbsp;' + returnBusinessYMD(bodyEndDate, returnDate(new Date())) + '</span>';
                            } else {
                                if (s_date - e_date <= (30 * 24 * 60 * 60 * 1000)) {
                                    overDay = '<span class="item-option-overDay hint-bg">还有&nbsp;' + returnBusinessYMD(returnDate(new Date()), bodyEndDate) + '&nbsp;到期</span>';
                                }
                            }
                        }

                        html += '	<fieldset>';
                        html += '	<legend>合同信息</legend>';
                        html += '		<span><label>合同期限</label>' + returnValue(bodyStartDate) + '&nbsp;至&nbsp;' + returnValue(bodyEndDate) + '（' + returnBusinessYMD(bodyStartDate, bodyEndDate) + '）</span>' + overDay;
                        if (isTG) {
                            html += '	<span><label>接房日期</label><strong>' + returnDate(contractObject.contractObject_RealDate) + '</strong></span>';
                        }
                        html += '		<hr>';
                        var agreedRepayTime = '';
                        agreedRepayTime = contractBody.contractBody_AgreedRepayTime;
                        if (returnValue(agreedRepayTime) != '') {
                            if (agreedRepayTime.indexOf('|') < 0) {
                                if (agreedRepayTime < 0) {
                                    agreedRepayTime = '提前' + Math.abs(agreedRepayTime) + '天';
                                } else if (agreedRepayTime == 0) {
                                    agreedRepayTime = '当天';
                                } else {
                                    agreedRepayTime = Math.abs(agreedRepayTime) + '日';
                                }
                            } else {
                                agreedRepayTime = agreedRepayTime + ' 日/每年首期';
                            }
                        } else {
                            agreedRepayTime = '当天';
                        }
                        if (isTG) {
                            html += '		<hr>';
                            if (contractObject.contractObject_RentFreeMode == 1) {
                                html += '	<span><label>打包价格</label><strong class="error">' + returnValue(contractBody.contractBody_Rent) + '</strong>元/年（<i class="error" style="font-style: normal;">打包年付</i>）</span>';
                            } else {
                                html += '	<span><label>存房价格</label><strong class="error">' + returnValue(contractBody.contractBody_Rent) + '</strong>元/月（' + returnValue(contractBody.contractBody_PayStyle) + (!isEmpty(contractBody.contractBody_PayType) ? '：' + returnValue(contractBody.contractBody_PayType) : '') + '）</span>';
                            }
                            html += '		<span><label>总金额</label><strong class="error">' + returnFloat(_data.totalRent) + '</strong>（' + returnToUpperMoney(_data.totalRent) + '）</span>';
                            html += '		<span><label>租金浮动</label>' + returnValue(contractBody.contractBody_RentPlus == "100%" ? '<label class="error">无</label>' : contractBody.contractBody_RentPlus) + '</span>';
                            html += '		<hr>';
                            html += '		<span><label>保证金</label>' + returnValue(isEmpty(contractBody.contractBody_Pay) ? 0 : contractBody.contractBody_Pay + '&nbsp;元') + '</span>';
                            html += '		<span><label>定金</label>' + returnValue(isEmpty(contractBody.contractBody_Depslit) ? '<label class="error">无</label>' : contractBody.contractBody_Depslit + '&nbsp;元') + '</span>';
                            html += '		<span><label>管理费</label>' + returnValue(isEmpty(contractBody.contractBody_Service) ? '<label class="error">无</label>' : contractBody.contractBody_Service + '&nbsp;元/年') + '</span>';
                            html += '		<hr>';
                            html += '		<span><label>免租期</label>' + returnValue(contractBody.contractBody_FreeTime) + '&nbsp;天/年</span>';
                            html += '		<span><label>包修费</label>' + returnValue(isEmpty(contractBody.contractBody_GuaranteeCost) ? 0 : contractBody.contractBody_GuaranteeCost + '&nbsp;元/年') + '</span>';
                            html += '		<span><label>租金递增&nbsp;[逐年]</label>' + (isEmpty(contractBody.contractBody_Increasing) ? '<label class="error">无</label>' : returnValue(contractBody.contractBody_Increasing) + '&nbsp;元/月/年') + '</span>';
                            html += '		<hr>';
                            html += '		<hr>';
                            html += '		<span><label>约定还款日</label>' + agreedRepayTime + '</span>';
                            html += '		<span><label>首付租金日期</label>' + returnDate(contractBody.contractBody_StartPayTime) + '</span>';
                            html += '		<span><label>合同签订日期</label>' + returnDate(contractObject.contractObject_FillTime) + '</span>';
                            html += '		<hr>';
                            html += '		<span><label>超额租金分成</label>甲方[&nbsp;' + returnNumber(contractBody.contractBody_RentRate_A) + '%&nbsp;]&nbsp;&nbsp;&nbsp;&nbsp;乙方[&nbsp;' + returnNumber(contractBody.contractBody_RentRate_B) + '%&nbsp;]</span>';
                            // html += '		<span><label>账单生成方式</label><strong>' + returnValue(contractBody.contractBody_BillWay == 1 ? "租期等长" : "租金等额") + '</strong></span>';
                        } else {
                            html += '		<hr>';
                            html += '		<span><label>租赁价格</label><strong class="error">' + returnValue(contractBody.contractBody_Rent) + '</strong>元/月（' + returnValue(contractBody.contractBody_PayStyle) + (contractBody.contractBody_PayStyle == '月付' ? '：' + returnValue(contractBody.contractBody_PayType) : '') + '）</span>';
                            html += '		<span><label>总金额</label><strong class="error">' + returnFloat(_data.totalRent) + '</strong>（' + returnToUpperMoney(_data.totalRent) + '）</span>';
                            html += '		<span><label>租金浮动</label>' + returnValue(contractBody.contractBody_RentPlus == "100%" ? '<label class="error">无</label>' : contractBody.contractBody_RentPlus) + '</span>';
                            html += '		<hr>';
                            html += '		<span><label>保证金</label>' + returnValue(isEmpty(contractBody.contractBody_Pay) ? 0 : contractBody.contractBody_Pay + '&nbsp;元') + '</span>';
                            html += '		<span><label>服务费</label>' + returnValue(isEmpty(contractBody.contractBody_Service) ? '<label class="error">无</label>' : contractBody.contractBody_Service + '&nbsp;元/年') + '</span>';
                            html += '		<span><label>定金</label>' + returnValue(isEmpty(contractBody.contractBody_Depslit) ? '<label class="error">无</label>' : contractBody.contractBody_Depslit + '&nbsp;元') + '</span>';
                            html += '		<hr>';
                            html += '		<span><label>约定还款日</label>' + agreedRepayTime + '</span>	';
                            html += '		<span><label>首付租金日期</label>' + returnDate(contractBody.contractBody_StartPayTime) + '</span>';
                            html += '		<span><label>合同签订日期</label>' + returnDate(contractObject.contractObject_FillTime) + '</span>';
                        }
                        html += '		<hr>';
                        html += '		<span><label>其他约定</label><label class="error">' + returnValue(contractObject.contractObject_Other) + '</label></span>';
                        html += '		<hr>';
                        html += '		<span><label>签约代表</label>' + returnValue(contractor.em_name) + " - " + returnValue(contractor.em_phone) + '</span>';
                        html += '		<hr>';

                        var photoSrc = "";
                        $.each(contractImageList, function (index, data) {
                            if (data.ci_type == "SFZ") {
                                photoSrc = data.ci_path;
                            }
                        });

                        $.ajax({
                            type: "POST",
                            url: "/user/userJurisdiction",
                            data: {
                                url: '/contractObject/querySign',
                                ucps_type: 3
                            },
                            dataType: "json"
                        }).done(function (result) {
                            if (result == null || result.menuLists == null || result.menuLists.length == 0) {
                                $("#signImg").hide();
                            } else {
                                $("#signImg").show();
                            }
                        });
                        //("auditing" == mode || "review" == mode)
                        //(isEmpty(contractObject.contractObject_CustomerSign) ? "无" : '<img src="data:image/png;base64,' + contractObject.contractObject_CustomerSign + '" draggable="false" style="width: 200px;height: 103px;">') + ((!isEmpty(photoSrc)) ? '<span class="spanImgBox" style="" id="signImg"><img class="showboxImg"  src="' + photoSrc + '" style="width: 137px;height: 103px; margin-top: 0px;"></span>' : '')
                        var mode = getUrlParam("mode");
                        html += '		<span><label>客户签字</label>' + (isEmpty(contractObject.contractObject_CustomerSign) ? "无" : '<img src="data:image/png;base64,' + contractObject.contractObject_CustomerSign + '" draggable="false" style="width: 200px;height: 103px;">') + ('<label class="show-label-error sfz-show-label" id="signImg" style="height: 20px;top: 4px;" title="点击查看签名抓拍照片" data-value="' + photoSrc + '" data-hint="没有抓拍照">照</label>') + '</span>';
                        html += '	</fieldset>';
                    }
                    // 【显示其他信息】
                    if (opts.show_other) {
                        html += '	<fieldset>';
                        html += '		<legend>其他信息</legend>';
                        $.each(contractRelaEmps, function (index, data) {
                            if (index == 0) {
                                html += '<span><label>主管家</label>' + returnValue(data.em_name) + ' - ' + returnValue(data.em_phone) + '[&nbsp;业绩分成&nbsp;' + returnNumber(data.contract_perforSplit) + '%&nbsp;]</label>' + (userContractRecordList1 == 0 ? "" : '<label class="show-label-change" id="show-label-change" style="height: 20px;top: 4px;" title="管家变更过,变更详情请查看变更记录"  >变</label>') + '</span>';
                            } else {
                                html += '<hr><span><label>副管家</label>' + returnValue(data.em_name) + ' - ' + returnValue(data.em_phone) + '[&nbsp;业绩分成&nbsp;' + returnNumber(data.contract_perforSplit) + '%&nbsp;]</label></span>';
                            }
                        });
                        html += '		<hr>';
                        var _state = returnContractState(contractObject.contractObject_State);
                        var _optionState = returnContractOptionState(contractObject.contractObject_OptionState);
                        var _extendState = returnContractExtendState(contractObject.contractObject_ExtState);
                        html += '		<span><label>合同状态</label><label class="' + _state.style + '">' + _state.text + '</label>&nbsp;-&nbsp;<label class="' + _optionState.color + '">' + _optionState.title + '</label></span>';
                        html += '		<span><label>' + (isTG ? "存" : "出") + '房状态</label><label class="' + _extendState.style + '">' + _extendState.text + '</label></span>';
                        html += '		<hr>';
                        html += '		<span><label>登记人</label>' + returnValue(contractBody.contractBody_Optioner) + '</span>';
                        html += '		<span><label>登记时间</label>' + returnTime(contractObject.contractObject_CreateTime) + '</span>';
                        html += '		<hr>';
                        html += '		<span><label>备注</label><label class="error">' + returnValue(contractBody.contractBody_Remark) + '</label></span>';
                        html += '		<hr>';
                        html += '	    <span class="spanImgBox" id="htz" style="display:none">';
                        html += '	    	<label style="float: left;">合同照</label>';
                        html += '	    </span>';
                        html += '		<span class="spanImgBox" id="wts" style="display:none">';
                        html += '			<label style="float: left;">授权委托书</label>';
                        html += '		</span>';
                        html += '		<span class="spanImgBox" id="fcz" style="display:none">';
                        html += '			<label style="float: left;">房产证</label>';
                        html += '		</span>';
                        if (contractObject.contractObject_Mode == "E" && !isEmpty(contractObject.contractObject_Version)) {

                            html += '		<hr>';
                            html += '		<span><input type="hidden" value=' + returnValue(contractObject.contractObject_Type) + '><a id="previewContract" style="min-width: 110px;padding-right: 12px;text-align: right;text-decoration: underline;cursor: pointer;color: #3498DB;">预览电子合同</a><input type="hidden" value=' + returnValue(contractObject.contractObject_Code) + '></span>';
                            if (contractObject.contractObject_Type == '托管合同') {
                                html += '		<span><input type="hidden" value=' + returnValue(contractObject.contractObject_Type) + '><a id="downloadAuthBook" style="min-width: 110px;padding-right: 12px;text-align: right;text-decoration: underline;cursor: pointer;color: #3498DB;">下载委托书</a><input type="hidden" value=' + returnValue(contractObject.contractObject_Code) + '></span>';
                            }
                            html += '		<hr>';
                            html += '		<span><input type="hidden" value=' + returnValue(contractObject.contractObject_Type) + '><a id="downloadContract" style="min-width: 110px;padding-right: 12px;text-align: right;text-decoration: underline;cursor: pointer;color: #3498DB;">下载电子合同</a><input type="hidden" value=' + returnValue(contractObject.contractObject_Code) + '></span>';
                            html += '		<hr>';
                            html += '		<span><input type="hidden" value=' + returnValue(contractObject.contractObject_Type) + '><a id="downloadFollwer" style="min-width: 110px;padding-right: 12px;text-align: right;text-decoration: underline;cursor: pointer;color: #3498DB;">下载合同附页</a><input type="hidden" value=' + returnValue(contractObject.contractObject_Code) + '></span>';
                        }
                        html += '	</fieldset>';
                    }
                    $(self).html('<div class="content-item">' + html + '</div>');

                    $.each(contractImageList, function (index, data) {
                        var html = '<img class="showboxImg" src="' + returnValue(data.ci_path_real) + '" data-src="' + returnValue(data.ci_path) + '" >';
                        switch (data.ci_type) {
                            case "HTZ":
                                $("#htz").append(html).show();
                                break;
                            case "WTS":
                                $("#wts").append(html).show();
                                break;
                            case "FCZ":
                                $("#fcz").append(html).show();
                                break;
                        }
                    });

                    // 绑定事件
                    load_event();
                    // 回执
                    opts.done(_data);
                });
            };

            // 加载事件
            var load_event = function () {

                // 点击查看图标
                $(self).find(".show-label-error").on("click", function (e) {
                    e.stopPropagation();
                    $(".more-img-box").remove();
                    if (isEmpty($(this).attr("data-show"))) {
                        var html = '';
                        var _data = $(this).attr("data-value");
                        var _hint = $(this).attr("data-hint");
                        html += '<div class="spanImgBox more-img-box">';
                        if (isEmpty(_data)) {
                            html += '<div class="more-img-box-error">' + _hint + '</div>';
                        } else {
                            var boo = true;
                            $.each(_data.split("#"), function (index, data) {
                                if (!isEmpty(data)) {
                                    html += '<img class="showboxImg" src="' + returnValue(data) + '">';
                                    boo = false;
                                }
                            });
                            if (boo) {
                                html += '<div class="more-img-box-error">' + _hint + '</div>';
                            }
                        }
                        html += '</div>';
                        $("body").append(html);
                        $(".more-img-box").css({
                            top: $(this).offset().top - 55,
                            left: $(this).offset().left + 36
                        });
                        $(this).attr("data-show", "show");
                    } else {
                        $(this).removeAttr("data-show");
                    }
                });

                $("#previewContract").on("click", function () {
                    var con_code = $(this).next().val();
                    var con_type = $(this).prev().val();
                    //					window.top.href_mo(("租赁合同" == con_type ? "/appPage/contractZLPrint?con_code=" : "/appPage/contractTGPrint?con_code=") + con_code, '合同预览', "合同详情");
                    window.top.href_mo("/contractObject/contractPreview?con_code=" + con_code + "&con_type=" + ("租赁合同" == con_type ? "zl" : "tg") + "&con_uses=preview&con_where=pc", '合同预览', "合同详情");
                });

                $("#downloadContract").on("click", function () {
                    var con_code = $(this).next().val();
                    var con_type = $(this).prev().val();
                    //					window.top.href_mo(("租赁合同" == con_type ? "/appPage/contractZLPrint?con_code=" : "/appPage/contractTGPrint?con_code=") + con_code, '合同预览', "合同详情");
                    $.ajax({
                        type: "POST",
                        url: "/contractObject/queryContractUrlFromSsq",
                        data: {
                            con_code: con_code
                        },
                        dataType: "json",
                        success: function (result) {
                            if (result.code == 200) {
                                window.open(result.url);
                            } else {
                                $.jBox.tip(result.msg, "error");
                                return;
                            }
                        }
                    });
                });

                $("#downloadFollwer").on("click", function () {
                    var con_code = $(this).next().val();
                    var con_type = $(this).prev().val();
                    //					window.top.href_mo(("租赁合同" == con_type ? "/appPage/contractZLPrint?con_code=" : "/appPage/contractTGPrint?con_code=") + con_code, '合同预览', "合同详情");
                    $.ajax({
                        type: "POST",
                        url: "/contractObject/queryContractUrlFromSsq",
                        data: {
                            con_code: con_code
                        },
                        dataType: "json",
                        success: function (result) {
                            if (result.code == 200) {
                                window.open(result.follower);
                            } else {
                                $.jBox.tip(result.msg, "error");
                                return;
                            }
                        }
                    });
                });

                $("#downloadAuthBook").on("click", function () {
                    var con_code = $(this).next().val();
                    $.ajax({
                        type: "POST",
                        url: "/contractObject/downloadAuthBook",
                        data: {
                            con_code: con_code
                        },
                        dataType: "json",
                        success: function (result) {
                            if (result.code == 200) {
                                var url = result.url;
                                if (result.url.indexOf("/mnt/web/GJM") > -1) {
                                    url = result.url.replace("/mnt/web/GJM", "");
                                }
                                window.open(url);
                            } else {
                                $.jBox.tip(result.msg, "error");
                                return;
                            }
                        }
                    });
                });

                $(document).on("click", function () {
                    $(".show-label-error").removeAttr("data-show");
                    $(".more-img-box").remove();
                });
            };

            load_contract();
        });
    };
})($, document);

/* 插件-光标最后 */
;(function ($, document) {
    $.fn.setCursorPosition = function (position) {
        if (this.lengh == 0) return this;
        return $(this).setSelection(position, position);
    }

    $.fn.setSelection = function (selectionStart, selectionEnd) {
        if (this.lengh == 0) return this;
        input = this[0];

        if (input.createTextRange) {
            var range = input.createTextRange();
            range.collapse(true);
            range.moveEnd('character', selectionEnd);
            range.moveStart('character', selectionStart);
            range.select();
        } else if (input.setSelectionRange) {
            input.focus();
            input.setSelectionRange(selectionStart, selectionEnd);
        }
        return this;
    }

    $.fn.focusEnd = function () {
        this.setCursorPosition(this.val().length);
    }
})($, document);

/* 插件-消息弹窗 */
;(function ($, document) {
    var scrollTimer, scrollTriggerDelay = 2500;

    $.fn.msgClose = function () {
        $(".msg-box").remove();
    };

    /**
     * 消息
     */
    $.fn.msg = function (content, autoClose, isPosition) {
        if (isEmpty(isPosition)) {
            isPosition = true;
        } else {
            isPosition = false;
        }
        if (autoClose != false && isEmpty(autoClose)) {
            autoClose = true;
        }
        if (autoClose) {
            clearTimeout(scrollTimer);
        }
        var _this = $(this);
        var top = _this.position().top;
        // 元素Top属性
        var left = _this.position().left;
        // 元素Left属性
        var len = _this.parent().find(".msg-box").length;
        if (len > 0) {
            if ($(".msg-box").is(":animated")) {
                _this.focus();
                if (autoClose) {
                    // 自动关闭
                    scrollTimer = setTimeout(function () {
                        $(".msg-box").remove();
                    }, scrollTriggerDelay);
                }
                return;
            }
            var _boxLeft = $(".msg-box").position().left;
            $(".msg-box").stop();
            $(".msg-box").animate({
                left: _boxLeft + 4
            }, 80);
            $(".msg-box").animate({
                left: _boxLeft - 3
            }, 80);
            $(".msg-box").animate({
                left: _boxLeft + 2
            }, 80);
            $(".msg-box").animate({
                left: _boxLeft - 1
            }, 80);
            $(".msg-box").animate({
                left: _boxLeft
            }, 80);
            _this.focus();
            if (autoClose) {
                // 自动关闭
                scrollTimer = setTimeout(function () {
                    $(".msg-box").remove();
                }, scrollTriggerDelay);
            }
            return;
        }
        var mTop = returnNumber(_this.css("marginTop"));
        // 元素margin-top属性
        var mLeft = returnNumber(_this.css("marginLeft"));
        // 元素margin-left属性
        var mRight = returnNumber(_this.css("marginRight"));
        // 元素margin-right属性
        var width = _this.outerWidth();
        // 含border宽度
        var height = _this.outerHeight();
        // 含border高度

        _this.after('<div class="msg-box" data-cache="' + _this.attr("id") + '">' + content + '</div>');
        if (isPosition) {
            _this.trigger("focus");
        }
        var _docWidth = document.body.offsetWidth;
        var _thisLeft = _this.offset().left;
        var _boxHeight = $(".msg-box").outerHeight();
        var _boxWidth = $(".msg-box").outerWidth() + 8;
        if (_docWidth - _thisLeft - _boxWidth - width > 0) {
            $(".msg-box").css({
                top: (top + (height < _boxHeight ? (height / 2 - _boxHeight / 2) : 1) + mTop),
                left: (left + width + 8 + mLeft)
            });
        } else {
            $(".msg-box").css({
                top: (top + (height < _boxHeight ? (height / 2 - _boxHeight / 2) : 1) + mTop),
                left: (left - _boxWidth - 2 + mLeft)
            }).addClass("msg-box-left");
        }
        if (autoClose) {
            // 自动关闭
            scrollTimer = setTimeout(function () {
                $(".msg-box").remove();
            }, scrollTriggerDelay);
        }
        $(".msg-box").on("click", function () {
            $(this).remove();
            if (isPosition) {
                $("#" + $(this).attr("data-cache")).focus();
            }
        });
        return false;
    };

    /** APP消息*/
    $.fn.appMsg = function (content) {
        var _this = $(this);
        clearTimeout(scrollTimer);
        $(".msg-box").remove();
        var box = $('<div class="msg-box">' + content + '</div>').appendTo(_this.parent()).hide().show("fast");
        box.css({
            left: _this.position().left
        });
        _this.focus();
        scrollTimer = setTimeout(function () {
            box.hide("fast", function () {
                $(this).remove();
            });
        }, 2000);
        return false;
    };

    /* 弹窗框*/
    $.fn.model = function (options) {
        return this.each(function () {
            var opts = {};
            // 保留参数
            var _this = this;

            var defaults = {
                title: "",
                data: ""
            };
            var opts = $.extend(defaults, options);

            // 初始化
            this.init = function () {
                this.createHTML();
            };
            // 生成html
            this.createHTML = function () {
                var html = "";
                html += '<div class="model-content">';
                html += '   <div class="model-head">';
                html += '   	<span class="model-title">' + opts.title + '</span>';
                html += '   	<button class="model-close"></button>';
                html += '   </div>';
                html += '   <div class="model-main">' + opts.data + '</div>';
                html += '   <footer class="model-foot"></footer>';
                html += '</div>';
                $(_this).append(html).css({});
                this.addEvent();
            };
            // 事件绑定
            this.addEvent = function () {
                $(".model-close").on("click", function () {
                    $(_this).empty();
                });
            };
            this.init();
        });
    };

})($, document);

/* 插件-合同账单 */
;(function ($, document) {
    $.fn.BillBox = function (options) {
        return this.each(function () {
            var opts = {};
            // 保留参数
            var defaults = {
                cno: "", // 合同号
                billCode: "", // 账单号
                billCycle: "", // 账单期数
                billType: "", // 账单类型
                billReturnDateCode: "", // 账单归期编号
                width: "1020px", // 默认宽度
                title_order: true, // 订单信息
                title_display: true, // 标题信息
                title_contract: true, // 合同信息
                confirmPay: false, // 确定付款
                displayHint: false, // 提示
                init: function () {},
                result: function () {}
            };
            var opts = $.extend(defaults, options);

            /** 初始化*/
            this.init = function () {
                this.createHTML();
            };
            /** 初始化页面元素*/
            this.createHTML = function () {
                var self = this;
                var html = "";
                html += '<table>';
                html += '	<thead>';
                html += '		<tr>';
                html += '			<td colspan="99">';
                html += '				<fieldset id="bill-contract" class="bill-fieldset" style="' + (opts.title_contract ? '' : 'display:none') + '"><legend>合同信息</legend></fieldset>';
                html += '				<fieldset id="bill-order" class="bill-fieldset" style="' + (opts.title_order ? '' : 'display:none') + '"><legend>订单信息</legend></fieldset>';
                html += '			</td>';
                html += '		</tr>';
                if (opts.title_display) {
                    html += '<tr><td colspan="99" style="font-size: 17px;color: #2980B9;height: 36px;">首期账单</td></tr>';
                }
                html += '		<tr style="background: #6BB1E0;color: #fff;">';
                html += '			<td width="8%">期数</td>';
                html += '			<td width="9%">账单类型</td>';
                html += '			<td width="9%">应收金额(元)</td>';
                html += '			<td width="8%">实收金额(元)</td>';
                html += '			<td width="8%">未收款(元)</td>';
                html += '			<td width="8%">账单状态</td>';
                html += '			<td width="8%">应收款时间</td>';
                html += '			<td width="8%">实收款时间</td>';
                html += '			<td width="20%">备注</td>';
                html += '			<td width="6%">操作</td>';
                html += '		</tr>';
                html += '	</thead>';
                html += '	<tbody id="bill-list"></tbody>';
                html += '	<tfoot>';
                html += '		<tr>';
                html += '			<td colspan="99" id="bill-info" style="display:none;">';
                html += '				<div class="">';
                html += '					<button class="bill-add">添加账单</button>';
                html += '					<div class="bill-info-box">当期应收：<span class="repayTotal"></span>元，当期实收：<span class="realPayTotal"></span>元，未收款：<span class="dueInTotal error"></span>元</div>';
                html += '					<div class="bill-prop-box"></div>';
                html += '				</div>';
                html += '		    </td>';
                html += '		</tr>';
                html += '		<tr>';
                html += '			<td colspan="99">';
                html += '				<fieldset id="bill-duin" class="bill-fieldset" style="display:none;">';
                html += '					<legend>未收金额归期</legend>';
                html += '					<label style="display:block;float:left;padding: 0 6px;">期数：</label>';
                html += '					<select class="bill-return return-index"></select>';
                html += '					<label style="display:block;float:left;padding: 0 6px;">日期：</label>';
                html += '					<input type="text" class="bill-return return-data" placeholder="日期" readonly>';
                html += '					<label style="display:block;float:left;padding: 0 6px;">备注：</label>';
                html += '					<input type="text" class="bill-return bill_realRemarks" placeholder="备注" style="width:188px;border: 1px solid #F7867B;">';
                html += '				</fieldset>';
                html += '				<fieldset id="firstbillPayWay" class="bill-fieldset" style="display:none;">';
                html += '					<legend>付款&amp;收款方式</legend>';
                html += '					<dl style="margin-bottom: 10px;">';
                html += '						<dt style="display:block; float:left;font-size: 14px;width: 110px;text-align: right;">客户付款方式：</dt>';
                html += '						<dd>';
                html += '							<label class="common-borderbox">';
                html += '								<input type="checkbox" name="payWay" value="银行卡" data-type="bank">银行卡';
                html += '							</label>';
                html += '							<label class="common-borderbox">';
                html += '								<input type="checkbox" name="payWay" value="支付宝" data-type="zfb">支付宝';
                html += '							</label>';
                html += '							<label class="common-borderbox">';
                html += '								<input type="checkbox" name="payWay" value="微信" data-type="wx">微信';
                html += '							</label>';
                html += '							<label class="common-borderbox" id="lastPayWay">';
                html += '								<input type="checkbox" name="payWay" value="现金" data-type="xj">现金';
                html += '							</label>';
                html += '							<hr>';
                html += '						</dd>';
                html += '					</dl>';
                html += '					<dl>';
                html += '						<dt style="display:block; float:left;font-size: 14px;width: 110px;text-align: right;">公司收款方式：</dt>';
                html += '						<dd id="balcostway" style="float: left;">';
                html += '							<label class="common-borderbox">';
                html += '								<input type="radio" name="bank" value="工行6222***9976">工行6222***9976';
                html += '							</label>';
                html += '							<label class="common-borderbox">';
                html += '								<input type="radio" name="bank" value="工行3100***5665">工行3100***5665';
                html += '							</label>';
                html += '							<label class="common-borderbox">';
                html += '								<input type="radio" name="bank" value="建行6227***1787">建行6227***1787';
                html += '							</label>';
                html += '							<label class="common-borderbox">';
                html += '								<input type="radio" name="bank" value="农行6228***7879">农行6228***7879';
                html += '							</label>';
                html += '							<label class="common-borderbox" style="margin-bottom: 10px;">';
                html += '								<input type="radio" name="bank" value="农行3106***4832">农行3106***4832';
                html += '							</label>';
                html += '							<hr>';
                html += '							<label class="common-borderbox common-borderbox-checked">';
                html += '								<input type="checkbox" name="zfb" value="支付宝" checked disabled>支付宝';
                html += '							</label>';
                html += '							<label class="common-borderbox common-borderbox-checked">';
                html += '								<input type="checkbox" name="wx" value="微信" checked disabled>微信';
                html += '							</label>';
                html += '							<label class="common-borderbox common-borderbox-checked">';
                html += '								<input type="checkbox" name="xj" value="现金" checked disabled>现金';
                html += '							</label>';
                html += '							<hr>';
                html += '						</dd>';
                html += '					</dl>';
                html += '				</fieldset>';
                html += '			</td>';
                html += '		</tr>';
                html += '		<tr>';
                html += '			<td colspan="5" style="text-align: left;color: #E74C3C;">' + (opts.displayHint ? "注：若没有支付第一期账单，则无法完成合同审核" : "") + '</td>';
                html += '			<td colspan="5" style="text-align: right;">';
                html += '				<button id="payConfirm" name="confirm" class="hint-ff" style="display:none">付款</button>';
                html += '			</td>';
                html += '		</tr>';
                html += '	</tfoot>';
                html += '</table>';
                $(self).html(html).css({width: opts.width});
                this.queryContractInfo();
                this.addEvent();
            };
            /** 事件绑定*/
            this.addEvent = function () {
                var self = this;
                // 付款
                $("#payConfirm").on("click", function () {
                    self.showBillModel($(this));
                });
                // 归期时间绑定时间插件
                $(".return-data").datepicker();
                // 归属日期变更事件
                $(".return-data").on("change", function () {
                    var _returnData = $(".return-data");
                    var date0 = new Date(_returnData.val().replace(/-/g, "/")).getTime();
                    var dateCurr = new Date(returnValue(_returnData.attr("data-curr")).replace(/-/g, "/")).getTime();
                    var dateNext = new Date(returnValue(_returnData.attr("data-next")).replace(/-/g, "/")).getTime();
                    if (date0 < dateCurr || date0 > dateNext) {
                        _returnData.msg("归期日期必须在当期以内", true);
                        return;
                    }
                });
            };
            /** 查询合同信息*/
            this.queryContractInfo = function () {
                $.ajax({
                    type: "POST",
                    url: "/contractObject/queryContractInfo",
                    data: {
                        cno: opts.cno
                    },
                    dataType: "json",
                    success: function (result) {
                        if (result.code == 200) {
                            var contract = result.data.businessContract;
                            var chtml = '';
                            chtml += '<dl>';
                            chtml += '   <dt>租赁期限：</dt><dd>' + contract.contractBody_StartTOEnd + '（' + contract.contractBody_TimeLimit + '）' + '</dd>';
                            chtml += '   <dt>租赁价格：</dt><dd>' + contract.contractBody_Rent + '元/月</dd>';
                            chtml += '   <dt>保证金：</dt><dd>' + contract.contractBody_Pay + '元</dd>';
                            chtml += '   <dt>服务费：</dt><dd>' + contract.contractBody_Service + '元</dd>';
                            chtml += '   <dt>定金：</dt><dd>' + contract.contractBody_Depslit + '元</dd>';
                            chtml += '</dl>';
                            $("#bill-contract").append(chtml).data("data", contract);
                            $("#bill-contract>legend").html($("#bill-contract>legend").text() + '  <span class="error">No.' + contract.contractObject_No + '</span>');
                        }
                    }
                });
            };
            /** 查询租赁账单*/
            this.queryTenantBillFirstList = function () {
                var self = this;
                $.ajax({
                    type: "POST",
                    url: "/contractObject/queryTenantBillFirstList",
                    data: {
                        to_contractCode: opts.cno,
                        billCode: opts.code,
                        billCycle: opts.billCycle,
                        billType: opts.billType,
                        billReturnDateCode: opts.billReturnDateCode
                    },
                    traditional: true,
                    dataType: "json",
                    contentType: "application/x-www-form-urlencoded; charset=utf-8",
                    success: function (result) {
                        if (result.code == 200) {
                            var totalCosts = 0;
                            var totalRealMoney = 0;
                            var totalPropSurplus = 0;
                            var totalPropArrears = 0;

                            var rentDate = 0;
                            var rentMoney = 0;
                            var rentCycle = "";
                            var laleBoo = true;
                            var typeBoo = false;
                            var payState1 = false;
                            var payState2 = false;
                            /** 当前期数 */
                            var currCycle = "";

                            // 初始化账单列表
                            $("#bill-list").empty();
                            // 初始化订单信息
                            $(".bill-order-dl").remove();
                            // 初始化往期抵扣
                            $(".bill-prop-box").empty();

                            // 【合同订单】
                            var order = "";
                            order += '<dl class="bill-order-dl">';
                            order += '   <dt>订单号：</dt><dd>' + result.data.to_code + '</dd>';
                            order += '   <dt>租客信息：</dt><dd>' + result.data.to_name + ' / ' + result.data.to_phone + '</dd>';
                            order += '</dl>';
                            $("#bill-order").append(order).data("data", result.data);

                            $.each(result.data.list, function (index, data) {
                                // INDEX值
                                var milliseconds = new Date().getTime();
                                // 账单类型
                                var type = returnBillType(data.tb_type);
                                // 往期结余类型
                                var AsBoo = (data.tb_type == 11);
                                // 账单显示状态
                                var vaild = "old";
                                // 待还款状态
                                var stateBoo = (data.tb_state == '待还款' || data.tb_state == '逾期');
                                // 判断首期
                                var payCycleNum = (data.tb_payCycleNum == "0") ? "首期" : returnValue(data.tb_payCycleNum);

                                // 账单收支
                                var _tb_shouldMoney = "";
                                switch (data.tb_balPay) {
                                    case 0:
                                        _tb_shouldMoney = '<label class="error">-' + returnFloat(data.tb_shouldMoney) + '</label>';
                                        if (AsBoo) {
                                            totalPropSurplus += returnFloat(data.tb_shouldMoney);
                                        } else {
                                            totalCosts -= returnFloat(data.tb_shouldMoney);
                                            totalRealMoney -= returnFloat(data.tb_money);
                                        }
                                        break;
                                    case 1:
                                        _tb_shouldMoney = '<label class="ok">+' + returnFloat(data.tb_shouldMoney) + '</label>';
                                        if (AsBoo) {
                                            totalPropArrears += returnFloat(data.tb_shouldMoney);
                                        } else {
                                            totalCosts += returnFloat(data.tb_shouldMoney);
                                            totalRealMoney += returnFloat(data.tb_money);
                                        }
                                        break;
                                    default:
                                        break;
                                }
                                if (stateBoo) {
                                    $("#payConfirm").show();
                                }
                                // 免收判断
                                if (data.tb_state == "免收") {
                                    laleBoo = false;
                                } else if (data.tb_state == "已还款") {
                                    payState1 = true;
                                    vaild = "no";
                                } else if (data.tb_state == "待还款") {
                                    payState2 = true;
                                }
                                if (type == "租金") {
                                    typeBoo = true;
                                    rentDate = data.tb_shouldDate;
                                    rentMoney = data.tb_shouldMoney;
                                    rentCycle = data.tb_payCycleNum;
                                }
                                // 赋值当前期数
                                currCycle = data.tb_payCycleNum;

                                var tdHhtml = "";
                                tdHhtml += '<tr class="bill-oldbill oldbill' + milliseconds + index + '" data-vaild="' + (AsBoo ? "balance" : vaild) + '" style="background: ' + (index % 2 != 0 ? '#fff' : '#f8f8f8') + ';display:' + (AsBoo ? "none" : "") + '">';
                                tdHhtml += '   <td class="bill_payCycleNum">' + returnValue(payCycleNum) + '</td>';
                                tdHhtml += '   <td class="bill_type">' + type + '</td>';
                                tdHhtml += '   <td class="bill_balPay">' + _tb_shouldMoney + '</td>';
                                if (AsBoo) {
                                    tdHhtml += '   <td class="bill_realpayMoney" data-value="' + returnFloat(data.tb_shouldMoney) + '">' + _tb_shouldMoney + '</td>';
                                } else {
                                    tdHhtml += '   <td class="bill_realpayMoney" data-value="' + returnFloat(data.tb_shouldMoney) + '">' + returnFloat(data.tb_money) + '</td>';
                                }
                                tdHhtml += '   <td class="bill_balance">' + (isEmpty(data.tb_balance) ? "" : returnFloat(data.tb_shouldMoney)) + '</td>';
                                tdHhtml += '   <td class="bill_state">' + returnValue(data.tb_state) + '</td>';
                                tdHhtml += '   <td class="bill_shouldDate">' + format(data.tb_shouldDate, "yyyy-MM-dd") + '</td>';
                                tdHhtml += '   <td class="bill_date">' + format(data.tb_date, "yyyy-MM-dd") + '</td>';
                                tdHhtml += '   <td class="bill_remarks" title="' + returnValue(data.tb_text) + '">' + returnValue(data.tb_text) + '</td>';
                                tdHhtml += '   <td></td>';
                                tdHhtml += '</tr>';

                                $("#bill-list").append(tdHhtml).attr("data-code", data.tb_code);
                                $(".oldbill" + milliseconds + index).data("data", data);

                                if (AsBoo) {
                                    switch (data.tb_type) {
                                        case 11:
                                            // 结余
                                            $(".bill-prop-box").append('<div class="bill-prop">' + '<label class="next">' + returnBillType(data.tb_type) + '：</label>' + '<span class="propSurplus error">' + returnFloat(data.tb_shouldMoney) + '</span>元' + '<label class="common-checkbox"><input type="checkbox" name="surplus" value="' + returnFloat(data.tb_shouldMoney) + '" data-rdCode="' + returnValue(data.tb_returnDateCode) + '" data-target="oldbill' + milliseconds + index + '">抵扣</label>' + '</div>');
                                            break;
                                        case 12:
                                            // 欠款
                                            $(".bill-prop-box").append('<div class="bill-prop">' + '<label class="hint">' + returnBillType(data.tb_type) + '：</label>' + '<span class="propArrears error">' + returnFloat(data.tb_shouldMoney) + '</span>元' + '<label class="common-checkbox"><input type="checkbox" name="arrears" value="' + returnFloat(data.tb_shouldMoney) + '" data-rdCode="' + returnValue(data.tb_returnDateCode) + '" data-target="oldbill' + milliseconds + index + '">抵扣</label>' + '</div>');
                                            break;
                                        default:
                                            break;
                                    }
                                }
                            });

                            // 账单期数遍历
                            $(".return-index").empty();
                            var nextDate = false;
                            $.each(result.data.listTotal, function (index, data) {
                                if (nextDate) {
                                    $(".return-data").attr("data-next", returnDate(data.tb_shouldDate));
                                    $(".return-index").append('<option value="' + data.tb_payCycleNum + '" data-date="' + returnDate(data.tb_shouldDate) + '">' + ((data.tb_payCycleNum == "0") ? "首" : returnValue(data.tb_payCycleNum)) + '期</option>');
                                    nextDate = false;
                                }
                                if (data.tb_payCycleNum == currCycle && (data.tb_state == '待还款' || data.tb_state == '逾期')) {
                                    $(".return-index").append('<option value="' + data.tb_payCycleNum + '" data-date="' + returnDate(data.tb_shouldDate) + '">' + ((data.tb_payCycleNum == "0") ? "首" : returnValue(data.tb_payCycleNum)) + '期</option>');
                                    $(".return-data").val(returnDate(data.tb_shouldDate)).attr("data-curr", returnDate(data.tb_shouldDate));
                                    nextDate = true;
                                }
                            });
                            // 滞纳金
                            if (typeBoo && laleBoo) {
                                var currDate = new Date().getTime();
                                var shouldDate = returnNumber(rentDate);
                                var chaDay = shouldDate - currDate;
                                if (chaDay < 0) {
                                    var any = ((returnNumber(Math.abs(chaDay / (24 * 60 * 60 * 1000)))) * (returnFloat(rentMoney) / 30 * 0.05)).toFixed(2);
                                    $(".bill-info-box").append('<div class="bill-latefee">滞纳金：<span class="latefeeCost error">' + any + '</span>元<label class="common-checkbox common-checkbox-checked" style="display: inline-block;float: initial;top: 1px;"><input type="checkbox" name="latefee" value="' + any + '" data-cycle="' + rentCycle + '" checked>免收</label></div>');
                                    $('input[name="latefee"]').on("click", function () {
                                        var _zljBill = $(".zljBill");
                                        if ($(this).is(":checked")) {
                                            _zljBill.find(".bill_state").html("免收");
                                        } else {
                                            _zljBill.find(".bill_state").html("待还款");
                                        }
                                        self.calTotalMonry();
                                    });
                                }
                            }
                            if (!payState1 && payState2) {
                                $("#payConfirm").attr("data-state", "ok");
                            }
                            // 初始化应收
                            $(".repayTotal").text(totalCosts);
                            // 初始化实收
                            $(".realPayTotal").text(totalRealMoney);
                            // 初始化未收
                            $(".dueInTotal").text(returnFloat(totalCosts - totalRealMoney));
                            // 抵扣绑定执行事件
                            $("input[name='surplus'],input[name='arrears']").on("click", function () {
                                if ($(this).is(":checked")) {
                                    $("." + $(this).attr("data-target")).show().find(".bill_realRemarks").val("抵扣");
                                } else {
                                    $("." + $(this).attr("data-target")).hide();
                                }
                                self.calTotalMonry();
                            });
                            // 列表ID设置数据
                            $("#bill-list").data("data", result.data.list);
                        }
                    }
                });
            };
            /** 计算金额*/
            this.calTotalMonry = function () {
                var _repayTotal = 0;
                // 应收金额
                var _bill_realmoney = 0;
                // 实收金额
                $(".bill_realmoney[data-cal='old']:visible").each(function () {
                    var _data = $(this).parents(".bill-oldbill").data("data");
                    if (_data.tb_balPay == 0) {
                        _repayTotal -= returnFloat($(this).parent().attr("data-value"));
                        _bill_realmoney -= returnFloat($(this).val());
                    }
                    if (_data.tb_balPay == 1) {
                        _repayTotal += returnFloat($(this).parent().attr("data-value"));
                        _bill_realmoney += returnFloat($(this).val());
                    }
                    var val = returnFloat($(this).parent().attr("data-value")) - returnFloat($(this).val());
                    if (val != 0) {
                        $(this).parents(".bill-oldbill").find(".bill_balance").text(val);
                    } else {
                        $(this).parents(".bill-oldbill").find(".bill_balance").empty();
                    }
                });
                $(".bill_realmoney[data-cal='new']").each(function () {
                    var bill_balPay = $(this).parent().siblings(".bill_balPay");
                    if (returnNumber(bill_balPay.attr("data-type")) == 0) {
                        _repayTotal -= returnFloat(bill_balPay.attr("data-value"));
                        _bill_realmoney -= returnFloat($(this).val());
                    }
                    if (returnNumber(bill_balPay.attr("data-type")) == 1) {
                        _repayTotal += returnFloat(bill_balPay.attr("data-value"));
                        _bill_realmoney += returnFloat($(this).val());
                    }
                });
                var latefee = 0;
                var _latefee = $("input[name='latefee']");
                if (!_latefee.is(":checked")) {
                    latefee = returnFloat(_latefee.val());
                }
                $(".repayTotal").text(_repayTotal + latefee);
                $(".realPayTotal").text(_bill_realmoney + latefee);

                //				var _propSurplus = returnFloat($("input[name='surplus']:checked").val()); // 结余金额
                //				var _propArrears  = returnFloat($("input[name='arrears']:checked").val()); // 欠缴金额
                var dueInTotal = _repayTotal - _bill_realmoney;
                // + _propArrears - _propSurplus ;
                // 未收金额 =应收+欠缴-结余-实收
                $(".dueInTotal").text(dueInTotal.toFixed(2));
                if (dueInTotal != 0) {
                    if (dueInTotal < 0) {
                        $(".return-index>option").hide().eq(1).attr("selected", "selected").show();
                    } else {
                        $(".return-index>option").hide().eq(0).attr("selected", "selected").show();
                    }
                    $("#bill-duin").show().data("data", $(".bill-oldbill").eq(0).data("data"));
                } else {
                    $("#bill-duin").hide();
                }
            };
            /** 滞纳金*/
            this.initLateFee = function (param, cycle) {
                var len = $(".bill-oldbill").length;
                var zlHhtml = "";
                zlHhtml += '<tr class="bill-oldbill zljBill" data-vaild="zlj" style="background: ' + (len % 2 != 0 ? '#fff' : '#f8f8f8') + ';">';
                zlHhtml += '   <td class="bill_payCycleNum" data-value="' + cycle + '">' + ((cycle == "0") ? "首期" : cycle) + '</td>';
                zlHhtml += '   <td class="bill_type" data-type="13">滞纳金</td>';
                zlHhtml += '   <td class="bill_balPay"><label class="ok">+' + param + '</label></td>';
                zlHhtml += '   <td class="bill_realpayMoney"><input type="text" class="bill_realmoney money" data-value="' + param + '" value="' + param + '" maxlength="7" readonly></td>';
                zlHhtml += '   <td></td>';
                zlHhtml += '   <td class="bill_state"><label class="ok">免收</label></td>';
                zlHhtml += '   <td>--</td>';
                zlHhtml += '   <td class="bill_date"><input type="text" class="bill_realDate" value="' + format(new Date(), "yyyy-MM-dd") + '" placeholder="实收款时间" readonly></td>';
                zlHhtml += '   <td class="bill_remarks"><input type="text" class="bill_realRemarks" placeholder="备注"></td>';
                zlHhtml += '   <td class="bill_option"></td>';
                zlHhtml += '</tr>';
                $("#bill-list").append(zlHhtml);
            };
            /** 付款*/
            this.showBillModel = function (obj) {
                var self = this;
                // 【付款】
                if ($("#firstbillPayWay").is(":hidden")) {
                    $(obj).text("确认付款");
                    $('.bill-oldbill').each(function (index, data) {
                        var _data = $(this).data("data");
                        if (_data.tb_state == '待还款' || _data.tb_state == '逾期') {
                            // 实收金额
                            var _bill_realpayMoney = $(this).find(".bill_realpayMoney:visible");
                            _bill_realpayMoney.empty().html('<input type="text" class="bill_realmoney money" data-cal="old" value="' + returnFloat(_bill_realpayMoney.attr("data-value")) + '" maxlength="7">');
                            // 实收时间
                            $(this).find(".bill_date").empty().html('<input type="text" class="bill_realDate" value="' + returnDate(new Date()) + '" placeholder="实收款时间" readonly>');
                            // 账单备注
                            var _bill_remarks = $(this).find(".bill_remarks");
                            _bill_remarks.empty().html('<input type="text" class="bill_realRemarks" value="' + _bill_remarks.text() + '" placeholder="备注">');
                        }
                    });
                    // 填写实收金额触发金额计算事件
                    $(document).on("keyup", ".bill_realmoney", function () {
                        self.calTotalMonry();
                    });
                    $("input[name='payWay']").on("click", function () {
                        $("#balcostway>.common-borderbox").hide();
                        $("input[name='payWay']:checked").each(function (index, data) {
                            $("input[name='" + $(this).attr("data-type") + "']").parent().show();
                        });
                    });

                    $("#balcostway>.common-borderbox").hide();
                    $("#firstbillPayWay").show();
                    $(".bill-add").show();
                    $("#bill-info").show();
                    self.calTotalMonry();

                    // 绑定事件添加账单按钮
                    $(".bill-add").on("click", function () {
                        var milliseconds = new Date().getTime();
                        $(this).before('<button class="bill-confirm">确定</button><button class="bill-cancel" data-index="' + milliseconds + '">取消</button>').hide();
                        // 类型
                        var typeCode = new Array();
                        var payCycleNum = "";
                        var tb_payCycleNum = "";
                        $.each($("#bill-list").data("data"), function (index, data) {
                            tb_payCycleNum = data.tb_payCycleNum;
                            payCycleNum = (data.tb_payCycleNum == "0") ? "首期" : data.tb_payCycleNum;
                        });
                        $(".bill_type").each(function () {
                            typeCode.push(returnNumber($(this).attr("data-type")));
                        });
                        // 获取非已存在的类型
                        $.ajax({
                            type: "POST",
                            url: "/contractObject/queryBusinesType",
                            data: {
                                type: "NOT",
                                typeCodes: typeCode
                            },
                            dataType: "json"
                        }).done(function (result) {
                            if (result.code == 200) {
                                var _typeHtml = '';
                                _typeHtml += '<select class="bill_select">';
                                _typeHtml += '<option value="-1">账单类型</option>';
                                $.each(result.data, function (index, data) {
                                    _typeHtml += '<option value="' + data.bt_code + '">' + data.bt_name + '</option>';
                                });
                                _typeHtml += '</select>';
                                $(".cancel" + milliseconds + ">.bill_type").html(_typeHtml);
                                $(".bill_select").on("change", function () {
                                    $(this).css({
                                        color: $(this).find("option:selected").css("color")
                                    });
                                    $(this).parent().attr("data-value", $(this).val());
                                });
                            }
                        });
                        var html = "";
                        html += '<tr class="bill-addbill cancel' + milliseconds + '">';
                        html += '   <td class="bill_payCycleNum" data-value="' + tb_payCycleNum + '"><span class="span-new">new</span>' + returnValue(payCycleNum) + '</td>';
                        html += '   <td class="bill_type"></td>';
                        html += '   <td class="bill_balPay">';
                        html += '   <select class="bill_select bill_select_left"><option value="1" style="color: #27AE60;">收</option><option value="0" style="color:#E74C3C;">支</option></select>';
                        html += '   <input type="text" class="bill_remoney money" maxlength="7" style="text-indent:34px"></td>';
                        html += '   <td class="bill_realpayMoney"><input type="text" class="bill_realmoney money" value="" maxlength="7"></td>';
                        html += '   <td></td>';
                        html += '   <td>--</td>';
                        html += '   <td>--</td>';
                        html += '   <td class="bill_date"><input type="text" class="bill_realDate" value="' + returnDate(new Date()) + '" placeholder="实收款时间" readonly></td>';
                        html += '   <td class="bill_remarks"><input type="text" class="bill_realRemarks" placeholder="备注"></td>';
                        html += '   <td class="bill_option"></td>';
                        html += '</tr>';
                        $("#bill-list").append(html);
                        $(".bill_realDate").datepicker();

                        // 取消添加账单
                        $(".bill-cancel").on("click", function () {
                            $(".cancel" + $(this).attr("data-index")).remove();
                            $(".bill-cancel,.bill-confirm").hide();
                            $(".bill-add").show();
                        });
                        // 确定添加账单
                        $(".bill-confirm").on("click", function () {
                            var _cancel = $(".cancel" + milliseconds);
                            var _bill_type = _cancel.find(".bill_type>select>option:selected");
                            var _bill_balPay = _cancel.find(".bill_balPay>select>option:selected");
                            // 账单类型
                            if (_bill_type.val() == -1) {
                                $(this).msg("请选择账单类型", true);
                                _cancel.find(".bill_type>select").focus();
                                return;
                            }
                            // 实收金额
                            if (isEmpty(_cancel.find(".bill_realmoney").val())) {
                                $(this).msg("请填写实收金额", true);
                                _cancel.find(".bill_realmoney").focus();
                                return;
                            }
                            _cancel.find(".bill_type").text(_bill_type.text()).attr("data-type", _bill_type.val());
                            _cancel.find(".bill_realmoney").attr("data-cal", "new");
                            _cancel.find(".bill_balPay").attr("data-type", _bill_balPay.val());
                            _cancel.find(".bill_balPay").attr("data-value", returnFloat(_cancel.find(".bill_remoney").val()));
                            if (_bill_balPay.val() == 0) {
                                _cancel.find(".bill_balPay").html('<label class="error">-' + returnFloat(_cancel.find(".bill_remoney").val()) + '</label>');
                            }
                            if (_bill_balPay.val() == 1) {
                                _cancel.find(".bill_balPay").html('<label class="ok">+' + returnFloat(_cancel.find(".bill_remoney").val()) + '</label>');
                            }
                            _cancel.find(".bill_option").html('<a href="javascript:;" style="color:#E74C3C !important" class="bill-del" data-index="' + milliseconds + '">删除</a>');
                            $(".bill-cancel,.bill-confirm").hide();
                            $(".bill-add").show();
                            // 删除
                            $(".bill-del").on("click", function () {
                                $(".cancel" + $(this).attr("data-index")).remove();
                                self.calTotalMonry();
                            });
                            self.calTotalMonry();
                        });
                    });
                    var _latefee = $("input[name='latefee']");
                    if (_latefee.length >= 1) {
                        self.initLateFee(_latefee.val(), _latefee.attr("data-cycle"));
                    }

                    // 绑定日期控件
                    $(".bill_realDate").datepicker();
                } else {
                    // 【确定付款】
                    // 判断收款付款方式
                    if ($(".bill-add").is(":hidden")) {
                        $(".bill-confirm").msg("您还有未处理完成的账单", true);
                        return;
                    }
                    // 归期日期判断
                    var _returnData = $(".return-data");
                    var date0 = new Date(_returnData.val().replace(/-/g, "/")).getTime();
                    var dateCurr = new Date(returnValue(_returnData.attr("data-curr")).replace(/-/g, "/")).getTime();
                    var dateNext = new Date(returnValue(_returnData.attr("data-next")).replace(/-/g, "/")).getTime();
                    if (date0 < dateCurr || date0 > dateNext) {
                        _returnData.msg("归期日期必须在当期以内", true);
                        return;
                    }
                    // 归期备注
                    if ($("#bill-duin").is(":visible")) {
                        var _bill_realRemarks = $("#bill-duin").find(".bill_realRemarks");
                        if (isEmpty(_bill_realRemarks.val())) {
                            _bill_realRemarks.msg("请填写备注", true);
                            return;
                        }
                    }
                    // 判断收款付款方式
                    if ($("input[name='payWay']:checked").length < 1) {
                        $("#lastPayWay").msg("请选择付款方式", true);
                        return;
                    }
                    // 判断银行卡
                    if ($("input[data-type='bank']").is(":checked")) {
                        if ($("input[name='bank']:checked").length < 1) {
                            $(obj).msg("请选择一项银行卡收款方式", true);
                            return;
                        }
                    }
                    // 提交账单数据
                    self.submitTenantBill();
                }
            };
            /** 提交账单付款信息*/
            this.submitTenantBill = function () {
                var self = this;
                // 支付方式
                var payWay = "";
                $("input[name='payWay']:checked").each(function (index, data) {
                    payWay += ((index + 1) != $("input[name='payWay']:checked").length ? $(this).val() + "+" : $(this).val());
                });
                // 【添加旧账单】
                var tenantBillList = new Array();
                $('.bill-oldbill[data-vaild="old"]').each(function () {
                    var _data = $(this).data("data");
                    var tenantBill = {};
                    tenantBill.tb_payCycleNum = returnValue(_data.tb_payCycleNum);
                    tenantBill.tb_type = returnNumber(_data.tb_type);
                    tenantBill.tb_balPay = returnNumber(_data.tb_balPay);
                    tenantBill.tb_payWay = payWay;
                    // 支付方式
                    tenantBill.tb_balance = returnFloat($(this).find(".bill_balance").text());
                    tenantBill.tb_state = returnValue(_data.tb_state);
                    tenantBill.tb_shouldMoney = returnFloat($(this).find(".bill_realpayMoney").attr("data-value"));
                    tenantBill.tb_money = returnFloat($(this).find(".bill_realmoney").val());
                    tenantBill.tb_date = $(this).find(".bill_realDate").val();
                    tenantBill.tb_text = $(this).find(".bill_realRemarks").val();
                    tenantBill.tb_returnDateCode = returnValue(_data.tb_returnDateCode);
                    tenantBill.tb_extState = "update";
                    tenantBillList.push(tenantBill);
                });
                // 【滞纳金】
                $('.bill-oldbill[data-vaild="zlj"]').each(function () {
                    var tenantBill = {};
                    tenantBill.tb_payCycleNum = returnValue($(this).find(".bill_payCycleNum").attr("data-value"));
                    tenantBill.tb_type = returnNumber($(this).find(".bill_type").attr("data-type"));
                    tenantBill.tb_balPay = 1;
                    tenantBill.tb_payWay = payWay;
                    // 支付方式
                    tenantBill.tb_balance = returnFloat($(this).find(".bill_balance").text());
                    tenantBill.tb_state = returnValue($(this).find(".bill_state").text());
                    tenantBill.tb_shouldMoney = returnFloat($(this).find(".bill_realmoney").attr("data-value"));
                    tenantBill.tb_money = returnFloat($(this).find(".bill_realmoney").val());
                    tenantBill.tb_date = returnValue($(this).find(".bill_realDate").val());
                    tenantBill.tb_text = returnValue($(this).find(".bill_realRemarks").val());
                    tenantBill.tb_extState = "zlj";
                    tenantBillList.push(tenantBill);
                });
                // 【欠款】
                $('.bill-oldbill[data-vaild="false"]').each(function () {
                    var _data = $(this).data("data");
                    var tenantBill = {};
                    tenantBill.tb_payCycleNum = returnValue(_data.tb_payCycleNum);
                    tenantBill.tb_returnDateCode = returnValue(_data.tb_returnDateCode);
                    tenantBill.tb_type = returnNumber(_data.tb_type);
                    tenantBill.tb_balPay = returnNumber(_data.tb_balPay);
                    tenantBill.tb_payWay = payWay;
                    tenantBill.tb_balance = returnFloat($(this).find(".bill_balance").text());
                    tenantBill.tb_state = returnValue(_data.tb_state);
                    tenantBill.tb_shouldMoney = returnFloat(_data.tb_shouldMoney);
                    tenantBill.tb_money = returnFloat($(this).find(".bill_realmoney").val());
                    tenantBill.tb_date = $(this).find(".bill_realDate").val();
                    tenantBill.tb_text = $(this).find(".bill_realRemarks").val();
                    tenantBill.tb_extState = "add";
                    tenantBillList.push(tenantBill);
                });
                // 【结余】
                $('.bill-oldbill[data-vaild="balance"]').each(function () {
                    var _data = $(this).data("data");
                    var tenantBill = {};
                    var isSurplus = $('input[name="surplus"]').is(":checked");

                    tenantBill.tb_payCycleNum = returnValue(_data.tb_payCycleNum);
                    tenantBill.tb_returnDateCode = returnValue(_data.tb_returnDateCode);
                    tenantBill.tb_type = returnNumber(_data.tb_type);
                    tenantBill.tb_balPay = returnNumber(_data.tb_balPay);
                    tenantBill.tb_payWay = payWay;
                    tenantBill.tb_balance = returnFloat($(this).find(".bill_balance").text());
                    tenantBill.tb_state = returnValue(_data.tb_state);
                    tenantBill.tb_shouldMoney = returnFloat(_data.tb_shouldMoney);
                    tenantBill.tb_date = $(this).find(".bill_realDate").val();
                    if (isSurplus) {
                        tenantBill.tb_money = returnFloat($(this).find(".bill_realpayMoney").attr("data-value"));
                        tenantBill.tb_text = returnFloat($(this).find(".bill_realRemarks").val());
                        tenantBill.tb_extState = "update";
                    } else {
                        tenantBill.tb_money = 0;
                        tenantBill.tb_text = "";
                        tenantBill.tb_extState = "balance";
                    }
                    tenantBillList.push(tenantBill);
                });

                // 【新添加账单】
                $(".bill-addbill").each(function () {
                    var tenantBill = {};
                    tenantBill.tb_payCycleNum = $(this).find(".bill_payCycleNum").attr("data-value");
                    tenantBill.tb_type = $(this).find(".bill_type").attr("data-type");
                    tenantBill.tb_balPay = $(this).find(".bill_balPay").attr("data-type");
                    tenantBill.tb_shouldMoney = returnFloat($(this).find(".bill_balPay").attr("data-value"));
                    tenantBill.tb_money = returnFloat($(this).find(".bill_realmoney").val());
                    tenantBill.tb_payWay = payWay;
                    tenantBill.tb_shouldDate = $(".bill_shouldDate").eq(0).text();
                    tenantBill.tb_date = $(this).find(".bill_realDate").val();
                    tenantBill.tb_text = $(this).find(".bill_realRemarks").val();
                    tenantBill.tb_extState = "add";
                    tenantBillList.push(tenantBill);
                });
                // 【未收金额归期】
                var _dueInTotal = returnFloat($(".dueInTotal").text());
                if (_dueInTotal != 0) {
                    var tenantBill = {};
                    tenantBill.tb_payCycleNum = $(".return-index>option:selected").val();
                    // 大于0为欠款，小于0为结余
                    if (_dueInTotal > 0) {
                        tenantBill.tb_type = 12;
                    } else {
                        tenantBill.tb_type = 11;
                    }
                    tenantBill.tb_balPay = (_dueInTotal > 0) ? 1 : 0;
                    tenantBill.tb_shouldMoney = Math.abs(_dueInTotal);
                    tenantBill.tb_shouldDate = $(".return-data").val();
                    tenantBill.tb_text = $("#bill-duin").find(".bill_realRemarks").val();
                    tenantBill.tb_extState = "not";
                    tenantBillList.push(tenantBill);
                }
                var data = {};
                data.cno = opts.cno;
                var _data = $("#bill-order").data("data");
                data.tb_code = _data.to_code;
                data.tb_name = _data.to_name;
                data.tb_phone = _data.to_phone;
                data.tenantBillList = tenantBillList;

                //				$.ajax({
                //					type : "POST",
                //					url : "/addContractFirstAccountStatement",
                //					data : JSON.stringify(data),
                //					traditional : true,
                //					contentType : "application/json; charset=utf-8",
                //					dataType : "json",
                //					success : function(result) {
                //						if (result.code == 200) {
                //							swal({
                //								title : "付款成功",
                //								text : "",
                //								type : "success"
                //							}, function() {
                //								self.init();
                //								self.queryTenantBillFirstList();
                //								opts.result();
                //							});
                //						} else {
                //							swal("付款失败", result.msg, "warning");
                //						}
                //					}
                //				});
            };
            // 执行
            this.init();
            this.queryTenantBillFirstList();
            opts.init();
        });
    };
})($, document);

/* 插件-交接结算显示 */
;(function ($, document) {
    $.fn.handoverBox = function (options) {
        return this.each(function () {
            var self = this;
            var opts = {};
            // 保留参数
            var defaults = {
                data: {}, // 查询参数
                mode: "query", // 模式("query","review","edit")
                display_title: true, // 显示标题，默认显示
                display_all: false, // 显示全部数据，默认不全部
                init: function () {
                },
                error: function () {
                },
                result: function () {
                }
            };
            var opts = $.extend(defaults, options);

            /** 初始化*/
            this.init = function () {
                this.createHTML();
            };
            /** 初始化页面元素*/
            this.createHTML = function () {
                $(".cancel-list-content").remove();

                $.ajax({
                    type: "POST",
                    url: "/contractObject/queryContractStatementInfo",
                    data: opts.data,
                    dataType: "json",
                    beforeSend: function () {
                        $(self).html('<i class="loading"></i>');
                    }
                }).done(function (result) {
                    if (result.code != 200) {
                        opts.error(result.msg);
                        return;
                    }
                    var _data = result.data;
                    // 合同信息
                    var contract = _data.contract;
                    // 客户信息
                    var customer = _data.customer;
                    // 招租订单
                    var cancelContract = _data.cancelContract;
                    // 能源卡信息
                    var energyCardList = _data.energyCardList;
                    // 能源卡数值信息
                    var cardValueList = _data.cardValueList;
                    // 结算单
                    var statementOrder = _data.statementOrder;
                    // 结算单-消费清单
                    var statementCostItems = _data.statementCostItems;
                    // 结算单-物品清单
                    var statementDamageItems = _data.statementDamageItems;
                    // 结算单-费用结余
                    var statementBalances = _data.statementBalances;

                    // 调用外部方法
                    opts.init(contract, statementOrder);

                    // 模式判断
                    var _mode_boo = true;
                    if (opts.data.mode == "in") {
                        if (isEmpty(statementOrder)) {
                            opts.error("没有结算单");
                            return;
                        }
                    }
                    if (opts.data.mode == "out") {
                        if (isEmpty(cancelContract)) {
                            opts.error("没有结算单");
                            return;
                        }
                        if (!isEmpty(cancelContract) && isEmpty(statementOrder)) {
                            _mode_boo = false;
                        }
                    }

                    // 交房/接房变更
                    var _tyoe_title = "";
                    if (!isEmpty(statementOrder) && statementOrder.statement_type == 0) {
                        if (contract.contractObject_Type == '托管合同') {
                            _tyoe_title = "交房日期";
                        }
                        if (contract.contractObject_Type == '租赁合同') {
                            _tyoe_title = "接房日期";
                        }
                    } else {
                        if (contract.contractObject_Type == '托管合同') {
                            _tyoe_title = "接房日期";
                        }
                        if (contract.contractObject_Type == '租赁合同') {
                            _tyoe_title = "交房日期";
                        }
                    }

                    var html = "";
                    html += '<div class="content-main cancel-list-content"  style="padding: 8px;width: 100%;">';
                    // 【是否显示标题】
                    if (opts.display_title) {
                        // 标题变更
                        var _order_title = (contract.contractObject_Type == "托管合同" ? "业主接房结算单" : "租客交房结算单");

                        html += '	<div class="content-item content-item-title">' + _order_title + '<label class="contract-code-box error">NO.' + returnValue(cancelContract.cco_code) + '</label>';
                        html += '		<dl class="cancel-main-option">';
                        html += '		    <dt onclick="displayCancelRecord(this,\'' + cancelContract.cco_code + '\')"><i class="fa-reorder" style="margin-right: 4px;"></i>合约记录</dt>';
                        html += '		    <dd id="cancel-main-option-dd" style="display:none">';
                        html += '		        <div class="loading"></div>';
                        html += '		    </dd>';
                        html += '		</dl>';
                        html += '	</div>';
                    }
                    html += '	<div class="content-item">';
                    html += '		<table class="content-table">';
                    html += '			<thead>';
                    html += '				<tr>';
                    html += '					<td colspan="6" class="title" style="text-align:left; border-right: 0;">';
                    html += '						<span style="color: #000;margin-right: 6px;">房号</span>';
                    html += '						<span class="house_address next" style="color: #000;"></span>';
                    html += '					</td>';
                    html += '					<td colspan="2" class="title" style="text-align:right;border-left: 0;">';
                    html += '						<span style="color: #000;margin-right: 6px;">结算日期</span>';
                    html += '						<span class="calCostDate next">--</span>';
                    html += '					</td>';
                    html += '				</tr>';
                    html += '			</thead>';
                    html += '			<tbody>';
                    html += '				<!-- 基本信息 -->';
                    html += '				<tr class="content-table-head">';
                    html += '					<td class="title">客户</td>';
                    html += '					<td><input type="text" class="next" name="cco_applicant" disabled></td>';
                    html += '					<td class="title">合同日期</td>';
                    html += '					<td style="width: 190px;"><input type="text" class="next" name="contract_date" disabled></td>';
                    html += '					<td class="title">最近交租日</td>';
                    html += '					<td><input type="text" class="next" name="" value="--" disabled></td>';
                    html += '					<td class="title">' + _tyoe_title + '</td>';
                    html += '					<td><input type="text" name="cco_realDate" disabled required></td>';
                    html += '				</tr>';
                    html += '				<tr class="content-table-head">';
                    html += '					<td class="title">月租金</td>';
                    html += '					<td><input type="text" class="error" name="contract_rent" disabled></td>';
                    html += '					<td class="title">押金</td>';
                    html += '					<td><input type="text" class="error" name="contractBody_Pay" disabled></td>';
                    html += '					<td class="title">银行卡</td>';
                    if (opts.mode == "review") {
                        html += '					<td colspan="3">';
                        html += '						<input type="text" class="next" name="customer_bank" style="width:90%;float: left;height: 36px;" disabled>';
                        html += '						<button id="edit-customer-bank" style="width:10%;height: 36px;float: left;background: #3498db;color: #fff;border: none;cursor: pointer;">选择</button>';
                        html += '					</td>';
                    } else {
                        html += '					<td colspan="3"><input type="text" class="next" name="customer_bank" disabled></td>';
                    }
                    html += '				</tr>';
                    html += '				<tr class="content-table-head">';
                    html += '					<td class="title">合约备注</td>';
                    html += '					<td colspan="7" ><textarea class="error" id="cco_applicationContent" disabled></textarea></td>';
                    html += '				</tr>';
                    html += '		</table>';
                    html += '	</div>';
                    // 【是否有结算单】
                    if (_mode_boo) {
                        html += '	<div class="content-item">';
                        // 【是否显示全部】
                        if (!opts.display_all) {
                            html += '		<div class="content-item-more"><i class="icon-double-angle-right"></i><label style="margin: 0 8px;">查看详情</label><i class="icon-double-angle-left"></i></div>';
                            html += '		<div class="content-item-table" style="display:none">';
                        } else {
                            html += '		<div class="content-item-table">';
                        }
                        html += '		   <table class="content-table content-item-more-table">';

                        if (opts.data.mode == "out") {
                            // ====代理费结算 ============================================================================
                            html += '		   		<tr data-type="代理费">';
                            html += '		   			<td class="content-table-title" colspan="8" style="border-top: none;">代理费结算（管家填写）</td>';
                            html += '		   		</tr>';
                            html += '		   		<tr data-type="代理费" class="content-table-head" style="background: #f5f8fa;">';
                            html += '		   			<td class="title" colspan="2">结算费用</td>';
                            html += '		   			<td class="title" colspan="5">收费说明</td>';
                            html += '		   			<td>小计</td>';
                            html += '		   		</tr>';
                            html += '		   		<tr data-type="代理费" class="agent">';
                            // html += '		   			<td class="cco_applicationType error"></td>';
                            html += '		   			<td colspan="2"><input type="text" class="error" name="sci_unitPrice" style="text-align: center;" disabled required></td>';
                            html += '		   			<td colspan="5"><input type="text" name="sci_desc" disabled></td>';
                            html += '		   			<td><input type="text" class="error" name="sci_totalCosts" disabled></td>';
                            html += '		   		</tr>';
                            html += '		   		<tr data-type="代理费" class="agent">';
                            html += '		   			<td class="title" colspan="7" style="text-align: right;">合计</td>';
                            html += '		   			<td><input type="text" class="error" name="total-cost" id="statement_agent" disabled></td>';
                            html += '		   		</tr>';
                            // ====消费结算 ============================================================================
                            html += '		   		<tr>';
                            html += '		   			<td class="content-table-title" colspan="8">消费结算（管家填写）</td>';
                            html += '		   		</tr>';
                        } else {
                            // ====消费结算 ============================================================================
                            html += '		   		<tr>';
                            html += '		   			<td class="content-table-title" colspan="8" style="border-top: none;">消费结算（管家填写）</td>';
                            html += '		   		</tr>';
                        }
                        html += '		   		<tr class="content-table-head" style="background: #f5f8fa;">';
                        html += '		   			<td class="title">消费类型</td>';
                        html += '		   			<td class="title">卡号</td>';
                        html += '		   			<td class="title" colspan="2">未交费起止数（或月）</td>';
                        html += '		   			<td class="title">消费量</td>';
                        html += '		   			<td class="title">单价</td>';
                        html += '		   			<td class="title">违约金</td>';
                        html += '		   			<td class="title">小计</td>';
                        html += '		   		</tr>';
                        html += '		   		<tr class="consume content-table-item" data-type="消费" data-name="水">';
                        html += '		   			<td class="title">水/m³</td>';
                        html += '		   			<td><input type="text" name="sci_card" style="text-align: center;" disabled></td>';
                        html += '		   			<td colspan="2" class="consume-list">';
                        html += '		   				<span style="display: inline-block;width: 23%;">起数</span>';
                        html += '		   				<input type="text" class="error" name="sci_desc_q" style="width: 25%;text-align: center;" disabled>';
                        html += '		   				<span style="display: inline-block;width: 23%;border-left: 1px solid #ddd;">止数</span>';
                        html += '		   				<input type="text" class="error" name="sci_desc_z" style="width: 25%;text-align: center;" disabled>';
                        html += '		   			</td>';
                        html += '		   			<td><input type="text" class="error" name="sci_number" disabled></td>';
                        html += '		   			<td><input type="text" class="error" name="sci_unitPrice" disabled></td>';
                        html += '		   			<td><input type="text" class="error" name="sci_penalty" disabled></td>';
                        html += '		   			<td><input type="text" class="error" name="sci_totalCosts"  disabled></td>';
                        html += '		   		</tr>';
                        html += '		   		<tr class="consume content-table-item" data-type="消费" data-name="电">';
                        html += '		   			<td class="title">电/度</td>';
                        html += '		   			<td><input type="text" name="sci_card" style="text-align: center;" disabled></td>';
                        html += '		   			<td colspan="2" class="consume-list">';
                        html += '		   				<span style="display: inline-block;width: 23%;">起数</span>';
                        html += '		   				<input type="text" class="error" name="sci_desc_q" style="width: 25%;text-align: center;" disabled>';
                        html += '		   				<span style="display: inline-block;width: 23%;border-left: 1px solid #ddd;">止数</span>';
                        html += '		   				<input type="text" class="error" name="sci_desc_z" style="width: 25%;text-align: center;" disabled>';
                        html += '		   			</td>';
                        html += '		   			<td><input type="text" class="error" name="sci_number" disabled></td>';
                        html += '		   			<td><input type="text" class="error" name="sci_unitPrice" disabled></td>';
                        html += '		   			<td><input type="text" class="error" name="sci_penalty" disabled></td>';
                        html += '		   			<td><input type="text" class="error" name="sci_totalCosts" disabled></td>';
                        html += '		   		</tr>';
                        html += '		   		<tr class="consume content-table-item" data-type="消费" data-name="气">';
                        html += '		   			<td class="title">气/m³</td>';
                        html += '		   			<td><input type="text" name="sci_card" style="text-align: center;" disabled></td>';
                        html += '		   			<td colspan="2" class="consume-list">';
                        html += '		   				<span style="display: inline-block;width: 23%;">起数</span>';
                        html += '		   				<input type="text" class="error" name="sci_desc_q" style="width: 25%;text-align: center;" disabled>';
                        html += '		   				<span style="display: inline-block;width: 23%;border-left: 1px solid #ddd;">止数</span>';
                        html += '		   				<input type="text" class="error" name="sci_desc_z" style="width: 25%;text-align: center;" disabled>';
                        html += '		   			</td>';
                        html += '		   			<td><input type="text" class="error" name="sci_number" disabled></td>';
                        html += '		   			<td><input type="text" class="error" name="sci_unitPrice" disabled></td>';
                        html += '		   			<td><input type="text" class="error" name="sci_penalty" disabled></td>';
                        html += '		   			<td><input type="text" class="error" name="sci_totalCosts"  disabled></td>';
                        html += '		   		</tr>';
                        html += '		   		<tr class="consume content-table-item" data-type="消费" data-name="垃圾处理">';
                        html += '		   			<td class="title">垃圾处理/月</td>';
                        html += '		   			<td colspan="3"><input type="text" name="sci_desc" disabled></td>';
                        html += '		   			<td><input type="text" class="error" name="sci_number" disabled></td>';
                        html += '		   			<td><input type="text" class="error" name="sci_unitPrice" disabled></td>';
                        html += '		   			<td><input type="text" class="error" name="sci_penalty" disabled></td>';
                        html += '		   			<td><input type="text" class="error" name="sci_totalCosts"  disabled></td>';
                        html += '		   		</tr>';
                        html += '		   		<tr class="consume content-table-item" data-type="消费" data-name="物管费">';
                        html += '		   			<td class="title">物管费/月</td>';
                        html += '		   			<td colspan="3"><input type="text" name="sci_desc" disabled></td>';
                        html += '		   			<td><input type="text" class="error" name="sci_number" disabled></td>';
                        html += '		   			<td><input type="text" class="error" name="sci_unitPrice" disabled></td>';
                        html += '		   			<td><input type="text" class="error" name="sci_penalty" disabled></td>';
                        html += '		   			<td><input type="text" class="error" name="sci_totalCosts"  disabled></td>';
                        html += '		   		</tr>';
                        html += '		   		<tr class="consume content-table-item" data-type="消费" data-name="有线电视">';
                        html += '		   			<td class="title">有线电视/月</td>';
                        html += '		   			<td colspan="3"><input type="text" name="sci_desc" disabled></td>';
                        html += '		   			<td><input type="text" class="error" name="sci_number" disabled></td>';
                        html += '		   			<td><input type="text" class="error" name="sci_unitPrice" disabled></td>';
                        html += '		   			<td><input type="text" class="error" name="sci_penalty" disabled></td>';
                        html += '		   			<td><input type="text" class="error" name="sci_totalCosts"  disabled></td>';
                        html += '		   		</tr>';
                        html += '		   		<tr class="consume content-table-item" data-type="消费" data-name="宽带">';
                        html += '		   			<td class="title">宽带/月</td>';
                        html += '		   			<td colspan="3"><input type="text" name="sci_desc" disabled></td>';
                        html += '		   			<td><input type="text" class="error" name="sci_number" disabled></td>';
                        html += '		   			<td><input type="text" class="error" name="sci_unitPrice" disabled></td>';
                        html += '		   			<td><input type="text" class="error" name="sci_penalty" disabled></td>';
                        html += '		   			<td><input type="text" class="error" name="sci_totalCosts" disabled></td>';
                        html += '		   		</tr>';
                        html += '		   		<tr class="consume content-table-item" data-type="消费" data-name="租金">';
                        html += '		   			<td class="title">租金/天</td>';
                        html += '		   			<td colspan="3"><input type="text" name="sci_desc" disabled></td>';
                        html += '		   			<td><input type="text" class="error" name="sci_number" disabled></td>';
                        html += '		   			<td><input type="text" class="error" name="sci_unitPrice" disabled></td>';
                        html += '		   			<td><input type="text" class="error" name="sci_penalty" disabled></td>';
                        html += '		   			<td><input type="text" class="error" name="sci_totalCosts" disabled></td>';
                        html += '		   		</tr>';
                        html += '		   		<tr class="consume content-table-item" data-type="消费" data-name="其他">';
                        html += '		   			<td class="title">其他</td>';
                        html += '		   			<td colspan="3"><input type="text" name="sci_desc" disabled></td>';
                        html += '		   			<td><input type="text" class="error" name="sci_number" disabled></td>';
                        html += '		   			<td><input type="text" class="error" name="sci_unitPrice" disabled></td>';
                        html += '		   			<td><input type="text" class="error" name="sci_penalty" disabled></td>';
                        html += '		   			<td><input type="text" class="error" name="sci_totalCosts" disabled></td>';
                        html += '		   		</tr>';
                        html += '		   		<tr class="consume content-table-item" data-type="消费">';
                        html += '		   			<td class="title" colspan="7" style="text-align: right;">合计</td>';
                        html += '		   			<td><input type="text" class="error" name="total-cost" id="statement_costs" disabled></td>';
                        html += '		   		</tr>';
                        html += '		   		';
                        // ====物品结算============================================================================
                        html += '		   		<tr>';
                        html += '		   			<td class="content-table-title" colspan="8">物品结算（管家填写）</td>';
                        html += '		   		</tr>';
                        html += '		   		<tr class="content-table-head" style="background: #f5f8fa;">';
                        html += '		   			<td class="title">物品结算</td>';
                        html += '		   			<td class="title" colspan="3">清单</td>';
                        html += '		   			<td class="title" colspan="3">消费说明</td>';
                        html += '		   			<td class="title">小计</td>';
                        html += '		   		</tr>';
                        html += '		   		<tr class="goods content-table-item" data-name="维修">';
                        html += '		   			<td class="title">维修</td>';
                        html += '		   			<td colspan="3" class="goods-list">';
                        html += '		   				<div class="cost-add-box" style="text-align: left;display:none"></div>';
                        html += '		   			</td>';
                        html += '		   			<td colspan="3"><input type="text" class="error" name="sdi_remark" disabled ></td>';
                        html += '		   			<td><input type="text" class="error" name="sci_totalCosts" disabled></td>';
                        html += '		   		</tr>';
                        html += '		   		<tr class="goods content-table-item" data-name="赔偿">';
                        html += '		   			<td class="title">赔偿</td>';
                        html += '		   			<td colspan="3" class="goods-list">';
                        html += '		   				<div class="cost-add-box" style="text-align: left;display:none"></div>';
                        html += '		   			</td>';
                        html += '		   			<td colspan="3"><input type="text" class="error" name="sdi_remark" disabled></td>';
                        html += '		   			<td><input type="text" class="error" name="sci_totalCosts" disabled></td>';
                        html += '		   		</tr>';
                        html += '		   		<tr class="goods content-table-item" data-name="保洁">';
                        html += '		   			<td class="title">保洁</td>';
                        html += '		   			<td colspan="3" class="goods-list">';
                        html += '		   				<div class="cost-add-box" style="text-align: left;display:none"></div>';
                        html += '		   			</td>';
                        html += '		   			<td colspan="3"><input type="text" class="error" name="sdi_remark" disabled></td>';
                        html += '		   			<td><input type="text" class="error" name="sci_totalCosts" disabled></td>';
                        html += '		   		</tr>';
                        html += '		   		<tr class="goods content-table-item" data-name="其他">';
                        html += '		   			<td class="title">其他</td>';
                        html += '		   			<td colspan="3" class="goods-list">';
                        html += '		   				<div class="cost-add-box" style="text-align: left;display:none"></div>';
                        html += '		   			</td>';
                        html += '		   			<td colspan="3"><input type="text" class="error" name="sdi_remark" disabled></td>';
                        html += '		   			<td><input type="text" class="error" name="sci_totalCosts" disabled></td>';
                        html += '		   		</tr>';
                        html += '		   		<tr class="goods">';
                        html += '		   			<td class="title" colspan="7" style="text-align: right;">合计</td>';
                        html += '		   			<td><input type="text" class="error" name="total-cost" id="statement_goods" disabled></td>';
                        html += '		   		</tr>';
                        html += '		   		';
                        if (opts.data.mode == "out") {
                            // ====违约金结算============================================================================
                            html += '		   		<tr>';
                            html += '		   			<td class="content-table-title" colspan="8">违约金结算（财务填写）</td>';
                            html += '		   		</tr>';
                            html += '		   		<tr class="content-table-head" style="background: #f5f8fa;">';
                            html += '		   			<td class="title" colspan="2">违约金类型</td>';
                            html += '		   			<td class="title">月租金</td>';
                            html += '		   			<td class="title">违约金比例</td>';
                            html += '		   			<td class="title" colspan="3">说明</td>';
                            html += '		   			<td class="title">小计</td>';
                            html += '		   		</tr>';
                            if (contract.contractObject_Type == '租赁合同') {
                                html += '		   		<tr class="penalty content-table-item" data-type="违约金" data-name="金融公司">';
                                html += '		   			<td class="title">金融公司</td>';
                                html += '		   			<td><input type="text" class="error" name="rent_type" style="text-align: center;" disabled></td>';
                                html += '		   			<td><input type="text" class="error" name="sci_unitPrice" disabled></td>';
                                html += '		   			<td><input type="text" class="error" name="sci_number" style="width: 88%;text-align: center;" disabled><label class="error" style="display: inline-block;width: 12%;">%</label></td>';
                                html += '		   			<td colspan="3"><input type="text" class="error" name="sci_desc" disabled></td>';
                                html += '		   			<td><input type="text" class="error" name="sci_totalCosts" disabled></td>';
                                html += '		   		</tr>';
                                html += '		   		<tr class="penalty content-table-item" data-type="违约金" data-name="滞纳金">';
                                html += '		   			<td class="title" colspan="2">滞纳金</td>';
                                html += '		   			<td><input type="text" class="error" name="sci_unitPrice" disabled></td>';
                                html += '		   			<td><input type="text" class="error" name="sci_number" style="width: 88%;text-align: center;" disabled><label class="error" style="display: inline-block;width: 12%;">%</label></td>';
                                html += '		   			<td colspan="3"><input type="text" class="error" name="sci_desc" disabled></td>';
                                html += '		   			<td><input type="text" class="error" name="sci_totalCosts"  disabled></td>';
                                html += '		   		</tr>';
                            } else {
                                html += '		   		<tr class="penalty content-table-item" data-type="违约金" data-name="滞纳金">';
                                html += '		   			<td class="title" colspan="2">违约金/滞纳金</td>';
                                html += '		   			<td><input type="text" class="error" name="sci_unitPrice" disabled></td>';
                                html += '		   			<td><input type="text" class="error minusNumber" name="sci_number" style="text-align: center;" disabled></td>';
                                html += '		   			<td colspan="3"><input type="text" class="error" name="sci_desc" disabled></td>';
                                html += '		   			<td><input type="text" class="error" name="sci_totalCosts"  disabled></td>';
                                html += '		   		</tr>';
                            }
                            html += '		   		<tr class="penalty" data-type="违约金">';
                            html += '		   			<td class="title" colspan="7" style="text-align: right;">合计</td>';
                            html += '		   			<td><input type="text" class="error" name="total-cost" id="statement_penalty" disabled></td>';
                            html += '		   		</tr>';
                        }
                        html += '		   </table>';
                        html += '		</div>';
                        html += '		<div class="content-item-more" style="display:none"></div>';
                        html += '	</div>';
                        html += '	<div class="content-item">';
                        html += '		<table class="content-table">';
                        html += '				<tr data-type="结余">';
                        html += '					<td class="content-table-title" colspan="8" style="border-top: none;">费用结余（财务填写）</td>';
                        html += '				</tr>';
                        html += '				<tr data-type="结余" class="content-table-head" style="background: #f5f8fa;">';
                        html += '					<td class="title" style="width:136px">费用名称</td>';
                        html += '					<td class="title" colspan="5">说明</td>';
                        html += '					<td class="title" style="width:136px">公司应收</td>';
                        html += '					<td class="title" style="width:136px">公司应付</td>';
                        html += '				</tr>';
                        html += '				<tr data-type="结余" data-name="1" class="balance content-table-item">';
                        html += '					<td class="title" style="width: 240px;">消费结算费用</td>';
                        html += '					<td colspan="5"><input type="text" class="error" name="csb_desc" maxlength="120" disabled></td>';
                        html += '					<td style="width:136px"><input type="text" class="error" name="csb_credit" id="statement_costs_credit"  disabled></td>';
                        html += '					<td style="width:136px"><input type="text" class="error" name="csb_debit" id="statement_costs_debit" disabled></td>';
                        html += '				</tr>';
                        html += '				<tr class="balance content-table-item" data-type="结余" data-name="2">';
                        html += '					<td class="title" style="width: 240px;">物品结算费用</td>';
                        html += '					<td colspan="5"><input type="text" class="error" name="csb_desc" maxlength="120" disabled></td>';
                        html += '					<td style="width:136px"><input type="text" class="error" name="csb_credit" id="statement_goods_credit"  disabled></td>';
                        html += '					<td style="width:136px"><input type="text" class="error" name="csb_debit" id="statement_goods_debit" disabled></td>';
                        html += '				</tr>';
                        if (opts.data.mode == "out") {
                            html += '				<tr class="balance content-table-item" data-type="结余" data-name="3">';
                            html += '					<td class="title" style="width: 240px;">代理结算费用</td>';
                            html += '					<td colspan="5"><input type="text" class="error" name="csb_desc" maxlength="120" disabled></td>';
                            html += '					<td style="width:136px"><input type="text" class="error minusNumber" name="csb_credit" id="statement_agent_credit"  disabled></td>';
                            html += '					<td style="width:136px"><input type="text" class="error minusNumber" name="csb_debit" id="statement_agent_debit" disabled></td>';
                            html += '				</tr>';
                            html += '				<tr class="balance content-table-item" data-type="结余" data-name="4">';
                            html += '					<td class="title" style="width: 240px;">违约金结算费用</td>';
                            html += '					<td colspan="5"><input type="text" class="error" name="csb_desc" maxlength="120" disabled></td>';
                            html += '					<td style="width:136px"><input type="text" class="error minusNumber" name="csb_credit" id="statement_penalty_credit"  disabled></td>';
                            html += '					<td style="width:136px"><input type="text" class="error minusNumber" name="csb_debit" id="statement_penalty_debit" disabled></td>';
                            html += '				</tr>';
                        }
                        html += '				<tr class="balance content-table-item" data-type="结余" data-name="5">';
                        html += '					<td class="title" style="width: 240px;">其他结算费用</td>';
                        html += '					<td colspan="5"><input type="text" class="error" name="csb_desc" maxlength="120" disabled></td>';
                        html += '					<td style="width:136px"><input type="text" class="error" name="csb_credit" id="statement_other_credit"  disabled></td>';
                        html += '					<td style="width:136px"><input type="text" class="error" name="csb_debit" id="statement_other_debit" disabled></td>';
                        html += '				</tr>';
                        if (opts.data.mode == "out") {
                            html += '				<tr class="balance content-table-item" data-type="结余" data-name="6">';
                            html += '					<td class="title" style="width: 240px;">维修服务费</td>';
                            html += '					<td colspan="5"><input type="text" class="error" name="csb_desc" maxlength="120" disabled></td>';
                            html += '					<td style="width:136px"><input type="text" class="error" name="csb_credit" id="statement_rent_credit"  disabled></td>';
                            html += '					<td style="width:136px"><input type="text" class="error" name="csb_debit" id="statement_rent_debit" disabled></td>';
                            html += '				</tr>';
                            html += '				<tr class="balance content-table-item" data-type="结余" data-name="7">';
                            html += '					<td class="title" style="width: 240px;">押金</td>';
                            html += '					<td colspan="5"><input type="text" class="error" name="csb_desc" maxlength="120" disabled></td>';
                            html += '					<td style="width:136px"><input type="text" class="error" name="csb_credit" id="statement_deposit_credit"  disabled></td>';
                            html += '					<td style="width:136px"><input type="text" class="error" name="csb_debit" id="statement_deposit_debit" disabled></td>';
                            html += '				</tr>';
                        }
                        html += '				<tr class="content-table-head" data-type="结余">';
                        html += '					<td class="title" style="width: 240px;">应付结余（公司应付-公司应收）';
                        html += '						<input type="hidden" name="total-cost" id="statement_balance" placeholder="结余" disabled>';
                        html += '					</td>';
                        html += '					<td colspan="7" style="text-align: right; padding: 0 12px;" id="statement_balance_box"></td>';
                        html += '				</tr>';
                        html += '				<tr class="content-table-head">';
                        html += '					<td class="title" style="width: 240px;">结算备注</td>';
                        html += '					<td colspan="7" id="remarks-box"><textarea class="next" id="statement_remarks" disabled></textarea></td>';
                        html += '				</tr>';
                        html += '			</tbody>';
                        html += '			<tfoot>';
                        html += '				<tr>';
                        html += '					<td colspan="8" class="title" style="text-align:left">';
                        html += '						<div style="display: table;width: 100%;text-align: center;">';
                        html += '							<div style="display: table-cell">';
                        html += '								<span style="color: #000;margin-right: 6px;">经办人（签字）</span>';
                        html += '								<span class="next" style="color: #000;" id="statement_balancer"></span>';
                        html += '							</div>';
                        html += '							<div style="display: table-cell">';
                        html += '								<span style="color: #000;margin-right: 6px;">客户（签字）</span>';
                        html += '								<span class="next" style="color: #000;" id="cco_applicant"></span>';
                        html += '							</div>';
                        html += '							<div style="display: table-cell">';
                        html += '								<span style="color: #000;margin-right: 6px;">销售主管（签字）</span>';
                        html += '								<span class="next" style="color: #000;" id="em_director"></span>';
                        html += '							</div>';
                        html += '							<div style="display: table-cell">';
                        html += '								<span style="color: #000;margin-right: 6px;">财务复核（签字）</span>';
                        html += '								<span class="next" style="color: #000;" id="em_reviewer"></span>';
                        html += '							</div>';
                        html += '						</div>';
                        html += '					</td>';
                        html += '				</tr>';
                        html += '			</tfoot>';
                        html += '		</table>';
                        html += '	</div>';
                        html += '</div>';
                    }

                    $(self).html(html);

                    // --START--------------------------

                    // 设置参数数据
                    $("#edit-customer-bank").data({
                        "customer": customer,
                        "statementOrder": statementOrder
                    });

                    // 地址、图片
                    $(".house_address").html(contract.house_address + '<div id="handover-image" class="icon-picture" style="display:none;margin-left: 4px;" onclick="displayImage(this)" title="结算照片"></div>');
                    // 客户
                    //					if (!isEmpty(statementOrder) && statementOrder.statement_type == 1) {
                    //						$("input[name=cco_applicant]").val(cancelContract.cco_applicantName + (contract.contractObject_Type == "托管合同" ? "（业主）" : "（租客）"));
                    //						$("#cco_applicant").text(cancelContract.cco_applicantName);
                    //					} else {
                    $("input[name=cco_applicant]").val(contract.cc_name + (contract.contractObject_Type == "托管合同" ? "（业主）" : "（租客）"));
                    $("#cco_applicant").text(contract.cc_name);
                    //					}
                    // 合同日期
                    $("input[name=contract_date]").val(contract.contractBody_StartTOEnd);
                    // 月租金
                    $("input[name=contract_rent]").val(contract.contractObject_RentFreeMode === 1 ? contract.contractBody_Rent / 12 : contract.contractBody_Rent);
                    // 租金/天
                    $("[data-type=消费][data-name=租金]").find("input[name=sci_unitPrice]").val(returnFloat(contract.contractBody_Rent / 30));
                    // 押金
                    $("[name=contractBody_Pay]").val(contract.contractBody_Pay);
                    // 合约备注
                    if (!isEmpty(cancelContract)) {
                        $("#cco_applicationContent").text(returnValue(cancelContract.cco_applicationContent));
                    }
                    // 初始化交接单
                    if (!isEmpty(statementOrder)) {
                        // 图片
                        if (!isEmpty(statementOrder.statement_path)) {
                            $("#handover-image").attr("data-img", statementOrder.statement_path).show();
                        }

                        // 结算日期
                        $(".calCostDate").text(returnNullReplace(returnDate(statementOrder.statement_balanceTime), "--"));

                        // 交/接房日期
                        $("input[name=cco_realDate]").val(returnDate(statementOrder.statement_handoverDate));

                        // 银行卡
                        if (isEmpty(statementOrder.statement_bankType) && isEmpty(statementOrder.statement_bankCard)) {
                            $("input[name=customer_bank]").val("--");
                        } else {
                            $("input[name=customer_bank]").val(returnValue(statementOrder.statement_bankPerson) + returnValue(isEmpty(statementOrder.statement_bankCard) ? '' : ' - ' + returnValue(statementOrder.statement_bankCard)) + " - " + returnValue(statementOrder.statement_bankType)).attr({
                                "data-name": returnValue(statementOrder.statement_bankPerson),
                                "data-type": returnValue(statementOrder.statement_bankType),
                                "data-number": returnValue(statementOrder.statement_bankCard)
                            });
                        }
                        // 备注
                        $("#statement_remarks").val(returnValue(statementOrder.statement_remarks));
                    } else {
                        if (!_mode_boo) {
                            // 结算日期
                            $(".calCostDate").text("无结算数据").removeClass("next").addClass("error");
                        }
                    }

                    // 初始化能源卡
                    if (!isEmpty(energyCardList)) {
                        $.each(energyCardList, function (index, data) {
                            var _box = $("[data-type=消费][data-name=" + data.hpec_type + "]");
                            _box.find("input[name=sci_card]").val(returnValue(data.hpec_newNumber));
                        });
                    }
                    // 【消费结算】
                    if (!isEmpty(result.data.statementCostItems)) {
                        $.each(result.data.statementCostItems, function (index, data) {
                            var _box;
                            switch (data.sci_type) {
                                case '代理费':
                                    // 【代理费结算】
                                    _box = $("[data-type=" + data.sci_type + "]");

                                    _box.find(".cco_applicationType").text(data.sci_itemName == "退租" ? "强退" : data.sci_itemName);
                                    _box.find("input[name=sci_unitPrice]").val(data.sci_unitPrice);
                                    _box.find("input[name=sci_number]").val(data.sci_number);
                                    _box.find("input[name=sci_desc]").val(data.sci_desc);
                                    _box.find("input[name=sci_totalCosts]").val(returnFloat(data.sci_totalCosts));
                                    break;
                                case '消费':
                                    // 【消费结算】
                                    _box = $('[data-type=' + data.sci_type + '][data-name=' + data.sci_itemName + ']');

                                    var _desc = returnValue(data.sci_desc);
                                    if (_desc.indexOf("#") > -1) {
                                        _box.find("input[name=sci_desc_q]").val(_desc.split("#")[0]);
                                        _box.find("input[name=sci_desc_z]").val(_desc.split("#")[1]);
                                    } else {
                                        _box.find("input[name=sci_desc]").val(_desc);
                                    }
                                    _box.find("input[name=sci_number]").val(returnFloat(data.sci_number));
                                    _box.find("input[name=sci_unitPrice]").val(returnFloat(data.sci_unitPrice));
                                    _box.find("input[name=sci_penalty]").val(returnFloat(data.sci_penalty));
                                    _box.find("input[name=sci_totalCosts]").val(returnFloat(data.sci_totalCosts));
                                    break;
                                case '违约金':
                                    // 【违约金结算】
                                    _box = $("[data-type=" + data.sci_type + "][data-name=" + data.sci_itemName + "]");

                                    _box.find("input[name=sci_unitPrice]").val(returnFloat(data.sci_unitPrice));
                                    _box.find("input[name=sci_number]").val(returnFloat(data.sci_number));
                                    _box.find("input[name=sci_desc]").val(returnValue(data.sci_desc));
                                    _box.find("input[name=sci_totalCosts]").val(returnFloat(data.sci_totalCosts));
                                    break;
                            }

                            var _box_total_cost = $('tr[data-type=' + data.sci_type + ']').find("input[name=total-cost]");
                            _box_total_cost.val(returnFloat(_box_total_cost.val()) + returnFloat(data.sci_totalCosts));
                        });
                    }

                    // 【物品结算】
                    if (!isEmpty(result.data.statementDamageItems)) {
                        $.each(result.data.statementDamageItems, function (index, data) {
                            var _box = $(".goods[data-name=" + data.sdi_type + "]");
                            var lists = isEmpty(data.sdi_list) ? "" : data.sdi_list.split(";");
                            if (!isEmpty(lists)) {
                                $.each(lists, function (index, data) {
                                    var subs = data.split("#");
                                    if (!isEmpty(subs)) {
                                        var html = '';
                                        html += '<div class="cost-add-list" style="text-align: left;">';
                                        html += '	<div class="cost-add-list-content">';
                                        html += '		<span><label>名称</label><input type="text" class="error" name="add-list-name" value="' + returnValue(subs[0]) + '" placeholder="名称" disabled></span>';
                                        html += '		<span><label>费用</label><input type="text" class="error" name="add-list-cost" value="' + returnFloat(subs[1]) + '" maxlength="11" placeholder="费用" disabled></span>';
                                        html += '	</div>';
                                        html += '</div>';
                                        _box.find(".cost-add-box").before(html);
                                    }
                                });
                            }
                            _box.find("input[name=sdi_remark]").val(returnValue(data.sdi_desc));
                            _box.find("input[name=sci_totalCosts]").val(returnFloat(data.sdi_cost));

                            var _box_total_cost = $(".goods").find("input[name=total-cost]");
                            _box_total_cost.val(returnFloat(_box_total_cost.val()) + returnFloat(data.sdi_cost));
                        });
                    }

                    // 类型
                    $("[name=rent_type]").val(returnValue(contract.contractBody_PayStyle) + returnValue(isEmpty(contract.contractBody_PayType) ? "" : " : " + contract.contractBody_PayType));

                    // 【费用结余】
                    if (!isEmpty(result.data.statementBalances)) {
                        var _total_money = 0;
                        $.each(result.data.statementBalances, function (index, data) {
                            var _box = $("[data-type=结余][data-name=" + data.csb_type + "]");
                            _box.find("input[name=csb_desc]").val(returnValue(data.csb_desc));
                            _box.find("input[name=csb_credit]").val(returnFloat(data.csb_credit));
                            _box.find("input[name=csb_debit]").val(returnFloat(data.csb_debit));
                            _total_money += returnFloat(returnFloat(data.csb_debit) - returnFloat(data.csb_credit));
                        });
                        if (!isEmpty(statementOrder) && statementOrder.statement_balance == 0) {
                            statementOrder.statement_balance = returnFloat(_total_money);
                        }
                    }

                    if (!isEmpty(statementOrder)) {
                        // 结算人
                        $("#statement_balancer").text(statementOrder.statement_balancer);

                        // 结余费用
                        var _total = returnFloat(statementOrder.statement_balance);
                        var html = "";
                        if (contract.contractObject_Type == "托管合同") {
                            html += '<label class="money-hint">公司' + (_total >= 0 ? '应付业主' : '应收业主') + Math.abs(returnFloat(_total)) + '元</label>';
                        }
                        if (contract.contractObject_Type == "租赁合同") {
                            html += '<label class="money-hint">公司' + (_total >= 0 ? '应付租客' : '应收租客') + Math.abs(returnFloat(_total)) + '元</label>';
                        }
                        html += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;大写：<label class=\'' + ((_total < 0) ? "error" : "") + '\' style="font-weight: bold;">' + returnToUpperMoney(_total) + '</label>';
                        html += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;小写：<label class=\'' + ((_total < 0) ? "error" : "") + '\' style="font-weight: bold;">' + _total + '</label>';
                        $("#statement_balance_box").html(html);
                        $("#statement_balance").val(_total);
                    }

                    // 【复核模式】
                    if (opts.mode == "review") {

                        // 违约金结算（财务填写）
                        var _wyj_box = $("[data-type=违约金][data-name=金融公司]");
                        var _zlj_box = $("[data-type=违约金][data-name=滞纳金]");
                        if (contract.contractObject_Type == "托管合同") {
                            _wyj_box.find("[name=sci_number]").removeAttr("disabled").attr("placeholder", "违约金/滞纳金").css({
                                background: "#fff6f5"
                            });
                            _wyj_box.find("[name=sci_desc]").removeAttr("disabled").attr("placeholder", "说明").css({
                                background: "#fff6f5"
                            });
                            _wyj_box.find("[name=sci_number]").on("input propertychange", function () {
                                _wyj_box.find("[name=sci_totalCosts]").val(returnFloat($(this).val()));
                                calTotalCost("违约金", opts.data.mode, contract.contractObject_Type);
                            });

                            _zlj_box.find("[name=sci_number]").removeAttr("disabled").attr("placeholder", "违约金/滞纳金").css({
                                background: "#fff6f5"
                            });
                            _zlj_box.find("[name=sci_desc]").removeAttr("disabled").attr("placeholder", "说明").css({
                                background: "#fff6f5"
                            });
                            _zlj_box.find("[name=sci_number]").on("input propertychange", function () {
                                _zlj_box.find("[name=sci_totalCosts]").val(returnFloat($(this).val()));
                                calTotalCost("违约金", opts.data.mode, contract.contractObject_Type);
                            });
                        }
                        if (contract.contractObject_Type == "租赁合同") {
                            _wyj_box.find("[name=sci_number]").removeAttr("disabled").attr({
                                "placeholder": "违约金/滞纳金",
                                "maxlength": "3"
                            }).css({
                                background: "#fff6f5"
                            });
                            _wyj_box.find("[name=sci_desc]").removeAttr("disabled").attr("placeholder", "说明").css({
                                background: "#fff6f5"
                            });

                            _wyj_box.find("[name=sci_number]").on("input propertychange", function () {
                                var _sci_unitPrice = returnFloat(_wyj_box.find("[name=sci_unitPrice]").val());
                                _wyj_box.find("[name=sci_totalCosts]").val(_sci_unitPrice * (returnFloat($(this).val()) / 100));
                                calTotalCost("违约金", opts.data.mode, contract.contractObject_Type);
                            });

                            _zlj_box.find("[name=sci_number]").removeAttr("disabled").attr({
                                "placeholder": "违约金/滞纳金",
                                "maxlength": "3"
                            }).css({
                                background: "#fff6f5"
                            });

                            _zlj_box.find("[name=sci_desc]").removeAttr("disabled").attr("placeholder", "说明").css({
                                background: "#fff6f5"
                            });
                            _zlj_box.find("[name=sci_number]").on("input propertychange", function () {
                                var _sci_unitPrice = returnFloat(_wyj_box.find("[name=sci_unitPrice]").val());
                                _zlj_box.find("[name=sci_totalCosts]").val(_sci_unitPrice * (returnFloat($(this).val()) / 100));
                                calTotalCost("违约金", opts.data.mode, contract.contractObject_Type);
                            });
                        }

                        // 备注
                        $("#statement_remarks").removeAttr("disabled").attr("placeholder", "备注").css({
                            background: "#fff6f5"
                        });

                        // 费用结余（财务填写）
                        var _js_box = $("[data-type=结余][data-name='5']");
                        _js_box.find("[name=csb_desc]").removeAttr("disabled").attr("placeholder", "说明").css({
                            background: "#fff6f5"
                        });
                        _js_box.find("[name=csb_credit]").removeAttr("disabled").attr("placeholder", "公司应收").css({
                            background: "#fff6f5"
                        });
                        _js_box.find("[name=csb_debit]").removeAttr("disabled").attr("placeholder", "公司应付").css({
                            background: "#fff6f5"
                        });
                        var _js_box2 = $("[data-type=结余][data-name='6']");
                        _js_box2.find("[name=csb_desc]").removeAttr("disabled").attr("placeholder", "说明").css({
                            background: "#fff6f5"
                        });
                        _js_box2.find("[name=csb_credit]").removeAttr("disabled").attr("placeholder", "公司应收").css({
                            background: "#fff6f5"
                        });

                        _js_box.find("[name=csb_credit],[name=csb_debit]").on("input propertychange", function () {
                            calBalanceCost(opts.data.mode, contract.contractObject_Type);
                        });
                        _js_box2.find("[name=csb_credit],[name=csb_debit]").on("input propertychange", function () {
                            calBalanceCost(opts.data.mode, contract.contractObject_Type);
                        });
                    }

                    // 销售主管
                    $("#em_director").text(contract.ucc_corporation);

                    // 复核人员
                    $("#em_reviewer").text(contract.em_reviewer);

                    // --END--------------------------

                    // 添加事件
                    self.addEvent();
                    // 返回结果
                    opts.result(_data);
                });
            };

            /** 事件绑定*/
            this.addEvent = function () {

                // 点击事件
                $(".content-item-more").click(function () {
                    var _parent = $(this).parent();
                    var _table = $(this).siblings(".content-item-table");
                    ;
                    var default_title = '<i class="icon-double-angle-right"></i><label style="margin: 0 8px;">查看详情</label><i class="icon-double-angle-left"></i>';
                    var head_title = '<i class="icon-double-angle-down"></i><label style="margin: 0 8px;">隐藏详情</label><i class="icon-double-angle-down"></i>';
                    var foot_title = '<i class="icon-double-angle-up"></i><label style="margin: 0 8px;">隐藏详情</label><i class="icon-double-angle-up"></i>';

                    if (_table.is(":hidden")) {
                        _table.slideDown();
                        _parent.find(".content-item-more").show()
                        _parent.find(".content-item-more:eq(0)").html(head_title);
                        _parent.find(".content-item-more:eq(1)").html(foot_title);
                    } else {
                        _table.slideUp();
                        _parent.find(".content-item-more:eq(1)").hide();
                        _parent.find(".content-item-more").html(default_title);
                        $(this).parents(".table-item-content").animate({
                            scrollTop: "0px"
                        }, 600);
                    }
                });

                // 修改银行卡信息
                $("#edit-customer-bank").click(function () {
                    var _this = $(this);
                    $(this).editCustomerModel({
                        data: _this.data("customer"),
                        result: function (_data) {
                            $("[name=customer_bank]").val(returnValue(_data.cbc_name) + " - " + returnValue(_data.cbc_cardNum) + " - " + returnValue(_data.cbc_bankName)).attr({
                                "data-name": returnValue(_data.cbc_name),
                                "data-type": returnValue(_data.cbc_bankName),
                                "data-number": returnValue(_data.cbc_cardNum)
                            });
                            // 提交数据
                            $.ajax({
                                type: "POST",
                                url: '/contractObject/updateContractStatement',
                                data: {
                                    statement_code: _this.data("statementOrder").statement_code,
                                    statement_bankPerson: returnValue(_data.cbc_name),
                                    statement_bankType: returnValue(_data.cbc_bankName),
                                    statement_bankCard: returnValue(_data.cbc_cardNum)
                                },
                                dataType: "json",
                                beforeSend: function () {
                                    $.jBox.tip("数据提交中...");
                                }
                            }).done(function (result) {
                                if (result.code != 200) {
                                    $.jBox.tip(result.msg, "error");
                                    return;
                                }
                                $.jBox.tip("数据提交成功", "success");
                            });
                        }
                    });
                });
            };
            /** 执行*/
            this.init();
        });
    };
})($, document);

/* 插件：选择房源 */
;(function ($, document) {
    $.fn.changeHouse1 = function (options) {
        options = $.extend(true, {}, options);

        var box = $(".change-box");
        if (box.length < 1) {
            var html =
                '<div class="change-box">' +
                '   <div class="change-box-head">' +
                '       <div class="cb-head-title">选择房源</div>' +
                '       <div class="flex-1"></div>' +
                '       <div class="cb-head-search"></div>' +
                '   </div>' +
                '   <div class="change-box-main">' +
                '       <div class="change-box-main-side">' +
                '           <div class="cbm-side-item">1</div>' +
                '           <div class="cbm-side-item">2</div>' +
                '       </div>' +
                '       <div class="change-box-main-content">' +
                '           <div class="cbm-content-title">' +
                '               <div>11</div>' +
                '               <div>21</div>' +
                '           </div>' +
                '           <div class="cbm-content-list">' +
                '               <div>12</div>' +
                '               <div>22</div>' +
                '           </div>' +
                '       </div>' +
                '   </div>' +
                '</div>' +
                '' +
                '';
            box = $(html).appendTo("body");
        }
        return;
        return this.each(function () {
            var _this = $(this);
            var _obj = this;

            var defaults = {
                placeholder: "",
                result: function (obj) {
                }
            };
            var opts = $.extend(defaults, options);

            this.init = function () {
                this.createHTML();
            };

            /* 生成html*/
            this.createHTML = function () {
                var top = _this.position().top;
                var left = _this.position().left;
                var width = _this.outerWidth();
                var height = _this.outerHeight();

                var html = "";
                html += '<div id="search-box">';
                html += '  <div class="search-head">';
                html += '		<i class="fa-search"></i>';
                html += '		<input type="text" id="search-text" placeholder="' + opts.placeholder + '">';
                html += '  </div>';
                html += '  <div class="search-list">';
                html += '  	<table>';
                html += '        <thead>';
                html += '            <tr class="search-item">';
                html += '                <th style="width: 42px;">#</th>';
                html += '                <th>物业名称</th>';
                html += '            </tr>';
                html += '        </thead>';
                html += '        <tbody id="search-listBox"></tbody>';
                html += '		</table>';
                html += '  </div>';
                html += '  <div class="search-foot">';
                html += '		<button class="foot-left fa-angle-left" id="pageUp"></button>';
                html += '		<input type="text" class="foot-left number" id="pageNo" value="1">';
                html += '		<button class="foot-left fa-angle-right" id="pageDown"></button>';
                html += '  	<div class="foot-right">共<span id="totalPage">0</span>页，<span id="totalRecords">0</span>条记录</div>';
                html += '	 </div>';
                html += '</div>';
                $("#search-box").css({
                    top: top + height + 10,
                    left: left
                });
                _this.after(html);
                this.addEvent();
            };
            /* 绑定事件*/
            this.addEvent = function () {
                var _box = $("#search-box");
                var _text = $("#search-text");
                var _list = $(".search-list");
                var eindex = -1;

                // 文本框获取焦点
                _this.on("focus", function () {
                    if (_box.is(":hidden")) {
                        _box.slideDown(100);
                        _text.focus();
                        _obj.queryPropertyInfoList();
                    }
                });
                _this.on("click", function (e) {
                    if (_box.is(":hidden")) {
                        _box.slideDown(100);
                        _text.focus();
                    }
                    e.stopPropagation();
                });
                // 上一页
                $("#pageUp").on("click", function () {
                    var pageNo = returnNumber($("#pageNo").val());
                    if (pageNo <= 1) {
                        return;
                    }
                    var totalPage = returnNumber($("#totalPage").text());
                    if (pageNo > totalPage) {
                        $("#pageNo").val(totalPage);
                    } else {
                        $("#pageNo").val(pageNo - 1);
                    }
                    _obj.queryPropertyInfoList();
                });
                // 下一页
                $("#pageDown").on("click", function () {
                    var pageNo = returnNumber($("#pageNo").val());
                    var totalPage = returnNumber($("#totalPage").text());
                    if (pageNo >= totalPage) {
                        return;
                    }
                    $("#pageNo").val(pageNo + 1);
                    _obj.queryPropertyInfoList();
                });
                // 跳转
                $("#pageNo").on("keyup", function (e) {
                    switch (e.keyCode) {
                        case 13:
                            var pageNo = returnNumber($("#pageNo").val());
                            var totalPage = returnNumber($("#totalPage").text());
                            if (pageNo > totalPage) {
                                $("#pageNo").val(returnNumber($("#totalPage").text()));
                            } else if (pageNo < 1) {
                                $("#pageNo").val(1);
                            } else {
                                $("#pageNo").val(pageNo);
                            }
                            ;
                            _obj.queryPropertyInfoList();
                            break;
                        case 38:
                            $("#pageUp").click();
                            break;
                        case 40:
                            $("#pageDown").click();
                            break;
                    }
                });
                // 文本框绑定事件
                _text.on("input propertychange", function () {
                    $("#pageNo").val(1);
                    _obj.queryPropertyInfoList();
                });

                // 绑定上下按键事件
                _text.on("keyup", function (e) {
                    var _item = $('#search-listBox .search-item');
                    switch (e.keyCode) {
                        case 13:
                            $(".search-item" + eindex).click();
                            eindex = -1;
                            break;
                        case 38:
                            eindex--;
                            if (eindex < 0) {
                                eindex = _item.length - 1;
                            }
                            _item.removeClass("item-hover").eq(eindex).addClass("item-hover");
                            break;
                        case 40:
                            eindex++;
                            if (eindex >= _item.length) {
                                eindex = 0;
                            }
                            _item.removeClass("item-hover").eq(eindex).addClass("item-hover");
                            break;
                    }
                });
                // 绑定点击不隐藏事件
                $("#search-box").on("click", function (e) {
                    e.stopPropagation();
                });
                $(document).on("click", function (e) {
                    $("#search-list,#search-box").slideUp(100);
                });
            };
            this.queryPropertyInfoList = function () {
                $.ajax({
                    type: "POST",
                    url: "/propertyInfo/queryPropertyInfoList",
                    data: {
                        upn_name: $("#search-text").val().trim(),
                        pageNo: returnNumber($("#pageNo").val())
                    },
                    dataType: "json"
                }).done(function (result) {
                    if (result.code == 200) {
                        var _body = $("#search-listBox");
                        if (result.data.list.length <= 0) {
                            _body.html('<tr><td colspan="99" style="text-align: center;height: 60px;">没有数据</td></tr>');
                            $("#totalPage").text(0);
                            $("#totalRecords").text(0);
                            return;
                        }
                        _body.empty();
                        $.each(result.data.list, function (index, data) {
                            // 加载列表数据
                            _body.append('<tr class="search-item search-item' + index + '">' + '<td style="width: 42px;">' + (index + 1) + '</td>' + '<td>' + returnValue(data.upn_name) + '</td>' + '</tr>');

                            // 点击单个列表数据 TODO
                            $(".search-item" + index).on("click", function () {
                                var _data = $(this).data("data");
                                _this.val(_data.upn_name).attr("data-id", _data.propertyInfo_Id).attr("data-uid", _data.upn_id);
                                opts.result(_this);

                                eindex = -1;
                                $("#search-list, #search-box").slideUp(100);
                            }).data("data", data);
                        });
                        $(".search-list").show();
                        $("#totalPage").text(result.data.totalPage);
                        $("#totalRecords").text(result.data.totalRecords);
                    } else {
                        _body.html('<tr><td colspan="99" style="text-align: center;height: 60px;">没有数据</td></tr>');
                        $("#totalPage").text(0);
                        $("#totalRecords").text(0);
                    }
                });
            };
            this.init();
        });
    };
})($, document);

/* 插件-搜索2 */
;(function ($, document) {
    $.fn.AutoSearch = function (options) {
        return this.each(function () {
            var _this = $(this);
            var _obj = this;

            var defaults = {
                placeholder: "",
                result: function (obj) {
                }
            };
            var opts = $.extend(defaults, options);

            this.init = function () {
                this.createHTML();
            };

            /* 生成html*/
            this.createHTML = function () {
                var top = _this.position().top;
                var left = _this.position().left;
                var width = _this.outerWidth();
                var height = _this.outerHeight();

                var html = "";
                html += '<div id="search-box">';
                html += '  <div class="search-head">';
                html += '		<i class="fa-search"></i>';
                html += '		<input type="text" id="search-text" placeholder="' + opts.placeholder + '">';
                html += '  </div>';
                html += '  <div class="search-list">';
                html += '  	<table>';
                html += '        <thead>';
                html += '            <tr class="search-item">';
                html += '                <th style="width: 42px;">#</th>';
                html += '                <th>物业名称</th>';
                html += '            </tr>';
                html += '        </thead>';
                html += '        <tbody id="search-listBox"></tbody>';
                html += '		</table>';
                html += '  </div>';
                html += '  <div class="search-foot">';
                html += '		<button class="foot-left fa-angle-left" id="pageUp"></button>';
                html += '		<input type="text" class="foot-left number" id="pageNo" value="1">';
                html += '		<button class="foot-left fa-angle-right" id="pageDown"></button>';
                html += '  	<div class="foot-right">共<span id="totalPage">0</span>页，<span id="totalRecords">0</span>条记录</div>';
                html += '	 </div>';
                html += '</div>';
                $("#search-box").css({
                    top: top + height + 10,
                    left: left
                });
                _this.after(html);
                this.addEvent();
            };
            /* 绑定事件*/
            this.addEvent = function () {
                var _box = $("#search-box");
                var _text = $("#search-text");
                var _list = $(".search-list");
                var eindex = -1;

                // 文本框获取焦点
                _this.on("focus", function () {
                    if (_box.is(":hidden")) {
                        _box.slideDown(100);
                        _text.focus();
                        _obj.queryPropertyInfoList();
                    }
                });
                _this.on("click", function (e) {
                    if (_box.is(":hidden")) {
                        _box.slideDown(100);
                        _text.focus();
                    }
                    e.stopPropagation();
                });
                // 上一页
                $("#pageUp").on("click", function () {
                    var pageNo = returnNumber($("#pageNo").val());
                    if (pageNo <= 1) {
                        return;
                    }
                    var totalPage = returnNumber($("#totalPage").text());
                    if (pageNo > totalPage) {
                        $("#pageNo").val(totalPage);
                    } else {
                        $("#pageNo").val(pageNo - 1);
                    }
                    _obj.queryPropertyInfoList();
                });
                // 下一页
                $("#pageDown").on("click", function () {
                    var pageNo = returnNumber($("#pageNo").val());
                    var totalPage = returnNumber($("#totalPage").text());
                    if (pageNo >= totalPage) {
                        return;
                    }
                    $("#pageNo").val(pageNo + 1);
                    _obj.queryPropertyInfoList();
                });
                // 跳转
                $("#pageNo").on("keyup", function (e) {
                    switch (e.keyCode) {
                        case 13:
                            var pageNo = returnNumber($("#pageNo").val());
                            var totalPage = returnNumber($("#totalPage").text());
                            if (pageNo > totalPage) {
                                $("#pageNo").val(returnNumber($("#totalPage").text()));
                            } else if (pageNo < 1) {
                                $("#pageNo").val(1);
                            } else {
                                $("#pageNo").val(pageNo);
                            }
                            ;
                            _obj.queryPropertyInfoList();
                            break;
                        case 38:
                            $("#pageUp").click();
                            break;
                        case 40:
                            $("#pageDown").click();
                            break;
                    }
                });
                // 文本框绑定事件
                _text.on("input propertychange", function () {
                    $("#pageNo").val(1);
                    _obj.queryPropertyInfoList();
                });

                // 绑定上下按键事件
                _text.on("keyup", function (e) {
                    var _item = $('#search-listBox .search-item');
                    switch (e.keyCode) {
                        case 13:
                            $(".search-item" + eindex).click();
                            eindex = -1;
                            break;
                        case 38:
                            eindex--;
                            if (eindex < 0) {
                                eindex = _item.length - 1;
                            }
                            _item.removeClass("item-hover").eq(eindex).addClass("item-hover");
                            break;
                        case 40:
                            eindex++;
                            if (eindex >= _item.length) {
                                eindex = 0;
                            }
                            _item.removeClass("item-hover").eq(eindex).addClass("item-hover");
                            break;
                    }
                });
                // 绑定点击不隐藏事件
                $("#search-box").on("click", function (e) {
                    e.stopPropagation();
                });
                $(document).on("click", function (e) {
                    $("#search-list,#search-box").slideUp(100);
                });
            };
            this.queryPropertyInfoList = function () {
                $.ajax({
                    type: "POST",
                    url: "/propertyInfo/queryPropertyInfoList",
                    data: {
                        upn_name: $("#search-text").val().trim(),
                        pageNo: returnNumber($("#pageNo").val())
                    },
                    dataType: "json"
                }).done(function (result) {
                    if (result.code == 200) {
                        var _body = $("#search-listBox");
                        if (result.data.list.length <= 0) {
                            _body.html('<tr><td colspan="99" style="text-align: center;height: 60px;">没有数据</td></tr>');
                            $("#totalPage").text(0);
                            $("#totalRecords").text(0);
                            return;
                        }
                        _body.empty();
                        $.each(result.data.list, function (index, data) {
                            // 加载列表数据
                            _body.append('<tr class="search-item search-item' + index + '">' + '<td style="width: 42px;">' + (index + 1) + '</td>' + '<td>' + returnValue(data.upn_name) + '</td>' + '</tr>');

                            // 点击单个列表数据 TODO
                            $(".search-item" + index).on("click", function () {
                                var _data = $(this).data("data");
                                _this.val(_data.upn_name).attr("data-id", _data.propertyInfo_Id).attr("data-uid", _data.upn_id);
                                opts.result(_this);

                                eindex = -1;
                                $("#search-list, #search-box").slideUp(100);
                            }).data("data", data);
                        });
                        $(".search-list").show();
                        $("#totalPage").text(result.data.totalPage);
                        $("#totalRecords").text(result.data.totalRecords);
                    } else {
                        _body.html('<tr><td colspan="99" style="text-align: center;height: 60px;">没有数据</td></tr>');
                        $("#totalPage").text(0);
                        $("#totalRecords").text(0);
                    }
                });
            };
            this.init();
        });
    };
})($, document);

/* 插件-搜索3 */
;(function ($, document) {
    $.fn.AutoAddressSearch = function (options) {
        return this.each(function () {
            var _this = $(this);
            var _obj = this;

            var defaults = {
                placeholder: "",
                result: function (obj) {
                }
            };
            var opts = $.extend(defaults, options);

            this.init = function () {
                this.createHTML();
            };

            /* 生成html*/
            this.createHTML = function () {
                var top = _this.position().top;
                var left = _this.position().left;
                var width = _this.outerWidth();
                var height = _this.outerHeight();

                var html = "";
                html += '<div id="search-box">';
                html += '  <div class="search-head">';
                html += '		<i class="fa-search"></i>';
                html += '		<input type="text" id="search-text1" placeholder="' + opts.placeholder + '">';
                html += '  </div>';
                html += '  <div class="search-list">';
                html += '  	<table>';
                html += '        <thead>';
                html += '            <tr class="search-item">';
                html += '                <th style="width: 42px;">#</th>';
                html += '                <th>小区名称</th>';
                html += '                <th>招租状态</th>';
                html += '            </tr>';
                html += '        </thead>';
                html += '        <tbody id="search-listBox1"></tbody>';
                html += '		</table>';
                html += '  </div>';
                html += '  <div class="search-foot">';
                html += '		<button class="foot-left fa-angle-left" id="pageUp"></button>';
                html += '		<input type="text" class="foot-left number" id="pageNo" value="1">';
                html += '		<button class="foot-left fa-angle-right" id="pageDown"></button>';
                html += '  	<div class="foot-right">共<span id="totalPage1">0</span>页，<span id="totalRecords1">0</span>条记录</div>';
                html += '	 </div>';
                html += '</div>';
                $("#search-box").css({
                    top: top + height + 10,
                    left: left
                });
                _this.after(html);
                this.addEvent();
            };
            /* 绑定事件*/
            this.addEvent = function () {
                var _box = $("#search-box");
                var _text = $("#search-text1");
                var _list = $(".search-list");
                var eindex = -1;

                // 文本框获取焦点
                _this.on("focus", function () {
                    if (_box.is(":hidden")) {
                        _box.slideDown(100);
                        _text.focus();
                        _obj.queryPropertyInfoList();
                    }
                });
                _this.on("click", function (e) {
                    if (_box.is(":hidden")) {
                        _box.slideDown(100);
                        _text.focus();
                    }
                    e.stopPropagation();
                });
                // 上一页
                $("#pageUp").on("click", function () {
                    var pageNo = returnNumber($("#pageNo").val());
                    if (pageNo <= 1) {
                        return;
                    }
                    var totalPage = returnNumber($("#totalPage1").text());
                    if (pageNo > totalPage) {
                        $("#pageNo").val(totalPage);
                    } else {
                        $("#pageNo").val(pageNo - 1);
                    }
                    _obj.queryPropertyInfoList();
                });
                // 下一页
                $("#pageDown").on("click", function () {
                    var pageNo = returnNumber($("#pageNo").val());
                    var totalPage = returnNumber($("#totalPage1").text());
                    if (pageNo >= totalPage) {
                        return;
                    }
                    $("#pageNo").val(pageNo + 1);
                    _obj.queryPropertyInfoList();
                });
                // 跳转
                $("#pageNo").on("keyup", function (e) {
                    switch (e.keyCode) {
                        case 13:
                            var pageNo = returnNumber($("#pageNo").val());
                            var totalPage = returnNumber($("#totalPage1").text());
                            if (pageNo > totalPage) {
                                $("#pageNo").val(returnNumber($("#totalPage1").text()));
                            } else if (pageNo < 1) {
                                $("#pageNo").val(1);
                            } else {
                                $("#pageNo").val(pageNo);
                            }
                            ;
                            _obj.queryPropertyInfoList();
                            break;
                        case 38:
                            $("#pageUp").click();
                            break;
                        case 40:
                            $("#pageDown").click();
                            break;
                    }
                });
                // 文本框绑定事件
                _text.on("input propertychange", function () {
                    $("#pageNo").val(1);
                    //					_obj.queryPropertyInfoList();
                });

                $('#search-box .fa-search').on("click", function () {
                    _obj.queryPropertyInfoList();
                });

                // 绑定上下按键事件
                _text.on("keyup", function (e) {
                    var _item = $('#search-listBox1 .search-item');
                    switch (e.keyCode) {
                        case 13:
                            $(".search-item" + eindex).click();
                            eindex = -1;
                            _obj.queryPropertyInfoList();
                            break;
                        case 38:
                            eindex--;
                            if (eindex < 0) {
                                eindex = _item.length - 1;
                            }
                            _item.removeClass("item-hover").eq(eindex).addClass("item-hover");
                            break;
                        case 40:
                            eindex++;
                            if (eindex >= _item.length) {
                                eindex = 0;
                            }
                            _item.removeClass("item-hover").eq(eindex).addClass("item-hover");
                            break;
                    }
                });
                // 绑定点击不隐藏事件
                $("#search-box").on("click", function (e) {
                    e.stopPropagation();
                });
                $(document).on("click", function (e) {
                    $("#search-list,#search-box").slideUp(100);
                });
            };
            this.queryPropertyInfoList = function () {
                $.ajax({
                    type: "POST",
                    url: "/houseLibrary/queryAllHouseInfoList",
                    data: {
                        hi_address: $("#search-text1").val().trim(),
                        pageNo: returnNumber($("#pageNo").val())
                    },
                    dataType: "json"
                }).done(function (result) {
                    if (result.code == 200) {
                        var _body = $("#search-listBox1");
                        if (result.data.list.length <= 0) {
                            _body.html('<tr><td colspan="99" style="text-align: center;height: 60px;">没有数据</td></tr>');
                            $("#totalPage1").text(0);
                            $("#totalRecords1").text(0);
                            return;
                        }
                        _body.empty();
                        $.each(result.data.list, function (index, data) {
                            // 加载列表数据
                            _body.append('<tr class="search-item search-item' + index + '">' + '<td style="width: 42px;">' + (index + 1) + '</td>' + '<td>' + returnValue(data.house_address) + '</td>' + '<td>' + returnHouseForRentState(data.hi_forRentState).text + '</td>' + '</tr>');

                            // 点击单个列表数据 TODO
                            $(".search-item" + index).on("click", function () {
                                var _data = $(this).data("data");
                                _this.val(_data.house_address).attr("data-hi_code", _data.hi_code).attr("data-hi_price", _data.hi_price);
                                opts.result(_this);

                                eindex = -1;
                                $("#search-list, #search-box").slideUp(100);
                            }).data("data", data);
                        });
                        $(".search-list").show();
                        $("#totalPage1").text(result.data.totalPage);
                        $("#totalRecords1").text(result.data.totalRecords);
                    } else {
                        _body.html('<tr><td colspan="99" style="text-align: center;height: 60px;">没有数据</td></tr>');
                        $("#totalPage1").text(0);
                        $("#totalRecords1").text(0);
                    }
                });
            };
            this.init();
        });
    };
})($, document);

/* 插件：选择房源 */
;(function ($, document) {
    $.fn.changeHouse = function (options) {
        return this.each(function () {
            var _this = $(this);

            options = $.extend(true, {}, {
                mode: "house", // house：房源|customer：客户|employee：房管员
                data: {
                    filter: {
                        open: false,
                        lock: false,
                        selected: ""
                    },
                    search: {
                        open: true,
                        lock: false,
                    },
                    add: {
                        open: false,
                        lock: false,
                    }
                },
                done: function (data) {}
            }, options);

            if (_this.next().attr("id") == "search-box") {
                _this.next().remove();
                return;
            }

            var box = $("#search-box");
            if (box.length > 0) box.remove();

            var params = {
                title: "",
                head: {
                    filter: {
                        property: "",
                        text: "",
                    },
                    search: {
                        property: "",
                        text: "",
                    },
                    add: {
                        property: "",
                        text: "",
                    }
                },
                list: {
                    thead: "",
                }
            };
            switch (options.mode) {
                case "customer":
                    params.title = '选择客户';
                    if (!options.data.filter.open) params.head.filter.property += ' style="display:none"';
                    if (options.data.filter.lock) params.head.filter.property += ' readonly';

                    if (!options.data.search.open) params.head.search.property += ' style="display:none"';
                    if (options.data.search.lock) params.head.search.property += ' readonly';

                    if (!options.data.add.open) params.head.add.property += ' style="display:none"';
                    if (options.data.add.lock) params.head.add.property += ' readonly';

                    params.list.thead =
                        '<th style="width: 42px;">#</th>' +
                        '<th>客户姓名</th>' +
                        '<th>手机号码</th>' +
                        '<th>证件号码</th>' +
                        '';
                    break;
                case "employee":
                    params.title = '选择房管员';
                    if (!options.data.filter.open) params.head.filter.property += ' style="display:none"';
                    if (options.data.filter.lock) params.head.filter.property += ' readonly';

                    if (!options.data.search.open) params.head.search.property += ' style="display:none"';
                    if (options.data.search.lock) params.head.search.property += ' readonly';

                    if (!options.data.add.open) params.head.add.property += ' style="display:none"';
                    if (options.data.add.lock) params.head.add.property += ' readonly';

                    params.list.thead =
                        '<th style="width: 42px;">#</th>' +
                        '<th>管家姓名</th>' +
                        '<th>手机号码</th>' +
                        '<th>所属部门</th>' +
                        '<th>在职状态</th>' +
                        '';
                    break;
                case "house":
                default:
                    params.title = '选择房源';
                    if (!options.data.filter.open) params.head.filter.property += ' style="display:none"';
                    if (options.data.filter.lock) params.head.filter.property += ' disabled';

                    if (!options.data.search.open) params.head.search.property += ' style="display:none"';
                    if (options.data.search.lock) params.head.search.property += ' readonly';

                    if (!options.data.add.open) params.head.add.property += ' style="display:none"';
                    if (options.data.add.lock) params.head.add.property += ' readonly';

                    params.head.filter.text =
                        '<option value="all">全部房源</option>' +
                        '<option value="forrent" ' + (options.data.filter.selected == "forrent" ? "selected" : "") + '>正在招租</option>' +
                        '<option value="pauserent" ' + (options.data.filter.selected == "pauserent" ? "selected" : "") + '>暂停招租</option>' +
                        '<option value="stoprent" ' + (options.data.filter.selected == "stoprent" ? "selected" : "") + '>停止招租</option>' +
                        '';

                    params.list.thead =
                        '<th style="width: 42px;">#</th>' +
                        '<th>小区名称</th>' +
                        '<th style="width:60px;text-align: center;">招租状态</th>' +
                        '';
                    break;
            }
            box = $(
                '<div id="search-box" style="top:' + (_this.position().top + _this.outerHeight() + 10) + 'px;left:' + _this.position().left + 'px;">' +
                '   <div class="search-head">' +
                '       <button class="fa-arrow-left next" name="search-back"></button>' +
                '       <div class="title flex-1">' + params.title + '</div>' +
                '       <select name="search-filter" ' + params.head.filter.property + '>' + params.head.filter.text + '</select>' +
                '       <label class="input-search" ' + params.head.search.property + '>' +
                '           <button class="fa-search ok" name="search-btn"></button>' +
                '           <input name="search-text" placeholder="搜索">' +
                '           <span class="fa-remove error" name="search-remove"></span>' +
                '       </label>' +
                '       <button class="fa-plus ok" name="search-add" ' + params.head.add.property + '></button>' +
                '   </div>' +
                '   <div class="search-list">' +
                '       <table>' +
                '           <thead>' +
                '               <tr class="search-item">' + params.list.thead + '</tr>' +
                '           </thead>' +
                '           <tbody><tr style="background: #fff !important;cursor: default;"><td colspan="3"><div class="loading"></div></td></tr></tbody>' +
                '       </table>' +
                '   </div>' +
                '   <div class="search-foot">' +
                '       <button class="foot-left fa-angle-left" id="pageUp"></button>' +
                '       <input class="foot-left" id="pageNo" value="1" readonly>' +
                '       <button class="foot-left fa-angle-right" id="pageDown"></button>' +
                '   	<div class="foot-right">共<span id="totalPage">0</span>页，<span id="totalRecords">0</span>条记录</div>' +
                '   </div>' +
                '</div>');
            _this.after(box);
            box.show().find("[name=search-text]").focus();

            // 执行方法
            load_event();
            load_data();

            // 加载数据
            function load_data(mode) {
                var page_no = $("#pageNo");
                var total_page = $("#totalPage");
                var total_records = $("#totalRecords");
                var search_text = $("[name=search-text]");
                switch (mode) {
                    case "filter":
                        page_no.val(1);
                        break;
                }

                var data_param = {url: "", data: {},};
                switch (options.mode) {
                    case "customer":
                        params.url = '/contractObject/querySignInfo';
                        params.data = {
                            pageNo: returnNumber(page_no.val()),
                            param: search_text.val().trim()
                        };
                        break;
                    case "employee":
                        params.url = '/contractObject/queryEmpList';
                        params.data = {
                            pageNo: returnNumber(page_no.val()),
                            param: search_text.val().trim()
                        };
                        break;
                    case "house":
                    default:
                        params.url = '/houseLibrary/queryAllHouseInfoList';
                        params.data = {
                            pageNo: returnNumber(page_no.val()),
                            hi_address: search_text.val().trim(),
                            hi_isForRent: options.data.filter.open ? $("[name=search-filter]>option:selected").val() : ""
                        };
                        break;
                }

                $.ajax({
                    type: "POST",
                    url: params.url,
                    data: params.data,
                    dataType: "json"
                }).done(function (result) {
                    var tbody = box.find(".search-list").find("tbody");
                    tbody.empty();
                    if (result.code != 200 || result.data.list.length <= 0) {
                        tbody.html('<tr style="background: #fff !important;cursor: default;"><td colspan="3" class="error">没有数据</td></tr>');
                        total_page.text(0);
                        total_records.text(0);
                        return;
                    }

                    // 加载列表数据
                    $.each(result.data.list, function (index, data) {
                        var html = '';
                        switch (options.mode) {
                            case "customer":
                                html =
                                    '<tr class="search-item">' +
                                    '   <td style="width: 42px;">' + (index + 1) + '</td>' +
                                    '   <td>' + returnValue(data.cc_name) + '</td>' +
                                    '   <td>' + returnValue(data.ccp_phone) + '</td>' +
                                    '   <td>' + returnValue(data.cc_cardNum) + '</td>' +
                                    '</tr>';
                                break;
                            case "employee":
                                html =
                                    '<tr class="search-item">' +
                                    '   <td style="width: 42px;">' + (index + 1) + '</td>' +
                                    '   <td>' + returnValue(data.em_name) + '</td>' +
                                    '   <td>' + returnValue(data.em_phone) + '</td>' +
                                    '   <td>' + returnValue(data.ucc_name) + '</td>' +
                                    '   <td>' + returnValue(data.em_state == 1 ? '<span class="ok">在职中</span>' : '<span class="error">已离职</span>') + '</td>' +
                                    '</tr>';
                                break;
                            case "house":
                            default:
                                var hi_isForRent = returnHouseIsForRent(data.hi_isForRent);
                                html =
                                    '<tr class="search-item">' +
                                    '   <td style="width: 42px;">' + (index + 1) + '</td>' +
                                    '   <td>' + returnValue(data.house_address) + '</td>' +
                                    '   <td class="' + hi_isForRent.style + '" style="width:60px;text-align: center;">' + hi_isForRent.text + '</td>' +
                                    '</tr>';
                                break;
                        }
                        $(html).appendTo(tbody).data("data", data);
                    });

                    total_page.text(result.data.totalPage);
                    total_records.text(result.data.totalRecords);

                    //【事件】点击列表项
                    tbody.find(".search-item").off().on("click", function () {
                        options.done($(this).data("data"));
                        close_box();
                    });
                }).fail(function () {
                    var tbody = box.find(".search-list").find("tbody");
                    tbody.html('<tr style="background: #fff !important;cursor: default;"><td colspan="3" class="error">没有数据</td></tr>');
                    total_page.text(0);
                    total_records.text(0);
                });
            }

            // 加载事件
            function load_event() {
                var page_no = $("#pageNo");
                var total_page = $("#totalPage");
                var total_records = $("#totalRecords");

                //【事件】上一页
                box.find("#pageUp").off().on("click", function () {
                    var page_no_value = returnNumber(page_no.val());
                    var total_page_value = returnNumber(total_page.text());
                    if (page_no_value <= 1) return;
                    page_no.val(page_no_value > total_page_value ? total_page_value : page_no_value - 1);
                    load_data();
                });

                //【事件】下一页
                box.find("#pageDown").off().on("click", function () {
                    var page_no_value = returnNumber(page_no.val());
                    var total_page_value = returnNumber(total_page.text());
                    if (page_no_value >= total_page_value) return;
                    page_no.val(page_no_value + 1);
                    load_data();
                });

                //【事件】搜索1
                box.find("[name=search-btn]").off().on("click", function () {
                    page_no.val(1);
                    load_data();
                });

                //【事件】搜索2
                box.find("[name=search-text]").off().on("keyup", function (e) {
                    var search_remove = box.find("[name=search-remove]");
                    if (returnEmpty(this.value)) {
                        search_remove.hide();
                    } else {
                        search_remove.show();
                    }
                    if (e.keyCode == 13) {
                        page_no.val(1);
                        load_data();
                    }
                });

                //【事件】清除文本
                box.find("[name=search-remove]").off().on("click", function (e) {
                    box.find("[name=search-text]").val("").focus();
                    $(this).hide();
                    page_no.val(1);
                    load_data();
                });

                //【事件】返回
                box.find("[name=search-back]").off().on("click", function (e) {
                    close_box();
                });

                //【事件】筛选
                box.find("[name=search-filter]").off().on("change", function (e) {
                    page_no.val(1);
                    load_data();
                });

                //【事件】绑定点击不隐藏事件
                _this.on("click", function (e) { e.stopPropagation(); });
                box.on("click", function (e) { e.stopPropagation(); });
            }

            // 关闭窗口
            function close_box() {
                box.slideUp(100, function () {
                    this.remove();
                });
            }

        });
    };
})($, document);

/* 插件-搜索合同房屋信息*/
;(function ($, document) {
    $.fn.ContractHouseSearch = function (options) {
        return this.each(function () {
            var _this = $(this);
            var _obj = this;

            var defaults = {
                placeholder: "",
                result: function (obj) {
                }
            };
            var opts = $.extend(defaults, options);

            this.init = function () {
                this.createHTML();
            };

            /* 生成html*/
            this.createHTML = function () {
                var top = _this.position().top;
                var left = _this.position().left;
                var width = _this.outerWidth();
                var height = _this.outerHeight();

                var html = "";
                html += '<div id="search-box" style="position: absolute; top: ' + opts.top + 'px;left: ' + opts.left + 'px;">';
                html += '  <div class="search-head">';
                html += '		<i class="fa-search"></i>';
                html += '		<input type="text" id="search-text1" placeholder="' + opts.placeholder + '" style=" background: #fff; padding-left: 20px;">';
                html += '  </div>';
                html += '  <div class="search-list">';
                html += '  	<table>';
                html += '        <thead>';
                html += '            <tr class="search-item">';
                html += '                <th style="width: 42px;">#</th>';
                html += '                <th>小区房号</th>';
                html += '                <th>租客信息</th>';
                html += '                <th>房东信息</th>';
                html += '                <th>管家信息</th>';
                html += '                <th>所属门店</th>';
                html += '            </tr>';
                html += '        </thead>';
                html += '        <tbody id="search-listBox1"></tbody>';
                html += '		</table>';
                html += '  </div>';
                html += '  <div class="search-foot">';
                html += '		<button class="foot-left fa-angle-left" id="pageUp"></button>';
                html += '		<input type="text" class="foot-left number" id="pageNo" value="1">';
                html += '		<button class="foot-left fa-angle-right" id="pageDown"></button>';
                html += '  	<div class="foot-right">共<span id="totalPage1">0</span>页，<span id="totalRecords1">0</span>条记录</div>';
                html += '	 </div>';
                html += '</div>';
                $("#search-box").css({
                    // top: top + height + 10,
                    // left: left
                });
                _this.after(html);
                this.addEvent();
            };
            /* 绑定事件*/
            this.addEvent = function () {
                var _box = $("#search-box");
                var _text = $("#search-text1");
                var _list = $(".search-list");
                var eindex = -1;

                // 文本框获取焦点
                _this.on("focus", function () {
                    if (_box.is(":hidden")) {
                        _box.slideDown(100);
                        _text.focus();
                        _obj.queryPropertyInfoList();
                    }
                });
                _this.on("click", function (e) {
                    if (_box.is(":hidden")) {
                        _box.slideDown(100);
                        _text.focus();
                    }
                    e.stopPropagation();
                });
                // 上一页
                $("#pageUp").off().on("click", function () {
                    var pageNo = returnNumber($("#pageNo").val());
                    if (pageNo <= 1) {
                        return;
                    }
                    var totalPage = returnNumber($("#totalPage1").text());
                    if (pageNo > totalPage) {
                        $("#pageNo").val(totalPage);
                    } else {
                        $("#pageNo").val(pageNo - 1);
                    }
                    _obj.queryPropertyInfoList();
                });
                // 下一页
                $("#pageDown").off().on("click", function () {
                    var pageNo = returnNumber($("#pageNo").val());
                    var totalPage = returnNumber($("#totalPage1").text());
                    if (pageNo >= totalPage) {
                        return;
                    }
                    $("#pageNo").val(pageNo + 1);
                    _obj.queryPropertyInfoList();
                });
                // 跳转
                $("#pageNo").off().on("keyup", function (e) {
                    switch (e.keyCode) {
                        case 13:
                            var pageNo = returnNumber($("#pageNo").val());
                            var totalPage = returnNumber($("#totalPage1").text());
                            if (pageNo > totalPage) {
                                $("#pageNo").val(returnNumber($("#totalPage1").text()));
                            } else if (pageNo < 1) {
                                $("#pageNo").val(1);
                            } else {
                                $("#pageNo").val(pageNo);
                            }
                            ;
                            _obj.queryPropertyInfoList();
                            break;
                        case 38:
                            $("#pageUp").click();
                            break;
                        case 40:
                            $("#pageDown").click();
                            break;
                    }
                });
                // 文本框绑定事件
                _text.on("input propertychange", function () {
                    // $("#pageNo").val(1);
                    // _obj.queryPropertyInfoList();
                });

                $('#search-box .fa-search').on("click", function () {
                    _obj.queryPropertyInfoList();
                });

                // 绑定上下按键事件
                _text.on("keyup", function (e) {
                    var _item = $('#search-listBox1 .search-item');
                    switch (e.keyCode) {
                        case 13:
                            $(".search-item" + eindex).click();
                            eindex = -1;
                            _obj.queryPropertyInfoList();
                            break;
                        case 38:
                            eindex--;
                            if (eindex < 0) {
                                eindex = _item.length - 1;
                            }
                            _item.removeClass("item-hover").eq(eindex).addClass("item-hover");
                            break;
                        case 40:
                            eindex++;
                            if (eindex >= _item.length) {
                                eindex = 0;
                            }
                            _item.removeClass("item-hover").eq(eindex).addClass("item-hover");
                            break;
                    }
                });
                // 绑定点击不隐藏事件
                $("#search-box").on("click", function (e) {
                    e.stopPropagation();
                });
                $(document).on("click", function (e) {
                    $("#search-list,#search-box").slideUp(100);
                });
            };
            this.queryPropertyInfoList = function () {
                $.ajax({
                    type: "POST",
                    url: "/service/queryAllContractHouse",
                    data: {
                        where: $("#search-text1").val().trim(),
                        pageNo: returnNumber($("#pageNo").val())
                    },
                    dataType: "json"
                }).done(function (result) {
                    if (result.code == 200) {
                        var _body = $("#search-listBox1");
                        if (result.data.list.length <= 0) {
                            _body.html('<tr><td colspan="99" style="text-align: center;height: 60px;">没有数据</td></tr>');
                            $("#totalPage1").text(0);
                            $("#totalRecords1").text(0);
                            return;
                        }
                        _body.empty();
                        $.each(result.data.list, function (index, data) {
                            // 加载列表数据
                            _body.append('<tr class="search-item search-item' + index + '">' + '<td style="width: 42px;">' + (index + 1) + '</td>' + '<td>' + returnValue(data.house_address) + '</td>' + '<td>' + (returnValue(data.cc_name_z) + '-' + returnValue(data.ccp_phone_z)) + '</td>' + '<td>' + (returnValue(data.cc_name_f) + '-' + returnValue(data.ccp_phone_f)) + '</td>' + '<td>' + (returnValue(data.em_name) + '-' + returnValue(data.em_phone)) + '</td>' + '<td>' + (returnValue(data.ucc_name) + '-' + returnValue(data.ucc_phone)) + '</td>' + '</tr>');

                            // 点击单个列表数据 TODO
                            $(".search-item" + index).on("click", function () {
                                var _data = $(this).data("data");
                                _this.val(_data.house_address).data("data", _data);
                                opts.result(_this);

                                eindex = -1;
                                $("#search-list, #search-box").slideUp(100);
                            }).data("data", data);
                        });
                        $(".search-list").show();
                        $("#totalPage1").text(result.data.totalPage);
                        $("#totalRecords1").text(result.data.totalRecords);
                    } else {
                        _body.html('<tr><td colspan="99" style="text-align: center;height: 60px;">没有数据</td></tr>');
                        $("#totalPage1").text(0);
                        $("#totalRecords1").text(0);
                    }
                });
            };
            this.init();
        });
    };
})($, document);

/* 插件-搜索合同房屋信息*/
;(function ($, document) {
    $.fn.ContractHouseSearch2 = function (options) {
        return this.each(function () {
            var _this = $(this);
            var _obj = this;

            var defaults = {
                placeholder: "",
                result: function (obj) {
                }
            };
            var opts = $.extend(defaults, options);

            this.init = function () {
                this.createHTML();
            };

            /* 生成html*/
            this.createHTML = function () {
                var top = _this.position().top;
                var left = _this.position().left;
                var width = _this.outerWidth();
                var height = _this.outerHeight();

                var html = "";
                html += '<div id="search-box2" style="position: absolute; top: ' + opts.top + 'px;left: ' + opts.left + 'px;">';
                html += '  <div class="search-head">';
                html += '		<i class="fa-search"></i>';
                html += '		<input type="text" id="search-text2" placeholder="' + opts.placeholder + '" style=" background: #fff; padding-left: 20px;">';
                html += '  </div>';
                html += '  <div class="search-list">';
                html += '  	<table>';
                html += '        <thead>';
                html += '            <tr class="search-item">';
                html += '                <th style="width: 42px;">#</th>';
                html += '                <th>小区房号</th>';
                html += '                <th>租客信息</th>';
                html += '                <th>房东信息</th>';
                html += '                <th>管家信息</th>';
                html += '                <th>所属门店</th>';
                html += '            </tr>';
                html += '        </thead>';
                html += '        <tbody id="search-listBox2"></tbody>';
                html += '		</table>';
                html += '  </div>';
                html += '  <div class="search-foot">';
                html += '		<button class="foot-left fa-angle-left" id="pageUp2"></button>';
                html += '		<input type="text" class="foot-left number" id="pageNo2" value="1">';
                html += '		<button class="foot-left fa-angle-right" id="pageDown2"></button>';
                html += '  	<div class="foot-right">共<span id="totalPage2">0</span>页，<span id="totalRecords2">0</span>条记录</div>';
                html += '	 </div>';
                html += '</div>';
                $("#search-box").css({
                    // top: top + height + 10,
                    // left: left
                });
                _this.after(html);
                this.addEvent();
            };
            /* 绑定事件*/
            this.addEvent = function () {
                var _box = $("#search-box2");
                var _text = $("#search-text2");
                var _list = $(".search-list");
                var eindex = -1;

                // 文本框获取焦点
                _this.on("focus", function () {
                    if (_box.is(":hidden")) {
                        _box.slideDown(100);
                        _text.focus();
                        _obj.queryPropertyInfoList();
                    }
                });
                _this.on("click", function (e) {
                    if (_box.is(":hidden")) {
                        _box.slideDown(100);
                        _text.focus();
                    }
                    e.stopPropagation();
                });
                // 上一页
                $("#pageUp2").off().on("click", function () {
                    var pageNo = returnNumber($("#pageNo2").val());
                    if (pageNo <= 1) {
                        return;
                    }
                    var totalPage = returnNumber($("#totalPage2").text());
                    if (pageNo > totalPage) {
                        $("#pageNo2").val(totalPage);
                    } else {
                        $("#pageNo2").val(pageNo - 1);
                    }
                    _obj.queryPropertyInfoList();
                });
                // 下一页
                $("#pageDown2").off().on("click", function () {
                    var pageNo = returnNumber($("#pageNo2").val());
                    var totalPage = returnNumber($("#totalPage2").text());
                    if (pageNo >= totalPage) {
                        return;
                    }
                    $("#pageNo2").val(pageNo + 1);
                    _obj.queryPropertyInfoList();
                });
                // 跳转
                $("#pageNo2").off().on("keyup", function (e) {
                    switch (e.keyCode) {
                        case 13:
                            var pageNo = returnNumber($("#pageNo2").val());
                            var totalPage = returnNumber($("#totalPage2").text());
                            if (pageNo > totalPage) {
                                $("#pageNo2").val(returnNumber($("#totalPage2").text()));
                            } else if (pageNo < 1) {
                                $("#pageNo2").val(1);
                            } else {
                                $("#pageNo2").val(pageNo);
                            }
                            ;
                            _obj.queryPropertyInfoList();
                            break;
                        case 38:
                            $("#pageUp2").click();
                            break;
                        case 40:
                            $("#pageDown2").click();
                            break;
                    }
                });
                // 文本框绑定事件
                _text.on("input propertychange", function () {
                    // $("#pageNo").val(1);
                    // _obj.queryPropertyInfoList();
                });

                $('#search-box2 .fa-search').on("click", function () {
                    _obj.queryPropertyInfoList();
                });

                // 绑定上下按键事件
                _text.on("keyup", function (e) {
                    var _item = $('#search-listBox2 .search-item');
                    switch (e.keyCode) {
                        case 13:
                            $(".search-item" + eindex).click();
                            eindex = -1;
                            _obj.queryPropertyInfoList();
                            break;
                        case 38:
                            eindex--;
                            if (eindex < 0) {
                                eindex = _item.length - 1;
                            }
                            _item.removeClass("item-hover").eq(eindex).addClass("item-hover");
                            break;
                        case 40:
                            eindex++;
                            if (eindex >= _item.length) {
                                eindex = 0;
                            }
                            _item.removeClass("item-hover").eq(eindex).addClass("item-hover");
                            break;
                    }
                });
                // 绑定点击不隐藏事件
                $("#search-box2").on("click", function (e) {
                    e.stopPropagation();
                });
                $(document).on("click", function (e) {
                    $("#search-list2,#search-box2").slideUp(100);
                });
            };
            this.queryPropertyInfoList = function () {
                $.ajax({
                    type: "POST",
                    url: "/service/queryAllContractHouse",
                    data: {
                        where: $("#search-text2").val().trim(),
                        pageNo: returnNumber($("#pageNo2").val())
                    },
                    dataType: "json"
                }).done(function (result) {
                    if (result.code == 200) {
                        var _body = $("#search-listBox2");
                        if (result.data.list.length <= 0) {
                            _body.html('<tr><td colspan="99" style="text-align: center;height: 60px;">没有数据</td></tr>');
                            $("#totalPage2").text(0);
                            $("#totalRecords2").text(0);
                            return;
                        }
                        _body.empty();
                        $.each(result.data.list, function (index, data) {
                            // 加载列表数据
                            _body.append('<tr class="search-item search-item' + index + '">' + '<td style="width: 42px;">' + (index + 1) + '</td>' + '<td>' + returnValue(data.house_address) + '</td>' + '<td>' + (returnValue(data.cc_name_z) + '-' + returnValue(data.ccp_phone_z)) + '</td>' + '<td>' + (returnValue(data.cc_name_f) + '-' + returnValue(data.ccp_phone_f)) + '</td>' + '<td>' + (returnValue(data.em_name) + '-' + returnValue(data.em_phone)) + '</td>' + '<td>' + (returnValue(data.ucc_name) + '-' + returnValue(data.ucc_phone)) + '</td>' + '</tr>');

                            // 点击单个列表数据 TODO
                            $(".search-item" + index).on("click", function () {
                                var _data = $(this).data("data");
                                _this.val(_data.house_address).data("data", _data);
                                opts.result(_this);

                                eindex = -1;
                                $("#search-list2, #search-box2").slideUp(100);
                            }).data("data", data);
                        });
                        $(".search-list").show();
                        $("#totalPage2").text(result.data.totalPage);
                        $("#totalRecords2").text(result.data.totalRecords);
                    } else {
                        _body.html('<tr><td colspan="99" style="text-align: center;height: 60px;">没有数据</td></tr>');
                        $("#totalPage2").text(0);
                        $("#totalRecords2").text(0);
                    }
                });
            };
            this.init();
        });
    };
})($, document);

/* 插件-搜索合同房屋信息(用于保险批改)*/
;(function ($, document) {
    $.fn.ContractHouseSearch3 = function (options) {
        return this.each(function () {
            var _this = $(this);
            var _obj = this;

            var defaults = {
                placeholder: "",
                result: function (obj) {
                }
            };
            var opts = $.extend(defaults, options);

            this.init = function () {
                this.createHTML();
            };
            var contractObjectTypeForSearch = $("#contractObjectTypeForSearch").val();
            /* 生成html*/
            this.createHTML = function () {
                var top = _this.position().top;
                var left = _this.position().left;
                var width = _this.outerWidth();
                var height = _this.outerHeight();
                var html = "";
                html += '<div id="search-box" style="position: absolute; top: ' + opts.top + 'px;left: ' + opts.left + 'px;">';
                html += '  <div class="search-head">';
                html += '		<i class="fa-search"></i>';
                html += '		<input type="text" id="search-text1" placeholder="' + opts.placeholder + '" style=" background: #fff; padding-left: 20px;">';
                html += '  </div>';
                html += '  <div class="search-list">';
                html += '  	<table>';
                html += '        <thead>';
                html += '            <tr class="search-item">';
                html += '                <th style="width: 42px;">#</th>';
                html += '                <th>小区房号</th>';
                if (contractObjectTypeForSearch == '租赁合同') {
                    html += '                <th>租客信息</th>';
                } else {
                    html += '                <th>房东信息</th>';
                }
                html += '            </tr>';
                html += '        </thead>';
                html += '        <tbody id="search-listBox1"></tbody>';
                html += '		</table>';
                html += '  </div>';
                html += '  <div class="search-foot">';
                html += '		<button class="foot-left fa-angle-left" id="pageUp"></button>';
                html += '		<input type="text" class="foot-left number" id="pageNo" value="1">';
                html += '		<button class="foot-left fa-angle-right" id="pageDown"></button>';
                html += '  	<div class="foot-right">共<span id="totalPage1">0</span>页，<span id="totalRecords1">0</span>条记录</div>';
                html += '	 </div>';
                html += '</div>';
                $("#search-box").css({
                    // top: top + height + 10,
                    // left: left
                });
                _this.after(html);
                this.addEvent();
            };
            /* 绑定事件*/
            this.addEvent = function () {
                var _box = $("#search-box");
                var _text = $("#search-text1");
                var _list = $(".search-list");
                var eindex = -1;

                // 文本框获取焦点
                _this.on("focus", function () {
                    if (_box.is(":hidden")) {
                        _box.slideDown(100);
                        _text.focus();
                        _obj.queryPropertyInfoList();
                    }
                });
                _this.on("click", function (e) {
                    if (_box.is(":hidden")) {
                        _box.slideDown(100);
                        _text.focus();
                    }
                    e.stopPropagation();
                });
                // 上一页
                $("#pageUp").off().on("click", function () {
                    var pageNo = returnNumber($("#pageNo").val());
                    if (pageNo <= 1) {
                        return;
                    }
                    var totalPage = returnNumber($("#totalPage1").text());
                    if (pageNo > totalPage) {
                        $("#pageNo").val(totalPage);
                    } else {
                        $("#pageNo").val(pageNo - 1);
                    }
                    _obj.queryPropertyInfoList();
                });
                // 下一页
                $("#pageDown").off().on("click", function () {
                    var pageNo = returnNumber($("#pageNo").val());
                    var totalPage = returnNumber($("#totalPage1").text());
                    if (pageNo >= totalPage) {
                        return;
                    }
                    $("#pageNo").val(pageNo + 1);
                    _obj.queryPropertyInfoList();
                });
                // 跳转
                $("#pageNo").off().on("keyup", function (e) {
                    switch (e.keyCode) {
                        case 13:
                            var pageNo = returnNumber($("#pageNo").val());
                            var totalPage = returnNumber($("#totalPage1").text());
                            if (pageNo > totalPage) {
                                $("#pageNo").val(returnNumber($("#totalPage1").text()));
                            } else if (pageNo < 1) {
                                $("#pageNo").val(1);
                            } else {
                                $("#pageNo").val(pageNo);
                            }
                            ;
                            _obj.queryPropertyInfoList();
                            break;
                        case 38:
                            $("#pageUp").click();
                            break;
                        case 40:
                            $("#pageDown").click();
                            break;
                    }
                });
                // 文本框绑定事件
                _text.on("input propertychange", function () {
                    // $("#pageNo").val(1);
                    // _obj.queryPropertyInfoList();
                });

                $('#search-box .fa-search').on("click", function () {
                    _obj.queryPropertyInfoList();
                });

                // 绑定上下按键事件
                _text.on("keyup", function (e) {
                    var _item = $('#search-listBox1 .search-item');
                    switch (e.keyCode) {
                        case 13:
                            $(".search-item" + eindex).click();
                            eindex = -1;
                            _obj.queryPropertyInfoList();
                            break;
                        case 38:
                            eindex--;
                            if (eindex < 0) {
                                eindex = _item.length - 1;
                            }
                            _item.removeClass("item-hover").eq(eindex).addClass("item-hover");
                            break;
                        case 40:
                            eindex++;
                            if (eindex >= _item.length) {
                                eindex = 0;
                            }
                            _item.removeClass("item-hover").eq(eindex).addClass("item-hover");
                            break;
                    }
                });
                // 绑定点击不隐藏事件
                $("#search-box").on("click", function (e) {
                    e.stopPropagation();
                });
                $(document).on("click", function (e) {
                    $("#search-list,#search-box").slideUp(100);
                });
            };
            this.queryPropertyInfoList = function () {
                $.ajax({
                    type: "POST",
                    url: "/service/queryAllContractHouse",
                    data: {
                        where: $("#search-text1").val().trim(),
                        pageNo: returnNumber($("#pageNo").val())
                    },
                    dataType: "json"
                }).done(function (result) {
                    if (result.code == 200) {
                        var _body = $("#search-listBox1");
                        if (result.data.list.length <= 0) {
                            _body.html('<tr><td colspan="99" style="text-align: center;height: 60px;">没有数据</td></tr>');
                            $("#totalPage1").text(0);
                            $("#totalRecords1").text(0);
                            return;
                        }
                        _body.empty();
                        $.each(result.data.list, function (index, data) {
                            // 加载列表数据
                            _body.append('<tr class="search-item search-item' + index + '">' + '<td style="width: 42px;">' + (index + 1) + '</td>' + '<td>' + returnValue(data.house_address) + '</td>' + ((contractObjectTypeForSearch == '租赁合同') ? ('<td>' + (returnValue(data.cc_name_z)) + '</td>') : ('<td>' + (returnValue(data.cc_name_f)) + '</td>')) + '</tr>');

                            // 点击单个列表数据 TODO
                            $(".search-item" + index).on("click", function () {
                                var _data = $(this).data("data");
                                _this.val(_data.house_address).data("data", _data);
                                opts.result(_this);

                                eindex = -1;
                                $("#search-list, #search-box").slideUp(100);
                            }).data("data", data);
                        });
                        $(".search-list").show();
                        $("#totalPage1").text(result.data.totalPage);
                        $("#totalRecords1").text(result.data.totalRecords);
                    } else {
                        _body.html('<tr><td colspan="99" style="text-align: center;height: 60px;">没有数据</td></tr>');
                        $("#totalPage1").text(0);
                        $("#totalRecords1").text(0);
                    }
                });
            };
            this.init();
        });
    };
})($, document);

/**
 * 插件-银行帐号输入
 *
 * @Author
 */
;(function ($, document) {
    // 输入框格式化
    $.fn.bankInput = function (options) {
        var defaults = {
            min: 4, // 最少输入字数
            max: 25, // 最多输入字数
            deimiter: ' ', // 账号分隔符
            onlyNumber: true, // 只能输入数字
            copy: true
            // 允许复制
        };
        var opts = $.extend({}, defaults, options);
        var obj = $(this);
        obj.css({
            imeMode: 'Disabled',
            borderWidth: '1px',
            color: '#000',
            fontFamly: 'Times New Roman'
        }).attr('maxlength', opts.max);
        if (obj.val() != '')
            obj.val(obj.val().replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1" + opts.deimiter));
        obj.bind('keyup', function (event) {
            if (opts.onlyNumber) {
                if (!(event.keyCode >= 48 && event.keyCode <= 57)) {
                    this.value = this.value.replace(/\D/g, '');
                }
            }
            this.value = this.value.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1" + opts.deimiter);
        }).bind('dragenter', function () {
            return false;
        }).bind('onpaste', function () {
            return !clipboardData.getData('text').match(/\D/);
        }).bind('blur', function () {
            this.value = this.value.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1" + opts.deimiter);
            if (this.value.length < opts.min) {
                //				console.log('最少输入' + opts.min + '位账号信息！');
                //$(obj).css("border","1px solid #E74C3C");
            }
        })
    }
    // 列表显示格式化
    $.fn.bankList = function (options) {
        var defaults = {
            deimiter: ' ' // 分隔符
        };
        var opts = $.extend({}, defaults, options);
        return this.each(function () {
            $(this).text($(this).text().replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1" + opts.deimiter));
        })
    }
})($, document);

/* 插件-银行帐号输入 */
;(function ($, document) {
    // 输入框格式化
    $.fn.addOptions = function (options) {
        var self = this;
        $.each(options, function (key, value) {
            self.append('<option value="' + key + '">' + value + '</option>');
        });
        return self;
    }
})($, document);

// ------------------------------------------------------

/**
 * IFRAME改变地址
 * 参考地址:http://www.cnblogs.com/yinluhui0229/p/7152447.html?utm_source=tuicool&utm_medium=referral
 * @param iframeSrcChanged
 */
$.fn.iframeChange = function (iframeSrcChanged) {
    var iframe = this;
    if (window.MutationObserver || window.webkitMutationObserver) {
        var observer;
        // chrome
        var callback = function (mutations) {
            mutations.forEach(function (mutation) {
                iframeSrcChanged(mutation.oldValue, mutation.target.src, mutation.target);
            });
        };
        if (window.MutationObserver) {
            observer = new MutationObserver(callback);
        } else {
            observer = new webkitMutationObserver(callback);
        }
        observer.observe(iframe, {
            attributes: true,
            attributeOldValue: true
        });
    } else if (iframe.addEventListener) {
        // Firefox, Opera and Safari
        iframe.addEventListener("DOMAttrModified", function (event) {
            iframeSrcChanged(event.prevValue, event.newValue, event.target);
        }, false);
    } else if (iframe.attachEvent) {
        // Internet Explorer
        iframe.attachEvent("onpropertychange", function (event) {
            iframeSrcChanged(event.prevValue, event.newValue, event.target);
        });
    }
};

/**
 * 打开选项卡
 *
 * @type {{house_info: Window.open_tab.house_info, customer_info: Window.open_tab.customer_info}}
 */
window.open_tab = {
    /**
     * 房源信息
     * @param hi_code
     */
    house_info: function (hi_code) {
        window.top.href_mo('/houseLibrary/jumpHouseInfo?hi_code=' + hi_code, "房源信息", "合同账单");
    },
    /**
     * 客户信息
     * @param cc_code
     */
    customer_info: function (cc_code) {
        window.top.href_mo('/customer/customerEdit?cc_code=' + cc_code, "客户信息", "合同账单");
    }
};

/**
 * 公共方法
 *
 * @type {{printPayOrder: Window.publicMethods.printPayOrder}}
 */
window.publicMethods = {
    /**
     * 打印支付订单
     * @param order_sn
     */
    printPayOrder: function (order_sn) {
        $.ajax({
            type: "POST",
            url: "/financeManage/requestOrderPrint",
            data: {order_sn: order_sn},
            dataType: "json",
        }).done(function (result) {
            if (result.code != 200) return $.hint.tip(result.msg);
            commonBillPrint(result.data);
        });
    }
};

/**
 * 日期相加减
 * @param interval
 * @param number
 * @param date
 * @returns {*}
 * @constructor
 */
function DateAdd(interval, number, date) {
    switch (interval) {
        case "y ": {
            date.setFullYear(date.getFullYear() + number);
            return date;
            break;
        }
        case "q ": {
            date.setMonth(date.getMonth() + number * 3);
            return date;
            break;
        }
        case "m ": {
            date.setMonth(date.getMonth() + number);
            return date;
            break;
        }
        case "w ": {
            date.setDate(date.getDate() + number * 7);
            return date;
            break;
        }
        case "d ": {
            date.setDate(date.getDate() + number);
            return date;
            break;
        }
        case "h ": {
            date.setHours(date.getHours() + number);
            return date;
            break;
        }
        case "m ": {
            date.setMinutes(date.getMinutes() + number);
            return date;
            break;
        }
        case "s ": {
            date.setSeconds(date.getSeconds() + number);
            return date;
            break;
        }
        default: {
            date.setDate(d.getDate() + number);
            return date;
            break;
        }
    }
}
