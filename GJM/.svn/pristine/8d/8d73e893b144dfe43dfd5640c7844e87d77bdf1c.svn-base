package com.gjp.service;

import com.gjp.dao.HotspotIssuesImageDAO;
import com.gjp.model.HotspotIssuesImage;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class HotspotIssuesImageService {
	@Resource
	private HotspotIssuesImageDAO hotspotIssuesImageDAO;
	
	public List<HotspotIssuesImage> queryAllHotspotIssuesImage(){
		return hotspotIssuesImageDAO.queryAllHotspotIssuesImage();
	}
}
