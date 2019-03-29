package com.gjp.model;

import lombok.Data;

import java.util.Date;

/**
 * null
 * 
 * @author JiangQT
 */
@Data
public class TopicReleaseVo {

  // 发布ID
  private Integer r_id;
  // 圈子id集
  private String r_tid;
  // 发布人
  private Integer r_releaseEm;
  // 发布时间
  private Date r_createTime;
}
