import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { navigation } = props;

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollContainer}>
      {/* Header del Drawer — avatar, nombre, email */}
      <View style={styles.drawerHeader}>
        <Image
          source={{ uri: "https://www.transparentpng.com/download/monkey/uC9aSC-monkey-png-images-free-download.png" }}
          style={styles.avatar}
        />
        <Text style={styles.userName}>Hector Jimenez </Text>
        <Text style={styles.userEmail}>hector@uabc.com</Text>
      </View>

      <View style={styles.divider} />

      {/* Lista automática de items del Drawer.Navigator */}
      <DrawerItemList {...props} />

      <View style={styles.divider} />

      {/* Footer — botón Cerrar Sesión */}
      <View style={styles.drawerFooter}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            navigation.closeDrawer();
            // Navega a la pantalla Login dentro del Stack
            navigation.navigate("MainStack", { screen: "Login" });
          }}
        >
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingTop: 50,
  },
  drawerHeader: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#e2e8f0",
    marginBottom: 12,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
  },
  userEmail: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: "#e2e8f0",
    marginVertical: 10,
    marginHorizontal: 15,
  },
  drawerFooter: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  logoutButton: {
    backgroundColor: "#fee2e2",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutText: {
    color: "#dc2626",
    fontSize: 15,
    fontWeight: "600",
  },
});