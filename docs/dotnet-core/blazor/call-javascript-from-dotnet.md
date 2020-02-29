# 从 ASP .NET Core Blazor 中的 .NET 方法调用 JavaScript 函数

- Blazor 应用程序可以从 .NET 方法调用 JavaScript 函数，并可以从 JavaScript 函数调用 .NET 方法。这些场景称为 JavaScript 互操作性（JS interop）。
- 本文介绍了从 .NET 调用 JavaScript 函数的方法。有关如何从 JavaScript 调用 .NET 方法的信息，请参见[从 ASP .NET Core Blazor 中的 JavaScript 函数调用 .NET 方法](https://docs.microsoft.com/en-us/aspnet/core/blazor/call-dotnet-from-javascript?view=aspnetcore-3.1)。

## 使用

- 要从 .NET 调用 JavaScript，请使用 IJSRuntime 抽象。要发出 JS 互操作调用，请将 IJSRuntime 抽象注入到组件中。该 InvokeAsync<T>方法获取您希望调用的 JavaScript 函数的标识符以及任意数量的 JSON 可序列化的参数。功能标识符是相对于全局范围（window）的。如果您要呼叫 window.someScope.someFunction，标识符为 someScope.someFunction。无需在调用函数之前先进行注册。返回类型 T 还必须是 JSON 可序列化的。T 应该与最能映射到返回的 JSON 类型的 .NET 类型匹配。
- 对于启用了预渲染的 Blazor Server 应用，在初始预渲染期间无法调用 JavaScript。必须将 JavaScript 互操作调用推迟到与浏览器建立连接之后。有关更多信息，请参见[检测 Blazor Server 应用何时渲染](https://docs.microsoft.com/en-us/aspnet/core/blazor/call-javascript-from-dotnet?view=aspnetcore-3.1#detect-when-a-blazor-server-app-is-prerendering)部分。
- 以下示例基于基于 JavaScript 的解码器 TextDecoder。该示例演示了如何从 C＃方法调用 JavaScript 函数。JavaScript 函数从 C＃方法接受一个字节数组，对该数组进行解码，然后将文本返回给组件以进行显示。
- 在 wwwroot / index.html（Blazor WebAssembly）或 Pages / \_Host.cshtml（Blazor Server）的<head>元素内，提供一个 JavaScript 函数，该函数用于解码传递的数组并返回解码后的值：TextDecoder

```html
<script>
  window.convertArray = win1251Array => {
    var win1251decoder = new TextDecoder('windows-1251')
    var bytes = new Uint8Array(win1251Array)
    var decodedArray = win1251decoder.decode(bytes)
    console.log(decodedArray)
    return decodedArray
  }
</script>
```

JavaScript 代码（例如前面示例中显示的代码）也可以从 JavaScript 文件（.js）加载，并引用该脚本文件：

```html
<script src="exampleJsInterop.js"></script>
```

- 以下组件：

  - 选择组件按钮（“ 转换数组”）时 convertArray 使用调用 JavaScript 函数。JSRuntime
  - 调用 JavaScript 函数后，将传递的数组转换为字符串。字符串将返回到组件以显示。

```razor
@page "/call-js-example"
@inject IJSRuntime JSRuntime;

<h1>Call JavaScript Function Example</h1>

<button type="button" class="btn btn-primary" @onclick="ConvertArray">
Convert Array
</button>

<p class="mt-2" style="font-size:1.6em">
    <span class="badge badge-success">
        @_convertedText
    </span>
</p>

@code {
// Quote (c)2005 Universal Pictures: Serenity
// https://www.uphe.com/movies/serenity
// David Krumholtz on IMDB: https://www.imdb.com/name/nm0472710/

    private MarkupString _convertedText =
        new MarkupString("Select the <b>Convert Array</b> button.");

    private uint[] _quoteArray = new uint[]
        {
            60, 101, 109, 62, 67, 97, 110, 39, 116, 32, 115, 116, 111, 112, 32,
            116, 104, 101, 32, 115, 105, 103, 110, 97, 108, 44, 32, 77, 97,
            108, 46, 60, 47, 101, 109, 62, 32, 45, 32, 77, 114, 46, 32, 85, 110,
            105, 118, 101, 114, 115, 101, 10, 10,
        };

    private async Task ConvertArray()
    {
        var text =
            await JSRuntime.InvokeAsync<string>("convertArray", _quoteArray);

        _convertedText = new MarkupString(text);

        StateHasChanged();
    }

}
```

## IJSRuntime

- 要使用 IJSRuntime 抽象，请采用以下任何一种方法：

  - 将 IJSRuntime 抽象注入 Razor 组件（.razor）：

```razor
@inject IJSRuntime JSRuntime

@code {
protected override void OnInitialized()
{
StocksService.OnStockTickerUpdated += stockUpdate =>
{
JSRuntime.InvokeVoidAsync("handleTickerChanged",
stockUpdate.symbol, stockUpdate.price);
};
}
}
```

在 wwwroot / index.html（Blazor WebAssembly）或 Pages / \_Host.cshtml（Blazor Server）的<head>元素内，提供 JavaScript 函数。该函数使用调用，但不返回值：handleTickerChangedIJSRuntime.InvokeVoidAsync

```html
<script>
  window.handleTickerChanged = (symbol, price) => {
    // ... client-side processing/display code ...
  }
</script>
```

- 将 IJSRuntime 抽象注入到类（.cs）中：

```csharp
public class JsInteropClasses
{
private readonly IJSRuntime \_jsRuntime;

    public JsInteropClasses(IJSRuntime jsRuntime)
    {
        _jsRuntime = jsRuntime;
    }

    public ValueTask<string> TickerChanged(string data)
    {
        return _jsRuntime.InvokeAsync<string>(
            "handleTickerChanged",
            stockUpdate.symbol,
            stockUpdate.price);
    }

}
```

在 wwwroot / index.html（Blazor WebAssembly）或 Pages / \_Host.cshtml（Blazor Server）的<head>元素内，提供 JavaScript 函数。该函数使用调用并返回一个值：handleTickerChangedJSRuntime.InvokeAsync

```html
<script>
  window.handleTickerChanged = (symbol, price) => {
    // ... client-side processing/display code ...
    return 'Done!'
  }
</script>
```

- 为了使用 BuildRenderTree 动态生成内容，请使用以下[Inject]属性：

```razor
[Inject]
IJSRuntime JSRuntime { get; set; }
```

- 在此主题附带的客户端示例应用程序中，该应用程序可以使用两个 JavaScript 函数，这些函数与 DOM 交互以接收用户输入并显示欢迎消息：

  - showPrompt –产生提示以接受用户输入（用户名），并将名称返回给呼叫者。
  - displayWelcome-分配从呼叫者到 DOM 对象与一个欢迎消息 id 的 welcome。

- wwwroot / exampleJsInterop.js：

```javaScript
window.exampleJsFunctions = {
showPrompt: function (text) {
return prompt(text, 'Type your name here');
},
displayWelcome: function (welcomeMessage) {
document.getElementById('welcome').innerText = welcomeMessage;
},
returnArrayAsyncJs: function () {
DotNet.invokeMethodAsync('BlazorSample', 'ReturnArrayAsync')
.then(data => {
data.push(4);
console.log(data);
});
},
sayHello: function (dotnetHelper) {
return dotnetHelper.invokeMethodAsync('SayHello')
.then(r => console.log(r));
}
};
```

- 将<script\>引用 JavaScript 文件的标记放在 wwwroot / index.html 文件（Blazor WebAssembly）或 Pages / \_Host.cshtml 文件（Blazor Server）中。
- wwwroot / index.html（Blazor WebAssembly）：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Blazor WebAssembly Sample</title>
    <base href="/" />
    <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet" />
    <link href="css/site.css" rel="stylesheet" />
  </head>

  <body>
    <app>Loading...</app>

    <div id="blazor-error-ui">
      An unhandled error has occurred.
      <a href="" class="reload">Reload</a>
      <a class="dismiss">🗙</a>
    </div>
    <script src="_framework/blazor.webassembly.js"></script>
    <script src="exampleJsInterop.js"></script>
  </body>
</html>
```

- Pages / \_Host.cshtml（Blazor 服务器）：

```html
@page "/" @namespace BlazorSample.Pages @addTagHelper \*,
Microsoft.AspNetCore.Mvc.TagHelpers @{ Layout = null; }

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Blazor Server Sample</title>
    <base href="~/" />
    <link rel="stylesheet" href="css/bootstrap/bootstrap.min.css" />
    <link href="css/site.css" rel="stylesheet" />
  </head>
  <body>
    <app>
      <component type="typeof(App)" render-mode="ServerPrerendered" />
    </app>

    <div id="blazor-error-ui">
      <environment include="Staging,Production">
        An error has occurred. This application may no longer respond until
        reloaded.
      </environment>
      <environment include="Development">
        An unhandled exception has occurred. See browser dev tools for details.
      </environment>
      <a href="" class="reload">Reload</a>
      <a class="dismiss">🗙</a>
    </div>

    <script src="_framework/blazor.server.js"></script>
    <script src="exampleJsInterop.js"></script>
  </body>
</html>
```

- 不要在组件文件中放置<script\>标签，因为<script\>标签不能动态更新。
- .NET 方法通过调用来与 exampleJsInterop.js 文件中的 JavaScript 函数进行互操作 IJSRuntime.InvokeAsync<T>。
- 该 IJSRuntime 抽象是异步允许 Blazor Server 方案。如果该应用程序是 Blazor WebAssembly 应用程序，并且您要同步调用 JavaScript 函数，请向下转换 IJSInProcessRuntime 并调用 Invoke<T>。我们建议大多数 JS 互操作库使用异步 API，以确保这些库在所有情况下均可用。
- 该示例应用程序包含一个演示 JS 互操作的组件。组件：
  - 通过 JavaScript 提示接收用户输入。
  - 将文本返回给组件以进行处理。
  - 调用与 DOM 交互以显示欢迎消息的第二个 JavaScript 函数。
    Pages / JSInterop.razor：

```razor
@page "/JSInterop"
@using BlazorSample.JsInteropClasses
@inject IJSRuntime JSRuntime

<h1>JavaScript Interop</h1>

<h2>Invoke JavaScript functions from  .NET methods</h2>

<button type="button" class="btn btn-primary" @onclick="TriggerJsPrompt">
Trigger JavaScript Prompt
</button>

<h3 id="welcome" style="color:green;font-style:italic"></h3>

@code {
public async Task TriggerJsPrompt()
{
var name = await JSRuntime.InvokeAsync<string>(
"exampleJsFunctions.showPrompt",
"What's your name?");

        await JSRuntime.InvokeVoidAsync(
                "exampleJsFunctions.displayWelcome",
                $"Hello {name}! Welcome to Blazor!");
    }

}
```

- 当 TriggerJsPrompt 通过选择组件的执行触发的 JavaScript 提示按钮时，JavaScript showPrompt 在所提供的功能的 wwwroot / exampleJsInterop.js 文件被调用。
- 该 showPrompt 函数接受经过 HTML 编码并返回到组件的用户输入（用户名）。该组件将用户名存储在本地变量中 name。
- 存储在其中的字符串 name 被合并到欢迎消息中，该消息将传递给 JavaScript 函数 displayWelcome，该函数将欢迎消息呈现为标题标记。

## 调用无效的 JavaScript 函数

- 返回 void（0）/ void 0 或 undefined 的 JavaScript 函数用调用 IJSRuntime.InvokeVoidAsync。

## 检测 Blazor Server 应用何时渲染

- 在渲染 Blazor Server 应用程序时，由于尚未建立与浏览器的连接，因此无法执行某些操作（如调用 JavaScript）。预渲染时，组件可能需要进行不同的渲染。
- 若要将 JavaScript 互操作调用延迟到与浏览器建立连接之后，可以使用 OnAfterRenderAsync 组件生命周期事件。仅在完全渲染应用程序并建立客户端连接后才调用此事件。

```html
@using Microsoft.JSInterop @inject IJSRuntime JSRuntime

<div @ref="divElement">Text during render</div>

@code { private ElementReference divElement; protected override async Task
OnAfterRenderAsync(bool firstRender) { if (firstRender) { await
JSRuntime.InvokeVoidAsync( "setElementText", divElement, "Text after render"); }
} }
```

- 对于前面的示例代码，请 setElementText 在 wwwroot / index.html（Blazor WebAssembly）或 Pages / \_Host.cshtml（Blazor Server）的<head\>元素内提供一个 JavaScript 函数。该函数使用调用，但不返回值：IJSRuntime.InvokeVoidAsync

```html
<script>
  window.setElementText = (element, text) => (element.innerText = text)
</script>
```

> 警告：前面的示例仅出于演示目的直接修改了文档对象模型（DOM）。在大多数情况下，建议不要使用 JavaScript 直接修改 DOM，因为 JavaScript 可能会干扰 Blazor 的更改跟踪。

- 以下组件演示了如何以与预渲染兼容的方式将 JavaScript 互操作用作组件初始化逻辑的一部分。该组件表明可以从内部触发渲染更新 OnAfterRenderAsync。在这种情况下，开发人员必须避免创建无限循环。
- 仅在，而不是在任何较早的生命周期方法中使用 where JSRuntime.InvokeAsync，因为在呈现组件之前没有 JavaScript 元素。ElementRefOnAfterRenderAsync
- 调用 StateHasChanged 以使用从 JavaScript 互操作调用获得的新状态来重新呈现组件。该代码不会创建无限循环，因为 StateHasChanged 仅当 infoFromJsis 时才调用 null。

```html
@page "/prerendered-interop" @using Microsoft.AspNetCore.Components @using
Microsoft.JSInterop @inject IJSRuntime JSRuntime

<p>
  Get value via JS interop call:
  <strong id="val-get-by-interop">@(infoFromJs ?? "No value yet")</strong>
</p>

Set value via JS interop call:

<div id="val-set-by-interop" @ref="divElement"></div>

@code { private string infoFromJs; private ElementReference divElement;
protected override async Task OnAfterRenderAsync(bool firstRender) { if
(firstRender && infoFromJs == null) { infoFromJs = await
JSRuntime.InvokeAsync<string
  >( "setElementText", divElement, "Hello from interop call!");
  StateHasChanged(); } } }</string
>
```

对于前面的示例代码，请 setElementText 在 wwwroot / index.html（Blazor WebAssembly）或 Pages / \_Host.cshtml（Blazor Server）的<head>元素内提供一个 JavaScript 函数。该函数使用调用并返回一个值：IJSRuntime.InvokeAsync

```html
<script>
  window.setElementText = (element, text) => {
    element.innerText = text
    return text
  }
</script>
```

> 警告：前面的示例仅出于演示目的直接修改了文档对象模型（DOM）。在大多数情况下，建议不要使用 JavaScript 直接修改 DOM，因为 JavaScript 可能会干扰 Blazor 的更改跟踪。

## 捕获对元素的引用

- 某些 JS 互操作方案需要引用 HTML 元素。例如，UI 库可能需要元素引用进行初始化，或者您可能需要在诸如 focus 或的元素上调用类似命令的 API play。
- 使用以下方法捕获对组件中 HTML 元素的引用：
  - 将@ref 属性添加到 HTML 元素。
  - 定义 ElementReference 名称与@ref 属性值匹配的类型的字段。
- 以下示例显示了捕获对 username <input\>元素的引用：

```html
<input @ref="username" ... />

@code { ElementReference username; }
```

- 警告：仅使用元素引用来改变不与 Blazor 交互的空元素的内容。当第三方 API 向元素提供内容时，此方案很有用。因为 Blazor 不与元素交互，所以 Blazor 的元素表示与 DOM 之间不会发生冲突。
  在以下示例中，突变无序列表（）的内容很危险，ul 因为 Blazor 与 DOM 交互以填充此元素的列表项（<li\>）：

```html
<ul ref="MyList">
  @foreach (var item in Todos) {
  <li>@item.Text</li>
  }
</ul>
```

- 如果 JS 互操作 MyList 更改了 element 的内容，并且 Blazor 尝试将 diff 应用于该元素，则该 diff 将与 DOM 不匹配。

- 就 .NET 代码而言，an ElementReference 是一个不透明的句柄。在只有你可以做的事情 ElementReference 就是通过 JS 互操作，让它通过 JavaScript 代码。当您这样做时，JavaScript 端代码会收到一个 HTMLElement 实例，该实例可与普通 DOM API 一起使用。

- 例如，以下代码定义了 .NET 扩展方法，该方法允许将焦点设置在元素上：

exampleJsInterop.js：

```javaScript
window.exampleJsFunctions = {
focusElement : function (element) {
element.focus();
}
}
```

要调用不返回值的 JavaScript 函数，请使用 IJSRuntime.InvokeVoidAsync。以下代码通过调用捕获的前面的 JavaScript 函数，将焦点放在用户名输入上 ElementReference：

```html
@inject IJSRuntime JSRuntime

<input @ref="\_username" />
<button @onclick="SetFocus">Set focus on username</button>

@code { private ElementReference \_username; public async Task SetFocus() {
await JSRuntime.InvokeVoidAsync( "exampleJsFunctions.focusElement", _username);
} }
```

- 要使用扩展方法，请创建一个接收 IJSRuntime 实例的静态扩展方法：

```csharp
public static async Task Focus(this ElementReference elementRef, IJSRuntime jsRuntime)
{
await jsRuntime.InvokeVoidAsync(
"exampleJsFunctions.focusElement", elementRef);
}
```

- 该 Focus 方法直接在对象上调用。下面的示例假定该 Focus 方法可从 JsInteropClasses 名称空间使用：

```html
@inject IJSRuntime JSRuntime @using JsInteropClasses

<input @ref="\_username" />
<button @onclick="SetFocus">Set focus on username</button>

@code { private ElementReference \_username; public async Task SetFocus() {
await _username.Focus(JSRuntime); } }
```

- 使用泛型类型并返回值时，请使用 ValueTask <T>：

```csharp
public static ValueTask<T> GenericMethod<T>(this ElementReference elementRef,
IJSRuntime jsRuntime)
{
return jsRuntime.InvokeAsync<T>(
"exampleJsFunctions.doSomethingGeneric", elementRef);
}
```

- GenericMethod 直接在具有类型的对象上调用。以下示例假定 GenericMethod 可以从 JsInteropClasses 名称空间获得：

```html
@inject IJSRuntime JSRuntime @using JsInteropClasses

<input @ref="\_username" />
<button @onclick="OnClickMethod">Do something generic</button>

<p>
  _returnValue: @_returnValue
</p>

@code { private ElementReference \_username; private string \_returnValue;
private async Task OnClickMethod() { _returnValue = await
_username.GenericMethod<string>(JSRuntime); } }</string>
```

## 跨组件的参考元素

- 一个 ElementReference 时，才能保证在组件的有效 OnAfterRender 方法（和元件参考是 struct），所以一个元件引用不能部件之间传递。
- 为了使父组件使元素引用可用于其他组件，父组件可以：
  - 允许子组件注册回调。
  - 在 OnAfterRender 事件期间使用传递的元素引用来调用已注册的回调。间接地，这种方法允许子组件与父组件的元素引用进行交互。
- 以下 Blazor WebAssembly 示例说明了该方法。
- 在<head\>的 wwwroot 文件/ index.html 的：

```html
<style>
  .red {
    color: red;
  }
</style>
```

- 在<body\>的 wwwroot 文件/ index.html 的：

```html
<script>
  function setElementClass(element, className) {
    /** @type {HTMLElement} **/
    var myElement = element
    myElement.classList.add(className)
  }
</script>
```

- Pages / Index.razor（父组件）：

```html
@page "/"

<h1 @ref="_title">Hello, world!</h1>

Welcome to your new app.

<SurveyPrompt Parent="this" Title="How is Blazor working for you?" />
Pages / Index.razor.cs：
```

```csharp
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Components;

namespace BlazorSample.Pages
{
public partial class Index :
ComponentBase, IObservable<ElementReference>, IDisposable
{
private bool \_disposing;
private IList<IObserver<ElementReference>> \_subscriptions =
new List<IObserver<ElementReference>>();
private ElementReference \_title;

        protected override void OnAfterRender(bool firstRender)
        {
            base.OnAfterRender(firstRender);

            foreach (var subscription in _subscriptions)
            {
                try
                {
                    subscription.OnNext(_title);
                }
                catch (Exception)
                {
                    throw;
                }
            }
        }

        public void Dispose()
        {
            _disposing = true;

            foreach (var subscription in _subscriptions)
            {
                try
                {
                    subscription.OnCompleted();
                }
                catch (Exception)
                {
                }
            }

            _subscriptions.Clear();
        }

        public IDisposable Subscribe(IObserver<ElementReference> observer)
        {
            if (_disposing)
            {
                throw new InvalidOperationException("Parent being disposed");
            }

            _subscriptions.Add(observer);

            return new Subscription(observer, this);
        }

        private class Subscription : IDisposable
        {
            public Subscription(IObserver<ElementReference> observer, Index self)
            {
                Observer = observer;
                Self = self;
            }

            public IObserver<ElementReference> Observer { get; }
            public Index Self { get; }

            public void Dispose()
            {
                Self._subscriptions.Remove(Observer);
            }
        }
    }

}
```

- 共享/SurveyPrompt.razor（子组件）：

```html
@inject IJSRuntime JS

<div class="alert alert-secondary mt-4" role="alert">
  <span class="oi oi-pencil mr-2" aria-hidden="true"></span>
  <strong>@Title</strong>

  <span class="text-nowrap">
    Please take our
    <a
      target="_blank"
      class="font-weight-bold"
      href="https://go.microsoft.com/fwlink/?linkid=2109206"
      >brief survey</a
    >
  </span>
  and tell us what you think.
</div>

@code { [Parameter] public string Title { get; set; } }
```

- 共享/SurveyPrompt.razor.cs：

```csharp
using System;
using Microsoft.AspNetCore.Components;

namespace BlazorSample.Shared
{
public partial class SurveyPrompt :
ComponentBase, IObserver<ElementReference>, IDisposable
{
private IDisposable \_subscription = null;

        [Parameter]
        public IObservable<ElementReference> Parent { get; set; }

        protected override void OnParametersSet()
        {
            base.OnParametersSet();

            if (_subscription != null)
            {
                _subscription.Dispose();
            }

            _subscription = Parent.Subscribe(this);
        }

        public void OnCompleted()
        {
            _subscription = null;
        }

        public void OnError(Exception error)
        {
            _subscription = null;
        }

        public void OnNext(ElementReference value)
        {
            JS.InvokeAsync<object>(
                "setElementClass", new object[] { value, "red" });
        }

        public void Dispose()
        {
            _subscription?.Dispose();
        }
    }

}
```

## 强化 JS 互操作调用

- JS 互操作可能由于网络错误而失败，应视为不可靠。默认情况下，Blazor Server 应用程序在一分钟后使服务器上的 JS 互操作调用超时。如果应用程序可以忍受更激进的超时（例如 10 秒），请使用以下方法之一设置超时：
  - 在全局中 Startup.ConfigureServices，指定超时时间：

```csharp
services.AddServerSideBlazor(
options => options.JSInteropDefaultCallTimeout = TimeSpan.FromSeconds({SECONDS}));
```

- 对于组件代码中的每次调用，单个调用可以指定超时：

```csharp
var result = await JSRuntime.InvokeAsync<string>("MyJSOperation",
TimeSpan.FromSeconds({SECONDS}), new[] { "Arg1" });
```

- 有关资源耗尽的更多信息，请参见 [Secure ASP .NET Core Blazor Server 应用程序](https://docs.microsoft.com/en-us/aspnet/core/security/blazor/server?view=aspnetcore-3.1)。

## 在类库中共享互操作代码

- JS 互操作代码可以包含在类库中，该库使您可以在 NuGet 包中共享代码。
- 类库处理将 JavaScript 资源嵌入到已生成的程序集中。JavaScript 文件位于 wwwroot 文件夹中。构建库时，该工具负责嵌入资源。
- 在应用程序的项目文件中引用生成的 NuGet 包的方式与引用任何 NuGet 包的方式相同。还原软件包后，应用程序代码可以像 C＃一样调用 JavaScript。
- 有关更多信息，请参见 [ASP .NET Core Razor 组件类库](https://docs.microsoft.com/en-us/aspnet/core/blazor/class-libraries?view=aspnetcore-3.1)。

## 额外资源

- [从 ASP .NET Core Blazor 中的 JavaScript 函数调用 .NET 方法](https://docs.microsoft.com/en-us/aspnet/core/blazor/call-dotnet-from-javascript?view=aspnetcore-3.1)
- [InteropComponent.razor 示例（dotnet / AspNetCore GitHub 存储库，3.1 版本分支）](https://github.com/dotnet/AspNetCore/blob/release/3.1/src/Components/test/testassets/BasicTestApp/InteropComponent.razor)
- [在 Blazor Server 应用程序中执行大数据传输](https://docs.microsoft.com/en-us/aspnet/core/blazor/advanced-scenarios?view=aspnetcore-3.1#perform-large-data-transfers-in-blazor-server-apps)

参考 https://docs.microsoft.com/en-us/aspnet/core/blazor/call-javascript-from-dotnet?view=aspnetcore-3.1
