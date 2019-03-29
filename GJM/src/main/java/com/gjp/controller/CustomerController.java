package com.gjp.controller;

import com.alibaba.fastjson.JSONObject;
import com.gjp.model.*;
import com.gjp.model.UserCenterMessage;
import com.gjp.service.*;
import com.gjp.util.*;
import com.gjp.util.oss.AliOSS;
import org.apache.commons.fileupload.disk.DiskFileItem;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * @author 陈智颖
 * @version 创建时间：2016年8月16日 下午4:44:49
 */
@RequestMapping("/customer")
public @Controller
class CustomerController {

    // 合同对象
    private @Resource
    ContractService userCenterContractObjectService;

    // 用户对象
    private @Resource
    UserService userService;

    // 客户表
    private @Resource
    CustomerService customerService;

    // 客户手机表
    private @Resource
    CustomerPhoneService customerPhoneService;

    // 客户手机表
    private @Resource
    CutomerFollowUpService cutomerFollowUpService;

    // 客户图片
    private @Resource
    CustomerImageService customerImageService;

    // 短信模板
    private @Resource
    MessageModelService messageModelService;

    // 短信发送
    private @Resource
    MessageService messageService;

    // 推荐群体
    private @Resource
    HoseRecommendGroupService hoseRecommendGroupService;

    private @Resource
    HouseInformationStateService houseInformationStateService;

    // 房屋带看
    private @Resource
    HouseSeeingService houseSeeingService;
    // 房源库
    private @Resource
    HouseLibraryService houseLibraryService;
    // 财务管理服务
    private @Resource
    FinanceManageService financeManageService;
    // 短信管理服务
    private @Resource
    SmsService smsService;
    // 员工管理
    private @Resource
    UserCenterEmployeeService employeeService;

    /**
     * 客户列表
     *
     * @return
     * @author JiangQT
     */
    @RequestMapping("/customerList")
    public ModelAndView customerList() {
        return new ModelAndView("/customer/customerList");
    }

    /**
     * 意向客户列表
     *
     * @return
     * @author JiangQT
     */
    @RequestMapping("/customerIntention")
    public ModelAndView customerIntention() {
        return new ModelAndView("/customer/customerIntention");
    }

    /**
     * 黑名单客户列表
     *
     * @return
     * @author JiangQT
     */
    @RequestMapping("/customerBlackList")
    public ModelAndView customerBlackList() {
        return new ModelAndView("/customer/customerBlackList");
    }

    @RequestMapping("/addCustomerPage")
    public String addCustomerPage() {
        return "/customer/customerAdd";
    }

    /**
     * 客户编辑
     *
     * @return
     * @author JiangQT
     */
    @RequestMapping("/customerEdit")
    public ModelAndView customerEdit(Integer cid) {
        ModelAndView view = new ModelAndView("/customer/customerEdit");
        if (!StringUtils.isEmpty(cid)) {
            UserCustomer customer = customerService.queryCustomerInfo(cid);
            view.addObject("contractSign", customer);

            // 银行卡图片
            UserCustomerBank customerBank = customerService.queryCustomerBank(cid);
            if (customerBank != null) {
                view.addObject("BKIMG", customerBank.getCbc_path());
            }
            // 证件照图片
            UserCustomerImage customerImage = new UserCustomerImage();
            customerImage.setCc_id(cid);
            List<UserCustomerImage> customerImages = customerService.queryCustomerImage(customerImage);
            List<Object> cd1 = new ArrayList<>();
            List<Object> cd2 = new ArrayList<>();
            for (UserCustomerImage customerImage2 : customerImages) {
                switch (customerImage2.getCci_type()) {
                    case "CD1":
                        cd1.add(customerImage2.getCci_path());
                        break;
                    case "CD2":
                        cd1.add(customerImage2.getCci_path());
                        break;
                    case "CD":
                        if (cd1.isEmpty()) {
                            cd1.add(customerImage2.getCci_path());
                        } else {
                            cd2.add(customerImage2.getCci_path());
                        }
                        break;
                }
            }
            view.addObject("CD1IMG", cd1);
            view.addObject("CD2IMG", cd2);
        }
        view.addObject("bankTypeList", userCenterContractObjectService.selectContractTypeByParentId(EnumTypeStatus.TYPE_BANK.getId()));
        return view;
    }

    /**
     * 用户认证列表
     *
     * @return
     * @author JiangQT
     */
    @RequestMapping("/userAuthList")
    public ModelAndView userAuthList() {
        return new ModelAndView("/customer/userAuthList");
    }

    /**
     * 用户认证编辑
     *
     * @return
     * @author JiangQT
     */
    @RequestMapping("/userAuthEdit")
    public ModelAndView userAuthEdit(Integer uid) {
        ModelAndView view = new ModelAndView("/customer/userAuthEdit");
        if (!StringUtils.isEmpty(uid)) {
            ViewUserAuthListVo userAuthListVo = new ViewUserAuthListVo();
            userAuthListVo.setUser_id(uid);
            userAuthListVo = userService.queryUserAuthView(userAuthListVo);
            view.addObject("userAuthListVo", userAuthListVo);
            if (userAuthListVo != null) {
                ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
                contractVo.setCc_cardNum(userAuthListVo.getUserVerify_cardNumber());
                contractVo.setContractObject_OptionState(AppConfig.contract_optionstate_104);
                contractVo.setContractObject_Type(AppConfig.TYPE_CONTRACT_201);
                ViewBusinessContractVo contractVo2 = userCenterContractObjectService.selectContractObjectByCard(contractVo);
                if (contractVo2 == null) {
                    contractVo.setContractObject_Type(AppConfig.TYPE_CONTRACT_202);
                    contractVo2 = userCenterContractObjectService.selectContractObjectByCard(contractVo);
                }
                view.addObject("contractVo", contractVo2);

                // 客户信息
                UserCustomer customer = new UserCustomer();
                customer.setCc_cardNum(userAuthListVo.getUserVerify_cardNumber());
                customer = customerService.queryCustomerInfo(customer);
                view.addObject("contractSign", customer);

                // 银行卡图片
                UserCustomerBank customerBank = customerService.queryCustomerBank(customer.getCc_id());
                if (customerBank != null) {
                    view.addObject("BKIMG", customerBank.getCbc_path());
                }
                // 证件照图片
                UserCustomerImage customerImage = new UserCustomerImage();
                customerImage.setCc_id(customer.getCc_id());
                List<UserCustomerImage> customerImages = customerService.queryCustomerImage(customerImage);
                List<Object> cd1 = new ArrayList<>();
                List<Object> cd2 = new ArrayList<>();
                for (UserCustomerImage customerImage2 : customerImages) {
                    switch (customerImage2.getCci_type()) {
                        case "CD1":
                            cd1.add(customerImage2.getCci_path());
                            break;
                        case "CD2":
                            cd1.add(customerImage2.getCci_path());
                            break;
                        case "CD":
                            if (cd1.isEmpty()) {
                                cd1.add(customerImage2.getCci_path());
                            } else {
                                cd2.add(customerImage2.getCci_path());
                            }
                            break;
                    }
                }
                view.addObject("CD1IMG", cd1);
                view.addObject("CD2IMG", cd2);
            }
        }
        return view;
    }

