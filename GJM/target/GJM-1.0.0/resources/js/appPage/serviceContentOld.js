var imageLoad = null;
var imageBill = null;
var md_ids = 0;
var user_id = null;
var startPoint = "";
var endPoint = "";

// 地图定位
var lngEnd = "";         //经度
var latEnd = "";         //纬度
$(function () {
    //alert(window.location.href);
    $("#service_addressbox").hide();
    $(".moveAddress").hide();
    $(".endTiemBefor").hide();
    $(".endTiemAfter").hide();

    $(".startTiemBefor").hide();
    $(".startTiemAfter").hide();
    $(".alert-content").height($(window).height());
    $(".alert-content-bg").height($(window).height())

    // 图片上传
    /*imageLoad = $("#imageLoad").imageUpload({
        skin: "appImageBox",
        uploadType: 'maintenance',
        limitUpload: false,
        isTailor: false,
        success: function (box) {
            box.find('.image-item-add').append('<span class="imagefont">上传照片</span>');
        },
        builds: {
            onUpload: function (img) {
                // 保存图片到数据库
                addServiceImage(img.attr("src"));
            },
            onDelete: function (path) {
                // 删除图片
                deleteServiceImage(path);
            }
        }
    });*/
    // 图片上传
    /*imageBill = $("#imageBill").imageUpload({
        skin: "appImageBox",
        uploadType: 'maintenance',
        limitUpload: false,
        isTailor: false,
        multiple: false,
        success: function (box) {
            box.find('.image-item-add').append('<span class="imagefont">上传照片</span>');
        },
        builds: {
            onUpload: function (img) {
                // 保存图片到数据库
                addServiceImage1(img.attr("src"));
            },
            onDelete: function (path) {
                // 删除图片
                deleteServiceImage1(path);
            }
        }
    });*/
    $("<link>").attr({
        rel: "stylesheet",
        type: "text/css",
        href: "/resources/css/appPage/serviceContentOld.css"
    }).appendTo("head");
    var md_id = GetQueryString("so_id");
    if (md_id != null) {
        data(md_id);
    }
    mui.previewImage();

    $(".alert-content-bg").click(function () {
        $(this).parent().hide();
    });
});

/** 服务描述 */
function circleClick() {
    $(".alert-content").show();
}

