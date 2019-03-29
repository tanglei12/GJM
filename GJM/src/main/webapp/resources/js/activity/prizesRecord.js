$(function () {
    load_data();
});
function load_data() {
    var filterDateParams = [
        {name: "获奖时间", value: "apr_createTime", sort: 'DESC'},
    ];
    var filterBars = [
        {name: "am_code", type: "select", selected: "0", data: "returnActivityTitle"},
        {name: "ap_id", type: "select", selected: "0", data: "returnActivityPrizeName"}
    ];
    var listParams = [
        {text: "活动标题", name: "am_title", param: ""},
        {text: "活动图片", name: "ai_path", param: ""},
        {text: "奖品名称", name: "ap_name", param: ""},
        {text: "奖品图片", name: "aip_path", param: ""},
        {text: "获奖用户", name: "user_realName{/}user_phone", param: ""},
        {text: "获奖时间", name: "apr_create_time", param: "time"},
    ];

    // 获取列表数据
    $.table({
        filterDateParams: filterDateParams,
        listParams: listParams,
        filterBars: filterBars,
        filterWhere: true,
        ajaxParams: {
            url: "/activity/queryPrizeRecordList",
            beforeSend: function () {
            }
        },
        ajaxDone: function (h) {
            h.find(".list-content-item").each(function () {
                var data = $(this).find("[name=table-checkbox]").data("data");
                //活动图片
                var ai_path=data.ai_path;
                $(this).find("[name=ai_path]").text('');
                if (returnValue(ai_path) =='') {
                    $(this).find("[name=ai_path]").append('<i class="fa-image" style="color: rgb(135, 135, 135);cursor:default;"></i>');
                } else {
                    $(this).find("[name=ai_path]").append('<i class="fa-image" data='+ai_path+' onclick="selectImg(this)"></i>');
                }
                //奖品图片
                var aip_path=data.aip_path;
                $(this).find("[name=aip_path]").text('');
                if (returnValue(aip_path) =='') {
                    $(this).find("[name=aip_path]").append('<i class="fa-image" style="color: rgb(135, 135, 135);cursor:default;"></i>');
                } else {
                    $(this).find("[name=aip_path]").append('<i class="fa-image" data='+aip_path+' onclick="selectImg(this)"></i>');
                }
            });
        },
        popup: {
            width: "73%",
            result: function (box, _data) {
            },
            close: function () {
            }
        }
    });
}

/**
* 返回奖品名称
*/
function returnActivityPrizeName () {
    var data = {};
    var am_code=0;
    $('.filter-ul').find('[name=am_code]').change(function () {
        am_code=$(this).val();
        $('#am_code').val(am_code);
        returnActivityPrizeName();
    })
    am_code=$('#am_code').val();
    $.ajax({
        type: 'POST',
        url: '/activity/selectPrizeName',
        data: {am_code:am_code},
        async :false,
        dataType: 'json',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success:function (result) {
            $('.filter-ul').find('[name=ap_id]').empty();
            var html='';
            if (am_code == 0) {
                var select=0+':'+'"奖品名称"';
                var sss="{"+select+"}";
                data.list= eval('(' + sss + ')');
            }
            if (result.data.length >0) {
                var s = '';
                html +='    <option value="0">奖品名称</option>';
                $.each(result.data,function (index, item) {
                    if (s.length > 0) { s += "," };
                    html +='    <option value="'+item.ap_id+'">'+item.ap_name+'</option>';
                })
                $('.filter-ul').find('[name=ap_id]').append(html);
            } else {
                html +='    <option value="0">奖品名称</option>';
                $('.filter-ul').find('[name=ap_id]').append(html);
            }
        }
    })
    return data;
}

/**查看图片 */
function selectImg(obj) {
    var image=$(obj).attr('data')
    $("#image-model").remove();
    var html = "";
    html += '<div id="image-model">';
    html += '	<div class="image-model-title drag">图片<a href="javascript:$(\'#image-model\').remove();" class="icon-remove"></a><a href="javascript:$(\'#image-model\').remove();" style="cursor: pointer;color:#ff6666;float:right;">X</a></div>';
    html += '	<div class="image-model-content">';
    html += '		<figure id="house_slider" class="swipeslider">';
    html += '  			<ul class="sw-slides">';
    html += '    <li class="sw-slide">';
    html += '      <img src="' + image + '">';
    html += '    </li>';
    html += '  			</ul>';
    html += '		</figure>';
    html += '	</div>';
    html += '</div>';
    $("body").append(html);
    modelMove();
    $(".sw-slides").viewer();
}