package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.ProductDao;
import com.gjp.model.ProductRechargeVo;
import com.gjp.util.Pagination;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author wxr
 * @create 2017-12-20 17:28
 **/
@Repository
public class ProductDaoImpl extends BaseDAO implements ProductDao {
    @Override
    public int addProductRecharge(ProductRechargeVo productRechargeVo) {
        return super.sqlSessionTemplateProduct.insert("com.gjp.dao.ProductDao.addProductRecharge",productRechargeVo);
    }

    @Override
    public int updateProductRecharge(ProductRechargeVo productRechargeVo) {
        return super.sqlSessionTemplateProduct.update("com.gjp.dao.ProductDao.updateProductRecharge",productRechargeVo);
    }

    @Override
    public Pagination<ProductRechargeVo> queryProductRechargePageList(Pagination<ProductRechargeVo> pagination) {
        List<ProductRechargeVo> list = sqlSessionTemplateProduct.selectList("com.gjp.dao.ProductDao.queryProductRechargePageList", pagination);
        int totalRecords = sqlSessionTemplateProduct.selectOne("com.gjp.dao.ProductDao.queryProductRechargePageRecords", pagination);
        pagination.setList(list, totalRecords);
        return pagination;
    }

    @Override
    public Pagination<ProductRechargeVo> queryProductRechargeList(Pagination<ProductRechargeVo> pagination) {
        List<ProductRechargeVo> list = sqlSessionTemplateProduct.selectList("com.gjp.dao.ProductDao.queryProductRechargeList", pagination);
        int totalRecords = sqlSessionTemplateProduct.selectOne("com.gjp.dao.ProductDao.queryProductRechargeCount", pagination);
        pagination.setList(list, totalRecords);
        return pagination;
    }

    @Override
    public ProductRechargeVo queryProductRecharge(ProductRechargeVo productRechargeVo) {
        return super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.ProductDao.queryProductRecharge",productRechargeVo);
    }
}
