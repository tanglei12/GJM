package com.gjp.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alipay.api.AlipayApiException;
import com.gjp.dao.ContractDao;
import com.gjp.dao.FinanceManageDao;
import com.gjp.dao.PriceSettingDAO;
import com.gjp.model.*;
import com.gjp.util.*;
import com.gjp.util.bestsign.BestSignUtil;
import com.gjp.util.oss.AliOSS;
import com.gjp.util.toPdf.HtmlToPdf;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * 合同管理
 */
@Service
public class ContractService {

    @Resource
    private ContractDao contractDao;
    @Resource
    private CustomerService customerService;
    @Resource
    private FinanceManageService financeManageService;
    @Resource
    private PropertyTransferService propertyTransferService;
    @Resource
    private HousingAllocationService housingAllocationService;
    @Resource
    private HouseIntentionService houseIntentionService;
    @Resource
    private HouseLibraryService houseLibraryService;
    @Resource
    private UserCenterEmployeeService employeeService;
    @Resource
    private UserCenterTaskMessageService taskMessageService;
    @Resource
    private BillPartnerBillService partnerBillService;
    @Resource
    private AchievementCompanyService achievementService;
    @Resource
    private PriceSettingDAO priceSettingDAO;
    @Resource
    private FinanceManageDao financeManageDao;
    @Resource
    private SmsService smsService;
    @Resource
    private PropertyTransferService handoverPropertyService;
    @Resource
    private UserCenterStatementService statementService;
    @Resource
    private ServiceService serviceService;
    @Resource
    private BillContractOrderService billContractOrderService;
    @Resource
    private ServiceChargeService serviceChargeService;
    @Resource
    private OrderService orderService;
    @Resource
    private RentHouseService rentHouseService;

    /**
     * 【上传文件】
     *
     * @param request
     * @param type
     * @return
     */
    public Msg<Object> uploadFile(MultipartHttpServletRequest request, String type) {
        Msg<Object> msg = new Msg<>();
        Properties propertiesOSS = PropertiesUtil.getProperties("/conf/oss.properties");
//        type = "temp";
        type = StringUtils.isEmpty(type) ? "temp" : type;
        for (MultipartFile file: request.getFileMap().values()) {
            try {
                String suffix = "png";
                if (file.getOriginalFilename().contains(".")) {
                    suffix = file.getOriginalFilename().split("\\.")[1];
                }
                String key = type + System.currentTimeMillis() + "." + suffix;
                switch (type) {
                    case "temp":
                        key = AliOSS.upload(propertiesOSS.getProperty("folder.temp"), key, file.getInputStream());
                        break;
                    case "HTZ":
                    case "WTS":
                    case "FCZ":
                    case "JSD":
                    case "contract":
                        key = AliOSS.upload(propertiesOSS.getProperty("folder.contractImage"), key, file.getInputStream());
                        break;
                    case "customer":
                        key = AliOSS.upload(propertiesOSS.getProperty("folder.customerImage"), key, file.getInputStream());
                        break;
                    case "house":
                        key = AliOSS.upload(propertiesOSS.getProperty("folder.houseImage"), key, file.getInputStream());
                        break;
                    case "service":
                        key = AliOSS.upload(propertiesOSS.getProperty("folder.serviceImage"), key, file.getInputStream());
                        break;
                    case "maintenance":
                        key = AliOSS.upload(propertiesOSS.getProperty("folder.maintenanceImage"), key, file.getInputStream());
                        break;
                    case "advertisement":
                        key = AliOSS.upload(propertiesOSS.getProperty("folder.advertisement"), key, file.getInputStream());
                        break;
                    case "bookKeep":
                        key = AliOSS.upload(propertiesOSS.getProperty("folder.bookKeep"), key, file.getInputStream());
                        break;
                    default:
                        key = AliOSS.upload(propertiesOSS.getProperty("folder.temp"), key, file.getInputStream());
                        break;
                }
                String path = request.getSession().getServletContext().getRealPath("/") + "resources/image/upload/" + AppUtil.getImageName("house") + "." + suffix;
                // 转存文件
                File fileNew = new File(path);
                file.transferTo(fileNew);
                String imageS = SimilarImageSearch.produceFingerPrint(path, null);
                if (fileNew.exists()) {
                    fileNew.delete();
                }
                URL url = AliOSS.getUrl(key);
                msg.put("key", key);
                msg.put("url", url.toString());
                msg.put("name", file.getOriginalFilename());
                msg.put("size", file.getSize());
                msg.put("type", file.getContentType());
                msg.put("imageS", imageS);
            } catch (Exception e) {
                msg.setMsg(400, e.getMessage());
            }
        }
        return msg;
    }

    /**
     * 删除文件
     *
     * @param url
     * @throws AppException
     */
    public void deleteFile(String url) throws AppException {
        if (StringUtils.isEmpty(url)) {
            throw new AppException(Msg.MSG_PARAM_ERROR);
        }
        try {
            AliOSS.delete(url);
        } catch (Exception e) {
            throw new AppException("删除失败");
        }
    }

    // ==================公共================== //

    /**
     * 查询合同信息
     *
     * @param con_code
     * @return
     * @throws AppException
     */
    public Msg<Object> _queryContractInfo(String con_code) throws AppException {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(con_code)) {
            throw new AppException(Msg.MSG_PARAM_ERROR);
        }
        // 【合同对象】
        ContractObjectVo contractObject = new ContractObjectVo();
        contractObject.setContractObject_Code(con_code);
        contractObject = this.queryContractObject(contractObject);
        msg.put("contractObject", contractObject);
        if (contractObject == null) {
            throw new AppException(Msg.MSG_PARAM_ERROR);
        }

        // 【合同主体】
        msg.put("contractBody", this.queryContractBody(contractObject.getContractObject_Code()));

        // 续约
        if (contractObject.getContractObject_ExtState() == 12 || contractObject.getContractObject_ExtState() == 22) {
            ContractObjectVo oldContractObject = new ContractObjectVo();
            oldContractObject.setContractObject_Id(contractObject.getContractObject_Successor());
            oldContractObject = this.queryContractObject(oldContractObject);
            if (oldContractObject != null) {
                msg.put("oldContractEndDate", AppUtil.sdf_date.format(oldContractObject.getContractObject_DeadlineTime()));
            }
        }


        // 【合同照片】
        msg.put("contractImageList", this.queryContractImage(contractObject.getContractObject_Code()));

        // 招租订单
        ViewBusinessCancelContractListVo vccl = new ViewBusinessCancelContractListVo();
        vccl.setContractObject_Code(con_code);
        vccl.setCco_state_no(AppConfig.CANCEL_CONTRACT_STATE_7);
        vccl = this.queryCancelContractByCode(vccl);
        msg.put("cancelContract", vccl);

        // 附属协议审核
        msg.put("agreementAuditing", this.queryContractAgreementAuditing(con_code));

        // 合同订单
        ContractOrderVo contractOrderVo = new ContractOrderVo();
        contractOrderVo.setContractObject_code(contractObject.getContractObject_Code());
        contractOrderVo.setBco_orderType(AppConfig.order_type_1);
        contractOrderVo = financeManageService.queryFinanceOrder(contractOrderVo);
        msg.put("contractOrder", contractOrderVo);

        // 合同账单
        if (contractOrderVo != null) {
            msg.put("contractBillFirstList", financeManageService.queryFinanceBillList(contractOrderVo.getBco_code()));
        }

        // 房屋信息
        ViewHouseLibraryInfoVo libraryInfoVo = houseLibraryService.queryHouseLibraryInfo(contractObject.getHi_code());
        msg.put("houseInfo", libraryInfoVo);
        msg.put("viewLibraryInfo", libraryInfoVo);

        // 管家信息
        ViewBusinessContractRelaEmpVo contractRelaEmpVo = new ViewBusinessContractRelaEmpVo();
        contractRelaEmpVo.setContractObject_Id(contractObject.getContractObject_Id());
        List<ViewBusinessContractRelaEmpVo> contractRelaEmp = this.queryViewContractRelaEmp(contractRelaEmpVo);
        msg.put("contractRelaEmps", contractRelaEmp);

        // 签约代表
        UserCenterEmployee userCenterEmployee = new UserCenterEmployee();
        userCenterEmployee.setEm_id(contractObject.getContractObject_Contractor());
        userCenterEmployee = employeeService.queryEmployeeInfo(userCenterEmployee);
        msg.put("contractor", userCenterEmployee);

        // 获取签名验证
        ContractSignVerifyVo contractSignVerifyVo = this.queryContractSignVerify(contractObject.getContractObject_Code());
        boolean boo = false;
        if (contractSignVerifyVo != null && contractSignVerifyVo.getCs_state() == 21) {
            // 更新签署状态
            try {
                this.updateContractSignStatus(contractObject);
                boo = true;
            } catch (Exception e) {
                System.out.println("更新合同签名异常");
                e.printStackTrace();
            }
        }
        if (boo) {
            contractSignVerifyVo = this.queryContractSignVerify(contractObject.getContractObject_Code());
        }
        msg.put("contractSignVerify", contractSignVerifyVo);

        // 合作费查询
        BillBusinessBillVo businessBillVo = new BillBusinessBillVo();
        businessBillVo.setContractObject_code(con_code);
        businessBillVo.setBbo_type(110);
        businessBillVo = this.queryBusinessBill(businessBillVo);
        msg.put("businessBill", businessBillVo);

        // 客户信息
        UserCustomer customer = new UserCustomer();
        customer.setContractObject_code(contractObject.getContractObject_Code());
        List<UserCustomer> customers = customerService.queryCustomerRelaContractList(customer);
        String ccp_phone = null;
        for (UserCustomer userCustomer: customers) {
            if (userCustomer.getCrc_state() == 0) {
                ccp_phone = userCustomer.getCcp_phone();
            }
            // 客户图片
            UserCustomerImage customerImage = new UserCustomerImage();
            customerImage.setCc_id(userCustomer.getCc_id());
            customerImage.setCci_state(0);
            userCustomer.setCustomerImages(customerService.queryCustomerImage(customerImage));

            // 合同图片包含客户身份证图片
            ContractImageVo imageVo1 = new ContractImageVo();
            imageVo1.setContractObject_Code(con_code);
            imageVo1.setCi_type("SFZ");
            userCustomer.setContractImages(this.queryContractImage(imageVo1));
            // 银行卡
            UserCustomerBank customerBank = new UserCustomerBank();
            customerBank.setCc_id(userCustomer.getCc_id());
            userCustomer.setCustomerBank(customerService.queryCustomerBank(customerBank));
        }
        msg.put("customers", customers);

        // 交接
        HandoverPropertyMainVo propertyMainVo = new HandoverPropertyMainVo();
        propertyMainVo.setContractObject_code(con_code);
        if (AppConfig.TYPE_CONTRACT_201.equals(contractObject.getContractObject_Type())) {
            propertyMainVo.setHpm_type(0);
        }
        if (AppConfig.TYPE_CONTRACT_202.equals(contractObject.getContractObject_Type())) {
            propertyMainVo.setHpm_type(1);
        }
        // propertyMainVo.setHpm_state(0);
        propertyMainVo = handoverPropertyService.queryHandoverPropertyMain(propertyMainVo);
        msg.put("propertyMain", propertyMainVo);

        // 结算
        UserCenterStatementVo statementVo = new UserCenterStatementVo();
        statementVo.setContractObject_code(con_code);
        statementVo.setStatement_type(0);
        statementVo = statementService.queryStatementOrder(statementVo);
        msg.put("statementOrder", statementVo);

        if (AppConfig.TYPE_CONTRACT_202.equals(contractObject.getContractObject_Type())) {
            // 增值服务
            ViewBusinessDeclarationVo declaration = new ViewBusinessDeclarationVo();
            declaration.setMd_phone(ccp_phone);
            declaration.setHi_code(contractObject.getHi_code());
            List<ViewBusinessDeclarationVo> services = serviceService.queryServiceDeclarationOrderList(declaration);
            msg.put("services", services);
        }

