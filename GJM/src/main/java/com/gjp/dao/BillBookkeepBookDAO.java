package com.gjp.dao;

import com.gjp.model.ViewBillBookkeepBookVo;
import com.gjp.util.HouseModel;
import com.gjp.util.PageModel;

import java.util.List;

/**
 * 记账本
 * @author tanglei
 * date 2017年6月21日 上午11:12:40 
 */
public interface BillBookkeepBookDAO {
	
	/**
	 * 记账本列表
	 * @author tanglei
	 * date 2017年6月21日 上午11:31:40
	 */
	PageModel<ViewBillBookkeepBookVo> selectBookkeepBook(int pageNo, int pageSize, HouseModel houseModel);
	
	/**
	 * 添加数据
	 * @author tanglei
	 */
	int addBookkeepBook(ViewBillBookkeepBookVo viewBillBookkeepBookVo);
	
	/**
	 * 跳转编译页面
	 * @author tanglei
	 */
	ViewBillBookkeepBookVo selectBookkeep(int id);
	
	/**
	 * 修改
	 * @author tanglei
	 */
	int updateBookkeepBook(ViewBillBookkeepBookVo viewBillBookkeepBookVo);
	
	/**
	 * 报销列表数据
	 * @author tanglei
	 */
	PageModel<ViewBillBookkeepBookVo> selectexpenseList(int pageNo, int pageSize, HouseModel houseModel);
	
	/**
	 * 报销数据
	 * @author tanglei
	 * date 2017年6月26日 上午9:30:40
	 */
	PageModel<ViewBillBookkeepBookVo> bookExpenseList(HouseModel houseModel);

	/**
	 * 记账本所有数据
	 */
	List<ViewBillBookkeepBookVo> queryBookKeepImageDown ();
	
}
