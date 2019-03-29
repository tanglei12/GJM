package com.gjp.service;

import com.gjp.dao.BillContractBillDao;
import com.gjp.model.ContractBillVo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * 合同账单管理
 *
 * @author 王孝元
 * @version 创建时间：2016年12月29日 下午5:50:02
 */
@Service
public class BillContractBillService {

	@Resource
	private BillContractBillDao billContractBillDao;

	/**
	 * 根据id查询账单
	 *
	 * @param bcb_id
	 * @return
	 * @author 王孝元
	 */
	public ContractBillVo queryContractBillById(Integer bcb_id) {
		return billContractBillDao.queryBillContractBillById(bcb_id);
	}

	/**
	 * 查询合作伙伴合同账单
	 *
	 * @param bco_code
	 * @param bco_cycle
	 * @return
	 * @author 王孝元
	 */
	public ContractBillVo queryPartnerContractBill(String bco_code, Integer bcb_cycle) {
		ContractBillVo bill = new ContractBillVo();
		bill.setBco_code(bco_code);
		bill.setBcb_cycle(bcb_cycle);
		bill.setBcb_type(0);
		bill.setBcb_state(9);
		return billContractBillDao.queryBillContractBillByProperty(bill);
	}

	/**
	 * 更新账单
	 *
	 * @param bcb
	 * @return
	 * @author 王孝元
	 */
	public int updateBillContractBill(ContractBillVo bcb) {
		return billContractBillDao.updateBillContractBill(bcb);
	}

	/**
	 * 新增账单
	 *
	 * @param bcb
	 * @return
	 * @author 王孝元
	 */
	public int addBillContractBill(ContractBillVo bcb) {
		return billContractBillDao.addBillContractBill(bcb);
	}

	/**
	 * 根据订单code查询账单信息
	 *
	 * @author tanglei
	 * @Date 2017年7月30日 下午15:25:55
	 */
	public ContractBillVo queryBillContractBillByProperty(ContractBillVo billContractBillVo) {
		return billContractBillDao.queryBillContractBillByProperty(billContractBillVo);
	}

	/**
	 * 根据订单code查询账单信息列表
	 *
	 * @author wxr
	 * @Date 2017年7月30日 下午15:25:55
	 */
	public List<ContractBillVo> queryBillContractBillListByProperty(ContractBillVo billContractBillVo) {
		return billContractBillDao.queryBillContractBillListByProperty(billContractBillVo);
	}

	/**
	 * 根据订单号和和状态更改账单
	 *
	 * @author tanglei
	 * @Date 2017年7月30日 下午15:42:55
	 */
	public boolean updateContractBill(ContractBillVo bcb) {
		return billContractBillDao.updateContractBill(bcb) > 0;
	}
}
