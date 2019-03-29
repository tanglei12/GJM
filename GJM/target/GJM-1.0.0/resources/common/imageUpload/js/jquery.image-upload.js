document.write('<link rel="stylesheet" type="text/css" href="/resources/common/cropper/cropper.css" />');
document.write('<script src="/resources/common/cropper/cropper.js" type="text/javascript" charset="utf-8"></script>');
/**
 * 原理：先将图片剪切传到服务器，服务器返回图片url，再保存
 *
 * DEFAULTS：
 *
 * skin : "imageUpload", 插件样式（扩展只需写好相应css放入jquery.image-upload.css即可）
 * multiple : true,批量上传
 * delay : 600,延时上传
 *
 * width : 0,图片预览宽
 * height : 0,图片预览高
 *
 * limitUpload : false,上传张数限制
 * limitSize : 0,
 *
 * showUpload : true,重新上传
 * showRefresh : true,刷新图片
 * showRotate : true,旋转图片
 *
 * isAjaxUpload : true,异步上传
 * uploadType : "house",详见 path.properties
 * uploadUrl : "/upload/uploadImageFile",上传路径
 * deleteUrl : "/upload/deleteImageFile",删除路径
 *
 * isTailor : false,是否裁剪
 * tailorWidth : 0,裁剪宽
 * tailorHeight : 0,裁剪高
 *
 * fileZoom : { 图片压缩
 * 		width : 1920,
 * 		height : 1080,
 * 		quality : 0.8
 * },
 * builds : {
 * 		onUpload : function(img){
 * 		// 上传成功回调
 * 		},
 * 		onDelete : function(path){
 * 		// 删除成功回调
 * 		}
 * 	},
 *    success : function(box){
 * 		// 插件初始化成功回调
 * 	},
 *    dataList : [] 图片list
 *
 *
 */
