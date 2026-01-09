# Z5 POC Readme

[TOC]

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
> - [ ]  Essential
> - [x]  Pro(Recommended for demo account use)
> - [ ]  Enterprise
> - [x]  Z5

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

### 人员滞留检测功能

> **功能说明**: 通过开启人员滞留报警功能，可以在关门后以及开车过程中，检测是否有人员在货厢内。如果检测到有人员滞留货厢内，会进行报警并上传平台。
>
> * FT 平台端：目前Z5的人员滞留检测报警，使用的是前BSD的报警通道 `Blind Zone Detection (Front)`。需要在平台端配置开启前BSD报警功能。
>   ![Blind Zone Detection (Front)](https://cdn.jsdelivr.net/gh/maozuxiao/Steamax_IMG/image-20260107103559325.png)
> * 设备端：打开【Config】-【Alarm】-【Base】-【Cargo box alarm】界面。勾选【Personnel Detention Alarm】使能开关，开启人员滞留检测报警，不勾选则关闭人员滞留检测报警
>   ![Cargo box alarm](https://cdn.jsdelivr.net/gh/maozuxiao/Steamax_IMG/image-20260107103311602.png)

### 特殊车型的安装

> #### Background
>
> During the Z5 POC process, it was discovered that the traditional installation method could not install solar panels on the customer's vehicle. Emrys and me talk with the BU and get the below solution.
>
> #### Solution
>
> After communicating with the BU, the solution was confirmed to be to install the solar panel on the left side of the rear door of the truck's cargo box, as shown in the figure below.
>
> ![Z5 installation](https://cdn.jsdelivr.net/gh/maozuxiao/Steamax_IMG/cm1749621199_1821_4e12aa2546579a22f9dea0e2c39f466d721a5f4a_6.html_att4.png)
>
> #### To-Do Items
>
> - The following materials need to be requested @A ral Ekrem Uzun 
>
> | Material Use                                                 | Part Number   | Description                                                  | Quantity                                                     |
> | ------------------------------------------------------------ | ------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
> | Extension cable for Z5 and ABS power boxes, used for remote installation (e.g., when the ABS power box is installed on the rear door or roof). Unless there are special requirements or specific scenarios, standard back-to-back installation is recommended. | 1262010100136 | 6PIN waterproof plug and FAKRA signal extension cable -1.3M-Z5/One end 06T-JWPF-VSLE-D+FAKRA-C Blue waterproof female connector + 2*FAKRA-D; burgundy waterproof female connector on the other end, 06R-JWPF-VSLE-D +FAKRA-C; Blue waterproof male connector + 2*FAKRA-D; Burgundy waterproof male connector with flame-retardant corrugated tube / 1.3M / Neutral English label / Z5 / Universal / HL / MICN / MIVN / NA | Order according to Z5 quantity                               |
> | Used in multi-door sensor scenarios.                         | 5163020100001 | SP11G door magnetic sensor / V1.0 / Door magnetic sensor / SP11G / No label / No logo / With individual packaging / 0 / Universal / Non-virtual format / -40℃~80℃ | Order according to the number of car doors required by the customer |











