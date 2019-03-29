var pointer = "";
var img='';
var chose='';
var conim_type='';
$(function(){
    //价格
    $('#hi_money').text('￥'+$('#money').val().split('.')[0]);
    //坐标
    pointer=$('#propertyInfo_coordinate').val();
    mapInit();
    //轮播图
    $('.imageB').find('img').each(function (){
        img+=$(this).attr('data-src')+'-'+$(this).attr('chose')+'_';
    });
    var image=[];
    image=img.substr(0,img.length-1).split('_');
    var imageBig = "";
    var imageSmall = "";
    $(image).each(function(index,item){
        var img=item.split('-');
        // if (img[1] == 3) {
            imageBig +='<div class="sp-slide">' +
                '   <img class="sp-image" src="/resources/Plug-in/sliderPro/css/images/blank.gif"' +
                '   data-src="'+ img[0] +'">' +
                '   </div>';
            imageSmall +='<img class="sp-thumbnail" src="'+ img[0] +'" chose="'+img[1]+'"/>';
        // }
    });
    $("#houseImage .sp-slides").html(imageBig);
    $("#houseImage .sp-thumbnails").html(imageSmall);

    $("#houseImage").sliderPro({
        width: 580,
        height: 470,
        fade: true,
        arrows: true,
        buttons: false,
        fullScreen: true,
        shuffle: true,
        smallSize: 500,
        mediumSize: 1000,
        largeSize: 3000,
        thumbnailArrows: true,
        autoplay: false
    })

    // 房屋配置
    $('input[name=conim_type]').each(function (){
        conim_type+=$(this).val()+'_';
    })
    var houseType=[];
    houseType=conim_type.substr(0,conim_type.length-1).split('_')
    $(houseType).each(function(index,item){
        if (item == "电视") {
            $("#television").attr("src","/resources/image/houseDetails/ic_television_click.svg");
        } else if (item == "洗衣机") {
            $("#washer").attr("src","/resources/image/houseDetails/ic_washer_click.svg");
        } else if (item == "床") {
            $("#badroom").attr("src","/resources/image/houseDetails/ic_badroom_click.svg");
        } else if (item == "衣柜") {
            $("#cabinet").attr("src","/resources/image/houseDetails/ic_cabinet_click.svg");
        } else if (item == "空调") {
            $("#air").attr("src","/resources/image/houseDetails/ic_air_click.svg");
        } else if (item == "宽带") {
            $("#wifi").attr("src","/resources/image/houseDetails/ic_wifi_click.svg");
        } else if (item == "热水器") {
            $("#bathe").attr("src","/resources/image/houseDetails/ic_bathe_click.svg");
        } else if (item == "智能锁") {
            $("#interLock").attr("src","/resources/image/houseDetails/ic_interLock_click.svg");
        }
    });
    // 房源优势
    var hi_function = $('#hi_function').val().substring(0,$('#hi_function').val().length-1).split(",");
    var hi_functionText = "";
    for(var i = 0; i < hi_function.length; i++){
            var labels = "label"+ (i+1) +"";
            hi_functionText += '<label class="'+ labels +'">'+ hi_function[i] +'</label>';
    }
    $(".house_center_right .house_title_label").html(hi_functionText);
});

// 初始化地图
function mapInit(){
    var arr = pointer.split(',');
    var allmap = initHouseMap(); //初始化地图调用
    map.clearOverlays(); //清除图层覆盖物
    var point = new BMap.Point(arr[0], arr[1]);
    var marker = new BMap.Marker(point); // 创建标注
    map.addOverlay(marker); // 将标注添加到地图中
    marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
    // 定位到该处
    allmap.centerAndZoom(point, 15);
}

//初始化百度地图
function initHouseMap() {
    map = new BMap.Map("allmap");
    map.centerAndZoom(new BMap.Point(106.553865, 29.538099), 15);
    map.enableInertialDragging(true); // 允许惯性拖拽
    map.enableScrollWheelZoom(); //开启滚轮缩放地图
    map.addControl(new BMap.NavigationControl()); // 添加左侧平移和缩放按钮
    map.addEventListener("click", function (e) {
    }); // 绑定点击事件
    return map;
}