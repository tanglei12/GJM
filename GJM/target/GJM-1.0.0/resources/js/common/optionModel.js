/** 跳转客户编辑*/
function perfect_more(obj) {
    var _this = $(obj);
    if (isEmpty(_this.data().value)) {
        window.parent.href_mo('/customer/customerEdit', "增加客户", $("title").text());
    } else {
        switch (_this.data().mode) {
            case "edit":
                window.parent.href_mo('/customer/customerEdit?cc_code=' + _this.data().value, "编辑客户", $("title").text());
                _this.data("cache", _this.html())
                    .data("mode", "reload")
                    .data("bgcolor", _this.css("backgroundColor"))
                    .html('<i class="icon-refresh" style="position: relative;top: 1px;font-size: 16px;"></i>&nbsp;刷新')
                    .css({
                        background: "#3498DB"
                    });
                break;
            case "reload":
                $.ajax({
                    type: "POST",
                    url: "/contractObject/queryCustomerInfo",
                    data: {
                        cc_code: _this.data().value
                    },
                    dataType: "json",
                    beforeSend: function () {
                        _this.find(".icon-refresh").addClass("icon-spin");
                    }
                }).done(function (result) {
                    switch (result.code) {
                        case 200:
                            $("input[name=cc_name]").val(result.data.cc_name);
                            $("input[name=ccp_phone]").val(result.data.ccp_phone);
                            break;
                    }
                    _this.html(_this.data().cache)
                        .data("mode", "edit")
                        .css({
                            background: _this.data("bfcolor")
                        })
                        .find(".icon-refresh").removeClass("icon-spin");
                });
                break;
        }
    }
}

/** 添加室友*/
function addSginlist(data) {
    var _box = $("#customer-box");
    var boxlen = _box.find(".main-box-list").length;
    if (boxlen >= 2) {
        $("#addSginButton-box").hide();
    }
    var _data_title = $("#addSginButton").attr("data-title")
    _label_title = "室友";
    if (!isEmpty(_data_title)) {
        _label_title = _data_title;
    }
    var html = "";
    html += '<dl class="main-box-list" data-index="' + boxlen + '">';
    html += '	<dt class="item"><label class="lb-order">' + _label_title + '<span class="sp-order">' + (boxlen + 1) + '</span></label></dt>';
    html += '	<dd class="item" style="min-width: 180px;">';
    html += '		<input type="hidden" name="cc_id' + boxlen + '" value="' + (!isEmpty(data) ? data.cc_id : "") + '">';
    html += '		<input type="hidden" name="cc_code' + boxlen + '" value="' + (!isEmpty(data) ? data.cc_code : "") + '">';
    html += '		<input class="form-control" name="cc_name' + boxlen + '" value="' + (!isEmpty(data) ? data.cc_name : "") + '" placeholder="姓名" style="width: 110px; margin-right: 20px;" required readonly>';
    html += '		<input class="form-control" name="ccp_phone' + boxlen + '" value="' + (!isEmpty(data) ? data.ccp_phone : "") + '" placeholder="手机号码" style="width: 140px; margin-right: 20px;" required readonly>';
    html += '		<input class="form-control" name="cc_cardNum' + boxlen + '" value="' + (!isEmpty(data) ? data.cc_cardNum : "") + '" placeholder="证件号" style="width: 200px; margin-right: 20px;" ' + (_label_title == "室友" ? 'required' : '') + ' readonly>';
    html += '		<button class="perfect-info" onclick="perfect_more(this)" data-mode="edit" style="display: none;margin-right: 20px;">完善客户信息</button>';
    html += '		<button class="input-remove" onclick="delSginlist(this)" >删除</button>';
    html += '	</dd>';
    html += '	<dd class="tisp"></dd>';
    html += '</dl>';
    html += '<hr>';
    $("#customer-box").append(html);
    $('[name=cc_name' + boxlen + '],[name=ccp_phone' + boxlen + '],[name=cc_cardNum' + boxlen + ']').on("click", function () {
        $(this).openModel({
            title: "客户信息",
            target: {
                id: "cc_id" + boxlen,
                code: "cc_code" + boxlen,
                name: "cc_name" + boxlen,
                phone: "ccp_phone" + boxlen,
                card: "cc_cardNum" + boxlen
            },
            repeatClass: 'cc_id'
        });
    });
}

/** 删除室友*/
function delSginlist(obj) {
    $(obj).parents(".main-box-list").remove();
    var _box = $("#customer-box");
    var boxlen = _box.find(".main-box-list").length;
    if (boxlen < 3) {
        $("#addSginButton-box").fadeIn();
    }
    _box.find(".sp-order").each(function (index) {
        $(this).text(index + 1);
    });
}

/** 添加管家*/
function addGJlist(data, option) {
    var _obj = $("#gj-box");
    var index = _obj.find(".main-box-list").length;
    var button = "";
    var count = 4;
//	if(index >= count){
//		_obj.remove();
//		return;
//	}
    option = option || "readonly";

    if (index >= (count - 1)) {
        $("#addGJButton").hide();
    }
    var _em_id = "",
        _em_name = "",
        _em_phone = "",
        _contract_perforSplit = "";

    if (!isEmpty(data)) {
        _em_id = returnNumber(data.em_id);
        _em_name = returnValue(data.em_name);
        _em_phone = returnValue(data.em_phone);
        _contract_perforSplit = returnNumber(data.contract_perforSplit);
    }
    _obj.append(
        '<dl class="main-box-list" data-index="' + index + '" style="width: 100%;margin-bottom: 28px;">' +
        '<dt class="item"><label class="lb-order">副管家<span class="sp-order">' + (index + 1) + '</span></label></dt>' +
        '<dd class="item" style="min-width: 220px">' +
        '<input type="hidden" name="em_id' + index + '" value="' + _em_id + '" data-type="2"/>' +
        '<input class="form-control" name="em_name' + index + '" value="' + _em_name + '" placeholder="姓名" style="width: 110px; margin-right: 20px;" required ' + option + '>' +
        '<input class="form-control" name="em_phone' + index + '" value="' + _em_phone + '" placeholder="手机号码" style="width: 140px; margin-right: 20px;" required ' + option + '>' +
        '<input class="form-control number emp-yj" name="contract_perforSplit' + index + '" value="' + _contract_perforSplit + '" placeholder="业绩分成" maxlength="3" ' + (option == "readonly" ? "" : option) + ' style="width: 140px; margin-right: 20px;">' +
        (option == "readonly" ? '<button class="input-remove" onclick="delGJlist(this)" >删除</button>' : "") +
        '</dd>' +
        '</dl>' +
        '<hr>');
    $('input[name=em_name' + index + '],input[name=em_phone' + index + ']').on("click", function () {
        $(this).openModel({
            title: "管家信息",
            target: {
                id: "em_id" + index,
                name: "em_name" + index,
                phone: "em_phone" + index
            },
            repeatClass: 'em_id'
        });
    });
    if (isEmpty(data)) {
        var emplen = $("input[name^=em_id]").length;
        if (emplen == 3) {
            $(".emp-yj").eq(0).val(40);
            $(".emp-yj").eq(1).val(30);
            $(".emp-yj").eq(2).val(30);
        } else {
            $(".emp-yj").val(100 / emplen);
        }
    }
}

/** 删除管家*/
function delGJlist(obj) {
    $(obj).parent().parent().remove();
    var boxlen = $("#gj-box").find(".main-box-list").length;
    if (boxlen < 4) {
        $("#addGJButton").fadeIn();
    }
    if ($(".emp-yj").length == 3) {
        $(".emp-yj").eq(0).val(40);
        $(".emp-yj").eq(1).val(30);
        $(".emp-yj").eq(2).val(30);
    } else {
        $(".emp-yj").val(100 / ($(".emp-yj").length));
    }
    $("#gj-box").find(".sp-order").each(function (index) {
        $(this).text(index + 1);
    });
}

