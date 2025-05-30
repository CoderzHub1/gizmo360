import "@/styles/globals.css";
import "@/styles/nprogress.css";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// NProgress configuration
NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: false,
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
