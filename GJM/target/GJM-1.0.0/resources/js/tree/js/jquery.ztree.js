var setting = {
		view : {
			//鼠标移上去的事件
			addHoverDom : addHoverDom,
			//鼠标放下的事件
			removeHoverDom : removeHoverDom,
			//是否同时选中多个节点
			selectedMulti : true,
			//是否显示节点图标
			showIcon : true,

		},
		check : {
			enable : true,
			chkStyle : "radio",
			radioType : "level"
		},
		edit : {
			//设置 zTree 是否处于编辑状态
			enable : true,
			editNameSelectAll : true,
			/*设置是否显示删除按钮。[setting.edit.enable = true 时生效]
				当点击某节点的删除按钮时：
				1、首先触发 setting.callback.beforeRemove 回调函数，用户可判定是否进行删除操作。
				2、如果未设置 beforeRemove 或 beforeRemove 返回 true，则删除节点并触发 setting.callback.onRemove 回调函数。
				默认值：true
			 */
			showRemoveBtn : showRemoveBtn,
			/*
			设置是否显示编辑名称按钮。[setting.edit.enable = true 时生效]
			当点击某节点的编辑名称按钮时：
			1、进入节点编辑名称状态。
			2、编辑名称完毕（Input 失去焦点 或 按下 Enter 键），会触发 setting.callback.beforeRename 回调函数，用户可根据自己的规则判定是否允许修改名称。
			3、如果 beforeRename 返回 false，则继续保持编辑名称状态，直到名称符合规则位置 （按下 ESC 键可取消编辑名称状态，恢复原名称）。
			4、如果未设置 beforeRename 或 beforeRename 返回 true，则结束节点编辑名称状态，更新节点名称，并触发 setting.callback.onRename 回调函数。
			默认值：true
			 */
			showRenameBtn : showRenameBtn
		},
		data : {
			simpleData : {
				//是否设置为josn
				enable : true,
				open:true
			}
		},
		callback : {
			beforeDrag : beforeDrag,
			/*
			用于捕获节点编辑按钮的 click 事件，并且根据返回值确定是否允许进入名称编辑状态
			此事件回调函数最主要是用于捕获编辑按钮的点击事件，然后触发自定义的编辑界面操作。
			默认值：null
			 */
			beforeEditName : beforeEditName,
			beforeRemove : beforeRemove,
			/*
			用于捕获节点编辑名称结束（Input 失去焦点 或 按下 Enter 键）之后，更新节点名称数据之前的事件回调函数，并且根据返回值确定是否允许更改名称的操作
			节点进入编辑名称状态后，按 ESC 键可以放弃当前修改，恢复原名称，取消编辑名称状态
			默认值：null
			 */
			beforeRename : beforeRename,
			//点击之后的回调函数
			onCheck:checknodes,
			/*
			用于捕获删除节点之后的事件回调函数。
			如果用户设置了 beforeRemove 回调函数，并返回 false，将无法触发 onRemove 事件回调函数。
			默认值：null
			 */
			onRemove : onRemove,
			/*
			用于捕获节点编辑名称结束之后的事件回调函数。
			1、节点进入编辑名称状态，并且修改节点名称后触发此回调函数。如果用户设置了 beforeRename 回调函数，并返回 false，将无法触发 onRename 事件回调函数。
			2、如果通过直接修改 treeNode 的数据，并且利用 updateNode 方法更新，是不会触发此回调函数的。
			默认值：null
			 */
			onRename : onRename
		}
	};
