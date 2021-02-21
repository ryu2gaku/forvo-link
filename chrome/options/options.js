chrome.extension
  // global chrome.extension.getBackgroundPage()
  // 返回扩展里当前运行的 background 页面的 JavaScript “window” 对象。
  // 若扩展无 background 页则返回 null。
  .getBackgroundPage()
  .getOptionsSetting()
  .then(function (result) {
    // 设置 Forvo 页面语言的默认选项
    document.getElementById("page-lang").childNodes.forEach(function (element) {
      if (element.value == result.pageLang) {
        element.selected = true;
      }
    });

    // 选择框添加 change 事件
    document
      .getElementById("page-lang")
      .addEventListener("change", function (e) {
        chrome.storage.sync.set({
          pageLang: e.target.value,
        });
      });
  });
