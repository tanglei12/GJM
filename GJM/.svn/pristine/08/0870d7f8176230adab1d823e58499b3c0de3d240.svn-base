package com.gjp.service;

import com.gjp.dao.HouseBookSourceDao;
import com.gjp.model.HouseBookSourceInfo;
import com.gjp.util.Pagination;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * 预约来源Service
 *
 * @author shenhx
 * 2017-03-14
 */
@Service
public class HouseBookSourceService {

    @Resource
    private HouseBookSourceDao houseBookSourceDao;

    /**
     * 添加预约配置来源信息
     *
     * @param houseBookSourceInfo
     * @return
     */
    public int addHouseBookSource(HouseBookSourceInfo houseBookSourceInfo) {
        return houseBookSourceDao.addHouseBookSource(houseBookSourceInfo);
    }

    /**
     * 删除预约配置来源信息
     *
     * @return
     */
    public int delHouseBookSource(int bs_id) {
        return houseBookSourceDao.delHouseBookSource(bs_id);
    }

    /**
     * 分页查询所有预约配置来源信息
     *
     * @return
     */
    public Pagination<HouseBookSourceInfo> queryHouseBookSourceForList(Pagination<HouseBookSourceInfo> pagination) {
        return houseBookSourceDao.queryHouseBookSourceForList(pagination);
    }

    /**
     * 分页查询所有预约配置来源信息数据条数
     *
     * @return
     */
    public int queryHouseBookSourceForCount(Pagination<HouseBookSourceInfo> pagination) {
        return houseBookSourceDao.queryHouseBookSourceForCount(pagination);
    }

    /**
     * 查询单个来源信息
     *
     * @return
     */
    public HouseBookSourceInfo queryHouseBookSourceById(int bs_id) {
        return houseBookSourceDao.queryHouseBookSourceById(bs_id);
    }

    /**
     * 修改预约来源信息
     *
     * @return
     */
    public int updateHouseBookSource(HouseBookSourceInfo houseBookSourceInfo) {
        return houseBookSourceDao.updateHouseBookSource(houseBookSourceInfo);
    }

    /**
     * 查询所有source数据
     *
     * @return
     */
    public List<HouseBookSourceInfo> queryBookSource() {
        return houseBookSourceDao.queryBookSource();
    }

    /**
     * 根据sourceId
     *
     * @param sourceId
     * @return
     */
    public HouseBookSourceInfo queryHouseBookSourceBySourceId(String sourceId) {
        return houseBookSourceDao.queryHouseBookSourceBySourceId(sourceId);
    }
}
