<%@ page language="java" pageEncoding="utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%
    response.setHeader("Pragma", "No-cache");
    response.setHeader("Cache-Control", "no-cache");
    response.setDateHeader("Expires", -10);
%>
<!-- 底部 CSS样式 -->
<link href="/resources/css/manage_index.css" rel="stylesheet" type="text/css">
<link href="/resources/css/common/common.css" rel="stylesheet" type="text/css">
<link href="/resources/css/common/page.list.css" rel="stylesheet" type="text/css">
<link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">
<link href="/resources/css/product/transfer.css" rel="stylesheet" type="text/css">
<link href="/resources/css/contractList/itemsAdd.css" rel="stylesheet" type="text/css">

<script src="/resources/js/jquery-1.7.2.min.js"></script>
<script src="/resources/js/common/common.js"></script>
<script src="/resources/js/common/common.page.js"></script>
<script src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
<script src="/resources/js/product/jquery-cookie.js"></script>
<!-- 日期控件 -->
<script src="/resources/common/My97DatePicker/WdatePicker.js"></script>
<!-- jBox -->
<script src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js" charset="utf-8"></script>
<script src="/resources/Plug-in/jbox-v2.3/jBox/i18n/jquery.jBox-zh-CN.js" charset="utf-8"></script>

<script src="/resources/js/contractList/itemAdds.js"></script>
<style>
    #search-box .search-foot .foot-left {position: relative;width: 24px;height: 24px;line-height: 24px;float: left;margin-right: 6px;text-align: center;background: #fff;font-size: 20px;color: #666;border-radius: 3px;outline: none;-moz-user-select: none;-webkit-user-select: none;}
