package com.gjp.util;

import com.sun.image.codec.jpeg.JPEGCodec;
import com.sun.image.codec.jpeg.JPEGImageEncoder;
import org.apache.commons.codec.binary.Base64;
import org.springframework.util.StringUtils;
import sun.misc.BASE64Decoder;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.math.BigDecimal;

/**
 * 图片工具
 *
 * @Author JiangQT
 * @Date 2017-9-6 09:46
 */
public class ImageUtil {

    /**
     * 图片文件转BASE64
     * <P>将图片文件转化为字节数组字符串，并对其进行Base64编码处理</P>
     *
     * @param imageFile
     * @return
     * @throws Exception
     */
    public static String imageFileToBase64(String imageFile) throws Exception {
        // 将图片文件转化为字节数组字符串，并对其进行Base64编码处理
        // 读取图片字节数组
        InputStream in = new FileInputStream(imageFile);
        byte[] data = new byte[in.available()];
        in.read(data);
        in.close();
        return new String(Base64.encodeBase64(data));
    }

    /**
     * BASE64转图片
     *
     * @param base64
     * @param imageFile
     * @throws Exception
     * @author JiangQT
     */
    public static boolean base64ToImageFile(String base64, String imageFile) {
        if (StringUtils.isEmpty(base64)) {
            return false;
        }
        BASE64Decoder decoder = new BASE64Decoder();
        // Base64解码
        byte[] bytes;
        try {
            bytes = decoder.decodeBuffer(base64);
            for (int i = 0; i < bytes.length; ++i) {
                if (bytes[i] < 0) {// 调整异常数据
                    bytes[i] += 256;
                }
            }
            // 创建文件夹
            String path = imageFile.substring(0, imageFile.lastIndexOf("/"));
            File f = new File(path);
            if (!f.exists()) {
                f.mkdirs();
            }
            // 创建文件
            File file = new File(imageFile);
            if (!f.exists()) {
                file.createNewFile();
            }
            // 写入图片
            OutputStream out = new FileOutputStream(file);
            out.write(bytes);
            out.flush();
            out.close();
            return true;
        } catch (IOException e) {
            return false;
        }
    }

    /**
     * 等比例压缩算法： 算法思想：根据压缩基数和压缩比来压缩原图，生产一张图片效果最接近原图的缩略图
     *
     * @param srcURL  原图地址
     * @param deskURL 缩略图地址
     * @param comBase 压缩基数
     * @param scale   压缩限制(宽/高)比例 一般用1：
     *                当scale>=1,缩略图height=comBase,width按原图宽高比例;若scale<1,缩略图width=
     *                comBase,height按原图宽高比例
     * @throws Exception
     * @author shenbin
     * @createTime 2014-12-16
     * @lastModifyTime 2014-12-16
     */
    public static void saveMinPhoto(String srcURL, String deskURL, double comBase, double scale) throws Exception {
        File srcFile = new java.io.File(srcURL);
        Image src = ImageIO.read(srcFile);
        int srcHeight = src.getHeight(null);
        int srcWidth = src.getWidth(null);
        int deskHeight = 0;// 缩略图高
        int deskWidth = 0;// 缩略图宽
        double srcScale = (double) srcHeight / srcWidth;
        /* 缩略图宽高算法 */
        if ((double) srcHeight > comBase || (double) srcWidth > comBase) {
            if (srcScale >= scale || 1 / srcScale > scale) {
                if (srcScale >= scale) {
                    deskHeight = (int) comBase;
                    deskWidth = srcWidth * deskHeight / srcHeight;
                } else {
                    deskWidth = (int) comBase;
                    deskHeight = srcHeight * deskWidth / srcWidth;
                }
            } else {
                if ((double) srcHeight > comBase) {
                    deskHeight = (int) comBase;
                    deskWidth = srcWidth * deskHeight / srcHeight;
                } else {
                    deskWidth = (int) comBase;
                    deskHeight = srcHeight * deskWidth / srcWidth;
                }
            }
        } else {
            deskHeight = srcHeight;
            deskWidth = srcWidth;
        }
        BufferedImage tag = new BufferedImage(deskWidth, deskHeight, BufferedImage.TYPE_INT_RGB);
        tag.getGraphics().drawImage(src, 0, 0, deskWidth, deskHeight, null); // 绘制缩小后的图
        FileOutputStream deskImage = new FileOutputStream(deskURL); // 输出到文件流
        JPEGImageEncoder encoder = JPEGCodec.createJPEGEncoder(deskImage);
        encoder.encode(tag); // 近JPEG编码
        deskImage.close();
    }

