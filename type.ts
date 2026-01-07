export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  priceDisplay: string;
  type: 'Sale' | 'Rent' | 'Short-Let' | 'Lease';
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  description: string;
  images: string[];
  features: string[];
  status: 'Available' | 'Sold' | 'Pending';
  isFeatured: boolean;
  createdAt?: string;
}

export interface Service {
  id: string | number;
  title: string;
  description: string;
  iconName: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
}
