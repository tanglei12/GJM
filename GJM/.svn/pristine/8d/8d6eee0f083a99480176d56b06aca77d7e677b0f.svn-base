<%@ page language="java" pageEncoding="utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!-- 底部 css样式 -->
<link href="/resources/css/serve/orderProcess.css" rel="stylesheet" type="text/css">
<link href="/resources/css/manage_index.css" rel="stylesheet" type="text/css">
<link href="/resources/common/uber-zoom/uber-zoom.css" rel="stylesheet" type="text/css">
<link href="/resources/common/sweet-alert/css/sweet-alert.css" rel="stylesheet" type="text/css">
<link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href="/resources/common/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">
<link href="/resources/common/imageUpload/css/jquery.image-upload.css" rel="stylesheet" type="text/css">
<link href="/resources/css/common/page.list.css?v=<%=System.currentTimeMillis()%>" rel="stylesheet" type="text/css">
<link href="/resources/css/body.css" rel="stylesheet" type="text/css">
<link href="/resources/css/common/common.css" rel="stylesheet" type="text/css">
<!-- <link href="/resources/common/gjp_image_upload/css/image-upload4.css" rel="stylesheet" type="text/css"> -->
<link href="/resources/css/serve/addService.css" rel="stylesheet" type="text/css">

<script src="/resources/js/jquery-1.7.2.min.js"></script>
<script src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
<script src="/resources/common/My97DatePicker/WdatePicker.js"></script>
<script src="/resources/js/common/common.page.js?v=<%=System.currentTimeMillis()%>"></script>
<!-- 时间插件 -->
<script src="/resources/Plug-in/jquery.rotate/jquery.rotate.min.js"></script>
<script src="/resources/common/uber-zoom/uber-zoom.js"></script>
<script src="/resources/print/LodopFuncs.js"></script>
<!-- 打印插件 -->
<script src="/resources/js/common/common.js"></script>
<!-- 上传插件 -->
<%--<script src="/resources/js/service/ajaxfileupload.js"></script>--%>
<script src="/resources/common/imageUpload/js/jquery.image-upload.js"></script>
<%--<script src="/resources/common/zyupload/zyupload-1.0.0.js"></script>--%>
<!-- 文件上传插件 -->
<script src="/resources/js/service/showListInfo.js?v=1.9.3"></script>

