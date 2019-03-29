package com.gjp.service;

import com.gjp.dao.BillPartnerBillDao;
import com.gjp.model.BillPartnerBill;
import com.gjp.model.ContractBillVo;
import com.gjp.model.ContractOrderVo;
import com.gjp.model.UserCenterEmployee;
import com.gjp.util.AppUtil;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * 代偿账单业务处理
 *
 * @author 王孝元
 * @version 创建时间：2015年12月6日 下午2:48:11
 */
@Service
public class BillPartnerBillService {

    // 金融账单
    @Resource
    private BillPartnerBillDao billPartnerBillDao;
    // 合同订单
    @Resource
    private BillContractOrderService billContractOrderService;
    // 合同账单
    @Resource
    private BillContractBillService billContractBillService;
    // 合作伙伴
    @Resource
    private BillPartnersService billPartnersService;
    // 合作伙伴
    @Resource
    private FinanceManageService financeManageService;

    /**
     * 代偿某期账单
     *
     * @param em
     * @return
     * @author 王孝元
     */
    public boolean addParnerBillByOneCycle(String bco_code, Integer bcb_cycle, UserCenterEmployee em) {
        // 查询订单信息
        ContractOrderVo bco = billContractOrderService.queryContractOrderByOrderCode(bco_code);
        // 若支持代偿，则进行下一步
        if (billPartnersService.queryIsRepayByPartnerName(bco.getBco_cooperater())) {
            // 查询合同账单
            ContractBillVo bcb = billContractBillService.queryPartnerContractBill(bco_code, bcb_cycle);

            if (bcb != null && bco != null) {
                // 生成金融账单
                BillPartnerBill bpb = new BillPartnerBill();
                bpb.setBco_code(bco.getBco_code());
                bpb.setBpb_cycle(queryNewCycleByOrderCode(bco_code));
                bpb.setBpb_title("第" + bcb.getBcb_cycle() + "期");
                bpb.setBpb_type(1);
                bpb.setBpb_status(1);
                bpb.setBpb_state(0);
                bpb.setBpb_balPay(1);
                bpb.setBpb_repayment(AppUtil.null2Double(bcb.getBcb_repayment()));
                bpb.setBpb_repaymentDate(bcb.getBcb_repaymentDate());
                bpb.setBpb_remarks("临时代偿");
                bpb.setBpb_payee(bco.getBco_cooperater());
                bpb.setBpb_creatorId(em.getEm_id());
                bpb.setBpb_creatorName(em.getEm_name());
                bpb.setBpb_createTime(new Date());
                bpb.setBcb_code(bcb.getBcb_code());
                bpb.setBcb_cycle(bcb.getBcb_cycle());

                this.addBillPartnerBill(bpb);
                // 更改合同账单状态
                bcb.setBcb_state(2);
                bcb.setBcb_isRepay(1);
                billContractBillService.updateBillContractBill(bcb);
                return true;
            }
        }
        return false;
    }

    public boolean addBillPartnerBill(BillPartnerBill partnerBill) {
        return billPartnerBillDao.addBillPartnerBill(partnerBill) > 0;
    }

