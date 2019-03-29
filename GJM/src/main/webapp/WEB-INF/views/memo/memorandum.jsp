<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link href="/resources/css/memo/memo.css" rel="stylesheet" type="text/css">
<link href="/resources/css/memo/memoTimeLine.css" rel="stylesheet" type="text/css">
<link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href="/resources/common/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"><!-- 旧图标样式 -->
<link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">

<!-- <script type="text/javascript" src="/resources/js/jquery-1.7.2.min.js"></script> -->
<script src="/resources/js/common/common.js"></script><!-- 公共插件 -->
<script src="/resources/common/My97DatePicker/WdatePicker.js"></script><!-- 时间插件 -->
<script type="text/javascript" src="/resources/js/memo/memorandum.js"></script>
<script type="text/javascript" src="/resources/js/memo/memoTimeLine.js"></script>
<script src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
<div class="center-div" style=" height: 883px; padding: 1% 1% 1% 1%; position: relative;">
	<div class="dateCenter">
	<div class="dateTitle">
		<div class="leftDiv"><a class="aButton" href="javascript:toDay();">今天</a></div>
		<div class="centerDiv"><i class="leftButton" onclick="dateLeft('left')"><i class="fa fa-angle-left"></i></i><div class="yearMonth"><input type="text" value="2016年09月" readonly="readonly" /></div><i class="rightButton" onclick="dateLeft('right')"><i class="fa fa-angle-right"></i></i></div>
		<div class="rightDiv"><a class="aButton click" style="border-radius:3px 0 0 3px;right: 50px;" href="javascript:;">月</a><a class="aButton" style="border-radius:0 3px 3px 0;" href="javascript:;">日</a></div>
	</div>
	<table id="monthMemo">
		<thead>
			<tr>
				<td>周日</td>
				<td>周一</td>
				<td>周二</td>
				<td>周三</td>
				<td>周四</td>
				<td>周五</td>
				<td>周六</td>
			</tr>
		</thead>
		<tbody>
			<!-- <tr>
				<td>
					<div class="add-event-div">
						<div class="divContent">
							<div class="tdTitle"><em>28</em><span class="oldCalendar">初一</span><span class="vacation rest">放假</span></div>
							<div class="tdContent">
								<div class="tdContent-data">
									<ul>
										<li>
											<div class="momen_dis"><a href="javascript:;" onclick="fontClick(this)">我有一件重要的事情<span class="dataTime">15:00</span></a>
												<div class="new-event-div" style="display: none;">
													<span class="arrow"><span class="inner-arrow"></span></span>
													<div class="new-event-content">
														<div class="new-event-content-title"><h3>我有一件重要的事情</h3></div>
														<div class="new-event-content-model">
															<dl style="height: 25px; line-height: 25px;">
																<dt style="width: 25px;">起：</dt>
																<dd>2016年08月29日 星期一 15:00</dd>
															</dl>
															<dl style="height: 25px; line-height: 25px;">
																<dt style="width: 25px;">止：</dt>
																<dd>2016年08月29日 星期一 16:00</dd>
															</dl>
														</div>
														<div class="new-event-footer">
															<a href="javascript:;">查看详情</a>
															<a href="javascript:;">编辑</a>
															<a href="javascript:;">删除</a>
														</div>
													</div>
												</div>
											</div>
										</li>
									</ul>
								</div>
								<div class="insertDiv">
									<ul>
										<li>
											<div class="add-event">
												<i class="fa fa-plus-square-o"></i>
												<span class="add-text" onclick="addNew(this)">新建事件</span>
												<div class="new-event-div" style="display: none;">
													<span class="arrow"><span class="inner-arrow"></span></span>
													<div class="new-event-content">
														<div class="new-event-content-title"><h3>新建事件</h3><span class="close" onclick="closeEvent(this)">×</span></div>
														<div class="new-event-content-model">
															<dl>
																<dt>事件：</dt>
																<dd><input type="text" placeholder="创建一个事件内容" /></dd>
															</dl>
															<dl>
																<dt>类型：</dt>
																<dd>
																	<div class="checkbox checkbox-success"><input name="chickes" type="checkbox" id="828" data-value="" checked="checked"><label for="chickes" id="ckLabel"><i class="fa fa-check"></i></label></div>
																</dd>
															</dl>
															<dl>
																<dt>开始：</dt>
																<dd><input type="text" value="2016-8-1 星期一" readonly="readonly" /></dd>
															</dl>
															<dl>
																<dt>结束：</dt>
																<dd><input type="text" value="2016-8-1 星期一" readonly="readonly" /></dd>
															</dl>
														</div>
														<div class="new-event-footer">
															<div class="more-font">更多选项</div>
															<div class="btn-cencel">取消</div>
															<div class="btn-confirm">提交</div>
														</div>
													</div>
												</div>
											</div>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div class="">
							
						</div>
					</div>
				</td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
			</tr> -->
		</tbody>
	</table>
	<div class="timeCenter">
		<div id="timeLine" class="timeLine" style="border-bottom: 0; ">
				<ul>
					<li id="header">
						<div class="flag">
							<i class="circle" style=""></i>
						</div>
						<div class="header-left shadow">
							<p class="title">每日事件时光轴</p>
							<div class="date">2016年09月26日 星期一 10:00</div>
						</div>
						<div class="header-right shadow">
							<p class="title">添加新的日程与事件</p>
							<div class="content">
								<textarea class="newThings" style="overflow: hidden; resize: none;">请输入...</textarea>
							</div>
							<div class="text">
								<p><span>紧急：</span>
								<label class="aCheckbox">
									<input type="radio" checked="checked" class="input_check" name="emergent"/>
									<span></span>
									<i>紧急</i>
								</label>
								<label class="aCheckbox">
									<input type="radio" class="input_check" name="emergent"/>
									<span></span>
									<i>不紧急</i>
								</label>
								</p>
								<p><span>重要：</span>
								<label class="aCheckbox">
									<input type="radio" checked="checked" class="input_check" name="import"/>
									<span></span>
									<i>重要</i>
								</label>
								<label class="aCheckbox">
									<input type="radio" class="input_check" name="import"/>
									<span></span>
									<i>不重要</i>
								</label>
								</p>
								<p><span>开始时间：</span><span><input type="text" class="startTime" readonly="readonly" value="2016年10月5日  星期三  10:58"/></span></p>
								<p><span>结束结束：</span><span><input type="text" class="endTime" readonly="readonly" value="2016年10月5日  星期三  10:58"/></span></p>
								<p><span>安排人：</span><span class="bBotton addBotton">添加</span><span class="bBotton delBotton">删除</span><span class="bBotton peoNum">共3人</span></p>
								<div class="makeDiv">
									<div class="addPeople">
										<p class="search">查找：<input type="text" class="searchInput" placeholder="请输入关键字搜索"/><span class="close">x</span></p>
										<hr/>
										<p>
										<label class="aCheckbox">
											<input type="checkbox" class="input_check" name="checkPeo"/>
											<span></span>
											<i>张三三 （销售部）</i>
										</label>
										</p>
										<p>
										<label class="aCheckbox">
											<input type="checkbox" class="input_check" name="checkPeo"/>
											<span></span>
											<i>张三三 （销售部）</i>
										</label>
										</p>
										<p>
										<label class="aCheckbox">
											<input type="checkbox" class="input_check" name="checkPeo"/>
											<span></span>
											<i>张三三 （销售部）</i>
										</label>
										</p>
										<p>
										<label class="aCheckbox">
											<input type="checkbox" class="input_check" name="checkPeo"/>
											<span></span>
											<i>张三三 （销售部）</i>
										</label>
										</p>
									</div>
									<div class="delPeople">
										<p class="search">查找：<input type="text" class="searchInput" placeholder="请输入关键字搜索"/><span class="close">x</span></p>
										<hr/>
										<p><span>张三三（销售部）</span><span class="delete">x</span></p>
										<p><span>张三三（销售部）</span><span class="delete">x</span></p>
										<p><span>张三三（销售部）</span><span class="delete">x</span></p>
										<p><span>张三三（销售部）</span><span class="delete">x</span></p>
										<p><span>张三三（销售部）</span><span class="delete">x</span></p>
									</div>
								</div>
							</div>
							<div class="handle">
								<span>确认发布</span> <span class="cancel" style="display: none;">取消发布</span>
							</div>
						</div>
					</li>
				</ul>
			</div>
			<div class="timeLine" id="contentTxt" style="border-top: 0; min-height: 648px;">
				<ul>
					<!-- 内容 -->
				</ul>
			</div>
		</div>
	</div>
</div>
