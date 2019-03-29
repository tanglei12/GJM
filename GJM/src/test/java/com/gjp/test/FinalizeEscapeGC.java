package com.gjp.test;

public class FinalizeEscapeGC {
	public static FinalizeEscapeGC SAVE_HOOK = null;
	
	public void isAlive(){
		System.out.println("yes, i am still alive :)");
	}
	
	protected void finalise() throws Throwable{
		super.finalize();
		System.out.println("finalise mehtod executed");
		FinalizeEscapeGC.SAVE_HOOK = this;
	}
	
	public static void main(String[] args) throws Throwable {
		SAVE_HOOK = new FinalizeEscapeGC();
		
		//对象成功一次拯救自己
		SAVE_HOOK = null;
		System.gc();
		// 因为finalise方法优先级很低，所以展厅0.5秒以等待它
		Thread.sleep(500);
		
		if(SAVE_HOOK != null){
			SAVE_HOOK.isAlive();
		}else{
			System.out.println("no, i am dead :(");
		}
		
		//下面这段代码与上面完全相同，但是这次自救确失败了
		SAVE_HOOK = null;
		System.gc();
		// 因为finalise方法优先级很低，所以展厅0.5秒以等待它
		Thread.sleep(500);
		
		if(SAVE_HOOK != null){
			SAVE_HOOK.isAlive();
		}else{
			System.out.println("no, i am dead :(");
		}
		
	}
}
