////表单验证
//$('#addSubmit').validator({
//	// 默认false，是否在出错时停止验证。
//	stopOnError : false,
//	// 0 || false: 关闭实时验证，将只在提交表单的时候进行验证
//	// 1 || true: 启用实时验证，在字段失去焦点后验证该字段
//	// 2: 启用实时验证，在输入的同时验证该字段
//	timely : 2,
//	fields : {
//		'phi_name' : '邮箱:required;email;'
//	}
//}).on('click', function() {
//	$('#addSubmit').trigger("submit");
//});
$(function () {
    search();
});
var CONTRACT_STATE = true;

/** 搜索列表*/
function search() {
    // 外部常量
    var $sources = $('#houseno');
    // 外部常量
    var $hicode = $('#hicode');
    var $hiaddress = $('#hiaddress');
    var $source = $('#conhouseno');
    var $dataValue = $("#conid").attr("data-value");
    // 内部常量
    var $queryList = $("#queryList");
    var $show = $("#search-show");
    var $box = $("#search-box");
    var $input = $("#search-box>input");
    var $item = $('#search-show .search-item');
    var $tips = '<div class="search-tisp">没有数据</div>';

    $input.bind("input propertychange", function () {
        $.ajax({
            type: "POST",
            url: "/propertyInfo/fuzzySelectPro",
            data: {
                param: $input.val(),
                type: $dataValue,
                hType: $(".nav-item-focus").attr("data-type")
            },
            dataType: "json"
        }).done(function (result) {
            if (result.userCenterPropertyInfoList != null) {
                var content = '';
                $.each(result.userCenterPropertyInfoList, function (index, data) {
                    content +=
                        '<tr class="search-item" onclick="new search().setToInput(this)">' +
                        '<td title="房屋编码">' + data.propertyInfo_Name + '</td>' +
                        '<td title="房东姓名" style="display:none;">' + data.propertyInfo_Id + '</td>' +
                        '<td title="房屋产权地址">' + data.propertyInfo_address + '</td>' +
                        '</tr>';
                });
                content +=
                    '<tr class="search-item" onclick="new search().setToInput(this)">' +
                    '<td title="房屋编码">无</td>' +
                    '<td title="房东姓名" style="display:none;">' + 0 + '</td>' +
                    '<td title="房屋产权地址"></td>' +
                    '</tr>';
                $show.html('<table style="font-size:12px">' + content + '</table>');
            } else {
                $show.html('<div class="search-tisp">没有数据</div>');
            }
        });
    });
    // 上、下、回车选择
    $input.keyup(function (event) {
        var $item = $('#search-show .search-item');
        if (event.keyCode == 40) {// 上键
            eindex++;
            if (eindex >= $item.length) {
                eindex = 0;
            }
            showSearchResult(eindex);
        } else if (event.keyCode == 38) {// 下键
            eindex--;
            if (eindex < 0) {
                eindex = $item.length - 1;
            }
            showSearchResult(eindex);
        } else if (event.keyCode == 13) { // 回车
            if (eindex >= 0) {
                var $td = $item.eq(eindex).children("td");
                $source.val($td.eq(0).text());
                $sources.val($td.eq(2).text());
                $("#pi_id").val($td.eq(1).text());
                $(".conhousenoformError").remove();
                $source.data("data", $td.eq(0).text());
                $source.change();
                close();
                eindex = -1
                return false;
            }
        } else {
            eindex = -1;
        }
    });
    //如果在表单中，防止回车提交
    $input.keydown(function (event) {
        if (event.keyCode == 13) {
            return false;
        }
    });

    /** 显示搜索结果 */
    var showSearchResult = function (index) {
        var $item = $('#search-show .search-item');
        $item.removeClass('item-hover').eq(index).addClass('item-hover');
    }
    /** 设置input值 */
    this.setToInput = function (param) {
        var $objChildren = $(param).children("td");
        $source.val($objChildren.eq(0).text());
        $sources.val($objChildren.eq(2).text());
        $("#pi_id").val($objChildren.eq(1).text());
        $(".conhousenoformError").remove();
        $source.data("data", $objChildren.eq(0).text());
        $source.change();
        close();
        $("#wyj").remove();
    }
    /** 关闭搜索框 */
    var close = function () {
        $input.val("");
        $show.empty().html($tips);
        $queryList.hide();
    }

    $queryList.bind("click", function (e) {
        stopPropagation(e);
    });
    $source.bind("click", function (e) {
        stopPropagation(e);
    });
    $(document).bind("click", function () {
        close();
    })
    $source.on("focus", function () {
        $queryList.show();
        $input.focus();
        $input.trigger("propertychange");
        $queryList.hover(function () {
            $(document).unbind("click");
        }, function () {
            $(document).bind("click", function () {
                close();
            });
        });
    });

    var stopPropagation = function (e) {//把事件对象传入
        if (e.stopPropagation) { //支持W3C标准
            e.stopPropagation();
        } else { //IE8及以下浏览器
            e.cancelBubble = true;
        }
    }
}