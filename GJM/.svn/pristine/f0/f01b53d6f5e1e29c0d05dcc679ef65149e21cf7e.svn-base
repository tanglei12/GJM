package com.gjp.util;

import org.springframework.util.StringUtils;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

public class TableList implements Serializable {

	// 筛选条件
	private String str;
	// 时间条件
	private String dateStr;
	// 时间类型
	private String dateType;
	// 开始时间
	private String dateStart;
	// 结束时间
	private String dateEnd;
	// 排序
	private String orderBy;
	// 开始页
	private Integer pageNo;
	// 数据条件
	private String sqlWhere;

	// ===扩展===

	// 模式
	private String mode;

	public String getStr() {
		return str;
	}

	public void setStr(String str) {
		this.str = str;
	}

	public String getDateStr() {
		return dateStr;
	}

	public void setDateStr(String dateStr) {
		this.dateStr = dateStr;
	}

	public String getDateStart() {
		return dateStart;
	}

	public void setDateStart(String dateStart) {
		this.dateStart = dateStart;
	}

	public String getDateEnd() {
		return dateEnd;
	}

	public void setDateEnd(String dateEnd) {
		this.dateEnd = dateEnd;
	}

	public String getDateType() {
		return dateType;
	}

	public void setDateType(String dateType) {
		this.dateType = dateType;
	}

	public String getOrderBy() {
		return orderBy;
	}

	public void setOrderBy(String orderBy) {
		this.orderBy = orderBy;
	}

	public Integer getPageNo() {
		return pageNo;
	}

	public void setPageNo(Integer pageNo) {
		this.pageNo = pageNo;
	}

	public String getSqlWhere() {
		return sqlWhere;
	}

	public void setSqlWhere(String sqlWhere) {
		this.sqlWhere = sqlWhere;
	}

	/**
	 * 数据转化为SQL 时间格式化
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 */
	public TableList initData(TableList tableList) {

		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");

		Calendar c = Calendar.getInstance();
		Date date = new Date();
		if (this.getDateStr() != null) {
			switch (tableList.getDateStr()) {
			case "今天":
				tableList.setDateStart(sf.format(date));
				tableList.setDateEnd(sf.format(date));
				break;
			case "最近一周":
				tableList.setDateEnd(sf.format(date));
				c.setTime(date);
				c.add(Calendar.DAY_OF_MONTH, -7);
				tableList.setDateStart(sf.format(c.getTime()));
				break;
			case "最近一月":
				tableList.setDateEnd(sf.format(date));
				c.setTime(date);
				c.add(Calendar.MONTH, -1);
				tableList.setDateStart(sf.format(c.getTime()));
				break;
			default:
				break;
			}
		}

		List<String> sqlWhereList = new ArrayList<String>();
		if (tableList.getStr() != null && !tableList.getStr().equals("")) {
			String[] split = tableList.getStr().split(",");
			for (int i = 0; i < split.length; i++) {
				if (split[i].split("::").length == 1) {
					continue;
				}
				String[] split2 = split[i].split("::");
				String where = "";
				String wString = "";
				if (AppUtil.isValid(split2[1])) {
					String strWhere = "";
					strWhere = split2[1];
					if (strWhere.contains("#")) {
						where = "('" + strWhere.replace("#", "','") + "')";
						wString = "IN";
					} else {
						if (Integer.parseInt(split2[2]) == 0) {
							where = "\'%" + strWhere + "%\'";
							wString = "like";
						} else {
							where = strWhere;
							wString = "=";
						}
					}

				} else {
					where = "";
				}
				if (!where.equals("")) {
					Boolean bool = true;
					String[] split3 = split2[0].split("-");
					for (int j = 0; j < sqlWhereList.size(); j++) {
						String str1 = sqlWhereList.get(j);
						if (sqlWhereList.get(j).indexOf(split3[0]) > -1) {
							str1 = sqlWhereList.get(j).substring(0, sqlWhereList.get(j).length() - 1);
							String str2 = "";
							for (int k = 0; k < split3.length; k++) {
								str2 += " or " + split3[k] + " " + wString + " " + where + "";
							}
							str1 += str2 + ")";
							sqlWhereList.set(j, str1);
							bool = false;
							break;
						}
					}
					if (bool) {
						if (split3.length > 1) {
							String str1 = " and ( ";
							for (int k = 0; k < split3.length; k++) {
								if (k == 0) {
									str1 += "" + split3[k] + " " + wString + " " + where + "";
								} else {
									str1 += " or " + split3[k] + " " + wString + " " + where + "";
								}
							}
							sqlWhereList.add(str1 + ")");
						} else {
							sqlWhereList.add(" and (" + split2[0] + " " + wString + " " + where + ")");
						}
					}
				}
			}
		}

		String sqlWhere = "";
		for (String str1 : sqlWhereList) {
			sqlWhere += str1;
		}

		this.sqlWhere = sqlWhere;

		tableList.setSqlWhere(sqlWhere);

		return tableList;
	}

