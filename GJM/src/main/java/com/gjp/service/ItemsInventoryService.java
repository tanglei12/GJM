package com.gjp.service;

import com.gjp.dao.*;
import com.gjp.model.*;
import com.gjp.util.Randoms;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author 陈智颖
 * @version 创建时间：2016年3月4日 上午10:44:50
 */
@Service
public class ItemsInventoryService {
    // 物品库存
    @Resource
    private ItemsInventoryDAO itemsInventoryDAO;
    // 物品类型
    @Resource
    private HouseLibraryDao housingLibraryDao;
    //物品账单
    @Resource
    private ItemsBillDAO itemsBillDAO;
    //物品存放记录
    @Resource
    private ItemsStorageRecordDAO itemsStorageRecordDAO;
    //物品关系
    @Resource
    private ItemsRelationDAO itemsRelationDAO;

    /**
     * 查询物品库存List
     *
     * @return
     * @author zoe
     */
    public List<ItemsInventory> selectItemsInventoryList(ItemsInventory itemsInventory) {
        return itemsInventoryDAO.selectItemsInventoryList(itemsInventory);
    }

    /**
     * 查询物品库存List总数量
     *
     * @param itemsInventory
     * @return
     */
    public int selectItemsInventoryCount(ItemsInventory itemsInventory) {

        return itemsInventoryDAO.selectItemsInventoryCount(itemsInventory);
    }


    /**
     * 物品库添加物品
     *
     * @param itemsInventory
     * @return
     * @author zoe
     */
    public int addItemsInventoryOne(ItemsInventory itemsInventory) {
        Integer count = 0;
        itemsInventory.setInv_createTime(new Date());// 创建时间
        for (int i = 0; i < itemsInventory.getInv_count(); i++) {
            itemsInventory.setInv_code(getItemsCode());// 物品库唯一编码
            count = count + itemsInventoryDAO.addItemsInventoryOne(itemsInventory);
        }
        return count;
    }


    /**
     * 物品账单添加
     *
     * @param itemsBill
     * @return
     */
    public int addItemsBillOne(ItemsBill itemsBill) {
        return itemsBillDAO.addItemsBillOne(itemsBill);
    }

    /**
     * 物品存放记录添加
     *
     * @param itemsStorageRecord
     * @return
     */
    public int addItemsStorageRecordOne(ItemsStorageRecord itemsStorageRecord) {
        return itemsStorageRecordDAO.addItemsStorageRecordOne(itemsStorageRecord);
    }

    /**
     * 物品账单List
     *
     * @param itemsBill
     * @return
     */
    public List<ItemsBill> selectItemsBillList(ItemsBill itemsBill) {

        return itemsBillDAO.selectItemsBillList(itemsBill);
    }

    /**
     * 物品账单数量
     *
     * @param itemsBill
     * @return
     */
    public int selectItemsBillCount(ItemsBill itemsBill) {

        return itemsBillDAO.selectItemsBillCount(itemsBill);
    }

    /**
     * 查询物品某类型下的物品List
     *
     * @param itemsInventory
     * @return
     */
    public List<ItemsInventory> selectItemsInvtoryStateInvName(ItemsInventory itemsInventory) {
        return itemsInventoryDAO.selectItemsInvtoryStateInvType(itemsInventory);
    }

    /**
     * 查询物品某类型下的物品数量
     *
     * @param itemsInventory
     * @return
     */
    public int selectItemsInvtoryStateInvNameCount(ItemsInventory itemsInventory) {
        return itemsInventoryDAO.selectItemsInvtoryStateInvTypeCount(itemsInventory);
    }

    /**
     * 查询物品类型的一级目录
     *
     * @return
     * @author zoe
     */
    public Map<String, Object> selectHouseTypeHtParentID2() {
        Map<String, Object> map = new HashMap<>();
        // 查询物品类型（家具/家电）1级目录
        List<HouseTypeVo> houseTypeList = housingLibraryDao.selectHouseTypeHtParentID2();
        map.put("houseTypeList2", houseTypeList);
        return map;
    }

    /**
     * 查询物品类型的2级目录
     *
     * @return
     * @author zoe
     */
    public Map<String, Object> selectHouseTypeHtParentID3(HouseTypeVo houseTypeVo) {
        Map<String, Object> map = new HashMap<>();
        // 查询物品类型（家具/家电）1级目录
        List<HouseTypeVo> houseTypeList = housingLibraryDao.queryHouseConfigTypeList(houseTypeVo);
        map.put("houseTypeList3", houseTypeList);
        return map;
    }

    /**
     * 生成库存物品Code；RES + 时间戳 + 随机数4位
     *
     * @return
     * @author zoe
     */
    public String getItemsCode() {
        StringBuffer str = new StringBuffer();
        str.append("RES");// 物品库开头
        String date = new Date().getTime() + "";
        str.append(date);
        str.append(Randoms.random());
        return str.toString();
    }

