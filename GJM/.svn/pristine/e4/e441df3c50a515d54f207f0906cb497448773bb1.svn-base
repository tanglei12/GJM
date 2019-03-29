package com.gjp.service;

import com.gjp.dao.HandleDao;
import com.gjp.model.*;
import com.gjp.util.PageModel;
import com.gjp.util.Pagination;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * 订单处理service
 * 
 * @author zoe
 *
 */
@Service
public class HandleService {
	@Resource
	private HandleDao handleDao;

	/**
	 * 根据服务编号查询派工单
	 * 
	 * @param md_id
	 * @return
	 */
	public MaintenanceDispatching selectMaintenanceDispatching(Integer md_id) {
		return handleDao.selectMaintenanceDispatching(md_id);
	}

	/**
	 * 查询我的服务订单List
	 * 
	 * @param pageNo
	 * @param cookies
	 * @param em_id
	 * @return
	 */
	public PageModel<MaintenanceDeclaration> selectServe(int pageNo, int cookies, int em_id) {
		PageModel<MaintenanceDeclaration> pageModel = handleDao.selectServe(pageNo, cookies, em_id);
		int totalRecords = handleDao.selectTotalServe(em_id);
		pageModel.setTotalRecords(totalRecords);
		return pageModel;
	}

	/**
	 * 修改派工单
	 * 
	 * @param maintenanceDispatching
	 * @return
	 */
	public int updataMaintenanceDispatching(MaintenanceDispatching maintenanceDispatching) {
		return handleDao.updataMaintenanceDispatching(maintenanceDispatching);
	}

	/**
	 * 查询我的维修跟踪
	 * 
	 * @param md_id
	 * @return
	 */
	public List<MaintenanceTracks> selectTracks(int md_id) {
		return handleDao.selectTracks(md_id);
	}

	public MaintenanceTracks selectTracksById(int md_id) {
		return handleDao.selectTracksById(md_id);
	}

	/**
	 * 添加维修进度
	 * 
	 * @param maintenanceTracks
	 * @return
	 */
	public int addTracks(MaintenanceTracks maintenanceTracks) {
		return handleDao.addTracks(maintenanceTracks);
	}

	/**
	 * 添加完成图片路径
	 * 
	 * @param maintenancePicture
	 * @return
	 */
	public int addMaintenancePicture(MaintenancePicture maintenancePicture) {
		return handleDao.addMaintenancePicture(maintenancePicture);
	}

	/**
	 * 删除完成图片路径
	 * 
	 * @param string
	 * @return
	 */
	public int deleteMaintenancePicture(String string) {
		return handleDao.deleteMaintenancePicture(string);
	}

	/**
	 * 查询维修完成图片
	 * 
	 * @param md_id
	 * @return
	 */
	public List<MaintenancePicture> selectMaintenancePicture(int md_id) {
		return handleDao.selectMaintenancePicture(md_id);
	}

	/**
	 * 查询订单流程
	 * @param md_id
	 * @return
	 */
	public List<MaintenanceOrder> selectMaintenanceOrderListByMdId(Integer md_id) {
		return handleDao.selectMaintenanceOrderListByMdId(md_id);
	}

	public MaintenanceOrder selectMaintenanceOrderByMdId(Integer md_id) {
		return handleDao.selectMaintenanceOrderByMdId(md_id);
	}

	public MaintenanceTracks selectMaintenanceTracks(Integer md_id) {
		return handleDao.selectMaintenanceTracks(md_id);
	}

	public int updataTracks(MaintenanceTracks maintenanceTracks) {
		return handleDao.updataTracks(maintenanceTracks);
	}

	/**
	 * 服务订单分页查询数据
	 * 
	 * @param declaration
	 * @return
	 * @author 陈智颖
	 * @date Mar 2, 2017 11:37:45 AM
	 */
	public List<MaintenanceDeclaration> selectServices(MaintenanceDeclaration declaration){
		return handleDao.selectServices(declaration);
	}
	public List<MaintenanceDeclaration> selectServicesApp(MaintenanceDeclaration declaration){
		return handleDao.selectServicesApp(declaration);
	}
	
	/**
	 * 最新服务状态
	 * 
	 * @param dispatching
	 * @return
	 * @author 陈智颖
	 * @date Mar 2, 2017 11:37:45 AM
	 */
	public MaintenanceDispatching selectServiceState(MaintenanceDispatching dispatching){
		return handleDao.selectServiceState(dispatching);
	}

	/**
	 * 分页查询门店
	 * @param pagination
	 * @return
	 */
	public List<Company> queryCompanyList(Pagination<Company> pagination){
		return handleDao.queryCompanyList(pagination);
	}

	/**
	 * 保存服务账单、订单关系
	 * @param declaration
	 * @return
	 */
	public int saveOrderMD(MaintenanceDeclaration declaration) {
		return handleDao.saveOrderMD(declaration);
	}

	/**
	 * 查询是否生成账单
	 * @param md_id
	 * @return
	 */
	public int queryOrderMDCount(Integer md_id) {
		return handleDao.queryOrderMDCount(md_id);
	}

	/**
	 * 查询服务订单生成的订单数据
	 * @param md_id
	 * @return
	 */
	public ContractOrderVo queryOrderById(Integer md_id) {
		return handleDao.queryOrderById(md_id);
	}

	/**
	 * 保存外协信息
	 * @param serviceOutsource
	 * @return
	 */
	public int saveServiceOutsource(ServiceOutsource serviceOutsource) {
		return handleDao.saveServiceOutsource(serviceOutsource);
	}

	/**
	 * 查询合同服务费、包修费记录
	 * @param pagination
	 * @return
	 */
	public List<ServiceChargeRecord> queryServiceChargeRecord(Pagination<ServiceChargeRecord> pagination) {
		return handleDao.queryServiceChargeRecord(pagination);
	}

	public int queryServiceChargeRecordCount(Pagination<ServiceChargeRecord> pagination) {
		return handleDao.queryServiceChargeRecordCount(pagination);
	}
}
