<%@ page language="java" pageEncoding="utf-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="Expires" CONTENT="0">
    <meta http-equiv="Cache-Control" CONTENT="no-cache">
    <meta http-equiv="Pragma" CONTENT="no-cache">
    <title>费用结算</title>
    <link href="/resources/css/common/common.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/sweet-alert/css/sweet-alert.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/datepicker/jquery-ui.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/perfect-scrollbar/css/perfect-scrollbar.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/zyupload/skins/zyupload-1.0.0.css" rel="stylesheet" type="text/css">
    <link href="/resources/Plug-in/jquery-nice-select/css/nice-select.css" rel="stylesheet" type="text/css">
    <link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/contractList/cancelContract.css" rel="stylesheet" type="text/css">

    <script src="/resources/js/jquery-1.7.2.min.js"></script>
    <script src="/resources/js/common/common.js"></script>
    <script src="/resources/common/datepicker/js/jquery-ui-datepicker.js"></script>
    <script src="/resources/common/perfect-scrollbar/js/perfect-scrollbar.jquery.js"></script>
    <script src="/resources/common/sweet-alert/js/sweet-alert.min.js"></script>
    <script src="/resources/common/zyupload/zyupload-1.0.0.js"></script>
    <script src="/resources/Plug-in/jquery-nice-select/js/jquery.nice-select.js"></script>
    <script src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
    <script src="/resources/Plug-in/jquery.rotate/jquery.rotate.min.js"></script>
    <script src="/resources/common/uber-zoom/uber-zoom.js"></script>
    <script src="/resources/js/product/jquery-cookie.js"></script>
    <script src="/resources/js/common/optionModel.js"></script>
    <script src="/resources/js/contractList/contractStatement.js"></script>