</style>
<!-- 主体 -->
<div id="main-box">
    <div class="nav-contype clear">
        <a id="jumpItemAddHref" href="" class="contype-tab contype-tab-focus" id="nav-ht1">物品添置<i class="down"></i></a>
    </div>
    <div class="box-content">
        <div class="sub-title" style="color: ${businessContractVo.contractObject_Type == '租赁合同'?'#16A085':'#3498DB'}">
            <ul class="title-nav">
               <%-- <li class="visited">${businessContractVo.contractObject_Type}
                    <c:if test="${businessContractVo.contractObject_Type == '托管合同'}"><span style="font-size: 14px;color: #000">(&nbsp;<label style="font-size: 14px;font-weight: initial;">${businessContractVo.contractObject_Version}</label>&nbsp;)</span></c:if>
                    <span style="color: #E74C3C;font-weight: normal;font-size: 14px;">NO.${businessContractVo.contractObject_No}</span>
                </li>--%>
                   <li class="visited"><span id="contractObjectType"></span><span id="contractObjectNo" style="color: #E74C3C;font-weight: normal;font-size: 14px;"></span>
                   </li>
            </ul>
        </div>
        <div class="sub-content">
            <div class="content-item">
                <fieldset>
                    <legend>房屋信息</legend>
                    <span><label>地址：</label>${businessContractVo.propertyInfo_address}（${businessContractVo.propertyInfo_Name}）${businessContractVo.hi_address}</span>
                    <span><label>合同状态：</label>${businessContractVo.contractObject_State}</span>
                </fieldset>
            </div>
        </div>
        <div class="sub-title">
            <ul class="title-nav">
                <li class="visitedes tres on">物品添置</li>
                <li class="visitedes tbroadband">宽带添加</li>
                <li class="visitedes tinsurance">保险添加</li>
            </ul>
        </div>
        <div class="sub-content showHide res">
            <div style="width: 1300px;">
                <input type="hidden" name="inv_code" id="inv_code" value="">
                <input type="hidden" name="type_name" id="type_name" value="">
                <input type="hidden" name="inv_price" id="inv_price" value="">
                <dl>
                    <dt><em>*</em>物品类型：</dt>
                    <dd>
                        <select style="text-align: center;" id="art_type" onchange="selectHouseTypeParent3(this.value)">
                        </select>
                    </dd>
                </dl>
                <dl>
                    <dt><em>*</em>物品名称：</dt>
                    <dd>
                        <input type="text" value="" id="art_name" name="art_name" placeholder="物品类型" readonly="readonly" onclick="getItemsNames();">
                    </dd>
                </dl>
                <dl>
                    <dt><em>*</em>业绩计入：</dt>
                    <dd>
                        <select id="ir_isCalAchi">
                            <option value="">--请选择--</option>
                            <option value="1">--是--</option>
                            <option value="0">--否--</option>
                        </select>
                    </dd>
                </dl>

                <dl>
                    <dt>
                        <input type="button" class="item-top" value="物品添加" onclick="addItemsRelation()" style="width: 80px;text-indent: 0px;margin-left: 16px">
                    </dt>
                    <dd>
                        <input type="button" class="item-top cd-popup-trigger3" value="新增采购" style="width: 80px;text-indent: 0px">
                    </dd>
                </dl>


            </div>
            <div class="itemsNameConten" style="display: none;">
                <div class="namesCount">
                    <table>
                        <tbody>

                        </tbody>
                    </table>
                </div>

                <div class="pagin">
                    <div class="message" style="border: 0px; margin-top: 0;">共<i class="blue" id="nums"></i>条，当前第&nbsp;<i class="blue" id="Num">1</i>&nbsp;页，共&nbsp;<i class="blue" id="sizeNum"></i>&nbsp;页</div>
                    <ul class="paginList"></ul>
                </div>
                <div id="data"></div>
            </div>

        </div>

        <div class="sub-content showHide res" style="padding-top: 0;">
            <div class="add-item" style="float: none;width: 600px;">
                <table>
                    <thead>
                    <tr>
                        <th>物品名称</th>
                        <th>物品名称</th>
                        <th>单价（元）</th>
                        <th>业绩计算</th>
                        <th>添置日期</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody id="itemList">
                    <tr>
                        <td colspan="5">
                            <div style="text-align: left;padding-left: 10px;">暂无数据</div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <%--宽带--%>
        <div class="sub-content showHide broadband">

        </div>

        <%--保险--%>
        <div class="sub-content showHide insurance" id="insuranceInfo">

        </div>
        <!-- 采购单 -->
        <div class="sub-title" id="purTitle">
            <ul class="title-nav">
                <li class="visited">采购单</li>
            </ul>
        </div>
        <div class="sub-content" style="padding-top: 20px;" id="purCount">
            <div class="purchaseOrder">
                <table>
                    <thead>
                    <tr>
                        <td>
                            <input type="checkbox" id="check_all" onchange="checkAll()" style='width:17px;'/>
                        </td>
                        <td>物品名称</td>
                        <td>物品类型</td>
                        <td>物品单价（元）</td>
                        <td>物品数量</td>
                        <td>业绩扣除</td>
                    </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
