export type CardProps = {
  id: string;
  title: string;
  productType: string;
  country: string;
  minPrice: number;
  maxPrice: number;//?
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
	productType: string;
	minPrice: string;
	maxPrice: string;
	currencyCode: string;
	quantity: number;
	images: string[];
	description: string;
	options: Option[];
	handle: string;
 };

export type Option = {
	name: string;
	values: string[];
 };