<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="format-detection" content="telephone=no">
    <meta name="format-detection" content="email=no">
    <title>房源详情</title>
    <link href="/resources/mui/mui.css" rel="stylesheet" type="text/css">
    <link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/common/common.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/appPage/houseSelect.css?v=1.0" rel="stylesheet" type="text/css">

    <script src="/resources/js/jquery-1.7.2.min.js"></script>
    <script src="/resources/mui/mui.min.js"></script>
    <script src="/resources/mui/mui.previewimage.js"></script>
    <script src="/resources/mui/mui.zoom.js"></script>
    <script src="/resources/js/common/common.hint.js"></script>
    <script src="/resources/js/appPage/houseSelect.js?v=1.4"></script>
</head>
<%--<jsp:include page="../scrf/scrf.jsp"/><!-- csrf防御 -->--%>
<body style="padding-bottom: 56px;">
<div class="content">
    <div class="house_image">
        <div id="slider" class="mui-slider">
            <div id="image_div" class="mui-slider-group mui-slider-loop">
                <!-- 图片内容 -->
            </div>
            <div class="mui-slider-indicator">
                <!-- 页码 -->
            </div>
        </div>
    </div>
</div>
<div class="house_titles">
    <div class="house_title" id="house-address"></div>
    <div class="house_money">
        <label onclick="moneyType(this)">
            <span class="red" id="money"></span>
            <span class="moneyType">付款方式 ></span>
            <div class="house_money_select" style="display: none;">
                <ul>
                    <li class="click"><i class="type">月付</i>:<i class="money">0</i>元/月</li>
                    <li><i class="type">季度付</i>:<i class="money">0</i>元/月</li>
                    <li><i class="type">半年付</i>:<i class="money">0</i>元/月</li>
                    <li><i class="type">年付</i>:<i class="money">0</i>元/月</li>
                </ul>
            </div>
        </label>
    </div>
</div>
<div class="house_message">
    <div class="house_content">
        <div class="supporting">
            <div class="title_class">基本信息</div>
        </div>
        <div class="house_setting">
            <dl>
                <dt>户型：</dt>
                <dd id="houseTSW"></dd>
            </dl>
            <dl>
                <dt>装修：</dt>
                <dd id="renovationText"></dd>
            </dl>
            <dl>
                <dt>楼层：</dt>
                <dd id="floor"></dd>
            </dl>
            <dl>
                <dt>朝向：</dt>
                <dd id="photograph"></dd>
            </dl>
            <dl>
                <dt>装修：</dt>
                <dd id="renovation"></dd>
            </dl>
            <dl>
                <dt>方式：</dt>
                <dd id="mode"></dd>
            </dl>
        </div>
    </div>
    <div class="house_content">
        <div class="supporting">
            <div class="title_class">配套设施</div>
            <div class="supporting_content">
            </div>
        </div>
    </div>
</div>
<div class="house_setting" style="width: 100%; margin-top: 15px; padding: 0 2%;">
    <div class="title_class" style="border-bottom: 1px solid #e8e8e8;">房屋状态</div>
    <dl>
        <dt style="width: 60px">租赁状态：</dt>
        <dd id="state"></dd>
    </dl>
    <dl>
        <dt style="width: 60px">招租状态：</dt>
        <dd id="zstate"></dd>
    </dl>
    <dl>
        <dt style="width: 60px">托管合同：</dt>
        <dd id="contract_intoStatus"></dd>
    </dl>
    <dl>
        <dt style="width: 60px">租赁合同：</dt>
        <dd id="contract_outStatus"></dd>
    </dl>
</div>
<div class="message_div">
    <div class="title_class">联系信息</div>
    <dl>
        <dt>房东信息：</dt>
        <dd id="fMessage"></dd>
    </dl>
    <dl class="bottom">
        <dt>房屋管家：</dt>
        <dd id="gMessage">
            <!-- 				<label class="message_name">王某某</label><label class="message_phone">18716641788</label> -->
        </dd>
    </dl>
</div>
<div class="house_message" style="margin-top: 10px; display: none;">
    <div class="house_content">
        <div class="traffic">
            <div class="title_class">房间信息</div>
            <div class="house_message">
                <div class="house_message_content">
                    <div class="house_checked"><img class="check" src="/resources/image/selected.svg"/></div>
                    <div class="house_message_content1">
                        <div class="house_wo">01卧</div>
                        <div class="house_region">10m²</div>
                        <div class="house_money">600元/月</div>
                    </div>
                </div>
                <div class="house_message_content">
                    <div class="house_checked checked"><img class="check" src="/resources/image/selected.svg"/></div>
                    <div class="house_message_content1">
                        <div class="house_wo">02卧</div>
                        <div class="house_region">10m²</div>
                        <div class="house_money">800元/月</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="house_message" id="house_message_address" style="margin-top: 10px;">
    <div class="house_content">
        <div class="traffic">
            <div class="title_class">交通配套</div>
            <dl>
                <dt>地铁站：</dt>
                <dd id="metro"></dd>
            </dl>
            <dl>
                <dt>公交站：</dt>
                <dd></dd>
            </dl>
            <dl>
                <dt>地址：</dt>
                <dd id="address"></dd>
            </dl>
        </div>
    </div>
</div>
<div class="message_div" style="margin-bottom: 48px;">
    <div class="title_class">查看跟进</div>
    <div class="schedule"></div>
</div>
<div class="button">
    <a class="houseFollow next-bg" name="houseFollow">客户带看</a>
    <a class="houseContract error-bg" name="houseContract">签订合同</a>
</div>
</body>
</html>