package com.gjp.service;

import com.gjp.dao.CutomerFollowUpDAO;
import com.gjp.model.CutomerFollowUp;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2016年8月7日 下午6:24:54 
 */
@Service
public class CutomerFollowUpService {

	@Resource
	private CutomerFollowUpDAO cutomerFollowUpDAO;
	
	/**
	 * 添加客户跟进记录
	 * 
	 * @param cutomerFollowUp
	 * @return
	 *
	 * @author 陈智颖
	 */
	public Integer insertCutomerFollowUp(CutomerFollowUp cutomerFollowUp){
		return cutomerFollowUpDAO.insertCutomerFollowUp(cutomerFollowUp);
	}
	
	/**
	 * 查询客户跟进
	 * 
	 * @param cutomerFollowUp
	 * @return
	 *
	 * @author 陈智颖
	 */
	public List<CutomerFollowUp> selectAllCutomerFollowUp(CutomerFollowUp cutomerFollowUp){
		return cutomerFollowUpDAO.selectAllCutomerFollowUp(cutomerFollowUp);
	}
}