</head>
<body>
<div id="main-box">
    <!-- 标题 -->
    <div class="box-nav">
        <ul>
            <li class="nav-tab-focus active-title">交房结算</li>
        </ul>
    </div>
    <!-- 提示 -->
    <div class="box-content" id="main-hint"></div>
    <!-- 滚动 -->
    <div id="box-content-prop" style="position: relative;top: -4px;left: -4px;padding: 4px 0 0 4px;">
        <!-- 内容 -->
        <div class="box-content">
            <div class="sub-title" style="border-bottom: none;">
                <ul class="title-nav">
                    <li class="visited" id="sub-title-diy">业主交房结算单</li>
                </ul>
            </div>
            <div class="sub-content" style="padding: 0;">
                <div class="content-main" style="padding: 0;">
                    <div class="content-item">
                        <table class="content-table">
                            <thead>
                            <tr style="border: 1px solid #ddd;">
                                <td class="title">房号</td>
                                <td colspan="5" class="house_address next" style="text-align: left;"></td>
                                <td class="title">
                                    <span style="color: #000;">结算日期</span>
                                </td>
                                <td style="padding: 0;">
                                    <input type="text" name="calCostDate" placeholder="结算日期" readonly required>
                                </td>
                            </tr>
                            </thead>
                            <tbody>
                            <!-- =========【基本信息】========= -->
                            <tr class="content-table-head">
                                <td class="title">客户</td>
                                <td><input type="text" class="next" name="cco_applicant" readonly></td>
                                <td class="title">合同日期</td>
                                <td style="width: 186px;"><input type="text" class="next" name="contract_date" readonly></td>
                                <td class="title">最近交租日</td>
                                <td><input type="text" class="next" value="--" name="" readonly></td>
                                <td class="title cco_handhouse_title">接房日期</td>
                                <td><input type="text" name="cco_realDate" placeholder="接房日期" readonly required></td>
                            </tr>
                            <tr class="content-table-head">
                                <td class="title">月租金</td>
                                <td><input type="text" class="error" name="contract_rent" readonly></td>
                                <td class="title">押金</td>
                                <td><input type="text" class="error" name="contractBody_Pay" readonly></td>
                                <td class="title">银行卡</td>
                                <td colspan="3">
                                    <input type="text" class="next" name="customer_bank" style="width:90%;float: left;height: 36px;" readonly>
                                    <button id="edit-customer-bank" style="width:10%;height: 36px;float: left;background: #3498db;color: #fff;border: none;cursor: pointer;">选择</button>
                                </td>
                            </tr>
                            <tr class="content-table-head">
                                <td>结算单图片</td>
                                <td colspan="3" style="padding: 10px 10px 0;">
                                    <div class="images-box">
                                        <div class="images-btn" data-type="JSD" data-image-type="contract">选择图片</div>
                                    </div>
                                    <div style="line-height: 26px;text-align: left;font-size: 13px;"><span id="JSD-count">0</span>/<span id="JSD-limit">3</span></div>
                                </td>
                                <td class="title">合约备注</td>
                                <td colspan="3"><textarea class="error" id="cco_applicationContent" readonly></textarea></td>
                            </tr>

                            <!-- =========【代理费结算】========= -->
                            <tr data-type="代理费">
                                <td class="content-table-title" colspan="8">代理费结算（管家填写）</td>
                            </tr>
                            <tr data-type="代理费" class="content-table-head" style="background: #f5f8fa;">
                                <td class="title" colspan="2">结算费用</td>
                                <td class="title" colspan="5">收费说明</td>
                                <td>小计</td>
                            </tr>
                            <tr data-type="代理费" data-name="费用">
                                <%--<td class="cco_applicationType error"></td>--%>
                                <td><input type="text" name="sci_unitPrice" placeholder="费用" required></td>
                                <td colspan="5"><input type="text" name="sci_desc" placeholder="收费说明"></td>
                                <td><input type="text" name="sci_totalCosts" placeholder="小计" disabled></td>
                            </tr>
                            <tr data-type="代理费">
                                <td class="title" colspan="7" style="text-align: right;">合计</td>
                                <td><input type="text" name="total-cost" id="statement_agent" placeholder="合计" disabled></td>
                            </tr>

                            <!-- =========【消费结算】========= -->
                            <tr data-type="消费">
                                <td class="content-table-title" colspan="8">消费结算（管家填写）</td>
                            </tr>
                            <tr data-type="消费" class="content-table-head" style="background: #f5f8fa;">
                                <td class="title">消费类型</td>
                                <td class="title">卡号</td>
                                <td class="title" colspan="2">未交费起止数（或月）</td>
                                <td class="title">消费量</td>
                                <td class="title">单价</td>
                                <td class="title">违约金</td>
                                <td class="title">小计</td>
                            </tr>
                            <tr data-type="消费" data-name="水">
                                <td class="title">水/m³</td>
                                <td><input type="text" name="sci_card" style="text-align: center;" placeholder="卡号" readonly></td>
                                <td>
                                    <span style="display: inline-block;padding: 0 10px;">未交费起数</span>
                                    <input type="text" class="number" name="sci_desc_q" style="width: 50%;" placeholder="未交费起数" required>
                                </td>
                                <td>
                                    <span style="display: inline-block;padding: 0 10px;">抄表数</span>
                                    <input type="text" class="number" name="sci_desc_z" style="width: 64%;" placeholder="未交费止数" disabled>
                                </td>
                                <td><input type="text" class="minusNumber" name="sci_number" placeholder="消费量" readonly></td>
                                <td><input type="text" class="money" name="sci_unitPrice" value="4.3" placeholder="单价"></td>
                                <td><input type="text" class="money" name="sci_penalty" placeholder="违约金"></td>
                                <td><input type="text" name="sci_totalCosts" placeholder="小计" disabled></td>
                            </tr>
                            <tr data-type="消费" data-name="电">
                                <td class="title">电/度</td>
                                <td><input type="text" name="sci_card" style="text-align: center;" placeholder="卡号" readonly></td>
                                <td>
                                    <span style="display: inline-block;padding: 0 10px;">未交费起数</span>
                                    <input type="text" class="number" name="sci_desc_q" style="width: 50%;" placeholder="未交费起数" required>
                                </td>
                                <td>
                                    <span style="display: inline-block;padding: 0 10px;">抄表数</span>
                                    <input type="text" class="number" name="sci_desc_z" style="width: 64%;" placeholder="未交费止数" disabled>
                                </td>
                                <td><input type="text" class="minusNumber" name="sci_number" placeholder="消费量" readonly></td>
                                <td><input type="text" class="money" name="sci_unitPrice" value="0.52" placeholder="单价"></td>
                                <td><input type="text" class="money" name="sci_penalty" placeholder="违约金"></td>
                                <td><input type="text" name="sci_totalCosts" placeholder="小计" disabled></td>
                            </tr>
                            <tr data-type="消费" data-name="气">
                                <td class="title">气/m³</td>
                                <td><input type="text" name="sci_card" style="text-align: center;" placeholder="卡号" readonly></td>
                                <td>
                                    <span style="display: inline-block;padding: 0 10px;">未交费起数</span>
                                    <input type="text" class="number" name="sci_desc_q" style="width: 50%;" placeholder="未交费起数" required>
                                </td>
                                <td>
                                    <span style="display: inline-block;padding: 0 10px;">抄表数</span>
                                    <input type="text" class="number" name="sci_desc_z" style="width: 64%;" placeholder="未交费止数" disabled>
                                </td>
                                <td><input type="text" class="minusNumber" name="sci_number" placeholder="消费量" readonly></td>
                                <td><input type="text" class="money" name="sci_unitPrice" value="1.72" placeholder="单价"></td>
                                <td><input type="text" class="money" name="sci_penalty" placeholder="违约金"></td>
                                <td><input type="text" name="sci_totalCosts" placeholder="小计" disabled></td>
                            </tr>
                            <tr data-type="消费" data-name="垃圾处理">
                                <td class="title">垃圾处理/月</td>
                                <td colspan="3"><input type="text" name="sci_desc" placeholder="说明"></td>
                                <td><input type="text" class="minusNumber" name="sci_number" placeholder="消费量"></td>
                                <td><input type="text" class="money" name="sci_unitPrice" value="8" placeholder="单价"></td>
                                <td><input type="text" class="money" name="sci_penalty" placeholder="违约金"></td>
                                <td><input type="text" name="sci_totalCosts" placeholder="小计" disabled></td>
                            </tr>
                            <tr data-type="消费" data-name="物管费">
                                <td class="title">物管费/月</td>
                                <td colspan="3"><input type="text" name="sci_desc" placeholder="说明"></td>
                                <td><input type="text" class="minusNumber" name="sci_number" placeholder="消费量"></td>
                                <td><input type="text" class="money" name="sci_unitPrice" placeholder="单价"></td>
                                <td><input type="text" class="money" name="sci_penalty" placeholder="违约金"></td>
                                <td><input type="text" name="sci_totalCosts" placeholder="小计" disabled></td>
                            </tr>
                            <tr data-type="消费" data-name="有线电视">
                                <td class="title">有线电视/月</td>
                                <td colspan="3"><input type="text" name="sci_desc" placeholder="说明"></td>
                                <td><input type="text" class="minusNumber" name="sci_number" placeholder="消费量"></td>
                                <td><input type="text" class="money" name="sci_unitPrice" value="25" placeholder="单价"></td>
                                <td><input type="text" class="money" name="sci_penalty" placeholder="违约金"></td>
                                <td><input type="text" name="sci_totalCosts" placeholder="小计" disabled></td>
                            </tr>
                            <tr data-type="消费" data-name="宽带">
                                <td class="title">宽带/月</td>
                                <td colspan="3"><input type="text" name="sci_desc" placeholder="说明"></td>
                                <td><input type="text" class="minusNumber" name="sci_number" placeholder="消费量"></td>
                                <td><input type="text" class="money" name="sci_unitPrice" placeholder="单价"></td>
                                <td><input type="text" class="money" name="sci_penalty" placeholder="违约金"></td>
                                <td><input type="text" name="sci_totalCosts" placeholder="小计" disabled></td>
                            </tr>
                            <tr data-type="消费" data-name="租金">
                                <td class="title">租金/天</td>
                                <td colspan="3"><input type="text" name="sci_desc" placeholder="说明"></td>
                                <td><input type="text" class="minusNumber" name="sci_number" placeholder="消费量"></td>
                                <td><input type="text" class="money" name="sci_unitPrice" placeholder="单价"></td>
                                <td><input type="text" class="money" name="sci_penalty" placeholder="违约金"></td>
                                <td><input type="text" name="sci_totalCosts" placeholder="小计" disabled></td>
                            </tr>
                            <tr data-type="消费" data-name="其他">
                                <td class="title">其他</td>
                                <td colspan="3"><input type="text" name="sci_desc" placeholder="说明"></td>
                                <td><input type="text" class="minusNumber" name="sci_number" placeholder="消费量"></td>
                                <td><input type="text" class="minusNumber" name="sci_unitPrice" placeholder="单价"></td>
                                <td><input type="text" class="minusNumber" name="sci_penalty" placeholder="违约金"></td>
                                <td><input type="text" name="sci_totalCosts" placeholder="小计" disabled></td>
                            </tr>
                            <tr data-type="消费">
                                <td class="title" colspan="7" style="text-align: right;">合计</td>
                                <td><input type="text" name="total-cost" id="statement_costs" placeholder="合计" disabled></td>
                            </tr>

                            <!-- =========【物品结算】========= -->
                            <tr data-type="物品">
                                <td class="content-table-title" colspan="8">物品结算（管家填写）</td>
                            </tr>
                            <tr data-type="物品" class="content-table-head" style="background: #f5f8fa;">
                                <td class="title">物品结算</td>
                                <td class="title" colspan="3">清单</td>
                                <td class="title" colspan="3">消费说明</td>
                                <td class="title">小计</td>
                            </tr>
                            <tr data-type="物品" data-name="维修">
                                <td class="title">维修</td>
                                <td colspan="3" class="goods-list">
                                    <div class="cost-add-box" style="text-align: left;">
                                        <span class="cost-add-box-icon icon-plus-sign" onclick="addCostItems(this)" title="添加"></span>
                                    </div>
                                </td>
                                <td colspan="3"><input type="text" name="sdi_remark" placeholder="消费说明"></td>
                                <td><input type="text" name="sci_totalCosts" placeholder="小计" disabled></td>
                            </tr>
                            <tr data-type="物品" data-name="赔偿">
                                <td class="title">赔偿</td>
                                <td colspan="3" class="goods-list">
                                    <div class="cost-add-box" style="text-align: left;">
                                        <span class="cost-add-box-icon icon-plus-sign" onclick="addCostItems(this)" title="添加"></span>
                                    </div>
                                </td>
                                <td colspan="3"><input type="text" name="sdi_remark" placeholder="消费说明"></td>
                                <td><input type="text" name="sci_totalCosts" placeholder="小计" disabled></td>
                            </tr>
                            <tr data-type="物品" data-name="保洁">
                                <td class="title">保洁</td>
                                <td colspan="3" class="goods-list">
                                    <div class="cost-add-box" style="text-align: left;">
                                        <span class="cost-add-box-icon icon-plus-sign" onclick="addCostItems(this)" title="添加"></span>
                                    </div>
                                </td>
                                <td colspan="3"><input type="text" name="sdi_remark" placeholder="消费说明"></td>
                                <td><input type="text" name="sci_totalCosts" placeholder="小计" disabled></td>
                            </tr>
                            <tr data-type="物品" data-name="其他">
                                <td class="title">其他</td>
                                <td colspan="3" class="goods-list">
                                    <div class="cost-add-box" style="text-align: left;">
                                        <span class="cost-add-box-icon icon-plus-sign" onclick="addCostItems(this)" title="添加"></span>
                                    </div>
                                </td>
                                <td colspan="3"><input type="text" name="sdi_remark" placeholder="消费说明"></td>
                                <td><input type="text" name="sci_totalCosts" placeholder="小计" disabled></td>
                            </tr>
                            <tr data-type="物品">
                                <td class="title" colspan="7" style="text-align: right;">合计</td>
                                <td><input type="text" name="total-cost" id="statement_goods" placeholder="合计" disabled></td>
                            </tr>

                            <!-- =========【违约金结算】========= -->
                            <tr data-type="违约金">
                                <td class="content-table-title" colspan="8">违约金结算（财务填写）</td>
                            </tr>
                            <tr data-type="违约金" class="content-table-head" style="background: #f5f8fa;">
                                <td class="title" colspan="2">违约金类型</td>
                                <td class="title">月租金</td>
                                <td class="title">违约金比例</td>
                                <td class="title" colspan="3">说明</td>
                                <td class="title">小计</td>
                            </tr>
                            <tr data-type="违约金" data-name="金融公司">
                                <td class="title">金融公司</td>
                                <td><input type="text" name="rent_type" style="text-align: center;" readonly></td>
                                <td><input type="text" class="money" name="sci_unitPrice" placeholder="月租金"></td>
                                <td>
                                    <input type="text" class="money" name="sci_number" maxlength="3" style="width: 88%;text-align: center;" placeholder="比例">
                                    <label class="error" style="display: inline-block;width: 10%;">%</label>
                                </td>
                                <td colspan="3"><input name="sci_desc" type="text" placeholder="说明"></td>
                                <td><input type="text" name="sci_totalCosts" placeholder="小计" disabled></td>
                            </tr>
                            <tr data-type="违约金" data-name="滞纳金">
                                <td class="title" colspan="2">违约金/滞纳金</td>
                                <td><input type="text" class="money" name="sci_unitPrice" placeholder="月租金"></td>
                                <td>
                                    <input type="text" class="money" name="sci_number" maxlength="3" style="width: 88%;text-align: center;" placeholder="比例">
                                    <label class="error" style="display: inline-block;width: 10%;">%</label>
                                </td>
                                <td colspan="3"><input type="text" name="sci_desc" placeholder="说明"></td>
                                <td><input type="text" name="sci_totalCosts" placeholder="小计" disabled></td>
                            </tr>
                            <tr data-type="违约金">
                                <td class="title" colspan="7" style="text-align: right;">合计</td>
                                <td><input type="text" name="total-cost" id="statement_penalty" placeholder="合计" disabled></td>
                            </tr>

                            <!-- =========【费用结余】========= -->
                            <tr data-type="结余">
                                <td class="content-table-title" colspan="8">费用结余（财务填写）</td>
                            </tr>
                            <tr data-type="结余" class="balance content-table-head" style="background: #f5f8fa;">
                                <td class="title" colspan="2">费用名称</td>
                                <td class="title" colspan="4">说明</td>
                                <td class="title">公司应收</td>
                                <td class="title">公司应付</td>
                            </tr>
                            <tr data-type="结余" data-name="1">
                                <td class="title" colspan="2">消费结算费用</td>
                                <td colspan="4"><input type="text" name="csb_desc" placeholder="说明" maxlength="120" disabled></td>
                                <td><input type="text" name="csb_credit" id="statement_costs_credit" value="0" placeholder="应收" disabled></td>
                                <td><input type="text" name="csb_debit" id="statement_costs_debit" value="0" placeholder="应付" disabled></td>
                            </tr>
                            <tr data-type="结余" data-name="2">
                                <td class="title" colspan="2">物品结算费用</td>
                                <td colspan="4"><input type="text" name="csb_desc" placeholder="说明" maxlength="120" disabled></td>
                                <td><input type="text" name="csb_credit" id="statement_goods_credit" value="0" placeholder="应收" disabled></td>
                                <td><input type="text" name="csb_debit" id="statement_goods_debit" value="0" placeholder="应付" disabled></td>
                            </tr>
                            <tr data-type="结余" data-name="3">
                                <td class="title" colspan="2">代理结算费用</td>
                                <td colspan="4"><input type="text" name="csb_desc" placeholder="说明" maxlength="120" disabled></td>
                                <td><input type="text" name="csb_credit" id="statement_agent_credit" value="0" placeholder="应收" disabled></td>
                                <td><input type="text" name="csb_debit" id="statement_agent_debit" value="0" placeholder="应付" disabled></td>
                            </tr>
                            <tr data-type="结余" data-name="4">
                                <td class="title" colspan="2">违约金结算费用</td>
                                <td colspan="4"><input type="text" name="csb_desc" placeholder="说明" maxlength="120" disabled></td>
                                <td><input type="text" name="csb_credit" id="statement_penalty_credit" value="0" placeholder="应收" disabled></td>
                                <td><input type="text" name="csb_debit" id="statement_penalty_debit" value="0" placeholder="应付" disabled></td>
                            </tr>
                            <tr data-type="结余" data-name="5">
                                <td class="title" colspan="2">其他结算费用</td>
                                <td colspan="4"><input type="text" name="csb_desc" placeholder="说明" maxlength="120" disabled></td>
                                <td><input type="text" name="csb_credit" id="statement_other_credit" value="0" placeholder="应收" disabled></td>
                                <td><input type="text" name="csb_debit" id="statement_other_debit" value="0" placeholder="应付" disabled></td>
                            </tr>
                            <tr data-type="结余" data-name="6">
                                <td class="title" colspan="2">维修服务费</td>
                                <td colspan="4"><input type="text" name="csb_desc" placeholder="说明" maxlength="120" disabled></td>
                                <td><input type="text" name="csb_credit" id="statement_rent_credit" value="0" placeholder="应收" disabled></td>
                                <td><input type="text" name="csb_debit" id="statement_rent_debit" value="0" placeholder="应付" disabled></td>
                            </tr>
                            <tr data-type="结余" data-name="7">
                                <td class="title" colspan="2">押金</td>
                                <td colspan="4"><input type="text" name="csb_desc" placeholder="说明" maxlength="120" disabled></td>
                                <td><input type="text" name="csb_credit" id="statement_deposit_credit" value="0" placeholder="应收" disabled></td>
                                <td><input type="text" name="csb_debit" id="statement_deposit_debit" value="0" placeholder="应付" disabled></td>
                            </tr>
                            <tr class="content-table-head" data-type="结余">
                                <td class="title" colspan="2" style="text-align: right;">应付结余（公司应付-公司应收）
                                    <input type="hidden" name="total-cost" id="statement_balance" placeholder="结余" disabled>
                                </td>
                                <td colspan="6" style="text-align: right; padding: 0 12px;border-left: none;" id="statement_balance_box"></td>
                            </tr>
                            <tr class="content-table-head">
                                <td class="title" colspan="2">结算备注</td>
                                <td colspan="6" id="remarks-box" data-tip="">
                                    <textarea id="statement_remarks" placeholder="备注"></textarea>
                                </td>
                            </tr>
                            </tbody>
                            <tfoot>
                            <tr>
                                <td>结算人</td>
                                <td><input type="text" class="next" name="statement_balancer" id="statement_balancer" readonly required></td>
                                <td>客户</td>
                                <td><input type="text" class="next" id="cco_applicant" readonly></td>
                                <td>销售主管</td>
                                <td><input type="text" class="next" id="em_director" readonly></td>
                                <td>财务复核</td>
                                <td><input type="text" class="next" id="em_reviewer" readonly></td>
                            </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <!-- 操作 -->
        <div class="box-content">
            <div class="content-foot">
                <button class="btn" id="submitContractStatement" onclick="submitContractStatement()">提交</button>
            </div>
        </div>
    </div>
</div>
</body>
</html>