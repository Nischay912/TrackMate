import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Text, View } from 'react-native'
import { SignOutButton } from '@/components/SignOutButton'
import { useTransactions } from '../../hooks/useTransactions'
import { useEffect } from 'react'

export default function Page() {
  const { user } = useUser()
  // step225: lets call the hook we created and get the states and functions we want to use from it/there here, thus here below.

  // step226: and since this function needed a userid to be passed as a paarmeter in it , so we get it using the "user.id" here below ; as the above useUser we got from "clerk" , so lets use that only, thus here below.

  // step227: don't get confused here ; in neon database , we stored each transaction's id , not user's id ; user's id is being stored and given by clerk only, that we are now using, thus here below.
  const {transactions, summary, isLoading, loadData, deleteTransaction} = useTransactions(user.id);

  // step228: now using the useEffect hook to call the loadData function that we created in the useTransactions.js file now there, thus here below ; so that as soon as the page is rendered , the transactions are loaded, thus here below and it will not render it on every refresh of the page, but only when the page is rendered for the first time, thus here below.
  useEffect(() => {
    loadData();
  },[loadData])

  // step230: but it won't work and get all data from database , as earlier we had set dummy user id like "123" and "456" in database earlier for testing purposes ; but on console logging we see that the user Id is now being provided by the CLERK, thus here below.

  // step231: so go in neon database dashboard and update the userId with the one we are getting in the console log, thus here below.

  // step232: see the next steps in step233.txt file now there.
  console.log("User id:", user.id)

  // step229: so we can console log and see the transactions and summary in the console thus there, thus here below.
  console.log("Transactions :", transactions)
  console.log("Summary:", summary)

  return (
    <View>
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <Text>Income: {summary.income}</Text>
        <Text>Balance: {summary.balance}</Text>
        <Text>Expenses: {summary.expenses}</Text>
        <SignOutButton />
      </SignedIn>
      <SignedOut>
        <Link href="/(auth)/sign-in">
          <Text>Sign in</Text>
        </Link>
        <Link href="/(auth)/sign-up">
          <Text>Sign up</Text>
        </Link>
      </SignedOut>
    </View>
  )
}