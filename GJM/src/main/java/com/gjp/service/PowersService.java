package com.gjp.service;

import com.gjp.dao.PowersDao;
import com.gjp.model.Powers;
import com.gjp.util.AppUtil;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

/**
* 权限配置
* 
* @author 王孝元
* 
* @version 创建时间：2016年10月23日 上午11:02:03
* 
*/
@Service
public class PowersService {
	
	@Resource
	private PowersDao powersDao;
	
	/**
	 * 查询权限配置列表
	 * 
	 * @return
	 * @author 王孝元
	 */
	public List<Powers> getPowersTree(Integer pid){
		List<Powers> childs = powersDao.getChildsByPid(pid);
		for(Powers c:childs){
			List<Powers> cChilds= getPowersTree(c.getUcps_id());
			c.setChilds(cChilds);
		}
		return childs;
	}
	
	/**
	 * 查询设置权限列表
	 * 
	 * @return
	 * @author 王孝元
	 */
	public List<Powers> getSettingPowersTree(Integer pid){
		List<Powers> childs = powersDao.getLiveChildsByPid(pid);
		for(Powers c:childs){
			List<Powers> cChilds= getSettingPowersTree(c.getUcps_id());
			c.setChilds(cChilds);
		}
		return childs;
	}
	
	/**
	 * 根据父Pid查子权限
	 * 
	 * @return
	 * @author 王孝元
	 */
	public List<Powers> getChildsByPid(Integer pid){
		return powersDao.getChildsByPid(pid);
	}
	
	/**
	 * 根据id查询权限
	 * 
	 * @return
	 * @author 王孝元
	 */
	public Powers getPowersById(Integer id){
		return powersDao.getPowersById(id);
	}
	
	/**
	 * 添加权限
	 * 
	 * @param p
	 * @author 王孝元
	 */
	public int savePowers(Powers p){
		// 将排序号大于或者等于ucps_asc的权限向后移动一位
		Powers power = new Powers();
		power.setUcps_asc(p.getUcps_asc());
		power.setUcps_pid(p.getUcps_pid());
		powersDao.moveDownOneStep(power);
		// 保存当前权限
		p.setUcps_state(1);
		p.setUcps_date(new Date());
		return powersDao.addPowers(p);
	}
	
	/**
	 * 修改权限
	 * @param p
	 * @return
	 * @author 王孝元
	 */
	public int updatePowers(Powers p){
		p.setUcps_date(new Date());
		return powersDao.updatePowers(p);
	}
	
	/**
	 * 删除权限
	 * @param pid
	 * @return
	 * @author 王孝元
	 */
	public void deletePowers(Integer id){
		Powers power = powersDao.getPowersById(id);
		if(power!=null){
			//1.删除关联
			powersDao.deleteFromCompanyPowers(id);
			powersDao.deleteFromPersonPowers(id);
			powersDao.deleteFromPositionPowers(id);
			powersDao.deleteFromRolePowers(id);
			//2.删除所有子权限
			List<Powers> pwList = powersDao.getChildsByPid(id);
			for(Powers p:pwList){
				deletePowers(p.getUcps_id());
			}
			//3.删除自身
			powersDao.deletePowers(id);
			//4.将后面的权限前移
			Powers temp = new Powers();
			temp.setUcps_pid(power.getUcps_pid());
			temp.setUcps_asc(power.getUcps_asc());
			powersDao.moveUpOneStep(temp);
		}
	}
	
	/**
	 * 查询新增时用的序列号
	 * @param pid 父id
	 * @return
	 * @author 王孝元
	 */
	public int getOrderNumber(Integer pid){
		Integer order = powersDao.selectMaxOrder(pid);
		return order==null?1:(order+1);
	}
	
