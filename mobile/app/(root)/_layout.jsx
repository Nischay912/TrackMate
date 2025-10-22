import { useUser } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import Stack from "expo-router/stack";

export default function Layout() {
    const { isSignedIn, isLoaded } = useUser();

    // step285: now we use the "isLoaded" method from clerk, and then below : if clerk is not loaded, we don't return anything there, and not even see the "login page" ; just we will see the loading spinner there now, thus here below.

    // step286: When your app starts, Clerk may still be fetching info about the current user from its backend. During this time, you don’t yet know if the user is signed in or not ; isLoaded is false until Clerk has completed that process. Once it’s done, isLoaded becomes true ; so till its "false" , we will not see anything there ; and this will prevent user to see the login page there instead of nothing, thus here below.

    // step287: After isLoaded is true, you can safely check isSignedIn and render the appropriate page or redirect there written below this code, thus here below ; and so after clerk authenticates by checking and makes isLoaded true then we can now see the things there being rendered like the homepage if user is authenticated, else the signin or login page safely there, thus here below ; so in this way an authenticated user, won't be able to see th elogin page again on refreshing for some seconds, even though he is logged in already , instead will see th eloading spinner, thus here below.

    // step288: thus it provides a better user-experience to the user there, thus here below.

    // step289: see the next steps in index.jsx file now there.
    if(!isLoaded){
        return null;
    }

    if(!isSignedIn){
        return <Redirect href={"/sign-in"} />
    }

    return <Stack screenOptions={{headerShown: false}} />
}