
var information = null;
$(function(){
	data();
});

//筛选获取数据
function data(){
	
	$("#content").table({
		titleBg:"#34495E",
		titleColor:"#FFF",
		search: true,
		dataTime: [
		           {
		        	   name: "存房时间",
		        	   string: "hi_date"
		           },
		           {
		        	   name: "到期时间",
		        	   string: "contract_expiryDate"
		           }
		],
		title: [
			    {
					name: "编号",
					string: "hi_code",
					parameter: ""
				},
				{
					name: "小区房号",
					string: "house_address",
					parameter: "",
					leftDiv: "<a href='javascript:selectImg();' class='fa fa-image' style='margin-right: 6px; color:#3498DB;'></a>",
					rightDiv: "",
					href: "/houseLibrary/jumpHouseInfo&hi_code"
				},
				{
					name: "房屋状态",
					string: "he_state",
					parameter: {
						"free":"未租",
						"rental":"已租",
						"expire":"已解约"
					}
				},
				{
					name: "招租状态",
					string: "hi_forRentState",
					parameter: {
						1001 : "新存招租",
						1002 : "转租招租",
						1003 : "退租招租",
						1004 : "到期招租",
						1005 : "强收招租",
						1006 : "换房招租",
						1020 : "停止招租",
						1021 : "已解约",
						1022 : "未接房",
						2000 : "暂停招租"
					}
				},
				{
					name: "存房价格",
					string: "hi_money",
					parameter: ""
				},
				{
					name: "出房价格",
					string: "hi_keepMoney",
					parameter: ""
				},
				{
					name: "房屋区域",
					string: "hi_area",
					parameter: ""
				},
				{
					name: "房屋品牌",
					string: "hb_name",
					parameter: ""
				},
				{
					name: "户型",
					string: "houseTSW",
					parameter: ""
				},
				{
					name: "房东",
					string: "he_peopleName",
					parameter: "",
					string1: "he_phone",
					parameter1: ""
				},
				{
					name: "房屋管家",
					string: "em_name",
					parameter: "",
					string1: "em_phone",
					parameter1: ""
				}
			],
		url: "/house/basic/information",
		data: {},
		success: function(result){
			$(result).find("tbody tr").each(function(){
				var state = $(this).find("td").eq(3).text();
				if(state == "已租"){
					$(this).find("td").eq(3).attr("style","color:#E74C3C");
				}else if(state == "未租"){
					$(this).find("td").eq(3).attr("style","color:#27AE60");
				}
				var forRent = $(this).find("td").eq(4).text();
				$(this).find("td").eq(4).html(forRentState(forRent));
			});
		}
	});
}

//毫秒转换为日期格式
var format = function(time, format){
    var t = new Date(time);
    var tf = function(i){return (i < 10 ? '0' : '') + i};
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
        switch(a){
            case 'yyyy':
                return tf(t.getFullYear());
                break;
            case 'MM':
                return tf(t.getMonth() + 1);
                break;
            case 'mm':
                return tf(t.getMinutes());
                break;
            case 'dd':
                return tf(t.getDate());
                break;
            case 'HH':
                return tf(t.getHours());
                break;
            case 'ss':
                return tf(t.getSeconds());
                break;
        }
    });
}

