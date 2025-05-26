import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  readTime: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'New'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Article || mongoose.model('Article', ArticleSchema);
