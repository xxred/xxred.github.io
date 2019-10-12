# UDP 协议简单了解及应用

- udp 是 User Datagram Protocol 的简称，意思是用户数据报协议。这是一种无连接的传输协议，在 OSI（Open System Interconnect，开放系统互联）参考模型的传输层，提供简单不可靠信息传送服务。udp 为应用程序提供无需建立连接就可以发送封装的 IP 数据报的方法，只管发送，甭管对方是否收到，它在 IP 报文的协议号是 17，正式规范是[IETF RFC 768](https://tools.ietf.org/html/rfc768)
- UDP 报文没有可靠性保证，不确保数据顺序和流量控制，有数据直接发送，无连接无状态，所以限制少延迟小速度快传输效率高，适合快速发送少量数据，可靠性要求不高的应用。在接收端，udp 把每个消息段放在队列，应用程序每次从队列中读一个消息段。udp 虽然能检测错误，但不校正，只是简单扔掉损坏消息段或者给程序提供警告信息
- 基于以上特点，udp 是一个理想的消息分发协议，在网络好的环境中，比如同一个网络的主机之间通信，或者同一主机的多个应用，在网络差的环境中，丢包严重，而一些恶劣的检测场景下，实时抗干扰等要求高，udp 能达到较高通信速率。常用的场景有：聊天室，投屏信息显示，音频视频等多媒体传输。不要求传输完整而是要求传输速率，即使有损坏也不影响

## 实践操作

- 光说不练假把式，下面我们用 C#代码实现一下接收 udp 消息的服务端，直观感受一下
- 祭出文档，使用 UDP 服务 https://docs.microsoft.com/zh-cn/dotnet/framework/network-programming/using-udp-services
- 最现成的就是使用`UdpClient`，可发送和接收消息

### 发送端

- 发送的代码比较简单

```csharp
using System;
using System.Net;
using System.Net.Sockets;
using System.Text;

namespace UdpSender
{
    class Program
    {
        static void Main(string[] args)
        {
            Socket s = new Socket(AddressFamily.InterNetwork, SocketType.Dgram, ProtocolType.Udp);

            IPAddress broadcast = IPAddress.Loopback;

            IPEndPoint ep = new IPEndPoint(broadcast, 514);

            Console.WriteLine("请输入要发送的内容：");

            while (true)
            {
                byte[] sendbuf = Encoding.UTF8.GetBytes(Console.ReadLine());

                s.SendTo(sendbuf, ep);
            }
        }
    }
}
```

### 接收端

- 接收端同样简单，接收方法是一个同步方法，会一直等到接收到消息才继续执行

```csharp
using System;
using System.Net;
using System.Net.Sockets;
using System.Text;

namespace Udp
{
    class Program
    {
        static void Main(string[] args)
        {
            var port = 514;
            var server =
                new UdpClient(port);
                // new SocketReceiver(port);
            var remoteEP = new IPEndPoint(IPAddress.Broadcast, port);

            try
            {
                while (true)
                {
                    Console.WriteLine("等待广播");
                    var bytes = server.Receive(ref remoteEP);
                    var msg = Encoding.UTF8.GetString(bytes);

                    Console.WriteLine($"接收来自 {remoteEP} 的广播:");
                    Console.WriteLine($"{msg}");
                    Console.WriteLine();
                }
            }
            catch (SocketException e)
            {
                Console.WriteLine(e);
            }
            finally
            {
                server.Close();
            }
        }
    }
}
```

### 自定义接收

- 现在玩点不一样了，因为发送接收都比较简单，自己写代码接收，加深理解，发送端代码同理
- 参考 UdpClient、Socket 的代码，抠出关键性代码，只需要三步即可
  1. 根据网络类型，socket 接收类型，协力类型获取一个句柄
  2. 在该句柄上绑定端口，监听消息
  3. 从句柄获取消息以及客户端地址信息

```csharp
using System;
using System.Net;
using System.Net.Sockets;
using System.Reflection;

namespace Udp
{
    public class SocketReceiver
    {
        private IntPtr _handle;

        public SocketReceiver() : this(AddressFamily.InterNetwork, SocketType.Dgram, ProtocolType.Udp)
        {

        }

        public SocketReceiver(int port) : this(AddressFamily.InterNetwork, SocketType.Dgram, ProtocolType.Udp)
        {
            var localEP = new IPEndPoint(IPAddress.Any, port);
            Bind(localEP);
        }

        public SocketReceiver(AddressFamily addressFamily, SocketType socketType, ProtocolType protocolType)
        {
            Dns.GetHostName(); // 初始化必须
            _handle = Interop.Winsock.WSASocketW(addressFamily, socketType, protocolType, IntPtr.Zero, 0u, SocketConstructorFlags.WSA_FLAG_OVERLAPPED);
        }

        public void Bind(EndPoint localEP)
        {
            var remoteEP = localEP;
            var socketAddress = remoteEP.Serialize();

            var buffer = socketAddress.GetValue("Buffer") as byte[];

            var socketError = Interop.Winsock.bind(_handle, buffer, socketAddress.Size);
        }

        public unsafe byte[] Receive(ref IPEndPoint remoteEP)
        {
            var socketAddress = remoteEP.Serialize();
            var socketAddressBuffer = socketAddress.GetValue("Buffer") as byte[];
            var socketAddressSize = socketAddress.Size;
            var maxSize = 0x10000;
            var buffer = new byte[maxSize];
            var received = 0;

            fixed (byte* pinnedBuffer = &buffer[0])
            {
                received = Interop.Winsock.recvfrom(_handle, pinnedBuffer, maxSize, SocketFlags.None,
                    socketAddressBuffer, ref socketAddressSize);
            }

            socketAddress.SetValue("Buffer", socketAddressBuffer);
            socketAddress.SetValue("InternalSize", socketAddressSize);

            remoteEP = remoteEP.Create(socketAddress) as IPEndPoint;

            // 不返回全部长度，只返回全部接受长度
            if (received < maxSize)
            {
                byte[] newBuffer = new byte[received];
                Buffer.BlockCopy(buffer, 0, newBuffer, 0, received);
                return newBuffer;
            }

            return buffer;
        }

        public void Close()
        {
            GC.SuppressFinalize(this);
        }
    }

    public static class ReflectionHelper
    {
        public static object GetValue(this object obj, string name)
        {
            var value = obj.GetType().InvokeMember(name,
                BindingFlags.Instance | BindingFlags.GetField |BindingFlags.NonPublic,
                null, obj, null);

            return value;
        }

        public static void SetValue(this object obj, string name, object value)
        {
            obj.GetType().InvokeMember(name,
                BindingFlags.Instance | BindingFlags.SetField | BindingFlags.NonPublic,
                null, obj, new[] { value });
        }
    }

    internal static class Interop
    {
        internal static class Winsock
        {
            /// <summary>
            /// 绑定端口
            /// </summary>
            /// <param name="socketHandle"></param>
            /// <param name="socketAddress"></param>
            /// <param name="socketAddressSize"></param>
            /// <returns></returns>
            [DllImport("ws2_32.dll", SetLastError = true)]
            internal static extern SocketError bind([In] IntPtr socketHandle, [In] byte[] socketAddress, [In] int socketAddressSize);

            /// <summary>
            /// 接收
            /// </summary>
            /// <param name="socketHandle"></param>
            /// <param name="pinnedBuffer"></param>
            /// <param name="len"></param>
            /// <param name="socketFlags"></param>
            /// <param name="socketAddress"></param>
            /// <param name="socketAddressSize"></param>
            /// <returns></returns>
            [DllImport("ws2_32.dll", SetLastError = true)]
            internal unsafe static extern int recvfrom([In] IntPtr socketHandle, [In] byte* pinnedBuffer, [In] int len, [In] SocketFlags socketFlags, [Out] byte[] socketAddress, [In] [Out] ref int socketAddressSize);

            /// <summary>
            /// 申请
            /// </summary>
            /// <param name="addressFamily"></param>
            /// <param name="socketType"></param>
            /// <param name="protocolType"></param>
            /// <param name="protocolInfo"></param>
            /// <param name="group"></param>
            /// <param name="flags"></param>
            /// <returns></returns>
            [DllImport("ws2_32.dll", CharSet = CharSet.Unicode, SetLastError = true)]
            internal static extern IntPtr WSASocketW([In] AddressFamily addressFamily, [In] SocketType socketType, [In] ProtocolType protocolType, [In] IntPtr protocolInfo, [In] uint group, [In] SocketConstructorFlags flags);
        }
    }

    [Flags]
    internal enum SocketConstructorFlags
    {
        WSA_FLAG_OVERLAPPED = 0x1,
        WSA_FLAG_MULTIPOINT_C_ROOT = 0x2,
        WSA_FLAG_MULTIPOINT_C_LEAF = 0x4,
        WSA_FLAG_MULTIPOINT_D_ROOT = 0x8,
        WSA_FLAG_MULTIPOINT_D_LEAF = 0x10
    }
}
```

- 注意上面自定义的接收代码包含不安全代码，需要在项目文件设置一下

```xml
  <PropertyGroup>
    <AllowUnsafeBlocks>true</AllowUnsafeBlocks>
  </PropertyGroup>
```

## 总结

- 上面自定义代码比较长，经过手动实践，收获还是不少的。比如：
  - P/Invoke 操作调用系统 api，还有句柄类型 IntPtr 的理解
  - 网络地址的知识，比如发送地址是`192.168.1.255`则是广播消息到网络段`192.168.1`的所有主机
  - SocketAddress 套接字地址，不依赖于具体协议，不论是 IPV4 还是 IPV6 都可以表示
  - 反射操作，反射获取或者设置值，Type.InvokeMember 方法加上 BindingFlags 可描述想要的反射操作
  - 指针操作，获取 buffer 的内存地址
- 具体调试的时候发现，服务端绑定监听端口之后，还没开始接收数据，客户端先发数据，服务端后续仍然收到所有数据，这可直观感受，消息到达后，存放于缓冲区队列，等待程序获取。这一点可有注意于理解`NetworkStream`网络流，可将接收改为异步+回调的方式接收消息该流的读取操作，实际就是从系统缓冲区读取数据。其中还请教了大神，UDP 数据缓冲区数据满了之后就会有数据丢失的情况，这是因为 udp 没有流量控制，而 TCP 则不会丢失。其它缓冲区满的情况还要继续摸索，不过相关参数还是可以调节的，比如缓冲区大小、TCP 的客户端连接数等
- 从最简单的 udp 协议开始了解网络通信，再逐渐延伸到流量控制、可靠性保证、安全性等方面，各个概念就会相对容易理解，所以 udp 应该是个很不错的切入点
