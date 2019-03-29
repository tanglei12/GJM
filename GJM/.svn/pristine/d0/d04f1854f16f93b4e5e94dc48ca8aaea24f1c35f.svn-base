package com.gjp.util.upload;

import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPReply;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

public class URLUploadImage {

	private static FTPClient ftp;

	/**
	 * 1.运行远程上传
	 * 
	 * @作者 JiangQT
	 * @日期 2016年9月1日
	 *
	 * @param path
	 *            服务器地址
	 * @param addr
	 *            IP地址
	 * @param port
	 *            接口
	 * @param username
	 *            账户
	 * @param password
	 *            密码
	 * @param local
	 *            本地输出地址
	 * @return
	 * @throws Exception
	 */
	public static boolean run(String path, String addr, int port, String username, String password, String local) throws Exception {
		boolean boo = false;
		// 实例化对象
		URLUploadImage t = new URLUploadImage();
		// 连接远程服务器并登录
		boo = t.connect(path, addr, port, username, password);
		// 上传文件
		boo = t.upload(new File(local));
		return boo;
	}

	/**
	 * 2.连接服务器并登录
	 * 
	 * @param path
	 *            上传到ftp服务器哪个路径下
	 * @param addr
	 *            地址
	 * @param port
	 *            端口号
	 * @param username
	 *            用户名
	 * @param password
	 *            密码
	 * @return
	 */
	private boolean connect(String path, String addr, int port, String username, String password) {
		boolean result = false;
		ftp = new FTPClient();
		try {
			ftp.connect(addr, port);
			ftp.setDataTimeout(18000);
			ftp.login(username, password);
			ftp.setFileType(FTPClient.BINARY_FILE_TYPE);
			if (!FTPReply.isPositiveCompletion(ftp.getReplyCode())) {
				ftp.disconnect();
				return result;
			}
			System.out.println(path);
			result = ftp.changeWorkingDirectory(path);
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("error: " + path);
		}
		return result;

	}

	/**
	 * 3.上传文件
	 * 
	 * @param file
	 *            上传的文件或文件夹
	 * @return
	 * @throws Exception
	 */
	private boolean upload(File file) {
		boolean boo = false;
		try {
			if (file.isDirectory()) {
				ftp.makeDirectory(file.getName());
				ftp.changeWorkingDirectory(file.getName());
				String[] files = file.list();
				if (files != null) {
					for (int i = 0; i < files.length; i++) {
						File file1 = new File(file.getPath() + "\\" + files[i]);
						if (file1.isDirectory()) {
							upload(file1);
							boo = ftp.changeToParentDirectory();
						} else {
							File file2 = new File(file.getPath() + "\\" + files[i]);
							FileInputStream input = new FileInputStream(file2);
							boo = ftp.storeFile(file2.getName(), input);
							input.close();
						}
					}
				}
			} else {
				File file2 = new File(file.getPath());
				FileInputStream input = new FileInputStream(file2);
				ftp.enterLocalPassiveMode();
				ftp.storeFile(file2.getName(), input);
				input.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return boo;
	}

	/**
	 * 4.登出
	 * 
	 * @作者 JiangQT
	 * @日期 2016年9月1日
	 *
	 * @return
	 * @throws Exception
	 */
	public static boolean logout() {
		try {
			return ftp.logout();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return false;
	}

	/**********************/

	public static boolean delete(String path, String addr, int port, String username, String password, String local) {
		URLUploadImage t = new URLUploadImage();
		String str1 = local.substring(45, local.length());
		try {
			t.connect(path, addr, port, username, password);
		} catch (Exception e) {
			e.printStackTrace();
		}
		boolean flag = false;
		if (ftp != null) {
			try {
				flag = ftp.deleteFile(str1);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return flag;
	}

	public static boolean delete2(String path, String addr, int port, String username, String password, String local) {
		URLUploadImage t = new URLUploadImage();
		File file = new File(local);
		try {
			t.connect(path, addr, port, username, password);
		} catch (Exception e) {
			e.printStackTrace();
		}
		boolean flag = false;
		if (ftp != null) {
			try {
				flag = ftp.deleteFile(file.getName());
			} catch (IOException e) {
				e.printStackTrace();
			} finally {
				try {
					ftp.logout();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return flag;
	}

	public static boolean deletePro(String path, String addr, int port, String username, String password, String local) {
		URLUploadImage t = new URLUploadImage();
		File file = new File(local);
		try {
			t.connect(path, addr, port, username, password);
		} catch (Exception e) {
			e.printStackTrace();
		}
		boolean flag = false;
		if (ftp != null) {
			try {
				flag = ftp.deleteFile(file.getName());
			} catch (IOException e) {
				e.printStackTrace();
			} finally {
				try {
					ftp.logout();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return flag;
	}

	public static boolean deletess(String path, String addr, int port, String username, String password, String local) {
		URLUploadImage t = new URLUploadImage();
		String str1 = local.substring(42, local.length());
		try {
			t.connect(path, addr, port, username, password);
		} catch (Exception e) {
			e.printStackTrace();
		}
		boolean flag = false;
		if (ftp != null) {
			try {
				flag = ftp.deleteFile(str1);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return flag;
	}

	public static boolean deletes(String path, String addr, int port, String username, String password, String local) {
		URLUploadImage t = new URLUploadImage();
		String str1 = local.substring(37, local.length());
		System.out.println(str1);
		try {
			t.connect(path, addr, port, username, password);
		} catch (Exception e) {
			e.printStackTrace();
		}
		boolean flag = false;
		if (ftp != null) {
			try {
				flag = ftp.deleteFile(str1);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return flag;
	}

}
