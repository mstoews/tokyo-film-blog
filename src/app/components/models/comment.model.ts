import firebase from 'firebase/compat/app';
import Timestamp = firebase.firestore.Timestamp;

export interface Comments {
  id: string;
  description: string;
  longDescription: string;
  enteredAt: Timestamp;
  user: string;
}