function checknodes(treeId,treeNode){
	var zTree = $.fn.zTree.getZTreeObj(treeNode);
	alert(treeNode.id);

}	

	var zNodes = ${pInfoNames};
	var log, className = "dark";
	function beforeDrag(treeId, treeNodes) {
		return false;
	}
		/******************增删改开始*********************/
	function beforeEditName(treeId, treeNode) {
		className = (className === "dark" ? "" : "dark");
		showLog("[ " + getTime() + " beforeEditName ]&nbsp;&nbsp;&nbsp;&nbsp; "
				+ treeNode.name);
		var zTree = $.fn.zTree.getZTreeObj("treeDemo");
		zTree.selectNode(treeNode);
		return confirm("进入节点 -- " + treeNode.name + " 的编辑状态吗？");
	}
	function beforeRemove(treeId, treeNode) {
		className = (className === "dark" ? "" : "dark");
		showLog("[ " + getTime() + " beforeRemove ]&nbsp;&nbsp;&nbsp;&nbsp; "
				+ treeNode.name);
		var zTree = $.fn.zTree.getZTreeObj("treeDemo");
		zTree.selectNode(treeNode);
		if(treeNode.pId==null){
			alert("最高级编码 不能删除！");
			return false;
		}
		return confirm("确认删除 节点 -- " + treeNode.name + " 吗？");
	}
	function onRemove(e, treeId, treeNode) {
		showLog("[ " + getTime() + " onRemove ]&nbsp;&nbsp;&nbsp;&nbsp; "
				+ treeNode.name);
	}
	function beforeRename(treeId, treeNode, newName) {
		className = (className === "dark" ? "" : "dark");
		showLog("[ " + getTime() + " beforeRename ]&nbsp;&nbsp;&nbsp;&nbsp; "
				+ treeNode.name);
		if (newName.length == 0) {
			alert("节点名称不能为空.");
			var zTree = $.fn.zTree.getZTreeObj("treeDemo");
			setTimeout(function() {
				zTree.editName(treeNode)
			}, 10);
			return false;
		}
		return true;
	}
	/*********************增删改结束*********************/
	function onRename(e, treeId, treeNode) {
		showLog("[ " + getTime() + " onRename ]&nbsp;&nbsp;&nbsp;&nbsp; "
				+ treeNode.name);
	}
	
	
	//是否显示删除按钮
	function showRemoveBtn(treeId, treeNode) {
		return treeNode.pId != 0;
	}
	//是否显示添加按钮
	function showRenameBtn(treeId, treeNode) {
		return treeNode.id != 0;
	}
	function showLog(str) {
		if (!log)
			log = $("#log");
		log.append("<li class='"+className+"'>" + str + "</li>");
		if (log.children("li").length > 8) {
			log.get(0).removeChild(log.children("li")[0]);
		}
	}
	function getTime() {
		var now = new Date(), h = now.getHours(), m = now.getMinutes(), s = now
				.getSeconds(), ms = now.getMilliseconds();
		return (h + ":" + m + ":" + s + " " + ms);
	}

	var newCount = 1;
	//当鼠标移动上去触发
	function addHoverDom(treeId, treeNode) {
		var sObj = $("#" + treeNode.tId + "_span");
		$("#ztreepropertyInfo_pid").val(treeNode.pId==null?"最高级":treeNode.pId);
		$("#ztreepropertyInfo_id").val(treeNode.id);
		$("#ztreepropertyInfo_Name").val(treeNode.name);
		var p=treeNode;
		var str=p.id;
		while(p.pId!=null){
			p=p.getParentNode();
			str=p.id+">>"+str;
		}
		
		$("#ztreepropertyInfo_hao").val(str);
		//alert(treeNode.id);当前树id
		if (treeNode.editNameFlag || $("#addBtn_" + treeNode.id).length > 0)
			return;
		var addStr = "<span class='button add' id='addBtn_" + treeNode.id
				+ "' title='add node' onfocus='this.blur();'></span>";
		//alert(addStr);
		sObj.after(addStr);
		var btn = $("#addBtn_" + treeNode.id);
		if (btn){
			btn.bind("click", function() {
				var zTree = $.fn.zTree.getZTreeObj("treeDemo");
				zTree.addNodes(treeNode, {
					id : newCount,
					pId : treeNode.id,
					name : "new node" 
				});
				return false;
			});
		}
	};
	function removeHoverDom(treeId, treeNode) {
		$("#addBtn_" + treeNode.id).unbind().remove();
	};
	function selectAll() {
		var zTree = $.fn.zTree.getZTreeObj("treeDemo");
		zTree.setting.edit.editNameSelectAll = $("#selectAll").attr("checked");
	}

	$(document).ready(function() {
		$.fn.zTree.init($("#treeDemo"), setting, zNodes);
		$("#selectAll").bind("click", selectAll);
	});
	var tree = null;

	$(function() {
		tree = $.fn.zTree.init

		($("#treeDemo"), setting, zNodes);
	});

	function selectIds() {
		var result = "";
		var checkedArr =

		tree.getCheckedNodes(true);
		for (var

		i = 0; i < checkedArr.length; i++) {
			result += (checkedArr

			[i].id + ",");
		}
		alert(result);
	}
/*************************设置单选开始*****************************/
	var code;
	function setCheck() {
		var type = $("#level").attr("checked") ? "level" : "all";
		setting.check.radioType = type;
		showCode('setting.check.radioType = "' + type + '";');
		$.fn.zTree.init($("#treeDemo"), setting, zNodes);
	}
	function showCode(str) {
		if (!code)
			code = $("#code");
		code.empty();
		code.append("<li>" + str + "</li>");
	}

	$(document).ready(function() {
		setCheck();
		$("#level").bind("change", setCheck);
		$("#all").bind("change", setCheck);
	});
	/*************************设置单选结束*****************************/