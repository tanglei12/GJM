$(function(){
	
	// 加载部门
	$.ajax({
		type : "POST",
		url : "/service/queryAllCompany",
		data : {},
		dataType : "json",
		contentType: "application/x-www-form-urlencoded; charset=utf-8",
		success : function(data){
			if(data.companyList != null && data.companyList != undefined){
				var html = "";
				$.each(data.companyList, function(index, data){
					html += '<option value="' + data.ucc_id + '">' + data.ucc_name + '</option>';
				});
				$("[name=ucc_id]").html(html);
			} else {
				
			}
		},
		error : function(e) {
		}
	});
});

//筛选获取数据
function ajaxFile() {
    var elementIds=$("#ContractObject_No").val(); //flag为id、name属性名
    var oInput = document.getElementById('file5');
    if(oInput.value == '') {
    	swal('未选择任何文件');
    	return false;
    }
    $.ajaxFileUpload({
        url: '/service/upload5', 
        type: 'post',
        secureuri: false, //一般设置为false
        fileElementId: 'file5', // 上传文件的id、name属性名
        dataType: 'text', //返回值类型，一般设置为json、application/json
        elementIds: elementIds, //传递参数到服务器
        success: function(data){  
        	$("#sm_image").val(data);
        	$("#imgg").attr("src",data);
//        	$("#dellabel").css("display","block");
        },
        error: function(data, status, e){ 
            swal(e);
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

function deleteBewrite(){
	alert(this);
}

function saveDate() {
    var data = {};
    var serviceMessage = {};
    var sm_name = $("[name=sm_name]").val();
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
    data.serviceMessage = JSON.stringify(serviceMessage);

    $.ajax({
        type: "POST",
        url: "/service/addServeMessage",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(result) {
            if(result.code == 200){
                swal("添加成功");
            } else {
                swal("添加失败");
			}
        }
    });

}