;
(function ($) {
    $.fn.imageUpload = function (options) {
        // 初始化参数
        options = $.extend({}, $.fn.imageUpload.defaults, options);
        // 裁剪默认不支持批量上传
        if (options.isTailor && options.multiple) {
            options.multiple = false;
            console.warn("初始化失败，不支持批量裁剪！");
        }
        // 如果没有指定上传接口和删除接口，则默认不支持异步上传
        if (options.isAjaxUpload
            && (options.uploadUrl == "" || options.deleteUrl == "" || options.uploadType == "")) {
            options.isAjaxUpload = false;
            console.warn("初始化失败，上传参数配置错误！");
        }
        if (options.uploadType == "" || options.uploadType == null) {
            options.uploadType = "temp";
        }
        var _this = this;
        var _id = this.attr("id") || "";
        var _style = this.attr("style") || "";

        /**
         * 创建插件html
         */
        this.createUploadHtml = function () {
            var html = "";
            html += '<div id="' + _id + '" class="' + options.skin + '" style="' + _style + '">';
            html += '	<div class="image-item-add">';
            html += '		<button class="shade-button" type="button"></button>';
            html += '		<input type="file" name="image-file" class="image-file" value="" />';
            html += '	</div>';
            if (options.limitUpload) {
                html += '<div class="image-item-limit">';
                html += '	<em class="nowSize">0</em>/<em class="limitSize">'
                    + options.limitSize + '</em>';
                html += '</div>';
            }
            html += '</div>';
            _this.after(html).remove();
            // 设置批量
            if (options.multiple) {
                $("#" + _id + " .image-file").attr("multiple", true);
            }
            // 上传控件大小
            if (options.width > 0 && options.height > 0) {
                $("#" + _id + " .image-item-add").css({
                    width: options.width,
                    height: options.height
                });
            }
            // 追加数据
            if (options.dataList.length > 0) {
                $(options.dataList).each(function (index, item) {
                    _this.previewImage(item, false);
                });
            }
        };
        /**
         * 绑定插件事件
         */
        this.onUploadListener = function () {
            // 选择图片后
            $("#" + _id + " .image-file").on("change", function () {
                var files = this.files;
                // 判断是否超出上传限制
                if (options.limitUpload) {
                    var nowSize = parseInt($("#" + _id + " .nowSize").text())
                        + files.length;
                    var limitSize = parseInt($("#" + _id + " .limitSize").text());
                    if (nowSize > limitSize) {
                        $.jBox.tip("最多上传 " + limitSize + " 张图片", "error");
                        return;
                    }
                }
                // 验证图片合法性
                var is_ok = true;
                $(files).each(function (index, item) {
                    if (item.type.indexOf("image/") <= -1) {
                        $.jBox.tip("请选择图片", "warning");
                        is_ok = false;
                        return false;
                    }
                });
                if (!is_ok) {
                    this.value = "";
                    return;
                }
                // 验证图片大小

                // 图片裁剪
                if (options.isTailor) {
                    _this.loadCropper(files[0]);
                } else {
                    _this.loadNoCropper(files);
                }
                this.value = "";
            });
            // 触发上传
            $("#" + _id + " .shade-button").on("click", function () {
                $("#" + _id + " .image-file").trigger("click");
            });
        };
        /**
         * 删除图片
         *
         * @param {Object} obj
         */
        this.deleteImage = function (obj) {
            var submit = confirm("确定要删除该图片吗？");
            if (submit == true) {
                // 获取图片路径
                var path = $(obj).parent().find(".image-item-img").attr("data-url");
                $(obj).parent().find(".image-item-wait").show();
                // 1.延迟执行界面删除
                var timeout = setTimeout(function () {
                    // 更新图片数量
                    if (options.limitUpload) {
                        var nowSize = parseInt($("#" + _id + " .nowSize").text());
                        $("#" + _id + " .nowSize").text(nowSize - 1);
                    }
                    // 移除元素
                    $(obj).parent().remove();
                    clearTimeout(timeout);
                }, options.delay);
                // 2.后台异步删除图片
                if (options.isAjaxUpload) {
                    $.ajax({
                        type: "POST",
                        url: options.deleteUrl,
                        data: {
                            image_url: path,
                            uploadType: options.uploadType
                        },
                        dataType: "json",
                        error: function (e) {
                            alert("系统错误，请重试");
                        },
                        success: function (result) {
                            if (result.msg == "success") {
                                // 删除成功
                                options.builds.onDelete(path);
                            } else {
                                alert(result.msg);
                            }
                        }
                    });
                }
            }
        };
        /**
         * 不剪切上传
         *
         * @param {Object}
         *            files
         */
        this.loadNoCropper = function (files) {
            $(files).each(function (index, item) {
                var blobUrl = (window.URL || window.webkitURL).createObjectURL(item);
                // 压缩显示
                _this.imageZoom(blobUrl, function (blob) {
                    // 生成预览图片
                    var image_item = _this.previewImage(blobUrl, true);
                    // 保存原图
                    image_item.find(".image-item-img").data("image", item);
                    // 保存压缩图片
                    image_item.find(".image-item-img").data("minImage", blob);
                    // 1.延迟加载图片
                    var timeout = setTimeout(function () {
                        image_item.find(".image-item-wait").hide();
                        clearTimeout(timeout);
                    }, options.delay * (index + 1));
                    // 2.后台异步上传图片
                    if (options.isAjaxUpload) {
                        _this.uploadImage(image_item.find(".image-item-img"));
                    }
                });
            });
        };
        /**
         * 剪切上传
         *
         * @param {Object}file
         */
        this.loadCropper = function (file) {
            var blobUrl = (window.URL || window.webkitURL).createObjectURL(file);
            if ($(".image-show").length > 0) {
                $(".image-content").cropper('replace', blobUrl);
            } else {
                _this.createTailorHtml();
                _this.onTailorListener();
                // 加载cropper
                $(".image-content").cropper({
                    aspectRatio: options.tailorWidth / options.tailorHeight,
                    strict: true,
                    guides: true,
                    highlight: true,
                    dragCrop: false,
                    resizable: false,
                    mouseWheelZoom: true,
                    touchDragZoom: true
                }).cropper('replace', blobUrl);
            }
        };
        /**
         * 创建剪切插件html
         */
        this.createTailorHtml = function () {
            var html = "";
            html += '<div class="image-show">';
            html += '	<div class="image-show-mask"></div>';
            html += '	<div class="image-show-head">';
            html += '		<div class="image-show-head-title">图片剪切</div>';
            html += '		<div class="image-show-head-option">';
            html += '			<ul>';
            if (options.showUpload) {
                html += '				<li class="image-show-icon image-show-upload"><i class="fa-upload"></i>&nbsp;导入图片</li>';
            }
            if (options.showRefresh) {
                html += '				<li class="image-show-icon image-show-refresh"><i class="fa-refresh"></i>&nbsp;刷新</li>';
            }
            if (options.showRotate) {
                html += '				<li class="image-show-icon image-show-rotate"><i class="fa-undo"></i>&nbsp;旋转</li>';
            }
            html += '				<li class="image-show-icon image-show-ok"><i class="fa-check"></i>&nbsp;剪切上传</li>';
            html += '				<li class="image-show-icon image-show-remove"><i class="fa-remove"></i>&nbsp;取消</li>';
            html += '			</ul>';
            html += '		</div>';
            html += '	</div>';
            html += '	<div class="image-show-main">';
            html += '		<img class="image-content" src="">';
            html += '	</div>';
            html += '</div>';
            $("body").append(html);
        };
        /**
         * 绑定剪切插件按钮事件
         */
        this.onTailorListener = function () {
            var _image = $(".image-content");
            // 导入图片
            $(".image-show-upload").on("click", function () {
                $("#" + _id + " .image-file").trigger("click");
            });
            // 刷新
            $(".image-show-refresh").on("click", function () {
                _image.cropper("reset");
            });
            // 旋转
            $(".image-show-rotate").on("click", function () {
                _image.cropper("rotate", -90);
            });
            // 剪切上传
            $(".image-show-ok").on("click", function () {
                // 1.获取剪切后图片
                var base64 = _image.cropper("getCroppedCanvas", {
                    "width": options.tailorWidth,
                    "height": options.tailorHeight
                }).toDataURL();
                $(".image-show").remove();
                // 2.转换成blob对象并获取url
                var file = dataURLtoBlob(base64);
                file.name = "img" + new Date().getTime() + ".png";
                var blobUrl = (window.URL || window.webkitURL).createObjectURL(file);
                // 3.压缩显示
                _this.imageZoom(blobUrl, function (blob) {
                    // 生成预览图片
                    var image_item = _this.previewImage(blobUrl, true);
                    // 保存原图
                    image_item.find(".image-item-img").data("image", file);
                    // 保存压缩图片
                    image_item.find(".image-item-img").data("minImage", blob);
                    // 1.延迟加载图片
                    var timeout = setTimeout(function () {
                        image_item.find(".image-item-wait").hide();
                        clearTimeout(timeout);
                    }, options.delay);
                    // 2.后台异步上传图片
                    if (options.isAjaxUpload) {
                        _this.uploadImage(image_item.find(".image-item-img"));
                    }
                });
            });
            // 取消
            $(".image-show-remove").on("click", function () {
                $(".image-show").fadeOut(400, function () {
                    $(this).remove();
                });
            });
        };
        /**
         * 上传图片到服务器
         * obj 图片对象
         * callBack 回调
         */
        this.uploadImage = function (obj) {
            if (typeof obj == "undefined") {
                alert("参数错误，请刷新页面重试");
                return;
            }
            // 获取压缩过后的图片
            var file = $(obj).data("minImage");
            if (typeof file == "undefined") {
                alert("图片获取异常");
                return;
            }
            var fd = new FormData();
            fd.append("file", file);
            fd.append("uploadType", options.uploadType);
            $.ajax({
                type: "POST",
                url: options.uploadUrl,
                data: fd,
                dataType: "json",
                processData: false,
                contentType: false,
                error: function (e) {
                    alert("系统错误，请重试");
                },
                success: function (result) {
                    if (result.code == 200) {
                        $(obj).attr("src", result.data.url);
                        $(obj).attr("data-url", result.data.key);
                        // 返回图片对象
                        options.builds.onUpload(obj);
                    } else {
                        alert(result.msg);
                    }
                }
            });
        };
        /**
         * 加载图片
         *
         * @param {Object}
         *            path 图片路径
         */
        this.previewImage = function (obj, wait) {
            var html = "";
            html += '<div class="image-item">';
            html += '	<img class="image-item-img" src="' + obj.url + '" data-url="' + obj.key + '" data-preview-src data-preview-group="1">';
            html += '	<span class="image-item-close close" title="删除照片">X</span>';
            html += '	<div class="image-item-wait"></div>';
            html += '</div>';
            var _addnew = $("#" + _id + " .image-item-add").before(html).prev();
            // 绑定事件
            _addnew.find(".image-item-close").on("click", function () {
                _this.deleteImage(this);
            });
            if (options.width > 0 && options.height > 0) {
                _addnew.css({
                    width: options.width,
                    height: options.height
                });
            }
            if (options.limitUpload) {
                var nowSize = parseInt($("#" + _id + " .nowSize").text());
                $("#" + _id + " .nowSize").text(nowSize + 1);
            }
            if (wait) {
                _addnew.find(".image-item-wait").show();
            }
            return _addnew;
        };
        /**
         * 清除上传控件
         */
        this.cleanHistory = function () {
            $("#" + _id + " .image-file").val("");
        };
        /**
         * 回调函数
         */
        this.onSuccess = function () {
            // 插件对象
            var box = $("#" + _id);
            options.success(box);
        };
        /**
         * 图片压缩
         */
        this.imageZoom = function (blobUrl, callBack) {
            var img = new Image();
            img.src = blobUrl;
            img.onload = function () {
                var that = this;

                // 生成比例
                var w = that.width, h = that.height, scale = w / h;
                w = options.fileZoom.width == null ? w : (options.fileZoom.width > that.width ? w : options.fileZoom.width);
                h = w / scale;

                // 生成canvas
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                $(canvas).attr({width: w, height: h});
                ctx.drawImage(that, 0, 0, w, h);

                /** 生成base64 兼容修复移动设备需要引入mobileBUGFix.js */
                var base64 = canvas.toDataURL('image/jpeg', options.fileZoom.quality || 0.8);

                // 修复IOS
                if (navigator.userAgent.match(/iphone/i)) {
                    new MegaPixImage(img).render(canvas, {
                        maxWidth: w,
                        maxHeight: h,
                        quality: options.fileZoom.quality || 0.8
                    });
                    base64 = canvas.toDataURL('image/jpeg', options.fileZoom.quality || 0.8);
                }

                // 修复Android
                if (navigator.userAgent.match(/Android/i)) {
                    base64 = new JPEGEncoder().encode(ctx.getImageData(0, 0, w, h), options.fileZoom.quality * 100 || 80);
                }

                var blob = dataURLtoBlob(base64);
                blob.name = "img" + new Date().getTime() + ".png";
                callBack(blob);
            };
        };
        /**
         * 追加数据
         */
        this.push = function (datas) {
            $(datas).each(function (index, item) {
                _this.previewImage(item, false);
            });
        };
        return this.each(function () {
            _this.createUploadHtml();
            _this.onUploadListener();
            _this.onSuccess();
        });
    };
    // 插件默认参数
    $.fn.imageUpload.defaults = {
        skin: "imageUpload",
        multiple: true,
        delay: 600,

        width: 0,
        height: 0,

        limitUpload: false,
        limitSize: 0,

        showUpload: true,
        showRefresh: true,
        showRotate: true,

        isAjaxUpload: true,
        uploadType: "",
        uploadUrl: "/upload/uploadImageFile",
        deleteUrl: "/upload/deleteImageFile",

        isTailor: false,
        tailorWidth: 0,
        tailorHeight: 0,

        fileZoom: {
            width: 1920,
            height: 1080,
            quality: 0.8
        },
        builds: {
            onUpload: function (img) {

            },
            onDelete: function (path) {

            }
        },
        success: function (box) {

        },
        dataList: []
    };

    // =====================工具类存放区===========================
    /** 判断是否为函数 */
    function isFunction(a) {
        return Object.prototype.toString.call(a) === "[object Function]"
    };

    /** dataRUL转blob */
    function dataURLtoBlob(c) {
        var a = c.split(","), e = a[0].match(/:(.*?);/)[1], b = atob(a[1]), f = b.length, d = new Uint8Array(f);
        while (f--) {
            d[f] = b.charCodeAt(f)
        }
        return new Blob([d], {type: e})
    };

    /** 判断PC端和移动端 */
    function isPC() {
        var a = navigator.userAgent;
        var d = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
        var b = true;
        for (var c = 0; c < d.length; c++) {
            if (a.indexOf(d[c]) > 0) {
                b = false;
                break
            }
        }
        return b
    };

    /** jpeg_encoder_basic.js for android jpeg压缩质量修复 */
    function JPEGEncoder(a) {
        function I(a) {
            var c, i, j, k, l, m, n, o, p,
                b = [16, 11, 10, 16, 24, 40, 51, 61, 12, 12, 14, 19, 26, 58, 60, 55, 14, 13, 16, 24, 40, 57, 69, 56, 14, 17, 22, 29, 51, 87, 80, 62, 18, 22, 37, 56, 68, 109, 103, 77, 24, 35, 55, 64, 81, 104, 113, 92, 49, 64, 78, 87, 103, 121, 120, 101, 72, 92, 95, 98, 112, 100, 103, 99];
            for (c = 0; 64 > c; c++) i = d((b[c] * a + 50) / 100), 1 > i ? i = 1 : i > 255 && (i = 255), e[z[c]] = i;
            for (j = [17, 18, 24, 47, 99, 99, 99, 99, 18, 21, 26, 66, 99, 99, 99, 99, 24, 26, 56, 99, 99, 99, 99, 99, 47, 66, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99], k = 0; 64 > k; k++) l = d((j[k] * a + 50) / 100), 1 > l ? l = 1 : l > 255 && (l = 255), f[z[k]] = l;
            for (m = [1, 1.387039845, 1.306562965, 1.175875602, 1, .785694958, .5411961, .275899379], n = 0, o = 0; 8 > o; o++) for (p = 0; 8 > p; p++) g[n] = 1 / (8 * e[z[n]] * m[o] * m[p]), h[n] = 1 / (8 * f[z[n]] * m[o] * m[p]), n++
        }

        function J(a, b) {
            var f, g, c = 0, d = 0, e = new Array;
            for (f = 1; 16 >= f; f++) {
                for (g = 1; g <= a[f]; g++) e[b[d]] = [], e[b[d]][0] = c, e[b[d]][1] = f, d++, c++;
                c *= 2
            }
            return e
        }

        function K() {
            i = J(A, B), j = J(E, F), k = J(C, D), l = J(G, H)
        }

        function L() {
            var c, d, e, a = 1, b = 2;
            for (c = 1; 15 >= c; c++) {
                for (d = a; b > d; d++) n[32767 + d] = c, m[32767 + d] = [], m[32767 + d][1] = c, m[32767 + d][0] = d;
                for (e = -(b - 1); -a >= e; e++) n[32767 + e] = c, m[32767 + e] = [], m[32767 + e][1] = c, m[32767 + e][0] = b - 1 + e;
                a <<= 1, b <<= 1
            }
        }

        function M() {
            for (var a = 0; 256 > a; a++) x[a] = 19595 * a, x[a + 256 >> 0] = 38470 * a, x[a + 512 >> 0] = 7471 * a + 32768, x[a + 768 >> 0] = -11059 * a, x[a + 1024 >> 0] = -21709 * a, x[a + 1280 >> 0] = 32768 * a + 8421375, x[a + 1536 >> 0] = -27439 * a, x[a + 1792 >> 0] = -5329 * a
        }

        function N(a) {
            for (var b = a[0], c = a[1] - 1; c >= 0;) b & 1 << c && (r |= 1 << s), c--, s--, 0 > s && (255 == r ? (O(255), O(0)) : O(r), s = 7, r = 0)
        }

        function O(a) {
            q.push(w[a])
        }

        function P(a) {
            O(255 & a >> 8), O(255 & a)
        }

        function Q(a, b) {
            var c, d, e, f, g, h, i, j, l, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, $, _, k = 0;
            const m = 8, n = 64;
            for (l = 0; m > l; ++l) c = a[k], d = a[k + 1], e = a[k + 2], f = a[k + 3], g = a[k + 4], h = a[k + 5], i = a[k + 6], j = a[k + 7], p = c + j, q = c - j, r = d + i, s = d - i, t = e + h, u = e - h, v = f + g, w = f - g, x = p + v, y = p - v, z = r + t, A = r - t, a[k] = x + z, a[k + 4] = x - z, B = .707106781 * (A + y), a[k + 2] = y + B, a[k + 6] = y - B, x = w + u, z = u + s, A = s + q, C = .382683433 * (x - A), D = .5411961 * x + C, E = 1.306562965 * A + C, F = .707106781 * z, G = q + F, H = q - F, a[k + 5] = H + D, a[k + 3] = H - D, a[k + 1] = G + E, a[k + 7] = G - E, k += 8;
            for (k = 0, l = 0; m > l; ++l) c = a[k], d = a[k + 8], e = a[k + 16], f = a[k + 24], g = a[k + 32], h = a[k + 40], i = a[k + 48], j = a[k + 56], I = c + j, J = c - j, K = d + i, L = d - i, M = e + h, N = e - h, O = f + g, P = f - g, Q = I + O, R = I - O, S = K + M, T = K - M, a[k] = Q + S, a[k + 32] = Q - S, U = .707106781 * (T + R), a[k + 16] = R + U, a[k + 48] = R - U, Q = P + N, S = N + L, T = L + J, V = .382683433 * (Q - T), W = .5411961 * Q + V, X = 1.306562965 * T + V, Y = .707106781 * S, Z = J + Y, $ = J - Y, a[k + 40] = $ + W, a[k + 24] = $ - W, a[k + 8] = Z + X, a[k + 56] = Z - X, k++;
            for (l = 0; n > l; ++l) _ = a[l] * b[l], o[l] = _ > 0 ? 0 | _ + .5 : 0 | _ - .5;
            return o
        }

        function R() {
            P(65504), P(16), O(74), O(70), O(73), O(70), O(0), O(1), O(1), O(0), P(1), P(1), O(0), O(0)
        }

        function S(a, b) {
            P(65472), P(17), O(8), P(b), P(a), O(3), O(1), O(17), O(0), O(2), O(17), O(1), O(3), O(17), O(1)
        }

        function T() {
            var a, b;
            for (P(65499), P(132), O(0), a = 0; 64 > a; a++) O(e[a]);
            for (O(1), b = 0; 64 > b; b++) O(f[b])
        }

        function U() {
            var a, b, c, d, e, f, g, h;
            for (P(65476), P(418), O(0), a = 0; 16 > a; a++) O(A[a + 1]);
            for (b = 0; 11 >= b; b++) O(B[b]);
            for (O(16), c = 0; 16 > c; c++) O(C[c + 1]);
            for (d = 0; 161 >= d; d++) O(D[d]);
            for (O(1), e = 0; 16 > e; e++) O(E[e + 1]);
            for (f = 0; 11 >= f; f++) O(F[f]);
            for (O(17), g = 0; 16 > g; g++) O(G[g + 1]);
            for (h = 0; 161 >= h; h++) O(H[h])
        }

        function V() {
            P(65498), P(12), O(3), O(1), O(0), O(2), O(17), O(3), O(17), O(0), O(63), O(0)
        }

        function W(a, b, c, d, e) {
            var h, l, o, q, r, s, t, u, v, w, f = e[0], g = e[240];
            const i = 16, j = 63, k = 64;
            for (l = Q(a, b), o = 0; k > o; ++o) p[z[o]] = l[o];
            for (q = p[0] - c, c = p[0], 0 == q ? N(d[0]) : (h = 32767 + q, N(d[n[h]]), N(m[h])), r = 63; r > 0 && 0 == p[r]; r--) ;
            if (0 == r) return N(f), c;
            for (s = 1; r >= s;) {
                for (u = s; 0 == p[s] && r >= s; ++s) ;
                if (v = s - u, v >= i) {
                    for (t = v >> 4, w = 1; t >= w; ++w) N(g);
                    v = 15 & v
                }
                h = 32767 + p[s], N(e[(v << 4) + n[h]]), N(m[h]), s++
            }
            return r != j && N(f), c
        }

        function X() {
            var b, a = String.fromCharCode;
            for (b = 0; 256 > b; b++) w[b] = a(b)
        }

        function Y(a) {
            if (0 >= a && (a = 1), a > 100 && (a = 100), y != a) {
                var b = 0;
                b = 50 > a ? Math.floor(5e3 / a) : Math.floor(200 - 2 * a), I(b), y = a, console.log("Quality set to: " + a + "%")
            }
        }

        function Z() {
            var c, b = (new Date).getTime();
            a || (a = 50), X(), K(), L(), M(), Y(a), c = (new Date).getTime() - b, console.log("Initialization " + c + "ms")
        }

        var d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H;
        Math.round, d = Math.floor, e = new Array(64), f = new Array(64), g = new Array(64), h = new Array(64), m = new Array(65535), n = new Array(65535), o = new Array(64), p = new Array(64), q = [], r = 0, s = 7, t = new Array(64), u = new Array(64), v = new Array(64), w = new Array(256), x = new Array(2048), z = [0, 1, 5, 6, 14, 15, 27, 28, 2, 4, 7, 13, 16, 26, 29, 42, 3, 8, 12, 17, 25, 30, 41, 43, 9, 11, 18, 24, 31, 40, 44, 53, 10, 19, 23, 32, 39, 45, 52, 54, 20, 22, 33, 38, 46, 51, 55, 60, 21, 34, 37, 47, 50, 56, 59, 61, 35, 36, 48, 49, 57, 58, 62, 63], A = [0, 0, 1, 5, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0], B = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], C = [0, 0, 2, 1, 3, 3, 2, 4, 3, 5, 5, 4, 4, 0, 0, 1, 125], D = [1, 2, 3, 0, 4, 17, 5, 18, 33, 49, 65, 6, 19, 81, 97, 7, 34, 113, 20, 50, 129, 145, 161, 8, 35, 66, 177, 193, 21, 82, 209, 240, 36, 51, 98, 114, 130, 9, 10, 22, 23, 24, 25, 26, 37, 38, 39, 40, 41, 42, 52, 53, 54, 55, 56, 57, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89, 90, 99, 100, 101, 102, 103, 104, 105, 106, 115, 116, 117, 118, 119, 120, 121, 122, 131, 132, 133, 134, 135, 136, 137, 138, 146, 147, 148, 149, 150, 151, 152, 153, 154, 162, 163, 164, 165, 166, 167, 168, 169, 170, 178, 179, 180, 181, 182, 183, 184, 185, 186, 194, 195, 196, 197, 198, 199, 200, 201, 202, 210, 211, 212, 213, 214, 215, 216, 217, 218, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250], E = [0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], F = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], G = [0, 0, 2, 1, 2, 4, 4, 3, 4, 7, 5, 4, 4, 0, 1, 2, 119], H = [0, 1, 2, 3, 17, 4, 5, 33, 49, 6, 18, 65, 81, 7, 97, 113, 19, 34, 50, 129, 8, 20, 66, 145, 161, 177, 193, 9, 35, 51, 82, 240, 21, 98, 114, 209, 10, 22, 36, 52, 225, 37, 241, 23, 24, 25, 26, 38, 39, 40, 41, 42, 53, 54, 55, 56, 57, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89, 90, 99, 100, 101, 102, 103, 104, 105, 106, 115, 116, 117, 118, 119, 120, 121, 122, 130, 131, 132, 133, 134, 135, 136, 137, 138, 146, 147, 148, 149, 150, 151, 152, 153, 154, 162, 163, 164, 165, 166, 167, 168, 169, 170, 178, 179, 180, 181, 182, 183, 184, 185, 186, 194, 195, 196, 197, 198, 199, 200, 201, 202, 210, 211, 212, 213, 214, 215, 216, 217, 218, 226, 227, 228, 229, 230, 231, 232, 233, 234, 242, 243, 244, 245, 246, 247, 248, 249, 250], this.encode = function (a, b) {
            var d, e, f, m, n, o, p, y, z, A, B, C, D, E, F, G, H, I, J, K, c = (new Date).getTime();
            for (b && Y(b), q = new Array, r = 0, s = 7, P(65496), R(), T(), S(a.width, a.height), U(), V(), d = 0, e = 0, f = 0, r = 0, s = 7, this.encode.displayName = "_encode_", m = a.data, n = a.width, o = a.height, p = 4 * n, z = 0; o > z;) {
                for (y = 0; p > y;) {
                    for (D = p * z + y, E = D, F = -1, G = 0, H = 0; 64 > H; H++) G = H >> 3, F = 4 * (7 & H), E = D + G * p + F, z + G >= o && (E -= p * (z + 1 + G - o)), y + F >= p && (E -= y + F - p + 4), A = m[E++], B = m[E++], C = m[E++], t[H] = (x[A] + x[B + 256 >> 0] + x[C + 512 >> 0] >> 16) - 128, u[H] = (x[A + 768 >> 0] + x[B + 1024 >> 0] + x[C + 1280 >> 0] >> 16) - 128, v[H] = (x[A + 1280 >> 0] + x[B + 1536 >> 0] + x[C + 1792 >> 0] >> 16) - 128;
                    d = W(t, g, d, i, k), e = W(u, h, e, j, l), f = W(v, h, f, j, l), y += 32
                }
                z += 8
            }
            return s >= 0 && (I = [], I[1] = s + 1, I[0] = (1 << s + 1) - 1, N(I)), P(65497), J = "data:image/jpeg;base64," + btoa(q.join("")), q = [], K = (new Date).getTime() - c, console.log("Encoding time: " + K + "ms"), J
        }, Z()
    }

    function getImageDataFromImage(a) {
        var d, b = "string" == typeof a ? document.getElementById(a) : a, c = document.createElement("canvas");
        return c.width = b.width, c.height = b.height, d = c.getContext("2d"), d.drawImage(b, 0, 0), d.getImageData(0, 0, c.width, c.height)
    };
    /** megapix-image.js for IOS(iphone5+) drawImage画面扭曲修复 */
    !function () {
        function a(a) {
            var d, e, b = a.naturalWidth, c = a.naturalHeight;
            return b * c > 1048576 ? (d = document.createElement("canvas"), d.width = d.height = 1, e = d.getContext("2d"), e.drawImage(a, -b + 1, 0), 0 === e.getImageData(0, 0, 1, 1).data[3]) : !1
        }

        function b(a, b, c) {
            var e, f, g, h, i, j, k, d = document.createElement("canvas");
            for (d.width = 1, d.height = c, e = d.getContext("2d"), e.drawImage(a, 0, 0), f = e.getImageData(0, 0, 1, c).data, g = 0, h = c, i = c; i > g;) j = f[4 * (i - 1) + 3], 0 === j ? h = i : g = i, i = h + g >> 1;
            return k = i / c, 0 === k ? 1 : k
        }

        function c(a, b, c) {
            var e = document.createElement("canvas");
            return d(a, e, b, c), e.toDataURL("image/jpeg", b.quality || .8)
        }

        function d(c, d, f, g) {
            var m, n, o, p, q, r, s, t, u, v, w, h = c.naturalWidth, i = c.naturalHeight, j = f.width, k = f.height, l = d.getContext("2d");
            for (l.save(), e(d, l, j, k, f.orientation), m = a(c), m && (h /= 2, i /= 2), n = 1024, o = document.createElement("canvas"), o.width = o.height = n, p = o.getContext("2d"), q = g ? b(c, h, i) : 1, r = Math.ceil(n * j / h), s = Math.ceil(n * k / i / q), t = 0, u = 0; i > t;) {
                for (v = 0, w = 0; h > v;) p.clearRect(0, 0, n, n), p.drawImage(c, -v, -t), l.drawImage(o, 0, 0, n, n, w, u, r, s), v += n, w += r;
                t += n, u += s
            }
            l.restore(), o = p = null
        }

        function e(a, b, c, d, e) {
            switch (e) {
                case 5:
                case 6:
                case 7:
                case 8:
                    a.width = d, a.height = c;
                    break;
                default:
                    a.width = c, a.height = d
            }
            switch (e) {
                case 2:
                    b.translate(c, 0), b.scale(-1, 1);
                    break;
                case 3:
                    b.translate(c, d), b.rotate(Math.PI);
                    break;
                case 4:
                    b.translate(0, d), b.scale(1, -1);
                    break;
                case 5:
                    b.rotate(.5 * Math.PI), b.scale(1, -1);
                    break;
                case 6:
                    b.rotate(.5 * Math.PI), b.translate(0, -d);
                    break;
                case 7:
                    b.rotate(.5 * Math.PI), b.translate(c, -d), b.scale(-1, 1);
                    break;
                case 8:
                    b.rotate(-.5 * Math.PI), b.translate(-c, 0)
            }
        }

        function f(a) {
            var b, c, d;
            if (window.Blob && a instanceof Blob) {
                if (b = new Image, c = window.URL && window.URL.createObjectURL ? window.URL : window.webkitURL && window.webkitURL.createObjectURL ? window.webkitURL : null, !c) throw Error("No createObjectURL function found to create blob url");
                b.src = c.createObjectURL(a), this.blob = a, a = b
            }
            a.naturalWidth || a.naturalHeight || (d = this, a.onload = function () {
                var b, c, a = d.imageLoadListeners;
                if (a) for (d.imageLoadListeners = null, b = 0, c = a.length; c > b; b++) a[b]()
            }, this.imageLoadListeners = []), this.srcImage = a
        }

        f.prototype.render = function (a, b, e) {
            var f, g, h, i, j, k, l, m, n, o, p;
            if (this.imageLoadListeners) return f = this, this.imageLoadListeners.push(function () {
                f.render(a, b, e)
            }), void 0;
            b = b || {}, g = this.srcImage.naturalWidth, h = this.srcImage.naturalHeight, i = b.width, j = b.height, k = b.maxWidth, l = b.maxHeight, m = !this.blob || "image/jpeg" === this.blob.type, i && !j ? j = h * i / g << 0 : j && !i ? i = g * j / h << 0 : (i = g, j = h), k && i > k && (i = k, j = h * i / g << 0), l && j > l && (j = l, i = g * j / h << 0), n = {
                width: i,
                height: j
            };
            for (o in b) n[o] = b[o];
            p = a.tagName.toLowerCase(), "img" === p ? a.src = c(this.srcImage, n, m) : "canvas" === p && d(this.srcImage, a, n, m), "function" == typeof this.onrender && this.onrender(a), e && e()
        }, "function" == typeof define && define.amd ? define([], function () {
            return f
        }) : this.MegaPixImage = f
    }();

})(jQuery);