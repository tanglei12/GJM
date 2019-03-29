<%@ page language="java" pageEncoding="utf-8"%>
<%
	response.setHeader("Pragma", "No-cache");
	response.setHeader("Cache-Control", "no-cache");
	response.setDateHeader("Expires", -10);
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="Expires" CONTENT="0">
<meta http-equiv="Cache-Control" CONTENT="no-cache">
<meta http-equiv="Pragma" CONTENT="no-cache">
<title>记账本</title>
<link href="/resources/css/common/common.css" rel="stylesheet" type="text/css">
<link href="/resources/common/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"><!-- 字体样式 -->
<link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"><!-- 字体样式 -->
<link href="/resources/css/table-min.css" rel="stylesheet" type="text/css" /><!-- 表格样式 -->
<link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">
<link href="/resources/common/swipeslider-develop/dist/swipeslider.css" rel="stylesheet" type="text/css">
<link href="/resources/css/library/house-list.css" rel="stylesheet" type="text/css">
<link href="/resources/common/imageUpload/css/jquery.image-upload.css" rel="stylesheet" type="text/css">
<link href="/resources/css/housePublish.css" rel="stylesheet" type="text/css">
<link href="/resources/css/contractList/contractAnimate.css" rel="stylesheet" type="text/css">
<link href="/resources/css/bookkeepBook/addBookkeepBook.css" rel="stylesheet" type="text/css">
<link href="/resources/css/bookkeepBook/expense.css" rel="stylesheet" type="text/css">
<link href="/resources/css/viewer.min.css" rel="stylesheet" type="text/css">

<script src="/resources/js/jquery-1.7.2.min.js"></script>
<script src="/resources/js/table-min.js"></script>
<script src="/resources/js/product/jquery-cookie.js"></script>
<script src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
<script src="/resources/common/swipeslider-develop/dist/swipeslider.min.js"></script>
<script src="/resources/common/My97DatePicker/WdatePicker.js"></script>
<script src="/resources/js/common/common.js"></script>
<script src="/resources/js/bookkeepBook/bookkeepBook.js"></script>
<!-- 上传插件 -->
<script src="/resources/common/imageUpload/js/jquery.image-upload.js"></script>
<!-- 百度地图 -->
<script src="http://api.map.baidu.com/api?v=2.0&ak=9HqNP0u7U4ZU5ZTKHT8BCbUa"></script>
<!-- UE编辑器 -->
<script type="text/javascript" charset="utf-8" src="/resources/umeditor/ueditor.config.js"></script>
<script type="text/javascript" charset="utf-8" src="/resources/umeditor/ueditor.all.min.js"> </script>
<script type="text/javascript" charset="utf-8" src="/resources/umeditor/lang/zh-cn/zh-cn.js"></script>
<script src="/resources/umeditor/lang/zh-cn/zh-cn.js"></script>
<script src="/resources/js/housePublish.js"></script>
<script src="/resources/js/common/optionModel.js"></script>
<script src="/resources/js/viewer.min.js"></script>  <!-- 查看图片 -->
<style type="text/css">
	body{
		overflow-y: auto;
	}
	#categor-val{
		float: right;
	    width: 115px;
	    height: 27px;
	    margin-left: 10px;
	   	display: none;
	}
	
	.fa-minus-square:before{
		color:red;
		font-size: 20px;
	}
	label{
		cursor: pointer;
	}
	.select-house{
		position: absolute;
		width: 210px;
		border: 1px solid #ddd;
		border-top: none;
		background: #fff;
		z-index: 10;
	}
	.select-house option:hover{
		background-color: #dddddd;
		cursor: pointer;
	}
