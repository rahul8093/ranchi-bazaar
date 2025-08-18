// lib/saleor/types/menu.ts

export interface MenuChild {
  id: string;
  name: string;
}

export interface MenuItem {
  id: string;
  name: string;
  url: string | null;
  level: number;
  page: {
    id: string;
    slug: string;
    title: string;
  } | null;
  category: {
    id: string;
    name: string;
    slug: string;
  } | null;
  collection: {
    id: string;
    name: string;
    slug: string;
  } | null;
  parent: {
    id: string;
    name: string;
  } | null;
  children: MenuChild[]; // Only shallow data
}

export interface Menu {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface GetMenuItemsResponse {
  menu: Menu | null;
}
