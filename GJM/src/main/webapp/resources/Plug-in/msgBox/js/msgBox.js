;
(function($) {
	$.msgBox = function(options) {
		var _defaults = {
			title : "消息提示：",
			size : 5
		};
		var _opts = $.extend({}, _defaults, options);
		var _this = this;

		// 创建msgBox
		_this.createBox = function() {
			$("#msgBox").remove();
			$('body').append("<div id='msgBox' class='msgBox'></div>");
		};
		// 加入消息队列
		_this.push = function(message) {
			var html = '';
			html += '<div class="message">';
			html += '	<div class="title">';
			html += '		<span class="title-name">' + _opts.title + '</span>';
			html += '		<span class="title-close" onclick="closeMessage(this)">X</span>';
			html += '	</div>';
			html += '	<div class="content" onclick="waitCloseMessage(this)">' + message + '</div>';
			html += '</div>';
			// 创建容器
			if ($("#msgBox").length == 0) {
				_this.createBox();
			}
			var msgs = $("#msgBox").children();
			var size = _opts.size;
			console.log(msgs.length);
			if (msgs.length >= size) {
				var hideNums = msgs.length - size;
				$(msgs).each(function(index) {
					if (index <= hideNums) {
						$(this).fadeOut(function() {
							$(this).remove();
						});
					}
				});
			}
			$("#msgBox").append(html).children(":last-child").slideDown();
		};
		// do
		var _param = arguments[0];
		if (typeof (_param) == "string") {
			_this.push(_param);
			return;
		}
		return _this;
	};
})(jQuery);

/**
 * 关闭消息
 * 
 * @param {Object}
 *            obj
 */
function closeMessage(obj) {
	$(obj).parent().parent().fadeOut(function() {
		$(this).remove();
	});
}
/**
 * 延迟关闭
 * 
 * @param obj
 */
function waitCloseMessage(obj){
	var timeout = setTimeout(function(){
		$(obj).parent().fadeOut(function() {
			$(this).remove();
			clearTimeout(timeout);
		});
	},1000);
}