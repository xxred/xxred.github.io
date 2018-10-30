# XML Schema 介绍

- 第一次接触，难免错漏，欢迎指出。文中大部分抄自`http://www.w3school.com.cn/schema/index.asp`
- 先看一个相关例子

```xml
<?xml version="1.0"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"
targetNamespace="http://www.w3school.com.cn"
xmlns="http://www.w3school.com.cn"
elementFormDefault="qualified">

<xs:element name="note">
    <xs:complexType>
        <xs:sequence>
            <xs:element name="to" type="xs:string"/>
            <xs:element name="from" type="xs:string"/>
            <xs:element name="heading" type="xs:string"/>
            <xs:element name="body" type="xs:string"/>
      </xs:sequence>
    </xs:complexType>
</xs:element>

</xs:schema>
```

## XSD - schema 元素

```xml
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"
targetNamespace="http://www.w3school.com.cn"
xmlns="http://www.w3school.com.cn"
elementFormDefault="qualified">
...
...
</xs:schema>
```

- `schema`元素是每一个 XML Schema 的根元素
- 下面是`schema`元素相关属性的解释

### xmlns:xs

- `xmlns:xs="http://www.w3.org/2001/XMLSchema"`
- 显示 schema 中用到的元素和数据类型来自命名空间 `http://www.w3.org/2001/XMLSchema`。同时它还规定了来自命名空间 `http://www.w3.org/2001/XMLSchema` 的元素和数据类型应该使用前缀 `xs：`
- `xs:schema`元素使用了`xs:`前缀，表明`schema`元素来自`xmlns:xs`指定的命名空间。类似C#命名空间，using处引入并使用别名。

### targetNamespace

- `targetNamespace="http://www.w3school.com.cn"`
- 显示被此 schema 定义的元素 (note, to, from, heading, body) 来自命名空间： `http://www.w3school.com.cn`。
- 这样其它XML文档需要使用这些元素时，就需要指定`http://www.w3school.com.cn`这个命名空间，类似`xmlns:xs`这样，指明前缀，使用的时候加上前缀即可。或者使用`xmlns`。就像C#开发类的时候，指定当前类所在命名空间。

### xmlns

- `xmlns="http://www.w3school.com.cn"`
- 指出当前XML文档默认的命名空间是 `http://www.w3school.com.cn`
- 由于这个`XML Schema`本身就是`XML`，所以也可以有个命名空间，而`targetNamespace`是定义那些元素应该处于什么命名空间。
- 指定了命名空间，如果直接指定了`http://www.w3.org/2001/XMLSchema`，当前文档就不需要使用`xmlns:xs`这样的形式导入命名空间了。

### elementFormDefault

- `elementFormDefault="qualified"`
- 指出任何 XML 实例文档所使用的且在此 schema 中声明过的元素必须被命名空间限定。
- 大概意思是，你要使用这些元素，必须带上命名空间，否则不给你用。如果声明为`unqualified`，就是不严格限定，在其他文档随意使用那些元素而无限制。

## 在 XML 文档中引用 Schema

```xml
<?xml version="1.0"?>

<note xmlns="http://www.w3school.com.cn"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://www.w3school.com.cn note.xsd">

<to>George</to>
<from>John</from>
<heading>Reminder</heading>
<body>Don't forget the meeting!</body>
</note>
```

- 以上是XML文档中包含XML Schema 的引用，以下是解释

### xmlns - 命名空间

- `xmlns="http://www.w3school.com.cn"`
- 规定了默认命名空间的声明。此声明会告知 schema 验证器，在此 XML 文档中使用的所有元素都被声明于 `http://www.w3school.com.cn` 这个命名空间。
- 相当于C#中的包名、命名空间，如果处于同一命名空间，则无需再引入，可直接使用在同一命名空间的元素。

### xmlns:xsi - XML Schema 实例命名空间

- `xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"`
- 实例命名空间，声明之后才可以使用`schemaLocation`属性。
- 相当于C#中的using+命名空间，这样才可以使用命名空间里面的类。

### schemaLocation

- `xsi:schemaLocation="http://www.w3school.com.cn note.xsd"`
- 该属性可以指定XML schema 来自于哪里。它有两个字值。第一个值是需要使用的命名空间。第二个值是供命名空间使用的 XML schema 的位置。
- `xsd`文件的位置也是可以网络上位置，比如，还可以这样`http://www.w3school.com.cn http://127.0.0.1/note.xsd`

## 设计自己的XML Schema

## 实例

