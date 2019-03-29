package com.gjp.dao;

import com.gjp.model.UserCouponsConfigVo;
import com.gjp.model.UserCouponsUse;
import com.gjp.model.UserCouponsVo;
import com.gjp.util.Pagination;

import java.util.List;

/**
 * @author JiangQt
 * @description
 * @date Created in 2017/12/23
 */
public interface ActivityCouponsDAO {
    /**
     * 优惠券配置列表
     * @author tanglei
     */
    Pagination<UserCouponsConfigVo> queryCouponsConfigList(Pagination<UserCouponsConfigVo> pagination);

    /**
     * 优惠券配置列表
     * @author tanglei
     */
    Pagination<UserCouponsConfigVo> queryCouponsConfigPageList(Pagination<UserCouponsConfigVo> pagination);

    /**
     * 优惠券
     * @author tanglei
     */
    Pagination<UserCouponsVo> queryCouponsList(Pagination<UserCouponsVo> pagination);

    /**
     * 添加优惠券配置
     * @author tanglei
     */
    int addCouponsConfig(UserCouponsConfigVo userCouponsConfigVo);

    /**
     * 修改优惠券配置
     * @author tanglei
     */
    int updateCouponsConfig(UserCouponsConfigVo userCouponsConfigVo);

    /**
     * 查询优惠券配置
     * @author tanglei
     */
    UserCouponsConfigVo selectCouponsConfig (UserCouponsConfigVo couponsConfigVo);

    /**
     * 优惠券名称
     * @author tanglei
     */
    List<UserCouponsConfigVo> selectuccfgName ();

    /**
     * 优惠券用途
     * @author tanglei
     */
    List<UserCouponsUse> queryCouponsUse (UserCouponsUse userCouponsUse);

}
