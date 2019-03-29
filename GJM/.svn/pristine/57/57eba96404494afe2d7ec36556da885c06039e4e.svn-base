package com.gjp.test;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

public class ThreadTest {
	
  private static List<Integer> TEST_LIST = new ArrayList<Integer>();
  
  private static int indexs = 0;
	
	public static void main(String[] args) throws InterruptedException, ExecutionException {
		
		/**
		 * 有返回值线程
		 * */
		// 创建一个线程池
//        ExecutorService pool = Executors.newFixedThreadPool(2);
//		int i = 0;
//		Callable<Object> t = new MyThreadb(i);
//		Future<Object> f1 = pool.submit(t);
//		
//		System.out.println(f1.get().toString());
//		 // 关闭线程池
//        pool.shutdown();
		
		new Thread(new Runnable() {
            @Override
            public void run() {
            	for (int i = 0; i < 10; i++) {
            		if(i == 3){
            			try {
							Thread.sleep(1000);
						} catch (InterruptedException e) {
							e.printStackTrace();
						}
            		}
            		if(indexs == 10){
            			Thread.interrupted();
            		}else{
            			indexs += 1;
            			synchronized (TEST_LIST) {
                            TEST_LIST.add(indexs);
                        }
                		 System.out.println("Thread1 running");
            		}
				}
            }

        }).start();
		
		new Thread(new Runnable() {
            @Override
            public void run() {
            	for (int i = 0; i < 10; i++) {
            		if(i == 3){
            			try {
							Thread.sleep(1000);
						} catch (InterruptedException e) {
							e.printStackTrace();
						}
            		}
            		if(indexs == 10){
            			Thread.interrupted();
            		}else{
            			indexs += 1;
            			synchronized (TEST_LIST) {
                            TEST_LIST.add(indexs);
                        }
                		 System.out.println("Thread2 running");
            		}
				}
            }
        }).start();
		
		
		try {
		      // 等待全部子线程执行完毕
		      TimeUnit.SECONDS.sleep(5);
		    } catch (InterruptedException e) {
		      e.printStackTrace();
		    }
		
		System.out.println("===================");
		for (int i = 0; i < TEST_LIST.size(); i++) {
			System.out.println(TEST_LIST.get(i));
		}
	}
}

class MyThreadb implements Callable<Object>{
	int indexs;
	
	public MyThreadb(int indexs){
		this.indexs = indexs;
	}
	public Object call() throws Exception {
		for (int i = 1; i < 6; i++) {
			indexs +=1;
			if(i == 3){
				Thread.sleep(3000);
			}
		}
		return indexs;
    }
}