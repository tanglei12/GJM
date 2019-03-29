package com.gjp.util;

import lombok.Data;
import org.springframework.util.StringUtils;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 分页实体
 *
 * @param <T> 参数对象
 * @author JiangQt
 * @createTime 2015年12月14日上午10:38:25
 */
@Data
public class Pagination<T> implements Serializable {

    private static final long serialVersionUID = -1934937752265371724L;
    public static final String FILTER = "filter";
    public static final String INLIST = "inlist";
    public static final String LIKE = "like";

    /* 默认页面大小 */
    private static int DEFAULT_PAGESIZE = 16;
    /* 当前是第几页 */
    private int pageNo;
    /* 每页显示多少条 */
    private int pageSize;
    /* 总记录数 */
    private int totalRecords;
    /* 总共有多少页 */
    private int totalPage;
    /* 参数对象 */
    private T t;
    /* 参数条件 */
    private String where;
    /* 参数排序 */
    private String orderBy;
    /* 数据列表信息 */
    private List<T> list;
    /* 是否分页 */
    private boolean isPage = true;
    /* queryWhere */
    private List<Map<String, Object>> queryWhere;
    /* querySort */
    private List<Map<String, Object>> querySort;
    /* 标题 */
    private String titles;

    public Pagination() {
        super();
    }

    /**
     * 分页查询
     *
     * @param pageNo   页码号(如果小于0则为0)
     * @param pageSize 分页大小(如果小于等于0则为默认值)
     * @author JiangQT
     */
    public Pagination(Integer pageNo, Integer pageSize) {
        super();
        pageNo = StringUtils.isEmpty(pageNo) ? 0 : pageNo;
        pageSize = StringUtils.isEmpty(pageSize) ? 0 : pageSize;
        this.pageNo = pageNo <= 0 ? 0 : (pageNo - 1) * pageSize;
        this.pageSize = pageSize <= 0 ? DEFAULT_PAGESIZE : pageSize;
    }

    /**
     * 分页查询
     *
     * @param pageNo   页码号(如果小于0则为0)
     * @param pageSize 分页大小(如果小于等于0则为默认值)
     * @author JiangQT
     */
    public Pagination(Integer pageNo, Integer pageSize, List<T> list, int totalRecords) {
        super();
        pageNo = StringUtils.isEmpty(pageNo) ? 0 : pageNo;
        pageSize = StringUtils.isEmpty(pageSize) ? 0 : pageSize;
        this.pageNo = pageNo <= 0 ? 0 : (pageNo - 1) * pageSize;
        this.pageSize = pageSize <= 0 ? DEFAULT_PAGESIZE : pageSize;
        this.list = list;
        this.totalRecords = totalRecords;
        this.totalPage = (int) Math.ceil((double) totalRecords / pageSize);
    }

    /**
     * 分页查询
     *
     * @param pageNo     页码号(如果小于0则为0)
     * @param pageSize   分页大小(如果小于等于0则为默认值)
     * @param pageObject 参数对象
     * @author JiangQT
     */
    public Pagination(Integer pageNo, Integer pageSize, T pageObject) {
        super();
        pageNo = StringUtils.isEmpty(pageNo) ? 0 : pageNo;
        pageSize = StringUtils.isEmpty(pageSize) ? 0 : pageSize;
        this.pageNo = pageNo <= 0 ? 0 : (pageNo - 1) * pageSize;
        this.pageSize = pageSize <= 0 ? DEFAULT_PAGESIZE : pageSize;
        this.t = pageObject;
    }

    /**
     * 设置结果数据，总记录条数
     *
     * @param list
     * @param totalRecords
     * @return
     * @作者 JiangQT
     * @日期 2016年6月9日
     */
    public Pagination<T> setList(List<T> list, int totalRecords) {
        this.list = list;
        this.totalRecords = totalRecords;
        this.totalPage = (int) Math.ceil((double) totalRecords / pageSize);
        this.t = null;
        return this;
    }

    /**
     * 初始化
     *
     * @作者 JiangQT
     * @日期 2017年3月7日
     */
    public void init() {
        this.pageNo = this.pageNo <= 0 ? 0 : (this.pageNo - 1) * this.pageSize;
        this.pageSize = this.pageSize <= 0 ? DEFAULT_PAGESIZE : this.pageSize;
    }

    public void setTotalRecords(int totalRecords) {
        this.totalRecords = totalRecords;
        this.totalPage = (int) Math.ceil((double) totalRecords / pageSize);
        this.t = null;
    }

