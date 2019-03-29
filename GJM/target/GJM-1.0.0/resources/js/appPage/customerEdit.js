$(function () {
    $.customer();
});

(function (window, $) {

    /** 初始化*/
    $.customer = function () {
        $.customer.load_data();
        $.customer.load_event();
    };

    /** 参数*/
    $.customer.param = {
        phoneType: {
            1: "常用",
            2: "备用"
        },
        cardType: {
            1: "身份证",
            2: "军官证",
            3: "商户号",
            4: "护照",
            5: "港澳台证件",
            6: "驾照"
        },
        sexType: {
            0: "女",
            1: "男"
        }
    };

    /** 加载数据*/
    $.customer.load_data = function () {
        // 加载手机号码类型
        $.customer.load_phoneType();
        // 加载手机号码类型
        $.customer.load_cardType();
        // 加载手机号码类型
        $.customer.load_sexType();

        $.ajax({
            url: "/appPage/queryCustomer",
            data: {
                cc_code: getUrlParam("cc_code")
            },
            dataType: "json"
        }).done(function (result) {
            if (result.code !== 200) return;
            var customer = result.data.customer;
            var customerPhones = result.data.customerPhones || "";
            var customerImages = result.data.customerImages || "";
            var customerBanks = result.data.customerBanks || "";

            // 赋值参数
            $.customer.param.cc_id = customer.cc_id;

            $("[name=customerName]").val(returnValue(customer.cc_name)).attr("disabled", "disabled");
            if (!isEmpty(customer.cc_cardType)) $("[name=customerCardType]").val(returnValue(customer.cc_cardType)).attr("disabled", "disabled");
            if (!isEmpty(customer.cc_cardNum)) $("[name=customerCard]").val(returnValue(customer.cc_cardNum)).attr("disabled", "disabled");
            $("[name=customerAddress]").val(returnValue(customer.cc_address));

            // 遍历客户电话
            $.each(customerPhones, function (index, data) {
                var type = $("[name=customerPhoneType]").eq(index);
                var phone = $("[name=customerPhone]").eq(index);
                if (data.ccp_state == 1) {
                    type.attr("disabled", "disabled");
                    phone.attr("disabled", "disabled");
                }
                if (type.length > 0) {
                    type.val(data.ccp_state);
                    phone.val(returnValue(data.ccp_phone));
                } else {
                    $.customer.addPhone();

                    $("[name=customerPhoneType]:eq(" + index + ")").val(data.ccp_state);
                    $("[name=customerPhone]:eq(" + index + ")").val(returnValue(data.ccp_phone));
                }
            });

            // 遍历客户照片
            $.each(customerImages, function (index, data) {
                var box;
                switch (data.cci_type) {
                    case "CD1":
                        box = $("[name=customerCardPhoneA]");
                        $.appImageUpload.addImage(box, {
                            id: data.cci_id,
                            type: data.cci_type,
                            blob: data.img_path,
                            path: data.img_path,
                            key: data.cci_path
                        });
                        if (box.find(".image-box-item").length > 0) {
                            box.find(".item-upload-head").hide();
                            box.find(".item-upload-footer").hide();
                        }
                        break;
                    case "CD2":
                        box = $("[name=customerCardPhoneB]");
                        $.appImageUpload.addImage(box, {
                            id: data.cci_id,
                            type: data.cci_type,
                            blob: data.img_path,
                            path: data.img_path,
                            key: data.cci_path
                        });
                        if (box.find(".image-box-item").length > 0) {
                            box.find(".item-upload-head").hide();
                            box.find(".item-upload-footer").hide();
                        }
                        break;
                }
            });

            // 遍历客户银行卡
            $.each(customerBanks, function (index, data) {
                $.customer.addBankList(data);
            });
        });
    };

    /** 加载事件*/
    $.customer.load_event = function () {
        $("[name=customerMoreBtn]").on("click", function () {
            var box = $("#customer-more-box");
            if (box.is(":hidden")) {
                box.show("fast");
                $(this).find("i").removeClass("fa-angle-down").addClass("fa-angle-up").parents(".content-item").css({
                    borderBottom: "1px solid #f1f1f1"
                });
            } else {
                box.hide("fast");
                $(this).find("i").removeClass("fa-angle-up").addClass("fa-angle-down").parents(".content-item").css({
                    borderBottom: "none"
                });
            }
        });

        // 手机验证 TODO 请测试完了再提交上来 From-蒋庆涛
//		$("[name='customerPhone']").on("keyup", function(){
//			if($(this).val().length == 11){
//				$.ajax({
//					type : "POST",
//					url : "/customer/customerControllerBool",
//					data : {
//						ccp_phone: $(this).val()
//					},
//					dataType : "json",
//					error : function(e){
//						alert("网络异常，请刷新重试");
//					},
//					success : function(result){
//						if(result.customer != null){
//							$.customer.load_data(result.customer.cc_code);
//						}
//					}
//				});
//			}
//		});

        // 身份证 TODO 请测试完了再提交上来 From-蒋庆涛
//		$("[name='customerCard']").on("keyup", function(){
//			if($(this).val().length == 15  || $(this).val().length == 18){
//				$.ajax({
//					type : "POST",
//					url : "/customer/customerControllerBool",
//					data : {
//						cc_cardNum: $(this).val()
//					},
//					dataType : "json",
//					error : function(e){
//						alert("网络异常，请刷新重试");
//					},
//					success : function(result){
//						if(result.customer != null){
//							$.customer.load_data(result.customer.cc_code);
//						}
//					}
//				});
//			}
//		});

        // 添加客户信息
        $("[name=phone-add]").on("click", function () {
            $.customer.addPhone();
        });

        // 添加银行卡
        $("[name=add-bank]").on("click", function () {
            $.customer.editBank();
        });

        // 图片-证件正面
        $.appImageUpload({
            id: "[name=customerCardPhoneA]",
            box: "[name=customerCardPhoneA]",
            limit: 1,
            type: "CD1",
            done: $.customer.uploadDone
        });

        // 图片-证件背面
        $.appImageUpload({
            id: "[name=customerCardPhoneB]",
            box: "[name=customerCardPhoneB]",
            limit: 1,
            type: "CD2",
            done: $.customer.uploadDone
        });

        // 查询客户信息
        $("[name=customerCard]").on({
            "input propertychange": function () {
                var _val = $(this).val();
                if ($("[name=customerCardType]").val() == "1" && !isEmpty(_val)) {
                    $.ajax({
                        type: "POST",
                        url: "/dictionary/queryDistrictDictionary",
                        data: {
                            idCardNum: _val
                        },
                        dataType: "json",
                    }).done(function (result) {
                        if (result.code != 200) {
                            $("#cardPlace").html(result.msg);
                        } else {
                            $("#cardPlace").html(result.district_address);
                        }
                    });
                }
            }
        });

    };

    /**
     * 上传完成
     *
     * @param mode
     * @param opts
     * @param fileData
     */
    $.customer.uploadDone = function (mode, opts, fileData) {
        var type = "customer";
        $(opts.box).find(".item-upload-head").hide();
        $(opts.box).find(".item-upload-footer").hide();

        if (mode == "add") {
            var data = new FormData();
            data.append("file", fileData.uploadFile);
            data.append("type", type);
            data.append("width", opts.fileZoom.width);
            data.append("quality", opts.fileZoom.quality);
            $.ajax({
                type: "POST",
                url: "/appPage/uploadFile",
                data: data,
                dataType: "json",
                processData: false,
                contentType: false,
            }).done(function (result) {
                if (result.code != 200) {
                    alert(result.msg);
                    return;
                }
                fileData.path = result.data.url;
                fileData.key = result.data.key;
                $("[data-name=" + fileData.name + "]").data("data", fileData);
            });
        }
        if (mode == "remove") {
            $(opts.box).find(".item-upload-head").show();
            $(opts.box).find(".item-upload-footer").show();

            $.ajax({
                type: "POST",
                url: "/appPage/deleteFile",
                data: {
                    type: type,
                    file: fileData.key,
                    id: fileData.id
                },
                dataType: "json"
            });
        }
    };

    /**
     * 添加银行卡
     *
     * @param _target
     */
    $.customer.editBank = function (_target) {
        _target = $(_target);
        _data = _target.length > 0 ? (_target.data("data") || "") : "";

        var title = '<i class="fa-credit-card" style="margin-right: 6px;"></i>添加银行卡';
        var content = '';
        content += '<div class="content">';
        content += '    <div class="content-item">';
        content += '        <input type="hidden" name="bank-id" value="' + returnValue(_data.cbc_id) + '">';
        content += '        <div class="item-content"><input class="form-control" name="bank-card" placeholder="银行卡号" value="' + returnValue(_data.cbc_cardNum) + '" style="font-weight: bold;" required><div class="bank-tip"></div></div>';
        content += '        <div class="item-content">';
        content += '            <input class="form-control" name="bank-user-name" placeholder="开户名" value="' + returnValue(_data.cbc_name) + '" style="flex: initial;width: 120px;margin-right: 10px;" required>';
        content += '            <input class="form-control" name="bank-address" placeholder="开户网点" value="' + returnValue(_data.cbc_address) + '" required>';
        content += '        </div>';
        content += '        <div class="item-content">';
        content += '            <div class="item-upload" name="add-bank-image" style="margin-right: 0;height: 160px;">';
        content += '               <div class="item-upload-head" style="padding-top: 12%"><i class="fa-camera"></i></div>';
        content += '               <div class="item-upload-footer">添加银行卡照片</div>';
        content += '            </div>';
        content += '        </div>';
        content += '        <div class="item-content" style="padding-bottom: 0;"><button class="form-control next-bg" name="saveBank">保存</button></div>';
        content += '    </div>';
        content += '</div>';
        $.hint.pullup(title, content, function (box) {

            // 图片-银行卡
            $("input[type=file][id^=BK]").off().remove();
            $.appImageUpload({
                id: "[name=add-bank-image]",
                box: "[name=add-bank-image]",
                limit: 1,
                type: "BK",
                done: $.customer.uploadDone
            });

            // 初始化数据
            if (_target.length > 0) {
                // 获取LOGO
                $.customer.getBankLogo(box.find("[name=bank-card]"), box);

                box.find(".item-upload-head").hide();
                box.find(".item-upload-footer").hide();

                // 加载银行卡照片
                $.appImageUpload.addImage($("[name=add-bank-image]"), {
                    id: _data.cci_id,
                    type: "BK",
                    blob: _data.img_path,
                    path: _data.img_path,
                    key: _data.cbc_path
                });
            }

            // 格式化银行卡账号
            box.find("[name=bank-card]").bankInput();

            // 检查银行卡信息
            box.find("[name=bank-card]").on("input propertychange", function () {
                $.customer.getBankLogo(this, box);
            });

            // 【保存银行卡】
            box.find("[name=saveBank]").on("click", function () {
                var bankImage = box.find("[name=add-bank-image]").find(".image-box-item").data("data") || "";
                var cbc_cardNum = box.find("[name=bank-card]").val();
                var boo = true;
                box.find(":required").each(function () {
                    if (isEmpty($(this).val())) {
                        $(this).appMsg("请填写" + $(this).attr("placeholder"));
                        return boo = false;
                    }
                });
                if (!boo) return;

                if (isEmpty(bankImage.path)) {
                    box.find("[name=add-bank-image]").appMsg("请上传银行卡照片");
                    return;
                }

                var customerBank = {};
                customerBank.cbc_id = box.find("[name=bank-id]").val();
                customerBank.cbc_name = box.find("[name=bank-user-name]").val();
                customerBank.cbc_cardNum = cbc_cardNum.NoSpace();
                customerBank.cbc_type = box.find("[name=bank-card]").attr("data-type");
                customerBank.cbc_bankName = box.find("[name=bank-card]").attr("data-name");
                customerBank.cbc_address = box.find("[name=bank-address]").val();
                customerBank.cbc_path = bankImage.key;
                customerBank.cbc_state = $(".bank-list").length == 0 ? 0 : 1;

                // 添加至列表
                $.customer.addBankList(customerBank, _target);

                $.hint.close();
            });
        });
    };

    /**
     * 添加银行卡至列表
     *
     * @param customerBank
     * @param _target
     */
    $.customer.addBankList = function (customerBank, _target) {
        _target = _target || "";
        if (_target.length == 0) {
            var list_index = "bank" + new Date().getTime();

            // 初始化数据
            var html =
                '<div class="bank-list" id="' + list_index + '">' +
                '   <div class="bank-list-item" style="flex:1;flex-direction: column">' +
                '       <div>' + returnValue(customerBank.cbc_bankName) + " - " + returnValue(customerBank.cbc_type) + '</div>' +
                '       <div>' + returnValue(customerBank.cbc_cardNum).insert(" ") + " - " + returnValue(customerBank.cbc_name) + '</div>' +
                '   </div>' +
                '   <div class="bank-list-item">' +
                '       <button name="bank-order" style="color: #FFFFFF;' + ($(".bank-list").length == 0 ? 'display:none;' : '') + '">默认</button>' +
                '       <button name="bank-remove" style="color: #FFFFFF">删除</button>' +
                '   </div>' +
                '</div>';
            _target = $(html).appendTo("#bank-box");

            // 【银行卡编辑】
            _target.on("click", function () {
                $.customer.editBank(this);
            });

            // 【银行卡排序】
            _target.on("click", "[name=bank-order]", function () {
                var _bank_list = $(".bank-list");
                _bank_list.css({"order": "2"});
                _bank_list.find("[name=bank-order]").show();
                _bank_list.each(function () {
                    $(this).data("data").cbc_state = 1;
                });

                var parent = $(this).parents(".bank-list");
                parent.css({"order": "0"});
                parent.data("data").cbc_state = 0;

                $(this).hide();
                return false;
            });

            // 【银行卡删除】
            _target.on("click", "[name=bank-remove]", function () {
                $(this).parents(".bank-list").hide("fast", function () {
                    this.remove();
                    var otherList = $(".bank-list");
                    if (otherList.length == 1) {
                        otherList.find("[name=bank-order]").hide();
                        otherList.data("data").cbc_state = 0;
                    }
                });
                return false;
            });
        } else {
            // 初始化数据
            _target.find(".bank-list-item:eq(0)").html(
                '       <div>' + returnValue(customerBank.cbc_bankName) + " - " + returnValue(customerBank.cbc_type) + '</div>' +
                '       <div>' + returnValue(customerBank.cbc_cardNum).insert(" ") + " - " + returnValue(customerBank.cbc_name) + '</div>');
        }
        // 设置数据
        _target.data("data", customerBank);
    };

    /**
     * 获取银行卡LOGO
     *
     * @param _this
     * @param box
     */
    $.customer.getBankLogo = function (_this, box) {
        _this = $(_this);
        var bankCode = (_this.val() || "").NoSpace();
        if (bankCode.length < 2) {
            box.find(".bank-tip").empty();
            return;
        }
        $.ajax({
            type: "POST",
            url: "/bank/bankMessage",
            data: {
                bankCode: bankCode,
            },
            dataType: "json",
        }).done(function (result) {
            var bank = result.bank || "";
            box.find(".bank-tip").html(returnValue(bank.bank_Name) + (isEmpty(bank.bank_Name) ? "" : " - ") + returnValue(bank.bank_CardType));
            _this.attr({
                "data-name": bank.bank_Name,
                "data-type": bank.bank_CardType
            })
        });
    };

    /**
     * 添加手机号码
     */
    $.customer.addPhone = function () {
        var parent = $("[name=phone-add]").parents(".content-item");
        var html = '';
        html += '<div class="item-content">';
        html += '	<label class="change-angle" style="flex: initial;margin-right: 10px;">';
        html += '		<select class="form-control" name="customerPhoneType" style="width: auto;">';
        $.each($.customer.param.phoneType, function (key, name) {
            html += '		<option value="' + key + '" ' + (name == "备用" ? "selected" : "") + '>' + name + '</option>';
        });
        html += '		</select>';
        html += '	</label>';
        html += '	<input type="text" class="form-control" name="customerPhone" max="11" placeholder="手机号码" style="flex:3" required>';
        html += '	<button class="form-control error" name="remove" style="width: 36px;padding-left: 8px;"><i class="fa-minus-circle" style="font-size: 22px;"></i></button>';
        html += '</div>';
        $(html).appendTo(parent)
        .find("[name=remove]").on("click", function () {
            $(this).parents(".item-content").remove();
        });
    };

    /** 加载手机号码类型*/
    $.customer.load_phoneType = function () {
        $.each($.customer.param.phoneType, function (key, name) {
            $("[name=customerPhoneType]").append('<option value="' + key + '">' + name + '</option>');
        });

        // 绑定号码改变事件
        $(document).on("change", "[name=customerPhoneType]", function () {
            if (this.value == 1) {
                $("[name=customerPhoneType]").not($(this)).each(function () {
                    $(this).val(2);
                });
            }
        });
    };

    /** 加载证件类型*/
    $.customer.load_cardType = function () {
        $.each($.customer.param.cardType, function (key, name) {
            $("[name=customerCardType]").append('<option value="' + key + '">' + name + '</option>');
        });

        // 绑定证件改变事件
        $(document).on("change", "[name=customerCardType]", function () {
            if (this.value == 1 || this.value == 3) {
                $(".customer-sex-box").hide();
            } else {
                $(".customer-sex-box").fadeIn();
            }
        });
    };

    /** 加载证件类型*/
    $.customer.load_sexType = function () {
        $.each($.customer.param.sexType, function (key, data) {
            $("[name=customerSexType]").append('<option value="' + key + '">' + data + '</option>');
        });
    };

    /** 客户保存*/
    $.customer.save = function () {
        var data = {};

        var boo = true;
        // 遍历数据判断为空
        $(".form-control[required]:visible").each(function () {
            if (isEmpty(this.value)) {
                $(this).appMsg(returnValue(this.placeholder) + "不能为空");
                return boo = false;
            }
        });

        if (!boo) return;

        // 客户电话号码
        var phoneState = 0;
        var customerPhones = [];
        $("[name=customerPhone]").each(function () {
            var customerPhone = {};
            customerPhone.ccp_phone = $(this).val();
            if (!isPhone(customerPhone.ccp_phone)) {
                $(this).appMsg("该电话号码格式错误");
                return boo = false;
            }
            customerPhone.ccp_state = returnNumber($(this).parent().find("[name=customerPhoneType]").val());
            if (customerPhone.ccp_state == 1) {
                phoneState++;
            }
            customerPhones.push(customerPhone);
        });
        if (phoneState > 1) return $.hint.tip("只能有一个常用手机号码", "hint");
        if (phoneState == 0) return $.hint.tip("请选择一个常用手机号码", "hint");
        data.customerPhones = JSON.stringify(customerPhones);

        if (!boo) return;

        // 客户数据
        var customer = {};
        customer.cc_id = $.customer.param.cc_id;
        customer.cc_name = $("[name=customerName]").val();
        customer.cc_cardType = $("[name=customerCardType]").val();
        customer.cc_cardNum = $("[name=customerCard]").val();
        customer.cc_address = $("[name=customerAddress]").val();
        if (customer.cc_cardType == 1 && !isIDCard(customer.cc_cardNum)) {
            $("[name=customerCard]").appMsg("证件号码有误，请正确填写");
            return;
        }
        var cc_sex = $("[name=customerSexType]").val();
        switch (returnNumber(customer.cc_cardType)) {
            case 1:
                cc_sex = returnNumber(customer.cc_cardNum.substring(16, 17)) % 2;
                break;
            case 3:
                cc_sex = 3;
                break;
        }
        customer.cc_sex = cc_sex;

        // 客户证件图片
        var customerImages = [];
        var ca = $("[name=customerCardPhoneA]");
        var ca_item = ca.find(".image-box-item");

        var cb = $("[name=customerCardPhoneB]");
        var cb_item = cb.find(".image-box-item");

        if (ca_item.length < 1) {
            ca.appMsg("请上传证件正面照");
            return;
        }
        if (cb_item.length < 1) {
            cb.appMsg("请上传证件背面照");
            return;
        }

        var ca_img = ca_item.data("data").key;
        var cb_img = cb_item.data("data").key;
        if (isEmpty(ca_img) || isEmpty(cb_img)) {
            $.hint.tip('图片保存中..', 'loading');
            var ca_index = setInterval(function () {
                if (!isEmpty(ca_img) || !isEmpty(cb_img)) {
                    clearInterval(ca_index);
                    $.customer.save();
                }
            }, 1000);
            return;
        }
        customerImages.push({cci_type: "CD1", cci_path: ca_img});
        customerImages.push({cci_type: "CD2", cci_path: cb_img});

        // 银行卡
        var customerBanks = [];
        var bankList = $(".bank-list");
        // if (bankList.length == 0) return $.hint.tip("请添加银行卡");
        bankList.each(function () {
            customerBanks.push($(this).data("data"));
        });

        data.customer = JSON.stringify(customer);
        data.customerImages = JSON.stringify(customerImages);
        data.customerBanks = JSON.stringify(customerBanks);
        // return;

        $.ajax({
            type: "POST",
            url: "/appPage/customerSave",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $.hint.tip('数据保存中..', 'loading');
                $("[name=cusSave]").attr("disabled", "disabled");
            }
        }).done(function (result) {
            if (result.code !== 200) return $.hint.tip(result.msg, "error");
            // 返回上一级
            var _data = result.data;
            $.hint.tip("保存成功", "success", 2000, function () {
                var arry = {};
                arry.cc_code = _data.cc_code;
                arry.cc_name = _data.cc_name;
                arry.cc_cardNum = _data.cc_cardNum;
                arry.ccp_phone = _data.ccp_phone;
                arry.type = "customer";
                if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                    window.webkit.messageHandlers.goBackWhere.postMessage([JSON.stringify(arry)]);
                } else if (/(Android)/i.test(navigator.userAgent)) {
                    webview.goBackWhere(JSON.stringify(arry));
                }
            });
        }).fail(function () {
            $.hint.tip('数据提交失败，请重试或联系管理员', 'error');
        }).always(function () {
            $("[name=cusSave]").removeAttr("disabled");
        });
    };

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
                        });
                    }
                } else {
                    // 搜索框为空时，移除定时器
                    clearTimeout(outTime);
                    _close.fadeOut().off("click");
                    $.search.remove_search_data();
                }
            },
        });

        // 编辑客户
        $("#search-data").on("click", "[name=customer-edit]", function (e) {
            e.stopPropagation();
            alert("编辑客户");
        });

        // 选中客户
        $("#search-data").on("click", ".customer-item", function () {
            alert("选中客户" + $(this).data("data"));
        });
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
            url: "/appPage/customerSearch/queryCustomerPageList",
            data: {
                pageNo: $.search.param.pageNo,
                pageSize: $.search.param.pageSize,
                cc_name: param,
                ccp_phone: param,
                cc_cardNum: param,
            },
            dataType: "json",
            beforeSend: function () {
                if (mode != "update") {
                    $("#search-data").html('<div style="text-align: center;line-height: 40px;">搜索中...</div>');
                }
            }
        }).done(function (result) {
            if (result.code != 200) {
                return;
            }

            if (mode != "update") {
                $("#search-data").empty();
            }
            $.each(result.data.list, function (index, data) {
                var phone = isEmpty(data.ccp_phone) ? '<label class="error">无手机号</label>' : returnValue(data.ccp_phone);
                var cardNumber = isEmpty(data.cc_cardNum) ? '<label class="error">无身份证</label>' : returnValue(data.cc_cardNum);
                var cardImage = "";
                if (!isEmpty(data.customerImages)) {
                    $.each(data.customerImages, function (index, data) {
                        if (data.cci_type == "CD1") {
                            cardImage = data.cci_path;
                        }
                        if (!isEmpty(cardImage)) {
                            return false;
                        }
                    });
                    if (isEmpty(cardImage)) {
                        $.each(data.customerImages, function (index, data) {
                            if (data.cci_type == "CD2") {
                                cardImage = data.cci_path;
                            }
                            if (!isEmpty(cardImage)) {
                                return false;
                            }
                        });
                    }
                    if (isEmpty(cardImage)) {
                        $.each(data.customerImages, function (index, data) {
                            if (data.cci_type == "CD") {
                                cardImage = data.cci_path;
                            }
                            if (!isEmpty(cardImage)) {
                                return false;
                            }
                        });
                    }
                }

                var html = '';
                html += '<div class="content-item" style="padding-right: 0;">';
                html += '	<div class="item-content customer-item">';
                html += '		<div class="item-content-icon">' + (isEmpty(cardImage) ? "无图" : '<img data-original="' + cardImage + '" alt="身份照">') + '</div>';
                html += '		<div class="item-content-main">';
                html += '			<div><strong>' + returnValue(data.cc_name) + '</strong> - ' + phone + '</div>';
                html += '			<div>' + cardNumber + '</div>';
                html += '		</div>';
                html += '		<button class="item-content-option next" name="customer-edit">编辑</button>';
                html += '	</div>';
                html += '</div>';
                $("#search-data").append(html).find(".customer-item:last").data("data", data);
                $("img").lazyload();
            });
        });
    };

    /** 清除结果*/
    $.search.remove_search_data = function () {
        $("#search-data").empty();
    };

})(window, $);
