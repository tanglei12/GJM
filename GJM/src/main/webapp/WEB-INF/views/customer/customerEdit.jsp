<%@ page language="java" pageEncoding="utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%
    response.setHeader("Pragma", "No-cache");
    response.setHeader("Cache-Control", "no-cache");
    response.setDateHeader("Expires", -10);
%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="Expires" CONTENT="0">
    <meta http-equiv="Cache-Control" CONTENT="no-cache">
    <meta http-equiv="Pragma" CONTENT="no-cache">
    <!-- 公共CSS -->
    <link href="/resources/css/common/common.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/manage_index.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/imageUpload/css/jquery.image-upload.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/zyupload/skins/zyupload-1.0.0.css" rel="stylesheet" type="text/css"><!-- 文件上传插件 -->
    <link href="/resources/common/uber-zoom/uber-zoom.css" rel="stylesheet" type="text/css"><!-- 图片缩放 -->
    <link href="/resources/common/swipeslider-develop/dist/swipeslider.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/datepicker/jquery-ui.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/sweet-alert/css/sweet-alert.css" rel="stylesheet" type="text/css">
    <link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"><!-- 旧字体样式 -->
    <link href="/resources/common/perfect-scrollbar/css/perfect-scrollbar.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/body.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/library/house-info.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/customer/customer.css" rel="stylesheet" type="text/css"><!-- 本地CSS -->
    <link href="/resources/css/customer/customer2.css" rel="stylesheet" type="text/css"><!-- 本地CSS -->

    <!-- 公共JS -->
    <script src="/resources/js/jquery-1.7.2.min.js"></script>
    <script src="/resources/js/common/common.js"></script><!-- 公共插件 -->
    <script src="/resources/js/table-min.js"></script><!-- 表格公共js -->
    <script src="/resources/common/imageUpload/js/jquery.image-upload.js"></script>
    <script src="/resources/common/My97DatePicker/WdatePicker.js"></script><!-- 时间插件 -->
    <script src="/resources/common/sweet-alert/js/sweet-alert.min.js"></script><!-- 提示弹窗 -->
    <script src="/resources/common/datepicker/js/jquery-ui-datepicker.js"></script><!-- 日期插件-->
    <script src="/resources/js/product/jquery-cookie.js"></script><!-- COOKIE -->
    <script src="/resources/Plug-in/jquery.rotate/jquery.rotate.min.js"></script>
    <script src="/resources/common/perfect-scrollbar/js/perfect-scrollbar.jquery.js"></script>
    <script src="/resources/common/uber-zoom/uber-zoom.js"></script><!-- 图片缩放 -->
    <script src="/resources/common/zyupload/zyupload-1.0.0.js"></script><!-- 文件上传插件 -->
    <script src="/resources/js/customer/customerEdit.js?v=<%=System.currentTimeMillis()%>"></script>
    <script src="/resources/js/customer/sendMessage.js"></script><!-- 短信发送 -->
    <script src="/resources/js/bank.js"></script>
    <script src="/resources/js/jquery.qrcode.min.js"></script><!-- 二维码 -->
    <script src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js" charset="utf-8"></script>
    <script src="/resources/Plug-in/jbox-v2.3/jBox/i18n/jquery.jBox-zh-CN.js" charset="utf-8"></script>

    <style type="text/css">
        dl {
            margin: 0;
        }
        .checkbox input[type="checkbox"]:checked + label::after {
            font-family: 'FontAwesome';
            content: "\f00c";
            color: #fff;
            position: absolute;
            top: 0px;
            left: 2px;
            z-index: 100;
            width: 17px;
            height: 17px;
            text-indent: 0;
            font-size: 13px;
        }
        .common-checkbox-checked:BEFORE {
            background-position: -60px -30px !important;
        }
        .common-checkbox:BEFORE {
            content: "";
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 20px;
            height: 20px;
            background-image: url(/resources/image/checkbox.png);
            background-position: 0 -90px;
            background-repeat: no-repeat;
        }
    </style>
</head>

<body>
<!-- 菜单导航 -->
<div class="leftTitle">
    <div class="leftTile-menu">
        <a class="nav-menu nav-menu-focus" onclick="clickTitle(this)">客户概述</a>
        <a class="nav-menu" onclick="clickTitle(this)" id="houseIntention2">客户完善</a>
        <a class="nav-menu" onclick="clickTitle(this)" id="houseIntention3">房源录入</a>
        <a class="nav-menu" onclick="clickTitle(this)" id="houseIntention4">客户带看</a>
        <a class="nav-menu" onclick="clickTitle(this)" id="houseIntention6">客户评价</a>
        <a class="nav-menu" onclick="clickTitle(this)" id="houseIntention5">客户日志</a>
    </div>
</div>

<!-- 意向描述 -->
<div class="contents" id="contents1">
    <div class="content">
        <div class="content-title">
            <div class="content-title-font">基本信息</div>
        </div>
        <div class="conten-text" style="margin-top: 10px; overflow: hidden;" id="contentHouse">
            <div id="textContent" style="padding-top: 10px;">
                <div class="content-text-div" style="margin-bottom: 20px;">
                    <div class="titleType"><img src=""/></div>
                    <div class="content-text-title">客户信息</div>
                    <div class="content-text-div-content">
                        <dl style="width: 40%;">
                            <dt>联系人：</dt>
                            <dd style="width: 74%;">
                                <div class="namePhone"></div>
                                <div class="types" style="width:145px;"></div>
                            </dd>
                        </dl>
                        <dl style="width: 60%;">
                            <dt>证件：</dt>
                            <dd style="width: 80%;">
                                <div class="IDCard" style="float: left;"></div>
                                <div class="cardImage" onclick="cardImage(this)">证</div>
                                <div class="spanImgBox more-img-box card-image" style="top: -46px; left: 188px; position: absolute; display: none;"></div>
                            </dd>
                        </dl>
                        <dl style="width: 100%; height: auto;">
                            <dt>业务记录：</dt>
                            <dd class="type" style="width: 89%; height: auto;">

                            </dd>
                        </dl>
                        <dl style="width: 100%;" class="bankContent">
                            <dt>银行卡：</dt>
                            <dd style="width: 80%;">
                                <div class="bankText" style="float: left;"></div>
                                <div class="cardImage" onclick="cardImage(this)">卡</div>
                                <div class="spanImgBox more-img-box bank-image" style="top: -46px; left: 392px; position: absolute; display: none;"></div>
                            </dd>
                        </dl>
                        <dl>
                            <dt>QQ号码：</dt>
                            <dd class="QQ" style="width: 65%;"></dd>
                        </dl>
                        <dl>
                            <dt>微信账号：</dt>
                            <dd class="WX" style="width: 65%"></dd>
                        </dl>
                        <!-- <dl>
                            <dt>来源：</dt>
                            <dd class="source" style="width: 65%;"></dd>
                        </dl>
                        <dl>
                            <dt>职业：</dt>
                            <dd class="occupation"></dd>
                        </dl> -->
                        <dl>
                            <dt>紧急联系人：</dt>
                            <dd class="urgentUser"></dd>
                        </dl>
                        <dl style="width: 100%;">
                            <dt>联系地址：</dt>
                            <dd class="phoneAddress" style="width: 65%"></dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
        <div class="buttonDiv" style="margin-bottom: 18px; margin-top: 0px; margin-left: 10px;">
            <!-- 				<button id="updateHouse" onclick="" data-type="">带看客户</button> -->
            <button id="updateHouse" onclick="hideShowMessage()" data-type="">短信发送</button>
            <button id="houseEnterInBtn" onclick="houseEnterIn()" data-type="">房源录入</button>
            <button id="houseSeeBtn" onclick="houseSee()" data-type="">客户带看</button>
            <button style="float: right;" onclick="userPerfect()">信息完善</button>
        </div>
    </div>
    <div class="content">
        <div class="content-title">
            <div class="content-title-font">客情维护</div>
        </div>
        <div class="conten-text" id="conten-text1">
            <table>
                <thead>
                <tr>
                    <td>维护时间</td>
                    <td>维护方式</td>
                    <td>维护内容</td>
                    <td>跟进人</td>
                    <td>提醒</td>
                </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>

        <div class="buttonDiv" style="margin-bottom: 10px; margin-top: 2px;">
            <a class="addButton-icon addButton-icon-add" style="width: 80px; margin-left: 47%; cursor: pointer;"
               onclick="messageFollowUp(this)">
                <font style="left: 33px; font-size: 15px; position: absolute; top: 10px;">跟进</font>
            </a>
            <a href="javascript:;" class="addButton-icon addButton-icon-up"
               style="background-color: #fff; width: 80px; margin-left: 47%; cursor: pointer; display: none;"
               onclick="messageFollowUp(this)"></a>
        </div>

        <div class="messageList" style="display: none;">
            <dl>
                <dt>
                    <span>*</span>
                    跟进方式：
                </dt>
                <dd>
                    <select class="form-control" id="htType" onchange="changeRemindShow(this)" style="margin-left: 10px;">
                        <option value="-1">请选择</option>
                        <option value="电话">电话</option>
                        <option value="带看">带看</option>
                        <option value="服务">服务</option>
                        <option value="生活服务">生活服务</option>
                        <option value="其他帮助">其他帮助</option>
                        <option value="提醒">提醒</option>
                    </select>
                </dd>
            </dl>
            <dl style="height: 81px;" id="followUp">
                <dt>
                    <span>*</span>
                    跟进内容：
                </dt>
                <dd style="width: 55%; position: relative; height: auto; overflow: hidden; margin-left: 10px;">
					<textarea class="form-control" maxlength="100" id="htCount" name="htCount" placeholder="跟进内容"
                              style="width: 500px;" rows="3"></textarea>
                    <span class="addRemind" onclick="remindShow()">
						<div class="checkbox checkbox-success" style="float: left; margin-right: 5px;">
							<input name="chickes" type="checkbox">
							<label for="chickes" id="ckLabel"></label>
						</div>
						<span style="float: left; margin-left: 32px;">添加提醒</span>
					</span>
                </dd>
            </dl>
            <div id="remindShow" style="display: none; width: 100%; height: 153px;">
                <dl>
                    <dt>提醒时间：</dt>
                    <dd style="width: 80%;">
                        <div class="dateTimeTitle" style="width: 195px; float: left;">
                            <i class="icon-calendar"></i>
                            <div class="dateTimeContent">
                                <input type="text" id="ht_remind_time" class="dateTime2" value="" placeholder="提醒跟进时间" onfocus="dates()"
                                       style="width: 160px; background: none; line-height: 45px; left: 0px; border-radius: 5px;">
                            </div>
                        </div>
                        <div style="float: left; margin-left: 10px;">
                            <input type="text" placeholder="时" id="hour"
                                   style="width: 40px; height: 40px; line-height: 40px; float: left; text-align: center; border: 1px solid #1ABC9C;"
                                   maxlength="2" onkeyup="value=value.replace(/[^\d]/g,'')" onBlur="hourJudge(this)" value="9"/>
                        </div>
                        <div style="float: left; margin-left: 10px;">
                            <input type="text" placeholder="分" id="min"
                                   style="width: 40px; height: 40px; line-height: 40px; float: left; text-align: center; border: 1px solid #1ABC9C;"
                                   maxlength="2" onkeyup="value=value.replace(/[^\d]/g,'')" onBlur="minJudge(this)" value="40"/>
                        </div>
                    </dd>
                </dl>
                <dl style="height: 81px; margin-bottom: 15px;">
                    <dt>提醒内容：</dt>
                    <dd>
						<textarea class="form-control" maxlength="100" id="htRemindCount" name="htRemindCount" placeholder="提醒内容"
                                  style="width: 500px; margin-left: 10px;" rows="3"></textarea>
                    </dd>
                </dl>
            </div>
            <dl>
                <dd style="margin-left: 110px; margin-left: 120px;">
                    <button onclick="addCutomerFollowUp()">添加跟进</button>
                </dd>
            </dl>
        </div>
    </div>
