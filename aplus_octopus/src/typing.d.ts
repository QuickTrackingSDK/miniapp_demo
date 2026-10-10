declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}

// 支付宝小程序全局对象
declare const my: any;

// 小程序全局页面栈 API
declare const getCurrentPages: any;