    /**
     * 物品关系添加
     *
     * @param itemsRelation
     * @return
     */
    public int addItemsRelationOne(ItemsRelation itemsRelation) {
        return itemsRelationDAO.addItemsRelationOne(itemsRelation);
    }


    /**
     * 查询库存物品
     *
     * @param itemsInventoryVo
     * @return
     * @作者 JiangQT
     * @日期 2016年8月15日
     */
    public List<ViewItemsInventoryVo> queryViewItemsInventoryList(ViewItemsInventoryVo itemsInventoryVo) {
        return itemsInventoryDAO.queryViewItemsInventoryList(itemsInventoryVo);
    }


    /**
     * 修改物品库存状态
     *
     * @param itemsInventory
     * @return
     */
    public int updateItemsInventory(ItemsInventory itemsInventory) {
        return itemsInventoryDAO.updateItemsInventory(itemsInventory);
    }

    /**
     * 查询房屋/合同物品List
     *
     * @param itemsRelation
     * @return
     */
    public List<ItemsRelation> selectItemsRelationList(ItemsRelation itemsRelation) {

        return itemsRelationDAO.selectItemsRelationList(itemsRelation);
    }

    /**
     * 根据房屋code查询单个物品信息
     *
     * @param itemsInventory
     * @return
     */
    public ItemsInventory selectItemsInventoryOne(ItemsInventory itemsInventory) {
        return itemsInventoryDAO.selectItemsInventoryOne(itemsInventory);
    }

    /**
     * 物品解绑
     *
     * @param itemsRelation
     * @return
     */
    public int updateItemsRelationState(ItemsRelation itemsRelation) {
        return itemsRelationDAO.updateItemsInventoryState(itemsRelation);
    }

    /**
     * 添加宽带
     *
     * @param broadbandConfigVo
     * @return
     */
    public int insertBroadbandConfig(BroadbandConfigVo broadbandConfigVo) {
        return itemsRelationDAO.insertBroadbandConfig(broadbandConfigVo);
    }


    /**
     * 修改宽带
     *
     * @param broadbandConfigVo
     * @return
     */
    public int updateBroadbandConfig(BroadbandConfigVo broadbandConfigVo) {
        return itemsRelationDAO.updateBroadbandConfig(broadbandConfigVo);
    }


    /**
     * 获取宽带配置
     *
     * @param broadbandConfigVo
     * @return
     */
    public BroadbandConfigVo selectInitBroadbandConfig(BroadbandConfigVo broadbandConfigVo) {
        return itemsRelationDAO.selectInitBroadbandConfig(broadbandConfigVo);
    }

    /**
     * 获取房屋和合同下的有效保险
     *
     * @param insuranceVo
     * @return
     */
    public List<InsuranceVo> selectInsurance(InsuranceVo insuranceVo) {
        return itemsRelationDAO.selectInsurance(insuranceVo);
    }

    /**
     * 查询保险根据id
     * @param insuranceVo
     * @return
     */
    public InsuranceVo selectInsuranceById(InsuranceVo insuranceVo) {
        return itemsRelationDAO.selectInsuranceById(insuranceVo);
    }



    /**
     * 查询保险根据条件
     * @param insuranceVo
     * @return
     */
    public List<InsuranceVo> selectInsuranceByWhere(InsuranceVo insuranceVo) {
        return itemsRelationDAO.selectInsuranceByWhere(insuranceVo);
    }

    public List<InsuranceVo> selectInsuranceAndAddres(InsuranceVo insuranceVo) {
        return itemsRelationDAO.selectInsuranceAndAddres(insuranceVo);
    }


    /**
     * 录入保单（新建录入）
     *
     * @param insuranceVo
     * @return
     */
    public int insertInsurance(InsuranceVo insuranceVo) {
        return itemsRelationDAO.insertInsurance(insuranceVo);
    }


    /**
     * 录入保单（批改录入）
     *
     * @param insuranceVo
     * @throws Exception
     */
    public void updInsurance(InsuranceVo insuranceVo, Integer i_idf) throws Exception {
        //录入保单
        insuranceVo.setI_isCorrections(0);
        itemsRelationDAO.insertInsurance(insuranceVo);
        //List<InsuranceVo> insuranceVos = itemsRelationDAO.selectInsurance(insuranceVo);

        //修改源保单的(目的保单字段）
        InsuranceVo insuranceVo1 = new InsuranceVo();
        insuranceVo1.setI_id(i_idf);
        insuranceVo1.setI_isCorrections(1);
        insuranceVo1.setI_insuranceNumberTarget(insuranceVo.getI_insuranceNumber());

        itemsRelationDAO.updateInsurance(insuranceVo1);
    }


    /**
     * 修改保单
     * @param insuranceVo
     * @throws Exception
     */
    public  void  SubmitUpdataInsurance(InsuranceVo insuranceVo) throws Exception{
        itemsRelationDAO.updateInsurance(insuranceVo);
    }
}
