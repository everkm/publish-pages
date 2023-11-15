---
date: 2023-11-15 22:27
---

Markdown 支持样式有限，为了更好的满足个性化需要，道盒Markdown支持 dcard 功能，md 文件中输入如下：

<pre>
```yaml dcard/bilibili
vid: video_id
```
</pre>

上述内容片段声明使用 `bilibili` 的 dcard, 格式同代码块，但上下文参数格式仅支持 `json`, `yaml`, 其内容在渲染dcard模板时，作为模板参数传递。

dcard 模板文件名为  `<dcard_name>.dcard.html`，manifest文件名为  `<dcard_name>.dcard.yaml`。
同一dcard资源需要放在同一目录下。
主题自有的 dcard 保存在模板目录下的任意子目录中，项目 dcard 保存在 work_dir 或者 dev_dir 下的 `dcard` 目录中任意子目录。

## Manifest 配置

```yaml
# 名称，必须
name: bilibili2

# 静态资源，可选
assets:
  # 需要注入到页面的资源
  inject: 
    - assets/b.css
    - assets/a.js
  # 需要发布的资源，
  files:
    - assets/**/*.{css,js}
```

注意：资源路径必须使用基于当前 manifest 目录的相对路径。