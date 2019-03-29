package com.gjp.util;

import org.apache.commons.io.IOUtils;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPReply;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

/**
 * FTP连接管理
 * 
 * @author 庆涛
 *
 */
public class FtpConManager {

	// 定义方法
	private static FtpConManager instance;
	// 定义FTP客户端
	private FTPClient ftpClient = null;

	/**
	 * 初始化
	 * 
	 * @Description:
	 * @return
	 * @author JiangQt
	 */
	public synchronized static FtpConManager getInstance() {
		if (instance == null) {
			instance = new FtpConManager();
		}
		return instance;
	}

	/**
	 * FTP登录
	 * </p>
	 * 
	 * @param s_url
	 *            ftp服务地址
	 * @param uname
	 *            用户名
	 * @param pass
	 *            密码
	 */
	public void login(String s_url, String uname, String pass) {
		ftpClient = new FTPClient();
		try {
			// 连接
			ftpClient.connect(s_url);
			ftpClient.login(uname, pass);
			// 检测连接是否成功
			int reply = ftpClient.getReplyCode();
			if (!FTPReply.isPositiveCompletion(reply)) {
				this.closeCon();
				System.err.println("FTP server refused connection.");
				System.exit(1);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
			// 关闭
			this.closeCon();
		}
	}

	/**
	 * FTP上传文件
	 * </p>
	 * 
	 * @param srcUrl
	 *            须上传文件
	 * @param targetFname
	 *            生成目标文件
	 * @return true||false
	 */
	public boolean uploadFile(String srcUrl, String targetFname) {
		boolean flag = false;
		if (ftpClient != null) {
			File srcFile = new File(srcUrl);
			FileInputStream fis = null;
			try {
				fis = new FileInputStream(srcFile);

				// 设置上传目录
				ftpClient.changeWorkingDirectory("/ImData/");
				ftpClient.setBufferSize(1024);
				ftpClient.setControlEncoding("GBK");

				// 设置文件类型（二进制）
				ftpClient.setFileType(FTPClient.BINARY_FILE_TYPE);
				// 上传
				flag = ftpClient.storeFile(targetFname, fis);
			} catch (Exception e) {
				e.printStackTrace();
				this.closeCon();
			} finally {
				IOUtils.closeQuietly(fis);
			}
		}
		return flag;
	}// end method uploadFile

	/**
	 * 删除FTP上的文件
	 * </p>
	 * 
	 * @param srcFname
	 * @return true || false
	 */
	public boolean removeFile(String srcFname) {
		boolean flag = false;
		if (ftpClient != null) {
			try {
				flag = ftpClient.deleteFile(srcFname);
			} catch (IOException e) {
				e.printStackTrace();
				this.closeCon();
			}
		}
		return flag;
	}

	/**
	 * 销毁FTP连接
	 * </p>
	 */
	public void closeCon() {
		if (ftpClient != null) {
			if (ftpClient.isConnected()) {
				try {
					ftpClient.logout();
					ftpClient.disconnect();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}

}
