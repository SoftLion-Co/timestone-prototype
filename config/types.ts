export type CardProps = {
  id: string;
  handle: string;
  quantity: number;
  title: string;
  productType: string;
  country: string;
  minPrice: number;
  maxPrice: number;
  images: string[];
  price: number;
  vendor: string;
  image: string;
  options: Option[];
};

export type CartProductProps = {
  id: string;
  handle: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  maxQuantity: number;
  caseColor: string;
  strapColor: string;
};

export type Product = {
  id: string;
  title: string;
  productType: string;
  price: string;
  handle: string;
  quantity: number;
  description: string;
  vendor: string;
  images: string[];
  options: Option[];
};

export type Option = {
  name: string;
  values: string[];
};