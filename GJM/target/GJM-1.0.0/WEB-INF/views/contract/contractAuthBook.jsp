<%@ page language="java" pageEncoding="utf-8"%>
<%
	response.setHeader("Pragma", "No-cache");
	response.setHeader("Cache-Control", "no-cache");
	response.setDateHeader("Expires", -10);
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title></title>
<!-- CSS -->
<link href="/resources/css/common/common.css" rel="stylesheet" type="text/css">
<link href="/resources/css/contractList/contractAuthBook.css" rel="stylesheet" type="text/css">

<script src="/resources/js/jquery-1.7.2.min.js" type="text/javascript"></script>
<script src="/resources/js/common/common.js"></script>
<script src="/resources/Plug-in/jquery.print/jquery.jqprint-0.3.js"></script>
<script src="/resources/js/html2pdf/html2canvas.js"></script>
<script src="/resources/js/html2pdf/jspdf.debug.js"></script>
<script src="/resources/js/contractList/contractAuthBook.js?v=<%=System.currentTimeMillis()%>"></script>

<script type="text/javascript">

function print(){
	var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
	var regStr_chrome = /chrome\/[\d.]+/gi 
	if(userAgent.indexOf("Chrome") > -1){
		var browserNV = userAgent.match(regStr_chrome);  
		if(browserNV.indexOf("58.0") == 0){
			aelrt("请升级谷歌浏览器版本");
			return;
		}
	} else {
		alert("请在谷歌浏览器上打印！");
		return;
	}
	$("#wenxints").hide();
	$(".conTitle").css({"margin-left" : "150px"});
	$("#tgPrintTime").html(returnTime(new Date()));
	$("#contractTGPrint").jqprint({
		debug: false,//如果是true则可以显示iframe查看效果，默认是false 
        importCSS: true,//true表示引进原来的页面的css，默认是true。
        printContainer: true,//表示如果原来选择的对象必须被纳入打印，默认是true。
        operaSupport: true///表示如果插件也必须支持歌opera浏览器，默认是true。
	});
}

function refresh(){
	location.reload();
}

function toPDF() {

    html2canvas($("#contractTGPrint"), {
        onrendered: function(canvas) {
            canvas.id = "mycanvas";
            //document.body.appendChild(canvas);
            //生成base64图片数据
            var dataUrl = canvas.toDataURL();
            var newImg = document.createElement("img");
            newImg.src =  dataUrl;
			data = dataUrl;
            if (data.lastIndexOf('data:base64') != -1) {
                data = data.replace('data:base64', 'data:image/jpeg;base64');
            } else if (data.lastIndexOf('data:,') != -1) {
                data = data.replace('data:,', 'data:image/jpeg;base64,');
            }

            if(isCanvasSupported()){
                ajaxUploadBase64File(data);
            }else{
                alert("您的浏览器不支持");
            }
        },
        background : '#fff'
    });
}

//ajax异步上传
function ajaxUploadBase64File(base64Data){
    $.ajax({
        url:"/contractObject/uploadBase64",
        type:"post",
        data:{base64Data:base64Data,con_code : getQueryString("con_code")},
        dataType:"json",
        success:function(data){
            if(data.code == 200){
                console.log("上传成功");
            }else{
                console.log("上传失败");
            }
        },
        error:function(){
            console.log("上传失败");
        }
    });
};

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

//是否支持canvas
function isCanvasSupported(){
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
};

/** base64转Blob */
function base64ToBlob (base64Data) {
    var byteString;
    if (base64Data.split(',')[0].indexOf('base64') >= 0){
        byteString = atob(base64Data.split(',')[1]);
    } else {
        byteString = unescape(base64Data.split(',')[1]);
    }
    var mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type : mimeString});
}