</style>
</head>
<body>
	<div id="content"></div>
	
	<div class="cd-popup3">
		<div class="cd-popup-container3 cd-popup" id="cd-popup-container3" style="display: none;">
			<div id="cd-buttons">
				<div style="margin: auto; width: 90%; text-align: center;border-bottom: 1px solid #06B;" id="titleInsert">
					<input type="text" value="记账" id="inputtext" name="inputtext" style="border: none; text-align: center; font-size: 20px; color: #3E97C9; font-family: 微软雅黑; -moz-user-select: none; -webkit-user-select: none; cursor: default;" readonly="readonly">
				</div>
				<div class="sub-title" id="contract-title" style="margin: auto; width: 95%;border-bottom: 1px solid whitesmoke;">
					<ul class="title-nav">
						<li class="visited">记账类型：</li>
					</ul>
				</div>
				<dl>
					<dd class="book-typee-dd">
						<label id="typee" class="label active" value="2">公账</label>
						<label value="1" class="label">私账</label>
					</dd>
				</dl>
				<div class="sub-title" id="contract-title" style="margin: auto; width: 95%;border-bottom: 1px solid whitesmoke;">
					<ul class="title-nav">
						<li class="visited">款项用途：</li>
					</ul>
				</div>
				<dl>
					<dd class="book-category-dd">
						<label id="category" class="label active">材料</label>
						<label class="label">交通</label>
						<label class="label">住宿</label>
						<label class="label">办公用品</label>
						<label class="label">差旅</label>
						<label class="label">广告制作</label>
						<label class="label">自定义</label>
					</dd>
					<dd>
						<input type="text" id="categor-val" placeholder="请输入...">
					</dd>
				</dl>
				<div class="sub-title" id="contract-title" style="margin: auto; width: 95%;border-bottom: 1px solid whitesmoke;">
					<ul class="title-nav">
						<li class="visited">款项金额：</li>
					</ul>
				</div>
				<dl>
					<dd class="book-type-dd">
						<label id="type" class="label active" value="1">支出</label>
						<label value="2" class="label">收入</label>
						<input type="text" id="money" style="width: 70px;height: 27px;" placeholder="输入金额">元
					</dd>
				</dl>
				<div class="sub-title" id="contract-title" style="margin: auto; width: 95%;border-bottom: 1px solid whitesmoke;">
					<ul class="title-nav">
						<li class="visited">付款方式：</li>
					</ul>
				</div>
				<dl>
					<dd class="book-pay-dd">
						<label id="pay" class="label active">现金</label>
						<label class="label">支付宝</label>
						<label class="label">转账</label>
						<label class="label">刷卡</label>
						<label class="label">微信</label>
						<label class="label">其它</label>
					</dd>
				</dl>
				<div class="sub-title" id="contract-title" style="margin: auto; width: 95%;border-bottom: 1px solid whitesmoke;">
					<ul class="title-nav">
						<li class="visited">是否关联合同：</li>
					</ul>
				</div>
				<dl>
					<dd class="book-ContractObject-dd">
						<label id="ContractObject" class="label active" value="不关联">不关联</label>
						<label class="label" value="关联">关联</label>
					</dd>
					<dd class="contractObject-dd" style="position: relative;display: none;">
						<input type="hidden" id="hi_Code" value="">
						<input type="text" id="ContractObject-val" placeholder="请输入房号.." onkeyup="selectHouse();" style="height: 30px;width: 210px;border-radius: 3px;">
						<select id="Contract-Customer" style="display:none; height: 30px;width: 210px;border-radius: 3px;"></select>
						<input type="text" id="Contract-Cus" style="display: none;height: 30px;border-radius: 4px;">
						<div class="select-house"></div>
					</dd>
				</dl>
				<div class="sub-title" id="contract-title" style="margin: auto; width: 95%;border-bottom: 1px solid whitesmoke;">
					<ul class="title-nav">
						<li class="visited">添加附件：</li>
					</ul>
				</div>
				<dl>
					<dd class="book-pay-dd">
						<div id='image-upload-box' style='width:600px;'></div>
					</dd>
				</dl>
				<div class="sub-title" id="contract-title" style="margin: auto; width: 95%;border-bottom: 1px solid whitesmoke;">
					<ul class="title-nav">
						<li class="visited">备注信息：</li>
					</ul>
				</div>
				<dd class="book-type-dd">
					<textarea id="details" style="width:300px;height: 60px;"  maxlength="60" onkeyup="javascript:setShowLength(this, 60, 'cost_tpl_title_length');" ></textarea>
					<span class="red" id="cost_tpl_title_length">还可以输入60字数</span> 	
				</dd>
				<div class="sub-title" id="contract-title" style="margin: auto; width: 95%;border-bottom: 1px solid whitesmoke;float: left;margin-left: 15px;">
					<ul class="title-nav">
						<li class="visited">其它信息：</li>
					</ul>
				</div>
				<dl>
					<dd style="display: inline">记账人：<i id="user" style="font-style:normal"></i></dd>
					<dd style="display: inline">时&nbsp;&nbsp;间：<i id="time" style="font-style:normal"></i></dd>
				</dl>
				<div class="col-md-12  modelAdd" style="width: 300px; margin: auto;">
					<input class="btn btn-info pull-left" id="addHouseIn" stype="button" value=" 保存  " />
				</div>
			</div>
			<a href="#0" class="cd-popup-close" style="color: red;">X</a>
			<input type="hidden" id="bk_id" value="">
		</div>
	</div>
	
	<div class="expense">
		<div class="expense-container3" id="expense-container3">
			<div id="cd-buttons">
				<div style="margin: auto; width: 90%; text-align: center;border-bottom: 1px solid #06B;" id="titleInsert">
					<input type="text" value="重庆管家婆费用报销单" id="inputtext" name="inputtext" style="width:210px;border: none; text-align: center; font-size: 20px; color: #3E97C9; font-family: 微软雅黑; -moz-user-select: none; -webkit-user-select: none; cursor: default;" readonly="readonly">
				</div>
				<div class="sub-title" id="contract-title" style="margin: auto; width: 95%;margin-bottom: 10px;">
					<p style="float: left;;margin-top: 35px;font-size: 14px;">报销部门:   <i id="department" style="font-style:normal"></i></p>
					<p style="float: right;margin-top: 30px;font-size: 14px;">填表日期:   <i id="date" style="font-style:normal"></i></p>
				</div>
				<table id="expense" style="width: 96%;text-align: center;margin-left: 15px;">
					<thead style="border:1px solid;width:20px;">
						<tr style="font-size: 16px;font-weight:500;color: black;height: 30px;">
							<td style="border:1px solid;">款项用途</td>
							<td style="border:1px solid;">金额（元）</td>
							<td style="border:1px solid;">备注信息</td>
						</tr>
					</thead>
					<tbody style="border:1px solid;" class="tbody">
					</tbody>
					<tfoot>
						<tr style="height: 30px;" class="expense-tr">
							<td style="border:1px solid;" colspan="3"><i class="expense-button fa-plus-square" style="font-size: 22px;color: #18bc9c;cursor: pointer;"></i></td>
						</tr>
					</tfoot>
					<input type="hidden" class="person">
				</table>
				<button type="butten" class="finish-butten" style="cursor:pointer;">提交审核</button>
			</div>
			<a href="#0" class="expense-popup-close" style="color: red;">X</a>
		</div>
	</div>