    /**
     * 房源跟进内容记录添加
     *
     * @param dateStr
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/addCutomerFollowUp")
    @ResponseBody
    public Map<String, Object> addCutomerFollowUp(CutomerFollowUp cutomerFollowUp, String dateStr) {

        Map<String, Object> map = new HashMap<>();
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        Date dateTime = new Date();
        String dates = "";
        Integer bool = 0;
        if (cutomerFollowUp != null && cutomerFollowUp.getCc_code() != null && !cutomerFollowUp.getCc_code().trim().equals("")) {
            if (dateStr != null && !dateStr.trim().equals("")) {
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
                SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd");
                try {
                    Date date = sdf.parse(dateStr);
                    dates = sdf1.format(dateTime);
                    cutomerFollowUp.setHt_remind_time(date);
                } catch (ParseException e) {
                    e.printStackTrace();
                }
            }
            cutomerFollowUp.setEm_id(employee.getEm_id());// 跟进人
            cutomerFollowUp.setHt_time(new Date());// 跟进记录添加时间
            cutomerFollowUp.setHt_houseType(0);// 手动添加跟进记录

            bool = cutomerFollowUpService.insertCutomerFollowUp(cutomerFollowUp);

        }
        if (bool > 0) {
            map.put("message", "success");
            map.put("newName", employee.getEm_name() + "/" + dates);
            return map;
        } else {
            map.put("message", "error");
            return map;
        }

    }

    /**
     * 显示客户列表信息
     *
     * @return
     * @throws ParseException
     * @author JiangQT
     */
    @RequestMapping("queryCustomerList")
    @ResponseBody
    public Map<String, Object> queryCustomerList(TableList tableList1) throws ParseException {

        Map<String, Object> map;

        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");

        Calendar c = Calendar.getInstance();
        Date date = new Date();
        switch (tableList1.getDateStr()) {
            case "今天":
                tableList1.setDateStart(sf.format(date));
                tableList1.setDateEnd(sf.format(date));
                break;
            case "最近一周":
                tableList1.setDateEnd(sf.format(date));
                c.setTime(date);
                c.add(Calendar.DAY_OF_MONTH, -7);
                tableList1.setDateStart(sf.format(c.getTime()));
                break;
            case "最近一月":
                tableList1.setDateEnd(sf.format(date));
                c.setTime(date);
                c.add(Calendar.MONTH, -1);
                tableList1.setDateStart(sf.format(c.getTime()));
                break;
            default:
                break;
        }

        List<String> sqlWhereList = new ArrayList<>();
        List<String> sqlWhereList1 = new ArrayList<>();

        if (tableList1.getStr() != null && !tableList1.getStr().equals("")) {
            String[] split = tableList1.getStr().split(",");
            for (String aSplit : split) {
                if (aSplit.split("::").length == 1) {
                    continue;
                }
                String[] split2 = aSplit.split("::");
                String where;
                if (AppUtil.isValid(split2[1])) {
                    where = "\'%" + split2[1] + "%\'";
                } else {
                    where = "";
                }
                if (!where.equals("")) {
                    if (!split2[0].equals("house_address")) {
                        Boolean bool = true;
                        String[] split3 = split2[0].split("-");
                        for (int j = 0; j < sqlWhereList.size(); j++) {
                            if (sqlWhereList.get(j).contains(split3[0])) {
                                String str1 = sqlWhereList.get(j).substring(0, sqlWhereList.get(j).length() - 1);
                                StringBuilder str2 = new StringBuilder();
                                for (String aSplit3 : split3) {
                                    str2.append(" or ").append(aSplit3).append(" like ").append(where).append("");
                                }
                                str1 += str2 + ")";
                                sqlWhereList.set(j, str1);
                                bool = false;
                                break;
                            }
                        }
                        if (bool) {
                            if (split3.length > 1) {
                                StringBuilder str1 = new StringBuilder(" and ( ");
                                for (int k = 0; k < split3.length; k++) {
                                    if (k == 0) {
                                        str1.append("").append(split3[k]).append(" like ").append(where).append("");
                                    } else {
                                        str1.append(" or ").append(split3[k]).append(" like ").append(where).append("");
                                    }
                                }
                                sqlWhereList.add(str1 + ")");
                            } else {
                                sqlWhereList.add(" and (" + split2[0] + " like " + where + ")");
                            }
                        }
                    } else {
                        Boolean bool = true;
                        String[] split3 = split2[0].split("-");
                        for (int j = 0; j < sqlWhereList1.size(); j++) {
                            if (sqlWhereList1.get(j).contains(split3[0])) {
                                String str1 = sqlWhereList1.get(j).substring(0, sqlWhereList1.get(j).length() - 1);
                                StringBuilder str2 = new StringBuilder();
                                for (String aSplit3 : split3) {
                                    str2.append(" or ").append(aSplit3).append(" like ").append(where).append("");
                                }
                                str1 += str2 + ")";
                                sqlWhereList1.set(j, str1);
                                bool = false;
                                break;
                            }
                        }
                        if (bool) {
                            if (split3.length > 1) {
                                StringBuilder str1 = new StringBuilder(" and ( ");
                                for (int k = 0; k < split3.length; k++) {
                                    if (k == 0) {
                                        str1.append("").append(split3[k]).append(" like ").append(where).append("");
                                    } else {
                                        str1.append(" or ").append(split3[k]).append(" like ").append(where).append("");
                                    }
                                }
                                sqlWhereList1.add(str1 + ")");
                            } else {
                                sqlWhereList1.add(" and (" + split2[0] + " like " + where + ")");
                            }
                        }
                    }
                }
            }
        }

        StringBuilder sqlWhere1 = new StringBuilder();
        for (String str1 : sqlWhereList1) {
            sqlWhere1.append(str1);
        }

        boolean listBool = true;
        if (sqlWhereList.isEmpty()) {
            listBool = false;
        }

        HouseInfoKeep houseInfoKeep = new HouseInfoKeep();
        if (!sqlWhere1.toString().equals("")) {
            houseInfoKeep.setSqlWhere(sqlWhere1.toString());
            List<HouseInfoKeep> selectCustomerHouseWhere = customerService.selectCustomerHouseWhere(houseInfoKeep);

            for (HouseInfoKeep houseInfoKeep2 : selectCustomerHouseWhere) {
                if (houseInfoKeep2.getCc_id() != null) {
                    sqlWhereList.add("cc_id=" + houseInfoKeep2.getCc_id());
                }
            }
        }

        StringBuilder sqlWhere = new StringBuilder();
        if (sqlWhereList.size() > 0 && !listBool) {
            sqlWhere.append(" and (");
        }
        for (int i = 0; i < sqlWhereList.size(); i++) {
            if (i == 0) {
                sqlWhere.append(" ").append(sqlWhereList.get(i));
            } else {
                sqlWhere.append(" or ").append(sqlWhereList.get(i));
            }
        }
        if (sqlWhereList.size() > 0 && !listBool) {
            sqlWhere.append(")");
        }

        int pageSize = Integer.parseInt(AppUtil.getCookie("pageSize"));
        UserCustomer userCustomer = new UserCustomer();
        userCustomer.setSqlWhere(sqlWhere.toString());
        userCustomer.setPageNo((tableList1.getPageNo() - 1) * pageSize);
        userCustomer.setPageSize(pageSize);
        if (tableList1.getDateStart() != null && !tableList1.getDateStart().equals("")) {
            userCustomer.setDateStart(sf.parse(tableList1.getDateStart()));
        }
        if (tableList1.getDateEnd() != null && !tableList1.getDateEnd().equals("")) {
            userCustomer.setDateEnd(sf.parse(tableList1.getDateEnd()));
        }
        userCustomer.setDateTitle(tableList1.getDateType());
        List<UserCustomer> customerWheres = customerService.selectCustomerWhere(userCustomer);

        List<UserCustomer> customers = new ArrayList<>();

        Integer page = 0;
        Integer size = 0;

        for (UserCustomer userCustomer2 : customerWheres) {
            HouseInfoKeep houseInfoKeep3 = new HouseInfoKeep();
            houseInfoKeep3.setCc_id(userCustomer2.getCc_id());
            houseInfoKeep3.setCc_code(userCustomer2.getCc_code());
            List<HouseInfoKeep> selectCustomerHouseWhere2 = customerService.selectCustomerHouseWhere(houseInfoKeep3);
            StringBuilder address = new StringBuilder();
            List<String> addressList = new ArrayList<>();
            int index = 1;
            boolean bool = true;
            for (HouseInfoKeep houseInfoKeep2 : selectCustomerHouseWhere2) {
                if (index == 1) {
                    addressList.add(houseInfoKeep2.getHouse_address() + "*");
                    address.append("<i class='fa fa-home' style='text-indent: 0;'></i><a href='javascript:;' onclick='hrefClick1(this)' data-type='/houseLibrary/jumpHouseInfo?hi_code=").append(houseInfoKeep2.getHi_code()).append("'>").append(houseInfoKeep2.getHouse_address()).append("</a>");
                } else {
                    for (String anAddressList : addressList) {
                        if (anAddressList.equals(houseInfoKeep2.getHouse_address() + "*")) {
                            bool = false;
                            break;
                        }
                    }
                    if (bool) {
                        addressList.add(houseInfoKeep2.getHouse_address() + "*");
                        address.append("<i class='fa fa-home' style='text-indent: 0;'></i><a href='javascript:;' onclick='hrefClick1(this)' data-type='/houseLibrary/jumpHouseInfo?hi_code=").append(houseInfoKeep2.getHi_code()).append("'>").append(houseInfoKeep2.getHouse_address()).append("</a>");
                    }
                }
                index++;
            }

            userCustomer2.setHouse_address(address.toString());

            if (page == 0) {
                page = userCustomer2.getSize() / pageSize;
                if (userCustomer2.getSize() < 10 && userCustomer2.getSize() > 0) {
                    page = 1;
                }
                if ((userCustomer2.getSize() / pageSize) % pageSize != 0) {
                    page += 1;
                }
            }

            if (size == 0) {
                size = userCustomer2.getSize();
            }

            customers.add(userCustomer2);
        }

        DataList<UserCustomer> dataList = new DataList<>();

        // 装载数据
        map = dataList.dataList(customers, page, pageSize, size, null);

        return map;
    }

    /**
     * 添加模板
     *
     * @param userCenterMessageModel
     * @return
     * @author 陈智颖
     */
    @RequestMapping("addMessageModel")
    @ResponseBody
    public Map<String, Object> addMessageModel(UserCenterMessageModel userCenterMessageModel) {

        Map<String, Object> map = new HashMap<>();

        Date date = new Date();
        userCenterMessageModel.setMm_date(date);
        UserCenterEmployee cookieEmployee = AppUtil.getCookieEmployee();
        userCenterMessageModel.setEm_id(cookieEmployee.getEm_id());

        String type;
        Integer bool;

        if (userCenterMessageModel.getMm_id() == null) {
            bool = messageModelService.insertMessageModel(userCenterMessageModel);
            type = "insert";
        } else {
            bool = messageModelService.updateMessageModel(userCenterMessageModel);
            type = "update";
        }

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        if (bool > 0) {
            map.put("message", "success");
            map.put("em_name", cookieEmployee.getEm_name());
            map.put("date", sdf.format(date));
            map.put("mm_id", userCenterMessageModel.getMm_id());
            map.put("type", type);
        } else {
            map.put("message", "error");
        }

        return map;
    }

    /**
     * 查询短信模板
     *
     * @return
     * @author 陈智颖
     */
    @RequestMapping("messageModelList")
    @ResponseBody
    public Map<String, Object> messageModelList() {
        Map<String, Object> map = new HashMap<>();
        UserCenterMessageModel userCenterMessageContent = new UserCenterMessageModel();
        List<UserCenterMessageModel> messageModel = messageModelService.selectMessageModel(userCenterMessageContent);
        map.put("messageModel", messageModel);
        return map;
    }

