export type CardProps = {
  id: string;
  handle: string;
  quantity: number;
  title: string;
  productType: string;
  price: number;
  vendor: string;
  // одна картинка потрібна не масив
  image: string[];
  options: Option[];
};

export type CartProductProps = {
  id: string;
  handle: string;
  title: string;
  price: number;
  image: string;
  caseColor: string;
  strapColor: string;
};

export type Product = {
  id: string;
  handle: string;
  quantity: number;
  title: string;
  description: string;
  productType: string;
  vendor: string;
  price: string;
  images: string[];
  options: Option[];
};

export type Option = {
  name: string;
  values: string[];
};
