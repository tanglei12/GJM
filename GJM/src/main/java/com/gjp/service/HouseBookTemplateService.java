package com.gjp.service;

import com.gjp.dao.HouseBookTemplateDao;
import com.gjp.model.HouseBookTemplateInfo;
import com.gjp.util.Pagination;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * 预约参数Service
 * @author shenhx
 * 2017-03-14
 */
@Service
public class HouseBookTemplateService {

	@Resource
	private HouseBookTemplateDao houseBookTemplateDao;

	/**
	 * 添加预约配置模板信息
	 * @Template houseBookTemplateInfo
	 * @return
	 */
	public int addHouseBookTemplate(HouseBookTemplateInfo houseBookTemplateInfo){
		return houseBookTemplateDao.addHouseBookTemplate(houseBookTemplateInfo);
	}
	
	/**
	 * 删除预约配置模板信息
	 * @Template houseBookTemplateInfo
	 * @return
	 */
	public int delHouseBookTemplate(int bs_id){
		return houseBookTemplateDao.delHouseBookTemplate(bs_id);
	}
	
	/**
	 * 分页查询所有预约配置模板信息
	 * @Template houseBookConfig
	 * @return
	 */
	public Pagination<HouseBookTemplateInfo> queryHouseBookTemplateForList(Pagination<HouseBookTemplateInfo> pagination){
		return houseBookTemplateDao.queryHouseBookTemplateForList(pagination);
	}
	
	/**
	 * 分页查询所有预约配置模板信息数据条数
	 * @Template houseBookConfig
	 * @return
	 */
	public int queryHouseBookTemplateForCount(Pagination<HouseBookTemplateInfo> pagination){
		return houseBookTemplateDao.queryHouseBookTemplateForCount(pagination);
	}
	
	/**
	 * 查询单个模板信息
	 * @Template houseBookConfig
	 * @return
	 */
	public HouseBookTemplateInfo queryHouseBookTemplateById(int bp_id){
		return houseBookTemplateDao.queryHouseBookTemplateById(bp_id);
	}
	
	/**
	 * 修改预约模板信息
	 * @Template houseBookConfig
	 * @return
	 */
	public int updateHouseBookTemplate(HouseBookTemplateInfo houseBookTemplateInfo){
		return houseBookTemplateDao.updateHouseBookTemplate(houseBookTemplateInfo);
	}
	
	/**
	 * 保存配置信息ID
	 * @param bc_ids
	 * @return
	 */
	public int saveBcIds(HouseBookTemplateInfo houseBookTemplateInfo){
		return houseBookTemplateDao.saveBcIds(houseBookTemplateInfo);
	}
	
	/**
	 * 根据sourceID查询当前来源在模板配置中的发布范围
	 * @param sourceId
	 * @return
	 */
	public HouseBookTemplateInfo queryHouseBookTemplateBySourceId(String sourceId){
		return houseBookTemplateDao.queryHouseBookTemplateBySourceId(sourceId);
	}
}