/** 弹窗框插件*/
;(function ($, document) {
    $.fn.openModel = function (options) {
        return this.each(function () {
            var defaults = {
                title: "",								// 标题
                param: "",
                target: {								// 传值对象（传入name参数）
                    id: "",
                    name: "",
                    phone: "",
                    card: "",
                    address: "",
                    images: ""
                },
                select_all: false,
                repeatClass: "",						// 重复判断（传入name参数）
                window_title: $("title").text(),		// 获取标题
                afterFocus: "",							// 取值后，焦点对象（传入name参数）
                done: function () {
                }
            };
            var opts = $.extend(defaults, options);

            var _this = this;
            var _box;

            /** 初始化*/
            _this.init = function () {
                _this.createHTML();
            };

            /** 生成html*/
            _this.createHTML = function () {
                _this.close();

                var html = "";
                html += '<div id="model-box">';
                html += '    <div class="model-content">';
                html += '    		<div class="model-head">';
                html += '    			<span class="model-title">' + opts.title + '</span>';
                html += '    			<button class="model-close"></button>';
                html += '    		</div>';
                html += '    		<div class="model-main">';
                switch (opts.title) {
                    case "客户信息":
                        html += '<div class="model-main-hint"></div>';
                        html += '<div class="model-search">';
                        html += '		<label><i class="fa-search"></i><input name="search-text" style="width: 100%" placeholder="姓名、手机号码、身份证"></label>';
                        html += '		<label class="error" style="line-height: 34px;width: auto;padding: 0 12px;font-size: 14px;"><em style="position: relative;margin-right: 7px;top: 3px;">*</em>续约合同只能选择室友或者联系人</label>';
                        html += '		<button name="search-btn" onclick="window.parent.href_mo(\'/customer/addCustomerPage\', \'增加客户\', \'' + opts.window_title + '\')">添加客户</button>';
                        html += '</div>';
                        html += '<div class="model-list">';
                        html += '		<table>';
                        html += '		    <thead>';
                        html += '		    	<tr>';
                        html += '                 <th width="10%">客户姓名</th>';
                        html += '                 <th width="10%">性别</th>';
                        html += '                 <th width="20%">手机号</th>';
                        html += '                 <th width="20%">证件号</th>';
//						html +='                 <th width="30%">地址</th>';
                        html += '		    	</tr>';
                        html += '		    </thead>';
                        html += '	    	<tbody class="model-list-body"></tbody>';
                        html += '	    </table>';
                        html += '</div>';
                        break;
                    case "管家信息":
                        html += '<div class="model-main-hint"></div>';
                        html += '<div class="model-search">';
                        html += '     <dl class="select">';
                        if (opts.select_all) {
                            html += '     	 <dt class="selected" data-value="">所有部门</dt>';
                            html += '     	 <dd class="option">';
                            html += '     	 	<ul>';
                            html += '     	 		<li class="select-option-item" data-value="">所有部门</li>';
                            html += '     	 		<li class="select-option-item" data-value="' + $.cookie("em_department") + '" style="display:none">我的部门</li>';
                            html += '     	 	</ul>';
                            html += '     	 </dd>';
                        } else {
                            html += '     	 <dt class="selected" data-value="' + $.cookie("em_department") + '">我的部门</dt>';
                            html += '     	 <dd class="option">';
                            html += '     	 	<ul>';
                            html += '     	 		<li class="select-option-item" data-value="">所有部门</li>';
                            html += '     	 		<li class="select-option-item" data-value="' + $.cookie("em_department") + '" style="display:none">我的部门</li>';
                            html += '     	 	</ul>';
                            html += '     	 </dd>';
                        }
                        html += '     </dl>';
                        html += '		<label><i class="fa-search"></i><input name="search-text" style="width: 100%" placeholder="姓名、手机号码"></label>';
                        html += '</div>';
                        html += '<div class="model-list">';
                        html += '		<table>';
                        html += '		    <thead>';
                        html += '		    	<tr>';
                        html += '                 <th width="20%">姓名</th>';
                        html += '                 <th width="20%">电话</th>';
                        html += '                 <th width="20%">部门</th>';
                        html += '                 <th width="20%">职位</th>';
                        html += '                 <th width="20%">状态</th>';
                        html += '		    	</tr>';
                        html += '		    </thead>';
                        html += '	    	<tbody class="model-list-body"></tbody>';
                        html += '	    </table>';
                        html += '</div>';
                        break;
                    case "部门信息":
                        html += '<div class="model-main-hint"></div>';
                        html += '<div class="model-search">';
                        html += '		<label><i class="fa-search"></i><input name="search-text" style="width: 100%" placeholder="部门名称、负责人、负责人电话"></label>';
                        html += '</div>';
                        html += '<div class="model-list">';
                        html += '		<table>';
                        html += '		    <thead>';
                        html += '		    	<tr>';
                        html += '                 <th width="25%">部门名称</th>';
                        html += '                 <th width="25%">负责人</th>';
                        html += '                 <th width="25%">负责人电话</th>';
                        html += '                 <th width="25%">上级部门</th>';
                        html += '		    	</tr>';
                        html += '		    </thead>';
                        html += '	    	<tbody class="model-list-body"></tbody>';
                        html += '	    </table>';
                        html += '</div>';
                    case "意向客户":
                        html += '<div class="model-main-hint"></div>';
                        html += '<div class="model-search">';
                        html += '		<label><i class="fa-search"></i><input name="search-text" style="width: 100%" placeholder="姓名、手机号码、身份证"></label>';
                        html += '		<label class="error" style="line-height: 34px;width: auto;padding: 0 12px;font-size: 14px;"><em style="position: relative;margin-right: 7px;top: 3px;"></em></label>';
//						html +='		<button name="search-btn" onclick="window.parent.href_mo=(\'/customer/customerIntention\, \'增加客户\', \''+ opts.window_title +'\')'">添加意向客户</button>';
                        html += '</div>';
                        html += '<div class="model-list">';
                        html += '		<table>';
                        html += '		    <thead>';
                        html += '		    	<tr>';
                        html += '                 <th width="10%">客户姓名</th>';
                        html += '                 <th width="10%">性别</th>';
                        html += '                 <th width="20%">手机号</th>';
                        html += '                 <th width="20%">证件号</th>';
//						html +='                 <th width="30%">地址</th>';
                        html += '		    	</tr>';
                        html += '		    </thead>';
                        html += '	    	<tbody class="model-list-body"></tbody>';
                        html += '	    </table>';
                        html += '</div>';
                        break;
                    case "选择客户":
                        html += '<div class="model-main-hint"></div>';
                        html += '<div class="model-search">';
                        html += '		<label><i class="fa-search"></i><input name="search-text" style="width: 100%" placeholder="姓名、手机号码、身份证"></label>';
//						html +='		<label class="error" style="line-height: 34px;width: auto;padding: 0 12px;font-size: 14px;"><em style="position: relative;margin-right: 7px;top: 3px;">*</em>续约合同只能选择室友或者联系人</label>';
//						html +='		<button name="search-btn" onclick="window.parent.href_mo(\'/customer/addCustomerPage\', \'增加客户\', \''+ opts.window_title +'\')">添加客户</button>';
                        html += '</div>';
                        html += '<div class="model-list">';
                        html += '		<table>';
                        html += '		    <thead>';
                        html += '		    	<tr>';
                        html += '                 <th width="10%">客户姓名</th>';
                        html += '                 <th width="10%">性别</th>';
                        html += '                 <th width="20%">手机号</th>';
                        html += '                 <th width="20%">证件号</th>';
//						html +='                 <th width="30%">地址</th>';
                        html += '		    	</tr>';
                        html += '		    </thead>';
                        html += '	    	<tbody class="model-list-body"></tbody>';
                        html += '	    </table>';
                        html += '</div>';
                        break;
                }
                html += '    		</div>';
                html += '    		<div class="model-foot">';
                html += '            <span class="foot-left state-ok fa-angle-left"></span>';
                html += '            <input class="foot-left number" id="pageNo" value="1">';
                html += '            <span class="foot-left state-ok fa-angle-right"></span>';
                html += '            <div class="foot-right">共<span id="totalPage"></span>页，<span id="totalRecords"></span>条记录</div>';
                html += '    		</div>';
                html += '    </div>';
                html += '</div>';

                $(html)
                    .appendTo("body")
                    .fadeIn();
                _box = $(html);

                var _content = $("#model-box").find(".model-content");
                _content.css({
                    marginLeft: -_content.width() / 2
                });

//				$("#model-box").find(".model-content").css({
//					top : 120,
//					left : ($(document).width() - 800)/2
//				});

                _this.initData();
                _this.addEvent();
            };

            /** 初始化数据*/
            _this.initData = function () {
                var url;
                var data = {
                    pageNo: returnNumber(_box.find("#pageNo").val()),
                    param: returnValue($("input[name=search-text]").val()),
                    cc_id_str: opts.param
                };
                switch (opts.title) {
                    case "客户信息":
                        url = "/contractObject/querySignInfo";
                        break;
                    case "管家信息":
                        url = "/contractObject/queryEmpList";
                        data.ucc_short = $(".select>.selected").attr("data-value");
                        break;
                    case "部门信息":
                        url = "/contractObject/queryDepartment";
                        break;
                    case "意向客户":
                        url = "/customer/queryCustomerIntention";
                        break;
                    case "选择客户":
                        url = "/contractObject/querySignInfo";
                        break;
                }
                $.ajax({
                    type: "POST",
                    url: url,
                    data: data,
                    dataType: "json",
                    beforeSend: function () {
                        _box.find(".model-list-body").html('<tr><td><div class="loading"></div></td></tr>');
                    }
                }).done(function (result) {
                    if (result.code == 200) {
                        _box.find(".model-list-body").empty();
                        _box.find("#totalPage").text(result.data.totalPage);
                        _box.find("#totalRecords").text(result.data.totalRecords);

                        // 遍历数据
                        $.each(result.data.list, function (index, data) {
                            switch (opts.title) {
                                case "客户信息":
                                    _box.find(".model-list-body")
                                        .append('<tr>' +
                                            '<td>' + returnValue(data.cc_name) + '</td>' +
                                            '<td>' + returnValue(data.cc_sex == 0 ? '女' : '男') + '</td>' +
                                            '<td>' + returnValue(data.ccp_phone) + '</td>' +
                                            '<td>' + returnValue(data.cc_cardNum) + '</td>' +
                                            //													'<td>'+ returnValue(data.cc_address) +'</td>' +
                                            '</tr>')
                                        .find("tr:last")
                                        .on("click", function () {
                                            // 如果重复类有就判断重复，反之则无需判断
                                            if (!isEmpty(opts.repeatClass)) {
                                                var isHaving = true;
                                                $("[name^=" + opts.repeatClass + "]").each(function () {
                                                    if (returnNumber($(this).val()) == data.cc_id) {
                                                        isHaving = false;
                                                        return false;
                                                    }
                                                });
                                                if ($("[name=" + opts.target.id + "]").val() == data.cc_id) {
                                                    isHaving = true;
                                                }
                                                if (!isHaving) {
                                                    if ($(".model-main-hint").is(":hidden")) {
                                                        $(".model-main-hint").html("该客户已被选择，不能重复选择").slideDown(200);
                                                        setTimeout(function () {
                                                            $(".model-main-hint").slideUp(200);
                                                        }, 2000);
                                                    }
                                                    return;
                                                }
                                            }
                                            // 赋值
                                            $("[name=" + opts.target.id + "]").val(data.cc_id);
                                            $("[name=" + opts.target.code + "]").val(data.cc_code);
                                            $("[name=" + opts.target.name + "]").val(data.cc_name);
                                            $("[name=" + opts.target.phone + "]").val(data.ccp_phone);
                                            $("[name=" + opts.target.card + "]").val(data.cc_cardNum);
                                            $("[name=" + opts.target.address + "]").val(data.cc_address);

                                            $(opts.target.images).find(".images-btn").attr("data-id", data.cc_id);
                                            if (!isEmpty(data.customerImages)) {
                                                $(opts.target.images).find(".images-box-img").remove();
                                                $.each(data.customerImages, function (index, data) {
                                                    var html = "";
                                                    html += '<div class="images-box-img">';
                                                    html += '	<img class="showboxImg" name="SFZ" src="' + returnValue(data.cci_path) + '">';
                                                    html += '	<span class="images-box-img-delete" data-type="SFZ" data-id="' + data.cc_id + '" data-del-url="/contractObject/deleteCustomerImage">删除</span>';
                                                    html += '</div>';
                                                    $(opts.target.images).append(html);
                                                });
                                                $("#SFZ-count").text(data.customerImages.length);
                                                if (data.customerImages.length >= returnNumber($("#SFZ-limit").text())) {
                                                    $(opts.target.images).find(".images-btn").hide();
                                                    $("#upload-box").remove();
                                                } else {
                                                    $(opts.target.images).find(".images-btn").show();
                                                }
                                            } else {
                                                $(opts.target.images).find(".images-box-img").remove();
                                                $("#SFZ-count").text(0);
                                                $(opts.target.images).find(".images-btn").show();
                                                $("#upload-box").remove();
                                            }

                                            var _perfectInfo = $(_this).parent().find("button.perfect-info");
                                            _perfectInfo.attr("data-value", data.cc_code);
                                            var _boo = true;
                                            if (_boo && !isEmpty(opts.target.name) && isEmpty(data.cc_name)) {
                                                _boo = false;
                                            }
                                            if (_boo && !isEmpty(opts.target.phone) && isEmpty(data.ccp_phone)) {
                                                _boo = false;
                                            }
                                            if (_boo && !isEmpty(opts.target.card) && isEmpty(data.cc_cardNum)) {
                                                _boo = false;
                                            }
                                            if (!_boo) {
                                                _perfectInfo.show();
                                            } else {
                                                _perfectInfo.hide();
                                            }

                                            _this.close();
                                            if (!isEmpty(opts.afterFocus)) {
                                                $("[" + opts.afterFocus + "]").focus();
                                            }
                                            opts.done(data);
                                        });
                                    break;

                                case "管家信息":
                                    _box.find(".model-list-body")
                                        .append('<tr>' +
                                            '<td>' + returnValue(data.em_name) + '</td>' +
                                            '<td>' + returnValue(data.em_phone) + '</td>' +
                                            '<td>' + returnValue(data.ucc_name) + '</td>' +
                                            '<td>' + returnValue(data.ucr_name) + '</td>' +
                                            '<td>' + (data.em_state == 1 ? '<span class="ok">正常</span>' : '<span class="error">离职</span>') + '</td>' +
                                            '</tr>')
                                        .find("tr:last")
                                        .on("click", function () {
                                            // 如果重复类有就判断重复，反之则无需判断
                                            if (!isEmpty(opts.repeatClass)) {
                                                var isHaving = true;
                                                $("input[name^=" + opts.repeatClass + "]").each(function () {
                                                    if (returnNumber($(this).val()) == data.em_id) {
                                                        isHaving = false;
                                                        return false;
                                                    }
                                                });
                                                if ($("input[name=" + opts.target.id + "]").val() == data.em_id) {
                                                    isHaving = true;
                                                }
                                                if (!isHaving) {
                                                    if ($(".model-main-hint").is(":hidden")) {
                                                        $(".model-main-hint").html("该管家已被选择，不能重复选择").slideDown(200);
                                                        setTimeout(function () {
                                                            $(".model-main-hint").slideUp(200);
                                                        }, 2000);
                                                    }
                                                    return;
                                                }
                                            }
                                            // 赋值
                                            $("input[name=" + opts.target.id + "]").val(data.em_id);
                                            $("input[name=" + opts.target.name + "]").val(data.em_name);
                                            $("input[name=" + opts.target.phone + "]").val(data.em_phone);
                                            _this.close();
                                            if (!isEmpty(opts.afterFocus)) {
                                                $("[name=" + opts.afterFocus + "]:eq(0)").focus();
                                            }
                                        });
                                    break;
                                case "部门信息":
                                    _box.find(".model-list-body")
                                        .append('<tr>' +
                                            '<td>' + returnValue(data.ucc_name) + '</td>' +
                                            '<td>' + returnValue(data.ucc_person) + '</td>' +
                                            '<td>' + returnValue(data.ucc_phone) + '</td>' +
                                            '<td>' + returnValue(data.ucc_pname) + '</td>' +
                                            '</tr>')
                                        .find("tr:last")
                                        .on("click", function () {
                                            // 如果重复类有就判断重复，反之则无需判断
                                            if (!isEmpty(opts.repeatClass)) {
                                                var isHaving = true;
                                                $("input[name^=" + opts.repeatClass + "]").each(function () {
                                                    if (returnNumber($(this).val()) == data.em_id) {
                                                        isHaving = false;
                                                        return false;
                                                    }
                                                });
                                                if ($("input[name=" + opts.target.id + "]").val() == data.em_id) {
                                                    isHaving = true;
                                                }
                                                if (!isHaving) {
                                                    if ($(".model-main-hint").is(":hidden")) {
                                                        $(".model-main-hint").html("该管家已被选择，不能重复选择").slideDown(200);
                                                        setTimeout(function () {
                                                            $(".model-main-hint").slideUp(200);
                                                        }, 2000);
                                                    }
                                                    return;
                                                }
                                            }
                                            // 赋值
                                            $("input[name=" + opts.target.id + "]").val(data.ucc_id);
                                            $("input[name=" + opts.target.name + "]").val(data.ucc_name);
                                            _this.close();
                                            if (!isEmpty(opts.afterFocus)) {
                                                $("[name=" + opts.afterFocus + "]:eq(0)").focus();
                                            }
                                        });
                                    break;

                                case "意向客户":
                                    _box.find(".model-list-body")
                                        .append('<tr>' +
                                            '<td>' + returnValue(data.cc_name) + '</td>' +
                                            '<td>' + returnValue(data.cc_sex == 2 ? '女' : '男') + '</td>' +
                                            '<td>' + returnValue(data.ccp_phone) + '</td>' +
                                            '<td>' + returnValue(data.cc_cardNum) + '</td>' +
                                            //													'<td>'+ returnValue(data.cc_address) +'</td>' +
                                            '</tr>')
                                        .find("tr:last")
                                        .on("click", function () {
                                            // 如果重复类有就判断重复，反之则无需判断
                                            if (!isEmpty(opts.repeatClass)) {
                                                var isHaving = true;
                                                $("[name^=" + opts.repeatClass + "]").each(function () {
                                                    if (returnNumber($(this).val()) == data.cc_id) {
                                                        isHaving = false;
                                                        return false;
                                                    }
                                                });
                                                if ($("[name=" + opts.target.id + "]").val() == data.cc_id) {
                                                    isHaving = true;
                                                }
                                                if (!isHaving) {
                                                    if ($(".model-main-hint").is(":hidden")) {
                                                        $(".model-main-hint").html("该客户已被选择，不能重复选择").slideDown(200);
                                                        setTimeout(function () {
                                                            $(".model-main-hint").slideUp(200);
                                                        }, 2000);
                                                    }
                                                    return;
                                                }
                                            }
                                            // 赋值
                                            $("[name=" + opts.target.id + "]").val(data.cc_id);
                                            $("[name=" + opts.target.code + "]").val(data.cc_code);
                                            $("[name=" + opts.target.name + "]").val(data.cc_name);
                                            $("[name=" + opts.target.phone + "]").val(data.ccp_phone);
                                            $("[name=" + opts.target.card + "]").val(data.cc_cardNum);
//											$("[name="+ opts.target.address +"]").val(data.cc_address);

                                            $(opts.target.images).find(".images-btn").attr("data-id", data.cc_id);
                                            if (!isEmpty(data.img_card1)) {
                                                $(opts.target.images).find(".images-box-img").remove();
                                                $.each(data.customerImages, function (index, data) {
                                                    var html = "";
                                                    html += '<div class="images-box-img">';
                                                    html += '	<img class="showboxImg" name="SFZ" src="' + returnValue(data.cci_path) + '">';
                                                    html += '	<span class="images-box-img-delete" data-type="SFZ" data-id="' + data.cc_id + '" data-del-url="/contractObject/deleteCustomerImage">删除</span>';
                                                    html += '</div>';
                                                    $(opts.target.images).append(html);
                                                });
                                                $("#SFZ-count").text(data.customerImages.length);
                                                if (data.customerImages.length >= returnNumber($("#SFZ-limit").text())) {
                                                    $(opts.target.images).find(".images-btn").hide();
                                                    $("#upload-box").remove();
                                                } else {
                                                    $(opts.target.images).find(".images-btn").show();
                                                }
                                            } else {
                                                // 意向客户证件若正面照为空，则置为空对象
                                                data.customerImages = {};
                                                $(opts.target.images).find(".images-box-img").remove();
                                                $("#SFZ-count").text(0);
                                                $(opts.target.images).find(".images-btn").show();
                                                $("#upload-box").remove();
                                            }

                                            var _perfectInfo = $(_this).parent().find("button.perfect-info");
                                            _perfectInfo.attr("data-value", data.cc_code);
                                            var _boo = true;
                                            if (_boo && !isEmpty(opts.target.name) && isEmpty(data.cc_name)) {
                                                _boo = false;
                                            }
                                            if (_boo && !isEmpty(opts.target.phone) && isEmpty(data.ccp_phone)) {
                                                _boo = false;
                                            }
                                            if (_boo && !isEmpty(opts.target.card) && isEmpty(data.cc_cardNum)) {
                                                _boo = false;
                                            }
                                            if (!_boo) {
                                                _perfectInfo.show();
                                            } else {
                                                _perfectInfo.hide();
                                            }

                                            _this.close();
                                            if (!isEmpty(opts.afterFocus)) {
                                                $("[" + opts.afterFocus + "]").focus();
                                            }
                                            opts.done(data);
                                        });
                                    break;

                                case "选择客户":
                                    _box.find(".model-list-body")
                                        .append('<tr>' +
                                            '<td>' + returnValue(data.cc_name) + '</td>' +
                                            '<td>' + returnValue(data.cc_sex == 0 ? '女' : '男') + '</td>' +
                                            '<td>' + returnValue(data.ccp_phone) + '</td>' +
                                            '<td>' + returnValue(data.cc_cardNum) + '</td>' +
                                            //													'<td>'+ returnValue(data.cc_address) +'</td>' +
                                            '</tr>')
                                        .find("tr:last")
                                        .on("click", function () {
                                            // 如果重复类有就判断重复，反之则无需判断
                                            if (!isEmpty(opts.repeatClass)) {
                                                var isHaving = true;
                                                $("[name^=" + opts.repeatClass + "]").each(function () {
                                                    if (returnNumber($(this).val()) == data.cc_id) {
                                                        isHaving = false;
                                                        return false;
                                                    }
                                                });
                                                if ($("[name=" + opts.target.id + "]").val() == data.cc_id) {
                                                    isHaving = true;
                                                }
                                                if (!isHaving) {
                                                    if ($(".model-main-hint").is(":hidden")) {
                                                        $(".model-main-hint").html("该客户已被选择，不能重复选择").slideDown(200);
                                                        setTimeout(function () {
                                                            $(".model-main-hint").slideUp(200);
                                                        }, 2000);
                                                    }
                                                    return;
                                                }
                                            }
                                            // 赋值
                                            $("[name=" + opts.target.id + "]").val(data.cc_id);
                                            $("[name=" + opts.target.code + "]").val(data.cc_code);
                                            $("[name=" + opts.target.name + "]").val(data.cc_name);
                                            $("[name=" + opts.target.phone + "]").val(data.ccp_phone);
                                            $("[name=" + opts.target.card + "]").val(data.cc_cardNum);
                                            $("[name=" + opts.target.address + "]").val(data.cc_address);

                                            $(opts.target.images).find(".images-btn").attr("data-id", data.cc_id);
                                            if (!isEmpty(data.customerImages)) {
                                                $(opts.target.images).find(".images-box-img").remove();
                                                $.each(data.customerImages, function (index, data) {
                                                    var html = "";
                                                    html += '<div class="images-box-img">';
                                                    html += '	<img class="showboxImg" name="SFZ" src="' + returnValue(data.cci_path) + '">';
                                                    html += '	<span class="images-box-img-delete" data-type="SFZ" data-id="' + data.cc_id + '" data-del-url="/contractObject/deleteCustomerImage">删除</span>';
                                                    html += '</div>';
                                                    $(opts.target.images).append(html);
                                                });
                                                $("#SFZ-count").text(data.customerImages.length);
                                                if (data.customerImages.length >= returnNumber($("#SFZ-limit").text())) {
                                                    $(opts.target.images).find(".images-btn").hide();
                                                    $("#upload-box").remove();
                                                } else {
                                                    $(opts.target.images).find(".images-btn").show();
                                                }
                                            } else {
                                                $(opts.target.images).find(".images-box-img").remove();
                                                $("#SFZ-count").text(0);
                                                $(opts.target.images).find(".images-btn").show();
                                                $("#upload-box").remove();
                                            }

                                            var _perfectInfo = $(_this).parent().find("button.perfect-info");
                                            _perfectInfo.attr("data-value", data.cc_code);
                                            var _boo = true;
                                            if (_boo && !isEmpty(opts.target.name) && isEmpty(data.cc_name)) {
                                                _boo = false;
                                            }
                                            if (_boo && !isEmpty(opts.target.phone) && isEmpty(data.ccp_phone)) {
                                                _boo = false;
                                            }
                                            if (_boo && !isEmpty(opts.target.card) && isEmpty(data.cc_cardNum)) {
                                                _boo = false;
                                            }
                                            if (!_boo) {
                                                _perfectInfo.show();
                                            } else {
                                                _perfectInfo.hide();
                                            }

                                            _this.close();
                                            if (!isEmpty(opts.afterFocus)) {
                                                $("[" + opts.afterFocus + "]").focus();
                                            }
                                            opts.done(data);
                                        });
                                    break;
                            }
                        });
                    }
                });
            };

            // 事件绑定
            _this.addEvent = function () {
                _box = $("#model-box");
                _box.find(".model-close").on("click", function () {
                    _this.close();
                });

                // 上一页
                _box.find(".fa-angle-left").on("click", function () {
                    var pageNo = returnNumber(_box.find("#pageNo").val());
                    if (pageNo <= 1) {
                        return;
                    }
                    var totalPage = returnNumber(_box.find("#totalPage").text());
                    if (pageNo > totalPage) {
                        _box.find("#pageNo").val(totalPage);
                    } else {
                        _box.find("#pageNo").val(pageNo - 1);
                    }
                    _this.initData();
                });

                // 下一页
                _box.find(".fa-angle-right").on("click", function () {
                    var pageNo = returnNumber(_box.find("#pageNo").val());
                    var totalPage = returnNumber(_box.find("#totalPage").text());
                    if (pageNo >= totalPage) {
                        return;
                    }
                    _box.find("#pageNo").val(pageNo + 1);
                    _this.initData();
                });

                // 跳转
                _box.find("#pageNo").on("keyup", function () {
                    var pageNo = returnNumber(_box.find("#pageNo").val());
                    var totalPage = returnNumber(_box.find("#totalPage").text());
                    if (pageNo > totalPage || pageNo < 1) {
                        return;
                    }
                    ;
                    _box.find("#pageNo").val(pageNo);
                    _this.initData();
                });

                // 搜索
                _box.find("input[name=search-text]").on("keyup", function () {
                    _box.find("#pageNo").val(1);
                    _this.initData();
                });

                _box.find("input[name=search-text]").focus();

                switch (opts.title) {
                    case "管家信息":
                        // 点击select
                        $(".select>.selected").on("click", function (e) {
                            $(this).siblings(".option").toggle();
                            e.stopPropagation();
                        });
                        // 点击option
                        $(".select-option-item").on("click", function () {
                            var _select = $(this).parents(".select");
                            _select.find(".selected").attr("data-value", $(this).attr("data-value"));
                            _select.find(".selected").text($(this).text());
                            $(".select-option-item").show();
                            $(this).hide();
                            _select.find(".option").hide();
                            _box.find("#pageNo").val(1);
                            _this.initData();
                        });
                        break;
                }

                // 移动弹窗
//				_this.moveModel();
            };

            /** 移动弹窗 */
            _this.moveModel = function () {
                $("#model-box").find(".model-head").mousedown(function (e) {
                    var move = true;
                    var _content = $("#model-box").find(".model-content");
                    console.log("X, " + e.pageX + "  Y, " + e.pageY);
                    var _x = e.pageX - _content.offset().left;
                    var _y = e.pageY - _content.offset().top;
                    $(window).mousemove(function (event) {
                        if (move) {
                            var x = event.pageX - _x;// 控件左上角到屏幕左上角的相对位置
                            var y = event.pageY - _y;
//							console.log("x, " + x + "  y, " + y);
//							if(x < 0){
//								x = 0;
//							}
//							if(x > (_box.width() - _content.width())){
//								x = _box.width() - _content.width();
//							}
//							if(y < 0){
//								y = 0;
//							}
//							if(y > (_box.height() - _content.height())){
//								y = _box.height() - _content.height();
//							}
                            _content.css({
                                "top": y,
                                "left": x
                            });
                        }
                    }).mouseup(function () {
                        move = false;
                    });
                });
            };

            // 关闭弹窗
            _this.close = function () {
                $("#model-box").remove();
            };
            // 执行
            _this.init();
        });
    };
})($, document);

