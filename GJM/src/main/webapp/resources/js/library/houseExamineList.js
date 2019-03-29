$(function () {
    load_data();
});

function load_data() {
    var filterDateParams = [
        {name: "存房时间", value: "hi_date", sort: 'DESC'},
        {name: "起始时间", value: "contract_beginDate", sort: 'DESC'},
        {name: "到期时间", value: "contract_expiryDate", sort: 'DESC'},
    ];
    var filterBars = [
        {name: "ucc_id", type: "select", selected: "", data: "returnUccNameState"},
        {name: "hp_status", type: "select", selected: "", data: "returnHouseCheckStatus"},
    ];
    var listParams = [
        {text: "小区编号", name: "house_address", param: "",func: {type: "onclick", name: "$.table.popupOpen(this)"}},
        {text: "招租期", name: "hi_leaseDay", param: ""},
        {text: "审核状态", name: "hp_status", param: "returnHouseCheckStatus"},
        {text: "招租状态", name: "hi_forRentState", param: "returnHouseForRentState"},
        {text: "特价房源", name: "hi_boolActive", param: {
            1: "特价",
        }},
        {text: "统一出房价", name: "hi_money", param: ""},
        {text: "房屋区域", name: "hi_area", param: ""},
        {text: "公司回收", name: "hi_houseActive", param: {
            1: "是",
        }},
        {text: "房屋品牌", name: "hb_name", param: ""},
        {text: "户型", name: "houseTSW", param: ""},
        {text: "房东", name: "he_peopleName{/}he_phone", param: ""},
        {text: "房屋管家", name: "em_name{/}em_phone", param: ""},
        {text: "房源归属部门", name: "ucc_name", param: ""},
    ];
    // 获取列表数据
    $.table({
        filterDateParams: filterDateParams,
        listParams: listParams,
        filterBars: filterBars,
        filterWhere: true,
        ajaxParams: {
            url: "/houseLibrary/queryHouseExamineList",
            beforeSend: function () {
            }
        },
        ajaxDone: function (h) {
            h.find(".list-content-item").each(function () {
                var data = $(this).find("[name=table-checkbox]").data("data");
            });
        },
        popup: {
            width: "60%",
            result: function (box, _data) {
                loadingData(box.main, _data);
            },
            close: function () {
            }
        }
    });
}

/**
 * 弹出框预览审核
 */
