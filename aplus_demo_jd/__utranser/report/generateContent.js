/*
 * @Author: hexujie
 * @Date: 2021-03-11 17:38:18
 * @LastEditTime: 2021-06-08 17:44:34
 * @LastEditors: hexujie
 * @Description: 
 */

var _$ = {
  addClass: function (target, attr) {
    const originClass = target.getAttribute('class');
    const originClassArray = originClass.split(' ');
    const _originClassArray = originClassArray.filter(className => className !== attr);
    _originClassArray.push(attr);
    const _class = _originClassArray.join(' ');
    target.setAttribute('class', _class);
    return this;
  },
  removeClass: function (target, attr) {
    const originClass = target.getAttribute('class');
    const newClass = originClass.replace(attr, '').trim();
    target.setAttribute('class', newClass);
    return this;
  },
  sibllings: function (target) {
    const parent = _$.findParent(target);
    const allTargetElements = parent.children;
    return Array.from(allTargetElements).filter(ele => ele !== target);
  },
  findParent: function (target) {
    return target.parentNode;
  },
  isTypeFile: function (filePath, type) {
    var reg = new RegExp(`\\.${type}$`);
    return reg.test(filePath);
  },
  empty: function (target) {
    Array.from(target.children).forEach(child => {
      target.removeChild(child);
    });
  },
}

/**
 * @description: 把常用DOM的方法注入到window上
 * @param {*}
 * @return {*}
 */
function injectDomApi() {
  var elementApi = ['createElement', 'getElementsByClassName', 'getElementsByTagName', 'getElementById'];

  elementApi.forEach(domApiName => {
    window[domApiName] = function (ele) {
      return document[domApiName](ele);
    };
  });
}


