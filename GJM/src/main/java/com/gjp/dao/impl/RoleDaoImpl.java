package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.RoleDao;
import com.gjp.model.Powers;
import com.gjp.model.Role;
import com.gjp.model.UserCenterEmployee;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * 实现类
 *
 * @author 王孝元
 * @version 创建时间：2016年10月25日 上午10:46:15
 */
@Repository
public class RoleDaoImpl extends BaseDAO implements RoleDao {

    @Override
    public List<Role> selectRoleList(Role r) {
        return super.sqlSessionTemplateUser.selectList("com.gjp.dao.RoleDao.selectRoleList", r);
    }

    @Override
    public int selectRoleListCount(Role r) {
        return super.sqlSessionTemplateUser.selectOne("com.gjp.dao.RoleDao.selectRoleListCount", r);
    }

    @Override
    public int addRole(Role r) {
        return super.sqlSessionTemplateUser.insert("com.gjp.dao.RoleDao.addRole", r);
    }

    @Override
    public int updateRole(Role r) {
        return super.sqlSessionTemplateUser.update("com.gjp.dao.RoleDao.updateRole", r);
    }

    @Override
    public int deleteRole(Integer id) {
        return super.sqlSessionTemplateUser.delete("com.gjp.dao.RoleDao.deleteRole", id);
    }

    @Override
    public int deleteFromPersonRole(Integer id) {
        return super.sqlSessionTemplateUser.delete("com.gjp.dao.RoleDao.deleteFromPersonRole", id);
    }

    @Override
    public int deleteFromRolePowers(Integer id) {
        return super.sqlSessionTemplateUser.delete("com.gjp.dao.RoleDao.deleteFromRolePowers", id);
    }

    @Override
    public Role getRoleById(Integer id) {
        return super.sqlSessionTemplateUser.selectOne("com.gjp.dao.RoleDao.getRoleById", id);
    }

    @Override
    public List<Powers> selectPowersByRoleId(Integer id) {
        return super.sqlSessionTemplateUser.selectList("com.gjp.dao.RoleDao.selectPowersByRoleId", id);
    }

    @Override
    public int savePowersForRole(Map<String, Object> map) {
        return super.sqlSessionTemplateUser.insert("com.gjp.dao.RoleDao.savePowersForRole", map);
    }

    @Override
    public List<UserCenterEmployee> selectPersonsByRole(Integer id) {
        return super.sqlSessionTemplateUser.selectList("com.gjp.dao.RoleDao.selectPersonsByRole", id);
    }

    @Override
    public int savePersonToRole(Map<String, Object> map) {
        return super.sqlSessionTemplateUser.insert("com.gjp.dao.RoleDao.savePersonToRole", map);
    }

    @Override
    public int deletePersonFromRole(Integer id) {
        return super.sqlSessionTemplateUser.delete("com.gjp.dao.RoleDao.deletePersonFromRole", id);
    }

    @Override
    public List<Role> selectRoleByProperty(Role r) {
        return super.sqlSessionTemplateUser.selectList("com.gjp.dao.RoleDao.selectRoleByProperty", r);
    }

}
