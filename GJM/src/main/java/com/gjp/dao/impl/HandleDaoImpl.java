package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.HandleDao;
import com.gjp.model.*;
import com.gjp.util.PageModel;
import com.gjp.util.Pagination;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 订单处理ImplDao
 *
 * @author zoe
 */
@Repository
public class HandleDaoImpl extends BaseDAO implements HandleDao {

    @Override
    public MaintenanceDispatching selectMaintenanceDispatching(Integer md_id) {
        return super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.HandleDao.selectMaintenanceDispatching", md_id);
    }

    @Override
    public PageModel<MaintenanceDeclaration> selectServe(int pageNo, int cookies, int em_id) {
        PageModel<MaintenanceDeclaration> pageModel = new PageModel<>();
        // 分页设置开始点
        pageModel.setPageNo((pageNo - 1) * cookies);
        // 分页设置查询条数
        pageModel.setPageSize(cookies);
        // 分页查询房屋基本信息集合
        List<MaintenanceDeclaration> maintenanceDeclarationList = sqlSessionTemplateBusiness.selectList("com.gjp.dao.HandleDao.selectServe", pageModel);
        pageModel.setList(maintenanceDeclarationList);
        return pageModel;
    }

    @Override
    public int selectTotalServe(int em_id) {
        return super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.HandleDao.selectTotalServe", em_id);
    }

    @Override
    public int updataMaintenanceDispatching(MaintenanceDispatching maintenanceDispatching) {
        return super.sqlSessionTemplateBusiness.update("com.gjp.dao.HandleDao.updataMaintenanceDispatching", maintenanceDispatching);
    }

    @Override
    public List<MaintenanceTracks> selectTracks(int md_id) {
        return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.HandleDao.selectTracks", md_id);
    }

    @Override
    public MaintenanceTracks selectTracksById(int md_id) {
        return super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.HandleDao.selectTracksById", md_id);
    }

    @Override
    public int addTracks(MaintenanceTracks maintenanceTracks) {
        return super.sqlSessionTemplateBusiness.insert("com.gjp.dao.HandleDao.addTracks", maintenanceTracks);
    }

    @Override
    public int addMaintenancePicture(MaintenancePicture maintenancePicture) {
        return super.sqlSessionTemplateBusiness.insert("com.gjp.dao.HandleDao.addMaintenancePicture", maintenancePicture);
    }

    @Override
    public int deleteMaintenancePicture(String mpe_path) {
        return super.sqlSessionTemplateBusiness.delete("com.gjp.dao.HandleDao.deleteMaintenancePicture", mpe_path);
    }

    @Override
    public List<MaintenancePicture> selectMaintenancePicture(int md_id) {
        return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.HandleDao.selectMaintenancePicture", md_id);
    }

    @Override
    public List<MaintenanceOrder> selectMaintenanceOrderListByMdId(Integer md_id) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.HandleDao.selectMaintenanceOrderListByMdId", md_id);
    }

    @Override
    public MaintenanceOrder selectMaintenanceOrderByMdId(Integer md_id) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.HandleDao.selectMaintenanceOrderByMdId", md_id);
    }

    @Override
    public MaintenanceTracks selectMaintenanceTracks(Integer md_id) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.HandleDao.selectMaintenanceTracks", md_id);
    }

    @Override
    public int updataTracks(MaintenanceTracks maintenanceTracks) {
        return sqlSessionTemplateBusiness.update("com.gjp.dao.HandleDao.updataTracks", maintenanceTracks);
    }

    @Override
    public List<MaintenanceDeclaration> selectServices(MaintenanceDeclaration declaration) {
        return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.HandleDao.selectServices", declaration);
    }
    @Override
    public List<MaintenanceDeclaration> selectServicesApp(MaintenanceDeclaration declaration) {
        return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.HandleDao.selectServicesApp", declaration);
    }

    @Override
    public MaintenanceDispatching selectServiceState(MaintenanceDispatching dispatching) {
        return super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.HandleDao.selectServiceState", dispatching);
    }

    @Override
    public List<Company> queryCompanyList(Pagination<Company> pagination) {
        return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.HandleDao.queryCompanyList", pagination);
    }

    @Override
    public int saveOrderMD(MaintenanceDeclaration declaration) {
        return super.sqlSessionTemplateBusiness.insert("com.gjp.dao.HandleDao.saveOrderMD", declaration);
    }

    @Override
    public int queryOrderMDCount(Integer md_id) {
        return super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.HandleDao.queryOrderMDCount", md_id);
    }

   /* @Override
    public int saveMoneyDetail(ServiceMoneyDetail serviceMoneyDetail) {
        return super.sqlSessionTemplateBusiness.insert("com.gjp.dao.HandleDao.saveMoneyDetail", serviceMoneyDetail);
    }*/

    @Override
    public ContractOrderVo queryOrderById(Integer md_id) {
        return super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.HandleDao.queryOrderById", md_id);
    }


    @Override
    public int saveServiceOutsource(ServiceOutsource serviceOutsource) {
        return super.sqlSessionTemplateBusiness.insert("com.gjp.dao.HandleDao.saveServiceOutsource", serviceOutsource);
    }

    @Override
    public List<ServiceChargeRecord> queryServiceChargeRecord(Pagination<ServiceChargeRecord> pagination) {
        return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.HandleDao.queryServiceChargeRecord", pagination);
    }

    @Override
    public int queryServiceChargeRecordCount(Pagination<ServiceChargeRecord> pagination) {
        return super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.HandleDao.queryServiceChargeRecordCount", pagination);
    }

}
