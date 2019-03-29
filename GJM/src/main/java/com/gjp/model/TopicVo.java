package com.gjp.model;

import lombok.Data;

import java.util.Date;

/**
 * null
 * 
 * @author JiangQT
 */
@Data
public class TopicVo {

  // 话题ID
  private Integer t_id;
  // 标题
  private String t_title;
  // 封面图片路径
  private String t_cover;
  // 缩略图
  private String t_coverSmall;
  // 话题内容
  private String t_content;
  // 创建者
  private Integer t_createEm;
  // 创建者姓名
  private String t_createEmName;
  // 创建时间
  private Date t_createTime;
  // 发布者
  private Integer t_releaseEm;
  // 发布时间
  private Date t_releaseTime;
  // 是否删除(0:否;1:是)
  private Integer t_isDelete;
  // 是否已发布(0:未发布;1:已发布)
  private Integer t_isRelease;
  //发布人姓名
  private String em_name;

  /*********扩展*****************/
  // 封面图片路径OSS
  private String t_coverOSS;
  // 缩略图OSS
  private String t_coverSmallOSS;

}
