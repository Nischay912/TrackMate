import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth()

  if (isSignedIn) {
    return <Redirect href={'/'} />
  }

  // THE SCREENOPTIONS WITH HEADERSHOWN AS FALSE, MAKES THE HEADER OF EACH PAGE TO BE HIDDEN IN THE UI , LIKE THE TOP SHOWING SIGN-IN OR SIGN-UP THERE WILL NOT BE SHOWN NOW, THUS HERE BELOW.
  return <Stack screenOptions={{headerShown: false}} />
}