var pointer='';
var hi_code='';
function loadingData (box, _data) {
    hi_code=_data.hi_code;
    $.ajax({
        type: "POST",
        url: "/houseLibrary/queryHouseExamine",
        data: {
            hi_code: _data.hi_code
        },
        dataType: "json",
        beforeSend: function () {
            $("#contract-content").html('<div class="loading"></div>');
        }
    }).done(function (result) {
        var house = result.houseInfo;
        var image=result.imageList;
        var housePublishe=result.housePublisheList;
        pointer=house.propertyInfo_coordinate =='' ? house.hi_latitude : house.propertyInfo_coordinate;
        var html='';
        html += ' <div class="sb-title">';
        html += '    <ul class="title-nav" style="">';
        html += '	    <li class="visited">' + "预览";
        html += '	    </li>';
        html += '    </ul>';
        html += ' </div>';
        html += '  <div class="base custom-scroll" style="width: 375px;height: 667px;position: relative;left: 60px;top: 20px;border: 1px solid #efefef;">';
        html += '      <div>';
        html += '          <article>';
        html += '              <div class="scroll relative">';
        html += '                  <div class="scroll_box" id="scroll_img">';
        html += '                      <ul class="scroll_wrap">';
        $(image).each(function (index, item) {
            if (item.hm_chose == 3) {
                html += '    <li>';
                html += '        <a href="guangao1.html"><img src="' + item.hm_path + '" width="365px" height="254px"/></a>';
                html += '    </li>';
            }
        })
        $(image).each(function (index, item) {
            if (item.hm_chose == 1) {
                html += '    <li>';
                html += '        <a><img src="' + item.hm_path + '" width="365px" height="254px"/></a>';
                html += '    </li>';
            }
        })
        html += '                      </ul>';
        html += '                  </div>';
        html += '                  <span class="scroll_position_bg opacity6"></span>';
        html += '                  <ul class="scroll_position" id="scroll_position">';
       $(image).each(function (index, item) {
            if (index == 1) {
                html += '                      <li class="on">';
                html += '                          <a href="javascript:void(0);">' + index + '<img src=""/> </a>';
                html += '                      </li>';
            } else {
                html += '                      <li>';
                html += '                          <a href="javascript:void(0);">' + index + '<img src=""/></a>';
                html += '                      </li>';
            }
        });
        html += '                  </ul>';
        html += '              </div>';
        html += '          </article>';
        html += '      </div>';
        html += '      <div style="text-align:center;clear:both">';
        html += '      </div>';
        html += '      <div class="baseinfo">';
        html += '          <div class="" id="">';
        html += '              <a class="house_title">' + returnValue(house.hi_name) + '</a>';
        html += '              <a class="area">'+house.hi_area+'</a>';
        html += '          </div>';
        html += '      </div>';
        html += '      <div class="house_info">';
        html += '          <div class="ZJ">';
        html += '              <p>租金</p>';
        html += '              <p>' + returnFloat(house.hi_price) + '元/月</p>';
        html += '          </div>';
        html += '          <div class="HX">';
        html += '              <p>户型</p>';
        html += '              <p>' + house.hi_houseS + '室' + returnValue(house.hi_houseT) + '厅' + returnValue(house.hi_houseW) + '卫</p>';
        html += '          </div>';
        html += '          <div class="MJ">';
        html += '              <p>面积</p>';
        html += '              <p>' + returnValue(house.hi_measure) + '平米</p>';
        html += '          </div>';
        html += '      </div>';
        html += '      <div class="posit">';
        html += '          <table>';
        html += '              <tr>';
        html += '                  <td>楼层 : ' + returnValue(house.hi_floor) + '/' + returnValue(house.hi_totalFloor) + '层</td>';
        html += '                  <td>朝向 : ' + returnValue(house.hi_orientation) + '</td>';
        html += '              </tr>';
        html += '              <tr>';
        html += '                  <td>装修 : ' + returnValue(house.hi_state) + '</td>';
        var hb_id=house.hb_id;
        if (hb_id == 1) {
            html += '                  <td>方式 : ' + "整租" + '</td>';
        } else if (hb_id == 2) {
            html += '                  <td>方式 : ' + "合租" + '</td>';
        }
        html += '              </tr>';
        html += '          </table>';
        html += '      </div>';
        html += '      <div class="pay">';
        html += '          <div class="payTitle">';
        html += '              <div class="rectangle"></div>';
        html += '              <a>支付方式</a>';
        html += '          </div>';
        html += '          <div class="payType">';
        html += '              <table>';
        html += '                  <tr>';
        html += '                      <td>按月付 : ' + returnFloat(house.hi_price) + '元/月</td>';
        html += '                      <td>按季付 : ' + returnFloat(house.hi_price) + '元/月</td>';
        html += '                  </tr>';
        html += '                  <tr>';
        html += '                      <td>半年付 : ' + returnFloat(house.hi_price) + '元/月</td>';
        html += '                      <td>按年付 : ' + returnFloat(house.hi_price) + '元/月</td>';
        html += '                  </tr>';
        html += '              </table>';
        html += '          </div>';
        html += '      </div>';
        html += '      <div class="facility">';
        html += '          <div class="facTitle">';
        html += '              <div class="rectangle"></div>';
        html += '              <a>配套设施</a>';
        html += '          </div>';
        html += '          <div class="facType">';
        html += '              <ul>';
        var conim_id=returnValue(house.conim_id);
        var conim = conim_id.split(",");
        $(conim).each(function (index, item) {
            if (item == 1) {
                html += '                  <li conim_id="1">';
                html += '                      <img src="/resources/image/houseDetails/ic_badroom.svg"/>';
                html += '                      <a>床</a>';
                html += '                  </li>';
            } else if (item == 2) {
                html += '                  <li conim_id="2">';
                html += '                      <img src="/resources/image/houseDetails/ic_cabinet.svg"/>';
                html += '                      <a>衣柜</a>';
                html += '                  </li>';
            } else if (item == 4) {
                html += '                  <li conim_id="4">';
                html += '                      <img src="/resources/image/houseDetails/ic_television.svg"/>';
                html += '                      <a>电视</a>';
                html += '                  </li>';
            } else if (item == 6) {
                html += '                  <li conim_id="6">';
                html += '                      <img src="/resources/image/houseDetails/ic_washer.svg"/>';
                html += '                      <a>洗衣机</a>';
                html += '                  </li>';
            } else if (item == 7) {
                html += '                  <li conim_id="7">';
                html += '                      <img src="/resources/image/houseDetails/ic_air.svg"/>';
                html += '                      <a>空调</a>';
                html += '                  </li>';
            } else if (item == 8) {
                html += '                  <li conim_id="8">';
                html += '                      <img src="/resources/image/houseDetails/ic_bathe.svg"/>';
                html += '                      <a>热水器</a>';
                html += '                  </li>';
            } else if (item == 9) {
                html += '                  <li conim_id="9">';
                html += '                      <img src="/resources/image/houseDetails/ic_bathe.svg"/>';
                html += '                      <a>宽带</a>';
                html += '                  </li>';
            } else if (item == 10) {
                html += '                  <li conim_id="10">';
                html += '                      <img src="/resources/image/houseDetails/ic_interLock.svg"/>';
                html += '                      <a>智能锁</a>';
                html += '                  </li>';
            }
        })
        html += '              </ul>';
        html += '          </div>';
        html += '      </div>';
        html += '      <div class="advantage">';
        html += '          <div class="advTitle">';
        html += '              <div class="rectangle"></div>';
        html += '              <a>房屋优势</a>';
        html += '          </div>';
        html += '          <div class="advType">';
        var hi_function = returnValue(house.hi_function);
        var hiFunction = hi_function.split(",");
        $(hiFunction).each(function (index, item) {
            html += '<a>' + item + '</a>';
        })
        html += '          </div>';
        html += '      </div>';
        html += '      <div class="evaluate">';
        html += '          <div class="evaluateTitle">';
        html += '              <div class="rectangle"></div>';
        html += '              <a>管家点评</a>';
        html += '          </div>';
        html += '          <div class="evaluateType">';
        html += '              <p>'+returnValue(house.hi_content)+'</p>';
        html += '          </div>';
        html += '      </div>';
        html += '      <div class="traffic">';
        html += '          <div class="trafficTitle">';
        html += '              <div class="rectangle"></div>';
        html += '              <a>交通配置</a>';
        html += '          </div>';
        html += '          <div class="trafficType">';
        html += '              <div class="traStation">';
        html += '                  <p>轨道交通:</p>';
        html += '                  <p>';
        html += '                      <a>'+returnValue(house.propertyInfo_gui)+'</a>';
        html += '                  </p>';
        html += '              </div>';
        html += '              <div class="traLine">';
        html += '                  <p>交通线路:</p>';
        html += '                  <p>';
        html += '                      <a>'+returnValue(house.hi_busLine)+'</a>';
        html += '                  </p>';
        html += '              </div>';
        html += '              <div class="houseAddress">';
        html += '                  <p>房屋地址:</p>';
        html += '                  <p>';
        html += '                      <a>'+returnValue(house.propertyInfo_address)+'</a>';
        html += '                  </p>';
        html += '              </div>';
        html += '          </div>';
        html += '      </div>';
        html += '      <div id="allAppMap" class="custom-scroll">';
        html += '      </div>';
        html += '      <div class="footer">';
        html += '          <div class="xx">';
        html += '              <a href="javascript:;">联系管家</a>';
        html += '          </div>';
        html += '          <div class="yy">';
        html += '              <a href="javascript:;">缴纳定金</a>';
        html += '          </div>';
        html += '          <div class="zz">';
        html += '              <a href="javascript:;">房屋预约</a>';
        html += '          </div>';
        html += '      </div>';
        html += '  </div>';
        var publishe='';
        $(housePublishe).each(function (index,item) {
            publishe=item.hp_status;
        })
        if (publishe == 10) {
            html += '  <div class="sb-title" style="position: relative;top: 25px;">';
            html += '     <ul class="title-nav">';
            html += '	     <li class="visited">' + "审核";
            html += '	     </li>';
            html += '     </ul>';
            html += '  </div>';
            html += '   <div class="sub-content" style="box-shadow: 0 0 0 1px #ddd;top: 25px">';
            html += '   <dl class="main-box-list">';
            html += '  	    <dt class="item" style="width: 65px;">';
            html += '  	    	<span class="item-titile">处理结果</span>';
            html += '  	    </dt>';
            html += '  	    <dd class="item">';
            html += '  	    	<select class="form-control" id="processResult">';
            html += '  	    	<option value="12">审核通过</option>';
            html += '  	    	<option value="11">未通过</option>';
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
            html += '  	    <dd class="item-dd" style="display: none;">';
            html += '  	    	<input type="button" class="btn cancel" value="取消" onclick="closeExamine();">';
            html += '  	    </dd>';
            html += '   </dl>';
            html += '  </div>';
        }
        box.html(html);
        //地图
        mapInit();
        $('#allAppMap').css({
            'overflow': 'auto',
            'height': '275px',
            'bottom': '-5px;',
            'margin-bottom': '10x',
        });
        //轮播
        var bullets = document.getElementById('scroll_position').getElementsByTagName('li');
        var html=document.getElementById('scroll_img');
        var slider = Swipe(html, {
            auto: 4000,
            continuous: true,
            callback: function(pos) {
                var i = bullets.length;
                while (i--) {
                    bullets[i].className = ' ';
                }
            }
        });
        $('.scroll_position_bg').css({
            width:$('#scroll_position').width()
        });
        managerExamine();
    })
}
// 加载事件
function managerExamine() {
    // 通过、未通过
    $("#processResult").on("change", function () {
        var _val = $(this).val();
        if (_val == 11) {
            $("#resultContent").show();
            $("#resultMsg").focus();
            $('.item-dd').show();
        } else {
            $("#resultContent").hide();
            $("#resultMsg").val("");
            $('.item-dd').hide();
        }
    });
};
//取消按钮
function closeExamine() {
    $("#resultContent").hide();
    $("#resultMsg").val("");
    $('.item-dd').hide();
}
// 初始化地图
function mapInit(){
    var arr = pointer.split(',');
    var allmap = ApphouseMap(); //初始化地图调用
    map.clearOverlays(); //清除图层覆盖物
    var point = new BMap.Point(arr[0], arr[1]);
    var marker = new BMap.Marker(point); // 创建标注
    map.addOverlay(marker); // 将标注添加到地图中
    marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
    // 定位到该处
    allmap.centerAndZoom(point, 15);
}
//初始化百度地图
function ApphouseMap() {
    map = new BMap.Map("allAppMap");
    map.centerAndZoom(new BMap.Point(106.553865, 29.538099), 15);
    // map.enableScrollWheelZoom(true); //开启滚轮缩放地图
    return map;
}

//提交审核
function additionalExamine() {
    // 结果
    var hp_status = $("#processResult option:selected").val();
    var content = $('#resultMsg').val();
    if (hp_status == 11 && content == '') {
        $.jBox.alert("内容不能为空", "提示", "warning");
    }
    $.ajax({
        type: "POST",
        url: "/houseLibrary/updateHouseExamine",
        data: {
            hi_code: hi_code,
            hp_status: hp_status,
            hp_content: content,
        },
        dataType: "json"
    }).done(function (result) {
        if (result.code == 200) {
            $.jBox.prompt("审核完成", "提示", "success", {
                closed: function () {
                    window.location.href = "/houseLibrary/houseExamine";
                }
            });
            // $.popupRefresh();
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


