package com.gjp.config;

import com.gjp.model.UserCenterEmployee;
import com.gjp.util.AppUtil;
import com.gjp.util.Msg;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

/**
 * 登录过滤器
 *
 * @author JiangQt
 * @createTime 2015年7月8日上午10:37:48
 */
public class SessionFilter extends OncePerRequestFilter {

    // 绿色地址
    private Set<String> greenUrlSet = new HashSet<>();

    // 初始化绿色地址
    private void init() {
        if (!greenUrlSet.isEmpty()) return;

        /* PC */

        greenUrlSet.add("/user");
        greenUrlSet.add("/login");
        greenUrlSet.add("/houseSelect");
        greenUrlSet.add("/resources");
        greenUrlSet.add("/center");
        greenUrlSet.add("/LSFmessage");
        greenUrlSet.add("/service/addServiceJson");
        greenUrlSet.add("/service/changeType");
        greenUrlSet.add("/service/queryServiceDesc");
        greenUrlSet.add("/service/appUpload");
        greenUrlSet.add("/service/addServiceApplyInfoAPP");
        greenUrlSet.add("/service/queryApplyServiceOrderList");
        greenUrlSet.add("/service/queryAllServiceOrderList");
        greenUrlSet.add("/service/jumpAcceptServiceAPP");
        greenUrlSet.add("/service/addDispatching");
        greenUrlSet.add("/service/addTracks");
        greenUrlSet.add("/service/ServiceAcceptSubmit");
        greenUrlSet.add("/service/addVisit");
        greenUrlSet.add("/service/queryHouseInfo");
        greenUrlSet.add("/achievement/myAchievement");
        greenUrlSet.add("/propertyInfo/propertyInfoName");
        greenUrlSet.add("/propertyInfo/insertPropertyLivingPayment");
        greenUrlSet.add("/propertyInfo/propertyWater");
        greenUrlSet.add("/propertyInfo/insertPropertys");
        greenUrlSet.add("/propertyInfo/propertyParent");
        greenUrlSet.add("/propertyInfo/propertySuccess");
        greenUrlSet.add("/propertyInfo/boolProperty");
        greenUrlSet.add("/propertyInfo/propertySelect");
        greenUrlSet.add("/propertyInfo/propertySid");
        greenUrlSet.add("/propertyInfo/propertyList");
        greenUrlSet.add("/propertyInfo/queryPropertyInfo");
        greenUrlSet.add("/intention/houseIntentionEM");
        greenUrlSet.add("/intention/insertHouseIntention");
        greenUrlSet.add("/intention/queryHouseSource");
        greenUrlSet.add("/intention/selectHouseIntention");
        greenUrlSet.add("/intention/houseRecommendGroupList");
        greenUrlSet.add("/intention/houseBrandList");
        greenUrlSet.add("/intention/appUpload");
        greenUrlSet.add("/intention/userTable");
        greenUrlSet.add("/intention/insertReserveBill");
        greenUrlSet.add("/ueditors/jsp/");
        greenUrlSet.add("/advertisement");
        greenUrlSet.add("/houseLibrary/appQueryHouseDealList");
        greenUrlSet.add("/houseLibrary/appQueryRankingList");
        greenUrlSet.add("/intention/appIntentionList");
        greenUrlSet.add("/intention/addInitqs");
        greenUrlSet.add("/houseLibrary/forRentHouse");
        greenUrlSet.add("/houseLibrary/houseImageData");
        greenUrlSet.add("/contractObject/contractPreview");
        greenUrlSet.add("/contractObject/contractAuthBook");
        greenUrlSet.add("/contractObject/queryContractType"); // 合同类型
        greenUrlSet.add("/service/uploadServiceSignature");
        greenUrlSet.add("/financeManage/alipayNotify");
        greenUrlSet.add("/financeManage/weixinPayNotify");
        greenUrlSet.add("/houseLibrary/updatPropertyInfoName");
        greenUrlSet.add("/houseLibrary/telephoneRecords");
        greenUrlSet.add("/houseLibrary/lookAtHouse");
        greenUrlSet.add("/houseLibrary/appCode");
        greenUrlSet.add("/contractObject/queryContractInfo");

        /* COMMON */

        greenUrlSet.add("/dictionary/queryDistrictDictionary");
        greenUrlSet.add("/customer/customerControllerBool");
        greenUrlSet.add("/customer/addCustomerFollow");
        greenUrlSet.add("/financeManage/selectBillList");
        greenUrlSet.add("/contractObject/submitContractAuditing");
        greenUrlSet.add("/contractObject/submitContractReview");
        greenUrlSet.add("/service/queryAllContractHouse");
        greenUrlSet.add("/propertyInfo/propertyInfoAPP");
        greenUrlSet.add("/houseLibrary/selectHouseById");
        greenUrlSet.add("/service/queryPayObjectByHiCode");
        greenUrlSet.add("/contractObject/queryContractStatementInfo");
        greenUrlSet.add("/transferKeep/queryTransferInfo");
        greenUrlSet.add("/contractObject/addContractStatement");
        greenUrlSet.add("/service/queryPayInfo");
        greenUrlSet.add("/service/queryServiceInfo");

        /* APP */

        greenUrlSet.add("/appContract");
        greenUrlSet.add("/appHouse");
        greenUrlSet.add("/appPage");
        greenUrlSet.add("/appLogin");
        greenUrlSet.add("/appIntent");
        greenUrlSet.add("/financeManage/billContractOrderListApp");
        greenUrlSet.add("/appVersion");
        greenUrlSet.add("/appService");
        greenUrlSet.add("/intention");
        greenUrlSet.add("/file");
        greenUrlSet.add("/houseLibrary");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        // 初始化绿色地址
        init();

        String appUrl = AppUtil.getAppUrl();
        String uri = request.getRequestURI();

        // 处理静态资源
        if (appUrl.contains("/resources/")) {
            filterChain.doFilter(request, response);
            return;
        }
        if (uri.endsWith(".gif")
                || uri.endsWith(".png")
                || uri.endsWith(".ico")
                || uri.endsWith(".jpg")) {
            filterChain.doFilter(request, response);
            return;
        }

        System.out.println(appUrl);

        // 过滤绿色地址
        boolean boo = false;
        for (String url: greenUrlSet) {
            if (uri.contains(url)) {
                filterChain.doFilter(request, response);
                boo = true;
                break;
            }
        }
        if (boo) return;

        // 验证用户信息
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null || StringUtils.isEmpty(employee.getEm_id())) {
            if ("XMLHttpRequest".equals(request.getHeader("x-requested-with"))) {
                response.setContentType("application/json;charset=UTF-8");
                response.getWriter().write(new Msg<>(Msg.CODE_FAIL, Msg.MSG_LOGIN_ERROR).toString());
                response.getWriter().close();
                response.flushBuffer();
            } else {
                response.sendRedirect("/login");
            }
            return;
        }
        filterChain.doFilter(request, response);
    }

}
