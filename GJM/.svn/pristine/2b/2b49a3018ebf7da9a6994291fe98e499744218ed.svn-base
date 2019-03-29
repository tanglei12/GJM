package com.gjp.service;

import com.gjp.dao.CustomerSeeDAO;
import com.gjp.model.CustomerSee;
import com.gjp.model.ViewBusinessContractVo;
import com.gjp.util.Pagination;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2016年2月24日 上午10:33:08 
 */
@Service
public class CustomerSeeService {

	@Resource
	private CustomerSeeDAO customerSeeDAO;
	
	/**
	 * 插入客户带看
	 * 
	 * @param customerSee
	 * @return
	 *
	 * @author 陈智颖
	 */
	public Integer insertCustomerSee(CustomerSee customerSee){
		return customerSeeDAO.insertCustomerSee(customerSee);
	}
	
	/**
	 * 修改客户带看
	 * 
	 * @param customerSee
	 * @return
	 *
	 * @author 陈智颖
	 */
	public Integer updateCustomerSee(CustomerSee customerSee){
		return customerSeeDAO.updateCustomerSee(customerSee);
	}
	
	/**
	 * 根据周数，内部人员查看成功带看次数
	 * 
	 * @param customerSee
	 * @return
	 *
	 * @author 陈智颖
	 */
	public CustomerSee queryCustomerSeeSuccessCountDK(CustomerSee customerSee){
		return customerSeeDAO.queryCustomerSeeSuccessCountDK(customerSee);
	}
	
	/**
	 * 根据客户带看编码查询数据
	 * 
	 * @param customerSee
	 * @return
	 *
	 * @author 陈智颖
	 */
	public CustomerSee queryCustomerListID(CustomerSee customerSee){
		return customerSeeDAO.queryCustomerListID(customerSee);
	}
	
	/**
	 * 查询是否存在周数，内部人员，房屋编号存在的带看
	 * 
	 * @param customerSee
	 * @return
	 *
	 * @author 陈智颖
	 */
	public CustomerSee queryCustomerSeeCount(CustomerSee customerSee){
		return customerSeeDAO.queryCustomerSeeCount(customerSee);
	}
	
	/**
	 * 根据周数，内部人员，客户电话号码查询客户带看信息
	 * 
	 * @param customerSee
	 * @return
	 *
	 * @author 陈智颖
	 */
	public CustomerSee queryCustomerCountPhone(CustomerSee customerSee){
		return customerSeeDAO.queryCustomerCountPhone(customerSee);
	}
	
	/**
	 * 据模糊周数，内部人员查看成功带看次数
	 * 
	 * @param customerSee
	 * @return
	 *
	 * @author 陈智颖
	 */
	public CustomerSee queryCustomerSeeListSize(CustomerSee customerSee){
		return customerSeeDAO.queryCustomerSeeListSize(customerSee);
	}
	
	/**
	 * 根据周数，内部人员查看成功的次数
	 * 
	 * @param customerSee
	 * @return
	 *
	 * @author 陈智颖
	 */
	public CustomerSee queryCustomerSeeSuccessCount(CustomerSee customerSee){
		return customerSeeDAO.queryCustomerSeeSuccessCount(customerSee);
	}
	
	/**
	 * 查询客户带看
	 * 
	 * @param customerSee
	 * @return
	 *
	 * @author 陈智颖
	 */
	public List<CustomerSee> queryCustomerSee(){
		return customerSeeDAO.queryCustomerSee();
	}
	
	/**
	 * 查询客户带看数据并分页 
	 * 
	 * @param customerSee
	 * @return
	 *
	 * @author 陈智颖
	 */
	public List<CustomerSee> queryCustomerList(CustomerSee customerSee){
		return customerSeeDAO.queryCustomerList(customerSee);
	}
	
	/**
	 * 根据周数，内部人员查询客户带看信息
	 * 
	 * @param customerSee
	 * @return
	 *
	 * @author 陈智颖
	 */
	public CustomerSee queryCustomerSeeList(CustomerSee customerSee){
		return customerSeeDAO.queryCustomerSeeList(customerSee);
	}
	
	/**
	 * 查询客户带看数据并分页 
	 * 
	 * @param customerSee
	 * @return
	 *
	 * @author 陈智颖
	 */
	public List<ViewBusinessContractVo> selectViewContractListCUS(Pagination<ViewBusinessContractVo> viewBusinessContractVo){
		return customerSeeDAO.selectViewContractListCUS(viewBusinessContractVo);
	}
	
	/**
	 * 根据房屋编码查询托管合同
	 * 
	 * @param customerSee
	 * @return
	 *
	 * @author 陈智颖
	 */
	public ViewBusinessContractVo selectViewContractListHouseID(ViewBusinessContractVo viewBusinessContractVo){
		return customerSeeDAO.selectViewContractListHouseID(viewBusinessContractVo);
	}
	
	/**
	 * 根据房屋编码查询托管合同
	 * 
	 * @param customerSee
	 * @return
	 *
	 * @author 陈智颖
	 */
	public ViewBusinessContractVo selectViewContractListHouseIDs(ViewBusinessContractVo viewBusinessContractVo){
		return customerSeeDAO.selectViewContractListHouseIDs(viewBusinessContractVo);
	}
}
