package com.gjp.dao.impl;

import com.gjp.dao.BankDAO;
import com.gjp.dao.BaseDAO;
import com.gjp.model.Bank;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author 陈智颖
 * @version 创建时间：2016年8月10日 下午3:05:17
 */
@Repository
public class BankDAOImpl extends BaseDAO implements BankDAO {

    @Override
    public List<Bank> selectBankBIN(Bank bank) {
        return super.sqlSessionTemplateUser.selectList("com.gjp.dao.BankDAO.selectBankBIN", bank);
    }

    @Override
    public Bank queryBankInfo(Bank bank) {
        return sqlSessionTemplateUser.selectOne("com.gjp.dao.BankDAO.queryBankInfo", bank);
    }

}
