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
<!--    <form class="form-inline" target="iframepage" method="POST" id="submit"> -->
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
				    				<c:if test="${ad.ad_channel eq list.dictionary_value }">
					    				<option value="${list.dictionary_value}">${list.dictionary_name}</option>
				    				</c:if>
				    			</c:forEach>
							</c:if>
							<c:if test="${not empty list}">
				    			<c:forEach items="${list}" var="list">
				    				<c:if test="${ad.ad_channel ne list.dictionary_value }">
					    				<option value="${list.dictionary_value}">${list.dictionary_name}</option>
				    				</c:if>
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
				    				<c:if test="${ad.ad_position eq list.dictionary_value }">
					    				<option value="${list.dictionary_value}">${list.dictionary_name}</option>
				    				</c:if>
				    			</c:forEach>
				    		</c:if>
				    		<c:if test="${not empty listPosition}">
				    			<c:forEach items="${listPosition}" var="list">
				    				<c:if test="${ad.ad_position ne list.dictionary_value }">
					    				<option value="${list.dictionary_value}">${list.dictionary_name}</option>
				    				</c:if>
				    			</c:forEach>
				    		</c:if>
						</select>
<%-- 						<input type="text" class="from-data" required="required" id="ad_position" name="ad_position" placeholder="发布位置" value="${ad.ad_position}"> --%>
					</dd>
					<dd class="msg"></dd>
				</dl>
				<dl class="content-dl">
					<dt><em>*</em>广告图片</dt>
					<input type="hidden" id='ad_image' value="${ad.ad_image}">
					<dd class="ad_image">
						<div id='image-upload-box' style='width:600px;'></div>
					</dd>
					<dd class="msg"></dd>
				</dl>
				<dl class="content-dl">
					<dt><em>*</em>图片提示框</dt>
					<dd class="ad_image" style="width:600px; ">
						<input type="text" class="from-data"  id="ad_title" value="${ad.ad_title}">
					</dd>
					<dd class="msg"></dd>
				</dl>
				<dl class="content-dl">
					<dt><em>*</em>图片介绍</dt>
					<dd class="ad_image" style="width:600px; ">
						<input type="text" class="from-data"  id="ad_alert" value="${ad.ad_alert }">
					</dd>
					<dd class="msg"></dd>
				</dl>
				<dl class="content-dl">
					<dt><em>*</em>链接</dt>
					<dd class="ad_image" style="width: 700px">
						<input type="text" class="from-data" id="ad_url" style="width: 600px;" value="">
					</dd>
					<dd class="msg"></dd>
				</dl>
				<%--<dl class="content-dl">--%>
					<%--<dt><em>*</em>广告介绍</dt>--%>
					<%--<dd style="width: auto;">--%>
						<%--<div class='content' style="display: none;">${ad.ad_content}</div>--%>
						<%--<textarea name="ad_content" class="ad_content" id="ad_content" style="width:960px;height:400px;" value=""></textarea>--%>
					<%--</dd>--%>
					<%--<dd class="msg"></dd>--%>
				<%--</dl>--%>
				<%--<dl class="content-dl">
					<dt><em>*</em>广告说明</dt>
					<dd style="width: 610px;">
						<input type="hidden" class="ad_text" value="${ad.ad_text }">
						<textarea style="width: 300px;height: 100px;" id="ad_text" maxlength="30" onkeyup="javascript:setShowLength(this, 30, 'cost_tpl_title_length');"></textarea>
						<span class="red" id="cost_tpl_title_length" style="color: red;">还可以输入30字</span> 
					</dd>
					<dd class="msg"></dd>
				</dl>--%>
				<dl class="content-dl">
					<dt><em>*</em>是否参加活动</dt>
					<dd style="width: auto;" id="am_code">
						<input type="hidden" class='am_code' value="${ad.am_code}">
						<label><input type="radio" name="activity" value="2">不参加</label>
						<label><input type="radio" name="activity" value="1" style="margin-left: 20px;">参加</label>
					</dd>
					<dd>
						<select class="from-data" id="select-activity" name="st_id" style="min-width: 180px;width: 200px;margin-left: 20px;display: none;">
							<c:if test="${not empty activityList}">
								<c:forEach items="${activityList}" var="list">
									<c:if test="${ad.am_code eq list.am_code }">
										<option value="${list.am_code}">${list.am_title}</option>
									</c:if>
								</c:forEach>
							</c:if>
							<c:if test="${not empty activityList}">
								<c:forEach items="${activityList}" var="list">
									<c:if test="${ad.am_code ne list.am_code }">
										<option value="${list.am_code}">${list.am_title}</option>
									</c:if>
								</c:forEach>
							</c:if>
						</select>
					</dd>
					<dd class="msg"></dd>
				</dl>
				<dl class="content-dl">
					<dt><em>*</em>是否启用</dt>
					<dd id="ad_stae" style="width: auto;">
						<input type="hidden" class='ad_state' value="${ad.ad_state}">
						<label><input type="radio" name="state" value="1">启用</label>
						<label><input type="radio" name="state" style="margin-left: 20px;" value="2">不启用</label>
					</dd>
					<dd class="msg"></dd>
				</dl>
				<dl class="content-dl">
					<dt><em>*</em>发布人：</dt>
					<dd style="width: auto;">
						<i id="user" style="font-style:normal">${ad.em_name}</i>
					</dd>
					<dd class="msg"></dd>
				</dl>
				<dl class="content-dl">
					<dt></dt>
					<dd>
						<button class="from-data update_button" type="submit">修改</button>
					</dd>
					<dd class="msg"></dd>
				</dl>
				<input type="hidden" id="ad_id" value="${ad.ad_id }">
				<input type="hidden" id="url" value="${ad.ad_url}">
	       </div>
		</section>
