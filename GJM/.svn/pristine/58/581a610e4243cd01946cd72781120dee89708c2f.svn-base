var addHouseMap=null; // 添加
var houseMap=null; //编辑地图
var lookhouseMap=null; //查看地图
$(function() {
    data();
})
//小区数据
function data () {
    $.ajax({
        type: "POST",
        url: "/propertyInfo/selectupnSid",
        data:"upn_sid="+0,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function(result) {
            $('.prop-menu-main').empty();
            $('.tab_menu #information').css('border-bottom', '2px solid rgb(0, 153, 255)');
            $('.tab_menu #Additional').css('border-bottom', '');
            $('.prop-menu-nav').show();
            $('.prop-menu-nav').empty();
            var html ='';
                html +='<button class="span-i"><i  class="icon icon-home" style="line-height: 40px;"></i></button>';
                html +='<div style="flex: 1;">';
                html +='    <input type="text" value="" placeholder="请输入小区名称" id="sousuowuyename" style="width: 100%;height: 38px;border: none;" name="wuyename" onchange="selProperName()"/>';
                html +='</div>';
                html +='<button class="button-square"><i class="fa fa-search" style="color: #069;font-size: 15px;cursor: pointer;float: right;margin: 9px 12px;" onclick="selProperName()"></i></button>'
                html +='<button class="button-square" onclick="addProperInfo('+0+');"><i class="fa fa-plus-square" style="font-size: 22px;color: #18bc9c;cursor: pointer;float: right;margin: 9px 12px;"></i></button>';
            $('.prop-menu-nav').append(html);
            var html1='';
                for (var i=0;i<result.lists.length;i++) {
                    if (i == 0) {
                        html1 +='<dl class="dl-color">';
                        html1 +='    <dd>';
                        html1 +='        <button class="span-i"><i class="icon icon-home" style="line-height: 40px;"></i></button>';
                        html1 +='        <span class="span-btn updateProperInfo" onclick="AdditionalInformation('+result.lists[i].upn_id+');">'+result.lists[i].upn_name+'</span>';
                        html1 +='        <button class="button-square" style="cursor: pointer;" onclick="AdditionalInformation('+result.lists[i].upn_id+');properInfoLower('+result.lists[i].upn_id+');"><i class="fa fa-chevron-right" style="font-size: 18px;color: #DDDDDD;line-height: 40px;"></i></button>';
                        html1 += '   </dd>';
                        html1 +='</dl>';
                        $('#upn_id').val(result.lists[i].upn_id);
                    } else {
                        html1 +='<dl>';
                        html1 +='    <dd>';
                        html1 +='        <button class="span-i"><i class="icon icon-home" style="line-height: 40px;"></i></button>';
                        html1 +='        <span class="span-btn updateProperInfo" onclick="AdditionalInformation('+result.lists[i].upn_id+');">'+result.lists[i].upn_name+'</span>';
                        html1 +='        <button class="button-square" style="cursor: pointer;" onclick="AdditionalInformation('+result.lists[i].upn_id+');properInfoLower('+result.lists[i].upn_id+');"><i class="fa fa-chevron-right" style="font-size: 18px;color: #DDDDDD;line-height: 40px;"></i></button>';
                        html1 += '   </dd>';
                        html1 +='</dl>';
                    }
                }
            $('.prop-menu-main').append(html1);
            AdditionalInformation(result.lists[0].upn_id);
                $('.tab_menu .selected').css('border-bottom','2px solid #0099FF');
        }
    });
}
//模糊搜索
function selProperName(){
    var v = $("#sousuowuyename").val();
    $.ajax({
        type: "POST",
        url: "/propertyInfo/selectProperInfoName",
        data:{upn_name:v,upn_pid:0},
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function(result) {
            $('.prop-menu-main').empty();
            $('.tab_menu #information').css('border-bottom', '2px solid rgb(0, 153, 255)');
            $('.tab_menu #Additional').css('border-bottom', '');
            var html ='';
                $('.prop-menu-nav').empty();
                html +='<button class="span-i" onclick="data();"><i  class="fa fa-chevron-left" style="line-height: 40px;cursor: pointer;"></i></button>';
                html +='<div style="flex: 1;">';
                html +='    <input type="text" value="'+v+'" placeholder="请输入小区名称" id="sousuowuyename" style="width: 100%;height: 38px;border: none;" name="wuyename" onchange="selProperName()"/>';
                html +='</div>';
                html +='<button class="button-square"><i class="fa fa-search" style="color: #069;font-size: 15px;cursor: pointer;float: right;margin: 9px 12px;" onclick="selProperName()"></i></button>'
                html +='<button class="button-square" onclick="addProperInfo('+0+');"><i class="fa fa-plus-square" style="font-size: 22px;color: #18bc9c;cursor: pointer;float: right;margin: 9px 12px;"></i></button>';
                $('.prop-menu-nav').append(html);
            var html1='';
            for (var i=0;i<result.pInfoNames.length;i++) {
                if (i == 0) {
                    html1 +='<dl class="dl-color">';
                    html1 +='    <dd>';
                    html1 +='        <button class="span-i"><i class="icon icon-home" style="line-height: 40px;"></i></button>';
                    html1 +='        <span class="span-btn updateProperInfo" onclick="AdditionalInformation('+result.pInfoNames[i].upn_id+');">'+result.pInfoNames[i].upn_name+'</span>';
                    // html1 +='        <button class="button-square" style="cursor: pointer;" onclick="AdditionalInformation('+result.pInfoNames[i].upn_id+');properInfoLower('+result.pInfoNames[i].upn_id+');"><i class="fa fa-pencil" style="font-size: 22px;color: #DDDDDD;float: right;margin: 9px 12px;border-bottom: 1px solid #DDDDDD;"></i></button>';
                    html1 +='        <button class="button-square" style="cursor: pointer;" onclick="AdditionalInformation('+result.pInfoNames[i].upn_id+');properInfoLower('+result.pInfoNames[i].upn_id+');"><i class="fa fa-chevron-right" style="font-size: 18px;color: #DDDDDD;line-height: 40px;"></i></button>';
                    html1 += '   </dd>';
                    html1 +='</dl>';
                    $('#upn_id').val(result.pInfoNames[i].upn_id);
                } else {
                    html1 +='<dl>';
                    html1 +='    <dd>';
                    html1 +='        <button class="span-i"><i class="icon icon-home" style="line-height: 40px;"></i></button>';
                    html1 +='        <span class="span-btn updateProperInfo" onclick="AdditionalInformation('+result.pInfoNames[i].upn_id+');">'+result.pInfoNames[i].upn_name+'</span>';
                    // html1 +='        <button class="button-square" style="cursor: pointer;" onclick="AdditionalInformation('+result.pInfoNames[i].upn_id+');properInfoLower('+result.pInfoNames[i].upn_id+');"><i class="fa fa-pencil" style="font-size: 22px;color: #DDDDDD;float: right;margin: 9px 12px;border-bottom: 1px solid #DDDDDD;"></i></button>';
                    html1 +='        <button class="button-square" style="cursor: pointer;" onclick="AdditionalInformation('+result.pInfoNames[i].upn_id+');properInfoLower('+result.pInfoNames[i].upn_id+');"><i class="fa fa-chevron-right" style="font-size: 18px;color: #DDDDDD;line-height: 40px;"></i></button>';
                    html1 += '   </dd>';
                    html1 +='</dl>';
                }
            }
            $('.prop-menu-main').append(html1);
            if (result.pInfoNames.length != 0) {
                AdditionalInformation(result.pInfoNames[0].upn_id);
            }
                $('.tab_menu .selected').css('border-bottom','2px solid #0099FF');
        }
    });
}
//获取小区下级
function properInfoLower (upn_id) {
    $('#upn_id').val(upn_id);
    $.ajax({
        type: "POST",
        url: "/propertyInfo/queryPropertyInfoLists",
        data:{upn_pid:upn_id,upn_id:upn_id},
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function(result) {
            $('.prop-menu-nav').hide();
            if (result.lists.length != 0) {
                $('.prop-menu-main').empty();
                var html ='';
                    html +='<dl>';
                    html +='    <dd>';
                    if (result.propertyInfo != null) {
                        if (result.lists[0].upn_sname != result.propertyInfo.upn_name) {
                            html +='        <button class="span-i" style="cursor: pointer;"><i onclick="properInfoLower('+result.lists[0].upn_sid+')" class="fa fa-chevron-left" style="line-height: 40px;"></i></button>';
                            html +='        <span class="span-btn">'+result.lists[0].upn_sname+'&nbsp;/'+result.propertyInfo.upn_name+'</span>';
                        } else {
                            html +='        <button class="span-i" style="cursor: pointer"><i onclick="data()"; class="fa fa-chevron-left" style="line-height: 40px;"></i></button>';
                            html +='        <span class="span-btn">'+result.lists[0].upn_sname+'</span>';
                        }
                    } else {
                        html +='        <button class="span-i" style="cursor: pointer;"><i onclick="data()"; class="fa fa-chevron-left" style="line-height: 40px;"></i></button>';
                        html +='        <span class="span-btn">'+result.lists[0].upn_sname+'</span>';
                    }
                    html +='        <button class="button-square" style="cursor: pointer;" onclick="addPropertyInfoDong('+result.lists[0].upn_sid+');"><i class="fa fa-plus-square" style="font-size: 22px;color: #18bc9c;float: right;margin: 9px 12px;"></i></button>';
                    html += '   </dd>';
                    html +='</dl>';
                    for (var i=0;i<result.lists.length;i++) {
                        if (i ==0 ) {
                            html +='<dl class="dl-color">';
                            html +='    <dd>';
                            html +='        <button class="span-i"><i class="icon icon-home" style="line-height: 40px;"></i></button>';
                            if (result.lists[i].upn_pid != result.lists[i].upn_sid) {
                                html +='        <span class="span-btn updateProperInfo" onclick="AdditionalInformation('+result.lists[i].upn_id+');">'+result.lists[i].upn_name+'</span>';
                            } else {
                                html +='        <span class="span-btn updateProperInfo" onclick="AdditionalInformation('+result.lists[i].upn_id+');">'+result.lists[i].upn_name+'</span>';
                                html +='        <button class="button-square" style="cursor: pointer;" onclick="properInfoLower('+result.lists[i].upn_id+');"><i class="fa fa-chevron-right" style="font-size: 18px;color: #DDDDDD;line-height: 40px;"></i></button>';
                            }
                            html += '   </dd>';
                            html +='</dl>';
                        } else {
                            html +='<dl>';
                            html +='    <dd>';
                            html +='        <button class="span-i"><i class="icon icon-home" style="line-height: 40px;"></i></button>';
                            if (result.lists[i].upn_pid != result.lists[i].upn_sid) {
                                html +='        <span class="span-btn updateProperInfo" onclick="AdditionalInformation('+result.lists[i].upn_id+');">'+result.lists[i].upn_name+'</span>';
                            } else {
                                html +='        <span class="span-btn updateProperInfo" onclick="AdditionalInformation('+result.lists[i].upn_id+');">'+result.lists[i].upn_name+'</span>';
                                html +='        <button class="button-square" style="cursor: pointer;" onclick="properInfoLower('+result.lists[i].upn_id+');"><i class="fa fa-chevron-right" style="font-size: 18px;color: #DDDDDD;line-height: 40px;"></i></button>';
                            }
                            html += '   </dd>';
                            html +='</dl>';
                        }
                    }
                // AdditionalInformation(result.lists[0].upn_id);
                $('.prop-menu-main').append(html);
                $('.tab_menu .selected').css('border-bottom','2px solid #0099FF');
            } else {
                $('.prop-menu-main').empty();
                var html='';
                html +='<dl>';
                html +='    <dd>';
                html +='        <button class="span-i" style="cursor: pointer;"><i onclick="data()"; class="fa fa-chevron-left" style="line-height: 40px;"></i></button>';
                if (result.propertyInfo.upn_sname != result.propertyInfo.upn_name) {
                    html +='        <span class="span-btn updateProperInfo">'+result.propertyInfo.upn_sname+'&nbsp;/'+result.propertyInfo.upn_name+'</span>';
                } else {
                    html +='        <span class="span-btn updateProperInfo">'+result.propertyInfo.upn_name+'</span>';
                }
                html +='        <button class="button-square" style="cursor: pointer;" onclick="addPropertyInfoDong('+result.propertyInfo.upn_id+');"><i class="fa fa-plus-square" style="font-size: 22px;color: #18bc9c;float: right;margin: 9px 12px;"></i></button>';
                html += '   </dd>';
                html +='</dl>';
                $('.prop-menu-main').append(html);
                $('.tab_menu .selected').css('border-bottom','2px solid #0099FF');
            }
        }
    });
}
/******添加小区*******/
//点击添加小区
function addProperInfo (upn_id) {
    if (upn_id != 0) {
        $('#upn_id').val(upn_id);
    }
    //隐藏基本信息
    $('.information-add').empty();
    $('.information-additional').empty();
    $('.information-div-div').hide();
    $('.tab_menu #Additional').css('border-bottom', '');
    $('.tab_menu #information').css('border-bottom', '2px solid rgb(0, 153, 255)');
    $.ajax({
        type: "POST",
        url: "/propertyInfo/selectProperInfo",
        data:{upn_id:upn_id},
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (result) {
                var district=result.district;  // 所属区县
                var companies=result.companies;  //部门
                var html='';
                html +='<div class="information-div-div" style="width: 100%;height: 100%;">';
                html +='    <dl style="margin-top: 10px;">';
                html +='        <dt><em>*</em>小区名称</dt>';
                html +='        <dd>';
                html +='           <input type="text" value="" id="propertyname" class="form-control jianju"placeholder="选择或输入小区名称">';
                html +='            <span id="addpropertyInfoname" hidden="hidden" style="color: red;">名称不能为空!</span>';
                html +='        </dd>';
                html +='    </dl>';
                html +='    <dl>';
                html +='        <dt><em>*</em>区(县)</dt>';
                html +='        <dd>';
                html +='        <select id="insertQuyu" class="form-control" style="width: 180px;" onchange="addstreet();">';
                html +='            <option code="" name="company" value="-1">所属区县</option>';
                for (var i=0;i<district.length;i++) {
                    html +='        <option value='+district[i].name+' code='+district[i].code+'>'+district[i].name+'</option>';
                }
                html +='        </select>';
                html +='        </dd>';
                html +='    </dl>';
                html +='    <dl id="street-dl">';
                html +='        <dt><em>*</em>区域</dt>';
                html +='        <dd class="street">';
                html +='            <i class="street-i" style="font-style: normal;float: left;"></i>';
                html +='            <button class="addArealist common-borderbox-add" onclick="addArea(this);" style="display: none;">';
                html +='                <i class="fa fa-plus-square"></i>';
                html +='            </button>';
                html +='            <button class="updateArealist common-borderbox-add" onclick="updateArealist(this)" style="display: none;">';
                html +='                <i class="fa fa-pencil-square" style="font-size: 22px;color: #1ABC9C;line-height: 40px;margin: 0 12px;"></i>';
                html +='            </button>';
                html +='            <button class="addstreet common-borderbox-add">';
                html +='                <i class="fa fa-arrow-circle-right" style="font-size: 22px;color: #1ABC9C;line-height: 40px;margin: 0 12px;"></i>';
                html +='            </button>';
                html +='            <button class="closestreet common-borderbox-add"style="color: red;float:right;display: none;">';
                html +='                <i class="fa fa-arrow-circle-left" style="font-size: 22px;cursor: pointer;float: right;margin: 9px 12px;"></i>';
                html +='            </button>';
                html +='            <div class="street-div">';
                html +='                <div class="street-quyu custom-scroll">';
                html +='                </div>';
                html +='                <div class="street-right"></div>';
                html +='            </div>';
                html +='        </dd>';
                html +='        </dl>';
                html +='    <dl id="quyu">';
                html +='        <dt><em>*</em>核心小区</dt>';
                html +='        <dd>';
                html +='        <label class="common-borderbox"><input name="quyu" type="radio" value="是">是</label>';
                html +='        <label class="common-borderbox"><input name="quyu" type="radio" value="否">否</label>';
                html +='        <select id="allcompanyziji" class="form-control" style="width: 180px;display: none;">';
                html +='        <option value="">所属部门</option>';
                for (var i=0;i<companies.length;i++) {
                    html +='    <option value='+companies[i].ucc_short+' data-uccId='+companies[i].ucc_id+'>'+companies[i].ucc_short+'</option>';
                }
                html +='        </select>';
                html +='        </dd>';
                html +='    </dl>';
                html +='    <dl id="addwuyeAddress">';
                html +='        <dt><em>*</em>民政地址</dt>';
                html +='        <dd>';
                html +='        <input type="text" value="" id="addPro" class="form-control jianju addPropertyInfo_address" name="propertyInfo_address" placeholder="物业地址">';
                html +='        </dd>';
                html +='    </dl>';
                html += '   <dl style="width: 100%;">';
                html += '       <dt id="mapaddMark" >地图标记</dt>';
                html += '       <dd style="width: 85%;height: 310px;">';
                html += '          <div id="addhouseMap" style="width:50%;height:300px;margin-top:18px;background:#F3F1EC;"></div>';
                html += '       </dd>';
                html += '   </dl>';
                html += '   <dl style="height: 330px;">';
                html +='        <input type="hidden" value="" id="addPropertyInfo_coordinate">';
                html += '       <div id="searchResult" style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"></div>';
                html += '   </dl>';
                html += '   <dl>';
                html += '   <dt style="width: 70%;text-align: center;">';
                html +='        <button id="button-div" onclick="addpropertyInfo();">确认添加</button>';
                html += '   </dt>';
                html += '   </dl>';
                html += '   </dl>';
                html += '   <input type="hidden" id="areaType" value="">';
                html +='</div>';
                $('.information-add').append(html);
            addHouseMap=addMap(returnValue("南岸区"));
        }
    })
}
//所属区域赋值
function addstreet() {
    if ($("#insertQuyu").val() != "-1") {
        $('.street-i').text($('#insertQuyu').val()+'/');
    }
    $.ajax({
        type: "POST",
        url: "/propertyInfo/selectProperTyInfoType",
        data: "area_name=" + $('#insertQuyu').val(),
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (result) {
            $('.street-quyu').empty();
            $('.street-right').empty();
            var data=result.properType;
            var html ='';
            if (data != null) {
                for (var i=0;i<data.length;i++) {
                    html +='<dl class="street-min">';
                    html +='    <dd class="street-min-dd">';
                    html +='        <span>'+data[i].area_name+'</span>';
                    html +='    </dd>';
                    html +='</dl>';
                }
                $('.street-quyu').append(html);
            }
        }
    });
}
//所属区域显示
$(document).on('click','.addstreet',function () {
    if ($("#insertQuyu").val() == "-1"){
        swal("请选择所属区县哦 亲!");
        return false;
    }
    if ($("#insertQuyu").val() != "-1") {
        $('.street-i').text($('#insertQuyu').val()+'/');
    }
    $('.street-div').show();
    $('.street-div').css('display','flex');
    $('#street-dl').css('height','210px');
    $('.street').css({'width':'650px','height':'210px'});
    $('.addstreet').hide();
    $('.addArealist').show();
    $('.updateArealist').show();
    $('.closestreet').show();
})
//所属区域隐藏
$(document).on('click','.closestreet',function() {
    $('.street-div').hide();
    $('#street-dl').css('height','');
    $('.street').css({'width':'','height':''});
    // $('.street-i').text('');
    $('.addstreet').show();
    $('.addArealist').hide();
    $('.updateArealist').hide();
    $('.closestreet').hide();
})
//点击区域选中成标签
$(document).on('click','.street-quyu .street-min',function () {
    $(this).each(function () {
        if ($(this).hasClass('dl-color')) {
            $(this).removeClass('dl-color');
            _this=$(this);
            $('.street-right label').each(function () {
                if (_this.find('span').text() == $(this).text()) {
                    $(this).remove();
                }
            })
        } else {
            $(this).addClass('dl-color');
            var html ='';
            html +='<label class="common-borderbox common-borderbox-checked">'+$(this).find('span').text()+'</label>';
            $('.street-right').append(html);
        }
    });
})
//点击已选中的区域标签做删除处理
$(document).on('click','.street-right label',function () {
    $(this).remove();
    _this=$(this);
    $('.street-quyu .street-min').each(function () {
        if ($(this).find('span').text() == _this.text()) {
            $(this).removeClass('dl-color');
        }
    })
})
//修改区域标签
function updateArealist(obj) {
    var _this = $(obj);
    $.ajax({
        type: "POST",
        url: "/propertyInfo/selectProperTyInfoType",
        data: "area_name=" + $('#insertQuyu').val(),
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (result) {
            var data=result.properType;
            var html ='';
            html += "<div style='margin:10px;position: relative;display: flex;height: 200px;width: 100%;'>";
            html += "   <div class='update custom-scroll'>";
            if (data != null) {
                for (var i=0;i<data.length;i++) {
                    html +='        <dl class="update-min">';
                    html +='            <dd class="update-min-dd">';
                    html +='                <span  uid="'+data[i].area_id+'">'+data[i].area_name+'</span>';
                    html +='            </dd>';
                    html +='        </dl>';
                }
            }
            html += "   </div>";
            html += "   <i class='fa fa-arrow-right'></i>";
            html += "   <div class='select-update custom-scroll'>";
            html += "   </div>";
            html += "</div>";

            var submit = function(v, h, f) {
                var area='';
                $('.select-update input[name=area]').each(function () {
                    area+=$(this).attr('uid')+'-'+$(this).val()+'_';
                });
                $.ajax({
                    type: "POST",
                    url: "/propertyInfo/updateArea",
                    data: "area=" +area,
                    contentType: "application/x-www-form-urlencoded; charset=utf-8",
                    success: function (result) {
                        addstreet();
                    }
                });
            };
            $.jBox(html, {
                title: "修改标签",
                submit: submit
            });
            $("#pz").focus();
        }
    });
}
$(document).on('click','.update  .update-min',function () {
    $(this).each(function () {
        if ($(this).hasClass('dl-color')) {
            $(this).removeClass('dl-color');
            _this=$(this);
            $('.select-update input[name=area]').each(function () {
                if (_this.find('span').text() == $(this).val()) {
                    $(this).remove();
                }
            })
        } else {
            $(this).addClass('dl-color');
            var html ='';
            html +='<input class="update-input" name="area" uid="'+$(this).find('span').attr('uid')+'" value="'+$(this).find('span').text()+'">';
            $('.select-update').append(html);
        }
    });
})
//添加区域
function addArea(obj) {
    var _this = $(obj);
    var html = "<div style='padding:10px;'><div style='display:block;float:left;line-height:34px;'>输入标签：</div><input type='text' class='form-control' id='pz' name='pz' /><hr></div>";
    var submit = function(v, h, f) {
        var i = 0
        $("input[name='" + _this.attr("name") + "']").each(function() {
            if ($(this).val() == f.pz) {
                i = 1;
                return false;
            }
        });
        if (i == 0) {
            if (f.pz != null && f.pz != '') {
                $('.street-right').append('<label class="common-borderbox common-borderbox-checked">' + f.pz + '</label>');
                var h='';
                h +='<dl class="street-min dl-color">';
                h +='    <dd class="street-min-dd">';
                h +='        <span>'+f.pz+'</span>';
                h +='    </dd>';
                h +='</dl>';
                $('.street-quyu').append(h);
            }
            $.ajax({
                type: "POST",
                url: "/propertyInfo/addArea",
                data: "area_sname=" + $('#insertQuyu').val()+'&area_name='+f.pz,
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                success: function (result) {
                }
            });
            return true;
        } else {
            $.jBox.tip("该标签已存在");
            return false;
        }
    };
    $.jBox(html, {
        title: "添加标签",
        submit: submit
    });
    $("#pz").focus();
}
//是否核心小区
$(document).on('click','#quyu .common-borderbox',function () {
    _this=$(this);
    _this.each(function () {
        if (_this.find('input:radio[name="quyu"]:checked')) {
            _this.addClass('common-borderbox-checked');
            _this.find('i').addClass('common');
            _this.siblings().find('i').removeClass('common');
            _this.siblings().removeClass('common-borderbox-checked');
            if (_this.find('input:radio[name="quyu"]:checked').val()== '是') {
                $('#allcompanyziji').show();
            } else {
                $('#allcompanyziji').hide();
            }
        }
    })
})
//提交添加小区数据
function addpropertyInfo() {
    if ($('#propertyname').val() == '') {
        swal("请输入小区名称 亲!");
        return false;
    }
    if ($("#insertQuyu").val() == "-1"){
        swal("请选择所属区县哦 亲!");
        return false;
    }
    if ($("#insertStreet").val() == ""){
        swal("请选择所属街道 亲!");
        return false;
    }
    var ucc_short='';
    var upn_department='';
    $('#quyu .common-borderbox').each(function () {
        if ($(this).find('input:radio[name="quyu"]:checked').val()== '是') {
            ucc_short=$("#allcompanyziji").val();
            upn_department=$('#allcompanyziji').find("option:selected").attr('data-uccId');
            if ($('#allcompanyziji').val() == '') {
                swal("请选择所属部门哦 亲!");
                return false;
            }
        }
    })
    if ($(".addPropertyInfo_address").val() == ""
        || $(".addPropertyInfo_address").val() == null){
        swal("请填写民政地址 亲!");
        return false;
    }
    if ($("#propertyname").val() == "" || $("#propertyname").val() == null) {
        swal("请把带星号的信息填写完整哦  亲!");
        if ($("#propertyname").val() == "" || $("#propertyname").val() == null) {
            $("#propertyname").focus();
        } else {
            $("#addpropertyInfo_hao").focus();
        }
        return false;
    }
    var area='';
    $('.street-right label').each(function () {
        area+=$(this).text()+',';
    })
    $.ajax({
        type : "POST",
        url : "/propertyInfo/addproperty",
        data : "upn_name=" + $("#propertyname").val().trim()
        + "&propertyInfo_quyu=" + $("#insertQuyu").val()
        + "&propertyInfo_street=" + area
        + "&ucc_short=" + ucc_short
        + "&propertyInfo_address=" + $(".addPropertyInfo_address").val()
        + "&propertyInfo_coordinate=" + $("#addPropertyInfo_coordinate").val()
        + "&propertyInfo_source=" + "百度地图"
        + "&upn_department=" + upn_department,
        contentType : "application/x-www-form-urlencoded; charset=utf-8",
        success : function (result) {
            if (result.addresult) {
                if (result.addresult != 0) {
                    swal("添加成功!","success");
                    selProperName();
                    $('#insertQuyu').val('');
                    $('#insertStreet').val('');
                    $('#building').val('');
                    $('#units').val('');
                    $('#allcompanyziji').val('');
                    $('.addPropertyInfo_address').val('');
                    $('#addPropertyInfo_coordinate').val('');
                } else {
                    swal("添加失败!","error");
                }
            } else {
                swal(result.error,"error");
            }
        }
    });
}
//点击效果
$(document).on('click','.updateProperInfo',function(){
    $(this).each(function () {
        $(this).parent().parent().parent().children('dl').removeClass();
        $(this).parent().parent().addClass('dl-color');
    })
})

