$(function(){ 
	//ejz();
    $.ajax({
        url: "/company/selectOrganizationTree",
        type: 'get',
        dataType: 'JSON',
        data: {
        },
        async: false,
        success: function (result) {
            $.each(result.company, function (index, item) {
                var companyTrees = item;
                $('#chart-container').orgchart({
                    'data': companyTrees,
                    'nodeTitle': 'ucc_name',
                    'nodeContent': 'title',
                    'nodeId' : 'ucc_id'
                });
            })

        }
    });

    $(".node").click(function () {
        var id = $(this).attr("id");
        shower(id,null);

    })
}); 
//毫秒转换为日期格式
var format = function(time, format){
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

//查询所有一级账号
// function ejz(){
// 	$(".one").children().html("");
// 	$.ajax({
// 	    type: "POST",
// 	    url: "/company/selectOrganization",
// 	    data: "ucc_id="+"1",
// 	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
// 	    dataType: "json",
// 	    async:false,
// 	    success: function(result) {
// 	    	console.log(result.size)
// 	    	//遍历所有公司
// 	    	$.each(result.companyList, function(idx, company) {
// 	    		var gs = "gs";
// 	    		if(company.ucc_name == '' || company.ucc_name == null){
// 	    			var name = company.ucc_name
// 	    		}else{
// 	    			var name = company.ucc_name
// 	    		}
// 	    		if(company.ucc_pid == 1){
// 	    			if(result.size > 1){
// 	    				if(idx == 1){
// 	    					$("#organizationgs"+company.ucc_pid).append("<td align=center valign='top'><table border='0'  cellspacing='0' cellpadding='0' width='100%' height=1><tr><td width='50%'></td><td width='50%' bgcolor='#000000'></td></tr></table><i></i><table cellspacing='1' cellpadding='4'><tr><td class='tdbottom' style='border: 1 solid #000000' nowrap><a id='organizationgs"+company.ucc_id+"' href='javascript:shower("+company.ucc_id+",\"gs\");'>"+name+"</a></td></tr></table></td>");
// 	    				}else if((idx+1) == result.size){
// 	    					$("#organizationgs"+company.ucc_pid).append("<td align=center valign='top'><table border='0'  cellspacing='0' cellpadding='0' width='100%' height=1><tr><td width='50%' bgcolor='#000000'></td><td width='50%'></td></tr></table><i></i><table cellspacing='1' cellpadding='4'><tr><td class='tdbottom' style='border: 1 solid #000000' nowrap><a id='organizationgs"+company.ucc_id+"' href='javascript:shower("+company.ucc_id+",\"gs\");'>"+name+"</a></td></tr></table></td>");
// 	    				}else{
// 	    					$("#organizationgs"+company.ucc_pid).append("<td align=center valign='top'><table border='0'  cellspacing='0' cellpadding='0' width='100%' height=1><tr><td width='50%' bgcolor='#000000'></td><td width='50%' bgcolor='#000000'></td></tr></table><i></i><table cellspacing='1' cellpadding='4'><tr><td class='tdbottom' style='border: 1 solid #000000' nowrap><a id='organizationgs"+company.ucc_id+"' href='javascript:shower("+company.ucc_id+",\"gs\");'>"+name+"</a></td></tr></table></td>");
// 	    				}
// 	    			}else if(result.size == 1){
// 	    				//只有一个下级时添加包裹
// 	    				$("#organizationgs"+company.ucc_pid).append("<td align=center valign='top'><table cellspacing='1' cellpadding='4'><tr><td class='tdbottom' style='border: 1 solid #000000' nowrap><a href='javascript:shower("+company.ucc_id+",\"gs\");' id='organizationgs"+company.ucc_id+"'>"+name+"</a></td></tr></table></td>");
// 	    			}
// 	    		}else{
// 	    			//$("#organizationgs"+company.ucc_pid).parent("td").parent("tr").parent("tbody").parent("table").parent("td").html("");
// 	    			if($(".organizationgs"+company.ucc_pid).html() == null){
// 	    				if(result.size > 1){
// 	    					//多个下级时添加包裹
// 	    					$("#organizationgs"+company.ucc_pid).parent("td").parent("tr").parent("tbody").parent("table").parent("td").append("<i class='organizationgs"+company.ucc_pid+"'></i>");
// 	    					$("#organizationgs"+company.ucc_pid).parent("td").parent("tr").parent("tbody").parent("table").parent("td").append("<table class='organizationgs"+company.ucc_pid+"' cellspacing='1' cellpadding='4'><tr class='next'></tr></table");
// 	    				}else if(result.size == 1){
// 	    					//只有一个下级时添加包裹
// 	    					$("#organizationgs"+company.ucc_pid).parent("td").parent("tr").parent("tbody").parent("table").parent("td").append("<table class='organizationgs"+company.ucc_pid+"' cellspacing='0' cellpadding='0'><tr class='next'></tr></table");
// 	    				}
// 	    			};
// 	    			if(result.size == 1){
// 		    			//只有一个下级时添加
// 	    				$("#organizationgs"+company.ucc_pid).parent("td").parent("tr").parent("tbody").parent("table").parent("td").children("table").children("tbody").children(".next").append("<td align=center valign='top'><table border='0'  cellspacing='1' cellpadding='4' width='100%' height=1><tr><td width='50%'></td><td width='50%'></td></tr></table><i></i><table cellspacing='0' cellpadding='0'><tr><td class='tdbottom' style='border: 1 solid #000000' nowrap><a id='organizationgs"+company.ucc_id+"' href='javascript:shower("+company.ucc_id+",\"gs\");'>"+name+"</a></td></tr></table></td>");
// 		    		}else{
// 		    			//多个下级时添加包裹
// 		    			if($("#organizationgs"+company.ucc_pid).parent("td").parent("tr").parent("tbody").parent("table").parent("td").children("table").children("tbody").children(".next").html() == ""){
// 		    				//第一个下级
// 		    				$("#organizationgs"+company.ucc_pid).parent("td").parent("tr").parent("tbody").parent("table").parent("td").children("table").children("tbody").children(".next").append("<td align=center class='next' valign='top'><table border='0'  cellspacing='0' cellpadding='0' width='100%' height=1><tr><td width='50%'></td><td width='50%' bgcolor='#000000'></td></tr></table><i></i><table style='margin-left:10px;' cellspacing='1' cellpadding='4'><tr><td class='tdbottom' style='border: 1 solid #000000' nowrap><a id='organizationgs"+company.ucc_id+"' href='javascript:shower("+company.ucc_id+",\"gs\");' >"+name+"</a></td></tr></table></td>");
// 		    			}else if((idx+1) == result.size){
// 		    				//最后一个下级
// 		    				$("#organizationgs"+company.ucc_pid).parent("td").parent("tr").parent("tbody").parent("table").parent("td").children("table").children("tbody").children(".next").append("<td align=center class='next' valign='top'><table border='0'  cellspacing='0' cellpadding='0' width='100%' height=1><tr><td width='50%' bgcolor='#000000'></td><td width='50%'></td></tr></table><i></i><table style='margin-left:10px;' cellspacing='1' cellpadding='4'><tr><td class='tdbottom' style='border: 1 solid #000000' nowrap><a id='organizationgs"+company.ucc_id+"' href='javascript:shower("+company.ucc_id+",\"gs\");' >"+name+"</a></td></tr></table></td>");
// 		    			}else{
// 		    				//中间的下级
// 		    				$("#organizationgs"+company.ucc_pid).parent("td").parent("tr").parent("tbody").parent("table").parent("td").children("table").children("tbody").children(".next").append("<td align=center class='next' valign='top'><table border='0'  cellspacing='0' cellpadding='0' width='100%' height=1><tr><td width='50%' bgcolor='#000000'></td><td width='50%' bgcolor='#000000'></td></tr></table><i></i><table style='margin-left:10px;' cellspacing='1' cellpadding='4'><tr><td class='tdbottom' style='border: 1 solid #000000' nowrap><a id='organizationgs"+company.ucc_id+"' href='javascript:shower("+company.ucc_id+",\"gs\");' >"+name+"</a></td></tr></table></td>");
// 		    			}
// 		    		}
// 	    		}
//
// 	    	 });
	    	
//	    	//遍历所有下属部门
//	    	$.each(result.departmentList, function(idx, department) {
//	    		var bm = "bm";
//	    		if(department.ucd_name == '' || department.ucd_name == null){
//	    			var name = department.ucd_name
//	    		}else{
//	    			var name = department.ucd_name
//	    		}
//	    		if(department.pi_id == 1){
//	    			if(department.ucc_id == 1){
//	    				if(result.size > 1){
//	    					if((idx+1) == result.departmentsize){
//	    						$("#organizationgs"+department.ucc_id).append("<td align=center valign='top'><table border='0'  cellspacing='0' cellpadding='0' width='100%' height=1><tr><td width='50%' bgcolor='#000000'></td><td width='50%'></td></tr></table><i></i><table cellspacing='1' cellpadding='4'><tr><td class='tdbottom' style='border: 1 solid #000000' nowrap><a href='javascript:shower("+department.ucd_id+",\"bm\");' id='department"+department.ucd_id+"'>"+name+"</a></td></tr></table></td>");
//	    					}else{
//	    						$("#organizationgs"+department.ucc_id).append("<td align=center valign='top'><table border='0'  cellspacing='0' cellpadding='0' width='100%' height=1><tr><td width='50%' bgcolor='#000000'></td><td width='50%' bgcolor='#000000'></td></tr></table><i></i><table cellspacing='1' cellpadding='4'><tr><td class='tdbottom' style='border: 1 solid #000000' nowrap><a href='javascript:shower("+department.ucd_id+",\"bm\");' id='department"+department.ucd_id+"'>"+name+"</a></td></tr></table></td>");
//	    					}
//	    				}else if(result.size == 1){
//	    					//只有一个下级时添加包裹
//	    					$("#organizationgs"+department.ucc_id).append("<td align=center valign='top'><table cellspacing='1' cellpadding='4'><tr><td class='tdbottom' style='border: 1 solid #000000' nowrap><a href='javascript:shower("+department.ucd_id+",\"bm\");' id='department"+department.ucd_id+"'>"+name+"</a></td></tr></table></td>");
//	    				}
//	    			}else{
//	    				if(result.departmentsize == 1){
//	    					//只有一个下级时添加
//	    					$("#organizationgs"+department.ucc_id).parent("td").parent("tr").parent("tbody").parent("table").parent("td").children("table").children("tbody").children(".next").append("<td align=center valign='top'><table border='0'  cellspacing='1' cellpadding='4' width='100%' height=1><tr><td width='50%'></td><td width='50%'></td></tr></table><i></i><table cellspacing='0' cellpadding='0'><tr><td class='tdbottom' style='border: 1 solid #000000' nowrap><a href='javascript:shower("+department.ucd_id+",\"bm\");' id='department"+department.ucd_id+"'>"+name+"</a></td></tr></table></td>");
//	    				}else{
//	    					//多个下级时添加包裹
//	    					if(idx == 0){
//	    						//第一个下级
//	    						$("#organizationgs"+department.ucc_id).parent("td").parent("tr").parent("tbody").parent("table").parent("td").children("table").children("tbody").children(".next").append("<td align=center class='next' valign='top'><table border='0'  cellspacing='0' cellpadding='0' width='100%' height=1><tr><td width='50%'></td><td width='50%' bgcolor='#000000'></td></tr></table><i></i><table style='margin-left:10px;' cellspacing='1' cellpadding='4'><tr><td class='tdbottom' style='border: 1 solid #000000' nowrap><a href='javascript:shower("+department.ucd_id+",\"bm\");' id='department"+department.ucd_id+"'>"+name+"</a></td></tr></table></td>");
//	    					}else if((idx+1) == result.departmentsize){
//	    						//最后一个下级
//	    						$("#organizationgs"+department.ucc_id).parent("td").parent("tr").parent("tbody").parent("table").parent("td").children("table").children("tbody").children(".next").append("<td align=center class='next' valign='top'><table border='0'  cellspacing='0' cellpadding='0' width='100%' height=1><tr><td width='50%' bgcolor='#000000'></td><td width='50%'></td></tr></table><i></i><table style='margin-left:10px;' cellspacing='1' cellpadding='4'><tr><td class='tdbottom' style='border: 1 solid #000000' nowrap><a href='javascript:shower("+department.ucd_id+",\"bm\");' id='department"+department.ucd_id+"'>"+name+"</a></td></tr></table></td>");
//	    					}else{
//	    						//中间的下级
//	    						$("#organizationgs"+department.ucc_id).parent("td").parent("tr").parent("tbody").parent("table").parent("td").children("table").children("tbody").children(".next").append("<td align=center class='next' valign='top'><table border='0'  cellspacing='0' cellpadding='0' width='100%' height=1><tr><td width='50%' bgcolor='#000000'></td><td width='50%' bgcolor='#000000'></td></tr></table><i></i><table style='margin-left:10px;' cellspacing='1' cellpadding='4'><tr><td class='tdbottom' style='border: 1 solid #000000' nowrap><a href='javascript:shower("+department.ucd_id+",\"bm\");' id='department"+department.ucd_id+"'>"+name+"</a></td></tr></table></td>");
//	    					}
//	    				}
//	    			}
//	    		}else{
//	    			if($(".department"+department.pi_id).html() == null){
//	    				if(result.size > 1){
//	    					//多个下级时添加包裹
//	    					$("#department"+department.pi_id).parent("td").parent("tr").parent("tbody").parent("table").parent("td").append("<i class='department"+department.ucd_id+"'></i>");
//	    					$("#department"+department.pi_id).parent("td").parent("tr").parent("tbody").parent("table").parent("td").append("<table class='department"+department.ucd_id+"' cellspacing='1' cellpadding='4'><tr class='next'></tr></table");
//	    				}else if(result.size == 1){
//	    					//只有一个下级时添加包裹
//	    					$("#department"+department.pi_id).parent("td").parent("tr").parent("tbody").parent("table").parent("td").append("<table class='department"+department.ucd_id+"' cellspacing='0' cellpadding='0'><tr class='next'></tr></table");
//	    				}
//	    			};
//	    			
//	    			if(result.size == 1){
//		    			//只有一个下级时添加
//	    				$("#department"+department.pi_id).parent("td").parent("tr").parent("tbody").parent("table").parent("td").children("table").children("tbody").children(".next").append("<td align=center valign='top'><table border='0'  cellspacing='1' cellpadding='4' width='100%' height=1><tr><td width='50%'></td><td width='50%'></td></tr></table><i></i><table cellspacing='0' cellpadding='0'><tr><td class='tdbottom' style='border: 1 solid #000000' nowrap><a id='department"+department.ucd_id+"' href='javascript:shower("+department.ucd_id+",\"bm\");'>"+name+"</a></td></tr></table></td>");
//		    		}else{
//		    			//多个下级时添加包裹
//		    			if($("#department"+department.pi_id).parent("td").parent("tr").parent("tbody").parent("table").parent("td").children("table").children("tbody").children(".next").html() == ""){
//		    				//第一个下级
//		    				$("#department"+department.pi_id).parent("td").parent("tr").parent("tbody").parent("table").parent("td").children("table").children("tbody").children(".next").append("<td align=center class='next' valign='top'><table border='0'  cellspacing='0' cellpadding='0' width='100%' height=1><tr><td width='50%'></td><td width='50%' bgcolor='#000000'></td></tr></table><i></i><table style='margin-left:10px;' cellspacing='1' cellpadding='4'><tr><td class='tdbottom' style='border: 1 solid #000000' nowrap><a id='organizationgs"+department.ucd_id+"' href='javascript:shower("+department.ucd_id+",\"bm\");'>"+name+"</a></td></tr></table></td>");
//		    			}else if((idx+1) == result.size){
//		    				//最后一个下级
//		    				$("#department"+department.pi_id).parent("td").parent("tr").parent("tbody").parent("table").parent("td").children("table").children("tbody").children(".next").append("<td align=center class='next' valign='top'><table border='0'  cellspacing='0' cellpadding='0' width='100%' height=1><tr><td width='50%' bgcolor='#000000'></td><td width='50%'></td></tr></table><i></i><table style='margin-left:10px;' cellspacing='1' cellpadding='4'><tr><td class='tdbottom' style='border: 1 solid #000000' nowrap><a id='organizationgs"+department.ucd_id+"' href='javascript:shower("+department.ucd_id+",\"bm\");'>"+name+"</a></td></tr></table></td>");
//		    			}else{
//		    				//中间的下级
//		    				$("#department"+department.pi_id).parent("td").parent("tr").parent("tbody").parent("table").parent("td").children("table").children("tbody").children(".next").append("<td align=center class='next' valign='top'><table border='0'  cellspacing='0' cellpadding='0' width='100%' height=1><tr><td width='50%' bgcolor='#000000'></td><td width='50%' bgcolor='#000000'></td></tr></table><i></i><table style='margin-left:10px;' cellspacing='1' cellpadding='4'><tr><td class='tdbottom' style='border: 1 solid #000000' nowrap><a id='organizationgs"+department.ucd_id+"' href='javascript:shower("+department.ucd_id+",\"bm\");'>"+name+"</a></td></tr></table></td>");
//		    			}
//		    		}
//	    		}
//	    	});
	    	
	    	//去除右边表格横线
// 	    	$(".next").each(function(idx) {
// 	    		if($(this).attr("valign") != 'top'){
// 	    			$(this).children("td").each(function(idxe) {
//
// 	    				var len = $(this).parent("tr").children("td").length;
// 	    				if(len == 1){
// 	    					$(this).parent("tr").children("td").children("i").remove();
// 	    				}
// 	    				if(idxe == 0){
// 	    					$(this).children("table").each(function(idxs) {
// 	    						if(idxs == 0){
// 	    							$(this).children("tbody").children("tr").children("td").each(function(idxss) {
// 	    								if(idxss == 0){
// 	    									$(this).css("background","#fff");
// 	    								}
// 	    							});
// 	    						}
// 	    					});
// 	    				}
// 	    				if((idxe+1) == len){
// 	    					$(this).children("table").each(function(idxs) {
// 	    						if(idxs == 0){
// 	    							$(this).children("tbody").children("tr").children("td").each(function(idxss) {
// 	    								if(idxss == 1){
// 	    									$(this).css("background","#fff");
// 	    								}
// 	    							});
// 	    						}
// 	    					});
// 	    				}
// 	    			});
// 	    		}
// 	    	});
//
// 	    	//去除顶部表格横线
// 	    	$("#organizationgs1").children("td").each(function(idx) {
// 	    		var len = $(this).parent("tr").children("td").length;
// 	    		if((idx+1) == len){
// 	    			$(this).children("table").each(function(idxs) {
// 						if(idxs == 0){
// 							$(this).children("tbody").children("tr").children("td").each(function(idxss) {
// 								if(idxss == 1){
// 									$(this).css("background","#fff");
// 								}
// 							});
// 						}
// 					});
// 	    		}
// 	    	});
// 	    }
// 	    });
// }

function shower(uda_id,tj){
	window.parent.href_mo('/company/departmentSetting?id='+uda_id+"&tj="+tj,"组织管理","组织架构");
}
