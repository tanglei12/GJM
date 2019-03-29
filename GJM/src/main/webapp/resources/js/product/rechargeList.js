$(function () {
    // 加载数据
    load_data();
});

/**
 * 加载数据
 */
function load_data() {
    $.table({
        // 时间筛选
        filterDateParams: [
            {name: "创建时间", value: "pr_create_time", sort: 'DESC'}
        ],
        // 选项筛选
        filterBars: [],
        // 列表参数
        listParams: [
            {
                text: "产品名称",
                name: "pr_name",
                param: "",
                func: {type: "onclick", name: "$.table.popupOpen(this)"}
            },
            {text: "产品渠道", name: "pr_channel", param: "returnPayFlowStatementSource"},
            {text: "产品金额(元)", name: "pr_price", param: ""},
            {text: "产品状态", name: "pr_status", param: "returnPrStatus"},
            {text: "充值优惠", name: "pr_benefit", param: "returnPrStatus"},
            {text: "创建时间", name: "pr_create_time", param: "time"},
        ],
        // 请求参数
        ajaxParams: {
            url: "/product/queryProductRechargePageList",
            data: {}
        },
        popup: {
            result: function (box, _data) {
                load_recharge_popup(box.main, _data);
            }
        }
    });
}

/**
 * 加载充值详情弹出层
 *
 * @param box
 * @param _data
 */
function load_recharge_popup(box, _data) {
    box.css({
        display: "flex",
        flexDirection: "column",
        overflowY: "hidden"
    });
    var prChannel = _data.pr_channel;
    var html = '';
    html += "<div class='popup-list' style='padding: 0 0 6px 0'>";
    html += "    <div style='font-size: 16px;font-weight: bold;line-height: 30px;'>[产品名称]<a";
    html += "            href='JavaScript:load_rechargeUpdate(" + _data.pr_id + ")'>" + _data.pr_name + "</a>";
    html += "    </div>";

    html += "    <button class='popup-print next-bg' onclick='load_rechargeUpdate(" + _data.pr_id + ")'>修改</button>";
    html += "</div>";
    html += "";

    html += "<div class='popup-list'>";
    html += "       <div class='popup-miniTitle'><span>产品</span></div>";
    html += "       <dl>";
    html += "           <dt>产品渠道</dt><dd class='" + returnPayFlowStatementSource(prChannel).style + "'>" + returnPayFlowStatementSource(prChannel).text + "</dd>";
    html += "       </dl>";
    html += "       <dl>";
    html += "           <dt>充值金额</dt><dd>" + returnValue(_data.pr_price) + "元</dd>";
    html += "       </dl>";
    html += "       <dl>";
    html += "           <dt>充值产品状态</dt><dd class='" + returnPrStatus(_data.pr_status).style + "'>" + returnPrStatus(_data.pr_status).text + "</dd>";
    html += "       </dl>";
    html += "       <dl>";
    html += "           <dt>充值产品描述</dt><dd>" + returnValue(_data.pr_description) + "</dd>";
    html += "       </dl>";
    html += "</div>";

    html += "<div class='popup-list'>";
    html += "       <div class='popup-miniTitle'><span>优惠</span></div>";
    html += "       <dl>";
    html += "           <dt>充值优惠</dt><dd class='" + returnPrStatus(_data.pr_benefit).style + "'>" + returnPrStatus(_data.pr_benefit).text + "</dd>";
    html += "       </dl>";
    html += "       <dl class='benefit-close'>";
    html += "           <dt>优惠名称</dt><dd>" + returnValue(_data.pr_benefit_name) + "</dd>";
    html += "       </dl>";
    html += "       <dl class='benefit-close'>";
    html += "           <dt>优惠方式</dt><dd>" + returnPrBenefitWay(_data.pr_benefit_way).text + "</dd>";
    html += "       </dl>";
    if (_data.pr_benefit_way == 1) {
        html += "       <dl class='benefit-close'>";
        html += "           <dt>充值优惠值</dt><dd>" + returnValue(_data.pr_benefit_max_price) + "元</dd>";
        html += "       </dl>";
    }
    if (_data.pr_benefit_way == 2) {
        html += "       <dl class='benefit-close'>";
        html += "           <dt>充值最小优惠值</dt><dd>" + returnValue(_data.pr_benefit_min_price) + "元</dd>";
        html += "       </dl>";
        html += "       <dl class='benefit-close'>";
        html += "           <dt>充值最大优惠值</dt><dd>" + returnValue(_data.pr_benefit_max_price) + "元</dd>";
        html += "       </dl>";
    }
    html += "       <dl class='benefit-close'>";
    html += "           <dt>优惠次数</dt><dd>" + returnBenefitNumber(_data.pr_benefit_user_limit).text + "</dd>";
    html += "       </dl>";
    html += "</div>";

    html += "<div class='popup-list' style='display: none'>";
    html += "       <div class='popup-miniTitle'><span>备注</span></div>";
    html += "       <dl>";
    html += "           <dt>备注</dt><dd>" + returnValue(_data.pr_remarks) + "</dd>";
    html += "       </dl>";
    html += "</div>";
    box.html(html);
    if (_data.pr_benefit == 1) {
        $(".benefit-close").show();
    } else {
        $(".benefit-close").hide();
    }
    // 关闭刷新特效
    $.popupRefreshClose();
}

