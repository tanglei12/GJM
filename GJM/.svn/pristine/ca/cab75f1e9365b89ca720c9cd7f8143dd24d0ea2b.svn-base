package com.gjp.test;

import java.util.ArrayList;
import java.util.List;

public class TestOOMObject {
	static class OOMOBject{
		public byte[] placeholider = new byte[64 * 1024];
	}
	
	public static void fillHeap(int num) throws InterruptedException{
		List<OOMOBject> list = new ArrayList<OOMOBject>();
		for (int i = 0; i < num; i++) {
			//稍作延时，令监视曲线的变化更加明显
			Thread.sleep(50);
			list.add(new OOMOBject());
		}
		System.gc();
	}
	
	public static void main(String[] args) throws InterruptedException {
		fillHeap(1000);
	}
}