/** 弹窗框插件*/
;(function ($, document) {
    $.fn.editModel = function (options) {
        return this.each(function () {
            var defaults = {
                title: "",								// 标题
                param: "",
                target: {								// 传值对象（传入name参数）
                    id: "",
                    name: "",
                    phone: "",
                    card: "",
                    address: "",
                    images: ""
                },
                repeatClass: "",						// 重复判断（传入name参数）
                window_title: $("title").text(),		// 获取标题
                afterFocus: ""							// 取值后，焦点对象（传入name参数）
            };
            var opts = $.extend(defaults, options);

            var _this = this;
            var _box;

            /** 初始化*/
            _this.init = function () {
                _this.createHTML();
            };

            /** 生成html*/
            _this.createHTML = function () {
                _this.close();

                var html = "";
                html += '<div id="model-box">';
                html += '    <div class="model-content" style="margin-left: -399px">';
                html += '    		<div class="model-head">';
                html += '    			<span class="model-title">' + opts.title + '</span>';
                html += '    			<button class="model-close"></button>';
                html += '    		</div>';
                html += '    		<div class="model-main">';
                switch (opts.title) {
                    case "客户信息":
                        html += '<div class="model-main-hint"></div>';
                        html += '<div class="model-search">';
                        html += '		<label><i class="fa-search"></i><input name="search-text" style="width: 100%" placeholder="姓名、手机号码、身份证"></label>';
                        html += '		<label class="error" style="line-height: 34px;width: auto;padding: 0 12px;font-size: 14px;"><em style="position: relative;margin-right: 7px;top: 3px;">*</em>续约合同只能选择室友或者联系人</label>';
                        html += '		<button name="search-btn" onclick="window.parent.href_mo(\'/customer/addCustomerPage\', \'增加客户\', \'' + opts.window_title + '\')">添加客户</button>';
                        html += '</div>';
                        html += '<div class="model-list">';
                        html += '		<table>';
                        html += '		    <thead>';
                        html += '		    	<tr>';
                        html += '                 <th width="10%">客户姓名</th>';
                        html += '                 <th width="10%">性别</th>';
                        html += '                 <th width="20%">手机号</th>';
                        html += '                 <th width="20%">证件号</th>';
//						html +='                 <th width="30%">地址</th>';
                        html += '		    	</tr>';
                        html += '		    </thead>';
                        html += '	    	<tbody class="model-list-body"></tbody>';
                        html += '	    </table>';
                        html += '</div>';
                        break;
                    case "管家信息":
                        html += '<div class="model-main-hint"></div>';
                        html += '<div class="model-search">';
                        html += '     <dl class="select">';
                        html += '     	 <dt class="selected" data-value="' + $.cookie("em_department") + '">我的部门</dt>';
                        html += '     	 <dd class="option">';
                        html += '     	 	<ul>';
                        /*html += '     	 		<li class="select-option-item" data-value="">所有部门</li>';*/
                        html += '     	 		<li class="select-option-item" data-value="' + $.cookie("em_department") + '" style="display:none">我的部门</li>';
                        html += '     	 	</ul>';
                        html += '     	 </dd>';
                        html += '     </dl>';
                        html += '		<label><i class="fa-search"></i><input name="search-text" style="width: 100%" placeholder="姓名、手机号码"></label>';
                        html += '</div>';
                        html += '<div class="model-list">';
                        html += '		<table>';
                        html += '		    <thead>';
                        html += '		    	<tr>';
                        html += '                 <th width="20%">姓名</th>';
                        html += '                 <th width="20%">电话</th>';
                        html += '                 <th width="20%">部门</th>';
                        html += '                 <th width="20%">职位</th>';
                        html += '                 <th width="20%">状态</th>';
                        html += '		    	</tr>';
                        html += '		    </thead>';
                        html += '	    	<tbody class="model-list-body"></tbody>';
                        html += '	    </table>';
                        html += '</div>';
                        break;
                    case "圈子列表":
                        html += '<div class="model-main-hint"></div>';
                        html += '<div class="model-search">';
                        html += '     <dl class="select">';
                        html += '     	 <dt class="selected" data-value="' + $.cookie("em_department") + '">圈子列表</dt>';
                        html += '     	 <dd class="option">';
                        html += '     	 	<ul>';
                        /*html += '     	 		<li class="select-option-item" data-value="">所有部门</li>';*/
                        html += '     	 		<li class="select-option-item" data-value="' + $.cookie("em_department") + '" style="display:none">圈子标题</li>';
                        html += '     	 	</ul>';
                        html += '     	 </dd>';
                        html += '     </dl>';
                        html += '		<label><i class="fa-search"></i><input name="search-text" style="width: 100%" placeholder="标题"></label>';
                        html += '</div>';
                        html += '<div class="model-list">';
                        html += '		<table>';
                        html += '		    <thead>';
                        html += '		    	<tr>';
                        html += '                 <th width="80%">标题</th>';
                        html += '                 <th width="20%">是否发布</th>';
                        html += '		    	</tr>';
                        html += '		    </thead>';
                        html += '	    	<tbody class="model-list-body"></tbody>';
                        html += '	    </table>';
                        html += '</div>';
                        break;
                }
                html += '    		</div>';
                html += '    		<div class="model-foot">';
                html += '            <span class="foot-left state-ok fa-angle-left"></span>';
                html += '            <input class="foot-left number" id="pageNo" value="1">';
                html += '            <span class="foot-left state-ok fa-angle-right"></span>';
                html += '            <div class="foot-right">共<span id="totalPage"></span>页，<span id="totalRecords"></span>条记录</div>';
                html += '    		</div>';
                html += '    </div>';
                html += '</div>';

                $(html)
                    .appendTo("body")
                    .fadeIn();
                _box = $(html);

//				$("#model-box").find(".model-content").css({
//					top : 120,
//					left : ($(document).width() - 800)/2
//				});

                _this.initData();
                _this.addEvent();
            };

            /** 初始化数据*/
            _this.initData = function () {
                var url;
                var data = {
                    pageNo: returnNumber(_box.find("#pageNo").val()),
                    param: returnValue($("input[name=search-text]").val()),
                    cc_id_str: opts.param
                };
                switch (opts.title) {
                    case "客户信息":
                        url = "/contractObject/querySignInfo";
                        break;
                    case "管家信息":
                        url = "/contractObject/queryEmpList";
                        //data.ucc_short = $(".select>.selected").attr("data-value");
                        data.ucc_name = $(".select>.selected").attr("data-value");
                        break;
                    case "意向客户":
                        url = "/customer/queryCustomerIntention";
                        break;
                    case "圈子列表":
                        url = "/manageExamine/queryTopicDataList";
                        break;
                }
                $.ajax({
                    type: "POST",
                    url: url,
                    data: data,
                    dataType: "json",
                    beforeSend: function () {
                        _box.find(".model-list-body").html('<tr><td><div class="loading"></div></td></tr>');
                    }
                }).done(function (result) {
                    if (result.code == 200) {
                        _box.find(".model-list-body").empty();
                        _box.find("#totalPage").text(result.data.totalPage);
                        _box.find("#totalRecords").text(result.data.totalRecords);

                        // 遍历数据
                        $.each(result.data.list, function (index, data) {
                            switch (opts.title) {
                                case "客户信息":
                                    _box.find(".model-list-body")
                                        .append('<tr>' +
                                            '<td>' + returnValue(data.cc_name) + '</td>' +
                                            '<td>' + returnValue(data.cc_sex == 0 ? '女' : '男') + '</td>' +
                                            '<td>' + returnValue(data.ccp_phone) + '</td>' +
                                            '<td>' + returnValue(data.cc_cardNum) + '</td>' +
                                            //													'<td>'+ returnValue(data.cc_address) +'</td>' +
                                            '</tr>')
                                        .find("tr:last")
                                        .on("click", function () {
                                            // 如果重复类有就判断重复，反之则无需判断
                                            if (!isEmpty(opts.repeatClass)) {
                                                var isHaving = true;
                                                $("input[name^=" + opts.repeatClass + "]").each(function () {
                                                    if (returnNumber($(this).val()) == data.cc_id) {
                                                        isHaving = false;
                                                        return false;
                                                    }
                                                });
                                                if ($("input[name=" + opts.target.id + "]").val() == data.cc_id) {
                                                    isHaving = true;
                                                }
                                                if (!isHaving) {
                                                    if ($(".model-main-hint").is(":hidden")) {
                                                        $(".model-main-hint").html("该客户已被选择，不能重复选择").slideDown(200);
                                                        setTimeout(function () {
                                                            $(".model-main-hint").slideUp(200);
                                                        }, 2000);
                                                    }
                                                    return;
                                                }
                                            }
                                            // 赋值
                                            $("input[name=" + opts.target.id + "]").val(data.cc_id);
                                            $("input[name=" + opts.target.code + "]").val(data.cc_code);
                                            $("input[name=" + opts.target.name + "]").val(data.cc_name);
                                            $("input[name=" + opts.target.phone + "]").val(data.ccp_phone);
                                            $("input[name=" + opts.target.card + "]").val(data.cc_cardNum);
                                            $("input[name=" + opts.target.address + "]").val(data.cc_address);

                                            $(opts.target.images).find(".images-btn").attr("data-id", data.cc_id);
                                            if (!isEmpty(data.customerImages)) {
                                                $(opts.target.images).find(".images-box-img").remove();
                                                $.each(data.customerImages, function (index, data) {
                                                    var html = "";
                                                    html += '<div class="images-box-img">';
                                                    html += '	<img class="showboxImg" name="SFZ" src="' + returnValue(data.cci_path) + '">';
                                                    html += '	<span class="images-box-img-delete" data-type="SFZ" data-id="' + data.cc_id + '" data-del-url="/contractObject/deleteCustomerImage">删除</span>';
                                                    html += '</div>';
                                                    $(opts.target.images).append(html);
                                                });
                                                $("#SFZ-count").text(data.customerImages.length);
                                                if (data.customerImages.length >= returnNumber($("#SFZ-limit").text())) {
                                                    $(opts.target.images).find(".images-btn").hide();
                                                    $("#upload-box").remove();
                                                } else {
                                                    $(opts.target.images).find(".images-btn").show();
                                                }
                                            } else {
                                                $(opts.target.images).find(".images-box-img").remove();
                                                $("#SFZ-count").text(0);
                                                $(opts.target.images).find(".images-btn").show();
                                                $("#upload-box").remove();
                                            }

                                            var _perfectInfo = $(_this).parent().find("button.perfect-info");
                                            _perfectInfo.attr("data-value", data.cc_code);
                                            var _boo = true;
                                            if (_boo && !isEmpty(opts.target.name) && isEmpty(data.cc_name)) {
                                                _boo = false;
                                            }
                                            if (_boo && !isEmpty(opts.target.phone) && isEmpty(data.ccp_phone)) {
                                                _boo = false;
                                            }
                                            if (_boo && !isEmpty(opts.target.card) && isEmpty(data.cc_cardNum)) {
                                                _boo = false;
                                            }
                                            if (!_boo) {
                                                _perfectInfo.show();
                                            } else {
                                                _perfectInfo.hide();
                                            }

                                            _this.close();
                                            if (!isEmpty(opts.afterFocus)) {
                                                $("[" + opts.afterFocus + "]").focus();
                                            }
                                        });
                                    break;

                                case "管家信息":
                                    _box.find(".model-list-body")
                                        .append('<tr>' +
                                            '<td>' + returnValue(data.em_name) + '</td>' +
                                            '<td>' + returnValue(data.em_phone) + '</td>' +
                                            '<td>' + returnValue(data.ucc_name) + '</td>' +
                                            '<td>' + returnValue(data.ucr_name) + '</td>' +
                                            '<td>' + (data.em_state == 1 ? '<span class="ok">正常</span>' : '<span class="error">离职</span>') + '</td>' +
                                            '</tr>')
                                        .find("tr:last")
                                        .on("click", function () {
                                            // 如果重复类有就判断重复，反之则无需判断
                                            if (!isEmpty(opts.repeatClass)) {
                                                var isHaving = true;
                                                $("input[name^=" + opts.repeatClass + "]").each(function () {
                                                    if (returnNumber($(this).val()) == data.em_id) {
                                                        isHaving = false;
                                                        return false;
                                                    }
                                                });
                                                if ($("input[name=" + opts.target.id + "]").val() == data.em_id) {
                                                    isHaving = true;
                                                }
                                                if (!isHaving) {
                                                    if ($(".model-main-hint").is(":hidden")) {
                                                        $(".model-main-hint").html("该管家已被选择，不能重复选择").slideDown(200);
                                                        setTimeout(function () {
                                                            $(".model-main-hint").slideUp(200);
                                                        }, 2000);
                                                    }
                                                    return;
                                                }
                                            }
                                            // 赋值
                                            $("input[name=" + opts.target.id + "]").val(data.em_id);
                                            $("input[name=" + opts.target.name + "]").val(data.em_name);
                                            $("input[name=" + opts.target.phone + "]").val(data.em_phone);
                                            _this.close();
                                            if (!isEmpty(opts.afterFocus)) {
                                                $("[name=" + opts.afterFocus + "]:eq(0)").focus();
                                            }
                                        });
                                    break;

                                case "意向客户":
                                    _box.find(".model-list-body")
                                        .append('<tr>' +
                                            '<td>' + returnValue(data.cc_name) + '</td>' +
                                            '<td>' + returnValue(data.cc_sex == 2 ? '女' : '男') + '</td>' +
                                            '<td>' + returnValue(data.ccp_phone) + '</td>' +
                                            '<td>' + returnValue(data.cc_cardNum) + '</td>' +
                                            //													'<td>'+ returnValue(data.cc_address) +'</td>' +
                                            '</tr>')
                                        .find("tr:last")
                                        .on("click", function () {
                                            // 如果重复类有就判断重复，反之则无需判断
                                            if (!isEmpty(opts.repeatClass)) {
                                                var isHaving = true;
                                                $("[name^=" + opts.repeatClass + "]").each(function () {
                                                    if (returnNumber($(this).val()) == data.cc_id) {
                                                        isHaving = false;
                                                        return false;
                                                    }
                                                });
                                                if ($("[name=" + opts.target.id + "]").val() == data.cc_id) {
                                                    isHaving = true;
                                                }
                                                if (!isHaving) {
                                                    if ($(".model-main-hint").is(":hidden")) {
                                                        $(".model-main-hint").html("该客户已被选择，不能重复选择").slideDown(200);
                                                        setTimeout(function () {
                                                            $(".model-main-hint").slideUp(200);
                                                        }, 2000);
                                                    }
                                                    return;
                                                }
                                            }
                                            // 赋值
                                            $("[name=" + opts.target.id + "]").val(data.cc_id);
                                            $("[name=" + opts.target.code + "]").val(data.cc_code);
                                            $("[name=" + opts.target.name + "]").val(data.cc_name);
                                            $("[name=" + opts.target.phone + "]").val(data.ccp_phone);
                                            $("[name=" + opts.target.card + "]").val(data.cc_cardNum);
//											$("[name="+ opts.target.address +"]").val(data.cc_address);

                                            $(opts.target.images).find(".images-btn").attr("data-id", data.cc_id);
                                            if (!isEmpty(data.img_card1)) {
                                                $(opts.target.images).find(".images-box-img").remove();
                                                $.each(data.customerImages, function (index, data) {
                                                    var html = "";
                                                    html += '<div class="images-box-img">';
                                                    html += '	<img class="showboxImg" name="SFZ" src="' + returnValue(data.cci_path) + '">';
                                                    html += '	<span class="images-box-img-delete" data-type="SFZ" data-id="' + data.cc_id + '" data-del-url="/contractObject/deleteCustomerImage">删除</span>';
                                                    html += '</div>';
                                                    $(opts.target.images).append(html);
                                                });
                                                $("#SFZ-count").text(data.customerImages.length);
                                                if (data.customerImages.length >= returnNumber($("#SFZ-limit").text())) {
                                                    $(opts.target.images).find(".images-btn").hide();
                                                    $("#upload-box").remove();
                                                } else {
                                                    $(opts.target.images).find(".images-btn").show();
                                                }
                                            } else {
                                                $(opts.target.images).find(".images-box-img").remove();
                                                $("#SFZ-count").text(0);
                                                $(opts.target.images).find(".images-btn").show();
                                                $("#upload-box").remove();
                                            }

                                            var _perfectInfo = $(_this).parent().find("button.perfect-info");
                                            _perfectInfo.attr("data-value", data.cc_code);
                                            var _boo = true;
                                            if (_boo && !isEmpty(opts.target.name) && isEmpty(data.cc_name)) {
                                                _boo = false;
                                            }
                                            if (_boo && !isEmpty(opts.target.phone) && isEmpty(data.ccp_phone)) {
                                                _boo = false;
                                            }
                                            if (_boo && !isEmpty(opts.target.card) && isEmpty(data.cc_cardNum)) {
                                                _boo = false;
                                            }
                                            if (!_boo) {
                                                _perfectInfo.show();
                                            } else {
                                                _perfectInfo.hide();
                                            }

                                            _this.close();
                                            if (!isEmpty(opts.afterFocus)) {
                                                $("[" + opts.afterFocus + "]").focus();
                                            }
                                            opts.done(data);
                                        });
                                    break;
                                case "圈子列表":
                                    _box.find(".model-list-body")
                                        .append('<tr>' +
                                            '<td>' + returnValue(data.t_title) + '</td>' +
                                            '<td>' + (data.t_isRelease == 1 ? '<span class="ok">已发布</span>' : '<span class="error">未发布</span>') + '</td>' +
                                            '</tr>')
                                        .find("tr:last")
                                        .on("click", function () {
                                            var topiclistlength = $(".topiclist_modle").length;//已选中的圈子数量
                                            if (topiclistlength>=5){
                                                $.hint.tip("最多发布5条", "error");
                                                return;
                                            }
                                            var html="";
                                            if (topiclistlength<1){
                                                html += "     <div class='topiclist_modle' ondrop='drop(event,this)' ondragover='allowDrop(event)' draggable='true' ondragstart='drag(event, this)'  >"
                                                html += "         <img class='nodas'  style='width:79px;height: 79px;float: left' src='"+data.t_cover+"'/><span style='width:170px;float: right' topic_id='"+data.t_id+"'>"+data.t_title+"</span>"
                                                html += "     </div>"
                                                /*<!--ondragstart='return false;'-->*/
                                            }else {
                                                html += "     <div class='topiclist_modle'   ondrop='drop(event,this)' ondragover='allowDrop(event)' draggable='true' ondragstart='drag(event, this)' >"
                                                html += "         <img style='width:79px;height: 79px;float: left' src='"+data.t_coverSmall+"'/><span style='width:170px;float: right' topic_id='"+data.t_id+"'>"+data.t_title+"</span>"
                                                html += "     </div>"
                                            }
                                            $("#topiclist").append(html)

                                            _this.close();
                                            if (!isEmpty(opts.afterFocus)) {
                                                $("[name=" + opts.afterFocus + "]:eq(0)").focus();
                                            }
                                        });
                                    break;
                            }
                        });
                    }
                });
            };

            // 事件绑定
            _this.addEvent = function () {
                _box = $("#model-box");
                _box.find(".model-close").on("click", function () {
                    _this.close();
                });
                // 上一页
                _box.find(".fa-angle-left").on("click", function () {
                    var pageNo = returnNumber(_box.find("#pageNo").val());
                    if (pageNo <= 1) {
                        return;
                    }
                    var totalPage = returnNumber(_box.find("#totalPage").text());
                    if (pageNo > totalPage) {
                        _box.find("#pageNo").val(totalPage);
                    } else {
                        _box.find("#pageNo").val(pageNo - 1);
                    }
                    _this.initData();
                });

                // 下一页
                _box.find(".fa-angle-right").on("click", function () {
                    var pageNo = returnNumber(_box.find("#pageNo").val());
                    var totalPage = returnNumber(_box.find("#totalPage").text());
                    if (pageNo >= totalPage) {
                        return;
                    }
                    _box.find("#pageNo").val(pageNo + 1);
                    _this.initData();
                });

                // 跳转
                _box.find("#pageNo").on("keyup", function () {
                    var pageNo = returnNumber(_box.find("#pageNo").val());
                    var totalPage = returnNumber(_box.find("#totalPage").text());
                    if (pageNo > totalPage || pageNo < 1) {
                        return;
                    }
                    ;
                    _box.find("#pageNo").val(pageNo);
                    _this.initData();
                });

                // 搜索
                _box.find("input[name=search-text]").on("keyup", function () {
                    _box.find("#pageNo").val(1);
                    _this.initData();
                });

                _box.find("input[name=search-text]").focus();

                switch (opts.title) {
                    case "管家信息":
                        // 点击select
                        $(".select>.selected").on("click", function (e) {
                            $(this).siblings(".option").toggle();
                            e.stopPropagation();
                        });
                        // 点击option
                        $(".select-option-item").on("click", function () {
                            var _select = $(this).parents(".select");
                            _select.find(".selected").attr("data-value", $(this).attr("data-value"));
                            _select.find(".selected").text($(this).text());
                            $(".select-option-item").show();
                            $(this).hide();
                            _select.find(".option").hide();
                            _box.find("#pageNo").val(1);
                            _this.initData();
                        });
                        break;
                }

                // 移动弹窗
//				_this.moveModel();
            };

            /** 移动弹窗 */
            _this.moveModel = function () {
                $("#model-box").find(".model-head").mousedown(function (e) {
                    var move = true;
                    var _content = $("#model-box").find(".model-content");
                    console.log("X, " + e.pageX + "  Y, " + e.pageY);
                    var _x = e.pageX - _content.offset().left;
                    var _y = e.pageY - _content.offset().top;
                    $(window).mousemove(function (event) {
                        if (move) {
                            var x = event.pageX - _x;// 控件左上角到屏幕左上角的相对位置
                            var y = event.pageY - _y;
//							console.log("x, " + x + "  y, " + y);
//							if(x < 0){
//								x = 0;
//							}
//							if(x > (_box.width() - _content.width())){
//								x = _box.width() - _content.width();
//							}
//							if(y < 0){
//								y = 0;
//							}
//							if(y > (_box.height() - _content.height())){
//								y = _box.height() - _content.height();
//							}
                            _content.css({
                                "top": y,
                                "left": x
                            });
                        }
                    }).mouseup(function () {
                        move = false;
                    });
                });
            };

            // 关闭弹窗
            _this.close = function () {
                $("#model-box").remove();
            };
            // 执行
            _this.init();
        });
    };
})($, document);

