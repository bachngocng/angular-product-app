export interface Product {
  id?: number;
  name?: string;
  image?: FormData;
  price?: number;
  description?: string;
  category?: {
    id?: number,
    name?: string
  };
}
