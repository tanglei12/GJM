package com.gjp.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.gjp.dao.HouseLibraryDao;
import com.gjp.dao.PropertyTransferDao;
import com.gjp.model.*;
import com.gjp.util.AppConfig;
import com.gjp.util.AppException;
import com.gjp.util.AppUtil;
import com.gjp.util.Msg;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 物业交接单service
 *
 * @author zoe
 */
@Service
public class PropertyTransferService {

    private @Resource
    PropertyTransferDao propertyTransferDao;
    // 房源库service
    private @Resource
    HouseLibraryDao housingLibraryDao;
    // 合同对象
    private @Resource
    ContractService contractService;

    /**
     * 查询物业交接信息
     *
     * @param propertyMainVo
     * @return
     * @作者 JiangQT
     * @日期 2016年8月11日
     */
    public HandoverPropertyMainVo queryHandoverPropertyMain(HandoverPropertyMainVo propertyMainVo) {
        return propertyTransferDao.queryHandoverPropertyMain(propertyMainVo);
    }

    /**
     * 查询能源卡信息
     *
     * @param energyCardVo
     * @return
     * @作者 JiangQT
     * @日期 2016年8月11日
     */
    public List<HandoverPropertyEnergyCardVo> queryHandoverPropertyEnergyCardList(HandoverPropertyEnergyCardVo energyCardVo) {
        return propertyTransferDao.queryHandoverPropertyEnergyCardList(energyCardVo);
    }

    /**
     * 查询能源卡数值信息
     *
     * @param energyValueVo
     * @return
     * @作者 JiangQT
     * @日期 2016年8月11日
     */
    public List<HandoverPropertyEnergyValueVo> queryHandoverPropertyEnergyValueList(HandoverPropertyEnergyValueVo energyValueVo) {
        return propertyTransferDao.queryHandoverPropertyEnergyValueList(energyValueVo);
    }

    /**
     * 查询交接物品配置列表信息
     *
     * @param propertyGoodsVo
     * @return
     * @作者 JiangQT
     * @日期 2016年8月11日
     */
    public List<HandoverPropertyGoodsVo> queryHandoverPropertyGoodsList(HandoverPropertyGoodsVo propertyGoodsVo) {
        return propertyTransferDao.queryHandoverPropertyGoodsList(propertyGoodsVo);
    }

    /**
     * 查询交接装饰情况信息
     *
     * @param propertyDecorationVo
     * @return
     * @作者 JiangQT
     * @日期 2016年8月11日
     */
    public List<HandoverPropertyDecorationVo> queryHandoverPropertyDecorationList(HandoverPropertyDecorationVo propertyDecorationVo) {
        return propertyTransferDao.queryHandoverPropertyDecorationList(propertyDecorationVo);
    }

    /**
     * 添加物业交接单
     *
     * @param propertyMainNew
     * @return
     * @作者 JiangQT
     * @日期 2016年8月14日
     */
    public boolean addHandoverPropertyMain(HandoverPropertyMainVo propertyMainNew) {
        return propertyTransferDao.addHandoverPropertyMain(propertyMainNew) > 0;
    }

    /**
     * 更新物业交接单
     *
     * @return
     * @作者 JiangQT
     * @日期 2016年8月14日
     */
    public boolean updateHandoverPropertyMain(HandoverPropertyMainVo propertyMain) {
        return propertyTransferDao.updateHandoverPropertyMain(propertyMain) > 0;
    }

    /**
     * 删除能源卡信息
     *
     * @作者 JiangQT
     * @日期 2016年8月14日
     */
    public boolean deleteHandPropertyEnergyCard(String hi_code) {
        HandoverPropertyEnergyCardVo propertyEnergyCardVo = new HandoverPropertyEnergyCardVo();
        propertyEnergyCardVo.setHi_code(hi_code);
        return propertyTransferDao.deleteHandPropertyEnergyCard(propertyEnergyCardVo) > 0;
    }

    /**
     * 删除能源卡信息
     *
     * @作者 JiangQT
     * @日期 2016年8月14日
     */
    public boolean deleteHandPropertyEnergyCard(HandoverPropertyEnergyCardVo propertyEnergyCardVo) {
        return propertyTransferDao.deleteHandPropertyEnergyCard(propertyEnergyCardVo) > 0;
    }

