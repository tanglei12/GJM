$(function () {
    load_data();
});
function load_data() {
    var filterDateParams = [
        {name: "分享时间", value: "as_createTime", sort: 'DESC'},
    ];
    var filterBars = [
        {name: "am_code", type: "select", selected: "0", data: "returnActivityTitle"}
    ];
    var listParams = [
        {text: "活动标题", name: "am_title", param: ""},
        // {text: "活动图片", name: "ai_path", param: ""},
        {text: "分享地址", name: "as_url", param: ""},
        {text: "分享内容", name: "as_content", param: ""},
        {text: "分享状态", name: "as_state", param: ""},
        {text: "分享人", name: "user_realName{/}user_phone", param: ""},
        {text: "分享时间", name: "as_create_time", param: "time"},
    ];
    // 获取列表数据
    $.table({
        filterDateParams: filterDateParams,
        listParams: listParams,
        filterBars: filterBars,
        filterWhere: true,
        ajaxParams: {
            url: "/activity/queryShareList",
        },
        ajaxDone: function (h) {
            h.find(".list-content-item").each(function () {
                var data = $(this).find("[name=table-checkbox]").data("data");
                console.log(data);
                //活动图片
                /*var ai_path=data.ai_path;
                $(this).find("[name=ai_path]").text('');
                if (returnValue(ai_path) =='') {
                    $(this).find("[name=ai_path]").append('<i class="fa-image" style="color: rgb(135, 135, 135);cursor:default;"></i>');
                } else {
                    $(this).find("[name=ai_path]").append('<i class="fa-image" data='+ai_path+' onclick="selectImg(this)"></i>');
                }*/
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