package com.gjp.dao.impl;

import com.gjp.dao.AdvertisementDAO;
import com.gjp.dao.BaseDAO;
import com.gjp.model.Advertisement;
import com.gjp.util.HouseModel;
import com.gjp.util.PageModel;
import org.springframework.stereotype.Repository;

import java.util.List;
/**
 * 广告列表
 * @author tanglei
 * date 2017年7月7日 下午5:55:40
 */
@Repository
public class AdvertisementDAOImpl extends BaseDAO implements AdvertisementDAO{

	@Override
	public PageModel<Advertisement> selectAdvertisement(int pageNo, int pageSize, HouseModel houseModel) {
		PageModel<Advertisement> pageModel = new PageModel<Advertisement>();
		// 分页设置开始点
		pageModel.setPageNo((pageNo - 1) * pageSize);
		// 分页设置查询条数
		pageModel.setPageSize(pageSize);
		// 分页设置查询条件
		pageModel.setHouseModel(houseModel);
		pageModel.setInte(3);
		List<Advertisement> advertis = sqlSessionTemplateProduct.selectList("com.gjp.dao.AdvertisementDAO.selectAdvertisement", pageModel);
		pageModel.setList(advertis);
		List<Advertisement> advertisTotal = sqlSessionTemplateProduct.selectList("com.gjp.dao.AdvertisementDAO.totalSelectAdvertisement", pageModel);
		pageModel.setTotalRecords(advertisTotal.size());
		return pageModel;
	}

	@Override
	public int addAdvertisement(Advertisement advertisement) {
		return sqlSessionTemplateProduct.insert("com.gjp.dao.AdvertisementDAO.addAdvertisement", advertisement);
	}

	@Override
	public Advertisement selectOneAdvertisement(Advertisement advertisement) {
		return sqlSessionTemplateProduct.selectOne("com.gjp.dao.AdvertisementDAO.selectOneAdvertisement", advertisement);
	}

	@Override
	public int updateAdvertisement(Advertisement advertisement) {
		return sqlSessionTemplateProduct.update("com.gjp.dao.AdvertisementDAO.updateAdvertisement", advertisement);
	}

	@Override
	public int countAdvertisement(Advertisement advertisement) {
		List<Advertisement> count=sqlSessionTemplateProduct.selectList("com.gjp.dao.AdvertisementDAO.countAdvertisement", advertisement);
		return count.size();
	}

}
