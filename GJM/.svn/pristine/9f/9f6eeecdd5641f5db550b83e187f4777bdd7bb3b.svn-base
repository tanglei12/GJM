package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.HouseIntentionDao;
import com.gjp.model.*;
import com.gjp.util.HouseModel;
import com.gjp.util.PageModel;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 意向房源
 * 
 * @author 陈智颖
 *
 * @version 创建时间：2016年4月24日 下午4:54:56
 */
@Repository
public class HouseIntentionDaoImpl extends BaseDAO implements HouseIntentionDao {

	@Override
	public List<HouseIntention> queryHouseIntentionEM(HouseIntention houseIntention) {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseIntentionDao.queryHouseIntentionEM", houseIntention);
	}

	@Override
	public Integer addHouseIntention(HouseIntention houseIntention) {
		return super.sqlSessionTemplateProduct.insert("com.gjp.dao.HouseIntentionDao.addHouseIntention", houseIntention);
	}

	@Override
	public Integer addHouseIntentionImage(HouseIntention houseIntention) {
		return super.sqlSessionTemplateProduct.insert("com.gjp.dao.HouseIntentionDao.addHouseIntentionImage", houseIntention);
	}

	@Override
	public Integer addHouseFollow(HouseFollow houseFollow) {
		return super.sqlSessionTemplateProduct.insert("com.gjp.dao.HouseIntentionDao.addHouseFollow", houseFollow);
	}

	@Override
	public Integer addHouseFollowUser(HouseFollowUser houseFollowUser) {
		return super.sqlSessionTemplateProduct.insert("com.gjp.dao.HouseIntentionDao.addHouseFollowUser", houseFollowUser);
	}

	@Override
	public HouseIntention queryHouseIntentionCount(HouseIntention houseIntention) {
		return super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseIntentionDao.queryHouseIntentionCount", houseIntention);
	}

	@Override
	public Integer updateHouseIntention(HouseIntention houseIntention) {
		return super.sqlSessionTemplateProduct.update("com.gjp.dao.HouseIntentionDao.updateHouseIntention", houseIntention);
	}

	@Override
	public HouseIntention queryHouseIntentionID(HouseIntention houseIntention) {
		return super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseIntentionDao.queryHouseIntentionID", houseIntention);
	}

	@Override
	public PageModel<HouseIntention> queryHouseIntentionEMXiangXi(int pageNo, int pageSize, HouseModel houseModel) {
		PageModel<HouseIntention> pageModel = new PageModel<HouseIntention>();
		// 分页设置开始点
		pageModel.setPageNo((pageNo - 1) * pageSize);
		// 分页设置查询条数
		pageModel.setPageSize(pageSize);
		// 分页设置查询条件
		pageModel.setHouseModel(houseModel);
		// 分页查询房屋基本信息集合
		List<HouseIntention> houseIntentionList = super.sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseIntentionDao.queryHouseIntentionEMXiangXi", pageModel);
		// 查询房屋总记录数
		int totalRecords = super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseIntentionDao.selectHouseIntentionByEm_idCount", pageModel);;
		pageModel.setList(houseIntentionList);
		pageModel.setTotalRecords(totalRecords);
		
		return pageModel;
	}

	@Override
	public List<HouseFollow> selectHouseIntentiongzjl(HouseIntention houseIntention) {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseIntentionDao.selectHouseIntentiongzjl", houseIntention);
	}

	@Override
	public String queryHouseIntentionSource(String name) {
		return sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseIntentionDao.queryHouseIntentionSource", name);
	}

	@Override
	public HouseIntention queryHouseIntentionWhere(HouseIntention houseIntention) {
		return sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseIntentionDao.queryHouseIntentionWhere", houseIntention);
	}

	@Override
	public int selSimilarPhonePhiidCount(HouseIntention houseIntention) {
		return sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseIntentionDao.selSimilarPhonePhiidCount", houseIntention);
	}

	@Override
	public int updateHouseIntentionBulidType() {
		return sqlSessionTemplateProduct.update("com.gjp.dao.HouseIntentionDao.updateHouseIntentionBulidType");
	}

	@Override
	public int updateHouseIntentionBulidTypePrivate() {
		return sqlSessionTemplateProduct.update("com.gjp.dao.HouseIntentionDao.updateHouseIntentionBulidTypePrivate");
	}

	@Override
	public HouseFollow selectHouseFollowPhiIdOne(HouseFollow houseFollow) {
		return sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseIntentionDao.selectHouseFollowPhiIdOne", houseFollow);
	}

	@Override
	public List<HouseInformationState> queryHouseInfoStateList(HouseInformationState houseInformationState) {
		return sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseIntentionDao.queryHouseInfoStateList", houseInformationState);
	}

	@Override
	public List<HouseIntentionImage> queryHouseImageList(HouseIntentionImage intentionImage) {
		return sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseIntentionDao.queryHouseImageList", intentionImage);
	}

	@Override
	public List<HouseInformationStateRelation> queryHouseInfoStateListRelation(HouseInformationStateRelation stateRelation) {
		return sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseIntentionDao.queryHouseInfoStateListRelation", stateRelation);
	}

	/**
	 * 根据意向房源ID查询推荐的群体名称
	 */
	@Override
	public List<HoseRecommendGroup> selectHoseRecommendGroup(HouseIntention houseIntention) {
		return sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseIntentionDao.selectHoseRecommendGroup", houseIntention);
	}

	@Override
	public int updateHouseIntentionNewPerson(HouseIntention houseIntention) {
		return sqlSessionTemplateProduct.update("com.gjp.dao.HouseIntentionDao.updateHouseIntentionNewPerson", houseIntention);
	}

	@Override
	public List<HouseIntention> queryHouseIntentionAPP(HouseIntention houseIntention) {
		return sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseIntentionDao.queryHouseIntentionAPP", houseIntention);
	}

	@Override
	public List<HouseIntention> queryHouseIntentionImageType(HouseIntention houseIntention) {
		return sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseIntentionDao.queryHouseIntentionImageType", houseIntention);
	}

	@Override
	public HouseIntention queryIntentionState(HouseIntention houseIntention) {
		return sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseIntentionDao.queryIntentionState", houseIntention);
	}

	@Override
	public Integer deleteIntentionImage(HouseIntention houseIntention) {
		return sqlSessionTemplateProduct.delete("com.gjp.dao.HouseIntentionDao.deleteIntentionImage", houseIntention);
	}

	@Override
	public HouseIntention queryHouseIntentionBool(HouseIntention houseIntention) {
		return sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseIntentionDao.queryHouseIntentionBool", houseIntention);
	}

	@Override
	public HouseIntention queryIntentionHouseByHiCode(String hi_code) {
		return sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseIntentionDao.queryIntentionHouseByHiCode", hi_code);
	}

	@Override
	public Integer deleteHouseIntentionImage (HouseIntentionImage houseImage) {
		return sqlSessionTemplateProduct.delete("com.gjp.dao.HouseIntentionDao.deleteHouseIntentionImage",houseImage);
	}

	@Override
	public HouseIntentionImage selectHouseIntentionImages (HouseIntentionImage houseImage) {
		return sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseIntentionDao.selectHouseIntentionImages",houseImage);
	}

	@Override
	public Integer deleteHouseIntentionImageType (HouseIntentionImageType imageType) {
		return sqlSessionTemplateProduct.delete("com.gjp.dao.HouseIntentionDao.deleteHouseIntentionImageType",imageType);
	}

}
