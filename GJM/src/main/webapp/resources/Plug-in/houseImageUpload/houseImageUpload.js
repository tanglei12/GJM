;(function ($) {

    $.fn.extend({
        rotate: function (degree) {
            degree
            this.css("transform", "rotate(" + degree + "deg)");
        }
    });

    /** 图片上传插件*/
    $.fn.imageUpload = function (opts) {
        return this.each(function () {
            var defaults = {
                mode: '',									// 模式
                type: 'temp',							    // 文件类型地址
                fileLimitNumber: 3,						// 文件限制数量
                fileLimitSize: 20 * 1024 * 1024,			// 文件限制大小
                fileMultiple: true,						// 多文件选择
                fileAccept: 'image',						// 文件类型all/image/text/audio/
                fileUploadDesc: null,						// 文件上传说明
                fileResizeParam: {
                    width: 1440,								// 图片压缩宽度
                    quality: 1								// 图片压缩质量
                },											// 图片压缩参数
                ajaxParams: {},							// ajax请求参数
                done: function () {
                },						// ajax请求完成
                fail: function () {
                },						// ajax请求失败
                fileUploadBefore: function () {
                    return true;
                },
                fileUploadCallback: {
                    isRealUpload: true,
                    done: function () {
                    }
                },
                fileDeleteCallback: {
                    isRealDelete: true,
                    done: function () {
                    }
                },
                fileDomain: '',
                hi_code: hi_code,
            };
            opts = $.extend(defaults, opts);

            var _image = ['image/gif', 'image/jpeg', 'image/png'];

            var self = this;
            var box = "";

            /** 初始化*/
            this.init = function () {
                //
                $(self).hide();
                // 多文件选择
                $(self).attr("multiple", opts.fileMultiple);
                // 文件接受类型
                switch (opts.fileAccept) {
                    case "image":
                        $(self).attr("accept", _image.join(","));
                        break;
                }

                var html = '';
                html += '<div class="image-upload-box">';
                html += '	<div class="image-upload-head">';
//				html += '<select><option>111</option></select>';
                html += '		<button class="upload-head-item upload-head-item-first next-bg" name="file-change"><i class="fa-file-o" style="margin-right: 4px;"></i>浏览文件</button>';
                html += '		<button class="upload-head-item upload-head-item-first ok-bg" name="file-upload" disabled><i class="fa-upload" style="margin-right: 4px;"></i>上传文件</button>';
                html += '		<div class="upload-head-item upload-head-item-last">';
                html += '			<div class="upload-head-msg error"></div>';
                html += '			<div class="upload-head-imagelabel"></div>';
                html += '		</div>';
                html += '	</div>';
                html += '	<div class="image-upload-main">';
                html += '		<div class="image-upload-tip">可将文件拖到此处</div>';
                html += '	</div>';
                if (opts.fileUploadDesc != null) {
                    html += '<div class="image-upload-foot">' + opts.fileUploadDesc + '</div>';
                }
                html += '</div>';
                $(self).after(html);

                // 获取BOX
                box = $(self).next(".image-upload-box");
                // 设置图片数量标签
                self.setImageNumberLabel();
                // 加载事件
                self.loadEvent();
            };

            /** 加载事件*/
            this.loadEvent = function () {
                // 【浏览文件1】
                box.find("button[name=file-change]").on("click", function () {
                    $(self).click();
                });
                // 【浏览文件2】
                $(self).on("change", function (e) {
                    // 获取文件集
                    self.getFiles(e);
                    // 清空临时数据
                    this.value = '';
                });

                // 【上传文件】
                box.find("[name=file-upload]").on("click", function () {
                    var folderName = $('.select-div').val();
                    if (folderName == '选择文件夹') {
                        $.jBox.tip("文件夹选择为空,请重新上传!");
                        return false;
                    }
                    var _this = $(this);
                    var data = self.getImageData();
                    // 上传图片之前
                    if (!opts.fileUploadBefore()) return;
                    var _tem = box.find(".image-upload-item");
                        $.ajax({
                            type: "POST",
                            url: "/houseLibrary/addHouseImageFold",
                            data: "hi_code="+hi_code+"&hif_name="+folderName,
                            contentType : "application/x-www-form-urlencoded; charset=utf-8",
                            beforeSend: function () {
                                _tem.find(".option-icon").removeClass("fa-exclamation-circle hint").addClass("fa-spinner animation-pulse next");
                                _tem.find(".option-button").attr("disabled", "disabled");
                                _tem.attr("disabled", "disabled");
                            }
                        }).done(function (result) {
                            if (result.code == 200) {
                                $.each(data, function (key, value) {
                                    if (value.url == null) {
                                        var _item = box.find(".image-upload-item[data-id=" + value.id + "]");
                                        var data = new FormData();
                                        data.append("file", value.file.uploadFile);
                                        data.append("type", opts.type);
                                        data.append("width", opts.fileResizeParam.width);
                                        data.append("quality", opts.fileResizeParam.quality);
                                        data.append("hi_code",hi_code);
                                        data.append("folderName",folderName);
                                        $.ajax({
                                            type: "POST",
                                            url: "/houseLibrary/houseImageUpload",
                                            data: data,
                                            async: false,
                                            dataType: "json",
                                            processData: false,
                                            contentType: false,
                                        }).done(function (result) {
                                            if (result.code != 200) {
                                                self.alert(result.msg);
                                                return;
                                            }
                                            _item.find(".option-icon").removeClass("fa-spinner animation-pulse next").addClass("fa-check-circle ok");
                                            // 文件上传回掉
                                            opts.fileUploadCallback.done(value, function (data) {
                                                value.itemData = data;
                                                self.setImageData(value);
                                            });
                                        }).fail(function (e) {
                                            $.jBox.tip('["' + value.name + '"] 文件上传失败，请重试或联系管理员');
                                            _item.find(".option-icon").removeClass("fa-spinner animation-pulse next").addClass("fa-exclamation-circle hint");
                                        }).always(function () {
                                            _item.find(".option-button").removeAttr("disabled");
                                            _this.removeAttr("disabled");
                                            // 显示隐藏上传按钮
                                            self.showAndHideUpload();
                                        });
                                    }
                                });
                            }
                        })
                });

                // 【获取拖动文件】
                $(document).on("dragenter dragover drop", function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                });

                // 【文件拖动】
                box.on({
                    dragover: function (e) {
                        e.stopPropagation();
                        e.preventDefault();
                        box.find(".image-upload-main").addClass("image-upload-main-hover");
                    },
                    dragleave: function (e) {
                        e.stopPropagation();
                        e.preventDefault();
                        box.find(".image-upload-main").removeClass("image-upload-main-hover");
                    },
                    drop: function (e) {
                        e.stopPropagation();
                        e.preventDefault();
                        box.find(".image-upload-main").removeClass("image-upload-main-hover");
                        self.getFiles(e, 'drag');
                    },
                });

                // 【删除图片】
                box.on("click", "[name=image-remove]", function () {
                    var _id = $(this).parents(".image-upload-item").attr("data-id");
                    self.removeImage(_id);
                });
            };

            /** 获取文件*/
            this.getFiles = function (e, mode) {
                // 模式
                if ('drag' == mode) {
                    self.funDragHover(e);
                }
                // 获取文件集
                var files = (e.target.files || e.originalEvent.dataTransfer.files);
                if (files == null) {
                    return;
                }
                // 判断文件数量
                if (self.getImageLength() + files.length > opts.fileLimitNumber) {
                    self.alertMsg("超出图片上传数量");
                    return;
                }
                // 遍历文件集
                $.each(files, function (index, file) {
                    // 判断文件大小
                    if (file.size > opts.fileLimitSize) {
                        self.alertMsg('"' + file.name + '"该文件超过限制大小，无法上传');
                        return;
                    }
                    // 文件数据
                    var fileData = {
                        id: returnNumber(new Date().getTime() + Math.random() * 10000),
                        name: file.name,
                        file: {
                            loaclFile: file,
                        }
                    };
                    // 处理文件
                    switch (opts.fileAccept) {
                        case "image":
                            // 设置显示BLOB
                            fileData.file.loaclBlob = (window.URL || window.webkitURL).createObjectURL(file);
                            // 显示文件
                            self.displayFile(fileData);
                            // 压缩图片
                            self.imageResize(fileData);
                            break;
                        default :
                            break;
                    }
                });
            };

            /** 获取文件相对URL*/
            // this.getFileRelativeUrl = function (url) {
            //     return url || url.replace(opts.fileDomain, "");
            // };

            /** 获取图片数量*/
            this.getImageLength = function () {
                return box.find(".image-upload-item").length;
            };

            /** 加载文件列表数据*/
            this.loadFileList = function (url, data) {
                if (data == null) {
                    return;
                }
                var file_type = url.substring(url.lastIndexOf(".") + 1, url.length);
                var file_name = url.substring(url.lastIndexOf("/") + 1, url.length);
                var fileData = {
                    id: returnNumber(new Date().getTime() + Math.random() * 10000),
                    name: file_name,
                    isLoaclFile: false,
                    url: url,
                    itemData: data,
                };
                // 显示文件
                self.displayFile(fileData);
                // 设置图片数量标签
                self.setImageNumberLabel();
                // 显示隐藏上传按钮
                self.showAndHideUpload();
                // 设置图片数据
                self.setImageData(fileData);
            };

            /** 设置图片数量标签*/
            this.setImageNumberLabel = function () {
                var _img_length = self.getImageLength();
                box.find(".upload-head-imagelabel").html(_img_length + "/" + opts.fileLimitNumber);
                if (_img_length <= 0) {
                    // 初始化
                    box.find(".image-upload-main").empty();
                    //
                    $('<div class="image-upload-tip">可将文件拖到此处</div>').hide().appendTo(box.find(".image-upload-main")).fadeIn();
                    // 隐藏文件上传按钮
                    box.find("[name=file-upload]").attr("disabled", "disabled");
                }
            };

            /** 删除图片*/
            this.removeImage = function (id) {
                if (id == null) {
                    return;
                }
                var _item = box.find(".image-upload-item[data-id=" + id + "]");
                var _data = self.getImageData()[returnNumber(id)];
                if (_data.url != null) {
                    self.removeFileConfirm(_item, function (v) {
                        if (_data.itemData == null) {
                            self.removeFile(_item, _data);
                        } else {
                            if (opts.fileDeleteCallback.isRealDelete) {
                                self.removeFile(_item, _data);
                            } else {
                                _item.hide("fast", function () {
                                    // 删除图片数据
                                    self.removeImageData(returnNumber($(this).attr("data-id")));
                                    // 删除图片
                                    this.remove();
                                    // 设置图片数量标签
                                    self.setImageNumberLabel();
                                    // 显示隐藏上传按钮
                                    self.showAndHideUpload();
                                });
                                // 回掉
                                opts.fileDeleteCallback.done(_data.itemData);
                            }
                        }
                    });
                } else {
                    _item.hide("fast", function () {
                        // 删除图片数据
                        self.removeImageData(returnNumber($(this).attr("data-id")));
                        // 删除图片
                        this.remove();
                        // 设置图片数量标签
                        self.setImageNumberLabel();
                        // 显示隐藏上传按钮
                        self.showAndHideUpload();
                    });
                }
            };

            /** 删除文件*/
            this.removeFile = function (_item, _data) {
                $.ajax({
                    type: "POST",
                    url: "/contractObject/deletAttachFile",
                    data: {
                        url: _data.url
                    },
                    dataType: "json",
                    beforeSend: function () {
                        _item.find(".option-icon").removeClass("fa-check-circle ok").addClass("fa-spinner animation-pulse next");
                        _item.find(".option-button").attr("disabled", "disabled");
                    }
                }).done(function (result) {
                    if (result.code != 200) {
                        $.jBox.tip(result.msg);
                        _item.find(".option-icon").removeClass("fa-spinner animation-pulse next").addClass("fa-check-circle ok");
                        _item.find(".option-button").removeAttr("disabled");
                        return;
                    }
                    _item.hide("fast", function () {
                        // 删除图片数据
                        self.removeImageData(returnNumber($(this).attr("data-id")));
                        // 删除图片
                        this.remove();
                        // 设置图片数量标签
                        self.setImageNumberLabel();
                    });
                    // 删除文件后回掉
                    opts.fileDeleteCallback.done(_data.itemData);
                }).fail(function (e) {
                    $.jBox.tip("文件删除失败，请重试或联系管理员");
                    _item.find(".option-icon").removeClass("fa-spinner animation-pulse next").addClass("fa-check-circle ok");
                    _item.find(".option-button").removeAttr("disabled");
                }).always(function () {
                    // 显示隐藏上传按钮
                    self.showAndHideUpload();
                });
            };

            /** 显示文件*/
            this.displayFile = function (data) {
                // 删除提示
                box.find(".image-upload-tip").remove();
                var _src = data.itemData == null ? data.file.loaclBlob : data.url;
                var _option_icon = '<i class="option-icon fa-exclamation-circle hint"></i>';
                if (data.itemData == null) {
                    _src = data.file.loaclBlob;
                } else {
                    // _src = data.url.indexOf(opts.fileDomain) > -1 ? data.url : opts.fileDomain + data.url;
                    _option_icon = '<i class="option-icon fa-check-circle ok"></i>';
                }

                // 显示文件
                var html = '';
                switch (opts.fileAccept) {
                    case "image":
                        html += '<div class="image-upload-item" data-id="' + data.id + '">';
                        html += '	<img class="upload-item-img" src="' + _src + '" alt="' + data.name + '">';
                        html += '	<div class="upload-item-option">' + _option_icon;
//						html += '		<i class="option-icon fa-check-circle ok"></i>'; // 已上传
//						html += '		<i class="option-icon fa-spinner animation-pulse next"></i>'; // 上传中
//						html += '		<i class="option-icon fa-exclamation-circle hint"></i>'; // 未上传
                        html += '		<div class="option-title" title="' + data.name + '">' + data.name + '</div>';
                        html += '		<button class="option-button fa-trash error-bg" name="image-remove"></button>';
                        html += '	</div>';
                        html += '	<div class="upload-item-mask">';
                        html += '		<div class="item-mask-title">确定删除该文件么？</div>';
                        html += '		<div class="item-mask-option">';
                        html += '			<button class="next-bg" name="delete-confirm">确定</button>';
                        html += '			<button class="error-bg" name="delete-cancel">取消</button>';
                        html += '		</div>';
                        html += '	</div>';
                        html += '</div>';
                        break;
                    default :
                        break;
                }
                box.find(".image-upload-main").append(html);
            };

            /** 显示隐藏上传按钮*/
            this.showAndHideUpload = function () {
                var data = self.getImageData();
                if (data == null) {
                    box.find("[name=file-upload]").attr("disabled", "disabled");
                } else {
                    var boo = true;
                    $.each(data, function (key, value) {
                        if (value.url == null) {
                            // 显示文件上传按钮
                            box.find("[name=file-upload]").removeAttr("disabled");
                            return boo = false;
                        }
                    });
                    if (boo) {
                        box.find("[name=file-upload]").attr("disabled", "disabled");
                    }
                }
            };

            /** 设置文件数据*/
            this.setImageData = function (param) {
                var data = $(self).data("data");
                var currtentData = {};
                currtentData[param.id] = param;
                data = $.extend({}, data, currtentData);
                $(self).data("data", data);
            };

            /** 获取文件数据*/
            this.getImageData = function () {
                return $(self).data("data");
            };

            /** 获取文件数据*/
            this.getUploadImageData = function () {
                var data = self.getImageData();
                if (data == null) {
                    return null;
                }

                var upload_image = null;
                $.each(data, function (key, item) {
                    if (item.url != null) {
                        var current_data = {};
                        current_data[key] = item;
                        upload_image = $.extend({}, current_data);
                    }
                });
                return upload_image;
            };

            /** 移除图片数据*/
            this.removeImageData = function (id) {
                var data = $(self).data("data");
                if (data != null) {
                    delete data[id];
                }
                $(self).data("data", data);
            };

            /** 移除文件确定*/
            this.removeFileConfirm = function (item, callback) {
                item.find(".upload-item-mask").fadeIn();
                item.find("[name=delete-confirm]").on("click", function () {
                    self.removeFileConfirmClose(item);
                    callback();
                });
                item.find("[name=delete-cancel]").on("click", function () {
                    self.removeFileConfirmClose(item);
                });
            };

            /** 移除文件取消*/
            this.removeFileConfirmClose = function (item) {
                item.find(".upload-item-mask").fadeOut();
                item.find("[name=delete-confirm]").off("click");
                item.find("[name=delete-cancel]").off("click");
            };

            /** 压缩文件*/
            this.imageResize = function (fileData) {
                var img = new Image();
                img.src = fileData.file.loaclBlob;
                img.onload = function () {
                    var that = this;

                    // 生成比例
                    var w = that.width, h = that.height, scale = w / h;
                    w = opts.fileResizeParam.width == null ? w : (opts.fileResizeParam.width > that.width ? w : opts.fileResizeParam.width);
                    h = w / scale;

                    // 生成canvas
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext('2d');
                    $(canvas).attr({width: w, height: h});
                    ctx.drawImage(that, 0, 0, w, h);

                    /** 生成base64 兼容修复移动设备需要引入mobileBUGFix.js */
                    var base64 = canvas.toDataURL('image/jpeg', opts.fileResizeParam.quality || 0.8);

                    // 修复IOS
                    if (navigator.userAgent.match(/iphone/i)) {
                        var mpImg = new MegaPixImage(img);
                        mpImg.render(canvas, {
                            maxWidth: w,
                            maxHeight: h,
                            quality: opts.fileResizeParam.quality || 0.8
                        });
                        base64 = canvas.toDataURL('image/jpeg', opts.fileResizeParam.quality || 0.8);
                    }

                    // 修复Android
                    if (navigator.userAgent.match(/Android/i)) {
                        var encoder = new JPEGEncoder();
                        base64 = encoder.encode(ctx.getImageData(0, 0, w, h), opts.fileResizeParam.quality * 100 || 80);
                    }

                    var uploadFile = base64ToBlob(base64);
                    uploadFile.name = fileData.name;

                    // 生成结果
                    fileData.file = $.extend({}, fileData.file, {uploadFile: uploadFile, base64: base64});

                    // 设置图片数量标签
                    self.setImageNumberLabel();
                    // 设置图片数据
                    self.setImageData(fileData);
                    // 显示隐藏上传按钮
                    self.showAndHideUpload();
                };
            };

            /** 取消文件拖动浏览器默认事件*/
            this.funDragHover = function (e) {
                e.stopPropagation();
                e.preventDefault();
                return this;
            };

            /** 弹出消息*/
            this.alertMsg = function (msg, close) {
                box.find(".upload-head-msg").html('<i class="fa-warning" style="margin-right: 4px;"></i>' + msg);
                setTimeout(function () {
                    self.alertMsgClose();
                }, 2000);
            };

            /** 关闭弹出消息*/
            this.alertMsgClose = function () {
                box.find(".upload-head-msg").empty();
            };

            /** 文件大小（带单位）*/
            this.fileSize = function (file) {
                var _size = file.size;
                if (_size / 1024 < 1) {
                    _size = _size + " B";
                } else if (_size / 1024 / 1024 < 1) {
                    _size = returnFloat(_size / 1024) + " KB";
                } else {
                    _size = returnFloat(_size / 1024 / 1024) + " MB";
                }
                return _size;
            };

            /** 执行*/
            this.init();
        })[0];
    };

    $.fn.resizeIMG_XHR = function (url) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'blob';
        xhr.onload = function () {
            if (this.status == 200) {
                blob = this.response;
                var read = new FileReader()
                read.readAsDataURL(blob)
                read.onload = function () {
                    console.log(this.result);
                    $("body").append("<img src=" + base64 + ">");
                }
            }
        };
        xhr.send();
    };

    /** 压缩图片*/
    $.fn.resizeIMG = function (url) {
        var img = new Image();
        img.src = url;
        img.crossOrigin = '*';
        img.onload = function () {
            var that = this;

            // 生成比例
            var w = that.width, h = that.height, scale = w / h;
            w = obj.width == null ? w : (obj.width > that.width ? w : obj.width);
            h = w / scale;

            // 生成canvas
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            $(canvas).attr({
                width: w,
                height: h
            });
            ctx.drawImage(that, 0, 0, w, h);

            /**
             * 生成base64 兼容修复移动设备需要引入mobileBUGFix.js
             */
            var base64 = canvas.toDataURL('image/jpeg', obj.quality || 0.8);
            var blob = base64ToBlob(base64);
            blob.name = new Date().getTime() + ".png";

            // 修复IOS
            if (navigator.userAgent.match(/iphone/i)) {
                var mpImg = new MegaPixImage(img);
                mpImg.render(canvas, {
                    maxWidth: w,
                    maxHeight: h,
                    quality: obj.quality || 0.8
                });
                base64 = canvas.toDataURL('image/jpeg', obj.quality || 0.8);
            }

            // 修复android
            if (navigator.userAgent.match(/Android/i)) {
                var encoder = new JPEGEncoder();
                base64 = encoder.encode(ctx.getImageData(0, 0, w, h), obj.quality * 100 || 80);
            }

            $("body").append("<img src=" + base64 + ">");

//			// 生成结果
//			var result = {
//				base64 : base64,
//				clearBase64 : base64.substr(base64.indexOf(',') + 1),
//				blob : blob
//			};
//
//			// 执行后函数
//			obj.success(result);
        };
    };

    /**
     * 获得base64
     *
     * @param {Object}
     *            obj
     * @param {Number}
     *            [obj.width] 图片需要压缩的宽度，高度会跟随调整
     * @param {Number}
     *            [obj.quality=0.8] 压缩质量，不压缩为1
     * @param {Function}
     *            [obj.before(this, blob, file)] 处理前函数,this指向的是input:file
     * @param {Function}
     *            obj.success(obj) 处理后函数
     * @example
     *
     */
    $.fn.localResizeIMG = function (obj) {
        this.on('change', function () {
            for (var i = 0; i < this.files.length; i++) {
                var file = this.files[i];
                var URL = window.URL || window.webkitURL;
                var blob = URL.createObjectURL(file);

                // 执行前函数
                if ($.isFunction(obj.before)) {
                    obj.before(this, blob, file)
                }
                ;
                _create(blob, file);
            }
            this.value = ''; // 清空临时数据
        });

        /**
         * 生成base64
         *
         * @param blob 通过file获得的二进制
         */
        function _create(blob) {
            var img = new Image();
            img.src = blob;
            img.onload = function () {
                var that = this;

                // 生成比例
                var w = that.width, h = that.height, scale = w / h;
                w = obj.width == null ? w : (obj.width > that.width ? w : obj.width);
                h = w / scale;

                // 生成canvas
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                $(canvas).attr({
                    width: w,
                    height: h
                });
                ctx.drawImage(that, 0, 0, w, h);

                /**
                 * 生成base64 兼容修复移动设备需要引入mobileBUGFix.js
                 */
                var base64 = canvas.toDataURL('image/jpeg', obj.quality || 0.8);
                var blob = base64ToBlob(base64);
                blob.name = new Date().getTime() + ".png";

                // 修复IOS
                if (navigator.userAgent.match(/iphone/i)) {
                    var mpImg = new MegaPixImage(img);
                    mpImg.render(canvas, {
                        maxWidth: w,
                        maxHeight: h,
                        quality: obj.quality || 0.8
                    });
                    base64 = canvas.toDataURL('image/jpeg', obj.quality || 0.8);
                }

                // 修复android
                if (navigator.userAgent.match(/Android/i)) {
                    var encoder = new JPEGEncoder();
                    base64 = encoder.encode(ctx.getImageData(0, 0, w, h), obj.quality * 100 || 80);
                }

                // 生成结果
                var result = {
                    base64: base64,
                    clearBase64: base64.substr(base64.indexOf(',') + 1),
                    blob: blob
                };

                // 执行后函数
                obj.success(result);
            };
        }
    };
})(jQuery);