    /**
     * 格式化WHERE条件
     *
     * @作者 JiangQT
     * @日期 2017年1月15日
     */
    public void formatWhere() {
        // 初始化
        this.init();

        List<Map<String, Object>> queryWhereList = this.queryWhere;
        if (queryWhereList != null) {
            String dateStr = "";
            List<String> whereList = new ArrayList<>();
            for (Map<String, Object> map: queryWhereList) {
                String key = (String) map.get("key");
                Object value = map.get("value");
                String operator = (String) map.get("operator");
                String mode = (String) map.get("mode");

                if (StringUtils.isEmpty(key)) {
                    continue;
                }

                // 初始化日期筛选模式
                if (!StringUtils.isEmpty(mode)) {
                    String startDate = (String) map.get("startDate");
                    String endDate = (String) map.get("endDate");

                    if ("toDay".equals(mode)) {
                        dateStr = "DATE_FORMAT(" + key + ",'%Y-%m-%d') = DATE_FORMAT(NOW(),'%Y-%m-%d')";
                    }
                    if ("toWeek".equals(mode)) {
                        dateStr = "YEARWEEK(" + key + ",1) = YEARWEEK(NOW(),1)";
                    }
                    if ("toMonth".equals(mode)) {
                        dateStr = "DATE_FORMAT(" + key + ",'%Y-%m') = DATE_FORMAT(NOW(),'%Y-%m')";
                    }
                    if ("custom".equals(mode)) {
                        if (!StringUtils.isEmpty(startDate) && !StringUtils.isEmpty(endDate)) {
                            if (startDate.equals(endDate)) {
                                dateStr = "DATE_FORMAT(" + key + ",'%Y-%m-%d')" + " = DATE_FORMAT('" + startDate + "','%Y-%m-%d')";
                            } else {
                                dateStr = "DATE_FORMAT(" + key + ",'%Y-%m-%d')" + " >= DATE_FORMAT('" + startDate + "','%Y-%m-%d') AND " + "DATE_FORMAT(" + key + ",'%Y-%m-%d')" + " <= DATE_FORMAT('" + endDate + "','%Y-%m-%d')";
                            }
                        } else {
                            if (!StringUtils.isEmpty(startDate)) {
                                dateStr = "DATE_FORMAT(" + key + ",'%Y-%m-%d')" + " >= DATE_FORMAT('" + startDate + "','%Y-%m-%d')";
                            }
                            if (!StringUtils.isEmpty(endDate)) {
                                dateStr = "DATE_FORMAT(" + key + ",'%Y-%m-%d')" + " <= DATE_FORMAT('" + endDate + "','%Y-%m-%d')";
                            }
                        }
                    }
                } else {
                    if (StringUtils.isEmpty(value)) {
                        continue;
                    }
                    if ("filter".equals(operator)) {
                        whereList.add(key + " = '" + value + "'");
                    } else if ("inlist".equals(operator)) {
                        whereList.add(key + " IN(" + value + ")");
                    } else {
                        whereList.add(key + " LIKE CONCAT('%','" + value + "','%')");
                    }
                }
            }
            this.where = dateStr;

            List<String> likeList = new ArrayList<>();
            List<String> andList = new ArrayList<>();
            for (String str: whereList) {
                if (str.contains("LIKE")) {
                    likeList.add(str);
                } else {
                    andList.add(str);
                }
            }
            StringBuilder likeStr = new StringBuilder();
            int likeLen = likeList.size();
            for (int i = 0; i < likeLen; i++) {
                if (i == 0) {
                    likeStr.append(likeList.get(i));
                } else {
                    likeStr.append(" OR ").append(likeList.get(i));
                }
            }
            StringBuilder andStr = new StringBuilder();
            int andLen = andList.size();
            for (int i = 0; i < andLen; i++) {
                if (i == 0) {
                    andStr.append(andList.get(i));
                } else {
                    andStr.append(" AND ").append(andList.get(i));
                }
            }
            String common = "";
            if (likeStr.length() > 0 && andStr.length() > 0) {
                common = andStr + " AND " + "(" + likeStr + ")";
            } else if (likeStr.length() > 0) {
                common = "(" + likeStr + ")";
            } else if (andStr.length() > 0) {
                common = andStr.toString();
            }
            this.where += common.length() > 0 ? (StringUtils.isEmpty(this.where) ? common : "AND " + common) : "";
            // 初始化排序
            this.formatOrderBy();
        }
    }

    /**
     * 格式化ORDERBY条件
     *
     * @作者 JiangQT
     * @日期 2017年1月15日
     */
    public void formatOrderBy() {
        List<Map<String, Object>> querySortList = this.querySort;
        if (querySortList != null) {
            Object[] objects = new Object[querySortList.size()];
            for (int i = 0; i < querySortList.size(); i++) {
                Map<String, Object> map = querySortList.get(i);
                String key = (String) map.get("key");
                String sort = (String) map.get("sort");
                objects[i] = key + " " + (StringUtils.isEmpty(sort) ? "ASC" : sort);
            }
            this.orderBy = "ORDER BY " + org.apache.commons.lang.StringUtils.join(objects, ", ");
        }
    }

    /**
     * 清理参数
     */
    public Pagination<T> cleanParams() {
        this.t = null;
        this.where = null;
        this.orderBy = null;
        this.queryWhere = null;
        this.querySort = null;
        return this;
    }

    /**
     * 添加查询条件
     * <p>
     * 该方法需放在Pagination#formatWhere()后面
     *
     * @param key      查询字段
     * @param value    查询条件
     * @param operator 类型（filter:精确查询、like:模糊查询）
     * @author JiangQt
     * @version 2017年7月9日上午10:59:46
     * @see Pagination#formatWhere()
     */
    public void addQueryWhere(String key, Object value, String operator) {
        Map<String, Object> where = new HashMap<>();
        where.put("key", key);
        where.put("value", value);
        where.put("operator", StringUtils.isEmpty(operator) ? "filter" : operator);
        this.queryWhere = this.queryWhere == null ? new ArrayList<>() : this.queryWhere;
        this.queryWhere.add(where);
    }

    public void addQueryWhere(String key, Object value) {
        Map<String, Object> where = new HashMap<>();
        where.put("key", key);
        where.put("value", value);
        where.put("operator", "filter");
        this.queryWhere = this.queryWhere == null ? new ArrayList<>() : this.queryWhere;
        this.queryWhere.add(where);
    }

}
