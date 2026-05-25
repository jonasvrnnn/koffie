import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ChevronLeft, Coffee } from "lucide-react-native";
import { useRouter } from "expo-router";

type Props = {
  title: string;
  back?: boolean;
};

export default function Header({ title, back }: Props) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {back ? (
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft size={24} />
        </TouchableOpacity>
      ) : (
        <View style={styles.logo}>
          <Coffee size={18} color="white" />
        </View>
      )}

      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 15,
  },
  logo: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
});
