/**
 * 获取选项设置
 * pageLang - FORVO 页面语言，默认为中文
 * @returns {Promise}
 */
function getOptionsSetting() {
  return new Promise((resolve, reject) => {
    // 异步获取存储数据
    // ==============
    // ✔ 在扩展程序中本地存储数据可以通过 chrome.storage API 实现
    // ✔ 如果要使用 chrome.storage 则需要在 manifest 的 permissions 申请 "storage"
    // chrome.storage.sync - 需要将存储的内容同步到所有登录了同一账号的 chrome 浏览器中
    // chrome.storage.local
    // ==============
    chrome.storage.sync.get(["pageLang"], (result) => {
      resolve({
        pageLang: result.pageLang || "https://zh.forvo.com/search/",
      });
    });
  });
}

/**
 * 设置右键菜单项
 * @param {string} searchHost
 */
var setupContextMenu = (function () {
  // 右键菜单项的 ID
  var contextMenusID = null;

  /**
   * 当右键菜单项被点击时触发的函数
   * @param {string} searchHost
   */
  function openForvoSearchTab(searchHost) {
    return function (info, tab) {
      var url = encodeURI(`${searchHost}${info.selectionText}`);

      // 创建新的标签
      // ===========
      // chrome.tabs.create(object createProperties, function callback)
      // 注意：无需请求 manifest 的标签权限，此方法也可以被使用。
      chrome.tabs.create({
        // 标签在窗口中的位置。值在零至标签数量之间。
        index: tab.index + 1,
        // 标签导航的初始页面。
        url: url,
      });
    };
  }

  return function (searchHost) {
    if (!contextMenusID) {
      // 创建一个新的右键菜单项
      // ===================
      // integer Chrome.contextMenus.create(object createProperties, function callback)
      contextMenusID = chrome.contextMenus.create({
        // 右键菜单项的类型。默认为 "normal"。
        type: "normal",
        // 右键菜单项的显示文字。
        // 如果类型为 "selection"，可以在字符串中使用 %s 显示选定的文本。
        // 例如，如果参数的值为 "Translate '%s' to Pig Latin"，而用户还选中了文本 "cool"，
        // 那么显示在菜单中的将会是 "Translate 'cool' to Pig Latin"。
        title: '使用Forvo搜索 "%s"',
        contexts: ["selection"],
        // 当菜单项被点击时触发的函数。
        // 参数：
        // - info ( OnClickData ): 右键菜单项被点击时相关的上下文信息。
        //   - selectionText ( optional string )
        //   如果点击时选择了文本，则为选中的文本内容。
        //   - ...
        // - tab ( Tab ): 右键菜单项被点击时，当前标签的详细信息。
        onclick: openForvoSearchTab(searchHost),
      });
    } else {
      chrome.contextMenus.update(contextMenusID, {
        onclick: openForvoSearchTab(searchHost),
      });
    }
  };
})();

// 启动右键菜单项
getOptionsSetting().then((result) => {
  var searchHost = result.pageLang;
  setupContextMenu(searchHost);
});

// 监听 storage 值的改变
chrome.storage.onChanged.addListener((changes) => {
  // 当选项设置中当 FORVO 页面语言更改时，重新启动右键菜单项
  if (changes.pageLang) {
    // 从日语变更为中文时
    // {newValue: "https://zh.forvo.com/search/", oldValue: "https://ja.forvo.com/search/"}
    console.log("chrome.storage.onChanged", changes.pageLang);
    setupContextMenu(changes.pageLang.newValue);
  }
});
