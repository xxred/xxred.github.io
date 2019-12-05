# Visual Studio 拓展开发

- 本文介绍从零开始开发一个 VS 拓展，并介绍一些相关的基础知识
- 官方文档：`https://docs.microsoft.com/zh-cn/visualstudio/extensibility/starting-to-develop-visual-studio-extensions?view=vs-2019`

## 安装 Visual Studio sdk

- 依次操作：打开 VS -> 工具 -> 获取工具和功能
- 在安装面板选择 VS 拓展开发进行安装

## 新建项目

- 安装完 sdk 后，项目模板就会出现拓展相关的模板，如果没有重启 VS。搜索`vsix`，选择选择空模板创建项目
- 项目的 vsixmanifest 文件，主要是用于对拓展包的设置，比如包名、作者、版本等等

## 添加菜单和处理命令

- 添加新项，选择拓展类别(Extensibility)，找到`Command`那一项
- 此时项目会多几个文件，其中，`Command1.cs`是命令点击后的处理；`Command1Package.cs`是拓展包的入口，负责包的初始化以及调用`Command1.cs`的初始化方法以注册点击事件；`Command1Package.vsct`是 ui 文件，负责拓展包的 ui 布局，记录每个元素的标识和位置(控制出现在 VS 的文件、编辑、视图、窗口等菜单下)
- `Command1.cs`的 Execute 方法中则是点击事件的处理回调，这里的代码是打开一个弹窗。打开`Command1Package.vsct`文件，找到 Button 元素，修改 ButtonText 内容为`hello world`
- 点击运行，此时会启动一个 VS 的实例，打开后，在工具菜单下就可以看到`hello world`菜单，点击即可打开一个弹窗
- 具体例子参考 [hello-world](https://docs.microsoft.com/zh-cn/visualstudio/extensibility/extensibility-hello-world?view=vs-2019)

## vsct 文件详解

- 命令表配置文件是描述的 VSPackage 包含的命令集的文本文件。 Visual Studio 命令表 (VSCT) 编译器将基于 XML 的配置文件 （.vsct 文件） 编译为二进制的命令表输出 (.cto) 文件。 生成.cto 文件是不同于使用命令表 (启动 CTC) 编译器来编译.ctc 配置文件创建的。 但是，基于 XML 的.vsct 文件具有一些优势，例如 XML 编辑器和 XML IntelliSense。
- vsct 文件记录着拓展的 ui 布局，比如自定义菜单、工具栏、命令组和命令，图片的设置等等。
- vsct 文件层次元素：
  - CommandTable 元素：根元素，可表示的所有命令、 菜单组和 VSPackage 与关联的菜单。
  - Extern 元素：引用你想要合并的任何外部.h 文件。
  - Include 元素：引用要进行编译以及任何其他标头 (.h) 文件。
  - Commands 元素：表示所有可执行的单个命令。 每个命令具有以下四个子元素：
  - Menus 元素：表示在 VSPackage 中所有菜单和工具栏。
  - Groups 元素：表示所有在 VSPackage 中的组。组是单个命令的集合。
  - Buttons 元素：表示在 VSPackage 中所有的命令按钮和菜单项。按钮是可以与命令相关联的可视控件。
  - Bitmaps 元素：表示在 VSPackage 中所有按钮的图标。
  - CommandPlacements 元素：指示其中的单个命令应放置在你的 VSPackage 的菜单中的其他位置。
  - VisibilityConstraints 元素：指定在所有时间命令将显示，或仅在某些上下文中，例如何时显示在特定对话框或窗口中。 仅当指定的上下文处于活动状态时，将显示菜单和命令，并提供此元素的值。 默认行为是可在任何时候显示命令。
  - KeyBindings 元素：指定命令的任何键绑定。也就是说，一个或多个键组合必须按下执行命令，如 Ctrl+S。
  - UsedCommands 元素：通知 Visual Studio 环境当前 VSPackage 处于活动状态时，将由其他代码，实现指定的命令，尽管它提供了命令实现。
  - Symbols 元素：包含的符号名称和 GUID 的所有包中命令的 Id。实际上相当于变量声明，声明了才能使用。
- 参考：`https://docs.microsoft.com/zh-cn/visualstudio/extensibility/internals/designing-xml-command-table-dot-vsct-files?view=vs-2019`

## 父级菜单

- 拓展中的大部分菜单都是按钮，而他们的位置是根据父级菜单或者在一组里面的，因此菜单要选择位置只需要选择父级菜单即可。而且还可以设置多个父级，以便在多个地方都显示。下面列举 Visual Studio 菜单栏上的组的 GUID 和 ID 的值
- 首先看下 vstc 文件中父级菜单的设置，`Parent`元素的 id 值就是我们要设置的东西

```xml
    <Groups>
      <Group guid="guidCommand1PackageCmdSet" id="MyMenuGroup" priority="0x0600">
        <Parent guid="guidSHLMainMenu" id="IDM_VS_MENU_TOOLS"/>
      </Group>
    </Groups>
```

### 在 Visual Studio 菜单栏上的组

- 若要将菜单添加到菜单栏，设置其中一个组作为其父级。
  |Group|Id|
  |:-:|:-:|
  |文件/编辑/视图(File/Edit/View)|IDG_VS_MM_FILEEDITVIEW|
  | 重构(Refactoring) |IDG_VS_MM_REFACTORING|
  |项目(Project) |IDG_VS_MM_PROJECT|
  |生成(Build)| IDG_VS_MM_BUILDDEBUGRUN|
  |格式/工具(Format/Tools)| IDG_VS_MM_TOOLSADDINS|
  |窗口/帮助/社区(Window/Help/Community)| IDG_VS_MM_WINDOWHELP|
  |外接程序(Addins) |IDG_VS_MM_MACROS|
  |全屏显示栏(FullScreenBar)| IDG_VS_MM_FULLSCREENBAR|

### 在 Visual Studio 菜单栏上的菜单

- 若要将组添加到现有 Visual Studio 菜单中，在以下菜单选一个作为其父父级。 此列表中不包含子菜单。
  |Menu| ID|
  | :-:|:-:|
  |File ||IDM_VS_MENU_FILE|
  |Edit |IDM_VS_MENU_EDIT|
  |View |IDM_VS_MENU_VIEW|
  |Refactor| IDM_VS_MENU_REFACTORING|
  |Project| IDM_VS_MENU_PROJECT|
  |Build| IDM_VS_MENU_BUILD|
  |Format |IDM_VS_MENU_FORMAT|
  |Tools |IDM_VS_MENU_TOOLS|
  |Extensions |IDM_VS_MENU_EXTENSIONS|
  |Window| IDM_VS_MENU_WINDOW|
  |Addins| IDM_VS_MENU_ADDINS|
  |Community |IDM_VS_MENU_COMMUNITY|
  |Help |IDM_VS_MENU_HELP|

### Visual Studio 菜单上的组

#### 文件菜单组

|       Group        |          ID          |
| :----------------: | :------------------: |
|      New/Open      |   IDG_VS_FILE_FILE   |
|        Add         |   IDG_VS_FILE_ADD    |
|      Solution      | IDG_VS_FILE_SOLUTION |
|        Misc        |   IDG_VS_FILE_MISC   |
|        Save        |   IDG_VS_FILE_SAVE   |
|       Rename       |  IDG_VS_FILE_RENAME  |
|      Browser       | IDG_VS_FILE_BROWSER  |
|       Print        |  IDG_VS_FILE_PRINT   |
| Most Recently Used |   IDG_VS_FILE_MRU    |
|        Move        |   IDG_VS_FILE_MOVE   |
|        Exit        |   IDG_VS_FILE_EXIT   |

#### 编辑菜单组

|     Group      |           ID            |
| :------------: | :---------------------: |
|   Undo/Redo    |  IDG_VS_EDIT_UNDOREDO   |
| Cut/Copy/Paste |   IDG_VS_EDIT_CUTCOPY   |
|     Select     |   IDG_VS_EDIT_SELECT    |
|      GoTo      |    IDG_VS_EDIT_GOTO     |
|      Find      |    IDG_VS_EDIT_FIND     |
|    Objects     |   IDG_VS_EDIT_OBJECTS   |
|   OLE Verbs    |  IDG_VS_EDIT_OLEVERBS   |
|  Command Well  | IDG_VS_EDIT_COMMANDWELL |

#### 重构菜单组

|  Group   |            ID            |
| :------: | :----------------------: |
|  Common  |  IDG_REFACTORING_COMMON  |
| Advanced | IDG_REFACTORING_ADVANCED |

#### 视图菜单组

|        Group         |                ID                 |
| :------------------: | :-------------------------------: |
|      Form Code       |       IDG_VS_VIEW_FORMCODE        |
|       Browser        |        IDG_VS_VIEW_BROWSER        |
|     Define Views     |      IDG_VS_VIEW_DEFINEVIEWS      |
|       Windows        |        IDG_VS_VIEW_WINDOWS        |
|  Architect Windows   |     IDG_VS_VIEW_ARCH_WINDOWS      |
| Organization Windows |      IDG_VS_VIEW_ORG_WINDOWS      |
|     Code Browser     | IDG_VS_VIEW_CODEBROWSENAV_WINDOWS |
|     Dev Windows      |      IDG_VS_VIEW_DEV_WINDOWS      |
|       Toolbars       |       IDG_VS_VIEW_TOOLBARS        |
|       Symbols        |    IDG_VS_VIEW_SYMBOLNAVIGATE     |
|       Navigate       |       IDG_VS_VIEW_NAVIGATE        |
|    Small Navigate    |     IDG_VS_VIEW_SMALLNAVIGATE     |
|    Object Browser    |       IDG_VS_VIEW_OBJBRWSR        |
|     Command Well     |      IDG_VS_VIEW_COMMANDWELL      |
|    Property Pages    |       IDG_VS_VIEW_PROPPAGES       |
|       Refresh        |        IDG_VS_VIEW_REFRESH        |

#### 项目菜单组

|       Group       |            ID            |
| :---------------: | :----------------------: |
| Miscellaneous Add |   IDG_VS_PROJ_MISCADD    |
|        Add        |     IDG_VS_PROJ_ADD      |
|      Folder       |    IDG_VS_PROJ_FOLDER    |
|   Unload/Reload   | IDG_VS_PROJ_UNLOADRELOAD |
|     Reference     |  IDG_VS_PROJ_REFERENCE   |
|      Options      |   IDG_VS_PROJ_OPTIONS    |
|     Settings      |   IDG_VS_PROJ_SETTINGS   |

#### 生成菜单组

|            Group            |           ID           |
| :-------------------------: | :--------------------: |
|          Solution           | IDG_VS_BUILD_SOLUTION  |
|          Selection          | IDG_VS_BUILD_SELECTION |
| Profile Guided Optimization |  IDG_VS_PGO_SELECTION  |
|        Miscellaneous        |   IDG_VS_BUILD_MISC    |
|           Cancel            |  IDG_VS_BUILD_CANCEL   |

#### 工具菜单组

|          Group          |           ID           |
| :---------------------: | :--------------------: |
|      Command Line       |  IDG_VS_TOOLS_CMDLINE  |
|        Snippets         | IDG_VS_TOOLS_SNIPPETS  |
|      Object Subset      | IDG_VS_TOOLS_OBJSUBSET |
|         Options         |  IDG_VS_TOOLS_OPTIONS  |
|         Other 2         |  IDG_VS_TOOLS_OTHER2   |
|     External Tools      | IDG_VS_TOOLS_EXT_TOOLS |
| External Customizations | IDG_VS_TOOLS_EXT_CUST  |

#### 窗口菜单组

|   Group    |            ID            |
| :--------: | :----------------------: |
|    New     |    IDG_VS_WINDOW_NEW     |
| Dock/Close |     IDG_VS_DOCKCLOSE     |
| Dock/Hide  |     IDG_VS_DOCKHIDE      |
|  Arrange   |  IDG_VS_WINDOW_ARRANGE   |
| Navigation | IDG_VS_WINDOW_NAVIGATION |
|    List    |    IDG_VS_WINDOW_LIST    |

#### 帮助菜单组

|  Group  |         ID          |
| :-----: | :-----------------: |
| Samples | IDG_VS_HELP_SAMPLES |
| Support | IDG_VS_HELP_SUPPORT |
|  About  |  IDG_VS_HELP_ABOUT  |

### 其他菜单

- 用于扩展项目系统的 IDE 定义的命令：`https://docs.microsoft.com/zh-cn/visualstudio/extensibility/internals/ide-defined-commands-for-extending-project-systems?view=vs-2019`。
- 其他菜单待补充。

## 总结

- 如果想要了解 vs 拓展开发，那么到这里，相信你应该已心中有数，知道什么文件是什么、起什么作用，如何布局，如何处理事件。本文让你知道该去哪里找合适的资料和例子
- 如果需要参考，那么可以在具备基础知识之后，去应用市场那里`https://marketplace.visualstudio.com/vs`找一个合适的来进行参考
