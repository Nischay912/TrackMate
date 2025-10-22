// import { Stack } from "expo-router";
// import SafeScreen from "@/components/SafeScreen";

// export default function RootLayout() {
//   return (
//     // step144: now we wrap the whole app in the SafeScreen component thus here below ; so that all the content of entire app now will be within the safe area view ; and will never overlap or exceed the status bar OR notch of the mobile screen i.e the top bar in mobile that has time battery and all there, thus here below.

//     // step145: see the next steps in step146.txt file now there.
//     <SafeScreen>
//       <Stack screenOptions={{ headerShown: false }} />
//     </SafeScreen>
//   );
// }

// ------------------------------------------------------------------------------

// step147: as per the previous step file ; now we have the following code below.

import { ClerkProvider } from '@clerk/clerk-expo'
import { Slot } from 'expo-router'
import SafeScreen from '@/components/SafeScreen'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { StatusBar } from 'expo-status-bar'

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>

      {/* step149: but remember to put the SafeScreen there, so that the content still remains in the safe screen and will never overlap or exceed the status bar OR notch of the mobile screen i.e the top bar in mobile that has time battery and all there, thus here below. */}

      {/* see the next steps in step150.txt file now there. */}
      <SafeScreen>

        {/* step148: thus Slot has whatever page user is currently in and thus provides Clerk's auth in that page ; thus a logged in user's details are in every page accessible as any page he goes to while logged in , will be accessible here in Slot and its wrapped with ClerkProvider, so : every page will have Clerk's authentication access, thus here below. */}

        {/*  SO SLOT RENDERS THE CURRENTLY SELECTED COMPONENT/CONTENT OR THE PAGE WE CURRENTLY ARE AT, THUS HERE BELOW. */}
        <Slot />
      </SafeScreen>

      {/* step372: so now we will show the status bar of the mobile phone too there, i.e. the top bar containing time and battery and all of the phone, thus here below using the StatusBar component of the expo-status-bar & not from react-native as the expo one is far better and more performant , optimized and efficient that the react-native one, thus here below. */}

      {/* step373: and then we can change its style to "dark" as its default color style is "light" but in light its barely visible as per our theme, so better to keep it in "dark" mode style thus here below. */}

      {/* step374: and since this is outside all the folders of "app" , we place this status bar here and not inside (root)'s _layout.jsx ; as then this will apply in entire application ; if we had placed this component in (root)'s layout.jsx file, then this would have been applied to every screen present in that (root) folder only ; but since this is outside all the folders of "app" , the status bar component placed and written here now will be applied in the entire application, thus now here. */}

      {/* step375: FINAL STEP: THUS THE APPLICATION FINALLY GOT COMPLETED THUS HERE BELOW. */}
      <StatusBar style="dark" />
    </ClerkProvider>
  )
}