    /**
     * 短信发送
     *
     * @return
     * @author 陈智颖
     */
    @RequestMapping("messageSubmit")
    @ResponseBody
    public Map<String, Object> messageSubmit(String meesageContent, String cc_code) {
        Map<String, Object> map = new HashMap<>();

        boolean bools = true;
        boolean boolSend;
        Integer bool = 0;
        Date date = new Date();
        // 获取cookie
        UserCenterEmployee cookieEmployee = AppUtil.getCookieEmployee();

        String sendPeople = meesageContent;
        if (sendPeople != null && sendPeople.contains("#sendPerson")) {
            // 发送人
            bools = false;
        }
        if (sendPeople != null && sendPeople.contains("#code")) {
            // TODO 验证码
            System.out.println(sendPeople);
        }

        if (bools) {
            String[] code = cc_code.split(",");
            StringBuilder phone = new StringBuilder();
            for (String aCode : code) {
                UserCustomer userCustomer = new UserCustomer();
                userCustomer.setCc_code(aCode);
                UserCustomer customerCode = customerService.selectCustomerCode(userCustomer);
                sendPeople = sendPeople.replace(" ", "").replaceAll("#sendPerson", customerCode.getCc_name());
                phone.append(customerCode.getCcp_phone()).append(",");
            }
            phone = new StringBuilder(phone.substring(0, phone.length() - 1));
            boolSend = SendMsg.htSendMessage(phone.toString(), sendPeople + "【管家婆】");
//			boolSend = SendMsg.sendSZB(phone, sendPeople);
            if (boolSend) {
                int i = 0;
                while (i < code.length) {
                    // 插入短信
                    UserCenterMessage userCenterMessage = new UserCenterMessage();
                    userCenterMessage.setCc_code(code[i]);
                    userCenterMessage.setUm_text(sendPeople + "【管家婆】");
                    userCenterMessage.setUm_date(date);
                    userCenterMessage.setEm_id(cookieEmployee.getEm_id());
                    bool = messageService.insertMessage(userCenterMessage);

                    // 保存客户短信记录 shenhx 20180709
                    UserCenterInformation userCenterInformation = new UserCenterInformation();
                    userCenterInformation.setMsg_content(sendPeople + "【管家婆】");
                    userCenterInformation.setSend_result(boolSend ? 1 : 0);
                    userCenterInformation.setEm_id(cookieEmployee.getEm_id());
                    userCenterInformation.setReceive_type(1);
                    userCenterInformation.setReceive_cc_code(code[i]);
                    userCenterInformation.setSend_time(new Date());
                    smsService.addUserCenterInformation(userCenterInformation);
                    i++;
                }
            }
        } else {
            String[] code = cc_code.split(",");
            for (String aCode : code) {
                UserCustomer userCustomer = new UserCustomer();
                userCustomer.setCc_code(aCode);
                UserCustomer customerCode = customerService.selectCustomerCode(userCustomer);
                sendPeople = sendPeople.replace(" ", "").replaceAll("#sendPerson", customerCode.getCc_name());
                boolSend = SendMsg.htSendMessage(customerCode.getCcp_phone(), sendPeople + "【管家婆】");
                if (boolSend) {
                    // 插入短信
                    UserCenterMessage userCenterMessage = new UserCenterMessage();
                    userCenterMessage.setCc_code(aCode);
                    userCenterMessage.setUm_text(sendPeople + "【管家婆】");
                    userCenterMessage.setUm_date(date);
                    userCenterMessage.setEm_id(cookieEmployee.getEm_id());
                    bool = messageService.insertMessage(userCenterMessage);

                    // 保存客户短信记录 shenhx 20180709
                    UserCenterInformation userCenterInformation = new UserCenterInformation();
                    userCenterInformation.setMsg_content(sendPeople + "【管家婆】");
                    userCenterInformation.setSend_result(boolSend ? 1 : 0);
                    userCenterInformation.setEm_id(cookieEmployee.getEm_id());
                    userCenterInformation.setReceive_type(1);
                    userCenterInformation.setReceive_cc_code(aCode);
                    userCenterInformation.setSend_time(new Date());
                    smsService.addUserCenterInformation(userCenterInformation);
                }
                sendPeople = meesageContent;
            }
        }

        if (bool > 0) {
            map.put("message", "success");
        } else {
            map.put("message", "error");
        }

        return map;
    }

    /**
     * 客户信息添加或者修改
     *
     * @return
     * @author 陈智颖
     */
    @RequestMapping("addCustomer")
    @ResponseBody
    public Map<String, Object> addCustomer(UserCustomer userCustomer, String frontCard, String inverseCard, String phone, String bankMessage, String phoneUser, @RequestBody Map<String, Object> data) {
        Map<String, Object> map;
        Date date = new Date();

        // 遍历客户电话
        List<UserCustomerPhone> userCustomerPhones = new ArrayList<>();
        String[] phoneList = phone.split(",");
        for (String aPhoneList : phoneList) {
            String[] phones = aPhoneList.split("-");
            UserCustomerPhone userCustomerPhone = new UserCustomerPhone();
            userCustomerPhone.setCcp_time(new Date());
            userCustomerPhone.setCcp_state(Integer.valueOf(phones[0]));
            userCustomerPhone.setCcp_phone(phones[1]);
            userCustomerPhones.add(userCustomerPhone);
        }

        // 紧急联系人
        if (!phoneUser.equals("")) {
            String[] phoneUserList = phoneUser.split("-");
            UserCustomerPhone userCustomerPhone = new UserCustomerPhone();
            userCustomerPhone.setCcp_time(new Date());
            userCustomerPhone.setCcp_state(3);
            userCustomerPhone.setCcp_phone(phoneUserList[1]);
            userCustomerPhones.add(userCustomerPhone);
        }

        // 遍历银行卡信息
        List<UserCustomerBank> userCustomerBanks = new ArrayList<>();
        if (bankMessage != null && !bankMessage.equals("")) {
            String[] bankList = bankMessage.split(",");
            for (String aBankList : bankList) {
                String[] banks = aBankList.split("\\*");
                UserCustomerBank userCustomerBank = new UserCustomerBank();
                String[] bank = banks[2].split("-");
                userCustomerBank.setCbc_type(bank[1]);
                userCustomerBank.setCbc_grade(bank[0]);
                userCustomerBank.setCbc_state(Integer.valueOf(banks[6]));
                if (banks[5] != null && !banks[5].equals("")) {
                    userCustomerBank.setCbc_path(banks[5]);
                }
                userCustomerBank.setCbc_cardNum(banks[1]);
                userCustomerBank.setCbc_time(date);
                userCustomerBank.setCbc_bankName(banks[0]);
                userCustomerBank.setCbc_address(banks[3]);
                userCustomerBank.setCbc_name(banks[4]);
                userCustomerBanks.add(userCustomerBank);
            }
        }

        // 图片
        List<UserCustomerImage> userCustomerImages = new ArrayList<>();
        if (frontCard != null && !frontCard.equals("")) {
            UserCustomerImage userCustomerImage = new UserCustomerImage();
            userCustomerImage.setCci_type("CD1");
            userCustomerImage.setCci_path(frontCard);
            userCustomerImage.setCci_time(date);
            userCustomerImages.add(userCustomerImage);
        }

        if (inverseCard != null && !inverseCard.equals("")) {
            UserCustomerImage userCustomerImage1 = new UserCustomerImage();
            userCustomerImage1.setCci_type("CD2");
            userCustomerImage1.setCci_path(inverseCard);
            userCustomerImage1.setCci_time(date);
            userCustomerImages.add(userCustomerImage1);
        }

        if (userCustomer.getCc_code() == null || userCustomer.getCc_code().equals("")) {
            String code = AppUtil.getOrderCode("CUS");
            userCustomer.setCc_code(code);
            map = customerService.insertCustomer(userCustomer, userCustomerBanks, userCustomerImages, userCustomerPhones);
        } else {
            map = customerService.updateCustomerList(userCustomer, userCustomerBanks, userCustomerImages, userCustomerPhones);
        }

        return map;
    }

    /**
     * 客户信息添加或者修改
     *
     * @return
     * @throws CoreException
     * @author 陈智颖
     */
    @RequestMapping("/saveCustomer")
    @ResponseBody
    public Map<String, Object> saveCustomer(@RequestBody Map<String, Object> data, HttpServletRequest request) throws CoreException {
        UserCenterEmployee cookieEmployee = AppUtil.getCookieEmployee();

        Map<String, Object> map = customerService.saveCustomer(data);
        // 保存客户日志
        UserCustomerLog customerLog = new UserCustomerLog();
        customerLog.setCc_code((String) map.get("cc_code"));
        customerLog.setCl_type(77);// 完善
        customerLog.setCl_content("【客户信息完善】");
        customerLog.setCl_author(cookieEmployee.getEm_id());
        customerLog.setCl_source(2);// 系统添加
        customerLog.setCl_createTime(new Date());
        customerService.addUserCustomerLog(customerLog);
        return map;
    }

    /**
     * 查询客户银行卡
     *
     * @param cc_id
     * @return
     * @作者 JiangQT
     * @日期 2016年10月9日
     */
    @RequestMapping("/queryCustomerBankCard")
    @ResponseBody
    public String queryCustomerBankCard(Integer cc_id) {
        Msg<Object> msg = new Msg<>();
        UserCustomerBank customerBank = new UserCustomerBank();
        customerBank.setCc_id(cc_id);
        List<UserCustomerBank> customerBanks = customerService.queryCustomerBankList(customerBank);
        return msg.toString(customerBanks);
    }

