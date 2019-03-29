package com.gjp.service;

import com.gjp.dao.BudgetDao;
import com.gjp.dao.FinanceManageDao;
import com.gjp.model.ContractBillVo;
import com.gjp.model.ViewBusinessContractVo;
import com.gjp.util.Pagination;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * @author tanglei
 * @description
 * @date Created in 2017/11/30
 */
@Service
public class BudgetService {
    @Resource
    private BudgetDao budgetDao;
    @Resource
    private FinanceManageDao financeManageDao;

    /**
     *预算管理数据
     * @author tanglei
     */
    public Pagination<ContractBillVo> queryBudget(Pagination<ContractBillVo> pagination,String now,String ucc_id) {
        // 保留小数点后两位
        DecimalFormat df = new DecimalFormat("######0.00");
        /**本期*/
        //房东 租金
        BigDecimal LandlordRentNow=new BigDecimal("0.00");
        //房东 押金
        BigDecimal LandlordDepositNow=new BigDecimal("0.00");
        //房东 其它费用
        BigDecimal LandlordOtherNow=new BigDecimal("0.00");
        //租客 租金
        BigDecimal TenantRentNow=new BigDecimal("0.00");
        //租客 押金
        BigDecimal TenantDepositNow=new BigDecimal("0.00");
        //租客 其它
        BigDecimal TenantOtherNow=new BigDecimal("0.00");
        /**往期*/
        //房东 租金
        BigDecimal LandlordRentOld=new BigDecimal("0.00");
        //房东 押金
        BigDecimal LandlordDepositOld=new BigDecimal("0.00");
        //房东 其它费用
        BigDecimal LandlordOtherOld=new BigDecimal("0.00");
        //租客 租金
        BigDecimal TenantRentOld=new BigDecimal("0.00");
        //租客 押金
        BigDecimal TenantDepositOld=new BigDecimal("0.00");
        //租客 其它
        BigDecimal TenantOtherOld=new BigDecimal("0.00");
        BigDecimal money=new BigDecimal("0.00");
        //根据条件查询本期账单结果
        Pagination<ContractBillVo> paginationlist=budgetDao.queryBudget(pagination);
        if (paginationlist.getList().size() >0) {
            for (ContractBillVo fianceBill : paginationlist.getList()) {
                SimpleDateFormat dateformat1=new SimpleDateFormat("yyyy-MM-dd");
                String date=dateformat1.format(fianceBill.getBcb_repaymentDate());
                String nowDate=dateformat1.format(new Date());
                if (date.compareTo(nowDate) >= 0) {
                    if ("托管合同".equals(fianceBill.getContractObject_Type()) && fianceBill.getBcb_type() == 0) {  //房东 租金
                        LandlordRentNow=LandlordRentNow.add(fianceBill.getTotalRepayment() == null ? money : fianceBill.getTotalRepayment());
                    }
                    if ("托管合同".equals(fianceBill.getContractObject_Type()) && fianceBill.getBcb_type() == 1) {  //房东 押金
                        LandlordDepositNow=LandlordDepositNow.add(fianceBill.getTotalRepayment() == null ? money : fianceBill.getTotalRepayment());
                    }
                    if ("托管合同".equals(fianceBill.getContractObject_Type()) && fianceBill.getBcb_type() != 0 && fianceBill.getBcb_type() != 1){  //房东 其它
                        LandlordOtherNow=LandlordOtherNow.add(fianceBill.getTotalRepayment() == null ? money : fianceBill.getTotalRepayment());
                    }
                    if ("租赁合同".equals(fianceBill.getContractObject_Type()) && fianceBill.getBcb_type() == 0) {  //租客 租金
                        TenantRentNow=TenantRentNow.add(fianceBill.getTotalRepayment() == null ? money : fianceBill.getTotalRepayment());
                    }
                    if ("租赁合同".equals(fianceBill.getContractObject_Type()) && fianceBill.getBcb_type() == 1) {  // 租客 押金
                        TenantDepositNow=TenantDepositNow.add(fianceBill.getTotalRepayment() == null ? money : fianceBill.getTotalRepayment());
                    }
                    if ("租赁合同".equals(fianceBill.getContractObject_Type()) && fianceBill.getBcb_type() != 0 && fianceBill.getBcb_type() !=1) {  //租客 其它
                        TenantOtherNow=TenantOtherNow.add(fianceBill.getTotalRepayment() == null ? money : fianceBill.getTotalRepayment());
                    }
                }
            }
        }
        //根据条件查询往期账单结果,之前所有未付款完成的账单
        ContractBillVo fin=new ContractBillVo();
        fin.setContractObject_OptionState(106);
        fin.setBcb_state(2);
        if (!StringUtils.isEmpty(ucc_id)) {
            fin.setUcc_id(Integer.valueOf(ucc_id));
        }
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        if (!StringUtils.isEmpty(now)) {
            try{
                fin.setBcb_repaymentDate(sdf.parse(now));
            } catch (ParseException e){
                e.getMessage();
            }
        } else {
            fin.setBcb_repaymentDate(new Date());
        }
        List<ContractBillVo> contractBillList=this.queryContractBill(fin);
        if (contractBillList.size() >0) {
            for (ContractBillVo bill : contractBillList) {
                if ("托管合同".equals(bill.getContractObject_Type()) && bill.getBcb_type() == 0) {  //房东 租金
                    LandlordRentOld=LandlordRentOld.add(bill.getTotalRepayment() == null ? money : bill.getTotalRepayment()).subtract(bill.getBcb_realPayment() == null ? money : bill.getBcb_realPayment());
                }
                if ("托管合同".equals(bill.getContractObject_Type()) && bill.getBcb_type() == 1) {  //房东 押金
                    LandlordDepositOld=LandlordDepositOld.add(bill.getTotalRepayment() == null ? money : bill.getTotalRepayment()).subtract(bill.getBcb_realPayment() == null ? money : bill.getBcb_realPayment());
                }
                if ("托管合同".equals(bill.getContractObject_Type()) && bill.getBcb_type() != 0 && bill.getBcb_type() != 1){  //房东 其它
                    LandlordOtherOld=LandlordOtherOld.add(bill.getTotalRepayment() == null ? money : bill.getTotalRepayment()).subtract(bill.getBcb_realPayment() == null ? money : bill.getBcb_realPayment());
                }
                if ("租赁合同".equals(bill.getContractObject_Type()) && bill.getBcb_type() == 0) {  //租客 租金
                    TenantRentOld=TenantRentOld.add(bill.getTotalRepayment() == null ? money : bill.getTotalRepayment()).subtract(bill.getBcb_realPayment() == null ? money : bill.getBcb_realPayment());
                }
                if ("租赁合同".equals(bill.getContractObject_Type()) && bill.getBcb_type() == 1) {  // 租客 押金
                    TenantDepositOld=TenantDepositOld.add(bill.getTotalRepayment() == null ? money : bill.getTotalRepayment()).subtract(bill.getBcb_realPayment() == null ? money : bill.getBcb_realPayment());
                }
                if ("租赁合同".equals(bill.getContractObject_Type()) && bill.getBcb_type() != 0 && bill.getBcb_type() !=1) {  //租客 其它
                    TenantOtherOld=TenantOtherOld.add(bill.getTotalRepayment() == null ? money : bill.getTotalRepayment()).subtract(bill.getBcb_realPayment() == null ? money : bill.getBcb_realPayment());
                }
            }
        }
        if (paginationlist.getList().size() >0) {
            for (ContractBillVo fianceBill : paginationlist.getList()) {
                    fianceBill.setLandlordRentNow(LandlordRentNow);
                    fianceBill.setLandlordDepositNow(LandlordDepositNow);
                    fianceBill.setLandlordOtherNow(LandlordOtherNow);
                    fianceBill.setTenantRentNow(TenantRentNow);
                    fianceBill.setTenantDepositNow(TenantDepositNow);
                    fianceBill.setTenantOtherNow(TenantOtherNow);
                    fianceBill.setLandlordRentOld(LandlordRentOld);
                    fianceBill.setLandlordDepositOld(LandlordDepositOld);
                    fianceBill.setLandlordOtherOld(LandlordOtherOld);
                    fianceBill.setTenantRentOld(TenantRentOld);
                    fianceBill.setTenantDepositOld(TenantDepositOld);
                    fianceBill.setTenantOtherOld(TenantOtherOld);
            }
        }
        return paginationlist;
    }

    /**
     * 预算管理列表
     * @author tanglei
     */
    public Pagination<ContractBillVo> queryBudgetList(Pagination<ContractBillVo> pagination,String now) {
        //根据条件查询账单结果
        Pagination<ContractBillVo> paginationlist=budgetDao.queryBudgetList(pagination);
        return paginationlist;
    }

    /**
     * 今天为止之前未完成的账单
     * @param finance
     * @return
     */
    public List<ContractBillVo> queryContractBill(ContractBillVo finance) {
        return budgetDao.queryContractBill(finance);
    }



}
