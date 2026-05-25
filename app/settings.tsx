import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
} from "react-native";

import { useRouter } from "expo-router";
import { useCoffee } from "../context/CoffeeContext";

export default function Settings() {
  const router = useRouter();
  const { all, updateCoffee } = useCoffee();

  const [editMode, setEditMode] = useState(false);

  const [selected, setSelected] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  function handleBack() {
    if (router.canGoBack?.()) {
      router.back();
    } else {
      router.replace("/");
    }
  }

  function openEdit(item: any) {
    setSelected(item);
    setTitle(item.title);
    setPrice(String(item.price));
  }

  function saveEdit() {
    if (!selected) return;

    updateCoffee(selected.id, {
      ...selected,
      title: title.trim(),
      price: Number(price),
    });

    setSelected(null);
    setTitle("");
    setPrice("");
  }

  function closeModal() {
    setSelected(null);
    setTitle("");
    setPrice("");
  }

  return (
    <View style={styles.container}>
      {}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Settings</Text>

        <View style={{ width: 30 }} />
      </View>

      {}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>App instellingen</Text>
        <Text style={styles.text}>👤 Account</Text>
        <Text style={styles.text}>⚙️ Preferences</Text>
      </View>

      {}
      <TouchableOpacity
        style={styles.editBtn}
        onPress={() => setEditMode(!editMode)}
      >
        <Text style={styles.editText}>
          {editMode ? "Stop bewerken" : "✏️ Bewerken"}
        </Text>
      </TouchableOpacity>

      {}
      {editMode && (
        <FlatList
          data={all}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={{ paddingBottom: 40 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => openEdit(item)}
            >
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemPrice}>€{item.price}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      {}
      <Modal visible={!!selected} transparent animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Bewerk koffie</Text>

            <TextInput
              value={title}
              onChangeText={setTitle}
              style={styles.input}
              placeholder="Naam"
            />

            <TextInput
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
              style={styles.input}
              placeholder="Prijs"
            />

            <TouchableOpacity onPress={saveEdit} style={styles.saveBtn}>
              <Text style={styles.saveText}>Opslaan</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={closeModal} style={styles.closeBtn}>
              <Text style={styles.closeText}>Sluiten</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f6f6f6",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  back: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
  },

  card: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },

  cardTitle: {
    fontWeight: "700",
    marginBottom: 8,
  },

  text: {
    paddingVertical: 4,
    color: "#444",
  },

  editBtn: {
    backgroundColor: "#000",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 10,
  },

  editText: {
    color: "white",
    fontWeight: "700",
  },

  item: {
    backgroundColor: "white",
    padding: 12,
    marginBottom: 8,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  itemTitle: {
    fontWeight: "600",
  },

  itemPrice: {
    color: "#666",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },

  modal: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
  },

  modalTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },

  saveBtn: {
    backgroundColor: "#000",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  saveText: {
    color: "white",
    textAlign: "center",
    fontWeight: "700",
  },

  closeBtn: {
    padding: 10,
    alignItems: "center",
  },

  closeText: {
    color: "#666",
  },
});
