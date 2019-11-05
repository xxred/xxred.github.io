# .NET Core 跨平台 GUI 开发之 GTtkSharp 初级篇

- 本文作为初级篇，适合已经安装好.NET Core 环境以及 Gtk 环境，并具备了 C#开发基础知识，能跑一些简单的例子，希望更深入了解开发 GTK 程序的同学。本文主要内容包括 GTK 的深入介绍、界面布局、响应式编程等
- 参考 1：x11 gtk qt gnome kde 之间的区别和联系（最后有图） https://blog.csdn.net/lanmayi003/article/details/6584521
- 参考 2：x11 gtk qt gnome kde 之间的区别和联系（讲得很明白） https://blog.csdn.net/zhanglianpin/article/details/6441879
- 参考 3：GtkSharp 教程 https://www.mono-project.com/docs/gui/gtksharp/tutorials/

## GTK 来龙去脉

1. Linux 上的图形界面可有可无，有需要的话是可以安装的，作为一个软件安装到系统。比如常见的桌面环境有 KDE 和 GNOME，它们不仅是个窗口管理器，还提供了桌面、菜单等功能，。桌面管理器顾名思义了，没有它的话就不能打开多个窗口不能最大最小化没有边框等，所以希望整个系统只跑一个桌面程序的情况就可以不用安装窗口管理器。windows 用户按 https://zhidao.baidu.com/question/1372025356510156779.html 这个操作可以体验一下，请先好保存当前工作再操作
2. KDE 和 GNOME 分别基于 Qt 和 Gtk 实现。它们通过一种叫 X11 的协议来通信，不仅控制窗口最大最小化缩放和边框，还提供桌面、工具状态栏等
3. X11 可用于几乎所有已有的现代操作系统，基于客户端——服务器模型。跟常规理解不一样，此处从应用程序视角看：本地主机 X 显示程序提供显示服务，远端应用使用了该显示服务，所谓它是客户端。就像远程控制桌面一样，本地提供显示，远程服务器作为客户端。当它们都在同一主机，看起来就是一个整体。比如苹果电脑，X 协议集成在系统内核，所以性能好很多
4. 层次关系：linux 本身-->X 服务器<--通过 X 协议交谈-->窗口管理器-->X 应用程序。X 服务实现有 Xfree86、Xorg、Xnest 等，KDE 和 GNOME 属于 X 客户端。我们开发的桌面程序属于 X 客户端
5. 为了方便开发人员，将 X 协议封装，于是有了 XLib。类似于 windows 上的 关于通信功能的 ws2_32.dll，提供了访问系统功能的 api，比如监听端口和从系统缓冲区读取端口接收的数据。很多常用功能为了方便使用，于是有了 C 函数库 GLib，类似于 C#里面的 System 空间的很多函数，包括字符串处理、list 数据结构等。接着是 Gdk，结合 GLib，将 XLib 函数库封装得更友好，比如 C#中将 ws2_32.dll 一些功能封装成 UdpClient。再往上就是 Gtk 了，依赖于 Gdk，提供基础的工具包和 widget，是上层 GUI 派生的基础。类似于 NewLife 的 X 组件里面的 ApiClient 这种网络库，基于 UdpClient 等封装。Gtk 获得了面向对象特性和可扩展性之后，就是 Gtk+，翻译成 CSharp 就是 GtkSharp。类似于 X 组件，提供了很多功能和工具，提供给各个应用系统做业务。层次关系：x 协议-->XLib，GLib-->Gdk-->Gtk+

## 界面布局

- Gtk#有被称为容器对象的东西，用于指导窗口或其他容器内的布局和放置。此技术不同于使用 System.Windows.Forms 工具箱定位的常用方法。GTK#和 System.Windows.Forms 之间的主要区别在于：使用 GTK#的应用程序不使用绝对坐标或固定坐标来定位窗口小部件。使用 GTK 工具包的应用程序通过布局和包装容器对象为其接口创建正确的布局
- 目前，最常用的就是水平和垂直包装盒，即 HBox 和 VBox

### Box

- 对齐控件的首选方法。优点：与屏幕尺寸无关、更容易国际化
- 水平盒子（HBox）和垂直（VBox）盒子，对于 VBox，PackStart 将从顶部开始包装盒子，PackEnd 将从底部开始包装盒子。对于 HBox，PackStart 将从左到右打包盒子，PackEnd 将从右到左打包盒子。
- 使用如下，child 参数是要打包到框中的对象。expand 参数控制框是否填充分配给它的区域（true），否则缩小框使其恰好合适框中对象大小。fill 参数控制对象是否填满框，仅当 expand 为 true 时生效。比如日志文本框，缩放的时候，文本框跟随窗口大小变化

```csharp
box1.PackStart(Widget child, bool expand, bool fill, int padding);
```

- 创建函数如下，homogeneous 表示框中的每个对象是否具有相同的大小（即，HBox 中的宽度相同或 vBox 中的高度相同），等效于 Pack 方法中 expand 为 true。spacing 表示框中对象间距，而 padding 会在对象两侧都添加