/**
 * 修改充值管理
 *
 * @param box
 * @param _data
 */
function load_rechargeUpdate(pr_id) {
    $.popupBox({
        target: $(".custom-table-body"),
        data: {},
        done: function (box) {
            $.ajax({
                type: "post",
                url: "/product/queryProductRecharge",
                data: {
                    pr_id: pr_id
                },
                dataType: "json"
            }).done(function (result) {
                if (result.code != 200) {
                    $.hint.tip("数据加载失败,请刷新重试", "error");
                    return;
                }
                var _data = result.data.productRechargeVo;
                box.main.html(loadHtml(_data));
                //返回产品渠道
                returnPrChannel();
                //充值产品号

                //匹配优惠次数
                returnSelect('pr_benefit_user_limit', _data.pr_benefit_user_limit);
                //匹配产品渠道
                returnSelect('pr_channel', _data.pr_channel);
                //匹配充值产品状态
                returnInput('pr_status', _data.pr_status);
                //充值优惠
                returnInput('pr_benefit', _data.pr_benefit);
                //优惠方式
                returnInput('pr_benefit_way', _data.pr_benefit_way);
                //充值优惠开启pr_benefit==1时优惠展示,否则隐藏
                if (_data.pr_benefit == 1) {
                    $(".benefit-close").show();
                } else {
                    $(".benefit-close").hide();
                }

                //加载加载默认充值优惠值和改变优惠方式
                changePrBenefitWay(_data);

                //充值优惠值与最小/最大充值优惠值
                if (_data.pr_benefit_way == '1') {
                    $("input[name=pr_benefit_max_price]").val(_data.pr_benefit_max_price);
                } else {
                    $("input[name=pr_benefit_min_price]").val(_data.pr_benefit_min_price);
                    $("input[name=pr_benefit_max_price]").val(_data.pr_benefit_max_price);

                }
                // 关闭刷新特效
                $.popupRefreshClose();

            })
        }
    });

}


/** 添加充值 */
function addProduct() {
    $.popupBox({
        target: $(".custom-table-body"),
        data: {},
        done: function (box, data) {

            box.main.html(loadHtml());

            //返回产品渠道
            returnPrChannel();

            //自定义radio按钮默认选第一个
            initCheckbox();

            //加载加载默认充值优惠值和改变优惠方式
            changePrBenefitWay();
            // 关闭刷新特效
            $.popupRefreshClose();
        }
    });
}

