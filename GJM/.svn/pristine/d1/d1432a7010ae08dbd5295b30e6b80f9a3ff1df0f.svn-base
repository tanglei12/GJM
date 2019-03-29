package com.gjp.controller;

import com.gjp.model.*;
import com.gjp.service.ContractService;
import com.gjp.service.HouseLibraryService;
import com.gjp.service.PropertyTransferService;
import com.gjp.service.UserCenterEmployeeService;
import com.gjp.util.AppConfig;
import com.gjp.util.AppException;
import com.gjp.util.AppUtil;
import com.gjp.util.Msg;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 库存房屋交接
 *
 * @author ZOE
 */
@Controller
@RequestMapping("/transferKeep")
public class HouseTransferKeepController {

    // 房源库service
    private @Resource
    HouseLibraryService houseLibraryService;
    // 房屋交接
    private @Resource
    PropertyTransferService propertyTransferService;
    // 合同对象
    private @Resource
    ContractService contractObjectService;
    // 合同对象
    private @Resource
    UserCenterEmployeeService employeeService;

    /**
     * 招租申请--2.0 跳转物业交接
     */
    @RequestMapping("/transfer")
    public ModelAndView transfer() {
        return new ModelAndView("/transfer/itemTransfer");
    }

    /**
     * 招租申请--2.1 提交物业交接
     *
     * @param data
     * @return
     * @作者 JiangQT
     * @日期 2016年8月24日
     */
    @RequestMapping("/transferSubmit")
    @ResponseBody
    public String transferSubmit(@RequestBody Map<String, Object> data) {
        Msg<Object> msg = new Msg<>();
        try {
            UserCenterEmployee employee = AppUtil.getCookieEmployee();
            if (employee == null) {
                return msg.toString(110, Msg.MSG_LOGIN_ERROR);
            }
            msg = propertyTransferService.editPropertyHandover(data, employee);
        } catch (AppException e) {
            e.printStackTrace();
            return msg.toError(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return msg.toError(Msg.MSG_SYSTEM_ERROR);
        }
        return msg.toString();
    }

    /**
     * 查询交接信息
     *
     * @param mode
     * @return
     * @author JiangQT
     */
    @RequestMapping("/queryTransferInfo")
    @ResponseBody
    public String queryTransferInfo(String con_code, String mode, Integer em_id) {
        Msg<Object> msg = new Msg<>();
        HashMap<Object, Object> map = new HashMap<>();

        // 【0.0 查询合同信息】
        ViewBusinessContractVo businessContractVo = new ViewBusinessContractVo();
        businessContractVo.setContractObject_Code(con_code);
        businessContractVo = contractObjectService.selectContractObjectByCNo(businessContractVo);
        if (businessContractVo == null) {
            return msg.toString(110, "没有发现该合同信息，无法进行交接");
        }
        map.put("contract", businessContractVo);

        // 【管家数据】
        UserCenterEmployee employee = new UserCenterEmployee();
        employee.setEm_id(em_id);
        employee = employeeService.queryEmployeeInfo(employee);
        map.put("employee", employee);

        // 物业交接模式：[ID:房东TO公司,SID:公司TO租客,PID:租客TO租客]
        String property_mode = "ID";

        // 【1.0查询物业交接主体信息】
        HandoverPropertyMainVo propertyMainVo = new HandoverPropertyMainVo();
        if (AppConfig.TYPE_CONTRACT_201.equals(businessContractVo.getContractObject_Type())) {
            // 托管合同直接同房屋编号查询该房屋交接记录，托管交接正常情况下有且只有一份正常的交接单
            propertyMainVo.setHpm_type(0);
            propertyMainVo.setHpm_state(0);
            propertyMainVo.setHi_code(businessContractVo.getHi_code());
            propertyMainVo = propertyTransferService.queryHandoverPropertyMain(propertyMainVo);

            // 如果还没有解约
            if (propertyMainVo != null && StringUtils.isEmpty(propertyMainVo.getHpm_handoverPersonOut())) {
                // 查询最新一份租赁合同相关数据
                ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
                contractVo.setContractObject_Type(AppConfig.TYPE_CONTRACT_202);
                contractVo.setHi_code(businessContractVo.getHi_code());
                contractVo = contractObjectService.queryLastContract(contractVo);
                if (contractVo != null) {
                    HandoverPropertyMainVo propertyMainVo1 = new HandoverPropertyMainVo();
                    propertyMainVo1.setContractObject_code(contractVo.getContractObject_Code());
                    propertyMainVo1 = propertyTransferService.queryHandoverPropertyMain(propertyMainVo1);
                    if (propertyMainVo1 != null) {
                        // 【2.1查询能源卡数值】
                        HandoverPropertyEnergyValueVo energyValueVo = new HandoverPropertyEnergyValueVo();
                        energyValueVo.setHpm_id(propertyMainVo1.getHpm_id());
                        List<HandoverPropertyEnergyValueVo> energyValueVos = propertyTransferService.queryHandoverPropertyEnergyValueList(energyValueVo);
                        map.put("lastEnergyValues", energyValueVos);
                    }
                }
            }
        }
        if (AppConfig.TYPE_CONTRACT_202.equals(businessContractVo.getContractObject_Type())) {
            // 租赁合同通过合同编号查询，每份租赁合同都会有一份交接单，如果没有需要查询托管交接单
            propertyMainVo.setHpm_type(1);
            propertyMainVo.setContractObject_code(businessContractVo.getContractObject_Code());
            propertyMainVo = propertyTransferService.queryHandoverPropertyMain(propertyMainVo);
            if (propertyMainVo == null) {
                // 查询上份租赁合同
                ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
                contractVo.setContractObject_Id(businessContractVo.getContractObject_Successor());
                contractVo = contractObjectService.selectContractObjectByCNo(contractVo);
                if (contractVo != null) {
                    propertyMainVo = new HandoverPropertyMainVo();
                    propertyMainVo.setHpm_type(1);
                    propertyMainVo.setContractObject_code(contractVo.getContractObject_Code());
                    propertyMainVo = propertyTransferService.queryHandoverPropertyMain(propertyMainVo);
                    if (propertyMainVo == null) {
                        // 查询托管合同
                        propertyMainVo = new HandoverPropertyMainVo();
                        propertyMainVo.setHpm_type(0);
                        propertyMainVo.setHpm_state(0);
                        propertyMainVo.setHi_code(businessContractVo.getHi_code());
                        propertyMainVo = propertyTransferService.queryHandoverPropertyMain(propertyMainVo);
                        if (propertyMainVo == null) {
                            return msg.toString(110, "没有找到该房屋的存房交接单，无法交接");
                        }
                        property_mode = "SID";
                    } else {
                        property_mode = "PID";
                    }
                } else {
                    // 查询托管合同
                    propertyMainVo = new HandoverPropertyMainVo();
                    propertyMainVo.setHpm_type(0);
                    propertyMainVo.setHpm_state(0);
                    propertyMainVo.setHi_code(businessContractVo.getHi_code());
                    propertyMainVo = propertyTransferService.queryHandoverPropertyMain(propertyMainVo);
                    if (propertyMainVo == null) {
                        return msg.toString(110, "没有找到该房屋的存房交接单，无法交接");
                    }
                    property_mode = "SID";
                }
            }
        }
        map.put("handoverMain", propertyMainVo);
        map.put("property_mode", property_mode);

        // 【钥匙】
        houseKeyVo houseKey = new houseKeyVo();
        houseKey.setHi_code(businessContractVo.getHi_code());
        houseKey = houseLibraryService.queryHouseKeyInfo(houseKey);
        map.put("houseKey", houseKey);

        // 【2.0查询能源卡号】
        HandoverPropertyEnergyCardVo energyCardVo = new HandoverPropertyEnergyCardVo();
        energyCardVo.setHi_code(businessContractVo.getHi_code());
        List<HandoverPropertyEnergyCardVo> energyCardVos = propertyTransferService.queryHandoverPropertyEnergyCardList(energyCardVo);
        map.put("energyCards", energyCardVos);

        if (propertyMainVo != null) {

            // 【2.1查询能源卡数值】
            HandoverPropertyEnergyValueVo energyValueVo = new HandoverPropertyEnergyValueVo();
            energyValueVo.setHpm_id(propertyMainVo.getHpm_id());
            List<HandoverPropertyEnergyValueVo> energyValueVos = propertyTransferService.queryHandoverPropertyEnergyValueList(energyValueVo);
            map.put("energyValues", energyValueVos);

            // 【3.0查询交接物品配置信息】
            HandoverPropertyGoodsVo propertyGoodsVo = new HandoverPropertyGoodsVo();
            propertyGoodsVo.setHpm_id(propertyMainVo.getHpm_id());
            List<HandoverPropertyGoodsVo> goodsVos = propertyTransferService.queryHandoverPropertyGoodsList(propertyGoodsVo);
            map.put("handoverGoods", goodsVos);

            // 【4.0查询交接装饰情况信息】
            HandoverPropertyDecorationVo propertyDecorationVo = new HandoverPropertyDecorationVo();
            propertyDecorationVo.setHpm_id(propertyMainVo.getHpm_id());
            List<HandoverPropertyDecorationVo> decorationVos = propertyTransferService.queryHandoverPropertyDecorationList(propertyDecorationVo);
            map.put("handoverDecorations", decorationVos);
        }

        // 【5.1 查询物品配置列表】
        HouseTypeVo houseGoods = new HouseTypeVo();
        houseGoods.setHt_superId(2);
        List<HouseTypeVo> houseGoodsList = houseLibraryService.queryHouseConfigTypeList(houseGoods);
        map.put("houseGoodsList", houseGoodsList);

        // 【5.2 查询交接装饰情况信息】
        HouseTypeVo houseDeco = new HouseTypeVo();
        houseDeco.setHt_superId(205);
        List<HouseTypeVo> houseDecoList = houseLibraryService.queryHouseConfigTypeList(houseDeco);
        map.put("houseDecoList", houseDecoList);

        return msg.toString(map);
    }

    /**
     * 查询房屋配置类型
     *
     * @return
     * @author JiangQT
     */
    @RequestMapping("/queryHouseConfigType")
    @ResponseBody
    public String queryHouseConfigType(String typeName) {
        Msg<List<HouseTypeVo>> msg = new Msg<List<HouseTypeVo>>();
        HouseTypeVo typeVo = new HouseTypeVo();
        if (StringUtils.isEmpty(typeName)) {
            msg.setCode(110);
            return msg.toString();
        }
        Integer parentId = null;
        if ("家具".equals(typeName)) {
            parentId = 201;
        } else if ("家电".equals(typeName)) {
            parentId = 202;
        } else if ("灯具".equals(typeName)) {
            parentId = 203;
        } else if ("洁具".equals(typeName)) {
            parentId = 204;
        } else if ("装修类型".equals(typeName)) {
            parentId = 205;
        } else if ("房间类型".equals(typeName)) {
            parentId = 206;
        }
        typeVo.setHt_parentId(parentId);
        List<HouseTypeVo> configTypeList = houseLibraryService.queryHouseConfigTypeList(typeVo);
        msg.setData(configTypeList);
        return msg.toString();
    }
}