<script>
    $(function () {
        /* queryItemList();
         $(".money").bind("input propertychange",function() {
         if(/[^0-9.]/g.test($(this).val())){
         $(this).val("");
         }
         });
         $("#purchaseItems_cost,#purchaseItems_count").blur(function(){
         var cost =$("#purchaseItems_cost").val();
         var count =$("#purchaseItems_count").val();
         if(isNaN(cost) || cost == "" || cost ==null){
         cost = 0;
         }
         if(isNaN(count) || cost == "" || cost ==null){
         count = 0;
         }
         var sum =eval(parseFloat(cost) * parseInt(count));
         $("#purchaseItems_totalCost").val(sum);
         }); */
    });

    /* function addItems(){
     var $itemNameVal =$("#purchaseItems_name option:selected").val();
     if("其他" == $itemNameVal){
     if(!isEmpty($("#pi_qt").val())){
     $itemNameVal =$("#pi_qt").val();
     } else {
     $("#pi_qt").addClass("input-error").css({outline:"none"}).focus();
     $("#pi_qt").animate({left:"-2px"},200);
     $("#pi_qt").animate({left:"2px"},200);
     $("#pi_qt").animate({left:"-1px"},200);
     $("#pi_qt").animate({left:"1px"},200);
     $("#pi_qt").animate({left:"0px"},200);
     return;
     }
     }
     $.ajax({
     type: "POST",
     url: "/contractObject/addItems",
     data: {
     purchaseItems_type : $("#purchaseItems_type option:selected").text(),
     purchaseItems_name : $itemNameVal,
     purchaseItems_brand : $("#purchaseItems_brand").val(),
     purchaseItems_cost : $("#purchaseItems_cost").val(),
     purchaseItems_count : $("#purchaseItems_count").val(),
     purchaseItems_totalCost : $("#purchaseItems_totalCost").val(),
     hi_code : $("#hi_code").val(),
     contractObject_No : $("#contractObject_No").val(),
     purchaseItems_payObject : $("#purchaseItems_payObject option:selected").val(),
     purchaseItems_remarks : $("#purchaseItems_remarks").val()
     },
     contentType: "application/x-www-form-urlencoded; charset=utf-8",
     dataType: "json",
     async:false,
     success: function(result) {
     if(result.code == 200){
     queryItemList();
     $("#item-top input[type='text']").val("");
     $("#purchaseItems_count").val(1);
     $("#pi_qt").removeClass("input-error");
     } else {
     alert(result.msg);
     }
     }
     })
     } */

    /* function queryItemList(){
     $.ajax({
     type: "POST",
     url: "/contractObject/queryItemList",
     data: {
     hi_code : $("#hi_code").val(),
     contractObject_No : $("#contractObject_No").val()
     },
     contentType: "application/x-www-form-urlencoded; charset=utf-8",
     dataType: "json",
     async:false,
     success: function(result) {
     if(result.code == 200){
     $("#itemList").empty();
     $.each(result.data, function(index, data) {
     $("#itemList").append(
     '<tr>' +
     '<td title="'+ returnValue(data.purchaseItems_type) +'">'+ returnValue(data.purchaseItems_type) +'</td>' +
     '<td title="'+ returnValue(data.purchaseItems_name) +'">'+ returnValue(data.purchaseItems_name) +'</td>' +
     '<td title="'+ returnValue(data.purchaseItems_brand) +'">'+ returnValue(data.purchaseItems_brand) +'</td>' +
     '<td title="'+ returnValue(data.purchaseItems_cost) +'">'+ returnValue(data.purchaseItems_cost) +'</td>' +
     '<td title="'+ returnValue(data.purchaseItems_count) +'">'+ returnValue(data.purchaseItems_count) +'</td>' +
     '<td title="'+ returnValue(data.purchaseItems_totalCost) +'">'+ returnValue(data.purchaseItems_totalCost) +'</td>' +
     '<td title="'+ returnValue(data.purchaseItems_payObject) +'">'+ returnValue(data.purchaseItems_payObject) +'</td>' +
     '<td title="'+ returnValue(data.purchaseItems_remarks) +'">'+ returnValue(data.purchaseItems_remarks) +'</td>' +
     '<td style="cursor: pointer;" class="tdDel" onclick="delItems('+ data.purchaseItems_id +')">删除</td>' +
     '</tr>');
     });
     if($("#itemList tr").length < 1){
     $("#itemList").html('<tr><td colspan="8"><div style="text-align: left;padding-left: 10px;">暂无数据</div></td></tr>');
     }
     }
     }
     })
     } */

    function changeItemName(obj) {
        $("#pi_qt").val("");
        $("#pi_qt").removeClass("input-error");
        if ("其他" == $(obj).val()) {
            $("#pi_qt").show();
            $("#pi_qt").focus();
        } else {
            $("#pi_qt").hide();
        }
    }

    function changeSelect(obj) {
        $.ajax({
            type: "POST",
            url: "queryHouseConfigType",
            data: {
                parantId: $(obj).val()
            },
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {
                if (result.code == 200) {
                    $("#purchaseItems_name").empty();
                    $.each(result.data, function (index, data) {
                        $("#purchaseItems_name").append('<option value="' + data.ht_name + '">' + data.ht_name + '</option>');
                    });
                    $("#purchaseItems_name").append('<option value="其他">其他</option>');
                }
            }
        })
    }
