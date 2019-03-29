
var type = "library";
//定位数组
var position ='';

/** 获取房屋图片*/
/*function initHouseImageList(id){
	$.ajax({
		type: "POST",
		url: "/houseLibrary/queryHouseImageList",
		data: {
			hi_id: id
		},
		contentType: "application/x-www-form-urlencoded; charset=utf-8",
		dataType: "json",
		success: function(result) {
			switch (result.code) {
			case 200:
				var html ="";
				if(result.data.length <= 0){
					html +='<label class="image-item-add" for="house-image">选择图片<input type="file" id="house-image" accept=".jpg,.png,.jpeg,.gif"></label>';
				} else {
					$.each(result.data, function(index, data){
						var type = '';
						var type_class;
						switch (data.hm_type) {
							case "page":
								type = "封面图片";
								type_class = 'next-bg';
								break;
							case "effect":
								type = "效果图片";
								type_class = '';
								break;
							case "solid":
								type = "户型图片";
								type_class = 'hint-bg';
								break;
							case "3d":
								type = "3D图片";
								type_class = 'error-bg';
								break;
						}
						html +='<div class="image-item">';
						html +='	<img class="image-item-img" src="'+ data.hm_path +'" data-type="'+ data.hm_type +'">';
						html +='	<span class="image-item-label '+ type_class +'" data-id="'+ data.hm_id +'">'+ type +'</span>';
						html +='	<span class="image-item-close icon-remove" title="删除" data-src="'+ data.hm_path +'" data-id="'+ data.hm_id +'"></span>';
						html +='</div>';
					});
					html +='<label class="image-item-add" for="house-image">选择图片<input type="file" id="house-image" accept="image/*"></label>';
					
				}
				$(".image-upload-box").html(html);
				break;
			}
		}
	});
}*/

/** 获取类型1 封面 To 'page'*/
function getHouseImageType1(param) {
	switch (param) {
		case "封面图片":
			param = "page";
			break;
		case "效果图片":
			param = "effect";
			break;
		case "户型图片":
			param = "solid";
			break;
		case "3D图片":
			param = "3d";
			break;
	}
	return param;
}

/** 获取类型2 'page' To 封面*/
function getHouseImageType2(param) {
	switch (param) {
		case "page":
			param = "封面图片";
			break;
		case "effect":
			param = "效果图片";
			break;
		case "solid":
			param = "户型图片";
			break;
		case "3d":
			param = "3D图片";
			break;
	}
	return param;
}


