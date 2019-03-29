$(function () {
    load_data();
});

function load_data() {
    // 时间
    var filterDateParams = [
        {name: "录入时间", value: "contractObject_CreateTime", sort: 'DESC'},
    ];
    // 标题
    var listParams = [
        {text: "合同编号", name: "contractObject_No", param: "", func: {type: "onclick", name: "$.table.popupOpen(this)"}},
        {text: "小区房号", name: "house_address", param: ""},
        {text: "附加协议审核状态", name: "caa_state", param: {
            1: {text: "待审核"},
            2: {text: "未通过"},
            3: {text: "已通过"},
            4: {text: "已取消"},
        }
        },
        {text: "合同类型", name: "contractObject_Type", param: ""},
        {text: "房屋状态", name: "contractObject_ExtState", param: "returnContractExtendState"},
        {text: "合同状态", name: "contractObject_State", param: "returnContractState"},
        {text: "操作状态", name: "contractObject_OptionState", param: "returnContractOptionState"},
        {text: "管家信息", name: "em_name{/}em_phone", param: ""},
        {text: "合同归属部门", name: "ucc_name", param: ""},
        {text: "签订日期", name: "contractObject_FillTime", param: "date"},
    ];
    var filterBars = [];
    filterBars.push({
        name: "caa_state", type: "select", selected: "1", data: {
            0: "全部状态",
            1: "待审核",
            2: "未通过",
            3: "已通过",
        }
    });

    $.table({
        filterDateParams: filterDateParams,
        listParams: listParams,
        filterBars: filterBars,
        filterWhere: true,
        ajaxParams: {
            url: "/contractObject/managerExamineList",
        },
        popup: {
            result: function (box, _data) {
                loadingData(box.main, _data);
            },
            close: function () {
                $.table.loadData();
            }
        }
    });
}

/**
 * 加载弹出层
 *
 * @param box
 * @param _data
 */
var caa_id;
var con_code;
var caa_state;
var caa_content;

