import { Property, Service, Testimonial } from './types';

export const COMPANY_NAME = "PropEmperor Real Estate";
export const FOUNDER_NAME = "Chiemerie";
export const FOUNDER_BIO = "Chiemerie is a visionary real estate entrepreneur dedicated to transforming the property landscape in Enugu with integrity and innovation.";
export const COMPANY_PHONE = "2348000000000"; // Replace with actual number
export const COMPANY_LOCATION = "Independence Layout, Enugu, Nigeria";

export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com',
  facebook: 'https://facebook.com',
  twitter: 'https://twitter.com',
  linkedin: 'https://linkedin.com'
};

// Full 16 Services
export const SERVICES: Service[] = [
  { id: 's1', title: 'Buying & Selling', description: 'Premium brokerage for high-value assets.', iconName: 'Banknote' },
  { id: 's2', title: 'Renting & Leasing', description: 'Connecting tenants with luxury homes.', iconName: 'Key' },
  { id: 's3', title: 'Property Management', description: 'End-to-end asset care and maintenance.', iconName: 'ShieldCheck' },
  { id: 's4', title: 'Real Estate Consulting', description: 'Expert market analysis and advice.', iconName: 'Briefcase' },
  { id: 's5', title: 'Property Valuation', description: 'Accurate estimation of asset value.', iconName: 'TrendingUp' },
  { id: 's6', title: 'Property Marketing', description: 'Cinematic listing presentation.', iconName: 'Megaphone' },
  { id: 's7', title: 'Tenant Placement', description: 'Vetting high-quality occupants.', iconName: 'Users' },
  { id: 's8', title: 'Lease Agreements', description: 'Legal frameworks for secure tenancy.', iconName: 'FileText' },
  { id: 's9', title: 'Facility Management', description: 'Operational efficiency for complexes.', iconName: 'Settings' },
  { id: 's10', title: 'Construction', description: 'Building your vision from scratch.', iconName: 'Hammer' },
  { id: 's11', title: 'Site Inspections', description: 'Thorough evaluation of property state.', iconName: 'Search' },
  { id: 's12', title: 'Title Verification', description: 'Ensuring clean and legal documentation.', iconName: 'CheckCircle' },
  { id: 's13', title: 'Land Surveying', description: 'Precision mapping and boundary definition.', iconName: 'Map' },
  { id: 's14', title: 'Project Development', description: 'From concept to completion.', iconName: 'Building' },
  { id: 's15', title: 'Short-Let Management', description: 'Optimizing returns for holiday rentals.', iconName: 'Clock' },
  { id: 's16', title: 'Mortgage Guidance', description: 'Navigating financing options.', iconName: 'Landmark' },
];

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'p1',
    title: 'The Emperor\'s Villa',
    location: 'Independence Layout, Enugu',
    price: 150000000,
    priceDisplay: '₦150,000,000',
    type: 'Sale',
    bedrooms: 6,
    bathrooms: 7,
    sqft: 6500,
    description: 'A masterpiece of modern architecture featuring smart home automation, a private cinema, and an infinity pool overlooking the city. This property represents the pinnacle of luxury living in Enugu.',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
    ],
    features: ['Swimming Pool', 'Home Cinema', 'Smart Home', 'Gym', 'BQ', 'Solar Power'],
    status: 'Available',
    isFeatured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'p2',
    title: 'Golf Estate Duplex',
    location: 'GRA, Enugu',
    price: 8000000,
    priceDisplay: '₦8,000,000 / yr',
    type: 'Rent',
    bedrooms: 4,
    bathrooms: 5,
    sqft: 3200,
    description: 'Luxury serviced duplex within the prestigious Golf Estate. 24/7 security and power supply. Ideal for expatriates and executives.',
    images: [
      'https://images.unsplash.com/photo-1600596542815-6000255db693?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
    ],
    features: ['Golf Course Access', '24/7 Power', 'Uniformed Security', 'Fitted Kitchen'],
    status: 'Available',
    isFeatured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'p3',
    title: 'Trans-Ekulu Plots',
    location: 'Trans-Ekulu, Enugu',
    price: 12000000,
    priceDisplay: '₦12,000,000',
    type: 'Sale',
    bedrooms: 0,
    bathrooms: 0,
    sqft: 4000,
    description: 'Prime dry land perfect for immediate development. Certified C of O available. Located in a rapidly developing neighborhood.',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1626286762372-20c242a32509?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
    ],
    features: ['Dry Land', 'C of O', 'Perimeter Fencing', 'Tarred Road Access'],
    status: 'Pending',
    isFeatured: false,
    createdAt: new Date().toISOString()
  }
];