//点击添加 栋单元
function addPropertyInfoDong (upn_id) {
    $('.information-add').empty();
    $('.information-additional').empty();
    $('.tab_menu #Additional').css('border-bottom', '');
    $('.tab_menu #information').css('border-bottom', '2px solid rgb(0, 153, 255)');
    $('#upn_id').val(upn_id);
    $.ajax({
        type: "POST",
        url: "/propertyInfo/queryProperInfo",
        data:"upn_id="+upn_id,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (result) {
            var data=result.propertyInfo;
            var list=result.properList;
            var dong=returnValue(data.upn_build);
            var untiss=returnValue(data.upn_unit);
            var html='';
            html +='<div style="margin: 35px 60px;">';
            html +='    <dl>';
            html +='        <dt>所有栋数</dt>';
            html +='        <dd>';
            html +='            <input type="text" value="'+dong+'" id="buildDong" class="updateInput number" placeholder="输入楼栋数">';
            html +='            <input type="hidden" value="'+dong+'" id="beforeDong">';
            html +='            <em>*</em>';
            html +='            <select id="dong" class="form-control" style="width: 100px;">';
            if (data.upn_dong != null) {
                html +='                <option code="" name="company">'+data.upn_dong+'</option>';
            }
            html +='                <option code="" name="company">栋</option>';
            html +='                <option code="" name="company">幢</option>';
            html +='            </select>';
            html +='        </dd>';
            html +='    </dl>';
            html +='    <dl>';
            html +='        <dt>所有单元数</dt>';
            html +='        <dd>';
            html +='            <input type="text" value="'+untiss+'" id="unitss" class="updateInput number" placeholder="输入单元数">';
            html +='            <input type="hidden" value="'+untiss+'" id="beforeUnitss">';
            html +='        <em>*</em>';
            html +='        </dd>';
            html +='    </dl>';
            html +='</div>';
            html +='<div class="information-div-div" style="float: left;margin-left: 8px;padding-bottom: 35px;">';
            html +='    <button id="button-div" onclick="addDongUntiss()">添加</button>';
            html +='</div>';
            html +='<div class="custom-scroll" style="margin-top: 30px;">';
            html +='            <div class="div-framework">';
            html +='                <i class="visited"></i>';
            html +='                <span>小区架构</span>';
            html +='            </div>';
            html +='<table class="chart-table">';
            html +='    <tr class="chart-title" ">';
            html +='        <td>栋(幢)</td>';
            html +='        <td>单元</td>';
            html +='    </tr>';
            if (list.length > 0) {
                for (var i=0;i<list.length;i++) {
                    if (data.upn_id == list[i].upn_pid) {
                        html +='    <tr class="chart-tr">';
                        html +='        <td class="chart-td1" code="'+list[i].upn_id+'">'+list[i].upn_name+'</td>';
                        html +='        <td class="chart-td2">';
                        for (var j=0;j<list.length;j++) {
                            if (list[i].upn_id == list[j].upn_pid) {
                                html +='            <div style="display: flex">';
                                html +='                <div style="margin: 10px auto;">'+list[j].upn_name+'</div>';
                                html +='            </div>';
                            }
                        }
                        html +='            <div style="display: flex;">';
                        html +='                <div class="addUntiss" style="margin: 10px auto;cursor: pointer;"><i class="icon-plus" style="color: #18bc9c;font-size: 18px;"></i></div>';
                        html +='            </div>';
                        html +='        </td>';
                        html +='    </tr>';
                    }
                }
                html +='    <tr>';
                html +='        <td class="dong-td" style="height: 30px;text-align: center;">';
                html +='            <div class="add-dong" style="margin-top: 10px; ">';
                html +='                <i class="icon-plus" style="color: #18bc9c;font-size: 18px;cursor: pointer;"></i>';
                html +='            </div>';
                html +='        </td>';
                html +='    </tr>';
            }
            html +='</table>';
            html +='</div>';
            $('.information-add').append(html);
        }
    });
}
/******提交栋.单元*****************/
function addDongUntiss () {
    if ($('#buildDong').val() == '') {
        $('#buildDong').msg("请填写楼楼栋数 亲!");
        return false;
    }
    if ($('#unitss').val() == '') {
        $('#unitss').msg("请填写单元号 亲!");
        return false;
    }
    if ($('#buildDong').val() < $('#beforeDong').val()) {
        $('#buildDong').msg("修改栋数要大于之前栋数!");
        return false;
    }
    if ($('#unitss').val() < $('#beforeUnitss').val()) {
        $('#unitss').msg("修改单元数要大于之前单元数!");
        return false;
    }
    var upn_id=$('#upn_id').val();
    var upn_build='';
    var upn_unit='';
    var dong='';
    upn_build=$('#buildDong').val();
    upn_unit=$('#unitss').val();
    dong=$('#dong').val(); //单位
    $.ajax({
        type: "POST",
        url: "/propertyInfo/addDongUntiss",
        data: "upn_id="+upn_id+"&upn_build="+upn_build+"&upn_unit="+upn_unit+"&upn_dong="+dong,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (result) {
            if (result.addDong != 0) {
                swal("添加成功!","success");
                $('.information-add').empty();
                $.ajax({
                    type: "POST",
                    url: "/propertyInfo/queryProperInfo",
                    data:"upn_id="+upn_id,
                    contentType: "application/x-www-form-urlencoded; charset=utf-8",
                    success: function (result) {
                        var data=result.propertyInfo;
                        var list=result.properList;
                        var dong=data.upn_build == null ? "" : data.upn_build;
                        var untiss=data.upn_unit == null ? "" : data.upn_unit;
                        var html='';
                        html +='<div style="margin: 35px 60px;">';
                        html +='    <dl>';
                        html +='        <dt>所属栋数</dt>';
                        html +='        <dd>';
                        html +='            <input type="text" value='+dong+' placeholder="栋数" id="buildDong" class="updateInput number" placeholder="输入楼栋数">';
                        html +='            <em>*</em>';
                        html +='            <select id="dong" class="form-control" style="width: 100px;">';
                        html +='                <option code="" name="company">栋</option>';
                        html +='                <option code="" name="company">幢</option>';
                        html +='            </select>';
                        html +='        </dd>';
                        html +='    </dl>';
                        html +='    <dl>';
                        html +='        <dt>所属单元数</dt>';
                        html +='        <dd>';
                        html +='            <input type="text" value='+untiss+' placeholder="栋数" id="unitss" class="updateInput number" placeholder="输入单元数">';
                        html +='        <em>*</em>';
                        html +='        </dd>';
                        html +='    </dl>';
                        html +='</div>';
                        html +='<div class="information-div-div" style="float: left;">';
                        html +='    <button id="button-div" onclick="addDongUntiss()">添加</button>';
                        html +='</div>';
                        html +='<div class="custom-scroll">';
                        html +='<table class="chart-table">';
                        for (var i=0;i<list.length;i++) {
                            if (data.upn_id == list[i].upn_pid) {
                                html +='    <tr class="chart-tr">';
                                html +='        <td class="chart-td1">'+list[i].upn_name+'</td>';
                                html +='        <td class="chart-td2">';
                                for (var j=0;j<list.length;j++) {
                                    if (list[i].upn_id == list[j].upn_pid) {
                                        html +='            <div style="display: flex">';
                                        html +='                <div style="margin: 10px auto;">'+list[j].upn_name+'</div>';
                                        html +='            </div>';
                                    }
                                }
                                html +='        </td>';
                                html +='    </tr>';
                            }
                        }
                        html +='</table>';
                        html +='</div>'
                        $('.information-add').append(html);
                        if (data.upn_pid == 0) {
                            properInfoLower (data.upn_id);
                            addPropertyInfoDong(data.upn_id);
                        } else {
                            properInfoLower (data.upn_pid);
                            addPropertyInfoDong(data.upn_pid);
                        }
                    }
                });
            } else {
                swal("添加失败,请重试!","error");
            }
        }
    })
}
//添加单元
$(document).on('click','.chart-td2 .addUntiss',function () {
    $(this).each(function () {
        var html='';
        html +='<input type="text" class="add-unitss number" style="width: 120px;">';
        html +='&nbsp;&nbsp;<i class="closeUntiss fa fa-remove" style="color: red;font-size: 18px;cursor: pointer;"></i>&nbsp;&nbsp;<i class="add-untss fa fa-check" style="color: 18bc9c;font-size: 18px;cursor: pointer;"></i>';
        $(this).removeClass();
        $(this).empty();
        $(this).append(html);
    })
})
//删除添加
$(document).on('click','.closeUntiss',function () {
    $(this).each(function(){
        var html ='';
        html +='<i class="icon-plus" style="color: #18bc9c;font-size: 18px;cursor: pointer;"></i>';
        $(this).parent().addClass('addUntiss');
        $('.addUntiss').empty();
        $('.addUntiss').append(html);
    })
})
/******单独添加单元*************/
$(document).on('click','.add-untss',function () {
    if ($('.add-unitss').val() == '') {
        swal("请填写单元号 亲!");
        return false;
    }
    var upn_id=$('#upn_id').val();
    var upn_unit=$('.add-unitss').val();
    var parentId=$(this).parent().parent().parent().prev().attr('code');
    $.ajax({
        type: "POST",
        url: "/propertyInfo/adduntiss",
        data: "upn_id="+upn_id+"&untiss="+upn_unit+"&parentId="+parentId,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (result) {
            if (result.addpropertyInfoziji) {
                if (result.addpropertyInfoziji != 0) {
                    $('.information-add').empty();
                    $.ajax({
                        type: "POST",
                        url: "/propertyInfo/queryProperInfo",
                        data:"upn_id="+upn_id,
                        contentType: "application/x-www-form-urlencoded; charset=utf-8",
                        success: function (result) {
                            var data=result.propertyInfo;
                            var list=result.properList;
                            var dong=data.upn_build == null ? "" : data.upn_build;
                            var untiss=data.upn_unit == null ? "" : data.upn_unit;
                            var html='';
                            html +='<div style="margin: 35px 60px;">';
                            html +='    <dl>';
                            html +='        <dt>所属栋数</dt>';
                            html +='        <dd>';
                            html +='            <input type="text" value='+dong+' placeholder="栋数" id="buildDong" class="updateInput number" placeholder="输入楼栋数">';
                            html +='            <em>*</em>';
                            html +='            <select id="dong" class="form-control" style="width: 100px;">';
                            html +='                <option code="" name="company">栋</option>';
                            html +='                <option code="" name="company">幢</option>';
                            html +='            </select>';
                            html +='        </dd>';
                            html +='    </dl>';
                            html +='    <dl>';
                            html +='        <dt>所属单元数</dt>';
                            html +='        <dd>';
                            html +='            <input type="text" value='+untiss+' placeholder="栋数" id="unitss" class="updateInput number" placeholder="输入单元数">';
                            html +='        <em>*</em>';
                            html +='        </dd>';
                            html +='    </dl>';
                            html +='</div>';
                            html +='<div class="information-div-div" style="float: left;">';
                            html +='    <button id="button-div" onclick="addDongUntiss()">添加</button>';
                            html +='</div>';
                            html +='<div class="custom-scroll">';
                            html +='<table class="chart-table">';
                            for (var i=0;i<list.length;i++) {
                                if (data.upn_id == list[i].upn_pid) {
                                    html +='    <tr class="chart-tr">';
                                    html +='        <td class="chart-td1">'+list[i].upn_name+'</td>';
                                    html +='        <td class="chart-td2">';
                                    for (var j=0;j<list.length;j++) {
                                        if (list[i].upn_id == list[j].upn_pid) {
                                            html +='            <div style="display: flex">';
                                            html +='                <div style="margin: 10px auto;">'+list[j].upn_name+'</div>';
                                            html +='            </div>';
                                        }
                                    }
                                    html +='        </td>';
                                    html +='    </tr>';
                                }
                            }
                            html +='</table>';
                            html +='</div>'
                            $('.information-add').append(html);
                            if (data.upn_pid == 0) {
                                properInfoLower (data.upn_id);
                                addPropertyInfoDong(data.upn_id);
                            } else {
                                properInfoLower (data.upn_pid);
                                addPropertyInfoDong(data.upn_pid);
                            }
                        }
                    });
                } else {
                    swal("添加失败,请重试!","error");
                }
            } else {
                swal(result.error,'error');
            }
        }
    })
})
//添加栋
$(document).on('click','.dong-td .add-dong',function () {
    $(this).each(function(){
        var html ='';
        html +='<input type="text" class="dong-num number" style="width: 120px;">';
        html +='&nbsp;&nbsp;<i class="closeDong fa fa-remove" style="color: red;font-size: 18px;cursor: pointer;"></i>&nbsp;&nbsp;<i class="add-zhuang fa fa-check" style="color: 18bc9c;font-size: 18px;cursor: pointer;"></i>';
        $(this).removeClass();
        $(this).empty();
        $(this).append(html);
    })
})
// 删除栋
$(document).on('click','.closeDong',function () {
    $(this).each(function(){
        var html ='';
        html +='<i class="icon-plus" style="color: #18bc9c;font-size: 18px;cursor: pointer;"></i>';
        $(this).removeClass();
        $(this).parent().addClass('add-dong');
        $('.add-dong').empty();
        $('.add-dong').append(html);
    })
})
/******单独添加栋*******/
$(document).on('click','.add-zhuang',function(){
    if ($('.dong-num').val() == '') {
        // swal("请填写栋数 亲!");
        swal("请填写栋数 亲!");
        return false;
    }
    var upn_id=$('#upn_id').val();
    var upn_build=$('.dong-num').val();
    var parentId=0;
    $.ajax({
        type: "POST",
        url: "/propertyInfo/adduntiss",
        data: "upn_id="+upn_id+"&dong="+upn_build+"&parentId="+parentId,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (result) {
            if (result.addpropertyInfoziji) {
                if (result.addpropertyInfoziji !=0) {
                    // swal("添加成功!", "success");
                    swal("添加成功!","success");
                    $('.information-add').empty();
                    $.ajax({
                        type: "POST",
                        url: "/propertyInfo/queryProperInfo",
                        data:"upn_id="+upn_id,
                        contentType: "application/x-www-form-urlencoded; charset=utf-8",
                        success: function (result) {
                            var data=result.propertyInfo;
                            var list=result.properList;
                            var dong=data.upn_build == null ? "" : data.upn_build;
                            var untiss=data.upn_unit == null ? "" : data.upn_unit;
                            var html='';
                            html +='<div style="margin: 35px 60px;">';
                            html +='    <dl>';
                            html +='        <dt>所属栋数</dt>';
                            html +='        <dd>';
                            html +='            <input type="text" value='+dong+' placeholder="栋数" id="buildDong" class="updateInput number" placeholder="输入楼栋数">';
                            html +='            <em>*</em>';
                            html +='            <select id="dong" class="form-control" style="width: 100px;">';
                            html +='                <option code="" name="company">栋</option>';
                            html +='                <option code="" name="company">幢</option>';
                            html +='            </select>';
                            html +='        </dd>';
                            html +='    </dl>';
                            html +='    <dl>';
                            html +='        <dt>所属单元数</dt>';
                            html +='        <dd>';
                            html +='            <input type="text" value='+untiss+' placeholder="栋数" id="unitss" class="updateInput number" placeholder="输入单元数">';
                            html +='        <em>*</em>';
                            html +='        </dd>';
                            html +='    </dl>';
                            html +='</div>';
                            html +='<div class="information-div-div" style="float: left;">';
                            html +='    <button id="button-div" onclick="addDongUntiss()">添加</button>';
                            html +='</div>';
                            html +='<div class="custom-scroll">';
                            html +='<table class="chart-table">';
                            for (var i=0;i<list.length;i++) {
                                if (data.upn_id == list[i].upn_pid) {
                                    html +='    <tr class="chart-tr">';
                                    html +='        <td class="chart-td1">'+list[i].upn_name+'</td>';
                                    html +='        <td class="chart-td2">';
                                    for (var j=0;j<list.length;j++) {
                                        if (list[i].upn_id == list[j].upn_pid) {
                                            html +='            <div style="display: flex">';
                                            html +='                <div style="margin: 10px auto;">'+list[j].upn_name+'</div>';
                                            html +='            </div>';
                                        }
                                    }
                                    html +='        </td>';
                                    html +='    </tr>';
                                }
                            }
                            html +='</table>';
                            html +='</div>'
                            $('.information-add').append(html);
                            if (data.upn_pid == 0) {
                                properInfoLower (data.upn_id);
                                addPropertyInfoDong(data.upn_id);
                            } else {
                                properInfoLower (data.upn_pid);
                                addPropertyInfoDong(data.upn_pid);
                            }
                        }
                    });
                } else {
                    swal("添加失败,请重试!", "error");
                }
            } else {
                swal(result.error, "error");
            }
        }
    })
})


