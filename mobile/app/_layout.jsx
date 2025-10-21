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

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>

      {/* step149: but remember to put the SafeScreen there, so that the content still remains in the safe screen and will never overlap or exceed the status bar OR notch of the mobile screen i.e the top bar in mobile that has time battery and all there, thus here below. */}

      {/* see the next steps in step150.txt file now there. */}
      <SafeScreen>

        {/* step148: thus Slot has whatever page user is currently in and thus provides Clerk's auth in that page ; thus a logged in user's details are in every page accessible as any page he goes to while logged in , will be accessible here in Slot and its wrapped with ClerkProvider, so : every page will have Clerk's authentication access, thus here below. */}
        <Slot />
      </SafeScreen>
    </ClerkProvider>
  )
}
