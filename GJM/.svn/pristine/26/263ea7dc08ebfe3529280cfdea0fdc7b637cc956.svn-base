package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.HoseRecommendGroupDAO;
import com.gjp.model.HoseRecommendGroup;
import com.gjp.util.PageModel;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 适合推荐群体ImplDao
 * 
 * @author zoe
 *
 */
@Repository
public class HoseRecommendGroupDaoImpl extends BaseDAO implements HoseRecommendGroupDAO {

	@Override
	public List<HoseRecommendGroup> selectHoseRecommendGroupList() {
		List<HoseRecommendGroup> hoseRecommendGroupList = super.sqlSessionTemplateProduct.selectList("com.gjp.dao.HoseRecommendGroupDAO.selectHoseRecommendGroup");
		return hoseRecommendGroupList;
	}

	@Override
	public int addHoseRecommendGroup(HoseRecommendGroup hoseRecommendGroup) {
		return super.sqlSessionTemplateProduct.insert("com.gjp.dao.HoseRecommendGroupDAO.addHoseRecommendGroup", hoseRecommendGroup);
	}

	@Override
	public int selectRecommendGroup_Id(HoseRecommendGroup hoseRecommendGroup) {
		return super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.HoseRecommendGroupDAO.selectRecommendGroup_Id", hoseRecommendGroup);
	}

	@Override
	public PageModel<HoseRecommendGroup> selectRecommendGroup(int pageNo, int pageSize) {
		PageModel<HoseRecommendGroup> pageModel = new PageModel<HoseRecommendGroup>();
		// 分页设置开始点
		pageModel.setPageNo((pageNo - 1) * pageSize);
		// 分页设置查询条数
		pageModel.setPageSize(pageSize);
		// 分页查询房屋基本信息集合
		List<HoseRecommendGroup> hoseRecommendGroupList = super.sqlSessionTemplateProduct.selectList("com.gjp.dao.HoseRecommendGroupDAO.selectRecommendGroup", pageModel);
		// 查询房屋总记录数
		int totalRecords = super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.HoseRecommendGroupDAO.selectTotleRecommendGroup");
		pageModel.setList(hoseRecommendGroupList);
		pageModel.setTotalRecords(totalRecords);
		return pageModel;
	}

	@Override
	public HoseRecommendGroup selectHoseRecommendGroupById(int recommendGroup_Id) {
		return super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.HoseRecommendGroupDAO.selectHoseRecommendGroupById", recommendGroup_Id);
	}

	@Override
	public int updataInfo(HoseRecommendGroup hoseRecommendGroup) {
		return super.sqlSessionTemplateProduct.update("com.gjp.dao.HoseRecommendGroupDAO.upDataHoseRecommendGroup", hoseRecommendGroup);
	}

}
