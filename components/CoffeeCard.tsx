import { TouchableOpacity, Image, Text, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { Heart } from "lucide-react-native";

import { Coffee } from "../types";
import { useCoffee } from "../context/CoffeeContext";

type Props = {
  coffee: Coffee;
};

export default function CoffeeCard({ coffee }: Props) {
  const router = useRouter();

  const { favorites, addFavorite, removeFavorite } = useCoffee();

  const isFavorite = favorites.some((item) => item.uid === coffee.uid);

  function toggleFavorite() {
    if (isFavorite) {
      removeFavorite(coffee.id);
    } else {
      addFavorite(coffee);
    }
  }

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => router.push(`/coffee/${coffee.id}`)}
    >
      <Image source={{ uri: coffee.image }} style={styles.image} />

      {/* heart button */}
      <TouchableOpacity style={styles.heartButton} onPress={toggleFavorite}>
        <Heart
          size={20}
          color={isFavorite ? "#ff4d6d" : "#222"}
          fill={isFavorite ? "#ff4d6d" : "transparent"}
        />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>{coffee.title}</Text>

        <Text style={styles.description} numberOfLines={2}>
          {coffee.description}
        </Text>

        <Text style={styles.price}>€ {coffee.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    marginBottom: 16,
    overflow: "hidden",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,

    elevation: 4,
  },

  image: {
    width: "100%",
    height: 180,
  },

  heartButton: {
    position: "absolute",
    top: 12,
    right: 12,

    width: 38,
    height: 38,
    borderRadius: 19,

    backgroundColor: "white",

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  content: {
    padding: 14,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
    marginBottom: 6,
  },

  description: {
    color: "#666",
    fontSize: 13,
    lineHeight: 18,
  },

  price: {
    marginTop: 10,
    fontWeight: "800",
    color: "#c67c4e",
    fontSize: 15,
  },
});
