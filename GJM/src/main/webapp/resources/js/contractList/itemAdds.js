var selectHouseIntention = null;
var i_id = null;
var contractObjectType = null;
$(function () {
    $(".broadband").hide();
    $(".insurance").hide();
    selectHouseTypeParent2();
    $(".itemsNameConten").hide();

    $(".itemsNameConten").click(function (event) {
        $(".itemsNameConten").hide();
    });

    selectItemsRelationList();
    selectInventoryList();

    //新添加采购单
    $('.cd-popup-trigger3').on('click', function (event) {
        var code = "PUR";
        var date = new Date();
        code = code + date.getTime();//得到当前时间戳
        code = code + Math.round(10000 * Math.random());//随机4位整数
        window.parent.href_mo('/purchaseOrder/addPurchaseOrder?pur_code=' + code + '&cno_code=' + getUrlParam('con_code'), "新增采购", "物品管理");
    });

    //默认宽带经办人，为当前登录人
    $("#bc_agent").val($.cookie("em_name"));
    navmuen();
})

/**
 * 查找物品类型---物品库存添加
 * @param obj
 */
function selectHouseTypeParent2() {
    $.ajax({
        type: "POST",
        url: "/itemManage/selectHouseTypeParentID2",
        data: null,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            var html = "<option value=''>--请选择--</option>";
            $.each(result.houseTypeList2, function (index, item) {
                html = html + "<option value='" + item.ht_name + "'>" + item.ht_name + "</option>";
            });
            $("#art_type").append(html);
        }
    });

}

/**
 * 查找物品类型---物品库存添加
 * @param obj
 */
function selectHouseTypeParent3(obj) {
    $("#type_name").val(obj);
    selectHouseIntention = $.Deferred();
    var sizeCount = 10;
    if (returnNumber($.cookie('userSize')) <= 0) {
        sizeCount = $.cookie('userSize');
    } else {
        $.cookie("userSize", sizeCount, {expires: 7});
    }
    if ($("#sizeCount input").val() != null) {
        sizeCount = $("#sizeCount input").val();
        $.cookie("userSize", sizeCount, {expires: 7});
    }
    $.ajax({
        type: "POST",
        url: "/itemManage/selectItemsInvNameList",
        data: "pageSize=" + $.cookie('userSize') + "&pageNo=" + $("#Num").text() + "&oldpageSize=" + $.cookie('userSize') + "&inv_type=" + obj,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.ItemsList != null) {
                var html = "";
            } else {
                var html = "<tr><td><input value='无' id=''  name='' placeholder='请输入..' onclick='selectItemsName(this.id,this.value)' class='trName' readonly='readonly'></td></tr>";
            }

            $(".namesCount tbody").empty();
            $.each(result.ItemsList, function (idx, ord) {
//				var tts = format(ord.pur_addTime, 'yyyy-MM-dd');
                var type = "";
                if (ord.inv_on == 0) {
                    type = "新";
                } else if (ord.inv_on == 1) {
                    type = "旧";
                }
                html = html + "<tr><td><input value='" + ord.inv_name + "(" + type + ")' id='" + ord.inv_code + "' name='" + ord._inv_price + "' placeholder='请输入..' onclick='selectItemsName(this.id,this.value,this.name)' class='trName' readonly='readonly' style='padding-left:10px;'></td></tr>";
            })
            $(".itemsNameConten .namesCount tbody").append(html);
            $("#sizeNum").text(result.pageModel.totalPage);
            $("#nums").text(result.pageModel.totalRecords);
            $("#data").data("pageCount", $.cookie('userSize'));
            selectHouseIntention.resolve();
//        	$(".itemsNameConten").show();
        }
    });

    $.when(selectHouseIntention).done(function () {
        page();
    });

}

/**
 * 获取物品名称List
 */
function getItemsNames() {
    if ($(".itemsNameConten").css("display") == "block") {
        $(".itemsNameConten").css("display", "none");
    } else {
        $(".itemsNameConten").css("display", "block");
    }
}

/**
 * 选择物品名称
 * @param obj
 * @param names
 */
function selectItemsName(obj, names, name) {
    $(".itemsNameConten").hide();
    $("#inv_code").val(obj);
    $("#art_name").val(names);
    $("#inv_price").val(name);

}


/**
 * 合同物品添置
 */
function addItemsRelation() {
    if ($("#inv_code").val() == null || $("#inv_code").val() == "" || $("#ir_isCalAchi").val() == null || $("#ir_isCalAchi").val() == "") {
        $.jBox.tip("请将带*的内容完善");
        return;
    }
    $.ajax({
        type: "POST",
        url: "/itemManage/addItemsInvtortyOne",
        data: "contractObject_code=" + getUrlParam("con_code") + "&hi_code=" + getUrlParam("hicode") + "&inv_code=" + $("#inv_code").val() + "&ir_isCalAchi=" + $("#ir_isCalAchi").val(),
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.message == "success") {
                $.jBox.tip("添加成功");
//		    		$("#itemList").empty();
                var calach = "";
                if (result.itemsRelation.ir_isCalAchi == 0) {
                    calach = "否";
                } else if (result.itemsRelation.ir_isCalAchi == 1) {
                    calach = "是";
                }
//		    		var data = new Date();
//		    		$("#itemList").append("<tr>"+
//							+"<td>"+$("#art_type").val()+"</td><td>"+$("#art_name").val()+"</td>"
//							+"<td>"+$("#inv_price").val()+"</td>"
//							+"<td>"+calach+"</td><td>"+format(data, 'yyyy-MM-dd')+"</td></tr>");
                selectItemsRelationList();

            }
        }
    });

}


/**
 * 合同已添加物品类型
 */
function selectItemsRelationList() {
    $.ajax({
        type: "POST",
        url: "/itemManage/selectItemsRelationList",
        data: "contractObject_code=" + getUrlParam("con_code"),
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            contractObjectType = result.contractObject.contractObject_Type;
            $("#contractObjectType").text(result.contractObject.contractObject_Type);
            $("#contractObjectNo").text(" NO."+result.contractObject.contractObject_No);

            $("#jumpItemAddHref").attr("href","/contractObject/jumpItemAdd?con_code="+getUrlParam("con_code")+"&hicode="+getUrlParam("hicode")+"")

            if (result.message == 1) {
                $("#itemList").empty();
                $.each(result.reList, function (index, item) {
                    var calach = "";
                    if (item.ir_isCalAchi == 0) {
                        calach = "否";
                    } else if (item.ir_isCalAchi == 1) {
                        calach = "是";
                    }
                    $("#itemList").append("<tr>"
                        + "<td>" + item.inv_name + "</td><td>" + item.inv_type + "</td>"
                        + "<td>" + item.inv_price + "</td>"
                        + "<td>" + calach + "</td><td>" + format(item.ir_addDate, 'yyyy-MM-dd') + "</td>"
                        + "<td><input type='button' value='解绑' class='irStateButton' id='" + item.inv_code + "' name='ir_state' onclick='updateIrState(this.id," + item.ir_isCalAchi + "," + item.inv_price + ")'"
                        + " style='border-radius:20px;width:50px;height:25px;line-height:25px;border:none;'></td></tr>");
                });
            } else {
                $("#itemList").html('<tr><td colspan="4"><div style="text-align: left;padding-left: 10px;">暂无数据</div></td></tr>');
            }
        }
    });

}


/**
 * 查找该合同的采购单物品
 * @param obj
 */
function selectInventoryList() {
    $.ajax({
        type: "POST",
        url: "/purchaseOrder/selectInventory",
        data: "pur_addres=" + getUrlParam("con_code"),
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            if (result.message == "success") {
//		    		$(".purchaseOrder").show();
                $("#purTitle").show();
                $("#purCount").show();
                $(".purchaseOrder table tbody").empty();
                var html = "";
                $.each(result.vlist, function (index, item) {
                    html = html + "<tr><td><input name='chickes' value='" + item.inv_code + "'  type='checkbox' id='" + item.inv_id + "' style='width:17px;'/></td>"
                        + "<td>" + item.inv_name + "</td>"
                        + "<td>" + item.inv_type + "</td>"
                        + "<td>" + item.inv_price + "</td>"
                        + "<td>1</td>"
                        + "<td><label class='common-checkbox ' style='margin-left: 0px;top:0px;'>"
                        + "<input type='radio' name='ir_isCalAchi" + item.inv_id + "' value='0'  >否</label>"
                        + "<label class='common-checkbox common-checkbox-checked' style='top:0px;'>"
                        + "<input type='radio' name='ir_isCalAchi" + item.inv_id + "'  value='1' checked >是</label>"
                        + "</td></tr>";

                });
                html = html + "<tr style='height:60px;'><td colspan='6' ><input type='submit' value='一键添加' onclick='addItemsRelationList()' style='width: 80px;height: 30px;background-color: #d9534f;color: #fff;'></td></tr>"
                $(".purchaseOrder table tbody").append(html);

            } else {
//		    		$(".purchaseOrder").hide();
                $("#purTitle").hide();
                $("#purCount").hide();
            }
        }
    });

}

/**
 * 物品解除绑定
 * @param inv_code
 */
