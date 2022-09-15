import firebase from 'firebase/compat/app';
import Timestamp = firebase.firestore.Timestamp;
import { Comments } from './comment.model';
import { ImageUrl} from './imageUrl.model'

export interface Blog {
  id: string;
  description: string;
  url: ImageUrl[];
  longDescription: string;
  iconUrl: string;
  categories: string[];
  comments: Comments[]
  likeCount: number;
  promo: boolean;
  promoStartAt: Timestamp;
}

