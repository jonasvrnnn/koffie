import { Heart, Check } from "lucide-react-native";
import { useLocalSearchParams } from "expo-router";
import {
  ScrollView,
  Text,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
} from "react-native";

import { useRef, useState } from "react";

import ScreenContainer from "../../components/ScreenContainer";
import Header from "../../components/Header";

import { useCoffee } from "../../context/CoffeeContext";
import { sendOrderNotification } from "../../services/notification";

export default function CoffeeDetail() {
  const { id } = useLocalSearchParams();

  const { all, addFavorite, removeFavorite, addOrder, favorites } = useCoffee();

  const foundCoffee = all.find((c) => c.id === Number(id));

  if (!foundCoffee) return null;

  const coffee = foundCoffee;

  const [showPopup, setShowPopup] = useState(false);
  const popupAnim = useRef(new Animated.Value(0)).current;

  const isFavorite = favorites.some((c) => c.id === coffee.id);

  async function handleOrder() {
    addOrder(coffee);

    await sendOrderNotification(coffee.title);

    setShowPopup(true);

    Animated.sequence([
      Animated.timing(popupAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.delay(1200),
      Animated.timing(popupAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => setShowPopup(false));
  }

  function toggleFavorite() {
    if (isFavorite) {
      removeFavorite(coffee.id);
    } else {
      addFavorite(coffee);
    }
  }

  return (
    <ScreenContainer>
      <Header title={coffee.title} back />

      {/* POPUP */}
      {showPopup && (
        <Animated.View
          style={[
            styles.popup,
            {
              opacity: popupAnim,
              transform: [
                {
                  translateY: popupAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-30, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Check size={18} color="white" />
          <Text style={styles.popupText}>Bestelling toegevoegd</Text>
        </Animated.View>
      )}

      <ScrollView>
        <Image source={{ uri: coffee.image }} style={styles.image} />

        <View style={styles.content}>
          <Text style={styles.title}>{coffee.title}</Text>

          <Text style={styles.desc}>{coffee.description}</Text>

          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.orderBtn}
              onPress={handleOrder}
              activeOpacity={0.9}
            >
              <Text style={styles.orderText}>Bestellen</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.heartButton}
              onPress={toggleFavorite}
              activeOpacity={0.8}
            >
              <Heart
                size={22}
                color={isFavorite ? "#ff4d6d" : "#222"}
                fill={isFavorite ? "#ff4d6d" : "transparent"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 280,
  },

  content: {
    padding: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 8,
  },

  desc: {
    color: "#555",
    lineHeight: 20,
  },

  buttons: {
    flexDirection: "row",
    marginTop: 20,
    gap: 10,
    alignItems: "center",
  },

  orderBtn: {
    flex: 1,
    backgroundColor: "#111",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  orderText: {
    color: "#fff",
    fontWeight: "700",
  },

  heartButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },

  popup: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: "#16a34a",
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    zIndex: 999,
  },

  popupText: {
    color: "white",
    fontWeight: "700",
  },
});
