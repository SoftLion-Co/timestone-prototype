export type CardProps = {
  id: string;
  handle: string;
  quantity: number;
  title: string;
  productType: string;
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
  price: string;
  quantity: number;
  subtotal: string;
  image: string;
};

export type Order = {
  id: string;
  number: string;
  date: string;
  status: string;
  total: string;
  items: OrderItem[];
};

export type Option = {
  name: string;
  values: string[];
};