/*******附加信息******/
//查看附加信息
function AdditionalInformation (upn_id) {
    $('#upn_id').val(upn_id);
    $('.tab_menu #Additional').css('border-bottom', '2px solid rgb(0, 153, 255)');
    $('.tab_menu #information').css('border-bottom', '');
    $('.information-add').empty();
    $('.information-div-div').hide();
    $('.information-additional').empty();
    var html='';
    html +='<div id="chakan">';
    <!--基本信息-->
    html +='    <div class="basicInformation-div">';
    html +='        <div class="divt1" id="basicInformation">';
    html +='            <div class="divt2">';
    html +='                <div style="padding: 0 6px;"><i class="visited"></i></div>';
    html +='                <div style="flex: 1">基本信息</div>';
    html +='                <button class="divt3">';
    html +='                    <i class="basicInformation-gou fa fa-edit" id="pencil"></i>';
    html +='                </button>';
    html +='            </div>';
    html +='            <div style="padding: 10px 15px;">';
    html +='                <div class="tablecss">';
    html +='                     <dl>';
    html +='                         <dt>小区名称：</dt>';
    html +='                         <dd id="ckxiaoqumingchen"></dd>';
    html +='                     </dl>';
    html +='                     <dl>';
    html +='                         <dt>是否是核心小区：</dt>';
    html +='                         <dd id="ckhexinxiaoqu"></dd>';
    html +='                     </dl>';
    html +='                     <dl style="width: 100%;">';
    html +='                         <dt>所属区(县)：</dt>';
    html +='                         <dd id="cksuoshuquxian"></dd>';
    html +='                     </dl>';
    html +='                     <dl style="width: 100%;">';
    html +='                         <dt>所属区域：</dt>';
    html +='                         <dd id="cksuoshuquyu" style="width: 85%;"></dd>';
    html +='                     </dl>';
    html +='                     <dl style="width: 100%;">';
    html +='                         <dt>轨道：</dt>';
    html +='                         <dd id="ckguidao" style="width: 85%;"></dd>';
    html +='                     </dl>';
    html +='                     <dl style="width: 100%;">';
    html +='                         <dt>公交站台：</dt>';
    html +='                         <dd id="ckbusAdress" style="width: 85%;"></dd>';
    html +='                     </dl>';
    html +='                     <dl style="width: 100%;">';
    html +='                         <dt>民政地址：</dt>';
    html +='                         <dd id="ckminzhendizhi"></dd>';
    html +='                     </dl>';
    html +='                         <dt>地图标记：</dt>';
    html +='                         <dd style="width: 75%;height: 315px">';
    html +='                            <div id="houseMapto" style="width:90%;height:300px;margin-top:18px;background:#F3F1EC;"></div>';
    html +='                         </dd>';
    html +='                    <input type="hidden" id="ckxiaoquzuobiao">';
    html +='                    <div id="searchResultPanel" style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"></div>';
    html +='                </div>';
    html +='            </div>';
    html +='        </div>';
    html +='        <div class="imformation-basic"></div>';
    html +='    </div>';
    <!--基本配置-->
    html +='    <div class="configure-div">';
    html +='        <div class="divt1" id="configure">';
    html +='            <div class="divt2">';
    html +='                <div style="padding: 0 6px;"><i class="visited"></i></div>';
    html +='                <div style="flex: 1">基本配置</div>';
    html +='                <button class="divt3">';
    html +='                    <i class="BasicConfiguration fa fa-edit" id="pencil"></i>';
    html +='                </button>';
    html +='            </div>';
    html +='            <div style="padding: 10px 15px;">';
    html +='                <div class="tablecss">';
    html +='                    <dl style="width: 100%;">';
    html +='                        <dt>入户宽带：</dt>';
    html +='                        <dd id="ckkuandai" style="width: 85%;display: inline-flex;"></dd>';
    html +='                    </dl>';
    html +='                    <dl>';
    html +='                        <dt>电梯配置：</dt>';
    html +='                        <dd id="ckdianti"></dd>';
    html +='                    </dl>';
    html +='                    <dl>';
    html +='                        <dt>总楼层：</dt>';
    html +='                        <dd id="ckzoulouceng"></dd>';
    html +='                    </dl>';
    html +='                </div>';
    html +='            </div>';
    html +='        </div>';
    html +='        <div class="imformation-configure"></div>';
    html +='    </div>';
    <!-- 水 -->
    html +='    <div class="warter-div">';
    html +='        <div class="divt1" id="warter">';
    html +='            <div class="divt2">';
    html +='                <div style="padding: 0 6px"><i class="visited"></i></div>';
    html +='                <div style="flex: 1">水电气</div>';
    html +='                <button class="divt3">';
    html +='                    <i class="warter fa fa-edit" id="pencil"></i>';
    html +='                </button>';
    html +='            </div>';
    html +='            <div style="padding: 10px 15px;">';
    html +='                <div class="tablecss">';
    html +='                    <div class="pass">';
    html +='                        <div>';
    html +='                            <input type="button" value="水" onclick="warterType();" id="warterType" class="warterType">';
    html +='                            <span class="pass-span" id="pass-warter"><i></i>未通</span>';
    html +='                        </div>';
    html +='                        <div>';
    html +='                            <input type="button" value="电" onclick="powerType();" id="powerType" class="powerType">';
    html +='                            <span class="pass-span" id="pass-electric"><i></i>未通</span>';
    html +='                        </div>';
    html +='                        <div>';
    html +='                            <input type="button" value="气" onclick="gasType();" id="gasType" class="powerType">';
    html +='                            <span class="pass-span" id="pass-gas"><i></i>未通</span>';
    html +='                        </div>';
    html +='                    </div>';
    html +='                    <dl>';
    html +='                        <dt>缴费周期：</dt>';
    html +='                        <dd id="ckshuijfzq"></dd>';
    html +='                    </dl>';
    html +='                    <dl>';
    html +='                        <dt>价格：</dt>';
    html +='                        <dd>';
    html +='                        <span id="ckshuiprice"></span><span>元</span>';
    html +='                        </dd>';
    html +='                    </dl>';
    html +='                    <dl>';
    html +='                        <dt>特殊分段：</dt>';
    html +='                        <dd id="ckshuitsfd"></dd>';
    html +='                    </dl>';
    html +='                    <dl>';
    html +='                        <dt>阶梯计费：</dt>';
    html +='                        <dd id="ckshuijtjf"></dd>';
    html +='                    </dl>';
    html +='                    <dl>';
    html +='                        <dt>公司名称：</dt>';
    html +='                        <dd id="ckshuicompany"></dd>';
    html +='                    </dl>';
    html +='                    <dl>';
    html +='                        <dt>联系人：</dt>';
    html +='                        <dd id="ckshuilxr"></dd>';
    html +='                    </dl>';
    html +='                    <dl>';
    html +='                        <dt>电话：</dt>';
    html +='                        <dd id="ckshuiphone"></dd>';
    html +='                    </dl>';
    html +='                </div>';
    html +='            </div>';
    html +='        </div>';
    html +='        <div class="information-warter"></div>';
    html +='    </div>';
    <!-- 物管信息 -->
    html +='    <div class="WuguanInformation-div">';
    html +='        <div class="divt1" id="WuguanInformation">';
    html +='            <div class="divt2">';
    html +='                <div style="padding: 0 6px;"><i class="visited"></i></div>';
    html +='                <div style="flex: 1;">物管信息</div>';
    html +='                <button class="divt3">';
    html +='                    <i class="WuguanInformation fa fa-edit" id="pencil"></i>';
    html +='                </button>';
    html +='            </div>';
    html +='            <div style="padding: 10px 15px;">';
    html +='                 <div class="tablecss">';
    html +='                     <dl>';
    html +='                         <dt>物管公司：</dt>';
    html +='                         <dd id="ckwuguancompany"></dd>';
    html +='                     </dl>';
    html +='                     <dl>';
    html +='                         <dt>物管名称：</dt>';
    html +='                         <dd id="ckwuyename"></dd>';
    html +='                     </dl>';
    html +='                     <dl>';
    html +='                         <dt>物管电话：</dt>';
    html +='                         <dd id="ckwuyguanphone"></dd>';
    html +='                     </dl>';
    html +='                     <dl>';
    html +='                         <dt>物管费用：</dt>';
    html +='                         <dd id="ckwuguanprice"></dd>';
    html +='                     </dl>';
    html +='                     <dl>'
    html +='                         <dt>物管地址：</dt>';
    html +='                         <dd id="ckwuguandizhi"></dd>';
    html +='                     </dl>';
    html +='                     <dl>';
    html +='                         <dt>物业地址：</dt>';
    html +='                         <dd id="ckwuyedizhi"></dd>';
    html +='                     </dl>';
    html +='                     <input type="hidden" id="ckzuobiao" value="">';
    html +='                 </div>';
    html +='            </div>';
    html +='        </div>';
    html +='        <div class="imformation-WuguanInformation"></div>';
    html +='    </div>';
    <!--小区信息-->
    html +='    <div class="cellInformation-div">';
    html +='        <div class="divt1" id="cellInformation">';
    html +='            <div class="divt2">';
    html +='                <div style="padding: 0 6px;"><i class="visited"></i></div>';
    html +='                <div style="flex: 1;">小区信息</div>';
    html +='                <button class="divt3">';
    html +='                    <i class="cellInformation fa fa-edit" id="pencil"></i>';
    html +='                </button>';
    html +='            </div>';
    html +='            <div style="padding: 10px 15px;">';
    html +='                <div class="tablecss">';
    html +='                    <dl style="width: 100%">';
    html +='                        <dt>小区周边：</dt>';
    html +='                        <dd id="ckperimeter" style="width: 80%;"></dd>';
    html +='                    </dl>';
    html +='                    <dl>';
    html +='                        <dt>开发商：</dt>';
    html +='                        <dd id="ckkaifashang"></dd>';
    html +='                    </dl>';
    html +='                    <dl>';
    html +='                        <dt>管理方式：</dt>';
    html +='                        <dd id="ckguanlifangshi"></dd>';
    html +='                    </dl>';
    html +='                    <dl>';
    html +='                        <dt>绿化率：</dt>';
    html +='                        <dd id="cklvhualv"></dd>';
    html +='                    </dl>';
    html +='                    <dl>';
    html +='                        <dt>容积率：</dt>';
    html +='                        <dd id="ckrongjilv"></dd>';
    html +='                    </dl>';
    html +='                    <dl>';
    html +='                        <dt>总套数：</dt>';
    html +='                        <dd id="ckzongtaoshu"></dd>';
    html +='                    </dl>';
    html +='                    <dl>';
    html +='                        <dt>建筑面积：</dt>';
    html +='                        <dd id="ckjianzhumianji"></dd>';
    html +='                    </dl>';
    html +='                    <dl>';
    html +='                        <dt>占地面积：</dt>';
    html +='                        <dd id="ckzhandimianji"></dd>';
    html +='                    </dl>';
    html +='                    <dl>';
    html +='                        <dt>开盘价：</dt>';
    html +='                        <dd id="ckkaipanjia"></dd>';
    html +='                    </dl>';
    html +='                    <dl>';
    html +='                        <dt>车库：</dt>';
    html +='                        <dd id="ckpark"></dd>';
    html +='                    </dl>';
    html +='                    <dl>';
    html +='                        <dt>公共设施：</dt>';
    html +='                        <dd id="ckgonggongsheshi"></dd>';
    html +='                    </dl>';
    html +='                    <dl>';
    html +='                        <dt>小区环境：</dt>';
    html +='                        <dd id="ckxiaoquhuanjin"></dd>';
    html +='                    </dl>';
    html +='                    <dl>';
    html +='                        <dt>物业类别：</dt>';
    html +='                        <dd id="ckwuyexingtai"></dd>';
    html +='                    </dl>';
    html +='                    <dl>';
    html +='                        <dt>物业形态：</dt>';
    html +='                        <dd id="ckwuyeleibie"></dd>';
    html +='                    </dl>';
    html +='                    <dl>';
    html +='                        <dt>开盘时间：</dt>';
    html +='                        <dd id="ckkaipandate"></dd>';
    html +='                    </dl>';
    html +='                </div>';
    html +='            </div>';
    html +='        </div>';
    html +='        <div class="information-cellInformation"></div>';
    html +='    </div>';
    html +='</div>';
    $('.information-additional').append(html);
    chakanwuye();
    properInfy();
}
//查看物业
function chakanwuye(){
    var upn_id=$("#upn_id").val();
    if(upn_id==""||upn_id==null){
        swal("请选择要查看的物业哦  亲!");
        $("#shuidianqi").hide();
        $("#wuguanjiaotong").hide();
        $("#jibenpeizi").hide();
        $("#caipan").hide();
        $("#imgs").hide();
        return false;
    }
    //入户宽带
    $('#ckkuandai').empty();
    $("#shuidianqi").hide();
    $("#wuguanjiaotong").hide();
    $("#jibenpeizi").hide();
    $("#caipan").hide();
    $("#imgs").hide();
    $("#chakan").show();
    $.ajax({
        type: "POST",
        url: "/propertyInfo/propertySelect",
        data:"upn_id="+upn_id,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (result) {
                var wang=[];
                if (result.queryPropertyInfo.propertyInfo_broadband != null) {
                    wang=result.queryPropertyInfo.propertyInfo_broadband.split(',');
                    if (wang.length >0) {
                        for (var i=0;i<wang.length-1;i++) {
                            var html ='';
                            html +='<label class="common-borderbox common-borderbox-checked">'+wang[i]+'</label>';
                            $('#ckkuandai').append(html);
                        }
                    }
                }
                $("#ckdianti").text(result.queryPropertyInfo.propertyInfo_Life==null?"":result.queryPropertyInfo.propertyInfo_Life);
                $("#ckzoulouceng").text(returnValue(result.queryPropertyInfo.propertyInfo_floor)+'层');
                $("#ckpark").text(result.queryPropertyInfo.propertyInfo_CarPark==null?"":result.queryPropertyInfo.propertyInfo_CarPark+"个");
                $("#ckgonggongsheshi").text(result.queryPropertyInfo.propertyInfo_Public==null?"":result.queryPropertyInfo.propertyInfo_Public);
                $("#ckxiaoquhuanjin").text(result.queryPropertyInfo.propertyInfo_you==2?"优":(result.queryPropertyInfo.propertyInfo_you==1?"差":"中"));

                $("#ckwuyename").text(result.queryPropertyInfo.propertyInfo_Wuguan==null?"":result.queryPropertyInfo.propertyInfo_Wuguan);
                $("#ckwuyguanphone").text(result.queryPropertyInfo.propertyInfo_Tel==null?"":result.queryPropertyInfo.propertyInfo_Tel);
                $("#ckwuguanprice").text(result.queryPropertyInfo.propertyInfo_Cost==null?"":result.queryPropertyInfo.propertyInfo_Cost+"元/㎡");
                $('#ckwuyedizhi').text(result.queryPropertyInfo.propertyInfo_address==null?"":result.queryPropertyInfo.propertyInfo_address);
                $("#ckwuguancompany").text(result.queryPropertyInfo.propertyInfo_company==null?"":result.queryPropertyInfo.propertyInfo_company);
                $("#ckwuguandizhi").text(result.queryPropertyInfo.propertyInfo_waddress==null?"":result.queryPropertyInfo.propertyInfo_waddress);

                $("#ckshangquan").text(returnValue(result.queryPropertyInfo.propertyInfo_quan));
                $("#ckzuobiao").text(result.queryPropertyInfo.propertyInfo_coordinate==null?"":result.queryPropertyInfo.propertyInfo_coordinate);
                $("#ckgongjiao").text(returnValue(result.queryPropertyInfo.propertyInfo_transit));

                $("#ckkaifashang").text(result.queryPropertyInfo.propertyInfo_developer==null?"":result.queryPropertyInfo.propertyInfo_developer);
                $("#ckguanlifangshi").text(result.queryPropertyInfo.propertyInfo_ManaStyle== null ? "":result.queryPropertyInfo.propertyInfo_ManaStyle);
                $("#cklvhualv").text(result.queryPropertyInfo.propertyInfo_GreenRate == null ? '' : result.queryPropertyInfo.propertyInfo_GreenRate+'%');
                $('#ckrongjilv').text(result.queryPropertyInfo.propertyInfo_PlotRate== null ? "":result.queryPropertyInfo.propertyInfo_PlotRate+'%');
                $("#ckzongtaoshu").text(result.queryPropertyInfo.propertyInfo_TotalAmount==null?"":result.queryPropertyInfo.propertyInfo_TotalAmount+'套');
                $("#ckjianzhumianji").text(result.queryPropertyInfo.propertyInfo_BuildArea==null?"":result.queryPropertyInfo.propertyInfo_BuildArea +'㎡');
                $("#ckzhandimianji").text(result.queryPropertyInfo.propertyInfo_TotalArea==null?"":result.queryPropertyInfo.propertyInfo_TotalArea+'㎡');
                $("#ckkaipanjia").text(result.queryPropertyInfo.propertyInfo_OpenPrice==null?"":result.queryPropertyInfo.propertyInfo_OpenPrice+'元/㎡');
                $("#ckwuyeleibie").text(result.queryPropertyInfo.propertyInfo_Type==null?"":result.queryPropertyInfo.propertyInfo_Type);
                $("#ckwuyexingtai").text(result.queryPropertyInfo.propertyInfo_State==null?"":result.queryPropertyInfo.propertyInfo_State);
                $('#ckkaipandate').text(returnDate(result.queryPropertyInfo.propertyInfo_OpenTime));
                $('#propertyInfoid').val(returnValue(result.queryPropertyInfo.propertyInfo_Id));

                var gui=[];
                if (result.queryPropertyInfo.propertyInfo_gui != null) {
                    gui=result.queryPropertyInfo.propertyInfo_gui.split(',');
                    if (gui.length >0) {
                        var html ='';
                        for (var i=0;i<gui.length-1;i++) {
                            html +='<label class="common-borderbox common-borderbox-checked">'+gui[i]+'</label>';
                        }
                        $('#ckguidao').append(html);
                    }
                }

                var htmlCheck = "";
                $.each(result.propertyInfoSubwanys, function(index, item) {
                      htmlCheck += "<label  class='common-borderbox common-borderbox-checked'  >"+
                          ""+ item.subway_Name +""+
                          "</label>";
                });
                $("#ckperimeter").html(htmlCheck);
                if(result.queryPropertyLivingPayment){
                    $.each(result.queryPropertyLivingPayment, function(idx, item) {
                        if(item.lp_type=="水"){
                            $('#ckshifoukaitong').text(item.lp_bools == null ? "" : item.lp_bools == 1 ? "是" : "否");
                            $("#ckshuijfzq").text(item.lp_cycle==null?"":item.lp_cycle);
                            $("#ckshuiprice").text(item.lp_money==null?"":item.lp_money);
                            $("#ckshuitsfd").text(item.lp_duan==null?"":item.lp_duan);
                            $("#ckshuijtjf").text(item.lp_bool==null?"":item.lp_bool==0?"是":"否");
                            $("#ckshuicompany").text(item.lp_company==null?"":item.lp_company);
                            $("#ckshuilxr").text(item.lp_name==null?"":item.lp_name);
                            $("#ckshuiphone").text(item.lp_phone==null?"":item.lp_phone);
                            $("#ckshuirmark").text(item.lp_beizhu==null?"":item.lp_beizhu);
                            if (item.lp_bools == 1) {
                                $('#pass-warter').text('开通');
                            } else {
                                $('#pass-warter').text('未通');
                            }
                        }else if(item.lp_type=="电"){
                            $("#ckdianjfzq").text(item.lp_cycle==null?"":item.lp_cycle);
                            $("#ckdianprice").text(item.lp_money==null?"":item.lp_money);
                            $("#ckdiantsfd").text(item.lp_duan==null?"":item.lp_duan);
                            $("#ckdianjtjf").text(item.lp_bool==null?"":item.lp_bool==0?"是":"否");
                            $("#ckdiancompany").text(item.lp_company==null?"":item.lp_company);
                            $("#ckdianlxr").text(item.lp_name==null?"":item.lp_name);
                            $("#ckdianphone").text(item.lp_phone==null?"":item.lp_phone);
                            $("#ckdianrmark").text(item.lp_beizhu==null?"":item.lp_beizhu);
                            if (item.lp_bools == 1) {
                                $('#pass-electric').text('开通');
                            } else {
                                $('#pass-electric').text('未通');
                            }
                        }else if(item.lp_type=="气"){
                            $("#ckqijfzq").text(item.lp_cycle==null?"":item.lp_cycle);
                            $("#ckqiprice").text(item.lp_money==null?"":item.lp_money);
                            $("#ckqitsfd").text(item.lp_duan==null?"":item.lp_duan);
                            $("#ckqijtjf").text(item.lp_bool==null?"":item.lp_bool==0?"是":"否");
                            $("#ckqicompany").text(item.lp_company==null?"":item.lp_company);
                            $("#ckqilxr").text(item.lp_name==null?"":item.lp_name);
                            $("#ckqiphone").text(item.lp_phone==null?"":item.lp_phone);
                            $("#ckqirmark").text(item.lp_beizhu==null?"":item.lp_beizhu);
                            if (item.lp_bools == 1) {
                                $('#pass-gas').text('开通');
                            } else {
                                $('#pass-gas').text('未通');
                            }
                        }
                    });
                } else {
                    //水
                    $("#ckshuijfzq").text('');
                    $("#ckshuiprice").text('');
                    $("#ckshuitsfd").text('');
                    $("#ckshuijtjf").text('');
                    $("#ckshuicompany").text('');
                    $("#ckshuilxr").text('');
                    $("#ckshuiphone").text('');
                    $("#ckshuirmark").text('');
                    $('#pass-warter').text('未通');
                    //电
                    $("#ckdianjfzq").text('');
                    $("#ckdianprice").text('');
                    $("#ckdiantsfd").text('');
                    $("#ckdianjtjf").text('');
                    $("#ckdiancompany").text('');
                    $("#ckdianlxr").text('');
                    $("#ckdianphone").text('');
                    $("#ckdianrmark").text('');
                    $('#pass-electric').text('未通');
                    //气
                    $("#ckqijfzq").text('');
                    $("#ckqiprice").text('');
                    $("#ckqitsfd").text('');
                    $("#ckqijtjf").text('');
                    $("#ckqicompany").text('');
                    $("#ckqilxr").text('');
                    $("#ckqiphone").text('');
                    $("#ckqirmark").text('');
                    $('#pass-gas').text('未通');
                }
        }
    });
}
//基本信息数据
function properInfy () {
    var  upnId=$('#upn_id').val();
    $('#cksuoshuquyu').empty();
    $('#ckguidao').empty();
    $.ajax({
        type: "POST",
        url: "/propertyInfo/selectProperInfo",
        data:"upn_id="+upnId,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (result) {
            $('#cksuoshuquyu').empty();
            $('#ckguidao').empty();
            //小区基本信息
            var data=result.propertyInfo;
            if (data != null) {
                $('#ckxiaoqumingchen').text(returnValue(data.upn_sname));
                $('#cksuoshuquxian').text(returnValue(data.propertyInfo_quyu));
                $('#ckhexinxiaoqu').text(returnValue(data.propertyInfo_department));
                $('#ckminzhendizhi').text(returnValue(data.propertyInfo_address));
                $('#ckxiaoquzuobiao').text(returnValue(data.propertyInfo_coordinate));
                $('#ckbusAdress').text(returnValue(data.propertyInfo_transit));
                var area=[];
                if (data.propertyInfo_street != null) {
                    area=data.propertyInfo_street.split(',');
                    if (area.length >0) {
                        var html ='';
                        for (var i=0;i<area.length-1;i++) {
                            html +='<label class="common-borderbox common-borderbox-checked">'+area[i]+'</label>';
                        }
                        $('#cksuoshuquyu').append(html);
                    }
                }

                var gui=[];
                if (data.propertyInfo_gui != null) {
                    gui=data.propertyInfo_gui.split(',');
                    if (gui.length >0) {
                        for (var i=0;i<gui.length-1;i++) {
                            var html ='';
                            html +='<label class="common-borderbox common-borderbox-checked">'+gui[i]+'</label>';
                            $('#ckguidao').append(html);
                        }
                    }
                }

                // 加载地图
                if (!isEmpty(data.propertyInfo_coordinate)) {
                    var latitude = (data.propertyInfo_coordinate).split(',');
                    lookhouseMap=houseMapto(new BMap.Point(latitude[0], latitude[1]));
                } else if (data.propertyInfo_address != "") {
                    lookhouseMap=houseMapto(returnValue(data.propertyInfo_address));
                } else {
                    lookhouseMap=houseMapto(returnValue("南岸区"));
                }

                if (data.upn_sid != 0) {
                    $('.basicInformation-gou').hide();
                    $('.WuguanInformation ').hide();
                    $('.PropertyTraffic ').hide();
                    $('.cellInformation ').hide();
                }
            } else {
                $('#ckxiaoqumingchen').text('');
                $('#cksuoshuquxian').text('');
                $('#cksuoshuquyu').text('');
                $('#ckhexinxiaoqu').text('');
                $('#ckminzhendizhi').text('');
                $('#ckxiaoquzuobiao').text('');
            }
        }
    });
}
//水
function warterType (result) {
    $('#warterType').removeClass();
    $('#powerType').removeClass();
    $('#gasType').removeClass();
    $('#warterType').addClass('warterType');
    $('#powerType').addClass('powerType');
    $('#gasType').addClass('powerType');
    $.ajax({
        type: "POST",
        url: "/propertyInfo/warterPowerGas",
        data: "upn_id=" + $('#upn_id').val(),
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (result) {
            if (result.queryPropertyLivingPayment) {
                $.each(result.queryPropertyLivingPayment, function (idx, item) {
                    if (item.lp_type == "水") {
                        $('#ckshifoukaitong').text(item.lp_bools == null ? "" : item.lp_bools == 1 ? "是" : "否");
                        $("#ckshuijfzq").text(item.lp_cycle == null ? "" : item.lp_cycle);
                        $("#ckshuiprice").text(item.lp_money == null ? "" : item.lp_money);
                        $("#ckshuitsfd").text(item.lp_duan == null ? "" : item.lp_duan);
                        $("#ckshuijtjf").text(item.lp_bool == null ? "" : item.lp_bool == 0 ? "是" : "否");
                        $("#ckshuicompany").text(item.lp_company == null ? "" : item.lp_company);
                        $("#ckshuilxr").text(item.lp_name == null ? "" : item.lp_name);
                        $("#ckshuiphone").text(item.lp_phone == null ? "" : item.lp_phone);
                        $("#ckshuirmark").text(item.lp_beizhu == null ? "" : item.lp_beizhu);
                        if (item.lp_bools == 1) {
                            $('#pass-warter').text('开通');
                        }
                    }
                });
            } else {
                //水
                $('#pass-warter').text('未通');
                $('#ckshifoukaitong').text('');
                $("#ckshuijfzq").text('');
                $("#ckshuiprice").text('');
                $("#ckshuitsfd").text('');
                $("#ckshuijtjf").text('');
                $("#ckshuicompany").text('');
                $("#ckshuilxr").text('');
                $("#ckshuiphone").text('');
                $("#ckshuirmark").text('');
            }
        }
    })
}
//电
function powerType () {
    $('#warterType').removeClass();
    $('#powerType').removeClass();
    $('#gasType').removeClass();
    $('#powerType').addClass('warterType');
    $('#warterType').addClass('powerType');
    $('#gasType').addClass('powerType');
    $('#ckshifoukaitong').text('');
    $("#ckshuijfzq").text('');
    $("#ckshuiprice").text('');
    $("#ckshuitsfd").text('');
    $("#ckshuijtjf").text('');
    $("#ckshuicompany").text('');
    $("#ckshuilxr").text('');
    $("#ckshuiphone").text('');
    $("#ckshuirmark").text('');
    $.ajax({
        type: "POST",
        url: "/propertyInfo/warterPowerGas",
        data: "upn_id=" + $('#upn_id').val(),
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (result) {
            if (result.queryPropertyLivingPayment) {
                $.each(result.queryPropertyLivingPayment, function (idx, item) {
                    if (item.lp_type == "电") {
                        $('#ckshifoukaitong').text(item.lp_bools == null ? "" : item.lp_bools == 1 ? "是" : "否");
                        $("#ckshuijfzq").text(item.lp_cycle==null?"":item.lp_cycle);
                        $("#ckshuiprice").text(item.lp_money==null?"":item.lp_money);
                        $("#ckshuitsfd").text(item.lp_duan==null?"":item.lp_duan);
                        $("#ckshuijtjf").text(item.lp_bool==null?"":item.lp_bool==0?"是":"否");
                        $("#ckshuicompany").text(item.lp_company==null?"":item.lp_company);
                        $("#ckshuilxr").text(item.lp_name==null?"":item.lp_name);
                        $("#ckshuiphone").text(item.lp_phone==null?"":item.lp_phone);
                        $("#ckshuirmark").text(item.lp_beizhu==null?"":item.lp_beizhu);
                        if (item.lp_bools == 1) {
                            $('#pass-electric').text('开通');
                        } else {
                            $('#pass-electric').text('未通');
                        }
                    } else {

                    }
                });
            } else {
                //电
                $('#pass-electric').text('未通');
                $('#ckshifoukaitong').text('');
                $("#ckshuijfzq").text('');
                $("#ckshuiprice").text('');
                $("#ckshuitsfd").text('');
                $("#ckshuijtjf").text('');
                $("#ckshuicompany").text('');
                $("#ckshuilxr").text('');
                $("#ckshuiphone").text('');
                $("#ckshuirmark").text('');
            }
        }
    })
}
//气
function gasType () {
    $('#warterType').removeClass();
    $('#powerType').removeClass();
    $('#gasType').removeClass();
    $('#powerType').addClass('powerType');
    $('#warterType').addClass('powerType');
    $('#gasType').addClass('warterType');
    $('#pass-gas').text('未通');
    $('#ckshifoukaitong').text('');
    $("#ckshuijfzq").text('');
    $("#ckshuiprice").text('');
    $("#ckshuitsfd").text('');
    $("#ckshuijtjf").text('');
    $("#ckshuicompany").text('');
    $("#ckshuilxr").text('');
    $("#ckshuiphone").text('');
    $("#ckshuirmark").text('');
    $.ajax({
        type: "POST",
        url: "/propertyInfo/warterPowerGas",
        data: "upn_id=" + $('#upn_id').val(),
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (result) {
            if (result.queryPropertyLivingPayment) {
                $.each(result.queryPropertyLivingPayment, function (idx, item) {
                    if (item.lp_type == "气") {
                        $('#ckshifoukaitong').text(item.lp_bools == null ? "" : item.lp_bools == 1 ? "是" : "否");
                        $("#ckshuijfzq").text(item.lp_cycle==null?"":item.lp_cycle);
                        $("#ckshuiprice").text(item.lp_money==null?"":item.lp_money);
                        $("#ckshuitsfd").text(item.lp_duan==null?"":item.lp_duan);
                        $("#ckshuijtjf").text(item.lp_bool==null?"":item.lp_bool==0?"是":"否");
                        $("#ckshuicompany").text(item.lp_company==null?"":item.lp_company);
                        $("#ckshuilxr").text(item.lp_name==null?"":item.lp_name);
                        $("#ckshuiphone").text(item.lp_phone==null?"":item.lp_phone);
                        $("#ckshuirmark").text(item.lp_beizhu==null?"":item.lp_beizhu);
                        if (item.lp_bools == 1) {
                            $('#pass-gas').text('开通');
                        } else {
                            $('#pass-gas').text('未通');
                        }
                    } else {

                    }
                });
            } else {
                //气
                $('#pass-gas').text('未通');
                $('#ckshifoukaitong').text('');
                $("#ckshuijfzq").text('');
                $("#ckshuiprice").text('');
                $("#ckshuitsfd").text('');
                $("#ckshuijtjf").text('');
                $("#ckshuicompany").text('');
                $("#ckshuilxr").text('');
                $("#ckshuiphone").text('');
                $("#ckshuirmark").text('');
            }
        }
    })
}

