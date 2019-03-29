package com.gjp.dao;

import com.gjp.model.HouseBookTemplateInfo;
import com.gjp.util.Pagination;

/**
 * 预约模板维护
 * @author shenhx
 *
 */
public interface HouseBookTemplateDao {
	
	/**
	 * 添加预约模板信息
	 * @Template houseBookTemplateInfo
	 * @return
	 */
	int addHouseBookTemplate(HouseBookTemplateInfo houseBookTemplateInfo);
	
	/**
	 * 删除预约模板信息
	 * @Template houseBookTemplateInfo
	 * @return
	 */
	int delHouseBookTemplate(int bt_id);
	
	/**
	 * 分页查询所有预约模板信息
	 * @Template houseBookTemplate
	 * @return
	 */
	Pagination<HouseBookTemplateInfo> queryHouseBookTemplateForList(Pagination<HouseBookTemplateInfo> pagination);
	
	/**
	 * 分页查询所有预约模板信息数据条数
	 * @Template houseBookTemplate
	 * @return
	 */
	int queryHouseBookTemplateForCount(Pagination<HouseBookTemplateInfo> pagination);
	
	/**
	 * 查询单个模板信息
	 * @Template houseBookTemplate
	 * @return
	 */
	HouseBookTemplateInfo queryHouseBookTemplateById(int bt_id);
	
	/**
	 * 修改预约模板信息
	 * @Template houseBookTemplate
	 * @return
	 */
	int updateHouseBookTemplate(HouseBookTemplateInfo houseBookTemplateInfo);
	
	/**
	 * 保存配置信息ID
	 * @param bc_ids
	 * @return
	 */
	int saveBcIds(HouseBookTemplateInfo houseBookTemplateInfo);
	
	/**
	 * 根据sourceID查询当前来源在模板配置中的发布范围
	 * @param sourceId
	 * @return
	 */
	HouseBookTemplateInfo queryHouseBookTemplateBySourceId(String sourceId);
}
