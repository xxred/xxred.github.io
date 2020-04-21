# 在 iis 上部署 python web（Flask）

- 由于项目需要，要把 python 写的算法提供给其它项目使用，于是尝试部署为 web 项目，以服务形式提供给其它项目。由于服务器是 win 环境，其它项目也是部署在 iis，因此 python 项目也需要部署在 iis 上。

## 环境

- 系统环境：windows server 2019
- web 服务器：iis。打开服务网管理器->添加角色和功能->一直下一步到服务器角色->勾选 Web 服务器(IIS)->弹框后点添加功能->一直下一步直到角色服务->选择 Web 服务器-应用程序开发-CGI->下一步，然后安装
- 软件环境：Python 3.8。下载链接：https://www.python.org/downloads/ 。下载后管理员权限安装，执行`pip install wfastcgi`安装`wfastcgi`。安装后执行`wfastcgi-enable`启用`wfastcgi`，并记录输出的信息，包含了`python.exe`和`wfastcgi.py`的位置。参考 https://pypi.org/project/wfastcgi/

```bash
PS C:\Windows\system32> wfastcgi-enable
已经在配置提交路径“MACHINE/WEBROOT/APPHOST”向“MACHINE/WEBROOT/APPHOST”的“system.webServer/fastCgi”节应用了配置更改
"c:\users\12504\appdata\local\programs\python\python38-32\python.exe|c:\users\12504\appdata\local\programs\python\python38-32\lib\site-packages\wfastcgi.py" can now be used as a FastCGI script processor
```

## Flask 应用

```python
from flask import Flask
app=Flask(__name__)

@app.route('/')
def hello():
    return "Hello World!"

if __name__=='__main__':
    app.run(debug=True)
```

- 将以上代码保存为`app.py`，接着创建`web.config`,填入以下内容。配置参考 https://pypi.org/project/wfastcgi/

```xml
<configuration>
  <system.webServer>
    <handlers>
      <add name="Python FastCGI"
           path="*"
           verb="*"
           modules="FastCgiModule"
           scriptProcessor="C:\Python36\python.exe|C:\Python36\Lib\site-packages\wfastcgi.py"
           resourceType="Unspecified"
           requireAccess="Script" />
    </handlers>
  </system.webServer>

  <appSettings>
    <!-- 参数说明见 https://pypi.org/project/wfastcgi/ -->
    <!-- Required settings -->
    <!-- my_app是模块名称，比如my_app.py，wsgi_app是其中属性，如果有括号就调用，否则当成属性。
    上述应用中，模块名为app，Flask变量为app，此处应填“app.app”-->
    <add key="WSGI_HANDLER" value="my_app.wsgi_app()" />
    <add key="PYTHONPATH" value="C:\MyApp" />

    <!-- Optional settings -->
    <!--<add key="WSGI_LOG" value="C:\Logs\my_app.log" />
    <add key="WSGI_RESTART_FILE_REGEX" value=".*((\.py)|(\.config))$" />
    <add key="APPINSIGHTS_INSTRUMENTATIONKEY" value="__instrumentation_key__" />
    <add key="DJANGO_SETTINGS_MODULE" value="my_app.settings" />
    <add key="WSGI_PTVSD_SECRET" value="__secret_code__" />
    <add key="WSGI_PTVSD_ADDRESS" value="ipaddress:port" />-->
  </appSettings>
</configuration>
```

## 创建站点

- 完成以上步骤，创建站点，访问查看结果。如果运气好，应该能看到页面返回"Hello World!"
- 如果有问题请看下一节。

## 常见错误

### HTTP 错误 500.19 - Internal Server Error

- 报错含有如下信息，`不能在此路径中使用此配置节。如果在父级别上锁定了该节，便会出现这种情况。锁定是默认设置的(overrideModeDefault="Deny")，或者是通过包含 overrideMode="Deny" 或旧有的 allowOverride="false" 的位置标记明确设置的。`。配置源哪个节点标红，下面的命令就设置解锁哪个节点。

```bash
C:\Windows\system32\inetsrv\appcmd unlock config -section:system.webServer/handlers
```

- 出现此问题的原因是 IIS 的 web.config 管理机制，默认情况不允许修改。参考 https://www.cnblogs.com/jxxy2012nw/p/5629225.html

### HTTP 错误 500.0 - Internal Server Error

- 1、提示`发生未知 FastCGI 错误`，在`PTVS(Python Tools for Visual Studio )`项目中有[issue](https://github.com/Microsoft/PTVS/issues/2024)提到，是权限问题
- 解决方式：选中网站对应的应用池->高级设置->进程模型的标识项由`ApplicationPoolIdentity`改为`LocalSystem`。
- 参考 https://blog.csdn.net/enter89/article/details/86231455
- 2、如果提示`无法在<fastCGI>应用程序配置中找到<handler> scriptProcessor`，则可能是 python 路径问题，比如说 python 安装路径过长、包含中文、包含空格。
- 解决方法是重装 python，避免上述路径问题，再重来即可。

## 总结

- 一开始将带有空格的路径设置为 python 路径就有坑了，尝试了多次，找了好多篇文章，才发现有一篇文章有截图，python 后面的参数是带双引号的，即`c:\program files\python\python.exe|"c:\program files\python\lib\site-packages\wfastcgi.py"`。然后在网站的处理程序映射中找到`FlaskFastCGI`，编辑加上双引号，点击确定的时候会提示是否创建 FastCGI 应用程序，点击是即可。然后在 iis 主页中 FastCGI 设置，删除最早的那个，只保留最后创建的那个即可。
- 最后整理测试，才发现最根本的问题，并且发现了权限的问题。
- 参考 https://segmentfault.com/a/1190000008909201