<!-- 主体内容 -->
<div id="main-box">
    <input type="hidden" id="imageDeList">
    <input type="hidden" id="serviceMoney">
    <input type="hidden" id="user_id">
    <input type="hidden" name="" id="mdState">
    <input type="hidden" id="mdgMoney">
    <!-- 状态 -->
    <div id="main-box-title">
        <a class="title-sub" data-step="0">服务申请</a> <span class="title-bottom"></span>
        <a class="title-sub" data-step="1">服务受理</a> <span class="title-bottom"></span>
        <a class="title-sub" data-step="2">服务处理</a> <span class="title-bottom"></span>
        <a class="title-sub" data-step="3">服务完成</a> <span class="title-bottom"></span>
        <a class="title-sub" data-step="4">客服回访</a>
    </div>
    <!-- 基本信息 -->
    <div class="center-content">
        <div class="content1">
            <div class="content-title">服务基本信息
                <div id="power1" style="flex: 1;"></div>
                <%--<button onclick="serviceTypeUpate(event)">服务类型修改</button>--%>
                <%--<button onclick="updateDistributeLeaflets(event)" style="margin-right: 10px;">改派</button>--%>
                <%--<button onclick="serviceThing(event)" style="margin-right: 10px;">报事跟进</button>--%>
                <%--<button onclick="chooseService(event)" style="margin-right: 10px;" id="chooseBtn">选择服务</button>--%>
            </div>
            <div class="content-div">
                <input type="hidden" name="md_id" id="md_id" value=""/>
                <input type="hidden" name="em_id" id="em_id" value=""/>
                <input type="hidden" id="isCustomerApprise" value=""/>
                <div style="display: flex;">
                    <dl style="width: 45%;">
                        <dt>服务类型：</dt>
                        <dd id="service_type"></dd>
                    </dl>
                    <dl style="width: 45%;">
                        <dt>故障描述：</dt>
                        <dd id="service_fault"></dd>
                    </dl>
                </div>
                <dl>
                    <dt>现场问题：</dt>
                    <dd id="service_problem">
                        <div class="problem_content">
                            <ul></ul>
                        </div>
                    </dd>
                </dl>
                <div style="display: flex;">
                    <dl style="width: 45%;">
                        <dt>申请类型：</dt>
                        <dd id="service_types"></dd>
                    </dl>
                    <dl style="width: 45%;">
                        <dt>申报来源：</dt>
                        <dd id="service_typese"></dd>
                    </dl>
                </div>
                <%--<div style="display: flex;">--%>
                <%--<dl style="width: 45%;">--%>
                <%--<dt>付费人：</dt>--%>
                <%--<dd id="service_name"></dd>--%>
                <%--</dl>--%>
                <%--<dl style="width: 45%;">--%>
                <%--<dt>付费电话：</dt>--%>
                <%--<dd id="service_phone"></dd>--%>
                <%--</dl>--%>
                <%--</div>--%>
                <div style="display: flex;">
                    <dl style="width: 45%;">
                        <dt>联系人：</dt>
                        <dd id="service_custmorName"></dd>
                    </dl>
                    <dl style="width: 45%;">
                        <dt>联系电话：</dt>
                        <dd id="service_custmorPhone"></dd>
                    </dl>
                </div>
                <div style="display: flex;">
                    <dl style="display: flex;">
                        <dt style="width: 90px;">房屋地址：</dt>
                        <dd id="service_address"></dd>
                    </dl>
                    <%--<dl style="width: 45%;">--%>
                        <%--<dt>费用：</dt>--%>
                        <%--<dd id="service_money"></dd>--%>
                    <%--</dl>--%>
                </div>
                <div style="display: flex;">
                    <dl style="width: 45%;">
                        <dt>约定时间：</dt>
                        <dd id="service_date"></dd>
                    </dl>
                    <dl style="width: 45%;">
                        <dt>申报时间：</dt>
                        <dd id="service_sdate"></dd>
                    </dl>
                </div>
                <%--<dl>--%>
                    <%--<dt>客户签字：</dt>--%>
                    <%--<dd id="service_sign"><img data-preview-src="" data-preview-group="1"--%>
                                               <%--style="width: 100px; height: 85px;" alt="没有图片" id="customerImage" src="">--%>
                    <%--</dd>--%>
                <%--</dl>--%>
                <dl>
                    <dt>故障图片：</dt>
                    <dd id="service_image"></dd>
                    <div id="charge_image" style="display: none;"></div>
                </dl>
            </div>
            <input type="hidden" id="hi_code" value=""/>
        </div>
        <!-- 时间轴显示 -->
        <div class="date-content">
            <div class="date-content-list">
                <div class="date-content-list-title" onclick="showContent(this)">
                    <label class="dates"></label><label class="titles"></label><i></i>
                    <button onclick=''></button>
                </div>
                <div class="content-list">
                    <dl>
                        <dt></dt>
                        <dd></dd>
                    </dl>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- 右侧滑入滑出公共页面，不要改变外部框架，若有更改，请替换content_add里面的内容 -->
<div class="addService" id="dispatch">
    <div class="serviceBg"></div>
    <div class="serviceContent">
        <div class="close" onclick="closeWindow(this)">
            <i class="fa-close"></i>
        </div>
        <div class="content-title">
            <span class="title-name" id="serviceProgress">订单跟进</span>
        </div>
        <div class="content_add">
            <!-- 自定义界面 -->
        </div>
        <div class="content_submit">
            <button type="button" id="contentSubmit">提交</button>
        </div>
    </div>