    /**
     * 删除能源卡数值信息
     *
     * @return
     * @作者 JiangQT
     * @日期 2016年8月15日
     */
    public boolean deleteHandPropertyEnergyValue(HandoverPropertyEnergyValueVo propertyEnergyValueVo) {
        return propertyTransferDao.deleteHandPropertyEnergyValue(propertyEnergyValueVo) > 0;
    }

    /**
     * 删除能源卡数值信息
     *
     * @param hpm_id
     * @return
     * @作者 JiangQT
     * @日期 2016年8月15日
     */
    public boolean deleteHandPropertyEnergyValue(Integer hpm_id) {
        HandoverPropertyEnergyValueVo propertyEnergyValueVo = new HandoverPropertyEnergyValueVo();
        propertyEnergyValueVo.setHpm_id(hpm_id);
        return propertyTransferDao.deleteHandPropertyEnergyValue(propertyEnergyValueVo) > 0;
    }

    /**
     * 添加能源卡信息
     *
     * @param propertyEnergyCardVo
     * @return
     * @作者 JiangQT
     * @日期 2016年8月15日
     */
    public boolean addHandPropertyEnergyCard(HandoverPropertyEnergyCardVo propertyEnergyCardVo) {
        return propertyTransferDao.addHandPropertyEnergyCard(propertyEnergyCardVo) > 0;
    }

    /**
     * 删除交接物品
     *
     * @param hpm_id
     * @return
     * @作者 JiangQT
     * @日期 2016年8月15日
     */
    public boolean deleteHandPropertyGoods(Integer hpm_id) {
        HandoverPropertyGoodsVo propertyGoodsVo = new HandoverPropertyGoodsVo();
        propertyGoodsVo.setHpm_id(hpm_id);
        return propertyTransferDao.deleteHandPropertyGoods(propertyGoodsVo) > 0;
    }

    /**
     * 删除交接物品
     *
     * @param propertyGoodsVo
     * @return
     * @作者 JiangQT
     * @日期 2016年8月15日
     */
    public boolean deleteHandPropertyGoods(HandoverPropertyGoodsVo propertyGoodsVo) {
        return propertyTransferDao.deleteHandPropertyGoods(propertyGoodsVo) > 0;
    }

    /**
     * 删除物品装饰情况数据
     *
     * @param hpm_id
     * @return
     * @作者 JiangQT
     * @日期 2016年8月15日
     */
    public boolean deleteHandPropertyDecoration(Integer hpm_id) {
        HandoverPropertyDecorationVo propertyDecorationVo = new HandoverPropertyDecorationVo();
        propertyDecorationVo.setHpm_id(hpm_id);
        return propertyTransferDao.deleteHandPropertyDecoration(propertyDecorationVo) > 0;
    }

    /**
     * 删除物品装饰情况数据
     *
     * @param hpm_id
     * @return
     * @作者 JiangQT
     * @日期 2016年8月15日
     */
    public boolean deleteHandPropertyDecoration(HandoverPropertyDecorationVo propertyDecorationVo) {
        return propertyTransferDao.deleteHandPropertyDecoration(propertyDecorationVo) > 0;
    }

    /**
     * 添加能源卡数值
     *
     * @param propertyEnergyValueVo
     * @return
     * @作者 JiangQT
     * @日期 2016年8月15日
     */
    public boolean addHandPropertyEnergyValue(HandoverPropertyEnergyValueVo propertyEnergyValueVo) {
        return propertyTransferDao.addHandPropertyEnergyValue(propertyEnergyValueVo) > 0;
    }

    /**
     * 添加交接物品
     *
     * @param propertyGoodsVo
     * @return
     * @作者 JiangQT
     * @日期 2016年8月15日
     */
    public boolean addHandPropertyGoods(HandoverPropertyGoodsVo propertyGoodsVo) {
        return propertyTransferDao.addHandPropertyGoods(propertyGoodsVo) > 0;
    }

    /**
     * 添加交接装饰情况
     *
     * @param propertyDecorationVo
     * @return
     * @作者 JiangQT
     * @日期 2016年8月15日
     */
    public boolean addHandPropertyDecoration(HandoverPropertyDecorationVo propertyDecorationVo) {
        return propertyTransferDao.addHandPropertyDecoration(propertyDecorationVo) > 0;
    }

