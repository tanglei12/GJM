package com.gjp.controller;

import com.gjp.model.ContractImageVo;
import com.gjp.model.UserCenterStatementVo;
import com.gjp.model.ViewBillBookkeepBookVo;
import com.gjp.service.BillBookkeepBookService;
import com.gjp.service.ContractService;
import com.gjp.service.UserCenterStatementService;
import com.gjp.util.OSSparameter;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author tanglei
 * @description
 * @date Created in 2017/11/15
 */
@Controller
@RequestMapping("/ImageDown")
public class ImageDownController {
    @Resource
    private BillBookkeepBookService billBookkeepBookService;
    @Resource
    private UserCenterStatementService userCenterStatementService;
    @Resource
    private ContractService contractService;

    public static byte[] readInputStream(InputStream inStream) throws Exception {
        ByteArrayOutputStream outStream = new ByteArrayOutputStream();
        //创建一个Buffer字符串
        byte[] buffer = new byte[8192];
        //每次读取的字符串长度，如果为-1，代表全部读取完毕
        int len = 0;
        //使用一个输入流从buffer里把数据读取出来
        while ((len = inStream.read(buffer)) != -1) {
            //用输出流往buffer里写入数据，中间参数代表从哪个位置开始读，len代表读取的长度
            outStream.write(buffer, 0, len);
        }
        //关闭输入流
        inStream.close();
        //把outStream里的数据写入内存
        return outStream.toByteArray();
    }

    /**
     * 下载记账本图片
     */
    @RequestMapping("/bookKeepImageDown")
    @ResponseBody
    public Map<String, Object> bookKeepImageDown() {
        Map<String, Object> map = new HashMap<>();
        List<ViewBillBookkeepBookVo> adverImageVos =billBookkeepBookService.queryBookKeepImageDown();
        for (ViewBillBookkeepBookVo book : adverImageVos) {
            if (book.getBk_enclasure() != null) {
                String [] s=book.getBk_enclasure().split("_");
                for (int i=0;i<s.length;i++) {
                    try {
                        //new一个URL对象
                        URL url = new URL(s[i].replace("www.cqgjp.com","www.cqgjp.com:7070"));
                        //打开链接
                        HttpURLConnection conn = (HttpURLConnection)url.openConnection();
                        //设置请求方式为"GET"
                        conn.setRequestMethod("GET");
                        //超时响应时间为5秒
                        conn.setConnectTimeout(5 * 1000);
                        //通过输入流获取图片数据
                        InputStream inStream = conn.getInputStream();
                        //得到图片的二进制数据，以二进制封装得到数据，具有通用性
                        byte[] data = readInputStream(inStream);
                        //new一个文件对象用来保存图片，默认保存当前工程根目录
                        File imageFile = new File("F:bookKeep//"+s[i].split("houseImage/")[1]);
                        //创建输出流
                        FileOutputStream outStream = new FileOutputStream(imageFile);
                        //写入数据
                        outStream.write(data);
                        //关闭输出流
                        outStream.close();
                    } catch (MalformedURLException e) {
                        e.printStackTrace();
                        continue;
                    } catch (IOException e) {
                        e.printStackTrace();
                        continue;
                    } catch (Exception e) {
                        e.printStackTrace();
                        continue;
                    }
                }
            }
        }
        return map;
    }

    /**
     * 上传合同图片
     *
     * @return Map<String, Object>
     */
    @RequestMapping("/uploadBookKeepImage")
    @ResponseBody
    public Map<String, Object> uploadBookKeepImage() {
        Map<String, Object> map = new HashMap<>();

        File file = new File("F:/bookKeep");
        File [] files = file.listFiles();
        for (int i = 0; i < files.length; i++)
        {
            File file1 = files[i];
            OSSparameter.uploadFile(file1,"bookKeep");
        }
        return map;
    }


    /**
     * 下载结算账单图片
     * @return
     */
    @RequestMapping("/contractStatementImageDown")
    @ResponseBody
    public Map<String, Object> contractStatementImageDown() {
        Map<String, Object> map = new HashMap<>();
        List<UserCenterStatementVo> adverImageVos =userCenterStatementService.querycontractStatementImage();
        for (UserCenterStatementVo statement : adverImageVos) {
            if (statement.getStatement_path() != null && !StringUtils.isEmpty(statement.getStatement_path())) {
                String[] s=statement.getStatement_path().split(";");
                for (int i=0;i<s.length;i++) {
                    try {
                        //new一个URL对象
                        URL url = new URL(s[i].replace("www.cqgjp.com","www.cqgjp.com:7070"));
                        //打开链接
                        HttpURLConnection conn = (HttpURLConnection)url.openConnection();
                        //设置请求方式为"GET"
                        conn.setRequestMethod("GET");
                        //超时响应时间为5秒
                        conn.setConnectTimeout(5 * 1000);
                        //通过输入流获取图片数据
                        InputStream inStream = conn.getInputStream();
                        //得到图片的二进制数据，以二进制封装得到数据，具有通用性
                        byte[] data = readInputStream(inStream);
                        //new一个文件对象用来保存图片，默认保存当前工程根目录
                        File imageFile = new File("F:contractImage//"+s[i].split("contractImage/")[1]);
                        //创建输出流
                        FileOutputStream outStream = new FileOutputStream(imageFile);
                        //写入数据
                        outStream.write(data);
                        //关闭输出流
                        outStream.close();
                    } catch (MalformedURLException e) {
                        e.printStackTrace();
                        continue;
                    } catch (IOException e) {
                        e.printStackTrace();
                        continue;
                    } catch (Exception e) {
                        e.printStackTrace();
                        continue;
                    }
                }
            }
        }
        return map;
    }

    /**
     * 上传结算账单图片
     * @return
     */
    @RequestMapping("/uploadContractStatementImage")
    @ResponseBody
    public Map<String, Object> uploadContractStatementImage() {
        Map<String, Object> map = new HashMap<>();

        File file = new File("F:/contractImage");
        File [] files = file.listFiles();
        for (int i = 0; i < files.length; i++)
        {
            File file1 = files[i];
            OSSparameter.uploadFile(file1,"contractImage");
        }
        return map;
    }

    /**
     *结算账单转移到合同图片库里面
     */
    @RequestMapping("/ContractStatementImageToContractImage")
    @ResponseBody
    public Map<String,Object> ContractStatementImageToContractImage() {
        Map<String, Object> map = new HashMap<>();
        boolean bool=true;
        List<UserCenterStatementVo> adverImageVos =userCenterStatementService.querycontractStatementImage();
        for (UserCenterStatementVo statementVo : adverImageVos) {
            if (statementVo.getStatement_path() != null && !StringUtils.isEmpty(statementVo.getStatement_path())) {
                if (statementVo.getStatement_id() == 7557) {
                    ContractImageVo imageVo=new ContractImageVo();
                    imageVo.setContractObject_Code(statementVo.getContractObject_code());
                    imageVo.setCi_type("JSD");
                    imageVo.setCi_path(statementVo.getStatement_path());
                    imageVo.setCi_state(0);
                    imageVo.setCi_createTime(new Date());
                    bool=contractService.addContractImage(imageVo);
                }
            }
        }
        return map;
    }

}
