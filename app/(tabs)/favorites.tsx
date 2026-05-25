import { ScrollView, StyleSheet } from "react-native";

import ScreenContainer from "../../components/ScreenContainer";
import Header from "../../components/Header";
import MenuCard from "../../components/MenuCard";

import { useCoffee } from "../../context/CoffeeContext";

export default function FavoritesScreen() {
  const { favorites } = useCoffee();

  return (
    <ScreenContainer>
      <Header title="Favorieten" />

      <ScrollView contentContainerStyle={styles.container}>
        {favorites.map((item) => (
          <MenuCard key={item.uid} coffee={item} />
        ))}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
