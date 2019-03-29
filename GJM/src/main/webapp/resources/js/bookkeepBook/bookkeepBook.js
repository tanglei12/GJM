var _title =$("title").text();
$(function(){
	data();
	bindClickToContractNo();
});
/** 遍历数据*/
var search_bars = [];
search_bars.push({
	name : "bk_type",
	type : "select",
	selected : 0,
	data : {
		  0 : "全部",
		  1 : "支出",
		  2 : "收入",
	}
},{
	name : "bk_typee",
	type : "select",
	selected : 0,
	data : {
		  0 : "全部",
		  2 : "公账",
		  1 : "私账",
	}
}
);

function data(bools,ucc_id){
	var mode = getQueryString("mode");
	$("#content").table({
		search: true,
		dataBool : bools,
		search_bars : search_bars,
		dataTime: [
		           {
		        	   name: "记录日期",
		        	   string: "bk_time"
		           }
		],
		title: [
			    {
					name: "编号",
					string: "",
					parameter: ""
				},
				{
					name: "时间",
					string: "bk_time",
					parameter: "",
					format:"yyyy-MM-dd"
				},
				{
					name: "用途",
					string: "bk_custom",
					parameter: "",
					leftDiv: '<i class="fa-image" title=""></i>',
				},
				{
					name: "是否关联",
					string: "bk_hi_code",
					parameter: "",
				},
				{
					name: "出入",
					string: "bk_type",
					parameter: {
						1 : "支出",
						2 : "收入",
					}
				},
				{
					name: "金额",
					string: "bk_money",
					parameter: ""
				},
				{
					name: "类型",
					string: "bk_typee",
					parameter: {
						1 : "私账",
						2 : "公账",
					}
				},
				{
					name: "支付方式",
					string: "bk_pay",
					parameter: ""
				},
				{
					name: "记账人",
					string: "em_name",
					parameter: "",
				},
				{
					name: "备注",
					string: "bk_category_details",
					parameter: "",
				},
				{
					name: "状态",
					string: "bk_state",
					parameter: {
						1 : "未报销",
						2 : "已申请报销",
						4 : "",
						5 : "交账",
						6 : "已报销",
						7 : "报销驳回",
						8 : "账单失效",
						9 : "报销通过"
					}
				},
			],
		url: "/bookkeep/bookkeepList",
		data: {},
		success: function(result){
			$(result).find("tbody tr").each(function(){
				$(this).find("td").eq(4).text();
				var i="<i style=\"font-style:normal;color: #18bc9c;\">"+ '+' +"</i>";
				var ii="<i style=\"font-style:normal;color: red;\">"+ '-' +"</i>";
				if ($(this).find("td").eq(5).text() == '收入') {
					$(this).find("td").eq(6).prepend(i);
				} else {
					$(this).find("td").eq(6).prepend(ii);
				}
				if ($(this).find("td").eq(11).text() == '未报销') {
					$(this).find("td").eq(11).css('color','red');
				}
				if(returnValue($(this).find("td").eq(4).text()) != '') {
                    $(this).find("td").eq(4).text('关联');
				} else {
                    $(this).find("td").eq(4).text('未关联');
				}
				var html='<div style="width: 150px;overflow: hidden;text-overflow: ellipsis;table-layout: fixed;">'+$(this).find("td").eq(10).text()+'</div>'
                $(this).find("td").eq(10).text('');
                $(this).find("td").eq(10).append(html);
			});
		}
	});
}

//绑定事件
function bindClickToContractNo(){
	$(document).on("click", "td[data-text=bk_custom]", function(){
		var data = $(this).parent("tr").find("[name=check]").data("data");
		var bk_id = data.bk_id;
		if(!isNaN(bk_id) || bk_id.indexOf("-") >= 0){
			lookBookkeep();
		}
	});
}
//时间
function time () {
	var dateTime=new Date();  
	var yy=dateTime.getFullYear();   //获取系统的年；
	var MM=dateTime.getMonth()+1;   //获取系统月份，由于月份是从0开始计算，所以要加1
	var dd=dateTime.getDate(); 
	var hh=dateTime.getHours();  
	var mm=dateTime.getMinutes();  
	var ss=dateTime.getSeconds(); 
	mm = extra(mm);  
	ss = extra(ss);
	MM = extra(MM);
	$('#time').html(yy+"-"+MM+"-"+dd+" "+hh+":"+mm+":"+ss);
	$('#date').html(yy+"-"+MM+"-"+dd+" "+hh+":"+mm+":"+ss);
	  function extra(x){  
	    if(x < 10) {  
	        return "0" + x;  
	    } else{  
	        return x;  
	    }  
	}
}
/**
 * 打开添加
 */
