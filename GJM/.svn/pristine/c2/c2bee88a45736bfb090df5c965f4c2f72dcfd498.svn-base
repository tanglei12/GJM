package com.gjp.service;

import com.alibaba.fastjson.JSON;
import com.gjp.dao.*;
import com.gjp.model.*;
import com.gjp.model.Company;
import com.gjp.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * 订单管理
 *
 * @author 王孝元
 * @version 创建时间：2016年12月1日 下午3:20:03
 */
@Service
public class BillContractOrderService {

    // 合同订单
    @Resource
    private BillContractOrderDao billContractOrderDao;

    // 合同账单
    @Resource
    private BillContractBillDao billContractBillDao;

    // 合同账单
    @Resource
    private FinanceManageDao financeManageDao;

    // 合同
    @Resource
    private ContractService contractObjectService;

    // 账单
    @Resource
    private FinanceManageService financeManageService;

    // 金融账单
    @Resource
    private BillPartnerBillService billPartnerBillService;

    // 房屋
    @Resource
    private HouseLibraryDao housingLibraryDao;

    @Resource
    private HousingAllocationDao housingAllocationDao;

    // 客户
    @Resource
    private CustomerService customerService;

    // 房源带看
    @Resource
    private HouseSeeingService houseSeeingService;

    // 管家
    @Resource
    private UserCenterEmployeeService userCenterEmployeeService;

    // 客户短信记录
    @Resource
    private SmsService smsService;

    /**
     * 用户
     */
    @Autowired
    private UserCenterEmployeeDao employeeDAO;

    /**
     * 查询合同订单
     *
     * @param pageModel
     * @return
     * @author 王孝元
     */
    public PageModel<ContractOrderVo> queryContractOrderList(PageModel<ContractOrderVo> pageModel) {
        return billContractOrderDao.queryBillContractOrderList(pageModel);
    }

    /**
     * APP查询合同订单
     *
     * @return
     * @author 陈智颖
     */
    public List<ContractOrderVo> queryBillContractOrderListApp(ContractOrderVo contractOrderVo) {
        return billContractOrderDao.queryBillContractOrderListApp(contractOrderVo);
    }

