package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.ItemsBillDAO;
import com.gjp.model.ItemsBill;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author 秦莎
 *
 * @version 创建时间：2016年8月10日 上午15:33:28
 */
@Repository
public class ItemsBillDAOImpl extends BaseDAO implements ItemsBillDAO {

	@Override
	public List<ItemsBill> selectItemsBillList(ItemsBill itemsBill) {
		return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ItemsBillDAO.selectItemsBillList", itemsBill);
	}

	@Override
	public int addItemsBillOne(ItemsBill itemsBill) {
		return sqlSessionTemplateBusiness.insert("com.gjp.dao.ItemsBillDAO.addItemsBillOne", itemsBill);
	}

	@Override
	public int selectItemsBillCount(ItemsBill itemsBill) {
		return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ItemsBillDAO.selectItemsBillCount", itemsBill);
	}

}