function addBookkeep(){
    $('.look-cd-popup').remove();
    $('.cd-popup').show();
	$("textarea").removeAttr('readonly');
	$(':button').removeAttr('disabled');
	$("input").removeAttr('readonly');
	$('#addHouseIn').css('display','');
	$('#details').val('');
	$.ajax({
		url : "/bookkeep/addBookkeep",
		type : "POST",
		data : {},
		dataType : "json",
		success:function(data){
			$('#user').html(data.condition.em_name);
		},
		error:function(){
			$.jBox.tip(data.msg,"error");
		}
	})
	//打开窗口
    $('.cd-popup3').addClass('is-visible3');
	$('.bk_id').val('');
	time ();
}

//打开编辑
var typee='';
var category='';
var type='';
var money='';
var pay='';
var img='';
var coRe_id='';
var state='';
var contract='';
function updateBookkeep(){
    $('.look-cd-popup').remove();
    $('.cd-popup').show();
	$("textarea").removeAttr('readonly');
	$(':button').removeAttr('disabled');
	$("input").removeAttr('readonly');
	$('#addHouseIn').css('display','');
	var data = $("[name='check']:checked").data("data");
	if (typeof(data) == "undefined") {
		$.jBox.tip("请选择一个账单");
		return;
	} else {
		coRe_id = data.bk_id;
		$("#bk_id").val(coRe_id);
		state=data.bk_state;
	}
	if (state == 2 || state ==6 || state == 9) {
		$.jBox.tip("账单报销中,不能修改");
		return;
	}
	if (state ==8 ) {
		$.jBox.tip("账单已失效,不能修改");
		return;
	}
	$.ajax({
		url : "/bookkeep/selectBookkeep",
		type : "POST",
		data : {bk_id:coRe_id},
		dataType : "json",
		success:function(data){
			//房子
            var house=data.contractObject;
            //所选客户
            var user=data.usercustomer;
            //客户
			var mapUser=data.mapUser;
			$('#user').html(data.condition.em_name);
            //记账类型
			$('.book-typee-dd label').each(function(){
				typee=$(this).attr('value');
				if ($(this).hasClass('active')) {
					$(this).removeClass('active');
				}
				if (typee == data.condition.bk_typee) {
					$(this).addClass('active');
				}
			})
            //款项用途
			$('.book-category-dd label').each(function(){
				category=$(this).html();
				if ($(this).hasClass('active')) {
					$(this).removeClass('active');
				}
				if (category == data.condition.bk_category) {
					$(this).addClass('active');
				}
				if (data.condition.bk_category =='自定义') {
					$('#categor-val').css('display','block');
					$('#categor-val').val(data.condition.bk_custom);
				}
			})
            //金额
			$('#money').val(data.condition.bk_money);
            //支付方式
			$('.book-pay-dd label').each(function(){
				pay=$(this).html();
				if ($(this).hasClass('active')) {
					$(this).removeClass('active');
				}
				if (pay == data.condition.bk_pay) {
					$(this).addClass('active');
				}
			})
            //是否关联合同
            $('.book-ContractObject-dd label').each(function(){
                contract=$(this).html();
                if (data.condition.bk_hi_code != null && data.condition.bk_hi_code != '') {
                    if ($(this).hasClass('active')) {
                        $(this).removeClass('active');
                    }
                    if (contract == '关联') {
                        $(this).addClass('active');
                        $('.contractObject-dd').show();
                        $('#ContractObject-val').val(house.house_address);
                        $('#hi_Code').val(house.hi_code);
                        $('#Contract-Customer').show();
                        $('#Contract-Customer').empty();
                        var html ='<option value='+user.cc_code+'>'+user.cc_type+'+'+user.cc_name+'</option>';
                        for (var i=0;i<mapUser.user.length;i++){
							if (mapUser.user[i].cc_id != user.cc_id) {
							html +='<option value='+mapUser.user[i].cc_code+'>'+mapUser.user[i].cc_type+'+'+mapUser.user[i].cc_name+'</option>';
							}
						}
                        $('#Contract-Customer').append(html);
                        $('.select-house').show();
                    }
                }
            })
            //备注
			$('#details').val(data.condition.bk_category_details);
			var size=60-(data.condition.bk_category_details.length);
			$('#cost_tpl_title_length').html("还可以输入" + size + "字数");
			var img=[];
			var imgg=data.condition.bk_enclasure.substring(0,data.condition.bk_enclasure.length-1);
			var img=imgg.split(",");
			if (img !='' && img != null) {
				for (var i=0;i<img.length;i++) {
					var div=$('<div  class="image-item"><img class="image-item-img" data-url="'+img[i]+'" src="'+img[i]+'" data-preview-src="" data-preview-group="1"><span class="image-item-close close"  title="删除照片">X</span><div class="image-item-wait" style="display: none;"></div></div>')
					$('#image-upload-box').prepend(div);
				}
			}
			time ();
		},
		error:function(){
			$.jBox.tip(data.msg,"error");
		}
	})
	//打开窗口
    $('.cd-popup3').addClass('is-visible3');
}
/**
 * 报销
 */
