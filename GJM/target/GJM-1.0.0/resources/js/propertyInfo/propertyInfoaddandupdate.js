			/****************初始添加*********************/
			function addpropertyInfoInit(treeNode){
						$("#addwuyehao").show();
						$("#addtype option[value='-1']").attr("selected","selected");
						$("#upn_id").val(treeNode.id);
						$("#upn_pid").val(treeNode.pid);
						$('#propertyname').val(treeNode.name);
					}

			
				/****************是否添加同级*********************/
				function checkaddtype(){
					$("#addwuyehao").show();
					if($("#addtype").val()=="添加同级"){
						if($("#upn_pid").val()==0){
							$("#addwuyehao").hide();
						}
						$("#addpropertyInfo_hao").val("");
						$("#addpropertyInfoname").val("");
						$("#allcompanyziji option[value='-1']").attr("selected","selected");
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
					$("#updatepropertyInfo_name").val(treeNode.name);
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
					updatecompany(treeNode);
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
		function updatecompany(treeNode){
			if (treeNode) {
				if (treeNode.wuyehao == "null") {
                    $('#unitst').hide();
                    $('#buildd').hide();
                    $('#updateBuildDong').val('');
                    $('#updateUnitsText').val('');
                }
				var names=treeNode.name.substring(treeNode.name.length-1,treeNode.name.length);
				if (names == '栋') {
					$('#buildd').show();
					$('#updateBuilding').val("启用");
					$('#updateBuildDong').show();
					$('#updateDong').show();
					$('#updateBuildDong').val(treeNode.name.substring(0,treeNode.name.length-1));
					$('#unitst').hide();
					$('#updateUnitsText').val('');
				} else {
					$('#updateBuilding').val("");
					$('#updateBuildDong').hide();
					$('#updateBuildDong').val('');
					$('#updateDong').hide();
				}
				if (names == '元') {
					var arr=[];
						arr=treeNode.wuyehao.split('-');
					if (arr.length == 1) {
						$('#updateBuilding').val("");
						$('#updateBuildDong').hide();
						$('#updateBuildDong').val('');
						$('#updateDong').hide();
					} else {
						$('#updateBuilding').val("启用");
						$('#updateBuildDong').show();
						$('#updateDong').show();
						$('#updateBuildDong').val(arr[0]);
					}
					
					$('#unitst').show();
					$('#updateUnits').val("启用");
					$('#updateUnitsText').show();
					$('#updateUnit').show();
					$('#updateUnitsText').val(treeNode.name.substring(0,treeNode.name.length-2));
				} else {
					$('#updateUnits').val("");
					$('#updateUnitsText').hide();
					$('#updateUnit').hide();
					$('#updateUnitsText').val();
				}
			}
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
			    		$("#updateQuyu").find("option:selected").text(result.companydeperment.propertyInfo_quyu);
			    		$("#updatqu").val(result.companydeperment.propertyInfo_quyu);
			    		$("#updPropertyInfo_address").val(result.companydeperment.propertyInfo_address);
			    		$("#updPropertyInfo_coordinate").val(result.companydeperment.propertyInfo_coordinate);
			    		$("#updateStreet").find("option:selected").text(result.companydeperment.propertyInfo_street);
			    		$('#updateStr').val(result.companydeperment.propertyInfo_street);
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