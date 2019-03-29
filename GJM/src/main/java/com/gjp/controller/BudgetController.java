package com.gjp.controller;

import com.gjp.csrf.RefreshCSRFToken;
import com.gjp.model.ContractBillVo;
import com.gjp.model.ViewBusinessContractVo;
import com.gjp.service.BudgetService;
import com.gjp.util.Msg;
import com.gjp.util.Pagination;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLEncoder;
import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * 预算管理
 * @author tanglei
 * @description
 * @date Created in 2017/11/29
 */
@Controller
@RequestMapping("/budget")
public class BudgetController {
    @Autowired
    private BudgetService budgetService;

    /**
     * 预算管理页面
     * @author tanglei
     */
    @RequestMapping(method = RequestMethod.GET,value ="/budget")
    @RefreshCSRFToken
    public String budget() {
        return "/budget/budget";
    }

    /**
     * 预算管理数据
     * @author tanglei
     */
    @RequestMapping("/queryBudget")
    @ResponseBody
    public Map<String, Object> queryBudget(Pagination<ContractBillVo> pagination) {
        Msg<Object> msg = new Msg<>();
        ContractBillVo finance = new ContractBillVo();
        List<Map<String, Object>> ss = pagination.getQueryWhere();
        String mode = "";
        String date = "";
        String ucc_id = "";
        for (Map<String, Object> map : ss) {
            if (map.get("key").equals("bcb_repaymentDate")) {
                String key = (String) map.get("key");
                String value = String.valueOf(map.get("value"));
                String operator = (String) map.get("operator");
                mode = (String) map.get("mode");
                date = (String) map.get("startDate");
                if ("7".equals(mode)) {
                    finance.setDay(Integer.valueOf(mode));
                }
                if ("30".equals(mode)) {
                    finance.setDay(Integer.valueOf(mode));
                }
            }
            if (map.get("key").equals("ucc_id")) {
                ucc_id = String.valueOf(map.get("value"));
            }
        }
        if ("7".equals(mode) && "30".equals(mode)) {
            Iterator<Map<String, Object>> it = pagination.getQueryWhere().iterator();
            while (it.hasNext()) {
                Map<String, Object> x = it.next();
                if (x.get("key").equals("bcb_repaymentDate")) {
                    it.remove();
                }
            }
        }
        pagination.formatWhere();
        finance.setContractObject_OptionState(106);
        finance.setBcb_state(2);
        pagination.setT(finance);
        pagination = budgetService.queryBudget(pagination, date, ucc_id);
        return msg.toMap(pagination);
    }


    /**
     * 预算管理列表
     * @author tanglei
     */
    @RequestMapping("/queryBudgetList")
    @ResponseBody
    public Map<String, Object> queryBudgetList(Pagination<ContractBillVo> pagination) {
        Msg<Object> msg = new Msg<>();
        ContractBillVo finance = new ContractBillVo();
        List<Map<String, Object>> ss = pagination.getQueryWhere();
        String mode = "";
        String date = "";
        String bcb_type = "";
        String startDate="";
        for (Map<String, Object> map : ss) {
            if (map.get("key").equals("bcb_repaymentDate")) {
                String key = (String) map.get("key");
                String value = String.valueOf(map.get("value"));
                String operator = (String) map.get("operator");
                mode = (String) map.get("mode");
                date = (String) map.get("startDate");
                if ("7".equals(mode)) {
                    finance.setDay(Integer.valueOf(mode));
                }
                if ("30".equals(mode)) {
                    finance.setDay(Integer.valueOf(mode));
                }
            }
            //账单类型
            if (map.get("key").equals("bcb_type") && "4".equals(String.valueOf(map.get("value")))) {
                bcb_type=String.valueOf(map.get("value"));
                finance.setBcb_type(0);
            }
            //是否本期
            if (map.get("key").equals("startDate") && "1".equals(String.valueOf(map.get("value")))) {
                startDate=String.valueOf(map.get("value"));
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                if (!StringUtils.isEmpty(date)) {
                    Date d=new Date(date);
                    finance.setBcb_repaymentDate(d);
                } else {
                    finance.setBcb_repaymentDate(new Date());
                }
            }
        }
        Iterator<Map<String, Object>> it = pagination.getQueryWhere().iterator();
        while (it.hasNext()) {
            Map<String, Object> x = it.next();
            if (("7".equals(mode) || "30".equals(mode)) && x.get("key").equals("bcb_repaymentDate")) {
                it.remove();
            }
            if ("4".equals(bcb_type) && x.get("key").equals("bcb_type")) {
                it.remove();
            }
            if (x.get("key").equals("startDate")) {
                it.remove();
            }
        }
        pagination.formatWhere();
        finance.setContractObject_OptionState(106);
        finance.setBcb_state(2);
        pagination.setT(finance);
        pagination = budgetService.queryBudgetList(pagination, date);
        return msg.toMap(pagination);
    }

