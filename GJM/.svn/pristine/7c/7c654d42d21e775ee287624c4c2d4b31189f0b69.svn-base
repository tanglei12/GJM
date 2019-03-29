$(function(){
	init_data();
});


/** 初始化数据*/
function init_data(){
	// 【初始化选项数据】
	$.ajax({
		type : "POST",
		url : "/contractObject/queryPriceApplyRecord",
		data : {
			pa_id : $("#paId").val(),
		},
		dataType : "json",
	}).done(function(result){
		var data = result.priceApplyRecord;
		var html = "";
		html += '<div class="record-option-more" style="display: block;">';
		html += '	<div class="custom-box-main" style="">';
		html += '		<div class="reprice-box" style="width:40%;flex: 3;position: relative;padding: 10px;">';
		html += '			<div class="reprice-box-item" style="line-height:26px;">';
		html += '				<div class="reprice-box-item-subitem item-subitem-title" style="width:65px;">小区房号</div>';
		html += '				<div class="reprice-box-item-subitem"><label class="" style="">'+ returnValue(result.priceApplyRecord.house_address) +'</label></div>';
		html += '				<div class="reprice-box-item-subitem" style="padding-left: 10px;"></div>';
		html += '			</div>';
		html += '			<div class="reprice-box-item" style="line-height:26px;">';
		html += '				<div class="reprice-box-item-subitem item-subitem-title" style="width:65px;">存房价格</div>';
		html += '				<div class="reprice-box-item-subitem"><label class="money-zl money-font20" style="">'+ returnFloat(result.hi_keepMoney) +'</label></div>';
		html += '				<div class="reprice-box-item-subitem" style="padding-left: 10px;">元/月</div>';
		html += '			</div>';
		html += '			<div class="reprice-box-item" style="line-height:26px;">';
		html += '				<div class="reprice-box-item-subitem item-subitem-title" style="width:65px;">当前定价</div>';
		html += '				<div class="reprice-box-item-subitem"><label class="money-zl money-font20" style="">'+ returnFloat(result.hi_price) +'</label></div>';
		html += '				<div class="reprice-box-item-subitem" style="padding-left: 10px;">元/月</div>';
		html += '			</div>';
		html += '			<div class="reprice-box-item" style="line-height:26px;" id="applyPrice">';
		html += '				<div class="reprice-box-item-subitem item-subitem-title" style="width:65px;">申请定价</div>';
		html += '				<div class="reprice-box-item-subitem"><label class="money-zl money-font20" style="">'+ returnFloat(data.apply_price) +'</label></div>';
		html += '				<div class="reprice-box-item-subitem" style="padding-left: 10px;">元/月</div>';
		html += '			</div>';
		html += '			<div class="reprice-box-item" style="line-height:26px;" id="">';
		html += '				<div class="reprice-box-item-subitem item-subitem-title" style="width:65px;">申请人</div>';
		html += '				<div class="reprice-box-item-subitem"><label class="" style="">'+ returnValue(data.apply_em_name) +'</label></div>';
		html += '				<div class="reprice-box-item-subitem" style="padding-left: 10px;"></div>';
		html += '			</div>';
		html += '			<div class="reprice-box-item" style="line-height:26px;" id="">';
		html += '				<div class="reprice-box-item-subitem item-subitem-title" style="width:65px;">申请时间</div>';
		html += '				<div class="reprice-box-item-subitem"><label class="" style="">'+ returnTime(data.apply_time) +'</label></div>';
		html += '				<div class="reprice-box-item-subitem" style="padding-left: 10px;"></div>';
		html += '			</div>';
		html += '		</div>';
		html += '	</div>';
		html += '				<div class="record-option-more-main">';
		html += '	    			<span class="spanImgBox" id="">';
		if(result.attachments != null && undefined != result.attachments){
			$.each(result.attachments, function(index, data){
		html += '						<img class="showboxImg" src="' + returnValue(data.ca_path_real) + '" >';
			});
		}
		html += '	    			</span>';
		html += '				    <hr style="height: 10px;">';
		html += '				    <textarea name="record-add-content" style="width:350px;" placeholder="日志内容" required readonly>'+data.apply_content+'</textarea><br/><br/>';
		html += '				</div>';
		html += '				<div id="refusedReason" class="record-option-more-main" style="">';
		html += '				    <hr style="height: 10px;">';
		html += '				    <textarea name="record-add-content" id="reason" style="width:350px;" placeholder="备注" required></textarea><br/><br/>';
		html += '				</div>';
		html += '				<div class="record-option-more-foot">';
		html += '					<button onclick="reviewPrice(1)">通过</button>';
		html += '				  	<button onclick="reviewPrice(0)" style="background: #e74c3c;">驳回</button>';
		html += '				</div>';
		html += '</div>';
		$("#content").html(html);
		
		bindEvent();
	});
}