</div>
<!-- 打印 -->
<div id="print" style="display: none;">
    <table style="border-collapse: collapse; width: 730px; height:400px;  position: relative; text-align: center; font-size: 14px;">
        <thead>
        <tr>
            <td colspan="8"
                style="height: 50px; line-height: 50px; font-size: 19px; font-weight: bold; text-align: center;">派工单
            </td>
        </tr>
        <tr>
            <td colspan="3" style="height: 35px; line-height: 35px;">派工单位:重庆管家婆房屋托管中心</td>
            <td colspan="2">服务热线:023-88067511-3</td>
            <td colspan="2" id="md_number">No:</td>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td rowspan="2" style=" font-size: 17px; border: 1px solid #000; width: 50px; padding-left: 5px;">客户信息</td>
            <td style="width: 10%; border: 1px solid #000; height: 23px; line-height: 23px">联系人</td>
            <td style="border: 1px solid #000; text-align: left; text-indent: 10px;" id="md_contactpeople"></td>
            <td style="width: 10%; border: 1px solid #000;">联系电话</td>
            <td style="border: 1px solid #000; text-align: left; text-indent: 10px;" id="md_contactPhone"></td>
            <td style="width: 76px; border: 1px solid #000;">所属门店</td>
            <td style="width: 123px; border: 1px solid #000;" id="owenUcc"></td>
        </tr>
        <tr>
            <td style="border: 1px solid #000; height: 23px; line-height: 23px;">小区房号</td>
            <td colspan="3" style="border: 1px solid #000; text-align: left; text-indent: 10px;"
                id="house_address"></td>
            <td style="border: 1px solid #000;">报修人员</td>
            <td style="border: 1px solid #000;" id="applyer"></td>
            <td rowspan="3" style="width: 20px;">白客服</td>
        </tr>
        <tr>
            <td rowspan="3" style=" font-size: 17px; border: 1px solid #000; width: 50px; padding-left: 5px;">问题描述</td>
            <td rowspan="3" colspan="4" style="border: 1px solid #000; text-align: left; text-indent: 10px;"
                id="md_problem"></td>
            <td style="border: 1px solid #000; height: 23px; line-height: 23px">接单人员</td>
            <td style="border: 1px solid #000;" id="accpet_name"></td>
        </tr>
        <tr>
            <td style="border: 1px solid #000; height: 23px; line-height: 23px;">报事时间</td>
            <td style="border: 1px solid #000; font-size: 15px; font-size: 12px;" id="md_time"></td>
        </tr>
        <tr>
            <td style="border: 1px solid #000; height: 23px; line-height: 23px;">派工时间</td>
            <td style="border: 1px solid #000; font-size: 12px;" id="mdg_time"></td>
        </tr>
        <tr>
            <td rowspan="3" style=" font-size: 17px; border: 1px solid #000; width: 50px; padding-left: 5px;">处理描述</td>
            <td rowspan="3" colspan="4" style="border: 1px solid #000;"></td>
            <td style="border: 1px solid #000; height: 23px; line-height: 23px;">开始时间</td>
            <td style="border: 1px solid #000; font-size: 15px;"></td>
            <td rowspan="3" style="width: 20px;">红财务</td>
        </tr>
        <tr>
            <td style="border: 1px solid #000; height: 23px; line-height: 23px;">完成时间</td>
            <td style="border: 1px solid #000; font-size: 15px;"></td>
        </tr>
        <tr>
            <td style="border: 1px solid #000; height: 23px; line-height: 23px;">付款对象</td>
            <td style="border: 1px solid #000;" id="md_applyType"></td>
        </tr>
        <tr>
            <td rowspan="6" style=" font-size: 17px; border: 1px solid #000; width: 50px; padding-left: 5px;">服务须知</td>
            <td rowspan="6" colspan="4" style="text-align: left; font-size: 12px; border: 1px solid #000; ">
                1、师傅上门维修时间，按报修的先后顺序进行排队，报修时预约大概日期，师傅确定具体上门时间，48小时内上门（无预约）<br/>
                2、师傅2天内未联系上客户的用短信通知客户，此次报事自动完结，客户需重新报修;<br/>
                3、租客入住15天内，除人为原因外的报修，费用由业主承担；<br/>
                4、租客入住15天后，除装修与人为原因外的报修，费用包修费里扣除，不足补齐。<br/>
            </td>
            <td style="border: 1px solid #000; height: 23px; line-height: 23px;">付费人</td>
            <td style="border: 1px solid #000; text-indent: 0;" id="md_phone"></td>
            <td rowspan="3" style="width: 20px;">黄客户</td>
        </tr>
        <tr>
            <td style="border: 1px solid #000; height: 23px; line-height: 23px;">人工费用</td>
            <td style="border: 1px solid #000;"></td>
        </tr>
        <tr>
            <td style="border: 1px solid #000; height: 23px; line-height: 23px;">材料费用</td>
            <td style="border: 1px solid #000;"></td>
        </tr>
        <tr>
            <td style="border: 1px solid #000; height: 23px; line-height: 23px;">其他费用</td>
            <td style="border: 1px solid #000;"></td>
        </tr>
        <tr>
            <td style="border: 1px solid #000; height: 23px; line-height: 23px;">合计金额</td>
            <td style="border: 1px solid #000;"></td>
        </tr>
        </tbody>
        <tfoot>
        <tr>
            <td colspan="3" style="text-align: left; text-indent: 30px; height: 35px; line-height: 35px;">审核签字：</td>
            <td colspan="2" style="text-align: left; text-indent: 30px; height: 35px; line-height: 35px;">处理人员：</td>
            <td colspan="2" style="text-align: left; text-indent: 30px; height: 35px; line-height: 35px;">客户签名：</td>
        </tr>
        </tfoot>
    </table>
