package com.gjp.service;

import com.gjp.dao.ProductDao;
import com.gjp.model.ProductRechargeVo;
import com.gjp.util.AppUtil;
import com.gjp.util.Msg;
import com.gjp.util.Pagination;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;

/**
 * 产品
 *
 * @author wxr
 * @create 2017-12-20 17:11
 **/
@Service
public class ProductService {
    @Resource
    ProductDao productDao;

    /**
     * 添加修改充值管理
     *
     * @param productRechargeVo
     * @return
     */
    public Msg<Object> AddOrUpdateProductRecharge(ProductRechargeVo productRechargeVo) throws Exception {
        Msg<Object> msg = new Msg<>();
        if (productRechargeVo.getPr_sn() == null || productRechargeVo.getPr_sn() == "") {
            String orderCode = AppUtil.getOrderCode("600");
            productRechargeVo.setPr_create_time(new Date());
            productRechargeVo.setPr_sn(orderCode);
            productDao.addProductRecharge(productRechargeVo);
            msg.setCode(200);
            msg.setMsg("添加充值管理成功");
        } else {
            productRechargeVo.setPr_modify_time(new Date());
            productDao.updateProductRecharge(productRechargeVo);
            msg.setCode(200);
            msg.setMsg("修改充值管理成功");
        }

        return msg;
    }


    /**
     * 查询充值管理列表
     *
     * @param pagination
     * @return
     */
    public Pagination<ProductRechargeVo> queryProductRechargePageList(Pagination<ProductRechargeVo> pagination) {
        return productDao.queryProductRechargePageList(pagination);
    }

    /**
     * 查询充值管理列表
     *
     * @param pagination
     * @return
     */
    public Pagination<ProductRechargeVo> queryProductRechargeList(Pagination<ProductRechargeVo> pagination) {
        return productDao.queryProductRechargeList(pagination);
    }

    /**
     * 查询充值管理详情
     *
     * @param pr_sn
     * @return
     */
    public ProductRechargeVo queryProductRecharge(String pr_sn) {
        ProductRechargeVo productRechargeVo = new ProductRechargeVo();
        productRechargeVo.setPr_sn(pr_sn);
        return productDao.queryProductRecharge(productRechargeVo);
    }

    /**
     * 查询充值管理详情
     *
     * @param pr_id
     * @return
     */
    public ProductRechargeVo queryProductRecharge(Integer pr_id) {
        ProductRechargeVo productRechargeVo = new ProductRechargeVo();
        productRechargeVo.setPr_id(pr_id);
        return productDao.queryProductRecharge(productRechargeVo);
    }
}
