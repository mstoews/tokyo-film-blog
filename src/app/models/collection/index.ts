import { Product } from '../products'
export interface Collection {
  id:               number;
  title:            string;
  color:            string;
  price:            string;
  sub_title:        string;
  image_url:        string;
  applied:          boolean;
  inventory:        Product[];
  user_updated:     string | null | undefined;
  date_created:     string;
  date_updated:     string;
}
