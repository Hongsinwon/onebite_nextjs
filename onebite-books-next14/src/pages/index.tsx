import SearchableLayout from "@/components/searchable-layout";
import { ReactNode } from "react";
import BookItem from "@/components/book-item";
import style from "./index.module.css";
import { InferGetStaticPropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";
import Head from "next/head";

export const getStaticProps = async () => {
  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);

  return {
    props: {
      allBooks,
      recoBooks,
    },
  };
};

export default function Home({
  allBooks,
  recoBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      {/* SEO 설정 */}
      <Head>
        <title>한입북스</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입북스" />
        <meta
          property="og:description"
          content="한입 북스에 등록된 도서들을 만나보세요"
        />
      </Head>
      <div className={style.container}>
        <section>
          <h3>지금 추천하는 도서</h3>
          {recoBooks.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </section>
        <section>
          <h3>등록된 모든 도서</h3>
          {allBooks.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </section>
      </div>
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};

//페이지 라우터 정리
// [장점]
// 1. 파일 시스템 기반의 간편한 페이지 라우팅 제공 [pages 기반]
// 2. 다양한 방식의 사전 렌더링 제공(SSR/SSG/ISG)
// SSR(서버사이드 렌더링) : 요청이 들어올 때 마다 사전 렌더링을 진행
// SSG(정적 사이트 생성) : 빌드 타임에 미리 페이지를 사전 렌더링
// ISR(증분 정적 재생성) : SSG 페이지 일정 시간마다 재생성

//[단점]
//1. 페이지별 레이아웃 설정이 번거롭다.
//2. 데이퍼 페칭이 페이지 컴포넌트에 집중된다.
//3. 불 필요한 컴포넌트들도 JS Bundle에 포함된다.
