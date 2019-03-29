package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.PurchaseArticleDAO;
import com.gjp.model.PurchaseArticle;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PurchaseArtcleDAOImpl extends BaseDAO implements PurchaseArticleDAO  {

	@Override
	public int addPurchaseArticle(PurchaseArticle purchaseArticle) {
		return sqlSessionTemplateBusiness.insert("com.gjp.dao.PurchaseArticleDAO.addPurchaseArticle", purchaseArticle);
	}

	@Override
	public List<PurchaseArticle> selectPurchaseArticleList(PurchaseArticle purchaseArticle) {
		return sqlSessionTemplateBusiness.selectList("com.gjp.dao.PurchaseArticleDAO.selectPurchaseArticleList", purchaseArticle);
	}

}
