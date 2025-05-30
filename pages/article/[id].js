import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '@/styles/Article.module.css';
import Navbar from '../components/Navbar';
import { Geist } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function Article() {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/articles?id=${id}`)
        .then(res => res.json())
        .then(data => {
          if (data.message === 'Article not found') {
            router.push('/404');
          } else {
            setArticle(data);
          }
        })
        .catch(error => console.error('Error fetching article:', error));
    }
  }, [id, router]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{article.title} - Gizmo360</title>
        <meta name="description" content={article.excerpt} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`${styles.page} ${geistSans.variable}`}>
        <Navbar />
        <main className={styles.main}>
          <article className={styles.article}>
            <span className={styles.tag}>{article.category}</span>
            <h1 className={styles.title}>{article.title}</h1>
            <div className={styles.meta}>
              <span>{article.readTime}</span>
              <span>•</span>
              <span>{article.status}</span>
            </div>
          </article>
        </main>
      </div>
    </>
  );
}
