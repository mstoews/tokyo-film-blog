import { Timestamp } from "firebase/firestore";
import { IProduct } from '../products/mt-Products';

export interface IImageMaintenance {
  id:               number;
  title:            string;
  sub_title:        string;
  image_url:        string;
  applied:          boolean;
  user_updated:     string | null | undefined;
  date_created:     string;
  date_updated:     string;
}

export interface ICollectionMaintenance {
  id:               number;
  title:            string;
  color:            string;
  price:            string;
  sub_title:        string;
  image_url:        string;
  applied:          boolean;
  inventory:        IProduct[];
  user_updated:     string | null | undefined;
  date_created:     string;
  date_updated:     string;
}


export interface IImageStorage {
  name: string;
  parentId: string;
  url: string | null;
  version_no: number;
}


