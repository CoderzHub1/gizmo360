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
            <div className={styles.content}>
              {Array.isArray(article.content) ? (
                article.content.map((block, index) => {
                  if (block.type === 'text') {
                    return <p key={index}>{block.value}</p>;
                  } else if (block.type === 'image') {
                    return (
                      <div key={index} className={styles.imageContainer}>
                        <img 
                          src={block.url} 
                          alt={block.caption || ''} 
                          className={styles.articleImage}
                        />
                        {block.caption && (
                          <p className={styles.imageCaption}>{block.caption}</p>
                        )}
                      </div>
                    );
                  } else if (block.type === 'table') {
                    return (
                      <div key={index} className={styles.tableContainer}>
                        {block.caption && <h3 className={styles.tableCaption}>{block.caption}</h3>}
                        <table className={styles.table}>
                          <thead>
                            <tr>
                              {block.headers.map((header, i) => (
                                <th key={i}>{header}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {block.rows.map((row, rowIndex) => (
                              <tr key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                  <td key={cellIndex}>{cell}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    );
                  }
                  return null;
                })
              ) : (
                <p>{article.content}</p>
              )}
            </div>
          </article>
        </main>
      </div>
    </>
  );
}
