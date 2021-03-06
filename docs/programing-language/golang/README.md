# go 入门介绍

- Go 是一个开源的编程语言，它能让构造简单、可靠且高效的软件变得容易。
- Go 是从 2007 年末由 Robert Griesemer, Rob Pike, Ken Thompson 主持开发，后来还加入了 Ian Lance Taylor, Russ Cox 等人，并最终于 2009 年 11 月开源，在 2012 年早些时候发布了 Go 1 稳定版本。现在 Go 的开发已经是完全开放的，并且拥有一个活跃的社区。
- 计算机软件经历了这么多年的发展，形成了多种学术流派，有面向过程编程、面向对象编程、函数式编程、面向消息编程等，这些思想究竟孰优孰劣，众说纷纭。除了 OOP 外，近年出现了一些小众的编程哲学，Go 语言对这些思想亦有所吸收。例如，Go 语言接受了函数式编程的一些想法，支持匿名函数与闭包。再如，Go 语言接受了以 Erlang 语言为代表的面向消息编程思想，支持 goroutine 和通道，并推荐使用消息而不是共享内存来进行并发编程。总体来说，Go 语言是一个非常现代化的语言，精小但非常强大。

- 参考介绍 https://www.w3cschool.cn/go/
- 参考介绍 http://www.runoob.com/go/go-tutorial.html
- 社区论坛 https://www.golangtc.com/ ，https://studygolang.com/ ，https://gocn.vip
- [github 资源集合](https://github.com/avelino/awesome-go)

## 是什么

- Go 语言是谷歌 2009 年发布的第二款开源编程语言,它专门针对多处理器系统应用程序的编程进行了优化，它是一种系统语言其非常有用和强大,其程序可以媲美 C 或 C++代码的速度，而且更加安全、支持并行进程。
- Go 支持面向对象，而且具有真正的闭包(closures)和反射 (reflection)等功能。
- Go 可以在不损失应用程序性能的情况下降低代码的复杂性。

## 目标用途

- Go 语言被设计成一门应用于搭载 Web 服务器，存储集群或类似用途的巨型中央服务器的系统编程语言。
- Go 的目标是希望提升现有编程语言对程序库等依赖性(dependency)的管理，这些软件元素会被应用程序反复调用。由于存在并行编程模式，因此这一语言也被设计用来解决多处理器的任务。
- 对于高性能分布式系统领域而言，Go 语言无疑比大多数其它语言有着更高的开发效率。它提供了海量并行的支持，这对于游戏服务端的开发而言是再好不过了。

## 为什么要用它

- 可直接编译成机器码，不依赖其他库，glibc 的版本有一定要求，部署就是扔一个文件上去就完成了。
- 静态类型语言，但是有动态语言的感觉，静态类型的语言就是可以在编译的时候检查出来隐藏的大多数问题，动态语言的感觉就是有很多的包可以使用，写起来的效率很高。
- 语言层面支持并发，这个就是 Go 最大的特色，天生的支持并发，Go 就是基因里面支持的并发，可以充分的利用多核，很容易的使用并发。
- 内置 runtime，支持垃圾回收，这属于动态语言的特性之一吧，虽然目前来说 GC 不算完美，但是足以应付我们所能遇到的大多数情况，特别是 Go1.1 之后的 GC。
  简单易学，Go 语言的作者都有 C 的基因，那么 Go 自然而然就有了 C 的基因，那么 Go 关键字是 25 个，但是表达能力很强大，几乎支持大多数你在其他语言见过的特性：继承、重载、对象等。
- 丰富的标准库，Go 目前已经内置了大量的库，特别是网络库非常强大
- 内置强大的工具，Go 语言里面内置了很多工具链，最好的应该是 gofmt 工具，自动化格式化代码，能够让团队 review 变得如此的简单，代码格式一模一样，想不一样都很困难。
- 跨平台编译，如果你写的 Go 代码不包含 cgo，那么就可以做到 window 系统编译 linux 的应用，如何做到的呢？Go 引用了 plan9 的代码，这就是不依赖系统的信息。
- 内嵌 C 支持，前面说了作者是 C 的作者，所以 Go 里面也可以直接包含 c 代码，利用现有的丰富的 C 库。

## 下载安装

- https://studygolang.com/dl
- 编辑器使用[VS Code](https://code.visualstudio.com/)，安装 go 插件

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

- 以上代码新建 hello.go 文件，运行命令`go run hello.go`，控制台输出`Hello, World!`

## 常用工具

- 安装方式`go get -u -v github.com/go-delve/delve/cmd/dlv`
- 安装过程大概就是下载地址对应源码，并编译工具包后放到`C:\Users\{你的用户名}\go\bin`文件夹，所以如果网络不佳，可以自己下载源码执行地址对应的`main.go`文件，拷贝 exe 文件到 bin 目录

|    工具名    |                 地址                 |                                  简介                                   |
| :----------: | :----------------------------------: | :---------------------------------------------------------------------: |
|    gocode    |      github.com/mdempsky/gocode      |                        go 语言代码检查，自动补全                        |
|    gopkgs    | github.com/uudashr/gopkgs/cmd/gopkgs |                          快速列出可用包的工具                           |
|  go-outline  |  github.com/ramya-rao-a/go-outline   |             用于在 Go 源文件中提取 JSON 形式声明的简单工具              |
|  go-symbols  |     github.com/acroca/go-symbols     |               从 go 源码树中提取 JSON 形式的包符号的工具                |
|     guru     |     golang.org/x/tools/cmd/guru      |                   go 语言源代码有关工具，如代码高亮等                   |
|   gorename   |   golang.org/x/tools/cmd/gorename    |              在 Go 源代码中执行标识符的精确类型安全重命名               |
|     dlv      |  github.com/go-delve/delve/cmd/dlv   |                             go 语言调试工具                             |
| gocode-gomod |     github.com/stamblerre/gocode     |                      Go 编程语言的自动完成守护程序                      |
|    godef     |      github.com/rogpeppe/godef       |                       go 语言代码定义和引用的跳转                       |
|  goreturns   |       github.com/sqs/goreturns       | 类似 fmt 和 import 的工具，使用零值填充 Go 返回语句以匹配 func 返回类型 |
|    golint    |       golang.org/x/lint/golint       |                           go 语言代码规范检查                           |
|  gotour.exe  |                                      |                            go 语言指南网页版                            |

## 调试

- 调试需要用到上面列出的 dlv 工具，执行`go get -u -v github.com/go-delve/delve/cmd/dlv`命令即可安装调试工具
- 安装之后，在 VS Code 编辑器按`F5`，稍等片刻即可进入调试
  ![ ](http://img.mukewang.com/5c812feb00019ac012120456.png)

## 构建发布

- `go build hello.go`，得到 hello.exe 文件，使用的时候直接双击就搞定，如果是做成服务，添加开机启动命令，执行 hello.exe 即可
  ![ ](http://img.mukewang.com/5c81378c0001111006640431.png)

## 总结

- 尽管go的语法比不上java、C#，但也因为它的简洁、部署方便、解决c/c++开发效率低的问题，但是运行效率并不低
- 现在谷歌云已支持go语言，尽管有谷歌背景，但谷歌云函数并不是第一个支持这种语言的PaaS。谷歌发现Go非常适合云函数，因为其函数的冷启动速度非常快，这与PaaS实现结合效果非常好
- 掌握了基础知识，调试技巧，通过简单的编码，便可能实现性能不低的框架，并且go有着丰富的库可供调用。选择大于努力，可能用go才是你需要的呢