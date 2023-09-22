
export interface Product {
  id:   string;
  description:   string;
  category:     string;
  rich_description: string;
  date_created: string;
  short_description?: string;
  product_id?: string;
  image?:     string;
  image200?:  string;
  brand?:        string;
  price?:        number;
  rating?:       string;
  is_featured?:  string;
  user_updated?: string;
  date_updated?: string;
  status?: string;
  purchases_allowed?: boolean;
  quantity_required?: boolean;
  is_active?: boolean;
  quantity?: number;
  quantity_increment?: number;
  is_completed?: boolean;
  user_purchased?: string;
  date_sold?: string;
}

