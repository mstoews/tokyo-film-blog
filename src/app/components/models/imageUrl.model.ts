import firebase from 'firebase/compat/app';
import Timestamp = firebase.firestore.Timestamp;

export interface ImageUrl {
  url: string | null;
  name: string;
  version_no: number;
}

