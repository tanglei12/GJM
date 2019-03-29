$(function(){
	
});

function ajaxFile() {
    
	var md_id = $("input[name='md_id']").val();
    $.ajaxFileUpload({
        url: '/myServe/upload?md_id='+md_id, 
        type: 'post',
        secureuri: false, //一般设置为false
        fileElementId: 'file5', // 上传文件的id、name属性名
        dataType: 'text', //返回值类型，一般设置为json、application/json
        md_id: md_id, //传递参数到服务器
        success: function(data){  
        	var num = Math.random()*700 + 800;
        	num = parseInt(num, 10);
        	$("#yhks").append("<img width='200px' style='margin-left:20px;' id='"+num+"' onclick='deleteImage("+num+")' height='200px;' src="+data+">");
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
	    	$("#"+num).remove();
	    }
	    else if (v == 'cancel'){}
	    return true; //close
	};
	$.jBox.confirm("确定删除吗？", "管家婆管理系统",submit);
}

//筛选获取数据
function del(df){
	var md_id = $("input[name='md_id']").val();
	$.ajax({
		type: "POST",
	    url: "/myServe/deleteImage",
	    data: "df="+df+"&md_id="+md_id,
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