// 实例
//$('input:file').localResizeIMG({
//	width : 1440,
//	success : function(result) {
//		var img = new Image();
//		img.src = result.base64;
//		$('body').append(img);
//		console.log(result);
//	}
//});

/** base64转Blob */
function base64ToBlob(base64Data) {
    var byteString;
    if (base64Data.split(',')[0].indexOf('base64') >= 0) {
        byteString = atob(base64Data.split(',')[1]);
    } else {
        byteString = unescape(base64Data.split(',')[1]);
    }
    var mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type: mimeString});
}

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
}

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

/**
 * 文件接受类型[accept]
 *
 * 后缀名        MIME名称
 * .dwg         image/vnd.dwg
 * .dxf        image/vnd.dxf
 * .gif         image/gif
 * .tif         image/tiff
 * .tiff        image/tiff
 * .jp2         image/jp2
 * .jpe        image/jpeg
 * .jpeg        image/jpeg
 * .jpg         image/jpeg
 * .png            image/png
 * .svf         image/vnd.svf
 * .css         text/css
 * .csv         text/csv
 * .htm            text/html
 * .html        text/html
 * .js        text/javascript,application/javascript
 * .txt         text/plain
 * .xml            text/xml,application/xml
 * .3gpp        audio/3gpp,video/3gpp
 * .ac3            audio/ac3
 * .au          audio/basic
 * .mp2            audio/mpeg,video/mpeg
 * .mp3            audio/mpeg
 * .mp4            audio/mp4,video/mp4
 * .mpeg        video/mpeg
 * .mpg            video/mpeg
 * .asf            allpication/vnd.ms-asf
 * .doc         application/msword
 * .dot         application/msword
 * .dtd         application/xml-dtd
 * .json        application/json
 * .mpp            application/vnd.ms-project
 * .ogg            application/ogg, audio/ogg
 * .pdf            application/pdf
 * .pot            application/vnd.ms-powerpoint
 * .pps            application/vnd.ms-powerpoint
 * .ppt            application/vnd.ms-powerpoint
 * .rtf         application/rtf, text/rtf
 * .wdb            application/vnd.ms-works
 * .wps            application/vnd.ms-works
 * .xhtml        application/xhtml+xml
 * .xlc        application/vnd.ms-excel
 * .xlm            application/vnd.ms-excel
 * .xls         application/vnd.ms-excel
 * .xlt        application/vnd.ms-excel
 * .xlw        application/vnd.ms-excel
 * .zip         aplication/zip
 * .xlsx        application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
 **/