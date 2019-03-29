package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.HotspotIssuesImageDAO;
import com.gjp.model.HotspotIssuesImage;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class HotspotIssuesImageDAOImpl extends BaseDAO implements HotspotIssuesImageDAO {
	
	@Override
	public List<HotspotIssuesImage> queryAllHotspotIssuesImage() {
		return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.HotspotIssuesImageDAO.queryAllHotspotIssuesImage");
	}

}