function updateIrState(inv_code, ir_isCalAchi, inv_price) {
    $.ajax({
        type: "POST",
        url: "/itemManage/updateItemsRelationState",
        data: "inv_code=" + inv_code + "&hi_code=" + getUrlParam("hicode") + "&contractObject_code=" + getUrlParam("con_code")
        + "&ir_isCalAchi=" + ir_isCalAchi + "&inv_price=" + inv_price,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.message == "success") {
                $.jBox.tip("物品解绑成功");
                selectItemsRelationList();//初始化物品添置
                selectInventoryList();//初始化采购单
            }
        }
    });
}


//var a = [];
///**
// * 选中提交
// * @param obj
// */
//function selPurId(obj){
////	var as = $("input[name='chickes']:checked");
////	for (var int = 0; int < as.length; int++) {
////		alert("code = " + as[int].value + "  chechked = " + $("input[name='ir_isCalAchi"+as[int].id+"']:checked").val()  );
////	}
//	
////	if(document.getElementById(obj).checked){
////		a[$("#"+obj).val()] = $("input[name='ir_isCalAchi"+obj+"']:checked").val();
////	}else{
////		delete a[$("#"+obj).val()];
////	}
//}

/**
 * 全选
 */
function checkAll() {
    var al = $("input[name='chickes']");
    if (document.getElementById("check_all").checked) {
        for (var int = 0; int < al.length; int++) {
            al[int].checked = true;
//			selPurId(al[int].id);
        }
    } else {
        for (var int = 0; int < al.length; int++) {
            al[int].checked = false;
//			selPurId(al[int].id);
        }
    }

}


var relation = {};

/**
 * 合同添加物品List
 */
function addItemsRelationList() {
    relation = {};
    var as = $("input[name='chickes']:checked");
    for (var int = 0; int < as.length; int++) {
        relation["reList[" + int + "].inv_code"] = as[int].value; //物品唯一code
        relation["reList[" + int + "].ir_isCalAchi"] = $("input[name='ir_isCalAchi" + as[int].id + "']:checked").val(); //是否扣除业绩0：不扣；1：扣除
        relation["reList[" + int + "].hi_code"] = getUrlParam("hicode"); //合同编号
        relation["reList[" + int + "].contractObject_code"] = getUrlParam("con_code"); //房屋编号
    }

    $.ajax({
        type: "POST",
        url: "/itemManage/addItemsRelationList",
        data: relation,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.message == "success") {
                $.jBox.tip("添加成功");
                document.getElementById("check_all").checked = false;
                selectItemsRelationList();//初始化物品添置
                selectInventoryList();//初始化采购单

            }
        }
    });
}


//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}

/* =======================================页面分页============================================== */

//判断页数
function page() {
    // 开始的页数样式
    if ($("#sizeNum").text() <= 5) {
        $(".paginList").html("<li class='paginItem'><a href='javascript:up();'><span class='pagepre' id='up'></span></a></li>");
//		for(var i=1; i<=$("#sizeNum").text(); i++){
//			$(".paginList").append("<li id='paginList_"+ i +"' class='paginItem'><a href='javascript:li("+ i +");'>"+ i +"</a></li>");
//		}
        $(".paginList").append("<li class='paginItem' style='margin-right: 5px;'><a href='javascript:down();' style='border-left: 1px solid #ddd;margin-left:5px;'><span class='pagenxt' id='down'></span></a></li>");
//		$(".paginList").append("<li id='sizeCount'><input type='text' onkeyup='this.value=this.value.replace(/[^0-9]\D*$/,\"\")' value='"+ $("#data").data("pageCount")  +"' placeholder='请输入条数' /></li>");
//		$(".paginList").append("<li class='paginItem'><a href='javascript:data();'>设置</a></li>");
    } else {
        if ($("#Num").text() <= 5) {
            $(".paginList").html("<li class='paginItem'><a href='javascript:up();'><span class='pagepre' id='up'></span></a></li>");
            for (var i = 1; i <= 5; i++) {
                $(".paginList").append("<li id='paginList_" + i + "' class='paginItem' ><a href='javascript:li(" + i + ");'>" + i + "</a></li>");
            }
            $(".paginList").append("<li class='paginItem' style='margin-right: 5px;'><a href='javascript:down();' style='border-left: 1px solid #ddd;margin-left:5px;'><span class='pagenxt' id='down'></span></a></li>");
//			$(".paginList").append("<li id='sizeCount'><input type='text' onkeyup='this.value=this.value.replace(/[^0-9]\D*$/,\"\")' value='"+ $("#data").data("pageCount") +"' placeholder='请输入条数' /></li>");
//			$(".paginList").append("<li class='paginItem'><a href='javascript:data();'>设置</a></li>");
        }
    }
    // end

    // 样式变化
    $(".paginList li").each(function (idx) {
        $(this).attr("class", "paginItem");
    });
    $("#paginList_" + $("#Num").text() + "").attr("class", "paginItem current");
    // end

    // 判断最后一页和第一页的样式
    if ($("#Num").text() == $("#sizeNum").text() && $("#sizeNum").text() != "1") {
        $(".paginItem span[id=down]").css("background", "url(/resources/image/next_1.gif) no-repeat center center");
        $(".paginItem span[id=up]").css("background", "url(/resources/image/pre.gif) no-repeat center center");
    } else if ($("#Num").text() == "1" && $("#sizeNum").text() != "1") {
        $(".paginItem span[id=down]").css("background", "url(/resources/image/next.gif) no-repeat center center");
        $(".paginItem span[id=up]").css("background", "url(/resources/image/pre_1.gif) no-repeat center center");
    } else if ($("#Num").text() == "1" && $("#sizeNum").text() == "1") {
        $(".paginItem span[id=down]").css("background", "url(/resources/image/next_1.gif) no-repeat center center");
        $(".paginItem span[id=up]").css("background", "url(/resources/image/pre_1.gif) no-repeat center center");
    } else if ($("#Num").text() != "1" && $("#Num").text() != $("#sizeNum").text()) {
        $(".paginItem span[id=down]").css("background", "url(/resources/image/next.gif) no-repeat center center");
        $(".paginItem span[id=up]").css("background", "url(/resources/image/pre.gif) no-repeat center center");
    }
    // end

    // 间隔变色
    $('.tablelist tbody tr:odd').addClass('odd');
}

/* 点击LI分页读取数据 */
function li(id) {

    $("#Num").text(id);
    $("#paginList_" + id + " a").attr("class", "paginItem");
    data();
}

function up() {
    // 获取当前页数
    var pageMum = parseInt($("#Num").text());
    // 最大页数
    var pageSize = parseInt($("#sizeNum").text());
    if (pageMum > 1) {
        if ((pageMum - 1) % 5 == 0) {
            $(".paginList").html("<li class='paginItem'><a href='javascript:up();'><span class='pagepre' id='up'></span></a></li>");
            for (var i = 5; i > 0; i--) {
                $(".paginList").append("<li id='paginList_" + (pageMum - i) + "' class='paginItem'><a href='javascript:li(" + (pageMum - i) + ");'>" + (pageMum - i) + "</a></li>");
            }
            $(".paginList").append("<li class='paginItem'><a href='javascript:down();'><span class='pagenxt' id='down'></span></a></li>");
            $(".paginList").append("<li id='sizeCount'><input type='text' onkeyup='this.value=this.value.replace(/[^0-9]\D*$/,\"\")' value='" + $("#data").data("pageCount") + "' placeholder='请输入条数' /></li>");
            $(".paginList").append("<li class='paginItem'><a href='javascript:data();'>设置</a></li>");
        }
        $("#Num").text(pageMum - 1);
        data();
    }
}

