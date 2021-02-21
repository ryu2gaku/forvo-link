# forvo-link

使用 forvo 搜索右键选中的内容。

## 简介

Forvo 是个很好用的语言学习站，但是每次在查询某个内容的读音时，都要繁琐地打开 Forvo 页面后输入查询内容，这个过程操作多次的话枯燥耗时。该插件可以简单用光标选中目标内容后，打开右键菜单点击按钮项跳转到目标内容的 Forvo 查询结果页面。

另外，之前使用的时候，遇到点击发音按钮却无法发音的情况，当时的解决办法是直接使用科学上网，但是现在梯子越来越少，使用起来总归是很不方便 😞。

后来发现了导致这种情况的原因。浏览器的控制台会输出：

```
Failed to load resource: 发生 SSL 错误，无法建立到该服务器的安全连接。
https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
```

这是因为网站为了加快访问速度，使用了 Google 的 CDN，明明是德政，但是对于来自 C-H-I-N-A 的我们而言就是一记重拳了 😢。于是乎建议同时使用 [ReplaceGoogleCDN](https://github.com/justjavac/ReplaceGoogleCDN) 插件将 Google 的 CDN 替换为国内的。

## 安装

Chrome 浏览器的安装方法

- 下载压缩包后解压，找到 chrome 子目录
- 输入 `chrome://extensions/` 或者 <kbd>更多工具</kbd> - <kbd>扩展程序</kbd> 进入扩展程序页面
- 打开 <kbd>开发者模式</kbd>
- 选择 <kbd>加载已解压的扩展程序</kbd> 定位到 chrome 子目录
- 关闭 <kbd>开发者模式</kbd>
