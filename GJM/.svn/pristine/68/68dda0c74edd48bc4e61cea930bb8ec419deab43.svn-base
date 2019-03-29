package com.gjp.test;

import javapns.devices.Device;
import javapns.devices.implementations.basic.BasicDevice;
import javapns.notification.AppleNotificationServerBasicImpl;
import javapns.notification.PushNotificationManager;
import javapns.notification.PushNotificationPayload;
import javapns.notification.PushedNotification;

import java.util.ArrayList;
import java.util.List;

public class IosMessage {
	public static void main(String[] args) throws Exception    
    {    
        System.out.println("zsl==========开始推送消息");
        int badge = 1; // 图标小红圈的数值
        String sound = "default"; // 铃音
        String msgCertificatePassword = "LoveYouAgan001";//导出证书时设置的密码
        String deviceToken = "ed5c62497b09204ebc6a7bfb7747e01db5438285112dc42c94f1babd32092e91"; //手机设备token号
        String message = "test push message to ios device";

        List<String> tokens = new ArrayList<String>();
        tokens.add(deviceToken);

//      String certificatePath = requestRealPath
//              + "/WEB-INF/classes/certificate/msg.p12";
        //java必须要用导出p12文件  php的话是pem文件
        String certificatePath = "/home/chen/ERP.p12";
        boolean sendCount = true;

        PushNotificationPayload payload = new PushNotificationPayload();
        payload.addAlert(message); // 消息内容
        payload.addBadge(badge);


        //payload.addCustomAlertBody(msgEX);
        if (null == sound || "".equals(sound)) {
            payload.addSound(sound);
        }

        PushNotificationManager pushManager = new PushNotificationManager();
        // true：表示的是产品测试推送服务 false：表示的是产品发布推送服务
        pushManager.initializeConnection(new AppleNotificationServerBasicImpl(
                certificatePath, msgCertificatePassword, false));
        List<PushedNotification> notifications = new ArrayList<PushedNotification>();
        // 开始推送消息
        if (sendCount) {
            Device device = new BasicDevice();
            device.setToken(deviceToken);
            PushedNotification notification = pushManager.sendNotification(
                    device, payload, true);
            notifications.add(notification);
        } else {
            List<Device> devices = new ArrayList<Device>();
            for (String token : tokens) {
                devices.add(new BasicDevice(token));
            }
            notifications = pushManager.sendNotifications(payload, devices);
        }

        List<PushedNotification> failedNotification = PushedNotification
                .findFailedNotifications(notifications);
        List<PushedNotification> successfulNotification = PushedNotification
                .findSuccessfulNotifications(notifications);
        int failed = failedNotification.size();
        int successful = successfulNotification.size();
        System.out.println("zsl==========成功数：" + successful);
        System.out.println("zsl==========失败数：" + failed);
        pushManager.stopConnection();
        System.out.println("zsl==========消息推送完毕");
    }
}
