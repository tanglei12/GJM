
package com.gjp.controller;

import com.gjp.model.*;
import com.gjp.service.ContractService;
import com.gjp.util.AppConfig;
import com.gjp.util.AppUtil;
import com.gjp.util.Msg;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

/**
 * 移动合同
 *
 * @author 庆涛
 */
@Controller
@RequestMapping("/appContract")
public class AppContractController {

    // 合同
    private @Resource
    ContractService contractService;

    /**
     * APP查询交接清单信息
     *
     * @param cno
     * @return
     * @Description:
     * @author JiangQt
     */
    @RequestMapping(value = "/queryContractTransfer")
    @ResponseBody
    public String queryContractTransfer(HttpServletResponse response, String cno) {
        // 跨域传输json
        response.addHeader("Access-Control-Allow-Origin", "*");
        Msg<PropertyTransfer> msg = new Msg<>();
        if (StringUtils.isEmpty(cno)) {
            msg.setCode(110);
            msg.setMsg(Msg.MSG_PARAM_ERROR);
            return msg.toString();
        }
        // 查询合同类型
        ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
        contractVo.setContractObject_No(cno);
        contractVo = contractService.selectContractObjectByCNo(contractVo);
        // 查询交接清单
        PropertyTransfer transfer = new PropertyTransfer();
        if (AppConfig.TYPE_CONTRACT_201.equals(contractVo.getContractObject_Type())) {
            transfer.setContractObject_No(cno);
            transfer.setTransfer_state(AppConfig.TRANSFER_STATE_0);
            // transfer =
            // propertyTransferKeepService.selectPropertyTransferByCnoHc(transfer);
        }
        if (AppConfig.TYPE_CONTRACT_202.equals(contractVo.getContractObject_Type())) {
            transfer.setContractObject_No(cno);
            transfer.setTransfer_state(AppConfig.TRANSFER_STATE_0);
            // transfer =
            // propertyTransferService.selectPropertyTransferByCnoHc(transfer);
        }
        // if (transfer == null) {
        // msg.setCode(110);
        // msg.setMsg(Msg.MSG_PARAM_ERROR);
        // return msg.toString();
        // }
        msg.setData(transfer);
        return msg.toString();
    }

    /**
     * APP查询交接清单信息
     *
     * @param cno
     * @return
     * @Description:
     * @author JiangQt
     */
    @RequestMapping(value = "/queryHouseItem")
    @ResponseBody
    public String queryHouseItem(HttpServletResponse response, String cno) {
        // 跨域传输json
        response.addHeader("Access-Control-Allow-Origin", "*");
        Msg<List<UserCenterProjectSituation>> msg = new Msg<>();
        if (StringUtils.isEmpty(cno)) {
            msg.setCode(110);
            msg.setMsg(Msg.MSG_PARAM_ERROR);
            return msg.toString();
        }
        // 查询合同类型
        ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
        contractVo.setContractObject_No(cno);
        contractVo = contractService.selectContractObjectByCNo(contractVo);
        // 查询交接清单
        List<UserCenterProjectSituation> situationList = new ArrayList<>();

        PropertyTransfer propertyTransfer = new PropertyTransfer();
        propertyTransfer.setContractObject_No(cno);
        if (AppConfig.TYPE_CONTRACT_201.equals(contractVo.getContractObject_Type())) {
            // propertyTransfer =
            // propertyTransferKeepService.selectPropertyTransferByCnoHc(propertyTransfer);
            if (propertyTransfer != null) {
                UserCenterProjectSituation projectSituation = new UserCenterProjectSituation();
                projectSituation.setHi_code(contractVo.getHi_code());
                projectSituation.setTransferSheet_id(propertyTransfer.getTransferSheet_id());
                // situationList =
                // userCenterRoomTypeKeepService.selectProjectSituationList(projectSituation);
            }
        }
        if (AppConfig.TYPE_CONTRACT_202.equals(contractVo.getContractObject_Type())) {
            // propertyTransfer =
            // propertyTransferService.selectPropertyTransferByHiCode(propertyTransfer);
            if (propertyTransfer != null) {
                UserCenterProjectSituation projectSituation = new UserCenterProjectSituation();
                projectSituation.setHi_code(contractVo.getHi_code());
                projectSituation.setTransferSheet_id(propertyTransfer.getTransferSheet_id());
                // situationList =
                // userCenterRoomTypeService.selectProjectSituationList(projectSituation);
            }
        }
        if (situationList.isEmpty()) {
            msg.setCode(110);
            msg.setMsg(Msg.MSG_PARAM_ERROR);
            return msg.toString();
        }
        msg.setData(situationList);
        return msg.toString();
    }

