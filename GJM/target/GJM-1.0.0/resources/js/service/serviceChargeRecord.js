$(function(){
    data();
//	bindClickToContractNo();
});
/** 返回字符串 */
function returnValue(str) {
    return (str == null || typeof (str) == "undefined" || str == "undefined") ? "" : str + "";
}
function data(bools,ucc_id){
    var mode = getQueryString("mode");
    $("#content").table({
        search: true,
        dataBool : bools,
        dataTime: [
            {
                name: "发布日期",
                string: "create_time"
            }
        ],
        title: [
            {
                name: "编号",
                string: "",
                parameter: ""
            },
            /*{
                name: "创建时间",
                string: "create_time",
                parameter: ""
                ,
                format:"yyyy-MM-dd HH:MM:SS"
            },*/
            {
                name: "服务类型",
                string: "service_type",
                parameter: {
                    1 : "修锁",
                    2 : "修空调"
                }
            },
            {
                name: "服务费用(元)",
                string: "service_charge",
                parameter: "",
            },

            {
                name: "剩余费用(元)",
                string: "surplus_serveMoney",
                parameter: ""
            }/*,
            {
                name: "优惠的服务费(元)",
                string: "discount",
                parameter: "",
            }*/
        ],
        url: "/service/queryServiceChargeRecordList",
        data: {},
        success: function(result){
            /*$(result).find("tbody tr").each(function(){
                var td=$(this).find("td").eq(5).text();
                $(this).find("td").eq(5).text('');
                var td5=$(this).find("td").eq(5);
                var html='<i href="#" class="fa-image" style="cursor:pointer;font-style:normal;" onclick="lookImage(this)"></i>';
                td5.append(html);

                var td6=$(this).find("td").eq(6).text();
                var t6=$(this).find("td").eq(6);
                $(this).find("td").eq(6).text('');
                var div=$('<div style="width:150px;overflow:hidden;text-overflow:ellipsis;table-layout:fixed;">'+td6+'</div>');
                t6.append(div);
            });*/
        }
    });
}
//点击图片
//function bindClickToContractNo(){
//	$(document).on("click", "td[data-text=ad_image]", function(){
//		var data = $(this).parent("tr").find("[name=check]").data("data");
//		var ad_id = data.ad_id;
//		if (!isNaN(ad_id) || ad_id.indexOf("-") >= 0) {
//			lookImage();
//		}
//	});
//}
function lookImage(obj) {
    var data = $(obj).parents("tr").find("[name='check']").data("data");
    var ad_id = data.ad_id;
    $.ajax({
        url:"/advertisement/lookAdvertisement",
        type:"POST",
        data:{ad_id:ad_id},
        dataType:"json",
        success:function (data) {
            $("input").attr('readonly', true);
            $("textarea").attr('readonly', true);
            $('#ad_name').val(data.advertisement.ad_name);
            var img=data.advertisement.ad_image;
            $('#div_img').find('img').attr('src',img);
            $('#div_img').find('img').attr('title',data.advertisement.ad_title);
            $('#div_img').find('img').attr('alt',data.advertisement.ad_alert);
//			var text=data.advertisement.ad_content.substring(3,data.advertisement.ad_content.length-4);
            $('#div_text').text(data.advertisement.ad_text);
            //打开窗口
            $('.expense').addClass('is-visible3');
        },
        error:function () {

        }
    })
}

//更改
var ad_id='';
function updateAdvertisement () {
    var data = $("[name='check']:checked").data("data");
    if (typeof(data) == "undefined") {
        $.jBox.tip("请选择一个");
    } else {
        ad_id=data.ad_id;
        functionIfram('/advertisement/updateAdvertisement?ad_id=' + ad_id,'修改','广告管理');
    }
}

//删除
var ad_id='';
function del(){
    var data = $("[name='check']:checked").data("data");
    if(typeof(data) == "undefined"){
        $.jBox.tip("请选择一个广告列表");
        return;
    }else{
        ad_id=data.ad_id;
    }
    var submit = confirm("确定要删除吗？");
    if (submit == true) {
        $.ajax({
            url : "/advertisement/delAdvertisement",
            type : "POST",
            data : {ad_id:ad_id},
            dataType : "json",
            success:function(data){
                console.log(data);
                location.reload();
            },
            error:function(){

            }
        })
    }
}