    /**
     * 根据订单号查询合同账单(分组封装)
     *
     * @return
     * @author 王孝元
     */
    public List<ContractBillVo> queryContractBillList(String bco_code, Integer cycle) {
        ContractOrderVo order = new ContractOrderVo();
        order.setBco_orderType(AppConfig.order_type_1);
        order.setBco_code(bco_code);
        ContractOrderVo bco = financeManageService.queryFinanceOrder(order);
        // 查询账单列表
        ContractBillVo billVo = new ContractBillVo();
        billVo.setBco_code(bco_code);
        if (cycle != null) {
            billVo.setBcb_cycle(cycle);
        }
        List<ContractBillVo> list = billContractBillDao.queryBillContractBillList(billVo);
        // 获取账单周期时间段
        int arrLen = list.size() - 1;
        Date repaymentEndDate = null;
        for (int i = arrLen; i >= 0; i--) {
            ContractBillVo contractBillVo2 = list.get(i);
            if (bco.getBco_type() == 201 && contractBillVo2.getBcb_cycle() == 0) {
                ContractObjectVo con_code = new ContractObjectVo();
                con_code.setContractObject_Code(bco.getContractObject_code());
                ContractObjectVo contractObject = contractObjectService.queryContractObject(con_code);
                contractBillVo2.setRepaymentEndDate(contractObject.getContractObject_DeadlineTime());
            } else {
                if (contractBillVo2.getBcb_type() == 0) {
                    if (i == arrLen) {
                        ContractObjectVo con_code = new ContractObjectVo();
                        con_code.setContractObject_Code(bco.getContractObject_code());
                        ContractObjectVo contractObject = contractObjectService.queryContractObject(con_code);
                        if (contractObject != null) {
                            contractBillVo2.setRepaymentEndDate(contractObject.getContractObject_DeadlineTime());
//                            repaymentEndDate = contractBillVo2.getBcb_repaymentDate();
                            repaymentEndDate = AppUtil.calendayDate(contractBillVo2.getBcb_repaymentDate(), Calendar.DATE, -1).getTime();
                        }
                    } else {
                        contractBillVo2.setRepaymentEndDate(repaymentEndDate);
                        repaymentEndDate = AppUtil.calendayDate(contractBillVo2.getBcb_repaymentDate(), Calendar.DATE, -1).getTime();
                    }
                } else {
                    if (i == arrLen) {
                        ContractObjectVo con_code = new ContractObjectVo();
                        con_code.setContractObject_Code(bco.getContractObject_code());
                        ContractObjectVo contractObject = contractObjectService.queryContractObject(con_code);
                        if (contractObject != null) {
                            contractBillVo2.setRepaymentEndDate(contractObject.getContractObject_DeadlineTime());
                            repaymentEndDate = contractObject.getContractObject_DeadlineTime();
                        }
                    } else {
                        contractBillVo2.setRepaymentEndDate(repaymentEndDate);
                    }
                }
            }
        }
        // 分组
        Map<String, List<ContractBillVo>> group = new HashMap<String, List<ContractBillVo>>();
        for (ContractBillVo b : list) {
            String cycleNum = b.getBcb_cycle() + "";
            List<ContractBillVo> groupList = group.get(cycleNum);
            if (groupList == null) {
                groupList = new ArrayList<ContractBillVo>();
                groupList.add(b);
                group.put(cycleNum, groupList);
            } else {
                groupList.add(b);
            }
        }
        // 按组封装
        List<ContractBillVo> bills = new ArrayList<ContractBillVo>();
        for (Map.Entry<String, List<ContractBillVo>> entry : group.entrySet()) {
            List<ContractBillVo> cycleGroup = entry.getValue();
            // newBill封装综合数据，childs封装组员
            List<ContractBillVo> childs = new ArrayList<ContractBillVo>();
            ContractBillVo newBill = new ContractBillVo();

            Integer bcb_cycle = null;// 期数
            Integer bcb_type = -1;// 收款类型：-1 综合
            Integer bcb_state = null;// 收款状态
            Double bcb_repayment = 0.0;// 应收金额
            Double bcb_realPayment = 0.0;// 实收金额
            Double bcb_balance = 0.0;// 未收款
            Date bcb_repaymentDate = null;// 应收款时间
            Date bcb_endDate= null; //账单终止日期
            Date bcb_startDate=null; //账单开始日期
            Date bcb_realPaymentDate = null;// 实收款时间
            String bcb_remarks = "";// 备注
            String bco_cooperater = "";
            Date endDate = null;
            for (ContractBillVo cyc : cycleGroup) {
                // 处理账单金额的正负号
                switch (bco.getBco_type()) {
                    /*
                     * bcb_balPay 0:收入，1：支出。
                     * 公司根据托管订单给房东付款，对于公司来说是——支出；账单属性bcb_balPay = 1，若bcb_balPay =
                     * 0,则表示从房东那里收钱，金额成负数 公司根据租赁订单向租客收款，对于公司来说是——收入；账单属性bcb_balPay =
                     * 0，若bcb_balPay = 1,则表示向租客付钱，金额成负数
                     */
                    case 201:
                        if (cyc.getBcb_balPay() == 0) {
                            cyc.setBcb_repayment(new BigDecimal(AppUtil.null2Double(cyc.getBcb_repayment()) * (-1)));
                            cyc.setBcb_realPayment(new BigDecimal(AppUtil.null2Double(cyc.getBcb_realPayment()) * (-1)));
                            cyc.setBcb_balance(new BigDecimal(AppUtil.null2Double(cyc.getBcb_balance()) * (-1)));
                        }
                        break;
                    case 202:
                        if (cyc.getBcb_balPay() == 1) {
                            cyc.setBcb_repayment(new BigDecimal(AppUtil.null2Double(cyc.getBcb_repayment()) * (-1)));
                            cyc.setBcb_realPayment(new BigDecimal(AppUtil.null2Double(cyc.getBcb_realPayment()) * (-1)));
                            cyc.setBcb_balance(new BigDecimal(AppUtil.null2Double(cyc.getBcb_balance()) * (-1)));
                        }
                        break;
                }
                bcb_cycle = cyc.getBcb_cycle();
                bcb_state = cyc.getBcb_state();
                bcb_repayment += AppUtil.null2Double(cyc.getBcb_repayment());
                bcb_realPayment += AppUtil.null2Double(cyc.getBcb_realPayment());
                bcb_balance += AppUtil.null2Double(cyc.getBcb_balance());
                bcb_repaymentDate = cyc.getBcb_repaymentDate();
                bcb_endDate=cyc.getBcb_endDate();
                bcb_startDate=cyc.getBcb_startDate();
                bcb_realPaymentDate = cyc.getBcb_realPaymentDate();
                bco_cooperater = cyc.getBco_cooperater();
                endDate = cyc.getRepaymentEndDate();
                // 封装组员
                childs.add(cyc);
            }
            for (ContractBillVo cyc : cycleGroup) {
                if (cyc.getBcb_state() == 2) {
                    bcb_state = 2;
                    break;
                }
            }
            // 组员排序
            Collections.sort(childs, new Comparator<ContractBillVo>() {
                public int compare(ContractBillVo btb1, ContractBillVo btb2) {
                    int num1 = AppUtil.null2Int(btb1.getBcb_type());
                    int num2 = AppUtil.null2Int(btb2.getBcb_type());
                    return num1 - num2;
                }

            });
            newBill.setBcb_cycle(bcb_cycle);
            newBill.setBcb_type(bcb_type);
            newBill.setBcb_state(bcb_state);
            newBill.setBcb_repayment(new BigDecimal(bcb_repayment));
            newBill.setBcb_realPayment(new BigDecimal(bcb_realPayment));
            newBill.setBcb_balance(new BigDecimal(bcb_balance));
            newBill.setBcb_repaymentDate(bcb_repaymentDate);
            newBill.setBcb_endDate(bcb_endDate);
            newBill.setBcb_startDate(bcb_startDate);
            newBill.setBcb_realPaymentDate(bcb_realPaymentDate);
            newBill.setBcb_remarks(bcb_remarks);
            newBill.setBco_cooperater(bco_cooperater);
            newBill.setRepaymentEndDate(endDate);
            newBill.setChilds(childs);

            bills.add(newBill);
        }
        // 抛出数据集前排一次序，避免中间操作打乱顺序，以防万一
        Collections.sort(bills, new Comparator<ContractBillVo>() {
            public int compare(ContractBillVo btb1, ContractBillVo btb2) {
                int num1 = AppUtil.null2Int(btb1.getBcb_cycle());
                int num2 = AppUtil.null2Int(btb2.getBcb_cycle());
                return num1 - num2;
            }
        });
        return bills;
    }

    /**
     * 根据id查询合同订单
     *
     * @param bco_id
     * @return
     * @author 王孝元
     */
    public ContractOrderVo queryContractOrderById(Integer bco_id) {
        return billContractOrderDao.queryBillContractOrderById(bco_id);
    }

