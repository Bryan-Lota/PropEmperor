export interface Property {
  id: string;
  title: string;
  location: string;
  price: number; // Stored as number for filtering
  priceDisplay: string; // Formatted string
  type: 'Sale' | 'Rent' | 'Short-Let' | 'Lease';
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  description: string;
  images: string[];
  features: string[];
  status: 'Available' | 'Sold' | 'Pending';
  isFeatured: boolean;
  videoUrl?: string;
  createdAt: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string; // We'll map this to Lucide icons
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin';
}