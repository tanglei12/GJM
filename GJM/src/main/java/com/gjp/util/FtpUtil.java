package com.gjp.util;

import com.gjp.model.Ftp;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPReply;

import java.io.*;
import java.util.Properties;

public class FtpUtil {

	// 资源前缀名
	private static String propName;

	private static FTPClient ftp;

	private ThreadLocal<FTPClient> ftpClientThreadLocal = new ThreadLocal<FTPClient>(); // 线程局部变量

	private static class FTPUtilInstance {
		private static FtpUtil ftpUtil = new FtpUtil();
	}

	public static FtpUtil getInstance(String propName) {
		FtpUtil.propName = propName;
		return FTPUtilInstance.ftpUtil;
	}

	/**
	 * 获取ftp连接
	 * 
	 * @param f
	 * @return
	 * @throws Exception
	 */
	public boolean connectFtp(Ftp f) throws Exception {
		ftp = new FTPClient();
		boolean flag = false;
		int reply;
		if (f.getPort() == null) {
			ftp.connect(f.getIpAddr(), 21);
		} else {
			ftp.connect(f.getIpAddr(), f.getPort());
		}
		ftp.login(f.getUserName(), f.getPwd());
		ftp.setFileType(FTPClient.BINARY_FILE_TYPE);
		reply = ftp.getReplyCode();
		if (!FTPReply.isPositiveCompletion(reply)) {
			ftp.disconnect();
			return flag;
		}
		ftp.changeWorkingDirectory("/");
		flag = true;
		return flag;
	}

	/**
	 * 关闭ftp连接
	 * 
	 * @throws Exception
	 */
	public void closeFtp() throws Exception {
		if (ftp != null && ftp.isConnected()) {
			ftp.logout();
			ftp.disconnect();
		}
	}

	/**
	 * 获取ftp连接（多线程）
	 * 
	 * @return
	 * @throws Exception
	 */
	public FTPClient getFTPClient() throws Exception {
		if (ftpClientThreadLocal.get() != null && ftpClientThreadLocal.get().isConnected()) {
			return ftpClientThreadLocal.get();
		}
		Ftp f = getFtp();
		FTPClient ftpClient = new FTPClient();
		int reply;
		if (f.getPort() == null) {
			ftpClient.connect(f.getIpAddr(), 21);
		} else {
			ftpClient.connect(f.getIpAddr(), f.getPort());
		}
		ftpClient.login(f.getUserName(), f.getPwd());
		ftpClient.setFileType(FTPClient.BINARY_FILE_TYPE);
		reply = ftpClient.getReplyCode();
		if (!FTPReply.isPositiveCompletion(reply)) {
			ftpClient.disconnect();
			return ftpClient;
		}
		ftpClient.changeWorkingDirectory("/");
		ftpClientThreadLocal.set(ftpClient);
		return ftpClient;
	}

	/**
	 * 断开ftp连接（多线程）
	 * 
	 * @throws Exception
	 */
	public void disconnect() throws Exception {
		try {
			FTPClient ftpClient = getFTPClient();
			ftpClient.logout();
			if (ftpClient.isConnected()) {
				ftpClient.disconnect();
				ftpClient = null;
			}
		} catch (IOException e) {
			throw new Exception("Could not disconnect from server.", e);
		}
	}

	/**
	 * 获取ftp链接常量
	 * 
	 * @return
	 */
	public Ftp getFtp() {
		Ftp f = new Ftp();
		Properties properties = PropertiesUtil.getProperties("/conf/path.properties");
		f.setIpAddr(properties.getProperty("common.addr"));
		f.setUserName(properties.getProperty("common.username"));
		f.setPwd(properties.getProperty("common.password"));
		f.setPort(Integer.parseInt(properties.getProperty("common.port")));

		f.setSysFile(properties.getProperty(propName + ".filePath"));
		f.setUrlFile(properties.getProperty(propName + ".url"));

		// f.setIdApprRead(properties.getProperty("ftp.ipAddrRead"));
		// f.setUserNameRead(properties.getProperty("ftp.userNameRead"));
		// f.setPwdRead(properties.getProperty("ftp.pwdRead"));
		return f;
	}

	/**
	 * InputStream-->byte[]
	 * 
	 * @throws IOException
	 */
	public byte[] readInputStream(InputStream inputStream) throws Exception {
		byte[] buffer = new byte[1024];
		int len = -1;
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
		while ((len = inputStream.read(buffer)) != -1) {
			outputStream.write(buffer, 0, len);
		}
		outputStream.close();
		inputStream.close();
		return outputStream.toByteArray();
	}

	/*
	 * 下载获得文件的二进制流信息
	 * 
	 * @param key
	 * 
	 * @return
	 * 
	 * @throws java.io.IOException
	 */
	public byte[] download(String key) throws Exception {
		return download(key, null);
	}