function Reimbursement () {
	$.ajax({
		url : "/bookkeep/reimbursement",
		type : "POST",
		data : {},
		dataType : "json",
		success:function(data){
			$("#department").html(data.user.ucc_name);
			$('.person').val(data.user.ucc_person);
		},
		error:function(){
			$.jBox.tip("操作失败");
		}
	})
	$('.expense').addClass('is-visible3');
	time ();
}

/**
 *删除 
 */
function del () {
	var data = $("[name='check']:checked").data("data");
	if(typeof(data) == "undefined"){
		$.jBox.tip("请选择一个账单");
		return;
	}else{
		coRe_id = data.bk_id;
		$("#bk_id").val(coRe_id);
	}
	var submit = confirm("确定要删除吗？");
	if (submit == true) {
		$.ajax({
			url : "/bookkeep/delete",
			type : "POST",
			data : {bk_id:coRe_id},
			dataType : "json",
			success:function(data){
				location.reload();
			},
			error:function(){
				
			}
		})
	}
}
//删除图片
$(document).on("click", '.close', function() {
	$(this).each(function(){
		var submit = confirm("确定要删除该图片吗？");
		if (submit == true) {
			// 获取图片路径
			var path = $(this).parent().find(".image-item-img").attr("src");
			$(this).parent().find(".image-item-wait").show();
			$(this).parent().remove("div");
		}
	})
});

