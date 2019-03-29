package com.gjp.service;

import com.gjp.dao.LoanRecordDAO;
import com.gjp.model.AddedCertificstes;
import com.gjp.model.BillBand;
import com.gjp.model.BusinessLoanRecord;
import com.gjp.model.BusinessLoanResult;
import com.gjp.util.HouseModel;
import com.gjp.util.PageModel;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;
/**
 * 借款表
 * @author tanglei
 * Date 2017年7月14日 下午 15:42:20
 */
@Service
public class LoanRecordService {
	@Resource
	private LoanRecordDAO loanRecordDAO;
	
	/**
	 * 列表
	 * @author tanglei
	 * Date 2017年7月14日 下午 15:46:20
	 */
	public PageModel<BusinessLoanRecord> loanRecordList (int pageNo, int pageSize, HouseModel houseModel) {
		return loanRecordDAO.loanRecordList(pageNo, pageSize, houseModel);
	}
	
	/**
	 * 借款审核
	 * @author tanglei
	 * Date 2017年7月14日 下午 17:57:20
	 */
	public BusinessLoanRecord selectBusinessLoanRecord (BusinessLoanRecord businessLoanRecord) {
		return loanRecordDAO.selectBusinessLoanRecord(businessLoanRecord);
	}
	
	/**
	 * 证件信息
	 * @author tanglei
	 * Date 2017年7月15日 下午 16:41:20
	 */
	public AddedCertificstes selectAddedCertificstes (AddedCertificstes addedCertificstes) {
		return loanRecordDAO.selectAddedCertificstes(addedCertificstes);
	}
	
	/**
	 * 银行信息
	 * @author tanglei
	 * Date 2017年7月18日 上午 9:47:20
	 */
	public BillBand selectBand (BillBand billBand) {
		return loanRecordDAO.selectBand(billBand);
	}
	
	/**
	 * 借款处理记录
	 * @author tanglei
	 * Date 2017年7月18日 上午 9:58:20
	 */
	public List<BusinessLoanResult> selectLoanResult (BusinessLoanResult businessLoanResult) {
		return loanRecordDAO.selectLoanResult(businessLoanResult);
	}
	
	/**
	 * 拒绝借款和审核
	 * @author tanglei
	 * Date 2017年7月18日  下午 17:47:20
	 */
	public boolean updateExamine (Integer uid,Integer userId,Integer nid,Integer sure,Integer peopleImg,
			Integer idCard,Integer idCard_side,Integer band,String content) throws Exception{
		boolean update=true;
		try {
			BusinessLoanRecord loan=new BusinessLoanRecord();   //借款记录
			if (sure != null) {      //sure！=null审核不过   否则打款不通过
				loan.setBm_state(sure);
			}
				loan.setBm_loan_state(2);  //拒绝
				loan.setBm_userId(userId);
				loan.setBm_id(nid);
				loan.setBm_note(content);
				loan.setBm_handleTime(new Date(System.currentTimeMillis()));  //处理时间
				update=loanRecordDAO.updateRecord(loan) > 0;
			if (peopleImg != null) {
				AddedCertificstes certificstes=new AddedCertificstes();   //证件
				certificstes.setCd_peopleImg_state(peopleImg);
				certificstes.setCd_idCard_state(idCard);
				certificstes.setCd_idCard_side_state(idCard_side);
				certificstes.setCd_em_id(userId);
				update=loanRecordDAO.updateCertificstes(certificstes) > 0;
			}
			if (band != null) {
				BillBand billBand=new BillBand();    //银行
				billBand.setBd_state(band);
				billBand.setBd_em_id(userId);
				update=loanRecordDAO.updateBand(billBand) > 0;
			}
			BusinessLoanResult result=new BusinessLoanResult();    //处理结果
			result.setLh_content(content);
			result.setLh_bmId(nid);
			result.setLh_em_id(uid);   //审批人id
			result.setLh_time(new Date(System.currentTimeMillis()));
			result.setLh_state(1);  //1.拒绝   2.通过
			update=loanRecordDAO.intoloanResule(result) > 0;
		} catch (Exception e) {
			 e.printStackTrace();
		}
		return update;
	}
	
	/**
	 * 通过审核
	 * @author tanglei
	 * Date 2017年7月19日  下午 16:20:20
	 */
	public boolean editExamine (Integer uid,Integer userId,Integer nid,Integer sure,Integer peopleImg,
			Integer idCard,Integer idCard_side,Integer band,Integer select) throws Exception {
		boolean update=true;
		try {
			BusinessLoanRecord loan=new BusinessLoanRecord();   //借款记录
			if (sure != null) {      
				loan.setBm_state(sure);
			}
			if (select != null) {      //判断是公司还是第三方放贷
				loan.setBm_lender(select);
			} else {
				loan.setBm_lender(2);
			}
			if (select != null && select == 1) {  //根据审核方判断状态
				loan.setBm_loan_state(1);
			} else {
				loan.setBm_loan_state(3);  //待放贷
				loan.setBm_note("放款中");
			}
				loan.setBm_userId(userId);
				loan.setBm_id(nid);
				loan.setBm_handleTime(new Date(System.currentTimeMillis()));  //处理时间
				update=loanRecordDAO.updateRecord(loan) > 0;
			if (peopleImg != null) {
				AddedCertificstes certificstes=new AddedCertificstes();   //证件
				certificstes.setCd_peopleImg_state(peopleImg);
				certificstes.setCd_idCard_state(idCard);
				certificstes.setCd_idCard_side_state(idCard_side);
				certificstes.setCd_em_id(userId);
				update=loanRecordDAO.updateCertificstes(certificstes) > 0;
			}
			if (band != null) {
				BillBand billBand=new BillBand();    //银行
				billBand.setBd_state(band);
				billBand.setBd_em_id(userId);
				update=loanRecordDAO.updateBand(billBand) > 0;
			}
			if (loan.getBm_loan_state() == 3) {   //放贷中
				BusinessLoanResult result=new BusinessLoanResult();    //处理结果
				result.setLh_content("资料审核通过");
				result.setLh_bmId(nid);
				result.setLh_em_id(uid);   //审批人id
				result.setLh_time(new Date(System.currentTimeMillis()));
				result.setLh_state(2);  //1.拒绝   2.通过
				update=loanRecordDAO.intoloanResule(result) > 0;
			}
		} catch (Exception e) {
			 e.printStackTrace();
		}
		return update;
	}
	
	/**
	 * 通过放贷
	 * @author tanglei
	 * Date 2017年7月19日  下午 14:28:20
	 */
	public boolean lendingPass (Integer userId,Integer nid,Integer uid) throws Exception {
		boolean update=true;
		try {
			BusinessLoanRecord loan=new BusinessLoanRecord();
			loan.setBm_userId(userId);
			loan.setBm_id(nid);
			loan.setBm_loan_state(4);
			loan.setBm_note("放贷中");
			loan.setBm_handleTime(new Date(System.currentTimeMillis()));  //处理时间
			update=loanRecordDAO.updateRecord(loan) > 0;
			BusinessLoanResult result=new BusinessLoanResult();    //处理结果
			result.setLh_content("放款审核通过");
			result.setLh_bmId(nid);
			result.setLh_em_id(uid);   //审批人id
			result.setLh_time(new Date(System.currentTimeMillis()));
			result.setLh_state(2);  //1.拒绝   2.通过
			update=loanRecordDAO.intoloanResule(result) > 0;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return update;
	}
	
}
