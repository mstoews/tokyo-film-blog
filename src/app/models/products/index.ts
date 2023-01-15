import { FieldValue } from "firebase/firestore";
import { imageItem } from '../imageItem'
export interface Product {
  id:   string;
  description:   string;
  rich_description: string;
  image:     string;
  brand:        string;
  price:        number;
  category:     string;
  rating:       string;
  is_featured:  string;
  user_updated: string;
  date_created: string;
  date_updated: string;
  // imageUrls: imageItem[];
}


export interface ProductPartial {
  id: string;
  description:   string;
  rich_description: string;
  category:     string;
  date_created: string;
}