	/**
	 * 禁用权限
	 * @param id
	 * @return
	 * @author 王孝元
	 */
	public void closePowers(Integer id){
		Powers p = powersDao.getPowersById(id);
		// 1.禁用权限
		powersDao.closePowers(p.getUcps_id());
		// 2.禁用其子权限
		List<Powers> childs = getChildsByPid(p.getUcps_id());
		for(Powers c:childs){
			closePowers(c.getUcps_id());
		}
	}
	
	/**
	 * 开启权限
	 * @param id
	 * @return
	 * @author 王孝元
	 */
	public void openPowers(Integer id){
		Powers p = powersDao.getPowersById(id);
		// 1.启用权限
		powersDao.openPowers(p.getUcps_id());
		// 2.启用其子权限
		List<Powers> childs = getChildsByPid(p.getUcps_id());
		for(Powers c:childs){
			openPowers(c.getUcps_id());
		}
	}
	
	/**
	 * 交换权限的排序号
	 * @param id1 权限1
	 * @param id2 权限2
	 * @return
	 * @author 王孝元
	 */
	public boolean exchangePosition(Integer id1,Integer id2){
		boolean result = false;
		if(id1!=null&&id2!=null){
			// 查询两权限的排序号
			int asc1 = powersDao.findPowersAsc(id1);
			int asc2 = powersDao.findPowersAsc(id2);
			//更新两权限排序号
			Powers p1 = new Powers();
			p1.setUcps_id(id1);
			p1.setUcps_asc(asc2);
			powersDao.updatePowersAsc(p1);
			
			Powers p2 = new Powers();
			p2.setUcps_id(id2);
			p2.setUcps_asc(asc1);
			powersDao.updatePowersAsc(p2);
			
			result = true;
		}
		return result;
	}
	
	/**
	 * 验证权限名是否重复
	 * @param ucps_name
	 * @param ucps_pid
	 * @param ucps_id
	 * @return
	 * @author 王孝元
	 */
	public boolean exsitPowersName(String ucps_name,Integer ucps_pid,Integer ucps_id){
		Powers p = new Powers();
		p.setUcps_name(ucps_name);
		p.setUcps_pid(ucps_pid);
		p.setUcps_id(ucps_id);
		List<Powers> list = powersDao.selectPowersByProperty(p);
		if(AppUtil.removeNull(list).size()==0){
			return true;
		}
		return false;
	}
	/**
	 * 验证跳转权限名是否重复
	 * @param ucps_name
	 * @param ucps_id
	 * @return
	 * @author 王孝元
	 */
	public boolean exsitPowersName2(String ucps_name,Integer ucps_id){
		Powers p = new Powers();
		p.setUcps_name(ucps_name);
		p.setUcps_level(2);
		p.setUcps_id(ucps_id);
		List<Powers> list = powersDao.selectPowersByProperty(p);
		if(AppUtil.removeNull(list).size()==0){
			return true;
		}
		return false;
	}
	
	/**
	 * 验证权限路径是否重复
	 * @param ucps_url
	 * @param ucps_pid
	 * @param ucps_id
	 * @return
	 * @author 王孝元
	 */
	public boolean exsitPowersUrl(String ucps_url,Integer ucps_pid,Integer ucps_id){
		Powers p = new Powers();
		p.setUcps_url(ucps_url);
		p.setUcps_pid(ucps_pid);
		p.setUcps_id(ucps_id);
		List<Powers> list = powersDao.selectPowersByProperty(p);
		if(AppUtil.removeNull(list).size()==0){
			return true;
		}
		return false;
	}
	/**
	 * 验证跳转权限路径是否重复
	 * @param ucps_url
	 * @param ucps_id
	 * @return
	 */
	public boolean exsitPowersUrl2(String ucps_url,Integer ucps_id){
		Powers p = new Powers();
		p.setUcps_url(ucps_url);
		p.setUcps_level(2);
		p.setUcps_id(ucps_id);
		List<Powers> list = powersDao.selectPowersByProperty(p);
		if(AppUtil.removeNull(list).size()==0){
			return true;
		}
		return false;
	}
}
