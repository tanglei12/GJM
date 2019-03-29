package com.gjp.test;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.junit.Test;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Fganji {

    private Integer indexs = 0;
    private String name = "";

    List<String> list = new ArrayList<String>();

    @Test
    public void run() {
        try {
            for (int i = 1; i < 2; i++) {
                System.out.println("http://cq.ganji.com/fang1/o" + i + "");
                Document doc = Jsoup.connect("http://cq.ganji.com/fang1/pn" + i + "").get();
                Elements links = doc.select("div.listBox");
                for (Element e : links) {
                    Elements elements = e.select("ul");
                    for (Element elementf : elements) {
                        Elements elementL = elementf.select("li");
                        for (Element element : elementL) {
                            String contet = element.select("div.info-title").select("a").attr("title") + ";" + element.select("div.info-title").select("a").attr("href");
                            System.out.println(contet);
                            list.add(contet);
                        }
                        //Document docHouse = Jsoup.connect(element.select("a").attr("href")).timeout(5000).get();
                    }
                }
                Thread.sleep(10000);
            }
            System.out.println(list.size());
            urlContent();


        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (IOException e1) {
            e1.printStackTrace();
        }
    }

    public void urlContent() {
        for (int i = indexs; i < list.size(); i++) {
            String[] strTable = list.get(i).split(";");
            try {
                name = strTable[0];
                System.out.println(name);
                String url = "";
                if (strTable[1].indexOf("http://") < 0) {
                    url = "http://cq.ganji.com/" + strTable[1];
                } else {
                    url = strTable[1];
                }
                System.out.println(url);
                Document docHouse = Jsoup.connect(url).timeout(5000).get();

                Elements linksImage = docHouse.select("div.basic-imgs-box").select("ul.clearfix").select("li");
                if (!linksImage.isEmpty()) {
                    if (!linksImage.get(0).toString().equals("")) {
                        for (Element element : linksImage) {
                            System.out.println(element.select("img").attr("src"));
                        }
                    }
                }

                Elements linksHouse = docHouse.select("div.basic-info").select("ul.basic-info-ul").select("li.clearfix");
                Boolean bool = false;
                for (Element element : linksHouse) {
                    System.out.println(element.text());
                }

                Elements linksUser = docHouse.select("div.basic-info-contact").select("div.clearfix");
                for (Element element : linksUser) {
                    System.out.println(element.select("span.contact-col").text());
                    if (element.select("span.contact-col").text().indexOf("联系方式：") > 1) {
                        bool = true;
                    }
                    if (element.select("span.contact-col").text().equals("")) {
                        System.out.println(element.select("span.contact-col").select("img").attr("src"));
                    }
                }

                if (bool.equals(true)) {
                    break;
                }

                //Thread.sleep(5000);
            } catch (IOException e) {
                System.out.println("=============================错误" + i);
                indexs = i;
                urlContent();
                break;
            } /*catch (InterruptedException e) {
                    e.printStackTrace();
				}*/
        }
    }
}