// 获取数据
function data(md_id) {
    md_ids = md_id;
    $.ajax({
        type: "POST",
        url: "/service/showListInfos",
        data: {
            /* width: 70,//需要拉取的图片宽度
             height: 70,//需要拉取的图片高度*/
            md_id: md_id,
        },
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {

            var hi_area = result.declaration.hi_area;
            var house_longlat = result.maintenancePoint.house_longlat;
            $("#md_id").val(result.declaration.md_id);
            $("#em_id").val(result.declaration.em_id);
            var problem = result.declaration.md_problem;
            $("#service_type").html(problem);
            $("#service_type").append("<label class='fa-question-circle-o' onclick='circleClick()'></label>");
            $("#service_types").text(result.declaration.st_name);
            $("#service_types1").text(result.declaration.mdg_state == null ? "未受理" : result.declaration.mdg_state);
            $("#service_custmorName").text(result.declaration.md_contactpeople);
            $("#service_custmorPhone").text(result.declaration.md_contactPhone);

            $(".telPhone button").attr("onclick", "callphone(\"" + result.declaration.md_contactPhone + "\")");
            //$("#service_date").text(result.dispatching == null ? "" : (new Date(result.dispatching.mdg_time).format("yyyy-MM-dd hh:mm")));
            $("#service_date").text(result.declaration.md_time == null ? "" : (new Date(result.declaration.md_time).format("yyyy-MM-dd")));
            $("#service_sdate").text(result.declaration.apply_time == null ? "" : (new Date(result.declaration.apply_time).format("yyyy-MM-dd hh:mm")));
            var mtkendtime = format(result.declaration.mtk_end_time, "yyyy-MM-dd HH:mm");
            var mtkstarttime = format(result.declaration.mtk_start_time, "yyyy-MM-dd HH:mm");
            user_id = result.declaration.user_id;
            //预计开始
            if (mtkstarttime != null) {
                $(".startTiemAfter dd").text(mtkstarttime);
            }
            //预计结束
            if (mtkendtime != null) {
                $(".endTiemAfter dd").text(mtkendtime);
            }
            if (result.declaration.md_CustomerImage != null) {
                $("#customerImage").attr("src", "data:image/png;base64," + result.declaration.md_CustomerImage + "");
            } else {
                $("#customerImage").hide();
            }


            //展示地址不同类型的不同信息
            if (result.maintenancePoint.length > 1) {
                for (var i = 0; i < result.maintenancePoint.length; i++) {
                    var p_type = result.maintenancePoint[i].p_type;
                    var house_longlat = result.maintenancePoint[i].house_longlat;
                    if (p_type == 2) {
                        startPoint = house_longlat;
                    }
                    if (p_type == 3) {
                        endPoint = house_longlat;
                    }
                }
                $(".seeAddress button").attr("onclick", "toBaiduMap()");
                $(".moveAddress").show();
            } else {
                for (var i = 0; i < result.maintenancePoint.length; i++) {
                    endPoint = result.maintenancePoint[i].house_longlat;
                    $(".seeAddress button").attr("onclick", "toBaiduMap()");
                }
                $("#service_addressbox").show();
            }
            // 服务问题列表
            $(".alert-content ul").html("");
            $(result.problems).each(function (index, item) {
                $(".alert-content ul").append("<li>" + item.mdp_content + "</li>");
            });

            // 显示图片
            var imgList = new Array();
            var htms = ""
            $(result.imageList).each(function (index, item) {
                htms += "<div class='image-item'><img class='image-item-img' src='" + item.img_path + "' data-url='" + item.mi_path + "' data-preview-src data-preview-group='1'> </div>"
                imgList.push(item.mi_path);
            });

            $("#imageLoad").imageUpload({
                dataList: imgList,
                skin: "appImageBox",
                uploadType: 'maintenance',
                multiple: false,
                limitUpload: false,
                isTailor: false
            });

            mui.previewImage();
            $("#imageLoad").html(htms);

            //var  = GetQueryString("type");
            var emId = isEmpty(result.tracks.em_id) ? "null" : result.tracks.em_id == GetQueryString("em_id");

            if (emId==true) {
                switch (result.tracks.mtk_state) {
                    case "no":
                        $(".serviceBillb").show();
                        $(".serviceStart").hide();
                        $(".serviceEnd").hide();
                        $(".endTiemBefor").show();
                        $(".startTiemBefor").show();
                        //$(".serviceAutograph").hide();
                        break;
                    case "get":
                        if ($(".alert-content-list ul li").length == 0 && $("#service_types").text().indexOf("维修") > -1) {
                            $(".serviceBillb").hide();
                            $(".startTiemAfter").show();
                            $(".endTiemAfter").show();
                            $(".serviceProblem").show();
                        } else {
                            $(".serviceProblem").hide();
                            $(".serviceBillb").hide();
                            $(".serviceStart").show();
                            $(".serviceEnd").hide();
                            $(".startTiemAfter").show();
                            $(".endTiemAfter").show();
                        }
                        break;
                    case "stop":
                        $(".serviceBillb").hide();
                        $(".serviceStart").hide();
                        $(".serviceEnd").hide();
                        $(".startTiemAfter").show();
                        $(".endTiemAfter").show();
                        $(".serviceCostList").show();
                        break;
                    case "start":
                        $(".serviceBillb").hide();
                        $(".serviceStart").hide();
                        $(".endTiemBefor").hide();
                        $(".startTiemAfter").show();
                        $(".endTiemAfter").show();
                        $(".serviceEnd").show();
                        break;
                    case "enter":
                        $(".serviceBillb").hide();
                        $(".serviceStart").hide();
                        $(".serviceEnd").hide();
                        $(".startTiemAfter").show();
                        $(".endTiemAfter").show();
                        $(".serviceContent").show();
                        break;

                    default:
                        $(".serviceBillb").hide();
                        $(".serviceStart").hide();
                        $(".serviceEnd").hide();
                        $(".startTiemAfter").show();
                        $(".endTiemAfter").show();
                        $(".serviceContent").show();
                        break;
                }
            } else {
                $(".startTiemAfter").show();
                $(".endTiemAfter").show();
                $(".serviceContent").show();
                $(".serviceContent .service-image").hide();
            }

            if(result.declaration.mdg_state == null){
                $(".startTiemAfter").hide();
                $(".endTiemAfter").hide();
            }
            // 服务进度
            var html = "";
            if (result.orderVoList != null) {
                $.each(result.orderVoList, function (index, item) {
                    var dateTime = new Date(item.mo_date).format("yyyy-MM-dd hh:mm");
                    switch (item.mo_state) {
                        case "服务申请":
                            html += '<div class="servcie-content-div">';
                            html += '	<div class="service-time">';
                            html += '		<label class="fontTitle">' + dateTime.split(" ")[1] + '</label>';
                            html += '		<label class="fontYear">' + dateTime.split(" ")[0] + '</label>';
                            html += '	</div>';
                            html += '	<div class="service-contents">';
                            html += '		<label class="fontTitle">' + item.mo_state + '</label>';
                            html += '		<label>' + item.mo_state + '</label>';
                            html += '	</div>';
                            html += '	<div class="service-line"></div>';
                            html += '</div>';
                            $(".serviceTitle_xiang").eq(0).attr("class", "serviceTitle_xiang");
                            break;
                        case "服务受理":
                            html += '<div class="servcie-content-div">';
                            html += '	<div class="service-time">';
                            html += '		<label class="fontTitle">' + dateTime.split(" ")[1] + '</label>';
                            html += '		<label class="fontYear">' + dateTime.split(" ")[0] + '</label>';
                            html += '	</div>';
                            html += '	<div class="service-contents">';
                            html += '		<label class="fontTitle">' + item.mo_state + '</label>';
                            html += '		<label>受理人：' + returnValue(result.declaration.accepter) + '</label>';
                            html += '	</div>';
                            html += '	<div class="service-line"></div>';
                            html += '</div>';
                            $(".serviceTitle_xiang").eq(1).attr("class", "serviceTitle_xiang");
                            break;
                        case "服务处理":
                            html += '<div class="servcie-content-div">';
                            html += '	<div class="service-time">';
                            html += '		<label class="fontTitle">' + dateTime.split(" ")[1] + '</label>';
                            html += '		<label class="fontYear">' + dateTime.split(" ")[0] + '</label>';
                            html += '	</div>';
                            html += '	<div class="service-contents">';
                            html += '		<label class="fontTitle">' + item.mo_state + '</label>';
                            html += '		<label>接单人员：' + returnValue(result.tracks.em_name) + ' <span>' + returnValue(result.tracks.em_phone) + '</span></label>';
                            html += '	</div>';
                            html += '	<div class="service-line"></div>';
                            html += '</div>';
                            $(".serviceTitle_xiang").eq(2).attr("class", "serviceTitle_xiang");
                            break;
                        /* case "服务完成":
                             html += '<div class="servcie-content-div">';
                             html += '	<div class="service-time">';
                             html += '		<label class="fontTitle">' + dateTime.split(" ")[1] + '</label>';
                             html += '		<label class="fontYear">' + dateTime.split(" ")[0] + '</label>';
                             html += '	</div>';
                             html += '	<div class="service-contents">';
                             html += '		<label class="fontTitle">' + item.mo_state + '</label>';
                             html += '		<label>服务状态：' + returnValue(result.dispatching.mdg_state) + '</label>';
                             html += '	</div>';
                             html += '	<div class="service-line"></div>';
                             html += '</div>';
                             $(".serviceTitle_xiang").eq(3).attr("class", "serviceTitle_xiang");
                             break;*/
                        case "客服回访":
                            html += '<div class="servcie-content-div">';
                            html += '	<div class="service-time">';
                            html += '		<label class="fontTitle">' + dateTime.split(" ")[1] + '</label>';
                            html += '		<label class="fontYear">' + dateTime.split(" ")[0] + '</label>';
                            html += '	</div>';
                            html += '	<div class="service-contents">';
                            html += '		<label class="fontTitle">' + item.mo_state + '</label>';
                            html += '		<label>服务评价：<span id="simplestar" style="margin-top: 6px;"><img id="image0" src="/resources/image/T1j.png"><img id="image1" src="/resources/image/T1j.png"><img id="image2" src="/resources/image/T1j.png"><img id="image3" src="/resources/image/T1j.png"><img id="image4" src="/resources/image/T1j.png"></span></label>';
                            html += '	</div>';
                            html += '	<div class="service-line"></div>';
                            html += '</div>';
                            $(".serviceTitle_xiang").eq(4).attr("class", "serviceTitle_xiang");
                            $(".serviceContent").show();
                            break;
                    }
                });
                $(".service-content").html(html);
                if (result.userCenterUserFraction != null) {
                    var score = parseInt(result.userCenterUserFraction.uf_fraction);
                    $("#simplestar img").each(function () {
                        var index = parseInt($(this).attr("id").replace("image", ""));
                        if (index < score) {
                            if (score <= 2) {
                                $(this).attr("src", "/resources/image/T1lg.png");
                            } else {
                                $(this).attr("src", "/resources/image/T1e.png");
                            }
                        }
                    });
                }
                $(".service-line").last().remove();
            }
        }
    });
}

