export type CardPropsOptions = {
  name: string;
  values: string[];
};

export type CardProps = {
  id: string;
  title: string;
  productType: string;
  country: string;
  minPrice: number;
  images: string[];
  options: CardPropsOptions[];
};

export type CartProductProps = {
  id: string;
  title: string;
  price: number;
  image: string;
  caseColor: string;
  strapColor: string;
};

export type Product =  {
  id: string;
  title: string;
  minPrice: string;
  quantity: number;
  images: string[];
};