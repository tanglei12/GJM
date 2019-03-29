package com.gjp.service;

import com.gjp.dao.HouseInformationStateDAO;
import com.gjp.dao.HouseInformationStateRelationDAO;
import com.gjp.model.HouseInfoKeep;
import com.gjp.model.HouseInformationState;
import com.gjp.model.HouseInformationStateRelation;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2016年7月1日 下午4:18:08
 */
@Service
public class HouseInformationStateService {

	public Integer insertHouseInformationState(HouseInformationState houseInformationState) {

		return houseInformationStateDAO.addHouseInformationState(houseInformationState);
	}

	public List<HouseInformationState> selectHouseInformationStateSpid() {
		return houseInformationStateDAO.selectHouseInformationStateSpid();
	}

	/**
	 * 添加意向房源的品牌关联表信息
	 * 
	 * @author zoe
	 * @param houseInformationStateRelation
	 * @return
	 */
	public String addHouseInformationStateRelation(HouseInformationStateRelation houseInformationStateRelation) {
		String str = "success";
		if(houseInformationStateRelation.getHis_id() == 1){
			HouseInformationStateRelation houseInformationStateRelation1 = new HouseInformationStateRelation();
			houseInformationStateRelation1.setHi_code(houseInformationStateRelation.getHi_code());
			houseInformationStateRelation1.setHis_id(1);
			houseInformationStateRelationDAO.addHouseInformationStateRelation(houseInformationStateRelation1);
			HouseInformationStateRelation houseInformationStateRelation2 = new HouseInformationStateRelation();
			houseInformationStateRelation2.setHi_code(houseInformationStateRelation.getHi_code());
			houseInformationStateRelation2.setHis_id(3);
			houseInformationStateRelationDAO.addHouseInformationStateRelation(houseInformationStateRelation2);
			HouseInformationStateRelation houseInformationStateRelation3 = new HouseInformationStateRelation();
			houseInformationStateRelation3.setHi_code(houseInformationStateRelation.getHi_code());
			houseInformationStateRelation3.setHis_id(7);
			houseInformationStateRelationDAO.addHouseInformationStateRelation(houseInformationStateRelation3);
			HouseInformationStateRelation houseInformationStateRelation4 = new HouseInformationStateRelation();
			houseInformationStateRelation4.setHi_code(houseInformationStateRelation.getHi_code());
			houseInformationStateRelation4.setHis_id(8);
			houseInformationStateRelationDAO.addHouseInformationStateRelation(houseInformationStateRelation4);
		}else{
			HouseInformationStateRelation houseInformationStateRelation1 = new HouseInformationStateRelation();
			houseInformationStateRelation1.setHi_code(houseInformationStateRelation.getHi_code());
			houseInformationStateRelation1.setHis_id(2);
			houseInformationStateRelationDAO.addHouseInformationStateRelation(houseInformationStateRelation1);
			HouseInformationStateRelation houseInformationStateRelation2 = new HouseInformationStateRelation();
			houseInformationStateRelation2.setHi_code(houseInformationStateRelation.getHi_code());
			houseInformationStateRelation2.setHis_id(5);
			houseInformationStateRelationDAO.addHouseInformationStateRelation(houseInformationStateRelation2);
			HouseInformationStateRelation houseInformationStateRelation3 = new HouseInformationStateRelation();
			houseInformationStateRelation3.setHi_code(houseInformationStateRelation.getHi_code());
			houseInformationStateRelation3.setHis_id(11);
			houseInformationStateRelationDAO.addHouseInformationStateRelation(houseInformationStateRelation3);
			HouseInformationStateRelation houseInformationStateRelation4 = new HouseInformationStateRelation();
			houseInformationStateRelation4.setHi_code(houseInformationStateRelation.getHi_code());
			houseInformationStateRelation4.setHis_id(12);
			houseInformationStateRelationDAO.addHouseInformationStateRelation(houseInformationStateRelation4);
		}
		return str;
	}

	// 房屋类型
	@Resource
	private HouseInformationStateDAO houseInformationStateDAO;

	// 房屋关系
	@Resource
	private HouseInformationStateRelationDAO houseInformationStateRelationDAO;

	public Map<String, Object> addHouseHouseInformationType() {

		Map<String, Object> map = new HashMap<>();

		List<HouseInfoKeep> selectHouseInfoKeep = houseInformationStateDAO
				.selectHouseHouseInformationKeep();

		for (HouseInfoKeep houseInfoKeep : selectHouseInfoKeep) {
			HouseInformationStateRelation houseInformationStateRelation = new HouseInformationStateRelation();
			if (houseInfoKeep.getHb_id() == null || houseInfoKeep.getHb_id() == 2) {
				houseInformationStateRelation.setHi_code(houseInfoKeep.getHi_code());
				houseInformationStateRelation.setHis_id(2);
				houseInformationStateRelationDAO.addHouseInformationStateRelation(houseInformationStateRelation);
				houseInformationStateRelation.setHis_id(5);
				houseInformationStateRelationDAO.addHouseInformationStateRelation(houseInformationStateRelation);
				houseInformationStateRelation.setHis_id(11);
				houseInformationStateRelationDAO.addHouseInformationStateRelation(houseInformationStateRelation);
				houseInformationStateRelation.setHis_id(12);
				houseInformationStateRelationDAO.addHouseInformationStateRelation(houseInformationStateRelation);
			} else {
				houseInformationStateRelation.setHi_code(houseInfoKeep.getHi_code());
				houseInformationStateRelation.setHis_id(1);
				houseInformationStateRelationDAO.addHouseInformationStateRelation(houseInformationStateRelation);
				houseInformationStateRelation.setHis_id(3);
				houseInformationStateRelationDAO.addHouseInformationStateRelation(houseInformationStateRelation);
				houseInformationStateRelation.setHis_id(7);
				houseInformationStateRelationDAO.addHouseInformationStateRelation(houseInformationStateRelation);
				houseInformationStateRelation.setHis_id(8);
				houseInformationStateRelationDAO.addHouseInformationStateRelation(houseInformationStateRelation);
			}
		}

		return map;
	}
}
