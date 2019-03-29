package com.gjp.dao;

import com.gjp.model.BillTypeVo;
import com.gjp.model.ContractBillVo;

import java.util.List;

/**
 * 合同账单
 *
 * @author 王孝元
 * @version 创建时间：2016年12月9日 上午9:35:40
 */
public interface BillContractBillDao {

    /**
     * 根据订单号查询账单
     *
     * @param bco_code
     * @return
     * @author 王孝元
     */
    List<ContractBillVo> queryBillContractBillList(ContractBillVo contractBillVo);

    /**
     * 查询账单类型
     *
     * @return
     * @author 王孝元
     */
    List<BillTypeVo> queryBillTypeList();

    /**
     * 根据id查询账单
     *
     * @param bcb_id
     * @return
     * @author 王孝元
     */
    ContractBillVo queryBillContractBillById(Integer bcb_id);

    /**
     * 根据属性查询账单
     *
     * @param bcb_id
     * @return
     * @author 王孝元
     */
    ContractBillVo queryBillContractBillByProperty(ContractBillVo bcb);

    List<ContractBillVo> queryBillContractBillListByProperty(ContractBillVo bcb);

    /**
     * 更新账单
     *
     * @param bcb
     * @return
     * @author 王孝元
     */
    int updateBillContractBill(ContractBillVo bcb);

    /**
     * 查询需要代偿的账单
     *
     * @param bco
     * @return
     * @author 王孝元
     */
    List<ContractBillVo> queryNeedToRepays(ContractBillVo bcb);

    /**
     * 添加合同账单
     *
     * @param bcb
     * @return
     * @author 王孝元
     */
    int addBillContractBill(ContractBillVo bcb);

    /**
     * 根据订单号和和状态更改账单
     *
     * @author tanglei
     * @Date 2017年7月30日  下午15:42:55
     */
    int updateContractBill(ContractBillVo bcb);
    
    /**
     * 根据订单code查询账单信息
     * @author tanglei
     * @Date 2017年8月1日  上午10:21:55
     */
    List<ContractBillVo> selectBillContractBillCode (ContractBillVo financeBill);

    /**
     * 查询合同首期账单信息
     * @param con_code
     * @return
     */
    List<ContractBillVo> queryBillContractByConCode(String con_code);

}