    /**
     * 导出列表数据
     * @Author tanglei
     */
    @RequestMapping("/queryBudge")
    @ResponseBody
    public Pagination<ContractBillVo> queryBudge(Pagination<ContractBillVo> pagination) {
        Msg<Object> msg = new Msg<>();
        ContractBillVo finance = new ContractBillVo();
        List<Map<String, Object>> ss = pagination.getQueryWhere();
        String mode = "";
        String date = "";
        String bcb_type = "";
        String startDate="";
        for (Map<String, Object> map : ss) {
            if (map.get("key").equals("bcb_repaymentDate")) {
                String key = (String) map.get("key");
                String value = String.valueOf(map.get("value"));
                String operator = (String) map.get("operator");
                mode = (String) map.get("mode");
                date = (String) map.get("startDate");
                if ("7".equals(mode)) {
                    finance.setDay(Integer.valueOf(mode));
                }
                if ("30".equals(mode)) {
                    finance.setDay(Integer.valueOf(mode));
                }
            }
            //账单类型
            if (map.get("key").equals("bcb_type") && "4".equals(String.valueOf(map.get("value")))) {
                bcb_type=String.valueOf(map.get("value"));
                finance.setBcb_type(0);
            }
            //是否本期
            if (map.get("key").equals("startDate") && "1".equals(String.valueOf(map.get("value")))) {
                startDate=String.valueOf(map.get("value"));
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                if (!StringUtils.isEmpty(date)) {
                    Date d=new Date(date);
                    finance.setBcb_repaymentDate(d);
                } else {
                    finance.setBcb_repaymentDate(new Date());
                }
            }
        }
        Iterator<Map<String, Object>> it = pagination.getQueryWhere().iterator();
        while (it.hasNext()) {
            Map<String, Object> x = it.next();
            if (("7".equals(mode) || "30".equals(mode)) && x.get("key").equals("bcb_repaymentDate")) {
                it.remove();
            }
            if ("4".equals(bcb_type) && x.get("key").equals("bcb_type")) {
                it.remove();
            }
            if (x.get("key").equals("startDate")) {
                it.remove();
            }
        }
        pagination.formatWhere();
        finance.setContractObject_OptionState(106);
        finance.setBcb_state(2);
        pagination.setT(finance);
        pagination.setPage(false);
        pagination = budgetService.queryBudgetList(pagination, date);
        return pagination;
    }

    /**
     * 导出
     * @author tanglei
     */
    @RequestMapping("/queryExportExcel")
    @ResponseBody
    public Map<String, Object> queryExportExcel(HttpServletRequest request, Pagination<ContractBillVo> pagination) {
        Map<String, Object> map = new HashMap<>();
        // 保留小数点后两位
        DecimalFormat df = new DecimalFormat("######0.00");
        Pagination<ContractBillVo> financeB=this.queryBudge(pagination);
        List<ContractBillVo> list=financeB.getList();

        // 第一步，创建一个webbook，对应一个Excel文件
        HSSFWorkbook wb = new HSSFWorkbook();
        // 第二步，在webbook中添加一个sheet,对应Excel文件中的sheet
        HSSFSheet sheet = wb.createSheet("数据统计");
        // 第三步，在sheet中添加表头第0行,注意老版本poi对Excel的行数列数有限制short
        HSSFRow row = sheet.createRow((int) 0);
        row.setHeightInPoints(25);
        // 第四步，创建单元格，并设置值表头 设置表头居中
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER); // 创建一个居中格式

