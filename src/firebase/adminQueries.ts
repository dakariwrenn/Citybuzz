// Example: admin-only query to see who posted what
import { db } from './firestore';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';

export async function getPostsByUser(uid: string) {
  let ref = collection(db, 'posts');
  let q = query(ref, orderBy('createdAt', 'desc'));
  let snap = await getDocs(q);
  return snap.docs
    .map(doc => ({ id: doc.id, ...doc.data() }))
    .filter(post => post.uid === uid);
}

// Example: get all users for admin dashboard
export async function getAllUsers() {
  let ref = collection(db, 'users');
  let snap = await getDocs(ref);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
