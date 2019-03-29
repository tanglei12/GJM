var eindex = -1; //键盘上下事件

var myspecial=new Array();
var myContent = new Array();

$(function(){
	//window.location.href="#id=dasjd";
	$("body").append("<div id='text-font' style='display: none;'></div>");
	data();
});

/**
 * 获取数据
 */
function data(){
	$.ajax({
	    type: "POST",
	    url: "/customer/messageModelList",
	    data: [],
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	$.each(result.messageModel, function(index, data) {
	    		var text = data.mm_text;
	    		$(".selectName dl").each(function(i){
	    			var repla = new RegExp("#"+$(this).find("dd").attr("data-type"), "g");
	    			var repla1 = '<button contenteditable="false" class="mention" data-type="'+ $(this).find("dd").attr("data-type") +'">#'+ $(this).find("dd").text() +'</button>';
	    			text = text.replace(repla,repla1);
	    		});
	    		var html = '<div class="content-mo" id="mo_'+ data.mm_id +'">'+
				'<div class="content-mo-title"><span class="titleName">'+ data.mm_name +'</span><i class="fa fa-minus-square" onclick="deleteDiv(this)"></i><a href="javascript:;" onclick="addMoDiv(this,'+ data.mm_id +')">修改</a></div>'+
				'<div class="content-mo-content">'+
					'<div class="content-mo-text">'+
						text +
					'</div>'+
					'<div class="content-mo-date">'+
						returnDate(data.mm_date) +
					'</div>'+
					'<div class="content-mo-name" data-id='+ data.em_id +'>'+
						data.em_name +
					'</div>'+
				'</div>'+
				'</div>';
	    		$(".content-text").append(html);
	    	});
	    }
	});
}

/**
 * 提交
 */
function submit(){
	var text = $("#textarea").text();
	$(".selectName dl").each(function(i){
		var repla = new RegExp("#"+$(this).find("dd").text(), "g");
		var repla1 = "#"+$(this).find("dd").attr("data-type");
		text = text.replace(repla,repla1);
	});
	$.ajax({
	    type: "POST",
	    url: "/customer/addMessageModel",
	    data: {
	    	mm_id: $("#mm_id").val(),
	    	mm_name: $("#moName").val(),
	    	mm_text: text
	    },
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	if(result.message="success"){
	    		if(result.type == "insert"){
	    			var html = '<div class="content-mo" id="mo_'+ result.mm_id +'">'+
					'<div class="content-mo-title"><span class="titleName">'+ $("#moName").val() +'</span><i class="fa fa-minus-square" onclick="deleteDiv(this)"></i><a href="javascript:;" onclick="addMoDiv(this,'+ result.mm_id +')">修改</a></div>'+
					'<div class="content-mo-content">'+
						'<div class="content-mo-text">'+
							$("#textarea").html()+
						'</div>'+
						'<div class="content-mo-date">'+
							result.date+
						'</div>'+
						'<div class="content-mo-name">'+
							result.em_name+
						'</div>'+
					'</div>'+
					'</div>';
	    			$(".content-text").append(html);
	    		}else{
	    			$("#mo_"+ result.mm_id +"").find(".titleName").text($("#moName").val());
	    			$("#mo_"+ result.mm_id +"").find(".content-mo-text").html($("#textarea").html());
	    			$("#mo_"+ result.mm_id +"").find(".content-mo-date").text(result.date);
	    			$("#mo_"+ result.mm_id +"").find(".content-mo-name").text(result.em_name);
	    		}

				$("#moName").val("");
				$("#mm_id").val("");
				$("#textarea").html("");
				$(".content-edit").hide();
	    	}else{
	    		alert("添加失败");
	    	}
	    }
	});
	
}

/**
 * 删除模板
 */
function deleteDiv(ids){
	$(ids).parent().parent().remove();
}

/**
 * 添加模板
 */
