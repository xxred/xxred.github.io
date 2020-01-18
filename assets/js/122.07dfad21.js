(window.webpackJsonp=window.webpackJsonp||[]).push([[122],{264:function(a,t,e){"use strict";e.r(t);var s=e(0),r=Object(s.a)({},function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[e("h1",{attrs:{id:"linux-通用常用命令"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#linux-通用常用命令","aria-hidden":"true"}},[a._v("#")]),a._v(" linux 通用常用命令")]),a._v(" "),e("h2",{attrs:{id:"设置-root-密码"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#设置-root-密码","aria-hidden":"true"}},[a._v("#")]),a._v(" 设置 root 密码")]),a._v(" "),e("table",[e("thead",[e("tr",[e("th",{staticStyle:{"text-align":"left"}},[a._v("ubuntu")]),a._v(" "),e("th",{staticStyle:{"text-align":"left"}},[a._v("centos")]),a._v(" "),e("th",{staticStyle:{"text-align":"left"}})])]),a._v(" "),e("tbody",[e("tr",[e("td",{staticStyle:{"text-align":"left"}},[a._v("sudo passwd")]),a._v(" "),e("td",{staticStyle:{"text-align":"left"}}),a._v(" "),e("td",{staticStyle:{"text-align":"left"}})])])]),a._v(" "),e("h2",{attrs:{id:"切换到-root"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#切换到-root","aria-hidden":"true"}},[a._v("#")]),a._v(" 切换到 root")]),a._v(" "),e("table",[e("thead",[e("tr",[e("th",{staticStyle:{"text-align":"left"}},[a._v("ubuntu")]),a._v(" "),e("th",{staticStyle:{"text-align":"left"}},[a._v("centos")]),a._v(" "),e("th",{staticStyle:{"text-align":"left"}})])]),a._v(" "),e("tbody",[e("tr",[e("td",{staticStyle:{"text-align":"left"}},[a._v("sudo su")]),a._v(" "),e("td",{staticStyle:{"text-align":"left"}}),a._v(" "),e("td",{staticStyle:{"text-align":"left"}})])])]),a._v(" "),e("ul",[e("li",[a._v("如果添加横杠"),e("code",[a._v("-")]),a._v("，即"),e("code",[a._v("su - username")]),a._v("，切换用户后会自动切换到该用户工作目录，并且加载相应的环境变量")])]),a._v(" "),e("h2",{attrs:{id:"删除"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#删除","aria-hidden":"true"}},[a._v("#")]),a._v(" 删除")]),a._v(" "),e("ul",[e("li",[a._v("此命令慎用")]),a._v(" "),e("li",[e("code",[a._v("-rf")]),a._v("后接文件或文件夹")])]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("rm")]),a._v(" -rf /opt/dotnet/sdk/1.0.4\n")])])]),e("h2",{attrs:{id:"软链接"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#软链接","aria-hidden":"true"}},[a._v("#")]),a._v(" 软链接")]),a._v(" "),e("h3",{attrs:{id:"创建"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#创建","aria-hidden":"true"}},[a._v("#")]),a._v(" 创建")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("ln")]),a._v(" -s /src /src-ln\n")])])]),e("h3",{attrs:{id:"删除软链接"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#删除软链接","aria-hidden":"true"}},[a._v("#")]),a._v(" 删除软链接")]),a._v(" "),e("ul",[e("li",[a._v("注意，"),e("code",[a._v("/src-ln/")]),a._v("多加个斜杠会把"),e("code",[a._v("/src")]),a._v("里面的内容也干掉")])]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("rm")]),a._v(" -rf /src-ln\n")])])]),e("h2",{attrs:{id:"查看系统位数"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#查看系统位数","aria-hidden":"true"}},[a._v("#")]),a._v(" 查看系统位数")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("getconf LONG_BIT\n")])])]),e("h2",{attrs:{id:"查看-cpu"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#查看-cpu","aria-hidden":"true"}},[a._v("#")]),a._v(" 查看 cpu")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[a._v("cat")]),a._v(" /proc/cpuinfo\n")])])]),e("h2",{attrs:{id:"查看进程、端口"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#查看进程、端口","aria-hidden":"true"}},[a._v("#")]),a._v(" 查看进程、端口")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[a._v("top")]),a._v("\n")])])]),e("ul",[e("li",[a._v("查看端口被那个程序占用，"),e("code",[a._v("netstat")]),a._v("命令用法：https://www.runoob.com/linux/linux-comm-netstat.html")])]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("netstat")]),a._v(" -anp"),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("|")]),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("grep")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("80")]),a._v("\n")])])]),e("ul",[e("li",[a._v("拿到占用端口的进程 pid，查看详细信息。其中 cmdline 查看启动当前进程完整命令，cwd 表示进程运行所在目录，exe 只是可执行文件")])]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("ls")]),a._v(" -al /proc/3854\n\n"),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("more")]),a._v(" /proc/3854/cmdline "),e("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 查看启动当前进程完整命令")]),a._v("\n")])])]),e("h2",{attrs:{id:"查看内存"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#查看内存","aria-hidden":"true"}},[a._v("#")]),a._v(" 查看内存")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[a._v("free")]),a._v(" -h\n")])])]),e("h2",{attrs:{id:"查看磁盘使用情况"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#查看磁盘使用情况","aria-hidden":"true"}},[a._v("#")]),a._v(" 查看磁盘使用情况")]),a._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"https://blog.csdn.net/achenyuan/article/details/78674102",target:"_blank",rel:"noopener noreferrer"}},[a._v("linux查看磁盘使用情况命令"),e("OutboundLink")],1)]),a._v(" "),e("li",[a._v("统计磁盘使用："),e("code",[a._v("df -h")])]),a._v(" "),e("li",[a._v("统计指定目录大小："),e("code",[a._v("du -h -d 1 /usr/")])])]),a._v(" "),e("h2",{attrs:{id:"环境变量"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#环境变量","aria-hidden":"true"}},[a._v("#")]),a._v(" 环境变量")]),a._v(" "),e("ul",[e("li",[a._v("比如添加环境变量："),e("code",[a._v("export DOCKER_HOST=tcp://127.0.0.1:2375")])]),a._v(" "),e("li",[a._v("持久化： 执行"),e("code",[a._v("vi ~/.bashrc")]),a._v("编辑此文件，末尾处添加"),e("code",[a._v("export DOCKER_HOST=tcp://127.0.0.1:2375")]),a._v("，然后重启即可生效或者执行"),e("code",[a._v("source ~/.bashrc")]),a._v("立刻生效")]),a._v(" "),e("li",[a._v("将某目录添加到Path环境变量的四种方法：https://www.cnblogs.com/joshua317/p/6899057.html")]),a._v(" "),e("li",[a._v("简便的命令：")])]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 添加")]),a._v("\n"),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("cat")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<<")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("EOF "),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">>")]),a._v(" ~/.bash_profile\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# Add .NET Core SDK tools")]),a._v("\n"),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("export")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e("span",{pre:!0,attrs:{class:"token environment constant"}},[a._v("PATH")])]),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),e("span",{pre:!0,attrs:{class:"token string"}},[a._v('"'),e("span",{pre:!0,attrs:{class:"token environment constant"}},[a._v("$PATH")]),a._v(':/home/xxred/.dotnet/tools"')]),a._v("\nEOF\n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 生效")]),a._v("\n"),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("source")]),a._v(" ~/.bash_profile\n")])])]),e("h2",{attrs:{id:"文件权限"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#文件权限","aria-hidden":"true"}},[a._v("#")]),a._v(" 文件权限")]),a._v(" "),e("ul",[e("li",[e("code",[a._v("sudo chown -R username dirname")])]),a._v(" "),e("li",[a._v("修改文件夹所属用户")])]),a._v(" "),e("h2",{attrs:{id:"查看系统版本"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#查看系统版本","aria-hidden":"true"}},[a._v("#")]),a._v(" 查看系统版本")]),a._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"https://jingyan.baidu.com/article/7908e85c725159af481ad2f7.html",target:"_blank",rel:"noopener noreferrer"}},[a._v("https://jingyan.baidu.com/article/7908e85c725159af481ad2f7.html"),e("OutboundLink")],1)]),a._v(" "),e("li",[a._v('输入"uname -a ",可显示电脑以及操作系统的相关信息')]),a._v(" "),e("li",[a._v('输入"cat /proc/version",说明正在运行的内核版本')]),a._v(" "),e("li",[a._v('输入"cat /etc/issue", 显示的是发行版本信息')]),a._v(" "),e("li",[a._v("sb_release -a (适用于所有的 linux，包括 Redhat、SuSE、Debian 等发行版，但是在 debian 下要安装 lsb)")])]),a._v(" "),e("h2",{attrs:{id:"日志"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#日志","aria-hidden":"true"}},[a._v("#")]),a._v(" 日志")]),a._v(" "),e("ul",[e("li",[a._v("位于"),e("code",[a._v("/var/log/journal/")])]),a._v(" "),e("li",[a._v("journalctl 工具查看日志，"),e("code",[a._v("sudo journalctl")]),a._v("。查看特定服务日志及指定时间，"),e("code",[a._v('sudo journalctl -fu service_name --since "2019-05-06" --until "2019-05-07 04:00"')])]),a._v(" "),e("li",[a._v("配置文件在"),e("code",[a._v("/etc/systemd/journald.conf")])]),a._v(" "),e("li",[a._v("只保留 500M"),e("code",[a._v("journalctl --vacuum-size=500M")])]),a._v(" "),e("li",[a._v("清理链接：https://unix.stackexchange.com/questions/139513/how-to-clear-journalctl/194058#194058")]),a._v(" "),e("li",[a._v("大量写日志，肯定是某些服务导致的，否则系统不会无缘无故大量写日志")])]),a._v(" "),e("h2",{attrs:{id:"文件和文件夹"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#文件和文件夹","aria-hidden":"true"}},[a._v("#")]),a._v(" 文件和文件夹")]),a._v(" "),e("h3",{attrs:{id:"查看占用大小"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#查看占用大小","aria-hidden":"true"}},[a._v("#")]),a._v(" 查看占用大小")]),a._v(" "),e("ul",[e("li",[e("code",[a._v("du -hs /var/lib/docker/")])])]),a._v(" "),e("h3",{attrs:{id:"查看当前目录下各子目录大小"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#查看当前目录下各子目录大小","aria-hidden":"true"}},[a._v("#")]),a._v(" 查看当前目录下各子目录大小")]),a._v(" "),e("p",[e("code",[a._v("du -h --max-depth=1")])]),a._v(" "),e("h3",{attrs:{id:"查看文件和文件夹权限等详情"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#查看文件和文件夹权限等详情","aria-hidden":"true"}},[a._v("#")]),a._v(" 查看文件和文件夹权限等详情")]),a._v(" "),e("p",[e("code",[a._v("ls -alh")])]),a._v(" "),e("h2",{attrs:{id:"挂载驱动器"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#挂载驱动器","aria-hidden":"true"}},[a._v("#")]),a._v(" 挂载驱动器")]),a._v(" "),e("ul",[e("li",[a._v("https://www.osetc.com/archives/420.html")]),a._v(" "),e("li",[e("code",[a._v("#mount -t iso9660 -o ro /dev/设备名 /挂载目录名")])])]),a._v(" "),e("h2",{attrs:{id:"添加用户"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#添加用户","aria-hidden":"true"}},[a._v("#")]),a._v(" 添加用户")]),a._v(" "),e("ul",[e("li",[e("code",[a._v("adduser username")])])]),a._v(" "),e("h2",{attrs:{id:"压缩解压"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#压缩解压","aria-hidden":"true"}},[a._v("#")]),a._v(" 压缩解压")]),a._v(" "),e("p",[a._v(".tar 文件")]),a._v(" "),e("h3",{attrs:{id:"仅打包，并非压缩"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#仅打包，并非压缩","aria-hidden":"true"}},[a._v("#")]),a._v(" 仅打包，并非压缩")]),a._v(" "),e("p",[a._v("tar -xvf FileName.tar # 解包\ntar -cvf FileName.tar DirName # 将 DirName 和其下所有文件（夹）打包\n1\n2\n3\n.gz 文件")]),a._v(" "),e("h3",{attrs:{id:"gz"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#gz","aria-hidden":"true"}},[a._v("#")]),a._v(" .gz")]),a._v(" "),e("p",[a._v("gunzip FileName.gz # 解压 1\ngzip -d FileName.gz # 解压 2\ngzip FileName # 压缩，只能压缩文件\n1\n2\n3\n4\n.tar.gz 文件、 .tgz 文件")]),a._v(" "),e("h3",{attrs:{id:"tar-gz-和-tgz"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#tar-gz-和-tgz","aria-hidden":"true"}},[a._v("#")]),a._v(" .tar.gz 和 .tgz")]),a._v(" "),e("p",[a._v("tar -zxvf FileName.tar.gz # 解压\ntar -zcvf FileName.tar.gz DirName # 将 DirName 和其下所有文件（夹）压缩\ntar -C DesDirName -zxvf FileName.tar.gz # 解压到目标路径\n1\n2\n3\n4\n.zip 文件")]),a._v(" "),e("h3",{attrs:{id:"感觉-zip-占用空间比-tar-gz-大"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#感觉-zip-占用空间比-tar-gz-大","aria-hidden":"true"}},[a._v("#")]),a._v(" 感觉.zip 占用空间比.tar.gz 大")]),a._v(" "),e("p",[a._v("unzip FileName.zip # 解压\nzip FileName.zip DirName # 将 DirName 本身压缩\nzip -r FileName.zip DirName # 压缩，递归处理，将指定目录下的所有文件和子目录一并压缩\n1\n2\n3\n4\n.rar 文件")]),a._v(" "),e("h3",{attrs:{id:"mac-和-linux-并没有自带-rar，需要去下载"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#mac-和-linux-并没有自带-rar，需要去下载","aria-hidden":"true"}},[a._v("#")]),a._v(" mac 和 linux 并没有自带 rar，需要去下载")]),a._v(" "),e("ul",[e("li",[a._v("rar x FileName.rar # 解压")]),a._v(" "),e("li",[a._v("rar a FileName.rar DirName # 压缩")])])])},[],!1,null,null,null);t.default=r.exports}}]);