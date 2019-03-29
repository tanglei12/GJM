var imageUpload = null;
$(function(){
	
	// 加载部门
	$.ajax({
		type : "POST",
		url : "/service/queryAllCompany",
		data : {},
		dataType : "json",
		contentType: "application/x-www-form-urlencoded; charset=utf-8",
		success : function(data){
			var ucc_id = $("#ucc_id").val();
			if(data.companyList != null && data.companyList != undefined){
				var html = "";
				$.each(data.companyList, function(index, data){
					html += '<option value="' + data.ucc_id + '" ' + (ucc_id == data.ucc_id ? 'selected' : "") + '>' + data.ucc_name + '</option>';
				});
				$("[name=ucc_id]").html(html);
			} else {
				
			}
		},
		error : function(e) {
		}
	});

    // 加载图片上传插件
    imageUpload = $("#image-upload-box").imageUpload({
        uploadUrl: "/service/uploadServiceImage",
        deleteUrl : "/service/deleteServiceImageFile"
	});
    $(".image-item-add").on("click", function(event){
        var imgData = $(".image-item img");
        if(imgData.length >= 1){
            alert("展示图片只能上传一张");
        }
    });

    $(".image-item-add").before('<div class="image-item"><img class="image-item-img" src="'+ $("#sm_image").val() +'" data-href="'+ $("#sm_image").attr("data-href") +'" data-preview-src="" data-preview-group="1"><span class="image-item-close" title="删除照片">X</span><div class="image-item-wait" style="display: none;"></div></div>');
    $(".image-item-close").on("click", function(){
        imageUpload.deleteImage(this);
    });
});

function deleteImage(obj) {
    var submit = confirm("确定要删除该图片吗？");
    if (submit == true) {
        // 获取图片路径
        var path = $(obj).parent().find(".image-item-img").attr("src");
        $(obj).parent().find(".image-item-wait").show();
        // 1.延迟执行界面删除
        var timeout = setTimeout(function(){
            // 更新图片数量
            if(options.limitUpload){
                var nowSize = parseInt($("#" + _id + " .nowSize").text());
                $("#" + _id + " .nowSize").text(nowSize - 1);
            }
            // 移除元素
            $(obj).parent().remove();
            clearTimeout(timeout);
        },options.delay);
        // 2.后台异步删除图片
        if (options.isAjaxUpload) {
            $.ajax({
                type : "POST",
                url : options.deleteUrl,
                data : {
                    image_url : path,
                    uploadType : options.uploadType
                },
                dataType : "json",
                error : function(e) {
                    alert("系统错误，请重试");
                },
                success : function(result) {
                    if (result.msg == "success") {
                        // 删除成功
                        options.builds.onDelete(path);
                    } else {
                        alert(result.msg);
                    }
                }
            });
        }
    }
};

//筛选获取数据
function ajaxFile() {
    var sm_id=$("#sm_id").val();
    var oInput = document.getElementById('file5');
    if(oInput.value == '') {
    	$.jBox.info('未选择任何文件！', '管家婆管理系统');
    	return false;
    }
    $.ajaxFileUpload({
        url: '/service/upload5', 
        type: 'post',
        secureuri: false, //一般设置为false
        fileElementId: 'file5', // 上传文件的id、name属性名
        dataType: 'text', //返回值类型，一般设置为json、application/json
        elementIds: sm_id, //传递参数到服务器
        success: function(data){
        	$("#sm_image").val(data);
        	$("#imgg").attr("data-href",data);
        },
        error: function(data, status, e){ 
            alert(e);
        }
    });
    //return false;
}


function deleteImage(num){
	var submit = function (v, h, f) {
	    if (v == 'ok'){
	    	var df = $("#"+num).attr("src");
	    	del(df);
	    	var sum = $("#ContractObject_Annex4").val();
	    	str=sum.replace("="+df,"");
	    	$("#ContractObject_Annex4").val(str);
	    	console.info($("#ContractObject_Annex4").val());
	    	$("#"+num).remove();
	    }
	    else if (v == 'cancel'){}
	    return true; //close
	};
	$.jBox.confirm("确定删除吗？", "管家婆管理系统",submit);
}

//筛选获取数据
function del(df){
	$.ajax({
		type: "POST",
	    url: "/contractObject/deleteImage",
	    data: "df="+df,
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    async:false,
	    success: function(result) {
	    	if(result != "1"){
    			if(result == 'success'){
    				return true;
    			}else{
    				return false;
    			}
	    	}}
	    });
}

function addBewrite(){
	var project = $("input[name='pl_name']").val(); 
	if(project != ""){
		var pl_names = $("input[name='pl_names']").val();
		$("input[name='pl_names']").val(pl_names+"="+project)
		$(".bewrite").append("<tr><td style='position: relative;height: 30px;line-height: 30px;text-indent: 10px;'>"+project+"<i title='删除' onclick='$(this).parent().parent().remove();' style='position: absolute;top: 5px;right: 4px;height: 20px;width: 20px;display: block; background-color: #069;background: url(/resources/image/deltr.png) no-repeat center;'></i></td></tr>");
		$("input[name='pl_name']").val("");
	}else{
		swal("请填写问题描述");
	}
}

function deleteBewrite(pl_id){
	$.ajax({
		type: "POST",
	    url: "/serve/deleteProblem",
	    data: "pl_id="+pl_id,
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    async:false,
	    success: function(result) {
	    	if(result != "1"){

	    	}}
	    });
}

function saveDate() {
	var data = {};
	var serviceMessage = {};
	var sm_name = $("[name=sm_name]").val();
	var service_image = $(".image-item-img").attr("data-href");
	if(isEmpty(sm_name)){
        swal("请填写服务名称");
        return;
	}
    serviceMessage.sm_name = sm_name;
	var sm_content = $("[name=sm_content]").val();
    if(isEmpty(sm_content)){
        swal("请填写服务描述");
        return;
    }
    serviceMessage.sm_content = sm_content;
	var ucc_id = $("[name=ucc_id]").val();
    if(isEmpty(ucc_id)){
        swal("请选择归属部门");
        return;
    }
    serviceMessage.ucc_id = ucc_id;
	var sm_image = $("[name=sm_image]").val();
    serviceMessage.sm_image = sm_image;
	var pl_names = $("[name=pl_names]").val();
    serviceMessage.pl_names = pl_names;
	var sm_id = $("[name=sm_id]").val();
    serviceMessage.sm_id = sm_id;
    serviceMessage.sm_image = service_image;
    data.serviceMessage = JSON.stringify(serviceMessage);

    $.ajax({
        type: "POST",
        url: "/service/updataMessages",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(result) {
        	if(result.code == 200){
                swal("更新成功");
			} else {
                swal("更新失败");
			}
        }
    });

}