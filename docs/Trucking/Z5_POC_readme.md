# Z5 POC Readme

## Revision

| Date     | Version | Description |
| -------- | ------- | ----------- |
| 2026-1-5 | V1.0    | 新建文档    |



## Asset Download

**Download Link**:  https://wj.streamax.com:9443/outpublish.html?code=Bec8c7cd6075344eab9dda07a8938c79d&lang=zh-cn#view



| 文件名                          | 文件类型                             | 说明                                                         |
| ------------------------------- | ------------------------------------ | ------------------------------------------------------------ |
| BT-DOORSENSOR-4C-00-10.CRC      | Door magnetic sensor (Upgrade files) | 门磁版本                                                     |
| RMGPS_GOTOP_MTK_T20250521Z      | Positioning module (Upgrade files)   | GPS版本                                                      |
| Z5_B359_T260104.04_M0010        | MDVR (Upgrade files)                 | 主机版本(升级会更新MCU单片机版本)                            |
| BZ5-P01-GD32-MCU-T25103101.CRC  | Battery box chip (Upgrade files)     | 电池版本                                                     |
| BLE-P01-LE501-MCU-T25103101.CRC | Bluetooth chip (Upgrade files)       | 主机蓝牙版本                                                 |
| config                          | config file                          | 配置文件<br />**请注意修改上报服务器为**`eur-ftcloud.ifleetvision.com` |

## 服务器信息

- **Access URL**: https://eur-ftcloud.ifleetvision.com
- **Subscriber Name: evologdemo**
- **Username**: evologdemo
- **Password**: `Please contact Sean`
- **Expiration Date**: 2026-04
- **Port**: 21083
- **Domain name**: eur-ftcloud.ifleetvision.com

> [!NOTE]
>
> 申请测试账号时，需要选择Z5，示例如下
>
> 11. Please select the package for which you need authorization:*
>
> - [ ] Essential
> - [x] Pro （ Recommended for demo account use）
> - [ ] Enterprise
> - [x] Z5

## Tips

### 添加设备

> **路径**：<kbd>FT Vision</kbd> >> <kbd>Basic Data</kbd> >> <kbd>Vehicle</kbd> >> <kbd>Add</kbd>
>
> 在Device Information中的Device2[Cargo]中填写Z5的设备号即可
>
> ![Device2[Cargo]](https://cdn.jsdelivr.net/gh/maozuxiao/Steamax_IMG/image-20260107102344967.png)
>
> > [!NOTE]
> >
> > Device1无需填写

## 人员滞留检测功能

> **功能说明**: 通过开启人员滞留报警功能，可以在关门后以及开车过程中，检测是否有人员在货厢内。如果检测到有人员滞留货厢内，会进行报警并上传平台。
>
> * FT 平台端：目前Z5的人员滞留检测报警，使用的是前BSD的报警通道 `Blind Zone Detection (Front)`。需要在平台端配置开启前BSD报警功能。
>   ![Blind Zone Detection (Front)](https://cdn.jsdelivr.net/gh/maozuxiao/Steamax_IMG/image-20260107103559325.png)
> * 设备端：打开【Config】-【Alarm】-【Base】-【Cargo box alarm】界面。勾选【Personnel Detention Alarm】使能开关，开启人员滞留检测报警，不勾选则关闭人员滞留检测报警
>   ![Cargo box alarm](https://cdn.jsdelivr.net/gh/maozuxiao/Steamax_IMG/image-20260107103311602.png)











