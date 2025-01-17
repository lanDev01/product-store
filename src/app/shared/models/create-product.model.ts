import { Product } from "./product.model";

export type ProductPayload = Omit<Product, 'id'>
