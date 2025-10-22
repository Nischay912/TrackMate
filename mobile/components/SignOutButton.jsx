import { useClerk } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import { Alert, Text, TouchableOpacity } from 'react-native'
import { styles } from '../assets/styles/home.styles'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../constants/colors'

export const SignOutButton = () => {
  // Use `useClerk()` to access the `signOut()` function
  const { signOut } = useClerk()
  const handleSignOut = async () => {
    // try {
    //   await signOut()
    //   // Redirect to your desired page
    //   Linking.openURL(Linking.createURL('/'))
    // } catch (err) {
    //   // See https://clerk.com/docs/custom-flows/error-handling
    //   // for more info on error handling
    //   console.error(JSON.stringify(err, null, 2))
    // }

    // step236: now instead of directly signing out there ; lets show an alert popup first there, thus here below.
    Alert.alert(
      "Logout", // title
      "Are you sure you want to logout?", // message

      // step237: lets now have the buttons as array of objects thus here below.
      [
        {
          text: "Cancel",
          // step238: on pressing this do nothing i.e. it will just close the popup as we have written nothing in it so nothing will happen, thus here below.
          onPress: () => console.log("Cancel Pressed"),

          // step239: "cancel" style will make the button gray and bold too thus here below.
          style: "cancel"
        },
        { text: "Logout",

          // step240: but on pressing this button here below ; we will be calling the signOut() function thus here below.
          onPress: () => signOut(),

          // step241: destructive style will make the button red thus here below.

          // step242: see the next steps in index.js file now there.
          style: "destructive"
        }
      ]
    )
  }
  return (
    // step234: lets add some styles to the signout button appearing there, thus here below.
    <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
      
      {/* step235: lets use the ionicons for the icon thus here below. */}
      <Ionicons name='log-out-outline' size={22} color={COLORS.text} />
    </TouchableOpacity>
  )
}