//得到房屋扩展信息
function houseExtended(){
	 var id = fuc();
	$.ajax({
	    type: "POST",
	    url: "/house/houseExtended",
	    data: "he_id="+id,
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	$(".modal-bodys").html("");
	    	$(".modal-headers h4").html("");
	    	$(".modal-headers h4").html("房屋扩展信息");
	    	var tts = format(result.houseHouseExtended.he_buyTime, 'yyyy-MM-dd HH:mm:ss');
	    	var tt = format(result.houseHouseExtended.he_time, 'yyyy-MM-dd HH:mm:ss');
	    	$(".modal-bodys").append("<ul id='housingExpansion'><li><span>产权所有</span>"+result.houseHouseExtended.he_peopleName+"</li><li><span>房东电话</span>"+result.houseHouseExtended.he_phone+"</li><li><span>房屋状态</span>"+result.houseHouseExtended.he_state+"</li><li><span>产权编号</span>"+result.houseHouseExtended.he_number+"</li><li><span>产权证号</span>"+result.houseHouseExtended.he_cardNumber+"</li><li><span>房屋性质</span>"+result.houseHouseExtended.he_nature+"</li><li><span>购买价格</span>"+result.houseHouseExtended.he_money+"</li><li><span>购买时间</span>"+tts+"</li><li><span>房东地址</span>"+result.houseHouseExtended.he_address+"</li><li><span>上传时间</span>"+tt+"</li></ul>");
	    	 $(function () { $('#myModal').modal({
	    	      keyboard: true
	    	   })});
	    }
	    });
}







//跳转修改界面
//多选按钮判断
function ck_eds(id){
  window.location.href = '/house/basic/jumpUpdataInfo?id='+id;
}

//跳转发布图片界面
//多选按钮判断
function uploads(){
      var cbl_s = document.getElementsByName("chickes");  
      var checkCount = 0;
      var id = 0;
      for (var i = 0; i < cbl_s.length; i++) {  
              if (cbl_s[i].checked) {  
                  checkCount++;
                  id = cbl_s[i].id;
              }  
      }  
      if (checkCount == 0) {  
 		 $.jBox.info('请选择一个！', '管家婆管理系统');
      } else if (checkCount > 1) {  
     	 $.jBox.info('只能选择一个！', '管家婆管理系统');
      } else {  
  	 window.location.href = '/image/upload?id='+id;
   } 
}


//改变页面显示的房屋状态
function updataStart(house){
	if(house.he_state == 'free'){
		house.he_state="<span class='free'>未租</span>"
	}
	if(house.he_state == 'rental'){
		house.he_state="<span class='rental'>已租</span>"
	}
	if(house.he_state == 'expire'){
		house.he_state="<span class='expire'>托管到期</span>"
	}
	if(house.he_state == 'clean'){
		house.he_state="<span class='clean'>需要打扫</span>"
	}
	if(house.he_state == 'edit'){
		house.he_state="<span class='edit'>未发布</span>"
	}
}

function selectByCondition(){
	$("#Num").text("1");
	data();
}

function setPage(){
	var nums = $("#nums").text();
	var page = $("input[name='spage']").val();
	if(page>nums){
		page = nums;
	}
	$.cookie('the_cookie', page , { expires: 7 ,path: '/'});
	$("#Num").text("1");
	data();
}

/** 查看图片 */
function selectImg(code){
	$.ajax({
  	    type: "POST",
		url: "/houseLibrary/queryHouseImageList",
		data: {
			hi_code : code
		},
  	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
  	    dataType: "json",
  	    success: function(result) {
  	    	switch (result.code) {
				case 200:
					var html ="";
					html +='<div id="image-model">';
					html +='	<div class="image-model-title drag">房屋图片<a href="javascript:$(\'#image-model\').remove();" class="icon-remove"></a></div>';
					html +='	<div class="image-model-content">';
					html +='		<figure id="house_slider" class="swipeslider">';
					html +='  			<ul class="sw-slides">';
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
						html +='    <li class="sw-slide">';
						html +='      <img src="'+ data.hm_path +'" alt="'+ type +'" title="'+ type +'">';
						html +='    </li>';
					});
					html +='  			</ul>';
					html +='		</figure>';
					html +='	</div>';
					html +='</div>';
					$("body").append(html);
					$("#house_slider").swipeslider();
					modelMove();
					break;
				default :
					break;
			}
  	    }
  	});
}

function hrefClick(ids){
	window.parent.href_mo($(ids).attr("data-type"),"修改房屋","线上房源");
}