</div>

<!-- 客户信息 -->
<div class="contents" id="contents2" style="display: none;">
    <div class="content">
        <div class="content-title">
            <div class="content-title-font">客户信息</div>
            <div id="power1" style="flex: 1; padding-top: 3px;"></div>
            <!-- 			<a href="javascript:;" class="edit-customer" onclick="customerEdit()">编辑</a> -->
            <!-- 			<a href="javascript:;" class="edit-customer-save" onclick="customerSave()">保存</a> -->
            <!-- 			<a href="javascript:;" class="edit-customer-cancel" onclick="customerCancel()">取消</a> -->
        </div>
        <!-- 主体 -->
        <div id="main-box">
            <div class="main-box-sub">
                <div class="content-text-div" style="margin-top: 10px;">
                    <div class="content-text-title">基本信息<font style="color:#E74C3C;">*</font><i class="fa fa-angle-double-down" style="float: right; width: 20px; height: 22px; line-height: 22px; margin-left: 8px; cursor:pointer;" onclick="bankUp(this)"></i></div>
                    <div class="more-content">
                        <div class="content-text-div-content">
                            <input type="hidden" name="cc_id">
                            <input type="hidden" name="ce_id">
                            <dl>
                                <dt><font color="#E74C3C">*</font>用户姓名：</dt>
                                <dd><input type="text" id="userName" value="" readonly onblur="bankUserName(this)" disabled="disabled"></dd>
                            </dl>
                            <dl style="height: auto; overflow: hidden;">
                                <dt><font color="#E74C3C">*</font>手机号码：</dt>
                                <dd style="height: auto; overflow: hidden;">
                                    <div class="phoneDiv">
                                        <div style="float: left; position: relative;">
                                            <select disabled="disabled" id="phoneType" onchange="phoneSelect(this)" style="width: 75px; margin-right: 10px;">
                                                <option value="1">常用</option>
                                                <option value="2">备用</option>
                                            </select><input type="text" id="phone" value="" onkeypress="keyPress()" onblur="phoneBool(this)" readonly/>
                                            <i class="fa fa-chevron-circle-down" id="phoneUpDown" style="margin-left: 10px; cursor: pointer;" onclick="phoneDown(this)"></i>
                                            <a class="addButton-icon addButton-icon-add" style="width: 34px; margin-left: 10px; position:absolute; right:-41px; top:-6px; cursor: pointer; display: none;" onclick="addPhone(this)"></a>
                                        </div>
                                        <div style="float: left; margin-left: 48px; display: none;" id="addPhoneDiv">
                                            <select class="edit" style="height: 33px; line-height: 33px;">
                                                <option>常用</option>
                                                <option selected="selected">备用</option>
                                            </select>
                                            <input type="text" style="height: 33px; line-height: 33px;" class="edit" id="phoneEdit" value="" onkeypress="keyPress()"/>
                                            <button onclick="addPhones(this)">确定</button>
                                        </div>
                                    </div>
                                    <div class="morePhone" style="display: none;">

                                    </div>
                                </dd>
                            </dl>
                            <dl>
                                <dt><font color="#E74C3C">*</font>证件类型：</dt>
                                <dd>
                                    <select disabled="disabled" id="cardType" onchange="IDCardChange()">
                                        <option value="-1">请选择</option>
                                        <option value="1" selected="selected">身份证</option>
                                        <option value="2">军官证</option>
                                        <option value="3">商户号</option>
                                        <option value="4">护照</option>
                                        <option value="5">台湾居民通行证</option>
                                        <option value="6">香港居民通行证</option>
                                        <option value="7">临时身份证</option>
                                        <option value="8">外国人永久居留证</option>
                                    </select>
                                    <input style="margin-left: 10px;" id="cardNum" type="text" value="" readonly onkeyup="isCards(this)" maxlength="19"/>
                                    <select disabled="disabled" style="margin-left: 10px; width: 55px; text-align: center; text-indent: 0;" id="sex">
                                        <option value="0">女</option>
                                        <option value="1">男</option>
                                        <option value="2">未知</option>
                                    </select>
                                    <div class="alertMessage" style="display: none;">
                                        <i class="alertMessage_icon"></i>
                                        <div id="alertContent">用户已经存在！</div>
                                    </div>
                                    <div id="idPlace" class="alertMessage" style="display: flex;"></div>
                                </dd>
                            </dl>
                            <dl style="height: auto; width: 244px;">
                                <dt>证件正面：</dt>
                                <dd style="width: 110px; min-width: 110px; height: auto;" id="frontCard">
                                    <div class="images-box">
                                        <div class="images-btn" data-image-type="customer" data-type="CD1" data-url="/customer/imageUpload" data-del-url="/customer/deleteImage" style="display: inline-block;">选择图片</div>
                                    </div>
                                </dd>
                                <dd class="tisp" style="height:24px; line-height: 24px; margin-left: 99px;"><span id="CD1-count">0</span>/<span id="CD1-limit">1</span></dd>
                            </dl>
                            <dl style="height: auto; width: 244px;">
                                <dt>证件反面：</dt>
                                <dd style="width: 110px; min-width: 110px; height: auto;" id="inverseCard">
                                    <div class="images-box" id="CD2-box">
                                        <div class="images-btn" data-box="CD2upload" data-image-type="customer" data-type="CD2" data-url="/customer/imageUpload" data-del-url="/customer/deleteImage" style="display: inline-block;">选择图片</div>
                                    </div>
                                </dd>
                                <dd class="tisp" style="height:24px; line-height: 24px; margin-left: 99px;"><span id="CD2-count">0</span>/<span id="CD2-limit">1</span></dd>
                            </dl>
                            <dl style="height: auto; overflow: hidden;">
                                <dt><font color="#E74C3C">*</font>客户类型：</dt>
                                <dd style="height: auto; overflow: hidden;">
                                    <div class="customerType">
                                        <label class="common-borderbox" style="margin-bottom: 5px;"><input type="checkbox" disabled="disabled">房东</label>
                                        <label class="common-borderbox" style="margin-bottom: 5px;"><input type="checkbox" disabled="disabled">租客</label>
                                        <label class="common-borderbox" style="margin-bottom: 5px;"><input type="checkbox" disabled="disabled">社区</label>
                                    </div>
                                </dd>
                            </dl>
                        </div>
                        <div class="bank_content">
                            <a class="addButton-icon addButton-icon-add" style="width: 34px; margin-left: 10px; cursor: pointer; display: none;" onclick="addBankCard(this)"></a>
                            <div id="bank_contents">
                                <!-- <div class="bank_div">
                                    <div class="bank_div_title"><i class="fa fa-credit-card-alt" style="margin-right: 10px"></i><span class="bankTitle">银行卡</span><i class="fa fa-angle-double-up" style="float: right; width: 20px; height: 22px; line-height: 22px; margin-top: 7px; margin-left: 25px; cursor:pointer;" onclick="bankUp(this)"></i><label class="common-checkbox common-checkbox-checked" style="float: right;"><input type="radio" name="bank" checked="checked" />使用</label></div>
                                    <div class="bank_div_content" style="display: none;">
                                        <dl style="width: 100%;">
                                            <dt>银行卡号：</dt>
                                            <dd>
                                                <input type="text" style="width: 489px;" value="" class="bankCode"  readonly onblur="bankMessage(this)" onkeyup="bankMessage(this)" />
                                            </dd>
                                        </dl>
                                        <dl style="width: 100%;">
                                            <dt>银行卡信息：</dt>
                                            <dd>
                                                <img alt="" src="" style="height: 50px; width:110px; float: left; margin-top: -13px;">
                                                <input type="text" class="bankMessage" value="" style="width: 240px; float: left;" readonly />
                                            </dd>
                                        </dl>
                                        <dl>
                                            <dt>开户网点：</dt>
                                            <dd>
                                                <input type="text" value="" readonly class="accountOpening" />
                                            </dd>
                                        </dl>
                                        <dl>
                                            <dt>开户名：</dt>
                                            <dd>
                                                <input type="text" value="" readonly class="openAccount" />
                                            </dd>
                                        </dl>
                                        <dl style="height: auto;" class="bankImage">
                                            <dt>银行卡照片：</dt>
                                            <dd style="width: 110px; min-width: 110px; height: auto;">
                                                <div class="images-box" id="BK-box">
                                                    <div class="images-btn" data-box="BKupload" data-type="BK" data-url="" style="display: inline-block;">选择图片</div>
                                                </div>
                                            </dd>
                                            <dd class="tisp" style="height:24px; line-height: 24px;"><span id="BK-count">0</span>/<span id="BK-limit">1</span></dd>
                                        </dl>
                                    </div>
                                </div> -->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content-text-div" style="margin-top: 15px;" id="moreInfo">
                    <div class="content-text-title">更多信息<i class="fa fa-angle-double-down" style="float: right; width: 20px; height: 22px; line-height: 22px; margin-left: 8px; cursor:pointer;" onclick="bankUp(this)"></i></div>
                    <div class="more-content" style="display:none;">
                        <div class="content-text-div-content">
                            <input type="hidden">
                            <dl style="width: 300px;">
                                <dt style="width:80px">民族：</dt>
                                <dd style="width: 40%;">
                                    <select disabled="disabled" name="nation"><!-- 待后续数据字典配置 -->
                                        <option>汉族</option>
                                        <option>土家族</option>
                                        <option>苗族</option>
                                        <option>蒙古族</option>
                                        <option>回族</option>
                                        <option>藏族</option>
                                        <option>满族</option>
                                        <option>其他</option>
                                    </select>
                                </dd>
                            </dl>
                            <dl style="width: 300px;">
                                <dt style="width:80px">籍贯：</dt>
                                <dd style="width: 40%;">
                                    <input type="text" name="native_place" value="" readonly/>
                                </dd>
                            </dl>
                            <dl style="width: 300px;">
                                <dt style="width:80px">生日：</dt>
                                <dd style="width: 40%;">
                                    <input type="date" name="birthday" value="" readonly/>
                                </dd>
                            </dl>
                            <dl style="width: 300px;">
                                <dt style="width:80px">婚姻状况：</dt>
                                <dd style="width: 40%;">
                                    <select disabled="disabled" name="marital_status"><!-- 待后续数据字典配置 -->
                                        <option value="-1">请选择</option>
                                        <option value="1">未婚</option>
                                        <option value="2">已婚</option>
                                        <option value="3">离异</option>
                                        <option value="4">丧偶</option>
                                        <option value="5">单身</option>
                                        <option value="6">恋爱中</option>
                                        <option value="7">其他</option>
                                    </select>
                                </dd>
                            </dl>
                            <dl style="width: 300px;">
                                <dt style="width:80px">年龄：</dt>
                                <dd style="width: 40%;">
                                    <input type="text" name="age" value="" readonly/>
                                </dd>
                            </dl>
                            <dl style="width: 300px;">
                                <dt style="width:80px">身高(cm)：</dt>
                                <dd style="width: 40%;">
                                    <input type="text" name="stature" value="" readonly/>
                                </dd>
                            </dl>
                            <dl style="width: 300px;">
                                <dt style="width:80px">工作年限：</dt>
                                <dd style="width: 40%;">
                                    <select disabled="disabled" name="work_years"><!-- 待后续数据字典配置 -->
                                        <option value="-1">请选择</option>
                                        <option value="1">1-2年</option>
                                        <option value="2">3-5年</option>
                                        <option value="3">5-10年</option>
                                        <option value="4">10年以上</option>
                                    </select>
                                </dd>
                            </dl>
                            <dl style="width: 300px;">
                                <dt style="width:80px">收入状况：</dt>
                                <dd style="width: 40%;">
                                    <select disabled="disabled" name="income_status"><!-- 待后续数据字典配置 -->
                                        <option value="-1">请选择</option>
                                        <option value="1">3000元以下</option>
                                        <option value="2">3000-5000</option>
                                        <option value="3">5000-8000</option>
                                        <option value="4">8000-10000</option>
                                        <option value="5">10000-15000</option>
                                        <option value="6">15000以上</option>
                                    </select>
                                </dd>
                            </dl>
                            <dl style="width: 300px;">
                                <dt style="width:80px">兴趣爱好：</dt>
                                <dd style="width: 40%;">
                                    <input type="text" name="interests" value="" readonly/>
                                </dd>
                            </dl>
                            <dl style="width: 300px;">
                                <dt style="width:80px">学历：</dt>
                                <dd style="width: 40%;">
                                    <select disabled="disabled" name="education"><!-- 待后续数据字典配置 -->
                                        <option value="-1">请选择</option>
                                        <option value="1">小学</option>
                                        <option value="2">初中</option>
                                        <option value="3">高中</option>
                                        <option value="4">专科</option>
                                        <option value="5">本科</option>
                                        <option value="6">硕士及以上</option>
                                    </select>
                                </dd>
                            </dl>
                            <dl style="width: 300px;">
                                <dt style="width:80px">专业：</dt>
                                <dd style="width: 40%;">
                                    <select disabled="disabled" name="major"><!-- 待后续数据字典配置 -->
                                        <option value="-1">请选择</option>
                                        <option value="1">哲学类</option>
                                        <option value="2">经济学类</option>
                                        <option value="3">教育学类</option>
                                        <option value="4">历史学类</option>
                                        <option value="5">法学类</option>
                                        <option value="6">文学类</option>
                                        <option value="7">管理类</option>
                                        <option value="8">心理学类</option>
                                        <option value="9">计算机科学与技术类</option>
                                        <option value="10">信息与电子科学类</option>
                                        <option value="11">力学类</option>
                                        <option value="12">其他</option>
                                    </select>
                                </dd>
                            </dl>
                            <dl style="width: 300px;">
                                <dt style="width:80px">QQ：</dt>
                                <dd style="width: 40%;">
                                    <input type="text" name="QQ" value="" readonly/>
                                </dd>
                            </dl>
                            <dl style="width: 300px;">
                                <dt style="width:80px">微信：</dt>
                                <dd style="width: 40%;">
                                    <input type="text" name="WX" value="" readonly/>
                                </dd>
                            </dl>
                            <dl style="width: 300px;">
                                <dt style="width:80px">邮箱：</dt>
                                <dd style="width: 40%;">
                                    <input type="text" name="email" value="" readonly/>
                                </dd>
                            </dl>
                            <dl style="width: 300px;">
                                <dt style="width:80px">传真：</dt>
                                <dd style="width: 40%;">
                                    <input type="text" name="fax" value="" readonly/>
                                </dd>
                            </dl>
                            <dl style="width: 300px;">
                                <dt style="width:80px">公司名称：</dt>
                                <dd style="width: 40%;">
                                    <input type="text" name="companyName" value="" readonly/>
                                </dd>
                            </dl>
                            <dl style="width: 300px;">
                                <dt style="width:80px">公司地址：</dt>
                                <dd style="width: 40%;">
                                    <input type="text" name="companyAddress" value="" readonly/>
                                </dd>
                            </dl>
                            <dl style="width: 300px;">
                                <dt style="width:80px">公司电话：</dt>
                                <dd style="width: 40%;">
                                    <input type="text" name="companyTel" value="" readonly/>
                                </dd>
                            </dl>
                            <dl style="width: 300px;">
                                <dt style="width:80px">行业：</dt>
                                <dd style="width: 40%;">
                                    <select disabled="disabled" name="business" onchange="selectProfession();">
                                        <option value="-1">请选择</option>
                                        <option value="01">经营管理类</option>
                                        <option value="02">公关/市场营销类</option>
                                        <option value="03">贸易/销售/业务类</option>
                                        <option value="04">财务类</option>
                                        <option value="05">行政/人力资源管理类</option>
                                        <option value="06">文职类</option>
                                        <option value="07">客户服务类</option>
                                        <option value="08">工厂类</option>
                                        <option value="09">计算机/互联网类</option>
                                        <option value="10">电子/通讯类</option>
                                        <option value="11">机械类</option>
                                        <option value="12">规划/建筑/建材类</option>
                                        <option value="13">房地产/物业管理类</option>
                                        <option value="14">金融/经济</option>
                                    </select>
                                </dd>
                            </dl>
                            <dl style="width: 300px;">
                                <dt style="width:80px">行业：</dt>
                                <dd style="width: 40%;">
                                    <select disabled="disabled" name="profession">
                                        <option value="-1">请选择</option>
                                        <option value="0101">总裁/总经理/CEO</option>
                                        <option value="0201">公关经理</option>
                                        <option value="0301">国内贸易</option>
                                        <option value="0401">财务经理/主任</option>
                                        <option value="0501">行政经理/主管</option>
                                        <option value="0601">图书情报/资料/文档管理</option>
                                        <option value="0701">客户服务经理</option>
                                        <option value="0801">厂长/副厂长</option>
                                        <option value="0901">技术主管/项目经理</option>
                                        <option value="1011">电子工程师</option>
                                        <option value="1101">机械工程师/模具设计</option>
                                        <option value="1201">城镇规划设计</option>
                                        <option value="1301">房地产开发/策划</option>
                                        <option value="1401">银行会计</option>
                                    </select>
                                </dd>
                            </dl>
                            <dl>
                                <dt style="width:80px">通讯地址：</dt>
                                <dd>
                                    <input type="text" value="" style="width: 565px;" name="contact_address" readonly/>
                                </dd>
                            </dl>
                            <!-- 						<dl> -->
                            <!-- 							<dt style="width:80px">紧急联系：</dt> -->
                            <!-- 							<dd> -->
                            <!-- 								<select disabled="disabled" id="urgentType"><option>请选择</option><option>父母</option><option>亲人</option><option>朋友</option></select> -->
                            <!-- 								<input type="text" id="urgentPhone" style="margin-left: 10px;" value="" readonly /> -->
                            <!-- 							</dd> -->
                            <!-- 						</dl> -->
                        </div>
                        <div class="bank_content">
                            <a class="addButton-icon addButton-icon-add" style="width: 34px; margin-left: 10px; cursor: pointer; display: none;" onclick="addOtherCard(this)"></a>
                            <div id="otherID_contents">
                                <div class="bank_div">
                                    <div class="bank_div_title" style="border-bottom: 1px solid #031d18;"><i class="fa fa-vcard" style="margin-right: 10px"></i><span class="bankTitle">其他证件信息</span><i class="fa fa-angle-double-up"
                                                                                                                                                                                                        style="float: right; width: 20px; height: 22px; line-height: 22px; margin-top: 7px; margin-left: 25px; cursor:pointer;"
                                                                                                                                                                                                        onclick="bankUp(this)"></i></div>
                                    <div class="bank_div_content" style="border-left: 1px dashed #ccc;border-right:1px dashed #ccc;border-bottom:1px dashed #ccc; height: 310px; display:none;">
                                        <input type="hidden" name="ci_id">
                                        <dl style="width: 50%;">
                                            <dt>证件类型：</dt>
                                            <dd>
                                                <select disabled="disabled" name="id_type" onchange="IDCardChange()">
                                                    <option value="-1">请选择</option>
                                                    <option value="1" selected="selected">身份证</option>
                                                    <option value="2">军官证</option>
                                                    <option value="3">商户号</option>
                                                    <option value="4">护照</option>
                                                    <option value="5">台湾居民通行证</option>
                                                    <option value="6">香港居民通行证</option>
                                                    <option value="7">临时身份证</option>
                                                    <option value="8">外国人永久居留证</option>
                                                </select>
                                            </dd>
                                        </dl>
                                        <dl style="width: 50%;">
                                            <dt>证件号码：</dt>
                                            <dd>
                                                <input type="text" value="" name="id_no" style="width: 160px;" readonly/>
                                            </dd>
                                        </dl>
                                        <dl style="width: 100%;">
                                            <dt>证件有效期：</dt>
                                            <dd>
                                                <input type="date" value="" name="id_pastDate" readonly/>
                                            </dd>
                                        </dl>
                                        <dl style="height: auto;" class="bankImage">
                                            <dt>证件照片：</dt>
                                            <dd style="width: 110px; min-width: 110px; height: auto;">
                                                <div class="images-box" id="ID-box">
                                                    <div class="images-btn" data-box="BKupload" data-type="BK" data-url="" data-del-url="/customer/deleteImage" style="display: inline-block;">选择图片</div>
                                                </div>
                                            </dd>
                                            <!-- 										<dd class="tisp" style="height:24px; line-height: 24px;"><span id="BK-count">0</span>/<span id="BK-limit">1</span></dd> -->
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="content-text-div" style="margin-top: 15px;" id="linkManInfo">
                    <div class="content-text-title">联系人信息<i class="fa fa-angle-double-down" style="float: right; width: 20px; height: 22px; line-height: 22px; margin-left: 8px; cursor:pointer;" onclick="bankUp(this)"></i></div>
                    <div class="more-content" style="display:none;">
                        <div class="bank_content">
                            <a class="addButton-icon addButton-icon-add" style="width: 34px; margin-left: 10px; cursor: pointer; display: none;" onclick="addLinkMan(this)"></a>
                            <div id="linkMan_contents">
                                <div class="bank_div">
                                    <div class="bank_div_title" style="border-bottom: 1px solid #031d18;"><i class="fa fa-user-circle" style="margin-right: 10px"></i><span class="bankTitle">更多联系人信息</span><i class="fa fa-angle-double-up"
                                                                                                                                                                                                               style="float: right; width: 20px; height: 22px; line-height: 22px; margin-top: 7px; margin-left: 25px; cursor:pointer;"
                                                                                                                                                                                                               onclick="bankUp(this)"></i></div>
                                    <div class="bank_div_content" style="border-left: 1px dashed #ccc;border-right:1px dashed #ccc;border-bottom:1px dashed #ccc;height: 360px;">
                                        <input type="hidden" name="cl_id">
                                        <dl style="width:100%;">
                                            <dt>姓名：</dt>
                                            <dd><input type="text" name="linkManName" value="" readonly/></dd>
                                        </dl>
                                        <dl style="width:100%;">
                                            <dt>证件类型：</dt>
                                            <dd>
                                                <select disabled="disabled" name="id_type" onchange="IDCardChange()">
                                                    <option value="-1">请选择</option>
                                                    <option value="1" selected="selected">身份证</option>
                                                    <option value="2">军官证</option>
                                                    <option value="3">商户号</option>
                                                    <option value="4">护照</option>
                                                    <option value="5">台湾居民通行证</option>
                                                    <option value="6">香港居民通行证</option>
                                                    <option value="7">临时身份证</option>
                                                    <option value="8">外国人永久居留证</option>
                                                </select>
                                                <input style="width:160px; margin-left: 10px;" name="id_no" type="text" value="" readonly onkeyup="isCards(this)" maxlength="19"/>
                                                <select disabled="disabled" style="margin-left: 10px; width: 40px; text-align: center; text-indent: 0;" name="sex">
                                                    <option value="0">女</option>
                                                    <option value="1">男</option>
                                                    <option value="2">未知</option>
                                                </select>
                                                <div class="alertMessage" style="display: none;">
                                                    <i class="alertMessage_icon"></i>
                                                    <!-- 											 	<div id="alertContent">用户已经存在！</div> -->
                                                </div>
                                            </dd>
                                        </dl>
                                        <dl style="width: 310px;">
                                            <dt style="width:100px">邮箱：</dt>
                                            <dd style="width: 60%;">
                                                <input type="text" name="email" value="" readonly/>
                                            </dd>
                                        </dl>
                                        <dl style="width: 310px;">
                                            <dt style="width:100px">联系电话：</dt>
                                            <dd style="width: 60%;">
                                                <input type="text" name="phone" value="" readonly/>
                                            </dd>
                                        </dl>
                                        <dl style="width: 310px;">
                                            <dt style="width:100px">联系地址：</dt>
                                            <dd style="width: 60%;">
                                                <input type="text" name="address" value="" readonly/>
                                            </dd>
                                        </dl>
                                        <dl style="width: 310px;">
                                            <dt style="width:100px">QQ：</dt>
                                            <dd style="width: 60%;">
                                                <input type="text" name="qq" value="" readonly/>
                                            </dd>
                                        </dl>
                                        <dl style="width: 310px;">
                                            <dt style="width:100px">工作单位：</dt>
                                            <dd style="width: 60%;">
                                                <input type="text" name="workplace" value="" readonly/>
                                            </dd>
                                        </dl>
                                        <dl style="width: 310px;">
                                            <dt style="width:100px">与客户关系：</dt>
                                            <dd style="width: 60%;">
                                                <select disabled="disabled" name="relation" onchange="IDCardChange()">
                                                    <option value="-1">请选择</option>
                                                    <option value="1">夫妻</option>
                                                    <option value="2">父母</option>
                                                    <option value="3">子女</option>
                                                    <option value="4">兄弟姐妹</option>
                                                    <option value="5">同事</option>
                                                    <option value="6">朋友</option>
                                                    <option value="7">同学</option>
                                                    <option value="8">其他</option>
                                                </select>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <center>
                <button onclick="customerSaveAdd()">提交</button>
            </center>
        </div>
    </div>
