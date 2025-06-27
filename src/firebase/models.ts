// Firestore models for users and posts

export interface User {
  uid: string;
  phone?: string;
  email?: string;
  city: string;
  createdAt: number;
  isAdmin?: boolean;
}

export interface Post {
  id: string;
  uid: string; // Used for admin/audit only, not shown in app
  city: string;
  content: string;
  createdAt: number;
  type: 'post' | 'event';
  eventDate?: number;
  eventTitle?: string;
  eventLocation?: string;
  // ...other fields as needed
}