    /**
     * 查询订单类型
     *
     * @return
     * @author 王孝元
     */
    public List<BillTypeVo> queryBillTypeList() {
        return billContractBillDao.queryBillTypeList();
    }

    /**
     * 收款/付款
     *
     * @param billtype   房东还是租客
     * @param code       订单号
     * @param yPay       应收款类型
     * @param wPay       未收款类型
     * @param yMoney     应收金额
     * @param sMoney     实收金额
     * @param date       支付时间
     * @param payName    收款人
     * @param payPhone   收款人电话
     * @param payType    支付类型
     * @param payAccount 支付账号
     * @param cycle      期数
     * @param payState   还款状态
     * @param olinePay   客户订单号
     * @return
     * @throws ParseException
     * @author 陈智颖
     */
    public Map<String, Object> updatePay(String billtype, String code, String yPay, String wPay, Double yMoney, Double sMoney, String date, String payName, String payPhone, String payType, String payAccount, Integer cycle, String payState, String olinePay) throws ParseException {
        Map<String, Object> map = new HashMap<>();

        UserCenterEmployee cookieEmployee2 = AppUtil.getCookieEmployee();

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");

        if (date == null) {
            date = sdf.format(new Date());
        }

        BillTypeVo billTypeVo = new BillTypeVo();
        billTypeVo.setBt_parentCode(2);
        List<BillTypeVo> queryBillTypeList = financeManageDao.queryBillTypeList(billTypeVo);

        List<BillPay> yPayList = JSON.parseArray(yPay, BillPay.class);
        List<BillPay> wPayList = new ArrayList<BillPay>();
        if (!wPay.isEmpty()) {
            wPayList = JSON.parseArray(wPay, BillPay.class);
        }

        List<BillPay> sumPayList = new ArrayList<BillPay>();

        double balance = yMoney - sMoney;

        for (BillTypeVo billTypeVo2 : queryBillTypeList) {
            BillPay billPay1 = new BillPay();
            BillPay billPay2 = new BillPay();
            boolean bools = false;
            boolean boolBalance = false;
            double pMony = 0;
            String types = "";
            for (int i = 0; i < yPayList.size(); i++) {
                if (billTypeVo2.getBt_name().equals(yPayList.get(i).getType())) {
                    types = yPayList.get(i).getType();
                    yPayList.get(i).setTypeInt(billTypeVo2.getBt_code());
                    pMony = yPayList.get(i).getMoney();
                    billPay1 = yPayList.get(i);
                }
                if (i == (yPayList.size() - 1)) {
                    boolBalance = true;
                }
            }
            for (BillPay aWPayList : wPayList) {
                if (billTypeVo2.getBt_name().equals(aWPayList.getType())) {
                    if (types.equals(aWPayList.getType())) {
                        bools = true;
                        pMony = pMony - aWPayList.getMoney();
                        break;
                    } else {
                        aWPayList.setTypeInt(billTypeVo2.getBt_code());
                        if (billtype.equals("托管订单")) {
                            aWPayList.setMoney(-aWPayList.getMoney());
                        }
                        billPay2 = aWPayList;
                    }
                }
            }
            if (bools) {
                if (billPay1.getType() != null) {
                    billPay1.setMoney(pMony);
                    boolean boolr = true;
                    for (BillPay billPay : sumPayList) {
                        if (Objects.equals(billPay.getType(), billPay1.getType())) {
                            boolr = false;
                            break;
                        }
                    }
                    if (boolr) {
                        sumPayList.add(billPay1);
                    }
                }
            } else {
                if (billPay1.getType() != null) {
                    if (boolBalance) {
                        if (yPayList.size() == 1 && wPayList.isEmpty()) {
                            billPay1.setMoney(billPay1.getMoney() - balance);
                        } else {
                            billPay1.setMoney(billPay1.getMoney());
                        }
                    }
                    boolean boolr = true;
                    for (BillPay billPay : sumPayList) {
                        if (Objects.equals(billPay.getType(), billPay1.getType())) {
                            boolr = false;
                            break;
                        }
                    }
                    if (boolr) {
                        sumPayList.add(billPay1);
                    }
                }
                if (billPay2.getType() != null) {
                    boolean boolr = true;
                    for (BillPay billPay : sumPayList) {
                        if (Objects.equals(billPay.getType(), billPay2.getType())) {
                            boolr = false;
                            break;
                        }
                    }
                    if (boolr) {
                        sumPayList.add(billPay2);
                    }
                }
            }
        }

        ContractBillVo contractBillVo = new ContractBillVo();
        contractBillVo.setBco_code(code);
        contractBillVo.setBcb_cycle(cycle);
        List<ContractBillVo> queryContractBillList = financeManageDao.queryFinanceBillList(contractBillVo);
        ContractOrderVo contractOrderVo1 = new ContractOrderVo();
        contractOrderVo1.setBco_code(code);
        ContractOrderVo queryContractOrder = financeManageDao.queryFinanceOrder(contractOrderVo1);

        int bool = -1;
        boolean boot = true;
        // 判断数据库的类型是否一致
        for (BillPay billPay : sumPayList) {
            Random random = new Random();
            Integer rd = random.nextInt(9999 - 1000 + 1) + 1000;
            String number = "210" + (new Date()).getTime() + rd.toString();

            Random random1 = new Random();
            Integer rd1 = random1.nextInt(9999 - 1000 + 1) + 1000;
            String number1 = "220" + (new Date()).getTime() + rd1.toString();
            ContractBillVo contractBillVos = new ContractBillVo();
            boolean booll = true;
            for (ContractBillVo contractBillVo1 : queryContractBillList) {
                if (contractBillVo1.getBcb_cycle().equals(cycle)) {
                    if (contractBillVo1.getBcb_budgetState() != null && contractBillVo1.getBcb_budgetState().equals(1)) {
                        contractBillVos.setBcb_budgetState(2);
                    }
                    if (billPay.getTypeInt().equals(contractBillVo1.getBcb_type())) {
                        if (billtype.equals("托管订单")) {
                            if (contractBillVo1.getBcb_balPay() == 0) {
                                contractBillVo1.setBcb_repayment(new BigDecimal(-contractBillVo1.getBcb_repayment().doubleValue()));
                            } else {
                                contractBillVo1.setBcb_repayment(contractBillVo1.getBcb_repayment());
                            }
                        } else {
                            if (contractBillVo1.getBcb_balPay() == 1) {
                                contractBillVo1.setBcb_repayment(new BigDecimal(-contractBillVo1.getBcb_repayment().doubleValue()));
                            } else {
                                contractBillVo1.setBcb_repayment(contractBillVo1.getBcb_repayment());
                            }
                        }
                        double realpay = 0;
                        if (contractBillVo1.getBcb_realPayment() != null) {
                            realpay = contractBillVo1.getBcb_realPayment().doubleValue();
                        }

                        double balancet = contractBillVo1.getBcb_repayment().doubleValue() - realpay - billPay.getMoney();
                        contractBillVos.setBcb_id(contractBillVo1.getBcb_id());
                        if (balancet == 0 && (payState.equals("已还款") || contractBillVo1.getBcb_state() == 3)) {
                            contractBillVos.setBcb_state(3);
                            contractBillVos.setBcb_realPaymentDate(sdf.parse(date));
                            contractBillVos.setBcb_balance(new BigDecimal(balancet));
                        } else {
                            contractBillVos.setBcb_state(2);
                            contractBillVos.setBcb_balance(new BigDecimal(balancet));
                            contractBillVos.setBcb_realPaymentDate(sdf.parse(date));
                        }
                    }
                    if (boot && contractBillVos.getBcb_balance() != null && contractBillVos.getBcb_balance().doubleValue() != 0) {
                        boot = false;
                    }
                    if (contractBillVo1.getBcb_realPayment() != null && contractBillVo1.getBcb_realPayment().doubleValue() < 0) {
                        contractBillVo1.setBcb_realPayment(new BigDecimal(-contractBillVo1.getBcb_realPayment().doubleValue()));
                    }
                    if (payState.equals("已还款") && contractBillVo1.getBcb_state() == 2) {
                        contractBillVos.setBcb_realPayment(contractBillVo1.getBcb_realPayment());
                    }
                    contractBillVos.setBcb_repaymentDate(contractBillVo1.getBcb_repaymentDate());
                    contractBillVos.setBcb_cycle(contractBillVo1.getBcb_cycle());
                    if (billPay.getTypeInt().equals(contractBillVo1.getBcb_type())) {
                        booll = false;
                        contractBillVos.setBcb_code(contractBillVo1.getBcb_code());
                        break;
                    }
                }
            }

            contractBillVos.setBcb_operater(cookieEmployee2.getEm_id());

            if (booll) {
                double billpay = billPay.getMoney();
                if (billpay < 0) {
                    billpay = -billpay;
                }
                if (payState.equals("已还款") && contractBillVos.getBcb_realPayment() != null) {
                    contractBillVos.setBcb_repayment(new BigDecimal(billpay));
                }
                contractBillVos.setBcb_code(number);
                contractBillVos.setBco_code(queryContractOrder.getBco_code());
                contractBillVos.setBcb_balance(null);
                contractBillVos.setBcb_state(2);
                contractBillVos.setBcb_type(billPay.getTypeInt());
                if (billtype.equals("托管订单")) {
                    if (billPay.getMoney() < 0) {
                        contractBillVos.setBcb_balPay(0);
                    } else {
                        contractBillVos.setBcb_balPay(1);
                    }
                } else {
                    if (billPay.getMoney() > 0) {
                        contractBillVos.setBcb_balPay(0);
                    } else {
                        contractBillVos.setBcb_balPay(1);
                    }
                }
                bool = financeManageDao.addContractBill(contractBillVos);

            } else {
                double realPayt = 0;
                if (contractBillVos.getBcb_realPayment() != null) {
                    realPayt = contractBillVos.getBcb_realPayment().doubleValue();
                }
                double billpay = billPay.getMoney();
                if (billpay < 0) {
                    billpay = -billpay;
                }
                if (olinePay == null) {
                    if (payState.equals("已还款") && contractBillVos.getBcb_realPayment() != null) {
                        contractBillVos.setBcb_realPayment(new BigDecimal(realPayt + billpay));
                    } else {
                        contractBillVos.setBcb_realPayment(new BigDecimal(billpay));
                    }
                } else {
                    contractBillVos.setBcb_balance(new BigDecimal(0));
                }
                bool = financeManageDao.updateFinanceBill(contractBillVos);

                // 修改成功生成流水
                if (bool > 0) {
                    BillStatementFiliation billStatementFiliation = new BillStatementFiliation();
                    billStatementFiliation.setSf_num(contractBillVos.getBcb_code());
                    billStatementFiliation.setSf_type("支付");
                    billStatementFiliation.setSf_statement(number1);
                    billStatementFiliation.setSf_date(sdf.parse(date));
                    financeManageDao.addStatementFiliation(billStatementFiliation);
                    BillStatementVo billStatement = new BillStatementVo();
                    billStatement.setBs_statementNum(number1);
                    billStatement.setBs_payPersion(payName);
                    billStatement.setBs_payPhone(payPhone);
                    if (payState.equals("待还款")) {
                        billStatement.setBs_state("待付款");
                    } else {
                        billStatement.setBs_state("已付款");
                    }
                    billStatement.setBs_payDate(sdf.parse(date));
                    billStatement.setBs_payNum(cycle.toString());
                    billStatement.setBs_money(new BigDecimal(billpay));
                    billStatement.setBs_payType(payType);
                    if (olinePay == null) {
                        billStatement.setBs_payAccount(payAccount);
                    }
                    billStatement.setBs_trade_none(olinePay);
                    bool = financeManageDao.addBillStatement(billStatement);

                }
            }
        }

        if (bool > 0) {
            AddContractBillLogs contractOrderAudting = new AddContractBillLogs();
            UserCenterEmployee cookieEmployee = AppUtil.getCookieEmployee();
            contractOrderAudting.setCbl_text("[" + cookieEmployee.getEm_name() + "]" + "支付订单:" + code + ",金额:" + sMoney);
            contractOrderAudting.setCbl_time(sdf.parse(date));
            contractOrderAudting.setEm_id(cookieEmployee.getEm_id());
            financeManageDao.addContractBillLogs(contractOrderAudting);
        }

        if (bool > 0) {
            // 更改合同订单数据
            ContractOrderVo contractOrderVo = new ContractOrderVo();
            contractOrderVo.setBco_code(code);
            financeManageDao.updateFinanceOrderBillData(contractOrderVo);
            map.put("message", "success");
        } else {
            map.put("message", "error");
        }

        return map;
    }