    /**
     * 更新客户银行卡
     *
     * @return
     * @作者 JiangQT
     * @日期 2016年10月9日
     */
    @RequestMapping("/updateCustomerBankCard")
    @ResponseBody
    public String updateCustomerBankCard(UserCustomerBank userCustomerBank) {
        Msg<Object> msg = new Msg<>();
        if (userCustomerBank == null) {
            return msg.toString(110, Msg.MSG_PARAM_ERROR);
        }
        if (StringUtils.isEmpty(userCustomerBank.getCbc_cardNum())) {
            return msg.toString(110, Msg.MSG_PARAM_ERROR);
        }
        if (userCustomerBank.getCbc_state() == 0) {
            UserCustomerBank curtomerBank = new UserCustomerBank();
            curtomerBank.setCc_id(userCustomerBank.getCc_id());
            List<UserCustomerBank> customerBanks = customerService.queryCustomerBankList(curtomerBank);
            boolean boo = true;
            for (UserCustomerBank userCustomerBank2 : customerBanks) {
                if (userCustomerBank2.getCbc_state() == 0 && !userCustomerBank2.getCbc_id().equals(userCustomerBank.getCbc_id())) {
                    boo = false;
                    break;
                }
            }
            if (!boo) {
                return msg.toString(110, "常用银行卡只能有一张");
            }
        } else {
            UserCustomerBank curtomerBank = new UserCustomerBank();
            curtomerBank.setCc_id(userCustomerBank.getCc_id());
            List<UserCustomerBank> customerBanks = customerService.queryCustomerBankList(curtomerBank);
            boolean boo = false;
            for (UserCustomerBank userCustomerBank2 : customerBanks) {
                if (userCustomerBank2.getCbc_state() == 0 && !userCustomerBank2.getCbc_id().equals(userCustomerBank.getCbc_id())) {
                    boo = true;
                    break;
                }
            }
            if (!boo) {
                return msg.toString(110, "必须要有一张常用的银行卡");
            }
        }
        boolean boo;
        if (StringUtils.isEmpty(userCustomerBank.getCbc_id())) {
            userCustomerBank.setCbc_time(new Date());
            boo = customerService.addCustomerBank(userCustomerBank);
        } else {
            boo = customerService.updateCustomerBank(userCustomerBank);
        }
        if (!boo) {
            return msg.toString(110, "添加失败，请重试");
        }
        return msg.toString();
    }

    /**
     * 根据证件号查询客户是否存在
     *
     * @param cardNum 身份证
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/customerCard")
    @ResponseBody
    public Map<String, Object> customerCard(String cardNum) {

        Map<String, Object> map = new HashMap<>();

        UserCustomer userCustomer = new UserCustomer();
        userCustomer.setCc_cardNum(cardNum);
        UserCustomer customerCard = customerService.selectCustomerCard(userCustomer);

        if (customerCard == null) {
            map.put("message", "success");
        } else {
            map.put("message", "error");
        }

        return map;
    }

    /**
     * 根据客户编码查询客户信息
     *
     * @param cc_code 客户编码
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/customerCodeUser")
    @ResponseBody
    public Map<String, Object> customerCodeUser(String cc_code) {

        Map<String, Object> map = new HashMap<>();

        UserCustomer userCustomer = new UserCustomer();
        userCustomer.setCc_code(cc_code);
        UserCustomer customerCode = customerService.selectCustomerCode(userCustomer);

        /*
         * 若UserCustomer为null，则客户为意向客户，则 查询意向客户信息
         */
        if (null == customerCode) {
            UserCustomerIntention userCustomerIntention = customerService.queryCustomerIntentionByCode(cc_code);
            map.put("userCustomerIntention", userCustomerIntention);
        } else {

            // 客户图片
            UserCustomerImage userCustomerImage = new UserCustomerImage();
            userCustomerImage.setCc_id(customerCode.getCc_id());
            List<UserCustomerImage> customerImages = customerImageService.selectCustomerImage(userCustomerImage);
            if (null != customerImages) {
                for (UserCustomerImage customerImage : customerImages) {
                    customerImage.setImg_path(OSSparameter.imagePath(customerImage.getCci_path(), null, null));
                }
            }

            // 银行卡信息
            UserCustomerBank userCustomerBank = new UserCustomerBank();
            userCustomerBank.setCc_id(customerCode.getCc_id());
            List<UserCustomerBank> customerBanks = customerService.selectCustomerBank(userCustomerBank);
            if (null != customerBanks) {
                for (UserCustomerBank customerBank : customerBanks) {
                    customerBank.setImg_path(OSSparameter.imagePath(customerBank.getCbc_path(), null, null));
                    customerBank.setBl_path(OSSparameter.imagePath(customerBank.getBl_path(), null, null));
                }
            }

            // 紧急联系人
            UserCustomerPhone userCustomerPhone = new UserCustomerPhone();
            userCustomerPhone.setCc_id(customerCode.getCc_id());
            UserCustomerPhone customerPhoneUrgent = customerPhoneService.selectCustomerPhoneUrgent(userCustomerPhone);

            // 备用联系人
            userCustomerPhone.setCc_id(customerCode.getCc_id());
            List<UserCustomerPhone> customerPhoneB = customerPhoneService.selectCustomerPhoneB(userCustomerPhone);

            // 房屋信息
            HouseInfoKeep houseInfoKeep = new HouseInfoKeep();
            houseInfoKeep.setCc_id(customerCode.getCc_id());
            houseInfoKeep.setCc_code(customerCode.getCc_code());
            List<HouseInfoKeep> customerHouse = customerService.selectCustomerHouseWhere(houseInfoKeep);

            List<UserCustomer> addressList = new ArrayList<>();
            String address = "";
            for (HouseInfoKeep houseInfoKeep2 : customerHouse) {
                UserCustomer userCustomer3 = new UserCustomer();
                userCustomer3.setContractObject_code(houseInfoKeep2.getContractObject_code());
                List<UserCustomer> customerRelationshipPersons = customerService.selectCustomerRelationshipPerson(userCustomer3);
                String frendPerson = "";
                String contractObject_type = "";
                String contractObject_No = "";
                String contractObject_State = "";
                String contractBody_StartTOEnd = "";
                StringBuilder personN = new StringBuilder();
                StringBuilder personF = new StringBuilder();
                UserCustomer userCustomer5 = new UserCustomer();
                for (UserCustomer userCustomer4 : customerRelationshipPersons) {
                    if (userCustomer4.getCrc_role() == 0) {
                        if (personN.toString().equals("") && userCustomer4.getContractObject_Type().equals("托管合同")) {
                            personN = new StringBuilder("委托人：");
                        }
                        if (personN.toString().equals("") && userCustomer4.getContractObject_Type().equals("租赁合同")) {
                            personN = new StringBuilder("承租人：");
                        }
                        if (!personN.toString().equals("")) {
                            personN.append(userCustomer4.getCc_name()).append("，");
                        }
                    } else if (userCustomer4.getCrc_role() == 1) {
                        if (personF.toString().equals("") && userCustomer4.getContractObject_Type().equals("托管合同")) {
                            personF = new StringBuilder("联系人：");
                        }
                        if (personF.toString().equals("") && userCustomer4.getContractObject_Type().equals("租赁合同")) {
                            personF = new StringBuilder("室友：");
                        }
                        if (!personF.toString().equals("")) {
                            personF.append(userCustomer4.getCc_name()).append("，");
                        }
                    }
                    frendPerson = personN.toString() + personF;
                    if (contractObject_type.equals("")) {
                        contractObject_type = userCustomer4.getContractObject_Type();
                        contractObject_No = userCustomer4.getContractObject_No();
                        switch (userCustomer4.getContractObject_State()) {
                            case 1:
                                contractObject_State = "审核中";
                                break;
                            case 2:
                                contractObject_State = "正常";
                                break;
                            case 3:
                                contractObject_State = "失效";
                                break;
                            default:
                                break;
                        }
                        contractBody_StartTOEnd = userCustomer4.getContractBody_StartTOEnd();
                    }
                }
                if (!Objects.equals(frendPerson, "")) {
                    frendPerson = frendPerson.substring(0, frendPerson.length() - 1);
                }
                userCustomer5.setCc_id(houseInfoKeep2.getCc_id());
                userCustomer5.setFrendPerson(frendPerson);
                userCustomer5.setHi_code(houseInfoKeep2.getHi_code());
                userCustomer5.setContractObject_Type(contractObject_type);
                userCustomer5.setContractObject_code(houseInfoKeep2.getContractObject_code());
                userCustomer5.setHouse_address(houseInfoKeep2.getHouse_address());
                userCustomer5.setTypeText(contractObject_State);
                userCustomer5.setContractObject_No(contractObject_No);
                userCustomer5.setContractBody_StartTOEnd(contractBody_StartTOEnd);
                addressList.add(userCustomer5);

            }
            customerCode.setHouse_address(address);

            // 客户跟进信息
            CutomerFollowUp cutomerFollowUp = new CutomerFollowUp();
            cutomerFollowUp.setCc_code(cc_code);
            List<CutomerFollowUp> cutomerFollowUps = cutomerFollowUpService.selectAllCutomerFollowUp(cutomerFollowUp);

            // 客户扩展信息
            UserCustomer userCustomer6 = new UserCustomer();
            userCustomer6.setCc_id(customerCode.getCc_id());
            userCustomer6 = customerService.queryCustomerExtendInfoById(userCustomer6);

            // 客户其他证件信息
            UserCustomerID userCustomerID = new UserCustomerID();
            userCustomerID.setCc_id(customerCode.getCc_id());
            List<UserCustomerID> userCustomerIDList = customerService.queryCustomerIDInfoById(userCustomerID);

            // 客户联系人信息
            UserCustomerLinkMan userCustomerLinkMan = new UserCustomerLinkMan();
            userCustomerLinkMan.setCc_id(customerCode.getCc_id());
            List<UserCustomerLinkMan> userCustomerLinkManList = customerService.queryCustomerLinkManInfoById(userCustomerLinkMan);

            //

            map.put("customerCode", customerCode);
            map.put("cutomerFollowUps", cutomerFollowUps);
            map.put("customerPhoneB", customerPhoneB);
            map.put("customerImages", customerImages);
            map.put("customerBanks", customerBanks);
            map.put("customerPhoneUrgent", customerPhoneUrgent);
            map.put("addressList", addressList);
            map.put("customerExtend", userCustomer6);
            map.put("userCustomerIDList", userCustomerIDList);
            map.put("userCustomerLinkManList", userCustomerLinkManList);
        }
        // 查询推荐群体
        List<HoseRecommendGroup> ru = hoseRecommendGroupService.selectHoseRecommendGroupList();
        List<HouseInformationState> hb = houseInformationStateService.selectHouseInformationStateSpid();

