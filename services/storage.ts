import { INITIAL_PROPERTIES } from '../constants';
import { Property as PropertyType } from '../types';

const STORAGE_KEY = 'prop_emperor_db_v1';
const AUTH_KEY = 'prop_emperor_auth';

// --- Database Simulation ---

const getDB = (): PropertyType[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    // Seed initial data
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PROPERTIES));
    return INITIAL_PROPERTIES;
  }
  return JSON.parse(stored);
};

const saveDB = (data: PropertyType[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// --- CRUD Operations ---

export const propertyService = {
  getAll: async (): Promise<PropertyType[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return getDB();
  },

  getById: async (id: string): Promise<PropertyType | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const db = getDB();
    return db.find(p => p.id === id);
  },

  create: async (property: Omit<PropertyType, 'id' | 'createdAt'>): Promise<PropertyType> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const db = getDB();
    const newProperty: PropertyType = {
      ...property,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    db.unshift(newProperty); // Add to top
    saveDB(db);
    return newProperty;
  },

  update: async (id: string, updates: Partial<PropertyType>): Promise<PropertyType> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    const db = getDB();
    const index = db.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Property not found');
    
    db[index] = { ...db[index], ...updates };
    saveDB(db);
    return db[index];
  },

  delete: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const db = getDB();
    const filtered = db.filter(p => p.id !== id);
    saveDB(filtered);
  }
};

// --- Auth Simulation ---

export const authService = {
  login: async (email: string, password: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Hardcoded admin for demo
    if (email === 'propemperorrealestate@gmail.com' && password === 'admin123') {
      localStorage.setItem(AUTH_KEY, 'true');
      return true;
    }
    return false;
  },

  logout: () => {
    localStorage.removeItem(AUTH_KEY);
  },

  isAuthenticated: (): boolean => {
    return localStorage.getItem(AUTH_KEY) === 'true';
  }
};