    /**
     * 查询能源卡信息
     *
     * @param energyCardVo
     * @return
     * @作者 JiangQT
     * @日期 2016年8月16日
     */
    public List<HandoverPropertyEnergyCardVo> queryHandoverPropertyEnergyCardValueList(HandoverPropertyEnergyCardVo energyCardVo) {
        return propertyTransferDao.queryHandoverPropertyEnergyCardValueList(energyCardVo);
    }

    /**
     * 更新物业能源卡数据
     *
     * @param energyCardVo2
     * @return
     * @作者 JiangQT
     * @日期 2016年8月30日
     */
    public boolean updateHandoverPropertyEnergyCard(HandoverPropertyEnergyCardVo energyCardVo) {
        return propertyTransferDao.updateHandoverPropertyEnergyCard(energyCardVo) > 0;
    }

    /**
     * 更新物业交接状态
     *
     * @param propertyMain
     * @return
     * @作者 JiangQT
     * @日期 2016年10月5日
     */
    public boolean updateHandoverPropertyMainForState(HandoverPropertyMainVo propertyMain) {
        return propertyTransferDao.updateHandoverPropertyMainForState(propertyMain) > 0;
    }

    /**
     * 【业务操作】编辑物业交接
     *
     * @param data
     * @param employee
     * @return
     * @throws Exception
     * @作者 JiangQT
     * @日期 2017年4月8日
     */
    public Msg<Object> editPropertyHandover(Map<String, Object> data, UserCenterEmployee employee) throws Exception {
        Msg<Object> msg = new Msg<>();
        final String mode = (String) data.get("mode");
        boolean boo = false;

        // 【1.0 交接单】
        HandoverPropertyMainVo propertyMainNew = JSONObject.parseObject((String) data.get("handoverMain"), HandoverPropertyMainVo.class);
        // 查询合同信息
        ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
        contractVo.setContractObject_Code(propertyMainNew.getContractObject_code());
        contractVo = contractService.selectContractObjectByCNo(contractVo);
        if (contractVo == null) {
            throw new AppException("没有发现该合同信息，提交失败");
        }
        // 判断合约状态是否符合修改
        BusinessCancelContractOrder businessCancelContractOrder = new BusinessCancelContractOrder();
        if ("compary".equals(mode)) {
            businessCancelContractOrder.setContractObject_Code(propertyMainNew.getContractObject_code());
            businessCancelContractOrder.setCco_state_no(AppConfig.CANCEL_CONTRACT_STATE_7);
            businessCancelContractOrder = contractService.queryCancelContractByWhere(businessCancelContractOrder);
            if (businessCancelContractOrder != null) {
                if (AppConfig.CANCEL_CONTRACT_STATE_1.equals(businessCancelContractOrder.getCco_state())
                        || AppConfig.CANCEL_CONTRACT_STATE_4.equals(businessCancelContractOrder.getCco_state())
                        || AppConfig.CANCEL_CONTRACT_STATE_5.equals(businessCancelContractOrder.getCco_state())
                        || AppConfig.CANCEL_CONTRACT_STATE_6.equals(businessCancelContractOrder.getCco_state())
                        || AppConfig.CANCEL_CONTRACT_STATE_7.equals(businessCancelContractOrder.getCco_state())) {
                    throw new AppException("该招租订单状态为[" + businessCancelContractOrder.getCco_state() + "]，不能修改物业交接");
                }
            }
        }

        // 查询交接单是否存在
        HandoverPropertyMainVo propertyMainOld = new HandoverPropertyMainVo();
        propertyMainOld.setContractObject_code(propertyMainNew.getContractObject_code());
        if (AppConfig.TYPE_CONTRACT_201.equals(contractVo.getContractObject_Type())) {
            propertyMainOld.setHpm_type(0);
        }
        if (AppConfig.TYPE_CONTRACT_202.equals(contractVo.getContractObject_Type())) {
            propertyMainOld.setHpm_type(1);
        }
        propertyMainOld = this.queryHandoverPropertyMain(propertyMainOld);
        //
        if (propertyMainOld == null) {
            if (AppConfig.TYPE_CONTRACT_201.equals(contractVo.getContractObject_Type())) {
                propertyMainNew.setHpm_type(0);
            }
            if (AppConfig.TYPE_CONTRACT_202.equals(contractVo.getContractObject_Type())) {
                propertyMainNew.setHpm_type(1);
            }
            propertyMainNew.setHpm_code(AppUtil.getOrderCode("HOP"));
            propertyMainNew.setHi_code(contractVo.getHi_code());
            propertyMainNew.setHpm_state(0);
            propertyMainNew.setHpm_createTime(new Date());
            boo = this.addHandoverPropertyMain(propertyMainNew);
            // 添加执行记录
            contractService.addContractRecord(propertyMainNew.getContractObject_code(), "添加物业交接", employee.getEm_name());
        } else {
            propertyMainNew.setHpm_id(propertyMainOld.getHpm_id());
            boo = this.updateHandoverPropertyMain(propertyMainNew);
            // 添加执行记录
            contractService.addContractRecord(propertyMainNew.getContractObject_code(), "更新物业交接", employee.getEm_name());
        }

        if (!boo) {
            throw new AppException("数据添加失败");
        }

        // 【2.0钥匙库】
        houseKeyVo houseKeyVo = JSONObject.parseObject((String) data.get("houseKey"), houseKeyVo.class);

        // 2.1 查询旧钥匙数据
        houseKeyVo houseKeyOld = new houseKeyVo();
        houseKeyOld.setHi_code(contractVo.getHi_code());
        houseKeyOld = housingLibraryDao.queryHouseKeyInfo(houseKeyOld);

        // if (StringUtils.isEmpty(mode) || "normal".equals(mode)) {
        houseKeyVo.setHi_code(contractVo.getHi_code());
        if (houseKeyOld == null) { // 没有就添加
            houseKeyVo.setHk_number(houseKeyVo.getHk_newNumber());
            houseKeyVo.setHk_code(AppUtil.getOrderCode("KEY"));
            houseKeyVo.setHk_createTime(new Date());
            boo = housingLibraryDao.addHouseKey(houseKeyVo) > 0;
        } else { // 有就修改
            houseKeyVo.setHk_id(houseKeyOld.getHk_id());
            boo = housingLibraryDao.updateHouseKey(houseKeyVo) > 0;
        }
        // } else {
        //
        // }

        // 【3.0能源卡号】【4.0能源卡数值】
        List<HandoverPropertyEnergyCardVo> handoverEnergyCardList = JSONArray.parseArray((String) data.get("handoverEnergyCardList"), HandoverPropertyEnergyCardVo.class);

        // 正常交接模式
        // if (StringUtils.isEmpty(mode) || "normal".equals(mode)) {
        // 托管交接
        if (AppConfig.TYPE_CONTRACT_201.equals(contractVo.getContractObject_Type())) {
            // 3.1 删除旧数据
            this.deleteHandPropertyEnergyCard(contractVo.getHi_code());
            // 4.1 删除旧数据
            this.deleteHandPropertyEnergyValue(propertyMainNew.getHpm_id());

            for (HandoverPropertyEnergyCardVo propertyEnergyCardVo : handoverEnergyCardList) {
                propertyEnergyCardVo.setHi_code(contractVo.getHi_code());
                propertyEnergyCardVo.setHpec_createTime(new Date());
                propertyEnergyCardVo.setHpec_number(propertyEnergyCardVo.getHpec_newNumber());
                this.addHandPropertyEnergyCard(propertyEnergyCardVo);

                String hpec_type = propertyEnergyCardVo.getHpec_type();
                if ("水".equals(hpec_type) || "电".equals(hpec_type) || "气".equals(hpec_type)) {
                    HandoverPropertyEnergyValueVo propertyEnergyValueVo = new HandoverPropertyEnergyValueVo();
                    propertyEnergyValueVo.setHpv_type(propertyEnergyCardVo.getHpec_type());
                    propertyEnergyValueVo.setHpm_id(propertyMainNew.getHpm_id());
                    propertyEnergyValueVo.setHpv_start(propertyEnergyCardVo.getHpv_start());
                    propertyEnergyValueVo.setHpv_end(propertyEnergyCardVo.getHpv_end());
                    this.addHandPropertyEnergyValue(propertyEnergyValueVo);
                }
            }
        }
        // 租赁交接
        if (AppConfig.TYPE_CONTRACT_202.equals(contractVo.getContractObject_Type())) {
            // 更新卡号
            HandoverPropertyEnergyCardVo energyCardVo = new HandoverPropertyEnergyCardVo();
            energyCardVo.setHi_code(contractVo.getHi_code());
            List<HandoverPropertyEnergyCardVo> energyCardList = this.queryHandoverPropertyEnergyCardList(energyCardVo);
            if (energyCardList.isEmpty()) {
                for (HandoverPropertyEnergyCardVo propertyEnergyCardVo : handoverEnergyCardList) {
                    propertyEnergyCardVo.setHi_code(contractVo.getHi_code());
                    propertyEnergyCardVo.setHpec_number(propertyEnergyCardVo.getHpec_newNumber());
                    propertyEnergyCardVo.setHpec_createTime(new Date());
                    this.addHandPropertyEnergyCard(propertyEnergyCardVo);
                }
            } else {
                for (HandoverPropertyEnergyCardVo energyCardVo0 : energyCardList) {
                    for (HandoverPropertyEnergyCardVo energyCardVo1 : handoverEnergyCardList) {
                        HandoverPropertyEnergyCardVo energyCardVo2 = new HandoverPropertyEnergyCardVo();
                        energyCardVo2.setHpec_id(energyCardVo0.getHpec_id());
                        energyCardVo2.setHpec_type(energyCardVo1.getHpec_type());
                        energyCardVo2.setHpec_newNumber(energyCardVo1.getHpec_newNumber());
                        this.updateHandoverPropertyEnergyCard(energyCardVo2);
                    }
                }
            }

            // 4.1 删除旧数据
            this.deleteHandPropertyEnergyValue(propertyMainNew.getHpm_id());
            for (HandoverPropertyEnergyCardVo propertyEnergyCardVo : handoverEnergyCardList) {
                String hpec_type = propertyEnergyCardVo.getHpec_type();
                if ("水".equals(hpec_type) || "电".equals(hpec_type) || "气".equals(hpec_type)) {
                    HandoverPropertyEnergyValueVo propertyEnergyValueVo = new HandoverPropertyEnergyValueVo();
                    propertyEnergyValueVo.setHpv_type(propertyEnergyCardVo.getHpec_type());
                    propertyEnergyValueVo.setHpm_id(propertyMainNew.getHpm_id());
                    propertyEnergyValueVo.setHpv_start(propertyEnergyCardVo.getHpv_start());
                    propertyEnergyValueVo.setHpv_end(propertyEnergyCardVo.getHpv_end());
                    this.addHandPropertyEnergyValue(propertyEnergyValueVo);
                }
            }
        }
        // } else {
        //
        // }

        // 【5.0 物品交接】
        List<HandoverPropertyGoodsVo> handoverGoodsList = JSONArray.parseArray((String) data.get("handoverGoodsList"), HandoverPropertyGoodsVo.class);
        // 5.1 删除旧数据
        this.deleteHandPropertyGoods(propertyMainNew.getHpm_id());
        for (HandoverPropertyGoodsVo propertyGoodsVo : handoverGoodsList) {
            propertyGoodsVo.setHpm_id(propertyMainNew.getHpm_id());
            propertyGoodsVo.setHpg_createTime(new Date());
            this.addHandPropertyGoods(propertyGoodsVo);
        }

        // 【6.0 装饰交接】
        List<HandoverPropertyDecorationVo> handoverDecoList = JSONArray.parseArray((String) data.get("handoverDecoList"), HandoverPropertyDecorationVo.class);
        if (handoverDecoList != null) {
            this.deleteHandPropertyDecoration(propertyMainNew.getHpm_id());
            for (HandoverPropertyDecorationVo propertyDecorationVo : handoverDecoList) {
                propertyDecorationVo.setHpm_id(propertyMainNew.getHpm_id());
                propertyDecorationVo.setHpd_createTime(new Date());
                this.addHandPropertyDecoration(propertyDecorationVo);
            }
        }

        // 【7.0 添置物品】
        if ("compary".equals(mode)) {
            // 【8.0 合约状态】
            if (businessCancelContractOrder != null) {
                BusinessCancelContractOrder cancelContractOrder = new BusinessCancelContractOrder();
                cancelContractOrder.setCco_code(businessCancelContractOrder.getCco_code());
                cancelContractOrder.setCco_state(AppConfig.CANCEL_CONTRACT_STATE_3);
                contractService.updateCancelContractOrder(cancelContractOrder);
            }
        }
        return msg;
    }

}
