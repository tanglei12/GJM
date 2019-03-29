<%@ page language="java" import="java.util.Date" pageEncoding="utf-8" %>
<%
    response.setHeader("Pragma", "No-cache");
    response.setHeader("Cache-Control", "no-cache");
    response.setDateHeader("Expires", -10);
%>
<!DOCTYPE>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1,user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="format-detection" content="telephone=no">
    <meta name="format-detection" content="email=no">
    <title>房源编辑</title>
    <link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/app/common.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/app/contractEdit.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/appPage/house-eidt.css?v=<%=new Date().getTime() %>" rel="stylesheet" type="text/css">
    <link href="/resources/common/imageUpload/css/jquery.image-upload.css" rel="stylesheet" type="text/css"><!-- 图片上传 -->


    <script src="/resources/js/jquery-1.7.2.min.js" type="text/javascript"></script>
    <script src="/resources/js/common/common.js"></script>
    <script src="/resources/mui/mui.min.js"></script>
    <script src="/resources/mui/mui.previewimage.js"></script> <!-- 图片浏览 -->
    <script src="/resources/mui/mui.zoom.js"></script><!-- 图片浏览 -->
    <script src="/resources/common/imageUpload/js/jquery.image-upload.js"></script><!-- 图片上传 -->
    <script src="/resources/js/appPage/house-edit.js?v=1.0"></script>
    <style>
        .appImageBox .image-item .image-item-img {
            width: 110px;
            height: 70px;
            border: none;
            border-radius: 4px;
        }

        .appImageBox .image-item {
            display: block;
            float: left;
            position: relative;
            width: 110px;
            height: 70px;
            cursor: pointer;
            margin-right: 10px;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
<div class="content" style="margin-top: 10px;">
    <div class="messageContent" style="margin-bottom: 10px; padding: 0 2%">
        <div id="uploadImage"></div>
    </div>
</div>
<!-- 房屋信息 -->
<div class="content" style="margin-top: 0px;">
    <div class="messageContent" style="margin-top: 0px;">
        <!-- 楼层房号 -->
        <dl>
            <dt>
                <label>物业小区</label><span>*</span>
            </dt>
            <dd>
                <div class="input-content"><input name="house-info" readonly required></div>
                <div class="input-icon fa-angle-right"></div>
            </dd>
        </dl>
        <!-- 房源房号 -->
        <dl>
            <dt>
                <label>楼层房号</label><span>*</span>
            </dt>
            <dd>
                <div class="input-content input-right" data-label="楼"><input type="text" name="house-floor" maxlength="2" placeholder="楼层" style="text-align: center;" required/></div>
                <div class="input-content input-right" data-label="号"><input type="text" name="house-room" maxlength="2" placeholder="房号" style="text-align: center;" required/></div>
                <div class="input-icon"></div>
            </dd>
        </dl>
        <!-- 产权地址 -->
        <dl>
            <dt>
                <label>产权地址</label><span>*</span>
            </dt>
            <dd>
                <div class="input-content">
                    <input type="text" name="he_address" placeholder="产权地址" style="text-align: right;" required>
                </div>
                <div class="input-icon"></div>
            </dd>
        </dl>
        <!-- 房屋户型 -->
        <dl>
            <dt>
                <label>房源户型</label><span>*</span>
            </dt>
            <dd>
                <div class="input-content input-right" data-label="室"><select type="text" name="hi_houseS" style="text-indent: 46%;direction: initial;" required></select></div>
                <div class="input-content input-right" data-label="厅"><select type="text" name="hi_houseT" style="text-indent: 46%;direction: initial;" required></select></div>
                <div class="input-content input-right" data-label="卫"><select type="text" name="hi_houseW" style="text-indent: 46%;direction: initial;" required></select></div>
                <div class="input-icon"></div>
            </dd>
        </dl>
        <!-- 房屋面积 -->
        <dl>
            <dt>
                <label>房屋面积</label><label class="suffix">(㎡)</label><span>*</span>
            </dt>
            <dd>
                <div class="input-content"><input type="number" name="hi_measure" placeholder="房屋面积" required></div>
                <div class="input-icon"></div>
            </dd>
        </dl>
        <!-- 存房价格 -->
        <!-- 			<dl> -->
        <!-- 				<dt> -->
        <!-- 					<label>存房价格</label><label class="suffix">：元/月</label><span>*</span> -->
        <!-- 				</dt> -->
        <!-- 				<dd class="item-content"> -->
        <!-- 					<div class="input-content"><input type="number" name="hi_keepMoney" placeholder="存房价格" required></div> -->
        <!-- 					<div class="input-icon"></div> -->
        <!-- 				</dd> -->
        <!-- 			</dl> -->
        <!-- 房屋类型 -->
        <dl>
            <dt>
                <label>房屋类型</label><span>*</span>
            </dt>
            <dd>
                <div class="input-content">
                    <select name="hi_type" required>
                        <option value="普通住宅">普通住宅</option>
                        <option value="高档住宅">高档住宅</option>
                    </select>
                </div>
                <div class="input-icon fa-angle-right"></div>
            </dd>
        </dl>
        <!-- 房屋情况 -->
        <dl>
            <dt>
                <label>装修情况</label><span>*</span>
            </dt>
            <dd>
                <div class="input-content">
                    <select name="hi_state" required>
                        <option value="基装">基装</option>
                        <option value="精装">精装</option>
                        <option value="中装">中装</option>
                        <option value="清水">清水</option>
                        <option value="豪装">豪装</option>
                    </select>
                </div>
                <div class="input-icon fa-angle-right"></div>
            </dd>
        </dl>
        <!-- 房屋朝向 -->
        <dl>
            <dt>
                <label>房屋朝向</label><span>*</span>
            </dt>
            <dd>
                <div class="input-content">
                    <select name="hi_orientation" required>
                        <option value="东">东</option>
                        <option value="南">南</option>
                        <option value="西">西</option>
                        <option value="北">北</option>
                        <option value="东南">东南</option>
                        <option value="东北">东北</option>
                        <option value="西南">西南</option>
                        <option value="西北">西北</option>
                    </select>
                </div>
                <div class="input-icon fa-angle-right"></div>
            </dd>
        </dl>
        <!-- 房屋品牌 -->
        <dl>
            <dt>
                <label>房屋品牌</label><span>*</span>
            </dt>
            <dd>
                <div class="input-content">
                    <select name="hb_id" required>
                        <option value="0">选择品牌</option>
                    </select>
                </div>
                <div class="input-icon fa-angle-right"></div>
            </dd>
        </dl>
    </div>
</div>
<div class="content">
    <div class="messageContent" style="margin-top: 15px;">
        <!-- 房东信息 -->
        <dl>
            <dt>
                <label>房东信息</label><span>*</span>
            </dt>
            <dd>
                <div class="input-content" style="margin-right: 15px;">
                    <input type="hidden" name="cc_code">
                    <input type="hidden" name="cc_name">
                    <input type="hidden" name="ccp_phone">
                    <input type="text" name="cc_info" placeholder="选择房东" readonly required>
                </div>
                <button class="input-icon fa-pencil" name="cc_edit" style="display: none;"></button>
            </dd>
        </dl>
    </div>
</div>
<!-- 操作 -->
<div class="content" style="display: flex; background: none; margin-top: 0px;">
    <button class="content-submmit next-bg" name="save">提交</button>
</div>
<div id="wuyeDiv"></div>
</body>
</html>