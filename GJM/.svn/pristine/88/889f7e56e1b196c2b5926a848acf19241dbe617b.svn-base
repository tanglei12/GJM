package com.gjp.controller;

import com.gjp.model.ProductRechargeVo;
import com.gjp.service.ProductService;
import com.gjp.token.SameUrlData;
import com.gjp.util.Msg;
import com.gjp.util.Pagination;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

/**
 * @author wxr
 * @create 2017-12-19 16:42
 **/
@Controller
@RequestMapping("/product")
public class ProductController {

    @Resource
    ProductService productService;

    /**
     * 跳转充值管理
     *
     * @return
     */
    @RequestMapping("rechargeList")
    public String rechargeList() {
        return "/product/rechargeList";
    }

    /**
     * 添加修改充值管理
     *
     * @param productRechargeVo
     * @return
     */
    @RequestMapping("AddOrUpdateProductRecharge")
    @ResponseBody
    @SameUrlData
    public String AddOrUpdateProductRecharge(ProductRechargeVo productRechargeVo) {
        Msg<Object> msg = new Msg<>();
        try {
            msg = productService.AddOrUpdateProductRecharge(productRechargeVo);
        } catch (Exception e) {
            msg.setCode(401);
            msg.setMsg("失败");
            e.printStackTrace();
        }
        return msg.toString();
    }


    /**
     * 查询充值管理列表
     *
     * @param pagination
     * @return
     */
    @RequestMapping("/queryProductRechargePageList")
    public @ResponseBody
    String queryProductRechargePageList(Pagination<ProductRechargeVo> pagination) {
        Msg<Object> msg = new Msg<>();
        pagination.formatWhere();
        pagination = productService.queryProductRechargePageList(pagination);
        return msg.toString(pagination);
    }

    /**
     * 查询充值管理列表
     *
     * @return
     */
    @RequestMapping("/queryProductRechargeList")
    public @ResponseBody
    String queryProductRechargeList(String where, Integer pageNo, Integer pageSize) {
        Msg<Object> msg = new Msg<>();
        Pagination<ProductRechargeVo> pagination = new Pagination<>();
        ProductRechargeVo productRechargeVo = new ProductRechargeVo();
        productRechargeVo.setWhere(where);
        pagination.setT(productRechargeVo);
        pagination.setPageNo(pageNo - 1);
        pagination.setPageSize(pageSize);
        pagination.formatWhere();
        pagination = productService.queryProductRechargeList(pagination);
        return msg.toString(pagination);
    }

    /**
     * 查询充值管理详情
     *
     * @param pr_id
     * @return
     */
    @RequestMapping("/queryProductRecharge")
    @ResponseBody
    public String queryProductRecharge(Integer pr_id) {
        Msg<Object> msg = new Msg<>();
        ProductRechargeVo productRechargeVo = productService.queryProductRecharge(pr_id);
        msg.setCode(200);
        msg.setMsg("成功");
        msg.put("productRechargeVo", productRechargeVo);
        return msg.toString();
    }

}
