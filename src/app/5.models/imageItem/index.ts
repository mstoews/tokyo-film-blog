import { DocumentReference } from "firebase/firestore";

export interface imageItem {
  id: string;
  parentId: string;
  imageSrc: string;
  imageSrc400?: string;
  imageSrc800?: string;
  largeImageSrc: string;
  imageAlt: string;
  caption: string;
  type: string;
  ranking?: number;
  description?: string;
}

export interface imageItemPartial {
  id?: string;
  imageSrc: string;
  imageAlt: string;
  caption: string;
  type: string;
  description?: string;
}

interface HashMap<T> {
  [key: string]: T;
}


export type ListUpdate<T, K = any> = { key: T, item: K, type: 'added' | 'removed' }

export type OverviewUpdate = ListUpdate<'overview', string>;

export type ImageItemUpdate = ListUpdate<'image_item', string>;
export type ImageItemListUpdate = ImageItemUpdate | OverviewUpdate;

export type ImageItemRef = DocumentReference<imageItem>;

export interface ImageItemSnap extends imageItem {
    images: imageItem[];
}


