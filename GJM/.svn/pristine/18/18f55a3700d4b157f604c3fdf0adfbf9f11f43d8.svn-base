package com.gjp.service;

import com.gjp.dao.HouseInformationDAO;
import com.gjp.dao.HousingAllocationDao;
import com.gjp.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * 房屋信息
 * @author tanglei
 * @description
 * @date Created in 2017/12/27
 */
@Service
public class HouseInformationService {

    @Resource
    private HousingAllocationDao housingAllocationDao;

    @Autowired
    private HouseInformationDAO houseInformationDAO;

    /**
     * 房屋信息
     * @Author tanglei
     */
    public HouseInformation queryHouseInformationSelect(HouseInformation houseInformation) {
        return housingAllocationDao.queryHouseInformationSelect(houseInformation);
    }

    /**
     * 房屋配置
     *
     * @param facility
     * @return
     */
    public List<Facility> queryHouseInformationFacility(Facility facility) {
        return housingAllocationDao.queryHouseInformationFacility(facility);
    }

    /**
     * 查询线上房源内容图片
     * @author tanglei
     */
    public List<HouseImage> queryHouseInformationImage(HouseImage houseImage) {
        return housingAllocationDao.queryHouseInformationImage(houseImage);
    }

    /**
     * 支付宝房源同步附件
     * @param rentHouseFileVo
     * @return
     */
    public int addRentHouseFile(RentHouseFileVo rentHouseFileVo){
        return housingAllocationDao.addRentHouseFile(rentHouseFileVo);
    }

    /**
     * 查询招租中的房源
     * @return
     */
    public List<ViewHouseLibraryInfoVo> queryHouseInformationKeepList(){
        return housingAllocationDao.queryHouseInformationKeepList();
    }

    /**
     * 地图搜房房源列表
     *
     * @param houseMapWhere
     * @return
     * @author 陈智颖
     * @date Jun 8, 2017 11:14:07 AM
     */
    public List<HouseInformation> queryHouseInformationMap(HouseMapWhere houseMapWhere) {
        return houseInformationDAO.queryHouseInformationMap(houseMapWhere);
    }

    /**
     * 地图搜房列表数据
     *
     * @author tanglei
     * @date 2017年8月23日 上午10:28:35
     */
    public List<HouseInformation> selectMapHouseList(HouseInformation houseInformation) {
        return houseInformationDAO.selectMapHouseList(houseInformation);
    }

    /**
     * 地图搜房
     *
     * @param
     * @return
     * @author 陈智颖
     * @create 8/18/17 1:33 PM
     **/
    public List<HouseMapList> queryHouseMapList(HouseMapWhere houseMapWhere) {
        return houseInformationDAO.queryHouseMapList(houseMapWhere);
    }
}
