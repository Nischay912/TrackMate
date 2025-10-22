import * as React from 'react'
{/* step164: we see for now that on clicking on input tags , the keyboard is overlapping the input tags making the things invisible there as we type ; to fix this we import the KeyboardAvoidingView component coming from react-native, thus here below. */}
import { Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { useState } from 'react'
import {styles} from '@/assets/styles/auth.styles.js'
import {Ionicons} from "@expo/vector-icons"
import {COLORS} from "../../constants/colors"
import {Image} from "expo-image"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState('')

  // step151: now lets create a state for the error here below.
  const [error, setError] = useState("")

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true)
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))

      // step189: same as done in sign-in page , lets update the "error" state with the actual errors too , so that it can be visible there on the error box, if ithere is any, thus here below.
      if(err.errors?.[0].code === "form_identifier_exists"){
        setError("This email is already in use! Please try logging in instead.")
      }
      else if(err.errors?.[0].code === "form_password_length_too_short" && err.errors?.[0].message === "Passwords must be 8 characters or more."){
        setError("Password must be at least 8 characters long!")
      }
      else{
        setError("Something went wrong! Please try again.")
      }
    }
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      // console.error(JSON.stringify(err, null, 2))

      // step190: same thing done here too to show the error in the error box, if there is any, thus here below by updating the "error" state with the actual errors too.

      // step191: see the next steps in useTransactions.js file now there.
      if(err.errors?.[0].code === "form_code_incorrect"){
        setError("The code you entered is incorrect! Please try again.")
      }
      else{
        setError("Something went wrong! Please try again.")
      }
    }
  }

  if (pendingVerification) {
    {/* step152: now lets fix the UI of the verification page here below. */}
    return (
      // step153: now lets add styles from the auth.styles.js file here below.
      <View style={styles.verificationContainer}>
        <Text style={styles.verificationTitle}>Verify your email</Text>

        {/* step154: now if error is there i.e. the error state is not null, then we render the following component here below ; else render nothing i.e. "null" , thus here below. */}
        {error ? (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle" size={20} color={COLORS.expense} />
            <Text style={styles.errorText}>{error}</Text>

            {/* step155: we have a button that sets error back to empty i.e. will remove the error message from the UI as now error becomes null ; so will render "null" as per this ? : conditional rendering here and thus displays nothing related to error, thus here below. */}
            <TouchableOpacity onPress={() => setError("")}>
              <Ionicons name="close" size={20} color={COLORS.textLight} />
            </TouchableOpacity>
          </View>
        ) : null}

        <TextInput
          // step156: lets now apply an array of styles here below ; which means that all the styles of that array will be applied form left to right ; like here the first class will always be applied, but due to && , the 2nd class will only be applied if there is an error, thus here below.
          style={[styles.verificationInput, error && styles.errorInput]}
          value={code}
          placeholder="Enter your verification code"
          placeholderTextColor='#9A8478'
          onChangeText={(code) => setCode(code)}
        />

        {/* step157: now lets update the styles of button here below. */}
        <TouchableOpacity onPress={onVerifyPress} style={styles.button}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    // step158: now lets update the UI for the signup page there now, thus here below.

    // step165: and then we will have to use KeyboardAvoidingView instead of View here below ; but that won't work directly as we have to put some other options with it too, thus here below.

    // step166: so instead of doing that, lets use a package , that will scroll the page upwards automatically, when we open the keyboard there ; can see about it on the website : "https://npmjs.com/package/react-native-keyboard-aware-scroll-view" ; so we do "npm i react-native-keyboard-aware-scroll-view" in termianl under : cd mobile , thus here below.

    // step167: and then now we will use KeyboardAwareScrollView coming from the package we installed , import it above there, thus here below.

    // step168: ScrollView and KeyboardAwareScrollView are not layout containers like View ; so we can't use alignItems, justifyContent like View on it thus here below as it may crash the application there.

    // <View style={{flex:1, alignItems: "center", justifyContent:"center"}}>
    <KeyboardAwareScrollView 
      style={{flex:1}} // flex: 1 tells a component to expand and take up all available space in its parent container ; its a shorthand for these three properties togethere : flexGrow, flexShrink, flexBasis ; It makes the component fill the entire remaining space of its parent ; If there are multiple components with flex: 1, they split the available space equally ; If one has flex: 2 and the other has flex: 1, the first takes twice as much space as the other one there, thus here below.

      // step169: now we can add more things in this coming from the documentation from where we installed the package , thus here below.

      // step170: this will content stretches to full height, allowing proper alignment like centering vertically if needed ; its like : content stretches to full height, allowing proper alignment like centering vertically if needed, thus here below.
      contentContainerStyle={{flexGrow: 1}}

      // step171: By default, KeyboardAwareScrollView only automatically adjusts for the keyboard on iOS ; This prop makes sure Android devices also scroll up so input fields aren’t hidden behind the keyboard ; its like saying : Turn on keyboard awareness for Android too, thus here below.
      enableOnAndroid={true}

      // step172: this will enable automatic scrolling when the keyboard is opened ; its like : Enable automatic scrolling when the keyboard is opened ; Automatically scrolls the view when an input field is focused, ensuring that the field stays visible above the keyboard ; You don’t have to manually handle scrolling when typing in lower inputs ; its like saying : When the user taps a TextInput, automatically scroll it into view, thus here below.

      // step173: overall these properties : Make the scroll view fill the screen, work properly on Android, and automatically scroll inputs into view when the keyboard appears, thus here below.
      enableAutomaticScroll={true}
      // step174: this can be added to manually adjust how much more scrolling you need when keyboard opened there ; if removed it will scroll only as much needed by the device, thus here below. ; and won't scroll anything extra, thus here below.
      
      // extraScrollHeight={100}

      // step175: see the next steps in sign-in.jsx file now there.
    >
      <View style={styles.container}>

        {/* step159: lets have the image for the screen thus here below. */}
        <Image source={require("../../assets/images/signup.png")} style={styles.illustration} />
        <Text style={styles.title}>Create Account</Text>

        {/* step160: now same as done on verification page , here also if some error is there, we will show it just below the title thus here below.*/}
        {error ? (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle" size={20} color={COLORS.expense} />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={() => setError("")}>
              <Ionicons name="close" size={20} color={COLORS.textLight} />
            </TouchableOpacity>
          </View>
        ) : null}

        <TextInput
          // step161: again apply an array of styles here below ; which means that all the styles of that array will be applied form left to right ; like here the first class will always be applied, but due to && , the 2nd class will only be applied if there is an error, thus here below.
          style={[styles.input, error && styles.errorInput]}
          autoCapitalize="none" // means don't capitalize by default
          value={emailAddress}
          placeholder="Enter email"
          placeholderTextColor='#9A8478'
          onChangeText={(email) => setEmailAddress(email)}
        />
        <TextInput
          // step162: same done for the password input too here below.
          style={[styles.input, error && styles.errorInput]}
          value={password}
          placeholder="Enter password"
          placeholderTextColor='#9A8478'
          secureTextEntry={true} // this makes the password to be hidden when typing there
          onChangeText={(password) => setPassword(password)}
        />
        <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Already have an account?</Text>

          {/* step163: router.back() : is used to go back to the previous screen in the navigation history — similar to pressing the back button on a phone or browser ; So if you came to Screen B from Screen A : calling router.back() on Screen B will take you back to Screen A ; its better as using Link and if that page not exists can crash the app , but when using router.back(), if there’s no previous route, it does nothing (it won’t crash). */}
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.linkText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}