/****编辑基本信息***/
//编辑基本信息
$(document).on('click','.basicInformation-gou',function () {
    $.ajax({
        type: "POST",
        url: "/propertyInfo/selectProperInfo",
        data:"upn_id="+$("#upn_id").val(),
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (result) {
            //区县
            var district=result.district;
            var company=result.companies;
            if(result.message=="error"){
            } else {
                var html = '';
                html += '<div class="divt1" id="add-basicInformation">';
                html += '    <div id="jibenxinxi" class="div-property">';
                html += '        <div class="divt2">';
                html += '            <div style="padding: 0 6px;"><i class="visited"></i></div>';
                html += '            <div style="flex: 1">基本信息</div>';
                html += '            <button class="divt3">';
                html += '            <i class="fa fa-remove close-basic btn1"></i>';
                html += '            <i class="fa fa-check btn-basic btn2"></i>';
                html += '            </button>';
                html += '        </div>';
                html += '        <div style="padding: 10px 15px;">';
                html += '            <div class="tablecss">';
                html += '                 <dl>';
                html += '                     <dt><em>*</em>小区名称：</dt>';
                html += '                     <dd>';
                html +='                        <input type="text" id="xiaoqumingcheng" value="' + returnValue(result.propertyInfo.upn_sname) + '" placeholder="小区名称">';
                html +='                      </dd>';
                html += '                 </dl>';
                html += '                 <dl>';
                html += '                     <dt><em>*</em>是否是核心小区：</dt>';
                html += '                     <dd style="width: 250px">';
                html += '                        <select class="xiaoqu">';
                if (returnValue(result.propertyInfo.propertyInfo_department) != '') {
                    html += '                            <option value="是">是</option>';
                    html += '                            <option value="否">否</option>';
                } else {
                    html += '                            <option value="否">否</option>';
                    html += '                            <option value="是">是</option>';
                }
                html += '                        </select>';
                html += '<select class="department" id="updateCompanyziji">';
                if (returnValue(result.propertyInfo.propertyInfo_department) != '') {
                    html += '    <option value=' + returnValue(result.propertyInfo.propertyInfo_department) + ' data-uccId='+ result.propertyInfo.upn_department +' >' + returnValue(result.propertyInfo.propertyInfo_department) + '</option>';
                } else {
                    html += '    <option value="">所属部门</option>';
                }
                for (var i = 0; i < company.length; i++) {
                    if (company[i].ucc_short != returnValue(result.propertyInfo.propertyInfo_department)) {
                        html += '    <option data-uccId='+company[i].ucc_id+'>' + company[i].ucc_short + '</option>';
                    }
                }
                html += '</select>';

                html += '                     </dd>';
                html += '                 </dl>';
                html += '                 <dl style="width: 100%;">';
                html += '                     <dt><em>*</em>所属区县：</dt>';
                html += '                     <dd style="width: 85%;">';
                html += '                         <select id="insertArea" class="form-control" style="width: 180px;" onchange="select();">';
                html += '               <option value=' + returnValue(result.propertyInfo.propertyInfo_quyu) + '>' + returnValue(result.propertyInfo.propertyInfo_quyu) + '</option>';
                for (var i = 0; i < district.length; i++) {
                    if (returnValue(result.propertyInfo.propertyInfo_quyu) != district[i].name) {
                        html += '    <option value=' + district[i].name + '>' + district[i].name + '</option>';
                    }
                }
                html += '                         </select>';
                html += '                     </dd>';
                html += '                 </dl>';
                html += '                 <dl id="area-dl" style="width: 100%">';
                html += '                     <dt><em>*</em>所属区域：</dt>';
                html += '                     <dd class="area" style="width: 85%;">';
                html +='                        <i class="area-i" style="font-style: normal;float: left;"></i>';
                html +='                        <button class="addArealist common-borderbox-add" onclick="editAddArea(this);">';
                html +='                            <i class="fa fa-plus-square"></i>';
                html +='                        </button>';
                html +='                        <button class="updateArealist common-borderbox-add" onclick="editUpdateArealist(this)">';
                html +='                            <i class="fa fa-pencil-square" style="font-size: 22px;color: #1ABC9C;line-height: 40px;margin: 0 12px;"></i>';
                html +='                        </button>';
                html +='                        <div class="area-div">';
                html +='                            <div class="area-quyu custom-scroll">';
                html +='                            </div>';
                html +='                            <div class="area-right"></div>';
                html +='                        </div>';
                html += '                     </dd>';
                html += '                 </dl>';
                html += '                 <dl class="traffic-dl" style="width: 100%;">';
                html +='                      <dt><em>*</em>轨道：</dt>';
                html +='                      <dd class="traffic" style="width: 85%;">';
                html +='                          <button class="addTraffic common-borderbox-add" style="padding: 0 0;">';
                html +='                              <i class="fa fa-plus-square"></i>';
                html +='                          </button>';
                html +='                          <button class="closeTraffic common-borderbox-add"style="padding: 0 0;color: red;float:right;display: none;">';
                html +='                              <i class="fa-minus-square" style="font-size: 22px;cursor: pointer;float: right;margin: 9px 12px;"></i>';
                html +='                          </button>';
                html +='                          <div class="traffic-div">';
                html +='                             <div class="traffic-quyu custom-scroll"></div>';
                html +='                             <div class="traffic-gui custom-scroll"></div>';
                html +='                             <div class="traffic-right"></div>';
                html +='                          </div>';
                html +='                      </dd>';
                html +='                  </dl>';
                html += '                 <dl style="width: 100%">';
                html += '                     <dt><em>*</em>公交地址：</dt>';
                html += '                     <dd style="width: 85%;">';
                html +='                        <input type="text" id="busAdress" value="' + returnValue(result.propertyInfo.propertyInfo_transit) + '" placeholder="公交线路" style="width: 300px;">';
                html +='                        <button type="button" class="mark-btn" onclick="searchOnMapBus(1)"><i class="fa-map-marker"></i>公交站</button>';
                html +='                      </dd>';
                html += '                 </dl>';
                html += '                 <dl>';
                html += '                     <dt><em>*</em>民政地址：</dt>';
                html += '                     <dd><input type="text" id="address" onclick="touchInput();" value="' + returnValue(result.propertyInfo.propertyInfo_address) + '" placeholder="民政地址" readonly ="true"></dd>';
                html += '                 </dl>';
                html += '                 <dl style="width: 100%;height: 360px;">';
                html += '                     <dt id="mapMark" style="display: none;">地图标记：</dt>';
                html += '                     <dd style="width: 82%;height: 355px;margin-top: 4px;">';
                html += '                        <input type="text" id="baidu" value="" placeholder="请输入民政地址" style="display: none;">';
                html += '                        <div id="houseMap" style="width:100%;height:300px;margin-top:18px;background:#F3F1EC;left: 130px;"></div>';
                html += '                     </dd>';
                html += '                 </dl>';
                html += '                     <input type="hidden" id="xiaoquzuobiao" value="' + returnValue(result.propertyInfo.propertyInfo_coordinate) + '" >';
                html += '                <div id="searchResultPanel" style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"></div>';
                html += '            </div>';
                html += '    </div>';
                html += '</div>';
                $('#basicInformation').hide();
                $('.imformation-basic').append(html);
                if (returnValue(result.propertyInfo.propertyInfo_department) != '') {
                    $('.department').show();
                }

                // 加载地图
                if (!isEmpty(result.propertyInfo.propertyInfo_coordinate)) {
                    var latitude = (result.propertyInfo.propertyInfo_coordinate).split(',');
                    houseMap = initHouseMap(new BMap.Point(latitude[0], latitude[1]));
                } else if (result.propertyInfo.propertyInfo_address != "") {
                    houseMap = initHouseMap(returnValue(result.propertyInfo.propertyInfo_address));
                } else {
                    houseMap = initHouseMap(returnValue("南岸区"));
                }

                //查询区域
                var ht ='';
                if (result.properType != null) {
                    var data=result.properType;
                    if (data.length > 0) {
                        for (var i=0;i<data.length;i++) {
                            ht +='<dl class="area-min">';
                            ht +='    <dd class="area-min-dd">';
                            ht +='        <span>'+data[i].area_name+'</span>';
                            ht +='    </dd>';
                            ht +='</dl>';
                        }
                        $('.area-quyu').append(ht);
                    }
                }
                //已选区域
                var area=[];
                if (result.propertyInfo.propertyInfo_street != null) {
                    area=result.propertyInfo.propertyInfo_street.split(',');
                    if (area.length >0) {
                        $('.area-div').show();
                        $('.area-div').css('display','flex');
                        $('#area-dl').css('height','200px');
                        $('.area').css({'width':'650px','height':'210px'});
                        $('.area-i').text($('#insertArea').val()+'/');
                        $('.addArea').hide();
                        $('.closeArea').show();
                        for (var i=0;i<area.length-1;i++) {
                            var h='';
                            h +='<label class="common-borderbox common-borderbox-checked">'+area[i]+'</label>';
                            $('.area-right').append(h);
                            $('.area-quyu .area-min').each(function () {
                                if ($(this).find('span').text() == area[i]) {
                                    $(this).addClass('dl-color');
                                }
                            })
                        }
                    }
                }

                //查询轨道
                var h='';
                var ht='';
                if (result.properTract != null) {
                    var track=result.properTract;
                    if (track.length >0) {
                        for (var i=0;i<track.length;i++) {
                            if (track[i].tr_pid == 0) {
                                h +='<dl class="traffic-min" code='+track[i].tr_id+'>';
                                h +='    <dd class="traffic-min-dd">';
                                h +='        <span>'+track[i].tr_parentName+'</span>';
                                h +='    </dd>';
                                h +='</dl>';
                            }
                            if (track[i].tr_pid == 1) {
                                ht +='<dl class="traffic-gui-dl" code='+track[i].tr_id+'>';
                                ht +='    <dd class="traffic-gui-dd">';
                                ht +='        <span>'+track[i].tr_name+'</span>';
                                ht +='    </dd>';
                                ht +='</dl>';
                            }
                        }
                        $('.traffic-quyu').append(h);
                        $('.traffic-gui').append(ht);
                    }
                }
                //轨道
                var gui=[];
                if (result.propertyInfo.propertyInfo_gui != null) {
                    gui=result.propertyInfo.propertyInfo_gui.split(',');
                    if (gui.length >0) {
                        $('.traffic-div').show();
                        $('.traffic-div').css('display','flex');
                        $('.traffic-dl').css('height','230px');
                        $('.traffic').css({'width':'650px','height':'230px'});
                        $('.addTraffic').hide();
                        $('.closeTraffic').show();
                        for (var i=0;i<gui.length-1;i++) {
                            var h='';
                            h +='<label class="common-borderbox common-borderbox-checked">'+gui[i]+'</label>';
                            $('.traffic-right').append(h);
                            $('.traffic-gui .traffic-gui-dl').each(function () {
                                if ($(this).find('span').text() == gui[i]) {
                                    $(this).addClass('dl-color');
                                }
                            })
                        }
                    }
                }
            }
        }
    });
})
//选择区县给区域赋值
function select() {
    $('.area-i').text($('#insertArea').val()+'/');
    $.ajax({
        type: "POST",
        url: "/propertyInfo/selectProperTyInfoType",
        data: "area_name=" + $('#insertArea').val(),
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (result) {
            $('.area-quyu').empty();
            var data=result.properType;
            var html ='';
            if (data.length >0) {
                for (var i=0;i<data.length;i++) {
                    html +='<dl class="area-min">';
                    html +='    <dd class="area-min-dd">';
                    html +='        <span>'+data[i].area_name+'</span>';
                    html +='    </dd>';
                    html +='</dl>';
                }
                $('.area-quyu').append(html);
            }
        }
    });
}
//添加所属区域
function editAddArea(obj) {
    var _this = $(obj);
    var html = "<div style='padding:10px;'><div style='display:block;float:left;line-height:34px;'>输入标签：</div><input type='text' class='form-control' id='pz' name='pz' /><hr></div>";
    var submit = function(v, h, f) {
        var i = 0
        $("input[name='" + _this.attr("name") + "']").each(function() {
            if ($(this).val() == f.pz) {
                i = 1;
                return false;
            }
        });
        if (i == 0) {
            if (f.pz != null && f.pz != '') {
                $('.area-right').append('<label class="common-borderbox common-borderbox-checked">' + f.pz + '</label>');
                var h='';
                h +='<dl class="area-min dl-color">';
                h +='    <dd class="area-min-dd">';
                h +='        <span>'+f.pz+'</span>';
                h +='    </dd>';
                h +='</dl>';
                $('.area-quyu').append(h);
            }
            $.ajax({
                type: "POST",
                url: "/propertyInfo/addArea",
                data: "area_sname=" + $('#insertQuyu').val()+'&area_name='+f.pz,
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                success: function (result) {
                }
            });
            return true;
        } else {
            $.jBox.tip("该标签已存在");
            return false;
        }
    };
    $.jBox(html, {
        title: "添加标签",
        submit: submit
    });
    $("#pz").focus();
}
//修改区域标签
function editUpdateArealist(obj) {
    var _this = $(obj);
    $.ajax({
        type: "POST",
        url: "/propertyInfo/selectProperTyInfoType",
        data: "area_name=" + $('#insertArea').val(),
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (result) {
            var data=result.properType;
            var html ='';
            html += "<div style='margin:10px;position: relative;display: flex;height: 200px;width: 100%;'>";
            html += "   <div class='update custom-scroll'>";
            if (data != null) {
                for (var i=0;i<data.length;i++) {
                    html +='        <dl class="update-min">';
                    html +='            <dd class="update-min-dd">';
                    html +='                <span  uid="'+data[i].area_id+'">'+data[i].area_name+'</span>';
                    html +='            </dd>';
                    html +='        </dl>';
                }
            }
            html += "   </div>";
            html += "   <i class='fa fa-arrow-right'></i>";
            html += "   <div class='select-update custom-scroll'>";
            html += "   </div>";
            html += "</div>";

            var submit = function(v, h, f) {
                var area='';
                $('.select-update input[name=area]').each(function () {
                    area+=$(this).attr('uid')+'-'+$(this).val()+'_';
                });
                $.ajax({
                    type: "POST",
                    url: "/propertyInfo/updateArea",
                    data: "area=" +area,
                    contentType: "application/x-www-form-urlencoded; charset=utf-8",
                    success: function (result) {
                        select();
                    }
                });
            };
            $.jBox(html, {
                title: "修改标签",
                submit: submit
            });
            $("#pz").focus();
        }
    });
}
//点击区域选中成标签
$(document).on('click','.area-quyu .area-min',function () {
    $(this).each(function () {
        if ($(this).hasClass('dl-color')) {
            $(this).removeClass('dl-color');
            _this=$(this);
            $('.area-right label').each(function () {
                if (_this.find('span').text() == $(this).text()) {
                    $(this).remove();
                }
            })
        } else {
            $(this).addClass('dl-color');
            var html ='';
            html +='<label class="common-borderbox common-borderbox-checked">'+$(this).find('span').text()+'</label>';
            $('.area-right').append(html);
        }
    });
})
//点击已选中标签使它删除掉
$(document).on('click','.area-right label',function () {
    $(this).remove();
    _this=$(this);
    $('.area-quyu .area-min').each(function () {
        if ($(this).find('span').text() == _this.text()) {
            $(this).removeClass('dl-color');
        }
    })
})
//取消添加所属区域
$(document).on('click','.closeArea',function() {
    $('.area-div').hide();
    $('#area-dl').css('height','');
    $('.area').css({'width':'','height':''});
    $('.area-i').text('');
    $('.addArea').show();
    $('.closeArea').hide();
})
//添加轨道
$(document).on('click','.addTraffic',function () {
    $('.traffic-quyu').empty();
    $('.traffic-gui').empty();
    $('.traffic-div').show();
    $('.traffic-div').css('display','flex');
    $('.traffic-dl').css('height','230px');
    $('.traffic').css({'width':'650px','height':'230px'});
    $('.addTraffic').hide();
    $('.closeTraffic').show();
    $.ajax({
        type: "POST",
        url: "/propertyInfo/selectProperInfoTrack",
        data: {},
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (result) {
            $('.traffic-quyu').empty();
            $('.traffic-gui').empty();
            var data=result.properTract;
            var html ='';
            if (data.length > 0) {
                for (var i=0;i<data.length;i++) {
                    if (data[i].tr_pid == 0) {
                        html +='<dl class="traffic-min" code='+data[i].tr_id+'>';
                        html +='    <dd class="traffic-min-dd">';
                        html +='        <span>'+data[i].tr_parentName+'</span>';
                        html +='    </dd>';
                        html +='</dl>';
                    }
                }
                $('.traffic-quyu').append(html);
            }
        }
    });
})
//点击线路获取站台
$(document).on('click','.traffic-min',function () {
    $(this).each(function () {
        $(this).addClass('dl-color');
        $(this).siblings().removeClass('dl-color');
        $('.traffic-gui').empty();
        var parentId=$(this).attr('code');
        $.ajax({
            type: "POST",
            url: "/propertyInfo/selectProperInfoTrack",
            data: "tr_pid=" + parentId,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            success: function (result) {
                var data=result.properTract;
                var html ='';
                if (data.length > 0) {
                    for (var i=0;i<data.length;i++) {
                        html +='<dl class="traffic-gui-dl" code='+data[i].tr_id+'>';
                        html +='    <dd class="traffic-gui-dd">';
                        html +='        <span>'+data[i].tr_name+'</span>';
                        html +='    </dd>';
                        html +='</dl>';
                    }
                    $('.traffic-gui').append(html);
                }

                if ($('.traffic-right label').length >0) {
                    $('.traffic-right label').each(function () {
                        _this=$(this);
                        $('.traffic-gui .traffic-gui-dl').each(function () {
                            if (_this.text() == $(this).find('span').text()) {
                                $(this).addClass('dl-color');
                            }
                        })
                    })
                }
            }
        });
    });
})
//点击站台获取标签
$(document).on('click','.traffic-gui .traffic-gui-dl',function () {
    $(this).each(function () {
        if ($(this).hasClass('dl-color')) {
            $(this).removeClass('dl-color');
            _this=$(this);
            $('.traffic-right label').each(function () {
                if (_this.find('span').text() == $(this).text()) {
                    $(this).remove();
                }
            })
        } else {
            $(this).addClass('dl-color');
            var html ='';
            html +='<label class="common-borderbox common-borderbox-checked">'+$(this).find('span').text()+'</label>';
            $('.traffic-right').append(html);
        }
    });
})
//点击已选轨道线路使它删除
$(document).on('click','.traffic-right label',function () {
    $(this).remove();
    _this=$(this);
    $('.traffic-gui .traffic-gui-dl').each(function () {
        if ($(this).find('span').text() == _this.text()) {
            $(this).removeClass('dl-color');
        }
    })
})
//取消添加轨道
$(document).on('click','.closeTraffic',function () {
    $('.traffic-div').hide();
    $('.traffic-dl').css('height','');
    $('.traffic').css({'width':'','height':''});
    $('.addTraffic').show();
    $('.closeTraffic').hide();
})
//是否核心小区
$(document).on('click','.xiaoqu',function () {
    $('.xiaoqu option').each(function () {
        if ($('.xiaoqu').val() == '是') {
            $('.department').show();
        } else {
            $('.department').hide();
        }
    })
})
//编辑民政地址
function touchInput () {
        $('#mapMark').show();
        $('#baidu').show();
        $('#houseMap').css('left','0px');
}
//基本信息 取消
$(document).on('click','.close-basic',function() {
    $('#basicInformation').show();
    $('.imformation-basic').empty();
})
//基本信息 提交
$(document).on('click','.btn-basic',function () {
    if ($('#xiaoqumingcheng').val() == '') {
        swal("请输入小区名称 亲!");
        return false;
    }
    if ($("#insertArea").val() == "-1"){
        swal("请选择所属区县哦 亲!");
        return false;
    }
    if ($("#suoshuquyu").val() == ""){
        swal("请选择所属区域 亲!");
        return false;
    }
    if ($(".xiaoqu").val() ==  '是') {
        if ($('.department').val() == '') {
            swal("请选择所属部门哦 亲!");
            return false;
        }
    }
    if ($("#address").val() == "" || $("#address").val() == null){
        swal("请填写民政地址 亲!");
        return false;
    }
    if ($("#xiaoquzuobiao").val() == "" || $("#xiaoquzuobiao").val() == null){
        swal("请定位小区坐标哦 亲!");
        return false;
    }
    if ($('#xiaoqumingcheng').val() == '' || $("#insertArea").val() == "-1" || $("#suoshuquyu").val() == "" || $("#address").val() == "" || $("#xiaoquzuobiao").val() == "" || $('#busAdress').val() == '') {
        swal("请把带星号的信息填写完整哦  亲!","error");
        return false;
    }
    var area='';
    $('.area-right label').each(function () {
        area+=$(this).text()+',';
    })
    var gui='';
    $('.traffic-right label').each(function () {
        gui+=$(this).text()+',';
    })
    $.ajax({
        type : "POST",
        url : "/propertyInfo/addproperty",
        data : "upn_id="+$('#upn_id').val()+"&upn_name=" + $("#xiaoqumingcheng").val()
        + "&propertyInfo_quyu=" + $("#insertArea").val()
        + "&propertyInfo_street=" + area
        +"&propertyInfo_gui="+gui
        +"&propertyInfo_transit="+$('#busAdress').val()
        + "&ucc_short=" + $(".department").val()
        + "&propertyInfo_address=" + $("#address").val()
        + "&propertyInfo_coordinate=" + $("#xiaoquzuobiao").val()
        + "&propertyInfo_source=" +"百度地图"
        + "&upn_department=" +$('#updateCompanyziji').find("option:selected").attr('data-uccId'),
        contentType : "application/x-www-form-urlencoded; charset=utf-8",
        success : function (result) {
            var data=result.propertyInfoName;
            var company=result.company;
            if (result.addresult) {
                if (result.addresult != 0) {
                    var area=[];
                    if (data.propertyInfo_street != null) {
                        area=data.propertyInfo_street.split(',');
                        if (area.length >0) {
                            for (var i=0;i<area.length-1;i++) {
                                var html ='';
                                html +='<label class="common-borderbox common-borderbox-checked">'+area[i]+'</label>';
                                $('#cksuoshuquyu').append(html);
                            }
                        }
                    }
                    var gui=[];
                    if (data.propertyInfo_gui != null) {
                        gui=data.propertyInfo_gui.split(',');
                        if (gui.length >0) {
                            for (var i=0;i<gui.length-1;i++) {
                                var html ='';
                                html +='<label class="common-borderbox common-borderbox-checked">'+gui[i]+'</label>';
                                $('#ckguidao').append(html);
                            }
                        }
                    }

                    $('#ckxiaoqumingchen').text(returnValue(data.upn_name));
                    $('#cksuoshuquxian').text(returnValue(data.propertyInfo_quyu));
                    $('#ckhexinxiaoqu').text(returnValue(company.ucc_short));
                    $('#ckminzhendizhi').text(returnValue(data.propertyInfo_address));
                    $('#ckxiaoquzuobiao').text(returnValue(data.propertyInfo_coordinate));
                    $('.imformation-basic').empty();
                    properInfy();
                    $('#basicInformation').show();
                } else {
                    swal("修改失败!","error");
                }
            } else {
                swal(result.error);
            }
        }
    });

})
//编辑基本配置
$(document).on('click','.BasicConfiguration',function () {
    $('#configure').hide();
    $.ajax({
        type: "POST",
        url: "/propertyInfo/propertySelect",
        data:"upn_id="+$("#upn_id").val(),
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function(result) {
            if(result.message=="error"){

            }else{
                if (result.queryPropertyInfo.propertyInfo_Life != null) {
                    var c=result.queryPropertyInfo.propertyInfo_Life;
                    var lou=c.split('梯');
                    $('#dianti').val(lou[0]);
                    $('#hu').val(lou[1].substring(0,lou[1].length-1));
                }
                $("#zoulouceng").val(result.queryPropertyInfo.propertyInfo_floor == null ? "" : result.queryPropertyInfo.propertyInfo_floor);
                $("#propertyInfoid").val(result.queryPropertyInfo.propertyInfo_Id);
                $("#state").val(3);

                if (result.configTypelist.length >0) {
                    var h='';
                    for (var i=0;i<result.configTypelist.length;i++) {
                        h +='<label class="common-borderbox"><i class=""></i><input name="intenter" type="checkbox" value="'+result.configTypelist[i].con_chilName+'">'+result.configTypelist[i].con_chilName+'</label>';
                    }
                    $('.wang').append(h);
                }

                var wang=[];
                if (result.queryPropertyInfo.propertyInfo_broadband != null) {
                    wang=result.queryPropertyInfo.propertyInfo_broadband.split(',');
                    if (wang.length >0) {
                        for (var i=0;i<wang.length-1;i++) {
                            $('.wang .common-borderbox').each(function () {
                                if ($(this).find('input:checkbox[name="intenter"]').val() == wang[i]) {
                                    $(this).addClass('common-borderbox-checked');
                                    $(this).find('input:checkbox[name="intenter"]').attr('checked','checked');
                                }
                            })
                        }
                    }
                }
            }
        }
    });
    var html='';
    html +='<div class="divt1" id="add-configure">';
    html +='<div id="jibenpeizi" class="div-property">';
    html +='    <div class="divt2">';
    html +='        <div style="padding: 0 6px"><i class="visited"></i></div>';
    html +='        <div style="flex: 1">基本配置</div>';
    html +='        <button class="divt3">';
    html +='            <i class="fa fa-remove close-configure btn1"></i>';
    html +='            <i class="fa fa-check btn-configure btn2"></i>';
    html +='        </button>';
    html +='    </div>';
    html +='    <div class="tablecss" style="padding: 10px 15px; overflow: hidden;">';
    html +='        <dl style="width: 100%;">';
    html +='            <dt><em>*</em>入户宽带：</dt>';
    html +='            <dd class="wang" style="width: 85%;display: inline-flex;">';
    // html +='                <label class="common-borderbox"><i class=""></i><input name="intenter" type="checkbox" value="电信网">电信网</label>';
    // html +='                <label class="common-borderbox"><i class=""></i><input name="intenter" type="checkbox" value="联通网">联通网</label>';
    // html +='                <label class="common-borderbox"><i class=""></i><input name="intenter" type="checkbox" value="移动网">移动网</label>';
    html +='            </dd>';
    html +='        </dl>';
    html +='        <dl>';
    html +='            <dt><em>*</em>电梯配置：</dt>';
    html +='            <dd>';
    html +='                <input type="text" id="dianti" style="width: 45px;margin: 0 2px;"/>梯';
    html +='                <input type="text" id="hu" style="width:45px;margin: 0 2px;margin: 0 2px;">户';
    html +='            </dd>';
    html +='        </dl>';
    html +='        <dl>';
    html +='            <dt><em>*</em>总楼层：</dt>';
    html +='            <dd><input value="" type="text" id="zoulouceng" placeholder="总楼层"/></dd>';
    html +='        </dl>';
    html +='    </div>';
    html +='</div>';
    html +='</div>';
    $('.imformation-configure').append(html);
})
//基本配置 取消
$(document).on('click','.close-configure',function () {
    $('.imformation-configure').empty();
    $('#configure').css('display','block');
})
//基本配置 提交
$(document).on('click','.btn-configure',function () {
    var propertyInfoId=	$("#propertyInfoid").val();
    $('#ckkuandai').empty();
    var state=2;
    if(/*$("#kuandai").val()=="" || $("#kuandai").val()==null ||*/ $("#dianti").val()=="" || $("#dianti").val()==null ){
        swal("请将带星号的信息完善!");
        return false;
    }
    var wang='';
    $('.wang .common-borderbox').each(function () {
        if ($(this).hasClass('common-borderbox-checked')) {
            wang+=$(this).find('input:checkbox[name="intenter"]:checked').val()+',';
        }
    })
    var dianti='';
    if ($('#dianti').val() !='' && $('#hu').val() != '') {
        dianti=$('#dianti').val()+'梯'+$('#hu').val()+'户';
    }
    $.ajax({
        type: "POST",
        url: "/propertyInfo/insertPropertys",
        data:"upn_id="+$("#upn_id").val()+"&propertyInfo_Id="+propertyInfoId+"&account="+$("#gj-id").val()+"&typeState="+state+"&propertyInfo_broadband="+wang+"&propertyInfo_Life="+dianti+"&propertyInfo_floor="+$("#zoulouceng").val(),
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function(result) {
            if(result.message=="success"){
                $.ajax({
                    type: "POST",
                    url: "/propertyInfo/propertySelect",
                    data:"upn_id="+$("#upn_id").val(),
                    contentType: "application/x-www-form-urlencoded; charset=utf-8",
                    success: function(result) {
                        if(result.message=="error"){
                            $("#state").val(3);
                        }else{
                            var wang=[];
                            if (result.queryPropertyInfo.propertyInfo_broadband != null) {
                                wang=result.queryPropertyInfo.propertyInfo_broadband.split(',');
                                if (wang.length >0) {
                                    for (var i=0;i<wang.length-1;i++) {
                                        var html ='';
                                        html +='<label class="common-borderbox common-borderbox-checked">'+wang[i]+'</label>';
                                        $('#ckkuandai').append(html);
                                    }
                                }
                            }
                            $("#ckdianti").text(result.queryPropertyInfo.propertyInfo_Life == null ? "" : result.queryPropertyInfo.propertyInfo_Life);
                            $('#ckzoulouceng').text(result.queryPropertyInfo.propertyInfo_floor == null ? "" : result.queryPropertyInfo.propertyInfo_floor+'层');
                            $('.imformation-configure').empty();
                            $('#configure').css('display','block');
                        }
                        swal("修改成功!","success");
                    }
                });
            }else{
                swal("操作失败!","error");
            }
        }
    });
})
//编辑附加消息 水,电，气
$(document).on('click','.warter',function () {
    $('#warter').hide();
    $.ajax({
        type: "POST",
        url: "/propertyInfo/propertyWater",
        data:"upn_id="+$("#upn_id").val()+"&type="+"水",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function(result) {
            if(result.message=="success"){
                $("#wuyetype option[value='"+result.queryPropertyLivingPayment.lp_type+"']").attr("selected","selected");
                $("#jiaofeizhouqi option[value='"+result.queryPropertyLivingPayment.lp_cycle+"']").attr("selected","selected");
                $("#price").val(result.queryPropertyLivingPayment.lp_money);
                $("#jietijifei option[value='"+result.queryPropertyLivingPayment.lp_bool+"']").attr("selected","selected");
                $("#sfkt option[value='"+result.queryPropertyLivingPayment.lp_bools+"']").attr("selected","selected");
                $("#teshufenduan").val(result.queryPropertyLivingPayment.lp_duan);
                $("#company").val(result.queryPropertyLivingPayment.lp_company);
                $("#lianxiren").val(result.queryPropertyLivingPayment.lp_name);
                $("#phone").val(result.queryPropertyLivingPayment.lp_phone);
                $("#lq_id").val(result.queryPropertyLivingPayment.lp_id);
                $("#propertyInfoid").val(result.queryPropertyLivingPayment.propertyInfo_Id);
            }else{
                //swal("暂未添加!");
                $("#price").val("");
                $("#jiaofeizhouqi option[value='单月']").attr("selected","selected");
                $("#jietijifei option[value='否']").attr("selected","selected");
                $("#teshufenduan").val("");
                $("#company").val("");
                $("#lianxiren").val("");
                $("#phone").val("");
                $("#lq_id").val("");
            }
        }
    });
    var html='';
    html +='<div class="divt1" id="add-warter">';
    html +='<div id="shuidianqi" class="div-property">';
    html +='    <div class="divt2">';
    html +='        <div style="padding: 0 6px;"><i class="visited"></i></div>';
    html +='        <div style="flex: 1;">水电气</div>';
    html +='        <button class="divt3">';
    html +='            <i class="fa fa-remove close-warter btn1"></i>';
    html +='            <i class="fa fa-check btn-warter btn2"></i>';
    html +='        </button>';
    html +='    </div>';
    html +='    <div class="tablecss" style="padding: 10px 15px; overflow: hidden;">';
    html +='        <dl style="width: 100%;">';
    html +='            <dt><em>*</em>是否开通：</dt>';
    html +='            <dd style="width: 85%;">';
    html +='            <select id="sfkt" style="width: 180px; height: 34px;border-radius: 3px;">';
    html +='                <option value="1">是</option>';
    html +='                <option value="0">否</option>';
    html +='            </select>';
    html +='            </dd>';
    html +='        </dl>';
    html +='        <dl>';
    html +='            <dt><em>*</em>类型：</dt>';
    html +='            <dd>';
    html +='            <select style="width: 180px; height: 34px; line-height: 35px;border-radius: 3px;" id="wuyetype" onchange="checksdq();">';
    html +='                <option id="wuyetypeshui" value="水">水</option>';
    html +='                <option id="wuyetypedian" value="电">电</option>';
    html +='                <option id="wuyetypeqi" value="气">气</option>';
    html +='            </select>';
    html +='            </dd>';
    html +='        </dl>';
    html +='        <dl>';
    html +='            <dt><em>*</em>缴费周期：</dt>';
    html +='            <dd>';
    html +='            <select id="jiaofeizhouqi" style="width: 180px; height: 34px;border-radius: 3px;">';
    html +='                <option id="jfzq1" value="单月">单月</option>';
    html +='                <option id="jfzq2" value="双月">双月</option>';
    html +='                <option id="jfzq3" value="每月">每月</option>';
    html +='                <option id="jfzq4" value="先买后用">先买后用</option>';
    html +='            </select>';
    html +='            </dd>';
    html +='        </dl>';
    html +='        <dl>';
    html +='            <dt><em>*</em>价格：</dt>';
    html +='            <dd>';
    html +='            <input value="" id="price" placeholder="价格" type="text"/>';
    html +='            </dd>';
    html +='        </dl>';
    html +='        <dl>';
    html +='            <dt><em>*</em>阶梯计费：</dt>';
    html +='            <dd>';
    html +='            <select id="jietijifei" style="  width: 180px; height: 34px;border-radius: 3px;">';
    html +='                <option id="jie1" value="0">否</option>';
    html +='                <option id="jie2" value="1">是</option>';
    html +='            </select>';
    html +='            </dd>';
    html +='        </dl>';
    html +='        <dl>';
    html +='            <dt><em>*</em>特殊分段：</dt>';
    html +='            <dd>';
    html +='                <input value="" type="text" id="teshufenduan" placeholder="特殊分段"/>';
    html +='            </dd>';
    html +='        </dl>';
    html +='        <dl>';
    html +='            <dt>公司：</dt>';
    html +='            <dd>';
    html +='                <input value="" class="form-control jianju" type="text" id="company" placeholder="公司"/>';
    html +='            </dd>';
    html +='        </dl>';
    html +='        <dl>';
    html +='            <dt>联系人：</dt>';
    html +='            <dd>';
    html +='            <input value="" type="text" id="lianxiren" placeholder="联系人"/>';
    html +='            </dd>';
    html +='        </dl>';
    html +='        <dl>';
    html +='            <dt>电话：</dt>';
    html +='            <dd>';
    html +='            <input value="" type="text" placeholder="电话" id="phone" onblur="chenkphone(phone);"/>';
    html +='            </dd>';
    html +='        </dl>';
    html +='    </div>';
    html +='</div>';
    html +='</div>';
    $('.information-warter').append(html);
})
//水,电，气取消
$(document).on('click','.close-warter',function () {
    $('.information-warter').empty();
    $('#warter').css('display','block');
})
//水,电，气 提交
$(document).on('click','.btn-warter',function () {
    if($("#sfkt").val()==1){
        if($("#price").val()=="" || $("#price").val()==null || $('#teshufenduan').val() =='' || $('#teshufenduan').val() == null){
            swal("请将带星号的信息完善!");
            return false;
        }
    }
    if(isNaN($('#price').val())){
        $("#price").msg("价格请填写正确的数字类型!");
        return false;
    }
    if($("#upn_id").val()==""){
        swal("请选择一个物业!");
        return false;
    }
    $.ajax({
        type: "POST",
        url: "/propertyInfo/insertPropertyLivingPayment",
        data:"upn_id="+$("#upn_id").val()+"&propertyInfo_Id="+$("#propertyInfoid").val()+"&lp_id="+$("#lq_id").val()+"&upn_id="+$("#upn_id").val()+"&lp_type="+$("#wuyetype").val()+"&lp_cycle="+$("#jiaofeizhouqi").val()+"&lp_money="+$("#price").val()+"&lp_duan="+$("#teshufenduan").val()+"&lp_company="+$("#company").val()+"&lp_name="+$("#lianxiren").val()+"&lp_phone="+$("#phone").val()+"&lp_bool="+$("#jietijifei").val()+"&lp_bools="+$("#sfkt").val()+"&account="+$("#gj-id").val(),
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function(result) {
            var lp_type=result.propertyLivingPayment.lp_type;
            var lp_bool=result.propertyLivingPayment.lp_bools;
            if(result.message=="success"){
                swal("操作成功  水电气需要完善完相应数据!","success");
                $("#lq_id").val(result.propertyLivingPayment.lp_id);
                $.ajax({
                    type: "POST",
                    url: "/propertyInfo/propertyWater",
                    data:"upn_id="+$("#upn_id").val()+"&type="+lp_type,
                    contentType: "application/x-www-form-urlencoded; charset=utf-8",
                    success: function (result) {
                        if (result.message=="success") {
                            $('.information-warter').empty();
                            $('#warter').css('display','block');
                            $('#ckshifoukaitong').text(result.queryPropertyLivingPayment.lp_bool == null ? "" : result.queryPropertyLivingPayment.lp_bools == 1 ? "是" : "否");
                            $('#ckshuijfzq').text(returnValue(result.queryPropertyLivingPayment.lp_cycle));
                            $('#ckshuiprice').text(returnValue(result.queryPropertyLivingPayment.lp_money));
                            $('#ckshuitsfd').text(returnValue(result.queryPropertyLivingPayment.lp_duan));
                            $('#ckshuijtjf').text(result.queryPropertyLivingPayment.lp_bool==null?"":result.queryPropertyLivingPayment.lp_bool ==0?"是":"否");
                            $('#ckshuicompany').text(returnValue(result.queryPropertyLivingPayment.lp_company));
                            $('#ckshuilxr').text(returnValue(result.queryPropertyLivingPayment.lp_name));
                            $('#ckshuiphone').text(returnValue(result.queryPropertyLivingPayment.lp_phone))
                            if (lp_type == '水') {
                                if (lp_bool == 1) {
                                    $('#pass-warter').text('开通');
                                } else {
                                    $('#pass-warter').text('未通');
                                }
                            } else if (lp_type == '电') {
                                if (lp_bool == 1) {
                                    $('#pass-electric').text('开通');
                                }else {
                                    $('#pass-electric').text('未通');
                                }
                            } else if (lp_type == '气') {
                                if (lp_bool == 1) {
                                    $('#pass-gas').text('开通');
                                }else {
                                    $('#pass-gas').text('未通');
                                }
                            }
                        } else {
                            $("#price").val("");
                            $("#jiaofeizhouqi option[value='单月']").attr("selected","selected");
                            $("#jietijifei option[value='否']").attr("selected","selected");
                            $("#teshufenduan").val("");
                            $("#company").val("");
                            $("#lianxiren").val("");
                            $("#phone").val("");
                            $("#lq_id").val("");
                        }
                    }
                });
            }else{
                swal("操作失败,请重试!","error");
            }
        }
    });
})
//编辑物管信息
$(document).on('click','.WuguanInformation',function () {
    $('#WuguanInformation').hide();
    $.ajax({
        type: "POST",
        url: "/propertyInfo/propertySelect",
        data:"upn_id="+$("#upn_id").val(),
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function(result) {
            if(result.message=="error"){
                $("#state").val(2);
            } else {
                $("#wuguanname").val(result.queryPropertyInfo.propertyInfo_Wuguan == null ? "" : result.queryPropertyInfo.propertyInfo_Wuguan);
                $("#wuguanphone").val(result.queryPropertyInfo.propertyInfo_Tel == null ? "" : result.queryPropertyInfo.propertyInfo_Tel);
                $("#wuguanprice").val(result.queryPropertyInfo.propertyInfo_Cost == null ? "" : result.queryPropertyInfo.propertyInfo_Cost);
                $("#wuyedizhi").val(result.queryPropertyInfo.propertyInfo_address == null ? "" : result.queryPropertyInfo.propertyInfo_address);
                $("#wuguancompany").val(result.queryPropertyInfo.propertyInfo_company == null ? "" : result.queryPropertyInfo.propertyInfo_company);
                $("#wuguandizhi").val(result.queryPropertyInfo.propertyInfo_waddress == null ? "" : result.queryPropertyInfo.propertyInfo_waddress);
                $("#biaozhu").val(result.queryPropertyInfo.propertyInfo_coordinate == null ? "" : result.queryPropertyInfo.propertyInfo_coordinate);
            }
        }
    });
    var html="";
    html +='<div class="divt1" id="add-WuguanInformation">';
    html +='<div id="wuguanxinxi" class="div-property">';
    html +='    <div class="divt2">';
    html +='        <div style="padding: 0 6px"><i class="visited"></i></div>';
    html +='        <div style="flex: 1;">物管信息</div>';
    html +='        <button class="divt3">';
    html +='            <i class="fa fa-remove close-WuguanInformation btn1"></i>';
    html +='            <i class="fa fa-check btn-WuguanInformation btn2"></i>';
    html +='        </button>';
    html +='    </div>';
    html +='    <div class="tablecss" style="padding: 10px 15px; overflow: hidden;">';
    html +='        <dl>';
    html +='            <dt>物管公司：</dt>';
    html +='            <dd><input value="" type="text" id="wuguancompany" placeholder="物管公司"/></dd>';
    html +='        </dl>';
    html +='        <dl>';
    html +='            <dt><em>*</em>物管名称：</dt>';
    html +='            <dd><input value="" placeholder="物管名称" type="text" id="wuguanname"/></dd>';
    html +='        </dl>';
    html +='        <dl>';
    html +='            <dt><em>*</em>物管电话：</dt>';
    html +='            <dd><input id="wuguanphone" value="" onblur="chenkwuyephone(wuguanphone);" type="text" placeholder="物管电话"/></dd>';
    html +='        </dl>';
    html +='        <dl>';
    html +='            <dt><em>*</em>物管费用：</dt>';
    html +='            <dd><input value="" type="text" placeholder="物管费用" id="wuguanprice"/></dd>';
    html +='        </dl>';
    html +='        <dl>';
    html +='            <dt>物管地址：</dt>';
    html +='            <dd><input value="" type="text" id="wuguandizhi" placeholder="物管地址"/></dd>';
    html +='        </dl>';
    html +='        <dl>';
    html +='            <dt><em>*</em>物业地址：</dt>';
    html +='            <dd><input value="" placeholder="物业地址" id="wuyedizhi" type="text" readonly="true"/></dd>';
    html +='        </dl>';
    html +='    <input type="hidden" id="biaozhu" value="">';
    html +='    </div>';
    html +='<div>';
    html +='</div>';
    $('.imformation-WuguanInformation').append(html);
})
//物管信息 取消
$(document).on('click','.close-WuguanInformation',function () {
    $('.imformation-WuguanInformation').empty();
    $('#WuguanInformation').css('display','block');
})
//物管信息 提交
$(document).on('click','.btn-WuguanInformation',function () {
    var propertyInfoId=	$("#propertyInfoid").val();
    var state=3;
    if($("#wuguanname").val()=="" || $("#wuguanname").val()==null ||$("#wuguanphone").val()=="" || $("#wuguanphone").val()==null || $('#wuguanprice').val() =="" || $('#wuguanprice').val() == null || $("#wuyedizhi").val()=="" || $("#wuyedizhi").val()==null || $('#biaozhu').val() == "" || $('#biaozhu').val() == null){
        // swal("请将带星号的信息完善!");
        swal("请将带星号的信息完善!");
        return false;
    }
    if(isNaN($('#wuguanprice').val())){
        $('#wuguanprice').msg("物管费用请填写正确的数字类型!");
        return false;
    }
    var reg = /(^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{8})$|(^[1][34578][0-9]{9})$/;
    if(!reg.test($.trim($("#wuguanphone").val()))){
        $('#wuguanphone').msg("请正确填写电话号码!");
        obj.focus();
        return false;
    }
    $.ajax({
        type: "POST",
        url: "/propertyInfo/insertPropertys",
        data:"upn_id="+$("#upn_id").val()+"&propertyInfo_Id="+propertyInfoId+"&account="+$("#gj-id").val()+"&typeState="+state+"&propertyInfo_company="+$("#wuguancompany").val()+"&propertyInfo_Wuguan="+$("#wuguanname").val()+"&propertyInfo_Tel="+$("#wuguanphone").val()+"&propertyInfo_Cost="+$("#wuguanprice").val()+"&propertyInfo_waddress="+$("#wuguandizhi").val(),
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function(result) {
            if(result.message=="success"){
                $.ajax({
                    type: "POST",
                    url: "/propertyInfo/propertySelect",
                    data:"upn_id="+$("#upn_id").val(),
                    contentType: "application/x-www-form-urlencoded; charset=utf-8",
                    success: function(result) {
                        if(result.message=="error"){
                        } else {
                            $('#ckwuyename').text(result.queryPropertyInfo.propertyInfo_Wuguan == null ? "" : result.queryPropertyInfo.propertyInfo_Wuguan);
                            $('#ckwuyguanphone').text(result.queryPropertyInfo.propertyInfo_Tel == null ? "" : result.queryPropertyInfo.propertyInfo_Tel);
                            $('#ckwuguanprice').text(result.queryPropertyInfo.propertyInfo_Cost == null ? "" : result.queryPropertyInfo.propertyInfo_Cost+'元/㎡');
                            $('#ckwuyedizhi').text(result.queryPropertyInfo.propertyInfo_address == null ? "" : result.queryPropertyInfo.propertyInfo_address);
                            $('#ckwuguancompany').text(result.queryPropertyInfo.propertyInfo_company == null ? "" : result.queryPropertyInfo.propertyInfo_company);
                            $('#ckwuguandizhi').text(result.queryPropertyInfo.propertyInfo_waddress == null ? "" : result.queryPropertyInfo.propertyInfo_waddress);
                            $("#ckzuobiao").text(result.queryPropertyInfo.propertyInfo_coordinate == null ? "" : result.queryPropertyInfo.propertyInfo_coordinate);
                            $('.imformation-WuguanInformation').empty();
                            $('#WuguanInformation').css('display','block');
                        }
                        swal("操作成功!","success");
                    }
                });
            }else{
                swal("操作失败!","error");
            }
        }
    });
})
//编辑小区信息
$(document).on('click','.cellInformation',function () {
    $('#cellInformation').hide();
    $.ajax({
        type: "POST",
        url: "/propertyInfo/propertySelect",
        data:"upn_id="+$("#upn_id").val(),
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function(result) {
            if(result.message=="error"){
                $("#state").val(3);
            } else {
                $("#kaifashang").val(result.queryPropertyInfo.propertyInfo_developer == null ? "" :  result.queryPropertyInfo.propertyInfo_developer);
                $("#guanlifangshi").val(result.queryPropertyInfo.propertyInfo_ManaStyle == null ? "" : result.queryPropertyInfo.propertyInfo_ManaStyle);
                $("#lvhualv").val(result.queryPropertyInfo.propertyInfo_GreenRate == null ? "" : result.queryPropertyInfo.propertyInfo_GreenRate);
                $("#rongjilv").val(result.queryPropertyInfo.propertyInfo_PlotRate == null ? "" : result.queryPropertyInfo.propertyInfo_PlotRate);
                $("#zongtaoshu").val(result.queryPropertyInfo.propertyInfo_TotalAmount == null ? "" : result.queryPropertyInfo.propertyInfo_TotalAmount);
                $("#jianzhumianji").val(result.queryPropertyInfo.propertyInfo_BuildArea == null ? "" : result.queryPropertyInfo.propertyInfo_BuildArea);
                $("#zhandimianji").val(result.queryPropertyInfo.propertyInfo_TotalArea == null ? "" : result.queryPropertyInfo.propertyInfo_TotalArea);
                $("#kaipanjia").val(result.queryPropertyInfo.propertyInfo_OpenPrice == null ? "" : result.queryPropertyInfo.propertyInfo_OpenPrice);
                $("#cheku").val(result.queryPropertyInfo.propertyInfo_CarPark == null ? "" : result.queryPropertyInfo.propertyInfo_CarPark);
                $("#gonggongsheshi").val(result.queryPropertyInfo.propertyInfo_Public == null ? "" : result.queryPropertyInfo.propertyInfo_Public);
                $("#xiaoquhuanjin option[value='"+result.queryPropertyInfo.propertyInfo_you+"']").attr("selected","selected");
                $("#kaipandate").val(returnDate(result.queryPropertyInfo.propertyInfo_OpenTime));
                $("#wuyexingtai option[value='"+result.queryPropertyInfo.propertyInfo_State+"']").attr("selected","selected");
                $("#propertyInfoid").val(result.queryPropertyInfo.propertyInfo_Id == null ? "" : result.queryPropertyInfo.propertyInfo_Id);
            }
            var htmlCheck = "";
            $.each(result.propertyInfoSubwanys, function(index, item) {
                htmlCheck += "<label class='common-borderbox common-borderbox-checked'>"+
                    ""+ item.subway_Name +""+
                    "<input type='checkbox' name='hi_function' value='"+ item.subway_Name +"' checked='checked'>"+
                    "</label>";
            });
            if (htmlCheck != "") {
                htmlCheck+="<button class='common-borderbox-add' name='hi_function' onclick='addLabel(this)'>"+
                    "<i class='fa fa-plus-square'></i>"+
                    "</button>";
                $("#perimeter").html(htmlCheck);
            }
        }
    });
    var html='';
    html +='<div class="divt1" id="add-cellInformation">';
    html +='<div id="caipan" class="div-property">';
    html +='    <div class="divt2">';
    html +='        <div style="padding: 0 6px;"><i class="visited"></i></div>';
    html +='        <div style="flex: 1;">小区信息</div>';
    html +='        <button class="divt3">';
    html +='            <i class="fa fa-remove close-cellInformation btn1"></i>';
    html +='            <i class="fa fa-check btn-cellInformation btn2"></i>';
    html +='        </button>';
    html +='    </div>';
    html +='    <div class="tablecss" style="padding: 10px 15px; overflow: hidden;">';
    html +='        <dl style="width:100%;height: auto; overflow: hidden;">';
    html +='            <dt><em>*</em>小区周边：</dt>';
    html +='            <dd style="width: 390px;" id="perimeter">';
    html +='                <label class="common-borderbox">';
    html +='                    学校';
    html +='                    <input type="checkbox" name="hi_function" value="学校">';
    html +='                </label>';
    html +='                <button class="common-borderbox-add" name="hi_function" onclick="addLabel(this)" style="padding:0 13px;">';
    html +='                <i class="fa fa-plus-square"></i>';
    html +='                </button>';
    html +='                <em>*</em>';
    html +='            </dd>';
    html +='        </dl>';
    html +='        <dl>';
    html +='            <dt>开发商：</dt>';
    html +='            <dd style="width: 200px;"><input value="" type="text" id="kaifashang" placeholder="请输入开发商"/></dd>';
    html +='        </dl>';
    html +='        <dl>';
    html +='            <dt>管理方式：</dt>';
    html +='            <dd style="width: 200px;">';
    html +='                <select id="guanlifangshi" style="width: 180px; height: 34px;border-radius: 4px;">';
    html +='                <option value="封闭式">封闭式</option>';
    html +='                <option value="开放式">开放式</option>';
    html +='                <option value="半开放式">半开放式</option>';
    html +='                </select>';
    html +='            </dd>';
    html +='        </dl>';
    html +='        <dl>';
    html +='            <dt>绿化率：</dt>';
    html +='            <dd><input value="" placeholder="绿化率" id="lvhualv" type="text"/></dd>';
    html +='        </dl>';
    html +='        <dl>';
    html +='            <dt>容积率：</dt>';
    html +='            <dd><input value="" placeholder="容积率" id="rongjilv" type="text"/></dd>';
    html +='        </dl>';
    html +='        <dl>';
    html +='            <dt>总套数：</dt>';
    html +='            <dd><input value="" placeholder="总套数" id="zongtaoshu" type="text"/></dd>';
    html +='        </dl>';
    html +='        <dl>';
    html +='            <dt>建筑面积：</dt>';
    html +='            <dd><input value="" placeholder="建筑面积" id="jianzhumianji" type="text"/></dd>';
    html +='        </dl>';
    html +='        <dl>';
    html +='            <dt>占地面积：</dt>';
    html +='            <dd><input value="" id="zhandimianji" placeholder="占地面积" type="text"/></dd>';
    html +='        </dl>';
    html +='        <dl>';
    html +='            <dt>开盘价：</dt>';
    html +='            <dd><input value="" placeholder="开盘价" id="kaipanjia" type="text"/></dd>';
    html +='        </dl>';
    html +='        <dl>';
    html +='            <dt>车库：</dt>';
    html +='            <dd><input value="" type="text" id="cheku" placeholder="车库"/></dd>';
    html +='        </dl>';
    html +='        <dl>';
    html +='            <dt>公共设施：</dt>';
    html +='            <dd><input value="" type="text" id="gonggongsheshi" placeholder="公共设施"/></dd>';
    html +='        </dl>';
    html +='        <dl>';
    html +='            <dt>小区环境：</dt>';
    html +='            <dd>';
    html +='                <select id="xiaoquhuanjin" style="width: 180px; height: 34px;border-radius: 4px;">';
    html +='                <option value="2">优</option>';
    html +='                <option value="0">良</option>';
    html +='                <option value="1">差</option>';
    html +='                </select>';
    html +='            </dd>';
    html +='        </dl>';
    html +='        <dl>';
    html +='            <dt>物业类别：</dt>';
    html +='            <dd>';
    html +='                <select id="wuyexingtai" style="width: 180px;height: 34px;border-radius: 3px;">';
    html +='                    <option value="住宅">住宅</option>';
    html +='                    <option value="商业">商业</option>';
    html +='                    <option value="商住">商住</option>';
    html +='                    <option value="其它">其它</option>';
    html +='                </select>';
    html +='            </dd>';
    html +='        </dl>';
    html +='        <dl>';
    html +='            <dt>物业形态：</dt>';
    html +='            <dd>';
    html +='                <select id="wuyeleibie" style="width:  180px; height: 34px;border-radius: 3px;">';
    html +='                    <option value="高层">高层</option>';
    html +='                    <option value="洋房">洋房</option>';
    html +='                    <option value="别墅">别墅</option>';
    html +='                    <option value="公寓">公寓</option>';
    html +='                    <option value="小区">小区</option>';
    html +='                    <option value="门面">门面</option>';
    html +='                    <option value="办公">办公</option>';
    html +='                    <option value="厂房">厂房</option>';
    html +='                    <option value="其它">其它</option>';
    html +='                </select>';
    html +='            </dd>';
    html +='        </dl>';
    html +='        <dl>';
    html +='            <dt>开盘时间：</dt>';
    html +='            <dd>';
    html +='                <input value="" type="text" id="kaipandate" onclick="WdatePicker({startDate:\'%y-%M-%d \',dateFmt:\'yyyy-MM-dd \',alwaysUseStartDate:true})" readonly="readonly" data-validation-engine="validate[required]" placeholder="请输入开盘时间" style="margin-left: 6px; border: 0px; border-radius:0px;border-bottom: 1px gray solid;"/>'
    html +='            </dd>';
    html +='        </dl>';
    html +='    </div>';
    html +='</div>';
    html +='</div>';
    $('.information-cellInformation').append(html);
})
//小区信息 取消
$(document).on('click','.close-cellInformation',function () {
    $('.information-cellInformation').empty();
    $('#cellInformation').css('display','block');
})
//小区信息 提交
$(document).on('click','.btn-cellInformation',function () {
    var propertyInfoId=	$("#propertyInfoid").val();
    var subway_Name = "";
    $("#perimeter .common-borderbox").each(function(i){
        if($(this).attr("class") == "common-borderbox common-borderbox-checked"){
            subway_Name+= $(this).find("input").val() + ",";
        }
    });
    subway_Name = subway_Name.substring(0,subway_Name.length-1);
    if(subway_Name== null || subway_Name == "" ){
        $('#perimeter').msg("请填写小区周边!");
        return;
    }
    var state=4;
    $.ajax({
        type: "POST",
        url: "/propertyInfo/insertPropertys",
        data:"upn_id="+$("#upn_id").val()+"&propertyInfo_Id="+propertyInfoId+"&account="+$("#gj-id").val()+"&typeState="+state+"&propertyInfo_developer="+$("#kaifashang").val()+"&propertyInfo_ManaStyle="+$("#guanlifangshi").val()+"&propertyInfo_GreenRate="+returnValue($("#lvhualv").val())+
                "&propertyInfo_PlotRate="+$("#rongjilv").val()+"&propertyInfo_TotalAmount="+$("#zongtaoshu").val()+"&propertyInfo_BuildArea="+$("#jianzhumianji").val()+"&propertyInfo_TotalArea="+$("#zhandimianji").val()+"&propertyInfo_OpenPrice="+$("#kaipanjia").val()+
                "&propertyInfo_Type="+$("#wuyeleibie").val()+"&propertyInfo_State="+$("#wuyexingtai").val()+"&propertyInfoDate="+$("#kaipandate").val()+"&subway_Name="+subway_Name+"&propertyInfo_CarPark="+$("#cheku").val()+"&propertyInfo_Public="+$("#gonggongsheshi").val()+
                "&propertyInfo_you="+$("#xiaoquhuanjin").val(),
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function(result) {
            if(result.message=="success"){
                $.ajax({
                    type: "POST",
                    url: "/propertyInfo/propertySelect",
                    data:"upn_id="+$("#upn_id").val(),
                    contentType: "application/x-www-form-urlencoded; charset=utf-8",
                    success: function(result) {
                        if(result.message=="error"){
                        } else {
                            $("#ckkaifashang").text(result.queryPropertyInfo.propertyInfo_developer==null?"":result.queryPropertyInfo.propertyInfo_developer);
                            $("#ckguanlifangshi").text(result.queryPropertyInfo.propertyInfo_ManaStyle==null?"":result.queryPropertyInfo.propertyInfo_ManaStyle);
                            $("#cklvhualv").text(result.queryPropertyInfo.propertyInfo_GreenRate==null?"":result.queryPropertyInfo.propertyInfo_GreenRate +'%');
                            $('#ckrongjilv').text(result.queryPropertyInfo.propertyInfo_PlotRate==null?"":result.queryPropertyInfo.propertyInfo_PlotRate +'%');
                            $("#ckzongtaoshu").text(result.queryPropertyInfo.propertyInfo_TotalAmount==null?"":result.queryPropertyInfo.propertyInfo_TotalAmount+'套');
                            $("#ckjianzhumianji").text(result.queryPropertyInfo.propertyInfo_BuildArea==null?"":result.queryPropertyInfo.propertyInfo_BuildArea+'㎡');
                            $("#ckzhandimianji").text(result.queryPropertyInfo.propertyInfo_TotalArea==null?"":result.queryPropertyInfo.propertyInfo_TotalArea+'㎡');
                            $("#ckkaipanjia").text(result.queryPropertyInfo.propertyInfo_OpenPrice==null?"":result.queryPropertyInfo.propertyInfo_OpenPrice+'元/㎡');
                            $("#ckwuyeleibie").text(result.queryPropertyInfo.propertyInfo_Type==null?"":result.queryPropertyInfo.propertyInfo_Type);
                            $("#ckwuyexingtai").text(result.queryPropertyInfo.propertyInfo_State==null?"":result.queryPropertyInfo.propertyInfo_State);
                            $('#ckkaipandate').text(returnDate(result.queryPropertyInfo.propertyInfo_OpenTime));
                            $("#ckpark").text(result.queryPropertyInfo.propertyInfo_CarPark == null ? "" : result.queryPropertyInfo.propertyInfo_CarPark);
                            $("#ckgonggongsheshi").text(result.queryPropertyInfo.propertyInfo_Public == null ? "" : result.queryPropertyInfo.propertyInfo_Public);
                            $("#ckxiaoquhuanjin").text(result.queryPropertyInfo.propertyInfo_you==2?"优":(result.queryPropertyInfo.propertyInfo_you==1?"差":"中"));
                            var htmlCheck = "";
                            $.each(result.propertyInfoSubwanys, function(index, item) {
                                htmlCheck += "<label class='common-borderbox common-borderbox-checked'>"+
                                    ""+ item.subway_Name +""+
                                    "<input type='checkbox' name='hi_function' value='"+ item.subway_Name +"' style='display: none;'>"+
                                    "</label>";
                            });
                            $("#ckperimeter").html(htmlCheck);
                            $('.information-cellInformation').empty();
                            $('#cellInformation').css('display','block');
                            swal("操作成功!","success");
                        }
                    }
                });
            }else{
                swal("操作失败!","error");
            }
        }
    });
})