    /**
     * 定金
     *
     * @return
     * @author 陈智颖
     * @date Apr 1, 2017 11:33:37 AM
     */
    public Map<String, Object> relatedOrdePay(String name, String phone, Double money, String hi_code, String house_address, Integer em_id, String payType, String hs_content, String hs_payType, Integer hs_day, String cc_cardNum, String hs_contractDay) {
        Map<String, Object> map = new HashMap<>();

        BillRelatedOrderVo relatedOrderVo = new BillRelatedOrderVo();

        boolean boo = false;

        SimpleDateFormat sdfc = new SimpleDateFormat("yyyyMMddhhmmss");

        Date date = new Date();
        // 添加、更新关联订单数据 TODO
        String ro_code = AppUtil.getOrderCode("203");
        if (StringUtils.isEmpty(relatedOrderVo.getRo_id())) {
            relatedOrderVo.setRo_code(ro_code);
            relatedOrderVo.setRo_payState(1); // 未付款
            relatedOrderVo.setHouse_address(house_address);
            relatedOrderVo.setHi_code(hi_code);
            relatedOrderVo.setRo_customerName(name);
            relatedOrderVo.setRo_customerPhone(phone);
            relatedOrderVo.setRo_customerType(202);
            relatedOrderVo.setRo_state(AppConfig.BILL_RELATED_STATE_1);
            relatedOrderVo.setRo_creator(em_id);
            relatedOrderVo.setRo_totalMoney(new BigDecimal(money));
            relatedOrderVo.setRo_createTime(date);
            boo = financeManageService.addRelatedOrder(relatedOrderVo);
        } else {
            relatedOrderVo.setRo_state(AppConfig.BILL_RELATED_STATE_1);
            boo = financeManageService.updateRelatedOrder(relatedOrderVo);
        }
        String rb_code = AppUtil.getOrderCode("211");
        if (boo) {
            BillRelatedBillVo relatedBillVo = new BillRelatedBillVo();
            relatedBillVo.setRb_code(rb_code);
            relatedBillVo.setRb_type(18);
            relatedBillVo.setRo_code(ro_code);
            relatedBillVo.setRb_balPay(0);
            relatedBillVo.setRb_payWay(payType);
            relatedBillVo.setRb_paymentMoney(new BigDecimal(money));
            relatedBillVo.setRb_state(AppConfig.BILL_RELATED_STATE_1);
            relatedBillVo.setRb_creator(em_id);
            relatedBillVo.setRb_createTime(date);
            boo = financeManageService.addRelatedBill(relatedBillVo);
            BillRelatedOrderVo relatedOrderVo2 = new BillRelatedOrderVo();
            relatedOrderVo2.setRo_id(relatedOrderVo.getRo_id());
            relatedOrderVo2 = financeManageDao.queryRelatedOrder(relatedOrderVo2);
        }

        Integer bool = 0;
        String out_code = "";
        if (boo) {
            Random random = new Random();
            Integer rd1 = random.nextInt(9999 - 1000 + 1) + 1000;
            String number1 = "220" + (new Date()).getTime() + rd1.toString();

            // 添加流水关系表
            BillStatementFiliation billStatementFiliation = new BillStatementFiliation();
            billStatementFiliation.setSf_num(ro_code);
            billStatementFiliation.setSf_type("支付");
            billStatementFiliation.setSf_statement(number1);
            billStatementFiliation.setSf_date(date);
            bool = financeManageDao.addStatementFiliation(billStatementFiliation);

            // 添加流水表
            BillStatementVo billStatement = new BillStatementVo();
            billStatement.setBs_statementNum(number1);
            billStatement.setBs_payPersion(name);
            billStatement.setBs_payPhone(phone);
            billStatement.setBs_state("待付款");
            billStatement.setBs_payDate(date);
            billStatement.setBs_payNum("0");
            billStatement.setBs_money(new BigDecimal(money));
            billStatement.setBs_payType(payType);
            int ran = random.nextInt(100);
            String code = ro_code;
            out_code = code.substring(code.length() - 6, code.length()) + sdfc.format(new Date()) + ran + 19;
            billStatement.setBs_trade_none(out_code);
            bool = financeManageDao.addBillStatement(billStatement);

            // 1.生成客户信息
            String cc_code = customerService.addIntentionCustomer(name, phone, cc_cardNum);
            // 2.添加带看信息
            HouseSeeing houseSeeing = new HouseSeeing();
            houseSeeing.setCc_code(cc_code);
            houseSeeing.setEm_id(em_id);
            houseSeeing.setHi_code(hi_code);
            houseSeeing.setHs_payType(hs_payType);
            houseSeeing.setHs_day(hs_day);
            houseSeeing.setHs_contractDay(hs_contractDay);
            List<HouseSeeing> queryHouseSeeingList = houseSeeingService.queryHouseSeeingList(houseSeeing);
            if (queryHouseSeeingList.isEmpty()) {
                houseSeeing.setHs_content("收定(未支付)[" + hs_content + "]");
                houseSeeing.setHs_createTime(new Date());
                houseSeeingService.addHouseSeeing(houseSeeing);
            }

            // 保存客户日志
            UserCustomerLog customerLog = new UserCustomerLog();
            customerLog.setCc_code(cc_code);
            customerLog.setCl_type(79);// 带看
            customerLog.setCl_content("【客户带看，缴纳定金】");
            customerLog.setCl_author(em_id);
            customerLog.setCl_source(2);// 系统添加
            customerLog.setCl_createTime(new Date());
            customerService.addUserCustomerLog(customerLog);
        }

        if (bool > 0) {
            map.put("message", "success");
            map.put("out_code", out_code);
            map.put("ro_code", ro_code);
            map.put("money", money);
        } else {
            map.put("message", "error");
        }
        return map;
    }

