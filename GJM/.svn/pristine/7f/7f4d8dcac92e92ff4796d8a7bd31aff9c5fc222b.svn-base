package com.gjp.test;

import com.gjp.util.ConnectAdslNet;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.TimerTask;

public class F58 extends TimerTask {

	private Integer page = 1;
	@SuppressWarnings("unused")
	private String title = "";

	private Integer indexs = 0;
	private String name = "";

	List<String> list = new ArrayList<>();

	@Test
	public void run() {
		try {
			for (int i = page; i < 70; i++) {
				System.out.println("http://cq.58.com/chuzu/pn" + i + "");
				page = i;
				Document doc = Jsoup.connect("http://cq.58.com/chuzu/pn" + i + "").timeout(5000).get();
				Elements links = doc.select("tbody");
				if (links.isEmpty()) {
					hideIP();
				}
				for (Element e : links) {
					Elements elements = e.select("tr").select("td.qj-rentd");
					for (Element element : elements) {
						title = element.select("td.qj-rentd").select("h1").select("a").text();
						String contet = element.select("td.qj-rentd").select("h1").select("a").text() + ";" + element.select("a").attr("href");
						System.out.println(contet);
						list.add(contet);
						// Document docHouse =
						// Jsoup.connect(element.select("a").attr("href")).timeout(5000).get();
					}
				}
				// Thread.sleep(10000);
			}
			System.out.println(list.size());
			urlContent();

		} catch (Exception e1) {
			// e1.printStackTrace();
			System.out.println("=============================错误" + page);
			run();
			// hideIP();
		}
	}

	public void urlContent() {
		for (int i = indexs; i < list.size(); i++) {
			String[] strTable = list.get(i).split(";");
			try {
				name = strTable[0];
				System.out.println(name);
				Document docHouse = Jsoup.connect(strTable[1]).timeout(5000).get();
				Elements linksHouse = docHouse.select("div.sumary").select("ul.suUl").select("li");
				if (linksHouse.isEmpty()) {
					hideIP();
				}
				Boolean bool = false;
				for (Element eHouse : linksHouse) {
					if (eHouse.select("div.su_tit").text().equals("")) {
						System.out.println("电话");
					} else {
						System.out.println(eHouse.select("div.su_tit").text());
					}
					if (eHouse.select("div.su_con").text().equals("")) {
						System.out.println(eHouse.select("span").text());
					} else {
						if (eHouse.select("div.su_con").text().equals("( 电话归属地：重庆  | 查看发帖记录 )") || eHouse.select("div.su_con").text().equals("( 电话归属地：  | 查看发帖记录 )")) {

							String imgStr = eHouse.select("span.c_e22").select("script").html();
							if (imgStr.equals("")) {
								imgStr = eHouse.select("span.red").select("script").html();
							}
							imgStr = imgStr.replaceAll("\"", "'").replaceAll(" ", "").replace("document.write('<imgsrc='", "").replace("'/>')", "");
							System.out.println(imgStr);
							bool = true;
						} else if (eHouse.select("div.su_con").text().indexOf("( 电话归属地：重庆  | 查看发帖记录 )") > 0) {
							System.out.println(eHouse.select("div.su_con").text().replace(" ", "").replaceAll(" ", "").substring(0, 10));
							bool = true;
						} else {
							System.out.println(eHouse.select("div.su_con").text().replaceAll("   看中了，一键搬家", ""));
						}
					}

					if (bool.equals(true)) {
						break;
					}

				}
				// Thread.sleep(5000);
			} catch (Exception e) {
				// 拨号一下
				System.out.println("=============================错误" + i);
				// hideIP();
				indexs = i;
				urlContent();
			}
		}
	}

	public void hideIP() throws Exception {
		ConnectAdslNet.connAdsl("宽带连接", "02362910843", "301158");
	}

}
