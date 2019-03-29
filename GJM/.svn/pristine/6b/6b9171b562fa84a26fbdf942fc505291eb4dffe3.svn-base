package com.gjp.dao;

import com.gjp.model.ReserveBill;
import com.gjp.model.ReserveBillHouse;
import com.gjp.util.PageModel;

import java.util.List;



/**
 * 预定账单
 * @author zoe
 *
 */
public interface ReserveBillDao {

	/**
	 * 查询预定账单List
	 * @param pageNo
	 * @param cookies
	 * @return
	 */
	PageModel<ReserveBill> selectReserveBill(PageModel<ReserveBill> pageModel);

	/**
	 * 查询已签合同的租房预定账单
	 * @author zoe
	 * @param pageNo
	 * @param cookies
	 * @param txt 
	 * @return
	 */
	PageModel<ReserveBill> selectEjzReserveBill(int pageNo, int cookies, String txt);

	/**
	 * 根据预订单号查询已签合同的租房预定账单
	 * @author zoe
	 * @param rb_number
	 * @return
	 */
	ReserveBill ejzSelectMon(String rb_number);

	/**
	 * 修改预定账单打款状态
	 * @author zoe
	 * @param reserveBill
	 * @return
	 */
	int updateState(ReserveBill reserveBill);

	/**
	 * 线下添加预定账单前查询房屋
	 * @author zoe
	 * @param param
	 * @return
	 */
	List<ReserveBillHouse> reserveBillSelectHouse(String param);

	/**
	 * 线下添加预定账单
	 * @author zoe
	 * @param reserveBill
	 * @return
	 */
	int addReserveBill(ReserveBill reserveBill);

	/**
	 * 根据id查询预定账单
	 * @author zoe
	 * @param rb_id
	 * @return
	 */
	ReserveBill selectReserveBillById(int rb_id);
	
	/**
	 * 
	 * 根据房屋编码查询是否存在预定订单
	 * 
	 * @author 陈智颖
	 * @param rb_houseNum 房屋编码
	 * @return
	 */
	ReserveBill selectReserveBillCode(String rb_houseNum);

	/**
	 * 取消预定账单
	 * @author zoe
	 * @param reserveBill
	 * @return
	 */
	int abandonReserveBill(ReserveBill reserveBill);

	/**
	 * 修改预定账单
	 * @author zoe
	 * @param reserveBill
	 * @return
	 */
	int updateReserveBill(ReserveBill reserveBill);

	/**
	 * 根据订单号修改预定账单状态
	 * @author zoe
	 * @param reserveBill
	 * @return
	 */
	int receivables(ReserveBill reserveBill);

	/**
	 * 查询所有已付款的预定订单
	 * @author zoe
	 * @param reserveBill
	 * @return
	 */
	List<ReserveBill> selectReserveBillList(ReserveBill reserveBill);

	/**
	 * 根据订单号查询预定账单
	 * @author zoe
	 * @param reserveBill
	 * @return
	 */
	ReserveBill selectReserveBillByCode(ReserveBill reserveBill);


	/**
	 * 插入存房预定订单
	 * 
	 * @param reserveBill
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer addReserveBills(ReserveBill reserveBill);
}
