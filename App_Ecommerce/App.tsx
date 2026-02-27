import "react-native-gesture-handler"; // <--- IMPORTANTE: Debe ser la primera línea
import React from "react";
import { Text, View } from "react-native";
import { LinkingOptions } from "@react-navigation/native";
import {
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AntDesign } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  RootDrawerParamList,
  MainStackParamList,
  MainTabsParamList,
} from "./types/navigation";
import { CartProvider, useCart } from "./context/CartContext";
import Home from "./View/Home";
import ProductDetails from "./View/ProductDetails";
import Cart from "./View/Cart";
import Checkout from "./View/Checkout";
import Profile from "./View/Profile";
import Login from "./View/Login";

// Drawer personalizado
import CustomDrawerContent from "./components/CustomDrawerContent";

const Tab = createBottomTabNavigator<MainTabsParamList>();
const Stack = createNativeStackNavigator<MainStackParamList>();
const Drawer = createDrawerNavigator<RootDrawerParamList>();


function MainTabsNavigator() {
  const { getItemCount } = useCart();
  const count = getItemCount();

  return (
    <Tab.Navigator
      id="MainTabs"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#0f766e",
        tabBarInactiveTintColor: "#94a3b8",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopColor: "#e2e8f0",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Inicio",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarLabel: "Carrito",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="shopping-cart" size={size} color={color} />
          ),
          tabBarBadge: count > 0 ? count : undefined,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Mi Perfil",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

/* =================== STACK PRINCIPAL =================== */
function MainStackNavigator() {
  return (
    <Stack.Navigator
      id="MainStack"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="MainTabs" component={MainTabsNavigator} />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{
          headerShown: true,
          title: "Producto",
          headerStyle: { backgroundColor: "#fff" },
          headerTintColor: "#1e293b",
        }}
      />
      <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={{
          headerShown: true,
          title: "Finalizar Compra",
          headerStyle: { backgroundColor: "#fff" },
          headerTintColor: "#1e293b",
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
    </Stack.Navigator>
  );
}

/*DEEP LINKING*/
// Configuración de deep linking para la app
// Prefijos registrados: myapp:// y https://myapp.com
//
// URLs de ejemplo:
//   myapp://home = Pantalla Home
//   myapp://product = ProductDetails
//   myapp://cart = Pantalla Cart
//   myapp://checkout = Pantalla Checkout
//   myapp://profile = Pantalla Profile

const linking: LinkingOptions<RootDrawerParamList> = {
  prefixes: ["myapp://", "https://myapp.com"],
  config: {
    screens: {
      MainStack: {
        screens: {
          MainTabs: {
            screens: {
              Home: "home",
              Cart: "cart",
              Profile: "profile",
            },
          },
          ProductDetails: "product/:productId",
          Checkout: "checkout",
          Login: "login",
        },
      },
    },
  },
};

/* DRAWER */
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CartProvider>
        <NavigationContainer
          linking={linking}
          theme={{
            ...DefaultTheme,
            colors: { ...DefaultTheme.colors, background: "#f8fafc" },
          }}
        >
          <Drawer.Navigator
            id="MainDraw"
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
              headerShown: true,
              drawerActiveTintColor: "#0f766e",
              drawerStyle: {
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            <Drawer.Screen
              name="MainStack"
              component={MainStackNavigator}
              options={{
                title: "HJ SHOP",
                drawerLabel: "Inicio",
                drawerIcon: ({ color, size }) => (
                  <AntDesign name="home" size={size} color={color} />
                ),
              }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </CartProvider>
    </GestureHandlerRootView>
  );
}