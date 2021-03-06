# ASP.NET Core Blazor 模板组件

- Blazor 的模板化组件是类似于 vue 模板组件的东西，其定义是：接受一个或多个 UI 模板作为参数的组件，可将其用作组件呈现逻辑的一部分。 模板化组件允许你创作比常规组件更易于使用的更高级别的组件。 几个示例包括：
  - 允许用户为表的标头、行和脚注指定模板的表组件。
  - 允许用户在列表中指定用于呈现项的模板的列表组件。

## 模板参数

- 模板化组件通过指定 RenderFragment 或 RenderFragment<T>类型的一个或多个组件参数进行定义。 呈现片段表示要呈现的 UI 段。 RenderFragment<T> 采用可在调用呈现片段时指定的类型参数。
- TableTemplate 组件：

```razor
@typeparam TItem

<table class="table">
    <thead>
        <tr>@TableHeader</tr>
    </thead>
    <tbody>
        @foreach (var item in Items)
        {
            <tr>@RowTemplate(item)</tr>
        }
    </tbody>
    <tfoot>
        <tr>@TableFooter</tr>
    </tfoot>
</table>

@code {
    [Parameter]
    public RenderFragment TableHeader { get; set; }

    [Parameter]
    public RenderFragment<TItem> RowTemplate { get; set; }

    [Parameter]
    public RenderFragment TableFooter { get; set; }

    [Parameter]
    public IReadOnlyList<TItem> Items { get; set; }
}
```

- 使用模板化组件时，可以使用与参数名称匹配的子元素（在以下示例中为 TableHeader 和 RowTemplate）指定模板参数：

```razor
<TableTemplate Items="pets">
    <TableHeader>
        <th>ID</th>
        <th>Name</th>
    </TableHeader>
    <RowTemplate>
        <td>@context.PetId</td>
        <td>@context.Name</td>
    </RowTemplate>
</TableTemplate>
```

## 模板上下文参数

- 作为元素传递的类型 RenderFragment<T> 的组件参数具有一个名为 context 的隐式参数（例如，前面的代码示例 @context.PetId），但你可以使用子元素上的 Context 特性来更改参数名称。 在下面的示例中，RowTemplate 元素的 Context 特性指定了 pet 参数：

```razor
<TableTemplate Items="pets">
    <TableHeader>
        <th>ID</th>
        <th>Name</th>
    </TableHeader>
    <RowTemplate Context="pet">
        <td>@pet.PetId</td>
        <td>@pet.Name</td>
    </RowTemplate>
</TableTemplate>
```

或者，您可以在 component 元素上指定 Context 特性。 指定的 Context 特性适用于所有指定的模板参数。 如果要为隐式子内容指定内容参数名称（不包含任何换行子元素），这会很有用。 在下面的示例中，Context 特性显示在 TableTemplate 元素上，并应用于所有模板参数：

```razor
<TableTemplate Items="pets" Context="pet">
    <TableHeader>
        <th>ID</th>
        <th>Name</th>
    </TableHeader>
    <RowTemplate>
        <td>@pet.PetId</td>
        <td>@pet.Name</td>
    </RowTemplate>
</TableTemplate>
```

## 泛型类型化组件

- 模板化组件通常是通用类型。 例如，泛型 ListViewTemplate 组件可用于呈现 IEnumerable<T> 值。 若要定义一般组件，请使用@typeparam 指令指定类型参数：

```razor
@typeparam TItem

<ul>
    @foreach (var item in Items)
    {
        @ItemTemplate(item)
    }
</ul>

@code {
    [Parameter]
    public RenderFragment<TItem> ItemTemplate { get; set; }

    [Parameter]
    public IReadOnlyList<TItem> Items { get; set; }
}
```

当使用泛型类型的组件时，将在可能的情况下推断类型参数：

```razor
<ListViewTemplate Items="pets">
    <ItemTemplate Context="pet">
        <li>@pet.Name</li>
    </ItemTemplate>
</ListViewTemplate>
```

否则，必须使用与类型参数的名称匹配的属性显式指定 type 参数。 在下面的示例中，TItem="Pet" 指定类型：

```razor
<ListViewTemplate Items="pets" TItem="Pet">
    <ItemTemplate Context="pet">
        <li>@pet.Name</li>
    </ItemTemplate>
</ListViewTemplate>
```

## 总结

- 总的来讲，跟 vue 的模板组件形式上差不多，用法有不同。他们都是同样的思想，将常用的组件变成模板达到共用的目的。
