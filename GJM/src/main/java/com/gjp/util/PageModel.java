package com.gjp.util;

import com.gjp.util.constant.Constant;

import java.io.Serializable;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * 分页实体
 * 
 * @author Administrator
 * 
 * @param <T>
 */
public class PageModel<T> implements Serializable {

	/**
	 * 数据集
	 */
	private List<T> list;

	/**
	 * 总记录数
	 */
	private int totalRecords;

	/**
	 * 筛选条件
	 */
	private String txt;

	/**
	 * 筛选条件
	 */
	private Integer inte;

	/**
	 * 每页显示多少条
	 */
	private int pageSize;

	/**
	 * 当前是第几页
	 */
	private int pageNo;

	/**
	 * 参数对象
	 */
	private T t;

	/**
	 * 总共有多少页
	 */
	@SuppressWarnings("unused")
	private int totalPage = getTotalPage();

	/**
	 * 筛选模型
	 */
	private HouseModel houseModel;

	/**
	 * 服务状态
	 */
	private String mo_state;

	/**
	 * 服务类型
	 */
	private Integer sm_id;

	// 开始时间
	private Date dateStart;

	// 结束时间
	private Date dateEnd;

	// 条件
	private String sqlWhere;

	// 排序
	private String sqlOrderBy;

	// 时间筛选标题
	private String dateTitle;
	
	// 总金额
	private Double sumMoney;

	/**
	 * 总共有多少页
	 * 
	 * @return
	 */
	public int getTotalPage() {
		return (int) Math.ceil((double) totalRecords / pageSize);
	}

	/**
	 * 首页
	 * 
	 * @return
	 */
	public int getFirst() {
		return Constant.PAGE_FIRST;
	}

	/**
	 * 尾页
	 * 
	 * @return
	 */
	public int getLast() {
		return getTotalPage();
	}

	/**
	 * 上页
	 * 
	 * @return
	 */
	public int getPre() {
		if (pageNo == getFirst()) {
			return Constant.PAGE_FIRST;
		}
		return pageNo - 1;
	}

	/**
	 * 下页
	 * 
	 * @return
	 */
	public int getNext() {
		if (pageNo == getLast()) {
			return getTotalPage();
		}
		return pageNo + 1;
	}

	public List<T> getList() {
		return list;
	}

	public void setList(List<T> list) {
		this.list = list;
	}

	public int getTotalRecords() {
		return totalRecords;
	}

	public void setTotalRecords(int totalRecords) {
		this.totalRecords = totalRecords;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getPageNo() {
		return pageNo;
	}

	public void setPageNo(int pageNo) {
		this.pageNo = pageNo;
	}

	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}

	public HouseModel getHouseModel() {
		return houseModel;
	}

	public void setHouseModel(HouseModel houseModel) {
		this.houseModel = houseModel;
	}

	public String getMo_state() {
		return mo_state;
	}

	public void setMo_state(String mo_state) {
		this.mo_state = mo_state;
	}

	public Integer getSm_id() {
		return sm_id;
	}

	public void setSm_id(Integer sm_id) {
		this.sm_id = sm_id;
	}

	public T getT() {
		return t;
	}

	public void setT(T t) {
		this.t = t;
	}

	public String getTxt() {
		return txt;
	}

	public void setTxt(String txt) {
		this.txt = txt;
	}

	public Integer getInte() {
		return inte;
	}

	public void setInte(Integer inte) {
		this.inte = inte;
	}

	public String getSqlWhere() {
		return sqlWhere;
	}

	public void setSqlWhere(String sqlWhere) {
		this.sqlWhere = sqlWhere;
	}

	public String getSqlOrderBy() {
		return sqlOrderBy;
	}

	public void setSqlOrderBy(String sqlOrderBy) {
		this.sqlOrderBy = sqlOrderBy;
	}

	public Date getDateStart() {
		return dateStart;
	}

	public void setDateStart(Date dateStart) {
		this.dateStart = dateStart;
	}

	public Date getDateEnd() {
		return dateEnd;
	}

	public void setDateEnd(Date dateEnd) {
		this.dateEnd = dateEnd;
	}

	public String getDateTitle() {
		return dateTitle;
	}

	public void setDateTitle(String dateTitle) {
		this.dateTitle = dateTitle;
	}

	public Double getSumMoney() {
		return sumMoney;
	}

	public void setSumMoney(Double sumMoney) {
		this.sumMoney = sumMoney;
	}

	/**
	 * 数据转化为SQL 时间格式化
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 * @throws ParseException
	 */
	public PageModel<T> getWhereData(TableList tableList, String dateStr) throws ParseException {

		SimpleDateFormat sf = new SimpleDateFormat(dateStr);

		PageModel<T> pageModel1 = new PageModel<T>();

		if (tableList.getDateStart() != null && !tableList.getDateStart().equals("")) {
			pageModel1.setDateStart(sf.parse(tableList.getDateStart()));
		}
		if (tableList.getDateEnd() != null && !tableList.getDateEnd().equals("")) {
			pageModel1.setDateEnd(sf.parse(tableList.getDateEnd()));
		}
		pageModel1.setSqlWhere(tableList.getSqlWhere());

		pageModel1.setDateTitle(tableList.getDateType());

		if (tableList.getOrderBy() != null && !tableList.getOrderBy().equals("")) {
			pageModel1.setSqlOrderBy("order by " + tableList.getOrderBy() + " asc");
		} else {
			pageModel1.setSqlOrderBy("");
		}
		int pageSize = Integer.parseInt(AppUtil.getCookie("pageSize"));
		pageModel1.setPageNo((tableList.getPageNo() - 1) * pageSize);
		// 分页设置查询条数
		pageModel1.setPageSize(pageSize);

		return pageModel1;
	}
	
}
