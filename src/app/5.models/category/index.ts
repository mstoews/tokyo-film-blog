import { DocumentReference } from "firebase/firestore";

export interface Category {
  id?: string;
  name: string;
  description: string;
  image: string;
  createDate: string;
  updateDate: string;
  updateBy: string;
}

export type CategoryRef = DocumentReference<Category>;
export interface CategorySnap extends Category {
  category: Category[];
}