    /**
     * 与金融公司清退结算
     *
     * @param bco_code
     * @return
     * @author 王孝元
     */
    public boolean addPartnerBillByQuit(String bco_code, String multiCycles, String repaymentDate, UserCenterEmployee em) {
        // 查询订单信息
        ContractOrderVo bco = billContractOrderService.queryContractOrderByOrderCode(bco_code);
        // 查询出剩余期数
        List<ContractBillVo> bills = new ArrayList<>();
        Integer[] cycles = AppUtil.strToIntegerArray(multiCycles);
        for (Integer cyc : cycles) {
            ContractBillVo bcb = billContractBillService.queryPartnerContractBill(bco_code, cyc);
            if (bcb != null) {
                bills.add(bcb);
            }
        }
        // 清退(生成收付账单)
        if (bills.size() > 0 && bills.size() == cycles.length) {
            double totalMoney = 0.0;
            double totalServiceMoney = 0.0;
            double totalDeditMoney = 0.0;
            // 月租金
            double rentMoney = billContractOrderService.queryRentByOrderCode(bco_code);
            // 贷款月数
            int month = AppUtil.null2Int(bco.getBco_totalCycle()) - 1;
            // 服务费率
            double serviceRate = AppUtil
                    .null2Double(billPartnersService.queryServiceRateByPartnerName(bco.getBco_cooperater(), month));
            // 违约金率
            double deditRate = AppUtil
                    .null2Double(billPartnersService.queryDeditByPartnerName(bco.getBco_cooperater()));
            //
            int newCycle = queryNewCycleByOrderCode(bco_code);
            // 剩余月数
            int restCycle = bills.size();
            // 会分期计算方法
            if ("会分期".equals(bco.getBco_cooperater())) {
                // 租客未还款金额
                for (ContractBillVo bill : bills) {
                    totalMoney += AppUtil.null2Double(bill.getBcb_repayment());
                }
                // 退还服务费
                totalServiceMoney = rentMoney * (restCycle - 1) * serviceRate;
            }
            // 58计算方法
            if ("58分期".equals(bco.getBco_cooperater())) {
                // 租客未还款金额
                for (ContractBillVo bill : bills) {
                    totalMoney += AppUtil.null2Double(bill.getBcb_repayment());
                }
                // 退还服务费
                totalServiceMoney = rentMoney * restCycle * serviceRate;
                // 违约金
                totalDeditMoney = rentMoney * deditRate;
            }
            // 生成金融账单
            if (totalMoney > 0) {
                BillPartnerBill bpb = new BillPartnerBill();
                bpb.setBco_code(bco_code);
                bpb.setBpb_cycle(newCycle);
                bpb.setBpb_title("第" + cycles[0] + "-" + cycles[cycles.length - 1] + "期");
                bpb.setBpb_type(1);
                bpb.setBpb_status(1);
                bpb.setBpb_state(0);
                bpb.setBpb_balPay(1);
                bpb.setBpb_repayment(totalMoney);
                bpb.setBpb_repaymentDate(AppUtil.strToShortDate(repaymentDate));
                bpb.setBpb_remarks("清退租金");
                bpb.setBpb_payee(bco.getBco_cooperater());
                bpb.setBpb_creatorId(em.getEm_id());
                bpb.setBpb_creatorName(em.getEm_name());
                bpb.setBpb_createTime(new Date());

                billPartnerBillDao.addBillPartnerBill(bpb);
            }
            if (totalDeditMoney > 0) {
                BillPartnerBill bpb = new BillPartnerBill();
                bpb.setBco_code(bco_code);
                bpb.setBpb_cycle(newCycle);
                bpb.setBpb_title("第" + cycles[0] + "-" + cycles[cycles.length - 1] + "期");
                bpb.setBpb_type(3);
                bpb.setBpb_status(1);
                bpb.setBpb_state(0);
                bpb.setBpb_balPay(1);
                bpb.setBpb_repayment(totalDeditMoney);
                bpb.setBpb_repaymentDate(AppUtil.strToShortDate(repaymentDate));
                bpb.setBpb_remarks("清退违约金");
                bpb.setBpb_payee(bco.getBco_cooperater());
                bpb.setBpb_creatorId(em.getEm_id());
                bpb.setBpb_creatorName(em.getEm_name());
                bpb.setBpb_createTime(new Date());

                billPartnerBillDao.addBillPartnerBill(bpb);
            }
            if (totalServiceMoney > 0) {
                BillPartnerBill bpb = new BillPartnerBill();
                bpb.setBco_code(bco_code);
                bpb.setBpb_cycle(newCycle);
                bpb.setBpb_title("第" + cycles[0] + "-" + cycles[cycles.length - 1] + "期");
                bpb.setBpb_type(2);
                bpb.setBpb_status(1);
                bpb.setBpb_state(0);
                bpb.setBpb_balPay(0);
                bpb.setBpb_repayment(totalServiceMoney);
                bpb.setBpb_repaymentDate(AppUtil.strToShortDate(repaymentDate));
                bpb.setBpb_remarks("清退服务费");
                bpb.setBpb_payee(bco.getBco_cooperater());
                bpb.setBpb_creatorId(em.getEm_id());
                bpb.setBpb_creatorName(em.getEm_name());
                bpb.setBpb_createTime(new Date());

                billPartnerBillDao.addBillPartnerBill(bpb);
            }

            for (ContractBillVo bcb : bills) {
                // 更改合同账单状态
                bcb.setBcb_state(2);
                bcb.setBcb_isRepay(0);
                billContractBillService.updateBillContractBill(bcb);
            }
            return true;
        }
        return false;
    }

