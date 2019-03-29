//保存模板参数
function saveConfigParam(){
	if ($.trim($("#fieldNameCn").val()) == "") {
		swal("请输入中文名!");
		return false;
	}
	if ($.trim($("#fieldNameEn").val()) == "") {
		swal("请输入英文名!");
		return false;
	}
	
	var elementType = $("#elementType option:selected");
	$("#elementType_h").val(elementType.val());
	var isNull = $("#isNull option:selected");
	$("#isNull_h").val(isNull.val());
	var isUtf8 = $("#isUtf8 option:selected");
	$("#isUtf8_h").val(isUtf8.val());
	
	var bc_id = $("#bc_id").val();
	var bc_pid = $("#bc_pid").val();
	var addType = $("#addtype option:selected").val();
	if(addType == "1"){
		if(null == bc_pid || "" == bc_pid || bc_pid == undefined){
			swal("请选择节点!");
			return false;
		}
		$("#bc_id").val("");
		$("#bc_pid").val(bc_pid);
	}
	if(addType == "2"){
		if(null == bc_id || "" == bc_id || bc_id == undefined){
			swal("请选择节点!");
			return false;
		}
		$("#bc_id").val("");
		$("#bc_pid").val(bc_id);
	}
	if(addType == "3"){
		if(null == bc_id || "" == bc_id || bc_id == undefined ||
				null == bc_pid || "" == bc_pid || bc_pid == undefined){
			swal("请选择节点!");
			return false;
		}
	}
	
	document.getElementById("saveForm").submit();
}



/****************初始添加*********************/
function addBookConfigTreeInit(treeNode){
	$("#bc_id").val(treeNode.id);
	$("#bc_pid").val(treeNode.pid);
}

			
/****************是否添加同级*********************/
function checkAddType(){
	var addType = $("#addtype option:selected").val();
	var bc_id = $("#bc_id").val();
	var bc_pid = $("#bc_pid").val();
	if(addType == "3"){
		if(null == bc_id || "" == bc_id || bc_id == undefined ||
				null == bc_pid || "" == bc_pid || bc_pid == undefined){
			swal("请选择节点!");
			return false;
		}
		$.ajax({
		    type: "POST",
		    url: "/book/queryHouseBookConfigById",
		    data:"bc_id="+bc_id,
		    contentType: "application/x-www-form-urlencoded; charset=utf-8",
		    success: function(result) {
		    	var data = result.houseBookConfig;
		    	if(data!=null&&data!=""){
//		    		$("#allcompanyxiugai").find("option:selected").text(result.companydeperment.propertyInfo_department);
//		    		$("#suoshucompany").val(result.companydeperment.propertyInfo_department);
		    		$("#bc_id").val(data.bc_id);
		    		$("#bc_pid").val(data.bc_pid);
		    		$("#fieldNameCn").val(data.fieldNameCn);
		    		$("#fieldNameEn").val(data.fieldNameEn);
		    		$("#elementType_h").val(data.elementType);
//		    		$("#elementType").find("option:selected").val(data.elementType);
		    		$("#defaultValue").val(data.defaultValue);
		    		$("#fieldValue").val(data.fieldValue);
		    		$("#placeholder").val(data.placeholder);
		    		$("#isNull_h").val(data.isNull);
//		    		$("#isNull").find("option:selected").val(data.isNull);
		    		$("#isUtf8_h").val(data.isUtf8);
//		    		$("#isUtf8").find("option:selected").val(data.isUtf8);
		    		$("#regRule").val(data.regRule);
		    	}
		    }
		});
	}
}


/****************修改物业初始化*********************/
function updatepropertyInfoInit(treeNode){
	if($.trim($("#upn_id").val())==""){
		swal("请先选择一个物业哦 亲!");
		return false;
	}
	$("#updatewuyehao").show();
	$("#updatepropertyInfo_id").val(treeNode.id);
	$("#updatepropertyInfo_Name").val(treeNode.name);
//					var propertyCodes = treeNode.wuyehao.split("-");
//					var codeStr = "";
//					for (var i = 0; i < propertyCodes.length; i++) {
//						if(i != (propertyCodes.length-1)){
//							codeStr+=propertyCodes[i]+"-";
//						}
//					}
//					codeStr = codeStr.substring(0,codeStr.length-1);
	if(treeNode.proCode== null || treeNode.proCode== "null" || treeNode.proCode == ""){
		$("#parentCode").hide();
	}else{
		$("#parentCode").show();
		$("#parentCode #parentNum").val(treeNode.proCode);
	}
	if($("#upn_pid").val()==0){
		$("#updatewuyehao").hide();
		$("#updatepropertyInfo_hao").val();
	}else{
		var lastIndex = treeNode.wuyehao.lastIndexOf("-");
		if(lastIndex==-1){
			$("#updatepropertyInfo_hao").val(treeNode.wuyehao);
		}else{
			$("#updatepropertyInfo_hao").val(treeNode.wuyehao.substr(lastIndex+1,treeNode.wuyehao.length));
		}
	}
	updatecompany();
}
				
function checknull3(){
	$("#updatehao").hide();
	$("#updatename").hide();
	
}
function checknull2(){
	$("#tongjihao").hide();
	$("#tongjiname").hide();
	
}
function checknull1(){
	$("#zijihao").hide();
	$("#zijiname").hide();
	
}
//验证模糊查询物业
function aaa(){
	return true;
}
//ajax查找部门
function updatecompany(){
	if($("#upn_id").val()==""){
		return false;	
	}
	$.ajax({
	    type: "POST",
	    url: "/propertyInfo/updatecompany",
	    data:"upn_id="+$("#upn_id").val(),
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    success: function(result) {
	    	if(result.companydeperment!=null&&result.companydeperment!=""){
	    		$("#allcompanyxiugai").find("option:selected").text(result.companydeperment.propertyInfo_department);
	    		$("#suoshucompany").val(result.companydeperment.propertyInfo_department);
	    	}
	    }
	});
}
		
function selProperName(){
	var v = $("#sousuowuyename").val();
	
	$.ajax({
	    type: "POST",
	    url: "/propertyInfo/sousuowuyemain",
	    data:"propertyInfo_Name="+v,
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    success: function(result) {
	    	var zNodes = result.pInfoNames;
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
	    	$.fn.zTree.init($("#treeDemo"), setting, eval('(' + zNodes + ')'));
	    }
	});
}