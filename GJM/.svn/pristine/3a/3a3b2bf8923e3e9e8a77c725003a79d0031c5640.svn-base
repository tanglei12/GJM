package com.gjp.service;

import com.gjp.dao.HouseInformationStateRelationDAO;
import com.gjp.model.HouseInformationStateRelation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author 陈智颖
 * @create 2018-01-31 下午5:45
 **/
@Service
public class HouseInformationStateRelationService {

    @Autowired
    private HouseInformationStateRelationDAO stateRelationDAO;

    /**
     * 添加房屋类型关联表
     *
     * @param houseInformationStateRelation
     * @return
     *
     * @author 陈智颖
     */
    public Integer addHouseInformationStateRelation(HouseInformationStateRelation houseInformationStateRelation){
        return stateRelationDAO.addHouseInformationStateRelation(houseInformationStateRelation);
    }

    /**
     * 查询房屋状态
     *
     * @param houseInformationStateRelation
     * @return
     *
     * @author 陈智颖
     */
    public List<HouseInformationStateRelation> selectHouseInformationStateRelation(HouseInformationStateRelation houseInformationStateRelation){
        return stateRelationDAO.selectHouseInformationStateRelation(houseInformationStateRelation);
    }

    /**
     * 删除房屋类型关联表
     *
     * @return
     *
     * @author 陈智颖
     */
    public Integer deleteHouseInformationStateRelation(String hi_code){
        return stateRelationDAO.deleteHouseInformationStateRelation(hi_code);
    }

}
