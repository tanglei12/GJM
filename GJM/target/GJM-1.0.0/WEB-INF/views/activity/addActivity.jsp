<%@ page pageEncoding="utf-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>添加活动</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"><!-- 旧字体样式 -->
    <link href="/resources/common/imageUpload/css/jquery.image-upload.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/common/common.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/common/page.list.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/datepicker/jquery-ui.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/service/serviceList.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/activity/activityList.css" rel="stylesheet" type="text/css">

    <script src="/resources/js/jquery-1.7.2.min.js"></script>
    <script src="/resources/common/My97DatePicker/WdatePicker.js"></script>
    <script src="/resources/common/imageUpload/js/jquery.image-upload.js"></script>
    <script src="/resources/common/datepicker/js/jquery-ui-datepicker.js"></script>
    <script src="/resources/Plug-in/jquery.rotate/jquery.rotate.min.js"></script>
    <script src="/resources/js/product/jquery-cookie.js"></script>
    <script src="/resources/js/common/common.js"></script>
    <script src="/resources/js/common/common.hint.js"></script>
    <script src="/resources/js/common/common.state.js"></script>
    <script src="/resources/js/common/common.page.js"></script>
    <script src="/resources/js/activity/addActivity.js"></script>
</head>
<body>
    <div>
       <div class='activity-title' style="padding-left: 30px;" id="activityTitle">添加活动</div>
       <input type='hidden' name='am_id' value='${am_id}'>
       <input type='hidden' name='am_code' value=''>
       <dl class='input-layout-dl'>
           <dt>活动主题：</dt>
           <dd><input type='text' name='am_title' value=''></dd>
       </dl>
       <dl class='input-layout-dl'>
           <dt>活动描述：</dt>
           <dd><textarea type='text' name='am_description'></textarea></dd>
       </dl>
       <dl class='input-layout-dl'>
           <dt>活动渠道：</dt>
           <dd><select type='text' name='am_channel'><option value='1100'>ERP</option><option value='1101'>ERP_APP</option><option value='1102'>ERP_PC</option><option value='1200'>USER</option><option value='1201'>USER_APP</option><option value='1202'>USER_PC</option></select></dd>
       </dl>
       <dl class='input-layout-dl'>
           <dt>活动类型：</dt>
           <dd><select type='text' name='am_type'><option value='1001'>新人活动</option><option value='1002'>抽奖活动</option><option value='1003'>充值活动</option></select></dd>
       </dl>
       <dl class='input-layout-dl'>
           <dt>活动状态：</dt>
           <dd><select type='text' name='am_state'><option value='1'>开启</option><option value='2'>关闭</option></select></dd>
       </dl>
       <dl class='input-layout-dl'>
           <dt>活动地址：</dt>
           <dd><input type='text' name='am_url' value=''></dd>
       </dl>
       <dl class='input-layout-dl'>
           <dt>开始时间：</dt>
           <dd><input class='' type='text' name='am_start_time' value='' placeholder='活动开始时间' onfocus='WdatePicker({dateFmt:"yyyy-MM-dd HH:mm:ss"})'/></dd>
       </dl>
       <dl class='input-layout-dl'>
           <dt>结束时间：</dt>
           <dd><input class='' type='text' name='am_end_time' value='' placeholder='活动结束时间' onfocus='WdatePicker({dateFmt:"yyyy-MM-dd HH:mm:ss"})'/></dd>
       </dl>
       <dl class='input-layout-dl'>
           <dt>发布时间：</dt>
           <dd><input class='' type='text' name='am_release_time' value='' placeholder='活动发布时间' onfocus='WdatePicker({dateFmt:"yyyy-MM-dd HH:mm:ss"})'/></dd>
       </dl>
       <dl class='input-layout-dl'>
            <dt>奖品图片：</dt>
            <div>
                <dd>
                    <div class="step-record-head">
                        <button class='next-bg-bd-w img-btn' style='margin: 0 0px;' name='imageBtn' data-value='1'>封面图</button>
                        <button class='next-bg-bd-w img-btn' style='margin: 0 10px;' name='imageBtn' data-value='2'>缩略图</button>
                    </div>
                </dd>
                <dd style='margin-top: 15px;'>
                    <div id='coverImageUpload' ></div>
                    <div id='thumbnailUpload' style='display: none;'></div>
                </dd>
            </div>
       </dl>
       <dl class='input-layout-dl'>
           <dt></dt>
           <dd><button class='next-bg' name='submit'>提交</button></dd>
       </dl>
    </div>
</body>
</html>