function bindEvent(){
	/* 绑定图片查看*/
	$(document).on("click", ".showboxImg", function() {
		var _this = $(this);
		var imgBox = "";
		$(".showboxImg").each(function(index, data) {
			var _allSrc = $(this).attr("src");
			var _thisSrc = _this.attr("src");
			imgBox += '<img class="' + (_thisSrc == _allSrc ? "img-focus" : "") + '" src="' + $(this).attr("src") + '"/>';
		});
		$(".show-box").remove();
		$("body").append('<div class="show-box">' + '<div class="show-box-head">' + '<button class="box-head-close icon-remove" title="关闭"></button>' + '<button class="img-up icon-chevron-left" title="上一张"></button>' + '<button class="img-next icon-chevron-right" title="下一张"></button>' + '<button class="rotate-right icon-repeat" title="右旋转"></button>' + '<button class="rotate-left icon-undo" title="左旋转"></button>' + '<button class="box-list-btn">图片列表</button>' + '</div>' + '<div class="show-box-list">' + imgBox + '</div>' + '<div class="show-box-main">' + '<div class="main-left"></div>' + '<div class="main-list"><img src="' + $(this).attr("src") + '" /></div>' + '<div class="main-right"></div>' + '</div>' + '</div>');
		$(".box-head-close").on("click", function() {
			$(".show-box").remove();
		});
		$(".box-list-btn").on("click", function() {
			var _list = $(".show-box-list");
			if (_list.is(":hidden")) {
				$(this).css({ background : "rgba(0,0,0,0.5)" });
				$(".show-box-list").show();
			} else {
				$(this).css({ background : "rgba(0,0,0,0.2)" });
				$(".show-box-list").hide();
			}
		});
		// 旋转-左
		var rotateVal = 0;
		$(".rotate-left").rotate({
			bind : {
				click : function() {
					rotateVal -= 90;
					$(".show-box-main>.main-list img").rotate({
						animateTo : rotateVal,
					});
				}
			}
		});
		// 旋转-右
		$(".rotate-right").rotate({
			bind : {
				click : function() {
					rotateVal += 90;
					$(".show-box-main>.main-list img").rotate({
						animateTo : rotateVal,
					});
				}
			}
		});
		// 列表图片绑定点击事件
		$(".show-box-list>img").on("click", function() {
			$(".show-box-list>img").removeClass("img-focus");
			$(this).addClass("img-focus");
			$(".show-box-main .main-list").find("img").attr("src", $(this).attr("src"));
		});
		// 绑定点击隐藏图片列表
		$(".show-box-main .main-list").on("click", function() {
			$(".show-box-list").hide();
		});
		// 图片绑定缩放
		$(".show-box-main .main-list>img").uberZoom({
			width : $(".main-list").width(),
			height : $(".main-list").height(),
		});
		// 上一张图片
		$(".img-up").on("click", function() {
			var _next = $("img.img-focus").prev();
			if (_next.length <= 0) {
				$("img.img-focus").parent().find("img:last").click();
			} else {
				_next.click();
			}
		});
		// 下一张图片
		$(".img-next").on("click", function() {
			var _next = $("img.img-focus").next();
			if (_next.length <= 0) {
				$("img.img-focus").parent().find("img:first").click();
			} else {
				_next.click();
			}
		});
	});
};

function reviewPrice(num){
	if(num == 0 && $("#reason").val() == ""){
		$.jBox.tip("请填写拒绝原因", "error");
		$("#reason").focus();
		return 
	}
	// 【初始化选项数据】
	$.ajax({
		type : "POST",
		url : "/contractObject/reviewPriceApplyRecord",
		data : {
			pa_id : $("#paId").val(),
			review_result : num,
			refused_reason : $("#reason").val()
		},
		dataType : "json",
	}).done(function(result){
		if(result.code != undefined && result.code != null && result.code != 200){
			
			$.jBox.tip(result.msg, "error");
			return;
		}
		$.jBox.prompt("审核完成", "提示", "success",{
			closed : function(){
				window.location.href = "/contractObject/jumpPriceApplyList";
			}
		});
	});
	
};
