package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.PropertyInfoDAO;
import com.gjp.model.HousingValuation;
import com.gjp.model.PropertyInfo;
import com.gjp.model.PropertyInfoName;
import com.gjp.model.PropertyInfoSubwany;
import com.gjp.util.Pagination;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2016年4月11日 下午6:44:17
 */
@Repository
public class PropertyInfoDAOImpl extends BaseDAO implements PropertyInfoDAO {

	@Override
	public Integer insertPropertyInfo(PropertyInfo propertyInfo) {
		return super.sqlSessionTemplateProduct.insert("com.gjp.dao.PropertyInfoDAO.insertPropertyInfo", propertyInfo);
	}

	@Override
	public Integer updatePropertyInfo(PropertyInfo propertyInfo) {
		return super.sqlSessionTemplateProduct.insert("com.gjp.dao.PropertyInfoDAO.updatePropertyInfo", propertyInfo);
	}

	@Override
	public PropertyInfo queryPropertyInfoCount(PropertyInfo propertyInfo) {
		return super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.PropertyInfoDAO.queryPropertyInfoCount", propertyInfo);
	}

	@Override
	public PropertyInfo queryPropertyInfoID(PropertyInfo propertyInfo) {
		return super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.PropertyInfoDAO.queryPropertyInfoID", propertyInfo);
	}

	@Override
	public int updatePropertyInfo2(PropertyInfo propertyInfo) {
		return super.sqlSessionTemplateProduct.update("com.gjp.dao.PropertyInfoDAO.updatePropertyInfo2", propertyInfo);
	}

	@Override
	public void updatePropertyInfo3(PropertyInfo propertyInfo) {
		super.sqlSessionTemplateProduct.update("com.gjp.dao.PropertyInfoDAO.updatePropertyInfo3", propertyInfo);
	}

	@Override
	public PropertyInfo selectcompanyByPiId(PropertyInfoName propertyInfoName) {
		return super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.PropertyInfoDAO.selectcompanyByPiId", propertyInfoName);
	}

	@Override
	public List<PropertyInfo> selectPropertyInfo() {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.PropertyInfoDAO.selectPropertyInfo");
	}

	@Override
	public List<PropertyInfo> selectwuyename(PropertyInfo propertyInfo) {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.PropertyInfoDAO.selectwuyename", propertyInfo);
	}

	@Override
	public List<PropertyInfo> selectUserCenterPropertyInfoByParam(PropertyInfo propertyInfo) {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.PropertyInfoDAO.selectUserCenterPropertyInfoByParam", propertyInfo);
	}

	@Override
	public List<HousingValuation> selectvaluation(HousingValuation housingValuation) {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.PropertyInfoDAO.selectvaluation", housingValuation);
	}

	@Override
	public List<PropertyInfoName> selectPropertyInfoNameList(PropertyInfoName propertyInfoName) {
		return sqlSessionTemplateProduct.selectList("com.gjp.dao.PropertyInfoDAO.selectPropertyInfoNameList", propertyInfoName);
	}

	@Override
	public PropertyInfoName selectPropertyInfoNameByWhere(PropertyInfoName propertyInfoName) {
		return sqlSessionTemplateProduct.selectOne("com.gjp.dao.PropertyInfoDAO.selectPropertyInfoNameByWhere", propertyInfoName);
	}

	@Override
	public List<PropertyInfoName> queryPropertyInfoNameList(Pagination<PropertyInfoName> pagination) {
		return sqlSessionTemplateProduct.selectList("com.gjp.dao.PropertyInfoDAO.queryPropertyInfoNameList", pagination);
	}

	@Override
	public int queryPropertyInfoNameListRecords(Pagination<PropertyInfoName> pagination) {
		return sqlSessionTemplateProduct.selectOne("com.gjp.dao.PropertyInfoDAO.queryPropertyInfoNameListRecords", pagination);
	}

	@Override
	public PropertyInfo selectPropertyInfoByWhere(PropertyInfo propertyInfo) {
		return sqlSessionTemplateProduct.selectOne("com.gjp.dao.PropertyInfoDAO.selectPropertyInfoByWhere", propertyInfo);
	}

	@Override
	public int insertPropertyInfoSubwany(PropertyInfoSubwany propertyInfoSubwany) {
		return sqlSessionTemplateProduct.insert("com.gjp.dao.PropertyInfoDAO.insertPropertyInfoSubwany", propertyInfoSubwany);
	}

	@Override
	public int deletePropertyInfoSubwany(PropertyInfoSubwany propertyInfoSubwany) {
		return sqlSessionTemplateProduct.delete("com.gjp.dao.PropertyInfoDAO.deletePropertyInfoSubwany", propertyInfoSubwany);
	}

	@Override
	public List<PropertyInfoSubwany> selectPropertyInfoSubwany(PropertyInfoSubwany propertyInfoSubwany) {
		return sqlSessionTemplateProduct.selectList("com.gjp.dao.PropertyInfoDAO.selectPropertyInfoSubwany", propertyInfoSubwany);
	}

	@Override
	public List<PropertyInfoName> selectPropertyInfoName(PropertyInfoName propertyInfoName) {
		return sqlSessionTemplateProduct.selectList("com.gjp.dao.PropertyInfoDAO.selectPropertyInfoName", propertyInfoName);
	}

	@Override
	public List<String> queryPropertyInfoNames() {
		return sqlSessionTemplateProduct.selectList("com.gjp.dao.PropertyInfoDAO.queryPropertyInfoNames");
	}

	@Override
	public List<PropertyInfoName> queryPropertyInfoToZfb() {
		return sqlSessionTemplateProduct.selectList("com.gjp.dao.PropertyInfoDAO.queryPropertyInfoToZfb");
	}

	@Override
	public int updatePropertyInfoById(PropertyInfoName propertyInfoName) {
		return sqlSessionTemplateProduct.update("com.gjp.dao.PropertyInfoDAO.updatePropertyInfoById", propertyInfoName);
	}

	@Override
	public PropertyInfoName selectProperInfo(PropertyInfoName propertyInfoName) {
		return super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.PropertyInfoDAO.selectProperInfo", propertyInfoName);
	}

}
