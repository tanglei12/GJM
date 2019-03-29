package com.gjp.controller;

import com.gjp.model.*;
import com.gjp.service.ContractService;
import com.gjp.service.HouseLibraryService;
import com.gjp.service.ItemsInventoryService;
import com.gjp.util.AppUtil;
import com.gjp.util.DataUtil;
import com.gjp.util.Msg;
import com.gjp.util.PageModel;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.*;

/**
 * 秦莎
 * <p>
 * 创建时间 2016-08-10 10:47:23
 */
@Controller
@RequestMapping("/itemManage")
public class ItemManageController {

    // 物品库
    @Resource
    private ItemsInventoryService itemsInventoryService;
    //合同
    @Resource
    private ContractService userCenterContractObjectService;
    // 房源
    @Resource
    private HouseLibraryService houseLibraryService;

    private class ItemsRelationList {
        private List<ItemsRelation> reList = new ArrayList<ItemsRelation>();

        public List<ItemsRelation> getReList() {
            return reList;
        }

        public void setReList(List<ItemsRelation> reList) {
            this.reList = reList;
        }

    }

    /**
     * 物品库List页面
     *
     * @return
     * @author zoe
     */
    @RequestMapping("itemList")
    public String selectItemList() {
        return "/itemManage/itemList";
    }

    /**
     * 查询物品库List
     *
     * @return
     * @author zoe
     */
    @RequestMapping("/selectItemsInventoryList")
    @ResponseBody
    public Map<String, Object> selectItemsInventoryList(PageModel<ItemsInventory> pageModel,
                                                        ItemsInventory itemsInventory) {
        Map<String, Object> map = new HashMap<>();
        if (pageModel == null) {
            pageModel = new PageModel<ItemsInventory>();
        }
        if (pageModel.getPageNo() == 0) {
            pageModel.setPageNo(1);
        }
        itemsInventory.setStart((pageModel.getPageNo() - 1) * pageModel.getPageSize());
        itemsInventory.setEnd(pageModel.getPageSize());
        List<ItemsInventory> list = itemsInventoryService.selectItemsInventoryList(itemsInventory);
        int count = itemsInventoryService.selectItemsInventoryCount(itemsInventory);
        pageModel.setTotalRecords(count);

        map.put("itemList", list);
        map.put("pageModel", pageModel);

        // json = itemsInventoryService.selectHouseTypeHtParentID2();
        return map;
    }

    /**
     * 查询物品类型的一级目录
     *
     * @return
     * @author zoe
     */
    @RequestMapping("/selectHouseTypeParentID2")
    @ResponseBody
    public Map<String, Object> selectHouseTypeHtParentID2() {
        Map<String, Object> map = new HashMap<>();
        map = itemsInventoryService.selectHouseTypeHtParentID2();
        return map;
    }

    /**
     * 查询物品类型的一级目录
     *
     * @return
     * @author zoe
     */
    @RequestMapping("/selectHouseTypeParentID3")
    @ResponseBody
    public Map<String, Object> selectHouseTypeHtParentID3(HouseTypeVo houseTypeVo) {
        Map<String, Object> map = new HashMap<>();
        map = itemsInventoryService.selectHouseTypeHtParentID3(houseTypeVo);
        return map;
    }

    /**
     * 添加物品
     *
     * @param itemsInventory
     * @return
     * @author zoe
     */
    public Integer addItemsInventory(ItemsInventory itemsInventory) {
        // 获得当前操作用户
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        itemsInventory.setEm_id(employee.getEm_id());
        Integer count = itemsInventoryService.addItemsInventoryOne(itemsInventory);
        return count;
    }

    /**
     * 挑战到物品账单
     *
     * @return
     */
    @RequestMapping("/itemBillList")
    public String selectItemsBill() {
        return "/itemManage/itemBillList";
    }