/** 客户银行卡选择插件*/
;(function ($, document) {
    $.fn.editCustomerModel = function (options) {
        return this.each(function () {
            var _this = $(this);
            var _self = this;

            var defaults = {
                data: {},
                result: function () {
                }
            };
            var opts = $.extend(defaults, options);

            this.init = function () {
                this.createHTML();
            };
            /* 生成html*/
            this.createHTML = function () {
                if (isEmpty(opts.data)) {
                    $.jBox.tip("参数错误，请刷新重试");
                    return;
                }

                var html = "";
                html += '<div id="model-box">';
                html += '    <div class="model-content">';
                html += '    		<div class="model-head">';
                html += '    			<span class="model-title">选择银行卡</span>';
                html += '    			<button class="model-close"></button>';
                html += '    		</div>';
                html += '    		<div class="model-main">';
                if (!isEmpty(opts.data.cc_name)) {
                    html += '    			<dl class="model-main-dl">';
                    html += '    				<dt>客户姓名</dt>';
                    html += '    				<dd>';
                    html += '    					<input class="model-input" value="' + opts.data.cc_name + '" readonly>';
                    html += '    				</dd>';
                    html += '    			</dl>';
                }
                html += '    			<dl class="model-main-dl">';
                html += '    				<dt>银行卡</dt>';
                html += '    				<dd>';
                html += '    					<select class="model-input" name="bankCardList"></select>';
                html += '    				</dd>';
                html += '    			</dl>';
                html += '    			<div class="model-add-box" data-title="添加银行卡" style="display:none">';
                html += '    			    <dl class="model-main-dl">';
                html += '    			    	<dt>使用状态</dt>';
                html += '    			    	<dd>';
                html += '    			    		<select class="model-input" name="cbc_state" readonly>';
                html += '    			    			<option value="0">常用</option>';
                html += '    			    			<option value="1">备用</option>';
                html += '    			    		</select>';
                html += '    			    	</dd>';
                html += '    			    </dl>';
                html += '    			    <dl class="model-main-dl">';
                html += '    			    	<dt><em>*</em>开户姓名</dt>';
                html += '    			    	<dd>';
                html += '    			    		<input type="hidden" name="cbc_id">';
                html += '    			    		<input class="model-input" name="cbc_name" placeholder="开户姓名" required>';
                html += '    			    	</dd>';
                html += '    			    </dl>';
                html += '    			    <dl class="model-main-dl">';
                html += '    			    	<dt><em>*</em>银行卡号</dt>';
                html += '    			    	<dd>';
                html += '    			    		<input class="model-input" name="bankCard" maxlength="26" style="width: 230px;" placeholder="银行卡号" required>';
                html += '    			    		<label class="common-checkbox" style="top: 6px;"><input type="checkbox" name="noBank">非银行卡</label>';
                html += '    			    		<hr>';
                html += '    			    		<div class="model-suffix-box" style="display:none"></div>';
                html += '    			    	</dd>';
                html += '    			    </dl>';
                html += '    			    <dl class="model-main-dl">';
                html += '    			    	<dt>开户网点</dt>';
                html += '    			    	<dd>';
                html += '    			    		<input class="model-input" data-type="ok" name="cbc_address" style="width: 400px;" placeholder="开户网点">';
                html += '    			    	</dd>';
                html += '    			    </dl>';
                html += '    			</div>';
                html += '    		</div>';
                html += '    		<div class="model-foot" style="padding-left: 100px;">';
                html += '            	<button class="model-button" name="bankCard-change">选择</button>';
                html += '            	<button class="model-button" name="bankCard-edit" style="background: #F39C12;display:none">编辑银行卡</button>';
                html += '    			<button class="model-button" name="bankCard-add" style="background: #1ABC9C;">添加银行卡</button>';
                html += '    			<button class="model-button" name="bankCard-cancel" style="background: #E74C3C;margin-left: 10px;display:none">取消</button>';
                html += '    		</div>';
                html += '    </div>';
                html += '</div>';
                $("#model-box").remove();
                $(html).appendTo("body").fadeIn();

                var _model_content = $("#model-box").find(".model-content");
                _model_content.css({marginLeft: -_model_content.width() / 2});

                // 【获取客户银行卡信息】
                _self.queryCustomerBankList();

                // 【添加事件】
                _self.addEvent();
            };
            /** 绑定事件*/
            this.addEvent = function () {
                // 关闭
                $("#model-box").find(".model-close").click(function () {
                    $("#model-box").remove();
                });
                // 银行卡分段
                $(".model-input[name=bankCard]").bankInput();
                // SELECT自定义
                $("#model-box").find("select").niceSelect();
                // 添加银行卡
                $("[name=bankCard-add]").click(function () {
                    var _add_box = $(".model-add-box");
                    if (!_add_box.is(":visible")) {
                        // 【显示添加】
                        $("[name^=bankCard-]").hide();
                        $("[name=bankCard-add]").show();
                        $("[name=bankCard-cancel]").show();
                        $(this).text("保存").css({background: "#3498DB"});

                        _add_box.fadeIn(400);
                        $("[name=cbc_name]").focus();
                        $("select[name=bankCardList]").attr("disabled", "disabled").niceSelect("update");
                    } else {
                        // 【确认添加】
                        _self.submitCustomerBank();
                    }
                });
                // 编辑银行卡
                $("[name=bankCard-edit]").click(function () {
                    var _add_box = $(".model-add-box");
                    if (!_add_box.is(":visible")) {
                        $("[name^=bankCard-]").hide();

                        $("[name=bankCard-edit]").show();
                        $("[name=bankCard-cancel]").show();
                        $(this).text("保存").css({background: "#3498DB"});

                        _add_box.fadeIn(400);

                        var _bank = $("select[name=bankCardList] option:selected").data("bank");
                        if (!isEmpty(_bank)) {
                            _add_box.find("[name=cbc_id]").val(returnValue(_bank.cbc_id));
                            _add_box.find("[name=cbc_name]").val(returnValue(_bank.cbc_name));
                            _add_box.find("[name=bankCard]").val(returnValue(_bank.cbc_cardNum)).bankInput();
                            _self.queryCustomerBankTypeList(_add_box.find("[name=bankCard]"));

                            _add_box.find("[name=bankCard]").attr("data-bank", returnValue(_bank.cbc_bankName));
                            _add_box.find("[name=bankCard]").attr("data-grade", returnValue(_bank.cbc_grade));
                            _add_box.find("[name=bankCard]").attr("data-type", returnValue(_bank.cbc_type));
                            _add_box.find("[name=cbc_address]").val(returnValue(_bank.cbc_address));
                            _add_box.find("[name=cbc_state] option[value=" + returnNumber(_bank.cbc_state) + "]").attr("selected", "selected");
                            _add_box.find("[name=cbc_state]").niceSelect("update");
                        }
                        $("select[name=bankCardList]").attr("disabled", "disabled").niceSelect("update");
                    } else {
                        // 【确认添加】
                        _self.submitCustomerBank();
                    }
                });
                // 取消银行卡
                $("[name=bankCard-cancel]").click(function () {
                    var _add_box = $(".model-add-box");
                    if (_add_box.is(":visible")) {
                        _add_box.fadeOut(100);

                        $("[name^=bankCard-]").fadeIn();
                        $("[name=bankCard-cancel]").hide();

                        $("[name=bankCard-edit]").css({background: "#f39c12"}).text("编辑银行卡");
                        $("[name=bankCard-add]").css({background: "#1ABC9C"}).text("添加银行卡");

                        _add_box.find("input").val("");
                        _add_box.find(".model-suffix-box").html("");
                        $("select[name=bankCardList]").removeAttr("disabled").niceSelect("update");
                    }
                });
                // 选择银行卡
                $("#model-box").find("[name=bankCard-change]").click(function () {
                    var _data = $("[name=bankCardList] option:selected").data("bank");
                    if (isEmpty(_data)) {
                        $.jBox.tip("请选择银行卡");
                        return;
                    }
                    opts.result(_data);
                    $("#model-box").remove();
                });
                // 银行卡查询事件
                $(".model-input[name=bankCard]").on('input propertychange', function () {
                    _self.queryCustomerBankTypeList(this);
                });
            };

            /** 提交客户银行卡数据*/
            this.submitCustomerBank = function (obj) {
                var boo = true;
                var _box = $(".model-add-box");
                _box.find("input.model-input[required]:visible").each(function () {
                    if (isEmpty($(this).val().NoSpace())) {
                        $(this).msg("不能为空");
                        boo = false;
                        return false;
                    }
                });
                if (!boo) {
                    return;
                }
                if (!_box.find("[name=noBank]").is(":checked")) {
                    if (isEmpty(_box.find("[name=bankCard]").attr("data-bank"))) {
                        $.jBox.tip("请输入正确的银行卡号");
                        return;
                    }
                }
                $.ajax({
                    type: "POST",
                    url: "/customer/updateCustomerBankCard",
                    data: {
                        cbc_id: _box.find("[name=cbc_id]").val(),
                        cc_id: opts.data.cc_id,
                        cbc_name: _box.find("[name=cbc_name]").val(),
                        cbc_cardNum: _box.find("[name=bankCard]").val().NoSpace(),
                        cbc_bankName: _box.find("[name=bankCard]").attr("data-bank"),
                        cbc_grade: _box.find("[name=bankCard]").attr("data-grade"),
                        cbc_type: _box.find("[name=bankCard]").attr("data-type"),
                        cbc_address: _box.find("[name=cbc_address]").val(),
                        cbc_state: _box.find("[name=cbc_state]").val()
                    },
                    dataType: "json",
                    beforeSend: function () {
                        $.jBox.tip("保存中...", "loading");
                        $(obj).attr("disabled", "disabled");
                    }
                }).done(function (result) {
                    if (result.code != 200) {
                        $.jBox.tip(result.msg, "error");
                        return;
                    }
                    $.jBox.tip("保存成功", "success");
                    _self.queryCustomerBankList();
                    $("[name=bankCard-cancel]").click();
                }).always(function () {
                    $(obj).removeAttr("disabled", "disabled");
                });
            };

            /** 获取客户银行卡类型数据*/
            this.queryCustomerBankTypeList = function (obj) {
                var _suffix_box = $(".model-suffix-box");
                var bankCard = $(obj).val().NoSpace();
                if (bankCard.length >= 2) {
                    $.ajax({
                        type: "POST",
                        url: "/bank/bankMessage",
                        data: {
                            bankCode: bankCard,
                        },
                        dataType: "json"
                    }).done(function (result) {
                        if (isEmpty(result.bank)) {
                            $(".model-suffix-box").hide().html("");
                            $(obj).msg("没有发现该银行卡号的银行信息");
                            $(".model-input[name=bankCard]").attr({
                                "data-grade": "",
                                "data-type": "",
                                "data-bank": ""
                            });
                            return;
                        }
                        $(obj).msgClose();

                        var html = "";
                        html += '<label class="model-suffix"><img src="' + (isEmpty(result.bank.bl_path) ? "" : "http://www.cqgjp.com/resources/bankImage/" + result.bank.bl_path) + '" alt="' + result.bank.bank_Name + '"/></label>';
                        html += '<label class="model-suffix model-suffix-title">' + result.bank.bank_CardType + '-' + result.bank.bank_CardName + '</label>';
                        $(".model-suffix-box").html(html).fadeIn();

                        $(".model-input[name=bankCard]").attr({
                            "data-grade": result.bank.bank_CardType,
                            "data-type": result.bank.bank_CardName,
                            "data-bank": result.bank.bank_Name
                        });
                    });
                } else {
                    $(".model-suffix-box").hide().html("");
                    $(".model-input[name=bankCard]").attr({
                        "data-grade": "",
                        "data-type": "",
                        "data-bank": ""
                    });
                }
            };

            /** 获取客户银行卡列表数据*/
            this.queryCustomerBankList = function () {
                $.ajax({
                    type: "POST",
                    url: "/customer/queryCustomerBankCard",
                    data: {
                        cc_id: opts.data.cc_id,
                    },
                    dataType: "json"
                }).done(function (result) {
                    if (result.code != 200 || isEmpty(result.data)) {
                        $("select[name=bankCardList]").niceSelect("destroy").hide();
                        $("select[name=bankCardList]").next("hr").hide();
                        return;
                    }
                    $("select[name=bankCardList]").html("");
                    $.each(result.data, function (index, data) {
                        var _cbc_state = "";
                        switch (data.cbc_state) {
                            case 0:
                                _cbc_state = '<label class="ok">常用</label>';
                                break;
                            case 1:
                                _cbc_state = '<label class="hint">备用</label>';
                                break;
                        }
                        $("select[name=bankCardList]").append('<option value="' + data.cbc_id + '">' + returnValue(data.cbc_name) + ' - ' + returnValue(data.cbc_cardNum) + ' - ' + returnValue(data.cbc_bankName) + ' - ' + _cbc_state + '</option>');
                        $("select[name=bankCardList] option:last").data("bank", data);
                    });
                    $("select[name=bankCardList]").next("hr").show();
                    $("select[name=bankCardList]").niceSelect();
                    $("select[name=bankCardList]").niceSelect("update");
                    $("[name=bankCard-edit]").show();
                });
            };
            this.init();
        });
    };
})($, document);