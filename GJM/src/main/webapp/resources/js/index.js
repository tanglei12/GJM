// JavaScript Document

$(function(){
	
	/**
	*图片轮播切换
	*/
	$("#slider").responsiveSlides({
        pager: false,
        nav: true,
        speed: 0,
		timeout: 4000, //图片切换时间
        namespace: "callbacks",
		after: function(){
			$("#slider li").each(function(i) {
                if($(this).attr("class") == "callbacks1_on"){
					$("#div_image").css("background-color",$(this).find("img").css("background-color"));
				}
            });
		}
      });
	 //左右图片显示
	$("#div_image").mouseenter(function(){
		 $(this).find(".callbacks_nav").show();
	});
	 //左右图片隐藏
	$("#div_image").mouseleave(function(){
		$(this).find(".callbacks_nav").hide();
	});
	
	$("#menus").mouseenter(function(){
		$(this).find("#address").addClass("tc_menu hover");
		$(this).find(".hide_div").attr("aria-hidden","false");
		$("#menu_1").show();
	});
	$("#menus").mouseleave(function(){
		$(this).find("#address").removeClass("hover");
		$(this).find(".hide_div").attr("aria-hidden","true");
		$("#menu_1").hide();
	});
	
	//获取底部导航的长度付给width
	$("#bottom .bottom_title li").each(function(i) {
      alert($(this).width());  
    });
	
	/**
	* 分类层显示隐藏
	*/
	$(".title_class_page ul").mouseenter(function(){
		$(this).css("border-left","3px solid #E74C3C");
		$(this).find(".title_class_content").attr("aria-hidden","false");
		$(this).find(".title_class_content").show();
	});
	$(".title_class_page ul").mouseleave(function(){
		$(this).css("border-left","3px solid #FFFFFF");
		$(this).find(".title_class_content").attr("aria-hidden","true");
		$(this).find(".title_class_content").hide();
	});
	
	/**
	*图片层显示隐藏
	*/
	$(".recommend_image li").mouseenter(function(){
		$(this).find(".left_distance_txt").attr("aria-hidden","false");
		$(this).find(".left_distance_txt").stop().animate({bottom:0});
	});
	$(".recommend_image li").mouseleave(function(){
		$(this).find(".left_distance_txt").attr("aria-hidden","false");
		$(this).find(".left_distance_txt").stop().animate({bottom:-66});
	});
});