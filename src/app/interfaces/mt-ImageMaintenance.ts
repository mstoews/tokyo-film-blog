import { Timestamp } from "firebase/firestore";

export interface IImageMaintenance {
  id:               number;
  title:            string;
  sub_title:        string;
  image_url:        string;
  applied:          boolean;
  user_updated:     string;
  date_created:     string;
  date_updated:     string;
}

export interface IImageStorage {
  name: string;
  parentId: string;
  url: string | null;
  version_no: number;
}