    /**
     * 根据合同编号查询订单
     *
     * @param contractObject_code
     * @return
     */
    public ContractOrderVo queryContractOrderByContractCode(String contractObject_code) {
        ContractOrderVo order = new ContractOrderVo();
        order.setContractObject_code(contractObject_code);
        return billContractOrderDao.queryBillContractOrderByProperty(order);
    }

    /**
     * 付款返回
     * <p>
     * 获取支付宝的通知返回参数，可参考技术文档中页面跳转同步通知参数列表
     *
     * @param out_trade_no 商户订单号
     * @param trade_no     支付宝交易号
     * @param notify_time  实际支付时间
     * @return
     * @throws ParseException
     */
    public String aliPay(String out_trade_no, String trade_no, String notify_time, String buyer_email) throws ParseException {

        int bools = 0;
        // 订单号
        String code = "";
        // 期数
        int cycle = 0;
        // 时间段
        String date = "";
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        SimpleDateFormat sfd = new SimpleDateFormat("yyyy-MM-dd");
        BillStatementVo billStatementVo = new BillStatementVo();
        billStatementVo.setBs_payNo(trade_no);
        String contractObject_Code = "";
        Double money = 0.0;
        if (financeManageDao.selectBusinessStatement(billStatementVo).isEmpty()) {
            BillStatementFiliation statementFiliation = new BillStatementFiliation();
            statementFiliation.setBs_trade_none(out_trade_no);
            List<BillStatementFiliation> queryStatementFiliationList = financeManageDao.queryStatementFiliationList(statementFiliation);
            // 判断流水状态是否待还款
            for (BillStatementFiliation billStatementFiliation : queryStatementFiliationList) {
                if (billStatementFiliation.getBs_state().equals("待付款")) {
                    BillStatementVo billStatementVo1 = new BillStatementVo();
                    billStatementVo1.setBs_statementNum(billStatementFiliation.getBs_statementNum());
                    billStatementVo1.setBs_payNo(trade_no);
                    billStatementVo1.setBs_state("已付款");
                    billStatementVo1.setBs_arrivalDate(sf.parse(notify_time));
                    bools = financeManageDao.updateBusinessStatementPay(billStatementVo1);
                    // 改变账单状态和订单状态
                    if (bools > 0) {
                        ContractBillVo contractBillVo = new ContractBillVo();
                        contractBillVo.setBcb_code(billStatementFiliation.getSf_num());
                        ContractBillVo contractBill = financeManageDao.queryFinanceBill(contractBillVo);
                        code = contractBill.getBco_code();
                        cycle = contractBill.getBcb_cycle();
                        double bcb_balance = 0;
                        double bs_money = 0;
                        double bs_real = 0;
                        if (contractBill.getBcb_balance() != null) {
                            bcb_balance = contractBill.getBcb_balance().doubleValue();
                        }
                        if (contractBill.getBcb_realPayment() != null) {
                            bs_real = contractBill.getBcb_realPayment().doubleValue();
                        }
                        if (billStatementFiliation.getBs_money() != null) {
                            bs_money = billStatementFiliation.getBs_money().doubleValue();
                            money += bs_money;
                        }
                        double balance = contractBill.getBcb_repayment().doubleValue() - bs_money - bcb_balance;
                        if (balance > 0) {
                            balance = balance - bs_real;
                        }
                        if (balance == 0) {
                            contractBill.setBcb_state(3);
                            contractBill.setBcb_realPayment(contractBill.getBcb_repayment());
                        } else {
                            contractBill.setBcb_realPayment(billStatementFiliation.getBs_money());
                        }
                        contractBill.setBcb_balance(new BigDecimal(balance));
                        bools = financeManageDao.updateFinanceBill(contractBill);
                    }
                }
            }
        }
        if (bools > 0) {
            ContractBillVo contractBillVo = new ContractBillVo();
            contractBillVo.setBco_code(code);
            contractBillVo.setBcb_cycle(cycle);
            List<ContractBillVo> queryContractBillList = financeManageDao.queryFinanceBillList(contractBillVo);
            date += sfd.format(queryContractBillList.get(0).getBcb_repaymentDate());
            boolean boolt = true;
            for (ContractBillVo contractBillVo1 : queryContractBillList) {
                if (contractBillVo1.getBcb_state() == 2) {
                    boolt = false;
                    break;
                }
            }
            if (boolt) {
                ContractOrderVo contractOrder = new ContractOrderVo();
                contractOrder.setBco_code(code);
                ContractOrderVo contractOrders = financeManageDao.queryFinanceOrder(contractOrder);
                contractObject_Code = contractOrders.getContractObject_code();
                if (contractOrders.getBco_totalCycle() == (cycle + 1)) {
                    date = "完成";
                } else {
                    contractOrder.setBco_currentCycle(cycle + 1);
                    ContractBillVo contractBillVo2 = new ContractBillVo();
                    contractBillVo2.setBco_code(code);
                    contractBillVo2.setBcb_cycle(cycle + 1);
                    ContractBillVo queryContractBill = financeManageDao.queryFinanceBillList(contractBillVo2).get(0);
                    Calendar dates = Calendar.getInstance();
                    dates.setTime(queryContractBill.getBcb_repaymentDate());
                    dates.set(Calendar.DATE, dates.get(Calendar.DATE) - 1);
                    date += "至" + sfd.format(dates.getTime());
                }
                // 短信发送
                ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
                contractVo.setContractObject_Code(contractObject_Code);
                ViewBusinessContractVo selectContractObjectByCNo = contractObjectService.selectContractObjectByCNo(contractVo);
                ViewHouseLibraryInfoVo houseLibraryInfoVo = new ViewHouseLibraryInfoVo();
                houseLibraryInfoVo.setHi_code(selectContractObjectByCNo.getHi_code());
                ViewHouseLibraryInfoVo queryHouseLibraryInfo = housingLibraryDao.queryHouseLibraryInfo(houseLibraryInfoVo);
                // 客户姓名
                String customerName = selectContractObjectByCNo.getCc_name();
                String customerPhone = selectContractObjectByCNo.getCcp_phone();
                List<Map<String, Object>> resultList = SendMsg.sandPayBill(customerName, queryHouseLibraryInfo.getHouse_address(), date, money, "", customerPhone, selectContractObjectByCNo.getContractBody_GjPhone());

                // 保存客户短信记录 shenhx 20170709
                if (null != resultList && !resultList.isEmpty()) {
                    for (Map<String, Object> map : resultList) {
                        UserCenterInformation userCenterInformation = new UserCenterInformation();
                        userCenterInformation.setHi_code(selectContractObjectByCNo.getHi_code());
                        userCenterInformation.setContractObject_code(contractObject_Code);
                        userCenterInformation.setMsg_content((String) map.get("msg_content"));// 短信内容
                        userCenterInformation.setSend_result((Integer) map.get("sendResult"));// 发送结果
                        userCenterInformation.setEm_id(1);// 系统
                        userCenterInformation.setReceive_type((Integer) map.get("receive_type"));
                        userCenterInformation.setReceive_em_id(selectContractObjectByCNo.getEm_id());
                        userCenterInformation.setReceive_cc_code(selectContractObjectByCNo.getCc_code());
                        userCenterInformation.setSend_time(new Date());
                        smsService.addUserCenterInformation(userCenterInformation);
                    }
                }
            }
            if (bools > 0) {
                // 更改合同订单状态
                ContractOrderVo contractOrderVo = new ContractOrderVo();
                contractOrderVo.setBco_code(code);
                financeManageDao.updateFinanceOrderBillData(contractOrderVo);
                return "success";
            } else {
                return "fail";
            }
        }
        return "fail";
    }