    /**
     * 查询出账单List
     *
     * @return
     */
    @RequestMapping("/selectItemBillList")
    @ResponseBody
    public Map<String, Object> selectItemsBillList(ItemsBill itemsBill, PageModel<ItemsBill> pageModel) {
        Map<String, Object> map = new HashMap<>();
        if (pageModel == null) {
            pageModel = new PageModel<ItemsBill>();
        }
        if (pageModel.getPageNo() == 0) {
            pageModel.setPageNo(1);
        }
        itemsBill.setStart((pageModel.getPageNo() - 1) * pageModel.getPageSize());
        itemsBill.setEnd(pageModel.getPageSize());
        List<ItemsBill> billList = itemsInventoryService.selectItemsBillList(itemsBill);
        int count = itemsInventoryService.selectItemsBillCount(itemsBill);
        pageModel.setTotalRecords(count);
        map.put("billList", billList);
        map.put("pageModel", pageModel);

        // List<ItemsBill> bList = itemsInventoryService.sel

        return map;
    }

    /**
     * 查询物品某类型的物品List
     *
     * @param pageModel
     * @param itemsInventory
     * @return
     */
    @RequestMapping("/selectItemsInvNameList")
    @ResponseBody
    public Map<String, Object> selectItemsInvtortyStateInvType(PageModel<ItemsInventory> pageModel,
                                                               ItemsInventory itemsInventory) {
        Map<String, Object> map = new HashMap<>();
        if (pageModel == null) {
            pageModel = new PageModel<ItemsInventory>();
        }
        if (pageModel.getPageNo() == 0) {
            pageModel.setPageNo(1);
        }
        itemsInventory.setStart((pageModel.getPageNo() - 1) * pageModel.getPageSize());
        itemsInventory.setEnd(pageModel.getPageSize());
        List<ItemsInventory> ItemsList = itemsInventoryService.selectItemsInvtoryStateInvName(itemsInventory);
        int count = itemsInventoryService.selectItemsInvtoryStateInvNameCount(itemsInventory);
        pageModel.setTotalRecords(count);
        map.put("ItemsList", ItemsList);
        map.put("pageModel", pageModel);
        return map;
    }

    /**
     * 合同物品添置
     *
     * @return
     */
    @RequestMapping("/addItemsInvtortyOne")
    @ResponseBody
    public Map<String, Object> addItemsInvtortyOne(ItemsRelation itemsRelation) {
        Map<String, Object> map = new HashMap<>();
        itemsRelation.setIr_addDate(new Date());// 创建时间
        itemsRelation.setIr_createTime(new Date());// 添置日期
        itemsRelation.setIr_state(1);// 绑定状态（1：绑定、0：解绑）
        Integer count = itemsInventoryService.addItemsRelationOne(itemsRelation);
        if (count > 0) {// 添加成功
            // 修改物品库存的状态
            ItemsInventory itemsInventory = new ItemsInventory();
            itemsInventory.setInv_code(itemsRelation.getInv_code());
            itemsInventory.setInv_state(1);
            count = itemsInventoryService.updateItemsInventory(itemsInventory);

            // 物品存放记录
            ItemsStorageRecord itemsStorageRecord = new ItemsStorageRecord();
            itemsStorageRecord.setInv_code(itemsRelation.getInv_code());// 物品库唯一编码
            itemsStorageRecord.setIsr_content(
                    "物品出库（公司——>" + itemsRelation.getContractObject_code() + "/" + itemsRelation.getHi_code() + "）");
            itemsStorageRecord.setIsr_createTime(new Date());// 记录时间
            itemsStorageRecord.setIsr_isHandle(1);// 是否处理（1：处理；0：未处理）
            itemsStorageRecord.setIsr_positionBefore("0");// 搬离位置
            itemsStorageRecord.setIsr_positionAfter(itemsRelation.getHi_code());// 存放编号
            UserCenterEmployee empty = AppUtil.getCookieEmployee();
            itemsStorageRecord.setEm_id(empty.getEm_id());// 办理人
            itemsInventoryService.addItemsStorageRecordOne(itemsStorageRecord);
            if (count > 0) {
                map.put("message", "success");
                map.put("itemsRelation", itemsRelation);
            } else {
                map.put("message", "success");
            }
        } else {
            map.put("message", "success");
        }

        return map;
    }