// 接单
function serviceBillSubmit() {
    //预计开始时间
    var openTime = $("#mtk_start_time").val();
    if (openTime == null || openTime == "") {
        alert("预计开始未填写")
        return;
    } else {
        openTime = openTime.replace("T", " ") + ":00";
    }

    //预计结束时间
    var mtk_end_time = $("#mtk_end_time").val();

    if (mtk_end_time == null || mtk_end_time == "") {
        alert("预计结束未填写")
        return;
    } else {
        mtk_end_time = mtk_end_time.replace("T", " ") + ":00";
    }

    var data = {
        em_id: $("#em_id").val(),
        mtk_state: "no",
        md_id: $("#md_id").val(),
        openTime: openTime,
        endTime: mtk_end_time
    }
    $.ajax({
        type: "POST",
        url: "/service/addTracks",
        data: data,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            console.log(result);
            if (result.code == 200) {
                alert("您已接单成功!")
                if ($(".alert-content-list ul li").length == 0 && $("#service_types").text().indexOf("维修") > -1) {
                    $(".serviceProblem").show();
                } else {
                    $(".serviceProblem").hide();
                    $(".serviceBillb").hide();
                    $(".serviceStart").show();
                    $(".serviceEnd").hide();
                    $(".startTiemBefor").hide();
                    $(".endTiemBefor").hide();
                    $(".startTiemAfter").show();
                    $(".endTiemAfter").show();
                    //预计开始
                    if (openTime != null) {
                        $(".startTiemAfter dd").text(openTime);
                    }
                    //预计结束
                    if (mtk_end_time != null) {
                        $(".endTiemAfter dd").text(mtk_end_time);
                    }
                }
                $("#service_types1").text("已接订单");
            }
        }
    });
}