//水电气跟进（水电气）
function checksdq(){
    if($("#upn_id").val()==""){
        // swal("请选择一个物业!");
        swal("请选择一个物业!");
    }
    $.ajax({
        type: "POST",
        url: "/propertyInfo/propertyWater",
        data:"upn_id="+$("#upn_id").val()+"&type="+$("#wuyetype").val(),
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function(result) {
            if(result.message=="success"){
                $("#wuyetype option[value='"+result.queryPropertyLivingPayment.lp_type+"']").attr("selected","selected");
                $("#jiaofeizhouqi option[value='"+result.queryPropertyLivingPayment.lp_cycle+"']").attr("selected","selected");
                $("#price").val(result.queryPropertyLivingPayment.lp_money);
                $("#jietijifei option[value='"+result.queryPropertyLivingPayment.lp_bool+"']").attr("selected","selected");
                $("#sfkt option[value='"+result.queryPropertyLivingPayment.lp_bools+"']").attr("selected","selected");
                $("#teshufenduan").val(result.queryPropertyLivingPayment.lp_duan);
                $("#company").val(result.queryPropertyLivingPayment.lp_company);
                $("#lianxiren").val(result.queryPropertyLivingPayment.lp_name);
                $("#phone").val(result.queryPropertyLivingPayment.lp_phone);
                $("#lq_id").val(result.queryPropertyLivingPayment.lp_id);
                $("#propertyInfoid").val(result.queryPropertyLivingPayment.propertyInfo_Id);

            }else{
                //swal("暂未添加!");
                $("#price").val("");
                $("#jiaofeizhouqi option[value='单月']").attr("selected","selected");
                $("#jietijifei option[value='否']").attr("selected","selected");
                $("#teshufenduan").val("");
                $("#company").val("");
                $("#lianxiren").val("");
                $("#phone").val("");
                $("#lq_id").val("");
            }
        }
    });
}
/** 添加小区周边标签*/
function addLabel(obj) {
    var _this = $(obj);
    var html = "<div style='padding:10px;'><div style='display:block;float:left;line-height:34px;'>输入标签：</div><input type='text' class='form-control' id='pz' name='pz' /><hr></div>";
    var submit = function(v, h, f) {
        var i = 0
        $("input[name='" + _this.attr("name") + "']").each(function() {
            if ($(this).val() == f.pz) {
                i = 1;
                return false;
            }
        });
        if (i == 0) {
            if (f.pz != null && f.pz != '') {
                _this.before('<label class="common-borderbox common-borderbox-checked">' + f.pz + '<input type="checkbox" name="hi_function" value="' + f.pz + '" checked></label>');
            }
            return true;
        } else {
            $.jBox.tip("该标签已存在");
            return false;
        }
    };
    $.jBox(html, {
        title: "添加标签",
        submit: submit
    });
    $("#pz").focus();
}
//验证电话号码
function chenkphone(obj){
    var reg = /(^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{8})$|(^[1][345678][0-9]{9})$/;
    if(!reg.test($.trim($("#phone").val()))){
        $('#phone').msg("请正确填写电话号码!");
        obj.focus();
        return false;
    }
}
function chenkwuyephone(obj){
    var reg = /(^(\d{3,4}-|\s)|(\d{3,4}|\s)?\d{7})$|(^[1][345678][0-9]{9})$/;
    if(!reg.test($.trim($("#wuguanphone").val()))){
        $('#wuguanphone').msg("请正确填写电话号码!");
        obj.focus();
        return false;
    }
}