    @RequestMapping("/selectItemsRelationList")
    @ResponseBody
    public Map<String, Object> selectItemsRelationList(ItemsRelation itemsRelation,String contractObject_code) {
        Map<String, Object> map = new HashMap<>();
        List<ItemsRelation> reList = itemsInventoryService.selectItemsRelationList(itemsRelation);
        ContractObjectVo contractObjectVo = new ContractObjectVo();
        contractObjectVo.setContractObject_Code(contractObject_code);
        ContractObjectVo contractObjectVo1 = userCenterContractObjectService.selectContractObjectId(contractObjectVo);
        map.put("reList", reList);
        map.put("contractObject", contractObjectVo1);
        if (reList.size() > 0) {
            map.put("reList", reList);
            map.put("message", "1");
        } else {
            map.put("message", "0");
        }
        return map;
    }

    /**
     * 合同添加（绑定）物品
     *
     * @return
     */
    @RequestMapping("/addItemsRelationList")
    @ResponseBody
    public Map<String, Object> addItemsRelationList(ItemsRelationList reList) {
        Map<String, Object> map = new HashMap<>();
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            map.put("message", "fail");
            return map;
        }
        if (reList.getReList().size() > 0) {
            ItemsRelation itemsRelation = new ItemsRelation();
            String hi_code = reList.getReList().get(0).getHi_code();// 房屋编号code
            String con_code = reList.getReList().get(0).getContractObject_code();// 合同唯一编号code
            for (int i = 0; i < reList.getReList().size(); i++) {
//				System.out.println("code= " + reList.getReList().get(i).getInv_code() + "  isChar= "
//						+ reList.getReList().get(i).getIr_isCalAchi());
                String inv_code = reList.getReList().get(i).getInv_code();// 物品唯一编号
                String isCalAchi = reList.getReList().get(i).getIr_isCalAchi();// 是否扣除业绩(0：不扣；1：扣除)

                itemsRelation.setIr_addDate(new Date());// 创建时间
                itemsRelation.setIr_createTime(new Date());// 添置日期
                itemsRelation.setIr_state(1);// 绑定状态（1：绑定、0：解绑）
                itemsRelation.setHi_code(hi_code);// 房屋编号
                itemsRelation.setIr_isCalAchi(isCalAchi);// 是否扣除业绩
                itemsRelation.setInv_code(inv_code);// 物品唯一编号
                itemsRelation.setContractObject_code(con_code);// 合同编号
                Integer count = itemsInventoryService.addItemsRelationOne(itemsRelation);// 将该物品添加到合同
                if (count > 0) {// 添加成功
                    // 修改物品库存的状态
                    ItemsInventory itemsInventory = new ItemsInventory();
                    itemsInventory.setInv_code(itemsRelation.getInv_code());
                    itemsInventory.setInv_state(1);
                    count = itemsInventoryService.updateItemsInventory(itemsInventory);
                    // 物品存放记录
                    ItemsStorageRecord itemsStorageRecord = new ItemsStorageRecord();
                    itemsStorageRecord.setInv_code(itemsRelation.getInv_code());// 物品库唯一编码
                    itemsStorageRecord.setIsr_content("物品出库（公司——>" + itemsRelation.getContractObject_code() + "/"
                            + itemsRelation.getHi_code() + "）");
                    itemsStorageRecord.setIsr_createTime(new Date());// 记录时间
                    itemsStorageRecord.setIsr_isHandle(1);// 是否处理（1：处理；0：未处理）
                    itemsStorageRecord.setIsr_positionBefore("0");// 搬离位置
                    itemsStorageRecord.setIsr_positionAfter(itemsRelation.getHi_code());// 存放编号
                    itemsStorageRecord.setEm_id(employee.getEm_id());// 办理人
                    itemsInventoryService.addItemsStorageRecordOne(itemsStorageRecord);// 物品记录添加
                    // relaList.add(itemsRelation);

                    //修改合同物品购置总金额
                    if (isCalAchi.equals("1")) {//要计算业绩
                        ContractObjectVo userCenterContractObject = new ContractObjectVo();//创建合同对象
//						userCenterContractObject.setContractObject_Code(con_code);
                        userCenterContractObject = userCenterContractObjectService.queryContractObject(con_code);
                        //库存中该物品
                        itemsInventory = itemsInventoryService.selectItemsInventoryOne(itemsInventory);
                        if (userCenterContractObject.getContractObject_goodsMoney() == null) {
                            userCenterContractObject.setContractObject_goodsMoney(itemsInventory.getInv_price());
                        } else {
                            userCenterContractObject.setContractObject_goodsMoney((userCenterContractObject.getContractObject_goodsMoney() + itemsInventory.getInv_price()));
                        }
                        //修改合同物品购置总金额
                        userCenterContractObjectService.updateContractObjectGoodsMoney(userCenterContractObject);
                    }


                }
                map.put("message", "success");
                // json.put("itemReList", relaList);
            }

        } else {// 一个对象也没传过来（空）
            map.put("message", "null");
        }

