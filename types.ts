import React from 'react';

export interface Product {
  id: string;
  name: string;
  description: string;
  priceRange: string;
  category: string;
  image: string;
  /** Lower unit prices for larger orders, e.g. [{ minQty: 51, price: 5000 }, { minQty: 100, price: 4000 }]. */
  bulkPricing?: { minQty: number; price: number }[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export enum PageRoutes {
  HOME = '/',
  SHOP = '/shop',
  ACADEMY = '/academy',
  ABOUT = '/about',
  SERVICES = '/services',
  CONTACT = '/contact'
}