</body>
<script type="text/javascript">

$(function(){
	//图片插件
	$("#image-upload-box").imageUpload({
        width:110,
        height:110,
        uploadType: 'bookKeep',
	});
})
function setShowLength(obj, maxlength, id) { 
	var rem = maxlength - obj.value.length; 
	var wid = id; 
	if (rem < 0){ 
		rem = 0; 
	} 
	$('#cost_tpl_title_length').html("还可以输入" + rem + "字数");
} 
// 关闭窗口
$('.cd-popup-close').on('click', function(){
     removeInput();//清除数据
   $(".cd-popup3").removeClass('is-visible3');
});
//关闭窗口
$('.expense-popup-close').on('click', function(){
  $(".expense").removeClass('is-visible3');
  $('#expense tbody').find('tr').remove();
});
//关闭创库
$('.expense-close').on('click', function(){
  $(".add-expense").removeClass('is-visible3');
});
function removeInput(){
	$('.book-typee-dd label.active').each(function(){
		$(this).removeClass('active');
	});
	$('#typee').addClass('active');
	$('.book-category-dd label.active').each(function(){
		$(this).removeClass('active');
	});
	$('#category').addClass('active');
	$('.book-type-dd label.active').each(function(){
		$(this).removeClass('active');
	});
	$('#type').addClass('active');
	$('.book-pay-dd label.active').each(function(){
		$(this).removeClass('active');
	});
    $('.book-ContractObject-dd label.active').each(function(){
        $(this).removeClass('active');
    });
	$('#pay').addClass('active');
	$('#ContractObject').addClass('active');

	$('.image-item').remove();
	$('#money').val('');
	$("#categor-val").val('');
	$("#categor-val").css('display','none');
	$('#details').html('');
    $('#ContractObject-val').val('');
	$('.contractObject-dd').css('display','none');
    $('.select-house').empty();
	$('.select-house').css('display','none');
}
//记账类型
$('.book-typee-dd label').each(function(){
	$(this).click(function(){
		$('.book-typee-dd label.active').each(function(){
			$(this).removeClass('active');
		})
		$(this).addClass('active');
	})
})
//款项用途
$('.book-category-dd label').each(function(){
	$(this).click(function(){
		$('.book-category-dd label.active').each(function(){
			$(this).removeClass('active');
			$("#categor-val").css('display','none');
		})
		$(this).addClass('active');
		if ($(this).html() == '自定义') {
			$("#categor-val").css('display','block');
		}
	})
})
//款项金额
$('.book-type-dd label').each(function(){
	$(this).click(function(){
		$('.book-type-dd label.active').each(function(){
			$(this).removeClass('active');
		})
		$(this).addClass('active');
	})
})
//支付方式
$('.book-pay-dd label').each(function(){
	$(this).click(function(){
		$('.book-pay-dd label.active').each(function(){
			$(this).removeClass('active');
		})
		$(this).addClass('active');
	})
})
//是否关联合同
$('.book-ContractObject-dd label').each(function () {
    $(this).click(function(){
        $('.book-ContractObject-dd label.active').each(function(){
            $(this).removeClass('active');
            $('.contractObject-dd').css('display','none');
            $('.select-house').css('display','none');
        })
        $(this).addClass('active');
        if ($(this).html() == '关联') {
            $('.contractObject-dd').css('display','block');
            $('.select-house').css('display','block');
            $('#ContractObject-val').val('');
            $('#Contract-Customer').hide();
            $('.select-house').empty();
		}
    })
})
var typee='';
var category='';
var custom='';
var type='';
var money='';
var pay='';
var img='';
var category_details='';
var contract='';
var hi_Code='';
var contractObject_1st='';
//提交
$('#addHouseIn').on('click',function(){
    //记账类型
	$('.book-typee-dd label.active').each(function(){
		typee=$(this).attr('value');
	})
    //款项用途
	$('.book-category-dd label.active').each(function(){
		category=$(this).html();
		custom=$(this).html();
		if (category == '自定义') {
			custom=$('#categor-val').val();
		}
	})
    //款项金额
	$('.book-type-dd label.active').each(function(){
		type=$(this).attr('value');
		money=$('#money').val();
	})
    //支付方式
	$('.book-pay-dd label.active').each(function(){
		pay=$(this).html();
	})
	//是否关联合同
	$('.book-ContractObject-dd label.active').each(function () {
        contract=$(this).attr('value');
        if (contract == '关联') {
            hi_Code=$('#hi_Code').val();
            contractObject_1st=$('#Contract-Customer').val();
		}
	})
	$('#image-upload-box').find('img').each(function(){
		img+=$(this).attr('data-url')+",";
	});
	category_details=$('#details').val();
	if (money == '' || money == null || custom == '' || custom == null) {
		$.jBox.tip("填写信息不完整","error");
		return false;
	}
	var arr={};
		arr.bk_id=$('#bk_id').val();
		arr.bk_type=type;
		arr.bk_category=category;
		arr.bk_custom=custom;
		arr.bk_money=money;
		arr.bk_pay=pay;
		arr.bk_enclasure=img;
		arr.bk_category_details=category_details;
		arr.bk_typee=typee;
		arr.bk_time=$('#time').html();
		arr.bk_hi_code=hi_Code;
		arr.bk_contractObject_1st=contractObject_1st;
		$.ajax({
			url : "/bookkeep/save?result="+encodeURI(JSON.stringify(arr)),
			type : "POST",
			data : {},
			dataType : "json",
			success:function(data){
				 $('.cd-popup3').removeClass('is-visible3');
				 location.reload();
			},
			error:function(){
				$.jBox.tip(data.msg,"error");
			}
		})
})

