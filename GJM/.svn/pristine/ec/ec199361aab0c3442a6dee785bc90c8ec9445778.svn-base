;(function (window, $) {

    /** 初始化*/
    $.service = function () {
        $.service.load_data();
        $.service.load_event();
    };

    /** 参数*/
    $.service.param = {
        apply_object: ["管家婆", "房东", "前租客", "现租客"],
    };

    /** 加载数据*/
    $.service.load_data = function () {
        $.ajax({
            url: "/appPage/queryServiceInfo",
            data: {},
            dataType: "json"
        }).done(function (result, status, xhr) {
            if (result.code != 200) {
                return;
            }
            serviceList = result.data.serviceList || "";
            contractTypeList = result.data.contractTypeList || "";
            typeList = result.data.typeList || "";

            // 加载服务类型
            $.each(serviceList, function (index, data) {
                $("[name=serviceType]").append('<option value="' + data.sm_id + '">' + data.sm_name + '</option>');
            });

            // 加载服务子类型
            $.each(typeList, function (index, data) {
                $("[name=serviceSubType]").append('<option value="' + data.st_id + '">' + data.st_name + '</option>');
            });

            // 加载服务申请类型
            $.each(contractTypeList, function (index, data) {
                $("[name=serviceApplyType]").append('<option value="' + data.contractType_Name + '">' + data.contractType_Name + '</option>');
            });

            // 加载服务申请对象
            $.each($.service.param.apply_object, function (index, data) {
                $("[name=serviceApplyObject]").append('<option value="' + data + '">' + data + '</option>');
            });

            // 申请日期
            $("[name=serviceDate]").val(returnDate(new Date()));

            $("[name=serviceType]").change();
        });
    };

    /** 加载事件*/
    $.service.load_event = function () {

        // 选择小区房号
        $("[name=house_address]").on("click", function () {
            OCService.chooseHouse();
        });

        // 改变服务类型
        $("[name=serviceType]").on("change", function () {
            $.ajax({
                url: "/service/changeType",
                data: {
                    typeId: $("[name=serviceType]").val()
                },
                dataType: "json"
            }).done(function (result) {
                if (result.code != 200) {
                    return;
                }
                if (result.data == null) {
                    return;
                }
                $("[name=serviceSubType]").empty();
                $.each(result.data, function (index, data) {
                    $("[name=serviceSubType]").append('<option value="' + data.st_id + '">' + data.st_name + '</option>');
                });
                $("[name=serviceSubType]").change();
            });
        });

        // 改变服务子类型
        $("[name=serviceSubType]").on("change", function () {
            $.ajax({
                url: "/service/queryServiceDesc",
                data: {
                    stId: $("[name=serviceSubType]").val()
                },
                dataType: "json"
            }).done(function (result) {
                if (result.code != 200) {
                    return;
                }
                if (result.data == null) {
                    return;
                }
                var html = '';
                $.each(result.data, function (index, data) {
                    html += '<option value="' + data.pl_id + '">' + data.pl_name + '</option>';
                });
                html += '<option value="-1">其他</option>';
                $("[name=serviceDesc]").html(html);
                $("#serviceDescOtherBox").hide();
            });

            $("#serviceTypeBox").hide();
            if ($("[name=serviceSubType] option:selected").text().indexOf("维修") >= 0) {
                $.ajax({
                    url: "/service/changeType",
                    data: {
                        pId: $("[name=serviceSubType]").val()
                    },
                    dataType: "json"
                }).done(function (result) {
                    if (result.code != 200) {
                        return;
                    }
                    if (result.data == null) {
                        return;
                    }
                    $("[name=serviceItem]").empty();
                    $.each(result.data, function (index, data) {
                        $("[name=serviceItem]").append('<option value="' + data.st_id + '">' + data.st_name + '</option>');
                    });
                    $("#serviceTypeBox").show();
                    $("[name=serviceItem]").change();
                });
            }
        });

        // 改变服务项目
        $("[name=serviceItem]").on("change", function () {
            $.ajax({
                url: "/service/queryServiceDesc",
                data: {
                    stId: $("[name=serviceSubType]").val()
                },
                dataType: "json"
            }).done(function (result) {
                if (result.code != 200) {
                    return;
                }
                var html = '';
                $.each(result.data, function (index, data) {
                    html += '<option value="' + data.pl_id + '">' + data.pl_name + '</option>';
                });
                html += '<option value="-1">其他</option>';
                $("[name=serviceDesc]").html(html);
                $("#serviceDescOtherBox").hide();
            });
        });

        // 改变服务申请类型
        $("[name=serviceApplyType]").on("change", function () {
        });

        // 改变服务申请对象
        $("[name=serviceApplyObject]").on("change", function () {
        });

        // 改变服务描述
        $("[name=serviceDesc]").on("change", function () {
            if ($(this).val() == -1) {
                $("#serviceDescOtherBox").show();
            } else {
                $("#serviceDescOtherBox").hide();
            }
        });

        // 上传完成
        var uploadDone = function (mode, opts, fileData) {
            $(opts.id).removeAttr("disabled").removeClass("disabled-bg").removeClass("next-bg");
            opts.fileCount >= opts.limit ? $(opts.id).attr("disabled", "disabled").addClass("disabled-bg") : $(opts.id).addClass("next-bg");
            opts.fileCount == 0 ? $(opts.box).hide() : $(opts.box).fadeIn();

            var type = "house";
            switch (mode) {
                case "add" :
                    $.appImageUpload.upload(opts, fileData, type);
                    break;
                case "remove" :
                    $.appImageUpload.remove(opts, fileData, type);
                    break;
            }
        };

        // 图片-图片描述
        $.appImageUpload({
            id: "[name=imageDESC]",
            box: "#imageDESC-box",
            limit: 5,
            type: "service",
            done: uploadDone,
        });
    };

    /** App:设置房源信息*/
    $.service.setHouseInfo = function (hi_code, house_address, cc_name, ccp_phone) {
        $("[name=house_address]").val(returnValue(house_address)).attr("data-code", hi_code);
        $("[name=contactPeople]").val(returnValue(cc_name));
        $("[name=contactPhone]").val(returnValue(ccp_phone));
    };

    /** App:设置管家信息*/
    $.service.setHousekeeperValue = function (em_id, em_name, em_phone) {
        $("[name=serviceApplyer]").val(returnValue(em_name)).attr("data-id", em_id);
    };

    /** 保存*/
    $.service.save = function () {
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

        var serviceDesc = $("[name=serviceDesc]").find("option:selected").text();
        if (serviceDesc == "其他") {
            serviceDesc = $("[name=serviceDescOther]").val();
        }
        var servicePicDescs = [];
        $("#imageDESC-box").find(".image-box-item").each(function () {
            servicePicDescs.push($(this).data("data").key);
        });

        $.ajax({
            type: "POST",
            url: "/appPage/serviceSave",
            data: {
                serviceDesc: $('[name=serviceItem]:visible').find("option:selected").text(),
                serviceProblemDesc: serviceDesc,
                serviceObjHouseCode: $('[name=house_address]').attr("data-code"),
                serviceContent: $('[name=serviceSubType]').find("option:selected").text(),
                serviceApplyType: $('[name=serviceApplyType]').find("option:selected").text() + "(" + $('[name=serviceApplyObject]').find("option:selected").text() + ")",
                serviceObjName: $('[name=contactPeople]').val(),
                serviceObjPhone: $('[name=contactPhone]').val(),
                contactPeople: $('[name=contactPeople]').val(),
                contactPhone: $('[name=contactPhone]').val(),
                serviceObjMoney: $("[name=serviceMoney]").val(),
                serviceObjStartTime: $('[name=serviceDate]').val(),
                servicePicDesc: servicePicDescs,
                em_id: $('[name=serviceApplyer]').attr("data-id")
            },
            dataType: "json",
            beforeSend: function () {
                $.hint("数据保存中...", "loading");
                $("[name=save]").attr("disabled", "disabled");
            }
        }).done(function (result) {
            if (result.code != 200) return $.hint.tip(result.msg, "error");
            $.hint.tip("保存成功", "success", 2000, function () {
                OCService.goBack();
            });
        }).fail(function () {
            $.hint("数据提交失败，请重试或联系管理员", "error");
        }).always(function () {
            $("[name=save]").removeAttr("disabled");
        });
    };

    $(function () {
        $.service();
    });

})(window, $);