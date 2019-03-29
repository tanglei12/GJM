package com.gjp.dao;

import com.gjp.model.*;
import com.gjp.util.PageModel;
import com.gjp.util.Pagination;

import java.util.List;

/**
 * 订单处理
 *
 * @author zoe
 */
public interface HandleDao {

    /**
     * 根据服务编号查询派工单
     *
     * @param md_id
     * @return
     */
    MaintenanceDispatching selectMaintenanceDispatching(Integer md_id);

    /**
     * 查询我的服务订单List
     *
     * @param pageNo
     * @param cookies
     * @param em_id
     * @return
     */
    PageModel<MaintenanceDeclaration> selectServe(int pageNo, int cookies, int em_id);

    /**
     * 查询总数据条数
     *
     * @param em_id
     * @return
     * @author JiangQT
     */
    int selectTotalServe(int em_id);

    /**
     * 修改派工单
     *
     * @param maintenanceDispatching
     * @return
     */
    int updataMaintenanceDispatching(MaintenanceDispatching maintenanceDispatching);

    /**
     * 查询我的维修跟踪
     *
     * @param md_id
     * @return
     */
    List<MaintenanceTracks> selectTracks(int md_id);

    MaintenanceTracks selectTracksById(int md_id);

    /**
     * 添加维修进度
     *
     * @param maintenanceTracks
     * @return
     */
    int addTracks(MaintenanceTracks maintenanceTracks);

    /**
     * 添加完成图片路径
     *
     * @param maintenancePicture
     * @return
     */
    int addMaintenancePicture(MaintenancePicture maintenancePicture);

    /**
     * 删除完成图片路径
     *
     * @param string
     * @return
     */
    int deleteMaintenancePicture(String string);

    /**
     * 查询维修完成图片
     *
     * @param md_id
     * @return
     */
    List<MaintenancePicture> selectMaintenancePicture(int md_id);

    List<MaintenanceOrder> selectMaintenanceOrderListByMdId(Integer md_id);

    MaintenanceOrder selectMaintenanceOrderByMdId(Integer md_id);

    MaintenanceTracks selectMaintenanceTracks(Integer md_id);

    int updataTracks(MaintenanceTracks maintenanceTracks);

    /**
     * 查询服务订单分页
     *
     * @param declaration
     * @return
     * @author 陈智颖
     * @date Mar 2, 2017 11:35:45 AM
     */
    List<MaintenanceDeclaration> selectServices(MaintenanceDeclaration declaration);

    List<MaintenanceDeclaration> selectServicesApp(MaintenanceDeclaration declaration);

    /**
     * 最新服务状态
     *
     * @param dispatching
     * @return
     * @author 陈智颖
     * @date Mar 2, 2017 11:35:45 AM
     */
    MaintenanceDispatching selectServiceState(MaintenanceDispatching dispatching);

    /**
     * 分页查询部门
     *
     * @param pagination
     * @return
     */
    List<Company> queryCompanyList(Pagination<Company> pagination);

    /**
     * 保存服务账单、订单关系
     *
     * @param declaration
     * @return
     */
    int saveOrderMD(MaintenanceDeclaration declaration);

    /**
     * 查询是否生成账单
     *
     * @param md_id
     * @return
     */
    int queryOrderMDCount(Integer md_id);

    /**
     * 查询服务订单生成的订单数据
     *
     * @param md_id
     * @return
     */
    ContractOrderVo queryOrderById(Integer md_id);

    /**
     * 保存外协信息
     *
     * @param serviceOutsource
     * @return
     */
    int saveServiceOutsource(ServiceOutsource serviceOutsource);

    /**
     * 查询合同服务费、包修费记录
     *
     * @param pagination
     * @return
     */
    List<ServiceChargeRecord> queryServiceChargeRecord(Pagination<ServiceChargeRecord> pagination);

    /**
     * 查询合同服务费、包修费记录条数
     *
     * @param pagination
     * @return
     */
    int queryServiceChargeRecordCount(Pagination<ServiceChargeRecord> pagination);
}