var id='';
var custom='';
var money='';
//报销单添加信息
$(document).on("click", '.expense-button', function() {
	$.ajax({
		url : "/bookkeep/bookExpenseList",
		type : "POST",
		data : {},
		dataType : "json",
		success:function(data){
		 	var tr="<tr style=\"height: 30px;\">"+
					"<td style=\"border:1px solid;\">"+
						"<div >"+
							"<select  class=\"select1\" style=\"width:80%;height:30px;float:right;\" onchange=\"ass()\">"+
								"<option value=\"\" selected>"+"请选择报销项"+"</option>";
								var nid=[];
								$('#expense tbody tr').each(function(){    //已选id
									nid.push($(this).find("td").eq(0).attr('nid'));
								})

								var arr=[];     //所有下拉列表id
								if (nid !='') {
									for (var i=0;i<data.list.length;i++) {
										arr.push(data.list[i].bk_id);
									}
								}

								var temp = []; //临时数组1
								var temparray = [];//临时数组2
								for (var i = 0; i < nid.length; i++) {     //剩下未选id
									temp[nid[i]] = true;//巧妙地方：把数组B的值当成临时数组1的键并赋值为真
								}
								for (var i = 0; i < arr.length; i++) {
									if (!temp[arr[i]]) {
										temparray.push(arr[i]);//巧妙地方：同时把数组A的值当成临时数组1的键并判断是否为真，如果不为真说明没重复，就合并到一个新数组里，这样就可以得到一个全新并无重复的数组
									}
								}

								if (nid != '') {
									for (var j=0;j<temparray.length;j++) {
										for (var i=0;i<data.list.length;i++) {
											id=data.list[i].bk_id;
											custom=data.list[i].bk_custom;
											money=data.list[i].bk_money;
											if (data.list[i].bk_id == temparray[j] ) {
												tr+="<option value=\""+id+"\">"+custom+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+money+"</option>";
											}
										}
									}
								}else{
									for (var i=0;i<data.list.length;i++) {
										id=data.list[i].bk_id;
										custom=data.list[i].bk_custom;
										money=data.list[i].bk_money;
										tr+="<option value=\""+id+"\" nid=\""+id+"\">"+custom+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+money+"</option>";
									}
								}
					tr+="<select>";
					tr+="</div>";
					tr+="</td>";
					tr+="<td style=\"border:1px solid;\"></td>";
					tr+="<td style=\"border:1px solid;\"></td>";
					tr+="</tr>";
					$('.tbody').append(tr);
		},
		error:function(){

		}
	})
})
Array.minus = function(a, b){ 
return a.uniquelize().each(function(o){return b.contains(o) ? null : o}); 
}; 
function ass() {
	var nid=$('.select1').val();
	$.ajax({
		url : "/bookkeep/ExpenseOne",
		type : "POST",
		data : {bk_id:nid},
		dataType : "json",
		success:function(data){
			$('.tbody').children("tr:last-child").find("td").eq(0).attr('class','fa-minus-square');
			$('.tbody').children("tr:last-child").find("td").eq(0).attr('nid',nid);
			$('.tbody').children("tr:last-child").find("td").eq(0).html(data.bk_custom);
			$('.tbody').children("tr:last-child").find("td").eq(0).css({'width':'100%','height':'30px','line-height':'30px','font-size':'15px'});
			var input="<input type=\'text\' style=\"height:30px;text-align: center;\" value=\""+data.bk_money+"\">";
			$('.tbody').children("tr:last-child").find("td").eq(1).append(input);
			$('.tbody').children("tr:last-child").find("td").eq(1).css('width','280px')
// 			$('.tbody').children("tr:last-child").find("td").eq(1).html(data.bk_money);
			$('.tbody').children("tr:last-child").find("td").eq(2).html(data.bk_category_details);
		},
		error:function(){
			
		}
	})
}
// 删除
$(document).on('click','.fa-minus-square',function(){
	$(this).each(function(){
		$(this).parent('tr').remove();
	})
})

