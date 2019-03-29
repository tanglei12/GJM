package com.gjp.controller;

import com.gjp.model.*;
import com.gjp.service.*;
import com.gjp.util.*;
import com.gjp.util.constant.Constant;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.*;

/**
 * E兼职
 *
 * @author zoe
 */
@Controller
public class EPartTimeJobController {

    // E兼职
    @Resource
    private EPartTimeJobService ePartTimeJobService;
    // 测评人
    @Resource
    private UserCenterEvaluationPersonService userCenterEvaluationPersonService;
    // 合同对象
    @Resource
    private ContractService userCenterContractObjectService;
    // 分成
    @Resource
    private UserCenterSeparateService userCenterSeparateService;
    // 预定账单
    @Resource
    private ReserveBillService reserveBillService;

    /**
     * 跳转ejz
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/ejzPerson")
    public String ejzPerson(HttpServletRequest request,
                            HttpServletResponse response) {
        return "/evaluationPerson/framework2";
    }

    /**
     * 跳转ejz查询已签合同的租房预定账单
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/ejzHouse")
    public String ejzHouse(HttpServletRequest request,
                           HttpServletResponse response) {
        return "/ejz/reserveBill";
    }

    /**
     * 跳转ejz根据预订单号查询已签合同的租房预定账单
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/ejzSelectMon")
    public String ejzSelectMon(HttpServletRequest request,
                               HttpServletResponse response, String rb_number) {
        //在导向编辑页面时，向request和session域中添加uuid随机数
        UUIDToken.generateUUIDToken(request);
        ReserveBill reserveBill = reserveBillService.ejzSelectMon(rb_number);
        //查询根据预定账单签订的合同
        ContractObjectVo userCenterContractObject = userCenterContractObjectService.selectReserveContractObjectByHICode(reserveBill.getRb_houseNum());
        request.setAttribute("reserveBill", reserveBill);
        request.setAttribute("userCenterContractObject", userCenterContractObject);
        return "/ejz/reserveBillMon";
    }

    /**
     * 查询第一级ejz账号
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/selectejz")
    @ResponseBody
    public Map<String, Object> selectejz(
            HttpServletRequest request, HttpServletResponse response) {
        //查询一级e兼职用户
        List<UserCenterDistributionAccount> userCenterDistributionAccountList = ePartTimeJobService.selectDistributionAccountByNull();
        Map<String, Object> map = new HashMap<>();
        map.put("userCenterDistributionAccountList", userCenterDistributionAccountList);
        map.put("size", userCenterDistributionAccountList.size());
        return map;
    }

    /**
     * 查询已签合同的租房预定账单
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/selectEjzReserveBill")
    @ResponseBody
    public Map<String, Object> selectEjzReserveBill(
            HttpServletRequest request, HttpServletResponse response, String page, String cookie, String txt) {
        int pageNo = Integer.parseInt(page);
        if (pageNo == 0) {
            pageNo = 1;
        }

        //设置分页条数
        int cookies = Constant.PAGE_SIZE;
        if ("undefined".equals(cookie)) {

        } else {
            if (cookie != null && !"".equals(cookie)) {
                cookies = Integer.parseInt(cookie);
                if (cookies == 0) {
                    cookies = Constant.PAGE_SIZE;
                }
            }
        }
        //查询分页实体
        PageModel<ReserveBill> pageModel = reserveBillService
                .selectEjzReserveBill(pageNo, cookies, txt);
        Map<String, Object> map = new HashMap<>();
        map.put("pageModel", pageModel);
        return map;

    }

    /**
     * ejz租房打款
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/ejzUpdateState")
    public String updateState(HttpServletRequest request,
                              HttpServletResponse response, String ep_id, String uda_id, String ep_state, String ep_wayMon, String one, String two, String three, String four) {
        //判断是否重复提交
        if (!UUIDToken.isRepeatSubmit(request)) {
            //修改预定账单打款状态
            ReserveBill reserveBill = new ReserveBill();
            reserveBill.setRb_Ejz(ep_state);
            reserveBill.setRb_number(ep_id);
            //租房成功添加分成金额
            if ("success".equals(ep_state)) {
                reserveBill.setEp_wayMon(Double.parseDouble(ep_wayMon));
                Double ep_leave = Double.parseDouble(ep_wayMon);
                if (uda_id == null || "".equals(uda_id)) {

                } else {
                    List<Integer> uda_ids = addSeparate(uda_id);
                    for (int i = 0; i < uda_ids.size(); i++) {
                        UserCenterSeparate userCenterSeparate = new UserCenterSeparate();
                        userCenterSeparate.setEw_date(new Date());
                        userCenterSeparate.setEp_id(ep_id);
                        userCenterSeparate.setEw_state("未打款");
                        userCenterSeparate.setEw_way("租房");
                        userCenterSeparate.setUda_id(uda_ids.get(i));
                        if (i == 0) {
                            userCenterSeparate.setEw_percent(Integer.parseInt(one));
                            userCenterSeparate.setEw_grade("0级");
                            userCenterSeparate.setEw_money(Double.parseDouble(ep_wayMon) * Integer.parseInt(one) / 100);
                            ep_leave = ep_leave - Double.parseDouble(ep_wayMon) * Integer.parseInt(one) / 100;
                        } else if (i == 1) {
                            userCenterSeparate.setEw_grade("1级");
                            userCenterSeparate.setEw_percent(Integer.parseInt(two));
                            userCenterSeparate.setEw_money(Double.parseDouble(ep_wayMon) * Integer.parseInt(two) / 100);
                            ep_leave = ep_leave - Double.parseDouble(ep_wayMon) * Integer.parseInt(two) / 100;
                        } else if (i == 2) {
                            userCenterSeparate.setEw_grade("2级");
                            userCenterSeparate.setEw_percent(Integer.parseInt(three));
                            userCenterSeparate.setEw_money(Double.parseDouble(ep_wayMon) * Integer.parseInt(three) / 100);
                            ep_leave = ep_leave - Double.parseDouble(ep_wayMon) * Integer.parseInt(three) / 100;
                        } else {
                            userCenterSeparate.setEw_grade("3级");
                            userCenterSeparate.setEw_percent(Integer.parseInt(four));
                            userCenterSeparate.setEw_money(Double.parseDouble(ep_wayMon) * Integer.parseInt(four) / 100);
                            ep_leave = ep_leave - Double.parseDouble(ep_wayMon) * Integer.parseInt(four) / 100;
                        }
                        //添加分成结算
                        userCenterSeparateService.addSeparate(userCenterSeparate);
                    }
                }
                reserveBill.setEp_leave(ep_leave);

            } else {
            }
            reserveBillService.updateState(reserveBill);
        } else {
            return "/ejz/reserveBill";
        }

        request.getSession().removeAttribute("token");//移除session中的token

        return "/ejz/reserveBill";
    }


    /**
     * 查询第一级ejz账号
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/selectejzNext")
    @ResponseBody
    public Map<String, Object> selectejzNext(
            HttpServletRequest request, HttpServletResponse response, String uda_id) {
        //查询下一级e兼职用户
        List<UserCenterDistributionAccount> userCenterDistributionAccountList = ePartTimeJobService.selectDistributionAccountNext(Integer.parseInt(uda_id));
        Map<String, Object> map = new HashMap<>();
        map.put("userCenterDistributionAccountList", userCenterDistributionAccountList);
        map.put("size", userCenterDistributionAccountList.size());
        return map;
    }


    /**
     * 查询账号通过兼职得到的金钱
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/selectejzMon")
    @ResponseBody
    public Map<String, Object> selectejzMon(
            HttpServletRequest request, HttpServletResponse response, String uda_id, String ep_name, String stateTime, String endTime, String ew_way) {
        HouseModel houseModel = new HouseModel();
        houseModel.setEp_name(ep_name);
        houseModel.setUda_id(Integer.parseInt(uda_id));
        if (!"".equals(stateTime)) {
            houseModel.setStateTime(DataUtil.StrToDates(stateTime));
        }
        if (!"".equals(endTime)) {
            houseModel.setEndTime(DataUtil.StrToDates(endTime));
        }
        houseModel.setEw_way(ew_way);
        //查询ejz收益
        List<UserCenterEvaluationPerson> userCenterEvaluationPersonList = userCenterEvaluationPersonService.selectEjz(houseModel);
        Map<String, Object> map = new HashMap<>();
        map.put("userCenterEvaluationPersonList", userCenterEvaluationPersonList);
        return map;
    }

    /**
     * 修改打款状态
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/updateState")
    @ResponseBody
    public Map<String, Object> updateState(
            HttpServletRequest request, HttpServletResponse response, String ew_state, String ew_id) {
        if ("1".equals(ew_state)) {
            ew_state = "已打款";
        }
        if ("2".equals(ew_state)) {
            ew_state = "未打款";
        }
        UserCenterSeparate userCenterSeparate = new UserCenterSeparate();
        userCenterSeparate.setEw_id(Integer.parseInt(ew_id));
        userCenterSeparate.setEw_state(ew_state);
        //修改打款状态
        int result = userCenterSeparateService.updateState(userCenterSeparate);
        Map<String, Object> map = new HashMap<>();
        map.put("result", result);
        return map;
    }

    /**
     * 添加e兼职账号
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/addUda")
    @ResponseBody
    public Map<String, Object> addUda(
            HttpServletRequest request, HttpServletResponse response, String uda_id, String uda_name, String uda_password, String uda_account, String uda_zfbNum) {
        UserCenterDistributionAccount userCenterDistributionAccount = new UserCenterDistributionAccount();
        userCenterDistributionAccount.setUda_name(uda_name);
        userCenterDistributionAccount.setUda_account(uda_account);
        userCenterDistributionAccount.setUda_password(MD5Util.GetMD5Code(uda_password));
        userCenterDistributionAccount.setUda_zfbNum(uda_zfbNum);
        userCenterDistributionAccount.setUda_num(Integer.parseInt(uda_id));
        userCenterDistributionAccount.setUda_time(new Date());
        int result = ePartTimeJobService.addUda(userCenterDistributionAccount);
        Map<String, Object> map = new HashMap<>();
        map.put("result", result);
        return map;
    }

    /**
     * 根据编号查询e兼职账号
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/selectUda")
    @ResponseBody
    public Map<String, Object> selectUda(
            HttpServletRequest request, HttpServletResponse response, String uda_id) {
        UserCenterDistributionAccount userCenterDistributionAccount = ePartTimeJobService.selectDistributionAccount(Integer.parseInt(uda_id));
        Map<String, Object> map = new HashMap<>();
        map.put("result", userCenterDistributionAccount);
        return map;
    }

    /**
     * 根据编号修改e兼职账号
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/updateUda")
    @ResponseBody
    public Map<String, Object> updateUda(
            HttpServletRequest request, HttpServletResponse response, String uda_id, String uda_name, String uda_account) {
        UserCenterDistributionAccount userCenterDistributionAccount = new UserCenterDistributionAccount();
        userCenterDistributionAccount.setUda_name(uda_name);
        userCenterDistributionAccount.setUda_account(uda_account);
        userCenterDistributionAccount.setUda_id(Integer.parseInt(uda_id));
        int result = ePartTimeJobService.updateUda(userCenterDistributionAccount);
        Map<String, Object> map = new HashMap<>();
        map.put("result", result);
        return map;
    }

    /**
     * 跳转ejz
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/ejz")
    public String ejz(HttpServletRequest request,
                      HttpServletResponse response) {
        return "/ejz/ejz";
    }

    /**
     * 查询分钱账户
     *
     * @param uda_id
     * @return
     * @author zoe
     */
    public List<Integer> addSeparate(String uda_id) {
        List<Integer> uda_ids = new ArrayList<Integer>();
        //根据分享码查询分享账户
        UserCenterDistributionAccount userCenterDistributionAccount = ePartTimeJobService.selectDistributionAccountByCode(uda_id);

        if (userCenterDistributionAccount.getUda_num() == null) {
        } else {
            uda_ids.add(userCenterDistributionAccount.getUda_id());
            uda_ids.add(userCenterDistributionAccount.getUda_num());
            int uda_num = userCenterDistributionAccount.getUda_num();
            for (int i = 0; i < 2; i++) {
                UserCenterDistributionAccount userCenterDistributionAccounts = ePartTimeJobService.selectDistributionAccount(uda_num);
                if (userCenterDistributionAccounts.getUda_num() != null && userCenterDistributionAccounts.getUda_num() != 0) {
                    uda_num = userCenterDistributionAccounts.getUda_num();
                    uda_ids.add(userCenterDistributionAccounts.getUda_num());
                }
            }
        }
        return uda_ids;
    }

}
