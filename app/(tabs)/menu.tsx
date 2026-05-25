import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

import ScreenContainer from "../../components/ScreenContainer";
import Header from "../../components/Header";
import MenuCard from "../../components/MenuCard";

import { getAllCoffee } from "../../services/coffeeApi";
import { Coffee } from "../../types";
import { useCoffee } from "../../context/CoffeeContext";

export default function MenuScreen() {
  const [data, setData] = useState<Coffee[]>([]);
  const { setAll } = useCoffee();

  useEffect(() => {
    getAllCoffee().then((res) => {
      setData(res);
      setAll(res);
    });
  }, []);

  return (
    <ScreenContainer>
      <Header title="Menu" />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {data.map((item) => (
          <MenuCard key={item.uid} coffee={item} />
        ))}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
});
