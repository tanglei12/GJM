package com.gjp.dao;

import com.gjp.model.ContractBillVo;
import com.gjp.model.ContractOrderVo;
import com.gjp.util.PageModel;

import java.util.List;

/**
 * 合同订单
 *
 * @author 王孝元
 * @version 创建时间：2016年12月9日 上午9:35:40
 */
public interface BillContractOrderDao {

    /**
     * 查询合同订单
     *
     * @param pageModel
     * @return
     * @author 王孝元
     */
    PageModel<ContractOrderVo> queryBillContractOrderList(PageModel<ContractOrderVo> pageModel);

    /**
     * APP查询合同订单
     *
     * @param pageModel
     * @return
     * @author 陈智颖
     */
    List<ContractOrderVo> queryBillContractOrderListApp(ContractOrderVo billContractOrderVo);

    /**
     * 查询合同订单(总数)
     *
     * @param pageModel
     * @return
     * @author 王孝元
     */
    int queryBillContractOrderListCount(PageModel<ContractOrderVo> pageModel);

    /**
     * 根据id查询合同订单
     *
     * @param bco_id
     * @return
     * @author 王孝元
     */
    ContractOrderVo queryBillContractOrderById(Integer bco_id);

    /**
     * 根据属性查询合同订单
     *
     * @param bco_id
     * @return
     * @author 王孝元
     */
    ContractOrderVo queryBillContractOrderByProperty(ContractOrderVo bco);

    /**
     * 判断是否支付成功
     *
     * @param billVo
     * @return
     * @author chen
     * @date Feb 4, 2017 11:51:53 AM
     */
    List<ContractBillVo> selectPayBillSuccess(ContractBillVo billVo);

    /**
     * 根据订单号查询月租金
     *
     * @param bco_code
     * @return
     * @author 王孝元
     */
    Double queryRentByOrderCode(String bco_code);

    /**
     * 查询要初始化的合作订单
     *
     * @return
     * @author 王孝元
     */
    List<ContractOrderVo> queryInitPartnerOrder();

    /**
     * 修改订单
     *
     * @param bco
     * @return
     * @author 王孝元
     */
    int updateBillContractOrder(ContractOrderVo bco);

    /**
     * 查询要初始化总金额的订单
     *
     * @return
     * @author 王孝元
     */
    List<ContractOrderVo> queryInitTotalPaymentOrder();

    /**
     * 查询要初始化逾期天数的订单
     *
     * @return
     * @author 王孝元
     */
    List<ContractOrderVo> queryInitOverDueDayOrder();

    /**
     * 根据订单code更改订单状态
     *
     * @author tanglei
     * @Date 2017年7月24日 下午16:49:55
     */
    int updateBillContractOrderState(ContractOrderVo bco);

    /**
     * 查询合同订单
     *
     * @author tanglei
     * @Date 2017年7月23日 下午17:15:55
     */
    ContractOrderVo selectContractOrder(ContractOrderVo billContractOrderVo);

    /**
     * 根据合同编号和订单类型更改订单状态
     *
     * @author tanglei
     * @Date 2017年7月30日 下午15:08:55
     */
    int updateContractOrderState(ContractOrderVo bco);

    /**
     * 查询账单最小期数
     *
     * @param contractBillVo
     * @return
     */
    int queryFinanceBillForMinCycle(ContractBillVo contractBillVo);
}