    /**
     * 首期金融公司给平台打款
     *
     * @param bco_code 订单号
     * @param em       经办人
     * @return
     */
    public boolean addPartnerBillByFristCycle(String bco_code, UserCenterEmployee em) {
        // 查询订单信息
//		ContractOrderVo bco = billContractOrderService.queryContractOrderByOrderCode(bco_code);
        ContractOrderVo bco = financeManageService.queryFinanceOrder(bco_code);
        if (bco != null && bco.getBco_type() == 202 && bco.getBco_state() == 1 && bco.getBco_optionState() == 2 && ("58分期".equals(bco.getBco_cooperater()) || "会分期".equals(bco.getBco_cooperater()))) {
            List<ContractBillVo> bills = billContractOrderService.queryContractBillsByOrder(bco.getBco_code());
            // 应收租金
            double totalMoney = 0.0;
            // 应扣服务费
            double totalServiceMoney = 0.0;
            // 月租金
            double rentMoney = billContractOrderService.queryRentByOrderCode(bco_code);
            // 贷款月数
            int month = AppUtil.null2Int(bco.getBco_totalCycle()) - 1;
            // 服务费率
            double serviceRate = AppUtil
                    .null2Double(billPartnersService.queryServiceRateByPartnerName(bco.getBco_cooperater(), month));

            for (ContractBillVo bcb : bills) {
                if (bcb.getBcb_cycle() != null && bcb.getBcb_cycle() != 0 && bcb.getBcb_type() == 0) {
                    totalMoney += AppUtil.null2Double(bcb.getBcb_repayment());
                }
            }
            totalServiceMoney += rentMoney * serviceRate * month;
            // 生成金融账单
            BillPartnerBill bpb1 = new BillPartnerBill();
            bpb1.setBco_code(bco_code);
            bpb1.setBpb_cycle(0);
            bpb1.setBpb_title("第0期");
            bpb1.setBpb_type(1);
            bpb1.setBpb_status(1);
            bpb1.setBpb_state(0);
            bpb1.setBpb_balPay(0);
            bpb1.setBpb_repayment(totalMoney);
            bpb1.setBpb_repaymentDate(AppUtil.addDate(new Date(), Calendar.DATE, 2));
            bpb1.setBpb_remarks("应收总租金");
            bpb1.setBpb_payee(bco.getBco_cooperater());
            bpb1.setBpb_creatorId(em.getEm_id());
            bpb1.setBpb_creatorName(em.getEm_name());
            bpb1.setBpb_createTime(new Date());
            billPartnerBillDao.addBillPartnerBill(bpb1);

            BillPartnerBill bpb2 = new BillPartnerBill();
            bpb2.setBco_code(bco_code);
            bpb2.setBpb_cycle(0);
            bpb2.setBpb_title("第0期");
            bpb2.setBpb_type(2);
            bpb2.setBpb_status(1);
            bpb2.setBpb_state(0);
            bpb2.setBpb_balPay(1);
            bpb2.setBpb_repayment(totalServiceMoney);
            bpb2.setBpb_repaymentDate(AppUtil.addDate(new Date(), Calendar.DATE, 2));
            bpb2.setBpb_remarks("应扣服务费");
            bpb2.setBpb_payee(bco.getBco_cooperater());
            bpb2.setBpb_creatorId(em.getEm_id());
            bpb2.setBpb_creatorName(em.getEm_name());
            bpb2.setBpb_createTime(new Date());
            billPartnerBillDao.addBillPartnerBill(bpb2);

            return true;
        }
        return false;
    }

