import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Alert, FlatList, RefreshControl, Text, Touchable, TouchableOpacity, View } from 'react-native'
import { SignOutButton } from '@/components/SignOutButton'
import { useTransactions } from '../../hooks/useTransactions'
import { useEffect, useState } from 'react'
import PageLoader from '../../components/PageLoader'
import { styles } from '../../assets/styles/home.styles'
import { Image } from 'expo-image'
import { Ionicons } from "@expo/vector-icons"
import {BalanceCard} from '../../components/BalanceCard'
import { handleUrlParams } from 'expo-router/build/fork/getStateFromPath-forks'
import {TransactionItem} from '../../components/TransactionItem'
import NoTranscationsFound from '../../components/NoTranscationsFound'

export default function Page() {
  const { user } = useUser()

  // step230: now lets get the "router" from the useRouter of expo, which gives you access to the router object, which contains methods and properties for navigation and route info ; like route.push to go to a specific route ; route.back to navigate to the previous page and so on.....
  const router = useRouter()

  // step293: lets create the the state that tells : whether the refresh spinner is currently visible ; when true the spinner is shown, else the spinner is hidden, thus here below.

  // step294: keep it initially "false" so that until someone pulls the list down, no need to show the refresh spinner there, thus here below.
  const [refreshing, setRefreshing] = useState(false);

  // step225: lets call the hook we created and get the states and functions we want to use from it/there here, thus here below.

  // step226: and since this function needed a userid to be passed as a paarmeter in it , so we get it using the "user.id" here below ; as the above useUser we got from "clerk" , so lets use that only, thus here below.

  // step227: don't get confused here ; in neon database , we stored each transaction's id , not user's id ; user's id is being stored and given by clerk only, that we are now using, thus here below.
  const {transactions, summary, isLoading, loadData, deleteTransaction} = useTransactions(user.id);

  // step295: now lets create the function here below which will be called when the user pulls the list down OR will be called when the user pulls down to refresh, thus here below.
  const onRefresh = async () => {

    // step296: we when pull the list, we first make the setRefreshing state to be true, so that it shows the spinner using the "RefreshControl" component from react-native ; then we load the data by calling the function , using "await" so that it waits till the data is loaded , and then again set the setRefreshing state back to "false", so that : the refresh spinner that came from "refreshControl" component of react-native gets hidden again after loading the data there, thus here below.
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  // step228: now using the useEffect hook to call the loadData function that we created in the useTransactions.js file now there, thus here below ; so that as soon as the page is rendered , the transactions are loaded, thus here below and it will not render it on every refresh of the page, but only when the page is rendered for the first time, thus here below.
  useEffect(() => {
    loadData();
  },[loadData])

  // step275: now lets create the function to handle the deletion of transactions, thus here below.
  const handleDelete = (id) => {
    // step276: lets add an alert with options to confirm or cancel , just like done for signout, thus here below.
    Alert.alert(
      "Delete Transaction", // title
      "Are you sure you want to delete this transaction?", // message
      // array of objects for buttons
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => deleteTransaction(id), style: "destructive" },
      ]
    )
  }

  // step230: but it won't work and get all data from database , as earlier we had set dummy user id like "123" and "456" in database earlier for testing purposes ; but on console logging we see that the user Id is now being provided by the CLERK, thus here below.

  // step231: so go in neon database dashboard and update the userId with the one we are getting in the console log, thus here below.

  // step232: see the next steps in step233.txt file now there.
  // console.log("User id:", user.id)

  // step229: so we can console log and see the transactions and summary in the console thus there, thus here below.
  // console.log("Transactions :", transactions)
  // console.log("Summary:", summary)

  // step236: if the loading state is true, we can render a PageLoader component that shows the circle spinning loader there, thus here below.

  // step237: see the next steps in PageLoader.jsx file now there.

  // step297: now since we have a refrehsing state too now to refresh the page when the user pulls the list down, so now we will not show the loading spinner for entire page, when that list is pulled down; i.e. when the list is pulled down , we just want to see the sinner provided by the "RefreshControl" component of React Native there ; and not the entire screen's refresh spinner ; so don't show this loading spinner when the the refreshing spinner is there ; i.e. dont show this when refreshing state is true and the refreshing spinner is there ; but show this entire page spinner only when refrehsing state is not true, thus here below.

  // step298: so now when we pull the transaction list, it will not show the loading spinner for the entire page, but only the spinner provided by the "RefreshControl" component of React Native , thus here below because now we have made the if condition below to not show the loading spinner when the refreshing state is true i.e. when the transaction list has been pulled, thus here below.

  // step299: so now make any change in neon database and just pull down the list there, to see the changes immediately there now using this refreshing function, thus here below.

  // step300: see the next steps in create.jsx file/screen file now there.
  if(isLoading && !refreshing){
    return <PageLoader />
  }

  
  // step241: so lets start building the UI for the home screen now there, thus here below.
  return (
    <View style={styles.container}>
      <View style={styles.content}>

      {/* step242: now lets first create the header part of the home screen with the logo, email, buttons , etc there, thus here below. */}
      <View style={styles.header}>
        {/* step243: ets first have the left side of the header i.e. the the logo and welcome message with the logged in "email", thus here below. */}
        <View style={styles.headerLeft}>
          {/* step244: lets put the logo image now thus here below. */}
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.headerLogo}

            // step225: "contentFit" : Controls how the image fits inside its container: "contain" → scales the image to fit without cropping, preserving its aspect ratio ; scale to fit inside container, thus here below.
            contentFit="contain"
          />

          {/* step226: now lets put the welcome message now thus here below. */}
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Welcome,</Text>
            <Text style={styles.usernameText}>

              {/* step227: now lets get the user's details from CLERK here below ; emailAddresses is an array of email address, that is like : user.emailAddresses = [{emailAddress: "ben0912gorge@gmail.com"}] ; then we can access it here below and then use the "split" to split it into an array: ["example", "gmail.com"] ; and then get the 0th index of it i.e. the part before the @, thus here below. */}

              {/* step228: we use ?. so that : if user or emailAddresses is not defined, then it won't crash the app but rather just go to the enxt lines of code there, maybe throwing some error there OR not even showing the name there, thus here below. */}
              {user?.emailAddresses[0]?.emailAddress.split("@")[0]}
            </Text>
          </View>
        </View>

        {/* step229: we now lets have the right part of the header component here below ; which will have the two buttons, thus here below. */}
        <View style={styles.headerRight}>
          <TouchableOpacity 
            style={styles.addButton}

            // step231: now lets use the router.push to got to the create screen now there, thus here below.
            onPress={() => router.push("/create")}
          >
            <Ionicons name='add' size={20} color='#fff' />
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity> 

            {/* step232: now lets have the signout button now there, thus here below. */}

            {/* step233: see the next steps in SignOutButton.jsx file now there. */}
            <SignOutButton />
        </View>
      </View>

        {/* step243: now lets have the BalanceCard now there which will take the "summary" object as prop into it, thus here below. */}

        {/* step244: see the next steps in BalanceCard.jsx file now there. */}
        <BalanceCard summary={summary} />

        {/* step250: now we can have a text saying "Recent Transactions" now here below. */}
        <View style={styles.transactionsHeaderContainer}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
        </View>
      </View>
        {/* step251: now lets use a FlatList, which works similarly to "map" of web dev ; where map runs fro an array and renders something there for each item ; similarly we use FlatList too in react native thus here below. */}

        {/* step252: FlatList is a performant way to render lists in React Native ; it renders items lazly i.e. if we have 100 transactions in the transactions array, it will only render that much of it on screen that can fit for now on the screen there ; as we scroll below , it will keep rendering next items there too ; but it doesn't render all of them at once ; and thus is very performant as compared to map of web dev ; "map" can be used here in react native too like transactions.map((transaction) => <TransactionCard transaction={transaction} />), but FlatList is more performant so we use that only, thus here below. */}
        <FlatList

          // step253: the style below : Applies styling to the FlatList container itself.
          style={styles.transactionsList}

          // ste254: now : the contentContainerStyle applies styling to the inner content container (the list items area). Useful for padding, spacing, alignment.
          contentContainerStyle={styles.transactionsListContent}

          // step255: now we in "data" mention the array which it will iterate through and render something for each item in this array, thus here below.
          data={transactions}

          // /step256: now we in "renderItem" mention the function which will render something for each item in the array, thus here below.

          // step257: "item" refers to each item in the transactions array ; "item" is something provided by React Native's FlatList component ; and we can access each element of the array there using this "item" ; thus here below.
          renderItem={({item}) => (

            // step258: now we will render the TransactionItem component for each item in the array, thus here below ; so we pass the "item" prop to it, thus here below ; so this component will render for eah item as each "item" will be passed one by one as a prop into the TransactionItem component here, thus here below.

            // step259: also the onDelete prop is passed too, which will tell the component what function to call when user wants to delete an item there, thus here below.

            // step260: see the next steps in TransactionItem.jsx file now there.
            <TransactionItem item={item} onDelete={handleDelete} />

          )}
          // step277: now if the array is empty, we can render a NoTransactionsFound component there ; in the "ListEmptyComponent" of FlatList here below , which renders whatever is in it , if the array in "data" to be rendered is empty, thus here below.

          // step278: see the next steps in NoTranscationsFound.jsx file now there.

          // step281: we can test the UI of below by putting : data = {[]} above ; just to see if the below UI is working properly or not there, thus here below.
          ListEmptyComponent={<NoTranscationsFound />}

          // step282: now lets add the below prop here below, to not show the vertical scroll bar on right side when scrolling the page there, thus here below.

          // step283: see the next steps in step284.txt file now there.
          showsVerticalScrollIndicator={false}

          // step290: now when we scroll the list of transactions there ; we want the transactions list to be refreshed there when scrolled from topmost pulled more than it could to automatically refresh the list there ; thus it brings/enables the "pull-to-refresh functionality." ; so for that we have a prop in FlatList called as "refreshControl" thus here below.

          // step291: we pass the RefreshControl component in it from react-native first which : Handles the UI and behavior for pull-down refresh, thus here below.

          // step292: so then, it takes the state "refreshing" and function "onrefresh" as props for it, thus here below.
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
    </View>
  )
}