var tType = GetQueryString("type");
var tId = GetQueryString("t_id");
$(function () {
    if (tType == "add") {
        $(".center_box").html(loadHtml());
        // 加载图片上传插件
        imageUpload = $("#image-upload-box").imageUpload({
            uploadUrl: "/manageExamine/uploadTopicImage",
            deleteUrl: "/manageExamine/deleteTopicImageFile"
        });
        imageUpload1 = $("#image-upload-box1").imageUpload({
            uploadUrl: "/manageExamine/uploadTopicImage",
            deleteUrl: "/manageExamine/deleteTopicImageFile"
        });

        // 加载编辑器
        ueditor = UE.getEditor('t_content', {
            imageUrlPrefix:"http://192.168.0.46",
            imagePathFormat: "/resources/upload/image/{yyyy}{mm}{dd}/{time}{rand:6}",
            autoHeightEnabled: false
        });
    }
    if (tType == "update" || tType == "check") {
        $.ajax({
            type: "get",
            url: "/manageExamine/queryTopicdetail",
            data: {
                t_id: tId,
            },
            dataType: "json",
            success: function (result) {
                if (result.code != 200) return $.hint.tip(result.msg, "error");
                if (tType == "update") {
                    $(".center_box").html(loadHtml(result.topic));
                    // 加载图片上传插件
                    imageUpload = $("#image-upload-box").imageUpload({
                        uploadUrl: "/manageExamine/uploadTopicImage",
                        deleteUrl: "/manageExamine/deleteTopicImageFile"
                    });
                    imageUpload1 = $("#image-upload-box1").imageUpload({
                        uploadUrl: "/manageExamine/uploadTopicImage",
                        deleteUrl: "/manageExamine/deleteTopicImageFile"
                    });

                    // 加载编辑器
                    ueditor = UE.getEditor('t_content', {
                        imageUrlPrefix:"http://192.168.0.46",
                        imagePathFormat: "/resources/upload/image/{yyyy}{mm}{dd}/{time}{rand:6}",
                        autoHeightEnabled: false
                    });
                    returnInput("t_isDelete",result.topic.t_isDelete);
                    var t_cover = "";
                    var t_coverSmall = "";

                    if (!isEmpty(result.topic.t_cover)) {
                        t_cover += "<div class='image-item' style='width: 110px; height: 110px;'><img class='image-item-img' src='" + returnValue(result.topic.t_coverOSS) + "' data-url='" + returnValue(result.topic.t_cover) + "'></div>";
                    }
                    if (!isEmpty(result.topic.t_coverSmall)) {
                        t_coverSmall += "<div class='image-item' style='width: 110px; height: 110px;'><img class='image-item-img' src='" + returnValue(result.topic.t_coverSmallOSS) + "' data-url='" + returnValue(result.topic.t_coverSmall) + "'></div>";
                    }
                    if (!isEmpty(t_cover)) {
                        $("#image-upload-box .image-item-add").before(t_cover);
                    }
                    if (!isEmpty(t_coverSmall)) {
                        $("#image-upload-box1 .image-item-add").before(t_coverSmall);
                    }
                }
                if (tType == "check") {
                    $(".center_box").html(loadHtmlCheck(result.topic));
                    // 加载编辑器
                    ueditor = UE.getEditor('t_content', {
                        imagePathFormat: "/resources/upload/image/{yyyy}{mm}{dd}/{time}{rand:6}",
                        autoHeightEnabled: false
                    });
                }
            }
        })
    }

    initCheckbox();
})

