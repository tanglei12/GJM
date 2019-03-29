package com.gjp.test;

public class ThreadGC {

	/**
	 * 线程死循环演示
	 *
	 * @author chen
	 * @date Dec 29, 2016 6:24:25 PM
	 */
	public static void CreateBusyThread(){
		Thread thread = new Thread(new Runnable() {
			@Override
			public void run() {
				while(true)
					;
			}
		},"testBusyThread");
		thread.start();
	}
	
	/**
	 * 线程锁等待演示
	 *
	 * @param lock
	 * @author chen
	 * @date Dec 29, 2016 6:25:41 PM
	 */
	public static void createLockThread(final Object lock){
		Thread thread = new Thread(new Runnable() {
			@Override
			public void run() {
				synchronized (lock) {
					try {
						lock.wait();
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}
		},"testLockThread");
		thread.start();
	}
	
	static class SynAddRunalbe implements Runnable{
		int a,b;
		public SynAddRunalbe(int a, int b){
			this.a = a;
			this.b = b;
		}
		@Override
		public void run() {
			synchronized (Integer.valueOf(a)) {
				synchronized (Integer.valueOf(b)) {
					System.out.println(a+b);
				}
			}
		}
	}
	
	public static void main(String[] args) throws Exception {
//		BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(System.in));
//		bufferedReader.readLine();
//		CreateBusyThread();
//		bufferedReader.readLine();
//		Object obj = new Object();
//		createLockThread(obj);
		for (int i = 0; i < 100; i++) {
			new Thread(new SynAddRunalbe(1, 2)).start();
			new Thread(new SynAddRunalbe(2, 1)).start();
		}
	}
}
