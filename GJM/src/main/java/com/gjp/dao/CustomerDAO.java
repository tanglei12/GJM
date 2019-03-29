package com.gjp.dao;

import com.gjp.model.*;
import com.gjp.util.Pagination;
import com.gjp.util.TableList;

import java.util.List;

/**
 * @author 陈智颖
 * @version 创建时间：2016年8月1日 下午3:23:35
 */
public interface CustomerDAO {

    /**
     * 查询所有客户
     *
     * @return
     * @author 陈智颖
     */
    List<UserCustomer> selectAllCustomer();

    /**
     * 根据条件查询客户
     *
     * @param userCustomer
     * @return
     * @author 陈智颖
     */
    List<UserCustomer> selectCustomerWhere(UserCustomer userCustomer);

    /**
     * 根据合同编码查询室友
     *
     * @param userCustomer
     * @return
     * @author 陈智颖
     */
    List<UserCustomer> selectCustomerRelationshipPerson(UserCustomer userCustomer);

    /**
     * 根据客户编号查询客户信息
     *
     * @param userCustomer
     * @return
     * @author 陈智颖
     */
    UserCustomer selectCustomerCode(UserCustomer userCustomer);

    /**
     * 根据证件号查询客户是否存在
     *
     * @param userCustomer
     * @return
     * @author 陈智颖
     */
    UserCustomer selectCustomerCard(UserCustomer userCustomer);

    /**
     * 根据房屋地址查询房屋
     *
     * @param houseInfoKeep
     * @return
     * @author 陈智颖
     */
    List<HouseInfoKeep> selectCustomerHouseWhere(HouseInfoKeep houseInfoKeep);

    /**
     * 根据客户姓名、电话查询该客户是否已经存在
     *
     * @param userCustomer
     * @return
     * @author zoe
     */
    UserCustomer selectCustomerOne(UserCustomer userCustomer);

    /**
     * 根据身份证查询用户是否存在
     *
     * @param userCustomer
     * @return
     * @author 陈智颖
     */
    UserCustomer selectCustomerOneNum(UserCustomer userCustomer);

    /**
     * 查询客户id查询客户信息和电话
     *
     * @param userCustomer
     * @return
     * @author 陈智颖
     */
    UserCustomer queryCustomerID(UserCustomer userCustomer);

    /**
     * 向客户数据表添加数据
     *
     * @param userCustomer
     * @return
     * @author zoe
     */
    int insertCustomerOne(UserCustomer userCustomer);

    /**
     * 根据客户的Code查询该客户信息
     *
     * @param userCustomer
     * @return
     * @author zoe
     */
    UserCustomer selectCustomerCodeOne(UserCustomer userCustomer);

    /**
     * 根据客户电话查询是否存在客户
     *
     * @param userCustomer
     * @return
     * @author zoe
     */
    UserCustomer selectCustomerPhoneOne(UserCustomer userCustomer);

    /**
     * 添加客户图片
     *
     * @param customerImage
     * @return
     * @作者 JiangQT
     * @日期 2016年8月1日
     */
    int addCustomerImage(UserCustomerImage customerImage);

    /**
     * 分页查询客户信息列表
     *
     * @param pagination
     * @return
     * @作者 JiangQT
     * @日期 2016年8月2日
     */
    Pagination<UserCustomer> queryCustomerInfoPageList(Pagination<UserCustomer> pagination);

    /**
     * 查询客户信息
     *
     * @param customer
     * @return
     * @作者 JiangQT
     * @日期 2016年8月3日
     */
    UserCustomer queryCustomerInfo(UserCustomer customer);

    /**
     * 查询客户合同关系列表
     *
     * @param customer
     * @return
     * @作者 JiangQT
     * @日期 2016年8月3日
     */
    List<UserCustomer> queryCustomerRelaContractList(UserCustomer customer);

    /**
     * 查询客户图片信息列表
     *
     * @param customerImage
     * @return
     * @作者 JiangQT
     * @日期 2016年8月3日
     */
    List<UserCustomerImage> queryCustomerImage(UserCustomerImage customerImage);

    /**
     * 删除旧客户合同关系数据
     *
     * @param customerRelationship
     * @return
     * @作者 JiangQT
     * @日期 2016年8月3日
     */
    int deleteCustomerRelaContractInfo(UserCustomerRelationship customerRelationship);

    /**
     * 添加客户合同关系数据
     *
     * @param customerRelationship
     * @return
     * @作者 JiangQT
     * @日期 2016年8月3日
     */
    int addCustomerRelaContractInfo(UserCustomerRelationship customerRelationship);

    int updateCustomer(UserCustomer userCustomer);

    /**
     * 查询客户银行卡信息
     *
     * @param curtomerBank
     * @return
     * @作者 JiangQT
     * @日期 2016年8月4日
     */
    UserCustomerBank queryCustomerBank(UserCustomerBank curtomerBank);