</div>

<!-- 客户日志 -->
<div class="contents" id="contents5" style="display:none;">
    <div class="table-item-title" style="margin:1px;">
        <div class="box-nav">
            <a class="nav-tab nav-tab-focus" href="javascript:;" onclick="clickLog(this)">日志记录</a>
            <a class="nav-tab" href="javascript:;" onclick="clickLog(this)">短信记录</a>
        </div>
    </div>
    <div class="table-item-content" style="margin:1px;" id="customerLog1">
        <div class="box-content">
            <div class="sub-content" style="padding: 8px 12px;">
                <div class="record-option-head">
                    <label class="record-option-item" style="">
                        <button onclick="addContractRecord()">添加日志</button>
                    </label>
                    <label class="record-option-item" style="float:right;">
                        <i class="fa-search" style="position: absolute;font-size: 16px;top: 10px;left: 8px;color: #8c8c8c;z-index: 2;"></i>
                        <input type="text" name="record-where" style="width: 200px;text-indent: 20px;" placeholder="记录内容">
                    </label>
                    <label class="record-option-item" style="float:right;"><select name="record-type"></select></label>
                </div>
                <div class="record-option-more">
                    <div class="record-option-more-head">添加日志</div>
                    <div class="record-option-more-main">
                        <select name="record-add-type" style="width: auto;" required>
                            <option value="">记录类型</option>
                        </select>
                        <hr style="height: 10px;">
                        <textarea name="record-add-content" placeholder="日志内容" required></textarea><br/><br/>
                        <div class="option-more-main-table">
                            <div class="option-more-main-item" style="width: 97px;">
                                <label class="table-item-add"><i class="fa-file-text" style="margin-right: 5px;font-size: 14px;"></i>添加附件<input type="file" name="record-file" multiple></label>
                            </div>
                            <div class="option-more-main-item" id="record-attach-box"></div>
                        </div>
                    </div>
                    <div class="record-option-more-foot">
                        <button onclick="submitUserRecord()">确认添加</button>
                        <button onclick="closeAddUserRecord()" style="background: #e74c3c;">取消</button>
                    </div>
                </div>
            </div>
            <div class="sub-content record-table-box">
                <table>
                    <thead>
                    <tr>
                        <th style="width: 40px;text-align: center;">#</th>
                        <th style="width: 60px;text-align: center;">类型</th>
                        <th style="text-align: left;">记录内容</th>
                        <th style="width: 80px;text-align: right;">记录人</th>
                        <th style="width: 153px;text-align: right;">记录时间</th>
                        <th style="width: 75px;text-align: center;">记录来源</th>
                        <!-- 	   					<th style="width: 120px;text-align: center;">操作</th> -->
                    </tr>
                    </thead>
                </table>
            </div>
            <div class="sub-content record-table-box" id="record-table-box">
                <table>
                    <tbody id="record-table-body"></tbody>
                </table>
            </div>
            <div class="sub-content" id="record-table-foot">
                <button class="record-option fa-angle-left" style="line-height: 10px; padding-left: 7px;"></button>
                <input type="text" class="record-option number" id="record-pageNo" value="1">
                <button class="record-option icon-angle-right" style="line-height: 10px; padding-left: 10px;"></button>
                <div class="record-option">共<span id="record-totalPage">0</span>页，<span id="record-totalRecords">0</span>条记录</div>
            </div>
        </div>
    </div>
    <div class="table-item-content" style="margin:1px; display:none;" id="customerLog2">
        <div class="box-content">
            <div class="sub-content" style="padding: 8px 12px;">
                <div class="sub-content record-table-box">
                    <table>
                        <thead>
                        <tr>
                            <th style="width: 40px;text-align: center;">#</th>
                            <th style="width: 180px;text-align: center;">小区房号</th>
                            <th style="width: 100px;text-align: center;">短信类型</th>
                            <th style="text-align: left;">短信内容</th>
                            <th style="width: 80px;text-align: right;">发送结果</th>
                            <th style="width: 75px;text-align: right;">发送人</th>
                            <th style="width: 153px;text-align: center;">发送时间</th>
                            <!-- 	   					<th style="width: 120px;text-align: center;">操作</th> -->
                        </tr>
                        </thead>
                    </table>
                </div>
                <div class="sub-content record-table-box" id="record-table-box">
                    <table>
                        <tbody id="record-table-body2"></tbody>
                    </table>
                </div>
                <div class="sub-content" id="record-table-foot">
                    <button class="record-option fa-angle-left" style="line-height: 10px; padding-left: 7px;"></button>
                    <input type="text" class="record-option number" id="record-pageNo2" value="1">
                    <button class="record-option icon-angle-right" style="line-height: 10px; padding-left: 10px;"></button>
                    <div class="record-option">共<span id="record-totalPage2">0</span>页，<span id="record-totalRecords2">0</span>条记录</div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- 房源录入 -->
