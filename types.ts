export interface CategoryMutation {
  title: string;
  description: string;
}

export interface Category {
  id: number;
  title: string;
  description: string;
}

export interface PlacesMutation {
  title: string;
  description: string;
}

export interface Place {
  id: number;
  title: string;
  description: string;
}

export interface ItemsMutation {
  categoryId: number;
  placeId: number;
  title: string;
  description: string;
  image: string | null;
}

export interface Item {
  id: number;
  categoryId: number;
  placeId: number;
  title: string;
  description: string;
  image: string | null;
  created_at: string;
}