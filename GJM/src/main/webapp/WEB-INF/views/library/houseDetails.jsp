<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%
    response.setHeader("Pragma", "No-cache");
    response.setHeader("Cache-Control", "no-cache");
    response.setDateHeader("Expires", -10);
%>
<!DOCTYPE html>
<html>
<head>
    <link href="/resources/css/library/houseDetails.css" rel="stylesheet" type="text/css"/>
    <link href="/resources/Plug-in/sliderPro/css/slider-pro.min.css" rel="stylesheet" type="text/css"/>

    <script src="/resources/js/jquery-2.0.0.min.js"></script>
    <script src="http://api.map.baidu.com/api?v=2.0&ak=9HqNP0u7U4ZU5ZTKHT8BCbUa"></script><!-- 百度地图 -->
    <script type="text/javascript" src="/resources/Plug-in/sliderPro/js/jquery.sliderPro.min.js"></script>
    <script type="text/javascript" src="/resources/js/library/houseDetails.js"></script>
</head>
<body>
<div class="center">
    <%--<div class="head_top"><a href="/">首页</a>><a href="/tenementonline">在线租房</a>><span class="head_top_name"></span></div>--%>
    <div class="house_center">
        <div class="house_center_left">
            <div id="houseImage" class="slider-pro">
                <div class="sp-slides">
                    <!-- 轮播大图 -->
                    <%--<c:if test="${not empty houseImageVo}">
                        <c:forEach items="${houseImageVo}" var="list">
                            <div class="sp-slide">
                               <img class="sp-image" src="/resources/Plug-in/sliderPro/css/images/blank.gif" data-src="${list.hm_path}">
                            </div>
                        </c:forEach>
                    </c:if>--%>
                </div>
                <div class="sp-thumbnails">
                    <!-- 轮播小图 -->
                    <%--<c:if test="${not empty houseImageVo}">
                        <c:forEach items="${houseImageVo}" var="list">
                            <img class="sp-thumbnail" src="${list.hm_path}"/>
                        </c:forEach>
                    </c:if>--%>
                </div>
            </div>
            <div class="house_center_content">
                <div class="house_center_content head">
                    <div class="line-shape"></div>
                    <span>房源信息</span>
                    <div class="line"></div>
                </div>
                <div class="house_center_content_text">
                    <ul>
                        <li><span class="title">编号：</span><span class="content" id="hi_code">${houseInfo.hi_code}</span></li>
                        <li><span class="title">点评：</span><span class="content" id="hi_content">${houseInfo.hi_content}</span></li>
                    </ul>
                </div>
            </div>
            <div class="house_center_content">
                <div class="house_center_content head">
                    <div class="line-shape"></div>
                    <span>房屋配置</span>
                    <div class="line"></div>
                </div>
                <div class="house_center_content_text">
                    <div class="project">
                        <span class="image"><img id="badroom" src="/resources/image/houseDetails/ic_badroom.svg"></span>
                        <span class="font">床</span>
                    </div>
                    <div class="project">
                        <span class="image"><img id="cabinet" src="/resources/image/houseDetails/ic_cabinet.svg"></span>
                        <span class="font">衣柜</span>
                    </div>
                    <div class="project">
                        <span class="image"><img id="television" src="/resources/image/houseDetails/ic_television.svg"></span>
                        <span class="font">电视</span>
                    </div>
                    <div class="project">
                        <span class="image"><img id="air" src="/resources/image/houseDetails/ic_air.svg"></span>
                        <span class="font">空调</span>
                    </div>
                    <div class="project">
                        <span class="image"><img id="bathe" src="/resources/image/houseDetails/ic_bathe.svg"></span>
                        <span class="font">热水器</span>
                    </div>
                    <div class="project">
                        <span class="image"><img id="wifi" src="/resources/image/houseDetails/ic_bathe.svg"></span>
                        <span class="font">宽带</span>
                    </div>
                    <div class="project">
                        <span class="image"><img id="washer" src="/resources/image/houseDetails/ic_washer.svg"></span>
                        <span class="font">洗衣机</span>
                    </div>
                    <div class="project">
                        <span class="image"><img id="interLock" src="/resources/image/houseDetails/ic_interLock.svg"></span>
                        <span class="font" style="color: #999999">智能锁</span>
                    </div>
                </div>
            </div>
            <div class="house_center_content">
                <div class="house_center_content head">
                    <div class="line-shape"></div>
                    <span>室友信息</span>
                    <div class="line"></div>
                </div>
                <div class="house_center_content_text" style="padding: 20px 0 10px 10px;">
                    <div class="house_people">
                        <div class="house_people_top">
                            <span class="person_image"><img src="/resources/image/houseDetails/ic_man.png"/></span>
                            <div class="person_title">
                                <span>Room.A</span>
                                <span class="state">已入住</span>
                            </div>
                        </div>
                        <div class="house_people_center">
                            <div class="house_people_left">
                                <span>20m²</span>
                                <span style="font-size: 13px; color: #999999;">面积</span>
                            </div>
                            <div class="house_people_right">
                                <span>白领</span>
                                <span style="font-size: 13px; color: #999999;">职业</span>
                            </div>
                        </div>
                        <div class="house_people_bottom">
                            <span style="font-size: 16px;">2017/10-2018/10</span>
                            <span style="color: #999999">入住时间</span>
                        </div>
                    </div>
                    <div class="house_people">
                        <div class="house_people_top">
                            <span class="person_image null"><img
                                    src="/resources/image/houseDetails/ic_nullpeople.svg"/></span>
                            <div class="person_title">
                                <span>Room.B</span>
                                <span class="state null">未入住</span>
                            </div>
                        </div>
                        <div class="house_people_center">
                            <div class="house_people_left">
                                <span>20m²</span>
                                <span style="font-size: 13px; color: #999999;">面积</span>
                            </div>
                            <div class="house_people_right">
                                <span>....</span>
                                <span style="font-size: 13px; color: #999999;">职业</span>
                            </div>
                        </div>
                        <div class="house_people_bottom">
                            <span style="font-size: 16px;">....</span>
                            <span style="color: #999999">入住时间</span>
                        </div>
                    </div>
                    <div class="house_people">
                        <div class="house_people_top">
                            <span class="person_image"><img src="/resources/image/houseDetails/ic_woman.png"/></span>
                            <div class="person_title">
                                <span>Room.C</span>
                                <span class="state">已入住</span>
                            </div>
                        </div>
                        <div class="house_people_center">
                            <div class="house_people_left">
                                <span>20m²</span>
                                <span style="font-size: 13px; color: #999999;">面积</span>
                            </div>
                            <div class="house_people_right">
                                <span>白领</span>
                                <span style="font-size: 13px; color: #999999;">职业</span>
                            </div>
                        </div>
                        <div class="house_people_bottom">
                            <span style="font-size: 16px;">2017/10-2018/10</span>
                            <span style="color: #999999">入住时间</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="house_center_right">
            <div class="house_title">
                <span class="title" id="hi_name">${houseInfo.hi_name}</span>
            </div>
            <div class="house_title_two">
                <div class="house_title_two_1" id="hi_text"></div>
                <div class="house_money"><span id="hi_money">￥</span><span>元/月（月付）</span></div>
            </div>
            <div class="house_title_label">

            </div>
            <div class="house_parameter">
                <ul>
                    <li><i class="circular"></i><span>面积：</span><label id="hi_measure">${houseInfo.hi_measure}</label>m²</li>
                    <li><i class="circular"></i><span>楼层：</span><label id="hi_floor">${houseInfo.hi_floor}</label>/<label>${houseInfo.hi_totalFloor}</label>层</li>
                    <li><i class="circular"></i><span>朝向：</span><label id="hi_orientation">${houseInfo.hi_orientation}</label></li>
                    <li><i class="circular"></i><span>方式：</span>
                        <c:choose>
                            <c:when test="${houseInfo.hb_id eq 1}">
                                <label id="his_name">整租</label>
                            </c:when>
                            <c:when test="${houseInfo.hb_id eq 2}">
                                <label id="his_name">合租</label>
                            </c:when>
                        </c:choose>
                    </li>
                    <li><i class="circular"></i><span>户型：</span><label id="houseTSW">${houseInfo.hi_houseS}</label>室<label>${houseInfo.hi_houseT}</label>厅<label>${houseInfo.hi_houseW}</label>卫</li>
                    <li><i class="circular"></i><span>装修：</span><label id="hi_state">${houseInfo.hi_state}</label></li>
                </ul>
            </div>
            <div class="house_person">
                <div class="poto"><img id="poto_image" src="/resources/image/houseDetails/ic_guanjia.png"/></div>
                <div class="person_message">
                    <ul>
                        <li><span>房管员：</span><span id="person">${employee.em_name}</span></li>
                        <li><span>投诉管家</span><span><img src="/resources/image/houseDetails/readBook.svg"></span></li>
                    </ul>
                    <ul>
                        <li style="width: 100%;"><span>联系电话：</span><span style="color: #FF6666;" id="phone">${employee.em_phone}</span></li>
                    </ul>
                    <ul>
                        <li style="width: 100%; font-size: 15px;">真实房源 · 预约回电 · 保证接听 · 闪电维修 · 管家服务 · 保险服务</li>
                    </ul>
                </div>
            </div>
            <div class="house_submit">
                <a id="earnesta" style="background: #F99A66;" href="javascript:volid(0);"><i><img src="/resources/image/houseDetails/ic_signboard.svg"/></i><span>缴纳定金</span></a>
                <a style="background: #FF6666; margin-right: 0; float: right" href="javascript:volid(0);"><i><img src="/resources/image/houseDetails/ic_browse.svg"/></i><span>预约看房</span></a>
            </div>
            <div class="house_appointment">
                <div class="title"><i><img src="/resources/image/houseDetails/ic_phone.svg"></i><span>023-88067511</span>
                </div>
                <div class="content">
                    <div class="house_seeing">
                        <div class="title"><i></i><span>预约看房</span></div>
                        <div class="content_center">
                            <ul>
                                <li><span>您的名字：</span><input type="text" id="name" disabled="disabled"/></li>
                                <li><span>联系方式：</span><input type="text" disabled="disabled" maxlength="11" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" id="namePhone"/></li>
                            </ul>
                            <ul>
                                <li><span>看房时间：</span><input type="text" disabled="disabled" id="house_date" readonly="readonly"/></li>
                            </ul>
                            <ul>
                                <li style="width: 100%;"><span>备注：</span><textarea id="remark" disabled="disabled"></textarea></li>
                            </ul>
                            <ul>
                                <li style="width: 100%; margin-top: 20px;">
                                    <div class="submit">提交</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="title" style="margin-top: 20px;"><i></i><span>我们的优势</span></div>
                    <div class="content_advantage">
                        <ul>
                            <li><span><img src="/resources/image/houseDetails/ic_money.png"/></span><span>零中介费</span></li>
                            <li><span><img src="/resources/image/houseDetails/ic_payMonth.png"/></span><span>租金月付</span>
                            </li>
                            <li><span><img src="/resources/image/houseDetails/ic_house.png"/></span><span>真实房源</span></li>
                            <li><span><img src="/resources/image/houseDetails/ic_insurance.png"/></span><span>家财保险</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="periphery">
        <div class="title"><i class="line-shape"></i><span>周边配置</span>
            <div class="line"></div>
        </div>
        <div class="periphery_content">
            <div class="map_left">
                <div class="map_left_title">
                    <div class="map_title_left click">搜周边</div>
                    <div class="map_title_right">查线路</div>
                </div>
                <div class="map_center_1">
                    <ul>
                        <li><img src="/resources/image/houseDetails/bus.gif"/>公交</li>
                        <li><img src="/resources/image/houseDetails/subway.gif"/>地铁</li>
                        <li><img src="/resources/image/houseDetails/school.gif"/>学校</li>
                        <li><img src="/resources/image/houseDetails/market.gif"/>超市</li>
                        <li><img src="/resources/image/houseDetails/hosp.gif"/>医院</li>
                        <li><img src="/resources/image/houseDetails/food.gif"/>餐饮</li>
                        <li><img src="/resources/image/houseDetails/bank.gif"/>银行</li>
                        <li><img src="/resources/image/houseDetails/play.gif"/>娱乐</li>
                    </ul>
                </div>
                <div class="map_center_2" style="display: none;">
                    <div class="map_center_title">
                        <ul>
                            <li class="click">公交</li>
                            <li>驾车</li>
                            <li>步行</li>
                        </ul>
                    </div>
                    <div class="map_center_content">
                        <div class="map_search">
                            <ul>
                                <li>起点：<input id="sstartname" type="text"/></li>
                                <li>终点：<input id="sendname" type="text"/></li>
                            </ul>
                        </div>
                        <div class="map_submit">搜索</div>
                    </div>
                    <div class="trafficLine" id="drive_wrap"></div>
                </div>
            </div>
            <div class="maps" id="allmap">
            </div>
        </div>
    </div>
</div>
<input type="hidden" id="propertyInfo_coordinate" value="${houseInfo.propertyInfo_coordinate}">
<input type="hidden" id="money" value="${houseInfo.hi_money}">
<input type="hidden" id="conim_type" value="${houseInfo.propertyInfo_coordinate}">
<input type="hidden" id="hi_function" value="${houseInfo.hi_function}">
<c:if test="${not empty houseImageVo}">
    <div class="imageB" style="display: none">
        <c:forEach items="${houseImageVo}" var="list">
            <img class="sp-image" chose="${list.hm_chose}" src="/resources/Plug-in/sliderPro/css/images/blank.gif" data-src="${list.hm_path}">
        </c:forEach>
    </div>
</c:if>
<c:if test="${not empty facilitys}">
    <c:forEach items="${facilitys}" var="list">
        <input type="hidden" name="conim_type" value="${list.conim_type}">
    </c:forEach>
</c:if>
</body>
</html>


