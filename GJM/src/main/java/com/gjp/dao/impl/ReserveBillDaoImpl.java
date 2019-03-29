package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.ReserveBillDao;
import com.gjp.model.ReserveBill;
import com.gjp.model.ReserveBillHouse;
import com.gjp.util.PageModel;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 预定账单ImplDao
 * 
 * @author zoe
 *
 */
@Repository
public class ReserveBillDaoImpl extends BaseDAO implements ReserveBillDao {

	@Override
	public PageModel<ReserveBill> selectReserveBill(PageModel<ReserveBill> pageModel) {

		List<ReserveBill> reserveBill = super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.ReserveBillDao.selectReserveBill", pageModel);
		int totalRecords = super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ReserveBillDao.selectReserveBillTotal", pageModel);
		pageModel.setList(reserveBill);
		pageModel.setTotalRecords(totalRecords);

		return pageModel;
	}

	@Override
	public PageModel<ReserveBill> selectEjzReserveBill(int pageNo, int pageSize, String txt) {
		PageModel<ReserveBill> pageModel = new PageModel<ReserveBill>();
		// 分页设置开始点
		pageModel.setPageNo((pageNo - 1) * pageSize);
		// 分页设置查询条数
		pageModel.setPageSize(pageSize);
		// 分页设置查询条件
		pageModel.setTxt(txt);
		// 分页查询房屋基本信息集合
		List<ReserveBill> reserveBillList = super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.ReserveBillDao.selectEjzReserveBill", pageModel);
		// 查询房屋总记录数
		int totalRecords = super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ReserveBillDao.selectEjzReserveBillTotal");
		pageModel.setList(reserveBillList);
		pageModel.setTotalRecords(totalRecords);
		return pageModel;
	}

	@Override
	public ReserveBill ejzSelectMon(String rb_number) {

		return super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ReserveBillDao.ejzSelectMon", rb_number);
	}

	@Override
	public int updateState(ReserveBill reserveBill) {
		return super.sqlSessionTemplateBusiness.update("com.gjp.dao.ReserveBillDao.updateState", reserveBill);
	}

	@Override
	public List<ReserveBillHouse> reserveBillSelectHouse(String param) {
		ReserveBillHouse reserveBillHouse = new ReserveBillHouse();
		reserveBillHouse.setParam(param);
		return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.ReserveBillDao.reserveBillSelectHouse", reserveBillHouse);
	}

	@Override
	public int addReserveBill(ReserveBill reserveBill) {
		return super.sqlSessionTemplateBusiness.insert("com.gjp.dao.ReserveBillDao.addReserveBill", reserveBill);
	}

	@Override
	public ReserveBill selectReserveBillById(int rb_id) {
		return super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ReserveBillDao.selectReserveBillById", rb_id);
	}

	@Override
	public int abandonReserveBill(ReserveBill reserveBill) {
		return super.sqlSessionTemplateBusiness.update("com.gjp.dao.ReserveBillDao.abandonReserveBill", reserveBill);
	}

	@Override
	public int updateReserveBill(ReserveBill reserveBill) {
		return super.sqlSessionTemplateBusiness.update("com.gjp.dao.ReserveBillDao.updateReserveBill", reserveBill);
	}

	@Override
	public int receivables(ReserveBill reserveBill) {
		return super.sqlSessionTemplateBusiness.update("com.gjp.dao.ReserveBillDao.receivables", reserveBill);
	}

	@Override
	public List<ReserveBill> selectReserveBillList(ReserveBill reserveBill) {
		return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.ReserveBillDao.selectReserveBillList", reserveBill);
	}

	@Override
	public ReserveBill selectReserveBillByCode(ReserveBill reserveBill) {
		return super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ReserveBillDao.selectReserveBillByCode", reserveBill);
	}

	@Override
	public Integer addReserveBills(ReserveBill reserveBill) {
		return super.sqlSessionTemplateBusiness.insert("com.gjp.dao.ReserveBillDao.addReserveBills", reserveBill);
	}

	@Override
	public ReserveBill selectReserveBillCode(String rb_houseNum) {
		return super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ReserveBillDao.selectReserveBillCode", rb_houseNum);
	}

}