        HSSFCell cell = row.createCell(0);
        cell.setCellValue("小区房号");
        cell.setCellStyle(style);
        sheet.setColumnWidth(0, 20 * 256);
        cell = row.createCell(1);
        cell.setCellValue("合同类型");
        cell.setCellStyle(style);
        sheet.setColumnWidth(1, 20 * 256);
        cell = row.createCell(2);
        cell.setCellValue("客户信息");
        cell.setCellStyle(style);
        sheet.setColumnWidth(2, 25 * 256);
        cell = row.createCell(3);
        cell.setCellValue("合同状态");
        cell.setCellStyle(style);
        sheet.setColumnWidth(3, 20 * 256);
        cell = row.createCell(4);
        cell.setCellValue("起止日期");
        cell.setCellStyle(style);
        sheet.setColumnWidth(4, 25 * 256);
        cell = row.createCell(5);
        cell.setCellValue("账单类型");
        cell.setCellStyle(style);
        sheet.setColumnWidth(5, 20 * 256);
        cell = row.createCell(6);
        cell.setCellValue("收支类型");
        cell.setCellStyle(style);
        sheet.setColumnWidth(6, 15 * 256);
        cell = row.createCell(7);
        cell.setCellValue("应支/收");
        cell.setCellStyle(style);
        sheet.setColumnWidth(7, 20 * 256);
        cell = row.createCell(8);
        cell.setCellValue("实支/收");
        cell.setCellStyle(style);
        sheet.setColumnWidth(8, 20 * 256);
        cell = row.createCell(9);
        cell.setCellValue("未支/收");
        cell.setCellStyle(style);
        sheet.setColumnWidth(9, 20 * 256);
        cell = row.createCell(10);
        cell.setCellValue("金融机构");
        cell.setCellStyle(style);
        sheet.setColumnWidth(10, 15 * 256);
        cell = row.createCell(11);
        cell.setCellValue("管家信息");
        cell.setCellStyle(style);
        sheet.setColumnWidth(11, 20 * 256);
        cell = row.createCell(12);
        cell.setCellValue("合同归属部门");
        cell.setCellStyle(style);
        sheet.setColumnWidth(12, 20 * 256);
        cell = row.createCell(13);
        cell.setCellValue("应还款时间");
        cell.setCellStyle(style);
        sheet.setColumnWidth(13, 20 * 256);
        Double repayment = 0.0;

        // 第五步，写入实体数据 实际应用中这些数据从数据库得到，
        int i = 1;
        // 合并单元格
        for (ContractBillVo financeBill : list) {
            HSSFCellStyle CellStyle = wb.createCellStyle();

            row = sheet.createRow((int) i);
            row.setHeightInPoints(20);

            row.createCell(0).setCellValue(financeBill.getHouse_address());
            row.createCell(1).setCellValue(financeBill.getContractObject_Type());
            row.createCell(2).setCellValue(financeBill.getCc_name() + "-" + financeBill.getCcp_phone());
            row.createCell(3).setCellValue(financeBill.getContractObject_State() == 2 ? "生效" : "");
            row.createCell(4).setCellValue(financeBill.getContractBody_StartTOEnd());
            row.createCell(5).setCellValue(financeBill.getBcb_type() == 0 ? "租金" : financeBill.getBcb_type() == 1 ? "押金" : financeBill.getBcb_type() == 2 ? "保修费" : financeBill.getBcb_type() == 3 ? "服务费" : "");
            row.createCell(6).setCellValue(financeBill.getBcb_balPay() == 0 ? "收入" : financeBill.getBcb_balPay() == 1 ? "支出" : "");
            row.createCell(7).setCellValue(Double.valueOf(df.format(financeBill.getTotalRepayment() == null ? repayment : financeBill.getTotalRepayment())));
            row.createCell(8).setCellValue(Double.valueOf(df.format(financeBill.getTotalRealPayment() == null ? repayment : financeBill.getTotalRealPayment())));
            row.createCell(9).setCellValue(Double.valueOf(df.format(financeBill.getBcb_balance() == null ? repayment : financeBill.getBcb_balance())));
            row.createCell(10).setCellValue(financeBill.getContractBody_PayType());
            row.createCell(11).setCellValue(financeBill.getEm_name());
            row.createCell(12).setCellValue(financeBill.getUcc_name());
            SimpleDateFormat dateformat1 = new SimpleDateFormat("yyyy-MM-dd");
            String date = dateformat1.format(financeBill.getBcb_repaymentDate());
            row.createCell(13).setCellValue(date);
            i++;
        }
        // 第六步，将文件存到指定位置
        try {
            SimpleDateFormat format4 = new SimpleDateFormat("yyyyMMddHHmmss");
            Date d = new Date();
            String fileName = format4.format(d) + ".xls";
            String path = request.getSession().getServletContext().getRealPath("/");
            path += "/resources/excel";

            File file = new File(path);
            if (!file.exists()) {
                file.mkdir();
            }
            path += "/" + fileName;
            FileOutputStream fout = new FileOutputStream(path);
            wb.write(fout);
            fout.close();
            map.put("path", "/resources/excel/" + fileName);
            return map;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return map;
    }

}
