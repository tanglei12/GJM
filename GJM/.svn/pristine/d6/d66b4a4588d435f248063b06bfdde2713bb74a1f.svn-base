package com.gjp.util;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sun.istack.internal.NotNull;
import org.apache.poi.hssf.usermodel.*;

import javax.servlet.http.HttpServletResponse;
import java.io.OutputStream;
import java.util.Date;
import java.util.List;

/**
 * @author JiangQt
 * @description
 * @date Created in 2018-7-1
 */
public class WorkUtil {

    /**
     * 导出Excel文档
     *
     * @param sheetname 文档名称
     * @param titles    标题，格式："[{text: \"小区房号\", name: \"house_address\"}]"
     * @param contents  内容，格式：对象列表
     */
    public static void toExcel(String sheetname, @NotNull JSONArray titles, List<?> contents) {
        // 创建一个HSSFWorkbook，对应一个Excel文件
        HSSFWorkbook wb = new HSSFWorkbook();

        // 在workbook中添加一个sheet,对应Excel文件中的sheet
        HSSFSheet sheet = wb.createSheet(sheetname);

        // 在sheet中添加表头第0行,注意老版本poi对Excel的行数列数有限制
        HSSFRow row = sheet.createRow(0);
        row.setHeight((short) (24 * 20)); // 行高，20倍数

        // 创建单元格
        HSSFCellStyle style_title = wb.createCellStyle();
        // ->设置表头居中
        style_title.setAlignment(HSSFCellStyle.ALIGN_LEFT);
        // ->垂直居中
        style_title.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
        // ->设置字体
        HSSFFont font = wb.createFont();
        font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD); // 加粗
        style_title.setFont(font);

        // 创建标题
        for (int i = 0; i < titles.size(); i++) {
            HSSFCell cell = row.createCell(i);
            JSONObject title_json = JSONObject.parseObject(titles.get(i).toString());
            String title = title_json.getString("title");
            cell.setCellValue(title);
            cell.setCellStyle(style_title);
            sheet.setColumnWidth(i, (int) (title.getBytes().length * 1.15 * 256));
        }

        // 创建单元格
        HSSFCellStyle style_content = wb.createCellStyle();
        // ->设置表头居中
        style_content.setAlignment(HSSFCellStyle.ALIGN_LEFT);
        // ->垂直居中
        style_content.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);

        // 创建内容
        for (int i = 0; i < contents.size(); i++) {
            row = sheet.createRow(i + 1);
            row.setHeight((short) (20 * 20)); // 行高，20倍数

            String content_str = JSONObject.toJSONString(contents.get(i));
            JSONObject content_json = JSONObject.parseObject(content_str);
            for (int j = 0; j < titles.size(); j++) {
                JSONObject title_json = JSONObject.parseObject(titles.get(j).toString());
                String name = title_json.getString("name");
                String param = title_json.getString("param");
                Object value;
                if (name.contains("{") && name.contains("}")) {
                    String name1 = name.substring(0, name.indexOf("{"));
                    String name2 = name.substring(name.indexOf("}") + 1);
                    String center = name.substring(name.indexOf("{") + 1, name.indexOf("}"));
                    value = content_json.get(name1) + center + content_json.get(name2);
                } else {
                    value = content_json.get(name);
                }
                value = handleParam(param, value);

                HSSFCell cell = row.createCell(j);
                cell.setCellValue(value.toString());
                cell.setCellStyle(style_content);

                // 设置列宽
                int columnWidth = sheet.getColumnWidth(j);
                int currentWidth = (int) (value.toString().getBytes().length * 1.15 * 256);
                if (currentWidth > columnWidth) {
                    sheet.setColumnWidth(j, currentWidth);
                }
            }
        }

        try {
            // 文件名
            String filename = sheetname + "_" + AppUtil.sdf_time_str.format(new Date()) + ".xls";
            // 响应到客户端
            HttpServletResponse response = AppUtil.getResponse();
            response.setContentType("application/octet-stream;charset=UTF-8");
            response.setHeader("Content-Disposition", "attachment; filename=" + new String(filename.getBytes(), "ISO8859-1"));
            response.addHeader("Pargam", "no-cache");
            response.addHeader("Cache-Control", "no-cache");
            OutputStream os = response.getOutputStream();
            wb.write(os);
            os.flush();
            os.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static Object handleParam(String param, Object value) {
        Object result = value;
        if (param == null) return result;
        switch (param) {
            case "date":
                result = AppUtil.sdf_date.format(value);
                break;
            case "time":
                result = AppUtil.sdf_time.format(value);
                break;
        }
        return result;
    }

}
