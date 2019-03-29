package com.gjp.service;

import com.gjp.dao.MobileCodeDao;
import com.gjp.model.MobileCode;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * 验证码
 * 
 * @author 王孝元
 * @version 创建时间：2017年3月20日 下午2:54:55
 * 
 */
@Service
public class MoBileCodeService {
	
	@Resource
	private MobileCodeDao mobileCodeDao;

	/**
	 * 保存验证码
	 * 
	 * @param mc
	 * @return
	 * @author 王孝元
	 */
	public int addMobileCode(MobileCode mc) {
		// 先删除历史code，保证数据不重复
		MobileCode mobileCode = new MobileCode();
		mobileCode.setMc_phone(mc.getMc_phone());
		mobileCode.setMc_type(mc.getMc_type());
		MobileCode mobileCode2 = mobileCodeDao.queryMobileCodeByProperty(mobileCode);
		if (mobileCode2 != null) {
			mobileCodeDao.deleteMobieCodeById(mobileCode2.getMc_id());
		}
		return mobileCodeDao.addMobileCode(mc);
	}

	/**
	 * 更新验证码
	 * 
	 * @param mc
	 * @return
	 * @author 王孝元
	 */
	public int updateMobileCode(MobileCode mc) {
		return mobileCodeDao.updateMobileCode(mc);
	}

	/**
	 * 查询验证码
	 * 
	 * @param mc
	 * @return
	 * @author 王孝元
	 */
	public MobileCode queryMobileCodeByProperty(MobileCode mc) {
		return mobileCodeDao.queryMobileCodeByProperty(mc);
	}

}