    /**
     * 更新客户图片信息
     *
     * @param customerImage
     * @return
     * @作者 JiangQT
     * @日期 2016年9月1日
     */
    int updateCustomerImage(UserCustomerImage customerImage);

    /**
     * 查询客户电话
     *
     * @param customerPhone
     * @return
     * @作者 JiangQT
     * @日期 2016年9月9日
     */
    List<UserCustomerPhone> queryCustomerPhone(UserCustomerPhone customerPhone);

    /**
     * 查询客户银行卡列表
     *
     * @param customerBank
     * @return
     * @作者 JiangQT
     * @日期 2016年10月9日
     */
    List<UserCustomerBank> queryCustomerBankList(UserCustomerBank customerBank);

    /**
     * 添加银行卡
     *
     * @param userCustomerBank
     * @return
     * @作者 JiangQT
     * @日期 2016年10月9日
     */
    int addCustomerBank(UserCustomerBank userCustomerBank);

    /**
     * 更新银行卡信息
     *
     * @param userCustomerBank
     * @return
     * @作者 JiangQT
     * @日期 2016年10月9日
     */
    int updateCustomerBank(UserCustomerBank userCustomerBank);

    /**
     * 删除客户电话
     *
     * @param userCustomerPhone
     * @return
     * @作者 JiangQT
     * @日期 2017年3月29日
     */
    int deleteCustomerPhone(UserCustomerPhone userCustomerPhone);

    /**
     * 删除客户图片
     *
     * @param customerImage
     * @return
     * @作者 JiangQT
     * @日期 2017年3月29日
     */
    int deleteCustomerImage(UserCustomerImage customerImage);

    /**
     * 添加客户电话
     *
     * @param customerPhone
     * @return
     * @作者 JiangQT
     * @日期 2017年3月29日
     */
    int addCustomerPhone(UserCustomerPhone customerPhone);

    /**
     * 客户列表
     *
     * @param userCustomer
     * @return
     * @author 陈智颖
     * @date Mar 29, 2017 9:56:08 AM
     */
    List<UserCustomer> queryCustomerPerson(UserCustomer userCustomer);

    /**
     * 更新客户合同关系数据
     *
     * @param customerRelationship
     * @return
     * @作者 JiangQT
     * @日期 2017年3月29日
     */
    int updateCustomerRelaContractForState(UserCustomerRelationship customerRelationship);

    /**
     * 根据手机号查询客户
     *
     * @return
     * @author 王孝元
     */
    UserCustomer queryCustomerByPhone(String ccp_phone);

    UserCustomer queryCustomerPersonCount(UserCustomer customer);

    /**
     * 查询待签合同的租客
     *
     * @param page
     * @return
     * @author 王孝元
     */
    List<CustomerStayThingVo> queryContractTenantCustomer(Pagination<CustomerStayThingVo> page);

    /**
     * 查询待签合同的房东
     *
     * @param page
     * @return
     * @author 王孝元
     */
    List<CustomerStayThingVo> queryContractLandlordCustomer(Pagination<CustomerStayThingVo> page);

    /**
     * 保存客户扩展信息
     *
     * @param userCustomer
     * @return
     */
    Integer addCustomerExtendInfo(UserCustomer userCustomer);

    /**
     * 保存客户其他证件信息
     *
     * @param userCustomerID
     * @return
     */
    Integer addCustomerIDInfo(UserCustomerID userCustomerID);

    /**
     * 保存客户关联人信息
     *
     * @param userCustomerLinkMan
     * @return
     */
    Integer addCustomerLinkMan(UserCustomerLinkMan userCustomerLinkMan);

    /**
     * 根据客户ID查询扩展信息
     *
     * @param userCustomer
     * @return
     */
    UserCustomer queryCustomerExtendInfoById(UserCustomer userCustomer);

    /**
     * 根据客户ID查询其他证件信息
     *
     * @param userCustomerID
     * @return
     */
    List<UserCustomerID> queryCustomerIDInfoById(UserCustomerID userCustomerID);

    /**
     * 根据客户ID查询联系人信息
     *
     * @param userCustomerLinkMan
     * @return
     */
    List<UserCustomerLinkMan> queryCustomerLinkManInfoById(UserCustomerLinkMan userCustomerLinkMan);

    /**
     * 更新客户扩展信息
     *
     * @param userCustomer
     * @return
     */
    Integer updCustomerExtendInfo(UserCustomer userCustomer);

    /**
     * 更新客户其他证件信息
     *
     * @param userCustomerID
     * @return
     */
    Integer delCustomerIDInfo(UserCustomerID userCustomerID);

    /**
     * 更新客户关联人信息
     *
     * @param userCustomerLinkMan
     * @return
     */
    Integer delCustomerLinkMan(UserCustomerLinkMan userCustomerLinkMan);

    /**
     * 新增意向客户
     *
     * @param userCustomerIntention
     * @return
     */
    Integer addCustomerIntention(UserCustomerIntention userCustomerIntention);

