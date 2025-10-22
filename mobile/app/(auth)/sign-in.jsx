import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { styles } from '../../assets/styles/auth.styles'
import { COLORS } from '../../constants/colors'
import { Ionicons } from '@expo/vector-icons'

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState("")

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } 
    catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2)) // null tells not filter any keys and print as it is full there and "2" tells to keep 2 spaces of indentation for pretty printing on console there, thus here below.

      // step185: now instead of just console logging the error on getting an error ; lets show the error in the error box we created using the "error" state we created earlier there.

      // step186: in the console log we saw that when we console logged "err" , it had an errors array that had at 0th index : "form_password_incorrect" ; if we enetered wrong password there ; so we see if thats the case then show the following error there , by setting the value of "error" state to this and then error box there was shwoing {error} ; els eshow the other message written below, thus here.

      // step187: we use ?. so that it only checks for the 0th index if the "errors" array is there not null ; as if its null, there is no point of doing 0th index there, thus here below.

      // step188: see the next steps in sign-up.jsx file now there.
      if(err.errors?.[0].code === "form_password_incorrect"){
        setError("Password is incorrect! Please try again.")
      }
      else if(err.errors?.[0].code === "form_param_nil"){
        setError("Please fill all the fields!")
      }
      else{
        setError("An error occured! Please try again.")
      }

    }
  }

  return (
    // step176: lets use the KeyboardAwareScrollView here as well like sign-up.jsx file , to automatically scroll the page , to prevent keyboard from overlapping the input tags there on mobile, so that the keyboard doesn't overlap there with the text input / input tag, thus here below.
    <KeyboardAwareScrollView
      style={{flex:1}}
      contentContainerStyle={{flexGrow: 1}}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      extraScrollHeight={30}
    >
      <View style={styles.container}>

        {/* step177: lets have the image for the login page, now thus here below. */}
        <Image source={require("../../assets/images/login.png")} style={styles.illustration} />
        <Text style={styles.title}>Welcome Back</Text>

        {/* step178: now if any error comes, we will show the error container below the title, thus here below ; using the same code used in sign-up.jsx file there, thus here below. */}
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

        // step179: lets now apply an array of styles here below ; which means that all the styles of that array will be applied form left to right ; like here the first class will always be applied, but due to && , the 2nd class will only be applied if there is an error, thus here below.
          style={[styles.input, error && styles.errorInput]}
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          placeholderTextColor="#9A8478"
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        />
        <TextInput

          // step180: here also done same as the above input tag, thus here below.
          style={[styles.input, error && styles.errorInput]}
          value={password}
          placeholder="Enter password"
          secureTextEntry={true}
          placeholderTextColor="#9A8478"
          onChangeText={(password) => setPassword(password)}
        />

        {/* step181: now lets style the button thus here below. */}
        <TouchableOpacity style={styles.button} onPress={onSignInPress}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        
        {/* step182: now lets have the following text there, thus here below. */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Don&apos;t have an account?</Text>

          {/* step183: using "asChild" here tells the Link to make the button itself to become the clickable link ; and Link not appears bisually seperately there ; Without asChild: <Link> wraps your button → like putting a box around an already-styled button ; without asChild : Link will have its own invisible box around the button automatically ; This extra “Link box” can mess up your button’s layout, spacing, or styling ; using asChild now makes the button iself as a link , and now the <Link> doesn’t add its own box anymore, thus here below ; so now the button looks like a link and navigates us to the new page when clicked there ; in sign-up page we had button only with onPress = router.back() , but here we don't have anything back of it ; and we can't go forward like back here as we dont really have ste whats forward , but we know whats back as we came to screen B using screen A , so we know whats back of that screen B , so we can go to screen A using router.back() there ; but not here ; so we used Link here and made it a button too , thus here below.
          
          // step184: we used Link with button here , so that Link doesn't look like plain text , like it usually alone do ; instead when used with button, it will now look like a button now with more beter styling and pressable effect like a button when clicked on it ; unlike normal Link that looks like a colored plain text only ; usually there, thus here below.
          */}
          <Link href="/sign-up" asChild>
            <TouchableOpacity>
              <Text style={styles.linkText}>Sign Up</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}