        return map;
    }


    /**
     * 合同中的物品解除绑定
     *
     * @param itemsRelation
     * @return
     */
    @RequestMapping("/updateItemsRelationState")
    @ResponseBody
    public Map<String, Object> updateItemsRelationState(ItemsRelation itemsRelation) {
        Map<String, Object> map = new HashMap<>();
        itemsRelation.setIr_state(0);//物品解绑
        Integer count = itemsInventoryService.updateItemsRelationState(itemsRelation);//同步数据库
        if (count > 0) {
            //修改物品库
            ItemsInventory itemsInventory = new ItemsInventory();//物品库
            itemsInventory.setInv_state(0);//物品状态0:空闲
            itemsInventory.setInv_code(itemsRelation.getInv_code());//物品唯一编码
            count = itemsInventoryService.updateItemsInventory(itemsInventory);//数据库同步
            //物品存放记录
            ItemsStorageRecord itemsStorageRecord = new ItemsStorageRecord();
            itemsStorageRecord.setInv_code(itemsRelation.getInv_code());//物品唯一编码
            itemsStorageRecord.setIsr_content("物品移动（" + itemsRelation.getContractObject_code() + "/" + itemsRelation.getHi_code() + "——>移动到公司）");
            itemsStorageRecord.setIsr_createTime(new Date());// 记录时间
            itemsStorageRecord.setIsr_isHandle(1);// 是否处理（1：处理；0：未处理）
            itemsStorageRecord.setIsr_positionBefore(itemsRelation.getHi_code());// 搬离位置
            itemsStorageRecord.setIsr_positionAfter("0");// 存放编号
            UserCenterEmployee empty = AppUtil.getCookieEmployee();
            itemsStorageRecord.setEm_id(empty.getEm_id());// 办理人
            itemsInventoryService.addItemsStorageRecordOne(itemsStorageRecord);// 物品记录添加

            //修改合同物品购置总金额
            if (itemsRelation.getIr_isCalAchi().equals("1")) {//要计算业绩
                ContractObjectVo userCenterContractObject = new ContractObjectVo();//创建合同对象
                userCenterContractObject = userCenterContractObjectService.queryContractObject(itemsRelation.getContractObject_code());
                //库存中该物品
//				itemsInventory = itemsInventoryService.selectItemsInventoryOne(itemsInventory);
                if (userCenterContractObject.getContractObject_goodsMoney() == null) {
                    userCenterContractObject.setContractObject_goodsMoney(0.00);
                } else {
                    userCenterContractObject.setContractObject_goodsMoney((userCenterContractObject.getContractObject_goodsMoney() - itemsRelation.getInv_price()));
                }
                if (userCenterContractObject.getContractObject_goodsMoney() < 0) {
                    userCenterContractObject.setContractObject_goodsMoney(0.00);
                }
                //修改合同物品购置总金额
                userCenterContractObjectService.updateContractObjectGoodsMoney(userCenterContractObject);
            }

            map.put("message", "success");
        } else {
            map.put("message", "error");
        }

        return map;
    }


    /**
     * 添加宽带
     *
     * @param
     * @return
     */
    @RequestMapping("/addBroadbandConfig")
    @ResponseBody
    public String addBroadbandConfig(String bc_brand, String bc_type, String bc_bandwidth, String bc_cost, String bc_cname, String bc_account,
                                     String bc_password, String bc_installationTime, String bc_equipmentInfo, String bc_router, String bc_telephone,
                                     String bc_customerManager, Integer bc_isUsed, String bc_agent, String bc_remarks, String contractObject_code,
                                     String hi_code,String bc_IDNumber,String bc_term ,Integer bc_installType, Integer bc_broadbandState) {
        Msg<Object> msg = new Msg<>();
        BroadbandConfigVo broadbandConfigVo = new BroadbandConfigVo();
        broadbandConfigVo.setBc_brand(bc_brand);
        broadbandConfigVo.setBc_type(bc_type);
        broadbandConfigVo.setBc_bandwidth(bc_bandwidth);
        broadbandConfigVo.setBc_cost(bc_cost);
        broadbandConfigVo.setBc_cname(bc_cname);
        broadbandConfigVo.setBc_IDNumber(bc_IDNumber);
        broadbandConfigVo.setBc_account(bc_account);
        broadbandConfigVo.setBc_password(bc_password);
        Date bc_installationTime1 = DataUtil.StrToDates(bc_installationTime);
        broadbandConfigVo.setBc_installationTime(bc_installationTime1);
        broadbandConfigVo.setBc_equipmentInfo(bc_equipmentInfo);
        broadbandConfigVo.setBc_router(bc_router);
        broadbandConfigVo.setBc_telephone(bc_telephone);
        broadbandConfigVo.setBc_customerManager(bc_customerManager);
        broadbandConfigVo.setBc_isUsed(bc_isUsed);
        broadbandConfigVo.setBc_agent(bc_agent);
        broadbandConfigVo.setBc_remarks(bc_remarks);
        broadbandConfigVo.setContractObject_code(contractObject_code);
        broadbandConfigVo.setHi_code(hi_code);
        broadbandConfigVo.setBc_term(bc_term);
        broadbandConfigVo.setBc_installType(bc_installType);
        broadbandConfigVo.setBc_broadbandState(bc_broadbandState);
        int i = itemsInventoryService.insertBroadbandConfig(broadbandConfigVo);
        if (i > 0) {
            msg.setCode(200);
            msg.setMsg("添加宽带成功");
        } else {
            msg.setCode(401);
            msg.setMsg("添加宽带失败");
        }
        return msg.toString();
    }

    /**
     * 修改宽带
     *
     * @param
     * @return
     */
    @RequestMapping("/updateBroadbandConfig")
    @ResponseBody
    public String updateBroadbandConfig(Integer bc_id,String bc_brand, String bc_type, String bc_bandwidth, String bc_cost, String bc_cname, String bc_account,
                                     String bc_password, String bc_installationTime, String bc_equipmentInfo, String bc_router, String bc_telephone,
                                     String bc_customerManager, Integer bc_isUsed, String bc_agent, String bc_remarks, String contractObject_code,
                                     String hi_code,String bc_IDNumber,String bc_term ,Integer bc_installType, Integer bc_broadbandState) {
        Msg<Object> msg = new Msg<>();
        BroadbandConfigVo broadbandConfigVo = new BroadbandConfigVo();
        broadbandConfigVo.setBc_id(bc_id);
        broadbandConfigVo.setBc_brand(bc_brand);
        broadbandConfigVo.setBc_type(bc_type);
        broadbandConfigVo.setBc_bandwidth(bc_bandwidth);
        broadbandConfigVo.setBc_cost(bc_cost);
        broadbandConfigVo.setBc_cname(bc_cname);
        broadbandConfigVo.setBc_IDNumber(bc_IDNumber);
        broadbandConfigVo.setBc_account(bc_account);
        broadbandConfigVo.setBc_password(bc_password);
        Date bc_installationTime1 = DataUtil.StrToDates(bc_installationTime);
        broadbandConfigVo.setBc_installationTime(bc_installationTime1);
        broadbandConfigVo.setBc_equipmentInfo(bc_equipmentInfo);
        broadbandConfigVo.setBc_router(bc_router);
        broadbandConfigVo.setBc_telephone(bc_telephone);
        broadbandConfigVo.setBc_customerManager(bc_customerManager);
        broadbandConfigVo.setBc_isUsed(bc_isUsed);
        broadbandConfigVo.setBc_agent(bc_agent);
        broadbandConfigVo.setBc_remarks(bc_remarks);
        broadbandConfigVo.setContractObject_code(contractObject_code);
        broadbandConfigVo.setHi_code(hi_code);
        broadbandConfigVo.setBc_term(bc_term);
        broadbandConfigVo.setBc_installType(bc_installType);
        broadbandConfigVo.setBc_broadbandState(bc_broadbandState);
        int i = itemsInventoryService.updateBroadbandConfig(broadbandConfigVo);
        if (i > 0) {
            msg.setCode(200);
            msg.setMsg("修改宽带成功");
        } else {
            msg.setCode(401);
            msg.setMsg("修改宽带失败");
        }
        return msg.toString();
    }

    /**
     * 获取宽带配置数据
     *
     * @param contractObject_code
     * @param hi_code
     * @return
     */
    @RequestMapping("/InitBroadbandAgent")
    @ResponseBody
    public String InitBroadbandAgent(String contractObject_code, String hi_code) {
        Msg<Object> msg = new Msg<>();
        BroadbandConfigVo broadbandConfigVo = new BroadbandConfigVo();
        broadbandConfigVo.setContractObject_code(contractObject_code);
        broadbandConfigVo.setHi_code(hi_code);
        BroadbandConfigVo broadbandConfig = itemsInventoryService.selectInitBroadbandConfig(broadbandConfigVo);
        if (broadbandConfig != null){
            msg.setCode(200);
            msg.put("broadbandConfig", broadbandConfig);
        }else {
            msg.setCode(401);
            msg.setMsg("无数据");
        }
        return msg.toString();
    }

    /**
     * 获取房屋和合同下的保险
     *
     * @param insuranceVo
     * @return
     */
    @RequestMapping("/getInsurance")
    @ResponseBody
    public String getInsurance(InsuranceVo insuranceVo, String i_insureDates, String i_insurant_strats, String i_insurant_ends) {
        Msg<Object> msg = new Msg<>();
        List<InsuranceVo> insuranceVo1 = itemsInventoryService.selectInsurance(insuranceVo);//有效合同
        List<InsuranceVo> insuranceVos = itemsInventoryService.selectInsuranceByWhere(insuranceVo);//房屋合同下所有保险合同
        if (insuranceVo1.size() == 0) {
            msg.put("isNull", 0);
        }
        msg.put("insurance", insuranceVos);
        return msg.toString();
    }

    /**
     * 获取保险上下关系
     *
     * @param i_correlation
     * @return
     */
    @RequestMapping("/getInsuranceAndAddres")
    @ResponseBody
    public String getInsuranceAndAddres(String i_correlation) {
        Msg<Object> msg = new Msg<>();
        InsuranceVo insuranceVo = new InsuranceVo();
        insuranceVo.setI_correlation(i_correlation);
        List<InsuranceVo> insuranceVos = itemsInventoryService.selectInsuranceAndAddres(insuranceVo);//获取保险上下关系
        msg.put("insuranceAndAddres", insuranceVos);
        return msg.toString();
    }


    /**
     * 获取房屋和合同下根据条件
     *
     * @param insuranceVo
     * @return
     */
    @RequestMapping("/getInsuranceWhere")
    @ResponseBody
    public String getInsuranceWhere(InsuranceVo insuranceVo, String i_insureDates, String i_insurant_strats, String i_insurant_ends) {
        Msg<Object> msg = new Msg<>();
        List<InsuranceVo> insuranceVos = itemsInventoryService.selectInsuranceByWhere(insuranceVo);
        msg.put("insurance", insuranceVos);
        return msg.toString();
    }

    /**
     * 录入保单（新建录入）
     *
     * @param insuranceVo
     * @return
     */
    @RequestMapping("/submitInsurance")
    @ResponseBody
    public String submitInsurance(InsuranceVo insuranceVo, String i_insureDates, String i_insurant_strats, String i_insurant_ends) {
        Msg<Object> msg = new Msg<>();

        //查询保险根据id
        /*InsuranceVo insuranceVo1 = new InsuranceVo();
        insuranceVo1.setI_insuranceNumber(insuranceVo.getI_insuranceNumber());
        insuranceVo1.setContractObject_code(insuranceVo.getContractObject_code());
        InsuranceVo insuranceVo2 = itemsInventoryService.selectInsuranceById(insuranceVo1);
        if (insuranceVo2 != null){
            msg.setCode(401);
            msg.setMsg("该保单号已存在，请检查填写的保单号");
            return msg.toString();
        }*/

        insuranceVo.setI_insureDate(DataUtil.StrToDates(i_insureDates));
        insuranceVo.setI_insurant_strat(DataUtil.StrToDates(i_insurant_strats));
        insuranceVo.setI_insurant_end(DataUtil.StrToDates(i_insurant_ends));
        insuranceVo.setI_isCorrections(0);
        insuranceVo.setI_correlation(AppUtil.getUUID());
        int i = itemsInventoryService.insertInsurance(insuranceVo);
        if (i > 0) {
            houseLibraryService.addInsurance(insuranceVo.getHi_code(), insuranceVo.getContractObject_code(), insuranceVo.getI_cost(), DataUtil.StrToDates(i_insurant_strats), DataUtil.StrToDates(i_insurant_ends));
            msg.setCode(200);
            msg.setMsg("新建成功");
        } else {
            msg.setCode(401);
            msg.setMsg("新建失败");
        }
        return msg.toString();
    }

    /**
     * 录入保单（批改录入）
     *
     * @param insuranceVo
     * @return
     */
    @RequestMapping("/updInsurance")
    @ResponseBody
    public String updInsurance(InsuranceVo insuranceVo, String i_insureDates, String i_insurant_strats, String i_insurant_ends,Integer i_idf) {
        Msg<Object> msg = new Msg<>();

        //查询保险根据id
        InsuranceVo insuranceVo1 = new InsuranceVo();
        //insuranceVo1.setI_insuranceNumber(insuranceVo.getI_insuranceNumber());
       /* InsuranceVo insuranceVo2 = itemsInventoryService.selectInsuranceById(insuranceVo1);
        if (insuranceVo2 != null){
            msg.setCode(401);
            msg.setMsg("该保单号已存在，请检查填写的保单号");
            return msg.toString();
        }*/

        insuranceVo1.setContractObject_code(insuranceVo.getContractObject_code());
        insuranceVo1.setHi_code(insuranceVo.getHi_code());
        List<InsuranceVo> insuranceVos = itemsInventoryService.selectInsurance(insuranceVo1);
        if (insuranceVos.size() > 0) {
            msg.setCode(401);
            msg.setMsg("该合同下已有生效的保单");
            return msg.toString();
        }

        insuranceVo.setI_insureDate( DataUtil.StrToDates(i_insureDates));
        insuranceVo.setI_insurant_strat( DataUtil.StrToDates(i_insurant_strats));
        insuranceVo.setI_insurant_end( DataUtil.StrToDates(i_insurant_ends));
        try {
            itemsInventoryService.updInsurance(insuranceVo,i_idf);
            msg.setCode(200);
            msg.setMsg("批改成功");
        } catch (Exception e) {
            msg.setCode(401);
            msg.setMsg("批改失败");
            e.printStackTrace();
        }

        return msg.toString();
    }


    /**
     * 修改保单
     *
     * @param insuranceVo
     * @return
     */
    @RequestMapping("/SubmitUpdataInsurance")
    @ResponseBody
    public String SubmitUpdataInsurance(InsuranceVo insuranceVo, String i_insureDates, String i_insurant_strats, String i_insurant_ends) {
        Msg<Object> msg = new Msg<>();

        insuranceVo.setI_insureDate( DataUtil.StrToDates(i_insureDates));
        insuranceVo.setI_insurant_strat( DataUtil.StrToDates(i_insurant_strats));
        insuranceVo.setI_insurant_end( DataUtil.StrToDates(i_insurant_ends));
        try {
            itemsInventoryService.SubmitUpdataInsurance(insuranceVo);
            msg.setCode(200);
            msg.setMsg("修改成功");
        } catch (Exception e) {
            msg.setCode(401);
            msg.setMsg("修改失败");
            e.printStackTrace();
        }
        return msg.toString();
    }


}