    /**
     * 等比例压缩算法： 算法思想：根据压缩基数和压缩比来压缩原图，生产一张图片效果最接近原图的缩略图
     *
     * @param srcURL  原图地址
     * @param deskURL 缩略图地址
     * @param comBase 压缩基数
     * @param scale   压缩限制(宽/高)比例 一般用1：
     *                当scale>=1,缩略图height=comBase,width按原图宽高比例;若scale<1,缩略图width=
     *                comBase,height按原图宽高比例
     * @throws Exception
     * @author shenbin
     */
    public static void resizePNG(String srcURL, String deskURL, double comBase, double scale) {
        try {
            File f2 = new File(srcURL);
            BufferedImage src = ImageIO.read(f2);
            int srcHeight = src.getHeight(null);
            int srcWidth = src.getWidth(null);
            int deskHeight = 0;// 缩略图高
            int deskWidth = 0;// 缩略图宽
            double srcScale = (double) srcHeight / srcWidth;
            /* 缩略图宽高算法 */
            if ((double) srcHeight > comBase || (double) srcWidth > comBase) {
                if (srcScale >= scale || 1 / srcScale > scale) {
                    if (srcScale >= scale) {
                        deskHeight = (int) comBase;
                        deskWidth = srcWidth * deskHeight / srcHeight;
                    } else {
                        deskWidth = (int) comBase;
                        deskHeight = srcHeight * deskWidth / srcWidth;
                    }
                } else {
                    if ((double) srcHeight > comBase) {
                        deskHeight = (int) comBase;
                        deskWidth = srcWidth * deskHeight / srcHeight;
                    } else {
                        deskWidth = (int) comBase;
                        deskHeight = srcHeight * deskWidth / srcWidth;
                    }
                }
            } else {
                deskHeight = srcHeight;
                deskWidth = srcWidth;
            }
            BufferedImage to = new BufferedImage(deskWidth, deskHeight,BufferedImage.TYPE_INT_RGB);
            Graphics2D g2d = to.createGraphics();
            to = g2d.getDeviceConfiguration().createCompatibleImage(deskWidth,deskHeight,Transparency.TRANSLUCENT);
            g2d.dispose();
            g2d = to.createGraphics();
            Image from = src.getScaledInstance(deskWidth, deskHeight, src.SCALE_AREA_AVERAGING);
            g2d.drawImage(from, 0, 0, null);
            g2d.dispose();
            ImageIO.write(to, "png", new File(deskURL));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 压缩图片
     *
     * @param file   图片文件
     * @param width  压缩宽度
     * @param toFile 输出文件
     */
    public static void compress(File file, int width, File toFile) {
        try {
            FileInputStream fs = new FileInputStream(file);
            ByteArrayOutputStream bos = new ByteArrayOutputStream();
            byte[] b = new byte[1024];
            int len;
            while ((len = fs.read(b)) != -1) {
                bos.write(b, 0, len);
            }
            fs.close();
            byte[] bytes = bos.toByteArray();
            FileOutputStream fos = new FileOutputStream(toFile);
            fos.write(compress(bytes, width));
            fos.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 压缩图片
     *
     * @param imageByte 图片BYTE
     * @param width     压缩宽度
     * @param toFile    输出文件
     */
    public static void compress(byte[] imageByte, int width, File toFile) {
        try {
            FileOutputStream fos = new FileOutputStream(toFile);
            fos.write(compress(imageByte, width));
            fos.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 压缩图片
     *
     * @param imageByte 图片BYTE
     * @param width     压缩宽度
     * @return
     */
    public static byte[] compress(byte[] imageByte, int width) {
        byte[] result = null;
        try {
            BufferedImage image = ImageIO.read(new ByteArrayInputStream(imageByte));
            // 判断图片格式是否正确
            if (image.getWidth() == -1) {
                return imageByte;
            }
            // 判断压缩宽度是否大于图片宽度
            if (image.getWidth() < width) {
                return imageByte;
            }
            // 等比例计算压缩高度
            int height = (int) (new BigDecimal(image.getHeight()).doubleValue() / (new BigDecimal(image.getWidth()).doubleValue() / new BigDecimal(width).doubleValue()));
            // 重新绘制图片
            BufferedImage toImage = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
            Graphics2D g2d = toImage.createGraphics();
            toImage = g2d.getDeviceConfiguration().createCompatibleImage(width, height, Transparency.TRANSLUCENT);
            g2d.dispose();
            g2d = toImage.createGraphics();
            Image from = image.getScaledInstance(width, height, Image.SCALE_AREA_AVERAGING);
            g2d.drawImage(from, 0, 0, null);
            g2d.dispose();
            ByteArrayOutputStream out = new ByteArrayOutputStream(imageByte.length);
            // 输出图片
            ImageIO.write(toImage, "png", out);
            result = out.toByteArray();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

}
