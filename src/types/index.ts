export interface Project {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  year: string;
  vimeoId: string;
}

export interface Client {
  id: number;
  name: string;
  logoUrl: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
  bio: string;
}

export enum Tab {
  PORTFOLIO = 'PORTFOLIO',
  CLIENTS = 'CLIENTS',
  TEAM = 'TEAM',
  ABOUT = 'ABOUT',
  CONTACT = 'CONTACT'
}
