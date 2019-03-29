package com.gjp.service;

import com.gjp.dao.ReserveBillDao;
import com.gjp.model.ReserveBill;
import com.gjp.model.ReserveBillHouse;
import com.gjp.util.PageModel;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * 预定账单service
 * 
 * @author zoe
 *
 */
@Service
public class ReserveBillService {
	
	
	@Resource
	private ReserveBillDao reserveBillDao;


	/**
	 * 查询预定账单List
	 * @param pageNo
	 * @param cookies
	 * @return
	 */
	public PageModel<ReserveBill> selectReserveBill(PageModel<ReserveBill> pageModel) {
		return reserveBillDao.selectReserveBill(pageModel);
	}


	/**
	 * 查询已签合同的租房预定账单
	 * @author zoe
	 * @param pageNo
	 * @param cookies
	 * @param txt 
	 * @return
	 */
	public PageModel<ReserveBill> selectEjzReserveBill(int pageNo, int cookies, String txt) {
		return reserveBillDao.selectEjzReserveBill(pageNo,cookies,txt);
	}


	/**
	 * 根据预订单号查询已签合同的租房预定账单
	 * @author zoe
	 * @param rb_number
	 * @return
	 */
	public ReserveBill ejzSelectMon(String rb_number) {
		return reserveBillDao.ejzSelectMon(rb_number);
	}


	/**
	 * 修改预定账单打款状态
	 * @author zoe
	 * @param reserveBill
	 * @return
	 */
	public int updateState(ReserveBill reserveBill) {
		return reserveBillDao.updateState(reserveBill);
	}


	/**
	 * 线下添加预定账单前查询房屋
	 * @author zoe
	 * @param param
	 * @return
	 */
	public List<ReserveBillHouse> reserveBillSelectHouse(String param) {
		return reserveBillDao.reserveBillSelectHouse(param);
	}


	/**
	 * 线下添加预定账单
	 * @author zoe
	 * @param reserveBill
	 * @return
	 */
	public int addReserveBill(ReserveBill reserveBill) {
		return reserveBillDao.addReserveBill(reserveBill);
	}


	/**
	 * 根据id查询预定账单
	 * @author zoe
	 * @param parseInt
	 * @return
	 */
	public ReserveBill selectReserveBillById(int rb_id) {
		return reserveBillDao.selectReserveBillById(rb_id);
	}


	/**
	 * 取消预定账单
	 * @author zoe
	 * @param reserveBill
	 * @return
	 */
	public int abandonReserveBill(ReserveBill reserveBill) {
		return reserveBillDao.abandonReserveBill(reserveBill);
	}


	/**
	 * 修改预定账单
	 * @author zoe
	 * @param reserveBills
	 * @return
	 */
	public int updateReserveBill(ReserveBill reserveBill) {
		return reserveBillDao.updateReserveBill(reserveBill);
	}


	/**
	 * 根据订单号修改预定账单状态
	 * @author zoe
	 * @param reserveBill
	 * @return
	 */
	public int receivables(ReserveBill reserveBill) {
		return reserveBillDao.receivables(reserveBill);
	}


	/**
	 * 查询所有已付款的预定订单
	 * @author zoe
	 * @param reserveBill
	 * @return
	 */
	public List<ReserveBill> selectReserveBillList(ReserveBill reserveBill) {
		return reserveBillDao.selectReserveBillList(reserveBill);
	}


	/**
	 * 根据订单号查询预定账单
	 * @author zoe
	 * @param number
	 * @return
	 */
	public ReserveBill selectReserveBillByCode(ReserveBill reserveBill) {
		return reserveBillDao.selectReserveBillByCode(reserveBill);
	}

	/**
	 * 根据房屋编码查询是否存在预定订单
	 * 
	 * @param reserveBill
	 * @return
	 *
	 * @author 陈智颖
	 */
	public ReserveBill selectReserveBillCode(String rb_houseNum){
		return reserveBillDao.selectReserveBillCode(rb_houseNum);
	}

}
