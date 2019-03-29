package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.ItemsRelationDAO;
import com.gjp.model.BroadbandConfigVo;
import com.gjp.model.InsuranceVo;
import com.gjp.model.ItemsRelation;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author 秦莎
 *
 * @version 创建时间：2016年8月10日 上午15:33:28
 */
@Repository
public class ItemsRelationDAOImpl extends BaseDAO implements ItemsRelationDAO {

	@Override
	public int addItemsRelationOne(ItemsRelation itemsRelation) {
		return sqlSessionTemplateBusiness.insert("com.gjp.dao.ItemsRelationDAO.addItemsRelationOne", itemsRelation);
	}

	@Override
	public List<ItemsRelation> selectItemsRelationList(ItemsRelation itemsRelation) {
		return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ItemsRelationDAO.selectItemsRelationList", itemsRelation);
	}

	@Override
	public int updateItemsInventoryState(ItemsRelation itemsRelation) {
		return sqlSessionTemplateBusiness.update("com.gjp.dao.ItemsRelationDAO.updateItemsInventoryState", itemsRelation);
	}

	/**
	 *新增宽带
	 * @param broadbandConfigVo
	 * @return
	 */
	@Override
	public int insertBroadbandConfig(BroadbandConfigVo broadbandConfigVo) {
		return sqlSessionTemplateBusiness.insert("com.gjp.dao.ItemsRelationDAO.insertBroadbandConfig",broadbandConfigVo);
	}

	/**
	 *修改宽带
	 * @param broadbandConfigVo
	 * @return
	 */
	@Override
	public int updateBroadbandConfig(BroadbandConfigVo broadbandConfigVo) {
		return sqlSessionTemplateBusiness.update("com.gjp.dao.ItemsRelationDAO.updateBroadbandConfig",broadbandConfigVo);
	}

	/**
	 * 获取宽带配置
	 * @param broadbandConfigVo
	 * @return
	 */
	@Override
	public BroadbandConfigVo selectInitBroadbandConfig(BroadbandConfigVo broadbandConfigVo) {
		return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ItemsRelationDAO.selectInitBroadbandConfig",broadbandConfigVo);
	}

    /**
     * 获取房屋和合同下的有效保险
     * @param insuranceVo
     * @return
     */
    @Override
    public List<InsuranceVo> selectInsurance(InsuranceVo insuranceVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ItemsRelationDAO.selectInsurance",insuranceVo);
    }


	/**
	 * 查询保险根据id
	 * @param insuranceVo
	 * @return
	 */
	@Override
	public InsuranceVo selectInsuranceById(InsuranceVo insuranceVo) {
		return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ItemsRelationDAO.selectInsuranceById",insuranceVo);
	}


	/**
	 * 查询保险根据条件
	 * @param insuranceVo
	 * @return
	 */
	@Override
	public List<InsuranceVo> selectInsuranceByWhere(InsuranceVo insuranceVo) {
		return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ItemsRelationDAO.selectInsuranceByWhere",insuranceVo);
	}

	@Override
	public List<InsuranceVo> selectInsuranceAndAddres(InsuranceVo insuranceVo) {
		return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ItemsRelationDAO.selectInsuranceAndAddres",insuranceVo);
	}

	/**
	 * 录入保单（新建录入）
	 * @param insuranceVo
	 * @return
	 */
	@Override
	public int insertInsurance(InsuranceVo insuranceVo) {
		return sqlSessionTemplateBusiness.insert("com.gjp.dao.ItemsRelationDAO.insertInsurance",insuranceVo);
	}


	/**
	 * 修改保单
	 * @param insuranceVo
	 * @return
	 */
	@Override
	public int updateInsurance(InsuranceVo insuranceVo) {
		return sqlSessionTemplateBusiness.update("com.gjp.dao.ItemsRelationDAO.updateInsurance",insuranceVo);
	}
}
