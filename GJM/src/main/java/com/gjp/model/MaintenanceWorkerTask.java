package com.gjp.model;

import java.util.Date;

/**
 * 客户部人员任务及完成详情
 * @author zoe
 *
 */
public class MaintenanceWorkerTask {

	private Integer wt_id;
	private Integer em_id;// 服务人员ID
	private Integer md_id;// 订单ID
	private Integer task_state;// 1-进行中，2-已完成
	private Integer appoint_id;// 指派人ID
	private Date appoint_time;// 指派时间
	private Date start_time;// 预计开始时间
	private Date estimated_time;// 预计结束时间
	private Date realEnd_time;// 实际结束时间

	public Integer getWt_id() {
		return wt_id;
	}

	public void setWt_id(Integer wt_id) {
		this.wt_id = wt_id;
	}

	public Integer getEm_id() {
		return em_id;
	}

	public void setEm_id(Integer em_id) {
		this.em_id = em_id;
	}

	public Integer getMd_id() {
		return md_id;
	}

	public void setMd_id(Integer md_id) {
		this.md_id = md_id;
	}

	public Integer getAppoint_id() {
		return appoint_id;
	}

	public void setAppoint_id(Integer appoint_id) {
		this.appoint_id = appoint_id;
	}

	public Date getAppoint_time() {
		return appoint_time;
	}

	public void setAppoint_time(Date appoint_time) {
		this.appoint_time = appoint_time;
	}

	public Integer getTask_state() {
		return task_state;
	}

	public void setTask_state(Integer task_state) {
		this.task_state = task_state;
	}

	public Date getStart_time() {
		return start_time;
	}

	public void setStart_time(Date start_time) {
		this.start_time = start_time;
	}

	public Date getEstimated_time() {
		return estimated_time;
	}

	public void setEstimated_time(Date estimated_time) {
		this.estimated_time = estimated_time;
	}

	public Date getRealEnd_time() {
		return realEnd_time;
	}

	public void setRealEnd_time(Date realEnd_time) {
		this.realEnd_time = realEnd_time;
	}
}
