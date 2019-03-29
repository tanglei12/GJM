var arr={};
var ad_channel='';  //发布渠道
var ad_position='';  //发布位置
//添加
$(document).on('click','.save_button',function(){
	arr.ad_name=$('#ad_name').val();   //标题
	ad_channel=$('#select-data option:selected').val();  
	arr.ad_channel=ad_channel;  //渠道
	ad_position=$('#ad_position option:selected').val();
	arr.ad_position=ad_position;  //发布位置
	// var ue = UE.getEditor('ad_content');
	//获取编译内容	
	// var content = ue.getContent();
	// content=content;
	// arr.ad_content=content;
	var img='';
	$('#image-upload-box').find('img').each(function(){
		img+=$(this).attr('data-url')+'_';
	});
	img=img.substring(0,img.length-1);
	arr.ad_image=img;
	arr.ad_alert=$('#ad_alert').val();  //提示
	arr.ad_title=$('#ad_title').val();  //图片介绍
	// arr.ad_text=$('#ad_text').val();  //广告介绍
	arr.ad_state=$('input:radio[name="state"]:checked').val(); // 状态
	arr.ad_url=$('#ad_url').val();  //链接
	//活动code
    if ($('input:radio[name="activity"]:checked').val() == 1) {
        arr.am_code=$('#select-activity').val();
    }
	if ($('#ad_name').val() =='' || ad_channel=='' || $('#ad_position').val() == '' || $('#ad_alert').val() == '' || $('#ad_title').val() == '' || img=='' || $('input:radio[name="state"]:checked').val() =='') {
		$.jBox.tip("填写不完整");
		return false;
	}
	if (img.indexOf('_') > 0) {
		$.jBox.tip("只能上传一张图片");
		return false;
	}
	$.ajax({
		url : "/advertisement/saveAddAdvertisement?result="+encodeURI(JSON.stringify(arr)),
		type : "POST",
		data : {},
		dataType : "json",
		success:function(data){
			if (data.code == 200) {
				window.parent.href_mo("/advertisement/advert",'广告管理','服务管理');
				parent.location.reload();
			}
			if (data.code == 110) {
				$.jBox.tip(data.msg);
			}
		},
		error:function(){
			
		}
	})
});

//修改
$(document).on('click','.update_button',function(){
	arr.ad_id=$('#ad_id').val();    
	arr.ad_name=$('#ad_name').val();   //标题
	if ($('#select-data option:selected').val() != '') {
		ad_channel=$('#select-data option:selected').val();
	}else{
		ad_channel=$("#sl_option").val();
	}
	arr.ad_channel=ad_channel;  //渠道
	ad_position=$('#ad_position option:selected').val();
	arr.ad_position=ad_position;  //发布位置
	// var ue = UE.getEditor('ad_content');
	//获取编译内容	
	// var content = ue.getContent();
	// arr.ad_content=content;  //介绍
	var img='';
	$('#image-upload-box').find('img').each(function(){
		img+=$(this).attr('data-url')+'_';
	})
	img=img.substring(0,img.length-1);
	arr.ad_image=img;
	
	arr.ad_alert=$('#ad_alert').val();  //提示
	arr.ad_title=$('#ad_title').val();  //图片介绍
	// arr.ad_text=$('#ad_text').val();   //广告说明
	arr.ad_state=$('input:radio[name="state"]:checked').val();
    arr.ad_url=$('#ad_url').val();  //链接
    //活动code
    if ($('input:radio[name="activity"]:checked').val() == 1) {
        arr.am_code=$('#select-activity').val();
    }
	if ($('#ad_name').val() =='' ||  ad_channel=='' || $('#ad_position').val() == '' || $('#ad_alert').val() == '' || $('#ad_title').val() == '' || img=='' || $('input:radio[name="state"]:checked').val() =='') {
		$.jBox.tip("填写不完整");
		return false;
	}
	if (img.indexOf('_') > 0) {
		$.jBox.tip("只能上传一张图片");
		return false;
	}
	$.ajax({
		url : "/advertisement/upAdvertisement?result="+encodeURI(JSON.stringify(arr)),
		type : "POST",
		data : {},
		dataType : "json",
		success:function(data){
			if (data.code == 200) {
				window.parent.href_mo("/advertisement/advert",'广告管理','服务管理');
				parent.location.reload();
			}
			if (data.code == 110) {
				$.jBox.tip(data.msg);
			}
		},
		error:function(){
			
		}
	})
});
//广告说明字数
function setShowLength(obj, maxlength, id) { 
	var rem = maxlength - obj.value.length; 
	var wid = id; 
	if (rem < 0){ 
		rem = 0; 
	} 
	$('#cost_tpl_title_length').html("还可以输入" + rem + "字数");
}