//添加和修改公共html
function loadHtml(data) {
    var _data = data || "";
    var html = "";
    html += "<div id='main-box-content'>";
    html += "<input type='hidden' id='pr_sn' value='" + returnValue(_data.pr_sn) + "' >";
    html += "    <dl class='content-dl'>";
    html += "        <div class='first-title'><span>" + (isEmpty(returnValue(_data.pr_id)) ? '添加充值管理' : '修改充值管理') + "<!--这里是标题--></span></div>";
    html += "    </dl>";
    html += "    <dl class='content-dl'>";
    html += "        <dt>充值产品状态</dt>";
    html += "        <dd style='padding-top: 5px'>";
    html += "                <label class='common-checkbox' style='margin-left: 0px;'> <input type='radio' name='pr_status' value='1' checked='checked'>开启</label>";
    html += "                <label class='common-checkbox' style='margin-left: 20px;'> <input type='radio' name='pr_status' value='2' >关闭</label>";
    html += "                <label class='common-checkbox' style='margin-left: 20px;'> <input type='radio' name='pr_status' value='3' >暂停</label>";
    html += "        </dd>";
    html += "        <dd>";
    html += "            <div class='from-data-state'></div>";
    html += "        </dd>";
    html += "    </dl>";
    html += "    <dl class='content-dl'>";
    html += "        <dt>产品渠道</dt>";
    html += "        <dd>";
    html += "            <select class='from-data' name='pr_channel' id='pr_channel'>";
    html += "            </select>";
    html += "        </dd>";
    html += "    </dl>";
    html += "    <dl class='content-dl'>";
    html += "         <dt><em>*</em>充值名称</dt>";
    html += "          <dd>";
    html += "             <input type='text' class='from-data' name='pr_name' placeholder='' value='" + returnValue(_data.pr_name) + "' >";
    html += "          </dd>";
    html += "    </dl>";
    html += "    <dl class='content-dl'>";
    html += "         <dt><em>*</em>充值金额</dt>";
    html += "          <dd>";
    html += "             <input type='text' class='from-data' name='pr_price' placeholder='' value='" + returnValue(_data.pr_price) + "' >";
    html += "          </dd>";
    html += "    </dl>";
    html += "    <dl class='content-dl'>";
    html += "        <dt>充值优惠</dt>";
    html += "        <dd style='padding-top: 5px'>";
    html += "                <label class='common-checkbox' style='margin-left: 0px;'> <input type='radio' name='pr_benefit' value='1' onclick='showOrHide(this)' checked='checked'>开启</label>";
    html += "                <label class='common-checkbox' style='margin-left: 20px;'> <input type='radio' name='pr_benefit' value='2' onclick='showOrHide(this)' >关闭</label>";
    html += "        </dd>";
    html += "        <dd>";
    html += "            <div class='from-data-state'></div>";
    html += "        </dd>";
    html += "    </dl>";
    html += "    <dl class='content-dl benefit-close'>";
    html += "         <dt><em>*</em>充值优惠名称</dt>";
    html += "          <dd>";
    html += "             <input type='text' class='from-data' name='pr_benefit_name' placeholder='' value='" + returnValue(_data.pr_benefit_name) + "' >";
    html += "          </dd>";
    html += "    </dl>";
    html += "    <dl class='content-dl benefit-close'>";
    html += "        <dt>优惠方式</dt>";
    html += "        <dd style='padding-top: 5px'>";
    html += "                <label class='common-checkbox' style='margin-left: 0px;'> <input type='radio' name='pr_benefit_way' value='1'  checked='checked'>固定赠送</label>";
    html += "                <label class='common-checkbox' style='margin-left: 0px;'> <input type='radio' name='pr_benefit_way' value='2'  checked='checked'>随机赠送</label>";
    html += "        </dd>";
    html += "        <dd>";
    html += "            <div class='from-data-state'></div>";
    html += "        </dd>";
    html += "    </dl>";
    html += "    <dl class='content-dl benefit-close' id='benefit-price'>";
    /* html += "         <dt><em>*</em>充值优惠值</dt>";
     html += "          <dd>";
     html += "             <input type='text' class='from-data' name='pr_benefit_price' placeholder='' value='"+returnValue(_data.pr_benefit_price)+"' >";
     html += "          </dd>";*/
    html += "    </dl>";

    html += "    <dl class='content-dl benefit-close'>";
    html += "        <dt>优惠次数</dt>";
    html += "        <dd>";
    html += "            <select class='from-data' name='pr_benefit_user_limit' id='pr_benefit_user_limit'>";
    html += "               <option value='1'>优惠一次</option>";
    html += "               <option value='-1'>无限制</option>";
    html += "            </select>";
    html += "        </dd>";
    html += "    </dl>";

    html += "    <dl class='content-dl'>";
    html += "        <dt>充值产品描述</dt>";
    html += "        <dd>";
    html += "            <textarea class='from-data' cols='3' name='pr_description' placeholder='充值产品描述' maxlength='50'>" + returnValue(_data.pr_description) + "</textarea>";
    html += "        </dd>";
    html += "    </dl>";
    html += "    <dl class='content-dl' style='display: none'>";
    html += "        <dt>备注</dt>";
    html += "        <dd>";
    html += "            <textarea class='from-data' cols='3' name='pr_remarks' placeholder='备注' maxlength='50'>" + returnValue(_data.pr_remarks) + "</textarea>";
    html += "        </dd>";
    html += "    </dl>";
    html += "    <dl class='content-dl'>";
    html += "        <dt></dt>";
    html += "        <dd>";
    html += "            <input type='button' id='submit' class='from-data' value='提交' onclick='submitProductRecharge()'>";
    html += "        </dd>";
    html += "    </dl>";
    html += "</div>";
    return html;
}

