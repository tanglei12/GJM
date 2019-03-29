package com.gjp.service;

import com.gjp.dao.CustomerStatisticsDAO;
import com.gjp.model.Statistics;
import com.gjp.model.ViewTrusteeship;
import com.gjp.util.PageModel;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2016年3月2日 上午11:16:16
 */
@Service
public class CustomerStatisticsService {

	@Resource
	private CustomerStatisticsDAO customerStatisticsDAO;

	/**
	 * 插入内部人员统计
	 * 
	 * @param statistics
	 * @return
	 *
	 * @author 陈智颖
	 */
	public Integer insertCustomerStatistics(Statistics statistics) {
		return customerStatisticsDAO.insertCustomerStatistics(statistics);
	}

	/**
	 * 修改内部人员统计
	 * 
	 * @param statistics
	 * @return
	 *
	 * @author 陈智颖
	 */
	public Integer updateCustomerStatistics(Statistics statistics) {
		return customerStatisticsDAO.updateCustomerStatistics(statistics);
	}

	/**
	 * 查询内部人员统计
	 * 
	 * @param statistics
	 * @return
	 *
	 * @author 陈智颖
	 */
	public List<Statistics> queryCustomerStatistics(Statistics statistics) {
		return customerStatisticsDAO.queryCustomerStatistics(statistics);
	}

	/**
	 * 查询内部人员统计带看
	 * 
	 * @param statistics
	 * @return
	 *
	 * @author 陈智颖
	 */
	public PageModel<Statistics> queryCustomerStatisticsListSee(PageModel<Statistics> pageModel) {
		return customerStatisticsDAO.queryCustomerStatisticsListSee(pageModel);
	}

	/**
	 * 查询统计分析列表
	 * 
	 * @param statistics
	 * @return
	 *
	 * @author 陈智颖
	 */
	public PageModel<Statistics> queryCustomerStatisticsList(PageModel<Statistics> pageModel) {
		return customerStatisticsDAO.queryCustomerStatisticsList(pageModel);
	}

	/**
	 * 根据视图查询内部人员
	 * 
	 * @param statistics
	 * @return
	 *
	 * @author 陈智颖
	 */
	public List<ViewTrusteeship> queryCustomerTrusteeship(ViewTrusteeship viewTrusteeship) {
		return customerStatisticsDAO.queryCustomerTrusteeship(viewTrusteeship);
	}

	/**
	 * 根据周期数，内部人员编码查询
	 * 
	 * @param statistics
	 * @return
	 *
	 * @author 陈智颖
	 */
	public Statistics queryCustomerStatisticsWhere(Statistics statistics) {
		return customerStatisticsDAO.queryCustomerStatisticsWhere(statistics);
	}
}
