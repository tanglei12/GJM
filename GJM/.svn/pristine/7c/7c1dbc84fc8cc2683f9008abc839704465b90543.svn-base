<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="format-detection" content="telephone=no">
    <meta name="format-detection" content="email=no">
    <title>费用结算</title>
    <link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/mui/mui-scroll.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/app/common.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/app/propertySettlementEdit.css" rel="stylesheet" type="text/css">


    <script src="/resources/js/jquery-2.0.0.min.js"></script>
    <script src="/resources/js/common/common.js"></script>
    <script src="/resources/mui/mui.js"></script>
    <script src="/resources/mui/mui.zoom.js"></script>
    <script src="/resources/mui/mui.previewimage.js"></script>
    <script src="/resources/js/appPage/appImageUpload.js"></script>
    <script src="/resources/js/appPage/propertySettlementInfo.js?v=<%=System.currentTimeMillis()%>"></script>
</head>
<body>
<!-- 房源情况 -->
<div class="content content-top">
    <div class="content-item" id="show-house-more" style="padding-bottom: 0;">
        <div class="item-content" style="line-height: 48px;">
            <div class="content-top-icon next">
                <i class="fa-home"></i>
            </div>
            <div class="content-top-text" id="house-address" style="flex: 1;"></div>
            <div class="content-top-text error" id="house-rent"></div>
            <button class="content-top-option" name="show-house-more">
                <i class="fa-angle-down"></i>
            </button>
        </div>
    </div>
    <div class="content-item house-more" id="house-more">
        <div class="item-content">
            <div class="item-more-title">合同起止日期：</div>
            <div class="item-more-content" id="con-date"></div>
        </div>
        <div class="item-content">
            <div class="item-more-title">房屋户型：</div>
            <div class="item-more-content" id="house-stw"></div>
        </div>
        <div class="item-content">
            <div class="item-more-title">房屋押金：</div>
            <div class="item-more-content" id="house-pay"></div>
        </div>
    </div>
