package com.gjp.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.gjp.model.*;
import com.gjp.service.*;
import com.gjp.util.*;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * 记账本
 *
 * @author tanglei
 * date 2017年6月21日 上午11:11:40
 */
@Controller
@RequestMapping("/bookkeep")
public class BillBookkeepBookController {
    @Resource
    private BillBookkeepBookService billBookkeepBookService;
    @Resource
    private UserCenterEmployeeService userCenterEmployeeService;
    @Resource
    private BillApplyExpenseService billApplyExpenseService;
    @Resource
    private BillExpenseService billExpenseService;
    @Resource
    private BillApprovalRecordService billApprovalRecordService;
    @Resource
    private UserDictionaryService userDictionaryService;
    @Resource
    private ContractService contractService;
    @Resource
    private CustomerService customerService;

    /**
     * 获取当前时间
     *
     * @author tanglei
     */
    public static Date getCurrentDate() {
        return new Date(System.currentTimeMillis());
    }

    /**
     * 报销流水号
     *
     * @author Administrator
     */
    public static String number() {
        //随机字符串
        int x;//定义两变量
        Random ne = new Random();//实例化一个random的对象ne
        x = ne.nextInt(9999 - 1000 + 1) + 1000;//为变量赋随机值1000-9999
        long time = System.currentTimeMillis() / 1000L; //时间戳
        StringBuffer result = new StringBuffer();
        result.append("260");
        result.append(time);
        result.append(x);
        return result.toString();
    }


    /**
     * 跳转记账表
     *
     * @author tanglei
     */
    @RequestMapping("/book")
    public String book() {
        return "bookkeepBook/bookkeeoBookList";
    }

    /**
     * 记账列表
     *
     * @throws ParseException
     * @author tanglei
     * date 2017年6月21日 上午11:21:40
     */
    @RequestMapping("/bookkeepList")
    @ResponseBody
    public Map<String, Object> bookkeepList(TableList tableList1) throws ParseException {
        // 初始化获取对象
        TableList tableList = tableList1.initData(tableList1);
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");

        HouseModel houseModel = new HouseModel();
        if (tableList.getDateStart() != null && !tableList.getDateStart().equals("")) {
            houseModel.setDateStart(sf.parse(tableList.getDateStart()));
        }
        if (tableList.getDateEnd() != null && !tableList.getDateEnd().equals("")) {
            houseModel.setDateEnd(sf.parse(tableList.getDateEnd()));
        }
        houseModel.setSqlWhere(tableList.getSqlWhere());

        houseModel.setDateTitle(tableList.getDateType());
        if (tableList.getOrderBy() != null && !tableList.getOrderBy().equals("")) {
            houseModel.setSqlOrderBy("order by " + tableList.getOrderBy() + " asc");
        } else {
            houseModel.setSqlOrderBy("order by bk_time DESC ");
        }
        // 装载数据类
        DataList<ViewBillBookkeepBookVo> datalist = new DataList<ViewBillBookkeepBookVo>();
        int pageSize = Integer.parseInt(AppUtil.getCookie("pageSize"));
        // 分页设置查询条数
        PageModel<ViewBillBookkeepBookVo> pageModel1 = billBookkeepBookService.selectBookkeepBook(tableList.getPageNo(), pageSize, houseModel);
        Map<String, Object> map = datalist.dataList(pageModel1.getList(), tableList.getPageNo(), pageSize, pageModel1.getTotalRecords(), pageModel1.getSumMoney());
        return map;
    }

    /**
     * 跳转添加页面
     *
     * @author tanglei
     */
    @RequestMapping("/addBookkeep")
    @ResponseBody
    public Map<String, Object> addBookkeep(HttpServletResponse resp) {
        String uid = AppUtil.getCookie(AppConfig.COOKIE_USER_ID);
        UserCenterEmployee user = userCenterEmployeeService.selectUserCenterEmployeeById(Integer.valueOf(uid.toString()));
        Map<String, Object> condition = new HashMap<>();
        condition.put("condition", user);
        return condition;
    }

