package com.gjp.dao;

import com.gjp.model.CustomerSee;
import com.gjp.model.ViewBusinessContractVo;
import com.gjp.util.Pagination;

import java.util.List;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2016年2月24日 上午10:24:43 
 */
public interface CustomerSeeDAO {

	/**
	 * 插入客户带看
	 * 
	 * @param billClearBill
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer insertCustomerSee(CustomerSee customerSee);
	
	/**
	 * 修改客户带看
	 * 
	 * @param billClearBill
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer updateCustomerSee(CustomerSee customerSee);
	
	/**
	 * 根据周数，内部人员查看成功带看次数
	 * 
	 * @param billClearBill
	 * @return
	 *
	 * @author 陈智颖
	 */
	CustomerSee queryCustomerSeeSuccessCountDK(CustomerSee customerSee);
	
	/**
	 * 根据模糊周数，内部人员查看成功带看次数
	 * 
	 * @param billClearBill
	 * @return
	 *
	 * @author 陈智颖
	 */
	CustomerSee queryCustomerSeeListSize(CustomerSee customerSee);
	
	/**
	 * 根据周数，内部人员，客户电话号码查询客户带看信息
	 * 
	 * @param billClearBill
	 * @return
	 *
	 * @author 陈智颖
	 */
	CustomerSee queryCustomerCountPhone(CustomerSee customerSee);
	
	/**
	 * 根据客户带看编码查询数据
	 * 
	 * @param billClearBill
	 * @return
	 *
	 * @author 陈智颖
	 */
	CustomerSee queryCustomerListID(CustomerSee customerSee);
	
	/**
	 * 根据周数，内部人员查询客户带看信息
	 * 
	 * @param billClearBill
	 * @return
	 *
	 * @author 陈智颖
	 */
	CustomerSee queryCustomerSeeCount(CustomerSee customerSee);
	
	/**
	 * 根据周数，内部人员查看成功的次数
	 * 
	 * @param billClearBill
	 * @return
	 *
	 * @author 陈智颖
	 */
	CustomerSee queryCustomerSeeSuccessCount(CustomerSee customerSee);
	
	/**
	 * 根据周数，内部人员查询客户带看信息
	 * 
	 * @param billClearBill
	 * @return
	 *
	 * @author 陈智颖
	 */
	CustomerSee queryCustomerSeeList(CustomerSee customerSee);
	
	/**
	 * 查询客户带看
	 * 
	 * @param customerSee
	 * @return
	 *
	 * @author 陈智颖
	 */
	List<CustomerSee> queryCustomerSee();
	
	/**
	 * 查询客户带看数据并分页 
	 * 
	 * @param customerSee
	 * @return
	 *
	 * @author 陈智颖
	 */
	List<CustomerSee> queryCustomerList(CustomerSee customerSee);
	
	/**
	 * 查看未签租赁合同的托管合同
	 * 
	 * @param customerSee
	 * @return
	 *
	 * @author 陈智颖
	 */
	List<ViewBusinessContractVo> selectViewContractListCUS(Pagination<ViewBusinessContractVo> viewBusinessContractVo);
	
	/**
	 * 根据房屋编码查询托管合同
	 * 
	 * @param customerSee
	 * @return
	 *
	 * @author 陈智颖
	 */
	ViewBusinessContractVo selectViewContractListHouseID(ViewBusinessContractVo viewBusinessContractVo);
	
	/**
	 * 根据房屋编码查询托管合同
	 * 
	 * @param customerSee
	 * @return
	 *
	 * @author 陈智颖
	 */
	ViewBusinessContractVo selectViewContractListHouseIDs(ViewBusinessContractVo viewBusinessContractVo);
}
