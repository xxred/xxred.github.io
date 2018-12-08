# T4模板

## 获取当前项目一些信息

### 项目文件名

```csharp
<#@ template language="C#" hostSpecific="true" debug="true" #>
<#@ output extension=".tt.log" #>
<#= Host.ResolveAssemblyReference("$(ProjectPath)") #>
```

- `hostSpecific="true"`设置了才能访问Host，[参考](https://docs.microsoft.com/zh-cn/visualstudio/modeling/accessing-visual-studio-or-other-hosts-from-a-text-template?view=vs-2017)。
- 然后访问Host的`ResolveAssemblyReference`方法，将宏指令传入。更多宏指令可在项目属性面板-生成事件-编辑预先生成按钮-宏。
- 为什么传入这个就能获取到呢，经过反射`Host`得到`ResolveAssemblyReference`方法所在程序集`Microsoft.VisualStudio.TextTemplating.VSHost.15.0.dll`，所在路径`C:\Program Files (x86)\Microsoft Visual Studio\2017\Enterprise\Common7\IDE\PublicAssemblies`。方法所在命名空间为`Microsoft.VisualStudio.TextTemplating.VSHost`，类名为`TextTemplatingService`，关键代码如下：

```csharp
// Microsoft.VisualStudio.TextTemplating.VSHost.TextTemplatingService
using System.Text.RegularExpressions;

private static Regex vsMacroAndPropertyRegEx = new Regex(@"\$\((?<name>\w+)\) ", RegexOptions.ExplicitCapture | RegexOptions.Compiled | RegexOptions.IgnorePatternWhitespace);
```

```csharp
// Microsoft.VisualStudio.TextTemplating.VSHost.TextTemplatingService
using Microsoft.VisualStudio.Shell.Interop;
using System;
using System.Text.RegularExpressions;

private string ExpandProjectProperties(string input)
{
	IVsBuildPropertyStorage propertyStorage = hierarchy as IVsBuildPropertyStorage;
	if (propertyStorage != null)
	{
		Lazy<string> configurationName = new Lazy<string>(delegate
		{
			IVsSolutionBuildManager vsSolutionBuildManager = GetService(typeof(IVsSolutionBuildManager)) as IVsSolutionBuildManager;
			IVsProjectCfg[] array = new IVsProjectCfg[1];
			if (vsSolutionBuildManager != null && vsSolutionBuildManager.FindActiveProjectCfg(IntPtr.Zero, IntPtr.Zero, hierarchy, array) == 0 && array[0].get_DisplayName(out string result2) == 0)
			{
				return result2;
			}
			return string.Empty;
		});
		MatchEvaluator evaluator = delegate(Match m)
		{
			Group group = m.Groups["name"];
			if (group.Success && propertyStorage.GetPropertyValue(group.Value, configurationName.Value, 1u, out string result) == 0)
			{
				return result;
			}
			return m.Value;
		};
		return vsMacroAndPropertyRegEx.Replace(input, evaluator);
	}
	return input;
}
```

- 可以看到正则表达式就是匹配类似`$(ProjectPath)`这种字符的，然后从`propertyStorage`中取出来的