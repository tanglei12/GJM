var ueditor = null;	// UE
var houseMap = null; // 地图
var houseMarker = null; // 坐标
var imageUpload = null;
var he_address = "";
var map = null; // 初始化地图
var em_name='';
var em_phone='';
var param = 'http://image.cqgjp.com/';
/** 房屋发布*/
function fb() {
    var hi_code = $(".personTable input[name='check']:checked").parent().attr("data-id");
    if (typeof(hi_code) == "undefined") {
        $.jBox.tip("请选择一个房源");
        return;
    }
    // 加载页面
    var html = "<div class='house-publish' id='house-publish'>" +
        "<form id='listForm' method='post' enctype='multipart/form-data'>" +
        "<input type='hidden' id='hi_code' name='hi_code' value='' />" +
        "<input type='hidden' id='propertyInfo_Id' name='propertyInfo_Id' value='' />" +
        "<input type='hidden' id='propertyInfo_coordinate' name='propertyInfo_coordinate' value='' />" +
        // "<input type='hidden' id='propertyInfo_address' name='propertyInfo_address' value='' />" +
        // "<input type='hidden' id='propertyInfo_quyu' name='propertyInfo_quyu' value='' />" +
        // "<input type='hidden' id='propertyInfo_transit' name='propertyInfo_transit' value='' />" +
        // "<input type='hidden' id='propertyInfo_gui' name='propertyInfo_gui' value='' />" +
        "<input type='hidden' id='hi_latitude' name='hi_latitude' value='' />" +
        "<input type='hidden' id='contractObject_Id' name='contractObject_Id' value='' />" +
        "<div class='base-info'>" +
        "<div class='info-title'>" +
        "<span class='item'></span> 基本信息" +
        "<span class=''>&nbsp;&nbsp;&nbsp;&nbsp;<i class='icon-house-edit fa-pencil' style='cursor: pointer;' title='编辑房源信息' onclick=\"window.parent.href_mo(\'/houseLibrary\/jumpHouseInfoEdit?hi_code=" + hi_code + "','修改房源','房源信息');\"></i></span>" +
        "<span class='serviceInfo-refresh\' onclick='refreshDiv()' style='margin-right: 55px;cursor: pointer;' title='刷新'>&nbsp;&nbsp;&nbsp;&nbsp;<i class='icon-refresh'></i></span>"+
        "<div class='close' onclick='cancelPublish()'>" +
        "<i class='fa-close'></i>" +
        "</div>" +
        "</div>" +
        "<div class='info-content'>" +
        "<dl>" +
        "<dt><em class='required'>*</em>房源标题</dt>" +
        "<dd>" +
        "	<input class='long' type='text' id='hi_name' name='hi_name' value='' />" +
        "</dd>" +
        "</dl>" +
        "<dl>" +
        "<dd>" +
        "<input type='text' class='name_' name='hb_id' value='' style='border:1px;margin-left: 80px;background-color: white;' disabled='disabled'>" +
        "<label class='title' style='cursor:pointer;background: #1ABC9C;position: relative;user-select: none;cursor: pointer;border: none; padding: 5px 16px;'><label style='color: white; border:none;'>默认</i></label>" +
        "</dd>" +
        "</dl>" +
        "<dl>" +
        "<dt>出租方式</dt>" +
        "<dd>" +
        "<label class='check-item' onclick='checkBrand(this)'><input type='radio' name='hb_id' value='1'>整租</label>" +
        "<label class='check-item' onclick='checkBrand(this)'><input type='radio' name='hb_id' value='2'>合租</label>" +
        "</dd>" +
        "</dl>" +
        "<dl style='display:none'>" +
        "<dt>所属小区</dt>" +
        "<dd>" +
        "<input class='middle' type='text' name='' value='' />" +
        "<label class='full'>-</label>" +
        "<select name=''>" +
        "<option value=''>请选择</option>" +
        "</select>" +
        "<label class='full'>-</label>" +
        "<select name=''>" +
        "<option value=''>请选择</option>" +
        "</select>" +
        "</dd>" +
        "</dl>" +
        "<dl>" +
        "<dt><em class='required'>*</em>房屋户型</dt>" +
        "<dd>" +
        "<input class='short' id='hi_houseS' name='hi_houseS' readonly>" +
        // "<select id='hi_houseS' name='hi_houseS' disabled='disabled' >" +
        // 	"<option value='0'>选择</option>" +
        // 	"<option value='1'>1</option>" +
        // 	"<option value='2'>2</option>" +
        // 	"<option value='3'>3</option>" +
        // 	"<option value='4'>4</option>" +
        // 	"<option value='5'>5</option>" +
        // 	"<option value='6'>6</option>" +
        // 	"<option value='7'>7</option>" +
        // 	"<option value='8'>8</option>" +
        // 	"<option value='9'>9</option>" +
        // "</select>" +
        "<label class='full'>室</label>" +
        "<input class='short' id='hi_houseT' name='hi_houseT' readonly>" +
        // "<select id='hi_houseT' name='hi_houseT' disabled='disabled' >" +
        // 	"<option value='0'>选择</option>" +
        // 	"<option value='1'>1</option>" +
        // 	"<option value='2'>2</option>" +
        // 	"<option value='3'>3</option>" +
        // 	"<option value='4'>4</option>" +
        // 	"<option value='5'>5</option>" +
        // "</select>" +
        "<label class='full'>厅</label>" +
        "<input class='short' id='hi_houseW' name='hi_houseW' readonly>" +
        // "<select id='hi_houseW' name='hi_houseW' disabled='disabled' >" +
        // 	"<option value='0'>选择</option>" +
        // 	"<option value='1'>1</option>" +
        // 	"<option value='2'>2</option>" +
        // 	"<option value='3'>3</option>" +
        // 	"<option value='4'>4</option>" +
        // 	"<option value='5'>5</option>" +
        // "</select>" +
        "<label class='full'>卫</label>" +
        "<input class='short' type='text' id='hi_measure' name='hi_measure' value='' readonly='readonly' />" +
        "<label class='full'>平米</label>" +
        "</dd>" +
        "</dl>" +
        "<dl>" +
        "<dt><em class='required'>*</em>楼层房号</dt>" +
        "<dd>" +
        "<input class='short' type='text' id='hi_room' name='hi_room' value='' readonly='readonly' placeholder='楼层'/>" +
        "<label class='full'>-</label>" +
        "<input class='short' type='text' id='hi_floor' name='hi_floor' value='' readonly='readonly' placeholder='房号'/>" +
        "<label class='full' style='margin-left: 30px;'><em class='required'>*</em>共</label>" +
        "<input class='short' type='text' id='hi_totalFloor' name='hi_totalFloor' value='' required />" +
        "<label class='full'>层</label>" +
        "</dd>" +
        "</dl>" +
        "<dl>" +
        "<dt><em class='required'>*</em>房屋朝向</dt>" +
        "<dd>" +
        "<input class='short' id='hi_orientation' name='hi_orientation' readonly>" +
        // "<select id='hi_orientation' name='hi_orientation' disabled='disabled' >" +
        // 	"<option value='东'>东</option>" +
        // 	"<option value='南'>南</option>" +
        // 	"<option value='西'>西</option>" +
        // 	"<option value='北'>北</option>" +
        // "</select>" +
        "</dd>" +
        "</dl>" +
        "<dl>" +
        "<dt><em class='required'>*</em>装修情况</dt>" +
        "<dd>" +
        "<input class='short' id='hi_state' name='hi_state' readonly>" +
        // "<select id='hi_state' name='hi_state' disabled='disabled' >" +
        // 	"<option value='基装'>基装</option>" +
        // 	"<option value='精装' selected>精装</option>" +
        // 	"<option value='中装'>中装</option>" +
        // 	"<option value='清水'>清水</option>" +
        // 	"<option value='豪装'>豪装</option>" +
        // "</select>" +
        "</dd>" +
        "</dl>" +
        "<dl>" +
        "<dt><em class='required'>*</em>出租价格</dt>" +
        "<dd><input class='short' type='text' id='hi_money' name='hi_money' readonly='readonly' value='' required /> 元/月</dd>" +
        "</dl>" +
        "</div>" +
        "</div>" +
        "<div class='support-info'>" +
        "<div class='info-title' id=''>" +
        "<span class='item'></span> 配套设施" +
        "</div>" +
        "<div class='info-content' id='houseConfig'>" +
        "<dl id=''>" +
        "<dt id=''>房间配置</dt>" +
        "<dd>" +

        "<label class='check-item' onclick='checkProject(this)'><input type='checkbox' name='conim_id' value='1' />床</label>" +
        "<label class='check-item' onclick='checkProject(this)'><input type='checkbox' name='conim_id' value='2' />衣柜</label>" +
        "<label class='check-item' onclick='checkProject(this)'><input type='checkbox' name='conim_id' value='3' />沙发</label>" +
        "<label class='check-item' onclick='checkProject(this)'><input type='checkbox' name='conim_id' value='4' />电视</label>" +
        "<label class='check-item' onclick='checkProject(this)'><input type='checkbox' name='conim_id' value='5' />冰箱</label>" +
        "<label class='check-item' onclick='checkProject(this)'><input type='checkbox' name='conim_id' value='6' />洗衣机</label>" +
        "<label class='check-item' onclick='checkProject(this)'><input type='checkbox' name='conim_id' value='7' />空调</label>" +
        "<label class='check-item' onclick='checkProject(this)'><input type='checkbox' name='conim_id' value='8' />热水器</label>" +
        "<label class='check-item' onclick='checkProject(this)'><input type='checkbox' name='conim_id' value='9' />宽带</label>" +


        "</dd>" +
        "</dl>" +
        "<dl > <dt>房源优势</dt> " +
        "<dd > <div id='fangyuanyoushigenjin'> " +
        "<label class='check-item' onclick='checkProject(this)' style='padding: 0px 18px;'> 家电齐全 <i></i> <input type='checkbox' class='type-radio' name='hi_function' value='家电齐全'> </label> " +
        "<label class='check-item' onclick='checkProject(this)' style='padding: 0px 18px;'> 拎包入住 <i></i> <input type='checkbox' class='type-radio' name='hi_function' value='拎包入住'> </label> " +
        "<label class='check-item' onclick='checkProject(this)' style='padding: 0px 18px;'> 交通便利 <i></i> <input type='checkbox' class='type-radio' name='hi_function' value='交通便利'> </label> " +
        "<label class='check-item' onclick='checkProject(this)' style='padding: 0px 18px;'> 精装修 <i></i> <input type='checkbox' class='type-radio' name='hi_function' value='精装修'> </label> " +
        "<label class='check-item' onclick='checkProject(this)' style='padding: 0px 18px;'> 地铁站 <i></i> <input type='checkbox' class='type-radio' name='hi_function' value='地铁站'> </label> " +
        " <label class='check-item' onclick='checkProject(this)' style='padding: 0px 18px;'> 邻商圈 <i></i> <input type='checkbox' class='type-radio' name='hi_function' value='邻商圈'> </label> " +
        "<!-- \t\t\t\t\t\t\t\t\t\t<label class='check-item' onclick='addyslabel();' id='addyslab'> --> <!-- \t\t\t\t\t\t\t\t\t\t\t+ --> <!-- \t\t\t\t\t\t\t\t\t\t\t<i></i> --> <!-- \t\t\t\t\t\t\t\t\t\t</label> -->" +
        " <div id='divys' style='display: none;'> <input type='text' value='' name='addys' id='addys' style='width: 80px; height: 30px; line-height: 30px; border: 1px solid #cccccc;'> " +
        "<input type='button' value='确  定' onclick='submitys(1)' style='background-color: #5bc0de; color: #fff; width: 60px; height: 30px; border-radius: 3px;cursor: pointer;'> </div> </div> </dd> </dl>" +

        "</div>" +
        "</div>" +


        "<div class='transport-info'>" +
        "<div class='info-title'>" +
        "<span class='item'></span> 交通配套" +
        "</div>" +
        "<div class='info-content'>" +
        "<dl>" +
        "<dt>地址搜索</dt>" +
        "<dt><input type='text' id='baidu' placeholder='地址搜索' style='margin-left: 10px; width: 300px' /></dt>" +
        "</dl>" +
        "<dl>" +
        "<dt><em class='required'>*</em>房屋地址</dt>" +
        "<dd>" +
        "<select name='' onchange='moveMapWidow(this)'>" +
        "<option value='重庆'>重庆</option>" +
        "</select>" +
        "<label class='full'>市</label>" +
        "<select id='hi_area' name='hi_area' onchange='moveMapWidow(this)'>" +
        "<option value=''>请选择</option>" +
        "<option value='南岸区'>南岸</option>" +
        "<option value='渝中区'>渝中</option>" +
        "<option value='渝北区'>渝北</option>" +
        "<option value='江北区'>江北</option>" +
        "<option value='巴南区'>巴南</option>" +
        "<option value='北碚区'>北碚</option>" +
        "<option value='九龙坡区'>九龙坡</option>" +
        "<option value='大渡口区'>大渡口</option>" +
        "<option value='沙坪坝区'>沙坪坝</option>" +
        "</select>" +
        "<label class='full'>区</label>" +
        "<input class='long' type='text' id='he_address' name='he_address' value='' placeholder='详细地址' required />" +
        "<button type='button' class='mark-btn' onclick='searchOnMap()'><i class='fa-map-marker'></i>标记地图</button>" +
        "<div id=\"searchResultPanel\" style=\"border:1px solid #C0C0C0;width:150px;height:auto; display:none;\"></div>" +
        "</dd>" +
        "</dl>" +
        "<dl>" +
        "<dt>公交</dt>" +
        "<dd>" +
        /*"<select name=''>" +
            "<option value=''>请选择</option>" +
        "</select>" +*/
        "<label class='full'>站台</label>" +
        "<input class='long' type='text' id='hi_busStation' name='hi_busStation' value='' />" +

        "<label class='full'>线路</label>" +
        "<input class='long' type='text' id='hi_busLine' name='hi_busLine' value='' />" +
        "<button type='button' class='mark-btn' onclick='searchOnMapBus(1)'><i class='fa-map-marker'></i>公交站</button>" +
        "</dd>" +
        "</dl>" +
        "<dl>" +
        "<dt>地铁</dt>" +
        "<dd><input class='middle' type='text' id='hi_metro' name='hi_metro' value='' />" +
        "<button type='button' class='mark-btn' onclick='searchOnMapBus(2)'><i class='fa-map-marker'></i>地铁站</button>" +
        "</dd>" +
        "</dl>" +
        "<dl>" +
        "<dt><em class='required'>*</em>地图标记</dt>" +
        "<dd>" +
        "<div id='houseMap' style='width:90%;height:300px;margin-top:18px;background:#F3F1EC;'></div>" +
        "</dd>" +
        "</dl>" +
        "</div>" +
        "</div>" +
        "<div class='details-info'>" +
        "<div class='info-title'>" +
        "<span class='item'></span>房屋简介" +
        "</div>" +
        "<div class='info-content'>" +
        "<dl>" +
        "<dt><em class='required'>*</em>简介</dt>" +
        "<dd>" +
        "<textarea name='hi_text' id='hi_text' style='width:90%;height:400px;margin-top:20px;'></textarea>" +
        "</dd>" +
        "</dl>" +
        "</div>" +
        "</div>" +
        "<div class='other-info'>" +
        "<div class='info-title'>" +
        "<span class='item'></span>其他信息" +
        "</div>" +
        "<div class='info-content'>" +
        "<dl>" +
        "<dt><em class='required'>*</em>房屋管家</dt>" +
        "<dd>" +
        "<input class='long' type='text' id='em_name' name='em_name' value='' readonly />" +
        "</dd>" +
        "</dl>" +
        "<dl style='margin-top: 20px;'>" +
        "<dt><em class='required'>*</em>房屋照片</dt>" +
        "<dd>" +
        "<div id='image-upload-box' style='width: 90%;border: 1px solid #ccc;min-height: 220px;overflow: hidden;'>" +
        "<div style='display: -webkit-box;'>" +
        "<div class='all_chose' style='cursor: pointer;border: 1px solid;width: 55px;height: 30px;text-align: center;margin: 6px 10px;line-height: 30px;border-radius: 7px;background-color: rgb(24, 188, 156);display: block;color: white;line-height: 30px;'>全选</div>" +
        "<div class='all_close' style='cursor: pointer;display:none;border: 1px solid;width: 65px;height: 30px;text-align: center;margin: 6px 10px;line-height: 30px;border-radius: 7px;background-color: rgb(24, 188, 156);color: white;line-height: 30px;'>取消全选</div>" +
        "<div><label class='common-checkbox common-checkbox-checked' style='top: 12px; margin-left: 35px;'><input type='checkbox' name='isUpd' value='upd'>更新支付宝图片</label></div>" +
        "</div>" +
        "</div>" +
        "</dd>" +
        "</dl>" +
        "<dl>" +
        "<dt><em class='required'>*</em>房屋点评</dt>" +
        "<dd>" +
        "<textarea id='hi_content' name='hi_content' placeholder='第一、房源描述需文字表达清楚，且与房源基本信息保持一致。最少50字，最多500字" +
        "第二、突出本房源的特色及卖点，比如：离地铁近、独立卫生间、南北通透、精装修、合住人数少" +
        "第三、不得包含网址、公司宣传、电话号、微信号、QQ'></textarea>" +
        "</dd>" +
        "</dl>" +
        // "<dl>" +
        // "<dt><em class='required'>*</em>发布对象</dt>" +
        // "<dd id='publishArea' style='height: 30px;'>" +
        // "<label class='checkbox click' id='guanwang'><i>公司官网</i></label>" + /*<label class='checkbox'><i>会分期</i></label>*/
        // "</dd>" +
        // "</dl>" +
        "<dl>" +
        "   <dt><em class='required'>*</em>发布对象</dt>" +
        "   <dd id='publishArea' class='publishArea' style='height: 30px;'>" +
        "   </dd>" +
        "</dl>" +

        "<dl>" +
        "<dt><em class='required'>*</em>发布预览</dt>" +
        "<dd id='publish' style='height: 30px;'>" +
        "<label class='checkbox click' onclick='previewHousePublish()'><i>预览pc端</i></label>" +
        "<label class='checkbox click' id='AppPublish' ><i>预览手机端</i></label>" +
        "</dd>" +
        "</dl>" +
        "</div>" +
        "</div>" +
        "<div class='do-actions'>" +
        "<button type='button' onclick='submitPublish()'>确认发布</button>" +
        "<button type='button' onclick='cancelPublish()'>取消</button>" +
        "</div>" +
        "</form>" +
        "</div>" +
        "<div class='house-publish-mask' id='house-publish-mask'></div>";
    $("body").append(html);
    // 遮罩层
    $("#house-publish-mask").fadeIn(200);
    // 右滑出
    $("#house-publish").animate({right: 0}, 800, function () {
        // 加载编辑器
        ueditor = UE.getEditor('hi_text', {imagePathFormat: "/resources/upload/image/{yyyy}{mm}{dd}/{time}{rand:6}", autoHeightEnabled: false});
        // 加载图片上传插件
//		imageUpload = $("#image-upload-box" +
//			"").imageUpload();
        // 加载地图
    });
    $('#image-upload-box img').viewer();
    // 请求后台数据
    $.post(
        "/houseLibrary/queryOnlineHouse",
        {"hi_code": hi_code},
        function (result) {
            var house = result.houseInfo;
            var image = result.imageList;
            var housePublish=result.housePublish;
            var hpc=result.housePublisheList;
            // 基本信息
            var name = house.propertyInfo_quyu + house.upn_sname + house.hi_state + house.hi_houseS + '房';
            $('#hi_name').val(returnValue(house.hi_name));
            $('.name_').val(name);
            // 整租合租
            $("input[name='hb_id']").each(function () {
                if (returnValue(house.hb_id) == $(this).val()) {
                    $(this).attr("checked", "checked").parent().addClass("check-item-ok");
                }
            });
            $("#hi_houseS").val(returnValue(house.hi_houseS));
            $("#hi_houseT").val(returnValue(house.hi_houseT));
            $("#hi_houseW").val(returnValue(house.hi_houseW));
            $("#hi_measure").val(returnValue(house.hi_measure));
            $("#he_address").val(returnValue(house.propertyInfo_address));
            he_address = house.he_address;
            $("#hi_busStation").val(returnValue(house.hi_busStation));
            $("#hi_busLine").val(returnValue(house.hi_busLine));
            $("#hi_metro").val(returnValue(house.hi_metro));
            $("#hi_content").val(returnValue(house.hi_content));
            //$("#hi_text").val(returnValue(house.hi_text));
            $("#hi_text").val(house.hi_text);
            if ('' != image) {
                var html = '';
                html += '<ul class="folder-item-body">';
                $(image).each(function (index, item) {
                    var url = item.hm_path.indexOf(param) > -1 ? item.hm_path : param + item.hm_path;
                    html += '<li style="position: relative;margin-bottom: 10px;border: 1px solid #ddd;margin-right: 10px;width:272px;height:153px;float: left">';
                    html += '<input type="hidden" class="hm_id" value="' + item.hm_id + '">';
                    html += '<div class="body-image-body" style="width:272px;height:153px;">';
                    html += '	<img src="' + url + '" style="width: 100%;height: 100%;">';
                    html += '</div>';
                    html += '<div>';
                    html += '	<label class="item-check" style="position: absolute;top: 0;left: 0; border: 1px solid #999999;">';
                    html += '		<i class="box-i" style="float: left;width: 20px;height: 20px; font-size: 17px; background: #FFFFFF">';
                    html += '		</i>';
                    html += '	</label>';
                    html += '	<label class="item-cover" style="position: absolute;top: 0;right: 0; border: 1px solid #999999; background: #FFFFFF; padding: 3px 5px; cursor: pointer">';
                    html += '		封面';
                    html += '		</i>';
                    html += '	</label>';
                    html += '</div>';
                    html += '</li>';
                });
                html += '</ul>';
                $('#image-upload-box').append(html);
            } else {
                var url = "/resources/houseImage/13213213154713213.png";
                var div = '<div  class="image-item" style="width:272px;height:153px;float: left;margin: 5px;"><img class="image-item-img" src="' + url + '" style="width: 100%;height: 100%;" data-preview-group="1"></div>';
                $('#image-upload-box').append(div);
            }
            $('.image-item-img').viewer();
            // 楼层房号
            var nums = returnValue(house.hi_address).replace(/[\u4E00-\u9FA5]/g,'').split("-");
            if (nums.length >= 2) {
                $("#hi_floor").val(nums[nums.length - 1]);
                $("#hi_room").val(nums[nums.length - 2]);
            }
            $("#hi_totalFloor").val(returnValue(house.hi_totalFloor));
            $("#hi_orientation").val(returnValue(house.hi_orientation));
            $("#hi_state").val(returnValue(house.hi_state));


             if(returnValue(house.hi_money) == null || returnValue(house.hi_money) == ""){
                 $("#hi_money").val(returnFloat(house.hi_price));
             }
             else{
                $("#hi_money").val(returnValue(house.hi_money));
             }


            // 房屋配置
            if(house.conim_id == "" || house.conim_id == null){
                $("input[name=conim_id]").each(function () {
                    if (returnValue(house.hi_project).indexOf($(this).parent().text()) > -1) {
                        $(this).attr("checked", "checked").parent().addClass("check-item-ok");
                    }
                });
            }else{
                $("input[name=conim_id]").each(function () {
                    if (returnValue(house.conim_id).indexOf($(this).val()) > -1) {
                        $(this).attr("checked", "checked").parent().addClass("check-item-ok");
                    }
                });

            }

            // 房屋优势
            $("input[name=hi_function]").each(function () {
                if (returnValue(house.hi_function).indexOf($(this).val()) > -1) {
                    $(this).attr("checked", "checked").parent().addClass("check-item-ok");
                }
            });

            $("#hi_area option").each(function () {
                if ($(this).val() == house.propertyInfo_quyu) {
                    $(this).attr("selected", "selected");
                }
            });
            $("#propertyInfo_Id").val(house.propertyInfo_Id);
            $("#propertyInfo_address").val(house.propertyInfo_address);
            $("#propertyInfo_coordinate").val(house.propertyInfo_coordinate);
            $("#propertyInfo_quyu").val(house.propertyInfo_quyu);
            $("#propertyInfo_transit").val(house.propertyInfo_transit);
            $("#propertyInfo_gui").val(house.propertyInfo_gui);
            // $("#hi_area").val(returnValue(house.propertyInfo_quyu));
            // 详细地址
            var houseExtended = result.houseExtended;
            if (!isEmpty(houseExtended)) {
                $("#he_address").val(returnValue(house.propertyInfo_address));
                // $("#he_address").val(returnValue(houseExtended.he_address));
            }
            $("#hi_busStation").val(house.propertyInfo_transit);
            $("#hi_metro").val(house.propertyInfo_gui);

            // 房屋管家
            var em = result.employee;
            if (!isEmpty(em)) {
                var name = em.em_name + "-" + em.em_phone;
                $("#em_name").val(name);
            }
            em_name=em.em_name;
            em_phone=em.em_phone;
//				// 加载地图
            if (!isEmpty(house.propertyInfo_coordinate)) {
                var latitude = (house.propertyInfo_coordinate).split(',');
                houseMap = initHouseMap(new BMap.Point(latitude[0], latitude[1]));
            } else if (house.he_address != "") {
                houseMap = initHouseMap(returnValue(house.he_address));
            } else {
                houseMap = initHouseMap(returnValue("南岸区"));
            }
//				// 加载坐标
            /*houseMarker = initHouseMarker(houseMap);*/
            $("#hi_code").val(hi_code);
            $("#contractObject_Id").val(house.contractObject_Id);
            $(".checkbox[id!='guanwang']").on("click", function () {
                if ($(this).attr("class") == "checkbox click") {
                    $(this).attr("class", "checkbox");
                } else {
                    $(this).attr("class", "checkbox click");
                }
            });

            //房源发布渠道
            var h='';
            $(housePublish).each(function (index,intem) {
                    // h+='<label class="checkbox click" code="'+intem.hpc_code+'"><i>'+intem.hpc_name+'</i></label>';
                h+='<label class="check-item check-item-ok" onclick="checkProject(this)" style="border-radius: 4px;"><input type="checkbox" name="housePublish" value="'+intem.hpc_code+'" checked="checked"/>'+intem.hpc_name+'</label>';
            });
            $('.publishArea').append(h);
            var hpc_status='';
            $(hpc).each(function (index,item) {
                hpc_status +=item.hpc_code+',';
            })
            $("input[name=housePublish]").each(function () {
                if (returnValue(hpc_status).indexOf($(this).val()) > -1) {
                    $(this).attr("checked", "checked").parent().addClass("check-item-ok");
                }
            })

            //$("#hi_busStation").val(house.hi);

            //点击图片勾选框
            $(".body-image-body").on("click",function () {
                if ($(this).next().find(".box-i").attr("class") == "box-i fa-check") {
                    $(this).next().find(".box-i").attr('class', 'box-i');
                    $(this).next().find(".item-cover").attr("class","item-cover");
                    $(this).next().find(".item-cover").css("background","#FFFFFF");
                    $(this).next().find(".item-cover").css("color","#666666");
                    $(this).next().find(".item-cover").css("border","1px solid #666666");
                } else {
                    $(this).next().find(".box-i").attr('class', 'box-i fa-check');
                    $(this).next().find(".box-i").css('color', '#1ABC9C');
                }
            });

            $(".item-cover").on("click",function(){
                $(".item-cover").attr("class","item-cover");
                $(".item-cover").css("background","#FFFFFF");
                $(".item-cover").css("color","#666666");
                $(".item-cover").css("border","1px solid #666666");
                $(this).attr("class","item-cover item-checked");
                $(this).css("background","#1ABC9C");
                $(this).css("color","#FFFFFF");
                $(this).css("border","1px solid #1ABC9C");
                $(this).prev().find(".box-i").attr('class', 'box-i fa-check');
               $(this).prev().find(".box-i").css('color', '#1ABC9C');
            });
        }, "json");
}
//预览pc端
function previewHousePublish () {
    //整租合租
    var hb_id='';
    $("input[name=hb_id]:checked").each(function () {
        hb_id +=$(this).val();
    });
    //房屋配置
    var conim_id='';
    $("#listForm input[name='conim_id']:checked").each(function () {
        conim_id +=$(this).val()+',';
    });
    //房源优势
    var hi_function = "";
    $("#listForm input[name='hi_function']:checked").each(function () {
        hi_function += $(this).val()+',';
    });
    console
    // 封装图片
    var nid = '';
    var boolType = false;
    $('.folder-item-body .box-i').each(function () {
        if ($(this).attr("class") == "box-i fa-check") {
            var type = "";
            if($(this).parent().next().attr("class") == "item-cover item-checked"){
                type = "-3";
                boolType = true;
            }else{
                type = "-1";
            }
            nid += $(this).parent().parent('div').parent().find('input').val()+type+ '_';
        }
    });

    //预览
    functionIfram('/houseLibrary/previewHousePublish?hi_code='+$("#hi_code").val()+'&em_name='+em_name+'&em_phone='+em_phone+
            '&hi_content='+$("#hi_content").val()+'&hi_measure='+$('#hi_measure').val()+'&hi_floor='+$('#hi_floor').val()+
            '&hi_totalFloor='+$('#hi_totalFloor').val()+'&hi_orientation='+$('#hi_orientation').val()+'&hi_name='+$('#hi_name').val()+
            '&hi_houseT='+$('#hi_houseT').val()+'&hi_houseS='+$('#hi_houseS').val()+'&hi_houseW='+$('#hi_houseW').val()+'&hi_state='+$('#hi_state').val()+
            '&hi_busLine='+$('#hi_busLine').val()+'&propertyInfo_coordinate='+$("#propertyInfo_coordinate").val()+'&conim_id='+conim_id+
            '&hm_id='+nid+'&hi_function='+hi_function+'&hi_money='+$('#hi_money').val()+'&hb_id='+hb_id,'预览','库存房源');

}
//手机端预览
var pointer='';
$(document).on('click','#AppPublish',function(e){
    pointer=$('#propertyInfo_coordinate').val();
    // 封装图片
    var nid = '';
    var boolType = false;
    var image = [];
    $('.folder-item-body .box-i').each(function () {
        if ($(this).attr("class") == "box-i fa-check") {
            var type = "";
            if ($(this).parent().next().attr("class") == "item-cover item-checked") {
                type = "-3";
                boolType = true;
            } else {
                type = "-1";
            }
            nid += $(this).parent().parent('div').parent().find('input').val() + type + '_';
            image.push($(this).parent().parent('div').parent().find('img').attr('src')+'_'+type);
        }
    });
    //整租合租
    var hb_id = '';
    $("input[name=hb_id]:checked").each(function () {
        hb_id += $(this).val();
    });
    //房源优势
    var hi_function = "";
    $("#listForm input[name='hi_function']:checked").each(function () {
        hi_function += $(this).val() + ',';
    });
    //房屋配置
    var conim_id = '';
    $("#listForm input[name='conim_id']:checked").each(function () {
        conim_id += $(this).val() + ',';
    });
    var html = '';
    html += '<div class="cd-popup3">';
    html += '<div class="cd-popup-container3 cd-popup custom-scroll" id="cd-popup-container3" style="display: none;">';
    html += '<div id="cd-buttons">';
    html += '  <div class="base">';
    html += '      <div>';
    html += '          <article>';
    html += '              <div class="scroll relative">';
    html += '                  <div class="scroll_box" id="scroll_img">';
    html += '                      <ul class="scroll_wrap">';
    $(image).each(function (index, item) {
        var img=item.split('_')
        if (img[1] == -3) {
            html += '    <li>';
            html += '        <a href="guangao1.html"><img src="' + img[0] + '" width="365px" height="254px"/></a>';
            html += '    </li>';
        }
    })
    $(image).each(function (index, item) {
        var img=item.split('_')
        if (img[1] == -1) {
            html += '    <li>';
            html += '        <a><img src="' + img[0] + '" width="365px" height="254px"/></a>';
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
            html += '                          <a href="javascript:void(0);">' + index + '<img src="" /> </a>';
            html += '                      </li>';
        } else {
            html += '                      <li>';
            html += '                          <a href="javascript:void(0);">' + index + '<img src="" /></a>';
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
    html += '              <a class="house_title">' + $('#hi_name').val() + '</a>';
    html += '              <a class="area">南岸区</a>';
    html += '          </div>';
    html += '      </div>';
    html += '      <div class="house_info">';
    html += '          <div class="ZJ">';
    html += '              <p>租金</p>';
    html += '              <p>' + $('#hi_money').val() + '元/月</p>';
    html += '          </div>';
    html += '          <div class="HX">';
    html += '              <p>户型</p>';
    html += '              <p>' + $('#hi_houseS').val() + '室' + $('#hi_houseT').val() + '厅' + $('#hi_houseW').val() + '卫</p>';
    html += '          </div>';
    html += '          <div class="MJ">';
    html += '              <p>面积</p>';
    html += '              <p>' + $('#hi_measure').val() + '平米</p>';
    html += '          </div>';
    html += '      </div>';
    html += '      <div class="posit">';
    html += '          <table>';
    html += '              <tr>';
    html += '                  <td>楼层 : ' + $('#hi_floor').val() + '/' + $('#hi_totalFloor').val() + '层</td>';
    html += '                  <td>朝向 : ' + $('#hi_orientation').val() + '</td>';
    html += '              </tr>';
    html += '              <tr>';
    html += '                  <td>装修 : ' + $('#hi_state').val() + '</td>';
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
    html += '                      <td>按月付 : ' + $('#hi_money').val() + '元/月</td>';
    html += '                      <td>按季付 : ' + $('#hi_money').val() + '元/月</td>';
    html += '                  </tr>';
    html += '                  <tr>';
    html += '                      <td>半年付 : ' + $('#hi_money').val() + '元/月</td>';
    html += '                      <td>按年付 : ' + $('#hi_money').val() + '元/月</td>';
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
    var conim = conim_id.substring(0, conim_id.length - 1).split(",");
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
    var hi_function = "";
    $("#listForm input[name='hi_function']:checked").each(function () {
        hi_function += $(this).val() + ',';
    });
    var hiFunction = hi_function.substring(0, hi_function.length - 1).split(",");
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
    html += '              <p>交通便利,环境好,生活配套齐全!交通便利,环境好,生活配套齐全!交通便利,环境好!</p>';
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
    html += '                      <a>'+$('#hi_metro').val()+'</a>';
    html += '                  </p>';
    html += '              </div>';
    html += '              <div class="traLine">';
    html += '                  <p>交通线路:</p>';
    html += '                  <p>';
    html += '                      <a>'+$('#hi_busLine').val()+'</a>';
    html += '                  </p>';
    html += '              </div>';
    html += '              <div class="houseAddress">';
    html += '                  <p>房屋地址:</p>';
    html += '                  <p>';
    html += '                      <a>'+$('#he_address').val()+'</a>';
    html += '                  </p>';
    html += '              </div>';
    html += '          </div>';
    html += '      </div>';
    html += '      <div id="allAppMap" class="custom-scroll">';
    html += '      </div>';
    html += '      <div class="footer">';
    html += '          <div class="xx">';
    html += '              <a href="tel:13419179266">联系管家</a>';
    html += '          </div>';
    html += '          <div class="yy">';
    html += '              <a href="">缴纳定金</a>';
    html += '          </div>';
    html += '          <div class="zz">';
    html += '              <a href="">房屋预约</a>';
    html += '          </div>';
    html += '      </div>';
    html += '  </div>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    $('#content').after(html);
    $('.cd-popup').show();
    $('.cd-popup3').addClass('is-visible3');
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
    //地图
    mapInit();
    $('#allAppMap').css({
        'overflow': 'auto',
        'height': '275px',
    });
    e.stopPropagation();
})
$(document).click(function () {
    if ($('.cd-popup3').hasClass('is-visible3')) {
        $(".cd-popup").remove();
        $('.is-visible3').remove();
    }
})
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





//图片全选
$(document).on('click', '.all_chose', function () {
    $(this).parent('div').parent('div').find('ul').find('.box-i').each(function () {
        if ($(this).attr("class") != "box-i fa-check") {
            $(this).attr('class', 'box-i fa-check');
            $(this).css('color', '#1ABC9C');
        }
    })
    $(this).hide();
    $(this).next().show();
});
//取消图片全选
$(document).on('click', '.all_close', function () {
    $(this).parent('div').parent('div').find('ul').find('.box-i').each(function () {
        if ($(this).attr("class") == "box-i fa-check") {
            $(this).attr('class', 'box-i');
            $(this).css('color', '#1ABC9C');
        }
    })
    $('.all_chose').show();
    $('.all_close').hide();
})
//房源标题取消默认
$(document).on('click', '.title', function () {
    $("#hi_name").val(returnValue($(".name_").val()));
})
//房源标题默认
$(document).on('click', '.title1', function () {
    $("#hi_name").val(returnValue($(".house_name").val()));
    $('.title').show();
    $('.title1').hide();
})

/**
 * 初始化地图
 *
 * @param center
 * @returns
 */
function initHouseMap(center) {
    map = new BMap.Map("houseMap");
    map.centerAndZoom(center, 13);
    map.enableInertialDragging(true); // 允许惯性拖拽
    map.enableScrollWheelZoom(); //开启滚轮缩放地图
    map.addControl(new BMap.NavigationControl()); // 添加左侧平移和缩放按钮
    map.addEventListener("click", function (e) {

    }); // 绑定点击事件

    searchOnMap();

    var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
        {
            "input": "baidu"
            , "location": map
        });


    ac.addEventListener("onhighlight", function (e) {  //鼠标放在下拉列表上的事件
        var str = "";
        var _value = e.fromitem.value;
        var value = "";
        if (e.fromitem.index > -1) {
            value = _value.province + _value.city + _value.district + _value.street + _value.business;
        }
        str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

        value = "";
        if (e.toitem.index > -1) {
            _value = e.toitem.value;
            value = _value.province + _value.city + _value.district + _value.street + _value.business;
        }
        str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
        G("searchResultPanel").innerHTML = str;
    });

    var myValue;
    ac.addEventListener("onconfirm", function (e) {    //鼠标点击下拉列表后的事件
        var _value = e.item.value;
        myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
        G("searchResultPanel").innerHTML = "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;

        setPlace(map, myValue);
    });

    return map;
}

// 百度地图API功能
function G(id) {
    return document.getElementById(id);
}


function setPlace(map, myValue) {
    map.clearOverlays();    //清除地图上所有覆盖物
    function myFun() {
        var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
        $("#hi_latitude").val(pp.lng + "," + pp.lat);
        map.centerAndZoom(pp, 18);
        var coordinate = new BMap.Icon("/resources/image/house_coordinate.png", new BMap.Size(16, 22));
        var marker = new BMap.Marker(pp, {icon: coordinate});
        marker.enableDragging();  //设置可拖拽
        marker.addEventListener("dragend", function (e) {  //拖动事件
            var pt = e.point;
            $("#hi_latitude").val(pt.lng + "," + pt.lat);
        });
        map.addOverlay(marker);   //添加标注
    }

    var local = new BMap.LocalSearch(map, { //智能搜索
        onSearchComplete: myFun
    });
    local.search(myValue);
    $("#he_address").val($("#baidu").val());
}

/**
 * 初始化坐标
 *
 * @param point
 * @returns
 */
function initHouseMarker(map) {
    var coordinate = new BMap.Icon("/resources/image/house_coordinate.png", new BMap.Size(16, 22));
    var marker = new BMap.Marker(map.getCenter(), {icon: coordinate});
    marker.enableDragging(true);
    marker.addEventListener("mouseup", function (e) {
        var point = e.target.getPosition();
        $("#hi_latitude").val(point.lng + "," + point.lat);
    });
    map.addOverlay(marker);
    return marker;
}

/**
 * 房间配置勾选
 *
 * @param obj
 * @returns
 */
function checkProject(obj) {
    var checked = $(obj).find('input').is(":checked");
    if (checked) {
        $(obj).addClass("check-item-ok");
        $(obj).find('input').attr("checked", "checked");
        /*var htmCon="";
        // 加载图片上传插件
        htmCon += "<div id='image-upload-box-con' style='width: 90%;'></div>";
        $("#houseConfig").append(htmCon);
        imageUpload = $("#image-upload-box-con" +
            "").imageUpload();*/
    } else {
        $(obj).removeClass("check-item-ok");
        $(obj).find('input').removeAttr("checked");
    }
}

/**
 * 房屋品牌勾选
 *
 * @param obj
 */
function checkBrand(obj) {
    var checked = $(obj).find('input').is(":checked");
    if (checked) {
        $(obj).addClass("check-item-ok");
        $(obj).siblings().removeClass("check-item-ok");
    }
}

/**
 * 移动地图窗口
 *
 * @param obj
 * @returns
 */
function moveMapWidow(obj) {
    var area = $(obj).val().trim();
    if (area != "") {
        houseMap.centerAndZoom(area, 16);
    }
}

/**
 * 房屋地址定位
 *
 * @param obj
 * @returns
 */
function searchOnMap() {
    var address = $("#he_address").val().trim();
    if (address != "") {
        // 创建地址解析器实例
        var myGeo = new BMap.Geocoder();
        // 将地址解析结果显示在地图上,并调整地图视野
        myGeo.getPoint(address, function (point) {
            if (point) {
                $("#hi_latitude").val(point.lng + "," + point.lat);
                // 定位到该处
                houseMap.centerAndZoom(point, 16);
                // 如果没坐标，初始化坐标，否则将坐标移动到该处
                if (houseMarker == null) {
                    houseMarker = initHouseMarker(houseMap);
                } else {
                    houseMarker.setPosition(point);
                }
                $("#hi_latitude").val(point.lng + "," + point.lat);
                houseMarker.addEventListener("dragend", function (e) {  //拖动事件
                    var pt = e.point;
                    $("#hi_latitude").val(pt.lng + "," + pt.lat);
                });
            } else {
                $.jBox.tip("未查询到该地址！", "error");
            }
        }, "重庆");
    } else {
        $.jBox.tip("请输入详细地址！", "error");
    }
}


//获取周边公交站
function searchOnMapBus(num) {
    map.clearOverlays();//清除图层覆盖物
    var address = $("#he_address").val().trim();
    if (address != "") {
        // 创建地址解析器实例
        var myGeo = new BMap.Geocoder();
        // 将地址解析结果显示在地图上,并调整地图视野
        myGeo.getPoint(address, function (point) {
            if (point) {
                // 定位到该处
                houseMap.centerAndZoom(point, 16);

                //搜索圆形区域周边公交站,地铁站
                var circle = new BMap.Circle(point, 500, {fillColor: "CornflowerBlue", strokeWeight: 1, fillOpacity: 0.3, strokeOpacity: 0.3});
                houseMap.addOverlay(circle);
                var local = new BMap.LocalSearch(houseMap, {renderOptions: {map: houseMap, autoViewport: false}});
                if (num == 1) {
                    local.searchNearby('公交站', point, 500);
                } else {
                    local.searchNearby('地铁站', point, 500);
                }
                initHouseMarker(map);
            } else {
                $.jBox.tip("未查询到该地址！", "error");
            }
        }, "重庆");
    } else {
        $.jBox.tip("请输入详细地址！", "error");
    }
}


/**
 * 取消发布
 *
 * @returns
 */
function cancelPublish() {
    $("#house-publish").animate({right: "-85%"}, 600, function () {
        $("#house-publish").remove();
        $("#house-publish-mask").remove();
        ueditor.destroy();
    });
    $("#house-publish-mask").fadeOut(600);
}

/**
 * 确认发布
 *
 * @returns
 */
function submitPublish() {
    var bool = true;
    $("#listForm input[required]:visible").each(function () {
        if (isEmpty($(this).val())) {
            $(this).focus();
            bool = false;
            return false;
        }
    });
    var checked = $("#listForm input[name='conim_id']:checked");
    if (checked.length == 0) {
        $.jBox.tip("请勾选房屋配置", "error");
        return;
    }

    var hi_project = "";
    $("#listForm input[name='conim_id']:checked").each(function () {
        hi_project += $(this).parent().text();
    });

    var checked = $("#listForm input[name='hi_function']:checked");
    if (checked.length == 0) {
        $.jBox.tip("请勾选房源优势", "error");
        return;
    }
    var hi_function = "";
    $("#listForm input[name='hi_function']:checked").each(function () {
        hi_function += $(this).val();
    });
    //发布渠道
    var publishArea = "";
    $("#publishArea input[name='housePublish']:checked").each(function () {
            publishArea += $(this).val() + ",";
    });
    if (publishArea != "") {
        publishArea = publishArea.substring(0, publishArea.length - 1);
    }
    // 总层数
    var hi_totalFloor = $("#hi_totalFloor").val();
    if (isEmpty(hi_totalFloor)) {
        $.jBox.tip("请输入总层数", "error");
        return;
    }
    //朝向
    var hi_orientation = $("#hi_orientation").val();
    if (isEmpty(hi_orientation)) {
        $.jBox.tip("请输入朝向", "error");
        return;
    }
    //出租价格
    var hi_money = $("#hi_money").val();
    if (isEmpty(hi_money)) {
        $.jBox.tip("请输入出租价格", "error");
        return;
    }
    //区域
    var hi_area = $("#hi_area").val();
    if (isEmpty(hi_area)) {
        $.jBox.tip("请选择区域", "error");
        return;
    }

    //详细地址
    var he_address = $("#he_address").val();
    if (isEmpty(he_address)) {
        $.jBox.tip("请输入详细地址", "error");
        return;
    }

    //公交站台
    var hi_busStation = $("#hi_busStation").val();
    if (isEmpty(hi_busStation)) {
        $.jBox.tip("请输入公交站台", "error");
        return;
    }

    //公交线路
    var hi_busStation = $("#hi_busStation").val();
    if (isEmpty(hi_busStation)) {
        $.jBox.tip("请输入公交线路", "error");
        return;
    }

    //公交线路
    var hi_metro = $("#hi_metro").val();
    if (isEmpty(hi_metro)) {
        $.jBox.tip("请输入地铁线路", "error");
        return;
    }

    // 提交数据
    if (bool) {
        var data = $("#listForm").serialize();
        // 封装图片
        var nid = '';
        var boolType = false;
        $('.folder-item-body .box-i').each(function () {
            if ($(this).attr("class") == "box-i fa-check") {
                var type = "";
                if($(this).parent().next().attr("class") == "item-cover item-checked"){
                    type = "-3";
                    boolType = true;
                }else{
                    type = "-1";
                }
                nid += $(this).parent().parent('div').parent().find('input').val()+ type + '_';
            }
        });
        if(!boolType){
            $.jBox.tip("请选择封面图片，并且封面图片必须是客厅", "error");
            return;
        }
        data += "&images=" + nid;
        data += "&publishArea=" + publishArea;
        if (hi_project.indexOf(",") > -1) {
            data += "&hi_project=" + hi_project.substring(0, hi_project.length - 1);
        } else {
            data += "&hi_project=" + hi_project;
        }
        if (hi_function.indexOf(",") > -1) {
            data += "&hi_function=" + hi_function.substring(0, hi_function.length - 1);
        } else {
            data += hi_function;
        }
        data += "&propertyInfo_address=";
        data += "&hi_totalFloor=" + hi_totalFloor;
        data += "&isUpd=" + ($("[name=isUpd]").has(":checked") ? 1 : 0);
        // data += "&hi_metro=" + $("#hi_metro").val();
        // data += "&hi_busStation=" + $("#hi_busStation").val();
        // data += "&hi_area=" + $("#hi_area").val();
        $.ajax({
            type: "POST",
            url: "/houseLibrary/addOnlineHouse",
            data:data,
            dataType: "json",
            beforeSend: function () {
                $.jBox.tip("发布中，请稍后...", "loading");
            },
            success : function(result){
                if (result.msg == "success") {
                    $.jBox.tip("发布成功!", "success");
                    $("#house-publish").animate({"right": "-85%"}, 600, function () {
                        $("#house-publish").remove();
                        $("#house-publish-mask").remove();
                        ueditor.destroy();
                    });
                } else {
                    $.jBox.tip(result.msg, "error");
                }
            }
        });
    }
}

/**
 * 返回图片类型
 *
 * @param param
 */
function returnImageType(param) {
    switch (param) {
        case "page":
            return "封面图片";
            break;
        case "effect":
            return "效果图片";
            break;
        case "solid":
            return "户型图片";
            break;
        case "3d":
            return "3D图片";
            break;
        default:
            return "";
            break;
    }
}

/**
 * 返回图片类型样式
 *
 * @param param
 */
function returnImageTypeClass(param) {
    switch (param) {
        case "page":
            return "next-bg";
            break;
        case "effect":
            return "";
            break;
        case "solid":
            return "hint-bg";
            break;
        case "3d":
            return "error-bg";
            break;
        default:
            return "";
            break;
    }
}

/** 选择房源配置qs */
function changefangyuanpeizhi(obj) {
    var check = $(obj).find("input").is(":checked");
    if (check == false) {
        $(obj).addClass("span-checked");
        $(obj).find("input").attr("checked", true);
        $("#fangyuanpeizhi").val($("#fangyuanpeizhi").val() + "," + $(obj).find("input").val());
    } else {
        $(obj).removeClass("span-checked");
        $(obj).find("input").attr("checked", false);
        $("#fangyuanpeizhi").val($("#fangyuanpeizhi").val().replace($(obj).find("input").val(), ""));

    }
}

/**
 * 刷新
 */
function refreshDiv() {
    fb();
}