(function () {
  var getDialogHead = function() {
    return `
      <div class="dialog-header">
        <span class="dialog-title">详情</span>
        <span class="dialog-close-icon">
          <svg viewBox="64 64 896 896" focusable="false" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg>
        </span>
      </div>
    `
  };
  
  var removeDialog = function() {
    getElementsByTagName('body')[0].removeChild(getElementsByClassName('dialog-mask')[0]);
  };

  var dialogEventInit = function() {
    // close event init
    getElementsByClassName('dialog-close-icon')[0].addEventListener('click', function() {
      removeDialog();
    });
  };

  var createDialog = function(filename) {
    const dialogMask = createElement('div');
    dialogMask.classList.add('dialog-mask');

    const dialogPanel = createElement('div');
    dialogPanel.classList.add('dialog-panel');
    
    const body = getElementsByTagName('body')[0];
    body.appendChild(dialogMask);

    const dialogHead = getDialogHead();

    dialogPanel.innerHTML = dialogHead;

    dialogMask.appendChild(dialogPanel);

    var dialogContent = getDialogContent(filename);

    dialogEventInit();
  };

  var getDialogContent = function(filename) {
    if (new RegExp('\\.' + transferRules.sourcefileName.js + '$').test(filename)) {
      createJsContent(filename);
    }
    else if (new RegExp('\\.' + transferRules.sourcefileName.html + '$').test(filename)) {
      createJxmlContent(filename);
    }
    else if (new RegExp('\\.' + transferRules.sourcefileName.json + '$').test(filename)) {
      createJsonContent(filename);
    }
    else if (new RegExp('\\.' + transferRules.sourcefileName.css + '$').test(filename)) {
      createCssContent(filename);
    }
  };
  
  /**
   * @description: create dialog body's html content of js file
   * @param {*} filename
   * @return {*}
   */  
  var createJsContent = function(filename) {
    const apiInfo = data[filename].api;
    const apiList = [];
    let apiNum = 0;
    
    if (apiInfo) {
      const apiArray = Object.keys(apiInfo);
      apiNum = apiArray.length;
      apiArray.forEach(apiName => {
        const { type } = apiInfo[apiName]; 
        if (type === 0) {
          apiList.push({
            name: `${apiName}`,
            type: '<span style="color: red;">API不存在</span>',
          });
        }
        if (type === 2) {
          apiList.push({
            name: `${apiName}`,
            type: '<span style="color: #ff9800;">部分特性不支持</span>',
          });
        }
      });
    }

    const dialogContentTitile = `
      <div style="margin-bottom: 10px;">
        <div style="display: flex;">
          <span style="flex-shrink: 0;">文件：</span>
          <p style="word-break: break-all;">${filename}</p>
        </div>
      </div>
      <div class="dialog-api-title">
        <p style="color: green;font-size: 18px;">API</p>
        <p style="padding: 20px 0;">共检测到${apiNum}个API，其中${apiList.length}个API在${transferRules.targetName}中存在不同程度的差异，请检查是否需要调整。</p>
      </div>
    `;

    const dialogContentApiList = createTableBody(apiList, function(current) {
      return `
          <td>${current.name}</td>
          <td style="text-align: center;">${current.type}</td>
      `;
    });

    const dialogBody = createElement('div');
    dialogBody.classList.add('dialog-body');
    dialogBody.innerHTML = dialogContentTitile;

    const dialogPanel = getElementsByClassName('dialog-panel')[0];

    dialogPanel.appendChild(dialogBody);
    dialogBody.appendChild(dialogContentApiList);
  };

  var createJxmlContent = function(filename) {
    const info = data[filename].component;
    const list = [];
    let num = 0;
    
    if (info) {
      const compoArray = Object.keys(info);
      num = compoArray.length;
      compoArray.forEach(name => {
        const { type } = info[name]; 
        if (type === 0) {
          list.push({
            name: `${name}`,
            type: '<span style="color: red;">组件不存在</span>',
          });
        }
        if (type === 2) {
          list.push({
            name: `${name}`,
            type: '<span style="color: #ff9800;">部分特性不支持</span>',
          });
        }
      });
    }

    const dialogContentTitile = `
      <div style="margin-bottom: 10px;">
        <p>文件：${replaceFileExtName(filename)}</p>
      </div>
      <div class="dialog-api-title">
        <p style="color: green;font-size: 18px;">组件</p>
        <p style="padding: 20px 0;">共检测到${num}个组件，其中${list.length}个组件在${transferRules.targetName}中存在不同程度的差异，请检查是否需要调整。</p>
      </div>
    `;

    const dialogContentList = createTableBody(list, function(current) {
      return `
          <td>${current.name}</td>
          <td style="text-align: center;">${current.type}</td>
      `;
    });

    const dialogBody = createElement('div');
    dialogBody.classList.add('dialog-body');
    dialogBody.innerHTML = dialogContentTitile;

    const dialogPanel = getElementsByClassName('dialog-panel')[0];

    dialogPanel.appendChild(dialogBody);
    dialogBody.appendChild(dialogContentList);
  };
  var replaceFileExtName = function (filename) {
    if (typeof filename === 'string') {
      const extReg = /\.([a-z]+)$/;
      const extName = filename.match(extReg)[1];
      const targetExtName = transferRules.file.find((way) => way.from === extName).to;
      return filename.replace(extName, targetExtName);
    }
  }
  var createJsonContent = function(filename) {
    const dialogContentTitile = `
      <div style="margin-bottom: 10px;">
        <p>文件：${filename}</p>
      </div>
      <div class="dialog-api-title">
        <p style="color: green;font-size: 18px;">配置</p>
        <p style="padding: 20px 0;">暂无配置差异</p>
      </div>
    `;
    const dialogBody = createElement('div');
    dialogBody.classList.add('dialog-body');
    dialogBody.innerHTML = dialogContentTitile;

    const dialogPanel = getElementsByClassName('dialog-panel')[0];

    dialogPanel.appendChild(dialogBody);
  };

  var createCssContent = function(filename) {
    const dialogContentTitile = `
    <div style="margin-bottom: 10px;">
      <p>文件：${replaceFileExtName(filename)}</p>
    </div>
    <div class="dialog-api-title">
      <p style="color: green;font-size: 18px;">样式</p>
      <p style="padding: 20px 0;">暂无样式差异</p>
    </div>
  `;
  const dialogBody = createElement('div');
  dialogBody.classList.add('dialog-body');
  dialogBody.innerHTML = dialogContentTitile;

  const dialogPanel = getElementsByClassName('dialog-panel')[0];

  dialogPanel.appendChild(dialogBody);
  };


  var createTableHeader = function (headArray = []) {
    const table = createElement('table');

    const th = headArray.reduce((thStr, current) => {
      return thStr + `<th>${current}</th>`
    }, '');

    table.innerHTML = `
      <thead>
        <tr>
          ${th}
        </tr>
      </thead>
    `;
    return table;
  };

  var createTableBody = function (data = [], createTr) {
    var table = createElement('table');

    const tr = data.reduce((accumulate, current) => {
      return accumulate + `
        <tr>
          ${createTr(current)}
        </tr>
      `
    }, '')

    table.innerHTML = `
      <tbody>
        ${tr}
      </tbody>
    `;

    return table;
  };

  /**
   * @description: refresh table dom
   * @param {*} srcElement
   * @return {*}
   */
  var refreshTableData = function (srcElement) {
    var dataType = srcElement.getAttribute('data-type');
    var jsFileArray = getDataByFileType(dataType);
    var tableBody = createTableBody(jsFileArray, function(current) {
      return `
          <td>${current.name}</td>
          <td style="text-align: center">${current.type}</td>
          <td class="detail-btn" style="text-align: center" data-filename="${current.path}">详情</td>
      `;
    });
    tableBody.classList.add('component-table');

    var tableWrapper = getElementsByClassName('u-table-body')[0];
    // clear origin element content
    getElementsByClassName('component-table')[0] && getElementsByClassName('component-table')[0].remove();

    tableWrapper.appendChild(tableBody);
  };

  /**
   * @description: add or remove active class when click tab bar
   * @param {*} srcElement
   * @return {*}
   */
  var setBarActiveStyle = function (srcElement) {
    _$.addClass(srcElement, 'active');
    var sibllings = _$.sibllings(srcElement);
    sibllings.forEach(eachSib => _$.removeClass(eachSib, 'active'));
  };

  var tabBarInit = function () {
    const tabBarWrapper = getElementsByClassName('tab-bar-wrapper')[0];

    tabBarWrapper.addEventListener('click', function (e) {
      const { srcElement } = e;
      // acitve
      setBarActiveStyle(srcElement);
      // table refresh
      refreshTableData(srcElement);
    });
    
    const { js, json, html, css } = transferRules.sourcefileName;

    const tabbarElementArray = [js, json, html, css];

    const getTransTo = (sourceFileName) => {
      if (sourceFileName === 'js') return 'js';
      if (sourceFileName === 'json') return 'json';
      const transTo = transferRules.file.find((way) => way.from === sourceFileName);
      return transTo.to;
    }

    tabbarElementArray.map((sourceFileName) => {
      const node = document.createElement('div');
      node.setAttribute('class', 'tab-bar-item');
      node.setAttribute('data-type', sourceFileName);

      node.innerText = getTransTo(sourceFileName);
      tabBarWrapper.appendChild(node);
    });
  };

  var getReport = function () {
    const thead = createTableHeader([
      '文件名', '支持程度', '操作'
    ]);
    const tableWrapper = getElementsByClassName('u-table-header')[0];
    tableWrapper.appendChild(thead);
  };

  var getSupportLevel = function (fileType, path) {
    const info = data[path];
    let isSupported = true;

    if (fileType === transferRules.sourcefileName.js) {
      const apiInfo = info.api;
      isSupported = apiInfo ? Object.keys(apiInfo).every(apiName => apiInfo[apiName].type === 1) : true;
    }
    if (fileType === transferRules.sourcefileName.html) {
      const componentInfo = info.component;
      isSupported = componentInfo ? Object.keys(componentInfo).every(name => componentInfo[name].type === 1) : true;
    }
    if (fileType === transferRules.sourcefileName.json) {
      isSupported = true;
    }
    if (fileType === transferRules.sourcefileName.css) {
      isSupported = true;
    }
    const showText = isSupported ? '<span style="color: black;">完全支持</span>' : '<span style="color: #ff9800;">部分支持</span>';
    
    return {
      showText,
      isSupported,
    }
  };

  var getFileNameByPath = function (path = '') {
    const reg = /[0-9a-zA-Z_-]+\.[a-zA-Z_-]+$/g;
    let fileName = path.match(reg);
    if (fileName) {
      const targetHtml = transferRules.file.find((item) => item.from === transferRules.sourcefileName.html);
      const targetCss = transferRules.file.find((item) => item.from === transferRules.sourcefileName.css);
      fileName = fileName[0].replace(transferRules.sourcefileName.html, targetHtml.to).replace(transferRules.sourcefileName.css, targetCss.to);
    }
    return fileName;
  };
  /**
   * @description: get table source data by file type
   * @param {*} fileType eg: 'js'
   * @return {*}
   */
  var getDataByFileType = function (fileType) {
    const supportedArray = [];
    const unSupportedArray = [];

    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        if (_$.isTypeFile(key, fileType)) {
          const supportLevel = getSupportLevel(fileType, key);
          const fileItem = {
            path: key,
            name: getFileNameByPath(key) || key,
            type: supportLevel.showText,
          };
          if (supportLevel.isSupported) {
            supportedArray.push(fileItem);
          } else {
            unSupportedArray.push(fileItem);
          }
        }
      }
    }
    return [...unSupportedArray, ...supportedArray];
  };
  /**
   * @description: support level = (supported num + partial supported num * 0.5) / total num
   * @param {*}
   * @return {*}
   */  
  var getSupportLevelOfAllFile = function() {
    const { api, component } = countInfoOfAllFile;
    const supportedTotal = api.supportedNum + api.partialSupportedNum * 0.5 + component.supportedNum + component.partialSupportedNum * 0.5;
    const totalNum = api.supportedNum + api.partialSupportedNum + api.unSupportedNum + component.supportedNum + component.partialSupportedNum + component.unSupportedNum;
    return Math.floor(supportedTotal / totalNum * 100) + '%';
  };
  var getTransWayName = function (way) {
    switch (way) {
      case 'wx-jd': 
        return '微信 => 京东';
      case 'jd-wx':
        return '京东 => 微信';
      default: 
        return '';
    }
  };
  var getTransTypeName = function (type) {
    switch (type) {
      case 'mp': 
        return '小程序';
      case 'mp-plugin':
        return '小程序插件';
      default: 
        return '';
    }
  };
  /**
   * @description: 转换概要
   * @param {*}
   * @return {*}
   */
  var briefInit = function () {
    const { projectName, path, transWay, transType } = brief;
    const projectNameDom = getElementsByClassName('project-name')[0];
    const projectTransTypeDom = getElementsByClassName('project-trans-type')[0];
    const projectTransWayDom = getElementsByClassName('project-trans-way')[0];
    const pathDom = getElementsByClassName('project-path')[0];
    const supportedDom = getElementsByClassName('supported-level')[0];
    projectNameDom.innerText = projectName;
    projectTransTypeDom.innerText = getTransTypeName(transType);
    projectTransWayDom.innerText = getTransWayName(transWay);
    pathDom.innerText = path;
    // support level count
    const supportLevel = getSupportLevelOfAllFile(); 
    supportedDom.innerText = supportLevel;
  };

  var eventInit = function () {
    // click to view detail
    getElementsByClassName('u-table-body')[0].addEventListener('click', function(e) {
      const { srcElement } = e;
      if (srcElement.className === 'detail-btn') {
        const { filename } = srcElement.dataset;
        createDialog(filename);
      }
    })
  };

  var dataInit = function() {
    const tabBarList = getElementsByClassName('tab-bar-item');
    Array.from(tabBarList).forEach(tabBar => {
      if (tabBar.dataset && tabBar.dataset.type === 'js') {
        tabBar.click();
      }
    })
  };

  var main = function () {
    injectDomApi();
    tabBarInit();
    getReport();
    briefInit();
    eventInit();
    dataInit();
  }

  main();
})();