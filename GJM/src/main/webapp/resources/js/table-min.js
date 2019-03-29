/**
 * 表格显示数据插件
 * 
 * @author 陈智颖
 * 
 * @version 创建时间：2016年10月30日 11:34:00
 * */


// 对象
var obj;
var userselect = null;
var bools = true;

// 判断层是否隐藏
var bool = true;

$(function(){
});

;(function($, document) {                                                                                                                                                                                  
	$.fn.table =function(parameter){
		return this.each(function(){
			var defaults = {
					titleBg : "",							// 表格标题背景颜色
					titleColor : "",						// 表格标题字体颜色
					dataTime : "",							// 时间筛选条件
					title : "",								// 表格标题内容 format时间格式化
					dataBool : true,						// false只加载数据
					search_bars : [],						// 搜索栏自定义添加元素
					url : "",								// 链接
					data : {},								// 参数
					pageNo : "",							// 分页条数
					search : true,							// 是否启动搜索栏目
					selectBool : "",						// 下拉显示详情是否开启
					selectClick : "",						// 下拉显示详情点击事件
					houseAdd : 0,						    // 总房源+的数量
					trClick : false,						// 是否开启多选
					success : function(){},					// cookie分页数量
				};
			var opts = $.extend(defaults, parameter);
			var _this = this;
			
			/** 初始化*/
			_this.init =function(){
				if(opts.dataBool){
					$(_this).html("");
					if(opts.search){
						_this.createSearch();
					}
					_this.createTable();
				}else{
					$(_this).find("#Num").text("1");
					_this.initData();
				}
			};
			
			/** 生成搜索栏目*/
			_this.createSearch = function(){
				var _search_bar = '';
				if(opts.search_bars.length > 0){
					$.each(opts.search_bars, function(index, data){
						switch (data.type) {
							case "select":
								_search_bar += '<li><select class="form-control where_screen" name="'+ data.name +'">';
								$.each(data.data, function(key, value){
									_search_bar += '<option value="'+ key +'" '+ (data.selected == key?"selected":"") +'>'+ value +'</option>';
								});
								_search_bar += '</select></li>';
								break;
							default :
								break;
						}
					});
				}
				var html ='<div class="search-div">'+
							'<div class="tools">'+
								'<ul class="searchBar">'+
									'<li>'+
										'<select class="form-control" id="dateSelect" style="height: 40px;">'+
						        			
						        		'</select>'+
						        	'</li>'+
									'<li class="timeClick mouseDown" name="time">全部</li>'+
									'<li class="timeClick" name="time">今天</li>'+
									'<li class="timeClick" name="time">最近一周</li>'+
									'<li class="timeClick" name="time">最近一月</li>'+
									'<li class="timeClick" name="times" style="margin-right: 0;">自定义日期</li>'+
									'<li class="inputTime">'+
										'<div class="dateTimeTitle">'+
											'<i class="fa fa-calendar"></i>'+
											'<div class="dateTimeContent">'+
												'<input type="text" class="dateTime1" />'+
												'<i class="dateTimeC"></i>'+
												'<input type="text" class="dateTime2" />'+
											'</div>'+
										'</div>'+
									'</li>'+
									'<li class="jselect jselectDown" onclick="accurateSelect()">精确查询<i style="display: block"></i></li>'+ _search_bar +
								'</ul>'+
								'<ul class="toolbar">'+
									'<li class="click">'+
										'<i class="table-icon table-icon-release"></i>'+
										'<a href="javascript:fb();">发布</a>'+
									'</li>'+
									'<li class="click">'+
										'<i class="table-icon table-icon-retweet"></i>'+
										'<a href="javascript:houseGs();">房屋归属</a>'+
									'</li>'+
								'</ul>'+
							'</div>'+
							'<div class="selectDiv" style="display: block;">'+
								'<div class="button">'+
									'<ul>'+
										'<li class="buttonTitle" id="addWhere">增加条件</li>'+
										'<li class="buttonTitle" id="queryWhere" data-hide="true">搜索</li>'+
										'<li class="buttonTitle" id="cleanWhere" onclick="cleanWhere()">全部清除</li>'+
									'</ul>'+
								'</div>'+
								'<div class="selectList">'+
									'<!-- 添加条件 -->'+
								'</div>'+
								'<div class="selectCeng">'+
									'<ul></ul>'+
								'</div>'+
							'</div>'+
						'</div>';
				
				$(_this).append(html);
				_this.timeClick();
				_this.customTimeClick();
				_this.addWhere();
				_this.buttonClick();
				
				//回车键执行搜索
				$(".search-div").keydown(function () {     
		             if (event.keyCode == "13") {//keyCode=13回车键
		            	 $(_this).find("#Num").text("1");
		            	 _this.initData();
		             }
		         });
				
				//搜索
				$(_this).find("#queryWhere").off("click");
				$(_this).find("#queryWhere").on("click", function(){
					$(_this).find("#Num").text("1");
					_this.initData();
				});
			};
			
			// 添加条件
			_this.addWhere = function(){
				$(_this).find("#addWhere").off("click");
				$(_this).find("#addWhere").on("click", function(){
					var len = $(_this).find(".selectList ul").length+1;
					$(opts.title).each(function(index,item){
						if(len == index){
							var string1 = "";
							if(item.string1 != null){
								string1 = "-"+item.string1;
							}
							$(_this).find(".selectList").append(
									"<ul>"+
									"<li style='position: relative; width: 16px;'><label class='checkbox-min'><input type='checkbox' class='input_check' name='whereCheck' checked='checked' /><span></span></label></li>"+
									"<li><a class='titles' href='javascript:;' data-text='"+ item.string + string1 +"'>"+ item.name +"</a></li>"+
									"<li>包含</li>"+
									"<li class='content'><input type='text' class='contentText' value='' placeholder='填写搜索条件' /></li>"+
									"<li class='closeLi' onclick='closeWhere(this)'><div style='width:18px; height:18px; margin-top:3px; border-radius:10px; background-color:#1ABC9C; position:relative;'><i class='fa fa-close' style='color:#FFF; position:absolute; top:3px; left:4px;'></i></div></li>"+
							"</ul>");
							$(_this).find('.selectList').scrollTop($(".selectList ul").length*25);
						}
					});
					
					_this.whereSelect();
				});
				
			};
			
			// 按钮权限控制
			_this.buttonClick = function(){
				$(_this).find(".toolbar").html("");
				var url  = window.location.pathname+window.location.search;
				$.ajax({
				    type: "POST",
				    url: "/user/userJurisdiction",
				    data: {
				    	url : url,
				    	ucps_type : 2
				    },
				    contentType: "application/x-www-form-urlencoded; charset=utf-8",
				    dataType: "json",
				    success: function(result) {
				    	if(result == null){
				    		return;
				    	}
				    	var button = "";
				    	if(result.menuLists.length < 1){
				    		return;
				    	}
				    	$(result.menuLists).each(function(index,item){
				    		if(item.ucps_url.indexOf("(") > -1 && item.ucps_url.indexOf(")") > -1){
				    			button += '<li class="click" onclick="'+ item.ucps_url +'">'+
								'<i class="'+ item.ucps_icon +'"></i>'+
								'<a href="javascript:">'+ item.ucps_name +'</a>'+
								'</li>';
				    		}else{
				    			button += '<li class="click" onclick="functionIfram(\''+ item.ucps_url +'\',\''+ item.ucps_name +'\',\''+ $("title").text() +'\')">'+
				    			'<i class="'+ item.ucps_icon +'"></i>'+
				    			'<a href="javascript:;">'+ item.ucps_name +'</a>'+
				    			'</li>';
				    		}
				    	});
				    	$(_this).find(".toolbar").html(button);
				    }
				});
			};
			
			// 条件筛选
			_this.whereSelect = function(){
				$(_this).find(".selectList .titles").off("click");
				$(_this).find(".selectList .titles").on("click", function(){
					$(_this).find(".selectList").next().css("top",$(this).offset().top+20);
					$(_this).find(".selectList").next().show();
					$(_this).find(".selectList").next().find("li").each(function(i){
						if($(this).text() == $(this).text()){
							$(this).css("background-color","#eee");
						}else{
							$(this).css("background-color","");
						}
					});
					obj = $(this);
					bool = false;
					
					$(_this).find(".selectList").next().find("ul").html("");
					$(opts.title).each(function(index,item){
						if(index > 0){
							var string1 = "";
							if(item.string1 != null){
								string1 = "-"+item.string1;
							}
							$(_this).find(".selectList").next().find("ul").append("<li onclick='selectClick(this)' data-text='"+ item.string+string1 +"'>"+ item.name +"</li>");
						}
					});
				});
				
				$("body").off("click");
				$("body").on("click", function(){
					if(bool){
						if(!$(".selectCeng").is(":hidden")){
							$(".selectCeng").hide();
						}
					}else{
						bool = true;
					}
				});
				
			};
			
			// 时间筛选
			_this.timeClick = function(){
				$(_this).find(".searchBar .timeClick[name='time']").off("click")
				$(_this).find(".searchBar .timeClick[name='time']").on("click", function(){
					$(_this).find("#Num").text(1);
					$(_this).find(".dateTime1").val("");
					$(_this).find(".dateTime2").val(returnDate(new Date()));
					$(_this).find(".searchBar .timeClick").each(function(i){
						$(this).attr("class","timeClick");
					});
					$(this).attr("class","timeClick mouseDown");
					
					$(_this).find(".inputTime").width(0);
					$(_this).find(".inputTime").hide();
					
					$(_this).find("#Num").text("1");
					_this.initData();
				});
			};
			
			// 自定义时间
			_this.customTimeClick = function(){
				$(_this).find(".searchBar .timeClick[name='times']").off("click");
				$(_this).find(".searchBar .timeClick[name='times']").on("click", function(){
					$(_this).find(".dateTime1").val("");
					$(_this).find(".dateTime2").val(returnDate(new Date()));
					$(_this).find(".searchBar .timeClick").each(function(i){
						$(this).attr("class","timeClick");
					});
					$(this).attr("class","timeClick mouseDown");
					
					$(_this).find(".inputTime").show();
					$(_this).find(".inputTime").animate({width: 200},300);
				});
				
				// 时间筛选读取数据
				$(_this).find(".searchBar .dateTime1").on("focus", function(){
					WdatePicker({
						onpicked: function(dp){
							if($(".dateTime1").val() != "" && $(".dateTime2").val() != ""){
								$(_this).find("#Num").text("1");
								_this.initData();
							}
						}
					});
				});
				// 时间筛选读取数据
				$(_this).find(".searchBar .dateTime2").on("focus", function(){
					WdatePicker({
						onpicked: function(dp){
							if($(".dateTime1").val() != "" && $(".dateTime2").val() != ""){
								$(_this).find("#Num").text("1");
								_this.initData();
							}
						}
					});
				});
			};
			
			/** 生成表格*/
			_this.createTable = function(){
				if(opts.dataTime != null && opts.dataTime != ""){
					$(opts.dataTime).each(function(index,item){
						$(_this).find("#dateSelect").append('<option value="'+ item.string +'">'+ item.name +'</option>');
					});
					
					//时间条件筛选
					$(_this).find("#dateSelect").on("change", function(){
						_this.initData();
						$(_this).find("#Num").text("1");
					});
					
				}else{
					$(_this).find("#dateSelect").remove();
				}
				
				// 其他条件筛选
				$(_this).find("select.where_screen").on("change", function(){
					_this.initData();
					$(_this).find("#Num").text("1");
				});
				
				// cookie值
				var pageSize = 10;
				if($.cookie("pageSize") != null && $.cookie("pageSize") != "" && $.cookie("pageSize") != "undefined"){
					pageSize = $.cookie("pageSize");
				}
				if($(_this).find("#sizeCount>input").val() != ""){
					$.cookie("pageSize", pageSize, { expires : 7 });
				}else{
					if(opts.pageNo == null || opts.pageNo == ""){
						opts.pageNo = 10;
					}
					$.cookie("pageSize", opts.pageNo, { expires : 7 });
				}
				var titleContent = "";
				$(opts.title).each(function(index,item){
					if(index == 0){
						titleContent+='<td data-text="'+ item.string +'">'+ item.name +'</td>';
					}else{
						titleContent+='<td data-text="'+ item.string +'">'+  item.name +'<i class="arrow-down" onclick="dataOrderBy(this)"></i></td>';
					}
				});
				if(opts.selectBool == true){
					titleContent+='<td>操作</td>';
				}
				var html='<table class="personTable">'+
							'<thead style="background: '+ opts.titleBg +'; color: '+ opts.titleColor +'">'+
								'<tr>'+
									'<td style="width:33px;"><label class="checkbox-min"><input type="checkbox" class="input_check" name="check"/><span></span></label></td>'+
									titleContent+
								'</tr>'+
							'</thead>'+
							'<tbody>'+
								
							'</tbody>'+
						'</table>'+
						'<div class="pagin">'+
							'<div class="message" style="border: 0px; margin-top: 0;">共<i class="blue" id="nums"></i>条记录，当前显示第&nbsp;<i class="blue" id="Num">1</i>&nbsp;页，共&nbsp;<i class="blue" id="sizeNum"></i>&nbsp;页<label id="sumMony"></lable></div>'+
							'<div class="pageNos">'+
							'<ul><li class="paginItem"><a id="upPage" href="javascript:;"><span class="pagepre" id="up"></span></a></li></ul>'+
							'<ul class="paginList">'+
							'</ul>'+
							'<ul><li class="paginItem"><a id="downPage" href="javascript:;"><span class="pagenxt" id="down"></span></a></li></ul>'+
							'<ul><li id="sizeCount"><input type="text" onkeyup="this.value=this.value.replace(/[^0-9]\D*$/,\'\')" value="'+ $.cookie("pageSize")  +'" maxlength="3" placeholder="请输入条数" /></li><li class="paginItem"><a class="sessionPage" href="javascript:;">设置</a></li></ul>'+
							'</div>'+
						'</div>';
					$(_this).append(html);
					
					//设置页码
					$(_this).find(".sessionPage").off("click");
					$(_this).find(".sessionPage").on("click", function(){
						$(_this).find("#Num").text(1);
						$.cookie("pageSize", $("#sizeCount input").val(), { expires : 7 });
						_this.initData();
					});
					
					// 读取数据并显示到表格里面
					_this.initData();
				};
				
			_this.initData = function(){
				$(_this).find("#upPage").off("click");
				$(_this).find("#downPage").off("click")
				userselect = $.Deferred();
				var data,pageSize,pageNo,sum;
				opts.data.pageNo = $(_this).find("#Num").text();
				
				var str = '';
				var dateStr = '';
				var sumMoney = null;
				
				$(".searchBar .timeClick").each(function(i){
					if($(this).attr("class") == "timeClick mouseDown"){
						dateStr = $(this).text();
					}
				});
				
				$(_this).find(".selectList ul").each(function(i){
					if($(this).find(".checkbox-min input").is(':checked')){
						var boolt = true;
						var strings = $(this).find("a").attr("data-text");
						var texts = $(this).find(".content input").val();
						if(texts == ""){
							return true;
						}
						$(opts.title).each(function(index,item){
							if(item.string == strings && item.parameter != null && item.parameter != ""){
								$.each(item.parameter,function(index,ite){
									if(ite == texts){
										str += ""+ strings + "::" + index + "::1,";
									}
								});
								boolt = false;
								return false;
							}
						});
						if(boolt){
							str += ""+ strings + "::" + isSpace(texts) + "::0,";
						}
					}
				});
				if($(_this).find("#cnt-state").length > 0){
					str += $("#cnt-state").attr("data-text") + "::" + $("#cnt-state option:selected").val() + ",";
				}
				if(opts.search_bars.length > 0){
					$.each(opts.search_bars, function(index, data){
						var _val = $("[name="+ data.name +"]").val();
						if(_val != 0 && _val != null && _val != ''){
							str += data.name + "::" + _val + "::0,";
						}
					});
				}
				
				var dateStart = $(_this).find(".dateTime1").val();
				var dateEnd = $(_this).find(".dateTime2").val();
				if(dateStr == "全部"){
					dateStr = "";
					dateEnd = ""
				}
				
				if(str != ""){
					str = str.substring(0,str.length-1);
				}
				
				opts.data.str = str;
				opts.data.dateStart = dateStart;
				opts.data.dateEnd = dateEnd;
				opts.data.dateStr = dateStr;
				opts.data.dateType = $(_this).find("#dateSelect").val();
				
				$.ajax({
				    type: "POST",
				    url: opts.url,
				    data: opts.data,
				    contentType: "application/x-www-form-urlencoded; charset=utf-8",
				    dataType: "json",
				    success: function(result) {
				    	if(result.code == null || result.code == ""){
				    		if(result.dataList.length <= 0){
				    			data = null;
				    		}else{
				    			data = result.dataList;
				    			pageSize = result.pageSize;
				    			sum = result.sum;
				    			sumMoney = result.sumMoney;
				    		}
				    	} else {
				    		if(result.data.list.length <=0){
				    			data = null;
				    		} else {
				    			data = result.data.list;
				    			pageSize = result.data.totalPage;
				    			sum = result.data.totalRecords;
				    		}
				    	}
				    	userselect.resolve();
				    },beforeSend:function(){
				    	$(_this).find("tbody").html("<tr><td style='height: 300px; background: #FFF' colspan='"+ opts.title.length+1 +"'><div style='width: 400px; height:225px; margin: 0 auto; margin-top:-10px;'><img src='/resources/image/loding.gif'/></div><td></tr>");
				    }
				});
				
				//数据加载
				$.when(userselect).done(function(){
					var tbodyData = "";
					if(data == null){
						tbodyData = "<tr><td colSpan='"+ $(_this).find("table thead td").length +"'><div style='width:100%; height:100%; background-color: #FFF;text-align: center;'><img style='margin-top: 17px;' src='/resources/image/notdata.jpg' /></div></td></tr>"
						$(_this).find("table tbody").html(tbodyData);
						$(_this).find(".pagin").hide();
					}else{
						$(_this).find("table tbody").empty();
						$(data).each(function(index,item){
							var tbodyData = "";
							var todd = "";
							if(index % 2 == 1){
								todd = "odd";
							}
							tbodyData += '<tr class="'+ todd +'">';
							var functions = $(_this).find("thead tr td").eq(1).attr("data-text");
							if(functions != null && functions != ""){
								for(var name in item){
									if(name == functions){
										tbodyData += '<td><label class="checkbox-min" data-id="'+ item[name] +'"><input type="checkbox" class="input_check" name="check"/><span></span></label></td>';
									}
								}
							}else{
								tbodyData += '<td><label class="checkbox-min"><input type="checkbox" class="input_check" name="check"/><span></span></label></td>';
							}
							tbodyData += '<td>'+ (index+1) +'</td>';
							$(opts.title).each(function(index,item1){
								var dataType = "";
								if(index > 0){
									for(var name in item){
										if(item1.string == name){
											var str = item[name];
											if(item1.parameter != ""){
												$.each((item1.parameter || ""),function(index,item){
													if(index == str + ""){
														str = item;
													}
												});
											}
											//时间格式化
											if(item1.format != null && item1.format != ""){
												str = Format(str,item1.format);
											}else{
												str = str;
											}
											if(item1.href != null && item1.href != ""){
												// 添加A标签
												var href = item1.href.split("&");
												for(var i = 1; i < href.length; i++){
													var boolHref = false;
													for(var name in item){
														if(href[i] == name){
															dataType += "&"+href[i]+"="+item[name];
															boolHref = true;
															break;
														}
													}
													if(!boolHref){
														dataType += "&"+href[i];
													}
												}
												dataType = dataType.substring(1,dataType.length);
												dataType = href[0]+"?"+dataType;
												str = str;
											}
											if(str == null){
												str = "";
											}
											// 第二个变量
											if(item1.string1 != null && item1.string1 != ""){
												var str1 = "";
												for(var name in item){
													if(item1.string1 == name){
														str1 = item[name];
														if(item1.parameter != ""){
															$.each(item1.parameter1,function(index,item){
																if(index == str1){
																	str1 = item;
																}
															});
														}
														//时间格式化
														if(item1.format != null && item1.format != ""){
															str1 = Format(str1,item1.format1);
														}else{
															str1 = str1;
														}
														if(str1 == null){
															str1 = "";
														}
														if(str1 != null && str1 != "" && item1.string1_prefix != null && item1.string1_prefix != ''){
															str1 = item1.string1_prefix + str1; 
														}
														if(str1 != null && str1 != "" && item1.string1_nextfix != null && item1.string1_nextfix != ''){
															str1 = str1 + item1.string1_nextfix; 
														}
													}
												}
												str+=str1;
											}
											if(item1.href != null && item1.href != ""){
												str = '<a href="javascript:;" onclick="hrefClick(this)" data-type="'+ dataType +'">'+ str +'</a>';
											}
											// 内容左边添加div
											if(item1.leftDiv != null && item1.leftDiv != ""){
												str = item1.leftDiv + str;
											}
											// 内容右边添加div
											if(item1.rightDiv != null && item1.rightDiv != ""){
												var rightContent = item1.rightDiv;
												if(item1.rightDiv.indexOf("?") > 0){
													var strs = rightContent.substring(rightContent.indexOf("?")+1,rightContent.indexOf("&"));
													var strs1 = rightContent.substring(rightContent.indexOf("?"),rightContent.indexOf("&")+1);
													for(var name in item){
														if(strs == name){
															if(item[name] == null){
																rightContent = "";
															}else{
																rightContent = rightContent.replace(strs1,item[name]);
															}
														}
													}
												}
												str = str+rightContent;
											}
											if(item1.divSpan != null ){
												str += item1.divSpan;
											}
											tbodyData += '<td data-text="'+item1.string+'">'+ str +'</td>';
										}
									}
								}
							});
							if(opts.selectBool == true){
								tbodyData += '<td ><i class="fa-outdent"></i></td>';
								tbodyData += '</tr>';
								tbodyData += '<tr style="display:none;"></tr>';
							}else{
								tbodyData += '</tr>';
							}
							$(_this).find("table tbody").append(tbodyData);
							$(_this).find("table tbody tr:last").find("[name=check]").data("data", item);
						});
						$(_this).find(".pagin").show();
					}
//					$(_this).find("table tbody").html(tbodyData);
					if(sumMoney != null && sumMoney != ""){
						$(_this).find("#sumMony").html("，总金额：<font style='color:#E74C3C'>"+sumMoney+"</font>");
					}
					$(_this).find("#sizeNum").text(pageSize+(opts.houseAdd/$.cookie("pageSize")));
					$(_this).find("#nums").text(sum+opts.houseAdd);
					_this.initPage();
					_this.clickTr();
					_this.select();
					_this.clickUp();
					_this.clickDown();
					
		        	opts.success(_this);
		        	
		        	bools = false;
				});
			};
			
			//TD详情点击
			_this.select = function(){
				$(_this).find("table tbody td .fa-outdent").off("click");
				$(_this).find("table tbody td .fa-outdent").on("click", function(){
					opts.selectClick($(this).parent().parent());
				});
			};
			
			//点击tr选择事件
			_this.clickTr = function(){
				//全选
				$(_this).find("table thead tr").off("click");
				$(_this).find("table thead tr").on("click", function(){
					if($(this).find(".checkbox-min input").is(":checked")){
						$(_this).find("table tbody tr").find(".checkbox-min input").attr("checked",true);
					}else{
						$(_this).find("table tbody tr").find(".checkbox-min input").attr("checked",false);
					}
				});
				
				$(_this).find("table tbody tr").off("click");
				$(_this).find("table tbody tr").on("click", function(){
					if(opts.trClick){
						if($(this).find(".checkbox-min input").is(":checked")){
							$(this).find(".checkbox-min input").attr("checked",false);
						}else{
							$(this).find(".checkbox-min input").attr("checked",true);
						}
					}else{
						$(_this).find("table tbody tr").find(".checkbox-min input").attr("checked",false);
						$(this).find(".checkbox-min input").attr("checked",true);
					}
				});
			};
			
			// 格式化页码
			_this.initPage = function(){
				//开始的页数样式
				if($(_this).find("#sizeNum").text()<=5){
					$(_this).find(".paginList").html("");
					for(var i=1; i<=$("#sizeNum").text(); i++){
						$(_this).find(".paginList").append("<li id='paginList_"+ i +"' class='paginItem'><a data-li='"+ i +"' href='javascript:;'>"+ i +"</a></li>");
					}
				}else{
					if($(_this).find("#Num").text()<=5){
						$(_this).find(".paginList").html("");
						for(var i=1; i<=5; i++){
							$(_this).find(".paginList").append("<li id='paginList_"+ i +"' class='paginItem'><a data-li='"+ i +"' href='javascript:;'>"+ i +"</a></li>");
						}
					}
				}
				//end
				
				//样式变化
				$(".paginList li").each(function(idx) {
					$(_this).find(this).attr("class", "paginItem");
				});
				$("#paginList_"+$(_this).find("#Num").text()+"").attr("class", "paginItem current");
				//end
				
				//判断最后一页和第一页的样式
				if($(_this).find("#Num").text() == $(_this).find("#sizeNum").text() && $(_this).find("#sizeNum").text() != "1"){
					$(_this).find(".paginItem span[id=down]").css("background","url(/resources/image/next_1.gif) no-repeat center center");
					$(_this).find(".paginItem span[id=up]").css("background","url(/resources/image/pre.gif) no-repeat center center");
				}else if($(_this).find("#Num").text() == "1" && $(_this).find("#sizeNum").text() != "1"){
					$(_this).find(".paginItem span[id=down]").css("background","url(/resources/image/next.gif) no-repeat center center");
					$(_this).find(".paginItem span[id=up]").css("background","url(/resources/image/pre_1.gif) no-repeat center center");
				}else if($(_this).find("#Num").text() == "1" && $(_this).find("#sizeNum").text() == "1"){
					$(_this).find(".paginItem span[id=down]").css("background","url(/resources/image/next_1.gif) no-repeat center center");
					$(_this).find(".paginItem span[id=up]").css("background","url(/resources/image/pre_1.gif) no-repeat center center");
				}else if($(_this).find("#Num").text() != "1" && $(_this).find("#Num").text() != $(_this).find("#sizeNum").text()){
					$(_this).find(".paginItem span[id=down]").css("background","url(/resources/image/next.gif) no-repeat center center");
					$(_this).find(".paginItem span[id=up]").css("background","url(/resources/image/pre.gif) no-repeat center center");
				}
				
				$(_this).find(".paginList li").off("click");
				
				//标签页点击事件
				$(_this).find(".paginList li").off("click");
				$(_this).find(".paginList li").on("click", function(){
					$(_this).find("#Num").text($(this).find("a").attr("data-li"));
					$(this).attr("class", "paginItem");
					// 读取数据并显示到表格里面
					_this.initData();
				});
			};
			
			//上翻页
			_this.clickUp = function(){
				$(_this).find("#upPage").on("click", function(){
					// 获取当前页数
					var pageMum =parseInt($(_this).find("#Num").text());
					//最大页数
					var pageSize =parseInt($(_this).find("#sizeNum").text());
					if(pageMum>1){
						if((pageMum-1) % 5 ==0){
							$(_this).find(".paginList").html("");
							for(var i=5; i>0; i--){
								$(_this).find(".paginList").append("<li id='paginList_"+ (pageMum-i) +"' class='paginItem'><a data-li='"+ (pageMum-i) +"' href='javascript:;'>"+ (pageMum-i) +"</a></li>");
							}
						}
						$(_this).find("#Num").text(pageMum-1);
						// 读取数据并显示到表格里面
						_this.initData();
					}
				});
			};
			
			//下翻页
			_this.clickDown = function(){
				$(_this).find("#downPage").on("click", function(){
					// 获取当前页数
					var pageMum =parseInt($(_this).find("#Num").text());
					//最大页数
					var pageSize =parseInt($(_this).find("#sizeNum").text());
					if(pageMum < pageSize){
						if((pageMum + 5)<pageSize){
							if(pageMum % 5 == 0){
								$(_this).find(".paginList").html("");
								for(var i=1; i<= 5; i++){
									$(_this).find(".paginList").append("<li id='paginList_"+ (pageMum+i) +"' class='paginItem'><a data-li='"+ (pageMum+i) +"' href='javascript:;'>"+ (pageMum+i) +"</a></li>");
								}
							}
							$(_this).find("#Num").text(pageMum+1);
							// 读取数据并显示到表格里面
							_this.initData();
						}else{
							if(pageMum % 5 == 0){
								$(_this).find(".paginList").html("");
								for(var i=4; i>=0; i--){
									$(".paginList").append("<li id='paginList_"+ (pageSize-i) +"' class='paginItem'><a data-li='"+ (pageMum-i) +"' href='javascript:;'>"+ (pageSize-i) +"</a></li>");
								}
							}
							$(_this).find("#Num").text(pageMum+1);
							// 读取数据并显示到表格里面
							_this.initData();
						}
					}
				});
			};
			
			// 执行
			_this.init();
		});
	};
})($, document);

