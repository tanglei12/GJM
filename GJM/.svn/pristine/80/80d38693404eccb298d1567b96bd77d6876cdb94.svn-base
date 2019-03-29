function addpropertyInfoInit(treeNode){
	$("#addDrId").val(treeNode.id);
	$("#addDrPid").val(treeNode.pid);
	$("#updDrId").val(treeNode.id);
	$("#updDrPid").val(treeNode.pid);
	
	if(!treeNode.isParent){
		$("#propertyIdDl").hide();
	} else {
		$("#propertyIdDl").show();
	}
};

function updatepropertyInfoInit(treeNode){
	$("#updPropertyId").val(treeNode.propertyId);
	$("#updDictionary_name").val(treeNode.name);
	$("#updDictionary_value").val(treeNode.dictionary_value);
	var status = treeNode.dictionary_status;
	if("1" == status){
		$("#eftStatus").attr("checked", "checked")
	}
	if("0" == status){
		$("#expStatus").attr("checked", "checked")
	}
	$("#updPropertyId").val(treeNode.propertyId);
	$("#updRemark").val(treeNode.remark);
	
//	if(!treeNode.isParent){
//		$("#updProperIdDl").hide();
//	} else {
//		$("#updProperIdDl").show();
//	}
};

function checkaddtype(obj){
	var addType = obj.value;
	var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
	var nodes = treeObj.getSelectedNodes();
	if(nodes.length > 0){
		var node = nodes[0];
//		if((node.isParent && addType != "2")){
//			$("#propertyIdDl").show();
//		} else {
//			$("#propertyIdDl").hide();
//		}
	}
};

function checkIsParent(){
	var isParent_add = $('input:radio[name="isParent_add"]:checked').val();
	var isParent_upd = $('input:radio[name="isParent_upd"]:checked').val();
	if(isParent_add == "0"){
		$("#propertyIdDl").hide();
	} else {
		$("#propertyIdDl").show();
	}
	
	if(isParent_upd == "0"){
		$("#updProperIdDl").hide();
	} else {
		$("#updProperIdDl").show();
	}
}

function isSelect(){
	var isParent_add = $('input:radio[name="isParent_add"]:checked').val();
	var isParent_upd = $('input:radio[name="isParent_upd"]:checked').val();
	var isShow = $("#addTypeDl").is(":hidden");
	if(isShow){
		if(isParent_upd == undefined){
			swal("请选择是否为父级!");
		}
	} else {
		if(isParent_add == undefined){
			swal("请选择是否为父级!");
		}
	}
}

function selProperName(){
	var v = $("#searchDicName").val();
	
	$.ajax({
	    type: "POST",
	    url: "/dictionary/searchDictionaryInfo",
	    data : {
	    	dictionaryName : v
	    },
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
};