package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.CustomerStatisticsDAO;
import com.gjp.model.Statistics;
import com.gjp.model.ViewTrusteeship;
import com.gjp.util.PageModel;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CustomerStatisticsDAOImpl extends BaseDAO implements CustomerStatisticsDAO {

	@Override
	public Integer insertCustomerStatistics(Statistics statistics) {
		return super.sqlSessionTemplateUser.insert("com.gjp.dao.CustomerStatisticsDAO.insertCustomerStatistics", statistics);
	}

	@Override
	public Integer updateCustomerStatistics(Statistics statistics) {
		return super.sqlSessionTemplateUser.insert("com.gjp.dao.CustomerStatisticsDAO.updateCustomerStatistics", statistics);
	}

	@Override
	public List<Statistics> queryCustomerStatistics(Statistics statistics) {
		return super.sqlSessionTemplateUser.selectList("com.gjp.dao.CustomerStatisticsDAO.queryCustomerStatistics", statistics);
	}

	@Override
	public List<ViewTrusteeship> queryCustomerTrusteeship(ViewTrusteeship viewTrusteeship) {
		return super.sqlSessionTemplateUser.selectList("com.gjp.dao.CustomerStatisticsDAO.queryCustomerTrusteeship",viewTrusteeship);
	}

	@Override
	public Statistics queryCustomerStatisticsWhere(Statistics statistics) {
		return super.sqlSessionTemplateUser.selectOne("com.gjp.dao.CustomerStatisticsDAO.queryCustomerStatisticsWhere", statistics);
	}

	@Override
	public PageModel<Statistics> queryCustomerStatisticsList(PageModel<Statistics> pageModel) {
		List<Statistics> houseAppointment = sqlSessionTemplateUser.selectList("com.gjp.dao.CustomerStatisticsDAO.queryCustomerStatisticsList", pageModel);
		pageModel.setList(houseAppointment);
		pageModel.setTotalRecords(1);
		return pageModel;
	}

	@Override
	public int updateCustomerStatisticsForNum(Statistics statistics) {
		return sqlSessionTemplateUser.update("com.gjp.dao.CustomerStatisticsDAO.updateCustomerStatisticsForNum", statistics);
	}

	@Override
	public ViewTrusteeship queryCustomerTrusteeshipByEmid(Integer em_id) {
		return sqlSessionTemplateUser.selectOne("com.gjp.dao.CustomerStatisticsDAO.queryCustomerTrusteeshipByEmid", em_id);
	}

	@Override
	public PageModel<Statistics> queryCustomerStatisticsListSee(PageModel<Statistics> pageModel) {
		List<Statistics> houseAppointment = sqlSessionTemplateUser.selectList("com.gjp.dao.CustomerStatisticsDAO.queryCustomerStatisticsListSee", pageModel);
		pageModel.setList(houseAppointment);
		pageModel.setTotalRecords(1);
		return pageModel;
	}

}
