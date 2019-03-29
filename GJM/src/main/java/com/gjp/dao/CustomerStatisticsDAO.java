package com.gjp.dao;

import com.gjp.model.Statistics;
import com.gjp.model.ViewTrusteeship;
import com.gjp.util.PageModel;

import java.util.List;

public interface CustomerStatisticsDAO {

	/**
	 * 插入内部人员统计
	 * 
	 * @param statistics
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer insertCustomerStatistics(Statistics statistics);

	/**
	 * 修改内部人员统计
	 * 
	 * @param statistics
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer updateCustomerStatistics(Statistics statistics);

	/**
	 * 查询内部人员统计
	 * 
	 * @param statistics
	 * @return
	 *
	 * @author 陈智颖
	 */
	List<Statistics> queryCustomerStatistics(Statistics statistics);

	/**
	 * 查询统计分析列表
	 * 
	 * @param statistics
	 * @return
	 *
	 * @author 陈智颖
	 */
	PageModel<Statistics> queryCustomerStatisticsList(PageModel<Statistics> pageModel);
	
	/**
	 * 查询统计分析列表带看
	 * 
	 * @param statistics
	 * @return
	 *
	 * @author 陈智颖
	 */
	PageModel<Statistics> queryCustomerStatisticsListSee(PageModel<Statistics> pageModel);

	/**
	 * 根据周期数，内部人员编码查询
	 * 
	 * @param statistics
	 * @return
	 *
	 * @author 陈智颖
	 */
	Statistics queryCustomerStatisticsWhere(Statistics statistics);

	/**
	 * 根据视图查询内部人员
	 * 
	 * @param statistics
	 * @return
	 *
	 * @author 陈智颖
	 */
	List<ViewTrusteeship> queryCustomerTrusteeship(ViewTrusteeship viewTrusteeship);

	int updateCustomerStatisticsForNum(Statistics statistics);

	ViewTrusteeship queryCustomerTrusteeshipByEmid(Integer em_id);
}