        return msg;
    }

    /**
     * 添加合同记录
     *
     * @param contractObject_code 合同CODE
     * @param content             记录内容
     * @param author              操作人
     */
    public void addContractRecord(String contractObject_code, String content, String author) {
        ContractAuditingRecordVo auditingRecordVo = new ContractAuditingRecordVo();
        auditingRecordVo.setContractObject_code(contractObject_code);
        auditingRecordVo.setAuditingRecord_content(content);
        auditingRecordVo.setAuditingRecord_createTime(new Date());
        auditingRecordVo.setAuditingRecord_author(author);
        contractDao.addContractRecord(auditingRecordVo);
    }

    /**
     * 【业务操作】添加合同
     *
     * @param data
     * @return
     * @throws Exception
     * @作者 JiangQT
     * @日期 2016年12月9日
     */
    public ViewBusinessContractVo addContractService(JSONObject data) throws Exception {
        // 合同对象信息
        ContractObjectVo contractObject = data.getJSONObject("contractObject").toJavaObject(ContractObjectVo.class);
        // 合同主体信息
        UserCenterContractBody contractBody = data.getJSONObject("contractBody").toJavaObject(UserCenterContractBody.class);
        // 合同管家关系数据
        JSONArray employeeLists = data.getJSONArray("employeeList");
        // 合同客户关系数据
        JSONArray customers = data.getJSONArray("customers");
        // 合同图片数据
        JSONArray contractImages = data.getJSONArray("contractImages");
        // 旧合同编号
        String old_contractObject_No = data.getString("old_contractObject_No");
        // 签订合同管家
        Integer em_id = data.getInteger("em_id");

        // 是否为新增
        boolean isAdd = "add".equals(data.getString("mode"));
        // 是否改签
        boolean isChange = "change".equals(data.getString("mode"));
        // 是否续约
        boolean isRenew = "renew".equals(data.getString("mode"));
        // 是否为APP
        boolean isApp = "app".equals(data.getString("source"));

        // 【获取当前管家信息】
        if (StringUtils.isEmpty(em_id)) {
            throw new AppException(Msg.MSG_LOGIN_ERROR);
        }
        UserCenterEmployee employee = employeeService.queryEmployeeInfo(em_id);
        if (employee == null) {
            throw new AppException(Msg.MSG_LOGIN_ERROR);
        }

        // 黑名单检索
        if (customers != null) {
            List<UserCustomerRelationship> customerRelationshipList = customers.toJavaList(UserCustomerRelationship.class);
            for (UserCustomerRelationship customerRelationship: customerRelationshipList) {
                if (isAdd && customerRelationship.getCrc_role() == 0) {
                    UserCustomerIntention userCustomerIntention = customerService.queryCustomerIntentionByCode(customerRelationship.getCc_code());
                    if (userCustomerIntention != null) {
                        UserCustomerBlackList blackList = new UserCustomerBlackList();
                        blackList.setCc_cardNum(userCustomerIntention.getCc_cardNum());
                        blackList.setCc_phone(userCustomerIntention.getCcp_phone());
                        if (!customerService.checkBlackList(blackList)) {
                            throw new AppException("请注意，该客户【" + userCustomerIntention.getCc_name() + "】为公司黑名单客户！");
                        }
                    }
                } else {
                    UserCustomerBlackList blackList = new UserCustomerBlackList();
                    UserCustomer customer = customerService.queryCustomerInfo(customerRelationship.getCc_code());
                    if (customer != null) {
                        blackList.setCc_cardNum(customer.getCc_cardNum());
                        blackList.setCc_phone(customer.getCcp_phone());
                        if (!customerService.checkBlackList(blackList)) {
                            throw new AppException("请注意，该客户【" + customer.getCc_name() + "】为公司黑名单客户！");
                        }
                    }
                }
            }
        }

        // 【验证重复合同号】
        String version = contractObject.getContractObject_Version();
        if (!isApp && this.isValidContractNo(contractObject.getContractObject_No()) && "纸质版".equals(version) && 0 == contractObject.getGenerate().intValue()) {
            throw new AppException("合同编号重复");
        }

        // 判断房源当前状态是否适合添加合同
        ViewHouseLibraryInfoVo houseLibrary = houseLibraryService.queryHouseLibraryInfo(contractObject.getHi_code());
        if (houseLibrary != null) {
            if (AppConfig.TYPE_CONTRACT_201.equals(contractObject.getContractObject_Type())) {
                // 新签合同
                if (isAdd) {
                    if (!AppConfig.contract_outStatus_1.equals(houseLibrary.getContract_intoStatus())) {
                        throw new AppException("该房源不能签订" + contractObject.getContractObject_Type() + "或者已签合同");
                    }
                }
                // 续约合同
                if (isRenew) {
                    if (!AppConfig.contract_outStatus_5.equals(houseLibrary.getContract_intoStatus())) {
                        throw new AppException("该房源状态不能签订" + contractObject.getContractObject_Type() + "或者已签合同");
                    }
                }
            }
            if (AppConfig.TYPE_CONTRACT_202.equals(contractObject.getContractObject_Type())) {
                // 新签合同
                if (isAdd) {
                    if (!AppConfig.contract_outStatus_1.equals(houseLibrary.getContract_outStatus())) {
                        throw new AppException("该房源不能签订" + contractObject.getContractObject_Type() + "或者已签合同");
                    }
                }
                // 续约合同
                if (isRenew) {
                    if (!AppConfig.contract_outStatus_5.equals(houseLibrary.getContract_outStatus())) {
                        throw new AppException("该房源状态不能签订" + contractObject.getContractObject_Type() + "或者已签合同");
                    }
                }
            }
        }

        // 【添加合同对象信息】
        String contractObject_Code = AppUtil.getOrderCode("CON");
        Integer cqs_date = Integer.valueOf(new SimpleDateFormat("yyyyMM").format(new Date()));
        // 获取合同版本
        ContractVersionManage contractVersionManage = new ContractVersionManage();
        switch (contractObject.getContractObject_Type()) {
            case AppConfig.TYPE_CONTRACT_201:
                contractVersionManage.setContract_type("tg");
                break;
            case AppConfig.TYPE_CONTRACT_202:
                contractVersionManage.setContract_type("zl");
                break;
        }
        contractVersionManage.setContract_uses("preview");
        contractVersionManage.setContract_where(isApp ? "ERP_APP" : "PC");
        contractVersionManage = this.queryContractVersion(contractVersionManage);
        if (contractVersionManage == null) {
            throw new AppException("没发现可用的合同版本，请重试或联系管理员");
        }

        if (isApp || "电子版".equals(version) || ("纸质版".equals(version)
                && (contractObject.getGenerate() != null && contractObject.getGenerate().intValue() == 1))) {
            ContractQuantityStatisticsVo quantityStatisticsVo = new ContractQuantityStatisticsVo();
            quantityStatisticsVo.setCqs_date(cqs_date);
            quantityStatisticsVo = this.queryContractQuantityStatistics(quantityStatisticsVo);
            if (quantityStatisticsVo == null) {
                throw new AppException("请添加当月合同数量统计数据，请联系管理员");
            }
            int type = AppConfig.TYPE_CONTRACT_201.equals(contractObject.getContractObject_Type()) ? 1 : 2;
            String contractNo = AppUtil.buildContractNo(type, quantityStatisticsVo.getCqs_number() + 1);
            contractObject.setContractObject_No(contractNo);
            contractObject.setContractObject_FillTime(new Date());
            // 合同来源
            contractObject.setContractObject_Source(isApp ? "PHONE" : "PC");
            // 合同版本
            contractObject.setContractObject_Version(contractVersionManage.getContract_version());
            // 电子合同|纸质合同
            contractObject.setContractObject_Mode((isApp || "电子版".equals(version)) ? "E" : "P");
        } else {
            // 合同来源
            contractObject.setContractObject_Source("PC");
            // 合同版本
            contractObject.setContractObject_Version(contractVersionManage.getContract_version());
            // 电子合同|纸质合同
            contractObject.setContractObject_Mode("P");
        }
        contractObject.setContractObject_Code(contractObject_Code);
        contractObject.setContractObject_RealDate(contractObject.getContractObject_Date());
        contractObject.setContractObject_State(AppConfig.con_state_1);
        contractObject.setContractObject_OptionState(AppConfig.contract_optionstate_101);
        contractObject.setContractObject_CreateTime(new Date());
        contractObject.setContractObject_Bool(0); // 新存/出房
        //记录合同来源  这份合同是改签
        if (isChange) {
            contractObject.setContractObject_RecordSource(AppConfig.contractObject_RecordSource_1);
        }
        this.addContractObject(contractObject);

        // 如有其他约定，则添加附署协议审核表
        if (!StringUtils.isEmpty(contractObject.getContractObject_Other())) {
            ContractAgreementAuditingVo contractAgreementAuditingVo = new ContractAgreementAuditingVo();
            contractAgreementAuditingVo.setCon_code(contractObject.getContractObject_Code());
            contractAgreementAuditingVo.setCaa_content(contractObject.getContractObject_Other());
            contractAgreementAuditingVo.setCaa_state(AppConfig.CAA_STATE_1);
            contractAgreementAuditingVo.setCaa_createTime(new Date());
            this.addContractAgreementAuditing(contractAgreementAuditingVo);
        }

        // 【更新合同数量统计数据】
        if (isApp || "电子版".equals(version)) {
            ContractQuantityStatisticsVo quantityStatisticsVo = new ContractQuantityStatisticsVo();
            quantityStatisticsVo.setCqs_date(cqs_date);
            boolean boo = this.updateContractQuantityStatistics(quantityStatisticsVo);
            if (!boo) {
                throw new AppException("更新合同数量统计数据失败，请联系管理员");
            }
        }

        // 【查询房源数据】
        ViewHouseLibraryInfoVo houseLibraryInfo = houseLibraryService.queryHouseLibraryInfo(contractObject.getHi_code());
        // 【添加合同业务信息】
        if (isApp) {
            contractBody.setContractBody_RentRate_A(0);
            contractBody.setContractBody_RentRate_B(100);
            contractBody.setContractBody_GjName(employee.getEm_name());
            contractBody.setContractBody_GjPhone(employee.getEm_phone());
        }
        contractBody.setContractObject_Code(contractObject_Code);
        contractBody.setContractBody_Optioner(employee.getEm_name() + "(" + employee.getEm_phone() + ")");
        contractBody.setContractBody_Active(houseLibraryInfo.getHi_boolActive());
        contractBody.setContractBody_SpecialOffer(houseLibraryInfo.getPst_name());
        contractBody.setContractBody_Recovery(houseLibraryInfo.getHi_houseActive());
        //【免租期后约定还款日算法】
        if ("0".equals(contractBody.getContractBody_AgreedRepayTime())) {
            String[] timeFree = contractBody.getContractBody_FreeTime().split("\\|");
            int day1 = 0;
            int day2 = 0;
            int day3 = 0;
            int day4 = 0;
            int day5 = 0;
            StringBuilder repayTime1 = new StringBuilder();
            for (int i = 0; i < timeFree.length; i++) {
                Calendar now = Calendar.getInstance();
                now.setTime(new Date());
                switch ((i + 1)) {
                    case 1:
                        now.add(Calendar.DAY_OF_YEAR, Integer.valueOf(timeFree[i]));
                        day1 = Integer.valueOf(timeFree[i]);
                        repayTime1.append(Integer.valueOf(now.get(Calendar.DAY_OF_MONTH)).toString()).append("|");
                        break;
                    case 2:
                        now.add(Calendar.YEAR, i);//增加一年
                        if (contractBody.getContractBody_ContractMode() == 1) {
                            now.add(Calendar.DAY_OF_YEAR, (day1 + Integer.valueOf(timeFree[i])));
                            day2 = Integer.valueOf(timeFree[i]);
                        } else {
                            now.add(Calendar.DAY_OF_YEAR, (Integer.valueOf(timeFree[i])));
                        }
                        repayTime1.append(Integer.valueOf(now.get(Calendar.DAY_OF_MONTH)).toString()).append("|");
                        break;
                    case 3:
                        now.add(Calendar.YEAR, i);//增加2年
                        if (contractBody.getContractBody_ContractMode() == 1) {
                            now.add(Calendar.DAY_OF_YEAR, (day1 + day2 + Integer.valueOf(timeFree[i])));
                            day3 = Integer.valueOf(timeFree[i]);
                        } else {
                            now.add(Calendar.DAY_OF_YEAR, (Integer.valueOf(timeFree[i])));
                        }
                        repayTime1.append(Integer.valueOf(now.get(Calendar.DAY_OF_MONTH)).toString()).append("|");
                        break;
                    case 4:
                        now.add(Calendar.YEAR, i);//增加3年
                        if (contractBody.getContractBody_ContractMode() == 1) {
                            now.add(Calendar.DAY_OF_YEAR, (day1 + day2 + day3 + Integer.valueOf(timeFree[i])));
                            day4 = Integer.valueOf(timeFree[i]);
                        } else {
                            now.add(Calendar.DAY_OF_YEAR, (Integer.valueOf(timeFree[i])));
                        }
                        repayTime1.append(Integer.valueOf(now.get(Calendar.DAY_OF_MONTH)).toString()).append("|");
                        break;
                    case 5:
                        now.add(Calendar.YEAR, i);//增加4年
                        if (contractBody.getContractBody_ContractMode() == 1) {
                            day5 = Integer.valueOf(timeFree[i]);
                            now.add(Calendar.DAY_OF_YEAR, (day1 + day2 + day3 + day4 + Integer.valueOf(timeFree[i])));
                        } else {
                            now.add(Calendar.DAY_OF_YEAR, (Integer.valueOf(timeFree[i])));
                        }
                        repayTime1.append(Integer.valueOf(now.get(Calendar.DAY_OF_MONTH)).toString()).append("|");
                        break;
                }
            }
            contractBody.setContractBody_AgreedRepayTime(repayTime1.substring(0, repayTime1.length() - 1));
        }
        this.addUserCenterContractBody(contractBody);

        // 【添加合同管家关系数据】
        UserCenterContractRelaEmpVo empVoMain = new UserCenterContractRelaEmpVo();
        if (employeeLists != null) {
            List<UserCenterContractRelaEmpVo> contractRelaEmpList = employeeLists.toJavaList(UserCenterContractRelaEmpVo.class);
            contractDao.deleteContractRaleEmp(contractObject.getContractObject_Id());
            for (UserCenterContractRelaEmpVo userCenterContractRelaEmpVo: contractRelaEmpList) {
                if (userCenterContractRelaEmpVo.getCre_role() == 1) {
                    empVoMain = userCenterContractRelaEmpVo;
                }
                userCenterContractRelaEmpVo.setContractObject_Id(contractObject.getContractObject_Id());
                contractDao.addContractRelaEmp(userCenterContractRelaEmpVo);
            }
        }

        // 【添加合同客户关系数据】
        if (customers != null) {
            // 转Java对象
            List<UserCustomerRelationship> customerRelationshipList = customers.toJavaList(UserCustomerRelationship.class);
            // 删除旧数据
            customerService.deleteCustomerRelaContractInfo(contractObject.getContractObject_Code());
            // 添加新数据
            for (UserCustomerRelationship customerRelationship: customerRelationshipList) {
                customerRelationship.setHi_code(contractObject.getHi_code());
                customerRelationship.setContractObject_code(contractObject.getContractObject_Code());
                customerRelationship.setCrc_state(1);
                customerRelationship.setCrc_time(new Date());
                customerRelationship.setEm_id(empVoMain.getEm_id());
                customerService.addCustomerRelaContractInfo(customerRelationship);

                // 新增合同时，主客户需从意向表同步到正式客户表
                if (isAdd && customerRelationship.getCrc_role() == 0) {
                    // 修改意向客户表中的客户状态为签约
                    UserCustomerIntention userCustomerIntention = new UserCustomerIntention();
                    userCustomerIntention.setCc_code(customerRelationship.getCc_code());
                    userCustomerIntention.setFollow_status(4);// 签约
                    customerService.updCustomerIntention(userCustomerIntention);
                }

                // 客户改为有效客户
                UserCustomer userCustomer = new UserCustomer();
                userCustomer.setCc_code(customerRelationship.getCc_code());
                userCustomer.setCc_state(1); // 有效客户
                customerService.updateCustomer(userCustomer);

            }
        }

        // 【更新客户状态】
        UserCustomer userCustomer = new UserCustomer();
        userCustomer.setCc_code(contractObject.getContractObject_1st());
        userCustomer.setCc_state(1); // 有效客户
        customerService.updateCustomer(userCustomer);

        // 【更新合同图片】
        if (contractImages != null) {
            List<ContractImageVo> contractImageList = contractImages.toJavaList(ContractImageVo.class);
            ContractImageVo contractImageVo0 = new ContractImageVo();
            contractImageVo0.setContractObject_Code(contractObject.getContractObject_Code());
            this.deleteContractImage(contractImageVo0);
            for (ContractImageVo contractImageVo: contractImageList) {
                contractImageVo.setContractObject_Code(contractObject.getContractObject_Code());
                contractImageVo.setCi_state(1);
                contractImageVo.setCi_createTime(new Date());
                this.addContractImage(contractImageVo);
            }
        }

        // 【执行合同继承】
        ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
        contractVo.setHi_code(contractObject.getHi_code());
        contractVo.setContractObject_Type(contractObject.getContractObject_Type());
        this.callContractSuccessor(contractVo);

        // 【更新合同扩展状态】
        int extState = 0;
        if (AppConfig.TYPE_CONTRACT_201.equals(contractObject.getContractObject_Type())) {
            extState = 10;
        }
        if (AppConfig.TYPE_CONTRACT_202.equals(contractObject.getContractObject_Type())) {
            extState = 20;
        }
        if (!StringUtils.isEmpty(old_contractObject_No)) {
            ViewBusinessContractVo oldBusinessContract = this.selectContractObjectByCNo(old_contractObject_No);
            if (oldBusinessContract == null) {
                throw new AppException("合同签订出错");
            }
            if (AppConfig.TYPE_CONTRACT_201.equals(contractObject.getContractObject_Type())) {
                // ->改签合同
                if (isChange) {
                    extState = oldBusinessContract.getContractObject_ExtState();
                } else {
                    extState = 12;
                }
            }
            if (AppConfig.TYPE_CONTRACT_202.equals(contractObject.getContractObject_Type())) {
                // ->改签合同
                if (isChange) {
                    extState = oldBusinessContract.getContractObject_ExtState();
                } else {
                    extState = 22;
                }
            }
        } else {
            // 合同继承后，查询当前合同数据
            ContractObjectVo contractObjectNew = new ContractObjectVo();
            contractObjectNew.setContractObject_Code(contractObject_Code);
            contractObjectNew = this.queryContractObject(contractObjectNew);

            // 查询被继承的合同
            ContractObjectVo contractObjectOld = new ContractObjectVo();
            contractObjectOld.setContractObject_Id(contractObjectNew.getContractObject_Successor());
            contractObjectOld = this.queryContractObject(contractObjectOld);
            if (contractObjectOld != null) {
                // 赋值合同额外状态
                int optionState = contractObjectOld.getContractObject_OptionState();
                if (optionState == AppConfig.contract_optionstate_106) {
                    if (AppConfig.TYPE_CONTRACT_201.equals(contractObject.getContractObject_Type())) {
                        // ->改签合同
                        if (isChange) {
                            extState = contractObjectOld.getContractObject_ExtState();
                        } else {
                            extState = 12;
                        }
                    }
                    if (AppConfig.TYPE_CONTRACT_202.equals(contractObject.getContractObject_Type())) {
                        if (isChange) { // ->改签合同
                            extState = contractObjectOld.getContractObject_ExtState();
                        } else {
                            extState = 22;
                        }
                    }
                } else if (optionState == AppConfig.contract_optionstate_300 || optionState == AppConfig.contract_optionstate_301 || optionState == AppConfig.contract_optionstate_302 || optionState == AppConfig.contract_optionstate_303) {
                    extState = 23;
                } else if (optionState == AppConfig.contract_optionstate_401 || optionState == AppConfig.contract_optionstate_402 || optionState == AppConfig.contract_optionstate_403) {
                    extState = 10;
                } else if (optionState == AppConfig.contract_optionstate_501 || optionState == AppConfig.contract_optionstate_502 || optionState == AppConfig.contract_optionstate_503) {
                    extState = 25;
                } else if (optionState == AppConfig.contract_optionstate_601 || optionState == AppConfig.contract_optionstate_602 || optionState == AppConfig.contract_optionstate_603) {
                    extState = 26;
                } else if (optionState == AppConfig.contract_optionstate_701 || optionState == AppConfig.contract_optionstate_702 || optionState == AppConfig.contract_optionstate_703) {
                    extState = 27;
                } else if (optionState == AppConfig.contract_optionstate_901 || optionState == AppConfig.contract_optionstate_902 || optionState == AppConfig.contract_optionstate_903) {
                    extState = 29;
                }
            }
        }
        ContractObjectVo contractObjectForState = new ContractObjectVo();
        contractObjectForState.setContractObject_Code(contractObject_Code);
        contractObjectForState.setContractObject_ExtState(extState);
        this.updateContractObject(contractObjectForState);

        // 【更新合同交接数据】
        if (!StringUtils.isEmpty(old_contractObject_No)) {
            ViewBusinessContractVo oldBusinessContract = this.selectContractObjectByCNo(old_contractObject_No);
            if (oldBusinessContract == null) {
                throw new AppException("合同签订出错");
            }

            // 更新旧合同状态
            ContractObjectVo contractObjectVo = new ContractObjectVo();
            contractObjectVo.setContractObject_Id(oldBusinessContract.getContractObject_Id());
            if (isChange) {
                contractObjectVo.setContractObject_State(AppConfig.con_state_3);// 失效旧合同
                contractObjectVo.setContractObject_OptionState(AppConfig.contract_optionstate_202);
            } else {
                if (oldBusinessContract.getContractObject_DeadlineTime().getTime() <= AppUtil.sdf_date.parse(AppUtil.sdf_date.format(new Date())).getTime()) {
                    contractObjectVo.setContractObject_State(AppConfig.con_state_3);// 失效旧合同
                }
                contractObjectVo.setContractObject_OptionState(AppConfig.contract_optionstate_201);
            }
            this.updateContractObject(contractObjectVo);

            // 拷贝数据
            if (!isChange) {
                HandoverPropertyMainVo propertyMainVo = new HandoverPropertyMainVo();
                propertyMainVo.setContractObject_code(oldBusinessContract.getContractObject_Code());
                propertyMainVo = propertyTransferService.queryHandoverPropertyMain(propertyMainVo);
                if (propertyMainVo != null) {

                    // 拷贝第一步
                    HandoverPropertyMainVo propertyMainNew = new HandoverPropertyMainVo();
                    propertyMainNew.setHpm_code(AppUtil.getOrderCode("HOP"));
                    propertyMainNew.setHi_code(propertyMainVo.getHi_code());
                    propertyMainNew.setContractObject_code(contractObject.getContractObject_Code());
                    propertyMainNew.setHpm_type(propertyMainVo.getHpm_type());
                    propertyMainNew.setHpm_handoverPersonIn(propertyMainVo.getHpm_handoverPersonIn());
                    propertyMainNew.setHpm_handoverDateIn(propertyMainVo.getHpm_handoverDateIn());
                    propertyMainNew.setHpm_handoverPersonOut(propertyMainVo.getHpm_handoverPersonOut());
                    propertyMainNew.setHpm_handoverDateOut(propertyMainVo.getHpm_handoverDateOut());
                    propertyMainNew.setHpm_state(0);
                    propertyMainNew.setHpm_createTime(new Date());
                    propertyTransferService.addHandoverPropertyMain(propertyMainNew);

                    // 查询能源卡数值
                    HandoverPropertyEnergyValueVo energyValueVo = new HandoverPropertyEnergyValueVo();
                    energyValueVo.setHpm_id(propertyMainVo.getHpm_id());
                    List<HandoverPropertyEnergyValueVo> energyValueVos = propertyTransferService.queryHandoverPropertyEnergyValueList(energyValueVo);
                    for (HandoverPropertyEnergyValueVo handoverPropertyEnergyValueVo: energyValueVos) {
                        handoverPropertyEnergyValueVo.setHpm_id(propertyMainNew.getHpm_id());
                        propertyTransferService.addHandPropertyEnergyValue(handoverPropertyEnergyValueVo);
                    }

                    // 查询交接物品配置信息
                    HandoverPropertyGoodsVo propertyGoodsVo = new HandoverPropertyGoodsVo();
                    propertyGoodsVo.setHpm_id(propertyMainVo.getHpm_id());
                    List<HandoverPropertyGoodsVo> goodsVos = propertyTransferService.queryHandoverPropertyGoodsList(propertyGoodsVo);
                    for (HandoverPropertyGoodsVo handoverPropertyGoodsVo: goodsVos) {
                        handoverPropertyGoodsVo.setHpm_id(propertyMainNew.getHpm_id());
                        handoverPropertyGoodsVo.setHpg_createTime(new Date());
                        propertyTransferService.addHandPropertyGoods(handoverPropertyGoodsVo);
                    }

                    // 查询交接装饰情况信息
                    HandoverPropertyDecorationVo propertyDecorationVo = new HandoverPropertyDecorationVo();
                    propertyDecorationVo.setHpm_id(propertyMainVo.getHpm_id());
                    List<HandoverPropertyDecorationVo> decorationVos = propertyTransferService.queryHandoverPropertyDecorationList(propertyDecorationVo);
                    for (HandoverPropertyDecorationVo handoverPropertyDecorationVo: decorationVos) {
                        handoverPropertyDecorationVo.setHpm_id(propertyMainNew.getHpm_id());
                        handoverPropertyDecorationVo.setHpd_createTime(new Date());
                        propertyTransferService.addHandPropertyDecoration(handoverPropertyDecorationVo);
                    }
                }
            }

            String con_code = oldBusinessContract.getContractObject_Code();
            String hi_code = oldBusinessContract.getHi_code();
            // 添加合同记录（旧合同）
            this.addContractRecord(con_code, isChange ? "合同改签" : "合同续约", employee.getEm_name());

            // 添加执行记录
            ContractImplRecordVo implementRecordVo = new ContractImplRecordVo();
            implementRecordVo.setHi_code(hi_code);
            implementRecordVo.setContractObject_code(con_code);
            implementRecordVo.setCir_type(1013);
            implementRecordVo.setCir_content(isChange ? "合同改签，改签" : "合同续约，续约" + "合同编号：" + contractObject.getContractObject_No());
            implementRecordVo.setCir_source(0);
            implementRecordVo.setCir_author(employee.getEm_id());
            implementRecordVo.setCir_createTime(new Date());
            this.addHouseRecord(implementRecordVo);
        }

        if (AppConfig.TYPE_CONTRACT_201.equals(contractObject.getContractObject_Type())) {
            // 更新房源合同状态
            HouseInfoKeep informationKeep = new HouseInfoKeep();
            informationKeep.setHi_code(contractObject.getHi_code());
            informationKeep.setContract_intoStatus(AppConfig.contract_outStatus_2);
            informationKeep.setHi_forRentState(AppConfig.hi_forRentState_1020);
            houseLibraryService.updateHouseContractState(informationKeep);

            // 【生成合同订单】
            ContractOrderVo contractOrderVo = this.addContractOrderService(contractObject_Code);
            if (contractOrderVo == null) {
                throw new AppException("生成合同订单失败，请联系管理员");
            }

            // 【生成合同账单】
            this.addContractBill(contractOrderVo, contractBody.getContractBody_ContractMode());

            // 【更新合同订单-总期数】
            ContractBillVo contractBillVo = new ContractBillVo();
            contractBillVo.setBco_code(contractOrderVo.getBco_code());
            List<ContractBillVo> contractBillList = financeManageService.queryFinanceBillList(contractBillVo);
            if (!contractBillList.isEmpty()) {
                Set<Integer> set = new HashSet<>();
                for (ContractBillVo contractBillVo2: contractBillList) {
                    set.add(contractBillVo2.getBcb_cycle());
                }
                ContractOrderVo contractOrderVo2 = new ContractOrderVo();
                contractOrderVo2.setBco_id(contractOrderVo.getBco_id());
                contractOrderVo2.setBco_totalCycle(set.size());
                financeManageService.updateFinanceOrder(contractOrderVo2);
            }

            // 【更新合同订单-当前期数、当前应还款、实际还款、未还款、应还款日期】
            financeManageService.updateFinanceOrderBillData(contractOrderVo.getBco_code());
        }

        // 保存包修费、服务费
        ServiceCharge serviceCharge = new ServiceCharge();
        Date startDate = contractObject.getContractObject_Date();
        Date endDate = contractObject.getContractObject_DeadlineTime();
        if (AppConfig.TYPE_CONTRACT_201.equals(contractObject.getContractObject_Type())) {
            if (AppUtil.isNotNull(contractBody.getContractBody_GuaranteeCost())) {
                String[] guaranteeCostArr = contractBody.getContractBody_GuaranteeCost().split("\\|");
                double totalGuaranteeCost = 0.0;
                for (String aGuaranteeCostArr: guaranteeCostArr) {
                    if (Double.parseDouble(aGuaranteeCostArr) > 0) {
                        totalGuaranteeCost += Double.parseDouble(aGuaranteeCostArr);
                    }
                }
                if (totalGuaranteeCost >= 0.0) {
                    serviceCharge.setInit_serveMoney(totalGuaranteeCost);
                    serviceCharge.setUsed_serveMoney(0.0);
                    serviceCharge.setSurplus_serveMoney(totalGuaranteeCost);
                    serviceCharge.setAvailable_serveMoney(totalGuaranteeCost);
                    serviceCharge.setServeType(1);// 包修费
                    serviceCharge.setCon_code(contractObject_Code);
                    serviceCharge.setCc_code(contractObject.getContractObject_1st());
                    serviceCharge.setHi_code(contractObject.getHi_code());
                    serviceCharge.setEffective_date(startDate);
                    serviceCharge.setExpiry_date(endDate);
                    serviceChargeService.appAddServiceCharge(serviceCharge);
                }
            }

        } else if (AppConfig.TYPE_CONTRACT_202.equals(contractObject.getContractObject_Type())) {
            double serviceMoney = Double.parseDouble(Float.toString(contractBody.getContractBody_Service()));
            if (serviceMoney >= 0.0) {
                serviceCharge.setInit_serveMoney(serviceMoney >= 300 ? 300 : serviceMoney);
                serviceCharge.setUsed_serveMoney(0.0);
                serviceCharge.setSurplus_serveMoney(serviceMoney >= 300 ? 300 : serviceMoney);
                serviceCharge.setAvailable_serveMoney(serviceMoney >= 300 ? 300 : serviceMoney);
                serviceCharge.setServeType(2);// 服务费
                serviceCharge.setCon_code(contractObject_Code);
                serviceCharge.setCc_code(contractObject.getContractObject_1st());
                serviceCharge.setHi_code(contractObject.getHi_code());
                serviceCharge.setEffective_date(startDate);
                serviceCharge.setExpiry_date(endDate);
                serviceChargeService.appAddServiceCharge(serviceCharge);
            }
        }

        if (AppConfig.TYPE_CONTRACT_202.equals(contractObject.getContractObject_Type())) {

            // 添加服务费
            /* shenhx 20170821 服务费、包修费存入GJP_Server_Charge，GJP_Server_ChargeRecord */
            /*ServiceContractServiceChargeVo serviceChargeVo = new ServiceContractServiceChargeVo();
            serviceChargeVo.setContractObject_no(contractObject.getContractObject_No());
            if(AppConfig.TYPE_CONTRACT_201.equals(contractObject.getContractObject_Type())){
                serviceChargeVo.setGuaranteeCost(contractBody.getContractBody_GuaranteeCost());
            } else {
                if (600 - contractBody.getContractBody_Service() <= 0) {
                    serviceChargeVo.setCsc_money(300);
                } else {
                    serviceChargeVo.setCsc_money(Math.abs(600 - contractBody.getContractBody_Service()) + 300);
                }
            }
            serviceChargeVo.setHi_code(contractObject.getHi_code());
            serviceChargeVo.setCsc_createTime(new Date());
            this.addContractServiceCharge(serviceChargeVo);*/

            // 更新房源合同状态
            HouseInfoKeep informationKeep = new HouseInfoKeep();
            informationKeep.setHi_code(contractObject.getHi_code());
            informationKeep.setContract_outStatus(AppConfig.contract_outStatus_2);
            housingAllocationService.updateHouseContractState(informationKeep);
            houseLibraryService.updateHouseContractState(informationKeep);

            // 不是续约合同时，更新房源招租状态
            if (StringUtils.isEmpty(old_contractObject_No)) {
                HouseInfoKeep houseLibraryInfo1 = new HouseInfoKeep();
                houseLibraryInfo1.setHi_code(contractObject.getHi_code());
                houseLibraryInfo1.setHi_isForRent(AppConfig.hi_isForRent_2); // 未招租
                // houseLibraryInfo1.setHi_forRentState(AppConfig.hi_forRentState_2000);// 暂停招租
                houseLibraryInfo1.setContract_outStatus(AppConfig.contract_outStatus_2); // 编辑状态
                housingAllocationService.updateHouseContractState(houseLibraryInfo1);
                houseLibraryService.updateHouseContractState(houseLibraryInfo1);
            }

            // 【生成合同订单】
            ContractOrderVo contractOrderVo = this.addContractOrderService(contractObject_Code);
            if (contractOrderVo == null) {
                throw new AppException("生成合同订单失败，请联系管理员");
            }

            // 【生成合同账单】
            this.addContractBill(contractOrderVo, contractBody.getContractBody_ContractMode());

            // 【特价处理】
            if (houseLibraryInfo.getHi_boolActive() != null && houseLibraryInfo.getHi_boolActive() == 1) {
                if (AppConfig.TYPE_CONTRACT_202.equals(contractObject.getContractObject_Type())) {
                    updateActiveBill(contractObject_Code, houseLibraryInfo.getPst_id(), houseLibraryInfo.getPst_money());
                }
            }

            // 【更新合同订单-总期数】
            ContractBillVo contractBillVo = new ContractBillVo();
            contractBillVo.setBco_code(contractOrderVo.getBco_code());
            List<ContractBillVo> contractBillList = financeManageService.queryFinanceBillList(contractBillVo);
            if (!contractBillList.isEmpty()) {
                Set<Integer> set = new HashSet<>();
                for (ContractBillVo contractBillVo2: contractBillList) {
                    set.add(contractBillVo2.getBcb_cycle());
                }
                ContractOrderVo contractOrderVo2 = new ContractOrderVo();
                contractOrderVo2.setBco_id(contractOrderVo.getBco_id());
                contractOrderVo2.setBco_totalCycle(set.size());
                financeManageService.updateFinanceOrder(contractOrderVo2);
            }

            // 【更新合同订单-当前期数、当前应还款、实际还款、未还款、应还款日期】
            financeManageService.updateFinanceOrderBillData(contractOrderVo.getBco_code());
        }

        // 【更新房源产权地址】
        HouseExtendedVo extendedVo = new HouseExtendedVo();
        extendedVo.setHe_id(houseLibraryInfo.getHe_id());
        extendedVo.setHe_address(contractObject.getHe_address());
        housingAllocationService.updateHouseExtendedState(extendedVo);

        // 【添加合同记录】
        this.addContractRecord(contractObject.getContractObject_Code(), "创建合同", employee.getEm_name());

        // 【合同归属部门】

        // 返回数据
        contractVo = new ViewBusinessContractVo();
        contractVo.setContractObject_No(contractObject.getContractObject_No());
        contractVo = this.selectContractObjectByCNo(contractVo);

        // 支付宝房源下架
        // 【下架支付宝平台上该房屋】
        RentHouseVo rentHouseVo = rentHouseService.queryRentHouseVo(contractObject.getHi_code());
        if (null != rentHouseVo) {
            ViewHouseLibraryInfoVo houseLibraryInfoVo = houseLibraryService.queryHouseLibraryInfo(contractObject.getHi_code());
            rentHouseService.rentHouseStateSync(contractObject.getHi_code(), rentHouseVo.getRoom_code(), 0, 2, "分散式".equals(houseLibraryInfoVo.getHis_name()) ? 1 : 2);
            rentHouseVo.setRoom_status(0);
            rentHouseService.updataRentHouseVo(rentHouseVo);
        }
        return contractVo;
    }

    /**
     * 【业务操作】更新合同
     *
     * @param data
     * @return
     * @throws Exception
     * @作者 JiangQT
     * @日期 2016年12月9日
     */
    public ViewBusinessContractVo updateContractService(JSONObject data) throws Exception {
        // 合同对象
        ContractObjectVo contractObject = data.getJSONObject("contractObject").toJavaObject(ContractObjectVo.class);
        // 合同主体
        UserCenterContractBody contractBody = data.getJSONObject("contractBody").toJavaObject(UserCenterContractBody.class);
        // 合同管家关系数据
        JSONArray employeeLists = data.getJSONArray("employeeList");
        // 合同客户关系数据
        JSONArray customers = data.getJSONArray("customers");
        // 合同图片数据
        JSONArray contractImages = data.getJSONArray("contractImages");

        // 是否为新增
        boolean isAdd = "add".equals(data.getString("mode"));

        // 黑名单检索
        if (null != customers) {
            List<UserCustomerRelationship> customerRelationshipList = customers.toJavaList(UserCustomerRelationship.class);
            for (UserCustomerRelationship customerRelationship: customerRelationshipList) {
                if (isAdd && customerRelationship.getCrc_role() == 0) {
                    UserCustomerIntention userCustomerIntention = customerService.queryCustomerIntentionByCode(customerRelationship.getCc_code());
                    UserCustomerBlackList blackList = new UserCustomerBlackList();
                    blackList.setCc_cardNum(userCustomerIntention.getCc_cardNum());
                    blackList.setCc_phone(userCustomerIntention.getCcp_phone());
                    if (!customerService.checkBlackList(blackList)) {
                        throw new AppException("请注意，该客户【" + userCustomerIntention.getCc_name() + "】为公司黑名单客户！");
                    }
                } else {
                    UserCustomerBlackList blackList = new UserCustomerBlackList();
                    UserCustomer customer = customerService.queryCustomerInfo(customerRelationship.getCc_code());
                    if (null != customer) {
                        blackList.setCc_cardNum(customer.getCc_cardNum());
                        blackList.setCc_phone(customer.getCcp_phone());
                        if (!customerService.checkBlackList(blackList)) {
                            throw new AppException("请注意，该客户【" + customer.getCc_name() + "】为公司黑名单客户！");
                        }
                    }
                }
            }
        }
        // 是否APP
        boolean isApp = "app".equals(data.get("source"));
        // 产权地址
        String he_address = contractObject.getHe_address();

        // 是否有关键参数
        if (StringUtils.isEmpty(contractObject.getContractObject_Id())) {
            throw new AppException(Msg.MSG_PARAM_ERROR);
        }

        if (!isApp) {
            // 是否合同号重复
            ContractObjectVo contractObject1 = new ContractObjectVo();
            contractObject1.setContractObject_No(contractObject.getContractObject_No());
            contractObject1 = this.queryContractObject(contractObject1);
            if (contractObject1 != null && !contractObject.getContractObject_Id().equals(contractObject1.getContractObject_Id())) {
                throw new AppException("合同编号重复");
            }
        }

        // 【更新合同对象信息】
        contractObject.setContractObject_RealDate(contractObject.getContractObject_Date());
        contractObject.setContractObject_UpdateTime(new Date());
        contractDao.updateContractObject(contractObject);

        // 查询合同
        contractObject = queryContractObject(contractObject.getContractObject_Id());
        if (contractObject == null) {
            throw new AppException("没有发现合同，请联系管理员");
        }

        // 如有其他约定，则添加附署协议审核表
        ContractAgreementAuditingVo contractAgreementAuditingVo = this.queryContractAgreementAuditing(contractObject.getContractObject_Code());
        if (!StringUtils.isEmpty(contractObject.getContractObject_Other())) {
            if (contractAgreementAuditingVo == null) {
                ContractAgreementAuditingVo contractAgreementAuditingVo1 = new ContractAgreementAuditingVo();
                contractAgreementAuditingVo1.setCon_code(contractObject.getContractObject_Code());
                contractAgreementAuditingVo1.setCaa_content(contractObject.getContractObject_Other());
                contractAgreementAuditingVo1.setCaa_state(AppConfig.CAA_STATE_1);
                contractAgreementAuditingVo1.setCaa_createTime(new Date());
                this.addContractAgreementAuditing(contractAgreementAuditingVo1);
            } else {
                ContractAgreementAuditingVo contractAgreementAuditingVo1 = new ContractAgreementAuditingVo();
                contractAgreementAuditingVo1.setCaa_id(contractAgreementAuditingVo.getCaa_id());
                contractAgreementAuditingVo1.setCaa_content(contractObject.getContractObject_Other());
                contractAgreementAuditingVo1.setCaa_state(AppConfig.CAA_STATE_1);
                this.updateContractAgreementAuditing(contractAgreementAuditingVo1);
            }
        } else {
            if (contractAgreementAuditingVo != null) {
                ContractAgreementAuditingVo contractAgreementAuditingVo1 = new ContractAgreementAuditingVo();
                contractAgreementAuditingVo1.setCaa_id(contractAgreementAuditingVo.getCaa_id());
                contractAgreementAuditingVo1.setCaa_state(AppConfig.CAA_STATE_4);
                this.updateContractAgreementAuditing(contractAgreementAuditingVo1);
            }
        }

        // 【更新合同业务信息】
        if (isApp) {
            contractBody.setContractBody_RentRate_A(0);
            contractBody.setContractBody_RentRate_B(100);
        }
        //【免租期后约定还款日算法】
        if ("0".equals(contractBody.getContractBody_AgreedRepayTime())) {
            String[] timeFree = contractBody.getContractBody_FreeTime().split("\\|");
            int day1 = 0;
            int day2 = 0;
            int day3 = 0;
            int day4 = 0;
            int day5 = 0;
            StringBuilder repayTime1 = new StringBuilder();
            for (int i = 0; i < timeFree.length; i++) {
                Calendar now = Calendar.getInstance();
                now.setTime(new Date());
                switch ((i + 1)) {
                    case 1:
                        now.add(Calendar.DAY_OF_YEAR, Integer.valueOf(timeFree[i]));
                        day1 = Integer.valueOf(timeFree[i]);
                        repayTime1.append(Integer.valueOf(now.get(Calendar.DAY_OF_MONTH)).toString()).append("|");
                        break;
                    case 2:
                        now.add(Calendar.YEAR, i);//增加一年
                        if (contractBody.getContractBody_ContractMode() == 1) {
                            now.add(Calendar.DAY_OF_YEAR, (day1 + Integer.valueOf(timeFree[i])));
                            day2 = Integer.valueOf(timeFree[i]);
                        } else {
                            now.add(Calendar.DAY_OF_YEAR, (Integer.valueOf(timeFree[i])));
                        }
                        repayTime1.append(Integer.valueOf(now.get(Calendar.DAY_OF_MONTH)).toString()).append("|");
                        break;
                    case 3:
                        now.add(Calendar.YEAR, i);//增加2年
                        if (contractBody.getContractBody_ContractMode() == 1) {
                            now.add(Calendar.DAY_OF_YEAR, (day1 + day2 + Integer.valueOf(timeFree[i])));
                            day3 = Integer.valueOf(timeFree[i]);
                        } else {
                            now.add(Calendar.DAY_OF_YEAR, (Integer.valueOf(timeFree[i])));
                        }
                        repayTime1.append(Integer.valueOf(now.get(Calendar.DAY_OF_MONTH)).toString()).append("|");
                        break;
                    case 4:
                        now.add(Calendar.YEAR, i);//增加3年
                        if (contractBody.getContractBody_ContractMode() == 1) {
                            now.add(Calendar.DAY_OF_YEAR, (day1 + day2 + day3 + Integer.valueOf(timeFree[i])));
                            day4 = Integer.valueOf(timeFree[i]);
                        } else {
                            now.add(Calendar.DAY_OF_YEAR, (Integer.valueOf(timeFree[i])));
                        }
                        repayTime1.append(Integer.valueOf(now.get(Calendar.DAY_OF_MONTH)).toString()).append("|");
                        break;
                    case 5:
                        now.add(Calendar.YEAR, i);//增加4年
                        if (contractBody.getContractBody_ContractMode() == 1) {
                            day5 = Integer.valueOf(timeFree[i]);
                            now.add(Calendar.DAY_OF_YEAR, (day1 + day2 + day3 + day4 + Integer.valueOf(timeFree[i])));
                        } else {
                            now.add(Calendar.DAY_OF_YEAR, (Integer.valueOf(timeFree[i])));
                        }
                        repayTime1.append(Integer.valueOf(now.get(Calendar.DAY_OF_MONTH)).toString()).append("|");
                        break;
                }
            }
            contractBody.setContractBody_AgreedRepayTime(repayTime1.substring(0, repayTime1.length() - 1));
        }
        contractDao.updateContractBody(contractBody);

        // 【删除并添加新合同管家】
        UserCenterContractRelaEmpVo empVoMain = new UserCenterContractRelaEmpVo();
        if (employeeLists != null) {
            List<UserCenterContractRelaEmpVo> contractRelaEmpList = employeeLists.toJavaList(UserCenterContractRelaEmpVo.class);
            contractDao.deleteContractRaleEmp(contractObject.getContractObject_Id());
            for (UserCenterContractRelaEmpVo userCenterContractRelaEmpVo: contractRelaEmpList) {
                if (userCenterContractRelaEmpVo.getCre_role() == 1) {
                    empVoMain = userCenterContractRelaEmpVo;
                }
                userCenterContractRelaEmpVo.setContractObject_Id(contractObject.getContractObject_Id());
                contractDao.addContractRelaEmp(userCenterContractRelaEmpVo);
            }
        }

        // 【添加客户信息】
        if (customers != null) {
            List<UserCustomerRelationship> customerRelationshipList = customers.toJavaList(UserCustomerRelationship.class);
            customerService.deleteCustomerRelaContractInfo(contractObject.getContractObject_Code());
            for (UserCustomerRelationship customerRelationship: customerRelationshipList) {
                customerRelationship.setHi_code(contractObject.getHi_code());
                customerRelationship.setContractObject_code(contractObject.getContractObject_Code());
                customerRelationship.setCrc_state(1);
                customerRelationship.setCrc_time(new Date());
                customerRelationship.setEm_id(empVoMain.getEm_id());
                customerService.addCustomerRelaContractInfo(customerRelationship);
            }
        }

        // 更新客户状态
        UserCustomer userCustomer = new UserCustomer();
        userCustomer.setCc_code(contractObject.getContractObject_1st());
        userCustomer.setCc_state(1); // 有效客户
        customerService.updateCustomer(userCustomer);

        // 【更新合同图片】
        if (contractImages != null) {
            List<ContractImageVo> contractImageList = contractImages.toJavaList(ContractImageVo.class);
            ContractImageVo contractImageVo0 = new ContractImageVo();
            contractImageVo0.setContractObject_Code(contractObject.getContractObject_Code());
            contractImageVo0.setCi_type("HTZ");
            this.deleteContractImage(contractImageVo0);
            for (ContractImageVo contractImageVo: contractImageList) {
                contractImageVo.setContractObject_Code(contractObject.getContractObject_Code());
                contractImageVo.setCi_state(1);
                contractImageVo.setCi_createTime(new Date());
                this.addContractImage(contractImageVo);
            }
        }

        // 【执行合同继承】
        ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
        contractVo.setHi_code(contractObject.getHi_code());
        contractVo.setContractObject_Type(contractObject.getContractObject_Type());
        this.callContractSuccessor(contractVo);

        // 【续约拷贝数据】
        if (contractObject.getContractObject_ExtState() == 12 || contractObject.getContractObject_ExtState() == 22) {
            // 查询上份合同
            ContractObjectVo contractObject3 = new ContractObjectVo();
            contractObject3.setContractObject_Id(contractObject.getContractObject_Successor());
            contractObject3 = this.queryContractObject(contractObject3);

            if (contractObject3 != null) {
                HandoverPropertyMainVo propertyMainVo = new HandoverPropertyMainVo();
                propertyMainVo.setContractObject_code(contractObject3.getContractObject_Code());
                propertyMainVo = propertyTransferService.queryHandoverPropertyMain(propertyMainVo);

                if (propertyMainVo != null) {
                    // 拷贝第一步
                    HandoverPropertyMainVo propertyMainNew = new HandoverPropertyMainVo();
                    propertyMainNew.setHpm_code(AppUtil.getOrderCode("HOP"));
                    propertyMainNew.setHi_code(propertyMainVo.getHi_code());
                    propertyMainNew.setContractObject_code(contractObject.getContractObject_Code());
                    propertyMainNew.setHpm_type(propertyMainVo.getHpm_type());
                    propertyMainNew.setHpm_handoverPersonIn(propertyMainVo.getHpm_handoverPersonIn());
                    propertyMainNew.setHpm_handoverDateIn(propertyMainVo.getHpm_handoverDateIn());
                    propertyMainNew.setHpm_handoverPersonOut(propertyMainVo.getHpm_handoverPersonOut());
                    propertyMainNew.setHpm_handoverDateOut(propertyMainVo.getHpm_handoverDateOut());
                    propertyMainNew.setHpm_state(0);
                    propertyMainNew.setHpm_createTime(new Date());
                    propertyTransferService.addHandoverPropertyMain(propertyMainNew);

                    // 【2.1查询能源卡数值】
                    HandoverPropertyEnergyValueVo energyValueVo = new HandoverPropertyEnergyValueVo();
                    energyValueVo.setHpm_id(propertyMainVo.getHpm_id());
                    List<HandoverPropertyEnergyValueVo> energyValueVos = propertyTransferService.queryHandoverPropertyEnergyValueList(energyValueVo);
                    for (HandoverPropertyEnergyValueVo handoverPropertyEnergyValueVo: energyValueVos) {
                        handoverPropertyEnergyValueVo.setHpm_id(propertyMainNew.getHpm_id());
                        propertyTransferService.addHandPropertyEnergyValue(handoverPropertyEnergyValueVo);
                    }

                    // 【3.0查询交接物品配置信息】
                    HandoverPropertyGoodsVo propertyGoodsVo = new HandoverPropertyGoodsVo();
                    propertyGoodsVo.setHpm_id(propertyMainVo.getHpm_id());
                    List<HandoverPropertyGoodsVo> goodsVos = propertyTransferService.queryHandoverPropertyGoodsList(propertyGoodsVo);
                    for (HandoverPropertyGoodsVo handoverPropertyGoodsVo: goodsVos) {
                        handoverPropertyGoodsVo.setHpm_id(propertyMainNew.getHpm_id());
                        handoverPropertyGoodsVo.setHpg_createTime(new Date());
                        propertyTransferService.addHandPropertyGoods(handoverPropertyGoodsVo);
                    }

                    // 【4.0查询交接装饰情况信息】
                    HandoverPropertyDecorationVo propertyDecorationVo = new HandoverPropertyDecorationVo();
                    propertyDecorationVo.setHpm_id(propertyMainVo.getHpm_id());
                    List<HandoverPropertyDecorationVo> decorationVos = propertyTransferService.queryHandoverPropertyDecorationList(propertyDecorationVo);
                    for (HandoverPropertyDecorationVo handoverPropertyDecorationVo: decorationVos) {
                        handoverPropertyDecorationVo.setHpm_id(propertyMainNew.getHpm_id());
                        handoverPropertyDecorationVo.setHpd_createTime(new Date());
                    }
                }
            }
        }

        ViewHouseLibraryInfoVo houseLibraryInfo = houseLibraryService.queryHouseLibraryInfo(contractObject.getHi_code());

        // 改变房屋状态（托管、租赁）
        HouseInfoKeep informationKeep = new HouseInfoKeep();
        informationKeep.setHi_code(contractObject.getHi_code());
        if (AppConfig.TYPE_CONTRACT_201.equals(contractObject.getContractObject_Type())) {
            // 更新库存房源合同状态
            informationKeep.setContract_intoStatus(AppConfig.contract_outStatus_2);
            houseLibraryService.updateHouseContractState(informationKeep);

            // 更新房屋管家
            PositionRecordVo positionRecordVo = new PositionRecordVo();
            positionRecordVo.setHi_code(contractObject.getHi_code());
            positionRecordVo = houseLibraryService.queryContractPositionRecord(positionRecordVo);
            if (positionRecordVo == null) {
                positionRecordVo = new PositionRecordVo();
                positionRecordVo.setHi_code(contractObject.getHi_code());
                positionRecordVo.setHpr_emp(empVoMain.getEm_id());
                positionRecordVo.setHpr_newEmp(empVoMain.getEm_id());
                UserCenterEmployee userCenterEmployee = new UserCenterEmployee();
                userCenterEmployee.setEm_id(empVoMain.getEm_id());
                List<UserCenterEmployee> userCenterEmployees = employeeService.selectCompanyID(userCenterEmployee);
                if (!userCenterEmployees.isEmpty()) {
                    positionRecordVo.setUcc_id(userCenterEmployees.get(0).getUcc_id());
                }
                houseLibraryService.addHousePositionRecord(positionRecordVo);
            } else {
                PositionRecordVo positionRecordVo1 = new PositionRecordVo();
                positionRecordVo1.setHpr_id(positionRecordVo.getHpr_id());
                positionRecordVo1.setHpr_newEmp(empVoMain.getEm_id());
                houseLibraryService.updateHousePositionRecord(positionRecordVo1);
            }

            // 【更新合同订单账单】
            ContractOrderVo contractOrderVo = this.addContractOrderService(contractObject.getContractObject_Code());
            if (contractOrderVo == null) {
                throw new AppException("生成合同订单失败，请联系管理员");
            }

            // 【生成合同账单】
            this.addContractBill(contractOrderVo, contractBody.getContractBody_ContractMode());
        }

        // 保存包修费、服务费
        ServiceCharge serviceCharge = new ServiceCharge();
        serviceChargeService.delServiceCharge(contractObject.getContractObject_Code());
        Date startDate = contractObject.getContractObject_Date();
        Date endDate = contractObject.getContractObject_DeadlineTime();
        serviceChargeService.delServiceCharge(contractObject.getContractObject_Code());
        if (AppConfig.TYPE_CONTRACT_201.equals(contractObject.getContractObject_Type())) {
            if (AppUtil.isNotNull(contractBody.getContractBody_GuaranteeCost())) {
                String[] guaranteeCostArr = contractBody.getContractBody_GuaranteeCost().split("\\|");
                double totalGuaranteeCost = 0.0;
                for (String aGuaranteeCostArr: guaranteeCostArr) {
                    if (Double.parseDouble(aGuaranteeCostArr) > 0) {
                        totalGuaranteeCost += Double.parseDouble(aGuaranteeCostArr);
                    }
                }
                if (totalGuaranteeCost >= 0.0) {
                    serviceCharge.setInit_serveMoney(totalGuaranteeCost);
                    serviceCharge.setUsed_serveMoney(0.0);
                    serviceCharge.setSurplus_serveMoney(totalGuaranteeCost);
                    serviceCharge.setAvailable_serveMoney(totalGuaranteeCost);
                    serviceCharge.setServeType(1);// 包修费
                    serviceCharge.setCon_code(contractObject.getContractObject_Code());
                    serviceCharge.setCc_code(contractObject.getContractObject_1st());
                    serviceCharge.setHi_code(contractObject.getHi_code());
                    serviceCharge.setEffective_date(startDate);
                    serviceCharge.setExpiry_date(endDate);
                    serviceChargeService.appAddServiceCharge(serviceCharge);
                }
            }

        } else if (AppConfig.TYPE_CONTRACT_202.equals(contractObject.getContractObject_Type())) {
            double serviceMoney = Double.parseDouble(Float.toString(contractBody.getContractBody_Service()));
            if (serviceMoney >= 0.0) {
                serviceCharge.setInit_serveMoney(serviceMoney >= 300 ? 300 : serviceMoney);
                serviceCharge.setUsed_serveMoney(0.0);
                serviceCharge.setSurplus_serveMoney(serviceMoney >= 300 ? 300 : serviceMoney);
                serviceCharge.setAvailable_serveMoney(serviceMoney >= 300 ? 300 : serviceMoney);
                serviceCharge.setServeType(2);// 服务费
                serviceCharge.setCon_code(contractObject.getContractObject_Code());
                serviceCharge.setCc_code(contractObject.getContractObject_1st());
                serviceCharge.setHi_code(contractObject.getHi_code());
                serviceCharge.setEffective_date(startDate);
                serviceCharge.setExpiry_date(endDate);
                serviceChargeService.appAddServiceCharge(serviceCharge);
            }
        }

        if (AppConfig.TYPE_CONTRACT_202.equals(contractObject.getContractObject_Type())) {
            // 改变库存/出房房源出房状态
            informationKeep.setContract_outStatus(AppConfig.contract_outStatus_2);
            housingAllocationService.updateHouseContractState(informationKeep);
            houseLibraryService.updateHouseContractState(informationKeep);

            if (contractObject.getContractObject_ExtState() != 12 && contractObject.getContractObject_ExtState() != 22) {
                // 是否是指定的房屋类型
                HouseHouseInformation houseInformation = new HouseHouseInformation();
                houseInformation.setHi_code(contractObject.getHi_code());
                // 是否为公寓，公寓只需改存房的扩展状态，不是则存出房都要改
                boolean boo = housingAllocationService.isAppointHouseType(informationKeep);
                if (boo) {
                    // 【存房】
                    HouseHouseInformation information = houseLibraryService.selectHouseByName(houseInformation);
                    if (information != null) {
                        HouseExtendedVo extendedVo = new HouseExtendedVo();
                        extendedVo.setHe_id(information.getHe_id());
                        extendedVo.setHe_state("rental"); // 已租
                        housingAllocationService.updateHouseExtendedState(extendedVo);
                    }
                } else {
                    // 【存房】
                    HouseExtendedVo extendedVo = new HouseExtendedVo();
                    extendedVo.setHe_state("rental"); // 已租
                    HouseHouseInformation information = houseLibraryService.selectHouseByName(houseInformation);
                    if (information != null) {
                        extendedVo.setHe_id(information.getHe_id());
                        housingAllocationService.updateHouseExtendedState(extendedVo);
                        // 【出房】
                        information = housingAllocationService.selectHouseByName(contractObject.getHi_code());
                        if (information != null) {
                            extendedVo.setHe_id(information.getHe_id());
                            housingAllocationService.updateHouseExtendedState(extendedVo);
                        }
                    }
                }
            }

            //【生成合同订单】
            ContractOrderVo contractOrderVo = this.addContractOrderService(contractObject.getContractObject_Code());
            if (contractOrderVo == null) {
                throw new AppException("生成合同订单失败，请联系管理员");
            }

            //【生成合同账单】
            this.addContractBill(contractOrderVo, contractBody.getContractBody_ContractMode());

            // 【特价处理】
            if (houseLibraryInfo.getHi_boolActive() != null && houseLibraryInfo.getHi_boolActive() == 1) {
                if (AppConfig.TYPE_CONTRACT_202.equals(contractObject.getContractObject_Type())) {
                    updateActiveBill(contractObject.getContractObject_Code(), houseLibraryInfo.getPst_id(), houseLibraryInfo.getPst_money());
                }
            }
        }

        // 更新房源产权地址
        if (houseLibraryInfo != null) {
            HouseExtendedVo extendedVo = new HouseExtendedVo();
            extendedVo.setHe_id(houseLibraryInfo.getHe_id());
            extendedVo.setHe_address(he_address);
            housingAllocationService.updateHouseExtendedState(extendedVo);
        }

        // 添加日志
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        this.addContractRecord(contractObject.getContractObject_Code(), "更新合同", employee != null ? employee.getEm_name() : "");

        contractVo = new ViewBusinessContractVo();
        contractVo.setContractObject_Code(contractObject.getContractObject_Code());
        contractVo = this.selectContractObjectByCNo(contractVo);

        // 【下架支付宝平台上该房屋】
        RentHouseVo rentHouseVo = rentHouseService.queryRentHouseVo(contractObject.getHi_code());
        if (null != rentHouseVo) {
            ViewHouseLibraryInfoVo houseLibraryInfoVo = houseLibraryService.queryHouseLibraryInfo(contractObject.getHi_code());
            rentHouseService.rentHouseStateSync(contractObject.getHi_code(), rentHouseVo.getRoom_code(), 0, 2, ("分散式".equals(houseLibraryInfoVo.getHis_name()) ? 1 : 2));
            rentHouseVo.setRoom_status(0);
            rentHouseService.updataRentHouseVo(rentHouseVo);
        }
        return contractVo;
    }

    /**
     * 【业务操作】更新合同附加信息
     *
     * @return
     * @Description:
     * @author JiangQt
     */
    public void updateContractAttachInfoService(JSONObject data) {
        ContractObjectVo contractObject = data.getJSONObject("contractObject").toJavaObject(ContractObjectVo.class);
        UserCenterContractBody contractBody = data.getJSONObject("contractBody").toJavaObject(UserCenterContractBody.class);
        List<ContractImageVo> contractImages = data.getJSONArray("contractImages").toJavaList(ContractImageVo.class);

        // 【更新合同对象】
        contractObject.setContractObject_UpdateTime(new Date());
        contractDao.updateContractObject(contractObject);

        // 【查询合同信息】
        contractObject = this.queryContractObject(contractObject.getContractObject_Code());

        // 产权地址
        String he_address = contractObject.getHe_address();

        // 更新合同图片
        if (contractImages != null) {
            ContractImageVo contractImageVo0 = new ContractImageVo();
            contractImageVo0.setContractObject_Code(contractObject.getContractObject_Code());
            this.deleteContractImage(contractImageVo0);
            for (ContractImageVo contractImageVo: contractImages) {
                contractImageVo.setContractObject_Code(contractObject.getContractObject_Code());
                contractImageVo.setCi_state(1);
                contractImageVo.setCi_createTime(new Date());
                this.addContractImage(contractImageVo);
            }
        }

        BillBusinessBillVo businessBillVo = JSONObject.parseObject((String) data.get("businessBill"), BillBusinessBillVo.class);
        if (businessBillVo != null) {
            if (StringUtils.isEmpty(businessBillVo.getBbb_id())) {
                double orderCost = businessBillVo.getBbb_repayment();
                Integer bbb_applyPerson = null;
                ViewBusinessContractRelaEmpVo contractRelaEmpVo = new ViewBusinessContractRelaEmpVo();
                contractRelaEmpVo.setContractObject_Id(contractObject.getContractObject_Id());
                List<ViewBusinessContractRelaEmpVo> contractRelaEmp = contractDao.queryViewContractRelaEmp(contractRelaEmpVo);
                for (ViewBusinessContractRelaEmpVo viewBusinessContractRelaEmpVo: contractRelaEmp) {
                    if (viewBusinessContractRelaEmpVo.getCre_role() == 1) {
                        bbb_applyPerson = viewBusinessContractRelaEmpVo.getEm_id();
                    }
                }
                businessBillVo = new BillBusinessBillVo();
                businessBillVo.setBbo_code(AppUtil.getOrderCode("BUS"));
                businessBillVo.setContractObject_code(contractObject.getContractObject_Code());
                businessBillVo.setHi_code(contractObject.getHi_code());
                businessBillVo.setBbo_type(110);
                businessBillVo.setBbb_balPay(0);
                businessBillVo.setBbb_repayment(orderCost);
                businessBillVo.setBbb_repaymentDate(contractObject.getContractObject_Date());
                businessBillVo.setBbb_applyPerson(bbb_applyPerson);
                businessBillVo.setBbb_createTime(new Date());
                contractDao.addBusinessBill(businessBillVo);
            } else {
                contractDao.updateBusinessBill(businessBillVo);
            }
        }

        // 更新合同主体
        UserCenterContractBody userCenterContractBody = this.queryContractBody(contractObject.getContractObject_Code());
        if (userCenterContractBody != null) {
            if (contractBody != null) {
                contractBody.setContractBody_Id(userCenterContractBody.getContractBody_Id());
                contractDao.updateContractBody(contractBody);
            }
        }
        // 【添加合同管家】
        List<UserCenterContractRelaEmpVo> empVos = JSONObject.parseArray((String) data.get("employeeList"), UserCenterContractRelaEmpVo.class);
        if (empVos != null) {
            ContractObjectVo userCenterContractObject = new ContractObjectVo();
            userCenterContractObject.setContractObject_Id(contractObject.getContractObject_Id());
            List<ContractObjectVo> selectContractEm = contractDao.selectContractEm(userCenterContractObject); //根据合同编号查询将要分配的房源合同(结果包含主管家和副管家)

            ContractObjectVo contractObjectVo4 = new ContractObjectVo();
            contractObjectVo4.setContractObject_Id(contractObject.getContractObject_Id());
            ContractObjectVo contractObjectVo3 = contractDao.queryContractObject(contractObjectVo4);//查询合同
            for (ContractObjectVo contractObjectVo5: selectContractEm) {
                for (UserCenterContractRelaEmpVo userCenterContractRelaEmpVo: empVos) {
                    if (!contractObjectVo5.getCre_role().equals(userCenterContractRelaEmpVo.getCre_role())) {
                        continue;
                    }
                    if (contractObjectVo5.getEm_id().equals(userCenterContractRelaEmpVo.getEm_id())) {
                        continue;
                    }

                    // 传入合同id和管家删除合同管家关系数据
                    ContractObjectVo contractObjectVo2 = new ContractObjectVo();
                    contractObjectVo2.setContractObject_Id(contractObject.getContractObject_Id());
                    contractObjectVo2.setEm_id(contractObjectVo5.getEm_id());
                    contractDao.deleteContractEm(contractObjectVo2);
                    //插入新的管家
                    userCenterContractRelaEmpVo.setContractObject_Id(contractObject.getContractObject_Id());
                    contractDao.addContractRelaEmp(userCenterContractRelaEmpVo);
                    //记录执行记录
                    employeeService.addContractRecord(contractObjectVo3.getHi_code(), contractObjectVo3.getContractObject_Code(), 3, userCenterContractRelaEmpVo.getEm_id(), userCenterContractRelaEmpVo.getCir_author());
                    //更改管家后更新管家变更记录,执行记录,以及给客户发送短信
                    if (contractObjectVo5.getCre_role() == 1) {
                        //管家变更记录
                        employeeService.addHandoverRecord(contractObjectVo5.getEm_id(), userCenterContractRelaEmpVo.getEm_id(), contractObject.getContractObject_Id());
                        //托管合同最新管家变更和变更支付宝管家信息
                        employeeService.upHousePositionRecords(contractObjectVo3, userCenterContractRelaEmpVo.getEm_id(), contractObjectVo5.getEm_id());
                        //发送短信
                        employeeService.addUserCenterInformations(selectContractEm, contractObjectVo3, contractObjectVo5.getEm_id(), userCenterContractRelaEmpVo.getEm_id(), 1);
                    }

                }
            }
        }

        // 【添加客户信息】
        List<String> customers = JSONArray.parseArray((String) data.get("customers"), String.class);
        if (customers != null) {
            // 1.1 删除数据
            UserCustomerRelationship customerRelationship = new UserCustomerRelationship();
            customerRelationship.setContractObject_code(contractObject.getContractObject_Code());
            customerService.deleteCustomerRelaContractInfo(customerRelationship);
            // 1.2 添加数据
            for (int i = 0; i < customers.size(); i++) {
                customerRelationship = new UserCustomerRelationship();
                customerRelationship.setHi_code(contractObject.getHi_code());
                customerRelationship.setContractObject_code(contractObject.getContractObject_Code());
                customerRelationship.setCrc_state(1);
                customerRelationship.setCrc_time(new Date());
                customerRelationship.setCrc_role(i == 0 ? 0 : 1);
                customerRelationship.setCc_code(customers.get(i));
                customerRelationship.setEm_id(empVos.get(0).getEm_id());
                customerService.addCustomerRelaContractInfo(customerRelationship);
            }
        }

        // 更新房源产权地址
        ViewHouseLibraryInfoVo houseLibraryInfo = houseLibraryService.queryHouseLibraryInfo(contractObject.getHi_code());
        if (houseLibraryInfo != null && !StringUtils.isEmpty(he_address)) {
            HouseExtendedVo extendedVo = new HouseExtendedVo();
            extendedVo.setHe_id(houseLibraryInfo.getHe_id());
            extendedVo.setHe_address(he_address);
            housingAllocationService.updateHouseExtendedState(extendedVo);
        }

        //
        // // 更新客户联系人/室友
        // userCenterContractObjectDao.updateContractSginForAffi(JSONObject.parseObject(contractSign,
        // UserCenterContractSign.class));
        //
        // // 删除并添加合同管家
        // userCenterContractObjectDao.deleteContractRaleEmp(contractObject.getContractObject_Id());
        // List<UserCenterContractRelaEmpVo> parseArray =
        // JSONArray.parseArray(contractRelaEmpVos,
        // UserCenterContractRelaEmpVo.class);
        // for (UserCenterContractRelaEmpVo userCenterContractRelaEmpVo :
        // parseArray) {
        // userCenterContractRelaEmpVo.setContractObject_Id(contractObject.getContractObject_Id());
        // userCenterContractObjectDao.addContractRelaEmp(userCenterContractRelaEmpVo);
        // }
    }

    /**
     * 【业务操作】添加合同订单
     *
     * @param contractObject_Code 合同CODE
     * @return
     */
    private ContractOrderVo addContractOrderService(String contractObject_Code) {

        // 查询合同数据
        ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
        contractVo.setContractObject_Code(contractObject_Code);
        contractVo = this.selectContractObjectByCNo(contractVo);

        // 是否为托管合同
        int bco_type = AppConfig.ORDER_TYPE_201;
        if (AppConfig.TYPE_CONTRACT_202.equals(contractVo.getContractObject_Type())) {
            bco_type = AppConfig.ORDER_TYPE_202;
        }

        // 订单编号
        String bco_code = AppUtil.getOrderCode(bco_type);

        // 查询是否有订单
        ContractOrderVo contractOrderVo = new ContractOrderVo();
        contractOrderVo.setContractObject_code(contractVo.getContractObject_Code());
        contractOrderVo = financeManageService.queryFinanceOrder(contractOrderVo);
        if (contractOrderVo != null) {
            bco_code = contractOrderVo.getBco_code();
            // 删除旧合同订单
            financeManageService.deleteFinanceOrder(contractOrderVo.getBco_code());
        }
        // 查询管家信息
        ViewBusinessContractRelaEmpVo contractRelaEmpVo = new ViewBusinessContractRelaEmpVo();
        contractRelaEmpVo.setContractObject_Id(contractVo.getContractObject_Id());
        contractRelaEmpVo.setCre_role(1);
        List<ViewBusinessContractRelaEmpVo> contractRelaEmpList = this.queryViewContractRelaEmp(contractRelaEmpVo);

        // 查询用户数据
        UserCustomer customerInfo = customerService.queryCustomerInfo(contractVo.getContractObject_1st());

        // 添加合同订单
        ContractOrderVo contractOrderVo2 = new ContractOrderVo();
        contractOrderVo2.setBco_code(bco_code);
        contractOrderVo2.setHi_code(contractVo.getHi_code());
        contractOrderVo2.setContractObject_code(contractVo.getContractObject_Code());
        contractOrderVo2.setBco_orderType(AppConfig.order_type_1); // 合同订单
        switch (bco_type) {
            case AppConfig.ORDER_TYPE_201:
                contractOrderVo2.setBco_currentBalPay(1);
                break;
            case AppConfig.ORDER_TYPE_202:
                contractOrderVo2.setBco_currentBalPay(0);
                break;
        }
        contractOrderVo2.setBco_optionState(AppConfig.order_option_state_1);
        contractOrderVo2.setBco_type(bco_type);
        contractOrderVo2.setBco_cooperater(contractVo.getContractBody_PayType());
        contractOrderVo2.setBco_customer(customerInfo.getCc_code());
        contractOrderVo2.setBco_state(AppConfig.ORDER_STATE_1);
        contractOrderVo2.setBco_butler(!contractRelaEmpList.isEmpty() ? contractRelaEmpList.get(0).getEm_id() : null);
        contractOrderVo2.setBco_createTime(new Date());
        financeManageService.addContractOrder(contractOrderVo2);

        return financeManageService.queryFinanceOrder(bco_code);
    }

    /**
     * 添加合同账单
     *
     * @param contractOrderVo 合同订单对象
     * @param con_mode        合同模式
     */
    private void addContractBill(ContractOrderVo contractOrderVo, Integer con_mode) throws AppException {
        // 删除账单
        financeManageService.deleteFinanceBill(contractOrderVo.getBco_code());

        // 生成账单
        ArrayList<ContractBillVo> contractBillList = null;
        switch (contractOrderVo.getBco_type()) {
            case AppConfig.ORDER_TYPE_201:
                switch (con_mode) {
                    case 0:
                        contractBillList = this.addContractBillForTG(contractOrderVo, null);
                        break;
                    case 1:
                        contractBillList = this.addContractBillForTGNew(contractOrderVo, null);
                        break;
                }
                break;
            case AppConfig.ORDER_TYPE_202:
                contractBillList = this.addContractBillForZL(contractOrderVo);
                break;
        }
        if (contractBillList == null) {
            throw new AppException("添加合同账单失败，请重试或联系管理员");
        }

        // 排序
        contractBillList.sort(Comparator.comparing(ContractBillVo::getBcb_cycle));

        // 添加账单
        int current_cycle = -1; // 当前期数
        int total_cycle = 0;    // 总期数
        for (ContractBillVo contractBillVo: contractBillList) {
            current_cycle = current_cycle == -1 ? contractBillVo.getBcb_cycle() : current_cycle;
            total_cycle++;
            financeManageService.addContractBill(contractBillVo);
        }

        // 更新订单->当前期数，总期数
        ContractOrderVo contractOrderVo1 = new ContractOrderVo();
        contractOrderVo1.setBco_code(contractOrderVo.getBco_code());
        contractOrderVo1.setBco_currentCycle(current_cycle);
        contractOrderVo1.setBco_totalCycle(total_cycle);
        financeManageService.updateFinanceOrder(contractOrderVo1);
    }

    /**
     * 【业务操作】添加托管合同账单服务
     *
     * @param contractOrderVo 合同订单对象
     * @return 消息对象
     * @throws Exception
     * @作者 JiangQT
     * @日期 2016年12月9日
     */
    public ArrayList<ContractBillVo> addContractBillForTG(ContractOrderVo contractOrderVo, String pay_cycle) {
        ArrayList<ContractBillVo> contractBillList = new ArrayList<>();

        ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
        contractVo.setContractObject_Code(contractOrderVo.getContractObject_code());
        contractVo = this.selectContractObjectByCNo(contractVo);

        // 押金,续约存房没有押金
        double pay = (contractVo.getContractObject_ExtState() == 12 || contractVo.getContractObject_ExtState() == 22) ? 0 : contractVo.getContractBody_Pay();
        // 定金
        double depslit = StringUtils.isEmpty(contractVo.getContractBody_Depslit()) ? 0 : contractVo.getContractBody_Depslit();
        // 租金递增
        String increasing = contractVo.getContractBody_Increasing();
        // 租金递增数组
        String[] incres = increasing.replaceAll("%", "").split("\\|");
        // 免租期
        String[] freeTimes = contractVo.getContractBody_FreeTime().split("\\|");
        // 保修费
        String[] guaranteeCosts = contractVo.getContractBody_GuaranteeCost().split("\\|");
        // 服务费
        double service = contractVo.getContractBody_Service();
        // 是否打包年付
        boolean isRentFreeMode = contractVo.getContractObject_RentFreeMode() == 1;
        // 原始租金
        double oldRent = isRentFreeMode ? (contractVo.getContractBody_Rent() / 12) : contractVo.getContractBody_Rent();
        // 支付方式（月付、季付、半年付、年付）
        String payStyle = StringUtils.isEmpty(pay_cycle) ? contractVo.getContractBody_PayStyle() : pay_cycle;

        // 合同起止日期
        Date startDate = contractVo.getContractObject_Date();
        Date endDate = contractVo.getContractObject_DeadlineTime();

        if ("收租宝".equals(contractVo.getContractBody_PayType())) {
            double totalFreeTime = 0;
            for (String freeTime: freeTimes) {
                totalFreeTime += Double.valueOf(freeTime);
            }
            int freeTimeMonth = (int) (totalFreeTime / 30);
            int freeTimeDay = (int) (totalFreeTime % 30);
            Calendar c = Calendar.getInstance();
            c.setTime(endDate);
            c.add(Calendar.MONTH, -freeTimeMonth);
            c.add(Calendar.DATE, -freeTimeDay);
            endDate = c.getTime();
            freeTimes = new String[0];
        }
        JSONObject mapMonth = AppUtil.getBusinessMonth(startDate, endDate);
        // 总月数
        int totalMonth = mapMonth.getInteger("month");
        // 余月
        int remainMonth = 0;
        // 余天
        int remainDay = mapMonth.getInteger("day");
        // 还款期数
        int cycleCount = 0;
        // 还款方式月份 1 3 6 12
        int cycleType = 0;
        // 是否月付
        boolean isMonthPay = false;

        if ("月付".equals(payStyle)) {
            cycleCount = totalMonth;
            cycleType = 1;
            isMonthPay = true;
        }
        if ("季付".equals(payStyle)) {
            cycleCount = totalMonth / 3;
            remainMonth = totalMonth % 3;
            cycleType = 3;
        }
        if ("半年付".equals(payStyle)) {
            cycleCount = totalMonth / 6;
            remainMonth = totalMonth % 6;
            cycleType = 6;
        }
        if ("年付".equals(payStyle)) {
            cycleCount = totalMonth / 12;
            remainMonth = totalMonth % 12;
            cycleType = 12;
        }
        if (2 != contractVo.getContractBody_FinalBillMerge() && (remainMonth > 0 || remainDay > 0)) {
            cycleCount++;
        }

        // 上一期缓存租金
        double cacheRent = 0;
        // 循环年周期值
        int fullYear = 0;
        // 缓存全年
        int cacheFullYear = 0;
        // 第0期
        if (contractVo.getContractObject_ExtState() != 12 && contractVo.getContractObject_ExtState() != 22 && pay != 0) {
            ContractBillVo contractBillVo = new ContractBillVo();
            contractBillVo.setBcb_code(AppUtil.getOrderCode("210"));
            contractBillVo.setBco_code(contractOrderVo.getBco_code());
            contractBillVo.setBcb_cycle(0);
            contractBillVo.setBcb_type(AppConfig.CONTRACT_BILL_TYPE_1);
            contractBillVo.setBcb_balPay(1); // 收支(0：收、1：支；相对公司而言）
            contractBillVo.setBcb_repayment(new BigDecimal(pay));
            contractBillVo.setBcb_repaymentDate(AppUtil.setBillDate(startDate));
            contractBillVo.setBcb_startDate(AppUtil.setBillDate(startDate));
            if (depslit > pay) {
                contractBillVo.setBcb_realPayment(new BigDecimal(pay));
                contractBillVo.setBcb_realPaymentDate(AppUtil.setBillDate(startDate));
            }
            contractBillVo.setBcb_state(depslit > pay ? AppConfig.order_option_state_3 : AppConfig.order_option_state_2);
            contractBillVo.setBcb_createTime(new Date());
            contractBillList.add(contractBillVo);
        }
        // 日期
        Calendar c = Calendar.getInstance();
        c.setTime(startDate);
        for (int i = 1; i <= cycleCount; i++) {
            ContractBillVo contractBillVo = new ContractBillVo();
            contractBillVo.setBco_code(contractOrderVo.getBco_code());

            // 年索引
            int index = cacheFullYear / 12;

            // 【租金递增】 每年第一期
            if (fullYear == 0) {
                switch (incres.length) {
                    case 0:
                        break;
                    case 1:
                        double incresRent = Double.valueOf(incres[0]);
                        if (increasing.contains("%")) {
                            oldRent = Math.rint(oldRent * (1 + ArithUtil.math_divide(incresRent, 100).doubleValue()));
                        } else {
                            oldRent = oldRent + incresRent;
                        }
                        break;
                    default:
                        int len = incres.length - 1;
                        incresRent = Double.valueOf(incres[index > len ? len : index]);
                        if (increasing.contains("%")) {
                            oldRent = Math.rint(oldRent * (1 + ArithUtil.math_divide(incresRent, 100).doubleValue()));
                        } else {
                            oldRent = oldRent + incresRent;
                        }
                        break;
                }
            }

            /* 【免租金额】 */
            // --免租期计算方式：(原始租金*(1+租金递增比例))/30*免租期值=免租期金额
            // --缓存免租期
            int cacheFreeTime = 0;
            double freeRent = 0;
            // 非打包年付
            if (!isRentFreeMode) {
                int freeTimesIndex = freeTimes.length - 1;
                cacheFreeTime = index > freeTimesIndex ? 0 : Integer.valueOf(freeTimes[index]);
                freeRent = oldRent / 30 * cacheFreeTime;
            }

            // 【包修费】
            double guaranteeMoney = index > (guaranteeCosts.length - 1) ? 0 : Integer.valueOf(guaranteeCosts[index]);

            // 结果租金：未租金加成[付给房东的钱 = 旧租金 * 期数 - 免租费 - 管理费 - 保修费 -（第一期?保证金:0）]
            double resultOldRent = oldRent * cycleType - freeRent - service - guaranteeMoney;

            // 【租金加成】
            double newRent = oldRent;
            String rentPlus = contractVo.getContractBody_RentPlus();
            if (!StringUtils.isEmpty(rentPlus)) {
                if (rentPlus.contains("+")) {
                    // 如果月付，第一期和每年第一期，结果租金大于0并且缓存免租期小于30天，则计算[实际非免租期天数]的租金加成。{[计算方式][加成金额/30*(30-免租期)]}
                    double plus = Double.valueOf(rentPlus.replace("+", ""));
                    if (isMonthPay && (i == 1 || fullYear == 0) && resultOldRent >= 0) {
                        if (cacheFreeTime <= 30) {
                            newRent = ArithUtil.math_add(oldRent, ((plus / 30) * (30 - cacheFreeTime))).doubleValue();
                        }
                    } else {
                        newRent = ArithUtil.math_add(oldRent, plus).doubleValue();
                    }
                } else if (rentPlus.contains("%")) {
                    double rentPlus_money = Double.valueOf(rentPlus.replaceAll("%", ""));
                    if (rentPlus_money <= 0) {
                        newRent = oldRent;
                    } else {
                        newRent = oldRent * (ArithUtil.math_divide(Double.valueOf(rentPlus.replaceAll("%", "")), 100)).doubleValue();
                    }
                } else {
                    newRent = oldRent;
                }
            }
            // 结果租金：已租金加成 【第一期】
            double resultNewRent = (isRentFreeMode ? contractVo.getContractBody_Rent() : newRent * cycleType) - freeRent - service - guaranteeMoney;// +(i==1?pay:0);

            /* ====【租金计算】==== */

            // #第一期
            if (i == 1 && i != cycleCount) {
                if (isRentFreeMode) {
                    // 打包年付
                    contractBillVo.setBcb_repayment(new BigDecimal(resultNewRent));
                } else {
                    if (resultOldRent < 0) {
                        // 如果首期账单金额小于0，则该期数账单金额为0；欠的部分延至下一期
                        cacheRent = Math.abs(resultOldRent);
                        contractBillVo.setBcb_repayment(new BigDecimal(0));
                    } else {
                        contractBillVo.setBcb_repayment(ArithUtil.round(resultNewRent, 2));
                    }
                }
            }
            // #第二期至倒数第二期
            if (i != 1 && i != cycleCount) {
//                c.add(Calendar.MONTH, mounth);
                if (fullYear == 0) {
                    // 每年第一期
                    if (resultOldRent < 0) {
                        // 如果首期账单金额小于0，则该期数账单金额为0；欠的部分延至下一期
                        cacheRent = Math.abs(resultOldRent);
                        contractBillVo.setBcb_repayment(new BigDecimal(0));
                    } else {
                        contractBillVo.setBcb_repayment(ArithUtil.round(resultNewRent, 2));
                    }
                } else {
                    // 正常期数
                    double everyRent = newRent * cycleType - cacheRent;
                    if (everyRent < 0) {
                        // 如果首期账单金额小于0，则该期数账单金额为0；欠的部分延至下一期
                        cacheRent = Math.abs(everyRent);
                        contractBillVo.setBcb_repayment(new BigDecimal(0));
                    } else {
                        cacheRent = 0;
                        contractBillVo.setBcb_repayment(ArithUtil.round(everyRent, 2));
                    }
                }
            }
            // #最后一期
            if (i == cycleCount) {
//                c.add(Calendar.MONTH, mounth);// 当前期数日期 = 前一期日期 + 期数// 非打包年付
                if (isRentFreeMode) {
                    contractBillVo.setBcb_repayment(new BigDecimal(0));
                } else {
                    double extendMoney = 0;
                    if (fullYear == 0) {
                        extendMoney = freeRent - service - guaranteeMoney;
                    }
                    int newCycleType = (remainMonth != 0 || remainDay != 0) ? remainMonth : cycleType;
                    contractBillVo.setBcb_repayment(ArithUtil.round(newRent * newCycleType + (newRent / 30 * remainDay) - extendMoney, 2));
                }
            }
            //【约定还款时间】
            if (i == 1) {
                contractBillVo.setBcb_startDate(AppUtil.setBillDate(startDate));
                Calendar calendar = Calendar.getInstance();
                calendar.setTime(startDate);
                calendar.add(Calendar.DAY_OF_MONTH, Integer.valueOf(freeTimes[0]));
                contractBillVo.setBcb_repaymentDate(AppUtil.setBillDate(calendar.getTime()));
                c.add(Calendar.MONTH, cycleType);
                contractBillVo.setBcb_endDate(AppUtil.calendayDate(c.getTime(), Calendar.DATE, -1).getTime());
            } else {
                if (fullYear == 0 && cacheFreeTime != 0) {
                    // 每年首期账单支付日期要根据免租期延后。例当期日期2016.05.20，but免租期30天，so当期实际日期为2016.06.19
                    contractBillVo.setBcb_startDate(AppUtil.setBillDate(c.getTime()));
                    Calendar calendar = Calendar.getInstance();
                    calendar.setTime(c.getTime());
                    if (cacheFreeTime >= 28) {
                        calendar.add(Calendar.MONTH, 1);
                    } else {
                        calendar.add(Calendar.DAY_OF_MONTH, cacheFreeTime);
                    }
                    contractBillVo.setBcb_repaymentDate(AppUtil.setBillDate(calendar.getTime()));
                    c.add(Calendar.MONTH, cycleType);
                    if (i == cycleCount) {
                        contractBillVo.setBcb_endDate(endDate);
                    } else {
                        contractBillVo.setBcb_endDate(AppUtil.calendayDate(c.getTime(), Calendar.DATE, -1).getTime());
                    }
                } else {
                    contractBillVo.setBcb_startDate(AppUtil.setBillDate(c.getTime()));
                    contractBillVo.setBcb_repaymentDate(AppUtil.setBillDate(c.getTime()));
                    c.add(Calendar.MONTH, cycleType);
                    if (i == cycleCount) {
                        contractBillVo.setBcb_endDate(endDate);
                    } else {
                        contractBillVo.setBcb_endDate(AppUtil.calendayDate(c.getTime(), Calendar.DATE, -1).getTime());
                    }
                }
//                }
            }

            contractBillVo.setBcb_cycle(i);
            contractBillVo.setBcb_type(AppConfig.CONTRACT_BILL_TYPE_0);
            contractBillVo.setBcb_balPay(1); // 收支(0：收、1：支；相对公司而言）
            contractBillVo.setBcb_state(AppConfig.order_option_state_1);
            contractBillVo.setBcb_createTime(new Date());
            contractBillVo.setBcb_code(AppUtil.getOrderCode("210"));
            contractBillList.add(contractBillVo);

            cacheFullYear += cycleType;
            fullYear += cycleType;
            if (fullYear >= 12) fullYear = 0;
        }

        return contractBillList;
    }

    /**
     * 添加托管合同账单服务NEW
     *
     * @param contractOrderVo 合同订单对象
     * @throws Exception
     */
    public ArrayList<ContractBillVo> addContractBillForTGNew(ContractOrderVo contractOrderVo, String pay_cycle) {
        ArrayList<ContractBillVo> contractBillList = new ArrayList<>();

        ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
        contractVo.setContractObject_Code(contractOrderVo.getContractObject_code());
        contractVo = this.selectContractObjectByCNo(contractVo);

        // 押金,续约存房没有押金
        double pay = (contractVo.getContractObject_ExtState() == 12 || contractVo.getContractObject_ExtState() == 22) ? 0 : contractVo.getContractBody_Pay();
        // 定金
        double depslit = StringUtils.isEmpty(contractVo.getContractBody_Depslit()) ? 0 : contractVo.getContractBody_Depslit();
        // 租金递增
        String increasing = contractVo.getContractBody_Increasing();
        String[] incres = increasing.replaceAll("%", "").split("\\|");
        // 免租期
        String[] freeTimes = contractVo.getContractBody_FreeTime().split("\\|");
        // 保修费
        String[] guaranteeCosts = contractVo.getContractBody_GuaranteeCost().split("\\|");
        // 服务费
        double service = contractVo.getContractBody_Service();
        // 是否打包年付
        boolean isRentFreeMode = contractVo.getContractObject_RentFreeMode() == 1;
        // 原始租金
        double oldRent = isRentFreeMode ? (contractVo.getContractBody_Rent() / 12) : contractVo.getContractBody_Rent();
        // 支付方式（月付、季付、半年付、年付）
        String payStyle = StringUtils.isEmpty(pay_cycle) ? contractVo.getContractBody_PayStyle() : pay_cycle;

        // 合同起止日期
        Date startDate = contractVo.getContractObject_Date();
        Date endDate = contractVo.getContractObject_DeadlineTime();
        // 【添加免租期后，第一期账单开始日期】
        Calendar ca = Calendar.getInstance();
        ca.setTime(startDate);
        for (String freeTime1: freeTimes) {
            if (Integer.valueOf(freeTime1) >= 28) {
                ca.add(Calendar.MONTH, 1);
            } else {
                ca.add(Calendar.DAY_OF_MONTH, Integer.valueOf(freeTime1));
            }
        }
        Date ContractBill = ca.getTime();

        if ("收租宝".equals(contractVo.getContractBody_PayType())) {
            double totalFreeTime = 0;
            for (String freeTime: freeTimes) {
                totalFreeTime += Double.valueOf(freeTime);
            }
            int freeTimeMonth = (int) (totalFreeTime / 30);
            int freeTimeDay = (int) (totalFreeTime % 30);
            Calendar c = Calendar.getInstance();
            c.setTime(endDate);
            c.add(Calendar.MONTH, -freeTimeMonth);
            c.add(Calendar.DATE, -freeTimeDay);
            endDate = c.getTime();
            freeTimes = new String[0];
        }
        JSONObject mapMonth = AppUtil.getBusinessMonth(AppUtil.sdf_date.format(ContractBill), AppUtil.sdf_date.format(endDate));
        // 总月数
        int totalMonth = mapMonth.getIntValue("month");
        // 余月
        int remainMonth = 0;
        // 余天
        int remainDay = mapMonth.getIntValue("day");
        // 还款期数
        int cycleCount = 0;
        // 还款方式月份 1 3 6 12
        int cycleType = 0;
        // 是否月付
        boolean isMonthPay = false;

        if ("月付".equals(payStyle)) {
            cycleCount = totalMonth;
            cycleType = 1;
            isMonthPay = true;
        }
        if ("季付".equals(payStyle)) {
            cycleCount = totalMonth / 3;
            remainMonth = totalMonth % 3;
            cycleType = 3;
        }
        if ("半年付".equals(payStyle)) {
            cycleCount = totalMonth / 6;
            remainMonth = totalMonth % 6;
            cycleType = 6;
        }
        if ("年付".equals(payStyle)) {
            cycleCount = totalMonth / 12;
            remainMonth = totalMonth % 12;
            cycleType = 12;
        }
        if (2 != contractVo.getContractBody_FinalBillMerge() && (remainMonth > 0 || remainDay > 0)) {
            cycleCount++;
        }

        // 上一期缓存租金
        double cacheRent = 0;
        // 循环年周期值
        int fullYear = 0;
        // 缓存全年
        int cacheFullYear = 0;
        // 第0期
        if (contractVo.getContractObject_ExtState() != 12 && contractVo.getContractObject_ExtState() != 22 && pay != 0) {
            ContractBillVo contractBillVo = new ContractBillVo();
            contractBillVo.setBcb_code(AppUtil.getOrderCode("210"));
            contractBillVo.setBco_code(contractOrderVo.getBco_code());
            contractBillVo.setBcb_cycle(0);
            contractBillVo.setBcb_type(AppConfig.CONTRACT_BILL_TYPE_1);
            contractBillVo.setBcb_balPay(1); // 收支(0：收、1：支；相对公司而言）
            contractBillVo.setBcb_repayment(new BigDecimal(pay));
            contractBillVo.setBcb_repaymentDate(AppUtil.setBillDate(startDate));
            contractBillVo.setBcb_startDate(AppUtil.setBillDate(startDate));
            if (depslit > pay) {
                contractBillVo.setBcb_realPayment(new BigDecimal(pay));
                contractBillVo.setBcb_realPaymentDate(AppUtil.setBillDate(startDate));
            }
            contractBillVo.setBcb_state(depslit > pay ? AppConfig.order_option_state_3 : AppConfig.order_option_state_2);
            contractBillVo.setBcb_createTime(new Date());
            contractBillList.add(contractBillVo);
        }
        // 日期
        Calendar c = Calendar.getInstance();
        c.setTime(startDate);
        c.add(Calendar.DAY_OF_MONTH, Integer.valueOf(freeTimes[0]));
        for (int i = 1; i <= cycleCount; i++) {
            ContractBillVo contractBillVo = new ContractBillVo();
            contractBillVo.setBco_code(contractOrderVo.getBco_code());

            // 年索引
            int index = cacheFullYear / 12;

            // 【租金递增】 每年第一期
            if (fullYear == 0) {
                switch (incres.length) {
                    case 0:
                        break;
                    case 1:
                        double incresRent = Double.valueOf(incres[0]);
                        if (increasing.contains("%")) {
                            oldRent = Math.rint(oldRent * (1 + ArithUtil.math_divide(incresRent, 100).doubleValue()));
                        } else {
                            oldRent = oldRent + incresRent;
                        }
                        break;
                    default:
                        int len = incres.length - 1;
                        incresRent = Double.valueOf(incres[index > len ? len : index]);
                        if (increasing.contains("%")) {
                            oldRent = Math.rint(oldRent * (1 + ArithUtil.math_divide(incresRent, 100).doubleValue()));
                        } else {
                            oldRent = oldRent + incresRent;
                        }
                        break;
                }
            }

            // 【免租金额】
            // --免租期计算方式：(原始租金*(1+租金递增比例))/30*免租期值=免租期金额
            // --缓存免租期
            int cacheFreeTime = 0;
            double freeRent = 0;
            // 非打包年付
            if (!isRentFreeMode) {
                int freeTimesIndex = freeTimes.length - 1;
                cacheFreeTime = index > freeTimesIndex ? 0 : Integer.valueOf(freeTimes[index]);
                if (cacheFreeTime >= 28) {
                    cacheFreeTime=30;
                }
                freeRent = oldRent / 30 * cacheFreeTime;
            }

            // 【包修费】
            double guaranteeMoney = index > (guaranteeCosts.length - 1) ? 0 : Integer.valueOf(guaranteeCosts[index]);

            // 结果租金：未租金加成[付给房东的钱 = 旧租金 * 期数 - 免租费 - 管理费 - 保修费 -（第一期?保证金:0）]
//            double resultOldRent = oldRent * cycleType - freeRent - service - guaranteeMoney;
            double resultOldRent = oldRent * cycleType - service - guaranteeMoney;

            // 【租金加成】
            double newRent = oldRent;
            String rentPlus = contractVo.getContractBody_RentPlus();
            if (!StringUtils.isEmpty(rentPlus)) {
                if (rentPlus.contains("+")) {
                    // 如果月付，第一期和每年第一期，结果租金大于0并且缓存免租期小于30天，则计算[实际非免租期天数]的租金加成。{[计算方式][加成金额/30*(30-免租期)]}
                    double plus = Double.valueOf(rentPlus.replace("+", ""));
                    if (isMonthPay && (i == 1 || fullYear == 0) && resultOldRent >= 0) {
                        if (cacheFreeTime <= 30) {
//                            newRent = ArithUtil.math_add(oldRent, ((plus / 30) * (30 - cacheFreeTime))).doubleValue();
                            newRent = ArithUtil.math_add(oldRent, plus).doubleValue();
                        }
                    } else {
                        newRent = ArithUtil.math_add(oldRent, plus).doubleValue();
                    }
                } else if (rentPlus.contains("%")) {
                    double rentPlus_money = Double.valueOf(rentPlus.replaceAll("%", ""));
                    if (rentPlus_money <= 0) {
                        newRent = oldRent;
                    } else {
                        newRent = oldRent * (ArithUtil.math_divide(Double.valueOf(rentPlus.replaceAll("%", "")), 100)).doubleValue();
                    }
                } else {
                    newRent = oldRent;
                }
            }
            // 结果租金：已租金加成 【第一期】
//            double resultNewRent = (isRentFreeMode ? contractVo.getContractBody_Rent() : newRent * cycleType) - freeRent - service - guaranteeMoney;// +(i==1?pay:0);
            double resultNewRent = (isRentFreeMode ? contractVo.getContractBody_Rent() : newRent * cycleType) - service - guaranteeMoney;// +(i==1?pay:0);

            /* ====【租金计算】==== */

            // #第一期
            if (i == 1 && i != cycleCount) {
                if (isRentFreeMode) {
                    // 打包年付
                    contractBillVo.setBcb_repayment(new BigDecimal(resultNewRent));
                } else {
                    if (resultOldRent < 0) {
                        // 如果首期账单金额小于0，则该期数账单金额为0；欠的部分延至下一期
                        cacheRent = Math.abs(resultOldRent);
                        contractBillVo.setBcb_repayment(new BigDecimal(0));
                    } else {
                        contractBillVo.setBcb_repayment(ArithUtil.round(resultNewRent, 2));
                    }
                }
            }
            // #第二期至倒数第二期
            if (i != 1 && i != cycleCount) {
//                c.add(Calendar.MONTH, mounth);
                if (fullYear == 0) {
                    // 每年第一期
                    if (resultOldRent < 0) {
                        // 如果首期账单金额小于0，则该期数账单金额为0；欠的部分延至下一期
                        cacheRent = Math.abs(resultOldRent);
                        contractBillVo.setBcb_repayment(new BigDecimal(0));
                    } else {
                        contractBillVo.setBcb_repayment(ArithUtil.round(resultNewRent, 2));
                    }
                } else {
                    // 正常期数
                    double everyRent = newRent * cycleType - cacheRent;
                    if (everyRent < 0) {
                        // 如果首期账单金额小于0，则该期数账单金额为0；欠的部分延至下一期
                        cacheRent = Math.abs(everyRent);
                        contractBillVo.setBcb_repayment(new BigDecimal(0));
                    } else {
                        cacheRent = 0;
                        contractBillVo.setBcb_repayment(ArithUtil.round(everyRent, 2));
                    }
                }
            }
            // #最后一期
            if (i == cycleCount) {
//                c.add(Calendar.MONTH, mounth);// 当前期数日期 = 前一期日期 + 期数// 非打包年付
                if (isRentFreeMode) {
                    contractBillVo.setBcb_repayment(new BigDecimal(0));
                } else {
                    double extendMoney = 0;
                    /*if (fullYear == 0) {
                        extendMoney = freeRent - service - guaranteeMoney;
                    }*/
                    int newCycleType = (remainMonth != 0 || remainDay != 0) ? remainMonth : cycleType;
                    contractBillVo.setBcb_repayment(ArithUtil.round(newRent * newCycleType + (newRent / 30 * remainDay) - extendMoney, 2));
                }
            }

            //【约定还款时间】
            if (i == 1) {
                contractBillVo.setBcb_repaymentDate(AppUtil.setBillDate(c.getTime()));
                contractBillVo.setBcb_startDate(AppUtil.setBillDate(startDate));
                Calendar calendar = Calendar.getInstance();
                calendar.setTime(c.getTime());
                calendar.add(Calendar.MONTH, cycleType);
                if (cycleCount == 1) {
                    contractBillVo.setBcb_endDate(endDate);
                } else {
                    contractBillVo.setBcb_endDate(AppUtil.calendayDate(calendar.getTime(), Calendar.DATE, -1).getTime());
                }
            } else {
                if (fullYear == 0 && cacheFreeTime != 0) {
                    c.add(Calendar.MONTH, cycleType);
                    // 每年首期账单日期要根据免租期延后。例当期日期2016.05.20，but免租期30天，so当期实际日期为2016.06.19
                    contractBillVo.setBcb_startDate(AppUtil.setBillDate(c.getTime()));
                    Calendar calendar = Calendar.getInstance();
                    calendar.setTime(c.getTime());
                    if (cacheFreeTime >= 28) {
                        calendar.add(Calendar.MONTH, 1);
                    } else {
                        calendar.add(Calendar.DAY_OF_MONTH, cacheFreeTime);
                    }
                    calendar.add(Calendar.MONTH, cycleType);
                    if (i == cycleCount) {
                        contractBillVo.setBcb_endDate(endDate);
                    } else {
                        contractBillVo.setBcb_endDate(AppUtil.calendayDate(calendar.getTime(), Calendar.DATE, -1).getTime());
                    }
                    if (cacheFreeTime >= 28) {
                        c.add(Calendar.MONTH, 1);
                    } else {
                        c.add(Calendar.DAY_OF_MONTH, cacheFreeTime);
                    }
                    contractBillVo.setBcb_repaymentDate(AppUtil.setBillDate(c.getTime()));
                } else {
                    c.add(Calendar.MONTH, cycleType);
                    contractBillVo.setBcb_repaymentDate(AppUtil.setBillDate(c.getTime()));
                    contractBillVo.setBcb_startDate(AppUtil.setBillDate(c.getTime()));
                    Calendar calendar = Calendar.getInstance();
                    calendar.setTime(c.getTime());
                    calendar.add(Calendar.MONTH, cycleType);
                    if (i == cycleCount) {
                        contractBillVo.setBcb_endDate(endDate);
                    } else {
                        contractBillVo.setBcb_endDate(AppUtil.calendayDate(calendar.getTime(), Calendar.DATE, -1).getTime());
                    }
                }
            }

            contractBillVo.setBcb_cycle(i);
            contractBillVo.setBcb_type(AppConfig.CONTRACT_BILL_TYPE_0);
            contractBillVo.setBcb_balPay(1); // 收支(0：收、1：支；相对公司而言）
            contractBillVo.setBcb_state(AppConfig.order_option_state_1);
            contractBillVo.setBcb_createTime(new Date());
            contractBillVo.setBcb_code(AppUtil.getOrderCode("210"));
            contractBillList.add(contractBillVo);

            cacheFullYear += cycleType;
            fullYear += cycleType;
            if (fullYear >= 12) fullYear = 0;
        }
        return contractBillList;
    }

    /**
     * 【业务操作】添加租赁合同账单服务
     *
     * @param contractOrderVo 合同CODE
     * @return
     * @throws Exception
     * @作者 JiangQT
     * @日期 2016年12月9日
     */
    public ArrayList<ContractBillVo> addContractBillForZL(ContractOrderVo contractOrderVo) {
        ArrayList<ContractBillVo> contractBillList = new ArrayList<>();

        // 查询合同数据
        ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
        contractVo.setContractObject_Code(contractOrderVo.getContractObject_code());
        contractVo = this.selectContractObjectByCNo(contractVo);

        // 合同开始日期
        Date startDate = contractVo.getContractObject_Date();
        // 合同结束日期
        Date endDate = contractVo.getContractObject_DeadlineTime();
        // 获取合同月份
        JSONObject mapMonth = AppUtil.getBusinessMonth(startDate, endDate);
        // 总月数
        int totalMonth = mapMonth.getIntValue("month");
        // 余天
        int remainDay = mapMonth.getIntValue("day");
        // 余月
        int remainMonth = 0;
        // 总期数
        int totalCycle = 0;
        // 支付周期（1、3、6、12）
        int cycleMonth = 0;
        switch (contractVo.getContractBody_PayStyle()) {
            case AppConfig.con_pay_cycle_1:
                totalCycle = totalMonth;
                cycleMonth = 1;
                break;
            case AppConfig.con_pay_cycle_3:
                totalCycle = (int) Math.ceil(totalMonth / 3.0);
                remainMonth = totalMonth % 3;
                cycleMonth = 3;
                break;
            case AppConfig.con_pay_cycle_6:
                totalCycle = (int) Math.ceil(totalMonth / 6.0);
                remainMonth = totalMonth % 6;
                cycleMonth = 6;
                break;
            case AppConfig.con_pay_cycle_12:
                totalCycle = (int) Math.ceil(totalMonth / 12.0);
                remainMonth = totalMonth % 12;
                if (totalCycle != 0) cycleMonth = 12;
                break;
            case AppConfig.con_pay_cycle_all:
                totalCycle = 1;
                cycleMonth = totalMonth;
                break;
        }

        // 如果合同最后账单不合并 并且（余月或者余日不为零），则账单多一期
        /*if (!AppConfig.con_pay_cycle_all.equals(contractVo.getContractBody_PayStyle()) && (remainMonth != 0 || remainDay != 0)) {
            totalCycle++;
        }*/

        // 租金
        double newRent = contractVo.getContractBody_Rent();
        // 租金上涨
        String rentPlus = contractVo.getContractBody_RentPlus();
        if (!StringUtils.isEmpty(rentPlus) && rentPlus.contains("%")) {
            newRent = newRent * (1 + ArithUtil.math_divide(Double.valueOf(rentPlus.replaceAll("%", "")), 100).doubleValue());
        }
        // 服务费
        double service = contractVo.getContractBody_Service();
        // 押金，续约出房没有押金
        double pay = (contractVo.getContractObject_ExtState() == 12 || contractVo.getContractObject_ExtState() == 22) ? 0 : contractVo.getContractBody_Pay();

        // 自然年
        int fullYear = 0;
        // 累计月份
        int mounth = 0;
        for (int i = 0; i < totalCycle; i++) {
            ContractBillVo contractBillVo = new ContractBillVo();
            contractBillVo.setBco_code(contractOrderVo.getBco_code());

            Calendar c = Calendar.getInstance();
            c.setTime(startDate);
            // 第一期
            if (i == 0 && i != (totalCycle - 1)) {
                contractBillVo.setBcb_repayment(ArithUtil.scale(newRent * cycleMonth));
            }
            // 第二期至倒数第二期
            if (i > 0 && i != (totalCycle - 1)) {
                c.add(Calendar.MONTH, mounth);
                contractBillVo.setBcb_repayment(ArithUtil.scale(newRent * cycleMonth));
            }
            // 最后一期
            if (i == (totalCycle - 1)) {
                if (i != 0) {
                    c.add(Calendar.MONTH, mounth);
                }
                // 是否有余月
                cycleMonth = (remainMonth != 0 || remainDay != 0) ? remainMonth : cycleMonth;
                if (AppConfig.con_pay_cycle_all.equals(contractVo.getContractBody_PayStyle())) {
                    contractBillVo.setBcb_repayment(ArithUtil.scale(newRent * totalMonth + (newRent / 30 * remainDay)));
                } else {
                    contractBillVo.setBcb_repayment(ArithUtil.scale(newRent * cycleMonth + (newRent / 30 * remainDay)));
                }
            }

            contractBillVo.setBcb_state(AppConfig.order_option_state_1);
            contractBillVo.setBcb_repaymentDate(c.getTime());
            contractBillVo.setBcb_cycle(i);
            contractBillVo.setBcb_balPay(0);// 收入
            contractBillVo.setBcb_type(AppConfig.CONTRACT_BILL_TYPE_0);
            contractBillVo.setBcb_code(AppUtil.getOrderCode("210"));
            contractBillVo.setBcb_createTime(new Date());
            contractBillVo.setBcb_budgetState(0);
            contractBillVo.setBcb_creator(0);

            Date bcb_agreedDate = c.getTime();
            if (AppConfig.con_pay_cycle_1.equals(contractVo.getContractBody_PayStyle())) {
                if (AppConfig.con_pay_way_gjp.equals(contractVo.getContractBody_PayType())) {
                    bcb_agreedDate = AppUtil.addDate(c.getTime(), Calendar.DAY_OF_MONTH, -7);
                }
            } else {
                bcb_agreedDate = AppUtil.addDate(c.getTime(), Calendar.DAY_OF_MONTH, -15);
            }
            contractBillVo.setBcb_agreedDate(bcb_agreedDate);
            contractBillList.add(contractBillVo);

            if (i == 0) {
                // [押金]
                if (pay != 0) {
                    ContractBillVo contractBillVo2 = contractBillVo.clone();
                    contractBillVo2.setBcb_repayment(new BigDecimal(pay));
                    contractBillVo2.setBcb_type(AppConfig.CONTRACT_BILL_TYPE_1);
                    contractBillVo2.setBcb_balPay(0);// 收入
                    contractBillVo2.setBcb_code(AppUtil.getOrderCode("210"));
                    contractBillList.add(contractBillVo2);
                }

                // [服务费]
                if (service != 0) {

                    ContractBillVo contractBillVo3 = contractBillVo.clone();
                    contractBillVo3.setBcb_repayment(new BigDecimal(service));
                    contractBillVo3.setBcb_type(AppConfig.CONTRACT_BILL_TYPE_3);
                    contractBillVo3.setBcb_balPay(0);// 收入
                    contractBillVo3.setBcb_code(AppUtil.getOrderCode("210"));
                    contractBillList.add(contractBillVo3);
                }
            }
            mounth += cycleMonth;
            fullYear += cycleMonth;
            fullYear = (fullYear >= 12 ? 0 : fullYear);
        }

        return contractBillList;
    }

    /**
     * 添加协议审核
     *
     * @param contractAgreementAuditingVo
     * @return
     */
    public boolean addContractAgreementAuditing(ContractAgreementAuditingVo contractAgreementAuditingVo) {
        return contractDao.addContractAgreementAuditing(contractAgreementAuditingVo) > 0;
    }

    /**
     * 同步房源
     *
     * @param hi_code
     * @throws AlipayApiException
     */
    public void rentHouse(HttpServletRequest request, String hi_code) throws Exception {
        RentHouseVo rentHouseVo = rentHouseService.queryRentHouseVo(hi_code);
        ViewHouseLibraryInfoVo houseLibraryInfoVo = houseLibraryService.queryHouseLibraryInfo(hi_code);
        if (null == rentHouseVo) {
            String room_code = AppUtil.genrateRoomCode(1, rentHouseService.queryRentHouseCount());
            RentHouseVo rentHouse = new RentHouseVo();
            rentHouse.setRoom_code(room_code);
            rentHouse.setHi_code(houseLibraryInfoVo.getHi_code());
            RentHouseVo houseVo = rentHouseService.addRentHouseVo(rentHouse);
            if (StringUtils.isEmpty(houseLibraryInfoVo.getRoom_code())) {
                houseLibraryInfoVo.setRoom_code(houseVo.getRoom_code());
            }
            // 同步到支付宝
            // 1、房源图片同步
            rentHouseService.syncFileService(request.getSession().getServletContext().getRealPath("/"), houseLibraryInfoVo.getHi_code(), "1");
//            if("分散式".equals(houseLibraryInfoVo.getHis_name())){
            // 2、分散式房源信息同步
            rentHouseService.rentHouseDispersionSync(houseLibraryInfoVo);
        }
        // 3、房源上架
        rentHouseService.rentHouseStateSync(houseLibraryInfoVo.getHi_code(), houseLibraryInfoVo.getRoom_code(), 1, 1, ("分散式".equals(houseLibraryInfoVo.getHis_name()) ? 1 : 2));
    }

    public boolean updateContractAgreementAuditing(ContractAgreementAuditingVo contractAgreementAuditingVo) {
        return contractDao.updateContractAgreementAuditing(contractAgreementAuditingVo) > 0;
    }

    public ContractAgreementAuditingVo queryContractAgreementAuditing(String contractObject_code) {
        ContractAgreementAuditingVo contractAgreementAuditingVo = new ContractAgreementAuditingVo();
        contractAgreementAuditingVo.setCon_code(contractObject_code);
        return contractDao.queryContractAgreementAuditing(contractAgreementAuditingVo);
    }

    /**
     * 【业务操作】合同审核|复核
     *
     * @param request
     * @param contractVo
     * @param resultMsg
     * @param orderCost
     * @param cooperater
     * @return
     * @throws Exception
     * @作者 JiangQT
     * @日期 2017年4月19日
     */
    public Msg<Object> updateContractAuditing(HttpServletRequest request, ViewBusinessContractVo contractVo, String mode, Integer result, String resultMsg, Integer orderCost, String cooperater) throws Exception {
        Msg<Object> msg = new Msg<>();
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) throw new AppException(Msg.MSG_LOGIN_ERROR);

        int optionState = 0;
        switch (mode) {
            case "auditing":
                if (result == 1) {
                    if (contractVo.getContractObject_ExtState() == AppConfig.contract_extstate_12
                            || contractVo.getContractObject_ExtState() == AppConfig.contract_extstate_22) {
                        optionState = AppConfig.contract_optionstate_104;
                    } else {
                        optionState = AppConfig.contract_optionstate_1021;
                    }
                }
                if (result == 2) {
                    optionState = AppConfig.contract_optionstate_103;
                }
                break;
            case "review":
                if (result == 1) {
                    optionState = AppConfig.contract_optionstate_106;
                }
                if (result == 2) {
                    optionState = AppConfig.contract_optionstate_105;
                }
                break;
            default:
                throw new AppException("模式错误，请重试或联系管理员");
        }

        // 【未通过】
        if (result == 2) {
            // 更新合同状态
            ContractObjectVo co = new ContractObjectVo();
            co.setContractObject_Code(contractVo.getContractObject_Code());
            co.setContractObject_OptionState(optionState);
            this.updateContractObject(co);

            // 添加合同审核记录
            this.addContractRecord(contractVo.getContractObject_Code(), AppUtil.returnContractState(optionState) + "，问题描述：" + resultMsg, employee.getEm_name());
            return msg;
        }

        // 【查询合约订单】
        ViewBusinessCancelContractListVo vcc = new ViewBusinessCancelContractListVo();
        vcc.setHi_code(contractVo.getHi_code());
        vcc.setCco_state(AppConfig.CANCEL_CONTRACT_STATE_2);
        vcc = this.queryCancelContractByhiCode(vcc);
        if (vcc != null && contractVo.getContractObject_Type().equals(vcc.getContractObject_Type())) {
            // 退租
            if (AppConfig.cco_applicationtype_tz.equals(vcc.getCco_applicationType())) {
                if (!AppConfig.CANCEL_CONTRACT_STATE_6.equals(vcc.getCco_state())) {
                    throw new AppException("还有未完成的[" + vcc.getCco_applicationType() + "]合约订单");
                }
            }
            String type = vcc.getCco_applicationType();

            // 更新解约订单--租赁订单状态
            ContractOrderVo contractOrderVo = new ContractOrderVo();
            contractOrderVo.setContractObject_code_where(vcc.getContractObject_Code());
            contractOrderVo.setBco_orderType(AppConfig.order_type_1);
            contractOrderVo.setBco_state(AppConfig.ORDER_STATE_2);
            if (AppConfig.cco_applicationtype_zz.equals(type)) {
                contractOrderVo.setBco_optionState(AppConfig.order_option_state_10);
            }
            if (AppConfig.cco_applicationtype_tz.equals(type)) {
                contractOrderVo.setBco_optionState(AppConfig.order_option_state_11);
            }
            if (AppConfig.cco_applicationtype_qs.equals(type)) {
                contractOrderVo.setBco_optionState(AppConfig.order_option_state_13);
            }
            financeManageService.updateFinanceOrder(contractOrderVo);

            // 查询合同订单
            contractOrderVo = financeManageService.queryFinanceOrder(contractOrderVo);

            // 更新解约账单--
            if (contractOrderVo != null) {
                ContractBillVo contractBillVo = new ContractBillVo();
                contractBillVo.setBco_code(contractOrderVo.getBco_code());
                contractBillVo.setBcb_state_where(AppConfig.order_option_state_2);
                if (AppConfig.cco_applicationtype_zz.equals(type)) {
                    contractBillVo.setBcb_state(AppConfig.order_option_state_10);
                }
                if (AppConfig.cco_applicationtype_tz.equals(type)) {
                    contractBillVo.setBcb_state(AppConfig.order_option_state_11);
                }
                if (AppConfig.cco_applicationtype_qs.equals(type)) {
                    contractBillVo.setBcb_state(AppConfig.order_option_state_13);
                }
                if (AppConfig.cco_applicationtype_dq.equals(type)) {
                    contractBillVo.setBcb_state(AppConfig.order_option_state_13);
                }
                financeManageService.updateFinanceBill(contractBillVo);
            }

            // 更新解约订单状态
            BusinessCancelContractOrder cancelContractOrder = new BusinessCancelContractOrder();
            cancelContractOrder.setCco_code(vcc.getCco_code());
            cancelContractOrder.setCco_state(AppConfig.CANCEL_CONTRACT_STATE_3);
            cancelContractOrder.setCco_FinishTime(new Date());
            this.updateCancelContractOrder(cancelContractOrder);
        }

        // 【审核】
        if ("auditing".equals(mode)) {
            // 更新房屋状态
            HouseInfoKeep informationKeep = new HouseInfoKeep();
            informationKeep.setHi_code(contractVo.getHi_code());
            if (AppConfig.TYPE_CONTRACT_201.equals(contractVo.getContractObject_Type())) {
                informationKeep.setContract_intoStatus(AppConfig.contract_outStatus_4);
            }
            if (AppConfig.TYPE_CONTRACT_202.equals(contractVo.getContractObject_Type())) {
                informationKeep.setContract_outStatus(AppConfig.contract_outStatus_4);
                housingAllocationService.updateHouseContractState(informationKeep);
            }
            houseLibraryService.updateHouseContractState(informationKeep);

            // 修改合同状态
            ContractObjectVo co = new ContractObjectVo();
            co.setContractObject_Id(contractVo.getContractObject_Id());
            co.setContractObject_OptionState(optionState);// 已通过
            this.updateContractObject(co);

            // 完成合同签署
            ContractSignVerifyVo contractSignVerifyVo = this.queryContractSignVerify(contractVo.getContractObject_Code());
            if (contractSignVerifyVo != null) {
                JSONObject contractFinish = BestSignUtil.contractFinish(contractSignVerifyVo.getCs_contractId());
                if (contractFinish.getIntValue("errno") != 0 && contractFinish.getIntValue("errno") != 241501) {
                    throw new AppException(contractFinish.getString("errmsg"));
                }
            }

            // 生成业务费用--合作费
            if (!StringUtils.isEmpty(orderCost)) {
                // 生成唯一编号
                String bbo_code = AppUtil.getOrderCode("BUS");
                // 查询数据
                BillBusinessBillVo businessBillVo = new BillBusinessBillVo();
                businessBillVo.setContractObject_code(contractVo.getContractObject_Code());
                businessBillVo.setBbo_type(110);
                businessBillVo = this.queryBusinessBill(businessBillVo);
                if (businessBillVo != null) {
                    bbo_code = businessBillVo.getBbo_code();
                    // 删除数据
                    businessBillVo = new BillBusinessBillVo();
                    businessBillVo.setBbo_code(bbo_code);
                    this.deleteBusinessBill(businessBillVo);
                }

                // 添加数据
                Integer bbb_applyPerson = null;
                ViewBusinessContractRelaEmpVo contractRelaEmpVo = new ViewBusinessContractRelaEmpVo();
                contractRelaEmpVo.setContractObject_Id(contractVo.getContractObject_Id());
                List<ViewBusinessContractRelaEmpVo> contractRelaEmp = this.queryViewContractRelaEmp(contractRelaEmpVo);
                for (ViewBusinessContractRelaEmpVo viewBusinessContractRelaEmpVo: contractRelaEmp) {
                    if (viewBusinessContractRelaEmpVo.getCre_role() == 1) {
                        bbb_applyPerson = viewBusinessContractRelaEmpVo.getEm_id();
                    }
                }
                businessBillVo = new BillBusinessBillVo();
                businessBillVo.setBbo_code(bbo_code);
                businessBillVo.setContractObject_code(contractVo.getContractObject_Code());
                businessBillVo.setHi_code(contractVo.getHi_code());
                businessBillVo.setBbo_type(110);
                businessBillVo.setBbb_balPay(0);
                businessBillVo.setBbb_repayment(orderCost);
                businessBillVo.setBbb_repaymentDate(contractVo.getContractObject_Date());
                businessBillVo.setBbb_applyPerson(bbb_applyPerson);
                businessBillVo.setBbb_createTime(new Date());
                this.addBusinessBill(businessBillVo);
            }

            // 添加合同审核记录
            this.addContractRecord(contractVo.getContractObject_Code(), "合同审核通过，合同状态：" + AppUtil.returnContractState(optionState), employee.getEm_name());

            // 添加代办事件
            String tm_text = "【合同审核】" + employee.getEm_name() + "提交了一份待审核的合同[房号：" + contractVo.getHouse_address() + "、合同号：" + contractVo.getContractObject_No() + "]，请尽快处理。";
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
            String tm_startTime = dateFormat.format(new Date());
            String tm_endTime = dateFormat.format(new Date());

            // 添加系统任务消息
            ViewBusinessContractRelaEmpVo contractRelaEmpVo = new ViewBusinessContractRelaEmpVo();
            contractRelaEmpVo.setContractObject_Id(contractVo.getContractObject_Id());
            contractRelaEmpVo.setCre_role(1);
            List<ViewBusinessContractRelaEmpVo> queryViewContractRelaEmp = this.queryViewContractRelaEmp(contractRelaEmpVo);
            UserCenterEmployee employee2 = null;
            if (!queryViewContractRelaEmp.isEmpty()) {
                employee2 = employeeService.queryEmployeeHead(queryViewContractRelaEmp.get(0).getEm_id());
            }
            String personID = employee2 == null ? "" : employee2.getEm_id() + "";
            String tm_http = "/contractObject/jumpDisplayContract?contractObject_No=" + contractVo.getContractObject_No() + "&mode=auditing";
            taskMessageService.addSystemTaskMessage(request, tm_text, "紧急", "重要", tm_startTime, tm_endTime, personID, tm_http);
        }

        // 【复核】
        if ("review".equals(mode)) {

            // 【修改合同状态】
            ContractObjectVo contractObjectVo = new ContractObjectVo();
            contractObjectVo.setContractObject_Id(contractVo.getContractObject_Id());
            contractObjectVo.setContractObject_State(AppConfig.con_state_2);
            contractObjectVo.setContractObject_OptionState(AppConfig.contract_optionstate_106);// 已生效
            this.updateContractObject(contractObjectVo);

            if (AppConfig.TYPE_CONTRACT_201.equals(contractVo.getContractObject_Type())) {
                // 【更新房源数据】
                HouseInfoKeep informationKeep = new HouseInfoKeep();
                informationKeep.setHi_code(contractVo.getHi_code());
                if (contractVo.getContractObject_RentFreeMode() == 1) {
                    BigDecimal setScale = new BigDecimal(contractVo.getContractBody_Rent() / 12).setScale(0, BigDecimal.ROUND_HALF_UP);
                    informationKeep.setHi_keepMoney(setScale.doubleValue());
                } else {
                    informationKeep.setHi_keepMoney(contractVo.getContractBody_Rent());
                }
                informationKeep.setContract_intoStatus(AppConfig.contract_outStatus_5);
                if (contractVo.getContractObject_ExtState() != 12 && contractVo.getContractObject_ExtState() != 22) {
                    informationKeep.setHi_forRentState(AppConfig.hi_forRentState_1001);
                    informationKeep.setHi_isForRent(AppConfig.hi_isForRent_1);
                }
                if (contractVo.getContractObject_Successor() == 0) {
                    informationKeep.setContract_beginDate(contractVo.getContractObject_Date());
                }
                informationKeep.setContract_expiryDate(contractVo.getContractObject_DeadlineTime());
                housingAllocationService.updateHouseContractState(informationKeep);
                houseLibraryService.updateHouseContractState(informationKeep);

                // 【更新房屋管家归属】
                // --查询主管家
                ViewBusinessContractRelaEmpVo contractRelaEmpVo = new ViewBusinessContractRelaEmpVo();
                contractRelaEmpVo.setContractObject_Id(contractVo.getContractObject_Id());
                contractRelaEmpVo.setCre_role(1);
                List<ViewBusinessContractRelaEmpVo> contractRelaEmps = this.queryViewContractRelaEmp(contractRelaEmpVo);
                // --查询是否已归属
                PositionRecordVo positionRecordVo = new PositionRecordVo();
                positionRecordVo.setHi_code(informationKeep.getHi_code());
                positionRecordVo = houseLibraryService.queryContractPositionRecord(positionRecordVo);
                if (positionRecordVo == null) {
                    positionRecordVo = new PositionRecordVo();
                    positionRecordVo.setHi_code(informationKeep.getHi_code());
                    if (!contractRelaEmps.isEmpty()) {
                        positionRecordVo.setHpr_emp(contractRelaEmps.get(0).getEm_id());
                        positionRecordVo.setHpr_newEmp(contractRelaEmps.get(0).getEm_id());
                        // 查询管家部门
                        UserCenterEmployee userCenterEmployee = new UserCenterEmployee();
                        userCenterEmployee.setEm_id(contractRelaEmps.get(0).getEm_id());
                        List<UserCenterEmployee> userCenterEmployees = employeeService.selectCompanyID(userCenterEmployee);
                        if (!userCenterEmployees.isEmpty()) {
                            positionRecordVo.setUcc_id(userCenterEmployees.get(0).getUcc_id());
                        }
                    }
                    positionRecordVo.setHpr_createTime(new Date());
                    houseLibraryService.addHousePositionRecord(positionRecordVo);
                } else {
                    PositionRecordVo positionRecordVo1 = new PositionRecordVo();
                    positionRecordVo1.setHpr_id(positionRecordVo.getHpr_id());
                    if (!contractRelaEmps.isEmpty()) {
                        positionRecordVo1.setHpr_newEmp(contractRelaEmps.get(0).getEm_id());
                    }
                    houseLibraryService.updateHousePositionRecord(positionRecordVo1);
                }

                // 【公司管理费】
                try {
                    achievementService.gsManageBill(contractVo.getContractObject_Code());
                } catch (Exception e) {
                    System.out.println("公司管理费生成咯儿P");
                }

                // 【计算房源定价】
                boolean isReNew = contractVo.getContractObject_Successor() != 0;
                String hi_code = contractVo.getHi_code();
                Integer em_id = employee.getEm_id();
                Double hi_keepMoney = contractVo.getContractBody_Rent();
                String rentDay = contractVo.getContractBody_FreeTime();
                double y = AppUtil.getMonth(contractVo.getContractObject_Date(), contractVo.getContractObject_DeadlineTime()) / 12.0;
                Integer year = (int) (y < 1 ? 1 : y);
                String payType = contractVo.getContractBody_PayStyle();
                houseIntentionService.housePriceMoneyPlus(isReNew, hi_code, em_id, hi_keepMoney, rentDay, year, payType, null);
            }

            if (AppConfig.TYPE_CONTRACT_202.equals(contractVo.getContractObject_Type())) {
                // 【更新房源状态】
                HouseInfoKeep informationKeep = new HouseInfoKeep();
                informationKeep.setHi_code(contractVo.getHi_code());
                informationKeep.setHi_money(contractVo.getContractBody_Rent());
                informationKeep.setContract_outStatus(AppConfig.contract_outStatus_5);
                informationKeep.setHi_forRentState(AppConfig.hi_forRentState_1020);
                informationKeep.setHi_isForRent(AppConfig.hi_isForRent_0); // 停止招租
                housingAllocationService.updateHouseContractState(informationKeep);
                houseLibraryService.updateHouseContractState(informationKeep);

                // 【初始化房源特价数据】
                informationKeep = new HouseInfoKeep();
                informationKeep.setHi_code(contractVo.getHi_code());
                informationKeep.setHi_boolActive(null);
                informationKeep.setHi_leaseDay(0);
                informationKeep.setHi_houseActive(null);
                houseLibraryService.updateHouseContractState(informationKeep);

                // 更新合同
                if (!StringUtils.isEmpty(cooperater)) {
                    UserCenterContractBody contractBody = new UserCenterContractBody();
                    contractBody.setContractObject_Code(contractVo.getContractObject_Code());
                    contractBody.setContractBody_PayType(cooperater);
                    this.updateContractBody(contractBody);
                }
            }

            // 【更新合同订单】
            ContractOrderVo contractOrderVo = new ContractOrderVo();
            contractOrderVo.setContractObject_code_where(contractVo.getContractObject_Code());
            contractOrderVo.setBco_orderType(AppConfig.order_type_1);
            contractOrderVo.setBco_optionState(AppConfig.order_option_state_2);
            if (!StringUtils.isEmpty(cooperater)) {
                contractOrderVo.setBco_cooperater(cooperater);
            }
            financeManageService.updateFinanceOrder(contractOrderVo);

            // 【更新合同账单】
            // --查询订单
            contractOrderVo = new ContractOrderVo();
            contractOrderVo.setBco_orderType(AppConfig.order_type_1);
            contractOrderVo.setContractObject_code(contractVo.getContractObject_Code());
            contractOrderVo = financeManageService.queryFinanceOrder(contractOrderVo);
            if (contractOrderVo != null) {
                ContractBillVo contractBillVo = new ContractBillVo();
                contractBillVo.setBco_code(contractOrderVo.getBco_code());
                if (!StringUtils.isEmpty(contractOrderVo.getBco_cooperater()) && !"管家婆".equals(contractOrderVo.getBco_cooperater())) {
                    contractBillVo.setBcb_state(AppConfig.order_option_state_9);
                } else {
                    contractBillVo.setBcb_state(AppConfig.order_option_state_2);
                }
                contractBillVo.setBcb_state_where(AppConfig.order_option_state_1);
                financeManageService.updateFinanceBill(contractBillVo);
                // 添加金融账单
                if (!StringUtils.isEmpty(contractOrderVo.getBco_cooperater()) && !"管家婆".equals(contractOrderVo.getBco_cooperater())) {
                    partnerBillService.addPartnerBillByFristCycle(contractOrderVo.getBco_code(), employee);
                }

                // 执行初始化
                financeManageService.updateFinanceOrderBillData(contractOrderVo.getBco_code());
            }

            // 【添加合同归属部门】
            int ucc_id = 0;
            ViewBusinessContractRelaEmpVo contractRelaEmpVo = new ViewBusinessContractRelaEmpVo();
            contractRelaEmpVo.setContractObject_Id(contractVo.getContractObject_Id());
            List<ViewBusinessContractRelaEmpVo> contractRelaEmp = this.queryViewContractRelaEmp(contractRelaEmpVo);
            for (ViewBusinessContractRelaEmpVo contractRelaEmpVo2: contractRelaEmp) {
                if (contractRelaEmpVo2.getCre_role() == 1) {
                    ucc_id = contractRelaEmpVo2.getUcc_id();
                    break;
                }
            }
            ContractCompanyRelationVo companyRelationVo = new ContractCompanyRelationVo();
            companyRelationVo.setCo_code(contractVo.getContractObject_Code());
            companyRelationVo = this.queryContractCompanyRelation(companyRelationVo);
            if (companyRelationVo == null) {
                companyRelationVo = new ContractCompanyRelationVo();
                companyRelationVo.setCo_code(contractVo.getContractObject_Code());
                companyRelationVo.setUcc_id(ucc_id);
                companyRelationVo.setCcr_createTime(new Date());
                this.addContractCompanyRelation(companyRelationVo);
            } else {
                companyRelationVo.setUcc_id(ucc_id);
                this.updateContractCompanyRelation(companyRelationVo);
            }

            // 【添加合同记录】
            this.addContractRecord(contractVo.getContractObject_Code(), "复核通过，合同生效", employee.getEm_name());

            // 【添加系统任务消息】
            String tm_text = "【合同复核】" + employee.getEm_name() + "提交了一份待复核的合同[房号：" + contractVo.getHouse_address() + "、合同号：" + contractVo.getContractObject_No() + "]，请尽快处理。";
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
            String tm_startTime = dateFormat.format(new Date());
            String tm_endTime = dateFormat.format(new Date());
            String personID = "128";
            String tm_http = "/contractObject/jumpDisplayContract?contractObject_No=" + contractVo.getContractObject_No() + "&mode=review#handover";
            taskMessageService.addSystemTaskMessage(request, tm_text, "紧急", "重要", tm_startTime, tm_endTime, personID, tm_http);
        }
        return msg;
    }

    /**
     * 【业务操作】生成合同校验码
     *
     * @param con_code 合同CODE
     * @param bs       校验码
     * @return
     * @throws Exception
     */
    public void updateContractSign(String con_code, byte[] bs) throws Exception {
        // 【更新签名】
        ContractObjectVo contractObject = new ContractObjectVo();
        contractObject.setContractObject_Code(con_code);
        contractObject.setContractObject_CustomerSign(bs);
        boolean boo = this.updateContractObjectForSignature(contractObject);
        if (!boo) {
            throw new AppException("更新签名失败");
        }
        // 【生成校验码】
        // boo = this.updateContractCheckCode(con_code);
        // if (!boo) {
        // throw new AppException("生成校验码失败");
        // }

        // 【发送短信】
        ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
        contractVo.setContractObject_Code(con_code);
        contractVo = selectContractObjectByCNo(contractVo);
        if (contractVo != null) {
            String house_address = contractVo.getHouse_address();
            String con_no = contractVo.getContractObject_No();
            String con_startEndDate = contractVo.getContractBody_StartTOEnd();
            String con_payType = contractVo.getContractBody_PayStyle();
            String con_rent = contractVo.getContractBody_Rent() + "";
            String con_type = contractVo.getContractObject_Type();
            String hi_code = contractVo.getHi_code();

            // 管家信息
            ViewBusinessContractRelaEmpVo contractRelaEmpVo = new ViewBusinessContractRelaEmpVo();
            contractRelaEmpVo.setContractObject_Id(contractVo.getContractObject_Id());
            contractRelaEmpVo.setCre_role(1);
            List<ViewBusinessContractRelaEmpVo> contractRelaEmp = this.queryViewContractRelaEmp(contractRelaEmpVo);

            // 发送至管家
            if (contractRelaEmp != null) {
                new Thread(() -> {
                    try {
                        String name = "亲";// contractRelaEmp.get(0).getEm_name();
                        String phone = contractRelaEmp.get(0).getEm_phone();
                        if (AppConfig.TYPE_CONTRACT_201.equals(con_type)) {
                            Map<String, Object> resultMap = SendMsg.sendContractTgToEmp(phone, name, house_address, con_no, con_startEndDate, con_payType, con_rent);
                            if (null != resultMap) {
                                saveUserCenterMsgRecord(hi_code, (String) resultMap.get("msg_content"), (Integer) resultMap.get("send_result"));
                            }
                        }
                        if (AppConfig.TYPE_CONTRACT_202.equals(con_type)) {
                            Map<String, Object> resultMap = SendMsg.sendContractZlToEmp(phone, name, house_address, con_no, con_startEndDate, con_payType, con_rent);
                            if (null != resultMap) {
                                saveUserCenterMsgRecord(hi_code, (String) resultMap.get("msg_content"), (Integer) resultMap.get("send_result"));
                            }
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }).start();
            }

            // 发送至客户
            String name = contractVo.getCc_name();
            String phone = contractVo.getCcp_phone();
            new Thread(() -> {
                try {
                    if (AppConfig.TYPE_CONTRACT_201.equals(con_type)) {
                        Map<String, Object> resultMap = SendMsg.sendContractTgToCus(phone, name, house_address, con_no, con_startEndDate, con_payType, con_rent);
                        if (null != resultMap) {
                            saveUserCenterMsgRecord(hi_code, (String) resultMap.get("msg_content"), (Integer) resultMap.get("send_result"));
                        }
                    }
                    if (AppConfig.TYPE_CONTRACT_202.equals(con_type)) {
                        Map<String, Object> resultMap = SendMsg.sendContractZlToCus(phone, name, house_address, con_no, con_startEndDate, con_payType, con_rent);
                        if (null != resultMap) {
                            saveUserCenterMsgRecord(hi_code, (String) resultMap.get("msg_content"), (Integer) resultMap.get("send_result"));
                        }
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }).start();
        }
    }

    /**
     * 【业务操作】生成合同校验码
     *
     * @param contractObject_Code 合同CODE
     * @return
     * @throws Exception
     */
    public boolean updateContractCheckCode(String contractObject_Code) throws Exception {
        ContractObjectVo contractObject = new ContractObjectVo();
        contractObject.setContractObject_Code(contractObject_Code);
        contractObject = contractDao.queryContractObject(contractObject);
        if (contractObject == null) {
            throw new AppException("没有找到该合同信息");
        }

        UserCenterContractBody contractBody = new UserCenterContractBody();
        contractBody.setContractObject_Code(contractObject_Code);
        contractBody = contractDao.queryContractBody(contractBody);
        if (contractBody == null) {
            throw new AppException("没有找到该合同信息");
        }

        UserCustomer customerInfo = customerService.queryCustomerInfo(contractObject.getContractObject_1st());
        if (customerInfo == null) {
            throw new AppException("没有找到该客户信息");
        }

        // 获取MD5校验码
        ContractMd5 contractMd5 = new ContractMd5();
        contractMd5.setHi_code(contractObject.getHi_code());
        contractMd5.setCc_name(customerInfo.getCc_name());
        contractMd5.setCc_cardNum(customerInfo.getCc_cardNum());
        contractMd5.setContractBody_StartTOEnd(AppUtil.sdf_date.format(contractObject.getContractObject_Date()) + "~" + AppUtil.sdf_date.format(contractObject.getContractObject_DeadlineTime()));
        contractMd5.setContractBody_Rent(contractBody.getContractBody_Rent().doubleValue());
        contractMd5.setContractBody_PayStyle(contractBody.getContractBody_PayStyle());
        contractMd5.setContractBody_Pay(contractBody.getContractBody_Pay() + "");
        contractMd5.setContractBody_Depslit(contractBody.getContractBody_Depslit() + "");
        contractMd5.setContractBody_FreeTime(contractBody.getContractBody_FreeTime());
        contractMd5.setContractBody_Service(contractBody.getContractBody_Service() + "");
        contractMd5.setContractBody_GuaranteeCost(contractBody.getContractBody_GuaranteeCost());
        contractMd5.setContractBody_RentPlus(contractBody.getContractBody_RentPlus());
        contractMd5.setContractBody_Increasing(contractBody.getContractBody_Increasing());
        contractMd5.setContractObject_FillTime(AppUtil.sdf_date.format(contractObject.getContractObject_FillTime()));
        contractMd5.setContractBody_RentRate_A(contractBody.getContractBody_RentRate_A() + "");
        contractMd5.setContractBody_RentRate_B(contractBody.getContractBody_RentRate_B() + "");
        contractMd5.setContractObject_Other(contractObject.getContractObject_Other());
        contractMd5.setContractObject_Contractor(contractObject.getContractObject_Contractor() + "");
        contractMd5.setContractObject_CustomerSign(Arrays.toString(contractObject.getContractObject_CustomerSign()));
        String contractObject_CheckCode = AppUtil.contractMD5(contractMd5);
        if (contractObject_CheckCode.contains("error-")) {
            throw new AppException("生成校验码失败");
        }

        // 更新校验码
        ContractObjectVo contractObject2 = new ContractObjectVo();
        contractObject2.setContractObject_Code(contractObject_Code);
        contractObject2.setContractObject_CheckCode(contractObject_CheckCode);
        int update = contractDao.updateContractObject(contractObject2);
        if (update == 0) {
            throw new AppException("更新校验码失败");
        }
        return true;
    }

    /**
     * 【业务操作】更新合同对象之交房日期
     *
     * @param isChange
     * @param employee
     * @throws Exception
     * @author JiangQt
     * @version 2017年6月9日下午4:26:36
     */
    public Msg<Object> updateContractObjectForRealDate(String con_code, Date con_realDate, boolean isChange, UserCenterEmployee employee) throws Exception {
        Msg<Object> msg = new Msg<>();
        ContractObjectVo contractObjectVo = new ContractObjectVo();
        contractObjectVo.setContractObject_Code(con_code);
        contractObjectVo = this.queryContractObject(contractObjectVo);
        if (contractObjectVo == null) {
            throw new AppException(Msg.MSG_PARAM_ERROR);
        }

        UserCenterContractBody contractBody = this.queryContractBody(con_code);

        // 更新合同对象
        ContractObjectVo contractObjectVo1 = new ContractObjectVo();
        contractObjectVo1.setContractObject_Code(con_code);
        contractObjectVo1.setContractObject_RealDate(con_realDate);
        boolean boo = this.updateContractObject(contractObjectVo1);
        if (!boo) {
            throw new AppException(Msg.MSG_SYSTEM_ERROR);
        }

        if (isChange) {
            // 更新合同账单
            ContractOrderVo contractOrderVo = new ContractOrderVo();
            contractOrderVo.setContractObject_code(con_code);
            contractOrderVo.setBco_orderType(AppConfig.order_type_1);
            contractOrderVo = financeManageService.queryFinanceOrder(contractOrderVo);
            if (contractOrderVo != null) {
                ContractBillVo contractBillVo = new ContractBillVo();
                contractBillVo.setBco_code(contractOrderVo.getBco_code());
                List<ContractBillVo> contractBillList = financeManageService.queryFinanceBillList(contractBillVo);
                int totalMonth = 0;
                int month = 0;
                switch (contractBody.getContractBody_PayStyle()) {
                    case "月付":
                        month = 1;
                        break;
                    case "季付":
                        month = 3;
                        break;
                    case "半年付":
                        month = 6;
                        break;
                    case "年付":
                        month = 12;
                        break;
                }
                for (ContractBillVo aContractBillList: contractBillList) {
                    if (aContractBillList.getBcb_cycle() != 0) {
                        ContractBillVo contractBillVo3 = new ContractBillVo();
                        contractBillVo3.setBcb_id(aContractBillList.getBcb_id());
                        contractBillVo3.setBcb_state_where(AppConfig.order_option_state_2);
                        Calendar c = Calendar.getInstance();
                        c.setTime(con_realDate);
                        c.add(Calendar.MONTH, totalMonth);
                        contractBillVo3.setBcb_repaymentDate(c.getTime());
                        financeManageService.updateFinanceBill(contractBillVo3);
                    }
                    totalMonth += month;
                }
            }
        }

        // 添加日志
        ContractImplRecordVo implementRecordVo = new ContractImplRecordVo();
        implementRecordVo.setHi_code(contractObjectVo.getHi_code());
        implementRecordVo.setContractObject_code(con_code);
        implementRecordVo.setCir_type(1020);
        implementRecordVo.setCir_content("接房日期" + AppUtil.sdf_date.format(contractObjectVo.getContractObject_RealDate()) + "调整为" + AppUtil.sdf_date.format(con_realDate) + (isChange ? "，并修改合同账单日期" : ""));
        implementRecordVo.setCir_source(0);
        implementRecordVo.setCir_author(employee.getEm_id());
        implementRecordVo.setCir_createTime(new Date());
        this.addHouseRecord(implementRecordVo);

        return msg;
    }

    /**
     * 更新合同归属部门关系数据
     *
     * @param companyRelationVo
     * @return
     * @author JiangQt
     * @version 2017年6月14日下午3:34:10
     */
    public boolean updateContractCompanyRelation(ContractCompanyRelationVo companyRelationVo) {
        return contractDao.updateContractCompanyRelation(companyRelationVo) > 0;
    }

    /**
     * 添加合同归属部门关系数据
     *
     * @param companyRelationVo
     * @return
     * @author JiangQt
     * @version 2017年6月14日下午3:33:58
     */
    public boolean addContractCompanyRelation(ContractCompanyRelationVo companyRelationVo) {
        return contractDao.addContractCompanyRelation(companyRelationVo) > 0;
    }

    /**
     * 查询合同归属部门关系数据
     *
     * @param companyRelationVo
     * @return
     * @author JiangQt
     * @version 2017年6月14日下午3:33:54
     */
    public ContractCompanyRelationVo queryContractCompanyRelation(ContractCompanyRelationVo companyRelationVo) {
        return contractDao.queryContractCompanyRelation(companyRelationVo);
    }

    /**
     * 更新合同信息
     *
     * @param contractObjectVo
     * @return
     * @author JiangQt
     * @version 2017年6月9日下午4:29:14
     */
    public boolean updateContractObject(ContractObjectVo contractObjectVo) {
        return contractDao.updateContractObject(contractObjectVo) > 0;
    }

    /**
     * 房源特价账单修改
     *
     * @param contractObject_code 合同编码
     * @param pst_id              定价策略编码
     * @param pst_money           涨价金额
     * @return
     * @author 陈智颖
     * @date May 21, 2017 3:24:03 PM
     */
    public boolean updateActiveBill(String contractObject_code, Integer pst_id, Double pst_money) {
        if (pst_id == null) {
            pst_id = 2;
        }
        ContractBillVo contractBillVo = new ContractBillVo();
        contractBillVo.setContractObject_Code(contractObject_code);
        List<ContractBillVo> queryContractCodeBill = financeManageDao.queryContractCodeBill(contractBillVo);
        PriceSettingContent priceSettingContent = new PriceSettingContent();
        priceSettingContent.setPst_id(pst_id);
        List<PriceSettingContent> selectPriceSettingContentWhere = priceSettingDAO.selectPriceSettingContentWhere(priceSettingContent);

        // 特价进行账单租金调整
        for (ContractBillVo contractBillVo2: queryContractCodeBill) {
            for (PriceSettingContent priceSettingContent2: selectPriceSettingContentWhere) {
                String upCycle = priceSettingContent2.getPsc_upCycle();
                Integer cycle = Integer.valueOf(upCycle.split("-")[0]);
                Double money = Double.valueOf(upCycle.split("-")[1]);
                String unit = priceSettingContent2.getPsc_unit();
                // 判断期数是否一致
                if (contractBillVo2.getBcb_cycle() == (cycle - 1)) {
                    if (contractBillVo2.getBcb_type() == 0) {
                        ContractBillVo contractBillVo1 = new ContractBillVo();
                        contractBillVo1.setBcb_id(contractBillVo2.getBcb_id());
                        // 判断单位
                        if (unit.equals("元")) {
                            contractBillVo1.setBcb_repayment(new BigDecimal(money));
                        } else if (unit.equals("%")) {
                            Double repayment = contractBillVo2.getBcb_repayment().doubleValue() * money / 100;
                            contractBillVo1.setBcb_repayment(new BigDecimal(repayment));
                        }
                        financeManageDao.updateFinanceBill(contractBillVo1);
                    }
                } else if (pst_money != null) {
                    ContractBillVo contractBillVo1 = new ContractBillVo();
                    contractBillVo1.setBcb_id(contractBillVo2.getBcb_id());
                    Double repayment = contractBillVo2.getBcb_repayment().doubleValue() + pst_money;
                    contractBillVo1.setBcb_repayment(new BigDecimal(repayment));
                    financeManageDao.updateFinanceBill(contractBillVo1);
                }
            }
        }

        return false;
    }

    /**
     * 更新合同数量统计数据
     *
     * @param quantityStatisticsVo
     * @return
     * @作者 JiangQT
     * @日期 2017年3月31日
     */
    public boolean updateContractQuantityStatistics(ContractQuantityStatisticsVo quantityStatisticsVo) {
        return contractDao.updateContractQuantityStatistics(quantityStatisticsVo) > 0;
    }

    /**
     * 查询合同数量统计
     *
     * @param quantityStatisticsVo
     * @return
     * @作者 JiangQT
     * @日期 2017年3月29日
     */
    public ContractQuantityStatisticsVo queryContractQuantityStatistics(ContractQuantityStatisticsVo quantityStatisticsVo) {
        return contractDao.queryContractQuantityStatistics(quantityStatisticsVo);
    }

    /**
     * 删除合同照片
     *
     * @param contractImageVo
     * @return
     * @作者 JiangQT
     * @日期 2017年3月25日
     */
    public boolean deleteContractImage(ContractImageVo contractImageVo) {
        return contractDao.deleteContractImage(contractImageVo) > 0;
    }

    /**
     * 添加合同
     *
     * @param contractObject
     * @return
     * @作者 JiangQT
     * @日期 2017年3月20日
     */
    public boolean addContractObject(ContractObjectVo contractObject) {
        return contractDao.addContractObject(contractObject) > 0;
    }

    /**
     * 删除合同服务
     *
     * @param serviceChargeVo
     * @return
     * @作者 JiangQT
     * @日期 2016年12月19日
     */
    public int deleteContractServiceCharge(ServiceContractServiceChargeVo serviceChargeVo) {
        return contractDao.deleteContractServiceCharge(serviceChargeVo);
    }

    public List<ContractType> selectContractTypeByParentId(Integer parentId) {
        return contractDao.selectContractTypeByParentId(parentId);
    }

    /**
     * 添加合同主体信息
     *
     * @param userCenterContractBody
     * @return
     */
    public int addUserCenterContractBody(UserCenterContractBody userCenterContractBody) {
        return contractDao.addUserCenterContractBody(userCenterContractBody);
    }

    /**
     * 根据编号查询合同对象
     *
     * @return
     */
    public ContractObjectVo queryContractObject(Integer contractObject_Id) {
        ContractObjectVo contractObject = new ContractObjectVo();
        contractObject.setContractObject_Id(contractObject_Id);
        return contractDao.queryContractObject(contractObject);
    }

    /**
     * 根据编号查询合同对象
     *
     * @param contractObject_Code
     * @return
     */
    public ContractObjectVo queryContractObject(String contractObject_Code) {
        ContractObjectVo contractObject = new ContractObjectVo();
        contractObject.setContractObject_Code(contractObject_Code);
        return contractDao.queryContractObject(contractObject);
    }

    /**
     * 根据编号查询合同对象
     *
     * @return
     */
    public ContractObjectVo queryContractObject(ContractObjectVo contractObject) {
        return contractDao.queryContractObject(contractObject);
    }

    public ViewBusinessContractVo selectContractObjectByCNo(ViewBusinessContractVo contractVo) {
        return contractDao.selectContractObjectByCNo(contractVo);
    }

    /**
     * 查询合同视图信息By合同编号
     *
     * @param contractObject_No
     * @return
     * @作者 JiangQT
     * @日期 2016年8月7日
     */
    public ViewBusinessContractVo selectContractObjectByCNo(String contractObject_No) {
        ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
        contractVo.setContractObject_No(contractObject_No);
        return contractDao.selectContractObjectByCNo(contractVo);
    }

    /**
     * APP根据房屋编码查询合同信息
     *
     * @param contractVo
     * @return
     * @author 陈智颖
     */
    public ViewBusinessContractVo queryAPPContract(ViewBusinessContractVo contractVo) {
        return contractDao.queryAPPContract(contractVo);
    }

    /**
     * 根据房屋编码查询最近的托管合同
     *
     * @param userCenterContractObject1
     * @return
     * @author zoe
     */
    public ContractObjectVo selectContractObjectByHICode(ContractObjectVo userCenterContractObject1) {
        return contractDao.selectContractObjectByHICode(userCenterContractObject1);
    }

    /**
     * 查询房屋开始时间
     *
     * @param userCenterContractObject1
     * @return
     * @author zoe
     */
    public ContractObjectVo selectContractObjectByHICodeAsc(ContractObjectVo userCenterContractObject1) {
        return contractDao.selectContractObjectByHICodeAsc(userCenterContractObject1);
    }

    public List<ViewBusinessContractVo> selectViewContractList(Pagination<ViewBusinessContractVo> pagination) {
        return contractDao.selectViewContractList(pagination);
    }

    /**
     * 根据房屋编码查询租赁合同
     *
     * @return
     * @author 陈智颖
     */
    public ViewBusinessContractVo selectContractObjectPeople(ViewBusinessContractVo contractVo) {
        return contractDao.selectContractObjectPeople(contractVo);
    }

    /**
     * 验证合同编码是否存在
     *
     * @param contractObject_No
     * @return
     * @author JiangQT
     */
    public boolean isValidContractNo(String contractObject_No) {
        ContractObjectVo contractObject = new ContractObjectVo();
        contractObject.setContractObject_No(contractObject_No);
        return "1".equals(contractDao.isValidContractNo(contractObject));
    }

    /**
     * 通过合同编号查询合同主体
     *
     * @return
     * @author JiangQT
     */
    public UserCenterContractBody queryContractBody(String contractObject_Code) {
        UserCenterContractBody contractBody = new UserCenterContractBody();
        contractBody.setContractObject_Code(contractObject_Code);
        return contractDao.queryContractBody(contractBody);
    }

    public List<BillReserveOrderVo> selectReserveOrder(Pagination<BillReserveOrderVo> pagination) {
        return contractDao.selectReserveOrder(pagination);
    }

    public int selectReserveOrderTotalRecords(Pagination<BillReserveOrderVo> pagination) {
        return contractDao.selectReserveOrderTotalRecords(pagination);
    }

    public Pagination<ViewBusinessCancelContractListVo> queryCancelContractPageList(Pagination<TableList> pagination) {
        return contractDao.queryCancelContractPageList(pagination);
    }

    public ViewBusinessCancelContractListVo queryCancelContractByCode(String cco_code) {
        ViewBusinessCancelContractListVo businessCancelContractListVo = new ViewBusinessCancelContractListVo();
        businessCancelContractListVo.setCco_code(cco_code);
        return contractDao.queryCancelContractByCode(businessCancelContractListVo);
    }

    public ViewBusinessCancelContractListVo queryCancelContractByCode(ViewBusinessCancelContractListVo businessCancelContractListVo) {
        return contractDao.queryCancelContractByCode(businessCancelContractListVo);
    }

    /**
     * 解约订单审核完毕——更新订单数据
     *
     * @param contractOrder
     * @return
     * @author JiangQT
     */
    public boolean updateCancelContractOrder(BusinessCancelContractOrder contractOrder) {
        return contractDao.updateCancelContractOrder(contractOrder) > 0;
    }

    /**
     * 通过房屋编码查询解约申请
     *
     * @param cancelContractListVo
     * @return
     * @author JiangQT
     */
    public ViewBusinessCancelContractListVo queryCancelContractByhiCode(ViewBusinessCancelContractListVo cancelContractListVo) {
        return contractDao.queryCancelContractByhiCode(cancelContractListVo);
    }

    /**
     * 根据房屋编码查询该房屋所有托管合同
     *
     * @param userCenterContractObject2
     * @return
     * @author zoe
     */
    public List<ViewGJPContrByCode> selectViewGJPContrByCode(ContractObjectVo userCenterContractObject2) {
        return contractDao.selectViewGJPContrByCode(userCenterContractObject2);
    }

    /**
     * 根据合同编号查询合同房屋信息
     *
     * @param userCenterContractObject2
     * @return
     * @author zoe
     */
    public ViewGJPContrByCode selTrusteeshipByCode(ContractObjectVo userCenterContractObject2) {
        return contractDao.selTrusteeshipByCode(userCenterContractObject2);
    }

    public boolean updatePurchaseItems(ServicePurchaseItems purchaseItems) {
        return contractDao.updatePurchaseItems(purchaseItems) > 0;
    }

    /**
     * 查询根据预定账单签订的合同
     *
     * @param rb_houseNum
     * @return
     * @author zoe
     */
    public ContractObjectVo selectReserveContractObjectByHICode(String rb_houseNum) {
        return contractDao.selectReserveContractObjectByHICode(rb_houseNum);
    }

    public List<ViewBusinessContractRelaEmpVo> queryViewContractRelaEmp(ViewBusinessContractRelaEmpVo contractRelaEmpVo) {
        return contractDao.queryViewContractRelaEmp(contractRelaEmpVo);
    }

    public ViewBusinessContractVo selectContractObjectByCard(ViewBusinessContractVo contractVo) {
        return contractDao.selectContractObjectByCard(contractVo);
    }

    /**
     * 查询合同审核记录列表信息
     *
     * @param auditingRecordVo
     * @return
     * @author JiangQT
     */
    public List<ContractAuditingRecordVo> queryContractAuditingRecordList(ContractAuditingRecordVo auditingRecordVo) {
        return contractDao.queryContractAuditingRecordList(auditingRecordVo);
    }

    /**
     * 查询合同审核记录列表信息
     *
     * @param contractObject_code
     * @return
     * @author JiangQT
     */
    public List<ContractAuditingRecordVo> queryContractAuditingRecordList(String contractObject_code) {
        ContractAuditingRecordVo auditingRecordVo = new ContractAuditingRecordVo();
        auditingRecordVo.setContractObject_code(contractObject_code);
        return contractDao.queryContractAuditingRecordList(auditingRecordVo);
    }

    /**
     * 添加解约申请订单
     *
     * @param businessCancelContractOrder
     * @return
     * @author JiangQT
     */
    public boolean addCancelContractOrder(BusinessCancelContractOrder businessCancelContractOrder) {
        return contractDao.addCancelContractOrder(businessCancelContractOrder) > 0;
    }

    /**
     * 查询解约订单信息
     *
     * @param contractOrder
     * @return
     * @author JiangQT
     */
    public boolean queryCancelContractOrderInfo(BusinessCancelContractOrder contractOrder) {
        return "1".equals(contractDao.queryCancelContractOrderInfo(contractOrder));
    }

    /**
     * 添加首期期账单收款记录
     *
     * @param billReceiptRecordVo
     * @return
     * @author JiangQT
     */
    public boolean addFirstBillReceiptRecord(BillFirstBillReceiptRecordVo billReceiptRecordVo) {
        return contractDao.addFirstBillReceiptRecord(billReceiptRecordVo) > 0;
    }

    /**
     * 删除旧首期期账单收款记录
     *
     * @param billReceiptRecordVo
     * @return
     * @author JiangQT
     */
    public boolean deleteFirstBillReceiptRecord(BillFirstBillReceiptRecordVo billReceiptRecordVo) {
        return contractDao.deleteFirstBillReceiptRecord(billReceiptRecordVo) > 0;
    }

    /**
     * 修改合同服务费
     *
     * @param serviceChargeVo
     * @return
     * @author JiangQT
     */
    public Integer updateContractServiceCharge(ServiceContractServiceChargeVo serviceChargeVo) {
        return contractDao.updateContractServiceCharge(serviceChargeVo);
    }

    /**
     * 根据合同编码查看合同服务费
     *
     * @param serviceChargeVo
     * @return
     * @author JiangQT
     */
    public ServiceContractServiceChargeVo queryContractServiceCharge(ServiceContractServiceChargeVo serviceChargeVo) {
        return contractDao.queryContractServiceCharge(serviceChargeVo);
    }

    /**
     * 更新合同信息
     *
     * @param contractBody
     * @return
     */
    public boolean updateContractBody(UserCenterContractBody contractBody) {
        return contractDao.updateContractBody(contractBody) > 0;
    }

    /**
     * 查询合同视图列表
     *
     * @param viewBusinessContractVo
     * @return
     */
    public List<ViewBusinessContractVo> selectContractViewList(ViewBusinessContractVo viewBusinessContractVo) {
        return contractDao.selectContractViewList(viewBusinessContractVo);
    }

    /**
     * 查询合同执行记录
     *
     * @param contractObject_code
     * @return
     */
    public List<ContractImplRecordVo> queryContractImplementRecordList(String contractObject_code) {
        ContractImplRecordVo implementRecordVo = new ContractImplRecordVo();
        implementRecordVo.setContractObject_code(contractObject_code);
        return contractDao.queryContractImplementRecordList(implementRecordVo);
    }

    /**
     * 查询合约订单数据
     *
     * @return
     * @Description:
     * @author JiangQt
     */
    public BusinessCancelContractOrder queryCancelContractByWhere(BusinessCancelContractOrder businessCancelContractOrder) {
        return contractDao.queryCancelContractByWhere(businessCancelContractOrder);
    }

    /**
     * 通过SQL条件查询合同信息
     *
     * @param pagination
     * @return
     * @作者 JiangQT
     * @日期 2016年6月27日
     */
    public PageModel<ViewBusinessContractVo> queryViewContractInfoList(PageModel<ViewBusinessContractVo> pagination) {
        return contractDao.queryViewContractInfoList(pagination);
    }

    /**
     * 添加合同图片
     *
     * @param contractImageVo
     * @作者 JiangQT
     * @日期 2016年7月29日
     */
    public boolean addContractImage(ContractImageVo contractImageVo) {
        return contractDao.addContractImage(contractImageVo) > 0;
    }

    /**
     * 手动添加执行记录
     *
     * @param implementRecordVo
     * @return
     */
    public boolean addHouseRecord(ContractImplRecordVo implementRecordVo) {
        return contractDao.addHouseRecord(implementRecordVo) > 0;
    }

    /**
     * 查询合同记录List
     *
     * @param contractImplRecordVo
     * @return
     */
    public List<ContractImplRecordVo> selectContractImplRecordList(ContractImplRecordVo contractImplRecordVo) {
        return contractDao.selectContractImplementRecordList(contractImplRecordVo);
    }

    /**
     * 查询合同记录List数量
     *
     * @param contractImplRecordVo
     * @return
     */
    public int selectContractImplRecordListCount(ContractImplRecordVo contractImplRecordVo) {
        return contractDao.queryContractImplementRecordListCount(contractImplRecordVo);
    }

    /**
     * 查询房屋有效合同（租赁/托管）
     *
     * @param userCenterContractObject
     * @return
     */
    public List<ContractObjectVo> selectContractObjectState(ContractObjectVo userCenterContractObject) {
        return contractDao.selectContractObjectState(userCenterContractObject);
    }

    /**
     * 执行合同继承
     *
     * @param contractVo2
     * @return
     * @作者 JiangQT
     * @日期 2016年8月29日
     */
    public String callContractSuccessor(ViewBusinessContractVo contractVo2) {
        return contractDao.callContractSuccessor(contractVo2);
    }

    /**
     * 查询合同图片数据
     *
     * @param con_code
     * @return
     * @作者 JiangQT
     * @日期 2016年8月30日
     */
    public List<ContractImageVo> queryContractImage(String con_code) {
        ContractImageVo contractImageVo = new ContractImageVo();
        contractImageVo.setContractObject_Code(con_code);
        return queryContractImage(contractImageVo);
    }

    /**
     * 查询合同图片数据
     *
     * @param imageVo
     * @return
     * @作者 JiangQT
     * @日期 2016年8月30日
     */
    public List<ContractImageVo> queryContractImage(ContractImageVo imageVo) {
        List<ContractImageVo> contractImageVos = contractDao.queryContractImage(imageVo);
        for (ContractImageVo contractImageVo: contractImageVos) {
            contractImageVo.setCi_path_real(AliOSS.getUrl(contractImageVo.getCi_path()).toString());
        }
        return contractImageVos;
    }

    /**
     * 根据合同编号修改合同物品添置总金额
     *
     * @param userCenterContractObject
     * @return
     */
    public int updateContractObjectGoodsMoney(ContractObjectVo userCenterContractObject) {
        return contractDao.updateContractObjectGoodsMoney(userCenterContractObject);
    }

    /**
     * 添加业务账单
     *
     * @param businessBillVo
     * @return
     * @作者 JiangQT
     * @日期 2016年9月8日
     */
    public boolean addBusinessBill(BillBusinessBillVo businessBillVo) {
        return contractDao.addBusinessBill(businessBillVo) > 1;
    }

    /**
     * 查询业务账单
     *
     * @param businessBillVo
     * @return
     * @作者 JiangQT
     * @日期 2016年9月8日
     */
    public BillBusinessBillVo queryBusinessBill(BillBusinessBillVo businessBillVo) {
        return contractDao.queryBusinessBill(businessBillVo);
    }

    /**
     * 删除业务账单数据
     *
     * @param businessBillVo
     * @return
     * @作者 JiangQT
     * @日期 2016年9月8日
     */
    public boolean deleteBusinessBill(BillBusinessBillVo businessBillVo) {
        return contractDao.deleteBusinessBill(businessBillVo) > 1;
    }

    /**
     * 查询最新一份合同
     *
     * @param contractVo
     * @return
     * @作者 JiangQT
     * @日期 2016年10月9日
     */
    public ViewBusinessContractVo queryLastContract(ViewBusinessContractVo contractVo) {
        return contractDao.queryLastContract(contractVo);
    }

    /**
     * 查询合同执行记录分页数据
     *
     * @param pagination
     * @return
     * @作者 JiangQT
     * @日期 2016年10月19日
     */
    public List<ContractImplRecordVo> queryContractImplRecordPageList(Pagination<ContractImplRecordVo> pagination) {
        return contractDao.queryContractImplRecordPageList(pagination);
    }

    /**
     * 查询合同执行记录分页数据总条数
     *
     * @param pagination
     * @return
     * @作者 JiangQT
     * @日期 2016年10月19日
     */
    public int queryContractImplRecordPageRecords(Pagination<ContractImplRecordVo> pagination) {
        return contractDao.queryContractImplRecordPageRecords(pagination);
    }

    /**
     * 更新合同执行记录
     *
     * @param contractImplRecord
     * @return
     * @作者 JiangQT
     * @日期 2016年10月23日
     */
    public boolean updateContractImplRecord(ContractImplRecordVo contractImplRecord) {
        return contractDao.updateContractImplRecord(contractImplRecord) > 0;
    }

    /**
     * 查询合同执行记录
     *
     * @param contractImplRecord
     * @return
     * @作者 JiangQT
     * @日期 2016年10月23日
     */
    public ContractImplRecordVo queryContractImplementRecord(ContractImplRecordVo contractImplRecord) {
        return contractDao.queryContractImplementRecord(contractImplRecord);
    }

    public List<ViewBusinessCancelContractListVo> queryCancelContractList(Pagination<ViewBusinessCancelContractListVo> pagination) {
        return contractDao.queryCancelContractList(pagination);
    }

    public int queryCancelContractListTotalRecords(Pagination<ViewBusinessCancelContractListVo> pagination) {
        return contractDao.queryCancelContractListTotalRecords(pagination);
    }

    /**
     * 查询类型表数据
     *
     * @return
     * @作者 JiangQT
     * @日期 2017年1月17日
     */
    public List<BusinesTypeVo> queryTypeList(BusinesTypeVo businesTypeVo) {
        return contractDao.queryTypeList(businesTypeVo);
    }

    /**
     * 查询类型表数据
     *
     * @param bt_parentCode
     * @return
     * @作者 JiangQT
     * @日期 2017年1月17日
     */
    public List<BusinesTypeVo> queryTypeList(Integer bt_parentCode) {
        BusinesTypeVo businesTypeVo = new BusinesTypeVo();
        businesTypeVo.setBt_parentCode(bt_parentCode);
        return contractDao.queryTypeList(businesTypeVo);
    }

    public int updateContractBodyRemark(UserCenterContractBody userCenterContractBody) {
        return contractDao.updateContractBodyRemark(userCenterContractBody);
    }

    /**
     * APP:查询合同分页列表
     *
     * @param pagination
     * @return
     * @作者 JiangQT
     * @日期 2017年3月22日
     */
    public Pagination<ViewBusinessContractVo> queryContractPageList(Pagination<ViewBusinessContractVo> pagination) {
        return contractDao.queryContractPageList(pagination);
    }

    /**
     * app查询合同列表
     *
     * @param appContractVo
     * @return
     */
    public List<AppContractVo> appSelectContractList(AppContractVo appContractVo) {
        return contractDao.appSelectContractList(appContractVo);
    }

    /**
     * 更新合同对象之客户签名
     *
     * @param contractObject
     * @return
     * @作者 JiangQT
     * @日期 2017年3月30日
     */
    public boolean updateContractObjectForSignature(ContractObjectVo contractObject) {
        return contractDao.updateContractObjectForSignature(contractObject) > 0;
    }

    /**
     * @param businessContractVo
     * @return
     * @作者 shenhx
     * @日期 20170409 查询超期、30天内到期的合同
     */
    public List<ViewBusinessContractVo> queryWarnContractListToApp(ViewBusinessContractVo businessContractVo) {
        return contractDao.queryWarnContractListToApp(businessContractVo);
    }

    /**
     * 待办合同
     *
     * @param contractObject
     * @return
     * @author 陈智颖
     * @date Apr 9, 2017 7:16:02 PM
     */
    public List<ContractObjectVo> stayContract(ContractObjectVo contractObject) {
        return contractDao.stayContract(contractObject);
    }

    /**
     * 查询结算订单分页数据
     *
     * @param pagination
     * @return
     * @作者 JiangQT
     * @日期 2017年4月20日
     */
    public Pagination<ViewBusinessCancelContractListVo> querySettlementOrderPageList(Pagination<ViewBusinessCancelContractListVo> pagination) {
        return contractDao.querySettlementOrderPageList(pagination);
    }

    /**
     * 查询合同下所有的招租申请信息
     *
     * @param businessCancelContractOrder
     * @return
     * @author shenhx
     * @date 20170502
     */
    public List<BusinessCancelContractOrder> queryCancelContractListInfo(BusinessCancelContractOrder businessCancelContractOrder) {
        return contractDao.queryCancelContractListInfo(businessCancelContractOrder);
    }

    /**
     * 查询最新一份合同
     *
     * @return
     */
    public ViewBusinessContractVo queryContractObjectLastOne(ViewBusinessContractVo viewContractVo) {
        return contractDao.queryContractObjectLastOne(viewContractVo);
    }

    /**
     * 新增调价申请记录
     *
     * @param priceApplyRecord
     * @return
     */
    public int addPriceApplyRecord(PriceApplyRecord priceApplyRecord) {
        return contractDao.addPriceApplyRecord(priceApplyRecord);
    }

    /**
     * 分页查询调价申请
     *
     * @return
     */
    public PageModel<PriceApplyRecord> queryPriceApplyRecordList(int pageNo, int pageSize, HouseModel houseModel) {
        return contractDao.queryPriceApplyRecordList(pageNo, pageSize, houseModel);
    }

    /**
     * 根据ID查询单个调价申请记录
     *
     * @param priceApplyRecord
     * @return
     */
    public PriceApplyRecord queryPriceApplyRecord(PriceApplyRecord priceApplyRecord) {
        return contractDao.queryPriceApplyRecord(priceApplyRecord);
    }

    /**
     * 更新调价申请记录
     *
     * @param priceApplyRecord
     * @return
     */
    public int updatePriceApplyRecord(PriceApplyRecord priceApplyRecord) {
        return contractDao.updatePriceApplyRecord(priceApplyRecord);
    }

    /**
     * 根据房源编号查询调价申请记录中是否有同一个房源多次申请，且处于待审核状态
     *
     * @param priceApplyRecord
     * @return
     */
    public List<PriceApplyRecord> queryRecordByHiCode(PriceApplyRecord priceApplyRecord) {
        return contractDao.queryRecordByHiCode(priceApplyRecord);
    }

    /**
     * 根据房屋编码查询合同信息
     *
     * @param businessContractVo
     * @return
     * @author 陈智颖
     * @date Jun 3, 2017 10:02:32 AM
     */
    public ViewBusinessContractVo selectViewContractListHiCode(ViewBusinessContractVo businessContractVo) {
        return contractDao.selectViewContractListHiCode(businessContractVo);
    }

    /**
     * 保存客户、管家短信记录
     *
     * @param hi_code
     * @param msg
     * @param boo
     */
    private void saveUserCenterMsgRecord(String hi_code, String msg, Integer boo) {
        UserCenterInformation userCenterInformation = new UserCenterInformation();
        userCenterInformation.setHi_code(hi_code);
        userCenterInformation.setMsg_content(msg);
        userCenterInformation.setSend_result(boo);
        userCenterInformation.setEm_id(1);// 系统
        userCenterInformation.setReceive_type(1);
        userCenterInformation.setReceive_cc_code("");
        userCenterInformation.setSend_time(new Date());
        smsService.addUserCenterInformation(userCenterInformation);
    }

    /**
     * 查询电子合同模板信息
     *
     * @param contractVersionManage
     * @return
     */
    public ContractVersionManage queryContractVersion(ContractVersionManage contractVersionManage) {
        return contractDao.queryContractVersion(contractVersionManage);
    }

    /**
     * 查询合同信息
     *
     * @param view
     * @param contractObject_code
     */
    public void queryContractToPrint(ModelAndView view, String contractObject_code, ContractVersionManage versionManage) {
        // 合同对象-租赁合同
        ContractObjectVo contractObject_ZL = new ContractObjectVo();
        contractObject_ZL.setContractObject_Code(contractObject_code);
        contractObject_ZL = this.queryContractObject(contractObject_ZL);

        String contractObject_Other = contractObject_ZL.getContractObject_Other();
        contractObject_ZL.setContractObject_Other(StringUtils.isEmpty(contractObject_Other) ? "无" : contractObject_Other);
        view.addObject("contractObject", contractObject_ZL);

        String hi_code = contractObject_ZL.getHi_code();
        // 合同对象-托管合同
        ContractObjectVo contractObject_TG = new ContractObjectVo();
        contractObject_TG.setHi_code(hi_code);
        contractObject_TG.setContractObject_Type("托管合同");
        contractObject_TG = this.queryContractObject(contractObject_TG);
        view.addObject("contractObject_TG", contractObject_TG);

        view.addObject("startDateArray", DataUtil.DateToStrs(contractObject_ZL.getContractObject_Date()).split("-"));
        view.addObject("endDateArray", DataUtil.DateToStrs(contractObject_ZL.getContractObject_DeadlineTime()).split("-"));
        view.addObject("fillTimeArray", DataUtil.DateToStrs(contractObject_ZL.getContractObject_FillTime()).split("-"));

        // 查询合同-房东信息
        ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
        contractVo.setHi_code(contractObject_ZL.getHi_code());
        contractVo.setContractObject_Type("托管合同");
        contractVo = this.selectContractObjectByCNo(contractVo);
        view.addObject("contractVo", contractVo);
//        ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
//        contractVo.setContractObject_Code(contractObject_code);
//        contractVo = this.selectContractObjectByCNo(contractVo);
//        view.addObject("contractVo", contractVo);

        // 合同主体
        UserCenterContractBody contractBody = this.queryContractBody(contractObject_ZL.getContractObject_Code());
        view.addObject("contractBody", contractBody);

        String[] startEndDate = contractBody.getContractBody_StartTOEnd().split("~");
        try {
            String startEndDateStr = AppUtil.getYearMonthDay(startEndDate[0], startEndDate[1]);
            view.addObject("ymd_year", startEndDateStr.substring(0, startEndDateStr.indexOf("年")));
            view.addObject("ymd_month", startEndDateStr.substring(startEndDateStr.indexOf("年") + 1, startEndDateStr.indexOf("月")));
            view.addObject("ymd_day", startEndDateStr.substring(startEndDateStr.indexOf("月") + 1, startEndDateStr.indexOf("日")));
        } catch (Exception e) {
            e.printStackTrace();
        }

        // 房屋信息
        ViewHouseLibraryInfoVo libraryHouseInfo = houseLibraryService.queryHouseLibraryInfo(contractObject_ZL.getHi_code());
        view.addObject("houseInfo", libraryHouseInfo);

        // 合同账单
        ContractOrderVo contractOrderVo = new ContractOrderVo();
        contractOrderVo.setBco_orderType(AppConfig.order_type_1);
        contractOrderVo.setContractObject_code(contractObject_code);
        contractOrderVo = financeManageService.queryFinanceOrder(contractOrderVo);
        List<ContractBillVo> billContractList = null;
        if (contractOrderVo != null) {
            billContractList = billContractOrderService.queryContractBillList(contractOrderVo.getBco_code(), null);
            // 合同总租金
            double totalRent = 0;
            ContractBillVo contractBillVo = new ContractBillVo();
            contractBillVo.setBco_code(contractOrderVo.getBco_code());
            List<ContractBillVo> financeBillList = financeManageService.queryFinanceBillList(contractBillVo);
            for (ContractBillVo contractBillVo1: financeBillList) {
                if (contractBillVo1.getBcb_type() == 0 && contractBillVo1.getBcb_repayment() != null) {
                    totalRent += contractBillVo1.getBcb_repayment().doubleValue();
                }
            }
            view.addObject("totalRent", totalRent);
        }

        view.addObject("billContractList", billContractList);
        if (null != billContractList) {

            for (ContractBillVo billVo: billContractList) {
                billVo.setRepaymentDateArr(DataUtil.DateToStrs(billVo.getBcb_repaymentDate()).split("-"));
            }
            view.addObject("billContractList", billContractList);
        }

        String[] rentPlus = AppUtil.reSetParam(contractBody.getContractBody_Increasing());
        view.addObject("rentPlusArr", rentPlus);
        view.addObject("freeTime", AppUtil.reSetParam(contractVo.getContractBody_FreeTime()));
        view.addObject("payStyle", contractBody.getContractBody_PayStyle().substring(0, contractBody.getContractBody_PayStyle().indexOf("付")));
        view.addObject("startPayTime", DataUtil.DateToStrs(contractBody.getContractBody_StartPayTime()));

        // 托管合同计算每年的租金
        if (null != contractBody.getContractBody_Increasing()) {
            StringBuilder rentPlusStr = new StringBuilder();
            double rent = contractVo.getContractBody_Rent();
            // 一年期限
            String bodyRentPlus = contractBody.getContractBody_Increasing();
            if (!bodyRentPlus.contains("|")) {
                if (bodyRentPlus.contains("%")) {
                    rent = rent * (1 + ArithUtil.math_divide(Double.valueOf(bodyRentPlus.replaceAll("%", "")), 100).doubleValue());
                } else {
                    rent = rent + Integer.parseInt(bodyRentPlus);
                }
                rentPlusStr = new StringBuilder(String.valueOf(rent));
                view.addObject("rentPlusStr", rentPlusStr.toString());
            } else {
                rentPlus = contractBody.getContractBody_Increasing().split("\\|");
                for (String rentPlu: rentPlus) {
                    if (null == rentPlu) {
                        continue;
                    }
                    if (bodyRentPlus.contains("%")) {
                        rent = rent * (1 + ArithUtil.math_divide(Double.valueOf(rentPlu.replaceAll("%", "")), 100).doubleValue());
                    } else {
                        rent = rent + Double.parseDouble(rentPlu);
                    }
                    rentPlusStr.append(String.valueOf(rent)).append(",");
                }
                view.addObject("rentPlusStr", rentPlusStr.substring(0, (rentPlusStr.length() - 1)));
            }
        }

        // 客户信息
        UserCustomer customer = new UserCustomer();
        customer.setContractObject_code(contractObject_ZL.getContractObject_Code());
        List<UserCustomer> customers = customerService.queryCustomerRelaContractList(customer);
        for (UserCustomer userCustomer: customers) {
            // 银行卡
            UserCustomerBank customerBank = new UserCustomerBank();
            customerBank.setCc_id(userCustomer.getCc_id());
            userCustomer.setCustomerBank(customerService.queryCustomerBank(customerBank));
        }
        view.addObject("customers", customers);
        UserCustomer customerInfo = new UserCustomer();
        if (null != customers) {
            for (UserCustomer userCustomer: customers) {
                if (userCustomer.getCrc_role() == 0) {
                    customerInfo = userCustomer;
                    break;
                }
            }
        }
        view.addObject("customerInfo", customerInfo);

        // 签约代表
        UserCenterEmployee userCenterEmployee = new UserCenterEmployee();
        userCenterEmployee.setEm_id(contractObject_ZL.getContractObject_Contractor());
        userCenterEmployee = employeeService.queryEmployeeInfo(userCenterEmployee);
        view.addObject("contractor", userCenterEmployee);

        versionManage.setContract_version(contractObject_ZL.getContractObject_Version());
        versionManage = this.queryContractVersionPriview(versionManage);
        if (null != versionManage) {
            view.setViewName(versionManage.getContract_path());
        }
    }

    /**
     * 获取签名验证
     *
     * @param contractSignVerifyVo
     * @return
     */
    public ContractSignVerifyVo queryContractSignVerify(ContractSignVerifyVo contractSignVerifyVo) {
        return contractDao.queryContractSignVerify(contractSignVerifyVo);
    }

    public ContractSignVerifyVo queryContractSignVerify(String con_code) {
        ContractSignVerifyVo contractSignVerifyVo = new ContractSignVerifyVo();
        contractSignVerifyVo.setCon_code(con_code);
        return contractDao.queryContractSignVerify(contractSignVerifyVo);
    }

    /**
     * 添加签名验证
     *
     * @param contractSignVerifyVo
     * @return
     */
    public boolean addContractSignVerify(ContractSignVerifyVo contractSignVerifyVo) {
        return contractDao.addContractSignVerify(contractSignVerifyVo) > 0;
    }

    /**
     * 更新签名验证
     *
     * @param contractSignVerifyVo
     * @return
     */
    public boolean updateContractSignVerify(ContractSignVerifyVo contractSignVerifyVo) {
        return contractDao.updateContractSignVerify(contractSignVerifyVo) > 0;
    }

    /**
     * 查询合同版本查询合同模板
     *
     * @param contractVersionManage
     * @return
     */
    public ContractVersionManage queryContractVersionPriview(ContractVersionManage contractVersionManage) {
        return contractDao.queryContractVersionPriview(contractVersionManage);
    }

    /**
     * 根据合同序号查询合同
     *
     * @author tanglei
     * @Date 2017年8月11日 上午9:55:55
     */
    public ContractObjectVo selectContractObjectId(ContractObjectVo contractObjectVo) {
        return contractDao.selectContractObjectId(contractObjectVo);
    }

    /**
     * 删除指定路径文件
     *
     * @param path
     * @return
     */
    public Map<String, Object> deleteFileByPath(String path) {
        Map<String, Object> resultMap = new HashMap<>();
        File file = new File(path);
        if (!file.exists()) {
            resultMap.put("code", 401);
            resultMap.put("msg", "文件不存在");
        }
        file.delete();
        return resultMap;
    }

    /**
     * 生成PDF
     *
     * @param con_code  合同编码
     * @param con_type  合同类型tg/zl
     * @param con_uses  priview
     * @param con_where pc
     * @return pdfFile pdf文件
     */
    public Map<String, Object> generatePDFtoSSQ(String con_code, String con_type, String con_uses, String con_where, HttpServletRequest request) {
        Map<String, Object> resultMap = new HashMap<>();

        String realPath = request.getSession().getServletContext().getRealPath("/resources/contractImage/");
//        String watermarkPath = request.getSession().getServletContext().getRealPath("/resources/image/");
        String contract_name = "contract_ssq" + new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) + ".pdf";
        String authBook_name = "authbook_ssq" + new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) + ".pdf";

        String requestUrl = request.getScheme() //当前链接使用的协议
                + "://" + request.getServerName()//服务器地址
                + ":" + request.getServerPort(); //端口号

        String con_url = requestUrl + "/contractObject/contractPreview" + "?" + "con_code=" + con_code + "&con_type=" + con_type + "&con_uses=preview&con_where=pc&generate=ture";
        String auth_rul = requestUrl + "/contractObject/contractAuthBook" + "?" + "con_code=" + con_code + "&con_type=tg&generate=ture";

        String waterPdf = ("wte_" + new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) + ".pdf");

        if ("tg".equals(con_type)) {// 合并电子合同和授权委托书

            boolean con_bool = HtmlToPdf.convert(con_url, realPath + contract_name);
            boolean auth_bool = HtmlToPdf.convert(auth_rul, realPath + authBook_name);

            if (!con_bool || !auth_bool) {
                resultMap.put("code", 401);
                resultMap.put("msg", "PDF文件生成错误");
                return resultMap;
            }

            String mergePdf = ("meg_" + new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) + ".pdf");

            try {
                HtmlToPdf.mergePDF(realPath, contract_name, authBook_name, mergePdf);
            } catch (IOException e) {
                e.printStackTrace();
                resultMap.put("code", 401);
                resultMap.put("msg", "PDF文件合并错误");
                return resultMap;
            }
            // 要输出的pdf文件
            BufferedOutputStream bos = null;
            boolean waterBool = true;
//            try {
//                bos = new BufferedOutputStream(new FileOutputStream(new File(realPath + waterPdf)));
//                HtmlToPdf.waterMark(bos, realPath + mergePdf, watermarkPath + "watermark.png");
//            } catch (FileNotFoundException e) {
//                e.printStackTrace();
//                waterBool = false;
//            } catch (DocumentException e) {
//                e.printStackTrace();
//                waterBool = false;
//            } catch (IOException e) {
//                e.printStackTrace();
//                waterBool = false;
//            }
            float[] xy_page = HtmlToPdf.getKeyWords(realPath + mergePdf);
            if (waterBool) {
                resultMap.put("code", 200);//realPath + mergePdf
                resultMap.put("xy_page", xy_page);
//                resultMap.put("pdfFile", new File(realPath + waterPdf));
                resultMap.put("pdfFile", new File(realPath + mergePdf));
            } else {
                resultMap.put("code", 401);
                resultMap.put("msg", "PDF文件添加水印错误");
            }

            try {
                Thread.sleep(3000);
                new File(realPath + contract_name).delete();
                new File(realPath + authBook_name).delete();
//                new File(realPath + mergePdf).delete();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        } else if ("zl".equals(con_type)) {
            boolean con_bool = HtmlToPdf.convert(con_url, realPath + contract_name);
            if (con_bool) {
                String mergePdf = ("meg_" + new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) + ".pdf");

                try {
                    HtmlToPdf.mergePDF(realPath, contract_name, "", mergePdf);
                } catch (IOException e) {
                    e.printStackTrace();
                    resultMap.put("code", 401);
                    resultMap.put("msg", "PDF文件合并错误");
                    return resultMap;
                }

                // 要输出的pdf文件
//                BufferedOutputStream bos = null;
//                boolean waterBool = true;
//                try {
//                    bos = new BufferedOutputStream(new FileOutputStream(new File(realPath + waterPdf)));
//                    HtmlToPdf.waterMark(bos, realPath + contract_name, watermarkPath + "watermark.png");
//                } catch (FileNotFoundException e) {
//                    e.printStackTrace();
//                } catch (DocumentException e) {
//                    e.printStackTrace();
//                } catch (IOException e) {
//                    e.printStackTrace();
//                }

//                if (waterBool) {
                float[] xy_page = HtmlToPdf.getKeyWords(realPath + mergePdf);
                resultMap.put("code", 200);
                resultMap.put("xy_page", xy_page);
                resultMap.put("pdfFile", new File(realPath + mergePdf));
//                } else {
//                    resultMap.put("code", 401);
//                    resultMap.put("msg", "PDF文件添加水印错误");
//                }
            } else {
                resultMap.put("code", 401);
                resultMap.put("msg", "PDF文件生成错误");
            }
            try {
                Thread.sleep(3000);
                new File(realPath + contract_name).delete();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return resultMap;
        }
        return resultMap;
    }

    /**
     * 更新合同签署状态
     *
     * @throws Exception
     */
    public void updateContractSignStatus(ContractObjectVo contractObject) throws Exception {
        // 获取签字验证数据
        ContractSignVerifyVo contractSignVerifyVo = this.queryContractSignVerify(contractObject.getContractObject_Code());
        if (contractSignVerifyVo == null) {
            throw new AppException("没有发现该合同签名验证，请重试或联系管理员");
        }

        // 查询合同签署状态
        JSONObject contractSignStatus = BestSignUtil.queryContractStatus(contractSignVerifyVo.getCs_contractId());
        if (contractSignStatus.getIntValue("errno") != 0) {
            throw new AppException(contractSignStatus.getString("errmsg"));
        }

        JSONObject statusJSONObject = contractSignStatus.getJSONObject("data");

        // 判断签署者是否都签署完毕
        int count = 0;
        for (Map.Entry<String, Object> entry: statusJSONObject.entrySet()) {
            if ("2".equals(entry.getValue())) count++;
        }
        if (count != statusJSONObject.size()) {
            throw new AppException("还没有签署完毕，请等待");
        }

        // 更新签名验证
        ContractSignVerifyVo contractSignVerifyVo2 = new ContractSignVerifyVo();
        contractSignVerifyVo2.setCs_id(contractSignVerifyVo.getCs_id());
        contractSignVerifyVo2.setCs_state(3);
        this.updateContractSignVerify(contractSignVerifyVo2);

        // 更新合同
        if (AppConfig.TYPE_CONTRACT_201.equals(contractObject.getContractObject_Type())) {
            ContractObjectVo contractObjectVo = new ContractObjectVo();
            contractObjectVo.setContractObject_Code(contractObject.getContractObject_Code());
            contractObjectVo.setContractObject_OptionState(AppConfig.contract_optionstate_102);
            this.updateContractObject(contractObjectVo);
        }

        // 合同记录
        this.addContractRecord(contractObject.getContractObject_Code(), "客户已确认签署", "");

        // 签署完毕后记录
        ContractOrderVo contractOrderVo = new ContractOrderVo();
        contractOrderVo.setContractObject_code(contractObject.getContractObject_Code());
        contractOrderVo.setBco_orderType(AppConfig.order_type_1);
        contractOrderVo = financeManageService.queryFinanceOrder(contractOrderVo);
        if (contractOrderVo != null && contractOrderVo.getBco_optionState() != AppConfig.bco_optionState_3) {
            // 获取账单最小期数
            ContractBillVo contractBillVo = new ContractBillVo();
            contractBillVo.setBco_code(contractOrderVo.getBco_code());
            int minCycle = financeManageService.queryFinanceBillForMinCycle(contractBillVo);

            // 更新账单状态
            contractBillVo = new ContractBillVo();
            contractBillVo.setBco_code(contractOrderVo.getBco_code());
            contractBillVo.setBcb_state(AppConfig.order_option_state_2);
            contractBillVo.setBcb_cycle_where(minCycle);
            financeManageService.updateFinanceBill(contractBillVo);

            // 执行账单订单事件
            financeManageService.updateFinanceOrderBillData(contractOrderVo.getBco_code());

            // 【提交租金订单支付】
            orderService._submitPayRent(AppConfig.bs_source_erp_app, contractBillVo.getBco_code(), null);
        }
    }

    /**
     * 区经审核
     *
     * @author tanglei
     * @Date 2017年10月11日  上午10:40:55
     */
    public Pagination<ViewBusinessContractVo> managerExamineList(Pagination<?> pagination) {
        return contractDao.managerExamineList(pagination);
    }

    /**
     * 附加协议审核
     *
     * @Date 2017年10月14日  下午13:08:55
     */
    public boolean updateContractAgreementAuditing(ContractAgreementAuditingVo agreementAuditingVo, ContractAgreementAuditingRecordVo agreementAuditingRecordVo) {
        boolean bool;
        bool = contractDao.updateAdditionalExamine(agreementAuditingVo) > 0;
        bool = contractDao.insertAgreementAuditingRecord(agreementAuditingRecordVo) > 0;
        return bool;
    }

    /**
     * 查询协议审核记录
     *
     * @Date 2017年10月14日  下午16:08:55
     */
    public List<ContractAgreementAuditingRecordVo> queryAgreementAuditingRecordList(String con_code) {
        ContractAgreementAuditingRecordVo agreementAuditingRecordVo = new ContractAgreementAuditingRecordVo();
        agreementAuditingRecordVo.setCon_code(con_code);
        return contractDao.queryAgreementAuditingRecordList(agreementAuditingRecordVo);
    }

    /**
     * 记账本查询关联合同
     */
    public List<ContractObjectVo> selectHouse(ContractObjectVo contract) {
        return contractDao.selectHouse(contract);
    }

    /**
     * 根据房屋code查询客户code
     */
    public List<ContractObjectVo> selectContractObject1st(ContractObjectVo contract) {
        return contractDao.selectContractObject1st(contract);
    }

    /**
     * 根据房屋code查询房屋名称
     */
    public ContractObjectVo selectHouseHiCode(ContractObjectVo contract) {
        return contractDao.selectHouseHiCode(contract);
    }

    /**
     * 合同主体
     */
    public ViewBusinessContractVo queryHouseContract(ViewBusinessContractVo viewBusinessContractVo) {
        return contractDao.queryHouseContract(viewBusinessContractVo);
    }

    public ContractInfoVo queryContractInfo(String con_code) {
        ContractInfoVo contractInfoBo = new ContractInfoVo();
        contractInfoBo.setContractObject_Code(con_code);
        return contractDao.queryContractInfo(contractInfoBo);
    }

    public List<ContractStatementBalanceVo> queryBalanceListByCode(ContractStatementBalanceVo statementBalanceVo) {
        return contractDao.queryBalanceListByCode(statementBalanceVo);
    }

    public List<ViewBusinessContractVo> queryContractNotObsolute(ViewBusinessContractVo viewBusinessContractVo) {
        return contractDao.queryContractNotObsolute(viewBusinessContractVo);
    }

    public HouseInfoKeep queryVacantHouseByCode(String hi_code) {
        return contractDao.queryVacantHouseByCode(hi_code);
    }

    public List<ContractObjectVo> selectGJPContractRelaEmp(ContractObjectVo contractObjectVo) {
        return contractDao.selectGJPContractRelaEmp(contractObjectVo);
    }
}