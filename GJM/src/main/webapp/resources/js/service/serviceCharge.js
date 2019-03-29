$(function(){
    data();
    bindClickAddress();
});
/** 返回字符串 */
function returnValue(str) {
    return (str == null || typeof (str) == "undefined" || str == "undefined") ? "" : str + "";
}
function data(bools,ucc_id){
    var mode = getQueryString("mode");
    $("#content").table({
        search: true,
        dataBool : bools,
        dataTime: [
            {
                name: "发布日期",
                string: "createTime"
            }
        ],
        title: [
            {
                name: "编号",
                string: "",
                parameter: ""
            },
            /*{
                name: "创建时间",
                string: "createTime",
                parameter: ""
                /!*,
                format:"yyyy-MM-dd"*!/
            },*/
            {
                name: "小区房号",
                string: "house_address",
                parameter: "",
                href : "#"
            },
            {
                name: "合同编号",
                string: "contractObject_No",
                parameter: "",
            },
            {
                name: "客户名称",
                string: "cc_name",
                parameter: ""
            },
            {
                name: "类型",
                string: "serveType",
                parameter: {
                    1 : "包修费",
                    2 : "服务费",
                    3 : "其他"
                }
            },
            {
                name: "初始服务费(元)",
                string: "init_serveMoney",
                parameter: ""
            },
            {
                name: "已使用服务费(元)",
                string: "used_serveMoney",
                parameter: ""
            },
            {
                name: "剩余服务费(元)",
                string: "surplus_serveMoney",
                parameter: ""
            }
        ],
        url: "/service/queryServiceChargeList",
        data: {},
        success: function(result){}
    });
}

// 关闭添加用户窗口
function closeShowRecord() {
    $(".showRecord").animate({right: '-650px'}, 500, function () {

    }).hide();
}

function bindClickAddress(){
    $("td[data-text='house_address']").live({"click": function(obj){
            var con_no = $(obj.target).parent().next().text();
                queryRecord(con_no);
            var _box = $("#record-table-foot");

            // 【上一页】
            _box.find(".fa-angle-left").on("click", function () {
                var pageNo = returnNumber(_box.find("#record-pageNo").val());
                if (pageNo <= 1) {
                    return;
                }
                var totalPage = returnNumber(_box.find("#record-totalPage").text());
                if (pageNo > totalPage) {
                    _box.find("#record-pageNo").val(totalPage);
                } else {
                    _box.find("#record-pageNo").val(pageNo - 1);
                }
                queryRecord(con_no);
            });

            // 【下一页】
            _box.find(".fa-angle-right").on("click", function () {
                var pageNo = returnNumber(_box.find("#record-pageNo").val());
                var totalPage = returnNumber(_box.find("#record-totalPage").text());
                if (pageNo >= totalPage) {
                    return;
                }
                _box.find("#record-pageNo").val(pageNo + 1);
                queryRecord(con_no);
            });

            $(".showRecord").show();
            $(".showRecord").animate({right: '0'},600);
        }
    });
}

function queryRecord(con_no) {
    $.ajax({
        type: "POST",
        url: "/service/queryServiceChargeRecord",
        data: {
            con_no: con_no,
            pageNo: returnValue($("#record-pageNo").val()),
            pageSize: 10
        },
        dataType: "json",
        beforeSend: function () {
            $("#record-table-body").html('<tr><td colspan="7"><div class="loading"></div></td></tr>');
        }
    }).done(function (result) {
        if (result.code != 200) {
            return;
        }
        $("#record-table-body").empty();

        if (result.data.list.length == 0) {
            $("#record-table-body").html('<tr><td colspan="7" style="text-align: center;line-height: 120px;">没有记录</td></tr>');
            $("#record-totalPage").text(0);
            $("#record-totalRecords").text(0);
            return;
        }
        $.each(result.data.list, function (index, data) {
            // 数据项
            var html = '';
            html += '<tr class="record-visible-tr' + returnValue(data.re_id) + '" style="background: ' + (index % 2 == 0 ? "#f5f8fa" : "#ffffff") + ';">';
            html += '	<td style="width: 30%;text-align: center;">' + (data.md_number || data.so_code) + '</td>';
            html += '	<td style="width: 20%;text-align: center;">' + returnFloat(data.service_charge) + '</td>';
            html += '	<td style="width: 20%;text-align: center;">' + returnFloat(data.discount) + '</td>';
            html += '	<td style="width: 30%;text-align: right;">' + returnTime(data.create_time) + '</td>';
            html += '</tr>';
            // 隐藏操作项
            html += '<tr class="record-hidden-tr' + returnValue(data.re_id) + '" style="background: ' + (index % 2 == 0 ? "#f5f8fa" : "#ffffff") + ';">';
            html += '</tr>';
            $("#record-table-body").append(html);
            $('.record-visible-tr' + returnValue(data.re_id)).data("data", data);
        });
        $("#record-table-box").perfectScrollbar();
        $("#record-table-box").perfectScrollbar("update");

        $("#record-totalPage").text(result.data.totalPage);
        $("#record-totalRecords").text(result.data.totalRecords);

    });
}