    /**
     * 清退代偿
     *
     * @param bco_code
     * @param multiCycles
     * @param em
     * @param hand_fee
     * @return
     * @author 王孝元
     */
    public boolean addPartnerBillByQuitRepay(String bco_code, String multiCycles, UserCenterEmployee em, boolean hand_fee) {
        // 查询订单信息
        ContractOrderVo bco = billContractOrderService.queryContractOrderByOrderCode(bco_code);
        // 查询出剩余期数
        List<ContractBillVo> bills = new ArrayList<>();
        Integer[] cycles = AppUtil.strToIntegerArray(multiCycles);
        for (Integer cyc : cycles) {
            ContractBillVo bcb = billContractBillService.queryPartnerContractBill(bco_code, cyc);
            if (bcb != null) {
                bills.add(bcb);
            }
        }
        // 判断是否支持代偿
        if (billPartnersService.queryIsRepayByPartnerName(bco.getBco_cooperater())) {
            // 代偿(每期对应生成金融账单)
            if (bills.size() > 0 && bills.size() == cycles.length) {
                // 月租金
                double rentMoney = billContractOrderService.queryRentByOrderCode(bco_code);
                for (ContractBillVo bcb : bills) {
                    // 生成金融账单
                    BillPartnerBill bpb = new BillPartnerBill();
                    bpb.setBco_code(bco.getBco_code());
                    bpb.setBpb_cycle(queryNewCycleByOrderCode(bco_code));
                    bpb.setBpb_title("第" + bcb.getBcb_cycle() + "期");
                    bpb.setBpb_type(1);
                    bpb.setBpb_status(1);
                    bpb.setBpb_state(0);
                    bpb.setBpb_balPay(1);
                    bpb.setBpb_repayment(AppUtil.null2Double(bcb.getBcb_repayment()));
                    bpb.setBpb_repaymentDate(bcb.getBcb_repaymentDate());
                    bpb.setBpb_remarks("清退代偿");
                    bpb.setBpb_payee(bco.getBco_cooperater());
                    bpb.setBpb_creatorId(em.getEm_id());
                    bpb.setBpb_creatorName(em.getEm_name());
                    bpb.setBpb_createTime(new Date());
                    bpb.setBcb_code(bcb.getBcb_code());
                    bpb.setBcb_cycle(bcb.getBcb_cycle());
                    billPartnerBillDao.addBillPartnerBill(bpb);

                    // 更改合同账单状态
                    bcb.setBcb_state(2);
                    bcb.setBcb_isRepay(0);
                    billContractBillService.updateBillContractBill(bcb);

                    // 清退手续费
                    if (hand_fee) {
                        ContractBillVo bill = new ContractBillVo();
                        bill.setBcb_code(AppUtil.getOrderCode("202"));
                        bill.setBco_code(bco.getBco_code());
                        bill.setBcb_cycle(bcb.getBcb_cycle());
                        bill.setBcb_type(17);
                        bill.setBcb_balPay(0);
                        bill.setBcb_repayment(new BigDecimal(rentMoney * 0.06));
                        bill.setBcb_repaymentDate(bcb.getBcb_repaymentDate());
                        bill.setBcb_state(2);
                        bill.setBcb_creator(em.getEm_id());
                        bill.setBcb_createTime(new Date());
                        bill.setBcb_remarks("清退手续费");

                        billContractBillService.addBillContractBill(bill);
                    }
                }
                return true;
            }
        }
        return false;
    }

    /**
     * 获取最新期数
     *
     * @param bco_code
     * @return
     * @author 王孝元
     */
    public int queryNewCycleByOrderCode(String bco_code) {
        int cycle = 0;
        // 查询最大期数
        Integer bpb_cycle = billPartnerBillDao.queryMaxCycleByOrderCode(bco_code);
        if (bpb_cycle != null) {
            cycle = bpb_cycle + 1;
        }
        return cycle;
    }

    /**
     * 查询金融账单
     *
     * @param bco_code
     * @return
     * @author 王孝元
     */
    public List<BillPartnerBill> queryPartnerBillList(String bco_code) {
        // 查询账单列表
        List<BillPartnerBill> list = billPartnerBillDao.queryPartnerBillsByOrderCode(bco_code);
        return list;
    }

    /**
     * 删除金融账单
     *
     * @param bco_code
     * @return
     * @author 王孝元
     */
    public boolean deletePartnerBillsByOrderCode(String bco_code) {
        billPartnerBillDao.deleteBillPartnerBillByOrderCode(bco_code);
        return true;
    }
}
