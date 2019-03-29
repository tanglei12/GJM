package com.gjp.util.upload;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;

public class ImageHepler {
	/**
	 * 缁樺埗缂╂斁鍥�
	 * 
	 * @param img
	 *            鍘熷浘
	 * @param width
	 *            鐩爣鍥惧
	 * @param height
	 *            鐩爣鍥鹃珮
	 * @return
	 */
	private static BufferedImage makeThumbnail(Image img, int width, int height) {
		BufferedImage tag = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
		Graphics g = tag.getGraphics();
		g.drawImage(img.getScaledInstance(width, height, Image.SCALE_SMOOTH), 0, 0, null);
		g.dispose();
		return tag;
	}

	/**
	 * 瑁佸壀鍥剧墖
	 * 
	 * @param image
	 *            鍘熷浘
	 * @param subImageBounds
	 *            瑁佸壀鐭╁舰妗�
	 * @param subImageFile
	 *            淇濆瓨璺緞
	 * @throws Exception
	 */
	private static void saveSubImage(BufferedImage image, Rectangle subImageBounds, File subImageFile, String path, String addr, int port, String username, String password,
			String local) throws Exception {
		String fileName = subImageFile.getName();
		String formatName = fileName.substring(fileName.lastIndexOf('.') + 1);
		BufferedImage subImage = new BufferedImage(subImageBounds.width, subImageBounds.height, BufferedImage.TYPE_INT_RGB);
		Graphics g = subImage.getGraphics();
		if (subImageBounds.width > image.getWidth() || subImageBounds.height > image.getHeight()) {
			int left = subImageBounds.x;
			int top = subImageBounds.y;
			if (image.getWidth() < subImageBounds.width)
				left = (int) ((subImageBounds.width - image.getWidth()) / 2);
			if (image.getHeight() < subImageBounds.height)
				top = (int) ((subImageBounds.height - image.getHeight()) / 2);
			g.setColor(Color.white);
			g.fillRect(0, 0, subImageBounds.width, subImageBounds.height);
			g.drawImage(image, left, top, null);
			ImageIO.write(image, formatName, subImageFile);
			System.out.println("if is running left:" + left + " top: " + top);
		} else {
			// BufferedImage subImage =
			// image.getSubimage(subImageBounds.x,subImageBounds.y,
			// subImageBounds.width, subImageBounds.height);
			g.drawImage(image.getSubimage(subImageBounds.x, subImageBounds.y, subImageBounds.width, subImageBounds.height), 0, 0, null);
			System.out.println("else is running");
		}
		g.dispose();
		ImageIO.write(subImage, formatName, subImageFile);
		URLUploadImage.run(path, addr, port, username, password, local);
	}

	/**
	 * 鍥剧墖缂╂斁瑁佸壀
	 * 
	 * @param srcImageFile
	 *            鍘熷浘淇濆瓨璺緞
	 * @param descDir
	 *            鐩爣鍥句繚瀛樿矾寰�
	 * @param width
	 *            缂╂斁鍚庡浘鐗囧搴�
	 * @param height
	 *            缂╂斁鍚庡浘鐗囬珮搴�
	 * @param rect
	 *            瑁佸壀鐭╁舰妗�
	 * @throws Exception
	 */
	public static void cut(String srcImageFile, String descDir, int width, int height, Rectangle rect, String path, String addr, int port, String username, String password,
			String local) throws Exception {
		Image image = javax.imageio.ImageIO.read(new File(srcImageFile));
		BufferedImage bImage = makeThumbnail(image, width, height);

		saveSubImage(bImage, rect, new File(descDir), path, addr, port, username, password, local);
	}

	public static void cut(File srcImageFile, File descDir, int width, int height, Rectangle rect, String path, String addr, int port, String username, String password,
			String local) throws Exception {
		Image image = javax.imageio.ImageIO.read(srcImageFile);
		BufferedImage bImage = makeThumbnail(image, width, height);

		saveSubImage(bImage, rect, descDir, path, addr, port, username, password, local);
	}
}
