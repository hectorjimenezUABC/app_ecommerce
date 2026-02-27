import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainTabsParamList, MainStackParamList } from "../types/navigation";
import { AntDesign } from "@expo/vector-icons";

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabsParamList, "Profile">,
  NativeStackScreenProps<MainStackParamList>
>;

export default function Profile({ navigation }: Props) {
  return (
    <View style={styles.container}>
      {/* Avatar y datos */}
      <View style={styles.profileCard}>
        <Image
          source={{ uri: "https://www.transparentpng.com/download/monkey/uC9aSC-monkey-png-images-free-download.png" }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Hector Jimenez</Text>
        <Text style={styles.email}>hector@uabc.com</Text>
      </View>

      {/* Opciones del perfil */}
      <View style={styles.optionsList}>
        <OptionItem icon="inbox" label="Mis Pedidos" />
        <OptionItem icon="environment" label="Direcciones" />
        <OptionItem icon="credit-card" label="Métodos de Pago" />
        <OptionItem icon="notification" label="Notificaciones" />
        <OptionItem icon="question" label="Ayuda y Soporte" />
      </View>

      <Pressable
        style={styles.logoutButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </Pressable>
    </View>
  );
}

function OptionItem({ icon, label }: { icon: string; label: string }) {
  return (
    <Pressable style={styles.optionItem}>
      <AntDesign name={icon as any} size={20} color="#475569" style={{ marginRight: 14 }} />
      <Text style={styles.optionLabel}>{label}</Text>
      <Text style={styles.optionArrow}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  profileCard: {
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#e2e8f0",
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1e293b",
  },
  email: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 4,
  },
  optionsList: {
    backgroundColor: "#fff",
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  optionIcon: {
    fontSize: 20,
    marginRight: 14,
  },
  optionLabel: {
    flex: 1,
    fontSize: 16,
    color: "#1e293b",
  },
  optionArrow: {
    fontSize: 22,
    color: "#94a3b8",
  },
  logoutButton: {
    marginTop: 20,
    marginHorizontal: 16,
    backgroundColor: "#fee2e2",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  logoutText: {
    color: "#dc2626",
    fontSize: 16,
    fontWeight: "600",
  },
});
