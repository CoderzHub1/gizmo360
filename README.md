# Gizmo360 - Tech Blog & Insights

A Next.js web application with Mongoose authentication.

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- MongoDB (local installation or cloud service like MongoDB Atlas)
- Yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd gizmo360
```

2. Install dependencies:
```bash
yarn install
```

3. Create a `.env.local` file in the root directory with the following environment variables:
```
MONGODB_URI=mongodb://localhost:27017/gizmo360
```

Replace the MongoDB URI with your own connection string if you're using MongoDB Atlas.

### Running the Development Server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Features

- User authentication (login/registration) with Mongoose
- Tech blog with articles and categories
- Modern responsive design
- Schema-based models with validation

## Database Setup

If you're using a local MongoDB installation:

1. Make sure MongoDB is running on your machine
2. The database and collections will be created automatically by Mongoose when you first interact with them

If you're using MongoDB Atlas:

1. Create a cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a database user with read/write permissions
3. Whitelist your IP address
4. Get your connection string and replace it in the `.env.local` file

## Testing the Database Connection

After setting up your environment variables, you can test the database connection by visiting:

[http://localhost:3000/api/test-connection](http://localhost:3000/api/test-connection)

You should see a JSON response confirming the connection was successful.

## API Endpoints

- `POST /api/login` - User login with Mongoose validation
- `POST /api/register` - User registration with Mongoose schema validation
- `GET /api/test-connection` - Test database connection

## Models

### User Model

The application uses Mongoose schemas for data validation and structure:

```javascript
{
  email: {
    type: String,
    required: true,
    unique: true,
    // Email format validation included
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}
```

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
