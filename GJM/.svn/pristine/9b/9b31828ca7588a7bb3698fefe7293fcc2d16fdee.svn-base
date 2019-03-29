package com.gjp.service;

import com.alibaba.fastjson.JSONObject;
import com.gjp.dao.*;
import com.gjp.model.*;
import com.gjp.util.*;
import com.gjp.util.oss.AliOSS;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * @author 陈智颖
 * @version 创建时间：2016年8月1日 下午3:28:28
 */
@Service
public class CustomerService {

    @Resource
    private CustomerDAO customerDAO;
    @Resource
    private CustomerPhoneDAO customerPhoneDAO;
    @Resource
    private CustomerImageDAO customerImageDAO;
    @Resource
    private CustomerBankDAO customerBankDAO;
    /* 房源带看 */
    private @Resource
    HouseSeeingService houseSeeingService;
    /* 房源带看 */
    private @Resource
    HouseLibraryDao houseLibraryDao;
    /* 财务管理服务 */
    private @Resource
    FinanceManageService financeManageService;
    private @Resource
    OrderService orderService;
    private @Resource
    RentHouseService rentHouseService;
    private @Resource
    HouseExtendedService houseExtendedService;

    /**
     * 查询所有客户
     *
     * @return
     * @author 陈智颖
     */
    public List<UserCustomer> selectAllCustomer() {
        return customerDAO.selectAllCustomer();
    }

    /**
     * 根据条件查询客户
     *
     * @param userCustomer
     * @return
     * @author 陈智颖
     */
    public List<UserCustomer> selectCustomerWhere(UserCustomer userCustomer) {
        return customerDAO.selectCustomerWhere(userCustomer);
    }

    /**
     * 根据合同编码查询室友
     *
     * @param userCustomer
     * @return
     * @author 陈智颖
     */
    public List<UserCustomer> selectCustomerRelationshipPerson(UserCustomer userCustomer) {
        return customerDAO.selectCustomerRelationshipPerson(userCustomer);
    }

    /**
     * 根据房屋地址查询房屋
     *
     * @param houseInfoKeep
     * @return
     * @author 陈智颖
     */
    public List<HouseInfoKeep> selectCustomerHouseWhere(HouseInfoKeep houseInfoKeep) {
        return customerDAO.selectCustomerHouseWhere(houseInfoKeep);
    }

    /**
     * 根据客户姓名、电话查询该客户是否存在
     *
     * @param userCustomer
     * @return
     * @author zoe
     */
    public UserCustomer selectCustomerOne(UserCustomer userCustomer) {
        return customerDAO.selectCustomerOne(userCustomer);
    }

    /**
     * 根据身份证判断用户是否存在
     *
     * @param userCustomer
     * @return
     * @author zoe
     */
    public UserCustomer selectCustomerOneNum(UserCustomer userCustomer) {
        return customerDAO.selectCustomerOneNum(userCustomer);
    }

    /**
     * 根据证件号查询客户是否存在
     *
     * @param userCustomer
     * @return
     * @author 陈智颖
     */
    public UserCustomer selectCustomerCard(UserCustomer userCustomer) {
        return customerDAO.selectCustomerCard(userCustomer);
    }

    public UserCustomer selectCustomerCodeOne(UserCustomer userCustomer) {
        return customerDAO.selectCustomerCodeOne(userCustomer);
    }

    public UserCustomer selectCustomerPhoneOne(UserCustomer userCustomer) {
        return customerDAO.selectCustomerPhoneOne(userCustomer);
    }

    /**
     * 根据客户编号查询客户信息
     *
     * @param userCustomer
     * @return
     * @author 陈智颖
     */
    public UserCustomer selectCustomerCode(UserCustomer userCustomer) {
        return customerDAO.selectCustomerCode(userCustomer);
    }

    /**
     * 修改客户信息
     *
     * @param userCustomer      客户信息
     * @param userCustomerBanks 用户银行卡信息
     * @return
     * @author 陈智颖
     */
    public Map<String, Object> updateCustomerList(
            UserCustomer userCustomer,
            List<UserCustomerBank> userCustomerBanks,
            List<UserCustomerImage> userCustomerImages,
            List<UserCustomerPhone> userCustomerPhones) {

        Map<String, Object> map = new HashMap<>();

        // 插入客户信息
        int bool = customerDAO.updateCustomer(userCustomer);
        UserCustomer customerInfo = customerDAO.queryCustomerInfo(userCustomer);

        // 用户存在删除图片
        if (customerInfo.getCc_id() != null) {
            UserCustomerImage customerImage = new UserCustomerImage();
            customerImage.setCc_id(customerInfo.getCc_id());
            customerImageDAO.deleteCustomerImage(customerImage);
        }

        // 插入图片
        for (UserCustomerImage userCustomerImage : userCustomerImages) {
            userCustomerImage.setCc_id(customerInfo.getCc_id());
            if (customerImageDAO.selectCustomerImage(userCustomerImage).isEmpty()) {
                customerImageDAO.insertCustomerImage(userCustomerImage);
            } else {
                customerImageDAO.updateCustomerImage(userCustomerImage);
            }
        }

        // 插入手机
        UserCustomerPhone customerPhone = new UserCustomerPhone();
        customerPhone.setCc_id(customerInfo.getCc_id());
        customerPhoneDAO.deleteCustomerPhone(customerPhone);
        for (UserCustomerPhone userCustomerPhone2 : userCustomerPhones) {
            userCustomerPhone2.setCc_id(customerInfo.getCc_id());
            customerPhoneDAO.insertCustomerPhone(userCustomerPhone2);
        }

        // 插入银行卡
        UserCustomerBank customerBank = new UserCustomerBank();
        customerBank.setCc_id(customerInfo.getCc_id());
        customerBankDAO.deleteCustomerBanke(customerBank);
        for (UserCustomerBank userCustomerBank : userCustomerBanks) {
            userCustomerBank.setCc_id(customerInfo.getCc_id());
            customerBankDAO.insertCustomerBank(userCustomerBank);
        }

        if (bool > 0) {
            map.put("message", "success");
        } else {
            map.put("message", "error");
        }

        return map;
    }

    /**
     * 增加或者修改客户信息
     *
     * @param userCustomer      客户信息
     * @param userCustomerBanks 用户银行卡信息
     * @return
     * @author 陈智颖
     */
    public Map<String, Object> insertCustomer(UserCustomer userCustomer, List<UserCustomerBank> userCustomerBanks, List<UserCustomerImage> userCustomerImages,
                                              List<UserCustomerPhone> userCustomerPhones) {

        Map<String, Object> map = new HashMap<>();

        // 插入客户信息
        int bool = customerDAO.insertCustomerOne(userCustomer);

        // 插入图片
        for (UserCustomerImage userCustomerImage : userCustomerImages) {
            userCustomerImage.setCc_id(userCustomer.getCc_id());
            customerImageDAO.insertCustomerImage(userCustomerImage);
        }

        // 插入手机
        for (UserCustomerPhone userCustomerPhone2 : userCustomerPhones) {
            userCustomerPhone2.setCc_id(userCustomer.getCc_id());
            customerPhoneDAO.insertCustomerPhone(userCustomerPhone2);
        }

        // 插入银行卡
        for (UserCustomerBank userCustomerBank : userCustomerBanks) {
            userCustomerBank.setCc_id(userCustomer.getCc_id());
            customerBankDAO.insertCustomerBank(userCustomerBank);
        }

        if (bool > 0) {
            map.put("message", "success");
        } else {
            map.put("message", "error");
        }

        return map;
    }