    /**
     * 查询合同订单
     *
     * @author tanglei
     * @Date 2017年7月23日 下午17:15:55
     */
    public ContractOrderVo selectContractOrder(ContractOrderVo contractOrderVo) {
        return billContractOrderDao.selectContractOrder(contractOrderVo);
    }

    /**
     * 根据订单号查询订单
     *
     * @param bco_code
     * @return
     * @author 王孝元
     */
    public ContractOrderVo queryContractOrderByOrderCode(String bco_code) {
        ContractOrderVo order = new ContractOrderVo();
        order.setBco_code(bco_code);
        return billContractOrderDao.queryBillContractOrderByProperty(order);
    }

    /**
     * 判断是否支付成功
     *
     * @param billVo
     * @return
     * @author chen
     * @date Feb 4, 2017 11:51:53 AM
     */
    public List<ContractBillVo> selectPayBillSuccess(ContractBillVo billVo) {
        return billContractOrderDao.selectPayBillSuccess(billVo);
    }

    /**
     * 判断关联订单是否支付成功
     *
     * @return
     * @author chen
     * @date Feb 4, 2017 11:51:53 AM
     */
    public int selectPayBillSuccessRQcode(BillRelatedOrderVo relatedOrderVo) {
        BillRelatedOrderVo queryRelatedOrder = financeManageDao.queryRelatedOrder(relatedOrderVo);
        if (queryRelatedOrder != null && queryRelatedOrder.getRo_payState() == 2) {
            return 1;
        } else {
            return 0;
        }
    }