//查看
function lookBookkeep(){
	var data = $("[name='check']:checked").data("data");
	if (typeof(data) == "undefined") {
		$.jBox.tip("请选择一个账单");
		return;
	} else {
		coRe_id = data.bk_id;
		$("#bk_id").val(coRe_id);
	}
    $.ajax({
		url : "/bookkeep/selectBookkeep",
		type : "POST",
		data : {bk_id:coRe_id},
		dataType : "json",
		success:function(data){
			var house=data.contractObject;
			var user=data.usercustomer;
			$('.cd-popup').hide();
			$('#image-upload-box').empty();
			var html ='';
			html +='<div class="cd-popup-container3 look-cd-popup" id="cd-popup-container3">';
			html +='	<div id="cd-buttons">';
			html +='		<div style="margin: auto; width: 90%; text-align: center;border-bottom: 1px solid #06B;" id="titleInsert">';
			html +='			<input type="text" value="记账" id="inputtext" name="inputtext" style="border: none; text-align: center; font-size: 20px; color: #3E97C9; font-family: 微软雅黑; -moz-user-select: none; -webkit-user-select: none; cursor: default;" readonly="readonly">';
			html +='		</div>';
			html +='		<div class="sub-title" id="contract-title" style="margin: auto; width: 95%;border-bottom: 1px solid whitesmoke;">';
			html +='			<ul class="title-nav">';
			html +='				<li class="visited">记账类型：</li>';
			html +='			</ul>';
			html +='		</div>';
			html +='		<dl>';
			html +='			<dd class="look-book-typee-dd">';
			html +='				<label id="typee" class="label active" value="2">公账</label>';
			html +='				<label value="1" class="label">私账</label>';
			html +='			</dd>';
			html +='		</dl>';
			html +='		<div class="sub-title" id="contract-title" style="margin: auto; width: 95%;border-bottom: 1px solid whitesmoke;">';
			html +='			<ul class="title-nav">';
			html +='				<li class="visited">款项用途：</li>';
			html +='			</ul>';
			html +='		</div>';
			html +='		<dl>';
			html +='			<dd class="look-book-category-dd">';
			html +='				<label id="category" class="label active">材料</label>';
			html +='				<label class="label">交通</label>';
			html +='				<label class="label">住宿</label>';
			html +='				<label class="label">办公用品</label>';
			html +='				<label class="label">差旅</label>';
			html +='				<label class="label">广告制作</label>';
			html +='				<label class="label">自定义</label>';
			html +='			</dd>';
			html +='			<dd>';
            if (data.condition.bk_category =='自定义') {
                html +='				<input type="text" value="'+data.condition.bk_custom+'" id="categor-val" placeholder="请输入..." style="display: block;">';
            }
			html +='			</dd>';
			html +='		</dl>';
			html +='		<div class="sub-title" id="contract-title" style="margin: auto; width: 95%;border-bottom: 1px solid whitesmoke;">';
			html +='			<ul class="title-nav">';
			html +='				<li class="visited">款项金额：</li>';
			html +='			</ul>';
			html +='		</div>';
			html +='		<dl>';
			html +='			<dd class="look-book-type-dd">';
			html +='				<label id="type" class="label active" value="1">支出</label>';
			html +='				<label value="2" class="label">收入</label>';
			html +='				<input type="text" value="'+data.condition.bk_money+'" id="money" style="width: 70px;height: 27px;" placeholder="输入金额">元';
			html +='			</dd>';
			html +='		</dl>';
			html +='		<div class="sub-title" id="contract-title" style="margin: auto; width: 95%;border-bottom: 1px solid whitesmoke;">';
			html +='			<ul class="title-nav">';
			html +='				<li class="visited">付款方式：</li>';
			html +='			</ul>';
			html +='		</div>';
			html +='		<dl>';
			html +='			<dd class="look-book-pay-dd">';
			html +='				<label id="pay" class="label active">现金</label>';
			html +='				<label class="label">支付宝</label>';
			html +='				<label class="label">转账</label>';
			html +='				<label class="label">刷卡</label>';
			html +='				<label class="label">微信</label>';
			html +='				<label class="label">其它</label>';
			html +='			</dd>';
			html +='		</dl>';
			html +='		<div class="sub-title" id="contract-title" style="margin: auto; width: 95%;border-bottom: 1px solid whitesmoke;">';
			html +='			<ul class="title-nav">';
			html +='				<li class="visited">是否关联合同：</li>';
			html +='			</ul>';
			html +='		</div>';
            html +='		<dl>';
            html +='			<dd class="look-book-ContractObject-dd">';
            html +='    			<label id="typee" class="label active" value="不关联">不关联</label>';
            html +='    			<label class="label" value="关联">关联</label>';
            html +='    		</dd>';
            html +='    		<dd style="position: relative;">';
            if (data.condition.bk_hi_code != null && data.condition.bk_hi_code != '') {
                html +='    		<input type="text" id="ContractObject-val" value='+house.house_address+' style="height: 30px;border-radius: 4px;">';
            }
            if (data.condition.bk_contractObject_1st != null && data.condition.bk_contractObject_1st != '') {
				html +='<input type="text" id="Contract-Customer" value='+user.cc_type+'+'+user.cc_name+' style="height: 30px;margin-left: 10px;border-radius: 4px;">';
			}
            html +='			</dd>';
            html +='		</dl>';
			html +='		<div class="sub-title" id="contract-title" style="margin: auto; width: 95%;border-bottom: 1px solid whitesmoke;">';
			html +='			<ul class="title-nav">';
			html +='				<li class="visited">添加附件：</li>';
			html +='			</ul>';
			html +='		</div>';
			html +='		<dl>';
			html +='			<dd class="look-book-pay-dd">';
			html +='				<div id="image-upload-box" class="imageUpload" style="width:600px;">';
            var img=[];
            var imgg=data.condition.bk_enclasure.substring(0,data.condition.bk_enclasure.length-1);
            img=imgg.split(",");
            if (img !='' && img != null) {
                for (var i=0;i<img.length;i++) {
					html +='<div  class="image-item"><img class="image-item-img" src="'+img[i]+'" data-preview-src="" data-preview-group="1"><span class="image-item-close" title="删除照片">X</span><div class="image-item-wait" style="display: none;"></div></div>';
                }
            }
            $("#image-upload-box").imageUpload();
			html +='				</div>';
			html +='			</dd>';
			html +='		</dl>';
			html +='		<div class="sub-title" id="contract-title" style="margin: auto; width: 95%;border-bottom: 1px solid whitesmoke;">';
			html +='			<ul class="title-nav">';
			html +='				<li class="visited">备注信息：</li>';
			html +='			</ul>';
			html +='		</div>';
			html +='		<dd class="book-type-dd">';
			html +='			<textarea id="details" style="width:300px;height: 60px;"  maxlength="60" onkeyup="javascript:setShowLength(this, 60, "cost_tpl_title_length");" >'+data.condition.bk_category_details+'</textarea>';
			html +='			<span class="red" id="cost_tpl_title_length">还可以输入60字数</span>';
			html +='		</dd>';
			html +='		<div class="sub-title" id="contract-title" style="margin: auto; width: 95%;border-bottom: 1px solid whitesmoke;float: left;margin-left: 15px;">';
			html +='			<ul class="title-nav">';
			html +='				<li class="visited">其它信息：</li>';
			html +='			</ul>';
			html +='		</div>';
			html +='		<dl>';
			html +='			<dd style="display: inline">记账人：<input type="text" id="user" value="'+data.condition.em_name+'" style="font-style:normal;border: none;"></dd>';
			html +='			<dd style="display: inline">时&nbsp;&nbsp;间：<input type="text" value="'+format(data.condition.bk_time,'yyyy-MM-dd HH:mm:ss')+'" style="border: none;"></dd>';
			html +='		</dl>';
			html +='	</div>';
			html +='	<a href="#0" class="cd-popup-close" style="color: red;">X</a>';
			html +='	<input type="hidden" id="bk_id" value="">';
			html +='</div>';
            $('.cd-popup3').append(html);

			//记账类型
            $('.look-book-typee-dd label').each(function(){
                typee=$(this).attr('value');
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                }
                if (typee == data.condition.bk_typee) {
                    $(this).addClass('active');
                }
            })
            //款项用途
            $('.look-book-category-dd label').each(function(){
                category=$(this).html();
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                }
                if (category == data.condition.bk_category) {
                    $(this).addClass('active');
                }
            })
			//款项金额
			$('.look-book-type-dd label').each(function () {
				type=$(this).html();
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                }
                var t=data.condition.bk_type == 1 ? "支出" :"收入";
                if (type == t) {
                    $(this).addClass('active');
                }
			})
            //支付方式
            $('.look-book-pay-dd label').each(function(){
                pay=$(this).html();
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                }
                if (pay == data.condition.bk_pay) {
                    $(this).addClass('active');
                }
            })
			//是否关联合同
			$('.look-book-ContractObject-dd label').each(function () {
                contract=$(this).html();
				if (data.condition.bk_hi_code != null && data.condition.bk_hi_code !='') {
                    if ($(this).hasClass('active')) {
                        $(this).removeClass('active');
                    }
					if (contract == '关联') {
                        $(this).addClass('active');
					}
				}
			})
            var size=60-(data.condition.bk_category_details.length);
            $('#cost_tpl_title_length').html("还可以输入" + size + "字数");
            $(".look-cd-popup").viewer();  //查看图片
            $('#time').html();
            $('#addHouseIn').css('display','none');
            $("textarea").attr('readonly', true);
            $(':button').attr('disabled', true);
            $("input").attr('readonly', true);
            $("span").removeClass('image-item-close');
		},
		error:function(){
			$.jBox.tip(data.msg,"error");
		}
	})
    // 打开窗口
    $('.cd-popup3').addClass('is-visible3');
}

$(document).on('click','.cd-popup-close', function(){
    $('.look-cd-popup').remove();
    $('.cd-popup3').removeClass('is-visible3');
});
