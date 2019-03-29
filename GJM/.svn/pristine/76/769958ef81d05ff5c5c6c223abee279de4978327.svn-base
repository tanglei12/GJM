package com.gjp.dao;

import com.gjp.model.PropertyInfoConfigType;
import com.gjp.model.PropertyInfoName;
import com.gjp.model.PropertyInfoTrack;
import com.gjp.model.PropertyInfoType;
import com.gjp.util.Pagination;

import java.util.List;

public interface PropertyInfoNameDAO {

	List<PropertyInfoName> selectwuyebiao();

	/**
	 * 查询所有父子级表
	 * 
	 * @return
	 * 
	 * @author 陈智颖
	 */
	List<PropertyInfoName> selectPropertyInfoNameALL();

	/**
	 * 根据条件物业父子级
	 * 
	 * @param propertyInfoName
	 * @return
	 *
	 * @author 陈智颖
	 */
	List<PropertyInfoName> selectPropertyInfoNameWhere(PropertyInfoName propertyInfoName);

	int updatepropertyInfo(PropertyInfoName propertyInfoName);

	int addpropertyInfoziji(PropertyInfoName propertyInfoName);

	List<PropertyInfoName> findPropertyInfoNameById(Integer upn_id);

	/**
	 * 根据物业编码查询物业父子级数据
	 * 
	 * @param upn_id
	 * @return
	 *
	 * @author 陈智颖
	 */
	PropertyInfoName findpropertyInfoToSuperId(Integer propertyInfo_Id);

	void updatepropertyInfowuhehao(PropertyInfoName updatewuyehao);

	List<PropertyInfoName> selectPropertyInfoNameALLwuye(PropertyInfoName p);

	PropertyInfoName findPropertyInfoNameBySid(Integer upn_id);

	List<PropertyInfoName> findpropertyInfoBySuperId(Integer integer);

	List<PropertyInfoName> selectsid(PropertyInfoName p);

	int updatepropertyInfoNamejiegou(PropertyInfoName p1);

	List<PropertyInfoName> selectpropertyInfoSid();

	List<PropertyInfoName> selectpropertyInfoSidNot();

	List<PropertyInfoName> selectpropertyInfoBySname(PropertyInfoName propertyInfoName);

	List<PropertyInfoName> selectpropertyByParent(PropertyInfoName propertyInfoName);

	List<PropertyInfoName> findPropertyNamePageList(Pagination<PropertyInfoName> pagination);
	
	/**
	 * 根据条件查询物业
	 * @author tanglei
	 */
	PropertyInfoName selectPropertyInfoPid (PropertyInfoName propertyInfoName);
	
	/**
	 * 根据父级编码查询多条子级
	 * @author tanglei
	 */
	List<PropertyInfoName> queryproperInfo (PropertyInfoName propertyInfoName);
	/**
	 * 查询小区下级
	 */
	List<PropertyInfoName> queryPropertyInfoLists(PropertyInfoName p);

	/**
	 * 根据区县查询区域
	 */
	PropertyInfoType selectPrtperType (PropertyInfoType properType);

	/**
	 * 根据父级编码查询区域
	 */
	List<PropertyInfoType> selectProperTyInfoType (PropertyInfoType properType);

	/**
	 * 查询轨道站台
	 */
	List<PropertyInfoTrack> selectProperInfoTrack (PropertyInfoTrack propertyInfoTrack);

	/**
	 * 查询宽带
	 */
	List<PropertyInfoConfigType> selectproperInfoIntenter (PropertyInfoConfigType proConfig);

	/**
	 * 添加区域
	 * @author tanglei
	 */
	int addArea (PropertyInfoType properType);

	/**
	 * 修改区域
	 * @author tanglei
	 */
	int updateArea (PropertyInfoType properType);


	int updatecommReq(PropertyInfoName updatewuyehao);

}