/**
 * 添加修改充值管理
 */
function submitProductRecharge() {
    var isNum = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;//验证金额正则
    var pr_name = $("input[name=pr_name]").val();
    //空值判断返回
    if (isEmpty(pr_name)) {
        $("input[name=pr_name]").msg("充值名称");
        return;
    }

    var pr_price = $("input[name=pr_price]").val();
    //空值判断返回
    if (isEmpty(pr_price)) {
        $("input[name=pr_price]").msg("充值金额");
        return;
    } else {
        //非法金额判断
        if (isNum.test(pr_price) == false) {
            $("input[name=pr_price]").msg("请填写正确格式的金额");
            return;
        }
    }

    var pr_benefit = $("input[name=pr_benefit]:checked").val();
    var pr_benefit_way = $("input[name=pr_benefit_way]:checked").val();
    var pr_benefit_name = $("input[name=pr_benefit_name]").val();
    var pr_benefit_min_price = $("input[name=pr_benefit_min_price]").val();
    var pr_benefit_max_price = $("input[name=pr_benefit_max_price]").val();

    //当充值优惠开启时,优惠名称/充值优惠值,空值判断返回
    if (pr_benefit == 1) {
        //优惠名称
        if (isEmpty(pr_benefit_name)) {
            $("input[name=pr_benefit_name]").msg("充值优惠名称");
            return;
        }
        //充值最小优惠值
        if (pr_benefit_way == 2) {
            if (isEmpty(pr_benefit_min_price)) {
                $("input[name=pr_benefit_min_price]").msg("充值优惠值");
                return;
            } else {
                //非法金额判断
                if (isNum.test(pr_benefit_min_price) == false) {
                    $("input[name=pr_benefit_min_price]").msg("请填写正确格式的金额");
                    return;
                }
            }
        }

        //充值最大优惠值
        if (isEmpty(pr_benefit_max_price)) {
            $("input[name=pr_benefit_max_price]").msg("充值优惠值");
            return;
        } else {
            //非法金额判断
            if (isNum.test(pr_benefit_max_price) == false) {
                $("input[name=pr_benefit_max_price]").msg("请填写正确格式的金额");
                return;
            }
        }

        //充值最大优惠值必须大于充值最小优惠值
        if (pr_benefit_way == 2) {
            if (parseFloat(pr_benefit_max_price) < parseFloat(pr_benefit_min_price)) {
                $("input[name=pr_benefit_max_price]").msg("充值最大优惠值必须大于等于充值最小优惠值");
                return;
            }
        }

    }

    var pr_description = $("textarea[name=pr_description]").val();
    var pr_status = $("input[name=pr_status]:checked").val();

    var pr_remarks = $("textarea[name=pr_remarks]").val();
    var pr_channel = $("#pr_channel").val();
    var pr_benefit_user_limit = $("select[name=pr_benefit_user_limit]").val();
    var pr_sn = $("#pr_sn").val();
    var em_id = $.cookie("em_id");

    var data = {
        pr_sn: pr_sn,
        pr_channel: pr_channel,
        pr_name: pr_name,
        pr_description: pr_description,
        pr_price: pr_price,
        pr_status: pr_status,
        pr_benefit: pr_benefit,
        pr_benefit_name: pr_benefit_name,
        pr_benefit_user_limit: pr_benefit_user_limit,
        pr_benefit_way: pr_benefit_way,
        pr_benefit_min_price: pr_benefit_min_price,
        pr_benefit_max_price: pr_benefit_max_price,
        //pr_order: pr_order,
        pr_remarks: pr_remarks,
        pr_modifier: em_id
    };
    $.ajax({
        type: "post",
        url: "/product/AddOrUpdateProductRecharge",
        data: data,
        dataType: "json"
    }).done(function (result) {
        if (result.code != 200) {
            $.hint.tip("失败", "error");
            return;
        }

        $.hint.tip(result.msg, "success");
        $.popupBoxClose();
        $.table.loadData();

    })
}

/**
 * 点击充值优惠开启(1)或关闭(2),pr_benefit==1时优惠展示,否则隐藏
 */
function showOrHide(val) {
    if ($(val).val() == 1) {
        $(".benefit-close").show();
    } else {
        $(".benefit-close").hide();
    }
}