/**
 * 数据排序
 * 
 * @param ids
 */
function dataOrderBy(ids){
	if($(ids).attr("class")=="arrow-down"){
		$(".icon-titles").attr("class","arrow-down");
		$(ids).attr("class","arrow-up");
	}else{
		$(ids).attr("class","arrow-down");
	}
}


/* ===============条件筛选================== */

/**
 * 筛选条件选择
 * 
 * @param ids
 */
function selectClick(ids){
	$(obj).text($(ids).text());
	$(obj).attr("data-text" , $(ids).attr("data-text"));
	$(obj).parent().parent().find("li").each(function(i){
		$(this).css("background-color","");
	});
	$(ids).css("background-color","#eee");
}

/**
 * 精确查询
 */
function accurateSelect(){
	if($(".selectDiv").is(":hidden")){
		$(".selectDiv").show();
		$(".jselect").attr("class","jselect jselectDown");
		$(".jselect i").show();
	}else{
		$(".selectDiv").hide();
		$(".jselect").attr("class","jselect");
		$(".jselect i").hide();
	}
}

/**
 * 清除单个条件
 * 
 * @param ids
 */
function closeWhere(ids){
	$(ids).parent().remove();
}

/**
 * 清除条件
 */
function cleanWhere(){
	$('.selectList').html("");
}