// 开始服务
function startServiceBillSubmit() {
    var data = {
        em_id: $("#em_id").val(),
        mtk_state: "loading",
        md_id: $("#md_id").val()
    }
    $.ajax({
        type: "POST",
        url: "/service/addTracks",
        data: data,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            if (result.code == 200) {
                alert("接下来请去服务吧！")
                $(".serviceBillb").hide();
                $(".serviceStart").hide();
                $(".serviceEnd").show();
                $("#service_types1").text("服务进行");
            }
        }
    });
}

//服务完成
function endServiceBillSubmit() {
    if (confirm("是否结束服务!")) {
        var data = {
            em_id: $("#em_id").val(),
            mtk_state: "yes",
            realEndTime: (new Date()).format("yyyy-MM-dd hh:mm:ss"),
            md_id: $("#md_id").val()
        }
        $.ajax({
            type: "POST",
            url: "/service/addTracks",
            data: data,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {
                if (result.code == 200) {
                    $(".serviceBillb").hide();
                    $(".serviceStart").hide();
                    $(".serviceEnd").hide();
                    $(".serviceAutograph").show();
                    $("#service_types1").text("服务进行");
                    $(".serviceCostList").show();
                }
            }
        });
    }
}

// 客户手写签名
function autographSubmit() {
    OCServiceContent.serviceAutograph(md_ids);
}

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
            RegExp.$1.length == 1 ? o[k] :
                ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}

