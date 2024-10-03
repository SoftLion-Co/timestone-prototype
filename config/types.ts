import { StaticImageData } from 'next/image';

export type CardProps = {
  product_id: string;
  model: string;
  price: number;
  photo_url: StaticImageData;
  type: string;
  country: string;
  case: string;
  case_size: number;
  case_color: string;
  straps: string;
  strap_color: string;
  dial_color: string;
  coating: string;
  glass: string;
  water_resistance: string;
  movement: string;
  instantaneus_rate: string;
  standard_battery_life: string;
};
