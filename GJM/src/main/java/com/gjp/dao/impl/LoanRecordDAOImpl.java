package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.LoanRecordDAO;
import com.gjp.model.AddedCertificstes;
import com.gjp.model.BillBand;
import com.gjp.model.BusinessLoanRecord;
import com.gjp.model.BusinessLoanResult;
import com.gjp.util.HouseModel;
import com.gjp.util.PageModel;
import org.springframework.stereotype.Repository;

import java.util.List;
/**
 * 借款表
 * @author tanglei
 * Date 2017年7月14日 下午 15:42:20
 */
@Repository
public class LoanRecordDAOImpl extends BaseDAO implements LoanRecordDAO{

	@Override
	public PageModel<BusinessLoanRecord> loanRecordList(int pageNo, int pageSize, HouseModel houseModel) {
		PageModel<BusinessLoanRecord> pageModel = new PageModel<BusinessLoanRecord>();
		// 分页设置开始点
		pageModel.setPageNo((pageNo - 1) * pageSize);
		// 分页设置查询条数
		pageModel.setPageSize(pageSize);
		// 分页设置查询条件
		pageModel.setHouseModel(houseModel);
		pageModel.setInte(3);
		List<BusinessLoanRecord> advertis = sqlSessionTemplateBusiness.selectList("com.gjp.dao.LoanRecordDAO.loanRecordList", pageModel);
		pageModel.setList(advertis);
		List<BusinessLoanRecord> advertisTotal = sqlSessionTemplateBusiness.selectList("com.gjp.dao.LoanRecordDAO.totalloanRecordList", pageModel);
		pageModel.setTotalRecords(advertisTotal.size());
		return pageModel;
	}

	@Override
	public BusinessLoanRecord selectBusinessLoanRecord (BusinessLoanRecord businessLoanRecord) {
		return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.LoanRecordDAO.selectBusinessLoanRecord", businessLoanRecord);
	}

	@Override
	public AddedCertificstes selectAddedCertificstes(AddedCertificstes addedCertificstes) {
		return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.LoanRecordDAO.selectAddedCertificstes", addedCertificstes);
	}

	@Override
	public BillBand selectBand(BillBand billBand) {
		return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.LoanRecordDAO.selectBand", billBand);
	}

	@Override
	public List<BusinessLoanResult> selectLoanResult(BusinessLoanResult businessLoanResult) {
		return sqlSessionTemplateBusiness.selectList("com.gjp.dao.LoanRecordDAO.selectLoanResult", businessLoanResult);
	}

	@Override
	public int updateRecord(BusinessLoanRecord businessLoanRecord) {
		return sqlSessionTemplateBusiness.update("com.gjp.dao.LoanRecordDAO.updateRecord", businessLoanRecord);
	}

	@Override
	public int updateCertificstes(AddedCertificstes addedCertificstes) {
		return sqlSessionTemplateBusiness.update("com.gjp.dao.LoanRecordDAO.updateCertificstes", addedCertificstes);
	}

	@Override
	public int updateBand(BillBand billBand) {
		return sqlSessionTemplateBusiness.update("com.gjp.dao.LoanRecordDAO.updateBand", billBand);
	}

	@Override
	public int intoloanResule(BusinessLoanResult businessLoanResult) {
		return sqlSessionTemplateBusiness.insert("com.gjp.dao.LoanRecordDAO.intoloanResule", businessLoanResult);
	}

}
