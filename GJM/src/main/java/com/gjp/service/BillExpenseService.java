package com.gjp.service;

import com.gjp.dao.BillExpenseDao;
import com.gjp.model.BillApprovalRecord;
import com.gjp.model.ViewBillExpenseVo;
import com.gjp.util.HouseModel;
import com.gjp.util.PageModel;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class BillExpenseService {

    @Resource
    private BillExpenseDao billExpenseDao;

    /**
     * 添加
     *
     * @author tanglei
     */
    public boolean addExpense(ViewBillExpenseVo billExpense) {
        return billExpenseDao.addExpense(billExpense) > 0;
    }

    /**
     * 报销管理列表
     *
     * @author tanglei
     */
    public PageModel<ViewBillExpenseVo> selectExpenseList(int pageNo, int pageSize, HouseModel houseModel) {
        return billExpenseDao.selectExpenseList(pageNo, pageSize, houseModel);
    }

    /**
     * 报销数据
     *
     * @author tanglei
     */
    public ViewBillExpenseVo selectExpense(ViewBillExpenseVo billExpense) {
        return billExpenseDao.selectExpense(billExpense);
    }

    /**
     * 修改
     *
     * @author tanglei
     */
    public boolean updateExpense(BillApprovalRecord billApprovalRecord, String person) {
        return billExpenseDao.updateExpense(billApprovalRecord, person) > 0;
    }

    /**
     * 修改数据
     *
     * @author tanglei
     */
    public boolean update(ViewBillExpenseVo viewBillExpenseVo) {
        return billExpenseDao.update(viewBillExpenseVo) > 0;
    }
}