        map.put("ru", ru);
        map.put("hb", hb);

        return map;
    }

    /**
     * 查询用户认证列表
     *
     * @return
     * @throws ParseException
     * @author JiangQT
     */
    @RequestMapping("queryUserAuthList")
    @ResponseBody
    public Map<String, Object> queryUserAuthList(HttpServletResponse response, TableList tableList1) throws ParseException {
        // 初始化获取对象
        TableList tableList = tableList1.initData(tableList1);
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");

        PageModel<ViewUserAuthListVo> pageModel1 = new PageModel<>();

        if (tableList.getDateStart() != null && !tableList.getDateStart().equals("")) {
            pageModel1.setDateStart(sf.parse(tableList.getDateStart()));
        }
        if (tableList.getDateEnd() != null && !tableList.getDateEnd().equals("")) {
            pageModel1.setDateEnd(sf.parse(tableList.getDateEnd()));
        }
        pageModel1.setSqlWhere(tableList.getSqlWhere());

        pageModel1.setDateTitle(tableList.getDateType());

        if (tableList.getOrderBy() != null && !tableList.getOrderBy().equals("")) {
            pageModel1.setSqlOrderBy("order by " + tableList.getOrderBy() + " asc");
        } else {
            pageModel1.setSqlOrderBy("");
        }
        // 装载数据类
        DataList<ViewUserAuthListVo> datalist = new DataList<>();
        int pageSize = Integer.parseInt(AppUtil.getCookie("pageSize"));
        pageModel1.setPageNo((tableList.getPageNo() - 1) * pageSize);
        // 分页设置查询条数
        pageModel1.setPageSize(pageSize);
        // 查询分页实体
        PageModel<ViewUserAuthListVo> pageModel = userService.queryUserAuthViewList(pageModel1);
        // 处理特殊数据
        List<ViewUserAuthListVo> list = new ArrayList<>();
        for (ViewUserAuthListVo viewUserAuthListVo : pageModel.getList()) {
            viewUserAuthListVo.setUser_nickName("/" + viewUserAuthListVo.getUser_nickName());
            list.add(viewUserAuthListVo);
        }
        // 装载数据
        return datalist.dataList(list, tableList.getPageNo(), pageSize, pageModel.getTotalRecords(), pageModel.getSumMoney());
    }

    /**
     * 提交用户认证审核
     *
     * @param auth
     * @param content
     * @param user_realName
     * @param user_cardNumber
     * @param userVerify_id
     * @param user_id
     * @param userVerify_cardPicPath1
     * @param userVerify_cardPicPath2
     * @param user_phone
     * @return
     * @author JiangQT
     */
    @RequestMapping("submitAuthResult")
    @ResponseBody
    public String submitAuthResult(String auth, String content, String user_realName, String user_cardNumber, Integer userVerify_id, Integer user_id,
                                   String userVerify_cardPicPath1, String userVerify_cardPicPath2, Integer contractSign_Id, String user_phone) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(auth) || StringUtils.isEmpty(user_realName) || StringUtils.isEmpty(user_cardNumber) || StringUtils.isEmpty(user_id)
                || StringUtils.isEmpty(userVerify_id)) {
            msg.setCode(110);
            msg.setMsg("参数错误");
            return msg.toString();
        }
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            msg.setCode(110);
            msg.setMsg("登录身份过期，请重新登录");
            return msg.toString();
        }
        if ("认证成功".equals(auth)) {
            // 更新用户认证信息
            UserCenterUserExtendVerifyAuth userExtendVerifyAuth = new UserCenterUserExtendVerifyAuth();
            userExtendVerifyAuth.setUserVerify_id(userVerify_id);
            userExtendVerifyAuth.setUserVerify_cardUserName(user_realName);
            userExtendVerifyAuth.setUserVerify_cardPicPath1(userVerify_cardPicPath1);
            userExtendVerifyAuth.setUserVerify_cardPicPath2(userVerify_cardPicPath2);
            userExtendVerifyAuth.setUserVerify_authTime(new Date());
            userExtendVerifyAuth.setUserVerify_remark(content);
            userExtendVerifyAuth.setUserVerify_state(auth);
            boolean b2 = userService.updateUserAuthInfo(userExtendVerifyAuth);
            // 更新用户信息
            UserCenterUserVo userCenterUserVo = new UserCenterUserVo();
            userCenterUserVo.setUser_id(user_id);
            userCenterUserVo.setUser_realName(user_realName);
            userCenterUserVo.setUser_cardNumber(user_cardNumber);
            boolean b1 = userService.updateUserInfo(userCenterUserVo);
            // 添加客户信息
//            if (StringUtils.isEmpty(contractSign_Id)) {
//
//            }
            if (!(b1 && b2)) {
                msg.setCode(110);
                msg.setMsg("提交失败");
                return msg.toString();
            }
        } else {
            // 更新用户认证信息
            UserCenterUserExtendVerifyAuth userExtendVerifyAuth = new UserCenterUserExtendVerifyAuth();
            userExtendVerifyAuth.setUserVerify_id(userVerify_id);
            userExtendVerifyAuth.setUserVerify_authTime(new Date());
            userExtendVerifyAuth.setUserVerify_remark(content);
            userExtendVerifyAuth.setUserVerify_state(auth);
            boolean b2 = userService.updateUserAuthInfo(userExtendVerifyAuth);
            if (!b2) {
                msg.setCode(110);
                msg.setMsg("提交失败");
                return msg.toString();
            }
        }
        msg.setMsg("审核成功");
        return msg.toString();
    }

    /**
     * 更新客户图片
     *
     * @return
     * @作者 JiangQT
     * @日期 2016年9月1日
     */
    @RequestMapping("/updateCustomerImage")
    @ResponseBody
    public String updateCustomerImage(Integer id, String path) {
        Msg<Object> msg = new Msg<>();
        UserCustomerImage customerImage = new UserCustomerImage();
        customerImage.setCc_id(id);
        customerImage.setCci_path(path);
        customerImage.setCci_state(0);
        customerImage.setCci_type("CD");
        customerImage.setCci_time(new Date());
        customerService.addCustomerImage(customerImage);
        return msg.toString();
    }

    // ==================上传=================== //

    /**
     * 图片上传
     *
     * @param request
     * @param type    图片类型
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/imageUpload", produces = "text/json;charset=UTF-8")
    @ResponseBody
    public String imageUpload(MultipartHttpServletRequest request, String type) throws Exception {
        /*Msg<Object> msg = new Msg<>();
        List<MultipartFile> files = request.getFiles("file");
        String realPath = request.getSession().getServletContext().getRealPath("/resources/contractImage/");
        // 创建文件夹
        File upFile = new File(realPath);
        if (!upFile.exists()) {
            upFile.mkdirs();
        }
        for (MultipartFile file : files) {
            if (file.getSize() > 1000 * 1024 * 20) {
                return msg.toString(110, "图片大小不得超过20M");
            }
            // 获取图片名称
            String imageName = AppUtil.getImageName(type, file);
            File outFile = new File(realPath + imageName);
            // 如果图片大于1M就进行压缩
            if (file.getSize() <= 1000 * 400) {
                file.transferTo(outFile);
            } else {
                CommonsMultipartFile cf = (CommonsMultipartFile) file;
                DiskFileItem fi = (DiskFileItem) cf.getFileItem();
                File inFile = fi.getStoreLocation();
                ImageUtil.saveMinPhoto(inFile.toString(), outFile.toString(), 1920, 0.9d);
            }
            // FTP文件上传，并返回图片路径
            msg.setData(FtpUtil.getInstance("customer").upload(imageName, new FileInputStream(outFile)));
        }
        return msg.toString();*/

        Msg<Object> msg = new Msg<>();
        Properties propertiesOSS = PropertiesUtil.getProperties("/conf/oss.properties");
        type = StringUtils.isEmpty(type) ? "temp" : type;
        for (MultipartFile file : request.getFileMap().values()) {
            try {
                String key;
                switch (type) {
                    case "temp":
                        key = AliOSS.upload(propertiesOSS.getProperty("folder.temp"), file.getOriginalFilename(), file.getInputStream());
                        break;
                    case "HTZ":
                    case "contract":
                        key = AliOSS.upload(propertiesOSS.getProperty("folder.contractImage"), file.getOriginalFilename(), file.getInputStream());
                        break;
                    case "customer":
                        key = AliOSS.upload(propertiesOSS.getProperty("folder.customerImage"), file.getOriginalFilename(), file.getInputStream());
                        break;
                    case "house":
                        key = AliOSS.upload(propertiesOSS.getProperty("folder.houseImage"), file.getOriginalFilename(), file.getInputStream());
                        break;
                    case "maintenance":
                        key = AliOSS.upload(propertiesOSS.getProperty("folder.maintenanceImage"), file.getOriginalFilename(), file.getInputStream());
                        break;
                    default:
                        key = AliOSS.upload(propertiesOSS.getProperty("folder.temp"), file.getOriginalFilename(), file.getInputStream());
                        break;
                }
                URL url = AliOSS.getUrl(key);
                msg.put("code", 200);
                msg.put("key", key);
                msg.put("url", url.toString());
                msg.put("name", file.getOriginalFilename());
                msg.put("size", file.getSize());
                msg.put("type", file.getContentType());
            } catch (Exception ignored) {
            }
        }
        return msg.toString();
    }

    /**
     * 删除图片
     *
     * @param id 用户编号
     * @return
     * @throws IOException
     */
    @RequestMapping("/deleteImage")
    public @ResponseBody
    String deleteImage(Integer id, String imgUrl) throws IOException {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(imgUrl)) {
            return msg.toString(110, Msg.MSG_PARAM_ERROR);
        }
        /*// 获取properties路劲
        String path = this.getClass().getResource("/conf/path.properties").getPath();
        // 把properties文件转化输出流
        InputStream in = new BufferedInputStream(new FileInputStream(path));
        Properties properties = new Properties();
        properties.load(in);
        String paths = properties.getProperty("contractPaths");
        String addrs = properties.getProperty("contractAddrs");
        int ports = Integer.parseInt(properties.getProperty("contractPorts"));
        String usernames = properties.getProperty("contractUsernames");
        String passwords = properties.getProperty("contractPasswords");
        boolean boo = URLUploadImage.deletePro(paths, addrs, ports, usernames, passwords, imgUrl);

        UserCustomerImage customerImage = new UserCustomerImage();
        customerImage.setCci_path(imgUrl);
        List<UserCustomerImage> selectCustomerImage = customerImageService.selectCustomerImage(customerImage);
        for (UserCustomerImage userCustomerImage : selectCustomerImage) {
            customerImageService.deleteCustomerImage(userCustomerImage);
        }*/
        try {
            OSSparameter.removeFile(imgUrl);
            msg.toString(200, "删除成功");
        } catch (Exception e) {
            return msg.toString(110, "删除失败");
        }

        return msg.toString();
    }

    /*********APP客户*********/
    @RequestMapping("/userPerson")
    public String userPerson() {
        return "/appPage/userPerson";
    }

    /**
     * 查询客户列表
     *
     * @param start
     * @param sqlWhere
     * @return
     * @author 陈智颖
     * @date Mar 29, 2017 10:01:23 AM
     */
    @RequestMapping("/userPersonList")
    public @ResponseBody
    Map<String, Object> userPersonList(Integer start, String sqlWhere, String cc_type) {
        Map<String, Object> map = new HashMap<>();
        UserCustomer userCustomer = new UserCustomer();
        userCustomer.setSqlWhere(sqlWhere);
        userCustomer.setStart(start);
        userCustomer.setCc_type(cc_type);
        userCustomer.setEnd(10);
        List<UserCustomer> customerPerson = customerService.queryCustomerPerson(userCustomer);
        UserCustomer size = customerService.queryCustomerPersonCount(userCustomer);
        map.put("customerPerson", customerPerson);
        map.put("size", size.getSize());
        return map;
    }

    /**
     * 客户是否存在
     *
     * @param ccp_phone
     * @return
     * @author 陈智颖
     * @date Apr 9, 2017 5:07:57 PM
     */
    @RequestMapping("/customerControllerBool")
    public @ResponseBody
    Map<String, Object> customerControllerBool(String ccp_phone, String cc_cardNum) {
        Map<String, Object> map = new HashMap<>();
        UserCustomer customer = new UserCustomer();
        if (ccp_phone != null) {
            customer.setCcp_phone(ccp_phone);
            customer = customerService.selectCustomerOne(customer);
        } else {
            customer.setCc_cardNum(cc_cardNum);
            customer = customerService.selectCustomerOneNum(customer);
        }
        map.put("customer", customer);
        return map;
    }

    /**
     * 用户插入
     *
     * @return
     * @throws Exception
     * @author 陈智颖
     * @date May 17, 2017 10:19:15 AM
     */
    @RequestMapping("/customerIDCard")
    public @ResponseBody
    Map<String, Object> customerAdd(MultipartHttpServletRequest request, String name, String sex, String idCard, String address, String dates) throws Exception {
        Map<String, Object> map = new HashMap<>();
        String realPath = request.getSession().getServletContext().getRealPath("/resources/contractImage/");
        // 创建文件夹
        File upFile = new File(realPath);
        if (!upFile.exists()) {
            upFile.mkdirs();
        }
        // 身份证正面
        String imagez = "";
        // 身份证反面
        String imagef = "";
        for (MultipartFile file : request.getFiles("imagez")) {
            if (file.getSize() > 1000 * 1024 * 20) {
                map.put("message", "图片大小不得超过20M");
                return map;
            }
            File outFile = new File(realPath + AppUtil.getOrderCode("IMAGE") + ".png");
            // 文件类型

            String fileType = "png";
            if (file.getOriginalFilename().contains("\\.")) {
                fileType = file.getOriginalFilename().split("\\.")[1];
            }
            // 图片匹配类型
            if (file.getContentType().contains("image")) {
                // 如果图片大于1M就进行压缩
                if (file.getSize() <= 1000 * 400) {
                    file.transferTo(outFile);
                } else {
                    CommonsMultipartFile cf = (CommonsMultipartFile) file;
                    DiskFileItem fi = (DiskFileItem) cf.getFileItem();
                    File inFile = fi.getStoreLocation();
                    double comBase = 1920;
                    double scale = 0.8d;
                    ImageUtil.saveMinPhoto(inFile.toString(), outFile.toString(), comBase, scale);
                }

                // 文件流
                InputStream input = new FileInputStream(outFile);
                // 文件名称
                String fileName = AppUtil.buildFileName("IDCard", fileType);
                // FTP文件上传
                imagez = FtpUtil.getInstance("contract").upload(fileName, input);
                // 删除临时文件
                outFile.delete();
            } else {
                if (!outFile.exists()) {
                    file.transferTo(outFile);
                }
            }
        }
        for (MultipartFile file : request.getFiles("imagef")) {
            if (file.getSize() > 1000 * 1024 * 20) {
                map.put("message", "图片大小不得超过20M");
                return map;
            }
            File outFile = new File(realPath + AppUtil.getOrderCode("IMAGE") + ".png");
            // 文件类型

            String fileType = "png";
            if (file.getOriginalFilename().contains("\\.")) {
                fileType = file.getOriginalFilename().split("\\.")[1];
            }
            // 图片匹配类型
            if (file.getContentType().contains("image")) {
                // 如果图片大于1M就进行压缩
                if (file.getSize() <= 1000 * 400) {
                    file.transferTo(outFile);
                } else {
                    CommonsMultipartFile cf = (CommonsMultipartFile) file;
                    DiskFileItem fi = (DiskFileItem) cf.getFileItem();
                    File inFile = fi.getStoreLocation();
                    double comBase = 1920;
                    double scale = 0.8d;
                    ImageUtil.saveMinPhoto(inFile.toString(), outFile.toString(), comBase, scale);
                }

                // 文件流
                InputStream input = new FileInputStream(outFile);
                // 文件名称
                String fileName = AppUtil.buildFileName("IDCard", fileType);
                // FTP文件上传
                imagef = FtpUtil.getInstance("contract").upload(fileName, input);
                // 删除临时文件
                outFile.delete();
            } else {
                if (!outFile.exists()) {
                    file.transferTo(outFile);
                }
            }
        }
        Boolean bool = customerService.insertIDCardCustomer(imagez, imagef, name, sex, idCard, address, dates);
        if (bool) {
            map.put("message", "success");
        } else {
            map.put("message", "error");
        }
        return map;
    }

    /**
     * 保存意向客户信息
     *
     * @return
     * @throws IOException
     */
    @RequestMapping("saveCustomerIntention")
    public @ResponseBody
    Map<String, Object> saveCustomerIntention(@RequestBody Map<String, Object> data) {
        UserCustomerIntention userCustomerIntention = JSONObject.parseObject((String) data.get("UserCustomerIntention"), UserCustomerIntention.class);
        Map<String, Object> map = new HashMap<>();
        UserCenterEmployee cookieEmployee = AppUtil.getCookieEmployee();

        if (!StringUtils.isEmpty(userCustomerIntention.getCc_cardNum())) {

            UserCustomer usercust = new UserCustomer();
            usercust.setCc_cardNum(userCustomerIntention.getCc_cardNum());
            usercust = customerService.selectCustomerCard(usercust);
            if (null != usercust) {

                userCustomerIntention.setCc_code2(usercust.getCc_code());
            }
        }

        int result;
        Integer cc_id = userCustomerIntention.getCc_id();
        if (null == cc_id) {

            String code = AppUtil.getOrderCode("CUS");
            userCustomerIntention.setCc_code(code);
            userCustomerIntention.setFollow_status(1);// 预约
            userCustomerIntention.setCc_em_id(cookieEmployee.getEm_id());
            userCustomerIntention.setContact_time(new Date());
            result = customerService.addCustomerIntention(userCustomerIntention);

            // 保存客户日志
            UserCustomerLog customerLog = new UserCustomerLog();
            customerLog.setCc_code(userCustomerIntention.getCc_code());
            customerLog.setCl_type(75);// 预约
            customerLog.setCl_content(userCustomerIntention.getCustomer_need());
            customerLog.setCl_author(cookieEmployee.getEm_id());
            customerLog.setCl_source(2);// 系统添加
            customerLog.setCl_createTime(new Date());
            customerService.addUserCustomerLog(customerLog);
        } else {
            // 更新客户意向信息
            result = customerService.updCustomerIntention(userCustomerIntention);
        }

        map.put("result", result > 0 ? "success" : "error");
        return map;
    }

    /**
     * 显示客户列表信息
     *
     * @return
     * @throws ParseException
     * @author shenhx
     */
    @RequestMapping("queryCustomerIntention")
    public @ResponseBody
    Map<String, Object> queryCustomerIntention(TableList tableList, String param, Integer isFixSize) throws ParseException {

        Msg<Object> msg = new Msg<>();
        Integer pageSize = 10;
        if (null != AppUtil.getCookie("pageSize")) {

            pageSize = Integer.valueOf(AppUtil.getCookie("pageSize"));
        }
        tableList.initData();
        if (null != param && !"".equals(param)) {

            String sqlWhere = "AND (cc_name LIKE '%" + param + "%' OR ccp_phone LIKE '%" + param + "%' OR cc_cardNum LIKE '%" + param + "%')";
            tableList.setSqlWhere(sqlWhere);
        }
        Integer pageNo = tableList.getPageNo();
        Pagination<UserCustomerIntention> paginatigon = customerService.queryCustomerIntention(new Pagination<>(pageNo, isFixSize == null ? 8 : pageSize, tableList));
        return msg.toMap(paginatigon);
    }

    /**
     * 【客户日志】查询客户日志类型
     *
     * @return
     * @作者 shenhx
     * @日期 2017年06月12日
     */
    @RequestMapping("/queryCustomerLogType")
    public @ResponseBody
    String queryCustomerLogType() {
        Msg<Object> msg = new Msg<>();
        HashMap<String, Object> map = new HashMap<>();

        List<UserCenterType> userLogType = customerService.queryUserCenterTypeList(74);// 日志类型
        map.put("userLogType", userLogType);

        return msg.toString(map);
    }

    /**
     * 【客户日志】查询客户日志类型
     *
     * @param
     * @param pageNo
     * @param pageSize
     * @return
     * @作者 shenhx
     * @日期 2017年06月12日
     */
    @RequestMapping("/queryCustomerLogList")
    public @ResponseBody
    String queryCustomerLogList(Integer pageNo, Integer pageSize, String cc_code, Integer cl_type) {
        Msg<Object> msg = new Msg<>();

        UserCustomerLog t = new UserCustomerLog();
        t.setCc_code(cc_code);
        t.setCl_type(cl_type);
        Pagination<UserCustomerLog> pagination = new Pagination<>(pageNo, pageSize, t);
        List<UserCustomerLog> userCustomerLogList = customerService.queryUserCustomerLogList(pagination);

        if (null != userCustomerLogList && !userCustomerLogList.isEmpty()) {
            for (UserCustomerLog userCustomerLog : userCustomerLogList) {
                UserCustomerLogAttachment logAttachment = new UserCustomerLogAttachment();
                logAttachment.setCl_id(userCustomerLog.getCl_id());
                List<UserCustomerLogAttachment> userCustomerLogAttachmentList = customerService.queryLogAttachmentListByClId(logAttachment);
                if (null != userCustomerLogAttachmentList && !userCustomerLogAttachmentList.isEmpty()) {
                    userCustomerLog.setUserCustomerLogAttachmentList(userCustomerLogAttachmentList);
                }
            }
        }

        int totalRecords = customerService.queryUserCustomerLogListCount(pagination);
        pagination.setList(userCustomerLogList, totalRecords);

        return msg.toString(pagination);
    }

    /**
     * 【客户日志】添加客户日志（执行记录）
     *
     * @param data
     * @return
     * @作者 shenhx
     * @日期 2017年06月13日
     */
    @RequestMapping("/addUserCustomerLog")
    public @ResponseBody
    String addUserCustomerLog(@RequestBody Map<String, Object> data) {
        Msg<Object> msg = new Msg<>();
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            return msg.toError(Msg.MSG_LOGIN_ERROR);
        }

        // 保存客户日志
        UserCustomerLog userCustomerLog = JSONObject.parseObject((String) data.get("userCustomerLog"), UserCustomerLog.class);
        userCustomerLog.setCl_author(employee.getEm_id());
        userCustomerLog.setCl_createTime(new Date());
        userCustomerLog.setCl_source(1);// 手动添加
        customerService.addUserCustomerLog(userCustomerLog);

        List<UserCustomerLogAttachment> userCustomerLogAttachmentList = JSONObject.parseArray((String) data.get("userCustomerLogAttachmentList"), UserCustomerLogAttachment.class);
        Integer cl_id = userCustomerLog.getCl_id();
        customerService.delLogAttachmentListByClId(cl_id);
        if (null != userCustomerLogAttachmentList && !userCustomerLogAttachmentList.isEmpty()) {
            for (UserCustomerLogAttachment userCustomerLogAttachment : userCustomerLogAttachmentList) {
                userCustomerLogAttachment.setCl_id(cl_id);
                userCustomerLogAttachment.setCa_status(1);// 有效
                userCustomerLogAttachment.setCa_createTime(new Date());
                customerService.addUserCustomerLogAttachment(userCustomerLogAttachment);
            }
        }

        return msg.toString();
    }

    /**
     * 预约客户跟进
     *
     * @return
     * @author shenhx
     */
    @RequestMapping("/customerIntentionFollow")
    public ModelAndView customerIntentionEdit(Integer ci_id) {
        ModelAndView view = new ModelAndView("/customer/customerIntentionFollow");
        UserCustomerIntention userCustomerIntention = customerService.queryCustomerIntentionById(ci_id);

        view.addObject("userCustomerIntention", userCustomerIntention);
        view.addObject("sex", "0".equals(userCustomerIntention.getCc_sex()) ? "女" : "男");
        view.addObject("customerType", "1".equals(userCustomerIntention.getCc_type()) ? "意向房东" : "意向租客");
        view.addObject("time", new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(userCustomerIntention.getContact_time()));
        return view;
    }

    /**
     * 查询客户带看记录
     *
     * @param pageNo
     * @param pageSize
     * @param cc_code
     * @return
     */
    @RequestMapping("/queryHouseSeeingListByCode")
    @ResponseBody
    public String queryHouseSeeingListByCode(Integer pageNo, Integer pageSize, String cc_code) {
        Msg<Object> msg = new Msg<>();
        CustomerStayThingVo t = new CustomerStayThingVo();
        t.setCc_code(cc_code);

        Pagination<CustomerStayThingVo> pagination = new Pagination<>(pageNo, pageSize, t);
        List<CustomerStayThingVo> userCustomerLogList = customerService.queryHouseSeeingListByCode(pagination);

        int totalRecords = customerService.queryHouseSeeingListByCodeCount(pagination);
        pagination.setList(userCustomerLogList, totalRecords);

        return msg.toString(pagination);
    }

    /**
     * 支付成功后，更新客户最新带看记录
     *
     * @return
     */
    @RequestMapping("/updHouseSeeingRecordByCode")
    @ResponseBody
    public String updHouseSeeingRecordByCode(String cc_code) {
        Msg<Object> msg = new Msg<>();
        customerService.updHouseSeeingRecordByCode(cc_code);
        return msg.toString();
    }

    /**
     * 【客户日志】添加客户日志（执行记录）
     *
     * @return
     * @作者 shenhx
     * @日期 2017年06月13日
     */
    @RequestMapping("/updCustomerExtendInfo")
    @ResponseBody
    public String updCustomerExtendInfo(String cc_code, float star_level, String customer_comment) {
        Msg<Object> msg = new Msg<>();
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            return msg.toError(Msg.MSG_LOGIN_ERROR);
        }
        UserCustomer customer = new UserCustomer();
        customer.setCc_code(cc_code);
        customer = customerService.selectCustomerCode(customer);
        if (null != customer) {

            UserCustomer userCustomer = new UserCustomer();
            userCustomer.setCc_code(cc_code);
            userCustomer.setStar_level(star_level);
            userCustomer.setCustomer_comment(customer_comment);
            userCustomer.setUpdate_time(new Date());
            int reuslt = customerService.updCustomerExtendInfo(userCustomer);
            customerService.queryCustomerExtendInfoById(userCustomer);
            // 保存客户日志
            UserCustomerLog customerLog = new UserCustomerLog();
            customerLog.setCc_code(cc_code);
            customerLog.setCl_type(78);// 评价
            customerLog.setCl_content("对客户的评论，星评等级为" + star_level + "星");
            customerLog.setCl_author(employee.getEm_id());
            customerLog.setCl_source(2);// 系统添加
            customerLog.setCl_createTime(new Date());
            customerService.addUserCustomerLog(customerLog);
            msg.setMsg(reuslt > 0 ? "success" : "fail");
        } else {
            msg.setMsg(100, "非正式客户，无法进行评价。");
        }

        return msg.toString();
    }

    /**
     * 显示客户列表信息
     *
     * @return
     * @throws ParseException
     * @author shenhx
     */
    @RequestMapping("queryCustomerBlackList")
    @ResponseBody
    public Map<String, Object> queryCustomerBlackList(TableList tableList) throws ParseException {

        Msg<Object> msg = new Msg<>();
        tableList = tableList.initData(tableList);
        Integer pageSize = Integer.valueOf(AppUtil.getCookie("pageSize"));
        Integer pageNo = tableList.getPageNo();
        tableList.initData();
        Pagination<UserCustomerBlackList> pagination = customerService.queryCustomerBlackList(new Pagination<>(pageNo, pageSize, tableList));
        return msg.toMap(pagination);
    }

    /**
     * 【客户日志】添加客户日志（执行记录）
     *
     * @param data
     * @return
     * @作者 shenhx
     * @日期 2017年06月13日
     */
    @RequestMapping("/saveCustomerBlackList")
    @ResponseBody
    public String saveCustomerBlackList(@RequestBody Map<String, Object> data) {
        Msg<Object> msg = new Msg<>();
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            return msg.toError(Msg.MSG_LOGIN_ERROR);
        }

        UserCustomerBlackList customerBlackList = JSONObject.parseObject((String) data.get("UserCustomerBlackList"), UserCustomerBlackList.class);
        Integer bl_id = customerBlackList.getBl_id();
        if (null == bl_id) {
            customerBlackList.setEm_id(employee.getEm_id());
            customerBlackList.setBl_date(new Date());
            int result = customerService.addCustomerBlackList(customerBlackList);
            msg.setMsg(result > 0 ? "success" : "fail");
        } else {
            int result = customerService.updCustomerBlackList(customerBlackList);
            msg.setMsg(result > 0 ? "success" : "fail");
        }
        return msg.toString();
    }

    /**
     * 更新意向客户状态
     *
     * @param cc_code
     * @param follow_status
     * @return
     */
    @RequestMapping("/updCustomerIntentionByCode")
    @ResponseBody
    public String updCustomerIntentionByCode(String cc_code, Integer follow_status) {
        Msg<Object> msg = new Msg<>();
        UserCustomerIntention userCustomerIntention = new UserCustomerIntention();
        userCustomerIntention.setCc_code(cc_code);
        userCustomerIntention.setFollow_status(follow_status);
        int result = customerService.updCustomerIntentionByCode(userCustomerIntention);
        msg.setMsg(result > 0 ? "success" : "fail");
        return msg.toString();
    }

    /**
     * 黑名单检查
     *
     * @return
     * @throws ParseException
     * @author shenhx
     */
    @RequestMapping("checkBlackList")
    @ResponseBody
    public Map<String, Object> checkBlackList(String cc_code) throws ParseException {
        Map<String, Object> map = new HashMap<>();
        UserCustomerIntention customerIntention = customerService.queryCustomerIntentionByCode(cc_code);
        if (null != customerIntention) {
            UserCustomerBlackList userCustomerBlackList = new UserCustomerBlackList();
            userCustomerBlackList.setCc_cardNum(customerIntention.getCc_cardNum());
            userCustomerBlackList.setCc_phone(customerIntention.getCcp_phone());
            map.put("isBlack", customerService.checkBlackList(userCustomerBlackList));
        }
        return map;
    }

    /**
     * 根据证件号码，手机号检索黑名单
     *
     * @return
     * @throws ParseException
     * @author shenhx
     */
    @RequestMapping("checkBlackListByCardNumPhone")
    public @ResponseBody
    Map<String, Object> checkBlackListByCardNumPhone(String cc_cardNum, String phone) throws ParseException {
        Map<String, Object> map = new HashMap<>();
        UserCustomerBlackList userCustomerBlackList = new UserCustomerBlackList();
        userCustomerBlackList.setCc_cardNum(cc_cardNum);
        userCustomerBlackList.setCc_phone(phone);
        map.put("isBlack", customerService.checkBlackList(userCustomerBlackList));
        return map;
    }

    /**
     * 添加带看信息
     *
     * @param cc_code
     * @param cc_name
     * @param ccp_phone
     * @param hs_content
     * @param hs_state
     * @return
     * @author shenhx
     */
    @RequestMapping("/addHouseSeeing")
    public @ResponseBody
    Map<String, Object> addHouseSeeing(String cc_code, String cc_name, String ccp_phone, String hs_content, Integer hs_state, Integer em_id, String hi_code, String hs_payType, Integer hs_day, String hs_contractDay) {
        Map<String, Object> map = new HashMap<>();
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        // 2.添加带看信息
        HouseSeeing houseSeeing = new HouseSeeing();
        houseSeeing.setCc_code(cc_code);
        houseSeeing.setEm_id(employee.getEm_id());
        houseSeeing.setHi_code(hi_code);
        houseSeeing.setHs_payType(hs_payType);
        houseSeeing.setHs_day(hs_day);
        houseSeeing.setHs_contractDay(hs_contractDay);
        houseSeeing.setHs_state(hs_state);
        List<HouseSeeing> queryHouseSeeingList = houseSeeingService.queryHouseSeeingList(houseSeeing);
        if (queryHouseSeeingList.isEmpty()) {
            houseSeeing.setHs_content(hs_content);
            houseSeeing.setHs_createTime(new Date());
            this.houseSeeingService.addHouseSeeing(houseSeeing);
            if (hs_content.contains("签订合同")) {
                HouseInfoKeep houseInfoKeep = new HouseInfoKeep();
                houseInfoKeep.setHi_code(hi_code);
                houseInfoKeep.setHi_isForRent(AppConfig.hi_isForRent_2);
                // houseInfoKeep.setHi_forRentState(AppConfig.hi_forRentState_2000);
                houseLibraryService.updateHouseInfos(houseInfoKeep);

                BillRelatedOrderVo billRelatedOrderVo = new BillRelatedOrderVo();
                billRelatedOrderVo.setHi_code(hi_code);
                billRelatedOrderVo.setRo_payState(3);
                financeManageService.updateRelatedOrderState(billRelatedOrderVo);
            }
            map.put("msg", "success");
        }

        if (hs_state == 1) {// 带看成功，将意向客户存入正式表
            UserCustomerIntention userCustomerIntention = customerService.queryCustomerIntentionByCode(cc_code);
            // 【查询客户数据】
            UserCustomer customer = new UserCustomer();
            if (AppUtil.isNotNull(userCustomerIntention.getCc_cardNum())) {
                customer.setCc_cardNum(userCustomerIntention.getCc_cardNum());
                customer = customerService.queryCustomerInfo(customer);
            } else {
                customer = null;
            }
            if (null == customer) {

                UserCustomer userCustomer = new UserCustomer();
                userCustomer.setCc_code(cc_code);
                userCustomer.setCc_name(cc_name);
                userCustomer.setCc_type("租客");
                userCustomer.setCcp_phone(ccp_phone);
                userCustomer.setCc_sex(Integer.parseInt(userCustomerIntention.getCc_sex()));
                userCustomer.setCc_cardType(userCustomerIntention.getCc_cardType());
                userCustomer.setCc_cardNum(userCustomerIntention.getCc_cardNum());
                userCustomer.setCc_state(1);// 正式客户
                customerService.addCustomer(userCustomer);

                UserCustomerPhone userCustomerPhone = new UserCustomerPhone();
                userCustomerPhone.setCc_id(userCustomer.getCc_id());
                userCustomerPhone.setCcp_phone(ccp_phone);
                userCustomerPhone.setCcp_state(1);// 正在使用
                userCustomerPhone.setCcp_time(new Date());
                customerService.addCustomerPhone(userCustomerPhone);
            }
        }

        // 保存客户日志
        UserCustomerLog customerLog = new UserCustomerLog();
        customerLog.setCc_code(cc_code);
        customerLog.setCl_type(79);// 带看
        customerLog.setCl_content("【客户带看，签订合同】");
        customerLog.setCl_author(em_id);
        customerLog.setCl_source(2);// 系统添加
        customerLog.setCl_createTime(new Date());
        customerService.addUserCustomerLog(customerLog);
        return map;
    }

    /**
     * 添加客户带看跟进
     *
     * @param data
     * @return
     */
    @RequestMapping(method = RequestMethod.POST, value = "/addCustomerFollow")
    @ResponseBody
    public String addCustomerFollow(String data) {
        Msg<Object> msg = new Msg<>();
        try {
            if (StringUtils.isEmpty(data)) {
                return msg.toError(Msg.MSG_PARAM_ERROR);
            }
            JSONObject json = JSONObject.parseObject(data);
            json.put("channel", "pc".equals(json.getString("source")) ? AppConfig.bs_source_erp_pc : AppConfig.bs_source_erp_app);
            // 经办人
            if (StringUtils.isEmpty(json.getInteger("em_id"))) {
                json.put("em_id", Objects.requireNonNull(AppUtil.getCookieEmployee()).getEm_id());
            }
            msg = customerService.addCustomerFollow(json);
        } catch (AppException e) {
            return msg.toError(e);
        } catch (Exception e) {
            e.printStackTrace();
            return msg.toError(e);
        }
        return msg.toString();
    }

    /**
     * 显示客户列表信息
     *
     * @return
     * @author shenhx
     */
    @RequestMapping("/queryCustomerIntentionById")
    public @ResponseBody
    Map<String, Object> queryCustomerIntentionById(Integer cc_id) {
        Map<String, Object> map = new HashMap<>();
        UserCustomerIntention userCustomerIntention = customerService.queryCustomerIntentionById(cc_id);
        map.put("customerIntention", userCustomerIntention);
        return map;
    }

    /**
     * 显示客户列表信息
     *
     * @return
     * @author shenhx
     */
    @RequestMapping("/isCustomer")
    public @ResponseBody
    Map<String, Object> isCustomer(String cc_code) {
        Map<String, Object> map = new HashMap<>();
        UserCustomer userCustomer = new UserCustomer();
        userCustomer.setCc_code(cc_code);
        userCustomer = customerService.selectCustomerCode(userCustomer);
        map.put("isCustomer", null != userCustomer);
        return map;
    }

    /**
     * 【客户日志】查询客户短信记录
     *
     * @param
     * @param pageNo
     * @param pageSize
     * @return
     * @作者 shenhx
     * @日期 2017年06月12日
     */
    @RequestMapping("/queryUserCenterInformationList")
    public @ResponseBody
    String queryUserCenterInformationList(Integer pageNo, Integer pageSize, String cc_code) {
        Msg<Object> msg = new Msg<>();

        UserCenterInformation t = new UserCenterInformation();
        t.setReceive_cc_code(cc_code);
        Pagination<UserCenterInformation> pagination = new Pagination<>(pageNo, pageSize, t);
        List<UserCenterInformation> centerInformationList = smsService.queryUserInformationByCode(pagination);

        int totalRecords = smsService.queryUserInformationByCodeCount(pagination);
        pagination.setList(centerInformationList, totalRecords);

        return msg.toString(pagination);
    }

    /**
     * 检查证件号码是否已在客户表中存在
     *
     * @param cc_cardNum
     * @return
     */
    @RequestMapping("/checkCardNum")
    public @ResponseBody
    Map<String, Object> checkCardNum(String cc_cardNum) {
        Map<String, Object> map = new HashMap<>();
        UserCustomer usercust = new UserCustomer();
        usercust.setCc_cardNum(cc_cardNum);
        usercust = customerService.selectCustomerCard(usercust);
        if (null != usercust) {
            UserCustomerImage customerImage = new UserCustomerImage();
            customerImage.setCc_id(usercust.getCc_id());
            usercust.setCustomerImages(customerService.queryCustomerImage(customerImage));

            UserCustomerPhone customerPhone = new UserCustomerPhone();
            customerPhone.setCc_id(usercust.getCc_id());
            customerPhone.setCcp_state(1);
            List<UserCustomerPhone> customerPhoneList = customerService.queryCustomerPhone(customerPhone);
            if (null != customerPhoneList) {

                usercust.setCcp_phone(customerPhoneList.get(0).getCcp_phone());
            }
        }

        map.put("code", usercust == null ? 401 : 200);
        map.put("result", usercust);
        return map;
    }


}