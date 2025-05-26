import articles from '../../data/articles.json';
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'GET') {
    // If an id is provided, return a specific article
    const { id } = req.query;
    if (id) {
      const article = articles.articles.find(article => article.id === id);
      if (article) {
        res.status(200).json(article);
      } else {
        res.status(404).json({ message: 'Article not found' });
      }
    } else {
      // Otherwise return all articles
      res.status(200).json(articles);
    }
  } else if (req.method === 'POST') {
    try {
      const { title, category, excerpt, content, readTime = '5 min read', status = 'New' } = req.body;

      if (!title || !category || !excerpt || !content) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      // Create article ID from title (slug)
      const id = title.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      if (articles.articles.some(article => article.id === id)) {
        return res.status(400).json({ message: 'Article with similar title already exists' });
      }

      const newArticle = {
        id,
        title,
        category,
        excerpt,
        content,
        readTime,
        status
      };

      // Add new article to the array
      articles.articles.push(newArticle);

      // Write back to the JSON file
      const filePath = path.join(process.cwd(), 'data', 'articles.json');
      fs.writeFileSync(filePath, JSON.stringify(articles, null, 2), 'utf8');

      res.status(201).json(newArticle);
    } catch (error) {
      console.error('Error adding article:', error);
      res.status(500).json({ message: 'Error adding article' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
