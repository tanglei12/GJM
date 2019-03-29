$(function () {
    data();
});

/** 库存房源--筛选获取数据 */
function data() {
    var _type = getUrlParam("type") == "zl" ? "租赁合同" : "托管合同";
    $("title").html(getUrlParam("type") == "zl" ? "我的出房" : "我的存房");
    $("#content").table({
        search: true,
        dataTime: [{name: "开始时间", string: "contractObject_Date"}],
        title: [
            {name: "编号", string: "hi_code", parameter: ""},
            {name: "小区房号", string: "house_address", parameter: "", leftDiv: '<i class="fa-image" onclick="selectImg(this)"></i>', rightDiv: "", href: "/houseLibrary/jumpHouseInfo&hi_code"},
            {name: "招租状态", string: "hi_forRentState"},
            {name: "存房价格", string: "hi_money", parameter: ""},
            {name: "出房价格", string: "hi_keepMoney", parameter: ""},
            {name: "房屋区域", string: "hi_area", parameter: ""},
            {name: "房屋品牌", string: "hb_name", parameter: ""},
            {name: "户型", string: "houseTSW", parameter: ""},
            {name: "房东", string: "he_peopleName", parameter: "", string1: "he_phone", parameter1: ""},
            {name: "房屋管家", string: "em_name", parameter: "", string1: "em_phone", parameter1: ""},
            {name: "合同生效日期", string: "contractObject_Date", parameter: ""}
        ],
        url: "/houseLibrary/queryHouseInfoSelfList",
        data: {
            types: _type
        },
        success: function (result) {
            $(result).find("tbody tr").each(function () {
                var hi_forRentState = $(this).find("td[data-text=hi_forRentState]");
                var forRentState = returnHouseForRentState(hi_forRentState.text());
                hi_forRentState.html(forRentState.text).addClass(forRentState.style);

            });
        }
    });
}

/** 库存房源--查看图片 */
function selectImg(obj) {
    var _checked = $(obj).parents("tr").find("[name=check]");
    $.ajax({
        type: "POST",
        url: "/houseLibrary/getHouseImageList",
        data: {
            hi_id: _checked.data("data").hi_id
        },
        dataType: "json",
    }).done(function (result) {
        if (result.code != 200) {
            $.jBox.tip(result.msg);
            return;
        }
        var html = "";
        html += '<figure id="house_slider" class="swipeslider">';
        html += '	<ul class="sw-slides">';
        $.each(result.data, function (index, data) {
            var type = '';
            var type_class;
            switch (data.hit_type) {
                case "page":
                    type = "封面图片";
                    type_class = 'next-bg';
                    break;
                case "effect":
                    type = "效果图片";
                    type_class = '';
                    break;
                case "solid":
                    type = "户型图片";
                    type_class = 'hint-bg';
                    break;
                case "3d":
                    type = "3D图片";
                    type_class = 'error-bg';
                    break;
            }
            html += '    <li class="sw-slide">';
            html += '      <img src="' + data.houseImage.hm_path + '" alt="' + type + '" title="' + type + '">';
            html += '    </li>';
        });
        html += '	</ul>';
        html += '</figure>';
        $.jBox(html, {title: "房源图片", width: 700});
        $("#house_slider").swipeslider();
    });
}

/** 库存房源--跳转详细情况 */
function hrefClick(ids) {
    window.parent.href_mo($(ids).attr("data-type"), "修改房屋", "我的房源");
}