```csharp
HBox hbox1 = new HBox(bool homogeneous, int  spacing);
```

- 参考：https://www.mono-project.com/docs/gui/gtksharp/widgets/packing-with-boxes/

### Table

- 除了使用 HBox 和 VBox 进行打包外，还可以使用 Table 对象进行打包。这个有点像 html 的 table，适合方方正正大小差不多的空间集合，比如计算器。
- Table 的声明如下，rows、columns 分别指要创建的行和列。homogeneous 为 true 表示所有的表框大小设置为大小最大那个控件，为 false 则各行和列的大小根据各行列中大小最大那个控件决定

```csharp
Table table1 = new Table(int rows, int columns, bool homogeneous);

// 假如创建2*2的表格
 0          1          2
0+----------+----------+
 |          |          |
1+----------+----------+
 |          |          |
2+----------+----------+
```

- 添加控件方式如下，leftAttach,rightAttach,topAttach,bottomAttachach 分别代表表中控件的左右上下边所在位置。例如，希望某个控件占据第一行两个格子，那么 leftAttach=0,rightAttach=2,topAttach=0,bottomAttachach=1。
- xOptions 和 yOptions 指定打包选项
  - Gtk.AttachOptions.Fill：如果表框大于窗口小部件，并且指定了 Fill，则窗口小部件将展开以使用所有可用空间
  - Gtk.AttachOptions.Shrink：如果为 Table 中控件分配了较少的空间，然后又请求了空间（通常是由用户调整窗口大小），则通常将窗口小部件推离窗口底部并消失。如果指定了 Shrink ，则小部件将随表格收缩
  - Gtk.AttachOptions.Expand：这将导致 Table 扩展以占用窗口中的所有剩余空间
- xPadding 和 yPadding 分别控制 Table 内控件在原位置基础上表框到控件的左右或者上下距离

```csharp
table1.Attach (        Widget            child,
                       int               leftAttach,
                       int               rightAttach,
                       int               topAttach,
                       int               bottomAttach,
                       Gtk.AttachOptions xOptions,
                       Gtk.AttachOptions yOptions,
                       int               xPadding,
                       int               yPadding );
```

- 参考：https://www.mono-project.com/docs/gui/gtksharp/widgets/packing-with-tables/

### 其它布局

- 固定容器 fixed，容器内控件相对于窗口左上角位置，并且位置可动态修改

```csharp
Fixed fixed1 = new Fixed();
fixed1.Put(widget, x, y);
fixed1.Move(widget, x, y);
```

- 布局容器 layout，实现了无限的滚动区域，适合动态加载很多空间的情况，比如相册

```csharp
Layout layout1 = new Layout(hadjustment, vadjustment);
layout1.Put(widget, x, y);
layout1.Move(widget, x, y);
```

- 框架 frame，类似于 winform 的 groupbox，框上有个标签。LabelXalign 和 LabelYalign 属性分别表示 Label 在框上的水平和垂直位置，范围是 0-1。LabelXalign 默认 0，标签位于左边，LabelYalign 未使用。ShadowType 属性决定外框样式 Gtk.Shadow.EtchedIn 为默认值

```csharp
Frame frame1 = new Frame("Label");
frame1.LabelXalign = 0.3;
frame1.ShadowType = ShadowType.Out;
```

## 响应式编程

- 本节介绍多线程 GTK＃编程以及如何保持 GTK＃应用程序的响应速度
- 和 winform 一样，更新 UI 应该由创建 UI 的线程来执行，否则可能会崩溃。可用 Gtk.Application.Invoke 来请求 GUI 线程完成更新

```csharp
using Gtk;

class Demo {
  static Label label;

  static void Main ()
  {
    Application.Init ();
    Window w = new Window ("Cray on a Window");
    label = new Label ("Busy computing");

    Thread thr = new Thread (new ThreadStart (ThreadRoutine));
    thr.Start ();
    Application.Run ();
  }

  static void ThreadRoutine ()
  {
        LargeComputation ();
        Gtk.Application.Invoke (delegate {
              label.Text = "Done";
        });
  }

  static void LargeComputation ()
  {
    // lots of processing here
  }
}
```

- 定时器 GLib.Timeout，类似 System.Windows.Forms.Timer。不同之处在于，GLib.Timeout 总是在拥有 Gtk 主循环的线程上被调用

```csharp
 void StartClock ()
     {
         // 每秒调用一次update_status

         GLib.Timeout.Add (1000, new GLib.TimeoutHandler (update_status));
     }

     bool update_status ()
     {
         time_label.Text = DateTime.Now.ToString ();

         // 返回true则在下一次超时时间到达后再次调用update_status
         // 返回false则终止定时器

         return true;
     }
```

## 最后

- 本文介绍了 Gtk 在整个 Linux 桌面开发所处位置、列举了几个布局容器、以及响应式编程。掌握以上知识，可大大提高编程效率，全部操作一遍即可理解并掌握