</div>
<main>
    <!-- 消费结算 -->
    <div class="content" data-type="消费">
        <div class="content-head">
            <div class="content-item-icon"><img src="/resources/image/appPage/settlement_1.png"></div>
            <div class="content-item-title">消费结算</div>
        </div>
        <div class="content-main">
            <div class="content-item" style="flex-direction: column;">
                <dl>
                    <dt>水电气</dt>
                    <dd style="padding-right: 0px;">
                        <input type="text" class="statement_xf error" name="statement_sdq" data-mode="水电气" value="0.0" readonly>
                        <i class="fa-angle-right" style="padding-right: 10px;min-width: 30px;"></i>
                    </dd>
                </dl>
            </div>
            <div class="content-item" style="flex-direction: column;">
                <dl>
                    <dt>垃圾处理</dt>
                    <dd style="padding-right: 0px;">
                        <input type="text" class="statement_xf error" name="statement_lj" data-mode="垃圾处理" value="0.0" readonly>
                        <i class="fa-angle-right" style="padding-right: 10px;min-width: 30px;"></i>
                    </dd>
                </dl>
            </div>
            <div class="content-item" style="flex-direction: column;">
                <dl>
                    <dt>物管费</dt>
                    <dd style="padding-right: 0px;">
                        <input type="text" class="statement_xf error" name="statement_wgf" data-mode="物管费" value="0.0" readonly>
                        <i class="fa-angle-right" style="padding-right: 10px;min-width: 30px;"></i>
                    </dd>
                </dl>
            </div>
            <div class="content-item" style="flex-direction: column;">
                <dl>
                    <dt>有线电视</dt>
                    <dd style="padding-right: 0px;">
                        <input type="text" class="statement_xf error" name="statement_tv" data-mode="有限电视" value="0.0" readonly>
                        <i class="fa-angle-right" style="padding-right: 10px;min-width: 30px;"></i>
                    </dd>
                </dl>
            </div>
            <div class="content-item" style="flex-direction: column;">
                <dl>
                    <dt>宽带</dt>
                    <dd style="padding-right: 0px;">
                        <input type="text" class="statement_xf error" name="statement_kd" data-mode="宽带" value="0.0" readonly>
                        <i class="fa-angle-right" style="padding-right: 10px;min-width: 30px;"></i>
                    </dd>
                </dl>
            </div>
            <div class="content-item" style="flex-direction: column;">
                <dl>
                    <dt>租金</dt>
                    <dd style="padding-right: 0px;">
                        <input type="text" class="statement_xf error" name="statement_rent" data-mode="租金" value="0.0" readonly>
                        <i class="fa-angle-right" style="padding-right: 10px;min-width: 30px;"></i>
                    </dd>
                </dl>
            </div>
            <div class="content-item" style="flex-direction: column;">
                <dl>
                    <dt>其他</dt>
                    <dd style="padding-right: 0px;">
                        <input type="text" class="statement_xf error" name="statement_other" data-mode="其他" value="0.0" readonly>
                        <i class="fa-angle-right" style="padding-right: 10px;min-width: 30px;"></i>
                    </dd>
                </dl>
            </div>
            <div class="content-item">
                <dl>
                    <dd>
                        <span style="display: block;width: 100%;text-align: right;">小计：<span class="error" id="statement_costs"></span>元</span>
                    </dd>
                </dl>
            </div>
        </div>
    </div>
    <!-- 代理费结算 -->
    <div class="content" data-type="代理费">
        <div class="content-head">
            <div class="content-item-icon"><img src="/resources/image/appPage/settlement_3.png"></div>
            <div class="content-item-title">代理费结算</div>
        </div>
        <div class="content-main">
            <div class="content-item">
                <dl>
                    <dt id="statement_dlf_title">代理费</dt>
                    <dd>
                        <input type="number" class="statement_dlf error" name="statement_dlf" value="0" placeholder="代理费">
                    </dd>
                </dl>
            </div>
            <div class="content-item">
                <dl>
                    <dd>
                        <span style="display: block;width: 100%;text-align: right;">总计：<span class="error" id="statement_agent"></span>元</span>
                    </dd>
                </dl>
            </div>
        </div>
    </div>
    <!-- 物品结算 -->
    <div class="content" data-type="物品">
        <div class="content-head">
            <div class="content-item-icon"><img src="/resources/image/appPage/settlement_2.png"></div>
            <div class="content-item-title">物品结算</div>
        </div>
        <div class="content-main">
            <div class="content-item" style="flex-direction: column;">
                <dl>
                    <dt>维修</dt>
                    <dd style="padding-right: 0px;">
                        <input type="text" class="statement_wp error" name="statement_wx" data-mode="维修" value="0.0" readonly>
                        <i class="fa-angle-right" style="padding-right: 10px;min-width: 30px;"></i>
                    </dd>
                </dl>
            </div>
            <div class="content-item" style="flex-direction: column;">
                <dl>
                    <dt>保洁</dt>
                    <dd style="padding-right: 0px;">
                        <input type="text" class="statement_wp error" name="statement_bj" data-mode="保洁" value="0.0" readonly>
                        <i class="fa-angle-right" style="padding-right: 10px;min-width: 30px;"></i>
                    </dd>
                </dl>
            </div>
            <div class="content-item" style="flex-direction: column;">
                <dl>
                    <dt>其他</dt>
                    <dd style="padding-right: 0px;">
                        <input type="text" class="statement_wp error" name="statement_other2" data-mode="其他" value="0.0" readonly>
                        <i class="fa-angle-right" style="padding-right: 10px;min-width: 30px;"></i>
                    </dd>
                </dl>
            </div>
            <div class="content-item">
                <dl>
                    <dd>
                        <span style="display: block;width: 100%;text-align: right;">小计：<span class="error" id="statement_goods"></span>元</span>
                    </dd>
                </dl>
            </div>
        </div>
    </div>
    <!-- 违约金结算 -->
    <div class="content" data-type="违约金">
        <div class="content-head">
            <div class="content-item-icon"><img src="/resources/image/appPage/settlement_3.png"></div>
            <div class="content-item-title">违约金结算</div>
        </div>
        <div class="content-main">
            <div class="content-item">
                <dl>
                    <dt>结算费用</dt>
                    <dd>
                        <input type="number" class="error" name="statement_wyj" value="0" readonly>
                    </dd>
                </dl>
            </div>
            <div class="content-item">
                <dl>
                    <dd>
                        <span style="display: block;width: 100%;text-align: right;">总计：<span class="error" id="statement_penalty"></span>元</span>
                    </dd>
                </dl>
            </div>
        </div>
    </div>
    <!-- 费用结余 -->
    <div class="content" data-type="费用结余">
        <div class="content-head">
            <div class="content-item-icon"><img src="/resources/image/appPage/settlement_3.png"></div>
            <div class="content-item-title">费用结余</div>
        </div>
        <div class="content-main">
            <div class="content-item">
                <dl style="font-weight: bold;">
                    <dt>消费结算费用</dt>
                    <dd>
                        <input type="text" class="error" name="statement_1" value="0.0" readonly>
                    </dd>
                </dl>
            </div>
            <div class="content-item">
                <dl style="font-weight: bold;">
                    <dt>物品结算费用</dt>
                    <dd>
                        <input type="text" class="error" name="statement_2" value="0.0" readonly>
                    </dd>
                </dl>
            </div>
            <div class="content-item">
                <dl style="font-weight: bold;">
                    <dt>代理结算费用</dt>
                    <dd>
                        <input type="text" class="error" name="statement_3" value="0.0" readonly>
                    </dd>
                </dl>
            </div>
            <div class="content-item">
                <dl style="font-weight: bold;">
                    <dt>违约金结算费用</dt>
                    <dd>
                        <input type="text" class="error" name="statement_4" value="0.0" readonly>
                    </dd>
                </dl>
            </div>
            <div class="content-item">
                <dl style="font-weight: bold;">
                    <dt>其他结算费用</dt>
                    <dd>
                        <input type="text" class="error" name="statement_5" value="0.0" readonly>
                    </dd>
                </dl>
            </div>
            <div class="content-item">
                <dl style="font-weight: bold;">
                    <dt>维修服务费</dt>
                    <dd>
                        <input type="text" class="error" name="statement_6" value="0.0" readonly>
                    </dd>
                </dl>
            </div>
            <div class="content-item">
                <dl style="font-weight: bold;">
                    <dt>押金</dt>
                    <dd>
                        <input type="text" class="error" name="statement_7" value="0.0" readonly>
                    </dd>
                </dl>
            </div>
            <div class="content-item">
                <dl>
                    <dd style="justify-content: space-between;">
                        <div id="money-dx" class="error"></div>
                        <div>总计：<span class="error" id="statement_total"></span>&nbsp;元</div>
                    </dd>
                </dl>
            </div>
        </div>
    </div>
    <!-- 图片 -->
    <div class="content" id="image-jsd-box" style="display: none;">
        <div class="content-head">
            <div class="content-item-title">结算单图片</div>
        </div>
        <div class="content-main" id="image-box-jsd" style="display: none;padding: 10px;min-height: 120px;"></div>
    </div>
    <!-- 备注 -->
    <div class="content">
        <div class="content-main" style="border-top: 0;padding: 0;">
            <textarea name="statement_remarks" placeholder="备注" style="position: relative;width: 100%;padding: 10px;height: 100px;resize: none;font-size: 3.8vw;" disabled></textarea>
        </div>
    </div>
    <!-- 其他 -->
    <div class="content">
        <div class="content-main">
            <div class="content-item">
                <dl>
                    <dt>结算人</dt>
                    <dd>
                        <input type="text" name="statement_balancer" placeholder="结算人" disabled>
                    </dd>
                </dl>
            </div>
            <div class="content-item">
                <dl>
                    <dt>结算日期</dt>
                    <dd>
                        <div class="date-angle">
                            <input type="text" name="calCostDate" placeholder="结算日期" disabled>
                        </div>
                    </dd>
                </dl>
            </div>
        </div>
    </div>
    <!-- 签字 -->
    <div class="content" id="image-sign-box" style="display: none;">
        <div class="content-head">
            <div class="content-item-title">客户签字</div>
            <div class="content-item-option">
                <button class="item-option-btn error-bg" name="customer-qz"><i class="fa-pencil"></i>立即签字</button>
            </div>
        </div>
        <div class="content-main" id="image-box-qz" style="display: none;padding: 10px;"></div>
    </div>
</main>
</body>
</html>