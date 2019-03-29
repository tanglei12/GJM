package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.BillBookkeepBookDAO;
import com.gjp.model.ViewBillBookkeepBookVo;
import com.gjp.util.HouseModel;
import com.gjp.util.PageModel;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 记账本
 * @author tanglei
 * date 2017年6月21日 上午11:12:40 
 */
@Repository
public class BillBookkeepBookDAOImpl extends BaseDAO implements BillBookkeepBookDAO{

	@Override
	public PageModel<ViewBillBookkeepBookVo> selectBookkeepBook(int pageNo, int pageSize, HouseModel houseModel) {
		PageModel<ViewBillBookkeepBookVo> pageModel = new PageModel<ViewBillBookkeepBookVo>();
		// 分页设置开始点
		pageModel.setPageNo((pageNo - 1) * pageSize);
		// 分页设置查询条数
		pageModel.setPageSize(pageSize);
		// 分页设置查询条件
		pageModel.setHouseModel(houseModel);
		pageModel.setInte(3);   //删除状态
		pageModel.setTxt(houseModel.getMode());
		List<ViewBillBookkeepBookVo> bookkeepBook = sqlSessionTemplateBusiness.selectList("com.gjp.dao.BillBookkeepBook.selectBookkeepBook", pageModel);
		pageModel.setList(bookkeepBook);
		List<ViewBillBookkeepBookVo> bookkeepTotal = sqlSessionTemplateBusiness.selectList("com.gjp.dao.BillBookkeepBook.queryTotalBookkeepBook", pageModel);
		pageModel.setTotalRecords(bookkeepTotal.size());
		return pageModel;
	}

	@Override
	public int addBookkeepBook(ViewBillBookkeepBookVo viewBillBookkeepBookVo) {
		return sqlSessionTemplateBusiness.insert("com.gjp.dao.BillBookkeepBook.addBookkeepBook", viewBillBookkeepBookVo);
	}

	@Override
	public ViewBillBookkeepBookVo selectBookkeep(int id) {
		return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.BillBookkeepBook.selectBookkeep", id);
	}

	@Override
	public int updateBookkeepBook(ViewBillBookkeepBookVo viewBillBookkeepBookVo) {
		return sqlSessionTemplateBusiness.update("com.gjp.dao.BillBookkeepBook.updateBookkeepBook", viewBillBookkeepBookVo);
	}

	@Override
	public PageModel<ViewBillBookkeepBookVo> selectexpenseList(int pageNo, int pageSize, HouseModel houseModel) {
		PageModel<ViewBillBookkeepBookVo> pageModel = new PageModel<ViewBillBookkeepBookVo>();
		// 分页设置开始点
		pageModel.setPageNo((pageNo - 1) * pageSize);
		// 分页设置查询条数
		pageModel.setPageSize(pageSize);
		// 分页设置查询条件
		pageModel.setHouseModel(houseModel);
		pageModel.setInte(1);
		List<ViewBillBookkeepBookVo> bookkeepBook = sqlSessionTemplateBusiness.selectList("com.gjp.dao.BillBookkeepBook.selectBookkeepBook", pageModel);
		pageModel.setList(bookkeepBook);
		List<ViewBillBookkeepBookVo> bookkeepTotal = sqlSessionTemplateBusiness.selectList("com.gjp.dao.BillBookkeepBook.queryTotalBookkeepBook", pageModel);
		pageModel.setTotalRecords(bookkeepTotal.size());
		return pageModel;
	}

	@Override
	public PageModel<ViewBillBookkeepBookVo> bookExpenseList(HouseModel houseModel) {
		PageModel<ViewBillBookkeepBookVo> pageModel = new PageModel<ViewBillBookkeepBookVo>();
		pageModel.setInte(1);
		pageModel.setHouseModel(houseModel);
		List<ViewBillBookkeepBookVo> bookExpense = sqlSessionTemplateBusiness.selectList("com.gjp.dao.BillBookkeepBook.bookExpenseList", pageModel);
		pageModel.setList(bookExpense);
		return pageModel;
	}

	@Override
	public List<ViewBillBookkeepBookVo> queryBookKeepImageDown () {
		return sqlSessionTemplateBusiness.selectList("com.gjp.dao.BillBookkeepBook.queryBookKeepImageDown");
	}

}