//添加和修改公共html
function loadHtml(data) {
    var _data = data || "";
    var html = "";
    html += "<div id='main-box-content'>";
    html += "    <dl class='content-dl'>";
    html += "        <div class='first-title'><span>" + (isEmpty(returnValue(_data.t_id)) ? '添加圈子' : '修改圈子') + "<!--这里是标题--></span></div>";
    html += "    </dl>";
    html += "    <dl class='content-dl'>";
    html += "         <dt>标题</dt>";
    html += "          <dd>";
    html += "             <input type='text' class='from-data' id='t_title' name='t_title' placeholder='' value='" + returnValue(_data.t_title) + "' style='width: 468px'>";
    html += "          </dd>";
    html += "    </dl>";
    html += "    <dl class='content-dl'>";
    html += "         <dt>封面</dt>";
    html += "          <dd>";
    html += "             <div id='image-upload-box' style='width: 100%;'></div>";
    html += "          </dd>";
    html += "         <dt style='margin-left: 30px'>小图</dt>";
    html += "          <dd>";
    html += "             <div id='image-upload-box1' style='width: 100%;'></div>";
    html += "          </dd>";
    html += "    </dl>";

   /* html += "    <dl class='content-dl'>";
    html += "         <dt>有效期</dt>";
    html += "          <dd>";
    html += "             <input type='text' class='from-data' id='t_endDate' name='t_endDate' placeholder='' value='" + returnValue() + "''>";
    html += "          </dd>";
    html += "    </dl>";*/

    html += "    <dl class='content-dl'>";
    html += "        <dt>內容</dt>";
    html += "        <dd style='padding-top: 5px'>";
    html += "              <textarea id='t_content' name='t_content' id='t_content' style='width:60%;height:400px;margin-top:20px;'>" + (isEmpty(returnValue(_data.t_content)) ? '' : _data.t_content) + "</textarea>";
    html += "        </dd>";
    html += "    </dl>";
    html += "    <dl class='content-dl'>";
    html += "        <dt>是否启用</dt>";
    html += "        <dd style='padding-top: 5px'>";
    html += "                <label class='common-checkbox common-checkbox-checked' style='margin-left: 0px;'> <input type='radio' name='t_isDelete' value='1' onclick='' checked='checked'>启用</label>";
    html += "                <label class='common-checkbox' style='margin-left: 20px;'> <input type='radio' name='t_isDelete' value='0' onclick='' >禁用</label>";
    html += "        </dd>";
    html += "        <dd>";
    html += "            <div class='from-data-state'></div>";
    html += "        </dd>";
    html += "    </dl>";
    html += "    <dl class='content-dl'>";
    html += "        <dt></dt>";
    html += "        <dd>";
    if (isEmpty(returnValue(_data.t_id))) {
        html += "            <input type='button' id='submit' class='from-data' value='保存' onclick='submitCreateTopic()'>";
    } else {
        html += "            <input type='button' id='submit' class='from-data' value='修改' onclick='submitUpdateTopic(" + _data.t_id + ")'>";
    }
    html += "        </dd>";
    html += "    </dl>";
    html += "</div>";
    return html;
}

//查看html
function loadHtmlCheck(data) {
    var _data = data || "";
    var html = "";
    html += "<div id='main-box-content'>";
    html += "    <dl class='content-dl'>";
    html += "        <div class='first-title'><span>圈子信息<!--这里是标题--></span></div>";
    html += "    </dl>";
    html += "    <dl class='content-dl'>";
    html += "         <dt>标题</dt>";
    html += "          <dd>";
    html += "             " + returnValue(_data.t_title) + "";
    html += "          </dd>";
    html += "    </dl>";

    html += "    <dl class='content-dl'>";
    html += "         <dt>封面</dt>";
    html += "          <dd>";
    html += "             <img style='width: 110px;height: 110px' src='"+returnValue(_data.t_coverOSS)+"' />";
    html += "          </dd>";
    html += "         <dt style='margin-left: 30px'>小图</dt>";
    html += "          <dd>";
    html += "             <img style='width: 110px;height: 110px' src='"+returnValue(_data.t_coverSmallOSS)+"' />";
    html += "          </dd>";
    html += "    </dl>";
    html += "    <dl class='content-dl'>";
    html += "        <dt>內容</dt>";
    html += "        <dd style='padding-top: 5px'>";
    html += "              <textarea id='t_content' name='t_content' id='t_content' style='width:60%;height:400px;margin-top:20px;'>" + (isEmpty(returnValue(_data.t_content)) ? '' : _data.t_content) + "</textarea>";
    html += "        </dd>";
    html += "    </dl>";
    html += "</div>";
    return html;
}