<!-- 	</form> -->
<script type="text/javascript">
$(function(){
	 var ueditor = UE.getEditor('ad_content',{imagePathFormat: "/resources/upload/image/{yyyy}{mm}{dd}/{time}{rand:6}",autoHeightEnabled: false});
	//图片插件
    $("#image-upload-box").imageUpload({
        width:110,
        height:110,
        uploadType: 'advertisement',
    });
	//图片
	var img=$('#ad_image').val();
	var image=img.split('com/')[1].split("?")[0];
	var div=$('<div  class="image-item"><img class="image-item-img" src="'+img+'" data-url="'+image+'" data-preview-src="" data-preview-group="1"><span class="image-item-close close"  title="删除照片">X</span><div class="image-item-wait" style="display: none;"></div></div>')
	$('#image-upload-box').prepend(div);
	
	//广告介绍
//	ueditor.addListener("ready", function () {
//        // editor准备好之后才可以使用
//        ueditor.setContent($('.content').html());
//});
	
	//广告说明
//	$("#ad_text").text($('.ad_text').val());
	//启用
	var state=$('.ad_state').val();
	$('#ad_stae').find('label').each(function(){
		if ($(this).find('input').val() == state) {
			$(this).find('input').attr('checked','checked');
		}
	})
//	var size=30-($('.ad_text').val().length);
//	$('#cost_tpl_title_length').html("还可以输入" + size + "字数");

	//活动
    var state=$('.am_code').val();
    $('#am_code').find('label').each(function(){
        if (returnValue(state) != '' && $(this).find('input').val() == 1) {
            $(this).find('input').attr('checked','checked');
            $('#select-activity').show();
        } else if (returnValue(state) == '' && $(this).find('input').val() == 2) {
            $(this).find('input').attr('checked','checked');
		}
    })
    $('.content-dl').find('[name=activity]').click(function () {
        $(this).each(function () {
            if ($('input:radio[name="activity"]:checked').val() == 1) {
                $('#select-activity').show();
            } else {
                $('#select-activity').hide();
            }
        })
    })
	//链接
	$('#ad_url').val($("#url").val().split("?")[0]);

})

//删除图片
$(document).on("click", '.close', function() {
	$(this).each(function(){
		var submit = confirm("确定要删除该图片吗？");
		if (submit == true) {
			// 获取图片路径
			var path = $(this).parent().find(".image-item-img").attr("src");
			$(this).parent().find(".image-item-wait").show();
			$(this).parent().remove("div");
		}
	})
});
</script>	