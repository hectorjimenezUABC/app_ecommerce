import { NavigatorScreenParams } from "@react-navigation/native";

/* =================== MODELOS =================== */
export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

/* =================== PARAM LISTS =================== */

// Drawer (raíz)
export type RootDrawerParamList = {
  MainStack: NavigatorScreenParams<MainStackParamList>;
};

// Stack principal
export type MainStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabsParamList>;
  ProductDetails: { productId: number };
  Checkout: undefined;
  Login: undefined;
};

// Bottom Tabs
export type MainTabsParamList = {
  Home: undefined;
  Cart: undefined;
  Profile: undefined;
};