<div class="contents" id="contents3" style="display: none;">
    <div class="content-item" id="updateDiv" style="margin-bottom: 40px;">
        <fieldset id="fieldset1s">
            <div style="margin-top: -11px; margin-left: 10px; color: #288eb7;"></div>
            <div style="" class="houseDiv">
                <input type="hidden" name="cc_code">
                <input type="hidden" name="cc_cardType">
                <input type="hidden" name="cc_cardNum">
                <input type="hidden" name="cc_phone">
                <dl style="width:50%; margin-top: 15px;">
                    <dt>
                        <em>*</em>
                        &nbsp;客户姓名：
                    </dt>
                    <dd>
                        <input type="text" value="" id="lianxiren" name="phi_user" placeholder="客户姓名" class="updateInput" disabled="disabled">
                    </dd>
                </dl>
                <dl style="width:50%; margin-top: 15px;">
                    <dt>
                        <em>*</em>
                        &nbsp;客户性别：
                    </dt>
                    <dd style="padding-top:10px;" disabled="disabled">
                        <label class="common-checkbox" style="margin-left: 0px;">
                            <input type="radio" name="phi_user_sex" value="女士" disabled>女士
                        </label>
                        <label class="common-checkbox" style="margin-left: 35px;">
                            <input type="radio" name="phi_user_sex" value="先生" disabled>先生
                        </label>
                    </dd>
                </dl>
                <dl style="width:50%;">
                    <dt>
                        <em>*</em>
                        &nbsp;客户电话：
                    </dt>
                    <dd>
                        <input type="tel" value="" id="useriphone" onchange="chenkphone(useriphone);" name="useriphone"
                               placeholder="客户电话" class="updateInput number" disabled="disabled">
                    </dd>
                </dl>
                <dl style="width:50%;">
                    <dt>
                        <em>*</em>
                        &nbsp;客户意向：
                    </dt>
                    <dd>
                        <label id="userFIntention1"></label>
                    </dd>
                </dl>
                <hr style="margin: 15px 0;height: 1px;border-bottom: 1px dashed #ACCBE0;">
                <dl style="width: 100%;">
                    <dt>
                        <em>*</em>
                        &nbsp;所属物业：
                    </dt>
                    <dd style="width: 80%;">
                        <label class="item" id="propertyInfo_idGroups" style="position: relative;float: left; display: flex;">
                            <input type="text" class="form-control updateInput" id="properid" name="propertyInfo_id" placeholder="所属物业" style="margin-right: 12px;text-align: left;width: 175px;position: relative;float: left;cursor: pointer" readonly required/>
                        </label>
                        <label class="tisp"> </label>
                    </dd>
                </dl>
                <dl style="width:50%;">
                    <dt>
                        <em>*</em>
                        &nbsp;房源房号：
                    </dt>
                    <dd>
                        <input type="text" value="" placeholder="楼层" id="fangyuanlouceng" name="phi_floors"
                               class="updateInput short number edit" value="0"/>
                        <span class="block">-</span>
                        <input type="text" value="" placeholder="房号" id="fangyuanfanghao"
                               name="phi_address" class="updateInput short number edit" value="0"/>
                    </dd>
                </dl>
                <dl style="width:50%;">
                    <dt>
                        <em>*</em>
                        &nbsp;房源户型：
                    </dt>
                    <dd>
                        <input value="" name="hi_houseS" id="fangwushi" placeholder="室"
                               class="updateInput min-short number">
                        <span class="block" style="margin-left: 5px;">室</span>
                        <input value="" name="hi_houseT" id="fangwuting" placeholder="厅"
                               class="updateInput min-short number">
                        <span class="block" style="margin-left: 5px;">厅</span>
                        <input value="" name="hi_houseW" id="fangwuwei" placeholder="卫"
                               class="updateInput min-short number">
                        <span class="block" style="margin-left: 5px;">卫</span>
                    </dd>
                </dl>
                <dl style="width:50%;">
                    <dt>
                        <em>*</em>
                        &nbsp;房东报价：
                    </dt>
                    <dd>
                        <input value="" name="phi_money" id="fangdongbaojia" placeholder="房东报价"
                               class="updateInput number">
                        &nbsp;元
                    </dd>
                </dl>
                <dl style="width:50%;">
                    <dt>
                        <em>*</em>
                        &nbsp;房源来源：
                    </dt>
                    <dd>
                        <%-- <input value="${hi.phi_source }" name="phi_source" id="phi_source"> --%>
                        <select id="fangyuanlaiyuan" name="phi_source" class="selects">
                            <option value="">请选择</option>
                            <option value="线下开发">线下开发</option>
                            <option value="网络来源">网络来源</option>
                            <option value="广告">广告</option>
                            <option value="上门">上门</option>
                            <option value="官网">官网</option>
                            <option value="其他">其他</option>
                        </select>
                    </dd>
                </dl>
                <dl style="width: 100%;">
                    <dt>
                        <em>*</em>
                        &nbsp;房源优势：
                    </dt>
                    <dd style="width: 80%;">
                        <div id="fangyuanyoushigenjin">
                            <label class="type-label" onclick="changeTypes(this)" style="padding: 0px 18px;">
                                家电齐全
                                <i></i>
                                <input type="checkbox" class="type-radio" name="hi_function" value="家电齐全">
                            </label>
                            <label class="type-label" onclick="changeTypes(this)" style="padding: 0px 18px;">
                                拎包入住
                                <i></i>
                                <input type="checkbox" class="type-radio" name="hi_function" value="拎包入住">
                            </label>
                            <label class="type-label" onclick="changeTypes(this)" style="padding: 0px 18px;">
                                全新装修
                                <i></i>
                                <input type="checkbox" class="type-radio" name="hi_function" value="全新装修">
                            </label>
                            <label class="type-label" onclick="changeTypes(this)" style="padding: 0px 18px;">
                                临近轻轨
                                <i></i>
                                <input type="checkbox" class="type-radio" name="hi_function" value="临近轻轨">
                            </label>
                            <label class="type-label" onclick="changeTypes(this)" style="padding: 0px 18px;">
                                欧式风格
                                <i></i>
                                <input type="checkbox" class="type-radio" name="hi_function" value="欧式风格">
                            </label>
                            <label class="type-label" onclick="changeTypes(this)" style="padding: 0px 18px;">
                                通风
                                <i></i>
                                <input type="checkbox" class="type-radio" name="hi_function" value="通风">
                            </label>
                            <label class="type-label" onclick="changeTypes(this)" style="padding: 0px 18px;">
                                采光好
                                <i></i>
                                <input type="checkbox" class="type-radio" name="hi_function" value="采光好">
                            </label>
                            <label class="type-label" onclick="changeTypes(this)" style="padding: 0px 18px;">
                                温馨
                                <i></i>
                                <input type="checkbox" class="type-radio" name="hi_function" value="温馨">
                            </label>
                            <!-- 										<label class="type-label" onclick="addyslabel();" id="addyslab"> -->
                            <!-- 											+ -->
                            <!-- 											<i></i> -->
                            <!-- 										</label> -->
                            <div id="divys" style="display: none;">
                                <input type="text" value="" name="addys" id="addys" style="width: 80px; height: 30px; line-height: 30px; border: 1px solid #cccccc;">
                                <input type="button" value="确  定" onclick="submitys(1)"
                                       style="background-color: #5bc0de; color: #fff; width: 60px; height: 30px; border-radius: 3px;cursor: pointer;">
                            </div>
                        </div>
                    </dd>
                </dl>
                <hr style="border-bottom: 1px dashed rgb(39, 119, 92);">
                <dl style="width:50%;">
                    <dt>
                        <em>*</em>
                        &nbsp;房屋面积：
                    </dt>
                    <dd>
                        <input value="" name="hi_measure" id="fangyuanmianji" placeholder="请输入房源面积"
                               class="updateInput money">
                        &nbsp;m²
                    </dd>
                </dl>
                <dl style="width:50%;">
                    <dt>
                        <em>*</em>
                        &nbsp;装修情况：
                    </dt>
                    <dd>
                        <%-- <input type="hidden" value="${hi.hi_situation }" name="hi_situation" id="hi_situation"> --%>
                        <select id="zhuangxiuqingkuang" class="selects" name="hi_situation">
                            <option value="">请选择</option>
                            <option value="0">清水</option>
                            <option value="1">简装</option>
                            <option value="2">精装</option>
                            <option value="3">豪装</option>
                            <option value="4">中装</option>
                        </select>
                    </dd>
                </dl>
                <dl style="width:50%;">
                    <dt>
                        <em>*</em>
                        &nbsp;装修风格：
                    </dt>
                    <dd>
                        <select id="phi_style" class="selects" name="phi_style">
                            <option value="">请选择</option>
                            <option value="欧式">欧式</option>
                            <option value="中式">中式</option>
                            <option value="简约">简约</option>
                            <option value="其他">其他</option>
                        </select>

                    </dd>
                </dl>
                <dl style="width:50%;">
                    <dt>
                        <em>*</em>
                        &nbsp;房屋类型：
                    </dt>
                    <dd>
                        <%-- <input value="${hi.recommend_name }" name="recommend_name" id="recommend_name" placeholder="请输入房源品牌"> --%>
                        <div id="fangyuanpinpaidiv"></div>
                    </dd>
                </dl>
                <dl style="width:50%;">
                    <dt>
                        <em>*</em>
                        &nbsp;楼盘类型：
                    </dt>
                    <dd style="padding-top:10px;">
                        <label class="common-checkbox" style="margin-left: 0px;">
                            <input type="radio" name="buildTypes" value="公盘">公盘
                        </label>
                        <label class="common-checkbox" style="margin-left: 35px;">
                            <input type="radio" name="buildTypes" value="私盘">私盘
                        </label>
                        <label class="common-checkbox" style="margin-left: 35px;">
                            <input type="radio" name="buildTypes" value="保护">保护
                        </label>
                    </dd>
                </dl>
                <div style="display: none; width: 100%;" id="selectBuildTypePublic">
                    <dl style="width: 100%;">
                        <dt>
                            <em>*</em>
                            &nbsp;保护时间：
                        </dt>
                        <dd style="width: 80%;">
                            <input type="text" id="protect_beginTime" class="updateInput dateTime1" readonly="readonly"
                                   style="width: 100px;"/>
                            -
                            <input type="text" id="protect_endTine" class="updateInput dateTime2" value="" placeholder="保护结束时间"
                                   onfocus="dates()" style="width: 100px;"/>
                        <dd>
                    </dl>
                    <dl style="width: 66%;">
                        <dt>
                            <em>*</em>
                            &nbsp;保护原因：
                        </dt>
                        <dd style="width: 80%;">
                            <textarea rows="5" style="width: 80%;margin-left: 0px;" id="protect_cause" name="protect_cause" onchange="phiEndTimeIsNull()">${hi.protect_cause }</textarea>
                        </dd>
                    </dl>
                    <hr>
                </div>
                <dl style="width: 100%;">
                    <dt>
                        <em>*</em>
                        &nbsp;推荐群体：
                    </dt>
                    <dd id="recommendGroupDiv1" style="width: 80%;"></dd>
                </dl>
                <dl style="width: 100%;">
                    <dt>
                        <em>*</em>
                        &nbsp;房屋配置：
                    </dt>
                    <dd style="width: 80%;">
                        <div id="houseProject">
                            <label class="type-label" onclick="changefangyuanpeizhi(this)" style="padding: 0px 18px;">
                                冰箱
                                <i></i>
                                <input type="checkbox" class="type-radio" name="hi_project" value="冰箱">
                            </label>
                            <label class="type-label" onclick="changefangyuanpeizhi(this)" style="padding: 0px 18px;">
                                电视机
                                <i></i>
                                <input type="checkbox" class="type-radio" name="hi_project" value="电视机">
                            </label>
                            <label class="type-label" onclick="changefangyuanpeizhi(this)" style="padding: 0px 18px;">
                                洗衣机
                                <i></i>
                                <input type="checkbox" class="type-radio" name="hi_project" value="洗衣机">
                            </label>
                            <label class="type-label" onclick="changefangyuanpeizhi(this)" style="padding: 0px 18px;">
                                空调
                                <i></i>
                                <input type="checkbox" class="type-radio" name="hi_project" value="空调">
                            </label>
                            <label class="type-label" onclick="changefangyuanpeizhi(this)" style="padding: 0px 18px;">
                                床
                                <i></i>
                                <input type="checkbox" class="type-radio" name="hi_project" value="床">
                            </label>
                            <label class="type-label" onclick="changefangyuanpeizhi(this)" style="padding: 0px 18px;">
                                沙发
                                <i></i>
                                <input type="checkbox" class="type-radio" name="hi_project" value="沙发">
                            </label>
                            <label class="type-label" onclick="changefangyuanpeizhi(this)" style="padding: 0px 18px;">
                                衣柜
                                <i></i>
                                <input type="checkbox" class="type-radio" name="hi_project" value="衣柜">
                            </label>
                            <label class="type-label" onclick="changefangyuanpeizhi(this)" style="padding: 0px 18px;">
                                茶几
                                <i></i>
                                <input type="checkbox" class="type-radio" name="hi_project" value="茶几">
                            </label>
                            <label class="type-label" onclick="changefangyuanpeizhi(this)" style="padding: 0px 18px;">
                                餐桌
                                <i></i>
                                <input type="checkbox" class="type-radio" name="hi_project" value="餐桌">
                            </label>
                            <label class="type-label" onclick="changefangyuanpeizhi(this)" style="padding: 0px 18px;">
                                椅子
                                <i></i>
                                <input type="checkbox" class="type-radio" name="hi_project" value="椅子">
                            </label>
                            <label class="type-label" onclick="changefangyuanpeizhi(this)" style="padding: 0px 18px;">
                                宽带
                                <i></i>
                                <input type="checkbox" class="type-radio" name="hi_project" value="宽带">
                            </label>
                            <label class="type-label" onclick="changefangyuanpeizhi(this)" style="padding: 0px 18px;">
                                通气
                                <i></i>
                                <input type="checkbox" class="type-radio" name="hi_project" value="通气">
                            </label>
                        </div>
                        <div id="divys1" style="display: none;">
                            <input type="text" value="" name="addpz" id="addpz" style="width: 80px; height: 30px; line-height: 30px; border: 1px solid #bbb;">
                            <input type="button" value="确  定" onclick="submitys(2)"
                                   style="background-color: #5bc0de; color: #fff; width: 60px; height: 30px; border-radius: 3px;">
                        </div>

                    </dd>
                </dl>
                <dl style="width: 100%; min-height: 115px;">
                    <dt>
                        <em>*</em>
                        &nbsp;房源点评：
                    </dt>
                    <dd style="">
                        <div>
                            <textarea id="fangyuandianpings" name="hi_content" placeholder="请对该房点评，不低于20字" rows="5" style="width: 345px; margin-left: 0px;"></textarea>
                            <input type="text" value="" id="fangyuandianpingstext" name="" readonly="readonly" style="width: 100px; border: none;">
                        </div>
                        <div style="margin-top: -25px;"><em style="font-style: normal;">温馨提示：房源点评不能低于20字</em></div>
                    </dd>
                    <!-- 					<dd> -->
                    <!-- 						<div style="float: left; width: 80px; margin-top: 65px;"> -->
                    <!-- 							 -->
                    <!-- 						</div> -->
                    <!-- 					</dd> -->
                </dl>
                <dl style="width:100%; height: auto;overflow: hidden;margin-top: 20px;">
                    <dt>
                        <em>*</em>
                        &nbsp;房屋图片：
                    </dt>
                    <dd style="width: 86%;height: auto;overflow: hidden;">
                        <div id="image-upload-box" class="imageUpload" style="width: 100%;">
                        </div>
                    </dd>
                </dl>
                <hr style="border-bottom: 1px dashed rgb(39, 119, 92);">
                <dl style="width: 63%;">
                    <dt>
                        <em>*</em>
                        &nbsp;成交价格：
                    </dt>
                    <dd style="">
                        <input type="text" value="" placeholder="请输入房屋成交价格" id="dingjia" name="phi_price"
                               class="updateInput number"/>&nbsp;元
                    </dd>
                </dl>
                <hr style="border-bottom: 1px dashed rgb(39, 119, 92);">
                <dl>
                    <dt>存房结果：</dt>
                    <dd>
                        <%-- <input type="hidden" value="${hi.phi_type }" name="phi_type" id="phi_type"> --%>
                        <select id="genjinjieguo" onchange="cunfangjieguo(this.value)" name="phi_type" class="selects">
                            <option value="">--请选择--</option>
                            <option value="完成">存房成功</option>
                            <option value="存房失败">存房失败</option>
                        </select>
                    </dd>
                </dl>
                <div id="dlType" style="display: none;">
                    <dl style="width: 96%;">
                        <dt>操作类型：</dt>
                        <dd style="width: 80%;">
                            <div id="moneyType">
                                <label class="type-label" onclick="chanageradio(1)" for="type1" id="type1" style="padding: 0px 18px;">
                                    定 金
                                    <i></i>
                                    <input type="radio" style="display: none" class="common-radio" name="rb_playType" value="定金" id="radio1">
                                </label>
                                <!-- shenhx 20170512 诚意金与APP保持一致，取消 -->
                                <!-- 											<label class="type-label" onclick="chanageradio(2)" for="type2" id="type2" style="padding: 0px 18px;"> -->
                                <!-- 												诚意金 -->
                                <!-- 												<i></i> -->
                                <!-- 												<input type="radio" style="display: none" class="common-radio" name="radio2" value="诚意金" id="radio2"> -->
                                <!-- 											</label> -->
                                <label class="type-label" onclick="chanageradio(3)" id="type3" style="padding: 0px 18px;">
                                    合 同
                                    <i></i>
                                    <input type="radio" style="display: none" class="common-radio" name="rb_playType" value="合同" id="radio3">
                                </label>
                            </div>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            <em>*</em>
                            &nbsp;免租期：
                        </dt>
                        <dd>
                            <input class="updateInput number" placeholder="免租期" id="phi_rentDay" name="phi_rentDay"
                                   value="">&nbsp; 首年
                        </dd>
                    </dl>
                    <div id="div1" style="display: none;">
                        <div style="clear: both;" id="jinediv">
                            <dl>
                                <dt>支付金额：</dt>
                                <dd>
                                    <input type="text" value="" placeholder="请输入支付金额" id="zhifujine" name="rb_money"
                                           class="updateInput number"/>
                                    元
                                </dd>
                            </dl>
                        </div>
                        <div style="clear: both; margin-top: 20px;" id="fangshidiv">
                            <dl>
                                <dt>支付方式：</dt>
                                <dd>
                                    <%-- <input type="hidden" value="${rb.bs_payType }" name="fangshis" id="fangshis">  --%>
                                    <select id="fukuanfangshi" name="playType" class="selects">
                                        <option value="">--请选择--</option>
                                        <option value="现金">现金</option>
                                        <option value="支付宝">支付宝</option>
                                        <option value="微信">微信</option>
                                        <option value="银行卡">银行卡</option>
                                    </select>
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
                <div class="col-md-12  modelAdd" style="width: 300px; margin: auto; margin-bottom: 40px;">
                    <input class="btn btn-info pull-left" style="margin-top: 40px; width: 100px; margin-bottom: 40px;"
                           onclick="submit1(1)" type="button" value=" 提  交  "/>
                    <input class="btn btn-info pull-left"
                           style="margin-left: 77px; margin-top: 40px; width: 100px; margin-bottom: 40px;" onclick="updateDivCheck()"
                           type="button" value=" 返  回  "/>
                </div>
            </div>
        </fieldset>
    </div>
