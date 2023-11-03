---
title: 道盒Markdown格式
slug: everkm-markdown
update_time: 2023-11-03 11:03
---



道盒在标准Markdown和GitHub Markdown的基础上，增加了一些常用功能，丰富Markdown的使用场景。


# Markdown标准语法

来自：<https://daringfireball.net/projects/markdown/syntax>

## 标题

```markdown
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
```

## 段落

段落之间由两次回车换行完成。一次回车换行仅用于分割文字，在前端表现上没有任何效果。连续两次换行会形成段落。  
一次换行之前敲入两个空格，前端的表现为段落内换行，也称作软换行。实际效果见本行。

## 列表

分为无序列表和有序列表，前者使用 `* ` 或者 `- ` 实现，两者后面均有一个空格。
有序列表使用数字序号或 `1. ` 实现，后面也有一个空格，前端会自动重新依次编号。   
多级列表缩进在每级之前分别多加两个或四个空格。

```markdown
* 无序列表1
* 无序列表2
* 无序列表3

- 无序列表方式2
- 无序列表方式2
- 无序列表方式2

1. 有序列表1
1. 有序列表2
1. 有序列表3
1. 可以顺序标号，或者全部用1
    最终渲染时会自动矫正编号。
    如果前面带有缩进，会自动归为上个列表项的范围。


- 1 多级列表
    - 1.1 多级列表
    - 1.2 多级列表
- 2 多级列表
- 3 多级列表
```


## 强调

```markdown
强调，又叫做斜体，使用 *星号* 或 _下划线_。

重点强调，又叫做粗体，使用 **星号** 或 __下划线__。

组合强调，又叫粗斜体，使用 **星号和_下划线_** 或 ***组合强调***
```

`-` 和 `*` 的效果等同。


## 链接

```markdown
[内嵌式链接](https://note.everkm.cn)

[带标题的内嵌式链接](https://note.everkm.cn "道盒笔记")

[引用式链接][arbitrary case-insensitive reference text]

或者空着什么都不写 [link text itself]

引用链接的地址可以放在后面。

[link text itself]: https://note.everkm.cn
[arbitrary case-insensitive reference text]: https://note.everkm.cn
```


## 图片

```markdown
1. 内嵌式
![alt text](https://example.com/logo.png "Picture Title")

2. 引用式
![alt text][picture]

引用的内容放在后面

[picture]: https://example.com/logo.png "Picture Title"
```


## 代码

<pre><code class="language-markdown">
一个反引号包裹的行内代码

`行内代码`


三个反引号 ``` 的行包裹的代码块

```javascript
console.log('代码块+语法高亮')
```

```
没有指明语言，所有没有语法高亮。
让我们随便写个标签试试 <b>tag</b>
```
</code></pre>


## 水平分割线

三个或更多的 `-`

```markdown
---
```


## 块引用

```markdown
> 引用内容
> 可以在块引用中使用其它Markdown格式
> > 嵌套引用内容
```


# Github Markdown扩展语法

来自：<https://github.github.com/gfm/>

## 删除线

```markdown
~~删除线~~
```

## 任务列表

```markdown
- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media
```

## 自动转换链接

```markdown
<https://www.everkm.cn>
```

## 脚注

有时包含一个读者可见的非超链接注脚很有用。
使用 `[^数字|字母中线下划线组合]` 方式实现，字符后面可以用数字标号，或字母与下划线、中线的组合，渲染时系统自动重新依次编号。

```markdown
Text prior to footnote reference.[^2]
[^2]: Comment to include in footnote.
```

## 表格

```markdown
冒号可以用来对其列，可省略。

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |


外部的管道符 (|) 是可选的，而且不需要整齐排列。还可以在表格中内嵌其他Markdown。

Markdown | Less | Pretty
--- | --- | ---
*Still* | `renders` | **nicely**
1 | 2 | 3
```


## 定义列表 （Definition Lists）

```markdown
Apple

:   Pomaceous fruit of plants of the genus Malus in 
    the family Rosaceae.

Orange

:   The fruit of an evergreen tree of the genus Citrus.
```



# 道盒Markdown扩展


{id=everkm-macro}
## 宏 

### TOC (Table of content)

自动生成当前页面目录索引（TOC）。效果见本页开始。

```markdown
[TOC]

{{everkm::toc()}}

{{everkm::toc(level=1)}}
```

**参数**：

* `level` 可选。搜索的标题级别，默认 `level=3`



### 包含外部文件

渲染时将指定文件内容包含进来。仅允许常见的{ul}#**纯文本**#文件，常见扩展名为md, txt, csv, js等程序源文件。

**参数**:

* `file` 文件的绝对路径（基于项目根目录）或者相对路径。
* `as` 可选。输出格式。取值范围：
    1. `plain`(默认值)，渲染时原样输出
    1. `table` 尝试解析为表格
    1. `code` 代码块
    1. `md` or `markdown`, 以Markdown格式解析
* `code_lang` 可选。编程语言，仅 `as="code"` 时有效。
* `table_header` 可选。第一行是否为表头，仅 `as="table"` 时有效。
* `table_merge` 可选。是否自动合并单元格。值与单元格内容相同则合并，合并顺序为先列后行。例如：合并所有空内容的单元格，可以使用参数 `merge_cell=""`。仅 `as="table"` 时有效。
* `csv_delimiter` 可选。指定csv分隔符，默认 `,`。

**包含外部Markdown示例：**

```markdown
{{everkm::include(file="_include_test.inc.md", as="md")}}
```

**包含外部表格示例：**

所有内容是`*`号的单元格自动合并，并且增加扩展属性。

```markdown
{align=center}
{{everkm::include(file="demo.csv", as="table", table_header=true, table_merge="*")}}
```

**包含外部代码示例：**

```markdown
{{everkm::include(file="_xx.js", as="code", code_lang="js")}}
```

{id=inner-link}
## 项目内部链接 

适用于项目内的文件跳转。支持非HTML页面链接，如PDF文档等，该文件在输出时自动复制到静态资源目录。

```markdown
[[文件名]]