    /**
     * 增加或者修改客户信息
     *
     * @return
     * @author shenhx
     */
    public Map<String, Object> saveCustomer(Map<String, Object> data) {

        Map<String, Object> map = new HashMap<>();
        Date date = new Date();
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            map.put("error", Msg.MSG_LOGIN_ERROR);
        }
//		int bool = 0;

        // 保存客户基本及扩展信息
        UserCustomer userCustomerInfo = JSONObject.parseObject((String) data.get("UserCustomer"), UserCustomer.class);
        if (userCustomerInfo.getCc_code() == null || userCustomerInfo.getCc_code().equals("")) {
            String code = AppUtil.getOrderCode("CUS");
            userCustomerInfo.setCc_code(code);
            userCustomerInfo.setUpdate_time(date);
            userCustomerInfo.setCc_ucc_id(employee.getUcc_id());
            userCustomerInfo.setCc_em_id(employee.getEm_id());

            customerDAO.insertCustomerOne(userCustomerInfo);
            userCustomerInfo.setUpdate_time(new Date());
            customerDAO.addCustomerExtendInfo(userCustomerInfo);
            map.put("cc_code", userCustomerInfo.getCc_code());

            // 遍历客户电话
            String[] phoneList = userCustomerInfo.getCcp_phone().split(",");
            for (String aPhoneList : phoneList) {
                String[] phones = aPhoneList.split("-");
                UserCustomerPhone userCustomerPhone = new UserCustomerPhone();
                userCustomerPhone.setCc_id(userCustomerInfo.getCc_id());
                userCustomerPhone.setCcp_time(new Date());
                userCustomerPhone.setCcp_state(Integer.valueOf(phones[0]));
                userCustomerPhone.setCcp_phone(phones[1]);
                customerPhoneDAO.insertCustomerPhone(userCustomerPhone);
            }

            // 图片
            this.deleteCustomerImage(userCustomerInfo.getCc_id());
            if (userCustomerInfo.getFrontCard() != null && !userCustomerInfo.getFrontCard().equals("")) {
                UserCustomerImage userCustomerImage = new UserCustomerImage();
                userCustomerImage.setCc_id(userCustomerInfo.getCc_id());
                userCustomerImage.setCci_type("CD1");
                userCustomerImage.setCci_path(userCustomerInfo.getFrontCard());
                userCustomerImage.setCci_time(date);
                customerImageDAO.insertCustomerImage(userCustomerImage);
            }
            if (userCustomerInfo.getInverseCard() != null && !userCustomerInfo.getInverseCard().equals("")) {
                UserCustomerImage userCustomerImage1 = new UserCustomerImage();
                userCustomerImage1.setCc_id(userCustomerInfo.getCc_id());
                userCustomerImage1.setCci_type("CD2");
                userCustomerImage1.setCci_path(userCustomerInfo.getInverseCard());
                userCustomerImage1.setCci_time(date);
                customerImageDAO.insertCustomerImage(userCustomerImage1);
            }

            // 保存上传客户银行卡信息
            List<UserCustomerBank> userCustomerBankList = JSONObject.parseArray((String) data.get("UserCustomerBankArray"), UserCustomerBank.class);
            if (null != userCustomerBankList && !userCustomerBankList.isEmpty()) {
                for (UserCustomerBank userCustomerBank : userCustomerBankList) {
                    userCustomerBank.setCc_id(userCustomerInfo.getCc_id());
                    userCustomerBank.setCbc_time(date);
                    customerDAO.addCustomerBank(userCustomerBank);
                }
            }
            // 保存上传客户其他证件信息
            List<UserCustomerID> userCustomerIDList = JSONObject.parseArray((String) data.get("UserCustomerIDArray"), UserCustomerID.class);
            if (null != userCustomerIDList && !userCustomerIDList.isEmpty()) {
                for (UserCustomerID userCustomerID : userCustomerIDList) {
                    userCustomerID.setCc_id(userCustomerInfo.getCc_id());
                    userCustomerID.setUpdate_time(date);
                    customerDAO.addCustomerIDInfo(userCustomerID);
                }
            }
            // 保存客户关联人信息
            List<UserCustomerLinkMan> userCustomerLinkManList = JSONObject.parseArray((String) data.get("UserCustomerLinkManArray"), UserCustomerLinkMan.class);
            if (null != userCustomerLinkManList && !userCustomerLinkManList.isEmpty()) {
                for (UserCustomerLinkMan userCustomerLinkMan : userCustomerLinkManList) {
                    userCustomerLinkMan.setCc_id(userCustomerInfo.getCc_id());
                    userCustomerLinkMan.setUpdate_time(date);
                    customerDAO.addCustomerLinkMan(userCustomerLinkMan);
                }
            }
        } else {
            customerDAO.updateCustomer(userCustomerInfo);

            //【根据客户code修改房屋表里的客户名称】
            if ("房东".equals(userCustomerInfo.getCc_type())) {
                HouseInfoKeep houseInfoKeep=new HouseInfoKeep();
                houseInfoKeep.setCc_code(userCustomerInfo.getCc_code());
                List<HouseInfoKeep> houseList=houseLibraryDao.selecthouseList(houseInfoKeep);
                if (houseList.size() >0) {
                    for (HouseInfoKeep house : houseList) {
                        house.setHi_peopleName(userCustomerInfo.getCc_name());
                        int count = houseLibraryDao.updateHouseInfo(house);
                        //房屋扩展信息客户名称
                        HouseHouseExtended houseExtend=houseExtendedService.selectHouseExtendedById(house.getHe_id());
                        houseExtend.setHe_peopleName(userCustomerInfo.getCc_name());
                        houseExtendedService.updataInfo(houseExtend);
                    }
                }
            }

            UserCustomer userExtend = customerDAO.queryCustomerExtendInfoByCode(userCustomerInfo);
            if (null != userExtend) {
                customerDAO.updCustomerExtendInfo(userCustomerInfo);
            } else {
                customerDAO.addCustomerExtendInfo(userCustomerInfo);
            }

            this.deleteCustomerPhone(userCustomerInfo.getCc_id());
            String[] phoneList = userCustomerInfo.getCcp_phone().split(",");
            for (String aPhoneList : phoneList) {
                String[] phones = aPhoneList.split("-");
                UserCustomerPhone userCustomerPhone = new UserCustomerPhone();
                userCustomerPhone.setCc_id(userCustomerInfo.getCc_id());
                userCustomerPhone.setCcp_time(new Date());
                userCustomerPhone.setCcp_state(Integer.valueOf(phones[0]));
                userCustomerPhone.setCcp_phone(phones[1]);
                customerPhoneDAO.insertCustomerPhone(userCustomerPhone);
            }

            // 证件照
            this.deleteCustomerImage(userCustomerInfo.getCc_id());
            if (userCustomerInfo.getFrontCard() != null && !userCustomerInfo.getFrontCard().equals("")) {
                UserCustomerImage userCustomerImage = new UserCustomerImage();
                userCustomerImage.setCc_id(userCustomerInfo.getCc_id());
                userCustomerImage.setCci_type("CD1");
                userCustomerImage.setCci_path(userCustomerInfo.getFrontCard());
                userCustomerImage.setCci_time(date);
                customerImageDAO.insertCustomerImage(userCustomerImage);
            }
            if (userCustomerInfo.getInverseCard() != null && !userCustomerInfo.getInverseCard().equals("")) {
                UserCustomerImage userCustomerImage1 = new UserCustomerImage();
                userCustomerImage1.setCc_id(userCustomerInfo.getCc_id());
                userCustomerImage1.setCci_type("CD2");
                userCustomerImage1.setCci_path(userCustomerInfo.getInverseCard());
                userCustomerImage1.setCci_time(date);
                customerImageDAO.insertCustomerImage(userCustomerImage1);
            }

            // 保存上传客户银行卡信息
            List<UserCustomerBank> userCustomerBankList = JSONObject.parseArray((String) data.get("UserCustomerBankArray"), UserCustomerBank.class);
            // 插入银行卡
            UserCustomerBank customerBank = new UserCustomerBank();
            customerBank.setCc_id(userCustomerInfo.getCc_id());
            customerBankDAO.deleteCustomerBanke(customerBank);
            if (null != userCustomerBankList && !userCustomerBankList.isEmpty()) {
                for (UserCustomerBank userCustomerBank : userCustomerBankList) {
                    userCustomerBank.setCbc_time(date);
                    userCustomerBank.setCc_id(userCustomerInfo.getCc_id());
                    customerDAO.addCustomerBank(userCustomerBank);
                }
            }
            // 保存上传客户其他证件信息
            List<UserCustomerID> userCustomerIDList = JSONObject.parseArray((String) data.get("UserCustomerIDArray"), UserCustomerID.class);
            UserCustomerID customerID = new UserCustomerID();
            customerID.setCc_id(userCustomerInfo.getCc_id());
            customerDAO.delCustomerIDInfo(customerID);
            if (null != userCustomerIDList && !userCustomerIDList.isEmpty()) {
                for (UserCustomerID userCustomerID : userCustomerIDList) {
                    userCustomerID.setUpdate_time(date);
                    userCustomerID.setCc_id(userCustomerInfo.getCc_id());
                    customerDAO.addCustomerIDInfo(userCustomerID);
                }
            }
            // 保存客户关联人信息
            List<UserCustomerLinkMan> userCustomerLinkManList = JSONObject.parseArray((String) data.get("UserCustomerLinkManArray"), UserCustomerLinkMan.class);
            UserCustomerLinkMan linkMan = new UserCustomerLinkMan();
            linkMan.setCc_id(userCustomerInfo.getCc_id());
            customerDAO.delCustomerLinkMan(linkMan);
            if (null != userCustomerLinkManList && !userCustomerLinkManList.isEmpty()) {
                for (UserCustomerLinkMan userCustomerLinkMan : userCustomerLinkManList) {
                    userCustomerLinkMan.setUpdate_time(date);
                    userCustomerLinkMan.setCc_id(userCustomerInfo.getCc_id());
                    customerDAO.addCustomerLinkMan(userCustomerLinkMan);
                }
            }
        }

//		if (bool > 0) {
//			json.put("message", "success");
//		} else {
//			json.put("message", "error");
//		}