/**
 * 添加圈子
 */
function submitCreateTopic() {
    var data = {};
    var topic = {};

    //标题
    var t_title = $("#t_title").val();

    if(isEmpty(t_title)){
        $("#t_title").msg("请填写标题");
        return;
    }
    topic.t_title = t_title;

    var ue = UE.getEditor('t_content');
    //获取编译内容
    var t_content = ue.getContent();
    topic.t_content = t_content;
    var t_cover = "";
    var t_coverSmall = "";
    $("#image-upload-box img").each(function () {
        t_cover = $(this).attr("data-href");
        topic.t_cover = $(this).attr("data-href");
    });

    $("#image-upload-box1 img").each(function () {
        t_coverSmall = $(this).attr("data-href");
        topic.t_coverSmall = $(this).attr("data-href");
    });

    var t_isDelete = $("input[name=t_isDelete]:checked").val();

    data.topic = JSON.stringify(topic);

    $.ajax({
        type: "POST",
        url: "/manageExamine/addCreateTopic",
        //data:JSON.stringify(data),
        data: {
            t_title: t_title,
            t_content: t_content,
            t_cover: t_cover,
            t_coverSmall: t_coverSmall,
            t_isDelete: t_isDelete,
            em_id: $.cookie("em_id"),
            em_name: $.cookie("em_name"),
        },
        dataType: "json",
        success: function (result) {
            if (result.code != 200) return $.hint.tip(result.msg, "error");
           /* $.hint.tip("保存成功", "success");
            $.popupBoxClose();
            $.table.loadData();*/
            $.jBox.prompt(result.msg, "提示", "保存成功", {
                closed: function () {
                    parent.window.self.location.reload()
                }
            });
        }
    })

}

/**
 * 修改圈子
 */
function submitUpdateTopic(t_id) {
    var data = {};
    var topic = {};

    //标题
    var t_title = $("#t_title").val();
    if(isEmpty(t_title)){
        $("#t_title").msg("请填写标题");
        return;
    }
    topic.t_title = t_title;

    var ue = UE.getEditor('t_content');
    //获取编译内容
    var t_content = ue.getContent();
    topic.t_content = t_content;
    var t_cover = "";
    var t_coverSmall = "";
    $("#image-upload-box img").each(function () {
        t_cover = $(this).attr("data-href");
        topic.t_cover = $(this).attr("data-href");
    });

    $("#image-upload-box1 img").each(function () {
        t_coverSmall = $(this).attr("data-href");
        topic.t_coverSmall = $(this).attr("data-href");
    });

    var t_isDelete = $("input[name=t_isDelete]:checked").val();
    data.topic = JSON.stringify(topic);

    $.ajax({
        type: "POST",
        url: "/manageExamine/updateTopic",
        //data:JSON.stringify(data),
        data: {
            t_id: t_id,
            t_title: t_title,
            t_content: t_content,
            t_cover: t_cover,
            t_coverSmall: t_coverSmall,
            t_isDelete: t_isDelete
        },
        dataType: "json",
        success: function (result) {
            if (result.code != 200) return $.hint.tip(result.msg, "error");
           /* $.hint.tip("修改成功", "success");
            $.popupBoxClose();
            $.table.loadData();*/
            $.jBox.prompt(result.msg, "提示", "修改成功", {
                closed: function () {
                    parent.window.self.location.reload()
                }
            });
        }
    })

}


//url参数获取
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

//input匹配
function returnInput(name, val) {
    $(".common-checkbox").removeClass("common-checkbox-checked");
    $("input[name=" + name + "]").each(function () {
        if ($(this).val() == val) {
            $(this).attr("checked", "checked");
            $(this).parent().addClass("common-checkbox-checked");
        }
    });
}

