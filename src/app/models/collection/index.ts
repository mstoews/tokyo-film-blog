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

export interface Collections {
  id:               string;
  title:            string;
  body:             string;
  user_updated:     string;
  date_created:     string;
  date_updated:     string;
  image:            string;
  published:        boolean;
}

export interface CollectionsPartial {
  id: string;
  title:   string;
  date_created: string;
  published: boolean;
}

export interface CollectionsComments {
  id: string;
  col_id: string;
  name: string;
  message: string;
  created_date: string;
  reply: string;
  reply_date: string
}