        return map;
    }

    /**
     * 身份证识别
     *
     * @return
     * @author 陈智颖
     * @date May 17, 2017 3:11:20 PM
     */
    public Boolean insertIDCardCustomer(String imagez, String imagef, String name, String sex, String idCard, String address, String dates) {
        UserCustomer userCustomer = new UserCustomer();
        userCustomer.setCc_cardNum(idCard);
        UserCustomer selectCustomerCard = customerDAO.selectCustomerCard(userCustomer);
        if (selectCustomerCard == null) {
            // 生成客户编码
            StringBuilder str = new StringBuilder();
            str.append("CUS");// 客户唯一编码前缀
            String date = new Date().getTime() + "";
            str.append(date);// 时间戳
            str.append(Randoms.random());// 随机数4位
            String code = str.toString();
            UserCustomer customer2 = new UserCustomer();
            customer2.setCc_name(name);
            if (sex.equals("男")) {
                customer2.setCc_sex(1);
            } else {
                customer2.setCc_sex(0);
            }
            customer2.setCc_code(code);
            customer2.setCc_cardNum(idCard);
            customer2.setCc_cardType(1);
            customer2.setCc_state(2);// 1：有效客户；2：意向客户；3：客户
            customer2.setCc_address(address);
            customer2.setCc_createTime(new Date());
            customer2.setCc_date(dates);
            Integer count = customerDAO.insertCustomerOne(customer2);// 添加客户

            if (count > 0) {
                UserCustomerImage customerImage = new UserCustomerImage();
                customerImage.setCci_type("CD1");
                customerImage.setCci_path(imagez);
                customerImage.setCc_id(customer2.getCc_id());
                customerDAO.addCustomerImage(customerImage);

                UserCustomerImage customerImage1 = new UserCustomerImage();
                customerImage1.setCci_type("CD2");
                customerImage1.setCc_id(customer2.getCc_id());
                customerImage1.setCci_path(imagef);
                customerDAO.addCustomerImage(customerImage1);

                return true;
            }
        } else {
            UserCustomer customer2 = new UserCustomer();
            customer2.setCc_id(selectCustomerCard.getCc_id());
            customer2.setCc_name(name);
            if (sex.equals("男")) {
                customer2.setCc_sex(1);
            } else {
                customer2.setCc_sex(0);
            }
            customer2.setCc_cardNum(idCard);
            customer2.setCc_cardType(1);
            customer2.setCc_address(address);
            customer2.setCc_createTime(new Date());
            customer2.setCc_date(dates);
            Integer count = customerDAO.updateCustomer(customer2);// 添加客户

            if (count > 0) {
                UserCustomerImage customerImage = new UserCustomerImage();
                customerImage.setCc_id(selectCustomerCard.getCc_id());
                List<UserCustomerImage> selectCustomerImage = customerImageDAO.selectCustomerImage(customerImage);
                if (selectCustomerImage.isEmpty()) {
                    customerImage.setCci_type("CD1");
                    customerImage.setCci_path(imagez);
                    customerImage.setCc_id(customer2.getCc_id());
                    customerDAO.addCustomerImage(customerImage);

                    UserCustomerImage customerImage1 = new UserCustomerImage();
                    customerImage1.setCci_type("CD2");
                    customerImage1.setCc_id(customer2.getCc_id());
                    customerImage1.setCci_path(imagef);
                    customerDAO.addCustomerImage(customerImage1);
                } else {
                    customerImage.setCci_path(imagez);
                    customerImage.setCci_type("CD1");
                    customerImage.setCc_id(customer2.getCc_id());
                    customerImageDAO.updateCustomerImages(customerImage);

                    UserCustomerImage customerImage1 = new UserCustomerImage();
                    customerImage1.setCc_id(customer2.getCc_id());
                    customerImage1.setCci_path(imagef);
                    customerImage1.setCci_type("CD2");
                    customerImageDAO.updateCustomerImages(customerImage1);
                }
                return true;
            }
        }
        return false;
    }

    /**
     * 根据客户编号查询银行卡信息
     *
     * @param userCustomerBank
     * @return
     * @author 陈智颖
     */
    public List<UserCustomerBank> selectCustomerBank(UserCustomerBank userCustomerBank) {
        return customerBankDAO.selectCustomerBank(userCustomerBank);
    }

    /**
     * 新增客户
     *
     * @param userCustomer
     * @return
     * @author zoe
     */
    public int insertCustomerOne(UserCustomer userCustomer) {
        return customerDAO.insertCustomerOne(userCustomer);
    }

    /**
     * 新增客户联系方式
     *
     * @param userCustomerPhone
     * @return
     * @author zoe
     */
    public int insertCustomerPhone(UserCustomerPhone userCustomerPhone) {
        return customerPhoneDAO.insertCustomerPhone(userCustomerPhone);
    }

    /**
     * 添加客户图片
     *
     * @param customerImage
     * @作者 JiangQT
     * @日期 2016年8月1日
     */
    public boolean addCustomerImage(UserCustomerImage customerImage) {
        return customerDAO.addCustomerImage(customerImage) > 0;
    }

    /**
     * 分页查询客户信息列表
     *
     * @param pagination
     * @return
     * @作者 JiangQT
     * @日期 2016年8月2日
     */
    public Pagination<UserCustomer> queryCustomerInfoPageList(Pagination<UserCustomer> pagination) {
        return customerDAO.queryCustomerInfoPageList(pagination);
    }

    /**
     * 查询客户信息
     *
     * @param customer
     * @return
     * @作者 JiangQT
     * @日期 2016年8月3日
     */
    public UserCustomer queryCustomerInfo(UserCustomer customer) {
        return customerDAO.queryCustomerInfo(customer);
    }

    /**
     * 查询客户信息
     *
     * @param cc_id
     * @return
     * @作者 JiangQT
     * @日期 2016年8月3日
     */
    public UserCustomer queryCustomerInfo(Integer cc_id) {
        UserCustomer customer = new UserCustomer();
        customer.setCc_id(cc_id);
        return customerDAO.queryCustomerInfo(customer);
    }

    /**
     * 查询客户信息
     *
     * @return
     * @作者 JiangQT
     * @日期 2016年8月3日
     */
    public UserCustomer queryCustomerInfo(String cc_code) {
        UserCustomer customer = new UserCustomer();
        customer.setCc_code(cc_code);
        return customerDAO.queryCustomerInfo(customer);
    }

    /**
     * 查询客户合同关系列表
     *
     * @param customer
     * @return
     * @作者 JiangQT
     * @日期 2016年8月3日
     */
    public List<UserCustomer> queryCustomerRelaContractList(UserCustomer customer) {
        return customerDAO.queryCustomerRelaContractList(customer);
    }

    /**
     * 查询客户图片信息列表
     *
     * @param cc_id
     * @return
     * @作者 JiangQT
     * @日期 2016年8月3日
     */
    public List<UserCustomerImage> queryCustomerImage(Integer cc_id) {
        UserCustomerImage customerImage = new UserCustomerImage();
        customerImage.setCc_id(cc_id);
        List<UserCustomerImage> customerImages = queryCustomerImage(customerImage);
        for (UserCustomerImage image : customerImages) {
            image.setImg_path(AliOSS.getUrl(image.getCci_path()).toString());
        }
        return customerImages;
    }

    /**
     * 查询客户图片信息列表
     *
     * @param customerImage
     * @return
     * @作者 JiangQT
     * @日期 2016年8月3日
     */
    public List<UserCustomerImage> queryCustomerImage(UserCustomerImage customerImage) {
        List<UserCustomerImage> customerImages = customerDAO.queryCustomerImage(customerImage);
        for (UserCustomerImage image : customerImages) {
            image.setImg_path(AliOSS.getUrl(image.getCci_path()).toString());
        }
        return customerImages;
    }

    /**
     * 删除旧客户合同关系数据
     *
     * @param customerRelationship
     * @return
     * @作者 JiangQT
     * @日期 2016年8月3日
     */
    public boolean deleteCustomerRelaContractInfo(UserCustomerRelationship customerRelationship) {
        return customerDAO.deleteCustomerRelaContractInfo(customerRelationship) > 0;
    }

    /**
     * 删除旧客户合同关系数据
     *
     * @param contractObject_code
     * @return
     * @作者 JiangQT
     * @日期 2016年8月3日
     */
    public boolean deleteCustomerRelaContractInfo(String contractObject_code) {
        UserCustomerRelationship customerRelationship = new UserCustomerRelationship();
        customerRelationship.setContractObject_code(contractObject_code);
        return customerDAO.deleteCustomerRelaContractInfo(customerRelationship) > 0;
    }

    /**
     * 添加客户合同关系数据
     *
     * @param customerRelationship
     * @return
     * @作者 JiangQT
     * @日期 2016年8月3日
     */
    public boolean addCustomerRelaContractInfo(UserCustomerRelationship customerRelationship) {
        return customerDAO.addCustomerRelaContractInfo(customerRelationship) > 0;
    }

    /**
     * 修改客户信息
     *
     * @param userCustomer
     * @return
     * @author zoe
     */
    public int updateCustomer(UserCustomer userCustomer) {
        return customerDAO.updateCustomer(userCustomer);
    }

    /**
     * 修改客户电话信息
     *
     * @return
     * @author zoe
     */
    public int updateCustomerPhone(UserCustomerPhone userCustomerPhone) {
        return customerPhoneDAO.updateCustomerPhone(userCustomerPhone);
    }

    /**
     * 查询客户银行卡信息
     *
     * @param curtomerBank
     * @return
     * @作者 JiangQT
     * @日期 2016年8月4日
     */
    public UserCustomerBank queryCustomerBank(UserCustomerBank curtomerBank) {
        return customerDAO.queryCustomerBank(curtomerBank);
    }

    /**
     * 查询客户银行卡信息
     *
     * @param cc_id
     * @return
     * @作者 JiangQT
     * @日期 2016年8月4日
     */
    public UserCustomerBank queryCustomerBank(Integer cc_id) {
        UserCustomerBank curtomerBank = new UserCustomerBank();
        curtomerBank.setCc_id(cc_id);
        return customerDAO.queryCustomerBank(curtomerBank);
    }

    /**
     * 更新客户图片信息
     *
     * @param customerImage
     * @return
     * @作者 JiangQT
     * @日期 2016年9月1日
     */
    public boolean updateCustomerImage(UserCustomerImage customerImage) {
        return customerDAO.updateCustomerImage(customerImage) > 0;
    }

    /**
     * 查询客户电话
     *
     * @param customerPhone
     * @return
     * @作者 JiangQT
     * @日期 2016年9月9日
     */
    public List<UserCustomerPhone> queryCustomerPhone(UserCustomerPhone customerPhone) {
        return customerDAO.queryCustomerPhone(customerPhone);
    }

    /**
     * 查询客户电话
     *
     * @param cc_id
     * @return
     * @作者 JiangQT
     * @日期 2016年9月9日
     */
    public List<UserCustomerPhone> queryCustomerPhone(Integer cc_id) {
        UserCustomerPhone customerPhone = new UserCustomerPhone();
        customerPhone.setCc_id(cc_id);
        return customerDAO.queryCustomerPhone(customerPhone);
    }

    /**
     * 查询客户银行卡列表
     *
     * @param customerBank
     * @return
     * @作者 JiangQT
     * @日期 2016年10月9日
     */
    public List<UserCustomerBank> queryCustomerBankList(UserCustomerBank customerBank) {
        return customerDAO.queryCustomerBankList(customerBank);
    }

    /**
     * 查询客户银行卡列表
     *
     * @param cc_id
     * @return
     * @作者 JiangQT
     * @日期 2016年10月9日
     */
    public List<UserCustomerBank> queryCustomerBankList(Integer cc_id) {
        UserCustomerBank customerBank = new UserCustomerBank();
        customerBank.setCc_id(cc_id);
        List<UserCustomerBank> customerBanks = customerDAO.queryCustomerBankList(customerBank);
        for (UserCustomerBank bank : customerBanks) {
            bank.setImg_path(AliOSS.getUrl(bank.getCbc_path()).toString());
        }
        return customerBanks;
    }

    /**
     * 添加银行卡
     *
     * @param userCustomerBank
     * @return
     * @作者 JiangQT
     * @日期 2016年10月9日
     */
    public boolean addCustomerBank(UserCustomerBank userCustomerBank) {
        return customerDAO.addCustomerBank(userCustomerBank) > 0;
    }

    /**
     * 更新银行卡
     *
     * @param userCustomerBank
     * @return
     * @作者 JiangQT
     * @日期 2016年10月9日
     */
    public boolean updateCustomerBank(UserCustomerBank userCustomerBank) {
        return customerDAO.updateCustomerBank(userCustomerBank) > 0;
    }

    /**
     * 【业务操作】
     *
     * @param data
     * @return
     * @作者 JiangQT
     * @日期 2017年3月27日
     */
    public Msg<Object> editCustomer(JSONObject data) throws Exception {
        Msg<Object> msg = new Msg<>();
        // 客户数据
        UserCustomer customer = JSONObject.parseObject(data.getString("customer"), UserCustomer.class);
        // 客户电话号码数据
        List<UserCustomerPhone> customerPhones = JSONObject.parseArray(data.getString("customerPhones"), UserCustomerPhone.class);
        // 客户图片数据
        List<UserCustomerImage> customerImages = JSONObject.parseArray(data.getString("customerImages"), UserCustomerImage.class);
        // 客户图片数据
        List<UserCustomerBank> customerBanks = JSONObject.parseArray(data.getString("customerBanks"), UserCustomerBank.class);

        // 验证证件号
        if (!StringUtils.isEmpty(customer.getCc_cardNum())) {
            UserCustomer customer0 = new UserCustomer();
            customer0.setCc_cardNum(customer.getCc_cardNum());
            customer0 = customerDAO.queryCustomerInfo(customer0);
            if (StringUtils.isEmpty(customer.getCc_id()) && customer0 != null) {
                throw new AppException("该证件号已存在，请核对后再提交");
            }
            if (!StringUtils.isEmpty(customer.getCc_id()) && customer0 != null && !customer0.getCc_id().equals(customer.getCc_id())) {
                throw new AppException("该证件号已存在，请核对后再提交");
            }
        }

        // 添加|更新客户数据
        if (StringUtils.isEmpty(customer.getCc_id())) {
            customer.setCc_code(AppUtil.getOrderCode("CUS"));
            customer.setCc_createTime(new Date());
            this.addCustomer(customer);
        } else {
            this.updateCustomer(customer);
        }

        // 删除|添加客户电话号码数据
        this.deleteCustomerPhone(customer.getCc_id());
        for (UserCustomerPhone customerPhone : customerPhones) {
            customerPhone.setCc_id(customer.getCc_id());
            customerPhone.setCcp_time(new Date());
            this.addCustomerPhone(customerPhone);
        }

        // 删除|添加客户证件照片
        this.deleteCustomerImage(customer.getCc_id());
        for (UserCustomerImage customerImage : customerImages) {
            customerImage.setCc_id(customer.getCc_id());
            customerImage.setCci_time(new Date());
            customerImage.setCci_state(0);
            this.addCustomerImage(customerImage);
        }

        // 删除|添加银行卡
        this.deleteCustomerBank(customer.getCc_id());
        for (UserCustomerBank customerBank : customerBanks) {
            customerBank.setCc_id(customer.getCc_id());
            customerBank.setCbc_time(new Date());
            this.addCustomerBank(customerBank);
        }

        // 查询客户
        msg.setData(queryCustomerInfo(customer.getCc_id()));
        return msg;
    }

    /**
     * 删除客户银行卡
     *
     * @param cc_id
     * @return
     */
    public boolean deleteCustomerBank(Integer cc_id) {
        UserCustomerBank customerBank = new UserCustomerBank();
        customerBank.setCc_id(cc_id);
        return customerDAO.deleteCustomerBank(customerBank) > 0;
    }

    public boolean addCustomerPhone(UserCustomerPhone customerPhone) {
        return customerDAO.addCustomerPhone(customerPhone) > 0;
    }

    /**
     * 删除客户电话
     *
     * @param cc_id
     * @return
     * @作者 JiangQT
     * @日期 2017年3月27日
     */
    public boolean deleteCustomerPhone(Integer cc_id) {
        UserCustomerPhone userCustomerPhone = new UserCustomerPhone();
        userCustomerPhone.setCc_id(cc_id);
        return customerDAO.deleteCustomerPhone(userCustomerPhone) > 0;
    }

    /**
     * 删除客户图片
     *
     * @param cc_id
     * @return
     * @作者 JiangQT
     * @日期 2017年3月27日
     */
    public boolean deleteCustomerImage(Integer cc_id) {
        UserCustomerImage customerImage = new UserCustomerImage();
        customerImage.setCc_id(cc_id);
        return customerDAO.deleteCustomerImage(customerImage) > 0;
    }

    /**
     * 删除客户图片
     *
     * @return
     * @作者 JiangQT
     * @日期 2017年3月27日
     */
    public boolean deleteCustomerImage(UserCustomerImage customerImage) {
        return customerDAO.deleteCustomerImage(customerImage) > 0;
    }

    /**
     * 添加客户
     *
     * @param customer
     * @return
     * @作者 JiangQT
     * @日期 2017年3月27日
     */
    public boolean addCustomer(UserCustomer customer) {
        return customerDAO.insertCustomerOne(customer) > 0;
    }

    /**
     * 更新客户合同关系数据
     *
     * @param customerRelationship
     * @return
     * @作者 JiangQT
     * @日期 2017年3月29日
     */
    public boolean updateCustomerRelaContractForState(UserCustomerRelationship customerRelationship) {
        return customerDAO.updateCustomerRelaContractForState(customerRelationship) > 0;
    }

    /**
     * 客户列表
     *
     * @param userCustomer
     * @return
     * @author 陈智颖
     * @date Mar 29, 2017 9:56:08 AM
     */
    public List<UserCustomer> queryCustomerPerson(UserCustomer userCustomer) {
        return customerDAO.queryCustomerPerson(userCustomer);
    }

    public UserCustomer queryCustomerPersonCount(UserCustomer userCustomer) {
        return customerDAO.queryCustomerPersonCount(userCustomer);
    }

    /**
     * 根据手机号查询客户
     *
     * @return
     * @author 王孝元
     */
    public UserCustomer queryCustomerByPhone(String ccp_phone) {
        return customerDAO.queryCustomerByPhone(ccp_phone);
    }

    /**
     * 生成意向客户
     *
     * @param cc_name
     * @param ccp_phone
     * @return
     * @author shenhx
     */
    public String addCustomerIntention(String cc_name, String ccp_phone, String cc_cardNum, Integer em_id, String hs_content) {
        // 意向房源录入时，房东信息先存入意向客户表，待签合同时，转入正式客户表
        UserCustomerIntention userCustomerIntention = new UserCustomerIntention();
        userCustomerIntention.setCc_name(cc_name);
        userCustomerIntention.setCcp_phone(ccp_phone);
//		userCustomerIntention.setCc_sex("0".equals(houseIntention.getPhi_user_sex()) ? "2" : "1");// 1-男；2-女
        userCustomerIntention.setCc_em_id(em_id);
        userCustomerIntention.setCc_type(2);// 意向租客
        userCustomerIntention.setContact_time(new Date());
        userCustomerIntention.setFollow_status(2);// 预约
        userCustomerIntention.setContact_remark("带看房屋");
        userCustomerIntention.setCustomer_need("【求租】" + hs_content);
        String cc_code = AppUtil.getOrderCode("CUS");
        userCustomerIntention.setCc_code(cc_code);
        customerDAO.addCustomerIntention(userCustomerIntention);
        return cc_code;
    }

    /**
     * 生成意向客户
     *
     * @param cc_name
     * @param ccp_phone
     * @return
     * @author 王孝元
     */
    public String addIntentionCustomer(String cc_name, String ccp_phone, String cc_cardNum) {
        // 查询是否存在该客户
        UserCustomer customer = new UserCustomer();
        customer.setCcp_phone(ccp_phone);
        UserCustomer customer1 = customerDAO.selectCustomerOne(customer);
        String ucc_code = "";
        if (customer1 == null) {// 不存在该客户
            // 生成客户编码
            StringBuilder str = new StringBuilder();
            str.append("CUS");// 客户唯一编码前缀
            String date = new Date().getTime() + "";
            str.append(date);// 时间戳
            str.append(Randoms.random());// 随机数4位
            String code = str.toString();
            UserCustomer customer2 = new UserCustomer();
            customer2.setCc_name(cc_name);
            customer2.setCc_sex(2);
            customer2.setCc_code(code);
            customer2.setCc_cardNum(cc_cardNum);
            customer2.setCc_state(2);// 1：有效客户；2：意向客户；3：客户
            customer2.setCc_createTime(new Date());
            Integer count = customerDAO.insertCustomerOne(customer2);// 添加客户
            if (count == 1) {// 客户添加成功
                // 添加客户电话
                UserCustomerPhone customerPhone = new UserCustomerPhone();
                customerPhone.setCcp_phone(ccp_phone);
                customerPhone.setCcp_time(new Date());
                customerPhone.setCcp_state(1);// -1:号码已注销；0：弃用；1：正在使用；2：备用
                customerPhone.setCc_id(customer2.getCc_id());
                Integer teger = customerPhoneDAO.insertCustomerPhone(customerPhone);
                if (teger == 1) {// 添加客户电话成功
                    ucc_code = code;
                }
            }
        } else {
            ucc_code = customer1.getCc_code();
            if (cc_cardNum != null && !cc_cardNum.equals("")) {
                UserCustomer customer2 = new UserCustomer();
                customer2.setCc_code(ucc_code);
                customer2.setCc_cardNum(cc_cardNum);
                customer2.setCc_id(customer1.getCc_id());
                customerDAO.updateCustomer(customer2);
            }
        }
        return ucc_code;
    }

    /**
     * 查询待签合同的租客
     *
     * @param page
     * @return
     * @author 王孝元
     */
    public List<CustomerStayThingVo> queryContractTenantCustomer(Pagination<CustomerStayThingVo> page) {
        return customerDAO.queryContractTenantCustomer(page);
    }

    /**
     * 查询待签合同的房东
     *
     * @param page
     * @return
     * @author 王孝元
     */
    public List<CustomerStayThingVo> queryContractLandlordCustomer(Pagination<CustomerStayThingVo> page) {
        return customerDAO.queryContractLandlordCustomer(page);
    }

    /**
     * 保存客户扩展信息
     *
     * @param userCustomer
     * @return
     */
    public Integer addCustomerExtendInfo(UserCustomer userCustomer) {
        return customerDAO.addCustomerExtendInfo(userCustomer);
    }

    /**
     * 保存客户其他证件信息
     *
     * @param userCustomerID
     * @return
     */
    public Integer addCustomerIDInfo(UserCustomerID userCustomerID) {
        return customerDAO.addCustomerIDInfo(userCustomerID);
    }

    /**
     * 保存客户关联人信息
     *
     * @param userCustomerLinkMan
     * @return
     */
    public Integer addCustomerLinkMan(UserCustomerLinkMan userCustomerLinkMan) {
        return customerDAO.addCustomerLinkMan(userCustomerLinkMan);
    }

    /**
     * 根据客户ID查询扩展信息
     *
     * @param userCustomer
     * @return
     */
    public UserCustomer queryCustomerExtendInfoById(UserCustomer userCustomer) {
        return customerDAO.queryCustomerExtendInfoById(userCustomer);
    }

    /**
     * 根据客户ID查询其他证件信息
     *
     * @return
     */
    public List<UserCustomerID> queryCustomerIDInfoById(UserCustomerID userCustomerID) {
        return customerDAO.queryCustomerIDInfoById(userCustomerID);
    }

    /**
     * 根据客户ID查询联系人信息
     *
     * @return
     */
    public List<UserCustomerLinkMan> queryCustomerLinkManInfoById(UserCustomerLinkMan userCustomerLinkMan) {
        return customerDAO.queryCustomerLinkManInfoById(userCustomerLinkMan);
    }

    /**
     * 新增意向客户
     *
     * @param userCustomerIntention
     * @return
     */
    public int addCustomerIntention(UserCustomerIntention userCustomerIntention) {
        return customerDAO.addCustomerIntention(userCustomerIntention);
    }

    /**
     * 分页查询意向客户
     *
     * @param pagination
     * @return
     */
    public Pagination<UserCustomerIntention> queryCustomerIntention(Pagination<TableList> pagination) {
        return customerDAO.queryCustomerIntention(pagination);
    }

    /**
     * 查询客户类型List
     *
     * @return
     */
    public List<UserCenterType> queryUserCenterTypeList(Integer type_id) {
        return customerDAO.queryUserCenterTypeList(type_id);
    }

    /**
     * 添加客户日志
     *
     * @param userCustomerLog
     * @return
     */
    public int addUserCustomerLog(UserCustomerLog userCustomerLog) {
        return customerDAO.addUserCustomerLog(userCustomerLog);
    }

    /**
     * 添加客户日志附件
     *
     * @param userCustomerLogAttachment
     * @return
     */
    public int addUserCustomerLogAttachment(UserCustomerLogAttachment userCustomerLogAttachment) {
        return customerDAO.addUserCustomerLogAttachment(userCustomerLogAttachment);
    }

    /**
     * 查询客户日志
     *
     * @return
     */
    public List<UserCustomerLog> queryUserCustomerLogList(Pagination<UserCustomerLog> pagination) {
        return customerDAO.queryUserCustomerLogList(pagination);
    }

    public int queryUserCustomerLogListCount(Pagination<UserCustomerLog> pagination) {
        return customerDAO.queryUserCustomerLogListCount(pagination);
    }

    /**
     * 查询客户日志附件
     *
     * @param userCustomerLogAttachment
     * @return
     */
    public List<UserCustomerLogAttachment> queryLogAttachmentListByClId(UserCustomerLogAttachment userCustomerLogAttachment) {
        return customerDAO.queryLogAttachmentListByClId(userCustomerLogAttachment);
    }

    public int delLogAttachmentListByClId(Integer cl_id) {
        return customerDAO.delLogAttachmentListByClId(cl_id);
    }

    /**
     * 根据ID查询
     *
     * @param ci_id
     * @return
     */
    public UserCustomerIntention queryCustomerIntentionById(Integer ci_id) {
        return customerDAO.queryCustomerIntentionById(ci_id);
    }

    /**
     * 根据编码查询
     *
     * @param cc_code
     * @return
     */
    public UserCustomerIntention queryCustomerIntentionByCode(String cc_code) {
        return customerDAO.queryCustomerIntentionByCode(cc_code);
    }

    /**
     * 根据客户编码查询客户带看记录
     *
     * @return
     */
    public List<CustomerStayThingVo> queryHouseSeeingListByCode(Pagination<CustomerStayThingVo> pagination) {
        return customerDAO.queryHouseSeeingListByCode(pagination);
    }

    public int queryHouseSeeingListByCodeCount(Pagination<CustomerStayThingVo> pagination) {
        return customerDAO.queryHouseSeeingListByCodeCount(pagination);
    }

    /**
     * 更新客户扩展信息
     *
     * @return
     */
    public int updCustomerExtendInfo(UserCustomer userCustomer) {
        return customerDAO.updCustomerExtendInfo(userCustomer);
    }

    /**
     * 添加客户黑名单
     *
     * @param userCustomerBlackList
     * @return
     */
    public int addCustomerBlackList(UserCustomerBlackList userCustomerBlackList) {
        return customerDAO.addCustomerBlackList(userCustomerBlackList);
    }

    /**
     * 分页查询
     *
     * @param pagination
     * @return
     */
    public Pagination<UserCustomerBlackList> queryCustomerBlackList(Pagination<TableList> pagination) {
        return customerDAO.queryCustomerBlackList(pagination);
    }

    /**
     * 根据ID查询客户黑名单
     *
     * @param bl_id
     * @return
     */
    public UserCustomerBlackList queryCustomerBlackListById(Integer bl_id) {
        return customerDAO.queryCustomerBlackListById(bl_id);
    }

    /**
     * 更新状态
     *
     * @param userCustomerBlackList
     * @return
     */
    public int updCustomerBlackList(UserCustomerBlackList userCustomerBlackList) {
        return customerDAO.updCustomerBlackList(userCustomerBlackList);
    }

    /**
     * 根据用户扩展表ID查询客户主表信息
     *
     * @param ce_id
     * @return
     */
    public UserCustomer queryCustomerInfoById(Integer ce_id) {
        return customerDAO.queryCustomerInfoById(ce_id);
    }

    /**
     * 修改意向客户信息
     *
     * @param userCustomerIntention
     * @return
     */
    public int updCustomerIntentionByCode(UserCustomerIntention userCustomerIntention) {
        return customerDAO.updCustomerIntentionByCode(userCustomerIntention);
    }

    /**
     * 黑名单检查
     *
     * @param userCustomerBlackList
     * @return
     */
    public boolean checkBlackList(UserCustomerBlackList userCustomerBlackList) {
        return customerDAO.checkBlackList(userCustomerBlackList).isEmpty();
    }

    /**
     * 更新意向客户信息
     *
     * @param userCustomerIntention
     * @return
     */
    public int updCustomerIntention(UserCustomerIntention userCustomerIntention) {
        return customerDAO.updCustomerIntention(userCustomerIntention);
    }

    /**
     * 根据证件号码查询意向客户信息
     *
     * @param cc_cardNum
     * @return
     */
    public List<UserCustomerIntention> queryCustomerIntentionByCardNum(String cc_cardNum) {
        return customerDAO.queryCustomerIntentionByCardNum(cc_cardNum);
    }

    /**
     * 客户支付成功后，更新客户带看记录为已支付
     *
     * @param cc_code
     * @return
     */
    public int updHouseSeeingRecordByCode(String cc_code) {
        return customerDAO.updHouseSeeingRecordByCode(cc_code);
    }

    /**
     * 根据ID查询客户扩展信息
     *
     * @param customer
     * @return
     */
    public UserCustomer queryCustomerExtendInfoByCode(UserCustomer customer) {
        return customerDAO.queryCustomerExtendInfoByCode(customer);
    }

    /**
     * 根据身份证号查询房屋合同
     *
     * @author tanglei
     * Date 2017年7月19日 下午 18:13:20
     */
    public List<UserCustomer> selectHiCode(UserCustomer customer) {
        return customerDAO.selectHiCode(customer);
    }

    /**
     * 添加客户带看
     *
     * @param json
     * @return
     * @throws Exception
     */
    public Msg<Object> addCustomerFollow(JSONObject json) throws Exception {
        Msg<Object> msg = new Msg<>();
        String hi_code = json.getString("hi_code");
        String cc_code = json.getString("cc_code");
        String cc_name = json.getString("cc_name");
        String cc_phone = json.getString("cc_phone");
        String cc_card = json.getString("cc_card");
        String payMoney = json.getString("payMoney");
        String hs_content = json.getString("hs_content");
        String hs_payType = json.getString("hs_payType");
        Integer hs_day = json.getInteger("hs_day");
        String hs_contractDay = json.getString("hs_contractDay");
        Integer em_id = json.getInteger("em_id");
        String contractStartDate = json.getString("contractStartDate");

        // 【查询房源状态】
        ViewHouseLibraryInfoVo houseLibraryInfoVo = new ViewHouseLibraryInfoVo();
        houseLibraryInfoVo.setHi_code(hi_code);
        houseLibraryInfoVo = houseLibraryDao.queryHouseLibraryInfo(houseLibraryInfoVo);
        if (houseLibraryInfoVo == null) {
            throw new AppException(Msg.MSG_PARAM_ERROR);
        }
        // 是否为招租状态
        if (houseLibraryInfoVo.getHi_isForRent() != 1) {
            throw new AppException("该房源已缴纳定金或者未招租");
        }

        // 是否为正式客户
        UserCustomer customer = new UserCustomer();
        if (!StringUtils.isEmpty(cc_code)) {
            customer.setCc_code(cc_code);
        } else {
            customer.setCc_cardNum(cc_card);
        }
        customer = this.queryCustomerInfo(customer);
        if (customer == null) {
            // 添加客户信息
            customer = new UserCustomer();
            customer.setCc_name(cc_name);
            customer.setCc_code(AppUtil.getOrderCode("CUS"));
            customer.setCc_cardNum(cc_card);
            customer.setCc_sex(AppUtil.getCardIDSex(cc_card));
            customer.setCc_state(2);
            customer.setCc_cardType(AppUtil.isCardId(cc_card) ? 1 : 5);
            customer.setCc_createTime(new Date());
            if (!this.addCustomer(customer)) {
                throw new AppException("添加客户数据失败，请重试或联系管理员");
            }

            // 添加客户电话数据
            UserCustomerPhone customerPhone = new UserCustomerPhone();
            customerPhone.setCc_id(customer.getCc_id());
            customerPhone.setCcp_phone(cc_phone);
            customerPhone.setCcp_state(1);
            customerPhone.setCcp_time(new Date());
            if (!this.addCustomerPhone(customerPhone)) {
                throw new AppException("添加客户数据失败，请重试或联系管理员");
            }
        }
        json.put("cc_code", customer.getCc_code());

        // 检查房源是否缴纳定金
        ContractOrderVo contractOrderVo0 = new ContractOrderVo();
        contractOrderVo0.setHi_code(hi_code);
        contractOrderVo0.setBco_orderType(AppConfig.order_type_4);
        contractOrderVo0.setBco_customer(customer.getCc_code());
        contractOrderVo0.setContractObject_code_where("isNull");
        contractOrderVo0.setBco_optionState(AppConfig.order_option_state_3);
        List<ContractOrderVo> financeOrderList = financeManageService.queryFinanceOrderList(contractOrderVo0);
        if (financeOrderList != null && !financeOrderList.isEmpty()) {
            throw new AppException("该房源已缴纳定金，无法继续缴纳定金");
        }

        // 【添加带看数据】
        HouseSeeing houseSeeing = new HouseSeeing();
        houseSeeing.setCc_code(customer.getCc_code());
        houseSeeing.setEm_id(em_id);
        houseSeeing.setHi_code(hi_code);
        houseSeeing.setHs_payType(hs_payType);
        houseSeeing.setHs_day(hs_day);
        houseSeeing.setHs_contractDay(hs_contractDay);
        houseSeeing.setHs_state(1);// 带看结果-成功
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        houseSeeing.setHs_contractStartDate(sdf.parse(contractStartDate));
        List<HouseSeeing> queryHouseSeeingList = houseSeeingService.queryHouseSeeingList(houseSeeing);
        if (queryHouseSeeingList == null || queryHouseSeeingList.isEmpty()) {
            houseSeeing.setHs_content("收定(未支付)[" + hs_content + "]");
            houseSeeing.setHs_createTime(new Date());
            houseSeeingService.addHouseSeeing(houseSeeing);
        }

        // 【添加客户日志】
        UserCustomerLog customerLog = new UserCustomerLog();
        customerLog.setCc_code(customer.getCc_code());
        customerLog.setCl_type(79);// 带看
        customerLog.setCl_content("客户带看成功，" + hs_content);
        customerLog.setCl_author(em_id);
        customerLog.setCl_source(2);// 系统添加
        customerLog.setCl_createTime(new Date());
        this.addUserCustomerLog(customerLog);

        // 【下架支付宝平台上该房屋】
        RentHouseVo rentHouseVo = rentHouseService.queryRentHouseVo(hi_code);
        if (null != rentHouseVo) {
            rentHouseService.rentHouseStateSync(hi_code, rentHouseVo.getRoom_code(), 0, 2, "分散式".equals(houseLibraryInfoVo.getHis_name()) ? 1 : 2);
            rentHouseVo.setRoom_status(0);
            rentHouseService.updataRentHouseVo(rentHouseVo);
        }

        // 【添加订单、账单、流水】
//        return financeManageService.addDepositOrderBillBo(json);
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("channel", json.getString("channel"));
        jsonObject.put("cc_code", json.getString("cc_code"));
        jsonObject.put("hi_code", hi_code);
        jsonObject.put("pay_money", payMoney);
        jsonObject.put("reserve_day", hs_day);
        msg.put("orderInfo", orderService._submitPayDownPayment(jsonObject));
        return msg;
    }

    /**
     * 根据code查询用户信息
     *
     * @param cc_code
     * @return
     */
    public User queryUserByCode(String cc_code) {
        return customerDAO.queryUserByCode(cc_code);
    }

    /**
     * 根据房屋编码查询客户
     *
     * @param hi_code
     * @return
     */
    public List<UserCustomer> queryCustomerByHiCode(String hi_code) {
        return customerDAO.queryCustomerByHiCode(hi_code);
    }

    /**
     * 查询客户代办信息
     *
     * @param
     * @return
     * @author 陈智颖
     * @create 25/11/17 17:18
     **/
    public Map<String, Object> queryCustomerStayList(Integer pageNo, Integer pageSize, Integer em_id, String where) {
        Map<String, Object> map = new HashMap<>();
        // 封装查询条件
        Pagination<CustomerStayThingVo> page = new Pagination<>();
        page.setWhere(where);
        page.setPageNo(pageNo);
        page.setPageSize(pageSize);
        CustomerStayThingVo cst = new CustomerStayThingVo();
        cst.setEm_id(em_id);
        page.setT(cst);

        List<NeedMatters> needMatterss = new ArrayList<>();
        List<CustomerStayThingVo> tandlordList = queryContractLandlordCustomer(page);
        for (CustomerStayThingVo customerStayThingVo : tandlordList) {
            int random = (int) Math.round(Math.random() * 12 + 1);
            NeedMatters needMatters = new NeedMatters();
            needMatters.setPotoImage("/resources/image/appPage/stay/" + random + ".png");
            needMatters.setHouse_address(customerStayThingVo.getHouse_address());
            needMatters.setName(customerStayThingVo.getCc_name());
            if (customerStayThingVo.getCc_type().equals("租客")) {
                needMatters.setState("租赁");
            } else {
                needMatters.setState("通关");
            }
            needMatters.setDateStr(customerStayThingVo.getHs_createTime().split(" ")[0]);
            needMatterss.add(needMatters);
        }
        if (tandlordList.isEmpty()) {
            map.put("code", 401);
            map.put("msg", "没有更多数据");
        } else {
            map.put("data", needMatterss);
            map.put("code", 200);
        }
        return map;
    }
}
