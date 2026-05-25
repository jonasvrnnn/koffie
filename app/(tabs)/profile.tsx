import React, { useMemo } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { Settings, Trash2 } from "lucide-react-native";
import { router } from "expo-router";

import ScreenContainer from "../../components/ScreenContainer";
import Header from "../../components/Header";
import { useCoffee } from "../../context/CoffeeContext";

export default function Profile() {
  const { orders, removeOrder, updateOrderQuantity } = useCoffee();

  const total = useMemo(() => {
    return orders.reduce((sum, item) => {
      return sum + item.price * (item.quantity || 1);
    }, 0);
  }, [orders]);

  return (
    <ScreenContainer>
      <Header title="Profile" />

      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity
          onPress={() => router.push("/settings")}
          style={styles.settingsBtn}
        >
          <Settings size={18} color="white" />
          <Text style={styles.settingsText}>Settings</Text>
        </TouchableOpacity>

        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>€{total.toFixed(2)}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Bestellingen</Text>

          {orders.length === 0 ? (
            <Text style={styles.empty}>Geen bestellingen</Text>
          ) : (
            orders.map((item, index) => (
              <View key={`${item.id}-${index}`} style={styles.item}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemTitle}>{item.title}</Text>

                  <Text style={styles.sub}>
                    €{item.price} × {item.quantity || 1}
                  </Text>

                  <View style={styles.qtyRow}>
                    <TouchableOpacity
                      onPress={() =>
                        updateOrderQuantity(
                          item.id,
                          Math.max(1, (item.quantity || 1) - 1),
                        )
                      }
                    >
                      <Text style={styles.qtyBtn}>➖</Text>
                    </TouchableOpacity>

                    <Text style={styles.qtyText}>{item.quantity || 1}</Text>

                    <TouchableOpacity
                      onPress={() =>
                        updateOrderQuantity(item.id, (item.quantity || 1) + 1)
                      }
                    >
                      <Text style={styles.qtyBtn}>➕</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => removeOrder(item.id)}
                  style={styles.deleteBtn}
                >
                  <Trash2 size={16} color="white" />
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  settingsBtn: {
    flexDirection: "row",
    gap: 8,
    backgroundColor: "black",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
  },

  settingsText: {
    color: "white",
    fontWeight: "700",
  },

  totalCard: {
    backgroundColor: "black",
    padding: 16,
    borderRadius: 16,
    marginBottom: 15,
  },

  totalLabel: {
    color: "#9ca3af",
    marginBottom: 4,
  },

  totalPrice: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    marginBottom: 10,
    alignItems: "center",
  },

  itemTitle: {
    fontWeight: "600",
  },

  sub: {
    color: "#6b7280",
    marginTop: 2,
  },

  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 10,
  },

  qtyBtn: {
    fontSize: 18,
  },

  qtyText: {
    fontWeight: "700",
  },

  deleteBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#ef4444",
    justifyContent: "center",
    alignItems: "center",
  },

  empty: {
    color: "#999",
  },
});