/**
 * 去掉前后空格
 * 
 * @param str
 * @returns
 */
function isSpace(str) {
    return str.replace(/(^\s*)|(\s*$)/g,'');
}

/* ===============END================== */

/** 返回日期 2016-01-01*/
function returnDate(time){
	if (time == null || time == "") {
		return "";
	}
    var t = new Date(time);
    var tf = function(i){return (i < 10 ? '0' : '') + i};
    return "yyyy-MM-dd".replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
        switch(a){
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

/**
 * 毫秒转换为日期格式
 * @param time 时间/时间字符串
 * @param format 时间格式 "yyyy-MM-dd" || "yyyy-MM-dd HH:mm:ss" 
 * @returns
 */
function Format(time, format){
	if (time == null || time == "") {
		return "";
	}
    var t = new Date(time);
    var tf = function(i){return (i < 10 ? '0' : '') + i};
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
        switch(a){
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

/*=======================增加标签页=========================================*/

/**
 * 跳转页面新增标签页
 */
function functionIfram(href,title,parentTile){
	window.parent.href_mo(href,title,parentTile);
}

//房屋招租状态
function forRentState(value){
	switch (value) {
	case "新存招租" :
		value = "<font style='color:#27AE60'>新存招租</font>";
		break;
	case "转租招租" :
		value = "<font style='color:#27AE60'>转租招租</font>";
		break;
	case "退租招租" :
		value = "<font style='color:#27AE60'>强退招租</font>";
		break;
	case "到期招租" :
		value = "<font style='color:#27AE60'>到期招租</font>";
		break;
	case "强收招租" :
		value = "<font style='color:#27AE60'>强收招租</font>";
		break;
	case "换房招租" :
		value = "<font style='color:#F39C12'>换房招租</font>";
		break;
	case "停止招租" :
		value = "<font style='color:#E74C3C'>停止招租</font>";
		break;
	case "已解约" :
		value = "<font style='color:#E74C3C'>已解约</font>";
		break;
	case "暂停招租" :
        value = "<font style='color:#F39C12'>暂停招租</font>";
        break;
	default:
		value = "无";
		break;
	}
	return value;
}

// 获取url
function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
	}

//房屋审核状态
function returnCheckStatus(value){
    switch (value) {
        case "审核中" :
            value = "<font style='color:#F39C12'>审核中</font>";
            break;
        case "审核未通过" :
        	value = "<font style='color:#E74C3C'>审核未通过</font>";
        	break;
        case "审核通过" :
            value = "<font style='color:#27AE60'>审核通过</font>";
            break;
        default:
            value = "<font style='color:#E74C3C'>未审核</font>";
            break;
    }
    return value;
}

//招租类型
function isForRent(value){
    switch (value) {
        case "正在招租" :
            value = "<font style='color:#27AE60'>正在招租</font>";
            break;
        case "停止招租" :
            value = "<font style='color:#E74C3C'>停止招租</font>";
            break;
        case "暂停招租" :
            value = "<font style='color:#F39C12'>暂停招租</font>";
            break;
        default:
            value = "无";
            break;
    }
    return value;
}