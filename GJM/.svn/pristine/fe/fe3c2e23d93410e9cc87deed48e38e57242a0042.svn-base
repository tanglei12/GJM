var _STATE = false;
var _title = $("title").text();
$(function () {
    data();
    $("#cname").on("input propretychange", function () {
        changeWhere();
    });

});


// 筛选获取数据
function data() {
    $("#content").table({
        titleBg: "#34495E",
        titleColor: "#FFF",
        search: true,
        trClick: true,
        dataTime: [
            {
                name: "创建时间",
                string: "cc_createTime"
            }
        ],
        title: [
            {
                name: "编号",
                string: "cc_id",
                parameter: ""
            },
            {
                name: "联系人",
                string: "cc_name",
                parameter: "",
                string1_prefix: "/",
                string1: "ccp_phone",
                parameter1: "",
                href: "/customer/customerEdit&cc_code",
            },
            {
                name: "状态",
                string: "cc_state",
                parameter: {
                    1: "有效客户",
                    2: "意向客户",
                    3: "失效客户"// 历史客户
                }
            },
            {
                name: "性别",
                string: "cc_sex",
                parameter: {
                    0: "女",
                    1: "男"
                }
            },
            {
                name: "类型",
                string: "cc_type",
                parameter: ""
            },
            {
                name: "房屋",
                string: "house_address",
                parameter: ""
            },
            {
                name: "来源",
                string: "cc_source",
                parameter: ""
            },
            {
                name: "分数",
                string: "cc_fraction",
                parameter: ""
            },
            {
                name: "创建时间",
                string: "cc_createTime",
                parameter: "",
                format: "yyyy-MM-dd"
            }
        ],
        url: "/customer/queryCustomerList",
        data: {},
        success: function (result) {
        }
    });
}

function changeWhere() {
    data();
}
/*=======================================编辑页面==============================================*/
/** 表单验证*/
function isValidInput() {
    $(".form-control:required").on("change", function () {
        var $this = $(this);
        if ($this.is(":hidden")) {
            _STATE = true;
            return;
        }
        var $thisVal = $(this).val();
        var $parent = $this.parent().parent();
        var text = $parent.find(".item-titile").text();
        if (isEmpty($thisVal)) {
            $this.addClass("input-error").siblings(".true-tisp").hide();
            $parent.find(".tisp").addClass("error").text(text + "不能为空");
            _STATE = false;
            return;
        }
        var $thisId = $(this).attr("id");
        $this.removeClass("input-error").siblings(".true-tisp").show();
        $parent.find(".tisp").removeClass("error").empty();
        _STATE = true;
    });
}

//毫秒转换为日期格式
var format = function (time, format) {
    var t = new Date(time);
    var tf = function (i) {
        return (i < 10 ? '0' : '') + i
    };
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
        switch (a) {
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

//多选按钮判断
function ck() {
    var checkCount = $("input[name='chickes']:checked").length;
    if (checkCount == 0) {
        swal("请选择一个");
    } else if (checkCount > 1) {
        swal("只能选择一个");
    } else {
        var id = $("input[name='chickes']:checked").attr("id");
        window.location.href = '/contractObject/jumpUpdataContract?id=' + id;
    }
}
function additem() {
    var checkCount = $("input[name='chickes']:checked").length;
    if (checkCount == 0) {
        swal("请选择一个");
    } else if (checkCount > 1) {
        swal("只能选择一个");
    } else {
        var state = $("input[name='chickes']:checked").attr("data-state");
        if ("审核未通过" == state) {
            swal("该合同不能物品添置");
            return;
        }
        var cno = $("input[name='chickes']:checked").attr("data-cno");
        var code = $("input[name='chickes']:checked").attr("data-code");
        window.location.href = '/contractObject/jumpItemAdd?contractObject_No=' + cno + '&hicode=' + code;
    }
}

function add() {
    functionIfram('/customer/customerEdit', '增加客户', _title);
}

/** 物业交接*/
function wyjj(obj) {
    var checkCount = $("input[name='chickes']:checked").length;
    if (checkCount == 0) {
        swal("请选择一个");
    } else if (checkCount > 1) {
        swal("只能选择一个");
    } else {
        var state = $("input[name='chickes']:checked").attr("data-state");
        if (state == "编辑") {
            var cno = $("input[name='chickes']:checked").attr("data-cno");
            var code = $("input[name='chickes']:checked").attr("data-code");
            window.location.href = '/transferKeep/transfer?contractObject_No=' + cno + '&hicode=' + code;
        } else {
            swal("该合同不能物业交接");
        }
    }
}

function hrefClick(ids) {
	
//    window.parent.href_mo($(ids).attr("data-type"), "客户管理", "客户信息");
	var url = $(ids).attr("data-type");
	var cc_code = url.substring(url.indexOf("cc_code=") + 8);
	// 发送请求
	$.ajax({
		type : "POST",
		url : "/customer/checkBlackList",
		data : {
			cc_code : cc_code
		},
		dataType : "json",
		success : function(result){
			if(result.isBlack == false){
				swal({  
                    title: "确认继续?",  
                    text: "请注意，该客户为公司黑名单客户!",  
                    type: "warning",  
                    showCancelButton: true,  
                    confirmButtonColor: "#DD6B55",  
                    showConfirmButton: true,  
                    showCancelButton: true },  
                function (isConfirm) {  
                    if (isConfirm) {  
                    	window.parent.href_mo($(ids).attr("data-type"), "客户管理", "客户信息");
                    } else {  
                    }  
                });  
			}else{
				window.parent.href_mo($(ids).attr("data-type"), "客户管理", "客户信息");
			}
		}
	});
}

function hrefClick1(ids) {
    window.parent.href_mo($(ids).attr("data-type"), "房源信息", "库存房源");
}