    /**
     * 提交记录
     *
     * @author tanglei
     */
    @RequestMapping("/save")
    @ResponseBody
    public String save(HttpServletResponse resp, String result) {
        Msg<Object> msg = new Msg<>();
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            return msg.toError(Msg.MSG_LOGIN_ERROR);
        }
        ViewBillBookkeepBookVo book = JSONObject.parseObject(result, ViewBillBookkeepBookVo.class);
        if (book.getBk_typee() == 1) {
            book.setBk_state(4);
        } else {
            if (book.getBk_typee() == 2 && book.getBk_type() == 2) {
                book.setBk_state(5);
            } else {
                book.setBk_state(1);
            }
        }
        book.setBk_em_id(employee.getEm_id());
        book.setBk_time(new Date());
        boolean boo = true;
        if (book.getBk_id() == null) {
            boo = billBookkeepBookService.addBookkeepBook(book);
        } else {
            boo = billBookkeepBookService.updateBookkeepBook(book);
        }
        if (!boo) {
            msg.setCode(110);
            msg.setMsg("提交失败");
            return msg.toString();
        }
        return msg.toString();
    }

    /**
     * 点击编辑跳转页面
     *
     * @author tanglei
     */
    @RequestMapping("/selectBookkeep")
    @ResponseBody
    public Map<String, Object> selectBookkeep(HttpServletRequest req, int bk_id) {
        Map<String, Object> condition = new HashMap<>();
        ViewBillBookkeepBookVo book = billBookkeepBookService.selectBookkeep(bk_id);
        ContractObjectVo contract = new ContractObjectVo();
        if (!StringUtils.isEmpty(book.getBk_hi_code())) {
            contract.setHi_code(book.getBk_hi_code());
            ContractObjectVo contractObject = contractService.selectHouseHiCode(contract);
            condition.put("contractObject", contractObject);
            if (book.getBk_contractObject_1st() != null) {
                UserCustomer user=new UserCustomer();
                user.setCc_code(book.getBk_contractObject_1st());
                UserCustomer usercustomer=customerService.selectCustomerCode(user);
                condition.put("usercustomer", usercustomer);
            }
            ContractObjectVo con=new ContractObjectVo();
            con.setHi_code(book.getBk_hi_code());
            Map<String, Object> mapUser=this.selectUserCustomer(con);
            condition.put("mapUser",mapUser);
        }
        if (book.getBk_enclasure() != null) {
            String[] img=book.getBk_enclasure().split(",");
            String imgs="";
            for (int i=0;i<img.length;i++) {
                imgs += OSSparameter.imagePath(img[i],null,null)+",";
            }
            book.setBk_enclasure(imgs);
        }
        condition.put("condition", book);
        return condition;
    }

    /**
     * 报销
     *
     * @author tanglei
     * date 2017年6月23日 下午15:15:40
     */
    @RequestMapping("/reimbursement")
    @ResponseBody
    public Map<String, Object> reimbursement() {
        String uid = AppUtil.getCookie(AppConfig.COOKIE_USER_ID);
        UserCenterEmployee user = new UserCenterEmployee();
        user.setEm_id(Integer.valueOf(uid));
        UserCenterEmployee userInfo = userCenterEmployeeService.selectUserCenterEmployeeInfo(user);
//		Company company=new Company();
//		List<Map<String,Object>> list=userCenterEmployeeService.selectdepartment(company);
        Map<String, Object> map = new HashMap<>();
        map.put("user", userInfo);
//		json.put("department", list);
        return map;
    }

    /**
     * 删除
     *
     * @author tanglei
     * date 2017年6月23日 下午15:35:40
     */
    @RequestMapping("/delete")
    @ResponseBody
    public String delete(HttpServletRequest req, int bk_id) {
        Msg<Object> msg = new Msg<>();
        ViewBillBookkeepBookVo book = billBookkeepBookService.selectBookkeep(bk_id);
        book.setBk_state(3);
        boolean boo = billBookkeepBookService.updateBookkeepBook(book);
        if (!boo) {
            msg.setCode(110);
            msg.setMsg("报销失败");
            return msg.toString();
        }
        return msg.toString();
    }

    /**
     * 报销数据
     *
     * @author tanglei
     * date 2017年6月26日 上午9:21:40
     */
    @RequestMapping("/bookExpenseList")
    @ResponseBody
    public PageModel<ViewBillBookkeepBookVo> bookExpenseList(TableList tableList1) {
        HouseModel houseModel = new HouseModel();
        houseModel.setSqlOrderBy("order by bk_time DESC ");
        PageModel<ViewBillBookkeepBookVo> bookExpense = billBookkeepBookService.bookExpenseList(houseModel);
        return bookExpense;
    }

    /**
     * 一条报销数据
     *
     * @author tanglei
     */
    @RequestMapping("/ExpenseOne")
    @ResponseBody
    public ViewBillBookkeepBookVo ExpenseOne(int bk_id) {
        ViewBillBookkeepBookVo book = billBookkeepBookService.selectBookkeep(bk_id);
        return book;
    }

    /**
     * 添加报销数据
     *
     * @author tanglei
     * date 2017年6月26日 下午18:21:40
     */
    @RequestMapping("/addExpense")
    @ResponseBody
    public String addExpense(String result) {
        BigDecimal volumn = new BigDecimal("0");   //总报销金额
        Msg<Object> msg = new Msg<>();
        JSONArray json = JSON.parseArray(result);
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            return msg.toError(Msg.MSG_LOGIN_ERROR);
        }
        String num = BillBookkeepBookController.number();
        String person = "";        //审核人
        String department = "";    //申请人部门
        StringBuffer enclasure = new StringBuffer();     //附件
        if (json.size() > 0) {
            for (int i = 0; i < json.size(); i++) {
                String str = json.get(i).toString();
                BillApplyExpense billApplyExpense = JSONObject.parseObject(str, BillApplyExpense.class);
                ViewBillBookkeepBookVo book = billBookkeepBookService.selectBookkeep(billApplyExpense.getBx_bk_id());   //查询单条记账本申请报销数据
                book.setBk_state(2);
                boolean boo = billBookkeepBookService.updateBookkeepBook(book);
                if (!boo) {
                    msg.setCode(110);
                    msg.setMsg("提交申请失败");
                    return msg.toString();
                }
                person = billApplyExpense.getBx_person();
                department = billApplyExpense.getBx_partment();
                String img = "";
                if (book.getBk_enclasure() != "" && book.getBk_enclasure() != null) {
                    img = book.getBk_enclasure();
                }
                enclasure.append(img);
                billApplyExpense.setBx_pay(book.getBk_pay());
                billApplyExpense.setBx_enclasure(book.getBk_enclasure());
                billApplyExpense.setBx_state(1);
                billApplyExpense.setBx_em_id(employee.getEm_id());
                billApplyExpense.setBx_time(BillBookkeepBookController.getCurrentDate());
                billApplyExpense.setBx_number(num);
                volumn = volumn.add(billApplyExpense.getBx_expense_money());
                boo = billApplyExpenseService.addApplyExpense(billApplyExpense);
                if (!boo) {
                    msg.setCode(110);
                    msg.setMsg("提交申请失败");
                    return msg.toString();
                }
            }
            ViewBillExpenseVo billExpense = new ViewBillExpenseVo();
            billExpense.setEx_em_id(employee.getEm_id());
            billExpense.setEx_person(person);
            billExpense.setEx_partment(department);
            billExpense.setEx_time(BillBookkeepBookController.getCurrentDate());
            billExpense.setEx_state(1);
            billExpense.setEx_expense_money(volumn);
            billExpense.setEx_number(num);
            billExpense.setEx_enclasure(enclasure.toString());
            boolean boo = billExpenseService.addExpense(billExpense);
            if (!boo) {
                msg.setCode(110);
                msg.setMsg("提交申请失败");
                return msg.toString();
            }
        }
        return msg.toString();
    }

    /**
     * 跳转报销管理页面
     *
     * @author tanglei
     * date 2017年6月24日 下午15:37:40
     */
    @RequestMapping("/expense")
    public String expense() {
        return "bookkeepBook/expenseList";
    }

    /**
     * 报销列表
     *
     * @throws ParseException
     * @author tanglei
     * date 2017年6月24日 下午15:07:40
     */
    @RequestMapping("/expenseList")
    @ResponseBody
    public Map<String, Object> expenseList(TableList tableList1) throws ParseException {
        // 初始化获取对象
        TableList tableList = tableList1.initData(tableList1);
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");

        HouseModel houseModel = new HouseModel();
        if (tableList.getDateStart() != null && !tableList.getDateStart().equals("")) {
            houseModel.setDateStart(sf.parse(tableList.getDateStart()));
        }
        if (tableList.getDateEnd() != null && !tableList.getDateEnd().equals("")) {
            houseModel.setDateEnd(sf.parse(tableList.getDateEnd()));
        }
        houseModel.setSqlWhere(tableList.getSqlWhere());

        houseModel.setDateTitle(tableList.getDateType());
        if (tableList.getOrderBy() != null && !tableList.getOrderBy().equals("")) {
            houseModel.setSqlOrderBy("order by " + tableList.getOrderBy() + " asc");
        } else {
            houseModel.setSqlOrderBy("order by ex_time DESC ");
        }
        // 装载数据类
        DataList<ViewBillExpenseVo> datalist = new DataList<ViewBillExpenseVo>();
        int pageSize = Integer.parseInt(AppUtil.getCookie("pageSize"));
        houseModel.setMode(String.valueOf(1)); //状态
        // 分页设置查询条数
        PageModel<ViewBillExpenseVo> pageModel1 = billExpenseService.selectExpenseList(tableList.getPageNo(), pageSize, houseModel);
        Map<String, Object> map = datalist.dataList(pageModel1.getList(), tableList.getPageNo(), pageSize, pageModel1.getTotalRecords(), pageModel1.getSumMoney());
        return map;
    }

    /**
     * 报销管理 弹出框
     *
     * @author tanglei
     */
    @RequestMapping("/expenseResult")
    public String expenseResult() {
        return "bookkeepBook/expenseResult";
    }

    /**
     * 报销单
     *
     * @author tanglei
     * date 2017年6月27日 下午13:21:40
     */
    @RequestMapping("/result")
    @ResponseBody
    public String result(String cno) {
        Msg<Object> msg = new Msg<Object>();
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            return msg.toError(Msg.MSG_LOGIN_ERROR);
        }
        //申请报销数据
        BillApplyExpense billApplyExpense = new BillApplyExpense();
        billApplyExpense.setBx_number(cno);
        billApplyExpense.setBx_state(5);
        List<Map<String, Object>> applyExpenselist = billApplyExpenseService.selectApplyList(billApplyExpense);  //申请报销数据列表
        ViewBillExpenseVo viewBillExpenseVo = new ViewBillExpenseVo();
        viewBillExpenseVo.setEx_number(cno);
        viewBillExpenseVo = billExpenseService.selectExpense(viewBillExpenseVo);   //报销管理
        if (viewBillExpenseVo.getEx_enclasure() != null && !StringUtils.isEmpty(viewBillExpenseVo.getEx_enclasure())) {
            String[] img=viewBillExpenseVo.getEx_enclasure().split(",");
            String imgg="";
            for (int i=0;i<img.length;i++) {
                imgg+=OSSparameter.imagePath(img[i],null,null)+",";
            }
            viewBillExpenseVo.setEx_enclasure(imgg);
        }
        BillApprovalRecord approvalRecord = new BillApprovalRecord();
        approvalRecord.setAr_number(cno);
        List<Map<String, Object>> Record = billApprovalRecordService.selectApprovalList(approvalRecord);     //审批记录
        List<UserDictionary> list = userDictionaryService.queryDictionaryByPropertyId("department");   //  送审人
        UserCenterEmployee user = userCenterEmployeeService.selectUserCenterEmployeeById(employee.getEm_id());   //获取当前人的名称
        HashMap<String, Object> map = new HashMap<>();
        map.put("applyExpenselist", applyExpenselist);
        map.put("viewBillExpenseVo", viewBillExpenseVo);
        map.put("Record", Record);
        map.put("UserDictionary", list);
        map.put("user", user);
        return msg.toString(map);
    }

    /**
     * 审核
     *
     * @author tanglei
     */
    @RequestMapping("/examine")
    @ResponseBody
    public String examine(String result, @RequestParam(value = "person", required = false) String person) {
        Msg<Object> msg = new Msg<Object>();
        BillApprovalRecord record = JSONObject.parseObject(result, BillApprovalRecord.class);
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            return msg.toError(Msg.MSG_LOGIN_ERROR);
        }
        record.setAr_em_id(employee.getEm_id());
        record.setAr_time(BillBookkeepBookController.getCurrentDate());
        boolean boo = billApprovalRecordService.addApprovalRecord(record);
        boo = billExpenseService.updateExpense(record, person);  //报销管理表
        boo = billApplyExpenseService.updateExpense(record, person); //报销申请表
        if (!boo) {
            msg.setCode(110);
            msg.setMsg("提交审核失败");
            return msg.toString();
        }
        return msg.toString();
    }

    /**
     * 修改报销单
     *
     * @author tanglei
     */
    @RequestMapping("/updateApplyExpense")
    @ResponseBody
    public String updateApplyExpense(HttpServletResponse req, String result, @RequestParam("ex_id") int ex_id, @RequestParam("ex_enclasure") String ex_enclasure) {
        Msg<Object> msg = new Msg<Object>();
        BigDecimal volumn = new BigDecimal("0");
        JSONArray json = JSON.parseArray(result);
        boolean boo = true;
        if (json.size() > 0) {
            for (int i = 0; i < json.size(); i++) {
                String str = json.get(i).toString();
                BillApplyExpense applyExpense = JSONObject.parseObject(str, BillApplyExpense.class);  //申请报销列表
                volumn = volumn.add(applyExpense.getBx_expense_money());
                boo = billApplyExpenseService.update(applyExpense);
                if (!boo) {
                    msg.setCode(110);
                    msg.setMsg("更改失败");
                    return msg.toString();
                }
            }
        }
        ViewBillExpenseVo viewBillExpenseVo = new ViewBillExpenseVo();
        viewBillExpenseVo.setEx_id(ex_id);
        viewBillExpenseVo.setEx_expense_money(volumn);
        viewBillExpenseVo.setEx_enclasure(ex_enclasure);
        viewBillExpenseVo.setEx_state(1);
        boo = billExpenseService.update(viewBillExpenseVo);
        if (!boo) {
            msg.setCode(110);
            msg.setMsg("更改失败");
            return msg.toString();
        }
        return msg.toString();
    }

    /**
     * 删除
     *
     * @author tanglei
     */
    @RequestMapping("/del")
    @ResponseBody
    public String del(HttpServletRequest req, int bx_id) {
        Msg<Object> msg = new Msg<Object>();
        BillApplyExpense billApplyExpense = new BillApplyExpense();
        billApplyExpense.setBx_id(bx_id);
        billApplyExpense.setBx_state(5);
        boolean boo = billApplyExpenseService.update(billApplyExpense);
        if (!boo) {
            msg.setCode(110);
            msg.setMsg("更改失败");
            return msg.toString();
        }
        return msg.toString();
    }

    /**
     * 查询关联合同
     *
     * @author tanglei
     */
    @RequestMapping("/selectHouse")
    @ResponseBody
    public Map<String, Object> selectHouse(ContractObjectVo contract) {
        Map<String, Object> map = new HashMap<>();
        List<ContractObjectVo> list = contractService.selectHouse(contract);
        map.put("houseList", list);
        return map;
    }

    /**
     * 查询合同客户
     *
     * @author tanglei
     */
    @RequestMapping("/selectUserCustomer")
    @ResponseBody
    public Map<String, Object> selectUserCustomer (ContractObjectVo contract) {
        Map<String, Object> map = new HashMap<>();
        List<ContractObjectVo> list = contractService.selectContractObject1st(contract);
        List<UserCustomer> user=new ArrayList<>();
        for (ContractObjectVo contractObject : list) {
            UserCustomer userCustomer=new UserCustomer();
            userCustomer.setCc_code(contractObject.getContractObject_1st());
            UserCustomer usercustomer=customerService.selectCustomerCodeOne(userCustomer);
            user.add(usercustomer);
        }
        map.put("user",user);
        return map;
    }
}
