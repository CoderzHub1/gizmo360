import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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
  const router = useRouter();
  const [userEmail, setUserEmail] = useState('');
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const email = localStorage.getItem('userEmail');
    
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      setUserEmail(email);
    }
  }, [router]);

  useEffect(() => {
    fetch('/api/articles')
      .then(res => res.json())
      .then(data => setArticles(data.articles))
      .catch(error => console.error('Error fetching articles:', error));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    router.push('/login');
  };

  return (
    <>
      <Head>
        <title>Gizmo360 - Tech Blog & Insights</title>
        <meta name="description" content="Latest tech news, tutorials, and in-depth analysis of cutting-edge technology" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`${styles.page} ${geistSans.variable}`}>
        <Navbar userEmail={userEmail} onLogout={handleLogout} />
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

          <div className={styles.categories}>
            <h2 className={styles.sectionTitle}>Explore Topics</h2>
            <div className={styles.topicGrid}>
              <a href="#" className={styles.topicCard}>AI & Machine Learning</a>
              <a href="#" className={styles.topicCard}>Web Development</a>
              <a href="#" className={styles.topicCard}>Cybersecurity</a>
              <a href="#" className={styles.topicCard}>Cloud Computing</a>
              <a href="#" className={styles.topicCard}>Mobile Dev</a>
              <a href="#" className={styles.topicCard}>DevOps</a>
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
