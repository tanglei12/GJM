
$(function () {

    // 加载图片插件
    $("#coverImageUpload").imageUpload({
        width: 110,
        height: 110,
        uploadType: 'advertisement'
    });

    // 加载图片插件
    $("#thumbnailUpload").imageUpload({
        width: 110,
        height: 110,
        uploadType: 'advertisement'
    });

    var am_id = returnValue($("[name=am_id]").val());
    if(!isEmpty(am_id)){
        $("#activityTitle").text("编辑活动");
        $.ajax({
            type: "POST",
            url: "/activity/queryActivityInfo",
            data:{
                am_id : returnNumber(am_id)
            },
            dataType: "json",
            success: function (result) {
                if(result.code != 200) {
                    $.hint.tip("数据加载异常", "error");
                    return;
                }
                var activityManageVo = result.data.activityManageVo || "";
                $("[name=am_code]").val(returnValue(activityManageVo.am_code));
                $("[name=am_title]").val(returnValue(activityManageVo.am_title));
                $("[name=am_description]").val(returnValue(activityManageVo.am_description));
                $("[name=am_channel]").val(returnValue(activityManageVo.am_channel));
                $("[name=am_type]").val(returnValue(activityManageVo.am_type));
                $("[name=am_state]").val(returnValue(activityManageVo.am_state));
                $("[name=am_url]").val(returnValue(activityManageVo.am_url));
                $("[name=am_start_time]").val(returnTime(activityManageVo.am_start_time));
                $("[name=am_end_time]").val(returnTime(activityManageVo.am_end_time));
                $("[name=am_release_time]").val(returnTime(activityManageVo.am_release_time));

                var coverImage = "";
                var thumbnail = "";
                $(result.data.activityImageVos).each(function(index, item){
                    if(returnNumber(item.ai_type) == 1){
                        coverImage += "<div class='image-item' style='width: 110px; height: 110px;'><img class='image-item-img' src='" + returnValue(item.ai_image_url) + "' data-url='" + returnValue(item.ai_path) + "'></div>";
                    } else if(returnNumber(item.ai_type) == 2){
                        thumbnail += "<div class='image-item' style='width: 110px; height: 110px;'><img class='image-item-img' src='" + returnValue(item.ai_image_url) + "' data-url='" + returnValue(item.ai_path) + "'></div>";
                    }
                });
                if(!isEmpty(coverImage)){
                    $("#coverImageUpload .image-item-add").before(coverImage);
                }
                if(!isEmpty(thumbnail)){
                    $("#thumbnailUpload .image-item-add").before(thumbnail);
                }
            }
        });
    }

    $("button[name=imageBtn]").on("click", function () {
        if($(this).hasClass("state-check")){
            $(this).removeClass("state-check");
        } else {
            $(this).addClass("state-check").siblings().removeClass("state-check");
        }
        if($(this).attr("data-value") == "1"){
            $("#coverImageUpload").show();
            $("#thumbnailUpload").hide();
        } else if($(this).attr("data-value") == "2"){
            $("#thumbnailUpload").show();
            $("#coverImageUpload").hide();
        }
    });

    $("[name=submit]").on("click", function () {
        var data = {};
        var activity = {};
        var activityImage = [];
        activity.am_id = $("input[name=am_id]").val();
        activity.am_code = $("input[name=am_code]").val();

        var am_title = $("input[name=am_title]").val();
        if(isEmpty(am_title)){
            $("input[name=am_title]").msg("请输入活动主题");
            return;
        }
        activity.am_title = am_title;

        var am_description = $("textarea[name=am_description]").val();
        // if(isEmpty(am_description)){
        //     $.hint.tip("请输入活动描述", "error");
        //     return;
        // }
        activity.am_description = am_description;

        var am_url = $("input[name=am_url]").val();
        // if(isEmpty(am_url)){
        //     $.hint.tip("请输入活动主页地址", "error");
        //     return;
        // }
        activity.am_url = am_url;

        var am_start_time = $("input[name=am_start_time]").val();
        if(isEmpty(am_start_time)){
            $("input[name=am_start_time]").msg("请输入活动开始时间");
            return;
        }
        activity.am_start_time = am_start_time;

        var am_end_time = $("input[name=am_end_time]").val();
        if(isEmpty(am_end_time)){
            $("input[name=am_end_time]").msg("请输入活动结束时间");
            return;
        }
        activity.am_end_time = am_end_time;

        var am_release_time = $("input[name=am_release_time]").val();
        if(isEmpty(am_release_time)){
            $("input[name=am_end_time]").msg("请输入活动发布时间");
            return;
        }
        activity.am_release_time = am_release_time;

        activity.am_channel = returnNumber($("[name=am_channel]").val());
        activity.am_state = returnNumber($("[name=am_state]").val());
        activity.am_type = returnNumber($("[name=am_type]").val());

        data.activity = JSON.stringify(activity);

        if($("#coverImageUpload img").length <= 0){
            $.hint.tip("请上传封面图", "error");
            return;
        }

        $("#coverImageUpload img").each(function () {
            var coverimage = {};
            coverimage.ai_type = 1;
            coverimage.ai_path = $(this).attr("data-url");
            activityImage.push(coverimage);
        });

        if($("#thumbnailUpload img").length <= 0){
            $.hint.tip("请上传缩略图", "error");
            return;
        }

        $("#thumbnailUpload img").each(function () {
            var thumbnail = {};
            thumbnail.ai_type = 2;
            thumbnail.ai_path = $(this).attr("data-url");
            activityImage.push(thumbnail);
        });

        data.activityImage = JSON.stringify(activityImage);

        $.ajax({
            type: "POST",
            url: "/activity/saveActivity",
            data:JSON.stringify(data),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result.code != 200) return $.hint.tip(result.msg, "error");
                $.hint.tip("活动信息保存成功", "success");
                window.location.href = "/activity/activityManagePageList";
            }
        });
    });
});

