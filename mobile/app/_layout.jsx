import { Stack } from "expo-router";
import SafeScreen from "@/components/SafeScreen";

export default function RootLayout() {
  return (
    // step144: now we wrap the whole app in the SafeScreen component thus here below ; so that all the content of entire app now will be within the safe area view ; and will never overlap or exceed the status bar OR notch of the mobile screen i.e the top bar in mobile that has time battery and all there, thus here below.

    // step145: see the next steps in step145.txt file now there.
    <SafeScreen>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeScreen>
  );
}
