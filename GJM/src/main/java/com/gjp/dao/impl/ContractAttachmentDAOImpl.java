package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.ContractAttachmentDAO;
import com.gjp.model.ContractAttachment;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 合同执行记录附件
 * 
 * @author zoe
 * 2016-8-30 11:21:23
 */
@Repository
public class ContractAttachmentDAOImpl extends BaseDAO implements ContractAttachmentDAO {

	@Override
	public List<ContractAttachment> selectContractAttachmentList(ContractAttachment contractAttachment) {
		return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ContractAttachmentDAO.selectContractAttachmentList", contractAttachment);
	}

	@Override
	public int addContractAttachment(ContractAttachment contractAttachment) {
		return sqlSessionTemplateBusiness.insert("com.gjp.dao.ContractAttachmentDAO.addContractAttachment", contractAttachment);
	}

	@Override
	public int updateContractAttachmentState(ContractAttachment contractAttachment) {
		return sqlSessionTemplateBusiness.update("com.gjp.dao.ContractAttachmentDAO.updateContractAttachmentState", contractAttachment);
	}

	@Override
	public int deleteContractAttachment(ContractAttachment contractAttachment) {
		return sqlSessionTemplateBusiness.delete("com.gjp.dao.ContractAttachmentDAO.deleteContractAttachment", contractAttachment);
	}


}
