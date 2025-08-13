import GlobalLayout from "@/components/global-layout";
import "@/styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode;
};

export default function App({
  Component,
  pageProps,
}: AppProps & { Component: NextPageWithLayout }) {
  // 리액트의 앱컴퍼넌트와 동일한기능 -> 모든 컴퍼넌트의 부모 (루트 컴퍼넌트)
  // next에서는 모든 페이지 컴퍼넌트의 부모

  const router = useRouter();
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

  // const onClickButton = () => {
  //   router.push("/test");
  // };

  // useEffect(() => {
  //   router.prefetch("/test");
  // }, []);

  return <GlobalLayout>{getLayout(<Component {...pageProps} />)}</GlobalLayout>;
}