//添加报销单
var arr=[];
$(document).on('click','.finish-butten',function(){
	$('#expense tbody tr').each(function(){
		var arry={};
		arry.bx_bk_id=$(this).find('td').eq(0).attr('nid');
		arry.bx_custom=$(this).find("td").eq(0).text();
		arry.bx_expense_money=$(this).find("td").eq(1).find('input').val();
		arry.bx_category_details=$(this).find("td").eq(2).html();
		arry.bx_person=$('.person').val();
		arry.bx_partment=$('#department').html();
		arr.push(arry);
	})
	if (arr.length == 0) {
		$.jBox.tip('提交数据不完整');
		return false;
	}
	$.ajax({
		url : "/bookkeep/addExpense?result="+encodeURI(JSON.stringify(arr)),
		type : "POST",
		data : {},
		dataType : "json",
		success:function(data){
			 $('.expense').removeClass('is-visible3');
			 location.reload();
		},
		error:function(){
			$.jBox.tip(data.msg,"error");
		}
	})
})
//是否关联合同
function selectHouse() {
    var house=$('#ContractObject-val').val();
    if (house == '') {
        $("#ContractObject-val").msg("房屋为空!");
        return false;
	}
    $('#Contract-Customer').val('');
    $.ajax({
        url : "/bookkeep/selectHouse",
        type : "POST",
        data : {"house_address": house},
        dataType : "json",
    	success:function(result){
            $('.select-house').empty();
            $('#Contract-Cus').val('');
            $('#Contract-Cus').hide();
            $('#Contract-Customer').show();
            $('#Contract-Customer').val('');
        	var data=result.houseList;
        	if (data.length != 0){
                var html='';
                for (var i=0;i<data.length;i++) {
                    html +='		<option class="house-Contract" value="'+data[i].hi_code+'" code='+data[i].house_address+' style="text-align:-webkit-left;">'+data[i].house_address+'</option>';
                }
                $('.select-house').append(html);
            }
        },
        error:function(){
            $.jBox.tip(data.msg,"error");
        }
    })
}

//合同点击事件
$(document).on('click','.house-Contract',function () {
    $(this).each(function () {
        $('#hi_Code').val($(this).val());
		$('#ContractObject-val').val($(this).attr('code'));
		if ($('#hi_Code').val() == '') {
            $("#ContractObject-val").msg("未查到此房屋!");
		}
        $.ajax({
            url : "/bookkeep/selectUserCustomer",
            type : "POST",
            data : {"hi_code": $('#hi_Code').val()},
            dataType : "json",
            success:function(result){
                console.log(result);
                var data=result.user;
                if (data.length != 0 ) {
                    $('#Contract-Customer').show();
                    $('#Contract-Customer').empty();
                    for (var i=0;i<data.length;i++) {
                        var html ='';
                        html +='<option value='+data[i].cc_code+'>'+data[i].cc_type+'+'+data[i].cc_name+'</option>';
                        $('#Contract-Customer').append(html);
                    }
                    $('#Contract-Customer').attr('readonly','readonly');
                }
            },
            error:function(){
                $.jBox.tip(data.msg,"error");
            }
        })
        $('.select-house').empty();
	})
})
</script>
</html>