</div>

<!-- 客户带看 -->
<div class="contents" id="contents4" style="display: none;">
    <div class="content-item" id="updateDiv" style="margin-bottom: 40px;">
        <fieldset id="fieldsetSee">
            <div style="margin-top: -11px; margin-left: 10px; color: #288eb7;"></div>
            <div style="margin: 15px 0px;" class="houseDiv">
                <input type="hidden" id="cc_codeDL2">
                <dl style="width:50%; ">
                    <dt>
                        <em>*</em>
                        &nbsp;客户姓名：
                    </dt>
                    <dd>
                        <input value="" id="lianxiren" name="phi_user" placeholder="客户姓名" class="updateInput" disabled="disabled">
                    </dd>
                </dl>
                <dl style="width:50%; ">
                    <dt>
                        <em>*</em>
                        &nbsp;客户性别：
                    </dt>
                    <dd style="padding-top:10px;">
                        <label class="common-checkbox" style="margin-left: 0px;">
                            <input type="radio" name="phi_user_sex" value="女士" disabled>女士
                        </label>
                        <label class="common-checkbox" style="margin-left: 35px;">
                            <input type="radio" name="phi_user_sex" value="先生" disabled>先生
                        </label>
                    </dd>
                </dl>
                <dl style="width:50%;">
                    <dt>
                        <em>*</em>
                        &nbsp;客户电话：
                    </dt>
                    <dd>
                        <input value="" id="useriphone" onchange="chenkphone(useriphone);" name="useriphone"
                               placeholder="客户电话" class="updateInput number" disabled="disabled">
                    </dd>
                </dl>
                <dl style="width:50%;">
                    <dt>
                        <em>*</em>
                        &nbsp;客户意向：
                    </dt>
                    <dd>
                        <label id="userFIntention"></label>
                    </dd>
                </dl>
                <hr style="margin: 15px 0;height: 1px;border-bottom: 1px dashed #ACCBE0;">
                <dl style="width: 100%;">
                    <dt>
                        <em>*</em>&nbsp;小区房号：
                    </dt>
                    <dd style="width: 80%;">
                        <label class="item" id="propertyInfo_idGroups" style="position: relative;float: left; display: flex;">
                            <input type="text" class="form-control updateInput" id="proper_id" name="houseSorceId" placeholder="小区房号" style="margin-right: 12px;text-align: left;width: 175px;position: relative;float: left; cursor: pointer" readonly required/>
                        </label>
                        <input type="hidden" id="hi_code" value="">
                        <label class="tisp"> </label>
                    </dd>
                </dl>
                <dl style="width: 50%;">
                    <dt>
                        <em>*</em>&nbsp;出房价格：
                    </dt>
                    <dd style="width: 80%;">
                        <input value="" name="hi_price" onclick="" class="form-control updateInput"
                               placeholder="出房价" class="updateInput number" readonly>&nbsp;元/月
                    </dd>
                </dl>
                <dl style="width: 50%;">
                    <dt>
                        <em>*</em>&nbsp;支付方式：
                    </dt>
                    <dd style="width: 80%;">
                        <select id="hs_payType" onchange="housePayType(this)" style="">
                            <option value="月付">月付</option>
                            <option value="季付">季付</option>
                            <option value="半年付">半年付</option>
                            <option value="年付">年付</option>
                        </select>
                        <label class="font-icon"></label>
                    </dd>
                </dl>
                <dl style="width: 100%;     height: 105px;">
                    <dt>
                        <em>*</em>&nbsp;带看描述：
                    </dt>
                    <dd style="width: 80%;">
                        <textarea class="edit" name="hs_content" placeholder="带看描述" rows="5" style="width: 345px; margin-left: 0px;"></textarea>
                    </dd>
                </dl>
                <dl style="width: 50%;">
                    <dt>
                        <em>*</em>&nbsp;带看结果：
                    </dt>
                    <dd style="width: 80%;">
                        <select name="hs_state" id="hs_state" onchange="genSeeing(this)">
                            <option value="1">成功</option>
                            <option value="2">失败</option>
                        </select>
                        <label class="font-icon"></label>
                    </dd>
                </dl>
                <dl style="width: 50%;">
                    <dt>
                        <em>*</em>&nbsp;处理方式：
                    </dt>
                    <dd style="width: 80%;">
                        <select class="edit" name="hs_type" id="hs_type" onchange="payType(this)">
                            <option value="定金">定金</option>
                            <option value="合同">合同</option>
                        </select>
                    </dd>
                </dl>
                <div class="payMoney">

                    <dl style="width: 100%;">
                        <dt>
                            <em>*</em>&nbsp;证件号码：
                        </dt>
                        <dd style="width: 17%;">
                            <input value="" name="numberCard" id="numberCard"
                                   placeholder="证件号码" class="updateInput number" onkeyup="checkCardPlace(this)">
                        </dd>
                        <dd style="width: 10%;"><div id="numberCardPlace"></div></dd>
                    </dl>
                    <dl style="width: 50%;">
                        <dt>
                            <em>*</em>&nbsp;预留天数：
                        </dt>
                        <dd style="width: 80%;">
                            <select class="edit" name="houseDay" onchange="setDMoney(this)">
                                <option value="1">1天</option>
                                <option value="2">2天</option>
                                <option value="3" selected>3天</option>
                                <option value="4">4天</option>
                                <option value="5">5天</option>
                                <option value="6">6天</option>
                                <option value="7">7天</option>
                            </select>
                        </dd>
                    </dl>
                    <dl style="width: 50%;">
                        <dt>
                            <em>*</em>&nbsp;客户定金：
                        </dt>
                        <dd style="width: 80%;">
                            <input value="" id="dMoney" name="money" type="number"
                                   placeholder="客户定金" class="updateInput number">&nbsp;元
                        </dd>
                    </dl>
                    <dl style="width: 50%;">
                        <dt>
                            <em>*</em>&nbsp;约定租期：
                        </dt>
                        <dd style="width: 80%;">
                            <input value="" name="contractDay" type="number" id="contractDay"
                                   placeholder="约定租期" class="updateInput number" onkeyup="contractDay(this)">&nbsp;月
                        </dd>
                    </dl>
                    <dl style="width: 50%;">
                        <dt>
                            <em>*</em>&nbsp;支付方式：
                        </dt>
                        <dd style="width: 80%;">
                            <select class="edit" name="payType" id="payType">
                                <option value="">--请选择--</option>
                                <option value="支付宝">支付宝</option>
                                <option value="微信">微信</option>
                            </select>
                        </dd>
                    </dl>
                </div>
            </div>
            <div class="col-md-12  modelAdd" style="width: 300px; margin: auto; margin-bottom: 40px;">
                <input class="btn btn-info pull-left" style="margin-top: 40px; width: 100px; margin-bottom: 40px;"
                       onclick="submitHouseSeeing()" type="button" value=" 提  交  "/>
                <!-- 					<input class="btn btn-info pull-left" -->
                <!-- 						style="margin-left: 77px; margin-top: 40px; width: 100px; margin-bottom: 40px;" onclick="updateDivCheck()" -->
                <!-- 						type="button" value=" 返  回  " /> -->
            </div>
            <hr style="margin: 15px 0;height: 1px;border-bottom: 1px dashed #ACCBE0;">
            <div class="sub-title" id="other-title">
                <ul class="title-nav">
                    <li class="visited" data-hash="#seeRecord">带看记录</li>
                </ul>

                <div class="sub-content record-table-box">
                    <table>
                        <thead>
                        <tr>
                            <th style="width: 40px;text-align: center;">#</th>
                            <th style="width: 250px;text-align: center;">小区房号</th>
                            <th style="width:auto;text-align: left;">带看描述</th>
                            <th style="width: 75px;text-align: center;">带看结果</th>
                            <th style="width: 80px;text-align: center;">记录人</th>
                            <th style="width: 153px;text-align: center;">记录时间</th>
                        </tr>
                        </thead>
                    </table>
                </div>
                <div class="sub-content record-table-box" id="record-table-box_see">
                    <table>
                        <tbody id="record-table-body_see"></tbody>
                    </table>
                </div>
                <div class="sub-content" id="record-table-foot">
                    <button class="record-option fa-angle-left" style="line-height: 10px; padding-left: 7px;"></button>
                    <input type="text" class="record-option number" id="record-pageNo_see" value="1">
                    <button class="record-option icon-angle-right" style="line-height: 10px; padding-left: 10px;"></button>
                    <div class="record-option">共<span id="record-totalPage_see">0</span>页，<span id="record-totalRecords_see">0</span>条记录</div>
                </div>
            </div>
            <!-- 定金支付二维码展示 -->
            <div class="cd-popup3" style="display:none;">
                <div class="cd-popup-container3" id="cd-popup-container3">
                    <div class="content2">
                        <div class="title">管家婆房地产经纪有限公司</div>
                        <div class="code-div">
                            <div class="code-title"></div>
                            <div class="code-money"></div>
                            <div id="qrcode"></div>
                            <div class="code-bottom">
                                <div class="bottom-yuan"></div>
                                <div class="bottom-font">扫一扫，向商家付款</div>
                            </div>
                        </div>
                    </div>
                    <a href="#0" class="cd-popup-close" style="color: red;">X</a>
                </div>
            </div>

            <!-- 客户评价 -->
            <div class="contents" id="contents6" style="display: none;">
                <div class="content-item" id="customerEvaluate" style="margin-bottom: 40px;">
                    <fieldset id="fieldsetEvaluate">
                        <div class="content3">
                            <div><label style="font-size: 14px; font-weight: bold; margin-left: 25px;">请输入对该客户的评价</label></div>
                            <hr>
                            <div id="startone" class="block clearfix">
                                <div class="star_score"></div>
                                <p style="float:left;">您的评分：<span class="fenshu"></span> 分</p>
                            </div>
                            <script type="text/javascript" src="/resources/js/star/startScore.js"></script>
                            <script>
                                scoreFun($("#startone"));
                            </script>
                            <script>
                                //显示分数
                                $(".show_number li p").each(function (index, element) {
                                    var num = $(this).attr("tip");
                                    var www = num * 2 * 16;//
                                    $(this).css("width", www);
                                    $(this).parent(".atar_Show").siblings("span").text(num + "分");
                                });
                            </script>
                        </div>
                        <div style="margin-left: 25px;font-weight: bold;">详细评论:</div>
                        <hr>
                        <textarea name="customer_comment" placeholder="详细评论" rows="5" style="width: 345px; margin-left: 25px;"></textarea>
                        <div class="col-md-12  modelAdd" style="width: 300px; margin-bottom: 40px;">
                            <input class="btn btn-info pull-left" style="margin-top: 40px; width: 100px; margin-bottom: 40px;margin-left: 150px;"
                                   onclick="submitEvaluate()" type="button" value=" 提  交  "/>
                        </div>
                    </fieldset>
                </div>
            </div>
        </fieldset>
    </div>
</div>
</body>
</html>