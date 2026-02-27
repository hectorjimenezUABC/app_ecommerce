import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Alert,
  TextInput,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { useCart } from "../context/CartContext";
import { AntDesign } from "@expo/vector-icons";

type Props = NativeStackScreenProps<MainStackParamList, "Checkout">;

export default function Checkout({ navigation }: Props) {
  const { items, getTotal, clearCart } = useCart();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const handleConfirm = () => {
    if (!name.trim() || !address.trim()) {
      Alert.alert("Campos requeridos", "Por favor completa nombre y dirección.");
      return;
    }

    Alert.alert(
      "¡Compra exitosa!",
      `Gracias ${name}, tu pedido de $${getTotal().toFixed(2)} será enviado a:\n${address}`,
      [
        {
          text: "Aceptar",
          onPress: () => {
            clearCart();
            navigation.navigate("MainTabs", { screen: "Home" });
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Checkout</Text>

      {/* Resumen del pedido */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Resumen del Pedido</Text>
        {items.map((item) => (
          <View key={item.product.id} style={styles.itemRow}>
            <Text style={styles.itemName}>
              {item.product.name} × {item.quantity}
            </Text>
            <Text style={styles.itemPrice}>
              ${(item.product.price * item.quantity).toFixed(2)}
            </Text>
          </View>
        ))}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${getTotal().toFixed(2)}</Text>
        </View>
      </View>

      {/* Datos de envío */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Datos de Envío</Text>
        <Text style={styles.inputLabel}>Nombre completo</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Ej. Juan Pérez"
          placeholderTextColor="#94a3b8"
        />
        <Text style={styles.inputLabel}>Dirección</Text>
        <TextInput
          style={[styles.input, styles.inputMultiline]}
          value={address}
          onChangeText={setAddress}
          placeholder="Calle, número, ciudad, CP"
          placeholderTextColor="#94a3b8"
          multiline
          numberOfLines={3}
        />
      </View>

      {/* Método de pago (simulado) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Método de Pago</Text>
        <View style={styles.paymentCard}>
          <AntDesign name="credit-card" size={28} color="#0f766e" />
          <View>
            <Text style={styles.paymentText}>Tarjeta terminada en 4242</Text>
            <Text style={styles.paymentSub}>Visa •••• 4242</Text>
          </View>
        </View>
      </View>

      {/* Botón de confirmar */}
      <Pressable style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>
          Confirmar Pedido (${getTotal().toFixed(2)})
        </Text>
      </Pressable>

      <Pressable style={styles.cancelButton} onPress={() => navigation.goBack()}>
        <Text style={styles.cancelButtonText}>Volver al carrito</Text>
      </Pressable>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1e293b",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  section: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  itemName: {
    fontSize: 14,
    color: "#475569",
    flex: 1,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1e293b",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    marginTop: 10,
    paddingTop: 10,
  },
  totalLabel: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1e293b",
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0f766e",
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 6,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#1e293b",
    backgroundColor: "#f8fafc",
  },
  inputMultiline: {
    height: 80,
    textAlignVertical: "top",
  },
  paymentCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    padding: 14,
    borderRadius: 10,
    gap: 12,
  },
  paymentIcon: {
    fontSize: 28,
  },
  paymentText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1e293b",
  },
  paymentSub: {
    fontSize: 13,
    color: "#64748b",
    marginTop: 2,
  },
  confirmButton: {
    backgroundColor: "#0f766e",
    marginHorizontal: 16,
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 10,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  cancelButton: {
    alignItems: "center",
    paddingVertical: 10,
    marginHorizontal: 16,
  },
  cancelButtonText: {
    color: "#64748b",
    fontSize: 15,
    fontWeight: "500",
  },
});
