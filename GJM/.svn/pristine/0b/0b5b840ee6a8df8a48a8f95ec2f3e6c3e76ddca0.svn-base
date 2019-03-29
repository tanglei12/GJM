package com.gjp.service;

import com.gjp.dao.HoseRecommendGroupDAO;
import com.gjp.model.HoseRecommendGroup;
import com.gjp.util.PageModel;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * 适合推荐群体service
 * @author zoe
 *
 */
@Service
public class HoseRecommendGroupService {
	@Resource
	private HoseRecommendGroupDAO hoseRecommendGroupDAO;

	/**
	 * 查询适合推荐群体List
	 * @return
	 */
	public List<HoseRecommendGroup> selectHoseRecommendGroupList() {
		return hoseRecommendGroupDAO.selectHoseRecommendGroupList();
	}

	/**
	 * 添加推荐群体
	 * @param hoseRecommendGroup
	 * @return
	 */
	public int addHoseRecommendGroup(HoseRecommendGroup hoseRecommendGroup) {
		return hoseRecommendGroupDAO.addHoseRecommendGroup(hoseRecommendGroup);
	}

	/**
	 * 查询推荐群体编号
	 * @param hoseRecommendGroup 
	 * @return
	 */
	public int selectRecommendGroup_Id(HoseRecommendGroup hoseRecommendGroup) {
		return hoseRecommendGroupDAO.selectRecommendGroup_Id(hoseRecommendGroup);
	}
	

	/**
	 * 分页查询推荐群体list
	 * @param pageNo
	 * @param pageSize
	 * @return
	 */
	public PageModel<HoseRecommendGroup> selectRecommendGroup(int pageNo,
			int pageSize) {
		return hoseRecommendGroupDAO.selectRecommendGroup(pageNo,pageSize);
	}

	/**
	 * 根据id查询推荐群体
	 * @param he_id
	 * @return
	 */
	public HoseRecommendGroup selectHoseRecommendGroupById(int recommendGroup_Id) {
		return hoseRecommendGroupDAO.selectHoseRecommendGroupById(recommendGroup_Id);
	}

	/**
	 * 修改推荐群体
	 * @param hoseRecommendGroup
	 * @return
	 */
	public int updataInfo(HoseRecommendGroup hoseRecommendGroup) {
		return hoseRecommendGroupDAO.updataInfo(hoseRecommendGroup);
	}

	
}
