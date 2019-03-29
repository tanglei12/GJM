package com.gjp.dao;

import com.gjp.model.AddedCertificstes;
import com.gjp.model.BillBand;
import com.gjp.model.BusinessLoanRecord;
import com.gjp.model.BusinessLoanResult;
import com.gjp.util.HouseModel;
import com.gjp.util.PageModel;

import java.util.List;

/**
 * 借款表
 * @author tanglei
 * Date 2017年7月14日 下午 15:42:20
 */
public interface LoanRecordDAO {
	
	/**
	 * 列表
	 * @author tanglei
	 * Date 2017年7月14日 下午 15:46:20
	 */
	PageModel<BusinessLoanRecord> loanRecordList (int pageNo, int pageSize, HouseModel houseModel);
	
	/**
	 * 借款审核
	 * @author tanglei
	 * Date 2017年7月14日 下午 17:57:20
	 */
	BusinessLoanRecord selectBusinessLoanRecord (BusinessLoanRecord businessLoanRecord);
	
	/**
	 * 证件信息
	 * @author tanglei
	 * Date 2017年7月15日 下午 16:41:20
	 */
	AddedCertificstes selectAddedCertificstes (AddedCertificstes addedCertificstes);
	
	/**
	 * 银行信息
	 * @author tanglei
	 * Date 2017年7月18日 上午 9:47:20
	 */
	 BillBand selectBand (BillBand billBand);
	 
	 /**
	  * 借款处理记录
	  * @author tanglei
	  * Date 2017年7月18日 上午 9:58:20
	  */
	 List<BusinessLoanResult> selectLoanResult (BusinessLoanResult businessLoanResult);
	 
	 /**
	  * 更改用户信息
	  * @author tanglei
	  *	Date 2017年7月18日  下午 17:54:20
	  */
	 int updateRecord(BusinessLoanRecord businessLoanRecord);
	 
	 /**
	  * 更改证件状态
	  * @author tanglei
	  *	Date 2017年7月18日  下午 17:54:20
	  */
	 int updateCertificstes(AddedCertificstes addedCertificstes);
	 
	 /**
	  * 更改银行状态
	  * @author tanglei
	  *	Date 2017年7月18日  下午 17:54:20
	  */
	 int updateBand(BillBand billBand);
	 
	 /**
	  * 拒绝原因
	  * @author tanglei
	  *	Date 2017年7月18日  下午 17:54:20
	  */
	 int intoloanResule(BusinessLoanResult businessLoanResult);
	 
	 

}