</div>

<div class="cd-popup3" style="display:none;">
    <div class="cd-popup-container3" id="cd-popup-container3">
        <div id="cd-buttons">
            <div style="margin: auto; width: 90%; text-align: center; padding: 15px 0px; border-bottom: 1px solid #06B;"
                 id="titleInsert">
                <input type="text" value="选择服务" id="inputtext" name="inputtext"
                       style="border: none; text-align: center; font-size: 20px; color: #3E97C9; font-family: 微软雅黑; -moz-user-select: none; -webkit-user-select: none; cursor: default;"
                       readonly="readonly">
            </div>
            <div style='margin: 15px;'>
                <select onchange='changeService(this)' name='serType'>
                    <option value='-1'>请选择</option>
                    <option value='1'>客服部</option>
                    <option value='2'>外协</option>
                </select>
                <div id='waixie' style='display: none;'>
                    <dl style='display: flex;line-height: 30px;margin: 10px 0;'>
                        <dt>外协名称:</dt>
                        <dd><input type='text' name='outsource_name' style='border: 1px solid #ddd;height: 30px;'></dd>
                    </dl>
                    <dl style='display: flex;line-height: 30px;margin: 10px 0;'>
                        <dt>外协报价:</dt>
                        <dd><input type='number' name='outsource_price' style='border: 1px solid #ddd;height: 30px;'>元
                        </dd>
                    </dl>
                    <dl style='display: flex;line-height: 30px;margin: 10px 0;'>
                        <dt>外协电话:</dt>
                        <dd><input type='number' name='outsource_phone' style='border: 1px solid #ddd;height: 30px;'>
                        </dd>
                    </dl>
                    <dl style='display: flex;line-height: 30px;margin: 10px 0;'>
                        <dt>处理结果:</dt>
                        <dd><select name='outsource_result' style='width: 153px;margin-top: 0px;'>
                            <option value='1'>成功</option>
                            <option value='2'>失败</option>
                        </select></dd>
                    </dl>
                    <dl style='display: flex;line-height: 30px;margin: 10px 0;'>
                        <dt>结束时间:</dt>
                        <dd><input type='text' name='end_time' style='border: 1px solid #ddd;height: 30px;'
                                   onfocus='WdatePicker({dateFmt:"yyyy-MM-dd HH:mm:ss"})' readonly></dd>
                    </dl>
                    <dl style='display: flex;line-height: 30px;margin: 10px 0;'>
                        <dt>相关图片:</dt>
                        <dd>
                             <div id="imageUpload"></div>
                        </dd>
                    </dl>
                </div>
                <div class="col-md-12  modelAdd"
                     style="width: 300px; margin: auto; position: relative; margin-top: 20px;">
                    <input class="btn btn-info pull-left" style="margin-top: 18px; margin-left: 52px;" onclick="submitWaixie()"
                           type="button" value=" 确  认  "/>
                    <input class="btn btn-info pull-left" style="margin-top: 18px; margin-left: 71px;"
                           onclick="cancelDiv()" type="button" value=" 取  消  "/>
                </div>
            </div>
        </div>
        <a href="#0" class="cd-popup-close" style="color: red;">X</a>
    </div>
</div>