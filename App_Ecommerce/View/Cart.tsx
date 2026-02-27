import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainTabsParamList, MainStackParamList } from "../types/navigation";
import { useCart } from "../context/CartContext";
import { AntDesign } from "@expo/vector-icons";

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabsParamList, "Cart">,
  NativeStackScreenProps<MainStackParamList>
>;

export default function Cart({ navigation }: Props) {
  const { items, removeFromCart, updateQuantity, getTotal, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <AntDesign name="shopping-cart" size={64} color="#94a3b8" />
        <Text style={styles.emptyTitle}>Tu carrito está vacío</Text>
        <Text style={styles.emptySubtitle}>
          Agrega productos para comenzar tu compra
        </Text>
        <Pressable
          style={styles.shopButton}
          onPress={() => navigation.navigate("MainTabs", { screen: "Home" })}
        >
          <Text style={styles.shopButtonText}>Ir a la tienda</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mi Carrito</Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.product.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.product.image }} style={styles.image} />
            <View style={styles.cardBody}>
              <Text style={styles.productName} numberOfLines={2}>
                {item.product.name}
              </Text>
              <Text style={styles.price}>
                ${item.product.price.toFixed(2)}
              </Text>

              {/* Controles de cantidad */}
              <View style={styles.quantityRow}>
                <Pressable
                  style={styles.qtyBtn}
                  onPress={() =>
                    updateQuantity(item.product.id, item.quantity - 1)
                  }
                >
                  <Text style={styles.qtyBtnText}>−</Text>
                </Pressable>
                <Text style={styles.qtyText}>{item.quantity}</Text>
                <Pressable
                  style={styles.qtyBtn}
                  onPress={() =>
                    updateQuantity(item.product.id, item.quantity + 1)
                  }
                >
                  <Text style={styles.qtyBtnText}>+</Text>
                </Pressable>
              </View>
            </View>

            <Pressable
              style={styles.removeBtn}
              onPress={() =>
                Alert.alert("Eliminar", "¿Quitar este producto del carrito?", [
                  { text: "Cancelar" },
                  {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: () => removeFromCart(item.product.id),
                  },
                ])
              }
            >
              <AntDesign name="delete" size={20} color="#ef4444" />
            </Pressable>
          </View>
        )}
      />

      {/* Resumen */}
      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total:</Text>
          <Text style={styles.summaryValue}>${getTotal().toFixed(2)}</Text>
        </View>

        <Pressable
          style={styles.checkoutButton}
          onPress={() => navigation.navigate("Checkout")}
        >
          <Text style={styles.checkoutButtonText}>Finalizar Compra</Text>
        </Pressable>

        <Pressable
          style={styles.clearButton}
          onPress={() =>
            Alert.alert("Vaciar carrito", "¿Estás seguro?", [
              { text: "Cancelar" },
              { text: "Vaciar", style: "destructive", onPress: clearCart },
            ])
          }
        >
          <Text style={styles.clearButtonText}>Vaciar carrito</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e293b",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  list: {
    paddingHorizontal: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    padding: 20,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 15,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 24,
  },
  shopButton: {
    backgroundColor: "#0f766e",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  shopButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: "#e2e8f0",
  },
  cardBody: {
    flex: 1,
    marginLeft: 12,
  },
  productName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 2,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0f766e",
    marginBottom: 6,
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  qtyBtn: {
    width: 30,
    height: 30,
    borderRadius: 6,
    backgroundColor: "#e2e8f0",
    justifyContent: "center",
    alignItems: "center",
  },
  qtyBtnText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
  },
  qtyText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    minWidth: 24,
    textAlign: "center",
  },
  removeBtn: {
    padding: 8,
  },
  removeBtnText: {
    fontSize: 20,
  },
  summary: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  summaryLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1e293b",
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0f766e",
  },
  checkoutButton: {
    backgroundColor: "#0f766e",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
  clearButton: {
    alignItems: "center",
    paddingVertical: 8,
  },
  clearButtonText: {
    color: "#ef4444",
    fontSize: 14,
    fontWeight: "500",
  },
});