/***添加地图***/
function addMap(center) {
    map = new BMap.Map("addhouseMap");
    map.centerAndZoom(center, 13);
    map.enableInertialDragging(true); // 允许惯性拖拽
    map.enableScrollWheelZoom(); //开启滚轮缩放地图
    map.addControl(new BMap.NavigationControl()); // 添加左侧平移和缩放按钮
    map.addEventListener("click", function (e) {

    }); // 绑定点击事件

    var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
        {
            "input": "addPro",
            "location": map
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
        G("searchResult").innerHTML = str;
    });
    var myValue;
    ac.addEventListener("onconfirm", function (e) {    //鼠标点击下拉列表后的事件
        var _value = e.item.value;
        myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
        G("searchResult").innerHTML = "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;

        setaddPlace(map, myValue);
    });
    return map;
}
function setaddPlace (map, myValue) {
    map.clearOverlays();    //清除地图上所有覆盖物
    function myFun() {
        var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
        $('#addPropertyInfo_coordinate').val(pp.lng + "," + pp.lat);
        map.centerAndZoom(pp, 18);
        var coordinate = new BMap.Icon("/resources/image/house_coordinate.png", new BMap.Size(16, 22));
        var marker = new BMap.Marker(pp, {icon: coordinate});
        marker.enableDragging();  //设置可拖拽
        marker.addEventListener("dragend", function (e) {  //拖动事件
            var pt = e.point;
            $('#addPropertyInfo_coordinate').val(pt.lng + "," + pt.lat);
        });
        map.addOverlay(marker);   //添加标注
    }

    var local = new BMap.LocalSearch(map, { //智能搜索
        onSearchComplete: myFun
    });
    local.search(myValue);
    $(".addPropertyInfo_address").val($("#addPro").val());
}


