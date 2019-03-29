package com.gjp.service;


import com.gjp.dao.ContractAttachmentDAO;
import com.gjp.model.ContractAttachment;
import com.gjp.util.oss.AliOSS;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * 执行记录附件
 *
 * @author 秦莎
 * @version 创建时间：2016年8月30日  上午11:46:56
 */

@Service
public class ContractAttachmentService {

    @Resource
    private ContractAttachmentDAO contractAttachmentDao;

    /**
     * 根据执行记录ID查询该记录下的附件
     *
     * @param contractAttachment
     * @return
     */
    public List<ContractAttachment> selectContractAttachmentList(ContractAttachment contractAttachment) {
        List<ContractAttachment> contractAttachments = contractAttachmentDao.selectContractAttachmentList(contractAttachment);
        for (ContractAttachment attachment : contractAttachments) {
            attachment.setCa_path_real(AliOSS.getUrl(attachment.getCa_path()).toString());
        }
        return contractAttachments;
    }

    /**
     * 新增某执行记录的附件
     *
     * @param contractAttachment
     * @return
     */
    public int addContractAttachment(ContractAttachment contractAttachment) {
        return contractAttachmentDao.addContractAttachment(contractAttachment);
    }

    /**
     * 某执行记录添加附件
     *
     * @param contractAttachment
     * @return
     */
    public int updateContractAttachmentState(ContractAttachment contractAttachment) {
        return contractAttachmentDao.updateContractAttachmentState(contractAttachment);
    }

    /**
     * 删除某执行记录的附件内容（数据库）
     *
     * @param contractAttachment
     * @return
     */
    public int deleteContractAttachment(ContractAttachment contractAttachment) {
        return contractAttachmentDao.deleteContractAttachment(contractAttachment);
    }
}