    /**
     * 根据订单号查询月租金
     *
     * @param bco_code
     * @return
     * @author 王孝元
     */
    public double queryRentByOrderCode(String bco_code) {
        return AppUtil.null2Double(billContractOrderDao.queryRentByOrderCode(bco_code));
    }

    /**
     * 查询订单下所有账单
     *
     * @param bco_code
     * @return
     * @author 王孝元
     */
    public List<ContractBillVo> queryContractBillsByOrder(String bco_code) {
        ContractBillVo contractBillVo = new ContractBillVo();
        contractBillVo.setBco_code(bco_code);
        return billContractBillDao.queryBillContractBillList(contractBillVo);
    }

    /**
     * 初始化合作订单
     *
     * @return
     * @author 王孝元
     */
    public boolean initPartnerOrderData() {
        int count = 0;
        // 查询需要初始化的订单
        List<ContractOrderVo> list = billContractOrderDao.queryInitPartnerOrder();
        for (ContractOrderVo bco : list) {
            // 清空金融账单
            billPartnerBillService.deletePartnerBillsByOrderCode(bco.getBco_code());
            // 初始化
            UserCenterEmployee em = new UserCenterEmployee();
            em.setEm_id(1);
            em.setEm_name("系统");
            billPartnerBillService.addPartnerBillByFristCycle(bco.getBco_code(), em);
            System.out.println("初始化成功：1");
            count++;
        }
        System.out.println("更新共：" + count + "条");
        return true;
    }

