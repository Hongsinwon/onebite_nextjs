import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  // 리액트의 앱컴퍼넌트와 동일한기능 -> 모든 컴퍼넌트의 부모 (루트 컴퍼넌트)
  // next에서는 모든 페이지 컴퍼넌트의 부모
  return (
    <>
      <header>글로벌 헤더</header>
      <Component {...pageProps} />
    </>
  );
}