/****查看地图***/
var houseMapMarker=null;
function houseMapto(center) {
    map = new BMap.Map("houseMapto");
    map.centerAndZoom(center, 17);
    map.enableInertialDragging(true); // 允许惯性拖拽
    map.enableScrollWheelZoom(); //开启滚轮缩放地图
    map.addControl(new BMap.NavigationControl()); // 添加左侧平移和缩放按钮
    map.addEventListener("click", function (e) {

    }); // 绑定点击事件

    searchOnhouseMapto(center);
    return map;
}
/**
 * 房屋地址定位
 *
 * @param obj
 * @returns
 */
function searchOnhouseMapto(center) {
    var  address = $('#ckminzhendizhi').text().trim();
    if (address != "") {
        // 创建地址解析器实例
        var myGeo = new BMap.Geocoder();
        // 将地址解析结果显示在地图上,并调整地图视野
        myGeo.getPoint(address, function (point) {
            if (center) {
                $("#hi_latitude").val(center.lng + "," + center.lat);
                // 定位到该处
                lookhouseMap.centerAndZoom(center, 17);
                // 如果没坐标，初始化坐标，否则将坐标移动到该处
                houseMapMarker=null;
                if (houseMapMarker == null) {
                    houseMapMarker = houseMaptoMarker(lookhouseMap);
                } else {
                    houseMapMarker.setPosition(center);
                }
                houseMapMarker.addEventListener("dragend", function (e) {  //拖动事件
                    var pt = e.center;
                });
            } else {
                $.jBox.tip("未查询到该地址！", "error");
            }
        }, "重庆");
    } else {
        $.jBox.tip("请输入详细地址！", "error");
    }
}
function houseMaptoMarker(map) {
    var coordinate = new BMap.Icon("/resources/image/house_coordinate.png", new BMap.Size(16, 22));
    var marker = new BMap.Marker(map.getCenter(), {icon: coordinate});
    marker.enableDragging(true);
    marker.addEventListener("mouseup", function (e) {
        var point = e.target.getPosition();
    });
    map.addOverlay(marker);
    return marker;
}


