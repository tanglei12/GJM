package com.gjp.controller;

import com.gjp.model.DataList;
import com.gjp.model.HouseHouseExtended;
import com.gjp.service.HouseExtendedService;
import com.gjp.util.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;

/**
 * 房源的扩展信息
 * 
 * @author zoe
 *
 */
@Controller
@RequestMapping("/houseExtended")
public class HouseExtendedController {

	// 房屋扩展信息
	@Resource
	private HouseExtendedService houseExtendedService;

	/**
	 * 跳转房屋扩展信息界面
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/houseExtended")
	public String houseExtended(HttpServletRequest request, HttpServletResponse response) {
		return "/houseExtended/houseExtended";
	}

	/**
	 * 跳转修改房屋扩展信息界面
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/updata")
	public String updataExtended(HttpServletRequest request,
			HttpServletResponse response, String he_id) {
		//在导向编辑页面时，向request和session域中添加uuid随机数
		UUIDToken.generateUUIDToken(request);
		int ids = Integer.parseInt(he_id);
		//传回编号
		request.setAttribute("id", ids);
		return "/houseExtended/updataHouseExtended";
	}

	/**
	 * ajax查询房屋扩展信息List
	 * 
	 * @param response
	 * @return
	 * @throws ParseException 
	 */
	@RequestMapping("/selectExtended")
	@ResponseBody
	public Map<String, Object> selectHouseHouseInformation(HttpServletResponse response, TableList tableList1) throws ParseException {
		
		//初始化获取对象
		TableList tableList = tableList1.initData(tableList1);
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");

		HouseModel houseModel = new HouseModel();
		if (tableList.getDateStart() != null && !tableList.getDateStart().equals("")) {
			houseModel.setDateStart(sf.parse(tableList.getDateStart()));
		}
		if (tableList.getDateEnd() != null && !tableList.getDateEnd().equals("")) {
			houseModel.setDateEnd(sf.parse(tableList.getDateEnd()));
		}
		houseModel.setSqlWhere(tableList.getSqlWhere());
		
		houseModel.setDateTitle(tableList.getDateType());

		if (tableList.getOrderBy() != null && !tableList.getOrderBy().equals("")) {
			houseModel.setSqlOrderBy("order by " + tableList.getOrderBy() + " asc");
		} else {
			houseModel.setSqlOrderBy("");
		}
		// 装载数据类
		DataList<HouseHouseExtended> datalist = new DataList<HouseHouseExtended>();
		int pageSize = Integer.parseInt(AppUtil.getCookie("pageSize"));
		// 查询分页实体
		PageModel<HouseHouseExtended> pageModel = houseExtendedService.selectHouseHouseExtended(tableList.getPageNo(), pageSize, houseModel);
		// 装载数据
		Map<String, Object> map = datalist.dataList(pageModel.getList(), tableList.getPageNo(), pageSize, pageModel.getTotalRecords(), pageModel.getSumMoney());
		
		return map;
	}

	/**
	 * ajax根据id查询房屋扩展信息
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/selectHouseExtendedById")
	@ResponseBody
	public Map<String, Object> selectHouseExtendedById(
			HttpServletRequest request, HttpServletResponse response, String id) {
		int he_id = Integer.parseInt(id);
		//根据id查询房屋扩展信息
		HouseHouseExtended houseHouseExtended = houseExtendedService
				.selectHouseExtendedById(he_id);
		Map<String, Object> map = new HashMap<>();
		map.put("houseHouseExtended", houseHouseExtended);
		return map;
	}

	/**
	 * 修改房屋扩展信息
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/updataInfo")
	public String updataInfo(HouseHouseExtended houseHouseExtended,
			Model model,String buyTime, HttpServletRequest request,
			HttpServletResponse response) {
		
		//判断是否重复提交
		if(!UUIDToken.isRepeatSubmit(request)){
			//设置开盘时间
			if (!"".equals(buyTime)) {
				houseHouseExtended.setHe_buyTime(DataUtil.StrToDate(buyTime));
			}
			//修改房屋扩展信息
			int result = houseExtendedService.updataInfo(houseHouseExtended);
			if(result != 0){
				request.setAttribute("success", "$.jBox.tip('修改房屋扩展信息成功');");
			}else{
				request.setAttribute("error", "$.jBox.tip('修改房屋扩展信息失败');");
			}
        }else{
        	return "/houseExtended/houseExtended";
        }
		
		request.getSession().removeAttribute("token");//移除session中的token
		
		return "/houseExtended/houseExtended";
	}

}