/**
 * 保存服务图片
 *
 * @param path 图片路径
 */
function addServiceImage(path) {
    $.ajax({
        type: "POST",
        url: "/service/addServiceImage",
        data: {
            md_id: $("#md_id").val(),
            image_url: path
        },
        dataType: "json",
        error: function (e) {
            alert("系统异常，请联系管理员");
        },
        success: function (result) {
            if (result.msg == "success") {
                console.log("成功");
            }
        }
    });
}

/**
 * 删除服务图片
 *
 * @param path 图片路径
 */
function deleteServiceImage(path) {
    $.ajax({
        type: "POST",
        url: "/service/deleteServiceImage",
        data: {
            image_url: path
        },
        dataType: "json",
        error: function (e) {
            alert("系统异常，请联系管理员");
        },
        success: function (result) {
            if (result.msg == "success") {
                console.log("成功");
            }
        }
    });
}

/** 现场确认 */
function serviceProblem() {
    window.location.href="/appService/serviceSceneOld?so_id="+GetQueryString("so_id")+"&em_id="+GetQueryString("em_id")+"";
}

/**
 * 保存服务图片
 *
 * @param path 图片路径
 */
function addServiceImage1(path) {
    $.ajax({
        type: "POST",
        url: "/service/addServiceImageMoney",
        data: {
            md_id: $("#md_id").val(),
            image_url: path
        },
        dataType: "json",
        error: function (e) {
            alert("系统异常，请联系管理员");
        },
        success: function (result) {
            if (result.msg == "success") {
                console.log("成功");
            }
        }
    });
}

/**
 * 删除服务图片
 *
 * @param path 图片路径
 */
function deleteServiceImage1(path) {
    $.ajax({
        type: "POST",
        url: "/service/deleteServiceImageMoney",
        data: {
            image_url: path
        },
        dataType: "json",
        error: function (e) {
            alert("系统异常，请联系管理员");
        },
        success: function (result) {
            if (result.msg == "success") {
                console.log("成功");
            }
        }
    });
}

/**
 * 服务清单提交
 */
/*function serviceCostListSubmit() {
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        window.location.href = "/appPage/serviceCostList?so_id=" + getUrlParam("so_id");
    } else if (/(Android)/i.test(navigator.userAgent)) {
        OCServiceContent.serviceCostList(getUrlParam("md_id"));
    }
}*/

//现场确认费用
function serviceMoney() {
    window.location.href="/appService/serviceMoneyOld?so_id="+GetQueryString("so_id")+"&em_id="+GetQueryString("em_id")+"";
}

/**
 * 拨打电话
 */
function callphone(tel){
    window.location.href = "tel://"+tel+"";
}

function toBaiduMap() {
    var data = {};
    var latEnds = {};
    latEnds.latitude = latEnd;
    latEnds.longitude = lngEnd;
    data.latEnd = JSON.stringify(latEnds);
    var json = JSON.stringify(data);
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        window.webkit.messageHandlers.toBaiduMap.postMessage([json]);
    } else if (/(Android)/i.test(navigator.userAgent)) {
        webview.toBaiduMap(json);
    }
}