    /**
     * 初始化订单总金额
     *
     * @return
     * @author 王孝元
     */
    public boolean initOrderTotalPayment() {
        int count = 0;
        // 查询需要初始化的订单
        List<ContractOrderVo> list = billContractOrderDao.queryInitTotalPaymentOrder();
        for (ContractOrderVo bco : list) {
            billContractOrderDao.updateBillContractOrder(bco);
            System.out.println("初始化成功：1");
            count++;
        }
        System.out.println("更新共：" + count + "条");
        return true;
    }

    /**
     * 初始化订单逾期天数
     *
     * @return
     * @author 王孝元
     */
    public boolean initOrderOverDueDay() {
        int count = 0;
        // 查询需要初始化的订单
        List<ContractOrderVo> list = billContractOrderDao.queryInitOverDueDayOrder();
        for (ContractOrderVo bco : list) {
            billContractOrderDao.updateBillContractOrder(bco);
            System.out.println("初始化成功：1");
            count++;
        }
        System.out.println("更新共：" + count + "条");
        return true;
    }

    /**
     * 根据订单code查询账单信息
     *
     * @author tanglei
     * @Date 2017年8月1日  上午10:21:55
     */
    public List<ContractBillVo> selectBillContractBillCode(ContractBillVo financeBill) {
        return billContractBillDao.selectBillContractBillCode(financeBill);
    }

    /**
     * 查询订单下所有账单
     *
     * @return
     * @author 王孝元
     */
    public List<ContractBillVo> queryBillContractByConCode(String con_code) {
        return billContractBillDao.queryBillContractByConCode(con_code);
    }

    /**
     * 查询待收待付
     *
     * @param
     * @return
     * @author 陈智颖
     * @create 25/11/17 17:25
     **/
    public Map<String, Object> billContractOrderListApp(Integer pageNo, Integer pageSize, Integer bco_type, String where, Integer em_id) {
        Map<String, Object> map = new HashMap<>();
        ContractOrderVo billContractOrderVo = new ContractOrderVo();
        billContractOrderVo.setPageNo(pageNo);
        billContractOrderVo.setPageSize(pageSize);
        billContractOrderVo.setBco_type(bco_type);
        billContractOrderVo.setWhere(where);
        List<Company> company = employeeDAO.selectCompanyByPersonId(em_id);
        if (Objects.equals(company.get(0).getEm_id(), em_id)) {
            billContractOrderVo.setUcc_id(company.get(0).getUcc_id());
        } else {
            billContractOrderVo.setEm_id(em_id);
        }
        List<ContractOrderVo> billContractOrders = queryBillContractOrderListApp(billContractOrderVo);
        List<NeedMatters> needMatterss = new ArrayList<>();
        for (ContractOrderVo contractOrderVo : billContractOrders) {
            int random = (int) Math.round(Math.random() * 12 + 1);
            NeedMatters needMatters = new NeedMatters();
            needMatters.setPotoImage("/resources/image/appPage/stay/" + random + ".png");
            needMatters.setHouse_address(contractOrderVo.getHouse_address());
            needMatters.setName(contractOrderVo.getBco_customerName());
            Integer day = contractOrderVo.getContractObject_dateDiff();
            if (day != null) {
                needMatters.setDay(day);
            } else {
                needMatters.setDay(0);
            }
            if (contractOrderVo.getBco_type() == 201) {
                needMatters.setState("托管");
                needMatters.setStateColor("#FF6666");
            } else {
                needMatters.setState("租赁");
                needMatters.setStateColor("#1ABC9C");
            }
            needMatters.setMoney(contractOrderVo.getBco_currentPayment().doubleValue());
            needMatters.setLeaseTerm(contractOrderVo.getBco_currentCycle() + "/" + contractOrderVo.getBco_totalCycle() + "期");
            needMatterss.add(needMatters);
        }
        if (billContractOrders.isEmpty()) {
            map.put("code", 401);
            map.put("msg", "没有更多数据");
        } else {
            map.put("data", needMatterss);
            map.put("code", 200);
        }
        return map;
    }

}
