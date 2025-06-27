// TypeScript example for Node.js/Express + MongoDB

// User
interface User {
  _id: string;
  city: string; // e.g., "New York"
  createdAt: Date;
  // (Optional) anonymous_id, profile, etc.
}

// Post
interface Post {
  _id: string;
  city: string;
  userId: string; // or anonymous_id
  content: string;
  imageUrl?: string;
  createdAt: Date;
  upvotes: number;
  downvotes: number;
  replies: Reply[];
}

// Reply
interface Reply {
  _id: string;
  postId: string;
  userId: string; // or anonymous_id
  content: string;
  createdAt: Date;
}
