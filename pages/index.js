import Head from "next/head";
import { Geist } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Navbar from "@/pages/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Gizmo360 - Tech Blog & Insights</title>
        <meta name="description" content="Latest tech news, tutorials, and in-depth analysis of cutting-edge technology" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`${styles.page} ${geistSans.variable}`}>
        <Navbar />
        <main className={styles.main}>
          <h1 className={styles.title}>Gizmo360</h1>
          <p className={styles.subtitle}>Stay ahead with the latest in technology</p>

          <div className={styles.featuredPosts}>
            <h2 className={styles.sectionTitle}>Featured Articles</h2>
            <div className={styles.content}>
              <div className={styles.card}>
                <span className={styles.tag}>AI & ML</span>
                <h3>The Future of AI in 2025</h3>
                <p>Exploring the latest breakthroughs in artificial intelligence and their impact on society.</p>
                <div className={styles.cardMeta}>
                  <span>5 min read</span>
                  <span>•</span>
                  <span>Trending</span>
                </div>
              </div>

              <div className={styles.card}>
                <span className={styles.tag}>Web Dev</span>
                <h3>Modern Web Development</h3>
                <p>Best practices and frameworks that are shaping the future of web development.</p>
                <div className={styles.cardMeta}>
                  <span>8 min read</span>
                  <span>•</span>
                  <span>Popular</span>
                </div>
              </div>

              <div className={styles.card}>
                <span className={styles.tag}>Cybersecurity</span>
                <h3>Security in the Digital Age</h3>
                <p>Essential cybersecurity practices and emerging threats in the tech landscape.</p>
                <div className={styles.cardMeta}>
                  <span>6 min read</span>
                  <span>•</span>
                  <span>New</span>
                </div>
              </div>
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
