export type Option = {
  name: string;
  values: string[];
};

export type CardProps = {
  id: string;
  title: string;
  productType: string;
  country: string;
  minPrice: number;
  maxPrice: number;
  images: string[];
  options: Option[];
};

export type CartProductProps = {
  id: string;
  title: string;
  price: number;
  image: string;
  caseColor: string;
  strapColor: string;
};

export type Product = {
  id: string;
  title: string;
  minPrice: string;
  quantity: number;
  images: string[];
};

export type SidebarProps = {
  setActiveSection: (section: string) => void;
  className?: string;
};

export type OrderItem = {
  id: string;
  handle: string;
  name: string;
  vendor: string;
  options: Option[];
  price: string;
  quantity: number;
  subtotal: string;
  image: string;
};

export type Order = {
  id: string;
  date: string;
  status: string;
  total: string;
  shipping: string;
  tax: string;
  subtotal: string;
  items: OrderItem[];
};
