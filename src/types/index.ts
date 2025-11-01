export interface Product {
  id: string;
  name: string;
  price: number;
  image: string | number;
  category: string;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: keyof typeof import('@expo/vector-icons')['Ionicons']['glyphMap'];
  color: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  discount?: string;
  backgroundColor?: string;
}

export type RootStackParamList = {
  MainTabs: undefined;
};

export type MainTabsParamList = {
  Home: undefined;
  Products: undefined;
  Services: undefined;
  Profile: undefined;
};

