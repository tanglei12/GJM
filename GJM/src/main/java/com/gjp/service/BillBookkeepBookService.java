package com.gjp.service;

import com.gjp.dao.BillBookkeepBookDAO;
import com.gjp.model.ViewBillBookkeepBookVo;
import com.gjp.util.HouseModel;
import com.gjp.util.PageModel;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * 记账本
 * @author tanglei
 * date 2017年6月21日 上午11:12:40 
 */
@Service
public class BillBookkeepBookService {
	@Resource
	private BillBookkeepBookDAO billBookkeepBookDAO;
	
	/**
	 * 记账本列表数据
	 * @author tanglei
	 * date 2017年6月21日 上午11:25:40
	 */
	public PageModel<ViewBillBookkeepBookVo> selectBookkeepBook(int pageNo, int pageSize, HouseModel houseModel) {
		return billBookkeepBookDAO.selectBookkeepBook(pageNo, pageSize, houseModel);
	}
	
	/**
	 * 添加
	 * @author tanglei
	 */
	public boolean addBookkeepBook(ViewBillBookkeepBookVo viewBillBookkeepBookVo){
		return billBookkeepBookDAO.addBookkeepBook(viewBillBookkeepBookVo) > 0;
	}
	
	/**
	 * 跳转编译页面
	 * @author tanglei 
	 */
	public ViewBillBookkeepBookVo selectBookkeep(int id) {
		return billBookkeepBookDAO.selectBookkeep(id);
	}
	
	/**
	 * 修改
	 * @author tanglei
	 */
	public boolean updateBookkeepBook (ViewBillBookkeepBookVo viewBillBookkeepBookVo) {
		return billBookkeepBookDAO.updateBookkeepBook(viewBillBookkeepBookVo) >0;
	}
	
	/**
	 * 报销列表数据
	 * @author tanglei
	 */
	public PageModel<ViewBillBookkeepBookVo> selectexpenseList(int pageNo, int pageSize, HouseModel houseModel) {
		return billBookkeepBookDAO.selectBookkeepBook(pageNo, pageSize, houseModel);
	}
	
	/**
	 * 报销数据
	 * @author tanglei
	 * date 2017年6月26日 上午9:25:40
	 */
	public PageModel<ViewBillBookkeepBookVo> bookExpenseList(HouseModel houseModel) {
		return billBookkeepBookDAO.bookExpenseList(houseModel);
	}

	/**
	 * 记账本所有数据
	 */
	public List<ViewBillBookkeepBookVo> queryBookKeepImageDown () {
			return  billBookkeepBookDAO.queryBookKeepImageDown();
	}
	
}