    /**
     * 分页查询意向客户
     *
     * @param pagination
     * @return
     */
    Pagination<UserCustomerIntention> queryCustomerIntention(Pagination<TableList> pagination);

    /**
     * 查询客户类型集合
     *
     * @param type_id
     * @return
     */
    List<UserCenterType> queryUserCenterTypeList(Integer type_id);

    /**
     * 添加客户日志
     *
     * @param userCustomerLog
     * @return
     */
    int addUserCustomerLog(UserCustomerLog userCustomerLog);

    /**
     * 添加客户日志附件
     *
     * @param userCustomerLogAttachment
     * @return
     */
    int addUserCustomerLogAttachment(UserCustomerLogAttachment userCustomerLogAttachment);

    /**
     * 查询客户日志
     *
     * @param pagination
     * @return
     */
    List<UserCustomerLog> queryUserCustomerLogList(Pagination<UserCustomerLog> pagination);

    /**
     * 查询客户日志条数
     *
     * @param pagination
     * @return
     */
    int queryUserCustomerLogListCount(Pagination<UserCustomerLog> pagination);

    /**
     * 查询客户日志附件
     *
     * @param userCustomerLogAttachment
     * @return
     */
    List<UserCustomerLogAttachment> queryLogAttachmentListByClId(UserCustomerLogAttachment userCustomerLogAttachment);

    /**
     * 根据日志ID删除附件
     *
     * @param cl_id
     * @return
     */
    int delLogAttachmentListByClId(Integer cl_id);

    /**
     * 根据ID查询
     *
     * @param cc_id
     * @return
     */
    UserCustomerIntention queryCustomerIntentionById(Integer cc_id);

    /**
     * 根据编码查询意向客户信息
     *
     * @param cc_code
     * @return
     */
    UserCustomerIntention queryCustomerIntentionByCode(String cc_code);

    /**
     * 根据编码查寻客户带看记录
     *
     * @param pagination
     * @return
     */
    List<CustomerStayThingVo> queryHouseSeeingListByCode(Pagination<CustomerStayThingVo> pagination);

    int queryHouseSeeingListByCodeCount(Pagination<CustomerStayThingVo> pagination);

    /**
     * 添加客户黑名单
     *
     * @param userCustomerBlackList
     * @return
     */
    int addCustomerBlackList(UserCustomerBlackList userCustomerBlackList);

    /**
     * 客户黑名单分页查询
     *
     * @param pagination
     * @return
     */
    Pagination<UserCustomerBlackList> queryCustomerBlackList(Pagination<TableList> pagination);

    /**
     * 根据ID查询客户黑名单
     *
     * @param bl_id
     * @return
     */
    UserCustomerBlackList queryCustomerBlackListById(Integer bl_id);

    /**
     * 修改客户黑名单
     *
     * @param userCustomerBlackList
     * @return
     */
    int updCustomerBlackList(UserCustomerBlackList userCustomerBlackList);

    /**
     * 根据用户拓展表ID，查询客户信息主表
     *
     * @param ce_id
     * @return
     */
    UserCustomer queryCustomerInfoById(Integer ce_id);

    /**
     * 更新意向客户信息
     *
     * @param userCustomerIntention
     * @return
     */
    int updCustomerIntentionByCode(UserCustomerIntention userCustomerIntention);

    /**
     * 黑名单检查
     *
     * @param userCustomerBlackList
     * @return
     */
    List<UserCustomerBlackList> checkBlackList(UserCustomerBlackList userCustomerBlackList);

    /**
     * 更新意向客户信息
     *
     * @param userCustomerIntention
     * @return
     */
    int updCustomerIntention(UserCustomerIntention userCustomerIntention);

    /**
     * 根据证件号码查询
     *
     * @param cc_cardNum
     * @return
     */
    List<UserCustomerIntention> queryCustomerIntentionByCardNum(String cc_cardNum);

    /**
     * 客户定金支付成功后，修改客户最新带看记录为已支付
     *
     * @param cc_code
     * @return
     */
    int updHouseSeeingRecordByCode(String cc_code);

    /**
     * 查询扩展信息
     *
     * @param userCustomer
     * @return
     */
    UserCustomer queryCustomerExtendInfoByCode(UserCustomer userCustomer);

    /**
     * 根据身份证号查询房屋合同
     *
     * @author tanglei
     * Date 2017年7月19日 下午 18:13:20
     */
    List<UserCustomer> selectHiCode(UserCustomer customer);

    /**
     * 根据code查询用户信息
     *
     * @param cc_code
     * @return
     */
    User queryUserByCode(String cc_code);

    /**
     * 根据房屋编码查询客户
     *
     * @param hi_code
     * @return
     */
    List<UserCustomer> queryCustomerByHiCode(String hi_code);

    /**
     * 删除客户银行卡
     *
     * @param customerBank
     * @return
     */
    int deleteCustomerBank(UserCustomerBank customerBank);
}
