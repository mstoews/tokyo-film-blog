import { Product } from '../products'
export interface Orders {
    orderId:          number;
    is_filled:        boolean;
    is_completed:     boolean;
    user_updated:     string;
    date_created:     string;
    date_updated:     string;
    products:         Product[];
}
