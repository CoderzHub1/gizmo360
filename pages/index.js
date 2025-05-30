import { useEffect, useState } from 'react';
import Head from "next/head";
import Link from 'next/link';
import { Geist } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Navbar from "@/pages/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('/api/articles')
      .then(res => res.json())
      .then(data => setArticles(data.articles))
      .catch(error => console.error('Error fetching articles:', error));
  }, []);

  return (
    <>
      <Head>
        <title>Gizmo360 - Tech Blog & Insights</title>
        <meta name="description" content="Latest tech news, tutorials, and in-depth analysis of cutting-edge technology" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <div className={`${styles.page} ${geistSans.variable}`}>
        <main className={styles.main}>
          <h1 className={styles.title}>Gizmo360</h1>
          <p className={styles.subtitle}>Stay ahead with the latest in technology</p>

          <div className={styles.featuredPosts}>
            <h2 className={styles.sectionTitle}>Featured Articles</h2>
            <div className={styles.content}>
              {articles.map(article => (
                <Link href={`/article/${article.id}`} key={article.id} className={styles.card}>
                  <span className={styles.tag}>{article.category}</span>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  <div className={styles.cardMeta}>
                    <span>{article.readTime}</span>
                    <span>•</span>
                    <span>{article.status}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </main>

        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <p>© {new Date().getFullYear()} Gizmo360. All rights reserved.</p>
            <div className={styles.footerLinks}>
              <a href="#">About</a>
              <a href="#">Contact</a>
              <a href="#">RSS Feed</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
