// Add to your firestore code (add or update these methods)
import { db } from './firestore-core'; // your firebase config/init
import { collection, addDoc, updateDoc, doc, increment } from 'firebase/firestore';

// ...existing methods

// Vote on event (yes/no)
export async function voteEvent(eventId: string, vote: 'yes' | 'no') {
  const field = vote === 'yes' ? 'votesYes' : 'votesNo';
  await updateDoc(doc(db, 'posts', eventId), { [field]: increment(1) });
}
