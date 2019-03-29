package com.gjp.controller;

import com.gjp.model.HousePriceRecordVo;
import com.gjp.service.RecordService;
import com.gjp.util.Msg;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

@Controller
@RequestMapping("/record")
public class RecordController {

	// 预定账单
	private @Resource
    RecordService recordService;

	/**
	 * 查询房源定价记录
	 * 
	 * @param hi_code
	 *            房源CODE
	 * @return
	 */
	@RequestMapping("/queryHousePriceRecord")
	@ResponseBody
	public String selectHouseyear(String hi_code) {
		Msg<Object> msg = new Msg<>();
		HousePriceRecordVo priceRecordVo = new HousePriceRecordVo();
		priceRecordVo.setHi_code(hi_code);
		List<HousePriceRecordVo> priceRecords = recordService.queryHousePriceRecord(priceRecordVo);
		msg.put("priceRecordList", priceRecords);
		return msg.toString();
	}

}
