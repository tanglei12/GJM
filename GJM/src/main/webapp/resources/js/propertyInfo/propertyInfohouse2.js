$(document).ready(function() {
		var $tab_li = $('#tab ul li');
		$tab_li.click(function() {
			$(this).addClass('selected').siblings().removeClass('selected');
			var index = $tab_li.index(this);
			$('div.tab_box > div').eq(index).show().siblings().hide();
		});
	});
	function addpropertyInfo() {
		$.ajax({
			type : "POST",
			url : "/propertyInfo/addInitpropertyInfo",
			data : "",
			contentType : "application/x-www-form-urlencoded; charset=utf-8",
			success : function(result) {
			}
		});
	}
	$(function() {
		$("#updatewuye").hide();
	});

	var setting = {
		treeId : "zitTree",
		edit : {
			drag : {
				isCopy : false,
				isMove : true,
				prev : false, //前面
			//inner: dropInner,
			//next: dropNext //T 平级
			},
			enable : true,
			showRemoveBtn : false,
			showRenameBtn : false
		},
		data : {
			simpleData : {
				enable : true,
				idKey : "id",
				pIdKey : "pid",
				rootPId : 0
			}
		},
		callback : {
			beforeClick : zTreeOnCheck,
			beforeDrop : beforeDrop,
			beforeDrag : beforeDrag,//节点被拖拽之前的回调，根据返回值确定是否允许开启拖拽操作
			onDrop : onDrop
		}
	};
	//是否开启拖拽功能 返回:[T/F]
	function beforeDrag(treeId, treeNodes) {
		return false;
	};

	var dragId;
	function beforeDrag(event, treeId, treeNodes) {
		//最高级不能拖动
		/* if (treeId[0].pid == 0) {
			swal("最高级物业不能拖拽哦 亲!");
			return false;
		} */

		return true;
	}
	//拖拽
	function onDrop(event, treeId, treeNodes, targetNode, moveType) {
		var id,Pid,sqlWhere="";
		if (targetNode == null) {
			Pid = 0
			id = treeNodes[0].id;
			sqlWhere = "&name="+treeNodes[0].name;
		}else{
			id = treeNodes[0].id;//获得被拖拽的节点id
			Pid = targetNode.id;//获得目标id
		}
		$.ajax({
			type : "post",
			url : "/propertyInfo/updatepropertyInfojiegou",
			data : "id=" + id + "&Pid=" + Pid + "&type=" + moveType+sqlWhere,
			contentType : "application/x-www-form-urlencoded; charset=utf-8",
			success : function(result) {
				if (result.result != 0) {
					swal("修改成功！");
				} else {
					swal("修改失败！");
				}
			}
		});
	}

	function zTreeOnCheck(treeId, treeNode, clickFlag) {
		if ($('#tab').attr('code') ==  1) {
			$('#tab').hide();
			$('#tab').attr('code','');
		}
			addpropertyInfoInit(treeNode);
			updatepropertyInfoInit(treeNode);
			$("#sid").val(treeNode.sid);
			$("#win").hide();
			$("#upn_id").val(treeNode.id);
			$("#sid").val(treeNode.sid);
			chakanwuye();

	};


	function beforeDrop(treeId, treeNodes, targetNode, moveType) {
		return targetNode ? targetNode.drop !== false : true;
	}

	/****************添加物业*********************/
	function addpropertyInfo() {
//		if ($.trim($("#upn_id").val()) == "") {
//			swal("请先选择一个物业哦 亲!");
//			return false;
//		}
// 		if ($.trim($("#addtype").val()) == "-1") {
// 			swal("请选择添加类型哦 亲!");
// 			return false;
// 		}
		if ($('#propertyname').val() == '') {
            swal("请输入小区名称 亲!");
            return false;
        }
		if ($("#insertQuyu").val() == "-1"){
			swal("请选择所属区县哦 亲!");
			return false;
		}
		if ($("#insertStreet").val() == ""){
			swal("请选择所属街道 亲!");
			return false;
		}
		if ($('#building').val() == '启用') {
			if ($('#buildDong').val() == '') {
				swal("请填写楼栋数 亲!");
				return false;
			}
		}
		if ($('#units').val() == '启用') {
			if ($('#unitsText').val() == '') {
				swal("请填写单元号 亲!");
				return false;
			}
		}
		if ($("#allcompanyziji").val() == "-1") {
			swal("请选择所属部门哦 亲!");
			return false;
		}
		if ($("#addPropertyInfo_address").val() == ""
				|| $("#addPropertyInfo_address").val() == null){
			swal("请填写小区通讯地址哦 亲!");
			return false;
		}
		if ($("#addPropertyInfo_coordinate").val() == "" 
				|| $("#addPropertyInfo_coordinate").val() == null){
			swal("请定位物业坐标哦 亲!");
			return false;
		}
		if (isNaN($('#buildDong').val())) {
			swal("楼栋数请填写数字 亲!");
			return false;
		}
		if (isNaN($('#unitsText').val())) {
			swal("单元数请填写数字 亲!");
			return false;
		}
		
		if ($("#propertyname").val() == "" || $("#propertyname").val() == null) {
			swal("请把带星号的信息填写完整哦  亲!");
			if ($("#propertyname").val() == ""
					|| $("#propertyname").val() == null) {
				$("#propertyname").focus();
			} else {
				$("#addpropertyInfo_hao").focus();
			}
			return false;
		}
		var upn_id = $("#upn_id").val();
		$.ajax({
			type : "POST",
			url : "/propertyInfo/addpropertyIn",
			data : "upn_id=" + upn_id
					+ "&upn_name=" + $("#propertyname").val()
					+ "&propertyInfo_quyu=" + $("#insertQuyu").val()
					+ "&propertyInfo_street=" + $("#insertStreet").val()
					+ "&buildDong=" + $('#buildDong').val()
					+ "&unitsText=" + $('#unitsText').val()
					+ "&ucc_short=" + $("#allcompanyziji").val()
					+ "&propertyInfo_address=" + $("#addPropertyInfo_address").val()
					+ "&propertyInfo_coordinate=" + $("#addPropertyInfo_coordinate").val(),
			contentType : "application/x-www-form-urlencoded; charset=utf-8",
			success : function(result) {
				if (result.addresult) {
					if (result.addresult != 0) {
						swal("添加成功!", "添加物业号!", "success");
						selProperName();
						$('#insertQuyu').val('');
						$('#insertStreet').val('');
						$('#building').val('');
						$('#units').val('');
						$('#allcompanyziji').val('');
						$('#addPropertyInfo_address').val('');
						$('#addPropertyInfo_coordinate').val('');
					} else {
						swal("添加失败,请重试!");
					}
				} else {
					swal(result.error);
				}
			}
		});

	}
	
	/****************修改物业*********************/
	function updatepropertyInfo() {
		if ($("#updatepropertyInfo_id").val() == ""
				|| $("#updatepropertyInfo_id").val() == null) {
			swal("请选择一个物业哦  亲!");
			return false;
		}
		if ($("#updateQuyu").val() == "-1"){
			swal("请选择所属区域哦 亲!");
			return false;
		}
		if ($("#updateStr").val() == ""){
			swal("请选择所属街道 亲!");
			return false;
		}
		if ($('#updateBuilding').val() == '启用') {
			if ($('#updateBuildDong').val() == '') {
				swal("请填写楼栋数 亲!");
				return false;
			}
		}
		if ($('#updateUnits').val() == '启用') {
			if ($('#updateUnitsText').val() == '') {
				swal("请填写单元号 亲!");
				return false;
			}
		}
		if ($("#allcompanyxiugai").val() == "-1"
				|| $("#allcompanyxiugai").val() == null) {
			swal("请选择物业所属部门哦  亲!");
			return false;
		}
		if ($("#updPropertyInfo_address").val() == "" 
				|| $("#updPropertyInfo_address").val() == null){
			swal("请填写小区通讯地址哦 亲!");
			return false;
		}
		if ($("#updPropertyInfo_coordinate").val() == ""
			|| $("#updPropertyInfo_coordinate").val() == null){
			swal("请定位物业坐标哦 亲!");
			return false;
		}
		if (isNaN($('#buildDong').val())) {
			swal("楼栋数请填写数字 亲!");
			return false;
		}
		if (isNaN($('#unitsText').val())) {
			swal("单元数请填写数字 亲!");
			return false;
		}
		
		var upn_code = "";
		if(!$("#parentCode").is(":hidden")){
			upn_code = $("#parentCode").find("input").val()+"-"+$("#updatepropertyInfo_hao").val();
		}else{
			upn_code = $("#updatepropertyInfo_hao").val();
		}
		$.ajax({
			type : "POST",
			url : "/propertyInfo/updatepropertyInfoName",
			data : "upn_id=" + $("#updatepropertyInfo_id").val() 
					+ "&upn_name=" + $("#updatepropertyInfo_name").val()
// 					+ "&upn_code=" + upn_code
					+ "&propertyInfo_quyu=" + $("#updateQuyu").val()
					+ "&propertyInfo_street=" + $("#updateStr").val()
					+ "&buildDong=" + $('#updateBuildDong').val()
					+ "&unitsText=" + $('#updateUnitsText').val()
					+ "&ucc_short=" + $("#allcompanyxiugai").val()
					+ "&propertyInfo_address=" + $("#updPropertyInfo_address").val()
					+ "&propertyInfo_coordinate=" + $("#updPropertyInfo_coordinate").val(),
			contentType : "application/x-www-form-urlencoded; charset=utf-8",
			success : function(result) {
				if (result.addresult) {
					if (result.addresult != 0) {
						swal("修改成功!");
					} else {
						swal("修改失败!");
					}
				}
			}
		});

	}
	
	/**********地图坐标*********/
	function mapsszuobiao(){
		var isHidden = $("#addtype").is(":hidden");
		var hi_address = isHidden ? $("#updPropertyInfo_address").val() : $("#addPropertyInfo_address").val();//  "九龙坡杨家坪石杨路万科西九";
		var xyz = isHidden ?$("#updPropertyInfo_coordinate").val() : $("#addPropertyInfo_coordinate").val(); //"106.514286,29.5209";
		$.jBox("iframe:/propertyInfo/map?hi_address="+hi_address+"&xyz="+xyz , {
		    title: "管家婆管理系统",
		    width: 1200,
		    height: 550,
		    buttons: { '关闭': true }
		});
	}
	//是否启用栋
	$(document).on('click','#building',function(){
		if ($('#building').val() == '启用') {
			$('#buildDong').show();
			$('#dong').show();
		} else {
			$('#buildDong').hide();
			$('#dong').hide();
			$('#buildDong').val('');
		}
	})
	//是否启用单元
	$(document).on('click','#units',function(){
		if ($('#units').val() == '启用') {
			$('#unitsText').show();
			$('#unit').show();
		} else {
			$('#unitsText').hide();
			$('#unit').hide();
			$('#unitsText').val('');
		}
	})
	//区镇联动
	function jumpSelect () {
		var street=$('#insertStreet');
		var quyucode=$('#insertQuyu').find("option:selected").attr('code');
		if (quyucode == '') {
			street.empty();
			street.append('<option>'+'请选择街道'+'</option>');
			return false;
		}
		street.empty();
		street.append('<option>'+'请选择街道'+'</option>');
		$.ajax({
			type : "post",
			url : "/propertyInfo/selectCirtStreet",
			data : "code=" + quyucode,
			contentType : "application/x-www-form-urlencoded; charset=utf-8",
			success : function(result) {
				var html='';
				if (result != null) {
					for (var i=0;i<result.district.length;i++) {
						street.append('<option value='+result.district[i].name+' code='+result.district[i].code+'>'+result.district[i].name+'</option>');
					}
				}
			}
		});
	}
	function updateSelect() {
		var street=$('#updateStreet');
		var quyucode=$('#updateQuyu').find("option:selected").attr('code');
		if (quyucode =='') {
			street.empty();
			street.append('<option>'+'请选择街道'+'</option>');
			return false;
		}
		street.empty();
		street.append('<option>'+'请选择街道'+'</option>');
		$.ajax({
			type : "post",
			url : "/propertyInfo/selectCirtStreet",
			data : "code=" + quyucode,
			contentType : "application/x-www-form-urlencoded; charset=utf-8",
			success : function(result) {
				var html='';
				if (result != null) {
					for (var i=0;i<result.district.length;i++) {
						street.append('<option value='+result.district[i].name+' code='+result.district[i].code+'>'+result.district[i].name+'</option>');
					}
				}
			}
		});
	}
	//编辑物业
	function addwuye () {
		$("#shuidianqi").hide();
		$("#wuguanjiaotong").hide();
		$("#jibenpeizi").hide();
		$("#caipan").hide();
		$("#imgs").hide();
		$("#chakan").hide();
		$('#win').hide();
		if ($('#tab').attr('code') == '') {
			$('#tab').show();
			$('#tab').attr('code',1);
			$('#buildDong').hide();
			$('#buildDong').val('');
			$('#dong').hide();
			$('#unitsText').hide();
			$('#unitsText').val('');
			$('#unit').hide();
		} else {
			$('#tab').hide();
			$('#tab').attr('code','');
		}
	}
	//关闭继承框
	function hide(){  
	    var winNode = $("#win");  
	    winNode.hide();  
	} 
	
	//水电气
	$(document).on('click','#img1',function () {
		$('#shuidianqi').show();
		$('#wuguanjiaotong').hide();
		$('#jibenpeizi').hide();
		$('#caipan').hide();
		$("#img1").css("background-image","url(/resources/image/sdql270120.png)");
		$("#img2").css("background-image","url(/resources/image/wgjth270120.png)");
		$("#img3").css("background-image","url(/resources/image/jbpzh270120.png)");
		$("#img4").css("background-image","url(/resources/image/cph270120.png)");
	})
	//物管交通
	$(document).on('click','#img2',function () {
		$('#shuidianqi').hide();
		$('#jibenpeizi').hide();
		$('#caipan').hide();
		$('#wuguanjiaotong').show();
		$("#img2").css("background-image","url(/resources/image/wgjtl270120.png)");
		$("#img1").css("background-image","url(/resources/image/sdqh270120.png)");
		$("#img3").css("background-image","url(/resources/image/jbpzh270120.png)");
		$("#img4").css("background-image","url(/resources/image/cph270120.png)");
		$.ajax({
		    type: "POST",
		    url: "/propertyInfo/propertySelect",
		    data:"upn_id="+$("#upn_id").val(),
		    contentType: "application/x-www-form-urlencoded; charset=utf-8",
		    success: function(result) {
		    	if(result.message=="error"){
		    		$("#state").val(2);
		    		//swal("提交成功!");
		    	}else{
		    		$("#wuguanname").val(result.queryPropertyInfo.propertyInfo_Wuguan);
		    		$("#wuguanphone").val(result.queryPropertyInfo.propertyInfo_Tel);
		    		$("#wuguanprice").val(result.queryPropertyInfo.propertyInfo_Cost);
		    		$("#wuyedizhi").val(result.queryPropertyInfo.propertyInfo_address);
		    		$("#wuguancompany").val(result.queryPropertyInfo.propertyInfo_company);
		    		$("#wuguandizhi").val(result.queryPropertyInfo.propertyInfo_waddress);
		    		$("#quyu").val(result.queryPropertyInfo.propertyInfo_quyu);
		    		$("#guidao").val(result.queryPropertyInfo.propertyInfo_gui);
		    		$("#shangquan").val(result.queryPropertyInfo.propertyInfo_quan);
		    		$("#biaozhu").val(result.queryPropertyInfo.propertyInfo_coordinate);
		    		$("#gongjiao").val(result.queryPropertyInfo.propertyInfo_transit);
		    		$("#propertyInfoid").val(result.queryPropertyInfo.propertyInfo_Id);
		    		$("#state").val(2);
		    	}
		    }
		  });
		$("#shuidianqi").hide();
		$("#wuguanjiaotong").show();
	})
	// 基本配置
	$(document).on('click','#img3',function () {
		$('#shuidianqi').hide();
		$('#caipan').hide();
		$('#wuguanjiaotong').hide();
		$('#jibenpeizi').show();
		$("#img3").css("background-image","url(/resources/image/jbpzl270120.png)");
		$("#img1").css("background-image","url(/resources/image/sdqh270120.png)");
		$("#img2").css("background-image","url(/resources/image/wgjth270120.png)");
		$("#img4").css("background-image","url(/resources/image/cph270120.png)");
		$.ajax({
		    type: "POST",
		    url: "/propertyInfo/propertySelect",
		    data:"upn_id="+$("#upn_id").val(),
		    contentType: "application/x-www-form-urlencoded; charset=utf-8",
		    success: function(result) {
		    	if(result.message=="error"){
		    		//swal("提交成功!");
		    	}else{
		    		$("#zoulouceng").val(result.queryPropertyInfo.propertyInfo_TotalAmount);
		    		$("#kuandai").val(result.queryPropertyInfo.propertyInfo_broadband);
		    		$("#dianti").val(result.queryPropertyInfo.propertyInfo_Life);
		    		$("#cheku").val(result.queryPropertyInfo.propertyInfo_CarPark);
		    		$("#gonggongsheshi").val(result.queryPropertyInfo.propertyInfo_Public);
	    			$("#xiaoquhuanjin option[value='"+result.queryPropertyInfo.propertyInfo_you+"']").attr("selected","selected");
	    			$("#propertyInfoid").val(result.queryPropertyInfo.propertyInfo_Id);
		    		$("#state").val(3);
		    	}
		    }
		  });
	})
	// 踩盘
	$(document).on('click','#img4',function () {
		$('#shuidianqi').hide();
		$('#wuguanjiaotong').hide();
		$('#jibenpeizi').hide();
		$('#caipan').show();
		$("#img4").css("background-image","url(/resources/image/cpl270120.png)");
		$("#img1").css("background-image","url(/resources/image/sdqh270120.png)");
		$("#img2").css("background-image","url(/resources/image/wgjth270120.png)");
		$("#img3").css("background-image","url(/resources/image/jbpzh270120.png)");
		$.ajax({
		    type: "POST",
		    url: "/propertyInfo/propertySelect",
		    data:"upn_id="+$("#upn_id").val(),
		    contentType: "application/x-www-form-urlencoded; charset=utf-8",
		    success: function(result) {
		    	if(result.message=="error"){
		    		$("#state").val(3);
		    	}else{
		    		$("#kaifashang").val(result.queryPropertyInfo.propertyInfo_developer);
		    		$("#guanlifangshi").val(result.queryPropertyInfo.propertyInfo_ManaStyle);
		    		$("#lvhualv").val(result.queryPropertyInfo.propertyInfo_GreenRate);
		    		$("#rongjilv").val(result.queryPropertyInfo.propertyInfo_PlotRate);
		    		$("#zongtaoshu").val(result.queryPropertyInfo.propertyInfo_TotalAmount);
		    		$("#jianzhumianji").val(result.queryPropertyInfo.propertyInfo_BuildArea);
		    		$("#kaipanjia").val(result.queryPropertyInfo.propertyInfo_OpenPrice);
		    		$("#zhandimianji").val(result.queryPropertyInfo.propertyInfo_TotalArea);
		    		$("#kaipandate").val(result.queryPropertyInfo.propertyInfoStrTime);
		    		$("#wuyexingtai option[value='"+result.queryPropertyInfo.propertyInfo_State+"']").attr("selected","selected");
		    		$("#propertyInfoid").val(result.queryPropertyInfo.propertyInfo_Id);
		    		$("#state").val(4);
		    	}
		    	
		    	var htmlCheck = "";
		    	$.each(result.propertyInfoSubwanys, function(index, item) {
		    		htmlCheck += "<label class='common-borderbox common-borderbox-checked'>"+
									""+ item.subway_Name +""+
									"<input type='checkbox' name='hi_function' value='"+ item.subway_Name +"' checked='checked'>"+
									"</label>";
		    	});
		    	if(htmlCheck != ""){
		    		htmlCheck+="<em>*</em>"+
		    		"<button class='common-borderbox-add' name='hi_function' onclick='addLabel(this)'>"+
					"<i class='icon-plus'></i>"+
					"</button>";
		    		$("#perimeter").html(htmlCheck);
		    	}
		    	
		    }
		  });
	})