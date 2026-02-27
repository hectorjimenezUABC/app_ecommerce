import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { products } from "../data/products";
import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { MainTabsParamList } from "../types/navigation";

// Tipo compuesto: Tab (Home) dentro de Stack (MainStack)
type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabsParamList, "Home">,
  NativeStackScreenProps<MainStackParamList>
>;

export default function Home({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tienda</Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              navigation.navigate("ProductDetails", { productId: item.id })
            }
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.cardBody}>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.productName} numberOfLines={2}>
                {item.name}
              </Text>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1e293b",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  list: {
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  card: {
    width: "47%",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: 140,
    backgroundColor: "#e2e8f0",
  },
  cardBody: {
    padding: 10,
  },
  category: {
    fontSize: 11,
    color: "#64748b",
    textTransform: "uppercase",
    fontWeight: "600",
    marginBottom: 2,
  },
  productName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0f766e",
  },
});