</script>
</head>
<body>
	<%--<a href="#" onclick="print();" style="margin-left: 10px; margin-top: 10px;">打印</a>--%>
	<%--<a href="#" onclick="refresh();" style="margin-left: 20px; margin-top: 10px;">刷新</a>--%>
	<%--<a href="#" onclick="toPDF();" style="margin-left: 20px; margin-top: 10px;">导出</a>--%>
	<div id="contractTGPrint" style="width: 950px;margin: 2px auto;background : url(/resources/image/watermark.png);">
		<div id="div1" class="" style="position: relative;text-align:center;margin: 0 auto;width: 100%; margin-bottom: 20px;">
			<div>
				<img src="/resources/image/appPage/gjp_logo.png" class="logoImg">
				<label class="font18">重庆管家婆房屋托管中心</label>
				<label class="rightFont">稳定高回报，出租无风险，客户更省心！</label>
			</div>
			<div style="">
				<hr style="width:100%;height:1px;border:none;border-top:2px solid #555555; ">
			</div>
			<div style="margin-top: 10px;">
				<label class="conTitle">授权委托书</label><label id="tgPrintTime" style="position: relative;font-size: 15px;float : right;"></label>
			</div>
			<div class="user_div">
				<dl>
					<dt>委托人：</dt>
					<dd><div class="underLine_div"><label id="template1">${contractVo.cc_name }</label></div></dd>
				</dl>
				<dl>
					<dt>身份证：</dt>
					<dd><div class="underLine_div"><label id="template2">${contractVo.cc_cardNum }</label></div></dd>
				</dl>
				<dl>
					<dt>电&nbsp;&nbsp;话：</dt>
					<dd><div class="underLine_div"><label id="template3">${contractVo.ccp_phone }</label></div></dd>
				</dl>
				<dl style="margin-top: 35px;">
					<dt>受托人：</dt>
					<dd><div class="" style="text-align: left;"><label>重庆管家婆房地产经纪有限公司</label></div></dd>
				</dl>
				<dl>
					<dt>营业执照：</dt>
					<dd><div class="" style="text-align: left;"><label>915001085540918999</label></div></dd>
				</dl>
				<dl>
					<dt>电&nbsp;&nbsp;话：</dt>
					<dd><div class="" style="width: 120%;text-align: left;"><label>023-88067511 <%--转1（财务）、3（维修保洁）、5（投诉建议）--%></label></div></dd>
				</dl>
				<div>
					<p class="conDigest_left">
						一、委托声明
					</p>
					<p class="conInfo" style="text-indent: 2em;">
						我是<label class="textUnderLine" id="template4">&nbsp;&nbsp;&nbsp;${houseInfo.he_address }&nbsp;&nbsp;&nbsp;</label>的合法产权人，<%--房产证号<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>，--%>现全权委托重庆管家婆房地产经纪有限公司全权经营管理。
					</p>
				</div>
				<div>
					<p class="conDigest_left">
						二、委托期限
					</p>
					<p class="conInfo" style="text-indent: 2em;">
						从<label class="textUnderLine" id="template5">&nbsp;${startDateArray[0] }&nbsp;</label>年<label class="textUnderLine" id="template6">&nbsp;${startDateArray[1] }&nbsp;</label>月<label class="textUnderLine" id="template7">&nbsp;${startDateArray[2] }&nbsp;</label>日起至<label class="textUnderLine" id="template8">&nbsp;${endDateArray[0] }&nbsp;</label>年<label class="textUnderLine" id="template9">&nbsp;${endDateArray[1] }&nbsp;</label>月<label class="textUnderLine" id="template10">&nbsp;${endDateArray[2] }&nbsp;</label>日止。如截止时间在春节放假期间，则截止时间自动顺延至乙方上班第1天，且此期间免租金。
					</p>
				</div>
				<div>
					<p class="conDigest_left">
						三、全权委托事项
					</p>
					<p class="conInfo">
						1、全权代表委托人根据市场变化，采取长短租结合，最大程度保障委托人收益；
					</p>
					<p class="conInfo">
						2、全权代表委托人招租、带看、转租、退房、与承租人签订《房屋租赁合同》；
					</p>
					<p class="conInfo">
						3、全权代表委托人与承租人签订、变更、解除和终止《房屋租赁合同》；
					</p>
					<p class="conInfo">
						4、全权代表委托人办理承租人入住、转租、退租时家具家电等设施设备的清点和验收手续；
					</p>
					<p class="conInfo">
						5、全权代表委托人向承租人收取租金、水电气费、有线电视费、物管费和催收租金等；
					</p>
					<p class="conInfo">
						6、全权代表委托人检查和处理维修问题；
					</p>
					<p class="conInfo">
						7、全权代表委托人申请办理开通水、电、气、有线电视、宽带等；
					</p>
					<p class="conInfo">
						8、全权代表委托人督促承租人按照《房屋租赁合同》的约定履行其义务；
					</p>
					<p class="conInfo">
						9、全权代表委托人处理与承租人的各种法律纠纷，包括《房屋租赁合同》的纠纷；
					</p>
					<p class="conInfo">
						10、如委托人在委托期限内要出售该房屋，则委托人授权受托人壹个月独家委托买卖期限；
					</p>
					<p class="conInfo">
						11、全权代表委托人办理房屋租赁理财融资全部事宜，包括理财收益、融资申请、转让《房屋租赁合同》项下对承租人的租金等应收账款、收取融资款、还款核算、手续费及利息支付等；
					</p>
					<p class="conInfo">
						12、全权代表委托人办理其它需要委托人办理的事情。
					</p>
				</div>
			</div>
			<%--<div class="user_div" style="margin-top: 20px;">
				<div style="width: 68%;display: flex;margin-top: 48px;">
					<label style=" width: 105px;">委托人：(签字)</label>
					<div class="underLine_div" style="width: 353px;left: 0px;">
						<input type="text" style="font-size:15px;" id="custmoerSign_TG1" readonly="readonly" name="lesserName" value="${contractVo.cc_name }">
						<img id="custmoerSign1" name="custmoerFDSign" style="display:none;" src="" width="140px" height="72px" >
					</div>
				</div>
				<dl>
					<dt>受托人：</dt>
					<dd><div class="underLine_div"><label>重庆管家婆房地产经纪有限公司</label></div></dd>
					&lt;%&ndash;<img id="backgroudImg1" src="/resources/image/appPage/contractCachet3.png" style="width:227px; height:151px;position: absolute;z-index: 10;bottom: 8px;">&ndash;%&gt;
				</dl>
				<dl>
					<dt>委托日期：</dt>
					<dd><div class="" style="left: 70px;width: 97%;text-align: left;"><label class="textUnderLine" style="font-size: 15px;">&nbsp;&nbsp;&nbsp;&nbsp;${fillTimeArray[0] }&nbsp;&nbsp;&nbsp;&nbsp;</label>年<label class="textUnderLine" style="font-size: 15px;">&nbsp;&nbsp;&nbsp;&nbsp;${fillTimeArray[1] }&nbsp;&nbsp;&nbsp;&nbsp;</label>月<label class="textUnderLine" style="font-size: 15px;">&nbsp;&nbsp;&nbsp;&nbsp;${fillTimeArray[2] }&nbsp;&nbsp;&nbsp;&nbsp;</label>日</div></dd>
				</dl>
			</div>--%>
			<table style="margin-left: 16px;margin-top: 80px;">
				<tr style="height: 60px;">
					<td width="12%">委托人：(签字)</td>
					<td width="38%"><input type="text" style="font-size:15px;" id="custmoerSign_TG1" readonly="readonly" name="lesserName" value="${contractVo.cc_name }"><img id="custmoerSign1" name="custmoerFDSign" style="display:none;" src="" width="140px" height="72px" ></td>
					<td width="10%">受托人：</td>
					<td width="40%">重庆管家婆房地产经纪有限公司<img id="backgroudImg1" src="/resources/image/appPage/contractCachet3.png" style="width:227px; height:151px;position: absolute;left: 68%;z-index: 10;display: none;"></td>
				</tr>
				<tr style="height: 60px;">
					<td width="12%">委托日期：</td>
					<td width="88%" colspan="3" id="template11">${fillTimeArray[0] }年${fillTimeArray[1] }月${fillTimeArray[2] }日</td>
				</tr>
			</table>
		</div>
	</div>
</body>
</html>