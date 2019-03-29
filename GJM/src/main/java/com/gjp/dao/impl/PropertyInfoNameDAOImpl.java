package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.PropertyInfoNameDAO;
import com.gjp.model.PropertyInfoConfigType;
import com.gjp.model.PropertyInfoName;
import com.gjp.model.PropertyInfoTrack;
import com.gjp.model.PropertyInfoType;
import com.gjp.util.Pagination;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PropertyInfoNameDAOImpl extends BaseDAO implements PropertyInfoNameDAO {

	@Override
	public List<PropertyInfoName> selectwuyebiao() {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.PropertyInfoNameDAO.selectwuyebiao");
	}

	@Override
	public List<PropertyInfoName> selectPropertyInfoNameALL() {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.PropertyInfoNameDAO.selectPropertyInfoNameALL");
	}

	@Override
	public int updatepropertyInfo(PropertyInfoName propertyInfoName) {
		return super.sqlSessionTemplateProduct.update("com.gjp.dao.PropertyInfoNameDAO.updatepropertyInfo", propertyInfoName);
	}

	@Override
	public int addpropertyInfoziji(PropertyInfoName propertyInfoName) {
		return super.sqlSessionTemplateProduct.update("com.gjp.dao.PropertyInfoNameDAO.addpropertyInfoziji", propertyInfoName);
	}

	@Override
	public List<PropertyInfoName> findPropertyInfoNameById(Integer id) {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.PropertyInfoNameDAO.findPropertyInfoNameById", id);
	}

	@Override
	public void updatepropertyInfowuhehao(PropertyInfoName propertyInfoNames) {
		super.sqlSessionTemplateProduct.update("com.gjp.dao.PropertyInfoNameDAO.updatepropertyInfowuhehao", propertyInfoNames);
	}

	@Override
	public List<PropertyInfoName> selectPropertyInfoNameALLwuye(PropertyInfoName propertyInfoNames) {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.PropertyInfoNameDAO.selectPropertyInfoNameALLwuye", propertyInfoNames);
	}

	@Override
	public PropertyInfoName findPropertyInfoNameBySid(Integer upn_id) {
		return super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.PropertyInfoNameDAO.findPropertyInfoNameBySid", upn_id);
	}

	@Override
	public List<PropertyInfoName> findpropertyInfoBySuperId(Integer integer) {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.PropertyInfoNameDAO.findpropertyInfoBySuperId", integer);
	}

	@Override
	public List<PropertyInfoName> selectsid(PropertyInfoName p) {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.PropertyInfoNameDAO.findpropertyInfoBySuperId", p);
	}

	@Override
	public List<PropertyInfoName> selectPropertyInfoNameWhere(PropertyInfoName propertyInfoName) {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.PropertyInfoNameDAO.selectPropertyInfoNameWhere", propertyInfoName);
	}

	@Override
	public int updatepropertyInfoNamejiegou(PropertyInfoName p1) {
		return super.sqlSessionTemplateProduct.update("com.gjp.dao.PropertyInfoNameDAO.updatepropertyInfoNamejiegou", p1);
	}

	@Override
	public List<PropertyInfoName> selectpropertyInfoSid() {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.PropertyInfoNameDAO.selectpropertyInfoSid");
	}

	@Override
	public List<PropertyInfoName> selectpropertyInfoSidNot() {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.PropertyInfoNameDAO.selectpropertyInfoSidNot");
	}

	@Override
	public PropertyInfoName findpropertyInfoToSuperId(Integer propertyInfo_Id) {
		return super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.PropertyInfoNameDAO.findpropertyInfoToSuperId", propertyInfo_Id);
	}

	@Override
	public List<PropertyInfoName> selectpropertyInfoBySname(PropertyInfoName propertyInfoName) {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.PropertyInfoNameDAO.selectpropertyInfoBySname", propertyInfoName);
	}

	@Override
	public List<PropertyInfoName> selectpropertyByParent(PropertyInfoName propertyInfoName) {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.PropertyInfoNameDAO.selectpropertyByParent", propertyInfoName);
	}

	@Override
	public List<PropertyInfoName> findPropertyNamePageList(Pagination<PropertyInfoName> pagination) {
		return sqlSessionTemplateProduct.selectList("com.gjp.dao.PropertyInfoNameDAO.findPropertyNamePageList", pagination);
	}

	@Override
	public PropertyInfoName selectPropertyInfoPid(PropertyInfoName propertyInfoName) {
		return sqlSessionTemplateProduct.selectOne("com.gjp.dao.PropertyInfoNameDAO.selectPropertyInfoPid",propertyInfoName );
	}

	@Override
	public List<PropertyInfoName> queryproperInfo(PropertyInfoName propertyInfoName) {
		return sqlSessionTemplateProduct.selectList("com.gjp.dao.PropertyInfoNameDAO.queryproperInfo",propertyInfoName );
	}

	@Override
	public int updatecommReq(PropertyInfoName updatewuyehao) {
		return sqlSessionTemplateProduct.insert("com.gjp.dao.PropertyInfoNameDAO.updatecommReq", updatewuyehao);
	}

	@Override
	public List<PropertyInfoName> queryPropertyInfoLists(PropertyInfoName p) {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.PropertyInfoNameDAO.queryPropertyInfoLists", p);
	}

	@Override
	public PropertyInfoType selectPrtperType (PropertyInfoType properType) {
		return super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.PropertyInfoNameDAO.selectProperTyInfoType", properType);
	}

	@Override
	public List<PropertyInfoType> selectProperTyInfoType (PropertyInfoType properType) {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.PropertyInfoNameDAO.selectProperTyInfoType", properType);
	}

	@Override
	public List<PropertyInfoTrack> selectProperInfoTrack (PropertyInfoTrack propertyInfoTrack) {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.PropertyInfoNameDAO.selectProperInfoTrack", propertyInfoTrack);
	}

	@Override
	public List<PropertyInfoConfigType> selectproperInfoIntenter (PropertyInfoConfigType proConfig) {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.PropertyInfoNameDAO.selectproperInfoIntenter",proConfig);
	}

	@Override
	public int addArea (PropertyInfoType properType) {
		return sqlSessionTemplateProduct.insert("com.gjp.dao.PropertyInfoNameDAO.addArea",properType);
	}

	@Override
	public int updateArea (PropertyInfoType properType) {
		return sqlSessionTemplateProduct.update("com.gjp.dao.PropertyInfoNameDAO.updateArea",properType);
	}

}
