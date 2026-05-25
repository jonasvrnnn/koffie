import * as Notifications from "expo-notifications";

export async function sendOrderNotification(title: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "☕ Bestelling geplaatst",
      body: `${title} is toegevoegd aan je bestellingen`,
    },
    trigger: null,
  });
}
