# 树莓派图像处理之摄像头安装+配置教程

- 本文简单讲讲树莓派如何安装摄像头，以及一些配置和简单使用
- 树莓派的主板上有一个专门为摄像头模块预留的接口：CSI(Camera Serial Interface)。注意 CSI 并不是树莓派特有的，而是 MIPI(移动产业处理器接口联盟)定义的一个接口，用于约束手机与摄像头连接和通信的规范

## 摄像头模块准备

- 我手里这款应该是官方发布的摄像头，拥有 500 万像素(最高分辨率 2592 像素 x1944 像素)的 CMOS 传感器，至少支持 30FPS 的 1080P 高清视频录制，连线是 15 针的软线，体积小巧，大约是 25mm x 24mm x 9mm，很轻，几克这样子
  ![ ](https://raw.githubusercontent.com/xxred/xxred.github.io/image/imgsIMG_20191128_232908.jpg)

## 安装

- 可参考视频教程以及下面的截图 https://www.bilibili.com/video/av22636134/
- 首先树莓派关机，找到那个 CSI 接口，安装分以下几步进行
  - 这个卡扣不同于贴着板子的那种可以掀开的，也不像内存条那种竖直的插槽自动卡位，这个 CSI 插槽的卡扣需要向上拔出，一定记得温柔，而且空间狭窄，手指不一定有空间，可用牙签之类慢慢挑
    ![ ](https://raw.githubusercontent.com/xxred/xxred.github.io/image/imgs20191129021415.png)
  - 卡扣松了之后，将排线插入，插至底部，注意排线方向，有金属触点的朝卡扣条对面
  - 扶着软排线，按下卡扣，确保线的金属边缘与插槽边缘平行
    ![ ](https://raw.githubusercontent.com/xxred/xxred.github.io/image/imgs20191129021542.png)

## 设置

- 安装完成之后，给树莓派上电，开始进行设置
- 首先是更新摄像头驱动，新版系统可能不用，但还是更新一下为好

```bash
sudo apt-get update
sudo apt-get upgrade
```

- 更新完之后，需要启用，有两种方式，设置完之后均需重启才能生效
  - 首先是命令行方式，执行`sudo raspi-config`打开配置，选择`Interfacing Options`，再找到`Camera`然后选择启用即可
    ![ ](https://raw.githubusercontent.com/xxred/xxred.github.io/image/imgs%E9%85%8D%E7%BD%AE1.png)
    ![ ](https://raw.githubusercontent.com/xxred/xxred.github.io/image/imgs%E9%85%8D%E7%BD%AE2.png)
    ![ ](https://raw.githubusercontent.com/xxred/xxred.github.io/image/imgs%E9%85%8D%E7%BD%AE3.png)
  - 第二种是直接 vnc 连接上去，点击树莓派图标->首选项->配置->接口->摄像头启用-ok 重启
    ![ ](https://raw.githubusercontent.com/xxred/xxred.github.io/image/imgsTIM%E5%9B%BE%E7%89%8720191127221308.png)
- 重启后查看设备是否成功挂载，`ls -l /dev/ | grep video`，看到 video0 表示成功挂载识别
  ![ ](https://raw.githubusercontent.com/xxred/xxred.github.io/image/imgsTIM%E5%9B%BE%E7%89%8720191127225236.png)

## 使用

### 画面捕捉

- 使用`raspistill`专用命令，此命令可能不适用于 usb 摄像头，那个需要安装使用`sudo apt-get install uvccapture`
- `raspistill`是集成在系统的，可以直接使用，运行`raspistill -o h.jpg`即可成功截图并保存输出，更多参数使用`raspistill --help | more`
  ![](https://raw.githubusercontent.com/xxred/xxred.github.io/image/imgsTIM%E5%9B%BE%E7%89%8720191127224049.png)

### 录制视频

- 执行`raspivid -o v.h264 -t 5000`，录制 5 秒长度的 1080p 视频，h264 是 MPEG4 之后的视频压缩格式，数据压缩比例高。桌面环境双击视频可直接播放，或者桌面环境执行`omxplayer v.h264`

## 最后

- 本文教程就到这里，通过网络采集树莓派视频流、以及如何控制摄像头，留到下篇讲
- 实践操作篇需要多多动手，体会每个细节，并且教程可能与各位实际软硬件略有不同