[[目录/文件名]]
```

当主题（双括号内为主题）只有一个标题时，则查找整个内容目录，文件名相同（忽略 `.md` 扩展名）则匹配成功。如果有多个同名文件，则返回第一个。如需避免这种同名定位，可以在前面加上目录限定。目录识别以下几种：

1. 以 `/` 打头表示以项目根目录严格匹配。
2. 以 `./` (当前文件目录) 或 `../` (当前文件的上一级目录) 表示以当前文件为基准的相对定位。
3. 除上述外，均以文件名为后缀，匹配项目中所有文件。


{id=page-anchor}
## 页内锚点 

适用于页面内部不同标题之间的跳转。

标题会自动生成锚点，可以在通过 `id=identity` 定义ID，默认使用标题内容地址化[^slugify]作为锚点名称，可在链接中使用`#id`实现页内锚点跳转。


## 区块扩展属性

紧挨着区块前面，单独一行，使用花括号包裹起来的属性集。如：

```markdown
{color=red tc}
# 红色的标题
```

**属性集**支持以下属性：

1. `#tag` 增加Tag标签，支持中文
1. `.class` 增加CSS样式名称（class）属性
1. `color=red` 增加文字颜色
1. `bgcolor=red` 增加背景颜色
1. `font=Arial` 字体。
1. `tl`, `tc`, `tr` 依次为左对齐，居中对齐，右对齐。
1. `pa=1em`, `px=1em`, `py=1em` 依次为四周内间距，水平间距，垂直间距。
1. `corner=0.5em` 四周圆角大小，`em`为当前文字大小。
1. `ul` 或 `underline` 增加下划线。
1. `key=value` 设置其他自定义属性。

{.note}
注意：value中如果存在空格或者逗号时，需用双引号包裹。


### 标题

```markdown
{id=main-header}
# 主标题
```

### 段落

```markdown
{bgcolor="rgba(0,0,0,0.1)" color=blue underline pa=1em corner=0.5em}
这是一段区块示例内容，它拥有扩展属性。
```

{bgcolor="rgba(0,0,0,0.1)" color=blue underline pa=1em corner=0.5em}
这是一段区块示例内容，它拥有扩展属性。


### 表格

```markdown
{align=center .my-table}
| 默认对齐   | 左对齐 | 中对齐 | 右对齐 |
| ---       | :---  | :---: | ---:  |
| Content   | Content | Content | Content |
| Content   | Content | Content | Content |
```


{.main #the-site lang=zh}
## 行内扩展属性


### 指定区域

对`#`包裹区域增加属性，[属性集](#区块扩展属性)在前。格式为：

```markdown
我是{color=red}#一个#长段落。
```


### 链接

```markdown
hello <https://www.everkm.cn>{target=_blank color=red} world

带有扩展属性的[道盒](https://www.everkm.cn){color=orangered}链接。
```

### 图片 

```markdown
![Air](https://images.unsplash.com/photo-1564979045531-fa386a275b27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80 "蓝天与狗尾巴草"){corner=1em}
```

**效果如下**：

带有扩展属性的[道盒](https://www.everkm.cn){color=orangered}链接。

![Air](https://images.unsplash.com/photo-1564979045531-fa386a275b27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80 "蓝天与狗尾巴草"){corner=1em}

---


## 下划线

```markdown
{ul}#下划线#
```

{ul}#下划线#

## 上标

```markdown
E=MC^2^
```

E=MC^2^

## 下标

```markdown
H~2~O
```

H~2~O


## 高亮

```markdown
I need to highlight these ==very important words==.
```

I need to highlight these ==very important words==.

HTML结果

```html
I need to highlight these <mark>very important words</mark>.
```

## 特殊字符替换

```markdown
| => &#124;
> => &gt;
< => &lt;
(C) © 版权
(TM) ™ 商标
(R) ® 注册商标
-- —— 破折号
... …​省略号
-> → 右箭头
<- ← 左箭头
=> ⇒ 右双箭头
<= ⇐ 左双箭头
```

## 常用符号

1. [HTML特殊符号](https://chaooo.github.io/unicode_css3_content/)
2. [emoji表情符号](https://gist.github.com/rxaviers/7360908)

```markdown
emoji表情符号

:+1:
```

:+1: :point_right: 查找emoji[表情](https://github-emoji-picker.rickstaa.dev/) :smile: :muscle: 。


# 定义

属性集

:   使用花括号包裹的属性集合，多个属性之间用空格或逗号隔开。


# 参考



[^markdown-syntax]: <https://daringfireball.net/projects/markdown/syntax>

[^gfm]: <https://github.github.com/gfm/>

[道盒发布]: https://publish.everkm.cn

[^slugify]: 将文本转换成有效的链接字符。英文字母数字保持原样，空格替换为`-`，中文每个字符转换拼音后，使用`-`连接。==注:exclamation:==：字母+中文的连接处没有连字符`-`，如果需要请在中间添加英文空格。

[道盒笔记]: https://note.everkm.cn