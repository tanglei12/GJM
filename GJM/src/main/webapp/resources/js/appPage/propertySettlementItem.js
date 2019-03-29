$(function(){
    $.load_data();
});
;(function(window,$){
	
	// 项目类型
	var propertyType;
	// 项目模式
	var propertyMode;
	// 项目数据
	var propertyData;
	
	/** 总计*/
	var moneyTotal = function(){
		var total = 0;
		$("main").find(".statement_subtotal").each(function(){
			total += returnFloat($(this).text());
		});
		$("main").find(".statement_total").html(returnFloat(total));
	};
	
	/** 小计*/
	var moneySubtotal = function(obj){
		var box = $(obj).parents(".content");
		// 数量
		var sn = returnFloat(box.find("[name=statement_n]").val());
		// 单价
		var su = returnFloat(box.find("[name=statement_u]").val());
		// 违约金
		var sw = returnFloat(box.find("[name=statement_w]").val());
		// 小计
		box.find(".statement_subtotal").html(returnFloat(sn * su + sw));
	};

	/** 添加费用项*/
	var propertyItemAdd = function(desc, money){
		var html = '';
		html += '<div class="content-item">';
		html += '	<dl>';
		html += '		<dd style="flex: 2;">';
		html += '			<input type="text" name="statement_d" value="'+ returnValue(desc) +'" placeholder="描述" style="text-align: left;" required>';
		html += '		</dd>';
		html += '		<dd>';
		html += '			<input type="number" class="error" name="statement_m" value="'+ returnNumber(money) +'" placeholder="默认为0">';
		html += '		</dd>';
		html += '		<button class="fa-minus-circle error" name="item-remove" style="font-size: 24px;width: 44px;"></button>';
		html += '	</dl>';
		html += '</div>';
		var box = $(html).appendTo($("#propertyItemBox")).hide().show("fast");
		// 获取焦点
		if(isEmpty(desc)) box.find("[name=statement_d]").focus();
		// 小计
		moneySubtotal();
	};
	
	/** 加载数据*/
	$.load_data = function(){
		var type = getUrlParam("type");
		var mode = getUrlParam("mode");
		var json = Base64.decode(getUrlParam("data"));
		$("title").html(mode);
		// 项目类型
		propertyType = type;
		// 项目模式
		propertyMode = mode;
		// 项目数据
		propertyData = isEmpty(json) ? json : json.toJson();
		propertyData = propertyData == "undefined" || propertyData == "null" ? null : propertyData;

		// 初始化视图
		switch (type) {
			case "xf":
				if(propertyMode == "水电气"){
					$.load_xf_sdq();
				} else {
					$.load_xf_common();
				}				
				break;
			case "wp":
				$.load_wp_common();
				break;
		}

		var html = '';
		html += '<div class="content" style="display: flex;background: none;">';
		html += '	<button class="content-submmit next-bg" name="save" onclick="$.save(\''+ propertyMode +'\');">提交</button>';
		html += '</div>';
		$("main").append(html);
		
		// 绑定事件
		$("main").on("input propertychange", "[name^=statement]", function(){
			moneySubtotal(this);
		});
		
		// 添加费用项
		$("[name=property-add]").on("click", function(){
			propertyItemAdd();
		});
		
		// 移除费用项
		$("main").on("click", "[name=item-remove]", function(){
			$(this).parents(".content-item").hide("fast", function(){
				this.remove();
			});
		});
	};
	
	/** 消费-水电气*/
	$.load_xf_sdq = function(){
		var data = $.extend(true, {
			"水" : {icon : "/resources/image/appPage/property_water.png", sci_unitPrice : 4.3},
			"电" : {icon : "/resources/image/appPage/property_electric.png",  sci_unitPrice : 0.52},
			"气" : {icon : "/resources/image/appPage/property_gas.png",  sci_unitPrice : 1.72},
		}, propertyData);
		
		var total = 0;
		var html = '';
		
		// 遍历数据
		$.each(data, function(name, item){
			if(isEmpty(name)) return;
			var arr = (item.sci_desc || "").split("#");
			var ss = returnNumber(arr[0]);
			var se = returnNumber(item.sci_end || arr[1]); // 
			subtotal = returnFloat((se - ss) * returnFloat(item.sci_unitPrice) + returnFloat(item.sci_penalty)); 
			ss = ss == 0 ? "" : ss;
			se = se == 0 ? "" : se;
			total += subtotal;
			
			html += '<div class="content" data-type="'+ name +'">';
			html += '	<div class="content-head">';
			html += '		<div class="content-item-icon"><img src="'+ item.icon +'"></div>';
			html += '		<div class="content-item-title">'+ name +'</div>';
			html += '		<div class="content-item-option"></div>';
			html += '	</div>';
			html += '	<div class="content-main">';
			html += '		<div class="content-item">';
			html += '			<dl>';
			html += '				<dt>未缴费起数</dt>';
			html += '				<dd>';
			html += '					<input type="number" class="error" name="statement_s" value="'+ returnValue(ss) +'" placeholder="未缴费起数">';
			html += '				</dd>';
			html += '			</dl>';
			html += '		</div>';
			html += '		<div class="content-item">';
			html += '			<dl>';
			html += '				<dt>抄表止数</dt>';
			html += '				<dd>';
			html += '					<input type="number" class="error" name="statement_e" value="'+ returnValue(se) +'" placeholder="抄表数">';
			html += '				</dd>';
			html += '			</dl>';
			html += '		</div>';
			html += '		<div class="content-item">';
			html += '			<dl>';
			html += '				<dt>消费量</dt>';
			html += '				<dd>';
			html += '					<input type="number" name="statement_n" value="'+ returnFloat(item.sci_number) +'" readonly>';
			html += '				</dd>';
			html += '			</dl>';
			html += '		</div>';
			html += '		<div class="content-item">';
			html += '			<dl>';
			html += '				<dt>单价：元/m³</dt>';
			html += '				<dd>';
			html += '					<input type="number" class="error" name="statement_u" value="'+ returnFloat(item.sci_unitPrice) +'" placeholder="单价">';
			html += '				</dd>';
			html += '			</dl>';
			html += '		</div>';
			html += '		<div class="content-item">';
			html += '			<dl>';
			html += '				<dt>违约金</dt>';
			html += '				<dd>';
			html += '					<input type="number" class="error" name="statement_w" value="'+ returnValue(item.sci_penalty) +'" placeholder="违约金">';
			html += '				</dd>';
			html += '			</dl>';
			html += '		</div>';
			html += '		<div class="content-item">';
			html += '			<dl>';
			html += '				<dd>';
			html += '					<span style="display: block;width: 100%;text-align: right;padding-right: 16px;">小计：<span class="statement_subtotal error">'+ subtotal +'</span>&nbsp;元</span>';
			html += '				</dd>';
			html += '			</dl>';
			html += '		</div>';
			html += '	</div>';
			html += '</div>';
		});
		html += '<div class="content">';
		html += '	<div class="content-main">';
		html += '		<div class="content-item">';
		html += '			<dl>';
		html += '				<dd>';
		html += '					<span style="display: block;width: 100%;text-align: right;padding-right: 16px;">总计：<span class="statement_total error">'+ returnFloat(total, 2, true) +'</span>&nbsp;元</span>';
		html += '				</dd>';
		html += '			</dl>';
		html += '		</div>';
		html += '	</div>';
		html += '</div>';
		$("main").html(html);

		// 小计
		moneySubtotal = function(obj){
			var box = $(obj).parents(".content");
			// 起始
			var ss = returnFloat(box.find("[name=statement_s]").val());
			// 止数
			var se = returnFloat(box.find("[name=statement_e]").val());
			// 数量
			var sn = returnFloat(box.find("[name=statement_n]").val(se - ss).val());
			// 单价
			var su = returnFloat(box.find("[name=statement_u]").val());
			// 违约金
			var sw = returnFloat(box.find("[name=statement_w]").val());
			// 小计
			box.find(".statement_subtotal").html(returnFloat(sn * su + sw));
			// 总计
			moneyTotal();
		};
	};
	
	/** 消费-公共*/
	$.load_xf_common = function(){
		data = propertyData || "";
		var subtotal = returnFloat(returnNumber(data.sci_number) * returnFloat(data.sci_unitPrice) + returnFloat(data.sci_penalty));
		var html = '';
		html += '<div class="content" data-type="'+ propertyMode +'">';
		html += '	<div class="content-main">';
		html += '		<div class="content-item">';
		html += '			<dl>';
		html += '				<dt>消费量</dt>';
		html += '				<dd>';
		html += '					<input type="number" class="error" name="statement_n" value="'+ returnValue(data.sci_number) +'" placeholder="消费量">';
		html += '				</dd>';
		html += '			</dl>';
		html += '		</div>';
		html += '		<div class="content-item" style="display:block">';
		html += '			<dl>';
		html += '				<dt>单价：'+ (propertyMode == "租金" ? "元/天" : "元/月") +'</dt>';
		html += '				<dd>';
		html += '					<input type="number" class="error" name="statement_u" value="'+ returnValue(data.sci_unitPrice) +'" placeholder="单价">';
		html += '				</dd>';
		html += '			</dl>';
		html += '		</div>';
		html += '		<div class="content-item">';
		html += '			<dl>';
		html += '				<dt>违约金</dt>';
		html += '				<dd>';
		html += '					<input type="number" class="error" name="statement_w" value="'+ returnValue(data.sci_penalty) +'" placeholder="违约金">';
		html += '				</dd>';
		html += '			</dl>';
		html += '		</div>';
		html += '		<div class="content-item">';
		html += '			<dl>';
		html += '				<dd>';
		html += '					<span style="display: block;width: 100%;text-align: right;padding-right: 16px;">总计：<span class="statement_subtotal error">'+ subtotal +'</span>&nbsp;元</span>';
		html += '				</dd>';
		html += '			</dl>';
		html += '		</div>';
		html += '	</div>';
		html += '</div>';
		html += '<div class="content">';
		html += '	<div class="content-main" style="padding: 0;">';
		html += '		<textarea name="statement_remarks" placeholder="费用说明" style="position: relative;width: 100%;padding: 10px;height: 100px;resize: none;font-size: 3.8vw;padding-right: 16px;">'+ returnValue(data.sci_desc) +'</textarea>';
		html += '	</div>';
		html += '</div>';
		$("main").html(html);
	};
	
	/** 物品-公共*/
	$.load_wp_common = function(){
		data = propertyData || "";
		var html = '';
		html += '<div class="content" data-type="'+ propertyMode +'">';
		html += '	<div class="content-head">';
		html += '		<div class="content-item-title">'+ propertyMode +'</div>';
		html += '		<div class="content-item-option" style="padding:0;"><button class="btn-item fa-plus-circle next" name="property-add" style="font-size: 24px;width: 44px;line-height: 44px;"></button></div>';
		html += '	</div>';
		html += '	<div class="content-main" id="propertyItemBox"></div>';
		html += '</div>';
		html += '<div class="content">';
		html += '	<div class="content-main">';
		html += '		<div class="content-item">';
		html += '			<dl>';
		html += '				<dd>';
		html += '					<span style="display: block;width: 100%;text-align: right;padding-right: 16px;">小计：<span class="statement_subtotal error">0</span>&nbsp;元</span>';
		html += '				</dd>';
		html += '			</dl>';
		html += '		</div>';
		html += '	</div>';
		html += '</div>';
		html += '<div class="content">';
		html += '	<div class="content-main" style="padding: 0;">';
		html += '		<textarea name="statement_remarks" placeholder="备注" style="position: relative;width: 100%;padding: 10px;height: 100px;resize: none;font-size: 3.8vw;padding-right: 16px;">'+ returnValue(data.sdi_desc) +'</textarea>';
		html += '	</div>';
		html += '</div>';
		$("main").html(html);
		
		if(!isEmpty(data.sdi_list)){
			$.each(data.sdi_list.split(";"), function(index, data){
				if(isEmpty(data)) return;
				propertyItemAdd(data.split("#")[0], data.split("#")[1]);
			});
		}
		
		// 替换小计
		moneySubtotal = function(){
			var subtotal = 0;
			$("#propertyItemBox").find("[name=statement_m]").each(function(){
				subtotal += returnFloat($(this).val());
			});
			// 小计
			$("main").find(".statement_subtotal").html(returnFloat(subtotal));
		};
		
		// 执行小计
		moneySubtotal();
	};
	
	/** 保存数据*/
	$.save = function(){
		var boo = true;
		var box = $("main");
		box.find("[required]").each(function(){
			if(isEmpty($(this).val())){
				$(this).appMsg("请输入" + ($(this).attr("placeholder") || ""));
				return boo = false;
			}
		});
		if(!boo) return;
		
		var data = {
			mode : "",
			total : 0,
			item : {},
		};
		if(propertyType == "xf"){
			if(propertyMode == "水电气"){
				// 模式
				data.mode = "消费";
				// 总金额
				data.total = returnFloat(box.find(".statement_total").text());
				// 数据项
				box.find(".content").each(function(){
					var subBox = $(this);
					var type = subBox.attr("data-type");
					if(isEmpty(type)) return;
					
					data.item[type] = {
						sci_type : "消费",
						sci_itemName : type,
						sci_desc : returnNumber(subBox.find("[name=statement_s]").val()) + "#" + returnNumber(subBox.find("[name=statement_e]").val()),
						sci_number : returnFloat(subBox.find("[name=statement_n]").val()),
						sci_unitPrice : returnFloat(subBox.find("[name=statement_u]").val()),
						sci_penalty : returnFloat(subBox.find("[name=statement_w]").val()),
						sci_totalCosts : returnFloat(subBox.find(".statement_subtotal").text()),
					};
				});
			} else {
				var subBox = box.find(".content[data-type="+ propertyMode +"]");
				// 模式
				data.mode = "消费";
				// 总金额
				data.total = returnFloat(subBox.find(".statement_subtotal").text());
				// 数据项
				data.item = {
					sci_type : "消费",
					sci_itemName : propertyMode,
					sci_number : returnFloat(subBox.find("[name=statement_n]").val()),
					sci_unitPrice : returnFloat(subBox.find("[name=statement_u]").val()),
					sci_penalty : returnFloat(subBox.find("[name=statement_w]").val()),
					sci_desc : returnValue(box.find("[name=statement_remarks]").val()),
					sci_totalCosts : data.total,
				};
			}
		}
		
		// 物品
		if(propertyType == "wp"){
			// 模式
			data.mode = "物品";
			// 总金额
			data.total = returnFloat(box.find(".statement_subtotal").text());
			// 数据项
			data.item = {
				sdi_type : propertyMode,
				sdi_cost : data.total,
				sdi_list : "",
				sdi_desc : returnValue(box.find("[name=statement_remarks]").val()),
			};
			$("#propertyItemBox").find(".content-item").each(function(){
				data.item.sdi_list += returnValue($(this).find("[name=statement_d]").val()) + "#" + returnValue($(this).find("[name=statement_m]").val()) + ";"; 
			});
			data.item = $.extend(propertyData, data.item);
		}
        data.type = "settlement";
        data.modeType = propertyMode;
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
            window.webkit.messageHandlers.goBackWhere.postMessage([JSON.stringify(data)]);
        } else if (/(Android)/i.test(navigator.userAgent)) {
            webview.goBackWhere(JSON.stringify(data));
        }
	};
	
})(window,$);