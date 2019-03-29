package com.gjp.controller;

import com.gjp.model.DataList;
import com.gjp.model.UserCenterUserVo;
import com.gjp.service.UserCenterUserService;
import com.gjp.util.AppUtil;
import com.gjp.util.HouseModel;
import com.gjp.util.PageModel;
import com.gjp.util.TableList;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Map;

/**
 * 用户表
 * @author tanglei 
 * date 2017年7月11日 下午14:58:40
 */
@Controller
@RequestMapping("/UserCenterUser")
public class UserCenterUserController {
	@Resource
	private UserCenterUserService userCenterUserService;
	
	/**
	 * 跳转用户信息列表
	 * @author tanglei
	 * date 2017年7月11日 下午14:58:40
	 */
	@RequestMapping("/userCenterUser")
	public String userCenterUser () {
		return "userCenterUser/userCenterUser";
	}
	
	/**
	 * 用户信息
	 * @author tanglei
	 * date 2017年7月11日 下午14:58:40
	 * @throws ParseException 
	 */
	@RequestMapping("/userCenterUserList")
	@ResponseBody
	public Map<String,Object> userCenterUserList(TableList tableList1) throws ParseException {
		// 初始化获取对象
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
			houseModel.setSqlOrderBy("order by user_createTime DESC ");
		}
		// 装载数据类
		DataList<UserCenterUserVo> datalist = new DataList<UserCenterUserVo>();
		int pageSize = Integer.parseInt(AppUtil.getCookie("pageSize"));
		// 分页设置查询条数
		PageModel<UserCenterUserVo> pageModel1 = userCenterUserService.selectUserCenterUser(tableList.getPageNo(), pageSize, houseModel);
		Map<String, Object> map = datalist.dataList(pageModel1.getList(), tableList.getPageNo(), pageSize, pageModel1.getTotalRecords(), pageModel1.getSumMoney());
		return map;
		
	}

}