//返回状态
function returnPrStatus(param) {
    var data = {};
    data.list = {1: "开启", 2: "关闭", 3: "暂停"};
    data.text = returnValue(data.list[param]);
    switch (returnNumber(param)) {
        case 1:
            data.style = 'next';
            break;

        case 2:
            data.style = 'hint';
            break;

        default :
            data.style = 'error';
            break;
    }
    return data;
}

//返回优惠方式状态
function returnPrBenefitWay(param) {
    var data = {};
    data.list = {1: "固定赠送", 2: "随机赠送"};
    data.text = returnValue(data.list[param]);
    switch (returnNumber(param)) {
        case 1:
            data.style = 'next';
            break;

        case 2:
            data.style = 'hint';
            break;

        default :
            data.style = 'error';
            break;
    }
    return data;
}

//返回优惠次数
function returnBenefitNumber(param) {
    var data = {};
    data.list = {'-1': "无限制", '1': "优惠一次"};
    data.text = returnValue(data.list[param]);
    switch (returnNumber(param)) {
        case '-1':
            data.style = 'next';
            break;

        case '1':
            data.style = 'hint';
            break;

        default :
            data.style = 'error';
            break;
    }
    return data;
}

//返回产品渠道
function returnPrChannel() {
    var option = "";
    $.each(returnPayFlowStatementSource().list, function (index, item) {
        if (index > 0) {
            option += "<option class='" + returnPayFlowStatementSource(index).style + "' value='" + index + "'>" + item + "</option>";
        }
    })
    $("select[name=pr_channel]").append(option);
}

//设置自定义input按钮默认选第一个
function initCheckbox() {
    var check = $("#main-box-content").find(".content-dl");
    check.each(function (index) {
        $(check[index]).find(".common-checkbox").each(function (index1) {
            if (index1 == 0) {
                $(this).addClass("common-checkbox-checked");
                $(this).find("input").attr("checked", "checked");
            }
        });
    })
}

//下拉选择匹配
function returnSelect(name, val) {
    $("select[name=" + name + "]>option").each(function () {
        if ($(this).val() == val) {
            $(this).attr("selected", "selected");
        }
    });
}

//input匹配
function returnInput(name, val) {
    $("input[name=" + name + "]").each(function () {
        if ($(this).val() == val) {
            $(this).attr("checked", "checked");
            $(this).parent().addClass("common-checkbox-checked");
        }
    });
}

//固定赠送充值优惠值
function benefitPriceHtml(_data) {
    console.log("固定");
    var _data = isEmpty(_data) ? "" : _data;
    var html = "";
    html += "         <dt><em>*</em>固定优惠值</dt>";
    html += "          <dd>";
    html += "             <input type='text' class='from-data' name='pr_benefit_max_price' placeholder='' value='"+returnValue(_data.pr_benefit_max_price)+"' >";
    html += "          </dd>";
    $("#benefit-price").html(html);
}

//随机赠送充值优惠值
function benefitMinAndMaxPriceHtml(_data) {
    console.log("随机");
    var _data = isEmpty(_data) ? "" : _data;
    var html = "";
    html += "         <dt><em>*</em>随机最小优惠值</dt>";
    html += "          <dd>";
    html += "             <input type='text' class='from-data' name='pr_benefit_min_price' placeholder='' value='"+returnValue(_data.pr_benefit_min_price)+"' >";
    html += "          </dd>";
    html += "         <dt><em>*</em>随机最大优惠值</dt>";
    html += "          <dd>";
    html += "             <input type='text' class='from-data' name='pr_benefit_max_price' placeholder='' value='"+returnValue(_data.pr_benefit_max_price)+"' >";
    html += "          </dd>";
    $("#benefit-price").html(html);

}

//加载加载默认充值优惠值和改变优惠方式
function changePrBenefitWay(_data) {

    //加载默认充值优惠值
    var pbw = $("input[name=pr_benefit_way]:checked").val();
    if (pbw == 1) {
        benefitPriceHtml(_data)
    } else {
        benefitMinAndMaxPriceHtml(_data)
    }

    //改变充值方式后,改变优惠值
    $("input[name=pr_benefit_way]").change(function () {//改变优惠方式,关联改变优惠值
        var pr_benefit_way = $("input[name=pr_benefit_way]:checked").val();
        if (pr_benefit_way == '1') {//优惠方式等于1时,显示固定赠送充值优惠值html
            benefitPriceHtml(_data)
        } else {//否则,显示随机赠送充值优惠值
            benefitMinAndMaxPriceHtml(_data);
        }
    });
}