function addMoDiv(ids,mm_id){
	if(mm_id != null){
		$("#mm_id").val(mm_id);
		$("#moName").val($(ids).parent().parent().find(".content-mo-title").text().replace("修改",""));
		$("#textarea").html($(ids).parent().parent().find(".content-mo-text").html());
		$(".content-edit").show();
	}else{
		if($(".content-edit").is(":hidden")){
			$(".content-edit").show();
		}else{
			$(".content-edit").hide();
		}
	}
}

/**
 * 特殊参数添加
 */
function specialContent(ids,event){
	var special = -1;
	 // 获取选定对象
    var selection = window.getSelection();
    // 设置最后光标对象
    lastEditRange = selection.getRangeAt(0);
	if(lastEditRange.endContainer.data == null){
		$(".selectName").hide();
		return;
	}
	if(event.keyCode != 16){
		if(lastEditRange.endContainer.data.substring(lastEditRange.endOffset-1,lastEditRange.endOffset) == "#"){
			myspecial.push(lastEditRange.endOffset-1);
		}
	}
	$input = $(ids).find("#textarea");
	for (var i = 0; i < myspecial.length; i++) {
		if(myspecial[i] < lastEditRange.endOffset){
			special = myspecial[i];
		}
	}
	if(special > -1){
		if(lastEditRange.endContainer.data.substring(lastEditRange.endOffset-1,lastEditRange.endOffset) == "#"){
			$(".selectName").show();
			$(".selectName dl").css("background-color","");
			
			// 上、下、回车选择
			var $item = $('.selectName dl');
			if (event.keyCode == 38) {// 上键
				eindex--;
				if (eindex < 0) {
					eindex = 0;
				}
				
				//$(ids).text("").focus().text(text);
				$(".selectName dl").css("background-color","");
				$(".selectName dl").eq(eindex).css("background-color","#f3f3f3");
			} else if (event.keyCode == 40) {// 下键
				eindex++;
				if (eindex >= $item.length) {
					eindex = $item.length - 1;
				}
				//$(ids).text("").focus().text(text);
				$(".selectName dl").css("background-color","");
				$(".selectName dl").eq(eindex).css("background-color","#f3f3f3");
			}else if(event.keyCode == 13){ // 回车
				if(eindex >= 0){
					document.execCommand('delete');
					$(".selectName dl").css("background-color","");
	                pasteHtmlAtCaret('<button contenteditable="false" class="mention" data-type="'+ $(".selectName dl").eq(eindex).find("dd").attr("data-type") +'">#'+ $(".selectName dl").eq(eindex).find("dd").text() +'</button>'+"&nbsp;");
					$(".selectName").hide();
					eindex = -1;
					return false;
				}
			}else{
				eindex = -1;
			}
			
			$input.keydown(function(event){
				if (event.keyCode == 38 && !$(".selectName").is(":hidden")) {// 上键
					return false;
				}else if (event.keyCode == 40 && !$(".selectName").is(":hidden")) {// 下键
					return false;
				}else if(event.keyCode == 13 && !$(".selectName").is(":hidden")){
					return false;
				}
			});
		}else{
			$(".selectName").hide();
		}
	}else{
		$(".selectName").hide();
	}
}

/**
 * 插入特殊字符光标并且移动到后面
 * @param html
 */
function pasteHtmlAtCaret(html) {
    var sel, range;
    if (window.getSelection) {
        // IE9 and non-IE
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();

            // Range.createContextualFragment() would be useful here but is
            // non-standard and not supported in all browsers (IE9, for one)
            var el = document.createElement("div");
            el.innerHTML = html;
            var frag = document.createDocumentFragment(), node, lastNode;
            while ( (node = el.firstChild) ) {
                lastNode = frag.appendChild(node);
            }
            range.insertNode(frag,0);
            
            // Preserve the selection
            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                range.setEndBefore(lastNode);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    } else if (document.selection && document.selection.type != "Control") {
        // IE < 9
        document.selection.createRange().pasteHTML(html);
    }
}

/**
 * 获取url参数
 * 
 * @param name
 * @returns
 */
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
