import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { AntDesign } from "@expo/vector-icons";

type Props = NativeStackScreenProps<MainStackParamList, "ProductDetails">;

export default function ProductDetails({ route, navigation }: Props) {
  const { productId } = route.params;
  const product = products.find((p) => p.id === productId);
  const { addToCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);

  // Header dinámico con título del producto y botón de favorito/compartir
  useEffect(() => {
    navigation.setOptions({
      title: product?.name ?? "Producto",
      headerRight: () => (
        <View style={{ flexDirection: "row", gap: 12, marginRight: 8 }}>
          <Pressable onPress={() => setIsFavorite((prev) => !prev)}>
            <AntDesign name={isFavorite ? "heart" : "heart-o"} size={22} color={isFavorite ? "#ef4444" : "#64748b"} />
          </Pressable>
          <Pressable
            onPress={() =>
              Alert.alert("Compartir", `Mira este producto: ${product?.name}`)
            }
          >
            <AntDesign name="share-alt" size={22} color="#64748b" />
          </Pressable>
        </View>
      ),
    });
  }, [navigation, product, isFavorite]);

  if (!product) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Producto no encontrado</Text>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backBtnText}>Volver</Text>
        </Pressable>
      </View>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    Alert.alert(
      "Añadido al carrito",
      `${product.name} se ha añadido a tu carrito.`,
      [
        { text: "Seguir comprando" },
        {
          text: "Ver carrito",
          onPress: () =>
            navigation.navigate("MainTabs", { screen: "Cart" }),
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.heroImage} />

      <View style={styles.body}>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Descripción</Text>
        <Text style={styles.description}>{product.description}</Text>

        <View style={styles.divider} />

        <Pressable style={styles.addButton} onPress={handleAddToCart}>
          <Text style={styles.addButtonText}>Añadir al carrito</Text>
        </Pressable>

        <Pressable
          style={styles.buyButton}
          onPress={() => {
            addToCart(product);
            navigation.navigate("Checkout");
          }}
        >
          <Text style={styles.buyButtonText}>Comprar ahora</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "#ef4444",
    marginBottom: 16,
  },
  backBtn: {
    padding: 12,
    backgroundColor: "#0f766e",
    borderRadius: 8,
  },
  backBtnText: {
    color: "#fff",
    fontWeight: "600",
  },
  heroImage: {
    width: "100%",
    height: 300,
    backgroundColor: "#e2e8f0",
  },
  body: {
    padding: 20,
  },
  category: {
    fontSize: 13,
    color: "#64748b",
    textTransform: "uppercase",
    fontWeight: "600",
    marginBottom: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 8,
  },
  price: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0f766e",
  },
  divider: {
    height: 1,
    backgroundColor: "#e2e8f0",
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: "#475569",
    lineHeight: 22,
  },
  addButton: {
    backgroundColor: "#0f766e",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
  buyButton: {
    backgroundColor: "#1e293b",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 30,
  },
  buyButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
});