/****编辑地图****/
var houseMarker=null;
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

    searchOnMap(center);
        var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
            {
                "input": "baidu",
                "location": map
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
function G(id) {
    return document.getElementById(id);
}
function setPlace (map, myValue) {
    map.clearOverlays();    //清除地图上所有覆盖物
    function myFun() {
        var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
        $("#hi_latitude").val(pp.lng + "," + pp.lat);
        $('#xiaoquzuobiao').val(pp.lng + "," + pp.lat);
        map.centerAndZoom(pp, 18);
        var coordinate = new BMap.Icon("/resources/image/house_coordinate.png", new BMap.Size(16, 22));
        var marker = new BMap.Marker(pp, {icon: coordinate});
        marker.enableDragging();  //设置可拖拽
        marker.addEventListener("dragend", function (e) {  //拖动事件
            var pt = e.point;
            $('#xiaoquzuobiao').val(pt.lng + "," + pt.lat);
        });
        map.addOverlay(marker);   //添加标注
    }

    var local = new BMap.LocalSearch(map, { //智能搜索
        onSearchComplete: myFun
    });
    local.search(myValue);
    $("#address").val($("#baidu").val());
}
/**
 * 房屋地址定位
 */
function searchOnMap(center) {
      var  address = $('#address').val().trim();
    if (address != "") {
        // 创建地址解析器实例
        var myGeo = new BMap.Geocoder();
        // 将地址解析结果显示在地图上,并调整地图视野
        myGeo.getPoint(address, function (point) {
            if (center) {
                // 定位到该处
                houseMap.centerAndZoom(center, 17);
                // 如果没坐标，初始化坐标，否则将坐标移动到该处
                houseMarker=null;
                if (houseMarker == null) {
                    houseMarker = initHouseMarker(houseMap);
                } else {
                    houseMarker.setPosition(center);
                }
                houseMarker.addEventListener("dragend", function (e) {  //拖动事件
                    var pt = e.center;
                });
            } else {
                $.jBox.tip("未查询到该地址！", "error");
            }
        }, "重庆");
    } else {
        $.jBox.tip("请输入详细地址！", "error");
    }
}
function initHouseMarker(map) {
    var coordinate = new BMap.Icon("/resources/image/house_coordinate.png", new BMap.Size(16, 22));
    var marker = new BMap.Marker(map.getCenter(), {icon: coordinate});
    marker.enableDragging(true);
    marker.addEventListener("mouseup", function (e) {
        var point = e.target.getPosition();
    });
    map.addOverlay(marker);
    return marker;
}

//获取周边公交站
function searchOnMapBus(num) {
    map.clearOverlays();//清除图层覆盖物
    var address = $("#address").val().trim();
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
