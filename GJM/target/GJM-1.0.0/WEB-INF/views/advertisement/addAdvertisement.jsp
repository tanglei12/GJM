<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!-- 底部 css样式 -->
<link href="/resources/css/manage_index.css" rel="stylesheet" type="text/css">
<link href="/resources/css/print.css" rel="stylesheet" type="text/css">
<link href="/resources/css/ProjectManagement.css" rel="stylesheet" type="text/css">
<link href="/resources/css/perfect-scrollbar.css" rel="stylesheet" type="text/css">
<link href="/resources/css/select_xs.css" rel="stylesheet" type="text/css">
<link href="/resources/css/serve/hotSpot.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="/resources/Plug-in/kindeditor-4.1.10/themes/default/default.css" />
<link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">
<link href="/resources/common/imageUpload/css/jquery.image-upload.css" rel="stylesheet" type="text/css"> <!-- 上传样式 -->

<script src="/resources/js/jquery-1.7.2.min.js"></script>
<script src="/resources/js/product/jquery-cookie.js"></script>
<script src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
<script src="/resources/common/swipeslider-develop/dist/swipeslider.min.js"></script>
<script src="/resources/common/My97DatePicker/WdatePicker.js"></script>
<script src="/resources/js/common/common.js"></script>
<script src="/resources/js/advertisement/addAdvertisement.js"></script>
<!-- 上传插件 -->
<script src="/resources/common/imageUpload/js/jquery.image-upload.js"></script>
<!-- UE编辑器 -->
<script type="text/javascript" charset="utf-8" src="/resources/umeditor/ueditor.config.js"></script>
<script type="text/javascript" charset="utf-8" src="/resources/umeditor/ueditor.all.min.js"> </script>
<script type="text/javascript" charset="utf-8" src="/resources/umeditor/lang/zh-cn/zh-cn.js"></script>
		<section id="main-box">
			<div class="box-title">添加广告</div>
			<div id="main-box-content">
				<dl class="content-dl">
					<dt><em>*</em>广告标题</dt>
					<dd>
						<input type="text" class="from-data" required="required" id="ad_name" name="ad_name" placeholder="广告标题" value="${ad.ad_name}">
					</dd>
					<dd class="msg"></dd>
				</dl>
				<dl class="content-dl">
					<dt><em>*</em>发布渠道</dt>
					<dd>
						<select class="from-data" id="select-data" name="st_id">
							<c:if test="${not empty list}">
				    			<c:forEach items="${list}" var="list">
				    				<option value="${list.dictionary_value}">${list.dictionary_name}</option>
				    			</c:forEach>
				    		</c:if>
						</select>
					</dd>
					<dd class="msg"></dd>
				</dl>
				<dl class="content-dl">
					<dt><em>*</em>发布位置</dt>
					<dd>
						<select class="from-data" id="ad_position" name="st_id">
							<c:if test="${not empty listPosition}">
				    			<c:forEach items="${listPosition}" var="list">
				    				<option value="${list.dictionary_value}">${list.dictionary_name}</option>
				    			</c:forEach>
				    		</c:if>
						</select>
					</dd>
					<dd class="msg"></dd>
				</dl>
				<dl class="content-dl">
					<dt><em>*</em>广告图片</dt>
					<dd class="ad_image" style="width:600px; ">
						<div id='image-upload-box' style='width:600px;'></div>
						<label class="hint" style="color: #F39C12 !important;">提示：仅能上传一张图片类型的文件</label>
					</dd>
					<dd class="msg"></dd>
				</dl>
				<dl class="content-dl">
					<dt><em>*</em>图片提示框</dt>
					<dd class="ad_image" style="width:600px; ">
						<input type="text" class="from-data"  id="ad_title" value="" placeholder="图片提示框">
					</dd>
					<dd class="msg"></dd>
				</dl>
				<dl class="content-dl">
					<dt><em>*</em>图片介绍</dt>
					<dd class="ad_image" style="width:600px; ">
						<input type="text" class="from-data"  id="ad_alert" value="" placeholder="图片介绍">
					</dd>
					<dd class="msg"></dd>
				</dl>
				<dl class="content-dl">
					<dt><em>*</em>链接</dt>
					<dd class="ad_image" style="width: 700px">
						<input type="text" id="ad_url" class="from-data" style="width: 600px;">
					</dd>
					<dd class="msg"></dd>
				</dl>
				<%--<dl class="content-dl">
					<dt><em>*</em>广告介绍</dt>
					<dd style="width: auto;">
						<textarea name="ad_content" class="content" id="ad_content" style="width:960px;height:400px;"></textarea>
					</dd>
					<dd class="msg"></dd>
				</dl>--%>
				<%--<dl class="content-dl">
					<dt><em>*</em>广告说明</dt>
					<dd style="width: 610px;"> 
						<textarea style="width: 300px;height: 100px;" id="ad_text" maxlength="30" onkeyup="javascript:setShowLength(this, 30, 'cost_tpl_title_length');"></textarea>
						<span class="red" id="cost_tpl_title_length" style="color: red;">还可以输入30字</span> 	
					</dd>
					<dd class="msg"></dd>
				</dl>--%>
				<dl class="content-dl">
					<dt><em>*</em>是否参加活动</dt>
					<dd style="width: auto;">
						<label><input type="radio" name="activity" value="2">不参加</label>
						<label><input type="radio" name="activity" value="1" style="margin-left: 20px;">参加</label>
					</dd>
					<dd>
						<select class="from-data" id="select-activity" name="st_id" style="min-width: 180px;width: 200px;margin-left: 20px;display: none;">
							<c:if test="${not empty activityList}">
								<c:forEach items="${activityList}" var="list">
									<option value="${list.am_code}">${list.am_title}</option>
								</c:forEach>
							</c:if>
						</select>
					</dd>
					<dd class="msg"></dd>
				</dl>
				<dl class="content-dl">
					<dt><em>*</em>是否启用</dt>
					<dd style="width: auto;">
						<label><input type="radio" name="state" value="2">不启用</label>
						<label><input type="radio" name="state" value="1" style="margin-left: 20px;">启用</label>
					</dd>
					<dd class="msg"></dd>
				</dl>
				<dl class="content-dl">
					<dt><em>*</em>发布人：</dt>
					<dd style="width: auto;">
						<i id="user" style="font-style:normal">${user.em_name}</i>
					</dd>
					<dd class="msg"></dd>
				</dl>
				<dl class="content-dl">
					<dt></dt>
					<dd>
						<button class="from-data save_button" type="submit">发布</button>
					</dd>
					<dd class="msg"></dd>
				</dl>
	       </div>
		</section>
<script type="text/javascript">
$(function(){
	 var ueditor = UE.getEditor('ad_content',{imagePathFormat: "/resources/upload/image/{yyyy}{mm}{dd}/{time}{rand:6}",autoHeightEnabled: false});
	//图片插件
    $("#image-upload-box").imageUpload({
            width:110,
            height:110,
            uploadType: 'advertisement',
	});
    $('.content-dl').find('[name=activity]').click(function () {
        $(this).each(function () {
            if ($('input:radio[name="activity"]:checked').val() == 1) {
                $('#select-activity').show();
            } else {
                $('#select-activity').hide();
			}
        })
	})


})
</script>	