function loadingData(box, _data) {
    caa_id = _data.caa_id;
    con_code = _data.contractObject_Code;
    caa_state = _data.caa_state;
    caa_content = _data.caa_content;
    // 查询合同信息
    $.ajax({
        type: "POST",
        url: "/contractObject/queryContractInfo",
        data: {
            cno: _data.contractObject_No,
            con_code: _data.contractObject_Code
        },
        dataType: "json",
        beforeSend: function () {
            $("#contract-content").html('<div class="loading"></div>');
        }
    }).done(function (result) {
        if (result.code == 200) {
            var html = '';
            html += '<div class="context-div">';
            <!-- 合同信息 -->
            html += '<div class="sb-title" id="contract-title"></div>';
            html += '    <div class="sb-content" id="contract-content"></div>';
            <!-- 其他信息 -->
            html += '    <div class="sub-title" id="other-title"></div>';
            html += '    <div class="content-sub">';
            html += '    </div>';
            html += '</div>';
            <!--记录-->
            html += '<div class="sb-title">';
            html += '<ul class="title-nav" style="float:left;width: 98%;">';
            html += '	<li class="visited">' + "处理信息";
            html += '	</li>';
            html += '</ul>';
            html += '</div>';
            html += '<div style="float:left;">';
            html += '<table class="cont-table">';
            html += '    <tr style="background: #f5f8fa;line-height: 36px;">';
            html += '        <th>日期</th>';
            html += '        <th>审核内容</th>';
            html += '        <th>状态</th>';
            html += '        <th>审核描述</th>';
            html += '    </tr>';
            if (!isEmpty(result.data.agreementAuditingRecordList)) {
                var resultList = result.data.agreementAuditingRecordList;
                for (var i = 0; i < resultList.length; i++) {
                    var state = '';
                    if (resultList[i].caar_state == 2) {
                        state = '未通过';
                    } else if (resultList[i].caar_state == 3) {
                        state = '已通过';
                    }
                    html += '<tr>';
                    html += '    <td>' + returnDate(resultList[i].caar_createTime) + '</td>';
                    html += '    <td><div class="td-content-div" title="'+returnValue(resultList[i].caar_content)+'">' + returnValue(resultList[i].caar_content) + '</div></td>';
                    html += '    <td>' + state + '</td>';
                    html += '    <td><div class="td-div" title="' + returnValue(resultList[i].caar_deac) + '">' + returnValue(resultList[i].caar_deac) + '</div></td>';
                    html += '</tr>';
                }
            } else {
                html += '<tr>';
                html += '    <td colspan="4" style="text-align: center;">' + "暂无处理记录" + '</td>';
                html += '</tr>';
            }
            html += '</table>';
            html += '</div>';
            html += '<hr>';
            <!--审核-->
            if (caa_state != 3) {
                html += '<div class="bx-content" style="margin-bottom: 25px;width: 1020px;">';
                html += '   <div class="sb-title">';
                html += '     <ul class="title-nav"><li class="visited">附加条款审核</li></ul>';
                html += '   </div>';
                html += '   <div class="sub-content" style="box-shadow: 0 0 0 1px #ddd;">';
                html += '   <dl class="main-box-list">';
                html += '  	    <dt class="item" style="width: 65px;">';
                html += '  	    	<span class="item-titile">处理结果</span>';
                html += '  	    </dt>';
                html += '  	    <dd class="item">';
                html += '  	    	<select class="form-control" id="processResult">';
                html += '  	    	<option value="3">审核通过</option>';
                html += '  	    	<option value="2">未通过</option>';
                html += '  	    	</select>';
                html += '  	    </dd>';
                html += '  	    <dd class="tisp tips"></dd>';
                html += '   </dl>';
                html += '   <hr>';
                html += '   <dl class="main-box-list" id="resultContent" style="display: none;">';
                html += '  	    <dt class="item" style="width: 65px;">';
                html += '  	    	<em>*</em>';
                html += '  	    	<span class="item-titile">原因</span>';
                html += '  	    </dt>';
                html += '  	    <dd class="item">';
                html += '  	    	<textarea class="form-control" id="resultMsg" rows="5" onkeyup="javascript:setShowLength(this, 250, \'cost_tpl_title_length\');" style="width: 400px;height: 130px;" required></textarea>';
                html += '  	    </dd>';
                html += '  	    <dd class="tispp tips"><span class="red" id="cost_tpl_title_length">还可以输入250字数</span></dd>';
                html += '   </dl>';
                html += '   <dl class="main-box-list main-bottom">';
                html += '  	    <dd class="item-dd" style="margin-left: 77px;">';
                html += '  	    	<input type="button" value="确认" class="btn" onclick="additionalExamine();"/>';
                html += '  	    	<span class="error-tisp"></span>';
                html += '  	    </dd>';
                html += '  	    <dd class="item-dd">';
                html += '  	    	<input type="button" class="btn cancel" value="取消" onclick="close();">';
                html += '  	    </dd>';
                html += '   </dl>';
                html += '  </div>';
                html += '</div>';
            }
            box.html(html);

            // 显示合同数据
            $("#contract-content").displayContract({
                data: {
                    cno: _data.contractObject_No
                }
            });
            // 加载事件
            managerExamine();
        }
    });
}

// 加载事件
function managerExamine() {
    // 通过、未通过
    $("#processResult").on("change", function () {
        var _val = $(this).val();
        if (_val == 2) {
            $("#resultContent").show();
            $("#resultMsg").focus();
        } else {
            $("#resultContent").hide();
            $("#resultMsg").val("");
        }
    });
};

//取消按钮
function close() {
    $.table.loadData();
}

//提交审核
function additionalExamine() {
    // 结果
    var _processResult = $("#processResult option:selected").val();
    var content = $('#resultMsg').val();
    if (_processResult == 2 && content == '') {
        $.jBox.alert("内容不能为空", "提示", "warning");
    }
    $.ajax({
        type: "POST",
        url: "/contractObject/updateAdditionalExamine",
        data: {
            caa_id: caa_id,
            con_code: con_code,
            caa_state: _processResult,
            caa_deac: content,
            caa_content: caa_content
        },
        dataType: "json"
    }).done(function (result) {
        if (result.code == 200) {
            $.jBox.prompt("审核完成", "提示", "success", {
                closed: function () {
                    window.location.href = "/contractObject/managerExamine";
                }
            });
        }
    });
}

//文本框输入设置
function setShowLength(obj, maxlength, id) {
    var rem = maxlength - obj.value.length;
    var wid = id;
    if (rem < 0) {
        rem = 0;
    }
    $('#cost_tpl_title_length').html("还可以输入" + rem + "字数");
}
