import { createElement } from 'rax';
import { Root, Style, Script } from 'rax-document';

function Document(props) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no,viewport-fit=cover"/>
        {/* props.title 的值是通过 app.json 分析注入的 */}
        <title>{'props.title'}</title>
        <Style />
        <script type="text/javascript" dangerouslySetInnerHTML={{__html: `
          (function(w, d, s, q) {
            w[q] = w[q] || [];
            var f = d.getElementsByTagName(s)[0],j = d.createElement(s);
            j.async = true;
            j.id = 'beacon-qt';
            j.src = 'https://g.alicdn.com/QTSDK/qt-sdk-javascript/2.5.5/qt_web.umd.js';
            f.parentNode.insertBefore(j, f);
           })(window, document, 'script', 'qt_queue');

          //集成应用的appKey
          qt_queue.push({
            action: 'qt.setMetaInfo',
            arguments: ['appKey', '您的appKey']
          })
          //如果是私有云部署还需要在上面那段JS后面紧接着添加日志域名埋点
          //通常私有云日志服务端域名类似于：quickaplus-web-api.xxx.com.cn, 具体域名要找交付同学要
          qt_queue.push({
            action: 'qt.setMetaInfo',
            arguments: ['trackDomain', '您的收数域名']
          });
          //开启调试模式
          qt_queue.push({
            action: 'qt.setMetaInfo',
            arguments: ['DEBUG', true]
          });

          qt_queue.push({
            action: 'qt.setMetaInfo',
            arguments: ['aplus-auto-exp', [{
              'cssSelector': '.banner_item',
              'logkey': 'test_auto_exp_banner',
              'props': ['data-index'],
            }, {
              'cssSelector': '.exposure-grid-item',
              'logkey': 'test_auto_exp_grid',
              'props': ['data-index', 'data-name'],
            }], ]
          })

          qt_queue.push({
            action: 'qt.setMetaInfo',
            arguments: ['aplus-auto-clk', [{
              'cssSelector': '.auto_clk',
              'logkey': 'test_auto_clk',
              'props': ['data-product', 'data-productColor', 'data-productId'],
            }]]
          })

          qt_queue.push({
            action: 'qt.setMetaInfo',
            arguments: ['_user_id', 'testid']
          });

          qt_queue.push({
            action: 'qt.setMetaInfo',
            arguments: ['pageConfig', {
              '/': {
                pageName: 'home_page_test'
              },
              '/integrate': {
                pageName: 'integrate_page_test'
              },
              '/pv': {
                pageName: 'pv_page_test'
              },
              '/click': {
                pageName: 'clk_page_test'
              },
              '/exposure': {
                pageName: 'exposure_page_test'
              },
            }]
          });
        `}}>
        </script>
      </head>
      <body>
        {/* root container */}
        <Root />
        <Script />
      </body>
    </html>
  );
}

export default Document;