function down() {
    // 获取当前页数
    var pageMum = parseInt($("#Num").text());
    // 最大页数
    var pageSize = parseInt($("#sizeNum").text());
    if (pageMum < pageSize) {
        if ((pageMum + 5) < pageSize) {
            if (pageMum % 5 == 0) {

                $(".paginList").html("<li class='paginItem'><a href='javascript:up();'><span class='pagepre' id='up'></span></a></li>");
                for (var i = 1; i <= 5; i++) {
                    $(".paginList").append("<li id='paginList_" + (pageMum + i) + "' class='paginItem'><a href='javascript:li(" + (pageMum + i) + ");'>" + (pageMum + i) + "</a></li>");
                }
                $(".paginList").append("<li class='paginItem'><a href='javascript:down();'><span class='pagenxt' id='down'></span></a></li>");
                $(".paginList").append("<li id='sizeCount'><input type='text' onkeyup='this.value=this.value.replace(/[^0-9]\D*$/,\"\")' value='" + $("#data").data("pageCount") + "' placeholder='请输入条数' /></li>");
                $(".paginList").append("<li class='paginItem'><a href='javascript:data();'>设置</a></li>");
            }
            $("#Num").text(pageMum + 1);
            data();
        } else {
            if (pageMum % 5 == 0) {
                $(".paginList").html("<li class='paginItem'><a href='javascript:up();'><span class='pagepre' id='up'></span></a></li>");
                for (var i = 4; i >= 0; i--) {
                    $(".paginList").append("<li id='paginList_" + (pageSize - i) + "' class='paginItem'><a href='javascript:li(" + (pageSize - i) + ");'>" + (pageSize - i) + "</a></li>");
                }
                $(".paginList").append("<li class='paginItem'><a href='javascript:down();'><span class='pagenxt' id='down'></span></a></li>");
                $(".paginList").append("<li id='sizeCount'><input type='text' onkeyup='this.value=this.value.replace(/[^0-9]\D*$/,\"\")' value='" + $("#data").data("pageCount") + "' placeholder='请输入条数' /></li>");
                $(".paginList").append("<li class='paginItem'><a href='javascript:data();'>设置</a></li>");
            }
            $("#Num").text(pageMum + 1);
            data();
        }
    }
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

//跳转修改推荐群体界面
//多选按钮判断
function query() {
    var len = $("input[name='chickes']:checked").length;
    if (len == 0) {
        swal('请选择一个！');
    } else if (len > 1) {
        swal('只能选择一个！');
    } else {
        var id = $("input[name='chickes']:checked").val();
        functionIfram('/serve/showListInfo?id=' + id, '查看服务', '服务处理');
    }
}


//

function returnNumber(str) {
    return (str == null || str == "" || typeof(str) == "undefined") ? 0 : parseInt(str);
}


/*提交添加宽带*/
function addBroadbandConfig() {
    var bc_brand = $("#bc_brand").val();
    var bc_type = $("#bc_type").val();
    var bc_bandwidth = $("#bc_bandwidth").val();
    var bc_cost = $("#bc_cost").val();
    var bc_cname = $("#bc_cname").val();
    var bc_IDNumber = $("#bc_IDNumber").val();
    var bc_account = $("#bc_account").val();
    var bc_password = $("#bc_password").val();
    var bc_installationTime = $("#bc_installationTime").val();
    var bc_equipmentInfo = $("#bc_equipmentInfo").val();
    var bc_router = $("#bc_router").val();
    var bc_telephone = $("#bc_telephone").val();
    var bc_customerManager = $("#bc_customerManager").val();
    var bc_isUsed = $("input[name=bc_isUsed]:checked").val();
    var bc_agent = $("#bc_agent").val();
    var bc_remarks = $("#bc_remarks").val();
    var bc_term = $("#bc_term").val();
    var bc_broadbandState = $("#bc_broadbandState").val();
    var bc_installType = $("#bc_installType").val();
    if (isEmpty(bc_brand) || isEmpty(bc_type) || isEmpty(bc_bandwidth) || isEmpty(bc_cost)  || isEmpty(bc_account)) {
        $.jBox.tip("带*号的必填")
        return;
    }
    $.ajax({
        url: "/itemManage/addBroadbandConfig",
        type: "POST",
        data: {
            bc_brand: bc_brand,
            bc_type: bc_type,
            bc_bandwidth: bc_bandwidth,
            bc_cost: bc_cost,
            bc_cname: bc_cname,
            bc_IDNumber: bc_IDNumber,
            bc_account: bc_account,
            bc_password: bc_password,
            bc_installationTime: bc_installationTime,
            bc_equipmentInfo: bc_equipmentInfo,
            bc_router: bc_router,
            bc_telephone: bc_telephone,
            bc_customerManager: bc_customerManager,
            bc_isUsed: bc_isUsed,
            bc_agent: bc_agent,
            bc_remarks: bc_remarks,
            bc_term: bc_term,
            bc_installType: bc_installType,
            bc_broadbandState: bc_broadbandState,
            contractObject_code: getUrlParam("con_code"),
            hi_code: getUrlParam("hicode")
        },
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
    }).done(function (result) {
        if (result.code == 200) {
            $.jBox.tip(result.msg);
            InitBroadbandAgent();
        } else {
            $.jBox.tip(result.msg);
        }
    })
}


/*提交修改宽带*/
function updateBroadbandConfig() {
    var bc_brand = $("#bc_brand").val();
    var bc_type = $("#bc_type").val();
    var bc_bandwidth = $("#bc_bandwidth").val();
    var bc_cost = $("#bc_cost").val();
    var bc_cname = $("#bc_cname").val();
    var bc_IDNumber = $("#bc_IDNumber").val();
    var bc_account = $("#bc_account").val();
    var bc_password = $("#bc_password").val();
    var bc_installationTime = $("#bc_installationTime").val();
    var bc_equipmentInfo = $("#bc_equipmentInfo").val();
    var bc_router = $("#bc_router").val();
    var bc_telephone = $("#bc_telephone").val();
    var bc_customerManager = $("#bc_customerManager").val();
    var bc_isUsed = $("input[name=bc_isUsed]:checked").val();
    var bc_agent = $("#bc_agent").val();
    var bc_remarks = $("#bc_remarks").val();
    var bc_term = $("#bc_term").val();
    var bc_broadbandState = $("#bc_broadbandState").val();
    var bc_installType = $("#bc_installType").val();
    if (isEmpty(bc_brand) || isEmpty(bc_type) || isEmpty(bc_bandwidth) || isEmpty(bc_cost)  || isEmpty(bc_account)) {
        $.jBox.tip("带*号的必填")
        return;
    }
    $.ajax({
        url: "/itemManage/updateBroadbandConfig",
        type: "POST",
        data: {
            bc_id: bcId,
            bc_brand: bc_brand,
            bc_type: bc_type,
            bc_bandwidth: bc_bandwidth,
            bc_cost: bc_cost,
            bc_cname: bc_cname,
            bc_IDNumber: bc_IDNumber,
            bc_account: bc_account,
            bc_password: bc_password,
            bc_installationTime: bc_installationTime,
            bc_equipmentInfo: bc_equipmentInfo,
            bc_router: bc_router,
            bc_telephone: bc_telephone,
            bc_customerManager: bc_customerManager,
            bc_isUsed: bc_isUsed,
            bc_agent: bc_agent,
            bc_remarks: bc_remarks,
            bc_term: bc_term,
            bc_installType: bc_installType,
            bc_broadbandState: bc_broadbandState,
        },
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
    }).done(function (result) {
        if (result.code == 200) {
            $.jBox.tip(result.msg);
            InitBroadbandAgent();
        } else {
            $.jBox.tip(result.msg);
        }
    })
}

//时间日期插件
function dateUtil() {
    var date = new Date(returnDate(new Date()))
    data = date.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
    WdatePicker({
        /*   minDate : new Date(),
           maxDate : date.setFullYear(date.getFullYear(), date.getMonth()+3, date.getDate()),*/
    });
}


/**
 * 切换导航菜单
 */
function navmuen() {
    $(".visitedes").click(function () {
        $(".visitedes").removeClass("on");
        $(this).addClass("on");
        if ($(this).attr("class") == "visitedes tres on") {
            $(".showHide").hide();
            $(".res").show();
        }
        if ($(this).attr("class") == "visitedes tbroadband on") {
            $(".showHide").hide();
            $(".broadband").show();
            InitBroadbandAgent();
        }
        if ($(this).attr("class") == "visitedes tinsurance on") {
            $(".showHide").hide();
            $(".insurance").show();
            getInsurance();
        }
    })
}

var cdata=null;
var bcId=null;
/**
 * 获取宽带配置数据
 * @constructor
 */
function InitBroadbandAgent() {
    $.ajax({
        url: "/itemManage/InitBroadbandAgent",
        type: "get",
        data: {
            contractObject_code: getUrlParam("con_code"),
            hi_code: getUrlParam("hicode")
        },
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
    }).done(function (result) {
        if (result.code == 200) {
            var item = result.data.broadbandConfig;
             bcId = item.bc_id;
            cdata=item;
            var htmlInfo = "";
            htmlInfo += "<div style='width: 940px'>";
            htmlInfo += "        <dl>";
            htmlInfo += "        <dt>安装类型：</dt>";
            htmlInfo += "    <dd style='color:#000;line-height:35px'>" + returnBcInstallType(returnValue(item.bc_installType)).text+ "</dd>";
            htmlInfo += "        </dl>";
            htmlInfo += "        <dl>";
            htmlInfo += "        <dt>宽带品牌：</dt>";
            htmlInfo += "    <dd style='color:#000;line-height:35px'>" + returnValue(item.bc_brand) + "</dd>";
            htmlInfo += "        </dl>";
            htmlInfo += "        <dl>";
            htmlInfo += "        <dt>接入类型：</dt>";
            htmlInfo += "    <dd style='color:#000;line-height:35px'>" + returnValue(item.bc_type) + "</dd>";
            htmlInfo += "        </dl>";
            htmlInfo += "        <dl>";
            htmlInfo += "        <dt>宽带状态：</dt>";
            htmlInfo += "    <dd style='color:#000;line-height:35px'>" + returnBcBroadbandState(returnValue(item.bc_broadbandState)).text + "</dd>";
            htmlInfo += "        </dl>";
            htmlInfo += "        <dl>";
            htmlInfo += "        <dt>资费：</dt>";
            htmlInfo += "    <dd style='color:#000;line-height:35px'>" + returnValue(item.bc_cost) + "元</dd>";
            htmlInfo += "        </dl>";
            htmlInfo += "        <dl>";
            htmlInfo += "        <dt>带宽：</dt>";
            htmlInfo += "    <dd style='color:#000;line-height:35px'>" + returnValue(item.bc_bandwidth) + "M</dd>";
            htmlInfo += "        </dl>";
            htmlInfo += "        <dl>";
            htmlInfo += "        <dt>办理时间：</dt>";
            htmlInfo += "    <dd style='color:#000;line-height:35px'>" + format(item.bc_installationTime, "yyyy-MM-dd") + "</dd>";
            htmlInfo += "        </dl>";
            htmlInfo += "        <dl>";
            htmlInfo += "        <dt>承诺期(年)：：</dt>";
            htmlInfo += "    <dd style='color:#000;line-height:35px'>" + returnValue(item.bc_term) + " 年</dd>";
            htmlInfo += "        </dl>";
            htmlInfo += "        <dl>";
            htmlInfo += "        <dt>帐号：</dt>";
            htmlInfo += "    <dd style='color:#000;line-height:35px'>" + returnValue(item.bc_account) + "</dd>";
            htmlInfo += "        </dl>";
            htmlInfo += "        <dl>";
            htmlInfo += "        <dt>密码：</dt>";
            htmlInfo += "    <dd style='color:#000;line-height:35px'>" + returnValue(item.bc_password) + "</dd>";
            htmlInfo += "        </dl>";
            htmlInfo += "        <dl>";
            htmlInfo += "        <dt>客户姓名：</dt>";
            htmlInfo += "    <dd style='color:#000;line-height:35px'>" + returnValue(item.bc_cname) + "</dd>";
            htmlInfo += "        </dl>";
            htmlInfo += "        <dl>";
            htmlInfo += "        <dt>证件号：</dt>";
            htmlInfo += "    <dd style='color:#000;line-height:35px'>" + returnValue(item.bc_IDNumber) + "</dd>";
            htmlInfo += "        </dl>";
            htmlInfo += "        <dl>";
            htmlInfo += "        <dt>经理电话：</dt>";
            htmlInfo += "    <dd style='color:#000;line-height:35px'>" + returnValue(item.bc_telephone) + "</dd>";
            htmlInfo += "        </dl>";
            htmlInfo += "        <dl>";
            htmlInfo += "        <dt>客户经理：</dt>";
            htmlInfo += "    <dd style='color:#000;line-height:35px'>" + returnValue(item.bc_customerManager) + "</dd>";
            htmlInfo += "        </dl>";
            htmlInfo += "        <dl>";
            htmlInfo += "        <dt>经办人：</dt>";
            htmlInfo += "    <dd style='color:#000;line-height:35px'>" + returnValue(item.bc_agent) + "</dd>";
            htmlInfo += "        </dl>";
            htmlInfo += "        <dl>";
            htmlInfo += "        <dt>是否使用：</dt>";
            htmlInfo += "    <dd style='color:#000;line-height:35px'>" + (returnValue(item.bc_isUsed) == 0 ? "否" : "是") + "</dd>";
            htmlInfo += "        </dl>";
            htmlInfo += "        <div style='height: 40px'></div>";
            htmlInfo += "        <dl style='height: auto;width: 826px'>";
            htmlInfo += "        <dt style='height: auto'>设备信息：</dt>";
            htmlInfo += "    <dd style='color:#000;width: 740px;height: auto;margin-top: 8px'>" + returnValue(item.bc_equipmentInfo) + "</dd>";
            htmlInfo += "    </dl>";
            htmlInfo += "    <div style='height: 40px'></div>";
            htmlInfo += "        <dl style='height: auto;width: 826px'>";
            htmlInfo += "        <dt style='height: auto'>路由器配置：</dt>";
            htmlInfo += "    <dd style='color:#000;width: 740px;height: auto;margin-top: 8px'>" + returnValue(item.bc_router) + "</dd>";
            htmlInfo += "    </dl>";
            htmlInfo += "    <div style='height: 40px'></div>";
            htmlInfo += "        <dl style='height: auto;width: 826px'>";
            htmlInfo += "        <dt style='height: auto'>备注：</dt>";
            htmlInfo += "    <dd style='color:#000;width: 740px;height: auto;margin-top: 8px'>" + returnValue(item.bc_remarks) + "</dd>";
            htmlInfo += "    </dl>";
            htmlInfo += "    <div style='height: 10px'></div>";
            htmlInfo += "    <dl style='margin-top: 20px'>";
            htmlInfo += "        <dt>";
            htmlInfo += "        <input id='Broadband_Config' type='button' class='item-top' value='修改' onclick='addOrUpdataBroad()' style='width: 80px;margin-left: 85px;text-indent: 0px;border:none;background-color: #3498DB'>";
            htmlInfo += "        </dt>";
            htmlInfo += "        </dl>";
            htmlInfo += "        </div>";
            htmlInfo += "        <div></div>";
            $(".broadband").html(htmlInfo);
        }else {
            addOrUpdataBroad();
        }
    })
}

//添加修改宽带html
function addOrUpdataBroad() {
    var htm = "";
    htm += "<div style='width: 1300px;'>";
    htm += "       <dl>";
    htm += "       <dt><em>*</em>安装类型：</dt>";
    htm += "   <dd>";
    htm += "   <select style='text-align: center;' id='bc_installType'>";
    htm += "       <option value='0'>公司新装</option>";
    htm += "       <option value='1'>公司迁移</option>";
    htm += "       <option value='2'>客户新装</option>";
    htm += "       <option value='3'>客户迁移</option>";
    htm += "       </select>";
    htm += "       </dd>";
    htm += "       </dl>";
    htm += "       <dl>";
    htm += "       <dt><em>*</em>宽带品牌：</dt>";
    htm += "   <dd>";
    htm += "   <select style='text-align: center;' id='bc_brand'>";
    htm += "       <option>电信宽带</option>";
    htm += "       <option>移动宽带</option>";
    htm += "       <option>联通宽带</option>";
    htm += "       <option>重庆有线</option>";
    htm += "       <option>长城宽带</option>";
    htm += "       <option>其它</option>";
    htm += "       </select>";
    htm += "       </dd>";
    htm += "       </dl>";
    htm += "       <dl>";
    htm += "       <dt><em>*</em>接入类型：</dt>";
    htm += "   <dd>";
    htm += "   <select style='text-align: center;' id='bc_type'>";
    htm += "       <option>光纤</option>";
    htm += "       <option>网线/电话线</option>";
    htm += "       <option>广电</option>";
    htm += "       </select>";
    htm += "       </dd>";
    htm += "       </dl>";
    htm += "       <dl>";
    htm += "       <dt><em>*</em>宽带状态：</dt>";
    htm += "   <dd>";
    htm += "   <select style='text-align: center;' id='bc_broadbandState'>";
    htm += "       <option value='0'>正常</option>";
    htm += "       <option value='1'>欠费</option>";
    htm += "       <option value='2'>暂停</option>";
    htm += "       </select>";
    htm += "       </dd>";
    htm += "       </dl>";

    htm += "       <div style='height: 55px'></div>";
    htm += "       <dl>";
    htm += "       <dt><em>*</em>资费(元)：</dt>";
    htm += "   <dd>";
    htm += "   <input  type='text' value='' id='bc_cost' name='' placeholder='资费（元）' />";
    htm += "       </dd>";
    htm += "       </dl>";
    htm += "       <dl>";
    htm += "       <dt><em>*</em>带宽(M)：</dt>";
    htm += "   <dd>";
    htm += "   <input type='text' value='' id='bc_bandwidth' name='' placeholder='带宽(M)'/>";
    htm += "       </dd>";
    htm += "       </dl>";
    htm += "       <dl>";
    htm += "       <dt><em>*</em>办理时间：</dt>";
    htm += "   <dd>";
    htm += "   <input type='text' value='' id='bc_installationTime' name='' placeholder='办理时间' readonly='readonly' onfocus='dateUtil()' />";
    htm += "       </dd>";
    htm += "       </dl>";
    htm += "       <dl>";
    htm += "       <dt><em></em>承诺期(年)：</dt>";
    htm += "   <dd>";
    htm += "   <input type='text' value='' id='bc_term' name='' placeholder='承诺期(年)'/>";
    htm += "       </dd>";
    htm += "       </dl>";

    htm += "       <div style='height: 55px'></div>";
    htm += "       <dl>";
    htm += "       <dt><em>*</em>账号：</dt>";
    htm += "   <dd>";
    htm += "   <input type='text' value='' id='bc_account' name='' placeholder='账号' />";
    htm += "       </dd>";
    htm += "       </dl>";
    htm += "       <dl>";
    htm += "       <dt><em></em>密码：</dt>";
    htm += "   <dd>";
    htm += "   <input type='text' value='' id='bc_password' name='' placeholder='密码' />";
    htm += "       </dd>";
    htm += "       </dl>";
    htm += "       <dl>";
    htm += "       <dt><em></em>客户姓名：</dt>";
    htm += "   <dd>";
    htm += "   <input type='text' value='' id='bc_cname' name='' placeholder='客户姓名' />";
    htm += "       </dd>";
    htm += "       </dl>";
    htm += "       <dl>";
    htm += "       <dt><em></em>证件号：</dt>";
    htm += "   <dd>";
    htm += "   <input type='text' value='' id='bc_IDNumber' name='' placeholder='身份证/护照/军官证等' />";
    htm += "       </dd>";
    htm += "       </dl>";

    htm += "       <div style='height: 55px'></div>";

    htm += "       <dl>";
    htm += "       <dt><em></em>经理电话：</dt>";
    htm += "   <dd>";
    htm += "   <input type='text' value='' id='bc_telephone' name='' placeholder='经理电话' />";
    htm += "       </dd>";
    htm += "       </dl>";
    htm += "       <dl>";
    htm += "       <dt><em></em>客户经理：</dt>";
    htm += "   <dd>";
    htm += "   <input type='text' value='' id='bc_customerManager' name='' placeholder='客户经理' />";
    htm += "       </dd>";
    htm += "       </dl>";
    htm += "       <dl>";
    htm += "       <dt><em></em>经办人：</dt>";
    htm += "   <dd>";
    htm += "   <input type='text' value='"+$.cookie("em_name")+"' id='bc_agent' name='' placeholder='经办人' />";
    htm += "       </dd>";
    htm += "       </dl>";
    htm += "       <div style='height: 55px'></div>";
    htm += "       <dl style='height: 100px'>";
    htm += "       <dt><em></em>设备信息：</dt>";
    htm += "   <dd>";
    htm += "   <textarea  id='bc_equipmentInfo' name='bc_equipmentInfo' placeholder='设备信息' style='text-indent: 5px;width: 380px;border-radius: 5px;border-color: #bbb;height: 100px'></textarea>";
    htm += "       </dd>";
    htm += "       </dl>";
    htm += "       <dl style='margin-left: 230px;height: 100px'>";
    htm += "       <dt><em></em>路由器配置：</dt>";
    htm += "   <dd>";
    htm += "   <textarea  id='bc_router' name='bc_router' placeholder='路由器配置' style='text-indent: 5px;width: 380px;height: 100px;border-radius: 5px;border-color: #bbb;'></textarea>";
    htm += "       </dd>";
    htm += "       </dl>";
    htm += "       <div style='height: 120px'></div>";
    htm += "       <dl style='height: 100px'>";
    htm += "       <dt><em></em>备注：</dt>";
    htm += "   <dd>";
    htm += "   <textarea  id='bc_remarks' name='bc_remarks' placeholder='备注' style='text-indent: 5px;width: 380px;border-radius: 5px;border-color: #bbb;height: 100px;'></textarea>";
    htm += "       </dd>";
    htm += "       </dl>";
    htm += "       <div style='height: 120px'></div>";
    htm += "       <dl>";
    htm += "       <dt><em></em>是否使用：</dt>";
    htm += "   <dd>";
    htm += "   <input class='' type='radio' value='1' name='bc_isUsed' style='width: 18px;height:18px;margin-top: 8px;' checked='checked'/>是";
    htm += "       <input type='radio' value='0' name='bc_isUsed' style='width: 18px;margin-left: 20px;height: 18px;margin-top: 8px'/> 否";
    htm += "       </dd>";
    htm += "       </dl>";
    htm += "       <div style='height: 55px'></div>";
    htm += "       <dl>";
    htm += "       <dt>";
    htm += "       <input id='addBroadband'  type='button' class='item-top' value='保存' onclick='addBroadbandConfig()' style='width: 80px;margin-left: 85px;text-indent: 0px;'>";
    htm += "       </dt>";
    htm += "       </dl>";
    if (!isEmpty(cdata)) {
        htm += "        <dl>";
        htm += "        <dt>";
        htm += "        <input  type='button' class='item-top' value='取消' onclick='InitBroadbandAgent()' style='width: 80px;margin-left: -35px;text-indent: 0px;background-color: #ccc;border: none'>";
        htm += "        </dt>";
        htm += "        </dl>";
    }
    htm += "       </div>";
    $(".broadband").html(htm);
    if (!isEmpty(cdata)){
        $("#bc_brand").val(cdata.bc_brand);
        $("#bc_type").val(returnValue(cdata.bc_type));
        $("#bc_bandwidth").val(cdata.bc_bandwidth);
        $("#bc_cost").val(cdata.bc_cost);
        $("#bc_cname").val(cdata.bc_cname);
        $("#bc_IDNumber").val(cdata.bc_IDNumber);
        $("#bc_account").val(cdata.bc_account);
        $("#bc_password").val(cdata.bc_password);
        $("#bc_installationTime").val(format(cdata.bc_installationTime, "yyyy-MM-dd"));
        $("#bc_equipmentInfo").text(cdata.bc_equipmentInfo);
        $("#bc_router").text(cdata.bc_router);
        $("#bc_telephone").val(cdata.bc_telephone);
        $("#bc_customerManager").val(cdata.bc_customerManager);
        $("#bc_agent").val(cdata.bc_agent);
        $("#bc_remarks").text(cdata.bc_remarks);
        $("#bc_term").val(cdata.bc_term);
        $("#bc_installType").val(cdata.bc_installType);
        $("#bc_broadbandState").val(cdata.bc_broadbandState);
        //是否使用
        returnInput("bc_isUsed", cdata.bc_isUsed);
        $("#addBroadband").attr("onclick","updateBroadbandConfig()")
    }
}



//input匹配
function returnInput(name, val) {
    $("input[name=" + name + "]").each(function () {
        if ($(this).val() == val) {
            $(this).attr("checked", "checked");
        }
    });
}

/**
 * 获取房屋和合同下的保险
 */
function getInsurance() {
    $.ajax({
        url: "/itemManage/getInsurance",
        type: "get",
        data: {
            contractObject_code: getUrlParam("con_code"),
            hi_code: getUrlParam("hicode")
        },
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
    }).done(function (result) {
        if (result.code == 200) {
            var isNull = result.data.isNull;
            var data = result.data.insurance;
            var htmlInfo = "";
                if (isNull == 0) {
                    htmlInfo += "<div style='width: 940px'>";
                    htmlInfo += "    <dl id='newInsuranceHtm'>";
                    htmlInfo += "        <dt>";
                    htmlInfo += "        <input type='button' class='item-top' value='新建录入' onclick='newInsurance()' style='width: 80px;margin-left: 85px;text-indent: 0px;border:none;background-color: #3498DB'>";
                    htmlInfo += "        </dt>";
                    htmlInfo += "     </dl>";
                    htmlInfo += "    <div style='height: 40px'></div>";
                    htmlInfo += " </div>";
                }
                $.each(result.data.insurance, function (index, item) {
                    i_id = item.i_id;
                    var i_insuranceNumber= item.i_insuranceNumber;
                    htmlInfo += "<div style='width: 940px'>";
                    if (!isEmpty(item.i_insuranceNumberHead)) {
                        htmlInfo += "        <dl>";
                        htmlInfo += "        <dt>源保单号：</dt>";
                        htmlInfo += "    <dd style='color:#000;line-height:35px'>" + returnValue(item.i_insuranceNumberHead) + "</dd>";
                        htmlInfo += "        </dl>";
                    }
                    htmlInfo += "        <dl>";
                    htmlInfo += "        <dt>保单号：</dt>";
                    htmlInfo += "    <dd style='color:#000;line-height:35px'>" + returnValue(item.i_insuranceNumber) + "</dd>";
                    htmlInfo += "        </dl>";
                    htmlInfo += "        <dl>";
                    htmlInfo += "        <dt>保险公司：</dt>";
                    htmlInfo += "    <dd style='color:#000;line-height:35px'>" + returnValue(item.i_company) + "</dd>";
                    htmlInfo += "        </dl>";
                    htmlInfo += "        <dl>";
                    htmlInfo += "        <dt>生效时间：</dt>";
                    htmlInfo += "    <dd style='color:#000;line-height:35px'>" + format(item.i_insurant_strat, "yyyy-MM-dd") + "</dd>";
                    htmlInfo += "        </dl>";
                    htmlInfo += "        <dl>";
                    htmlInfo += "        <dt>失效日期：</dt>";
                    htmlInfo += "    <dd style='color:#000;line-height:35px'>" + format(item.i_insurant_end, "yyyy-MM-dd") + "</dd>";
                    htmlInfo += "        </dl>";
                    htmlInfo += "        <dl>";
                    htmlInfo += "        <dt>办理日期：</dt>";
                    htmlInfo += "    <dd style='color:#000;line-height:35px'>" + format(item.i_insureDate, "yyyy-MM-dd") + "</dd>";
                    htmlInfo += "        </dl>";
                    htmlInfo += "        <dl>";
                    htmlInfo += "        <dt>保费(元)：</dt>";
                    htmlInfo += "    <dd style='color:#000;line-height:35px'>" + returnValue(item.i_cost) + "元</dd>";
                    htmlInfo += "        </dl>";
                    htmlInfo += "        <dl>";
                    htmlInfo += "        <dt>被保险人：</dt>";
                    htmlInfo += "    <dd style='color:#000;line-height:35px'>" + returnValue(item.i_insurant) + "</dd>";
                    htmlInfo += "        </dl>";
                    htmlInfo += "        <dl>";
                    htmlInfo += "        <dt>证件号：</dt>";
                    htmlInfo += "    <dd style='color:#000;line-height:35px'>" + returnValue(item.i_IDNumber) + "</dd>";
                    htmlInfo += "        </dl>";
                    htmlInfo += "        <dl>";
                    htmlInfo += "        <dt>经办人：</dt>";
                    htmlInfo += "    <dd style='color:#000;line-height:35px'>" + returnValue(item.i_agent) + "</dd>";
                    htmlInfo += "        </dl>";
                    htmlInfo += "        <dl>";
                    htmlInfo += "        <dt>批改：</dt>";
                    htmlInfo += "    <dd style='color:#000;line-height:35px'>" + (returnValue(item.i_isCorrections) == 0 ? "未批改" : "已批改") + "</dd>";
                    htmlInfo += "        </dl>";
                    htmlInfo += "        <div style='height: 40px'></div>";
                    htmlInfo += "        <dl style='height: auto;width: 826px'>";
                    htmlInfo += "        <dt style='height: auto'>理赔情况：</dt>";
                    htmlInfo += "    <dd style='color:#000;width: 740px;height: auto;margin-top: 8px'>" + returnValue(item.i_ClaimSituation) + "</dd>";
                    htmlInfo += "    </dl>";
                    htmlInfo += "    <div style='height: 40px'></div>";
                    htmlInfo += "        <dl style='height: auto;width: 826px'>";
                    htmlInfo += "        <dt style='height: auto'>备注：</dt>";
                    htmlInfo += "    <dd style='color:#000;width: 740px;height: auto;margin-top: 8px'>" + returnValue(item.i_remarks) + "</dd>";
                    htmlInfo += "    </dl>";
                    if(item.i_isCorrections == 0){
                        htmlInfo += "    <div style='height: 10px'></div>";
                        htmlInfo += "    <dl style='margin-top: 20px'>";
                        htmlInfo += "        <dt>";
                        htmlInfo += "        <input id=''  type='button' class='item-top' value='修改' onclick='updataInsurance(\""+item.i_id+"\")' style='width: 80px;margin-left: 85px;text-indent: 0px;border:none;background-color: #3498DB'>";
                        htmlInfo += "        </dt>";
                        htmlInfo += "        </dl>";
                        htmlInfo += "    <dl style='margin-top: 20px'>";
                        htmlInfo += "        <dt>";
                        htmlInfo += "        <input id=''  type='button' class='item-top' value='批改' onclick='correctionsInsuranceHtml(\""+item.i_id+"\")' style='width: 80px;margin-left: -35px;text-indent: 0px;border:none;background-color: #3498DB'>";
                        htmlInfo += "        </dt>";
                        htmlInfo += "        </dl>";
                    }
                    htmlInfo += "        </div>";
                    htmlInfo += " <div id='update_con'></div>";
                })
            $("#insuranceInfo").html(htmlInfo);
        } else {
            $.jBox.tip(result.msg);
        }
    })
}

/**
 *保险新建录入
 */
function addInsurance() {
    var i_insuranceNumber = $("#i_insuranceNumber").val();
    var i_company = $("#i_company").val();
    var i_insureDate = $("#i_insureDate").val();
    var i_insurant = $("#i_insurant").val();
    var i_IDNumber = $("#i_IDNumber").val();
    var i_insurant_strat = $("#i_insurant_strat").val();
    var i_insurant_end = $("#i_insurant_end").val();
    var i_ClaimSituation = $("#i_ClaimSituation").val();
    var i_agent = $("#i_agent").val();
    var i_remarks = $("#i_remarks").val();
    var i_cost = $("#i_cost").val();
    if (isEmpty(i_insuranceNumber) || isEmpty(i_company) || isEmpty(i_insureDate) || isEmpty(i_insurant)
        || isEmpty(i_insurant_strat) || isEmpty(i_insurant_end) || isEmpty(i_agent) || isEmpty(i_IDNumber)) {
        $.jBox.tip("带*号的必填")
        return;
    }
    $.ajax({
        url: "/itemManage/submitInsurance",
        type: "POST",
        data: {
            i_insuranceNumber: i_insuranceNumber,
            i_company: i_company,
            i_insureDates: i_insureDate,
            i_insurant: i_insurant,
            i_IDNumber: i_IDNumber,
            i_insurant_strats: i_insurant_strat,
            i_insurant_ends: i_insurant_end,
            i_ClaimSituation: i_ClaimSituation,
            i_agent: i_agent,
            i_remarks: i_remarks,
            i_cost: i_cost,
            contractObject_code: getUrlParam("con_code"),
            hi_code: getUrlParam("hicode")
        },
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
    }).done(function (result) {
        if (result.code == 200) {
            $.jBox.tip(result.msg);
            getInsurance();
        } else {
            $.jBox.tip(result.msg);
        }
    })
}


/**
 * 新建录入
 */
function newInsurance() {
    var htm = "";
    htm += "    <div id='add_con' style='display:block;width: 1300px;'>";
    //htm += "        <div style='height: 55px'></div>";
    htm += "        <dl>";
    htm += "        <dt><em>*</em>保单号：</dt>";
    htm += "    <dd>";
    htm += "    <input  type='text' value='' id='i_insuranceNumber' name='' placeholder='保单号' />";
    htm += "        </dd>";
    htm += "        </dl>";
    htm += "        <dl>";
    htm += "        <dt><em>*</em>保险公司：</dt>";
    htm += "    <dd>";
    htm += "    <input  type='text' value='太平洋保险' id='i_company' name='' placeholder='保险公司' />";
    htm += "        </dd>";
    htm += "        </dl>";
    htm += "        <dl>";
    htm += "        <dt><em>*</em>生效时间：</dt>";
    htm += "    <dd>";
    htm += "    <input type='text' value='' id='i_insurant_strat' name='' placeholder='生效时间'  readonly='readonly' onfocus='dateUtil()' />";
    htm += "        </dd>";
    htm += "        </dl>";
    htm += "        <dl>";
    htm += "        <dt><em>*</em>失效日期：</dt>";
    htm += "    <dd>";
    htm += "    <input type='text' value='' id='i_insurant_end' name='' placeholder='失效日期'  readonly='readonly' onfocus='dateUtil()' />";
    htm += "        </dd>";
    htm += "        </dl>";
    htm += "        <div style='height: 55px'></div>";
    htm += "        <dl>";
    htm += "        <dt><em>*</em>办理日期：</dt>";
    htm += "    <dd>";
    htm += "    <input type='text' value='' id='i_insureDate' name='' placeholder='办理日期'  readonly='readonly' onfocus='dateUtil()' />";
    htm += "        </dd>";
    htm += "        </dl>";
    htm += "       <dl>";
    htm += "       <dt><em>*</em>保费(元)：</dt>";
    htm += "   <dd>";
    htm += "   <select style='text-align: center;' id='i_cost'>";
    htm += "       <option value='15'>15</option>";
    htm += "       <option value='74'>74</option>";
    htm += "       </select>";
    htm += "       </dd>";
    htm += "       </dl>";
    htm += "        <dl>";
    htm += "        <dt><em>*</em>被保险人：</dt>";
    htm += "    <dd>";
    htm += "    <input type='text' value='' id='i_insurant' name='' placeholder='被保险人' />";
    htm += "        </dd>";
    htm += "        </dl>";
    htm += "        <dl>";
    htm += "        <dt><em>*</em>证件号：</dt>";
    htm += "    <dd>";
    htm += "    <input type='text' value='' id='i_IDNumber' name='' placeholder='身份证/护照/军官证等' />";
    htm += "        </dd>";
    htm += "        </dl>";
    htm += "        <div style='height: 55px'></div>";
    htm += "        <dl>";
    htm += "        <dt><em>*</em>经办人：</dt>";
    htm += "    <dd>";
    htm += "    <input type='text' value='" + $.cookie("em_name") + "' id='i_agent' name='' placeholder='经办人' />";
    htm += "        </dd>";
    htm += "        </dl>";
    htm += "        <div id='insuranceNumber'>";
    htm += "        </div>";
    htm += "        <div style='height: 55px'></div>";
    htm += "        <dl style='height: 150px'>";
    htm += "        <dt><em></em>理赔情况：</dt>";
    htm += "    <dd>";
    htm += "    <textarea  id='i_ClaimSituation' name='' placeholder='理赔情况' style='text-indent: 5px;width: 840px;border-radius: 5px;border-color: #bbb;height: 150px'></textarea>";
    htm += "        </dd>";
    htm += "        </dl>";
    htm += "        <div style='height: 170px'></div>";
    htm += "        <dl style='height: 150px'>";
    htm += "        <dt><em></em>备注：</dt>";
    htm += "    <dd>";
    htm += "    <textarea  id='i_remarks' name='' placeholder='备注' style='text-indent: 5px;width: 840px;border-radius: 5px;border-color: #bbb;height: 150px'></textarea>";
    htm += "        </dd>";
    htm += "        </dl>";
    htm += "        <div style='height: 170px'></div>";
    htm += "        <dl>";
    htm += "        <dt>";
    htm += "        <input  type='button' class='item-top' value='保存' onclick='addInsurance()' style='width: 80px;margin-left: 85px;text-indent: 0px;'>";
    htm += "        </dt>";
    htm += "        </dl>";
    htm += "        <dl>";
    htm += "        <dt>";
    htm += "        <input  type='button' class='item-top' value='取消' onclick='getInsurance()' style='width: 80px;margin-left: -35px;text-indent: 0px;background-color: #ccc;border: none'>";
    htm += "        </dt>";
    htm += "        </dl>";
    htm += "        </div>";
    $("#insuranceInfo").html(htm)
}



/**
 * 写入保险修改html
 * @param data
 */
function updataInsurance(i_id) {
    $.ajax({
        url: "/itemManage/getInsuranceWhere",
        type: "get",
        data: {
            i_id: i_id,
        },
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
    }).done(function (result) {
        var htm = "";
        $.each(result.data.insurance, function (index, item) {
            htm += "    <div id='' style='display:block;width: 1300px;'>";
            if (!isEmpty(item.i_insuranceNumberHead)) {
                htm += "        <dl>";
                htm += "        <dt><em>*</em>源保单号：</dt>";
                htm += "    <dd>";
                htm += "    <input  type='text' value='" + returnValue(item.i_insuranceNumberHead) + "' id='i_insuranceNumberHead' name='' readonly='readonly' placeholder='源保单号' />";
                htm += "        </dd>";
                htm += "        </dl>";
                htm += "        <div style='height: 55px'></div>";
            }
            htm += "        <dl>";
            htm += "        <dt><em>*</em>保单号：</dt>";
            htm += "    <dd>";
            htm += "    <input  type='text' value='" + item.i_insuranceNumber + "' id='i_insuranceNumber' name='' placeholder='保单号' />";
            htm += "        </dd>";
            htm += "        </dl>";
            htm += "        <dl>";
            htm += "        <dt><em>*</em>保险公司：</dt>";
            htm += "    <dd>";
            htm += "    <input  type='text' value='" + item.i_company + "' id='i_company' name='' placeholder='保险公司' />";
            htm += "        </dd>";
            htm += "        </dl>";
            htm += "        <dl>";
            htm += "        <dt><em>*</em>生效时间：</dt>";
            htm += "    <dd>";
            htm += "    <input type='text' value='" + format(item.i_insurant_strat, "yyyy-MM-dd") + "' id='i_insurant_strat' name='' placeholder='生效时间'  readonly='readonly' onfocus='dateUtil()' />";
            htm += "        </dd>";
            htm += "        </dl>";
            htm += "        <dl>";
            htm += "        <dt><em>*</em>失效日期：</dt>";
            htm += "    <dd>";
            htm += "    <input type='text' value='" + format(item.i_insurant_end, "yyyy-MM-dd") + "' id='i_insurant_end' name='' placeholder='失效日期'  readonly='readonly' onfocus='dateUtil()' />";
            htm += "        </dd>";
            htm += "        </dl>";
            htm += "        <div style='height: 55px'></div>";
            htm += "        <dl>";
            htm += "        <dt><em>*</em>办理日期：</dt>";
            htm += "    <dd>";
            htm += "    <input type='text' value='" + format(item.i_insureDate, "yyyy-MM-dd") + "' id='i_insureDate' name='' placeholder='办理日期'  readonly='readonly' onfocus='dateUtil()' />";
            htm += "        </dd>";
            htm += "        </dl>";
            htm += "       <dl>";
            htm += "       <dt><em>*</em>保费(元)：</dt>";
            htm += "   <dd>";
            htm += "   <select style='text-align: center;' id='i_cost'>";
            if(item.i_cost == 15){
                htm += "       <option selected='selected' value='15'>15</option>";
                htm += "       <option value='74'>74</option>";
            }else {
                htm += "       <option value='15'>15</option>";
                htm += "       <option selected='selected' value='74'>74</option>";
            }
            htm += "       </select>";
            htm += "       </dd>";
            htm += "       </dl>";
            htm += "        <dl>";
            htm += "        <dt><em>*</em>被保险人：</dt>";
            htm += "    <dd>";
            htm += "    <input type='text' value='" + item.i_insurant + "' id='i_insurant' name='' placeholder='被保险人' />";
            htm += "        </dd>";
            htm += "        </dl>";
            htm += "        <dl>";
            htm += "        <dt><em>*</em>证件号：</dt>";
            htm += "    <dd>";
            htm += "    <input type='text' value='" + returnValue(item.i_IDNumber) + "' id='i_IDNumber' name='' placeholder='身份证/护照/军官证等' />";
            htm += "        </dd>";
            htm += "        </dl>";
            htm += "        <div style='height: 55px'></div>";
            htm += "        <dl>";
            htm += "        <dt><em>*</em>经办人：</dt>";
            htm += "    <dd>";
            htm += "    <input type='text' value='" + item.i_agent + "' id='i_agent' name='' placeholder='经办人' />";
            htm += "        </dd>";
            htm += "        </dl>";
            htm += "        <div id='insuranceNumber'>";
            htm += "        </div>";
            htm += "        <div style='height: 55px'></div>";
            htm += "        <dl style='height: 150px'>";
            htm += "        <dt><em></em>理赔情况：</dt>";
            htm += "    <dd>";
            htm += "    <textarea  id='i_ClaimSituation' name='' placeholder='理赔情况' style='text-indent: 5px;width: 840px;border-radius: 5px;border-color: #bbb;height: 150px'>" + returnValue(item.i_ClaimSituation) + "</textarea>";
            htm += "        </dd>";
            htm += "        </dl>";
            htm += "        <div style='height: 170px'></div>";
            htm += "        <dl style='height: 150px'>";
            htm += "        <dt><em></em>备注：</dt>";
            htm += "    <dd>";
            htm += "    <textarea  id='i_remarks' name='' placeholder='备注' style='text-indent: 5px;width: 840px;border-radius: 5px;border-color: #bbb;height: 150px'>" + returnValue(item.i_remarks) + "</textarea>";
            htm += "        </dd>";
            htm += "        </dl>";
            htm += "        <div style='height: 170px'></div>";
            htm += "        <dl>";
            htm += "        <dt>";
            htm += "        <input   type='button' class='item-top' value='保存' onclick='SubmitUpdataInsurance(\"" + item.i_id + "\")' style='width: 80px;margin-left: 85px;text-indent: 0px;'>";
            htm += "        </dt>";
            htm += "        </dl>";
            htm += "        <dl>";
            htm += "        <dt>";
            htm += "        <input  type='button' class='item-top' value='取消' onclick=' getInsurance();' style='width: 80px;margin-left: -35px;text-indent: 0px;background-color: #ccc;border: none'>";
            htm += "        </dt>";
            htm += "        </dl>";
            htm += "        </div>";
        })
        $("#insuranceInfo").html(htm);
    })
}


/**
 * 提交保险修改
 */
function SubmitUpdataInsurance(i_ids) {
    var i_insuranceNumber = $("#i_insuranceNumber").val();
    var i_insuranceNumberHead = $("#i_insuranceNumberHead").val();
    var i_company = $("#i_company").val();
    var i_insureDate = $("#i_insureDate").val();
    var i_insurant = $("#i_insurant").val();
    var i_IDNumber = $("#i_IDNumber").val();
    var i_insurant_strat = $("#i_insurant_strat").val();
    var i_insurant_end = $("#i_insurant_end").val();
    var i_ClaimSituation = $("#i_ClaimSituation").val();
    var i_agent = $("#i_agent").val();
    var i_remarks = $("#i_remarks").val();
    var i_cost = $("#i_cost").val();
    if (isEmpty(i_insuranceNumber) || isEmpty(i_company) || isEmpty(i_insureDate) || isEmpty(i_insurant)
        || isEmpty(i_insurant_strat) || isEmpty(i_insurant_end) || isEmpty(i_agent) || isEmpty(i_IDNumber)) {
        $.jBox.tip("带*号的必填")
        return;
    }
    $.ajax({
        url: "/itemManage/SubmitUpdataInsurance",
        type: "POST",
        data: {
            i_id: i_ids,
            i_insuranceNumber: i_insuranceNumber,
            i_insuranceNumberHead: i_insuranceNumberHead,
            i_company: i_company,
            i_insureDates: i_insureDate,
            i_insurant: i_insurant,
            i_IDNumber: i_IDNumber,
            i_insurant_strats: i_insurant_strat,
            i_insurant_ends: i_insurant_end,
            i_ClaimSituation: i_ClaimSituation,
            i_agent: i_agent,
            i_remarks: i_remarks,
            i_cost: i_cost,
        },
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
    }).done(function (result) {
        if (result.code == 200) {
            $.jBox.tip(result.msg);
            getInsurance();
        } else {
            $.jBox.tip(result.msg);
        }
    })
}


/**
 * 批改html
 * @param data
 */
function correctionsInsuranceHtml(i_id) {
    $.ajax({
        url: "/itemManage/getInsuranceWhere",
        type: "get",
        data: {
            i_id:i_id,
        },
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
    }).done(function (result) {
        var htm = "";
        $.each(result.data.insurance, function (index, item) {
            htm += "    <div id='' style='display:block;width: 1300px;'>";
            if (!isEmpty(item.i_insuranceNumber)) {
                htm += "        <dl>";
                htm += "        <dt><em>*</em>源保单号：</dt>";
                htm += "    <dd>";
                htm += "    <input  type='text' value='" + returnValue(item.i_insuranceNumber) + "' id='i_insuranceNumberHead' name='' disabled='disabled' placeholder='保单号' />";
                htm += "        </dd>";
                htm += "        </dl>";
                htm += "        <dl>";
                htm += "        <dt><em>*</em> 批改到：</dt>";
                htm += "    <dd>";
                htm += "    <input type='text' value='' id='hi_Code' name='hi_Code' placeholder='选择房屋'/>";
                htm += "        </dd>";
                htm += "        </dl>";
                htm += "        <div style='height: 55px'></div>";
            }
            htm += "        <dl>";
            htm += "        <dt><em>*</em>保单号：</dt>";
            htm += "    <dd>";
            htm += "    <input  type='text' value='' id='i_insuranceNumber' name='' placeholder='保单号' />";
            htm += "        </dd>";
            htm += "        </dl>";
            htm += "        <dl>";
            htm += "        <dt><em>*</em>保险公司：</dt>";
            htm += "    <dd>";
            htm += "    <input  type='text' value='" + item.i_company + "' id='i_company' name='' disabled='disabled' placeholder='保险公司' />";
            htm += "        </dd>";
            htm += "        </dl>";
            htm += "        <dl>";
            htm += "        <dt><em>*</em>生效时间：</dt>";
            htm += "    <dd>";
            htm += "    <input type='text' value='" + format(item.i_insurant_strat, "yyyy-MM-dd") + "' id='i_insurant_strat' name='' placeholder='生效时间'  disabled='disabled' onfocus='dateUtil()' />";
            htm += "        </dd>";
            htm += "        </dl>";
            htm += "        <dl>";
            htm += "        <dt><em>*</em>失效日期：</dt>";
            htm += "    <dd>";
            htm += "    <input type='text' value='" + format(item.i_insurant_end, "yyyy-MM-dd") + "' id='i_insurant_end' name='' placeholder='失效日期'  disabled='disabled' onfocus='dateUtil()' />";
            htm += "        </dd>";
            htm += "        </dl>";
            htm += "        <div style='height: 55px'></div>";
            htm += "        <dl>";
            htm += "        <dt><em>*</em>办理日期：</dt>";
            htm += "    <dd>";
            htm += "    <input type='text' value='" + format(item.i_insureDate, "yyyy-MM-dd") + "' id='i_insureDate' name='' placeholder='办理日期'  readonly='readonly' onfocus='dateUtil()' />";
            htm += "        </dd>";
            htm += "        </dl>";
            htm += "       <dl>";
            htm += "       <dt><em>*</em>保费(元)：</dt>";
            htm += "   <dd>";
            htm += "   <select style='text-align: center;' disabled='disabled' id='i_cost'>";
            if(item.i_cost == 15){
                htm += "       <option selected='selected' value='15'>15</option>";
                htm += "       <option value='74'>74</option>";
            }else {
                htm += "       <option value='15'>15</option>";
                htm += "       <option selected='selected' value='74'>74</option>";
            }
            htm += "       </select>";
            htm += "       </dd>";
            htm += "       </dl>";
            htm += "        <dl>";
            htm += "        <dt><em>*</em>被保险人：</dt>";
            htm += "    <dd>";
            htm += "    <input type='text' value='' id='i_insurant' name=''  placeholder='被保险人' />";
            htm += "        </dd>";
            htm += "        </dl>";
            htm += "        <dl>";
            htm += "        <dt><em>*</em>证件号：</dt>";
            htm += "    <dd>";
            htm += "    <input type='text' value='' id='i_IDNumber' name=''  placeholder='身份证/护照/军官证等' />";
            htm += "        </dd>";
            htm += "        </dl>";
            htm += "        <div style='height: 55px'></div>";
            htm += "        <dl>";
            htm += "        <dt><em>*</em>经办人：</dt>";
            htm += "    <dd>";
            htm += "    <input type='text' value='" + item.i_agent + "' id='i_agent' name='' placeholder='经办人' disabled='disabled' />";
            htm += "        </dd>";
            htm += "        </dl>";
            htm += "        <div style='height: 55px'></div>";
            htm += "        <dl style='height: 150px'>";
            htm += "        <dt><em></em>备注：</dt>";
            htm += "    <dd>";
            htm += "    <textarea  id='i_remarks' name='' placeholder='备注' style='text-indent: 5px;width: 840px;border-radius: 5px;border-color: #bbb;height: 150px'></textarea>";
            htm += "        </dd>";
            htm += "        </dl>";
            htm += "        <div style='height: 170px'></div>";
            htm += "        <dl>";
            htm += "        <dt>";
            htm += "        <input   type='button' class='item-top' value='保存' onclick='updInsurance(\"" + item.i_id + "\")' style='width: 80px;margin-left: 85px;text-indent: 0px;'>";
            htm += "        </dt>";
            htm += "        </dl>";
            htm += "        <dl>";
            htm += "        <dt>";
            htm += "        <input  type='button' class='item-top' value='取消' onclick=' getInsurance();' style='width: 80px;margin-left: -35px;text-indent: 0px;background-color: #ccc;border: none'>";
            htm += "        </dt>";
            htm += "        </dl>";
            htm += "        <input id='contractObjectTypeForSearch' type='hidden' value='"+contractObjectType+"'>";
            htm += "        <input id='i_correlation' type='hidden' value='"+item.i_correlation+"'>";
            htm += "        </div>";
        })

        $("#insuranceInfo").html(htm);
        // 小区房号搜索
        $("#hi_Code").ContractHouseSearch3({
            placeholder: "小区房号/客户信息",
            top: 65,
            left: 260,
            result: function (rlt) {
                var data = $(rlt).data("data");
                $("#hi_Code").attr("data-hi_code", returnValue(data.hi_code));
                $("#hi_Code").val(returnValue(data.house_address));
                if (contractObjectType == '租赁合同') {
                    $("#i_insurant").val(returnValue(data.cc_name_z));
                    $("#hi_Code").attr("data-con_code", returnValue(data.contractObject_Code_z));
                }
                if (contractObjectType == '托管合同') {
                    $("#i_insurant").val(returnValue(data.cc_name_f));
                    $("#hi_Code").attr("data-con_code", returnValue(data.contractObject_Code_f));
                }
            }
        });
    })
}


/**
 *保险批改录入
 */
function updInsurance(i_id) {
    var i_insuranceNumber = $("#i_insuranceNumber").val();
    var i_insuranceNumberHead = $("#i_insuranceNumberHead").val();
    var i_company = $("#i_company").val();
    var i_insureDate = $("#i_insureDate").val();
    var i_insurant = $("#i_insurant").val();
    var i_IDNumber = $("#i_IDNumber").val();
    var i_insurant_strat = $("#i_insurant_strat").val();
    var i_insurant_end = $("#i_insurant_end").val();
    var i_agent = $("#i_agent").val();
    var i_cost = $("#i_cost").val();
    var i_remarks = $("#i_remarks").val();
    var i_correlation = $("#i_correlation").val();
    if (isEmpty(i_insuranceNumber) || isEmpty(i_company) || isEmpty(i_insureDate) || isEmpty(i_insurant)
        || isEmpty(i_insurant_strat) || isEmpty(i_insurant_end) || isEmpty(i_agent) || isEmpty(i_IDNumber)) {
        $.jBox.tip("带*号的必填")
        return;
    }
    $.ajax({
        url: "/itemManage/updInsurance",
        type: "POST",
        data: {
            i_idf: i_id,
            i_insuranceNumber: i_insuranceNumber,
            i_insuranceNumberHead: i_insuranceNumberHead,
            i_company: i_company,
            i_insureDates: i_insureDate,
            i_insurant: i_insurant,
            i_IDNumber: i_IDNumber,
            i_insurant_strats: i_insurant_strat,
            i_insurant_ends: i_insurant_end,
            i_agent: i_agent,
            i_remarks: i_remarks,
            i_cost: i_cost,
            i_correlation: i_correlation,
            contractObject_code: $("#hi_Code").attr("data-con_code"),
            hi_code: $("#hi_Code").attr("data-hi_code")
        },
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
    }).done(function (result) {
        if (result.code == 200) {
            $.jBox.tip(result.msg);
            getInsurance();
        } else {
            $.jBox.tip(result.msg);
        }
    })
}

//返回安装类型
function returnBcInstallType(param) {
    var data = {};
    data.list = {0: "公司新装",1:"公司迁移",2:"客户新装",3:"客户迁移"};
    data.text = returnValue(data.list[param]);
    return data;
}

//返回安装类型
function returnBcBroadbandState(param) {
    var data = {};
    data.list = {0:"正常",1:"欠费",2:"暂停"};
    data.text = returnValue(data.list[param]);
    return data;
}

/** 是否为手机号码或座机号 */
function isPhoneOrmobile(str) {
    var mobile = /(^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{8})$|(^[1][3456789][0-9]{9})$/;
    var phone = /0\d{2}-\d{7,8}/;
    return mobile.test(str) || phone.test(str);
};

























