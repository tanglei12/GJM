package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.HouseInformationDAO;
import com.gjp.model.HouseInformation;
import com.gjp.model.HouseMapList;
import com.gjp.model.HouseMapWhere;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author 陈智颖
 * @create 2018-02-02 下午3:41
 **/
@Repository
public class HouseInformationDAOImpl extends BaseDAO implements HouseInformationDAO{
    @Override
    public List<HouseMapList> queryHouseMapList(HouseMapWhere houseMapWhere) {
        return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseInformationDAO.queryHouseMapList", houseMapWhere);
    }

    @Override
    public List<HouseInformation> selectMapHouseList(HouseInformation houseInformation) {
        return sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseInformationDAO.selectMapHouseList", houseInformation);
    }

    @Override
    public List<HouseInformation> queryHouseInformationMap(HouseMapWhere houseMapWhere) {
        return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseInformationDAO.queryHouseInformationMap", houseMapWhere);
    }
}