    /**
     * APP查询房屋装修记录
     *
     * @param response
     * @return
     * @Description:
     * @author JiangQt
     */
    @RequestMapping("/queryHouseEditRecord")
    @ResponseBody
    public String queryHouseEditRecord(HttpServletResponse response, String cno) {
        response.addHeader("Access-Control-Allow-Origin", "*");// 跨域传输json

        Msg<List<UserCenterRoomBasicFixOK>> msg = new Msg<List<UserCenterRoomBasicFixOK>>();
        if (StringUtils.isEmpty(cno)) {
            msg.setCode(110);
            msg.setMsg(Msg.MSG_PARAM_ERROR);
            return msg.toString();
        }
        // 查询合同类型
        ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
        contractVo.setContractObject_No(cno);
        contractVo = contractService.selectContractObjectByCNo(contractVo);

        // 查询交接清单
        List<UserCenterRoomBasicFixOK> basicFixOKs = new ArrayList<UserCenterRoomBasicFixOK>();

        PropertyTransfer propertyTransfer = new PropertyTransfer();
        propertyTransfer.setContractObject_No(cno);
        if (AppConfig.TYPE_CONTRACT_201.equals(contractVo.getContractObject_Type())) {
            // propertyTransfer =
            // propertyTransferKeepService.selectPropertyTransferByCnoHc(propertyTransfer);
            if (propertyTransfer != null) {
                UserCenterRoomBasicFixOK roomBasicFixOK = new UserCenterRoomBasicFixOK();
                roomBasicFixOK.setTransferSheet_id(propertyTransfer.getTransferSheet_id());
                // basicFixOKs =
                // userCenterRoomTypeKeepService.selectRoomBasicFixOK(roomBasicFixOK);
            }
        }
        if (AppConfig.TYPE_CONTRACT_202.equals(contractVo.getContractObject_Type())) {
            // propertyTransfer =
            // propertyTransferService.selectPropertyTransferByHiCode(propertyTransfer);
            if (propertyTransfer != null) {
                UserCenterRoomBasicFixOK roomBasicFixOK = new UserCenterRoomBasicFixOK();
                roomBasicFixOK.setTransferSheet_id(propertyTransfer.getTransferSheet_id());
                // basicFixOKs =
                // userCenterRoomTypeService.selectRoomBasicFixOK(roomBasicFixOK);
            }
        }
        msg.setData(basicFixOKs);
        return msg.toString();
    }

    /**
     * APP查询交接清单信息
     *
     * @param cno
     * @param tfid
     * @return
     * @Description:
     * @author JiangQt
     */
    @RequestMapping(value = "/queryHouseAddItem")
    @ResponseBody
    public String queryHouseAddItem(String cno, Integer tfid) {
        // 跨域传输json
        AppUtil.getResponse().addHeader("Access-Control-Allow-Origin", "*");
        Msg<List<ServicePurchaseItems>> msg = new Msg<List<ServicePurchaseItems>>();
        if (StringUtils.isEmpty(cno)) {
            msg.setCode(110);
            msg.setMsg(Msg.MSG_PARAM_ERROR);
            return msg.toString();
        }
        // 添置物品
        ServicePurchaseItems purchaseItems = new ServicePurchaseItems();
        purchaseItems.setContractObject_No(cno);
        List<ServicePurchaseItems> itemsList = null;// propertyTransferKeepService.queryPurchaseItems(purchaseItems);
        msg.setData(itemsList);
        return msg.toString();
    }

}