	/**
	 * 多线程下载
	 * 
	 * @param key
	 * @param type
	 * @return
	 */
	public byte[] download(String key, String type) {
		byte[] objFile = null;
		Ftp f = getFtp();
		String cacheFile = "/cache_" + key;
		if (null == type) {
			// 设置目录
			key = f.getSysFile() + key;
		} else {
			// 设置目录
			key = f.getUrlFile() + key;
		}
		FTPClient ftpClient = null;
		try {
			ftpClient = getFTPClient();
			if (ftpClient != null && ftpClient.isConnected()) {
				try {
					ftpClient.changeWorkingDirectory("/");
					File localFile = new File(cacheFile);
					if (localFile.exists()) {
						localFile.createNewFile();// 创建文件
					}
					OutputStream outputStream = new FileOutputStream(localFile);
					ftpClient.enterLocalPassiveMode();
					ftpClient.setUseEPSVwithIPv4(true);
					// ftp.retrieveFile("1.jpg", outputStream);
					ftpClient.retrieveFile(key, outputStream);
					InputStream inputStream = new FileInputStream(localFile);
					objFile = readInputStream(inputStream);
					outputStream.close();
					inputStream.close();
					localFile.delete();

				} catch (Exception e) {
					System.out.println(e);
					System.out.println("下载过程中出现异常");
				}

			} else {
				System.out.println("链接失败！");
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				disconnect();
			} catch (Exception e) {
				e.printStackTrace();
			}

		}
		return objFile;
	}

	/**
	 * 上传文件
	 * 
	 * @param fileName
	 *            文件名 例:upload/20150306/text.txt
	 * @param input
	 *            文件流
	 * @return
	 */
	public String upload(String fileName, InputStream input) {
		return upload(fileName, input, null);
	}

	/**
	 * 多线程上传
	 * 
	 * @param key
	 * @param input
	 * @param type
	 * @return
	 */
	public String upload(String key, InputStream input, String type) {
		String etag = "/" + key;
		Ftp f = getFtp();
		if (null == type) {
			// 设置目录
			key = f.getSysFile() + key;
		} else {
			// 设置目录
			key = f.getUrlFile() + key;
		}

		FTPClient ftpClient = null;
		try {
			ftpClient = getFTPClient();
			if (ftpClient != null && ftpClient.isConnected()) {
				ftpClient.enterLocalPassiveMode();
				ftpClient.setUseEPSVwithIPv4(true);
				ftpClient.storeFile(key, input);
				input.close();
				etag = f.getUrlFile() + etag;
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException("FTP客户端出错！", e);
		} finally {
			try {
				disconnect();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return etag;
	}

	/**
	 * 删除一个存储在FTP服务器上的文件
	 * 
	 * @param file
	 * @return
	 * @throws Exception
	 */
	public boolean delete(String file) throws Exception {
		boolean deleteFile = false;
		file = file.substring(file.lastIndexOf("/") + 1, file.length());
		Ftp f = getFtp();
		file = f.getSysFile() + file;
		if (connectFtp(f)) {
			deleteFile = ftp.deleteFile(file);
		}
		closeFtp();
		return deleteFile;
	}

	/**
	 * 多线程下载
	 * 
	 * @param fileName
	 * @return
	 */
	public Object[] getDownLoadStream(String fileName) {

		Long dataLength = null;
		byte[] objFile = null;
		Ftp f = getFtp();
		fileName = f.getSysFile() + fileName;
		FTPClient ftpClient = null;
		try {
			ftpClient = getFTPClient();
			if (ftpClient != null && ftpClient.isConnected()) {

				File localFile = new File("/cache_" + fileName);
				if (localFile.exists()) {
					localFile.createNewFile();// 创建文件
				}
				OutputStream outputStream = new FileOutputStream(localFile);
				ftpClient.enterLocalPassiveMode();
				ftpClient.setUseEPSVwithIPv4(true);
				// ftp.retrieveFile("1.jpg", outputStream);
				ftpClient.retrieveFile(fileName, outputStream);
				InputStream inputStream = new FileInputStream(localFile);
				objFile = readInputStream(inputStream);
				dataLength = (long) inputStream.available();
				outputStream.close();
				inputStream.close();
				localFile.delete();
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				disconnect();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		Object[] res = new Object[] { objFile, dataLength };

		return res;
	}

	/**
	 * 获取Ftp下载路径
	 * 
	 * @param key
	 * @return
	 */
	public String getObjectUrl(String key) {
		Ftp f = getFtp();
		key = f.getSysFile() + key;
		String alpath = "ftp://" + f.getUserNameRead() + ":" + f.getPwdRead() + "@" + f.getIdApprRead() + ":" + f.getPort() + key;
		return alpath;
	}
}
