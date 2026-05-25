import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

import { useRouter } from "expo-router";
import { ArrowRight } from "lucide-react-native";

import ScreenContainer from "../../components/ScreenContainer";
import Header from "../../components/Header";

import { getAllCoffee } from "../../services/coffeeApi";
import { Coffee } from "../../types";
import { useCoffee } from "../../context/CoffeeContext";

export default function HomeScreen() {
  const [random, setRandom] = useState<Coffee[]>([]);

  const { setAll } = useCoffee();

  const router = useRouter();

  useEffect(() => {
    async function load() {
      const data = await getAllCoffee();

      setAll(data);

      const shuffled = [...data].sort(() => 0.5 - Math.random());

      setRandom(shuffled.slice(0, 2));
    }

    load();
  }, []);

  return (
    <ScreenContainer>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* HERO */}
        <View style={styles.hero}>
          <Text style={styles.smallTitle}>Premium Coffee</Text>

          <Text style={styles.heroTitle}>
            Start your day with{" "}
            <Text style={styles.highlight}>good coffee</Text>
          </Text>

          <Text style={styles.heroDesc}>
            Discover delicious hot and iced coffee drinks made just for you.
          </Text>
        </View>

        {/* FEATURED */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured coffees</Text>

          <ArrowRight size={18} color="#111" />
        </View>

        {random.map((item) => (
          <TouchableOpacity
            key={item.uid}
            style={styles.featuredCard}
            activeOpacity={0.9}
            onPress={() => router.push(`/coffee/${item.id}`)}
          >
            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={styles.overlay}>
              <Text style={styles.cardTitle}>{item.title}</Text>

              <Text style={styles.cardDesc} numberOfLines={2}>
                {item.description}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* EXTRA SECTION */}
        <View style={styles.bottomCard}>
          <Text style={styles.bottomTitle}>Explore all coffees</Text>

          <Text style={styles.bottomDesc}>
            Browse through hot and iced coffee specials from around the world.
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },

  hero: {
    marginBottom: 30,
  },

  smallTitle: {
    color: "#666",
    marginBottom: 8,
    fontWeight: "600",
  },

  heroTitle: {
    fontSize: 34,
    fontWeight: "800",
    lineHeight: 42,
    color: "#111",
  },

  highlight: {
    color: "#c67c4e",
  },

  heroDesc: {
    marginTop: 14,
    color: "#666",
    lineHeight: 22,
    fontSize: 15,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: 18,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
  },

  featuredCard: {
    height: 240,
    borderRadius: 24,
    overflow: "hidden",

    marginBottom: 22,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,

    elevation: 5,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,

    padding: 18,

    backgroundColor: "rgba(0,0,0,0.45)",
  },

  cardTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 6,
  },

  cardDesc: {
    color: "rgba(255,255,255,0.85)",
    lineHeight: 20,
  },

  bottomCard: {
    backgroundColor: "#111",
    borderRadius: 24,
    padding: 22,
    marginTop: 10,
  },

  bottomTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
  },

  bottomDesc: {
    color: "rgba(255,255,255,0.8)",
    lineHeight: 22,
  },
});
