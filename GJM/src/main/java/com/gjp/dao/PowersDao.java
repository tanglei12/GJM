package com.gjp.dao;

import com.gjp.model.Powers;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.Mapping;

import java.util.List;

/**
 * 权限
 *
 * @author 王孝元
 * @version 创建时间：2016年10月23日 上午9:54:15
 */
public interface PowersDao {

    /**
     * 查询所有菜单权限
     *
     * @return
     * @author 王孝元
     */
    List<Powers> selectAllPowers();

    /**
     * 根据父Pid查子权限
     *
     * @return
     * @author 王孝元
     */
    List<Powers> getChildsByPid(Integer pid);

    /**
     * 根据父Pid查可用子权限
     *
     * @return
     * @author 王孝元
     */
    List<Powers> getLiveChildsByPid(Integer pid);

    /**
     * 根据id查询权限
     *
     * @param id
     * @return
     * @author 王孝元
     */
    Powers getPowersById(Integer id);

    /**
     * 新增
     *
     * @param p
     * @author 王孝元
     */
    int addPowers(Powers p);

    /**
     * 修改
     *
     * @param p
     * @author 王孝元
     */
    int updatePowers(Powers p);

    /**
     * 删除
     *
     * @param id
     * @author 王孝元
     */
    int deletePowers(Integer id);

    /**
     * 删除部门权限关联
     *
     * @param id
     * @author 王孝元
     */
    int deleteFromCompanyPowers(Integer id);

    /**
     * 删除用户权限关联
     *
     * @param id
     * @author 王孝元
     */
    int deleteFromPersonPowers(Integer id);

    /**
     * 删除职位权限关联
     *
     * @param id
     * @author 王孝元
     */
    int deleteFromPositionPowers(Integer id);

    /**
     * 删除角色权限关联
     *
     * @param id
     * @author 王孝元
     */
    int deleteFromRolePowers(Integer id);

    /**
     * 查询最大排序号
     *
     * @param pid
     * @return
     * @author 王孝元
     */
    Integer selectMaxOrder(Integer pid);

    /**
     * 禁用权限
     *
     * @param id
     * @return
     * @author 王孝元
     */
    int closePowers(Integer id);

    /**
     * 禁用权限
     *
     * @param id
     * @return
     * @author 王孝元
     */
    int openPowers(Integer id);

    /**
     * 获取权限的排序号
     *
     * @param id 权限id
     * @return
     * @author 王孝元
     */
    int findPowersAsc(Integer id);

    /**
     * 修改权限的排序号
     *
     * @param p 权限对象
     * @return
     * @author 王孝元
     */
    int updatePowersAsc(Powers p);

    /**
     * 根据权限属性查权限
     *
     * @param p
     * @return
     * @author 王孝元
     */
    List<Powers> selectPowersByProperty(Powers p);

    /**
     * 将排序号大于ucps_asc的权限向后移动1位
     *
     * @param p 参数载体
     * @return
     * @author 王孝元
     */
    int moveDownOneStep(Powers p);

    /**
     * 将排序号大于ucps_asc的权限向前移动1位
     *
     * @param p 参数载体
     * @return
     * @author 王孝元
     */
    int moveUpOneStep(Powers p);
}