	/**
	 * 数据转化为SQL 时间格式化
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 */
	public void initData() {

		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");

		Calendar c = Calendar.getInstance();
		Date date = new Date();
		if (this.getDateStr() != null) {
			switch (dateStr) {
			case "今天":
				this.dateStart = sf.format(date);
				this.dateEnd = sf.format(date);
				break;
			case "最近一周":
				this.dateEnd = sf.format(date);
				c.setTime(date);
				c.add(Calendar.DAY_OF_MONTH, -7);
				this.dateStart = sf.format(c.getTime());
				break;
			case "最近一月":
				this.dateEnd = sf.format(date);
				c.setTime(date);
				c.add(Calendar.MONTH, -1);
				this.dateStart = sf.format(c.getTime());
				break;
			default:
				break;
			}
		}

		List<String> sqlWhereList = new ArrayList<String>();
		if (!StringUtils.isEmpty(this.str)) {
			String[] split = this.str.split(",");
			for (int i = 0; i < split.length; i++) {
				if (split[i].split("::").length == 1) {
					continue;
				}
				String[] split2 = split[i].split("::");
				String where = "";
				String wString = "";
				if (AppUtil.isValid(split2[1])) {
					String strWhere = "";
					strWhere = split2[1];
					if (Integer.parseInt(split2[2]) == 0) {
						where = "\'%" + strWhere + "%\'";
						wString = "like";
					} else {
						where = strWhere;
						wString = "=";
					}

				} else {
					where = "";
				}
				if (!where.equals("")) {
					Boolean bool = true;
					String[] split3 = split2[0].split("-");
					for (int j = 0; j < sqlWhereList.size(); j++) {
						String str1 = sqlWhereList.get(j);
						if (sqlWhereList.get(j).indexOf(split3[0]) > -1) {
							str1 = sqlWhereList.get(j).substring(0, sqlWhereList.get(j).length() - 1);
							String str2 = "";
							for (int k = 0; k < split3.length; k++) {
								str2 += " or " + split3[k] + " " + wString + " " + where + "";
							}
							str1 += str2 + ")";
							sqlWhereList.set(j, str1);
							bool = false;
							break;
						}
					}
					if (bool) {
						if (split3.length > 1) {
							String str1 = " and ( ";
							for (int k = 0; k < split3.length; k++) {
								if (k == 0) {
									str1 += "" + split3[k] + " " + wString + " " + where + "";
								} else {
									str1 += " or " + split3[k] + " " + wString + " " + where + "";
								}
							}
							sqlWhereList.add(str1 + ")");
						} else {
							sqlWhereList.add(" and (" + split2[0] + " " + wString + " " + where + ")");
						}
					}
				}
			}
		}

		String sqlWhere = "";
		for (String str1 : sqlWhereList) {
			sqlWhere += str1;
		}
		this.sqlWhere = sqlWhere;
	}

	public String getMode() {
		return mode;
	}

	public void setMode(String mode) {
		this.mode = mode;
	}

}
