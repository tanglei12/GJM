package com.gjp.dao;


import com.gjp.model.ContractAttachment;

import java.util.List;

/**
 * 合同执行记录附件
 * 
 * @author zoe
 * 
 * 2016-8-30 11:16:45
 */
public interface ContractAttachmentDAO {

	/**
	 * 根据执行记录ID查询该执行记录下的附件
	 * @author zoe
	 * @param company
	 * @return
	 */
	List<ContractAttachment> selectContractAttachmentList(ContractAttachment ContractAttachment);
	
	/**
	 * 添加该执行记录下的附件
	 * @param ContractAttachment
	 * @return
	 */
	int addContractAttachment(ContractAttachment ContractAttachment);
	
	/**
	 * 修改该执行记录下的附件为有效状态
	 * @param contractAttachment
	 * @return
	 */
	int updateContractAttachmentState(ContractAttachment contractAttachment);
	
	/**
	 * 删除该执行记录的附件（数据库的）
	 * @param contractAttachment
	 * @return
	 */
	int deleteContractAttachment(ContractAttachment contractAttachment);
}
