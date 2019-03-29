package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.CutomerFollowUpDAO;
import com.gjp.model.CutomerFollowUp;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2016年8月7日 下午6:22:52 
 */
@Repository
public class CutomerFollowUpDAOImpl extends BaseDAO implements CutomerFollowUpDAO{

	@Override
	public Integer insertCutomerFollowUp(CutomerFollowUp cutomerFollowUp) {
		return super.sqlSessionTemplateUser.insert("com.gjp.dao.CutomerFollowUpDAO.insertCutomerFollowUp",cutomerFollowUp);
	}

	@Override
	public List<CutomerFollowUp> selectAllCutomerFollowUp(CutomerFollowUp cutomerFollowUp) {
		return super.sqlSessionTemplateUser.selectList("com.gjp.dao.CutomerFollowUpDAO.selectAllCutomerFollowUp",cutomerFollowUp);
	}

}
